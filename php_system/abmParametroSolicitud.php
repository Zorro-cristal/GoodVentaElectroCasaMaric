<?php
require_once '../php_system/conexion.php';

// Decodificación UTF-8 para POST
function getPost($key) {
    return isset($_POST[$key]) ? utf8_decode(trim($_POST[$key])) : null;
}

// Función principal que decide la operación
$operacion = getPost('accion'); // puede ser 'agregar', 'editar', 'eliminar', 'listar'

switch ($operacion) {
    case 'agregar':
        agregarParametro();
        break;
    case 'editar':
        editarParametro();
        break;
    case 'eliminar':
        eliminarParametro();
        break;
    case 'listar':
        listarParametros();
        break;
		
		
		
	 case 'agregar_reglas':
        agregarParametro_reglas();
        break;
    case 'editar_reglas':
        editarParametro_reglas();
        break;
    case 'eliminar_reglas':
        eliminarParametro_reglas();
        break;
    case 'listar_reglas':
        listarParametros_reglas();
        break;	
		
		 
    default:
        echo json_encode(['success' => false, 'message' => 'Operación inválida']);
        exit;
}

// ========================================
// FUNCIONES
// ========================================

function agregarParametro() {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");
 
    $categoria = getPost('categoria');
    $descripcion = getPost('descripcion');
    $minimo = getPost('minimo') !== '' ? (float)getPost('minimo') : null;
    $maximo = getPost('maximo') !== '' ? (float)getPost('maximo') : null;
    $valor_texto = getPost('valor_texto');
    $puntaje = (int)getPost('puntaje');
    $tipo = getPost('tipo');

    $stmt = $mysqli->prepare("INSERT INTO parametros_credito 
        (categoria, descripcion, minimo, maximo, valor_texto, puntaje, tipo) 
        VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssddsds", $categoria, $descripcion, $minimo, $maximo, $valor_texto, $puntaje, $tipo);

    if($stmt->execute()){
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }
    $stmt->close();
    exit;
}

function editarParametro() {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");
 

    $id = (int)getPost('id');
    $categoria = getPost('categoria');
    $descripcion = getPost('descripcion');
    $minimo = getPost('minimo') !== '' ? (float)getPost('minimo') : null;
    $maximo = getPost('maximo') !== '' ? (float)getPost('maximo') : null;
    $valor_texto = getPost('valor_texto');
    $puntaje = (int)getPost('puntaje');
    $tipo = getPost('tipo');

    $stmt = $mysqli->prepare("UPDATE parametros_credito SET 
        categoria=?, descripcion=?, minimo=?, maximo=?, valor_texto=?, puntaje=?, tipo=? 
        WHERE id=?");
    $stmt->bind_param("ssddsdsi", $categoria, $descripcion, $minimo, $maximo, $valor_texto, $puntaje, $tipo, $id);

    if($stmt->execute()){
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }
    $stmt->close();
    exit;
}

function eliminarParametro() {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");

    $id = isset($_POST['id']) ? (int)$_POST['id'] : null;

    if($id){
        $stmt = $mysqli->prepare("DELETE FROM parametros_credito WHERE id=?");
        $stmt->bind_param("i", $id);
        if($stmt->execute()){
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'ID no válido']);
    }
    exit;
}

function listarParametros() {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");

    $result = $mysqli->query("SELECT * FROM parametros_credito ORDER BY categoria, descripcion");
    $data = [];

    while($row = $result->fetch_assoc()){
        $data[] = [
            'id' => (int)$row['id'],
            'categoria' => !empty($row['categoria']) ? utf8_encode($row['categoria']) : "",
            'descripcion' => !empty($row['descripcion']) ? utf8_encode($row['descripcion']) : "",
            'minimo' => isset($row['minimo']) ? $row['minimo'] : "",
            'maximo' => isset($row['maximo']) ? $row['maximo'] : "",
            'valor_texto' => !empty($row['valor_texto']) ? utf8_encode($row['valor_texto']) : "",
            'puntaje' => isset($row['puntaje']) ? (int)$row['puntaje'] : 0,
            'tipo' => !empty($row['tipo']) ? utf8_encode($row['tipo']) : ""
        ];
    }

    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

 

function agregarParametro_reglas() {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");
 
    $nombre_regla = getPost('nombre_regla'); 
    $puntaje_minimo = getPost('puntaje_minimo') !== '' ? (float)getPost('puntaje_minimo') : null;
    $puntaje_maximo = getPost('puntaje_maximo') !== '' ? (float)getPost('puntaje_maximo') : null;
    $resultado = getPost('resultado');
    
    $stmt = $mysqli->prepare("INSERT INTO reglas_credito (nombre_regla,  puntaje_minimo, puntaje_maximo, resultado ) 
        VALUES (?, ?, ?, ? )");
    $stmt->bind_param("sdds", $nombre_regla, $puntaje_minimo, $puntaje_maximo, $resultado );

    if($stmt->execute()){
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }
    $stmt->close();
    exit;
	
}

function editarParametro_reglas() {
	
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");
 
    $id = (int)getPost('id');
    $nombre_regla = getPost('nombre_regla'); 
    $puntaje_minimo = getPost('puntaje_minimo') !== '' ? (float)getPost('puntaje_minimo') : null;
    $puntaje_maximo = getPost('puntaje_maximo') !== '' ? (float)getPost('puntaje_maximo') : null;
    $resultado = getPost('resultado');

    $stmt = $mysqli->prepare("UPDATE reglas_credito SET 
        nombre_regla='$nombre_regla',  puntaje_minimo='$puntaje_minimo', puntaje_maximo='$puntaje_maximo', resultado='$resultado' 
        WHERE id='$id'");
 
    if($stmt->execute()){
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }
    $stmt->close();
    exit;
}

function eliminarParametro_reglas() {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");

    $id = isset($_POST['id']) ? (int)$_POST['id'] : null;

    if($id){
        $stmt = $mysqli->prepare("DELETE FROM reglas_credito WHERE id=?");
        $stmt->bind_param("i", $id);
        if($stmt->execute()){
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'ID no válido']);
    }
    exit;
}

function listarParametros_reglas() {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");

    $result = $mysqli->query("SELECT * FROM reglas_credito ");
    $data = [];

    while($row = $result->fetch_assoc()){
        $data[] = [
            'id' => (int)$row['id'],
            'nombre_regla' => !empty($row['nombre_regla']) ? utf8_encode($row['nombre_regla']) : "", 
            'puntaje_minimo' => isset($row['puntaje_minimo']) ? $row['puntaje_minimo'] : "",
            'puntaje_maximo' => isset($row['puntaje_maximo']) ? $row['puntaje_maximo'] : "",
            'resultado' => !empty($row['resultado']) ? utf8_encode($row['resultado']) : "" 
        ];
    }

    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}



?>
