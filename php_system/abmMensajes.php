<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include("move_uploaded_file.php");
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
	
	
	$cod_Banco=$_POST['cod_Banco'];
    $cod_Banco = utf8_decode($cod_Banco);
	$nombre=$_POST['nombre'];
    $nombre = utf8_decode($nombre);
	$estado=$_POST['estado'];
    $estado = utf8_decode($estado);

    
    
	abm($cod_Banco,$nombre,$estado,$funt);

}

if($funt=="anular_mensaje")
{
	$cod_notificaciones=$_POST['cod_notificaciones'];
    $cod_notificaciones = utf8_decode($cod_notificaciones);
    
	anular_mensaje($cod_notificaciones);
}

if($funt=="enviar_mensajes_noti")
{
	
	$totalRegistro=$_POST['totalRegistro'];
    $totalRegistro = utf8_decode($totalRegistro);
	
	$mensaje=$_POST['mensaje'];
    $mensaje = utf8_decode($mensaje);
	
	$titulo=$_POST['titulo'];
    $titulo = utf8_decode($titulo);
	
	enviar_mensajes_noti($totalRegistro,$mensaje,$titulo);
}


if($funt=="cargarcsv")
{
    
	cargarcsv();
}

if($funt=="buscar")
{
	$mensaje=$_POST['mensaje'];
	$mensaje = utf8_decode($mensaje);
	$Estado=$_POST['estado'];
	$Estado = utf8_decode($Estado);
	$telefono=$_POST['telefono'];
	$telefono = utf8_decode($telefono);
	$estado_mensaje=$_POST['estado_mensaje'];
	$estado_mensaje = utf8_decode($estado_mensaje);
	buscar($mensaje,$Estado,$telefono,$estado_mensaje);

}	

if($funt=="buscarOption")
{

	buscarOption();

}	


}

function abm($cod_Banco,$nombre,$estado,$funt)
{
	
	if($nombre=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from banco where nombre=? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $nombre); 


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
	
    
    $consulta="insert into banco (nombre,estado) values (upper(?),?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='ss';
    $stmt->bind_param($ss,$nombre,$estado); 
        
 
	}
	if($funt=="editar")
	{
    
    $consulta="Update banco set nombre=upper('$nombre'),estado='$estado' where idbanco=$cod_Banco";	

	$stmt = $mysqli->prepare($consulta);
	
	// echo($consulta);
	// exit;

       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}
function anular_mensaje($cod_notificaciones)
{
	
	if($cod_notificaciones=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
}

	$mysqli=conectar_al_servidor();


    $consulta="Update notificaciones set estado_mensaje='CANCELADO', estado ='Inactivo' where cod_notificaciones=$cod_notificaciones";	

	$stmt = $mysqli->prepare($consulta);

	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
function buscar($mensaje,$Estado,$telefono,$estado_mensaje)
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$filas=array();
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	
	$condicionmensaje = '';
	if($mensaje != ''){
		$condicionmensaje = " and mensaje like '%".$mensaje."%'";
	}
	$condiciontelefono = '';
	if($telefono != ''){
		$condiciontelefono = " and numero like '%".$telefono."%'";
	}
	
	$condicionestado_mensaje = '';
	if($estado_mensaje != ''){
		$condicionestado_mensaje = " and estado_mensaje = '$estado_mensaje'";
	}
	
	
	
	$sql= "SELECT cod_notificaciones,mensaje,numero,estado,fecha,hora,tipo,titulo,estado_mensaje FROM notificaciones WHERE cod_notificaciones != 0 and estado  ='$Estado' ".$condicionmensaje.$condicionestado_mensaje.$condiciontelefono;
		
		
		// echo $sql;
		// exit;
 
   
   $stmt = $mysqli->prepare($sql);

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
		  
		  
		  
		      $cod_notificaciones=$valor['cod_notificaciones'];
		  	  $mensaje=utf8_encode($valor['mensaje']);
		  	  $numero=utf8_encode($valor['numero']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $hora=utf8_encode($valor['hora']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $titulo=utf8_encode($valor['titulo']);
		  	  $estado_mensaje=utf8_encode($valor['estado_mensaje']);
			  $filas[]=array(
				  "codigo" => $cod_notificaciones,
				  "mensaje" => $mensaje,
				  "telefono" => $numero,
				  "fecha" => $fecha,
				  "hora" => $hora,
				  "tipo" => $tipo,
				  "titulo" => $titulo,
				  "estado_envio" => $estado_mensaje,
				  "estado" => $estado
			  );
		  	 
			  
		  	 $styleName=CargarStyleTable($styleName);
			 if($formato !== "json") {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmMensajes(this)'>
			  <td id='td_id' style='display:none;'>".$cod_notificaciones."</td>
			  <td id='td_datos_1'style='width:10%' class='tdRegistroSearch' >".$mensaje."</td>
			  <td  id='td_datos_2' style='width:10%'>".$numero."</td>
			  <td  id='td_datos_4' style='width:10%'>".$fecha."</td>
			  <td  id='td_datos_5' style='width:10%'>".$hora."</td>
			  <td  id='td_datos_6' style='width:10%'>".$tipo."</td>
			  <td  id='td_datos_7' style='width:10%'>".$titulo."</td>
			  <td  id='td_datos_8' style='width:10%'>".$estado_mensaje."</td>
			  <td  id='td_datos_3' style='width:10%'>".$estado."</td>
			  </tr>
			  </table>";
			 }
	  }
 }
 
 
 $enviados = obtener_mensajes_enviados();
 $pendientes = obtener_mensajes_pendientes();
 $errados = obtener_mensajes_errados();
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3"=> $totalresouesta,"4"=>$enviados,"5"=> $pendientes,"6"=>$errados);
echo json_encode($informacion);	
exit;


}

function obtener_mensajes_enviados()
{
	$mysqli=conectar_al_servidor();
	
	
	
	$sql= "SELECT count(cod_notificaciones) as enviados FROM notificaciones WHERE estado_mensaje = 'ENVIADO' ";
		
		
		// echo $sql;
		// exit;
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 $enviados = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $enviados=$valor['enviados'];
		  	 
		  	
	  }
 }
 
 
 
mysqli_close($mysqli);
return $enviados;

}
function obtener_mensajes_pendientes()
{
	$mysqli=conectar_al_servidor();
	
	
	
	$sql= "SELECT count(cod_notificaciones) as pendientes FROM notificaciones WHERE estado_mensaje = 'PENDIENTE' ";
		
		
		// echo $sql;
		// exit;
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 $pendientes = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $pendientes=$valor['pendientes'];
		  	 
		  	
	  }
 }
 
 
 
mysqli_close($mysqli);
return $pendientes;

}

function obtener_mensajes_errados()
{
	$mysqli=conectar_al_servidor();
	
	
	
	$sql= "SELECT count(cod_notificaciones) as errados FROM notificaciones WHERE estado_mensaje = 'ERROR' ";
		
		
		// echo $sql;
		// exit;
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 $errados = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $errados=$valor['errados'];
		  	 
		  	
	  }
 }
 
 
 
mysqli_close($mysqli);
return $errados;

}


function buscarOption()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >SELECCIONAR</option>";  
		$sql= "Select idbanco,nombre,estado
        from banco where estado='Activo' order by nombre asc ";
		   
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
		   
		  
		      $idbanco=$valor['idbanco'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  // $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$idbanco' >$nombre</option>";
		  	 
	  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}

function cargarcsv(){
	$nombreArchivo = generarCodigoAleatorio(7);
	$ruta="/archivoscsv";
	$nombrePost = 'csvMensaje';
	$respuesta = mover_archivo_carpeta($ruta,$nombreArchivo,$nombrePost,'csv');
	
	if($respuesta[0]){
		if (($handle = fopen($respuesta[1], "r")) !== false) {
        
        
        // Leer cada línea del archivo
        while (($data = fgetcsv($handle, 1000, ",")) !== false) {
           
            // foreach ($data as $cell) {
               // echo htmlspecialchars($cell);
            // }
			
			$partes = explode(";", $data[0]);
			
			ingresar_mensaje($partes[1],$partes[0],$partes[2],$partes[3]);
			
			// echo json_encode($data[0]);
            // exit;
        }
        
			
        // Cerrar el archivo
        fclose($handle);
		
		$informacion =array("1" => "exito", "2" => 'Cargado correctamente');
			echo json_encode($informacion);	
			exit;
    } else {
       $informacion =array("1" => "exito", "2" => 'No se pudo abrir el archivo.');
		echo json_encode($informacion);	
		exit;
    }
	}else{
		$informacion =array("1" => "exito", "2" => 'Problema al cargar el documento');
		echo json_encode($informacion);	
		exit;
	}
}

function generarCodigoAleatorio($longitud) {
    $caracteres = '0123456789';
    $numeroCaracteres = strlen($caracteres);
    $codigoAleatorio = '';
    
    for ($i = 0; $i < $longitud; $i++) {
        $codigoAleatorio .= $caracteres[rand(0, $numeroCaracteres - 1)];
    }
    
    return $codigoAleatorio;
}

function ingresar_mensaje($nombre,$telefono,$documento,$zona)
{

	$mysqli=conectar_al_servidor();
	
	

    
    $consulta="insert into mensajes_masivo (nombre,telefono,documento,zona, estado_asignado) values (upper('$nombre'),'$telefono','$documento',upper('$zona'),'PENDIENTE')";
    $stmt = $mysqli->prepare($consulta);
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);	
}

function ingresar_mensaje_a_noti($mensaje,$numero,$titulo)
{

	$mysqli=conectar_al_servidor();
	
	date_default_timezone_set('America/Anguilla');    
	$fecha_inser_edit = date('Y-m-d', time()); 

    
    $consulta="INSERT INTO notificaciones (mensaje,numero,fecha,tipo,titulo,estado_mensaje,estado) VALUES('$mensaje','$numero','$fecha_inser_edit','MARKETING','$titulo','PENDIENTE','Activo')";
	
    $stmt = $mysqli->prepare($consulta);
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);	
}

function enviar_mensajes_noti($cantidadRegistros,$mensaje,$titulo){
	
	
	for ($i = 1 ; $i <= $cantidadRegistros; $i++) {

			
			$telefono=$_POST['telefono'.$i];
			$telefono = utf8_decode($telefono);
			
			
			$idmensajes_masivo=$_POST['idmensajes_masivo'.$i];
			$idmensajes_masivo = utf8_decode($idmensajes_masivo);
			
			
			ingresar_mensaje_a_noti($mensaje,$telefono,$titulo);
			
			
			actualizar_estado_mensaje_masivo($idmensajes_masivo);

	}
	
	$informacion =array("1" => "exito", "2" => 'Cargado correctamente');
			echo json_encode($informacion);	
			exit;
	
}

function actualizar_estado_mensaje_masivo($idmensajesmasivo)
{

	$mysqli=conectar_al_servidor();

    
    $consulta="UPDATE mensajes_masivo SET estado_asignado = 'ASIGNADO' WHERE idmensajes_masivo = '$idmensajesmasivo'";
	
    $stmt = $mysqli->prepare($consulta);
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);	
}

verificar($funt);
?>
