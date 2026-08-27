<?php
require("conexion.php");
include("quitarseparadormiles.php");


function buscarProductos()
{
	
$mysqli=conectar_al_servidor();
$sql= "SELECT * FROM stocklocales where cantidad > 0";



$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);



while ($valor= mysqli_fetch_assoc($result))
{  


$idstocklocales = utf8_encode($valor['idstocklocales']); 
$cantidad = utf8_encode($valor['cantidad']);

SumarRestarStockA($idstocklocales,$cantidad,"SUMA","INICIO");

}




mysqli_close($mysqli);  
echo 'corregido';
exit;
}


function obtener_tipo_producto($cod_producto)
{
	$mysqli=conectar_al_servidor();
	 
	 
		$sql= "SELECT tipo_producto FROM producto WHERE cod_producto ='$cod_producto'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $tipo_producto = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $tipo_producto=utf8_encode($valor['tipo_producto']);
			  
	  }
 }
 
 
 mysqli_close($mysqli);
return $tipo_producto;
}

function actualizar($iddetallesolicitud,$tipo,$plan)
{
	$mysqli=conectar_al_servidor();
	 
	 
		$sql= "UPDATE detallesolicitud SET plan = '$plan', tipo ='$tipo' WHERE iddetallesolicitud = '$iddetallesolicitud'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
 mysqli_close($mysqli);
return true;
}


function SumarRestarStockA($idstockproducto,$cantidad,$operacion,$tipo)
{
	$user='800899162';
	
	date_default_timezone_set('America/Asuncion');
	$fechaHora = date("Y-m-d H:i:s");
	
	
$mysqli=conectar_al_servidor();

$operacion = strtolower($operacion);
if($operacion =='resta'){
	$cantidad = -abs($cantidad);
}


$consulta1="INSERT INTO stock_producto (tipo,operacion,entero,user_insert,fecha_hora,cod_stocklocalesFK) 
values(upper('$tipo'),upper('$operacion'),'$cantidad','$user','$fechaHora','$idstockproducto')";



$stmt1 = $mysqli->prepare($consulta1); 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

 mysqli_close($mysqli);
 
 return true;
}


buscarProductos()


?>