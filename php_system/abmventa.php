<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("BuscarNroFactura.php");
include("calcularintereses.php");
include("subir_foto_base64.php");
// include("calcularInteresDirecto.php");
include("classTable.php");
function verificar($operacion)
{

	$user = $_POST['useru'];
	$user = utf8_decode($user);
	$pass = $_POST['passu'];
	$pass = str_replace("=", "+", $pass);
	$navegador = $_POST['navegador'];
	$navegador = utf8_decode($navegador);
	$resp = verificar_navegador($user, $navegador, $pass);
	if ($resp != "ok") {
		$informacion = array("1" => "UI");
		echo json_encode($informacion);
		exit;
	}



	//CONTROL DE ACCESO





	if ($operacion == "nuevo" || $operacion == "editar") {


		$cod_venta = $_POST['cod_venta'];
		$cod_venta = utf8_decode($cod_venta);
		$fecha_venta = $_POST['fecha_venta'];
		$fecha_venta = utf8_decode($fecha_venta);
		$cod_usuarioFK = $_POST['cod_usuarioFK'];
		$cod_usuarioFK = utf8_decode($cod_usuarioFK);
		$cod_clienteFK = $_POST['cod_clienteFK'];
		$cod_clienteFK = utf8_decode($cod_clienteFK);
		$num_factura = $_POST['num_factura'];
		$num_factura = utf8_decode($num_factura);
		$cod_cobradorFK = $_POST['cod_cobradorFK'];
		$cod_cobradorFK = utf8_decode($cod_cobradorFK);
		$TipoVenta = $_POST['TipoVenta'];
		$TipoVenta = utf8_decode($TipoVenta);
		$TipoPago = $_POST['TipoPago'];
		$TipoPago = utf8_decode($TipoPago);
		$vendedor1 = $_POST['vendedor1'];
		$vendedor1 = utf8_decode($vendedor1);
		$vendedor2 = $_POST['vendedor2'];
		$vendedor2 = utf8_decode($vendedor2);
		$comision = $_POST['comision'];
		$comision = utf8_decode($comision);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$idGaranteFk = $_POST['idGaranteFk'];
		$idGaranteFk = utf8_decode($idGaranteFk);
		$tipo_comprobante = $_POST['tipo_comprobante'];
		$tipo_comprobante = utf8_decode($tipo_comprobante);
		$puntoexpedicion = $_POST['puntoexpedicion'];
		$puntoexpedicion = utf8_decode($puntoexpedicion);

		abm($puntoexpedicion, $tipo_comprobante, $cod_venta, $fecha_venta, $cod_usuarioFK, $cod_clienteFK, $num_factura, $cod_cobradorFK, $TipoVenta, $TipoPago, $vendedor1, $vendedor2, $comision, $cod_local, $idGaranteFk, $operacion);
	}

	if ($operacion == "historialventa") {
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$documento = $_POST['documento'];
		$documento = utf8_decode($documento);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$telefono = $_POST['telefono'];
		$telefono = utf8_decode($telefono);
		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa);
		$estadocuenta = $_POST['estadocuenta'];
		$estadocuenta = utf8_decode($estadocuenta);
		$local = $_POST['local'];
		$local = utf8_decode($local);

		$tipoComprobante = $_POST['tipoComprobante'];
		$tipoComprobante = utf8_decode($tipoComprobante);

		$estadoventamoracliente = $_POST['estadoventamoracliente'];
		$estadoventamoracliente = utf8_decode($estadoventamoracliente);

		$vendedor = $_POST['vendedor'];
		$vendedor = utf8_decode($vendedor);

		$garante = $_POST['garante'];
		$garante = utf8_decode($garante);

		$refinanciado = $_POST['refinanciado'];
		$refinanciado = utf8_decode($refinanciado);
		
		$producto = $_POST['producto'];
		$producto = utf8_decode($producto);
		$montoMinimo = isset($_POST['monto_minimo']) ? quitarseparadormiles($_POST['monto_minimo']) : 0;
		$montoMinimo = is_numeric($montoMinimo) && $montoMinimo > 0 ? (float) $montoMinimo : 0;
		$formato = isset($_POST['formato']) ? $_POST['formato'] : '';
		$formato = utf8_decode($formato);

		if ($local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$local = buscarlocaluser($user);
			}
		}
		historialventa($garante, $fecha1, $fecha2, $fechafiltro, $nroventa, $documento, $cliente, $telefono, $tipoventa, $estadocuenta, $local, $tipoComprobante, $vendedor, $estadoventamoracliente, $refinanciado,$producto,$montoMinimo,$formato,$user);
	}

if($operacion=="buscarMetasVenta")
{
	$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	buscarMetasVenta($formato);
}
	
	
if($operacion=="buscar_opciones_filtro_local_info_vendedores")
{

	buscar_opciones_filtro_local_info_vendedores();

}	


if($operacion=="insertar_foto_calificacion_entrega")
{
$idSolicitudCreditoFK=$_POST['cod_ventaFK'];
$idSolicitudCreditoFK = utf8_decode($idSolicitudCreditoFK);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$archivo=$_POST['archivo'];
$archivo = utf8_decode($archivo);
$ext=$_POST['ext'];
$ext = utf8_decode($ext);


insertar_foto_calificacion_entrega($idSolicitudCreditoFK,$ext,$archivo,$descripcion);
}


if($operacion=="buscar_opciones_filtro_seccion_info_vendedores")
{

	buscar_opciones_filtro_seccion_info_vendedores();

}	

if($operacion=="buscar_opciones_filtro_vendedor_info_vendedores")
{

	buscar_opciones_filtro_vendedor_info_vendedores();

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
	
	
 if($operacion=="buscar_abm_calificacion_entrega_contado"){
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



	
if ($operacion == "editar_metaVenta" || $operacion == "nuevo_metaVenta") {
		$credito = $_POST['credito'];
		$credito = quitarseparadormiles($credito);
		$contado = $_POST['contado'];
		$contado = quitarseparadormiles($contado);
		$fecha = $_POST['fecha'];
		$fecha = utf8_decode($fecha);
		$idAbmMetaVenta = $_POST['idAbmMetaVenta'];
		$idAbmMetaVenta = utf8_decode($idAbmMetaVenta);
		abmMetasVenta($credito, $contado,$fecha,$idAbmMetaVenta,$operacion);
	}
	
	
	
	
	if($operacion=="confirmar_venta_anulada")
{
	
	
$idVentaAnulada=$_POST['idVentaAnulada'];
$idVentaAnulada = utf8_decode($idVentaAnulada);


	confirmar_venta_anulada($idVentaAnulada,$user);

}


if($operacion=="ClienteParaInforconf")
{

$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$filtro=$_POST['filtro'];
$filtro = utf8_decode($filtro);
$zona=$_POST['zona'];
$zona = utf8_decode($zona);

$vista=$_POST['vista'];
$vista = utf8_decode($vista);

$fecha =$_POST['fecha'];
$fecha = utf8_decode($fecha);
$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";

ClienteParaInforconf($buscar,$filtro,$zona,$vista,$fecha,$formato);
}

	
	if ($operacion == "buscar_total_ventas_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		buscar_total_ventas_general($anho, $local,$tipo_venta);
	}

	if ($operacion == "buscar_total_ganancias_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		buscar_total_ganancias_general($anho, $local,$tipo_venta);
	}
	
	
	if ($operacion == "buscar_total_costo_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		buscar_total_costo_general($anho, $local,$tipo_venta);
	}
	
	if ($operacion == "buscar_total_pagado_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		buscar_total_pagado_general($anho, $local,$tipo_venta);
	}
	
	if ($operacion == "buscar_total_evaluacion_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		buscar_total_evaluacion_general($anho, $local,$tipo_venta);
	}
	
	if ($operacion == "buscar_total_ventas_general_incremental") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		buscar_total_ventas_general_incremental($anho, $local,$tipo_venta);
	}
	
	if ($operacion == "cargar_detalle_clientes_trabajados") {
		$cod_venta = $_POST['cod_venta'];
		$cod_venta = utf8_decode($cod_venta);
		$descripcion = $_POST['descripcion'];
		$descripcion = utf8_decode($descripcion);
		$estado_cliente = $_POST['estado_cliente'];
		$estado_cliente = utf8_decode($estado_cliente);
		
		
		
		cargar_detalle_clientes_trabajados($cod_venta,$descripcion,$estado_cliente);
	}
	
	if ($operacion == "buscar_grafica_venta_total_pagado_solicitud_aprobar") {
		
		$cod_cliente = $_POST['cod_cliente'];
		$cod_cliente = utf8_decode($cod_cliente);
		
		buscar_grafica_venta_total_pagado_solicitud_aprobar($cod_cliente);
	}
	
	if ($operacion == "buscar_total_ventas_general_grafica") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo_venta = $_POST['tipo_venta'];
		$tipo_venta = utf8_decode($tipo_venta);
		buscar_total_ventas_general_grafica($anho, $local,$tipo_venta);
	}
	
	if ($operacion == "buscar_total_cobros_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo = $_POST['tipo'];
		$tipo = utf8_decode($tipo);
		buscar_total_cobros_general($anho, $local,$tipo);
	}
	
	if ($operacion == "buscar_total_cobros_general_incremental") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo = $_POST['tipo'];
		$tipo = utf8_decode($tipo);
		buscar_total_cobros_general_incremental($anho, $local,$tipo);
	}
	
	if ($operacion == "buscar_total_cobros_general_grafica") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo = $_POST['tipo'];
		$tipo = utf8_decode($tipo);
		buscar_total_cobros_general_grafica($anho, $local,$tipo);
	}


	

	if ($operacion == "mashistorialventa") {
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$documento = $_POST['documento'];
		$documento = utf8_decode($documento);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$telefono = $_POST['telefono'];
		$telefono = utf8_decode($telefono);
		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa);
		$estadocuenta = $_POST['estadocuenta'];
		$estadocuenta = utf8_decode($estadocuenta);
		$local = $_POST['local'];
		$local = utf8_decode($local);
		$totalventa = $_POST['totalventa'];
		$totalventa = quitarseparadormiles($totalventa);
		$totalpagado = $_POST['totalpagado'];
		$totalpagado = quitarseparadormiles($totalpagado);
		$totalpendiente = $_POST['totalpendiente'];
		$totalpendiente = quitarseparadormiles($totalpendiente);
		$registrocargado = $_POST['registrocargado'];
		$registrocargado = utf8_decode($registrocargado);

		$tipoComprobante = $_POST['tipoComprobante'];
		$tipoComprobante = utf8_decode($tipoComprobante);

		$vendedor = $_POST['vendedor'];
		$vendedor = utf8_decode($vendedor);

		$estadoventamoracliente = $_POST['estadoventamoracliente'];
		$estadoventamoracliente = utf8_decode($estadoventamoracliente);

		$garante = $_POST['garante'];
		$garante = utf8_decode($garante);
		$refinanciado = $_POST['refinanciado'];
		$refinanciado = utf8_decode($refinanciado);
		
		$producto = $_POST['producto'];
		$producto = utf8_decode($producto);
		$montoMinimo = isset($_POST['monto_minimo']) ? quitarseparadormiles($_POST['monto_minimo']) : 0;
		$montoMinimo = is_numeric($montoMinimo) && $montoMinimo > 0 ? (float) $montoMinimo : 0;
		$formato = isset($_POST['formato']) ? $_POST['formato'] : '';
		$formato = utf8_decode($formato);

		if ($local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$local = buscarlocaluser($user);
			}
		}
		mashistorialventa($garante, $fecha1, $fecha2, $fechafiltro, $nroventa, $documento, $cliente, $telefono, $tipoventa, $estadocuenta, $local, $totalventa, $totalpagado, $totalpendiente, $registrocargado, $tipoComprobante, $vendedor, $estadoventamoracliente, $refinanciado,$producto,$montoMinimo,$formato,$user);
	}

	if ($operacion == "buscarnroventa") {
		$puntoExpedicion = $_POST['puntoExpedicion'];
		$puntoExpedicion = utf8_decode($puntoExpedicion);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$tipo_comprobante = $_POST['tipo_comprobante'];
		$tipo_comprobante = utf8_decode($tipo_comprobante);

		$datos = buscarcodNroFactura($cod_local, $puntoExpedicion);
		$num_factura = buscarnrofactura($datos[0], $datos[1]);

		if ($tipo_comprobante == "FACTURA") {
			$datos = buscarcodNroFactura($cod_local, $puntoExpedicion);
			$num_factura = buscarnrofactura($datos[0], $datos[1]);
			$codnrofactura = $datos[0];
		} else {
			$num_factura = buscarnroventab();
		}

		$informacion = array("1" => "exito", "2" => $num_factura);
		echo json_encode($informacion);
		exit;
	}

	if ($operacion == "historialvistaventa") {
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$filtro = $_POST['filtro'];
		$filtro = utf8_decode($filtro);
		historialvistaventa($buscar, $filtro);
	}
	if ($operacion == "historialvistaventa") {
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$filtro = $_POST['filtro'];
		$filtro = utf8_decode($filtro);
		historialvistaventa($buscar, $filtro);
	}

	if ($operacion == "historialvistaventadocumentos") {
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$filtro = $_POST['filtro'];
		$filtro = utf8_decode($filtro);
		historialvistaventadocumentos($buscar, $filtro);
	}

	if ($operacion == "historialvistaventadocumentoscliente") {
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$filtro = $_POST['filtro'];
		$filtro = utf8_decode($filtro);
		historialvistaventadocumentoscliente($buscar, $filtro);
	}

	if ($operacion == "vistaventainformconf") {
		$cod_clienteFK = $_POST['cod_clienteFK'];
		$cod_clienteFK = utf8_decode($cod_clienteFK);
		$cod_venta = $_POST['cod_venta'];
		$cod_venta = utf8_decode($cod_venta);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		vistaventainformconf($cod_clienteFK, $cod_venta, $formato);
	}

	if ($operacion == "marcarmoraventaestado") {
		$cod_venta = $_POST['cod_venta'];
		$cod_venta = utf8_decode($cod_venta);

		$cod_clienteFK = $_POST['cod_clienteFK'];
		$cod_clienteFK = utf8_decode($cod_clienteFK);

		$codMoraCliente = $_POST['codMoraCliente'];
		$codMoraCliente = utf8_decode($codMoraCliente);

		marcarmoraventaestado($cod_venta, $cod_clienteFK, $codMoraCliente);
	}
	if ($operacion == "buscardatosVenta") {
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		buscardatosVenta($buscar);
	}
	if ($operacion == "buscarexpedientes") {

		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		buscarexpedientes($cliente);
	}
	
	if ($operacion == "buscarexpedientesventasfinalizadas") {

		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		buscarexpedientesventasfinalizadas($cliente);
	}
	
	if ($operacion == "buscarexpedientesventaspendientes") {

		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		buscarexpedientesventaspendientes($cliente);
	}
	
	if ($operacion == "buscarclientesincativos") {

		$Local = $_POST['Local'];
		$Local = utf8_decode($Local);
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$documento = $_POST['documento'];
		$documento = utf8_decode($documento);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrotelefono = $_POST['nrotelefono'];
		$nrotelefono = utf8_decode($nrotelefono);
		$Vendedor = $_POST['Vendedor'];
		$Vendedor = utf8_decode($Vendedor);
		buscarclientesincativos($buscar, $documento, $cliente, $nrotelefono, $Vendedor, $Local);
	}
	if ($operacion == "buscarmasclientesincativos") {
		$Local = $_POST['Local'];
		$Local = utf8_decode($Local);
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$documento = $_POST['documento'];
		$documento = utf8_decode($documento);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrotelefono = $_POST['nrotelefono'];
		$nrotelefono = utf8_decode($nrotelefono);
		$registrocargado = $_POST['registrocargado'];
		$registrocargado = utf8_decode($registrocargado);
		$Vendedor = $_POST['Vendedor'];
		$Vendedor = utf8_decode($Vendedor);
		buscarmasclientesincativos($buscar, $documento, $cliente, $nrotelefono, $registrocargado, $Vendedor, $Local);
	}

	if ($operacion == "cuentasMoroso") {

		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$filtro = $_POST['filtro'];
		$filtro = utf8_decode($filtro);
		$zona = $_POST['zona'];
		$zona = utf8_decode($zona);
		$Local = $_POST['Local'];
		$Local = utf8_decode($Local);
		historialFiltroMorosos($buscar, $filtro, $zona, $Local);
	}



	if ($operacion == "buscarCuentasCanceladas") {

		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		buscarCuentasCanceladas($buscar, $formato);
	}
	
	if ($operacion == "informeDeudaCliente") {

		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$nrodoc = $_POST['nrodoc'];
		$nrodoc = utf8_decode($nrodoc);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$tipo_cliente = $_POST['tipo_cliente'];
		$tipo_cliente = utf8_decode($tipo_cliente);
		informeDeudaCliente($fecha1,$fecha2,$nroventa,$nrodoc,$cliente,$tipo_cliente);
	}
	
	
	if ($operacion == "masinformeDeudaCliente") {

		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$nrodoc = $_POST['nrodoc'];
		$nrodoc = utf8_decode($nrodoc);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$registrocargado = $_POST['registrocargado'];
		$registrocargado = utf8_decode($registrocargado);
		$tipo_cliente = $_POST['tipo_cliente'];
		$tipo_cliente = utf8_decode($tipo_cliente);
		masinformeDeudaCliente($fecha1,$fecha2,$nroventa,$nrodoc,$cliente,$registrocargado,$tipo_cliente);
	}
	
	
	if ($operacion == "buscarCuentasPendientes") {

		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		buscarCuentasPendientes($buscar, $formato);
	}
	if ($operacion == "ganaciaventa") {
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrodocumento = $_POST['nrodocumento'];
		$nrodocumento = utf8_decode($nrodocumento);
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa);
		if ($cod_local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$cod_local = buscarlocaluser($user);
			}
		}
		ganaciaventa($nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa);
	}
	if ($operacion == "masganaciaventa") {
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);

		$costoTotal = $_POST['costoTotal'];
		$costoTotal = quitarseparadormiles($costoTotal);

		$VentaTotal = $_POST['VentaTotal'];
		$VentaTotal = quitarseparadormiles($VentaTotal);

		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrodocumento = $_POST['nrodocumento'];
		$nrodocumento = utf8_decode($nrodocumento);
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa);
		$totalcostos = $_POST['totalcostos'];
		$totalcostos = quitarseparadormiles($totalcostos);
		$totalcomision = $_POST['totalcomision'];
		$totalcomision = quitarseparadormiles($totalcomision);
		$totalpagado = $_POST['totalpagado'];
		$totalpagado = quitarseparadormiles($totalpagado);
		$totalevaluacion = $_POST['totalevaluacion'];
		$totalevaluacion = quitarseparadormiles($totalevaluacion);
		$registrocargado = $_POST['registrocargado'];
		$registrocargado = utf8_decode($registrocargado);
		if ($cod_local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$cod_local = buscarlocaluser($user);
			}
		}
		masganaciaventa($costoTotal, $VentaTotal, $nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa, $totalcostos, $totalcomision, $totalpagado, $totalevaluacion, $registrocargado);
	}
	if ($operacion == "ganaciaventacalculo") {
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrodocumento = $_POST['nrodocumento'];
		$nrodocumento = utf8_decode($nrodocumento);
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa);
		ganaciaventacalculo($nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa);
	}



	if ($operacion == "buscarCambiosRealizados") {
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$nrofactura = $_POST['nrofactura'];
		$nrofactura = utf8_decode($nrofactura);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		buscarCambiosRealizados($fechafiltro, $fecha1, $fecha2, $nrofactura, $cod_local);
	}

	if ($operacion == "eliminarVenta") {
		$codventa = $_POST['codventa'];
		$codventa = utf8_decode($codventa);
		$motivo = $_POST['motivo'];
		$motivo = utf8_decode($motivo);
		$nroFactura = $_POST['nroFactura'];
		$nroFactura = utf8_decode($nroFactura);

		eliminarventa($codventa, $motivo, $nroFactura);
	}

	if ($operacion == "buscarexpedientescambios") {
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$motivo = $_POST['motivo'];
		$motivo = utf8_decode($motivo);
		buscarCambiosRealizadosExt($cliente, $motivo);
	}
	if ($operacion == "cancelarventa") {

		$montodevuelto = $_POST['montodevuelto'];
		$montodevuelto = quitarseparadormiles($montodevuelto);
		$motivo = $_POST['motivo'];
		$motivo = utf8_decode($motivo);
		$fecha = $_POST['fecha'];
		$fecha = utf8_decode($fecha);
		$cod_venta = $_POST['cod_venta'];
		$cod_venta = utf8_decode($cod_venta);
		abmcancelarventa($montodevuelto, $motivo, $fecha, $cod_venta, "nuevo", $user);
	}
	if ($operacion == "refinanciartotalventa") {

		$total = $_POST['total'];
		$total = quitarseparadormiles($total);
		$cod_ventaFK = $_POST['cod_ventaFK'];
		$cod_ventaFK = utf8_decode($cod_ventaFK);
		abmactualizarTotal($total, $cod_ventaFK);
	}
	if ($operacion == "buscarexpedientescancelados") {
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$zona = $_POST['zona'];
		$zona = utf8_decode($zona);
		buscarexpedientescancelados($cliente, $zona);
	}

	if ($operacion == "historialventacancelado") {

		$filtrofecha = $_POST['filtrofecha'];
		$filtrofecha = utf8_decode($filtrofecha);
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$codlocal = $_POST['codlocal'];
		$codlocal = utf8_decode($codlocal);
		if ($codlocal == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$codlocal = buscarlocaluser($user);
			}
		}
		historialventacancelado($filtrofecha, $fecha1, $fecha2, $nroventa, $cliente, $codlocal);
	}
	if ($operacion == "mashistorialventacancelado") {

		$filtrofecha = $_POST['filtrofecha'];
		$filtrofecha = utf8_decode($filtrofecha);
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$codlocal = $_POST['codlocal'];
		$codlocal = utf8_decode($codlocal);
		$registrocargado = $_POST['registrocargado'];
		$registrocargado = utf8_decode($registrocargado);
		if ($codlocal == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$codlocal = buscarlocaluser($user);
			}
		}
		mashistorialventacancelado($filtrofecha, $fecha1, $fecha2, $nroventa, $cliente, $codlocal, $registrocargado);
	}

	if ($operacion == "actualizarnrofactura") {

		$cod_venta = $_POST['cod_venta'];
		$cod_venta = utf8_decode($cod_venta);
		$puntoexpedicion = $_POST['puntoexpedicion'];
		$puntoexpedicion = utf8_decode($puntoexpedicion);
		$nrofactura = $_POST['nrofactura'];
		$nrofactura = utf8_decode($nrofactura);
		actualizarnrofactura($cod_venta, $puntoexpedicion, $nrofactura);
	}

	if ($operacion == "buscarproductonovendidos") {

		$codigo = $_POST['codigo'];
		$codigo = utf8_decode($codigo);
		$producto = $_POST['producto'];
		$producto = utf8_decode($producto);

		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$categoria = $_POST['categoria'];
		$categoria = utf8_decode($categoria);
		$marca = $_POST['marca'];
		$marca = utf8_decode($marca);
		$control = $_POST['control'];
		$control = utf8_decode($control);

		if ($cod_local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$cod_local = buscarlocaluser($user);
			}
		}
		buscarproductonovendidos($codigo, $producto, $cod_local, $categoria, $marca, $control);
	}



	if ($operacion == "buscarClienteFiel") {
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$local = $_POST['local'];
		$local = utf8_decode($local);
		$zona = $_POST['zona'];
		$zona = utf8_decode($zona);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$vendedor = $_POST['vendedor'];
		$vendedor = utf8_decode($vendedor);
		$condicion = $_POST['condicion'];
		$condicion = utf8_decode($condicion);

		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa);

		$diasatraso = $_POST['diasatraso'];
		$diasatraso = utf8_decode($diasatraso);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";

		buscarClienteFiel($fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $condicion, $tipoventa, $diasatraso, $formato);
		
	}
	
	
	
	
	
	
	if ($operacion == "buscarDatosDash") {

		$local = $_POST['local'];
		$local = utf8_decode($local);
		
		$tipo = $_POST['tipo'];
		$tipo = utf8_decode($tipo);

		buscarDatosDash($local,$tipo);
	}
	
	if ($operacion == "buscar_total_a_cobrar") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo ='';
		
		$cobradorFK = $_POST['cobradorFK'];
		$cobradorFK = utf8_decode($cobradorFK);
		$tipo ='';
		$array_cod_tipo_cliente_cuentas_a_cobrar = json_decode($_POST['array_cod_tipo_cliente_cuentas_a_cobrar']);
		buscar_total_a_cobrar($anho, $local,$tipo,$array_cod_tipo_cliente_cuentas_a_cobrar,$cobradorFK);
	}
	
	if ($operacion == "buscar_total_a_cobrar_incremental") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo = '';
		buscar_total_a_cobrar_incremental($anho, $local,$tipo);
	}
	
	if ($operacion == "buscar_total_a_cobrar_grafica") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['cod_localFK'];
		$local = utf8_decode($local);
		$tipo = '';
		buscar_total_a_cobrar_grafica($anho, $local,$tipo);
	}
	
 
	
	if($operacion=="solicitudAnulacionVenta")
{
$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$local=$_POST['local'];
$local = utf8_decode($local);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	solicitudAnulacionVenta($buscar,$local,$formato);

}	


if($operacion=="buscar_ventas_clientes_trabajados")
{

$fechafiltro=$_POST['fechafiltro'];
$fechafiltro = utf8_decode($fechafiltro);
$nroventa=$_POST['nroventa'];
$nroventa = utf8_decode($nroventa);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$tipoventa=$_POST['tipoventa'];
$tipoventa = utf8_decode($tipoventa);
$estadocuenta=$_POST['estadocuenta'];
$estadocuenta = utf8_decode($estadocuenta);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';


buscar_ventas_clientes_trabajados($fechafiltro, $nroventa, $cliente, $tipoventa, $estadocuenta, $cod_local,$tipo_cliente,$formato);

}


if($operacion=="abmSolicitudAnulacionVenta")
{
$Cod_UsuFK=$_POST['Cod_UsuFK'];
$Cod_UsuFK = utf8_decode($Cod_UsuFK);

$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);

$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);

$Tipo=$_POST['Tipo'];
$Tipo = utf8_decode($Tipo);

	abmSolicitudAnulacionVenta($Cod_UsuFK,$motivo,$cod_ventaFK,$Tipo);

}


if($operacion=="buscarSolicitudAnulacionVenta")
{
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	buscarSolicitudAnulacionVenta($formato);
}


if($operacion=="AprobarSolicitudAnulacionVenta")
{
$cod_aprobacion=$_POST['cod_aprobacion'];
$cod_aprobacion = utf8_decode($cod_aprobacion);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);

$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
 

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$user = $_POST['useru'];
	$user = utf8_decode($user);

	AprobarSolicitudAnulacionVenta($cod_aprobacion,$estado,$cod_venta,$motivo,$user,$tipo);

}



if($operacion=="informeSolicitudAnulacion")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);

$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$nroventa=$_POST['nroventa'];
$nroventa = utf8_decode($nroventa);

$nrodoc=$_POST['nrodoc'];
$nrodoc = utf8_decode($nrodoc);

$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$usuenvia=$_POST['usuenvia'];
$usuenvia = utf8_decode($usuenvia);

$usuacepta=$_POST['usuacepta'];
$usuacepta = utf8_decode($usuacepta);

$local=$_POST['local'];
$local = utf8_decode($local);

$estado_confirmado=$_POST['estado_confirmado'];
$estado_confirmado = utf8_decode($estado_confirmado);

$cod_vendedor=$_POST['cod_vendedor'];
$cod_vendedor = utf8_decode($cod_vendedor);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	informeSolicitudAnulacion($local,$fecha1,$fecha2,$nroventa,$nrodoc,$cliente,$fecha,$tipo,$estado,$usuenvia,$usuacepta,$estado_confirmado,$cod_vendedor,$formato);
 
}


if($operacion=="informeClientesTrabajados")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);

$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$local=$_POST['local'];
$local = utf8_decode($local);

$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);

$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);

$estado_cliente=$_POST['estado_cliente'];
$estado_cliente = utf8_decode($estado_cliente);

$cod_usuario=$_POST['cod_usuario'];
$cod_usuario = utf8_decode($cod_usuario);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';


	informeClientesTrabajados($local,$fecha1,$fecha2,$fecha,$tipo_cliente,$cliente,$estado_cliente,$cod_usuario,$formato);
 
}


if($operacion=="masinformeSolicitudAnulacion")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);

$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$nroventa=$_POST['nroventa'];
$nroventa = utf8_decode($nroventa);

$nrodoc=$_POST['nrodoc'];
$nrodoc = utf8_decode($nrodoc);

$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$usuenvia=$_POST['usuenvia'];
$usuenvia = utf8_decode($usuenvia);

$usuacepta=$_POST['usuacepta'];
$usuacepta = utf8_decode($usuacepta);

$local=$_POST['local'];
$local = utf8_decode($local);

$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);

$estado_confirmado=$_POST['estado_confirmado'];
$estado_confirmado = utf8_decode($estado_confirmado);

$cod_vendedor=$_POST['cod_vendedor'];
$cod_vendedor = utf8_decode($cod_vendedor);

$total_venta=$_POST['total_venta'];
$total_venta = quitarseparadormiles($total_venta);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	masinformeSolicitudAnulacion($local,$fecha1,$fecha2,$nroventa,$nrodoc,$cliente,$fecha,$tipo,$estado,$usuenvia,$usuacepta,$registrocargado,$estado_confirmado,$cod_vendedor,$total_venta,$formato);
 
}
 

if($operacion=="buscarInformeDetalleventas_solicitud_anulacion")
{
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
 
	buscarInformeDetalleventas_solicitud_anulacion($cod_ventaFK);

}



	if ($operacion == "VentasCompletadas") {
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrodocumento = $_POST['nrodocumento'];
		$nrodocumento = utf8_decode($nrodocumento);
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa);
		$da = $_POST['da'];
		$da = utf8_decode($da);
		$estado_callcenter = $_POST['estado_callcenter'];
		$estado_callcenter = utf8_decode($estado_callcenter);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		if ($cod_local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$cod_local = buscarlocaluser($user);
			}
		}
		VentasCompletadas($nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa,$da,$estado_callcenter,$formato);
	}
	
	
	if ($operacion == "masVentasCompletadas") {
		$nroventa = $_POST['nroventa'];
		$nroventa = utf8_decode($nroventa);
 

		$totalVenta = $_POST['totalVenta'];
		$totalVenta = quitarseparadormiles($totalVenta);

		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$cliente = $_POST['cliente'];
		$cliente = utf8_decode($cliente);
		$nrodocumento = $_POST['nrodocumento'];
		$nrodocumento = utf8_decode($nrodocumento);
		$fechafiltro = $_POST['fechafiltro'];
		$fechafiltro = utf8_decode($fechafiltro);
		$cod_local = $_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);
		$tipoventa = $_POST['tipoventa'];
		$tipoventa = utf8_decode($tipoventa); 
		$nroRegistroControlDA = $_POST['nroRegistroControlDA'];
		$nroRegistroControlDA = utf8_decode($nroRegistroControlDA); 
		$da = $_POST['da'];
		$da = utf8_decode($da);  
		$totalpagado = $_POST['totalpagado'];
		$totalpagado = quitarseparadormiles($totalpagado); 
		$registrocargado = $_POST['registrocargado'];
		$registrocargado = utf8_decode($registrocargado);
		$estado_callcenter = $_POST['estado_callcenter'];
		$estado_callcenter = utf8_decode($estado_callcenter);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		if ($cod_local == "") {
			$controllocal = controldeaccesoacasas($user, "CAMBIARLOCAL", " u.accion='SI' ");
			if ($controllocal == 0) {
				$cod_local = buscarlocaluser($user);
			}
		}
		masVentasCompletadas($totalVenta, $nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa, $totalpagado, $registrocargado,$da,$nroRegistroControlDA,$estado_callcenter,$formato);
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




}

function crearFilaVentasCompletadas($cod_clienteFK,$cod_venta,$nrof,$clientenombre,$nrodocliente,$telefonocliente,$fecha_venta,$plazo,$totalpagado,$total_venta,$DA,$TipoVenta,$nombrelocal,$estado_callcenter,$styleName)
{
	return array(
		"id_cliente" => $cod_clienteFK,
		"id_venta" => $cod_venta,
		"factura" => $nrof,
		"cliente" => $clientenombre,
		"documento" => $nrodocliente,
		"telefono" => $telefonocliente,
		"fecha_venta" => $fecha_venta,
		"plazo" => $plazo,
		"total_pagado" => number_format($totalpagado, '0', ',', '.'),
		"total_venta" => number_format($total_venta, '0', ',', '.'),
		"dias_atraso" => $DA,
		"tipo_venta" => $TipoVenta,
		"local" => $nombrelocal,
		"estado_callcenter" => $estado_callcenter,
		"clase_fila" => $styleName
	);
}

function VentasCompletadas($nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa, $da,$estado_callcenter,$formato="")
{
	$mysqli = conectar_al_servidor();
	$devolverArray = ($formato === "json");
	$filas = array();

	$totalRegistro = 0;
	$pagina = "";

	$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	if ($cod_local == "") {
		$condicionCodLocal = " ";
	}
	$condiciontipoventa = "";
	if ($tipoventa != "") {
		$condiciontipoventa = " and TipoVenta='$tipoventa'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = " and num_factura like '%" . $nroventa . "%'";
	}
	$condicionrodocumento = "";
	if ($nrodocumento != "") {
		$condicionrodocumento = " and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) = '" . $nrodocumento . "'";
	}

	$condicionfechafiltro = "";
	if ($fechafiltro != "") {
		$condicionfechafiltro = " and fecha_venta>='" . $fechafiltro . "' ";
	}
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and pg.Fecha between '" . $fecha1 . "' and  '" . $fecha2 . "'";
	}

$condicioncallcenter = "";
	if ($estado_callcenter != "") {
		$condicioncallcenter = " and IFNULL((SELECT estado from detalle_callcenterventas cv where cv.cod_clienteFK = cod_clienteFK and cv.cod_ventaFK = cod_venta LIMIT 1 ),'SIN ESTADO') =   '" . $estado_callcenter . "'";
	}


	$sql = "Select cod_venta,fecha_venta,total_venta,num_factura,puntoexpedicion,vt.TipoVenta,cod_clienteFK,
	 (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
	 (Select telefono from persona where cod_persona=cod_clienteFK) as telefonocliente,
	  (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(select count(idcredito) from credito where cod_venta = vt.cod_venta) as plazo,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
			IFNULL((SELECT estado from detalle_callcenterventas cv where cv.cod_clienteFK = cod_clienteFK and cv.cod_ventaFK = cod_venta ORDER BY iddetalle_callcenterventas DESC LIMIT 1),'SIN ESTADO') as estado_callcenter,
			IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) as totalpagado
		from venta vt inner join pago pg on cod_venta_fk=vt.cod_venta  where (total_venta - (IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) + IFNULL((select sum(cr.descuento) from credito cr  where vt.cod_venta=cr.cod_venta ),0) ) )=0 and  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 
		" . $condicioncliente . $condicionnroventa . $condicionrodocumento . $condicionfechafiltro . $condicionfecha . $condicionCodLocal . $condiciontipoventa.$condicioncallcenter. " 
		GROUP BY vt.cod_venta
		ORDER BY vt.fecha_venta DESC
		LIMIT 100";
		
		
		// echo $sql;
		// exit;
		
	$totalescosto = 0;
	$totalescomision = 0;
	$totalespagado = 0;
	$totalesevaluacion = 0;

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
		exit;
	}


	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$styleName = "tableRegistroSearch";

	$nroRegistroControlDA = 0;
	
	$TotalVenta = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
 
			$cod_venta = utf8_encode($valor['cod_venta']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$telefonocliente = $valor['telefonocliente'];
			$fecha_venta = $valor['fecha_venta'];
			$total_venta = $valor['total_venta'];
			$num_factura = utf8_encode($valor['num_factura']); 
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$TipoVenta = utf8_encode($valor['TipoVenta']);
			$plazo = utf8_encode($valor['plazo']);
			$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
			$estado_callcenter = utf8_encode($valor['estado_callcenter']);
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			 $DA=VerificarDiasAtraso($cod_venta);
			 
			 
			



if($da != ''){
	if($DA <= $da){
		
		$TotalVenta = $TotalVenta + $total_venta;
			$totalespagado = $totalespagado + $totalpagado;
			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));
		
		
	$styleName = CargarStyleTable($styleName);
			$filas[] = crearFilaVentasCompletadas($cod_clienteFK,$cod_venta,$nrof,$clientenombre,$nrodocliente,$telefonocliente,$fecha_venta,$plazo,$totalpagado,$total_venta,$DA,$TipoVenta,$nombrelocal,$estado_callcenter,$styleName);
			if(!$devolverArray){
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' name='tbregistroventacompletada' >
<td id='td_id' style='display:none'>" . $cod_clienteFK . "</td>
<td id='td_id_2' style='display:none'>" . $cod_venta . "</td>
<td id='' style='width:5%'>" . $nrof . "</td>
<td id='td_datos_1' style='width:20%'>" . $clientenombre . "</td>
<td id='' style='width:10%'>" . $nrodocliente . "</td>
<td id='td_datos_2' style='width:10%'>" . $telefonocliente . "</td>
<td  id='td_datos_3' style='width:10%'>" . $fecha_venta . "</td> 
<td  id='' style='width:5%'>" . $plazo . "</td>
<td  id='' style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_4' style='width:5%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . $DA . "</td>
<td  id='' style='width:5%'>" . $TipoVenta . "</td>
<td  id='' style='width:5%'>" . $nombrelocal . "</td>
<td  id='' style='width:10%'>" . $estado_callcenter . "</td>
</tr>
</table>";
			}

$nroRegistroControlDA++;

}
}else{
	
	$TotalVenta = $TotalVenta + $total_venta;
			$totalespagado = $totalespagado + $totalpagado;
			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));
	
	
	$styleName = CargarStyleTable($styleName);
			$filas[] = crearFilaVentasCompletadas($cod_clienteFK,$cod_venta,$nrof,$clientenombre,$nrodocliente,$telefonocliente,$fecha_venta,$plazo,$totalpagado,$total_venta,$DA,$TipoVenta,$nombrelocal,$estado_callcenter,$styleName);
			if(!$devolverArray){
						$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' name='tbregistroventacompletada' >
<td id='td_id' style='display:none'>" . $cod_clienteFK . "</td>
<td id='td_id_2' style='display:none'>" . $cod_venta . "</td>
<td id='' style='width:5%'>" . $nrof . "</td>
<td id='td_datos_1' style='width:20%'>" . $clientenombre . "</td>
<td id='' style='width:10%'>" . $nrodocliente . "</td>
<td id='td_datos_2' style='width:10%'>" . $telefonocliente . "</td>
<td  id='td_datos_3' style='width:10%'>" . $fecha_venta . "</td> 
<td  id='' style='width:5%'>" . $plazo . "</td>
<td  id='' style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_4' style='width:5%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . $DA . "</td>
<td  id='' style='width:5%'>" . $TipoVenta . "</td>
<td  id='' style='width:5%'>" . $nombrelocal . "</td>
<td  id='' style='width:10%'>" . $estado_callcenter . "</td>
</tr>
</table>";
}
			



		}
	}
	}
	
	
	
	$sql = "Select fecha_venta 
		from venta vt inner join pago pg on cod_venta_fk=vt.cod_venta  where (total_venta - (IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) + IFNULL((select sum(cr.descuento) from credito cr  where vt.cod_venta=cr.cod_venta ),0) ) )=0 and  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 
		" . $condicioncliente . $condicionnroventa . $condicionrodocumento . $condicionfechafiltro . $condicionfecha . $condicionCodLocal . $condicioncallcenter. $condiciontipoventa . " 
		GROUP BY vt.cod_venta";
		
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
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina), "3" => number_format($totalescosto, '0', ',', '.'), "4" => number_format($totalescomision, '0', ',', '.'), "5" => number_format($totalespagado, '0', ',', '.'), "6" => number_format($totalesevaluacion, '0', ',', '.'), "7" => $nroRegistro, "8" => number_format($TotalVenta, '0', ',', '.'), "99" => $nroRegistro, "100" => $totalregistro,"110"=>$nroRegistroControlDA);
	echo json_encode($informacion);
	exit;
}

function masVentasCompletadas($totalVenta, $nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa, $totalpagado, $registrocargado,$da,$nroRegistroControlDA,$estado_callcenter,$formato="")
{
	$mysqli = conectar_al_servidor();
	$devolverArray = ($formato === "json");
	$filas = array();
	
	$totalRegistro = 0;
	$pagina = "";

	$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	if ($cod_local == "") {
		$condicionCodLocal = " ";
	}
	
	if($tipoventa=="A LA VISTA"){
		$tipoventa="CREDITO";
	}
	
	$condiciontipoventa = "";
	if ($tipoventa != "") {
		$condiciontipoventa = " and TipoVenta='$tipoventa'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = " and num_factura like '%" . $nroventa . "%'";
	}
	$condicionrodocumento = "";
	if ($nrodocumento != "") {
		$condicionrodocumento = " and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) = '" . $nrodocumento . "'";
	}

	$condicionfechafiltro = "";
	if ($fechafiltro != "") {
		$condicionfechafiltro = " and fecha_venta>='" . $fechafiltro . "' ";
	}
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and pg.Fecha between '" . $fecha1 . "' and  '" . $fecha2 . "'";
	}

	$condicioncallcenter = "";
	if ($estado_callcenter != "") {
		$condicioncallcenter = " and IFNULL((SELECT estado from detalle_callcenterventas cv where cv.cod_clienteFK = cod_clienteFK and cv.cod_ventaFK = cod_venta LIMIT 1 ),'SIN ESTADO') =   '" . $estado_callcenter . "'";
	}

	$sql = "Select vt.cod_venta,fecha_venta,total_venta,num_factura,puntoexpedicion,vt.TipoVenta,cod_clienteFK,
	 (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
	 (Select telefono from persona where cod_persona=cod_clienteFK) as telefonocliente,
	  (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(select count(idcredito) from credito where cod_venta = vt.cod_venta) as plazo,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
			IFNULL((SELECT estado from detalle_callcenterventas cv where cv.cod_clienteFK = cod_clienteFK and cv.cod_ventaFK = cod_venta ORDER BY iddetalle_callcenterventas DESC LIMIT 1),'SIN ESTADO') as estado_callcenter,
			IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) as totalpagado
		from venta vt inner join pago pg on cod_venta_fk=vt.cod_venta  where (total_venta - (IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) + IFNULL((select sum(cr.descuento) from credito cr  where vt.cod_venta=cr.cod_venta ),0) ) )=0 and  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 
		" . $condicioncliente . $condicionnroventa . $condicionrodocumento . $condicionfechafiltro . $condicionfecha . $condicionCodLocal . $condiciontipoventa . $condicioncallcenter ." 
		GROUP BY vt.cod_venta
		ORDER BY vt.fecha_venta DESC
		limit " . $registrocargado . " , 50 "; 

 
	 
	$totalespagado = $totalpagado;
	 $totalesevaluacion=0;
	 $totalescomision=0;
	 $totalescosto=0;

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


			$cod_venta = $valor['cod_venta'];
			$telefonocliente = $valor['telefonocliente'];
			$fecha_venta = $valor['fecha_venta'];
			$total_venta = $valor['total_venta'];
			$num_factura = utf8_encode($valor['num_factura']); 
			$totalpagado = utf8_encode($valor['totalpagado']); 
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$TipoVenta = utf8_encode($valor['TipoVenta']);
			$plazo = utf8_encode($valor['plazo']);
			$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
			$estado_callcenter = utf8_encode($valor['estado_callcenter']);
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			 
			 $DA=VerificarDiasAtraso($cod_venta);
			

if($da != ''){
	if($DA <= $da){
		
		$totalVenta = $totalVenta + $total_venta;
			$totalespagado = $totalespagado + $totalpagado;
			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));
		
		
	$styleName = CargarStyleTable($styleName);
			$filas[] = crearFilaVentasCompletadas($cod_clienteFK,$cod_venta,$nrof,$clientenombre,$nrodocliente,$telefonocliente,$fecha_venta,$plazo,$totalpagado,$total_venta,$DA,$TipoVenta,$nombrelocal,$estado_callcenter,$styleName);
			if(!$devolverArray){
						$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' name='tbregistroventacompletada' >
<td id='td_id' style='display:none'>" . $cod_clienteFK . "</td>
<td id='td_id_2' style='display:none'>" . $cod_venta . "</td>
<td id='' style='width:5%'>" . $nrof . "</td>
<td id='td_datos_1' style='width:20%'>" . $clientenombre . "</td>
<td id='' style='width:10%'>" . $nrodocliente . "</td>
<td id='td_datos_2' style='width:10%'>" . $telefonocliente . "</td>
<td  id='td_datos_3' style='width:10%'>" . $fecha_venta . "</td> 
<td  id='' style='width:5%'>" . $plazo . "</td>
<td  id='' style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_4' style='width:5%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . $DA . "</td>
<td  id='' style='width:5%'>" . $TipoVenta . "</td>
<td  id='' style='width:5%'>" . $nombrelocal . "</td>
<td  id='' style='width:10%'>" . $estado_callcenter . "</td>
</tr>
</table>";
			}

$nroRegistroControlDA++;

}
}else{
	
	$totalVenta = $totalVenta + $total_venta;
			$totalespagado = $totalespagado + $totalpagado;
			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));
	
	
	$styleName = CargarStyleTable($styleName);
			$filas[] = crearFilaVentasCompletadas($cod_clienteFK,$cod_venta,$nrof,$clientenombre,$nrodocliente,$telefonocliente,$fecha_venta,$plazo,$totalpagado,$total_venta,$DA,$TipoVenta,$nombrelocal,$estado_callcenter,$styleName);
			if(!$devolverArray){
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' name='tbregistroventacompletada' >
<td id='td_id' style='display:none'>" . $cod_clienteFK . "</td>
<td id='td_id_2' style='display:none'>" . $cod_venta . "</td>
<td id='' style='width:5%'>" . $nrof . "</td>
<td id='td_datos_1' style='width:20%'>" . $clientenombre . "</td>
<td id='' style='width:10%'>" . $nrodocliente . "</td>
<td id='td_datos_2' style='width:10%'>" . $telefonocliente . "</td>
<td  id='td_datos_3' style='width:10%'>" . $fecha_venta . "</td> 
<td  id='' style='width:5%'>" . $plazo . "</td>
<td  id='' style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_4' style='width:5%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . $DA . "</td>
<td  id='' style='width:5%'>" . $TipoVenta . "</td>
<td  id='' style='width:5%'>" . $nombrelocal . "</td>
<td  id='' style='width:10%'>" . $estado_callcenter . "</td>
</tr>
</table>";
			}
}
			
			



		
	}
	}



	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina), "3" => number_format($totalescosto, '0', ',', '.'), "4" => number_format($totalescomision, '0', ',', '.'), "5" => number_format($totalespagado, '0', ',', '.'), "6" => number_format($totalesevaluacion, '0', ',', '.'), "8" => number_format($totalVenta, '0', ',', '.'), "7" => $nroRegistro, "99" => $nroRegistro,"110"=>$nroRegistroControlDA);
	echo json_encode($informacion);
	exit;
}





function VerificarDiasAtraso($cod_venta) {
    $mysqli = conectar_al_servidor();

    $sql = "SELECT   
		 
    GREATEST(
        DATEDIFF(IFNULL(MAX(p.Fecha),CURDATE()) , c.fechapago),
        0
    ) AS dias_atraso ,IFNULL(MAX(p.Fecha),CURDATE()) as Fecha, c.fechapago 
		
           FROM venta v
           INNER JOIN credito c ON c.cod_venta = v.cod_venta
           LEFT JOIN pago p ON p.cod_creditoFK = c.idcredito AND p.Tipo = 'Pago Cuota'
           WHERE v.cod_venta = '$cod_venta' 
            AND c.plazo != 'Entrega' GROUP BY c.idcredito order by c.fechapago  asc";
 // echo($sql);
 // exit;
 
    $stmt = $mysqli->prepare($sql); 
    $stmt->execute();
    $result = $stmt->get_result();

    $Mayordias_atraso = 0;  	
    while ($row = $result->fetch_assoc()) {		
			 
        $dias_atraso = (int)$row['dias_atraso'];
          
        if ($dias_atraso > $Mayordias_atraso) {
            $Mayordias_atraso = $dias_atraso ;  
        }
		
		 	
    }
 
    return $Mayordias_atraso;
}











function buscarInformeDetalleventas_solicitud_anulacion($cod_ventaFK)
{
	$mysqli = conectar_al_servidor();

	$sql = "select dtv.cod_productoFK,dtv.cantidad_detalle,dtv.precio_producto , nombre_producto , cod_barra ,subtotal
 from detalle_venta dtv inner join producto pr on dtv.cod_productoFK = pr.cod_producto
 where dtv.cod_ventaFK ='$cod_ventaFK' ";
	$pagina = "";
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
 $styleName="tableRegistroSearch"; 
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {



			$cod_barra = utf8_decode($valor['cod_barra']);
			$nombre_producto = utf8_decode($valor['nombre_producto']);
			$cantidad_detalle = utf8_decode($valor['cantidad_detalle']);
			$precio_producto = utf8_decode($valor['precio_producto']);
			$subtotal = utf8_decode($valor['subtotal']);
 
			$styleName=CargarStyleTable($styleName);
		  	  
				$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
				<tr id='tbSelecRegistro'   >
				<td  style='width:10%;'>".$cod_barra."</td>	
				<td  style='width:50%;'>".$nombre_producto."</td>
				<td  style='width:10%;'>".$cantidad_detalle."</td>
				<td  style='width:15%;'>".number_format($precio_producto,'0',',','.')."</td>	
				<td  style='width:15%;'>".number_format($subtotal,'0',',','.')."</td>
				</tr>
				</table> "; 
		}
	}
 
$informacion =array("1" => "exito","2" => $pagina );
echo json_encode($informacion);	
exit;	
	
}




function informeSolicitudAnulacion($local,$fecha1,$fecha2,$nroventa,$nrodoc,$cliente,$fecha,$tipo,$estado,$usuenvia,$usuacepta,$estado_confirmado,$cod_vendedor,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
 
	$condicionBetFecha="";
	 if($fecha1!="" && $fecha2!=""){
		 $condicionBetFecha=" and sa.fecha between '".$fecha1."' and '".$fecha2."'";
	 }
	 
	 $condicionnroventa="";
	 if($nroventa!=""){
		 $condicionnroventa=" and concat( puntoexpedicion,'-',num_factura) like '%".$nroventa."%' ";
	 }
	 
	 $condicionnrodoc="";
	 if($nrodoc!=""){
		 $condicionnrodoc=" and  concat( ci_cliente,' ',rut_cliente)  like '%".$nrodoc."%' ";
	 }
	 
	$condicioncliente="";
	 if($cliente!=""){
		 $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%".$cliente."%' ";
	 }
	 
	 $condicionfecha="";
	 if($fecha!=""){
		 $condicionfecha=" and sa.fecha_venta = '".$buscar."' ";
	 }
	 
	 $condiciontipo="";
	 if($tipo!=""){
		 $condiciontipo=" and sa.tipo = '".$tipo."' ";
	 }
	 
	 $condicionestado="";
	 if($estado!=""){
		 $condicionestado=" and sa.estado = '".$estado."' ";
	 }
	 
	 $condicionusuenvia="";
	 if($usuenvia!=""){
		 $condicionusuenvia=" and sa.cod_usuarioFK = '".$usuenvia."' ";
	 }
	 
	 $condicionusuacepta="";
	 if($usuacepta!=""){
		 $condicionusuacepta=" and sa.cod_usuAprobado = '".$usuacepta."' ";
	 }
	 $condicionlocal="";
	 if($local!=""){
		 $condicionlocal=" and vt.cod_local = '".$local."' ";
	 }
	 
	$condicion_confirmado = '';
	 if($estado_confirmado!=""){
		 $condicion_confirmado=" and sa.estado_confirmado = '".$estado_confirmado."' ";
	 }
	 
	 $condicion_cod_vendedor = '';
	 if($cod_vendedor!=""){
		 $condicion_cod_vendedor=" and vt.Vendedor1 = '".$cod_vendedor."' ";
	 }
	 

	  $sql= "Select  sa.fecha , upper(sa.estado) as estado ,  puntoexpedicion, fecha_venta,  sa.motivo,cod_venta,
	  total_venta ,num_factura, sa.idsolicitud_anulacion, ci_cliente  as nrodocumento,  sa.tipo,
		(Select nombre_persona from persona where cod_persona=sa.cod_usuarioFK) as usuarioSolicitud,
		(Select nombre_persona from persona where cod_persona=sa.cod_usuAprobado) as usuarioAcepta,
		(Select nombre_persona from persona where cod_persona=sa.cod_usuConfirmado) as usuarioConfirma,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		sa.estado_confirmado,
		(SELECT nombre FROM vendedor WHERE idvendedor = vt.Vendedor1) as vendedor,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal
		from venta vt inner 
		join cliente on cod_cliente=cod_ClienteFK 
		inner join solicitud_anulacion on cod_cliente=cod_ClienteFK
			inner join solicitud_anulacion sa on sa.cod_ventaFK=cod_venta 
			where sa.estado!='' ".$condicionBetFecha.$condicionnroventa.$condicionnrodoc.$condicioncliente.$condicionfecha.$condiciontipo.$condicionestado.$condicionusuenvia.$condicionusuacepta.$condicionlocal. $condicion_confirmado.$condicion_cod_vendedor." group by sa.idsolicitud_anulacion asc order by idsolicitud_anulacion asc limit 50 ";
 
 

   $stmt = $mysqli->prepare($sql);
 
// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

if ($stmt === false) {
    die("Error en la preparación de la declaración: " . $mysqli->error);
}

if (! $stmt->execute()) {
    echo "Error en la ejecución de la declaración: " . $stmt->error;
    exit;
} 


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch"; 
 $total_Venta = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
			  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']); 
		  	  $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
		  	  $fecha_venta=utf8_encode($valor['fecha_venta']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $total_venta=utf8_encode($valor['total_venta']);
		  	  $num_factura=utf8_encode($valor['num_factura']);
			  $idsolicitud_anulacion=utf8_encode($valor['idsolicitud_anulacion']);
			  $nrodocumento=utf8_encode($valor['nrodocumento']);
		  	  $tipo=utf8_encode($valor['tipo']); 
			  $usuarioSolicitud=utf8_encode($valor['usuarioSolicitud']);
			  $usuarioConfirma=utf8_encode($valor['usuarioConfirma']);
			  $usuarioAcepta=utf8_encode($valor['usuarioAcepta']);
			  $clientenombre=utf8_encode($valor['clientenombre']);
			  $nombrelocal=utf8_encode($valor['nombrelocal']);
			  $estado_confirmado=utf8_encode($valor['estado_confirmado']);
			  $vendedor=utf8_encode($valor['vendedor']);
			  $cod_venta=utf8_encode($valor['cod_venta']);
			  
		 if($estado=="APROBAR"){$estado="APROBADO";}
		 if($estado=="RECHAZAR"){$estado="RECHAZADO";}
 
				if($puntoexpedicion!=""){
					$nrof=$puntoexpedicion."-".$num_factura;
				}else{
					$nrof=$num_factura;
				} 
				
				$styleconfirmado = '';
				if($estado_confirmado == 'CONFIRMADO'){
					$styleconfirmado = 'background-color:green;color:white';
				}
 
		
$verObs = '';
if($motivo !=''){
	$motivo = str_replace(["\r", "\n"], " ", $motivo);
	$obsEscapado =  addslashes($motivo) ; // Escapa las comillas
	$verObs = "<input type=\"button\" value=\"OBS\" style=\"width:50px;background-color:#ff5733\" class=\"btn4\" onclick=\"verObservacionIngresoEgresoCobrador('$obsEscapado','$cod_venta')\" />";
}
				
				$total_Venta += $total_venta;
				  $styleName=CargarStyleTable($styleName);
				  $filas[]=array(
					  'id_solicitud'=>$idsolicitud_anulacion,
					  'cod_venta'=>$cod_venta,
					  'documento'=>$nrodocumento,
					  'cliente'=>$clientenombre,
					  'factura'=>$nrof,
					  'fecha_venta'=>$fecha_venta,
					  'total_venta_formateado'=>number_format($total_venta,'0',',','.'),
					  'motivo'=>$motivo,
					  'tipo'=>$tipo,
					  'estado'=>$estado,
					  'fecha_solicitud'=>$fecha,
					  'usuario_solicitud'=>$usuarioSolicitud,
					  'usuario_acepta'=>$usuarioAcepta,
					  'vendedor'=>$vendedor,
					  'usuario_confirma'=>$usuarioConfirma,
					  'estado_confirmado'=>$estado_confirmado,
					  'clase_fila'=>$styleName
				  );
		  	  
				$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
				<tr id='tbSelecRegistro' style='$styleconfirmado' onclick='obtenerdatosinformeventasanuladas(this)'  >
				<td  style='width:5%;'>".$nrodocumento."</td>	
				<td  style='width:15%;'>".$clientenombre."</td>
				<td  style='width:5%;'>".$nrof."</td>
				<td  style='width:10%;'>".$fecha_venta."</td>	
				<td  style='width:10%;'>".number_format($total_venta,'0',',','.')."</td>
				<td  style='width:5%;'>".$verObs."</td>
				<td  style='width:5%;'>".$tipo."</td>
				<td  style='width:5%;'>".$estado."</td>
				<td  style='width:5%;'>".$fecha."</td>
				<td  style='width:5%;'>".$usuarioSolicitud."</td>
				<td  style='width:5%;'>".$usuarioAcepta."</td>
				<td  style='width:5%;'>".$vendedor."</td>
				<td  style='width:5%;'>".$usuarioConfirma."</td>
				<td id='td_datos_1' style='width:5%;'>".$estado_confirmado."</td>
				<td id='td_id' style='display:none'>".$idsolicitud_anulacion."</td>
				</tr>
				</table> "; 
	  }
 }
 
 
$sql= "Select  sa.fecha
		from venta vt inner 
		join cliente on cod_cliente=cod_ClienteFK 
		inner join solicitud_anulacion on cod_cliente=cod_ClienteFK
			inner join solicitud_anulacion sa on sa.cod_ventaFK=cod_venta 
			where sa.estado!='' ".$condicionBetFecha.$condicionnroventa.$condicionnrodoc.$condicioncliente.$condicionfecha.$condiciontipo.$condicionestado.$condicionusuenvia.$condicionusuacepta.$condicionlocal.$condicion_confirmado.$condicion_cod_vendedor." group by sa.idsolicitud_anulacion"; 


			
  $stmt = $mysqli->prepare($sql); 
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;

// echo $totalregistro;
// exit;

$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro,"4" => number_format($valor,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistro,"5"=>number_format($total_Venta,'0',',','.'));
echo json_encode($informacion);	
exit;
}
 

function masinformeSolicitudAnulacion($local,$fecha1,$fecha2,$nroventa,$nrodoc,$cliente,$fecha,$tipo,$estado,$usuenvia,$usuacepta,$registrocargado,$estado_confirmado,$cod_vendedor,$total_venta,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
 
	$condicionBetFecha="";
	 if($fecha1!="" && $fecha2!=""){
		 $condicionBetFecha=" and sa.fecha between '".$fecha1."' and '".$fecha2."'";
	 }
	 
	 $condicionnroventa="";
	 if($nroventa!=""){
		 $condicionnroventa=" and concat( puntoexpedicion,'-',num_factura) like '%".$nroventa."%' ";
	 }
	 
	 $condicionnrodoc="";
	 if($nrodoc!=""){
		 $condicionnrodoc=" and  concat( ci_cliente,' ',rut_cliente)  like '%".$nrodoc."%' ";
	 }
	 
	 $condicioncliente="";
	 if($cliente!=""){
		 $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%".$cliente."%' ";
	 }
	 
	 $condicionfecha="";
	 if($fecha!=""){
		 $condicionfecha=" and sa.fecha = '".$buscar."' ";
	 }
	 
	 $condiciontipo="";
	 if($tipo!=""){
		 $condiciontipo=" and sa.tipo  = '".$tipo."' ";
	 }
	 
	 $condicionestado="";
	 if($estado!=""){
		 $condicionestado=" and sa.estado = '".$estado."' ";
	 }
	 
	 $condicionusuenvia="";
	 if($usuenvia!=""){
		 $condicionusuenvia=" and sa.cod_usuarioFK = '".$usuenvia."' ";
	 }
	 
	 $condicionusuacepta="";
	 if($usuacepta!=""){
		 $condicionusuacepta=" and sa.cod_usuAprobado = '".$usuacepta."' ";
	 }
	 $condicionlocal="";
	 if($local!=""){
		 $condicionlocal=" and vt.cod_local = '".$local."' ";
	 }
	 
	$condicion_confirmado = '';
	 if($estado_confirmado!=""){
		 $condicion_confirmado=" and sa.estado_confirmado = '".$estado_confirmado."' ";
	 }



	$condicion_cod_vendedor = '';
	 if($cod_vendedor!=""){
		 $condicion_cod_vendedor=" and vt.Vendedor1 = '".$cod_vendedor."' ";
	 }
	 

	  $sql= "Select  sa.fecha , upper(sa.estado) as estado ,  puntoexpedicion, fecha_venta,  sa.motivo,
	  total_venta ,num_factura, sa.idsolicitud_anulacion, ci_cliente  as nrodocumento,  sa.tipo,
		(Select nombre_persona from persona where cod_persona=sa.cod_usuarioFK) as usuarioSolicitud,
		(Select nombre_persona from persona where cod_persona=sa.cod_usuAprobado) as usuarioAcepta,
		(Select nombre_persona from persona where cod_persona=sa.cod_usuConfirmado) as usuarioConfirma,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre, 	
		sa.estado_confirmado,
		(SELECT nombre FROM vendedor WHERE idvendedor = vt.Vendedor1) as vendedor,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal
		from venta vt inner 
		join cliente on cod_cliente=cod_ClienteFK 
		inner join solicitud_anulacion on cod_cliente=cod_ClienteFK
			inner join solicitud_anulacion sa on sa.cod_ventaFK=cod_venta 
			where sa.estado!='' ".$condicionBetFecha.$condicionnroventa.$condicionnrodoc.$condicioncliente.$condicionfecha.$condiciontipo.$condicionestado.$condicionusuenvia.$condicionusuacepta.$condicionlocal.$condicion_confirmado.$condicion_cod_vendedor." group by sa.idsolicitud_anulacion asc order by idsolicitud_anulacion asc limit ".$registrocargado.", 50 ";
 
 
 // echo $sql;
 // exit;
 
   $stmt = $mysqli->prepare($sql);
 
// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

if ($stmt === false) {
    die("Error en la preparación de la declaración: " . $mysqli->error);
}

if (! $stmt->execute()) {
    echo "Error en la ejecución de la declaración: " . $stmt->error;
    exit;
} 


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor + $registrocargado;
 $styleName="tableRegistroSearch"; 
 $total_Venta = $total_venta;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
			    $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']); 
		  	  $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
		  	  $fecha_venta=utf8_encode($valor['fecha_venta']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $total_venta=utf8_encode($valor['total_venta']);
		  	  $num_factura=utf8_encode($valor['num_factura']);
			  $idsolicitud_anulacion=utf8_encode($valor['idsolicitud_anulacion']);
			  $nrodocumento=utf8_encode($valor['nrodocumento']);
		  	  $tipo=utf8_encode($valor['tipo']); 
			  $usuarioSolicitud=utf8_encode($valor['usuarioSolicitud']);
			  $usuarioConfirma=utf8_encode($valor['usuarioConfirma']);
			  $usuarioAcepta=utf8_encode($valor['usuarioAcepta']);
			  $clientenombre=utf8_encode($valor['clientenombre']);
			  $nombrelocal=utf8_encode($valor['nombrelocal']);
			  $estado_confirmado=utf8_encode($valor['estado_confirmado']);
			  $vendedor=utf8_encode($valor['vendedor']);
			  
		 

				if($puntoexpedicion != ''){
					$nrof=$puntoexpedicion."-".$num_factura;
				}else{
					$nrof=$num_factura;
				}
				
				$styleconfirmado = '';
				if($estado_confirmado == 'CONFIRMADO'){
					$styleconfirmado = 'background-color:green;color:white';
				}
				
$verObs = '';
if($motivo !=''){
	$obsEscapado = addslashes($motivo); 
	$verObs = "<input type=\"button\" value=\"OBS\" style=\"width:50px;background-color:#ff5733\" class=\"btn4\" onclick=\"verObservacionIngresoEgresoCobrador('$obsEscapado')\" />";
}
				
				$total_Venta += $total_venta;
				  $styleName=CargarStyleTable($styleName);
				  $filas[]=array(
					  'id_solicitud'=>$idsolicitud_anulacion,
					  'cod_venta'=>'',
					  'documento'=>$nrodocumento,
					  'cliente'=>$clientenombre,
					  'factura'=>$nrof,
					  'fecha_venta'=>$fecha_venta,
					  'total_venta_formateado'=>number_format($total_venta,'0',',','.'),
					  'motivo'=>$motivo,
					  'tipo'=>$tipo,
					  'estado'=>$estado,
					  'fecha_solicitud'=>$fecha,
					  'usuario_solicitud'=>$usuarioSolicitud,
					  'usuario_acepta'=>$usuarioAcepta,
					  'vendedor'=>$vendedor,
					  'usuario_confirma'=>$usuarioConfirma,
					  'estado_confirmado'=>$estado_confirmado,
					  'clase_fila'=>$styleName
				  );
		  	  
				$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
				<tr id='tbSelecRegistro' style='$styleconfirmado' onclick='obtenerdatosinformeventasanuladas(this)'  >
				<td  style='width:5%;'>".$nrodocumento."</td>	
				<td  style='width:15%;'>".$clientenombre."</td>
				<td  style='width:5%;'>".$nrof."</td>
				<td  style='width:10%;'>".$fecha_venta."</td>	
				<td  style='width:10%;'>".number_format($total_venta,'0',',','.')."</td>
				<td  style='width:5%;'>".$verObs."</td>
				<td  style='width:5%;'>".$tipo."</td>
				<td  style='width:5%;'>".$estado."</td>
				<td  style='width:5%;'>".$fecha."</td>
				<td  style='width:5%;'>".$usuarioSolicitud."</td>
				<td  style='width:5%;'>".$usuarioAcepta."</td>
				<td  style='width:5%;'>".$vendedor."</td>
				<td  style='width:5%;'>".$usuarioConfirma."</td>
				<td id='td_datos_1' style='width:5%;'>".$estado_confirmado."</td>
				<td id='td_id' style='display:none'>".$idsolicitud_anulacion."</td>
				</tr>
				</table> "; 
	  }
 }
 
 

$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro,"4" => number_format($valor,'0',',','.'),"99"=>$nroRegistro,"5"=>number_format($total_Venta,'0',',','.'));
echo json_encode($informacion);	
exit;
}
 

function buscar_opciones_filtro_local_info_vendedores()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "SELECT cod_local,Nombre FROM local WHERE estado = 'Activo' order by Nombre asc";
		
 
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 $arrayCat = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cod_local=utf8_encode($valor['cod_local']);
			  $Nombre=utf8_encode($valor['Nombre']);
		  	 
			 $check = "<input type='checkbox' id='$cod_local' name='check_filtro_local_info_vendedores' onclick='obteneridfiltroLocalInfoVendedores(this)' checked />";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$Nombre."</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
			 array_push($arrayCat,$cod_local);
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta,"4" => $arrayCat);
echo json_encode($informacion);	
exit;
}

function buscar_opciones_filtro_seccion_info_vendedores()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select * from sector_vendedor where estado='Activo' order by descripcion asc";
		
 
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

 $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $arrayCat = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $descripcion=utf8_encode($valor['descripcion']);
		  	 
			 $check = "<input type='checkbox' id='$descripcion' name='check_filtro_seccion_info_vendedores' onclick='obteneridfiltroSeccionInfoVendedores(this)' checked />";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$descripcion."</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
			 array_push($arrayCat,$descripcion);
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta,"4" => $arrayCat);
echo json_encode($informacion);	
exit;
}

function buscar_opciones_filtro_vendedor_info_vendedores()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select * from vendedor where estado='Activo' order by nombre asc";
		
 
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

 $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $arrayCat = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $nombre=utf8_encode($valor['nombre']);
		      $idvendedor=utf8_encode($valor['idvendedor']);
		  	 
			 $check = "<input type='checkbox' id='$idvendedor' name='check_filtro_vendedor_info_vendedores' onclick='obteneridfiltroVendedorInfoVendedores(this)' checked />";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$nombre."</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
			 array_push($arrayCat,$idvendedor);
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta,"4" => $arrayCat);
echo json_encode($informacion);	
exit;
}




function AprobarSolicitudAnulacionVenta($cod_aprobacion,$estado,$cod_venta,$motivo,$cod_UsuarioFK,$tipo)
{

$mysqli=conectar_al_servidor(); 

	$user = $_POST['useru'];
	$user = utf8_decode($user);
 
$consulta1="update solicitud_anulacion  set  estado='$estado' , cod_usuAprobado='".$user."' where idsolicitud_anulacion='$cod_aprobacion' ";
$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

if($estado=="APROBAR" && $tipo=="ANULAR"){
	
	$fechaHoy = date('Y-m-d');
	abmcancelarventaSolicitud(0,$motivo,$fechaHoy,$cod_venta,"nuevo",$cod_UsuarioFK);
}

if($estado=="APROBAR" && $tipo!="ANULAR"){
	
	EditarTipoMoraClienteVenta($cod_venta,$tipo);
}
 
 mysqli_close($mysqli); 
$informacion =array("1" => "exito" );
echo json_encode($informacion);	
exit;
	
}


function EditarTipoMoraClienteVenta($cod_venta,$Tipo)
{ 
$mysqli=conectar_al_servidor();

if($Tipo=="FALLECIDO"){$Tipo="12";


$consulta1="update cliente set  tipo_estado='".$Tipo."'   where cod_cliente= (select cod_clienteFK from venta where cod_venta='".$cod_venta."' limit 1) ";
 
$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

}
if($Tipo=="RECUPERADO"){$Tipo="13";}

if($Tipo=="JUDICIALIZADO"){$Tipo="14";


$consulta1="update cliente set  tipo_estado='".$Tipo."'   where cod_cliente= (select cod_clienteFK from venta where cod_venta='".$cod_venta."' limit 1) ";
 
$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

}
 
$consulta1="update venta set  codmoracliente='".$Tipo."' where cod_venta='".$cod_venta."'";

// echo($consulta1);
// exit;
$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 
  mysqli_close($mysqli); 
 
	
}
 



function abmcancelarventaSolicitud($montodevuelto,$motivo,$fecha,$cod_venta,$operacion,$cod_usuario)
{ 
$mysqli=conectar_al_servidor(); 




$consulta= "Select count(*) from cancelaciones where cod_venta=?   ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $cod_venta); 
 
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


 
$consulta1="Insert into cancelaciones (montodevuelto,motivo,fecha,cod_venta,cod_usuario)
values('$montodevuelto','$motivo','$fecha','$cod_venta','$cod_usuario')";
 
$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 buscardetalleventacancelaciones($cod_venta);
  mysqli_close($mysqli); 
 
	
}
 


function buscarSolicitudAnulacionVenta($formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $pag2="";
	
	  $sql= "Select puntoexpedicion, fecha_venta,total_venta ,num_factura, sa.idsolicitud_anulacion,		 
		(Select nombre_persona from persona where cod_persona=vt.cod_usuarioFK) as usuarioVenta,
		(Select nombre_persona from persona where cod_persona=sa.cod_usuarioFK) as usuarioSolicitud,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre, 
		 ci_cliente  as nrodocumento, cod_venta, sa.motivo, sa.tipo,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal
		from venta vt inner join cliente on cod_cliente=cod_ClienteFK 
		inner join solicitud_anulacion on cod_cliente=cod_ClienteFK
			inner join solicitud_anulacion sa on sa.cod_ventaFK=cod_venta 
			where IFNULL((Select count(fecha) from cancelaciones c where c.cod_venta=vt.cod_venta limit 1),0)=0 and  sa.estado='Pendiente'   group by sa.idsolicitud_anulacion asc order by fecha_venta ";
		

   
   $stmt = $mysqli->prepare($sql);
   
   $Style="background: none 0px 0px repeat scroll #2196f3;
   border: 2px solid #ffffff;
   border-radius: 6px;
   cursor: pointer;
   margin-top:2px;
   ";



// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

if ($stmt === false) {
    die("Error en la preparación de la declaración: " . $mysqli->error);
}

if (! $stmt->execute()) {
    echo "Error en la ejecución de la declaración: " . $stmt->error;
    exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
			  $fecha_venta=$valor['fecha_venta'];
		  	  $total_venta=$valor['total_venta']; 
		  	  $num_factura=utf8_encode($valor['num_factura']); 
		  	  $usuarioVenta=utf8_encode($valor['usuarioVenta']);
		  	  $usuarioSolicitud=utf8_encode($valor['usuarioSolicitud']);
		  	  $clientenombre=utf8_encode($valor['clientenombre']);
		  	  $cod_venta=utf8_encode($valor['cod_venta']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
			  $nrodocumento=utf8_encode($valor['nrodocumento']);
			  $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
			  $idsolicitud_anulacion=utf8_encode($valor['idsolicitud_anulacion']);
			  $motivo=utf8_encode($valor['motivo']);
			  $tipo=utf8_encode($valor['tipo']);

			  
			  
				if($puntoexpedicion!=""){
					$nrof=$puntoexpedicion."-".$num_factura;
				}else{
					$nrof=$num_factura;
				}
				$filas[]=array(
					'id_solicitud'=>$idsolicitud_anulacion,
					'cod_venta'=>$cod_venta,
					'cliente'=>$clientenombre,
					'usuario_venta'=>$usuarioVenta,
					'tipo'=>$tipo,
					'factura'=>$nrof,
					'total_venta_formateado'=>number_format($total_venta,'0',',','.'),
					'fecha_venta'=>$fecha_venta,
					'local'=>$nombrelocal,
					'documento'=>$nrodocumento,
					'usuario_solicitud'=>$usuarioSolicitud,
					'motivo'=>$motivo
				);
		  	 
				  $styleName=CargarStyleTable($styleName);
		  	 
				
				$pagina.="<div id='divSolicitudAnulacionVenta_$idsolicitud_anulacion'>
				<table style='width:100%;' >
				<tr id='tbSelecRegistro' onclick='obtenerdatosSolicitudAnulacionVenta(this)'>
				<td  id='td_datos_1' style='width:50%;'>".$clientenombre."</td>				
				<td  id='td_datos_2' style='width:25%;'>".$usuarioVenta."</td>				
				<td  id='td_datos_2' style='width:20%;'>".$tipo."</td>				
				<td  id='td_datos_3' style='display:none'>".$nrof."</td>
				<td  id='td_datos_4' style='display:none'>".number_format($total_venta,'0',',','.')."</td>
				<td  id='td_datos_5' style='display:none'>".$fecha_venta."</td>
				<td  id='td_datos_6' style='display:none'>".$cod_venta."</td>
				<td  id='td_datos_7' style='display:none'>".$nombrelocal."</td>
				<td  id='td_datos_8' style='display:none'>".$nrodocumento."</td>
				<td  id='td_datos_9' style='display:none'>".$idsolicitud_anulacion."</td>
				<td  id='td_datos_10' style='display:none'>".$usuarioSolicitud."</td>
				<td  id='td_datos_11' style='display:none'>".$motivo."</td>
				<td  id='td_datos_12' style='display:none'>".$tipo."</td>
				<td style='width:5%'>
				<span class='status completed' >VER</span> 				
				</td>
								
				</tr>
				</table>
				</div>";
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}
 
function abmSolicitudAnulacionVenta($Cod_UsuFK,$motivo,$cod_ventaFK,$Tipo)
{

$mysqli=conectar_al_servidor(); 

 
$consulta1="Insert into solicitud_anulacion ( fecha, motivo, cod_ventaFK, cod_usuarioFK, estado ,tipo) values (now(),'$motivo',$cod_ventaFK,$Cod_UsuFK,'Pendiente','$Tipo')";
$stmt1 = $mysqli->prepare($consulta1);

 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 
 mysqli_close($mysqli); 
$informacion =array("1" => "exito" );
echo json_encode($informacion);	
exit;
	
}
 
function solicitudAnulacionVenta($buscar,$local,$formato=''){
	$mysqli=conectar_al_servidor();

	 $totalRegistro=0;
	 $pagina="";
	 $filas=array();
	 $condicionbuscar="";
	 if($buscar!=""){
		 $condicionbuscar=" and concat( nombre_persona,' ',apellido_persona,' ',ci_cliente,' ',rut_cliente,' ',telefono,' ',num_factura  ) like '%".$buscar."%' ";
	 }
	  
	 $condicionlocal="";
	  if($local!=""){
		 $condicionlocal=" and vt.cod_local = '".$local."' ";
	 }
	 
	  $sql= "Select puntoexpedicion,tipo_comprobante,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocumento,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		IFNULL((select sum(dtv.descuento) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK),0) as totaldescuentodetalles,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk and Tipo='Pago Cuota'),0) as pagado,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt inner join cliente on cod_cliente=cod_ClienteFK
			inner join persona on cod_cliente=cod_persona  
			where IFNULL((Select count(fecha) from cancelaciones c where c.cod_venta=vt.cod_venta limit 1),0)=0 and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk and Tipo='Pago Cuota'),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))<total_venta and IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0)!='0' and 
			(Select count(*) from credito c where c.cod_venta=vt.cod_venta )>0 ".$condicionbuscar.$condicionlocal." order by fecha_venta desc limit 100 ";
		 
   
   $stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $TotalVentas= 0;
 $TotalPagos= 0;
 $TotalDeuda= 0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $fecha_venta=$valor['fecha_venta'];
		  	  $total_venta=$valor['total_venta'];
		  	  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
		  	  $cod_clienteFK=utf8_encode($valor['cod_clienteFK']);
		  	  $num_factura=utf8_encode($valor['num_factura']);
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
		  	  $TipoVenta=utf8_encode($valor['TipoVenta']);
		  	  $TipoPago=utf8_encode($valor['TipoPago']);
		  	  $Vendedor1=utf8_encode($valor['Vendedor1']);
		  	  $Vendedor2=utf8_encode($valor['Vendedor2']);
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $clientenombre=utf8_encode($valor['clientenombre']);
		  	  $cod_venta=utf8_encode($valor['cod_venta']);
		  	  $cobradornombre=utf8_encode($valor['cobradornombre']);
		  	   $nombrevendedor1=utf8_encode($valor['nombrevendedor1']);
		  	  $nombrevendedor2=utf8_encode($valor['nombrevendedor2']);
		  	  $cantidadcuota=utf8_encode($valor['cantidadcuota']);
		  	  $Monto=utf8_encode($valor['Monto']);
		  	  $fechaprimerpago=utf8_encode($valor['fechaprimerpago']);
		  	  $comision=utf8_encode($valor['comision']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	  $pago=utf8_encode($valor['pago']);
		  	  $nrodetalle=($valor['nrodetalle']);
			  $totalpagado=utf8_encode($valor['totalpagado']);
			  $nroCouta=utf8_encode($valor['nroCouta']);
			  $totaldescuentodetalles=utf8_encode($valor['totaldescuentodetalles']);
			  $totaldescuento=utf8_encode($valor['totaldescuento']);
			  $totaldescuentoaplicados=$totaldescuentodetalles+$totaldescuento;
			  $idGaranteFk=utf8_encode($valor['idGaranteFk']);
			  $Garante=utf8_encode($valor['Garante']);
			  $nrodocumento=utf8_encode($valor['nrodocumento']);
			  $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
			  $tipo_comprobante=utf8_encode($valor['tipo_comprobante']);
			  $totalventadetalle=utf8_encode($valor['totalventadetalle']);
			  $accesocredito=utf8_encode($valor['accesocredito']);
			  $pagado=utf8_encode($valor['pagado']);
			  $totalpagado=$totalpagado+$pago;
				if($puntoexpedicion!=""){
					$nrof=$puntoexpedicion."-".$num_factura;
				}else{
					$nrof=$num_factura;
				}

$Accion="<input type='Button'  value='Solicitar Anulación' class='btn4' id='$cod_venta'  style='background-color: #f44336;width:100%;'  />";

$subtotal=$totalventadetalle;
 $totalventadetalle= $totalventadetalle+$totaldescuentoaplicados;
 $styleName=CargarStyleTable($styleName);
			  $filas[]=array(
				  'cod_venta'=>$cod_venta,
				  'factura'=>$nrof,
				  'fecha_venta'=>$fecha_venta,
				  'numero_factura'=>$num_factura,
				  'tipo_venta'=>$TipoVenta,
				  'cliente'=>$clientenombre,
				  'documento'=>$nrodocumento,
				  'total_venta_formateado'=>number_format($totalventadetalle,'0',',','.'),
				  'descuento_formateado'=>number_format($totaldescuentoaplicados,'0',',','.'),
				  'subtotal_formateado'=>number_format($subtotal,'0',',','.'),
				  'pagado_formateado'=>number_format($pagado,'0',',','.'),
				  'local'=>$nombrelocal,
				  'usuario'=>$usuarionombre,
				  'clase_fila'=>$styleName
			  );
		  	 	  	   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' data-name='$cod_venta' onclick='verCerrarDetalleSolicitudAnulacion(this)' >
<td id='td_datos_35' style='width:12%'>".$nrof."</td>
<td  id='td_datos_1' style='width:8%'>".$fecha_venta."</td>
<td id='td_datos_13' style='display:none'>".$num_factura."</td>
<td id='td_datos_12' style='width:8%'>".$TipoVenta."</td>
<td  id='td_datos_2' style='width:22%'>".$clientenombre."</td>
<td  id='td_datos_38' style='width:8%'>".$nrodocumento."</td>
<td  id='td_datos_39' style='width:8%'>".number_format($totalventadetalle,'0',',','.') ."</td>
<td  id='' style='width:8%'>".number_format($totaldescuentoaplicados,'0',',','.') ."</td>
<td  id='' style='width:8%'>".number_format($subtotal,'0',',','.') ."</td>
<td  id='' style='width:8%'>".number_format($pagado,'0',',','.') ."</td>
<td  id='' style='width:10%'>".$Accion ."</td>
<td  id='td_datos_36' style='display:none'>".$nombrelocal ."</td>
<td  id='td_datos_37' style='display:none'>".$usuarionombre ."</td>
</tr>
</table>";
 
	  }
 }
 
  mysqli_close($mysqli); 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro,"4" => number_format($TotalVentas,'0',',','.'),"5" => number_format($TotalPagos,'0',',','.'),"6" => number_format($TotalDeuda,'0',',','.'));
echo json_encode($informacion);	
exit;
}





function buscarDatosDash($local,$tipo)
{
	$mysqli = conectar_al_servidor();
 
	$TotalPedidos = 0;
 

	$fechahoy = date('Y-m');
	
	$fechaAnterior = $fechahoy;

// Crear un objeto DateTime a partir de la fecha
$date = new DateTime($fechahoy);

// Restar un mes
$date->modify('-1 month');

// Formatear la fecha al formato 'YYYY-MM-DD' después de restar el mes
$fechaAnterior = $date->format('Y-m');
 
	 ////////////////////////////////////////////////sentencia de venta
	 
	 $condicionFecha = " and DATE_FORMAT(vt.fecha_venta, '%Y-%m')= '$fechahoy' ";
	 
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and  cod_local ='" . $local . "'";
	}
	
	$condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  TipoVenta ='" . $tipo . "'";
	}
 
 
	$sql = "Select ifnull(sum(total_venta),0) as totalVenta from venta vt where IFNULL((Select count(fecha) from cancelaciones c where c.cod_venta=vt.cod_venta limit 1),0)=0 and (select estado from local l where l.cod_local=vt.cod_local)='Activo'  ".$condicionFecha.$condicionlocal.$condiciontipo;
	
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
	$TotalVentas=0;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalVentas = $valor['totalVenta'];
		}
	}

////////////////////////////////////////////////sentencia de pagos

 
 
	$condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and vt.cod_local  ='".$local."'";		
	 }
	 
	 $condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
 
 
	$sql = "Select  ifnull(sum(Monto),0)  as TotalPagos from  pago inner join venta vt on cod_venta=cod_venta_fk 
 where DATE_FORMAT(Fecha, '%Y-%m')= '$fechahoy' and Monto>'0'    ".$condicionlocal.$condiciontipo;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$TotalPagos=0;
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalPagos = $valor['TotalPagos'];
		}
	}
	
 
	 ////////////////////////////////////////////////sentencia de venta Anterior
	 
	 $condicionFecha = " and DATE_FORMAT( vt.fecha_venta , '%Y-%m')= '$fechaAnterior' ";
	 
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and  cod_local ='" . $local . "'";
	}
	
	
	 $condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
	
 
	$sql = "Select ifnull(sum(total_venta),0) as TotalVentasAnterior from venta vt where IFNULL((Select count(fecha) from cancelaciones c where c.cod_venta=vt.cod_venta limit 1),0)=0  and (select estado from local l where l.cod_local=vt.cod_local)='Activo' ".$condicionFecha.$condicionlocal.$condiciontipo;
	
	// DATE_SUB(fecha_evento, INTERVAL 1 MONTH) AS fecha_menos_un_mes
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
$TotalVentasAnterior = 0;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalVentasAnterior = $valor['TotalVentasAnterior'];
		}
	}

////////////////////////////////////////////////sentencia de pagos Anterior

 
 
	$condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and   vt.cod_local ='".$local."'";		
	 }
	
	 $condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
 
	$sql = "Select ifnull(sum(Monto),0) as TotalPagosAnterior from  pago inner join venta vt on cod_venta=cod_venta_fk  where DATE_FORMAT( Fecha , '%Y-%m')= '$fechaAnterior' and Monto>'0' ".$condicionlocal.$condiciontipo;
	
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalPagosAnterior = 0;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalPagosAnterior = $valor['TotalPagosAnterior'];
		}
	}
	
 
	
	////////////////////////////////////////////////sentencia de solicitudcredito
	
	$condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and cod_localFK='".$local."'";		
	 }
 
 
	$sql = "Select count(*) as TotalPedidos from  solicitudcredito sc  inner join detallesolicitud ds on sc.idSolicitudCredito = ds.idSolicitudCreditoFK  where estado= 'PENDIENTE' ".$condicionlocal."  group by sc.idSolicitudCredito  asc  ";

 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$TotalPedidos = $valor;
 
	setlocale(LC_TIME, 'es_ES.UTF-8');
 
$fechaGeneral = date('Y-m-d');

// Crear un objeto DateTime a partir de la fecha
$datefechaGeneralAnterior = new DateTime($fechaGeneral);


$datefechaGeneralAnterior2 = new DateTime($fechaGeneral);
$datefechaGeneralAnterior2->modify('-1 month');


$fechaAnteriorMes = strftime('%m', $datefechaGeneralAnterior2->getTimestamp());
$fechaAnteriorMes=obtenermesletrasesp($fechaAnteriorMes);

$fechaAnteriorAnho = strftime('%Y', $datefechaGeneralAnterior2->getTimestamp());



$fechaMes = date('m');
$mimes=obtenermesletrasesp($fechaMes);

 
	$fechahoyMetasVenta = date('Y-m');
 
	 ////////////////////////////////////////////////sentencia de metas venta
	 
	 $condicionFecha = " DATE_FORMAT(fecha, '%Y-%m')= '$fechahoyMetasVenta' ";
 
 
 $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and   cod_localFK ='".$local."'";		
	 }
 
	$sql = "Select  contado , credito from metas_venta vt where  ".$condicionFecha.$condicionlocal;
	
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
	$TotalMetas=0;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
				if ($tipo == "CONTADO") {
					$TotalMetas += $valor['contado'];
				}
				
				if ($tipo == "CREDITO") {
					$TotalMetas += $valor['credito'];
				}
				
				if ($tipo == "") {
					$TotalMetas += $valor['contado'] + $valor['credito'];
				}							
		}
	}

/* ------------------------------------------------- CHEQUES ----------------------------------------------------------- */

$sql = "SELECT IFNULL(importe,0) AS importe, ifnull(pagado,0) as pagado FROM cheque WHERE estado = 'Activo' and fecven >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
  AND fecven <  DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH);";
	
 // echo($sql);
 // exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	
	$total_pendiente = 0;
	$total_pagado = 0;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			
			$pagado = $valor['pagado'];
			$importe = $valor['importe'];
			
				if ($pagado) {
					$total_pagado += $importe;
				}else{
					$total_pendiente += $importe;
				}
									
		}
	}
	
	$arrayChequesTotales = [$total_pendiente, $total_pagado];

	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $TotalVentas, "3" =>$TotalPagos, "4" => $TotalPedidos, "5" => $TotalVentasAnterior, "6" => $TotalPagosAnterior, "7" => $fechaAnteriorMes, "8" => $fechaAnteriorAnho, "9" => $mimes, "10" => $TotalMetas, "11" => $arrayChequesTotales);
	echo json_encode($informacion);
	exit;
}

 

function obtenermesletrasesp($mes){
	
	if($mes=="01"){return "ENERO";}
	if($mes=="02"){return "FEBRERO";}
	if($mes=="03"){return "MARZO";}
	if($mes=="04"){return "ABRIL";}
	if($mes=="05"){return "MAYO";}
	if($mes=="06"){return "JUNIO";}
	if($mes=="07"){return "JULIO";}
	if($mes=="08"){return "AGOSTO";}
	if($mes=="09"){return "SEPTIEMBRE";}
	if($mes=="10"){return "OCTUBRE";}
	if($mes=="11"){return "NOVIEMBRE";}
	if($mes=="12"){return "DICIEMBRE";}
	
	
}






function abm($puntoexpedicion, $tipo_comprobante, $cod_venta, $fecha_venta, $cod_usuarioFK, $cod_clienteFK, $num_factura, $cod_cobradorFK, $TipoVenta, $TipoPago, $vendedor1, $vendedor2, $comision, $cod_local, $idGaranteFk, $operacion)
{


	if ($fecha_venta == "" || $cod_usuarioFK == "" || $cod_clienteFK == "" || $cod_cobradorFK == "" || $comision == "") {
		$informacion = array("1" => "camposvacio");
		echo json_encode($informacion);
		exit;
	}

	$mysqli = conectar_al_servidor();

	if ($operacion == "nuevo") {

		if ($num_factura == "") {
			if ($tipo_comprobante == "FACTURA") {
				$datos = buscarcodNroFactura($cod_local, $puntoexpedicion);
				$num_factura = buscarnrofactura($datos[0], $datos[1]);
				$codnrofactura = $datos[0];
			} else {
				$num_factura = buscarnroventab();
				$puntoexpedicion = "";
				$codnrofactura = "";
			}
		}

		$consulta1 = "Insert into venta (idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2,comision,cod_local,tipo_comprobante,puntoexpedicion,codnrofactura)
values(?,?,'0',?,?,?,?,?,?,?,?,?,?,?,?,?)";
		$stmt1 = $mysqli->prepare($consulta1);
		$ss = 'sssssssssssssss';
		$stmt1->bind_param($ss, $idGaranteFk, $fecha_venta, $cod_usuarioFK, $cod_clienteFK, $num_factura, $cod_cobradorFK, $TipoVenta, $TipoPago, $vendedor1, $vendedor2, $comision, $cod_local, $tipo_comprobante, $puntoexpedicion, $codnrofactura);
	}


	if ($operacion == "editar") {

		if ($num_factura == "") {
			if ($tipo_comprobante == "FACTURA") {
				$datos = buscarcodNroFactura($cod_local, $puntoexpedicion);
				$num_factura = buscarnrofactura($datos[0], $datos[1]);
				$codnrofactura = $datos[0];
			} else {
				$num_factura = buscarnroventab();
				$puntoexpedicion = "";
				$codnrofactura = "";
			}

			$consulta1 = "Update venta set codnrofactura=?,idGaranteFk=?,fecha_venta=?,cod_usuarioFK=?,cod_clienteFK=?,num_factura=?,cod_cobradorFK=?,TipoVenta=?,TipoPago=?,Vendedor1=?,Vendedor2=?,comision=?,cod_local=?,tipo_comprobante=?,puntoexpedicion=? where cod_venta=?";
			$stmt1 = $mysqli->prepare($consulta1);
			$ss = 'ssssssssssssssss';
			$stmt1->bind_param($ss, $codnrofactura, $idGaranteFk, $fecha_venta, $cod_usuarioFK, $cod_clienteFK, $num_factura, $cod_cobradorFK, $TipoVenta, $TipoPago, $vendedor1, $vendedor2, $comision, $cod_local, $tipo_comprobante, $puntoexpedicion, $cod_venta);
		} else {

			$consulta1 = "Update venta set idGaranteFk=?,fecha_venta=?,cod_usuarioFK=?,cod_clienteFK=?,num_factura=?,cod_cobradorFK=?,TipoVenta=?,TipoPago=?,Vendedor1=?,Vendedor2=?,comision=?,cod_local=?,tipo_comprobante=?,puntoexpedicion=? where cod_venta=?";
			$stmt1 = $mysqli->prepare($consulta1);
			$ss = 'sssssssssssssss';
			$stmt1->bind_param($ss, $idGaranteFk, $fecha_venta, $cod_usuarioFK, $cod_clienteFK, $num_factura, $cod_cobradorFK, $TipoVenta, $TipoPago, $vendedor1, $vendedor2, $comision, $cod_local, $tipo_comprobante, $puntoexpedicion, $cod_venta);
		}
	}

	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	if ($operacion == "nuevo") {
		$cod_venta = obtenerId($cod_clienteFK, $cod_usuarioFK, $num_factura, $cod_local);
	}
	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $cod_venta);
	echo json_encode($informacion);
	exit;
}

function actualizarnrofactura($cod_venta, $puntoexpedicion, $nrofactura)
{


	if ($cod_venta == "" || $puntoexpedicion == "" || $nrofactura == "") {
		$informacion = array("1" => "camposvacio");
		echo json_encode($informacion);
		exit;
	}

	$mysqli = conectar_al_servidor();

	$consulta1 = "Update venta set num_factura=?,puntoexpedicion=? where cod_venta=?";
	$stmt1 = $mysqli->prepare($consulta1);
	$ss = 'sss';
	$stmt1->bind_param($ss, $nrofactura, $puntoexpedicion, $cod_venta);

	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	mysqli_close($mysqli);
	$informacion = array("1" => "exito");
	echo json_encode($informacion);
	exit;
}

function abmcancelarventa($montodevuelto, $motivo, $fecha, $cod_venta, $operacion, $cod_usuario)
{

	if ($cod_venta == "" || $montodevuelto == "" || $fecha == "") {
		$informacion = array("1" => "camposvacio");
		echo json_encode($informacion);
		exit;
	}

	$mysqli = conectar_al_servidor();
	
	
	$consulta= "Select count(*) from cancelaciones where cod_venta=?   ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $cod_venta); 
 
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
	
	
	
	
	if ($operacion == "nuevo") {
		$consulta1 = "Insert into cancelaciones (montodevuelto,motivo,fecha,cod_venta,cod_usuario)
values(?,?,?,?,?)";
		$stmt1 = $mysqli->prepare($consulta1);
		$ss = 'sssss';
		$stmt1->bind_param($ss, $montodevuelto, $motivo, $fecha, $cod_venta, $cod_usuario);
	}

	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	buscardetalleventacancelaciones($cod_venta);
	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $cod_venta);
	echo json_encode($informacion);
	exit;
}


/*Buscar */
function buscardetalleventacancelaciones($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "select dtv.cod_productoFK,dtv.cantidad_detalle,vt.cod_local
 from detalle_venta dtv inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
 where dtv.cod_ventaFK ='$buscar' ";
	$pagina = "";
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$a = 1;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {



			$cod_productoFK = utf8_decode($valor['cod_productoFK']);
			$cantidad_detalle = utf8_decode($valor['cantidad_detalle']);
			$cod_local = utf8_decode($valor['cod_local']);

			// editar_cantidad($cod_productoFK, $cantidad_detalle, "sumar", $cod_local);
			SumarRestarStockA($cantidad_detalle,$cod_productoFK,$cod_local,"SUMA","VENTA CANCELADA");
			
			insertarMovimientoStock($cantidad_detalle,$cod_productoFK,$cod_local);
			
		}
	}
}



/* function editar_cantidad($idproductos, $cantidad, $t, $cod_localfk)
{
	$mysqli = conectar_al_servidor();
	
	 $user=$_POST['useru'];
    $user = utf8_decode($user);
	
	if ($t == "resta") {
		$consulta = "Update stocklocales set cantidad=(cantidad-$cantidad), user_update='$user'  where cod_productofk='" . $idproductos . "' and cod_localfk='" . $cod_localfk . "'";
	} else {
		$consulta = "Update stocklocales set cantidad=(cantidad+$cantidad), user_update='$user'  where cod_productofk='" . $idproductos . "' and cod_localfk='" . $cod_localfk . "'";
	}
	$stmt = $mysqli->prepare($consulta);
	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
} */

function SumarRestarStockA($cantidad,$cod_productofk,$cod_localfk,$operacion,$tipo)
{
	$user=$_POST['useru'];
    $user = utf8_decode($user);
	
	date_default_timezone_set('America/Asuncion');
	$fechaHora = date("Y-m-d H:i:s");
	
	
$mysqli=conectar_al_servidor();

$operacion = strtolower($operacion);
if($operacion =='resta'){
	$cantidad = -abs($cantidad);
}


$consulta1="INSERT INTO stock_producto (tipo,operacion,entero,user_insert,fecha_hora,cod_stocklocalesFK) 
values(upper('$tipo'),upper('$operacion'),'$cantidad','$user','$fechaHora',(SELECT idstocklocales FROM stocklocales WHERE cod_productofk ='$cod_productofk' and cod_localfk ='$cod_localfk'))";



$stmt1 = $mysqli->prepare($consulta1); 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

 mysqli_close($mysqli);
}


function  insertarMovimientoStock($cantidad,$cod_productoFK,$cod_localFK)
{

	$user = $_POST['useru'];
	$user = utf8_decode($user);
	date_default_timezone_set('America/Anguilla');
	$fecha_inser_edit = date('Y-m-d', time());
	
	
	$mysqli = conectar_al_servidor();
	$consulta = "INSERT INTO `movimiento_stock` (cod_user_insert,fecha,idmotivo_movimiento_stockFK,cantidad,cod_productoFK,tipo,estado,cod_localFK) values ('$user','$fecha_inser_edit','8','$cantidad','$cod_productoFK','Sumar','Activo','$cod_localFK')";
	

	$stmt = $mysqli->prepare($consulta);


	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	mysqli_close($mysqli);
}

function abmactualizarTotal($total, $cod_venta)
{


	if ($total == "" || $cod_venta == "") {
		$informacion = array("1" => "camposvacio");
		echo json_encode($informacion);
		exit;
	}

	$mysqli = conectar_al_servidor();
	$consulta1 = "Update venta set total_venta=? where cod_venta=?";
	$stmt1 = $mysqli->prepare($consulta1);
	$ss = 'ss';
	$stmt1->bind_param($ss, $total, $cod_venta);
	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	insertarHistorialRefinanciar($cod_venta);

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $cod_venta);
	echo json_encode($informacion);
	exit;
}

function  insertarHistorialRefinanciar($cod_venta)
{

	$user = $_POST['useru'];
	$user = utf8_decode($user);
	$mysqli = conectar_al_servidor();
	$consulta = "Insert into refinanciamentos (fecha,cod_venta,cod_usuario) 
	values(current_date(),'$cod_venta','$user')";

	$stmt = $mysqli->prepare($consulta);


	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	mysqli_close($mysqli);
}

function eliminarventa($cod_venta, $motivo, $nroFactura)
{


	if ($cod_venta == "") {
		$informacion = array("1" => "camposvacio");
		echo json_encode($informacion);
		exit;
	}

	eliminarpagos($cod_venta);
	eliminarcreditos($cod_venta);

	$mysqli = conectar_al_servidor();

	/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');
	$fecha_inser_edit = date('Y-m-d | h:i:sa', time());
	$fecha = date('Y-m-d', time());
	$user = $_POST['useru'];
	$user = utf8_decode($user);

	$consulta = "Insert into ventaseliminadas (nrofactura,motivo,fecha,cod_user_insert,fecha_insert)
values(?,?,?,?,?)";
	$stmt = $mysqli->prepare($consulta);
	$ss = 'sssss';
	$stmt->bind_param($ss, $nrofactura, $motivo, $fecha, $user, $fecha_inser_edit);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$consulta = "delete from venta where cod_venta='$cod_venta'";
	$stmt = $mysqli->prepare($consulta);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	mysqli_close($mysqli);
	$informacion = array("1" => "exito");
	echo json_encode($informacion);
	exit;
}

function eliminarcreditos($cod_venta)
{
	$mysqli = conectar_al_servidor();
	$consulta = "delete from credito where  cod_venta='$cod_venta'";

	$stmt = $mysqli->prepare($consulta);

	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	mysqli_close($mysqli);
}
function eliminarpagos($cod_venta)
{
	$mysqli = conectar_al_servidor();
	$consulta = "delete from pago where cod_venta_fk='$cod_venta' ";

	$stmt = $mysqli->prepare($consulta);

	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	mysqli_close($mysqli);
}
function obtenerId($cod_clienteFK, $cod_usuarioFK, $num_factura, $cod_local)
{
	$mysqli = conectar_al_servidor();
	$cod_venta = '';
	$sql = "Select cod_venta from venta where cod_clienteFK='$cod_clienteFK' and cod_usuarioFK='$cod_usuarioFK' and num_factura='$num_factura' and cod_local='$cod_local' ";



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


			$cod_venta = $valor['cod_venta'];
	}
	}

	mysqli_close($mysqli);
	return $cod_venta;
}


function condicionHistorialVentasPorUsuario($usuarioSolicitante)
{
	$usuarioSolicitante = (int) $usuarioSolicitante;
	if ($usuarioSolicitante <= 0) {
		return " and 1=0 ";
	}

	$puedeVerVentasDeOtros = controldeaccesoacasas(
		$usuarioSolicitante,
		"VERHISTORIALVENTASOTROSUSUARIOS",
		" u.accion='SI' "
	);

	if ($puedeVerVentasDeOtros == 1) {
		return " ";
	}

	return " and (vt.cod_usuarioFK='" . $usuarioSolicitante . "'
		or exists (
			select 1
			from vendedor vendedor_usuario
			where vendedor_usuario.cod_usuarioFK='" . $usuarioSolicitante . "'
			and vendedor_usuario.idvendedor in (vt.Vendedor1, vt.Vendedor2)
		)) ";
}

function historialventa($garante, $fecha1, $fecha2, $fechafiltro, $nroventa, $documento, $cliente, $telefono, $tipoventa, $estadocuenta, $cod_local, $tipoComprobante, $vendedor, $estadoventamoracliente, $refinanciado,$producto,$montoMinimo=0,$formato="",$usuarioSolicitante="")
{
	$mysqli = conectar_al_servidor();
	$condicionUsuario = condicionHistorialVentasPorUsuario($usuarioSolicitante);

	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato)==="json";
	$filas = array();
	$devolverArray = strtolower($formato)==="json";
	$filas = array();

	$condicionVendedor = "";
	if ($vendedor != "") {
		$condicionVendedor = " and  Vendedor1 ='" . $vendedor . "'";
	}



	$condiciontipoComprobante = "";
	if ($tipoComprobante != "") {
		$condiciontipoComprobante = " and tipo_comprobante='" . $tipoComprobante . "'";
	}


	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = " and fecha_venta>='" . $fecha1 . "' and fecha_venta<='" . $fecha2 . "'";
	}
	$condicionfechafiltro = "";
	if ($fechafiltro != "") {
		$condicionfechafiltro = " and fecha_venta='" . $fechafiltro . "'";
	}


	$condicionestadoventamoracliente = "";
	if ($estadoventamoracliente == "1") {
		$condicionestadoventamoracliente = " and (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='12'";
	}

	if ($estadoventamoracliente == "2") {
		$condicionestadoventamoracliente = " and codmoracliente ='13' ";
	}

	if ($estadoventamoracliente == "3") {
		$condicionestadoventamoracliente = " and (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='14'";
	}

	if ($estadoventamoracliente == "4") {
		$condicionestadoventamoracliente = " and (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='10'";
	}
	
	if ($estadoventamoracliente == "5") {
		$condicionestadoventamoracliente = " and ((Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='12' OR (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='14' OR (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='10') ";
	}






	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = "and num_factura like '%" . $nroventa . "%'";
	}
	$condiciondocumento = "";
	if ($documento != "") {
		$condiciondocumento = "and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK limit 1)='" . $documento . "'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK limit 1) like '%" . $cliente . "%'";
	}
	$condiciontelef = "";
	if ($telefono != "") {
		$condiciontelef = "and (Select telefono from persona where cod_persona=vt.cod_clienteFK limit 1) like '%" . $telefono . "%'";
	}
	$condicionCuenta = " ";
	$condiciontipoventa = " ";
	//Pendientes
	if ($estadocuenta == "1") {
		$condicionCuenta = " and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))<total_venta";
	}
	//Pagados
	if ($estadocuenta == "2") {
		$condicionCuenta = " and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))>=total_venta";
	}
	
	//Cancelados
	if ($estadocuenta == "3") {
		$condicionCuenta = " and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)>0";
	}
	if ($tipoventa != "") {
		$condiciontipoventa = " and TipoVenta='$tipoventa'";
	}

	$condicionCodLocal = " ";
	if ($cod_local != "") {

		$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	}



	$condiciongarante = "";
	if ($garante != "") {
		$condiciongarante = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) like '%" . $garante . "%'";
	}

	$condicionrefinanciado = "";
	if ($refinanciado != "") {
		$condicionrefinanciado = " and estadorefinanciado = '" . $refinanciado . "'";
	}

$condicionproducto="";
if($producto!=""){
$condicionproducto=" and (select nombre_producto from producto where cod_producto=dt.cod_productoFK) like '%".$producto."%' ";
}
$condicionMontoMinimo = $montoMinimo > 0 ? " and vt.total_venta >= " . (float) $montoMinimo . " " : "";



	$sql = "Select tipo_comprobante,puntoexpedicion,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,vt.comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(Select ci_cliente from cliente where cod_cliente=idGaranteFk) as nrodogarante,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select dias from credito where cod_venta=vt.cod_venta limit 1),0) as diasgracia,
		IFNULL((Select interes from credito where cod_venta=vt.cod_venta limit 1),0) as intereses,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lat,
		(Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lot,
		codmoracliente as tipo_estado,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		IFNULL((Select montodevuelto from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as montodevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,estadorefinanciado,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
				IFNULL((Select sum(descuento) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalDescuentodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,vt.fecha_insert,vt.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito
		from  venta vt inner join detalle_venta dt on vt.cod_venta = dt.cod_ventaFK where cod_venta!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  " . $condicionUsuario . $condiciongarante . $condicionfecha . $condiciontipoComprobante . $condicionfechafiltro . $condicionnroventa . $condiciondocumento . $condicioncliente . $condiciontelef . $condicionCuenta . $condiciontipoventa . $condicionCodLocal . $condicionVendedor . $condicionestadoventamoracliente . $condicionrefinanciado . $condicionproducto . $condicionMontoMinimo . " group by vt.cod_venta order by vt.cod_venta asc limit 50";

// echo $sql;
// exit;

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
	$styleName = "tableRegistroSearch";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha_venta = utf8_encode($valor['fecha_venta']);
			$total_venta = utf8_encode($valor['total_venta']);
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
			$cod_venta = utf8_encode($valor['cod_venta']);
			$cobradornombre = utf8_encode($valor['cobradornombre']);
			$nroCancelado = utf8_encode($valor['nroCancelado']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
			$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);
			$nombrevendedor2 = utf8_encode($valor['nombrevendedor2']);
			$cantidadcuota = utf8_encode($valor['cantidadcuota']);
			$Monto = utf8_encode($valor['Monto']);
			$fechaprimerpago = utf8_encode($valor['fechaprimerpago']);
			$comision = utf8_encode($valor['comision']);
			$cod_local = utf8_encode($valor['cod_local']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$pago = utf8_encode($valor['pago']);
			$nrodetalle = utf8_encode($valor['nrodetalle']);
			$nroCouta = utf8_encode($valor['nroCouta']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$nrodogarante = utf8_encode($valor['nrodogarante']);
			$diasgracia = utf8_encode($valor['diasgracia']);
			$intereses = utf8_encode($valor['intereses']);
			$telefono = utf8_encode($valor['telefono']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$totalDescuentodetalle = utf8_encode($valor['totalDescuentodetalle']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$insertadopor = utf8_encode($valor['insertadopor']);
			$estadorefinanciado = utf8_encode($valor['estadorefinanciado']);
			$editadopor = utf8_encode($valor['editadopor']);
			$fecha_insert = utf8_encode($valor['fecha_insert']);
			$fecha_edit = utf8_encode($valor['fecha_edit']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$lat = utf8_encode($valor['lat']);
			$lot = utf8_encode($valor['lot']);
			$tipo_estado = utf8_encode($valor['tipo_estado']);
			$controlFecha = date('Y-m-d');


			$styleRefinanciamiento = '';
			if ($estadorefinanciado == 'SI') {
				$styleRefinanciamiento = 'background-color:#ff9f00;color:white';
			} else {
				$estadorefinanciado = 'NO';
			}



			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0] + $totalDescuentodetalle;
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			// $datos[5]=$TotalDiasAtrasado;
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
			$deuda = $datos[8];
			$SubTotalDeuda = $datos[11];
			if ($SubTotalDeuda == 0) {
				$SubTotalDeuda = $total_venta;
			}
			$subtotalventa = $totalventadetalle + $totaldescuento;
			$totalinterespadado = $datos[12];
			$TotalPagoSininteres = $datos[13];
			$styleCancelado = "";
			$totalpagado = $totalpagado + $pago;
			$deudapendiente = $total_venta - $totalpagado;
			if ($nroCancelado == 0) {
				$TotalVentas = $total_venta + $TotalVentas;
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalDeuda = $TotalDeuda + $deuda;
			} else {
				$deudapendiente = 0;
				$totalpagado = ($totalpagado - $montodevuelto);
				if ($totalpagado < 0) {
					$totalpagado = 0;
				}
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalVentas = $total_venta + $TotalVentas;
				$styleCancelado = "background-color: #FFEB3B;color:#000";
			}
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			$nueva_fecha = date("d-m-Y", strtotime($fecha_venta));
			$detalle_venta_datos = buscar_detalles_venta($cod_venta, "array");
			$detalle_venta = $detalle_venta_datos["html"];
			
			// echo $tipo_estado;
			// exit;
			
			$p_tipo = '';
			$nombre_tipo_estado = '';
			if($tipo_estado != '0' || $tipo_estado != ''){
				$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
				$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
			}

			$filas[] = array(
				"fecha_venta" => $fecha_venta,
				"fecha_venta_formateada" => $nueva_fecha,
				"numero_venta" => $num_factura,
				"numero_venta_formateado" => $nrof,
				"tipo_comprobante" => $tipo_comprobante,
				"documento_cliente" => $nrodocliente,
				"cliente" => $clientenombre,
				"estado_cliente_nombre" => $nombre_tipo_estado,
				"garante" => $Garante,
				"telefono" => $telefono,
				"tipo_venta" => $TipoVenta,
				"total_detalle" => (float) $totalventadetalle,
				"total_detalle_formateado" => number_format($totalventadetalle, '0', ',', '.'),
				"descuento" => (float) $totaldescuento,
				"descuento_formateado" => number_format($totaldescuento, '0', ',', '.'),
				"subtotal" => (float) $subtotalventa,
				"subtotal_formateado" => number_format($subtotalventa, '0', ',', '.'),
				"interes_pagado" => (float) $totalinterespadado,
				"interes_pagado_formateado" => number_format($totalinterespadado, '0', ',', '.'),
				"cuotas_pagadas" => (float) $TotalPagoSininteres,
				"cuotas_pagadas_formateado" => number_format($TotalPagoSininteres, '0', ',', '.'),
				"total_pagado" => (float) $totalpagado,
				"total_pagado_formateado" => number_format($totalpagado, '0', ',', '.'),
				"interes_actual" => (float) $totalintereses,
				"interes_actual_formateado" => number_format($totalintereses, '0', ',', '.'),
				"deuda" => (float) $deuda,
				"deuda_formateada" => number_format($deuda, '0', ',', '.'),
				"cuotas" => $cuotas,
				"local" => $nombrelocal,
				"vendedor1_nombre" => $nombrevendedor1,
				"refinanciado" => $estadorefinanciado,
				"productos" => $detalle_venta_datos["productos"],
				"producto_resumen" => $detalle_venta_datos["resumen"],
				"cancelada" => $nroCancelado != 0 ? "SI" : "NO",
				"vendedor1_id" => $Vendedor1,
				"vendedor2_id" => $Vendedor2,
				"vendedor2_nombre" => $nombrevendedor2,
				"cobrador_nombre" => $cobradornombre,
				"cod_venta" => $cod_venta,
				"cod_usuario" => $cod_usuarioFK,
				"cod_cliente" => $cod_clienteFK,
				"cod_cobrador" => $cod_cobradorFK,
				"tipo_pago" => $TipoPago,
				"cantidad_cuota" => $cantidadcuota,
				"monto_cuota_formateado" => number_format($Monto, '0', ',', '.'),
				"fecha_primer_pago" => $fechaprimerpago,
				"comision" => $comision,
				"cod_local" => $cod_local,
				"intereses_credito_formateado" => number_format($intereses, '0', ',', '.'),
				"dias_gracia" => $diasgracia,
				"nro_detalle" => $nrodetalle,
				"id_garante" => $idGaranteFk,
				"documento_garante" => $nrodogarante,
				"punto_expedicion" => $puntoexpedicion,
				"deuda_pendiente_formateada" => number_format($deudapendiente, '0', ',', '.'),
				"acceso_credito" => $accesocredito,
				"insertado_por" => $insertadopor,
				"editado_por" => $editadopor,
				"fecha_insert" => $fecha_insert,
				"fecha_edit" => $fecha_edit,
				"latitud" => $lat,
				"longitud" => $lot
			);

			if ($formato != "json") {
			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerelementohistroialventa(this)' style='" . $styleCancelado . $styleRefinanciamiento . "' >

<td    					style='width:5%'>" . $nueva_fecha . "</td>
<td  					style='width:5%'>" . $nrof . "</td>
<td  id='td_datos_40'	 style='width:5%'>" . $tipo_comprobante . "</td>
<td  					style='width:5%'>" . $nrodocliente . "</td>
<td  id='' 	style='width:5%'>" . $p_tipo.$clientenombre . "</td>
<td  id='td_datos_2' 	style='display:none'>" . $clientenombre . "</td>
<td  id='' 			 	style='width:5%'>" . $Garante . "</td>
<td  id='td_datos_34'	 style='width:5%'>" . $telefono . "</td>
<td  id='td_datos_12'	 style='width:3%'>" . $TipoVenta . "</td>
<td  id='td_datos_5' 	 style='width:5%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='td_datos_29'	 style='width:5%'>" . number_format($totaldescuento, '0', ',', '.') . "</td>
<td  id='td_datos_38'	 style='width:5%'>" . number_format($subtotalventa, '0', ',', '.') . "</td>
<td  id='' 				 style='width:5%'>" . number_format($totalinterespadado, '0', ',', '.') . "</td>
<td  id='' 				 style='width:5%'>" . number_format($TotalPagoSininteres, '0', ',', '.') . "</td>
<td  id='td_datos_6'	 style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_24'	 style='width:3%'>" . number_format($totalintereses, '0', ',', '.') . "</td>
<td  id='td_datos_7'	 style='width:5%'>" . number_format($deuda, '0', ',', '.') . "</td>
<td  id='' 				 style='width:3%'>" . $cuotas . "</td>
<td  id=''				 style='width:6%'>" . $nombrelocal . "</td>
<td  id='td_datos_15'  	 style='width:5%'>" . $nombrevendedor1 . "</td>
<td  id=''  	 style='width:5%'>" . $estadorefinanciado . "</td>
<td  id=''  	 style='width:5%'>" . $detalle_venta . "</td>

<td  id='td_datos_1' style='display:none'>" . $fecha_venta . "</td>
<td  id='' 				style='display:none'>" . $nombrevendedor1 . " - " . $nombrevendedor2 . "</td>
<td  id='td_datos_3'	 style='display:none'>" . $Vendedor1 . "</td>
<td  id='td_datos_14'	 style='display:none'>" . $Vendedor2 . "</td>
<td  id='td_datos_16'	 style='display:none'>" . $nombrevendedor2 . "</td>
<td  id='td_datos_4' 	style='display:none'>" . $cobradornombre . "</td>
<td id='td_datos_13' 	style='display:none'>" . $num_factura . "</td>
<td  id='td_datos_8' style='display:none'>" . $cod_venta . "</td>
<td  id='td_datos_9' style='display:none'>" . $cod_usuarioFK . "</td>
<td  id='td_datos_10' style='display:none'>" . $cod_clienteFK . "</td>
<td  id='td_datos_11' style='display:none'>" . $cod_cobradorFK . "</td>
<td  id='td_datos_18' style='display:none'>" . $TipoPago . "</td>
<td  id='td_datos_19' style='display:none'>" . $cantidadcuota . "</td>
<td  id='td_datos_20' style='display:none'>" . number_format($Monto, '0', ',', '.') . "</td>
<td  id='td_datos_21' style='display:none'>" . $fechaprimerpago . "</td>
<td  id='td_datos_22' style='display:none'>" . $comision . "</td>
<td  id='td_datos_23' style='display:none'>" . $cod_local . "</td>
<td  id='td_datos_25' style='display:none'>" . number_format($intereses, '0', ',', '.') . "</td>
<td  id='td_datos_26' style='display:none'>" . $diasgracia . "</td>
<td  id='td_datos_27' style='display:none'>" . $nrodetalle . "</td>
<td  id='td_datos_30' style='display:none'>" . $idGaranteFk . "</td>
<td  id='td_datos_31' style='display:none'>" . $Garante . "</td>
<td  id='td_datos_32' style='display:none'>" . $nrodocliente . "</td>
<td  id='td_datos_33' style='display:none'>" . $nrodogarante . "</td>
<td  id='td_datos_35' style='display:none'>" . $tipo_comprobante . "</td>
<td  id='td_datos_36' style='display:none'>" . $puntoexpedicion . "</td>
<td  id='td_datos_37' style='display:none'>" . number_format($deudapendiente, '0', ',', '.') . "</td>
<td  id='td_datos_39' style='display:none'>" . $accesocredito . "</td>
<td  id='td_datos_100' style='display:none'>" . $insertadopor . "</td>
<td  id='td_datos_101' style='display:none'>" . $editadopor . "</td>
<td  id='td_datos_102' style='display:none'>" . $fecha_insert . "</td>
<td  id='td_datos_103' style='display:none'>" . $fecha_edit . "</td>
<td  id='td_datos_104' style='display:none'>" . $lat . "</td>
<td  id='td_datos_105' style='display:none'>" . $lot . "</td>
</tr>
</table>";
			}
		}
	}

	$sql = "Select tipo_comprobante
		from venta vt inner join detalle_venta dt on vt.cod_venta = dt.cod_ventaFK where cod_venta!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   " . $condicionUsuario . $condiciongarante . $condicionfecha . $condiciontipoComprobante . $condicionfechafiltro . $condicionnroventa . $condiciondocumento . $condicioncliente . $condiciontelef . $condicionCuenta . $condiciontipoventa . $condicionCodLocal . $condicionVendedor . $condicionestadoventamoracliente . $condicionrefinanciado . $condicionproducto . $condicionMontoMinimo . " group by vt.cod_venta order by vt.cod_venta asc ";



	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$totalregistro = $valor;

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $formato == "json" ? $filas : $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" => number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'), "99" => $nroRegistro, "100" => $totalregistro);
	echo json_encode($informacion);
	exit;
}

function mashistorialventa($garante, $fecha1, $fecha2, $fechafiltro, $nroventa, $documento, $cliente, $telefono, $tipoventa, $estadocuenta, $cod_local, $totalventa, $totalpagado, $totalpendiente, $registrocargado, $tipoComprobante, $vendedor, $estadoventamoracliente, $refinanciado,$producto,$montoMinimo=0,$formato="",$usuarioSolicitante="")
{

	$mysqli = conectar_al_servidor();
	$condicionUsuario = condicionHistorialVentasPorUsuario($usuarioSolicitante);
	$totalRegistro = 0;
	$pagina = "";
	$filas = array();

	$condicionVendedor = "";
	if ($vendedor != "") {
		$condicionVendedor = "and  Vendedor1 ='" . $vendedor . "'";
	}



	$condiciontipoComprobante = "";
	if ($tipoComprobante != "") {
		$condiciontipoComprobante = "and tipo_comprobante='" . $tipoComprobante . "'";
	}

	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and fecha_venta>='" . $fecha1 . "' and fecha_venta<='" . $fecha2 . "'";
	}
	$condicionfechafiltro = "";
	if ($fechafiltro != "") {
		$condicionfechafiltro = "and fecha_venta='" . $fechafiltro . "'";
	}

	$condicionestadoventamoracliente = "";
	if ($estadoventamoracliente == "1") {
		$condicionestadoventamoracliente = " and (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='12'";
	}

	if ($estadoventamoracliente == "2") {
		$condicionestadoventamoracliente = " and codmoracliente ='13' ";
	}

	if ($estadoventamoracliente == "3") {
		$condicionestadoventamoracliente = " and (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='14'";
	}

	if ($estadoventamoracliente == "4") {
		$condicionestadoventamoracliente = " and (Select tipo_estado from cliente where cod_cliente=cod_clienteFK limit 1)='10'";
	}

	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = "and num_factura like '%" . $nroventa . "%'";
	}
	$condiciondocumento = "";
	if ($documento != "") {
		$condiciondocumento = "and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK limit 1)='" . $documento . "'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK limit 1) like '%" . $cliente . "%'";
	}
	$condiciontelef = "";
	if ($telefono != "") {
		$condiciontelef = "and (Select telefono from persona where cod_persona=vt.cod_clienteFK limit 1) like '%" . $telefono . "%'";
	}
	$condicionCuenta = " ";
	$condiciontipoventa = " ";
	if ($estadocuenta == "1") {
		$condicionCuenta = " and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))<total_venta";
	}
	if ($estadocuenta == "2") {
		$condicionCuenta = " and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))>=total_venta";
	}
	if ($estadocuenta == "3") {
		$condicionCuenta = " and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)>0";
	}
	if ($tipoventa != "") {
		$condiciontipoventa = " and TipoVenta='$tipoventa'";
	}



	$condicionCodLocal = " ";
	if ($cod_local != "") {

		$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	}

	$condicionrefinanciado = " ";
	if ($refinanciado != "") {

		$condicionrefinanciado = " and estadorefinanciado='$refinanciado' ";
	}



	$condiciongarante = "";
	if ($garante != "") {
		$condiciongarante = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) like '%" . $garante . "%'";
	}
	
	
	$condicionproducto="";
if($producto!=""){
$condicionproducto=" and (select nombre_producto from producto where cod_producto=dt.cod_productoFK) like '%".$producto."%' ";
}
$condicionMontoMinimo = $montoMinimo > 0 ? " and vt.total_venta >= " . (float) $montoMinimo . " " : "";

	$sql = "Select tipo_comprobante,puntoexpedicion,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,vt.comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(Select ci_cliente from cliente where cod_cliente=idGaranteFk) as nrodogarante,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select dias from credito where cod_venta=vt.cod_venta limit 1),0) as diasgracia,
		IFNULL((Select interes from credito where cod_venta=vt.cod_venta limit 1),0) as intereses,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lat,
		(Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lot,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		codmoracliente as tipo_estado,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		IFNULL((Select montodevuelto from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as montodevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto, estadorefinanciado,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
				IFNULL((Select sum(descuento) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalDescuentodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,vt.fecha_insert,vt.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito
		from venta vt inner join detalle_venta dt on vt.cod_venta = dt.cod_ventaFK where cod_venta!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   " . $condicionUsuario . $condiciongarante . $condicionfecha . $condiciontipoComprobante . $condicionfechafiltro . $condicionnroventa . $condiciondocumento . $condicioncliente . $condiciontelef . $condicionCuenta . $condiciontipoventa . $condicionCodLocal . $condicionVendedor . $condicionestadoventamoracliente . $condicionrefinanciado . $condicionproducto . $condicionMontoMinimo . " group by vt.cod_venta order by vt.cod_venta asc limit " . $registrocargado . ", 35";


// echo $sql;
// exit;


	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor + $registrocargado;
	$TotalVentas = $totalventa;
	$TotalPagos = $totalpagado;
	$TotalDeuda = $totalpendiente;
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
			$cod_venta = utf8_encode($valor['cod_venta']);
			$cobradornombre = utf8_encode($valor['cobradornombre']);
			$nroCancelado = utf8_encode($valor['nroCancelado']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
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
			$nroCouta = ($valor['nroCouta']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$nrodogarante = utf8_encode($valor['nrodogarante']);
			$diasgracia = utf8_encode($valor['diasgracia']);
			$intereses = utf8_encode($valor['intereses']);
			$telefono = utf8_encode($valor['telefono']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$totalDescuentodetalle = utf8_encode($valor['totalDescuentodetalle']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$insertadopor = utf8_encode($valor['insertadopor']);
			$estadorefinanciado = utf8_encode($valor['estadorefinanciado']);
			$editadopor = utf8_encode($valor['editadopor']);
			$fecha_insert = utf8_encode($valor['fecha_insert']);
			$fecha_edit = utf8_encode($valor['fecha_edit']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$lat = utf8_encode($valor['lat']);
			$lot = utf8_encode($valor['lot']);
			$tipo_estado = utf8_encode($valor['tipo_estado']);
			$controlFecha = date('Y-m-d');



			$styleRefinanciamiento = '';
			if ($estadorefinanciado == 'SI') {
				$styleRefinanciamiento = 'background-color:#ff9f00;color:white';
			} else {
				$estadorefinanciado = 'NO';
			}



			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0] + $totalDescuentodetalle;
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			// $datos[5]=$TotalDiasAtrasado;
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
			$deuda = $datos[8];
			$SubTotalDeuda = $datos[11];
			if ($SubTotalDeuda == 0) {
				$SubTotalDeuda = $total_venta;
			}
			$subtotalventa = $totalventadetalle + $totaldescuento;
			$totalinterespadado = $datos[12];
			$TotalPagoSininteres = $datos[13];
			$styleCancelado = "";
			$totalpagado = $totalpagado + $pago;
			$deudapendiente = $total_venta - $totalpagado;
			if ($nroCancelado == 0) {
				$TotalVentas = $total_venta + $TotalVentas;
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalDeuda = $TotalDeuda + $deuda;
			} else {
				$deudapendiente = 0;
				$totalpagado = ($totalpagado - $montodevuelto);
				if ($totalpagado < 0) {
					$totalpagado = 0;
				}
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalVentas = $total_venta + $TotalVentas;
				$styleCancelado = "background-color: #FFEB3B;color:#000";
			}
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$nueva_fecha = date("d-m-Y", strtotime($fecha_venta));
			$detalle_venta_datos = buscar_detalles_venta($cod_venta, "array");
			$detalle_venta = $detalle_venta_datos["html"];


			$p_tipo = '';
			$nombre_tipo_estado = '';
			if($tipo_estado != '0'){
				$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
				$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
			}

			$filas[] = array(
				"fecha_venta" => $fecha_venta,
				"fecha_venta_formateada" => $nueva_fecha,
				"numero_venta" => $num_factura,
				"numero_venta_formateado" => $nrof,
				"tipo_comprobante" => $tipo_comprobante,
				"documento_cliente" => $nrodocliente,
				"cliente" => $clientenombre,
				"estado_cliente_nombre" => $nombre_tipo_estado,
				"garante" => $Garante,
				"telefono" => $telefono,
				"tipo_venta" => $TipoVenta,
				"total_detalle" => (float) $totalventadetalle,
				"total_detalle_formateado" => number_format($totalventadetalle, '0', ',', '.'),
				"descuento" => (float) $totaldescuento,
				"descuento_formateado" => number_format($totaldescuento, '0', ',', '.'),
				"subtotal" => (float) $subtotalventa,
				"subtotal_formateado" => number_format($subtotalventa, '0', ',', '.'),
				"interes_pagado" => (float) $totalinterespadado,
				"interes_pagado_formateado" => number_format($totalinterespadado, '0', ',', '.'),
				"cuotas_pagadas" => (float) $TotalPagoSininteres,
				"cuotas_pagadas_formateado" => number_format($TotalPagoSininteres, '0', ',', '.'),
				"total_pagado" => (float) $totalpagado,
				"total_pagado_formateado" => number_format($totalpagado, '0', ',', '.'),
				"interes_actual" => (float) $totalintereses,
				"interes_actual_formateado" => number_format($totalintereses, '0', ',', '.'),
				"deuda" => (float) $deuda,
				"deuda_formateada" => number_format($deuda, '0', ',', '.'),
				"cuotas" => $cuotas,
				"local" => $nombrelocal,
				"vendedor1_nombre" => $nombrevendedor1,
				"refinanciado" => $estadorefinanciado,
				"productos" => $detalle_venta_datos["productos"],
				"producto_resumen" => $detalle_venta_datos["resumen"],
				"cancelada" => $nroCancelado != 0 ? "SI" : "NO",
				"vendedor1_id" => $Vendedor1,
				"vendedor2_id" => $Vendedor2,
				"vendedor2_nombre" => $nombrevendedor2,
				"cobrador_nombre" => $cobradornombre,
				"cod_venta" => $cod_venta,
				"cod_usuario" => $cod_usuarioFK,
				"cod_cliente" => $cod_clienteFK,
				"cod_cobrador" => $cod_cobradorFK,
				"tipo_pago" => $TipoPago,
				"cantidad_cuota" => $cantidadcuota,
				"monto_cuota_formateado" => number_format($Monto, '0', ',', '.'),
				"fecha_primer_pago" => $fechaprimerpago,
				"comision" => $comision,
				"cod_local" => $cod_local,
				"intereses_credito_formateado" => number_format($intereses, '0', ',', '.'),
				"dias_gracia" => $diasgracia,
				"nro_detalle" => $nrodetalle,
				"id_garante" => $idGaranteFk,
				"documento_garante" => $nrodogarante,
				"punto_expedicion" => $puntoexpedicion,
				"deuda_pendiente_formateada" => number_format($deudapendiente, '0', ',', '.'),
				"acceso_credito" => $accesocredito,
				"insertado_por" => $insertadopor,
				"editado_por" => $editadopor,
				"fecha_insert" => $fecha_insert,
				"fecha_edit" => $fecha_edit,
				"latitud" => $lat,
				"longitud" => $lot
			);

			if ($formato != "json") {
			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerelementohistroialventa(this)' style='" . $styleCancelado . $styleRefinanciamiento . "' >


<td    					style='width:5%'>" . $nueva_fecha . "</td>
<td  					style='width:5%'>" . $nrof . "</td>
<td  id='td_datos_40'	 style='width:5%'>" . $tipo_comprobante . "</td>
<td  					style='width:5%'>" . $nrodocliente . "</td>
<td  id='td_datos_2' 	style='width:5%'>" . $p_tipo.$clientenombre . "</td>
<td  id='' 			 	style='width:5%'>" . $Garante . "</td>
<td  id='td_datos_34'	 style='width:5%'>" . $telefono . "</td>
<td  id='td_datos_12'	 style='width:3%'>" . $TipoVenta . "</td>
<td  id='td_datos_5' 	 style='width:5%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='td_datos_29'	 style='width:5%'>" . number_format($totaldescuento, '0', ',', '.') . "</td>
<td  id='td_datos_38'	 style='width:5%'>" . number_format($subtotalventa, '0', ',', '.') . "</td>
<td  id='' 				 style='width:5%'>" . number_format($totalinterespadado, '0', ',', '.') . "</td>
<td  id='' 				 style='width:5%'>" . number_format($TotalPagoSininteres, '0', ',', '.') . "</td>
<td  id='td_datos_6'	 style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_24'	 style='width:3%'>" . number_format($totalintereses, '0', ',', '.') . "</td>
<td  id='td_datos_7'	 style='width:5%'>" . number_format($deuda, '0', ',', '.') . "</td>
<td  id='' 				 style='width:3%'>" . $cuotas . "</td>
<td  id=''				 style='width:6%'>" . $nombrelocal . "</td>
<td  id='td_datos_15'  	 style='width:5%'>" . $nombrevendedor1 . "</td>
<td  id=''  	 style='width:5%'>" . $estadorefinanciado . "</td>
<td  id=''  	 style='width:5%'>" . $detalle_venta . "</td>


<td  id='td_datos_1' style='display:none'>" . $fecha_venta . "</td>
<td id='td_datos_13' style='display:none'>" . $num_factura . "</td>
<td  id='' 			style='display:none'>" . $nombrevendedor1 . " - " . $nombrevendedor2 . "</td>
<td  id='td_datos_3' style='display:none'>" . $Vendedor1 . "</td>
<td  id='td_datos_14' style='display:none'>" . $Vendedor2 . "</td>
<td  id='td_datos_15' style='display:none'>" . $nombrevendedor1 . "</td>
<td  id='td_datos_16' style='display:none'>" . $nombrevendedor2 . "</td>
<td  id='td_datos_4' style='display:none'>" . $cobradornombre . "</td>
<td  id='td_datos_8' style='display:none'>" . $cod_venta . "</td>
<td  id='td_datos_9' style='display:none'>" . $cod_usuarioFK . "</td>
<td  id='td_datos_10' style='display:none'>" . $cod_clienteFK . "</td>
<td  id='td_datos_11' style='display:none'>" . $cod_cobradorFK . "</td>
<td  id='td_datos_18' style='display:none'>" . $TipoPago . "</td>
<td  id='td_datos_19' style='display:none'>" . $cantidadcuota . "</td>
<td  id='td_datos_20' style='display:none'>" . number_format($Monto, '0', ',', '.') . "</td>
<td  id='td_datos_21' style='display:none'>" . $fechaprimerpago . "</td>
<td  id='td_datos_22' style='display:none'>" . $comision . "</td>
<td  id='td_datos_23' style='display:none'>" . $cod_local . "</td>
<td  id='td_datos_25' style='display:none'>" . number_format($intereses, '0', ',', '.') . "</td>
<td  id='td_datos_26' style='display:none'>" . $diasgracia . "</td>
<td  id='td_datos_27' style='display:none'>" . $nrodetalle . "</td>
<td  id='td_datos_30' style='display:none'>" . $idGaranteFk . "</td>
<td  id='td_datos_31' style='display:none'>" . $Garante . "</td>
<td  id='td_datos_32' style='display:none'>" . $nrodocliente . "</td>
<td  id='td_datos_33' style='display:none'>" . $nrodogarante . "</td>
<td  id='td_datos_35' style='display:none'>" . $tipo_comprobante . "</td>
<td  id='td_datos_36' style='display:none'>" . $puntoexpedicion . "</td>
<td  id='td_datos_37' style='display:none'>" . number_format($deudapendiente, '0', ',', '.') . "</td>
<td  id='td_datos_39' style='display:none'>" . $accesocredito . "</td>
<td  id='td_datos_100' style='display:none'>" . $insertadopor . "</td>
<td  id='td_datos_101' style='display:none'>" . $editadopor . "</td>
<td  id='td_datos_102' style='display:none'>" . $fecha_insert . "</td>
<td  id='td_datos_103' style='display:none'>" . $fecha_edit . "</td>
<td  id='td_datos_104' style='display:none'>" . $lat . "</td>
<td  id='td_datos_105' style='display:none'>" . $lot . "</td>
</tr>
</table>";
			}
		}
	}


	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $formato == "json" ? $filas : $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" => number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'), "99" => $nroRegistro);
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


function buscarexpedientescancelados($cliente, $buscar)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$sql = "Select fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
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
		from venta vt where vt.cod_clienteFK ='" . $cliente . "' 
        and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)>0 		";




	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
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
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
			$motivo = utf8_encode($valor['motivo']);
			$fechacancelacion = utf8_encode($valor['fechacancelacion']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$totalDescuentodetalle = utf8_encode($valor['totalDescuentodetalle']);

			$totalRegistro = $totalRegistro + 1;
			$totalpagado = $totalpagado + $pago;

			$totaldescuentos = $totalDescuentodetalle + $totaldescuento;
			$subtotalventa = $totalventadetalle - $totaldescuentos;
			$deuda = $subtotalventa - $totalpagado;

			$totalRegistro = $totalRegistro + 1;
			if ($deuda < 0) {
				$deuda = 0;
			} else {

				$deuda = $deuda - $totaldescuento;
			}


			$TotalVentas = $subtotalventa + $TotalVentas;
			$TotalPagos = $TotalPagos + $totalpagado;
			$TotalDeuda = $TotalDeuda + $deuda;
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'>
<td id='' style='width:10%'>" . $num_factura . "</td>
<td  id='' style='width:5%'>" . $cuotas . "</td>
<td  id='' style='width:10%'>" . $fecha_venta . "</td>
<td  id='' style='width:10%'>" . $fechacancelacion . "</td>
<td  id='' style='width:10%'>" . $motivo . "</td>
<td  id='' style='width:5%'>" . number_format($montodevuelto, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . number_format($totaldescuentos, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . number_format($subtotalventa, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . number_format($deuda, '0', ',', '.') . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" => number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'));
	echo json_encode($informacion);
	exit;
}

function historialventacancelado($filtrofecha, $fecha1, $fecha2, $nroventa, $cliente, $codlocal)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = " and cl.fecha>='$fecha1' and cl.fecha<='$fecha2'";
	}
	$condicionfiltrofecha = "";
	if ($filtrofecha != "") {
		$condicionfiltrofecha = "and cl.fecha='$fecha1'";
	}
	$condicioncodlocal = "";
	if ($codlocal != "") {
		$condicioncodlocal = "and vt.cod_local='$codlocal'";
	}
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = "and vt.num_factura like '%" . $nroventa . "%'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$sql = "Select vt.puntoexpedicion,vt.fecha_venta,vt.total_venta,vt.cod_usuarioFK,vt.cod_clienteFK,vt.num_factura,vt.cod_cobradorFK,vt.TipoVenta,vt.TipoPago,vt.cod_venta,vt.comision,vt.pago,
		 (Select nombre from vendedor where idvendedor=vt.Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=vt.Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=vt.cod_usuarioFK) as usuarionombre,
		(Select Calificacion from cliente where cod_cliente=vt.cod_clienteFK) as Calificacion,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
		IFNULL((Select trim(concat(IFNULL(nombre_persona,''),' ',IFNULL(apellido_persona,''))) from persona where cod_persona=cl.cod_usuario limit 1),'SIN REGISTRO') as usuarioanulo,
		IFNULL((Select GROUP_CONCAT(CONCAT(dtv.cantidad_detalle,' x ',IFNULL(NULLIF(pr.nombre_producto,''),dtv.detalleproducto)) SEPARATOR '<br>') from detalle_venta dtv left join producto pr on dtv.cod_productoFK=pr.cod_producto where dtv.cod_ventaFK=vt.cod_venta),'') as productos,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA') as cantidadcuota,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
			(Select count(cod_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta) as nrodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		cl.montodevuelto,cl.motivo,cl.fecha as fechacancelacion,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt inner join cancelaciones cl on cl.cod_venta=vt.cod_venta 
		where vt.fecha_venta!='0' " . $condicioncliente . $condicionnroventa . $condicioncodlocal . $condicionfiltrofecha . $condicionfecha . " limit 50 ";




	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
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
			$usuarionombre = utf8_encode($valor['usuarionombre']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$cod_venta = utf8_encode($valor['cod_venta']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$cantidadcuota = utf8_encode($valor['cantidadcuota']);
			$Monto = utf8_encode($valor['Monto']);
			$fechaprimerpago = utf8_encode($valor['fechaprimerpago']);
			$comision = utf8_encode($valor['comision']);
			$pago = utf8_encode($valor['pago']);
			$cantidadcambio = utf8_encode($valor['cantidadcambio']);
			$nrodetalle = utf8_encode($valor['nrodetalle']);
			$cantidaddevuelto = utf8_encode($valor['cantidaddevuelto']);
			$fechaultimopago = utf8_encode($valor['fechaultimopago']);
			$Calificacion = utf8_encode($valor['Calificacion']);
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
			$motivo = utf8_encode($valor['motivo']);
			$fechacancelacion = utf8_encode($valor['fechacancelacion']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$usuarioanulo = utf8_encode($valor['usuarioanulo']);
			$productos = utf8_encode($valor['productos']);
			if ($usuarioanulo == "") {
				$usuarioanulo = "SIN REGISTRO";
			}
			if ($productos == "") {
				$productos = "SIN PRODUCTOS";
			}
			$totalRegistro = $totalRegistro + 1;
			$totalpagado = $totalpagado + $pago;


			$deuda = $total_venta - $totalpagado;

			$totalRegistro = $totalRegistro + 1;
			if ($deuda < 0) {
				$deuda = 0;
			} else {
				$deuda = $deuda - $totaldescuento;
			}


			$TotalVentas = $total_venta + $TotalVentas;
			$TotalPagos = $TotalPagos + $totalpagado;
			$TotalDeuda = $TotalDeuda + $deuda;
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' style='min-width:1500px;' >
<tr id='tbSelecRegistro'>
<td  id='' style='width:8%'>" . $fecha_venta . "</td>
<td id='' style='width:8%'>" . $nrof . "</td>
<td  id='' style='width:10%'>" . $clientenombre . "</td>
<td  id='' style='width:16%;text-align:left;line-height:16px;'>" . $productos . "</td>
<td  id='' style='width:6%'>" . $cuotas . "</td>
<td  id='' style='width:10%'>" . $usuarioanulo . "</td>
<td  id='' style='width:8%'>" . $fechacancelacion . "</td>


<td  id='' style='width:7%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . number_format($totalpagado, '0', ',', '.') . "</td>

<td  id='' style='width:7%'>" . number_format($montodevuelto, '0', ',', '.') . "</td>
<td  id='' style='width:6%;text-align:left;'>" . $motivo . "</td>
<td  id='' style='width:7%'>" . $nombrelocal . "</td>
</tr>
</table>";
		}
	}

	$sql = "Select vt.puntoexpedicion,vt.fecha_venta,vt.total_venta,vt.cod_usuarioFK,vt.cod_clienteFK,vt.num_factura,vt.cod_cobradorFK,vt.TipoVenta,vt.TipoPago,vt.cod_venta,vt.comision,vt.pago,
		 (Select nombre from vendedor where idvendedor=vt.Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=vt.Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=vt.cod_usuarioFK) as usuarionombre,
		(Select Calificacion from cliente where cod_cliente=vt.cod_clienteFK) as Calificacion,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA') as cantidadcuota,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
			(Select count(cod_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta) as nrodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		cl.montodevuelto,cl.motivo,cl.fecha as fechacancelacion,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt inner join cancelaciones cl on cl.cod_venta=vt.cod_venta 
		where vt.fecha_venta!='0' " . $condicioncliente . $condicionnroventa . $condicioncodlocal . $condicionfiltrofecha . $condicionfecha;
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$totalregistro = $valor;

	mysqli_close($mysqli);

	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" =>  number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'), "99" => $nroRegistro, "100" => $totalregistro);
	echo json_encode($informacion);
	exit;
}

function mashistorialventacancelado($filtrofecha, $fecha1, $fecha2, $nroventa, $cliente, $codlocal, $registrocargado)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = " and cl.fecha>='$fecha1' and cl.fecha<='$fecha2'";
	}
	$condicionfiltrofecha = "";
	if ($filtrofecha != "") {
		$condicionfiltrofecha = "and cl.fecha='$fecha1'";
	}
	$condicioncodlocal = "";
	if ($codlocal != "") {
		$condicioncodlocal = "and vt.cod_local='$codlocal'";
	}
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = "and vt.num_factura like '%" . $nroventa . "%'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = "and (Select nombre_persona from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$sql = "Select vt.puntoexpedicion,vt.fecha_venta,vt.total_venta,vt.cod_usuarioFK,vt.cod_clienteFK,vt.num_factura,vt.cod_cobradorFK,vt.TipoVenta,vt.TipoPago,vt.cod_venta,vt.comision,vt.pago,
		 (Select nombre from vendedor where idvendedor=vt.Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=vt.Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=vt.cod_usuarioFK) as usuarionombre,
		(Select Calificacion from cliente where cod_cliente=vt.cod_clienteFK) as Calificacion,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
		IFNULL((Select trim(concat(IFNULL(nombre_persona,''),' ',IFNULL(apellido_persona,''))) from persona where cod_persona=cl.cod_usuario limit 1),'SIN REGISTRO') as usuarioanulo,
		IFNULL((Select GROUP_CONCAT(CONCAT(dtv.cantidad_detalle,' x ',IFNULL(NULLIF(pr.nombre_producto,''),dtv.detalleproducto)) SEPARATOR '<br>') from detalle_venta dtv left join producto pr on dtv.cod_productoFK=pr.cod_producto where dtv.cod_ventaFK=vt.cod_venta),'') as productos,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA') as cantidadcuota,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
			(Select count(cod_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta) as nrodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		cl.montodevuelto,cl.motivo,cl.fecha as fechacancelacion,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt inner join cancelaciones cl on cl.cod_venta=vt.cod_venta 
		where vt.fecha_venta!='0' " . $condicioncliente . $condicionnroventa . $condicioncodlocal . $condicionfiltrofecha . $condicionfecha . " limit " . $registrocargado . ", 50 ";




	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor + $registrocargado;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
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
			$usuarionombre = utf8_encode($valor['usuarionombre']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$cod_venta = utf8_encode($valor['cod_venta']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$cantidadcuota = utf8_encode($valor['cantidadcuota']);
			$Monto = utf8_encode($valor['Monto']);
			$fechaprimerpago = utf8_encode($valor['fechaprimerpago']);
			$comision = utf8_encode($valor['comision']);
			$pago = utf8_encode($valor['pago']);
			$cantidadcambio = utf8_encode($valor['cantidadcambio']);
			$nrodetalle = utf8_encode($valor['nrodetalle']);
			$cantidaddevuelto = utf8_encode($valor['cantidaddevuelto']);
			$fechaultimopago = utf8_encode($valor['fechaultimopago']);
			$Calificacion = utf8_encode($valor['Calificacion']);
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
			$motivo = utf8_encode($valor['motivo']);
			$fechacancelacion = utf8_encode($valor['fechacancelacion']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$usuarioanulo = utf8_encode($valor['usuarioanulo']);
			$productos = utf8_encode($valor['productos']);
			if ($usuarioanulo == "") {
				$usuarioanulo = "SIN REGISTRO";
			}
			if ($productos == "") {
				$productos = "SIN PRODUCTOS";
			}
			$totalRegistro = $totalRegistro + 1;
			$totalpagado = $totalpagado + $pago;


			$deuda = $total_venta - $totalpagado;

			$totalRegistro = $totalRegistro + 1;
			if ($deuda < 0) {
				$deuda = 0;
			} else {
				$deuda = $deuda - $totaldescuento;
			}


			$TotalVentas = $total_venta + $TotalVentas;
			$TotalPagos = $TotalPagos + $totalpagado;
			$TotalDeuda = $TotalDeuda + $deuda;
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));


			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' style='min-width:1500px;' >
<tr id='tbSelecRegistro'>
<td  id='' style='width:8%'>" . $fecha_venta . "</td>
<td id='' style='width:8%'>" . $nrof . "</td>
<td  id='' style='width:10%'>" . $clientenombre . "</td>
<td  id='' style='width:16%;text-align:left;line-height:16px;'>" . $productos . "</td>
<td  id='' style='width:6%'>" . $cuotas . "</td>
<td  id='' style='width:10%'>" . $usuarioanulo . "</td>
<td  id='' style='width:8%'>" . $fechacancelacion . "</td>


<td  id='' style='width:7%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . number_format($totalpagado, '0', ',', '.') . "</td>

<td  id='' style='width:7%'>" . number_format($montodevuelto, '0', ',', '.') . "</td>
<td  id='' style='width:6%;text-align:left;'>" . $motivo . "</td>
<td  id='' style='width:7%'>" . $nombrelocal . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" =>  number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'), "99" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}

function buscarclientesincativos($zona, $documento, $cliente, $nrotelefono, $Vendedor, $Local)
{
	$mysqli = conectar_al_servidor();
	$totalRegistro = 0;
	$pagina = "";
	$fechahoy = date('Y-m-d');
	$condicionVendedor = "";
	if ($Vendedor != "") {
		$condicionVendedor = " and (Select idvendedor from vendedor where idvendedor=vt.Vendedor1 )= $Vendedor ";
	}

	$condicionlocal = "";
	if ($Local != "SELECCIONAR") {
		$condicionlocal = " and (Select cod_local from local where cod_local=vt.cod_local )= $Local ";
	}

	$condicionzona = "";
	if ($zona != "") {
		$condicionzona = " and (Select count(cod_cliente) from cliente where cod_cliente=cod_clienteFK  and idzonaFk='$zona') > 0";
	}
	$condiciondocumento = "";
	if ($documento != "") {
		$condiciondocumento = " and (Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK ) = '$documento'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$condicionnrotele = "";
	if ($nrotelefono != "") {
		$condicionnrotele = " and (Select telefono from persona where cod_persona=vt.cod_clienteFK)= '$nrotelefono'";
	}

	$sql = "Select vt.fecha_venta,(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,vt.cod_clienteFK,
(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK ) as nrodocliente,
(Select whapp from cliente where cod_cliente=vt.cod_clienteFK ) as whapp,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
(Select fecha_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ) as UltimaVenta
from  venta vt
inner join pago pg on pg.cod_venta_fk=vt.cod_venta
where
vt.cod_clienteFK!='10' and pg.Fecha < date_format(date_add(NOW(), INTERVAL -2 MONTH), '%Y/%m/%d') and  
(select sum(Monto-descuento) from credito where cod_venta=
(Select cod_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ))-
(select sum(Monto) from pago where cod_venta_fk=
(Select cod_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ) and Tipo='Pago Cuota')=0  " . $condicionzona . $condiciondocumento . $condicioncliente . $condicionnrotele . $condicionVendedor . $condicionlocal . "
group by vt.cod_clienteFK  limit 50";

	// echo($sql);
	// exit;

	$styleName = "tableRegistroSearch";
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha_venta = $valor['fecha_venta'];
			$clientenombre = utf8_encode($valor['clientenombre']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$whapp = utf8_encode($valor['whapp']);
			$telefono = utf8_encode($valor['telefono']);
			$UltimaVenta = utf8_encode($valor['UltimaVenta']);
			$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistrosms' name='trEnviosms' onclick='obtenerdatosvistaclienteinactivo(this)'>
<td  id='td_id' style='display:none'>" . $cod_clienteFK . "</td>
<td  style='width:20%'>" . $nrodocliente . "</td>
<td  style='width:20%'>" . $clientenombre . "</td>
<td id='td_nro' style='width:20%'>" . $telefono . "</td>
<td  style='width:20%'>" . $whapp . "</td>
<td  style='width:20%'>" . $UltimaVenta . "</td>
</tr>
</table>";
		}
	}
	$sql = "Select vt.fecha_venta
from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta 
inner join pago pg on pg.cod_venta_fk=vt.cod_venta
where
vt.cod_clienteFK!='10' and pg.Fecha < date_format(date_add(NOW(), INTERVAL -2 MONTH), '%Y/%m/%d') and  
(select sum(Monto-descuento) from credito where cod_venta=
(Select cod_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ))-
(select sum(Monto) from pago where cod_venta_fk=
(Select cod_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ) and Tipo='Pago Cuota')=0
 " . $condicionzona . $condiciondocumento . $condicioncliente . $condicionnrotele . $condicionVendedor . $condicionlocal . "
group by vt.cod_clienteFK ";
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
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" => number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'), "99" => $nroRegistro, "100" => $totalregistro);
	echo json_encode($informacion);
	exit;
}

function buscarmasclientesincativos($zona, $documento, $cliente, $nrotelefono, $registrocargado, $Vendedor, $Local)
{
	$mysqli = conectar_al_servidor();
	$totalRegistro = 0;
	$pagina = "";

	$condicionVendedor = "";
	if ($Vendedor != "") {
		$condicionVendedor = " and (Select idvendedor from vendedor where idvendedor=vt.Vendedor1 )= $Vendedor ";
	}

	$condicionlocal = "";
	if ($Local != "SELECCIONAR") {
		$condicionlocal = " and (Select cod_local from local where cod_local=vt.cod_local )= $Local ";
	}

	$condicionzona = "";
	if ($zona != "") {
		$condicionzona = " and (Select count(cod_cliente) from cliente where cod_cliente=cod_clienteFK  and idzonaFk='$zona') > 0";
	}
	$condiciondocumento = "";
	if ($documento != "") {
		$condiciondocumento = " and (Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK ) = '$documento'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$condicionnrotele = "";
	if ($nrotelefono != "") {
		$condicionnrotele = " and (Select telefono from persona where cod_persona=vt.cod_clienteFK)= '$nrotelefono'";
	}

	$sql = "Select vt.fecha_venta,(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,vt.cod_clienteFK,
(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK ) as nrodocliente,
(Select whapp from cliente where cod_cliente=vt.cod_clienteFK ) as whapp,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
(Select fecha_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ) as UltimaVenta
from  venta vt
inner join pago pg on pg.cod_venta_fk=vt.cod_venta
where
vt.cod_clienteFK!='10' and pg.Fecha < date_format(date_add(NOW(), INTERVAL -2 MONTH), '%Y/%m/%d') and  
(select sum(Monto-descuento) from credito where cod_venta=
(Select cod_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ))-
(select sum(Monto) from pago where cod_venta_fk=
(Select cod_venta from venta v where v.cod_clienteFK=vt.cod_clienteFK order by fecha_venta desc limit 1 ) and Tipo='Pago Cuota')=0 
 " . $condicionzona . $condiciondocumento . $condicioncliente . $condicionnrotele . $condicionVendedor . $condicionlocal . "
group by vt.cod_clienteFK order by fecha_venta desc limit " . $registrocargado . ", 50";




	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor + $registrocargado;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
	$styleName = "tableRegistroSearch";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha_venta = $valor['fecha_venta'];
			$clientenombre = utf8_encode($valor['clientenombre']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$whapp = utf8_encode($valor['whapp']);
			$UltimaVenta = utf8_encode($valor['UltimaVenta']);
			$telefono = utf8_encode($valor['telefono']);
			$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName'  border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistrosms' name='trEnviosms' onclick='obtenerdatosvistaclienteinactivo(this)'>
<td  id='td_id' style='display:none'>" . $cod_clienteFK . "</td>
<td  style='width:20%'>" . $nrodocliente . "</td>
<td  style='width:20%'>" . $clientenombre . "</td>
<td id='td_nro' style='width:20%'>" . $telefono . "</td>
<td  style='width:20%'>" . $whapp . "</td>
<td  style='width:20%'>" . $UltimaVenta . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" => number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'), "99" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}

function buscarexpedientes($buscar)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";

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


			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0];
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			// $datos[5]=$TotalDiasAtrasado;
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
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

			if ($idGaranteFk == $buscar) {
				$styleGrilla = "background-color:#d1c885;color:#fff";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' style='$styleGrilla' onclick='obtenerdatosexpendientecliente(this)' >
<td  id='' style='width:8%'>" . $fecha_venta . "</td>
<td  id='' style='width:8%'>" . $nrof . "</td>
<td  id='td_datos_1' style='width:8%'>" . $cod_cliente . " - " . $clientenombre . "</td>
<td  id='' style='width:8%'>" . $GaranteDocumento . " - " . $Garante . "</td>
<td  id='td_datos_3' style='width:8%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totaldescuentos, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($subTotal, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totalintereses, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($deuda, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . $cuotas . "</td>
<td  id='' style='width:8%'>" . $nombrelocal . "</td>
<td  id='td_id_1' style='display:none'>" . $cod_venta . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($totalVenta, '0', ',', '.'), "5" =>  number_format($totalPagado, '0', ',', '.'), "6" => number_format($totalDeuda, '0', ',', '.'));
	echo json_encode($informacion);
	exit;
}
function buscarexpedientesventasfinalizadas($buscar)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";

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
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))>=total_venta";





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


			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0];
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			// $datos[5]=$TotalDiasAtrasado;
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
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

			if ($idGaranteFk == $buscar) {
				$styleGrilla = "background-color:#d1c885;color:#fff";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' style='$styleGrilla' onclick='obtenerdatosexpendientecliente(this)' >
<td  id='' style='width:8%'>" . $fecha_venta . "</td>
<td  id='' style='width:8%'>" . $nrof . "</td>
<td  id='td_datos_1' style='width:8%'>" . $cod_cliente . " - " . $clientenombre . "</td>
<td  id='' style='width:8%'>" . $GaranteDocumento . " - " . $Garante . "</td>
<td  id='td_datos_3' style='width:8%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totaldescuentos, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($subTotal, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totalintereses, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($deuda, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . $cuotas . "</td>
<td  id='' style='width:8%'>" . $nombrelocal . "</td>
<td  id='td_id_1' style='display:none'>" . $cod_venta . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($totalVenta, '0', ',', '.'), "5" =>  number_format($totalPagado, '0', ',', '.'), "6" => number_format($totalDeuda, '0', ',', '.'));
	echo json_encode($informacion);
	exit;
}
function buscarexpedientesventaspendientes($buscar)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";

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
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))<total_venta";






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


			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0];
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			// $datos[5]=$TotalDiasAtrasado;
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
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

			if ($idGaranteFk == $buscar) {
				$styleGrilla = "background-color:#d1c885;color:#fff";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' style='$styleGrilla' onclick='obtenerdatosexpendientecliente(this)' >
<td  id='' style='width:8%'>" . $fecha_venta . "</td>
<td  id='' style='width:8%'>" . $nrof . "</td>
<td  id='td_datos_1' style='width:8%'>" . $cod_cliente . " - " . $clientenombre . "</td>
<td  id='' style='width:8%'>" . $GaranteDocumento . " - " . $Garante . "</td>
<td  id='td_datos_3' style='width:8%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totaldescuentos, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($subTotal, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totalintereses, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . number_format($deuda, '0', ',', '.') . "</td>
<td  id='' style='width:8%'>" . $cuotas . "</td>
<td  id='' style='width:8%'>" . $nombrelocal . "</td>
<td  id='td_id_1' style='display:none'>" . $cod_venta . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($totalVenta, '0', ',', '.'), "5" =>  number_format($totalPagado, '0', ',', '.'), "6" => number_format($totalDeuda, '0', ',', '.'));
	echo json_encode($informacion);
	exit;
}

function buscarcantidadcuotapagados($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "select count(vt.num_factura) as cuotas
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar'
 and  ((cr.Monto-cr.descuento)-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0))<=0
 and plazo!='ENTREGA'";




	$cuotas = "0";
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$controlStyle = "";
	$controlVentas = "";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {



			$cuotas = utf8_encode($valor['cuotas']);
		}
	}
	mysqli_close($mysqli);
	return $cuotas;
}

function actualizarTotalEnVenta($idcredito, $total, $totalinteres, $totaldeuda)
{

	$mysqli = conectar_al_servidor();
	$consulta1 = "Update credito set total=?,totalinteres=?,totaldeuda=? where idcredito=?";
	$stmt1 = $mysqli->prepare($consulta1);
	$ss = 'ssss';
	$stmt1->bind_param($ss, $total, $totalinteres, $totaldeuda, $idcredito);
	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	mysqli_close($mysqli);
}

function ganaciaventa($nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";

	$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	if ($cod_local == "") {
		$condicionCodLocal = " ";
	}
	$condiciontipoventa = "";
	if ($tipoventa != "") {
		$condiciontipoventa = " and TipoVenta='$tipoventa'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = " and num_factura like '%" . $nroventa . "%'";
	}
	$condicionrodocumento = "";
	if ($nrodocumento != "") {
		$condicionrodocumento = " and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) = '" . $nrodocumento . "'";
	}

	$condicionfechafiltro = "";
	if ($fechafiltro != "") {
		$condicionfechafiltro = " and fecha_venta>='" . $fechafiltro . "' ";
	}
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and fecha_venta between '" . $fecha1 . "' and '" . $fecha2 . "'";
	}


	$sql = "Select fecha_venta,total_venta,num_factura,puntoexpedicion,vt.TipoVenta,
	 (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
	  (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		IFNULL((select sum(dtv1.comision) from detalle_venta dtv1  where vt.cod_venta=dtv1.cod_ventaFK),0) as comisionvendedor,
		(select count(idcredito) from credito where cod_venta = vt.cod_venta) as plazo,
				IFNULL((select sum(dtv2.subPrecioCompra*dtv2.cantidad_detalle) from detalle_venta dtv2  where vt.cod_venta=dtv2.cod_ventaFK),0) as costototal,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) as totalpagado,
		IFNULL((select sum((pg2.comision*pg2.monto)/100) from pago pg2  where vt.cod_venta=pg2.cod_venta_fk),0) as comisioncobrador
		from venta vt  where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 
		" . $condicioncliente . $condicionnroventa . $condicionrodocumento . $condicionfechafiltro . $condicionfecha . $condicionCodLocal . $condiciontipoventa . "
		limit 50";
		
		
		// echo $sql;
		// exit;
		
	$totalescosto = 0;
	$totalescomision = 0;
	$totalespagado = 0;
	$totalesevaluacion = 0;

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}


	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$styleName = "tableRegistroSearch";

	$TotalVenta = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha_venta = $valor['fecha_venta'];
			$total_venta = $valor['total_venta'];
			$num_factura = utf8_encode($valor['num_factura']);
			$comisionvendedor = utf8_encode($valor['comisionvendedor']);
			$costototal = utf8_encode($valor['costototal']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$comisioncobrador = utf8_encode($valor['comisioncobrador']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$TipoVenta = utf8_encode($valor['TipoVenta']);
			$plazo = utf8_encode($valor['plazo']);
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			$evaluacion = $totalpagado - ($costototal + $comisionvendedor + $comisioncobrador);
			if ($evaluacion < 0) {
				$evaluacion = 0;
			}
			$totalescosto = $totalescosto + $costototal;
			$totalescomision = $totalescomision + $comisioncobrador + $comisionvendedor;
			$totalespagado = $totalespagado + $totalpagado;
			$totalesevaluacion = $totalesevaluacion + $evaluacion;
			$TotalVenta = $TotalVenta + $total_venta;
			$diferencia = $total_venta - $costototal;
			$diferencia = ($diferencia);

			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'  >
<td id='' style='width:7%'>" . $nrof . "</td>
<td id='' style='width:12%'>" . $clientenombre . "</td>
<td id='' style='width:6%'>" . $nrodocliente . "</td>
<td  id='' style='width:7%'>" . $fecha_venta . "</td>
<td  id='' style='display:none'>" . number_format($comisionvendedor, '0', ',', '.') . "</td>
<td  id='' style='display:none'>" . number_format($comisioncobrador, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . $plazo . "</td>
<td  id='' style='width:7%'>" . number_format($diferencia, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . number_format($costototal, '0', ',', '.') . "</td>
<td  id='' style='width:6%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='' style='width:6%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . number_format($evaluacion, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . $TipoVenta . "</td>
<td  id='' style='width:7%'>" . $nombrelocal . "</td>
</tr>
</table>";
		}
	}
	$sql = "Select fecha_venta,total_venta,num_factura,puntoexpedicion,vt.TipoVenta,
	 (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
	  (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		IFNULL((select sum(dtv1.comision) from detalle_venta dtv1  where vt.cod_venta=dtv1.cod_ventaFK),0) as comisionvendedor,
				IFNULL((select sum(dtv2.subPrecioCompra*dtv2.cantidad_detalle) from detalle_venta dtv2  where vt.cod_venta=dtv2.cod_ventaFK),0) as costototal,
				(select count(idcredito) from credito where cod_venta = vt.cod_venta) as plazo,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) as totalpagado,
		IFNULL((select sum((pg2.comision*pg2.monto)/100) from pago pg2  where vt.cod_venta=pg2.cod_venta_fk),0) as comisioncobrador
		from venta vt  where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 
		" . $condicioncliente . $condicionnroventa . $condicionrodocumento . $condicionfechafiltro . $condicionfecha . $condicionCodLocal . $condiciontipoventa;
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
	$informacion = array("1" => "exito", "2" => $pagina, "3" => number_format($totalescosto, '0', ',', '.'), "4" => number_format($totalescomision, '0', ',', '.'), "5" => number_format($totalespagado, '0', ',', '.'), "6" => number_format($totalesevaluacion, '0', ',', '.'), "7" => $nroRegistro, "8" => number_format($TotalVenta, '0', ',', '.'), "99" => $nroRegistro, "100" => $totalregistro);
	echo json_encode($informacion);
	exit;
}

function masganaciaventa($costoTotal, $VentaTotal, $nroventa, $fecha1, $fecha2, $cliente, $nrodocumento, $fechafiltro, $cod_local, $tipoventa, $totalcostos, $totalcomision, $totalpagado, $totalevaluacion, $registrocargado)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";

	$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	if ($cod_local == "") {
		$condicionCodLocal = " ";
	}
	$condiciontipoventa = "";
	if ($tipoventa != "") {
		$condiciontipoventa = " and TipoVenta='$tipoventa'";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = " and num_factura like '%" . $nroventa . "%'";
	}
	$condicionrodocumento = "";
	if ($nrodocumento != "") {
		$condicionrodocumento = " and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) = '" . $nrodocumento . "'";
	}

	$condicionfechafiltro = "";
	if ($fechafiltro != "") {
		$condicionfechafiltro = " and fecha_venta>='" . $fechafiltro . "' ";
	}
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and fecha_venta>='" . $fecha1 . "' and fecha_venta<='" . $fecha2 . "'";
	}


	$sql = "Select fecha_venta,total_venta,num_factura,puntoexpedicion,vt.TipoVenta,
	 (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
	  (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		IFNULL((select sum(dtv1.comision) from detalle_venta dtv1  where vt.cod_venta=dtv1.cod_ventaFK),0) as comisionvendedor,
		(select count(idcredito) from credito where cod_venta = vt.cod_venta) as plazo,
				IFNULL((select sum(dtv2.subPrecioCompra*dtv2.cantidad_detalle) from detalle_venta dtv2  where vt.cod_venta=dtv2.cod_ventaFK),0) as costototal,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) as totalpagado,
		IFNULL((select sum((pg2.comision*pg2.monto)/100) from pago pg2  where vt.cod_venta=pg2.cod_venta_fk),0) as comisioncobrador
		from venta vt  where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 
		" . $condicioncliente . $condicionnroventa . $condicionrodocumento . $condicionfechafiltro . $condicionfecha . $condicionCodLocal . $condiciontipoventa . "
		limit " . $registrocargado . " , 50 ";






	$totalescosto = $totalcostos;
	$totalescomision = $totalcomision;
	$totalespagado = $totalpagado;
	$totalesevaluacion = $totalevaluacion;

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


			$fecha_venta = $valor['fecha_venta'];
			$total_venta = $valor['total_venta'];
			$num_factura = utf8_encode($valor['num_factura']);
			$comisionvendedor = utf8_encode($valor['comisionvendedor']);
			$costototal = utf8_encode($valor['costototal']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$comisioncobrador = utf8_encode($valor['comisioncobrador']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$TipoVenta = utf8_encode($valor['TipoVenta']);
			$plazo = utf8_encode($valor['plazo']);
			$VentaTotal = $VentaTotal + $total_venta;
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			$evaluacion = $totalpagado - ($costototal + $comisionvendedor + $comisioncobrador);
			if ($evaluacion < 0) {
				$evaluacion = 0;
			}
			$totalescosto = $totalescosto + $costototal;
			$totalescomision = $totalescomision + $comisioncobrador + $comisionvendedor;
			$totalespagado = $totalespagado + $totalpagado;
			$totalesevaluacion = $totalesevaluacion + $evaluacion;

			$diferencia = $total_venta - $costototal;
			$diferencia = ($diferencia);

			$fecha_venta = date("d-m-Y", strtotime($fecha_venta));

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro'  >
<td id='' style='width:7%'>" . $nrof . "</td>
<td id='' style='width:12%'>" . $clientenombre . "</td>
<td id='' style='width:6%'>" . $nrodocliente . "</td>
<td  id='' style='width:7%'>" . $fecha_venta . "</td>
<td  id='' style='display:none'>" . number_format($comisionvendedor, '0', ',', '.') . "</td>
<td  id='' style='display:none'>" . number_format($comisioncobrador, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . $plazo . "</td>
<td  id='' style='width:7%'>" . number_format($diferencia, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . number_format($costototal, '0', ',', '.') . "</td>
<td  id='' style='width:6%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='' style='width:6%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='' style='width:7%'>" . number_format($evaluacion, '0', ',', '.') . "</td>
<td  id='' style='width:5%'>" . $TipoVenta . "</td>
<td  id='' style='width:7%'>" . $nombrelocal . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $pagina, "3" => number_format($totalescosto, '0', ',', '.'), "4" => number_format($totalescomision, '0', ',', '.'), "5" => number_format($totalespagado, '0', ',', '.'), "6" => number_format($totalesevaluacion, '0', ',', '.'), "8" => number_format($VentaTotal, '0', ',', '.'), "7" => $nroRegistro, "99" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}


function buscarCambiosRealizados($fechafiltro, $fecha1, $fecha2, $nrofactura, $cod_local)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$condicionCodLocal = " and (Select cod_local from venta where cam.cod_venta=venta.cod_venta)='$cod_local' ";
	if ($cod_local == "") {
		$condicionCodLocal = " ";
	}
	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = "and fecha>='" . $fecha1 . "' and fecha<='" . $fecha2 . "'";
	}
	$condicionFiltrofecha = "";
	if ($fechafiltro != "") {
		$condicionFiltrofecha = "and fecha='" . $fecha1 . "'";
	}
	$condicionnrofactura = "";
	if ($nrofactura != "") {
		$condicionnrofactura = "and (Select num_factura from venta where cam.cod_venta=venta.cod_venta) like '%" . $nrofactura . "%'";
	}


	$sql = "Select idcambios,motivo,fecha,cant,cod_producto,cod_venta,
		 (Select Nombre from local l where l.cod_local=(Select cod_local from venta where cam.cod_venta=venta.cod_venta)) as nombrelocal,
	   (Select num_factura from venta where cam.cod_venta=venta.cod_venta) as num_factura,
	   (Select puntoexpedicion from venta where cam.cod_venta=venta.cod_venta) as puntoexpedicion,
	   (Select nombre_producto from producto where producto.cod_producto=cam.cod_producto) as nombreproducto
		 from cambios cam
		 where cod_venta!='-1' " . $condicionCodLocal . $condicionfecha . $condicionFiltrofecha . $condicionnrofactura . " group by cod_producto,cod_venta ";





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


			$idcambios = $valor['idcambios'];
			$motivo = $valor['motivo'];
			$fecha = utf8_encode($valor['fecha']);
			$cod_producto = utf8_encode($valor['cod_producto']);
			$num_factura = utf8_encode($valor['num_factura']);
			$cod_venta = utf8_encode($valor['cod_venta']);
			$nombreproducto = utf8_encode($valor['nombreproducto']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);

			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			if ($buscar == "Cambio") {
				$styleName = CargarStyleTable($styleName);
				$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr  >
<td id='td_datos_13' style='width:10%'>" . $nrof . "</td>
<td  id='td_datos_1' style='width:10%'>" . $fecha . "</td>
<td  id='td_datos_2' style='width:10%'>" . $nombreproducto . "</td>
<td  id='td_datos_2' style='width:10%'>" . buscarDatosDetallesVentaHistorialCambios($cod_venta) . "</td>
<td  id='td_datos_3' style='width:10%'>" . $motivo . "</td>
<td  id='td_datos_3' style='width:10%'>" . $nombrelocal . "</td>
</tr>
		</table>";
			}
			if ($buscar == "Garantia" || $buscar == "Devolucion") {
				$styleName = CargarStyleTable($styleName);
				$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr  >
<td id='td_datos_13' style='width:10%'>" . $nrof . "</td>
<td  id='td_datos_1' style='width:10%'>" . $fecha . "</td>
<td  id='td_datos_2' style='width:10%'>" . $nombreproducto . "</td>
<td  id='td_datos_3' style='width:10%'>" . $motivo . "</td>
<td  id='td_datos_3' style='width:10%'>" . $nombrelocal . "</td>
</tr>
</table>";
			}
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}

function buscarCambiosRealizadosExt($buscar, $motivo)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";


	$sql = "Select cmp.fecha,vt.num_factura,vt.puntoexpedicion,pr.nombre_producto,dt.cant,
		 (Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		 (Select nombre_producto from producto pr1 where pr1.cod_producto=cmp.cod_productoFK) as nombreproductocambiado
		 from detallescambio dt inner join cambiarproducto cmp on cmp.idcambiarproducto=dt.idcambiarproductoFK
		 inner join producto pr on pr.cod_producto=dt.cod_productoFK 
		 inner join venta vt on vt.cod_venta=cmp.cod_ventaFK";







	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$controlNombres = "";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha = utf8_encode($valor['fecha']);
			$num_factura = utf8_encode($valor['num_factura']);
			$nombre_producto = utf8_encode($valor['nombre_producto']);
			$cant = utf8_encode($valor['cant']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$nombreproductocambiado = utf8_encode($valor['nombreproductocambiado']);
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			if ($controlNombres != $nombre_producto) {
				$tituloProducto = $nombre_producto;
				$controlNombres = $nombre_producto;
			} else {
				$tituloProducto = "### ### ###";
			}
			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr  >
<td id='' style='width:10%'>" . $nrof . "</td>
<td  id='' style='width:10%'>" . $fecha . "</td>
<td  id='' style='width:10%'>" . $tituloProducto . "</td>
<td  id='' style='width:10%'>" . $nombreproductocambiado . "</td>
<td  id='' style='width:10%'>" . $nombrelocal . "</td>
</tr>
		</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}

function buscarDatosDetallesVentaHistorialCambios($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "select pr.nombre_producto
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where dtv.cod_ventaFK='$buscar'";

	$productos = "";

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
			if ($productos == "") {
				$productos = $nombre_producto;
			} else {
				$productos = $productos . ", " . $nombre_producto;
			}
		}
	}
	mysqli_close($mysqli);
	return $productos;
}


function buscarnroventa()
{


	$mysqli = conectar_al_servidor();
	$sql = "Select count(cod_venta) from venta ";
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$NroVenta = $result->fetch_row();
	$NroVenta = $NroVenta[0];
	$NroVenta = $NroVenta;
	if ($NroVenta < 10) {
		$NroVenta = "0000" . $NroVenta;
	} else {
		if ($NroVenta < 100) {
			$NroVenta = "000" . $NroVenta;
		} else {
			if ($NroVenta < 1000) {
				$NroVenta = "00" . $NroVenta;
			}
		}
	}
	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $NroVenta);
	echo json_encode($informacion);
	exit;
}


function buscarnroventab()
{


	$mysqli = conectar_al_servidor();
	$sql = "Select count(cod_venta) from venta ";
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$NroVenta = $result->fetch_row();
	$NroVenta = $NroVenta[0];
	$NroVenta = $NroVenta;
	if ($NroVenta < 10) {
		$NroVenta = "000000" . $NroVenta;
	} else {
		if ($NroVenta < 100) {
			$NroVenta = "00000" . $NroVenta;
		} else {
			if ($NroVenta < 1000) {
				$NroVenta = "0000" . $NroVenta;
			} else {
				if ($NroVenta < 10000) {
					$NroVenta = "000" . $NroVenta;
				} else {
					if ($NroVenta < 100000) {
						$NroVenta = "00" . $NroVenta;
					} else {
						if ($NroVenta < 1000000) {
							$NroVenta = "0" . $NroVenta;
						}
					}
				}
			}
		}
	}
	mysqli_close($mysqli);
	return $NroVenta;
}


function buscarticket($cod_venta)
{

	$totalPagado = buscartotalpagob($cod_venta);
	$totalEntrega = buscartotalpagoc($cod_venta);
	$totalPagado = $totalPagado + $totalEntrega;
	$totalVenta = buscartotalventa($cod_venta);
	$paginaticket = buscar_detalles_venta($cod_venta);
	$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
	$totalDeuda = $datos[4];
	$datosventa = buscardatosventaticket($cod_venta);
	$tituloCuota = $datosventa[0];
	$monto = $datosventa[1];
	$informacion = array("1" => "exito", "2" => number_format($totalPagado, '0', ',', '.'), "3" =>  number_format($totalVenta, '0', ',', '.'), "4" =>  number_format($totalDeuda, '0', ',', '.'), "5" => $paginaticket, "6" => $tituloCuota, "7" => $monto, "8" =>  number_format($totalEntrega, '0', ',', '.'));
	echo json_encode($informacion);
	exit;
}

/*Buscar */
function buscartotalventa($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "select (total_venta-descuento) as totalVenta from venta where cod_venta='$buscar'";/*Sentencia para buscar registros*/
	$totalVenta = 0;
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



			$totalVenta = utf8_encode($valor['totalVenta']);/*Obtenemos el registro mediante el nombre del atributo */
		}
	}
	mysqli_close($mysqli);
	return $totalVenta;
}


function buscartotalpagob($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "select sum(pg.Monto) as totalpago
 from pago pg 
 where pg.cod_venta_fk='$buscar'";/*Sentencia para buscar registros*/

	$totalpago = 0;
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



			$totalpago = utf8_decode($valor['totalpago']);/*Obtenemos el registro mediante el nombre del atributo */
		}
	}
	mysqli_close($mysqli);
	return $totalpago;
}


function buscartotalpagoc($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "select vt.pago as totalEntrega
 from venta vt 
 where vt.cod_venta='$buscar'";/*Sentencia para buscar registros*/

	$totalpago = 0;
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



			$totalpago = utf8_decode($valor['totalEntrega']);/*Obtenemos el registro mediante el nombre del atributo */
		}
	}
	mysqli_close($mysqli);
	return $totalpago;
}


function buscar_detalles_venta($buscar, $formato="html")
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
	$productos = array();
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
				$productos[] = $nombre_producto;
				$pagina .= "<table class='tableTicket'>
<tr>
<td style='width:100%'>" . $nombre_producto . "</td>
</tr>
</table>";
			}
		}
	}
	mysqli_close($mysqli);
	if ($formato == "array") {
		return array(
			"html" => $pagina,
			"productos" => $productos,
			"resumen" => implode(" ", $productos)
		);
	}
	return $pagina;
}



function buscardatosventaticket($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "Select 
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta
		from venta vt where vt.cod_venta=?";


	$datos[0] = "";
	$datos[1] = "";



	$stmt = $mysqli->prepare($sql);
	$s = 's';
	//$buscar="".$buscar."";
	$stmt->bind_param($s, $buscar);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$nroCouta = $valor['nroCouta'];
			$Monto = number_format($valor['Monto'], '0', ',', '.');

			$cuotaspagadas = buscarcantidadcuotapagados($buscar);
			$datos[0] = $nroCouta . "/" . $cuotaspagadas;
			$datos[1] = $Monto;
		}
	}
	mysqli_close($mysqli);
	return $datos;
}

function historialvistaventa($buscar, $filtro)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$condicion = "";
	if ($filtro == "1") {
		$condicion = " (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "2") {
		$condicion = " (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "3") {
		$condicion = " (Select rut_cliente from cliente where cod_cliente=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "4") {
		$condicion = " (Select telefono from persona where cod_persona=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "5") {
		$condicion = " num_factura like '%" . $buscar . "%' ";
	}

	$sql = "Select puntoexpedicion,tipo_comprobante,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
	   (Select sum(Monto) from credito where cod_venta=vt.cod_venta and plazo='ENTREGA' ) as entrega,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocumento,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		IFNULL((select sum(dtv.descuento) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK),0) as totaldescuentodetalles,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt where " . $condicion . " and (SELECT count(idcancelaciones) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 order by fecha_venta desc limit 100 ";


	// echo($sql);
	// exit;

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {

			$entrega = $valor['entrega'];
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
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuentodetalles = utf8_encode($valor['totaldescuentodetalles']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$totaldescuentoaplicados = $totaldescuentodetalles + $totaldescuento;
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocumento = utf8_encode($valor['nrodocumento']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$totalpagado = $totalpagado + $pago;
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}


			$fecha_venta2 = date("d-m-Y", strtotime($fecha_venta));

			$subtotal = $totalventadetalle - $totaldescuentoaplicados;
			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaventa(this)'  >
<td style='width:15%'>" . $nrof . "</td>
<td  id='td_datos_1' style='display:none'>" . $fecha_venta . "</td>
<td    style='width:10%'>" . $fecha_venta2 . "</td>
<td id='td_datos_13' style='display:none'>" . $num_factura . "</td>
<td id='td_datos_12' style='width:5%'>" . $TipoVenta . "</td>
<td  id='td_datos_2' style='width:20%'>" . $clientenombre . "</td>
<td  id='td_datos_2' style='width:10%'>" . $nrodocumento . "</td>
<td  id='td_datos_3' style='display:none'>" . $Vendedor1 . "</td>
<td  id='td_datos_14' style='display:none'>" . $Vendedor2 . "</td>
<td  id='td_datos_15' style='display:none'>" . $nombrevendedor1 . "</td>
<td  id='td_datos_16' style='display:none'>" . $nombrevendedor2 . "</td>
<td  id='td_datos_4' style='display:none'>" . $cobradornombre . "</td>
<td  id='' style='width:10%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:10%'>" . number_format($totaldescuentoaplicados, '0', ',', '.') . "</td>
<td  id='' style='width:10%'>" . number_format($subtotal, '0', ',', '.') . "</td>
<td  id='' style='display:none'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_8' style='display:none'>" . $cod_venta . "</td>
<td  id='td_datos_9' style='display:none'>" . $cod_usuarioFK . "</td>
<td  id='td_datos_10' style='display:none'>" . $cod_clienteFK . "</td>
<td  id='td_datos_11' style='display:none'>" . $cod_cobradorFK . "</td>
<td  id='td_datos_18' style='display:none'>" . $TipoPago . "</td>
<td  id='td_datos_19' style='display:none'>" . $cantidadcuota . "</td>
<td  id='td_datos_20' style='display:none'>" . number_format($Monto, '0', ',', '.') . "</td>
<td  id='td_datos_21' style='display:none'>" . $fechaprimerpago . "</td>
<td  id='td_datos_22' style='display:none'>" . $comision . "</td>
<td  id='td_datos_23' style='display:none'>" . $cod_local . "</td>
<td  id='td_datos_27' style='display:none'>" . $nrodetalle . "</td>
<td  id='td_datos_30' style='display:none'>" . $idGaranteFk . "</td>
<td  id='td_datos_31' style='display:none'>" . $Garante . "</td>
<td  id='td_datos_32' style='display:none'>" . $tipo_comprobante . "</td>
<td  id='td_datos_33' style='display:none'>" . $puntoexpedicion . "</td>
<td  id='td_datos_34' style='display:none'>" . $accesocredito . "</td>
<td  id='td_datos_35' style='display:none'>" . number_format($entrega, '0', ',', '.') . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" => number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'));
	echo json_encode($informacion);
	exit;
}
function historialvistaventadocumentos($buscar, $filtro)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$condicion = "";
	if ($filtro == "1") {
		$condicion = " (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "2") {
		$condicion = " (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "3") {
		$condicion = " (Select rut_cliente from cliente where cod_cliente=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "4") {
		$condicion = " (Select telefono from persona where cod_persona=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "5") {
		$condicion = " num_factura like '%" . $buscar . "%' ";
	}

	$sql = "Select puntoexpedicion,tipo_comprobante,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
	   (Select sum(Monto) from credito where cod_venta=vt.cod_venta and plazo='ENTREGA' ) as entrega,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocumento,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		IFNULL((select sum(dtv.descuento) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK),0) as totaldescuentodetalles,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt where " . $condicion . " order by fecha_venta desc limit 100 ";


	// echo($sql);
	// exit;

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {

			$entrega = $valor['entrega'];
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
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuentodetalles = utf8_encode($valor['totaldescuentodetalles']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$totaldescuentoaplicados = $totaldescuentodetalles + $totaldescuento;
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocumento = utf8_encode($valor['nrodocumento']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$totalpagado = $totalpagado + $pago;
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			$pagina_detalle = detalle_venta($cod_venta);
			$pagina1 = $pagina_detalle[0];
			$pagina2 = $pagina_detalle[1];

			$fecha_venta2 = date("d-m-Y", strtotime($fecha_venta));


			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaventadocumentos(this)'  >
<td style='width:15%'>" . $nrof . "</td>
<td  id='td_datos_1' style='display:none'>" . $fecha_venta . "</td>
<td    style='width:10%'>" . $fecha_venta2 . "</td>
<td id='td_datos_13' style='display:none'>" . $num_factura . "</td>
<td id='td_datos_12' style='width:5%'>" . $TipoVenta . "</td>
<td  id='td_datos_2' style='width:20%'>" . $clientenombre . "</td>
<td  id='td_datos_2' style='width:10%'>" . $nrodocumento . "</td>
<td  id='' style='width:10%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:10%'>" . number_format($totaldescuentoaplicados, '0', ',', '.') . "</td>
<td  id='' style='display:none'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_8' style='display:none'>" . $cod_venta . "</td>
<td  id='td_datos_9' style='display:none'>" . $cod_usuarioFK . "</td>
<td  style='width:10%'>" . $pagina2 . "</td>

</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}

function historialvistaventadocumentoscliente($buscar, $filtro)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$condicion = "";
	if ($filtro == "1") {
		$condicion = " (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "2") {
		$condicion = " (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "3") {
		$condicion = " (Select rut_cliente from cliente where cod_cliente=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "4") {
		$condicion = " (Select telefono from persona where cod_persona=cod_clienteFK) like '%" . $buscar . "%' ";
	}
	if ($filtro == "5") {
		$condicion = " num_factura like '%" . $buscar . "%' ";
	}

	$sql = "Select puntoexpedicion,tipo_comprobante,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
	   (Select sum(Monto) from credito where cod_venta=vt.cod_venta and plazo='ENTREGA' ) as entrega,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocumento,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		IFNULL((select sum(dtv.descuento) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK),0) as totaldescuentodetalles,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt where " . $condicion . " order by fecha_venta desc limit 100 ";


	// echo($sql);
	// exit;

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {

			$entrega = $valor['entrega'];
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
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuentodetalles = utf8_encode($valor['totaldescuentodetalles']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$totaldescuentoaplicados = $totaldescuentodetalles + $totaldescuento;
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocumento = utf8_encode($valor['nrodocumento']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$totalpagado = $totalpagado + $pago;
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			$pagina_detalle = detalle_venta($cod_venta);
			$pagina1 = $pagina_detalle[0];
			$pagina2 = $pagina_detalle[1];

			$fecha_venta2 = date("d-m-Y", strtotime($fecha_venta));


			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaventadocumentoscliente(this)'  >
<td style='width:15%'>" . $nrof . "</td>
<td  id='td_datos_1' style='display:none'>" . $fecha_venta . "</td>
<td    style='width:10%'>" . $fecha_venta2 . "</td>
<td id='td_datos_13' style='display:none'>" . $num_factura . "</td>
<td id='td_datos_12' style='width:5%'>" . $TipoVenta . "</td>
<td  id='td_datos_2' style='width:20%'>" . $clientenombre . "</td>
<td  id='td_datos_2' style='width:10%'>" . $nrodocumento . "</td>
<td  id='' style='width:10%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:10%'>" . number_format($totaldescuentoaplicados, '0', ',', '.') . "</td>
<td  id='' style='display:none'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_8' style='display:none'>" . $cod_venta . "</td>
<td  id='td_datos_9' style='display:none'>" . $cod_usuarioFK . "</td>
<td  style='width:10%'>" . $pagina2 . "</td>

</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}
function detalle_venta($cod_ventaFK)
{
	$mysqli = conectar_al_servidor();
	$sql = "select cod_detalle,estado,detalleproducto,nroventa from detalle_venta
where cod_ventaFK='$cod_ventaFK' and estado = 'Activo' order by cod_detalle limit 500";

	$pagina1 = "";
	$pagina2 = "";
	$productos = array();

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {

		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$styleName = "tableRegistroSearch";

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {

			$detalleproducto = utf8_encode($valor['detalleproducto']);
			$estado = utf8_encode($valor['estado']);
			$nroventa = utf8_encode($valor['nroventa']);
			$productos[] = $detalleproducto;

			$pagina1 .= "
	  <span>*<i><b>" . $detalleproducto . "</b></i>*</span><br>
	  ";

			$pagina2 .= "
	  *" . $detalleproducto . "*
	  ";
		}
	}

	// $nroventa = "<b>".$nroventa."</b>";
	// $pagina = $nroventa."<br>".$pagina;
	$datos = array($pagina1, $pagina2, $productos);
	mysqli_close($mysqli);
	return $datos;
}

function buscardatosVenta($buscar)
{
	$mysqli = conectar_al_servidor();

	$pagina = "";
	$sql = "Select vt.tipo_comprobante,vt.puntoexpedicion,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocumento,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt where 
		vt.cod_venta='$buscar' limit 1 ";




	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;

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
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocumento = utf8_encode($valor['nrodocumento']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$totalpagado = $totalpagado + $pago;

			$pagina .= "
<table style='display:none'>
<tr id='datos_venta_" . $cod_venta . "'   >
<td id='td_datos_13' style='width:10%'>" . $num_factura . "</td>
<td  id='td_datos_2' style='width:25%'>" . $clientenombre . "</td>
<td  id='td_datos_2' style='width:10%'>" . $nrodocumento . "</td>
<td  id='td_datos_1' style='width:10%'>" . $fecha_venta . "</td>
<td  id='td_datos_3' style='display:none'>" . $Vendedor1 . "</td>
<td  id='td_datos_14' style='display:none'>" . $Vendedor2 . "</td>
<td  id='td_datos_15' style='display:none'>" . $nombrevendedor1 . "</td>
<td  id='td_datos_16' style='display:none'>" . $nombrevendedor2 . "</td>
<td  id='td_datos_4' style='display:none'>" . $cobradornombre . "</td>
<td  id='td_datos_5' style='width:10%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='td_datos_29' style='display:none'>" . number_format($totaldescuento, '0', ',', '.') . "</td>
<td  id='td_datos_6' style='display:none'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_8' style='display:none'>" . $cod_venta . "</td>
<td  id='td_datos_9' style='display:none'>" . $cod_usuarioFK . "</td>
<td  id='td_datos_10' style='display:none'>" . $cod_clienteFK . "</td>
<td  id='td_datos_11' style='display:none'>" . $cod_cobradorFK . "</td>
<td  id='td_datos_12' style='display:none'>" . $TipoVenta . "</td>
<td  id='td_datos_18' style='display:none'>" . $TipoPago . "</td>
<td  id='td_datos_19' style='display:none'>" . $cantidadcuota . "</td>
<td  id='td_datos_20' style='display:none'>" . number_format($Monto, '0', ',', '.') . "</td>
<td  id='td_datos_21' style='display:none'>" . $fechaprimerpago . "</td>
<td  id='td_datos_22' style='display:none'>" . $comision . "</td>
<td  id='td_datos_23' style='display:none'>" . $cod_local . "</td>
<td  id='td_datos_27' style='display:none'>" . $nrodetalle . "</td>
<td  id='td_datos_30' style='display:none'>" . $idGaranteFk . "</td>
<td  id='td_datos_31' style='display:none'>" . $Garante . "</td>
<td  id='td_datos_32' style='display:none'>" . $tipo_comprobante . "</td>
<td  id='td_datos_33' style='display:none'>" . $puntoexpedicion . "</td>
</tr>
</table>";
		}
	}

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}


//Cuentas Pagadas del Cliente
function buscarCuentasCanceladas($buscar, $formato = "")
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato) === "json";

	$sql = "Select vt.cod_clienteFK,vt.cod_venta,vt.puntoexpedicion,vt.num_factura,vt.fecha_venta,datediff(cr.fechapago,(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1)) as diff
		from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where vt.cod_clienteFK ='" . $buscar . "'  and
		(IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))>=total_venta
        and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0		
		order by (diff*-1) desc limit 5";


	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$totalVenta = 0;
	$totalPagado = 0;
	$totalDeuda = 0;
	$controlVentas = "";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$puntoexpedicion = $valor['puntoexpedicion'];
			$num_factura = $valor['num_factura'];
			$fecha_venta = $valor['fecha_venta'];
			$cod_venta = $valor['cod_venta'];
			$diff = $valor['diff'];
			$cod_clienteFK = $valor['cod_clienteFK'];
			if ($diff < 0) {
				$diff = $diff * -1;
				editarDiasAtrazados($cod_clienteFK, $diff);
			} else {
				$diff = 0;
			}

			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			$styleName = CargarStyleTable($styleName);
			$filas[] = array(
				"id_venta" => $cod_venta,
				"id_cliente" => $cod_clienteFK,
				"numero_factura" => $nrof,
				"fecha" => $fecha_venta,
				"dias_atraso" => $diff,
				"dias_atraso_formateado" => number_format($diff, '0', ',', '.'),
				"clase_fila" => $styleName
			);
			if (!$devolverArray) {
				$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='ObtenerdatosCuentaCliente(this)' >
<td  id='td_id' style='display:none'>" . $cod_venta . "</td>
<td  id='' style='width:40%'>" . $nrof . "</td>
<td  id='' style='width:30%'>" . $fecha_venta . "</td>
<td  id='' style='width:10%'>" . number_format($diff, '0', ',', '.') . "</td>
</tr>
</table>";
			}
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}

//Cuentas pedientes del Cliente
function buscarCuentasPendientes($buscar, $formato = "")
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato) === "json";
	$fechahoy = date('Y-m-d');
	$sql = "Select vt.cod_clienteFK,vt.cod_venta,vt.puntoexpedicion,vt.num_factura,vt.fecha_venta,datediff(cr.fechapago,'" . $fechahoy . "') as diff,cr.fechapago
		from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where vt.cod_clienteFK ='" . $buscar . "'  and
		IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)< ((cr.Monto+totalinteres)-cr.descuento)
        and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0		
		order by (diff*-1) desc limit 5";


	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$totalVenta = 0;
	$totalPagado = 0;
	$totalDeuda = 0;
	$controlVentas = "";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$puntoexpedicion = $valor['puntoexpedicion'];
			$num_factura = $valor['num_factura'];
			$fecha_venta = $valor['fechapago'];
			$cod_clienteFK = $valor['cod_clienteFK'];
			$diff = $valor['diff'];
			$cod_venta = $valor['cod_venta'];
			if ($diff < 0) {
				$diff = $diff * -1;
				editarDiasAtrazados($cod_clienteFK, $diff);
			} else {
				$diff = 0;
			}

			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}
			$styleName = CargarStyleTable($styleName);
			$filas[] = array(
				"id_venta" => $cod_venta,
				"id_cliente" => $cod_clienteFK,
				"numero_factura" => $nrof,
				"fecha" => $fecha_venta,
				"dias_atraso" => $diff,
				"dias_atraso_formateado" => number_format($diff, '0', ',', '.'),
				"clase_fila" => $styleName
			);
			if (!$devolverArray) {
				$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosCuentaCliente(this)'  >
<td  id='td_id' style='display:none'>" . $cod_venta . "</td>
<td  id='' style='width:40%'>" . $nrof . "</td>
<td  id='' style='width:30%'>" . $fecha_venta . "</td>
<td  id='' style='width:10%'>" . number_format($diff, '0', ',', '.') . "</td>
</tr>
</table>";
			}
		}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}

function editarDiasAtrazados($codCliente, $nroDias)
{

	$mysqli = conectar_al_servidor();
	$consulta1 = "Update cliente set totaldias='$nroDias' where cod_cliente='$codCliente' and totaldias<'$nroDias' ";
	$stmt1 = $mysqli->prepare($consulta1);

	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
}





function historialFiltroMorosos($buscar, $filtro, $zona, $Local)
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$paginaWhatsapp = "";
	$paginaGarante = "";
	$fechahoy = date('Y-m-d');

	$condicionCuenta = " and IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk and Tipo='Pago Cuota'),0) <
	(select sum(cr.Monto) from credito cr where cr.cod_venta=vt.cod_venta)-(select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta)";

	$CondiciónFiltro = "";
	if ($filtro == "1") {
		$CondiciónFiltro = " and DATEDIFF('" . $fechahoy . "',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1))>=30 and  DATEDIFF('" . $fechahoy . "',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1)) < 60";
	}
	if ($filtro == "2") {
		$CondiciónFiltro = " and DATEDIFF('" . $fechahoy . "',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1))>=60 and  DATEDIFF('" . $fechahoy . "',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1)) < 90 ";
	}
	if ($filtro == "3") {
		$CondiciónFiltro = " and DATEDIFF('" . $fechahoy . "',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1))>=90";
	}
	if ($filtro == "4") {
		$CondiciónFiltro = "  and  (select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1)<= '" . $fechahoy . "' ";
	}


	$condicionZona = " ";
	if ($zona != "") {
		$condicionZona = " and (Select count(cod_cliente) from cliente where cod_cliente=cod_clienteFK  and idzonaFk='$zona') > 0";
	}

	$condicionLocal = "";
	if ($Local != "") {
		$condicionLocal = " and (Select cod_local from local l where l.cod_local=vt.cod_local)='$Local' ";
	}
	$sql = "Select vt.puntoexpedicion,vt.num_factura,vt.tipo_comprobante,fecha_venta,(select sum(Monto) from credito c where  vt.cod_venta=c.cod_venta)as total_venta,vt.cod_venta,
		  (Select sms from cliente where cod_cliente=cod_clienteFK) as sms,
		 (select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1) as FechapagoDeuda,
		 (select plazo from credito c  where vt.cod_venta=c.cod_venta and (Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota')!=(c.Monto - c.descuento) order by idcredito asc limit 1) as plazo,
		 IFNULL((select sum(deudaInteres) from credito c  where vt.cod_venta=c.cod_venta),0) as deudaInteres,
		 (select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and (Select count(*) from pago where cod_creditoFK = idcredito)=0 order by idcredito asc limit 1) as FechapagoDeuda2,
		(Select telefono from persona where cod_persona=cod_clienteFK) as Telefono,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garantenombre,idGaranteFk,	
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as cicliente,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as Local,
		( select nombre from zona where idzona=(Select idzonaFk from cliente where cod_cliente=cod_clienteFK)) as zona,
		(Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1) as nroCancelado,
		IFNULL((Select montodevuelto from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as montodevuelto,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado ,
		DATEDIFF('" . $fechahoy . "',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1)) as dias
		from  venta vt where (select count(*) from cancelaciones c where vt.cod_venta=c.cod_venta)=0 and  (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%" . $buscar . "%' " . $CondiciónFiltro . $condicionZona . $condicionCuenta . $condicionLocal . " order by dias desc";


	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;

	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$Telefono = $valor['Telefono'];

			$fecha_venta = $valor['fecha_venta'];
			$cicliente = $valor['cicliente'];

			$zona = $valor['zona'];
			$total_venta = $valor['total_venta'];
			$num_factura = utf8_encode($valor['num_factura']);
			$puntoexp = utf8_encode($valor['puntoexpedicion']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$clientenombre = utf8_encode($valor['clientenombre']);
			$cod_venta = utf8_encode($valor['cod_venta']);
			$Local = utf8_encode($valor['Local']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$dias = utf8_encode($valor['dias']);
			$FechapagoDeuda = utf8_encode($valor['FechapagoDeuda']);
			$FechapagoDeuda2 = utf8_encode($valor['FechapagoDeuda2']);
			$Garantenombre = utf8_encode($valor['Garantenombre']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$plazo = utf8_encode($valor['plazo']);
			$deudaInteres = utf8_encode($valor['deudaInteres']);
			$nroCouta = ($valor['nroCouta']);
			$nroCancelado = ($valor['nroCancelado']);
			$montodevuelto = ($valor['montodevuelto']);
			$sms = ($valor['sms']);



			$datos = calcularintereses2($cod_venta, 0, 0, "3", "2", "2", "no");

			$interes = $datos[1] + $deudaInteres;
			$deuda2 = $datos[2] + $deudaInteres;
			$TotalAPagar = $datos[7];
			$TotalInteresAnterior = $datos[16];
			$TotalDeuda = $TotalDeuda + $deuda2;

			if ($FechapagoDeuda == "") {
				$FechapagoDeuda = $FechapagoDeuda2;
			}




			$deuda = ($total_venta + $interes) - ($totalpagado + $totaldescuento);
			$totalRegistro = $totalRegistro + 1;
			if ($deuda < 0) {
				$deuda = 0;
			}

			if ($nroCancelado == 0) {
				$TotalVentas = $total_venta + $TotalVentas;
				$TotalPagos = $TotalPagos + $totalpagado;
			} else {
				$totalpagado = ($totalpagado - $montodevuelto);
				if ($totalpagado < 0) {
					$totalpagado = 0;
				}
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalVentas = $total_venta + $TotalVentas;
			}

			if ($tipo_comprobante == "FACTURA") {
				$num_factura = $puntoexp . "-" . $num_factura;
			}

			$contrlPlazo = strlen($plazo);

			if ($contrlPlazo <= 2 && $plazo != "") {
				$plazo = $plazo . "/" . $nroCouta;
			}
			if ($plazo == "") {
				$plazo = buscarcantidadcuotapagados($cod_venta) + 1;
				$plazo = $plazo . "/" . $nroCouta;
			}
			// 
			if ($Telefono != "") {
				$condicion = $Telefono[0];
			} else {
				$condicion = "";
			}

			$codigo = "595";
			if ($condicion == "+") {
				$codigo = "";
			}

			$fecha_venta2 = date("d-m-Y", strtotime($fecha_venta));

			$pagina .= "
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'   >
<td id='td_datos_13' style='width:9%'>" . $num_factura . "</td>
<td    style='width:7%'>" . $fecha_venta2 . "</td>
<td  id='td_datos_1' style='display:none'>" . $fecha_venta . "</td>
<td  id='td_datos_2' style='width:20%'>" . $cicliente . "-" . $clientenombre . " <br><b>" . $Telefono . "</b></td>
<td  id='' style='width:5%'>" . $plazo . "</td>
<td  id='td_datos_5' style='width:7%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id='td_datos_6' style='width:7%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_28' style='width:6%'>" . number_format($totaldescuento, '0', ',', '.') . "</td>
<td  id='td_datos_7' style='width:7%'>" . number_format($deuda2, '0', ',', '.') . "</td>
<td id='td_datos_8' style='width:7%'>" . $FechapagoDeuda . "</td>
<td  id='td_datos_0' style='width:5%'>" . number_format($interes, '0', ',', '.') . "</td>
<td  id='td_datos_0' style='width:5%'>" . $dias . "</td>
<td  id='td_datos_0' style='width:5%'>" . $Local . "</td>
<td  id='td_datos_0' style='width:7%'>" . $zona . "</td>



</tr>
</table>";
			$CondicionMensaje = " y posee " . $dias . " dias de atraso";
			if ($dias <= 0) {
				$CondicionMensaje = "";
			}
			$Mensaje = "Estimado(a): " . $clientenombre . " Le notificamos que tiene una cuota pendiente de pago de la fecha " . $FechapagoDeuda . $CondicionMensaje . " , favor realizar el pago correspondiente o ponerse en contacto con su cobrador. Att: Area Administrativa *B&R EMPRENDIMIENTOS S.A.*";



			if ($Telefono != "0" && $Telefono != "") {

				$Telefono = substr($Telefono, 1);

				$searchString = " ";
				$replaceString = "";

				$Telefono = str_replace($searchString, $replaceString, $Telefono);

				if ($sms == "SI") {
					$paginaWhatsapp .= "
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'   >
<td id='td_datos_13' style='width:30%'>" . $codigo . $Telefono . "</td>
<td  id='td_datos_1' style='width:30%'></td>
<td  id='td_datos_2' style='width:40%'>" . $Mensaje . "</td>
</tr>
</table>";
				}
			}


			if ($idGaranteFk != "6") {
				$MensajeGarante = "Estimado(a): Garante " . $Garantenombre . " Le notificamos que " . $clientenombre . " tiene una cuota pendiente de pago de la fecha " . $FechapagoDeuda . $CondicionMensaje . ", favor ponerse en contacto con el area Administrativa de *B&R EMPRENDIMIENTOS S.A.*";

				$paginaGarante .= "
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'   >
<td id='td_datos_13' style='width:30%'>595" . $Telefono . "</td>
<td  id='td_datos_1' style='width:30%'></td>
<td  id='td_datos_2' style='width:40%'>" . $MensajeGarante . "</td>
</tr>
</table>";
			}
		}
	}
	$paginaWhatsapp .= $paginaGarante;

	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "4" => number_format($TotalVentas, '0', ',', '.'), "5" => number_format($TotalPagos, '0', ',', '.'), "6" => number_format($TotalDeuda, '0', ',', '.'), "7" => $paginaWhatsapp);

	echo json_encode($informacion);
	exit;
}




function buscar_detalles_venta_producto($buscar)
{
	$mysqli = conectar_al_servidor();

	$sql = "select pr.nombre_producto,dtv.detalleproducto,
 IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";
	$pagina = "";
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$a = 1;
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {



			$nombre_producto = utf8_decode($valor['nombre_producto']);
			$nroDevoluciones = utf8_decode($valor['nroDevoluciones']);
			$nroCambios = utf8_decode($valor['nroCambios']);
			$nroGarantia = utf8_decode($valor['nroGarantia']);
			$detalleproducto = utf8_decode($valor['detalleproducto']);
			if ($nroDevoluciones == 0 && $nroCambios == 0) {
				if ($pagina == "") {
					$pagina .= $a . ") &nbsp" . $nombre_producto;
				} else {
					$pagina .= "<br>" . $a . ") &nbsp" . $nombre_producto;
				}
				$a = $a + 1;
			}
		}
	}
	mysqli_close($mysqli);
	return utf8_decode($pagina);
}





function cuotasFaltantesCliente($cod_clienteFK) {
    $mysqli = conectar_al_servidor();

    $sql = "SELECT   c.idcredito,v.cod_venta,
		c.Monto AS total_cuotas,
		c.descuento AS descuento,
        ifnull(sum(p.Monto),0) AS totalPagado , 
		 
    GREATEST(
        DATEDIFF(IFNULL(MAX(p.Fecha),CURDATE()) , c.fechapago),
        0
    ) AS dias_atraso ,IFNULL(MAX(p.Fecha),CURDATE()) as Fecha, c.fechapago 
		
           FROM venta v
           INNER JOIN credito c ON c.cod_venta = v.cod_venta
           LEFT JOIN pago p ON p.cod_creditoFK = c.idcredito AND p.Tipo = 'Pago Cuota'
           WHERE v.cod_clienteFK = '$cod_clienteFK' 
            AND c.plazo != 'Entrega' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0
            GROUP BY c.idcredito order by c.fechapago asc ";
 // echo($sql);
 // exit;
 
    $stmt = $mysqli->prepare($sql); 
    $stmt->execute();
    $result = $stmt->get_result();

    $totalCuotasPendientes = 0;
	$cod_ventaFK=0;
	$Controldias_atraso=0;
	$Fecha='';
	$fechapagoDA='';
	$fechahoy = date('Y-m-d');	
    while ($row = $result->fetch_assoc()) {		
			 
        $totalCuotas = (int)$row['total_cuotas'];
        $totalPagado = (int)$row['totalPagado'];
        $cod_venta = (int)$row['cod_venta'];
		$dias_atraso = (int)$row['dias_atraso'];
		$descuento = (int)$row['descuento'];
		$Fecha =  $row['Fecha'];
		$fechapago =  $row['fechapago'];
 

        $pendientes = ($totalCuotas - $descuento) - $totalPagado;
        if ($pendientes > 0) {
            $totalCuotasPendientes ++; 
			$cod_ventaFK = $cod_venta;	
        }
		
		if ($fechapago < $fechahoy) {
                if ($dias_atraso > $Controldias_atraso) {
					$Controldias_atraso = $dias_atraso;
				}
         }		
    }
	
// if($totalCuotasPendientes==1 && $pendientes > 0 ){
	
		// if ($fechapago > $fechahoy) {
			// $dias_diferencia=0;
		// }else{
			// $datetime1 = new DateTime($fechahoy);
			// $datetime2 = new DateTime($fechapago);
			// $interval = $datetime2->diff($datetime1);

 
			// $dias_diferencia = $interval->days;	
		// }	
		
		// $Controldias_atraso= $dias_diferencia;
// }
	
	$Datos[0]= $totalCuotasPendientes;
	$Datos[1]= $cod_ventaFK;
	$Datos[2] = $Controldias_atraso; 
	$Datos[3] = $Fecha; 
	$Datos[4] = $fechapago; 
    return $Datos;
}


function buscarClienteFiel($fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $condicion, $tipoventa, $diasatraso, $formato = "")
{
	$mysqli = conectar_al_servidor();
	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato) === "json";
	$pagina2 = "<table>
	<tr>
	<td><b>CLIENTE</b></td>
	<td><b>TELEFONO</b></td>
	</tr>
	</table>
	";
	$fechahoy = date('Y-m-d');

	$condicionFecha = "";
	if ($fecha1 != "" || $fecha2 != "") {
		$condicionFecha = " and vt.fecha_venta between '$fecha1' and '$fecha2'";
	}

	$condicionVendedor = "";
	if ($vendedor != "") {
		$condicionVendedor = " and (Select nombre from vendedor where idvendedor=vt.Vendedor1 )like '%$vendedor%' ";
	}

	$condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and vt.cod_local = '$local' ";
	}
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = " and (Select nombre_persona from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
	}
	$condicionzona = "";
	if ($zona != "") {
		$condicionzona = " and (Select count(cod_cliente) from cliente where cod_cliente=cod_clienteFK  and idzonaFk='$zona') > 0";
	}

	$condiciontipoventa = "";
	if ($tipoventa != "") {
		
		if($tipoventa=="CREDITO"){
			$condiciontipoventa = " and (vt.TipoVenta = 'CREDITO'  or vt.TipoVenta = 'A LA VISTA' ) ";
		}else{
			$condiciontipoventa = " and vt.TipoVenta = '$tipoventa' ";
		}
		
	}
	$condiciondiasatraso = "30";
	if ($diasatraso != "") {
		$condiciondiasatraso = $diasatraso;
	}
 
	$sql = "Select  cod_clienteFK , (select nombre_persona from persona where cod_persona=cod_clienteFK) as nombre_persona  from  venta vt where cod_clienteFK!='Activo' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0
	".$condiciontipoventa.$condicionzona.$condicioncliente.$condicionFecha.$condicionVendedor.$condicionlocal." group by cod_clienteFK order by nombre_persona asc  ";
 
	// echo($sql);
	// exit;
	

	$styleName = "tableRegistroSearch";
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
	$cod = [];
	$i = 0;
	
	$contador="  ";
	
	
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$cod_clienteFK = $valor['cod_clienteFK'];
			
			$cantiCuotas=cuotasFaltantesCliente($cod_clienteFK);
			$cantiCuo=$cantiCuotas[0];
			$cod_ventaFK=$cantiCuotas[1];
			$D_atraso=$cantiCuotas[2];
			
			if($D_atraso > $condiciondiasatraso){
				continue;
			}
 		
			switch ($condicion) {
	case "1": // Solo si faltan exactamente 3 cuotas
		if ($cantiCuo != 3) break;

		$Datos = buscarClienteFielDetalle($cod_ventaFK,$condiciontipoventa, $condiciondiasatraso, $cod_clienteFK, $fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $D_atraso);
		$pagina .= $Datos[0];
		$i = $i + $Datos[1];
		$pagina2 .= $Datos[2];
		$filas = array_merge($filas, $Datos[3]);
		
		
		break;
	case "2": // Solo si faltan exactamente 2 cuotas
		if ($cantiCuo != 2) break;
	 
		$Datos = buscarClienteFielDetalle($cod_ventaFK,$condiciontipoventa, $condiciondiasatraso, $cod_clienteFK, $fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $D_atraso);
		$pagina .= $Datos[0];
		$i = $i + $Datos[1];
		$pagina2 .= $Datos[2];
		$filas = array_merge($filas, $Datos[3]);
		
		break;
	case "3": // Solo si falta exactamente 1 cuota
		if ($cantiCuo != 1) break;
	 
		$Datos = buscarClienteFielDetalle($cod_ventaFK,$condiciontipoventa, $condiciondiasatraso, $cod_clienteFK, $fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $D_atraso);
		$pagina .= $Datos[0];
		$i = $i + $Datos[1];
		$pagina2 .= $Datos[2];
		$filas = array_merge($filas, $Datos[3]);
		
		break;
	case "4": // Solo si no falta ninguna (cliente al día)
		if ($cantiCuo != 0) break;
	 
		$Datos = buscarClienteFielDetalle($cod_ventaFK,$condiciontipoventa, $condiciondiasatraso, $cod_clienteFK, $fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $D_atraso);
		$pagina .= $Datos[0];
		$i = $i + $Datos[1];
		$pagina2 .= $Datos[2];
		$filas = array_merge($filas, $Datos[3]);
		
		break;
	case "5": // Solo si le faltan 3 o menos cuotas
		if ($cantiCuo > 3) break;
	 
		$Datos = buscarClienteFielDetalle($cod_ventaFK,$condiciontipoventa, $condiciondiasatraso, $cod_clienteFK, $fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $D_atraso);
		$pagina .= $Datos[0];
		$i = $i + $Datos[1];
		$pagina2 .= $Datos[2];
		$filas = array_merge($filas, $Datos[3]);
		
		break;
}
 
 
		}
	}
 
 

 
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina), "3" =>$i, "4" => $cod, "5"=>$pagina2);
	echo json_encode($informacion);
	exit;
}


function buscarClienteFielDetalle($cod_ventaFK,$condiciontipoventa, $condiciondiasatraso, $cod_clienteFK, $fecha1, $fecha2, $local, $zona, $cliente, $vendedor, $D_atraso)
{
    $mysqli = conectar_al_servidor();
    $fechahoy = date('Y-m-d');

    $condicionFecha = "";
    if ($fecha1 != "" || $fecha2 != "") {
        $condicionFecha = " and vt.fecha_venta between '$fecha1' and '$fecha2'";
    }

    $condicionVendedor = "";
    if ($vendedor != "") {
        $condicionVendedor = " and (Select nombre from vendedor where idvendedor=vt.Vendedor1 )like '%$vendedor%' ";
    }

    $condicionlocal = "";
    if ($local != "") {
        $condicionlocal = " and vt.cod_local = '$local' ";
    }

    $condicioncliente = "";
    if ($cliente != "") {
        $condicioncliente = " and (Select nombre_persona from persona where cod_persona=cod_clienteFK) like '%" . $cliente . "%'";
    }

    $condicionzona = "";
    if ($zona != "") {
        $condicionzona = " and (Select count(cod_cliente) from cliente where cod_cliente=cod_clienteFK  and idzonaFk='$zona') > 0";
    }
	
	$condicionCod_venta = "";
    if ($cod_ventaFK != "0") {
        $condicionCod_venta = " vt.cod_venta='$cod_ventaFK' and ";
    }
 
    $sql = "Select vt.fecha_venta,vt.cod_venta, vt.total_venta, vt.puntoexpedicion, vt.num_factura,
      (Select nombre_persona from persona where cod_persona=cod_clienteFK) as clientenombre,
      (Select telefono from persona where cod_persona=cod_clienteFK) as clienteTelefono,vt.cod_clienteFK,
      (Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocumento,
      (select count(*) from credito c where vt.cod_venta=c.cod_venta ) as contadorCredito,
     (SELECT COUNT(*) 
 FROM credito c
 WHERE c.cod_venta = vt.cod_venta
   AND EXISTS (
       SELECT 1 
       FROM pago p
       WHERE p.cod_creditoFK = c.idcredito 
         AND p.Tipo = 'Pago Cuota'
   )
) AS CreditosPagados,
      (Select nombre from vendedor where idvendedor=vt.Vendedor1 ) as Vendedor,
 
      (
  SELECT COUNT(*)
  FROM credito c
  WHERE c.cod_venta = vt.cod_venta
    AND c.plazo != 'Entrega'
    AND NOT EXISTS (
      SELECT 1
      FROM pago p
      WHERE p.cod_creditoFK = c.idcredito
        AND p.Tipo = 'Pago Cuota'
    )
)
 as deudaContador 
    from  venta vt inner join credito cr on cr.cod_venta= vt.cod_venta  
    where ".$condicionCod_venta."  cod_clienteFK = " . $cod_clienteFK . "  
    and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 and  (select count(*)  from credito c where c.cod_venta = vt.cod_venta ) >0  
    " . $condiciontipoventa . $condicionzona . $condicioncliente . $condicionFecha . $condicionVendedor . $condicionlocal . " 
      order by deudaContador desc limit 1 ";
	
 // echo($sql);
 // exit;

    $stmt = $mysqli->prepare($sql);
    if (!$stmt->execute()) {
        echo "Error";
        exit;
    }

    $result = $stmt->get_result();
    $valor = mysqli_num_rows($result);
    $pagina = "";
	$pagina2 = "";
	$filas = array();
    $i = 0;
    $c = 0;
    $cod = [];

    if ($valor > 0) {
        while ($valor = mysqli_fetch_assoc($result)) {
            $cod_clienteFK = $valor['cod_clienteFK'];

 
            $clienteTelefono = utf8_encode($valor['clienteTelefono']);
            $contadorCredito = utf8_encode($valor['contadorCredito']); 
            $CreditosPagados = utf8_encode($valor['CreditosPagados']);
			
            $nrodocumento = utf8_encode($valor['nrodocumento']);
            $fecha_venta = utf8_encode($valor['fecha_venta']);
            $clientenombre = utf8_encode($valor['clientenombre']);
            $total_venta = utf8_encode($valor['total_venta']);
            $puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
            $num_factura = utf8_encode($valor['num_factura']);
            $Vendedor = utf8_encode($valor['Vendedor']);
            $cod_venta = utf8_encode($valor['cod_venta']);
            $deudaContador = utf8_encode($valor['deudaContador']);

 

            $datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
            $totalDeuda = $datos[4];
            $totalPagado = $datos[13];
 
                $detallleProducto = buscar_detalles_venta_producto($cod_venta);
				$detalleProductoTexto = str_ireplace(array("<br>", "<br/>", "<br />"), "\n", $detallleProducto);
				$detalleProductoTexto = str_replace(array("&nbsp;", "&nbsp"), " ", $detalleProductoTexto);
				$detalleProductoTexto = strip_tags($detalleProductoTexto);
                $nrof = $puntoexpedicion != "" ? $puntoexpedicion . "-" . $num_factura : $num_factura;
                $fecha_venta = date("d-m-Y", strtotime($fecha_venta));

                $styleName = CargarStyleTable("tableRegistroSearch");
				$filas[] = array(
					"fecha_venta" => $fecha_venta,
					"numero_factura" => $nrof,
					"cliente" => $clientenombre,
					"documento" => $nrodocumento,
					"telefono" => $clienteTelefono,
					"id_cliente" => $cod_clienteFK,
					"id_venta" => $cod_venta,
					"detalle_productos" => $detalleProductoTexto,
					"total_venta" => $total_venta,
					"total_venta_formateado" => number_format($total_venta, '0', ',', '.'),
					"total_pagado" => $totalPagado,
					"total_pagado_formateado" => number_format($totalPagado, '0', ',', '.'),
					"creditos_pagados" => $CreditosPagados,
					"total_creditos" => $contadorCredito,
					"dias_atraso" => $D_atraso,
					"total_deuda" => $totalDeuda,
					"total_deuda_formateado" => number_format($totalDeuda, '0', ',', '.'),
					"vendedor" => $Vendedor,
					"clase_fila" => $styleName
				);
                $pagina .= "
				<table class='$styleName' border='0' cellspacing='0' cellpadding='0' >
				<tr id='tbSelecRegistro' onclick='obtenerdatosClienteFiel(this)' name='TablaClientesFieles'>
				<td id='td_datos_1' style='width:10%'>" . $fecha_venta . "</td>
				<td style='width:10%'>" . $nrof . "</td>
				<td style='width:15%'>" . $clientenombre . "<br>*" . $nrodocumento . "* <b>" . $clienteTelefono . "</b></td>
				<td id='td_datos_2' style='display:none'>" . $clientenombre . "</td>
				<td style='width:18%'>" . $detallleProducto . "</td>
				<td style='width:10%'>VNT:" . number_format($total_venta, '0', ',', '.') . "<br><br>PG:" . number_format($totalPagado, '0', ',', '.') . "</td>
				<td id='td_datos_3' style='display:none'>" . $total_venta . "</td>
				<td id='td_datos_4' style='display:none'>" . $clienteTelefono . "</td>
				<td id='td_datos_5' style='display:none'>" . $cod_clienteFK . "</td>
				<td id='td_datos_6' style='display:none'>" . $cod_venta . "</td>
				<td style='width:10%'>" . $CreditosPagados . "/" . $contadorCredito . "</td>
				<td style='width:7%'>" . $D_atraso . "</td>
				<td style='width:10%'>" . number_format($totalDeuda, '0', ',', '.') . "</td>
				<td style='width:10%'>" . $Vendedor . "</td>
				</tr>
				</table>";
                $i = 1;
                $c++;
                $cod += array("$c" => $cod_clienteFK);
				
				
				$pagina2.="
				<table border='0' cellspacing='0' cellpadding='0' >
				<tr id='tbSelecRegistro'>
				<td>" . $clientenombre . "</td>
				<td>". $clienteTelefono . "</td>
				</tr>
				</table>";
        }
    }
	

    $Datos[0] = $pagina;
    $Datos[1] = $i;
    $Datos[2] = $pagina2;
	$Datos[3] = $filas;
    return $Datos;
}

 

function buscarproductonovendidos($codigo, $producto, $cod_local, $categoria, $marca, $control)
{
    $mysqli = conectar_al_servidor();
    $fechaactual = date('Y-m-d');

    // Fecha límite según el control (años sin venta)
   $nuevafecha = null;

switch ($control) {
    case "1": // 3 meses
        $interval = "-3 months";
        break;
    case "2": // 6 meses
        $interval = "-6 months";
        break;
    case "3": // 9 meses
        $interval = "-9 months";
        break;
    case "4": // 1 año
        $interval = "-1 year";
        break;
    case "5":
        $interval = "-2 years";
        break;
    case "6":
        $interval = "-3 years";
        break;
    case "7":
        $interval = "-4 years";
        break;
    case "8":
        $interval = "-5 years";
        break;
    default:
        $interval = null;
}

if ($interval) {
    $nuevafecha = date('Y-m-d', strtotime($interval, strtotime($fechaactual)));
}


    // Condiciones dinámicas
    $condiciones = [];
    if ($cod_local !== "") $condiciones[] = "vt.cod_local = ?";
    if ($categoria !== "") $condiciones[] = "pr.cod_categoriaFK = ?";
    if ($marca !== "") $condiciones[] = "pr.cod_marcasFK = ?";
    if ($codigo !== "") $condiciones[] = "pr.cod_barra = ?";
    if ($producto !== "") $condiciones[] = "concat(pr.nombre_producto,' ',pr.cod_producto) LIKE ?";

    $where = "";
    if (!empty($condiciones)) {
        $where = " AND " . implode(" AND ", $condiciones);
    }

    // SQL con JOINs para mejor rendimiento
    $sql = "
        SELECT 
            pr.cod_barra,
			(select sum(entero) from stocklocales stk INNER JOIN stock_producto on cod_stocklocalesFK=idstocklocales  where stk.cod_productofk = pr.cod_producto) as stock,
            pr.nombre_producto,
			pr.precio_compra,
            c.descripcion AS NombreCategoria,
            m.descripcion AS NombreMarca,
            MAX(vt.fecha_venta) AS ultima_venta,
            l.Nombre AS nombrelocal
        FROM producto pr 
        LEFT JOIN categoria c ON c.cod_categoria = pr.cod_categoriaFK
        LEFT JOIN marcas m ON m.cod_marcas = pr.cod_marcasFK
        LEFT JOIN detalle_venta dtv ON dtv.cod_productoFK = pr.cod_producto
        LEFT JOIN venta vt ON vt.cod_venta = dtv.cod_ventaFK  
        LEFT JOIN local l ON l.cod_local = vt.cod_local
        WHERE pr.estado='Activo' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  and  
		(select sum(entero) from stocklocales stk INNER JOIN stock_producto on cod_stocklocalesFK=idstocklocales  where stk.cod_productofk = pr.cod_producto)>0  $where
        GROUP BY pr.cod_producto ";

    // HAVING para productos nunca vendidos o con última venta antigua
    if ($nuevafecha) {
        // $sql .= " HAVING (ultima_venta IS NULL OR DATE_FORMAT(ultima_venta,'%Y') = ?)";
        $sql .= " HAVING (ultima_venta IS NULL OR ultima_venta < ?)";
		
    } else {
        $sql .= " HAVING ultima_venta IS NULL";
    }

    $sql .= " ORDER BY ultima_venta ASC ";


    // Vincular parámetros
    $params = [];
    $types  = "";
    if ($cod_local !== "") { $params[] = $cod_local; $types .= "s"; }
    if ($categoria !== "") { $params[] = $categoria; $types .= "s"; }
    if ($marca !== "") { $params[] = $marca; $types .= "s"; }
    if ($codigo !== "") { $params[] = $codigo; $types .= "s"; }
    if ($producto !== "") { $params[] = "%".$producto."%"; $types .= "s"; }
    if ($nuevafecha) { $params[] = $nuevafecha; $types .= "s"; }

$stmt = $mysqli->prepare($sql);
if ($stmt === false) {
    die("Error en prepare: " . $mysqli->error);
}

if (!empty($params)) {
    $bind_names   = [];
    $bind_names[] = $types; // ej. "ssi"

    for ($i = 0; $i < count($params); $i++) {
        $bind_name = 'bind' . $i;
        $$bind_name = $params[$i];
        $bind_names[] = &$$bind_name;
    }

    if (!call_user_func_array(array($stmt, 'bind_param'), $bind_names)) {
        die("Error en bind_param: " . $stmt->error);
    }
}

 
    if (!$stmt->execute()) {
        echo json_encode(["1" => "error", "2" => $stmt->error]);
        exit;
    }

    $result = $stmt->get_result();
    $nroRegistro = $result->num_rows;

    $pagina = "";
    if ($nroRegistro > 0) {
        
        while ($fila = $result->fetch_assoc()) {
            $ultima = isset($fila['ultima_venta']) && $fila['ultima_venta'] != "" 
    ? $fila['ultima_venta'] 
    : "Nunca vendido";

$pagina .= " <table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
    <td style='width:10%'>" . htmlspecialchars($fila['cod_barra']) . "</td>
    <td style='width:20%'>" . utf8_encode($fila['nombre_producto']) . "</td>
    <td style='width:10%'>" . htmlspecialchars($fila['stock']) . "</td>
    <td style='width:10%'>" . utf8_encode($fila['NombreMarca']) . "</td>
    <td style='width:10%'>" . utf8_encode($fila['NombreCategoria']) . "</td>
    <td style='width:10%'>" . utf8_encode($fila['nombrelocal']) . "</td>
    <td style='width:10%'>" . utf8_encode(number_format($fila['precio_compra'],'0',',','.')) . "</td>
    <td style='width:10%'>" . htmlspecialchars($ultima) . "</td>
</tr>
</table>";

        }
        $pagina .= "</table>";
    }

    $informacion = [
        "1" => "exito",
        "2" => $pagina,
        "3" => number_format($nroRegistro, 0, ',', '.')
    ];
    echo json_encode($informacion);
    exit;
}

function marcarmoraventaestado($cod_venta, $cod_clienteFK, $codMoraCliente)
{
	
	$mysqli = conectar_al_servidor();
	
	
	if($codMoraCliente!="13"){
			$consulta1 = "Update cliente set tipo_estado='$codMoraCliente' where cod_cliente ='$cod_clienteFK'";
			$stmt1 = $mysqli->prepare($consulta1);


			if (!$stmt1->execute()) {
				echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
				exit;
			}
	}

	$consulta1 = "Update venta set codmoracliente='$codMoraCliente' where cod_clienteFK ='$cod_clienteFK' and cod_venta = '$cod_venta'";
	$stmt1 = $mysqli->prepare($consulta1);



	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}


	$informacion = array("1" => "exito");
	echo json_encode($informacion);
	exit;
}

function vistaventainformconf($cod_clienteFK, $cod_venta, $formato="")
{
	$mysqli = conectar_al_servidor();

	$totalRegistro = 0;
	$pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato)==="json";

	$condicioncodventa = '';
	if ($cod_venta) {
		$condicioncodventa = "and cod_venta = '$cod_venta'";
	}

	$sql = "Select puntoexpedicion,tipo_comprobante,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
	   (Select sum(Monto) from credito where cod_venta=vt.cod_venta and plazo='ENTREGA' ) as entrega,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocumento,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
		IFNULL((select sum(dtv.descuento) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK),0) as totaldescuentodetalles,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Cambio' group by cambios.cod_venta) as cantidadcambio,
		(Select count(cant) from cambios where cambios.cod_venta=vt.cod_venta and motivo='Devolucion' ) as cantidaddevuelto,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago desc limit 1) as fechaultimopago,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt where cod_clienteFK = '$cod_clienteFK' or idGaranteFk = '$cod_clienteFK' " . $condicioncodventa . "  order by fecha_venta desc limit 100 ";

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}
	$styleName = "tableRegistroSearch";
	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {

			$entrega = $valor['entrega'];
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
			$nroCouta = utf8_encode($valor['nroCouta']);
			$totaldescuentodetalles = utf8_encode($valor['totaldescuentodetalles']);
			$totaldescuento = utf8_encode($valor['totaldescuento']);
			$totaldescuentoaplicados = $totaldescuentodetalles + $totaldescuento;
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocumento = utf8_encode($valor['nrodocumento']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$totalpagado = $totalpagado + $pago;
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			$pagina_detalle = detalle_venta($cod_venta);
			$pagina1 = $pagina_detalle[0];
			$pagina2 = $pagina_detalle[1];
			$productos = isset($pagina_detalle[2]) && is_array($pagina_detalle[2]) ? $pagina_detalle[2] : array();

			$fecha_venta2 = date("d-m-Y", strtotime($fecha_venta));


			$styleName = CargarStyleTable($styleName);
			$filas[] = array(
				"factura" => $nrof,
				"fecha_original" => $fecha_venta,
				"fecha" => $fecha_venta2,
				"numero_factura" => $num_factura,
				"tipo_venta" => $TipoVenta,
				"cliente" => $clientenombre,
				"documento" => $nrodocumento,
				"total_venta" => number_format($totalventadetalle, '0', ',', '.'),
				"descuento" => number_format($totaldescuentoaplicados, '0', ',', '.'),
				"total_pagado" => number_format($totalpagado, '0', ',', '.'),
				"id_venta" => $cod_venta,
				"id_usuario" => $cod_usuarioFK,
				"productos" => $productos,
				"clase_fila" => $styleName
			);
			if(!$devolverArray){
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaventainformconf(this)'  >
<td style='width:15%'>" . $nrof . "</td>
<td  id='td_datos_1' style='display:none'>" . $fecha_venta . "</td>
<td    style='width:10%'>" . $fecha_venta2 . "</td>
<td id='td_datos_13' style='display:none'>" . $num_factura . "</td>
<td id='td_datos_12' style='width:5%'>" . $TipoVenta . "</td>
<td  id='td_datos_2' style='width:20%'>" . $clientenombre . "</td>
<td  id='td_datos_2' style='width:10%'>" . $nrodocumento . "</td>
<td  id='' style='width:10%'>" . number_format($totalventadetalle, '0', ',', '.') . "</td>
<td  id='' style='width:10%'>" . number_format($totaldescuentoaplicados, '0', ',', '.') . "</td>
<td  id='' style='display:none'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id='td_datos_8' style='display:none'>" . $cod_venta . "</td>
<td  id='td_datos_9' style='display:none'>" . $cod_usuarioFK . "</td>
<td  id='td_datos_10' style='width:10%'>" . $pagina2 . "</td>

</tr>
</table>";
		}
	}
	}

	mysqli_close($mysqli);
	/*Retornamos los datos obtenidos mediante el JSON */
	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina), "3" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}



function informeDeudaCliente($fecha1,$fecha2,$nroventa,$documento,$cliente,$tipo_cliente)
{
	$mysqli = conectar_al_servidor();


	$pagina = "";


	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = " and fecha_venta>='" . $fecha1 . "' and fecha_venta<='" . $fecha2 . "'";
	}
	
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = "and num_factura like '%" . $nroventa . "%'";
	}
	
	
	$condiciondocumento = "";
	if ($documento != "") {
		$condiciondocumento = "and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK limit 1)='" . $documento . "'";
	}
	
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK limit 1) like '%" . $cliente . "%'";
	}
	
	$condiciontipocliente = "";
	if($tipo_cliente !=""){
		$condiciontipocliente = " and (Select tipo_cliente from cliente where cod_cliente=vt.cod_clienteFK) = '$tipo_cliente'";
	}
	





	$sql = "Select tipo_comprobante,puntoexpedicion,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(Select ci_cliente from cliente where cod_cliente=idGaranteFk) as nrodogarante,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		(Select fechapago from credito where cod_venta=vt.cod_venta limit 1) as fecha_pago,
		IFNULL((Select dias from credito where cod_venta=vt.cod_venta limit 1),0) as diasgracia,
		IFNULL((Select interes from credito where cod_venta=vt.cod_venta limit 1),0) as intereses,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select direccion from persona where cod_persona=vt.cod_clienteFK) as direccion,
		(SELECT nombre FROM zona WHERE idzona = (Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK)) as zona,
		(Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lat,
		(Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lot,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		IFNULL((Select montodevuelto from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as montodevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,estadorefinanciado,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		(IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0)) as control_estado,
				IFNULL((Select sum(descuento) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalDescuentodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,vt.fecha_insert,vt.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito
		from  venta vt where cod_venta!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  "  .$condicionfecha.$condicionnroventa. $condiciondocumento. $condicioncliente.$condiciontipocliente."  order by vt.cod_venta asc limit 50";


/* echo $sql;
exit; */

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
	$styleName = "tableRegistroSearch";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha_venta = utf8_encode($valor['fecha_venta']);
			$total_venta = utf8_encode($valor['total_venta']);
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
			$cod_venta = utf8_encode($valor['cod_venta']);
			$cobradornombre = utf8_encode($valor['cobradornombre']);
			$nroCancelado = utf8_encode($valor['nroCancelado']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
			$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);
			$nombrevendedor2 = utf8_encode($valor['nombrevendedor2']);
			$cantidadcuota = utf8_encode($valor['cantidadcuota']);
			$Monto = utf8_encode($valor['Monto']);
			$fechaprimerpago = utf8_encode($valor['fechaprimerpago']);
			$comision = utf8_encode($valor['comision']);
			$cod_local = utf8_encode($valor['cod_local']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$pago = utf8_encode($valor['pago']);
			$nrodetalle = utf8_encode($valor['nrodetalle']);
			$nroCouta = utf8_encode($valor['nroCouta']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$nrodogarante = utf8_encode($valor['nrodogarante']);
			$diasgracia = utf8_encode($valor['diasgracia']);
			$intereses = utf8_encode($valor['intereses']);
			$telefono = utf8_encode($valor['telefono']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$totalDescuentodetalle = utf8_encode($valor['totalDescuentodetalle']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$insertadopor = utf8_encode($valor['insertadopor']);
			$estadorefinanciado = utf8_encode($valor['estadorefinanciado']);
			$editadopor = utf8_encode($valor['editadopor']);
			$fecha_insert = utf8_encode($valor['fecha_insert']);
			$fecha_edit = utf8_encode($valor['fecha_edit']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$lat = utf8_encode($valor['lat']);
			$lot = utf8_encode($valor['lot']);
			$fecha_pago = utf8_encode($valor['fecha_pago']);
			$direccion = utf8_encode($valor['direccion']);
			$zona = utf8_encode($valor['zona']);
			$control_estado = utf8_encode($valor['control_estado']);
			$controlFecha = date('Y-m-d');


			$estado_venta = '';
			if($control_estado < $total_venta){
				$estado_venta = 'PENDIENTE';
			}
			
			if($control_estado >= $total_venta){
				$estado_venta = 'PAGADO';
			}


			$styleRefinanciamiento = '';
			if ($estadorefinanciado == 'SI') {
				$styleRefinanciamiento = 'background-color:#ff9f00;color:white';
			} else {
				$estadorefinanciado = 'NO';
			}



			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0] + $totalDescuentodetalle;
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			$TotalDiasAtrasado = $datos[5];
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
			$deuda = $datos[8];
			$SubTotalDeuda = $datos[11];
			if ($SubTotalDeuda == 0) {
				$SubTotalDeuda = $total_venta;
			}
			$subtotalventa = $totalventadetalle - $totaldescuento;
			$totalinterespadado = $datos[12];
			$TotalPagoSininteres = $datos[13];
			$styleCancelado = "";
			$totalpagado = $totalpagado + $pago;
			$deudapendiente = $total_venta - $totalpagado;
			if ($nroCancelado == 0) {
				$TotalVentas = $total_venta + $TotalVentas;
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalDeuda = $TotalDeuda + $deuda;
			} else {
				$deudapendiente = 0;
				$totalpagado = ($totalpagado - $montodevuelto);
				if ($totalpagado < 0) {
					$totalpagado = 0;
				}
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalVentas = $total_venta + $TotalVentas;
				$styleCancelado = "background-color: #FFEB3B;color:#000";
			}
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
				$cuotasFaltantes = $nroCouta - buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			$nueva_fecha = date("d-m-Y", strtotime($fecha_venta));
			$fecha_pago = date("d-m-Y", strtotime($fecha_pago));
			
			$productos = buscar_detalles_venta_producto($cod_venta);

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' >



<td  id='td_datos_1' style='width:5%'>" . $nrof . "</td>
<td  id='td_datos_2' style='width:5%'>" . $nrodocliente . "</td>
<td  id='td_datos_3' style='width:10%'>" . $clientenombre . "</td>
<td  id='td_datos_4' style='width:5%'>GUARANÍES</td>
<td  id='td_datos_5' style='width:5%'>" . number_format($deuda, '0', ',', '.') . "</td>
<td  id='td_datos_6' style='width:5%'>" . number_format($totalintereses, '0', ',', '.') . "</td>
<td  id='td_datos_7' style='width:5%'>" . $nueva_fecha . "</td>
<td  id='td_datos_8' style='width:5%'>" . $fecha_pago . "</td>
<td  id='td_datos_9' style='width:5%'>" . $TotalDiasAtrasado . "</td>
<td  id='td_datos_10' style='width:5%'>" . $nroCouta . "</td>
<td  id='td_datos_11' style='width:5%'>" . $cuotasFaltantes . "</td>
<td  id='td_datos_12' style='width:5%'>".$estado_venta."</td>
<td  id='td_datos_13' style='width:5%'>" . number_format($subtotalventa, '0', ',', '.') . "</td>
<td  id='td_datos_14' style='width:5%'>" . $productos . "</td>
<td  id='td_datos_15' style='width:5%'>" . $telefono . "</td>
<td  id='td_datos_16' style='width:5%'>" . $direccion . "</td>
<td  id='td_datos_17' style='width:5%'>" . $zona . "</td>
<td  id='td_datos_18' style='width:5%'>PARAGUAYA</td>
<td  id='td_datos_19' style='width:5%'></td>

</tr>
</table>";

		}
	}

	$sql = "Select tipo_comprobante
		from venta vt where cod_venta!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   " . $condicionfecha.$condicionnroventa. $condiciondocumento. $condicioncliente.$condiciontipocliente. "  order by vt.cod_venta asc ";



	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$totalregistro = $valor;

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "99" => $nroRegistro, "100" => $totalregistro);
	echo json_encode($informacion);
	exit;
}

function masinformeDeudaCliente($fecha1,$fecha2,$nroventa,$documento,$cliente,$registrocargado,$tipo_cliente)
{
	$mysqli = conectar_al_servidor();


	$pagina = "";


	$condicionfecha = "";
	if ($fecha1 != "" && $fecha2 != "") {
		$condicionfecha = " and fecha_venta>='" . $fecha1 . "' and fecha_venta<='" . $fecha2 . "'";
	}
	
	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = "and num_factura like '%" . $nroventa . "%'";
	}
	
	
	$condiciondocumento = "";
	if ($documento != "") {
		$condiciondocumento = "and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK limit 1)='" . $documento . "'";
	}
	
	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK limit 1) like '%" . $cliente . "%'";
	}
	
	$condiciontipocliente = "";
	if($tipo_cliente !=""){
		$condiciontipocliente = " and (Select tipo_cliente from cliente where cod_cliente=vt.cod_clienteFK) = '$tipo_cliente'";
	}



	$sql = "Select tipo_comprobante,puntoexpedicion,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(Select ci_cliente from cliente where cod_cliente=idGaranteFk) as nrodogarante,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		(Select fechapago from credito where cod_venta=vt.cod_venta limit 1) as fecha_pago,
		IFNULL((Select dias from credito where cod_venta=vt.cod_venta limit 1),0) as diasgracia,
		IFNULL((Select interes from credito where cod_venta=vt.cod_venta limit 1),0) as intereses,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select direccion from persona where cod_persona=vt.cod_clienteFK) as direccion,
		(SELECT nombre FROM zona WHERE idzona = (Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK)) as zona,
		(Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lat,
		(Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lot,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		IFNULL((Select montodevuelto from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as montodevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,estadorefinanciado,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		(IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0)) as control_estado,
				IFNULL((Select sum(descuento) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalDescuentodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,vt.fecha_insert,vt.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito
		from  venta vt where cod_venta!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  "  .$condicionfecha.$condicionnroventa. $condiciondocumento. $condicioncliente.$condiciontipocliente."  order by vt.cod_venta asc limit ".$registrocargado.",50";


/* echo $sql;
exit; */

	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor + $registrocargado;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
	$styleName = "tableRegistroSearch";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha_venta = utf8_encode($valor['fecha_venta']);
			$total_venta = utf8_encode($valor['total_venta']);
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
			$cod_venta = utf8_encode($valor['cod_venta']);
			$cobradornombre = utf8_encode($valor['cobradornombre']);
			$nroCancelado = utf8_encode($valor['nroCancelado']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
			$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);
			$nombrevendedor2 = utf8_encode($valor['nombrevendedor2']);
			$cantidadcuota = utf8_encode($valor['cantidadcuota']);
			$Monto = utf8_encode($valor['Monto']);
			$fechaprimerpago = utf8_encode($valor['fechaprimerpago']);
			$comision = utf8_encode($valor['comision']);
			$cod_local = utf8_encode($valor['cod_local']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$pago = utf8_encode($valor['pago']);
			$nrodetalle = utf8_encode($valor['nrodetalle']);
			$nroCouta = utf8_encode($valor['nroCouta']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$nrodogarante = utf8_encode($valor['nrodogarante']);
			$diasgracia = utf8_encode($valor['diasgracia']);
			$intereses = utf8_encode($valor['intereses']);
			$telefono = utf8_encode($valor['telefono']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$totalDescuentodetalle = utf8_encode($valor['totalDescuentodetalle']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$insertadopor = utf8_encode($valor['insertadopor']);
			$estadorefinanciado = utf8_encode($valor['estadorefinanciado']);
			$editadopor = utf8_encode($valor['editadopor']);
			$fecha_insert = utf8_encode($valor['fecha_insert']);
			$fecha_edit = utf8_encode($valor['fecha_edit']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$lat = utf8_encode($valor['lat']);
			$lot = utf8_encode($valor['lot']);
			$fecha_pago = utf8_encode($valor['fecha_pago']);
			$direccion = utf8_encode($valor['direccion']);
			$zona = utf8_encode($valor['zona']);
			$control_estado = utf8_encode($valor['control_estado']);
			$controlFecha = date('Y-m-d');


			$estado_venta = '';
			if($control_estado < $total_venta){
				$estado_venta = 'PENDIENTE';
			}
			
			if($control_estado >= $total_venta){
				$estado_venta = 'PAGADO';
			}


			$styleRefinanciamiento = '';
			if ($estadorefinanciado == 'SI') {
				$styleRefinanciamiento = 'background-color:#ff9f00;color:white';
			} else {
				$estadorefinanciado = 'NO';
			}



			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0] + $totalDescuentodetalle;
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			$TotalDiasAtrasado = $datos[5];
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
			$deuda = $datos[8];
			$SubTotalDeuda = $datos[11];
			if ($SubTotalDeuda == 0) {
				$SubTotalDeuda = $total_venta;
			}
			$subtotalventa = $totalventadetalle - $totaldescuento;
			$totalinterespadado = $datos[12];
			$TotalPagoSininteres = $datos[13];
			$styleCancelado = "";
			$totalpagado = $totalpagado + $pago;
			$deudapendiente = $total_venta - $totalpagado;
			if ($nroCancelado == 0) {
				$TotalVentas = $total_venta + $TotalVentas;
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalDeuda = $TotalDeuda + $deuda;
			} else {
				$deudapendiente = 0;
				$totalpagado = ($totalpagado - $montodevuelto);
				if ($totalpagado < 0) {
					$totalpagado = 0;
				}
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalVentas = $total_venta + $TotalVentas;
				$styleCancelado = "background-color: #FFEB3B;color:#000";
			}
			$cuotasFaltantes = 0;
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
				$cuotasFaltantes = $nroCouta - buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			$nueva_fecha = date("d-m-Y", strtotime($fecha_venta));
			$fecha_pago = date("d-m-Y", strtotime($fecha_pago));
			
			$productos = buscar_detalles_venta_producto($cod_venta);

			$styleName = CargarStyleTable($styleName);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' >


<td  id='td_datos_1' style='width:5%'>" . $nrof . "</td>
<td  id='td_datos_2' style='width:5%'>" . $nrodocliente . "</td>
<td  id='td_datos_3' style='width:10%'>" . $clientenombre . "</td>
<td  id='td_datos_4' style='width:5%'>GUARANÍES</td>
<td  id='td_datos_5' style='width:5%'>" . number_format($deuda, '0', ',', '.') . "</td>
<td  id='td_datos_6' style='width:5%'>" . number_format($totalintereses, '0', ',', '.') . "</td>
<td  id='td_datos_7' style='width:5%'>" . $nueva_fecha . "</td>
<td  id='td_datos_8' style='width:5%'>" . $fecha_pago . "</td>
<td  id='td_datos_9' style='width:5%'>" . $TotalDiasAtrasado . "</td>
<td  id='td_datos_10' style='width:5%'>" . $nroCouta . "</td>
<td  id='td_datos_11' style='width:5%'>" . $cuotasFaltantes . "</td>
<td  id='td_datos_12' style='width:5%'>".$estado_venta."</td>
<td  id='td_datos_13' style='width:5%'>" . number_format($subtotalventa, '0', ',', '.') . "</td>
<td  id='td_datos_14' style='width:5%'>" . $productos . "</td>
<td  id='td_datos_15' style='width:5%'>" . $telefono . "</td>
<td  id='td_datos_16' style='width:5%'>" . $direccion . "</td>
<td  id='td_datos_17' style='width:5%'>" . $zona . "</td>
<td  id='td_datos_18' style='width:5%'>PARAGUAYA</td>
<td  id='td_datos_19' style='width:5%'></td>

</tr>
</table>";

		}
	}

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => $pagina, "3" => $nroRegistro, "99" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}


function buscar_total_cobros_general($anho,$local,$tipo)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_cobro_dia($anho,$i,$x,$local,$tipo);
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}
function buscar_total_cobros_general_incremental($anho,$local,$tipo)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	$contador = 0;
	
	
	$array_cobros_total = array();
	$array_colores = array();
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_cobro_dia($anho,$i,$x,$local,$tipo);
			if($i == 1){
				$totalVenta1 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta1, '0', ',', '.') . "</td>";
				$pagina.= $td;
				$contador++;
			}
			if($i == 2){
				$totalVenta2 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta2, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 3){
				$totalVenta3 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta3, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 4){
				$totalVenta4 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta4, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 5){
				$totalVenta5 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta5, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 6){
				$totalVenta6 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta6, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 7){
				$totalVenta7 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta7, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 8){
				$totalVenta8 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta8, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 9){
				$totalVenta9 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta9, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 10){
				$totalVenta10 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta10, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 11){
				$totalVenta11 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta11, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 12){
				$totalVenta12 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta12, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			
		}
		
		
		
		$pagina.="</tr>
		</table>";
	}
	
	
	
	
	
	
	array_push($array_cobros_total,$totalVenta1);
	array_push($array_cobros_total,$totalVenta2);
	array_push($array_cobros_total,$totalVenta3);
	array_push($array_cobros_total,$totalVenta4);
	array_push($array_cobros_total,$totalVenta5);
	array_push($array_cobros_total,$totalVenta6);
	array_push($array_cobros_total,$totalVenta7);
	array_push($array_cobros_total,$totalVenta8);
	array_push($array_cobros_total,$totalVenta9);
	array_push($array_cobros_total,$totalVenta10);
	array_push($array_cobros_total,$totalVenta11);
	array_push($array_cobros_total,$totalVenta12);
	
	
	$color = '';
	for($i=1; $i <= 12; $i++){
		$color = generarColorHexAleatorio();
		array_push($array_colores,$color);
	}

	$informacion = array("1" => "exito", "2" => $pagina,"3"=>$array_cobros_total,"4"=>$array_colores);
	echo json_encode($informacion);
	exit;
}

function buscar_total_cobros_general_grafica($anho,$local,$tipo)
{
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	$array_cobros_total_1 = array();
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {
			
			$total = obtener_total_cobro_dia($anho,$i,$x,$local,$tipo);
			if($i == 1){
				$totalVenta1 += $total;
				
			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	
	
	array_push($array_cobros_total_1,$totalVenta1);
	array_push($array_cobros_total_1,$totalVenta2);
	array_push($array_cobros_total_1,$totalVenta3);
	array_push($array_cobros_total_1,$totalVenta4);
	array_push($array_cobros_total_1,$totalVenta5);
	array_push($array_cobros_total_1,$totalVenta6);
	array_push($array_cobros_total_1,$totalVenta7);
	array_push($array_cobros_total_1,$totalVenta8);
	array_push($array_cobros_total_1,$totalVenta9);
	array_push($array_cobros_total_1,$totalVenta10);
	array_push($array_cobros_total_1,$totalVenta11);
	array_push($array_cobros_total_1,$totalVenta12);
	
	
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	
	$array_cobros_total_2 = array();
	
	$anho2 = $anho;
	$anho2 = intval($anho2);
	$anho2--;
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {
			
			$total = obtener_total_cobro_dia($anho2,$i,$x,$local,$tipo);
			if($i == 1){
				$totalVenta1 += $total;
				
			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	
	array_push($array_cobros_total_2,$totalVenta1);
	array_push($array_cobros_total_2,$totalVenta2);
	array_push($array_cobros_total_2,$totalVenta3);
	array_push($array_cobros_total_2,$totalVenta4);
	array_push($array_cobros_total_2,$totalVenta5);
	array_push($array_cobros_total_2,$totalVenta6);
	array_push($array_cobros_total_2,$totalVenta7);
	array_push($array_cobros_total_2,$totalVenta8);
	array_push($array_cobros_total_2,$totalVenta9);
	array_push($array_cobros_total_2,$totalVenta10);
	array_push($array_cobros_total_2,$totalVenta11);
	array_push($array_cobros_total_2,$totalVenta12);
	

	$informacion = array("1" => "exito","3"=>$array_cobros_total_1,"4"=>$array_cobros_total_2,"5"=>$anho,"6"=>$anho2);
	echo json_encode($informacion);
	exit;
}

function buscar_total_a_cobrar($anho,$local,$tipo,$array_cod_tipo_cliente_cuentas_a_cobrar,$cobradorFK)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_a_cobrar_dia($anho,$i,$x,$local,$tipo,$array_cod_tipo_cliente_cuentas_a_cobrar,$cobradorFK);
			
			$i_control = $i;
			if($i < 10){
				$i_control = "0".$i_control;
			}
			
			$x_control = $x;
			if($x < 10){
				$x_control = "0".$x_control;
			}
			
			$td = "<td style='width:5%' data-id='$anho-$i_control-$x_control' onclick='datos_cuentas_a_cobrar(this)' id='td_datos_cuenta_".$i."_".$x."'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}
function buscar_total_a_cobrar_incremental($anho,$local,$tipo)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	$contador = 0;
	
	
	$array_cobros_total = array();
	$array_colores = array();
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_a_cobrar_dia($anho,$i,$x,$local,$tipo);
			if($i == 1){
				$totalVenta1 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta1, '0', ',', '.') . "</td>";
				$pagina.= $td;
				$contador++;
			}
			if($i == 2){
				$totalVenta2 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta2, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 3){
				$totalVenta3 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta3, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 4){
				$totalVenta4 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta4, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 5){
				$totalVenta5 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta5, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 6){
				$totalVenta6 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta6, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 7){
				$totalVenta7 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta7, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 8){
				$totalVenta8 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta8, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 9){
				$totalVenta9 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta9, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 10){
				$totalVenta10 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta10, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 11){
				$totalVenta11 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta11, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 12){
				$totalVenta12 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta12, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			
		}
		
		
		
		$pagina.="</tr>
		</table>";
	}
	
	
	
	
	
	
	array_push($array_cobros_total,$totalVenta1);
	array_push($array_cobros_total,$totalVenta2);
	array_push($array_cobros_total,$totalVenta3);
	array_push($array_cobros_total,$totalVenta4);
	array_push($array_cobros_total,$totalVenta5);
	array_push($array_cobros_total,$totalVenta6);
	array_push($array_cobros_total,$totalVenta7);
	array_push($array_cobros_total,$totalVenta8);
	array_push($array_cobros_total,$totalVenta9);
	array_push($array_cobros_total,$totalVenta10);
	array_push($array_cobros_total,$totalVenta11);
	array_push($array_cobros_total,$totalVenta12);
	
	
	$color = '';
	for($i=1; $i <= 12; $i++){
		$color = generarColorHexAleatorio();
		array_push($array_colores,$color);
	}

	$informacion = array("1" => "exito", "2" => $pagina,"3"=>$array_cobros_total,"4"=>$array_colores);
	echo json_encode($informacion);
	exit;
}

function buscar_total_a_cobrar_grafica($anho,$local,$tipo)
{
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	$array_cobros_total_1 = array();
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {
			
			$total = obtener_total_a_cobrar_dia($anho,$i,$x,$local,$tipo);
			if($i == 1){
				$totalVenta1 += $total;
				
			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	
	
	array_push($array_cobros_total_1,$totalVenta1);
	array_push($array_cobros_total_1,$totalVenta2);
	array_push($array_cobros_total_1,$totalVenta3);
	array_push($array_cobros_total_1,$totalVenta4);
	array_push($array_cobros_total_1,$totalVenta5);
	array_push($array_cobros_total_1,$totalVenta6);
	array_push($array_cobros_total_1,$totalVenta7);
	array_push($array_cobros_total_1,$totalVenta8);
	array_push($array_cobros_total_1,$totalVenta9);
	array_push($array_cobros_total_1,$totalVenta10);
	array_push($array_cobros_total_1,$totalVenta11);
	array_push($array_cobros_total_1,$totalVenta12);
	
	
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	
	$array_cobros_total_2 = array();
	
	$anho2 = $anho;
	$anho2 = intval($anho2);
	$anho2--;
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {
			
			$total = obtener_total_a_cobrar_dia($anho2,$i,$x,$local,$tipo);
			if($i == 1){
				$totalVenta1 += $total;
				
			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	
	array_push($array_cobros_total_2,$totalVenta1);
	array_push($array_cobros_total_2,$totalVenta2);
	array_push($array_cobros_total_2,$totalVenta3);
	array_push($array_cobros_total_2,$totalVenta4);
	array_push($array_cobros_total_2,$totalVenta5);
	array_push($array_cobros_total_2,$totalVenta6);
	array_push($array_cobros_total_2,$totalVenta7);
	array_push($array_cobros_total_2,$totalVenta8);
	array_push($array_cobros_total_2,$totalVenta9);
	array_push($array_cobros_total_2,$totalVenta10);
	array_push($array_cobros_total_2,$totalVenta11);
	array_push($array_cobros_total_2,$totalVenta12);
	

	$informacion = array("1" => "exito","3"=>$array_cobros_total_1,"4"=>$array_cobros_total_2,"5"=>$anho,"6"=>$anho2);
	echo json_encode($informacion);
	exit;
}


function obtener_total_cobro_dia($anho,$mes,$dia,$local,$tipo)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }
	 
	 $condiciontipo="";
	 if($tipo!=""){
	   $condiciontipo=" and Tipo='".$tipo."'";		
	 }
 
 
	$sql = "Select ifnull(sum(Monto),0) as TotalPagos from  pago inner join venta vt on cod_venta=cod_venta_fk  where Fecha = '$fecha'    ".$condicionlocal. $condiciontipo;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalPagos = '';

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalPagos = $valor['TotalPagos'];
		}
	}
	
	return $TotalPagos;
}

function obtener_total_a_cobrar_dia($anho,$mes,$dia,$local,$tipo,$array_cod_tipo_cliente_cuentas_a_cobrar,$cobradorFK)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and v.cod_local='".$local."'";		
	 }
	 
	 
	 $condicioncobradorFK="";
	 if($cobradorFK!=""){
	    $condicioncobradorFK=" and z.cod_cobradorFK = '$cobradorFK'";	
	 }
	 
	 // $condiciontipo="";
	 // if($tipo!=""){
	   // $condiciontipo=" and Tipo='".$tipo."'";		
	 // }
	 
	 
	  $condiciontipo = '';
 if(count($array_cod_tipo_cliente_cuentas_a_cobrar) > 0){
 $condicionIn= "";
$contador = 0;
foreach ($array_cod_tipo_cliente_cuentas_a_cobrar as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}

$condiciontipo=" and c.cod_tipomora in ($condicionIn)";
 }
 
 $CondicionVentaCod_tipoVenta="";
 // $fechahoy=date('Y-m-d');	
	$sql = "select (cr.Monto - cr.descuento) as total ,  IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0) as pagado
 from  credito cr inner join venta v on cr.cod_venta = v.cod_venta
 inner join cliente c on c.cod_cliente = v.cod_clienteFK
 inner join zona z on z.idzona = c.idzonaFk
 where ( cr.Monto - cr.descuento ) - IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and
 pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where cr.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones c where cr.cod_venta=c.cod_venta limit 1),0)=0  and  cr.fechapago='$fecha' ".$condicionlocal.$condiciontipo.$condicioncobradorFK.$CondicionVentaCod_tipoVenta." ";
 
 // echo $sql;
 // exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$totalacobrar = 0;
$deuda = 0;
set_time_limit(2147483647);
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
                
		$total = utf8_encode($valor['total']);          
		$pagado = utf8_encode($valor['pagado']);          
		  
		$totalacobrar+=($total - $pagado);
 
		}
	}
	
	mysqli_close($mysqli);
	return $totalacobrar;
}


function buscar_total_ventas_general($anho,$local,$tipo_venta)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_venta_dia($anho,$i,$x,$local,$tipo_venta);
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}

function generarColorHexAleatorio() {
    // Genera un número aleatorio entre 0 y 255 para cada componente RGB
    $rojo = dechex(rand(0, 255)); // Componente rojo
    $verde = dechex(rand(0, 255)); // Componente verde
    $azul = dechex(rand(0, 255)); // Componente azul

    // Asegúrate de que cada valor tenga 2 caracteres
    if (strlen($rojo) < 2) {
        $rojo = '0' . $rojo;
    }
    if (strlen($verde) < 2) {
        $verde = '0' . $verde;
    }
    if (strlen($azul) < 2) {
        $azul = '0' . $azul;
    }

    // Concatenar los valores y devolver el color hexadecimal
    return '#' . $rojo . $verde . $azul;
}

function buscar_total_ventas_general_incremental($anho,$local,$tipo_venta)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	$contador = 0;
	
	$array_total_ventas = array();
	$array_colores = array();
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_venta_dia($anho,$i,$x,$local,$tipo_venta);
			if($i == 1){
				$totalVenta1 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta1, '0', ',', '.') . "</td>";
				$pagina.= $td;
				$contador++;
			}
			if($i == 2){
				$totalVenta2 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta2, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 3){
				$totalVenta3 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta3, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 4){
				$totalVenta4 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta4, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 5){
				$totalVenta5 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta5, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 6){
				$totalVenta6 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta6, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 7){
				$totalVenta7 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta7, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 8){
				$totalVenta8 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta8, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 9){
				$totalVenta9 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta9, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 10){
				$totalVenta10 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta10, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 11){
				$totalVenta11 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta11, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			if($i == 12){
				$totalVenta12 += $total;
				$td = "<td style='width:5%'>" .  number_format($totalVenta12, '0', ',', '.') . "</td>";
				$pagina.= $td;
			}
			
		}
		
		
		
		$pagina.="</tr>
		</table>";
	}
	
	
	array_push($array_total_ventas,$totalVenta1);
	array_push($array_total_ventas,$totalVenta2);
	array_push($array_total_ventas,$totalVenta3);
	array_push($array_total_ventas,$totalVenta4);
	array_push($array_total_ventas,$totalVenta5);
	array_push($array_total_ventas,$totalVenta6);
	array_push($array_total_ventas,$totalVenta7);
	array_push($array_total_ventas,$totalVenta8);
	array_push($array_total_ventas,$totalVenta9);
	array_push($array_total_ventas,$totalVenta10);
	array_push($array_total_ventas,$totalVenta11);
	array_push($array_total_ventas,$totalVenta12);
	
	
	$color = '';
	for($i=1; $i <= 12; $i++){
		$color = generarColorHexAleatorio();
		array_push($array_colores,$color);
	}
	

	$informacion = array("1" => "exito", "2" => $pagina,"3"=>$array_total_ventas,"4"=>$array_colores);
	echo json_encode($informacion);
	exit;
}

function buscar_total_ventas_general_grafica($anho,$local,$tipo_venta)
{
	
	
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	

	
	$array_total_ventas_1 = array();
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {

			$total = obtener_total_venta_dia($anho,$i,$x,$local,$tipo_venta);
			if($i == 1){
				$totalVenta1 += $total;

			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	
	array_push($array_total_ventas_1,$totalVenta1);
	array_push($array_total_ventas_1,$totalVenta2);
	array_push($array_total_ventas_1,$totalVenta3);
	array_push($array_total_ventas_1,$totalVenta4);
	array_push($array_total_ventas_1,$totalVenta5);
	array_push($array_total_ventas_1,$totalVenta6);
	array_push($array_total_ventas_1,$totalVenta7);
	array_push($array_total_ventas_1,$totalVenta8);
	array_push($array_total_ventas_1,$totalVenta9);
	array_push($array_total_ventas_1,$totalVenta10);
	array_push($array_total_ventas_1,$totalVenta11);
	array_push($array_total_ventas_1,$totalVenta12);



	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	
	$array_total_ventas_2 = array();
	$anho2 = $anho;
	$anho2 = intval($anho2);
	$anho2--;
	
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {

			$total = obtener_total_venta_dia($anho2,$i,$x,$local,$tipo_venta);
			if($i == 1){
				$totalVenta1 += $total;

			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	array_push($array_total_ventas_2,$totalVenta1);
	array_push($array_total_ventas_2,$totalVenta2);
	array_push($array_total_ventas_2,$totalVenta3);
	array_push($array_total_ventas_2,$totalVenta4);
	array_push($array_total_ventas_2,$totalVenta5);
	array_push($array_total_ventas_2,$totalVenta6);
	array_push($array_total_ventas_2,$totalVenta7);
	array_push($array_total_ventas_2,$totalVenta8);
	array_push($array_total_ventas_2,$totalVenta9);
	array_push($array_total_ventas_2,$totalVenta10);
	array_push($array_total_ventas_2,$totalVenta11);
	array_push($array_total_ventas_2,$totalVenta12);



	$informacion = array("1" => "exito","3"=>$array_total_ventas_1,"4"=>$array_total_ventas_2,"5"=>$anho,"6"=>$anho2);
	echo json_encode($informacion);
	exit;
}


function obtener_total_venta_dia($anho,$mes,$dia,$local,$tipo)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and vt.fecha_venta = '$fecha' ";
	 
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and  cod_local ='" . $local . "'";
	}
	
	 $condiciontipoventa = "";
	if ($tipo != "") {
		$condiciontipoventa = " and  vt.TipoVenta ='" . $tipo . "'";
	}
 
 
	$sql = "Select ifnull(sum(total_venta),0) as totalVenta from venta vt where IFNULL((Select count(fecha) from cancelaciones c where c.cod_venta=vt.cod_venta limit 1),0)=0   and (select estado from local l where l.cod_local=vt.cod_local)='Activo' ".$condicionFecha.$condicionlocal.$condiciontipoventa;
 
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = '';

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalVentas = $valor['totalVenta'];
		}
	}
	
	return $TotalVentas;
}

function buscar_detalles_venta_en_cuentas_a_cobrar($buscar,$codclienteFK)
{
$mysqli=conectar_al_servidor();

$sql= "select pr.nombre_producto,dtv.detalleproducto,
 IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$cod_venta = $buscar;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$a=1;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$nombre_producto = utf8_decode($valor['nombre_producto']);      
$nroDevoluciones = utf8_decode($valor['nroDevoluciones']);      
$nroCambios = utf8_decode($valor['nroCambios']);      
$nroGarantia = utf8_decode($valor['nroGarantia']);      
$detalleproducto = utf8_decode($valor['detalleproducto']);      
if($nroDevoluciones==0 && $nroCambios==0){
	/* if($pagina==""){
	$pagina.=$a.") &nbsp".$nombre_producto;	
	}else{
		$pagina.="<br>".$a.") &nbsp".$nombre_producto;	
	}
  $a=$a+1; */
  
  
  
   $pagina.="
			  <table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatoscreditodetalle(this)'>
			  <td id='td_id_1' style='display:none;'>".$cod_venta."</td>
			  <td id='td_id_2' style='display:none;'>".$codclienteFK."</td>
			  <td id=''style='width:100%' >".$nombre_producto."</td>
			  </tr>
			  </table>";
  
}

}
}
 mysqli_close($mysqli);
return utf8_decode($pagina);
}


function confirmar_venta_anulada($idVentaAnulada,$user)
{

$mysqli=conectar_al_servidor();


$consulta1="Update solicitud_anulacion set estado_confirmado='CONFIRMADO',cod_usuConfirmado ='$user' where idsolicitud_anulacion='$idVentaAnulada'";
$stmt1 = $mysqli->prepare($consulta1);



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function buscar_ventas_clientes_trabajados($fechafiltro, $nroventa, $cliente, $tipoventa, $estadocuenta, $cod_local,$tipo_cliente,$formato='')
{
	$mysqli = conectar_al_servidor();
	$pagina = "";
	$filas = array();

	$condicionfechafiltro = "";
	if ($fechafiltro != "") {
		$condicionfechafiltro = " and fecha_venta='" . $fechafiltro . "'";
	}

	$condicionnroventa = "";
	if ($nroventa != "") {
		$condicionnroventa = "and concat(puntoexpedicion,'-',num_factura) like '%" . $nroventa . "%'";
	}

	$condicioncliente = "";
	if ($cliente != "") {
		$condicioncliente = "and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK limit 1) like '%" . $cliente . "%'";
	}
	
	$condiciontipo_cliente = "";
	if ($tipo_cliente != "") {
		$condiciontipo_cliente = "and (Select tipo_cliente from cliente cl where cl.cod_cliente=cod_clienteFK) = '" . $tipo_cliente . "'";
	}
	
	$condicionCuenta = " ";
	
	//Pendientes
	if ($estadocuenta == "1") {
		$condicionCuenta = " and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))<total_venta";
	}
	//Pagados
	if ($estadocuenta == "2") {
		$condicionCuenta = " and (IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) + IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0))>=total_venta";
	}
	
	//Cancelados
	if ($estadocuenta == "3") {
		$condicionCuenta = " and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)>0";
	}
	
	$condiciontipoventa = " ";
	if ($tipoventa != "") {
		$condiciontipoventa = " and TipoVenta='$tipoventa'";
	}

	$condicionCodLocal = " ";
	if ($cod_local != "") {
		$condicionCodLocal = " and vt.cod_local='$cod_local' ";
	}





	$sql = "Select tipo_comprobante,puntoexpedicion,idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,vt.comision,cod_local,pago,
		 (Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(Select ci_cliente from cliente where cod_cliente=idGaranteFk) as nrodogarante,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select dias from credito where cod_venta=vt.cod_venta limit 1),0) as diasgracia,
		IFNULL((Select interes from credito where cod_venta=vt.cod_venta limit 1),0) as intereses,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=idGaranteFk) as Garante,
		(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lat,
		(Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1) as lot,
		codmoracliente as tipo_estado,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(cod_detalle) from detalle_venta where cod_ventaFK=cod_venta) as nrodetalle,
		(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
		IFNULL((Select sum(precio_producto*cantidad_detalle) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalventadetalle,
		IFNULL((Select montodevuelto from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as montodevuelto,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,estadorefinanciado,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
				IFNULL((Select sum(descuento) from detalle_venta where cod_ventaFK=vt.cod_venta limit 1),0) as totalDescuentodetalle,
		(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,vt.fecha_insert,vt.fecha_edit,
		(SELECT count(cod_venta) FROM clientes_trabajados ct WHERE vt.cod_venta = ct.cod_venta) as contador_cliente,
		(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
		(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor,
		(Select accesocredito from cliente where cod_cliente=cod_clienteFK) as accesocredito
		from  venta vt inner join detalle_venta dt on vt.cod_venta = dt.cod_ventaFK where cod_venta!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  "   . $condicionfechafiltro . $condicionnroventa  . $condicioncliente  . $condicionCuenta . $condiciontipoventa . $condicionCodLocal.$condiciontipo_cliente." group by vt.cod_venta order by vt.cod_venta asc limit 100";



	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$TotalVentas = 0;
	$TotalPagos = 0;
	$TotalDeuda = 0;
	$styleName = "tableRegistroSearch";
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {


			$fecha_venta = utf8_encode($valor['fecha_venta']);
			$total_venta = utf8_encode($valor['total_venta']);
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
			$cod_venta = utf8_encode($valor['cod_venta']);
			$cobradornombre = utf8_encode($valor['cobradornombre']);
			$nroCancelado = utf8_encode($valor['nroCancelado']);
			$montodevuelto = utf8_encode($valor['montodevuelto']);
			$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);
			$nombrevendedor2 = utf8_encode($valor['nombrevendedor2']);
			$cantidadcuota = utf8_encode($valor['cantidadcuota']);
			$Monto = utf8_encode($valor['Monto']);
			$fechaprimerpago = utf8_encode($valor['fechaprimerpago']);
			$comision = utf8_encode($valor['comision']);
			$cod_local = utf8_encode($valor['cod_local']);
			$nombrelocal = utf8_encode($valor['nombrelocal']);
			$pago = utf8_encode($valor['pago']);
			$nrodetalle = utf8_encode($valor['nrodetalle']);
			$nroCouta = utf8_encode($valor['nroCouta']);
			$idGaranteFk = utf8_encode($valor['idGaranteFk']);
			$Garante = utf8_encode($valor['Garante']);
			$nrodocliente = utf8_encode($valor['nrodocliente']);
			$nrodogarante = utf8_encode($valor['nrodogarante']);
			$diasgracia = utf8_encode($valor['diasgracia']);
			$intereses = utf8_encode($valor['intereses']);
			$telefono = utf8_encode($valor['telefono']);
			$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
			$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			$totalDescuentodetalle = utf8_encode($valor['totalDescuentodetalle']);
			$totalventadetalle = utf8_encode($valor['totalventadetalle']);
			$insertadopor = utf8_encode($valor['insertadopor']);
			$estadorefinanciado = utf8_encode($valor['estadorefinanciado']);
			$editadopor = utf8_encode($valor['editadopor']);
			$fecha_insert = utf8_encode($valor['fecha_insert']);
			$fecha_edit = utf8_encode($valor['fecha_edit']);
			$accesocredito = utf8_encode($valor['accesocredito']);
			$lat = utf8_encode($valor['lat']);
			$lot = utf8_encode($valor['lot']);
			$tipo_estado = utf8_encode($valor['tipo_estado']);
			$contador_cliente = utf8_encode($valor['contador_cliente']);
			$controlFecha = date('Y-m-d');


			



			$datos = calcularintereses2($cod_venta, 0, 0, "2", "2", "2", "no");
			$totaldescuento = $datos[0] + $totalDescuentodetalle;
			$totalintereses = $datos[1];
			//$datos[2]=$TotalEnDeuda;
			$totalpagado = $datos[13];
			//$datos[4]=$TotalAPagar;
			// $datos[5]=$TotalDiasAtrasado;
			// $datos[6]=$nrodecuotasatrazado;
			// $datos[7]=$TotalApagarSinInteres;
			$deuda = $datos[8];
			$SubTotalDeuda = $datos[11];
			if ($SubTotalDeuda == 0) {
				$SubTotalDeuda = $total_venta;
			}
			$subtotalventa = $totalventadetalle + $totaldescuento;
			$totalinterespadado = $datos[12];
			$TotalPagoSininteres = $datos[13];
			$styleCancelado = "";
			$totalpagado = $totalpagado + $pago;
			$deudapendiente = $total_venta - $totalpagado;
			if ($nroCancelado == 0) {
				$TotalVentas = $total_venta + $TotalVentas;
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalDeuda = $TotalDeuda + $deuda;
			} else {
				$deudapendiente = 0;
				$totalpagado = ($totalpagado - $montodevuelto);
				if ($totalpagado < 0) {
					$totalpagado = 0;
				}
				$TotalPagos = $TotalPagos + $totalpagado;
				$TotalVentas = $total_venta + $TotalVentas;
				$styleCancelado = "background-color: #FFEB3B;color:#000";
			}
			if ($TipoVenta == "CREDITO") {
				$cuotas = $nroCouta . "/" . buscarcantidadcuotapagados($cod_venta);
			} else {
				$cuotas = "CONTADO";
			}
			if ($puntoexpedicion != "") {
				$nrof = $puntoexpedicion . "-" . $num_factura;
			} else {
				$nrof = $num_factura;
			}

			$nueva_fecha = date("d-m-Y", strtotime($fecha_venta));
			$detalle_venta = buscar_detalles_venta($cod_venta);
			
			$p_tipo = '';
			$nombre_tipo_estado = '';
			if($tipo_estado != '0'){
				$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
				$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
			}

	$style_boton_nuevo = '#4caf50';
		if($contador_cliente > 0){
			$style_boton_nuevo = '#3b7ddd';
		}

$Accion="<input type='Button' onclick='verCerrarCargarDetalleClientesTrabajados(this)' value='Nuevo (".$contador_cliente.")' class='btn4' id='$cod_venta'  style='background-color: ".$style_boton_nuevo.";width:100%;' />";

			$styleName = CargarStyleTable($styleName);
			$filas[] = array(
				'cod_venta'=>$cod_venta,
				'factura'=>$nrof,
				'fecha_venta'=>$fecha_venta,
				'tipo_venta'=>$TipoVenta,
				'tipo_estado_cliente'=>$nombre_tipo_estado,
				'cliente'=>$clientenombre,
				'documento'=>$nrodocliente,
				'subtotal_formateado'=>number_format($subtotalventa, '0', ',', '.'),
				'descuento_formateado'=>number_format($totaldescuento, '0', ',', '.'),
				'total_venta_formateado'=>number_format($total_venta, '0', ',', '.'),
				'total_pagado_formateado'=>number_format($totalpagado, '0', ',', '.'),
				'cantidad_gestiones'=>$contador_cliente,
				'color_accion'=>$style_boton_nuevo,
				'clase_fila'=>$styleName
			);
			$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td  style='width:10%'>" . $nrof . "</td>
<td  style='width:10%'>" . $fecha_venta . "</td>
<td  id=''	 style='width:5%'>" . $TipoVenta . "</td>
<td  id='' 	style='width:20%'>" . $p_tipo.$clientenombre . "</td>
<td  		style='width:5%'>" . $nrodocliente . "</td>
<td  id=''	 style='width:5%'>" . number_format($subtotalventa, '0', ',', '.') . "</td>
<td  id=''	 style='width:5%'>" . number_format($totaldescuento, '0', ',', '.') . "</td>
<td  id=''	 style='width:5%'>" . number_format($total_venta, '0', ',', '.') . "</td>
<td  id=''	 style='width:5%'>" . number_format($totalpagado, '0', ',', '.') . "</td>
<td  id=''	 style='width:5%'>
".$Accion."
</td>
</tr>
</table>";
		}
	}

	

	mysqli_close($mysqli);
	$informacion = array("1" => "exito", "2" => ($formato==='json' ? $filas : $pagina), "3" => $nroRegistro);
	echo json_encode($informacion);
	exit;
}
function cargar_detalle_clientes_trabajados($cod_venta,$descripcion,$estado_cliente)
{
	$user = $_POST['useru'];
	$user = utf8_decode($user);
	$fecha_insert = date('Y-m-d');
	
	
	$mysqli = conectar_al_servidor();
	$consulta1 = "INSERT INTO clientes_trabajados (descripcion,estado,cod_venta,fecha,cod_user_insert,estado_cliente) values ('$descripcion','Activo','$cod_venta','$fecha_insert','$user','$estado_cliente')";
	
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

function informeClientesTrabajados($local,$fecha1,$fecha2,$fecha,$tipo_cliente,$cliente,$estado_cliente,$cod_usuario,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	
 
	$condicionBetFecha="";
	 if($fecha1!="" && $fecha2!=""){
		 $condicionBetFecha=" and ct.fecha between '".$fecha1."' and '".$fecha2."'";
	 }
	 
	 $condicionfecha="";
	 if($fecha!=""){
		 $condicionfecha=" and ct.fecha = '".$buscar."' ";
	 }
	 
	
	 $condicionlocal="";
	 if($local!=""){
		 $condicionlocal=" and vt.cod_local = '".$local."' ";
	 } 
	 
	 $condicionestado_cliente="";
	 if($estado_cliente!=""){
		 $condicionestado_cliente=" and ct.estado_cliente = '".$estado_cliente."' ";
	 } 
	  
	  $condicioncod_usuario="";
	 if($cod_usuario!=""){
		 $condicioncod_usuario=" and ct.cod_user_insert = '".$cod_usuario."' ";
	 } 
	 
	 $condiciontipo_cliente="";
	 if($tipo_cliente!=""){
		 $condiciontipo_cliente=" and (SELECT tipo_cliente FROM persona WHERE cod_persona = vt.cod_clienteFK) = '".$tipo_cliente."' ";
	 }
	 
	 $condicioncliente="";
	 if($cliente!=""){
		 $condicioncliente=" and (SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = vt.cod_clienteFK) like '%".$cliente."%' ";
	 }
	 
	

	  $sql= "SELECT ct.idclientes_trabajados,ct.descripcion,ct.estado,ct.cod_venta,ct.fecha,ct.cod_user_insert,
			(SELECT nombre_persona FROM persona WHERE cod_persona = ct.cod_user_insert) as usuario,vt.num_factura,vt.puntoexpedicion,ct.estado_cliente,
			(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = vt.cod_clienteFK) as cliente
			FROM clientes_trabajados ct inner join venta vt ON ct.cod_venta = vt.cod_venta WHERE ct.estado != ''".$condicionBetFecha.$condicionfecha.$condicionlocal.$condiciontipo_cliente.$condicioncliente.$condicionestado_cliente.$condicioncod_usuario." order by idclientes_trabajados asc ";
 
 // echo $sql;
 // exit;

   $stmt = $mysqli->prepare($sql);
 
// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

if ($stmt === false) {
    die("Error en la preparación de la declaración: " . $mysqli->error);
}

if (! $stmt->execute()) {
    echo "Error en la ejecución de la declaración: " . $stmt->error;
    exit;
} 


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch"; 
 $total_Venta = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
			  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']); 
		  	  $descripcion=utf8_encode($valor['descripcion']);
			  $cod_venta=utf8_encode($valor['cod_venta']);
			  $usuario=utf8_encode($valor['usuario']);
			  $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
			  $num_factura=utf8_encode($valor['num_factura']);
			  $cliente=utf8_encode($valor['cliente']);
			  $estado_cliente=utf8_encode($valor['estado_cliente']);
			  $cod_user_insert=utf8_encode($valor['cod_user_insert']);
 
				if($puntoexpedicion!=""){
					$nrof=$puntoexpedicion."-".$num_factura;
				}else{
					$nrof=$num_factura;
				} 

 
		

				
				
				  $styleName=CargarStyleTable($styleName);
				  $filas[]=array(
					  'id_cliente_trabajado'=>utf8_encode($valor['idclientes_trabajados']),
					  'cod_venta'=>$cod_venta,
					  'factura'=>$nrof,
					  'usuario'=>$usuario,
					  'cliente'=>$cliente,
					  'descripcion'=>$descripcion,
					  'estado_cliente'=>$estado_cliente,
					  'fecha'=>$fecha,
					  'estado'=>$estado,
					  'cod_usuario'=>$cod_user_insert,
					  'clase_fila'=>$styleName
				  );
		  	  
				$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
				<tr id='tbSelecRegistro'  onclick=''  >
				<td  style='width:5%;'>".$nrof."</td>	
				<td  style='width:10%;'>".$usuario."</td>
				<td  style='width:10%;'>".$cliente."</td>
				<td  style='width:15%;'>".$descripcion."</td>
				<td  style='width:10%;'>".$estado_cliente."</td>
				<td  style='width:5%;'>".$fecha."</td>
				<td  style='width:5%;'>".$estado."</td>
				</tr>
				</table> "; 
				
				
				
				
	  }
 }
 
 $sql= "SELECT ct.idclientes_trabajados,ct.descripcion,ct.estado,ct.cod_venta,ct.fecha,ct.cod_user_insert,
			(SELECT nombre_persona FROM persona WHERE cod_persona = ct.cod_user_insert) as usuario,vt.num_factura,vt.puntoexpedicion,ct.estado_cliente,
			(SELECT nombre_persona FROM persona WHERE cod_persona = vt.cod_clienteFK) as cliente
			FROM clientes_trabajados ct inner join venta vt ON ct.cod_venta = vt.cod_venta WHERE ct.estado != '' group by ct.cod_user_insert order by idclientes_trabajados asc";
			
			
  $stmt = $mysqli->prepare($sql);
  $paginaoption = "<option value=''>SELECCIONAR</option>";
// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

if ($stmt === false) {
    die("Error en la preparación de la declaración: " . $mysqli->error);
}

if (! $stmt->execute()) {
    echo "Error en la ejecución de la declaración: " . $stmt->error;
    exit;
} 


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 

   $stmt = $mysqli->prepare($sql);
   
    if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
			 
			  $usuario=utf8_encode($valor['usuario']);
			  $cod_user_insert=utf8_encode($valor['cod_user_insert']);
 
				
				
				
				$paginaoption .="<option value='$cod_user_insert'>$usuario</option>";
				
	  }
 }
 
   

$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro,"4"=>$paginaoption);
echo json_encode($informacion);	
exit;
}
 
function ClienteParaInforconf($buscar,$filtro,$zona,$vista,$fecha,$formato=""){
	$mysqli=conectar_al_servidor();

	 $totalRegistro=0;
	 $pagina="";
	 $filas=array();
	 $devolverArray=strtolower($formato)==="json";
	 $paginaWhatsapp="";
	 $paginaGarante="";
	 $fechahoy=date('Y-m-d');	
	 
	 
	 $CondicionInforcomf=" and (Select count(*) from informconf  where Estado='Activo' and cod_clienteFK=cod_cliente)=0";
	 	
	$condicionCuenta=" and IFNULL( ((select sum(cr.Monto) from credito cr where cr.cod_venta=vt.cod_venta) +(select sum(totalinteres) from credito c where c.cod_venta = vt.cod_venta and
 ifnull((select sum(Monto) from pago p where p.cod_creditoFK = c.idcredito and Tipo='Pago Cuota'),0)<c.Monto) )-((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta) + (select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk and Tipo='Pago Cuota')),0) > 50000"; 
		 
		$CondiciónFiltro="";
		if($filtro=="1"){
			$CondiciónFiltro=" and DATEDIFF('".$fechahoy."',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1)) between 90 and 120";
		}
		
		if($filtro=="2"){
			$CondiciónFiltro=" and DATEDIFF('".$fechahoy."',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1)) between 121 and 150 ";
		}
		
		if($filtro=="3"){
			$CondiciónFiltro=" and DATEDIFF('".$fechahoy."',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1))>=90";
		}
		 

		  $condicionZona=" ";
		 if($zona!=""){
			$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=cod_clienteFK  and idzonaFk='$zona') > 0"; 
		 }

		 $condicionfecha=" ";
		 if($fecha!=""){
			$condicionfecha=" and fecha_venta >= '".$fecha."' "; 
		 }
		 
		
		 $sql= "Select cod_clienteFK,vt.puntoexpedicion,vt.num_factura,vt.tipo_comprobante,DATE_FORMAT(fecha_venta, '%d/%m/%Y') as fecha_venta,
		 (select sum(Monto) from credito c where vt.cod_venta=c.cod_venta)as total_venta,vt.cod_venta,
		 DATE_FORMAT((select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1), '%d/%m/%Y') as FechapagoDeuda,
		ifnull(DATE_FORMAT((select Fecha from pago p  where vt.cod_venta=p.cod_venta_fk order by idPago desc limit 1), '%d/%m/%Y'),'') as FechaUltimoPago,
		DATE_FORMAT((select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and (Select count(*) from pago where cod_creditoFK = idcredito)=0 order by idcredito asc limit 1), '%d/%m/%Y') as FechapagoDeuda2,
		 pr.telefono   as Telefono,concat(pr.nombre_persona,' ',pr.apellido_persona)  as clientenombre,
		(Select rut_cliente from cliente where cod_cliente=cod_clienteFK) as cicliente, 
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as ruc,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
		IFNULL((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta),0) as totaldescuento,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado , 
  IFNULL( ((select sum(cr.Monto) from credito cr where cr.cod_venta=vt.cod_venta) +(select sum(totalinteres) from credito c where c.cod_venta = vt.cod_venta and
 ifnull((select sum(Monto) from pago p where p.cod_creditoFK = c.idcredito and Tipo='Pago Cuota'),0)<c.Monto) )-((select sum(cr.descuento) from credito cr where cr.cod_venta=vt.cod_venta) + (select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk and Tipo='Pago Cuota')),0) as deu		
		from  venta vt inner join cliente cl on cod_cliente=cod_ClienteFK
		inner join persona pr on cod_cliente=cod_persona where (select count(*) from cancelaciones c where vt.cod_venta=c.cod_venta)=0 and   concat(pr.nombre_persona,' ',pr.apellido_persona)  like '%".$buscar."%'  ".$condicionfecha.$CondicionInforcomf.$CondiciónFiltro.$condicionZona.$condicionCuenta." group by vt.cod_venta asc order by cod_venta desc";
	 
		
		  // echo($sql);
		  // exit; 
   
   
   $stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $TotalVentas= 0;
 $TotalPagos= 0;
 $TotalDeuda= 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $FechaUltimoPago=$valor['FechaUltimoPago'];
			  $Telefono=$valor['Telefono'];
		  	  $clientenombre=utf8_encode($valor['clientenombre']);
			  
			  
			  $clientenombre = trim($clientenombre);
$partes = explode(' ', strtoupper($clientenombre)); // Pasamos todo a mayúsculas para comparar

// Lista de palabras a ignorar
$palabrasIgnorar = array('DE', 'DEL', 'LA', 'LOS', 'LAS', 'JESUS');

// Filtrar palabras no deseadas
$filtrado = array();
foreach ($partes as $palabra) {
    if (!in_array($palabra, $palabrasIgnorar)) {
        $filtrado[] = $palabra;
    }
}



// Tomar el primer nombre y primer apellido del resultado limpio
$primerNombre = isset($filtrado[0]) ? $filtrado[0] : '';
$primerApellido = isset($filtrado[1]) ? $filtrado[1] : '';

// $nombreApellido = $primerNombre . ' ' . $primerApellido;


			  
		      
			  $fecha_venta=$valor['fecha_venta'];
			  $cicliente=$valor['cicliente'];
			  $ruc=$valor['ruc'];
 
		  	  $total_venta=$valor['total_venta'];
		  	  $num_factura=utf8_encode($valor['num_factura']); 
			  $tipo_comprobante=utf8_encode($valor['tipo_comprobante']);	
		  	  $cod_venta=utf8_encode($valor['cod_venta']);
		  	  $totalpagado=utf8_encode($valor['totalpagado']);
			  $totaldescuento=utf8_encode($valor['totaldescuento']); 
			  $FechapagoDeuda=utf8_encode($valor['FechapagoDeuda']);
			  $FechapagoDeuda2=utf8_encode($valor['FechapagoDeuda2']);
	 
			  $nroCouta=($valor['nroCouta']);
			  $cod_clienteFK=($valor['cod_clienteFK']);
			  $deu=($valor['deu']);
				  
				if($cicliente == ''){
					$cicliente = $ruc;
				}
			
			  if($FechapagoDeuda==""){
				  $FechapagoDeuda= $FechapagoDeuda2;
			  }
			  
			 $deuda=($total_venta  )-($totalpagado+$totaldescuento);
			  $totalRegistro=$totalRegistro+1;
			  if($deuda<0){
				$deuda=0;  
			  }
			 
			
              $TotalVentas=$total_venta+$TotalVentas;
              $TotalPagos= $TotalPagos+$totalpagado;
              
			  
			  
 
 $TotalDeuda= $TotalDeuda+$deuda ;
  	
	$Style="";
	/* if($nombres==""){
		$Style=" style=' background-color: #ef9b33;' ";
		$primerNombre = "";
		$primerApellido = "";
		
	}else{
		
		$nombreCompleto = $nombres;
		$primerNombre = obtenerPrimerNombre($nombreCompleto);
		
		$apellidosCompleto = $apellidos;
		$primerApellido = obtenerPrimerNombre($apellidosCompleto);
		
	} */
	$datos=calcularintereses2($cod_venta,0,0,"2","2","2","no");





	$Check="";
	if($vista=="2"){
		$Check="<td  style='width:5%'><input type=checkbox checked name='".$cod_clienteFK."'  id='checkcod_".$cod_venta."'  ></td>";
	}
	$filas[]=array(
		"documento"=>$cicliente,
		"primer_nombre"=>$primerNombre,
		"primer_apellido"=>$primerApellido,
		"codigo_tipo"=>"01",
		"fecha_venta"=>$fecha_venta,
		"total_venta"=>$total_venta,
		"tipo"=>"G",
		"cuotas"=>$nroCouta,
		"fecha_ultimo_pago"=>$FechaUltimoPago,
		"fecha_pago_deuda"=>$FechapagoDeuda,
		"deuda_pendiente"=>floor($datos[8]),
		"id_venta"=>$cod_venta,
		"seleccionable"=>$vista==="2",
		"id_cliente"=>$cod_clienteFK,
		"clase_fila"=>"tableRegistroSearch"
	);
	if(!$devolverArray){
		  	   $pagina.="
<table class='tableRegistroSearch' $Style  border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' name='tbClienteParaInforconf'>
<td  style='width:8%'>".$cicliente."</td>
<td  style='width:10%'>".$primerNombre."</td>
<td  style='width:10%'>".$primerApellido."</td>
<td  style='width:8%'>01</td>
<td  style='width:8%'>".$fecha_venta ."</td>
<td  style='width:8%'>".$total_venta."</td>
<td  style='width:8%'>G</td>
<td  style='width:8%'>".$nroCouta."</td>
<td  style='width:8%'>".$FechaUltimoPago ."</td>
<td  style='width:8%'>".$FechapagoDeuda ."</td> 
<td  style='width:8%'>".floor($datos[8])."</td>
<td id='td_cod' style='width:8%'>".$cod_venta."</td>
".$Check."
</tr>
</table>";

			  
	  }
 }
}

 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" => $nroRegistro,"4" => number_format($TotalVentas,'0',',','.'),"5" => number_format($TotalPagos,'0',',','.'),"6" => number_format($TotalDeuda,'0',',','.')  );
echo json_encode($informacion);	
exit;
}

function obtenerPrimerNombre($nombreCompleto) {
	$nombreCompleto = trim($nombreCompleto);
    $partes = explode(' ', $nombreCompleto);
    return $partes[0];
}


function buscar_grafica_venta_total_pagado_solicitud_aprobar($buscar)
{
$mysqli=conectar_al_servidor();


$sql= "SELECT cod_venta,puntoexpedicion,num_factura FROM venta WHERE cod_clienteFK ='$buscar' and TipoVenta = 'CREDITO'";
 
  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$arraycod_Ventas = array();
$array_nro_factura = array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$cod_venta = utf8_encode($valor['cod_venta']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$num_factura = utf8_encode($valor['num_factura']); 


if($puntoexpedicion!=''){
	$nro = $puntoexpedicion."-".$num_factura;
}else{
	$nro = $num_factura;
}

array_push($arraycod_Ventas,$cod_venta);
array_push($array_nro_factura,$nro);


}
}


$array_total_ventas = array();
$array_total_pagado = array();
foreach ($arraycod_Ventas as $cod_venta) {
   

$sql= "Select vt.total_venta,
		IFNULL((Select totalinteres from totalesdeudaventa where cod_venta=cod_ventaFk),0) as totalinteres,
		IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado
		from venta vt where vt.cod_venta ='$cod_venta' and
		IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ";
  
  
  
  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

$totalDiasAtrasados = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
     
$total_venta = utf8_encode($valor['total_venta']);      
$totalpagado = utf8_encode($valor['totalpagado']);      


array_push($array_total_ventas, $total_venta);
array_push($array_total_pagado, $totalpagado);

}
}


}



/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito", "2"=>$array_nro_factura, "3"=>$array_total_pagado,"4"=>$array_total_ventas);
echo json_encode($informacion);	
exit;
}


function buscarMetasVenta($formato = "")
{
    $mysqli = conectar_al_servidor();

    $sql = "SELECT cod_metas_venta,  DATE_FORMAT(fecha, '%Y-%m') AS fechaformat, fecha , contado, credito FROM metas_venta  order by fecha desc LIMIT 15";
    $pagina = "";
	$filas = array();
	$devolverArray = strtolower($formato) === "json";
    $stmt = $mysqli->prepare($sql);

    if (!$stmt->execute()) {
        echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
        exit;
    }

    $result = $stmt->get_result();
    $valor = mysqli_num_rows($result);

    if ($valor > 0) {
        // contenedor principal responsive
		if (!$devolverArray) {
			$pagina .= "<div class='contenedor-tarjetas'>";
		}

        while ($fila = mysqli_fetch_assoc($result)) {
            $cod_metas_venta = htmlspecialchars($fila['cod_metas_venta']);
            $fechaformat = htmlspecialchars($fila['fechaformat']);
            $fecha = htmlspecialchars($fila['fecha']);
            $contado = $fila['contado'];
            $credito = $fila['credito'] ;
			
			$venta = obtenerTotalVenta($fechaformat);
			$metasContado = $venta[0];
			$metasCredito = $venta[1] + $venta[0];


// Calcular porcentaje de cumplimiento (por si quer茅s mostrar una barra o color)
$porcentajeContado = $contado > 0 ? min(100, round(($metasContado / max(1, $contado)) * 100)) : 0;
$porcentajeCredito = $credito > 0 ? min(100, round(($metasCredito / max(1, $credito)) * 100)) : 0;

$filas[] = array(
	"id_meta" => $cod_metas_venta,
	"fecha_mes" => $fechaformat,
	"fecha" => $fecha,
	"meta_contado" => $contado,
	"meta_credito" => $credito,
	"actual_contado" => $metasContado,
	"actual_credito" => $metasCredito,
	"meta_contado_formateado" => number_format($contado, 0, ',', '.'),
	"meta_credito_formateado" => number_format($credito, 0, ',', '.'),
	"actual_contado_formateado" => number_format($metasContado, 0, ',', '.'),
	"actual_credito_formateado" => number_format($metasCredito, 0, ',', '.'),
	"porcentaje_contado" => $porcentajeContado,
	"porcentaje_credito" => $porcentajeCredito
);

if (!$devolverArray) {
$pagina .= "
<div class='tarjeta-meta' onclick='obtenerdatosMetasVenta(this)'>
    
    <!-- Encabezado -->
    <div class='tarjeta-header'>
        <div class='tarjeta-titulo'>
            <h3>META #$cod_metas_venta</h3>
            <span class='fecha-meta'>$fechaformat</span>
        </div>
        <div class='badge-meta'>
            <span class='porcentaje-total'>" . round(($porcentajeCredito)) . "%</span>
        </div>
    </div>
	<div style='display:none'> <span class='contado-meta'>$contado</span></div>
	<div style='display:none'> <span class='credito-meta'>$credito</span></div>
	<div style='display:none'> <span class='fecha2-meta'>$fecha</span></div>

    <!-- Cuerpo -->
    <div class='tarjeta-body'>

 
        <div class='bloque-dato'  style='display:none;' >
            <div class='bloque-header'>
                <span class='label'> Contado</span>
                <span class='porcentaje texto-secundario'>{$porcentajeContado}%</span>
            </div>
            <div class='valores'>
                <span class='valor-meta'>Meta: <b>Gs. " . number_format($contado, 0, ',', '.') . "</b></span>
                <span class='valor-real'>Actual: <b>Gs. " . number_format($metasContado, 0, ',', '.') . "</b></span>
            </div>
            <div class='barra-progreso'>
                <div class='progreso' style='width: {$porcentajeContado}%;'></div>
            </div>
        </div>

        <!-- Secci贸n Cr茅dito -->
        <div class='bloque-dato'>
            <div class='bloque-header'>
                <span class='label'> Metas</span>
                <span class='porcentaje texto-secundario'>{$porcentajeCredito}%</span>
            </div>
            <div class='valores'>
                <span class='valor-meta'>Meta: <b>Gs. " . number_format($credito, 0, ',', '.') . "</b></span>
                <span class='valor-real'>Actual: <b>Gs. " . number_format($metasCredito, 0, ',', '.') . "</b></span>
            </div>
            <div class='barra-progreso'>
                <div class='progreso' style='width: {$porcentajeCredito}%;'></div>
            </div>
        </div>

</div>
</div>";
}


        }

		if (!$devolverArray) {
			$pagina .= "</div>";
		}
    } else {
		if (!$devolverArray) {
			$pagina = "<div class='sin-resultados'>No hay registros disponibles.</div>";
		}
    }

    $informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina));
    echo json_encode($informacion);
    exit;
}

function obtenerTotalVenta($fecha)
{
    $mysqli = conectar_al_servidor();

    // Usamos agregaci贸n directa en SQL para mejor rendimiento
    $sql = "
        SELECT 
            SUM(CASE WHEN TipoVenta = 'CONTADO' THEN total_venta ELSE 0 END) AS total_contado,
            SUM(CASE WHEN TipoVenta = 'CREDITO' THEN total_venta ELSE 0 END) AS total_credito
        FROM venta vt
        WHERE DATE_FORMAT(fecha_venta, '%Y-%m') = ?
		and IFNULL((Select count(fecha) from cancelaciones c where c.cod_venta=vt.cod_venta limit 1),0)=0
    ";

    if (!$stmt = $mysqli->prepare($sql)) {
        trigger_error('Error preparando consulta: ' . $mysqli->error, E_USER_ERROR);
        return [0, 0];
    }

    $stmt->bind_param('s', $fecha);

    if (!$stmt->execute()) {
        trigger_error('Error ejecutando consulta: ' . $stmt->error, E_USER_ERROR);
        return [0, 0];
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    $TotalContado = (float)$row['total_contado'];
    $TotalCredito = (float)$row['total_credito'];

    return [$TotalContado, $TotalCredito];
}


function abmMetasVenta($credito, $contado,$fecha,$idAbmMetaVenta,$operacion)
{
 
$mysqli=conectar_al_servidor();

if($operacion=="nuevo_metaVenta")
{


$consulta1="Insert into metas_venta (fecha,contado,credito) values(?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$fecha,$contado,$credito);


}


if($operacion=="editar_metaVenta")
{

$consulta1="Update metas_venta set fecha=?,contado=?,credito=? where cod_metas_venta=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$fecha,$contado,$credito,$idAbmMetaVenta); 

}



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
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

	$consulta1=" Insert into calificacion_entrega_contado (observacion,calificacion,cod_ventaFK,fecha_insert,estado,user_insert)
	values('$observacion','$calificacion','$idAbmSolicitudCalificacionEntrega','$fecha_inser','$estado','$user')";
}


if($operacion=="editarCalificacionEntrega")
{
	$consulta1="UPDATE calificacion_entrega_contado SET observacion = '$observacion',calificacion='$calificacion',estado='$estado' WHERE idcalificacion_entrega_contado = '$idAbm'";
}

// echo $consulta1;
// exit;

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
	$condicionestado = " and IFNULL((SELECT estado FROM calificacion_entrega_contado WHERE cod_ventaFK = cod_venta),'PENDIENTE') = '$estado'";
}

$condicioncalificacion = '';
if($calificacion != ''){
	$condicioncalificacion = " and (SELECT calificacion FROM calificacion_entrega_contado WHERE cod_ventaFK = cod_venta) = '$calificacion'";
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
(SELECT observacion FROM calificacion_entrega_contado WHERE cod_ventaFK = cod_venta) as observacion,
(SELECT calificacion FROM calificacion_entrega_contado WHERE cod_ventaFK = cod_venta) as calificacion,
(SELECT idcalificacion_entrega_contado FROM calificacion_entrega_contado WHERE cod_ventaFK = cod_venta) as idcalificacion_entrega_contado,
IFNULL((SELECT estado FROM calificacion_entrega_contado WHERE cod_ventaFK = cod_venta),'PENDIENTE') as estado_cal,cod_venta
FROM venta WHERE estado_entrega = 'SI'".$condicioncliente.$condicionfecha_entrega.$condicionfechas.$condicioncobrador.$condicioncalificacion.$condicionestado." order by fecha_entrega desc limit 100";


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
$cod_venta = utf8_encode($valor['cod_venta']); 
$idcalificacion_entrega = utf8_encode($valor['idcalificacion_entrega_contado']); 
$estado_cal = utf8_encode($valor['estado_cal']); 
$nro_whatsapp = utf8_encode($valor['nro_whatsapp']); 

$producto=buscarDetalleProductoVenta($cod_venta);

$filas[]=array(
"id_venta" => $cod_venta,
"fecha_entrega" => $fecha_entrega,
"cliente" => $cliente,
"telefono" => $telefono_cliente,
"whatsapp" => $nro_whatsapp,
"cobrador" => $cobrador,
"calificacion" => $calificacion,
"observacion" => $observacion,
"estado" => $estado_cal,
"producto" => $producto,
"id_calificacion" => $idcalificacion_entrega
);

if($formato !== "json") {
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCalificacionEntregaContado(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$cod_venta."</td>
<td  id='td_datos_1' style='width:5%'>".$fecha_entrega."</td>
<td  id='td_datos_2' style='width:20%'>".$cliente."</td>
<td  id='td_datos_3' style='width:5%'>".$telefono_cliente."</td>
<td  id='' style='width:5%'>".$nro_whatsapp."</td>
<td  id='td_datos_4' style='width:10%'>".$cobrador."</td>
<td  id='td_datos_5' style='width:10%'>".$calificacion."</td>
<td  id='td_datos_6' style='width:10%'>".$observacion."</td>
<td  id='td_datos_8' style='width:10%'>".$estado_cal."</td>
<td  id='' style='width:20%'>".$producto."</td>
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
FROM venta vt inner join calificacion_entrega_contado ce ON vt.cod_venta = ce.cod_ventaFK WHERE estado_entrega = 'SI' and vt.entrega_cobradorFK = '$cod_cobradorFK'";

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
	
	$consulta="INSERT INTO `fotos_calificacion_entrega_contado` (url,cod_ventaFK,descripcion,fecha_insert,user_insert) VALUES ('$Urldoc','$idSolicitudCreditoFK','$descripcion','$fecha_inser_edit','$user') ";
	
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
	$sql= "DELETE FROM fotos_calificacion_entrega_contado WHERE cod_ventaFK='$isolicitudcredito' and idfotos_calificacion_entrega_contado='$iddocumento'";
 
 
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


function buscarDocumentosCargaFotoCalificacionEntrega($codigo,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 /* $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha_insert between '$fecha1' and '$fecha2'";
	 } */
	 
		$sql= "SELECT idfotos_calificacion_entrega_contado,url,descripcion,fecha_insert,cod_ventaFK,
		(SELECT usu FROM cobrador WHERE cod_cobrador = (SELECT entrega_cobradorFK FROM venta WHERE cod_venta = '$codigo')) AS cobrador 
				FROM fotos_calificacion_entrega_contado where cod_ventaFK='$codigo' ";
  
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
		  
		  
		      $idfotos_calificacion_entrega=$valor['idfotos_calificacion_entrega_contado'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha_insert']);
		  	  $idSolicitudCreditoFK=utf8_encode($valor['cod_ventaFK']);
		  	  $cobrador=utf8_encode($valor['cobrador']);
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);
			  $filas[]=array(
				  'codigo_fila'=>$codigo,
				  'id_documento'=>$idfotos_calificacion_entrega,
				  'id_venta'=>$idSolicitudCreditoFK,
				  'url'=>$archivourl,
				  'descripcion'=>$descripcion,
				  'cobrador'=>$cobrador,
				  'fecha'=>$fecha
			  );
			  
			  
		  	  $pagina.="
<table id='$codigo' class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistroImagen' onclick='SeleccionarItemFotosCalificacionEntregaContado(this)' name='tableRegistroSelec'>
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


function buscar_total_ganancias_general($anho,$local,$tipo_venta)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_ganancia_dia($anho,$i,$x,$local,$tipo_venta);
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}

function obtener_total_ganancia_dia($anho,$mes,$dia,$local,$tipo)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and vt.fecha_venta = '$fecha' ";
	 
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and  vt.cod_local ='" . $local . "'";
	}
	
	 $condiciontipoventa = "";
	if ($tipo != "") {
		$condiciontipoventa = " and  vt.TipoVenta ='" . $tipo . "'";
	}
 
 
	$sql = "Select ifnull(total_venta,0) as total_venta,
				IFNULL((select sum(dtv2.subPrecioCompra*dtv2.cantidad_detalle) from detalle_venta dtv2  where vt.cod_venta=dtv2.cod_ventaFK),0) as costototal
		from venta vt  where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ".$condicionFecha.$condicionlocal.$condiciontipoventa;
 
 
 // echo $sql;
 // exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$sumDif = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			// $fecha_venta = $valor['fecha_venta'];
			$total_venta = $valor['total_venta'];
			// $num_factura = utf8_encode($valor['num_factura']);
			// $comisionvendedor = utf8_encode($valor['comisionvendedor']);
			$costototal = utf8_encode($valor['costototal']);
			// $totalpagado = utf8_encode($valor['totalpagado']);
			// $comisioncobrador = utf8_encode($valor['comisioncobrador']);
			// $nombrelocal = utf8_encode($valor['nombrelocal']);
			// $puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			// $clientenombre = utf8_encode($valor['clientenombre']);
			// $nrodocliente = utf8_encode($valor['nrodocliente']);
			// $TipoVenta = utf8_encode($valor['TipoVenta']);
			// $plazo = utf8_encode($valor['plazo']);
			// if ($puntoexpedicion != "") {
				// $nrof = $puntoexpedicion . "-" . $num_factura;
			// } else {
				// $nrof = $num_factura;
			// }
			// $evaluacion = $totalpagado - ($costototal + $comisionvendedor + $comisioncobrador);
			// if ($evaluacion < 0) {
				// $evaluacion = 0;
			// }
			// $totalescosto = $totalescosto + $costototal;
			// $totalescomision = $totalescomision + $comisioncobrador + $comisionvendedor;
			// $totalespagado = $totalespagado + $totalpagado;
			// $totalesevaluacion = $totalesevaluacion + $evaluacion;
			// $TotalVenta = $TotalVenta + $total_venta;
			$diferencia = $total_venta - $costototal;
			$diferencia = ($diferencia);
			$sumDif+= $diferencia;
		}
	}
	
	return $sumDif;
}
function buscar_total_costo_general($anho,$local,$tipo_venta)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_costo_dia($anho,$i,$x,$local,$tipo_venta);
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}

function obtener_total_costo_dia($anho,$mes,$dia,$local,$tipo)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and vt.fecha_venta = '$fecha' ";
	 
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and  vt.cod_local ='" . $local . "'";
	}
	
	 $condiciontipoventa = "";
	if ($tipo != "") {
		$condiciontipoventa = " and  vt.TipoVenta ='" . $tipo . "'";
	}
 
 
	$sql = "Select ifnull(total_venta,0) as total_venta,
				IFNULL((select sum(dtv2.subPrecioCompra*dtv2.cantidad_detalle) from detalle_venta dtv2  where vt.cod_venta=dtv2.cod_ventaFK),0) as costototal
		from venta vt  where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ".$condicionFecha.$condicionlocal.$condiciontipoventa;
 
 
 // echo $sql;
 // exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$sumDif = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			// $fecha_venta = $valor['fecha_venta'];
			$total_venta = $valor['total_venta'];
			// $num_factura = utf8_encode($valor['num_factura']);
			// $comisionvendedor = utf8_encode($valor['comisionvendedor']);
			$costototal = utf8_encode($valor['costototal']);
			// $totalpagado = utf8_encode($valor['totalpagado']);
			// $comisioncobrador = utf8_encode($valor['comisioncobrador']);
			// $nombrelocal = utf8_encode($valor['nombrelocal']);
			// $puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			// $clientenombre = utf8_encode($valor['clientenombre']);
			// $nrodocliente = utf8_encode($valor['nrodocliente']);
			// $TipoVenta = utf8_encode($valor['TipoVenta']);
			// $plazo = utf8_encode($valor['plazo']);
			// if ($puntoexpedicion != "") {
				// $nrof = $puntoexpedicion . "-" . $num_factura;
			// } else {
				// $nrof = $num_factura;
			// }
			// $evaluacion = $totalpagado - ($costototal + $comisionvendedor + $comisioncobrador);
			// if ($evaluacion < 0) {
				// $evaluacion = 0;
			// }
			// $totalescosto = $totalescosto + $costototal;
			// $totalescomision = $totalescomision + $comisioncobrador + $comisionvendedor;
			// $totalespagado = $totalespagado + $totalpagado;
			// $totalesevaluacion = $totalesevaluacion + $evaluacion;
			// $TotalVenta = $TotalVenta + $total_venta;
			// $diferencia = $total_venta - $costototal;
			// $diferencia = ($diferencia);
			$sumDif+= $costototal;
		}
	}
	
	return $sumDif;
}

function buscar_total_pagado_general($anho,$local,$tipo_venta)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_pagado_dia($anho,$i,$x,$local,$tipo_venta);
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}

function obtener_total_pagado_dia($anho,$mes,$dia,$local,$tipo)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and vt.fecha_venta = '$fecha' ";
	 
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and  vt.cod_local ='" . $local . "'";
	}
	
	 $condiciontipoventa = "";
	if ($tipo != "") {
		$condiciontipoventa = " and  vt.TipoVenta ='" . $tipo . "'";
	}
 
 
	$sql = "Select
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) as totalpagado
		from venta vt  where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ".$condicionFecha.$condicionlocal.$condiciontipoventa;
 
 
 // echo $sql;
 // exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$totalespagado = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			// $fecha_venta = $valor['fecha_venta'];
			// $total_venta = $valor['total_venta'];
			// $num_factura = utf8_encode($valor['num_factura']);
			// $comisionvendedor = utf8_encode($valor['comisionvendedor']);
			// $costototal = utf8_encode($valor['costototal']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			// $comisioncobrador = utf8_encode($valor['comisioncobrador']);
			// $nombrelocal = utf8_encode($valor['nombrelocal']);
			// $puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			// $clientenombre = utf8_encode($valor['clientenombre']);
			// $nrodocliente = utf8_encode($valor['nrodocliente']);
			// $TipoVenta = utf8_encode($valor['TipoVenta']);
			// $plazo = utf8_encode($valor['plazo']);
			// if ($puntoexpedicion != "") {
				// $nrof = $puntoexpedicion . "-" . $num_factura;
			// } else {
				// $nrof = $num_factura;
			// }
			// $evaluacion = $totalpagado - ($costototal + $comisionvendedor + $comisioncobrador);
			// if ($evaluacion < 0) {
				// $evaluacion = 0;
			// }
			// $totalescosto = $totalescosto + $costototal;
			// $totalescomision = $totalescomision + $comisioncobrador + $comisionvendedor;
			$totalespagado = $totalespagado + $totalpagado;
			// $totalesevaluacion = $totalesevaluacion + $evaluacion;
			// $TotalVenta = $TotalVenta + $total_venta;
			// $diferencia = $total_venta - $costototal;
			// $diferencia = ($diferencia);
			// $sumDif+= $costototal;
		}
	}
	
	return $totalespagado;
}

function buscar_total_evaluacion_general($anho,$local,$tipo_venta)
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_evaluacion_dia($anho,$i,$x,$local,$tipo_venta);
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => $pagina);
	echo json_encode($informacion);
	exit;
}

function obtener_total_evaluacion_dia($anho,$mes,$dia,$local,$tipo)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and vt.fecha_venta = '$fecha' ";
	 
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and  vt.cod_local ='" . $local . "'";
	}
	
	 $condiciontipoventa = "";
	if ($tipo != "") {
		$condiciontipoventa = " and  vt.TipoVenta ='" . $tipo . "'";
	}
 
 
	$sql = "Select 
		IFNULL((select sum(dtv1.comision) from detalle_venta dtv1  where vt.cod_venta=dtv1.cod_ventaFK),0) as comisionvendedor,
		(select count(idcredito) from credito where cod_venta = vt.cod_venta) as plazo,
				IFNULL((select sum(dtv2.subPrecioCompra*dtv2.cantidad_detalle) from detalle_venta dtv2  where vt.cod_venta=dtv2.cod_ventaFK),0) as costototal,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		IFNULL((select sum(pg1.Monto) from pago pg1  where vt.cod_venta=pg1.cod_venta_fk and tipo='Pago Cuota'),0) as totalpagado,
		IFNULL((select sum((pg2.comision*pg2.monto)/100) from pago pg2  where vt.cod_venta=pg2.cod_venta_fk),0) as comisioncobrador
		from venta vt  where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ".$condicionFecha.$condicionlocal.$condiciontipoventa;
 
 
 // echo $sql;
 // exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$totalesevaluacion = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			// $fecha_venta = $valor['fecha_venta'];
			// $total_venta = $valor['total_venta'];
			// $num_factura = utf8_encode($valor['num_factura']);
			$comisionvendedor = utf8_encode($valor['comisionvendedor']);
			$costototal = utf8_encode($valor['costototal']);
			$totalpagado = utf8_encode($valor['totalpagado']);
			$comisioncobrador = utf8_encode($valor['comisioncobrador']);
			// $nombrelocal = utf8_encode($valor['nombrelocal']);
			// $puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
			// $clientenombre = utf8_encode($valor['clientenombre']);
			// $nrodocliente = utf8_encode($valor['nrodocliente']);
			// $TipoVenta = utf8_encode($valor['TipoVenta']);
			// $plazo = utf8_encode($valor['plazo']);
			// if ($puntoexpedicion != "") {
				// $nrof = $puntoexpedicion . "-" . $num_factura;
			// } else {
				// $nrof = $num_factura;
			// }
			$evaluacion = $totalpagado - ($costototal + $comisionvendedor + $comisioncobrador);
			if ($evaluacion < 0) {
				$evaluacion = 0;
			}
			// $totalescosto = $totalescosto + $costototal;
			// $totalescomision = $totalescomision + $comisioncobrador + $comisionvendedor;
			// $totalespagado = $totalespagado + $totalpagado;
			$totalesevaluacion = $totalesevaluacion + $evaluacion;
			// $TotalVenta = $TotalVenta + $total_venta;
			// $diferencia = $total_venta - $costototal;
			// $diferencia = ($diferencia);
			// $sumDif+= $costototal;
		}
	}
	
	return $totalesevaluacion;
}



verificar($operacion);
?>
