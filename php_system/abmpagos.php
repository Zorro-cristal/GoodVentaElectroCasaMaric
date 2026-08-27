<?php
require("conexion.php");
include('quitarseparadormiles.php');
include("verificar_navegador.php");
$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include("buscar_nivel.php");
include("calcularintereses.php");
// include("calcularInteresDirecto.php");
include("classTable.php");


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




if($operacion=="nuevo" )
{


$cod_creditoFK=$_POST['cod_creditoFK'];
$cod_creditoFK = utf8_decode($cod_creditoFK);


$Fecha=$_POST['Fecha'];
$Fecha = utf8_decode($Fecha);

$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);

$totalDeudaCuota=$_POST['totalDeudaCuota'];
$totalDeudaCuota = quitarseparadormiles($totalDeudaCuota);

$totalInteres=$_POST['totalInteres'];
$totalInteres = quitarseparadormiles($totalInteres);

$MontoCobrado=$_POST['MontoCobrado'];
$MontoCobrado = quitarseparadormiles($MontoCobrado);

$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);

$MontoTarjeta=$_POST['MontoTarjeta'];
$MontoTarjeta = quitarseparadormiles($MontoTarjeta);

$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);

$nrofactura=$_POST['nrofactura'];
$nrofactura = utf8_decode($nrofactura);

$cajapredeterminada=$_POST['codcaja'];
$cajapredeterminada = utf8_decode($cajapredeterminada);

$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);

$cod_ClienteFKMora=$_POST['cod_ClienteFKMora'];
$cod_ClienteFKMora = utf8_decode($cod_ClienteFKMora);

$cod_ClienteFKMora=$_POST['cod_ClienteFKMora'];
$cod_ClienteFKMora = utf8_decode($cod_ClienteFKMora);

$CargoAdministrativo=$_POST['CargoAdministrativo'];
$CargoAdministrativo = quitarseparadormiles($CargoAdministrativo);

$imprimirOpcion=$_POST['imprimirOpcion'];
$imprimirOpcion = utf8_decode($imprimirOpcion);

abm($CargoAdministrativo,$cajapredeterminada,$codApertura,$cod_creditoFK,$Fecha,$cod_cobradorFK,$cod_venta,$totalDeudaCuota,$totalInteres,$MontoCobrado,$MontoTarjeta,$descuento,$nrofactura,$operacion,1,0,$cod_ClienteFKMora,$imprimirOpcion);



}

if($operacion=="buscarResumenCobrador")
{
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$local=$_POST['local'];
$local = utf8_decode($local);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$tipoPago=$_POST['tipoPago'];
$tipoPago = utf8_decode($tipoPago);
$tipoCuota=$_POST['tipoCuota'];
$tipoCuota = utf8_decode($tipoCuota);

$metodo=$_POST['metodo'];
$metodo = utf8_decode($metodo);

$control=$_POST['control'];
$control = utf8_decode($control);

$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

buscarResumenCobrador($tipoPago, $tipoCuota , $fecha, $cobrador, $local, $tipo,$fecha1,$fecha2,$metodo,$control,$formato);
}


 if($operacion=="buscar_meta_cobrador")
{
	
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$cod_cobrador=$_POST['cod_cobrador'];
$cod_cobrador = utf8_decode($cod_cobrador);


 buscar_meta_cobrador($fecha1, $fecha2,$cod_cobrador);
}

if($operacion=="comisioncobradoragrupado")
{
	
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$condicion=$_POST['condicion'];
$condicion = utf8_decode($condicion);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);


$tipo_pago=$_POST['tipo_pago'];
$tipo_pago = utf8_decode($tipo_pago);

$tipo_cuota=$_POST['tipo_cuota'];
$tipo_cuota = utf8_decode($tipo_cuota);

$array_cod_filtro_cobrador_info_cobradores = json_decode($_POST['array_cod_filtro_cobrador_info_cobradores']);

 comisioncobradoragrupado($fecha1, $fecha2,$condicion,$cod_local,$array_cod_filtro_cobrador_info_cobradores,$tipo_pago,$tipo_cuota);

}

if($operacion=="cargarpago" )
{

$Monto=$_POST['Monto'];
$Monto = quitarseparadormiles($Monto);

$MontoTarjeta=$_POST['MontoTarjeta'];
$MontoTarjeta = quitarseparadormiles($MontoTarjeta);

$Descuento=$_POST['Descuento'];
$Descuento = quitarseparadormiles($Descuento);

$Fecha=$_POST['Fecha'];
$Fecha = utf8_decode($Fecha);

$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);

$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);

$controlfecha=$_POST['controlfecha'];
$controlfecha = utf8_decode($controlfecha);

$nrofactura=$_POST['nrofactura'];
$nrofactura = utf8_decode($nrofactura);

$cajapredeterminada=$_POST['codcaja'];
$cajapredeterminada = utf8_decode($cajapredeterminada);

$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);

$cod_ClienteFKMora=$_POST['cod_ClienteFKMora'];
$cod_ClienteFKMora = utf8_decode($cod_ClienteFKMora);


$CargoAdministrativo =$_POST['CargoAdministrativo'];
$CargoAdministrativo = quitarseparadormiles($CargoAdministrativo);

$imprimirOpcion =$_POST['imprimirOpcion'];
$imprimirOpcion = utf8_decode($imprimirOpcion);

if($nrofactura==""){
	$nrofactura=buscarnrofactura();
}

cargarpagos($CargoAdministrativo,$Monto,$MontoTarjeta,$Descuento,$Fecha,$cod_cobradorFK,$cod_venta,$controlfecha,$nrofactura,$cajapredeterminada,$codApertura,1,0,$cod_ClienteFKMora,$imprimirOpcion);

}

if($operacion=="cargaropcionpagoparcial" )
{

$MontoTarjeta=$_POST['MontoTarjeta'];
$MontoTarjeta = quitarseparadormiles($MontoTarjeta);

$Descuento=$_POST['Descuento'];
$Descuento = quitarseparadormiles($Descuento);

$Fecha=$_POST['Fecha'];
$Fecha = utf8_decode($Fecha);

$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);

$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);

$controlfecha=$_POST['controlfecha'];
$controlfecha = utf8_decode($controlfecha);

$nrofactura=$_POST['nrofactura'];
$nrofactura = utf8_decode($nrofactura);

$cajapredeterminada=$_POST['codcaja'];
$cajapredeterminada = utf8_decode($cajapredeterminada);

$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);

$totalregistro=$_POST['totalregistro'];
$totalregistro = utf8_decode($totalregistro);

$CargoAdministrativo =$_POST['CargoAdministrativo'];
$CargoAdministrativo = quitarseparadormiles($CargoAdministrativo);

$cod_ClienteFKMora =$_POST['cod_ClienteFKMora'];
$cod_ClienteFKMora = quitarseparadormiles($cod_ClienteFKMora);

$imprimirOpcion =$_POST['imprimirOpcion'];
$imprimirOpcion = utf8_decode($imprimirOpcion);

addPagosCreditoParcial($cod_ClienteFKMora,$CargoAdministrativo,$MontoTarjeta,$Descuento,$Fecha,$cod_cobradorFK,$cod_venta,$controlfecha,$nrofactura,$cajapredeterminada,$codApertura,$totalregistro,$imprimirOpcion);

}

if($operacion=="eliminar" )
{


$cod_creditoFK=$_POST['cod_creditoFK'];
$cod_creditoFK = utf8_decode($cod_creditoFK);
$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
$monto=$_POST['monto'];
$monto = utf8_decode($monto);
$cuota=$_POST['cuota'];
$cuota = utf8_decode($cuota);
$idFkVenta=$_POST['idFkVenta'];
$idFkVenta = utf8_decode($idFkVenta);
$nrofactura=$_POST['nrofactura'];
$nrofactura = utf8_decode($nrofactura);

$cod_pago=$_POST['cod_pago'];
$cod_pago = utf8_decode($cod_pago);
quitarpago($idFkVenta,$cod_creditoFK,$motivo,$monto,$cuota,$nrofactura,$user,$cod_pago);

}


if($operacion=="buscar_dias_grafica_promedio_pago_solicitud_aprobar" )
{


$cod_cliente=$_POST['cod_cliente'];
$cod_cliente = utf8_decode($cod_cliente);

buscar_dias_grafica_promedio_pago_solicitud_aprobar($cod_cliente);

}

if($operacion=="editarcomision" )
{


$comision=$_POST['comision'];
$comision = quitarseparadormiles($comision);

$idPagoComision=$_POST['idPagoComision'];


cambiarcomision($idPagoComision,$comision);

}
if($operacion=="eliminarhistorialpago" )
{


$codPago=$_POST['codPago'];
$codPago = utf8_decode($codPago);

$codVenta=$_POST['codVenta'];
$codVenta = utf8_decode($codVenta);

quitarhistorialpago($codPago,$codVenta);

}

if($operacion=="buscarHistorial" )
{


$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);

buscarhistorialpagos($buscar);

}
if($operacion=="buscarHistorialPagosAReimprimir" )
{


$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);

buscarHistorialPagosAReimprimir($buscar);

}
if($operacion=="buscarpagoseliminados" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$ci=$_POST['ci'];
$ci = utf8_decode($ci);
$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
buscarpagoseliminados($fecha1,$fecha2,$cliente,$ci,$motivo,$fecha);

}
if($operacion=="arqueo" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$fecha_venc=$_POST['fecha_venc'];
$fecha_venc = utf8_decode($fecha_venc);
$local=$_POST['local'];
$local = utf8_decode($local);
$factura=$_POST['factura'];
$factura = utf8_decode($factura);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$fechafija=$_POST['fechafija'];
$fechafija = utf8_decode($fechafija);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$metodo=$_POST['metodo'];
$metodo = utf8_decode($metodo);
$codCaja=$_POST['codCaja'];
$codCaja = utf8_decode($codCaja);

$cobradorasig=$_POST['cobradorasig'];
$cobradorasig = utf8_decode($cobradorasig);


$condicion =$_POST['condicion'];
$condicion = utf8_decode($condicion);

$tipo =$_POST['tipo'];
$tipo = utf8_decode($tipo);

$desde=$_POST['desde'];
$desde = utf8_decode($desde);

$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);

$tiempo_cobro=$_POST['tiempo_cobro'];
$tiempo_cobro = utf8_decode($tiempo_cobro);

$codMoraCliente=$_POST['codMoraCliente'];
$codMoraCliente = utf8_decode($codMoraCliente);

$Entrega=$_POST['Entrega'];
$Entrega = utf8_decode($Entrega);

$tipo_cliente=$_POST['tipo_cliente'];
$tipo_cliente = utf8_decode($tipo_cliente);

$tipo_comprobante='';
if(isset($_POST['tipo_comprobante'])){
	$tipo_comprobante = utf8_decode($_POST['tipo_comprobante']);
}
// $tipo_comprobante=;



if($desde=="arqueo2"){
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
	//	$local=buscarlocaluser($user);
	}
}
}

Arqueo($tipo_cliente,$tipo,$fecha1,$fecha2,$fecha_venc,$local,$factura,$cliente,$fechafija,$cobrador,$metodo,$codCaja,$condicion,$cod_cobradorFK,$cobradorasig,$tiempo_cobro,$codMoraCliente,$Entrega,$tipo_comprobante);

}
if($operacion=="reeimpresionrecibo" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);
$factura=$_POST['factura'];
$factura = utf8_decode($factura);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$fechafiltro=$_POST['fechafiltro'];
$fechafiltro = utf8_decode($fechafiltro);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$metodo=$_POST['metodo'];
$metodo = utf8_decode($metodo);


reeimpresionrecibo($fecha1,$fecha2,$local,$factura,$cliente,$fechafiltro,$cobrador,$metodo);

}


if($operacion=="buscarDetalleResumenCobrador" )
{


$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$control=$_POST['control'];
$control = utf8_decode($control);

$metodo=$_POST['metodo'];
$metodo = utf8_decode($metodo);

$local=$_POST['local'];
$local = utf8_decode($local);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$tipoPago=$_POST['tipoPago'];
$tipoPago = utf8_decode($tipoPago);
$tipoCuota=$_POST['tipoCuota'];
$tipoCuota = utf8_decode($tipoCuota);


$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);

$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

buscarDetalleResumenCobrador($fecha,$control,$cod_cobradorFK,$fecha1,$fecha2,$metodo,$local,$tipo,$tipoPago,$tipoCuota,$formato);

}



if($operacion=="vistacajaapp" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
vistacajaapp($fecha1,$fecha2,$local,$cobrador);

}

if($operacion=="comisioncobrador" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$zona=$_POST['zona'];
$zona = utf8_decode($zona);
$fechafiltro=$_POST['fechafiltro'];
$fechafiltro = utf8_decode($fechafiltro);
$cobrado=$_POST['cobrado'];
$cobrado = utf8_decode($cobrado);
comisioncobrador($fecha1,$fecha2,$zona,$fechafiltro,$cobrado);

}
if($operacion=="mascomisioncobrador" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$zona=$_POST['zona'];
$zona = utf8_decode($zona);
$fechafiltro=$_POST['fechafiltro'];
$fechafiltro = utf8_decode($fechafiltro);
$cobrado=$_POST['cobrado'];
$cobrado = utf8_decode($cobrado);
$totalrecaudacion=$_POST['totalrecaudacion'];
$totalrecaudacion = quitarseparadormiles($totalrecaudacion);
$totalcomision=$_POST['totalcomision'];
$totalcomision = quitarseparadormiles($totalcomision);
$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);
mascomisioncobrador($fecha1,$fecha2,$zona,$fechafiltro,$cobrado,$totalrecaudacion,$totalcomision,$registrocargado);

}

 if($operacion=="pagocontado" )
{
 
$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);

$cajapredeterminada=$_POST['codcaja'];
$cajapredeterminada = utf8_decode($cajapredeterminada);

$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);

$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);

$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);

$montotarjerta=$_POST['montotarjerta'];
$montotarjerta = quitarseparadormiles($montotarjerta);


abmcontado($cod_venta,$descuento,$monto,$montotarjerta,$cajapredeterminada,$codApertura,1,0,1);

}


 if($operacion=="cargartipospagosventas" )
{

$cod_venta=$_POST['idventa_fk'];
$cod_venta = utf8_decode($cod_venta);

$cajapredeterminada=$_POST['codcaja'];
$cajapredeterminada = utf8_decode($cajapredeterminada);

$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);



addPagos($cod_venta,$cajapredeterminada,$codApertura);

}

if($operacion=="cargartipospagoscredito" )
{

$cod_creditoFK=$_POST['cod_creditoFK'];
$cod_creditoFK = utf8_decode($cod_creditoFK);


$Fecha=$_POST['Fecha'];
$Fecha = utf8_decode($Fecha);

$cod_venta=$_POST['cod_venta'];
$cod_venta = utf8_decode($cod_venta);

$totalDeudaCuota=$_POST['totalDeudaCuota'];
$totalDeudaCuota = quitarseparadormiles($totalDeudaCuota);

$totalInteres=$_POST['totalInteres'];
$totalInteres = quitarseparadormiles($totalInteres);

$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);

$MontoTarjeta=$_POST['MontoTarjeta'];
$MontoTarjeta = quitarseparadormiles($MontoTarjeta);

$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);

$nrofactura=$_POST['nrofactura'];
$nrofactura = utf8_decode($nrofactura);

$cajapredeterminada=$_POST['codcaja'];
$cajapredeterminada = utf8_decode($cajapredeterminada);

$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);

$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);

$imprimirOpcion=$_POST['imprimirOpcion'];
$imprimirOpcion = utf8_decode($imprimirOpcion);

$CargoAdministrativo =$_POST['CargoAdministrativo'];
$CargoAdministrativo = quitarseparadormiles($CargoAdministrativo);

$cod_ClienteFKMora =$_POST['cod_ClienteFKMora'];
$cod_ClienteFKMora = quitarseparadormiles($cod_ClienteFKMora);


addPagosCredito($CargoAdministrativo,$cajapredeterminada,$codApertura,$cod_creditoFK,$Fecha,$cod_cobradorFK,$cod_venta,$totalDeudaCuota,$totalInteres,$MontoTarjeta,$descuento,$nrofactura,$operacion,$cod_ClienteFKMora,$imprimirOpcion);

}



if($operacion=="buscarImprimirTicketVentaContado" )
{

	$cod_venta=$_POST['cod_venta'];
	$cod_venta = utf8_decode($cod_venta);

	buscarImprimirTicketVentaContado($cod_venta);

}




if($operacion=="BuscarBalanceGeneral")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local); 
$usuario=$_POST['usuario'];
$usuario = utf8_decode($usuario);
$estado=$_POST['estado'];
$estado = utf8_decode($estado); 
  BuscarBalanceGeneral($estado,$fecha1, $fecha2, $local, $usuario);
}

if($operacion=="BuscarverDetallegastosBalanceGeneral")
{
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha); 
$local=$_POST['local'];
$local = utf8_decode($local); 
$usuario=$_POST['usuario'];
$usuario = utf8_decode($usuario); 
  BuscarverDetallegastosBalanceGeneral($fecha, $local, $usuario);
}



if($operacion=="ActualizarEstadoGastos")
{
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo); 
$id=$_POST['id'];
$id = utf8_decode($id); 
$estado=$_POST['estado'];
$estado = utf8_decode($estado); 
  ActualizarEstadoGastos($tipo, $id, $estado);
}

if($operacion=="AbmEstadoBalance")
{
$Fecha=$_POST['fecha'];  

$local=$_POST['local'];
$local = utf8_decode($local); 
$usuario=$_POST['usuario'];
$usuario = utf8_decode($usuario); 
$diferencia=$_POST['Diferencia'];
$diferencia = utf8_decode($diferencia); 
$estado=$_POST['estado'];
$estado = utf8_decode($estado); 
 
  AbmEstadoBalance($Fecha,$local,$usuario,$diferencia,$estado);
}
  
 
}

 
function AbmEstadoBalance($Fecha,$local,$usuario,$diferencia,$estado)
{
 
$mysqli = conectar_al_servidor();

// Verificamos si ya existe el registro para esa fecha, local y usuario
$query = "SELECT id FROM estado_diferencia WHERE fecha = ? AND local = ? AND usuario = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("sss", $Fecha, $local, $usuario);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Actualizamos si ya existe
    $update = "UPDATE estado_diferencia SET diferencia = ?, estado = ? WHERE fecha = ? AND local = ? AND usuario = ?";
    $stmt2 = $mysqli->prepare($update);
    $stmt2->bind_param("dssss", $diferencia, $estado, $Fecha, $local, $usuario);
    $stmt2->execute();
 
} else {
    // Insertamos nuevo si no existe
    $insert = "INSERT INTO estado_diferencia (fecha, diferencia, estado, local, usuario) VALUES ('$Fecha', '$diferencia', '$estado', '$local', '$usuario')";
 
    $stmt3 = $mysqli->prepare($insert);
	
 if (!$stmt3->execute()) {
	echo trigger_error('The query execution failed; MySQL said ('.$stmt3->errno.') '.$stmt3->error, E_USER_ERROR);
	exit;
}
 
}



 mysqli_close($mysqli);

$informacion =array("1" => "exito"  );
echo json_encode($informacion);	
exit;	
	
}
 
function  ActualizarEstadoGastos($tipo, $id, $estado)
{
 
$mysqli=conectar_al_servidor();

if($tipo=="sys"){
	$consulta1="update gastos set confirmadoArreglo = '".$estado."' where idgastos= '".$id."' " ;
}else{
	$consulta1="update gastos_cobrador set confirmadoArreglo = '".$estado."' where idgastos_cobrador= '".$id."' " ;
}

// echo($consulta1);
// exit;

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


function BuscarverDetallegastosBalanceGeneral($fecha, $local, $usuario)
{
    $mysqli = conectar_al_servidor();
    $pagina = '';

    // Inicialización de condiciones
    $condicionLocal = "";
    $condicionLocal2 = "";
    if ($local != "") {
        $local = $mysqli->real_escape_string($local);
        $condicionLocal = " AND g.cod_local = '$local' ";
        $condicionLocal2 = " AND c.cod_localFK = '$local' ";
    }

    $condicionusuario2 = "";
    $condicionusuario3 = "";
    if ($usuario != "") {
        $usuario = $mysqli->real_escape_string($usuario);
        $condicionusuario2 = " AND (SELECT nombre_persona FROM persona WHERE cod_persona = g.cod_usuario) LIKE '%$usuario%' ";
        $condicionusuario3 = " AND (SELECT nombre_persona FROM persona WHERE cod_persona = g.cod_cobradorFK) LIKE '%$usuario%' ";
    }

    $fecha = $mysqli->real_escape_string($fecha);
    $condicionFecha = " AND g.fecha = '$fecha' ";
    $condicionFecha2 = " AND g.fecha = '$fecha' ";

    // Consulta corregida sin alias inválido
    $sql = "(
  SELECT  g.monto, idgastos as id ,
    g.confirmadoArreglo, 
    g.motivo, 
    p.nombre_persona AS usuario,
    l.Nombre AS local , 'sys' as tipo
  FROM gastos g
  LEFT JOIN persona p ON p.cod_persona = g.cod_usuario
  LEFT JOIN local l ON l.cod_local = g.cod_local
  WHERE g.tipo = 'Egreso' and g.estado='Activo' $condicionFecha $condicionusuario2 $condicionLocal
)

UNION

(
  SELECT  g.monto, idgastos_cobrador as id ,
    g.confirmadoArreglo, 
    (select descripcion from motivo_e_i where cod_motivo=idmotivo_e_i) as motivo, 
    p.nombre_persona AS usuario,
    l.Nombre AS local  , 'app' as tipo
  FROM gastos_cobrador g
  INNER JOIN cobrador c ON c.cod_cobrador = g.cod_cobradorFK
  LEFT JOIN persona p ON p.cod_persona = g.cod_cobradorFK
  LEFT JOIN local l ON l.cod_local = c.cod_localFK
  WHERE g.tipo = 'Egreso'  and g.estado='Activo' $condicionFecha2 $condicionusuario3 $condicionLocal2
)
";

// echo($sql);
// exit;
	$html="";
    // Ejecutar la consulta
    $resultado = $mysqli->query($sql);
    if (!$resultado) {
        echo "Error en la consulta: " . $mysqli->error;
        return [];
    }

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
    
	$id = htmlspecialchars($fila['id']);
	$tipo = htmlspecialchars($fila['tipo']);
	$motivo = htmlspecialchars($fila['motivo']);
    $monto = number_format($fila['monto'], 0);
    $fecha = $_POST['fecha']; // ya fue enviado por parámetro
    $local = htmlspecialchars($fila['local']);
    $usuario = htmlspecialchars($fila['usuario']);
    $confirmadoArreglo = htmlspecialchars($fila['confirmadoArreglo']);

$check="";
if($confirmadoArreglo=="SI"){
	$check="checked='true'";
}


$html .= "<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5' id='resumenModalGastoBalanceGeneral' style='width:100%;' >
        <tbody>
			<tr>
			<td style='width:30%;'>$motivo</td>
			<td style='width:10%;'>$monto</td>
			<td style='width:10%;'>$fecha</td>
			<td style='width:10%;'>$local</td>
			<td style='width:20%;'>$usuario</td>
			<td style='display:none;'>$tipo</td>
			<td style='display:none;'>$id</td>
			<td style='width:10%;'><input type='checkbox' $check class='check-accion' /></td>
		</tr> 
	</tbody>
      </table>";
    }
 
	$informacion =array("1" => "exito","2" => $html);
echo json_encode($informacion);	
exit;
}

 

function BuscarBalanceGeneral($estado,$fecha1, $fecha2, $local, $usuario )
{
    $mysqli = conectar_al_servidor();

    $pagina = '';
    $condicionLocal = "";
    $condicionLocal2 = "";
    if ($local != "") {
        $condicionLocal = " AND cod_local = '$local' ";
        $condicionLocal2 = " AND cod_localFK = '$local' ";
    }
	
	
	 $condicionusuario = "";
	 $condicionusuario2 = "";
	 $condicionusuario3 = "";
    if ($usuario != "") {
        $condicionusuario = " AND (select nombre_persona from persona where cod_persona=vt.cod_cobradorFK) like '%$usuario%' ";
        $condicionusuario2 = " AND (select nombre_persona from persona where cod_persona=g.cod_usuario) like '%$usuario%' ";
        $condicionusuario3 = " AND (select nombre_persona from persona where cod_persona=g.cod_cobradorFK) like '%$usuario%' ";
    }

    $condicionFecha = "";
    $condicionFecha2 = "";
    if ($fecha1 != "" && $fecha2 != "") {
        $condicionFecha = " AND Fecha BETWEEN '$fecha1' AND '$fecha2' ";
        $condicionFecha2 = " AND fecha BETWEEN '$fecha1' AND '$fecha2' ";
    }

    $sql = "SELECT
    pa.Fecha,
    SUM(CASE WHEN c.plazo = 'ENTREGA' THEN pa.Monto ELSE 0 END) AS total_Entrega,
    SUM(CASE WHEN pa.Tipo = 'CARGO ADMINISTRATIVO' THEN pa.Monto ELSE 0 END) AS total_CargoA,
    SUM(CASE WHEN pa.Tipo = 'Interes' THEN pa.Monto ELSE 0 END) AS total_Interes,
    SUM(CASE WHEN pa.Tipo = 'Pago Cuota' THEN pa.Monto ELSE 0 END) AS total_Cuotas,
    SUM(CASE WHEN c.plazo = 'CONTADO' THEN pa.Monto ELSE 0 END) AS total_Contado,
    ifnull(( SELECT SUM(g.monto)
        FROM gastos g 
        WHERE g.tipo = 'Egreso'   and confirmadoArreglo='SI'
          AND g.fecha = pa.Fecha  and g.estado='Activo' $condicionusuario2 $condicionLocal
    ),0) AS total_GastoGeneral,
	ifnull(( SELECT SUM(g.monto)
        FROM gastos g
        WHERE g.tipo = 'Deposito' and confirmadoArreglo='SI'
          AND g.fechaDeposito = pa.Fecha  and g.estado='Activo' $condicionusuario2 $condicionLocal
    ),0) AS total_Deposito,
	ifnull(( SELECT SUM(g.monto)
        FROM gastos_cobrador g inner join cobrador c on c.cod_cobrador = g.cod_cobradorFK
        WHERE g.tipo = 'Egreso' and confirmadoArreglo='SI'
          AND g.fecha = pa.Fecha  and g.estado='Activo' $condicionusuario3 $condicionLocal2
    ),0) AS total_GastoCobrador
FROM
    pago pa
    INNER JOIN credito c ON c.idcredito = pa.cod_creditoFK
    INNER JOIN venta vt ON vt.cod_venta = pa.cod_venta_fk
WHERE
    1=1
    $condicionFecha
    $condicionLocal
	$condicionusuario
GROUP BY
    pa.Fecha
ORDER BY
    pa.Fecha ASC limit 31
";

    // echo $sql; exit;

    $stmt = $mysqli->prepare($sql);

    if (!$stmt->execute()) {
        echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
        exit;
    }

    $result = $stmt->get_result();
    $nroRegistro = mysqli_num_rows($result);
    $totalCobranza = 0;
    $styleName = "tableRegistroSearch";
	
	
	$Entrega = 0;
    $CargoA = 0;
    $Interes = 0;
    $Cuotas = 0;
    $Contado = 0;
    $Cobranza =0;
    $Gasto = 0;
    $Depositar = 0;
    $Deposito = 0;
    $Dif = 0;
	
 $Contador=0;

    if ($nroRegistro > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $Fecha = $row['Fecha'];
            $total_Entrega = $row['total_Entrega'];
            $total_CargoA = $row['total_CargoA'];
            $total_Interes = $row['total_Interes'];
            $total_Cuotas = $row['total_Cuotas'];
            $total_Contado = $row['total_Contado'];
            $total_GastoGeneral = $row['total_GastoGeneral'];
            $total_GastoCobrador = $row['total_GastoCobrador'];
            $total_Deposito = $row['total_Deposito'];


 $estadoBalance=buscarEstadoBalance($Fecha,$local,$usuario);
 
 

            // FILTRO POR ESTADO
            if ($estado !== "" && $estadoBalance !== $estado) {
                continue;
            }
 
 
 
 $selectedPendiente = '';
$selectedConfirmado = '';
$style="  ";

if ($estadoBalance == 'PENDIENTE') {
    $selectedPendiente = 'selected';
} elseif ($estadoBalance == 'CONFIRMADO') {
    $selectedConfirmado = 'selected';
	$style=" style='background: #1cbb8c;  color: aliceblue;' ";
}

if($estado==""){
	
	
}

		
			
			$TotalGasto= $total_GastoGeneral + $total_GastoCobrador ;
			$total_Cuotas= $total_Cuotas - ($total_Contado + $total_Entrega) ;
            $totalCobranza=$total_Entrega + $total_CargoA + $total_Interes + $total_Cuotas + $total_Contado;  
			$ParaDepositar= $totalCobranza - $TotalGasto;
			
			$Diferencia=  $total_Deposito -$ParaDepositar ;
			
            $styleName = CargarStyleTable($styleName);
		
		
 $Contador++;
$contadorVerificador="0";
$btnEstado="";


$datos = json_encode([
    $total_Entrega,
    $total_CargoA,
    $total_Interes,
    $total_Cuotas,
    $total_Contado,
    $totalCobranza,
    $TotalGasto,
    $ParaDepositar,
    $total_Deposito,
    $Diferencia,
    $Fecha,
    $local,
    $usuario
]);
 
$btnVerDetalle = "<button 
    class='btn-open-modal' 
    onclick='abrirResumenModal($datos)'>Ver Resumen</button>";
 
 


$arbtn = json_encode([
    $Fecha,
    $local,
    $usuario,
    $Diferencia 
]);
 
$btnEstado = "<select class='inputText' onchange='AbmEstadoBalance( $arbtn, this.value)'>
    <option value='PENDIENTE' $selectedPendiente>PENDIENTE</option>
    <option value='CONFIRMADO' $selectedConfirmado>CONFIRMADO</option>
</select>";

 


            $pagina .= "
            <table class='$styleName' border='1' $style cellspacing='1' cellpadding='5'>
                <tr id='tbSelecRegistro'>
                    <td id='td_datos_1' style='width:8%'>" . $Fecha . "</td>
                    <td id='td_datos_2' style='width:8%'>" . number_format($total_Entrega, 0, ',', '.') . "</td>
                    <td id='td_datos_3' style='width:8%'>" . number_format($total_CargoA, 0, ',', '.') . "</td>
                    <td id='td_datos_4' style='width:8%'>" . number_format($total_Interes, 0, ',', '.') . "</td>
                    <td id='td_datos_5' style='width:8%'>" . number_format($total_Cuotas, 0, ',', '.') . "</td>
                    <td id='td_datos_6' style='width:8%'>" . number_format($total_Contado, 0, ',', '.') . "</td>
                    <td id='td_datos_7' style='width:8%'>" . number_format($totalCobranza, 0, ',', '.') . "</td>
                    <td id='td_datos_8' style='width:8%'>" . number_format($TotalGasto, 0, ',', '.') . "</td>
                    <td id='td_datos_9' style='width:8%'>" . number_format($ParaDepositar, 0, ',', '.') . "</td>
                    <td id='td_datos_10' style='width:8%'>" . number_format($total_Deposito, 0, ',', '.') . "</td>
                    <td id='td_datos_11' style='width:8%'>" . number_format($Diferencia, 0, ',', '.') . "</td>
                    <td id='td_datos_12' style='width:8%'>$btnEstado</td>
                    <td id='td_datos_13' style='width:5%'>$btnVerDetalle</td>
                    <td id='td_datos_14' style='display:none;'>" . $local . "</td>
                    <td id='td_datos_15' style='display:none;'>" . $usuario . "</td>
                </tr>
            </table>";
			
			$Entrega = $Entrega + $total_Entrega;
			$CargoA = $CargoA + $total_CargoA;
			$Interes = $Interes + $total_Interes;
			$Cuotas = $Cuotas + $total_Cuotas;
			$Contado = $Contado + $total_Contado;
			$Cobranza = $Cobranza + $totalCobranza;
			$Gasto = $Gasto + $TotalGasto;
			$Depositar = $Depositar + $ParaDepositar;
			$Deposito = $Deposito + $total_Deposito;
			$Dif = $Dif + $Diferencia;
	
	
	
	
	
        }
    }

    $informacion = array("1" => "exito", "2" => $pagina, "3" => number_format($Entrega, 0, ',', '.'), "4" => number_format($CargoA, 0, ',', '.'), "5" => number_format($Interes, 0, ',', '.'), "6" => number_format($Cuotas, 0, ',', '.'), "7" => number_format($Contado, 0, ',', '.'), "8" => number_format($Cobranza, 0, ',', '.'), "9" => number_format($Gasto, 0, ',', '.'), "10" => number_format($Depositar, 0, ',', '.'), "11" => number_format($Deposito, 0, ',', '.') , "12" => number_format($Dif, 0, ',', '.') , "13" => number_format($Contador, 0, ',', '.'));
    echo json_encode($informacion);
    exit;
}


function buscarEstadoBalance($Fecha,$local,$usuario)
{
	$mysqli=conectar_al_servidor();
$query = "SELECT estado FROM estado_diferencia WHERE fecha = '$Fecha' AND local = '$local' AND usuario = '$usuario'";
$result = $mysqli->query($query);
$estadoActual = "PENDIENTE"; // valor por defecto

if ($row = $result->fetch_assoc()) {
    $estadoActual = $row['estado'];
}
	
return $estadoActual;	
}



/*Buscar */
function buscarImprimirTicketVentaContado($cod_venta)
{
$pagina="";

$detalleVenta= buscar_detalles_venta($cod_venta) ;
$Pagos=buscarpagosTituloContado($cod_venta);

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" =>number_format($Pagos[1],'0',',','.'),"4" =>$detalleVenta,"5" =>$Pagos[2] ,"6" =>number_format($Pagos[3],'0',',','.') ,"7" =>$Pagos[4]  ,"8" =>$Pagos[5]  );
echo json_encode($informacion);	
exit;
}



function actualizar_credito_descuento_interes($cod_creditoFK)
{
	
	
if($cod_creditoFK==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$consulta1="update solicituddescuentointeres set estado_uso = 'FINALIZADO' where cod_creditoFK= $cod_creditoFK and estado_uso = 'PENDIENTE'";

$stmt1 = $mysqli->prepare($consulta1);



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
	
}

/*Funcion para insertar,modificar o eliminar registros*/
function abm($CargoAdministrativo,$codCaja,$codApertura,$cod_creditoFK,$Fecha,$cod_cobradorFK,$cod_venta,$totalDeudaCuota,$totalInteres,$MontoCobrado,$MontoTarjeta,$descuento,$nrofactura,$operacion,$cod_TipoPago,$controlTipoPago,$cod_ClienteFKMora,$imprimirOpcion)
{
	
if($cod_creditoFK==""  || $totalDeudaCuota==""  || $Fecha=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

actualizar_credito_descuento_interes($cod_creditoFK);
GuardarDeudaInteres("0",$cod_creditoFK);

$datoVenta=buscardatosventa($cod_venta);
$nrof=$datoVenta[20];
$datosCredito=buscardatosdelcredito($cod_creditoFK);
$montocredito=$datosCredito[0];
$descuentocredito=$datosCredito[1];
$totalPagado=$datosCredito[2];
$totalpagacredito=$datosCredito[3];
$totalpagainteres=$datosCredito[4];
$montoInteres=0;
$interespagados=0;
$mysqli=conectar_al_servidor(); 
if($nrofactura==""){
$nrofactura=buscarnrofactura();
}
if($MontoCobrado>0){
$tipopago='Efectivo';
if($totalInteres>0){
$totalDeudaCuotaControl=$totalDeudaCuota;



if($totalDeudaCuotaControl>($MontoCobrado+$descuento)){
$pago=($MontoCobrado*50)/100;
$MontoCobrado=$MontoCobrado-$pago;
}else{
$pago=$totalInteres;
$MontoCobrado=$MontoCobrado-$pago;	
}
if($pago>0){
$descripcion="Pago de intereses, Factura Nro: *".$nrof."*";
$consulta1="Insert into pago (cod_creditoFK,Monto,Fecha,cod_cobradorFK,cod_venta_fk,comision,nrofactura,tipo,tipopago,codCaja,codApertura,descripcion,cod_tipoPagoFK,cod_moracliente,cod_tareaCobadorFK)
values(?,?,?,?,?,(select comision from venta where cod_venta='$cod_venta'),?,'Interes',?,?,?,?,'$cod_TipoPago',IFNULL((SELECT cod_tipomora from cliente where cod_cliente = '$cod_ClienteFKMora'),0),(select cod_tareaFK from credito where idcredito=$cod_creditoFK))";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssss';
$stmt1->bind_param($ss,$cod_creditoFK,$pago,$Fecha,$cod_cobradorFK,$cod_venta,$nrofactura,$tipopago,$codCaja,$codApertura,$descripcion);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
}
$interespagados=$pago;

}

$totalDeudaCuota=$montocredito-($descuentocredito+$totalpagacredito);


if($totalDeudaCuota>0 && $MontoCobrado>0){
	
if($MontoCobrado>=$totalDeudaCuota){
	$Montopagado=$totalDeudaCuota;
}else{
	$Montopagado=$MontoCobrado;
}

 $descripcion="Pago de cuotas, Factura Nro: *".$nrof."*";
if($Montopagado>0){
	
$consulta1="Insert into pago (cod_creditoFK,Monto,Fecha,cod_cobradorFK,cod_venta_fk,comision,nrofactura,tipo,tipopago,codCaja,codApertura,descripcion,cod_tipoPagoFK,cod_moracliente,cod_tareaCobadorFK)
values(?,?,?,?,?,(select comision from venta where cod_venta='$cod_venta'),?,'Pago Cuota',?,?,?,?,'$cod_TipoPago',IFNULL((SELECT cod_tipomora from cliente where cod_cliente = '$cod_ClienteFKMora'),0),(select cod_tareaFK from credito where idcredito=$cod_creditoFK))";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssss';
$stmt1->bind_param($ss,$cod_creditoFK,$Montopagado,$Fecha,$cod_cobradorFK,$cod_venta,$nrofactura,$tipopago,$codCaja,$codApertura,$descripcion);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

}

}
}


actualizarDescuento($cod_creditoFK,$descuento);
actualizarTotalCuota($cod_creditoFK,($totalDeudaCuota+$totalPagado),$totalInteres,$totalDeudaCuota);

if($CargoAdministrativo==""){
	$CargoAdministrativo="0";
}

if( $CargoAdministrativo!="0"){
$descripcion="Pago de Cargo Administrativo, Factura Nro: *".$nrof."*";
$consulta1="Insert into pago (cod_creditoFK,Monto,Fecha,cod_cobradorFK,cod_venta_fk,comision,nrofactura,tipo,tipopago,codCaja,codApertura,descripcion,cod_tipoPagoFK,cod_moracliente,cod_tareaCobadorFK)
values(?,?,?,?,?,(select comision from venta where cod_venta='$cod_venta'),?,'CARGO ADMINISTRATIVO',?,?,?,?,'$cod_TipoPago',IFNULL((SELECT cod_tipomora from cliente where cod_cliente = '$cod_ClienteFKMora'),0),(select cod_tareaFK from credito where idcredito=$cod_creditoFK))";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssss';
$stmt1->bind_param($ss,$cod_creditoFK,$CargoAdministrativo,$Fecha,$cod_cobradorFK,$cod_venta,$nrofactura,$tipopago,$codCaja,$codApertura,$descripcion);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

}

if($controlTipoPago == 0){
	

	
	$datosTicket=calcularintereses2($cod_venta,0,0,"2","2","2","no");
$totalDescuento=$datosTicket[0];
$interesespagado=$datosTicket[12];
$totalpagado=$datosTicket[3];
$acobrar=$datosTicket[4];
$deuda=$datosTicket[4];
 $totalDeuda=$datosTicket[4];
 $totalVenta=$datosTicket[11];
 $InteresActual=$datosTicket[10];
 $totalsininteres=$datosTicket[7];
$totalPagado=buscartotalpagob($cod_venta);
//$totalVenta=buscartotalventa($cod_venta);


$SmsPlazo = BuscarDatosCreditoParaMensaje($cod_creditoFK);
	$Vencmientosms = $SmsPlazo[0];
	$plazosms = $SmsPlazo[1];
	$cod_clienteFK = $datoVenta[3];
	$numeroCliente = BuscarDatosClienteParaMensaje($cod_clienteFK);
	
	if($numeroCliente != ''){
		abmMensaje($Montopagado, $plazosms, $Vencmientosms,$numeroCliente);
	}


if($imprimirOpcion){
	$paginaticket=buscar_detalles_venta($cod_venta);
	$titulopago=buscarpagosTitulo($cod_venta,$nrofactura);
}else{
	$paginaticket=buscar_detalles_venta_ticket($cod_venta);
	$titulopago=buscarpagosTituloCreditoDirecto($cod_venta,$nrofactura,$cod_creditoFK);	
}

 $datoVenta=buscardatosventa($cod_venta);
//addMasCuotas($cod_venta,$totalPagado);
$informacion =array("1" => "exito","2" =>number_format($totalPagado,'0',',','.') ,"3" =>  number_format($totalVenta,'0',',','.') ,"4" =>  number_format($totalDeuda,'0',',','.')
,"5"=> $paginaticket,"6"=> $datoVenta[11] ,"7"=> $datoVenta[19],"8"=>$nrofactura ,"9"=>$datoVenta[6]
,"11"=> number_format($interesespagado,'0',',','.') ,"12"=> number_format($deuda,'0',',','.')  ,"13"=> number_format($totalpagado,'0',',','.') 
,"14"=> number_format($totalDescuento,'0',',','.')  ,"15"=> number_format($InteresActual,'0',',','.') ,"16"=> number_format($totalsininteres,'0',',','.'),"17"=> $titulopago[2] ,"18"=>$Fecha ,"19"=> $datoVenta[20],"20"=> $datoVenta[0] 
,"21"=> $titulopago[3]
,"22"=> $titulopago[4]
,"23"=> $titulopago[5]
,"24"=> number_format($titulopago[1],'0',',','.'),"25"=>$titulopago[0]);
echo json_encode($informacion);	
exit;
}

return $interespagados;
}

function  GuardarDeudaInteres($Monto,$idcredito){
	  
	$mysqli=conectar_al_servidor();
	$consulta="Update credito set deudaInteres=$Monto where idcredito='$idcredito'";	
	
	if($Monto>=0){
	
	$stmt = $mysqli->prepare($consulta);
	

if ( ! $stmt->execute()) {
   /*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
	}
	}

}

function abmcontado($cod_venta,$descuento,$monto,$montotarjerta,$cajapredeterminada,$codApertura,$tipopago,$controlTipoPago,$controlTotal,$desde="",$nrofactura="")
{
if($cod_venta==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$datosventa=buscardatosventa($cod_venta);
if($nrofactura==""){
	$nrofactura=buscarnrofactura();
}
$descripcion="ventas";

$mysqli=conectar_al_servidor(); 

if($monto>0){
	
$consulta1="Insert into pago (cod_creditoFK,Monto,Fecha,cod_cobradorFK,cod_venta_fk,comision,tipo,tipopago,codCaja,codApertura,descripcion,cod_tipoPagoFK,nrofactura)
values((select idcredito from credito where cod_venta='$cod_venta' and plazo='Contado' limit 1),'$monto',CURDATE(),'$datosventa[5]','$cod_venta','$datosventa[18]','Pago Cuota','Efectivo','$cajapredeterminada','$codApertura','$descripcion','$tipopago','$nrofactura')";


$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}
}
  

  
editarDetallesVenta($cod_venta," *Contado ".$monto);
actualizarMetodo($cod_venta,"Corrido");


if($controlTipoPago == 0){
	$titulopago=buscarpagosTitulo($cod_venta,$nrofactura);
$paginaticket=buscar_detalles_venta($cod_venta);
$informacion =array("1" => "exito","2" => number_format($datosventa[1],'0',',','.'),"3"=>$paginaticket,"4"=>$titulopago[2] );
echo json_encode($informacion);	
exit;
}

}

function actualizarMetodo($cod_venta,$Metodo){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update venta set TipoPago=?,TipoVenta='CONTADO' where cod_venta=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$Metodo,$cod_venta); 

if (!$stmt1->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 mysqli_close($mysqli);

}

function cambiarcomision($idPago,$comision)
{

if($idPago==""  || $comision=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();


$consulta1="update pago set comision=? where idPago=?";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$comision,$idPago);




if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

function cargarpagos($CargoAdministrativo,$MontoEfectivo,$MontoTarjeta,$MontDescuento,$Fecha,$cod_cobradorFK,$cod_venta,$controlfecha,$nrofactura,$codCaja,$codApertura,$codTipoPago,$controlTipoPago,$cod_ClienteFKMora,$imprimirOpcion,&$interesesPendientesRecibo=null){
	$mysqli=conectar_al_servidor();
	

	$sql= "Select Monto,idcredito,cr.fechapago,total,plazo,(totalinteres + cr.deudaInteres) as totalinteres,cr.descuento,vt.num_factura,vt.puntoexpedicion,cr.interes,vt.cod_clienteFK,
	(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
	(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as nrodocliente,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and tipo='Pago Cuota'),0) as totalPago,descuentoInteres,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and tipo='Interes'),0) as totalPagoInteres
	from credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
	where cr.cod_venta='$cod_venta' and IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and tipo='Pago Cuota'),0) < (cr.Monto-cr.descuento)order by cr.idcredito asc";
	

	
$pagado=$MontoTarjeta+$MontoEfectivo;		  
$clientenombre="";
$nrodocliente="";
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro=$valor;
 $montoDescuento=0;
$cod_clienteFK='';
$ControlPagoCargoAdmin=0;
// $interesDescuento = obtenerExisteDescuentoInteres($cod_venta);
 $plazo='';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     $idcredito=$valor['idcredito'];
			  $Monto=utf8_encode($valor['Monto']);
			  $totalinteres=utf8_encode($valor['totalinteres']);
			  $totalPago=utf8_encode($valor['totalPago']);
			  $clientenombre=utf8_encode($valor['clientenombre']);
			  $nrodocliente=utf8_encode($valor['nrodocliente']);
			  $totalpagainteres=utf8_encode($valor['totalPagoInteres']);
			  $descuento=utf8_encode($valor['descuento']);
			  $num_factura=utf8_encode($valor['num_factura']);
			  $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
			  $cod_clienteFK=utf8_encode($valor['cod_clienteFK']);
			  $interes=utf8_encode($valor['interes']);
			  $descuentoInteres=utf8_encode($valor['descuentoInteres']);
			  if($puntoexpedicion!=""){
				  $nrof=$puntoexpedicion."-".$num_factura;
				  }else{
				  $nrof=$num_factura;
			  }

if($totalinteres < $descuentoInteres){
	$totalinteres = 0;
}

if($CargoAdministrativo==""){
	$CargoAdministrativo="0";
}

if( $CargoAdministrativo!="0" && $pagado!="0" && $ControlPagoCargoAdmin==0){
$descripcion="Pago de Cargo Administrativo, Factura Nro: *".$nrof."*";
$consulta1="Insert into pago (cod_creditoFK,Monto,Fecha,cod_cobradorFK,cod_venta_fk,comision,nrofactura,tipo,tipopago,codCaja,codApertura,descripcion,cod_tipoPagoFK,cod_moracliente,cod_tareaCobadorFK)
values(?,?,?,?,?,(select comision from venta where cod_venta='$cod_venta'),?,'CARGO ADMINISTRATIVO','Efectivo',?,?,?,'$codTipoPago',IFNULL((SELECT cod_tipomora from cliente where cod_cliente = '$cod_ClienteFKMora'),0),(select cod_tareaFK from credito where idcredito=$idcredito))";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssss';
$stmt1->bind_param($ss,$idcredito,$CargoAdministrativo,$Fecha,$cod_cobradorFK,$cod_venta,$nrofactura,$codCaja,$codApertura,$descripcion);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

$pagado = $pagado - $CargoAdministrativo;
$ControlPagoCargoAdmin=1;
}

 
	 $montoDescuento=0;
         	if($MontDescuento>0){
				
			  $controldescuento=($Monto+$totalinteres)-($totalPago+$descuento);
			  if($controldescuento<0){
			  $controldescuento=0;
			  }
			   if($MontDescuento>$controldescuento){
                $sobrantedescuento=$MontDescuento-$controldescuento;
				$MontDescuento=$sobrantedescuento;
                $montoDescuento=($Monto+$totalinteres)-($totalPago+$descuento);
                 }else{
				$montoDescuento=$MontDescuento;
				$MontDescuento=0;
				 }
				 
				 }
				 
			if($interes > 0){			  
			  
if($totalinteres>0){ 
	 
	 // actualizar_credito_descuento_interes_parcial($cod_venta);
	
$montoaDescontarInteres=0;
$totalinteres = ceil($totalinteres / 1000) * 1000;
$totalinteres -= $descuentoInteres;

if(is_array($interesesPendientesRecibo)){
	if(isset($interesesPendientesRecibo[$idcredito])){
		if($totalinteres>$interesesPendientesRecibo[$idcredito]){
			$totalinteres=$interesesPendientesRecibo[$idcredito];
		}
	}else{
		$totalinteres=0;
	}
	if($totalinteres<0){
		$totalinteres=0;
	}
}
 
$totaldeudacontrol=($Monto+$totalinteres)-($totalPago+$descuento+$montoDescuento);	


	 
if($totaldeudacontrol>($pagado+$MontDescuento)){
// REGLA DE TRES PARA CALCULAR INTERES
// deudacuota=totalInteres;
// pagado=x
$deudacuota=$Monto-$totalPago;
if($totalinteres>=$pagado){
	$interescobrar=$pagado;
	
	
	$MontoInteresGuardar=$totalinteres-$pagado;
	
	$MontoInteresGuardar = ceil($MontoInteresGuardar / 1000) * 1000;
	
	if($pagado!=0){
	GuardarDeudaInteres($MontoInteresGuardar,$idcredito);
	}
	
}else{
	
	
	$interescobrar=$totalinteres;
	GuardarDeudaInteres("0",$idcredito);
}
//$interescobrar=($pagado*$totalinteres)/$deudacuota;

$interescobrar = ceil($interescobrar / 1000) * 1000;

$pago=$interescobrar;
$pagado=$pagado-$pago;
}else{
$pago=$totalinteres;
$pagado=$pagado-$pago;	
}	

$totalinteres = ceil($totalinteres / 1000) * 1000;

 $descripcion="Pago de intereses, Factura Nro: *".$nrof."*";

	cargarPagosDeudas($pago,$Fecha,$cod_cobradorFK,$idcredito,$cod_venta,$nrofactura,"Interes","Efectivo",$codCaja,$codApertura,$descripcion,$codTipoPago,$cod_ClienteFKMora);


	if(is_array($interesesPendientesRecibo) && isset($interesesPendientesRecibo[$idcredito])){
		$interesesPendientesRecibo[$idcredito]=$interesesPendientesRecibo[$idcredito]-$pago;
		if($interesesPendientesRecibo[$idcredito]<0){
			$interesesPendientesRecibo[$idcredito]=0;
		}
	}

	  $totalPago=$totalPago+$pago;
				  
			  }
			   
			   }
			   
			   $deuda=($Monto+$totalinteres)-($totalPago+$descuento+$montoDescuento);
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
			  if($controlfecha=="2"){
				  $Fecha=utf8_encode($valor['fechapago']);
			  }
			 
					if($pago>0 && $c==1){
						GuardarDeudaInteres("0",$idcredito);
						 $descripcion="Pago de Cuotas, Factura Nro: *".$nrof."*";	

	 cargarPagosDeudas($pago,$Fecha,$cod_cobradorFK,$idcredito,$cod_venta,$nrofactura,"Pago Cuota","Efectivo",$codCaja,$codApertura,$descripcion,$codTipoPago,$cod_ClienteFKMora);
						
							
						 if(($pago+$montoDescuento)>=$deuda){
							 if($plazo!=""){
							 $plazo.=", ".utf8_encode($valor['plazo']);
							 }else{
							 $plazo.=utf8_encode($valor['plazo']);
							 }
						 }else{
							 if($plazo!=""){
							 $plazo.=" y pago parcial en cuota ".utf8_encode($valor['plazo'])." ";
							 }else{
							$plazo.="Pago parcial en cuota ".utf8_encode($valor['plazo'])." ";
							 }
							
							 
						 }
						  
					}		 
				 
	      if($montoDescuento>0){
		  actualizarDescuento($idcredito,$montoDescuento);
		  }
			  
			  
	  }
 }
 
		if($controlTipoPago == 0){
			$datosTicket=calcularintereses2($cod_venta,0,0,"2","2","2","no");

$totalDescuento=$datosTicket[0];
$totalinteresespagado=$datosTicket[12];
$totalpagado=$datosTicket[3];
$acobrar=$datosTicket[4];
$deuda=$datosTicket[4];
 $totalDeuda=$datosTicket[4];
 $totalVenta=$datosTicket[11];
 $InteresActual=$datosTicket[10];
 $totalsininteres=$datosTicket[7];
 
$totalPagado=buscartotalpagob($cod_venta);
//$totalVenta=buscartotalventa($cod_venta);
// $paginaticket=buscar_detalles_venta($cod_venta);

// $titulopago=buscarpagosTitulo($cod_venta,$nrofactura);


$numeroCliente = BuscarDatosClienteParaMensaje($cod_clienteFK);
if($numeroCliente != ''){
	abmMensajeParcial($plazo, $MontoEfectivo,$numeroCliente);
}

if($imprimirOpcion){
	$paginaticket=buscar_detalles_venta($cod_venta);
	$titulopago=buscarpagosTitulo($cod_venta,$nrofactura);
}else{
	$paginaticket=buscar_detalles_venta_ticket($cod_venta);
	$titulopago=buscarpagosTituloCreditoDirecto($cod_venta,$nrofactura,$cod_creditoFK);	
}



$datoVenta=buscardatosventa($cod_venta);
//addMasCuotas($cod_venta,$totalPagado);
$informacion =array("1" => "exito","2" =>number_format($totalPagado,'0',',','.') ,"3" =>  number_format($totalVenta,'0',',','.') ,"4" =>  number_format($totalDeuda,'0',',','.'),"5"=> $paginaticket
,"6"=> $plazo,"7"=> $clientenombre,"8"=> $nrodocliente,"9"=> $nrofactura,"10"=>$datoVenta[6],"11"=>  number_format($totalinteresespagado,'0',',','.') ,
"12"=>  number_format($deuda,'0',',','.') ,"13"=> number_format($totalpagado,'0',',','.') ,
"14"=> number_format($totalDescuento,'0',',','.'),"15"=> number_format($InteresActual,'0',',','.'),
"16"=> number_format($totalsininteres,'0',',','.') ,"17"=> $datoVenta[2] ,"18"=> $Fecha ,"19"=> $titulopago[2] ,"20"=> $datoVenta[0] ,"21"=> $datoVenta[20]
,"22"=> $titulopago[3]
,"23"=> $titulopago[4]
,"24"=> $titulopago[5]
,"25"=> $titulopago[1] ,"26"=> $titulopago[0]);
echo json_encode($informacion);	
exit;
		}		
}

function actualizarDescuento($idcredito,$descuento){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update credito set descuento=descuento+'$descuento' where idcredito='$idcredito'";	

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 mysqli_close($mysqli);

}

function  cargarPagosDeudas($Monto,$Fecha,$cod_cobradorFK,$cod_creditoFK,$cod_venta,$nrofactura,$tipo,$tipopago,$codCaja,$codApertura,$descripcion,$codtipoPago,$cod_ClienteFKMora){
	  
	  
	 if($Monto!="0"){
		  	  
	$mysqli=conectar_al_servidor();
	$consulta="Insert into pago (Monto,Fecha,cod_creditoFK,cod_cobradorFK,cod_venta_fk,comision,nrofactura,tipo,tipopago,codCaja,codApertura,descripcion,cod_tipoPagoFK,cod_moracliente,cod_tareaCobadorFK) 
	values('$Monto','$Fecha','$cod_creditoFK','$cod_cobradorFK','$cod_venta',(select comision from venta where cod_venta='$cod_venta'),'$nrofactura','$tipo','$tipopago','$codCaja','$codApertura','$descripcion','$codtipoPago',IFNULL((SELECT cod_tipomora from cliente where cod_cliente = '$cod_ClienteFKMora'),0),(select cod_tareaFK from credito where idcredito=$cod_creditoFK))";	
	
	$stmt = $mysqli->prepare($consulta);
	
if ( ! $stmt->execute()) {
   /*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
	  }

}
 
 
function buscarnrofactura()
{
	
	
	$mysqli=conectar_al_servidor();
	 $sql= " Select Fecha, cod_creditoFK, nrofactura ,(CAST(nrofactura AS UNSIGNED) ) as nro  from pago where length(nrofactura)=7 
	 order by idPago desc limit 1 ";
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

$NroFactura=1;

 if ($valor>0){
	  while ($valor= mysqli_fetch_assoc($result))
		{
			 $NroFactura=$valor['nro'];
			 $NroFactura ++;
		}
 
 } 
   
 if($NroFactura<10){
	 $NroFactura="000000".$NroFactura;
 }
 if($NroFactura<100 && $NroFactura>=10){
	 $NroFactura="00000".$NroFactura;
 }
 if($NroFactura<1000 && $NroFactura>=100){
	 $NroFactura="0000".$NroFactura;
  } 
  
  if($NroFactura<10000 && $NroFactura>=1000){
	 $NroFactura="000".$NroFactura;
  } 
  
  if($NroFactura<100000 && $NroFactura>=10000){
	 $NroFactura="00".$NroFactura;
  } 
  if($NroFactura<1000000 && $NroFactura>=100000){
	 $NroFactura="0".$NroFactura;
  } 
 
 
  mysqli_close($mysqli); 
  
 return $NroFactura;


}




/*Funcion para insertar,modificar o eliminar registros*/
function quitarpago($idFkVenta,$cod_creditoFK,$motivo,$monto,$cuota,$nrofactura,$user,$cod_pago)
{
	
$datosPagos=buscardatospagos($cod_pago,"1");
	
	
	
	ingresarapagoseliminados($idFkVenta,$cod_creditoFK,$motivo,$datosPagos[1],$cuota,$nrofactura,$user,
	$datosPagos[6],
	$datosPagos[4],
	$datosPagos[7],
	$datosPagos[8],
	$datosPagos[9],
	$datosPagos[10],
	$datosPagos[12],
	$datosPagos[13],
	$datosPagos[14],
	$datosPagos[15],
	$datosPagos[16],
	$datosPagos[17],
	$datosPagos[19],
	$datosPagos[20],
	$datosPagos[21],
	$datosPagos[22],
	$datosPagos[23],
	$cod_pago);

$mysqli=conectar_al_servidor(); 
$consulta1="delete from pago where idPago='$cod_pago' ";	

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

/*Funcion para insertar,modificar o eliminar registros*/
function ingresarapagoseliminados($idFkVenta,$cod_creditoFK,$motivo,$monto,$cuota,$nrofactura,$user,$cod_cobradorFK,$Tipo,$hora_pago,$comision,$lat,$lot,$tipopago,$codApertura,$codCaja,$descripcion,$codAperturaApp,$cod_tipoPagoFK,$nrocuenta,$banco,$nroboleta,$cod_moracliente,$cod_tareaCobadorFK,$idPago)
{

$mysqli=conectar_al_servidor(); 

$consulta1="Insert into pagoseliminados (motivo, monto, cuota, fecha, cod_usuario, nroventa,cod_ventaFK,cod_creditoFK,cod_cobradorFK,Tipo,hora_pago,comision,lat,lot,nrofactura,tipopago,codApertura,codCaja,descripcion,codAperturaApp,cod_tipoPagoFK,nrocuenta,banco,nroboleta,cod_moracliente,cod_tareaCobadorFK,idPago)
values('$motivo','$monto','$cuota',CURRENT_TIMESTAMP,'$user','$nrofactura','$idFkVenta','$cod_creditoFK','$cod_cobradorFK','$Tipo','$hora_pago','$comision','$lat','$lot','$nrofactura','$tipopago','$codApertura','$codCaja','$descripcion','$codAperturaApp','$cod_tipoPagoFK','$nrocuenta','$banco','$nroboleta','$cod_moracliente','$cod_tareaCobadorFK','$idPago')";

// echo $consulta1;
// exit;

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


return true;
}

 

function quitarhistorialpago($cod_pago,$codVenta)
{
	

$datosPagos=buscardatospagos($cod_pago,"1");





$mysqli=conectar_al_servidor(); 
$consulta1="delete from pago where idPago='$cod_pago' ";
$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

$user=$_POST['useru'];

$MontoPago=number_format($datosPagos[1],'0',',','.');
$consulta1="Insert into pagoseliminados (motivo, monto, cuota, fecha, cod_usuario, nroventa)
values('Eliminado Desde Arqueo - Sistema','$MontoPago','XX',CURRENT_TIMESTAMP,'$user','$datosPagos[2]')";
$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}
$DetalleCreditoPagoInteres=buscardatospagosTipo($datosPagos[3],"1");
$DetalleCreditoPagoCuota=buscardatospagosTipo($datosPagos[3],"2");
$DetalleCreditoPagoTotal=buscardatospagosTipo($datosPagos[3],"3");

$datos=calcularintereses2($datosPagos[3],0,0,"2","2","1","no");

$condicionDeudaInteres=buscardatosCreditoDeuda($datosPagos[3]);

$total_interes=$datos[1];
if($datosPagos[4]=='Interes' ){
		
	if($DetalleCreditoPagoInteres=="0" && $DetalleCreditoPagoCuota!="0" ){
	$consulta1="update credito set deudaInteres= ((deudaInteres + ".$datosPagos[1].")) where idcredito=$datosPagos[3] ";
 
		$stmt1 = $mysqli->prepare($consulta1);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}		
	}
	
	if($DetalleCreditoPagoInteres!="0" ){
		$consulta1="update credito set deudaInteres=(deudaInteres + ".$datosPagos[1]." - $total_interes) where idcredito=$datosPagos[3] ";
		$stmt1 = $mysqli->prepare($consulta1);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}		
	}	

	if($DetalleCreditoPagoCuota==0 && $condicionDeudaInteres!=0 ){
	$consulta1="update credito set deudaInteres= (deudaInteres + ".$datosPagos[1]."  - $total_interes )  where idcredito=$datosPagos[3] ";
		// echo($consulta1);
		// exit;
		
		$stmt1 = $mysqli->prepare($consulta1);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}

	}
	
	if($DetalleCreditoPagoCuota==0 && $condicionDeudaInteres==0){
			$consulta1="update credito set deudaInteres=0 , totalinteres=0 , totaldeuda=0, total=0 where idcredito=$datosPagos[3] ";
		
		$stmt1 = $mysqli->prepare($consulta1);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}
	}
	
	
}



if($datosPagos[4]!='Interes' ){
	
	
	if($DetalleCreditoPagoCuota==0){
			$consulta1="update credito set deudaInteres=0 , totalinteres=0 , totaldeuda=0, total=0 where idcredito=$datosPagos[3] ";
		
		$stmt1 = $mysqli->prepare($consulta1);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}
	}
	
}
	
	

$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}



/*Buscar */
function buscartotalpago($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select IFNULL(sum(Monto),0) as totalpago from pago where cod_creditoFK='$buscar'";/*Sentencia para buscar registros*/
$totalpago = 0;   
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

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$totalpago = utf8_decode($valor['totalpago']);/*Obtenemos el registro mediante el nombre del atributo */      




}
}

return $totalpago;
}

/*Buscar */
function buscartotalventa($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select (total_venta-descuento) as totalVenta from venta where cod_venta='$buscar'";/*Sentencia para buscar registros*/
$totalVenta = 0;   
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

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$totalVenta = utf8_encode($valor['totalVenta']);/*Obtenemos el registro mediante el nombre del atributo */      




}
}

return $totalVenta;
}




/*Buscar */
function buscartotalpagob($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select sum(pg.Monto) as totalpago,vt.pago as totalEntrega
 from pago pg inner join venta vt  on vt.cod_venta=pg.cod_venta_fk 
 where pg.cod_venta_fk='$buscar'";/*Sentencia para buscar registros*/

$totalpago = 0;   
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

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$totalpago = utf8_decode($valor['totalpago']);/*Obtenemos el registro mediante el nombre del atributo */      
$totalEntrega = utf8_decode($valor['totalEntrega']);      
$totalpago=$totalpago+$totalEntrega ;



}
}

return $totalpago;
}





/*Buscar */
function buscarhistorialpagos($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select idPago,Fecha,Monto,nrofactura,tipo,
(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre
 from pago where cod_creditoFK='$buscar'";

 $pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$idPago = utf8_encode($valor['idPago']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$nrofactura = utf8_encode($valor['nrofactura']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$tipo = utf8_encode($valor['tipo']);      
$totalPagado=$Monto+$totalPagado;
 	
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatospagos(this)'>
<td id='td_datos_1' style='display:none' >".$idPago."</td>
<td id='td_datos_6' style='width:10%' >".$nrofactura."</td>
<td id='td_datos_5' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_2' style='width:10%' >".$Fecha."</td>
<td id='td_datos_7' style='width:10%'>".$tipo."</td>
<td id='td_datos_3' style='width:10%'>".$cobradornombre."</td>

</tr>
</table>
";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" =>number_format($totalPagado,'0',',','.'),"4" =>$nroRegistro  );
echo json_encode($informacion);	
exit;
}

/*Buscar */
function buscarHistorialPagosAReimprimir($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select vt.cod_venta, cr.plazo,(cr.Monto - cr.descuento) as montocredito,pg.idPago,pg.Fecha,pg.Monto,pg.nrofactura,pg.tipo,
(SELECT nombre FROM tipopago where cod_tipoPago = pg.cod_tipoPagoFK) as tipopg,
vt.fecha_venta,vt.TipoVenta,vt.total_venta,pg.titulocuota,vt.puntoexpedicion,vt.num_factura,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as clientedoc,
datediff(pg.Fecha,(select cr.fechapago from credito cr where pg.cod_creditoFK=cr.idcredito limit 1)) as diff,
(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,
ifnull((select sum(monto) from pago p where vt.cod_venta=p.cod_venta_fk and p.tipo='Pago Cuota' and p.idPago<=pg.idPago ),0) as totalPago
 from pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk
 inner join credito cr on cr.idcredito=pg.cod_creditoFK
 where pg.cod_venta_fk='$buscar' and pg.Monto!=0 order by pg.idPago ";
 
 // echo($sql);
 // exit;

$datos=calcularintereses2($buscar,0,0,"2","2","2","no");
$totalEnDescuento=$datos[0];
$totalapagarinteres=$datos[1];
$totalInteres=$datos[12];
$totalApagar=$datos[4];
$diasatrasado=$datos[5];
$acobrar=$datos[8];
$totalCredito=$datos[11];
$totalPagado=$datos[3];
$TotalPagadoSinInteres=$datos[13];
$TotalApagarSinInteres=$datos[7];
 $pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlNroFactura="";
$titulopago="";
$montopago="0";
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$cod_venta = utf8_encode($valor['cod_venta']);  
$idPago = utf8_encode($valor['idPago']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$nrofactura = utf8_encode($valor['nrofactura']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$tipo = utf8_encode($valor['tipo']);      
$diff = utf8_encode($valor['diff']);      
$clientedoc = utf8_encode($valor['clientedoc']);      
$clientenombre = utf8_encode($valor['clientenombre']);      
$TipoVenta = utf8_encode($valor['TipoVenta']);      
$total_venta = utf8_encode($valor['total_venta']);      
$titulocuota = utf8_encode($valor['titulocuota']);      
$plazo = utf8_encode($valor['plazo']);      
$montocredito = utf8_encode($valor['montocredito']); 

$totalPagado = utf8_encode($valor['totalPago']); 
$tipopg = utf8_encode($valor['tipopg']); 



$fecha_venta = utf8_encode($valor['fecha_venta']); 

$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$num_factura = utf8_encode($valor['num_factura']);  

if($diff<=0){
$diff=0;	
}
   $DetalleDescripcionVenta=buscar_detalles_venta($cod_venta);

$montopago=0;
$montopago=$montopago+$Monto;
$titulopago=buscarpagosTitulo($cod_venta,$nrofactura);
// $totalPagado=$titulopago[1];


$nueva_fecha = date("d-m-Y", strtotime($Fecha));


$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerPagosReImprimir(this)'>
<td id='' style='display:none' >".$idPago."</td>
<td id='td_datos_1' style='width:10%' >".$nrofactura."</td>
<td id='td_datos_2' style='width:10%'>". number_format($montopago,'0',',','.')."</td>
<td id='td_datos_21' style='width:10%' >".$plazo."</td>
<td id='td_datos_22' style='width:10%' >".$tipo."</td>
<td   style='width:10%' >".$nueva_fecha."</td>
<td   style='width:15%' >".$tipopg."</td>
<td id='td_datos_3' style='display:none' >".$Fecha."</td>
<td id='td_datos_4' style='width:10%'>".$cobradornombre."</td>
<td id='td_datos_5' style='display:none'>".$diff."</td>
<td id='td_datos_6' style='display:none'>".$clientedoc."</td>
<td id='td_datos_7' style='display:none'>".$clientenombre."</td>
<td id='td_datos_8' style='display:none'>".$TipoVenta."</td>
<td id='td_datos_9' style='display:none'>".  number_format($totalEnDescuento,'0',',','.')."</td>
<td id='td_datos_10' style='display:none'>". number_format($totalInteres,'0',',','.')."</td>
<td id='td_datos_11' style='display:none'>". number_format($totalApagar,'0',',','.') ."</td>
<td id='td_datos_12' style='display:none'>".$diasatrasado."</td>
<td id='td_datos_13' style='display:none'>". number_format($acobrar,'0',',','.') ."</td>
<td id='td_datos_14' style='display:none'>". number_format($totalCredito,'0',',','.')  ."</td>
<td id='td_datos_15' style='display:none'>". number_format($totalPagado,'0',',','.')  ."</td>
<td id='td_datos_16' style='display:none'>". number_format($total_venta,'0',',','.')  ."</td>
<td id='td_datos_17' style='display:none'>". number_format($TotalPagadoSinInteres,'0',',','.') ."</td>
<td id='td_datos_18' style='display:none'>". number_format($TotalApagarSinInteres,'0',',','.')  ."</td>
<td id='td_datos_20' style='display:none'>". number_format($totalapagarinteres,'0',',','.') ."</td>
<td id='td_datos_19' style='display:none'>". $titulopago[0] ."</td>
<td id='td_datos_23' style='display:none'>". $puntoexpedicion." ".$num_factura."</td>
<td id='td_datos_24' style='display:none'>". $titulopago[2] ."</td>
<td id='td_datos_25' style='display:none'>". $DetalleDescripcionVenta."</td>
<td id='td_datos_26' style='display:none'>". $fecha_venta ."</td>
<td id='td_datos_27' style='display:none'>". $titulopago[3] ."</td>
<td id='td_datos_28' style='display:none'>". $titulopago[4] ."</td>
<td id='td_datos_29' style='display:none'>". $titulopago[5] ."</td>
<td id='td_datos_30' style='display:none'>". $titulopago[1] ."</td>
</tr>
</table>
";



if($controlNroFactura==""){
$controlNroFactura=$nrofactura;
}
 

}
 


}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" =>number_format($totalPagado,'0',',','.'),"4" =>$nroRegistro  );
echo json_encode($informacion);	
exit;
}

function buscar_dias_grafica_promedio_pago_solicitud_aprobar($buscar)
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


$array_diasAtrazados = array();
foreach ($arraycod_Ventas as $cod_venta) {
   

$sql= "select vt.cod_venta, cr.plazo,(cr.Monto - cr.descuento) as montocredito,pg.idPago,pg.Fecha,pg.Monto,pg.nrofactura,pg.tipo,
(SELECT nombre FROM tipopago where cod_tipoPago = pg.cod_tipoPagoFK) as tipopg,
vt.fecha_venta,vt.TipoVenta,vt.total_venta,pg.titulocuota,vt.puntoexpedicion,vt.num_factura,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as clientenombre,
(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as clientedoc,
datediff(pg.Fecha,(select cr.fechapago from credito cr where pg.cod_creditoFK=cr.idcredito limit 1)) as diff,
(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,
ifnull((select sum(monto) from pago p where vt.cod_venta=p.cod_venta_fk and p.tipo='Pago Cuota' and p.idPago<=pg.idPago ),0) as totalPago
 from pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk
 inner join credito cr on cr.idcredito=pg.cod_creditoFK
 where vt.cod_venta='$cod_venta' and pg.Monto!=0 and cr.tipo !='ENTREGA' order by pg.idPago ";
  
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
$cod_venta = utf8_encode($valor['cod_venta']);  
$idPago = utf8_encode($valor['idPago']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$nrofactura = utf8_encode($valor['nrofactura']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$tipo = utf8_encode($valor['tipo']);      
$diff = utf8_encode($valor['diff']);      
$clientedoc = utf8_encode($valor['clientedoc']);      
$clientenombre = utf8_encode($valor['clientenombre']);      
$TipoVenta = utf8_encode($valor['TipoVenta']);      
$total_venta = utf8_encode($valor['total_venta']);      
$titulocuota = utf8_encode($valor['titulocuota']);      
$plazo = utf8_encode($valor['plazo']);      
$montocredito = utf8_encode($valor['montocredito']); 

$totalPagado = utf8_encode($valor['totalPago']); 
$tipopg = utf8_encode($valor['tipopg']); 



$fecha_venta = utf8_encode($valor['fecha_venta']); 

$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$num_factura = utf8_encode($valor['num_factura']);  

if($diff <0){
	$diff =0;
}

$totalDiasAtrasados+=$diff;


}
}



$prom = 0;
if($nroRegistro != "0"){
$prom = round($totalDiasAtrasados / $nroRegistro);
}

array_push($array_diasAtrazados,$prom);

}



/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito", "2"=>$array_diasAtrazados, "3"=>$array_nro_factura);
echo json_encode($informacion);	
exit;
}








function buscarpagoseliminados($fecha1,$fecha2,$cliente,$ci,$motivo,$fecha)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
$filas=array();
$condicionfecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionfecha=" and fecha>='$fecha1 00:00:00'and fecha<='$fecha2 23:59:59'";
}

$condicionCliente = '';
if($cliente != ''){
	$condicionCliente = " and (SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = (SELECT cod_clienteFK FROM venta WHERE cod_venta = cod_ventaFK)) like '%".$cliente."%'";
}

$condicionci = '';
if($ci != ''){
	$condicionci = " and (SELECT ci_cliente FROM cliente WHERE cod_cliente = (SELECT cod_clienteFK FROM venta WHERE cod_venta = cod_ventaFK)) like '%".$ci."%'";
}

$condicionmotivo = '';
if($motivo != ''){
	$condicionmotivo = " and motivo like '%".$motivo."%'";
}

$condicionfechafiltro = '';
if($fecha != ''){
	$condicionfechafiltro = " and date_format(fecha,'%Y-%m-%d') = '".$fecha."'";
}


$sql= "select idpagoseliminados, motivo, monto, cuota, fecha, cod_usuario, nroventa,
(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona = (SELECT cod_clienteFK FROM venta WHERE cod_venta = cod_ventaFK)) as nombre_persona,
(SELECT ci_cliente FROM cliente WHERE cod_cliente = (SELECT cod_clienteFK FROM venta WHERE cod_venta = cod_ventaFK)) as ci_cliente,
(Select nombre_persona from persona where cod_persona=cod_usuario) as nombreusuario
 from pagoseliminados where idpagoseliminados!='0' ".$condicionfecha.$condicionCliente.$condicionci.$condicionmotivo.$condicionfechafiltro;
 
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



$idpagoseliminados = utf8_encode($valor['idpagoseliminados']);    
$motivo = utf8_encode($valor['motivo']);      
$monto = utf8_encode($valor['monto']);      
$cuota = utf8_encode($valor['cuota']);      
$fecha = utf8_encode($valor['fecha']);      
$nombreusuario = utf8_encode($valor['nombreusuario']);      
$nroventa = utf8_encode($valor['nroventa']);
$nombre_persona = utf8_encode($valor['nombre_persona']);
$ci_cliente = utf8_encode($valor['ci_cliente']);

$fecha = date("d-m-Y H:i:s", strtotime($fecha));

$filas[]=array(
	"codigo" => $idpagoseliminados,
	"numero_venta" => $nroventa,
	"monto" => (float)$monto,
	"monto_formateado" => number_format($monto,'0',',','.'),
	"cuota" => $cuota,
	"cliente" => $nombre_persona,
	"documento" => $ci_cliente,
	"motivo" => $motivo,
	"fecha" => $fecha,
	"usuario" => $nombreusuario
);
   
if($formato!='json'){
$styleName=CargarStyleTable($styleName);
$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td style='width:10%'>".$nroventa."</td>
<td style='width:10%'>".$monto."</td>
<td style='width:10%'>".$cuota."</td>
<td style='width:10%'>".$nombre_persona."</td>
<td style='width:10%'>".$ci_cliente."</td>
<td style='width:10%'>".$motivo."</td>
<td style='width:10%'>".$fecha."</td>
<td style='width:10%'>".$nombreusuario."</td>
</tr>
</table>";

}
}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" =>number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}






/*Buscar */
function Arqueo($tipo_cliente,$tipo,$fecha1,$fecha2,$fecha_venc,$local,$factura,$cliente,$fechafija,$cobrador,$metodo,$codCaja,$condicion,$cod_cobradorFK,$cobradorasig,$tiempo_cobro,$codMoraCliente,$Entrega,$tipo_comprobante)
{

$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
$filasEntrega=array();
$filasCuota=array();

 $totalRegistro=0;
	 $pagina="";
	  $condicionfecha="";
	 if($fecha1!="" && $fecha2!=""){
		 $condicionfecha=" and  DATE(pg.Fecha) between'".$fecha1."' and '".$fecha2."'";
	 }
	 $condicionfechafiltro="";
	 if($fechafija!=""){
	   $condicionfechafiltro=" and DATE(pg.Fecha) ='".$fechafija."'";		
	 }
	 $condicionfactura="";
	 if($factura!=""){
	   $condicionfactura=" and vt.num_factura like '%".$factura."%'";		
	 }
	 $condicionmetodo="";
	 if($metodo!=""){
	   $condicionmetodo=" and pg.cod_tipoPagoFK= '".$metodo."'";		
	 }
	 
	 $condiciontipo_cliente="";
	 if($tipo_cliente!=""){
	   $condiciontipo_cliente=" and (Select tipo_cliente from cliente where cod_cliente=cod_clienteFK limit 1)= '".$tipo_cliente."'";		
	 }
	 $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }
	 $condicioncliente="";
	 if($cliente!=""){
	   $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK limit 1) like '%".$cliente."%'";		
	 }
	 $condicioncobrador="";
	 if($cobrador!=""){
	   $condicioncobrador=" and (Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK limit 1) like '%".$cobrador."%'";	
	 }
	 
	 $condicioncobradorasig=" and ( select nombre_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=
	(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) like '%".$cobradorasig."%'";
	 
	 $condicioncajaCobrador="";
	 if($codCaja!=""){
	   $condicioncajaCobrador=" and codAperturaApp = '".$codCaja."'";		
	 }
	 
	 $condicionMoraCliente="";
	 if($codMoraCliente!=""){
	   $condicionMoraCliente=" and pg.cod_moracliente = '".$codMoraCliente."'";		
	 }
 
	 $condicioncajacondicion="";
	 if($condicion!=""){
	   $condicioncajacondicion=" and vt.TipoVenta = '".$condicion."'";		
	 }
	 
	 $condiciontiempo_cobro="";
	 if($fecha_venc != ""){
		 if($tiempo_cobro == "1"){
		$condiciontiempo_cobro=" and (Select fechapago from credito l where l.idcredito=pg.cod_creditoFK) >= '$fecha_venc'";		
		}
		if($tiempo_cobro =="2"){
		 $condiciontiempo_cobro=" and (Select fechapago from credito l where l.idcredito=pg.cod_creditoFK) <= '$fecha_venc'";		
		}
	 }
	 	 
	 $condiciontipo="";
	 if($tipo!=""){
	   $condiciontipo=" and pg.tipo = '".$tipo."'";		
	 }
	 
	 $condiciontipocomprobante="";
	 if($tipo_comprobante!=""){
	   $condiciontipocomprobante=" and vt.tipo_comprobante = '".$tipo_comprobante."'";		
	 }
	 
	 $condicionCodCobrador="";
	 if($cod_cobradorFK!=""){
	   $condicionCodCobrador=" and pg.cod_cobradorFK ='".$cod_cobradorFK."'";		
	 }

 $condicionEntrega="";
	 if($Entrega=="Cuota"){
	   $condicionEntrega=" and (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) !='Entrega'";		
	 }
	 if($Entrega=="Entrega"){
	   $condicionEntrega=" and ( (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='Entrega' or (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='ENTREGA' )";		
	 }

	
			$sql= "select   vt.TipoVenta,vt.puntoexpedicion,vt.tipo_comprobante,pg.idPago,pg.tipo, pg.Fecha, sum(pg.Monto) as Monto,pg.cod_venta_fk,pg.tipopago,pg.cod_tipoPagoFK,vt.cod_clienteFK,pg.cod_creditoFK,
			(SELECT nombre from tipopago where cod_tipoPago = cod_tipoPagoFK) as metodo,
			pg.comision,pg.nrofactura,pg.lot, pg.lat,(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as nombrecliente,
			IFNULL((Select calificacion_cliente from cliente where cod_cliente=cod_clienteFK),'SIN REGISTRO') as calificacion_cliente,
			(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as documento,
			(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,pg.hora,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
			(Select upper(plazo) from credito l where l.idcredito=pg.cod_creditoFK) as plazo,
			(Select fechapago from credito l where l.idcredito=pg.cod_creditoFK) as fechacredito,
			IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
			vt.num_factura,
			(SELECT concat(nombre,' DE ',diadesde,' HASTA ',diahasta) FROM mora_cliente WHERE cod_moracliente = idmora_cliente) as mora,
			(SELECT Monto FROM credito WHERE pg.cod_creditoFK = idcredito) as total_pagado,
			(Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=pg.cod_venta_fk)) as nombrezona,
			(Select idzona from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=pg.cod_venta_fk)) as cod_zona,
			( select nombre_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=
			(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) as cobrador_asig
			from  pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk  
			where  vt.cod_venta!='' and pg.Monto>'0' ".$condicionEntrega.$condicioncajaCobrador.$condicionmetodo.$condicionfecha.$condicionfechafiltro.$condicionfactura.$condicionlocal.$condicioncliente.$condicionMoraCliente.$condicioncobrador.$condicioncajacondicion.$condiciontipo.$condicionCodCobrador.$condicioncobradorasig.$condiciontiempo_cobro.$condiciontipo_cliente.$condiciontipocomprobante." group by  pg.idPago limit 8000";/*Sentencia para buscar registros*/	
			
// echo $sql;
// exit;
			

 $pagina = "";   
 $paginaentrega = "";   
 $paginacuota = "";   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$totalPagadoEfectivo=0;
$totalPagadoTarjeta=0;

$ContadorCliente=0;


$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";


$clientesUnicos = array();
$numeroClientesUnicos =0;
$TotalMontoPago =0;
$resumenTiposPago = array();


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cod_clienteFK = utf8_encode($valor['cod_clienteFK']); 
$TipoVenta = utf8_encode($valor['TipoVenta']); 
$idPago = utf8_encode($valor['idPago']);    
$num_factura = utf8_encode($valor['num_factura']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$cod_venta = utf8_encode($valor['cod_venta_fk']);      
$nombrezona = utf8_encode($valor['nombrezona']);      
$hora = utf8_encode($valor['hora']);      
$comision = utf8_encode($valor['comision']);      
$lot = utf8_encode($valor['lot']);      
$lat = utf8_encode($valor['lat']);      
$nombrecliente = utf8_encode($valor['nombrecliente']);      
$nombrelocal = utf8_encode($valor['nombrelocal']);      
$nrofactura = utf8_encode($valor['nrofactura']);      
$plazo = utf8_encode($valor['plazo']);      
$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);      
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);  
$tipo=utf8_encode($valor['tipo']);
$nroCancelado=utf8_encode($valor['nroCancelado']);
$tipopago=utf8_encode($valor['tipopago']);
$documento=utf8_encode($valor['documento']);
$cobrador_asig=utf8_encode($valor['cobrador_asig']);
$total_pagado=utf8_encode($valor['total_pagado']);
$fechacredito=utf8_encode($valor['fechacredito']);
$metodo=utf8_encode($valor['metodo']);
$mora=utf8_encode($valor['mora']);
$cod_creditoFK=utf8_encode($valor['cod_creditoFK']);
$calificacion_cliente=utf8_encode($valor['calificacion_cliente']);

$metodoResumen = trim((string)$metodo);
if($metodoResumen === ""){
	$metodoResumen = "SIN ESPECIFICAR";
}
$tipoResumen = trim((string)$tipo);
if($tipoResumen === ""){
	$tipoResumen = "SIN TIPO";
}
$montoResumen = (float)$Monto;

if(!isset($resumenTiposPago[$metodoResumen])){
	$resumenTiposPago[$metodoResumen] = array(
		"metodo" => $metodoResumen,
		"monto" => 0,
		"registros" => 0,
		"tipos" => array()
	);
}
$resumenTiposPago[$metodoResumen]["monto"] += $montoResumen;
$resumenTiposPago[$metodoResumen]["registros"]++;

if(!isset($resumenTiposPago[$metodoResumen]["tipos"][$tipoResumen])){
	$resumenTiposPago[$metodoResumen]["tipos"][$tipoResumen] = array(
		"tipo" => $tipoResumen,
		"monto" => 0,
		"registros" => 0
	);
}
$resumenTiposPago[$metodoResumen]["tipos"][$tipoResumen]["monto"] += $montoResumen;
$resumenTiposPago[$metodoResumen]["tipos"][$tipoResumen]["registros"]++;

$TotalMontoPago=$TotalMontoPago + $Monto ;

if($metodo=="EFECTIVO"){
	$totalPagadoEfectivo=$totalPagadoEfectivo+$Monto;
}else{
	$totalPagadoTarjeta=$totalPagadoTarjeta+$Monto;
}

$style='';
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}   
if($nroCancelado==0){
$totalPagado=$Monto+$totalPagado;
}else{
	$style='background-color: #FFEB3B;color:#000';
}


$nueva_fecha = date("d-m-Y", strtotime($Fecha));

$total_pago="";
if($tipo=="Pago Cuota"){	
	$total_pago= number_format($total_pagado,'0',',','.');
}

$filaArqueo=array(
	"grupo" => $plazo!="ENTREGA" ? "cuota" : "entrega",
	"id_pago" => $idPago,
	"num_factura" => $num_factura,
	"cliente" => $nombrecliente,
	"documento" => $documento,
	"calificacion" => $calificacion_cliente,
	"cobrador_asignado" => $cobrador_asig,
	"cobrador" => $cobradornombre,
	"factura" => $nrof,
	"comprobante_pago" => $nrofactura,
	"fecha_pago" => $Fecha,
	"fecha_pago_formateada" => $nueva_fecha,
	"hora" => $hora,
	"fecha_vencimiento" => $fechacredito,
	"monto" => floatval($Monto),
	"monto_formateado" => number_format($Monto,'0',',','.'),
	"total_pagado" => $tipo=="Pago Cuota" ? floatval($total_pagado) : null,
	"total_pagado_formateado" => $total_pago,
	"metodo" => $metodo,
	"tipo_comprobante" => $tipo_comprobante,
	"tipo" => $tipo,
	"cuota" => $plazo,
	"condicion" => $TipoVenta,
	"morosidad" => $mora,
	"zona" => $nombrezona,
	"comision" => $comision,
	"longitud" => $lot,
	"latitud" => $lat,
	"cod_venta" => $cod_venta,
	"cod_credito" => $cod_creditoFK,
	"cod_cliente" => $cod_clienteFK,
	"cancelado" => $nroCancelado==0 ? "NO" : "SI"
);

if($plazo!="ENTREGA"){
	$filasCuota[]=$filaArqueo;
	
$clientes=$cod_clienteFK;
// Recorremos el array de clientes

    if (!in_array($clientes, $clientesUnicos)) {
        // Si no está, lo añadimos al array de clientes únicos
        $clientesUnicos[] = $clientes;
    }


// Contamos el número de clientes únicos
$numeroClientesUnicos = count($clientesUnicos);
	
	
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
	
	$styleName=CargarStyleTable($styleName);
	if($formato!='json'){
$paginacuota.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'onclick='obtenerdatospagos(this)' style='$style'  >
<td id='td_datos_1' style='display:none' >".$idPago."</td>
<td id='td_datos_3' style='display:none'>".$num_factura."</td>
<td id='td_datos_9' style='width:10%'>".$spanCal."*".$documento."*<br>".$nombrecliente." </td>
<td id='' style='width:10%'>".$cobrador_asig."</td>
<td id='' style='width:10%'>".$cobradornombre."</td>
<td id=''			 style='width:10%'>".$nrof." <br> <strong>".$nrofactura."</strong></td>
<td id='td_datos_2' style='display:none' >".$Fecha."</td>
<td id='' 			style='width:10%' >".$hora."<br>Venc.:".$fechacredito."</td>
<td id='td_datos_5' style='width:5%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:5%'>".$total_pago."</td>
<td id=''			 style='width:5%'>".$metodo."</td>
<td id=''			 style='width:5%'>".$tipo_comprobante."</td>
<td id=''		 	style='width:5%'>".$tipo."</td>
<td id='td_datos_12' style='width:5%'>".$plazo."</td>
<td id='' style='width:10%'>".$TipoVenta."</td>
<td id='' style='width:10%'>".$mora."</td>
<td id='' style='display:none'>".$nombrezona."</td>
<td id='td_datos_6' style='display:none'>".$comision."</td>
<td id='td_datos_7' style='display:none'>".$lot."</td>
<td id='td_datos_8' style='display:none'>".$lat."</td>
<td id='td_datos_10' style='display:none'>".$cod_venta."</td>
<td id='td_datos_11' style='display:none'>".$cod_creditoFK."</td>
<td id='td_datos_13' style='display:none'>".$cod_clienteFK."</td>
</tr>
</table>";
}

}else{
	$filasEntrega[]=$filaArqueo;
	
	
	
$clientes=$cod_clienteFK;

    // Verificamos si el cliente ya está en el array de clientes únicos
    if (!in_array($clientes, $clientesUnicos)) {
        // Si no está, lo añadimos al array de clientes únicos
        $clientesUnicos[] = $clientes;
    }


// Contamos el número de clientes únicos
$numeroClientesUnicos = count($clientesUnicos);
	
	
	
	$styleName=CargarStyleTable($styleName);
	if($formato!='json'){
	$paginaentrega.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatospagos(this)' >
<td id='td_datos_1' style='display:none' >".$idPago."</td>
<td id='td_datos_3' style='display:none'>".$num_factura."</td>
<td id='td_datos_9' style='width:10%'>*".$documento."*<br>".$nombrecliente." </td>
<td id='' style='width:10%'>".$cobrador_asig."</td>
<td id='td_datos_4' style='width:10%'>".$cobradornombre."</td>
<td id=''			 style='width:10%'>".$nrof." <br> <strong>".$nrofactura."</strong></td>
<td id='td_datos_2' style='display:none' >".$Fecha."</td>
<td id='' 			style='width:10%' >".$hora."<br>Venc.:".$fechacredito."</td>
<td id='td_datos_5' style='width:5%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:5%'>". $total_pago."</td>
<td id=''			 style='width:5%'>".$metodo."</td>
<td id=''			 style='width:5%'>".$tipo_comprobante."</td>
<td id=''		 	style='width:5%'>".$tipo."</td>
<td id='td_datos_12' style='width:5%'>".$plazo."</td>
<td id='td_datos_4' style='width:10%'>".$TipoVenta."</td>
<td id='' style='width:10%'>".$mora."</td>
<td id='' style='display:none'>".$nombrezona."</td>
<td id='td_datos_6' style='display:none'>".$comision."</td>
<td id='td_datos_7' style='display:none'>".$lot."</td>
<td id='td_datos_8' style='display:none'>".$lat."</td>
<td id='td_datos_10' style='display:none'>".$cod_venta."</td>
<td id='td_datos_11' style='display:none'>".$cod_creditoFK."</td>
<td id='td_datos_13' style='display:none'>".$cod_clienteFK."</td>
</tr>
</table>";
	}
}


}
}
if($formato!='json' && $paginaentrega!="" && $paginacuota!=""){
	$pagina="<p class='ptituloZ'>Cobros de Entregas</p>".$paginaentrega."<p class='ptituloZ'>Cobros de Cuotas</p>".$paginacuota;
}
if($formato!='json' && $paginaentrega!="" && $paginacuota==""){
	$pagina="<p class='ptituloZ'>Cobros de Entregas</p>".$paginaentrega;
}
if($formato!='json' && $paginaentrega=="" && $paginacuota!=""){
	$pagina="<p class='ptituloZ'>Cobros de Cuotas</p>".$paginacuota;
}

$resumenTiposPagoSalida = array();
if(count($resumenTiposPago) > 0){
	ksort($resumenTiposPago);
	foreach($resumenTiposPago as $resumenMetodo){
		$tiposSalida = array();
		if(count($resumenMetodo["tipos"]) > 0){
			ksort($resumenMetodo["tipos"]);
			foreach($resumenMetodo["tipos"] as $resumenTipo){
				$tiposSalida[] = array(
					"tipo" => $resumenTipo["tipo"],
					"monto" => (float)$resumenTipo["monto"],
					"monto_formateado" => number_format($resumenTipo["monto"],'0',',','.'),
					"registros" => (int)$resumenTipo["registros"]
				);
			}
		}
		$resumenTiposPagoSalida[] = array(
			"metodo" => $resumenMetodo["metodo"],
			"monto" => (float)$resumenMetodo["monto"],
			"monto_formateado" => number_format($resumenMetodo["monto"],'0',',','.'),
			"registros" => (int)$resumenMetodo["registros"],
			"tipos" => $tiposSalida
		);
	}
}
   
$informacion =array("1" => "exito","2" => $formato=='json' ? array_merge($filasEntrega,$filasCuota) : $pagina,"3" =>number_format($TotalMontoPago,'0',',','.'),"4"=>$nroRegistro
,"5"=>number_format($totalPagadoEfectivo,'0',',','.'),"6"=>number_format($totalPagadoTarjeta,'0',',','.'),"7"=>number_format($numeroClientesUnicos,'0',',','.'),"8"=>$resumenTiposPagoSalida );
echo json_encode($informacion);	
exit;
}

function reeimpresionrecibo($fecha1,$fecha2,$local,$factura,$cliente,$fechafiltro,$cobrador,$metodo)
{

$mysqli=conectar_al_servidor();

 $totalRegistro=0;
	 $pagina="";
	  $condicionfecha="";
	 if($fecha1!="" && $fecha2!=""){
		 $condicionfecha=" and pg.Fecha between'".$fecha1."' and '".$fecha2."'";
	 }
	 $condicionfechafiltro="";
	 if($fechafiltro!=""){
	   $condicionfechafiltro=" and pg.Fecha='".$fechafiltro."'";		
	 }
	 $condicionfactura="";
	 if($factura!=""){
	   $condicionfactura=" and vt.num_factura like '%".$factura."%'";		
	 }
	 $condicionmetodo="";
	 if($metodo!=""){
	   $condicionmetodo=" and pg.tipopago = '".$metodo."'";		
	 }
	 $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }
	 $condicioncliente="";
	 if($cliente!=""){
	   $condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK limit 1) like '%".$cliente."%'";		
	 }
	 $condicioncobrador="";
	 if($cobrador!=""){
	   $condicioncobrador=" and (Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK limit 1) like '%".$cobrador."%'";		
	 }
	



	
			$sql= "select  vt.puntoexpedicion,vt.tipo_comprobante,pg.idPago,pg.tipo, pg.Fecha, sum(pg.Monto) as Monto,pg.cod_venta_fk,pg.tipopago,
			pg.comision,pg.nrofactura,pg.lot, pg.lat,(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as nombrecliente,
			(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,date_format(hora ,'%H:%i' ) as hora,
			(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
			(Select plazo from credito l where l.idcredito=pg.cod_creditoFK) as plazo,
			IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado,
			vt.num_factura,
			(Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=pg.cod_venta_fk)) as nombrezona
			from  pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk  
			where pg.Monto>0 ".$condicionmetodo.$condicionfecha.$condicionfechafiltro.$condicionfactura.$condicionlocal.$condicioncliente.$condicioncobrador." group by pg.nrofactura,pg.Fecha limit 800";/*Sentencia para buscar registros*/	
	


 $pagina = "";   
 $paginaentrega = "";   
 $paginacuota = "";   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$totalPagadoEfectivo=0;
$totalPagadoTarjeta=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$idPago = utf8_encode($valor['idPago']);    
$num_factura = utf8_encode($valor['num_factura']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$cod_venta = utf8_encode($valor['cod_venta_fk']);      
$nombrezona = utf8_encode($valor['nombrezona']);      
$hora = utf8_encode($valor['hora']);      
$comision = utf8_encode($valor['comision']);      
$lot = utf8_encode($valor['lot']);      
$lat = utf8_encode($valor['lat']);      
$nombrecliente = utf8_encode($valor['nombrecliente']);      
$nombrelocal = utf8_encode($valor['nombrelocal']);      
$nrofactura = utf8_encode($valor['nrofactura']);      
$plazo = utf8_encode($valor['plazo']);      
$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);      
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);   
$tipo_comprobante=utf8_encode($valor['tipo_comprobante']);
$tipo=utf8_encode($valor['tipo']);
$nroCancelado=utf8_encode($valor['nroCancelado']);
$tipopago=utf8_encode($valor['tipopago']);
if($tipopago=="Efectivo"){
	$totalPagadoEfectivo=$totalPagadoEfectivo+$Monto;
}else{
	$totalPagadoTarjeta=$totalPagadoTarjeta+$Monto;
}

$style='';
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}   
if($nroCancelado==0){
$totalPagado=$Monto+$totalPagado;
}else{
	$style='background-color: #FFEB3B;color:#000';
}

$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'onclick='obtenerdatospagos(this)' style='$style'  >
<td id='td_datos_1' style='display:none' >".$idPago."</td>
<td id='td_datos_3' style='display:none'>".$num_factura."</td>
<td id='td_datos_9' style='width:15%'>".$nombrecliente."</td>
<td id='' style='width:10%'>".$nrof."</td>
<td id='td_datos_2' style='display:none' >".$Fecha."</td>
<td id='' style='width:10%' >".$Fecha." ".$hora."</td>
<td id='td_datos_5' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:7%'>".$tipopago."</td>
<td id='' style='display:none'>".$tipo."</td>
<td id='td_datos_4' style='display:none'>".$plazo."</td>
<td id='td_datos_4' style='width:10%'>".$cobradornombre."</td>
<td id='' style='display:none'>".$nombrezona."</td>

<td id='td_datos_6' style='display:none'>".$comision."</td>
<td id='td_datos_7' style='display:none'>".$lot."</td>
<td id='td_datos_8' style='display:none'>".$lat."</td>
</tr>
</table>";



}
}

$informacion =array("1" => "exito","2" => $pagina,"4"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}

function comisioncobrador($fecha1,$fecha2,$zona,$fechafiltro,$cobrado)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
$filas=array();

	
	$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=(Select cod_clienteFK From venta vt where vt.cod_venta=cod_venta_fk)  and idzonaFk='$zona') > 0 ";
	if($zona==""){
	$condicionZona="";
	}
    $condicionfecha="";
	if($fecha1!="" && $fecha2!=""){
		 $condicionfecha="and  Fecha>='$fecha1' and Fecha<='$fecha2'";
	}
	$condicioncobrador="";
	if($cobrado!=""){
		$condicioncobrador="and cod_cobradorFK = '$cobrado'";
	}
	$condicionfechafiltro="";
	if($fechafiltro!=""){
		$condicionfechafiltro="and Fecha='$fechafiltro'";
	}
	
$sql= "select idPago,Fecha,Monto,cod_venta_fk,comision,
(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
(Select num_factura From venta vt where vt.cod_venta=cod_venta_fk) as num_factura,
(Select puntoexpedicion From venta vt where vt.cod_venta=cod_venta_fk) as puntoexpedicion,
(Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cod_venta_fk)) as nombrezona
 from pago where idPago!=''  ".$condicionfechafiltro.$condicioncobrador.$condicionfecha.$condicionZona." limit 100";	



 $pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$totalcomisiones=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$idPago = utf8_encode($valor['idPago']);    
$num_factura = utf8_encode($valor['num_factura']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$cod_venta = utf8_encode($valor['cod_venta_fk']);      
$nombrezona = utf8_encode($valor['nombrezona']);      
$comision = utf8_encode($valor['comision']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);   
			
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}   
$totalPagado=$Monto+$totalPagado;
 	

$totalcomision=($comision*$Monto)/100;    
 $totalcomisiones=$totalcomisiones+$totalcomision;

$filas[]=array(
	"id_pago" => $idPago,
	"cobrador" => $cobradornombre,
	"factura" => $nrof,
	"numero_factura" => $num_factura,
	"monto" => (float)$Monto,
	"monto_formateado" => number_format($Monto,'0',',','.'),
	"fecha" => $Fecha,
	"zona" => $nombrezona,
	"porcentaje_comision" => (float)$comision,
	"comision_total" => (float)$totalcomision,
	"comision_total_formateada" => number_format($totalcomision,'0',',','.')
);

if($formato!='json'){
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoscomisioncobrador(this)'  >
<td id='td_id_1' style='display:none'>".$idPago."</td>
<td id='' style='width:10%'>".$cobradornombre."</td>
<td id='' style='width:10%'>".$nrof."</td>
<td id='td_datos_1' style='display:none'>".$num_factura."</td>
<td id='td_datos_2' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_3' style='width:10%' >".$Fecha."</td>
<td id='td_datos_4' style='width:10%'>".$nombrezona."</td>
<td id='td_datos_5' style='width:10%'>".$comision."</td>
<td id='td_datos_6' style='width:10%'>". number_format($totalcomision,'0',',','.') ."</td>
</tr>
</table>";
}


}
}

$sql= "select idPago,Fecha,Monto,cod_venta_fk,comision,
(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
(Select num_factura From venta vt where vt.cod_venta=cod_venta_fk) as num_factura,
(Select puntoexpedicion From venta vt where vt.cod_venta=cod_venta_fk) as puntoexpedicion,
(Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cod_venta_fk)) as nombrezona
 from pago where idPago!=''  ".$condicionfechafiltro.$condicioncobrador.$condicionfecha.$condicionZona;	
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" =>number_format($totalPagado,'0',',','.'),"5" =>number_format($totalcomisiones,'0',',','.'),"4"=>$nroRegistro,"99"=>$nroRegistro,"100"=>$totalregistro);
echo json_encode($informacion);	
exit;
}


function mascomisioncobrador($fecha1,$fecha2,$zona,$fechafiltro,$cobrado,$totalrecaudacion,$totalcomision,$registrocargado)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
$filas=array();

	
	$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=(Select cod_clienteFK From venta vt where vt.cod_venta=cod_venta_fk)  and idzonaFk='$zona') > 0 ";
	if($zona==""){
	$condicionZona="";
	}
    $condicionfecha="";
	if($fecha1!="" && $fecha2!=""){
		 $condicionfecha="and  Fecha>='$fecha1' and Fecha<='$fecha2'";
	}
	$condicioncobrador="";
	if($cobrado!=""){
		$condicioncobrador="and cod_cobradorFK = '$cobrado'";
	}
	$condicionfechafiltro="";
	if($fechafiltro!=""){
		$condicionfechafiltro="and Fecha='$fechafiltro'";
	}
	
$sql= "select idPago,Fecha,Monto,cod_venta_fk,comision,
(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
(Select num_factura From venta vt where vt.cod_venta=cod_venta_fk) as num_factura,
(Select puntoexpedicion From venta vt where vt.cod_venta=cod_venta_fk) as puntoexpedicion,
(Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cod_venta_fk)) as nombrezona
 from pago where idPago!=''  ".$condicionfechafiltro.$condicioncobrador.$condicionfecha.$condicionZona." limit ".$registrocargado.", 100 ";	
	



 $pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=$totalrecaudacion;
$totalcomisiones=$totalcomision;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargado;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$idPago = utf8_encode($valor['idPago']);    
$num_factura = utf8_encode($valor['num_factura']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$cod_venta = utf8_encode($valor['cod_venta_fk']);      
$nombrezona = utf8_encode($valor['nombrezona']);      
$comision = utf8_encode($valor['comision']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);   
			
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}   
$totalPagado=$Monto+$totalPagado;
 	

$totalcomision=($comision*$Monto)/100;    
 $totalcomisiones=$totalcomisiones+$totalcomision;

$filas[]=array(
	"id_pago" => $idPago,
	"cobrador" => $cobradornombre,
	"factura" => $nrof,
	"numero_factura" => $num_factura,
	"monto" => (float)$Monto,
	"monto_formateado" => number_format($Monto,'0',',','.'),
	"fecha" => $Fecha,
	"zona" => $nombrezona,
	"porcentaje_comision" => (float)$comision,
	"comision_total" => (float)$totalcomision,
	"comision_total_formateada" => number_format($totalcomision,'0',',','.')
);

if($formato!='json'){
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoscomisioncobrador(this)'  >
<td id='td_id_1' style='display:none'>".$idPago."</td>
<td id='' style='width:10%'>".$cobradornombre."</td>
<td id='' style='width:10%'>".$nrof."</td>
<td id='td_datos_1' style='display:none'>".$num_factura."</td>
<td id='td_datos_2' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_3' style='width:10%' >".$Fecha."</td>
<td id='td_datos_4' style='width:10%'>".$nombrezona."</td>
<td id='td_datos_5' style='width:10%'>".$comision."</td>
<td id='td_datos_6' style='width:10%'>". number_format($totalcomision,'0',',','.') ."</td>
</tr>
</table>";
}


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" =>number_format($totalPagado,'0',',','.'),"5" =>number_format($totalcomisiones,'0',',','.'),"4"=>$nroRegistro,"99"=>$nroRegistro  );
echo json_encode($informacion);	
exit;
}


function vistacajaapp($fecha1,$fecha2,$codlocal,$cobrado)
{
$mysqli=conectar_al_servidor();

	
	$condicionZona=" and (Select count(cod_cliente) from cliente where cod_cliente=(Select cod_clienteFK From venta vt where vt.cod_venta=cod_venta_fk)  and idzonaFk='$zona') > 0 ";
	if($zona==""){
	$condicionZona="";
	}
    $condicionfecha="";
	if($fecha1!="" && $fecha2!=""){
		 $condicionfecha="and  Fecha>='$fecha1' and Fecha<='$fecha2'";
	}
	$condicioncobrador="";
	if($cobrado!=""){
		$condicioncobrador="and (Select nombre_persona from persona where cod_persona=cod_cobradorFK) like '%".$cobrado."%'";
	}
	$condicionfechafiltro="";
	if($fechafiltro!=""){
		$condicionfechafiltro="and Fecha='$fechafiltro'";
	}
	
$sql= "select idPago,Fecha,Monto,cod_venta_fk,comision,
(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
(Select num_factura From venta vt where vt.cod_venta=cod_venta_fk) as num_factura,
(Select puntoexpedicion From venta vt where vt.cod_venta=cod_venta_fk) as puntoexpedicion,
(Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=cod_venta_fk)) as nombrezona
 from pago where cod_cobradorFK!='01'  ".$condicionfechafiltro.$condicioncobrador.$condicionfecha.$condicionZona." limit 1000";	
	



 $pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$totalcomisiones=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$idPago = utf8_encode($valor['idPago']);    
$num_factura = utf8_encode($valor['num_factura']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$cod_venta = utf8_encode($valor['cod_venta_fk']);      
$nombrezona = utf8_encode($valor['nombrezona']);      
$comision = utf8_encode($valor['comision']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);   
			
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}   
$totalPagado=$Monto+$totalPagado;
 	

$totalcomision=($comision*$Monto)/100;     
$totalPagado=$Monto+$totalPagado;
 $totalcomisiones=$totalcomisiones+$totalcomision;

$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoscomisioncobrador(this)'  >
<td id='td_id_1' style='display:none'>".$idPago."</td>
<td id='' style='width:10%'>".$cobradornombre."</td>
<td id='' style='width:10%'>".$nrof."</td>
<td id='td_datos_1' style='display:none'>".$num_factura."</td>
<td id='td_datos_2' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='td_datos_3' style='width:10%' >".$Fecha."</td>
<td id='td_datos_4' style='width:10%'>".$nombrezona."</td>
<td id='td_datos_5' style='width:10%'>".$comision."</td>
<td id='td_datos_6' style='width:10%'>". number_format($totalcomision,'0',',','.') ."</td>
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" =>number_format($totalPagado,'0',',','.'),"5" =>number_format($totalcomisiones,'0',',','.'),"4"=>$nroRegistro  );
echo json_encode($informacion);	
exit;
}



function addMasCuotas($cod_venta,$totalPago){
	
	$datosVenta=buscardatosventa($cod_venta);
	
	if($totalPago<$datosVenta[1]){
		
	$pendiente=$datosVenta[1]-$totalPago;
	
	
	$fechaInicio=date("Y-m-d");
	$controlPago=0;
	
	while($controlPago==0)
	{
		
	
	
	if($datosVenta[7]=="Mensual")	{
		  $F=$F+1;
			$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
			
		}
		if($datosVenta[7]=="Semanal")	{
			$F=$F+7;
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
			
		}
		if($datosVenta[7]=="Quincenal")	{
				$F=$F+15;
			$fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
		
		}
	
	
	if($pendiente>$datosVenta[17]){
		$cuotaSobrante=$pendiente-$datosVenta[17];
	$cuotaSobrante=$pendiente-$cuotaSobrante;
	}else{
	$cuotaSobrante=$pendiente;
	$pendiente=0;
	}
	if($controlPago==0){
		insertarcuotas(($datosVenta[16]+1)."/".($datosVenta[16]+1),$fecha, $cod_venta, $cuotaSobrante, "Pendiente"," ");
	}else{
		
	}
	
	$pendiente=$pendiente-$cuotaSobrante;
	if($pendiente<=0){
		$controlPago=1;
	}
	
	 
	
	 }
				 
	}
}

function insertarcuotas($plazo, $fechapago, $cod_venta, $Monto, $Esado,$Nro_recibo){
		$mysqli=conectar_al_servidor();
			$consulta="Insert into credito (plazo, 	fechapago, cod_venta, Monto, Esado,Nro_recibo)
			values('$plazo','$fechapago','$cod_venta','$Monto','$Esado','$Nro_recibo')";	

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
}


function buscardatosventa($codVenta){
	$mysqli=conectar_al_servidor();
	 
		$sql= "Select fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,puntoexpedicion,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2 ,cod_venta,comision,(select count(*) from credito cr where vt.cod_venta =cr.cod_venta ) as contadorCredito ,
		(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
		(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
		(Select nombre_persona from persona where cod_persona=cod_usuarioFK) as usuarionombre,
		(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
		(Select ci_cliente from cliente where cod_cliente=cod_clienteFK) as nrodocliente,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as cobradornombre,
		(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
		IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto
		from venta vt where cod_venta=?  ";
		
		     $datosVenta;
   
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';
//$buscar="".$buscar."";
$stmt->bind_param($s,$codVenta);

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
		  
		  
		      $datosVenta[0]=$valor['fecha_venta'];
		  	  $datosVenta[1]=utf8_encode($valor['total_venta']);
		  	  $datosVenta[2]=utf8_encode($valor['cod_usuarioFK']);
		  	  $datosVenta[3]=utf8_encode($valor['cod_clienteFK']);
		  	  $datosVenta[4]=utf8_encode($valor['num_factura']);
		  	  $datosVenta[5]=utf8_encode($valor['cod_cobradorFK']);
		  	  $datosVenta[6]=utf8_encode($valor['TipoVenta']);
		  	  $datosVenta[7]=utf8_encode($valor['TipoPago']);
		  	  $datosVenta[8]=utf8_encode($valor['Vendedor1']);
		  	  $datosVenta[9]=utf8_encode($valor['Vendedor2']);
		  	  $datosVenta[10]=utf8_encode($valor['usuarionombre']);
		  	  $datosVenta[11]=utf8_encode($valor['clientenombre']);
		  	  $datosVenta[12]=utf8_encode($valor['cod_venta']);
		  	  $datosVenta[13]=utf8_encode($valor['cobradornombre']);
		  	  $datosVenta[14]=utf8_encode($valor['nombrevendedor1']);
		  	  $datosVenta[15]=utf8_encode($valor['nombrevendedor2']);
		  	  $datosVenta[16]=utf8_encode($valor['cantidadcuota']);
		  	  $datosVenta[17]=utf8_encode($valor['Monto']);
		  	  $datosVenta[18]=utf8_encode($valor['comision']);
		  	  $datosVenta[19]=utf8_encode($valor['nrodocliente']);
		  	  $puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
		  	  $num_factura=utf8_encode($valor['num_factura']);
		
		  	  if($puntoexpedicion!=""){
				  $nrof=$puntoexpedicion."-".$num_factura;
				  }else{
				  $nrof=$num_factura;
			  }
		  	 $datosVenta[20]=$nrof;	
			 $datosVenta[21]=utf8_encode($valor['contadorCredito']);
			  
			  
	  }
 }
 
 
return $datosVenta;
}



/*Buscar */
function buscardatospagosTipo($buscar,$Condicon)
{
$mysqli=conectar_al_servidor();

if($Condicon=="1"){
	$Condicon=" and pg.Tipo='Interes'";
}

if($Condicon=="2"){
	$Condicon=" and pg.Tipo='Pago Cuota'";
}
if($Condicon=="3"){
	$Condicon=" ";
}

$sql= "select pg.Tipo, pg.cod_creditoFK,pg.cod_venta_fk ,sum(pg.Monto) as Monto
 from  pago pg 
 where pg.cod_creditoFK='$buscar' ".$Condicon;


 $datos= "0";   

$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

 $datos= utf8_encode($valor['Monto']);    
 
}
}
return $datos;
}



/*Buscar */
function buscardatosCreditoDeuda($buscar)
{
$mysqli=conectar_al_servidor();



$sql= "select cr.deudaInteres  from  credito cr  where cr.idcredito='$buscar' ";


 $datos= 0;   

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

 $datos= utf8_encode($valor['deudaInteres']);    
 
}
}
return $datos;
}




/*Buscar */
function buscardatospagos($buscar,$condicion)
{
$mysqli=conectar_al_servidor();
if($condicion=="1"){
	$condicion=" pg.idPago='$buscar'";
}
if($condicion=="2"){
	$condicion=" pg.cod_creditoFK='$buscar'";
}
	
$sql= "select pg.Tipo, pg.cod_creditoFK,pg.cod_venta_fk ,pg.Monto, vt.num_factura,
pg.Fecha,pg.cod_cobradorFK,pg.hora,pg.comision,pg.lat,pg.lot,pg.nrofactura,
pg.tipopago, pg.codApertura, pg.codCaja, pg.descripcion,pg.codAperturaApp,pg.cod_tipoPagoFK,
pg.nroventa, pg.nrocuenta, pg.banco, pg.nroboleta, pg.cod_moracliente, pg.cod_tareaCobadorFK
 from  pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk 
 where ".$condicion;




$datos = array();
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



array_push($datos, utf8_encode($valor['cod_venta_fk']));    //0
array_push($datos, utf8_encode($valor['Monto']));    //1
array_push($datos, utf8_encode($valor['num_factura']));    //2
array_push($datos, utf8_encode($valor['cod_creditoFK']));    //3
array_push($datos, utf8_encode($valor['Tipo']));    //4
array_push($datos, utf8_encode($valor['Fecha']));   //5

  
array_push($datos, utf8_encode($valor['cod_cobradorFK']));  //6
array_push($datos, utf8_encode($valor['hora']));  //7
array_push($datos, utf8_encode($valor['comision']));  //8
array_push($datos, utf8_encode($valor['lat']));  //9
array_push($datos, utf8_encode($valor['lot']));  //10
array_push($datos, utf8_encode($valor['nrofactura']));  //11
array_push($datos, utf8_encode($valor['tipopago']));  //12
array_push($datos, utf8_encode($valor['codApertura']));  //13
array_push($datos, utf8_encode($valor['codCaja']));  //14
array_push($datos, utf8_encode($valor['descripcion']));  //15
array_push($datos, utf8_encode($valor['codAperturaApp']));  //16
array_push($datos, utf8_encode($valor['cod_tipoPagoFK']));  //17
array_push($datos, utf8_encode($valor['nroventa']));  //18
array_push($datos, utf8_encode($valor['nrocuenta']));  //19
array_push($datos, utf8_encode($valor['banco']));  //20
array_push($datos, utf8_encode($valor['nroboleta']));  //21
array_push($datos, utf8_encode($valor['cod_moracliente']));  //22
array_push($datos, utf8_encode($valor['cod_tareaCobadorFK']));  //23


  
/*  $datos[1]= utf8_encode($valor['Monto']);    
 $datos[2]= utf8_encode($valor['num_factura']);    
 $datos[3]= utf8_encode($valor['cod_creditoFK']);    
 $datos[4]= utf8_encode($valor['Tipo']);    
 $datos[4]= utf8_encode($valor['Fecha']);   */  



}
}

mysqli_close($mysqli);

return $datos;
}



function buscardatosdelcredito($codcredito)
{
$mysqli=conectar_al_servidor();

$sql= "select cr.Monto,cr.descuento,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0) as totalPagoCredito,
IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Interes'),0) as totalPagoInteres
 from  credito cr  where cr.idcredito='$codcredito' ";
 

$Monto=0;
$descuento=0;
$totalPago=0;
$totalPagoCredito=0;
$totalPagoInteres=0;

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


$Monto = utf8_encode($valor['Monto']);     
$descuento = utf8_encode($valor['descuento']);  
$totalPago = utf8_encode($valor['totalPago']);  
$totalPagoCredito = utf8_encode($valor['totalPagoCredito']);  
$totalPagoInteres = utf8_encode($valor['totalPagoInteres']);  


}

}

$datos[0]=$Monto;
$datos[1]=$descuento;
$datos[2]=$totalPago;
$datos[3]=$totalPagoCredito;
$datos[4]=$totalPagoInteres;


 mysqli_close($mysqli);
return $datos;
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


function addPagos($cod_venta,$cajapredeterminada,$codApertura){
	$control=1;	
$totalregistro=$_POST['totalregistro'];
$totalregistro = utf8_decode($totalregistro);

$controlTipoPago = $totalregistro;

$montotarjerta = 0;
$descuento = 0;

$desde="1";
$mysqli=conectar_al_servidor();
$nrofactura=buscarnrofactura();

while($control<=$totalregistro){

$idtipopago=$_POST['idtipopago'.$control];
$idtipopago = utf8_decode($idtipopago);

$monto=$_POST['monto'.$control];
$monto = quitarseparadormiles($monto);


$valor=$_POST['valor'.$control];
$valor = utf8_decode($valor);

	$codApertura=$_POST['codApertura'];
	$codApertura = utf8_decode($codApertura);
		
	$codcaja=$_POST['codcaja'];
	$codcaja = utf8_decode($codcaja);
		
	   
	   if($valor=="SI"){
		
		$monto=$_POST['monto'.$control];
		$monto = quitarseparadormiles($monto);
		
		$MotivoDeposito=$_POST['MotivoDeposito'.$control];
		$MotivoDeposito = utf8_decode($MotivoDeposito);

		$nroCuentaDeposito=$_POST['nroCuentaDeposito'.$control];
		$nroCuentaDeposito = utf8_decode($nroCuentaDeposito);

		$BancoDeposito=$_POST['BancoDeposito'.$control];
		$BancoDeposito = utf8_decode($BancoDeposito);

		$NroBoletaDeposito=$_POST['NroBoletaDeposito'.$control];
		$NroBoletaDeposito = utf8_decode($NroBoletaDeposito);

		$cod_local=$_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);

		InsertarPagoEgreso($monto,$MotivoDeposito,$cod_local,$codcaja,$codApertura,$NroBoletaDeposito,$BancoDeposito,$nroCuentaDeposito,$cod_venta,$nrofactura);
	   }


 
 $controlTipoPago= $controlTipoPago-1;

abmcontado($cod_venta,$descuento,$monto,$montotarjerta,$cajapredeterminada,$codApertura,$idtipopago,$controlTipoPago,$totalregistro,$desde,$nrofactura);

$control=$control+1;
$desde="2";
} 


}



function addPagosCredito($CargoAdministrativo,$cajapredeterminada,$codApertura,$cod_creditoFK,$Fecha,$cod_cobradorFK,$cod_venta,$totalDeudaCuota,$totalInteres,$MontoTarjeta,$descuento,$nrofactura,$operacion,$cod_ClienteFKMora,$imprimirOpcion){

$control=1;	
$totalregistro=$_POST['totalregistro'];
$totalregistro = utf8_decode($totalregistro);
$controlTipoPago = $totalregistro;
$total = 0;
$ControlMonto=0;
$interesPendientePago=$totalInteres;
$descuentoPendientePago=$descuento;
$cargoAdministrativoPendiente=$CargoAdministrativo;

$controlMontoCiclo=1;
 

$mysqli=conectar_al_servidor();
if($nrofactura==""){
	$nrofactura=buscarnrofactura();
}

$ControlRestaMonto=0;

while($control<=$totalregistro){

$idtipopago=$_POST['idtipopago'.$control];
$idtipopago = utf8_decode($idtipopago);

$monto=$_POST['monto'.$control];
$monto = quitarseparadormiles($monto);
$total += $monto;
$ControlGA=$CargoAdministrativo;

$valor=$_POST['valor'.$control];
$valor = utf8_decode($valor);
	   
	   if($valor=="SI"){
		
		$monto=$_POST['monto'.$control];
		$monto = quitarseparadormiles($monto);
		
		$MotivoDeposito=$_POST['MotivoDeposito'.$control];
		$MotivoDeposito = utf8_decode($MotivoDeposito);

		$nroCuentaDeposito=$_POST['nroCuentaDeposito'.$control];
		$nroCuentaDeposito = utf8_decode($nroCuentaDeposito);

		$BancoDeposito=$_POST['BancoDeposito'.$control];
		$BancoDeposito = utf8_decode($BancoDeposito);

		$NroBoletaDeposito=$_POST['NroBoletaDeposito'.$control];
		$NroBoletaDeposito = utf8_decode($NroBoletaDeposito);
		
		$codApertura=$_POST['codApertura'];
		$codApertura = utf8_decode($codApertura);
		
		$codcaja=$_POST['codcaja'];
		$codcaja = utf8_decode($codcaja);
		
		$cod_local=$_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);

		InsertarPagoEgreso($monto,$MotivoDeposito,$cod_local,$codcaja,$codApertura,$NroBoletaDeposito,$BancoDeposito,$nroCuentaDeposito,$cod_venta,$nrofactura);
	   }


$control=$control+1;
$controlTipoPago = $controlTipoPago - 1;
 

$interesPagado=abm($cargoAdministrativoPendiente,$cajapredeterminada,$codApertura,$cod_creditoFK,$Fecha,$cod_cobradorFK,$cod_venta,$totalDeudaCuota,$interesPendientePago,$monto,$MontoTarjeta,$descuentoPendientePago,$nrofactura,$operacion,$idtipopago,$controlTipoPago,$cod_ClienteFKMora,$imprimirOpcion);
$interesPendientePago=$interesPendientePago-$interesPagado;
if($interesPendientePago<0){
	$interesPendientePago=0;
}
$descuentoPendientePago=0;
$cargoAdministrativoPendiente=0;


}





}



function addPagosCreditoParcial($cod_ClienteFKMora,$CargoAdministrativo,$MontoTarjeta,$MontDescuento,$Fecha,$cod_cobradorFK,$cod_venta,$controlfecha,$nrofactura,$codCaja,$codApertura,$totalregistro,$imprimirOpcion){

if($nrofactura==""){
	$nrofactura=buscarnrofactura();
}

$control=1;	
$controlTipoPago = $totalregistro;

$mysqli=conectar_al_servidor();

$ControlMonto=0;

$controlMontoCiclo=1;

 

$ControlRestaMonto=0;
$total = 0;
$ControlGA=$CargoAdministrativo;
$interesesPendientesRecibo=obtenerInteresesPendientesCreditoVenta($cod_venta);
$descuentoPendientePago=$MontDescuento;
$cargoAdministrativoPendiente=$CargoAdministrativo;

while($control<=$totalregistro){

$idtipopago=$_POST['idtipopago'.$control];
$idtipopago = utf8_decode($idtipopago);

$monto=$_POST['monto'.$control];
$monto = quitarseparadormiles($monto);
$total+= $monto;

$valor=$_POST['valor'.$control];
$valor = utf8_decode($valor);
	   
	   if($valor=="SI"){
		
		$monto=$_POST['monto'.$control];
		$monto = quitarseparadormiles($monto);
		
		
		$MotivoDeposito=$_POST['MotivoDeposito'.$control];
		$MotivoDeposito = utf8_decode($MotivoDeposito);

		$nroCuentaDeposito=$_POST['nroCuentaDeposito'.$control];
		$nroCuentaDeposito = utf8_decode($nroCuentaDeposito);

		$BancoDeposito=$_POST['BancoDeposito'.$control];
		$BancoDeposito = utf8_decode($BancoDeposito);

		$NroBoletaDeposito=$_POST['NroBoletaDeposito'.$control];
		$NroBoletaDeposito = utf8_decode($NroBoletaDeposito);
		
		$codApertura=$_POST['codApertura'];
		$codApertura = utf8_decode($codApertura);
		
		$codcaja=$_POST['codcaja'];
		$codcaja = utf8_decode($codcaja);
		
		$cod_local=$_POST['cod_local'];
		$cod_local = utf8_decode($cod_local);

		InsertarPagoEgreso($monto,$MotivoDeposito,$cod_local,$codcaja,$codApertura,$NroBoletaDeposito,$BancoDeposito,$nroCuentaDeposito,$cod_venta,$nrofactura);
	   }



$control=$control+1;
$controlTipoPago = $controlTipoPago - 1;



cargarpagos($cargoAdministrativoPendiente,$monto,$MontoTarjeta,$descuentoPendientePago,$Fecha,$cod_cobradorFK,$cod_venta,$controlfecha,$nrofactura,$codCaja,$codApertura,$idtipopago,$controlTipoPago,$cod_ClienteFKMora,$imprimirOpcion,$interesesPendientesRecibo);
$descuentoPendientePago=0;
$cargoAdministrativoPendiente=0;

/* if($ControlMonto==$monto && $ControlRestaMonto==0 ){
	
	$monto = $monto  ;	
	$CargoAdministrativo = $ControlGA;	
	$ControlRestaMonto =1;	
}else{
	$CargoAdministrativo = "0";
}
 */





} 







}




function obtenerInteresesPendientesCreditoVenta($cod_venta)
{
	$mysqli=conectar_al_servidor();
	$sql="Select cr.idcredito,(cr.totalinteres + cr.deudaInteres) as totalinteres,cr.descuentoInteres
	from credito cr
	where cr.cod_venta=? and IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and tipo='Pago Cuota'),0) < (cr.Monto-cr.descuento)
	order by cr.idcredito asc";
	$stmt=$mysqli->prepare($sql);
	$ss='s';
	$stmt->bind_param($ss,$cod_venta);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
		exit;
	}
	$result=$stmt->get_result();
	$datos=array();
	while($valor=mysqli_fetch_assoc($result)){
		$idcredito=utf8_encode($valor['idcredito']);
		$totalinteres=floatval($valor['totalinteres']);
		$descuentoInteres=floatval($valor['descuentoInteres']);
		if($totalinteres < $descuentoInteres){
			$totalinteres=0;
		}
		$totalinteres=ceil($totalinteres / 1000) * 1000;
		$totalinteres=$totalinteres-$descuentoInteres;
		if($totalinteres<0){
			$totalinteres=0;
		}
		$datos[$idcredito]=$totalinteres;
	}
	mysqli_close($mysqli);
	return $datos;
}


function agregarReferenciaComprobanteDeposito($motivo,$nrofactura)
{
	$motivo=trim($motivo);
	$nrofactura=trim($nrofactura);
	if($nrofactura!=""){
		$referencia="COMP. PAGO: ".$nrofactura;
		if($motivo!=""){
			if(stripos($motivo,$referencia)===false){
				$motivo.=" | ".$referencia;
			}
		}else{
			$motivo=$referencia;
		}
	}
	return substr($motivo,0,150);
}

function InsertarPagoEgreso($monto,$motivo,$cod_local,$codcaja,$idaperturacierrecaja,$nroboleta,$banco,$nrocuenta,$cod_venta="",$nrofactura="")
{
	
$mysqli=conectar_al_servidor(); 

date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);
$motivo=agregarReferenciaComprobanteDeposito($motivo,$nrofactura);

$consulta1="Insert into gastos (arreglo,monto,motivo,fecha,estado,cod_usuario,personales,cod_local,tipo,codCaja,codApertura,nroboleta,banco,nrocuenta)
values('DEPOSITO',?,?,'$fecha_inser_edit','Activo','$user','',?,'Deposito',?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$monto,$motivo,$cod_local,$codcaja,$idaperturacierrecaja,$nroboleta,$banco,$nrocuenta);


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
	
}





function buscarDetalleVentaImprimir($CodVenta)
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


$pagina.="<table class='tableTicket' style='border: solid 1px #a1a1a1;' >
<tr>
<td style='width:10%'>".$cantidad_detalle."</td>
<td style='width:50%'>".$NombreProducto."</td>
<td style='width:15%'>".number_format($precio_producto,'0',',','.')."</td>
<td style='width:25%'>".number_format($subtotal,'0',',','.')."</td>
</tr>
</table>";

}
}
$datos[0]=$pagina;
$datos[1]=$totalPagado;
return $datos;	

}




function buscarpagosTitulo($CodVenta,$NroFactura)
{
$mysqli=conectar_al_servidor();


$sql= "select cr.fechapago,cr.plazo,(cr.Monto - cr.descuento) as montocredito,pg.idPago,pg.Fecha,pg.Monto,pg.nrofactura,pg.tipo,vt.TipoVenta,vt.total_venta,
(SELECT nombre FROM tipopago where cod_tipoPago = pg.cod_tipoPagoFK) as tipopg,
ifnull((select sum(Monto) from pago where Tipo='Pago Cuota' and  idcredito=cod_creditoFK),0) as pagoCuotas
 from pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk
 inner join credito cr on cr.idcredito=pg.cod_creditoFK
 where pg.cod_venta_fk='$CodVenta' and pg.nrofactura='$NroFactura' order by pg.idPago  ";
 
 // echo($sql);
 // exit;
 
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$pagina2 = ""; 
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";
$totalPagado=0;
$datos[0]="";
$datos[1]="";
$datos[2]="";

$datos[3]="";
$datos[4]="";
$datos[5]="";

$totalCuota=0;
$totalInteres=0;
$totalAdministrativo=0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
     
$pagoCuotas = utf8_encode($valor['pagoCuotas']); 
$plazo = utf8_encode($valor['plazo']);      
$tipo = utf8_encode($valor['tipo']);  
$Monto = utf8_encode($valor['Monto']);  
$Fecha = utf8_encode($valor['Fecha']); 
$fechapago = utf8_encode($valor['fechapago']);  
$montocredito = utf8_encode($valor['montocredito']); 
$tipopg = utf8_encode($valor['tipopg']); 

if($plazo=="Contado"){
	$tipo="";
	$totalCuota=$totalCuota  + $Monto;
}


$cantidad_letras = strlen($plazo);
if($cantidad_letras<=2){
	$datoVenta=buscardatosventa($CodVenta);
	$plazo= $plazo."/".$datoVenta[21];
}

$TipoPago=$montocredito - $pagoCuotas ;

if($tipo=="Interes"){
	$tipo="INTERES"."--".$plazo;
	$totalInteres=$totalInteres  + $Monto;
}
if($tipo=="Pago Cuota"){
	
	if($TipoPago==0){
		$tipo="PAGO DE CUOTA  --".$plazo ;
	}else{
		$tipo="CUOTA PARCIAL DE --".$plazo  ;
	}
	$totalCuota=$totalCuota  + $Monto;		
} 

if($tipo=="CARGO ADMINISTRATIVO"){
	$tipo="CARGO ADMINISTRATIVO";
	$fechapago="";
	$totalAdministrativo=$totalAdministrativo  + $Monto;
}

$totalPagado=$Monto+$totalPagado;
$pagina.="<table style='font-family: arial;font-size: 11px;' >
<tr>
<td style='width:10%'>".$plazo."</td>
<td style='width:50%'>".$tipo."</td>
<td style='width:40%'>".number_format($Monto,'0',',','.')."</td>
</tr>
</table>";

$pagina2.="<table class='tableTicket' style=''>
<tr>
<td style='display:none'>".$Fecha."</td>
<td style='width:20%'>".$fechapago."</td>
<td style='width:30%'>".$tipo."</td>
<td style='width:10%'>".$tipopg."</td>
<td style='width:20%'>".number_format($Monto,'0',',','.')."</td>
</tr>
</table>";

}

$pagina2.="<table class='tableTicket' style='display:none'>
<tr>
<td style='width:70%'></td>
<td style='width:30%'>TOTAL : ".number_format($totalPagado,'0',',','.')." Gs.</td>
</tr>
</table>";


}
$datos[0]=$pagina;
$datos[1]=$totalPagado;
$datos[2]=$pagina2;

$datos[3]=number_format($totalCuota,'0',',','.');
$datos[4]=number_format($totalInteres,'0',',','.');
$datos[5]=number_format($totalAdministrativo,'0',',','.');
return $datos;	

}




/*Buscar */
function buscar_detalles_venta($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select pr.nombre_producto,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,dtv.detalleproducto,
 IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";/*Sentencia para buscar registros*/
$pagina = "";   
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

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$nombre_producto = utf8_encode($valor['nombre_producto']);      
$nroDevoluciones = utf8_decode($valor['nroDevoluciones']);      
$nroCambios = utf8_decode($valor['nroCambios']);      
$nroGarantia = utf8_decode($valor['nroGarantia']);      
$cantidad_detalle = utf8_decode($valor['cantidad_detalle']);      
$precio_producto = utf8_decode($valor['precio_producto']);      
$detalleproducto = utf8_decode($valor['detalleproducto']);      
$subtotal = utf8_decode($valor['subtotal']);      
if($nroDevoluciones==0 && $nroCambios==0){
	
$pagina .= "
<table class='tbl'>
  <tbody>
    <tr>
      <td style='width:90px; text-align:center; font-weight:700;'>
        ".$cantidad_detalle."
      </td>
      <td style='font-weight:600;'>
        ".$nombre_producto."
      </td>
    </tr>
  </tbody>
</table>";
}

}
}

return $pagina;
}

function buscar_detalles_venta_ticket($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select pr.nombre_producto,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,dtv.detalleproducto,
 IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";
$pagina = "";   
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

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$nombre_producto = utf8_encode($valor['nombre_producto']);      
$nroDevoluciones = utf8_decode($valor['nroDevoluciones']);      
$nroCambios = utf8_decode($valor['nroCambios']);      
$nroGarantia = utf8_decode($valor['nroGarantia']);      
$cantidad_detalle = utf8_decode($valor['cantidad_detalle']);      
$precio_producto = utf8_decode($valor['precio_producto']);      
$detalleproducto = utf8_decode($valor['detalleproducto']);      
$subtotal = utf8_decode($valor['subtotal']);      
if($nroDevoluciones==0 && $nroCambios==0){
  $pagina.="<table class='tableTicket'>
<tr>
<td style='width:100%'>".$nombre_producto."</td>
</tr>
</table>";
$pagina.="<table class='tableTicket' style='display:none'>
<tr>
<td style='width:33%'>".number_format($cantidad_detalle,'0',',','.')."</td>
<td style='width:33%'>".number_format($precio_producto,'0',',','.')."</td>
<td style='width:33%'>".number_format($subtotal,'0',',','.')."</td>
</tr>
</table>";
}

}
}



return $pagina;
}



function buscarpagosTituloContado($CodVenta)
{
$mysqli=conectar_al_servidor();


$sql= "select cr.fechapago,cr.plazo,(cr.Monto - cr.descuento) as montocredito  ,pg.idPago,pg.Fecha,pg.Monto,pg.nrofactura,pg.tipo,vt.TipoVenta,vt.total_venta
,vt.fecha_venta
 from pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk
 inner join credito cr on cr.idcredito=pg.cod_creditoFK
 where pg.cod_venta_fk='$CodVenta'  order by pg.idPago  ";
 
 // echo($sql);
 // exit;
 
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$pagina2 = ""; 
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";
$totalPagado=0;
$total_venta=0;
$fecha_venta="";
$nrofactura="";
$datos[0]="";
$datos[1]="";
$datos[2]="";
$datos[3]="";
$datos[4]="";
$datos[5]="";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
     
$plazo = utf8_encode($valor['plazo']);      
$tipo = utf8_encode($valor['tipo']);  
$Monto = utf8_encode($valor['Monto']);  
$Fecha = utf8_encode($valor['Fecha']); 
$fechapago = utf8_encode($valor['fechapago']);  
$total_venta = utf8_encode($valor['total_venta']);  
$fecha_venta = utf8_encode($valor['fecha_venta']);  
$nrofactura = utf8_encode($valor['nrofactura']);  
$montocredito = utf8_encode($valor['montocredito']); 




if($tipo=="Interes"){
	$tipo="INTERES"."--".$plazo;
}
if($tipo=="Pago Cuota"){
	$tipo="PAGO DE CUOTA"."--".$plazo;
}

if($tipo=="CARGO ADMINISTRATIVO"){
	$tipo="CARGO ADMINISTRATIVO";
	$fechapago="";
}

if($plazo=="Contado"){
	$tipo="CONTADO";
}

$totalPagado=$Monto+$totalPagado;
$pagina.="<table style='font-family: arial;font-size: 11px;' >
<tr>
<td style='width:10%'>".$plazo."</td>
<td style='width:50%'>".$tipo."</td>
<td style='width:40%'>".number_format($Monto,'0',',','.')."</td>
</tr>
</table>";

$pagina2.="<table class='tableTicket' style='border: solid 1px #a1a1a1;'>
<tr>
<td style='width:20%'>".$Fecha."</td>
<td style='width:20%'>".$fechapago."</td>
<td style='width:40%'>CONTADO</td>
<td style='width:20%'>".number_format($Monto,'0',',','.')."</td>
</tr>
</table>";

}

$pagina2.="<table class='tableTicket' style='border: solid 1px #a1a1a1;'>
<tr>
<td style='width:70%'></td>
<td style='width:30%'>TOTAL : ".number_format($totalPagado,'0',',','.')." Gs.</td>
</tr>
</table>";


}
$datos[0]=$pagina;
$datos[1]=$totalPagado;
$datos[2]=$pagina2;
$datos[3]=$total_venta;
$datos[4]=$fecha_venta;
$datos[5]=$nrofactura;
return $datos;	

}







function buscarpagosTituloCreditoDirecto($CodVenta,$NroFactura,$cod_creditoFK)
{
$mysqli=conectar_al_servidor();


$sql= "select cr.fechapago,cr.plazo,(cr.Monto - cr.descuento) as montocredito,pg.idPago,pg.Fecha,pg.Monto,pg.nrofactura,pg.tipo,vt.TipoVenta,vt.total_venta ,
(SELECT nombre FROM tipopago where cod_tipoPago = pg.cod_tipoPagoFK) as tipopg,
ifnull((select sum(Monto) from pago p where Tipo='Pago Cuota' and  nrofactura='$NroFactura' and vt.cod_venta=p.cod_venta_fk),0) as pagoCuotas
 from pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk
 inner join credito cr on cr.idcredito=pg.cod_creditoFK
 where pg.cod_venta_fk='$CodVenta'  and pg.cod_creditoFK='$cod_creditoFK' and pg.nrofactura='$NroFactura' order by pg.idPago  ";
 
 // echo($sql);
 // exit;
 
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$pagina2 = ""; 
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";
$totalPagado=0;
$datos[0]="";
$datos[1]="";
$datos[2]="";

$datos[3]="";
$datos[4]="";
$datos[5]="";

$totalCuota=0;
$totalInteres=0;
$totalAdministrativo=0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
     
$plazo = utf8_encode($valor['plazo']);      
$tipo = utf8_encode($valor['tipo']);  
$Monto = utf8_encode($valor['Monto']);  
$Fecha = utf8_encode($valor['Fecha']); 
$fechapago = utf8_encode($valor['fechapago']);  
$fechapago = utf8_encode($valor['fechapago']);  
$montocredito = utf8_encode($valor['montocredito']); 
$tipopg = utf8_encode($valor['tipopg']); 

$pagoCuotas = utf8_encode($valor['pagoCuotas']); 

if($plazo=="Contado"){
	$tipo="";
	$plazo="CONTADO";
	$totalCuota=$totalCuota  + $Monto;
}



$cantidad_letras = strlen($plazo);
if($cantidad_letras<=2){
	$datoVenta=buscardatosventa($CodVenta);
	$plazo= $plazo."/".$datoVenta[21];
}

$TipoPago=$montocredito - $pagoCuotas ;

if($tipo=="Interes"){
	$tipo="INTERES"."--".$plazo;
	$totalInteres=$totalInteres  + $Monto;
}
if($tipo=="Pago Cuota"){
	
	if($TipoPago==0){
		$tipo="PAGO DE CUOTA"."--".$plazo;
	}else{
		$tipo="PAGO PARCIAL DE CUOTA"."--".$plazo;
	}
	$totalCuota=$totalCuota  + $Monto;
}

if($tipo=="CARGO ADMINISTRATIVO"){
	$tipo="CARGO ADMINISTRATIVO";
	$fechapago="";
	$totalAdministrativo=$totalAdministrativo  + $Monto;
}

$totalPagado=$Monto+$totalPagado;
$pagina.="<table style='font-family: arial;font-size: 11px;' >
<tr>
<td style='width:10%'>".$plazo."</td>
<td style='width:50%'>".$tipo."</td>
<td style='width:40%'>".number_format($Monto,'0',',','.')."</td>
</tr>
</table>";

$pagina2.="<table class='tableTicket' style='border: solid 1px #a1a1a1;'>
<tr>
<td style='width:20%'>".$Fecha."</td>
<td style='width:20%'>".$fechapago."</td>
<td style='width:30%'>".$tipo."</td>
<td style='width:30%'>".$tipopg."</td>
<td style='width:20%'>".number_format($Monto,'0',',','.')."</td>
</tr>
</table>";

}

$pagina2.="<table class='tableTicket' style='border: solid 1px #a1a1a1;'>
<tr>
<td style='width:70%'></td>
<td style='width:30%'>TOTAL : ".number_format($totalPagado,'0',',','.')." Gs.</td>
</tr>
</table>";


}
$datos[0]=$pagina;
$datos[1]=$totalPagado;
$datos[2]=$pagina2;
$datos[3]=number_format($totalCuota,'0',',','.');
$datos[4]=number_format($totalInteres,'0',',','.');
$datos[5]=number_format($totalAdministrativo,'0',',','.');
return $datos;	

}



/*Buscar */
function buscar_detalles_Recibo($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select pr.nombre_producto,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,dtv.detalleproducto,
 IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";/*Sentencia para buscar registros*/
$pagina = "";   
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

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$nombre_producto = utf8_encode($valor['nombre_producto']);      
$nroDevoluciones = utf8_decode($valor['nroDevoluciones']);      
$nroCambios = utf8_decode($valor['nroCambios']);      
$nroGarantia = utf8_decode($valor['nroGarantia']);      
$cantidad_detalle = utf8_decode($valor['cantidad_detalle']);      
$precio_producto = utf8_decode($valor['precio_producto']);      
$detalleproducto = utf8_decode($valor['detalleproducto']);      
$subtotal = utf8_decode($valor['subtotal']);      
if($nroDevoluciones==0 && $nroCambios==0){
 $pagina.=" <h class='pTituloTicket1'> $nombre_producto - </h> ";
}

}
}

return $pagina;
}

function obtenerExisteDescuentoInteres($cod_venta)
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select IFNULL(totalaprobado,0) as totalaprobado from solicituddescuentointeres where cod_ventaFK = '$cod_venta' and estado_uso = 'PENDIENTE' and tipo_pago = 'PARCIAL' LIMIT 1";
		
		/* echo $sql;
		exit; */
		
   
   $stmt = $mysqli->prepare($sql);
   


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 

 $totalaprobado = "";


 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  	  $totalaprobado=utf8_encode($valor['totalaprobado']);
			  
	  }
 }

 
 mysqli_close($mysqli);
return $totalaprobado;	
}
function actualizar_credito_descuento_interes_parcial($cod_venta)
{
	
	
if($cod_venta==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}
 
$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$consulta1="update solicituddescuentointeres set estado_uso = 'FINALIZADO' where cod_ventaFK= $cod_venta and estado_uso = 'PENDIENTE' and tipo_pago = 'PARCIAL'";

$stmt1 = $mysqli->prepare($consulta1);
  
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
	
}

function BuscarDatosCreditoParaMensaje($cod_creditoFK)
{
	$mysqli = conectar_al_servidor();

	$sql = "select plazo , fechapago from credito where idcredito='$cod_creditoFK'";
	$Datos = null;
	$stmt = $mysqli->prepare($sql);
	if (! $stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {



			$fechapago = utf8_decode($valor['fechapago']);
			$plazo = utf8_decode($valor['plazo']);
		}
	}

	$Datos[0] = $fechapago;
	$Datos[1] = $plazo;


	return $Datos;
}

function BuscarDatosClienteParaMensaje($cod_clienteFK)
{
	$mysqli = conectar_al_servidor();

	$sql = "select telefono from persona where cod_persona='$cod_clienteFK' and length(telefono) = 10";
	$stmt = $mysqli->prepare($sql);
	if (! $stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$codigo="+595";
	$telefono = '';
	
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			
			
			$telefono = utf8_decode($valor['telefono']);
			
			if($telefono != "" && $telefono != "0"){
				
				$telefono = substr($telefono, 1);
				$searchString = " ";
				$replaceString = "";
				$telefono = str_replace($searchString, $replaceString, $telefono);
				$telefono = $codigo.$telefono;
				
				
			}
				
			
				
		}
	}

	return $telefono;
}

function abmMensaje($Monto, $plazo, $vencimiento,$numerocliente)
{

	$mysqli = conectar_al_servidor();


	$consulta1 = "INSERT INTO notificaciones (mensaje,numero,estado,fecha,tipo,titulo,estado_mensaje)
values('MUCHAS GRACIAS POR TU PAGO DE " . $Monto . " Gs. CORRESPONDIENTE A LA CUOTA " . $plazo . "  QUE VENCE EL " . $vencimiento . "','$numerocliente','Activo','2024-03-22','Notificaciones','Pago','PENDIENTE')";
	$stmt1 = $mysqli->prepare($consulta1);

	if (!$stmt1->execute()) {

		echo trigger_error('The query execution failed; MySQL said (' . $stmt1->errno . ') ' . $stmt1->error, E_USER_ERROR);
		exit;
	}

	mysqli_close($mysqli);
}

function abmMensajeParcial($Mensaje, $Monto, $numeroCliente)
{

	$mysqli = conectar_al_servidor();


	$consulta1 = "INSERT INTO notificaciones (mensaje,numero,estado,fecha,tipo,titulo,estado_mensaje)
values('MUCHAS GRACIAS POR TU PAGO DE " . $Monto . " Gs. CORRESPONDIENTE A " . $Mensaje . " . CASA TOLEDO LE DESEA FELIZ RESTO DE JORNADA.','$numeroCliente','Activo','2024-03-22','Notificaciones','Pago Parcial','PENDIENTE')";
	$stmt1 = $mysqli->prepare($consulta1);

	if (!$stmt1->execute()) {

		echo trigger_error('The query execution failed; MySQL said (' . $stmt1->errno . ') ' . $stmt1->error, E_USER_ERROR);
		exit;
	}

	mysqli_close($mysqli);
}



/* INFORME COMISION DE COBRADORES */
function comisioncobradoragrupado($fecha1, $fecha2, $condicion,$cod_local,$array_cod_filtro_cobrador_info_cobradores,$tipo_pago,$tipo_cuota)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
$filas=array();

	$fechames1 = $fecha1; 
	$fechames1 = new DateTime($fechames1); 
	$fechames1 = $fechames1->format('Y-m');
	
	$fechames2 =  $fecha2; 
	$fechames2 = new DateTime($fechames2); 
	$fechames2 = $fechames2->format('Y-m');
	
	 $pagina='';
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(fecha, '%Y-%m') between  '$fechames1' and '$fechames2' ";
}


$condicionlocal = '';
if($cod_local !=''){
	$condicionlocal = " and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1) = '$cod_local'";
}

$condicionIn= "";
$contador = 0;
foreach ($array_cod_filtro_cobrador_info_cobradores as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}

$condicioncobrador = '';
if($contador !=''){
	$condicioncobrador = " and cod_cobrador in ($condicionIn)";
}

$sql= "Select monto , fecha ,url_img , cod_cobradorFK ,cod_meta_cobrador , cod_localFK,
		(select upper(nombre_persona) from persona where cod_persona = cod_cobrador) as cobrador  from  meta_cobrador  mc
		inner join cobrador  cb on cod_cobradorFK=cod_cobrador where cb.estado='Activo' ".$condicionFecha.$condicioncobrador." order by fecha asc ";

// echo $sql;
// exit;

$pagina = "
<table style='display:none'>
<tr>
<td><b>COBRADOR</b></td>
<td><b>T-COBRADO</b></td>
<td><b>META</b></td>
<td><b>PORCENTAJE</b></td>
</tr>
</table>
";   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$cantidad = $valor;
$styleName="tableRegistroSearch";

$TotalMetas = 0;
$totalCobro = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

			 
		  	  $cobrador=utf8_encode($valor['cobrador']); 
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']); 
		  	  $fecha=utf8_encode($valor['fecha']); 
		  	  // $cod_localFK=utf8_encode($valor['cod_localFK']); 
			  
		  	  $monto=utf8_encode($valor['monto']); 
			  $TotalCobrado=buscarMontoCobro($tipo_pago, $tipo_cuota ,$fecha1,$fecha2,$condicionlocal,$condicion,$cod_cobradorFK,$fecha);
			  
			  $TotalMetas=$TotalMetas + $monto ;
			  $totalCobro += $TotalCobrado;
			  
			  $porcentaje = 0;
				if($monto > 0 ){
				$porcentaje= ($TotalCobrado * 100 ) / $monto;
					$porcentaje= round($porcentaje);
					}

			  $filas[]=array(
				"cobrador" => $cobrador,
				"codigo_cobrador" => $cod_cobradorFK,
				"fecha" => $fecha,
				"total_cobrado" => (float)$TotalCobrado,
				"total_cobrado_formateado" => number_format($TotalCobrado,'0',',','.'),
				"meta" => (float)$monto,
				"meta_formateada" => number_format($monto,'0',',','.'),
				"porcentaje" => (float)$porcentaje,
				"porcentaje_formateado" => $porcentaje."%"
			  );
			  
			  
			if($formato!='json'){
			  	$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td  id='' style='width:15%'>".$cobrador."</td>
<td  id='' style='width:10%'>".number_format($TotalCobrado,'0',',','.')." </td>
<td  id='' style='width:10%'>".number_format($monto,'0',',','.')." </td>
<td  id='' style='width:10%'>".$porcentaje."%</td>
</tr>
</table>";
			}
	

}
}

if($TotalMetas > 0){
	$por = round(($totalCobro * 100)  / $TotalMetas);
}else{
	$por = 0;
}



if($formato!='json'){
$pagina.="
<table style='display:none'>
<tr>
<td></td>
<td><b>Total Cobro: ".number_format($totalCobro,'0',',','.')."</b></td>
<td><b>Total Metas: ".number_format($TotalMetas,'0',',','.')."</b></td>
<td><b>Porcentaje: ".$por."%</b></td>
</tr>
</table>
";
}
	    
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3"=>number_format($totalCobro,'0',',','.'),"4"=>number_format($TotalMetas,'0',',','.'),"6"=>$por."%");
echo json_encode($informacion);	
exit;
}

function buscarMontoCobro($tipoPago, $tipoCuota ,$fecha1,$fecha2,$condicionlocal,$tipo,$cod_cobrador,$fecha)
{
	$mysqli = conectar_al_servidor();
 
	$TotalPagos = 0;	
 

// Crear un objeto DateTime a partir de la fecha
$fechaObj = new DateTime($fecha);

// Formatear la fecha en el formato YYYY-MM
$fechaFormateada = $fechaObj->format('Y-m');
 
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(hora, '%Y-%m-%d')   between  '$fecha1' and '$fecha2' ";
}
  
 
	/* $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 } */
	
	
	$condiciontipoPago = "";
	if ($tipoPago != "") {
		$condiciontipoPago = " and  pg.Tipo ='" . $tipoPago . "'";
	}
	
	$condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
	
	$condicionEntrega="";
	 if($tipoCuota=="Cuota"){
	   $condicionEntrega=" and (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) !='Entrega'";		
	 }
	 if($tipoCuota=="Entrega"){
	   $condicionEntrega=" and ( (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='Entrega' or (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='ENTREGA' )";		
	 }

 
	$sql = "Select ifnull(sum(Monto),0) as TotalPagos from  pago pg inner join venta vt on cod_venta=cod_venta_fk  where 
	(( select cod_cobradorFK from persona inner join zona on cod_persona =cod_cobradorFK where idzona=
	(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )=$cod_cobrador and  DATE_FORMAT(hora, '%Y-%m') = '$fechaFormateada'  and DATE_FORMAT((select fechapago from credito where cod_creditoFK=idcredito), '%Y-%m') <= '$fechaFormateada'  ".$condicionFecha.$condicionlocal.$condiciontipo.$condicionEntrega.$condiciontipoPago;
	
	
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

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalPagos = $valor['TotalPagos'];
		}
	}


return $TotalPagos;

}

function buscar_meta_cobrador($fecha1, $fecha2,$cod_cobradorFK)
{$mysqli=conectar_al_servidor();

	$fechames1 = $fecha1; 
	$fechames1 = new DateTime($fechames1); 
	$fechames1 = $fechames1->format('Y-m');
	
	$fechames2 =  $fecha2; 
	$fechames2 = new DateTime($fechames2); 
	$fechames2 = $fechames2->format('Y-m');
	
	 $pagina='';
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(fecha, '%Y-%m') between  '$fechames1' and '$fechames2' ";
}

$condicioncobrador = '';
if($cod_cobradorFK !=''){
	$condicioncobrador = " and cod_cobrador = '$cod_cobradorFK'";
}

$sql= "Select monto , fecha ,url_img , cod_cobradorFK ,cod_meta_cobrador , 
		(select upper(nombre_persona) from persona where cod_persona = cod_cobrador) as cobrador  from  meta_cobrador  mc
		inner join cobrador  cb on cod_cobradorFK=cod_cobrador where cb.estado='Activo' ".$condicionFecha.$condicioncobrador." order by fecha asc ";



$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$cantidad = $valor;
$styleName="tableRegistroSearch";

$TotalMetas = 0;
$totalCobro = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

			 
		  	  $cobrador=utf8_encode($valor['cobrador']); 
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']); 
		  	  $fecha=utf8_encode($valor['fecha']); 

	
		  	  $monto=utf8_encode($valor['monto']); 
			  $TotalCobrado=buscarMontoCobro("", "" ,$fecha1,$fecha2,"","",$cod_cobradorFK,$fecha);
			  
			  $TotalMetas=$TotalMetas + $monto ;
			  $totalCobro += $TotalCobrado;
			  
}
}

if($TotalMetas > 0){
	$por = round(($totalCobro * 100)  / $TotalMetas);
}else{
	$por = 0;
}



$pagina.="
<table style='display:none'>
<tr>
<td></td>
<td><b>Total Cobro: ".number_format($totalCobro,'0',',','.')."</b></td>
<td><b>Total Metas: ".number_format($TotalMetas,'0',',','.')."</b></td>
<td><b>Porcentaje: ".$por."%</b></td>
</tr>
</table>
";
    
$informacion =array("1" => "exito","2" => $pagina,"3"=>number_format($totalCobro,'0',',','.'),"4"=>number_format($TotalMetas,'0',',','.'),"6"=>$por."%");
echo json_encode($informacion);	
exit;
}

function buscarResumenCobrador($tipoPago, $tipoCuota , $fecha,$cobrador,$local,$tipo,$fecha1,$fecha2,$metodo,$control,$formato='')
{
	$mysqli=conectar_al_servidor();
	
$pagina='';
$condicioncobrador="";
if($cobrador!=""){
	$condicioncobrador=" and cod_cobrador  = '".$cobrador."'";
}
	 
		$sql= "Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobrador ) as cobrador , cod_cobrador ,url_img, estado  from cobrador where estado='Activo' and 
		(select count(*) from zona where cod_cobrador=cod_cobradorFK )>=1 ".$condicioncobrador." order by cobrador";
		
   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $TotalCobranza=0;


  $filas=array();
  $paginaimprimir="";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  	  $cobrador=utf8_encode($valor['cobrador']); 
		  	  $url_img=utf8_encode($valor['url_img']); 
		  	  $cod_cobrador=utf8_encode($valor['cod_cobrador']);
			  
			  $TotalCobrado=buscarMontoResumenCobro($tipoPago, $tipoCuota ,$fecha,$local,$tipo,$cod_cobrador,$fecha1,$fecha2,$metodo,$control);
			  
			  $TotalCobranza= $TotalCobranza + $TotalCobrado[0];
		  		if($url_img==""){
					$url_img="/GoodVentaElectroCasaMaric/iconos/sinperfil.png";
				}	

				
			  $filas[]=array(
				  'cod_cobrador'=>$cod_cobrador,
				  'cobrador'=>$cobrador,
				  'url_img'=>$url_img,
				  'total'=>(float)$TotalCobrado[0],
				  'total_formateado'=>number_format($TotalCobrado[0],'0',',','.'),
				  'cantidad_clientes'=>$TotalCobrado[1]
			  );
				
	  }
 }

usort($filas, function($a, $b) {
	if ($a['total'] == $b['total']) {
		return 0;
	}
	return ($a['total'] < $b['total']) ? 1 : -1;
});

foreach ($filas as $fila) {
	$paginaimprimir.="
                <div class='sales' id='".$fila['cod_cobrador']."' onclick='obtenerdatosvistaventaResumenCobradores(this)'>
				<h3>".$fila['cobrador']."</h3>
                    <div class='status'>
                        <div style='width: 140px'>
                            <div class='imgFotoCi' style='background-image: url(".$fila['url_img'].");width: 140px'></div>
                        </div>
						<div style='display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;'>
						<div class='info'>
                            <h1>".$fila['total_formateado']." Gs.</h1>
                        </div>
                        <div class='progresss' style='display:flex;justify-content:center;color:white;background-color:#374654fa;align-items:center;flex-direction:column;box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;'>
                           <h2><b>".$fila['cantidad_clientes']."</b></h2>
                           <h3>Clientes</h3>
                        </div>
						</div>
                    </div>
                </div> ";
}

 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $paginaimprimir),"3" => $nroRegistro,"4" =>number_format($TotalCobranza,'0',',','.'));
echo json_encode($informacion);	
exit;


}


function buscarMontoResumenCobro($tipoPago, $tipoCuota ,$fecha,$local,$tipo,$cod_cobrador,$fecha1,$fecha2,$metodo,$control)
{
	$mysqli = conectar_al_servidor();
 
	$TotalPagos = 0;	
	$cantidad_clientes = 0;	

	$condicionFecha="";
	if($fecha!=""){
		$condicionFecha=" and DATE_FORMAT(hora, '%Y-%m-%d') = '$fecha'";
	}
	
	$condicionRangoFecha="";
	if($fecha1!="" && $fecha2!=""){
		$condicionRangoFecha=" and DATE_FORMAT(hora, '%Y-%m-%d') between '$fecha1' and '$fecha2'";
	}
  
 
	$condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }
	 
	 $condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
	
	$condiciontipoPago = "";
	if ($tipoPago != "") {
		$condiciontipoPago = " and  Tipo ='" . $tipoPago . "'";
	}
	
	$condicionEntrega="";
	 if($tipoCuota=="Cuota"){
	   $condicionEntrega=" and (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) !='Entrega'";		
	 }
	 if($tipoCuota=="Entrega"){
	   $condicionEntrega=" and ( (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='Entrega' or (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='ENTREGA' )";		
	 }
	 
	 
	 $condicionMetodo="";
	if($metodo!=""){
		$condicionMetodo=" and cod_tipoPagoFK = '$metodo'";
	}
	
	 $condicioncobradorasig = '';
	 if($control ==''){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobrador' ";
	 }
	 
	 if($control=='1'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobrador' and pg.cod_cobradorFK = '$cod_cobrador'";
	 }
	 
	 if($control=='2'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobrador' and pg.cod_cobradorFK != '$cod_cobrador'";
	 }

 
	$sql = "Select ifnull(sum(Monto),0) as TotalPagos,  COUNT(DISTINCT vt.cod_clienteFK) AS cantidad_clientes from  pago pg inner join venta vt on cod_venta=cod_venta_fk  where pg.idPago !='' ".$condicionFecha.$condicionlocal.$condiciontipo.$condicionEntrega.$condiciontipoPago.$condicionRangoFecha.$condicionMetodo.$condicioncobradorasig;
	
	
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

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalPagos = $valor['TotalPagos'];
			$cantidad_clientes = $valor['cantidad_clientes'];
		}
	}
	
	
	$datos[0] = $TotalPagos;
	$datos[1] = $cantidad_clientes;
	
	
	
	return $datos;
}


/*Buscar */
function buscarDetalleResumenCobrador($fecha,$control,$cod_cobradorFK,$fecha1,$fecha2,$metodo,$local,$tipo,$tipoPago,$tipoCuota,$formato='')
{

$mysqli=conectar_al_servidor();

 $totalRegistro=0;
	 $pagina="";
	 $filas=array();
	  $condicionfecha="";
	 if($fecha!=""){
		 $condicionfecha=" and DATE_FORMAT(hora, '%Y-%m-%d')  ='".$fecha."'";
	 }
	 
	 $condicionRangoFecha="";
	if($fecha1!="" && $fecha2!=""){
		$condicionRangoFecha=" and DATE_FORMAT(hora, '%Y-%m-%d') between '$fecha1' and '$fecha2'";
	}
	
	$condicionMetodo="";
	if($metodo!=""){
		$condicionMetodo=" and cod_tipoPagoFK = '$metodo'";
	}
	 
	 
	  $condicioncobradorasig = '';
	 if($control ==''){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobradorFK' ";
	 }
	 
	 if($control=='1'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobradorFK' and pg.cod_cobradorFK = '$cod_cobradorFK'";
	 }
	 
	 if($control=='2'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobradorFK' and pg.cod_cobradorFK != '$cod_cobradorFK'";
	 }
	 
	 // $condicionCodCobrador=" and pg.cod_cobradorFK ='".$cod_cobradorFK."'";		
	 
	 
	 $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }
	 
	 $condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
	
	$condiciontipoPago = "";
	if ($tipoPago != "") {
		$condiciontipoPago = " and  Tipo ='" . $tipoPago . "'";
	}


	
			$sql= "SELECT  (SELECT CONCAT(nombre,' DE ',diadesde,' HASTA ',diahasta) 
     FROM mora_cliente 
     WHERE idmora_cliente = pg.cod_moracliente limit 1) AS mora,pg.cod_moracliente,
    SUM(pg.Monto) AS total_pagado,
    COUNT(DISTINCT vt.cod_clienteFK) AS cantidad_clientes
FROM pago pg inner join venta vt ON pg.cod_venta_fk = vt.cod_venta
WHERE pg.Monto > 0 and pg.idPago !=''".$condicionfecha.$condicioncobradorasig.$condicionRangoFecha.$condicionMetodo.$condicionlocal.$condiciontipo.$condiciontipoPago." group by cod_moracliente";
			

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

$TotalMontoPago =0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$total_pagado=utf8_encode($valor['total_pagado']);
$mora=utf8_encode($valor['mora']);
$cantidad_clientes=utf8_encode($valor['cantidad_clientes']);

$TotalMontoPago+= $total_pagado;
	$filas[]=array(
		'cantidad_clientes'=>$cantidad_clientes,
		'total_pagado'=>(float)$total_pagado,
		'total_pagado_formateado'=>number_format($total_pagado,'0',',','.'),
		'mora'=>$mora,
		'clase_fila'=>$styleName === 'tableRegistroSearch' ? 'tableRegistroSearch2' : 'tableRegistroSearch'
	);
	
	$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td id='' style='width:30%'>".$cantidad_clientes." </td>
<td id='' style='width:30%'>".number_format($total_pagado,'0',',','.')." </td>
<td id='' style='width:30%'>".$mora." </td>
</tr>
</table>";



}
}



   

$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" =>number_format($TotalMontoPago,'0',',','.'),"4"=>$nroRegistro );
echo json_encode($informacion);	
exit;
}



ObtenerDatos($operacion);

?>
