<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php"); 
include("classTable.php");

function verificar($funt)
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

if($funt=="nuevo" || $funt=="editar")
{
	
	
	$idtipo_detalle_vehiculo=$_POST['idabm'];
    $idtipo_detalle_vehiculo = utf8_decode($idtipo_detalle_vehiculo);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$Estado=$_POST['Estado'];
    $Estado = utf8_decode($Estado);
	
	$notificacion=$_POST['notificacion'];
    $notificacion = utf8_decode($notificacion);

    
    
	abm($notificacion,$idtipo_detalle_vehiculo,$descripcion,$Estado,$funt);

}

if($funt=="buscar")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
	buscar($buscar,$Estado);

}	

if($funt=="buscarOption")
{
buscarOption();

}	


}

function abm($notificacion,$idtipo_detalle_vehiculo,$descripcion,$Estado,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from tipo_detalle_vehiculo where nombre=? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $descripcion); 


if ( ! $stmt->execute()) {
	$informacion =array("1" => "error");
	echo json_encode($informacion);	
	exit;
}

$valor = 0;
$stmt->bind_result($valor);
while ($stmt->fetch()) { 
   
	 $valor =$valor;
}

if($valor==1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}
	if($funt=="nuevo")
	{
	
    
    $consulta="insert into tipo_detalle_vehiculo (nombre,estado,notificacion) values (upper(?),?,?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='sss';
    $stmt->bind_param($ss,$descripcion,$Estado,$notificacion); 
        
 
	}
	if($funt=="editar")
	{
 
		$consulta="Update tipo_detalle_vehiculo set nombre=upper(?),estado=?,notificacion=? where idtipo_detalle_vehiculo=?";	

		$stmt = $mysqli->prepare($consulta);

		$ss='ssss';
			
		$stmt->bind_param($ss,$descripcion,$Estado,$notificacion,$idtipo_detalle_vehiculo); 
		 }
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
 
}
 
function buscar($buscar,$Estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select idtipo_detalle_vehiculo,nombre,estado , notificacion
        from tipo_detalle_vehiculo where nombre like ?  and estado=? order by nombre asc ";
		
 
   
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar1,$Estado);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  

		      $idtipo_detalle_vehiculo=$valor['idtipo_detalle_vehiculo'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $Estado=utf8_encode($valor['estado']);
		  	  $notificacion=utf8_encode($valor['notificacion']);

			  $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmtipo_detalle_vehiculo(this)'>
			  <td id='td_id' style='display:none;'>".$idtipo_detalle_vehiculo."</td>
			  <td id='td_datos_1'style='width:70%' class='tdRegistroSearch' >".$nombre."</td>
			  <td id='td_datos_3'style='width:30%' class='tdRegistroSearch' >".$notificacion."</td>
			  <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			  </tr>
			  </table>";

	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}



function buscarOption()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >TODOS</option>";  
		$sql= "Select idtipo_detalle_vehiculo,nombre,estado
        from tipo_detalle_vehiculo where estado='Activo' order by nombre asc ";
		
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $idtipo_detalle_vehiculo=$valor['idtipo_detalle_vehiculo'];
		  	  $nombre=utf8_encode($valor['nombre']); 
		  	 
			   $pagina.="<option value='$idtipo_detalle_vehiculo' >$nombre</option>";
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}






verificar($funt);
?>