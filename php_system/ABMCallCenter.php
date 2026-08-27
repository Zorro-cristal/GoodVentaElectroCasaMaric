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

if($funt=="buscarDetallesCallCenter")
{
	$id_callcenter=$_POST['id_callcenter'];
	$id_callcenter = utf8_decode($id_callcenter);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$cliente=$_POST['cliente'];
	$cliente = utf8_decode($cliente);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarDetallesCallCenter($id_callcenter,$estado,$cliente,$formato);
}

if($funt=="buscarActividadCallCenter")
{
	$usuario=$_POST['usuario'];
	$usuario = utf8_decode($usuario);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$cliente=$_POST['cliente'];
	$cliente = utf8_decode($cliente);
	$cod_callcenter=$_POST['cod_callcenter'];
	$cod_callcenter = utf8_decode($cod_callcenter);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarActividadCallCenter($usuario,$estado,$fecha1,$fecha2,$cliente,$cod_callcenter,$formato);
}

if($funt=="informeCallCenter")
{
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$usuario=$_POST['usuario'];
	$usuario = utf8_decode($usuario);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	informeCallCenter($fecha1,$fecha2,$usuario,$estado,$formato);
}

if($funt=="buscarListadoCallCenter")
{
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$cedula=$_POST['cedula'];
$cedula = utf8_decode($cedula);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarListadoCallCenter($user,$cliente,$estado,$cedula,$cobrador,$formato);

}

if($funt=="buscaroptionUsuTipoCallCenter")
{

	buscaroptionUsu();

}

if($funt=="actualizarEstadoClienteCallCenter")
{
$iddetalle_callcenter=$_POST['iddetalle_callcenter'];
$iddetalle_callcenter = utf8_decode($iddetalle_callcenter);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
	actualizarEstadoClienteCallCenter($iddetalle_callcenter,$estado);

}

if($funt=="actualizarTodosEstadosCallCenter")
{

	actualizarTodosEstadosCallCenter();

}


if($funt=="actualizarEstadoCallCenter")
{
$idcall_center=$_POST['idcall_center'];
$idcall_center = utf8_decode($idcall_center);
	actualizarEstadoCallCenter($idcall_center);

}



if($funt=="generarListaCallcenter")
{
	$array_agentes=json_decode($_POST['array_agentes']);
	$array_cod_tipo_cliente_credito=json_decode($_POST['array_cod_tipo_cliente_credito']);
	
	
	
$fecha_inicio=$_POST['fecha_inicio'];
$fecha_inicio = utf8_decode($fecha_inicio);
$fecha_fin=$_POST['fecha_fin'];
$fecha_fin = utf8_decode($fecha_fin);
$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);

$fecha_inicio_periodo=$_POST['fecha_inicio_periodo'];
$fecha_inicio_periodo = utf8_decode($fecha_inicio_periodo);
$fecha_fin_periodo=$_POST['fecha_fin_periodo'];
$fecha_fin_periodo = utf8_decode($fecha_fin_periodo);


	
	generarListaCallcenter($nombre,$fecha_inicio,$fecha_fin,$fecha_inicio_periodo,$fecha_fin_periodo,$array_cod_tipo_cliente_credito,$array_agentes);

}	


}

function buscarListadoCallCenter($cod_usuarioFK,$cliente,$estado,$cedula,$cobrador,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 $condicioncliente = "";
	 if($cliente != ''){
		 $condicioncliente = " and (SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = dtc.cod_clienteFK) like '%".$cliente."%'";
	 }
	 
	 $condicioncedula = "";
	 if($cedula != ''){
		 $condicioncedula = " and (SELECT ci_cliente from cliente where cod_cliente = dtc.cod_clienteFK) = '".$cedula."'";
	 }
	 
	 if($estado == "SELECCIONAR"){
		 $estado = "";
	 }
	 
	 $condicionestado = "";
	 if($estado != ""){
		 $condicionestado = " and dtc.estado = '$estado'";
	 } 
	 
	 $condicioncobrador = "";
	 if($cobrador != ""){
		 $condicioncobrador = " and (SELECT cod_persona FROM persona WHERE cod_persona=(SELECT cod_cobradorFK FROM zona WHERE idzona = (SELECT idzonaFk FROM cliente WHERE cod_cliente = dtc.cod_clienteFK))) = '$cobrador'";
	 }
	 
	 
	 
		$sql= "Select cc.idcall_center,dtc.iddetalle_callcenter,cc.cod_usuarioFK,dtc.cod_clienteFK,dtc.estado,cc.fecha_inicio_periodo,cc.fecha_fin_periodo,
		(SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = dtc.cod_clienteFK) as nombre_cliente,
		(Select telefono from persona where cod_persona=dtc.cod_clienteFK) as telefono,
		(SELECT ci_cliente from cliente where cod_cliente = dtc.cod_clienteFK) as cedula,
		(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado,
		(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona=(SELECT cod_cobradorFK FROM zona WHERE idzona = (SELECT idzonaFk FROM cliente WHERE cod_cliente = dtc.cod_clienteFK))) as cobrador
        from call_center cc inner join detalle_callcenter dtc on cc.idcall_center = dtc.cod_callcenterFK where cc.idcall_center != 0 and dtc.estado != 'COBRADO' and dtc.estado != 'INCOBRABLE' and dtc.estado !='NO CONCRETADO'  and cc.cod_usuarioFK = '$cod_usuarioFK' ".$condicioncliente.$condicionestado.$condicioncedula.$condicioncobrador." order by dtc.iddetalle_callcenter asc ";
	
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
 $codigo ='';
 $accion = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $nombre_cliente=utf8_encode($valor['nombre_cliente']);
			  $telefono=utf8_encode($valor['telefono']);
			  $estado=utf8_encode($valor['estado']);
			  $iddetalle_callcenter=utf8_encode($valor['iddetalle_callcenter']);
			  $cod_clienteFK=utf8_encode($valor['cod_clienteFK']);
			  $cedula=utf8_encode($valor['cedula']);
			  $tipo_estado=utf8_encode($valor['tipo_estado']);
			  $cobrador=utf8_encode($valor['cobrador']);
		  	 
			
			 
			 
			 if($telefono!=""){
			$condicion=$telefono[0];
			}else{
			$condicion="";
			}
			$codigo="595";
			if($condicion=="+"){
			$codigo="";
			}
			
			if($telefono!="0" && $telefono!=""){
	
			$telefono = substr($telefono, 1);
	
			$searchString = " ";
			$replaceString = "";
 
			$telefono = str_replace($searchString, $replaceString, $telefono);
			}
			$telefono_mostrado=$codigo.$telefono;
			
			
			$estado_informconf = obtener_estado_cliente_informconf($cod_clienteFK);
			$style = '';
			if($estado_informconf == 'INFORMCONF'){
				$style='background-color:#FF9800;color:white;';
			}
			
			$p_tipo = '';
			$nombre_tipo_estado = '';
			if($tipo_estado != '0'){
				$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
				$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
			}

			$filas[]=array(
				"iddetalle_callcenter"=>$iddetalle_callcenter,
				"cod_cliente"=>$cod_clienteFK,
				"cliente"=>$nombre_cliente,
				"cedula"=>$cedula,
				"telefono"=>$telefono_mostrado,
				"estado"=>$estado,
				"informconf"=>$estado_informconf,
				"cobrador"=>$cobrador,
				"tipo_estado"=>$tipo_estado,
				"tipo_estado_nombre"=>$nombre_tipo_estado
			);

			if($formato!='json'){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' style='$style' onclick='obtenerdatosclienteCallCenter(this)'>
			  <td id='td_id' style='display:none' >".$iddetalle_callcenter."</td>
			  <td id='td_id_2' style='display:none' >".$cod_clienteFK."</td>
			  <td id='td_datos_1' style='width:30%' >".$p_tipo.$nombre_cliente."</td>
			  <td id='' style='width:10%' >".$cedula."</td>
			  <td style='width:10%' >".$telefono_mostrado."</td>
			  <td style='width:10%' >".$estado."</td>
			  <td style='width:10%' >".$estado_informconf."</td>
			  <td style='width:20%' >".$cobrador."</td>
			  </tr>
			  </table>";
			}
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}


function obtener_tipo_estado_cliente($tipo_estado){
$mysqli=conectar_al_servidor();

$sql= "SELECT nombre FROM mora_cliente WHERE idmora_cliente = '$tipo_estado'"; 
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$nombre = '';
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$nombre = utf8_encode($valor['nombre']);


}
}
 mysqli_close($mysqli);
 
 return $nombre;
}


function buscarDetallesCallCenter($id_callcenter,$estado,$cliente,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 if($estado == 'SELECCIONAR'){
		 $estado ='';
	 }
	 
	 $condicionestado = '';
	 if($estado){
		 $condicionestado =" and dtc.estado ='$estado'";
	 }
	 
	  $condicioncliente = '';
	 if($cliente){
		 $condicioncliente =" and (SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = dtc.cod_clienteFK) like '%".$cliente."%'";
	 }
	 
	 
		$sql= "Select cc.idcall_center,dtc.iddetalle_callcenter,cc.cod_usuarioFK,dtc.cod_clienteFK,dtc.estado,cc.fecha_inicio_periodo,cc.fecha_fin_periodo,
		(SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = dtc.cod_clienteFK) as nombre_cliente,
		(Select telefono from persona where cod_persona=dtc.cod_clienteFK) as telefono
        from call_center cc inner join detalle_callcenter dtc on cc.idcall_center = dtc.cod_callcenterFK where cc.idcall_center != 0 and dtc.cod_callcenterFK = '$id_callcenter' ".$condicionestado.$condicioncliente." order by dtc.iddetalle_callcenter asc ";

   
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 $codigo ='';
 $accion = '';
 $totalActivo = 0;
 $totalTerminado = 0;
 if ($valor>0)
 {
		  while ($valor= mysqli_fetch_assoc($result))
		  {
		  
		      $nombre_cliente=utf8_encode($valor['nombre_cliente']);
			  $telefono=utf8_encode($valor['telefono']);
			  $estado=utf8_encode($valor['estado']);
			  $iddetalle_callcenter=utf8_encode($valor['iddetalle_callcenter']);
			  $cod_clienteFK=utf8_encode($valor['cod_clienteFK']);
			 
			 if($telefono!=""){
			$condicion=$telefono[0];
			}else{
			$condicion="";
			}
			$codigo="595";
			if($condicion=="+"){
			$codigo="";
			}
			
			if($telefono!="0" && $telefono!=""){
	
			$telefono = substr($telefono, 1);
	
			$searchString = " ";
			$replaceString = "";
 
			$telefono = str_replace($searchString, $replaceString, $telefono);
			}
			$telefono_mostrado=$codigo.$telefono;
			
			$style='';
			if($estado == 'TERMINADO'){
				$totalTerminado++;
				$style='background-color:green;color:white';
			}else{
				$totalActivo++;
			}
			
			
			$filas[]=array(
				"iddetalle_callcenter"=>$iddetalle_callcenter,
				"cod_cliente"=>$cod_clienteFK,
				"cliente"=>$nombre_cliente,
				"telefono"=>$telefono_mostrado,
				"estado"=>$estado,
				"terminado"=>$estado=='TERMINADO'
			);

			if($formato!='json'){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' style='$style'>
			  <td style='width:60%' >".$nombre_cliente."</td>
			  <td style='width:20%' >".$telefono_mostrado."</td>
			  <td style='width:20%' >".$estado."</td>
			  </tr>
			  </table>";
			}
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3"=> $totalresouesta,"4"=> $totalTerminado,"5"=> $totalActivo);
echo json_encode($informacion);	
exit;
}

function buscarActividadCallCenter($usuario,$estado,$fecha1,$fecha2,$cliente,$cod_callcenter,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 if($estado == 'SELECCIONAR'){
		 $estado = '';
	 }
	 
	 $condicionestado = '';
	 if($estado){
		 $condicionestado =" and actividad ='$estado'";
	 }
	 
	 $condicionusuario = '';
	 if($usuario){
		 $condicionusuario =" and cod_usarioFK ='$usuario'";
	 }
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha between '$fecha1' and '$fecha2'";
	 }
	 
	 $condicioncliente = '';
	 if($cliente != ''){
		 $condicioncliente = " and (SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) like '%".$cliente."%'";
	 }
	 
		$sql= "SELECT idactividad_callcenter,cod_callcenterFK,cod_usarioFK,cod_clienteFK,actividad,fecha, 
		(SELECT nombre_persona from persona where cod_persona = cod_usarioFK) as usuario,
		(SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) as cliente
		FROM actividad_callcenter where idactividad_callcenter != 0".$condicionestado.$condicionusuario.$condicionfecha.$condicioncliente." order by idactividad_callcenter desc";

   
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
		  
		      $idactividad_callcenter=utf8_encode($valor['idactividad_callcenter']);
		      $cod_callcenterFK=utf8_encode($valor['cod_callcenterFK']);
		      $cod_usarioFK=utf8_encode($valor['cod_usarioFK']);
		      $cod_clienteFK=utf8_encode($valor['cod_clienteFK']);
		      $usuario=utf8_encode($valor['usuario']);
		      $cliente=utf8_encode($valor['cliente']);
			  $actividad=utf8_encode($valor['actividad']);
			  $fecha=utf8_encode($valor['fecha']);

			 
			 
			
			
			$filas[]=array(
				"idactividad_callcenter"=>$idactividad_callcenter,
				"cod_callcenter"=>$cod_callcenterFK,
				"cod_usuario"=>$cod_usarioFK,
				"cod_cliente"=>$cod_clienteFK,
				"usuario"=>$usuario,
				"cliente"=>$cliente,
				"actividad"=>$actividad,
				"fecha"=>$fecha
			);

			if($formato!='json'){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' >
			  <td style='width:40%' >".$usuario."</td>
			  <td style='width:20%' >".$cliente."</td>
			  <td style='width:20%' >".$actividad."</td>
			  <td style='width:20%' >".$fecha."</td>
			  </tr>
			  </table>";
			}
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}


function informeCallCenter($fecha1,$fecha2,$usuario,$estado,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha_generado between '$fecha1' and '$fecha2'";
	 }

	 $condicionusuario = '';
	 if($usuario != ''){
		 $condicionusuario = " and (SELECT nombre_persona from persona where cod_persona = cod_usuarioFK) like '%".$usuario."%'";
	 }
	 
	 $condicionestado = '';
	 if($estado != ''){
		 $condicionestado = " and estado = '$estado'";
	 }
		$sql= "select idcall_center,cod_usuarioFK,descripcion,nombre,fecha_inicio,fecha_fin,estado,fecha_fin_periodo,fecha_inicio_periodo,fecha_generado, (SELECT nombre_persona from persona where cod_persona = cod_usuarioFK) as usuario
		from call_center where idcall_center != 0 ".$condicionfecha.$condicionusuario.$condicionestado;
		
		
		
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
			$idcall_center=utf8_encode($valor['idcall_center']);
			$cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			$descripcion=utf8_encode($valor['descripcion']);
			$fecha_inicio=utf8_encode($valor['fecha_inicio']);
			$fecha_fin=utf8_encode($valor['fecha_fin']);
			$estado=utf8_encode($valor['estado']);
			$fecha_fin_periodo=utf8_encode($valor['fecha_fin_periodo']);
			$fecha_inicio_periodo=utf8_encode($valor['fecha_inicio_periodo']);
			$fecha_generado=utf8_encode($valor['fecha_generado']);
			$usuario=utf8_encode($valor['usuario']);
			$nombre=utf8_encode($valor['nombre']);

			$filas[]=array(
				"idcall_center"=>$idcall_center,
				"cod_usuario"=>$cod_usuarioFK,
				"usuario"=>$usuario,
				"nombre"=>$nombre,
				"descripcion"=>$descripcion,
				"fecha_inicio"=>$fecha_inicio,
				"fecha_fin"=>$fecha_fin,
				"fecha_credito"=>$fecha_inicio." / ".$fecha_fin,
				"fecha_inicio_periodo"=>$fecha_inicio_periodo,
				"fecha_fin_periodo"=>$fecha_fin_periodo,
				"fecha_periodo"=>$fecha_fin_periodo." / ".$fecha_inicio_periodo,
				"fecha_generado"=>$fecha_generado,
				"estado"=>$estado
			);

			if($formato!='json'){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosCallCenter(this)'>
			  <td id='td_id' style='display:none' >".$idcall_center."</td>
			  <td style='display:none' >".$cod_usuarioFK."</td>
			  <td style='width:20%' >".$usuario."</td>
			  <td style='width:10%' >".$nombre."</td>
			  <td style='width:30%' >".$descripcion."</td>
			  <td style='width:10%' >".$fecha_inicio." / ".$fecha_fin."</td>
			  <td style='width:10%' >".$fecha_fin_periodo." / ".$fecha_inicio_periodo."</td>
			  <td style='width:10%' >".$fecha_generado."</td>
			  <td style='width:10%' >".$estado."</td>
			  </tr>
			  </table>";
			}
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $totalresouesta);
echo json_encode($informacion);	
exit;
}


function generarListaCallcenter($nombre,$fecha_inicio,$fecha_fin,$fecha_inicio_periodo,$fecha_fin_periodo,$array_cod_tipo_cliente_credito,$array_agentes)
{
	$ult_id = '';
	$descripcion = '';
	foreach ($array_cod_tipo_cliente_credito as $idmora_cliente) {
		$descripcion .= obtener_descripcion_tipo_cliente($idmora_cliente).". ";
	}
	
	date_default_timezone_set('America/Anguilla');    
	$fecha_insert = date('Y-m-d', time());
	
	$array_codcliente_callcenter=json_decode($_POST['array_codcliente_callcenter']);
	$cantidad_total_clientes = count($array_codcliente_callcenter);
	$cantidad_agentes = count($array_agentes);
	
	$clientes_por_agente = intdiv_1($cantidad_total_clientes, $cantidad_agentes);
	$restantes = $cantidad_total_clientes % $cantidad_agentes;
	
	$agentes = array_fill(0, $cantidad_agentes, $clientes_por_agente);
	
	for ($i = 0; $i < $restantes; $i++) {
		$agentes[$i]++;
	}
	
	$contadorCliente = 0;
	for ($i = 0; $i < $cantidad_agentes; $i++) {
		
		$ult_id = insertar_registro_callcenter($nombre,$array_agentes[$i], $descripcion,$fecha_inicio,$fecha_fin,$fecha_inicio_periodo,$fecha_fin_periodo,$fecha_insert);
		
		for($x = 0; $x < $agentes[$i]; $x++){
			insertar_registro_detalle_callcenter($ult_id,$array_codcliente_callcenter[$contadorCliente]);
			$contadorCliente++;
		}
	}
 
  $informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}

function insertar_registro_callcenter($nombre,$cod_usuarioFK,$descripcion,$fecha_inicio,$fecha_fin,$fecha_inicio_periodo,$fecha_fin_periodo,$fecha_generado)
{
	
	if($cod_usuarioFK=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="INSERT INTO call_center (cod_usuarioFK,descripcion,fecha_inicio,fecha_fin,fecha_inicio_periodo,fecha_fin_periodo,fecha_generado,nombre) values ('$cod_usuarioFK','$descripcion','$fecha_inicio','$fecha_fin','$fecha_inicio_periodo','$fecha_fin_periodo','$fecha_generado','$nombre')";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}
	
	$ult_id = mysqli_insert_id($mysqli);


	mysqli_close($mysqli);
	return $ult_id;
}


function obtener_descripcion_tipo_cliente($idmora_cliente)
{
	$mysqli=conectar_al_servidor();
	$pagina="";
	$sql= "Select * from mora_cliente where estado='Activo' and idmora_cliente ='$idmora_cliente' ";
		   
		   
		   
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $control = 1;
 $descripcion = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  
		      $idmora_cliente=$valor['idmora_cliente'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
			   $generar=utf8_encode($valor['generar']);
			
			$descripcion .= $nombre;
			  if($diadesde != ""){
				 $descripcion .= " DESDE ".$diadesde;
			  }
			  
			  if($diahasta != ""){
				 $descripcion .= " HASTA ". $diahasta . " DIAS";
			  }
			  
			  if($diadesde == "" || $diahasta == ""){
				  $diadesde = $control;
				  $control++;
			  }
			  
	  
	  }
 }
 
  mysqli_close($mysqli);
return $descripcion;
}

function obtener_estado_cliente_informconf($cod_cliente)
{
	$mysqli=conectar_al_servidor();
	
	
	$sql= "SELECT estado FROM informconf WHERE cod_clienteFK ='$cod_cliente' order by idinformconf desc LIMIT 1";
	
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 $estado = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		   $estado=utf8_encode($valor['estado']);
			
			if($estado == 'ACTIVO'){
				$estado ='INFORMCONF';
			}

	  }
 }else{
	  $estado = 'NORMAL';
 }
 
  mysqli_close($mysqli);
return $estado;
}

function insertar_registro_detalle_callcenter($cod_callcenterFK,$cod_clienteFK)
{
	
	if($cod_callcenterFK=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="INSERT INTO detalle_callcenter (cod_callcenterFK,cod_clienteFK,estado) values ('$cod_callcenterFK','$cod_clienteFK','POR PROCESAR')";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}


	mysqli_close($mysqli);
}
function intdiv_1($a, $b){
    return ($a - $a % $b) / $b;
}
function actualizarEstadoClienteCallCenter($iddetalle_callcenter,$estado)
{
	
	if($iddetalle_callcenter=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE detalle_callcenter SET estado ='$estado' where iddetalle_callcenter ='$iddetalle_callcenter'";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}
	
	insertar_actividad_callcenter($iddetalle_callcenter,$estado);


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}
function actualizarTodosEstadosCallCenter()
{
	
	

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE detalle_callcenter SET estado ='NO CONCRETADO'";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}
	
	


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}

function actualizarEstadoCallCenter($idcall_center)
{
	
	if($idcall_center=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE call_center SET estado ='TERMINADO' where idcall_center ='$idcall_center'";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}


function insertar_actividad_callcenter($iddetalle_callcenter,$actividad){
	if($iddetalle_callcenter=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}
	
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 

	$mysqli=conectar_al_servidor();
	
    $consulta="INSERT INTO actividad_callcenter (cod_callcenterFK,cod_usarioFK,cod_clienteFK,actividad,fecha) values ((SELECT cod_callcenterFK from detalle_callcenter where iddetalle_callcenter = '$iddetalle_callcenter'),(SELECT cod_usuarioFK from call_center where idcall_center = (SELECT cod_callcenterFK from detalle_callcenter where iddetalle_callcenter = '$iddetalle_callcenter') ),(SELECT cod_clienteFK from detalle_callcenter where iddetalle_callcenter = '$iddetalle_callcenter'),'$actividad','$fecha_inser_edit')";	
	
	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}

function buscaroptionUsu()
{
	 
		$sql= "Select * from persona inner join usuario u on cod_persona=cod_usuario inner join local l on cod_localFK=cod_local where u.estado='Activo' and tipo_usuario ='CALLCENTER' and l.estado='Activo' ";
	 	
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
		  
		  
		      $cod_usuario=$valor['cod_usuario'];
		  	  $nombre_persona=utf8_encode($valor['nombre_persona']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$cod_usuario' >".$nombre_persona."</option>";   
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}







verificar($funt);
?>
