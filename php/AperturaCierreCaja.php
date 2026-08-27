<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

require("conexion.php");
include("verificar_navegador.php");
function verificar($operacion)
{
	
 $user=$_POST['user'];
    $user = utf8_decode($user);
	$pass=$_POST['pass'];	
	  $pass = str_replace("=","+",$pass);
$navegador=$_POST['navegador'];
$navegador = utf8_decode($navegador);
$resp=verificar_navegador($user,$navegador,$pass);
if($resp!="ok" && $operacion!="buscaroptionlogin"){
$informacion =array("1" => "UI");
echo json_encode($informacion);	
exit;
}


	
if($operacion=="nuevo" || $operacion=="editar")
{
	
$idaperturacajaapp=$_POST['idaperturacajaapp'];
$idaperturacajaapp = utf8_decode($idaperturacajaapp);
$fechaapertura=$_POST['fechaapertura'];
$fechaapertura = utf8_decode($fechaapertura);
$fechacierre=$_POST['fechacierre'];
$fechacierre = utf8_decode($fechacierre);
if($idaperturacajaapp!=""){
$montocierre=buscarmotorecaudadocajaapp($idaperturacajaapp);
$montoGasto=buscarmotoGastocajaapp($idaperturacajaapp);
$diferencia=$montocierre - $montoGasto;
}else{
	$montocierre="0";
	$montoGasto="0";
	$diferencia="0";
}
$cod_cobrador = $user;
abm($idaperturacajaapp,$fechaapertura,$fechacierre,$montocierre,$montoGasto,$diferencia,$cod_cobrador,$operacion);
}


if($operacion=="montorecaudado")
{
$idaperturacajaapp=$_POST['idaperturacajaapp'];
$idaperturacajaapp = utf8_decode($idaperturacajaapp);
if($idaperturacajaapp!=""){
$montocierre=buscarmotorecaudadocajaapp($idaperturacajaapp);
$montoGasto=buscarmotoGastocajaapp($idaperturacajaapp);
$diferencia=$montocierre - $montoGasto;

}else{
	$montocierre="0";
	$montoGasto="0";
	$diferencia="0";
}
$informacion =array("1" => "exito","2" => number_format($montocierre,'0',',','.'),"3" => number_format($montoGasto,'0',',','.')
,"4" => number_format($diferencia,'0',',','.'));
echo json_encode($informacion);	
exit;
}
if($operacion=="buscarcodcaja" )
{
	
buscarcajaabierta($user);
}

}



function buscarmotoGastocajaapp($codcaja)
{
	$mysqli=conectar_al_servidor();
	 $totalIngreso=0;
	 $totalEngreso=0;
	 
	  $Total=0;
	 
		$sql= "Select sum(monto) as total
		from gastos_cobrador where codApertura='".$codcaja."' and tipo='EGRESO' and estado='Activo' ";   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $totalEngreso=$valor['total'];		  
	  }
 }
 
 
		$sql= "Select sum(monto) as total
		from gastos_cobrador where codApertura='".$codcaja."'  and tipo='INGRESO' and estado='Activo' ";   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $totalIngreso=$valor['total'];		  
	  }
 }
 
  
 $Total= $totalEngreso - $totalIngreso ;
 
 
 
return $Total;
}



function abm($idaperturacajaapp,$fechaapertura,$fechacierre,$montocierre,$montoGasto,$diferencia,$cod_cobrador,$operacion)
{

$mysqli=conectar_al_servidor();

if($operacion=="nuevo")
{

$consulta1="Insert into aperturacajaapp (fechaapertura,estado,cod_cobrador)
values(?,'Activo',?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$fechaapertura,$cod_cobrador);

}

if($operacion=="editar")
{

$consulta1="Update aperturacajaapp set fechacierre='$fechacierre',montocierre=$montocierre,montogasto=$montoGasto,totalcaja=$diferencia,estado='Cerrado' where idaperturacajaapp=$idaperturacajaapp";	

// echo($consulta1);
// exit;
$stmt1 = $mysqli->prepare($consulta1);

}

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => number_format($montocierre,'0',',','.'));
echo json_encode($informacion);	
exit;
	
}

function buscarcajaabierta($cod_cobrador)
{
	$mysqli=conectar_al_servidor();
	 $idaperturacajaapp='';
	 $fechaapertura='';
	 
		$sql= "Select idaperturacajaapp,fechaapertura
		from aperturacajaapp where estado='Activo' and cod_cobrador='".$cod_cobrador."' ";   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $idaperturacajaapp=$valor['idaperturacajaapp'];
		      $fechaapertura=$valor['fechaapertura'];
		  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $idaperturacajaapp,"3"=>$fechaapertura);
echo json_encode($informacion);	
exit;


}


function buscarmotorecaudadocajaapp($codcaja)
{
	$mysqli=conectar_al_servidor();
	
	 
		$sql= "Select ifnull(sum(Monto),0) as total
		from pago where codAperturaApp='".$codcaja."' ";   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
  $total=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $total=$valor['total'];
		  
	  }
 }
 
 
return $total;


}




verificar($operacion);
?>