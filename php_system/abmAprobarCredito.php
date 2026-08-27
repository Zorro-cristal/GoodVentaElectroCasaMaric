<?php
require_once '../php_system/conexion.php';

// Decodificación UTF-8 para POST
function getPost($key) {
    return isset($_POST[$key]) ? utf8_decode(trim($_POST[$key])) : null;
}

// Función principal que decide la operación
$operacion = getPost('accion'); // puede ser 'agregar', 'editar', 'eliminar', 'listar'

switch ($operacion) {
    case 'verificarSolicitud':
        verificarSolicitud();
        break;
 
    default:
        echo json_encode(['success' => false, 'message' => 'Operación inválida']);
        exit;
}
 
function verificarSolicitud(){
 
$mysqli = conectar_al_servidor();
$mysqli->set_charset("utf8mb4");

// =============================================
// 1️⃣ Buscar solicitudes pendientes
// =============================================
$sqlSolicitudes = "SELECT * FROM solicitudes_credito WHERE estado = 'PENDIENTE'";
$resSolicitudes = $mysqli->query($sqlSolicitudes);

if ($resSolicitudes->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'No hay solicitudes pendientes']);
    exit;
}

// =============================================
// 2️⃣ Traer parámetros y reglas
// =============================================
$parametros = [];
$resParam = $mysqli->query("SELECT * FROM parametros_credito");
while ($row = $resParam->fetch_assoc()) {
    $parametros[] = $row;
}

$reglas = [];
$resReglas = $mysqli->query("SELECT * FROM reglas_credito");
while ($row = $resReglas->fetch_assoc()) {
    $reglas[] = $row;
}

// =============================================
// 3️⃣ Procesar cada solicitud
// =============================================
$resultados = [];

while ($sol = $resSolicitudes->fetch_assoc()) {
    $rechazado = false;
    $puntajeTotal = 0;

    foreach ($parametros as $p) {
        $categoria = strtolower(trim($p['categoria'])); // ejemplo: "edad"
        $tipo = strtolower(trim($p['tipo']));
        $valorCliente = isset($sol[$categoria]) ? $sol[$categoria] : null;

        if ($valorCliente === null || $valorCliente === '') continue;

        // --- Reglas por tipo ---
        if ($tipo === 'rechazo') {
            // Si cumple condición de rechazo => marcado automáticamente
            if ($p['minimo'] != '' && $valorCliente >= $p['minimo']) $rechazado = true;
            if ($p['maximo'] != '' && $valorCliente <= $p['maximo']) $rechazado = true;
            if ($p['valor_texto'] != '' && strcasecmp($valorCliente, $p['valor_texto']) == 0) $rechazado = true;
        } else {
            // Tipo Puntaje: sumar si cumple
            $cumple = false;
            if ($p['minimo'] != '' && $p['maximo'] != '') {
                if ($valorCliente >= $p['minimo'] && $valorCliente <= $p['maximo']) $cumple = true;
            } elseif ($p['minimo'] != '') {
                if ($valorCliente >= $p['minimo']) $cumple = true;
            } elseif ($p['maximo'] != '') {
                if ($valorCliente <= $p['maximo']) $cumple = true;
            } elseif ($p['valor_texto'] != '') {
                if (strcasecmp($valorCliente, $p['valor_texto']) == 0) $cumple = true;
            }

            if ($cumple) {
                $puntajeTotal += (float)$p['puntaje'];
            }
        }
    }

    // =============================================
    // 4️⃣ Determinar resultado
    // =============================================
    $resultadoFinal = 'NO DEFINIDO';

    if ($rechazado) {
        $resultadoFinal = 'RECHAZADO';
    } else {
        foreach ($reglas as $r) {
            if ($puntajeTotal >= $r['puntaje_minimo'] && $puntajeTotal <= $r['puntaje_maximo']) {
                $resultadoFinal = $r['resultado'];
                break;
            }
        }
    }

    // =============================================
    // 5️⃣ Guardar resultado en la BD
    // =============================================
    $stmt = $mysqli->prepare("UPDATE solicitudes_credito 
        SET puntaje_total = ?, resultado = ?, estado = 'CALIFICADO' 
        WHERE id = ?");
    $stmt->bind_param("dsi", $puntajeTotal, $resultadoFinal, $sol['id']);
    $stmt->execute();

    $resultados[] = [
        'id' => $sol['id'],
        'cliente' => $sol['nombre_cliente'] ?? '',
        'puntaje_total' => $puntajeTotal,
        'resultado' => $resultadoFinal
    ];
}

// =============================================
// 6️⃣ Enviar respuesta
// =============================================
echo json_encode([
    'success' => true,
    'analizados' => count($resultados),
    'data' => $resultados
], JSON_UNESCAPED_UNICODE);
 
}
 
 

?>
