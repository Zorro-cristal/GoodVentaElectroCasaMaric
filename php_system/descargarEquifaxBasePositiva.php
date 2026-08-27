<?php
require_once 'conexion.php';
require_once 'verificar_navegador.php';

$id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
$user = isset($_POST['useru']) ? (int) $_POST['useru'] : 0;
$pass = isset($_POST['passu']) ? str_replace('=', '+', $_POST['passu']) : '';
$navegador = isset($_POST['navegador']) ? $_POST['navegador'] : '';
if ($id <= 0 || verificar_navegador($user, $navegador, $pass) !== 'ok') {
    http_response_code(403);
    exit('Acceso denegado');
}
$mysqli = conectar_al_servidor();
$stmt = $mysqli->prepare("SELECT c.nombre_archivo,c.ruta_archivo FROM equifax_bp_carga c WHERE c.id=? AND EXISTS (SELECT 1 FROM accesosuser a INNER JOIN listadodeacceso l ON l.idlistadodeacceso=a.idlistadodeaccesoFK WHERE a.usuarios_idusario=? AND a.accion='SI' AND l.codigo='VERBASEPOSITIVAEQUIFAX') LIMIT 1");
$stmt->bind_param('ii', $id, $user);
$stmt->execute();
$fila = $stmt->get_result()->fetch_assoc();
$stmt->close();
$mysqli->close();
if (!$fila || !is_file($fila['ruta_archivo'])) {
    http_response_code(404);
    exit('Archivo no encontrado');
}
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . basename($fila['nombre_archivo']) . '"');
header('Content-Length: ' . filesize($fila['ruta_archivo']));
header('X-Content-Type-Options: nosniff');
readfile($fila['ruta_archivo']);
exit;
