<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include('quitarseparadormiles.php');
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("calcularintereses.php");
// include("calcularInteresDirecto.php");
include("classTable.php");


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

//CONTROL DE ACCESO


	
if($operacion=="nuevo")
{
	
	
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);
$Monto=$_POST['Monto'];
$Monto = quitarseparadormiles($Monto);
$metodopago=$_POST['metodopago'];
$metodopago = utf8_decode($metodopago);
$iniciopago=$_POST['iniciopago'];
$iniciopago = utf8_decode($iniciopago);
$nroCuota=$_POST['nroCuota'];
$nroCuota = utf8_decode($nroCuota);
$total=$_POST['total'];
$total = quitarseparadormiles($total);
$interes=$_POST['interes'];
$interes = quitarseparadormiles($interes);
$entrega=$_POST['entrega'];
$entrega = quitarseparadormiles($entrega);
$dias=$_POST['dias'];


generarCuotas($cod_venta,$Monto,$metodopago,$iniciopago,$nroCuota,$interes,$dias,$entrega,$total);

}

if($operacion=="nuevodesdeventa")
{
	
	
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);
$Monto=$_POST['Monto'];
$Monto = quitarseparadormiles($Monto);
$metodopago=$_POST['metodopago'];
$metodopago = utf8_decode($metodopago);
$iniciopago=$_POST['iniciopago'];
$iniciopago = utf8_decode($iniciopago);
$nroCuota=$_POST['nroCuota'];
$nroCuota = utf8_decode($nroCuota);
$pagoentrega=$_POST['pagoentrega'];
$pagoentrega = utf8_decode($pagoentrega);
$idGaranteFk=$_POST['idGaranteFk'];
$idGaranteFk = utf8_decode($idGaranteFk);
$interes=$_POST['interes'];
$interes = quitarseparadormiles($interes);
$entrega=$_POST['entrega'];
$entrega = quitarseparadormiles($entrega);
$dias=$_POST['dias'];


generarCuotasdesdeventa($idGaranteFk,$pagoentrega,$cod_venta,$Monto,$metodopago,$iniciopago,$nroCuota,$interes,$dias,$entrega);

}

if($operacion=="buscar_clientes_informconf")
{
	$fecha_ingreso=$_POST['fecha'];
$fecha_ingreso = utf8_decode($fecha_ingreso);

$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscar_clientes_informconf($fecha_ingreso,$cliente,$formato);

}

if($operacion=="buscar_mas_clientes_informconf")
{
	$fecha_ingreso=$_POST['fecha'];
$fecha_ingreso = utf8_decode($fecha_ingreso);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);

$registrocargado=$_POST['registrocargados'];
$registrocargado = utf8_decode($registrocargado);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	buscar_mas_clientes_informconf($fecha_ingreso,$cliente,$registrocargado,$formato);

}

if($operacion=="buscardatoscuenta")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	buscardatoscuenta($buscar);

}

if($operacion=="buscar")
{
	$buscar=$_POST['buscar'];
	$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarcreditos($buscar,$formato);
}	

if($operacion=="buscarcreditosexpediente_imprimir")
{
	$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
	buscarcreditosexpediente_imprimir($cod_ventaFK);

}

if($operacion=="ambFechaIngresoInformeInformconf")
{
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$cod_clienteFK=$_POST['cod_clienteFK'];
$cod_clienteFK = utf8_decode($cod_clienteFK);
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
	ambFechaIngresoInformeInformconf($fecha,$cod_clienteFK,$cod_ventaFK);

}	

if($operacion=="cambiarEstadoInformeInforconf")
{

$cod_clienteFK=$_POST['cod_clienteFK'];
$cod_clienteFK = utf8_decode($cod_clienteFK);
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
	cambiarEstadoInformeInforconf($cod_clienteFK,$cod_ventaFK);

}	

if($operacion=="buscarcreditoseditar")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarcreditoseditar($buscar,$formato);

}	

if($operacion=="buscar_solicitar_descuento_credito")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscar_solicitar_descuento_credito($buscar,$formato);

}	

	if($operacion=="buscarcreditoenrenfi")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarcreditoenrenfi($buscar,$formato);

}

	if($operacion=="creditoshistorialventa")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarcreditoshistorialventa($buscar,$formato);

}

	if($operacion=="cuentasacobrarcallcenter")
{

$cod_clienteFK=$_POST['cod_clienteFK'];
$cod_clienteFK = utf8_decode($cod_clienteFK);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

cuentasacobrarcallcenter($cod_clienteFK,$formato);

}

if($operacion=="cuentasacobrarcallcenterventa")
{

$cod_clienteFK=$_POST['cod_clienteFK'];
$cod_clienteFK = utf8_decode($cod_clienteFK);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";

cuentasacobrarcallcenterventa($cod_clienteFK,$formato);

}

if($operacion=="cuentasacobrarinformegeneral")
{

$filtrofecha=$_POST['fecha'];
$filtrofecha = utf8_decode($filtrofecha);
$codlocal=$_POST['cod_local'];
$codlocal = utf8_decode($codlocal);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';



cuentasacobrarinformegeneral($filtrofecha,$codlocal,$formato);

}


if($operacion=="cuentasacobrar")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$documento=$_POST['documento'];
$documento = utf8_decode($documento);
$telefono=$_POST['telefono'];
$telefono = utf8_decode($telefono);
$buscar_general=isset($_POST['buscar_general']) ? utf8_decode($_POST['buscar_general']) : '';
$producto=$_POST['producto'];
$producto = utf8_decode($producto);
$filtrofecha=$_POST['filtrofecha'];
$filtrofecha = utf8_decode($filtrofecha);
$codlocal=$_POST['codlocal'];
$codlocal = utf8_decode($codlocal);
$filtro=$_POST['filtro'];
$filtro = utf8_decode($filtro);

$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';

// if($codlocal==""){
// $controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	// if($controllocal==0){
		// $codlocal=buscarlocaluser($user);
	// }
// }
cuentasacobrar($filtro,$fecha1,$fecha2,$cliente,$documento,$telefono,$producto,$filtrofecha,$codlocal,$vendedor,$formato,$buscar_general);

}
	if($operacion=="mascuentasacobrar")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$documento=$_POST['documento'];
$documento = utf8_decode($documento);
$telefono=$_POST['telefono'];
$telefono = utf8_decode($telefono);
$buscar_general=isset($_POST['buscar_general']) ? utf8_decode($_POST['buscar_general']) : '';
$producto=$_POST['producto'];
$producto = utf8_decode($producto);
$filtrofecha=$_POST['filtrofecha'];
$filtrofecha = utf8_decode($filtrofecha);
$codlocal=$_POST['codlocal'];
$codlocal = utf8_decode($codlocal);
$filtro=$_POST['filtro'];
$filtro = utf8_decode($filtro);
$totalcobrar=$_POST['totalcobrar'];
$totalcobrar = quitarseparadormiles($totalcobrar);
$totaldeuda=$_POST['totaldeuda'];
$totaldeuda = quitarseparadormiles($totaldeuda);
$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);

$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
// if($codlocal==""){
// $controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	// if($controllocal==0){
		// $codlocal=buscarlocaluser($user);
	// }
// }
mascuentasacobrar($filtro,$fecha1,$fecha2,$cliente,$documento,$telefono,$producto,$filtrofecha,$codlocal,$registrocargado,$totalcobrar,$totaldeuda,$vendedor,$formato,$buscar_general);

}



if($operacion=="cuentasacobrardetallado")
{


$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$cod_cobrador=$_POST['cod_cobrador'];
$cod_cobrador = utf8_decode($cod_cobrador);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);

$datos=$_POST['datos'];
$datos = utf8_decode($datos);

$zona=$_POST['zona'];
$zona = utf8_decode($zona);

$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);

$array_cod_tipo_cliente = json_decode($_POST['array_cod_tipo_cliente']);

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
	cuentasacobrardetallado($tipo_cliente,$zona,$cliente,$fecha,$cod_cobrador,$cod_local,$array_cod_tipo_cliente,$datos);

}

if($operacion=="mascuentasacobrardetallado")
{

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$cod_cobrador=$_POST['cod_cobrador'];
$cod_cobrador = utf8_decode($cod_cobrador);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$cliente =$_POST['cliente'];
$cliente = utf8_decode($cliente);
$totalNeto=$_POST['totalNeto'];
$totalNeto = quitarseparadormiles($totalNeto);
$totalACobrar=$_POST['totalACobrar'];
$totalACobrar = quitarseparadormiles($totalACobrar);
$datos=$_POST['datos'];
$datos = utf8_decode($datos);

$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);

$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);

$zona=$_POST['zona'];
$zona = utf8_decode($zona);

$array_cod_tipo_cliente = json_decode($_POST['array_cod_tipo_cliente']);

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
	mascuentasacobrardetallado($tipo_cliente,$zona,$cliente,$totalNeto,$fecha,$cod_cobrador,$cod_local,$totalACobrar,$registrocargado,$array_cod_tipo_cliente,$datos);

}


if($operacion=="cuentasclientemoroso")
{

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';


cuentasclientemoroso($cliente,$fecha,$tipo,$formato);

}


if($operacion=="editarestecredito")
{
	$codCredito=$_POST['codCredito'];
$codCredito = utf8_decode($codCredito);
$date=$_POST['date'];
$date = utf8_decode($date);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);
$interes=$_POST['interes'];
$interes = quitarseparadormiles($interes);
$dias=$_POST['dias'];
$dias = utf8_decode($dias);
	editarestecredito($codCredito,$date,$monto,$descuento,$interes,$dias);

}

if($operacion=="solicitardescuentocredito")
{
	$codCredito=$_POST['codCredito'];
	$codCredito = utf8_decode($codCredito);
	$descuento=$_POST['descuento'];
	$descuento = quitarseparadormiles($descuento);
	solicitardescuentocredito($codCredito,$descuento);

}


if($operacion=="cuentasacobrarwhat")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$filtro=$_POST['filtro'];
$filtro = utf8_decode($filtro);
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$zona=$_POST['zona'];
$zona = utf8_decode($zona);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
	cuentasacobrarwhat($buscar,$filtro,$fecha1,$fecha2,$zona,$cod_local);

}	



if($operacion=="refinanciarencambio")
{
	
	
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);
$metodopago=$_POST['metodopago'];
$metodopago = utf8_decode($metodopago);
$iniciopago=$_POST['iniciopago'];
$iniciopago = utf8_decode($iniciopago);
$nroCuota=$_POST['nroCuota'];
$nroCuota = utf8_decode($nroCuota);
$dias=$_POST['dias'];
$dias = quitarseparadormiles($dias);
$interes=$_POST['interes'];
$interes = quitarseparadormiles($interes);
$total=$_POST['total'];
$total = quitarseparadormiles($total);
$Monto=$_POST['Monto'];
$Monto = quitarseparadormiles($Monto);

refinanciarencambio($cod_venta,$metodopago,$iniciopago,$nroCuota,$total,$Monto,$dias,$interes);

}

if($operacion=="editarcuenta")
{
	
	
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);
$idcredito=$_POST['idcredito'];
$idcredito = utf8_decode($idcredito);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

editarcuota($cod_venta,$idcredito,$fecha,$tipo,$descuento);

}

if($operacion=="buscarcuentasExpCobrados")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	cuentasExpCobrados($buscar,$formato);

}
if($operacion=="cuentasClientesCobrados")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	cuentasClientesCobrados($buscar,$formato);

}
if($operacion=="cuentasClientesPendientes")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	cuentasClientesPendientes($buscar,$formato);

}
if($operacion=="buscarccuentasExpPendientes")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	cuentasExpPendientes($buscar,$formato);

}

if($operacion=="eliminarcreditorefin")
{
	
	
$codcredito=$_POST['codcredito'];
$codcredito = utf8_decode($codcredito);
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);
eliminarcreditorefin($codcredito,$cod_venta);

}
if($operacion=="nuevocreditorefin" || $operacion=="editarcreditorefin")
{
	
	
$plazo=$_POST['plazo'];
$plazo = utf8_decode($plazo);
$Monto=$_POST['Monto'];
$Monto = quitarseparadormiles($Monto);
$fechapago=$_POST['fechapago'];
$fechapago = utf8_decode($fechapago);
$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);
$interes=$_POST['interes'];
$interes = quitarseparadormiles($interes);
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);
$idcredito=$_POST['idcredito'];
$idcredito = utf8_decode($idcredito);
$dias=$_POST['dias'];
$dias = utf8_decode($dias);
abmcreditorefin($plazo,$Monto,$fechapago,$descuento,$interes,$dias,$cod_venta,$idcredito,$operacion);

}

if($operacion=="refinanciarcuotas")
{
	
	
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);
$Monto=$_POST['Monto'];
$Monto = quitarseparadormiles($Monto);
$metodopago=$_POST['metodopago'];
$metodopago = utf8_decode($metodopago);
$iniciopago=$_POST['iniciopago'];
$iniciopago = utf8_decode($iniciopago);
$nroCuota=$_POST['nroCuota'];
$nroCuota = utf8_decode($nroCuota);
$dias=$_POST['dias'];
$dias = utf8_decode($dias);
$total=$_POST['total'];
$total = quitarseparadormiles($total);
$interes=$_POST['interes'];
$interes = quitarseparadormiles($interes);
$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);


$entrega=$_POST['entrega'];
$entrega = quitarseparadormiles($entrega);
RefinanciarCuotasRestantes($entrega,$cod_venta,$iniciopago,$nroCuota,$total,$Monto,$descuento,$interes,$dias,$metodopago);

}



if($operacion=="modificarfechapago")
{
	
	
$cod_venta=$_POST['cod_venta'];
$metodopago=$_POST['metodopago'];
$metodopago = utf8_decode($metodopago);
$iniciopago=$_POST['iniciopago'];
$iniciopago = utf8_decode($iniciopago);

modificarFechaPago($cod_venta,$iniciopago,$metodopago);

}




	if($operacion=="buscarInformeCredito")
{

$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);

$imprimirdesde=$_POST['imprimirdesde'];
$imprimirdesde = utf8_decode($imprimirdesde);

$datosimprimir=$_POST['datosimprimir'];
$datosimprimir = utf8_decode($datosimprimir);

$zona=$_POST['zona'];
$zona = utf8_decode($zona);

$tipoDeuda=$_POST['tipoDeuda'];
$tipoDeuda = utf8_decode($tipoDeuda);

$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);

$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);

$array_cod_tipo_cliente = json_decode($_POST['array_cod_tipo_cliente']);

 

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
	buscarInformeCredito($tipo_cliente,$zona,$tipoDeuda,$datosimprimir,$imprimirdesde,$cliente,$fecha1,$fecha2,$cobrador,$cod_local,$tipo,$array_cod_tipo_cliente,$vendedor);

}
if($operacion=="masbuscarInformeCredito")
{

$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);


$cliente =$_POST['cliente'];
$cliente = utf8_decode($cliente);


$totalACobrar=$_POST['totalACobrar'];
$totalACobrar = quitarseparadormiles($totalACobrar);


$totalNeto=$_POST['totalNeto'];
$totalNeto = quitarseparadormiles($totalNeto);

$totalInteres=$_POST['totalInteres'];
$totalInteres = quitarseparadormiles($totalInteres);

$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);


$imprimirdesde=$_POST['imprimirdesde'];
$imprimirdesde = utf8_decode($imprimirdesde);

$datosimprimir=$_POST['datosimprimir'];
$datosimprimir = utf8_decode($datosimprimir);

$zona=$_POST['zona'];
$zona = utf8_decode($zona);

$tipoDeuda=$_POST['tipoDeuda'];
$tipoDeuda = utf8_decode($tipoDeuda);

$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);
$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);

$array_cod_tipo_cliente = json_decode($_POST['array_cod_tipo_cliente']);

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
	masbuscarInformeCredito($tipo_cliente,$zona,$tipoDeuda,$datosimprimir,$imprimirdesde,$cliente,$fecha1,$fecha2,$cobrador,$cod_local,$tipo,$totalACobrar,$totalNeto,$totalInteres,$registrocargado,$array_cod_tipo_cliente,$vendedor);

}







if($operacion=="buscarcreditosCalcularPago")
{
	$fechacalculo=$_POST['fechacalculo'];
	$fechacalculo = utf8_decode($fechacalculo);
	$fechaCredito=$_POST['fechaCredito'];
	$fechaCredito = utf8_decode($fechaCredito);
	$buscar=$_POST['buscar'];
	$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarcreditosCalcularPago($buscar,$fechacalculo,$fechaCredito,$formato);
}




}



/*Buscar Registro en detalle*/
function buscarcreditosCalcularPago($buscar,$fechacalculo,$fechaCredito,$formato="")
{
$mysqli=conectar_al_servidor(); 

$CondicionfechaCredito="";
if($fechaCredito!=""){
	$CondicionfechaCredito=" and cr.fechapago<='".$fechaCredito."' ";
}

$sql= "select vt.cod_clienteFK,cr.plazo,cr.deudaInteres,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,
datediff(cr.fechapago,'".$fechacalculo."') as diff,vt.total_venta,interes,dias,vt.pago as entrega,
total,(totalinteres + deudaInteres) as totalinteres ,totaldeuda,cr.descuento,
(SELECT ci_cliente FROM cliente WHERE cod_cliente=vt.cod_clienteFK) as ci_cliente,
(SELECT direccion FROM persona WHERE cod_persona=vt.cod_clienteFK) as direccion,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
(SELECT nombre_persona FROM persona WHERE cod_persona=vt.idGaranteFk) as garante,
(SELECT telefono FROM persona WHERE cod_persona=vt.idGaranteFk) as telefonogarante,
(SELECT nombre FROM zona WHERE idzona = (SELECT idzonaFk FROM cliente WHERE cod_cliente=vt.cod_clienteFK)) as zona,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito and Monto!='0' order by pg.Fecha desc limit 1),0) as FechaUltimoPago,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito  and Monto!='0' order by pg.Fecha asc limit 1),0) as FechaPagoCredito,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota' ),0) as totalPagoCuota,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Interes'),0) as totalPagoInteres,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='CARGO ADMINISTRATIVO'),0) as totalCA
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar' ".$CondicionfechaCredito." "; 
 
 // echo($sql);
 // exit;

$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
$paginaextracto = "";  
$interes = "0";  
$diasatrazado = "0";  
$dias = "0";  
$totalPagado = "0";  
$total_venta = "0";  
$deuda = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$entrega = "0";  
$TotalCuotasPendientes = "0";   
$TotalInteresActual = "0";   
$MontoCuota = "0";   
$MontoCuotas = "0";   
$SubTotalAPagar = "0";  
$DeudaPendiente = "0";  
$TotalAPagar = "0";  
$TotalPagoEnInteres = "0";  
$TotalApagarSinInteres = "0";  
$nrodecuotasatrazado = "0";  
$TotalInteresApagar="0";
$diff2="0";
$cod_venta = '';
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$ContadorCuota=0;
 
$totaltotalDeuda = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$diff2="0";
$FechaUltimoPago = utf8_encode($valor['FechaUltimoPago']);
$garante = utf8_encode($valor['garante']);
$GaranteClienteImprimir = $garante;
$ci_cliente = utf8_encode($valor['ci_cliente']);
$DocumentoClienteImprimir = $ci_cliente;
$zona = utf8_encode($valor['zona']);
$ZonaClienteImprimir = $zona;
$idcredito = utf8_encode($valor['idcredito']);
$deudaInteres = utf8_encode($valor['deudaInteres']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); //TOTAL PAGO DEL CREDITO
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$FechaPagoCredito = utf8_encode($valor['FechaPagoCredito']);  
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$direccion = utf8_encode($valor['direccion']);
$DireccionClienteImprimir = $direccion;
$telefonocliente = utf8_encode($valor['telefono']);
$TelefonoClienteImprimir = $telefonocliente;
$telefonogarante = utf8_encode($valor['telefonogarante']);
$TelefonoGaranteImprimir = $telefonogarante;
$descuento = utf8_encode($valor['descuento']);// TOTAL DESCUENTO
$nroCancelado = utf8_encode($valor['nroCancelado']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$totalPagoCredito = utf8_encode($valor['totalPagoCuota']);//TOTAL PAGADO DE CUOTAS
$totalPagoInteres = utf8_encode($valor['totalPagoInteres']);// TOTAL PAGADO DE INTERES
$totalCA = utf8_encode($valor['totalCA']);// TOTAL PAGADO DE cargo administrativo
$MontoConDescuento=$Monto-$descuento;//OBTENEMOS EL MONTO CON DESCUENTO
$totalDescuento=$totalDescuento+$descuento;//CALCULAMOS EL TOTAL DESCUENTO
/*CALCULAMOS EL SOBRANTE*/
$MontoSobrante=$Monto-$totalPagoCredito;
if($MontoCuotas==0){
$MontoCuotas=$Monto-$totalPagoCredito;
}
/*INICIALIZAMOS LAS VARIABLES*/
$deudaActua=0;
$total_interes=0;
$TotalSinInteres=0;
$deuda_Actual_interes=0;

$stylecolor=" ";
$event=" ";
//CONDICION PARA SABER SI ESE UN CREDITO CANCELDADO
if($nroCancelado==0){
	//CONDICION PARA SABER SI YA SE PAGO TODO
	if(($Monto+$totalPagoInteres+$totalCA)>($totalPago+$descuento)){
	//ESTADO DEL PAGO
	$Esado="Pendiente";
	
	$ContadorCuota=$ContadorCuota +1;
	if($ContadorCuota==1){
		 
	}else{
		 
	}
 
	//CALCULAMOS EL TOTAL SIN INTERES 
	$TotalSinInteres=$Monto-($totalPagoCredito+$descuento);	
	//CONDICION PARA SABER SI HAY DIAS ATRAZADOS
	if($diff<0){
	$diff=$diff*-1;
	 
	$stylecolor=" background-color: #df4444;color:#ffffff";
	}else{
	$diff=0;
    }
	$control="si";
	if($control=="si"){
	//CALCULAMOS EL NRO DE CUOTAS ATRAZADAS
	$nrodecuotasatrazado=$nrodecuotasatrazado+1;
	//CONDICION PARA SABER SI HAY INTERESES EN %
	if ($interes != 0) {
    // Normalizamos fechas
    $fechaCalculo     = date('Y-m-d', strtotime(str_replace('/', '-', $fechacalculo)));
    $fechaPago        = date('Y-m-d', strtotime(str_replace('/', '-', $fechapago)));
    $fechaUltimoPago  = date('Y-m-d', strtotime(str_replace('/', '-', $FechaUltimoPago)));

    $datetimeCalculo  = new DateTime($fechaCalculo);
    $datetimePago     = new DateTime($fechaPago);
    
    $fecha1_ts = strtotime($FechaUltimoPago);
    $fecha2_ts = strtotime($fechapago);
    
    if ($FechaPagoCredito == "0") {
        $datetime2 = new DateTime($fechaPago);
    } elseif ($fecha1_ts < $fecha2_ts) {
        $datetime2 = new DateTime($fechaPago);
    } else {
        $datetime2 = new DateTime($fechaUltimoPago);
    }
    
    // $diff   = $datetime2->diff($datetimeCalculo)->format('%a');
    // $diff2  = $datetimePago->diff($datetimeCalculo)->format('%a');
        
    // $diasGracia = $diff2 - $dias;
	
	$diff   = (int)$datetime2->diff($datetimeCalculo)->format('%r%a');
	$diff2  = (int)$datetimePago->diff($datetimeCalculo)->format('%r%a');

	$diasGracia = $diff2 - $dias;

	// Si es menor que 0, dejar en 0
	if ($diasGracia < 0) {
		$diasGracia = 0;
		$diff = 0;
		$diff2 = 0;
	}
	
	
    $interesDiario = $interes / 30;
    
    if ($diasGracia > 0) {
        // Calculamos monto sobrante
        $montoIn = $MontoConDescuento - $totalPagoCredito;
        
        // Calculamos interés
        $i = ($interesDiario * ($Monto - $totalPagoCredito)) / 100;
        $total_interes = ceil(($i * $diff) / 1000) * 1000;
        
        $total = $montoIn + $total_interes;
        $deudaActua = $total;
        $deuda_Actual_interes = $total_interes;
    } else {
        $deudaActua = $MontoConDescuento - $totalPagoCredito;
        $total = $deudaActua;
    }
} else {
    $deudaActua = $MontoConDescuento - $totalPagoCredito;
    $total = $deudaActua;
}

	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
 
	}
 
	$DeudaPendiente=$DeudaPendiente+$deudaActua;
 
	}else{
	$Esado="Pagado";
	$stylecolor="background-color: #4caf50;color:#ffffff";
	$deudaActua=0;
	$total=0;
	$diff=0;
	 
	}
	 
	}else{
	
	
	if(($MontoConDescuento+$tinteres)>$totalPago){
	 $Esado="Pendiente";
	 $diff="0";
     $deudaActua=($MontoConDescuento+$tinteres)-$totalPago;
	 $total=$MontoConDescuento-$totalPago;
	 $stylecolor="text-decoration: line-through;";
	
	}else{
	$Esado="Pagado";
	$stylecolor="background-color: #4caf50;color:#ffffff";
	$deudaActua=0;
	$diff=0;
	$total=0;
	}
    	 
}

 
$totalInteres=$totalInteres+$totalPagoInteres+$total_interes;
$TotalInteresActual=$TotalInteresActual+$total_interes;
// $deuda=$deuda+$deudaActua;
$diasatrazado=$diasatrazado+$diff;
$totalPagado=$totalPagado+$totalPago;
$styleName="tableRegistroSearch";


//                                                                                        Este agregue yo ahora  y tambien agregue en el td
$DeudaInteres= $total_interes + $deudaInteres;



if($DeudaInteres<=0){
	$DeudaInteres=0;
}
$TotalDeuda=$DeudaInteres+ $TotalSinInteres;
$deuda=$deuda+$TotalDeuda;
// $DeudaInteres = ceil($DeudaInteres/1000)*1000;


$TotalInteresApagar = $TotalInteresApagar + $DeudaInteres;
// $TotalInteresApagar = ceil($TotalInteresApagar/1000)*1000;
$styleName=CargarStyleTable($styleName);
$nueva_fecha = date("d-m-Y", strtotime($fechapago));




$cobrador = buscar_cobrador_asignado($cod_clienteFK);
$CobradorClienteImprimir = $cobrador;
$totaltotalDeuda += $TotalDeuda;
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'   style='$stylecolor'> 
<td id='td_datos_2' style='width:5%' >".$plazo."</td> 
<td style='width:5%'>".$nueva_fecha."</td>
<td id='td_datos_14' style='width:3%'>".$diff2."</td>
<td id='td_datos_15' style='width:3%'>".$diff."</td>
<td id='td_datos_5' style='width:5%'>". number_format($Monto,'0',',','.')."</td> 
<td id='td_datos_11' style='width:5%'>". number_format($total_interes,'0',',','.')."</td>
<td id='td_datos_12' style='width:5%'>". number_format($descuento,'0',',','.')."</td> 
<td id='td_datos_13' style='width:5%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($totalPagoCredito,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($totalPagoInteres,'0',',','.')."</td>
<td id='td_datos_21' style='width:5%'>". number_format($totalCA,'0',',','.')."</td>

<td id='td_datos_20' style='width:5%'>". number_format($DeudaInteres,'0',',','.')."</td>
<td id='td_datos_22' style='width:5%'>". number_format($TotalSinInteres,'0',',','.')."</td>
<td id='td_datos_6' style='width:5%'>". number_format($TotalDeuda,'0',',','.')."</td>

<td id='td_datos_7' style='width:5%'>".$Esado."</td> 
</tr>
</table>
";
 

}

if($DeudaPendiente==0){
	$SubTotalAPagar=$MontoCuotas;
	$MontoCuota=$MontoCuotas;
	$DeudaPendiente=$MontoCuotas;
}


}


$deuda = ceil($deuda / 1000) * 1000;	
//                                                                                     edite la matriz 7
 mysqli_close($mysqli);    
$informacion =array("1" => "exito","2" => $pagina,"12" => $paginaextracto,"3" =>number_format($totalPagado,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($interes,'2',',','.'),"6" =>$dias, "7" =>number_format($TotalInteresApagar,'0',',','.')
, "9" => number_format($entrega,'0',',','.'),"8" => $diasatrazado, "11" => number_format($totalDescuento,'0',',','.')
, "13" => number_format($SubTotalAPagar,'0',',','.'),"14" => number_format($TotalCuotasPendientes,'0',',','.') ,
"15" => number_format($MontoCuota,'0',',','.'),"16" => number_format($totalInteres,'0',',','.') 
,"17" => number_format($DeudaPendiente,'0',',','.') ,"18" => number_format($TotalInteresActual,'0',',','.'),"19" => number_format($TotalPagoEnInteres,'0',',','.'));
echo json_encode($informacion);	
exit;
}





function buscarInformeCredito($tipo_cliente,$zona,$tipoDeuda,$datosimprimir,$imprimirdesde,$cliente,$fecha1,$fecha2,$cobrador,$cod_local,$tipo,$array_cod_tipo_cliente, $vendedor)
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
	$condicionCodLocal=" "; 
	if($cod_local!=""){
	$condicionCodLocal=" and vt.cod_local='$cod_local' ";
	 }

$condicionZona=" ";
	if($zona!=""){
	$condicionZona=" and (Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK ) ='$zona' ";
	}


$condiciontipo_cliente="";
	 if($tipo_cliente!=""){
	   $condiciontipo_cliente=" and (Select tipo_cliente from cliente where cod_cliente=cod_clienteFK limit 1)= '".$tipo_cliente."'";		
	 }

	$condicioncliente="";
	if($cliente!=""){
	 $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%$cliente%' ";
	}

	$condicioncobrador="";
	if($cobrador!=""){
	 $condicioncobrador=" and z.cod_cobradorFK = '$cobrador'";
	}
	
	$condicionvendedor="";
	if($vendedor!=""){
	 $condicionvendedor=" and Vendedor1 = '$vendedor'";
	}


$condicionFiltro=" ";
if($tipo=="1"){
	$condicionFiltro=" and cr.fechapago between '$fecha1' and '$fecha2'";
}
 

$condicionIn = "";
$contador = 0;
foreach ($array_cod_tipo_cliente as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}

$condiciontipo="";
if($contador!=0){
	$condiciontipo=" and c.cod_tipomora in ($condicionIn)";
}

$condiciondatos = "";
if($datosimprimir == "1"){
	$condiciondatos = " and ( (COALESCE(tipo_estado, 0) != 12) and (COALESCE(tipo_estado, 0) != 14)   and  (COALESCE(vt.codmoracliente, 0) != 13)) ";
}
if($datosimprimir == "2"){
	$condiciondatos = " and ((COALESCE(tipo_estado, 0) = 12)  or (COALESCE(tipo_estado, 0) = 14) or  (COALESCE(vt.codmoracliente, 0) = 13))  ";
}

if($datosimprimir == "3"){
	$condiciondatos = " and (COALESCE(vt.codmoracliente, 0) = 13) ";
}

if($datosimprimir == "4"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 12) ";
}

if($datosimprimir == "5"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 14) ";
}

$condicionOrderBy = 'vt.cod_clienteFK';
 if($imprimirdesde=="1"){
	$condicionOrderBy = "vt.cod_venta";  
}




	$sql= "select (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,vt.cod_clienteFK,
	(SELECT nombre FROM vendedor where idvendedor = Vendedor1) as vendedor,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,vt.cod_venta,
IFNULL((Select referencias from referenciascliente rf where rf.cod_clienteFk=vt.cod_clienteFK order by idreferenciascliente desc limit 1),'') as referencia,
 (Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cr.cod_venta)) as nombrezona,
 (SELECT nombre_persona from persona where cod_persona = (SELECT cod_cobradorFK from zona where idzona = (SELECT idzonaFk from cliente where cod_cliente = cod_clienteFK))) as cobrador,
(Select direccion from persona where cod_persona=vt.cod_clienteFK) as direccion,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono , 
(Select nombre from mora_cliente where idmora_cliente=c.cod_tipomora) as Estado ,
(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado,
DATEDIFF('".$fechahoy."',(select fechapago from credito cr inner join venta v on v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) order by fechapago asc limit 1)) as DA ,
vt.codmoracliente,

(select fechapago from credito cr inner join venta v on v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) order by fechapago asc limit 1) as FP

 from  credito cr 
 inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente c on vt.cod_clienteFK = c.cod_cliente
 inner join zona z on z.idzona = c.idzonaFk
 
 where IFNULL((select sum(pg.Monto) from pago pg  where cr.idcredito=pg.cod_creditoFK and Tipo='Pago Cuota'),0) <
	(cr.Monto - cr.descuento) and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionZona.$condiciondatos.$condicionFiltro.$condicioncobrador.$condicionCodLocal.$condicioncliente.$condiciontipo.$condiciontipo_cliente.$condicionvendedor." group by ".$condicionOrderBy." order by vt.cod_venta desc limit 25";

 
if($imprimirdesde=="2"){
	$pagina = "";  
}else{
	
	
	$pagina="<table class='tableCabeceraRegistro' style='width:100%' >
<tbody>
<tr >
<td class='td_registro' style='width:5%;'><b>DOCUMENTO:</b> </td>
<td class='td_registro' style='width:14%;'><b>CLIENTE:</b> </td>
<td class='td_registro' style='width:10%;'><b>DIRECCIÓN:</b> </td>
<td class='td_registro' style='width:8%;'><b>ZONA:</b> </td>
<td class='td_registro' style='width:8%;'><b>TELEF.:</b> </td>
<td class='td_registro' style='width:5%;'><b>DEUDA:</b> </td>
<td class='td_registro' style='width:10%;'><b>ESTADO:</b> </td>
<td class='td_registro' style='width:10%;'><b>COBRADOR</b> </td>
<td class='td_registro' style='width:8%;'><b>ULT. FECHA PAGO</b> </td>
<td class='td_registro' style='width:5%;'><b>D. A.</b> </td>
<td class='td_registro' style='width:7%;'><b>FECHA P.</b> </td>
<td class='td_registro' style='width:5%;'><b>INFORMCONF</b> </td>
<td class='td_registro' style='width:3%;'><b>VENDEDOR</b> </td>
<td class='td_registro' style='width:5%;'>MSJ</td>
</tr>
</tbody>
</table>";
}

 
$totalPagado = "0";  
$deuda = "0";  
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
$detallesventa="";
$totaldeudas="0";
$totalNeto="0";
$totalInteres="0";
$paginaWhatsapp="";
$mensaje="";
$array_cod_clientes_callcenter = array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$DA = utf8_encode($valor['DA']);
$FP = utf8_encode($valor['FP']);
$referencia = utf8_encode($valor['referencia']);
$documento = utf8_encode($valor['documento']);
$clientenombre = utf8_encode($valor['clientenombre']);
$direccion = utf8_encode($valor['direccion']);
$nombrezona = utf8_encode($valor['nombrezona']);
$telefono = utf8_encode($valor['telefono']);
$telefono = utf8_encode($valor['telefono']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$Estado = utf8_encode($valor['Estado']);
$cobrador = utf8_encode($valor['cobrador']);
$cod_venta = utf8_encode($valor['cod_venta']);
$tipo_estado = utf8_encode($valor['tipo_estado']);
$codmoracliente = utf8_encode($valor['codmoracliente']);
$vendedor = utf8_encode($valor['vendedor']);

$estado_info = obtener_estado_cliente_informconf($cod_clienteFK);


$p_tipo = '';
$nombre_tipo_estado = '';
if($tipo_estado != '0'){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}else if($tipo_estado == '0' && $codmoracliente != ''){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($codmoracliente);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}

if($imprimirdesde=="2"){
	
	
	$referenciaCliente=buscarReferenciaCliente($cod_clienteFK);

$tituloClienteVenta="<table class='tableCabeceraRegistro' >
<tbody>
<tr >
<td class='td_registro' style='width:5%;'><b>NRO C.I.:</b> <br>".$documento."</td>
<td class='td_registro' style='width:20%;'><b>CLIENTE:</b> <br> ".$p_tipo.$clientenombre."</td>
<td class='td_registro' style='width:15%;'><b>DIRECCIÓN:</b>  <br>".$direccion.".</td>
<td class='td_registro' style='width:15%;'><b>REFERENCIA:</b>  <br>".$referenciaCliente.".</td>
<td class='td_registro' style='width:5%;'><b>ZONA:</b> <br> ".$nombrezona."</td>
<td class='td_registro' style='width:10%;'><b>TELEF.:</b> <br>".$telefono.".</td>
<td class='td_registro' style='width:10%;'><b>COBRADOR.:</b> <br>".$cobrador.".</td>
<td class='td_registro' style='width:10%;'><b>FECHA ULT. PAGO.:</b> <br>".obtener_ult_fechapago($cod_venta).".</td>
<td class='td_registro' style='width:10%;'><b>INFORMCONF :</b> <br>".$estado_info.".</td>
</tr>
</tbody>
</table>";

$detallesventas=buscarInformeCreditoDetalle($condicionZona,$cod_clienteFK,$tipo,$condicionFiltro,$condicioncobrador,$condicionCodLocal,$tituloClienteVenta,$fecha2);
$pagina.="
".$detallesventas[0];
$totaldeudas=$totaldeudas+$detallesventas[1];
$totalNeto = $totalNeto + $detallesventas[2];
$totalInteres = $totalInteres + $detallesventas[3];
$cod_venta = $detallesventas[4];
	
}else{
	$styleName="tableRegistroSearch";
	$detallesventas=buscarInformeCreditoDetalle($condicionZona,$cod_venta,$tipo,$condicionFiltro,$condicioncobrador,$condicionCodLocal,"",$fecha2);
	
	$cod_venta = $detallesventas[4];
	
if($telefono!=""){
			$condicion=$telefono[0];
		}else{
			$condicion="";
		}
$codigo="595";
if($condicion=="+"){
	$codigo="";
}

	
$mensaje.="Estimado '$clientenombre', escribimos para recordarte sobre SU CUOTA que se encuentra vencida. Aguardamos la confirmación de su pago por este medio. Saludos desde ELIM S.A.";


if($telefono!="0" && $telefono!=""){
	
	$telefono = substr($telefono, 1);
	
$searchString = " ";
$replaceString = "";
 
$telefono = str_replace($searchString, $replaceString, $telefono); 
	

	 $paginaWhatsapp.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'   >
<td id='td_datos_13' style='width:30%'>".$codigo.$telefono."</td>
<td  id='td_datos_1' style='width:30%'></td>
<td  id='td_datos_2' style='width:40%'>".$mensaje."</td>
</tr>
</table>";
	}


$Nrosms=$codigo.$telefono;
	
	
	$totaldeudas=$totaldeudas+$detallesventas[1];
$totalNeto = $totalNeto + $detallesventas[2];
$totalInteres = $totalInteres + $detallesventas[3];
	$mensaje="";
	
	
	
$botonMSJ = "<input type=\"button\" value=\"MSJ\" style=\"width:50px\" class=\"btn4\" onclick=\"obtenerMensajeParaEnviar($Nrosms,'$clientenombre')\" />";

	$pagina.="<table class='$styleName'  border='1' cellspacing='1' cellpadding='5' >
<tbody>
<tr >
<td   style='width:5%;'> ".$documento."</td>
<td   style='width:14%;'> ".$p_tipo.$clientenombre."</td>
<td   style='width:10%;'> ".$direccion."</td>
<td   style='width:8%;'> ".$nombrezona."</td>
<td   style='width:8%;'> ".$telefono."</td>
<td   style='width:5%;'> ".number_format($detallesventas[1],'0',',','.')."</td>
<td   style='width:10%;'> ".$Estado."</td>
<td   style='width:10%;'> ".$cobrador."</td>
<td   style='width:8%;'> ".obtener_ult_fechapago($cod_venta)."</td>
<td   style='width:5%;background: #f18538; color: aliceblue; text-align: center; border-radius: 10px;'>".$DA."</td>
<td   style='width:7%;'> ".$FP."</td>
<td   style='width:5%;'> ".$estado_info."</td>
<td   style='width:3%;'> ".$vendedor."</td>
<td   style='width:5%;'>".$botonMSJ."</td>
</tr>
</tbody>
</table>";

}
 

if(comprobarClienteCallCenter($cod_clienteFK)){
	array_push($array_cod_clientes_callcenter,$cod_clienteFK);
}


}
}

	$sql= "select vt.cod_clienteFK
 from  credito cr 
  inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente c on vt.cod_clienteFK = c.cod_cliente
 inner join zona z on z.idzona = c.idzonaFk
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionZona.$condiciondatos.$condicionFiltro.$condiciontipo.$condicioncobrador.$condicionCodLocal.$condicioncliente.$condiciontipo_cliente.$condicionvendedor." group by ".$condicionOrderBy;
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;

 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $pagina,"3"=> number_format($nroRegistro,'0',',','.'),"4"=> number_format($totaldeudas,'0',',','.'),"5"=> number_format($totalNeto,'0',',','.'),"6"=> number_format($totalInteres,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistro,"7"=>$paginaWhatsapp,"8"=>$array_cod_clientes_callcenter);
echo json_encode($informacion);	
exit;
}

function masbuscarInformeCredito($tipo_cliente,$zona,$tipoDeuda,$datosimprimir,$imprimirdesde,$cliente,$fecha1,$fecha2,$cobrador,$cod_local,$tipo,$totalACobrar,$total_Neto,$total_Interes,$registrocargado,$array_cod_tipo_cliente,$vendedor)
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$condicionCodLocal=" "; 
if($cod_local!=""){
$condicionCodLocal=" and vt.cod_local='$cod_local' ";
 }
		
		$condicioncliente="";
	if($cliente!=""){
	 $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%$cliente%' ";
	}

$condiciontipo_cliente="";
	 if($tipo_cliente!=""){
	   $condiciontipo_cliente=" and (Select tipo_cliente from cliente where cod_cliente=cod_clienteFK limit 1)= '".$tipo_cliente."'";		
	 }

$condicionZona=" ";
	if($zona!=""){
	$condicionZona=" and (Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK ) ='$zona' ";
	}



$condicioncobrador="";
if($cobrador!=""){
 $condicioncobrador=" and z.cod_cobradorFK = '$cobrador'";
}


$condicionvendedor="";
	if($vendedor!=""){
	 $condicionvendedor=" and Vendedor1 = '$vendedor'";
	}


$condicionFiltro=" ";
if($tipo=="1"){
	$condicionFiltro=" and cr.fechapago between '$fecha1' and '$fecha2'";
}


$condicionIn= "";
$contador = 0;
foreach ($array_cod_tipo_cliente as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}

$condiciontipo="";
if($contador!=0){
	$condiciontipo=" and c.cod_tipomora in ($condicionIn)";
}

$condiciondatos="";
if($datosimprimir == "1"){
	$condiciondatos = " and ( (COALESCE(tipo_estado, 0) != 12) and (COALESCE(tipo_estado, 0) != 14)   and  (COALESCE(vt.codmoracliente, 0) != 13)) ";
}
if($datosimprimir == "2"){
	$condiciondatos = " and ((COALESCE(tipo_estado, 0) = 12)  or (COALESCE(tipo_estado, 0) = 14) or  (COALESCE(vt.codmoracliente, 0) = 13))  ";
}

if($datosimprimir == "3"){
	$condiciondatos = " and (COALESCE(vt.codmoracliente, 0) = 13) ";
}

if($datosimprimir == "4"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 12) ";
}

if($datosimprimir == "5"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 14) ";
}

$condicionOrderBy = 'vt.cod_clienteFK';
 if($imprimirdesde=="1"){
	$condicionOrderBy = "vt.cod_venta";  
}


$condicionOrderBy = 'vt.cod_clienteFK';
 if($imprimirdesde=="1"){
	$condicionOrderBy = "vt.cod_venta";  
}

	$sql= "select (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,vt.cod_clienteFK,
		(SELECT nombre FROM vendedor where idvendedor = Vendedor1) as vendedor,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,vt.cod_venta,
IFNULL((Select referencias from referenciascliente rf where rf.cod_clienteFk=vt.cod_clienteFK order by idreferenciascliente desc limit 1),'') as referencia,
 (Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cr.cod_venta)) as nombrezona,
  (SELECT nombre_persona from persona where cod_persona = (SELECT cod_cobradorFK from zona where idzona = (SELECT idzonaFk from cliente where cod_cliente = cod_clienteFK))) as cobrador,
(Select direccion from persona where cod_persona=vt.cod_clienteFK) as direccion,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
(Select nombre from mora_cliente where idmora_cliente=c.cod_tipomora) as Estado ,
(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado,
DATEDIFF('".$fechahoy."',(select fechapago from credito cr inner join venta v on v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) order by fechapago asc limit 1)) as DA ,
vt.codmoracliente,

(select fechapago from credito cr inner join venta v on v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) order by fechapago asc limit 1) as FP

 from  credito cr 
 inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente c on vt.cod_clienteFK = c.cod_cliente
 inner join zona z on z.idzona = c.idzonaFk
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionZona.$condiciondatos.$condicionFiltro.$condicioncobrador.$condicionCodLocal.$condicioncliente.$condiciontipo.$condiciontipo_cliente.$condicionvendedor." group by ".$condicionOrderBy." order by vt.cod_venta desc   limit ".$registrocargado." , 25 ";
 
	$pagina = "";  


$totalPagado = "0";  
$deuda = "0";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargado;
$controlStyle="";
$controlVentas="";
$detallesventa="";
$totaldeudas=$totalACobrar;
$totalNeto= $total_Neto ;
$totalInteres= $total_Interes ;
$mensaje = "";
$paginaWhatsapp = "";
$array_cod_clientes_callcenter = array();

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$DA = utf8_encode($valor['DA']);
$FP = utf8_encode($valor['FP']);
$referencia = utf8_encode($valor['referencia']);
$documento = utf8_encode($valor['documento']);
$clientenombre = utf8_encode($valor['clientenombre']);
$direccion = utf8_encode($valor['direccion']);
$nombrezona = utf8_encode($valor['nombrezona']);
$telefono = utf8_encode($valor['telefono']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$Estado = utf8_encode($valor['Estado']);
$cobrador = utf8_encode($valor['cobrador']);
$cod_venta = utf8_encode($valor['cod_venta']);
$tipo_estado = utf8_encode($valor['tipo_estado']);
$codmoracliente = utf8_encode($valor['codmoracliente']);
$vendedor = utf8_encode($valor['vendedor']);

$estado_info = obtener_estado_cliente_informconf($cod_clienteFK);

$p_tipo = '';
if($tipo_estado != '0'){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}else if($tipo_estado == '0' && $codmoracliente != ''){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($codmoracliente);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}


if($imprimirdesde=="2"){
$referenciaCliente=buscarReferenciaCliente($cod_clienteFK);


	

$tituloClienteVenta="<table class='tableCabeceraRegistro' >
<tbody>
<tr >
<td class='td_registro' style='width:5%;'><b>DOCUMENTO:</b> <br>".$documento."</td>
<td class='td_registro' style='width:20%;'><b>CLIENTE:</b> <br> ".$p_tipo.$clientenombre."</td>
<td class='td_registro' style='width:15%;'><b>DIRECCIÓN:</b>  <br>".$direccion.".</td>
<td class='td_registro' style='width:15%;'><b>REFERENCIA:</b>  <br>".$referenciaCliente.".</td>
<td class='td_registro' style='width:5%;'><b>ZONA:</b> <br> ".$nombrezona."</td>
<td class='td_registro' style='width:10%;'><b>TELEF.:</b> <br>".$telefono.".</td>
<td class='td_registro' style='width:10%;'><b>COBRADOR.:</b> <br>".$cobrador.".</td>
<td class='td_registro' style='width:10%;'><b>FECHA ULT. PAGO.:</b> <br>".obtener_ult_fechapago($cod_venta).".</td>
<td class='td_registro' style='width:10%;'><b>VENDEDOR :</b> <br>".$vendedor.".</td>
<td class='td_registro' style='width:10%;'><b>INFORMCONF :</b> <br>".$estado_info.".</td>
</tr>
</tbody>
</table>";

$detallesventas=buscarInformeCreditoDetalle($condicionZona,$cod_clienteFK,$tipo,$condicionFiltro,$condicioncobrador,$condicionCodLocal,$tituloClienteVenta,$fecha2);
$pagina.="
".$detallesventas[0];
$totaldeudas=$totaldeudas+$detallesventas[1];
$totalNeto = $totalNeto + $detallesventas[2];
$totalInteres = $totalInteres + $detallesventas[3];

$cod_venta = $detallesventas[4];
}else{
	$styleName="tableRegistroSearch";
	$detallesventas=buscarInformeCreditoDetalle($condicionZona,$cod_venta,$tipo,$condicionFiltro,$condicioncobrador,$condicionCodLocal,"",$fecha2);
	$cod_venta = $detallesventas[4];
	
	
	
		
if($telefono!=""){
			$condicion=$telefono[0];
		}else{
			$condicion="";
		}
$codigo="595";
if($condicion=="+"){
	$codigo="";
}

	
$mensaje.="Estimado '$clientenombre', escribimos para recordarte sobre SU CUOTA que se encuentra vencida. Aguardamos la confirmación de su pago por este medio. Saludos desde ELIM S.A.";


if($telefono!="0" && $telefono!=""){
	
	$telefono = substr($telefono, 1);
	
$searchString = " ";
$replaceString = "";
 
$telefono = str_replace($searchString, $replaceString, $telefono); 
	

	 $paginaWhatsapp.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'   >
<td id='td_datos_13' style='width:30%'>".$codigo.$telefono."</td>
<td  id='td_datos_1' style='width:30%'></td>
<td  id='td_datos_2' style='width:40%'>".$mensaje."</td>
</tr>
</table>";
	}
	
	
$Nrosms=$codigo.$telefono;



	
$botonMSJ = "<input type=\"button\" value=\"MSJ\" style=\"width:50px\" class=\"btn4\" onclick=\"obtenerMensajeParaEnviar($Nrosms,'$clientenombre')\" />";



$totaldeudas=$totaldeudas+$detallesventas[1];
$totalNeto = $totalNeto + $detallesventas[2];
$totalInteres = $totalInteres + $detallesventas[3];
	
	$pagina.="<table class='$styleName'  border='1' cellspacing='1' cellpadding='5' >
<tbody>
<tr >
<td   style='width:5%;'> ".$documento."</td>
<td   style='width:14%;'> ".$p_tipo.$clientenombre."</td>
<td   style='width:10%;'> ".$direccion."</td>
<td   style='width:8%;'> ".$nombrezona."</td>
<td   style='width:8%;'> ".$telefono."</td>
<td   style='width:5%;'> ".number_format($detallesventas[1],'0',',','.')."</td>
<td   style='width:10%;'> ".$Estado."</td>
<td   style='width:10%;'> ".$cobrador."</td>
<td   style='width:8%;'> ".obtener_ult_fechapago($cod_venta)."</td>
<td   style='width:5%;background: #f18538; color: aliceblue; text-align: center; border-radius: 10px;'>".$DA."</td>
<td   style='width:7%;'> ".$FP."</td>
<td   style='width:5%;'> ".$estado_info."</td>
<td   style='width:3%;'> ".$vendedor."</td>
<td   style='width:5%;'>".$botonMSJ."</td>
</tr>
</tbody>
</table>";

	
}

if(comprobarClienteCallCenter($cod_clienteFK)){
	array_push($array_cod_clientes_callcenter,$cod_clienteFK);
}

}
}



 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $pagina,"3"=> number_format($nroRegistro,'0',',','.'),"4"=> number_format($totaldeudas,'0',',','.'),"5"=> number_format($totalNeto,'0',',','.'),"6"=> number_format($totalInteres,'0',',','.'),"99"=>$nroRegistro,"7"=>$paginaWhatsapp,"8"=>$array_cod_clientes_callcenter);
echo json_encode($informacion);	
exit;
}

function comprobarClienteCallCenter($cod_clienteFK){
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select *
        from detalle_callcenter where cod_clienteFK = '$cod_clienteFK' and estado='INCOBRABLE' LIMIT 1";
		
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 
 $estado = true;
 if ($valor>0)
 {
	 $estado = false;
 }
 
  mysqli_close($mysqli);
  return $estado;
}

function buscarInformeCreditoDetalle($condicionZona,$buscar,$tipo,$condicionFiltro,$condicioncobrador,$condicionCodLocal,$tituloClienteVenta,$fecha2)
{
$mysqli=conectar_al_servidor();
if($tipo=="2"){
	$condicionFiltro="";
}


$condicionWhere = " vt.cod_clienteFK='$buscar'";
if($tituloClienteVenta == ''){
	$condicionWhere = " cr.cod_venta = '$buscar'";
}


$fechahoy=date('Y-m-d');	
$sql= "select vt.cod_clienteFK,cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.total_venta,interes,dias,vt.pago as entrega,cr.deudaInteres,
total,(totalinteres + deudaInteres) as totalinteres,totaldeuda,cr.descuento,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito and Monto!='0' order by pg.Fecha desc limit 1),0) as FechaUltimoPago,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito  and Monto!='0' order by pg.Fecha asc limit 1),0) as FechaPagoCredito,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito and Monto!='0' order by pg.Fecha desc limit 1),'') as FechaUltimoPago2,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota' ),0) as totalPagoCuota,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Interes'),0) as totalPagoInteres
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente c on vt.cod_clienteFK = c.cod_cliente
 inner join zona z on z.idzona = c.idzonaFk
 where ".$condicionWhere." and ((cr.Monto-cr.descuento)-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0))>0 ".$condicionZona.$condicionFiltro.$condicioncobrador.$condicionCodLocal." group by cr.idcredito asc "; 
 
/*  echo $sql;
 exit;
  */
 

$pagina = "";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$controlventa="";
$paginadetalle="";
$totaldeudas="0";
$totalNeto="0";
$totalInteres="0";
$styleName="tableRegistroSearch";
$cod_venta = "";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$FechaUltimoPago2 = utf8_encode($valor['FechaUltimoPago2']);
$deudaInteres = utf8_encode($valor['deudaInteres']);
$FechaPagoCredito = utf8_encode($valor['FechaPagoCredito']);  
$FechaUltimoPago = utf8_encode($valor['FechaUltimoPago']);
$idcredito = utf8_encode($valor['idcredito']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$descuento = utf8_encode($valor['descuento']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$totalPagoCredito = utf8_encode($valor['totalPagoCuota']);
$totalPagoInteres = utf8_encode($valor['totalPagoInteres']);
$MontoConDescuento=$Monto-$descuento;
$MontoSobrante=$MontoConDescuento-$totalPago;
$deudaActua=0;
$total_interes=0;
$TotalSinInteres=0;
$deuda_Actual_interes=0;
$stylecolor=" ";
$event=" ";
$i=0;


$interes = $interes /30;
$interes =round($interes, 3);



if($nroCancelado==0){
	
	if(($Monto+$totalPagoInteres)>($totalPago+$descuento)){
	$Esado="Pendiente";
	$TotalSinInteres=$Monto-($totalPagoCredito+$descuento);	
	if($diff<0){
	$diff=$diff*-1;
	$stylecolor=" background-color: #313030;color:#FFEB3B";
	}else{
	$diff=0;
    }
	$control=verificar_fecha_expiracion($fechapago);
	if($control=="si"){
	if($interes!=0){
	$fechahoy=date('Y-m-d');	
	$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy))));
	// $datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));
	// $interval=$datetime2->diff($datetime1);
    // $diff=$interval->format('%a');
	
	
	$fechahoy=date('Y-m-d');	
	$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy)))); 
	$datetime3= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	$Fecha1=strtotime($FechaUltimoPago);
	$Fecha2=strtotime($fechapago);
	if($FechaPagoCredito=="0" ){
		$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	}else{
		if($Fecha1 < $Fecha2){
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));		
			}else{
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$FechaUltimoPago))));		
			}		
	}
	$interval=$datetime2->diff($datetime1);
    $diff=$interval->format('%a');
	
	
	
	$interval2=$datetime3->diff($datetime1);
    $diff2=$interval2->format('%a');

	
	$diasGracia=$diff2-$dias;
	
	if($diasGracia>0){
		
	$montoIn=$Monto-$totalPagoCredito;	
	$i=($interes*($montoIn))/100;
	$total_interes=($i*$diff);
	$t=$montoIn+$total_interes;
	$deudaActua=($montoIn+$total_interes)-$descuento;
	 $total=$t;
	// $deudaActua=$t-$totalPagoCredito-$totalPagoInteres;
	$deuda_Actual_interes=$total_interes;	
	}else{
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;		
	}	
	}else{	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	}
			
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	}
	
	if($controlventa!=$cod_venta){
		
		$datosVenta=buscardatoscuentacreditosventa($cod_venta);
		
// $datos[14]=$pagado ;
// $datos[15]=$total_venta ;
// $datos[16]=$fecha_venta ;
// $datos[17]=$numFactura ;
		
		
		$paginadetalle=buscar_detalles_venta_en_cuentas_a_cobrar($cod_venta,$cod_clienteFK);
		$controlventa=$cod_venta;
		
		$pagina.="<br><br>".$tituloClienteVenta."<table class='tableCabeceraRegistro' style='width:100%'>
<tr id='tbSelecRegistro'   >
<td class='td_registro' style='width:5%;'>
NRO FACT:&nbsp;&nbsp;".$datosVenta[17]."
</td>
<td class='td_registro' style='width:5%;'>
FECHA:&nbsp;&nbsp;".$datosVenta[16]."
</td>
<td class='td_registro' style='width:5%;'>
TOTAL VENTA:&nbsp;&nbsp;".number_format($datosVenta[15],'0',',','.')."
</td>
<td class='td_registro' style='width:5%;'>
PAGADO:&nbsp;&nbsp;".number_format($datosVenta[14],'0',',','.')."
</td>
<td class='td_registro' style='width:5%;'>
ESTADO:&nbsp;&nbsp;".$datosVenta[18]."
</td>
 </tr>
</table>
".$paginadetalle[1]."
<table class='tableCabeceraRegistro' style='width:100%'>
<tbody>
<tr>
<td class='td_registro' style='width:5%;'>
CUOTA
</td>
<td class='td_registro' style='width:5%;'>
VENC.
</td>
<td class='td_registro' style='width:5%;'>
D.A.
</td>
<td class='td_registro' style='width:5%;'>
MONTO
</td>
<td class='td_registro' style='width:5%;'>
INTERES
</td>
<td class='td_registro' style='width:5%;'>
PAGADO
</td>
<td class='td_registro' style='display:none'>
ULT. FECHA PAGO
</td>
<td class='td_registro' style='width:5%;'>
SALDO
</td>
</tr>
</tbody>
</table>";
	}


$deudaActua = ceil($deudaActua/1000)*1000;

$total_interes = ceil($total_interes/1000)*1000;

$deuda_Actual_interes = ceil($deuda_Actual_interes/1000)*1000;

$TotalSinInteres = ceil($TotalSinInteres/1000)*1000;
	
	$styleName=CargarStyleTable($styleName);
	
  $datetime2 = new DateTime($fechahoy);
    $datetime1 = new DateTime($fechapago);

    // Calcular la diferencia entre las fechas
    $interval = $datetime1->diff($datetime2);

    // Obtener el número de días de diferencia
    $dias = $interval->days;	
	

// $fech1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy))));	
// $fech2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	

// $diffecha=$fech1->diff($fech2);
    // $da=$diffecha->format('%a');

if($datetime2<=$datetime1){
	$dias=0;
}
	
	$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='2'>
<tr id='tbSelecRegistro' name='TablaCuentaGeneralCredito' >
<td id='td_id' style='display:none' >".$idcredito."</td>
<td id='' style='width:5%'>".$plazo."</td>
<td id='' style='width:5%'>".$fechapago."</td>
<td id='' style='width:5%'>".$dias."</td>
<td id='' style='width:5%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($totalPagoCredito,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($totalPagoInteres,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($deuda_Actual_interes,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalSinInteres,'0',',','.')."</td>
<td id='' style='display:none'>".$FechaUltimoPago2."</td>
<td id='' style='width:5%'>". number_format($deudaActua,'0',',','.')."</td>
</tr>
</table>";

	$totaldeudas=$totaldeudas+$deudaActua;
	$totalNeto= $totalNeto + $TotalSinInteres ;
	 $totalInteres= $totalInteres + $total_interes ;
	}	
	}
    }
	  
	  // $pagina.="<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
// <tr>
// <td id='' style='width:59%;text-align:left' ></td>
// <td id='' style='width:5%'>". number_format($totaldeudas,'0',',','.')."</td>
// </tr>
// </table>";
	
    }

 mysqli_close($mysqli);    
  $datos[0]=$pagina;
 $datos[1]=$totaldeudas;
 $datos[2]=$totalNeto;
  $datos[3]=$totalInteres;
  $datos[4]=$cod_venta;
 return $datos;
 
}








function modificarFechaPago($cod_venta,$iniciopago,$metodopago){
	$mysqli=conectar_al_servidor();
			
	$sql= "Select idcredito,Monto,descuento,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.Tipo='Pago Cuota'),0) as totalPago
	from credito cr
	where cr.cod_venta='$cod_venta'  and IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.Tipo='Pago Cuota'),0) < (Monto - descuento) ";
		
		
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
$F=0;
$fechaInicio=$iniciopago;

	$fecha = strtotime($iniciopago);
	$diacredito = date("d",$fecha);//dia
	$anhocredito = date("Y",$fecha);//AÑO
	$mescredito = date("m",$fecha) ;//mes
	if($mescredito=="13"){
		$mescredito ="01";
		}	
			
	$contarDias=UltimoDia($anhocredito,$mescredito);	


 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     $idcredito=$valor['idcredito'];
			 
			 if($metodopago=="Mensual")	{
			if($contarDias<$diacredito || $contarDias==""){
				
					if($F>=1){		
						$RestarF= $F -1 ; 
						$fecha = strtotime('+'.$RestarF." month",strtotime($fechaInicio));
						
						$fecha = strtotime('+'.$contarDias." day",strtotime(date("d-m-Y",$fecha)));
					}else{
						$fecha = strtotime('+ '.$contarDias." day",strtotime($fechaInicio));
					}
									
				
			}else{
				$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
				
			}
				$F=$F+1;
				
			$diacredito = date("d",$fecha);//dia
			$anhocredito = date("Y",$fecha);//AÑO
			$mescredito = date("m",$fecha) + 1;//mes
			if($mescredito=="13"){$mescredito ="01";}
			
			$contarDias=UltimoDia($anhocredito,$mescredito);
		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		}
	
	$fecha=date("Y-m-d H:i:s",$fecha);	 
			 
			 
			 
$consulta1="Update credito set fechapago='".$fecha."' where idcredito='".$idcredito."'";	

$stmt1 = $mysqli->prepare($consulta1);
		 

if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}		 
			 
			 
 }
 }
		
			 


			  mysqli_close($mysqli);
			 $informacion =array("1" => "exito" );
echo json_encode($informacion);	
exit;
		
}







function abmcreditorefin($plazo,$Monto,$fechapago,$descuento,$interes,$dias,$cod_venta,$idcredito,$operacion)
{

if($plazo==""  || $Monto=="" || $fechapago==""|| $cod_venta=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 



if($operacion=="nuevocreditorefin") 
{


$consulta1="Insert into credito (plazo,fechapago,cod_venta,Monto,descuento,Esado,Nro_recibo,interes,dias,deudaInteres)
values(?,?,?,?,?,'Pendiente','0',?,?,0)";

$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssss';
$stmt1->bind_param($ss,$plazo,$fechapago,$cod_venta,$Monto,$descuento,$interes,$dias);



}


if($operacion=="editarcreditorefin")
{

$consulta1="Update credito set plazo=?,fechapago=?,cod_venta=?,Monto=?,descuento=?,interes=?,dias=? where idcredito=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$plazo,$fechapago,$cod_venta,$Monto,$descuento,$interes,$dias,$idcredito);




}




if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
cambiarplazos($cod_venta);
 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

function editarestecredito($codCredito,$fechapago,$Monto,$descuento,$interes,$dias)
{

if($codCredito==""  || $Monto=="" || $fechapago=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 



$consulta1="Update credito set fechapago='$fechapago',Monto='$Monto',descuento='$descuento',interes='$interes',dias='$dias' where idcredito='$codCredito'";	


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

function RefinanciarCuotasRestantes($entrega,$cod_venta,$iniciopago,$nroCuota,$total,$Monto,$descuento,$interes,$dias,$metodopago){
	$mysqli=conectar_al_servidor();
			
	
	$sql= "Select idcredito,Monto,descuento,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.Tipo='Pago Cuota'),0) as totalPago
	from credito cr
	where cr.cod_venta='$cod_venta' ";
		
	cambiarestadorefinanciadoventa($cod_venta);
		
		
		if($descuento>0){
			$descuento=$descuento/$nroCuota;
		}else{
			$descuento=0;
		}
   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $F=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     $idcredito=$valor['idcredito'];
			  $totalPago=utf8_encode($valor['totalPago']);
			 $cuota=utf8_encode($valor['Monto']);
			  $descuentocuota=utf8_encode($valor['descuento']);
			if($totalPago<=0){
				eliminarestecreditos($idcredito);
			}else{
				if($cuota>$totalPago){
				$totalPago=$descuentocuota+$totalPago;
				 editarestacuota($idcredito,$totalPago);
				}
				
			}
	  
	  }
 }
		

		
		 $a=0;
			 $F=0;
			 $fechaInicio=$iniciopago;
		     $cantidad=$nroCuota;
				$pendiente=$total;
				
	$fecha = strtotime($iniciopago);
	$diacredito = date("d",$fecha);//dia
	$anhocredito = date("Y",$fecha);//AÑO
	$mescredito = date("m",$fecha) + 1;//mes
if($mescredito=="13"){$mescredito ="01";}	
			
	$contarDias=UltimoDia($anhocredito,$mescredito);			
			
			
			
if (!empty($entrega) && floatval($entrega) > 0) {
    $fechaEntrega = date('Y-m-d');
    
    insertarcuotas("ENTREGA", $fechaEntrega, $cod_venta, $entrega, "Pendiente", " ", 0, $dias, $interes, 0);
	$pendiente= $pendiente - $entrega;
}



				
 while ($a<$cantidad){
		if($metodopago=="Mensual")	{
			if($contarDias<$diacredito || $contarDias==""){
				
					if($F>=1){		
						$RestarF= $F -1 ; 
						$fecha = strtotime('+'.$RestarF." month",strtotime($fechaInicio));
						
						$fecha = strtotime('+'.$contarDias." day",strtotime(date("d-m-Y",$fecha)));
					}else{
						$fecha = strtotime('+ '.$contarDias." day",strtotime($fechaInicio));
					}
									
				
			}else{
				$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
				
			}
				$F=$F+1;
				
			$diacredito = date("d",$fecha);//dia
			$anhocredito = date("Y",$fecha);//AÑO
			$mescredito = date("m",$fecha) + 1;//mes
			if($mescredito=="13"){$mescredito ="01";}
			
			$contarDias=UltimoDia($anhocredito,$mescredito);
		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		}
	
	$fecha=date("Y-m-d H:i:s",$fecha);
	 if($pendiente>$Monto){
	$cuotaSobrante=$pendiente-$Monto;
	$cuotaSobrante=$pendiente-$cuotaSobrante;
	}else{
	$cuotaSobrante=$pendiente;
	}

	insertarcuotas(($a+1)."/".$nroCuota,$fecha, $cod_venta, $cuotaSobrante, "Pendiente"," ",$descuento,$dias,$interes, $cuotaSobrante);
	$pendiente=$pendiente-$cuotaSobrante;
	
				  $a++;
			 
			 }
			 
			 if($pendiente>0){
				 if($metodopago=="Mensual")	{
			$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
			$F=$F+1;
		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		}
		$fecha=date("Y-m-d H:i:s",$fecha);
			
				 insertarcuotas(($a+1)."/".($nroCuota+1),$fecha, $cod_venta, $pendiente, "Pendiente"," ",$descuento,$dias,$interes, $pendiente);
			 }
			 
			 
			 actualizarMetodo($cod_venta,$metodopago);
			 // cambiarplazos($cod_venta);
			  mysqli_close($mysqli);
			 $informacion =array("1" => "exito" );
echo json_encode($informacion);	
exit;
		
}

function eliminarestecreditos($idcredito){
		$mysqli=conectar_al_servidor();
			$consulta="delete from pago where  cod_creditoFK='$idcredito' ";	

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
echo $mysqli->error;
exit;
}

$consulta="delete from credito where  idcredito='$idcredito' ";	

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
echo $mysqli->error;
exit;
}
 mysqli_close($mysqli);
}


function editarestacuota($idcredito,$monto) {

	

	$mysqli=conectar_al_servidor();
$consulta1="update credito set Monto=?,totaldeuda=?,totalinteres=0 where idcredito=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$monto,$monto,$idcredito);
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);


}


function editarcuota($cod_venta,$idcredito,$fecha,$tipo,$descuento) {

	if($cod_venta==""  || $idcredito==""  || $fecha==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

if($tipo=="1"){
	$mysqli=conectar_al_servidor();
$consulta1="update credito set fechapago=?,descuento=? where idcredito=?";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$fecha,$descuento,$idcredito);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}
 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}else{
	
	cambiarfechas($cod_venta,$idcredito,$fecha);
	
}



}

function cambiarestadorefinanciadoventa($cod_venta) {

	if($cod_venta==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


	$mysqli=conectar_al_servidor();
$consulta1="update venta set estadorefinanciado='SI' where cod_venta='$cod_venta'";
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}
 mysqli_close($mysqli);
}


function eliminarcreditorefin($idcredito,$cod_venta) {

	if($idcredito==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
}


	$mysqli=conectar_al_servidor();
$consulta1="delete from credito where idcredito=?";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$idcredito);
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}
cambiarplazos($cod_venta);
 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

function cambiarfechas($cod_venta,$codcredito,$fecha){

	$mysqli=conectar_al_servidor();
	$sql= "Select idcredito,fechapago,
	(select TipoPago from venta where cod_venta=cr.cod_venta) as TipoPago
	from credito cr
	where cr.idcredito>='$codcredito' and cr.cod_venta='$cod_venta' ";
		
		
   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $F=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     $idcredito=$valor['idcredito'];
			  $fechapago=utf8_encode($valor['fechapago']);
			  $metodopago=utf8_encode($valor['TipoPago']);
			  
		 if($metodopago=="Mensual")	{
			$fecha = strtotime('+'.$F." month",strtotime($fecha));
			$F=$F+1;
		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fecha));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fecha));
			$F=$F+15;
		}
	 $fecha=date("Y-m-d H:i:s",$fecha);
		editarcuotafechas($idcredito,$fecha);	  
			  
			  
			  
	  }
 }
	 mysqli_close($mysqli);	
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

		
}

function editarcuotafechas($idcredito,$fecha) {



	$mysqli=conectar_al_servidor();
$consulta1="update credito set fechapago=? where idcredito=?";
$stmt1 = $mysqli->prepare($consulta1);
$stmt1->bind_param($ss,$fecha,$idcredito);
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);


}

function generarCuotas($cod_venta,$Monto,$metodopago,$iniciopago,$nroCuota,$interes,$dias,$entrega,$total){
	$nc=0;
	if($entrega>0){
		
			$cuota="1/".$nroCuota;
			
		$mysqli=conectar_al_servidor(); 
	$consulta="Insert into credito (plazo, 	fechapago, cod_venta, Monto, Esado,Nro_recibo,tipo,dias,interes , deudaInteres)
			values('$cuota',(select fecha_venta from venta where cod_venta='$cod_venta' limit 1),'$cod_venta','$entrega','Pendiente','0','ENTREGA','$dias','$interes',0)";		

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 mysqli_close($mysqli);	
	$nroCuota=$nroCuota-1;
		

	$nc=1;
	}
	 $a=0;
			 $F=0;
			 $fechaInicio=$iniciopago;
		     $cantidad=$nroCuota;
				$pendiente=$total;
				
			 while ($a<$cantidad){
		if($metodopago=="Mensual")	{
			$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
			$F=$F+1;
		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		}
	
	$fecha=date("Y-m-d H:i:s",$fecha);
	 if($pendiente>$Monto){
	$cuotaSobrante=$pendiente-$Monto;
	$cuotaSobrante=$pendiente-$cuotaSobrante;
	}else{
	$cuotaSobrante=$pendiente;
	}
	
	insertarcuotas(($nc+1)."/".$nroCuota,$fecha, $cod_venta, $cuotaSobrante, "Pendiente"," ",0,$dias,$interes,$cuotaSobrante);
	$pendiente=$pendiente-$cuotaSobrante;
	
				  $a++;
				  $nc++;
			 
			 }
			 
			 if($pendiente>0){
				 if($metodopago=="Mensual")	{
			$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
			$F=$F+1;
		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		}
		$fecha=date("Y-m-d H:i:s",$fecha);
				 insertarcuotas(($nc+1)."/".($nroCuota+1),$fecha, $cod_venta, $pendiente, "Pendiente"," ",0,$dias,$interes,$pendiente);
			 }
			 
			 
			 actualizarMetodo($cod_venta,$metodopago);
		 mysqli_close($mysqli);	 
			 $informacion =array("1" => "exito","2"=> $paginaticket);/*Retornamos una respuesta exito con el Array JSON si todo esta correcto al final de nuestra funcion*/
echo json_encode($informacion);	
exit;
	
	
}


function generarCuotasdesdeventa($idGaranteFk,$pagoentrega,$cod_venta,$Monto,$metodopago,$iniciopago,$nroCuota,$interes,$dias,$entrega){
	eliminarcreditos($cod_venta);
	$totalcuotas=$nroCuota;
	$observacion="";
	$cuotas="";
	 $a=0;
	 $F=0;
	 $nc=0;
	 
	if($entrega>0){
		
			$cuotas="Entrega";
			
		$mysqli=conectar_al_servidor(); 
	$consulta="Insert into credito (plazo, 	fechapago, cod_venta, Monto, Esado,Nro_recibo,tipo,dias,interes,total,totaldeuda,deudaInteres)
			values('$cuotas',(select fecha_venta from venta where cod_venta='$cod_venta' limit 1),'$cod_venta','$entrega','Pendiente','0','ENTREGA','$dias','$interes','$entrega','$entrega',0)";

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


 mysqli_close($mysqli);	
 
	 $observacion=" *Entrega :".$entrega." Gs.";
	}
	$nc=1;
			 $fechaInicio=$iniciopago;
		     $cantidad=$nroCuota;
			$pendiente=buscartotalventa($cod_venta);
			$pendiente=$pendiente-$entrega;
				
	$fecha = strtotime($iniciopago);

	$diacredito = date("d",$fecha);//dia
	$anhocredito = date("Y",$fecha);//AÑO
	$mescredito = date("m",$fecha)  +1 ;//mes
			if($mescredito=="13"){$mescredito ="01";}
			
	$contarDias=UltimoDia($anhocredito,$mescredito);				
				

	$consola="";	
				
 while ($a<$cantidad){
	 
	
		if($metodopago=="Mensual")	{
			
	
			
			if($contarDias<$diacredito || $contarDias==""){
				
					if($F>=1){		
						$RestarF= $F -1 ; 
						$fecha = strtotime('+'.$RestarF." month",strtotime($fechaInicio));
						
						$fecha = strtotime('+'.$contarDias." day",strtotime(date("d-m-Y",$fecha)));
					}else{
						$fecha =  strtotime($fechaInicio) ;
					}
									
				
			}else{
				$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
				
			}
				$F=$F+1;
			$diacredito = date("d",$fecha);//dia
			$anhocredito = date("Y",$fecha);//AÑO
			$mescredito = date("m",$fecha) +1 ;//mes
			if($mescredito=="13"){$mescredito ="01";}
			
			$contarDias=UltimoDia($anhocredito,$mescredito);		

		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		}
	
	$consola.= $mescredito."-" ;
	
	$fecha=date("Y-m-d H:i:s",$fecha);
	
	

	 if($pendiente>$Monto){
	$cuotaSobrante=$pendiente-$Monto;
	$cuotaSobrante=$pendiente-$cuotaSobrante;
	}else{
	$cuotaSobrante=$pendiente;
	}
	if(($a+1)>=$cantidad){
	$s=$pendiente-$cuotaSobrante;
	if($s>0){
		$cuotaSobrante=$cuotaSobrante+$s;
	}
	}
	insertarcuotas(($nc)."/".$totalcuotas,$fecha, $cod_venta, $cuotaSobrante, "Pendiente"," ",0,$dias,$interes,$cuotaSobrante);
	$pendiente=$pendiente-$cuotaSobrante;
	
				  $a++;
				  $nc++;
			 
			 }
			 
			 if($pendiente>0){
			if($metodopago=="Mensual")	{
				
			if($contarDias<$diacredito || $contarDias==""){
				
					if($F>=1){		
						$RestarF= $F -1 ; 
						$fecha = strtotime('+'.$RestarF." month",strtotime($fechaInicio));
						
						$fecha = strtotime('+'.$contarDias." day",strtotime(date("d-m-Y",$fecha)));
					}else{
						$fecha =  strtotime($fechaInicio) ;
					}
									
				
			}else{
				$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
				
			}
				$F=$F+1;
							
			
		   }
		   if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		   }
		  if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		   }
		$fecha=date("Y-m-d H:i:s",$fecha);
				 insertarcuotas(($nc+1)."/".($nroCuota+1),$fecha, $cod_venta, $pendiente, "Pendiente"," ",0,$dias,$interes,$pendiente);
			 }
// echo($consola);
// exit;			 

if($observacion!=""){
$observacion.=" *Cuotas: ".$nroCuota." X ".$Monto." Gs.";
}else{
$observacion=" *Cuotas: ".$nroCuota." X ".$Monto." Gs.";
}
editarDetallesVenta($cod_venta,$observacion);
		
actualizarMetodo($cod_venta,$metodopago);
actualizarGarante($cod_venta,$idGaranteFk);
$datos=buscardatoscuentacreditosventa($cod_venta); 
$idcredito=$datos[0];    
$plazo=$datos[1];  
$fechapago=$datos[2];          
$cod_venta=$datos[3];          
$Monto=$datos[4]; 
$totalPago=$datos[5]; 
$Esado=$datos[6] ;          
$Nro_recibo=$datos[7] ;
$TipoPago=$datos[8];
$nroCuota=$datos[9];
$dias=$datos[10];
$descuento=$datos[11] ;
$interes=$datos[12] ;
$entrega=$datos[13] ;


$datos=calcularintereses2($cod_venta,0,0,"2","2","2","no");
$totalEnDescuento=$datos[0];
$totalInteres=$datos[12];
$deuda=$datos[4];
$diasatrasado=$datos[5];
$acobrar=$datos[8];
$totalCredito=$datos[11];
$totalpagado=$datos[3];
if($totalCredito>0){
	$totalventa=$totalCredito;
}

$informacion =array("1" => "exito","15" => $plazo ,"16" => $fechapago 
,"23" => number_format($Monto,'0',',','.')  ,"18" => $Nro_recibo ,"19" => $nroCuota ,"20" => $dias
,"21" => number_format($interes,'2',',','.')  ,"22" => $TipoPago ,"17" =>number_format($entrega,'0',',','.'),
"24" =>number_format($totalInteres,'0',',','.'),"27" =>number_format($totalpagado,'0',',','.'),
"25" =>number_format($deuda,'0',',','.'),"26" =>$diasatrasado,"28"=>$cuotas);
echo json_encode($informacion);	
exit;
	
	
}





function UltimoDia($anho,$mes){
   if (((fmod($anho,4)==0) and (fmod($anho,100)!=0)) or (fmod($anho,400)==0)) {
       $dias_febrero = 29;
   } else {
       $dias_febrero = 28;
   }
   // echo($mes);
   switch($mes) {
       case 01: return 31; break;
       case 02: return $dias_febrero; break;
       case 03: return 31; break;
       case 04: return 30; break;
       case 05: return 31; break;
       case 06: return 30; break;
       case 07: return 31; break;
       case 10: return 31; break;
       case 11: return 30; break;
       case 12: return 31; break;
   }
   if($mes==8){
	   return 31;	   
   }
   
   if($mes==9){
	   return 30;	   
   }
}




function buscardatoscuentacreditosventa($buscar)
{
	

$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,vt.TipoPago,dias,cr.descuento,
cr.interes,cr.tipo , ifnull((select sum(Monto) from pago where cod_venta_fk=vt.cod_venta and Tipo='Pago Cuota'),0) as pagado , vt.total_venta, vt.fecha_venta ,vt.puntoexpedicion, vt.num_factura ,
 (select nombre from mora_cliente where cod_tipomora=idmora_cliente) as estado
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente cl on vt.cod_clienteFK=cl.cod_cliente
 where vt.cod_venta='$buscar'  order by  fechapago asc ";
 
$datos;
$idcredito = "";    
$plazo = "";  
$fechapago = "";          
$cod_venta ="";          
$Monto = "0"; 
$totalPago = "0"; 
$Esado = "";          
$Nro_recibo = "";
$TipoPago ="";
$nroCuota ="";
$dias ="10";
$interes ="0.01";
$descuento ="0";
$entrega ="0";
$nroCuotas ="0";
$pagado ="0";
$total_venta ="";
$fecha_venta ="";
$puntoexpedicion ="";
$num_factura ="";
$estado ="";

 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
if ($valor>0)
{
	$nroCuota=$valor;
while ($valor= mysqli_fetch_assoc($result))
{  

$tipo = utf8_encode($valor['tipo']); 

$pagado = utf8_encode($valor['pagado']); 
$total_venta = utf8_encode($valor['total_venta']); 
$fecha_venta = utf8_encode($valor['fecha_venta']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$num_factura = utf8_encode($valor['num_factura']); 
$estado = utf8_encode($valor['estado']); 

$numFactura=$num_factura;
if($puntoexpedicion!=""){
	$numFactura=$puntoexpedicion."-".$num_factura;
}

if($tipo!="ENTREGA"){
    
$idcredito = utf8_encode($valor['idcredito']);     
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$TipoPago = utf8_encode($valor['TipoPago']);
$dias = utf8_encode($valor['dias']);
$descuento = utf8_encode($valor['descuento']);
$interes = utf8_encode($valor['interes']);

}else{
	$entrega = utf8_encode($valor['Monto']);
}

$nroCuotas=$nroCuotas+1;
}
}

 mysqli_close($mysqli);
$datos[0]=$idcredito;    
$datos[1]=$plazo;  
$datos[2]=$fechapago;          
$datos[3]=$cod_venta;          
$datos[4]=$Monto; 
$datos[5]=$totalPago ; 
$datos[6]=$Esado ;          
$datos[7]=$Nro_recibo ;
$datos[8]=$TipoPago;
$datos[9]=$nroCuota;
$datos[10]=$dias;
$datos[11]=$descuento ;
$datos[12]=$interes ;
$datos[13]=$entrega ;

$datos[14]=$pagado ;
$datos[15]=$total_venta ;
$datos[16]=$fecha_venta ;
$datos[17]=$numFactura ;
$datos[18]=$estado ;
return $datos;

}

function buscartotalventa($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select (total_venta-descuento) as totalVenta from venta where cod_venta='$buscar'";
$totalVenta = 0;   
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



$totalVenta = utf8_encode($valor['totalVenta']);




}
}

return $totalVenta;
}



function refinanciarencambio($cod_venta,$metodopago,$iniciopago,$nroCuota,$total,$Monto,$dias,$interes){
	
	
	$mysqli=conectar_al_servidor();
	$sql= "Select idcredito,Monto,descuento,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.Tipo='Pago Cuota'),0) as totalPago
	from credito cr
	where cr.cod_venta='$cod_venta' ";
	
	$descuento=0;  
	
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $F=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     $idcredito=$valor['idcredito'];
			  $totalPago=utf8_encode($valor['totalPago']);
			 $cuota=utf8_encode($valor['Monto']);
			  $descuentocuota=utf8_encode($valor['descuento']);
			if($totalPago<=0){
				eliminarestecreditos($idcredito);
			}else{
				if($cuota>$totalPago){
				$totalPago=$descuentocuota+$totalPago;
				 editarestacuota($idcredito,$totalPago);
				}
				
			}
			  
			  
			  
	  }
 }
		

		
		 $a=0;
			 $F=0;
			 $fechaInicio=$iniciopago;
		     $cantidad=$nroCuota;
				$pendiente=$total;
				
			 while ($a<$cantidad){
		if($metodopago=="Mensual")	{
			$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
			$F=$F+1;
		}
		if($metodopago=="Semanal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+7;
		}
		if($metodopago=="Quincenal")	{
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			$F=$F+15;
		}
	
	$fecha=date("Y-m-d H:i:s",$fecha);
	 if($pendiente>$Monto){
	$cuotaSobrante=$pendiente-$Monto;
	$cuotaSobrante=$pendiente-$cuotaSobrante;
	}else{
	$cuotaSobrante=$pendiente;
	}
   if(($a+1)>=$cantidad){
	$s=$pendiente-$cuotaSobrante;
	if($s>0){
		$cuotaSobrante=$cuotaSobrante+$s;
	}
	}
	insertarcuotas(($a+1)."/".$nroCuota,$fecha, $cod_venta, $cuotaSobrante, "Pendiente"," ",$descuento,$dias,$interes, $cuotaSobrante);
	$pendiente=$pendiente-$cuotaSobrante;
	
				  $a++;
			 
			 }
			
			 
			 
			 actualizarMetodo($cod_venta,$metodopago);
			 cambiarplazos($cod_venta);
			  mysqli_close($mysqli);
			 $informacion =array("1" => "exito" );
echo json_encode($informacion);	
exit;
	
		
}


function cargarpagos($pagado,$cod_venta){
	$mysqli=conectar_al_servidor();
	$sql= "Select Monto,idcredito,fechapago,
	(select cod_cobradorFK from venta where cr.cod_venta=venta.cod_venta) as cod_cobradorFK,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago
	from credito cr
	where cr.cod_venta='$cod_venta' and IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) < Monto order by cr.idcredito asc";
		
		
   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
 /*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     $idcredito=$valor['idcredito'];
			  $Monto=utf8_encode($valor['Monto']);
			  $totalPago=utf8_encode($valor['totalPago']);
			  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
			  $fechapago=utf8_encode($valor['fechapago']);
			  $deuda=$Monto-$totalPago;
			 
				$c=1;
			 if($pagado<=0){
				  $c=0;
				  $pago=0;
			  }
			  $control=$pagado-$deuda;
			  if($control<=0){
				 $pago=$pagado;
				 $pagado=0;
			  }else{
				  $pago=$deuda;
				  $pagado=$pagado-$deuda;
			  }
			  
					if($pago>0 && $c==1){
						 cargarPagosDeudas($pago,$fechapago,$cod_cobradorFK,$idcredito,$cod_venta);
					}		 
 
	  }
 }
		
 mysqli_close($mysqli);

		
}

function  cargarPagosDeudas($Monto,$Fecha,$cod_cobradorFK,$cod_creditoFK,$cod_venta){
	  
	  
	 if($Monto!="0"){
	$mysqli=conectar_al_servidor();
	$consulta="Insert into pago (Monto,Fecha,cod_creditoFK,cod_cobradorFK,cod_venta_fk,comision,tipo) 
	values('$Monto','$Fecha','$cod_creditoFK','$cod_cobradorFK','$cod_venta',(select comision from venta where cod_venta='$cod_venta'),'Pago Cuota')";	
	$stmt = $mysqli->prepare($consulta);
	

if ( ! $stmt->execute()) {
   /*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);
		 }
}

function actualizarTotal($cod_venta,$total){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update venta set total_venta=? where cod_venta=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$total,$cod_venta); 

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
}


function actualizarEntrega($cod_venta,$entrega){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update venta set pago=? where cod_venta=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$entrega,$cod_venta); 

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
}


function eliminarcreditos($cod_venta){
		$mysqli=conectar_al_servidor();
			$consulta="delete from credito where  cod_venta='$cod_venta'";	
$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);
}

function eliminarpagos($cod_venta){
		$mysqli=conectar_al_servidor();
			$consulta="delete from pago where cod_venta_fk='$cod_venta' ";/*Sentencia para insertar registros*/		

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
 /*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);
}
	
function insertarcuotas($plazo, $fechapago, $cod_venta, $Monto, $Esado,$Nro_recibo,$descuento,$dias,$interes,$total){
		$mysqli=conectar_al_servidor();
			$consulta="Insert into credito (plazo, 	fechapago, cod_venta, Monto, Esado,Nro_recibo,dias,interes,total,descuento,deudaInteres)
			values('$plazo','$fechapago','$cod_venta','$Monto','$Esado','$Nro_recibo','$dias','$interes','$total','$descuento',0)";	
			
			
			

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 mysqli_close($mysqli);
}
	


function buscardatoscuenta($buscar)
{
	

$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,vt.TipoPago,dias,cr.descuento
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar' order by  fechapago asc ";
 

$idcredito = "";  
$plazo = "";  
$fechapago = "";          
$cod_venta ="";          
$Monto = "0"; 
$totalPago = "0"; 
$Esado = "";          
$Nro_recibo = "";
$TipoPago ="";
$nroCuota ="";
$dias ="";
$descuento ="0";
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
if ($valor>0)
{
	$nroCuota=$valor;
while ($valor= mysqli_fetch_assoc($result))
{  


if($idcredito==""){
$idcredito = utf8_encode($valor['idcredito']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 

$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$TipoPago = utf8_encode($valor['TipoPago']);
$dias = utf8_encode($valor['dias']);
$descuento = utf8_encode($valor['descuento']);
}


}
}

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $fechapago,"3" => number_format($Monto,'0',',','.')   ,"4" => $TipoPago,"5" => $nroCuota,"6" => $dias,"7" => number_format($descuento,'0',',','.'));
echo json_encode($informacion);	
exit;



}


/*Buscar Registro en detalle*/
function buscarcreditos($buscar,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select vt.cod_clienteFK,cr.plazo,cr.deudaInteres,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,cr.descuentoInteres,
datediff(cr.fechapago,'".$fechahoy."') as diff,vt.total_venta,interes,dias,vt.pago as entrega,
total,(totalinteres + deudaInteres) as totalinteres ,totaldeuda,cr.descuento,
(SELECT ci_cliente FROM cliente WHERE cod_cliente=vt.cod_clienteFK) as ci_cliente,
(SELECT direccion FROM persona WHERE cod_persona=vt.cod_clienteFK) as direccion,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona=vt.idGaranteFk) as garante,
(SELECT telefono FROM persona WHERE cod_persona=vt.idGaranteFk) as telefonogarante,
(SELECT nombre FROM zona WHERE idzona = (SELECT idzonaFk FROM cliente WHERE cod_cliente=vt.cod_clienteFK)) as zona,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito and Monto!='0' order by pg.Fecha desc limit 1),0) as FechaUltimoPago,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito  and Monto!='0' order by pg.Fecha asc limit 1),0) as FechaPagoCredito,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota' ),0) as totalPagoCuota,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Interes'),0) as totalPagoInteres,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='CARGO ADMINISTRATIVO'),0) as totalCA
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar'"; 



$pagina = "";  
$paginaextracto = "";  
$interes = "0";  
$diasatrazado = "0";  
$dias = "0";  
$totalPagado = "0";  
$total_venta = "0";  
$deuda = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$entrega = "0";  
$TotalCuotasPendientes = "0";   
$TotalInteresActual = "0";   
$MontoCuota = "0";   
$MontoCuotas = "0";   
$SubTotalAPagar = "0";  
$DeudaPendiente = "0";  
$TotalAPagar = "0";  
$TotalPagoEnInteres = "0";  
$TotalApagarSinInteres = "0";  
$nrodecuotasatrazado = "0";  
$TotalInteresApagar="0";
$diff2="0";
$cod_venta = '';
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$ContadorCuota=0;

	$nombreClienteImprimir="";
	$NroVentaClienteImprimir="";
	$DetalleVentaClienteImprimir="";
	$TipoVentaClienteImprimir="";
	$FechaClienteImprimir="";
	
	$ZonaClienteImprimir = '';
	$DireccionClienteImprimir = '';
	$DocumentoClienteImprimir = '';
	$GaranteClienteImprimir = '';
	$TelefonoGaranteImprimir = '';
	$TelefonoClienteImprimir = '';
	$CobradorClienteImprimir = '';
$totaltotalDeuda = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$diff2="0";
$FechaUltimoPago = utf8_encode($valor['FechaUltimoPago']);
$garante = utf8_encode($valor['garante']);
$GaranteClienteImprimir = $garante;
$ci_cliente = utf8_encode($valor['ci_cliente']);
$DocumentoClienteImprimir = $ci_cliente;
$zona = utf8_encode($valor['zona']);
$ZonaClienteImprimir = $zona;
$idcredito = utf8_encode($valor['idcredito']);
$deudaInteres = utf8_encode($valor['deudaInteres']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); //TOTAL PAGO DEL CREDITO
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$FechaPagoCredito = utf8_encode($valor['FechaPagoCredito']);  
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$direccion = utf8_encode($valor['direccion']);
$DireccionClienteImprimir = $direccion;
$telefonocliente = utf8_encode($valor['telefono']);
$descuentoInteres = utf8_encode($valor['descuentoInteres']);
$TelefonoClienteImprimir = $telefonocliente;
$telefonogarante = utf8_encode($valor['telefonogarante']);
$TelefonoGaranteImprimir = $telefonogarante;
$descuento = utf8_encode($valor['descuento']);// TOTAL DESCUENTO
$nroCancelado = utf8_encode($valor['nroCancelado']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$totalPagoCredito = utf8_encode($valor['totalPagoCuota']);//TOTAL PAGADO DE CUOTAS
$totalPagoInteres = utf8_encode($valor['totalPagoInteres']);// TOTAL PAGADO DE INTERES
$totalCA = utf8_encode($valor['totalCA']);// TOTAL PAGADO DE cargo administrativo
$MontoConDescuento=$Monto-$descuento;//OBTENEMOS EL MONTO CON DESCUENTO
$totalDescuento=$totalDescuento+$descuento;//CALCULAMOS EL TOTAL DESCUENTO


$interes = $interes /30;
$interes =round($interes, 3);



/*CALCULAMOS EL SOBRANTE*/
$MontoSobrante=$Monto-$totalPagoCredito;
if($MontoCuotas==0){
$MontoCuotas=$Monto-$totalPagoCredito;
}
/*INICIALIZAMOS LAS VARIABLES*/
$deudaActua=0;
$total_interes=0;
$TotalSinInteres=0;
$deuda_Actual_interes=0;

$stylecolor=" ";
$event=" ";
//CONDICION PARA SABER SI ESE UN CREDITO CANCELDADO
if($nroCancelado==0){
	//CONDICION PARA SABER SI YA SE PAGO TODO
	if(($Monto+$totalPagoInteres+$totalCA)>($totalPago+$descuento)){
	//ESTADO DEL PAGO
	$Esado="Pendiente";
	
	$ContadorCuota=$ContadorCuota +1;
	if($ContadorCuota==1){
		$event="obtenerdatosabmpagos(this)";
	}else{
		$event="obtenerdatosabmpagosSinPermiso(this)";
	}
	
	
	//CALCULAMOS EL TOTAL SIN INTERES 
	$TotalSinInteres=$Monto-($totalPagoCredito+$descuento);	
	//CONDICION PARA SABER SI HAY DIAS ATRAZADOS
	if($diff<0){
	$diff=$diff*-1;
	editarDiasAtrazadosdesdecalcularcredito($cod_clienteFK,$diff);
	// actualizardiasatrazadocredito($idcredito,$diff);
	$stylecolor=" background-color: #df4444;color:#ffffff";
	}else{
	$diff=0;
    }
	$control=verificar_fecha_expiracion($fechapago);
	if($control=="si"){
	//CALCULAMOS EL NRO DE CUOTAS ATRAZADAS
	$nrodecuotasatrazado=$nrodecuotasatrazado+1;
	//CONDICION PARA SABER SI HAY INTERESES EN %
	if($interes!=0){
			/*CALCULAMOS EL DIA DE GRACIA*/
	$fechahoy=date('Y-m-d');	
	$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy)))); 
	$datetime3= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	$Fecha1=strtotime($FechaUltimoPago);
	$Fecha2=strtotime($fechapago);
	if($FechaPagoCredito=="0" ){
		$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	}else{
		if($Fecha1 < $Fecha2){
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));		
			}else{
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$FechaUltimoPago))));		
			}		
	}
	$interval=$datetime2->diff($datetime1);
    $diff=$interval->format('%a');
	
	/* $diff=$diff-1;
	if($diff<=0){
		$diff=0;
	} */
	
	$interval2=$datetime3->diff($datetime1);
    $diff2=$interval2->format('%a');
	
	/* $diff2=$diff2-1;
	if($diff2<=0){
		$diff2=0;
	} */
	
	$diasGracia=$diff2-$dias;
	if($diasGracia>0){
	//CALCULAMOS EL MONTO SOBRANTE
	$montoIn=$MontoConDescuento-$totalPagoCredito;	 
	/*CALCULAMOS EL INTERES*/  
	$i=($interes*($Monto - $totalPagoCredito))/100; //   	aca modifique para que me salga bien el interes
	$total_interes=($i*$diff);
	$total_interes = ceil($total_interes / 1000) * 1000;
	//CALCUMOS EL TOTAL A PAGAR
	$total=$montoIn+$total_interes;
	$deudaActua=$montoIn+$total_interes;
	//CARGAMOS EL TOTAL DEUDA SIN INTERES
	$deuda_Actual_interes=$total_interes;	
	actualizarTotalCuota($idcredito,$total,$total_interes,$total);	
	
	
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
    actualizarTotalCuota($idcredito,$total,0,$MontoConDescuento);
	
	}	
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	 actualizarTotalCuota($idcredito,$total,0,$MontoConDescuento);
			
	}
			
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	 actualizarTotalCuota($idcredito,$total,0,$MontoConDescuento);
	
	}
	
	
	
	$DeudaPendiente=$DeudaPendiente+$deudaActua;
	// $event="obtenerdatosabmpagos(this)";
	
	}else{
	$Esado="Pagado";
	$stylecolor="background-color: #4caf50;color:#ffffff";
	$deudaActua=0;
	$total=0;
	$diff=0;
	$event="obtenerdatosabmpagosopciones(this)";
	}
	
	
	
	}else{
	
	
	if(($MontoConDescuento+$tinteres)>$totalPago){
	 $Esado="Pendiente";
	 $diff="0";
     $deudaActua=($MontoConDescuento+$tinteres)-$totalPago;
	 $total=$MontoConDescuento-$totalPago;
	 $stylecolor="text-decoration: line-through;";
	
	}else{
	$Esado="Pagado";
	$stylecolor="background-color: #4caf50;color:#ffffff";
	$deudaActua=0;
	$diff=0;
	$total=0;
	}
    	
	
}


	$monto_restante = 0;
	if($descuentoInteres > 0){
		if($descuentoInteres >= $total_interes){
			$monto_restante = $descuentoInteres - $total_interes;
			$total_interes = 0;
			
			if($deudaInteres > 0){
				$deudaInteres -= $monto_restante;
			}
		}else if($descuentoInteres < $total_interes){
			$total_interes -= $descuentoInteres;
		}
	} 
 
$totalInteres=$totalInteres+$totalPagoInteres+$total_interes;
$TotalInteresActual=$TotalInteresActual+$total_interes;
// $deuda=$deuda+$deudaActua;
$diasatrazado=$diasatrazado+$diff;
$totalPagado=$totalPagado+$totalPago;
$styleName="tableRegistroSearch";


//                                                                                        Este agregue yo ahora  y tambien agregue en el td
$DeudaInteres= $total_interes + $deudaInteres;



if($DeudaInteres<=0){
	$DeudaInteres=0;
}
$TotalDeuda=$DeudaInteres+ $TotalSinInteres;
$deuda=$deuda+$TotalDeuda;
$DeudaInteres = ceil($DeudaInteres/1000)*1000;


$TotalInteresApagar = $TotalInteresApagar + $DeudaInteres;
$TotalInteresApagar = ceil($TotalInteresApagar/1000)*1000;
$styleName=CargarStyleTable($styleName);
$nueva_fecha = date("d-m-Y", strtotime($fechapago));


$TotalDeuda = ceil($TotalDeuda/1000)*1000;
$totalPagoInteres = ceil($totalPagoInteres/1000)*1000;

// $DeudaInteres = ceil($DeudaInteres/1000)*1000;


$checkbox = '';
if($TotalDeuda > 0){
	$checkbox = "<span><input type='checkbox' onclick='obtenerTotalCheckBox(this)' style='height:15px;width:15px;' id='$TotalDeuda' /></span>";
}

$cobrador = buscar_cobrador_asignado($cod_clienteFK);
$CobradorClienteImprimir = $cobrador;
$totaltotalDeuda += $TotalDeuda;
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='$event' style='$stylecolor'>
<td id='td_datos_1' style='display:none' >".$idcredito."</td>
<td id='td_datos_2' style='width:5%' >".$plazo."</td>
<td  id='td_datos_3'  style='display:none'>".$fechapago."</td>
<td style='width:5%'>".$nueva_fecha."</td>
<td id='td_datos_14' style='width:3%'>".$diff2."</td>
<td id='td_datos_15' style='width:3%'>".$diff."</td>
<td id='td_datos_5' style='width:5%'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_4' style='display:none'>".$cod_venta."</td>
<td id='td_datos_10' style='display:none'>". number_format($totalPago,'0',',','.')."</td>
<td id='td_datos_11' style='width:5%'>". number_format($total_interes,'0',',','.')."</td>
<td id='td_datos_12' style='width:5%'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($total,'0',',','.')."</td>
<td id='td_datos_13' style='width:5%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($totalPagoCredito,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($totalPagoInteres,'0',',','.')."</td>
<td id='td_datos_21' style='width:5%'>". number_format($totalCA,'0',',','.')."</td>
<td id='td_datos_33' style='width:5%'>". $checkbox."</td>
<td id='td_datos_20' style='width:5%'>". number_format($DeudaInteres,'0',',','.')."</td>
<td id='td_datos_22' style='width:5%'>". number_format($TotalSinInteres,'0',',','.')."</td>
<td id='td_datos_6' style='width:5%'>". number_format($TotalDeuda,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($descuentoInteres,'0',',','.')."</td>
<td id='td_datos_7' style='width:5%'>".$Esado."</td>
<td id='td_datos_8' style='display:none'>".$Nro_recibo."</td>
<td id='td_datos_9' style='display:none'>".$diff."</td>
</tr>
</table>
";
$paginaextracto.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:3%' >".$plazo."</td>
<td id='' style='width:10%'>".$nueva_fecha."</td>
<td id='' style='width:5%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='width:5%'>".$diff."</td>
<td id='' style='width:5%'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($total,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($totalPago,'0',',','.')."</td>
<td   style='width:10%'>".date("d-m-Y", strtotime($fechapago))."</td>
<td id='' style='width:10%'>". number_format($TotalDeuda,'0',',','.')."</td>
<td id='' style='width:5%'>".$cobrador."</td>
<td id='' style='width:5%'>".$Esado."</td>
<td id='' style='width:5%'>".$ci_cliente."</td>
<td id='' style='width:10%'>".$zona."</td>
</tr>
</table>
";

}

if($DeudaPendiente==0){
	$SubTotalAPagar=$MontoCuotas;
	$MontoCuota=$MontoCuotas;
	$DeudaPendiente=$MontoCuotas;
}


}




$DatosImprimir = BuscarDetalleVentaCredito($cod_venta);


	$nombreClienteImprimir=$DatosImprimir[0];
	$NroVentaClienteImprimir=$DatosImprimir[1];
	$DetalleVentaClienteImprimir=$DatosImprimir[2];
	$TipoVentaClienteImprimir=$DatosImprimir[3];
	$FechaClienteImprimir=$DatosImprimir[4];

$deuda = ceil($deuda / 1000) * 1000;	

 mysqli_close($mysqli);    
$informacion =array("1" => "exito","2" => $pagina,"12" => $paginaextracto,"3" =>number_format($totalPagado,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($interes,'2',',','.'),"6" =>$dias, "7" =>number_format($TotalInteresApagar,'0',',','.')
, "9" => number_format($entrega,'0',',','.'),"8" => $diasatrazado, "11" => number_format($totalDescuento,'0',',','.')
, "13" => number_format($SubTotalAPagar,'0',',','.'),"14" => number_format($TotalCuotasPendientes,'0',',','.') ,
"15" => number_format($MontoCuota,'0',',','.'),"16" => number_format($totalInteres,'0',',','.') 
,"17" => number_format($DeudaPendiente,'0',',','.') ,"18" => number_format($TotalInteresActual,'0',',','.'),"19" => number_format($TotalPagoEnInteres,'0',',','.') ,"20" => $nombreClienteImprimir ,"21" => $NroVentaClienteImprimir ,"22" => $DetalleVentaClienteImprimir ,"23" => $TipoVentaClienteImprimir ,"24" => $FechaClienteImprimir,"25"=>$ZonaClienteImprimir,"26"=>$DireccionClienteImprimir,"27"=>$DocumentoClienteImprimir,"28"=>$GaranteClienteImprimir,"29"=>$TelefonoGaranteImprimir,"30"=>$CobradorClienteImprimir, "31"=>$TelefonoClienteImprimir);
echo json_encode($informacion);	
exit;
}

function buscar_cobrador_asignado($cod_cliente){
	$mysqli=conectar_al_servidor();	
	 
$sql= "SELECT nombre_persona as cobrador FROM persona WHERE cod_persona = (SELECT cod_cobradorFK FROM zona WHERE idzona = (SELECT idzonaFk FROM cliente WHERE cod_cliente = '$cod_cliente'))";
 
 // echo($sql);
 // exit;

   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
$cobrador = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		$cobrador=utf8_encode($valor['cobrador']);
		

	  }
 }
	
 return $cobrador;
}




function BuscarDetalleVentaCredito($cod_venta){
	$mysqli=conectar_al_servidor();	
	 
$sql= "Select  (select concat(nombre_persona,' ',apellido_persona) from persona where cod_clienteFK=cod_persona) as nombreCliente ,
 TipoVenta , puntoexpedicion , num_factura , fecha_venta , nombre_producto , cantidad_detalle , d.precio_producto, subtotal from venta
 inner join detalle_venta d on cod_venta=cod_ventaFK 
 inner join producto on cod_producto=cod_productoFK  where  cod_venta='".$cod_venta."'";
 
 // echo($sql);
 // exit;

   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $contador=0;
 $pagina="";
	$nombreClienteImprimir="";
	$NroVentaClienteImprimir="";
	$DetalleVentaClienteImprimir="";
	$TipoVentaClienteImprimir="";
	$FechaClienteImprimir="";
	
	$styleName="tableRegistroSearch";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		$nombreClienteImprimir=utf8_encode($valor['nombreCliente']);
		$TipoVentaClienteImprimir=utf8_encode($valor['TipoVenta']);
		$FechaClienteImprimir=utf8_encode($valor['fecha_venta']);
		
		$puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
		$num_factura=utf8_encode($valor['num_factura']);
		
		$nombre_producto=utf8_encode($valor['nombre_producto']);
		$cantidad_detalle=utf8_encode($valor['cantidad_detalle']);
		$precio_producto=utf8_encode($valor['precio_producto']);
		$subtotal=utf8_encode($valor['subtotal']);
		
		if($puntoexpedicion!=""){
			$NroVentaClienteImprimir = $puntoexpedicion."-".$num_factura;
		}else{
			$NroVentaClienteImprimir =  $num_factura;
		}
		$styleName=CargarStyleTable($styleName);
		 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td id='td_datos_2' style='width:10%' >".$nombre_producto."</td>
<td id='td_datos_3' style='width:10%'>".number_format($precio_producto,'0',',','.')."</td>
<td id='td_datos_5' style='width:10%'>". $cantidad_detalle."</td>
<td id='td_datos_4' style='width:10%'>".number_format($subtotal,'0',',','.')."</td>
</tr>
</table>
";

	  }
 }
 
	$datos[0]=$nombreClienteImprimir ;
	$datos[1]=$NroVentaClienteImprimir ;
	$datos[2]=$pagina ;
	$datos[3]=$TipoVentaClienteImprimir ;
	$datos[4]=$FechaClienteImprimir ;
	
 return $datos;

}



/*Buscar Registro en detalle*/
function buscarcreditoseditar($buscar,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.total_venta,interes,dias,vt.pago as entrega,
total,totalinteres,totaldeuda,cr.descuento,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar' ";

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
$controlStyle="";
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idcredito = utf8_encode($valor['idcredito']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$descuento = utf8_encode($valor['descuento']);
$nroCancelado = utf8_encode($valor['nroCancelado']);

$enabled="";
if($totalPago>0){
	$enabled=" disabled";
}
$styleName=CargarStyleTable($styleName);
$filas[]=array(
	"id_credito"=>$idcredito,
	"plazo"=>$plazo,
	"fecha_pago"=>$fechapago,
	"monto"=>number_format($Monto,'0',',','.'),
	"descuento"=>number_format($descuento,'0',',','.'),
	"dias"=>$dias,
	"interes"=>number_format($interes,'2',',','.'),
	"deshabilitado"=>$totalPago>0,
	"clase_fila"=>$styleName
);
if(!$devolverArray){
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr  >
<td  style='width:10%' >".$plazo."</td>
<td  style='width:20%'><input id='inptDate_$idcredito' type='date' value='$fechapago' class='inputText'  ".$enabled." /></td>
<td  style='width:20%'><input name='inptMontoCreditoEditar' id='inptMonto_$idcredito' type='text' value='". number_format($Monto,'0',',','.')."' class='inputText' onkeyup='separadordemiles(this)' ".$enabled." /></td>
<td  style='width:20%'><input name='inptDescuentoCreditoEditar' id='inptDescuento_$idcredito' type='text' value='". number_format($descuento,'0',',','.')."' class='inputText'  onkeyup='separadordemiles(this)' /></td>
<td  style='width:10%'><input id='inptDias_$idcredito' type='text' value='".$dias."' class='inputText'  /></td>
<td  style='width:10%'><input id='inptInteres_$idcredito' type='text' value='".number_format($interes,'2',',','.')."' class='inputText'  /></td>
<td  style='width:10%' ><input type='Button'  value='Guardar' class='btn4' id='$idcredito' onclick='EditarEsteCredito(this)' style='background-color: #2196F3;'  /></td>
</tr>
</table>
";
}

}
}

 mysqli_close($mysqli);    
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}

/*Buscar Registro en detalle*/
function buscar_solicitar_descuento_credito($buscar,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.total_venta,interes,dias,vt.pago as entrega,cr.descuento,total,totalinteres,totaldeuda,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and Tipo='Pago Cuota'),0) as totalPago
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar' ";


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
$controlStyle="";
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idcredito = utf8_encode($valor['idcredito']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$descuentoact = utf8_encode($valor['descuento']);
$descuento = total_sumatoria_descuento_credito_solicitado($idcredito);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$motivo = '';


$tinteres = ceil($tinteres / 1000) * 1000;

$enabled="";

$style='';
$btnSolicitar = "<input type='Button'  value='Solicitar' class='btn4' id='$idcredito' onclick='SolicitarDescuentoEsteCredito(this)' style='background-color: #4CAF50;'  />";
if($totalPago  >= $Monto  ){
	$enabled = " disabled";
	$style = "style='background-color:#d0d0d0'";
}


if(( $Monto - $descuento)  == $totalPago ){
	$enabled=" disabled";
	$btnSolicitar = "";
	$style = "style='background-color:#d0d0d0'";
}

$btnHistorial = "<input type='Button'  value='Historial' class='btn4' id='$idcredito' onclick='verCerrarVentanaHistorialDescuentoCredito(this)' style='background-color: #2196f3;'  />";

$StyleImput="style='width: 100%;'";
$styleName=CargarStyleTable($styleName);
$filas[]=array(
	"id_credito"=>$idcredito,
	"plazo"=>$plazo,
	"fecha_pago"=>$fechapago,
	"monto"=>number_format($Monto,'0',',','.'),
	"total_pagado"=>number_format($totalPago,'0',',','.'),
	"descuento_actual"=>number_format($descuentoact,'0',',','.'),
	"total_interes"=>number_format($tinteres,'0',',','.'),
	"descuento_solicitado"=>number_format($descuento,'0',',','.'),
	"motivo"=>$motivo,
	"deshabilitado"=>$enabled!=="",
	"mostrar_solicitar"=>$btnSolicitar!=="",
	"clase_fila"=>$styleName
);
if(!$devolverArray){
$pagina.="
<table class='$styleName' $style border='1' cellspacing='1' cellpadding='5'>
<tr  >
<td  style='width:10%' > <span id='inptPlazoCuotaSolicDescuentoCredito_$idcredito'> ".$plazo."</span></td>
<td  style='width:10%'>
<input id='inptFechaPagoCuotaSolicDescuentoCredito_$idcredito' type='date' value='$fechapago' class='inputText'  disabled />
</td>
<td  style='width:10%'>
<input $StyleImput name='inptMontoCuotaSolicDescuentoCredito' id='inptMontoCuotaSolicDescuentoCredito_$idcredito' type='text' value='". number_format($Monto,'0',',','.')."' class='inputTextDisable' onkeyup='separadordemiles(this)' disabled />
</td>
<td  style='width:10%;text-align: center;'>
<input $StyleImput name='inptMontoPagadoSolicDescuentoCredito' id='inptMontoPagadoSolicDescuentoCredito_$idcredito' type='text' value='".number_format($totalPago,'0',',','.')."' class='inputTextDisable' onkeyup='separadordemiles(this)' disabled />
</td>
<td  style='width:10%;'>". number_format($descuentoact,'0',',','.')."</td>
<td  style='width:10%;text-align: center;'>
".number_format($tinteres,'0',',','.')."
</td>
<td  style='width:10%;'>". number_format($descuento,'0',',','.')."</td>
<td  style='width:30%;display:none'>
<input $StyleImput name='inptMotivoSolicitudDescuentoCredito' value='$motivo' id='inptMotivoSolicitudDescuentoCredito_$idcredito' type='text' value='' class='inputText' ".$enabled." />
</td>
<td  style='width:10%' >".$btnSolicitar.$btnHistorial."</td>
</tr>
</table>
";
}

}
}

 mysqli_close($mysqli);    
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}

function total_sumatoria_descuento_credito_solicitado($cod_credito)
{
$mysqli=conectar_al_servidor();
$sql= "SELECT IFNULL(sum(totalSolic),0) as total FROM solicituddescuentocredito where cod_creditoFK = '$cod_credito';";

$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$total = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$total = utf8_encode($valor['total']);

}
}

 mysqli_close($mysqli);    
return $total;
}


/*Buscar Registro en detalle*/
//NO UTILIZADO VERIFICAR 
function buscarcreditoenrenfi($buscar,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.total_venta,interes,dias,vt.pago as entrega,vt.TipoPago,
total,totalinteres,totaldeuda,cr.descuento,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar' ";
 
$pagina = "";  
$interes = "0";  
$diasatrazado = "0";  
$dias = "0";  
$totalPagado = "0";  
$total_venta = "0";  
$deuda = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$entrega = "0";  
$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
/*Función para ejecutar sentencias sql*/
if ( ! $stmt->execute()) {
/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
$controlStyle="";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$idcredito = utf8_encode($valor['idcredito']);/*Obtenemos el registro mediante el nombre del atributo */      
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$TipoPago = utf8_encode($valor['TipoPago']);
$descuento = utf8_encode($valor['descuento']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$totalDescuento=$totalDescuento+$descuento;
$submonto=$Monto-$descuento;
$deudaActua=0;
$total_interes=$tinteres;
$totalPagado=$totalPagado+$totalPago;
$stylecolor=" ";
$styleName="tableRegistroSearch";

if($nroCancelado==0){
if(($submonto+$tinteres)>$totalPago){

if($diff<0){
	$diff=$diff*-1;
	
}else{
		$diff=0;
}

	
	$Esado="Pendiente";

if($totalPago>0){
$event="obtenerDatosCreditosRefinEditar(this)";

	}else{
		
$event="obtenerDatosCreditosRefinanciacion(this)";
		}

if($Esado=="Pendiente"){
$control=verificar_fecha_expiracion($fechapago);
	if($control=="si"){
					
			
				$fechahoy=date('Y-m-d');	
				$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy))));
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));
				$interval=$datetime2->diff($datetime1);

		$diff=$interval->format('%a');
	$diasGracia=$diff-$dias;
	
			   if($diasGracia>0){
				    if($interes!=0){
				  
			    $montoIn=$Monto-$totalPago;
			  $i=($interes*($Monto))/100;
			 
			  $total_interes=($i*$diff);
			  $t=($submonto)+$total_interes;
			  $totalInteres=$totalInteres+$total_interes;
			  $total=$t;
		    $deudaActua=$t-$totalPago;
			actualizarTotalCuota($idcredito,$total,$total_interes,$t);
					}else{
						//ejecuta cuando no tiene interes
						 $interes=0;
						$deudaActua=$submonto-$totalPago;
						 $total=$submonto-$totalPago;
					actualizarTotalCuota($idcredito,$total,0,$submonto);
					}
			   }else{
				      $interes=0;
                    $total=$submonto-$totalPago;
					$deudaActua=$total;
					actualizarTotalCuota($idcredito,$total,0,$submonto);
					 $diff="0";
				 
			   }
				}else{
					$interes=0;
                    $total=$submonto-$totalPago;
					$deudaActua=$total;
					actualizarTotalCuota($idcredito,$total,0,$submonto);
				}
}else{
	
}

}else{
	$event="obtenerPagosCreditosRefinanciacion(this)";
	$stylecolor="background-color: #ccc;color:#000";
	$Esado="Pagado";
	$deudaActua=0;
	$diff=0;
}

}else{
	if(($submonto+$tinteres)>$totalPago){

	 $diff="0";
	
	 $deudaActua=($submonto+$tinteres)-$totalPago;
	 $total=$submonto-$totalPago;
	 $stylecolor="text-decoration: line-through;";
	 if($totalPago>0){
$event="obtenerDatosCreditosRefinEditar(this)";

	}else{
		
$event="obtenerDatosCreditosRefinanciacion(this)";
		}
	}else{
		$Esado="Pagado";
	$stylecolor="background-color: #ccc;color:#000";
	$deudaActua=0;
	$diff=0;
	$event="obtenerPagosCreditosRefinanciacion(this)";
	}
	$event="";
}

$deuda=$deuda+$deudaActua;
$diasatrazado=$diasatrazado+$diff;

$styleName=CargarStyleTable($styleName);
$accion = "";
if($event==="obtenerDatosCreditosRefinEditar(this)"){
	$accion = "editar";
}elseif($event==="obtenerDatosCreditosRefinanciacion(this)"){
	$accion = "refinanciar";
}elseif($event==="obtenerPagosCreditosRefinanciacion(this)"){
	$accion = "pagos";
}
$estadoVisual = "normal";
if(strpos($stylecolor,"line-through")!==false){
	$estadoVisual = "cancelado";
}elseif(strpos($stylecolor,"background-color")!==false){
	$estadoVisual = "pagado";
}
$filas[] = array(
	"id_credito" => $idcredito,
	"plazo" => $plazo,
	"fecha_pago" => $fechapago,
	"monto" => number_format($Monto,'0',',','.'),
	"id_venta" => $cod_venta,
	"total_pago" => number_format($totalPago,'0',',','.'),
	"total_interes" => number_format($total_interes,'0',',','.'),
	"descuento" => number_format($descuento,'0',',','.'),
	"total" => number_format($total,'0',',','.'),
	"deuda_actual" => number_format($deudaActua,'0',',','.'),
	"estado" => $Esado,
	"numero_recibo" => $Nro_recibo,
	"dias_atraso" => $diff,
	"tipo_pago" => $TipoPago,
	"dias_gracia" => $dias,
	"interes" => number_format($interes,'2',',','.'),
	"accion" => $accion,
	"estado_visual" => $estadoVisual,
	"clase_fila" => $styleName
);
if(!$devolverArray){
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='$event' style='$stylecolor'>
<td id='td_datos_1' style='display:none' >".$idcredito."</td>
<td id='td_datos_2' style='width:10%' >".$plazo."</td>
<td id='td_datos_3' style='width:10%'>".$fechapago."</td>
<td id='td_datos_5' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_4' style='display:none'>".$cod_venta."</td>
<td id='td_datos_10' style='display:none'>". number_format($totalPago,'0',',','.')."</td>

<td id='td_datos_11' style='width:10%'>". number_format($total_interes,'0',',','.')."</td>
<td id='td_datos_12' style='width:10%'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($totalPago,'0',',','.')."</td>
<td id='td_datos_6' style='width:10%'>". number_format($deudaActua,'0',',','.')."</td>
<td id='td_datos_7' style='display:none'>".$Esado."</td>
<td id='td_datos_8' style='display:none'>".$Nro_recibo."</td>
<td id='td_datos_9' style='display:none'>".$diff."</td>
<td id='td_datos_13' style='display:none'>".$TipoPago."</td>
<td id='td_datos_15' style='display:none'>".$dias."</td>
<td id='td_datos_14' style='display:none'>".number_format($interes,'2',',','.')."</td>
</tr>
</table>
";


}
}
}
 mysqli_close($mysqli); 
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" =>number_format($totalPagado,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($interes,'2',',','.'),"6" =>$dias, "7" =>number_format($totalInteres,'0',',','.'), "9" => number_format($entrega,'0',',','.'),"8" => $diasatrazado, "11" => number_format($totalDescuento,'0',',','.'));
echo json_encode($informacion);	
exit;
}

/*Buscar Registro en detalle*/
function buscarcreditoshistorialventa($buscar,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,vt.total_venta,interes,dias,vt.pago as entrega,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar' ";
 $pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
$interes = "0";  
$diasatrazado = "0";  
$dias = "0";  
$totalPagado = "0";  
$total_venta = "0";  
$deuda = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$entrega = "0";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$idcredito = utf8_encode($valor['idcredito']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$entrega = utf8_encode($valor['entrega']);
$fechapagado = utf8_encode($valor['fechapagado']);
$nroCancelado = utf8_encode($valor['nroCancelado']);

$datos=calcularintereses2($idcredito,0,0,"2","2","1","no");
$descuento=$datos[0];
$total_interes=$datos[1];
$total=$datos[2];
$totalPago=$datos[3];
$deudaActua=$datos[4];
$TotalDiasAtrasado=$datos[5];
//$datos[6]=$nrodecuotasatrazado;
//$datos[7]=$TotalApagarSinInteres;
//$datos[8]=$DeudaPendiente;
$stylecolor=$datos[9];
$totalDescuento=$totalDescuento+$descuento;
$totalPagado=$totalPagado+$totalPago;

$deuda=$deuda+$deudaActua;
$diasatrazado=$diasatrazado+$TotalDiasAtrasado;


$fechapago = date("d-m-Y", strtotime($fechapago));
if($fechapagado!=""){
	$fechapagado = date("d-m-Y", strtotime($fechapagado));
}


$total_interes = ceil($total_interes/1000)*1000;
$total = ceil($total/1000)*1000;
$deudaActua = ceil($deudaActua/1000)*1000;


$styleName=CargarStyleTable($styleName);
$estadoVisual="normal";
if(strpos($stylecolor,"line-through")!==false){
	$estadoVisual="cancelado";
}elseif(strpos($stylecolor,"background-color")!==false){
	$estadoVisual="resaltado";
}
$filas[]=array(
	"plazo"=>$plazo,
	"fecha_vencimiento"=>$fechapago,
	"fecha_pago"=>$fechapagado,
	"monto"=>number_format($Monto,'0',',','.'),
	"descuento"=>number_format($descuento,'0',',','.'),
	"id_venta"=>$cod_venta,
	"total_pagado"=>number_format($totalPago,'0',',','.'),
	"total_interes"=>number_format($total_interes,'0',',','.'),
	"total"=>number_format($total,'0',',','.'),
	"deuda_actual"=>number_format($deudaActua,'0',',','.'),
	"estado_visual"=>$estadoVisual,
	"clase_fila"=>$styleName
);
if(!$devolverArray){
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' style='".$stylecolor."' >
<td id='' style='width:10%' >".$plazo."</td>
<td id='' style='width:10%'>".$fechapago."</td>
<td id='' style='width:10%'>".$fechapagado."</td>
<td id='' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='display:none'>".$cod_venta."</td>
<td id='' style='display:none'>". number_format($totalPago,'0',',','.')."</td>
<td id='td_datos_1' style='width:10%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($deudaActua,'0',',','.')."</td>
</tr>
</table>
";
}


}
}
$deuda=$total_venta-($totalPagado+$entrega);
 mysqli_close($mysqli);    
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" =>number_format($totalPagado,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($interes,'2',',','.'),"6" =>$dias, "7" =>number_format($totalInteres,'0',',','.'), "9" => number_format($entrega,'0',',','.'),"8" => $diasatrazado);
echo json_encode($informacion);	
exit;
}



function cuentasacobrardetallado($tipo_cliente,$zona,$cliente,$fecha,$cod_cobrador,$cod_local,$array_cod_tipo_cliente,$datos)
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');


$condicionZona=" ";
	if($zona!=""){
	$condicionZona=" and (Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK ) ='$zona' ";
	}

$condiciontipo_cliente="";
if($tipo_cliente!=""){
$condiciontipo_cliente=" and (Select tipo_cliente from cliente where cod_cliente=cod_clienteFK limit 1)= '".$tipo_cliente."'";		
}
	
$condicionCodLocal=""; 
if($cod_local!=""){
$condicionCodLocal=" and vt.cod_local='$cod_local' ";
 }
 
$condicioncobrador="";
if($cod_cobrador!=""){
 $condicioncobrador=" and z.cod_cobradorFK = '$cod_cobrador'";
}


$condicioncliente=" ";
	if($cliente!=""){
	 $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%".$cliente."%' ";
}

$condicionFiltro=" and cr.fechapago <= '$fecha'";

$condicionIn= "";
$contador = 0;
foreach ($array_cod_tipo_cliente as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}
 
$condiciontipo="";
if($contador!=0){
	$condiciontipo=" and c.cod_tipomora in ($condicionIn)";
}

$condiciondatos = "";
if($datos == "1"){
	$condiciondatos = " and ( (COALESCE(tipo_estado, 0) != 12) and (COALESCE(tipo_estado, 0) != 14)   and  (COALESCE(vt.codmoracliente, 0) != 13)) ";
}
if($datos == "2"){
	$condiciondatos = " and ((COALESCE(tipo_estado, 0) = 12)  or (COALESCE(tipo_estado, 0) = 14) or  (COALESCE(vt.codmoracliente, 0) = 13))  ";
}

if($datos == "3"){
	$condiciondatos = " and (COALESCE(vt.codmoracliente, 0) = 13) ";
}

if($datos == "4"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 12) ";
}

if($datos == "5"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 14) ";
}

// $condiciondatos = "";
// if($datos == "1"){
	// $condiciondatos = " and tipo_estado not in (12 , 13 , 14 , 15) ";
// }
// if($datos == "2"){
	// $condiciondatos = " and tipo_estado in (12 , 13 , 14 , 15) ";
// }

// if($datos == "3"){
	// $condiciondatos = " and tipo_estado = '13' ";
// }

// if($datos == "4"){
	// $condiciondatos = " and tipo_estado = '12' ";
// }

// if($datos == "5"){
	// $condiciondatos = " and tipo_estado = '14' ";
// }


	$sql= "select  (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,vt.cod_clienteFK,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
IFNULL((Select referencias from referenciascliente rf where rf.cod_clienteFk=vt.cod_clienteFK order by idreferenciascliente desc limit 1),'') as referencia,vt.codmoracliente,
 (Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cr.cod_venta)) as nombrezona,
(Select direccion from persona where cod_persona=vt.cod_clienteFK) as direccion,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado  
 from  credito cr 
 inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente c on vt.cod_clienteFK = c.cod_cliente
 inner join zona z on z.idzona = c.idzonaFk
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionZona.$condicionFiltro.$condiciontipo.$condicioncobrador.$condicionCodLocal.$condicioncliente.$condiciondatos.$condiciontipo_cliente." group by vt.cod_clienteFK  order by (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) asc  ,  cod_clienteFK asc limit 50";


// echo $sql;
// exit;

$MiCondicion="";
 
$pagina = "";  
$filas = array();
$devolverArray = strtolower($formato)==="json";
$totalPagado = "0";  
$deuda = "0";  
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
$detallesventa="";
$totaldeudas="0";
$totalNeto="0";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$referencia = utf8_encode($valor['referencia']);
$documento = utf8_encode($valor['documento']);
$clientenombre = utf8_encode($valor['clientenombre']);
$direccion = utf8_encode($valor['direccion']);
$nombrezona = utf8_encode($valor['nombrezona']);
$telefono = utf8_encode($valor['telefono']);
$telefono = utf8_encode($valor['telefono']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$tipo_estado = utf8_encode($valor['tipo_estado']);
$codmoracliente = utf8_encode($valor['codmoracliente']);

$p_tipo = '';
if($tipo_estado != '0'){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}else if($tipo_estado == '0' && $codmoracliente != ''){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($codmoracliente);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}

$referenciaCliente=buscarReferenciaCliente($cod_clienteFK);
$tituloClienteVenta="<table class='tableCabeceraRegistro' id='$cod_clienteFK' onclick='obtenerdatosagendarcliente(this)'>
<tbody>
<tr >
<td class='td_registro' style='width:10%;'><b>DOCUMENTO:</b> <br>".$documento."</td>
<td class='td_registro' style='width:20%;'><b>CLIENTE:</b> <br> ".$p_tipo.$clientenombre."</td>
<td class='td_registro' style='width:15%;'><b>DIRECCIÓN:</b>  <br>".$direccion.".</td>
<td class='td_registro' style='width:25%;'><b>REFERENCIA:</b>  <br>".$referenciaCliente.".</td>
<td class='td_registro' style='width:15%;'><b>ZONA:</b> <br> ".$nombrezona."</td>
<td class='td_registro' style='width:10%;'><b>TELEF.:</b> <br>".$telefono.".</td>
</tr>
</tbody>
</table>";
$detallesventas=buscarcreditospendientesclientes($fecha,$cod_clienteFK,$condicionFiltro,$tituloClienteVenta,$condicionZona,$datos);

$pagina.="
".$detallesventas[0];
$totaldeudas=$totaldeudas+$detallesventas[1];
$totalNeto = $totalNeto + $detallesventas[2];

}
}



	$sql= "select vt.cod_clienteFK
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente c on vt.cod_clienteFK = c.cod_cliente
  inner join zona z on z.idzona = c.idzonaFk
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionZona.$condicionFiltro.$condiciontipo.$condicioncobrador.$condicionCodLocal.$condicioncliente.$condiciondatos.$condiciontipo_cliente." group by vt.cod_clienteFK  asc";
		
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;

 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $pagina,"3"=> $nroRegistro,"4"=> number_format($totaldeudas,'0',',','.'),"5"=> number_format($totalNeto,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistro,"101" => $MiCondicion);
echo json_encode($informacion);	
exit;
}

function mascuentasacobrardetallado($tipo_cliente,$zona,$cliente,$totalNeto,$fecha,$cod_cobrador,$cod_local,$totalACobrar,$registrocargado,$array_cod_tipo_cliente,$datos)
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$condicionCodLocal=" "; 
if($cod_local!=""){
$condicionCodLocal=" and vt.cod_local='$cod_local' ";
 }
 
 
 $condicionZona=" ";
	if($zona!=""){
	 $condicionZona=" and (Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK ) ='$zona' ";
	}

$condiciontipo_cliente="";
if($tipo_cliente!=""){
$condiciontipo_cliente=" and (Select tipo_cliente from cliente where cod_cliente=cod_clienteFK limit 1)= '".$tipo_cliente."'";		
}
 
	$condicioncobrador="";
if($cod_cobrador!=""){
 $condicioncobrador=" and z.cod_cobradorFK = '$cod_cobrador'";
}


$condicionFiltro=" and cr.fechapago <= '$fecha'";


$condicioncliente=" ";
	if($cliente!=""){
	 $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%".$cliente."%' ";
}


$condicionIn= "";
$contador = 0;
foreach ($array_cod_tipo_cliente as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}
 
$condiciontipo="";
if($contador!=0){
	$condiciontipo=" and c.cod_tipomora in ($condicionIn)";
}

$condiciondatos = "";
if($datos == "1"){
	$condiciondatos = " and ( (COALESCE(tipo_estado, 0) != 12) and (COALESCE(tipo_estado, 0) != 14)   and  (COALESCE(vt.codmoracliente, 0) != 13)) ";
}
if($datos == "2"){
	$condiciondatos = " and ((COALESCE(tipo_estado, 0) = 12)  or (COALESCE(tipo_estado, 0) = 14) or  (COALESCE(vt.codmoracliente, 0) = 13))  ";
}

if($datos == "3"){
	$condiciondatos = " and (COALESCE(vt.codmoracliente, 0) = 13) ";
}

if($datos == "4"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 12) ";
}

if($datos == "5"){
	$condiciondatos = " and (COALESCE(tipo_estado, 0) = 14) ";
}
// $condiciondatos = "";
// if($datos == "1"){
	// $condiciondatos = " and tipo_estado not in (12 , 13 , 14) ";
// }
// if($datos == "2"){
	// $condiciondatos = " and tipo_estado in (12 , 13 , 14) ";
// }


// if($datos == "3"){
	// $condiciondatos = " and tipo_estado = '13' ";
// }

// if($datos == "4"){
	// $condiciondatos = " and tipo_estado = '12' ";
// }

// if($datos == "5"){
	// $condiciondatos = " and tipo_estado = '14' ";
// }


	$sql= "select  (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,vt.cod_clienteFK,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
IFNULL((Select referencias from referenciascliente rf where rf.cod_clienteFk=vt.cod_clienteFK order by idreferenciascliente desc limit 1),'') as referencia,vt.codmoracliente,
 (Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cr.cod_venta)) as nombrezona,
(Select direccion from persona where cod_persona=vt.cod_clienteFK) as direccion,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 inner join cliente c on vt.cod_clienteFK = c.cod_cliente
  inner join zona z on z.idzona = c.idzonaFk
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionZona.$condicionFiltro.$condiciontipo.$condicioncobrador.$condicionCodLocal.$condiciondatos.$condicioncliente.$condiciontipo_cliente." group by vt.cod_clienteFK order by (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) asc    ,  cod_clienteFK asc limit ".$registrocargado." , 50  ";

$pagina = "";  
$totalPagado = "0";  
$deuda = "0";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=0 ; //$registrocargado;
$controlStyle="";
$controlVentas="";
$detallesventa="";
$totaldeudas=$totalACobrar;
$Totalnet=$totalNeto;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$nroRegistro++ ;

$referencia = utf8_encode($valor['referencia']);
$documento = utf8_encode($valor['documento']);
$clientenombre = utf8_encode($valor['clientenombre']);
$direccion = utf8_encode($valor['direccion']);
$nombrezona = utf8_encode($valor['nombrezona']);
$telefono = utf8_encode($valor['telefono']);
$telefono = utf8_encode($valor['telefono']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$tipo_estado = utf8_encode($valor['tipo_estado']);
$codmoracliente = utf8_encode($valor['codmoracliente']);

$p_tipo = '';
if($tipo_estado != '0'){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}else if($tipo_estado == '0' && $codmoracliente != ''){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($codmoracliente);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}

$referenciaCliente=buscarReferenciaCliente($cod_clienteFK);
$tituloClienteVenta="<table class='tableCabeceraRegistro' >
<tbody>
<tr >
<td class='td_registro' style='width:10%;'><b>DOCUMENTO:</b> <br>".$documento."</td>
<td class='td_registro' style='width:20%;'><b>CLIENTE:</b> <br> ".$p_tipo.$clientenombre."</td>
<td class='td_registro' style='width:15%;'><b>DIRECCIÓN:</b>  <br>".$direccion.".</td>
<td class='td_registro' style='width:25%;'><b>REFERENCIA:</b>  <br>".$referenciaCliente.".</td>
<td class='td_registro' style='width:15%;'><b>ZONA:</b> <br> ".$nombrezona."</td>
<td class='td_registro' style='width:10%;'><b>TELEF.:</b> <br>".$telefono.".</td>

</tr>
</tbody>
</table>";
$detallesventas=buscarcreditospendientesclientes($fecha,$cod_clienteFK,$condicionFiltro,$tituloClienteVenta,$condicionZona,$datos);


$pagina.="
".$detallesventas[0];
$totaldeudas=$totaldeudas+$detallesventas[1];
$Totalnet= $Totalnet + $detallesventas[2];

}
}



$nroRegistro = $nroRegistro + $registrocargado;

 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $pagina,"3"=> $nroRegistro,"4"=> number_format($totaldeudas,'0',',','.'),"5"=> number_format($Totalnet,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}





function buscarReferenciaCliente($buscar,$formato="")
{
$mysqli=conectar_al_servidor();

$sql= "Select concat(direccion,' - ',referencias) as referencias from referenciascliente rf where rf.cod_clienteFk=$buscar  ";
 

$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$pagina="";
$referenciasLista=array();
$devolverArray=strtolower($formato)==="json";
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

$style='font-size: 11px; font-family: "Merriweather Sans", Arial;';

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$referencias = utf8_encode($valor['referencias']);
$referenciasLista[]=$referencias;

if(!$devolverArray){
$pagina.="<table style='font-family: arial;font-size: 11px;' >
<tr >
<td style='width:10%;color: #ffffff; $style'>".$referencias."</td>
</tr>
</table>";
}

}
}
mysqli_close($mysqli); 
return $devolverArray ? $referenciasLista : $pagina;

}



/*Buscar Registro en detalle*/
function buscarcreditospendientesclientes($fechaRango,$buscar,$condicionFiltro,$tituloClienteVenta,$condicionZona,$datosbuscados)
{
$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$condiciondatos = "";
if($datosbuscados == "1"){
	$condiciondatos = " and ( (COALESCE((SELECT tipo_estado FROM cliente WHERE vt.cod_clienteFK = $buscar LIMIT 1), 0) != 12) and (COALESCE((SELECT tipo_estado FROM cliente WHERE vt.cod_clienteFK = $buscar LIMIT 1), 0) != 14)   and  (COALESCE(vt.codmoracliente, 0) != 13)) ";
}
if($datosbuscados == "2"){
	$condiciondatos = " and ((COALESCE((SELECT tipo_estado FROM cliente WHERE vt.cod_clienteFK = $buscar LIMIT 1), 0) = 12)  or (COALESCE((SELECT tipo_estado FROM cliente WHERE vt.cod_clienteFK = $buscar LIMIT 1), 0) = 14) or  (COALESCE(vt.codmoracliente, 0) = 13))  ";
}

if($datosbuscados == "3"){
	$condiciondatos = " and (COALESCE(vt.codmoracliente, 0) = 13) ";
}

if($datosbuscados == "4"){
	$condiciondatos = " and (COALESCE((SELECT tipo_estado FROM cliente WHERE vt.cod_clienteFK = $buscar LIMIT 1), 0) = 12) ";
}

if($datosbuscados == "5"){
	$condiciondatos = " and (COALESCE((SELECT tipo_estado FROM cliente WHERE vt.cod_clienteFK = $buscar LIMIT 1), 0) = 14) ";
}



$sql= "select vt.cod_clienteFK,cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.total_venta,interes,dias,vt.pago as entrega,
total,totalinteres,totaldeuda,cr.descuento,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota' ),0) as totalPagoCuota,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Interes'),0) as totalPagoInteres,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito and Monto!='0' order by pg.Fecha desc limit 1),0) as FechaUltimoPago,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito and Monto!='0' order by pg.Fecha desc limit 1),'') as FechaUltimoPago2,
IFNULL((select (pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito  and Monto!='0' order by pg.Fecha asc limit 1),0) as FechaPagoCredito
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_clienteFK='$buscar'  ".$condicionZona.$condiciondatos." and ((cr.Monto-cr.descuento)-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0))>0 ".$condicionFiltro." order by DATEDIFF('".$fechaRango."',(select (c.fechapago) from credito c  where vt.cod_venta=c.cod_venta and
		IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(c.Monto - c.descuento) 
		order by idcredito asc limit 1)) desc  , idcredito asc "; 
 
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
$controlStyle="";
$controlventa="";
$paginadetalle="";
$totaldeudas="0";
$totalNeto="0";
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$idcredito = utf8_encode($valor['idcredito']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$descuento = utf8_encode($valor['descuento']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$totalPagoCredito = utf8_encode($valor['totalPagoCuota']);
$totalPagoInteres = utf8_encode($valor['totalPagoInteres']);
$FechaPagoCredito = utf8_encode($valor['FechaPagoCredito']);  
$FechaUltimoPago = utf8_encode($valor['FechaUltimoPago']);
$FechaUltimoPago2 = utf8_encode($valor['FechaUltimoPago2']);
$MontoConDescuento=$Monto-$descuento;
$MontoSobrante=$MontoConDescuento-$totalPago;
$deudaActua=0;
$total_interes=0;
$TotalSinInteres=0;
$deuda_Actual_interes=0;
$stylecolor=" ";
$event=" ";
if($nroCancelado==0){
	
	if(($Monto+$totalPagoInteres)>($totalPago+$descuento)){
	$Esado="Pendiente";
	$TotalSinInteres=$Monto-($totalPagoCredito+$descuento);	
	if($diff<0){
	$diff=$diff*-1;
	$stylecolor=" background-color: #313030;color:#FFEB3B";
	}else{
	$diff=0;
    }
	$control=verificar_fecha_expiracion($fechapago);
	if($control=="si"){
	if($interes!=0){
	// $fechahoy=date('Y-m-d');	
	// $datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy))));
	// $datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));
	// $interval=$datetime2->diff($datetime1);
    // $diff=$interval->format('%a');
	// $diasGracia=$diff-$dias;
	
	
	
	
			/*CALCULAMOS EL DIA DE GRACIA*/
	$fechahoy=date('Y-m-d');	
	$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy)))); 
	$datetime3= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	$Fecha1=strtotime($FechaUltimoPago);
	$Fecha2=strtotime($fechapago);
	if($FechaPagoCredito=="0" ){
		$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	}else{
		if($Fecha1 < $Fecha2){
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));		
			}else{
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$FechaUltimoPago))));		
			}		
	}
	$interval=$datetime2->diff($datetime1);
    $diff=$interval->format('%a');
	
	
	
	$interval2=$datetime3->diff($datetime1);
    $diff2=$interval2->format('%a');

	
	$diasGracia=$diff2-$dias;
	
	
	
	
	if($diasGracia>0){
	$montoIn=$Monto-$totalPagoCredito;	
	$i=($interes*($montoIn))/100;
	$total_interes=($i*$diff);
	$t=$montoIn+$total_interes;
	$deudaActua=($montoIn+$total_interes)-$descuento;
	 $total=$t;
	// $deudaActua=$t-$totalPagoCredito-$totalPagoInteres;
	$deuda_Actual_interes=$total_interes;	
	}else{
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;		
	}	
	}else{	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	}
			
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	}
	
	if($controlventa!=$cod_venta){
		
		$datosVenta=buscardatoscuentacreditosventa($cod_venta);
		
// $datos[14]=$pagado ;
// $datos[15]=$total_venta ;
// $datos[16]=$fecha_venta ;
// $datos[17]=$numFactura ;
		
		
		$paginadetalle=buscar_detalles_venta_en_cuentas_a_cobrar($cod_venta,$cod_clienteFK);
		$controlventa=$cod_venta;
		
		$pagina.="<br><br>".$tituloClienteVenta."<table class='tableCabeceraRegistro' style='width:100%'>
<tr id='tbSelecRegistro'   >
<td class='td_registro' style='width:5%;'>
NRO FACT:&nbsp;&nbsp;".$datosVenta[17]."
</td>
<td class='td_registro' style='width:5%;'>
FECHA:&nbsp;&nbsp;".$datosVenta[16]."
</td>
<td class='td_registro' style='width:5%;'>
TOTAL VENTA:&nbsp;&nbsp;".number_format($datosVenta[15],'0',',','.')."
</td>
<td class='td_registro' style='width:5%;'>
PAGADO:&nbsp;&nbsp;".number_format($datosVenta[14],'0',',','.')."
</td>

<td class='td_registro' style='width:5%;'>
ESTADO:&nbsp;&nbsp;".$datosVenta[18]."
</td>

 </tr>
</table>
".$paginadetalle[1]."
<table class='tableCabeceraRegistro' style='width:100%'>
<tbody>
<tr>
<td class='td_registro' style='width:5%;'>
CUOTA
</td>
<td class='td_registro' style='width:5%;'>
VENC.
</td>
<td class='td_registro' style='width:5%;'>
D.A.
</td>
<td class='td_registro' style='width:5%;'>
MONTO
</td>
<td class='td_registro' style='width:5%;'>
INTERES
</td>
<td class='td_registro' style='width:5%;'>
PAGADO
</td>
<td class='td_registro' style='width:5%;'>
ULT. FECHA PAGO
</td>
<td class='td_registro' style='width:5%;'>
SALDO
</td>
</tr>
</tbody>
</table>";
	}


$deudaActua = ceil($deudaActua/1000)*1000;

$total_interes = ceil($total_interes/1000)*1000;

$deuda_Actual_interes = ceil($deuda_Actual_interes/1000)*1000;
	
	$styleName=CargarStyleTable($styleName);

$fech1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy))));	
$fech2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	

$diffecha=$fech1->diff($fech2);
    $da=$diffecha->format('%a');

if($da<=0){
	$da=0;
}
	
	$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='2'>
<tr id='tbSelecRegistro' name='TablaCuentaGeneralCredito' >
<td id='td_id' style='display:none' >".$idcredito."</td>

<td id='' style='width:5%' >".$plazo."</td>
<td id='' style='width:5%'>".$fechapago."</td>
<td id='' style='width:5%'>".$da."</td>
<td id='' style='width:5%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='width:5%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($totalPagoCredito,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($totalPagoInteres,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($deuda_Actual_interes,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalSinInteres,'0',',','.')."</td>
<td id='' style='width:5%'>".$FechaUltimoPago2."</td>
<td id='' style='width:5%'>". number_format($deudaActua,'0',',','.')."</td>
</tr>
</table>";

	$totaldeudas=$totaldeudas+$deudaActua;
	$totalNeto= $totalNeto + $TotalSinInteres ;
	
	}	
	}
    }
	  
	  // $pagina.="<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
// <tr>
// <td id='' style='width:59%;text-align:left' ></td>
// <td id='' style='width:5%'>". number_format($totaldeudas,'0',',','.')."</td>
// </tr>
// </table>";
	
    }
	



 mysqli_close($mysqli);
 
  $datos[0]=$pagina;
 $datos[1]=$totaldeudas;
 $datos[2]=$totalNeto;
 
 
 return $datos;
 
}


function calcular_porcentaje_credito_pagado($pagado_sin_interes, $capital_total_credito)
{
	$pagado = max(0, (float)$pagado_sin_interes);
	$total_credito = max(0, (float)$capital_total_credito);
	if ($total_credito <= 0) {
		return 0;
	}
	$porcentaje = (int)round(($pagado * 100) / $total_credito);
	return max(0, min(100, $porcentaje));
}

function construir_condicion_busqueda_general_cuentas_cobrar($mysqli, $busqueda)
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
			(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%".$terminoLike."%'
			or REPLACE(REPLACE(REPLACE((Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK),'.',''),'-',''),' ','') like '%".$terminoCompacto."%'
			or REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE((Select telefono from persona where cod_persona=vt.cod_clienteFK),' ',''),'.',''),'-',''),'(',''),')',''),'+','') like '%".$terminoCompacto."%'
		)";
	}

	return count($condiciones) > 0 ? ' and '.implode(' and ', $condiciones).' ' : '';
}

function construir_condicion_cliente_cuentas_cobrar($mysqli, $cliente)
{
	$cliente = trim((string)$cliente);
	if ($cliente === '') {
		return '';
	}

	$terminos = preg_split('/\s+/', $cliente);
	$condiciones = array();
	foreach ($terminos as $termino) {
		$termino = trim($termino);
		if ($termino === '') {
			continue;
		}
		$terminoLike = $mysqli->real_escape_string($termino);
		$terminoLike = str_replace(array('%', '_'), array('\\%', '\\_'), $terminoLike);
		$condiciones[] = "(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%".$terminoLike."%'";
	}

	return count($condiciones) > 0 ? ' and '.implode(' and ', $condiciones).' ' : '';
}

function construir_condicion_documento_cuentas_cobrar($mysqli, $documento)
{
	$documento = trim((string)$documento);
	if ($documento === '') {
		return '';
	}
	$documentoCompacto = str_replace(array(' ', '.', '-'), '', $documento);
	$documentoCompacto = $mysqli->real_escape_string($documentoCompacto);
	return " and REPLACE(REPLACE(REPLACE((Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK),'.',''),'-',''),' ','') = '".$documentoCompacto."' ";
}

function construir_condicion_telefono_cuentas_cobrar($mysqli, $telefono)
{
	$telefono = trim((string)$telefono);
	if ($telefono === '') {
		return '';
	}
	$telefonoCompacto = str_replace(array(' ', '.', '-', '(', ')', '+'), '', $telefono);
	$telefonoCompacto = $mysqli->real_escape_string($telefonoCompacto);
	$telefonoCompacto = str_replace(array('%', '_'), array('\\%', '\\_'), $telefonoCompacto);
	return " and REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE((Select telefono from persona where cod_persona=vt.cod_clienteFK),' ',''),'.',''),'-',''),'(',''),')',''),'+','') like '%".$telefonoCompacto."%' ";
}

function cuentasacobrar($filtro,$fecha1,$fecha2,$cliente,$documento,$telefono,$producto,$filtrofecha,$codlocal,$vendedor,$formato='',$buscar_general='')
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	


	$condicionVendedor="";
	 if($vendedor!=""){
	   $condicionVendedor="and  Vendedor1 ='".$vendedor."'";		
	 }


$condicionCodLocal=" "; 
if($codlocal!=""){
$condicionCodLocal=" and vt.cod_local='$codlocal' ";
 }
	// $condicioncliente=" ";
	// if($cliente!=""){
	 // $condicioncliente=" and  (Select nombre_persona from persona where cod_persona=cod_clienteFK) like '%".$cliente."%' ";
	// }	
	$condiciondocumento = construir_condicion_documento_cuentas_cobrar($mysqli, $documento);
	$condiciontelefono = construir_condicion_telefono_cuentas_cobrar($mysqli, $telefono);
	
	$condicionfechafiltro=" ";
	if($filtrofecha!=""){
	 $condicionfechafiltro=" and  cr.fechapago='$filtrofecha' ";
	}

$condicionFecha="";
if($filtro=="1")
{
$condicionFecha=" and cr.fechapago>='$fecha1' and cr.fechapago<='$fecha2'";

}	
if($filtro=="3")
{
$condicionFecha=" and cr.fechapago<='$fecha1' ";
	
}
if($filtro=="4")
{
$condicionFecha=" and cr.fechapago>='$fecha1' ";
	
}	



$condicioncliente = construir_condicion_cliente_cuentas_cobrar($mysqli, $cliente);
$condicionbusquedageneral = construir_condicion_busqueda_general_cuentas_cobrar($mysqli, $buscar_general);


	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.tipo_comprobante,vt.puntoexpedicion,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.totalinteres,cr.descuento,vt.TipoVenta,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
IFNULL((select sum(cx.Monto-cx.descuento) from credito cx where cx.cod_venta=vt.cod_venta),0) as capitalTotalCredito,
IFNULL((select sum(pg.Monto) from pago pg inner join credito cx on cx.idcredito=pg.cod_creditoFK where cx.cod_venta=vt.cod_venta and pg.tipo='Pago Cuota'),0) as capitalPagadoCredito,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
IFNULL((Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lat,
IFNULL((Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lot,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
IFNULL((Select calificacion_cliente from cliente where cod_cliente=cod_clienteFK),'SIN REGISTRO') as calificacion_cliente,
(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado,
(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionCodLocal.$condicionbusquedageneral.$condicioncliente.$condiciondocumento.$condiciontelefono.$condicionfechafiltro.$condicionFecha.$condicionVendedor."  group by cr.cod_venta order by  vt.cod_venta asc limit 100 ";
 

// echo($sql);
// exit;

 
$pagina = "";
$filas = array();
$totalPagado = "0";  
$totalacobrar = "0";  
$deuda = "0";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']); 
$idcredito = utf8_encode($valor['idcredito']);    
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$creditopagado = utf8_encode($valor['creditopagado']); 
$capitalTotalCredito = (float)$valor['capitalTotalCredito'];
$capitalPagadoCredito = (float)$valor['capitalPagadoCredito'];
$diff = utf8_encode($valor['diff']);
$clientenombre = utf8_encode($valor['clientenombre']);
$cobradornombre = utf8_encode($valor['cobradornombre']);
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']);
$total_venta = utf8_encode($valor['total_venta']);
$num_factura = utf8_encode($valor['num_factura']);
$nombrelocal = utf8_encode($valor['nombrelocal']);
$telefono = utf8_encode($valor['telefono']);
$descuento = utf8_encode($valor['descuento']);
$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$nroCouta = utf8_encode($valor['nroCouta']);
$TipoVenta = utf8_encode($valor['TipoVenta']);
$documento = utf8_encode($valor['documento']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$lat = utf8_encode($valor['lat']);
$lot = utf8_encode($valor['lot']);
$tipo_estado = utf8_encode($valor['tipo_estado']);
$calificacion_cliente = utf8_encode($valor['calificacion_cliente']);

$datos=calcularintereses2($cod_venta,0,0,"2","3","2","si");


$totalEnDescuento=$datos[0];
$TotalEnInteres=$datos[1];
$TotalEnDeuda=$datos[2];
$TotalEnPagado=$datos[3];
$TotalAPagar=$datos[4];
$TotalDiasAtrasado=$datos[15];
$cuotasatrazadas=$datos[6];
$TotalApagarSinInteres=$datos[7];
$DeudaPendiente=$datos[8];
$TotalInteresPagado=$datos[12];
$TotalPagadoSinInteres=$datos[13];


if($TipoVenta=="CREDITO"){
 $cuotas=$nroCouta."/".buscarcantidadcuotapagados($cod_venta);
}else{
	$cuotas="CONTADO";
}

if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}


$deuda=$deuda+$datos[4];
$totalacobrar=$totalacobrar+$datos[8];


$nueva_fecha = date("d-m-Y", strtotime($fechapago));

$Detalle_VentaProducto=buscar_detalles_venta_en_cuentas_a_cobrar($cod_venta,'');

$p_tipo = '';
$nombre_tipo_estado = '';
if($tipo_estado != '0'){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}

$spanCal="";
if($calificacion_cliente == 'SIN REGISTRO'){
$calificacion_cliente = '';
}else{ 
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

$filas[] = array(
	"cod_cliente" => $cod_clienteFK,
	"cod_venta" => $cod_venta,
	"num_factura" => $num_factura,
	"plazo" => $plazo,
	"cliente" => $clientenombre,
	"estado_cliente" => $nombre_tipo_estado,
	"calificacion_cliente" => $calificacion_cliente === '' ? 'SIN REGISTRO' : $calificacion_cliente,
	"documento" => $documento,
	"telefono" => $telefono,
	"nro_factura" => $nrof,
	"productos" => isset($Detalle_VentaProducto[4]) ? $Detalle_VentaProducto[4] : array(),
	"cobrador" => $cobradornombre,
	"total_venta" => number_format($total_venta,'0',',','.'),
	"fecha_mostrada" => $nueva_fecha,
	"fecha_pago" => $fechapago,
	"cuotas" => $cuotas,
	"monto_cuota" => number_format($Monto,'0',',','.'),
	"total_descuento" => number_format($totalEnDescuento,'0',',','.'),
	"interes_pagado" => number_format($TotalInteresPagado,'0',',','.'),
	"pagado_sin_interes" => number_format($TotalPagadoSinInteres,'0',',','.'),
	"porcentaje_pagado_credito" => calcular_porcentaje_credito_pagado($capitalPagadoCredito, $capitalTotalCredito),
	"total_pagado" => number_format($TotalEnPagado,'0',',','.'),
	"total_interes" => number_format($TotalEnInteres,'0',',','.'),
	"cuotas_atrasadas" => $cuotasatrazadas,
	"dias_atrasados" => $TotalDiasAtrasado,
	"deuda_pendiente" => number_format($DeudaPendiente,'0',',','.'),
	"total_deuda" => number_format($TotalEnDeuda,'0',',','.'),
	"total_a_pagar" => number_format($TotalAPagar,'0',',','.'),
	"total_pagado_venta" => number_format($totalPagado,'0',',','.'),
	"cod_cobrador" => $cod_cobradorFK,
	"local" => $nombrelocal,
	"tipo_comprobante" => $tipo_comprobante,
	"punto_expedicion" => $puntoexpedicion,
	"subtotal_pago" => number_format($TotalApagarSinInteres,'0',',','.'),
	"vendedor" => $nombrevendedor1,
	"lat" => $lat,
	"lot" => $lot
);

if($formato!='json'){
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoscuentaacobrar(this)' >
<td id='td_id_1' style='display:none' >".$cod_clienteFK."</td>
<td id='td_datos_1' style='display:none' >".$cod_venta."</td>
<td id='td_datos_2' style='display:none' >".$num_factura."</td>
<td id='' style='display:none' >".$plazo."</td>
<td id='td_datos_26' style='width:10%;' >".$p_tipo.$clientenombre."</td>
<td id='' style='width:5%;' >".$documento."</td>
<td id='' style='width:5%;' >".$telefono."</td>
<td id='' style='width:5%;' >".$nrof."</td>
<td id='' style='width:10%; ' >".$Detalle_VentaProducto[0]."</td>
<td id='td_datos_5' style='display:none' >".$cobradornombre."</td>
<td id='td_datos_12' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td   style='width:5%' >".$nueva_fecha."</td>
<td id='td_datos_3' style='display:none' >".$fechapago."</td>
<td id='td_datos_19' style='display:none' >".$cuotas."</td>
<td id='td_datos_6' style='display:none'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_18' style='display:none'>". number_format($totalEnDescuento,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalInteresPagado,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalPagadoSinInteres,'0',',','.')."</td>
<td id='td_datos_13' style='display:none'>". number_format($TotalEnPagado,'0',',','.')."</td>
<td id='td_datos_17' style='display:none'>". number_format($TotalEnInteres,'0',',','.')."</td>
<td id='td_datos_20' style='width:3%'>".$cuotasatrazadas."</td>
<td id='td_datos_10' style='width:3%'>".$TotalDiasAtrasado."</td>
<td id='td_datos_22' style='width:5%'>". number_format($DeudaPendiente,'0',',','.')."</td>
<td id='td_datos_11' style='display:none'>". number_format($TotalEnDeuda,'0',',','.')."</td>
<td id='td_datos_14' style='width:5%'>". number_format($TotalAPagar,'0',',','.')."</td>
<td id='td_datos_7' style='display:none'>". number_format($totalPagado,'0',',','.')."</td>
<td id='td_datos_8' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td id='td_datos_9' style='display:none'>".$cod_cobradorFK."</td>
<td id='' style='width:5%'>". $nombrelocal."</td>
<td id='td_datos_15' style='display:none'>". $tipo_comprobante."</td>
<td id='td_datos_16' style='display:none'>". $puntoexpedicion."</td>
<td id='td_datos_21' style='display:none'>".  number_format($TotalApagarSinInteres,'0',',','.')."</td>
<td id='td_datos_23' style='width:5%'>". $nombrevendedor1."</td>
<td id='td_datos_24' style='display:none'>". $lat."</td>
<td id='td_datos_25' style='display:none'>". $lot."</td>
</tr>
</table>";

}


}
}


$sqlConteo = "select count(distinct cr.cod_venta) as totalregistro
 from credito cr
 inner join venta vt on vt.cod_venta=cr.cod_venta
 left join (
     select cod_creditoFK, sum(Monto) as total_pagado
     from pago
     where tipo='Pago Cuota'
     group by cod_creditoFK
 ) pagos_cuota on pagos_cuota.cod_creditoFK=cr.idcredito
 where (IFNULL(cr.Monto,0)-IFNULL(cr.descuento,0)-IFNULL(pagos_cuota.total_pagado,0))>0
 and not exists (
     select 1
     from detalle_venta dtv
     where dtv.cod_ventaFK=vt.cod_venta
     and dtv.estado='Garantia'
 )
 and not exists (
     select 1
     from cancelaciones ca
     where ca.cod_venta=vt.cod_venta
 )
".$condicionCodLocal.$condicionbusquedageneral.$condicioncliente.$condiciondocumento.$condiciontelefono.$condicionfechafiltro.$condicionFecha.$condicionVendedor;

$stmtConteo = $mysqli->prepare($sqlConteo);
if (!$stmtConteo) {
	echo json_encode(array("1" => "error", "2" => "No se pudo preparar el conteo de cuentas a cobrar"));
	mysqli_close($mysqli);
	exit;
}
if (!$stmtConteo->execute()) {
	echo json_encode(array("1" => "error", "2" => "No se pudo contar las cuentas a cobrar"));
	$stmtConteo->close();
	mysqli_close($mysqli);
	exit;
}
$resultadoConteo = $stmtConteo->get_result();
$filaConteo = $resultadoConteo->fetch_assoc();
$totalregistro = isset($filaConteo['totalregistro']) ? (int)$filaConteo['totalregistro'] : 0;
$stmtConteo->close();

 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" =>number_format($nroRegistro,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($totalacobrar,'0',',','.'),"99"=> $nroRegistro,"100"=>$totalregistro);
echo json_encode($informacion);	
exit;
}

function mascuentasacobrar($filtro,$fecha1,$fecha2,$cliente,$documento,$telefono,$producto,$filtrofecha,$codlocal,$registrocargado,$total_cobrar,$total_deuda,$vendedor,$formato='',$buscar_general='')
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	

$condicionVendedor="";
	 if($vendedor!=""){
	   $condicionVendedor="and  Vendedor1 ='".$vendedor."'";		
	 }


$condicionCodLocal=" "; 
if($codlocal!=""){
$condicionCodLocal=" and vt.cod_local='$codlocal' ";
 }
	// $condicioncliente=" ";
	// if($cliente!=""){
	 // $condicioncliente=" and  (Select nombre_persona from persona where cod_persona=cod_clienteFK) like '%".$cliente."%' ";
	// }	
	$condiciondocumento = construir_condicion_documento_cuentas_cobrar($mysqli, $documento);
	$condiciontelefono = construir_condicion_telefono_cuentas_cobrar($mysqli, $telefono);
	
	$condicionfechafiltro=" ";
	if($filtrofecha!=""){
	 $condicionfechafiltro=" and  cr.fechapago='$filtrofecha' ";
	}

$condicionFecha="";
if($filtro=="1")
{
$condicionFecha=" and cr.fechapago>='$fecha1' and cr.fechapago<='$fecha2'";

}	
if($filtro=="3")
{
$condicionFecha=" and cr.fechapago<='$fecha1' ";
	
}
if($filtro=="4")
{
$condicionFecha=" and cr.fechapago>='$fecha1' ";
	
}	



$condicioncliente = construir_condicion_cliente_cuentas_cobrar($mysqli, $cliente);
$condicionbusquedageneral = construir_condicion_busqueda_general_cuentas_cobrar($mysqli, $buscar_general);



	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.tipo_comprobante,vt.puntoexpedicion,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.totalinteres,cr.descuento,vt.TipoVenta,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
IFNULL((select sum(cx.Monto-cx.descuento) from credito cx where cx.cod_venta=vt.cod_venta),0) as capitalTotalCredito,
IFNULL((select sum(pg.Monto) from pago pg inner join credito cx on cx.idcredito=pg.cod_creditoFK where cx.cod_venta=vt.cod_venta and pg.tipo='Pago Cuota'),0) as capitalPagadoCredito,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
IFNULL((Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lat,
IFNULL((Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lot,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
IFNULL((Select calificacion_cliente from cliente where cod_cliente=cod_clienteFK),'SIN REGISTRO') as calificacion_cliente,
(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionCodLocal.$condicionbusquedageneral.$condicioncliente.$condiciondocumento.$condiciontelefono.$condicionfechafiltro.$condicionFecha.$condicionVendedor."  group by cr.cod_venta order by  vt.cod_venta asc limit ".$registrocargado.", 100 ";
 


 
$pagina = "";
$filas = array();
$totalPagado = "0";  
$deuda = $total_deuda;  
$totalacobrar = $total_cobrar;  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargado;
$controlStyle="";
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);    
$idcredito = utf8_encode($valor['idcredito']);    
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$creditopagado = utf8_encode($valor['creditopagado']); 
$capitalTotalCredito = (float)$valor['capitalTotalCredito'];
$capitalPagadoCredito = (float)$valor['capitalPagadoCredito'];
$diff = utf8_encode($valor['diff']);
$clientenombre = utf8_encode($valor['clientenombre']);
$cobradornombre = utf8_encode($valor['cobradornombre']);
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']);
$total_venta = utf8_encode($valor['total_venta']);
$num_factura = utf8_encode($valor['num_factura']);
$nombrelocal = utf8_encode($valor['nombrelocal']);
$telefono = utf8_encode($valor['telefono']);
$descuento = utf8_encode($valor['descuento']);
$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$nroCouta = utf8_encode($valor['nroCouta']);
$TipoVenta = utf8_encode($valor['TipoVenta']);
$documento = utf8_encode($valor['documento']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$lat = utf8_encode($valor['lat']);
$lot = utf8_encode($valor['lot']);
$tipo_estado = utf8_encode($valor['tipo_estado']);
$calificacion_cliente = utf8_encode($valor['calificacion_cliente']);

$datos=calcularintereses2($cod_venta,0,0,"2","3","2","si");


$totalEnDescuento=$datos[0];
$TotalEnInteres=$datos[1];
$TotalEnDeuda=$datos[2];
$TotalEnPagado=$datos[3];
$TotalAPagar=$datos[4];
$TotalDiasAtrasado=$datos[15];
$cuotasatrazadas=$datos[6];
$TotalApagarSinInteres=$datos[7];
$DeudaPendiente=$datos[8];
$TotalInteresPagado=$datos[12];
$TotalPagadoSinInteres=$datos[13];


if($TipoVenta=="CREDITO"){
 $cuotas=$nroCouta."/".buscarcantidadcuotapagados($cod_venta);
}else{
	$cuotas="CONTADO";
}

if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}
 $deuda=$deuda+$datos[4];
$totalacobrar=$totalacobrar+$datos[8];

$Detalle_VentaProducto=buscar_detalles_venta_en_cuentas_a_cobrar($cod_venta,'');

$p_tipo = '';
$nombre_tipo_estado = '';
if($tipo_estado != '0'){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}

$filas[] = array(
	"cod_cliente" => $cod_clienteFK,
	"cod_venta" => $cod_venta,
	"num_factura" => $num_factura,
	"plazo" => $plazo,
	"cliente" => $clientenombre,
	"estado_cliente" => $nombre_tipo_estado,
	"calificacion_cliente" => $calificacion_cliente === '' ? 'SIN REGISTRO' : $calificacion_cliente,
	"documento" => $documento,
	"telefono" => $telefono,
	"nro_factura" => $nrof,
	"productos" => isset($Detalle_VentaProducto[4]) ? $Detalle_VentaProducto[4] : array(),
	"cobrador" => $cobradornombre,
	"total_venta" => number_format($total_venta,'0',',','.'),
	"fecha_mostrada" => $fechapago,
	"fecha_pago" => $fechapago,
	"cuotas" => $cuotas,
	"monto_cuota" => number_format($Monto,'0',',','.'),
	"total_descuento" => number_format($totalEnDescuento,'0',',','.'),
	"interes_pagado" => number_format($TotalInteresPagado,'0',',','.'),
	"pagado_sin_interes" => number_format($TotalPagadoSinInteres,'0',',','.'),
	"porcentaje_pagado_credito" => calcular_porcentaje_credito_pagado($capitalPagadoCredito, $capitalTotalCredito),
	"total_pagado" => number_format($TotalEnPagado,'0',',','.'),
	"total_interes" => number_format($TotalEnInteres,'0',',','.'),
	"cuotas_atrasadas" => $cuotasatrazadas,
	"dias_atrasados" => $TotalDiasAtrasado,
	"deuda_pendiente" => number_format($DeudaPendiente,'0',',','.'),
	"total_deuda" => number_format($TotalEnDeuda,'0',',','.'),
	"total_a_pagar" => number_format($TotalAPagar,'0',',','.'),
	"total_pagado_venta" => number_format($totalPagado,'0',',','.'),
	"cod_cobrador" => $cod_cobradorFK,
	"local" => $nombrelocal,
	"tipo_comprobante" => $tipo_comprobante,
	"punto_expedicion" => $puntoexpedicion,
	"subtotal_pago" => number_format($TotalApagarSinInteres,'0',',','.'),
	"vendedor" => $nombrevendedor1,
	"lat" => $lat,
	"lot" => $lot
);

if($formato!='json'){
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoscuentaacobrar(this)' >
<td id='td_id_1' style='display:none' >".$cod_clienteFK."</td>
<td id='td_datos_1' style='display:none' >".$cod_venta."</td>
<td id='td_datos_2' style='display:none' >".$num_factura."</td>
<td id='' style='display:none' >".$plazo."</td>
<td id='td_datos_26' style='width:10%;' >".$p_tipo.$clientenombre."</td>
<td id='' style='width:5%;' >".$documento."</td>
<td id='' style='width:5%;' >".$telefono."</td>
<td id='' style='width:5%;' >".$nrof."</td>
<td id='' style='width:10%; ' >".$Detalle_VentaProducto[0]."</td>
<td id='td_datos_5' style='display:none' >".$cobradornombre."</td>
<td id='td_datos_12' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td id='td_datos_3' style='width:5%' >".$fechapago."</td>
<td id='td_datos_19' style='display:none' >".$cuotas."</td>
<td id='td_datos_6' style='display:none'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_18' style='display:none'>". number_format($totalEnDescuento,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalInteresPagado,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalPagadoSinInteres,'0',',','.')."</td>
<td id='td_datos_13' style='display:none'>". number_format($TotalEnPagado,'0',',','.')."</td>
<td id='td_datos_17' style='display:none'>". number_format($TotalEnInteres,'0',',','.')."</td>
<td id='td_datos_20' style='width:3%'>".$cuotasatrazadas."</td>
<td id='td_datos_10' style='width:3%'>".$TotalDiasAtrasado."</td>
<td id='td_datos_22' style='width:5%'>". number_format($DeudaPendiente,'0',',','.')."</td>
<td id='td_datos_11' style='display:none'>". number_format($TotalEnDeuda,'0',',','.')."</td>
<td id='td_datos_14' style='width:5%'>". number_format($TotalAPagar,'0',',','.')."</td>
<td id='td_datos_7' style='display:none'>". number_format($totalPagado,'0',',','.')."</td>
<td id='td_datos_8' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td id='td_datos_9' style='display:none'>".$cod_cobradorFK."</td>
<td id='' style='width:5%'>". $nombrelocal."</td>
<td id='td_datos_15' style='display:none'>". $tipo_comprobante."</td>
<td id='td_datos_16' style='display:none'>". $puntoexpedicion."</td>
<td id='td_datos_21' style='display:none'>".  number_format($TotalApagarSinInteres,'0',',','.')."</td>
<td id='td_datos_23' style='width:5%'>". $nombrevendedor1."</td>
<td id='td_datos_24' style='display:none'>". $lat."</td>
<td id='td_datos_25' style='display:none'>". $lot."</td>
</tr>
</table>";

}


}
}


 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" =>number_format($nroRegistro,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($totalacobrar,'0',',','.'),"99" =>$nroRegistro);
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

function cuentasExpCobrados($buscar,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	

$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,dias,vt.pago as entrega,vt.num_factura,vt.puntoexpedicion,
IF(datediff((select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1),cr.fechapago)<=0,0,datediff((select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1),cr.fechapago)) as diff,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado,
(select count(pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito ) as cantidad
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where
((cr.Monto-cr.descuento)-IFNULL((select sum(pg.Monto)
 from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0))<=0 and vt.cod_clienteFK='".$buscar."'
 group by cr.idcredito order by cr.cod_venta asc,cr.fechapago asc ";


 
$pagina = "";  
$filas = array();
$devolverArray = strtolower($formato)==="json";
$totalPagado = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$deuda = "0";  
$diasatrazado = "0";  
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
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$idcredito = utf8_encode($valor['idcredito']);/*Obtenemos el registro mediante el nombre del atributo */      
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$dias = utf8_encode($valor['dias']);
$entrega = utf8_encode($valor['entrega']);
$fechapagado = utf8_encode($valor['fechapagado']);
$cantidad = utf8_encode($valor['cantidad']);
$num_factura = utf8_encode($valor['num_factura']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$diff = utf8_encode($valor['diff']);

 $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);

$datos=calcularintereses2($idcredito,0,0,"2","2","1","no");
$descuento=$datos[0];
$total_interes=$datos[1];
$total=$datos[2];
$totalPago=$datos[3];
$deudaActua=$datos[4];
$TotalDiasAtrasado=$datos[5];
//$datos[6]=$nrodecuotasatrazado;
//$datos[7]=$TotalApagarSinInteres;
//$datos[8]=$DeudaPendiente;
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
$mostrarTituloFactura=$tituloPagos!=="";


$fechapago = date("d-m-Y", strtotime($fechapago));
if($fechapagado!=""){
	$fechapagado = date("d-m-Y", strtotime($fechapagado));
}


$styleName=CargarStyleTable($styleName);
$filas[]=array(
	"id_credito"=>$idcredito,
	"id_venta"=>$cod_venta,
	"numero_factura"=>$nrof,
	"mostrar_titulo_factura"=>$mostrarTituloFactura,
	"plazo"=>$plazo,
	"fecha_vencimiento"=>$fechapago,
	"fecha_pago"=>$fechapagado,
	"monto"=>number_format($Monto,'0',',','.'),
	"descuento"=>number_format($descuento,'0',',','.'),
	"total_interes"=>number_format($total_interes,'0',',','.'),
	"total"=>number_format($total,'0',',','.'),
	"dias_atraso"=>$diff,
	"cantidad_pagos"=>$cantidad,
	"cancelado"=>$nroCancelado>0,
	"clase_fila"=>$styleName
);
if(!$devolverArray){
$pagina.=$tituloPagos."
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' style='$stylecancel' >
<td id='' style='width:10%' >".$plazo."</td>
<td id='' style='width:10%' >".$fechapago."</td>
<td id='' style='width:10%' >".$fechapagado."</td>
<td id='' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total,'0',',','.')."</td>
<td id='' style='width:10%'>".$diff."</td>
<td id='' style='width:10%'>".$cantidad."</td>

</tr>
</table>
";

}
}

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3"=>$nroRegistro
,"4"=> number_format($totalPagado,'0',',','.'),"6"=> number_format($totalInteres,'0',',','.') ,"5"=> number_format($totalDescuento,'0',',','.') );
echo json_encode($informacion);	
exit;
}

function cuentasExpPendientes($buscar,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,dias,vt.pago as entrega,vt.num_factura,vt.puntoexpedicion,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado,
(select count(pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito ) as cantidad
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where
((cr.Monto-cr.descuento)-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0))>0 and vt.cod_clienteFK='".$buscar."'
 group by cr.idcredito order by cr.cod_venta asc,cr.fechapago asc ";


 
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
$totalPagado = "0";  
$deuda = "0";  
$diasatrazado = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
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
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idcredito = utf8_encode($valor['idcredito']);/*Obtenemos el registro mediante el nombre del atributo */      
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$dias = utf8_encode($valor['dias']);
$entrega = utf8_encode($valor['entrega']);
$fechapagado = utf8_encode($valor['fechapagado']);
$cantidad = utf8_encode($valor['cantidad']);
$num_factura = utf8_encode($valor['num_factura']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
 $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);

$datos=calcularintereses2($idcredito,0,0,"2","2","1","no");
$descuento=$datos[0];
$total_interes=$datos[1];
$total=$datos[2];
$totalPago=$datos[3];
$deudaActua=$datos[4];
$TotalDiasAtrasado=$datos[5];
//$datos[6]=$nrodecuotasatrazado;
//$datos[7]=$TotalApagarSinInteres;
//$datos[8]=$DeudaPendiente;
$stylecolor=$datos[9];
if($nroCancelado==0){
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
$mostrarTituloFactura=$tituloPagos!=="";

$total_interes = ceil($total_interes / 1000) * 1000;
$total = ceil($total / 1000) * 1000;
$deudaActua = ceil($deudaActua / 1000) * 1000;


$fechapago = date("d-m-Y", strtotime($fechapago));

$styleName=CargarStyleTable($styleName);
$filas[] = array(
	"id_credito" => $idcredito,
	"id_venta" => $cod_venta,
	"numero_factura" => $nrof,
	"mostrar_titulo_factura" => $mostrarTituloFactura,
	"plazo" => $plazo,
	"fecha_pago" => $fechapago,
	"monto" => $Monto,
	"monto_formateado" => number_format($Monto,'0',',','.'),
	"descuento" => $descuento,
	"descuento_formateado" => number_format($descuento,'0',',','.'),
	"total_interes" => $total_interes,
	"total_interes_formateado" => number_format($total_interes,'0',',','.'),
	"total" => $total,
	"total_formateado" => number_format($total,'0',',','.'),
	"total_pagado" => $totalPago,
	"total_pagado_formateado" => number_format($totalPago,'0',',','.'),
	"deuda_actual" => $deudaActua,
	"deuda_actual_formateada" => number_format($deudaActua,'0',',','.'),
	"dias_atraso" => $TotalDiasAtrasado,
	"cantidad_pagos" => $cantidad,
	"clase_fila" => $styleName,
	"estilo_fila" => $stylecolor
);
if(!$devolverArray){
$pagina.=$tituloPagos."
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' style='$stylecolor' >
<td id='' style='width:10%' >".$plazo."</td>
<td id='' style='width:10%' >".$fechapago."</td>
<td id='' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($deudaActua,'0',',','.')."</td>
<td id='' style='width:10%'>".$TotalDiasAtrasado."</td>
<td id='' style='width:10%'>".$cantidad."</td>

</tr>
</table>
";
}
	}
}

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3"=>$nroRegistro,"4"=> number_format($deuda,'0',',','.') );
echo json_encode($informacion);	
exit;
}

function cuentasClientesCobrados($buscar,$formato='')
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	

$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,datediff(cr.fechapago,(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1)) as diff,vt.total_venta,interes,dias,vt.pago as entrega,
total,totalinteres,totaldeuda,vt.num_factura,cr.descuento,vt.puntoexpedicion,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado,
(select count(pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito ) as cantidad
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)>= ((cr.Monto+totalinteres)-cr.descuento) and vt.cod_venta='".$buscar."'
 group by cr.idcredito order by cr.cod_venta asc,cr.fechapago asc ";

 
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
$totalPagado = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$deuda = "0";
$styleName="tableRegistroSearch";



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


$idcredito = utf8_encode($valor['idcredito']);/*Obtenemos el registro mediante el nombre del atributo */      
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$fechapagado = utf8_encode($valor['fechapagado']);
$cantidad = utf8_encode($valor['cantidad']);
$num_factura = utf8_encode($valor['num_factura']);
$descuento = utf8_encode($valor['descuento']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
 $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
$deudaActua=$total-($totalPago+$descuento);
$deuda=$deuda+$deudaActua;

$totalPagado=$totalPagado+$totalPago;
$totalInteres=$totalInteres+$tinteres;
$totalDescuento=$totalDescuento+$descuento;


/*$diff=0;

$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy))));
$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));
$interval=$datetime2->diff($datetime1);
$diff=$interval->format('%a');*/
$stylecolor=" ";
if($diff<0){
	$diff=$diff*-1;
	$stylecolor=" background-color: red;color:#fff";
}else{
		$diff=0;
}




	

if($deudaActua<=0){

	$stylecolor="background-color: #ccc;color:#000";
	$Esado="Pagado";
}else{
	$Esado="Pendiente";
	if($controlStyle==""){
	$stylecolor=" background-color: #2e70e8;color:#fff";
	$controlStyle="off";
}


}
$total_interes=$tinteres;
// if($Esado=="Pendiente"){
// $control=verificar_fecha_expiracion($fechapago);
	// if($control=="si"){
					
			
				// $fechahoy=date('Y-m-d');	
				// $datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy))));
				// $datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));
				// $interval=$datetime2->diff($datetime1);

		// $diff=$interval->format('%a');
	// $diasGracia=$diff-$dias;
	
			   // if($diasGracia>0){
				    // if($interes!=0){
				  
			  // $i=($interes*($Monto))/100;
			 
			  // $total_interes=($i*$diff);
			  // $t=($Monto)+$total_interes;
			  // $totalInteres=$totalInteres+$total_interes;
			  // $total=$t;
		    // $deudaActua=$t-$totalPago;
			// actualizarTotalCuota($idcredito,$total,$total_interes,$t);
					// }
			   // }else{
				   
					 // $diff="0";
				 
			   // }
				// }
// }else{
	
// }
  	$stylecancel="";
	if($nroCancelado>0){
		$stylecancel="text-decoration: line-through; ";
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

$filas[]=array(
	"id_credito" => $idcredito,
	"cod_venta" => $cod_venta,
	"nro_factura" => $nrof,
	"plazo" => intval($plazo),
	"fecha_vencimiento" => $fechapago,
	"fecha_pago" => $fechapagado,
	"dias_atraso" => intval($diff),
	"monto" => floatval($Monto),
	"monto_formateado" => number_format($Monto,'0',',','.'),
	"total_interes" => floatval($total_interes),
	"total_interes_formateado" => number_format($total_interes,'0',',','.'),
	"descuento" => floatval($descuento),
	"descuento_formateado" => number_format($descuento,'0',',','.'),
	"cancelado" => $nroCancelado>0
);

$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' style='$stylecancel' >
<td id='' style='width:5%' >".$plazo."</td>
<td id='' style='width:20%' >".$fechapago."</td>
<td id='' style='width:20%' >".$fechapagado."</td>
<td id='' style='width:5%'>".$diff."</td>
<td id='' style='width:12%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:13%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='width:12%'>". number_format($descuento,'0',',','.')."</td>
</tr>
</table>
";

}
}

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3"=>$nroRegistro
,"4"=> number_format($totalPagado,'0',',','.'),"5"=> number_format($totalInteres,'0',',','.') ,"6"=> number_format($totalDescuento,'0',',','.') );
echo json_encode($informacion);	
exit;
}

function cuentasClientesPendientes($buscar,$formato='')
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	

$sql= "select vt.puntoexpedicion,cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,datediff(cr.fechapago,(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1)) as diff,vt.total_venta,interes,dias,vt.pago as entrega,
total,totalinteres,totaldeuda,vt.num_factura,cr.descuento,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0) as totalPagoCredito,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Interes'),0) as totalPagoInteres,
(select count(pg.Fecha) from pago pg where pg.cod_creditoFK=cr.idcredito ) as cantidad
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta where
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)< ((cr.Monto+totalinteres)-cr.descuento) and vt.cod_venta='".$buscar."'
 group by cr.idcredito order by cr.cod_venta asc,cr.fechapago asc ";



 
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
$filas = array();
$totalPagado = "0";  
$deuda = "0";  
$MontoCuotas = "0";  
$nrodecuotasatrazado = "0";  
$TotalApagarSinInteres = "0";
$styleName="tableRegistroSearch";


  
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


$idcredito = utf8_encode($valor['idcredito']);  
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$diff = utf8_encode($valor['diff']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$fechapagado = utf8_encode($valor['fechapagado']);
$cantidad = utf8_encode($valor['cantidad']);
$num_factura = utf8_encode($valor['num_factura']);
$descuento = utf8_encode($valor['descuento']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$totalPagoCredito = utf8_encode($valor['totalPagoCredito']);
$totalPagoInteres = utf8_encode($valor['totalPagoInteres']);
$MontoConDescuento=$Monto-$descuento;
$MontoSobrante=$MontoConDescuento-$totalPago;
if($MontoCuotas==0){
$MontoCuotas=$MontoConDescuento-$totalPago;
}
$deudaActua=0;
$total_interes=0;
$TotalSinInteres=0;
$deuda_Actual_interes=0;
$DeudaPendiente=0;
$stylecolor=" ";
$event=" ";
if($nroCancelado==0){
	
	if(($Monto+$tinteres)>($totalPago+$descuento)){
	$Esado="Pendiente";
	$TotalSinInteres=$Monto-($totalPagoCredito+$descuento);	
	if($diff<0){
	$diff=$diff*-1;
	editarDiasAtrazadosdesdecalcularcredito($cod_clienteFK,$diff);
	actualizardiasatrazadocredito($idcredito,$diff);
	$stylecolor=" background-color: #313030;color:#FFEB3B";
	}else{
	$diff=0;
    }
	$control=verificar_fecha_expiracion($fechapago);
	if($control=="si"){
	$TotalApagarSinInteres=$TotalApagarSinInteres+($Monto-($totalPagoCredito+$descuento));
	$nrodecuotasatrazado=$nrodecuotasatrazado+1;
	if($interes!=0){
	$fechahoy=date('Y-m-d');	
	$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy)))); 
	$datetime3= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	$Fecha1=strtotime($FechaUltimoPago);
	$Fecha2=strtotime($fechapago);
	if($FechaPagoCredito=="0" ){
		$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	}else{
		if($Fecha1 < $Fecha2){
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));		
			}else{
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$FechaUltimoPago))));		
			}		
	}
								$interval=$datetime2->diff($datetime1);
								$diffDias=$interval->format('%a');						
								
								
								$interval2=$datetime3->diff($datetime1);
								$diffDias2=$interval2->format('%a');
								
								
								
								$interval=$datetime2->diff($datetime1);
								$diffmes=$interval->format('%m');
								$diffanho=$interval->format('%y')*12;
								
								$diffmes=$diffmes + $diffanho ;
								
																
								$diasGracia=$diffDias-$dias;
								
								if($diasGracia>0){
									// if($diffmes==0){
										$diffmes= $diffmes + 1 ;
									// }
									
								}
	if($diasGracia>0){
	$montoIn=$Monto-$totalPagoCredito;
	
	$i=($interes*($Monto))/100;
	$total_interes=($i*$diffmes);
	$t=$MontoConDescuento+$total_interes;
	$total=$t;
	$deudaActua=$t-$totalPagoCredito-$totalPagoInteres;
	$deuda_Actual_interes=$total_interes-$totalPagoInteres;	

	$total_interes=$total_interes-$totalPagoInteres;
	
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
   
	
	}	
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	 
			
	}
			
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito;
	$total=$deudaActua;	
	
	
	}
	
	
	
	}else{
	$Esado="Pagado";
	$stylecolor="background-color: #ccc;color:#000";
	$deudaActua=0;
	$total=0;
	$diff=0;
	
	}
	
	}else{
	
	
	if(($MontoConDescuento+$tinteres)>$totalPago){
	 $Esado="Pendiente";
	 $diff="0";
     $deudaActua=($MontoConDescuento+$tinteres)-$totalPago;
	 $total=$MontoConDescuento-$totalPago;
	 $stylecolor="text-decoration: line-through;";
	
	}else{
	$Esado="Pagado";
	$stylecolor="background-color: #ccc;color:#000";
	$deudaActua=0;
	$diff=0;
	$total=0;
	}
    	
	
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

$deuda=$deuda+$deudaActua;

$estilo_fila="normal";
if(strpos($stylecolor,"#313030")!==false){
	$estilo_fila="atrasada";
}elseif(strpos($stylecolor,"line-through")!==false){
	$estilo_fila="cancelada";
}elseif(strpos($stylecolor,"#ccc")!==false){
	$estilo_fila="pagada";
}

$filas[]=array(
	"id_credito" => $idcredito,
	"cod_venta" => $cod_venta,
	"nro_factura" => $nrof,
	"plazo" => intval($plazo),
	"fecha_vencimiento" => $fechapago,
	"dias_atraso" => intval($diff),
	"monto" => floatval($Monto),
	"monto_formateado" => number_format($Monto,'0',',','.'),
	"total_interes" => floatval($total_interes),
	"total_interes_formateado" => number_format($total_interes,'0',',','.'),
	"total_pagado" => floatval($totalPago),
	"total_pagado_formateado" => number_format($totalPago,'0',',','.'),
	"deuda" => floatval($deudaActua),
	"deuda_formateada" => number_format($deudaActua,'0',',','.'),
	"estado" => $Esado,
	"estilo_fila" => $estilo_fila
);


$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' style='$stylecolor' >
<td id='' style='width:10%' >".$plazo."</td>
<td id='' style='width:12%' >".$fechapago."</td>
<td id='' style='width:10%'>".$diff."</td>
<td id='' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total_interes,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($deudaActua,'0',',','.')."</td>
</tr>
</table>
";



}
}

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3"=>$nroRegistro,"4"=> number_format($deuda,'0',',','.') );
echo json_encode($informacion);	
exit;
}

//VERIFICAR USO DEL CODIGO
function cuentasacobrarwhat($buscar,$filtro,$fecha1,$fecha2,$zona,$cod_local)
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$condicionCodLocal=" and vt.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
if($filtro=="1"){
	$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=vt.cod_clienteFK  and idzonaFk='$zona') > 0 ";
	if($zona==""){
	$condicionZona="";
	}
	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.descuento,cr.totalinteres,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select fecha from mensajesenviados where idcliente=vt.cod_clienteFK limit 1) as fechaenviado,
(Select whapp from cliente where cod_cliente=vt.cod_clienteFK) as whapp,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where  IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)< ((cr.Monto+totalinteres)-cr.descuento)
 and cr.fechapago>='$fecha1' and cr.fechapago<='$fecha2' and  
 IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 and 
  (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
 concat((Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK),' ',(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK),' ',vt.num_factura) like '%".$buscar."%' ".$condicionZona.$condicionCodLocal." group by vt.cod_clienteFK order by cr.fechapago asc ";
 
}
if($filtro=="2"){
	$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=vt.cod_clienteFK  and idzonaFk='$zona') > 0 ";
	if($zona==""){
	$condicionZona="";
	}
	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.descuento,cr.totalinteres,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select fecha from mensajesenviados where idcliente=vt.cod_clienteFK limit 1) as fechaenviado,
(Select whapp from cliente where cod_cliente=vt.cod_clienteFK) as whapp,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where   IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)< ((cr.Monto+totalinteres)-cr.descuento)
 and cr.fechapago<='$fecha1' and 
 IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 and 
  (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
 concat((Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK),' ',(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK),' ',vt.num_factura) like '%".$buscar."%' ".$condicionZona.$condicionCodLocal." group by vt.cod_clienteFK order by cr.fechapago asc ";
 
}
if($filtro=="3"){
	$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=vt.cod_clienteFK  and idzonaFk='$zona') > 0 ";
	if($zona==""){
	$condicionZona="";
	}
	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.descuento,cr.totalinteres,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select whapp from cliente where cod_cliente=vt.cod_clienteFK) as whapp,
(Select fecha from mensajesenviados where idcliente=vt.cod_clienteFK limit 1) as fechaenviado,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where  IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)< ((cr.Monto+totalinteres)-cr.descuento)
 and cr.fechapago>='$fecha1' and 
 IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 and 
  (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
 concat((Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK),' ',(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK),' ',vt.num_factura) like '%".$buscar."%' ".$condicionZona.$condicionCodLocal."  group by vt.cod_clienteFK order by cr.fechapago asc ";
 
}
if($filtro=="4"){
	$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=vt.cod_clienteFK  and idzonaFk='$zona') > 0 ";
	if($zona==""){
	$condicionZona="";
	}
	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.descuento,cr.totalinteres,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select whapp from cliente where cod_cliente=vt.cod_clienteFK) as whapp,
(Select fecha from mensajesenviados where idcliente=vt.cod_clienteFK limit 1) as fechaenviado,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where  IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)< ((cr.Monto+totalinteres)-cr.descuento) and 
 IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 and 
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
concat((Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK),' ',(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK),' ',vt.num_factura) like '%".$buscar."%' ".$condicionZona.$condicionCodLocal." group by vt.cod_clienteFK order by cr.fechapago asc ";
 
}


 
$pagina = "";  
$totalPagado = "0";  
$deuda = "0";  
$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
/*Función para ejecutar sentencias sql*/
if ( ! $stmt->execute()) {
/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
$controlStyle="";
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$idcredito = utf8_encode($valor['idcredito']);/*Obtenemos el registro mediante el nombre del atributo */      
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['creditopagado']); 
$diff = utf8_encode($valor['diff']);
$clientenombre = utf8_encode($valor['clientenombre']);
$cobradornombre = utf8_encode($valor['cobradornombre']);
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']);
$total_venta = utf8_encode($valor['total_venta']);
$num_factura = utf8_encode($valor['num_factura']);
$nombrelocal = utf8_encode($valor['nombrelocal']);
$whapp = utf8_encode($valor['whapp']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$fechaenviado = utf8_encode($valor['fechaenviado']);
$datos=buscardatoscuentasacobrarporcliente($cod_clienteFK,$fecha1,$fecha2,$filtro);

if($whapp!=""){
$deudaActua=$total_venta-$totalPago;
$totalPagado=$totalPagado+$totalPago;



  	$deuda=$deuda+$datos[1];
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' id='Princ_What_".$cod_clienteFK."'>
<tr  id='What_".$idcredito."' >
<td id='' style='width:10%' >".$fechaenviado."</td>
<td id='' style='width:10%' >".$datos[3]."</td>
<td id='td_datos_2' style='width:10%' >".$whapp."</td>
<td id='' style='width:10%' >".$clientenombre."</td>
<td id='td_datos_3' style='width:10%' >Hola, ".$clientenombre."  tienes una cuenta pendiente de ". number_format($datos[1],'0',',','.')."Gs en Multi Cell </td>
<td id='' style='width:10%' ><input type='button' value='Enviar' id='$idcredito' onclick='EnviarWhat(this)' style='cursor:pointer;height:30px;margin:5px;' /></td>
<td id='td_datos_1' style='display:none'>".$cod_clienteFK."</td>
<td id='' style='width:10%;text-aling:center' ><input type='checkbox' id='$cod_clienteFK' onclick='marcarcomoenviado(this)'  /></td>
</tr>
</table>
";
}


}
}

 mysqli_close($mysqli);     
$informacion =array("1" => "exito","2" => $pagina,"3" =>number_format($nroRegistro,'0',',','.') ,"4" =>number_format($deuda,'0',',','.') );
echo json_encode($informacion);	
exit;
}








function actualizarMetodo($cod_venta,$Metodo){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update venta set TipoPago=?,TipoVenta='CREDITO' where cod_venta=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$Metodo,$cod_venta); 

if (!$stmt1->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 mysqli_close($mysqli);

}

function actualizarGarante($cod_venta,$idGaranteFk){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update venta set idGaranteFk=? where cod_venta=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$idGaranteFk,$cod_venta); 

if (!$stmt1->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 mysqli_close($mysqli);

}





function cambiarplazos($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select idcredito  from credito where cod_venta='$buscar' and plazo!='ENTREGA' and  plazo!='Contado'  "; 
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$nro=1;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$idcredito = utf8_encode($valor['idcredito']);
$plazo=$nro."/".$nroRegistro;
actualizarplazocredito($idcredito,$plazo);
$nro=$nro+1;

}
}
 mysqli_close($mysqli);
}
function actualizarplazocredito($idcredito,$plazo){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update credito set plazo=? where idcredito=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$plazo,$idcredito);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
}

/*Buscar */
// function buscar_detalles_venta_en_cuentas_a_cobrar($buscar,$codclienteFK)
// {
// $mysqli=conectar_al_servidor();

// $sql= "select pr.nombre_producto,dtv.detalleproducto,
 // IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
// IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
// IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 // from
 // venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 // inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 // where vt.cod_venta='$buscar' ";
// $pagina = "";   
// $pagina2 = "";   
// $stmt = $mysqli->prepare($sql);
// if ( ! $stmt->execute()) {
// echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
// exit;
// }
// $cod_venta = $buscar;
// $result = $stmt->get_result();
// $valor= mysqli_num_rows($result);
// $nroRegistro=$valor;
// $a=1;
// if ($valor>0)
// {
// while ($valor= mysqli_fetch_assoc($result))
// {  



// $nombre_producto = utf8_decode($valor['nombre_producto']);      
// $nroDevoluciones = utf8_decode($valor['nroDevoluciones']);      
// $nroCambios = utf8_decode($valor['nroCambios']);      
// $nroGarantia = utf8_decode($valor['nroGarantia']);      
// $detalleproducto = utf8_decode($valor['detalleproducto']);      
// if($nroDevoluciones==0 && $nroCambios==0){
		// if($pagina==""){
			// $pagina.=$a.") &nbsp".$nombre_producto;	
		// }else{
			// $pagina.="<br>".$a.") &nbsp".$nombre_producto;	
		// }
  // $a=$a+1;  
  
  
  
   // $pagina2.="
			  // <table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
			  // <tr id='tbSelecRegistro' onclick='obtenerdatoscreditodetalle(this)'>
			  // <td id='td_id_1' style='display:none;'>".$cod_venta."</td>
			  // <td id='td_id_2' style='display:none;'>".$codclienteFK."</td>
			  // <td id=''style='width:100%' >".$nombre_producto."</td>
			  // </tr>
			  // </table>";
  
// }

// }
// }

// $datos[0]=$pagina;
// $datos[1]=$pagina2;

// mysqli_close($mysqli);
// return $datos;
// }





function capturar_error_busqueda_detalles_venta($mensaje, $detalle = "")
{
    $texto = "[buscar_detalles_venta_en_cuentas_a_cobrar] " . $mensaje;
    
    if ($detalle != "") {
        $texto .= " | Detalle: " . $detalle;
    }

    error_log($texto);
}

function buscar_detalles_venta_en_cuentas_a_cobrar($buscar, $codclienteFK)
{
    $datos = array();
    $datos[0] = "";
    $datos[1] = "";
    $datos[2] = "error";
    $datos[3] = "";
    $datos[4] = array();

    $pagina  = "";
    $pagina2 = "";
    $a = 1;

    try {
        $mysqli = conectar_al_servidor();
	mysqli_set_charset($mysqli, "utf8");
        if (!$mysqli) {
            $datos[3] = "No se pudo conectar al servidor.";
            capturar_error_busqueda_detalles_venta($datos[3]);
            return $datos;
        }

        if (mysqli_connect_errno()) {
            $datos[3] = "Error de conexión a MySQL.";
            capturar_error_busqueda_detalles_venta($datos[3], mysqli_connect_error());
            return $datos;
        }

        $sql = "SELECT 
                    pr.nombre_producto,
                    dtv.detalleproducto,
                    IFNULL((SELECT COUNT(fecha) 
                            FROM cambios 
                            WHERE coddetalleventa = dtv.cod_detalle 
                              AND motivo = 'Devolucion'), 0) AS nroDevoluciones,
                    IFNULL((SELECT COUNT(fecha) 
                            FROM cambios 
                            WHERE coddetalleventa = dtv.cod_detalle 
                              AND motivo = 'Cambio'), 0) AS nroCambios,
                    IFNULL((SELECT COUNT(fecha) 
                            FROM cambios 
                            WHERE coddetalleventa = dtv.cod_detalle 
                              AND motivo = 'Garantia'), 0) AS nroGarantia
                FROM venta vt
                INNER JOIN detalle_venta dtv ON vt.cod_venta = dtv.cod_ventaFK
                INNER JOIN producto pr ON pr.cod_producto = dtv.cod_productoFK
                WHERE vt.cod_venta = ?";

        $stmt = $mysqli->prepare($sql);

        if (!$stmt) {
            $datos[3] = "Error al preparar la consulta.";
            capturar_error_busqueda_detalles_venta($datos[3], $mysqli->error);
            mysqli_close($mysqli);
            return $datos;
        }

        if (!$stmt->bind_param("s", $buscar)) {
            $datos[3] = "Error al enlazar parámetro.";
            capturar_error_busqueda_detalles_venta($datos[3], $stmt->error);
            $stmt->close();
            mysqli_close($mysqli);
            return $datos;
        }

        if (!$stmt->execute()) {
            $datos[3] = "Error al ejecutar la consulta.";
            capturar_error_busqueda_detalles_venta($datos[3], $stmt->error);
            $stmt->close();
            mysqli_close($mysqli);
            return $datos;
        }

        $result = $stmt->get_result();

        if (!$result) {
            $datos[3] = "No se pudo obtener el resultado de la consulta.";
            capturar_error_busqueda_detalles_venta($datos[3], $stmt->error);
            $stmt->close();
            mysqli_close($mysqli);
            return $datos;
        }

        while ($fila = $result->fetch_assoc()) {

            $nombre_producto = isset($fila['nombre_producto']) ? $fila['nombre_producto'] : "";
            $detalleproducto = isset($fila['detalleproducto']) ? $fila['detalleproducto'] : "";
            $nroDevoluciones = isset($fila['nroDevoluciones']) ? (int)$fila['nroDevoluciones'] : 0;
            $nroCambios      = isset($fila['nroCambios']) ? (int)$fila['nroCambios'] : 0;
            $nroGarantia     = isset($fila['nroGarantia']) ? (int)$fila['nroGarantia'] : 0;

            // Seguridad al imprimir en HTML
            $nombre_producto_html = htmlspecialchars($nombre_producto, ENT_QUOTES, 'UTF-8');
            $detalleproducto_html = htmlspecialchars($detalleproducto, ENT_QUOTES, 'UTF-8');
            $cod_venta_html       = htmlspecialchars($buscar, ENT_QUOTES, 'UTF-8');
            $codclienteFK_html    = htmlspecialchars($codclienteFK, ENT_QUOTES, 'UTF-8');

            if ($nroDevoluciones == 0 && $nroCambios == 0) {

                $datos[4][] = $nombre_producto;

                if ($pagina == "") {
                    $pagina .= $a . ") &nbsp;" . $nombre_producto_html;
                } else {
                    $pagina .= "<br>" . $a . ") &nbsp;" . $nombre_producto_html;
                }

                $pagina2 .= "
                <table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
                    <tr id='tbSelecRegistro' onclick='obtenerdatoscreditodetalle(this)'>
                        <td id='td_id_1' style='display:none;'>" . $cod_venta_html . "</td>
                        <td id='td_id_2' style='display:none;'>" . $codclienteFK_html . "</td>
                        <td style='width:100%;'>" . $nombre_producto_html . "</td>
                    </tr>
                </table>";

                $a++;
            }
        }

        $datos[0] = $pagina;
        $datos[1] = $pagina2;
        $datos[2] = "ok";
        $datos[3] = "";

        $stmt->close();
        mysqli_close($mysqli);

        return $datos;

    } catch (Exception $e) {
        $datos[3] = "Excepción capturada en la función.";
        capturar_error_busqueda_detalles_venta($datos[3], $e->getMessage());

        if (isset($stmt) && $stmt) {
            $stmt->close();
        }

        if (isset($mysqli) && $mysqli) {
            mysqli_close($mysqli);
        }

        return $datos;
    }
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

function editarDiasAtrazados($codCliente,$nroDias)
{
	
$mysqli=conectar_al_servidor(); 
$consulta1="Update cliente set totaldias='$nroDias' where cod_cliente='$codCliente' and totaldias<'$nroDias' ";	
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
	
}

/*Buscar */
function editarDetallesVenta($buscar,$observacion)
{
$mysqli=conectar_al_servidor();

$sql= "select dtv.cod_detalle,dtv.detalleproducto
 from venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 where vt.cod_venta='$buscar' ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$a=1;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_detalle = utf8_decode($valor['cod_detalle']); 
if($observacion!=""){
	if($valor['detalleproducto']!=""){
	$detalleproducto = $observacion." *".utf8_decode($valor['detalleproducto']);
	}else{
	$detalleproducto = $observacion;
	}
}else{
	$detalleproducto = " *".utf8_decode($valor['detalleproducto']);
}
     
editardetallesventacredito($detalleproducto,$cod_detalle);

}
}
 mysqli_close($mysqli);
return utf8_decode($pagina);
}

function editardetallesventacredito($detalleproducto,$cod_detalle)
{
	
$mysqli=conectar_al_servidor(); 
$consulta1="Update detalle_venta set detalleproducto='$detalleproducto' where cod_detalle='$cod_detalle'  ";	
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
	
}

function cuentasclientemoroso($cliente,$fecha,$tipo,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');

// $condicionFiltro=" and cr.fechapago <= '$fecha'";
$condicionFiltro=" ";

$tipo = explode("_", $tipo);
$nuevo_tipo = array();
foreach ($tipo as $elemento) {
    if ($elemento !== "") {
        $nuevo_tipo[] = $elemento;
    }
}

$CondicionFiltroSegundo="";
 
if(count($nuevo_tipo) == 2){
	$CondicionFiltroSegundo="   and if(DATEDIFF('".$fecha."',(select fechapago from credito cr inner join venta v on 
  v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK
  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and
 IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) 
 order by fechapago asc limit 1))>0,DATEDIFF('".$fecha."',(select fechapago from credito cr inner join venta v on 
  v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK
  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and
 IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) 
 order by fechapago asc limit 1)),0) between '".$nuevo_tipo[0]."' and '".$nuevo_tipo[1]."'";
}

if(count($nuevo_tipo) == 1){
	
	if($nuevo_tipo[0] == 1){
		$CondicionFiltroSegundo=" and  cr.fechapago <= '".$fecha."'";
	}
	
	if($nuevo_tipo[0] == 2){
		$CondicionFiltroSegundo=" ";
	}
	
	
	
	if($nuevo_tipo[0] == 3){
		$CondicionFiltroSegundo=" and DATEDIFF('".$fecha."',(select fechapago from credito cr inner join venta v on v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK and cr.fechapago<='".$fecha."'  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and
 IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) 
 order by fechapago asc limit 1))>=180 ";
	}
	if($nuevo_tipo[0] == 4){
		$CondicionFiltroSegundo="  and  cr.fechapago <= '".$fecha."'  ";
	}
}



$condicioncliente=" ";
	if($cliente!=""){
	 $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%".$cliente."%' ";
}
	
	$condiciontipoestado ="and (Select cod_tipomora from cliente where cod_cliente=vt.cod_clienteFK) not in (12,13,14) ";

	$sql= "select  (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,vt.cod_clienteFK,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
(Select cod_tipomora from cliente where cod_cliente=cod_clienteFK) as cod_tipomora,
vt.cod_venta,
 (Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cr.cod_venta)) as nombrezona,
(Select direccion from persona where cod_persona=vt.cod_clienteFK) as direccion,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono , 

if(DATEDIFF('".$fecha."',(select fechapago from credito cr inner join venta v on 
  v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK
  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and
 IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) 
 order by fechapago asc limit 1))>0,DATEDIFF('".$fecha."',(select fechapago from credito cr inner join venta v on 
  v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK
  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and
 IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) 
 order by fechapago asc limit 1)),0) as atraso , 
 
 (select fechapago from credito cr inner join venta v on 
  v.cod_venta=cr.cod_venta where vt.cod_clienteFK=v.cod_clienteFK
  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=v.cod_venta limit 1),0)=0 and
 IFNULL((Select sum(Monto) from pago where cod_creditoFK = idcredito and Tipo='Pago Cuota'),0)<(cr.Monto - cr.descuento) 
 order by fechapago asc limit 1) as fecha_pago
 
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionFiltro.$CondicionFiltroSegundo.$condicioncliente.$condiciontipoestado." group by vt.cod_clienteFK order by atraso asc  ";
		
		// echo($sql);
		// exit;
 set_time_limit(2147483647);
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
$array_cod_cliente = array();
$array_cod_venta = array();
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

// $referencia = utf8_encode($valor['referencia']);
$documento = utf8_encode($valor['documento']);
$clientenombre = utf8_encode($valor['clientenombre']);
$direccion = utf8_encode($valor['direccion']);
$nombrezona = utf8_encode($valor['nombrezona']);
$telefono = utf8_encode($valor['telefono']);
$telefono = utf8_encode($valor['telefono']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$atraso = utf8_encode($valor['atraso']);
$fecha_pago = utf8_encode($valor['fecha_pago']);
$cod_venta = utf8_encode($valor['cod_venta']);

$referenciaCliente=buscarReferenciaCliente($cod_clienteFK,$devolverArray ? "json" : "");

$styleName=CargarStyleTable($styleName);
$filas[] = array(
	"documento" => $documento,
	"cliente" => $clientenombre,
	"direccion" => $direccion,
	"referencias" => $devolverArray ? $referenciaCliente : array(),
	"zona" => $nombrezona,
	"telefono" => $telefono,
	"atraso" => $atraso,
	"fecha_pago" => $fecha_pago,
	"id_venta" => $cod_venta,
	"id_cliente" => $cod_clienteFK,
	"clase_fila" => $styleName
);
if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='' >
<td  id='' style='width:10%'>".$documento."</td>
<td  id='' style='width:20%'>".$clientenombre."</td>
<td  id='' style='width:20%'>".$direccion."</td>
<td  id='' style='width:10%'>".$referenciaCliente."</td>
<td  id='' style='width:10%'>".$nombrezona."</td>
<td  id='' style='width:10%'>".$telefono."</td>
<td  id='' style='width:10%'>".$atraso."</td>
<td  id='' style='width:10%'>".$fecha_pago."</td>
<td  id='' style='display:none'>".$cod_venta."</td>
</tr>
</table>";
}


array_push($array_cod_cliente,$cod_clienteFK);
array_push($array_cod_venta,$cod_venta);

}
}



 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3"=>$nroRegistro, "4"=>$array_cod_cliente, "5"=>$array_cod_venta);
echo json_encode($informacion);	
exit;
}

function buscar_clientes_informconf($fecha_ingreso,$cliente,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
	
	$condicionfechaingreso = "";
	if($fecha_ingreso != ""){
		$condicionfechaingreso = " and (SELECT fecha_ingreso from detalles_informconf where cod_cliente = cod_clienteFK) = '$fecha_ingreso'";
	}
	
	$condicioncliente = "";
	if($cliente != ""){
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) like '%".$cliente."%'";
	}

	$sql= "select (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) as clientenombre,cod_cliente,
	IFNULL((SELECT fecha_ingreso from detalles_informconf where cod_cliente = cod_clienteFK),'') as fecha_ingreso,
	(SELECT cod_venta from venta where cod_cliente = cod_clienteFK order by cod_venta desc limit 1) cod_venta
	from cliente where (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) != 'CLIENTE OCASIONAL'".$condicionfechaingreso.$condicioncliente." order by clientenombre limit 50";
 
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
$styleName = 'tableRegistroSearch';
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{


$clientenombre = utf8_encode($valor['clientenombre']);
$cod_cliente = utf8_encode($valor['cod_cliente']);
$fecha_ingreso = utf8_encode($valor['fecha_ingreso']);
$cod_venta = utf8_encode($valor['cod_venta']);


$inputFechaIngreso = "";
if($fecha_ingreso == ""){
	$inputFechaIngreso = "<input type='date' value='' class='inputText' onchange='cambiarFechaInformconf(this)' />";
}else{
	$inputFechaIngreso = "<input type='date' value='".$fecha_ingreso."' class='inputText' onchange='cambiarFechaInformconf(this)' />";
}


$detalle_venta = buscar_detalles_venta($cod_venta);

$styleName=CargarStyleTable($styleName);
$filas[] = array(
	"id_cliente" => $cod_cliente,
	"id_venta" => $cod_venta,
	"cliente" => $clientenombre,
	"detalle_venta" => $detalle_venta,
	"fecha_ingreso" => $fecha_ingreso,
	"clase_fila" => $styleName
);
if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosInformeInformconf(this)' >
<td  id='td_id_1' style='display:none'>".$cod_cliente."</td>
<td  id='td_id_2' style='display:none'>".$cod_venta."</td>
<td  id='' style='width:40%'>".$clientenombre."</td>
<td  id='' style='width:40%'>".$detalle_venta."</td>
<td  id='' style='width:20%'>".$inputFechaIngreso."</td>
</tr>
</table>";


}
}
}



	$sql= "select (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) as clientenombre,cod_cliente,
	IFNULL((SELECT fecha_ingreso from detalles_informconf where cod_cliente = cod_clienteFK),'') as fecha_ingreso,
	(SELECT cod_venta from venta where cod_cliente = cod_clienteFK order by cod_venta desc limit 1) cod_venta
	from cliente where (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) != 'CLIENTE OCASIONAL'".$condicionfechaingreso.$condicioncliente." order by cod_cliente";
	
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3"=> number_format($nroRegistro,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistro);
echo json_encode($informacion);	
exit;
}

function buscar_mas_clientes_informconf($fecha_ingreso,$cliente,$registrocargado,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');


$condicionfechaingreso = "";
	if($fecha_ingreso != ""){
		$condicionfechaingreso = " and (SELECT fecha_ingreso from detalles_informconf where cod_cliente = cod_clienteFK) = '$fecha_ingreso'";
	}
	$condicioncliente = "";
	if($cliente != ""){
		$condicioncliente = " and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) like '%".$cliente."%'";
	}

	$sql= "select (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) as clientenombre,cod_cliente,
	IFNULL((SELECT fecha_ingreso from detalles_informconf where cod_cliente = cod_clienteFK),'') as fecha_ingreso,
	(SELECT cod_venta from venta where cod_cliente = cod_clienteFK order by cod_venta desc limit 1) cod_venta
	from cliente where (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_cliente) != 'CLIENTE OCASIONAL'".$condicionfechaingreso.$condicioncliente." order by clientenombre limit ".$registrocargado." , 25 ";
 

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
$nroRegistro=$valor+$registrocargado;
$controlStyle="";
$styleName = 'tableRegistroSearch';
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$clientenombre = utf8_encode($valor['clientenombre']);
$cod_cliente = utf8_encode($valor['cod_cliente']);
$fecha_ingreso = utf8_encode($valor['fecha_ingreso']);
$cod_venta = utf8_encode($valor['cod_venta']);


$inputFechaIngreso = "";
if($fecha_ingreso == ""){
	$inputFechaIngreso = "<input type='date' value='' class='inputText' onchange='cambiarFechaInformconf(this)' />";
}else{
	$inputFechaIngreso = "<input type='date' value='".$fecha_ingreso."' class='inputText' onchange='cambiarFechaInformconf(this)' />";
}

$detalle_venta = buscar_detalles_venta($cod_venta);

$styleName=CargarStyleTable($styleName);
$filas[] = array(
	"id_cliente" => $cod_cliente,
	"id_venta" => $cod_venta,
	"cliente" => $clientenombre,
	"detalle_venta" => $detalle_venta,
	"fecha_ingreso" => $fecha_ingreso,
	"clase_fila" => $styleName
);
if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosInformeInformconf(this)' >
<td  id='td_id_1' style='display:none'>".$cod_cliente."</td>
<td  id='td_id_2' style='display:none'>".$cod_venta."</td>
<td  id='' style='width:40%'>".$clientenombre."</td>
<td  id='' style='width:40%'>".$detalle_venta."</td>
<td  id='' style='width:20%'>".$inputFechaIngreso."</td>
</tr>
</table>";



}
}
}



 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3"=> number_format($nroRegistro,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscar_detalles_venta($cod_venta)
{
$mysqli=conectar_al_servidor();

$sql= "select pr.nombre_producto from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$cod_venta' ";
 
 // echo $sql;
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
$nombre_producto = utf8_encode($valor['nombre_producto']);      
   
$pagina.= "*".$nombre_producto;

}
}

$pagina .= "*";
 mysqli_close($mysqli); 
return $pagina;
}


function ambFechaIngresoInformeInformconf($fecha,$cod_clienteFK,$cod_ventaFK){
	$mysqli = conectar_al_servidor();
	
	
	$sqldelete = "DELETE from detalles_informconf where cod_clienteFK = $cod_clienteFK and cod_ventaFK = '$cod_ventaFK'";
	$stmt = $mysqli->prepare($sqldelete);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
	
	$sql = "INSERT INTO detalles_informconf (cod_clienteFK,cod_ventaFK,estado,fecha_ingreso) values ('$cod_clienteFK','$cod_ventaFK','Activo','$fecha')";
	$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function cambiarEstadoInformeInforconf($cod_clienteFK,$cod_ventaFK){
	$mysqli = conectar_al_servidor();
	
	
	$sql = "UPDATE detalles_informconf SET estado = 'ELIMINADO',fecha_ingreso = '' where cod_clienteFK = $cod_clienteFK and cod_ventaFK = '$cod_ventaFK'";
	$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function obtener_ult_fechapago($cod_venta)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	$sql= "select IFNULL(pg.Fecha,'') as Fecha,vt.cod_venta from venta vt
inner join pago pg on vt.cod_venta = pg.cod_venta_fk where vt.cod_venta = '$cod_venta' order by pg.Fecha desc limit 1";
		
   
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
  $styleName="tableRegistroSearch";
 $Fecha = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $Fecha=$valor['Fecha'];
	  }
 }
 
mysqli_close($mysqli);
return $Fecha;

}
function cuentasacobrarcallcenter($cod_clienteFK,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	

	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.tipo_comprobante,vt.puntoexpedicion,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.totalinteres,cr.descuento,vt.TipoVenta,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
IFNULL((Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lat,
IFNULL((Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lot,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  and vt.cod_clienteFK = '$cod_clienteFK'  group by cr.cod_venta order by  vt.cod_venta asc limit 100 ";

 
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
$totalPagado = "0";  
$totalacobrar = "0";  
$deuda = "0";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']); 
$idcredito = utf8_encode($valor['idcredito']);    
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$creditopagado = utf8_encode($valor['creditopagado']); 
$diff = utf8_encode($valor['diff']);
$clientenombre = utf8_encode($valor['clientenombre']);
$cobradornombre = utf8_encode($valor['cobradornombre']);
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']);
$total_venta = utf8_encode($valor['total_venta']);
$num_factura = utf8_encode($valor['num_factura']);
$nombrelocal = utf8_encode($valor['nombrelocal']);
$telefono = utf8_encode($valor['telefono']);
$descuento = utf8_encode($valor['descuento']);
$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$nroCouta = utf8_encode($valor['nroCouta']);
$TipoVenta = utf8_encode($valor['TipoVenta']);
$documento = utf8_encode($valor['documento']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$lat = utf8_encode($valor['lat']);
$lot = utf8_encode($valor['lot']);

$datos=calcularintereses2($cod_venta,0,0,"2","3","2","si");


$totalEnDescuento=$datos[0];
$TotalEnInteres=$datos[1];
$TotalEnDeuda=$datos[2];
$TotalEnPagado=$datos[3];
$TotalAPagar=$datos[4];
$TotalDiasAtrasado=$datos[15];
$cuotasatrazadas=$datos[6];
$TotalApagarSinInteres=$datos[7];
$DeudaPendiente=$datos[8];
$TotalInteresPagado=$datos[12];
$TotalPagadoSinInteres=$datos[13];


if($TipoVenta=="CREDITO"){
 $cuotas=$nroCouta."/".buscarcantidadcuotapagados($cod_venta);
}else{
	$cuotas="CONTADO";
}

if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}


$deuda=$deuda+$datos[4];
$totalacobrar=$totalacobrar+$datos[8];


$nueva_fecha = date("d-m-Y", strtotime($fechapago));

$Detalle_VentaProducto= buscar_detalles_venta_en_cuentas_a_cobrar($cod_venta,'') ;

$styleName=CargarStyleTable($styleName);
$filas[] = array(
	"id_cliente" => $cod_clienteFK,
	"id_venta" => $cod_venta,
	"numero_factura" => $num_factura,
	"plazo" => $plazo,
	"cliente" => $clientenombre,
	"documento" => $documento,
	"telefono" => $telefono,
	"factura" => $nrof,
	"productos" => isset($Detalle_VentaProducto[4]) && is_array($Detalle_VentaProducto[4]) ? $Detalle_VentaProducto[4] : array(),
	"cobrador" => $cobradornombre,
	"total_venta" => number_format($total_venta,'0',',','.'),
	"fecha_vencimiento" => $nueva_fecha,
	"fecha_pago" => $fechapago,
	"cuotas" => $cuotas,
	"monto_cuota" => number_format($Monto,'0',',','.'),
	"descuento" => number_format($totalEnDescuento,'0',',','.'),
	"interes_pagado" => number_format($TotalInteresPagado,'0',',','.'),
	"pagado_sin_interes" => number_format($TotalPagadoSinInteres,'0',',','.'),
	"total_pagado" => number_format($TotalEnPagado,'0',',','.'),
	"total_interes" => number_format($TotalEnInteres,'0',',','.'),
	"cuotas_atrasadas" => $cuotasatrazadas,
	"dias_atrasados" => $TotalDiasAtrasado,
	"deuda_pendiente" => number_format($DeudaPendiente,'0',',','.'),
	"total_deuda" => number_format($TotalEnDeuda,'0',',','.'),
	"total_a_pagar" => number_format($TotalAPagar,'0',',','.'),
	"pago_acumulado" => number_format($totalPagado,'0',',','.'),
	"total_venta_oculto" => number_format($total_venta,'0',',','.'),
	"id_cobrador" => $cod_cobradorFK,
	"local" => $nombrelocal,
	"tipo_comprobante" => $tipo_comprobante,
	"punto_expedicion" => $puntoexpedicion,
	"total_sin_interes" => number_format($TotalApagarSinInteres,'0',',','.'),
	"vendedor" => $nombrevendedor1,
	"latitud" => $lat,
	"longitud" => $lot,
	"clase_fila" => $styleName
);
if(!$devolverArray){
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoscuentaacobrarcallcenter(this)' >
<td id='td_id_1' style='display:none' >".$cod_clienteFK."</td>
<td id='td_datos_1' style='display:none' >".$cod_venta."</td>
<td id='td_datos_2' style='display:none' >".$num_factura."</td>
<td id='' style='display:none' >".$plazo."</td>
<td id='td_datos_26' style='display:none' >".$clientenombre."</td>
<td id='' style='display:none' >".$documento."</td>
<td id='' style='display:none' >".$telefono."</td>
<td id='' style='display:none' >".$nrof."</td>
<td id='' style='width:20%; ' >".$Detalle_VentaProducto[1]."</td>
<td id='td_datos_5' style='display:none' >".$cobradornombre."</td>
<td id='td_datos_12' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td   style='width:5%' >".$nueva_fecha."</td>
<td id='td_datos_3' style='display:none' >".$fechapago."</td>
<td id='td_datos_19' style='display:none' >".$cuotas."</td>
<td id='td_datos_6' style='display:none'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_18' style='display:none'>". number_format($totalEnDescuento,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalInteresPagado,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalPagadoSinInteres,'0',',','.')."</td>
<td id='td_datos_13' style='display:none'>". number_format($TotalEnPagado,'0',',','.')."</td>
<td id='td_datos_17' style='display:none'>". number_format($TotalEnInteres,'0',',','.')."</td>
<td id='td_datos_20' style='width:5%'>".$cuotasatrazadas."</td>
<td id='td_datos_10' style='width:5%'>".$TotalDiasAtrasado."</td>
<td id='td_datos_22' style='width:5%'>". number_format($DeudaPendiente,'0',',','.')."</td>
<td id='td_datos_11' style='display:none'>". number_format($TotalEnDeuda,'0',',','.')."</td>
<td id='td_datos_14' style='width:5%'>". number_format($TotalAPagar,'0',',','.')."</td>
<td id='td_datos_7' style='display:none'>". number_format($totalPagado,'0',',','.')."</td>
<td id='td_datos_8' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td id='td_datos_9' style='display:none'>".$cod_cobradorFK."</td>
<td id='' style='display:none'>". $nombrelocal."</td>
<td id='td_datos_15' style='display:none'>". $tipo_comprobante."</td>
<td id='td_datos_16' style='display:none'>". $puntoexpedicion."</td>
<td id='td_datos_21' style='display:none'>".  number_format($TotalApagarSinInteres,'0',',','.')."</td>
<td id='td_datos_23' style='display:none'>". $nombrevendedor1."</td>
<td id='td_datos_24' style='display:none'>". $lat."</td>
<td id='td_datos_25' style='display:none'>". $lot."</td>
</tr>
</table>";




}
}
}




 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" =>number_format($nroRegistro,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($totalacobrar,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function cuentasacobrarcallcenterventa($cod_clienteFK,$formato="")
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	

	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.tipo_comprobante,vt.puntoexpedicion,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.totalinteres,cr.descuento,vt.TipoVenta,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
IFNULL((Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lat,
IFNULL((Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lot,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  and vt.cod_clienteFK = '$cod_clienteFK'  group by cr.cod_venta order by  vt.cod_venta asc limit 100 ";

// echo($sql);
// exit;

 
$pagina = "";
$filas = array();
$devolverArray = strtolower($formato)==="json";
$totalPagado = "0";  
$totalacobrar = "0";  
$deuda = "0";  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']); 
$idcredito = utf8_encode($valor['idcredito']);    
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$creditopagado = utf8_encode($valor['creditopagado']); 
$diff = utf8_encode($valor['diff']);
$clientenombre = utf8_encode($valor['clientenombre']);
$cobradornombre = utf8_encode($valor['cobradornombre']);
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']);
$total_venta = utf8_encode($valor['total_venta']);
$num_factura = utf8_encode($valor['num_factura']);
$nombrelocal = utf8_encode($valor['nombrelocal']);
$telefono = utf8_encode($valor['telefono']);
$descuento = utf8_encode($valor['descuento']);
$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$nroCouta = utf8_encode($valor['nroCouta']);
$TipoVenta = utf8_encode($valor['TipoVenta']);
$documento = utf8_encode($valor['documento']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$lat = utf8_encode($valor['lat']);
$lot = utf8_encode($valor['lot']);

$datos=calcularintereses2($cod_venta,0,0,"2","3","2","si");


$totalEnDescuento=$datos[0];
$TotalEnInteres=$datos[1];
$TotalEnDeuda=$datos[2];
$TotalEnPagado=$datos[3];
$TotalAPagar=$datos[4];
$TotalDiasAtrasado=$datos[15];
$cuotasatrazadas=$datos[6];
$TotalApagarSinInteres=$datos[7];
$DeudaPendiente=$datos[8];
$TotalInteresPagado=$datos[12];
$TotalPagadoSinInteres=$datos[13];


if($TipoVenta=="CREDITO"){
 $cuotas=$nroCouta."/".buscarcantidadcuotapagados($cod_venta);
}else{
	$cuotas="CONTADO";
}

if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}


$deuda=$deuda+$datos[4];
$totalacobrar=$totalacobrar+$datos[8];


$nueva_fecha = date("d-m-Y", strtotime($fechapago));

$Detalle_VentaProducto= buscar_detalles_venta_en_cuentas_a_cobrar($cod_venta,'') ;

$styleName=CargarStyleTable($styleName);
$filas[] = array(
	"id_cliente" => $cod_clienteFK,
	"id_venta" => $cod_venta,
	"numero_factura" => $num_factura,
	"plazo" => $plazo,
	"cliente" => $clientenombre,
	"documento" => $documento,
	"telefono" => $telefono,
	"factura" => $nrof,
	"productos" => isset($Detalle_VentaProducto[4]) && is_array($Detalle_VentaProducto[4]) ? $Detalle_VentaProducto[4] : array(),
	"cobrador" => $cobradornombre,
	"total_venta" => number_format($total_venta,'0',',','.'),
	"fecha_vencimiento" => $nueva_fecha,
	"fecha_pago" => $fechapago,
	"cuotas" => $cuotas,
	"monto_cuota" => number_format($Monto,'0',',','.'),
	"descuento" => number_format($totalEnDescuento,'0',',','.'),
	"interes_pagado" => number_format($TotalInteresPagado,'0',',','.'),
	"pagado_sin_interes" => number_format($TotalPagadoSinInteres,'0',',','.'),
	"total_pagado" => number_format($TotalEnPagado,'0',',','.'),
	"total_interes" => number_format($TotalEnInteres,'0',',','.'),
	"cuotas_atrasadas" => $cuotasatrazadas,
	"dias_atrasados" => $TotalDiasAtrasado,
	"deuda_pendiente" => number_format($DeudaPendiente,'0',',','.'),
	"total_deuda" => number_format($TotalEnDeuda,'0',',','.'),
	"total_a_pagar" => number_format($TotalAPagar,'0',',','.'),
	"pago_acumulado" => number_format($totalPagado,'0',',','.'),
	"total_venta_oculto" => number_format($total_venta,'0',',','.'),
	"id_cobrador" => $cod_cobradorFK,
	"local" => $nombrelocal,
	"tipo_comprobante" => $tipo_comprobante,
	"punto_expedicion" => $puntoexpedicion,
	"total_sin_interes" => number_format($TotalApagarSinInteres,'0',',','.'),
	"vendedor" => $nombrevendedor1,
	"latitud" => $lat,
	"longitud" => $lot,
	"clase_fila" => $styleName
);
if(!$devolverArray){
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoscuentaacobrarcallcenterventa(this)' >
<td id='td_id_1' style='display:none' >".$cod_clienteFK."</td>
<td id='td_datos_1' style='display:none' >".$cod_venta."</td>
<td id='td_datos_2' style='display:none' >".$num_factura."</td>
<td id='' style='display:none' >".$plazo."</td>
<td id='td_datos_26' style='display:none' >".$clientenombre."</td>
<td id='' style='display:none' >".$documento."</td>
<td id='' style='display:none' >".$telefono."</td>
<td id='' style='display:none' >".$nrof."</td>
<td id='' style='width:20%; ' >".$Detalle_VentaProducto[1]."</td>
<td id='td_datos_5' style='display:none' >".$cobradornombre."</td>
<td id='td_datos_12' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td   style='width:5%' >".$nueva_fecha."</td>
<td id='td_datos_3' style='display:none' >".$fechapago."</td>
<td id='td_datos_19' style='display:none' >".$cuotas."</td>
<td id='td_datos_6' style='display:none'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_18' style='display:none'>". number_format($totalEnDescuento,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalInteresPagado,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalPagadoSinInteres,'0',',','.')."</td>
<td id='td_datos_13' style='display:none'>". number_format($TotalEnPagado,'0',',','.')."</td>
<td id='td_datos_17' style='display:none'>". number_format($TotalEnInteres,'0',',','.')."</td>
<td id='td_datos_20' style='width:5%'>".$cuotasatrazadas."</td>
<td id='td_datos_10' style='width:5%'>".$TotalDiasAtrasado."</td>
<td id='td_datos_22' style='width:5%'>". number_format($DeudaPendiente,'0',',','.')."</td>
<td id='td_datos_11' style='display:none'>". number_format($TotalEnDeuda,'0',',','.')."</td>
<td id='td_datos_14' style='width:5%'>". number_format($TotalAPagar,'0',',','.')."</td>
<td id='td_datos_7' style='display:none'>". number_format($totalPagado,'0',',','.')."</td>
<td id='td_datos_8' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td id='td_datos_9' style='display:none'>".$cod_cobradorFK."</td>
<td id='' style='display:none'>". $nombrelocal."</td>
<td id='td_datos_15' style='display:none'>". $tipo_comprobante."</td>
<td id='td_datos_16' style='display:none'>". $puntoexpedicion."</td>
<td id='td_datos_21' style='display:none'>".  number_format($TotalApagarSinInteres,'0',',','.')."</td>
<td id='td_datos_23' style='display:none'>". $nombrevendedor1."</td>
<td id='td_datos_24' style='display:none'>". $lat."</td>
<td id='td_datos_25' style='display:none'>". $lot."</td>
</tr>
</table>";
}
	}
	}




 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" =>number_format($nroRegistro,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($totalacobrar,'0',',','.'));
echo json_encode($informacion);	
exit;
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

function buscarcreditosexpediente_imprimir($cod_venta)
{
$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,vt.total_venta,interes,dias,vt.pago as entrega,vt.cod_clienteFK,cr.diasatrasados,cr.totalinteres,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
(SELECT ci_cliente FROM cliente WHERE cod_cliente=vt.cod_clienteFK) as ci_cliente,
(SELECT direccion FROM persona WHERE cod_persona=vt.cod_clienteFK) as direccion,
(SELECT telefono FROM persona WHERE cod_persona=vt.cod_clienteFK) as telefono,
(SELECT nombre_persona FROM persona WHERE cod_persona=vt.idGaranteFk) as garante,
(SELECT telefono FROM persona WHERE cod_persona=vt.idGaranteFk) as telefonoFarante,
(SELECT nombre FROM zona WHERE idzona = (SELECT idzonaFk FROM cliente WHERE cod_cliente=vt.cod_clienteFK)) as zona,
(select pg.Fecha from pago pg where pg.cod_creditoFK=cr.idcredito order by pg.Fecha desc limit 1) as fechapagado
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$cod_venta' ";

 $pagina = "";  
$interes = "0";  
$diasatrazado = "0";  
$dias = "0";  
$totalPagado = "0";  
$total_venta = "0";  
$deuda = "0";  
$totalInteres = "0";  
$totalDescuento = "0";  
$entrega = "0"; 

$tInteres=0; 

$tDeudaSinInteres = 0;


$nombreClienteImprimir="";
	$NroVentaClienteImprimir="";
	$DetalleVentaClienteImprimir="";
	$TipoVentaClienteImprimir="";
	$FechaClienteImprimir="";
	
	$ZonaClienteImprimir = '';
	$DireccionClienteImprimir = '';
	$DocumentoClienteImprimir = '';
	$GaranteClienteImprimir = '';
	$TelefonoGaranteImprimir = '';
	$TelefonoClienteImprimir = '';
	$CobradorClienteImprimir = '';


$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$idcredito = utf8_encode($valor['idcredito']);
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$entrega = utf8_encode($valor['entrega']);
$fechapagado = utf8_encode($valor['fechapagado']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$diasatrasados = utf8_encode($valor['diasatrasados']);

$garante = utf8_encode($valor['garante']);
$GaranteClienteImprimir = $garante;
$ci_cliente = utf8_encode($valor['ci_cliente']);
$DocumentoClienteImprimir = $ci_cliente;
$zona = utf8_encode($valor['zona']);
$ZonaClienteImprimir = $zona;
$direccion = utf8_encode($valor['direccion']);
$DireccionClienteImprimir = $direccion;
$telefono = utf8_encode($valor['telefono']);
$TelefonoClienteImprimir = $telefono;
$totalinteres = utf8_encode($valor['totalinteres']);
$telefonoFarante = utf8_encode($valor['telefonoFarante']);
$TelefonoGaranteImprimir = $telefonoFarante;

$datos=calcularintereses2($idcredito,0,0,"2","2","1","no");
$descuento=$datos[0];
$total_interes=$datos[1];
$total=$datos[2];
$totalPago=$datos[3];
$deudaActua=$datos[4];
$TotalDiasAtrasado=$datos[5];
$TotalSinInteres=$datos[7];
//$datos[6]=$nrodecuotasatrazado;
//$datos[7]=$TotalApagarSinInteres;
//$datos[8]=$DeudaPendiente;
$stylecolor=$datos[9];
$totalDescuento=$totalDescuento+$descuento;
$totalPagado=$totalPagado+$totalPago;

$diasatrazado=$diasatrazado+$TotalDiasAtrasado;


$fechapago = date("d-m-Y", strtotime($fechapago));
if($fechapagado!=""){
	$fechapagado = date("d-m-Y", strtotime($fechapagado));
}


$total_interes = ceil($total_interes/1000)*1000;
$total = ceil($total/1000)*1000;
$deudaActua = ceil($deudaActua/1000)*1000;
$totalinteres = ceil($totalinteres/1000)*1000;

$totalInteres = $datos[10];
// $totalInteres += $totalinteres;

$Esado = 'Pagado';
if($deudaActua > 0){
	$Esado = 'Pendiente';
}

if($Esado == 'Pendiente'){
	$tDeudaSinInteres += $TotalSinInteres;
}
 
 
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td id='' style='width:5%' >".$plazo."</td>
<td id='' style='width:15%'>".$fechapago."</td>
<td id='' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($totalinteres,'0',',','.')."</td>
<td id='' style='width:5%'>".$diasatrasados."</td>
<td id='' style='width:5%'>". number_format($descuento,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($total,'0',',','.')."</td>
<td id='' style='width:10%'>". number_format($totalPago,'0',',','.')."</td>
<td id='' style='width:10%'>".$fechapagado."</td>
<td id='' style='width:10%'>". number_format($deudaActua,'0',',','.')."</td> 
<td id='' style='width:10%'>".$Esado."</td> 

</tr>
</table>
";

// $pagina .= $paginaPagos;

$deuda=$deuda + $datos[2];
$tInteres= $tInteres + $datos[10];

}
}
// $deuda=$total_venta-($totalPagado+$entrega);



$DatosImprimir = BuscarDetalleVentaCredito($cod_venta);


	$nombreClienteImprimir=$DatosImprimir[0];
	$NroVentaClienteImprimir=$DatosImprimir[1];
	$DetalleVentaClienteImprimir=$DatosImprimir[2];
	$TipoVentaClienteImprimir=$DatosImprimir[3];
	$FechaClienteImprimir=$DatosImprimir[4];

// echo $tDeudaSinInteres;
// exit;

 mysqli_close($mysqli);    
$informacion =array("1" => "exito","2" => $pagina,"3" =>number_format($totalPagado,'0',',','.') ,"4" =>number_format($deuda,'0',',','.'),"5" =>number_format($interes,'2',',','.'),"6" =>$dias, "7" =>number_format($tInteres,'0',',','.'), "9" => number_format($entrega,'0',',','.'),"8" => $diasatrazado,"10"=>number_format($totalDescuento,'0',',','.'),"32"=>number_format($tDeudaSinInteres,'0',',','.'),"20" => $nombreClienteImprimir,"21"=>$NroVentaClienteImprimir,"22"=>$DetalleVentaClienteImprimir,"23"=>$TipoVentaClienteImprimir,"24"=>$FechaClienteImprimir,"25"=>$ZonaClienteImprimir,"26"=>$DireccionClienteImprimir,"27"=>$DocumentoClienteImprimir,"28"=>$GaranteClienteImprimir,"29"=>$TelefonoGaranteImprimir,"30"=>$CobradorClienteImprimir,"31"=>$TelefonoClienteImprimir);
echo json_encode($informacion);	
exit;
}

function buscar_pagos_credito($cod_creditoFK){
	$mysqli=conectar_al_servidor();	
	 
$sql= "SELECT idPago,Fecha,Monto,cod_cobradorFK,hora,Tipo,
(SELECT usu FROM cobrador where cod_cobrador = cod_cobradorFK) as cobrador
FROM pago WHERE cod_creditoFK = '$cod_creditoFK'";
 
 // echo($sql);
 // exit;

   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$pagina = '';
$tituloPagina = '<table class="tableCabeceraRegistro" style="width:100%;height:20px;"><tbody><tr><td style="width:100%;font-size:9px;" class="td_registro" >PAGOS</td></tr></tbody></table>
<table class="tableCabeceraRegistro" style="width:100%;height:20px;"><tbody><tr>
<td style="width:25%;font-size:9px;" class="td_registro">Monto</td>
<td style="width:25%;font-size:9px;" class="td_registro">Fecha/Hora</td>
<td style="width:25%;font-size:9px;" class="td_registro">Cobrador</td>
<td style="width:25%;font-size:9px;" class="td_registro">Tipo</td>
</tr></tbody></table>';
$pagina .=$tituloPagina;

	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		$Fecha=utf8_encode($valor['Fecha']);
		$Monto=utf8_encode($valor['Monto']);
		$hora=utf8_encode($valor['hora']);
		$cobrador=utf8_encode($valor['cobrador']);
		$Tipo=utf8_encode($valor['Tipo']);
		
		
		
		$pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td   style='width:25%'>". number_format($Monto,'0',',','.')."</td>
<td   style='width:25%' >".$hora."</td>
<td   style='width:25%' >".$cobrador."</td>
<td   style='width:25%' >".$Tipo."</td>
</tr>
</table>";

	  }
 }else{
	 return $pagina = '';
 }
	
 return $pagina.='<br>';
}


function cuentasacobrarinformegeneral($filtrofecha,$codlocal,$formato="")
{
	$mysqli=conectar_al_servidor();
	$fechahoy=date('Y-m-d');	


	$condicionCodLocal=" "; 
	if($codlocal!=""){
	$condicionCodLocal=" and vt.cod_local='$codlocal' ";
	 }
	

	
	$condicionfechafiltro=" ";
	if($filtrofecha!=""){
	 $condicionfechafiltro=" and  cr.fechapago='$filtrofecha' ";
	}




	$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,datediff(cr.fechapago,'".$fechahoy."') as diff,vt.tipo_comprobante,vt.puntoexpedicion,vt.cod_cobradorFK,vt.num_factura,vt.total_venta,vt.num_factura,vt.cod_clienteFK,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_venta_fk=vt.cod_venta),0) as totalPago,cr.totalinteres,cr.descuento,vt.TipoVenta,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as creditopagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
IFNULL((Select lat from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lat,
IFNULL((Select lot from ubicaciones u where u.cod_clienteFk=vt.cod_clienteFK LIMIT 1),0) as lot,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as documento,
(Select tipo_estado from cliente where cod_cliente=cod_clienteFK) as tipo_estado,
(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
		(Select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) as cobradornombre
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where (IFNULL((select sum(pg.Monto) from credito pg where pg.idcredito=cr.idcredito),0)- IFNULL((select sum(pg.descuento) from credito pg where pg.idcredito=cr.idcredito),0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)>0 and
 (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0 and
  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
".$condicionCodLocal.$condicionfechafiltro."  group by cr.cod_venta order by  vt.cod_venta asc limit 100 ";
 

 
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
$controlStyle="";
$styleName="tableRegistroSearch";
$array_cod_cliente = array();

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']); 
$idcredito = utf8_encode($valor['idcredito']);    
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$creditopagado = utf8_encode($valor['creditopagado']); 
$diff = utf8_encode($valor['diff']);
$clientenombre = utf8_encode($valor['clientenombre']);
$cobradornombre = utf8_encode($valor['cobradornombre']);
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']);
$total_venta = utf8_encode($valor['total_venta']);
$num_factura = utf8_encode($valor['num_factura']);
$nombrelocal = utf8_encode($valor['nombrelocal']);
$telefono = utf8_encode($valor['telefono']);
$descuento = utf8_encode($valor['descuento']);
$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$nroCouta = utf8_encode($valor['nroCouta']);
$TipoVenta = utf8_encode($valor['TipoVenta']);
$documento = utf8_encode($valor['documento']);
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$lat = utf8_encode($valor['lat']);
$lot = utf8_encode($valor['lot']);
$tipo_estado = utf8_encode($valor['tipo_estado']);

$datos=calcularintereses2($cod_venta,0,0,"2","3","2","si");


$totalEnDescuento=$datos[0];
$TotalEnInteres=$datos[1];
$TotalEnDeuda=$datos[2];
$TotalEnPagado=$datos[3];
$TotalAPagar=$datos[4];
$TotalDiasAtrasado=$datos[15];
$cuotasatrazadas=$datos[6];
$TotalApagarSinInteres=$datos[7];
$DeudaPendiente=$datos[8];
$TotalInteresPagado=$datos[12];
$TotalPagadoSinInteres=$datos[13];


if($TipoVenta=="CREDITO"){
 $cuotas=$nroCouta."/".buscarcantidadcuotapagados($cod_venta);
}else{
	$cuotas="CONTADO";
}

if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}





$nueva_fecha = date("d-m-Y", strtotime($fechapago));

$Detalle_VentaProducto=buscar_detalles_venta_en_cuentas_a_cobrar($cod_venta,'');

$p_tipo = '';
$nombre_tipo_estado = '';
if($tipo_estado != '0'){
	$nombre_tipo_estado = obtener_tipo_estado_cliente($tipo_estado);
	$p_tipo = "<p style='color:#d10000;margin:0;'>".$nombre_tipo_estado."</p>";
}

$styleName=CargarStyleTable($styleName);
$filas[] = array(
	"id_cliente" => $cod_clienteFK,
	"id_venta" => $cod_venta,
	"numero_factura" => $num_factura,
	"plazo" => $plazo,
	"cliente" => $clientenombre,
	"tipo_estado_cliente" => $nombre_tipo_estado,
	"documento" => $documento,
	"telefono" => $telefono,
	"factura" => $nrof,
	"productos" => isset($Detalle_VentaProducto[4]) && is_array($Detalle_VentaProducto[4]) ? $Detalle_VentaProducto[4] : array(),
	"cobrador" => $cobradornombre,
	"total_venta" => number_format($total_venta,'0',',','.'),
	"fecha_vencimiento" => $nueva_fecha,
	"fecha_pago" => $fechapago,
	"cuotas" => $cuotas,
	"monto_cuota" => number_format($Monto,'0',',','.'),
	"descuento" => number_format($totalEnDescuento,'0',',','.'),
	"interes_pagado" => number_format($TotalInteresPagado,'0',',','.'),
	"pagado_sin_interes" => number_format($TotalPagadoSinInteres,'0',',','.'),
	"total_pagado" => number_format($TotalEnPagado,'0',',','.'),
	"total_interes" => number_format($TotalEnInteres,'0',',','.'),
	"cuotas_atrasadas" => $cuotasatrazadas,
	"dias_atrasados" => $TotalDiasAtrasado,
	"deuda_pendiente" => number_format($DeudaPendiente,'0',',','.'),
	"total_deuda" => number_format($TotalEnDeuda,'0',',','.'),
	"total_a_pagar" => number_format($TotalAPagar,'0',',','.'),
	"total_venta_oculto" => number_format($total_venta,'0',',','.'),
	"id_cobrador" => $cod_cobradorFK,
	"local" => $nombrelocal,
	"tipo_comprobante" => $tipo_comprobante,
	"punto_expedicion" => $puntoexpedicion,
	"total_sin_interes" => number_format($TotalApagarSinInteres,'0',',','.'),
	"vendedor" => $nombrevendedor1,
	"latitud" => $lat,
	"longitud" => $lot,
	"clase_fila" => $styleName
);
if(!$devolverArray){
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='' >
<td id='td_id_1' style='display:none' >".$cod_clienteFK."</td>
<td id='td_datos_1' style='display:none' >".$cod_venta."</td>
<td id='td_datos_2' style='display:none' >".$num_factura."</td>
<td id='' style='display:none' >".$plazo."</td>
<td id='td_datos_26' style='width:10%;' >".$p_tipo.$clientenombre."</td>
<td id='' style='width:5%;' >".$documento."</td>
<td id='' style='width:5%;' >".$telefono."</td>
<td id='' style='width:5%;' >".$nrof."</td>
<td id='' style='width:10%; ' >".$Detalle_VentaProducto[0]."</td>
<td id='td_datos_5' style='display:none' >".$cobradornombre."</td>
<td id='td_datos_12' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td   style='width:5%' >".$nueva_fecha."</td>
<td id='td_datos_3' style='display:none' >".$fechapago."</td>
<td id='td_datos_19' style='display:none' >".$cuotas."</td>
<td id='td_datos_6' style='display:none'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_18' style='display:none'>". number_format($totalEnDescuento,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalInteresPagado,'0',',','.')."</td>
<td id='' style='display:none'>". number_format($TotalPagadoSinInteres,'0',',','.')."</td>
<td id='td_datos_13' style='display:none'>". number_format($TotalEnPagado,'0',',','.')."</td>
<td id='td_datos_17' style='display:none'>". number_format($TotalEnInteres,'0',',','.')."</td>
<td id='td_datos_20' style='width:3%'>".$cuotasatrazadas."</td>
<td id='td_datos_10' style='width:3%'>".$TotalDiasAtrasado."</td>
<td id='td_datos_22' style='width:5%'>". number_format($DeudaPendiente,'0',',','.')."</td>
<td id='td_datos_11' style='display:none'>". number_format($TotalEnDeuda,'0',',','.')."</td>
<td id='td_datos_14' style='width:5%'>". number_format($TotalAPagar,'0',',','.')."</td>
<td id='td_datos_8' style='display:none'>". number_format($total_venta,'0',',','.')."</td>
<td id='td_datos_9' style='display:none'>".$cod_cobradorFK."</td>
<td id='' style='width:5%'>". $nombrelocal."</td>
<td id='td_datos_15' style='display:none'>". $tipo_comprobante."</td>
<td id='td_datos_16' style='display:none'>". $puntoexpedicion."</td>
<td id='td_datos_21' style='display:none'>".  number_format($TotalApagarSinInteres,'0',',','.')."</td>
<td id='td_datos_23' style='width:5%'>". $nombrevendedor1."</td>
<td id='td_datos_24' style='display:none'>". $lat."</td>
<td id='td_datos_25' style='display:none'>". $lot."</td>
</tr>
</table>";
}


array_push($array_cod_cliente,$cod_clienteFK);

}
}

 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($devolverArray ? $filas : $pagina),"3" =>$nroRegistro,"4"=>$array_cod_cliente);
echo json_encode($informacion);	
exit;
}





verificar($operacion);
?>
