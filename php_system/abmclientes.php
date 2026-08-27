<?php
require("conexion.php");
include("verificar_navegador.php");
include("subir_foto_base64.php");
include("quitarseparadormiles.php");
include("classTable.php");
include("move_uploaded_file.php");
include("calcularintereses.php");
include("buscar_nivel.php");

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


$sms=$_POST['sms'];
$sms = utf8_decode($sms);

$FechaNac=$_POST['FechaNac'];
$FechaNac = utf8_decode($FechaNac);
$profesion=$_POST['profesion'];
$profesion = utf8_decode($profesion);
$tipo_empleado=isset($_POST['tipo_empleado']) ? strtoupper(trim($_POST['tipo_empleado'])) : '';
$cargo=isset($_POST['cargo']) ? utf8_decode(trim($_POST['cargo'])) : '';

if(!in_array($tipo_empleado,array('','PUBLICO','PRIVADO'),true)){
$informacion =array("1" => "error", "2" => "Tipo de empleado invalido");
echo json_encode($informacion);
exit;
}
if(strlen($cargo)>120){
$informacion =array("1" => "error", "2" => "El cargo no puede superar 120 caracteres");
echo json_encode($informacion);
exit;
}

$cod_persona=$_POST['cod_persona'];
$cod_persona = utf8_decode($cod_persona);
$nombre_persona=$_POST['nombre_persona'];
$nombre_persona = utf8_decode($nombre_persona);
$apellido_persona=$_POST['apellido_persona'];
$apellido_persona = utf8_decode($apellido_persona);
$direccion=$_POST['direccion'];
$direccion = utf8_decode($direccion);
$telefono=$_POST['telefono'];
$telefono = utf8_decode($telefono);
$email=$_POST['email'];
$email = utf8_decode($email);
$cod_cliente=$cod_persona;
$rut_cliente=$_POST['rut_cliente'];
$rut_cliente = utf8_decode($rut_cliente);
$ci_cliente=$_POST['ci_cliente'];
$ci_cliente = utf8_decode($ci_cliente);
$Calificacion=$_POST['Calificacion'];
$Calificacion = utf8_decode($Calificacion);
$whapp=$_POST['whapp'];
$whapp = utf8_decode($whapp);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
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
$accesocredito=$_POST['accesocredito'];
$accesocredito = utf8_decode($accesocredito);
$nombremadre=$_POST['nombremadre'];
$nombremadre = utf8_decode($nombremadre);
$nombrepadre=$_POST['nombrepadre'];
$nombrepadre = utf8_decode($nombrepadre);
$informacion_extra=isset($_POST['informacion_extra']) ? $_POST['informacion_extra'] : "";
$informacion_extra = utf8_decode($informacion_extra);
$tipo_vivienda=$_POST['tipo_vivienda'];
$tipo_vivienda = utf8_decode($tipo_vivienda);
$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);
$tipo_persona_equifax=isset($_POST['tipo_persona_equifax']) ? strtoupper(trim($_POST['tipo_persona_equifax'])) : 'SIN_CLASIFICAR';

abm($tipo_persona_equifax,$profesion,$tipo_empleado,$cargo,$tipo_cliente,$nombremadre,$nombrepadre,$informacion_extra,$tipo_vivienda,$FechaNac,$sms,$accesocredito,$idzonaFk,$whapp,$estado,$cod_persona,$nombre_persona,$apellido_persona,$direccion,$telefono,$email,$cod_cliente,$rut_cliente,$ci_cliente,$Calificacion,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$operacion);

}

if($operacion=="buscarDatalis")
{
	
	buscarDatalis();

}


	if ($operacion == "ClientesNuevos") {
		
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrodocumento = $_POST['nrodocumento'];
		$nrodocumento = utf8_decode($nrodocumento);
		
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$cantidad_ventas = $_POST['cantidad_ventas'];
		$cantidad_ventas = utf8_decode($cantidad_ventas);
		$controlagrupacionclientesnuevos = $_POST['controlagrupacionclientesnuevos'];
		$controlagrupacionclientesnuevos = utf8_decode($controlagrupacionclientesnuevos);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		
	
		if ($cod_local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$cod_local = buscarlocaluser($user);
			}
		}
		ClientesNuevos($fecha1, $fecha2, $cliente, $nrodocumento, $cod_local, $cantidad_ventas, $controlagrupacionclientesnuevos, $tipo_venta, $formato);
	}
	
	
	if ($operacion == "masClientesNuevos") {
 
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrodocumento = $_POST['nrodocumento'];
		$nrodocumento = utf8_decode($nrodocumento);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$registrocargado = $_POST['registrocargado'];
		$registrocargado = utf8_decode($registrocargado);
		$cantidad_ventas = $_POST['cantidad_ventas'];
		$cantidad_ventas = utf8_decode($cantidad_ventas);
		$controlagrupacionclientesnuevos = $_POST['controlagrupacionclientesnuevos'];
		$controlagrupacionclientesnuevos = utf8_decode($controlagrupacionclientesnuevos);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		
		if ($cod_local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$cod_local = buscarlocaluser($user);
			}
		}
		masClientesNuevos($fecha1, $fecha2, $cliente, $nrodocumento, $cod_local,$registrocargado,$cantidad_ventas,$controlagrupacionclientesnuevos,$tipo_venta,$formato);
	}

 
if($operacion=="buscarSiExisteCliente")
{
	
	$documento = $_POST['documento'];
		$documento = utf8_decode($documento);
	
	buscarSiExisteCliente($documento);

}

if($operacion=="buscarDetallesInformeGeneralCuentasCliente")
{
	$cod_cliente=$_POST['cod_cliente'];
$cod_cliente = utf8_decode($cod_cliente);


$tipo_cuenta = '';
if (isset($_POST['tipo_cuenta'])) {
    $tipo_cuenta = $_POST['tipo_cuenta'];
    $tipo_cuenta = utf8_decode($tipo_cuenta);
}

$tipo_venta = '';
if(isset($_POST['tipo_venta'])){
	$tipo_venta=$_POST['tipo_venta'];
$tipo_venta = utf8_decode($tipo_venta);
}


	buscarDetallesInformeGeneralCuentasCliente($cod_cliente,$tipo_cuenta,$tipo_venta);

}

if ($operacion == "cargar_detalle_clientes_cumple") {
		$cod_cliente = $_POST['cod_cliente'];
		$cod_cliente = utf8_decode($cod_cliente);
		$descripcion = $_POST['descripcion'];
		$descripcion = utf8_decode($descripcion);
		$estado_cliente = $_POST['estado_cliente'];
		$estado_cliente = utf8_decode($estado_cliente);
		
		
		
		cargar_detalle_clientes_cumple($cod_cliente,$descripcion,$estado_cliente);
}

if ($operacion == "buscarCargarDetalleCliente") {
		$cod_cliente = $_POST['cod_cliente_cumple'];
		$cod_cliente = utf8_decode($cod_cliente);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";

		buscarCargarDetalleCliente($cod_cliente,$formato);
}
	

if($operacion=="NuevoDescripcionFoto")
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

	NuevoDescripcionFoto($descripcion);

}

if($operacion=="NuevoDescripcionUbicacion")
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

	NuevoDescripcionUbicacion($descripcion);

}

   if($operacion=="buscarFrmInformeGeneralCuentasCliente"){
 	$Cliente=$_POST["Cliente"];
 	$Cliente=utf8_decode($Cliente);
	
	
 	 buscarFrmInformeGeneralCuentasCliente($Cliente);
 }

if($operacion=="NuevoDescripcionArchivoCliente")
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

	NuevoDescripcionArchivoCliente($descripcion);

}

if($operacion=="NuevoMotivoMovimientoStock")
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

	NuevoMotivoMovimientoStock($descripcion);

}

if($operacion=="buscaroptionDescripcionFoto")
{

	buscaroptionDescripcionFoto();

}

if($operacion=="buscaroptionDescripcionUbicacion")
{

	buscaroptionDescripcionUbicacion();

}
if($operacion=="buscaroptionDescripcionArchivoCliente")
{

	buscaroptionDescripcionArchivoCliente();

}

if($operacion=="buscaroptionMotivoMovimiento")
{

	buscaroptionMotivoMovimiento();

}

if($operacion=="buscarDocumentosCargaArchivo")
{
$idcontrato=$_POST['idcliente'];
$idcontrato = utf8_decode($idcontrato);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
buscarDocumentosCargaArchivo($idcontrato,$formato);
}

if($operacion=="insertarArchivo")
{
$idclientefk=$_POST['idclientefk'];
$idclientefk = utf8_decode($idclientefk);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$archivo=$_POST['archivo'];
$archivo = utf8_decode($archivo);
$ext=$_POST['ext'];
$ext = utf8_decode($ext);


insertarArchivo($idclientefk,$ext,$archivo,$descripcion,$fecha);
}

if($operacion=="eliminardocumentoarchivocliente")
{
$idcontrato=$_POST['idcliente'];
$idcontrato = utf8_decode($idcontrato);
$iddocumento=$_POST['iddocumento'];
$iddocumento = utf8_decode($iddocumento);
$urldocumento=$_POST['urldocumento'];
$urldocumento = utf8_decode($urldocumento);
EliminarDocumentoArchivoCliente($idcontrato,$iddocumento,$urldocumento);

}
 
 
if($operacion=="buscarDocumentosGaleriaFoto"){
$idcliente=$_POST['idcliente'];
$idcliente = utf8_decode($idcliente);

$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarDocumentosGaleriaFoto($idcliente,$descripcion,$formato);
}
 
 if($operacion=="addmasreferencias"){
 	$totalCargado=$_POST["totalCargado"];
 	$totalCargado=utf8_decode($totalCargado);
	$idcliente=$_POST["idcliente"];
 	$idcliente=utf8_decode($idcliente);
 	addmasreferencias($totalCargado,$idcliente);
 }
 
 if($operacion=="addmasreferenciascom"){
 	$totalCargado=$_POST["totalCargado"];
 	$totalCargado=utf8_decode($totalCargado);
	$idcliente=$_POST["idcliente"];
 	$idcliente=utf8_decode($idcliente);
 	addmasreferenciascom($totalCargado,$idcliente);
 }
 
 if($operacion=="buscarDocumentosPrincipal"){
$idcliente=$_POST['idcliente'];
$idcliente = utf8_decode($idcliente);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarDocumentosPrincipal($idcliente,$formato);
}

 if($operacion=="buscar"){
	 

 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$documento=$_POST["documento"];
 	$documento=utf8_decode($documento);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$accesocredito=$_POST["accesocredito"];
 	$accesocredito=utf8_decode($accesocredito);
	$calificacion=$_POST["calificacion"];
 	$calificacion=utf8_decode($calificacion);
	$tipo_cliente=$_POST["tipo_cliente"];
 	$tipo_cliente=utf8_decode($tipo_cliente);
	$faja=$_POST["faja"];
 	$faja=utf8_decode($faja);
	
	$profesion=$_POST["profesion"];
 	$profesion=utf8_decode($profesion);
 	BuscarRegistro($profesion,$tipo_cliente,$calificacion,$codigo,$documento,$cliente,$zona,$estado,$accesocredito,$faja);
 }
 if($operacion=="buscarmas"){
	 

 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$documento=$_POST["documento"];
 	$documento=utf8_decode($documento);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$accesocredito=$_POST["accesocredito"];
 	$accesocredito=utf8_decode($accesocredito);
	$registrocargado=$_POST["registrocargado"];
 	$registrocargado=utf8_decode($registrocargado);
		$calificacion=$_POST["calificacion"];
 	$calificacion=utf8_decode($calificacion);
	$tipo_cliente=$_POST["tipo_cliente"];
 	$tipo_cliente=utf8_decode($tipo_cliente);
	$faja=$_POST["faja"];
 	$faja=utf8_decode($faja);
	$profesion=$_POST["profesion"];
 	$profesion=utf8_decode($profesion);
 	BuscarMasRegistro($profesion,$faja,$tipo_cliente,$calificacion,$codigo,$documento,$cliente,$zona,$estado,$accesocredito,$registrocargado);

 }

if($operacion=="buscar_informe_ubicacion_fotos_cliente"){
	 

 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$usuario=$_POST["usuario"];
 	$usuario=utf8_decode($usuario);
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : '';
	
	
 	buscar_informe_ubicacion_fotos_cliente($fecha1,$fecha2,$cod_localFK,$cliente,$usuario,$fecha,$formato);
 }
 
 if($operacion=="buscar_informe_ubicaciones_cliente"){
	 

 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$usuario=$_POST["usuario"];
 	$usuario=utf8_decode($usuario);
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : '';
	
	
 	buscar_informe_ubicaciones_cliente($fecha1,$fecha2,$cod_localFK,$cliente,$usuario,$fecha,$formato);
 }

if($operacion=="addImagenes")
{
$idclientefk=$_POST['idclientefk'];
$idclientefk = utf8_decode($idclientefk);
addImagenes($idclientefk);
}

if($operacion=="buscarDocumentos")
{
$idcontrato=$_POST['idcliente'];
$idcontrato = utf8_decode($idcontrato);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarDocumentos($idcontrato,$formato);
}

if($operacion=="eliminardocumento")
{
$idcontrato=$_POST['idcliente'];
$idcontrato = utf8_decode($idcontrato);
$iddocumento=$_POST['iddocumento'];
$iddocumento = utf8_decode($iddocumento);
$urldocumento=$_POST['urldocumento'];
$urldocumento = utf8_decode($urldocumento);
EliminarDocumento($idcontrato,$iddocumento,$urldocumento);

}

 if($operacion=="buscarmasreferencias"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : "";
	buscarmasreferencias($buscar,$formato);
 }
 if($operacion=="buscarmasreferenciascom"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : "";
	buscarmasreferenciascom($buscar,$formato);
 }
 if($operacion=="buscarvista"){
	 
	
 	$ruc=$_POST["ruc"];
 	$ruc=utf8_decode($ruc);
	$documento=$_POST["documento"];
 	$documento=utf8_decode($documento);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$telef=$_POST["telef"];
 	$telef=utf8_decode($telef);
	$buscar_general=isset($_POST["buscar_general"]) ? utf8_decode($_POST["buscar_general"]) : "";
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : "";
	BuscarRegistroEnVista($ruc,$documento,$cliente,$telef,$formato,$buscar_general);
 }
 if($operacion=="buscarporci"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : "";
	buscarporci($buscar,$formato);
 }
 if($operacion=="buscarmensajes"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarmensajes($buscar);
 }

 if($operacion=="buscarcumpleCliente"){
 	$Fecha1=$_POST["Fecha1"];
 	$Fecha1=utf8_decode($Fecha1);
	
	$Fecha2=$_POST["Fecha2"];
 	$Fecha2=utf8_decode($Fecha2);
	
	$Zona=$_POST["Zona"];
 	$Zona=utf8_decode($Zona);
	
	
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : "";
	 buscarcumpleCliente($local,$Fecha1,$Fecha2,$Zona,$estado,$formato);
 }
 
 
  if($operacion=="buscar_nuevos_clientes"){
 	
	
	$nombre=$_POST["nombre"];
 	$nombre=utf8_decode($nombre);
	
	$estado_asignacion=$_POST["estado_asignacion"];
 	$estado_asignacion=utf8_decode($estado_asignacion);
	
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	
	
 	 buscar_nuevos_clientes($nombre,$estado_asignacion,$zona);
 }
 
 
if($operacion=="cargarcsv")
{
	cargarcsv();
}


 if($operacion=="buscarcuentaImpago"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$local=$_POST["local"];
 	$local=utf8_decode($local);	
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$cobrador=$_POST["cobrador"];
 	$cobrador=utf8_decode($cobrador);
	$buscar_general=isset($_POST["buscar_general"]) ? utf8_decode($_POST["buscar_general"]) : '';
	
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$formato=isset($_POST["formato"]) ? utf8_decode($_POST["formato"]) : "";
	 buscarcuentaImpago($tipo,$fecha1,$fecha2,$local,$zona,$cliente,$cobrador,$formato,$buscar_general);
 }
 
 
 
 
if($operacion=="buscarGeolocalizacion")
{
$idcontrato=$_POST['idcliente'];
$idcontrato = utf8_decode($idcontrato);
buscarGeolocalizacion($idcontrato);
}

if($operacion=="buscarMapaClientes")
{
	$nombre = isset($_POST['nombre']) ? utf8_decode(trim($_POST['nombre'])) : "";
	$documento = isset($_POST['documento']) ? utf8_decode(trim($_POST['documento'])) : "";
	$cod_local = isset($_POST['cod_local']) ? utf8_decode(trim($_POST['cod_local'])) : "";
	$cod_vendedor = isset($_POST['cod_vendedor']) ? trim($_POST['cod_vendedor']) : "";
	$cod_cobrador = isset($_POST['cod_cobrador']) ? trim($_POST['cod_cobrador']) : "";
	$fecha_desde = isset($_POST['fecha_desde']) ? utf8_decode(trim($_POST['fecha_desde'])) : "";
	$fecha_hasta = isset($_POST['fecha_hasta']) ? utf8_decode(trim($_POST['fecha_hasta'])) : "";
	$modo_mapa = isset($_POST['modo_mapa']) ? strtolower(trim($_POST['modo_mapa'])) : "ventas";
	if (!in_array($modo_mapa, array("ventas", "morosos", "cobros"), true)) {
		$modo_mapa = "ventas";
	}

	buscarMapaClientes(
		$nombre,
		$documento,
		$cod_local,
		$fecha_desde,
		$fecha_hasta,
		$modo_mapa,
		$cod_vendedor,
		$cod_cobrador
	);
}


if($operacion=="InsertarGeo")
{
$cod_persona=$_POST['cod_persona'];
$cod_persona = utf8_decode($cod_persona);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$latitudGeo=$_POST['latitudGeo'];
$latitudGeo = utf8_decode($latitudGeo);
$longitudGeo=$_POST['longitudGeo'];
$longitudGeo = utf8_decode($longitudGeo);

InsertarGeo($cod_persona,$fecha,$descripcion,$latitudGeo,$longitudGeo);

}



if($operacion=="EliminarGeo")
{
$CodGeoLocalizacion=$_POST['CodGeoLocalizacion'];
$CodGeoLocalizacion = utf8_decode($CodGeoLocalizacion);

EliminarGeo($CodGeoLocalizacion);

}

if($operacion=="addEquifax")
{
$idclientefk=$_POST['idclientefk'];
$idclientefk = utf8_decode($idclientefk);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$archivo=isset($_POST['archivo']) ? $_POST['archivo'] : "";
$archivo = utf8_decode($archivo);
$ext=isset($_POST['ext']) ? $_POST['ext'] : "";
$ext = utf8_decode($ext);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$cod_solicitud_credito=$_POST['cod_solicitud_credito'];
$cod_solicitud_credito = utf8_decode($cod_solicitud_credito);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);

if($archivo=="" || $ext==""){
	$informacion = array("1" => "error", "2" => "FALTO SELECCIONAR EL ARCHIVO PDF DEL INFORCONF");
	echo json_encode($informacion);
	exit;
}
 
addEquifax($idclientefk,$fecha,$archivo,$ext,$descripcion,$cod_solicitud_credito,$estado);
}



 
   if($operacion=="FinalizarSolicitudEquifax"){
 	$cod_solicitud_credito=$_POST["cod_solicitud_credito"];
 	$cod_solicitud_credito=utf8_decode($cod_solicitud_credito); 
	
 	 FinalizarSolicitudEquifax($cod_solicitud_credito);
 }
 

}





function FinalizarSolicitudEquifax($cod_solicitud_credito)
{
 
$mysqli=conectar_al_servidor(); 
 
$consulta1=" update solicitudcredito set esteadoInforconf='FINALIZADO' where idSolicitudCredito='".$cod_solicitud_credito."' ";
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


 
function addEquifax($idclientefk,$fecha,$archivo,$ext,$descripcion,$cod_solicitud_credito,$estado){
  
insertarPDF($idclientefk,$ext,$archivo,$descripcion,$fecha,$estado,$cod_solicitud_credito);

EditarEstadoSolicitudCredito($cod_solicitud_credito,$estado);
  
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}



function insertarPDF($cod_detalle,$exte,$archivo,$descripcion,$fecha,$estado,$cod_solicitud_credito)
{
	$documento=substr($archivo, strpos($archivo, ",") + 1);;
	$documento = base64_decode($documento);
	
	$id_documento=rand(10,5000);		  
	$donde="../archivospdf/";
	$id_documento=$cod_detalle;
	
	$id_f=subir_imagen_base64($donde,$documento,$id_documento,$exte);
	$ruta="/GoodVentaElectroCasaMaric/archivospdf/".$cod_detalle.$id_f.'.'.$exte;
	
	CargaPDF($ruta,$cod_detalle,$descripcion,$fecha,$estado,$cod_solicitud_credito);
}


function CargaPDF($Urldoc,$idcontratofk,$descripcion,$fecha,$estado,$cod_solicitud_credito){
	$mysqli=conectar_al_servidor();
	$consulta="INSERT INTO archivos_cliente (url,cod_clienteFK,descripcion,fecha,calificacion,cod_solicitud_creditoFK) VALUES ('$Urldoc','$idcontratofk','INFORCONF',NOW(),'$estado','$cod_solicitud_credito') ";
	
$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
   echo "Error";
}
	
}

 


function EditarEstadoSolicitudCredito($cod_solicitud_credito,$estado)
{
 
$mysqli=conectar_al_servidor(); 
 
$consulta1=" update solicitudcredito set esteadoInforconf='FINALIZADO' ,calificacion_inforconf='".$estado."' where idSolicitudCredito='".$cod_solicitud_credito."' ";
$stmt1 = $mysqli->prepare($consulta1); 
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

}



function vincularParametrosMapaClientes($stmt, $tipos, &$parametros)
{
	if ($tipos === "" || count($parametros) === 0) {
		return;
	}

	$argumentos = array();
	$argumentos[] = &$tipos;
	foreach ($parametros as $indice => $valor) {
		$argumentos[] = &$parametros[$indice];
	}
	call_user_func_array(array($stmt, "bind_param"), $argumentos);
}

function textoUtf8MapaClientes($valor)
{
	return utf8_encode((string)$valor);
}

function obtenerCatalogosMapaClientes($mysqli)
{
	$catalogos = array(
		"locales" => array(),
		"vendedores" => array(),
		"cobradores" => array()
	);

	$resultado = $mysqli->query("SELECT cod_local,Nombre FROM local WHERE estado='Activo' ORDER BY Nombre ASC");
	if ($resultado) {
		while ($fila = mysqli_fetch_assoc($resultado)) {
			$catalogos["locales"][] = array(
				"codigo" => (int)$fila["cod_local"],
				"nombre" => textoUtf8MapaClientes($fila["Nombre"])
			);
		}
	}

	$resultado = $mysqli->query("SELECT idvendedor,nombre FROM vendedor WHERE estado='Activo' ORDER BY nombre ASC");
	if ($resultado) {
		while ($fila = mysqli_fetch_assoc($resultado)) {
			$catalogos["vendedores"][] = array(
				"codigo" => (int)$fila["idvendedor"],
				"nombre" => textoUtf8MapaClientes(trim($fila["nombre"]))
			);
		}
	}

	$sql_cobradores = "SELECT pg.cod_cobradorFK AS cod_cobrador,
		COALESCE(
			NULLIF(TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona)),''),
			CONCAT('COBRADOR #',pg.cod_cobradorFK)
		) AS nombre
		FROM pago pg
		INNER JOIN venta vt ON vt.cod_venta=pg.cod_venta_fk
		INNER JOIN (
			SELECT DISTINCT cod_clienteFk
			FROM ubicaciones
			WHERE lat BETWEEN -90 AND 90
			  AND lot BETWEEN -180 AND 180
			  AND lat<>0
			  AND lot<>0
		) clientes_ubicados ON clientes_ubicados.cod_clienteFk=vt.cod_clienteFK
		LEFT JOIN persona p ON p.cod_persona=pg.cod_cobradorFK
		WHERE pg.Monto>0
		  AND COALESCE(pg.anulado,0)<>1
		GROUP BY pg.cod_cobradorFK,p.nombre_persona,p.apellido_persona
		ORDER BY nombre ASC";
	$resultado = $mysqli->query($sql_cobradores);
	if ($resultado) {
		while ($fila = mysqli_fetch_assoc($resultado)) {
			$catalogos["cobradores"][] = array(
				"codigo" => (int)$fila["cod_cobrador"],
				"nombre" => textoUtf8MapaClientes(trim($fila["nombre"]))
			);
		}
	}

	return $catalogos;
}

function responderMapaClientes($mysqli, $registros)
{
	$catalogos = obtenerCatalogosMapaClientes($mysqli);
	mysqli_close($mysqli);
	$informacion = array(
		"1" => "exito",
		"2" => $registros,
		"3" => $catalogos["locales"],
		"4" => count($registros),
		"5" => $catalogos["vendedores"],
		"6" => $catalogos["cobradores"]
	);
	echo json_encode($informacion);
	exit;
}

function buscarMapaCobrosRealizados(
	$mysqli,
	$nombre,
	$documento,
	$cod_local,
	$fecha_desde,
	$fecha_hasta,
	$cod_cobrador
) {
	$condiciones = array(
		"pg.Monto>0",
		"COALESCE(pg.anulado,0)<>1",
		"u.lat BETWEEN -90 AND 90",
		"u.lot BETWEEN -180 AND 180",
		"u.lat<>0",
		"u.lot<>0"
	);
	$parametros = array();
	$tipos = "";

	if ($nombre !== "") {
		$condiciones[] = "CONCAT(pcliente.nombre_persona,' ',pcliente.apellido_persona) LIKE ?";
		$parametros[] = "%".$nombre."%";
		$tipos .= "s";
	}
	if ($documento !== "") {
		$documento = str_replace(array(".", "-", " "), "", $documento);
		$condiciones[] = "REPLACE(REPLACE(REPLACE(IFNULL(c.ci_cliente,''),'.',''),'-',''),' ','') LIKE ?";
		$parametros[] = "%".$documento."%";
		$tipos .= "s";
	}
	if ($cod_local !== "" && ctype_digit((string)$cod_local)) {
		$condiciones[] = "vt.cod_local=?";
		$parametros[] = (int)$cod_local;
		$tipos .= "i";
	}
	if ($cod_cobrador !== "" && ctype_digit((string)$cod_cobrador)) {
		$condiciones[] = "pg.cod_cobradorFK=?";
		$parametros[] = (int)$cod_cobrador;
		$tipos .= "i";
	}
	if ($fecha_desde !== "" && preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_desde)) {
		$condiciones[] = "pg.Fecha>=?";
		$parametros[] = $fecha_desde;
		$tipos .= "s";
	}
	if ($fecha_hasta !== "" && preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_hasta)) {
		$condiciones[] = "pg.Fecha<=?";
		$parametros[] = $fecha_hasta;
		$tipos .= "s";
	}

	$sql = "SELECT
			vt.cod_clienteFK,
			TRIM(CONCAT_WS(' ',pcliente.nombre_persona,pcliente.apellido_persona)) AS cliente,
			IFNULL(c.ci_cliente,'') AS documento,
			IFNULL(pcliente.telefono,'') AS telefono,
			u.lat,
			u.lot,
			IFNULL(u.descripcion,'') AS descripcion,
			u.fecha AS fecha_ubicacion,
			MAX(COALESCE(pg.hora,CAST(pg.Fecha AS DATETIME))) AS fecha_cobro,
			COUNT(DISTINCT pg.idPago) AS cantidad_cobros,
			SUM(pg.Monto) AS Monto,
			GROUP_CONCAT(
				DISTINCT COALESCE(NULLIF(pg.Tipo,''),'SIN REGISTRO')
				ORDER BY pg.Tipo SEPARATOR ', '
			) AS tipo_cobro,
			GROUP_CONCAT(
				DISTINCT COALESCE(NULLIF(tp.nombre,''),NULLIF(pg.tipopago,''),'SIN REGISTRO')
				ORDER BY COALESCE(NULLIF(tp.nombre,''),NULLIF(pg.tipopago,''),'SIN REGISTRO')
				SEPARATOR ', '
			) AS metodo_cobro,
			GROUP_CONCAT(
				DISTINCT COALESCE(
					NULLIF(TRIM(CONCAT_WS(' ',pcobrador.nombre_persona,pcobrador.apellido_persona)),''),
					CONCAT('COBRADOR #',pg.cod_cobradorFK)
				)
				ORDER BY COALESCE(
					NULLIF(TRIM(CONCAT_WS(' ',pcobrador.nombre_persona,pcobrador.apellido_persona)),''),
					CONCAT('COBRADOR #',pg.cod_cobradorFK)
				)
				SEPARATOR ', '
			) AS cobrador,
			GROUP_CONCAT(
				DISTINCT IFNULL(l.Nombre,'SIN LOCAL')
				ORDER BY IFNULL(l.Nombre,'SIN LOCAL') SEPARATOR ', '
			) AS local
		FROM pago pg
		INNER JOIN venta vt ON vt.cod_venta=pg.cod_venta_fk
		INNER JOIN cliente c ON c.cod_cliente=vt.cod_clienteFK
		INNER JOIN persona pcliente ON pcliente.cod_persona=c.cod_cliente
		INNER JOIN (
			SELECT cod_clienteFk,MAX(idubicaciones) AS idubicaciones
			FROM ubicaciones
			WHERE lat BETWEEN -90 AND 90
			  AND lot BETWEEN -180 AND 180
			  AND lat<>0
			  AND lot<>0
			GROUP BY cod_clienteFk
		) ultima_ubicacion ON ultima_ubicacion.cod_clienteFk=vt.cod_clienteFK
		INNER JOIN ubicaciones u ON u.idubicaciones=ultima_ubicacion.idubicaciones
		LEFT JOIN persona pcobrador ON pcobrador.cod_persona=pg.cod_cobradorFK
		LEFT JOIN tipopago tp ON tp.cod_tipoPago=pg.cod_tipoPagoFK
		LEFT JOIN local l ON l.cod_local=vt.cod_local
		WHERE ".implode(" AND ", $condiciones)."
		GROUP BY
			vt.cod_clienteFK,
			pcliente.nombre_persona,
			pcliente.apellido_persona,
			c.ci_cliente,
			pcliente.telefono,
			u.lat,
			u.lot,
			u.descripcion,
			u.fecha
		ORDER BY fecha_cobro DESC,cliente ASC";

	$stmt = $mysqli->prepare($sql);
	if (!$stmt) {
		echo json_encode(array("1" => "error", "2" => "No se pudo preparar la consulta de cobros"));
		mysqli_close($mysqli);
		exit;
	}
	vincularParametrosMapaClientes($stmt, $tipos, $parametros);
	if (!$stmt->execute()) {
		echo json_encode(array("1" => "error", "2" => "No se pudieron consultar los cobros realizados"));
		$stmt->close();
		mysqli_close($mysqli);
		exit;
	}

	$resultado = $stmt->get_result();
	$cobros = array();
	while ($fila = mysqli_fetch_assoc($resultado)) {
		$cobros[] = array(
			"id_cliente" => (int)$fila["cod_clienteFK"],
			"cliente" => textoUtf8MapaClientes(trim($fila["cliente"])),
			"documento" => textoUtf8MapaClientes($fila["documento"]),
			"telefono" => textoUtf8MapaClientes($fila["telefono"]),
			"latitud" => (float)$fila["lat"],
			"longitud" => (float)$fila["lot"],
			"descripcion" => textoUtf8MapaClientes($fila["descripcion"]),
			"fecha_ubicacion" => $fila["fecha_ubicacion"],
			"ultima_compra" => "",
			"cod_local" => 0,
			"local" => textoUtf8MapaClientes($fila["local"]),
			"cuotas_vencidas" => 0,
			"total_vencido" => 0,
			"dias_atraso" => 0,
			"primer_vencimiento" => "",
			"id_pago" => 0,
			"cantidad_cobros" => (int)$fila["cantidad_cobros"],
			"fecha_cobro" => $fila["fecha_cobro"],
			"monto_cobro" => (float)$fila["Monto"],
			"tipo_cobro" => textoUtf8MapaClientes($fila["tipo_cobro"]),
			"metodo_cobro" => textoUtf8MapaClientes($fila["metodo_cobro"]),
			"cobrador" => textoUtf8MapaClientes(trim($fila["cobrador"])),
			"venta_codigo" => 0,
			"factura" => ""
		);
	}
	$stmt->close();
	responderMapaClientes($mysqli, $cobros);
}

function buscarMapaClientes(
	$nombre,
	$documento,
	$cod_local,
	$fecha_desde,
	$fecha_hasta,
	$modo_mapa,
	$cod_vendedor,
	$cod_cobrador
)
{
	$mysqli = conectar_al_servidor();
	if ($modo_mapa === "cobros") {
		buscarMapaCobrosRealizados(
			$mysqli,
			$nombre,
			$documento,
			$cod_local,
			$fecha_desde,
			$fecha_hasta,
			$cod_cobrador
		);
	}
	$condiciones = array(
		"c.estado='Activo'",
		"u.lat BETWEEN -90 AND 90",
		"u.lot BETWEEN -180 AND 180",
		"NOT (u.lat=0 AND u.lot=0)"
	);
	$parametros = array();
	$tipos = "";
	$campos_morosidad = ",
				0 AS cuotas_vencidas,
				0 AS total_vencido,
				0 AS dias_atraso,
				NULL AS primer_vencimiento";
	$union_morosidad = "";

	if ($modo_mapa === "morosos") {
		$campos_morosidad = ",
				mora.cuotas_vencidas,
				mora.total_vencido,
				mora.dias_atraso,
				mora.primer_vencimiento";
		$union_morosidad = "
			INNER JOIN (
				SELECT
					vm.cod_clienteFK,
					COUNT(*) AS cuotas_vencidas,
					SUM(
						(IFNULL(cr.Monto,0)-IFNULL(cr.descuento,0))-IFNULL(pc.total_pagado,0)
					) AS total_vencido,
					MAX(DATEDIFF(CURDATE(),cr.fechapago)) AS dias_atraso,
					MIN(cr.fechapago) AS primer_vencimiento
				FROM credito cr
				INNER JOIN venta vm ON vm.cod_venta=cr.cod_venta
				LEFT JOIN (
					SELECT cod_creditoFK,SUM(IFNULL(Monto,0)) AS total_pagado
					FROM pago
					WHERE Tipo='Pago Cuota'
					  AND COALESCE(anulado,0)<>1
					GROUP BY cod_creditoFK
				) pc ON pc.cod_creditoFK=cr.idcredito
				WHERE cr.fechapago<CURDATE()
				  AND COALESCE(cr.anulado,0)<>1
				  AND COALESCE(vm.anulado,0)<>1
				  AND NOT EXISTS (
					  SELECT 1 FROM cancelaciones ca
					  WHERE ca.cod_venta=vm.cod_venta
				  )
				  AND (
					  (IFNULL(cr.Monto,0)-IFNULL(cr.descuento,0))-IFNULL(pc.total_pagado,0)
				  )>0
				GROUP BY vm.cod_clienteFK
			) mora ON mora.cod_clienteFK=c.cod_cliente";
	}

	if ($nombre !== "") {
		$condiciones[] = "CONCAT(p.nombre_persona,' ',p.apellido_persona) LIKE ?";
		$parametros[] = "%".$nombre."%";
		$tipos .= "s";
	}

	if ($documento !== "") {
		$documento = str_replace(array(".", "-", " "), "", $documento);
		$condiciones[] = "REPLACE(REPLACE(REPLACE(IFNULL(c.ci_cliente,''),'.',''),'-',''),' ','') LIKE ?";
		$parametros[] = "%".$documento."%";
		$tipos .= "s";
	}

	if ($cod_local !== "" && ctype_digit((string)$cod_local)) {
		$condiciones[] = "v.cod_local=?";
		$parametros[] = (int)$cod_local;
		$tipos .= "i";
	}

	if ($modo_mapa === "ventas" && $cod_vendedor !== "" && ctype_digit((string)$cod_vendedor)) {
		$condiciones[] = "v.Vendedor1=?";
		$parametros[] = (int)$cod_vendedor;
		$tipos .= "i";
	}

	if ($fecha_desde !== "" && preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_desde)) {
		$condiciones[] = "v.fecha_venta>=?";
		$parametros[] = $fecha_desde;
		$tipos .= "s";
	}

	if ($fecha_hasta !== "" && preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_hasta)) {
		$condiciones[] = "v.fecha_venta<=?";
		$parametros[] = $fecha_hasta;
		$tipos .= "s";
	}

	$sql = "SELECT
				u.cod_clienteFk,
				CONCAT(p.nombre_persona,' ',p.apellido_persona) AS cliente,
				IFNULL(c.ci_cliente,'') AS documento,
				IFNULL(p.telefono,'') AS telefono,
				u.lat,
				u.lot,
				IFNULL(u.descripcion,'') AS descripcion,
				u.fecha AS fecha_ubicacion,
				v.fecha_venta AS ultima_compra,
				v.cod_local,
				IFNULL(l.Nombre,'SIN COMPRA REGISTRADA') AS local,
				IFNULL(vd.nombre,'SIN VENDEDOR') AS vendedor
				".$campos_morosidad."
			FROM ubicaciones u
			INNER JOIN (
				SELECT cod_clienteFk, MAX(idubicaciones) AS idubicaciones
				FROM ubicaciones
				WHERE lat BETWEEN -90 AND 90
				  AND lot BETWEEN -180 AND 180
				  AND NOT (lat=0 AND lot=0)
				GROUP BY cod_clienteFk
			) ultima_ubicacion ON ultima_ubicacion.idubicaciones=u.idubicaciones
			INNER JOIN cliente c ON c.cod_cliente=u.cod_clienteFk
			INNER JOIN persona p ON p.cod_persona=c.cod_cliente
			".$union_morosidad."
			LEFT JOIN venta v ON v.cod_venta=(
				SELECT v2.cod_venta
				FROM venta v2
				WHERE v2.cod_clienteFK=c.cod_cliente
				  AND NOT EXISTS (
					  SELECT 1
					  FROM cancelaciones ca
					  WHERE ca.cod_venta=v2.cod_venta
				  )
				ORDER BY v2.fecha_venta DESC, v2.cod_venta DESC
				LIMIT 1
			)
			LEFT JOIN local l ON l.cod_local=v.cod_local
			LEFT JOIN vendedor vd ON vd.idvendedor=CAST(v.Vendedor1 AS UNSIGNED)
			WHERE ".implode(" AND ", $condiciones)."
			ORDER BY cliente ASC";

	$stmt = $mysqli->prepare($sql);
	if (!$stmt) {
		$informacion = array("1" => "error", "2" => "No se pudo preparar la consulta del mapa");
		echo json_encode($informacion);
		mysqli_close($mysqli);
		exit;
	}

	vincularParametrosMapaClientes($stmt, $tipos, $parametros);
	if (!$stmt->execute()) {
		$informacion = array("1" => "error", "2" => "No se pudo consultar la ubicacion de los clientes");
		echo json_encode($informacion);
		$stmt->close();
		mysqli_close($mysqli);
		exit;
	}

	$resultado = $stmt->get_result();
	$clientes = array();
	while ($fila = mysqli_fetch_assoc($resultado)) {
		$clientes[] = array(
			"id_cliente" => (int)$fila["cod_clienteFk"],
			"cliente" => textoUtf8MapaClientes(trim($fila["cliente"])),
			"documento" => textoUtf8MapaClientes($fila["documento"]),
			"telefono" => textoUtf8MapaClientes($fila["telefono"]),
			"latitud" => (float)$fila["lat"],
			"longitud" => (float)$fila["lot"],
			"descripcion" => textoUtf8MapaClientes($fila["descripcion"]),
			"fecha_ubicacion" => $fila["fecha_ubicacion"],
			"ultima_compra" => $fila["ultima_compra"] !== null ? $fila["ultima_compra"] : "",
			"cod_local" => $fila["cod_local"] !== null ? (int)$fila["cod_local"] : 0,
			"local" => textoUtf8MapaClientes($fila["local"]),
			"vendedor" => textoUtf8MapaClientes($fila["vendedor"]),
			"cuotas_vencidas" => (int)$fila["cuotas_vencidas"],
			"total_vencido" => (float)$fila["total_vencido"],
			"dias_atraso" => (int)$fila["dias_atraso"],
			"primer_vencimiento" => $fila["primer_vencimiento"] !== null ? $fila["primer_vencimiento"] : ""
		);
	}
	$stmt->close();
	responderMapaClientes($mysqli, $clientes);
}

function EliminarGeo($CodGeoLocalizacion)
{

if($CodGeoLocalizacion=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor(); 


$consulta1=" delete from ubicaciones where idubicaciones='".$CodGeoLocalizacion."' ";
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






function InsertarGeo($cod_persona,$fecha,$descripcion,$latitudGeo,$longitudGeo)
{

if($cod_persona==""  || $latitudGeo=="" || $longitudGeo==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor(); 


$consulta1="Insert into ubicaciones (lat,lot,descripcion,cod_clienteFk,fecha)
values(?,?,?,?,now())";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$latitudGeo,$longitudGeo,$descripcion,$cod_persona);



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli); 
$informacion =array("1" => "exito","2"=>$cod_persona);
echo json_encode($informacion);	
exit;

}




function buscarGeolocalizacion($codigo)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "SELECT *	FROM ubicaciones where cod_clienteFk='$codigo'";
  
   
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
		  
		  
		      $idubicaciones=$valor['idubicaciones'];
		  	  $lat=utf8_encode($valor['lat']);
		  	  $lot=utf8_encode($valor['lot']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=$valor['fecha'];
		  	 
		  	
			  
			  
		  	  $pagina.="
<table  class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' onclick='obtenerdatosGeoLocalizcion(this)' >
<td id='td_id_1' style='display:none'>".$idubicaciones."</td>
<td id='td_id_2' style='display:none'>".$lat."</td>
<td id='td_id_3' style='display:none'>".$lot."</td>
<td id='td_datos_1' class='td_search' style='width:60%'>".$descripcion."</td>
<td id='td_datos_2' class='td_search' style='width:40%'>".$fecha."</td>
</tr>
</table>";






			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}





function asegurarColumnaInformacionExtraCliente($mysqli)
{
	$resultado = $mysqli->query("SHOW COLUMNS FROM cliente LIKE 'informacion_extra'");
	if ($resultado && $resultado->num_rows > 0) {
		return;
	}

	if (!$mysqli->query("ALTER TABLE cliente ADD COLUMN informacion_extra TEXT NULL AFTER tipo_vivienda")) {
		$informacion = array("1" => "error", "2" => "No se pudo preparar el campo de informacion extra del cliente");
		echo json_encode($informacion);
		exit;
	}
}

function abm($tipo_persona_equifax,$profesion,$tipo_empleado,$cargo,$tipo_cliente,$nombremadre,$nombrepadre,$informacion_extra,$tipo_vivienda,$FechaNac,$sms,$accesocredito,$idzonaFk,$whapp,$estado,$cod_persona,$nombre_persona,$apellido_persona,$direccion,$telefono,$email,$cod_cliente,$rut_cliente,$ci_cliente,$Calificacion,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$operacion)
{

if(!in_array($tipo_persona_equifax,array('PERSONA','EMPRESA','SIN_CLASIFICAR'),true)){
$informacion =array("1" => "error", "2" => "Tipo de persona Equifax invalido");
echo json_encode($informacion);
exit;
}

if($nombre_persona=="" || $idzonaFk=="" || ($tipo_persona_equifax==='PERSONA' && $apellido_persona==="")){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

if($tipo_persona_equifax==='PERSONA' && trim($ci_cliente)===''){
$informacion =array("1" => "error", "2" => "La persona fisica debe tener numero de documento");
echo json_encode($informacion);
exit;
}
if($tipo_persona_equifax==='EMPRESA' && trim($rut_cliente)===''){
$informacion =array("1" => "error", "2" => "La empresa debe tener RUC");
echo json_encode($informacion);
exit;
}

$mysqli=conectar_al_servidor(); 
asegurarColumnaInformacionExtraCliente($mysqli);

if($operacion=="nuevo")
	{
				$consulta= $tipo_persona_equifax==='EMPRESA'
					? "Select count(*) from cliente where rut_cliente=? and estado ='Activo' "
					: "Select count(*) from cliente where ci_cliente=? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$documento_unico = $tipo_persona_equifax==='EMPRESA' ? $rut_cliente : $ci_cliente;
$stmt->bind_param($ss, $documento_unico); 


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nro_total=$result->fetch_row();
 $valor=$nro_total[0];
if($valor>=1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}
	/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);
	
	if($Calificacion==""){
		$Calificacion=32;
	}

if($operacion=="nuevo") 
{


$consulta1="Insert into persona (nombre_persona,direccion,telefono,email,apellido_persona)
values(Upper(?),Upper(?),Upper(?),Upper(?),Upper(?))";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$nombre_persona,$direccion,$telefono,$email,$apellido_persona);

$consulta2="Insert into cliente (fechanac,rut_cliente,Calificacion,cod_cliente,whapp,estado,idzonaFk,ci_cliente,lugardetrabajo,salario,antiguedad,teleftrab1,teleftrab2,direcciontrab,cod_user_insert,fecha_insert,accesocredito,sms,nombremadre,nombrepadre,tipo_vivienda,informacion_extra,cod_tipomora,tipo_cliente,cod_profesion,tipo_persona_equifax,tipo_empleado,cargo)
values(?,?,?,(select cod_persona from persona order by cod_persona desc limit 1),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

$stmt2 = $mysqli->prepare($consulta2);
$ss=str_repeat('s',27);
$stmt2->bind_param($ss,$FechaNac,$rut_cliente,$Calificacion,$whapp,$estado,$idzonaFk,$ci_cliente,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$user,$fecha_inser_edit,$accesocredito,$sms,$nombremadre,$nombrepadre,$tipo_vivienda,$informacion_extra,$Calificacion,$tipo_cliente,$profesion,$tipo_persona_equifax,$tipo_empleado,$cargo);

}


if($operacion=="editar")
{

$consulta1="Update persona set nombre_persona=Upper(?),direccion=Upper(?),telefono=Upper(?),email=Upper(?),apellido_persona=Upper(?) where cod_persona=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$nombre_persona,$direccion,$telefono,$email,$apellido_persona,$cod_persona);


$consulta2="update cliente set fechanac=?,rut_cliente=?,Calificacion=?,whapp=?,estado=?,idzonaFk=?,ci_cliente=?,lugardetrabajo=?,salario=?,antiguedad=?,teleftrab1=?,teleftrab2=?,direcciontrab=?,cod_user_edit=?,fecha_edit=?,accesocredito=?,sms=?,nombremadre=?,nombrepadre=?,tipo_vivienda=?,informacion_extra=? ,cod_tipomora=?,tipo_cliente=?,cod_profesion=?,tipo_persona_equifax=?,tipo_empleado=?,cargo=? where cod_cliente=? ";

$stmt2 = $mysqli->prepare($consulta2);
$ss=str_repeat('s',28);
$stmt2->bind_param($ss,$FechaNac,$rut_cliente,$Calificacion,$whapp,$estado,$idzonaFk,$ci_cliente,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$user,$fecha_inser_edit,$accesocredito,$sms,$nombremadre,$nombrepadre,$tipo_vivienda,$informacion_extra,$Calificacion,$tipo_cliente,$profesion,$tipo_persona_equifax,$tipo_empleado,$cargo,$cod_persona);


}




if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


if (!$stmt2->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

if($operacion=="nuevo") {
	$cod_persona=obtenerUltimaId();
}
cargarFotos($cod_persona);



 mysqli_close($mysqli);
$informacion =array("1" => "exito","2"=>$cod_persona);
echo json_encode($informacion);	
exit;

}

function addmasreferencias($totalCargado,$cod_cliente)
{

if($cod_cliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
$control=1;	

	
$consulta= "delete from referenciascliente where cod_clienteFk='$cod_cliente' "; 
$stmt1 = $mysqli->prepare($consulta);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 
while($control<=$totalCargado){

$observacion=$_POST['observacion'.$control];
$observacion = utf8_decode($observacion);

$telef=$_POST['telefono'.$control];
$telef = utf8_decode($telef);

$direccion=$_POST['direccion'.$control];
$direccion = utf8_decode($direccion);

$referencias=$_POST['referencia'.$control];
$referencias = utf8_decode($referencias);

$Tipo=$_POST['Tipo'.$control];
$Tipo = utf8_decode($Tipo);

$consulta="Insert into referenciascliente ( telef, direccion, referencias, observacion, cod_clienteFk, tipo)
values(?,?,?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta);
$ss='ssssss';
$stmt1->bind_param($ss,$telef,$direccion,$referencias,$observacion, $cod_cliente, $Tipo);

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

function addmasreferenciascom($totalCargado,$cod_cliente)
{

if($cod_cliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
$control=1;	

	
$consulta= "delete from `referenciascomercialcliente` where cod_clienteFk='$cod_cliente' "; 


$stmt1 = $mysqli->prepare($consulta);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 
while($control<=$totalCargado){

$observacion=$_POST['observacioncom'.$control];
$observacion = utf8_decode($observacion);

$telef=$_POST['telefonocom'.$control];
$telef = utf8_decode($telef);

$direccion=$_POST['direccioncom'.$control];
$direccion = utf8_decode($direccion);

$referencias=$_POST['referenciacom'.$control];
$referencias = utf8_decode($referencias);

$Tipo=$_POST['Tipocom'.$control];
$Tipo = utf8_decode($Tipo);

$consulta="Insert into referenciascomercialcliente ( telef, direccion, referencias, observacion, cod_clienteFk, tipo)
values(?,?,?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta);
$ss='ssssss';
$stmt1->bind_param($ss,$telef,$direccion,$referencias,$observacion, $cod_cliente, $Tipo);

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

function guardarmensaje($fecha,$hora,$idcliente)
{


$mysqli=conectar_al_servidor(); 

$consulta= "Select count(*) from mensajesenviados where idcliente='$idcliente' ";

$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nro_total=$result->fetch_row();
 $valor=$nro_total[0];
if($valor==0){
	$consulta1="Insert into mensajesenviados (fecha,hora,idcliente)
values(?,?,?)";
	
}else{
	
	$consulta1="update mensajesenviados set fecha=?,hora=? where idcliente=?";
}

$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$fecha,$hora,$idcliente);



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
	 $sql= "Select cod_cliente from cliente where estado='Activo'  order by cod_cliente desc limit 1";
	
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
		  
		  
		      $cod_persona=$valor['cod_cliente'];
		   	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $cod_persona;
}

function cargarFotos($cod_persona)
{
	
$ext1=$_POST['ext1'];
$ext1 = utf8_decode($ext1);

$ext2=$_POST['ext2'];
$ext2 = utf8_decode($ext2);

$ext2=$_POST['ext2'];
$ext2 = utf8_decode($ext2);

if($ext1!=""){
	$foto1=substr($_POST['foto1'], strpos($_POST['foto1'], ",") + 1);;
$foto1 = base64_decode($foto1);
$id_foto="";		  
		     $donde="../fotos/fotoCedula/";
			  $id_foto=$cod_persona;
                $id_f=subir_imagen_base64($donde,$foto1,$id_foto,$ext1);
$ruta="/GoodVentaElectroCasaMaric/fotos/fotoCedula/".$cod_persona.$id_f.'.'.$ext1;
CargaFoto("foto1",$ruta,$cod_persona);
}
if($ext2!=""){
	$foto2=substr($_POST['foto2'], strpos($_POST['foto2'], ",") + 1);;
$foto2 = base64_decode($foto2);
$id_foto="";		  
		     $donde="../fotos/fotoCedula/";
			  $id_foto=$cod_persona;
                $id_f=subir_imagen_base64($donde,$foto2,$id_foto,$ext2);
$ruta="/GoodVentaElectroCasaMaric/fotos/fotoCedula/".$cod_persona.$id_f.'.'.$ext2;
CargaFoto("foto2",$ruta,$cod_persona);
}




}

function CargaFoto($tableName,$Urlfoto,$cod_cliente){
	$mysqli=conectar_al_servidor();
	$consulta="Update cliente set ".$tableName."=? where cod_cliente=? ";	

	$stmt = $mysqli->prepare($consulta);
$ss='ss';
$stmt->bind_param($ss,$Urlfoto,$cod_cliente); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
	 mysqli_close($mysqli);
}



function clienteRegistroListadoArray($fila)
{
    $campos = array(
        'cod_persona','nombre_persona','apellido_persona','direccion','telefono','email','ci_cliente','rut_cliente',
        'Calificacion','whapp','estado','idzonaFk','zona','foto1','foto2','lugardetrabajo','salario','antiguedad',
        'teleftrab1','teleftrab2','direcciontrab','accesocredito','tipo_cliente','tipo_persona_equifax','faja',
        'fechanac','tipoMora','cod_tipomora','cod_profesion','profesion','fecha_insert','fecha_edit','sms',
        'insertadopor','editadopor','nombremadre','nombrepadre','tipo_vivienda','informacion_extra','tipo_empleado','cargo'
    );
    $registro = array();
    foreach ($campos as $campo) {
        $registro[$campo] = isset($fila[$campo]) && $fila[$campo] !== null ? utf8_encode((string)$fila[$campo]) : '';
    }
    $registro['nombre_completo'] = trim($registro['nombre_persona'].' '.$registro['apellido_persona']);
    return $registro;
}

function condicionBusquedaListadoCliente($mysqli, $cliente)
{
    if ($cliente === '') {
        return '';
    }

    $clienteSeguro = $mysqli->real_escape_string($cliente);
    $documentoNormalizado = str_replace(array('.', '-', ' '), '', $cliente);
    $documentoSeguro = $mysqli->real_escape_string($documentoNormalizado);

    return "and (
        concat(pr.nombre_persona,' ',pr.apellido_persona) like '%".$clienteSeguro."%'
        or replace(replace(replace(ifnull(cl.ci_cliente,''),'.',''),'-',''),' ','') like '%".$documentoSeguro."%'
    ) ";
}

/*Buscar Registro en vista*/
function BuscarRegistro($profesion,$tipo_cliente,$calificacion,$codigo,$documento,$cliente,$zona,$estado,$accesocredito, $faja)
{
$mysqli=conectar_al_servidor();
asegurarColumnaInformacionExtraCliente($mysqli);
$tipo_persona_equifax=isset($_POST['tipo_persona_equifax']) ? strtoupper(trim($_POST['tipo_persona_equifax'])) : '';
$condiciontipo_persona_equifax="";
if(in_array($tipo_persona_equifax,array('PERSONA','EMPRESA','SIN_CLASIFICAR'),true)){
$condiciontipo_persona_equifax="and cl.tipo_persona_equifax='".$tipo_persona_equifax."' ";
}

$condicionCodigo="";
if($codigo!=""){
$condicionCodigo="and pr.cod_persona = '".$codigo."' ";
}
$condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente = '".$documento."' ";
}
$condiciontipo_cliente="";
if($tipo_cliente!=""){
$condiciontipo_cliente="and cl.tipo_cliente= '".$tipo_cliente."' ";
}
$condicioncliente="";
$condicioncliente=condicionBusquedaListadoCliente($mysqli, $cliente);
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}
$condicionaccesocredito="";
if($accesocredito!=""){
$condicionaccesocredito="and cl.accesocredito= '".$accesocredito."' ";
}

$condicioncalificacion="";
if($calificacion!=""){
$condicioncalificacion="and cl.cod_tipomora= '".$calificacion."' ";
}

$condicionfaja="";
if($faja!=""){
$condicionfaja="and IFNULL(cl.calificacion_cliente,'SIN REGISTRO')= '".$faja."' ";
}

$condicionprofesion="";
if($profesion!=""){
$condicionprofesion="and  cod_profesion = '".$profesion."' ";
}

$sql= "select cl.whapp,pr.cod_persona,pr.nombre_persona,pr.apellido_persona,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.nombremadre,cl.nombrepadre,cl.tipo_vivienda,IFNULL(cl.informacion_extra,'') as informacion_extra,cod_profesion,(select nombre from profesion where cod_profesion=idprofesion) as profesion,
cl.estado,cl.idzonaFk,foto1,foto2,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.accesocredito,cl.tipo_cliente,cl.tipo_persona_equifax,IFNULL(cl.tipo_empleado,'') as tipo_empleado,IFNULL(cl.cargo,'') as cargo,IFNULL(cl.calificacion_cliente,'SIN REGISTRO') as faja
,cl.fechanac,(Select nombre from mora_cliente where idmora_cliente=cod_tipomora )as tipoMora,cl.cod_tipomora,
(Select nombre from zona where idzonaFk=idzona )as zona,cl.fecha_insert,cl.fecha_edit,cl.sms,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
 from  persona pr inner join  cliente cl on cl.cod_cliente=pr.cod_persona 
where cl.estado='$estado' ".$condicionprofesion.$condicioncalificacion.$condiciondocumento.$condicioncliente.$condicionzona.$condicionCodigo.$condicionaccesocredito.$condiciontipo_cliente.$condiciontipo_persona_equifax.$condicionfaja." order by pr.nombre_persona, pr.apellido_persona limit 100";

 
// echo($sql);
// exit; 
 


$pagina = "";
$registros = array();
$devolverArray = isset($_POST['formato']) && $_POST['formato'] === 'json';
$stmt = $mysqli->prepare($sql); 

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor ;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$registros[] = clienteRegistroListadoArray($valor);
$tipoMora = utf8_encode($valor['tipoMora']); 
$cod_tipomora = utf8_encode($valor['cod_tipomora']); 
$fechanac = utf8_encode($valor['fechanac']); 
$sms = utf8_encode($valor['sms']);  
$cod_persona = utf8_encode($valor['cod_persona']);     
$nombre_persona = utf8_encode($valor['nombre_persona']);          
$apellido_persona = utf8_encode($valor['apellido_persona']);          
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
$fecha_edit = utf8_encode($valor['fecha_edit']); 
$accesocredito = utf8_encode($valor['accesocredito']); 
$nombremadre = utf8_encode($valor['nombremadre']); 
$nombrepadre = utf8_encode($valor['nombrepadre']); 
$informacion_extra = utf8_encode($valor['informacion_extra']); 
$informacion_extra_html = htmlspecialchars($informacion_extra, ENT_QUOTES, "UTF-8");
$tipo_vivienda = utf8_encode($valor['tipo_vivienda']); 
$tipo_cliente = utf8_encode($valor['tipo_cliente']); 
$tipo_persona_equifax = utf8_encode($valor['tipo_persona_equifax']);
$faja = utf8_encode($valor['faja']); 
$cod_profesion = utf8_encode($valor['cod_profesion']); 
$profesion = utf8_encode($valor['profesion']); 
$tipo_empleado = utf8_encode($valor['tipo_empleado']);
$cargo = utf8_encode($valor['cargo']);



// Definir colores para cada faja (verde -> rojo)
$coloresFaja = array(
    'CAT A' => '#00FF00', // verde
    'CAT B' => '#66FF33',
    'CAT C' => '#CCFF33',
    'CAT D' => '#FFFF00', // amarillo
    'CAT E' => '#FFCC33',
    'CAT F' => '#FF9900',
    'CAT G' => '#FF6600',
    'CAT H' => '#FF3300',
    'CAT I' => '#FF0000',
    'CAT J' => '#CC0000',
    'CAT K' => '#990000', // rojo oscuro
);

// Obtener color según faja, con valor por defecto si no existe
if (isset($coloresFaja[$faja])) {
    $colorFaja = $coloresFaja[$faja];
	$color="color: #000;";
} else {
    $colorFaja = '#010036ff'; // negro por defecto
	$color="color: #fcfcfcff;";
}
$spanCal = "<span class='fw-bold px-2 py-1 rounded' style='".$color."background-color:$colorFaja; '>
						 $faja
					</span><br>";




if(!$devolverArray) {
 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCliente(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$cod_persona."</td>
<td  id='td_datos_13' style='width:10%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td id='' style='width:10%'>".$nombre_persona." ".$apellido_persona."</td>
<td id='td_datos_1' style='display:none'>".$nombre_persona."</td>
<td id='td_datos_109' style='display:none'>".$apellido_persona."</td>
<td  id='td_datos_10' style='width:10%'>".$zona."</td>
<td  id='td_datos_4' style='width:10%'>".$telefono."</td>
<td  id='td_datos_21' style='width:10%'>".$accesocredito."</td>
<td  id='td_datos_22' style='width:10%'>".$tipoMora."</td>
<td  id='td_datos_23' style='width:10%'>".$tipo_cliente."</td>
<td  id='td_datos_111' style='width:10%'>".$tipo_persona_equifax."</td>
<td  id='td_datos_25' style='width:10%'>".$profesion."</td>
<td  id='td_datos_24' style='display:none'>".$cod_profesion."</td>
<td  id='' style='width:10%'>".$spanCal."</td>
<td  id='td_datos_6' style='display:none'>".$cod_tipomora."</td>
<td  id='td_datos_3' style='display:none'>".$direccion."</td>
<td  id='td_datos_5' style='display:none'>".$email."</td>
<td  id='' style='display:none'>".$Calificacion."</td>
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
<td  id='td_datos_105' style='display:none'>".$fechanac."</td>
<td  id='td_datos_106' style='display:none'>".$nombremadre."</td>
<td  id='td_datos_107' style='display:none'>".$nombrepadre."</td>
<td  id='td_datos_108' style='display:none'>".$tipo_vivienda."</td>
<td  id='td_datos_110' style='display:none'>".$informacion_extra_html."</td>
<td  id='td_datos_112' style='display:none'>".htmlspecialchars($tipo_empleado, ENT_QUOTES, "UTF-8")."</td>
<td  id='td_datos_113' style='display:none'>".htmlspecialchars($cargo, ENT_QUOTES, "UTF-8")."</td>
</tr>
</table>";
}

}
}

 

$sql= "select cl.whapp
 from  persona pr inner join  cliente cl on cl.cod_cliente=pr.cod_persona 
where cl.estado='$estado' ".$condicionprofesion.$condicioncalificacion.$condiciondocumento.$condicioncliente.$condicionzona.$condicionCodigo.$condicionaccesocredito.$condiciontipo_cliente.$condiciontipo_persona_equifax.$condicionfaja." order by pr.nombre_persona, pr.apellido_persona";
$stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;

mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $registros : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => $nroRegistro,"99" =>$nroRegistro,"100" =>$totalregistro );
echo json_encode($informacion);	
exit;
}

function BuscarMasRegistro($profesion,$faja,$tipo_cliente,$calificacion,$codigo,$documento,$cliente,$zona,$estado,$accesocredito,$registrocargado)
{
$mysqli=conectar_al_servidor();
$tipo_persona_equifax=isset($_POST['tipo_persona_equifax']) ? strtoupper(trim($_POST['tipo_persona_equifax'])) : '';
$condiciontipo_persona_equifax="";
if(in_array($tipo_persona_equifax,array('PERSONA','EMPRESA','SIN_CLASIFICAR'),true)){
$condiciontipo_persona_equifax="and cl.tipo_persona_equifax='".$tipo_persona_equifax."' ";
}
asegurarColumnaInformacionExtraCliente($mysqli);

$condicionCodigo="";
if($codigo!=""){
$condicionCodigo="and pr.cod_persona = '".$codigo."' ";
}
$condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente= '".$documento."' ";
}
$condiciontipo_cliente="";
if($tipo_cliente!=""){
$condiciontipo_cliente="and cl.tipo_cliente= '".$tipo_cliente."' ";
}
$condicioncliente="";
$condicioncliente=condicionBusquedaListadoCliente($mysqli, $cliente);
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}

$condicionaccesocredito="";
if($accesocredito!=""){
$condicionaccesocredito="and cl.accesocredito= '".$accesocredito."' ";
}

$condicioncalificacion="";
if($calificacion!=""){
$condicioncalificacion="and cl.cod_tipomora= '".$calificacion."' ";
}

$condicionfaja="";
if($faja!=""){
$condicionfaja=" and IFNULL(cl.calificacion_cliente,'SIN REGISTRO')= '".$faja."' ";
}

$condicionprofesion="";
if($profesion!=""){
$condicionprofesion="and  cod_profesion = '".$profesion."' ";
}

$sql= "select cl.whapp,pr.cod_persona,pr.nombre_persona,pr.apellido_persona,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.nombremadre,cl.nombrepadre,cl.tipo_vivienda,IFNULL(cl.informacion_extra,'') as informacion_extra,cod_profesion,(select nombre from profesion where cod_profesion=idprofesion) as profesion,
cl.estado,cl.idzonaFk,foto1,foto2,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.accesocredito,cl.tipo_cliente,cl.tipo_persona_equifax,IFNULL(cl.tipo_empleado,'') as tipo_empleado,IFNULL(cl.cargo,'') as cargo,IFNULL(cl.calificacion_cliente,'SIN REGISTRO') as faja
,cl.fechanac,(Select nombre from mora_cliente where idmora_cliente=cod_tipomora )as tipoMora,cl.cod_tipomora,
(Select nombre from zona where idzonaFk=idzona )as zona,cl.fecha_insert,cl.fecha_edit,cl.sms,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
 from  persona pr inner join  cliente cl on cl.cod_cliente=pr.cod_persona 
where cl.estado=? ".$condicionprofesion.$condicioncalificacion.$condiciondocumento.$condicioncliente.$condicionzona.$condicionCodigo.$condicionaccesocredito.$condiciontipo_cliente.$condiciontipo_persona_equifax.$condicionfaja." order by pr.nombre_persona,pr.apellido_persona limit ".$registrocargado." , 100 ";
$pagina = "";
$registros = array();
$devolverArray = isset($_POST['formato']) && $_POST['formato'] === 'json';
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
$registros[] = clienteRegistroListadoArray($valor);

$tipoMora = utf8_encode($valor['tipoMora']); 
$cod_tipomora = utf8_encode($valor['cod_tipomora']); 
$fechanac = utf8_encode($valor['fechanac']); 
$sms = utf8_encode($valor['sms']);  
$cod_persona = utf8_encode($valor['cod_persona']);     
$nombre_persona = utf8_encode($valor['nombre_persona']);
$apellido_persona = utf8_encode($valor['apellido_persona']);          
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
$nombremadre = utf8_encode($valor['nombremadre']); 
$nombrepadre = utf8_encode($valor['nombrepadre']); 
$informacion_extra = utf8_encode($valor['informacion_extra']); 
$informacion_extra_html = htmlspecialchars($informacion_extra, ENT_QUOTES, "UTF-8");
$tipo_vivienda = utf8_encode($valor['tipo_vivienda']); 
$tipo_cliente = utf8_encode($valor['tipo_cliente']); 
$tipo_persona_equifax = utf8_encode($valor['tipo_persona_equifax']);
$faja = utf8_encode($valor['faja']); 
$cod_profesion = utf8_encode($valor['cod_profesion']); 
$profesion = utf8_encode($valor['profesion']); 
$tipo_empleado = utf8_encode($valor['tipo_empleado']);
$cargo = utf8_encode($valor['cargo']);



// Definir colores para cada faja (verde -> rojo)
$coloresFaja = array(
    'CAT A' => '#00FF00', // verde
    'CAT B' => '#66FF33',
    'CAT C' => '#CCFF33',
    'CAT D' => '#FFFF00', // amarillo
    'CAT E' => '#FFCC33',
    'CAT F' => '#FF9900',
    'CAT G' => '#FF6600',
    'CAT H' => '#FF3300',
    'CAT I' => '#FF0000',
    'CAT J' => '#CC0000',
    'CAT K' => '#990000', // rojo oscuro
);

// Obtener color según faja, con valor por defecto si no existe
if (isset($coloresFaja[$faja])) {
    $colorFaja = $coloresFaja[$faja];
	$color="color: #000;";
} else {
    $colorFaja = '#010036ff'; // negro por defecto
	$color="color: #fcfcfcff;";
}
$spanCal = "<span class='fw-bold px-2 py-1 rounded' style='".$color."background-color:$colorFaja; '>
						 $faja
					</span><br>";




if(!$devolverArray) {
 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCliente(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$cod_persona."</td>
<td  id='td_datos_13' style='width:10%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td id='' style='width:10%'>".$nombre_persona." ".$apellido_persona."</td>
<td id='td_datos_1' style='display:none'>".$nombre_persona."</td>
<td id='td_datos_109' style='display:none'>".$apellido_persona."</td>
<td  id='td_datos_10' style='width:10%'>".$zona."</td>
<td  id='td_datos_4' style='width:10%'>".$telefono."</td>
<td  id='td_datos_21' style='width:10%'>".$accesocredito."</td>
<td  id='td_datos_22' style='width:10%'>".$tipoMora."</td>
<td  id='td_datos_23' style='width:10%'>".$tipo_cliente."</td>
<td  id='td_datos_111' style='width:10%'>".$tipo_persona_equifax."</td>
<td  id='td_datos_24' style='width:10%'>".$profesion."</td>
<td  id='td_datos_25' style='display:none'>".$cod_profesion."</td>
<td  id='' style='width:10%'>".$spanCal."</td>
<td  id='td_datos_6' style='display:none'>".$cod_tipomora."</td>
<td  id='td_datos_3' style='display:none'>".$direccion."</td>
<td  id='td_datos_5' style='display:none'>".$email."</td>
<td  id='' style='display:none'>".$Calificacion."</td>
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
<td  id='td_datos_105' style='display:none'>".$fechanac."</td>
<td  id='td_datos_106' style='display:none'>".$nombremadre."</td>
<td  id='td_datos_107' style='display:none'>".$nombrepadre."</td>
<td  id='td_datos_108' style='display:none'>".$tipo_vivienda."</td>
<td  id='td_datos_110' style='display:none'>".$informacion_extra_html."</td>
<td  id='td_datos_112' style='display:none'>".htmlspecialchars($tipo_empleado, ENT_QUOTES, "UTF-8")."</td>
<td  id='td_datos_113' style='display:none'>".htmlspecialchars($cargo, ENT_QUOTES, "UTF-8")."</td>
</tr>
</table>";
}


}
}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $registros : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"99" =>$nroRegistro );
echo json_encode($informacion);	
exit;
}


/*Buscar Registro en vista*/
function buscarmasreferencias($buscar,$formato="")
{
	
$mysqli=conectar_al_servidor();
$sql= "select idreferenciascliente, telef, direccion, referencias, observacion, cod_clienteFk , tipo from referenciascliente where cod_clienteFk='$buscar' ";
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
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
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 

 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_referencia" => utf8_encode($valor['idreferenciascliente']),
		"id_cliente" => $cod_clienteFk,
		"observacion" => $observacion,
		"telefono" => $telef,
		"direccion" => $direccion,
		"referencia" => $referencias,
		"tipo" => $tipo,
		"clase_fila" => $styleName
	);
	if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosmasreferencias(this)'  name='tdMasReferencias'>
<td  id='td_datos_1' style='width:20%'>".$observacion."</td>
<td  id='td_datos_2' style='width:20%'>".$telef."</td>
<td id='td_datos_3' style='width:20%'>".$direccion."</td>
<td  id='td_datos_4' style='width:20%'>".$referencias."</td>
<td id='td_datos_5' style='width:20%'>".$tipo."</td>
</tr>
</table>";
	}


}
}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina) );
echo json_encode($informacion);	
exit;
}
function buscarmasreferenciascom($buscar,$formato="")
{
	
$mysqli=conectar_al_servidor();
$sql= "select idreferenciascomercialcliente, telef, direccion, referencias, observacion, cod_clienteFk , tipo from referenciascomercialcliente where cod_clienteFk='$buscar' ";
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
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
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 

 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_referencia" => utf8_encode($valor['idreferenciascomercialcliente']),
		"id_cliente" => $cod_clienteFk,
		"observacion" => $observacion,
		"telefono" => $telef,
		"direccion" => $direccion,
		"referencia" => $referencias,
		"tipo" => $tipo,
		"clase_fila" => $styleName
	);
	if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosmasreferenciascom(this)'  name='tdMasReferenciasCom'>
<td  id='td_datos_1' style='width:10%'>".$observacion."</td>
<td  id='td_datos_2' style='width:10%'>".$telef."</td>
<td id='td_datos_3' style='width:10%'>".$direccion."</td>
<td  id='td_datos_4' style='width:10%'>".$referencias."</td>
<td id='td_datos_5' style='width:10%'>".$tipo."</td>
</tr>
</table>";
	}


}
}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina) );
echo json_encode($informacion);	
exit;
}



function BuscarRegistroEnVista($ruc,$documento,$cliente,$telef,$formato="",$buscar_general="")
{
$mysqli=conectar_al_servidor();

/* La busqueda superior del selector es independiente de los filtros avanzados.
 * Cada palabra debe coincidir con alguno de los datos identificatorios del cliente. */
$condiciongeneral="";
$buscar_general=trim($buscar_general);
if($buscar_general!=""){
	$terminosGenerales=preg_split('/\s+/', $buscar_general);
	foreach($terminosGenerales as $terminoGeneral){
		if($terminoGeneral===""){
			continue;
		}
		$terminoSeguro=$mysqli->real_escape_string($terminoGeneral);
		$terminoNormalizado=preg_replace('/[^0-9A-Za-z]/', '', $terminoGeneral);
		$condicionNormalizada="";
		if($terminoNormalizado!==""){
			$terminoNormalizado=$mysqli->real_escape_string($terminoNormalizado);
			$condicionNormalizada="
			 or replace(replace(replace(cl.ci_cliente,'.',''),'-',''),' ','') like '%$terminoNormalizado%'
			 or replace(replace(replace(cl.rut_cliente,'.',''),'-',''),' ','') like '%$terminoNormalizado%'
			 or replace(replace(replace(pr.telefono,'.',''),'-',''),' ','') like '%$terminoNormalizado%'";
		}
		$condiciongeneral.=" and (
			concat(pr.nombre_persona,' ',pr.apellido_persona) like '%$terminoSeguro%'
			or cl.ci_cliente like '%$terminoSeguro%'
			or cl.rut_cliente like '%$terminoSeguro%'
			or pr.telefono like '%$terminoSeguro%'
			or cl.whapp like '%$terminoSeguro%'
			$condicionNormalizada
		)";
	}
}

$condiciondocumento="";
if($documento!=""){
	$condiciondocumento=" and cl.ci_cliente like '%$documento%'";
}
$condicionruc="";
if($ruc!=""){
	$condicionruc=" and cl.rut_cliente like '%$ruc%'";
}
$condiciontelef="";
if($telef!=""){
	$condiciontelef=" and pr.telefono like '%$telef%'";
}






$CondicionBuscador1=""; 
$CondicionBuscadorTotal1="";
$condicioncliente="";


if($cliente!=""){
$Buscador = explode ( ' ', $cliente );
$total = count($Buscador);
$contador=0;

while(($contador < $total)){
	if($Buscador[$contador]!=""){
	$CondicionBuscador1=" and concat(pr.nombre_persona,' ',pr.apellido_persona) like '%".$Buscador[$contador]."%' ";	
	$CondicionBuscadorTotal1.=$CondicionBuscador1;
}
	$contador++;
}
$condicioncliente=$CondicionBuscadorTotal1;

}else{
	$condicioncliente=" ";	
}



$sql= "select cl.whapp,pr.cod_persona,concat(pr.nombre_persona,' ',pr.apellido_persona) as nombre_persona,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.cod_tipomora ,cl.tipo_estado,ifnull(cl.tipo_vivienda,'') as tipo_vivienda
,cl.rut_cliente,cl.Calificacion,cl.estado,cl.idzonaFk,foto1,foto2,cl.accesocredito,cl.fechanac,lugardetrabajo,salario,antiguedad,teleftrab1,teleftrab2,direcciontrab,
(Select nombre from zona where idzonaFk=idzona )as zona
 from  persona pr inner join  cliente cl on cl.cod_cliente=pr.cod_persona 
where cl.estado='Activo' ".$condiciongeneral.$condicioncliente.$condiciondocumento.$condicionruc.$condiciontelef." order by pr.nombre_persona, pr.apellido_persona limit 500";

// echo $sql;
// exit;
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";


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

$fechanac = utf8_encode($valor['fechanac']);  
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
$accesocredito = utf8_encode($valor['accesocredito']); 

$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$cod_tipomora = utf8_encode($valor['cod_tipomora']); 
$tipo_estado = utf8_encode($valor['tipo_estado']); 
$tipo_vivienda = utf8_encode($valor['tipo_vivienda']); 

$stylefondo="";
if($accesocredito=="Denegado"){
$stylefondo="background-color:#ff5722;color:#fff";	
}
 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_cliente" => $cod_persona,
		"documento" => $ci_cliente,
		"ruc" => $rut_cliente,
		"cliente" => $nombre_persona,
		"zona" => $zona,
		"direccion" => $direccion,
		"telefono" => $telefono,
		"email" => $email,
		"calificacion" => $Calificacion,
		"whatsapp" => $whapp,
		"estado" => $estado,
		"id_zona" => $idzonaFk,
		"foto_1" => $foto1,
		"foto_2" => $foto2,
		"acceso_credito" => $accesocredito,
		"fecha_nacimiento" => $fechanac,
		"lugar_trabajo" => $lugardetrabajo,
		"salario" => $salario,
		"antiguedad" => $antiguedad,
		"telefono_trabajo_1" => $teleftrab1,
		"telefono_trabajo_2" => $teleftrab2,
		"direccion_trabajo" => $direcciontrab,
		"codigo_tipo_mora" => $cod_tipomora,
		"tipo_estado" => $tipo_estado,
		"tipo_vivienda" => $tipo_vivienda,
		"clase_fila" => $styleName,
		"estilo_fila" => $stylefondo
	);
 
 
 
 
 // if($cod_tipomora != "15"){
	 
	 
	if(!$devolverArray){
	 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistacliente(this)' style='$stylefondo'>
<td id='td_id' style='display:none'>".$cod_persona."</td>
<td  id='td_datos_2' style='width:10%'>".$ci_cliente."</td>
<td  id='td_datos_13' style='width:10%'>".$rut_cliente."</td>
<td id='td_datos_1' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_10' style='display:none'>".$zona."</td>
<td  id='td_datos_3' style='width:10%'>".$direccion."</td>
<td  id='td_datos_4' style='width:10%'>".$telefono."</td>
<td  id='td_datos_5' style='display:none'>".$email."</td>
<td  id='td_datos_6' style='display:none'>".$Calificacion."</td>
<td  id='td_datos_7' style='display:none'>".$whapp."</td>
<td  id='td_datos_8' style='display:none'>".$estado."</td>
<td  id='td_datos_9' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$foto1."</td>
<td  id='td_datos_12' style='display:none'>".$foto2."</td>
<td  id='td_datos_14' style='display:none'>".$accesocredito."</td>
<td  id='td_datos_22' style='display:none'>".$fechanac."</td>


<td  id='td_datos_15' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_16' style='display:none'>".$salario."</td>
<td  id='td_datos_17' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_18' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_19' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_20' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_21' style='display:none'>".$cod_tipomora."</td>
<td  id='td_datos_23' style='display:none'>".$tipo_estado."</td>
<td  id='td_datos_24' style='display:none'>".$tipo_vivienda."</td>
</tr>
</table>";
	}
	 
	 
 // }
	  

}
}
     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($devolverArray ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscarporci($buscar,$formato="")
{
$mysqli=conectar_al_servidor();

$sql= "select cl.whapp,pr.cod_persona,concat(nombre_persona,' ',apellido_persona) as nombre_persona,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.estado,cl.idzonaFk,foto1,foto2,cl.accesocredito,
(Select nombre from zona where idzonaFk=idzona )as zona ,
cl.totaldias,
cl.lugardetrabajo,
cl.salario,
cl.antiguedad,
cl.teleftrab1,
cl.fechanac,
cl.teleftrab2,
cl.direcciontrab
 from  persona pr inner join  cliente cl on cl.cod_cliente=pr.cod_persona 
where cl.estado='Activo' and cl.ci_cliente='$buscar' order by pr.nombre_persona,pr.apellido_persona limit 1";
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";

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


$fechanac = utf8_encode($valor['fechanac']);  
$totaldias = utf8_encode($valor['totaldias']);  
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']);  
$salario = utf8_encode($valor['salario']);  
$antiguedad = utf8_encode($valor['antiguedad']);  
$teleftrab1 = utf8_encode($valor['teleftrab1']);  
$teleftrab2 = utf8_encode($valor['teleftrab2']);  
$direcciontrab = utf8_encode($valor['direcciontrab']);  
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
$accesocredito = utf8_encode($valor['accesocredito']); 
 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_cliente" => $cod_persona,
		"documento" => $ci_cliente,
		"ruc" => $rut_cliente,
		"cliente" => $nombre_persona,
		"zona" => $zona,
		"direccion" => $direccion,
		"telefono" => $telefono,
		"email" => $email,
		"calificacion" => $Calificacion,
		"whatsapp" => $whapp,
		"estado" => $estado,
		"id_zona" => $idzonaFk,
		"foto_1" => $foto1,
		"foto_2" => $foto2,
		"acceso_credito" => $accesocredito,
		"total_dias" => $totaldias,
		"lugar_trabajo" => $lugardetrabajo,
		"salario" => $salario,
		"antiguedad" => $antiguedad,
		"telefono_trabajo_1" => $teleftrab1,
		"telefono_trabajo_2" => $teleftrab2,
		"direccion_trabajo" => $direcciontrab,
		"fecha_nacimiento" => $fechanac,
		"clase_fila" => $styleName
	);
	if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr class='tableRegistroSelec' id='trdatoClienteCi' onclick='obtenerdatosvistacliente(this)'>
<td id='td_id' style='display:none'>".$cod_persona."</td>
<td  id='td_datos_2' style='width:10%'>".$ci_cliente."</td>
<td  id='td_datos_13' style='width:10%'>".$rut_cliente."</td>
<td id='td_datos_1' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_10' style='display:none'>".$zona."</td>
<td  id='td_datos_3' style='width:10%'>".$direccion."</td>
<td  id='td_datos_4' style='width:10%'>".$telefono."</td>
<td  id='td_datos_5' style='display:none'>".$email."</td>
<td  id='td_datos_6' style='display:none'>".$Calificacion."</td>
<td  id='td_datos_7' style='display:none'>".$whapp."</td>
<td  id='td_datos_8' style='display:none'>".$estado."</td>
<td  id='td_datos_9' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$foto1."</td>
<td  id='td_datos_12' style='display:none'>".$foto2."</td>
<td  id='td_datos_14' style='display:none'>".$accesocredito."</td>
<td  id='td_datos_15' style='display:none'>".$totaldias."</td>
<td  id='td_datos_16' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_17' style='display:none'>".$salario."</td>
<td  id='td_datos_18' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_19' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_20' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_21' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_22' style='display:none'>".$fechanac."</td>
</tr>
</table>";
	}


}
}
     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($devolverArray ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


function  buscarmensajes($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select fecha,hora from mensajesenviados where idcliente='$buscar' limit 100 ";
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



$fecha = utf8_encode($valor['fecha']);     
$hora = utf8_encode($valor['hora']); 

 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td  style='width:80%'>".$fecha."</td>
<td   style='width:20%'>".$hora."</td>
</tr>
</table>";


}
}
     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscar_nuevos_clientes($nombre, $estado_asignacion,$zona)
{
$mysqli=conectar_al_servidor();

$condicionnombre = '';
if($nombre != ''){
	$condicionnombre = " and nombre like '%".$nombre."%'";
}

$condicionestado_asignacion = '';
if($estado_asignacion != ''){
	$condicionestado_asignacion = " and estado_asignado = '".$estado_asignacion."'";
}

$condicionzona = '';
if($zona != ''){
	$condicionzona = " and zona like '%".$zona."%'";
}

$sql= "select idnuevos_cliente,nombre, telefono, documento, zona, estado_asignado from nuevos_cliente where idnuevos_cliente != 0 ".$condicionnombre.$condicionestado_asignacion.$condicionzona." LIMIT 700";


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

$nombre = utf8_encode($valor['nombre']);     
$telefono = utf8_encode($valor['telefono']); 
$documento = utf8_encode($valor['documento']); 
$zona = utf8_encode($valor['zona']); 
$zona = utf8_encode($valor['zona']); 
$estado_asignado = utf8_encode($valor['estado_asignado']); 
$idnuevos_cliente = utf8_encode($valor['idnuevos_cliente']); 

 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='TablaNuevosClientes'>
<td   style='display:none' id='td_id' >".$idnuevos_cliente."</td>
<td   style='width:20%' id='td_datos_2' >".$telefono."</td>
<td  style='width:20%' id='td_datos_1' >".$nombre."</td>
<td   style='width:20%' id='td_datos_3' >".$documento."</td>
<td   style='width:20%' id='td_datos_4'>".$zona."</td>
<td   style='width:20%' id='td_datos_5'>".$estado_asignado."</td>
</tr>
</table>";


}
}
     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}



function construir_condicion_busqueda_general_visita_clientes($mysqli, $busqueda)
{
	$busqueda = trim((string)$busqueda);
	if ($busqueda === '') {
		return '';
	}

	$terminos = preg_split('/\s+/', $busqueda);
	$condiciones = array();
	foreach ($terminos as $termino) {
		$termino = trim($termino);
		if ($termino === '') {
			continue;
		}

		$terminoLike = $mysqli->real_escape_string($termino);
		$terminoLike = str_replace(array('%', '_'), array('\\%', '\\_'), $terminoLike);
		$terminoCompacto = str_replace(array(' ', '.', '-', '(', ')', '+'), '', $termino);
		$terminoCompacto = $mysqli->real_escape_string($terminoCompacto === '' ? $termino : $terminoCompacto);
		$terminoCompacto = str_replace(array('%', '_'), array('\\%', '\\_'), $terminoCompacto);

		$condiciones[] = "(
			(select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%".$terminoLike."%'
			or REPLACE(REPLACE(REPLACE((select ci_cliente from cliente where cod_cliente=cod_clienteFK),'.',''),'-',''),' ','') like '%".$terminoCompacto."%'
			or Motivo like '%".$terminoLike."%'
		)";
	}

	return count($condiciones) > 0 ? ' and '.implode(' and ', $condiciones).' ' : '';
}

function  buscarcuentaImpago($tipo,$fecha1,$fecha2,$local,$zona,$cliente,$cobrador,$formato="",$buscar_general='')
{
$mysqli=conectar_al_servidor();


$condicionfecha="";
if($fecha1!="" || $fecha2!=""){
	if($tipo=="compromiso" ){
	$condicionfecha=" and fechaCompro between '$fecha1' and '$fecha2' ";
}else{
	$condicionfecha=" and fecha between '$fecha1' and '$fecha2 23:59:00' ";
}
}

$condicioncliente="";
if($cliente!=""){
	$condicioncliente=" and (select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) like '%$cliente%'";
}
$condicioncobrador="";
if($cobrador!=""){
	$condicioncobrador=" and (select nombre_persona from persona where cod_persona = cod_cobradorFK) like '%$cobrador%'";
}
$condicionzona="";
if($zona!=""){
	$condicionzona=" and (select idzonaFk from cliente where cod_cliente = cod_clienteFK) = '$zona'";
}

$condicionbusquedageneral = construir_condicion_busqueda_general_visita_clientes($mysqli, $buscar_general);





$sql= "select fechaCompro, cod_VisitasCliente, fecha, Motivo, cod_clienteFK, cod_cobradorFK ,(select nombre_persona from persona where cod_persona = cod_cobradorFK) as cobrador , (select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) as cliente , (select nombre from zona where idzona=(select idzonaFk from cliente where cod_cliente = cod_clienteFK)) as zona  from visitascliente  where estado='Activo'
".$condicionbusquedageneral.$condicioncliente.$condicioncobrador.$condicionzona.$condicionfecha." order by fechaCompro asc ";

// echo($sql);
// exit;
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
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



$Motivo = utf8_encode($valor['Motivo']);     
$fecha = utf8_encode($valor['fecha']); 
$cliente = utf8_encode($valor['cliente']);     
$zona = utf8_encode($valor['zona']); 
$cobrador = utf8_encode($valor['cobrador']);  
$fechaCompro = utf8_encode($valor['fechaCompro']);    

$fecha2 = date("d-m-Y", strtotime($fecha));
$fechaCompro2 = date("d-m-Y", strtotime($fechaCompro));

 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_visita" => utf8_encode($valor['cod_VisitasCliente']),
		"id_cliente" => utf8_encode($valor['cod_clienteFK']),
		"id_cobrador" => utf8_encode($valor['cod_cobradorFK']),
		"fecha_visita" => $fecha,
		"fecha_visita_formateada" => $fecha2,
		"cliente" => $cliente,
		"motivo" => $Motivo,
		"cobrador" => $cobrador,
		"zona" => $zona,
		"fecha_compromiso" => $fechaCompro,
		"fecha_compromiso_formateada" => $fechaCompro2,
		"clase_fila" => $styleName
	);
	if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td  style='width:15%'>".$fecha2."</td>
<td   style='width:25%'>".$cliente."</td>
<td  style='width:30%'>".$Motivo."</td>
<td   style='width:15%'>".$cobrador."</td>
<td   style='width:15%'>".$fechaCompro2."</td>
</tr>
</table>";
	}


}
}
     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($devolverArray ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}




function buscarcumpleCliente($local,$Fecha1,$Fecha2,$Zona,$estado,$formato="")
{
	
$mysqli=conectar_al_servidor();

$condicionFecha="";
if($Fecha1!="" && $Fecha2!="" ){
	$condicionFecha=" and DATE_FORMAT(fechanac, '%m-%d')  between  DATE_FORMAT('$Fecha1', '%m-%d')  and DATE_FORMAT('$Fecha2', '%m-%d')  ";
}

$condicionZona="";
if($Zona!=""){
	$condicionZona=" and idzonaFk = '$Zona'";
}

$condicionlocal="";
if($local!=""){
	$condicionlocal=" and (select cod_local from venta where cod_cliente=cod_clienteFK order by cod_venta desc limit 1) = '$local'";
}

$condicionestado="";
if($estado!=""){
	$condicionestado=" and IFNULL((SELECT estado FROM detalle_cliente_cumple WHERE cod_clienteFK = cod_cliente ORDER BY iddetalle_cliente_cumple DESC LIMIT 1),'SIN ESTADO') = '$estado'";
}

$sql= "SELECT DATE_FORMAT(fechanac, '%m-%d') as FechaNac,DATE_FORMAT(fechanac, '%m') as mesNacimiento, accesocredito,cod_cliente,
				IFNULL((SELECT estado FROM detalle_cliente_cumple WHERE cod_clienteFK = cod_cliente ORDER BY iddetalle_cliente_cumple DESC LIMIT 1),'SIN ESTADO') as estado_detalle_cumple,
				(select concat(nombre_persona,' ',apellido_persona) from persona where cod_cliente=cod_persona) as Nombrecliente ,
				(Select telefono from persona where cod_persona=cod_cliente) as Telefono,
			(select concat(puntoexpedicion,'-',num_factura) from venta where cod_cliente=cod_clienteFK order by fecha_venta desc limit 1) as Venta1 ,
			(SELECT nombre FROM mora_cliente WHERE idmora_cliente = cod_tipomora) as tramo,
			(select cod_local from venta where cod_cliente=cod_clienteFK order by cod_venta desc limit 1) as local,
			whapp,
			(select total_venta from venta where cod_cliente=cod_clienteFK order by fecha_venta desc limit 1) as Venta2 ,sms,
				(select nombre from zona where idzona=idzonaFk) as Zona ,fechanac,CONCAT(  case
                  when MONTH(fechanac) < MONTH(CURDATE()) then YEAR(CURDATE()) + 1
                  when MONTH(fechanac) > MONTH(CURDATE()) then YEAR(CURDATE())
                  when DAY(fechanac) <= DAY(CURDATE()) then YEAR(CURDATE()) + 1
                  else YEAR(CURDATE())
                end
              , '-', MONTH(fechanac)
              , '-', DATE_FORMAT(fechanac, '%d')
             ) as cumple 
  FROM cliente WHERE fechanac != '0000-00-00' ".$condicionlocal.$condicionFecha.$condicionZona.$condicionestado." order by cumple asc";
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";


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
 
$MensajeFelicita="";
$MensajePromo="";
 
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$accesocredito = utf8_encode($valor['accesocredito']);
$mesNacimiento = utf8_encode($valor['mesNacimiento']); 
$Nombrecliente = utf8_encode($valor['Nombrecliente']);     
$cumple = utf8_encode($valor['cumple']);          
$fechanac = utf8_encode($valor['fechanac']);          
$Zona = utf8_encode($valor['Zona']); 
$Venta1 = utf8_encode($valor['Venta1']); 
$Venta2 = utf8_encode($valor['Venta2']); 
$Telefono = utf8_encode($valor['Telefono']); 
$sms = utf8_encode($valor['sms']); 
$cod_cliente = utf8_encode($valor['cod_cliente']); 
$tramo = utf8_encode($valor['tramo']); 
$estado_detalle_cumple = utf8_encode($valor['estado_detalle_cumple']); 


		if($Telefono!=""){
			$condicion=$Telefono[0];
		}else{
			$condicion="";
		}
		
$codigo="595";
if($condicion=="+"){
	$codigo="";
}

if($Telefono!="0" && $Telefono!=""){
	
	$Telefono = substr($Telefono, 1);
	
$searchString = " ";
$replaceString = "";
 
$Telefono = str_replace($searchString, $replaceString, $Telefono); 
	
if($sms=="SI"){
	
	if($Fecha1==""){
		$fechacumple=date('m-d');
	}else{
		$fechacumple=substr($Fecha1, 5, 5);
	}
	if($fechanac==$fechacumple && $accesocredito=="Confirmado"){
	$Mensaje1="";
	 $MensajeFelicita.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'   >
<td  style='width:30%'>".$codigo.$Telefono."</td>
<td   style='width:30%'></td>
<td   style='width:40%'>".$Mensaje1."</td>
</tr>
</table>";
	}
	
	if($Fecha1==""){
		$Mescumple=date('m');
	}else{
		$Mescumple=substr($Fecha1, 5, 2);
	}
	
	if($accesocredito=="Confirmado" && $mesNacimiento==$Mescumple ){
	$Mensaje2="";
	$MensajePromo.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'   >
<td  style='width:30%'>".$codigo.$Telefono."</td>
<td   style='width:30%'></td>
<td   style='width:40%'>".$Mensaje2."</td>
</tr>
</table>";
}
	}
}
	 $styleName=CargarStyleTable($styleName);
	 
	 if($Venta2!=""){
		 $Venta2=number_format($Venta2,'0',',','.');
	 }
	 $telefonoListado=$codigo.$Telefono;
	 $ultimaVenta=$Venta1."/".$Venta2;
	 $filas[] = array(
		"id_cliente" => $cod_cliente,
		"fecha_nacimiento" => $fechanac,
		"cliente" => $Nombrecliente,
		"proximo_cumpleanos" => $cumple,
		"zona" => $Zona,
		"telefono" => $telefonoListado,
		"ultima_venta" => $ultimaVenta,
		"tramo" => $tramo,
		"estado_seguimiento" => $estado_detalle_cumple,
		"clase_fila" => $styleName
	 );
	 if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerDatosInformeCumpleCliente(this)' >
<td  id='td_id' style='display:none'>".$cod_cliente."</td>
<td  id='td_datos_1' style='width:10%'>".$fechanac."</td>
<td  id='td_datos_2' style='width:20%'>".$Nombrecliente."</td>
<td  id='td_datos_3' style='width:20%'>".$cumple."</td>
<td id='td_datos_4' style='width:15%'>".$Zona."</td>
<td  style='width:10%'>".$codigo.$Telefono."</td>
<td id='td_datos_5' style='width:15%'>".$Venta1."/".$Venta2."</td>
<td id='' style='width:5%'>".$tramo."</td>
<td id='' style='width:5%'>".$estado_detalle_cumple."</td>
</tr>
</table>";
	 }
	
	
}


}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina) ,"3" => ($nroRegistro),"4" => ($MensajeFelicita) ,"5" => ($MensajePromo) );
echo json_encode($informacion);	
exit;
}


function addImagenes($idcontratofk){
$control=1;
$totalregistrodoc=$_POST['totalregistro'];
$totalregistrodoc = utf8_decode($totalregistrodoc);

$mysqli=conectar_al_servidor();
while($control<=$totalregistrodoc){

$archivo=$_POST['archivo'.$control];
$archivo = utf8_decode($archivo);

$ext=$_POST['ext'.$control];
$ext = utf8_decode($ext);

$descripcion=$_POST['descripcion'.$control];
$descripcion = utf8_decode($descripcion);

$fecha=$_POST['fecha'.$control];
$fecha = utf8_decode($fecha);

$control++;

insertardocumento($idcontratofk,$ext,$archivo,$descripcion,$fecha);
}

$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function insertardocumento($cod_detalle,$exte,$archivo,$descripcion,$fecha)
{
	$documento=substr($archivo, strpos($archivo, ",") + 1);;
	$documento = base64_decode($documento);
	
	$id_documento=rand(10,5000);		  
	$donde="../fotos/FotosDocumento/";
	$id_documento=$cod_detalle;
	
	$id_f=subir_imagen_base64($donde,$documento,$id_documento,$exte);
	$ruta="/GoodVentaElectroCasaMaric/fotos/FotosDocumento/".$cod_detalle.$id_f.'.'.$exte;
	
	CargaDocumento($ruta,$cod_detalle,$descripcion,$fecha);
}
function CargaDocumento($Urldoc,$idcontratofk,$descripcion,$fecha){
	$mysqli=conectar_al_servidor();
	$consulta="INSERT INTO fotos_cliente (url,cod_clienteFK,descripcion,fecha) VALUES ('$Urldoc','$idcontratofk','$descripcion','$fecha') ";
	
$stmt = $mysqli->prepare($consulta);



if ( ! $stmt->execute()) {
   echo "Error";
}
	
}



function buscarDocumentos($codigo,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "SELECT *
				FROM fotos_cliente where cod_clienteFK='$codigo'";
  
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $iddocumento=$valor['idfotos_cliente'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $idcontratoFK=$valor['cod_clienteFK'];
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);

			  $filas[]=array(
				  "codigo_fila" => $codigo,
				  "id_documento" => $iddocumento,
				  "id_cliente" => $idcontratoFK,
				  "url" => $archivourl,
				  "archivo" => "IMAGEN",
				  "descripcion" => $descripcion,
				  "fecha" => $fecha,
				  "extension" => "",
				  "url_temporal" => "",
				  "es_temporal" => false
			  );
			  
			  
		  	  $pagina.="
<table id='$codigo' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistroImagen' onclick='SeleccionarItemImagen(this)' name='tdDetalleItemImagen'>
<td id='td_id_1' style='display:none'>".$codigo."</td>
<td id='td_id_2' style='display:none'>".$iddocumento."</td>
<td id='td_id_3' style='display:none'>".$idcontratoFK."</td>
<td id='td_datos_1' style='display:none'>".$archivourl."</td>
<td id='' style='width:20%'>IMAGEN</td>
<td id='td_datos_2' style='width:60%'>".$descripcion."</td>
<td id='td_datos_3' style='width:20%'>".$fecha."</td>
</tr>
</table>";
			  
			  $codigo="";
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}


function EliminarDocumento($idcontratoFK,$iddocumento,$urldocumento)
{
	$mysqli=conectar_al_servidor();
	$sql= "DELETE FROM fotos_cliente WHERE cod_clienteFK='$idcontratoFK' and idfotos_cliente='$iddocumento'";
 
 
 $file_delete = dirname(__FILE__) . $urldocumento;
 $file_delete = str_replace("/", "\\", $file_delete);
 $file_delete = str_replace("\php", "", $file_delete);
 

  $control = "Fracaso al borrar";
 
 if (file_exists($file_delete)) {
	 if(unlink($file_delete)){
		 $control = "exito";
	 }
	 }
   

   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	
 
mysqli_close($mysqli);
 $informacion =array("1" => $control);
echo json_encode($informacion);	
exit;


}


function buscarDocumentosPrincipal($codigo,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "SELECT idfotos_cliente, url,fecha,cod_clienteFK,
		(SELECT descripcion from descripcion_foto where iddescripcion_foto = fc.descripcion) as descripcion
		FROM fotos_cliente fc where cod_clienteFK='$codigo'";
  
 
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $iddocumento=$valor['idfotos_cliente'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $idcontratoFK=$valor['cod_clienteFK'];
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);

			  $filas[]=array(
				  "codigo_fila" => $codigo,
				  "id_documento" => $iddocumento,
				  "id_cliente" => $idcontratoFK,
				  "url" => $archivourl,
				  "archivo" => "IMAGEN",
				  "descripcion" => $descripcion,
				  "fecha" => $fecha,
				  "extension" => "",
				  "url_temporal" => "",
				  "es_temporal" => false
			  );
			  
			  
		  	  $pagina.="
<table id='$codigo' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistroImagen' onclick='SeleccionarItemImagenPrincipal(this)' name='tdBDClienteFoto' >
<td id='td_id_1' style='display:none'>".$codigo."</td>
<td id='td_id_2' style='display:none'>".$iddocumento."</td>
<td id='td_id_3' style='display:none'>".$idcontratoFK."</td>
<td id='td_datos_1' style='display:none'>".$archivourl."</td>
<td id='' style='width:20%'>IMAGEN</td>
<td id='td_datos_2' style='width:60%'>".$descripcion."</td>
<td id='td_datos_3' style='width:20%'>".$fecha."</td>
</tr>
</table>";
			  
			  $codigo="";
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscarDatalis()
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "select cl.whapp,pr.cod_persona,concat(pr.nombre_persona,' ',pr.apellido_persona) as nombre_persona,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.estado,cl.idzonaFk,foto1,foto2,cl.accesocredito,
(Select nombre from zona where idzonaFk=idzona )as zona ,
cl.totaldias,
cl.lugardetrabajo,
cl.salario,
cl.antiguedad,
cl.teleftrab1,
cl.fechanac,
cl.teleftrab2,
cl.direcciontrab
 from  persona pr inner join  cliente cl on cl.cod_cliente=pr.cod_persona 
where cl.estado='Activo' order by nombre_persona ";
		
   
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
		  
		  
		      $cod_persona=$valor['cod_persona'];
		  	  $ci_cliente=utf8_encode($valor['ci_cliente']);
		  	  $nombre_persona=utf8_encode($valor['nombre_persona']);			  
		  	 
			  $pagina.="<option id='$cod_persona' value='".$ci_cliente." - ".$nombre_persona."'></option>";		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}

function buscarDocumentosGaleriaFoto($idcliente,$descripcion,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 $condicionDescripcion="";
	 if($descripcion!=""){
		 $condicionDescripcion=" and descripcion like '%".$descripcion."%'";
	 }
	 
	 
		$sql= "SELECT *
				FROM fotos_cliente where cod_clienteFK='$idcliente' ".$condicionDescripcion." order by idfotos_cliente asc ";
  
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $iddocumento=$valor['idfotos_cliente'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $idcontratoFK=$valor['cod_clienteFK'];
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);

			  $filas[]=array(
				  "codigo_fila" => $codigo,
				  "id_documento" => $iddocumento,
				  "id_cliente" => $idcontratoFK,
				  "url" => $archivourl,
				  "descripcion" => $descripcion,
				  "fecha" => $fecha
			  );
			  
			  
			   $pagina.="<div class='divFloat2' style='width: 24%;margin: 4px;'>
			  <center>
			  <table class='divMenub2'  id='$codigo'  style='  width: 100%;  height: 230px;  border: 1px solid #aba6a6;'>
				<tr id='tbSelecRegistroImagen' onclick='SeleccionarItemImagenGaleriaFoto(this)' >
				<td>
				<div  class='imgFotoCi' style='background-image: url(".$archivourl.")'></div>
				<center>
		<p class='pTituloC' >".$descripcion."</p>
		<p class='pTituloC'>".$fecha."</p>
		 </center>
				</td>
				
				<td id='td_id_1' style='display:none'>".$codigo."</td>
				<td id='td_id_2' style='display:none'>".$iddocumento."</td>
				<td id='td_id_3' style='display:none'>".$idcontratoFK."</td>
				<td id='td_datos_1' style='display:none'>".$archivourl."</td>
				<td id='td_datos_2' style='display:none'>".$descripcion."</td>
				<td id='td_datos_3' style='display:none'>".$fecha."</td>
				</tr>
				</table>
				</center>
				</div>";
			  
			  // $pagina.=$pagina.$pagina.$pagina.$pagina.$pagina.$pagina.$pagina.$pagina.$pagina.$pagina;
			  
			  $codigo="";
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function NuevoDescripcionFoto($descripcion)
{
	
if($descripcion==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into descripcion_foto (descripcion,estado) values (upper(?),'Activo')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$descripcion);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function NuevoDescripcionUbicacion($descripcion)
{
	
if($descripcion==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into descripcion_ubicacion (descripcion,estado) values (upper(?),'Activo')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$descripcion);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}
function NuevoDescripcionArchivoCliente($descripcion)
{
	
if($descripcion==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into descripcion_archivo (descripcion,estado) values (upper(?),'Activo')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$descripcion);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function buscaroptionDescripcionUbicacion()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from descripcion_ubicacion where estado='Activo' ";
		
		
		 $pagina="<option  value='' >SELECCIONAR</option>";       
   
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
		  
		  
		      $iddescripcion_ubicacion=$valor['iddescripcion_ubicacion'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$iddescripcion_ubicacion' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function buscaroptionDescripcionArchivoCliente()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from descripcion_archivo where estado='Activo' ";
		
		
		 $pagina="<option  value='' >SELECCIONAR</option>";       
   
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
		  
		  
		      $iddescripcion_archivo=$valor['iddescripcion_archivo'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$iddescripcion_archivo' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscaroptionDescripcionFoto()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from descripcion_foto where estado='Activo' order by descripcion asc ";
		
		 $pagina="<option  value='' >SELECCIONAR</option>";       
   
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
		  
		  
		      $iddescripcion_foto=$valor['iddescripcion_foto'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$iddescripcion_foto' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function insertarArchivo($cod_detalle,$exte,$archivo,$descripcion,$fecha)
{
	$documento=substr($archivo, strpos($archivo, ",") + 1);;
	$documento = base64_decode($documento);
	
	$id_documento=rand(10,5000);		  
	$donde="../archivospdf/";
	$id_documento=$cod_detalle;
	
	$id_f=subir_imagen_base64($donde,$documento,$id_documento,$exte);
	$ruta="/GoodVentaElectroCasaMaric/archivospdf/".$cod_detalle.$id_f.'.'.$exte;
	
	CargaArchivoCliente($ruta,$cod_detalle,$descripcion,$fecha);
}
function CargaArchivoCliente($Urldoc,$idcontratofk,$descripcion,$fecha){
	$mysqli=conectar_al_servidor();
	$consulta="INSERT INTO archivos_cliente (url,cod_clienteFK,descripcion,fecha) VALUES ('$Urldoc','$idcontratofk','$descripcion','$fecha') ";
	
$stmt = $mysqli->prepare($consulta);



if (!$stmt->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli); 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
function EliminarDocumentoArchivoCliente($idcontratoFK,$iddocumento,$urldocumento)
{
	$mysqli=conectar_al_servidor();
	$sql= "DELETE FROM archivos_cliente WHERE cod_clienteFK='$idcontratoFK' and idarchivos_cliente='$iddocumento'";
 
 
 $file_delete = dirname(__FILE__) . $urldocumento;
 $file_delete = str_replace("/", "\\", $file_delete);
 $file_delete = str_replace("\php", "", $file_delete);
 $file_delete = str_replace("_", "\\", $file_delete);
 $file_delete = str_replace("\system", "", $file_delete);
 
 
$control = "Fracaso al borrar";

if (file_exists($file_delete)) {
    if (unlink($file_delete)) {
        $control = "exito";
    } else {
        $control = "Fracaso al borrar: " . error_get_last()['message'];
    }
} else {
    $control = "El archivo no existe";
}
   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	
 
mysqli_close($mysqli);
 $informacion =array("1" => $control);
echo json_encode($informacion);	
exit;


}
function buscarDocumentosCargaArchivo($codigo,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "SELECT *
				FROM archivos_cliente where cod_clienteFK='$codigo'";
  
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idarchivos_cliente=$valor['idarchivos_cliente'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $idclienteFK=$valor['cod_clienteFK'];
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);
			  $filas[]=array(
				  "codigo_fila" => $codigo,
				  "id_archivo" => $idarchivos_cliente,
				  "id_cliente" => $idclienteFK,
				  "url" => $archivourl,
				  "tipo" => "PDF",
				  "descripcion" => $descripcion,
				  "fecha" => $fecha
			  );
			  
			  if($formato!='json'){
		  	  $pagina.="
<table id='$codigo' class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistroArchivo' onclick='SeleccionarItemArchivosCliente(this)' name='tableRegistroSelec'>
<td id='td_id_1' style='display:none'>".$codigo."</td>
<td id='td_id_2' style='display:none'>".$idarchivos_cliente."</td>
<td id='td_id_3' style='display:none'>".$idclienteFK."</td>
<td id='td_datos_1' style='display:none'>".$archivourl."</td>
<td id='' style='width:20%'>PDF</td>
<td id='td_datos_2' style='width:60%'>".$descripcion."</td>
<td id='td_datos_3' style='width:20%'>".$fecha."</td>
</tr>
</table>";
			  
			  $codigo="";
	  }
 }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}


function NuevoMotivoMovimientoStock($descripcion)
{
	
if($descripcion==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into motivo_movimiento_stock (descripcion,estado) values (upper(?),'Activo')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$descripcion);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function buscaroptionMotivoMovimiento()
{
	$mysqli=conectar_al_servidor();
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$filas=array();
	
		$sql= "Select * from motivo_movimiento_stock where estado='Activo' ";
		
		
		 $pagina="<option  value='' >SELECCIONAR</option>";       
   
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
		  
		  
		      $idmotivo_movimiento_stock=$valor['idmotivo_movimiento_stock'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
			  $filas[]=array(
				  "codigo" => $idmotivo_movimiento_stock,
				  "descripcion" => $descripcion,
				  "estado" => utf8_encode($valor['estado'])
			  );
				  	 
		  	 
			    	
			  $pagina.="<option  value='$idmotivo_movimiento_stock' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 if($formato=='json'){
	 $pagina=$filas;
 }
 $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscar_informe_ubicacion_fotos_cliente($fecha1,$fecha2,$cod_localFK,$cliente,$usuario,$fecha,$formato='')
{
$mysqli=conectar_al_servidor();
$devolverArray = strtolower((string)$formato) === 'json';
$filas = array();


$condicionrangofecha="";
if($fecha1!=""){
$condicionrangofecha=" and  fecha >= '$fecha1' and fecha <= '$fecha2'";
}

$condicionfecha="";
if($fecha!=""){
$condicionfecha=" and fecha = '$fecha'";
}

$condicioncliente="";
if($cliente!=""){
$condicioncliente=" and (SELECT concat(nombre_persona,' ',apellido_persona) FROM persona where cod_persona = cod_clienteFk) like '%".$cliente."%'";
}

$condicionusuario="";
if($usuario!=""){
$condicionusuario=" and  (SELECT nombre_persona from persona where cod_persona = cod_cobradorFK) like '%".$usuario."%'";
}

$condicionlocal="";
if($cod_localFK!=""){
$condicionlocal=" and  (SELECT cod_localFK from cobrador where cod_cobrador = cod_cobradorFK) = '$cod_localFK'";
}


$sql= "SELECT idfotos_cliente,lat,lot,cod_clienteFk,fecha,cod_cobradorFK,descripcion,
(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona where cod_persona = cod_clienteFk) as cliente,
(SELECT nombre_persona from persona where cod_persona = cod_cobradorFK) as usuario,
(SELECT descripcion from descripcion_foto where iddescripcion_foto = fotos_cliente.descripcion) as descripcion,
(SELECT nombre from local where cod_local = (SELECT cod_localFK from cobrador where cod_cobrador = cod_cobradorFK)) as local
FROM fotos_cliente where idfotos_cliente != '' ".$condicioncliente.$condicionusuario.$condicionfecha.$condicionrangofecha.$condicionlocal." order by fecha limit 100";



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
$idfotos_cliente = utf8_encode($valor['idfotos_cliente']); 
$lat = utf8_encode($valor['lat']); 
$lot = utf8_encode($valor['lot']); 
$descripcion = utf8_encode($valor['descripcion']); 
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 
$fecha = utf8_encode($valor['fecha']); 
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']); 
$cliente = utf8_encode($valor['cliente']); 
$usuario = utf8_encode($valor['usuario']); 
$local = utf8_encode($valor['local']); 

$filas[] = array(
	"id_foto" => $idfotos_cliente,
	"latitud" => $lat,
	"longitud" => $lot,
	"cliente" => $cliente,
	"fecha" => $fecha,
	"descripcion" => $descripcion,
	"usuario" => $usuario,
	"local" => $local,
	"cod_cliente" => $cod_clienteFk,
	"cod_usuario" => $cod_cobradorFK
);

if(!$devolverArray){
 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosinformeubicacionesfotocliente(this)'>
<td  id='' style='display:none'>".$idfotos_cliente."</td>
<td  id='td_datos_1' style='display:none'>".$lat."</td>
<td  id='td_datos_2' style='display:none'>".$lot."</td>
<td  id='' style='width:30%'>".$cliente."</td>
<td  id='' style='width:10%'>".$fecha."</td>
<td id='' style='width:10%'>".$descripcion."</td>
<td  id='' style='width:10%'>".$usuario."</td>
<td  id='td_datos_4' style='width:10%'>".$local."</td>
</tr>
</table>";
}


}
}


mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscar_informe_ubicaciones_cliente($fecha1,$fecha2,$cod_localFK,$cliente,$usuario,$fecha,$formato='')
{
$mysqli=conectar_al_servidor();
$devolverArray = strtolower((string)$formato) === 'json';
$filas = array();


$condicionrangofecha="";
if($fecha1!=""){
$condicionrangofecha=" and  fecha >= '$fecha1' and fecha <= '$fecha2'";
}

$condicionfecha="";
if($fecha!=""){
$condicionfecha=" and fecha = '$fecha'";
}

$condicioncliente="";
if($cliente!=""){
$condicioncliente=" and (SELECT concat(nombre_persona,' ',apellido_persona) FROM persona where cod_persona = cod_clienteFk) like '%".$cliente."%'";
}

$condicionusuario="";
if($usuario!=""){
$condicionusuario=" and  (SELECT nombre_persona from persona where cod_persona = cod_cobradorFK) like '%".$usuario."%'";
}

$condicionlocal="";
if($cod_localFK!=""){
$condicionlocal=" and  (SELECT cod_localFK from cobrador where cod_cobrador = cod_cobradorFK) = '$cod_localFK'";
}


$sql= "SELECT idubicaciones,lat,lot,descripcion,cod_clienteFk,fecha,cod_cobradorFK,
(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona where cod_persona = cod_clienteFk) as cliente,
(SELECT nombre_persona from persona where cod_persona = cod_cobradorFK) as usuario,
(SELECT nombre from local where cod_local = (SELECT cod_localFK from cobrador where cod_cobrador = cod_cobradorFK)) as local
FROM ubicaciones where idubicaciones != '' ".$condicioncliente.$condicionusuario.$condicionfecha.$condicionrangofecha.$condicionlocal." order by fecha limit 100";


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
$idubicaciones = utf8_encode($valor['idubicaciones']); 
$lat = utf8_encode($valor['lat']); 
$lot = utf8_encode($valor['lot']); 
$descripcion = utf8_encode($valor['descripcion']); 
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 
$fecha = utf8_encode($valor['fecha']); 
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']); 
$cliente = utf8_encode($valor['cliente']); 
$usuario = utf8_encode($valor['usuario']); 
$local = utf8_encode($valor['local']); 

$filas[] = array(
	"id_ubicacion" => $idubicaciones,
	"latitud" => $lat,
	"longitud" => $lot,
	"cliente" => $cliente,
	"fecha" => $fecha,
	"descripcion" => $descripcion,
	"usuario" => $usuario,
	"local" => $local,
	"cod_cliente" => $cod_clienteFk,
	"cod_usuario" => $cod_cobradorFK
);

if(!$devolverArray){
 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosinformeubicacionescliente(this)'>
<td  id='' style='display:none'>".$idubicaciones."</td>
<td  id='td_datos_1' style='display:none'>".$lat."</td>
<td  id='td_datos_2' style='display:none'>".$lot."</td>
<td  id='' style='width:30%'>".$cliente."</td>
<td  id='' style='width:10%'>".$fecha."</td>
<td id='' style='width:10%'>".$descripcion."</td>
<td  id='' style='width:10%'>".$usuario."</td>
<td  id='td_datos_4' style='width:10%'>".$local."</td>
</tr>
</table>";


}
}
}


mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function cargarcsv(){
	$nombreArchivo = generarCodigoAleatorio(7);
	$ruta="/archivoscsv";
	$nombrePost = 'csvMensaje';
	$respuesta = mover_archivo_carpeta_cliente($ruta,$nombreArchivo,$nombrePost,'csv');
	
	if($respuesta[0]){
		if (($handle = fopen($respuesta[1], "r")) !== false) {
        
        
        // Leer cada línea del archivo
        while (($data = fgetcsv($handle, 1000, ",")) !== false) {
           
            // foreach ($data as $cell) {
               // echo htmlspecialchars($cell);
            // }
			
			$partes = explode(";", $data[0]);
			
			ingresar_clientes($partes[1],$partes[0],$partes[2],$partes[3]);
			
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


function ingresar_clientes($nombre,$telefono,$documento,$zona)
{

	$mysqli=conectar_al_servidor();
	
	if($zona == ''){
		$zona = 'SIN ZONA';
	}
	
    $consulta="insert into nuevos_cliente (nombre,telefono,documento,zona,estado_asignado) values (upper(?),?,?,upper(?),'NO ASIGNADO')";
    $stmt = $mysqli->prepare($consulta);

 
 $stmt->bind_param("ssss", $nombre,$telefono,$documento,$zona);
	
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 mysqli_close($mysqli);	
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


function cargar_detalle_clientes_cumple($cod_cliente,$descripcion,$estado_cliente)
{
	$user = $_POST['useru'];
	$user = utf8_decode($user);
	$fecha_insert = date('Y-m-d');
	
	
	$mysqli = conectar_al_servidor();
	$consulta1 = "INSERT INTO detalle_cliente_cumple (observacion,cod_clienteFK,fecha_insert,estado,user_insert) values ('$descripcion','$cod_cliente','$fecha_insert','$estado_cliente','$user')";
	
	$stmt1 = $mysqli->prepare($consulta1);

	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	
	mysqli_close($mysqli);
	$informacion = array("1" => "exito");
	echo json_encode($informacion);
	exit;
}
function buscarCargarDetalleCliente($cod_cliente,$formato="")
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $devolverArray=strtolower($formato)==="json";
		$sql= "SELECT iddetalle_cliente_cumple, estado, observacion, user_insert,fecha_insert,
			(SELECT nombre_persona FROM persona WHERE cod_persona = cod_clienteFK) as cliente
		FROM detalle_cliente_cumple where cod_clienteFK='$cod_cliente'";
  
   
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
		  
		  
		      $iddetalle_cliente_cumple=$valor['iddetalle_cliente_cumple'];
		  	  $estado=utf8_encode($valor['estado']);
		  	  $observacion=utf8_encode($valor['observacion']);
		  	  $fecha_insert=utf8_encode($valor['fecha_insert']);
		  	  $user_insert=utf8_encode($valor['user_insert']);
		  	  $cliente=utf8_encode($valor['cliente']);
		  	 
		  	 
		  
		  
			  $filas[] = array(
				"id_detalle" => utf8_encode($iddetalle_cliente_cumple),
				"cliente" => $cliente,
				"observacion" => $observacion,
				"fecha" => $fecha_insert,
				"estado" => $estado,
				"usuario" => $user_insert,
				"clase_fila" => "tableRegistroSearch"
			  );
			  if(!$devolverArray){
			  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' >
<td style='width:30%'>".$observacion."</td>
<td style='width:30%'>".$fecha_insert."</td>
<td style='width:30%'>".$estado."</td>
</tr>
</table>";
}
			  }
			  }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina));
echo json_encode($informacion);	
exit;


}

function buscarSiExisteCliente($ci_cliente)
{

if($ci_cliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 


$consulta= "Select count(*) from cliente where (ci_cliente=? or rut_cliente =?) and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='ss';
$stmt->bind_param($ss, $ci_cliente,$ci_cliente); 


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nro_total=$result->fetch_row();
 $valor=$nro_total[0];
/* if($valor>=1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
 */


 mysqli_close($mysqli);
$informacion =array("1" => "exito","2"=>$valor);
echo json_encode($informacion);	
exit;
}

/*Buscar Registro en vista*/
function buscarFrmInformeGeneralCuentasCliente($Cliente)
{
$mysqli=conectar_al_servidor();


$condicioncliente="";
if($Cliente!=""){
$condicioncliente="and concat(nombre_persona,' ',apellido_persona,' ',cl.ci_cliente) like '%".$Cliente."%' ";
}

$sql= "select cl.cod_cliente,
(Select nombre from zona where idzonaFk=idzona )as zona,
(SELECT nombre FROM mora_cliente WHERE idmora_cliente = cl.cod_tipomora) as tipo_mora,
cl.tipo_cliente,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
concat(nombre_persona,' ',apellido_persona) as cliente
 from cliente cl inner join   persona pr on cl.cod_cliente=pr.cod_persona 
where cl.estado='Activo' ".$condicioncliente."  order by cod_cliente desc limit 100";
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

$cod_cliente = utf8_encode($valor['cod_cliente']);       
$nombre_persona = utf8_encode($valor['cliente']);          
$rut_cliente = utf8_encode($valor['rut_cliente']); 
$whapp = utf8_encode($valor['whapp']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$tipo_mora = utf8_encode($valor['tipo_mora']); 
$tipo_cliente = utf8_encode($valor['tipo_cliente']); 


	  $pagina.="<div class='col-12 col-sm-6 col-md-4 col-lg-3' >
					<div class='card shadow-sm border border-light mb-3'>
					  <div class='card-body text-center'>
						<p class='fw-bold mb-3' style='font-size: 15px; border-bottom: double;'>
						  DATOS CLIENTE
						</p>
						<div class='text-start'>
						  <p class='mb-1 small text-secondary'>
							CLIENTE: <span class='fw-semibold text-dark'>".$nombre_persona."</span>
						  </p>
						  <p class='mb-1 small text-secondary'>
							NRO CI: <span class='fw-semibold text-dark'>".$ci_cliente."</span>
						  </p> 
						  <p class='mb-1 small text-secondary'>
							MORA: <span class='fw-semibold text-dark'>".$tipo_mora."</span>
						  </p>
						  <p class='mb-1 small text-secondary'>
							TIPO: <span class='fw-semibold text-dark'>".$tipo_cliente."</span>
						  </p>
						</div>

						<button onclick='verCerrarDetalleCuentaCliente(".$cod_cliente.")' 
								class='btn btn-sm btn-primary mt-3'>
						  Seleccionar
						</button>
					  </div>
					</div>
				</div> ";


}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina));
echo json_encode($informacion);	
exit;
}

function cuentaGeneralClienteTexto($valor)
{
	if ($valor === null || $valor === "") {
		return "-";
	}
	return htmlspecialchars(utf8_encode($valor), ENT_QUOTES, "UTF-8");
}

function cuentaGeneralClienteMonto($valor)
{
	return number_format((float)$valor, 0, ",", ".");
}

function cuentaGeneralClienteFecha($fecha)
{
	if ($fecha === null || $fecha == "" || $fecha == "0000-00-00") {
		return "-";
	}
	$timestamp = strtotime($fecha);
	if ($timestamp === false) {
		return cuentaGeneralClienteTexto($fecha);
	}
	return date("d-m-Y", $timestamp);
}

function cuentaGeneralClienteCalificacion($promedioDias, $calificacionCliente)
{
	$calificacionCliente = trim($calificacionCliente);
	if ($calificacionCliente != "" && $calificacionCliente != "SIN REGISTRO") {
		return cuentaGeneralClienteTexto($calificacionCliente);
	}
	if ($promedioDias <= 0) {
		return "Excelente";
	}
	if ($promedioDias <= 30) {
		return "Bueno";
	}
	return "Insuficiente";
}

function buscarDetalleVentaCuentaGeneralCliente($mysqli, $CodVenta)
{
	$sql = "select cantidad_detalle, precio_producto, subtotal,
	(select nombre_producto from producto where cod_producto=cod_productoFK) as NombreProducto
	from detalle_venta
	where cod_ventaFK=?";

	$pagina = "";
	$mercaderia = "";
	$stmt = $mysqli->prepare($sql);
	if (!$stmt) {
		return array("html" => "", "mercaderia" => "-");
	}
	$stmt->bind_param("s", $CodVenta);
	if (!$stmt->execute()) {
		return array("html" => "", "mercaderia" => "-");
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$cantidad = $valor["cantidad_detalle"];
		$precio = $valor["precio_producto"];
		$subtotal = $valor["subtotal"];
		$producto = $valor["NombreProducto"];

		if ($mercaderia == "") {
			$mercaderia = cuentaGeneralClienteTexto($producto);
		}

		$pagina .= "
			<tr>
				<td>".cuentaGeneralClienteTexto($cantidad)."</td>
				<td>".cuentaGeneralClienteTexto($producto)."</td>
				<td class='texto-derecha'>".cuentaGeneralClienteMonto($precio)."</td>
				<td class='texto-derecha'>".cuentaGeneralClienteMonto($subtotal)."</td>
			</tr>";
	}

	if ($pagina == "") {
		$pagina = "<tr><td colspan='4' class='text-center text-secondary'>Sin detalle de productos.</td></tr>";
	}
	if ($mercaderia == "") {
		$mercaderia = "-";
	}

	return array("html" => $pagina, "mercaderia" => $mercaderia);
}

function buscarCuotasVentaCuentaGeneralCliente($mysqli, $cod_venta, $fechahoy)
{
	$sql = "SELECT cr.plazo, cr.fechapago, cr.cod_venta, cr.Monto, cr.idcredito, cr.Esado,
	cr.Nro_recibo, cr.dias, cr.totalinteres, cr.descuento, vt.pago AS entrega,
	vt.num_factura, vt.puntoexpedicion, vt.tipo_comprobante,
	IFNULL((SELECT count(fecha) FROM cancelaciones WHERE cod_venta=vt.cod_venta LIMIT 1),0) as nroCancelado,
	(SELECT pg.Fecha FROM pago pg WHERE pg.cod_creditoFK=cr.idcredito ORDER BY pg.Fecha DESC, pg.hora DESC LIMIT 1) as fechapagado,
	(SELECT pg.nrofactura FROM pago pg WHERE pg.cod_creditoFK=cr.idcredito ORDER BY pg.Fecha DESC, pg.hora DESC LIMIT 1) as nrorecibo_pago,
	IFNULL((SELECT SUM(pg.Monto) FROM pago pg WHERE pg.cod_creditoFK=cr.idcredito AND pg.Tipo='Pago Cuota'),0) as pago_cuota,
	IFNULL((SELECT SUM(pg.Monto) FROM pago pg WHERE pg.cod_creditoFK=cr.idcredito AND pg.Tipo='Interes'),0) as pago_interes
	FROM credito cr
	INNER JOIN venta vt ON vt.cod_venta = cr.cod_venta
	WHERE vt.cod_venta=?
	GROUP BY cr.idcredito
	ORDER BY cr.cod_venta ASC, cr.fechapago ASC";

	$stmt = $mysqli->prepare($sql);
	if (!$stmt) {
		return array("html" => "", "total_monto" => 0, "total_pagado" => 0, "total_interes" => 0, "total_deuda" => 0, "dias_atraso" => 0, "cantidad_atraso" => 0, "cuotas_vencidas" => 0, "deuda_vencida" => 0);
	}
	$stmt->bind_param("s", $cod_venta);
	if (!$stmt->execute()) {
		return array("html" => "", "total_monto" => 0, "total_pagado" => 0, "total_interes" => 0, "total_deuda" => 0, "dias_atraso" => 0, "cantidad_atraso" => 0, "cuotas_vencidas" => 0, "deuda_vencida" => 0);
	}

	$result = $stmt->get_result();
	$pagina = "";
	$totalMonto = 0;
	$totalPagado = 0;
	$totalInteres = 0;
	$totalDeuda = 0;
	$diasAtraso = 0;
	$cantidadAtraso = 0;
	$cuotasVencidas = 0;
	$deudaVencida = 0;

	while ($valor = mysqli_fetch_assoc($result)) {
		$idcredito = $valor["idcredito"];
		$plazo = $valor["plazo"];
		$fechapagoOriginal = $valor["fechapago"];
		$monto = $valor["Monto"];
		$nroCancelado = $valor["nroCancelado"];
		$fechapagado = $valor["fechapagado"];
		$nroRecibo = $valor["nrorecibo_pago"] != "" ? $valor["nrorecibo_pago"] : $valor["Nro_recibo"];
		$tipoComprobante = $valor["tipo_comprobante"];
		$puntoexpedicion = $valor["puntoexpedicion"];
		$numFactura = $valor["num_factura"];
		$nroFactura = $puntoexpedicion != "" ? $puntoexpedicion."-".$numFactura : $numFactura;
		$pagoCuota = (float)$valor["pago_cuota"];
		$pagoInteres = (float)$valor["pago_interes"];

		$datos = calcularintereses2($idcredito, 0, 0, "2", "2", "1", "no");
		$descuento = $datos[0];
		$interesCalculado = $datos[1];
		$interes = $pagoInteres > 0 ? $pagoInteres : $interesCalculado;
		$total = $datos[2];
		$totalPago = $pagoCuota;
		$deudaActual = $datos[4];

		$diff = 0;
		if ($fechapagado != "" && $fechapagado != "0000-00-00") {
			$diff = (strtotime($fechapagado) - strtotime($fechapagoOriginal)) / 86400;
		} elseif (strtotime($fechapagoOriginal) < strtotime($fechahoy)) {
			$diff = (strtotime($fechahoy) - strtotime($fechapagoOriginal)) / 86400;
		}
		$diff = (int)$diff;
		if ($diff < 0) {
			$diff = 0;
		}

		if ($nroCancelado <= 0) {
			$totalMonto += $monto;
			$totalPagado += $totalPago;
			$totalInteres += $interes;
			$totalDeuda += $deudaActual;
			if ($diff > 0) {
				$diasAtraso += $diff;
				$cantidadAtraso++;
			}
			if ($deudaActual > 0 && strtotime($fechapagoOriginal) < strtotime($fechahoy)) {
				$cuotasVencidas++;
				$deudaVencida += $deudaActual;
			}
		}

		$estadoClase = "cuota-pendiente";
		if ($totalPago > 0 && $diff <= 0) {
			$estadoClase = "cuota-pago-dia";
		}
		if ($totalPago > 0 && $diff > 0) {
			$estadoClase = "cuota-pago-mora";
		}
		if ($totalPago <= 0 && $deudaActual > 0 && strtotime($fechapagoOriginal) < strtotime($fechahoy)) {
			$estadoClase = "cuota-vencida-sin-pago";
		}

		$pagadoTexto = $totalPago > 0 ? "-".cuentaGeneralClienteMonto($totalPago) : "0";

		$pagina .= "
			<tr class='".$estadoClase."'>
				<td>".cuentaGeneralClienteTexto($tipoComprobante)."</td>
				<td>".cuentaGeneralClienteTexto($nroFactura)."</td>
				<td>".cuentaGeneralClienteTexto($nroRecibo)."</td>
				<td>".cuentaGeneralClienteTexto($plazo)."</td>
				<td>".cuentaGeneralClienteFecha($fechapagoOriginal)."</td>
				<td>".cuentaGeneralClienteFecha($fechapagado)."</td>
				<td class='texto-derecha'>".cuentaGeneralClienteMonto($monto)."</td>
				<td class='texto-derecha'>".$pagadoTexto."</td>
				<td class='texto-centro'>".$diff."</td>
				<td class='texto-derecha'>".cuentaGeneralClienteMonto($interes)."</td>
			</tr>";
	}

	if ($pagina == "") {
		$pagina = "<tr><td colspan='10' class='text-center text-secondary'>Sin cuotas registradas.</td></tr>";
	}

	return array(
		"html" => $pagina,
		"total_monto" => $totalMonto,
		"total_pagado" => $totalPagado,
		"total_interes" => $totalInteres,
		"total_deuda" => $totalDeuda,
		"dias_atraso" => $diasAtraso,
		"cantidad_atraso" => $cantidadAtraso,
		"cuotas_vencidas" => $cuotasVencidas,
		"deuda_vencida" => $deudaVencida
	);
}

function buscarDetallesInformeGeneralCuentasCliente($cod_cliente,$tipo_cuenta,$tipo_venta)
{
	$mysqli = conectar_al_servidor();
	$fechahoy = date("Y-m-d");
	$tipo_cuenta = strtoupper(trim($tipo_cuenta));
	$tipo_venta = strtoupper(trim($tipo_venta));
	$condiciontipoventa = "";
	if ($tipo_venta == "CONTADO" || $tipo_venta == "CREDITO") {
		$condiciontipoventa = " and vt.TipoVenta ='".$mysqli->real_escape_string($tipo_venta)."'";
	}

	$sql = "Select tipo_comprobante,puntoexpedicion,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2,vt.cod_venta,comision,cod_local,pago,vt.idGaranteFk,
	(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
	(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
	(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
	(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.idGaranteFk) as Garante,
	(Select ci_cliente from cliente where cod_cliente=vt.idGaranteFk) as GaranteDocumento,
	(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
	(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as documento_cliente,
	IFNULL((Select calificacion_cliente from cliente where cod_cliente=vt.cod_clienteFK),'SIN REGISTRO') as calificacion_cliente,
	(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
	(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
	(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
	(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA') as nroCouta,
	IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
	IFNULL((Select sum(descuento) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalDescuentodetalle
	from venta vt
	where vt.cod_clienteFK = ? and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ".$condiciontipoventa."
	order by vt.fecha_venta desc, vt.cod_venta desc";

	$stmt = $mysqli->prepare($sql);
	if (!$stmt) {
		$informacion = array("1" => "error", "2" => "<div class='sin-registros'><p>No se pudo preparar el extracto del cliente.</p></div>");
		echo json_encode($informacion);
		exit;
	}
	$stmt->bind_param("s", $cod_cliente);
	if (!$stmt->execute()) {
		$informacion = array("1" => "error", "2" => "<div class='sin-registros'><p>No se pudo consultar el extracto del cliente.</p></div>");
		echo json_encode($informacion);
		exit;
	}

	$result = $stmt->get_result();
	$paginaVentas = "";
	$clienteNombre = "";
	$documentoCliente = "";
	$totalGeneralVenta = 0;
	$totalGeneralPagado = 0;
	$totalGeneralDeuda = 0;
	$totalDiasAtraso = 0;
	$totalCantidadAtraso = 0;
	$totalCuotasVencidas = 0;
	$totalDeudaVencida = 0;
	$ventasRenderizadas = 0;

	while ($valor = mysqli_fetch_assoc($result)) {
		$codVenta = $valor["cod_venta"];
		$datosVenta = calcularintereses2($codVenta, 0, 0, "2", "2", "2", "no");
		$totalPagadoVenta = $datosVenta[13];
		$deudaVenta = $datosVenta[2];

		if ($tipo_cuenta == "PENDIENTES" && $deudaVenta <= 0) {
			continue;
		}
		if ($tipo_cuenta == "PAGADOS" && $deudaVenta > 0) {
			continue;
		}

		if ($clienteNombre == "") {
			$clienteNombre = cuentaGeneralClienteTexto($valor["clientenombre"]);
			$documentoCliente = cuentaGeneralClienteTexto($valor["documento_cliente"]);
		}
		$ventasRenderizadas++;

		$factura = $valor["puntoexpedicion"] != "" ? $valor["puntoexpedicion"]."-".$valor["num_factura"] : $valor["num_factura"];
		$detalleVenta = buscarDetalleVentaCuentaGeneralCliente($mysqli, $codVenta);
		$cuotas = buscarCuotasVentaCuentaGeneralCliente($mysqli, $codVenta, $fechahoy);
		$promedioAtraso = $cuotas["cantidad_atraso"] > 0 ? round($cuotas["dias_atraso"] / $cuotas["cantidad_atraso"]) : 0;
		$calificacionCredito = cuentaGeneralClienteCalificacion($promedioAtraso, $valor["calificacion_cliente"]);
		$estadoVentaClase = $deudaVenta > 0 ? "cuenta-cliente-venta--pendiente" : "cuenta-cliente-venta--pagada";
		$estadoVentaTexto = $deudaVenta > 0 ? "Cuenta pendiente" : "Cuenta pagada";
		$garanteValor = isset($valor["Garante"]) ? $valor["Garante"] : "";
		$garanteDocumentoValor = isset($valor["GaranteDocumento"]) ? $valor["GaranteDocumento"] : "";
		$vendedor1 = isset($valor["nombrevendedor1"]) ? $valor["nombrevendedor1"] : "";
		$vendedor2 = isset($valor["nombrevendedor2"]) ? $valor["nombrevendedor2"] : "";
		$garante = trim($garanteValor) != "" ? $garanteValor : "-";
		$garanteDocumento = trim($garanteDocumentoValor) != "" ? $garanteDocumentoValor : "-";
		$vendedor = trim($vendedor1) != "" ? $vendedor1 : $vendedor2;
		$cuotasTexto = $valor["TipoVenta"] == "CREDITO" ? $valor["nroCouta"]."/".buscarcantidadcuotapagados($codVenta) : "CONTADO";

		$totalGeneralVenta += $valor["total_venta"];
		$totalGeneralPagado += $totalPagadoVenta;
		$totalGeneralDeuda += $deudaVenta;
		$totalDiasAtraso += $cuotas["dias_atraso"];
		$totalCantidadAtraso += $cuotas["cantidad_atraso"];
		$totalCuotasVencidas += $cuotas["cuotas_vencidas"];
		$totalDeudaVencida += $cuotas["deuda_vencida"];

		$paginaVentas .= "
		<article class='cuenta-cliente-venta ".$estadoVentaClase."'>
			<div class='cuenta-cliente-acciones'>
				<button type='button' class='btnToggleCredito' onclick=\"toggleCredito('$codVenta',this)\">+ Ver cuotas</button>
				<button type='button' class='btnToggleCredito cuenta-cliente-btn-imprimir' onclick=\"imprimir_expediente('$codVenta')\">Imprimir</button>
				<span class='cuenta-cliente-estado'>".$estadoVentaTexto."</span>
			</div>

			<div class='cuenta-cliente-venta-info'>
				<div><span>Nro Factura:</span><strong>".cuentaGeneralClienteTexto($factura)."</strong></div>
				<div><span>Fecha emision:</span><strong>".cuentaGeneralClienteFecha($valor["fecha_venta"])."</strong></div>
				<div><span>Vendedor:</span><strong>".cuentaGeneralClienteTexto($vendedor)."</strong></div>
				<div><span>Mercaderia:</span><strong>".($detalleVenta["mercaderia"])."</strong></div>
				<div><span>Cobrador:</span><strong>".cuentaGeneralClienteTexto($valor["cobradornombre"])."</strong></div>
				<div><span>Garante:</span><strong>".cuentaGeneralClienteTexto($garante)."</strong></div>
				<div><span>CI garante:</span><strong>".cuentaGeneralClienteTexto($garanteDocumento)."</strong></div>
				<div><span>Condicion:</span><strong>".cuentaGeneralClienteTexto($valor["TipoVenta"])."</strong></div>
				<div><span>Cuotas:</span><strong>".cuentaGeneralClienteTexto($cuotasTexto)."</strong></div>
			</div>

			<div class='cuenta-cliente-seccion'>
				<h6>Detalle de venta</h6>
				<table class='cuenta-cliente-tabla'>
					<thead>
						<tr>
							<th>Cantidad</th>
							<th>Producto</th>
							<th class='texto-derecha'>Precio</th>
							<th class='texto-derecha'>Total</th>
						</tr>
					</thead>
					<tbody>".$detalleVenta["html"]."</tbody>
				</table>
			</div>

			<div class='cuenta-cliente-seccion cuenta-cliente-cuotas' name='Credito_$codVenta' style='display:none'>
				<h6>Detalle de cuotas</h6>
				<table class='cuenta-cliente-tabla cuenta-cliente-tabla--cuotas'>
					<thead>
						<tr>
							<th>Tipo</th>
							<th>Numero</th>
							<th>Nro Recibo</th>
							<th>Cuotas</th>
							<th>Venc.</th>
							<th>Cancelado</th>
							<th class='texto-derecha'>Monto cuota</th>
							<th class='texto-derecha'>Pagado</th>
							<th class='texto-centro'>D. Atraso</th>
							<th class='texto-derecha'>Interes</th>
						</tr>
					</thead>
					<tbody>".$cuotas["html"]."</tbody>
					<tfoot>
						<tr>
							<td colspan='6'>Totales Factura:</td>
							<td class='texto-derecha'>".cuentaGeneralClienteMonto($cuotas["total_monto"])."</td>
							<td class='texto-derecha'>-".cuentaGeneralClienteMonto($cuotas["total_pagado"])."</td>
							<td></td>
							<td class='texto-derecha'>".cuentaGeneralClienteMonto($cuotas["total_interes"])."</td>
						</tr>
					</tfoot>
				</table>
			</div>

			<div class='cuenta-cliente-resumen-venta'>
				<div><span>Promedio de atrasos en pagos (dias):</span><strong>".$promedioAtraso."</strong></div>
				<div><span>Calificacion Credito:</span><strong>".$calificacionCredito."</strong></div>
				<div><span>Total venta:</span><strong>".cuentaGeneralClienteMonto($valor["total_venta"])."</strong></div>
				<div><span>Pagado:</span><strong>".cuentaGeneralClienteMonto($totalPagadoVenta)."</strong></div>
				<div><span>Deuda:</span><strong>".cuentaGeneralClienteMonto($deudaVenta)."</strong></div>
			</div>
		</article>";
	}

	if ($paginaVentas == "") {
		$pagina1 = "<div class='sin-registros'><p>Sin registros</p></div>";
	} else {
		$promedioGeneral = $totalCantidadAtraso > 0 ? round($totalDiasAtraso / $totalCantidadAtraso) : 0;
		$pagina1 = "
		<div class='cuenta-cliente-extracto'>
			<div class='cuenta-cliente-cabecera'>
				<div><span>C.I/RUC:</span><strong>".$documentoCliente."</strong></div>
				<div><span>Apellido, Nombre:</span><strong>".$clienteNombre."</strong></div>
				<div><span>Ventas:</span><strong>".$ventasRenderizadas."</strong></div>
				<div><span>Promedio atraso:</span><strong>".$promedioGeneral." dias</strong></div>
			</div>
			".$paginaVentas."
			<div class='cuenta-cliente-total-general'>
				<div><span>Total venta</span><strong>".cuentaGeneralClienteMonto($totalGeneralVenta)."</strong></div>
				<div><span>Total pagado</span><strong>".cuentaGeneralClienteMonto($totalGeneralPagado)."</strong></div>
				<div><span>Total deuda</span><strong>".cuentaGeneralClienteMonto($totalGeneralDeuda)."</strong></div>
				<div><span>Deuda vencida</span><strong>".cuentaGeneralClienteMonto($totalDeudaVencida)."</strong></div>
				<div><span>Cuotas vencidas</span><strong>".$totalCuotasVencidas."</strong></div>
			</div>
		</div>";
	}

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $pagina1, "5" => $totalDiasAtraso);
	echo json_encode($informacion);
	exit;
}

function buscarDetallesInformeGeneralCuentasClienteAnterior($cod_cliente,$tipo_cuenta,$tipo_venta)
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
 
	$pagina1 = "";
	
	$condiciontipoventa = '';
	if($tipo_venta !=''){
		$condiciontipoventa = " and vt.TipoVenta ='$tipo_venta'";
	}
 
 
 
	$sql = "Select tipo_comprobante,puntoexpedicion,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,vt.cod_venta,comision,cod_local,pago,vt.idGaranteFk,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select nombre_persona from persona where cod_persona=vt.idGaranteFk) as Garante,
		(Select ci_cliente from cliente where cod_cliente=vt.idGaranteFk) as GaranteDocumento,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre, 
		(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as cod_cliente,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		IFNULL((Select totalinteres from totalesdeudaventa where cod_venta=cod_ventaFk),0) as totalinteres,
		IFNULL((Select deudaactual from totalesdeudaventa where cod_venta=cod_ventaFk),0) as deudaactual,
		(Select fechaactualizacion from totalesdeudaventa where cod_venta=cod_ventaFk) as fechaactualizacion,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((Select montodevuelto from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as montodevuelto,
		IFNULL((Select motivo from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as motivo,
		IFNULL((Select fecha from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as fechacancelacion,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		IFNULL((Select sum(descuento) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalDescuentodetalle,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado , 
		( IFNULL((Select sum(Monto) from credito where cod_venta=vt.cod_venta  ),0) - IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk and Tipo='Pago Cuota'),0)) as deuda
		from venta vt where vt.cod_clienteFK ='" . $cod_cliente . "' and
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ".$condiciontipoventa."  order by deuda desc";
		
 
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$totalVenta = 0;
	$totalPagado = 0;
	$totalDeuda = 0;
	$controlVentas = "";
	
	$ContadorDiasMora=0;
	
	$styleName = "tableRegistroSearch";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
 
			$fecha_venta = $valor['fecha_venta'];
			$total_venta = $valor['total_venta'];
			$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']);
			$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
			$num_factura = utf8_encode($valor['num_factura']);
			$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']);
			$TipoVenta = utf8_encode($valor['TipoVenta']);
			$TipoPago = utf8_encode($valor['TipoPago']);
			$Vendedor1 = utf8_encode($valor['Vendedor1']);
			$Vendedor2 = utf8_encode($valor['Vendedor2']);
			$usuarionombre = utf8_encode($valor['usuarionombre']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$cod_cliente = utf8_encode($valor['cod_cliente']);
			$cod_venta = utf8_encode($valor['cod_venta']);
			$cobradornombre = utf8_encode($valor['cobradornombre']);

			$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);
			$nombrevendedor2 = utf8_encode($valor['nombrevendedor2']);
			$cantidadcuota = utf8_encode($valor['cantidadcuota']);
			$Monto = utf8_encode($valor['Monto']);
			$fechaprimerpago = utf8_encode($valor['fechaprimerpago']);
			$comision = utf8_encode($valor['comision']);
			$cod_local = utf8_encode($valor['cod_local']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$pago = utf8_encode($valor['pago']);
			$nrodetalle = ($valor['nrodetalle']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$cantidadcambio = utf8_encode($valor['cantidadcambio']);
			$cantidaddevuelto = utf8_encode($valor['cantidaddevuelto']);
			$fechaultimopago = utf8_encode($valor['fechaultimopago']);
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$Garante = utf8_encode($valor['Garante']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$totalinteres = utf8_encode($valor['totalinteres']);
			$deudaactual = utf8_encode($valor['deudaactual']);
			$fechaactualizacion = utf8_encode($valor['fechaactualizacion']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$totalDescuentodetalle = utf8_encode($valor['totalDescuentodetalle']);
			$GaranteDocumento = utf8_encode($valor['GaranteDocumento']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
 
			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0];
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13]; 
			$deuda = $datos[2];
			$totaldescuentos = $totalDescuentodetalle + $totaldescuento;
			$subTotal = $totalventadetalle - $totaldescuentos;
			$totalVenta = $subTotal + $totalVenta;
			$totalPagado = $totalPagado + $totalpagado;
			$totalDeuda = $totalDeuda + $deuda;
			$tituloPagos = "";
			if ($controlVentas != $cod_venta) {
				$tituloPagos = "<p class='ptituloZ'>Nro de Factura: " . $num_factura . "</p>";
				$controlVentas = $cod_venta;
			}
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			$styleGrilla = "";
			if ($deuda > 0) {
				$styleGrilla = "background-color:#FF5722;color:#fff";
			}

			if ($idGaranteFk == $cod_cliente) {
				$styleGrilla = "background-color:#d1c885;color:#fff";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			
			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));
			
$detalleVenta=buscarDetalleVenta($cod_venta);

$ColerDeuda=" background: #9E9E9E;";
if($deuda<=0){
	$ColerDeuda=" background: #38b2ac;";
}

if($tipo_cuenta =='PENDIENTES' && $deuda > 0){
	
 $pagina1 .= "
<div class='divCreditoPendiente' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
    <button class='btnToggleCredito' onclick=\"toggleCredito('$cod_venta',this)\" 
            style='
                background:#009688;
                color:white;
                border:none;
                padding:5px 10px;
                border-radius:8px;
                cursor:pointer;
            '>
      ➕ Ver crédito
    </button>
	<button class='btnToggleCredito' onclick=\"imprimir_expediente('$cod_venta')\" 
            style='
                background:black;
                color:white;
                border:none;
                padding:5px 10px;
                border-radius:8px;
                cursor:pointer;
            '>
      Imprimir
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura Factura:</td>
	 <td style=' font-weight:bold;'>Fecha Venta:</td> 
	 <td style=' font-weight:bold;'>TotalVenta:</td>
	 <td style=' font-weight:bold;'>Pagado:</td>
	 <td style=' font-weight:bold;'>Condicion:</td>
	 <td style=' font-weight:bold;'>Plazo:</td>      
    </tr>
	</table>
	<table>
    <tr  >	
	 <td  > $nrof </td> 
     <td  >$fecha_venta</td>
	 <td  >".number_format($total_venta, 0, ',', '.')."</td>
	 <td  >".number_format($totalpagado, 0, ',', '.')."</td>
	 <td  >$TipoVenta</td>
	 <td  >$cantidadcuota</td>
    </tr>
  </table>
  <b> Detalle Venta </b>
  
   <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'> 
    <tr >
	 <td style='width:10%; font-weight:bold; '>CANTIDAD</td>
	 <td style='width:50%; font-weight:bold;'>PRODUCTO</td> 
	 <td style='width:15%; font-weight:bold;'>PRECIO</td>
	 <td style='width:25%; font-weight:bold;'>TOTAL</td>
    </tr>
	</table>
 ".$detalleVenta."";
 
$sql2= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,dias,vt.pago as entrega,vt.num_factura,vt.puntoexpedicion,
IF(datediff((select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1),cr.fechapago)<=0,0,datediff((select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1),cr.fechapago)) as diff,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado,
(select count(pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito ) as cantidad
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where  vt.cod_venta='".$cod_venta."' group by cr.idcredito order by cr.cod_venta asc,cr.fechapago asc  ";

$totalPagado = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$deuda = "0";  
$diasatrazado = "0";  
$stmt2 = $mysqli->prepare($sql2);
if ( ! $stmt2->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;
}

$result2 = $stmt2->get_result();
$valor2= mysqli_num_rows($result2);
 
$controlStyle="";
$controlVentas="";
$Contador=0;
$Contadorcuotasvencidas=0;
$TotalDeudaVencida=0;
 
if ($valor2>0)
{
while ($valor2= mysqli_fetch_assoc($result2))
{  

$idcredito = utf8_encode($valor2['idcredito']);      
$plazo = utf8_encode($valor2['plazo']);  
$fechapago = utf8_encode($valor2['fechapago']);          
$cod_venta = utf8_encode($valor2['cod_venta']);          
$Monto = utf8_encode($valor2['Monto']); 
$Esado = utf8_encode($valor2['Esado']);          
$Nro_recibo = utf8_encode($valor2['Nro_recibo']);
$dias = utf8_encode($valor2['dias']);
$entrega = utf8_encode($valor2['entrega']);
$fechapagado = utf8_encode($valor2['fechapagado']);
$cantidad = utf8_encode($valor2['cantidad']);
$num_factura = utf8_encode($valor2['num_factura']);
$nroCancelado = utf8_encode($valor2['nroCancelado']);
$diff = utf8_encode($valor2['diff']);

$puntoexpedicion=utf8_encode($valor2['puntoexpedicion']);

$datos=calcularintereses2($idcredito,0,0,"2","2","1","no");
$descuento=$datos[0];
$total_interes=$datos[1];
$total=$datos[2];
$totalPago=$datos[3];
$deudaActua=$datos[4];
$TotalDiasAtrasado=$datos[5];
$stylecolor=$datos[9];


  	$stylecancel="";
	if($nroCancelado>0){
		$stylecancel="text-decoration: line-through; ";
	}else{
		$totalDescuento=$totalDescuento+$descuento;
$totalPagado=$totalPagado+$totalPago;
$totalInteres=$totalInteres+$total_interes;
$deuda=$deuda+$deudaActua;
$diasatrazado=$diasatrazado+$TotalDiasAtrasado;
	}
		  	 
if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}
	$tituloPagos="";
if($controlVentas!=$cod_venta){
	$tituloPagos="<p class='ptituloZ'>Nro de Factura: ".$nrof."</p>";
	$controlVentas=$cod_venta;
}


$fechapago = date("d-m-Y", strtotime($fechapago));
if($fechapagado!=""){
	$fechapagado = date("d-m-Y", strtotime($fechapagado));
}
 
$hoy = date('Y-m-d');
  
$etiquetaMora = '';
if ($total > 0 && strtotime($fechapago) < strtotime($hoy)) {
    $etiquetaMora = "<span class='badge-mora'>EN MORA</span>";
	$Contadorcuotasvencidas++;
	$TotalDeudaVencida+= $deudaActua;
}


if ( strtotime($fechapago) < strtotime($hoy)) {
  $Contador++;
  $ContadorDiasMora+=$diff;
}

$fechapago = date("d-m-Y", strtotime($fechapago));
$pagina1 .= "
<div class='divCreditoPendiente' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Fecha Vencimiento:</td>
	 <td style='padding:0px; font-weight:bold;'>Monto:</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda:</td>
	 <td style='padding:0px; font-weight:bold;'>Atraso:</td>
      
    </tr>
    <tr style=' '>
	 <td style='padding:0px;'>$plazo</td>
     <td style='padding:0px;'>$fechapago</td>
	 <td style='padding:0px;'>".number_format($Monto, 0, ',', '.')."</td>
	 <td style='padding:0px;'>".number_format($deudaActua, 0, ',', '.')."</td> 
	 <td style='padding:0px;'>$diff</td> 
    </tr>
  </table>
";
 

	 

 $sql3= "select pg.nrofactura, vt.puntoexpedicion,vt.tipo_comprobante,pg.tipo, pg.Fecha, sum(pg.Monto) as Monto,pg.tipopago, 
			(SELECT nombre from tipopago where cod_tipoPago = cod_tipoPagoFK) as metodo, pg.cod_creditoFK,
			(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,pg.hora,
			(Select upper(plazo) from credito l where l.idcredito=pg.cod_creditoFK) as plazo,
			vt.num_factura,vt.cod_venta,
			(SELECT concat(nombre,' DE ',diadesde,' HASTA ',diahasta) FROM mora_cliente WHERE cod_moracliente = idmora_cliente) as mora,
			(SELECT Monto FROM credito WHERE pg.cod_creditoFK = idcredito) as total_pagado
			from  pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk  
			where   pg.Monto>'0' and pg.cod_creditoFK ='" . $idcredito . "' group by  pg.idPago order by hora asc ";
 
			/*Sentencia para buscar registros*/	
 
 	$stmt3 = $mysqli->prepare($sql3);

	if (!$stmt3->execute()) {
		echo "Error";
		exit;
	}

	$result3 = $stmt3->get_result();
	$valor3 = mysqli_num_rows($result3); 
	$styleName = "tableRegistroSearch";
	if ($valor3 > 0) {

 $pagina1 .= "
<div class='divCreditoPendiente' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Nro Comprobante:</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha:</td>
	 <td style='padding:0px; font-weight:bold;'>Monto:</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador:</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo:</td>  
    </tr>";	
		
		while ($valor3 = mysqli_fetch_assoc($result3)) {

			$cod_creditoFK = $valor3['cod_creditoFK'];
			$cod_venta = $valor3['cod_venta'];
			$nrofactura = $valor3['nrofactura'];
			$puntoexpedicion = $valor3['puntoexpedicion'];
			$tipo_comprobante = $valor3['tipo_comprobante'];
			$tipo = utf8_encode($valor3['tipo']);
			$Fecha = utf8_encode($valor3['Fecha']);
			$Monto = utf8_encode($valor3['Monto']);
			$tipopago = utf8_encode($valor3['tipopago']);
			$metodo = utf8_encode($valor3['metodo']);
			$cobradornombre = utf8_encode($valor3['cobradornombre']);
			$hora = utf8_encode($valor3['hora']);
			$plazo = utf8_encode($valor3['plazo']);
			$num_factura = utf8_encode($valor3['num_factura']);
			$mora = utf8_encode($valor3['mora']);
			$total_pagado = utf8_encode($valor3['total_pagado']);
 
 $Fecha = date("d-m-Y", strtotime($Fecha));
	
 $pagina1 .= "
    <tr >
     <td style='padding:0px;width:35%;'>$nrofactura</td> 
	 <td style='padding:0px;'>$Fecha</td>
	 <td style='padding:0px;'>".$tipo."-".number_format($Monto,'0',',','.')."</td>
	 <td style='padding:0px;'>$cobradornombre</td> 
	 <td style='padding:0px;'>$metodo</td>  
    </tr>
  ";

 
}

 
$pagina1 .=" </table> </div>"; // Cierra el div del bloque de pagos
 

 } 
 
$pagina1 .= "</div>"; // ✅ Cierra el div principal de credito 
} // fin while de créditos
 
 }
 
if ($ContadorDiasMora > 0 && $Contador > 0) {
    $resultado = $ContadorDiasMora / $Contador;
} else {
    $resultado = 0; // o algún valor por defecto
}

 $resultado= round($resultado);
 
 $pagina1.=" 
 
 <table style='background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'> 
    <tr >
	 <td style='width:33%; font-weight:bold; '>DIAS DE ATRASO</td>
	 <td style='width:33%; font-weight:bold;'>DEUDA VENCIDA</td> 
	 <td style='width:33%; font-weight:bold;'>CUOTA VENCIDA</td> 
    </tr>
 </table>
	<table>
	 <tr >
	 <td style='width:33%; font-weight:bold;'>$resultado</td>
	 <td style='width:33%; font-weight:bold;'>".number_format($TotalDeudaVencida,'0',',','.')."</td> 
	 <td style='width:33%; font-weight:bold;'>$Contadorcuotasvencidas</td> 
    </tr>
	
	
</table>
 
 
 </div>";
 
 
	
}
 
 if($tipo_cuenta =='PAGADOS' && $deuda <= 0){
	
 $pagina1 .= "
<div class='divCreditoPendiente' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
    <button class='btnToggleCredito' onclick=\"toggleCredito('$cod_venta',this)\" 
            style='
                background:#009688;
                color:white;
                border:none;
                padding:5px 10px;
                border-radius:8px;
                cursor:pointer;
            '>
      ➕ Ver crédito
    </button>
	<button class='btnToggleCredito' onclick=\"imprimir_expediente('$cod_venta')\" 
            style='
                background:black;
                color:white;
                border:none;
                padding:5px 10px;
                border-radius:8px;
                cursor:pointer;
            '>
      Imprimir
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura Factura:</td>
	 <td style=' font-weight:bold;'>Fecha Venta:</td> 
	 <td style=' font-weight:bold;'>TotalVenta:</td>
	 <td style=' font-weight:bold;'>Pagado:</td>
	 <td style=' font-weight:bold;'>Condicion:</td>
	 <td style=' font-weight:bold;'>Plazo:</td>      
    </tr>
	</table>
	<table>
    <tr  >	
	 <td  > $nrof </td> 
     <td  >$fecha_venta</td>
	 <td  >".number_format($total_venta, 0, ',', '.')."</td>
	 <td  >".number_format($totalpagado, 0, ',', '.')."</td>
	 <td  >$TipoVenta</td>
	 <td  >$cantidadcuota</td>
    </tr>
  </table>
  <b> Detalle Venta </b>
  
   <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'> 
    <tr >
	 <td style='width:10%; font-weight:bold; '>CANTIDAD</td>
	 <td style='width:50%; font-weight:bold;'>PRODUCTO</td> 
	 <td style='width:15%; font-weight:bold;'>PRECIO</td>
	 <td style='width:25%; font-weight:bold;'>TOTAL</td>
    </tr>
	</table>
 ".$detalleVenta."";
 
$sql2= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,dias,vt.pago as entrega,vt.num_factura,vt.puntoexpedicion,
IF(datediff((select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1),cr.fechapago)<=0,0,datediff((select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1),cr.fechapago)) as diff,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado,
(select count(pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito ) as cantidad
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where  vt.cod_venta='".$cod_venta."' group by cr.idcredito order by cr.cod_venta asc,cr.fechapago asc  ";

$totalPagado = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$deuda = "0";  
$diasatrazado = "0";  
$stmt2 = $mysqli->prepare($sql2);
if ( ! $stmt2->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;
}

$result2 = $stmt2->get_result();
$valor2= mysqli_num_rows($result2);
 
$controlStyle="";
$controlVentas="";
$Contador=0;
$Contadorcuotasvencidas=0;
$TotalDeudaVencida=0;
 
if ($valor2>0)
{
while ($valor2= mysqli_fetch_assoc($result2))
{  

$idcredito = utf8_encode($valor2['idcredito']);      
$plazo = utf8_encode($valor2['plazo']);  
$fechapago = utf8_encode($valor2['fechapago']);          
$cod_venta = utf8_encode($valor2['cod_venta']);          
$Monto = utf8_encode($valor2['Monto']); 
$Esado = utf8_encode($valor2['Esado']);          
$Nro_recibo = utf8_encode($valor2['Nro_recibo']);
$dias = utf8_encode($valor2['dias']);
$entrega = utf8_encode($valor2['entrega']);
$fechapagado = utf8_encode($valor2['fechapagado']);
$cantidad = utf8_encode($valor2['cantidad']);
$num_factura = utf8_encode($valor2['num_factura']);
$nroCancelado = utf8_encode($valor2['nroCancelado']);
$diff = utf8_encode($valor2['diff']);

$puntoexpedicion=utf8_encode($valor2['puntoexpedicion']);

$datos=calcularintereses2($idcredito,0,0,"2","2","1","no");
$descuento=$datos[0];
$total_interes=$datos[1];
$total=$datos[2];
$totalPago=$datos[3];
$deudaActua=$datos[4];
$TotalDiasAtrasado=$datos[5];
$stylecolor=$datos[9];


  	$stylecancel="";
	if($nroCancelado>0){
		$stylecancel="text-decoration: line-through; ";
	}else{
		$totalDescuento=$totalDescuento+$descuento;
$totalPagado=$totalPagado+$totalPago;
$totalInteres=$totalInteres+$total_interes;
$deuda=$deuda+$deudaActua;
$diasatrazado=$diasatrazado+$TotalDiasAtrasado;
	}
		  	 
if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}
	$tituloPagos="";
if($controlVentas!=$cod_venta){
	$tituloPagos="<p class='ptituloZ'>Nro de Factura: ".$nrof."</p>";
	$controlVentas=$cod_venta;
}


$fechapago = date("d-m-Y", strtotime($fechapago));
if($fechapagado!=""){
	$fechapagado = date("d-m-Y", strtotime($fechapagado));
}
 
$hoy = date('Y-m-d');
  
$etiquetaMora = '';
if ($total > 0 && strtotime($fechapago) < strtotime($hoy)) {
    $etiquetaMora = "<span class='badge-mora'>EN MORA</span>";
	$Contadorcuotasvencidas++;
	$TotalDeudaVencida+= $deudaActua;
}


if ( strtotime($fechapago) < strtotime($hoy)) {
  $Contador++;
  $ContadorDiasMora+=$diff;
}

$fechapago = date("d-m-Y", strtotime($fechapago));
$pagina1 .= "
<div class='divCreditoPendiente' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Fecha Vencimiento:</td>
	 <td style='padding:0px; font-weight:bold;'>Monto:</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda:</td>
	 <td style='padding:0px; font-weight:bold;'>Atraso:</td>
      
    </tr>
    <tr style=' '>
	 <td style='padding:0px;'>$plazo</td>
     <td style='padding:0px;'>$fechapago</td>
	 <td style='padding:0px;'>".number_format($Monto, 0, ',', '.')."</td>
	 <td style='padding:0px;'>".number_format($deudaActua, 0, ',', '.')."</td> 
	 <td style='padding:0px;'>$diff</td> 
    </tr>
  </table>
";
 

	 

 $sql3= "select pg.nrofactura, vt.puntoexpedicion,vt.tipo_comprobante,pg.tipo, pg.Fecha, sum(pg.Monto) as Monto,pg.tipopago, 
			(SELECT nombre from tipopago where cod_tipoPago = cod_tipoPagoFK) as metodo, pg.cod_creditoFK,
			(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,pg.hora,
			(Select upper(plazo) from credito l where l.idcredito=pg.cod_creditoFK) as plazo,
			vt.num_factura,vt.cod_venta,
			(SELECT concat(nombre,' DE ',diadesde,' HASTA ',diahasta) FROM mora_cliente WHERE cod_moracliente = idmora_cliente) as mora,
			(SELECT Monto FROM credito WHERE pg.cod_creditoFK = idcredito) as total_pagado
			from  pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk  
			where   pg.Monto>'0' and pg.cod_creditoFK ='" . $idcredito . "' group by  pg.idPago order by hora asc ";
 
			/*Sentencia para buscar registros*/	
 
 	$stmt3 = $mysqli->prepare($sql3);

	if (!$stmt3->execute()) {
		echo "Error";
		exit;
	}

	$result3 = $stmt3->get_result();
	$valor3 = mysqli_num_rows($result3); 
	$styleName = "tableRegistroSearch";
	if ($valor3 > 0) {

 $pagina1 .= "
<div class='divCreditoPendiente' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Nro Comprobante:</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha:</td>
	 <td style='padding:0px; font-weight:bold;'>Monto:</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador:</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo:</td>  
    </tr>";	
		
		while ($valor3 = mysqli_fetch_assoc($result3)) {

			$cod_creditoFK = $valor3['cod_creditoFK'];
			$cod_venta = $valor3['cod_venta'];
			$nrofactura = $valor3['nrofactura'];
			$puntoexpedicion = $valor3['puntoexpedicion'];
			$tipo_comprobante = $valor3['tipo_comprobante'];
			$tipo = utf8_encode($valor3['tipo']);
			$Fecha = utf8_encode($valor3['Fecha']);
			$Monto = utf8_encode($valor3['Monto']);
			$tipopago = utf8_encode($valor3['tipopago']);
			$metodo = utf8_encode($valor3['metodo']);
			$cobradornombre = utf8_encode($valor3['cobradornombre']);
			$hora = utf8_encode($valor3['hora']);
			$plazo = utf8_encode($valor3['plazo']);
			$num_factura = utf8_encode($valor3['num_factura']);
			$mora = utf8_encode($valor3['mora']);
			$total_pagado = utf8_encode($valor3['total_pagado']);
 
 $Fecha = date("d-m-Y", strtotime($Fecha));
	
 $pagina1 .= "
    <tr >
     <td style='padding:0px;width:35%;'>$nrofactura</td> 
	 <td style='padding:0px;'>$Fecha</td>
	 <td style='padding:0px;'>".$tipo."-".number_format($Monto,'0',',','.')."</td>
	 <td style='padding:0px;'>$cobradornombre</td> 
	 <td style='padding:0px;'>$metodo</td>  
    </tr>
  ";

 
}

 
$pagina1 .=" </table> </div>"; // Cierra el div del bloque de pagos
 

 } 
 
$pagina1 .= "</div>"; // ✅ Cierra el div principal de credito 
} // fin while de créditos
 
 }
 
if ($ContadorDiasMora > 0 && $Contador > 0) {
    $resultado = $ContadorDiasMora / $Contador;
} else {
    $resultado = 0; // o algún valor por defecto
}

 $resultado= round($resultado);
 
 $pagina1.=" 
 
 <table style='background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'> 
    <tr >
	 <td style='width:33%; font-weight:bold; '>DIAS DE ATRASO</td>
	 <td style='width:33%; font-weight:bold;'>DEUDA VENCIDA</td> 
	 <td style='width:33%; font-weight:bold;'>CUOTA VENCIDA</td> 
    </tr>
 </table>
	<table>
	 <tr >
	 <td style='width:33%; font-weight:bold;'>$resultado</td>
	 <td style='width:33%; font-weight:bold;'>".number_format($TotalDeudaVencida,'0',',','.')."</td> 
	 <td style='width:33%; font-weight:bold;'>$Contadorcuotasvencidas</td> 
    </tr>
	
	
</table>
 
 
 </div>";
 
 
	
}

 if($tipo_cuenta ==''){
	
 $pagina1 .= "
<div class='divCreditoPendiente' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
    <button class='btnToggleCredito' onclick=\"toggleCredito('$cod_venta',this)\" 
            style='
                background:#009688;
                color:white;
                border:none;
                padding:5px 10px;
                border-radius:8px;
                cursor:pointer;
            '>
      ➕ Ver crédito
    </button>
	<button class='btnToggleCredito' onclick=\"imprimir_expediente('$cod_venta')\" 
            style='
                background:black;
                color:white;
                border:none;
                padding:5px 10px;
                border-radius:8px;
                cursor:pointer;
            '>
      Imprimir
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura Factura:</td>
	 <td style=' font-weight:bold;'>Fecha Venta:</td> 
	 <td style=' font-weight:bold;'>TotalVenta:</td>
	 <td style=' font-weight:bold;'>Pagado:</td>
	 <td style=' font-weight:bold;'>Condicion:</td>
	 <td style=' font-weight:bold;'>Plazo:</td>      
    </tr>
	</table>
	<table>
    <tr  >	
	 <td  > $nrof </td> 
     <td  >$fecha_venta</td>
	 <td  >".number_format($total_venta, 0, ',', '.')."</td>
	 <td  >".number_format($totalpagado, 0, ',', '.')."</td>
	 <td  >$TipoVenta</td>
	 <td  >$cantidadcuota</td>
    </tr>
  </table>
  <b> Detalle Venta </b>
  
   <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'> 
    <tr >
	 <td style='width:10%; font-weight:bold; '>CANTIDAD</td>
	 <td style='width:50%; font-weight:bold;'>PRODUCTO</td> 
	 <td style='width:15%; font-weight:bold;'>PRECIO</td>
	 <td style='width:25%; font-weight:bold;'>TOTAL</td>
    </tr>
	</table>
 ".$detalleVenta."";
 
$sql2= "SELECT 
    cr.plazo,
    cr.fechapago,
    cr.cod_venta,
    cr.Monto,
    cr.idcredito,
    cr.Esado,
    cr.Nro_recibo,
    cr.dias,
    vt.pago AS entrega,
    vt.num_factura,
    vt.puntoexpedicion,

    -- DIFERENCIA DE DÍAS (ATRASO / ADELANTO)
    CASE
        WHEN pg.Fecha IS NOT NULL 
            THEN DATEDIFF(pg.Fecha, cr.fechapago)
        ELSE 
            DATEDIFF(CURDATE(), cr.fechapago)
    END AS diff,

    IFNULL(ca.nroCancelado, 0) AS nroCancelado,
    pg.Fecha AS fechapagado,
    IFNULL(pg.cantidad, 0) AS cantidad

FROM credito cr
INNER JOIN venta vt 
    ON vt.cod_venta = cr.cod_venta

-- ÚLTIMO PAGO
LEFT JOIN (
    SELECT 
        cod_creditoFK,
        MAX(Fecha) AS Fecha,
        COUNT(*) AS cantidad
    FROM pago
    GROUP BY cod_creditoFK
) pg ON pg.cod_creditoFK = cr.idcredito

-- CANCELACIONES
LEFT JOIN (
    SELECT 
        cod_venta,
        COUNT(*) AS nroCancelado
    FROM cancelaciones
    GROUP BY cod_venta
) ca ON ca.cod_venta = vt.cod_venta

WHERE vt.cod_venta = '".$cod_venta."'
ORDER BY cr.cod_venta ASC, cr.fechapago ASC;
  ";

// echo $sql2;
// exit;

$totalPagado = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$deuda = "0";  
$diasatrazado = "0";  
$stmt2 = $mysqli->prepare($sql2);
if ( ! $stmt2->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;
}

$result2 = $stmt2->get_result();
$valor2= mysqli_num_rows($result2);
 
$controlStyle="";
$controlVentas="";
$Contador=0;
$Contadorcuotasvencidas=0;
$TotalDeudaVencida=0;
 
if ($valor2>0)
{
while ($valor2= mysqli_fetch_assoc($result2))
{  

$idcredito = utf8_encode($valor2['idcredito']);      
$plazo = utf8_encode($valor2['plazo']);  
$fechapago = utf8_encode($valor2['fechapago']);          
$cod_venta = utf8_encode($valor2['cod_venta']);          
$Monto = utf8_encode($valor2['Monto']); 
$Esado = utf8_encode($valor2['Esado']);          
$Nro_recibo = utf8_encode($valor2['Nro_recibo']);
$dias = utf8_encode($valor2['dias']);
$entrega = utf8_encode($valor2['entrega']);
$fechapagado = utf8_encode($valor2['fechapagado']);
$cantidad = utf8_encode($valor2['cantidad']);
$num_factura = utf8_encode($valor2['num_factura']);
$nroCancelado = utf8_encode($valor2['nroCancelado']);
$diff = utf8_encode($valor2['diff']);

if($diff <0){
	$diff = 0;
}

$puntoexpedicion=utf8_encode($valor2['puntoexpedicion']);

$datos=calcularintereses2($idcredito,0,0,"2","2","1","no");
$descuento=$datos[0];
$total_interes=$datos[1];
$total=$datos[2];
$totalPago=$datos[3];
$deudaActua=$datos[4];
$TotalDiasAtrasado=$datos[5];
$stylecolor=$datos[9];


  	$stylecancel="";
	if($nroCancelado>0){
		$stylecancel="text-decoration: line-through; ";
	}else{
		$totalDescuento=$totalDescuento+$descuento;
$totalPagado=$totalPagado+$totalPago;
$totalInteres=$totalInteres+$total_interes;
$deuda=$deuda+$deudaActua;
$diasatrazado=$diasatrazado+$TotalDiasAtrasado;
	}
		  	 
if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}
	$tituloPagos="";
if($controlVentas!=$cod_venta){
	$tituloPagos="<p class='ptituloZ'>Nro de Factura: ".$nrof."</p>";
	$controlVentas=$cod_venta;
}


$fechapago = date("d-m-Y", strtotime($fechapago));
if($fechapagado!=""){
	$fechapagado = date("d-m-Y", strtotime($fechapagado));
}
 
$hoy = date('Y-m-d');
  
$etiquetaMora = '';
if ($total > 0 && strtotime($fechapago) < strtotime($hoy)) {
    $etiquetaMora = "<span class='badge-mora'>EN MORA</span>";
	$Contadorcuotasvencidas++;
	$TotalDeudaVencida+= $deudaActua;
}


if ( strtotime($fechapago) < strtotime($hoy)) {
  $Contador++;
  $ContadorDiasMora+=$diff;
}

$fechapago = date("d-m-Y", strtotime($fechapago));
$pagina1 .= "
<div class='divCreditoPendiente' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Fecha Vencimiento:</td>
	 <td style='padding:0px; font-weight:bold;'>Monto:</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda:</td>
	 <td style='padding:0px; font-weight:bold;'>Atraso:</td>
      
    </tr>
    <tr style=' '>
	 <td style='padding:0px;'>$plazo</td>
     <td style='padding:0px;'>$fechapago</td>
	 <td style='padding:0px;'>".number_format($Monto, 0, ',', '.')."</td>
	 <td style='padding:0px;'>".number_format($deudaActua, 0, ',', '.')."</td> 
	 <td style='padding:0px;'>$diff</td> 
    </tr>
  </table>
";
 

	 

 $sql3= "select pg.nrofactura, vt.puntoexpedicion,vt.tipo_comprobante,pg.tipo, pg.Fecha, sum(pg.Monto) as Monto,pg.tipopago, 
			(SELECT nombre from tipopago where cod_tipoPago = cod_tipoPagoFK) as metodo, pg.cod_creditoFK,
			(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,pg.hora,
			(Select upper(plazo) from credito l where l.idcredito=pg.cod_creditoFK) as plazo,
			vt.num_factura,vt.cod_venta,
			(SELECT concat(nombre,' DE ',diadesde,' HASTA ',diahasta) FROM mora_cliente WHERE cod_moracliente = idmora_cliente) as mora,
			(SELECT Monto FROM credito WHERE pg.cod_creditoFK = idcredito) as total_pagado
			from  pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk  
			where   pg.Monto>'0' and pg.cod_creditoFK ='" . $idcredito . "' group by  pg.idPago order by hora asc ";
 
			/*Sentencia para buscar registros*/	
 
 	$stmt3 = $mysqli->prepare($sql3);

	if (!$stmt3->execute()) {
		echo "Error";
		exit;
	}

	$result3 = $stmt3->get_result();
	$valor3 = mysqli_num_rows($result3); 
	$styleName = "tableRegistroSearch";
	if ($valor3 > 0) {

 $pagina1 .= "
<div class='divCreditoPendiente' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Nro Comprobante:</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha:</td>
	 <td style='padding:0px; font-weight:bold;'>Monto:</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador:</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo:</td>  
    </tr>";	
		
		while ($valor3 = mysqli_fetch_assoc($result3)) {

			$cod_creditoFK = $valor3['cod_creditoFK'];
			$cod_venta = $valor3['cod_venta'];
			$nrofactura = $valor3['nrofactura'];
			$puntoexpedicion = $valor3['puntoexpedicion'];
			$tipo_comprobante = $valor3['tipo_comprobante'];
			$tipo = utf8_encode($valor3['tipo']);
			$Fecha = utf8_encode($valor3['Fecha']);
			$Monto = utf8_encode($valor3['Monto']);
			$tipopago = utf8_encode($valor3['tipopago']);
			$metodo = utf8_encode($valor3['metodo']);
			$cobradornombre = utf8_encode($valor3['cobradornombre']);
			$hora = utf8_encode($valor3['hora']);
			$plazo = utf8_encode($valor3['plazo']);
			$num_factura = utf8_encode($valor3['num_factura']);
			$mora = utf8_encode($valor3['mora']);
			$total_pagado = utf8_encode($valor3['total_pagado']);
 
 $Fecha = date("d-m-Y", strtotime($Fecha));
	
 $pagina1 .= "
    <tr >
     <td style='padding:0px;width:35%;'>$nrofactura</td> 
	 <td style='padding:0px;'>$Fecha</td>
	 <td style='padding:0px;'>".$tipo."-".number_format($Monto,'0',',','.')."</td>
	 <td style='padding:0px;'>$cobradornombre</td> 
	 <td style='padding:0px;'>$metodo</td>  
    </tr>
  ";

 
}

 
$pagina1 .=" </table> </div>"; // Cierra el div del bloque de pagos
 

 } 
 
$pagina1 .= "</div>"; // ✅ Cierra el div principal de credito 
} // fin while de créditos
 
 }
 
if ($ContadorDiasMora > 0 && $Contador > 0) {
    $resultado = $ContadorDiasMora / $Contador;
} else {
    $resultado = 0; // o algún valor por defecto
}

 $resultado= round($resultado);
 
 $pagina1.=" 
 
 <table style='background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'> 
    <tr >
	 <td style='width:33%; font-weight:bold; '>DIAS DE ATRASO</td>
	 <td style='width:33%; font-weight:bold;'>DEUDA VENCIDA</td> 
	 <td style='width:33%; font-weight:bold;'>CUOTA VENCIDA</td> 
    </tr>
 </table>
	<table>
	 <tr >
	 <td style='width:33%; font-weight:bold;'>$resultado</td>
	 <td style='width:33%; font-weight:bold;'>".number_format($TotalDeudaVencida,'0',',','.')."</td> 
	 <td style='width:33%; font-weight:bold;'>$Contadorcuotasvencidas</td> 
    </tr>
	
	
</table>
 
 
 </div>";
 
 
	
}
 
 
 }
 
	}else{
	 
	 $pagina1="<div class='sin-registros'>
    <p>⚠️ Sin registros</p>
</div>";



	 
 }
  
 
    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $pagina1, "5"=>$ContadorDiasMora);
echo json_encode($informacion);	
exit;
}

function buscarDetalleVenta($CodVenta)
{
$mysqli=conectar_al_servidor();


$sql= "select  cantidad_detalle , precio_producto,subtotal , 
(select nombre_producto from producto where cod_producto=cod_productoFK) as NombreProducto
 from detalle_venta
 where cod_ventaFK='$CodVenta'  ";
 
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
$totalPagado=0;
$datos[0]="";
$datos[1]="";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
     
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']);      
$precio_producto = utf8_encode($valor['precio_producto']);  
$subtotal = utf8_encode($valor['subtotal']);  
$NombreProducto = utf8_encode($valor['NombreProducto']);  


$pagina.="<table style=' width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'> 
    <tr >
	 <td style='width:10%;'>".$cantidad_detalle."</td>
	 <td style='width:50%;'>".$NombreProducto."</td> 
	 <td style='width:15%;'>".number_format($precio_producto,'0',',','.')."</td>
	 <td style='width:25%;'>".number_format($subtotal,'0',',','.')."</td>
    </tr>
	</table>";
 
}
} 
return $pagina;	

}

function buscarcantidadcuotapagados($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select count(vt.num_factura) as cuotas
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar'
 and  IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)>= ((cr.Monto+totalinteres)-cr.descuento)
 and plazo!='ENTREGA'";
 


 
$cuotas = "0";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$controlVentas="";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cuotas = utf8_encode($valor['cuotas']);

	

}
}
 mysqli_close($mysqli); 
return $cuotas;

}



function ClientesNuevos($fecha1, $fecha2, $cliente, $nrodocumento, $cod_local, $cantidad_ventas, $controlagrupacionclientesnuevos, $tipo_venta, $formato="")
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato)==="json";

	$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	if ($cod_local == "") {
		$condicionCodLocal = " ";
	}
	
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	
	$condicionrodocumento = "";
	if ($nrodocumento != "") {
		$condicionrodocumento = " and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) = '" . $nrodocumento . "'";
	}
	
	$condiciontipoventa = "";
	if ($tipo_venta != "") {
		$condiciontipoventa = " and vt.TipoVenta = '" . $tipo_venta . "'";
	}
	
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and vt.fecha_venta between '" . $fecha1 . "' and  '" . $fecha2 . "'";
	}
	
	$condicioncant_venta = "";
	if ($cantidad_ventas != "") {
		$condicioncant_venta = "and (SELECT count(cod_clienteFK) FROM venta WHERE cod_clienteFK = vt.cod_clienteFK) <= '$cantidad_ventas'";
	}

	$condiciongroupby = ' group by vt.cod_clienteFK';
	if($controlagrupacionclientesnuevos=='2'){
		$condiciongroupby = '';
	}

	$sql = "SELECT vt.TipoVenta, vt.cod_clienteFK,
	(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = vt.cod_clienteFK ) as cliente,
	(SELECT ci_cliente FROM cliente WHERE cod_cliente = vt.cod_clienteFK ) as documento,
	(SELECT telefono FROM persona WHERE cod_persona = vt.cod_clienteFK) as telefono,
	(SELECT Nombre FROM local WHERE cod_local = vt.cod_local) as local,
    (SELECT count(*) FROM venta v WHERE cod_clienteFK = vt.cod_clienteFK and IFNULL((Select count(*) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0) as contador_ventas
	FROM venta vt
	where vt.cod_venta !='' ".$condicionCodLocal.$condicioncliente.$condicionrodocumento.$condicionfecha.$condicioncant_venta.$condiciontipoventa." and  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 $condiciongroupby order by cod_venta desc
	limit 50";
		

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}


	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$styleName = "tableRegistroSearch";


	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
 
			$cliente = utf8_encode($valor['cliente']);
			$documento = utf8_encode($valor['documento']);
			$telefono = utf8_encode($valor['telefono']);
			$local = utf8_encode($valor['local']);
			$contador_ventas = utf8_encode($valor['contador_ventas']);
			$TipoVenta = utf8_encode($valor['TipoVenta']);
			$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
		
		$paginatiposventa = $devolverArray ? array($TipoVenta) : $TipoVenta;
		if($controlagrupacionclientesnuevos=='1'){
			$paginatiposventa = obtener_pagina_ventas($cod_clienteFK,$tipo_venta,$formato);
		}
		
	$styleName = CargarStyleTable($styleName);
			$filas[] = array(
				"id_cliente" => $cod_clienteFK,
				"cliente" => $cliente,
				"documento" => $documento,
				"telefono" => $telefono,
				"tipos_venta" => $devolverArray ? $paginatiposventa : array(),
				"local" => $local,
				"cantidad_ventas" => $contador_ventas,
				"clase_fila" => $styleName
			);
			if(!$devolverArray){
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td id='' style='width:20%'>" . $cliente . "</td>
<td id='' style='width:10%'>" . $documento . "</td>
<td id='' style='width:10%'>" . $telefono . "</td>
<td id='' style='width:10%'>" . $paginatiposventa . "</td>
<td id='' style='width:10%'>" . $local . "</td>
<td id='' style='width:10%'>" . $contador_ventas . "</td>
</tr>
</table>";
			}

	



		}
	}
	
	
	
	$sql = "SELECT vt.fecha_venta
	FROM venta vt
	where vt.cod_venta !=''".$condicionCodLocal.$condicioncliente.$condicionrodocumento.$condicionfecha.$condicioncant_venta.$condiciontipoventa." and  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 $condiciongroupby order by cod_venta desc";
		
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$totalregistro = $valor;
	
	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina), "3" => $nroRegistro, "99" => $nroRegistro, "100" => $totalregistro);
	echo json_encode($informacion);
	exit;
}

function masClientesNuevos($fecha1, $fecha2, $cliente, $nrodocumento, $cod_local, $registrocargado,$cantidad_ventas, $controlagrupacionclientesnuevos,$tipo_venta,$formato="")
{
	$mysqli = conectar_al_servidor();
	
	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato)==="json";

	$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	if ($cod_local == "") {
		$condicionCodLocal = " ";
	}
	
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	
	$condicionrodocumento = "";
	if ($nrodocumento != "") {
		$condicionrodocumento = " and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) = '" . $nrodocumento . "'";
	}

	$condiciontipoventa = "";
	if ($tipo_venta != "") {
		$condiciontipoventa = " and vt.TipoVenta = '" . $tipo_venta . "'";
	}
	
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and vt.fecha_venta between '" . $fecha1 . "' and  '" . $fecha2 . "'";
	}

	$condicioncant_venta = "";
	if ($cantidad_ventas != "") {
		$condicioncant_venta = "and (SELECT count(cod_clienteFK) FROM venta WHERE cod_clienteFK = vt.cod_clienteFK) <= '$cantidad_ventas'";
	}
	
	$condiciongroupby = ' group by vt.cod_clienteFK';
	if($controlagrupacionclientesnuevos=='2'){
		$condiciongroupby = '';
	}


	$sql = " SELECT vt.TipoVenta,vt.cod_clienteFK,
	(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = vt.cod_clienteFK ) as cliente,
	(SELECT ci_cliente FROM cliente WHERE cod_cliente = vt.cod_clienteFK ) as documento,
	(SELECT telefono FROM persona WHERE cod_persona = vt.cod_clienteFK) as telefono,
	(SELECT Nombre FROM local WHERE cod_local = vt.cod_local) as local,
    (SELECT count(*) FROM venta v WHERE cod_clienteFK = vt.cod_clienteFK and IFNULL((Select count(*) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0) as contador_ventas
	FROM venta vt
	where vt.cod_venta !='' ".$condicionCodLocal.$condicioncliente.$condicionrodocumento.$condicionfecha.$condicioncant_venta.$condiciontipoventa.$condiciontipoventa." and  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 $condiciongroupby order by cod_venta desc limit " . $registrocargado . " , 50 "; 

 


	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}


	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor + $registrocargado;
	$styleName = "tableRegistroSearch";

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
 
			$cliente = utf8_encode($valor['cliente']);
			$documento = utf8_encode($valor['documento']);
			$telefono = utf8_encode($valor['telefono']);
			$local = utf8_encode($valor['local']);
			$contador_ventas = utf8_encode($valor['contador_ventas']);
			$TipoVenta = utf8_encode($valor['TipoVenta']);
			$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
		
		$paginatiposventa = $devolverArray ? array($TipoVenta) : $TipoVenta;
		if($controlagrupacionclientesnuevos=='1'){
			$paginatiposventa = obtener_pagina_ventas($cod_clienteFK,$tipo_venta,$formato);
		}
		
	$styleName = CargarStyleTable($styleName);
			$filas[] = array(
				"id_cliente" => $cod_clienteFK,
				"cliente" => $cliente,
				"documento" => $documento,
				"telefono" => $telefono,
				"tipos_venta" => $devolverArray ? $paginatiposventa : array(),
				"local" => $local,
				"cantidad_ventas" => $contador_ventas,
				"clase_fila" => $styleName
			);
			if(!$devolverArray){
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td id='' style='width:20%'>" . $cliente . "</td>
<td id='' style='width:10%'>" . $documento . "</td>
<td id='' style='width:10%'>" . $telefono . "</td>
<td id='' style='width:10%'>" . $paginatiposventa . "</td>
<td id='' style='width:10%'>" . $local . "</td>
<td id='' style='width:10%'>" . $contador_ventas . "</td>
</tr>
</table>";
			}

	



		}
	}



	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina), "7" => $nroRegistro, "99" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}

function obtener_pagina_ventas($cod_clienteFK,$tipo_venta,$formato="")
{
	$mysqli = conectar_al_servidor();
	
	$pagina = "";
	$tiposVenta = array();
	$devolverArray = strtolower($formato)==="json";
	$condiciontipoventa = "";
	if($tipo_venta !=''){
		$condiciontipoventa = " and v.TipoVenta = '$tipo_venta'";
	}

	$sql = " SELECT v.TipoVenta FROM venta v WHERE cod_clienteFK = v.cod_clienteFK and IFNULL((Select count(*) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and v.cod_clienteFK = '$cod_clienteFK'".$condiciontipoventa; 


	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}


	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
		$TipoVenta = utf8_encode($valor['TipoVenta']);
		$tiposVenta[] = $TipoVenta;
		
		if(!$devolverArray){
			$pagina .= "
<table border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td id='' style='width:100%'>" . $TipoVenta . "</td>
</tr>
</table>";
		}

		
	}
	}



	return $devolverArray ? $tiposVenta : $pagina;
}


 
ObtenerDatos($operacion);

?>
