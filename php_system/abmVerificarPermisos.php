<?php

require("conexion.php");

function verificar()
{
	
	buscarUsuarios();
 
 
}

function buscarUsuarios()
{
	$mysqli=conectar_al_servidor();
 
		$sql= "Select *	from usuario order by cod_usuario asc";
 
   
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
		      $cod_usuario=$valor['cod_usuario'];
			  buscarAccesos($cod_usuario);
	  }
 }
  mysqli_close($mysqli);
 
echo("APLICADO CON EXITO");

}

function buscarAccesos($Usuarios)
{
	$mysqli=conectar_al_servidor();
 
		$sql= "Select  * from listadodeacceso   order by idlistadodeacceso asc";
  
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
		  
		      $idlistadodeacceso=$valor['idlistadodeacceso'];
			   BuscarPermisosDeUsuarios($Usuarios,$idlistadodeacceso);
			  
	  }
 }
  mysqli_close($mysqli);
 


}



function BuscarPermisosDeUsuarios($Usuarios,$Cod_acceso)
{
	$mysqli=conectar_al_servidor();
 
		$sql= "Select lta.nro,lta.formulario,lta.codigo,lta.nombre,acus.idaccesosUser,acus.accion,acus.usuarios_idusario,lta.formulario
		from accesosuser acus inner join listadodeacceso lta on lta.idlistadodeacceso=acus.idlistadodeaccesoFK
		where usuarios_idusario = '$Usuarios' and  lta.idlistadodeacceso='$Cod_acceso' order by lta.nro asc,lta.orden asc";
 
   
   $stmt = $mysqli->prepare($sql);
  	 

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 

 if ($valor==0)
 {
	  abm($Usuarios,$Cod_acceso);
 }
  mysqli_close($mysqli);
 
}



function abm($Usuarios,$Cod_acceso)
{
 
$mysqli=conectar_al_servidor();
 
$consulta="INSERT INTO accesosuser (idlistadodeaccesoFK,tipo,usuarios_idusario,accion) VALUES ('$Cod_acceso','Administrativo','$Usuarios','NO')";

	$stmt = $mysqli->prepare($consulta);
 
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


 
}

 

verificar();
?>