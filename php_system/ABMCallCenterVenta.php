<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include("formatear_fecha.php");
include('quitarseparadormiles.php');
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
	$nombre_cliente=$_POST['nombre_cliente'];
	$nombre_cliente = utf8_decode($nombre_cliente);
	$telefono=$_POST['telefono'];
	$telefono = utf8_decode($telefono);
	$origen=$_POST['origen'];
	$origen = utf8_decode($origen);
	$user=$_POST['useru'];
	$user = utf8_decode($user);
	abm($nombre_cliente,$telefono,$origen,$user);
}
if($funt=="nuevo_agenda")
{
	$descripcion=$_POST['descripcion'];
	$descripcion = utf8_decode($descripcion);
	$fecha=$_POST['fecha'];
	$fecha = utf8_decode($fecha);
	$iddetalle_callcenterventas=$_POST['iddetalle_callcenterventas'];
	$iddetalle_callcenterventas = utf8_decode($iddetalle_callcenterventas);
	
	nuevo_agenda($descripcion,$iddetalle_callcenterventas,$fecha);
}

if($funt=="actualizarEstadoCallCenterVenta")
{
$idcall_centerventa=$_POST['idcall_centerventa'];
$idcall_centerventa = utf8_decode($idcall_centerventa);
	actualizarEstadoCallCenterVenta($idcall_centerventa);

}

if($funt=="buscaroptionUsuTipoCallCenterVenta")
{

	buscaroptionUsu();

}

if($funt=="actualizarEstadoClienteCallCenterVenta")
{
$iddetalle_callcenterventas=$_POST['iddetalle_callcenterventas'];
$iddetalle_callcenterventas = utf8_decode($iddetalle_callcenterventas);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);

actualizarEstadoClienteCallCenterVenta($iddetalle_callcenterventas,$estado);

}

if($funt=="actualizarEstadoClienteAgendadoCallCenterVenta")
{
$idagendacallcenterventas=$_POST['idagendacallcenterventas'];
$idagendacallcenterventas = utf8_decode($idagendacallcenterventas);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);

actualizarEstadoClienteAgendadoCallCenterVenta($idagendacallcenterventas,$estado);

}

if($funt=="buscarActividadCallCenterVenta")
{
	$usuario=$_POST['usuario'];
	$usuario = utf8_decode($usuario);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$idcallcenter_ventasFK=$_POST['idcallcenter_ventasFK'];
	$idcallcenter_ventasFK = utf8_decode($idcallcenter_ventasFK);
	buscarActividadCallCenterVenta($usuario,$estado,$fecha1,$fecha2,$idcallcenter_ventasFK);
}

if($funt=="buscarAgendaCallCenterVenta")
{
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$cliente=$_POST['cliente'];
	$cliente = utf8_decode($cliente);
	
	$cod_agente=$_POST['cod_agente'];
	$cod_agente = utf8_decode($cod_agente);
	buscarAgendaCallCenterVenta($estado,$fecha1,$fecha2,$cliente,$cod_agente);
}

if($funt=="buscar")
{
	$cliente=$_POST['cliente'];
	$cliente = utf8_decode($cliente);
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$user=$_POST['useru'];
	$user = utf8_decode($user);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$origen=$_POST['origen'];
	$origen = utf8_decode($origen);
	buscar($cliente,$fecha1,$fecha2,$origen,$user,$estado);
}

if($funt=="buscar_agenda_cliente_callcenter_ventas")
{
	$iddetalle_callcenterventas=$_POST['iddetalle_callcenterventas'];
	$iddetalle_callcenterventas = utf8_decode($iddetalle_callcenterventas);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	
	buscar_agenda_cliente_callcenter_ventas($iddetalle_callcenterventas,$formato);
}

if($funt=="buscar_agenda_cliente_callcenter_ventas_agenda")
{
	$cod_agente=$_POST['cod_agente'];
	$cod_agente = utf8_decode($cod_agente);
	
	$cliente=$_POST['cliente'];
	$cliente = utf8_decode($cliente);
	
	$observacion=$_POST['observacion'];
	$observacion = utf8_decode($observacion);
	
	$fecha_agenda=$_POST['fecha_agenda'];
	$fecha_agenda = utf8_decode($fecha_agenda);
	
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	
	buscar_agenda_cliente_callcenter_ventas_agenda($cod_agente,$cliente,$observacion,$fecha_agenda,$fecha1,$fecha2,$estado,$formato);
}

if($funt=="informeCallCenterVenta")
{
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$cod_localFK=$_POST['cod_localFK'];
	$cod_localFK = utf8_decode($cod_localFK);
	informeCallCenterVenta($fecha1,$fecha2,$estado,$cod_localFK);
}

if($funt=="buscarDetallesCallCenterVenta")
{
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	
	$idcallcenter_ventasFK=$_POST['idcallcenter_ventasFK'];
	$idcallcenter_ventasFK = utf8_decode($idcallcenter_ventasFK);
	$usuario=$_POST['usuario'];
	$usuario = utf8_decode($usuario);
	$origen=$_POST['origen'];
	$origen = utf8_decode($origen);
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	
	
	buscarDetallesCallCenterVenta($idcallcenter_ventasFK,$estado,$usuario,$origen,$fecha1,$fecha2);
}

if($funt=="generarListaCallCenterVentas")
{
	$nombre=$_POST['nombre'];
	$nombre = utf8_decode($nombre);
	$cod_local=$_POST['cod_local'];
	$cod_local = utf8_decode($cod_local);
	$cod_zona=$_POST['cod_zona'];
	$cod_zona = utf8_decode($cod_zona);
	$condicion=$_POST['condicion'];
	$condicion = utf8_decode($condicion);
	$fecha_inicio=$_POST['fecha_inicio'];
	$fecha_inicio = utf8_decode($fecha_inicio);
	$fecha_fin=$_POST['fecha_fin'];
	$fecha_fin = utf8_decode($fecha_fin);
	
	$user=$_POST['useru'];
	$user = utf8_decode($user);
	$desde=$_POST['desde'];
	$desde = utf8_decode($desde);
	
	generarListaCallCenterVentas($nombre,$cod_local,$condicion,$cod_zona,$fecha_inicio,$fecha_fin,$user,$desde);
}



}

function buscar($cliente,$fecha1,$fecha2,$origen,$user,$estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	 
	 
	 
	 $condicioncliente = '';
	 if($cliente != ''){
		 $condicioncliente =" and nombre_cliente like'%".$cliente."%'";
	 }
	 
	 $condicionorigen = '';
	 if($origen != ''){
		 $condicionorigen =" and origen = '".$origen."'";
	 }
	 
	 $condicionestado = '';
	 if($estado != ''){
		 $condicionestado =" and estado = '".$estado."'";
	 }
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha_ingreso between '$fecha1' and '$fecha2'";
	 }
	 
		$sql= "SELECT nombre_cliente,ifnull(total_venta,0) as total_venta,fecha_venta,origen,telefono,fecha_ingreso,idcallcenter_ventasFK,agente_cod_usuarioFK,iddetalle_callcenterventas,estado,cod_clienteFK FROM detalle_callcenterventas where iddetalle_callcenterventas != '0' and estado != 'TERMINADO' and agente_cod_usuarioFK = '$user' ".$condicioncliente.$condicionorigen.$condicionfecha.$condicionestado;

/* echo $sql;
exit; */
   
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
		  
		      $nombre_cliente=utf8_encode($valor['nombre_cliente']);
			  $total_venta=utf8_encode($valor['total_venta']);
			  $fecha_venta=utf8_encode($valor['fecha_venta']);
			  $origen=utf8_encode($valor['origen']);
			  $telefono=utf8_encode($valor['telefono']);
			  $fecha_ingreso=utf8_encode($valor['fecha_ingreso']);
			  $iddetalle_callcenterventas=utf8_encode($valor['iddetalle_callcenterventas']);
			  $estado=utf8_encode($valor['estado']);
			  $cod_clienteFK=utf8_encode($valor['cod_clienteFK']);
			  $filas[]=array(
				  "codigo" => $iddetalle_callcenterventas,
				  "cliente" => $nombre_cliente,
				  "total_venta" => $total_venta,
				  "fecha_venta" => $fecha_venta,
				  "origen" => $origen,
				  "telefono" => $telefono,
				  "fecha_ingreso" => $fecha_ingreso,
				  "estado" => $estado,
				  "codigo_cliente" => $cod_clienteFK
			  );
			 
			  
		  	 $styleName=CargarStyleTable($styleName);
			  if($formato!='json'){
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosabmcallcenterventa(this)' >
			  <td style='display:none' id='td_id' >".$iddetalle_callcenterventas."</td>
			  <td style='width:30%' >".$nombre_cliente."</td>
			  <td style='width:10%' >".$total_venta."</td>
			  <td style='width:10%' >".$fecha_venta."</td>
			  <td style='width:20%' >".$origen."</td>
			  <td style='width:10%' >".$telefono."</td>
			  <td style='width:10%' >".$fecha_ingreso."</td>
			  <td style='width:10%' >".$estado."</td>
			  <td id='td_datos_1' style='display:none' >".$cod_clienteFK."</td>
			  </tr>
			  </table>";
			  }
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function informeCallCenterVenta($fecha1,$fecha2,$estado,$cod_localFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
	 
	 $condicionestado = '';
	 if($estado != ''){
		 $condicionestado =" and estado = '".$estado."'";
	 }
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha_insert between '$fecha1' and '$fecha2'";
	 }
	 
	 $condicionlocal = '';
	 if($cod_localFK != ''){
		 $condicionlocal = " and cod_localFK = '$cod_localFK'";
	 }
	 
	
		$sql= "SELECT idcallcenter_ventas,nombre,cod_localFK,condicion,cod_zonaFK,fecha_inicio,fecha_fin,estado,ingresado_por_userFK,fecha_insert,
		(SELECT nombre from local where cod_local=cod_localFK) as local,
		(SELECT nombre from zona where idzona = cod_zonaFK) as zona,
		(SELECT nombre_persona from persona where cod_persona = ingresado_por_userFK) as usuario
		from callcenter_ventas where idcallcenter_ventas != 0".$condicionfecha.$condicionestado.$condicionlocal;
		
		
   
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
		  
		      $nombre=utf8_encode($valor['nombre']);
			  $condicion=utf8_encode($valor['condicion']);
			  $fecha_inicio=utf8_encode($valor['fecha_inicio']);
			  $fecha_fin=utf8_encode($valor['fecha_fin']);
			  $estado=utf8_encode($valor['estado']);
			  $local=utf8_encode($valor['local']);
			  $zona=utf8_encode($valor['zona']);
			  $usuario=utf8_encode($valor['usuario']);
			  $fecha_insert=utf8_encode($valor['fecha_insert']);
			  $idcallcenter_ventas=utf8_encode($valor['idcallcenter_ventas']);
			 
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosCallCenterVenta(this)' >
			  <td style='display:none' id='td_id' >".$idcallcenter_ventas."</td>
			  <td style='width:20%' >".$nombre."</td>
			  <td style='width:10%' >".$condicion."</td>
			  <td style='width:10%' >".$fecha_inicio."/".$fecha_fin."</td>
			  <td style='width:10%' >".$fecha_insert."</td>
			  <td style='width:10%' >".$local."</td>
			  <td style='width:10%' >".$zona."</td>
			  <td style='width:10%' >".$usuario."</td>
			  <td style='width:10%' >".$estado."</td>
			  </tr>
			  </table>";
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscarDetallesCallCenterVenta($idcallcenter_ventasFK,$estado,$agente,$origen,$fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 if($estado =='SELECCIONAR'){
		 $estado = '';
	 }
	 
	 $condicionestado = '';
	 if($estado != ''){
		 $condicionestado =" and estado = '".$estado."'";
	 }
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha_ingreso between '$fecha1' and '$fecha2'";
	 }
	 
	 $condicionagente = '';
	 if($agente != ''){
		 $condicionagente = " and agente_cod_usuarioFK = '$agente'";
	 }
	 
	 $condicionorigen = '';
	 if($origen != ''){
		 $condicionorigen = " and origen = '$origen'";
	 }
	 
		$sql= "SELECT iddetalle_callcenterventas,nombre_cliente,total_venta,fecha_venta,origen,telefono,fecha_ingreso,idcallcenter_ventasFK,agente_cod_usuarioFK,estado,
		(SELECT nombre_persona from persona where cod_persona = agente_cod_usuarioFK) as agente
		from detalle_callcenterventas where iddetalle_callcenterventas != 0 and idcallcenter_ventasFK = '$idcallcenter_ventasFK'".$condicionfecha.$condicionestado.$condicionagente.$condicionorigen;

/* echo $sql;
exit; */
   
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
		  
		      $nombre_cliente=utf8_encode($valor['nombre_cliente']);
			  $total_venta=utf8_encode($valor['total_venta']);
			  $fecha_venta=utf8_encode($valor['fecha_venta']);
			  $origen=utf8_encode($valor['origen']);
			  $telefono=utf8_encode($valor['telefono']);
			  $fecha_ingreso=utf8_encode($valor['fecha_ingreso']);
			  $idcallcenter_ventasFK=utf8_encode($valor['idcallcenter_ventasFK']);
			  $iddetalle_callcenterventas=utf8_encode($valor['iddetalle_callcenterventas']);
			  $agente_cod_usuarioFK=utf8_encode($valor['agente_cod_usuarioFK']);
			  $estado=utf8_encode($valor['estado']);
			  $agente=utf8_encode($valor['agente']);
			 
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosdetalleInformeCallCenterVenta(this)' >
			  <td style='display:none' id='td_id' >".$iddetalle_callcenterventas."</td>
			  <td style='width:30%' >".$nombre_cliente."</td>
			  <td style='width:10%' >".$total_venta."</td>
			  <td style='width:10%' >".$fecha_venta."</td>
			  <td style='width:10%' >".$origen."</td>
			  <td style='display:none' >".$telefono."</td>
			  <td style='width:10%' >".$fecha_ingreso."</td>
			  <td style='width:10%' >".$agente."</td>
			  <td style='width:10%' >".$estado."</td>
			  </tr>
			  </table>";
			  
			  
			 
		  	 
		  	 
			    	
			  
			  
	  }
 }
 
 $paginaOption = obtener_option_agentes_callcenterventa($idcallcenter_ventasFK);
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta,"4"=>$paginaOption);
echo json_encode($informacion);	
exit;
}
function obtener_option_agentes_callcenterventa($idcallcenter_ventasFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value=''>SELECCIONAR</option>";
	 
	 
		$sql= "SELECT agente_cod_usuarioFK,
		(SELECT nombre_persona from persona where cod_persona = agente_cod_usuarioFK) as agente
		from detalle_callcenterventas where iddetalle_callcenterventas != 0 and idcallcenter_ventasFK = '$idcallcenter_ventasFK' group by agente_cod_usuarioFK";
   
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
		  
		      $agente_cod_usuarioFK=utf8_encode($valor['agente_cod_usuarioFK']);
		      $agente=utf8_encode($valor['agente']);
			  
			 
			  
			   $pagina.="<option  value='$agente_cod_usuarioFK' >".$agente."</option>";   
			    	 
			  
	  }
 }
 
mysqli_close($mysqli);
return $pagina;
}

function buscar_agenda_cliente_callcenter_ventas($iddetalle_callcenterventas,$formato="")
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $devolverArray=strtolower($formato)==="json";
	 
	 
		$sql= "SELECT observacion,fecha from agenda_callcenterventas where iddetalle_callcenterventasFK ='$iddetalle_callcenterventas'";

/* echo $sql;
exit; */
   
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
		  
		      $observacion=utf8_encode($valor['observacion']);
		      $fecha=utf8_encode($valor['fecha']);
			  
			 
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $filas[]=array(
				  "observacion" => $observacion,
				  "fecha" => $fecha,
				  "clase_fila" => $styleName
			  );
			  if(!$devolverArray){
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' >
			  <td style='width:50%' >".$observacion."</td>
			  <td style='width:50%' >".$fecha."</td>
			  </tr>
			  </table>";
			  }
			    	 
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscar_agenda_cliente_callcenter_ventas_agenda($cod_agente,$cliente,$observacion,$fecha_agenda,$fecha1,$fecha2,$estado,$formato="")
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $devolverArray=strtolower($formato)==="json";
	 
	 $condicioncliente = '';
	 if($cliente != ''){
		 $condicioncliente = " and (SELECT nombre_cliente FROM detalle_callcenterventas WHERE iddetalle_callcenterventas = ac.iddetalle_callcenterventasFK) like '%".$cliente."%'";
	 }
	 
	 $condicionobservacion = '';
	 if($observacion != ''){
		 $condicionobservacion = " and ac.observacion like '%".$observacion."%'";
	 }
	 
	 $condicionfecha_agenda = '';
	 if($fecha_agenda != ''){
		 $condicionfecha_agenda = " and ac.fecha = '".$fecha_agenda."'";
	 }
	 
	 $condicionrangofecha = '';
	 if($fecha1 != ''){
		 $condicionrangofecha = " and ac.fecha between '$fecha1' and '$fecha2'";
	 }
	 
	 $condicionestado = '';
	 if($estado != ''){
		 $condicionestado = " and ac.estado ='$estado'";
	 }
	 
		$sql= "SELECT ac.observacion,ac.fecha,ac.estado,idagenda_callcenterventas,
(SELECT nombre_cliente FROM detalle_callcenterventas WHERE iddetalle_callcenterventas = ac.iddetalle_callcenterventasFK) as nombre_cliente,
(SELECT telefono FROM detalle_callcenterventas WHERE iddetalle_callcenterventas = ac.iddetalle_callcenterventasFK) as telefono
 FROM agenda_callcenterventas ac WHERE (SELECT agente_cod_usuarioFK FROM detalle_callcenterventas WHERE iddetalle_callcenterventas = ac.iddetalle_callcenterventasFK) = '$cod_agente'".$condicioncliente.$condicionobservacion.$condicionfecha_agenda.$condicionrangofecha.$condicionestado;

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
		  
		      $observacion=utf8_encode($valor['observacion']);
		      $fecha=utf8_encode($valor['fecha']);
		      $nombre_cliente=utf8_encode($valor['nombre_cliente']);
		      $telefono=utf8_encode($valor['telefono']);
		      $estado=utf8_encode($valor['estado']);
		      $idagenda_callcenterventas=utf8_encode($valor['idagenda_callcenterventas']);
			  
			 
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $filas[]=array(
				  "id_agenda" => $idagenda_callcenterventas,
				  "cliente" => $nombre_cliente,
				  "observacion" => $observacion,
				  "fecha" => $fecha,
				  "telefono" => $telefono,
				  "estado" => $estado,
				  "clase_fila" => $styleName
			  );
			  if(!$devolverArray){
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosabmagendacallcenterventa(this)' >
			  <td style='display:none' id='td_id' >".$idagenda_callcenterventas."</td>
			  <td style='width:30%' >".$nombre_cliente."</td>
			  <td style='width:10%' >".$observacion."</td>
			  <td style='width:10%' >".$fecha."</td>
			  <td style='width:10%' >".$telefono."</td>
			  <td style='width:10%' >".$estado."</td>
			  </tr>
			  </table>";
			  }
			    	 
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}

function abm($nombre_cliente,$telefono,$origen,$user){
	
	
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 

	$mysqli=conectar_al_servidor();
	
    $consulta="INSERT INTO detalle_callcenterventas (nombre_cliente,telefono,origen,fecha_ingreso,idcallcenter_ventasFK,agente_cod_usuarioFK,estado) values(upper('$nombre_cliente'),'$telefono','$origen','$fecha_inser_edit',(SELECT idcallcenter_ventas from callcenter_ventas order by idcallcenter_ventas desc LIMIT 1),'$user','PENDIENTE')";	
	
	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {
	echo 'ERROR';
	exit;
	}


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}
function nuevo_agenda($descripcion,$iddetalle_callcenterventas,$fecha){
	
	
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 

	$mysqli=conectar_al_servidor();
	
    $consulta="INSERT INTO agenda_callcenterventas (observacion,iddetalle_callcenterventasFK,fecha_insert,fecha) values ('$descripcion','$iddetalle_callcenterventas','$fecha_inser_edit','$fecha')";	
	

	
	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}

function insertar_callcenter($nombre,$cod_localFK,$condicion,$cod_zonaFK,$fecha_inicio,$fecha_fin,$ingresado_por_userFK){
	
	
	date_default_timezone_set('America/Anguilla');    
	$fecha_inser_edit = date('Y-m-d', time()); 

	$mysqli=conectar_al_servidor();
	
	
    $consulta="INSERT INTO callcenter_ventas (nombre,cod_localFK,condicion,cod_zonaFK,fecha_inicio,fecha_fin,ingresado_por_userFK,fecha_insert,estado) values(upper('$nombre'),'$cod_localFK','$condicion','$cod_zonaFK','$fecha_inicio','$fecha_fin','$ingresado_por_userFK','$fecha_inser_edit','ACTIVO')";	
	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}

$ult_id = mysqli_insert_id($mysqli);
	
mysqli_close($mysqli);
return $ult_id;
}

function insertar_detalle_callcenterventas($nombre_cliente,$total_venta,$fecha_venta,$origen,$telefono,$fecha_ingreso,$idcallcenter_ventasFK,$agente_cod_usuarioFK,$cod_clienteFK,$cod_venta){
	
	
	date_default_timezone_set('America/Anguilla');    
	$fecha_inser_edit = date('Y-m-d', time()); 

	$mysqli=conectar_al_servidor();
	
    $consulta="INSERT INTO detalle_callcenterventas (nombre_cliente,total_venta,fecha_venta,origen,telefono,fecha_ingreso,idcallcenter_ventasFK,agente_cod_usuarioFK,estado,cod_clienteFK,cod_ventaFK) values(upper('$nombre_cliente'),'$total_venta','$fecha_venta','$origen','$telefono','$fecha_ingreso','$idcallcenter_ventasFK','$agente_cod_usuarioFK','PENDIENTE','$cod_clienteFK','$cod_venta')";
	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}

	
mysqli_close($mysqli);
}


function generarListaCallCenterVentas($nombre,$cod_local,$condicion,$cod_zona,$fecha_inicio,$fecha_fin,$user,$desde)
{
	date_default_timezone_set('America/Anguilla');    
	$fecha_insert = date('Y-m-d', time());
	
	if($cod_zona ==''){
		$cod_zona =0;
	}
	
	$idcallcenter_ventasFK = insertar_callcenter($nombre,$cod_local,$condicion,$cod_zona,$fecha_inicio,$fecha_fin,$user);
	
	
	$totalRegistro=$_POST['totalRegistro'];
	$totalRegistro = utf8_decode($totalRegistro);
	$array_agentes_ventas=json_decode($_POST['array_agentes_ventas']);
	
	/*Obtenemos las dos cantidades*/
	$cantidad_total_clientes = $totalRegistro;
	$cantidad_agentes = count($array_agentes_ventas);
	
	/*Distribuimos*/
	$clientes_por_agente = intdiv_1($cantidad_total_clientes, $cantidad_agentes);
	$restantes = $cantidad_total_clientes % $cantidad_agentes;
	
	/*Array que contendrá la cantidad de clientes por agente*/
	$agentes = array_fill(0, $cantidad_agentes, $clientes_por_agente);
	for ($i = 0; $i < $restantes; $i++) {
		$agentes[$i]++;
	}
	
	$contadorCliente = 1;
	for ($i = 0; $i < $cantidad_agentes; $i++) {
		for($x=0; $x < $agentes[$i]; $x++){
			
			
			if(isset($_POST['fecha'.$contadorCliente])){
				$fecha=$_POST['fecha'.$contadorCliente];
				$fecha = utf8_decode($fecha);
				$fecha = formatDateToYYYYMMDD($fecha);
			}else{
				$fecha = '';
			}
			
			$cliente=$_POST['cliente'.$contadorCliente];
			$cliente = utf8_decode($cliente);
			
			if(isset($_POST['total_venta'.$contadorCliente])){
			$total_venta=$_POST['total_venta'.$contadorCliente];
			$total_venta = utf8_decode($total_venta);
			$total_venta = quitarseparadormiles($total_venta);
			}else{
				$total_venta = 0;
			}
			
			$telefono=$_POST['telefono'.$contadorCliente];
			$telefono = utf8_decode($telefono);
			
			if(isset($_POST['cod_cliente'.$contadorCliente])){
			$cod_cliente=$_POST['cod_cliente'.$contadorCliente];
			$cod_cliente = utf8_decode($cod_cliente);
			}else{
				$cod_cliente = 0;
			}
			
			if(isset($_POST['cod_venta'.$contadorCliente])){
			$cod_venta=$_POST['cod_venta'.$contadorCliente];
			$cod_venta = utf8_decode($cod_venta);
			}else{
				$cod_venta = 0;
			}
			
			if(isset($_POST['idcliente'.$contadorCliente])){
				$idcliente=$_POST['idcliente'.$contadorCliente];
				$idcliente = utf8_decode($idcliente);
				
				actualizar_estado_posible_cliente($idcliente);
			}
			
			
			
			insertar_detalle_callcenterventas($cliente,$total_venta,$fecha,$desde,$telefono,$fecha_insert,$idcallcenter_ventasFK,$array_agentes_ventas[$i],$cod_cliente,$cod_venta);
			
			
			$contadorCliente++;
		}
	}
	
	
 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
function intdiv_1($a, $b){
    return ($a - $a % $b) / $b;
}

function actualizarEstadoClienteCallCenterVenta($iddetalle_callcenterventas,$estado)
{
	
	if($iddetalle_callcenterventas=="" ){
		$informacion =array("1" => "campovacio");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE `detalle_callcenterventas` SET estado ='$estado' where iddetalle_callcenterventas ='$iddetalle_callcenterventas'";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}
	
	insertar_actividad_callcenter_ventas($iddetalle_callcenterventas,$estado);


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}
function actualizarEstadoClienteAgendadoCallCenterVenta($idagendacallcenterventas,$estado)
{
	
	if($idagendacallcenterventas=="" ){
		$informacion =array("1" => "campovacio");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE `agenda_callcenterventas` SET estado ='$estado' where idagenda_callcenterventas ='$idagendacallcenterventas'";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}

function actualizar_estado_posible_cliente($idcliente)
{
	
	if($idcliente=="" ){
		$informacion =array("1" => "campovacio");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE `nuevos_cliente` SET estado_asignado ='ASIGNADO' where idnuevos_cliente ='$idcliente'";	
	
	// echo $consulta;
	// exit;

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}
	
	


	mysqli_close($mysqli);
	return true;
}


function insertar_actividad_callcenter_ventas($iddetalle_callcenterventas,$actividad){
	if($iddetalle_callcenterventas=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}
	
	date_default_timezone_set('America/Anguilla');    
	$fecha_inser_edit = date('Y-m-d', time()); 

	$mysqli=conectar_al_servidor();
	
    $consulta="INSERT INTO actividad_callcenter_ventas(cod_detalle_callcenterventas,agente_cod_usarioFK,nombre_cliente,actividad,fecha) values ('$iddetalle_callcenterventas',(SELECT agente_cod_usuarioFK FROM detalle_callcenterventas where iddetalle_callcenterventas = '$iddetalle_callcenterventas'),(SELECT nombre_cliente FROM detalle_callcenterventas where iddetalle_callcenterventas = '$iddetalle_callcenterventas'),'$actividad','$fecha_inser_edit')";	
	
	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}


	mysqli_close($mysqli);
}


function buscaroptionUsu()
{
	 
		$sql= "Select nombre_persona,u.cod_usuario from persona p
		inner join usuario u on p.cod_persona=u.cod_usuario 
		inner join local l on cod_localFK=cod_local
		where u.estado='Activo' and tipo_usuario ='CALLCENTER VENTAS' and l.estado='Activo'";
	 	

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
		  	  // $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$cod_usuario' >".$nombre_persona."</option>";   
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}


function buscarActividadCallCenterVenta($usuario,$estado,$fecha1,$fecha2,$cod_callcenter_ventas)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 if($estado == 'SELECCIONAR'){
		 $estado = '';
	 }
	 
	 $condicionestado = '';
	 if($estado){
		 $condicionestado =" and actividad ='$estado'";
	 }
	 
	 $condicionusuario = '';
	 if($usuario){
		 $condicionusuario =" and agente_cod_usarioFK ='$usuario'";
	 }
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha between '$fecha1' and '$fecha2'";
	 }
	 
		$sql= "SELECT idactividad_callcenter_ventas,cod_detalle_callcenterventas,agente_cod_usarioFK,actividad,fecha, 
		(SELECT nombre_persona from persona where cod_persona = agente_cod_usarioFK) as usuario,
		(SELECT nombre_cliente from detalle_callcenterventas where iddetalle_callcenterventas = acv.cod_detalle_callcenterventas) as cliente FROM actividad_callcenter_ventas acv inner join detalle_callcenterventas dcc ON acv.cod_detalle_callcenterventas = dcc.iddetalle_callcenterventas where acv.idactividad_callcenter_ventas != 0 and dcc.idcallcenter_ventasFK = '$cod_callcenter_ventas' ".$condicionestado.$condicionusuario.$condicionfecha." order by acv.idactividad_callcenter_ventas desc";

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
		  
		      $usuario=utf8_encode($valor['usuario']);
		      $cliente=utf8_encode($valor['cliente']);
			  $actividad=utf8_encode($valor['actividad']);
			  $fecha=utf8_encode($valor['fecha']);

			 
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
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscarAgendaCallCenterVenta($estado,$fecha1,$fecha2,$cliente,$cod_agente)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 if($estado == 'SELECCIONAR'){
		 $estado = '';
	 }
	 
	 $condicionestado = '';
	 if($estado != ''){
		 $condicionestado =" and (select estado from detalle_callcenterventas where iddetalle_callcenterventas = iddetalle_callcenterventasFK) ='$estado'";
	 }
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha between '$fecha1' and '$fecha2'";
	 }
	 
	 $condicioncliente = '';
	 if($cliente != ''){
		 $condicioncliente = " and (select nombre_cliente from detalle_callcenterventas where iddetalle_callcenterventas = iddetalle_callcenterventasFK) like '%".$cliente."%'";
	 }
	 
	 $condicioncod_agente = '';
	 if($cod_agente != ''){
		 $condicioncod_agente = " and (SELECT cod_persona from persona where cod_persona = (select agente_cod_usuarioFK from detalle_callcenterventas where iddetalle_callcenterventas = iddetalle_callcenterventasFK)) = ".$cod_agente;
	 }
	 
		$sql= "SELECT observacion,fecha_insert, fecha,
		(select estado from detalle_callcenterventas where iddetalle_callcenterventas = iddetalle_callcenterventasFK) as estado,
		(SELECT nombre_persona from persona where cod_persona = (select agente_cod_usuarioFK from detalle_callcenterventas where iddetalle_callcenterventas = iddetalle_callcenterventasFK)) as agente,
		(select nombre_cliente from detalle_callcenterventas where iddetalle_callcenterventas = iddetalle_callcenterventasFK) as nombre_cliente
		from agenda_callcenterventas where idagenda_callcenterventas != 0".$condicionestado.$condicionfecha.$condicioncliente.$condicioncod_agente." order by idagenda_callcenterventas desc";

 /*  echo $sql;
   exit; */
   
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
		  
		      $observacion=utf8_encode($valor['observacion']);
		      $nombre_cliente=utf8_encode($valor['nombre_cliente']);
			  $agente=utf8_encode($valor['agente']);
			  $estado=utf8_encode($valor['estado']);
			  $fecha=utf8_encode($valor['fecha']);

			 
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' >
			  <td style='width:40%' >".$nombre_cliente."</td>
			  <td style='width:20%' >".$observacion."</td>
			  <td style='width:10%' >".$fecha."</td>
			  <td style='width:20%' >".$agente."</td>
			  <td style='width:10%' >".$estado."</td>
			  </tr>
			  </table>";
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}


function actualizarEstadoCallCenterVenta($idcall_centerventa)
{
	
	if($idcall_centerventa=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE callcenter_ventas SET estado ='TERMINADO' where idcallcenter_ventas ='$idcall_centerventa'";	
	

	
    $stmt = $mysqli->prepare($consulta);

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}


	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}





verificar($funt);
?>
