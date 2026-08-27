<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include('quitarseparadormiles.php');
require("backup.php");
require("conexion.php");
include("verificar_navegador.php");
function verificar($operacion)
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

if($operacion=="buscar")
{
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscar($formato);

}	


if($operacion=="descargarBD")
{
	$cod_local=$_POST['cod_local'];
    $cod_local = utf8_decode($cod_local);
	
descargarBD($cod_local,$user);

}

if($operacion=="eliminarBD")
{
	$nombre_archivo=$_POST['nombre_archivo'];
    $nombre_archivo = utf8_decode($nombre_archivo);
	
	$link = '../copia_bd/'.$nombre_archivo;
	
	if(unlink($link)){
		$informacion =array("1" => "exito");
		echo json_encode($informacion);	
		exit;
	}else{
		echo trigger_error('ERROR AL ELIMINAR ARCHIVO', E_USER_NOTICE);
	exit;
	}

}	

	


}

function guardarHistorial($cod_local,$user,$descripcion)
{

$mysqli=conectar_al_servidor();


$fechahoy = date('Y-m-d');

$consulta1="Insert into historialdescargabd (cod_local,cod_usuario,fecha,descripcion)
values('$cod_local','$user','$fechahoy','$descripcion')";

$stmt = $mysqli->prepare($consulta1);


if (!$stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

mysqli_close($mysqli);
}

function buscar($formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();

			$sql= "SELECT fecha,(SELECT Nombre FROM local l where l.cod_local = cod_local limit 1) as nombrelocal,
			(SELECT nombre_persona from persona where cod_persona = cod_usuario) as usuario FROM historialdescargabd";
		
// echo $sql;
 // exit;
   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  

		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $usuario=utf8_encode($valor['usuario']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
			  $filas[]=array(
				  'fecha'=>$fecha,
				  'usuario'=>$usuario,
				  'local'=>$nombrelocal
			  );
		  	
			    	 
		  	  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'>
<td  id='' style='width:33%'>".$fecha."</td>
<td  id='' style='width:33%'>".$usuario."</td>
<td  id='' style='width:33%'>".$nombrelocal."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
    
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function descargarBD($cod_local,$user)
{
	/**
 * Instantiate Backup_Database and perform backup
 */

// Report all errors
//error_reporting(E_ALL);
// Set script max execution time
set_time_limit(900); // 15 minutes

$backupDatabase = new Backup_Database(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, CHARSET);

// Option-1: Backup tables already defined above
$result = $backupDatabase->backupTables(TABLES) ? 'OK' : 'KO';

// Option-2: Backup changed tables only - uncomment block below
/*
$since = '1 day';
$changed = $backupDatabase->getChangedTables($since);
if(!$changed){
  $backupDatabase->obfPrint('No tables modified since last ' . $since . '! Quitting..', 1);
  die();
}
$result = $backupDatabase->backupTables($changed) ? 'OK' : 'KO';
*/

// $output = $backupDatabase->getOutput();
$nameFile = $backupDatabase->backupFile;


$rutaArchivo = '../copia_bd/'.$nameFile;
$rutaArchivoCompleto = '/GoodVentaElectroCasaMaric/copia_bd/'.$nameFile;

$nameFileCompleto = $nameFile;

// Verificar si el archivo existe
if (file_exists($rutaArchivo)) {
    
	
	guardarHistorial($cod_local,$user,$rutaArchivo);
	
	$informacion =array("1" => "exito","2" => $rutaArchivoCompleto, "3" => $nameFileCompleto);
	echo json_encode($informacion);	
	exit;
} else {
    // Archivo no encontrado
	echo trigger_error('El archivo que intentas descargar no está disponible.', E_USER_NOTICE);
	exit;
}
	
	
	
}



verificar($operacion);
?>
