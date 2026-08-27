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

	buscarDatosEmpresa();

}
}

function buscarDatosEmpresa()
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "SELECT * FROM datos_empresa";
  
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nombre = "";
 $ruc = "";
 $telefono = "";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $nombre=$valor['nombre'];
		  	  $ruc=utf8_encode($valor['ruc']);
		  	  $telefono=utf8_encode($valor['telefono']);
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $nombre,"3" => $ruc,"4"=> $telefono);
echo json_encode($informacion);	
exit;


}


ObtenerDatos($operacion);

?>