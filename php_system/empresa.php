<?php
require("conexion.php");
include("verificar_navegador.php");
include("subir_foto_base64.php");
$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

function ObtenerDatos($operacion)
{

   $user=$_POST['useru'];
    $user = utf8_decode($user);
	$pass=$_POST['passu'];	
	  $pass = str_replace("=","+",$pass);
$navegador=$_POST['navegador'];
$navegador = utf8_decode($navegador);
$resp=verificar_navegador($user,$navegador,$pass);
if($resp!="ok"){
$informacion =array("1" => "UI");
echo json_encode($informacion);	
exit;
}



if($operacion=="buscarDatosEmpresa")
{
	$ruc_buscar=isset($_POST['ruc']) ? $_POST['ruc'] : "";
	$ruc_buscar = utf8_decode($ruc_buscar);

	buscarDatosEmpresa($user,$ruc_buscar);

}
}

function buscarDatosEmpresa($user,$ruc_buscar="")
{
	$mysqli=conectar_al_servidor();
	if($ruc_buscar!=""){
		$sql= "SELECT nombre, ruc FROM datos_empresa where ruc=? limit 1";
		$stmt = $mysqli->prepare($sql);
		$ss='s';
		$stmt->bind_param($ss,$ruc_buscar);
	}else{
		$sql= "SELECT nombre, ruc FROM datos_empresa order by ruc asc limit 1";
		$stmt = $mysqli->prepare($sql);
	}
if ( !$stmt || ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 if ($valor==0 && $ruc_buscar!="")
 {
		$sql= "SELECT nombre, ruc FROM datos_empresa order by ruc asc limit 1";
		$stmt = $mysqli->prepare($sql);
if ( !$stmt || ! $stmt->execute()) {
   echo "Error";
   exit;
}
	$result = $stmt->get_result();
	$valor= mysqli_num_rows($result);
 }
 $nombre = "";
 $ruc = "";
 $datosLocal = buscarDatosLocalEmpresa($mysqli,$user);
 $telefono = $datosLocal["telefono"];
 $direccion = $datosLocal["direccion"];
 $ciudad = $datosLocal["ciudad"];
 $local = $datosLocal["local"];
 $cod_local = $datosLocal["cod_local"];
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $nombre=utf8_encode($valor['nombre']);
		  	  $ruc=utf8_encode($valor['ruc']);
	  }
 }
 
 
 mysqli_close($mysqli);
$informacion =array(
	"1" => "exito",
	"2" => $nombre,
	"3" => $ruc,
	"4" => $telefono,
	"5" => $direccion,
	"6" => $local,
	"7" => $cod_local,
	"8" => $ciudad,
	"nombre" => $nombre,
	"ruc" => $ruc,
	"telefono" => $telefono,
	"direccion" => $direccion,
	"ciudad" => $ciudad,
	"local" => $local,
	"cod_local" => $cod_local
);
echo json_encode($informacion);	
exit;


}

function buscarDatosLocalEmpresa($mysqli,$user)
{
	$datos = array(
		"telefono" => "",
		"direccion" => "",
		"ciudad" => "",
		"local" => "",
		"cod_local" => ""
	);

	if(asegurarCamposContactoLocalEmpresa($mysqli)==false){
		return $datos;
	}

	$campoCiudad = columnaLocalExisteEmpresa($mysqli,"ciudad") ? "l.ciudad" : "''";

	$sql= "SELECT l.cod_local,l.Nombre,l.telefono,l.direccion,".$campoCiudad." as ciudad
		FROM local l
		INNER JOIN usuario u ON u.cod_localFK=l.cod_local
		WHERE u.cod_usuario=? and l.estado='Activo'
		LIMIT 1";
	$stmt = $mysqli->prepare($sql);
	if ($stmt) {
		$ss='s';
		$stmt->bind_param($ss,$user);
		if ($stmt->execute()) {
			$result = $stmt->get_result();
			if (mysqli_num_rows($result)>0) {
				while ($valor= mysqli_fetch_assoc($result)) {
					$datos["telefono"]=utf8_encode($valor['telefono']);
					$datos["direccion"]=utf8_encode($valor['direccion']);
					$datos["ciudad"]=utf8_encode($valor['ciudad']);
					$datos["local"]=utf8_encode($valor['Nombre']);
					$datos["cod_local"]=utf8_encode($valor['cod_local']);
				}
			}
		}
	}

	if ($datos["cod_local"]!="") {
		return $datos;
	}

	$sql= "SELECT cod_local,Nombre,telefono,direccion,".$campoCiudad." as ciudad FROM local l where estado='Activo' order by cod_local asc limit 1";
	$stmt = $mysqli->prepare($sql);
	if ($stmt && $stmt->execute()) {
		$result = $stmt->get_result();
		if (mysqli_num_rows($result)>0) {
			while ($valor= mysqli_fetch_assoc($result)) {
				$datos["telefono"]=utf8_encode($valor['telefono']);
				$datos["direccion"]=utf8_encode($valor['direccion']);
				$datos["ciudad"]=utf8_encode($valor['ciudad']);
				$datos["local"]=utf8_encode($valor['Nombre']);
				$datos["cod_local"]=utf8_encode($valor['cod_local']);
			}
		}
	}

	return $datos;
}

function asegurarCamposContactoLocalEmpresa($mysqli)
{
	if(asegurarColumnaLocalEmpresa($mysqli,"telefono","varchar(100) DEFAULT NULL")==false){
		return false;
	}

	if(asegurarColumnaLocalEmpresa($mysqli,"direccion","varchar(255) DEFAULT NULL")==false){
		return false;
	}

	if(asegurarColumnaLocalEmpresa($mysqli,"ciudad","varchar(100) DEFAULT NULL")==false){
		return false;
	}

	return true;
}

function asegurarColumnaLocalEmpresa($mysqli,$columna,$definicion)
{
	$consulta="SHOW COLUMNS FROM `local` LIKE '".$columna."'";
	$stmt = $mysqli->prepare($consulta);

	if(!$stmt || !$stmt->execute()){
		return false;
	}

	$result = $stmt->get_result();

	if(mysqli_num_rows($result)>0){
		return true;
	}

	$consulta="ALTER TABLE `local` ADD COLUMN `".$columna."` ".$definicion;
	$stmt = $mysqli->prepare($consulta);

	if(!$stmt || !$stmt->execute()){
		return false;
	}

	return true;
}

function columnaLocalExisteEmpresa($mysqli,$columna)
{
	$columna=mysqli_real_escape_string($mysqli,$columna);
	$consulta="SHOW COLUMNS FROM `local` LIKE '".$columna."'";
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt){
		return false;
	}
	if(!$stmt->execute()){
		return false;
	}
	$result = $stmt->get_result();
	return mysqli_num_rows($result)>0;
}


ObtenerDatos($operacion);

?>
