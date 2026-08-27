<?php
require("conexion.php");
include("verificar_navegador.php");

$funt=isset($_POST['funt']) ? utf8_decode($_POST['funt']) : '';
$user=isset($_POST['useru']) ? utf8_decode($_POST['useru']) : '';
$pass=isset($_POST['passu']) ? str_replace("=","+",$_POST['passu']) : '';
$navegador=isset($_POST['navegador']) ? utf8_decode($_POST['navegador']) : '';

if($user==='' || verificar_navegador($user,$navegador,$pass)!="ok"){
	echo json_encode(array("1" => "UI"));
	exit;
}

if($funt==="cargar"){
	cargarAccesosDirectosUsuario($user);
}
if($funt==="guardar"){
	$acciones=json_decode(isset($_POST['acciones']) ? $_POST['acciones'] : '',true);
	guardarAccesosDirectosUsuario($user,$acciones);
}

echo json_encode(array("1" => "error"));
exit;

function cargarAccesosDirectosUsuario($cod_usuario)
{
	$mysqli=conectar_al_servidor();
	$stmt=$mysqli->prepare("SELECT accion FROM accesos_directos_usuario WHERE cod_usuario=? ORDER BY orden ASC");
	$stmt->bind_param('i',$cod_usuario);
	if(!$stmt->execute()){
		echo json_encode(array("1" => "error"));
		exit;
	}
	$result=$stmt->get_result();
	$acciones=array();
	while($fila=mysqli_fetch_assoc($result)){
		$acciones[]=utf8_encode($fila['accion']);
	}
	$stmt->close();
	$mysqli->close();
	echo json_encode(array("1" => "exito","2" => $acciones));
	exit;
}

function guardarAccesosDirectosUsuario($cod_usuario,$acciones)
{
	if(!is_array($acciones) || count($acciones)>300){
		echo json_encode(array("1" => "DI"));
		exit;
	}

	$accionesValidas=array();
	foreach($acciones as $accion){
		if(!is_string($accion)) continue;
		$accion=trim($accion);
		if($accion==='' || strlen($accion)>500) continue;
		$accionesValidas[$accion]=$accion;
	}

	$mysqli=conectar_al_servidor();
	$mysqli->begin_transaction();
	$stmtEliminar=$mysqli->prepare("DELETE FROM accesos_directos_usuario WHERE cod_usuario=?");
	$stmtEliminar->bind_param('i',$cod_usuario);
	if(!$stmtEliminar->execute()){
		$mysqli->rollback();
		echo json_encode(array("1" => "error"));
		exit;
	}
	$stmtEliminar->close();

	$stmtInsertar=$mysqli->prepare("INSERT INTO accesos_directos_usuario (cod_usuario,clave_acceso,accion,orden) VALUES (?,?,?,?)");
	if(!$stmtInsertar){
		$mysqli->rollback();
		echo json_encode(array("1" => "error"));
		exit;
	}
	$orden=0;
	foreach($accionesValidas as $accion){
		$clave=sha1($accion);
		$accionDb=utf8_decode($accion);
		$stmtInsertar->bind_param('issi',$cod_usuario,$clave,$accionDb,$orden);
		if(!$stmtInsertar->execute()){
			$stmtInsertar->close();
			$mysqli->rollback();
			$mysqli->close();
			echo json_encode(array("1" => "error"));
			exit;
		}
		$orden++;
	}
	$stmtInsertar->close();
	$mysqli->commit();
	$mysqli->close();
	echo json_encode(array("1" => "exito","2" => $orden));
	exit;
}
?>
