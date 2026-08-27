
<?php
require("conexion.php");
function verificar($funt)
{

buscar();

}

function InsertarAcceso($cod_usuario,$cod_acceso)
{

	$mysqli=conectar_al_servidor();
	
	
	
$consulta= "Select count(*) from accesosuser where idlistadodeaccesoFK=? and usuarios_idusario =? ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='ss';
$stmt->bind_param($ss, $cod_acceso,$cod_usuario); 

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nro_total=$result->fetch_row();
 $valor=$nro_total[0];
if($valor==0)
{
	
	$consulta="INSERT INTO accesosuser (idlistadodeaccesoFK,tipo,usuarios_idusario,accion) VALUES ('$cod_acceso','Administrativo','$cod_usuario','NO')";
$stmt1 = $mysqli->prepare($consulta);

if ( ! $stmt1->execute()) {
   echo "Error";
   exit;
}
	
	
}   
	
	 
	
 
}

function ObtenerPorcentaje($cod_usuario)
{
	$mysqli=conectar_al_servidor();
	$sql= "Select idlistadodeacceso from listadodeacceso  ";
		
   $stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  $idlistadodeacceso=utf8_encode($valor['idlistadodeacceso']);
		   InsertarAcceso($cod_usuario,$idlistadodeacceso);   
		   
	  }
 }
  mysqli_close($mysqli);
 
}



function buscar()
{
	$mysqli=conectar_al_servidor(); 
	
		$sql= "Select cod_usuario from usuario";


   $stmt = $mysqli->prepare($sql);
  	 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
$styleName="tableRegistroSearch";

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $cod_usuario=$valor['cod_usuario'];
			  ObtenerPorcentaje($cod_usuario);
	  }
 }
  mysqli_close($mysqli);
  
	 

}


verificar($funt);
?>