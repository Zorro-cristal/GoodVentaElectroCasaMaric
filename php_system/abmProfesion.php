<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

include("buscar_nivel.php");
require("conexion.php");
include("verificar_navegador.php");
include("classTable.php");

function verificar($operacion)
{
	
 $user=$_POST['useru'];
    $user = utf8_decode($user);	
if($user!=""){

	$pass=$_POST['passu'];	
	  $pass = str_replace("=","+",$pass);
$navegador=$_POST['navegador'];
$navegador = utf8_decode($navegador);
$resp=verificar_navegador($user,$navegador,$pass);
if($resp!="ok" && $operacion!="buscaroption"){
$informacion =array("1" => "UI");
echo json_encode($informacion);	
exit;
}
}


//CONTROL DE ACCESO



	
if($operacion=="nuevo" || $operacion=="editar")
{
	 
	$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);
	$estado=$_POST['estado'];
$estado = utf8_decode($estado);
	$idprofesion=$_POST['idprofesion'];
$idprofesion = utf8_decode($idprofesion);
	$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
	abm($nombre,$tipo,$estado,$idprofesion,$operacion);

}

if($operacion=="buscar")
{
	$codigo=$_POST['codigo'];
$codigo = utf8_decode($codigo);
$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
	buscar($codigo,$nombre,$estado);

}	


if($operacion=="buscaroption")
{

	buscaroption($user);

}	
 

}

function abm($nombre,$tipo,$estado,$idprofesion,$operacion)
{
	
	
if($nombre==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

if($operacion=="nuevo")
{


$consulta1="Insert into profesion (nombre,tipo,estado)
values(upper(?),?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$nombre,$tipo,$estado);


}


if($operacion=="editar")
{

$consulta1="Update profesion set nombre=upper(?),tipo=?,estado=? where idprofesion=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$nombre,$tipo,$estado,$idprofesion); 

}
 
if (!$stmt1->execute()) { 
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit; 
} 
 
 mysqli_close($mysqli); 


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

 

function buscar($codigo,$nombre,$estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $registros=array();
	 $devolverArray=isset($_POST['formato']) && $_POST['formato']==='json';
	 	$condicioncodigo="";
if($codigo!=""){
	$condicioncodigo=" and idprofesion ='".$codigo."'";
}
$condicionnombre="";
if($nombre!=""){
	$condicionnombre=" and nombre  like '%".$nombre."%'";
}
		$sql= "Select * from profesion where estado=? ".$condicioncodigo.$condicionnombre;
		
   
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';
$stmt->bind_param($s,$estado);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idprofesion=$valor['idprofesion'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $registros[]=array(
		  	  	'codigo'=>$idprofesion,
		  	  	'profesion'=>$nombre,
		  	  	'tipo'=>$tipo,
		  	  	'estado'=>$estado
		  	  );
		  	 
		  	 
			  $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmProfesion(this)'>
<td id='td_id' style='width:15%; background-color: #efeded;color:red'>".$idprofesion."</td>
<td  id='td_datos_1' style='width:65%'>".$nombre."</td>
<td  id='td_datos_3' style='width:20%'>".$tipo."</td>
<td  id='td_datos_2' style='display:none'>".$estado."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($devolverArray ? $registros : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscaroption($user)
{ 
 
		$sql= "Select * from profesion where estado='Activo' ";
 
	$mysqli=conectar_al_servidor();
	
		
		 $pagina="";  

   
   
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
		  
		  
		      $idprofesion=$valor['idprofesion'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$idprofesion' >".$nombre."</option>";   
			  
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina );
echo json_encode($informacion);	
exit;


}


 


verificar($operacion);
?>
