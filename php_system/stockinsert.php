<?php
  
require("conexion.php"); 
InicializarStock();


function InicializarStock()
{
 
$mysqli=conectar_al_servidor();

 $sql= "select * from stocklocales ";
$pagina = "";   
$stmt = $mysqli->prepare($sql); 

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idstocklocales = utf8_encode($valor['idstocklocales']); 
$cantidad = utf8_encode($valor['cantidad']); 
 
 
$consulta1="INSERT INTO stock_producto (tipo,operacion,entero,user_insert,fecha_hora,cod_stocklocalesFK) 
values('INICIO','SUMA','$cantidad','2',now(),'$idstocklocales')";
 
$stmt1 = $mysqli->prepare($consulta1); 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
}
}
 mysqli_close($mysqli);
}

 
?>