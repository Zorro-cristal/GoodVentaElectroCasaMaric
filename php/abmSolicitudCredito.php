<?php
require("conexion.php");
include("verificar_navegador.php");
include("subir_foto_base64.php");
include("quitarseparadormiles.php");
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



if($operacion=="nuevo" || $operacion=="editar" )
{


$idAbm=$_POST['idAbm'];
$idAbm = utf8_decode($idAbm);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$idAbmCliente=$_POST['idAbmCliente'];
$idAbmCliente = utf8_decode($idAbmCliente);
$cod_garanteFK=$_POST['cod_garanteFK'];
$cod_garanteFK = utf8_decode($cod_garanteFK);
$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);

$cod_localFK=$_POST['cod_localFK'];
$cod_localFK = utf8_decode($cod_localFK);
$user=$_POST['useru'];
$user = utf8_decode($user);

$observacion=$_POST['observacion'];
$observacion = utf8_decode($observacion);

abm($idAbm,$estado,$idAbmCliente,$cod_garanteFK,$cod_cobradorFK,$cod_localFK,$user,$observacion,$operacion);

}

 
   if($operacion=="eliminarmasreferencia"){
 	$idreferenciacliente=$_POST["idreferenciacliente"];
 	$idreferenciacliente=utf8_decode($idreferenciacliente);
	
 	eliminarmasreferencia($idreferenciacliente);
 }

  if($operacion=="editarmasreferencias"){
	  $telefono=$_POST["telefono"];
 	$telefono=utf8_decode($telefono);
	$direccion=$_POST["direccion"];
 	$direccion=utf8_decode($direccion);
	$referencia=$_POST["referencia"];
 	$referencia=utf8_decode($referencia);
	// $observacion=$_POST["observacion"];
 	// $observacion=utf8_decode($observacion);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$obs=$_POST["obs"];
 	$obs=utf8_decode($obs);
 	$idreferenciacliente=$_POST["idreferenciacliente"];
 	$idreferenciacliente=utf8_decode($idreferenciacliente);
	
 	editarmasreferencias($idreferenciacliente,$telefono,$direccion,$referencia,$tipo,$obs);
 }

if($operacion=="buscar_cobrador_solicitud")
{

	buscar_cobrador_solicitud();

}

 if($operacion=="cambiar_estado"){
 	$idSolicitudCredito=$_POST["idSolicitudCredito"];
 	$idSolicitudCredito=utf8_decode($idSolicitudCredito);
	
	$user=$_POST['useru'];
    $user = utf8_decode($user);
	
	$estado=$_POST['estado'];
    $estado = utf8_decode($estado);
	
	$observacion=$_POST['observacion'];
    $observacion = utf8_decode($observacion);
	
 	actualizar_estado($idSolicitudCredito,$user,$estado,$observacion);
 }
 

 if($operacion=="buscardetallespreciossolicitud"){
	 
	 
	 $cod_productoSolicitud=$_POST["cod_productoSolicitud"];
 	$cod_productoSolicitud=utf8_decode($cod_productoSolicitud);
	$cantidadCuotaSolicitud=$_POST["cantidadCuotaSolicitud"];
 	$cantidadCuotaSolicitud=utf8_decode($cantidadCuotaSolicitud);
 	$conDescuento= '';
	if (isset($_POST["conDescuento"])){
		$conDescuento=$_POST["conDescuento"];
		$conDescuento=utf8_decode($conDescuento);
	}
	$precio=buscardetallespreciossolicituddirecto($cod_productoSolicitud,$cantidadCuotaSolicitud,$conDescuento);
	
	$informacion =array("1" => "exito","2" => $precio);
	echo json_encode($informacion);	
	exit;

}
 
  if($operacion=="buscarFotosGaleria"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarFotosGaleria($buscar);
 }
 
  if($operacion=="buscarDocumentosClienteSolicitud"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarDocumentosClienteSolicitud($buscar);
 }

  if($operacion=="buscar_vista_productos_combo_solicitud"){
	  
	$cod_comboFK=$_POST["cod_comboFK"];
 	$cod_comboFK=utf8_decode($cod_comboFK);
	
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$cantidadCuotaSolicitud=$_POST["cantidadCuotaSolicitud"];
 	$cantidadCuotaSolicitud=utf8_decode($cantidadCuotaSolicitud);
	
 	buscar_vista_productos_combo_solicitud($cod_comboFK,$local,$cantidadCuotaSolicitud);
 }


if($operacion=="EditarCliente" )
{



$cod_persona=$_POST['cod_persona'];
$cod_persona = utf8_decode($cod_persona);
$direccion=$_POST['direccion'];
$direccion = utf8_decode($direccion);
$telefono=$_POST['telefono'];
$telefono = utf8_decode($telefono);
$email=$_POST['email'];
$email = utf8_decode($email);
$cod_cliente=$cod_persona;
$whapp=$_POST['whapp'];
$whapp = utf8_decode($whapp);
$idzonaFk=$_POST['idzonaFk'];
$idzonaFk = utf8_decode($idzonaFk);
$lugardetrabajo=$_POST['lugardetrabajo'];
$lugardetrabajo = utf8_decode($lugardetrabajo);
$salario=$_POST['salario'];
$salario = quitarseparadormiles($salario);
$antiguedad=$_POST['antiguedad'];
$antiguedad = utf8_decode($antiguedad);
$teleftrab1=$_POST['teleftrab1'];
$teleftrab1 = utf8_decode($teleftrab1);
$teleftrab2=$_POST['teleftrab2'];
$teleftrab2 = utf8_decode($teleftrab2);
$direcciontrab=$_POST['direcciontrab'];
$direcciontrab = utf8_decode($direcciontrab);
$tipo_vivienda=$_POST['tipo_vivienda'];
$tipo_vivienda = utf8_decode($tipo_vivienda);

abmCliente($tipo_vivienda,$idzonaFk,$whapp,$cod_persona,$direccion,$telefono,$email,$cod_cliente,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$operacion);

}

 

 
 
 if($operacion=="addmasreferencias"){
 	$telefono=$_POST["telefono"];
 	$telefono=utf8_decode($telefono);
	$direccion=$_POST["direccion"];
 	$direccion=utf8_decode($direccion);
	$referencia=$_POST["referencia"];
 	$referencia=utf8_decode($referencia);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$obs=$_POST["obs"];
 	$obs=utf8_decode($obs);
	$idcliente=$_POST["idcliente"];
 	$idcliente=utf8_decode($idcliente);
 	addmasreferencias($telefono,$direccion,$referencia,$tipo,$obs,$idcliente);
 }
 
 
 if($operacion=="actualizar_solicitud"){;
	$idsolicitud=$_POST["idsolicitud"];
 	$idsolicitud=utf8_decode($idsolicitud);
	$lat=$_POST["lat"];
 	$lat=utf8_decode($lat);
	$lot=$_POST["lot"];
 	$lot=utf8_decode($lot);
	
	
 	actualizar_solicitud($idsolicitud,$lat,$lot,$user);
 }
 
  if($operacion=="actualizar_venta_contado_entrega"){;
	$idventa=$_POST["idventa"];
 	$idventa=utf8_decode($idventa);
	
	
 	actualizar_venta_contado_entrega($idventa,$user);
 }
 
  if($operacion=="BuscarImprimirSolicitudCredito"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	 BuscarImprimirSolicitudCredito($buscar);
 }



 if($operacion=="buscarmasreferencias"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarmasreferencias($buscar);
 }
 
  if($operacion=="buscarvista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$codlocal=$_POST["codlocal"];
 	$codlocal=utf8_decode($codlocal);
 	buscarvista($buscar,$codlocal);
 }
 
 
  if($operacion=="addProductoCredito"){
 	$totalCargado=$_POST["totalCargado"];
 	$totalCargado=utf8_decode($totalCargado);
	$idSolicitudCredito=$_POST["idSolicitudCredito"];
 	$idSolicitudCredito=utf8_decode($idSolicitudCredito);
 	addProductoCredito($totalCargado,$idSolicitudCredito);
 }
 
 
  if($operacion=="buscarProductoSolicitud"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarProductoSolicitud($buscar);
 }
 



	 
  if($operacion=="buscarSolicitudCredito"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$documento=$_POST["documento"];
 	$documento=utf8_decode($documento);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$cod_cobradorFK=$_POST["cod_cobradorFK"];
 	$cod_cobradorFK=utf8_decode($cod_cobradorFK);

 	BuscarRegistro($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$cod_cobradorFK);
 }  
 
   if($operacion=="buscarAbmAprobarSolicitudCredito"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$documento=$_POST["documento"];
 	$documento=utf8_decode($documento);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$cod_cobradorFK=$_POST["cod_cobradorFK"];
 	$cod_cobradorFK=utf8_decode($cod_cobradorFK);

 	buscarAbmAprobarSolicitudCredito($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$cod_cobradorFK);
 }  
 
 
 if($operacion=="buscarEntrega"){
	 
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	 
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	
	$cod_cobradorFK=$_POST["cod_cobradorFK"];
 	$cod_cobradorFK=utf8_decode($cod_cobradorFK);

 	buscarEntrega($fecha1,$fecha2,$cliente,$cod_cobradorFK);
 } 
 
 if($operacion=="buscarEntregaContado"){
	 
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	 
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	
	$cod_cobradorFK=$_POST["cod_cobradorFK"];
 	$cod_cobradorFK=utf8_decode($cod_cobradorFK);

 	buscarEntregaContado($fecha1,$fecha2,$cliente,$cod_cobradorFK);
 }
 
 
 if($operacion=="buscarvistaventaSolicitud"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$cantidadCuotaSolicitud=$_POST["cantidadCuotaSolicitud"];
 	$cantidadCuotaSolicitud=utf8_decode($cantidadCuotaSolicitud);
	$conDescuento= '';
	if (isset($_POST["conDescuento"])){
		$conDescuento=$_POST["conDescuento"];
		$conDescuento=utf8_decode($conDescuento);
	}
	buscarvistaventaSolicitud($buscar,$local,$cantidadCuotaSolicitud, $conDescuento);
 }
 
 
 

}




function abmCliente($tipo_vivienda,$idzonaFk,$whapp,$cod_persona,$direccion,$telefono,$email,$cod_cliente,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$operacion)
{



$mysqli=conectar_al_servidor(); 


$consulta1="Update persona set direccion=Upper(?),telefono=Upper(?),email=Upper(?) where cod_persona=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$direccion,$telefono,$email,$cod_persona);


$consulta2="update cliente set whapp=?,idzonaFk=?,lugardetrabajo=?,salario=?,antiguedad=?,teleftrab1=?,teleftrab2=?,direcciontrab=?,tipo_vivienda=? where cod_cliente=? ";	

$stmt2 = $mysqli->prepare($consulta2);
$ss='ssssssssss';
$stmt2->bind_param($ss,$whapp,$idzonaFk,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$tipo_vivienda,$cod_persona);


if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


if (!$stmt2->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}




 mysqli_close($mysqli);
$informacion =array("1" => "exito","2"=>$cod_persona);
echo json_encode($informacion);	
exit;

}




function abm($idAbm,$estado,$idAbmCliente,$cod_garanteFK,$cod_cobradorFK,$cod_localFK,$cod_usu,$observacion,$operacion)
{

$mysqli=conectar_al_servidor(); 

date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d', time()); 
	

if($operacion=="nuevo") 
{

$consulta1="Insert into solicitudcredito ( fecha, estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,cod_localFK,observacion)
values('$fecha_inser','PENDIENTE',$idAbmCliente,$cod_garanteFK,$cod_cobradorFK,$cod_localFK,'$observacion')";
$stmt1 = $mysqli->prepare($consulta1);

// echo($consulta1);
// exit;

}


if($operacion=="editar")
{


if($estado!='FINALIZADO' || $estado!='APROBADO'  ){
	
	
$consulta1="Update solicitudcredito set cod_localFK=Upper(?), cod_clienteFK=Upper(?), cod_codeudorFK=Upper(?), cod_cobradorFK=Upper(?) where idSolicitudCredito=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$cod_localFK,$idAbmCliente,$cod_garanteFK,$cod_cobradorFK,$idAbm);

}




}


if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


if($operacion=="nuevo") {
	$idAbm=obtenerUltimaId();
}

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2"=>$idAbm);
echo json_encode($informacion);	
exit;

}
function actualizar_solicitud($idsolicitud,$lat,$lot,$user)
{

$mysqli=conectar_al_servidor(); 

date_default_timezone_set('America/Anguilla');    
$fecha_update = date('Y-m-d', time()); 
	
$consulta1="Update solicitudcredito set estado_entrega = 'SI', fecha_entrega = '$fecha_update',lat = '$lat',lot = '$lot', entrega_cobradorFK = '$user' where idSolicitudCredito='$idsolicitud'";	

$stmt1 = $mysqli->prepare($consulta1);




if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}




 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}
function actualizar_venta_contado_entrega($idventa,$user)
{

$mysqli=conectar_al_servidor(); 

date_default_timezone_set('America/Anguilla');    
$fecha_update = date('Y-m-d', time()); 
	
$consulta1="Update venta set estado_entrega = 'SI', fecha_entrega = '$fecha_update', entrega_cobradorFK = '$user' where cod_venta='$idventa'";	

$stmt1 = $mysqli->prepare($consulta1);




if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}




 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

function addmasreferencias($telefono,$direccion,$referencias,$tipo,$obs,$cod_cliente)
{

if($cod_cliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 




$consulta="Insert into referenciascliente ( telef, direccion, referencias, cod_clienteFk, tipo,obs)
values(?,?,?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta);
$ss='ssssss';
$stmt1->bind_param($ss,$telefono,$direccion,$referencias, $cod_cliente,$tipo,$obs);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);
exit;
}


function obtenerUltimaId()
{
	$cod_persona ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select idSolicitudCredito from solicitudcredito  order by idSolicitudCredito desc limit 1";
	
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
		  
		      $cod_persona=$valor['idSolicitudCredito'];
		   	 
	  }
 }
 
  mysqli_close($mysqli);
 return $cod_persona;
}

/*Buscar Registro en vista*/
function BuscarRegistro($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$cod_cobradorFK)
{
$mysqli=conectar_al_servidor();

$condicionFecha="";
if($fecha1!="" || $fecha2!=""){
$condicionFecha="and fecha between '$fecha1' and '$fecha2' ";
}
$condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente= '".$documento."' ";
}
$condicioncliente="";
if($cliente!=""){
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ) like '%".$cliente."%' ";
}
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}
$condicionlocal="";
if($local!=""){
$condicionlocal="and cod_localFK= '".$local."' ";
}

$condicionestado="";
if($estado!=""){
$condicionestado="and sc.estado= '".$estado."' ";
}

$condicioncobrador="";
if($cod_cobradorFK!=""){
$condicioncobrador="and cod_cobradorFK = '".$cod_cobradorFK."' ";
}

$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,
(Select nombre from zona where idzonaFk=idzona )as zona,cod_localFK,
(Select Nombre from local where cod_local=cod_localFK ) as local,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,ifnull(cl.tipo_vivienda,'') as tipo_vivienda,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
where cl.estado='Activo' ".$condiciondocumento.$condicioncliente.$condicionzona.$condicionFecha.$condicionlocal.$condicionestado.$condicioncobrador."  limit 100";
$pagina = "";   


$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$observacion = utf8_encode($valor['observacion']); 
$cod_codeudorFK = utf8_encode($valor['cod_codeudorFK']);   
$garante = utf8_encode($valor['garante']);   
$idSolicitudCredito = utf8_encode($valor['idSolicitudCredito']);  
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);   
$fechanac = utf8_encode($valor['fechanac']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_cliente = utf8_encode($valor['rut_cliente']); 
$whapp = utf8_encode($valor['whapp']); 
$estado = utf8_encode($valor['estado']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$local = utf8_encode($valor['local']); 

$detalleVenta = utf8_encode($valor['detalleVenta']); 
$tipo_vivienda = utf8_encode($valor['tipo_vivienda']); 



$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);


	  $pagina.="<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0' >
<tr id='tbSelecRegistro' onclick='obtenerdatosSolicitudCredito(this)' >
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td id='td_17' style='display:none' class='td_search'></td>
<td id='' style='width:100%;'>
<table style='width:100%' class='tableRegistroSearchC'>
<tr>
<td id='' style='width:75%;' class='td_search'>".$nombre_persona."</td>
<td  style='width:25%;'class='td_search' >". $ci_cliente."</td>
</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td id='' style='width:100%;' class='td_search'>".$producto."</td>

</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td  style='width:33%;'class='td_search' >E:&nbsp".$estado."</td>
<td  style='width:33%;'class='td_search' >Z:&nbsp".$zona."</td>
<td  style='width:33%;' class='td_search'>NRO:&nbsp".$whapp."</td>
</tr>
</table>
</td>

<td  id='td_datos_1' style='display:none'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='display:none'>".$nombre_persona."</td>
<td  id='td_datos_4' style='display:none'>".$zona."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".$salario."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='display:none'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='display:none'>".$producto."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_23' style='display:none'>".$observacion."</td>
<td  id='td_datos_24' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_25' style='display:none'>".$local."</td>
<td  id='td_datos_26' style='display:none'>".$tipo_vivienda."</td>
</tr>
</table>";

}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarAbmAprobarSolicitudCredito($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$cod_cobradorFK)
{
$mysqli=conectar_al_servidor();

$condicionFecha="";
if($fecha1!="" || $fecha2!=""){
$condicionFecha="and fecha between '$fecha1' and '$fecha2' ";
}
$condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente= '".$documento."' ";
}
$condicioncliente="";
if($cliente!=""){
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ) like '%".$cliente."%' ";
}
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}
$condicionlocal="";
if($local!=""){
$condicionlocal="and cod_localFK= '".$local."' ";
}

$condicionestado="";
if($estado!=""){
$condicionestado="and sc.estado= '".$estado."' ";
}

$condicioncobrador="";
if($cod_cobradorFK!=""){
$condicioncobrador="and cod_cobradorFK = '".$cod_cobradorFK."' ";
}

$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,
(Select nombre from zona where idzonaFk=idzona )as zona,cod_localFK,
(Select Nombre from local where cod_local=cod_localFK ) as local,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(SELECT nombre_persona FROM persona pra where pra.cod_persona = cod_cobradorFK) as usuarioingreso,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
where cl.estado='Activo' ".$condiciondocumento.$condicioncliente.$condicionzona.$condicionFecha.$condicionlocal.$condicionestado.$condicioncobrador."  limit 100";
$pagina = "";   

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$observacion = utf8_encode($valor['observacion']); 
$cod_codeudorFK = utf8_encode($valor['cod_codeudorFK']);   
$garante = utf8_encode($valor['garante']);   
$idSolicitudCredito = utf8_encode($valor['idSolicitudCredito']);  
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);   
$fechanac = utf8_encode($valor['fechanac']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_cliente = utf8_encode($valor['rut_cliente']); 
$whapp = utf8_encode($valor['whapp']); 
$estado = utf8_encode($valor['estado']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$local = utf8_encode($valor['local']); 
$usuarioingreso = utf8_encode($valor['usuarioingreso']); 

$detalleVenta = utf8_encode($valor['detalleVenta']); 



$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);


	  $pagina.="<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0' >
<tr id='tbSelecRegistro' onclick='obtenerdatosAbmAprobarSolicitudCredito(this)' >
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td id='td_17' style='display:none' class='td_search'></td>
<td id='' style='width:100%;'>
<table style='width:100%' class='tableRegistroSearchC'>
<tr>
<td id='' style='width:75%;' class='td_search'>".$nombre_persona."</td>
<td  style='width:25%;'class='td_search' >". $ci_cliente."</td>
</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td id='' style='width:100%;' class='td_search'>".$producto."</td>

</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td  style='width:33%;'class='td_search' >E:&nbsp".$estado."</td>
<td  style='width:33%;'class='td_search' >Z:&nbsp".$zona."</td>
<td  style='width:33%;' class='td_search'>NRO:&nbsp".$whapp."</td>
</tr>
</table>
</td>

<td  id='td_datos_1' style='display:none'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='display:none'>".$nombre_persona."</td>
<td  id='td_datos_4' style='display:none'>".$zona."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".$salario."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='display:none'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='display:none'>".$producto."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_23' style='display:none'>".$observacion."</td>
<td  id='td_datos_24' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_25' style='display:none'>".$local."</td>
<td  id='td_datos_26' style='display:none'>".$usuarioingreso."</td>
</tr>
</table>";

}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}


function BuscarMasRegistro($codigo,$documento,$cliente,$zona,$estado,$accesocredito,$registrocargado)
{
$mysqli=conectar_al_servidor();

$condicionCodigo="";
if($codigo!=""){
$condicionCodigo="and pr.cod_persona = '".$codigo."' ";
}
$condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente= '".$documento."' ";
}
$condicioncliente="";
if($cliente!=""){
$condicioncliente="and concat(pr.nombre_persona,' ',pr.apellido_persona) like '%".$cliente."%' ";
}
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}

$condicionaccesocredito="";
if($accesocredito!=""){
$condicionaccesocredito="and cl.accesocredito= '".$accesocredito."' ";
}

$sql= "select cl.whapp,pr.cod_persona,pr.nombre_persona,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.estado,cl.idzonaFk,foto1,foto2,lugardetrabajo,salario,antiguedad,teleftrab1,teleftrab2,direcciontrab,cl.accesocredito,
(Select nombre from zona where idzonaFk=idzona )as zona,cl.fecha_insert,cl.fecha_edit,cl.sms,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
 from  persona pr inner join  cliente cl on cl.cod_cliente=pr.cod_persona 
where cl.estado=? ".$condiciondocumento.$condicioncliente.$condicionzona.$condicionCodigo.$condicionaccesocredito." order by pr.nombre_persona limit ".$registrocargado." , 100 ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);
$s='s';
$stmt->bind_param($s,$estado);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargado;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$sms = utf8_encode($valor['sms']); 
$cod_persona = utf8_encode($valor['cod_persona']);     
$nombre_persona = utf8_encode($valor['nombre_persona']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_cliente = utf8_encode($valor['rut_cliente']); 
$Calificacion = utf8_encode($valor['Calificacion']); 
$whapp = utf8_encode($valor['whapp']); 
$estado = utf8_encode($valor['estado']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$foto1 = utf8_encode($valor['foto1']); 
$foto2 = utf8_encode($valor['foto2']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$insertadopor = utf8_encode($valor['insertadopor']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$accesocredito = utf8_encode($valor['accesocredito']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
 
	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCliente(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$cod_persona."</td>
<td  id='td_datos_13' style='width:10%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td id='td_datos_1' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_10' style='width:10%'>".$zona."</td>
<td  id='td_datos_4' style='width:10%'>".$telefono."</td>
<td  id='td_datos_21' style='width:10%'>".$accesocredito."</td>
<td  id='td_datos_3' style='display:none'>".$direccion."</td>
<td  id='td_datos_5' style='display:none'>".$email."</td>
<td  id='td_datos_6' style='display:none'>".$Calificacion."</td>
<td  id='td_datos_7' style='display:none'>".$whapp."</td>
<td  id='td_datos_8' style='display:none'>".$estado."</td>
<td  id='td_datos_9' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$foto1."</td>
<td  id='td_datos_12' style='display:none'>".$foto2."</td>
<td  id='td_datos_15' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_16' style='display:none'>".$salario."</td>
<td  id='td_datos_17' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_18' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_19' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_20' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
<td  id='td_datos_104' style='display:none'>".$sms."</td>
</tr>
</table>";


}
}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina),"3" => number_format($nroRegistro,'0',',','.'),"99" =>$nroRegistro );
echo json_encode($informacion);	
exit;
}


function buscarProductoSolicitud($buscar)
{
	
$mysqli=conectar_al_servidor();
$sql= "select iddetallesolicitud, cantidad, codProducto,cuotas, plan, idSolicitudCreditoFK ,(select nombre_producto from producto where codProducto=cod_producto) as producto
,(select cod_barra from producto where codProducto=cod_producto) as cod_Barra from detallesolicitud where idSolicitudCreditoFK='$buscar' ";

// echo($sql);
// exit;
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$iddetallesolicitud = utf8_encode($valor['iddetallesolicitud']);
$cantidad = utf8_encode($valor['cantidad']);     
$codProducto = utf8_encode($valor['codProducto']);          
$plan = utf8_encode($valor['plan']);          
$idSolicitudCreditoFK = utf8_encode($valor['idSolicitudCreditoFK']); 
$producto = utf8_encode($valor['producto']); 
$cuotas = utf8_encode($valor['cuotas']); 
$cod_Barra = utf8_encode($valor['cod_Barra']); 


	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosProductoCredito(this)'  name='tdDetalleSolicitudCredito'>
<td  id='td_id_1' style='display:none'>".$codProducto."</td>
<td  id='td_datos_1' style='width:20%'>".$cod_Barra."</td>
<td  id='td_datos_2' style='width:40%'>".$producto."</td>
<td id='td_datos_3' style='width:10%'>".$cantidad."</td>
<td id='td_datos_4' style='width:20%'>".number_format($plan,'0',',','.')."</td>
<td id='td_id_2' style='display:none'>".$iddetallesolicitud."</td>
<td id='td_datos_5' style='width:10%'>".$cuotas."</td>
</tr>
</table>";


}
}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina) );
echo json_encode($informacion);	
exit;
}


/*Buscar Registro en vista*/
function buscarmasreferencias($buscar)
{
	
$mysqli=conectar_al_servidor();
$sql= "select tipo, idreferenciascliente, telef, direccion, referencias, observacion,obs, cod_clienteFk from referenciascliente where cod_clienteFk='$buscar' order by tipo asc ";

// echo($sql);
// exit;
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$tipo = utf8_encode($valor['tipo']);
$telef = utf8_encode($valor['telef']);     
$direccion = utf8_encode($valor['direccion']);          
$referencias = utf8_encode($valor['referencias']);          
$observacion = utf8_encode($valor['observacion']); 
$obs = utf8_encode($valor['obs']); 
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 
$idreferenciascliente = utf8_encode($valor['idreferenciascliente']); 


	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosRefSolicitudCredito(this)'  name='tdMasReferenciasSolicitudCredito'>
<td  id='td_datos_1' style='width:10%'>".$obs."</td>
<td  id='td_datos_2' style='width:10%'>".$telef."</td>
<td  id='td_datos_4' style='width:10%'>".$referencias."</td>
<td id='td_datos_3' style='width:10%'>".$direccion."</td>
<td id='td_datos_5' style='width:10%'>".$tipo."</td>
<td id='td_id' style='display:none'>".$idreferenciascliente."</td>
</tr>
</table>";


}
}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina) );
echo json_encode($informacion);	
exit;
}

function addProductoCredito($totalCargado,$idSolicitudCredito)
{

if($idSolicitudCredito=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
$control=1;	
if($totalCargado>0){
	
$consulta= "delete from detallesolicitud where idSolicitudCreditoFK='$idSolicitudCredito' "; 
$stmt1 = $mysqli->prepare($consulta);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 
}
while($control<=$totalCargado){

$cod_Producto=$_POST['cod_Producto'.$control];
$cod_Producto = utf8_decode($cod_Producto);

$cantidad=$_POST['cantidad'.$control];
$cantidad = utf8_decode($cantidad);

$precio=$_POST['precio'.$control];
$precio = quitarseparadormiles($precio);

$cuotas=$_POST['cuotas'.$control];
$cuotas = utf8_decode($cuotas);

$tipo=obtener_tipo_producto($cod_Producto);


$consulta="Insert into detallesolicitud ( cantidad, codProducto, plan,cuotas, idSolicitudCreditoFK,tipo)
values('$cantidad','$cod_Producto','$precio','$cuotas','$idSolicitudCredito','$tipo')";


$stmt1 = $mysqli->prepare($consulta);
// $ss='ssssss';
// $stmt1->bind_param($ss,$cantidad,$cod_Producto,$precio,$cuotas,$idSolicitudCredito,$tipo);

if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$control=$control+1;

}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

function obtener_tipo_producto($cod_producto)
{
	$mysqli=conectar_al_servidor();
	 
	 
		$sql= "SELECT tipo_producto FROM producto WHERE cod_producto ='$cod_producto'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $tipo_producto = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $tipo_producto=utf8_encode($valor['tipo_producto']);
			  
	  }
 }
 
 
 mysqli_close($mysqli);
return $tipo_producto;
}


function buscarDetalleProductoSolicitud($buscar)
{
	
$mysqli=conectar_al_servidor();
$sql= "select iddetallesolicitud, cantidad, codProducto, plan, idSolicitudCreditoFK ,(select nombre_producto from producto where codProducto=cod_producto) as producto
,(select cod_barra from producto where codProducto=cod_producto) as cod_Barra from detallesolicitud where idSolicitudCreditoFK='$buscar' ";

// echo($sql);
// exit;
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$producto = utf8_encode($valor['producto']);
$cantidad = utf8_encode($valor['cantidad']);     
$plan = utf8_encode($valor['plan']);          

	  $pagina.="
<table style='border: none;' class='tableRegistroSearchD' border='1' cellspacing='1' cellpadding='5' >
<tr   id='tbSelecRegistro'  >
<td    id='td_datos_1' style='width:20%;border: none;'>".$cantidad."</td>
<td    id='td_datos_2' style='width:80%;border: none;'>".$producto."</td>
</tr>
</table>";


}
}

    mysqli_close($mysqli);  
return $pagina;
}
function buscarDetalleProductoVenta($buscar)
{
	
$mysqli=conectar_al_servidor();
$sql= "select cantidad_detalle, precio_producto ,(select nombre_producto from producto where cod_producto=cod_productoFK) as producto 
from detalle_venta where cod_ventaFK='$buscar' ";


$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$producto = utf8_encode($valor['producto']);
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']);        

	  $pagina.="
<table style='border: none;' class='tableRegistroSearchD' border='1' cellspacing='1' cellpadding='5' >
<tr   id='tbSelecRegistro'  >
<td    id='td_datos_1' style='width:20%;border: none;'>".$cantidad_detalle."</td>
<td    id='td_datos_2' style='width:80%;border: none;'>".$producto."</td>
</tr>
</table>";


}
}

    mysqli_close($mysqli);  
return $pagina;
}


/*Buscar Registro en vista*/
function buscarvista($buscar,$codlocal)
{
$mysqli=conectar_al_servidor();


$condicioncliente="";
if($buscar!=""){
$condicioncliente="and ((Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ) like '%".$buscar."%' || and cl.ci_cliente= '".$buscar."' ) ";
}

$condicionlocal="";
if($codlocal!=""){
$condicionlocal="and cod_localFK= '".$codlocal."' ";
}

$sql= "select idSolicitudCredito, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,
(Select nombre from zona where idzonaFk=idzona )as zona,cl.accesocredito,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
where sc.estado='APROBADO' ".$condicioncliente.$condicionlocal."  limit 100";
$pagina = "";   

// echo($sql);
// exit;
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$accesocredito = utf8_encode($valor['accesocredito']); 
$cod_codeudorFK = utf8_encode($valor['cod_codeudorFK']);   
$garante = utf8_encode($valor['garante']);   
$idSolicitudCredito = utf8_encode($valor['idSolicitudCredito']);  
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);   
$fechanac = utf8_encode($valor['fechanac']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_cliente = utf8_encode($valor['rut_cliente']); 
$whapp = utf8_encode($valor['whapp']); 
$estado = utf8_encode($valor['estado']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);


	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaSolicitudCreditoVenta(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td  id='td_datos_1' style='width:10%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='width:25%'>".$nombre_persona."</td>
<td  id='td_datos_4' style='display:none'>".$zona."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".$salario."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='width:25%'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='width:30%'>".$producto."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$accesocredito."</td>
</tr>
</table>";


}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}





/*Buscar Registro en vista*/
function BuscarImprimirSolicitudCredito($buscar)
{
$mysqli=conectar_al_servidor();



$sql= "select idSolicitudCredito, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,
(Select nombre from zona where idzonaFk=idzona )as zona,cl.accesocredito,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente where cod_cliente=cod_codeudorFK )as cigarante,
(Select direccion from persona pra where pra.cod_persona=cod_codeudorFK )as Direcciongarante,
(Select email from persona pra where pra.cod_persona=cod_codeudorFK )as Referenciagarante,
(Select telefono from persona pra where pra.cod_persona=cod_codeudorFK )as NroTelgarante,
(Select lugardetrabajo from cliente where cod_cliente=cod_codeudorFK )as LugarTrabajogarante,
(Select antiguedad from  cliente where cod_cliente=cod_codeudorFK )as Antiguedadgarante,
(Select salario from cliente where cod_cliente=cod_codeudorFK )as Salariogarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
where  idSolicitudCredito=".$buscar."  limit 100";
$pagina = "";   

// echo($sql);
// exit;
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$accesocredito = utf8_encode($valor['accesocredito']); 
$cod_codeudorFK = utf8_encode($valor['cod_codeudorFK']);   
$garante = utf8_encode($valor['garante']);   
$idSolicitudCredito = utf8_encode($valor['idSolicitudCredito']);  
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);   
$fechanac = utf8_encode($valor['fechanac']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_cliente = utf8_encode($valor['rut_cliente']); 
$whapp = utf8_encode($valor['whapp']); 
$estado = utf8_encode($valor['estado']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 


$cigarante = utf8_encode($valor['cigarante']); 
$Direcciongarante = utf8_encode($valor['Direcciongarante']); 
$Referenciagarante = utf8_encode($valor['Referenciagarante']); 
$NroTelgarante = utf8_encode($valor['NroTelgarante']); 
$LugarTrabajogarante = utf8_encode($valor['LugarTrabajogarante']); 
$Antiguedadgarante = utf8_encode($valor['Antiguedadgarante']); 
$Salariogarante = utf8_encode($valor['Salariogarante']); 

$EstadoCivil = ""; 
$Vivienda = ""; 
$Cargo = ""; 

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);

$DatosReferencia=buscarDetalleReferencia($cod_clienteFK);
$Comercial=$DatosReferencia[0];
$Personal=$DatosReferencia[1];

$edad="";
if($fechanac=="0000-00-00"){
	$fechanac="";
}else{
	$edad=edad($fechanac);
}


}
}

if($Salariogarante!=""){
	$Salariogarante= number_format($Salariogarante,'0',',','.');
}
if($salario!=""){
	$salario= number_format($salario,'0',',','.');
}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($producto),"3" => $nombre_persona,"4" => $ci_cliente,"5" => $direccion,"6" => $email,"7" => $fechanac,"8" => $zona,"9" => $telefono,"10" => $whapp,"11" => $edad,"12" => $EstadoCivil,"13" => $Vivienda,"14" => $lugardetrabajo,"15" => $direcciontrab,"16" => $teleftrab1,"17" => $Cargo,"18" => $salario,"19" => $antiguedad,"20" => $garante,"21" => $cigarante,"22" => $Direcciongarante,"23" => $Referenciagarante,"24" => $NroTelgarante,"25" => $LugarTrabajogarante,"26" => $Antiguedadgarante,"27" => $Salariogarante  ,"28" => $Comercial,"29" => $Personal);
echo json_encode($informacion);	
exit;
}


function edad($edad){
    $nacimiento = new DateTime($edad);
    $ahora = new DateTime(date("Y-m-d"));
    $diferencia = $ahora->diff($nacimiento);
    return $diferencia->format("%y");
}


function buscarDetalleReferencia($buscar)
{
	
$mysqli=conectar_al_servidor();
$sql= "select idreferenciascliente, telef, direccion, referencias, observacion, cod_clienteFk, tipo from referenciascliente where cod_clienteFk='$buscar' ";

// echo($sql);
// exit;
$pagina1 ="<table style='border: none;' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'>
<td   style='width:100%'><p class='pTituloW' style='text-align: center;' ><b >REFERENCIA PERSONAL</b> </p> </td>
</tr>
</table>";
$pagina2 = "<table style='border: none;' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'>
<td   style='width:100%'><p class='pTituloW' style='text-align: center;' ><b >REFERENCIA COMERCIAL</b> </p> </td>
</tr>
</table>";   

$Datos=null;
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$telef = utf8_encode($valor['telef']);
$direccion = utf8_encode($valor['direccion']);     
$referencias = utf8_encode($valor['referencias']);  
$observacion = utf8_encode($valor['observacion']);     
$tipo = utf8_encode($valor['tipo']);          

if($tipo=="PERSONAL"){
	  $pagina1.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'>
<td   style='width:40%'><p class='pTituloW' >Nombre: <b >".$referencias."</b> </p> </td>
<td   style='width:20%'><p class='pTituloW' >Telefono: <b >".$telef."</b> </p> </td>
<td   style='width:40%'><p class='pTituloW' >Obs. : <b >".$observacion."</b> </p> </td>
</tr>
</table>";
}
if($tipo=="COMERCIAL"){
	  $pagina2.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'>
<td   style='width:40%'><p class='pTituloW' >Nombre: <b >".$referencias."</b> </p> </td>
<td   style='width:20%'><p class='pTituloW' >Telefono: <b >".$telef."</b> </p> </td>
<td   style='width:40%'><p class='pTituloW' >Obs. : <b >".$observacion."</b> </p> </td>
</tr>
</table>";
}
}
}

$Datos[0]=$pagina1;
$Datos[1]=$pagina2;
    mysqli_close($mysqli);  
return $Datos;
}


function  buscarvistaventaSolicitud($buscar,$local,$cantidadCuotaSolicitud, $conDescuento= '')
{
$mysqli=conectar_al_servidor();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	// $condicionLocal=" and stk.cod_localFK='$local' ";
}

$Mi_cod_localFK= $local;

$CondicionBuscador1="";
$CondicionBuscador2="";
$CondicionBuscadorTotal1="";
$CondicionBuscadorTotal2="";
$CondicionBuscadorTotalResyltado="";


if($buscar!=""){
$Buscador = explode ( ' ', $buscar );
$total = count($Buscador);
$contador=0;

while(($contador < $total)){
	if($Buscador[$contador]!=""){
	$CondicionBuscador1=" and concat(pr.nombre_producto,' ',pr.descripcion_producto,' ',pr.cod_barra) like '%".$Buscador[$contador]."%' ";	
	$CondicionBuscadorTotal1.=$CondicionBuscador1;
	
	$CondicionBuscador2="";
	$CondicionBuscadorTotal2.=$CondicionBuscador2;
}
	$contador++;
}
$CondicionBuscadorTotalResyltado=$CondicionBuscadorTotal1.$CondicionBuscadorTotal2;

}else{
	$CondicionBuscadorTotalResyltado=" and concat(pr.nombre_producto,' ',descripcion_producto,' ',pr.cod_barra) like '%%'";	
}


	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,pr.tipo_producto,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado, 
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where  pr.estado='Activo' and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0)>0 ".$condicionLocal.$CondicionBuscadorTotalResyltado." group by pr.cod_producto asc ";
	


$pagina = "";   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$control=0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_barra = utf8_encode($valor['cod_barra']);
$cod_producto = utf8_encode($valor['cod_producto']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
$unidad_producto = utf8_encode($valor['unidad_producto']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$precio_compra = utf8_encode($valor['precio_compra']); 
$stock_producto = utf8_encode($valor['stock_producto']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$tipo_producto = utf8_encode($valor['tipo_producto']); 
$styleProveedor="";




$Precio_contado=buscarListaDetallePrecioProductos($cod_producto,$Mi_cod_localFK,3);




// $paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
// $paginapreciosb=buscardetallespreciossolicitud($cod_producto);
// if($paginapreciosb==""){
// $paginapreciosb="Sin Credito";	
// }




$Precio_contado=buscarListaDetallePrecioProductos($cod_producto,$Mi_cod_localFK,3);
$controlPrecio = buscarListaDetallePrecioProductos($cod_producto,$Mi_cod_localFK,1);
$paginapreciosb=buscarListaDetallePrecioProductos($cod_producto,$Mi_cod_localFK,2);

if($controlPrecio[0]==0){
	$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
	$Precio_contado2=$precio_producto;
 
}else{
	if ($conDescuento == "true") {
		$paginaprecios=$paginapreciosb[6];
		$Precio_contado2=$Precio_contado[4];
	} else {
		$paginaprecios=$paginapreciosb[1];
		$Precio_contado2=$Precio_contado[3];
	}
}



if($paginapreciosb[2]==""){
	$paginapreciosb2="Sin Credito";	
}else{
	if ($conDescuento == "true") {
		$paginapreciosb2=$paginapreciosb[5];
	} else {
		$paginapreciosb2=$paginapreciosb[2];
	}
}




$btnVistaCombo = '';
$btnOnclick = 'obtenerdatosvistaproductodesdeSolicitudCredito(this)';
if($tipo_producto == 'COMBO'){
	$btnVistaCombo = "<input type=\"button\" value=\"VER\" style=\"width:100%\" class=\"btn4\" onclick=\"buscarvistacomboproductosolicitud('$cod_producto')\" />";
	$btnOnclick = '';
}

if($tipo_producto == 'COMBO'){
	$Precio_contado2=buscardetallespreciossolicituddirecto($cod_producto,$cantidadCuotaSolicitud,$Mi_cod_localFK);
	$Precio_contado2 = str_replace(".", "", $Precio_contado2);
}

	  $pagina.="
	  
	  
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' onclick='$btnOnclick' name='trVistaProducto_".$cod_barra."' style='$styleProveedor' >
<td  style='width:80%;'>
<table style='width:100%;' class='tableRegistroSearchE' >
<tr>
<td  style='width:85%;'class='td_search' >".$nombre_producto."</td>
<td  style='width:15%;'class='td_search' >". number_format($stock_producto,'0',',','.')."</td>
</tr>
</table>

<table style='width:100%;' class='tableRegistroSearchF' >
<tr>
<td  style='width:100%;'class='td_search' >Marca: ".$NombreMarca."</td>
</tr>
</table>

<table style='width:100%;' class='tableRegistroSearchF' >
<tr>
<td  style='width:100%;'class='td_search' >Cod.: ".$cod_barra." .</td>
</tr>
</table>

<table style='width:100%;' class='tableRegistroSearchF' >
<tr>
<td  style='width:100%;'class='td_search' >Precio: ".number_format($Precio_contado2,'0',',','.')." Gs.</td>
</tr>
</table>

<table style='width:100%;' class='tableRegistroSearchF' >
<tr>
<td  style='width:100%;'class='td_search' >".$btnVistaCombo."</td>
</tr>
</table>
 
</td>

<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='display:none; background-color: #efeded;color:red'>".$cod_barra."
<br><input style='outline:none;height: 0px;padding: 0px;' type='button' class='$nroRegistro' value='$control' name='$cod_barra' id='btnfocusProducto' onfocus='recorrerFocusTableProductoVenta(this)' ></td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='display:none'>".$nombre_producto."</td>
<td  id='td_datos_14' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_precio_contado' style='display:none'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_precios_creditos' style='display:none;    line-height: 18px;    font-size: 9px;'>".$paginaprecios."</td>
<td  id='td_datos_4' style='display:none'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='display:none'>".$stock_producto."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
</tr>
</table>";
	 
$control=$control+1;

}
}




/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}






function  buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,$desde)
{
	
	$user=$_POST['useru'];
    $user = utf8_decode($user);
 
 $condicionDesde="";
 if($desde=="2"){
	 $condicionDesde=" and dlpp.Cuota!='1'";
 }
 
 if($desde=="3"){
	 $condicionDesde=" and dlpp.Cuota='1'";
 }
 
 
 
$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$sql= "select  cod_detalle_listado_precio_producto ,precio,dlpp.descripcion,cod_producto,comision,dlpp.Porcentaje,preciocuota ,
dlpp.descuento,dlpp.Cuota , (select Nombre from local where cod_localFK=cod_local) as local , accion
from  detalle_listado_precio_producto dlpp
inner join detalle_listado_precio dlp on cod_detalle_listado_precio=cod_detalle_listado_precioFK
inner join lista_precio_producto lpp on cod_lista_precio_producto=dlp.cod_lista_precio_productoFK
inner join local_lista_precio llp on  llp.cod_lista_precio_productoFK=lpp.cod_lista_precio_producto
 where lpp.estado='Activo' and cod_producto='".$cod_producto."' and cod_localFK='".$cod_localFK."' and accion='SI' and fecha_hasta>='".$fechahoy."' ".$condicionDesde." group by cod_detalle_listado_precio_producto asc order by dlpp.Cuota asc";

// echo($sql);
// exit;

$pagina = "";   
$pagina2 = "";   
$pagina3 = 0;
$pagina4 = 0;
$pagina5 = "";
$pagina6 = "";
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";
$Contador=0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
   $Contador++;
$Porcentaje = utf8_encode($valor['Porcentaje']);  
$precio = utf8_encode($valor['precio']);     
$descripcion = utf8_encode($valor['descripcion']);                   
$comision = utf8_encode($valor['comision']);          
$Cuota = utf8_encode($valor['Cuota']);          
$preciocuota = utf8_encode($valor['preciocuota']);  
$descuento= utf8_encode($valor['descuento']);        


	$pagina.="<option id='$Cuota' class='$Porcentaje'   name='$comision' value='".number_format($precio,'0',',','.')."'>".$descripcion." X ".number_format($preciocuota,'0',',','.')."</option>";
	$pagina2.="Cuota Nro: ".$Cuota." =<b>".number_format($precio,'0',',','.')."Gs</b><br>";
	$pagina3= $precio;
	$totalCuotaDescuento= intval($Cuota) * intval($descuento);
	$pagina5 .= "Cuota Nro: ".$Cuota." =<b>".number_format($totalCuotaDescuento,'0',',','.')."Gs</b><br>";
	$pagina4= $descuento;
	$pagina6 .="<option id='$Cuota' class='$Porcentaje'   name='$comision' value='".number_format($totalCuotaDescuento,'0',',','.')."'>".$descripcion." X ".number_format($precio,'0',',','.')."</option>";
}
}

$Datos[0]= $Contador ;
$Datos[1]= $pagina ;
$Datos[2]= $pagina2 ;
$Datos[3]= $pagina3 ;
$Datos[4]= $pagina4 ;
$Datos[5]= $pagina5 ;
$Datos[6]= $pagina6 ;
return $Datos ;

}



function buscar_vista_productos_combo_solicitud($cod_comboFK,$local,$cantidadCuotaSolicitud)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$sql= "SELECT iddetalle_combo_producto,
		(SELECT cod_producto FROM producto WHERE cod_producto = cod_productoFK) as cod_producto ,
		(SELECT Nombre FROM local where cod_local = (SELECT cod_localFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as nombre_local,
		(SELECT estado FROM producto WHERE cod_producto = cod_productoFK) as estado ,
		(SELECT promo FROM producto WHERE cod_producto = cod_productoFK) as promo ,
		(SELECT comision FROM producto WHERE cod_producto = cod_productoFK) as comision ,
		(SELECT cod_localFK FROM producto WHERE cod_producto = cod_productoFK) as cod_localFK ,
		(SELECT precio_producto FROM producto WHERE cod_producto = cod_productoFK) as precio_producto,
		(SELECT precio_compra FROM producto WHERE cod_producto = cod_productoFK) as precio_compra,
		(SELECT cod_barra FROM producto WHERE cod_producto = cod_productoFK) as cod_barra,
		(SELECT unidad_producto FROM producto WHERE cod_producto = cod_productoFK) as unidad_producto,
		(SELECT nombre_producto FROM producto WHERE cod_producto = cod_productoFK) as nombre_producto,
		(SELECT descripcion_producto FROM producto WHERE cod_producto = cod_productoFK) as descripcion_producto,
		(SELECT descripcion FROM marcas WHERE cod_marcas = (SELECT cod_marcasFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as NombreMarca,
		(SELECT codProveedor FROM producto WHERE cod_producto = cod_productoFK) as CodProveedor,
		(SELECT descripcion FROM categoria WHERE cod_categoria = (SELECT cod_categoriaFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as NombreCategoria,
		cantidad,precio_descuento,
		IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = (SELECT idstocklocales FROM stocklocales sl WHERE sl.cod_productofk = cod_producto and sl.cod_localfk='$local')),0) as stock_producto,
		(SELECT descripcion FROM impuesto WHERE cod_Impuesto = (SELECT cod_ImpuestoFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as NombreImpuesto
		FROM detalle_combo_producto dcp WHERE cod_comboFK = '$cod_comboFK'";

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
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  

			$cod_barra = utf8_encode($valor['cod_barra']);
			$cod_producto = utf8_encode($valor['cod_producto']);
			$nombre_producto = utf8_encode($valor['nombre_producto']);          
			$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
			$unidad_producto = utf8_encode($valor['unidad_producto']); 
			$precio_producto = utf8_encode($valor['precio_producto']); 
			$precio_compra = utf8_encode($valor['precio_compra']); 
			$stock_producto = utf8_encode($valor['stock_producto']); 
			$cod_localFK = utf8_encode($valor['cod_localFK']); 
			$comision = utf8_encode($valor['comision']); 
			$estado = utf8_encode($valor['estado']); 
			$local = utf8_encode($valor['nombre_local']); 
			$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
			$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
			$NombreMarca = utf8_encode($valor['NombreMarca']); 
			$CodProveedor = utf8_encode($valor['CodProveedor']); 
			$cantidad = utf8_encode($valor['cantidad']); 
			/*$promo = utf8_encode($valor['promo']); 
			 $tipo_producto = utf8_encode($valor['tipo_producto']); */
			  
		/* $paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision); */

$paginapreciototal = obtener_precio_producto($cod_comboFK,$cantidadCuotaSolicitud);



$Precio_contado = buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,3);
			$controlPrecio = buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,1);
			$paginapreciosb = buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,2);
			
			

if($controlPrecio[0]==0){
	$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
	$Precio_contado2=$precio_producto;
}else{
	$paginaprecios=$paginapreciosb[1];
	$Precio_contado2=$Precio_contado[3];
}
			  


if($paginapreciosb[2]==""){
	$paginapreciosb2="Sin Credito";	
}else{
$paginapreciosb2=$paginapreciosb[2];	
}
		  	 
			 

  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0' >
<tr id='tbSelecRegistro' name='' >
<td id='' style='width:100%;'>
<table style='width:100%' class='tableRegistroSearchC'>
<tr>
<td id='' style='width:100%;' class='td_search'>".$nombre_producto."</td>
</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td  style='width:25%;'class='td_search' >Cod.:&nbsp". $cod_barra."</td>
<td  style='width:25%;'class='td_search' >Precio:&nbsp".number_format($Precio_contado2,'0',',','.')."</td>
<td  style='width:25%;' class='td_search'>Cantidad:&nbsp". $cantidad."</td>
<td  style='width:25%;' class='td_search'>Stock:&nbsp". $stock_producto."</td>
</tr>
</table>
</td>
<td id='' style='display:none'>".$cod_barra."</td>
<td  style='display:none; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='' style='display:none'>".$cod_producto."</td>
<td  id='' style='display:none'>".$nombre_producto."</td>
<td  id='' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='' style='display:none'>". $paginapreciosb2."</td>
<td  id='td_datos_6' style='display:none'>".$stock_producto."</td>
<td  id='td_datos_16' style='display:none'>".$cantidad."</td>
<td  id='' style='display:none'>".$paginapreciototal."</td>
</tr>
</table>";





	  	
			  
			  
	  }
 }
 
 $pagina2 = buscar_vista_detalle_productos_combo_solicitud($cod_comboFK,$cantidadCuotaSolicitud);
$pagina .= $pagina2;
 
 
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}
function obtener_precio_producto($cod_producto, $cuota)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$sql= "SELECT precio FROM detalle_listado_precio_producto WHERE cod_producto ='$cod_producto' and Cuota = '$cuota'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 $precio_producto = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $precio_producto=utf8_encode($valor['precio']);
			  
	  }
 }
 
return $precio_producto;
}

function buscar_vista_detalle_productos_combo_solicitud($cod_comboFK,$cantidadCuotaSolicitud)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$sql= "SELECT
		cod_producto,
		estado ,
		comision ,
		cod_localFK ,
		precio_producto,
		precio_compra,
		cod_barra,
		unidad_producto,
		nombre_producto,
		descripcion_producto,
		(SELECT descripcion FROM marcas WHERE cod_marcas = cod_marcasFK) as NombreMarca,
		CodProveedor,
		(SELECT descripcion FROM categoria WHERE cod_categoria = cod_categoriaFK) as NombreCategoria,
		(SELECT descripcion FROM impuesto WHERE cod_Impuesto = cod_ImpuestoFK) as NombreImpuesto
		FROM producto WHERE cod_producto = '$cod_comboFK' LIMIT 1";
   

   
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
		  

			$cod_barra = utf8_encode($valor['cod_barra']);
			$cod_producto = utf8_encode($valor['cod_producto']);
			$nombre_producto = utf8_encode($valor['nombre_producto']);          
			$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
			$unidad_producto = utf8_encode($valor['unidad_producto']); 
			$precio_producto = utf8_encode($valor['precio_producto']); 
			$precio_compra = utf8_encode($valor['precio_compra']); 
			$cod_localFK = utf8_encode($valor['cod_localFK']); 
			$comision = utf8_encode($valor['comision']); 
			$estado = utf8_encode($valor['estado']); 
			$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
			$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
			$NombreMarca = utf8_encode($valor['NombreMarca']); 
			$CodProveedor = utf8_encode($valor['CodProveedor']); 
			// $cantidad = utf8_encode($valor['cantidad']); 
			/*$promo = utf8_encode($valor['promo']); 
			 $tipo_producto = utf8_encode($valor['tipo_producto']); */
			  
		/* $paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision); */

// $paginapreciosb=buscardetallespreciossolicitud($cod_producto,$cantidadCuotaSolicitud);
$paginapreciototal = obtener_precio_producto($cod_comboFK,$cantidadCuotaSolicitud);


		  	
			 $pagina.="
<table class='' style='display:none'  border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' name='trListadoComboProductoVenta' style='' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='display:none; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='display:none'>".$nombre_producto."</td>
<td  id='' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'></td>
<td  id='td_datos_11' style='display:none'>". number_format($paginapreciototal,'0',',','.')."</td>
<td  id='td_datos_6' style='display:none'></td>
<td  id='td_datos_16' style='display:none'>1</td>
<td  id='td_datos_17' style='display:none'>".$paginapreciototal."</td>
</tr>
</table>";
			    	 
		  	
			  
			  
	  }
 }
 
 
 
mysqli_close($mysqli);
return $pagina;	
}



function  buscardetallesprecios($buscar,$preciocontado,$comisioncontado)
{
$mysqli=conectar_al_servidor();

$sql= "select (select porcentaje from producto p where p.cod_producto=dt.cod_producto) as porcentajeContado , precio,Porcentaje as porcen,descripcion,cod_producto,iddetallesprecio,comision,Cuota
 from  detallesprecio dt
where cod_producto=? ";
 $pagina="";  
$stmt = $mysqli->prepare($sql);
$s='s';
$stmt->bind_param($s,$buscar);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$Porcentaje = 26;  
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$porcentajeContado = "";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$porcentajeContado = utf8_encode($valor['porcentajeContado']);  
$Porcentaje = utf8_encode($valor['porcen']);  
$precio = utf8_encode($valor['precio']);     
$descripcion = utf8_encode($valor['descripcion']);          
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          
$comision = utf8_encode($valor['comision']);          
$Cuota = utf8_encode($valor['Cuota']);          


	  $pagina.="<option id='$Cuota' style='$porcentajeContado' class='$Porcentaje' url='$preciocontado' name='$comision' value='".number_format($precio,'0',',','.')."'>".$descripcion."</option>";



}
}
$pagina.="<option name='$comisioncontado' style='$porcentajeContado' class='$Porcentaje' url='$preciocontado'  value='".number_format($preciocontado,'0',',','.')."'  style='display:none' id='contado' >Contado</option>";  
return $pagina;
}


function  buscardetallespreciossolicitud($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select precio,Porcentaje,descripcion,cod_producto,iddetallesprecio,comision,Cuota
 from  detallesprecio 
where cod_producto=? ";




 $pagina="";  
$stmt = $mysqli->prepare($sql);
$s='s';
$stmt->bind_param($s,$buscar);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$Porcentaje = utf8_encode($valor['Porcentaje']); 
$precio = utf8_encode($valor['precio']);
$descripcion = utf8_encode($valor['descripcion']);          
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          
$comision = utf8_encode($valor['comision']);          
$Cuota = utf8_encode($valor['Cuota']);          


	  $pagina.=" ".$Cuota." *<b>".number_format($precio,'0',',','.')."Gs</b><br>";



}
}

return $pagina;
}


function  buscardetallespreciossolicitudb($buscar,$cuota)
{
$mysqli=conectar_al_servidor();

$sql= "select IFNULL(precio,0) as precio,Porcentaje,descripcion,cod_producto,iddetallesprecio,comision,Cuota
 from  detallesprecio 
where cod_producto='$buscar' and Cuota='$cuota' limit 1  ";

// echo($sql);
// exit;

 $pagina="";  
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$pagina = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$Porcentaje = utf8_encode($valor['Porcentaje']); 
$precio = utf8_encode($valor['precio']);
$descripcion = utf8_encode($valor['descripcion']);          
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          
$comision = utf8_encode($valor['comision']);          
$Cuota = utf8_encode($valor['Cuota']);          



$pagina=number_format($precio,'0',',','.');



}
}

return $pagina;
}



function buscarEntrega($fecha1,$fecha2,$cliente,$cod_cobradorFK)
{
$mysqli=conectar_al_servidor();

$condicionfecha="";
if($fecha1!="" || $fecha2!=""){
	$condicionfecha=" and fecha between '$fecha1' and '$fecha2' ";
}


$condicioncliente="";
if($cliente!=""){
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona,' ',cl.ci_cliente) from persona pra where pra.cod_persona=sc.cod_clienteFK ) like '%".$cliente."%' ";
}

$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, sc.cod_clienteFK, cod_codeudorFK, sc.cod_cobradorFK,vt.cod_venta,
(Select nombre from zona where idzonaFk=idzona )as zona,sc.cod_localFK,
(Select Nombre from local where cod_local=sc.cod_localFK ) as local,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join venta vt on vt.codSolicitudCreditoFK = sc.idSolicitudCredito
 inner join detalleentregador_local del on del.cod_localFK = sc.cod_localFK
where cl.estado='Activo' and sc.estado = 'FINALIZADO' and sc.estado_entrega = 'NO' and (SELECT count(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 and del.cod_cobradorFK = '$cod_cobradorFK' ".$condicioncliente.$condicionfecha."  limit 100";
$pagina = ""; 


 

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$observacion = utf8_encode($valor['observacion']); 
$cod_codeudorFK = utf8_encode($valor['cod_codeudorFK']);   
$garante = utf8_encode($valor['garante']);   
$idSolicitudCredito = utf8_encode($valor['idSolicitudCredito']);  
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);   
$fechanac = utf8_encode($valor['fechanac']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_cliente = utf8_encode($valor['rut_cliente']); 
$whapp = utf8_encode($valor['whapp']); 
$estado = utf8_encode($valor['estado']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$local = utf8_encode($valor['local']); 

$detalleVenta = utf8_encode($valor['detalleVenta']); 



$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);


	  $pagina.="<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0' >
<tr id='tbSelecRegistro' onclick='obtenerDatosEntrega(this)' >
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td id='td_17' style='display:none' class='td_search'></td>
<td id='' style='width:100%;'>
<table style='width:100%' class='tableRegistroSearchC'>
<tr>
<td id='' style='width:75%;' class='td_search'>".$nombre_persona."</td>
<td  style='width:25%;'class='td_search' >". $ci_cliente."</td>
</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td id='' style='width:100%;' class='td_search'>".$producto."</td>

</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td  style='width:33%;'class='td_search' >E:&nbsp".$estado."</td>
<td  style='width:33%;'class='td_search' >Z:&nbsp".$zona."</td>
<td  style='width:33%;' class='td_search'>NRO:&nbsp".$whapp."</td>
</tr>
</table>
</td>

<td  id='td_datos_1' style='display:none'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='display:none'>".$nombre_persona."</td>
<td  id='td_datos_4' style='display:none'>".$zona."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".$salario."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='display:none'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='display:none'>".$producto."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_23' style='display:none'>".$observacion."</td>
<td  id='td_datos_24' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_25' style='display:none'>".$local."</td>
<td  id='td_datos_26' style='display:none'>".$producto."</td>
</tr>
</table>";

}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}
function buscarEntregaContado($fecha1,$fecha2,$cliente,$cod_cobradorFK)
{
$mysqli=conectar_al_servidor();

$condicionfecha="";
if($fecha1!="" || $fecha2!=""){
	$condicionfecha=" and vt.fecha_venta between '$fecha1' and '$fecha2' ";
}


$condicioncliente="";
if($cliente!=""){
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona,' ',cl.ci_cliente) from persona pra where pra.cod_persona=vt.cod_clienteFK ) like '%".$cliente."%' ";
}

$sql= "select vt.cod_clienteFK, vt.cod_cobradorFK,vt.cod_venta,
(Select nombre from zona where idzona=(SELECT idzonaFk FROM cliente WHERE cod_cliente = vt.cod_clienteFK) )as zona,
vt.cod_local,
(Select Nombre from local where cod_local=vt.cod_local ) as local,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=vt.cod_clienteFK )as cliente,
(Select direccion from persona pra where pra.cod_persona=vt.cod_clienteFK )as direccion,
(Select ci_cliente from cliente c where c.cod_cliente=vt.cod_clienteFK )as ci_cliente,
(Select whapp from cliente c where c.cod_cliente=vt.cod_clienteFK )as whapp
 from venta vt
 inner join detalleentregador_local del on del.cod_localFK = vt.cod_local
where vt.TipoVenta = 'CONTADO' and vt.estado_entrega = 'NO' and (SELECT count(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 and del.cod_cobradorFK = '$cod_cobradorFK' ".$condicioncliente.$condicionfecha."  limit 100";
$pagina = ""; 

// echo $sql;
// exit;
 

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$zona = utf8_encode($valor['zona']); 
$whapp = utf8_encode($valor['whapp']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$cod_venta = utf8_encode($valor['cod_venta']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$local = utf8_encode($valor['local']);          
$producto=buscarDetalleProductoVenta($cod_venta);


	  $pagina.="<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0' >
<tr id='tbSelecRegistro' onclick='obtenerDatosEntregaContado(this)' >
<td id='' style='width:5%; background-color: #efeded;color:red'>".$cod_venta."</td>
<td id='' style='display:none' class='td_search'></td>
<td id='' style='width:100%;'>
<table style='width:100%' class='tableRegistroSearchC'>
<tr>
<td id='' style='width:75%;' class='td_search'>".$nombre_persona."</td>
<td style='display:none' class='td_search' id=''>".$local."</td>
<td  style='width:25%;'class='td_search' >". $ci_cliente."</td>
</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td id='' style='width:100%;' class='td_search'>".$producto."</td>

</tr>
</table>
<table style='width:100%' class='tableRegistroSearchD'>
<tr>
<td  style='width:33%;'class='td_search' id='' >Z:&nbsp".$zona."</td>
<td  style='width:33%;' class='td_search' id=''>DIRECCIÓN:&nbsp".$direccion."</td>
<td  style='width:33%;' class='td_search'>NRO:&nbsp".$whapp."</td>
</tr>
</table>
</td>


<td style='display:none' class='td_search' id='td_datos_4' >".$zona."</td>
<td style='display:none' class='td_search' id='td_datos_6' >".$direccion."</td>
<td style='display:none' class='td_search' id='td_datos_25' >".$local."</td>
<td id='td_datos_3' style='display:none' class='td_search' >".$nombre_persona."</td>
<td id='td_datos_26' style='display:none' class='td_search' >".$producto."</td>
<td id='td_id' style='display:none' class='td_search' >".$cod_venta."</td>
</tr>
</table>";

}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}
function  buscardetallespreciossolicituddirecto($buscar,$cuota,$conDescuento= '')
{
$mysqli=conectar_al_servidor();

$sql= "select IFNULL(precio,0) as precio,Porcentaje,descripcion,cod_producto,comision,Cuota,descuento
 from  detalle_listado_precio_producto 
where cod_producto='$buscar' and Cuota='$cuota' limit 1  ";
// echo($sql);
// exit;

 $pagina="";  
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$pagina = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$Porcentaje = utf8_encode($valor['Porcentaje']); 
$descripcion = utf8_encode($valor['descripcion']);                     
$comision = utf8_encode($valor['comision']);          
$cuota = utf8_encode($valor['Cuota']);
if ($conDescuento == 'true') {
	$precio = intval($valor['descuento']);
	$cuota= intval($cuota);
	$precio= $precio * $cuota;
} else {
	$precio = utf8_encode($valor['precio']);
}


$pagina=number_format($precio,'0',',','.');



}
}

return $pagina;
}


function buscarFotosGaleria($codigo)
{
$mysqli=conectar_al_servidor();



$sql= "select  cl.cod_cliente ,foto1 , foto2
 from   cliente cl  
where  cod_cliente='".$codigo."' ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);


// echo($sql);
// exit;

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$cod_cliente = utf8_encode($valor['cod_cliente']); 
$foto1 = ($valor['foto1']);  
$foto2 = ($valor['foto2']);         

		$pagina .= buscarFotosGaleriaDetalle($cod_cliente);
		 


}
}

 
$informacion =array("1" => "exito","2" => $pagina ,"3" => $foto1 ,"4" => $foto2);
echo json_encode($informacion);	
exit;
}

function buscarFotosGaleriaDetalle($codigo)
{
$mysqli=conectar_al_servidor();



$sql= "select  * from   fotos_cliente cl   where  cod_clienteFK='".$codigo."' ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);


// echo($sql);
// exit;

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$url = utf8_encode($valor['url']); 
$descripcion = utf8_encode($valor['descripcion']);  


$pagina .= " 
<table class='tableabm'>
<tr>
<td style='width:100%;'>
<center>
<div style=' width: 90%; height: 90%;' class='imgFotoCi'>
<p class='pTituloRepor' style='width:97%'>".$descripcion."</p>
 <IMG style='width: 100%;' SRC=".$url."  >
</div>
</center>
</td>
</tr>
</table>
		 
"; 

}
}

 return $pagina;
}


function buscarDocumentosClienteSolicitud($codigo)
{
$mysqli=conectar_al_servidor();



$sql= "select  descripcion,fecha,url
 from   archivos_cliente
where  cod_clienteFK='".$codigo."' ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);


// echo($sql);
// exit;

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$descripcion = utf8_encode($valor['descripcion']); 
$fecha = utf8_encode($valor['fecha']); 
$url = utf8_encode($valor['url']); 

$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";


        
// $styleName=CargarStyleTable($styleName);
		$pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td id='td_datos_2' style='width:50%' >".$descripcion."</td>
<td id='td_datos_3' style='width:25%'>".$fecha."</td>
<td id='td_datos_4' style='width:25%;text-align:center'>".$ver."</td>
</tr>
</table>
";
		 


}
}

 
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}
function actualizar_estado($idSolicitudCredito,$user,$estado,$observacion)
{

$mysqli=conectar_al_servidor(); 

 $consulta2="UPDATE solicitudcredito set estado = '$estado',observacion = '$observacion' , cod_usuarioFK=$user  where idSolicitudCredito=? ";	

$stmt2 = $mysqli->prepare($consulta2);
$ss='s';
$stmt2->bind_param($ss,$idSolicitudCredito);
	

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

function buscar_cobrador_solicitud()
{
	

		$sql= "SELECT pra.nombre_persona, sc.cod_cobradorFK 
from persona pra INNER JOIN solicitudcredito sc 
ON pra.cod_persona = sc.cod_cobradorFK 
group by nombre_persona order by nombre_persona";


	$mysqli=conectar_al_servidor();
	
		
		 $pagina= "<option  value='' >SELECCIONAR</option>";   
   
   
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
		   $nombre=utf8_encode($valor['nombre_persona']);
		   $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
		   
			if($nombre != ''){
				$pagina.="<option  value='$cod_cobradorFK' >".$nombre."</option>";
			}
		         
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function editarmasreferencias($idreferenciacliente,$telefono,$direccion,$referencia,$tipo,$obs)
{

if($idreferenciacliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();
$consulta="UPDATE referenciascliente SET telef = '$telefono', direccion = '$direccion', referencias='$referencia', tipo='$tipo', obs = '$obs' WHERE idreferenciascliente = '$idreferenciacliente'";

$stmt1 = $mysqli->prepare($consulta);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function eliminarmasreferencia($idreferenciacliente)
{

if($idreferenciacliente =="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 




$consulta="DELETE FROM referenciascliente WHERE idreferenciascliente = '$idreferenciacliente'";

$stmt1 = $mysqli->prepare($consulta);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


ObtenerDatos($operacion);

?>