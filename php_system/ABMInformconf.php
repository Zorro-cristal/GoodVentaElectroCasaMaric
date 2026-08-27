<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
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


	





	
if($funt=="nuevo")
{
	
	
	$cod_clienteFK=$_POST['cod_clienteFK'];
    $cod_clienteFK = utf8_decode($cod_clienteFK);
	$cod_ventaFK=$_POST['cod_ventaFK'];
    $cod_ventaFK = utf8_decode($cod_ventaFK);
	$fecha_entrada=$_POST['fecha_entrada'];
    $fecha_entrada = utf8_decode($fecha_entrada);
	$user_id=$_POST['useru'];
    $user_id = utf8_decode($user_id);

    
    
	abm($cod_clienteFK,$cod_ventaFK,$fecha_entrada,$user_id);

}


if($funt=="limpiarclienteinformconf")
{
	
	
	$cod_clienteFK=$_POST['cod_clienteFK'];
    $cod_clienteFK = utf8_decode($cod_clienteFK);
	
	$user_id=$_POST['useru'];
    $user_id = utf8_decode($user_id);

	limpiarclienteinformconf($cod_clienteFK,$user_id);

}


if($funt=="buscar")
{
	$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$documento=$_POST['documento'];
$documento = utf8_decode($documento);
$usuarioingreso=$_POST['usuarioingreso'];
$usuarioingreso = utf8_decode($usuarioingreso);
$usuariosalida=$_POST['usuariosalida'];
$usuariosalida = utf8_decode($usuariosalida);

	buscar($cliente,$fecha1,$fecha2,$estado,$tipo,$documento,$usuarioingreso,$usuariosalida);

}


}

function abm($cod_clienteFK,$cod_ventaFK,$fecha_entrada,$user_id)
{
	
	if($cod_clienteFK=="" || $cod_ventaFK == '' ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}
	
	$mysqli=conectar_al_servidor();
	
	
	$consulta="select count(cod_clienteFK) as contador from informconf where cod_clienteFK = '$cod_clienteFK' AND estado ='ACTIVO'";
	
     $stmt = $mysqli->prepare($consulta);
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $valor= mysqli_fetch_assoc($result);
 
if($valor['contador'] > 0){
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}

    
    $consulta="insert into informconf (cod_clienteFK,cod_ventaFK,fecha_entrada,user_insert) values ('$cod_clienteFK','$cod_ventaFK','$fecha_entrada','$user_id')";
     $stmt = $mysqli->prepare($consulta);
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}



function buscar($cliente,$fecha1,$fecha2,$estado,$tipo,$documento,$usuarioingreso,$usuariosalida)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	 
	 
	 $condicioncliente = '';
	 if($cliente !=''){
		 $condicioncliente = " and (select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) like '%".$cliente."%'";
	 }
	 
	 $condiciondocumento = '';
	 if($documento !=''){
		 $condiciondocumento = " and (select ci_cliente from cliente where cod_cliente = cod_clienteFK) like '%".$documento."%'";
	 }
	 
	 $condicionestado = '';
	 if($estado !=''){
		 $condicionestado = " and estado = '$estado'";
	 }
	 
	 $condicionusuarioingreso = '';
	 if($usuarioingreso !=''){
		 $condicionusuarioingreso = " and (select nombre_persona from persona where cod_persona = user_insert) like '%".$usuarioingreso."%'";
	 }
	 
	 $condicionusuariosalida = '';
	 if($usuariosalida !=''){
		 $condicionusuariosalida = " and (select nombre_persona from persona where cod_persona = user_update) like '%".$usuariosalida."%'";
	 }

	 
	 $condicionfecha = '';
	 if($tipo != ''){
		 if($tipo == 'entrada'){
			$condicionfecha = " and fecha_entrada between '$fecha1' and '$fecha2'";
		 }
		 
		 if($tipo == 'salida'){
			$condicionfecha = " and fecha_salida between '$fecha1' and '$fecha2'";
		 }
	 }
	 
		$sql= "select idinformconf, cod_clienteFK,cod_ventaFK,fecha_entrada,fecha_salida,estado,
		(select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) as cliente,
		(SELECT nombre_persona FROM persona WHERE cod_persona = user_insert) as usuario_ingreso,
		(SELECT nombre_persona FROM persona WHERE cod_persona = user_update) as usuario_limpio,
		(select ci_cliente from cliente where cod_cliente = cod_clienteFK) as documento
		from informconf where idinformconf != 0 ".$condicioncliente.$condicionestado.$condicionfecha.$condiciondocumento.$condicionusuarioingreso.$condicionusuariosalida." order by idinformconf desc ";
		
		/* echo $sql; */
 
   
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
		  
		  
		  
		      $idinformconf=$valor['idinformconf'];
		  	  $cod_clienteFK=utf8_encode($valor['cod_clienteFK']);
		  	  $cod_ventaFK=utf8_encode($valor['cod_ventaFK']);
		  	  $fecha_entrada=utf8_encode($valor['fecha_entrada']);
		  	  $fecha_salida=utf8_encode($valor['fecha_salida']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cliente=utf8_encode($valor['cliente']);
		  	  $documento=utf8_encode($valor['documento']);
		  	  $usuario_ingreso=utf8_encode($valor['usuario_ingreso']);
		  	  $usuario_limpio=utf8_encode($valor['usuario_limpio']);
			  $filas[]=array(
				  "codigo" => $idinformconf,
				  "cliente" => $cliente,
				  "documento" => $documento,
				  "fecha_entrada" => $fecha_entrada,
				  "fecha_salida" => $fecha_salida,
				  "estado" => $estado,
				  "usuario_ingreso" => $usuario_ingreso,
				  "usuario_limpio" => $usuario_limpio,
				  "cod_cliente" => $cod_clienteFK,
				  "cod_venta" => $cod_ventaFK
			  );
		  	 
			  $styleEstado='';
			  if($estado == 'LIMPIO'){
				  $styleEstado='background-color:green;color:white';
			  }
		  	 
			  $styleName=CargarStyleTable($styleName);
			 if($formato !== "json") {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' style='$styleEstado' onclick='obtenerdatosAbmInformconf(this)'>
			  <td id='td_id' style='display:none;'>".$idinformconf."</td>
			  <td id='td_datos_1' style='width:30%' >".$cliente."</td>
			  <td id='td_datos_1' style='width:10%' >".$documento."</td>
			  <td id='td_datos_2' style='width:10%' >".$fecha_entrada."</td>
			  <td id='td_datos_3' style='width:10%' >".$fecha_salida."</td>
			  <td id='td_datos_4' style='width:10%' >".$estado."</td>
			  <td id='td_datos_7' style='width:10%' >".$usuario_ingreso."</td>
			  <td id='td_datos_8' style='width:10%' >".$usuario_limpio."</td>
			  <td id='td_datos_5' style='display:none' >".$cod_clienteFK."</td>
			  <td id='td_datos_6' style='display:none' >".$cod_ventaFK."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}


function limpiarclienteinformconf($cod_clienteFK,$user_id)
{
	
	if($cod_clienteFK=="" || $user_id == ''){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}
	
	date_default_timezone_set('America/Anguilla');    
$fecha = date('Y-m-d', time()); 

	$mysqli=conectar_al_servidor();
    
    $consulta="UPDATE informconf SET estado = 'LIMPIO', fecha_salida = '$fecha', user_update = '$user_id' WHERE cod_clienteFK = '$cod_clienteFK' ";
     

$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}




verificar($funt);
?>
