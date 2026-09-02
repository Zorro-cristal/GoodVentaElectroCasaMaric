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
	$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$telefono=isset($_POST['telefono']) ? $_POST['telefono'] : "";
$telefono = utf8_decode($telefono);
$direccion=isset($_POST['direccion']) ? $_POST['direccion'] : "";
$direccion = utf8_decode($direccion);
$ciudad=isset($_POST['ciudad']) ? $_POST['ciudad'] : "";
$ciudad = utf8_decode($ciudad);
	abm($nombre,$estado,$cod_local,$operacion,$telefono,$direccion,$ciudad);

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
if($operacion=="buscaroptionlogin")
{

	buscaroptionlogin();

}	

}

function abm($nombre,$estado,$cod_local,$operacion,$telefono,$direccion,$ciudad)
{
	
	
if($nombre==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

if(asegurarCamposContactoLocalCasa($mysqli)==false){
	$informacion =array("1" => "ERRORLOCAL");
	echo json_encode($informacion);
	exit;
}

if($operacion=="nuevo")
{


$consulta1="Insert into local (Nombre,estado,telefono,direccion,ciudad)
values(?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$sssss='sssss';
$stmt1->bind_param($sssss,$nombre,$estado,$telefono,$direccion,$ciudad);


}


if($operacion=="editar")
{

$consulta1="Update local set Nombre=?,estado=?,telefono=?,direccion=?,ciudad=? where cod_local=?";
$stmt1 = $mysqli->prepare($consulta1);
$ssssss='ssssss';
$stmt1->bind_param($ssssss,$nombre,$estado,$telefono,$direccion,$ciudad,$cod_local);

}



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


if($operacion == 'nuevo'){
	$cod_local = mysqli_insert_id($mysqli);
}

 mysqli_close($mysqli);
relacionar_productos_local($cod_local);


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function asegurarCamposContactoLocalCasa($mysqli)
{
	if(asegurarColumnaLocalCasa($mysqli,"telefono","varchar(100) DEFAULT NULL")==false){
		return false;
	}

	if(asegurarColumnaLocalCasa($mysqli,"direccion","varchar(255) DEFAULT NULL")==false){
		return false;
	}

	if(asegurarColumnaLocalCasa($mysqli,"ciudad","varchar(100) DEFAULT NULL")==false){
		return false;
	}

	return true;
}

function asegurarColumnaLocalCasa($mysqli,$columna,$definicion)
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

function relacionar_productos_local($cod_local)
{
	$mysqli=conectar_al_servidor();
	
	
	
	$sql= "SELECT cod_producto FROM producto";
		
   
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  
  
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 mysqli_close($mysqli);
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $cod_producto=$valor['cod_producto'];
			  
			  comprobar_relacion($cod_producto,$cod_local);
			
	  }
 }
 
 

 $informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
function comprobar_relacion($cod_productoFK,$cod_local)
{
	$mysqli=conectar_al_servidor();
	
	
	$sql= "Select * from stocklocales WHERE cod_productofk = '$cod_productoFK' and cod_localfk = '$cod_local' ";
		
   
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
mysqli_close($mysqli);

 if ($valor<=0)
 {
	  insert_stock_local($cod_productoFK,$cod_local);
 }
 
 return true;

}

function insert_stock_local($cod_productoFK,$cod_local)
{
if($cod_productoFK=="" || $cod_local == ''  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();



$consulta1="INSERT INTO stocklocales (cantidad,cod_productofk,cod_localfk) VALUES ('0','$cod_productoFK','$cod_local')";
$stmt1 = $mysqli->prepare($consulta1);



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

mysqli_close($mysqli);
return true;
}



function buscar($codigo,$nombre,$estado)
{
	$mysqli=conectar_al_servidor();
	if(asegurarCamposContactoLocalCasa($mysqli)==false){
		$informacion =array("1" => "ERRORLOCAL");
		echo json_encode($informacion);
		exit;
	}
	 $pagina='';
	 $registros=array();
	 $devolverArray=isset($_POST['formato']) && $_POST['formato']==='json';
	 	$condicioncodigo="";
if($codigo!=""){
	$condicioncodigo=" and cod_local ='".$codigo."'";
}
$condicionnombre="";
if($nombre!=""){
	$condicionnombre=" and Nombre  like '%".$nombre."%'";
}
		$sql= "Select * from local where estado=? ".$condicioncodigo.$condicionnombre;
		
   
   
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
		  
		  
		      $cod_local=$valor['cod_local'];
		  	  $nombre=utf8_encode($valor['Nombre']);
		  	  $estado=utf8_encode($valor['estado']);
$telefono=utf8_encode($valor['telefono']);
$direccion=utf8_encode($valor['direccion']);
$ciudad=utf8_encode($valor['ciudad']);
$registros[]=array(
	'codigo'=>$cod_local,
	'nombre'=>$nombre,
	'estado'=>$estado,
	'telefono'=>$telefono,
	'direccion'=>$direccion,
	'ciudad'=>$ciudad
);
		  	 
		  	 
			  $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCasa(this)'>
<td id='td_id' style='width:15%; background-color: #efeded;color:red'>".$cod_local."</td>
<td  id='td_datos_1' style='width:85%'>".$nombre."</td>
<td  id='td_datos_2' style='display:none'>".$estado."</td>
<td  id='td_datos_3' style='display:none'>".$telefono."</td>
<td  id='td_datos_4' style='display:none'>".$direccion."</td>
<td  id='td_datos_5' style='display:none'>".$ciudad."</td>
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
	
	$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$codlocal=buscarlocaluser($user);
		$sql= "Select * from local where estado='Activo' and cod_local='$codlocal' ";
	}else{
		$sql= "Select * from local where estado='Activo' ";
	}
	
	
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
		  
		  
		      $cod_local=$valor['cod_local'];
		  	  $nombre=utf8_encode($valor['Nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$cod_local' >".$nombre."</option>";   
			  
	  }
 }
 
 $paginaTodos =buscaroptionTodos();
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro,"4" => $paginaTodos);
echo json_encode($informacion);	
exit;


}






function buscaroptionTodos()
{
	 
		$sql= "Select * from local where estado='Activo' ";
	 
	
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
		  
		  
		      $cod_local=$valor['cod_local'];
		  	  $nombre=utf8_encode($valor['Nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$cod_local' >".$nombre."</option>";   
			  
	  }
 }
 
return $pagina ;


}





function buscaroptionlogin()
{
	
	$sql= "Select * from local where estado='Activo' ";
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
		  
		  
		      $cod_local=$valor['cod_local'];
		  	  $nombre=utf8_encode($valor['Nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$cod_local' >".$nombre."</option>";   
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}




verificar($operacion);
?>
