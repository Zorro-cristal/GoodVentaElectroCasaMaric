<?php

require_once 'conexion.php';
require_once 'verificar_navegador.php';
require_once 'EquifaxBasePositivaClient.php';

header('Content-Type: application/json; charset=utf-8');

function bpResponder($ok, $mensaje, $datos)
{
    echo json_encode(array('ok' => $ok, 'mensaje' => $mensaje, 'datos' => $datos));
    exit;
}

function bpPost($nombre, $default)
{
    return isset($_POST[$nombre]) ? trim($_POST[$nombre]) : $default;
}

function bpAutenticar()
{
    $user = bpPost('useru', '');
    $pass = str_replace('=', '+', bpPost('passu', ''));
    $navegador = bpPost('navegador', '');
    if ($user === '' || verificar_navegador($user, $navegador, $pass) !== 'ok') {
        bpResponder(false, 'La sesion no es valida.', array('codigo' => 'UI'));
    }

    $mysqli = conectar_al_servidor();
    $stmt = $mysqli->prepare("SELECT a.accion FROM accesosuser a INNER JOIN listadodeacceso l ON l.idlistadodeacceso=a.idlistadodeaccesoFK WHERE a.usuarios_idusario=? AND l.codigo='VERBASEPOSITIVAEQUIFAX' LIMIT 1");
    $stmt->bind_param('i', $user);
    $stmt->execute();
    $result = $stmt->get_result();
    $fila = $result ? $result->fetch_assoc() : null;
    $stmt->close();
    $mysqli->close();
    if (!$fila || $fila['accion'] !== 'SI') {
        bpResponder(false, 'No tiene permiso para administrar Base Positiva Equifax.', array());
    }
    return (int) $user;
}

function bpConfig($mysqli, $incluirSecreto)
{
    $result = $mysqli->query('SELECT * FROM equifax_bp_config WHERE id=1');
    $config = $result ? $result->fetch_assoc() : array();
    if (!$incluirSecreto && isset($config['client_secret'])) {
        $config['client_secret'] = '';
        $config['secret_configurado'] = true;
    }
    return $config;
}

function bpValidarConfig($config, $requiereCredenciales)
{
    $campos = array('base_url', 'scope', 'supplier_id', 'user_id', 'contribution_name', 'codigo_cliente', 'sucursal');
    if ($requiereCredenciales) {
        $campos[] = 'client_id';
        $campos[] = 'client_secret';
    }
    foreach ($campos as $campo) {
        if (!isset($config[$campo]) || trim($config[$campo]) === '') {
            throw new RuntimeException('Falta configurar: ' . $campo . '.');
        }
    }
    if (!filter_var($config['base_url'], FILTER_VALIDATE_URL) || stripos($config['base_url'], 'https://') !== 0) {
        throw new RuntimeException('La URL base debe ser HTTPS y valida.');
    }
}

function bpSeguro($valor, $maximo)
{
    $valor = strtoupper(trim((string) $valor));
    $valor = str_replace(array("\r", "\n", ';'), array(' ', ' ', ','), $valor);
    if (function_exists('iconv')) {
        $convertido = @iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $valor);
        if ($convertido !== false) {
            $valor = $convertido;
        }
    }
    return substr($valor, 0, $maximo);
}

function bpDocumento($valor)
{
    return substr(preg_replace('/[^0-9A-Za-z-]/', '', (string) $valor), 0, 30);
}

function bpNombrePartes($nombre, $apellido)
{
    $nombres = preg_split('/\s+/', trim($nombre));
    $apellidos = preg_split('/\s+/', trim($apellido));
    return array(
        isset($apellidos[0]) ? $apellidos[0] : 'SIN APELLIDO',
        isset($apellidos[1]) ? $apellidos[1] : '',
        isset($nombres[0]) ? $nombres[0] : 'SIN NOMBRE',
        isset($nombres[1]) ? $nombres[1] : ''
    );
}

function bpFila($campos, $total)
{
    return implode(';', array_pad($campos, $total, ''));
}

function bpObtenerOperaciones($mysqli, $periodo, $tipoArchivo)
{
    $inicio = substr($periodo, 0, 4) . '-' . substr($periodo, 4, 2) . '-01';
    $fin = date('Y-m-t', strtotime($inicio));
    $condicionFecha = $tipoArchivo === 'ALTA'
        ? "v.fecha_venta BETWEEN '$inicio' AND '$fin'"
        : "v.fecha_venta <= '$fin'";

    $sql = "SELECT v.cod_venta,v.fecha_venta,v.total_venta,v.pago,v.TipoVenta,
                   c.cod_cliente,c.ci_cliente,c.rut_cliente,c.tipo_persona_equifax,c.fechanac,c.whapp,c.lugardetrabajo,c.direcciontrab,
                   p.nombre_persona,p.apellido_persona,p.direccion,p.telefono,
                   COUNT(cr.idcredito) total_cuotas,
                   SUM(CASE WHEN IFNULL(pg.pagado,0) < (cr.Monto-cr.descuento) THEN 1 ELSE 0 END) cuotas_pendientes,
                   SUM(GREATEST((cr.Monto-cr.descuento)-IFNULL(pg.pagado,0),0)) saldo_total,
                   SUM(CASE WHEN cr.fechapago <= '$fin' THEN GREATEST((cr.Monto-cr.descuento)-IFNULL(pg.pagado,0),0) ELSE 0 END) saldo_vencido,
                   SUM(CASE WHEN DATE_FORMAT(cr.fechapago,'%Y%m')='$periodo' THEN cr.Monto-cr.descuento ELSE 0 END) compromiso_mes,
                   MIN(CASE WHEN IFNULL(pg.pagado,0) < (cr.Monto-cr.descuento) THEN cr.fechapago ELSE NULL END) primera_vencida,
                   MAX(cr.Monto-cr.descuento) cuota_mes
            FROM venta v
            INNER JOIN cliente c ON c.cod_cliente=v.cod_clienteFK
            INNER JOIN persona p ON p.cod_persona=c.cod_cliente
            INNER JOIN credito cr ON cr.cod_venta=v.cod_venta
            LEFT JOIN (
                SELECT cod_creditoFK,SUM(Monto) pagado
                FROM pago
                WHERE Tipo='Pago Cuota' AND (anulado IS NULL OR anulado<>'SI') AND Fecha <= '$fin'
                GROUP BY cod_creditoFK
            ) pg ON pg.cod_creditoFK=cr.idcredito
            WHERE v.TipoVenta='CREDITO'
              AND (v.anulado IS NULL OR v.anulado<>'SI')
              AND $condicionFecha
            GROUP BY v.cod_venta
            HAVING ('$tipoArchivo'='ALTA') OR saldo_total > 0 OR DATE_FORMAT(v.fecha_venta,'%Y%m')='$periodo'
            ORDER BY v.cod_venta";
    $result = $mysqli->query($sql);
    if (!$result) {
        throw new RuntimeException('No se pudieron obtener los creditos: ' . $mysqli->error);
    }
    $filas = array();
    while ($row = $result->fetch_assoc()) {
        $filas[] = $row;
    }
    return $filas;
}

function bpEsEmpresa($row)
{
    return isset($row['tipo_persona_equifax']) && $row['tipo_persona_equifax'] === 'EMPRESA';
}

function bpGenerarArchivo($mysqli, $config, $periodo, $frecuencia, $tipoPersona, $tipoArchivo, $user)
{
    $operaciones = bpObtenerOperaciones($mysqli, $periodo, $tipoArchivo);
    $esPersonas = $tipoPersona === 'PERSONAS';
    $totalCampos = $esPersonas ? ($tipoArchivo === 'ALTA' ? 76 : 90) : ($tipoArchivo === 'ALTA' ? 40 : 54);
    $fecha = date('Ymd');
    $hora = date('His');
    $sufijo = $frecuencia === 'DIARIO' ? date('dmY') : substr($periodo, 4, 2) . substr($periodo, 0, 4);
    $nombre = str_pad($config['codigo_cliente'], 6, '0', STR_PAD_LEFT) . '_' . $tipoPersona . '_' . $tipoArchivo . '_' . $sufijo . '.txt';
    $tipoConstante = ($tipoArchivo === 'ALTA' ? 'ALTAS ' : 'ACTUALIZACIONES ') . $tipoPersona;
    $lineas = array(bpFila(array($config['codigo_cliente'], '01', 'INICIO ARCHIVO', $tipoConstante, $fecha, $hora, $periodo), $totalCampos));
    $cantidad = 0;

    foreach ($operaciones as $row) {
        if (!isset($row['tipo_persona_equifax']) || !in_array($row['tipo_persona_equifax'], array('PERSONA','EMPRESA'), true)) {
            continue;
        }
        if (bpEsEmpresa($row) === $esPersonas) {
            continue;
        }
        $saldo = max(0, (int) round($row['saldo_total']));
        $saldoVencido = max(0, (int) round($row['saldo_vencido']));
        $diasAtraso = 0;
        if (!empty($row['primera_vencida']) && $row['primera_vencida'] <= date('Y-m-t', strtotime(substr($periodo, 0, 4) . '-' . substr($periodo, 4, 2) . '-01'))) {
            $diasAtraso = max(0, (int) floor((strtotime(date('Y-m-t', strtotime(substr($periodo, 0, 4) . '-' . substr($periodo, 4, 2) . '-01'))) - strtotime($row['primera_vencida'])) / 86400));
        }
        $cerrada = $saldo <= 0 ? 'S' : 'N';
        $documento = $esPersonas ? bpDocumento($row['ci_cliente']) : bpDocumento($row['rut_cliente']);
        if ($documento === '') {
            continue;
        }
        $base = array('I', $config['sucursal'], '1P', (string) $row['cod_venta'], 'T', (string) $row['cod_cliente']);
        if ($tipoArchivo === 'ALTA') {
            $base[] = $periodo;
            $base = array_merge($base, array($config['tipo_prestamo'], $config['moneda'], (string) max(1, round($row['total_venta'] - $row['pago'])), (string) max(1, $row['total_cuotas']), $config['periodicidad'], date('Ymd', strtotime($row['fecha_venta'])), ''));
        } else {
            $base = array_merge($base, array((string) $diasAtraso, $cerrada, $periodo, '', (string) max(0, round($row['compromiso_mes'])), (string) $saldo, '0', (string) max(0, $row['cuotas_pendientes']), (string) max(0, round($row['cuota_mes'])), (string) $saldoVencido, $config['moneda'], 'Normal', 'N', '', '', '', '', '', '', '', ''));
        }

        if ($esPersonas) {
            $partes = bpNombrePartes($row['nombre_persona'], $row['apellido_persona']);
            $persona = array('', 'CI', 'PY', $documento, 'PY', bpSeguro($partes[0], 50), bpSeguro($partes[1], 50), '', bpSeguro($partes[2], 50), bpSeguro($partes[3], 50));
            $nacimiento = ($row['fechanac'] && $row['fechanac'] !== '0000-00-00') ? date('Ymd', strtotime($row['fechanac'])) : '';
            $persona = array_merge($persona, array($nacimiento, '', '', bpSeguro($row['direccion'], 255), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', bpSeguro($row['telefono'], 85), bpSeguro($row['lugardetrabajo'], 120), '', '', bpSeguro($row['direcciontrab'], 255)));
            $lineas[] = bpFila(array_merge($base, $persona), $totalCampos);
        } else {
            $razon = bpSeguro(trim($row['nombre_persona'] . ' ' . $row['apellido_persona']), 160);
            $empresa = array('', 'RUC', 'PY', $documento, $razon, $razon, '', '', bpSeguro($row['direccion'], 255), '', '', '', '', '', '', '', '', '', '', '', '', bpSeguro($row['telefono'], 80));
            $lineas[] = bpFila(array_merge($base, $empresa), $totalCampos);
        }
        $cantidad++;
    }

    $lineas[] = bpFila(array('FIN ARCHIVO', (string) $cantidad, '0', '0', '0', '0'), $totalCampos);
    $directorio = __DIR__ . DIRECTORY_SEPARATOR . 'equifax_private';
    if (!is_dir($directorio) && !mkdir($directorio, 0770, true)) {
        throw new RuntimeException('No se pudo crear el directorio privado de Equifax.');
    }
    $txtPath = $directorio . DIRECTORY_SEPARATOR . $nombre;
    if (file_put_contents($txtPath, implode("\r\n", $lineas) . "\r\n", LOCK_EX) === false) {
        throw new RuntimeException('No se pudo guardar el archivo generado.');
    }
    if (!class_exists('ZipArchive')) {
        throw new RuntimeException('La extension ZipArchive de PHP no esta habilitada.');
    }
    $zipNombre = substr($nombre, 0, -4) . '.zip';
    $zipPath = $directorio . DIRECTORY_SEPARATOR . $zipNombre;
    $zip = new ZipArchive();
    if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
        throw new RuntimeException('No se pudo crear el ZIP.');
    }
    $zip->addFile($txtPath, $nombre);
    $zip->close();

    $stmt = $mysqli->prepare("INSERT INTO equifax_bp_carga (periodo,frecuencia,tipo_persona,tipo_archivo,nombre_archivo,ruta_archivo,cantidad_registros,estado,creado_por,creado_at) VALUES (?,?,?,?,?,?,?,'GENERADO',?,NOW())");
    $stmt->bind_param('ssssssii', $periodo, $frecuencia, $tipoPersona, $tipoArchivo, $zipNombre, $zipPath, $cantidad, $user);
    $stmt->execute();
    $id = $stmt->insert_id;
    $stmt->close();
    return array('id' => $id, 'archivo' => $zipNombre, 'registros' => $cantidad);
}

$usuario = bpAutenticar();
$accion = bpPost('accion', 'estado');
$mysqli = conectar_al_servidor();
$mysqli->set_charset('utf8');

try {
    if ($accion === 'estado') {
        $config = bpConfig($mysqli, false);
        $lista = array();
        $result = $mysqli->query('SELECT id,periodo,frecuencia,tipo_persona,tipo_archivo,nombre_archivo,cantidad_registros,estado,equifax_id,phase,valid_count,error_count,percent,creado_at,enviado_at,actualizado_at FROM equifax_bp_carga ORDER BY id DESC LIMIT 100');
        while ($result && $row = $result->fetch_assoc()) {
            $lista[] = $row;
        }
        bpResponder(true, '', array('config' => $config, 'cargas' => $lista));
    }

    if ($accion === 'guardar_config') {
        $campos = array('ambiente','base_url','token_url','scope','client_id','supplier_id','user_id','contribution_name','codigo_cliente','sucursal','tipo_prestamo','periodicidad','moneda','activo');
        $valores = array();
        foreach ($campos as $campo) {
            $valores[$campo] = bpPost($campo, '');
        }
        $actual = bpConfig($mysqli, true);
        $secreto = bpPost('client_secret', '');
        if ($secreto === '') {
            $secreto = isset($actual['client_secret']) ? $actual['client_secret'] : '';
        }
        if (!in_array($valores['ambiente'], array('SANDBOX','UAT','PRD'), true)) {
            throw new RuntimeException('Ambiente invalido.');
        }
        if (!in_array($valores['activo'], array('SI','NO'), true)) {
            $valores['activo'] = 'NO';
        }
        if ($valores['base_url'] !== '' && (stripos($valores['base_url'], 'https://') !== 0 || !filter_var($valores['base_url'], FILTER_VALIDATE_URL))) {
            throw new RuntimeException('La URL base debe ser HTTPS y valida.');
        }
        $stmt = $mysqli->prepare('UPDATE equifax_bp_config SET ambiente=?,base_url=?,token_url=?,scope=?,client_id=?,client_secret=?,supplier_id=?,user_id=?,contribution_name=?,codigo_cliente=?,sucursal=?,tipo_prestamo=?,periodicidad=?,moneda=?,activo=?,updated_at=NOW(),updated_by=? WHERE id=1');
        $stmt->bind_param('sssssssssssssssi', $valores['ambiente'], $valores['base_url'], $valores['token_url'], $valores['scope'], $valores['client_id'], $secreto, $valores['supplier_id'], $valores['user_id'], $valores['contribution_name'], $valores['codigo_cliente'], $valores['sucursal'], $valores['tipo_prestamo'], $valores['periodicidad'], $valores['moneda'], $valores['activo'], $usuario);
        if (!$stmt->execute()) {
            throw new RuntimeException('No se pudo guardar la configuracion: ' . $stmt->error);
        }
        $stmt->close();
        bpResponder(true, 'Configuracion guardada.', array());
    }

    if ($accion === 'probar_conexion') {
        $config = bpConfig($mysqli, true);
        bpValidarConfig($config, true);
        $cliente = new EquifaxBasePositivaClient($config);
        $cliente->obtenerToken();
        bpResponder(true, 'Autenticacion con Equifax correcta.', array());
    }

    if ($accion === 'generar') {
        $config = bpConfig($mysqli, true);
        if ($config['activo'] !== 'SI') {
            throw new RuntimeException('Debe activar el modulo antes de generar archivos.');
        }
        $periodo = bpPost('periodo', '');
        $frecuencia = bpPost('frecuencia', 'MENSUAL');
        if (!preg_match('/^[0-9]{6}$/', $periodo) || !checkdate((int) substr($periodo, 4, 2), 1, (int) substr($periodo, 0, 4))) {
            throw new RuntimeException('El periodo debe tener formato AAAAMM.');
        }
        if ($frecuencia !== 'MENSUAL') {
            throw new RuntimeException('El aporte diario requiere seleccionar una fecha exacta y no esta habilitado en esta primera etapa.');
        }
        $generados = array();
        foreach (array('PERSONAS','EMPRESAS') as $tipoPersona) {
            foreach (array('ALTA','ACT') as $tipoArchivo) {
                $generados[] = bpGenerarArchivo($mysqli, $config, $periodo, $frecuencia, $tipoPersona, $tipoArchivo, $usuario);
            }
        }
        bpResponder(true, 'Se generaron los cuatro archivos de Base Positiva.', $generados);
    }

    if ($accion === 'enviar') {
        $id = (int) bpPost('id', '0');
        $stmt = $mysqli->prepare('SELECT * FROM equifax_bp_carga WHERE id=? LIMIT 1');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $carga = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if (!$carga) {
            throw new RuntimeException('Carga inexistente.');
        }
        $config = bpConfig($mysqli, true);
        bpValidarConfig($config, true);
        $cliente = new EquifaxBasePositivaClient($config);
        $respuesta = $cliente->enviarArchivo($carga['ruta_archivo'], substr($carga['periodo'], 4, 2) . '/' . substr($carga['periodo'], 0, 4));
        $equifaxId = isset($respuesta['json']['id']) ? (string) $respuesta['json']['id'] : '';
        if ($equifaxId === '') {
            throw new RuntimeException('Equifax recibio la solicitud pero no devolvio el id de carga.');
        }
        $body = substr($respuesta['body'], 0, 4000);
        $stmt = $mysqli->prepare("UPDATE equifax_bp_carga SET estado='ENVIADO',equifax_id=?,respuesta=?,enviado_at=NOW(),actualizado_at=NOW() WHERE id=?");
        $stmt->bind_param('ssi', $equifaxId, $body, $id);
        $stmt->execute();
        $stmt->close();
        bpResponder(true, 'Archivo enviado. ID Equifax: ' . $equifaxId, array('equifax_id' => $equifaxId));
    }

    if ($accion === 'actualizar') {
        $id = (int) bpPost('id', '0');
        $stmt = $mysqli->prepare('SELECT * FROM equifax_bp_carga WHERE id=? AND equifax_id IS NOT NULL LIMIT 1');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $carga = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if (!$carga) {
            throw new RuntimeException('La carga aun no posee un ID de Equifax.');
        }
        $config = bpConfig($mysqli, true);
        bpValidarConfig($config, true);
        $cliente = new EquifaxBasePositivaClient($config);
        $respuesta = $cliente->consultarCarga($carga['equifax_id']);
        $r = $respuesta['json'];
        $phase = isset($r['phase']) ? (string) $r['phase'] : '';
        $valid = isset($r['validCnt']) ? (int) $r['validCnt'] : null;
        $errors = isset($r['errorCnt']) ? (int) $r['errorCnt'] : null;
        $percent = isset($r['percent']) ? (string) $r['percent'] : '';
        $estado = strtoupper($phase) === 'OK' ? 'PROCESADO' : 'PROCESANDO';
        $body = substr($respuesta['body'], 0, 4000);
        $stmt = $mysqli->prepare('UPDATE equifax_bp_carga SET estado=?,phase=?,valid_count=?,error_count=?,percent=?,respuesta=?,actualizado_at=NOW() WHERE id=?');
        $stmt->bind_param('ssiissi', $estado, $phase, $valid, $errors, $percent, $body, $id);
        $stmt->execute();
        $stmt->close();
        bpResponder(true, 'Estado de carga actualizado.', $r);
    }

    if ($accion === 'descargar') {
        throw new RuntimeException('La descarga se realiza mediante el endpoint seguro de archivos.');
    }

    throw new RuntimeException('Operacion no soportada.');
} catch (Exception $e) {
    bpResponder(false, $e->getMessage(), array());
}
