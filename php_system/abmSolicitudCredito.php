<?php
require("conexion.php");
include("verificar_navegador.php");
include("subir_foto_base64.php");
include("quitarseparadormiles.php");
include("classTable.php");
include("cargar_archivo.php");
include("calcularintereses.php");
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
$observacion_general=$_POST['observacion_general'];
$observacion_general = utf8_decode($observacion_general);


$MontoRefComercial=$_POST['MontoRefComercial'];
$MontoRefComercial = quitarseparadormiles($MontoRefComercial);
$entrega_inicial=isset($_POST['entrega_inicial']) ? $_POST['entrega_inicial'] : "0";
$entrega_inicial = quitarseparadormiles($entrega_inicial);
if($entrega_inicial==""){
	$entrega_inicial=0;
}
$cantidad_productos=isset($_POST['cantidad_productos']) ? (int)$_POST['cantidad_productos'] : 0;
if($cantidad_productos<1){
	$informacion=array("1"=>"camposvacio","2"=>"Debe agregar al menos un producto para guardar la solicitud");
	echo json_encode($informacion);
	exit;
}

abm($MontoRefComercial,$entrega_inicial,$idAbm,$estado,$idAbmCliente,$cod_garanteFK,$cod_cobradorFK,$cod_localFK,$user,$observacion,$observacion_general,$operacion);

}

if($operacion=="eliminardocumentoFotosCalificacionEntrega")
{
$idcontrato=$_POST['isolicitudcredito'];
$idcontrato = utf8_decode($idcontrato);
$iddocumento=$_POST['iddocumento'];
$iddocumento = utf8_decode($iddocumento);
$urldocumento=$_POST['urldocumento'];
$urldocumento = utf8_decode($urldocumento);
eliminardocumentoFotosCalificacionEntrega($idcontrato,$iddocumento,$urldocumento);

}

if($operacion=="buscar_ventas_aprobar_solicitud")
{

$cod_cliente=$_POST['cod_cliente'];
$cod_cliente = utf8_decode($cod_cliente);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";

	buscar_ventas_aprobar_solicitud($cod_cliente,$formato);
}

if($operacion=="buscar_referencias_comerciales_aprobar_solicitud")
{

$cod_cliente=$_POST['cod_cliente'];
$cod_cliente = utf8_decode($cod_cliente);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";

	buscar_referencias_comerciales_aprobar_solicitud($cod_cliente,$formato);
}


if($operacion=="insertar_foto_calificacion_entrega")
{
$idSolicitudCreditoFK=$_POST['idSolicitudCreditoFK'];
$idSolicitudCreditoFK = utf8_decode($idSolicitudCreditoFK);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$archivo=$_POST['archivo'];
$archivo = utf8_decode($archivo);
$ext=$_POST['ext'];
$ext = utf8_decode($ext);


insertar_foto_calificacion_entrega($idSolicitudCreditoFK,$ext,$archivo,$descripcion);
}

if($operacion=="buscaroptionDescripcionFotosCalificacionEntrega")
{

	buscaroptionDescripcionFotosCalificacionEntrega();

}

if($operacion=="nuevaDescripcionFotosCalificacionEntrega" || $operacion=="editarDescripcionFotosCalificacionEntrega" )
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$operacion=$_POST['funt'];
$operacion = utf8_decode($operacion);

$Estado=$_POST['Estado'];
$Estado = utf8_decode($Estado);

$idabm=$_POST['idabm'];
$idabm = utf8_decode($idabm);

	NuevoDescripcionFotosCalificacionEntrega($descripcion,$Estado,$idabm,$operacion);

}

if($operacion=="BuscarAbmDescripcionFotosCalificacionEntrega")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	BuscarAbmDescripcionFotosCalificacionEntrega($buscar,$Estado,$formato);

}	

if($operacion=="buscarDatosClienteAprobarSolictudCredito")
{
	$cod_clienteAprobar=$_POST['cod_clienteAprobar'];
$cod_clienteAprobar = utf8_decode($cod_clienteAprobar);
	$Cod_solicitudCreditoAprobar=$_POST['Cod_solicitudCreditoAprobar'];
$Cod_solicitudCreditoAprobar = utf8_decode($Cod_solicitudCreditoAprobar);

	buscarDatosClienteAprobarSolictudCredito($cod_clienteAprobar,$Cod_solicitudCreditoAprobar);

}

if($operacion=="buscarDetallesPagosClienteAprobarSolicitudCredito")
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


	buscarDetallesPagosClienteAprobarSolicitudCredito($cod_cliente,$tipo_cuenta,$tipo_venta);

}


if($operacion=="buscarDetallesGaranteAprobarSolicitudCredito")
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

// echo $tipo_venta;
// exit;

	buscarDetallesGaranteAprobarSolicitudCredito($cod_cliente,$tipo_cuenta,$tipo_venta);

}

if($operacion=="buscarDocumentosCargaFotoCalificacionEntrega")
{
$cod_credito_solicitudFK=$_POST['cod_credito_solicitudFK'];
$cod_credito_solicitudFK = utf8_decode($cod_credito_solicitudFK);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

/* $fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);

$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2); */


buscarDocumentosCargaFotoCalificacionEntrega($cod_credito_solicitudFK,$formato);
}

if($operacion=="nuevoCalificacionEntrega" || $operacion=="editarCalificacionEntrega" )
{

$idAbm=$_POST['idCalificacionEntrega'];
$idAbm = utf8_decode($idAbm);

$observacion=$_POST['observacion'];
$observacion = utf8_decode($observacion);
$calificacion=$_POST['calificacion'];
$calificacion = utf8_decode($calificacion);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$idAbmSolicitudCalificacionEntrega=$_POST['idAbmSolicitudCalificacionEntrega'];
$idAbmSolicitudCalificacionEntrega = utf8_decode($idAbmSolicitudCalificacionEntrega);


abmcalificacionentrega($idAbm,$observacion,$calificacion,$idAbmSolicitudCalificacionEntrega,$estado,$operacion);

}

  if($operacion=="editarmasreferencias"){
	  $telefono=$_POST["telefono"];
 	$telefono=utf8_decode($telefono);
	$direccion=$_POST["direccion"];
 	$direccion=utf8_decode($direccion);
	$referencia=$_POST["referencia"];
 	$referencia=utf8_decode($referencia);
	$observacion=$_POST["observacion"];
 	$observacion=utf8_decode($observacion);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$obs=$_POST["obs"];
 	$obs=utf8_decode($obs);
 	$idreferenciacliente=$_POST["idreferenciacliente"];
 	$idreferenciacliente=utf8_decode($idreferenciacliente);
	
 	editarmasreferencias($idreferenciacliente,$telefono,$direccion,$referencia,$observacion,$tipo,$obs);
 }  
 
 
 if($operacion=="editarmasreferenciascomercialcliente"){
	  $telefono=$_POST["telefono"];
 	$telefono=utf8_decode($telefono);
	$direccion=$_POST["direccion"];
 	$direccion=utf8_decode($direccion);
	$referencia=$_POST["referencia"];
 	$referencia=utf8_decode($referencia);
	$observacion=$_POST["observacion"];
 	$observacion=utf8_decode($observacion);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$obs=$_POST["obs"];
 	$obs=utf8_decode($obs);
 	$idreferenciacliente=$_POST["idreferenciacliente"];
 	$idreferenciacliente=utf8_decode($idreferenciacliente);
	
	$calificacion=$_POST["calificacion"];
 	$calificacion=utf8_decode($calificacion);
	
	$monto=$_POST["monto"];
 	$monto=quitarseparadormiles($monto);
	
 	editarmasreferenciascomercialcliente($idreferenciacliente,$monto,$telefono,$direccion,$referencia,$observacion,$tipo,$obs,$calificacion);
 }

  if($operacion=="eliminarmasreferencia"){
 	$idreferenciacliente=$_POST["idreferenciacliente"];
 	$idreferenciacliente=utf8_decode($idreferenciacliente);
	
 	eliminarmasreferencia($idreferenciacliente);
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

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$obsTrabajo=$_POST['obsTrabajo'];
$obsTrabajo = utf8_decode($obsTrabajo);

$tipo_vivienda=$_POST['tipo_vivienda'];
$tipo_vivienda = utf8_decode($tipo_vivienda);

abmCliente($idzonaFk,$whapp,$cod_persona,$direccion,$telefono,$email,$cod_cliente,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$estado,$obsTrabajo,$tipo_vivienda,$operacion);

}

 
 if($operacion=="addmasreferencias"){
 	$telefono=$_POST["telefono"];
 	$telefono=utf8_decode($telefono);
	$direccion=$_POST["direccion"];
 	$direccion=utf8_decode($direccion);
	$referencia=$_POST["referencia"];
 	$referencia=utf8_decode($referencia);
	$observacion=$_POST["observacion"];
 	$observacion=utf8_decode($observacion);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$obs=$_POST["obs"];
 	$obs=utf8_decode($obs);
	$idcliente=$_POST["idcliente"];
 	$idcliente=utf8_decode($idcliente);
	
	
	$monto=$_POST["monto"];
 	$monto=quitarseparadormiles($monto);
	
	
 	addmasreferencias($telefono,$direccion,$referencia,$observacion,$tipo,$obs,$idcliente,$monto);
 } 
 
 
 if($operacion=="addmasreferenciascomercialcliente"){
 	$telefono=$_POST["telefono"];
 	$telefono=utf8_decode($telefono);
	$direccion=$_POST["direccion"];
 	$direccion=utf8_decode($direccion);
	$referencia=$_POST["referencia"];
 	$referencia=utf8_decode($referencia);
	$observacion=$_POST["observacion"];
 	$observacion=utf8_decode($observacion);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$obs=$_POST["obs"];
 	$obs=utf8_decode($obs);
	$idcliente=$_POST["idcliente"];
 	$idcliente=utf8_decode($idcliente);
	$calificacion=$_POST["calificacion"];
 	$calificacion=utf8_decode($calificacion);

	$monto=$_POST["monto"];
 	$monto=quitarseparadormiles($monto);
 	addmasreferenciascomercialcliente($monto,$telefono,$direccion,$referencia,$observacion,$tipo,$obs,$idcliente,$calificacion);
 }
 
  if($operacion=="BuscarImprimirSolicitudCredito"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	 BuscarImprimirSolicitudCredito($buscar);
 }

 if($operacion=="buscar_abm_calificacion_entrega"){
 	$fecha_entrega=$_POST["fecha_entrega"];
 	$fecha_entrega=utf8_decode($fecha_entrega);
	
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	
	$cod_cobrador=$_POST["cod_cobrador"];
 	$cod_cobrador=utf8_decode($cod_cobrador);
	
	$fechadesde=$_POST["fechadesde"];
 	$fechadesde=utf8_decode($fechadesde);
	
	$fechahasta=$_POST["fechahasta"];
 	$fechahasta=utf8_decode($fechahasta);
	
	$calificacion=$_POST["calificacion"];
 	$calificacion=utf8_decode($calificacion);
	
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
	
	
 	 buscar_abm_calificacion_entrega($fecha_entrega,$cliente, $cod_cobrador,$fechadesde,$fechahasta,$calificacion,$estado);
 }



 if($operacion=="buscarmasreferencias"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscarmasreferencias($buscar,$formato);
 }
 
  if($operacion=="buscarmasreferenciascomercialcliente"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscarmasreferenciascomercialcliente($buscar,$formato);
 }
 
  if($operacion=="buscarvista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$codlocal=$_POST["codlocal"];
 	$codlocal=utf8_decode($codlocal);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscarvista($buscar,$codlocal,$formato);
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
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscarProductoSolicitud($buscar,$formato);
 }
 
 
 
  if($operacion=="eliminar"){
 	$idSolicitudCredito=$_POST["idSolicitudCredito"];
 	$idSolicitudCredito=utf8_decode($idSolicitudCredito);
 	eliminar($idSolicitudCredito);
 }   

 if($operacion=="cargararchivogarante"){
 	$cod_clienteFK=$_POST["cod_clienteFK"];
 	$cod_clienteFK=utf8_decode($cod_clienteFK);
 	cargararchivogarante($cod_clienteFK);
 }  
 
 
 if($operacion=="marcarrevisiondocumentocomoterminado"){
 	$idSolicitudCredito=$_POST["idsolicitudcredito"];
 	$idSolicitudCredito=utf8_decode($idSolicitudCredito);
 	marcarrevisiondocumentocomoterminado($idSolicitudCredito);
 }
 
 if($operacion=="marcarrevisiondocumentopagarecomoterminado"){
 	$idSolicitudCredito=$_POST["idsolicitudcredito"];
 	$idSolicitudCredito=utf8_decode($idSolicitudCredito);
 	marcarrevisiondocumentopagarecomoterminado($idSolicitudCredito);
 }

 if($operacion=="aprobar"){
 	$idSolicitudCredito=$_POST["idSolicitudCredito"];
 	$idSolicitudCredito=utf8_decode($idSolicitudCredito);
	
	$user=$_POST['useru'];
    $user = utf8_decode($user);
	
 	aprobar($idSolicitudCredito,$user);
 }

 if($operacion=="reemplazarProductoProvisional"){
	$idDetalle=isset($_POST["idDetalle"]) ? utf8_decode($_POST["idDetalle"]) : "";
	$producto=isset($_POST["producto"]) ? utf8_decode($_POST["producto"]) : "";
	reemplazarProductoProvisional($idDetalle,$producto);
 }

 if($operacion=="buscarProductoReemplazoSolicitud"){
	$buscar=isset($_POST["buscar"]) ? utf8_decode(trim($_POST["buscar"])) : "";
	$idDetalle=isset($_POST["idDetalle"]) ? utf8_decode($_POST["idDetalle"]) : "";
	buscarProductoReemplazoSolicitud($buscar,$idDetalle);
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
	
	$vendedor=$_POST["vendedor"];
 	$vendedor=utf8_decode($vendedor);
	$garante=$_POST["garante"];
 	$garante=utf8_decode($garante);
	
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$formato=isset($_POST["formato"]) ? $_POST["formato"] : "";
	$formato=utf8_decode($formato);

 	BuscarRegistro($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$garante,$producto,$formato);
 }
 
 if($operacion=="buscar_informe_solicitud_credito"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$entregador=$_POST["entregador"];
 	$entregador=utf8_decode($entregador);
	$estado_entrega=$_POST["estado_entrega"];
 	$estado_entrega=utf8_decode($estado_entrega);
	$fecha_entrega=$_POST["fecha_entrega"];
 	$fecha_entrega=utf8_decode($fecha_entrega);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	

 	buscar_informe_solicitud_credito($fecha1,$fecha2,$cliente,$entregador,$estado_entrega,$fecha_entrega,$cod_localFK,$formato);
 }
 
 
 
 if($operacion=="buscarFotosGaleria"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscarFotosGaleria($buscar,$formato);
 }
 
   if($operacion=="buscar_archivos_garante"){
 	$buscar=$_POST["idGaranteFk"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscar_archivos_garante($buscar,$formato);
 }
 
 if($operacion=="buscarDocumentosClienteSolicitud"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscarDocumentosClienteSolicitud($buscar,$formato);
 }
 
 
  if($operacion=="buscarInfoClienteReferencia"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarInfoClienteReferencia($buscar);
 }
 
   if($operacion=="buscarProductoSolicitudVista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarProductoSolicitudVista($buscar);
 }
 
 
   if($operacion=="buscarmasreferenciasVista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarmasreferenciasVista($buscar);
 }
 
  if($operacion=="buscarDetalleProductoSolicitudParaVenta"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	
 	buscarDetalleProductoSolicitudParaVenta($buscar,$cod_localFK,$formato);
 } 
 
if($operacion=="buscarDetalleProductoSolicitudParaVentaVistaSolicitud"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	
 	buscarDetalleProductoSolicitudParaVenta($buscar,$cod_localFK,$formato);
 }
 
   if($operacion=="buscar_soliticud_credito_revision_documento"){
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
	
	$vendedor=$_POST["vendedor"];
 	$vendedor=utf8_decode($vendedor);
	$vendedor2=$_POST["vendedor2"];
 	$vendedor2=utf8_decode($vendedor2);
	
	$estado_entregado=$_POST["estado_entregado"];
 	$estado_entregado=utf8_decode($estado_entregado);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	buscar_soliticud_credito_revision_documento($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$estado_entregado,$vendedor2,$formato);
 }
 
  if($operacion=="buscar_soliticud_credito_revision_documento_pagare"){
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
	
	$vendedor=$_POST["vendedor"];
 	$vendedor=utf8_decode($vendedor);
	$entregado=$_POST["entregado"];
 	$entregado=utf8_decode($entregado);
	$vendedor2=$_POST["vendedor2"];
 	$vendedor2=utf8_decode($vendedor2);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	buscar_soliticud_credito_revision_documento_pagare($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$entregado,$vendedor2,$formato);
 }
  
 
   if($operacion=="buscarSolicitudCreditoAprobar"){
 	$Cliente=$_POST["Cliente"];
 	$Cliente=utf8_decode($Cliente);
 	$Local=$_POST["Local"];
 	$Local=utf8_decode($Local);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	
	 buscarSolicitudCreditoAprobar($Cliente,$Local,$estado,$fecha1,$fecha2,$formato);
 }
 
 
 
   if($operacion=="buscarSolicitudCreditoVerificarEquifax"){
 	$Cliente=$_POST["Cliente"];
 	$Cliente=utf8_decode($Cliente);
 	$Local=$_POST["Local"];
 	$Local=utf8_decode($Local);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	
	 buscarSolicitudCreditoVerificarEquifax($Cliente,$Local,$estado,$fecha1,$fecha2,$formato);
 }
 
 
 
 if($operacion=="EditarSolicitudCredito"  )
{

$idAbm=$_POST['idAbm'];
$idAbm = utf8_decode($idAbm);
$estado=$_POST['estado'];
$estado = utf8_decode($estado); 

$observacion=$_POST['observacion'];
$observacion = utf8_decode($observacion);

$cod_usuarioFK=$_POST['cod_usuarioFK'];
$cod_usuarioFK = utf8_decode($cod_usuarioFK); 

EditarSolicitudCredito($idAbm,$estado,$observacion,$cod_usuarioFK);

}




if($operacion=="DatosClienteParaEvaluar")
{
	$cod_clienteAprobar=$_POST['cod_clienteAprobar'];
$cod_clienteAprobar = utf8_decode($cod_clienteAprobar);

	$Cod_solicitudCreditoAprobar=$_POST['Cod_solicitudCreditoAprobar'];
$Cod_solicitudCreditoAprobar = utf8_decode($Cod_solicitudCreditoAprobar);

	DatosClienteParaEvaluar($cod_clienteAprobar,$Cod_solicitudCreditoAprobar);

}
 
   if($operacion=="buscarSolicitudCreditoVerificarGestionarReferencia"){
 	$Cliente=$_POST["Cliente"];
 	$Cliente=utf8_decode($Cliente);
 	$Local=$_POST["Local"];
 	$Local=utf8_decode($Local);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	
	 buscarSolicitudCreditoVerificarGestionarReferencia($Cliente,$Local,$estado,$fecha1,$fecha2,$formato);
 }
 


 
 if($operacion=="EditarEstadoSolicitudCredito" )
{

$idAbm=$_POST['idAbm'];
$idAbm = utf8_decode($idAbm); 

$observacion=$_POST['Observacion'];
$observacion = utf8_decode($observacion);

$comentario=$_POST['comentario'];
$comentario = utf8_decode($comentario);
 

EditarEstadoSolicitudCredito($idAbm,$observacion,$comentario);

}



 if($operacion=="FinalizarRefComercialCliente" )
{

$idAbm=$_POST['idAbm'];
$idAbm = utf8_decode($idAbm); 
  
FinalizarRefComercialCliente($idAbm);

}

 if($operacion=="buscarContadoresPendientesSolicitudCreditoMenu" )
{
buscarContadoresPendientesSolicitudCreditoMenu();
}
 

}




function obtenerTotalPendienteSolicitudCreditoMenu($mysqli, $condicionEstado)
{
	$sql = "select count(distinct sc.idSolicitudCredito) as total
	from solicitudcredito sc
	inner join cliente cl on cl.cod_cliente=sc.cod_clienteFK
	inner join persona pr on cl.cod_cliente=pr.cod_persona
	inner join detallesolicitud ds on sc.idSolicitudCredito = ds.idSolicitudCreditoFK
	where cl.estado='Activo' ".$condicionEstado;

	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_fetch_assoc($result);

	return intval($valor["total"]);
}

function buscarContadoresPendientesSolicitudCreditoMenu()
{
	$mysqli = conectar_al_servidor();

	$totalReferencias = obtenerTotalPendienteSolicitudCreditoMenu($mysqli, " and sc.estado_referencia = 'PENDIENTE' ");
	$totalEquifax = obtenerTotalPendienteSolicitudCreditoMenu($mysqli, " and sc.esteadoInforconf = 'PENDIENTE' ");
	$totalCreditos = obtenerTotalPendienteSolicitudCreditoMenu($mysqli, " and sc.estado in ('APROBADO','PENDIENTE','REVISION') ");

	mysqli_close($mysqli);

	$informacion = array(
		"1" => "exito",
		"2" => array(
			"referencias" => $totalReferencias,
			"equifax" => $totalEquifax,
			"creditos" => $totalCreditos
		)
	);

	echo json_encode($informacion);
	exit;
}

function  FinalizarRefComercialCliente($idAbm)
{ 
$mysqli=conectar_al_servidor(); 

 $consulta2="update solicitudcredito set  estado_referencia='FINALIZADO'   where idSolicitudCredito='$idAbm'";	

$stmt2 = $mysqli->prepare($consulta2); 
	

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}







 
function  EditarEstadoSolicitudCredito($idAbm,$observacion,$comentario)
{ 
$mysqli=conectar_al_servidor(); 

 $consulta2="update solicitudcredito set  observacion_general='$comentario' , observacion='$observacion'  where idSolicitudCredito='$idAbm'";	

$stmt2 = $mysqli->prepare($consulta2); 
	

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}




 
/*Buscar Registro en vista*/
function buscarSolicitudCreditoVerificarGestionarReferencia($Cliente,$Local,$estado,$fecha1,$fecha2,$formato="")
{ 
$mysqli=conectar_al_servidor();


$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
$condicionFecha=" and sc.fecha between '".$fecha1."' and '".$fecha2."' ";
}
 
$condicioncliente="";
if($Cliente!=""){
$condicioncliente="and concat((Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ),' ',cl.ci_cliente,' ',(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK ),' ',COALESCE(NULLIF(ds.nombre_producto_provisional,''),(select nombre_producto from producto where ds.codProducto=cod_producto),'')) like '%".$Cliente."%' ";
}
 
$condicionlocal="";
if($Local!=""){
$condicionlocal="and cod_localFK= '".$Local."' ";
}

 
$condicionestado="and sc.estado_referencia = 'PENDIENTE' ";
 if($estado != ''){
	 $condicionestado = " and sc.estado_referencia = '$estado'";
 }

$sql= "select cl.cod_cliente,observacion,idSolicitudCredito,detalleVenta, sc.fecha as fecha, sc.estado_referencia, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,cod_usuarioFK,
(Select nombre from zona where idzonaFk=idzona )as zona,sc.observacion_general,calificacion_cliente,
(Select Nombre from local where cod_local=cod_localFK ) as local,cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona = cod_usuarioFK )as Usuarioaprueba,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join detallesolicitud ds on sc.idSolicitudCredito = ds.idSolicitudCreditoFK
where cl.estado='Activo' ".$condicioncliente.$condicionlocal.$condicionestado.$condicionFecha." group by idSolicitudCredito  order by idSolicitudCredito desc limit 100";
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";

// echo($sql);
// exit;

$stmt = $mysqli->prepare($sql);

if (!$stmt) {
	mysqli_close($mysqli);
	$informacion = array("1" => "error", "2" => array(), "3" => "0");
	echo json_encode($informacion);
	exit;
}

if ( ! $stmt->execute()) {
	$stmt->close();
	mysqli_close($mysqli);
	$informacion = array("1" => "error", "2" => array(), "3" => "0");
	echo json_encode($informacion);
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
$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$estado_referencia = utf8_encode($valor['estado_referencia']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$observacion_general = utf8_encode($valor['observacion_general']); 
$calificacion_cliente = utf8_encode($valor['calificacion_cliente']);  
 
// Definir color según el estado
switch ($estado_referencia) {
    case "PENDIENTE":
        $colorEstado = "#f0ad4e"; // amarillo
        break;
    case "FINALIZADO":
        $colorEstado = "#0d6efd"; // azul
        break;
    default:
        $colorEstado = "#6c757d"; // gris (por si no coincide)
        break;
}
 

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

// Obtener faja
$faja = $calificacion_cliente;

// Obtener color según faja, con valor por defecto si no existe
if (isset($coloresFaja[$faja])) {
    $colorFaja = $coloresFaja[$faja];
	$color="color: #000;";
} else {
    $colorFaja = '#010036ff'; // negro por defecto
	$color="color: #fcfcfcff;";
}

 
$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);
$datosGaranteSolicitud = generarBloqueGaranteSolicitud($cod_codeudorFK, $garante, $docgarante);
 
$datos['idSolicitud']= $idSolicitudCredito;
$datos['cod_cliente']= $cod_cliente;
$datos['cod_codeudorFK']= $cod_codeudorFK;
$datos['nombre_persona']= $nombre_persona."--".$zona."--".$direccion;
$datos['garante']= $garante; 

 
$jsonDatos = json_encode($datos, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT);


 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_cliente" => $cod_cliente,
		"id_solicitud" => $idSolicitudCredito,
		"id_garante" => $cod_codeudorFK,
		"cliente" => $nombre_persona,
		"documento" => $ci_cliente,
		"garante" => $garante,
		"documento_garante" => $docgarante,
		"local" => $local,
		"estado" => $estado_referencia,
		"vendedor" => $UsuarioIngresa,
		"fecha" => $fecha,
		"calificacion" => $faja,
		"productos" => isset($producto[4]) && is_array($producto[4]) ? $producto[4] : array(),
		"nombre_accion" => $nombre_persona."--".$zona."--".$direccion,
		"clase_fila" => $styleName
	);
	if(!$devolverArray){
	  $pagina.="<div class='col-12 col-sm-6 col-md-4 col-lg-3' >
					<div class='card shadow-sm border border-light mb-3'>
					  <div class='card-body text-center'>
						<p class='fw-bold mb-3' style='font-size: 15px; border-bottom: double;'>
						  DATOS CLIENTE
						</p>
						<div class='text-start'>
						   <!-- Calificación resaltada -->
                <p class='mb-2'>
					<span class='fw-bold px-2 py-1 rounded' style='".$color."background-color:$colorFaja; '>
						 $faja
					</span>
				</p>
						  <p class='mb-1 small text-secondary'>
							CLIENTE: <span class='fw-semibold text-dark'>".$nombre_persona."</span>
						  </p>
						  <p class='mb-1 small text-secondary'>
							NRO CI: <span class='fw-semibold text-dark'>".$ci_cliente."</span>
						  </p>
						  ".$datosGaranteSolicitud."
						  <p class='mb-1 small text-secondary'>
							LOCAL: <span class='fw-semibold text-dark'>".$local."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							REFERENCIA:  <span class='fw-semibold' style='color: $colorEstado '>".$estado_referencia."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							VENDEDOR: <span class='fw-semibold text-dark'>".$UsuarioIngresa."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							FECHA: <span class='fw-semibold text-dark'>".$fecha."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							PRODUCTO: <span class='fw-semibold text-dark'> ".$producto[0]." </span>
						  </p>
						</div>
						 <button 
							class='btn btn-sm btn-primary mt-3 btnSeleccionarReferencia'
							data-datos=' $jsonDatos '>
							Seleccionar
						</button>
				 </div>
					</div>
				</div> ";
 
}
}
}

$stmt->close();
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}

 
function generarBloqueGaranteSolicitud($cod_codeudorFK, $garante, $docgarante)
{
	$cod_codeudorFK = trim($cod_codeudorFK);
	$garante = trim($garante);
	$docgarante = trim($docgarante);

	if ($cod_codeudorFK == "" || $cod_codeudorFK == "0" || $cod_codeudorFK == "6" || $garante == "") {
		return "";
	}

	if ($docgarante == "") {
		$docgarante = "SIN REGISTRO";
	}

	$garante = htmlspecialchars($garante, ENT_QUOTES, "UTF-8");
	$docgarante = htmlspecialchars($docgarante, ENT_QUOTES, "UTF-8");

	return "
	<div class='solicitud-garante-resumen'>
		<div class='solicitud-garante-titulo'>DATOS GARANTE</div>
		<p class='mb-1 small text-secondary'>
			GARANTE: <span class='fw-semibold text-dark'>".$garante."</span>
		</p>
		<p class='mb-0 small text-secondary'>
			NRO CI: <span class='fw-semibold text-dark'>".$docgarante."</span>
		</p>
	</div>";
}

function obtenerClasesEstadoPagoCuotaCredito($fechaVencimiento, $cantidadPagos, $totalPago, $diasMoraPago, $deudaActual)
{
	$clases = array(
		"cuota" => "cuota-pendiente",
		"pago" => "pago-al-dia"
	);

	$fechaVencimientoTimestamp = strtotime($fechaVencimiento);
	$hoyTimestamp = strtotime(date("Y-m-d"));
	$tienePago = (intval($cantidadPagos) > 0 || floatval($totalPago) > 0);
	$diasMoraPago = intval($diasMoraPago);
	$deudaActual = floatval($deudaActual);

	if ($tienePago && $diasMoraPago > 0) {
		$clases["cuota"] = "cuota-pago-mora";
		$clases["pago"] = "pago-con-mora";
		return $clases;
	}

	if ($tienePago) {
		$clases["cuota"] = "cuota-pago-dia";
		return $clases;
	}

	if ($fechaVencimientoTimestamp !== false && $fechaVencimientoTimestamp < $hoyTimestamp && $deudaActual > 0) {
		$clases["cuota"] = "cuota-vencida-sin-pago";
	}

	return $clases;
}


/*Buscar Registro en vista*/
function buscarSolicitudCreditoVerificarEquifax($Cliente,$Local,$estado,$fecha1,$fecha2,$formato="")
{
$mysqli=conectar_al_servidor();


$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
$condicionFecha=" and fecha between '".$fecha1."' and '".$fecha2."' ";
}
 
$condicioncliente="";
if($Cliente!=""){
$condicioncliente="and concat((Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ),' ',cl.ci_cliente,' ',(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK ),' ',COALESCE(NULLIF(ds.nombre_producto_provisional,''),(select nombre_producto from producto where ds.codProducto=cod_producto),'')) like '%".$Cliente."%' ";
}
 
$condicionlocal="";
if($Local!=""){
$condicionlocal="and cod_localFK= '".$Local."' ";
}

 
$condicionestado="and sc.esteadoInforconf = 'PENDIENTE' ";
 if($estado != ''){
	 $condicionestado = " and sc.esteadoInforconf = '$estado'";
 }

$sql= "select cl.cod_cliente,observacion,idSolicitudCredito,detalleVenta, fecha, sc.esteadoInforconf, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,cod_usuarioFK,
(Select nombre from zona where idzonaFk=idzona )as zona,sc.observacion_general,calificacion_cliente,
(Select Nombre from local where cod_local=cod_localFK ) as local,cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona = cod_usuarioFK )as Usuarioaprueba,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join detallesolicitud ds on sc.idSolicitudCredito = ds.idSolicitudCreditoFK
where cl.estado='Activo' ".$condicioncliente.$condicionlocal.$condicionestado.$condicionFecha." group by idSolicitudCredito  order by idSolicitudCredito desc limit 100";
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

$cod_cliente = utf8_encode($valor['cod_cliente']); 
$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$esteadoInforconf = utf8_encode($valor['esteadoInforconf']); 
$idzonaFk = utf8_encode($valor['idzonaFk']); 
$zona = utf8_encode($valor['zona']); 
$ci_cliente = utf8_encode($valor['ci_cliente']); 
$lugardetrabajo = utf8_encode($valor['lugardetrabajo']); 
$salario = utf8_encode($valor['salario']); 
$antiguedad = utf8_encode($valor['antiguedad']); 
$teleftrab1 = utf8_encode($valor['teleftrab1']); 
$teleftrab2 = utf8_encode($valor['teleftrab2']); 
$direcciontrab = utf8_encode($valor['direcciontrab']); 
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$observacion_general = utf8_encode($valor['observacion_general']); 
$calificacion_cliente = utf8_encode($valor['calificacion_cliente']); 

 
// Definir color según el estado
switch ($esteadoInforconf) {
    case "PENDIENTE":
        $colorEstado = "#f0ad4e"; // amarillo
        break;
    case "FINALIZADO":
        $colorEstado = "#0d6efd"; // azul
        break;
    default:
        $colorEstado = "#6c757d"; // gris (por si no coincide)
        break;
}
 

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

// Obtener faja
$faja = $calificacion_cliente;

// Obtener color según faja, con valor por defecto si no existe
if (isset($coloresFaja[$faja])) {
    $colorFaja = $coloresFaja[$faja];
	$color="color: #000;";
} else {
    $colorFaja = '#010036ff'; // negro por defecto
	$color="color: #fcfcfcff;";
}

 
$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);
$datosGaranteSolicitud = generarBloqueGaranteSolicitud($cod_codeudorFK, $garante, $docgarante);
 
$datos['idSolicitud']= $idSolicitudCredito;
$datos['cod_cliente']= $cod_cliente;
$datos['cod_codeudorFK']= $cod_codeudorFK;
$datos['nombre_persona']= $nombre_persona;
$datos['garante']= $garante; 

 
$jsonDatos = json_encode($datos, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT);


 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_cliente" => $cod_cliente,
		"id_solicitud" => $idSolicitudCredito,
		"id_garante" => $cod_codeudorFK,
		"cliente" => $nombre_persona,
		"documento" => $ci_cliente,
		"garante" => $garante,
		"documento_garante" => $docgarante,
		"local" => $local,
		"estado" => $esteadoInforconf,
		"vendedor" => $UsuarioIngresa,
		"fecha" => $fecha,
		"calificacion" => $faja,
		"productos" => isset($producto[4]) && is_array($producto[4]) ? $producto[4] : array(),
		"nombre_accion" => $nombre_persona,
		"clase_fila" => $styleName
	);
	if(!$devolverArray){
	  $pagina.="<div class='col-12 col-sm-6 col-md-4 col-lg-3' >
					<div class='card shadow-sm border border-light mb-3'>
					  <div class='card-body text-center'>
						<p class='fw-bold mb-3' style='font-size: 15px; border-bottom: double;'>
						  DATOS CLIENTE
						</p>
						<div class='text-start'>
						   <!-- Calificación resaltada -->
                <p class='mb-2'>
					<span class='fw-bold px-2 py-1 rounded' style='".$color."background-color:$colorFaja; '>
						 $faja
					</span>
				</p>

						  <p class='mb-1 small text-secondary'>
							CLIENTE: <span class='fw-semibold text-dark'>".$nombre_persona."</span>
						  </p>
						  <p class='mb-1 small text-secondary'>
							NRO CI: <span class='fw-semibold text-dark'>".$ci_cliente."</span>
						  </p>
						  ".$datosGaranteSolicitud."
						  <p class='mb-1 small text-secondary'>
							LOCAL: <span class='fw-semibold text-dark'>".$local."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							EQUIFAX:  <span class='fw-semibold' style='color: $colorEstado '>".$esteadoInforconf."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							VENDEDOR: <span class='fw-semibold text-dark'>".$UsuarioIngresa."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							FECHA: <span class='fw-semibold text-dark'>".$fecha."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							PRODUCTO: <span class='fw-semibold text-dark'> ".$producto[0]." </span>
						  </p>
						</div>

						 <button 
							class='btn btn-sm btn-primary mt-3 btnSeleccionar'
							data-datos=' $jsonDatos '>
							Seleccionar
						</button>


				 </div>
					</div>
				</div> ";
 
}
}
}
 
    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}

 






 
function BuscarDaTosClienteAprobarSolicitudCredito($cod_cliente)
{
    $mysqli = conectar_al_servidor();

    $sql = " SELECT  vt.cod_venta,
            cr.fechapago as FechaVencimiento,plazo,
            (cr.Monto - cr.descuento) AS TotalCuota,
            IFNULL(
                (SELECT SUM(p.Monto) 
                 FROM pago p 
                 WHERE p.cod_creditoFK = cr.idcredito 
                 AND p.Tipo = 'Pago Cuota'), 
            0) AS TotalPagado,
            IFNULL(
                (SELECT Fecha
                 FROM pago p 
                 WHERE p.cod_creditoFK = cr.idcredito 
                 AND p.Tipo = 'Pago Cuota' order by idPago desc limit 1), 
            0) AS fechaPago
        FROM venta vt 
        INNER JOIN credito cr ON cr.cod_venta = vt.cod_venta
        WHERE vt.cod_clienteFK = '".$cod_cliente."' AND TipoVenta='CREDITO' and cr.Monto!=0
        AND (SELECT COUNT(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0
    ";
 
    $stmt = $mysqli->prepare($sql); 
    $stmt->execute();

    $result = $stmt->get_result();

    $total_vendido = 0;
    $total_pagado = 0;
    $deuda_total = 0;

    // NUEVOS ACUMULADORES PARA PROMEDIO
    $suma_dias_atraso = 0;
    $cantidad_vencidas = 0;
    $deuda_mensual = "SIN REGISTRO";
    $ClienteNueo_0_recurrente = "CLIENTE NUEVO";
    $CantidadCuotasPagadas = "0";
    $Contador = "0";

    $fecha_hoy = new DateTime(date('Y-m-d'));
    $mes_actual = $fecha_hoy->format('Y-m');
 

while ($row = $result->fetch_assoc()) {

    $ClienteNueo_0_recurrente = "CLIENTE RECURRENTE";

    $TotalCuota       = (float)$row['TotalCuota'];
    $TotalPagado      = (float)$row['TotalPagado'];
    $FechaVencimiento = new DateTime($row['FechaVencimiento']);
    $fechaPagoDB      = $row['fechaPago'];

    $deuda_venta = max(0, $TotalCuota - $TotalPagado);

    $total_vendido += $TotalCuota;
    $total_pagado  += $TotalPagado;
    $deuda_total   += $deuda_venta;
	
	
	if($deuda_venta<="0"){
		$CantidadCuotasPagadas++;
	}

    /* =========================
       CÁLCULO DE ATRASO
    ========================= */
    $dias_atraso = 0;

	/* ========================= DEUDA MENSUAL ========================= */ 
	if ($deuda_venta > 0 ) {

		if ($FechaVencimiento->format('Y-m') === $mes_actual) {
			 $deuda_mensual += $deuda_venta; 
		}
		
		}else{
		$deuda_mensual=0;
		}

    // CUOTA PAGADA
    if ($TotalPagado >= $TotalCuota && $fechaPagoDB != 0) {

        $fechaPago = new DateTime($fechaPagoDB);

        if ($fechaPago > $FechaVencimiento) {
            $dias_atraso = $FechaVencimiento->diff($fechaPago)->days;
        }else{
			$dias_atraso=0;
		}

    }
    // CUOTA IMPAGA
    else {
        if ($fecha_hoy > $FechaVencimiento) {
            $dias_atraso = $FechaVencimiento->diff($fecha_hoy)->days;
        }
    }

    // ACUMULAR PARA PROMEDIO
    if ($dias_atraso > 0) {
        $suma_dias_atraso += $dias_atraso;
        $cantidad_vencidas++;
    }
	
	
	if ($fecha_hoy > $FechaVencimiento) {
        $Contador++;
    }
	
	
}


    // PROMEDIO FINAL
    $promedio_dias_atraso = "SIN REGISTRO";
    if ($cantidad_vencidas > 0) {
        $promedio_dias_atraso = round($suma_dias_atraso / $cantidad_vencidas, 0);
    }else{
		if($suma_dias_atraso!=0){
			$promedio_dias_atraso = round($suma_dias_atraso / $Contador, 0);
		}else{
			$promedio_dias_atraso =0;
		}
		
	}
	

    $porcentaje_deuda = "SIN REGISTRO";
    if ($total_vendido > 0) {
        $porcentaje_deuda = round(($deuda_total * 100) / $total_vendido, 2);
    }

    return [
        "total_vendido"           => $total_vendido,
        "total_pagado"            => $total_pagado,
        "deuda_actual"            => $deuda_total,
        "promedio_dias_atraso"    => $promedio_dias_atraso,
		"deuda_mensual"           => $deuda_mensual,
		"ClienteNueo_0_recurrente"  => $ClienteNueo_0_recurrente,
		"CantidadCuotasPagadas"   => $CantidadCuotasPagadas,
        "porcentaje_deuda"        => $porcentaje_deuda
    ];
}



 
 function DatosClienteParaEvaluar($cod_cliente,$Cod_solicitudCreditoAprobar)
{
$mysqli=conectar_al_servidor();

$sql= "select 
(Select nombre from zona where idzonaFk=idzona )as zona, cl.tipo_vivienda ,
concat(pr.nombre_persona,' ',pr.apellido_persona) as cliente,cl.calificacion_cliente,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo, 
(select count(*) from fotos_cliente where descripcion IN ('3', '20')) as fotos_total,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,cl.tipo_cliente 
 from cliente cl inner join persona pr on cl.cod_cliente=pr.cod_persona 
where cl.cod_cliente ='$cod_cliente'";

// echo $sql;
// exit;
$mysqli->set_charset("utf8mb4");

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$datosCliente="";
$pagina = '';
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$fotos_total = ($valor['fotos_total']);     
$obsTrabajo = ($valor['obsTrabajo']);    
$fechanac = ($valor['fechanac']);     
$nombre_persona = ($valor['cliente']);          
$direccion = ($valor['direccion']);          
$telefono = ($valor['telefono']); 
$email = ($valor['email']); 
$rut_cliente = ($valor['rut_cliente']); 
$whapp = ($valor['whapp']); 
$idzonaFk = ($valor['idzonaFk']); 
$zona = ($valor['zona']); 
$ci_cliente = ($valor['ci_cliente']); 
$lugardetrabajo = ($valor['lugardetrabajo']); 
$salario = ($valor['salario']); 
$antiguedad = ($valor['antiguedad']); 
$teleftrab1 = ($valor['teleftrab1']); 
$teleftrab2 = ($valor['teleftrab2']); 
$direcciontrab = ($valor['direcciontrab']);
$tipo_cliente = ($valor['tipo_cliente']);
$tipo_vivienda = ($valor['tipo_vivienda']); 
$calificacion_cliente = ($valor['calificacion_cliente']); 

$pagina = "1";


	
$DatosDeuda=BuscarDaTosClienteAprobarSolicitudCredito($cod_cliente);

  	$porcentaje_deuda_actual= BuscarDeudaActual($cod_cliente);
	$dias_atraso= $DatosDeuda["promedio_dias_atraso"];
	$deuda_mensual= BuscarDeudaMensual($cod_cliente);
	$DeudaUltimaVenta=BuscarDeudaUltimaVenta($cod_cliente);
	$ClienteNueo_0_recurrente= $DatosDeuda["ClienteNueo_0_recurrente"];
	$CantidadCuotasPagadas= $DatosDeuda["CantidadCuotasPagadas"];

	if($porcentaje_deuda_actual=="SIN REGISTRO" && $dias_atraso!="SIN REGISTRO"){
		$porcentaje_deuda_actual="0%";
	}

	if($deuda_mensual=="SIN REGISTRO" && $dias_atraso!="SIN REGISTRO"){
		$deuda_mensual=0;
	}

	if($DeudaUltimaVenta=="SIN REGISTRO" && $dias_atraso!="SIN REGISTRO"){
		$DeudaUltimaVenta="0%";
	}
 
	
    $MontosolicitudCredito= buscarDetalleSolicitud($Cod_solicitudCreditoAprobar);
 
	 $MontoDeudaActivaReferencia= $MontosolicitudCredito[0];	
$historial_inforconf= $MontosolicitudCredito[2];
 
$antiguedad_meses = convertirAntiguedadAMeses($antiguedad);
$antiguedad_meses = strval($antiguedad_meses);

if($fechanac!="0000-00-00"){
	 
$nacimiento = new DateTime($fechanac);

// Crear un objeto DateTime para la fecha actual
$hoy = new DateTime();

// Calcular la diferencia
$edad = $hoy->diff($nacimiento)->y;
}else{
	$edad ="SIN REGISTRO";
}

 
 
$datosCliente = [
    "nombre_persona" => $nombre_persona,
    "cedula" => $ci_cliente,
    "edad" => $edad ,
    "telefono" => $telefono,
    "whatsapp" => $whapp,
    "zona" => $zona,
    "trabajo" => $lugardetrabajo,
    "salario" => $salario,
    "antiguedad" => $antiguedad_meses,
    "direccion_trabajo" => $direcciontrab,
    "fotos_total" => $fotos_total, 
    "tipo_vivienda" => $tipo_vivienda,	
    "porcentaje_deuda_actual" => $porcentaje_deuda_actual,
    "dias_atraso" => $dias_atraso,
    "MontoDeudaActivaReferencia" => $MontoDeudaActivaReferencia, 
    "historial_inforconf" => $historial_inforconf,
    "MontosolicitudCredito" => $MontosolicitudCredito[1], 	
    "deuda_mensual" => $deuda_mensual, 	 
    "ClienteNueo_0_recurrente" => $ClienteNueo_0_recurrente, 	
    "calificacion_cliente" => $calificacion_cliente, 	
    "DeudaUltimaVenta" => $DeudaUltimaVenta, 	
    "CantidadCuotasPagadas" => $CantidadCuotasPagadas, 	
    "tipo_cliente" => $tipo_cliente
];
 		    
}
}


mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $pagina,"3" => $datosCliente);
echo json_encode($informacion);	
exit;

}








function convertirAntiguedadAMeses($antiguedad)
{
    if (empty($antiguedad)) {
        return 0;
    }

    // Normalizar a UTF-8 NFC (maneja Ñ combinada)
    if (class_exists('Normalizer')) {
        $antiguedad = normalizer_normalize($antiguedad, Normalizer::FORM_C);
    }

    // Eliminar espacios extras al inicio y fin
    $antiguedad = trim($antiguedad);

    // Regex: número seguido de espacios opcionales y unidad
    if (!preg_match('/(\d+)\s*(AÑO|AÑOS|ANIO|ANIOS|MES|MESES)/iu', $antiguedad, $m)) {
        return 0;
    }

    $valor = (float)$m[1];  // Soporta decimales
    $unidad = strtoupper($m[2]);

    // Si es año
    if (strpos($unidad, 'A') !== false ) {
        return $valor * 12;
    }

    // Si es mes
    return $valor;
}
 
/*Buscar Registro en vista*/
function buscarDetalleSolicitud($codigo)
{
$mysqli=conectar_al_servidor();



$sql= "SELECT sum(plan) as plan , cuotas , calificacion_inforconf, idSolicitudCreditoFK , ifnull( FORMAT(monto_referencia, 0, 'es_ES') ,'SIN REGISTROS') as monto_referencia 
 FROM detallesolicitud inner join solicitudcredito on idSolicitudCredito=idSolicitudCreditoFK where idSolicitudCreditoFK='".$codigo."' ";
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
$resultado="0";
$calificacion_inforconf="SIN REGISTROS";
$monto_referencia="SIN REGISTROS";
$datos=null;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$plan = $valor['plan']; 
$cuotas = $valor['cuotas']; 
$monto_referencia = $valor['monto_referencia'];
$calificacion_inforconf = $valor['calificacion_inforconf'];

$resultado=$plan / $cuotas;

	 
}
}

$datos[0]=$monto_referencia;
$datos[1]=$resultado;
$datos[2]=$calificacion_inforconf;
 return $datos;
}


 
 
function  EditarSolicitudCredito($idAbm,$estado,$observacion,$cod_usuarioFK)
{ 
$mysqli=conectar_al_servidor(); 
asegurarColumnasProductoProvisionalSolicitudCredito($mysqli);

if($estado=="APROBADO" && solicitudCreditoTieneProductosProvisionales($mysqli,$idAbm)){
	mysqli_close($mysqli);
	echo json_encode(array(
		"1" => "producto_provisional",
		"2" => "NO SE PUEDE APROBAR: CAMBIE PRIMERO LOS PRODUCTOS MARCADOS COMO NO REGISTRADOS"
	));
	exit;
}

 $consulta2="update solicitudcredito set estado='$estado' ,obs_ia='$observacion', cod_usuarioFK='".$cod_usuarioFK."',estado_analisis='PROCESADO' where idSolicitudCredito='$idAbm'";	

$stmt2 = $mysqli->prepare($consulta2); 
	

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

 

/*Buscar Registro en vista*/
function buscarSolicitudCreditoAprobar($Cliente,$Local,$estado,$fecha1,$fecha2,$formato="")
{
$mysqli=conectar_al_servidor();

 
$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
$condicionFecha=" and fecha between '".$fecha1."' and '".$fecha2."' ";
}
 
$condicioncliente="";
if($Cliente!=""){
$condicioncliente="and concat((Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ),' ',cl.ci_cliente,' ',(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK ),' ',(select nombre_producto from producto where ds.codProducto=cod_producto)) like '%".$Cliente."%' ";
}
 
$condicionlocal="";
if($Local!=""){
$condicionlocal="and cod_localFK= '".$Local."' ";
}

 
$condicionestado="and sc.estado in ('APROBADO','PENDIENTE','REVISION') ";
 if($estado != ''){
	 $condicionestado = " and sc.estado = '$estado'";
 }

$sql= "select cl.cod_cliente,observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,cod_usuarioFK,
IFNULL(sc.entrega_inicial,0) as entrega_inicial,
(Select nombre from zona where idzonaFk=idzona )as zona,sc.observacion_general,calificacion_cliente,
(Select Nombre from local where cod_local=cod_localFK ) as local,cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona = cod_usuarioFK )as Usuarioaprueba,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join detallesolicitud ds on sc.idSolicitudCredito = ds.idSolicitudCreditoFK
where cl.estado='Activo' ".$condicioncliente.$condicionlocal.$condicionestado.$condicionFecha." group by idSolicitudCredito  order by idSolicitudCredito desc limit 100";
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

$cod_cliente = utf8_encode($valor['cod_cliente']); 
$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$observacion_general = utf8_encode($valor['observacion_general']); 
$calificacion_cliente = utf8_encode($valor['calificacion_cliente']); 
$entrega_inicial = floatval($valor['entrega_inicial']);


 

// Definir color según el estado
switch ($estado) {
    case "PENDIENTE":
        $colorEstado = "#f0ad4e"; // amarillo
        break;
    case "APROBADO":
        $colorEstado = "#28a745"; // verde
        break;
    case "FINALIZADO":
        $colorEstado = "#0d6efd"; // azul
        break;
    case "RECHAZADO":
        $colorEstado = "#dc3545"; // rojo
        break;
    case "REVISION":
        $colorEstado = "#6f42c1"; // violeta
        break;
    default:
        $colorEstado = "#6c757d"; // gris (por si no coincide)
        break;
}
 

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

// Obtener faja
$faja = $calificacion_cliente;

// Obtener color según faja, con valor por defecto si no existe
if (isset($coloresFaja[$faja])) {
    $colorFaja = $coloresFaja[$faja];
	$color="color: #000;";
} else {
    $colorFaja = '#010036ff'; // negro por defecto
	$color="color: #fcfcfcff;";
}




 
$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);
$datosGaranteSolicitud = generarBloqueGaranteSolicitud($cod_codeudorFK, $garante, $docgarante);

 $styleName=CargarStyleTable($styleName);
	$filas[] = array(
		"id_cliente" => $cod_cliente,
		"id_solicitud" => $idSolicitudCredito,
		"id_garante" => $cod_codeudorFK,
		"cliente" => $nombre_persona,
		"documento" => $ci_cliente,
		"garante" => $garante,
		"documento_garante" => $docgarante,
		"local" => $local,
		"estado" => $estado,
		"vendedor" => $UsuarioIngresa,
		"fecha" => $fecha,
		"calificacion" => $faja,
		"entrega_inicial" => $entrega_inicial,
		"entrega_formateada" => number_format($entrega_inicial, 0, ',', '.'),
		"productos" => isset($producto[4]) && is_array($producto[4]) ? $producto[4] : array(),
		"clase_fila" => $styleName
	);
	if(!$devolverArray){
	  $pagina.="<div class='col-12 col-sm-6 col-md-4 col-lg-3' >
					<div class='card shadow-sm border border-light mb-3'>
					  <div class='card-body text-center'>
						<p class='fw-bold mb-3' style='font-size: 15px; border-bottom: double;'>
						  DATOS CLIENTE
						</p>
						<div class='text-start'>
						   <!-- Calificación resaltada -->
                <p class='mb-2'>
					<span class='fw-bold px-2 py-1 rounded' style='".$color."background-color:$colorFaja; '>
						 $faja
					</span>
				</p>

						  <p class='mb-1 small text-secondary'>
							CLIENTE: <span class='fw-semibold text-dark'>".$nombre_persona."</span>
						  </p>
						  <p class='mb-1 small text-secondary'>
							NRO CI: <span class='fw-semibold text-dark'>".$ci_cliente."</span>
						  </p>
						  ".$datosGaranteSolicitud."
						  <p class='mb-1 small text-secondary'>
							LOCAL: <span class='fw-semibold text-dark'>".$local."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							ESTADO:  <span class='fw-semibold' style='color: $colorEstado '>".$estado."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							VENDEDOR: <span class='fw-semibold text-dark'>".$UsuarioIngresa."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							FECHA: <span class='fw-semibold text-dark'>".$fecha."</span>
						  </p>
						  
						  <p class='mb-1 small text-secondary'>
							PRODUCTO: <span class='fw-semibold text-dark'> ".$producto[0]." </span>
						  </p>
						</div>

						<button onclick='AprobarSolicitudCredito(".$cod_cliente.",".$idSolicitudCredito.",".$cod_codeudorFK.")' 
								class='btn btn-sm btn-primary mt-3'>
						  Seleccionar
						</button>
					  </div>
					</div>
				</div> ";
	}
	}


}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}

 
function buscarProductoSolicitud($buscar,$formato='')
{
	
$mysqli=conectar_al_servidor();
asegurarColumnasProductoProvisionalSolicitudCredito($mysqli);
$sql= "select iddetallesolicitud, cantidad, codProducto,cuotas, plan, idSolicitudCreditoFK,
 COALESCE(NULLIF(nombre_producto_provisional,''),(select nombre_producto from producto where codProducto=cod_producto)) as producto,
 IF(es_provisional=1,'PROVISIONAL',(SELECT tipo_producto FROM producto where cod_producto = codProducto)) as tipo,
 IF(es_provisional=1,'NO REGISTRADO',(select cod_barra from producto where codProducto=cod_producto)) as cod_Barra,
 es_provisional,
(select cod_localFK from solicitudcredito where idSolicitudCredito=idSolicitudCreditoFK) as cod_localFK,
(select observacion_general from solicitudcredito where idSolicitudCredito=idSolicitudCreditoFK) as observacion_general,
(select observacion from solicitudcredito where idSolicitudCredito=idSolicitudCreditoFK) as observacion
from detallesolicitud where idSolicitudCreditoFK='$buscar' ";

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
$totalVenta=0;
$cuotas =1;
$Cuotero =0;
$observacion_general = "";
$observacion = "";
 $styleName="tableRegistroSearch";
 $filas=array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cuotas = utf8_encode($valor['cuotas']);
$iddetallesolicitud = utf8_encode($valor['iddetallesolicitud']);
$cantidad = utf8_encode($valor['cantidad']);     
$codProducto = utf8_encode($valor['codProducto']);          
$plan = utf8_encode($valor['plan']);          
$idSolicitudCreditoFK = utf8_encode($valor['idSolicitudCreditoFK']); 
$producto = utf8_encode($valor['producto']); 
$cod_Barra = utf8_encode($valor['cod_Barra']); 
$tipo = strtoupper(trim(utf8_encode($valor['tipo'])));
$es_provisional = (int)$valor['es_provisional'];
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$observacion_general = utf8_encode($valor['observacion_general']);
$observacion = utf8_encode($valor['observacion']);

$plan = quitarseparadormiles($plan);


$btnVistaCombo = '';
if($tipo == 'COMBO'){
	$btnVistaCombo = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"buscarvistacomboproductosolicitud('$codProducto','vista_solicitud','$cod_localFK')\" />";
}


$filas[]=array(
	"codigo_producto" => $codProducto,
	"codigo_barra" => $cod_Barra,
	"producto" => $producto,
	"cantidad" => (float)$cantidad,
	"precio" => (float)$plan,
	"precio_formateado" => number_format($plan,'0',',','.'),
	"codigo_detalle" => $iddetallesolicitud,
	"cuotas" => $cuotas,
	"tipo" => $tipo,
	"es_provisional" => $es_provisional,
	"codigo_local" => $cod_localFK
);

$totalVenta= $totalVenta + ($cantidad * quitarseparadormiles($plan));
if( $cuotas==""){
	 $cuotas=1;
}
$Cuotero = $totalVenta / $cuotas;

if($formato !== 'json') {
 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosProductoCredito(this)'  name='tdDetalleSolicitudCredito'>
<td  id='td_id_1' style='display:none'>".$codProducto."</td>
<td  id='td_datos_1' style='width:20%'>".$cod_Barra."</td>
<td  id='td_datos_2' style='width:40%'>".$producto."</td>
<td id='td_datos_3' style='width:10%'>".$cantidad."</td>
<td id='td_datos_4' style='width:20%'>".number_format($plan,'0',',','.')."</td>
<td id='td_id_2' style='display:none'>".$iddetallesolicitud."</td>
<td id='td_datos_5' style='width:10%'>".$cuotas."</td>
<td id='' style='width:10%'>".$btnVistaCombo."</td>
</tr>
</table>";
}
}

$ResultadoTotal= "<p>".number_format($totalVenta,'0',',','.') ."</p><br> <p style='font-size: 17px; margin-top: -20px;' >".$cuotas." * ".number_format(round($Cuotero),'0',',','.')."</p>";

    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina) ,"3" => $ResultadoTotal ,"4" => $totalVenta ,"5" => $cuotas,"6" => $observacion_general,"7" => $observacion );
echo json_encode($informacion);	
exit;
}
}

 
/*Buscar Registro en vista*/
function buscarFotosGaleria($codigo,$formato='')
{
$mysqli=conectar_al_servidor();



$sql= "select  cl.cod_cliente ,foto1 , foto2
 from   cliente cl  
where  cod_cliente='".$codigo."' ";
$pagina = $formato === 'json' ? array() : "";
$foto1 = "";
$foto2 = "";
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

		$detalleGaleria = buscarFotosGaleriaDetalle($cod_cliente,$formato);
		if($formato === 'json'){
			$pagina = array_merge($pagina,$detalleGaleria);
		}else{
			$pagina .= $detalleGaleria;
		}
		 


}
}

 
$informacion =array("1" => "exito","2" => $pagina ,"3" => $foto1 ,"4" => $foto2);
echo json_encode($informacion);	
exit;
}

/*Buscar Registro en vista*/
function buscar_archivos_garante($codclienteFK,$formato='')
{
$mysqli=conectar_al_servidor();



$sql= "SELECT url, descripcion FROM fotos_cliente  
where  cod_clienteFK='".$codclienteFK."' ";

$pagina = "";
$filas = array();
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



$url = utf8_encode($valor['url']);    
$descripcion = utf8_encode($valor['descripcion']);               


$ver = "";
if($url != ''){
	$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
}
		
$filas[]=array("url" => $url,"descripcion" => $descripcion,"origen" => "foto");

if($formato !== 'json') {
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td style='width:70%;'>
".$descripcion."
</td>
<td style='width:30%;'>
".$ver."
</td>
</tr>
</table>
		 
"; 
	}
		 


}
}


$sql= "SELECT url, descripcion FROM archivos_cliente  
where  cod_clienteFK='".$codclienteFK."' ";

  
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



$url = utf8_encode($valor['url']);    
$descripcion = utf8_encode($valor['descripcion']);               


$ver = "";
if($url != ''){
	$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
}
		
$filas[]=array("url" => $url,"descripcion" => $descripcion,"origen" => "archivo");

if($formato !== 'json') {
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td style='width:70%;'>
".$descripcion."
</td>
<td style='width:30%;'>
".$ver."
</td>
</tr>
</table>
		 
"; 
	}
		 


}
}

 
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}


function buscarDocumentosClienteSolicitud($codigo,$formato='')
{
$mysqli=conectar_al_servidor();



$sql= "select  descripcion,fecha,url
 from   archivos_cliente
where  cod_clienteFK='".$codigo."' ";
$pagina = "";
$filas = array();
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


$descripcion = utf8_encode($valor['descripcion']); 
$fecha = utf8_encode($valor['fecha']); 
$url = utf8_encode($valor['url']); 

$filas[]=array(
	"descripcion" => $descripcion,
	"fecha" => $fecha,
	"url" => $url
);

$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";


if($formato !== 'json'){
$styleName=CargarStyleTable($styleName);
		$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td id='td_datos_2' style='width:80%' >".$descripcion."</td>
<td id='td_datos_3' style='width:10%'>".$fecha."</td>
<td id='td_datos_4' style='width:10%;text-align:center'>".$ver."</td>
</tr>
</table>
";
	}
		 


}
}

mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}

 function buscarInfoClienteReferencia($cod_cliente)
{
$mysqli=conectar_al_servidor();

$sql= "select 
(Select nombre from zona where idzonaFk=idzona )as zona,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_cliente )as cliente
 from cliente cl inner join persona pr on cl.cod_cliente=pr.cod_persona 
where cl.cod_cliente ='$cod_cliente'";



$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$arrayDatos = array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$obsTrabajo = utf8_encode($valor['obsTrabajo']);    
$fechanac = utf8_encode($valor['fechanac']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
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

$arrayDatos = [$obsTrabajo, $fechanac, $nombre_persona, $direccion,$telefono,$email,$rut_cliente,$whapp,$idzonaFk,$zona,$ci_cliente,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab];

}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $arrayDatos);
echo json_encode($informacion);	
exit;
}

 
function buscarFotosGaleriaDetalle($codigo,$formato='')
{
$mysqli=conectar_al_servidor();



$sql= "select  * from   fotos_cliente cl   where  cod_clienteFK='".$codigo."' ";
$pagina = "";
$filas = array();
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

$filas[]=array(
	"url" => $url,
	"descripcion" => $descripcion
);

if($formato !== 'json'){
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
}

 mysqli_close($mysqli);
 return $formato === 'json' ? $filas : $pagina;
}

 
function eliminar($idSolicitudCredito)
{

$mysqli=conectar_al_servidor(); 

 $consulta2="delete from  solicitudcredito  where idSolicitudCredito=? ";	

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




function aprobar($idSolicitudCredito,$user)
{

$mysqli=conectar_al_servidor(); 
asegurarColumnasProductoProvisionalSolicitudCredito($mysqli);
if(solicitudCreditoTieneProductosProvisionales($mysqli,$idSolicitudCredito)){
	mysqli_close($mysqli);
	echo json_encode(array(
		"1" => "producto_provisional",
		"2" => "NO SE PUEDE APROBAR: CAMBIE PRIMERO LOS PRODUCTOS MARCADOS COMO NO REGISTRADOS"
	));
	exit;
}

 $consulta2="UPDATE solicitudcredito set estado = 'APROBADO' , cod_usuarioFK=$user  where idSolicitudCredito=? ";	

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

 

function abmCliente($idzonaFk,$whapp,$cod_persona,$direccion,$telefono,$email,$cod_cliente,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$estado,$obsTrabajo,$tipo_vivienda,$operacion)
{

$mysqli=conectar_al_servidor(); 


$consulta1="Update persona set direccion=Upper(?),telefono=Upper(?),email=Upper(?) where cod_persona=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$direccion,$telefono,$email,$cod_persona);

if (!$stmt1->execute()) {	

echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


if($estado=="APROBADO"){

	$consulta2="update cliente set whapp=?,lugardetrabajo=?,salario=?,antiguedad=?,teleftrab1=?,teleftrab2=?,direcciontrab=? ,accesocredito='Confirmado',obsTrabajo=?,tipo_vivienda='$tipo_vivienda' where cod_cliente=$cod_persona ";	
 
$stmt2 = $mysqli->prepare($consulta2);
$ss='ssssssss';
$stmt2->bind_param($ss,$whapp,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$obsTrabajo);

}else{

	$consulta2="update cliente set whapp=?,lugardetrabajo=?,salario=?,antiguedad=?,teleftrab1=?,teleftrab2=?,direcciontrab=? ,obsTrabajo=?,tipo_vivienda='$tipo_vivienda' where cod_cliente=$cod_persona ";	

$stmt2 = $mysqli->prepare($consulta2);
$ss='ssssssss';
$stmt2->bind_param($ss,$whapp,$lugardetrabajo,$salario,$antiguedad,$teleftrab1,$teleftrab2,$direcciontrab,$obsTrabajo);

}

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;

}
 
 mysqli_close($mysqli);
$informacion =array("1" => "exito","2"=>$cod_persona);
echo json_encode($informacion);	
exit;

}


function asegurarColumnaEntregaInicialSolicitudCredito($mysqli)
{
	$resultado=$mysqli->query("SHOW COLUMNS FROM solicitudcredito LIKE 'entrega_inicial'");
	if($resultado && $resultado->num_rows==0){
		$consulta="ALTER TABLE solicitudcredito ADD COLUMN entrega_inicial INT(11) NOT NULL DEFAULT 0 AFTER monto_referencia";
		if(!$mysqli->query($consulta)){
			echo trigger_error('The query execution failed; MySQL said ('.$mysqli->errno.') '.$mysqli->error, E_USER_ERROR);
			exit;
		}
	}
	if($resultado){
		$resultado->free();
	}
}

function abm($MontoRefComercial,$entrega_inicial,$idAbm,$estado,$idAbmCliente,$cod_garanteFK,$cod_cobradorFK,$cod_localFK,$cod_usu,$observacion,$observacion_general,$operacion)
{

$mysqli=conectar_al_servidor(); 
asegurarColumnaEntregaInicialSolicitudCredito($mysqli);

date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d', time()); 
$sqlEstado = '';	

if($operacion=="nuevo") 
{

$consulta1=" Insert into solicitudcredito ( fecha, estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,cod_localFK,observacion,observacion_general,detalleVenta,monto_referencia,entrega_inicial)
values('$fecha_inser','PENDIENTE',$idAbmCliente,$cod_garanteFK,$cod_cobradorFK,$cod_localFK,'$observacion','$observacion_general',0,'$MontoRefComercial','$entrega_inicial')";
$stmt1 = $mysqli->prepare($consulta1);


}


if($operacion=="editar")
{



if($cod_localFK==''){
	$consulta1="Update solicitudcredito set  cod_clienteFK=Upper('$idAbmCliente'), cod_codeudorFK=Upper('$cod_garanteFK'), cod_usuarioFK=$cod_usu ,observacion='$observacion',observacion_general='$observacion_general' ,	monto_referencia='$MontoRefComercial', entrega_inicial='$entrega_inicial' where idSolicitudCredito='$idAbm' ";	

	$stmt1 = $mysqli->prepare($consulta1);
	
}else{
	$consulta1="Update solicitudcredito set  cod_localFK=Upper('$cod_localFK'), cod_clienteFK=Upper('$idAbmCliente'), cod_codeudorFK=Upper('$cod_garanteFK'), cod_usuarioFK=$cod_usu ,observacion='$observacion',observacion_general='$observacion_general', monto_referencia='$MontoRefComercial', entrega_inicial='$entrega_inicial' where idSolicitudCredito='$idAbm' ";	
 
	$stmt1 = $mysqli->prepare($consulta1);

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

function addmasreferencias($telefono,$direccion,$referencias,$observacion,$tipo,$obs,$cod_cliente,$monto)
{

if($cod_cliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 




$consulta="Insert into referenciascliente ( telef, direccion, referencias, observacion, cod_clienteFk, tipo,obs,monto)
values(?,?,?,?,?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta);
$ss='ssssssss';
$stmt1->bind_param($ss,$telefono,$direccion,$referencias,$observacion, $cod_cliente,$tipo,$obs,$monto);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}



function responderErrorReferenciaCliente($mensaje)
{
	$informacion = array("1" => "error", "2" => $mensaje);
	echo json_encode($informacion);
	exit;
}

function asegurarColumnaImagenReferenciaCliente($mysqli)
{
	$resultado = $mysqli->query("SHOW COLUMNS FROM referenciascliente LIKE 'imagen'");
	if (!$resultado) {
		responderErrorReferenciaCliente("No se pudo verificar la columna de imagen de referencias");
	}

	$existe = mysqli_num_rows($resultado) > 0;
	mysqli_free_result($resultado);

	if ($existe) {
		return;
	}

	if (!$mysqli->query("ALTER TABLE referenciascliente ADD COLUMN imagen VARCHAR(255) NULL AFTER monto")) {
		responderErrorReferenciaCliente("No se pudo preparar la columna de imagen de referencias");
	}
}

function guardarImagenReferenciaCliente($identificador)
{
	if (!isset($_FILES["imagenReferencia"]) || $_FILES["imagenReferencia"]["error"] == UPLOAD_ERR_NO_FILE) {
		return "";
	}

	if ($_FILES["imagenReferencia"]["error"] != UPLOAD_ERR_OK) {
		$informacion = array("1" => "error", "2" => "No se pudo cargar la imagen");
		echo json_encode($informacion);
		exit;
	}

	if ($_FILES["imagenReferencia"]["size"] > (6 * 1024 * 1024)) {
		$informacion = array("1" => "error", "2" => "La imagen supera el tamanio permitido");
		echo json_encode($informacion);
		exit;
	}

	$tmp = $_FILES["imagenReferencia"]["tmp_name"];
	$infoImagen = @getimagesize($tmp);
	if ($infoImagen === false || !isset($infoImagen["mime"])) {
		$informacion = array("1" => "error", "2" => "El archivo seleccionado no es una imagen valida");
		echo json_encode($informacion);
		exit;
	}

	$extensionesPermitidas = array(
		"image/jpeg" => "jpg",
		"image/png" => "png",
		"image/gif" => "gif",
		"image/webp" => "webp"
	);

	if (!isset($extensionesPermitidas[$infoImagen["mime"]])) {
		$informacion = array("1" => "error", "2" => "Formato de imagen no permitido");
		echo json_encode($informacion);
		exit;
	}

	$carpeta = "../fotos/referencias_cliente/";
	if (!file_exists($carpeta)) {
		mkdir($carpeta, 0777, true);
	}

	$identificador = preg_replace('/[^0-9A-Za-z_-]/', '', $identificador);
	$extension = $extensionesPermitidas[$infoImagen["mime"]];
	$nombreArchivo = "ref_".$identificador."_".date("YmdHis")."_".rand(100, 999).".".$extension;
	$rutaFisica = $carpeta.$nombreArchivo;

	if (!move_uploaded_file($tmp, $rutaFisica)) {
		$informacion = array("1" => "error", "2" => "No se pudo guardar la imagen");
		echo json_encode($informacion);
		exit;
	}

	return "/GoodVentaElectroCasaMaric/fotos/referencias_cliente/".$nombreArchivo;
}

function addmasreferenciascomercialcliente($monto,$telefono,$direccion,$referencias,$observacion,$tipo,$obs,$cod_cliente,$calificacion)
{

if($cod_cliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
asegurarColumnaImagenReferenciaCliente($mysqli);

$imagen = guardarImagenReferenciaCliente($cod_cliente);

$consulta="Insert into referenciascliente (monto,telef, direccion, referencias, observacion, cod_clienteFk, tipo,obs,calificacion,imagen)
values(?,?,?,?,?,?,?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta);
if (!$stmt1) {
	responderErrorReferenciaCliente("No se pudo preparar el guardado de la referencia comercial");
}
$ss='ssssssssss';
$stmt1->bind_param($ss,$monto,$telefono,$direccion,$referencias,$observacion, $cod_cliente,$tipo,$obs,$calificacion,$imagen);

if (!$stmt1->execute()) {
	responderErrorReferenciaCliente("No se pudo guardar la referencia comercial");
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
function BuscarRegistro($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$garante,$producto,$formato="")
{
$mysqli=conectar_al_servidor();
asegurarColumnaEntregaInicialSolicitudCredito($mysqli);

$condicionVendedor="";
if($vendedor!=""){
$condicionVendedor="and  (Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK ) like '%".$vendedor."%'";		
}
	
$condicionGarante="";
if($garante!=""){
$condicionGarante="and  (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK ) like '%".$garante."%'";		
}
	 
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

$condicionproducto="";
if($producto!=""){
$condicionproducto=" and (select nombre_producto from producto where ds.codProducto=cod_producto) like '%".$producto."%' ";
}


$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,cod_usuarioFK,
(Select nombre from zona where idzonaFk=idzona )as zona,sc.observacion_general,ifnull(monto_referencia,0) as monto_referencia,
IFNULL(sc.entrega_inicial,0) as entrega_inicial,
(Select Nombre from local where cod_local=cod_localFK ) as local,cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona = cod_usuarioFK )as Usuarioaprueba,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,cl.tipo_vivienda,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante,
IFNULL((Select calificacion_cliente from cliente where cod_cliente=cod_clienteFK),'SIN REGISTRO') as calificacion_cliente
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join detallesolicitud ds on sc.idSolicitudCredito = ds.idSolicitudCreditoFK
where cl.estado='Activo' ".$condiciondocumento.$condicioncliente.$condicionzona.$condicionFecha.$condicionlocal.$condicionestado.$condicionVendedor.$condicionGarante.$condicionproducto." group by idSolicitudCredito  order by idSolicitudCredito desc limit 100";
$pagina = "";
$filas = array();

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

$monto_referencia = utf8_encode($valor['monto_referencia']); 
$entrega_inicial = utf8_encode($valor['entrega_inicial']); 
$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$observacion_general = utf8_encode($valor['observacion_general']); 
$tipo_vivienda = utf8_encode($valor['tipo_vivienda']); 
$calificacion_cliente = utf8_encode($valor['calificacion_cliente']); 

$Aprueba="";
if($cod_usuarioFK!="" && $estado!="PENDIENTE" ){
	$Aprueba="<br>".$Usuarioaprueba;
}

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);



$spanCal="";
if($calificacion_cliente == 'SIN REGISTRO'){
$calificacion_cliente = '';
}else{
	
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

// Obtener faja
$faja = $calificacion_cliente;

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
}

$entregaSolicitudVisible = "<span style='display:inline-block;padding:4px 8px;border-radius:999px;background:#f1f5f9;color:#475569;font-weight:700;font-size:11px;'>SIN ENTREGA</span>";
if(floatval($entrega_inicial) > 0){
	$entregaSolicitudVisible = "<span style='display:inline-block;padding:4px 8px;border-radius:999px;background:#dcfce7;color:#166534;font-weight:800;font-size:11px;'>CON ENTREGA<br>".number_format($entrega_inicial,'0',',','.')."</span>";
}

$salario_formateado = number_format($salario,'0',',','.');
$monto_referencia_formateado = number_format($monto_referencia,'0',',','.');
$entrega_inicial_formateada = number_format($entrega_inicial,'0',',','.');
$usuario_aprueba_visible = ($cod_usuarioFK!="" && $estado!="PENDIENTE") ? $Usuarioaprueba : "";

$filas[] = array(
	"id_solicitud" => (int) $idSolicitudCredito,
	"documento" => $ci_cliente,
	"rut" => $rut_cliente,
	"cliente" => $nombre_persona,
	"garante" => $garante,
	"zona" => $zona,
	"local" => $local,
	"cod_local" => $cod_localFK,
	"fecha" => $fecha,
	"estado" => $estado,
	"cod_usuario_aprueba" => $cod_usuarioFK,
	"usuario_aprueba" => $usuario_aprueba_visible,
	"usuario_ingresa" => $UsuarioIngresa,
	"entrega_inicial" => (float) $entrega_inicial,
	"entrega_formateada" => $entrega_inicial_formateada,
	"productos" => isset($producto[4]) ? $producto[4] : array(),
	"producto_resumen" => isset($producto[5]) ? $producto[5] : "",
	"telefono" => $telefono,
	"direccion" => $direccion,
	"email" => $email,
	"whatsapp" => $whapp,
	"idzona" => $idzonaFk,
	"lugar_trabajo" => $lugardetrabajo,
	"salario" => (float) $salario,
	"salario_formateado" => $salario_formateado,
	"antiguedad" => $antiguedad,
	"telefono_trabajo_1" => $teleftrab1,
	"telefono_trabajo_2" => $teleftrab2,
	"direccion_trabajo" => $direcciontrab,
	"fecha_nacimiento" => $fechanac,
	"cod_garante" => $cod_codeudorFK,
	"cod_cliente" => $cod_clienteFK,
	"detalle_venta" => $detalleVenta,
	"observacion" => $observacion,
	"observacion_trabajo" => $obsTrabajo,
	"dato_26" => " ",
	"cuotas" => isset($producto[2]) ? $producto[2] : "",
	"total_venta" => isset($producto[3]) ? (float) $producto[3] : 0,
	"documento_garante" => $docgarante,
	"observacion_general" => $observacion_general,
	"tipo_vivienda" => $tipo_vivienda,
	"monto_referencia" => (float) $monto_referencia,
	"monto_referencia_formateado" => $monto_referencia_formateado
);

if($formato!="json"){
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosSolicitudCredito(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td  id='td_datos_1' style='width:7%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='width:18%'>".$nombre_persona."</td>
<td  id='td_datos_18' style='width:10%'>".$garante."</td>
<td  id='td_datos_4' style='width:10%'>".$zona."</td>
<td  id='td_datos_30' style='width:10%'>".$local."</td>
<td  id='td_datos_31' style='display:none'>".$cod_localFK."</td>
<td  id='' style='width:10%'>".$fecha."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='' style='width:7%'>".$estado.$Aprueba."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='width:7%'>".$UsuarioIngresa."</td>
<td  id='' style='width:8%;text-align:center'>".$entregaSolicitudVisible."</td>
<td  id='td_datos_25' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".$salario_formateado."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='width:18%'>".$producto[0]."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_23' style='display:none'>".$observacion."</td>
<td  id='td_datos_24' style='display:none'>".$obsTrabajo."</td>
<td  id='td_datos_26' style='display:none'> </td>
<td  id='td_datos_27' style='display:none'>".$producto[2]."</td>
<td  id='td_datos_28' style='display:none'>".$producto[3]."</td>
<td  id='td_datos_29' style='display:none'>".$docgarante."</td>
<td  id='td_datos_32' style='display:none'>".$observacion_general."</td>
<td  id='td_datos_33' style='display:none'>".$tipo_vivienda."</td>
<td  id='td_datos_34' style='display:none'>".$monto_referencia_formateado."</td>
<td  id='td_datos_35' style='display:none'>".$entrega_inicial_formateada."</td>
</tr>
</table>";
}

}


}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $formato=="json" ? $filas : $pagina,"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}


/*Buscar Registro en vista*/
function buscarmasreferencias($buscar,$formato='')
{
	
$mysqli=conectar_al_servidor();
$sql= "select tipo, idreferenciascliente, telef, direccion, referencias, observacion, cod_clienteFk , obs , ifnull(monto,0) as monto from referenciascliente where cod_clienteFk='$buscar' order by tipo asc ";

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

$TotalMonto=0;
$filas=array();

$styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$obs = utf8_encode($valor['obs']);
$tipo = utf8_encode($valor['tipo']);
$telef = utf8_encode($valor['telef']);     
$direccion = utf8_encode($valor['direccion']);          
$referencias = utf8_encode($valor['referencias']);          
$observacion = utf8_encode($valor['observacion']); 
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 
$idreferenciascliente = utf8_encode($valor['idreferenciascliente']); 
$monto = utf8_encode($valor['monto']); 

 $styleName=CargarStyleTable($styleName);
 $estilo="";
 if($obs ==""){
	 
	 $estilo ="style='background-color:#ff9090'";
 }
	$filas[]=array(
		"observacion_corta" => $obs,
		"telefono" => $telef,
		"direccion" => $direccion,
		"referencia" => $referencias,
		"tipo" => $tipo,
		"monto" => (float)$monto,
		"monto_formateado" => number_format($monto,'0',',','.'),
		"codigo" => $idreferenciascliente,
		"observacion" => $observacion,
		"incompleta" => $obs === ''
	);
	$TotalMonto+= $monto;
	if($formato !== 'json') {
	  $pagina.="
<table class='$styleName' $estilo border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosRefSolicitudCredito(this)'  name='tdMasReferenciasSolicitudCredito'>
<td id='td_datos_1' style='width:10%'>".$obs."</td>
<td id='td_datos_2' style='width:10%'>".$telef."</td>
<td id='td_datos_3' style='width:10%'>".$direccion."</td>
<td id='td_datos_4' style='width:10%'>".$referencias."</td>
<td id='td_datos_5' style='width:10%'>".$tipo."</td>
<td id='td_datos_7' style='width:10%'>".number_format($monto,'0',',','.')."</td>
<td id='td_id' style='display:none'>".$idreferenciascliente."</td>
<td id='td_datos_6' style='display:none'>".$observacion."</td>
</tr>
</table>";

}
}

}

mysqli_close($mysqli);
$informacion =array(
	"1" => "exito",
	"2" => ($formato === 'json' ? $filas : $pagina),
	"3" => number_format($TotalMonto,'0',',','.')
);
echo json_encode($informacion);
exit;
}

/*Buscar Registro en vista*/
function buscarmasreferenciascomercialcliente($buscar,$formato='')
{
	
$mysqli=conectar_al_servidor();
asegurarColumnaImagenReferenciaCliente($mysqli);
$sql= "select tipo,monto, idreferenciascliente, telef, direccion, referencias, calificacion, observacion, cod_clienteFk , obs, IFNULL(imagen,'') as imagen from referenciascliente where cod_clienteFk=? order by tipo asc ";

// echo($sql);
// exit;
$pagina = "";
$filas = array();
$stmt = $mysqli->prepare($sql);
if (!$stmt) {
	responderErrorReferenciaCliente("No se pudo preparar la consulta de referencias comerciales");
}
$stmt->bind_param('s', $buscar);
if ( ! $stmt->execute()) {
	responderErrorReferenciaCliente("No se pudo consultar las referencias comerciales");
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$obs = utf8_encode($valor['obs']);
$tipo = utf8_encode($valor['tipo']);
$telef = utf8_encode($valor['telef']);     
$direccion = utf8_encode($valor['direccion']);          
$referencias = utf8_encode($valor['referencias']);          
$observacion = utf8_encode($valor['observacion']); 
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 
$idreferenciascliente = utf8_encode($valor['idreferenciascliente']); 
$calificacion = utf8_encode($valor['calificacion']); 
$monto = utf8_encode($valor['monto']); 
$imagen = utf8_encode($valor['imagen']); 
$imagen = htmlspecialchars($imagen, ENT_QUOTES, "UTF-8");
$obsHtml = htmlspecialchars($obs, ENT_QUOTES, "UTF-8");
$tipoHtml = htmlspecialchars($tipo, ENT_QUOTES, "UTF-8");
$telefHtml = htmlspecialchars($telef, ENT_QUOTES, "UTF-8");
$direccionHtml = htmlspecialchars($direccion, ENT_QUOTES, "UTF-8");
$referenciasHtml = htmlspecialchars($referencias, ENT_QUOTES, "UTF-8");
$observacionHtml = htmlspecialchars($observacion, ENT_QUOTES, "UTF-8");
$calificacionHtml = htmlspecialchars($calificacion, ENT_QUOTES, "UTF-8");
$montoHtml = "";
if($monto !== "" && $monto !== null){
	$montoHtml = number_format((float)$monto,'0',',','.');
}

$imagenReferencia = "<span class='referencia-imagen-vacia'>Sin imagen</span>";
if($imagen != ""){
	$imagenReferencia = "<a href='".$imagen."' target='_blank'><img src='".$imagen."' class='referencia-imagen-thumb' alt='Imagen referencia'></a>";
}

 $styleName=CargarStyleTable($styleName);
 $claseEstado="";
 if($obs ==""){
	 
	 $claseEstado =" referencia-registro-alerta";
 }
	$filas[]=array(
		'codigo'=>$idreferenciascliente,
		'cliente'=>$cod_clienteFk,
		'observacion_corta'=>$obs,
		'telefono'=>$telef,
		'direccion'=>$direccion,
		'referencia'=>$referencias,
		'tipo'=>$tipo,
		'calificacion'=>$calificacion,
		'monto'=>(float)$monto,
		'monto_formateado'=>$montoHtml,
		'observacion'=>$observacion,
		'imagen'=>$imagen,
		'incompleta'=>$obs === '',
		'clase_fila'=>$styleName
	);
	  $pagina.="
<table class='referencia-registro $styleName$claseEstado' border='0' cellspacing='0' cellpadding='0' >
<tr id='tbSelecRegistro' onclick='obtenerdatosRefComercialCliente(this)'  name='tdMasReferenciasComercialCliente'>
<td id='td_imagen'>".$imagenReferencia."</td>
<td id='td_datos_1'>".$obsHtml."</td>
<td id='td_datos_2'>".$telefHtml."</td>
<td id='td_datos_3'>".$direccionHtml."</td>
<td id='td_datos_4'>".$referenciasHtml."</td>
<td id='td_datos_5'>".$tipoHtml."</td>
<td id='td_datos_7'>".$calificacionHtml."</td>
<td id='td_datos_8'>".$montoHtml."</td>
<td id='td_datos_6'>".$observacionHtml."</td>
<td id='td_id' style='display:none'>".$idreferenciascliente."</td>
<td id='td_datos_9' style='display:none'>".$imagen."</td>
</tr>
</table>";
	}


}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina) );
echo json_encode($informacion);	
exit;
}


function asegurarColumnasProductoProvisionalSolicitudCredito($mysqli)
{
	$columnas=array(
		"es_provisional" => "ALTER TABLE detallesolicitud ADD COLUMN es_provisional TINYINT(1) NOT NULL DEFAULT 0 AFTER tipo",
		"nombre_producto_provisional" => "ALTER TABLE detallesolicitud ADD COLUMN nombre_producto_provisional VARCHAR(255) NULL AFTER es_provisional"
	);
	foreach($columnas as $columna => $alter){
		// Las columnas provienen de la lista fija anterior; no se usa un dato del usuario.
		// SHOW COLUMNS evita depender de permisos sobre information_schema en hosting.
		$resultado=$mysqli->query("SHOW COLUMNS FROM `detallesolicitud` LIKE '".$columna."'");
		if(!$resultado){
			echo trigger_error('No se pudo verificar la estructura de detallesolicitud: '.$mysqli->error,E_USER_ERROR);
			exit;
		}
		if($resultado->num_rows===0 && !$mysqli->query($alter)){
			echo trigger_error('No se pudo preparar detallesolicitud para productos provisionales: '.$mysqli->error,E_USER_ERROR);
			exit;
		}
		$resultado->free();
	}
}

function solicitudCreditoTieneProductosProvisionales($mysqli,$idSolicitudCredito)
{
	$stmt=$mysqli->prepare("SELECT 1 FROM detallesolicitud WHERE idSolicitudCreditoFK=? AND es_provisional=1 LIMIT 1");
	$stmt->bind_param("s",$idSolicitudCredito);
	$stmt->execute();
	$resultado=$stmt->get_result();
	$tiene=$resultado->num_rows>0;
	$stmt->close();
	return $tiene;
}

function reemplazarProductoProvisional($idDetalle,$productoBuscado)
{
	if($idDetalle==="" || trim($productoBuscado)===""){
		echo json_encode(array("1"=>"camposvacio","2"=>"INGRESE UN PRODUCTO EXISTENTE"));
		exit;
	}
	$mysqli=conectar_al_servidor();
	asegurarColumnasProductoProvisionalSolicitudCredito($mysqli);
	$stmt=$mysqli->prepare(
		"SELECT ds.cuotas,sc.cod_localFK
		 FROM detallesolicitud ds
		 INNER JOIN solicitudcredito sc ON sc.idSolicitudCredito=ds.idSolicitudCreditoFK
		 WHERE ds.iddetallesolicitud=? AND ds.es_provisional=1"
	);
	$stmt->bind_param("s",$idDetalle);
	$stmt->execute();
	$detalle=$stmt->get_result()->fetch_assoc();
	$stmt->close();
	if(!$detalle){
		mysqli_close($mysqli);
		echo json_encode(array("1"=>"no_encontrado","2"=>"EL DETALLE YA NO ES PROVISIONAL"));
		exit;
	}
	$stmt=$mysqli->prepare("SELECT cod_producto,tipo_producto FROM producto WHERE cod_producto=? OR cod_barra=? OR UPPER(nombre_producto)=UPPER(?) LIMIT 2");
	$stmt->bind_param("sss",$productoBuscado,$productoBuscado,$productoBuscado);
	$stmt->execute();
	$resultado=$stmt->get_result();
	if($resultado->num_rows!==1){
		$stmt->close();
		mysqli_close($mysqli);
		echo json_encode(array("1"=>"no_encontrado","2"=>"INGRESE UN CODIGO, CODIGO DE BARRAS O NOMBRE EXACTO Y UNICO"));
		exit;
	}
	$producto=$resultado->fetch_assoc();
	$stmt->close();
	$precioPlan=obtenerPrecioProductoCuotasSolicitud($mysqli,$producto["cod_producto"],$detalle["cuotas"],$detalle["cod_localFK"]);
	if($precioPlan===null){
		mysqli_close($mysqli);
		echo json_encode(array("1"=>"sin_precio","2"=>"EL PRODUCTO NO TIENE PRECIO PARA ".$detalle["cuotas"]." CUOTAS EN EL LOCAL DE LA SOLICITUD"));
		exit;
	}
	$stmt=$mysqli->prepare("UPDATE detallesolicitud SET codProducto=?,tipo=?,plan=?,es_provisional=0,nombre_producto_provisional=NULL WHERE iddetallesolicitud=? AND es_provisional=1");
	$stmt->bind_param("ssss",$producto["cod_producto"],$producto["tipo_producto"],$precioPlan,$idDetalle);
	$stmt->execute();
	$actualizados=$stmt->affected_rows;
	$stmt->close();
	mysqli_close($mysqli);
	echo json_encode($actualizados===1 ? array("1"=>"exito") : array("1"=>"no_encontrado","2"=>"EL DETALLE YA NO ES PROVISIONAL"));
	exit;
}

function obtenerPrecioProductoCuotasSolicitud($mysqli,$codProducto,$cuotas,$codLocal)
{
	$stmt=$mysqli->prepare(
		"SELECT dlpp.precio
		 FROM detalle_listado_precio_producto dlpp
		 INNER JOIN detalle_listado_precio dlp ON dlp.cod_detalle_listado_precio=dlpp.cod_detalle_listado_precioFK
		 INNER JOIN lista_precio_producto lpp ON lpp.cod_lista_precio_producto=dlp.cod_lista_precio_productoFK
		 INNER JOIN local_lista_precio llp ON llp.cod_lista_precio_productoFK=lpp.cod_lista_precio_producto
		 WHERE lpp.estado='Activo'
		   AND dlpp.cod_producto=?
		   AND llp.accion='SI'
		   AND dlpp.Cuota=?
		   AND lpp.fecha_hasta>=CURDATE()
		   AND llp.cod_localFK=?
		 ORDER BY dlpp.cod_detalle_listado_precio_producto
		 LIMIT 1"
	);
	if(!$stmt) return null;
	$stmt->bind_param("sss",$codProducto,$cuotas,$codLocal);
	$stmt->execute();
	$fila=$stmt->get_result()->fetch_assoc();
	$stmt->close();
	return $fila ? (float)$fila["precio"] : null;
}

function buscarProductoReemplazoSolicitud($buscar,$idDetalle)
{
	if(strlen(trim($buscar))<2){
		echo json_encode(array("1"=>"camposvacio","2"=>array(),"3"=>"ESCRIBA AL MENOS 2 CARACTERES"));
		exit;
	}
	$mysqli=conectar_al_servidor();
	$stmtDetalle=$mysqli->prepare(
		"SELECT ds.cuotas,sc.cod_localFK
		 FROM detallesolicitud ds
		 INNER JOIN solicitudcredito sc ON sc.idSolicitudCredito=ds.idSolicitudCreditoFK
		 WHERE ds.iddetallesolicitud=?"
	);
	$stmtDetalle->bind_param("s",$idDetalle);
	$stmtDetalle->execute();
	$detalle=$stmtDetalle->get_result()->fetch_assoc();
	$stmtDetalle->close();
	if(!$detalle){
		mysqli_close($mysqli);
		echo json_encode(array("1"=>"no_encontrado","2"=>array(),"3"=>"NO SE ENCONTRO EL DETALLE DE LA SOLICITUD"));
		exit;
	}
	$patron="%".$buscar."%";
	$stmt=$mysqli->prepare(
		"SELECT cod_producto,cod_barra,nombre_producto
		 FROM producto
		 WHERE cod_producto=?
		    OR cod_barra=?
		    OR nombre_producto LIKE ?
		 ORDER BY CASE
			WHEN cod_producto=? THEN 0
			WHEN cod_barra=? THEN 1
			WHEN nombre_producto=? THEN 2
			ELSE 3 END,
		 nombre_producto
		 LIMIT 20"
	);
	if(!$stmt){
		mysqli_close($mysqli);
		echo json_encode(array("1"=>"error","2"=>array(),"3"=>"NO SE PUDO BUSCAR PRODUCTOS"));
		exit;
	}
	$stmt->bind_param("ssssss",$buscar,$buscar,$patron,$buscar,$buscar,$buscar);
	$stmt->execute();
	$resultado=$stmt->get_result();
	$productos=array();
	while($fila=$resultado->fetch_assoc()){
		$precioPlan=obtenerPrecioProductoCuotasSolicitud($mysqli,$fila["cod_producto"],$detalle["cuotas"],$detalle["cod_localFK"]);
		$productos[]=array(
			"codigo"=>utf8_encode($fila["cod_producto"]),
			"barra"=>utf8_encode($fila["cod_barra"]),
			"nombre"=>utf8_encode($fila["nombre_producto"]),
			"cuotas"=>(int)$detalle["cuotas"],
			"precio"=>($precioPlan===null ? null : $precioPlan),
			"precio_formateado"=>($precioPlan===null ? "" : number_format($precioPlan,0,",","."))
		);
	}
	$stmt->close();
	mysqli_close($mysqli);
	echo json_encode(array("1"=>"exito","2"=>$productos,"3"=>count($productos)));
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
asegurarColumnasProductoProvisionalSolicitudCredito($mysqli);
$control=1;	
if($totalCargado<1){
	$informacion=array("1"=>"camposvacio","2"=>"Debe agregar al menos un producto para guardar la solicitud");
	echo json_encode($informacion);
	exit;
}
if($totalCargado>=1){
	
$consulta= "delete from detallesolicitud where idSolicitudCreditoFK='$idSolicitudCredito' "; 
$stmt1 = $mysqli->prepare($consulta);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
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

$esProvisional=isset($_POST['esProvisional'.$control]) && $_POST['esProvisional'.$control]=="1" ? 1 : 0;
$nombreProducto=isset($_POST['nombreProducto'.$control]) ? utf8_decode(trim($_POST['nombreProducto'.$control])) : "";
$tipo=$esProvisional ? "PROVISIONAL" : obtener_tipo_producto($cod_Producto);

$consulta="Insert into detallesolicitud ( cantidad, codProducto, plan,cuotas, idSolicitudCreditoFK,tipo,es_provisional,nombre_producto_provisional) values(?,?,?,?,?,?,?,?)";

// echo $consulta;
// exit;

$stmt1 = $mysqli->prepare($consulta);
$stmt1->bind_param("ssssisis",$cantidad,$cod_Producto,$precio,$cuotas,$idSolicitudCredito,$tipo,$esProvisional,$nombreProducto);

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
asegurarColumnasProductoProvisionalSolicitudCredito($mysqli);
$sql= "select iddetallesolicitud,cuotas, cantidad, codProducto, plan, idSolicitudCreditoFK,tipo,es_provisional,
COALESCE(NULLIF(nombre_producto_provisional,''),(select nombre_producto from producto where codProducto=cod_producto)) as producto
,IF(es_provisional=1,'NO REGISTRADO',(select cod_barra from producto where codProducto=cod_producto)) as cod_Barra,
(select cod_localFK from solicitudcredito where idSolicitudCredito=idSolicitudCreditoFK) as local from detallesolicitud where idSolicitudCreditoFK='$buscar' ";

// echo($sql);
// exit;


$pagina = "<div>";
$productosEstructurados = array();
$resumenProductos = "";

$pagina2 = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

$TotalVenta=0;
$cuotas=0;
$a=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cuotas = utf8_encode($valor['cuotas']);
$producto = utf8_encode($valor['producto']);
$cantidad = utf8_encode($valor['cantidad']);     
$plan = utf8_encode($valor['plan']);   

$cod_Barra = utf8_encode($valor['cod_Barra']);   
$codProducto = utf8_encode($valor['codProducto']);    
$tipo = strtoupper(trim(utf8_encode($valor['tipo'])));
$es_provisional = (int)$valor['es_provisional'];
$local = utf8_encode($valor['local']);    

if( $cuotas=="" || $cuotas=="0" || $cuotas=="contado" || $cuotas=="undefined"){
	 $cuotas=1;
}

if( $cantidad=="" || $cantidad=="0"){
	 $cantidad=1;
}

if( $plan=="" || $plan=="0"){
	 $plan=0;
}




$btnVistaCombo = '';
if($tipo == 'COMBO'){
	$btnVistaCombo = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"buscarvistacomboproductosolicitud('$codProducto','vista_solicitud','$local')\" />";
}





// echo($plan."".$cantidad."".$cuotas);
// exit;
$Cuotero = (quitarseparadormiles($plan)*$cantidad) / $cuotas;

$Respuesta = (quitarseparadormiles($plan)*$cantidad);


$a=$a+1; 

$productosEstructurados[] = array(
	"numero" => $a,
	"cantidad" => $cantidad,
	"producto" => $producto,
	"cuotas" => $cuotas,
	"cuota_formateada" => number_format(round($Cuotero),'0',',','.'),
	"total" => (float) $Respuesta,
	"total_formateado" => number_format($Respuesta,'0',',','.'),
	"tipo" => $tipo,
	"es_provisional" => $es_provisional,
	"cod_producto" => $codProducto,
	"local" => $local
);
if($resumenProductos!=""){
	$resumenProductos.=" ";
}
$resumenProductos.=$producto;

$alertaProductoProvisional = $es_provisional===1
	? "<span style='display:block;margin:6px 0;padding:8px;border:2px solid #dc3545;border-radius:6px;background:#fff3cd;color:#842029;font-weight:bold;'>⚠ PRODUCTO NO REGISTRADO EN LA BASE DE DATOS</span>"
	: "";
if($pagina==""){
			$pagina.=$alertaProductoProvisional.$a.") &nbsp".$cantidad."/".$producto."&nbsp;&nbsp;&nbsp;".$cuotas." * ".number_format(round($Cuotero),'0',',','.')." = ".number_format($Respuesta,'0',',','.')."Gs.&nbsp;&nbsp;&nbsp;".$btnVistaCombo;	
		}else{
			$pagina.="<br>".$alertaProductoProvisional.$a.") &nbsp".$cantidad."/".$producto."&nbsp;&nbsp;&nbsp;".$cuotas." * ".number_format(round($Cuotero),'0',',','.')." = ".number_format($Respuesta,'0',',','.')."Gs.&nbsp;&nbsp;&nbsp;".$btnVistaCombo;	
		}
  

$nroid = rand(1, 1000);

$plan = intval($plan);

$pagina2.="<table id='tdDetalleVenta_".$nroid."' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='tdDetalleVentaOfflineSolicitud' >
<td id='td_id_1' style='display:none'>".$codProducto."</td>
<td id='td_id_2' style='display:none'>".$nroid."</td>
<td  id='td_datos_8' style='display:none'>".$cod_Barra."</td>
<td  id='td_datos_1' style='width:20%;'>".$producto."</td>
<td  id='td_datos_6' style='display:none'></td>
<td  id='td_datos_3' style='width:10%'>".number_format($plan,'0',',','.')."</td>
<td  id='td_datos_4' style='width:5%'>".$cantidad."</td>
<td  id='td_datos_9' style='display:none'>0</td>
<td  id='td_datos_5' style='width:10%'>".number_format($Respuesta,'0',',','.')."</td>
<td  id='td_datos_7' style='width:10%'>0</td>
<td  id='td_datos_10' style='display:none'>".$cuotas."</td>
</tr>
</table>";

$TotalVenta= $TotalVenta + $Respuesta;

}
}

$Datos[0]= $pagina."</div>";
$Datos[1]= $pagina2;
$Datos[2]= $cuotas;
$Datos[3]= $TotalVenta;
$Datos[4]= $productosEstructurados;
$Datos[5]= $resumenProductos;

  mysqli_close($mysqli);  
return $Datos;
}

/*Buscar Registro en vista*/
function buscarvista($buscar,$codlocal,$formato='')
{
$mysqli=conectar_al_servidor();
asegurarColumnaEntregaInicialSolicitudCredito($mysqli);


$condicioncliente="";
if($buscar!=""){
$condicioncliente="and ((Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ) like '%".$buscar."%' || cl.ci_cliente= '".$buscar."' ) ";
}


$condicionlocal="";
if($codlocal!=""){
$condicionlocal="and cod_localFK= '".$codlocal."' ";
}

$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,
(Select nombre from zona where idzonaFk=idzona )as zona,(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK )as UsuarioIngresa,cl.accesocredito,
(SELECT cuotas FROM detallesolicitud where idSolicitudCreditoFK=idSolicitudCredito limit 1) as cuotas,
IFNULL(sc.entrega_inicial,0) as entrega_inicial,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cod_usuarioFK,
(Select nombre_persona from persona pra where pra.cod_persona = cod_usuarioFK )as Usuarioaprueba,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,cl.obsTrabajo,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
where sc.estado='APROBADO' ".$condicioncliente.$condicionlocal."  limit 100";



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
 $filas=array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
$observacion = utf8_encode($valor['observacion']); 

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

$docgarante = utf8_encode($valor['docgarante']); 
$cuotas = utf8_encode($valor['cuotas']); 
$entrega_inicial = utf8_encode($valor['entrega_inicial']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 

$Aprueba="";
if($cod_usuarioFK!="" && $estado!="PENDIENTE" ){
	$Aprueba="<br>".$Usuarioaprueba;
}

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);

$filas[]=array(
	"id_solicitud" => $idSolicitudCredito,
	"documento" => $ci_cliente,
	"rut" => $rut_cliente,
	"cliente" => $nombre_persona,
	"zona" => $zona,
	"fecha" => $fecha,
	"telefono" => $telefono,
	"direccion" => $direccion,
	"email" => $email,
	"whatsapp" => $whapp,
	"estado" => $estado,
	"usuario_aprueba" => ($cod_usuarioFK!="" && $estado!="PENDIENTE") ? $Usuarioaprueba : "",
	"usuario_ingresa" => $UsuarioIngresa,
	"idzona" => $idzonaFk,
	"lugar_trabajo" => $lugardetrabajo,
	"salario" => (float)$salario,
	"salario_formateado" => number_format($salario,'0',',','.'),
	"antiguedad" => $antiguedad,
	"telefono_trabajo_1" => $teleftrab1,
	"telefono_trabajo_2" => $teleftrab2,
	"direccion_trabajo" => $direcciontrab,
	"fecha_nacimiento" => $fechanac,
	"garante" => $garante,
	"cod_garante" => $cod_codeudorFK,
	"productos" => isset($producto[4]) ? $producto[4] : array(),
	"producto_resumen" => isset($producto[5]) ? $producto[5] : "",
	"cod_cliente" => $cod_clienteFK,
	"detalle_venta" => $detalleVenta,
	"observacion" => $observacion,
	"observacion_trabajo" => $obsTrabajo,
	"dato_26" => "",
	"cuotas" => isset($producto[2]) ? $producto[2] : "",
	"total_venta" => isset($producto[3]) ? (float)$producto[3] : 0,
	"documento_garante" => $docgarante,
	"cuotas_solicitadas" => $cuotas,
	"entrega_inicial" => (float)$entrega_inicial,
	"entrega_formateada" => number_format($entrega_inicial,'0',',','.')
);

if($formato !== 'json') {
 $styleName=CargarStyleTable($styleName);

	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaSolicitudCreditoVenta(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td  id='td_datos_1' style='width:10%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='width:25%'>".$nombre_persona."</td>
<td  id='td_datos_4' style='display:none'>".$zona."</td>
<td  id='' style='display:none'>".$fecha."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='' style='display:none'>".$estado.$Aprueba."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='dispalay:none'>".$UsuarioIngresa."</td>
<td  id='td_datos_25' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".number_format($salario,'0',',','.')."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='width:25%'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='width:35%'>".$producto[0]."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_23' style='display:none'>".$observacion."</td>
<td  id='td_datos_24' style='display:none'>".$obsTrabajo."</td>
<td  id='td_datos_26' style='display:none'> </td>
<td  id='td_datos_27' style='display:none'>".$producto[2]."</td>
<td  id='td_datos_28' style='display:none'>".$producto[3]."</td>
<td  id='td_datos_29' style='display:none'>".$docgarante."</td>
<td  id='td_datos_30' style='display:none'>".$cuotas."</td>
<td  id='td_datos_31' style='display:none'>".number_format($entrega_inicial,'0',',','.')."</td>
</tr>
</table>";
	}


}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'));
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

 
function buscarProductoSolicitudVista($buscar)
{
	
$mysqli=conectar_al_servidor();
$sql= "select iddetallesolicitud, cantidad, codProducto,cuotas, plan, idSolicitudCreditoFK ,(select nombre_producto from producto where codProducto=cod_producto) as producto
,(select cod_barra from producto where codProducto=cod_producto) as cod_Barra, observacion_general , observacion
from detallesolicitud inner join solicitudcredito on idSolicitudCredito=idSolicitudCreditoFK where idSolicitudCreditoFK='$buscar' ";

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
$totalVenta=0;
$cuotas =1;
$Cuotero =0;
$observacion_general ="";
$observacion ="";
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cuotas = utf8_encode($valor['cuotas']);
$iddetallesolicitud = utf8_encode($valor['iddetallesolicitud']);
$cantidad = utf8_encode($valor['cantidad']);     
$codProducto = utf8_encode($valor['codProducto']);          
$plan = utf8_encode($valor['plan']);          
$idSolicitudCreditoFK = utf8_encode($valor['idSolicitudCreditoFK']); 
$producto = utf8_encode($valor['producto']); 
$cod_Barra = utf8_encode($valor['cod_Barra']); 
$observacion_general = utf8_encode($valor['observacion_general']); 
$observacion = utf8_encode($valor['observacion']); 

$plan = quitarseparadormiles($plan);

 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'>
<td  id='td_id_1' style='display:none'>".$codProducto."</td>
<td  id='td_datos_1' style='width:20%'>".$cod_Barra."</td>
<td  id='td_datos_2' style='width:40%'>".$producto."</td>
<td id='td_datos_3' style='width:10%'>".$cantidad."</td>
<td id='td_datos_4' style='width:20%'>".number_format($plan,'0',',','.')."</td>
<td id='td_id_2' style='display:none'>".$iddetallesolicitud."</td>
<td id='td_datos_5' style='width:10%'>".$cuotas."</td>
</tr>
</table>";

$totalVenta= $totalVenta + ($cantidad * quitarseparadormiles($plan)) ;

if( $cuotas==""){
	 $cuotas=1;
}
 $Cuotero = $totalVenta / $cuotas;
}
}

 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr >
<td  style='width:50%'> </td> 
<td  style='width:50%'>".$cuotas." * ".number_format($Cuotero,'0',',','.')."=".number_format($totalVenta,'0',',','.')." </td>
</tr>
</table>";

$ResultadoTotal= "<p>".number_format($totalVenta,'0',',','.') ."</p><br> <p style='font-size: 17px; margin-top: -20px;' >".$cuotas." * ".number_format(round($Cuotero),'0',',','.')."</p>";

    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $pagina ,"3" => $ResultadoTotal ,"4" => $observacion_general,"5" => $observacion );
echo json_encode($informacion);	
exit;
}
 
/*Buscar Registro en vista*/
function buscarmasreferenciasVista($buscar)
{
	
$mysqli=conectar_al_servidor();
$sql= "select tipo, idreferenciascliente, telef, direccion, referencias, observacion, cod_clienteFk , obs from referenciascliente where cod_clienteFk='$buscar' order by tipo asc ";

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

$obs = utf8_encode($valor['obs']);
$tipo = utf8_encode($valor['tipo']);
$telef = utf8_encode($valor['telef']);     
$direccion = utf8_encode($valor['direccion']);          
$referencias = utf8_encode($valor['referencias']);          
$observacion = utf8_encode($valor['observacion']); 
$cod_clienteFk = utf8_encode($valor['cod_clienteFk']); 
$idreferenciascliente = utf8_encode($valor['idreferenciascliente']); 

 $styleName=CargarStyleTable($styleName);
 $estilo="";
 if($obs ==""){
	 
	 $estilo ="style='background-color:#ff9090'";
 }
	  $pagina.="
<table class='$styleName' $estilo border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosRefSolicitudCredito(this)'>
<td  id='td_datos_1' style='width:10%'>".$observacion."</td>
<td  id='td_datos_2' style='width:10%'>".$telef."</td>
<td id='td_datos_3' style='width:10%'>".$direccion."</td>
<td  id='td_datos_4' style='width:10%'>".$referencias."</td>
<td id='td_datos_5' style='width:10%'>".$tipo."</td>
<td id='td_id' style='display:none'>".$idreferenciascliente."</td>
<td id='td_datos_6' style='display:none'>".$obs."</td>
</tr>
</table>";
}


}


    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($pagina) );
echo json_encode($informacion);	
exit;
}

function buscarDetalleProductoSolicitudParaVenta($buscar,$cod_localFK,$formato='')
{
	
$mysqli=conectar_al_servidor();
$sql= "select iddetallesolicitud,cuotas, cantidad, codProducto, plan,tipo, idSolicitudCreditoFK ,(select nombre_producto from producto where codProducto=cod_producto) as producto,(select promo from producto where codProducto=cod_producto) as promo ,
(select cod_localFK from solicitudcredito where idSolicitudCredito=idSolicitudCreditoFK) as cod_localFK
,(select cod_barra from producto where codProducto=cod_producto) as cod_Barra from detallesolicitud where idSolicitudCreditoFK='$buscar' ";

/* echo($sql);
exit; */
$pagina = "";  


$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

$TotalVenta=0;

$condicion="SI";
$filas=array();

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cuotas = utf8_encode($valor['cuotas']);
$producto = utf8_encode($valor['producto']);
$cantidad = utf8_encode($valor['cantidad']);     
$plan = utf8_encode($valor['plan']);   

$cod_Barra = utf8_encode($valor['cod_Barra']);   
$codProducto = utf8_encode($valor['codProducto']);    
$promo = utf8_encode($valor['promo']);    
$tipo = utf8_encode($valor['tipo']);    
$cod_localFK = utf8_encode($valor['cod_localFK']);    
$idSolicitudCreditoFK = utf8_encode($valor['idSolicitudCreditoFK']);    



if($tipo != 'COMBO'){
	

if( $cuotas=="" || $cuotas=="0" || $cuotas=="contado" || $cuotas=="undefined"){
	 $cuotas=1;
}

if( $cantidad=="" || $cantidad=="0"){
	 $cantidad=1;
}

if( $plan=="" || $plan=="0"){
	 $plan=0;
}

// echo($plan."".$cantidad."".$cuotas);
// exit;
$Cuotero = (quitarseparadormiles($plan)/$cantidad) / $cuotas;

$Respuesta = (quitarseparadormiles($plan)*$cantidad);

$condicionStock=buscarStockProducto($codProducto,$cod_localFK,$cantidad);

if($condicionStock == 'NO'){
	$condicion = 'NO';
}

$nroid = rand(1, 1000);

$plan = intval($plan);

$filas[]=array(
	"codigo_producto" => $codProducto,
	"id_fila" => $nroid,
	"codigo_barra" => $cod_Barra,
	"producto" => $producto,
	"precio" => (float)$plan,
	"precio_formateado" => number_format($plan,'0',',','.'),
	"precio_visible_formateado" => number_format(abs($plan),'0',',','.'),
	"cantidad" => (float)$cantidad,
	"total" => (float)$Respuesta,
	"total_formateado" => number_format($Respuesta,'0',',','.'),
	"total_visible_formateado" => number_format(abs($Respuesta),'0',',','.'),
	"descuento" => 0,
	"cuotas" => $cuotas,
	"promo" => $promo,
	"codigo_combo" => ""
);

if($formato !== 'json') {
$pagina.="<table id='tdDetalleVenta_".$nroid."' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' name='tdDetalleVentaOffline' onclick='obtenerdatosdetalleventasolicitudcredito(this)' >
<td id='td_id_1' style='display:none'>".$codProducto."</td>
<td id='td_id_2' style='display:none'>".$nroid."</td>
<td  id='td_datos_8' style='width:5%'>".$cod_Barra."</td>
<td  id='td_datos_1' style='width:20%;'>".$producto."</td>
<td  id='td_datos_6' style='display:none'></td>
<td  id='td_datos_3' style='width:10%'>".number_format($plan,'0',',','.')."</td>
<td  id='td_datos_4' style='width:5%'>".$cantidad."</td>
<td  id='td_datos_9' style='display:none'>0</td>
<td  id='td_datos_5' style='width:10%'>".number_format($Respuesta,'0',',','.')."</td>
<td  id='td_datos_7' style='display:none'>0</td>
<td  id='td_datos_10' style='display:none'>".$cuotas."</td>
<td  id='td_datos_11' style='display:none'>".$promo."</td>
</tr>
</table>";
$TotalVenta= $TotalVenta + $Respuesta;

}else{
	$pagina2 = buscar_vista_productos_combo_solicitud($codProducto,$cuotas,$cod_localFK,$idSolicitudCreditoFK,$formato);
	if($formato === 'json'){
		$filas=array_merge($filas,$pagina2);
	}else{
		$pagina .= $pagina2;
	}
	$paginapreciototal = obtener_precio_producto($idSolicitudCreditoFK);
	$TotalVenta= $TotalVenta + $paginapreciototal;
	
	
	$array_cod_productos = obtener_array_cod_productos_combo($codProducto);

	foreach ($array_cod_productos as $cod_producto) {
	  $condicionStock=buscarStockProducto($cod_producto,$cod_localFK,$cantidad);
		if($condicionStock == 'NO'){
		$condicion = 'NO';
	}

}

	
	
	

}


}
}

}
 mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina) ,"3" => $condicion  );
echo json_encode($informacion);	
exit;
}

function obtener_precio_producto($idSolicitudCreditoFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$sql= "SELECT plan as precio FROM detallesolicitud where idSolicitudCreditoFK  ='$idSolicitudCreditoFK'";
   
 
   
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

function obtener_array_cod_productos_combo($cod_comboFK)
{
	$mysqli=conectar_al_servidor();
	 
	 
		$sql= "SELECT cod_productoFK FROM detalle_combo_producto where cod_comboFK = '$cod_comboFK'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
$arrayDatos = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $cod_productoFK=utf8_encode($valor['cod_productoFK']);
			  array_push($arrayDatos,$cod_productoFK);
	  }
 }
 
return $arrayDatos;
}


function buscar_vista_productos_combo_solicitud($cod_comboFK,$cantidadCuotaSolicitud,$cod_localFK,$idSolicitudCreditoFK,$formato='html')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 
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
		IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = (SELECT idstocklocales FROM stocklocales sl WHERE sl.cod_productofk = cod_producto and sl.cod_localfk='$cod_localFK')),0) as stock_producto,
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
			$promo = utf8_encode($valor['promo']); 

$paginapreciosb=buscardetallespreciossolicitud($cod_producto,$cantidadCuotaSolicitud);
$paginapreciototal = obtener_precio_producto($idSolicitudCreditoFK);

/* echo $paginapreciosb;
echo "\n";
echo $paginapreciototal;
exit; */

if($paginapreciosb > 0){
	$paginapreciosb = modificarprecioproducto($cod_comboFK,$paginapreciosb,$paginapreciototal,$cantidadCuotaSolicitud);
}

$subtotal = $paginapreciosb * $cantidad;



		  	 $styleName=CargarStyleTable($styleName);

$nroid = rand(1, 1000);
$filas[]=array(
	"codigo_producto" => $cod_producto,
	"id_fila" => $nroid,
	"codigo_barra" => $cod_barra,
	"producto" => $nombre_producto,
	"precio" => (float)$paginapreciosb,
	"precio_formateado" => number_format($paginapreciosb,'0',',','.'),
	"precio_visible_formateado" => number_format(abs($paginapreciosb),'0',',','.'),
	"cantidad" => (float)$cantidad,
	"total" => (float)$subtotal,
	"total_formateado" => number_format($subtotal,'0',',','.'),
	"total_visible_formateado" => number_format(abs($subtotal),'0',',','.'),
	"descuento" => 0,
	"cuotas" => $cantidadCuotaSolicitud,
	"promo" => $promo,
	"codigo_combo" => $cod_comboFK
);
if($formato !== 'json') {
$pagina.="<table id='tdDetalleVenta_".$nroid."' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' name='tdDetalleVentaOffline' onclick='obtenerdatosdetalleventasolicitudcredito(this)' >
<td id='td_id_1' style='display:none'>".$cod_producto."</td>
<td id='td_id_2' style='display:none'>".$nroid."</td>
<td  id='td_datos_8' style='width:5%'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%;'>".$nombre_producto."</td>
<td  id='td_datos_6' style='display:none'></td>
<td  id='td_datos_3' style='display:none'>".number_format($paginapreciosb,'0',',','.')."</td>
<td  id='' style='width:10%'>".number_format(abs($paginapreciosb),'0',',','.')."</td>
<td  id='td_datos_4' style='width:5%'>".$cantidad."</td>
<td  id='td_datos_9' style='display:none'>0</td>
<td  id='td_datos_5' style='display:none'>".number_format($subtotal,'0',',','.')."</td>
<td  id='' style='width:10%'>".number_format(abs($subtotal),'0',',','.')."</td>
<td  id='td_datos_7' style='display:none'>0</td>
<td  id='td_datos_10' style='display:none'>".$cantidadCuotaSolicitud."</td>
<td  id='td_datos_11' style='display:none'>".$promo."</td>
<td  id='td_datos_16' style='display:none'>".$cod_comboFK."</td>
</tr>
</table>";
			    	 
		  	
			  
			  
	  }
 }

}
 
mysqli_close($mysqli);
return $formato === 'json' ? $filas : $pagina;
}
function modificarprecioproducto($cod_comboFK,$paginapreciosb,$paginapreciototal,$cantidadCuotaSolicitud){
	// $cantidadCombo = buscar_cantidad_productos_combo($cod_comboFK);
	$datos = buscar_total_productos_combo($cod_comboFK,$cantidadCuotaSolicitud);
 $totalComboCosto = $datos[0];
 $cantidadCombo = $datos[1];


	
	$diferenciaComboOri = $totalComboCosto - $paginapreciototal;
	
	// echo $diferenciaComboOri;
	// exit;
	
	$diferenciaComboOri = $diferenciaComboOri / $cantidadCombo;
	$paginapreciosb = $paginapreciosb - $diferenciaComboOri;
	return $paginapreciosb;
}
function  buscardetallespreciossolicitud($buscar,$cuota)
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
$precio = 0;
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
}
}

return $precio;
}
 
function buscarStockProducto($codProducto,$cod_localFK,$stock){
	

$mysqli=conectar_al_servidor();

$sql= "select  if(IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stocklocales.idstocklocales),0)<$stock,'NO','SI') as condicion  from  stocklocales  where  cod_productofk='".$codProducto."' and cod_localfk='".$cod_localFK."' limit 1 ";

// echo($sql);
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

$condicion = utf8_encode($valor['condicion']); 

}
}

return $condicion ;

	
}

function buscar_cantidad_productos_combo($cod_comboFK){
	

$mysqli=conectar_al_servidor();

$sql= "SELECT count(iddetalle_combo_producto) as cantidad
		FROM detalle_combo_producto WHERE cod_comboFK = '$cod_comboFK'";

// echo($sql);
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
$cantidad = '';
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cantidad = utf8_encode($valor['cantidad']); 


}
}





return $cantidad ;
}

function buscar_total_productos_combo($cod_comboFK,$cantidadCuotaSolicitud){
	

$mysqli=conectar_al_servidor();

$sql= "SELECT cod_productoFK
		FROM detalle_combo_producto WHERE cod_comboFK = '$cod_comboFK'";


$stmt = $mysqli->prepare($sql);



if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$datos = array();
$total = 0;
$contador = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cod_productoFK = utf8_encode($valor['cod_productoFK']); 

if(buscardetallespreciossolicitud($cod_productoFK,$cantidadCuotaSolicitud) > 0){
	$total += buscardetallespreciossolicitud($cod_productoFK,$cantidadCuotaSolicitud);
	$contador++;
}




}
}

array_push($datos,$total);
array_push($datos,$contador);

return $datos;
}

function buscar_informe_solicitud_credito($fecha1,$fecha2,$cliente,$entregador,$estado_entrega,$fecha_entrega,$cod_localFK,$formato='')
{
$mysqli=conectar_al_servidor();
$devolverArray = strtolower((string)$formato) === 'json';
$filas = array();


$condicionFecha="";
if($fecha1!="" || $fecha2!=""){
$condicionFecha=" and fecha between '$fecha1' and '$fecha2' ";
}

$condicioncliente="";
if($cliente!="" ){
$condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK ) like '%".$cliente."%'";
}

$condicionentregador="";
if($entregador!="" ){
$condicionentregador=" and (Select nombre_persona from persona pra where pra.cod_persona =entrega_cobradorFK ) like '%".$entregador."%'";
}

$condicionestado_entrega="";
if($estado_entrega!="" ){
$condicionestado_entrega=" and  sc.estado_entrega = '$estado_entrega'";
}

$condicionfecha_entrega="";
if($fecha_entrega!="" ){
$condicionfecha_entrega=" and  sc.fecha_entrega = '$fecha_entrega'";
}

$condicioncod_localFK="";
if($cod_localFK!="" ){
$condicioncod_localFK=" and  cod_localFK = '$cod_localFK'";
}


$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, cod_clienteFK, cod_codeudorFK, cod_cobradorFK,cod_usuarioFK,sc.estado_entrega,sc.fecha_entrega,
(Select nombre from zona where idzonaFk=idzona )as zona,
(Select Nombre from local where cod_local=cod_localFK ) as local,cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona =entrega_cobradorFK )as UsuarioEntrega,
(Select nombre_persona from persona pra where pra.cod_persona = cod_usuarioFK )as Usuarioaprueba,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante,
(SELECT cod_venta FROM venta where codSolicitudCreditoFK = idSolicitudCredito) as cod_venta
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona where sc.estado ='FINALIZADO' and (SELECT count(*) FROM cancelaciones where cod_venta = (SELECT cod_venta FROM venta where codSolicitudCreditoFK = idSolicitudCredito LIMIT 1)) = 0 ".$condicionFecha.$condicioncliente.$condicionentregador.$condicionestado_entrega.$condicionfecha_entrega.$condicioncod_localFK." order by idSolicitudCredito desc limit 100";
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
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$UsuarioEntrega = utf8_encode($valor['UsuarioEntrega']); 
$estado_entrega = utf8_encode($valor['estado_entrega']); 
$fecha_entrega = utf8_encode($valor['fecha_entrega']); 

$Aprueba="";
if($cod_usuarioFK!="" && $estado!="PENDIENTE" ){
	$Aprueba="<br>".$Usuarioaprueba;
}

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);

$filas[]=array(
	"id_solicitud" => $idSolicitudCredito,
	"documento" => $ci_cliente,
	"rut" => $rut_cliente,
	"cliente" => $nombre_persona,
	"producto_resumen" => isset($producto[5]) ? $producto[5] : "",
	"productos" => isset($producto[4]) ? $producto[4] : array(),
	"usuario_ingresa" => $UsuarioIngresa,
	"fecha" => $fecha,
	"observacion" => $observacion,
	"estado" => $estado,
	"usuario_aprueba" => $Usuarioaprueba,
	"usuario_entrega" => $UsuarioEntrega,
	"estado_entrega" => $estado_entrega,
	"fecha_entrega" => $fecha_entrega,
	"local" => $local,
	"cod_local" => $cod_localFK,
	"zona" => $zona,
	"telefono" => $telefono,
	"direccion" => $direccion,
	"email" => $email,
	"whatsapp" => $whapp,
	"idzona" => $idzonaFk,
	"lugar_trabajo" => $lugardetrabajo,
	"salario" => (float)$salario,
	"salario_formateado" => number_format($salario,'0',',','.'),
	"antiguedad" => $antiguedad,
	"telefono_trabajo_1" => $teleftrab1,
	"telefono_trabajo_2" => $teleftrab2,
	"direccion_trabajo" => $direcciontrab,
	"fecha_nacimiento" => $fechanac,
	"garante" => $garante,
	"cod_garante" => $cod_codeudorFK,
	"cod_cliente" => $cod_clienteFK,
	"detalle_venta" => $detalleVenta,
	"observacion_trabajo" => $obsTrabajo,
	"dato_26" => "",
	"cuotas" => isset($producto[2]) ? $producto[2] : "",
	"total_venta" => isset($producto[3]) ? (float)$producto[3] : 0,
	"documento_garante" => $docgarante
);

 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosSolicitudCredito(this)'>
<td id='td_id' style=' background-color: #efeded;color:red;display:none'>".$idSolicitudCredito."</td>
<td  id='td_datos_1' style='display:none'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_20' style='width:20%'>".$producto[0]."</td>
<td  id='td_datos_10' style='width:5%'>".$UsuarioIngresa."</td>
<td  id='' style='width:5%'>".$fecha."</td>
<td  id='td_datos_23' style='width:10%'>".$observacion."</td>
<td  id='td_datos_9' style='width:5%'>".$estado."</td>
<td  id='' style='width:5%'>".$estado.$Aprueba."</td>
<td  id='td_datos_32' style='width:10%'>".$UsuarioEntrega."</td>
<td  id='td_datos_33' style='width:10%'>".$estado_entrega."</td>
<td  id='td_datos_34' style='width:10%'>".$fecha_entrega."</td>
<td  id='td_datos_30' style='width:10%'>".$local."</td>

<td  id='td_datos_4' style='display:none'>".$zona."</td>
<td  id='td_datos_31' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='td_datos_25' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".number_format($salario,'0',',','.')."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='display:none'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_24' style='display:none'>".$obsTrabajo."</td>
<td  id='td_datos_26' style='display:none'> </td>
<td  id='td_datos_27' style='display:none'>".$producto[2]."</td>
<td  id='td_datos_28' style='display:none'>".$producto[3]."</td>
<td  id='td_datos_29' style='display:none'>".$docgarante."</td>
</tr>
</table>";


}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}


/*Buscar Registro en vista*/
function buscar_soliticud_credito_revision_documento($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$estado_entregado,$vendedor2,$formato='')
{
$mysqli=conectar_al_servidor();
$devolverArray = strtolower((string)$formato) === 'json';
$filas = array();

 $condicionVendedor="";
	 if($vendedor!=""){
	   $condicionVendedor=" and  sc.entrega_cobradorFK ='".$vendedor."'";		
	 }
	 
$condicionVendedor2="";
	 if($vendedor2!=""){
	   $condicionVendedor2="and  sc.cod_cobradorFK ='".$vendedor2."'";		
	 }

$condicionFecha="";
if($fecha1!="" || $fecha2!=""){
$condicionFecha="and fecha_venta between '$fecha1' and '$fecha2' ";
}
$condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente= '".$documento."' ";
}
$condicioncliente="";
if($cliente!=""){
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK ) like '%".$cliente."%' ";
}
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}
$condicionlocal="";
if($local!=""){
$condicionlocal="and sc.cod_localFK= '".$local."' ";
}

$condicionestado_entregado="";
if($estado_entregado!=""){
$condicionestado_entregado="and sc.estado_entrega= '".$estado_entregado."' ";
}
 
$condicionestado=" and sc.estado= 'FINALIZADO' ";

$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha,fecha_venta, sc.estado, sc.cod_clienteFK, cod_codeudorFK, sc.cod_cobradorFK,sc.cod_usuarioFK,vt.cod_venta,
(Select nombre from zona where idzonaFk=idzona )as zona,sc.estado_entrega,
(Select Nombre from local where cod_local=cod_localFK ) as local,sc.cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =sc.cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona =sc.entrega_cobradorFK )as entregador,
(Select nombre_persona from persona pra where pra.cod_persona = sc.cod_usuarioFK )as Usuarioaprueba,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join venta vt on vt.codSolicitudCreditoFK = sc.idSolicitudCredito
where cl.estado='Activo' and estado_revision_documento ='ACTIVO' and (SELECT count(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 ".$condiciondocumento.$condicioncliente.$condicionzona.$condicionFecha.$condicionlocal.$condicionestado.$condicionVendedor.$condicionestado_entregado.$condicionVendedor2." group by idSolicitudCredito order by idSolicitudCredito desc limit 100";
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
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$cod_venta = utf8_encode($valor['cod_venta']); 
$estado_entrega = utf8_encode($valor['estado_entrega']); 
$entregador = utf8_encode($valor['entregador']); 
$fecha_venta = utf8_encode($valor['fecha_venta']); 

$Aprueba="";
if($cod_usuarioFK!="" && $estado!="PENDIENTE" ){
	$Aprueba="<br>".$Usuarioaprueba;
}

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);

$filas[]=array(
	'id_solicitud'=>$idSolicitudCredito,
	'documento'=>$ci_cliente,
	'rut'=>$rut_cliente,
	'cliente'=>$nombre_persona,
	'zona'=>$zona,
	'local'=>$local,
	'cod_local'=>$cod_localFK,
	'fecha_venta'=>$fecha_venta,
	'fecha_solicitud'=>$fecha,
	'estado_entrega'=>$estado_entrega,
	'telefono'=>$telefono,
	'direccion'=>$direccion,
	'email'=>$email,
	'whatsapp'=>$whapp,
	'estado'=>$estado,
	'usuario_aprueba'=>$Usuarioaprueba,
	'mostrar_aprobador'=>($cod_usuarioFK!="" && $estado!="PENDIENTE") ? 1 : 0,
	'entregador'=>$entregador,
	'id_zona'=>$idzonaFk,
	'lugar_trabajo'=>$lugardetrabajo,
	'salario'=>(float)$salario,
	'salario_formateado'=>number_format($salario,'0',',','.'),
	'antiguedad'=>$antiguedad,
	'telefono_trabajo_1'=>$teleftrab1,
	'telefono_trabajo_2'=>$teleftrab2,
	'direccion_trabajo'=>$direcciontrab,
	'fecha_nacimiento'=>$fechanac,
	'garante'=>$garante,
	'cod_codeudor'=>$cod_codeudorFK,
	'productos'=>$producto[4],
	'producto_resumen'=>$producto[5],
	'cod_cliente'=>$cod_clienteFK,
	'detalle_venta'=>$detalleVenta,
	'observacion'=>$observacion,
	'observacion_trabajo'=>$obsTrabajo,
	'cuotas_producto'=>$producto[2],
	'total_producto'=>$producto[3],
	'documento_garante'=>$docgarante,
	'cod_venta'=>$cod_venta,
	'usuario_ingresa'=>$UsuarioIngresa
);

 $styleName=CargarStyleTable($styleName);
	if(!$devolverArray) {
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaventadocumentos(this)'>
<td id='td_id' style='width:7%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td  id='td_datos_1' style='width:7%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='width:15%'>".$nombre_persona."</td>
<td  id='td_datos_4' style='width:7%'>".$zona."</td>
<td  id='td_datos_30' style='width:7%'>".$local."</td>
<td  id='td_datos_31' style='display:none'>".$cod_localFK."</td>
<td  id='' style='width:7%'>".$fecha_venta."</td>
<td  id='' style='width:7%'>".$estado_entrega."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='' style='width:7%'>".$estado.$Aprueba."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='width:7%'>".$entregador."</td>
<td  id='td_datos_25' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".number_format($salario,'0',',','.')."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='display:none'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='width:15%'>".$producto[0]."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_23' style='display:none'>".$observacion."</td>
<td  id='td_datos_24' style='display:none'>".$obsTrabajo."</td>
<td  id='td_datos_26' style='display:none'> </td>
<td  id='td_datos_27' style='display:none'>".$producto[2]."</td>
<td  id='td_datos_28' style='display:none'>".$producto[3]."</td>
<td  id='td_datos_29' style='display:none'>".$docgarante."</td>
<td  id='td_datos_32' style='display:none'>".$cod_venta."</td>
<td  id='td_datos_33' style='width:7%'>".$UsuarioIngresa."</td>
<td  id='td_datos_34' style='width:7%'>".$fecha."</td>
</tr>
</table>";

}
}

}

$datos = obtener_solicitud_credito_total_entregado_faltante();
$entregados = $datos[0];
$faltante = $datos[1];

    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4"=> $entregados,"5"=>$faltante);
echo json_encode($informacion);	
exit;
}



function buscar_soliticud_credito_revision_documento_pagare($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$entregado,$vendedor2,$formato='')
{
$mysqli=conectar_al_servidor();
$devolverArray = strtolower((string)$formato) === 'json';
$filas = array();

 $condicionVendedor="";
	 if($vendedor!=""){
	   $condicionVendedor="and  sc.entrega_cobradorFK ='".$vendedor."'";		
	 }
	 
	 $condicionVendedor2="";
	 if($vendedor2!=""){
	   $condicionVendedor2="and  sc.cod_cobradorFK ='".$vendedor2."'";		
	 }

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
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK ) like '%".$cliente."%' ";
}
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}
$condicionlocal="";
if($local!=""){
$condicionlocal="and sc.cod_localFK= '".$local."' ";
}

$condicionentregado="";
if($entregado!=""){
$condicionentregado="and sc.estado_entrega= '".$entregado."' ";
}
 
$condicionestado=" and sc.estado= 'FINALIZADO' ";

$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, sc.cod_clienteFK, cod_codeudorFK, sc.cod_cobradorFK,sc.cod_usuarioFK,vt.cod_venta,sc.estado_entrega,sc.entrega_cobradorFK,
(Select nombre from zona where idzonaFk=idzona )as zona,
(Select Nombre from local where cod_local=cod_localFK ) as local,sc.cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =sc.cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona = sc.cod_usuarioFK )as Usuarioaprueba,
(Select nombre_persona from persona pra where pra.cod_persona = sc.entrega_cobradorFK )as entregador,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join venta vt on vt.codSolicitudCreditoFK = sc.idSolicitudCredito
where cl.estado='Activo' and estado_revision_documento_pagare ='ACTIVO' and (SELECT count(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 ".$condiciondocumento.$condicioncliente.$condicionzona.$condicionFecha.$condicionlocal.$condicionestado.$condicionVendedor. $condicionVendedor2.$condicionentregado." group by idSolicitudCredito order by idSolicitudCredito desc limit 100";
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

$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$cod_venta = utf8_encode($valor['cod_venta']); 
$estado_entrega = utf8_encode($valor['estado_entrega']); 
$entregador = utf8_encode($valor['entregador']); 

$Aprueba="";
if($cod_usuarioFK!="" && $estado!="PENDIENTE" ){
	$Aprueba="<br>".$Usuarioaprueba;
}

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);

$filas[]=array(
	'id_solicitud'=>$idSolicitudCredito,
	'documento'=>$ci_cliente,
	'rut'=>$rut_cliente,
	'cliente'=>$nombre_persona,
	'zona'=>$zona,
	'local'=>$local,
	'cod_local'=>$cod_localFK,
	'fecha_venta'=>$fecha,
	'fecha_solicitud'=>$fecha,
	'estado_entrega'=>$estado_entrega,
	'telefono'=>$telefono,
	'direccion'=>$direccion,
	'email'=>$email,
	'whatsapp'=>$whapp,
	'estado'=>$estado,
	'usuario_aprueba'=>$Usuarioaprueba,
	'mostrar_aprobador'=>($cod_usuarioFK!="" && $estado!="PENDIENTE") ? 1 : 0,
	'entregador'=>$entregador,
	'id_zona'=>$idzonaFk,
	'lugar_trabajo'=>$lugardetrabajo,
	'salario'=>(float)$salario,
	'salario_formateado'=>number_format($salario,'0',',','.'),
	'antiguedad'=>$antiguedad,
	'telefono_trabajo_1'=>$teleftrab1,
	'telefono_trabajo_2'=>$teleftrab2,
	'direccion_trabajo'=>$direcciontrab,
	'fecha_nacimiento'=>$fechanac,
	'garante'=>$garante,
	'cod_codeudor'=>$cod_codeudorFK,
	'productos'=>$producto[4],
	'producto_resumen'=>$producto[5],
	'cod_cliente'=>$cod_clienteFK,
	'detalle_venta'=>$detalleVenta,
	'observacion'=>$observacion,
	'observacion_trabajo'=>$obsTrabajo,
	'cuotas_producto'=>$producto[2],
	'total_producto'=>$producto[3],
	'documento_garante'=>$docgarante,
	'cod_venta'=>$cod_venta,
	'usuario_ingresa'=>$UsuarioIngresa
);

 $styleName=CargarStyleTable($styleName);
	if(!$devolverArray) {
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaventadocumentosclientepagare(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td  id='td_datos_1' style='width:5%'>".$ci_cliente."</td>
<td  id='td_datos_2' style='display:none'>".$rut_cliente."</td>
<td  id='td_datos_3' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_4' style='width:10%'>".$zona."</td>
<td  id='td_datos_30' style='width:10%'>".$local."</td>
<td  id='td_datos_31' style='display:none'>".$cod_localFK."</td>
<td  id='' style='width:10%'>".$fecha."</td>
<td  id='' style='width:10%'>".$estado_entrega."</td>
<td  id='td_datos_5' style='display:none'>".$telefono."</td>
<td  id='td_datos_6' style='display:none'>".$direccion."</td>
<td  id='td_datos_7' style='display:none'>".$email."</td>
<td  id='td_datos_8' style='display:none'>".$whapp."</td>
<td  id='' style='width:5%'>".$estado.$Aprueba."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='width:5%'>".$entregador."</td>
<td  id='td_datos_25' style='display:none'>".$idzonaFk."</td>
<td  id='td_datos_11' style='display:none'>".$lugardetrabajo."</td>
<td  id='td_datos_12' style='display:none'>".number_format($salario,'0',',','.')."</td>
<td  id='td_datos_13' style='display:none'>".$antiguedad."</td>
<td  id='td_datos_14' style='display:none'>".$teleftrab1."</td>
<td  id='td_datos_15' style='display:none'>".$teleftrab2."</td>
<td  id='td_datos_16' style='display:none'>".$direcciontrab."</td>
<td  id='td_datos_17' style='display:none'>".$fechanac."</td>
<td  id='td_datos_18' style='display:none'>".$garante."</td>
<td  id='td_datos_19' style='display:none'>".$cod_codeudorFK."</td>
<td  id='td_datos_20' style='width:10%'>".$producto[0]."</td>
<td  id='td_datos_21' style='display:none'>".$cod_clienteFK."</td>
<td  id='td_datos_22' style='display:none'>".$detalleVenta."</td>
<td  id='td_datos_23' style='display:none'>".$observacion."</td>
<td  id='td_datos_24' style='display:none'>".$obsTrabajo."</td>
<td  id='td_datos_26' style='display:none'> </td>
<td  id='td_datos_27' style='display:none'>".$producto[2]."</td>
<td  id='td_datos_28' style='display:none'>".$producto[3]."</td>
<td  id='td_datos_29' style='display:none'>".$docgarante."</td>
<td  id='td_datos_32' style='display:none'>".$cod_venta."</td>
<td  id='td_datos_33' style='width:10%'>".$UsuarioIngresa."</td>
</tr>
</table>";


}
}

}

$datos = obtener_solicitud_credito_total_entregado_faltante();
$entregados = $datos[0];
$faltante = $datos[1];

    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4"=> $entregados,"5"=>$faltante);
echo json_encode($informacion);
exit;
}
function marcarrevisiondocumentocomoterminado($idSolicitudCredito)
{

$mysqli=conectar_al_servidor(); 

 $consulta2="update  solicitudcredito set estado_revision_documento ='TERMINADO'  where idSolicitudCredito=? ";	

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
function marcarrevisiondocumentopagarecomoterminado($idSolicitudCredito)
{

$mysqli=conectar_al_servidor(); 

 $consulta2="update  solicitudcredito set estado_revision_documento_pagare ='TERMINADO'  where idSolicitudCredito=? ";	

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
function obtener_solicitud_credito_total_entregado_faltante()
{
$mysqli=conectar_al_servidor();


$sql= "select observacion,idSolicitudCredito,detalleVenta, fecha, sc.estado, sc.cod_clienteFK, cod_codeudorFK, sc.cod_cobradorFK,sc.cod_usuarioFK,vt.cod_venta,sc.estado_entrega,sc.entrega_cobradorFK,
(Select nombre from zona where idzonaFk=idzona )as zona,
(Select Nombre from local where cod_local=cod_localFK ) as local,sc.cod_localFK,
(Select nombre_persona from persona pra where pra.cod_persona =sc.cod_cobradorFK )as UsuarioIngresa,
(Select nombre_persona from persona pra where pra.cod_persona = sc.cod_usuarioFK )as Usuarioaprueba,
(Select nombre_persona from persona pra where pra.cod_persona = sc.entrega_cobradorFK )as entregador,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK )as cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante
 from solicitudcredito sc
 inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
 inner join   persona pr on cl.cod_cliente=pr.cod_persona 
 inner join venta vt on vt.codSolicitudCreditoFK = sc.idSolicitudCredito
where sc.estado='FINALIZADO'";
  


$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$datos;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalEntregado = 0;
$totalFaltante = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$obsTrabajo = utf8_encode($valor['obsTrabajo']); 
$cod_usuarioFK = utf8_encode($valor['cod_usuarioFK']); 
$UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
$Usuarioaprueba = utf8_encode($valor['Usuarioaprueba']); 
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
$docgarante = utf8_encode($valor['docgarante']); 
$detalleVenta = utf8_encode($valor['detalleVenta']); 
$fecha = utf8_encode($valor['fecha']); 
$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$cod_venta = utf8_encode($valor['cod_venta']); 
$estado_entrega = utf8_encode($valor['estado_entrega']); 
$entregador = utf8_encode($valor['entregador']); 


if($estado_entrega =='SI'){
	$totalEntregado++;
}else{
	$totalFaltante++;
}

}
}

$datos[0] = $totalEntregado;
$datos[1] = $totalFaltante;


mysqli_close($mysqli);  
return $datos;
}

function cargararchivogarante($cod_clienteFK){
	
	
			  $nombreArchivo = generarCodigoAleatorio(7) . $cod_clienteFK;

$nombrePost = 'archivogarante';

$ext=$_POST["ext"];
 $ext=utf8_decode($ext);
 
 $consulta = '';
 $ruta = '';
 if($ext == 'pdf'){
	 $ruta="/archivospdf";
 }else{
	 $ruta="/fotosDocumento";
 }

$respuesta = mover_archivo_carpeta($ruta,$nombreArchivo,$nombrePost,$ext);

$ruta="/GoodVentaElectroCasaMaric".$ruta."/".$nombreArchivo.".".$ext;


date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d'); 
$user=$_POST['useru'];
$user = utf8_decode($user);

if($respuesta){
	 if($ext == 'pdf'){
		$consulta="INSERT INTO archivos_cliente(url,cod_clienteFK,descripcion,fecha) VALUES('$ruta','$cod_clienteFK','DOCUMENTO CLIENTE GARANTE DESDE SOLICITUD','$fecha_inser')";	
	}else{
		$consulta="INSERT INTO fotos_cliente(url,descripcion,fecha,cod_clienteFK,iddescripcion_fotoFK,cod_cobradorFK) VALUES('$ruta','IMAGENES DESDE SOLICITUD DE CREDITO - GARANTE','$fecha_inser','$cod_clienteFK','','$user')";	
	}
	
	$mysqli=conectar_al_servidor();
	$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
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


function editarmasreferencias($idreferenciacliente,$telefono,$direccion,$referencia,$observacion,$tipo,$obs)
{

if($idreferenciacliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();
$consulta="UPDATE referenciascliente SET telef = '$telefono', direccion = '$direccion', referencias='$referencia', observacion = '$observacion', tipo='$tipo', obs = '$obs' WHERE idreferenciascliente = '$idreferenciacliente'";

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

function editarmasreferenciascomercialcliente($idreferenciacliente,$monto,$telefono,$direccion,$referencia,$observacion,$tipo,$obs, $calificacion)
{

if($idreferenciacliente=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();
asegurarColumnaImagenReferenciaCliente($mysqli);
$imagen = guardarImagenReferenciaCliente($idreferenciacliente);
if($imagen != ""){
	$consulta="UPDATE referenciascliente SET telef = ?, monto = ?, direccion = ?, referencias = ?, observacion = ?, tipo = ?, obs = ?, calificacion = ?, imagen = ? WHERE idreferenciascliente = ?";
	$stmt1 = $mysqli->prepare($consulta);
	if (!$stmt1) {
		responderErrorReferenciaCliente("No se pudo preparar la edicion de la referencia comercial");
	}
	$stmt1->bind_param('ssssssssss', $telefono, $monto, $direccion, $referencia, $observacion, $tipo, $obs, $calificacion, $imagen, $idreferenciacliente);
}else{
	$consulta="UPDATE referenciascliente SET telef = ?, monto = ?, direccion = ?, referencias = ?, observacion = ?, tipo = ?, obs = ?, calificacion = ? WHERE idreferenciascliente = ?";
	$stmt1 = $mysqli->prepare($consulta);
	if (!$stmt1) {
		responderErrorReferenciaCliente("No se pudo preparar la edicion de la referencia comercial");
	}
	$stmt1->bind_param('sssssssss', $telefono, $monto, $direccion, $referencia, $observacion, $tipo, $obs, $calificacion, $idreferenciacliente);
}

if (!$stmt1->execute()) {
	responderErrorReferenciaCliente("No se pudo editar la referencia comercial");
}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function eliminarmasreferencia($idreferenciacliente)
{

if($idreferenciacliente=="" ){
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


function buscar_abm_calificacion_entrega($fecha_entrega,$cliente,$cod_cobrador,$fechadesde,$fechahasta,$calificacion,$estado)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$filas=array();

$condicionfecha_entrega = '';
if($fecha_entrega != ''){
	$condicionfecha_entrega = " and fecha_entrega = '$fecha_entrega'";
}

$condicioncliente = '';
if($cliente != ''){
	$condicioncliente = " and (SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = cod_clienteFK) like '%".$cliente."%'";
}

$promedio='SIN COBRADOR';
$max = 0;
$min = 0;
$condicioncobrador = '';
if($cod_cobrador != ''){
	$condicioncobrador = " and entrega_cobradorFK = '$cod_cobrador'";
	$arrayDatos = obtener_promedio_calificacion_cobrador($cod_cobrador);
	$promedio= $arrayDatos[0];
	$max= $arrayDatos[1];
	$min= $arrayDatos[2];
}

$condicionestado = '';
if($estado != ''){
	$condicionestado = " and IFNULL((SELECT estado FROM calificacion_entrega WHERE idSolicitudCreditoFK = idSolicitudCredito),'PENDIENTE') = '$estado'";
}

$condicioncalificacion = '';
if($calificacion != ''){
	$condicioncalificacion = " and (SELECT calificacion FROM calificacion_entrega WHERE idSolicitudCreditoFK = idSolicitudCredito) = '$calificacion'";
}

$condicionfechas = '';
if($fechadesde != ''){
	$condicionfechas = " and fecha_entrega between '$fechadesde' and '$fechahasta'";
}

$sql= "SELECT fecha_entrega, 
(SELECT usu FROM cobrador WHERE cod_cobrador = entrega_cobradorFK) as cobrador,
(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = cod_clienteFK) as cliente,
(SELECT telefono FROM persona WHERE cod_persona = cod_clienteFK) as telefono_cliente,
(SELECT whapp FROM cliente WHERE cod_cliente = cod_clienteFK) as nro_whatsapp,
(SELECT observacion FROM calificacion_entrega WHERE idSolicitudCreditoFK = idSolicitudCredito) as observacion,
(SELECT calificacion FROM calificacion_entrega WHERE idSolicitudCreditoFK = idSolicitudCredito) as calificacion,
(SELECT idcalificacion_entrega FROM calificacion_entrega WHERE idSolicitudCreditoFK = idSolicitudCredito) as idcalificacion_entrega,
IFNULL((SELECT estado FROM calificacion_entrega WHERE idSolicitudCreditoFK = idSolicitudCredito),'PENDIENTE') as estado_cal,idSolicitudCredito
FROM solicitudcredito WHERE estado_entrega = 'SI'".$condicioncliente.$condicionfecha_entrega.$condicionfechas.$condicioncobrador.$condicioncalificacion.$condicionestado." order by fecha_entrega desc limit 100";


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
$fecha_entrega = utf8_encode($valor['fecha_entrega']); 
$cobrador = utf8_encode($valor['cobrador']); 
$cliente = utf8_encode($valor['cliente']); 
$telefono_cliente = utf8_encode($valor['telefono_cliente']); 
$observacion = utf8_encode($valor['observacion']); 
$calificacion = utf8_encode($valor['calificacion']); 
$idSolicitudCredito = utf8_encode($valor['idSolicitudCredito']); 
$idcalificacion_entrega = utf8_encode($valor['idcalificacion_entrega']); 
$estado_cal = utf8_encode($valor['estado_cal']); 
$nro_whatsapp = utf8_encode($valor['nro_whatsapp']); 

$producto=buscarDetalleProductoSolicitud($idSolicitudCredito);

$filas[]=array(
"id_solicitud" => $idSolicitudCredito,
"fecha_entrega" => $fecha_entrega,
"cliente" => $cliente,
"telefono" => $telefono_cliente,
"whatsapp" => $nro_whatsapp,
"cobrador" => $cobrador,
"calificacion" => $calificacion,
"observacion" => $observacion,
"estado" => $estado_cal,
"producto" => $producto[0],
"id_calificacion" => $idcalificacion_entrega
);

if($formato !== "json") {
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCalificacionEntrega(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idSolicitudCredito."</td>
<td  id='td_datos_1' style='width:5%'>".$fecha_entrega."</td>
<td  id='td_datos_2' style='width:20%'>".$cliente."</td>
<td  id='td_datos_3' style='width:5%'>".$telefono_cliente."</td>
<td  id='' style='width:5%'>".$nro_whatsapp."</td>
<td  id='td_datos_4' style='width:10%'>".$cobrador."</td>
<td  id='td_datos_5' style='width:10%'>".$calificacion."</td>
<td  id='td_datos_6' style='width:10%'>".$observacion."</td>
<td  id='td_datos_8' style='width:10%'>".$estado_cal."</td>
<td  id='' style='width:20%'>".$producto[0]."</td>
<td  id='td_datos_7' style='display:none'>".$idcalificacion_entrega."</td>
</tr>
</table>";
	}
	}
	}



mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3"=>$nroRegistro,"4"=>$promedio,"5"=>$max,"6"=>$min);
echo json_encode($informacion);	
exit;
}

function obtener_promedio_calificacion_cobrador($cod_cobradorFK)
{
$mysqli=conectar_al_servidor();

$sql= "SELECT IFNULL(sum(calificacion),0) as total_cal,count(*) as contador,
IFNULL(max(Calificacion),0) as maximo, IFNULL(min(Calificacion),0) as minimo
FROM solicitudcredito sc inner join calificacion_entrega ce ON sc.idSolicitudCredito = ce.idSolicitudCreditoFK WHERE estado_entrega = 'SI' and sc.entrega_cobradorFK = '$cod_cobradorFK'";

// echo $sql;
// exit;

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$total_cal = 0;
$contador = 0;
$maximo = 0;
$arrayDatos = array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$total_cal = utf8_encode($valor['total_cal']); 
$contador = utf8_encode($valor['contador']); 
$maximo = utf8_encode($valor['maximo']); 
$minimo = utf8_encode($valor['minimo']); 



}
}

$resultado = 0;
if($total_cal != 0 && $contador != 0){
	$resultado = $total_cal / $contador;
}

$arrayDatos[0] = $resultado;
$arrayDatos[1] = $maximo;
$arrayDatos[2] = $minimo;

mysqli_close($mysqli);  
return $arrayDatos;
}


function abmcalificacionentrega($idAbm,$observacion,$calificacion,$idAbmSolicitudCalificacionEntrega,$estado,$operacion)
{

$mysqli=conectar_al_servidor(); 

date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d', time()); 

$user=$_POST['useru'];
    $user = utf8_decode($user);

if($operacion=="nuevoCalificacionEntrega") 
{

	$consulta1=" Insert into calificacion_entrega (observacion,calificacion,idSolicitudCreditoFK,fecha_insert,estado,user_insert)
	values('$observacion','$calificacion','$idAbmSolicitudCalificacionEntrega','$fecha_inser','$estado','$user')";
}


if($operacion=="editarCalificacionEntrega")
{
	$consulta1="UPDATE calificacion_entrega SET observacion = '$observacion',calificacion='$calificacion',estado='$estado' WHERE idcalificacion_entrega = '$idAbm'";
}

$stmt = $mysqli->prepare($consulta1);

if (!$stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}





function buscarDocumentosCargaFotoCalificacionEntrega($codigo,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 /* $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha_insert between '$fecha1' and '$fecha2'";
	 } */
	 
		$sql= "SELECT idfotos_calificacion_entrega,url,descripcion,fecha_insert,idSolicitudCreditoFK,
		(SELECT usu FROM cobrador WHERE cod_cobrador = (SELECT entrega_cobradorFK FROM solicitudcredito WHERE idSolicitudCredito = '$codigo')) AS cobrador 
				FROM fotos_calificacion_entrega where idSolicitudCreditoFK='$codigo' ";
  
  // echo $sql;
  // exit;
   
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
		  
		  
		      $idfotos_calificacion_entrega=$valor['idfotos_calificacion_entrega'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha_insert']);
		  	  $idSolicitudCreditoFK=utf8_encode($valor['idSolicitudCreditoFK']);
		  	  $cobrador=utf8_encode($valor['cobrador']);
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);
			  $filas[]=array(
				  'codigo_fila'=>$codigo,
				  'id_documento'=>$idfotos_calificacion_entrega,
				  'id_solicitud_credito'=>$idSolicitudCreditoFK,
				  'url'=>$archivourl,
				  'descripcion'=>$descripcion,
				  'cobrador'=>$cobrador,
				  'fecha'=>$fecha
			  );
			  
			  
		  	  $pagina.="
<table id='$codigo' class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistroImagen' onclick='SeleccionarItemFotosCalificacionEntrega(this)' name='tableRegistroSelec'>
<td id='td_id_1' style='display:none'>".$codigo."</td>
<td id='td_id_2' style='display:none'>".$idfotos_calificacion_entrega."</td>
<td id='td_id_3' style='display:none'>".$idSolicitudCreditoFK."</td>
<td id='td_datos_1' style='display:none'>".$archivourl."</td>
<td id='' style='width:20%'>FOTO</td>
<td id='td_datos_2' style='width:30%'>".$descripcion."</td>
<td id='' style='width:30%'>".$cobrador."</td>
<td id='td_datos_3' style='width:20%'>".$fecha."</td>
</tr>
</table>";
			  
			  $codigo="";
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscaroptionDescripcionFotosCalificacionEntrega()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from descripcion_foto_calificacion_entrega where estado='Activo' ";
		
		
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
		  
		  
		      $iddescripcion_foto_calificacion_entrega=$valor['iddescripcion_foto_calificacion_entrega'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$iddescripcion_foto_calificacion_entrega' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function NuevoDescripcionFotosCalificacionEntrega($descripcion,$Estado,$idabm,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevaDescripcionFotosCalificacionEntrega")
	{
				$consulta= "Select count(*) from `descripcion_foto_calificacion_entrega` where descripcion=? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $descripcion); 


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
	if($funt=="nuevaDescripcionFotosCalificacionEntrega")
	{
	
    
    $consulta="insert into `descripcion_foto_calificacion_entrega` (descripcion,estado) values (upper(?),?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='ss';
    $stmt->bind_param($ss,$descripcion,$Estado); 
        
 
	}
	if($funt=="editarDescripcionFotosCalificacionEntrega")
	{
        
        
    
    $consulta="Update `descripcion_foto_calificacion_entrega` set descripcion=upper(?),estado=? where iddescripcion_foto_calificacion_entrega=?";	

	$stmt = $mysqli->prepare($consulta);
        


    $ss='sss';
        
    $stmt->bind_param($ss,$descripcion,$Estado,$idabm); 
        
	
       
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


function insertar_foto_calificacion_entrega($cod_detalle,$exte,$archivo,$descripcion)
{
	$documento=substr($archivo, strpos($archivo, ",") + 1);;
	$documento = base64_decode($documento);
	
	$id_documento=rand(10,5000);		  
	$donde="../fotos/calificacion_entrega/";
	$id_documento=$cod_detalle;
	
	$id_f=subir_imagen_base64($donde,$documento,$id_documento,$exte);
	$ruta="/GoodVentaElectroCasaMaric/fotos/calificacion_entrega/".$cod_detalle.$id_f.'.'.$exte;
	
	CargarArchivoEntregaCalificacion($ruta,$cod_detalle,$descripcion);
}
function CargarArchivoEntregaCalificacion($Urldoc,$idSolicitudCreditoFK,$descripcion){
	$mysqli=conectar_al_servidor();
	
	$user=$_POST['useru'];
$user = utf8_decode($user);


date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 
	
	$consulta="INSERT INTO `fotos_calificacion_entrega` (url,idSolicitudCreditoFK,descripcion,fecha_insert,user_insert) VALUES ('$Urldoc','$idSolicitudCreditoFK','$descripcion','$fecha_inser_edit','$user') ";
	
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
function eliminardocumentoFotosCalificacionEntrega($isolicitudcredito,$iddocumento,$urldocumento)
{
	$mysqli=conectar_al_servidor();
	$sql= "DELETE FROM fotos_calificacion_entrega WHERE idSolicitudCreditoFK='$isolicitudcredito' and idfotos_calificacion_entrega='$iddocumento'";
 
 
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
    $control = "exito";
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








 function buscarDatosClienteAprobarSolictudCredito($cod_cliente,$Cod_solicitudCreditoAprobar)
{
$mysqli=conectar_al_servidor();

$sql= "select 
(Select nombre from zona where idzonaFk=idzona )as zona, cl.tipo_vivienda , cl.calificacion_cliente,
cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo, 
(select count(*) from fotos_cliente where descripcion IN ('3', '20')) as foto1, foto2,
cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,cl.tipo_cliente,
(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_cliente )as cliente,
 ifnull((Select sum(monto) from referenciascliente ref where ref.cod_clienteFk=cl.cod_cliente ),0) as montoreferencia
from cliente cl inner join persona pr on cl.cod_cliente=pr.cod_persona 
where cl.cod_cliente ='$cod_cliente'";

// echo $sql;
// exit;

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$datosCliente="";
$pagina = '';
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$foto1 = utf8_encode($valor['foto1']);    
$foto2 = utf8_encode($valor['foto2']);    
$obsTrabajo = utf8_encode($valor['obsTrabajo']);    
$fechanac = utf8_encode($valor['fechanac']);     
$nombre_persona = utf8_encode($valor['cliente']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
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
$tipo_cliente = utf8_encode($valor['tipo_cliente']);
$tipo_vivienda = utf8_encode($valor['tipo_vivienda']);
$calificacion_cliente = utf8_encode($valor['calificacion_cliente']);
$montoreferencia = utf8_encode($valor['montoreferencia']);

$pagina = "  <li><strong>Nombre Apellido:</strong> $nombre_persona</li>
                <li><strong>Cédula:</strong> $ci_cliente</li>
                <li><strong>Fecha Nac.:</strong> $fechanac</li>
                <li><strong>Teléfono:</strong> $telefono</li>
                <li><strong>Whatsapp:</strong> $whapp</li>
                <li><strong>Zona:</strong> $zona</li>
                <li><strong>Trabajo:</strong> $lugardetrabajo</li>
                <li><strong>Salario:</strong> $salario</li>
                <li><strong>Antiguedad:</strong> $antiguedad</li>
                <li><strong>Dirección Trabajo:</strong> $direcciontrab</li>
                <li><strong>Tipo Cliente:</strong> <span class='text-success fw-bold'>$tipo_cliente</span></li>
                <li><strong>Tipo Hogar:</strong> <span class='text-success fw-bold'>$tipo_vivienda</span></li> ";
				
				

$DatosDeuda=BuscarDaTosClienteAprobarSolicitudCredito($cod_cliente);

  	$porcentaje_deuda_actual= BuscarDeudaActual($cod_cliente);
	$dias_atraso= $DatosDeuda["promedio_dias_atraso"];
	$deuda_mensual= BuscarDeudaMensual($cod_cliente);
	$DeudaUltimaVenta=BuscarDeudaUltimaVenta($cod_cliente);
	$ClienteNueo_0_recurrente= $DatosDeuda["ClienteNueo_0_recurrente"];
	$CantidadCuotasPagadas= $DatosDeuda["CantidadCuotasPagadas"];

	if($porcentaje_deuda_actual=="SIN REGISTRO" && $dias_atraso!="SIN REGISTRO"){
		$porcentaje_deuda_actual="0%";
	}

	if($deuda_mensual=="SIN REGISTRO" && $dias_atraso!="SIN REGISTRO"){
		$deuda_mensual=0;
	}
	
	if($DeudaUltimaVenta=="SIN REGISTRO" && $dias_atraso!="SIN REGISTRO"){
		$DeudaUltimaVenta="0%";
	}
 
$MontosolicitudCredito= buscarDetalleSolicitud($Cod_solicitudCreditoAprobar);
$MontoDeudaActivaReferencia= $MontosolicitudCredito[0];	
$antiguedad_meses = convertirAntiguedadAMeses($antiguedad);

$historial_inforconf= $MontosolicitudCredito[2];	
 
if($fechanac!="0000-00-00"){
	 
$nacimiento = new DateTime($fechanac);

// Crear un objeto DateTime para la fecha actual
$hoy = new DateTime();

// Calcular la diferencia
$edad = $hoy->diff($nacimiento)->y;
}else{
	$edad ="SIN REGISTRO";
}
				
	$datosCliente = [
    "nombre_persona" => $nombre_persona,
    "cedula" => $ci_cliente,
    "fecha_nacimiento" => $edad,
    "telefono" => $telefono,
    "whatsapp" => $whapp,
    "zona" => $zona,
    "trabajo" => $lugardetrabajo,
    "salario" => $salario,
    "antiguedad" => $antiguedad_meses,
    "direccion_trabajo" => $direcciontrab,
    "foto1" => $foto1,
    "foto2" => $foto2,
    "tipo_vivienda" => $tipo_vivienda,
    "deuda_mensual" => $deuda_mensual,
    "porcentaje_deuda_actual" => $porcentaje_deuda_actual,
    "dias_atraso" => $dias_atraso,
    "MontoDeudaActivaReferencia" => $MontoDeudaActivaReferencia, 
    "historial_inforconf" => $historial_inforconf,
    "MontosolicitudCredito" => $MontosolicitudCredito[1],	
    "calificacion_cliente" => $calificacion_cliente,	
    "DeudaUltimaVenta" => $DeudaUltimaVenta,	
    "CantidadCuotasPagadas" => $CantidadCuotasPagadas,	
    "montoreferencia" =>   number_format($montoreferencia, '0', ',', '.'),	
    "tipo_cliente" => $tipo_cliente
];

}
}



    mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $pagina,"3" => $datosCliente);
echo json_encode($informacion);	
exit;
}


 function buscar_detalles_venta($buscar,$formato="")
{
	$mysqli = conectar_al_servidor();

	$sql = "select pr.nombre_producto,
 IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";/*Sentencia para buscar registros*/
	$pagina = "";
	$filas = array();
	$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
	/*Función para ejecutar sentencias sql*/
	if (!$stmt->execute()) {
		/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
	$nroRegistro = $valor;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/ {



			$nombre_producto = utf8_encode($valor['nombre_producto']);
			$nroDevoluciones = utf8_decode($valor['nroDevoluciones']);
			$nroCambios = utf8_decode($valor['nroCambios']);
			$nroGarantia = utf8_decode($valor['nroGarantia']);
			if ($nroDevoluciones == 0 && $nroCambios == 0) {
				$filas[] = array("producto" => $nombre_producto);
				if(strtolower($formato)!=="json"){
				$pagina .= "<table class='tableTicket'>
<tr>
<td style='width:100%'>" . $nombre_producto . "</td>
</tr>
</table>";
				}
			}
		}
	}
	mysqli_close($mysqli);
return strtolower($formato) === 'json' ? $filas : $pagina;
}

function buscar_ventas_aprobar_solicitud($buscar,$formato="")
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato)==="json";

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
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt where (vt.cod_clienteFK ='" . $buscar . "' or vt.idGaranteFk ='" . $buscar . "'  ) and
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ";


// echo($sql);
// exit;


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

			$totalRegistro = $totalRegistro + 1;

			
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));
		
			$pagina_detalle_venta = buscar_detalles_venta($cod_venta,$formato);
			
			$filas[] = array(
				"fecha" => $fecha_venta,
				"productos" => $devolverArray ? $pagina_detalle_venta : array(),
				"total_venta" => number_format($totalventadetalle, '0', ',', '.'),
				"id_venta" => $cod_venta
			);
			if(!$devolverArray){
			$pagina .= "

<tr >
<td  >" . $fecha_venta . "</td>
<td  >" . $pagina_detalle_venta . "</td>
<td  >" . number_format($totalventadetalle, '0', ',', '.') . "</td>
</tr>
";
			}
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}







 function buscarDetallesPagosClienteAprobarSolicitudCredito($cod_cliente,$tipo_cuenta,$tipo_venta)
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
			$deuda = $datos[8];
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
if($totalDeuda!=0){
	$ColerDeuda=" background: #38b2ac;";
}
$ClaseEstadoCredito = ($deuda > 0) ? " credito-con-deuda" : " credito-sin-deuda";

if($tipo_cuenta =='PENDIENTES' && $deuda > 0){
	
 $pagina1 .= "
<div class='divCreditoPendiente $ClaseEstadoCredito' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

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
      + Ver cuotas
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura</td>
	 <td style=' font-weight:bold;'>Fecha venta</td> 
	 <td style=' font-weight:bold;'>Total venta</td>
	 <td style=' font-weight:bold;'>Pagado</td>
	 <td style=' font-weight:bold;'>Condicion</td>
	 <td style=' font-weight:bold;'>Plazo</td>      
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
  <b> Detalle de venta </b>
  
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
$clasesEstadoPagoCuota = obtenerClasesEstadoPagoCuotaCredito($fechapago, $cantidad, $totalPago, $diff, $deudaActua);
$ClaseEstadoCuota = $clasesEstadoPagoCuota["cuota"];
$ClasePagoRegistrado = $clasesEstadoPagoCuota["pago"];
  
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
<div class='divCreditoPendiente $ClaseEstadoCuota' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Vencimiento</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda</td>
	 <td style='padding:0px; font-weight:bold;'>Dias atraso</td>
      
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
<div class='divCreditoPendiente $ClasePagoRegistrado' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Comprobante</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo</td>  
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
	 <td style='width:33%; font-weight:bold;'>CUOTAS VENCIDAS</td> 
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
<div class='divCreditoPendiente $ClaseEstadoCredito' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

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
      + Ver cuotas
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura</td>
	 <td style=' font-weight:bold;'>Fecha venta</td> 
	 <td style=' font-weight:bold;'>Total venta</td>
	 <td style=' font-weight:bold;'>Pagado</td>
	 <td style=' font-weight:bold;'>Condicion</td>
	 <td style=' font-weight:bold;'>Plazo</td>      
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
  <b> Detalle de venta </b>
  
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
$clasesEstadoPagoCuota = obtenerClasesEstadoPagoCuotaCredito($fechapago, $cantidad, $totalPago, $diff, $deudaActua);
$ClaseEstadoCuota = $clasesEstadoPagoCuota["cuota"];
$ClasePagoRegistrado = $clasesEstadoPagoCuota["pago"];
  
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
<div class='divCreditoPendiente $ClaseEstadoCuota' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Vencimiento</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda</td>
	 <td style='padding:0px; font-weight:bold;'>Dias atraso</td>
      
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
<div class='divCreditoPendiente $ClasePagoRegistrado' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Comprobante</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo</td>  
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
	 <td style='width:33%; font-weight:bold;'>CUOTAS VENCIDAS</td> 
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
<div class='divCreditoPendiente $ClaseEstadoCredito' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

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
      + Ver cuotas
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura</td>
	 <td style=' font-weight:bold;'>Fecha venta</td> 
	 <td style=' font-weight:bold;'>Total venta</td>
	 <td style=' font-weight:bold;'>Pagado</td>
	 <td style=' font-weight:bold;'>Condicion</td>
	 <td style=' font-weight:bold;'>Plazo</td>      
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
  <b> Detalle de venta </b>
  
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
$clasesEstadoPagoCuota = obtenerClasesEstadoPagoCuotaCredito($fechapago, $cantidad, $totalPago, $diff, $deudaActua);
$ClaseEstadoCuota = $clasesEstadoPagoCuota["cuota"];
$ClasePagoRegistrado = $clasesEstadoPagoCuota["pago"];
  
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
<div class='divCreditoPendiente $ClaseEstadoCuota' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Vencimiento</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda</td>
	 <td style='padding:0px; font-weight:bold;'>Dias atraso</td>
      
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
<div class='divCreditoPendiente $ClasePagoRegistrado' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Comprobante</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo</td>  
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
	 <td style='width:33%; font-weight:bold;'>CUOTAS VENCIDAS</td> 
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


 function buscarDetallesGaranteAprobarSolicitudCredito($cod_cliente,$tipo_cuenta,$tipo_venta)
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
			$deuda = $datos[8];
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
if($totalDeuda!=0){
	$ColerDeuda=" background: #38b2ac;";
}
$ClaseEstadoCredito = ($deuda > 0) ? " credito-con-deuda" : " credito-sin-deuda";

if($tipo_cuenta =='PENDIENTES' && $deuda > 0){
	
 $pagina1 .= "
<div class='divCreditoPendiente $ClaseEstadoCredito' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

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
      + Ver cuotas
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura</td>
	 <td style=' font-weight:bold;'>Fecha venta</td> 
	 <td style=' font-weight:bold;'>Total venta</td>
	 <td style=' font-weight:bold;'>Pagado</td>
	 <td style=' font-weight:bold;'>Condicion</td>
	 <td style=' font-weight:bold;'>Plazo</td>      
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
  <b> Detalle de venta </b>
  
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
$clasesEstadoPagoCuota = obtenerClasesEstadoPagoCuotaCredito($fechapago, $cantidad, $totalPago, $diff, $deudaActua);
$ClaseEstadoCuota = $clasesEstadoPagoCuota["cuota"];
$ClasePagoRegistrado = $clasesEstadoPagoCuota["pago"];
  
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
<div class='divCreditoPendiente $ClaseEstadoCuota' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Vencimiento</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda</td>
	 <td style='padding:0px; font-weight:bold;'>Dias atraso</td>
      
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
<div class='divCreditoPendiente $ClasePagoRegistrado' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Comprobante</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo</td>  
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
	 <td style='width:33%; font-weight:bold;'>CUOTAS VENCIDAS</td> 
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
<div class='divCreditoPendiente $ClaseEstadoCredito' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

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
      + Ver cuotas
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura</td>
	 <td style=' font-weight:bold;'>Fecha venta</td> 
	 <td style=' font-weight:bold;'>Total venta</td>
	 <td style=' font-weight:bold;'>Pagado</td>
	 <td style=' font-weight:bold;'>Condicion</td>
	 <td style=' font-weight:bold;'>Plazo</td>      
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
  <b> Detalle de venta </b>
  
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
$clasesEstadoPagoCuota = obtenerClasesEstadoPagoCuotaCredito($fechapago, $cantidad, $totalPago, $diff, $deudaActua);
$ClaseEstadoCuota = $clasesEstadoPagoCuota["cuota"];
$ClasePagoRegistrado = $clasesEstadoPagoCuota["pago"];
  
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
<div class='divCreditoPendiente $ClaseEstadoCuota' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Vencimiento</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda</td>
	 <td style='padding:0px; font-weight:bold;'>Dias atraso</td>
      
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
<div class='divCreditoPendiente $ClasePagoRegistrado' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Comprobante</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo</td>  
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
	 <td style='width:33%; font-weight:bold;'>CUOTAS VENCIDAS</td> 
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
<div class='divCreditoPendiente $ClaseEstadoCredito' style=' $ColerDeuda color: aliceblue;  border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px; margin-bottom: 5px; margin: 15px 1px;'>

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
      + Ver cuotas
    </button>
  </div>
 
  <table style=' background: #4a5568; color: #FFC107; width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>
 
    <tr  >
	<td style=' font-weight:bold; '>Factura</td>
	 <td style=' font-weight:bold;'>Fecha venta</td> 
	 <td style=' font-weight:bold;'>Total venta</td>
	 <td style=' font-weight:bold;'>Pagado</td>
	 <td style=' font-weight:bold;'>Condicion</td>
	 <td style=' font-weight:bold;'>Plazo</td>      
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
  <b> Detalle de venta </b>
  
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
$clasesEstadoPagoCuota = obtenerClasesEstadoPagoCuotaCredito($fechapago, $cantidad, $totalPago, $diff, $deudaActua);
$ClaseEstadoCuota = $clasesEstadoPagoCuota["cuota"];
$ClasePagoRegistrado = $clasesEstadoPagoCuota["pago"];
  
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
<div class='divCreditoPendiente $ClaseEstadoCuota' name='Credito_$cod_venta' style=' display:none; background: #fff; color: #413f3f; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 1px;'>

  <div style='display: flex; justify-content: flex-start;'>
     $etiquetaMora
  </div>

  <table style='width:100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background: #afb3b2;'>
 
    <tr style=' '>
	<td style='padding:0px; font-weight:bold; width:35%;'>Plazo</td>
	 <td style='padding:0px; font-weight:bold;'>Vencimiento</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Deuda</td>
	 <td style='padding:0px; font-weight:bold;'>Dias atraso</td>
      
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
<div class='divCreditoPendiente $ClasePagoRegistrado' style=' background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 5px 0px;    margin-bottom: 5px;'> 
<table style='width:100%;  '>
    <tr >
	 <td style='padding:0px; font-weight:bold; width:35%;'>Comprobante</td> 
	 <td style='padding:0px; font-weight:bold;'>Fecha</td>
	 <td style='padding:0px; font-weight:bold;'>Monto</td>
	 <td style='padding:0px; font-weight:bold;'>Cobrador</td>
	 <td style='padding:0px; font-weight:bold;'>Metodo</td>  
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
	 <td style='width:33%; font-weight:bold;'>CUOTAS VENCIDAS</td> 
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


function BuscarAbmDescripcionFotosCalificacionEntrega($buscar,$Estado,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "Select iddescripcion_foto_calificacion_entrega,descripcion,estado
        from descripcion_foto_calificacion_entrega where descripcion like ?  and estado=? order by descripcion asc ";
		
   
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar1,$Estado);

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
		  
		  
		  
		      $iddescripcion_foto_calificacion_entrega=$valor['iddescripcion_foto_calificacion_entrega'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['estado']);
		  	 
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmDescripcionFotosCalificacionEntrega(this)'>
			  <td id='td_id' style='display:none;'>".$iddescripcion_foto_calificacion_entrega."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$descripcion."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}


function buscar_referencias_comerciales_aprobar_solicitud($buscar,$formato="")
{
	$mysqli = conectar_al_servidor();


	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato)==="json";

	$sql = "SELECT telef,direccion, referencias,observacion,tipo
	FROM referenciascomercialcliente where cod_clienteFk ='$buscar'";



	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$telef = $valor['telef'];
			$direccion = $valor['direccion'];
			$referencias = $valor['referencias'];
			$observacion = $valor['observacion'];
			$tipo = $valor['tipo'];
			$cliente = isset($valor['cliente']) ? $valor['cliente'] : "";
			
			$filas[] = array(
				"cliente" => $cliente,
				"telefono" => $telef,
				"direccion" => $direccion,
				"referencia" => $referencias,
				"observacion" => $observacion,
				"tipo" => $tipo
			);
			if(!$devolverArray){

			$pagina .= "

<tr >
<td  >" . $cliente . "</td>
<td  >" . $telef . "</td>
<td  >" . $direccion . "</td>
<td  >" . $referencias . "</td>
<td  >" . $observacion . "</td>
<td  >" . $tipo . "</td>
</tr>
";
			}
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}







function BuscarDeudaActual($cod_cliente)
{
    $mysqli = conectar_al_servidor();

    $sql = " SELECT  
               (select sum(c.Monto - c.descuento) from credito c where c.cod_venta=vt.cod_venta) AS TotalCuota,
            IFNULL((SELECT SUM(p.Monto) FROM pago p WHERE p.cod_venta_fk = vt.cod_venta AND p.Tipo = 'Pago Cuota'),0) AS TotalPagado
            
        FROM venta vt  
        WHERE vt.cod_clienteFK = '".$cod_cliente."' AND TipoVenta='CREDITO'  
        AND (SELECT COUNT(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 and 

		(select sum(c.Monto - c.descuento) from credito c where c.cod_venta=vt.cod_venta)>(IFNULL((SELECT SUM(p.Monto) FROM pago p WHERE p.cod_venta_fk = vt.cod_venta AND p.Tipo = 'Pago Cuota'),0))
    ";
//  echo($sql);
//  exit;

    $stmt = $mysqli->prepare($sql); 
    $stmt->execute();

    $result = $stmt->get_result();

    $total_vendido = 0; 
    $deuda_total = 0;
 
    
while ($row = $result->fetch_assoc()) {
 
    $TotalCuota       = (float)$row['TotalCuota'];
    $TotalPagado      = (float)$row['TotalPagado']; 

    $deuda_venta = max(0, $TotalCuota - $TotalPagado);

    $total_vendido += $TotalCuota; 
    $deuda_total   += $deuda_venta;
 
}
 
    $porcentaje_deuda = "SIN REGISTRO";
    if ($total_vendido > 0) {
        $porcentaje_deuda = round(($deuda_total * 100) / $total_vendido, 0);
    }

    return $porcentaje_deuda."%" ;
}




function BuscarDeudaMensual($cod_cliente)
{
    $mysqli = conectar_al_servidor();

    $sql = " SELECT  
               (select c.Monto from credito c where c.cod_venta=vt.cod_venta and plazo!='Entrega' limit 1) AS Cuota 
            
        FROM venta vt  
        WHERE vt.cod_clienteFK = '".$cod_cliente."' AND TipoVenta='CREDITO'  
        AND (SELECT COUNT(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 and 

		(select sum(c.Monto - c.descuento) from credito c where c.cod_venta=vt.cod_venta)>(IFNULL((SELECT SUM(p.Monto) FROM pago p WHERE p.cod_venta_fk = vt.cod_venta AND p.Tipo = 'Pago Cuota'),0))
    ";
//  echo($sql);
//  exit;

    $stmt = $mysqli->prepare($sql); 
    $stmt->execute();

    $result = $stmt->get_result();

    $Contador = 0; 
    $CuotaMensual = 0;
 
	$Resultado="SIN REGISTRO";
    
while ($row = $result->fetch_assoc()) {
 
    $Cuota       = (float)$row['Cuota']; 

    $CuotaMensual += $Cuota;  

	$Resultado=$CuotaMensual;
 
}
  
    return $Resultado ;
}






function BuscarDeudaUltimaVenta($cod_cliente)
{
    $mysqli = conectar_al_servidor();

    $sql = " SELECT  
               (select sum(c.Monto - c.descuento) from credito c where c.cod_venta=vt.cod_venta) AS TotalCuota,
            IFNULL((SELECT SUM(p.Monto) FROM pago p WHERE p.cod_venta_fk = vt.cod_venta AND p.Tipo = 'Pago Cuota'),0) AS TotalPagado
           , (select sum(c.Monto - c.descuento) from credito c where c.cod_venta=vt.cod_venta) -
            IFNULL((SELECT SUM(p.Monto) FROM pago p WHERE p.cod_venta_fk = vt.cod_venta AND p.Tipo = 'Pago Cuota'),0) AS diferencia
        FROM venta vt  
        WHERE vt.cod_clienteFK = '".$cod_cliente."' AND TipoVenta='CREDITO'  
        AND (SELECT COUNT(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 and 

		(select sum(c.Monto - c.descuento) from credito c where c.cod_venta=vt.cod_venta)>
		(IFNULL((SELECT SUM(p.Monto) FROM pago p WHERE p.cod_venta_fk = vt.cod_venta AND p.Tipo = 'Pago Cuota'),0))
		order by diferencia desc limit 1 ";
//  echo($sql);
//  exit;

    $stmt = $mysqli->prepare($sql); 
    $stmt->execute();

    $result = $stmt->get_result();

    $total_vendido = 0; 
    $deuda_total = 0;
 
    $porcentaje_deuda = "SIN REGISTRO";
while ($row = $result->fetch_assoc()) {
 
    $TotalCuota       = (float)$row['TotalCuota'];
    $TotalPagado      = (float)$row['TotalPagado']; 

    $deuda_venta = max(0, $TotalCuota - $TotalPagado);

    $total_vendido += $TotalCuota; 
    $deuda_total   += $deuda_venta;
	$porcentaje_deuda = round(($deuda_total * 100) / $total_vendido, 0);
}
  
    return $porcentaje_deuda."%" ;
}

 
ObtenerDatos($operacion);

?>
