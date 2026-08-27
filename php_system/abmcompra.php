<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("classTable.php");
include("subir_foto_base64.php");
include("cargar_archivo.php");

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




	
if($operacion=="nuevo" || $operacion=="editar")
{
	
	
	$cod_compra=$_POST['cod_compra'];
$cod_compra = utf8_decode($cod_compra);
$fecha_compra=$_POST['fecha_compra'];
$fecha_compra = utf8_decode($fecha_compra);
	$cod_proveedorFK=$_POST['cod_proveedorFK'];
$cod_proveedorFK = utf8_decode($cod_proveedorFK);
	$num_comprobante=$_POST['num_comprobante'];
$num_comprobante = utf8_decode($num_comprobante);
	$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
	$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);
	$pagado1=$_POST['pagado1'];
$pagado1 = quitarseparadormiles($pagado1);
	$pagado2=$_POST['pagado2'];
$pagado2 = quitarseparadormiles($pagado2);
	abm($cod_compra,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$pagado1,$pagado2,$operacion);

}

if($operacion=="cargarpdf")
{
	
	
	$cod_compra=$_POST['cod_compra'];
	$cod_compra = utf8_decode($cod_compra);
	// $pdf=$_POST['pdf'];
	// $pdf = utf8_decode($pdf);

	cargar_archivo_compra($cod_compra);

}

if ($operacion == "buscar_informe_compras_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['local'];
		$local = utf8_decode($local);
		$cod_proveedor = $_POST['cod_proveedor'];
		$cod_proveedor = utf8_decode($cod_proveedor);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		
		buscar_informe_compras_general($anho, $local, $cod_proveedor, $formato);
}


if ($operacion == "buscar_informe_compras_general_grafica") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$pagado = $_POST['pagado'];
		$pagado = utf8_decode($pagado);
		$tipoDeuda = $_POST['tipoDeuda'];
		$tipoDeuda = utf8_decode($tipoDeuda);
		buscar_informe_compras_general_grafica($anho,$pagado,$tipoDeuda);
	}

if($operacion=="nuevonotacredito" || $operacion == "editarnotacredito")
{
	
$idabm=$_POST['idabm'];
$idabm = utf8_decode($idabm);
$cod_usuario  = $user;
$cod_compraFK=$_POST['cod_compraFK'];
$cod_compraFK = utf8_decode($cod_compraFK);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$cod_proveedorFK=$_POST['cod_proveedorFK'];
$cod_proveedorFK = utf8_decode($cod_proveedorFK);
$nronotacredito=$_POST['nronotacredito'];
$nronotacredito = utf8_decode($nronotacredito);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);

	abmnotacredito($idabm, $cod_compraFK,$cod_proveedorFK,$nronotacredito,$fecha,$monto,$cod_usuario,$estado,$operacion);

}


if($operacion=="buscarListaPagos")
{
	$codProveedorPago=$_POST['codProveedorPago'];
$codProveedorPago = utf8_decode($codProveedorPago);

$id_carga_pago_total_a_compra=$_POST['id_carga_pago_total_a_compra'];
$id_carga_pago_total_a_compra = utf8_decode($id_carga_pago_total_a_compra);




$array_cod_compras = json_decode($_POST['array_cod_compras']);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	buscarListaPagos($codProveedorPago,$array_cod_compras,$id_carga_pago_total_a_compra,$formato);

}


if($operacion=="cargar_total_pago_compra")
{
	$totalpagar=$_POST['totalpagar'];
$totalpagar = utf8_decode($totalpagar);

$array_cod_compras = json_decode($_POST['array_cod_compras']);

	cargar_total_pago_compra($totalpagar,$array_cod_compras);

}

if($operacion=="cargar_total_pago_compra_temporal")
{
	$totalpagar=$_POST['totalpagar'];
$totalpagar = quitarseparadormiles(utf8_decode($totalpagar));

$array_cod_compras = json_decode($_POST['array_cod_compras']);

	cargar_total_pago_compra_temporal($totalpagar,$array_cod_compras);

}


if($operacion=="buscar_compras_con_cheque_faltante")
{
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscar_compras_con_cheque_faltante($formato);

}


if($operacion=="buscarHistorialPagos")
{
	$codProveedorPago=$_POST['codProveedorPago'];
$codProveedorPago = utf8_decode($codProveedorPago);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	buscarHistorialPagos($codProveedorPago,$formato);

}

if($operacion=="buscarnotacreditos")
{
	$cod_compraFK=$_POST['cod_compraFK'];
$cod_compraFK = utf8_decode($cod_compraFK);
$cod_proveedorFK=$_POST['cod_proveedorFK'];
$cod_proveedorFK = utf8_decode($cod_proveedorFK);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	buscarNotaCredito($cod_proveedorFK,$cod_compraFK,$formato);

}

if($operacion=="EliminarListadoPago")
{
	$cod_chequeListadoPago=$_POST['cod_chequeListadoPago'];
$cod_chequeListadoPago = utf8_decode($cod_chequeListadoPago);

$idpago_total_compraFK=$_POST['id_carga_pago_total_a_compra'];
$idpago_total_compraFK = utf8_decode($idpago_total_compraFK);
	EliminarListadoPago($cod_chequeListadoPago,$idpago_total_compraFK);

}

if($operacion=="EliminarListadoPagoCargando")
{
	$cod_chequeListadoPago=$_POST['cod_chequeListadoPago'];
$cod_chequeListadoPago = utf8_decode($cod_chequeListadoPago);

	EliminarListadoPagoCargando($cod_chequeListadoPago);

}

if($operacion=="buscarCompraProveedorDetalle")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
	$proveedor=$_POST['proveedor'];
$proveedor = utf8_decode($proveedor);
	$control=$_POST['control'];
$control = utf8_decode($control);	
$cod_factura=$_POST['cod_factura'];
$cod_factura = utf8_decode($cod_factura);
$fecha_compra=$_POST['fecha_compra'];
$fecha_compra = utf8_decode($fecha_compra);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarCompraProveedorDetalle($fecha1,$fecha2,$proveedor,$control,$cod_factura,$fecha_compra,$formato);

}


if($operacion=="buscarDetalle")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscarDetalle($buscar,$formato);

}	

if($operacion=="eliminarcompra")
{
	$idAbmCompra=$_POST['idAbmCompra'];
$idAbmCompra = utf8_decode($idAbmCompra);
$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
eliminarcompra($idAbmCompra,$motivo);

}
if($operacion=="buscarpagoscompra")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarpagoscompra($buscar,$formato);

}
if($operacion=="buscarpagoscomprahistorial")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarpagoscomprahistorial($buscar,$formato);

}
if($operacion=="buscarcod")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
buscarcod($buscar,$cod_local);

}

if($operacion=="nuevopago" || $operacion=="editarpago" || $operacion=="eliminarpago")
{
	$codpago=$_POST['codpago'];
$codpago = utf8_decode($codpago);
	$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
	$fechaapagar=$_POST['fechaapagar'];
$fechaapagar = utf8_decode($fechaapagar);
$fechadelpago=$_POST['fechadelpago'];
$fechadelpago = utf8_decode($fechadelpago);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$nrocheque=$_POST['nrocheque'];
$nrocheque = utf8_decode($nrocheque);
$cod_compraFk=$_POST['cod_compraFk'];
$cod_compraFk = utf8_decode($cod_compraFk);

addPagos($codpago,$nrocheque,$monto,$fechaapagar,$fechadelpago,$tipo,$estado,$cod_compraFk,$operacion);

}


if($operacion=="nuevoPagoProveedor")
{
$idPagoProveedor=$_POST['idPagoProveedor'];
$idPagoProveedor = utf8_decode($idPagoProveedor);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
$useru=$_POST['useru'];
$useru = utf8_decode($useru);

$cod_PagoProveedor= ABMnuevoPagoProveedor($idPagoProveedor,$monto,$useru,$operacion);

$control=$_POST['control'];
$control = utf8_decode($control);
	
nuevoPagoProveedor($control,$cod_PagoProveedor,$operacion);
}	

if($operacion=="buscar")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$nrocompra=$_POST['nrocompra'];
$nrocompra = utf8_decode($nrocompra);
$filtrofecha=$_POST['filtrofecha'];
$filtrofecha = utf8_decode($filtrofecha);
$proveedor=$_POST['proveedor'];
$proveedor = utf8_decode($proveedor);
$estadopago=$_POST['estadopago'];
$estadopago = utf8_decode($estadopago);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$agrupado=$_POST['agrupado'];
$agrupado = utf8_decode($agrupado);
$tipo_compra=$_POST['tipo_compra'];
$tipo_compra = utf8_decode($tipo_compra);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
buscar($fecha1,$fecha2,$nrocompra,$filtrofecha,$proveedor,$estadopago,$cod_local,$agrupado,$tipo_compra,$formato);

}

if($operacion=="buscarcompraseliminados")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$nrocompra=$_POST['nrocompra'];
$nrocompra = utf8_decode($nrocompra);
buscarcompraseliminados($fecha1,$fecha2,$nrocompra);

}

if($operacion=="buscarCompraProveedor")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
	$proveedor=$_POST['proveedor'];
$proveedor = utf8_decode($proveedor);	
$control=$_POST['control'];
$control = utf8_decode($control);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarCompraProveedor($fecha1,$fecha2,$proveedor,$control,$formato);

}

if($operacion=="buscarmas")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$nrocompra=$_POST['nrocompra'];
$nrocompra = utf8_decode($nrocompra);
$filtrofecha=$_POST['filtrofecha'];
$filtrofecha = utf8_decode($filtrofecha);
$proveedor=$_POST['proveedor'];
$proveedor = utf8_decode($proveedor);
$estadopago=$_POST['estadopago'];
$estadopago = utf8_decode($estadopago);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);
$totalCompra=$_POST['totalCompra'];
$totalCompra = quitarseparadormiles($totalCompra);
$totalDescuento=$_POST['totalDescuento'];
$totalDescuento = quitarseparadormiles($totalDescuento);
$totalPendiente=$_POST['totalPendiente'];
$totalPendiente = quitarseparadormiles($totalPendiente);
$totalPagado=$_POST['totalPagado'];
$totalPagado = quitarseparadormiles($totalPagado);
$tipo_compra=$_POST['tipo_compra'];
$tipo_compra = utf8_decode($tipo_compra);
$totalConDescuento=$_POST['totalConDescuento'];
$totalConDescuento = utf8_decode($totalConDescuento);

$agrupado=$_POST['agrupado'];
$agrupado = utf8_decode($agrupado);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
buscarmas($fecha1,$fecha2,$nrocompra,$filtrofecha,$proveedor,$estadopago,$cod_local,$registrocargado,$totalCompra,$totalDescuento,$totalPendiente,$totalPagado,$agrupado,$tipo_compra,$totalConDescuento,$formato);

}

if($operacion=="buscarcuentasapagar")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$proveedor=$_POST['proveedor'];
$proveedor = utf8_decode($proveedor);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$nrofactura=$_POST['nrofactura'];
$nrofactura = utf8_decode($nrofactura);
$filtrofecha=$_POST['filtrofecha'];
$filtrofecha = utf8_decode($filtrofecha);
$nrocheque=$_POST['nrocheque'];
$nrocheque = utf8_decode($nrocheque);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarcuentasapagar($fecha1,$fecha2,$proveedor,$cod_local,$nrofactura,$filtrofecha,$nrocheque,$formato);

}	

if($operacion=="buscarvista")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$local=$_POST['local'];
$local = utf8_decode($local);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
buscarvista($buscar,$local,$formato);

}	
if($operacion=="buscarnro")
{
	
buscarnro();

}

}

function abm($cod_compra,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$pagado1,$pagado2,$operacion)
{
	
	
if($cod_proveedorFK=="" || $num_comprobante==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
}

$mysqli=conectar_al_servidor(); 

/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d h:i:s', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);


if($operacion=="nuevo")
{
$consulta1="Insert into compra (fecha_compra,cod_proveedorFK,num_comprobante,cod_local,descuento,cod_user_insert,fecha_insert)
values(?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssss';
$stmt1->bind_param($ss,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$user,$fecha_inser_edit);
}


if($operacion=="editar")
{
$consulta1="Update compra set fecha_compra=?,cod_proveedorFK=?,num_comprobante=?,cod_local=?,descuento=?,cod_user_edit=?,fecha_edit=? where cod_compra=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$user,$fecha_inser_edit,$cod_compra);
}


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

if($operacion=="nuevo"){
	$cod_compra=obtenerId($cod_proveedorFK,$num_comprobante,$cod_local);
}
 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $cod_compra);
echo json_encode($informacion);	
exit;
	
}

function  eliminarcompra($cod_compra,$motivo)
{
	
	
if($cod_compra=="" || $motivo==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
}

$mysqli=conectar_al_servidor(); 

/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d h:i:s', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);


$consulta1="Update compra set motivoeliminar=?,cod_user_edit=?,fecha_edit=?,estado='Inactivo' where cod_compra=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$motivo,$user,$fecha_inser_edit,$cod_compra);



if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

recorredetalles($cod_compra);

 mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $cod_compra);
echo json_encode($informacion);	
exit;
	
}

function addPagos($codpago,$nrocheque,$monto,$fechaapagar,$fechadelpago,$tipo,$estado,$cod_compraFk,$operacion)
{
	
	
if($cod_compraFk=="" || $monto=="" || $tipo==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
}

$mysqli=conectar_al_servidor(); 
/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);


if($operacion=="nuevopago")
{


$consulta1="Insert into pagosdecompra (nrocheque,monto,fechaapagar,fechadelpago,tipo,estado,cod_compraFk,cod_user_insert,fecha_insert)
values(?,?,?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssss';
$stmt1->bind_param($ss,$nrocheque,$monto,$fechaapagar,$fechadelpago,$tipo,$estado,$cod_compraFk,$user,$fecha_inser_edit);


}


if($operacion=="editarpago")
{

$consulta1="Update pagosdecompra set monto=?,nrocheque=?,fechaapagar=?,fechadelpago=?,tipo=?,estado=?,cod_compraFk=?,cod_user_edit=?,fecha_edit=? where codpago=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssss';
$stmt1->bind_param($ss,$monto,$nrocheque,$fechaapagar,$fechadelpago,$tipo,$estado,$cod_compraFk,$user,$fecha_inser_edit,$codpago);

}

if($operacion=="eliminarpago")
{

$consulta1="delete from pagosdecompra where codpago=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$codpago);

}


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}


function obtenerId($cod_proveedorFK,$num_comprobante,$cod_local)
{
	$mysqli=conectar_al_servidor();
	 $cod_compra='';
		$sql= "Select cod_compra from compra where cod_proveedorFK='$cod_proveedorFK' and num_comprobante='$num_comprobante' and cod_local='$cod_local' order by fecha_compra desc limit 1   ";
		
   
   
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
		  
		  
		      $cod_compra=$valor['cod_compra'];
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
return $cod_compra;


}



function buscarcod($buscar,$cod_local){
	$mysqli=conectar_al_servidor();
	 
		$sql= "Select cod_compra,fecha_compra,cod_proveedorFK,num_comprobante,cod_local,descuento,pagado1,pagado2,
		IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk),0) as totalpagados,
		IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and tipo='Cheque'),0) as pagosencheque,
		IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and tipo='Efectivo' ),0) as pagosenefectivo,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor
		from compra   where  estado='Activo' (cod_compra=? or num_comprobante=?) and cod_local=? ";
		
		     $fecha_compra="";
		  	  $cod_proveedorFK="";
		  	  $num_comprobante="";
		  	  $cod_compra="";
		  	  $proveedor="";
		  	  $cod_local="";
		  	  $descuento="0";
		  	  $pagado1="0";
		  	  $pagado2="0";
		  	  $totalpagados="0";
		  	    
   $stmt = $mysqli->prepare($sql);
  	$s='sss';
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar,$buscar,$cod_local);

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
		  
		  
		      $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $descuento=utf8_encode($valor['descuento']);
		  	  $pagado1=utf8_encode($valor['pagado1']);
		  	  $pagado2=utf8_encode($valor['pagado2']);
		  	  $pagosencheque=utf8_encode($valor['pagosencheque']);
		  	  $pagosenefectivo=utf8_encode($valor['pagosenefectivo']);
		  	  $totalpagados=utf8_encode($valor['totalpagados']);
		  	  
		
		  	 
		
			  
			  
	  }
 }
 
 
 mysqli_close($mysqli);
$informacion =array("0" => "exito","1" => $fecha_compra,"2" => $cod_proveedorFK,"3" => $num_comprobante,"4" => $proveedor,"5" => $cod_compra,"6" => $cod_local,"7" => number_format($descuento,'0',',','.'),"8" => number_format($pagado1,'0',',','.'),"9" => number_format($pagado2,'0',',','.'),"10" => number_format($totalpagados,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarcompraseliminados($fecha1,$fecha2,$nrocompra)
{
	
	$mysqli=conectar_al_servidor();
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	$filas=array();
	$condicionNroCompra="";
	if($nrocompra!=""){
		$condicionNroCompra="and num_comprobante like %'".$nrocompra."'%";
	}
	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha="and date(fecha_edit)>='".$fecha1."' and date(fecha_edit)<='".$fecha2."' ";
	}

		
		$sql= "Select cod_compra,fecha_compra,num_comprobante,cp.motivoeliminar,
		(Select Nombre from local l where l.cod_local=cp.cod_local) as nombrelocal,
				cp.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
		from compra cp  where  cp.estado='Inactivo' and cod_compra!='0'  ".$condicionNroCompra.$condicionfecha;
	  
	
	  
	 
		     $pagina="";
		  	
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $motivoeliminar=utf8_encode($valor['motivoeliminar']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	  $fecha_edit=utf8_encode($valor['fecha_edit']);
		  	  $editadopor=utf8_encode($valor['editadopor']);
			  $filas[]=array(
				"codigo_compra" => $cod_compra,
				"fecha_compra" => $fecha_compra,
				"numero_comprobante" => $num_comprobante,
				"motivo" => $motivoeliminar,
				"fecha_eliminacion" => $fecha_edit,
				"eliminado_por" => $editadopor,
				"local" => $nombrelocal
			  );
				
			if($formato!='json'){
				$styleName=CargarStyleTable($styleName);
		  	   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='td_datos_1' style='width:10%'>".$num_comprobante."</td>
<td  id='td_datos_3' style='width:10%'>".$motivoeliminar."</td>
<td  id='td_datos_3' style='width:10%'>".$fecha_edit."</td>
<td  id='td_datos_3' style='width:10%'>".$editadopor."</td>
<td  id='td_datos_3' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";
		
			  
			  
	  }
 }
 
 
 
 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscar($fecha1,$fecha2,$nrocompra,$filtrofecha,$proveedor,$estadopago,$cod_local,$agrupado,$tipo_compra,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $condicionCodLocal="";
		 if($cod_local!=""){
			 $condicionCodLocal=" and cp.cod_local='$cod_local' ";
		 }

		 $condicionFecha="";
		 if($fecha1!="" && $fecha2!=""){
			 $condicionFecha=" and fecha_compra between '".$fecha1."' and  '".$fecha2."' ";
		 }
		 
		 $condicionfechafiltro="";
		 if($filtrofecha!=""){
			 $condicionfechafiltro=" and fecha_compra='".$filtrofecha."'  ";
		 }
		 
		 $condicionproveedor="";
		 if($proveedor!=""){
			 $condicionproveedor=" and cod_proveedorFK = '".$proveedor."' ";
		 }
		 
		  $condicionnrocomprobante="";
		 if($nrocompra!=""){
			 $condicionnrocomprobante=" and num_comprobante like '%".$nrocompra."%'  ";
		 } 
		 $condiciontipo_compra="";
		 if($tipo_compra!=""){
			 $condiciontipo_compra=" and tipo_compra='".$tipo_compra."'  ";
		 } 
		 
		 $condicionagrupado="";
		 $condicionselectagrupado = "
		IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0) as totalcompra,
	    IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pagado'),0) as totalpagado,
	    IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pendiente'),0) as totalPendiente,
		IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk ),0) as totalpagos
		 ";
		 if($agrupado!=""){
			 $condicionagrupado=" group by cod_proveedorFK";
			  $condicionselectagrupado = "
			  sum(IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0)) as totalcompra,
	    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pagado'),0)) as totalpagado,
	    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pendiente'),0)) as totalPendiente,
			    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk ),0)) as totalpagos
			  ";
		 }
		 
		 
		 $condicionpagos="";
		  if($estadopago=="1"){
		$condicionpagos=" and ((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK) - descuento)>(SELECT IFNULL(sum((SELECT importe FROM cheque WHERE idcheque = idchequeFK)),0) FROM detalle_pago_cheque where cod_compraFK = cod_compra)"; 
	 }
	  if($estadopago=="2"){
		$condicionpagos="  and ((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK) - descuento)<=(SELECT IFNULL(sum((SELECT importe FROM cheque WHERE idcheque = idchequeFK)),0) FROM detalle_pago_cheque where cod_compraFK = cod_compra) "; 
	 }
	 
	 
	 
		$sql= "Select cod_compra,fecha_compra,cod_proveedorFK,num_comprobante,cod_local,descuento,pagado1,pagado2,url,tipo_compra,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor,
		(Select Nombre from local l where l.cod_local=cp.cod_local) as nombrelocal,
		$condicionselectagrupado,
				cp.fecha_insert,cp.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
		from compra cp  where  cp.estado='Activo' and cod_compra!='0'  ".$condicionCodLocal.$condicionFecha.$condicionfechafiltro.$condicionproveedor.$condicionnrocomprobante.$condicionpagos.$condiciontipo_compra ." $condicionagrupado limit 50";
	 
		     
			 
			// echo $sql;
			// exit;
			 
			 
			 $pagina="";
			 $filas=array();
		  	
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalCompas=0;
 $totalDesc=0;
 $TotalesPagago=0;
 $TotalesPendiente=0;
 $TotalCompraConDescuento = 0;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $subtotalcompra=utf8_encode($valor['totalcompra']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	 $descuento=utf8_encode($valor['descuento']);
		  	  $totalPendiente=utf8_encode($valor['totalPendiente']);
		  	  $totalpagos=utf8_encode($valor['totalpagos']);
			  $insertadopor = utf8_encode($valor['insertadopor']); 
			  $tipo_compra = utf8_encode($valor['tipo_compra']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
$url = utf8_encode($valor['url']); 
		  	  $totalcompra=$subtotalcompra-$descuento;
		  	  
			  
			    $totalCompas=$totalCompas+$subtotalcompra;
 $totalDesc=$descuento+$totalDesc;
 
			  $totalpagado = obtener_total_detalle_compra_pagado($cod_compra);
			  $totalPendiente = $totalcompra - $totalpagado;
			  $TotalesPagago+= $totalpagado;
			  $TotalesPendiente+= $totalPendiente;
			  $TotalCompraConDescuento+= $totalcompra;
			  

$ver = '';
if($url !=''){
	$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
}

			   $filas[]=array(
				   "cod_compra"=>$cod_compra,
				   "fecha_compra"=>$fecha_compra,
				   "cod_proveedor"=>$cod_proveedorFK,
				   "num_comprobante"=>$num_comprobante,
				   "proveedor"=>$proveedor,
				   "tipo_compra"=>$tipo_compra,
				   "subtotal"=>(float)$subtotalcompra,
				   "subtotal_formateado"=>number_format($subtotalcompra,'0',',','.'),
				   "descuento"=>(float)$descuento,
				   "descuento_formateado"=>number_format($descuento,'0',',','.'),
				   "total"=>(float)$totalcompra,
				   "total_formateado"=>number_format($totalcompra,'0',',','.'),
				   "total_pagado"=>(float)$totalpagado,
				   "total_pagado_formateado"=>number_format($totalpagado,'0',',','.'),
				   "total_pendiente"=>(float)$totalPendiente,
				   "total_pendiente_formateado"=>number_format($totalPendiente,'0',',','.'),
				   "local"=>$nombrelocal,
				   "cod_local"=>$cod_local,
				   "total_pagos"=>(float)$totalpagos,
				   "total_pagos_formateado"=>number_format($totalpagos,'0',',','.'),
				   "insertado_por"=>$insertadopor,
				   "editado_por"=>$editadopor,
				   "fecha_insert"=>$fecha_insert,
				   "fecha_edit"=>$fecha_edit,
				   "url"=>$url
			   );

			   if($formato!='json'){
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosacompra(this)'>
<td  id='td_datos_1' style='width:10%'>".$num_comprobante."</td>
<td  id='td_datos_2' style='width:10%'>".$fecha_compra."</td>
<td  id='td_datos_3' style='width:10%'>".$proveedor."</td>
<td  id='td_datos_15' style='width:5%'>".$tipo_compra."</td>
<td  id='td_datos_7' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='td_datos_8' style='width:10%'>". number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_4' style='width:10%'>". number_format($totalcompra,'0',',','.')."</td>
<td  id='td_datos_9' style='width:10%'>". number_format($totalpagado,'0',',','.')."</td>
<td  id='td_datos_10' style='width:10%'>". number_format($totalPendiente,'0',',','.')."</td>
<td  id='' style='width:10%'>". $nombrelocal."</td>
<td  id='' style='width:10%'>". $ver."</td>
<td  id='td_datos_5' style='display:none'>".$cod_compra."</td>
<td  id='td_datos_6' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_11' style='display:none'>".$cod_local."</td>
<td  id='td_datos_12' style='display:none'>".number_format($totalpagos,'0',',','.')."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
</tr>
</table>";
			}
			   }
		
			  
			  
	  }
 
  $condicionagrupado="";
		 $condicionselectagrupado = "";
		 if($agrupado!=""){
			 $condicionagrupado=" group by cod_proveedorFK";
			  $condicionselectagrupado = "
			  ,sum(IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0)) as totalcompra,
	    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pagado'),0)) as totalpagado,
	    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pendiente'),0)) as totalPendiente,
			    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk ),0)) as totalpagos
			  ";
		 }
 
 
 $sql= "Select cod_compra $condicionselectagrupado
		from compra cp  where cp.estado='Activo' and cod_compra!='0'  ".$condicionCodLocal.$condicionFecha.$condicionfechafiltro.$condicionproveedor.$condicionnrocomprobante.$condicionpagos.$condiciontipo_compra. " $condicionagrupado";
		
		$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalregisto= $valor;
 
 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($totalCompas,'0',',','.'),"5"=>number_format($totalDesc,'0',',','.'),"6"=>number_format($TotalesPendiente,'0',',','.'),"7"=>number_format($TotalesPagago,'0',',','.'),"8"=>number_format($TotalCompraConDescuento,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregisto);
echo json_encode($informacion);	
exit;
}

function buscarmas($fecha1,$fecha2,$nrocompra,$filtrofecha,$proveedor,$estadopago,$cod_local,$registrocargado,$totalCompra,$totalDescuento,$totalPendiente,$totalPagado,$agrupado,$tipo_compra,$totalConDescuento,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $condicionCodLocal="";
		 if($cod_local!=""){
			 $condicionCodLocal=" and cp.cod_local='$cod_local' ";
		 }

		 $condicionFecha="";
		 if($fecha1!="" && $fecha2!=""){
			 $condicionFecha=" and fecha_compra between '".$fecha1."' and  '".$fecha2."' ";
		 }
		 
		 $condicionfechafiltro="";
		 if($filtrofecha!=""){
			 $condicionfechafiltro=" and fecha_compra='".$filtrofecha."'  ";
		 }
		 
		 $condicionproveedor="";
		 if($proveedor!=""){
			 $condicionproveedor=" and cod_proveedorFK = '".$proveedor."' ";
		 }
		 
		 $condicionagrupado="";
		 $condicionselectagrupado = "
		IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0) as totalcompra,
	    IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pagado'),0) as totalpagado,
	    IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pendiente'),0) as totalPendiente,
		IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk ),0) as totalpagos
		 ";
		 if($agrupado!=""){
			 $condicionagrupado=" group by cod_proveedorFK";
			  $condicionselectagrupado = "
			  sum(IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0)) as totalcompra,
	    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pagado'),0)) as totalpagado,
	    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pendiente'),0)) as totalPendiente,
			    sum(IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk ),0)) as totalpagos
			  ";
		 }
		 
		  $condicionnrocomprobante="";
		 if($nrocompra!=""){
			 $condicionnrocomprobante=" and num_comprobante like '%".$nrocompra."%'  ";
		 } 
		 
		  $condiciontipo_compra="";
		 if($tipo_compra!=""){
			 $condiciontipo_compra=" and tipo_compra='".$tipo_compra."'  ";
		 } 
		 
		 $condicionpagos="";
		  if($estadopago=="1"){
		$condicionpagos=" and ((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK) - descuento)>(SELECT IFNULL(sum((SELECT importe FROM cheque WHERE idcheque = idchequeFK)),0) FROM detalle_pago_cheque where cod_compraFK = cod_compra)"; 
	 }
	  if($estadopago=="2"){
		$condicionpagos="  and ((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK) - descuento)<=(SELECT IFNULL(sum((SELECT importe FROM cheque WHERE idcheque = idchequeFK)),0) FROM detalle_pago_cheque where cod_compraFK = cod_compra) "; 
	 }
	 
		$sql= "Select cod_compra,fecha_compra,cod_proveedorFK,num_comprobante,cod_local,descuento,pagado1,pagado2,url,tipo_compra,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor,
		(Select Nombre from local l where l.cod_local=cp.cod_local) as nombrelocal,
		$condicionselectagrupado,
				cp.fecha_insert,cp.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
		from compra cp  where  cp.estado='Activo' and cod_compra!='0'  ".$condicionCodLocal.$condicionFecha.$condicionfechafiltro.$condicionproveedor.$condicionnrocomprobante.$condicionpagos.$condiciontipo_compra." '$condicionagrupado' limit ".$registrocargado." , 50 ";
	  

	
	 
		     $pagina="";
		     $filas=array();
		  	
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor+$registrocargado;
 $totalCompas=$totalCompra;
 $totalDesc=$totalDescuento;
 $TotalesPagago=$totalPagado;
 $TotalesPendiente=$totalPendiente;
 $TotalConDescuento=$totalConDescuento;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $subtotalcompra=utf8_encode($valor['totalcompra']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	 $descuento=utf8_encode($valor['descuento']);
		  	  $totalPendiente=utf8_encode($valor['totalPendiente']);
		  	  $totalpagos=utf8_encode($valor['totalpagos']);
			  $insertadopor = utf8_encode($valor['insertadopor']); 
			  $tipo_compra = utf8_encode($valor['tipo_compra']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
$url = utf8_encode($valor['url']); 
		  	  $totalcompra=$subtotalcompra-$descuento;
		  	  
			  
			    $totalCompas=$totalCompas+$subtotalcompra;
 $totalDesc=$descuento+$totalDesc;
 
			  $totalpagado = obtener_total_detalle_compra_pagado($cod_compra);
			  $totalPendiente = $totalcompra - $totalpagado;
			  $TotalesPagago+= $totalpagado;
			  $TotalesPendiente+= $totalPendiente;
			  $TotalConDescuento+= $totalcompra;
			  
$ver = '';
if($url !=''){
	$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
}

			   $filas[]=array(
				   "cod_compra"=>$cod_compra,
				   "fecha_compra"=>$fecha_compra,
				   "cod_proveedor"=>$cod_proveedorFK,
				   "num_comprobante"=>$num_comprobante,
				   "proveedor"=>$proveedor,
				   "tipo_compra"=>$tipo_compra,
				   "subtotal"=>(float)$subtotalcompra,
				   "subtotal_formateado"=>number_format($subtotalcompra,'0',',','.'),
				   "descuento"=>(float)$descuento,
				   "descuento_formateado"=>number_format($descuento,'0',',','.'),
				   "total"=>(float)$totalcompra,
				   "total_formateado"=>number_format($totalcompra,'0',',','.'),
				   "total_pagado"=>(float)$totalpagado,
				   "total_pagado_formateado"=>number_format($totalpagado,'0',',','.'),
				   "total_pendiente"=>(float)$totalPendiente,
				   "total_pendiente_formateado"=>number_format($totalPendiente,'0',',','.'),
				   "local"=>$nombrelocal,
				   "cod_local"=>$cod_local,
				   "total_pagos"=>(float)$totalpagos,
				   "total_pagos_formateado"=>number_format($totalpagos,'0',',','.'),
				   "insertado_por"=>$insertadopor,
				   "editado_por"=>$editadopor,
				   "fecha_insert"=>$fecha_insert,
				   "fecha_edit"=>$fecha_edit,
				   "url"=>$url
			   );

			   if($formato!='json'){
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosacompra(this)'>
<td  id='td_datos_1' style='width:10%'>".$num_comprobante."</td>
<td  id='td_datos_2' style='width:10%'>".$fecha_compra."</td>
<td  id='td_datos_3' style='width:10%'>".$proveedor."</td>
<td  id='td_datos_15' style='width:5%'>".$tipo_compra."</td>
<td  id='td_datos_7' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='td_datos_8' style='width:10%'>". number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_4' style='width:10%'>". number_format($totalcompra,'0',',','.')."</td>
<td  id='td_datos_9' style='width:10%'>". number_format($totalpagado,'0',',','.')."</td>
<td  id='td_datos_10' style='width:10%'>". number_format($totalPendiente,'0',',','.')."</td>
<td  id='' style='width:10%'>". $nombrelocal."</td>
<td  id='' style='width:10%'>". $ver."</td>
<td  id='td_datos_5' style='display:none'>".$cod_compra."</td>
<td  id='td_datos_6' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_11' style='display:none'>".$cod_local."</td>
<td  id='td_datos_12' style='display:none'>".number_format($totalpagos,'0',',','.')."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
</tr>
</table>";
			   }
		
			  
			  
	  }
 }
 
 
 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($totalCompas,'0',',','.'),"5"=>number_format($totalDesc,'0',',','.'),"6"=>number_format($TotalesPendiente,'0',',','.'),"7"=>number_format($TotalesPagago,'0',',','.'),"8"=>number_format($TotalConDescuento,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscarvista($buscar,$local,$formato=''){
	
	$mysqli=conectar_al_servidor();
	 $condicionlocal="";
	 if($local!=""){
		$condicionlocal=" and cp.cod_local='$local'  "; 
	 }
	   	$sql= "Select tipo_compra,timbrado,tipoFactura,cod_compra,fecha_compra,cod_proveedorFK,num_comprobante,cod_local,descuento,pagado1,pagado2,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor,
		(Select Nombre from local l where l.cod_local=cp.cod_local) as nombrelocal,
		IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0) as totalcompra,
		IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk),0) as totalpagados
		from compra cp  where cp.estado='Activo' and concat(cod_compra,' ',num_comprobante,' ',(Select nombre_persona from persona where cod_persona=cod_proveedorFK)) like '%".$buscar."%' ".$condicionlocal." order by fecha_compra asc limit 100  ";
	    $pagina="";
		$filas=array();
		  	
			
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
 $totalCompas=0;
 $totalDesc=0;
 $totalEfectivo=0;
 $totalCheque=0;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			   $tipo_compra=$valor['tipo_compra'];
			   $timbrado=$valor['timbrado'];
			   $tipoFactura=$valor['tipoFactura'];
		  
		      $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $subtotalcompra=utf8_encode($valor['totalcompra']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	 $descuento=utf8_encode($valor['descuento']);
		  	 $pagado1=utf8_encode($valor['pagado1']);
		  	  $pagado2=utf8_encode($valor['pagado2']);
		  	  $totalpagados=utf8_encode($valor['totalpagados']);
		  	  $totalcompra=$subtotalcompra-$descuento;
		  	  
			  if($pagado1==''){$pagado1=0;}
			  if($pagado2==''){
				  $pagado2=0;
				  }
			  
		 $totalCompas=$totalCompas+$totalcompra;
 $totalDesc=$descuento+$totalDesc;
 $totalEfectivo=$pagado1+$totalEfectivo;
 $totalCheque=$pagado2+$totalCheque;
	$totalpagago=$pagado1+$pagado2;
			   $filas[]=array(
				   "cod_compra"=>$cod_compra,
				   "fecha_compra"=>$fecha_compra,
				   "cod_proveedor"=>$cod_proveedorFK,
				   "num_comprobante"=>$num_comprobante,
				   "proveedor"=>$proveedor,
				   "local"=>$nombrelocal,
				   "cod_local"=>$cod_local,
				   "subtotal"=>(float)$subtotalcompra,
				   "subtotal_formateado"=>number_format($subtotalcompra,'0',',','.'),
				   "descuento"=>(float)$descuento,
				   "descuento_formateado"=>number_format($descuento,'0',',','.'),
				   "total"=>(float)$totalcompra,
				   "total_formateado"=>number_format($totalcompra,'0',',','.'),
				   "pagado_efectivo"=>(float)$pagado1,
				   "pagado_efectivo_formateado"=>number_format($pagado1,'0',',','.'),
				   "pagado_cheque"=>(float)$pagado2,
				   "pagado_cheque_formateado"=>number_format($pagado2,'0',',','.'),
				   "total_pagados"=>(float)$totalpagados,
				   "total_pagados_formateado"=>number_format($totalpagados,'0',',','.'),
				   "tipo_compra"=>$tipo_compra,
				   "timbrado"=>$timbrado,
				   "tipo_factura"=>$tipoFactura
			   );
			   if($formato!='json'){
			    $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName w-100' border='1' cellspacing='1' cellpadding='5'>
<tbody>
<tr id='tbSelecRegistro' onclick='obtenerdatosacompravista(this)'>
<td  id='td_datos_1' style='width:10%'>".$num_comprobante."</td>
<td  id='td_datos_3' style='width:30%'>".$proveedor."</td>
<td  id='' style='width:10%'>". $nombrelocal."</td>
<td  id='td_datos_2' style='width:10%'>".$fecha_compra."</td>
<td  id='td_datos_7' style='display:none'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='td_datos_8' style='display:none'>". number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_4' style='width:10%'>". number_format($totalcompra,'0',',','.')."</td>
<td  id='td_datos_9' style='display:none'>". number_format($pagado1,'0',',','.')."</td>
<td  id='td_datos_10' style='display:none'>". number_format($pagado2,'0',',','.')."</td>
<td  id='td_datos_12' style='display:none'>". number_format($totalpagados,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".$cod_compra."</td>
<td  id='td_datos_6' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_11' style='display:none'>".$cod_local."</td>
<td  id='td_datos_13' style='width:10%'>".$tipo_compra."</td>
<td  id='td_datos_14' style='width:10%'>".$timbrado."</td>
<td  id='td_datos_15' style='width:10%'>".$tipoFactura."</td>
</tr>
</tbody>
</table>";
			   }
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($totalCompas,'0',',','.'),"5"=>number_format($totalDesc,'0',',','.'),"6"=>number_format($totalEfectivo,'0',',','.'),"7"=>number_format($totalCheque,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarpagoscompra($buscar,$formato=''){
	
	$mysqli=conectar_al_servidor();
	 
	   	$sql= "Select pg.codpago,pg.monto,pg.fechaapagar,pg.fechadelpago,pg.tipo,pg.estado,pg.cod_compraFk,pg.nrocheque,pg.fecha_insert,pg.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=pg.cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=pg.cod_user_edit )as editadopor
		from compra cp inner join pagosdecompra pg on pg.cod_compraFk=cp.cod_compra
		where cp.estado='Activo' and cp.cod_compra='$buscar' order by fechadelpago";
	    $pagina="";
		$filas=array();
		 
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $Totales=0;
 $TotalPagado=0;
 $TotalPendiente=0;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $codpago=$valor['codpago'];
		      $monto=$valor['monto'];
		  	  $fechaapagar=utf8_encode($valor['fechaapagar']);
		  	  $fechadelpago=utf8_encode($valor['fechadelpago']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_compraFk=utf8_encode($valor['cod_compraFk']);
		  	  $nrocheque=utf8_encode($valor['nrocheque']);
		  $insertadopor = utf8_encode($valor['insertadopor']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
		  	  $Totales=$Totales+$monto;
			  if($estado=="Pagado"){
				   $TotalPagado=$TotalPagado+$monto;
			  }else{
				   $TotalPendiente=$TotalPendiente+$monto;
			  }
			  $filas[]=array(
				  "cod_pago"=>$codpago,
				  "cod_compra"=>$cod_compraFk,
				  "nro_cheque"=>$nrocheque,
				  "monto"=>(float)$monto,
				  "monto_formateado"=>number_format($monto,'0',',','.'),
				  "tipo"=>$tipo,
				  "fecha_a_pagar"=>$fechaapagar,
				  "fecha_pago"=>$fechadelpago,
				  "estado"=>$estado,
				  "insertado_por"=>$insertadopor,
				  "editado_por"=>$editadopor,
				  "fecha_insert"=>$fecha_insert,
				  "fecha_edit"=>$fecha_edit
			  );
			  if($formato!='json'){
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatoshistorialpago(this)'>
<td  id='td_datos_1' style='display:none'>".$codpago."</td>
<td  id='td_datos_7' style='width:15%;'>".$nrocheque."</td>
<td  id='td_datos_2' style='width:15%;'>". number_format($monto,'0',',','.')."</td>
<td  id='td_datos_3' style='width:15%;'>".$tipo."</td>
<td  id='td_datos_4' style='width:15%;'>".$fechaapagar."</td>
<td  id='td_datos_5' style='width:15%;'>".$fechadelpago."</td>
<td  id='td_datos_6' style='width:15%;'>".$estado."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
</tr>
</table>";
			  }
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($Totales,'0',',','.'),"5"=>number_format($TotalPagado,'0',',','.'),"6"=>number_format($TotalPendiente,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarcuentasapagar($fecha1,$fecha2,$proveedor,$cod_local,$nrofactura,$filtrofecha,$nrocheque,$formato=''){
	
	$mysqli=conectar_al_servidor();
	 $condicionFecha="";
	 if($fecha1!="" && $fecha2!=""  ){
	 $condicionFecha=" and pg.fechaapagar>='$fecha1' and pg.fechaapagar<='$fecha1' ";
	 }
	 $condicionproveedor="";
	 if($proveedor=="2"){
	 $condicionproveedor=" and (Select nombre_persona from persona where cod_persona=cod_proveedorFK)  like '%".$proveedor."%'";
	 }
	 $condicionlocal="";
	 if($cod_local=="2"){
	 $condicionlocal=" and cp.cod_local='$cod_local'";
	 }
	 $condicionnrofactura="";
	 if($nrofactura=="2"){
	 $condicionnrofactura=" and cp.num_comprobante='$nrofactura'";
	 }
	 $condicionfiltrofecha="";
	 if($filtrofecha=="2"){
	 $condicionfiltrofecha=" and pg.fechaapagar='$filtrofecha'";
	 }
	 $condicionnrocheque="";
	 if($nrocheque=="2"){
	 $condicionnrocheque=" and pg.nrocheque like '%".$nrocheque."%'";
	 }
	
	 
	   	$sql= "Select pg.codpago,pg.monto,pg.fechaapagar,pg.fechadelpago,pg.tipo,pg.estado,pg.cod_compraFk,pg.nrocheque,
		cp.cod_compra,cp.fecha_compra,cp.cod_proveedorFK,cp.num_comprobante,cp.cod_local,cp.descuento,cp.pagado1,cp.pagado2,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor,
		(Select Nombre from local l where l.cod_local=cp.cod_local) as nombrelocal,
		IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0) as totalcompra,
	    IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pagado'),0) as totalpagado,
	    IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk and estado='Pendiente'),0) as totalPendiente,
	    IFNULL((select sum(monto) from pagosdecompra where cod_compra=cod_compraFk ),0) as totalpagos
		from compra cp inner join pagosdecompra pg on pg.cod_compraFk=cp.cod_compra
		where cp.estado='Activo' and pg.estado!='Pagado'  ".$condicionFecha.$condicionproveedor.$condicionlocal.$condicionnrofactura.$condicionfiltrofecha.$condicionnrocheque." order by pg.fechadelpago";
	    $pagina="";
		$filas=array();
		 
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $Totales=0;
 $TotalPagado=0;
 $TotalPendiente=0;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $codpago=$valor['codpago'];
		      $cod_compra=$valor['cod_compra'];
		      $monto=$valor['monto'];
		  	  $fechaapagar=utf8_encode($valor['fechaapagar']);
		  	  $fechadelpago=utf8_encode($valor['fechadelpago']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_compraFk=utf8_encode($valor['cod_compraFk']);
		  	  $fecha_compra=utf8_encode($valor['fecha_compra']);
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $descuento=utf8_encode($valor['descuento']);
		  	  $pagado1=utf8_encode($valor['pagado1']);
		  	  $pagado2=utf8_encode($valor['pagado2']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	  $totalcompra=utf8_encode($valor['totalcompra']);
		  	  $totalpagado=utf8_encode($valor['totalpagado']);
		  	  $totalPendiente=utf8_encode($valor['totalPendiente']);
		  	  $totalpagos=utf8_encode($valor['totalpagos']);
			  $subtotalcompra=utf8_encode($valor['totalcompra']);
			  $nrocheque=utf8_encode($valor['nrocheque']);
		  
		  	  $Totales=$Totales+$monto;
			  if($estado=="Pagado"){
				   $TotalPagado=$TotalPagado+$monto;
			  }else{
				   $TotalPendiente=$TotalPendiente+$monto;
			  }
			  
			   $filas[]=array(
				   "cod_pago"=>$codpago,
				   "cod_compra"=>$cod_compra,
				   "num_comprobante"=>$num_comprobante,
				   "proveedor"=>$proveedor,
				   "fecha_a_pagar"=>$fechaapagar,
				   "nro_cheque"=>$nrocheque,
				   "monto"=>(float)$monto,
				   "monto_formateado"=>number_format($monto,'0',',','.'),
				   "tipo"=>$tipo,
				   "fecha_compra"=>$fecha_compra,
				   "subtotal"=>(float)$subtotalcompra,
				   "subtotal_formateado"=>number_format($subtotalcompra,'0',',','.'),
				   "descuento"=>(float)$descuento,
				   "descuento_formateado"=>number_format($descuento,'0',',','.'),
				   "total"=>(float)$totalcompra,
				   "total_formateado"=>number_format($totalcompra,'0',',','.'),
				   "total_pagado"=>(float)$totalpagado,
				   "total_pagado_formateado"=>number_format($totalpagado,'0',',','.'),
				   "total_pendiente"=>(float)$totalPendiente,
				   "total_pendiente_formateado"=>number_format($totalPendiente,'0',',','.'),
				   "cod_proveedor"=>$cod_proveedorFK,
				   "cod_local"=>$cod_local,
				   "total_pagos"=>(float)$totalpagos,
				   "total_pagos_formateado"=>number_format($totalpagos,'0',',','.')
			   );

			   if($formato!='json'){
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosacompra(this)'>
<td  id='' style='display:none'>".$cod_compra."</td>
<td  id='' style='width:10%;'>".$num_comprobante."</td>
<td  id='' style='width:15%;'>".$proveedor."</td>
<td  id='' style='width:10%;'>".$fechaapagar."</td>
<td  id='' style='width:10%;'>".$nrocheque."</td>
<td  id='' style='width:10%;'>". number_format($monto,'0',',','.')."</td>
<td  id='' style='width:5%;'>".$tipo."</td>
<td  id='td_datos_1' style='display:none'>".$num_comprobante."</td>
<td  id='td_datos_2' style='display:none'>".$fecha_compra."</td>
<td  id='td_datos_3' style='display:none'>".$proveedor."</td>
<td  id='td_datos_7' style='display:none'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='td_datos_8' style='display:none'>". number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_4' style='display:none'>". number_format($totalcompra,'0',',','.')."</td>
<td  id='td_datos_9' style='display:none'>". number_format($totalpagado,'0',',','.')."</td>
<td  id='td_datos_10' style='display:none'>". number_format($totalPendiente,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".$cod_compra."</td>
<td  id='td_datos_6' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_11' style='display:none'>".$cod_local."</td>
<td  id='td_datos_12' style='display:none'>".number_format($totalpagos,'0',',','.')."</td>
</tr>
</table>";
			   }
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($Totales,'0',',','.'),"5"=>number_format($TotalPagado,'0',',','.'),"6"=>number_format($TotalPendiente,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarpagoscomprahistorial($buscar,$formato=''){
	
	$mysqli=conectar_al_servidor();
	 
	   	$sql= "Select pg.codpago,pg.monto,pg.fechaapagar,pg.fechadelpago,pg.tipo,pg.estado,pg.cod_compraFk,pg.fecha_insert,pg.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=pg.cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=pg.cod_user_edit )as editadopor
		from compra cp inner join pagosdecompra pg on pg.cod_compraFk=cp.cod_compra
		where cp.estado='Activo' and cp.cod_compra='$buscar' order by fechadelpago";
	    $pagina="";
		$filas=array();
		 
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $Totales=0;
 $TotalPagado=0;
 $TotalPendiente=0;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $codpago=$valor['codpago'];
		      $monto=$valor['monto'];
		  	  $fechaapagar=utf8_encode($valor['fechaapagar']);
		  	  $fechadelpago=utf8_encode($valor['fechadelpago']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_compraFk=utf8_encode($valor['cod_compraFk']);
		  	 $insertadopor = utf8_encode($valor['insertadopor']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
		  	  $Totales=$Totales+$monto;
			  if($estado=="Pagado"){
				   $TotalPagado=$TotalPagado+$monto;
			  }else{
				   $TotalPendiente=$TotalPendiente+$monto;
			  }
			  $filas[]=array(
				  "cod_pago"=>$codpago,
				  "cod_compra"=>$cod_compraFk,
				  "monto"=>(float)$monto,
				  "monto_formateado"=>number_format($monto,'0',',','.'),
				  "tipo"=>$tipo,
				  "fecha_a_pagar"=>$fechaapagar,
				  "fecha_pago"=>$fechadelpago,
				  "estado"=>$estado,
				  "insertado_por"=>$insertadopor,
				  "editado_por"=>$editadopor,
				  "fecha_insert"=>$fecha_insert,
				  "fecha_edit"=>$fecha_edit
			  );
			  if($formato!='json'){
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatospagohistorial(this)' >
<td  id='td_datos_1' style='display:none'>".$codpago."</td>
<td  id='td_datos_2' style='width:15%;'>". number_format($monto,'0',',','.')."</td>
<td  id='td_datos_3' style='width:15%;'>".$tipo."</td>
<td  id='td_datos_4' style='width:15%;'>".$fechaapagar."</td>
<td  id='td_datos_5' style='width:15%;'>".$fechadelpago."</td>
<td  id='td_datos_6' style='width:15%;'>".$estado."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
</tr>
</table>";
			  }
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($Totales,'0',',','.'),"5"=>number_format($TotalPagado,'0',',','.'),"6"=>number_format($TotalPendiente,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarnro(){
	
	$mysqli=conectar_al_servidor();
	 
	   	$sql= "Select count(cod_compra)
		from compra cp ";
	    $pagina="";
		  	
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nroOrden=$result->fetch_row();
  $nroOrden=$nroOrden[0];
  $nroOrden=$nroOrden+1;
 if($nroOrden<10){
	 $nroOrden="000".$nroOrden;
 }else{
 if($nroOrden<100){
	 $nroOrden="00".$nroOrden;
 }else{
	 if($nroOrden<1000){
	 $nroOrden="0".$nroOrden;
    } 
 }
 }
 mysqli_close($mysqli);  
$informacion =array("1" => "exito","2" => $nroOrden);
echo json_encode($informacion);	
exit;
}

function recorredetalles($buscar)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select dc.cod_detalle_compra,dc.cantidad_detalle_compra,dc.precio_producto,dc.subTotal,dc.cod_productoFK,pro.nombre_producto,dc.cod_compraFK,
		(select cod_local from compra where cod_compra=cod_compraFK) as cod_local
		from detalle_compra dc inner join producto pro on pro.cod_producto=dc.cod_productoFK
		where dc.cod_compraFK = ? ";
		
   
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro=$valor;
  $controlDescuento="";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_detalle_compra=$valor['cod_detalle_compra'];
		  	  $cantidad_detalle_compra=utf8_encode($valor['cantidad_detalle_compra']);
		  	  $precio_producto=utf8_encode($valor['precio_producto']);
		  	  $subTotal=utf8_encode($valor['subTotal']);
		  	  $cod_productoFK=utf8_encode($valor['cod_productoFK']);
		  	  $nombre_producto=utf8_encode($valor['nombre_producto']);
		  	  $cod_compraFK=utf8_encode($valor['cod_compraFK']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  // editar_cantidad($cod_productoFK,$cantidad_detalle_compra,"resta",$cod_local);
			 
			  SumarRestarStockA($cantidad_detalle_compra,$cod_productoFK,$cod_local,"RESTA","COMPRA ELIMINADA");
			  
	  }
 }
 
 



}


/* function editar_cantidad($idproductos,$cantidad,$t,$cod_localfk){

$user=$_POST['useru'];
    $user = utf8_decode($user);


       $mysqli=conectar_al_servidor();  
	    if($t=="resta"){
			$consulta="Update stocklocales set cantidad=(cantidad-$cantidad),user_update='$user'  where cod_productofk='".$idproductos."' and cod_localfk='".$cod_localfk."'";	
	}else{
		 $consulta="Update stocklocales set cantidad=(cantidad+$cantidad),user_update='$user'   where cod_productofk='".$idproductos."' and cod_localfk='".$cod_localfk."'";          		
	}
	$stmt = $mysqli->prepare($consulta);	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

    }
 */	
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


function nuevoPagoProveedor($control,$cod_PagoProveedor,$operacion)
{	
	

$mysqli=conectar_al_servidor(); 


$contador=1;
while ($contador<=$control)
{


$cod_compra=$_POST['cod_compra'.$contador];
$cod_compra = utf8_decode($cod_compra);

$MontoPagar=$_POST['MontoPagar'.$contador];
$MontoPagar = quitarseparadormiles($MontoPagar);

if($MontoPagar<=0){
	$MontoPagar=0;
}

$consulta1=" Insert into pagosdecompra ( monto, fechaapagar, fechadelpago, tipo, estado, cod_compraFk, nrocheque,cod_PagoFK) values 
('$MontoPagar',now(),now(),'Efectivo','Pagado',$cod_compra,'',$cod_PagoProveedor )";


$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

$contador++;
}


 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2"=>$cod_PagoProveedor);
echo json_encode($informacion);	
exit;	
}


function buscarCompraProveedor($fecha1,$fecha2,$proveedor,$control,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	$filas=array();
	

		 $condicionFecha="";
		 if($fecha1!="" && $fecha2!=""){
			 $condicionFecha=" and fecha_compra between '".$fecha1."' and '".$fecha2."' ";
		 }
		 
		
		 
		 $condicionproveedor="";
		 if($proveedor!=""){
			 $condicionproveedor=" and (Select nombre_persona from persona where cod_persona=cod_proveedorFK) like '%".$proveedor."%' ";
		 }
		 
			// $condicionpagos="  and (IFNULL((select dpc.cod_compraFK from detalle_pago_cheque dpc inner join cheque ch on idcheque = idchequeFK where cp.cod_compra=dpc.cod_compraFK and ch.estado='Activo' LIMIT 1),0)) = 0"; 
	 
		$sql= "Select cod_compra,fecha_compra,cod_proveedorFK, sum(descuento) as descuento,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor, 
		(Select nombre_persona from persona where cod_persona=cod_user_insert) as usuario, 
		sum(IFNULL((select sum(subTotal) from detalle_compra where cod_compraFK=cp.cod_compra ),0)) as totalcompra,
		 IFNULL((Select sum(monto) from nota_credito nc where  cod_proveedorFK = cp.cod_proveedorFK and nc.estado = 'Activo' ),0) as monto_nota_credito
		from compra cp  where  cp.estado='Activo' and cod_compra!='0'  ".$condicionFecha.$condicionproveedor." group by  cod_proveedorFK asc ";

		
		// echo $sql;
		// exit;

		     $pagina="";
		  	
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalCompas=0;
 $totalDesc=0;
 $TotalesPagago=0;
 $TotalesPendiente=0;
 
 $totalPendiente=0;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $subtotalcompra=utf8_encode($valor['totalcompra']);
		  	 $descuento=utf8_encode($valor['descuento']);
			  
				$usuario = utf8_encode($valor['usuario']); 
				$monto_nota_credito = utf8_encode($valor['monto_nota_credito']); 
$total_pagado = buscar_compras_pagados_proveedor($cod_proveedorFK);

// echo $total_pagado;
// exit;

 		$subtotalcompra = $subtotalcompra - $monto_nota_credito - $descuento - $total_pagado;
		
		if($control == ''){
			$totalCompas=$totalCompas+$subtotalcompra;
 $totalDesc=$descuento+$totalDesc;
 $TotalesPendiente=$TotalesPendiente+$subtotalcompra;
			$filas[]=array(
				"cod_compra" => $cod_compra,
				"proveedor" => $proveedor,
				"total_deuda" => floatval($subtotalcompra),
				"total_deuda_formateado" => number_format($subtotalcompra,'0',',','.'),
				"fecha_compra" => $fecha_compra,
				"usuario" => $usuario,
				"cod_proveedor" => $cod_proveedorFK,
				"fecha_desde" => $fecha1,
				"fecha_hasta" => $fecha2
			);

			  	   $styleName=CargarStyleTable($styleName);
			if($formato!='json'){
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmPagoProveedor(this)'>
<td  id='td_id' style='display:none'>".$cod_compra."</td>
<td  id='td_datos_1' style='width:50%'>".$proveedor."</td>
<td  id='td_datos_2' style='width:25%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='td_datos_4' style='display:none'>". $fecha_compra."</td>
<td  id='td_datos_5' style='width:25%'>". $usuario ."</td>
<td  id='td_datos_6' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_7' style='display:none'>".$fecha1."</td>
<td  id='td_datos_8' style='display:none'>".$fecha2."</td>
</tr>
</table>"; 
			}
		}
		
		 if($control == 1){
			 
			 if($subtotalcompra > 0){
			$totalCompas=$totalCompas+$subtotalcompra;
 $totalDesc=$descuento+$totalDesc;
 $TotalesPendiente=$TotalesPendiente+$subtotalcompra;
 // $TotalesPagago=$TotalesPagago+$totalpagado;
			$filas[]=array(
				"cod_compra" => $cod_compra,
				"proveedor" => $proveedor,
				"total_deuda" => floatval($subtotalcompra),
				"total_deuda_formateado" => number_format($subtotalcompra,'0',',','.'),
				"fecha_compra" => $fecha_compra,
				"usuario" => $usuario,
				"cod_proveedor" => $cod_proveedorFK,
				"fecha_desde" => $fecha1,
				"fecha_hasta" => $fecha2
			);

			  	   $styleName=CargarStyleTable($styleName);
			if($formato!='json'){
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmPagoProveedor(this)'>
<td  id='td_id' style='display:none'>".$cod_compra."</td>
<td  id='td_datos_1' style='width:30%'>".$proveedor."</td>
<td  id='td_datos_2' style='width:20%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='td_datos_4' style='display:none'>". $fecha_compra."</td>
<td  id='td_datos_5' style='width:25%'>". $usuario ."</td>
<td  id='td_datos_6' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_7' style='display:none'>".$fecha1."</td>
<td  id='td_datos_8' style='display:none'>".$fecha2."</td>
</tr>
</table>"; 
			}


}
		}
		

	  if($control == 2){
			 
			 if($subtotalcompra == 0){
			$totalCompas=$totalCompas+$subtotalcompra;
 $totalDesc=$descuento+$totalDesc;
 $TotalesPendiente=$TotalesPendiente+$subtotalcompra;
 // $TotalesPagago=$TotalesPagago+$totalpagado;
			$filas[]=array(
				"cod_compra" => $cod_compra,
				"proveedor" => $proveedor,
				"total_deuda" => floatval($subtotalcompra),
				"total_deuda_formateado" => number_format($subtotalcompra,'0',',','.'),
				"fecha_compra" => $fecha_compra,
				"usuario" => $usuario,
				"cod_proveedor" => $cod_proveedorFK,
				"fecha_desde" => $fecha1,
				"fecha_hasta" => $fecha2
			);

			  	   $styleName=CargarStyleTable($styleName);
			if($formato!='json'){
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmPagoProveedor(this)'>
<td  id='td_id' style='display:none'>".$cod_compra."</td>
<td  id='td_datos_1' style='width:30%'>".$proveedor."</td>
<td  id='td_datos_2' style='width:20%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='td_datos_4' style='display:none'>". $fecha_compra."</td>
<td  id='td_datos_5' style='width:25%'>". $usuario ."</td>
<td  id='td_datos_6' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_7' style='display:none'>".$fecha1."</td>
<td  id='td_datos_8' style='display:none'>".$fecha2."</td>
</tr>
</table>"; 
			}


}
		}



 

		
			  
			  
	  }
 }
 

 
 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($totalCompas,'0',',','.'),"5"=>number_format($totalDesc,'0',',','.'),"6"=>number_format($TotalesPendiente,'0',',','.'),"7"=>number_format($TotalesPagago,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarCompraProveedorDetalle($fecha1,$fecha2,$proveedor,$control,$cod_factura,$fecha_compra,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	$filas=array();
	

		 $condicionFecha="";
		 if($fecha1!="" && $fecha2!=""){
			 $condicionFecha=" and fecha_compra between '".$fecha1."' and '".$fecha2."' ";
		 }
		 
		 $condicionproveedor="";
		 if($proveedor!=""){
			 $condicionproveedor=" and  cod_proveedorFK = '".$proveedor."' ";
		 }
		 
		 $condicionfacturanro="";
		 if($cod_factura!=""){
			 $condicionfacturanro=" and  num_comprobante like '%".$cod_factura."%' ";
		 }
		 
		 $condicionFechafiltro="";
		 if($fecha_compra!="" ){
			 $condicionFechafiltro=" and fecha_compra = '".$fecha_compra."' ";
		 }
		 
		 
			// $condicionpagos=" and (IFNULL((select dpc.cod_compraFK from detalle_pago_cheque dpc inner join cheque ch on idcheque = idchequeFK where cp.cod_compra=dpc.cod_compraFK and ch.estado='Activo' LIMIT 1),0)) = 0"; 
	 
		$sql= "Select cod_compra,fecha_compra,cod_proveedorFK,num_comprobante,cod_local,pagado1,pagado2,descuento,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor, tipotr,
		(Select Nombre from local l where l.cod_local=cp.cod_local) as nombrelocal, 
		IFNULL((Select sum(subTotal) from detalle_compra where cod_compraFK = cod_compra),0) as total_compra,
				cp.fecha_insert,cp.fecha_edit,
				IFNULL((Select sum(monto) from nota_credito nc where cod_compraFK = cp.cod_compra and nc.estado = 'Activo'),0) as notacredito,
		(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
		(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
		from compra cp  where  cp.estado='Activo'  ".$condicionFecha.$condicionproveedor.$condicionfacturanro.$condicionFechafiltro." order by  fecha_compra asc ";
	  
	  // echo $sql;
	  // exit;

		     $pagina="";
		  	
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalCompas=0;
 $totalDesc=0;
 $TotalesPagago=0;
 $TotalesPendiente=0;
 $TotalesNotaCredito = 0;
 $styleName="tableRegistroSearch";
 
 $pagina2 ='';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $tipotr=$valor['tipotr'];
			   $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $subtotalcompra=utf8_encode($valor['total_compra']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
			  $insertadopor = utf8_encode($valor['insertadopor']); 
			  $editadopor = utf8_encode($valor['editadopor']); 
			  $fecha_insert = utf8_encode($valor['fecha_insert']); 
			  $fecha_edit = utf8_encode($valor['fecha_edit']); 
			  $descuento = utf8_encode($valor['descuento']); 
			  $notacredito = utf8_encode($valor['notacredito']); 
		  	  
$totalCompas=$totalCompas+$subtotalcompra;  
			$totalDesc=$descuento+$totalDesc;
  
$total_pagado = obtener_total_detalle_compra_pagado($cod_compra);

$TotalesNotaCredito+= $notacredito;

$total_faltante = $subtotalcompra - $total_pagado - $descuento - $notacredito;

if($control==1){
	

if($total_faltante > 0){
 
	$subtotalcompra = $subtotalcompra - $total_pagado - $descuento - $notacredito;
	
	$TotalesPendiente+= $total_faltante;
	$TotalesPagago+= $total_pagado;
	
$accion="<input id='check".$cod_compra."' value='".$cod_compra."'  name='".$total_faltante."' type='checkbox' onclick='verificarConfirmarPagoProveedor(this)' />"; 
 
$Monto="<input class=''  id='input".$cod_compra."' value='".number_format($total_faltante,'0',',','.')."' type='text'  style='width:135px;border:none;opacity: 0.5;' disabled>";

$ver=" <center><input type='button' value='VER' style='width:50px' class='btn4' onclick='verCerrarAbmPagoProveedorDetalleCompra(".$cod_compra.")' id='".$cod_compra."' />  </center>";
 
$cargarnota=" <center><input type='button' style='width:50px' value='CARGA' class='btn4' onclick='verCerrarAbmCargarNotaCredito(".$cod_compra.")' id='".$cod_compra."' />  </center>";

$filas[]=array(
	"cod_compra" => $cod_compra,
	"cod_proveedor" => $cod_proveedorFK,
	"proveedor" => $proveedor,
	"nro_factura" => $num_comprobante,
	"fecha_compra" => $fecha_compra,
	"tipo_compra" => $tipotr,
	"monto_pendiente" => floatval($total_faltante),
	"monto_pendiente_formateado" => number_format($total_faltante,'0',',','.'),
	"total_pendiente" => floatval($total_faltante),
	"total_pagado" => floatval($total_pagado),
	"total_pagado_formateado" => number_format($total_pagado,'0',',','.'),
	"detalle" => $cod_compra,
	"nota_credito" => $cod_compra,
	"seleccionable" => true
);
 
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='tbPagoProveedor' >
<td  id='td_datos_1' style='width:5%'>".$accion."</td>
<td  id='td_datos_2' style='width:15%'>".$Monto."</td>
<td  id='td_datos_2' style='width:10%'>".$tipotr."</td>
<td  id='td_datos_3'  style='width:20%'>". $proveedor."</td>
<td  id='td_datos_4' style='width:10%'>". $num_comprobante."</td>
<td  id='td_datos_5' style='width:10%'>". $fecha_compra."</td>
<td  id='td_datos_6' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='' style='width:10%'>". number_format($total_pagado,'0',',','.')."</td>
<td  id='td_datos_11' style='width:5%'>". $ver."</td>
<td  id='td_datos_11' style='width:5%'>". $cargarnota."</td>
<td  id='td_datos_9' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_10' style='display:none'>".$cod_compra."</td>
</tr>
</table>"; 

$pagina2.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='' >
<td  id='td_datos_2' style='width:15%'>".$Monto."</td>
<td  id='td_datos_2' style='width:10%'>".$tipotr."</td>
<td  id='td_datos_3'  style='width:20%'>". $proveedor."</td>
<td  id='td_datos_4' style='width:10%'>". $num_comprobante."</td>
<td  id='td_datos_5' style='width:10%'>". $fecha_compra."</td>
<td  id='td_datos_6' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
</tr>
</table>";
		
			
			  
	  }
	  }
	  
	if($control==2){
	

if($total_faltante == 0){
 
	$subtotalcompra = $subtotalcompra - $total_pagado - $descuento - $notacredito;
	
	$TotalesPendiente+= $total_faltante;
	$TotalesPagago+= $total_pagado;
	
$accion="<input id='check".$cod_compra."' value='".$cod_compra."'  name='".$total_faltante."' type='checkbox' onclick='verificarConfirmarPagoProveedor(this)' />"; 
 $accion ='';
$Monto="<input class=''  id='input".$cod_compra."' value='".number_format($total_faltante,'0',',','.')."' type='text'  style='width:135px;border:none;opacity: 0.5;' disabled>";

$ver=" <center><input type='button' value='VER' style='width:50px' class='btn4' onclick='verCerrarAbmPagoProveedorDetalleCompra(".$cod_compra.")' id='".$cod_compra."' />  </center>";
 
$cargarnota=" <center><input type='button' style='width:50px' value='CARGA' class='btn4' onclick='verCerrarAbmCargarNotaCredito(".$cod_compra.")' id='".$cod_compra."' />  </center>";

$filas[]=array(
	"cod_compra" => $cod_compra,
	"cod_proveedor" => $cod_proveedorFK,
	"proveedor" => $proveedor,
	"nro_factura" => $num_comprobante,
	"fecha_compra" => $fecha_compra,
	"tipo_compra" => $tipotr,
	"monto_pendiente" => floatval($total_faltante),
	"monto_pendiente_formateado" => number_format($total_faltante,'0',',','.'),
	"total_pendiente" => floatval($total_faltante),
	"total_pagado" => floatval($total_pagado),
	"total_pagado_formateado" => number_format($total_pagado,'0',',','.'),
	"detalle" => $cod_compra,
	"nota_credito" => $cod_compra,
	"seleccionable" => false
);
 
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='tbPagoProveedor' >
<td  id='td_datos_1' style='width:5%'>".$accion."</td>
<td  id='td_datos_2' style='width:15%'>".$Monto."</td>
<td  id='td_datos_2' style='width:10%'>".$tipotr."</td>
<td  id='td_datos_3'  style='width:20%'>". $proveedor."</td>
<td  id='td_datos_4' style='width:10%'>". $num_comprobante."</td>
<td  id='td_datos_5' style='width:10%'>". $fecha_compra."</td>
<td  id='td_datos_6' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='' style='width:10%'>". number_format($total_pagado,'0',',','.')."</td>
<td  id='td_datos_11' style='width:5%'>". $ver."</td>
<td  id='td_datos_11' style='width:5%'>". $cargarnota."</td>
<td  id='td_datos_9' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_10' style='display:none'>".$cod_compra."</td>
</tr>
</table>"; 

$pagina2.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='' >
<td  id='td_datos_2' style='width:15%'>".$Monto."</td>
<td  id='td_datos_2' style='width:10%'>".$tipotr."</td>
<td  id='td_datos_3'  style='width:20%'>". $proveedor."</td>
<td  id='td_datos_4' style='width:10%'>". $num_comprobante."</td>
<td  id='td_datos_5' style='width:10%'>". $fecha_compra."</td>
<td  id='td_datos_6' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
</tr>
</table>";
		
			
			  
	  }
	  }
  
	if($control==''){
	


 
	$subtotalcompra = $subtotalcompra - $total_pagado - $descuento - $notacredito;
	
	$TotalesPendiente+= $total_faltante;
	$TotalesPagago+= $total_pagado;
	
	$accion = '';
	if($total_faltante > 0){
		$accion="<input id='check".$cod_compra."' value='".$cod_compra."'  name='".$total_faltante."' type='checkbox' onclick='verificarConfirmarPagoProveedor(this)' />"; 
	}
	
$Monto="<input class=''  id='input".$cod_compra."' value='".number_format($total_faltante,'0',',','.')."' type='text'  style='width:135px;border:none;opacity: 0.5;' disabled>";

$ver=" <center><input type='button' value='VER' style='width:50px' class='btn4' onclick='verCerrarAbmPagoProveedorDetalleCompra(".$cod_compra.")' id='".$cod_compra."' />  </center>";
 
$cargarnota=" <center><input type='button' style='width:50px' value='CARGA' class='btn4' onclick='verCerrarAbmCargarNotaCredito(".$cod_compra.")' id='".$cod_compra."' />  </center>";

$filas[]=array(
	"cod_compra" => $cod_compra,
	"cod_proveedor" => $cod_proveedorFK,
	"proveedor" => $proveedor,
	"nro_factura" => $num_comprobante,
	"fecha_compra" => $fecha_compra,
	"tipo_compra" => $tipotr,
	"monto_pendiente" => floatval($total_faltante),
	"monto_pendiente_formateado" => number_format($total_faltante,'0',',','.'),
	"total_pendiente" => floatval($total_faltante),
	"total_pagado" => floatval($total_pagado),
	"total_pagado_formateado" => number_format($total_pagado,'0',',','.'),
	"detalle" => $cod_compra,
	"nota_credito" => $cod_compra,
	"seleccionable" => $total_faltante > 0
);
 
		  	   $styleName=CargarStyleTable($styleName);
			   $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='tbPagoProveedor' >
<td  id='td_datos_1' style='width:5%'>".$accion."</td>
<td  id='td_datos_2' style='width:15%'>".$Monto."</td>
<td  id='td_datos_2' style='width:10%'>".$tipotr."</td>
<td  id='td_datos_3'  style='width:20%'>". $proveedor."</td>
<td  id='td_datos_4' style='width:10%'>". $num_comprobante."</td>
<td  id='td_datos_5' style='width:10%'>". $fecha_compra."</td>
<td  id='td_datos_6' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
<td  id='' style='width:10%'>". number_format($total_pagado,'0',',','.')."</td>
<td  id='td_datos_11' style='width:5%'>". $ver."</td>
<td  id='td_datos_11' style='width:5%'>". $cargarnota."</td>
<td  id='td_datos_9' style='display:none'>".$cod_proveedorFK."</td>
<td  id='td_datos_10' style='display:none'>".$cod_compra."</td>
</tr>
</table>"; 

$pagina2.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' name='' >
<td  id='td_datos_2' style='width:15%'>".$Monto."</td>
<td  id='td_datos_2' style='width:10%'>".$tipotr."</td>
<td  id='td_datos_3'  style='width:20%'>". $proveedor."</td>
<td  id='td_datos_4' style='width:10%'>". $num_comprobante."</td>
<td  id='td_datos_5' style='width:10%'>". $fecha_compra."</td>
<td  id='td_datos_6' style='width:10%'>". number_format($subtotalcompra,'0',',','.')."</td>
</tr>
</table>";
		
			  
	  
	  }
 	  
	  
	  
	  }
 }
 
// echo $TotalesPendiente;
// exit;
 
 mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($totalCompas,'0',',','.'),"5"=>number_format($totalDesc,'0',',','.'),"6"=> $pagina2,"7"=>number_format($TotalesPendiente,'0',',','.'),"8"=>number_format($TotalesPagago,'0',',','.'),"9"=>number_format($TotalesNotaCredito,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscar_compras_con_cheque_faltante($formato='')
{
	
	$mysqli=conectar_al_servidor();
	$filas=array();
	 
		$sql= "SELECT idpago_total_compra,sum(dpc.monto) as monto,(Select nombre_persona from persona where cod_persona=(SELECT cod_proveedorFK FROM compra WHERE cod_compra = dpc.cod_compraFK limit 1)) as proveedor,
		(Select cod_persona from persona where cod_persona=(SELECT cod_proveedorFK FROM compra WHERE cod_compra = dpc.cod_compraFK limit 1)) as cod_proveedorFK FROM pago_total_compra ptc inner join detalle_pago_compra dpc on ptc.idpago_total_compra = dpc.id_pago_total_compra group by idpago_total_compra";


// echo $sql;
// exit;

	$pagina="";	  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
   $styleName="tableRegistroSearch";

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  


		  	  $proveedor=utf8_encode($valor['proveedor']);
			  $idpago_total_compra = utf8_encode($valor['idpago_total_compra']); 
			  $monto_total_pagar = utf8_encode($valor['monto']); 
			  $cod_proveedorFK = utf8_encode($valor['cod_proveedorFK']); 

				$monto_total_pagado_cheque = obtener_importe_total_cheque($idpago_total_compra); 
				$array_cod_compras = obtener_array_compras_cargar_cheque($idpago_total_compra);
				$array_cod_compras_json = json_encode($array_cod_compras);
				$diferencia = $monto_total_pagar - $monto_total_pagado_cheque;

				 
				if($diferencia > 0){
					$filas[]=array(
						"id_pago_total_compra" => $idpago_total_compra,
						"cod_proveedor" => $cod_proveedorFK,
						"proveedor" => $proveedor,
						"compras" => $array_cod_compras,
						"compras_json" => $array_cod_compras_json,
						"total_pagado" => floatval($monto_total_pagado_cheque),
						"total_pagado_formateado" => number_format($monto_total_pagado_cheque,'0',',','.'),
						"total_a_pagar" => floatval($monto_total_pagar),
						"total_a_pagar_formateado" => number_format($monto_total_pagar,'0',',','.'),
						"faltante" => floatval($diferencia),
						"faltante_formateado" => number_format($diferencia,'0',',','.')
					);
					$styleName=CargarStyleTable($styleName);
				$pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' onclick='obtenerdatosChequeFaltantes(this)'>
				<td  id='td_datos_8'  style='width:10%'>". number_format($diferencia,'0',',','.')."</td>
				<td  id='td_datos_7'  style='width:20%'>". $proveedor."</td>
				<td  id='td_datos_4' style='width:10%'>". number_format($monto_total_pagado_cheque,'0',',','.')."</td>
				<td  id='td_datos_9' style='width:10%'>". number_format($monto_total_pagar,'0',',','.')."</td>
				<td  id='td_datos_1' style='display:none'>".$cod_proveedorFK."</td>
				<td  id='td_datos_2' style='display:none'>".$array_cod_compras_json."</td>
				<td  id='td_datos_3' style='display:none'>".$idpago_total_compra."</td>
				</tr>
				</table>";   
				}
				 
				
 


 }
 }
 

 
mysqli_close($mysqli);   
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina);
echo json_encode($informacion);	
exit;
}

function buscar_compras_pagados_proveedor($cod_proveedorFK)
{
	
	$mysqli=conectar_al_servidor();
	
	
		$sql= "Select cod_compra
		from compra where  estado='Activo' and cod_compra!='0' and cod_proveedorFK = '".$cod_proveedorFK."'";
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $total_pagado=0;
 

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  
			  $cod_compra=$valor['cod_compra'];
				$total_pagado += obtener_total_detalle_compra_pagado($cod_compra);
			  
	  }
 }
 

 
 
mysqli_close($mysqli);   
return $total_pagado;
}


function buscarDetalle($buscar,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "Select dc.cod_detalle_compra,dc.cantidad_detalle_compra,dc.precio_producto,dc.subTotal,dc.cod_productoFK,
		pro.nombre_producto,pro.cod_producto,dc.cod_compraFK,
		(select descuento from compra where cod_compra=cod_compraFK) as descuento
		from detalle_compra dc inner join producto pro on pro.cod_producto=dc.cod_productoFK
		where dc.cod_compraFK = ? ";
		$total_compra=0;
		$totaldescuento=0;
		$nroRegistro=0;
   
   
   if ($stmt = $mysqli->prepare($sql)) 
  	$s='s';
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro=$valor;
  $controlDescuento="";
  $styleName="tableRegistroSearch";
  
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_producto=$valor['cod_producto'];
			  $cod_detalle_compra=$valor['cod_detalle_compra'];
		  	  $cantidad_detalle_compra=utf8_encode($valor['cantidad_detalle_compra']);
		  	  $precio_producto=utf8_encode($valor['precio_producto']);
		  	  $subTotal=utf8_encode($valor['subTotal']);
		  	  $cod_productoFK=utf8_encode($valor['cod_productoFK']);
		  	  $nombre_producto=utf8_encode($valor['nombre_producto']);
		  	  $cod_compraFK=utf8_encode($valor['cod_compraFK']);
		  	  $descuento=utf8_encode($valor['descuento']);
		  	 if($controlDescuento!=$cod_compraFK){
				  
				  $controlDescuento=$cod_compraFK;
				   $totaldescuento=$totaldescuento+$descuento;
			  }
		  	 
		  	 $total_compra=$subTotal+$total_compra;
			    	   $totaldetalle=$subTotal;
			  $filas[]=array(
				"cod_detalle_compra" => $cod_detalle_compra,
				"cod_compra" => $cod_compraFK,
				"cod_producto" => $cod_producto,
				"cod_producto_fk" => $cod_productoFK,
				"producto" => $nombre_producto,
				"cantidad" => floatval($cantidad_detalle_compra),
				"cantidad_formateada" => number_format($cantidad_detalle_compra,'2',',','.'),
				"precio" => floatval($precio_producto),
				"precio_formateado" => number_format($precio_producto,'0',',','.'),
				"subtotal" => floatval($subTotal),
				"subtotal_formateado" => number_format($subTotal,'0',',','.')
			  );
			   $styleName=CargarStyleTable($styleName); 	 
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmdetallecompra(this)'>
<td  id='td_datos_1' style='width:10%'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:50%'>".$nombre_producto."</td>
<td  id='td_datos_3'  style='width:5%'>".number_format($cantidad_detalle_compra,'2',',','.')."</td>
<td  id='td_datos_2'  style='width:10%'>".number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_4' style='width:15%'>".number_format($subTotal,'0',',','.')."</td>
<td  id='td_id_1' style='display:none'>".$cod_productoFK."</td>
<td  id='td_id_2' style='display:none'>".$cod_detalle_compra."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
 $subtotalcompra=$total_compra;
 $total_compra=$total_compra-$totaldescuento;
 if($total_compra<0){
	$total_compra=0; 
 }
 
  $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($total_compra,'0',',','.'),"4" => number_format($nroRegistro,'0',',','.'),"5" => number_format($subtotalcompra,'0',',','.'),"6" => number_format($totaldescuento,'0',',','.'));
echo json_encode($informacion);	
exit;

}
	

function buscarListaPagos($codProveedorPago,$array_cod_compras,$id_carga_pago_total_a_compra,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "SELECT IFNULL(ch.importe,0) as importe, dpc.cod_proveedorFK,ch.fechaingresado,idchequeFK,
		(SELECT nombre_persona from persona where cod_persona = dpc.cod_proveedorFK) as proveedor,
		(SELECT nombre_persona from persona where cod_persona = ch.ingresadopor_cod_user) as usuario
		from cheque ch inner join detalle_pago_cheque dpc on ch.idcheque = dpc.idchequeFK 
        inner join pago_total_compra ptc on ptc.idpago_total_compra = dpc.idpago_total_compraFK
        where idpago_total_compraFK = '$id_carga_pago_total_a_compra' and ch.estado = 'Activo' group by dpc.idchequeFK";
		


   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro=$valor;
  $total_pagado=0;
  $styleName="tableRegistroSearch";
    $total_pagado_en_cheque=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $fechaingresado=$valor['fechaingresado'];
			  $importe=$valor['importe'];
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $usuario=utf8_encode($valor['usuario']);
		  	  $idcheque=utf8_encode($valor['idchequeFK']);
			  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
			  
			  $total_pagado = $total_pagado + $importe ;  
			  
			  $total_pagado_en_cheque = $total_pagado_en_cheque + $importe ;  

			  $filas[]=array(
				"id_cheque" => $idcheque,
				"cod_proveedor" => $cod_proveedorFK,
				"fecha_pago" => $fechaingresado,
				"proveedor" => $proveedor,
				"importe" => floatval($importe),
				"importe_formateado" => number_format($importe,'0',',','.'),
				"usuario" => $usuario
			  );
			  
			   $styleName=CargarStyleTable($styleName); 	 
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmlistadoPago(this)' >
<td  id='' style='width:10%'>".$fechaingresado."</td>
<td  id='td_datos_1' style='width:50%'>".$proveedor."</td>
<td  id='' style='width:10%'>".number_format($importe,'0',',','.')."</td>
<td  id='' style='width:30%'>".$usuario."</td>
<td  id='td_datos_2' style='display:none'>".$idcheque."</td>
</tr>
</table>";
			  
	  }
 }
 
$total_compra_pagado = obtener_pago_total_compra($id_carga_pago_total_a_compra);

 
$faltante = $total_compra_pagado - $total_pagado_en_cheque;

  $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($total_pagado_en_cheque,'0',',','.'),"4" => number_format($total_compra_pagado,'0',',','.'),"5" => number_format($faltante,'0',',','.'));
echo json_encode($informacion);	
exit;
}


function buscarHistorialPagos($codProveedorPago,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "SELECT IFNULL(ch.importe,0) as importe, dpc.cod_proveedorFK,ch.fechaingresado,idchequeFK,
		(SELECT nombre_persona from persona where cod_persona = dpc.cod_proveedorFK) as proveedor,
		(SELECT nombre_persona from persona where cod_persona = ch.ingresadopor_cod_user) as usuario,idpago_total_compraFK
		from cheque ch inner join detalle_pago_cheque dpc
on ch.idcheque = dpc.idchequeFK where dpc.cod_proveedorFK = '$codProveedorPago' and ch.estado = 'Activo' group by dpc.idchequeFK";
		


   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $total_pagado=0;
  $styleName="tableRegistroSearch";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $fechaingresado=$valor['fechaingresado'];
			  $importe=$valor['importe'];
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $usuario=utf8_encode($valor['usuario']);
		  	  $idcheque=utf8_encode($valor['idchequeFK']);
		  	  $idpago_total_compraFK=utf8_encode($valor['idpago_total_compraFK']);
			  
			  $total_pagado = $total_pagado + $importe ;  

			  $filas[]=array(
				"id_cheque" => $idcheque,
				"id_pago_total_compra" => $idpago_total_compraFK,
				"fecha_pago" => $fechaingresado,
				"proveedor" => $proveedor,
				"importe" => floatval($importe),
				"importe_formateado" => number_format($importe,'0',',','.'),
				"usuario" => $usuario
			  );
			  
			   $styleName=CargarStyleTable($styleName); 	 
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosHistorialPagoProveedor(this)' >
<td  id='td_datos_2' style='width:10%'>".$idcheque."</td>
<td  id='' style='width:10%'>".$fechaingresado."</td>
<td  id='td_datos_1' style='width:50%'>".$proveedor."</td>
<td  id='' style='width:10%'>".number_format($importe,'0',',','.')."</td>
<td  id='' style='width:20%'>".$usuario."</td>
<td  id='td_datos_3' style='display:none'>".$idpago_total_compraFK."</td>


</tr>
</table>";
			  
			  
	  }
 }
 

 
  $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($total_pagado,'0',',','.'));
echo json_encode($informacion);	
exit;

}

function EliminarListadoPagoCargando($cod_chequeListadoPago)
{	
	

$mysqli=conectar_al_servidor(); 



$consulta1="update cheque set estado = 'Inactivo' where idcheque = '".$cod_chequeListadoPago."'";
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

$consulta1="update detalle_pago_cheque set estado = 'Inactivo' where idchequeFK = '$cod_chequeListadoPago';";
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


mysqli_close($mysqli); 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}
function EliminarListadoPago($cod_chequeListadoPago,$idpago_total_compraFK)
{	
	

$mysqli=conectar_al_servidor(); 



$consulta1="update cheque set estado = 'Inactivo' where idcheque = '".$cod_chequeListadoPago."'";
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

$consulta1="update detalle_pago_cheque set estado = 'Inactivo' where idchequeFK = '$cod_chequeListadoPago';";
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

cancelar_detalles_pago_compra($cod_chequeListadoPago,$idpago_total_compraFK);

mysqli_close($mysqli); 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}

function ABMnuevoPagoProveedor($idPagoProveedor,$monto,$useru,$operacion)
{	
	

$mysqli=conectar_al_servidor(); 

/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);

if($operacion=="nuevoPagoProveedor")
{
$consulta1=" Insert into pagosproveedor (fecha, monto, estado, cod_usuarioFK, cod_proveedorFK) values (now(),'$monto','Activo','$useru',$idPagoProveedor )";

// echo($consulta1);
// exit;
$stmt1 = $mysqli->prepare($consulta1);
}



if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

	$sql= "Select * from pagosproveedor where estado='Activo' order by idpagosProveedor desc  limit 1";
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 $idpagosProveedor=0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $idpagosProveedor=$valor['idpagosProveedor'];
	  }
 }
 
 
return $idpagosProveedor ;
	
}
function cancelar_detalles_pago_compra($idchequeFK,$idpago_total_compraFK)
{
	
	$mysqli=conectar_al_servidor();

		$sql= "SELECT cod_compraFK FROM detalle_pago_cheque WHERE idchequeFK = '$idchequeFK' and idpago_total_compraFK = '$idpago_total_compraFK'";
		


   $stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  
  $importe_cheque = obtener_importe_cheque($idchequeFK);

  
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  if($importe_cheque > 0){
			  $cod_compraFK=utf8_encode($valor['cod_compraFK']);
			 $total_pagado = obtener_total_compra_pagado_2($cod_compraFK,$idpago_total_compraFK);
			 
			
			 
			 $total_pagado_importe = $total_pagado;
			 //Actualizar el total pagado para la compra
			 if($total_pagado <= $importe_cheque){
				 $total_pagado = 0;
			 }else{
				  $total_pagado = $total_pagado - $importe_cheque;
			 }
			
			 
			 //Restar lo que se uso del importe
			 $importe_cheque = $importe_cheque - $total_pagado_importe;

			 
			/*  echo $total_pagado;
			echo "\n";
			echo $importe_cheque;
			exit; */
			
			 $estado ='';
			  if($total_pagado <= 0){
				 $total_pagado = 0;
				 $estado = ", estado = 'Inactivo'";
			 }
			 

			 
			$sql= "UPDATE detalle_pago_compra SET monto = '$total_pagado'".$estado." WHERE cod_compraFK = '$cod_compraFK' and id_pago_total_compra = '$idpago_total_compraFK'";
		
			$stmt = $mysqli->prepare($sql);
  
			if ( ! $stmt->execute()) {
			   echo "Error";
			   exit;
			}
			
		 }
			  
			
	  }
 }

return true;
}

function buscarNotaCredito($cod_proveedorFK,$cod_compraFK,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "SELECT idnota_credito,fecha,estado,cod_usuario_insert,monto,cod_proveedorFK,cod_compraFK,nronotacredito from nota_credito where cod_proveedorFK = '$cod_proveedorFK' and cod_compraFK='$cod_compraFK' and estado ='Activo'";
		


   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro=$valor;
  $total_pagado=0;
  $styleName="tableRegistroSearch";
  
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $idnota_credito=utf8_encode($valor['idnota_credito']);
			  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_usuario_insert=utf8_encode($valor['cod_usuario_insert']);
		  	  $monto=utf8_encode($valor['monto']);
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $cod_compraFK=utf8_encode($valor['cod_compraFK']);
		  	  $nronotacredito=utf8_encode($valor['nronotacredito']);

			  $filas[]=array(
				"id_nota_credito" => $idnota_credito,
				"fecha" => $fecha,
				"nro_nota_credito" => $nronotacredito,
				"monto" => floatval($monto),
				"monto_formateado" => number_format($monto,'0',',','.'),
				"estado" => $estado,
				"cod_usuario" => $cod_usuario_insert,
				"cod_proveedor" => $cod_proveedorFK,
				"cod_compra" => $cod_compraFK
			  );
			  
			   $styleName=CargarStyleTable($styleName); 	 
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosCargarNotaCredito(this)' >
<td  id='td_datos_1' style='width:33%'>".$fecha."</td>
<td  id='td_datos_2' style='width:33%'>".$nronotacredito."</td>
<td  id='td_datos_3' style='width:33%'>".number_format($monto,'0',',','.')."</td>
<td  id='td_datos_4' style='display:none'>".$idnota_credito."</td>

</tr>
</table>";
			  
			  
	  }
 }
 

 
  $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($total_pagado,'0',',','.'),"4" => $nroRegistro);
echo json_encode($informacion);	
exit;

}
function abmnotacredito($idabm, $cod_compraFK,$cod_proveedorFK,$nronotacredito,$fecha,$monto,$cod_usuario,$estado,$operacion)
{
	

if($cod_proveedorFK=="" || $cod_compraFK == "" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

if($operacion=="nuevonotacredito") 
{


$consulta1="Insert into nota_credito (fecha,cod_usuario_insert,monto,cod_proveedorFK,cod_compraFK,nronotacredito)
values(?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$fecha,$cod_usuario,$monto,$cod_proveedorFK,$cod_compraFK,$nronotacredito);


}


if($operacion=="editarnotacredito")
{

$consulta1="Update nota_credito set fecha=?,monto=?,cod_proveedorFK =?,cod_compraFK=?,nronotacredito=?, estado=? where idnota_credito=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssss';
$stmt1->bind_param($ss,$fecha,$monto,$cod_proveedorFK,$cod_compraFK,$nronotacredito,$estado,$idabm); 

}




if (!$stmt1->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function cargar_archivo_compra($cod_compra){
	
	
			  $nombreArchivo = generarCodigoAleatorio(7) . $cod_compra;
$ruta="/archivospdf";
$nombrePost = 'pdf';
$respuesta = mover_archivo_carpeta($ruta,$nombreArchivo,$nombrePost,'pdf');

$ruta="/GoodVentaElectroCasaMaric/archivospdf/".$nombreArchivo.".pdf";

if($respuesta){
	$mysqli=conectar_al_servidor();
	$consulta="UPDATE compra SET url = '$ruta' WHERE cod_compra  = '$cod_compra'";	
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

/* function obtener_total_compra_pagado_cheque($cod_compraFK)
{
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "SELECT IFNULL(sum((SELECT importe FROM cheque WHERE idcheque = idchequeFK and estado ='Activo')),0) as total_pagado FROM detalle_pago_cheque where cod_compraFK = '$cod_compraFK'";
		
// echo $sql;
// exit;

   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $total_pagado = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $total_pagado=utf8_encode($valor['total_pagado']);
	  }
 }
 

 mysqli_close($mysqli);
 
return $total_pagado;
}
 */
 function obtener_total_detalle_compra_pagado($cod_compraFK)
{
	$mysqli=conectar_al_servidor();
	// $pagina='';
	$sql = "SELECT IFNULL(sum(monto),0) as monto FROM detalle_pago_compra WHERE cod_compraFK = '$cod_compraFK' and estado = 'Activo' group by cod_compraFK;";
		
		
   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
  $total_monto = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $total_monto += utf8_encode($valor['monto']);
	  }
 }
 


 mysqli_close($mysqli);
return $total_monto;
}

function obtener_total_compra($cod_compraFK){
	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "SELECT (IFNULL((Select sum(subTotal) from detalle_compra dp where dp.cod_compraFK = cp.cod_compra),0) 
        - 
        IFNULL((Select sum(monto) from nota_credito nc where nc.cod_compraFK = cp.cod_compra and estado = 'Activo'),0) - descuento) as total FROM compra cp where cp.cod_compra= '$cod_compraFK'";

// echo $sql;
// exit;

   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $total_compra = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $total_compra = utf8_encode($valor['total']);
	  }
 }
 

 mysqli_close($mysqli);
return $total_compra;
}

function obtener_pago_total_compra($idpago_total_compra){
	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "SELECT monto FROM pago_total_compra WHERE idpago_total_compra = '$idpago_total_compra'";



   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $total_pago = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $total_pago=utf8_encode($valor['monto']);
	  }
 }
 

 mysqli_close($mysqli);
return $total_pago;
}

function cargar_total_pago_compra($monto,$array_cod_compras)
{
	$mysqli=conectar_al_servidor();
	
	/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);

$sql= "INSERT INTO pago_total_compra(fecha,monto,user_insert) values ('$fecha_inser_edit','$monto','$user')";

$stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
} 
 

$id_pago_total_compra = mysqli_insert_id($mysqli);



//Obtener el total a pagar
$total_compra_a_pagar = 0;
foreach ($array_cod_compras as $cod_compraFK) {
	$total_compra_a_pagar += obtener_total_compra($cod_compraFK);
}

foreach ($array_cod_compras as $cod_compraFK) {
	$total_compra = obtener_total_compra($cod_compraFK);
	$total_pagado = obtener_total_compra_pagado($cod_compraFK);
	$total_compra = $total_compra - $total_pagado;
	
	if($monto > $total_compra){
		insertar_detalle_pago_compra($id_pago_total_compra,$total_compra,$cod_compraFK);
		$monto -= $total_compra;
	}else{
		insertar_detalle_pago_compra($id_pago_total_compra,$monto,$cod_compraFK);
	}
}
	






 
$informacion =array("1" => "exito","2"=>$id_pago_total_compra);
echo json_encode($informacion);	
exit;
}

function insertar_detalle_pago_compra($id_pago_total_compra,$monto,$cod_compraFK)
{
	
	$mysqli=conectar_al_servidor();

$sql= "INSERT INTO detalle_pago_compra(id_pago_total_compra,cod_compraFK,monto,estado) values ('$id_pago_total_compra','$cod_compraFK','$monto','Activo')";

$stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


return true;
}

function obtener_importe_total_cheque($idpago_total_compra){
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "SELECT (SELECT IFNULL(importe,0) FROM cheque where idcheque = idchequeFK and estado ='Activo') as monto_cheque FROM detalle_pago_cheque WHERE idpago_total_compraFK = '$idpago_total_compra' group by idchequeFK";


   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $total_monto_cheque = 0;
  
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $monto_cheque=utf8_encode($valor['monto_cheque']);
			  $total_monto_cheque+= $monto_cheque;
	  }
 }


 
mysqli_close($mysqli);
return $total_monto_cheque;
}
function obtener_array_compras_cargar_cheque($idpago_total_compra){
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "SELECT cod_compraFK FROM detalle_pago_compra WHERE id_pago_total_compra = '$idpago_total_compra' and estado = 'Activo'";


   if ($stmt = $mysqli->prepare($sql))
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
$array_cod_compras = array();
  
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $cod_compraFK=utf8_encode($valor['cod_compraFK']);
			  array_push($array_cod_compras,$cod_compraFK);
	  }
 }


 
mysqli_close($mysqli);
return $array_cod_compras;
}

function obtener_total_pagado_proveedor_pagos_a_proveedor($cod_proveedorFK)
{
	
	$mysqli=conectar_al_servidor();
	


			 $condicionproveedor=" and  cod_proveedorFK = '".$cod_proveedorFK."' ";

	 
		$sql= "Select cod_compra,fecha_compra,cod_proveedorFK,num_comprobante,cod_local,pagado1,pagado2,descuento,
		(Select nombre_persona from persona where cod_persona=cod_proveedorFK) as proveedor, tipotr,
		(Select Nombre from local l where l.cod_local=cp.cod_local) as nombrelocal, 
		(IFNULL((Select sum(subTotal) from detalle_compra where cod_compraFK = cod_compra),0) 
        - 
        IFNULL((Select sum(monto) from nota_credito where cp.cod_compra = cod_compraFK and cp.cod_proveedorFK = cod_proveedorFK and estado = 'Activo'),0)) as total_compra,
				cp.fecha_insert,cp.fecha_edit,
		(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
		(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
		from compra cp  where  cp.estado='Activo'  ".$condicionproveedor." order by  fecha_compra asc ";
	  

		  	
		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 $TotalesPendiente=0;

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $tipotr=$valor['tipotr'];
			   $cod_compra=$valor['cod_compra'];
		      $fecha_compra=$valor['fecha_compra'];
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	  $subtotalcompra=utf8_encode($valor['total_compra']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
			  $insertadopor = utf8_encode($valor['insertadopor']); 
			  $editadopor = utf8_encode($valor['editadopor']); 
			  $fecha_insert = utf8_encode($valor['fecha_insert']); 
			  $fecha_edit = utf8_encode($valor['fecha_edit']); 
			  $descuento = utf8_encode($valor['descuento']); 
		  	  

  
$total_pagado = obtener_total_detalle_compra_pagado($cod_compra);
$total_faltante = $subtotalcompra - $total_pagado - $descuento;


 if($total_pagado < $subtotalcompra){
 $TotalesPendiente += $total_faltante;	  
	  }
	  
	  }
 }
 

 
 mysqli_close($mysqli);   
return $TotalesPendiente;
}

function obtener_total_compra_pagado($cod_compraFK){
	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "SELECT IFNULL(sum(monto),0) as monto FROM detalle_pago_compra WHERE cod_compraFK = '$cod_compraFK' and estado = 'Activo' group by cod_compraFK;";

// echo $sql;
// exit;

   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $monto = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $monto = utf8_encode($valor['monto']);
	  }
 }
 

 mysqli_close($mysqli);
return $monto;
}
function obtener_total_compra_pagado_2($cod_compraFK,$idpago_total_compraFK){
	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "SELECT monto FROM detalle_pago_compra WHERE cod_compraFK = '$cod_compraFK' and estado = 'Activo' and id_pago_total_compra = '$idpago_total_compraFK' and monto > 0";

// echo $sql;
// exit;

   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $monto = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $monto = utf8_encode($valor['monto']);
	  }
 }
 

 mysqli_close($mysqli);
return $monto;
}

function cargar_total_pago_compra_temporal($monto,$array_cod_compras)
{
	$mysqli=conectar_al_servidor();
	
	/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);

$sql= "INSERT INTO pago_total_compra(fecha,monto,user_insert) values ('$fecha_inser_edit','$monto','$user')";

$stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
} 
 

$id_pago_total_compra = mysqli_insert_id($mysqli);


//Obtener el total a pagar
$total_compra_a_pagar = 0;
foreach ($array_cod_compras as $cod_compraFK) {
	$total_compra_a_pagar += obtener_total_compra($cod_compraFK);
	actualizar_id_pago_total_detalle_pago($cod_compraFK,$id_pago_total_compra);
}

foreach ($array_cod_compras as $cod_compraFK) {
	$total_compra = obtener_total_compra($cod_compraFK);
	$total_pagado = obtener_total_compra_pagado($cod_compraFK);
	$total_compra = $total_compra - $total_pagado;
	
	if($monto > $total_compra){
		insertar_detalle_pago_compra($id_pago_total_compra,$total_compra,$cod_compraFK);
		$monto -= $total_compra;
	}else{
		insertar_detalle_pago_compra($id_pago_total_compra,$monto,$cod_compraFK);
	}
	
	
}

 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}




function actualizar_id_pago_total_detalle_pago($cod_compraFK,$idpago_total_compraFK){
	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "UPDATE detalle_pago_cheque SET idpago_total_compraFK = '$idpago_total_compraFK' where cod_compraFK = '$cod_compraFK'";
		
		// echo $sql;
		// exit;

   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 

 mysqli_close($mysqli);
 return true;
}

function obtener_importe_cheque($idcheque){
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql = "SELECT IFNULL(importe,0) as importe FROM cheque WHERE idcheque = '$idcheque'";


// echo $sql;
// exit;

   if ($stmt = $mysqli->prepare($sql)) 
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
  $importe = 0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			  $importe=utf8_encode($valor['importe']);
			  
	  }
 }

 
 mysqli_close($mysqli);
return $importe;
}



function buscar_informe_compras_general($anho,$local, $cod_proveedor,$formato="")
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	$filas = array();
	$devolverArray = strtolower($formato)==="json";
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$totalesMes = array();
		if(!$devolverArray){
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		}
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_compra_dia($anho,$i,$x,$local, $cod_proveedor);
			$totalesMes[] = number_format($total, '0', ',', '.');
			if(!$devolverArray){
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
			}
		}
		
		$filas[] = array("dia" => $x, "meses" => $totalesMes, "clase_fila" => $styleName);
		if(!$devolverArray){
		$pagina.="</tr>
		</table>";
		}
	}

	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}

function obtener_total_compra_dia($anho,$mes,$dia,$local, $cod_proveedor)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and fecha_compra = '$fecha' ";
	
	 $condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and cod_local ='" . $local . "'";
	}
	
	$condicionproveedor = "";
	if ($cod_proveedor != "") {
		$condicionproveedor = " and cod_proveedorFK ='" . $cod_proveedor . "'";
	}
 
	$sql = "Select sum(ifnull(descuento,0)) as descuento,sum(IFNULL((select sum(subTotal) from detalle_compra where cod_compra=cod_compraFK),0)) as totalcompra from compra cp where cp.estado = 'Activo' ".$condicionFecha.$condicionlocal.$condicionproveedor;
 
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
	$total = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$totalcompra = $valor['totalcompra'];
			$descuento = $valor['descuento'];
			$total = $totalcompra - $descuento;
		}
	}
	
	return $total;
}

function buscar_informe_compras_general_grafica($anho,$pagado,$tipoDeuda)
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

			$total = obtener_total_compra_dia($anho,$i,$x,$pagado,$tipoDeuda);
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

			$total = obtener_total_compra_dia($anho2,$i,$x,$pagado,$tipoDeuda);
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



verificar($operacion);
?>
