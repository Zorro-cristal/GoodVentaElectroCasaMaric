<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("BuscarNroFactura.php");
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


	
if($operacion=="nuevo" || $operacion=="editar")
{
	 
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);

$num_factura=$_POST['num_factura'];
$num_factura = utf8_decode($num_factura);

if($cod_ventaFK==""){
$fecha_venta=$_POST['fecha_venta'];
$fecha_venta = utf8_decode($fecha_venta);
$cod_usuarioFK=$user;
$cod_usuarioFK = utf8_decode($cod_usuarioFK);
$cod_clienteFK=$_POST['cod_clienteFK'];
$cod_clienteFK = utf8_decode($cod_clienteFK);
$cod_cobradorFK=$_POST['cod_cobradorFK'];
$cod_cobradorFK = utf8_decode($cod_cobradorFK);
$TipoVenta=$_POST['TipoVenta'];
$TipoVenta = utf8_decode($TipoVenta);
$TipoPago=$_POST['TipoPago'];
$TipoPago = utf8_decode($TipoPago);
$vendedor1=$_POST['vendedor1'];
$vendedor1 = utf8_decode($vendedor1);
$vendedor2=$_POST['vendedor2'];
$vendedor2 = utf8_decode($vendedor2);
$comisioncobrador=$_POST['comisioncobrador'];
$comisioncobrador = utf8_decode($comisioncobrador);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$idGaranteFk=$_POST['idGaranteFk'];
$idGaranteFk = utf8_decode($idGaranteFk);
$tipo_comprobante=$_POST['tipo_comprobante'];
$tipo_comprobante = utf8_decode($tipo_comprobante);
$puntoexpedicion=$_POST['puntoexpedicion'];
$puntoexpedicion = utf8_decode($puntoexpedicion);

$codSolicitudCreditoFK=$_POST['codSolicitudCreditoFK'];
$codSolicitudCreditoFK = utf8_decode($codSolicitudCreditoFK);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$datosventa=iniciarVenta($codSolicitudCreditoFK,$puntoexpedicion,$tipo_comprobante,$fecha_venta,$cod_usuarioFK,$cod_clienteFK,$num_factura,$cod_cobradorFK,$TipoVenta,$TipoPago,$vendedor1,$vendedor2,$comisioncobrador,$cod_local,$idGaranteFk);
$cod_ventaFK=$datosventa[0];
$num_factura=$datosventa[1];
}
abm($fecha_venta,$tipo,$cod_ventaFK,$num_factura,$operacion);

}

if($operacion=="cambio" )
{
	
	
$cod_detalle=$_POST['cod_detalle'];
$cod_detalle = utf8_decode($cod_detalle);
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
$cantidaCambio=$_POST['cantidaCambio'];
$cantidaCambio = quitarseparadormiles($cantidaCambio);
$CodProductocompraCambio=$_POST['CodProductocompraCambio'];
$CodProductocompraCambio = utf8_decode($CodProductocompraCambio);
$MetodoPagoCambio=$_POST['MetodoPagoCambio'];
$MetodoPagoCambio = utf8_decode($MetodoPagoCambio);
$Local_FK=$_POST['Local_FK'];
$Local_FK = utf8_decode($Local_FK);
cambiar($cod_detalle,$cod_ventaFK,$cantidaCambio,$CodProductocompraCambio,$MetodoPagoCambio,$user,$Local_FK);

}

if($operacion=="quitarDevolucion" )
{
	
	
	$cod_detalle=$_POST['cod_detalle'];
$cod_detalle = utf8_decode($cod_detalle);

	$cod_productoFK=$_POST['cod_productoFK'];
$cod_productoFK = utf8_decode($cod_productoFK);

$cantidaCambio=$_POST['cantidaCambio'];
$cantidaCambio = quitarseparadormiles($cantidaCambio);
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);

$Local_FK=$_POST['Local_FK'];
$Local_FK = utf8_decode($Local_FK);

quitarDevolucion($cod_detalle,$cod_productoFK,$cod_ventaFK,$motivo,$cantidaCambio,$Local_FK);

}

 if($operacion=="buscar_meta_vendedor")
{
	
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$condicion=$_POST['condicion'];
$condicion = utf8_decode($condicion);

$cod_vendedor=$_POST['cod_vendedor'];
$cod_vendedor = utf8_decode($cod_vendedor);


 buscar_meta_vendedor($fecha1, $fecha2,$condicion,$cod_vendedor);
}

if($operacion=="NuevoGarantia" )
{
	
	
	$cod_detalle=$_POST['cod_detalle'];
$cod_detalle = utf8_decode($cod_detalle);
	$cod_productoFK=$_POST['cod_productoFK'];
$cod_productoFK = utf8_decode($cod_productoFK);
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
$observacion=$_POST['observacion'];
$observacion = utf8_decode($observacion);
$fecharecibido=$_POST['fecharecibido'];
$fecharecibido = utf8_decode($fecharecibido);
$telefonoaviso=$_POST['telefonoaviso'];
$telefonoaviso = utf8_decode($telefonoaviso);


usodegarantia($telefonoaviso,$observacion,$fecharecibido,$cod_detalle,$cod_productoFK,$cod_ventaFK,$user,$operacion);

}

if($operacion=="editarusogarantia" )
{
	
	
$idgarantia=$_POST['idgarantia'];
$idgarantia = utf8_decode($idgarantia);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);


editarusogarantia($idgarantia,$fecha,$estado,$user,$tipo);

}

if($operacion=="anulargarantia" )
{
	
	
$idgarantia=$_POST['idgarantia'];
$idgarantia = utf8_decode($idgarantia);
$tipogarantiamodificar=$_POST['tipogarantiamodificar'];
$tipogarantiamodificar = utf8_decode($tipogarantiamodificar);


anulargarantia($idgarantia,$tipogarantiamodificar);

}

if($operacion=="eliminar")
{
	
	
	$cod_detalle=$_POST['cod_detalle'];
$cod_detalle = utf8_decode($cod_detalle);
$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
$cantida=$_POST['cantida'];
$cantida = quitarseparadormiles($cantida);
$codProducto=$_POST['codProducto'];
$codProducto = utf8_decode($codProducto);
$operacion=$_POST['operacion_stock'];
$operacion = utf8_decode($operacion);
$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);

$Local_FK=$_POST['Local_FK'];
$Local_FK = utf8_decode($Local_FK);

quitarproducto($cod_detalle,$cod_ventaFK,$cantida,$codProducto,$operacion,$motivo,$Local_FK);


}
if($operacion=="quitardegarantia")
{
	
	
	$cod_detalle=$_POST['cod_detalle'];
$cod_detalle = utf8_decode($cod_detalle);
quitardegarantia($cod_detalle);

}

if($operacion=="buscar")
{
	$cod_ventaFK=$_POST['buscar'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
	BuscarRegistro($cod_ventaFK);

}	

if($operacion=="productosCompradoscliente")
{
	$cod_ventaFK=$_POST['buscar'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	productosCompradoscliente($cod_ventaFK,$formato);

}	

if($operacion=="productosCompradosclienteInactivo")
{
	$codCliente=$_POST['codCliente'];
$codCliente = utf8_decode($codCliente);
	productosCompradosclienteInactivo($codCliente);

}	

if($operacion=="detalleenhistorial")
{
	$cod_ventaFK=$_POST['buscar'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
	BuscarRegistroEnHistorilaVenta($cod_ventaFK);

}	

if($operacion=="buscarproductovendidos")
{
	
	$codigo=$_POST['codigo'];
$codigo = utf8_decode($codigo);
$producto=$_POST['producto'];
$producto = utf8_decode($producto);

$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
	$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
// $categoria=$_POST['categoria'];
// $categoria = utf8_decode($categoria);
$marca=$_POST['marca'];
$marca = utf8_decode($marca);
$tipo_venta=$_POST['tipo_venta'];
$tipo_venta = utf8_decode($tipo_venta);

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$array_cod_filtro_productos_vendidos = json_decode($_POST['array_cod_filtro_productos_vendidos']);

$agrupacionproductovendidoinforme=$_POST['agrupacionproductovendidoinforme'];
$agrupacionproductovendidoinforme = utf8_decode($agrupacionproductovendidoinforme);
if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
	buscarproductovendidos($tipo,$codigo,$producto,$fecha1,$fecha2,$cod_local,$marca,$tipo_venta,$agrupacionproductovendidoinforme,$array_cod_filtro_productos_vendidos);

}

if($operacion=="buscarmasproductovendidos")
{
	
	$codigo=$_POST['codigo'];
$codigo = utf8_decode($codigo);
$producto=$_POST['producto'];
$producto = utf8_decode($producto);

$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
	$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$categoria=$_POST['categoria'];
$categoria = utf8_decode($categoria);
$marca=$_POST['marca'];
$marca = utf8_decode($marca);
$totalventa=$_POST['totalventa'];
$totalventa = quitarseparadormiles($totalventa);
$tipo_venta=$_POST['tipo_venta'];
$tipo_venta = utf8_decode($tipo_venta);
$totalinvertido=$_POST['totalinvertido'];
$totalinvertido = quitarseparadormiles($totalinvertido);
$agrupacionproductovendidoinforme=$_POST['agrupacionproductovendidoinforme'];
$agrupacionproductovendidoinforme = utf8_decode($agrupacionproductovendidoinforme);
$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);
if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
	buscarmasproductovendidos($codigo,$producto,$fecha1,$fecha2,$cod_local,$categoria,$marca,$totalventa,$totalinvertido,$tipo_venta,$registrocargado,$agrupacionproductovendidoinforme);

}

if($operacion=="buscarHistorialGarantia")
{

$nrofactura=$_POST['nrofactura'];
$nrofactura = utf8_decode($nrofactura);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$documento=$_POST['documento'];
$documento = utf8_decode($documento);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$condicionSelecFecha=$_POST['condicionSelecFecha'];
$condicionSelecFecha = utf8_decode($condicionSelecFecha);
buscarHistorialGarantia($nrofactura,$cod_local,$documento,$cliente,$estado,$fecha1,$fecha2,$condicionSelecFecha);

}	

if($operacion=="comisionvendedoragrupado")
{
	
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$condicion=$_POST['condicion'];
$condicion = utf8_decode($condicion);
/* $sector=$_POST['sector'];
$sector = utf8_decode($sector); */
/* $cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local); */
// $cod_vendedor=$_POST['cod_vendedor'];
// $cod_vendedor = utf8_decode($cod_vendedor);

$array_cod_filtro_local_info_vendedores = json_decode($_POST['array_cod_filtro_local_info_vendedores']);
$array_cod_filtro_seccion_info_vendedores = json_decode($_POST['array_cod_filtro_seccion_info_vendedores']);
$array_cod_filtro_vendedor_info_vendedores = json_decode($_POST['array_cod_filtro_vendedor_info_vendedores']);

 comisionvendedoragrupado($fecha1, $fecha2,$condicion,$array_cod_filtro_local_info_vendedores,$array_cod_filtro_seccion_info_vendedores,$array_cod_filtro_vendedor_info_vendedores);

}

if($operacion=="comisionvendedor")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);
$producto=$_POST['producto'];
$producto = utf8_decode($producto);
$fechafiltro=$_POST['fechafiltro'];
$fechafiltro = utf8_decode($fechafiltro);
$Descuento=$_POST['Descuento'];
$Descuento = utf8_decode($Descuento);
$Flete=$_POST['Flete'];
$Flete = utf8_decode($Flete);
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);

$Local=$_POST['Local'];
$Local = utf8_decode($Local);

$tipo_venta=$_POST['tipo_venta'];
$tipo_venta = utf8_decode($tipo_venta);

 comisionvendedor($fecha1,$fecha2,$vendedor,$fechafiltro,$Descuento,$Flete,$cliente,$Local,$producto,$tipo_venta);

}	

if($operacion=="mascomisionvendedor")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);
$fechafiltro=$_POST['fechafiltro'];
$fechafiltro = utf8_decode($fechafiltro);
$producto=$_POST['producto'];
$producto = utf8_decode($producto);
$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);
$totalcomision=$_POST['totalcomision'];
$totalcomision = quitarseparadormiles($totalcomision);
$totalventa=$_POST['totalventa'];
$totalventa = quitarseparadormiles($totalventa);
$registroscargados=$_POST['registroscargados'];
$registroscargados = quitarseparadormiles($registroscargados);
$Descuento=$_POST['Descuento'];
$Descuento = utf8_decode($Descuento);
$Flete=$_POST['Flete'];
$Flete = utf8_decode($Flete); 
$totalDescuento=$_POST['totalDescuento'];
$totalDescuento = utf8_decode($totalDescuento); 
$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
$Local=$_POST['Local'];
$Local = utf8_decode($Local);
$tipo_venta=$_POST['tipo_venta'];
$tipo_venta = utf8_decode($tipo_venta);
 mascomisionvendedor($fecha1,$fecha2,$vendedor,$fechafiltro,$registrocargado,$totalcomision,$totalventa,$registroscargados,$Descuento,$Flete,$producto,$totalDescuento,$cliente,$Local,$tipo_venta);

}	


if($operacion=="detallesventadevolucion")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
	
 BuscarRegistroDevolucion($buscar,$cod_local);

}

if($operacion=="buscarexpedientes")
{
	$cliente=$_POST['cliente'];
$cliente = utf8_decode($cliente);
	buscarexpedientes($cliente);

}	



if($operacion=="detallePedido")
{
	$cod_ventaFK=$_POST['buscar'];
	$cod_ventaFK = utf8_decode($cod_ventaFK);
	
	echo("hola");
	exit;
	detallePedido($cod_ventaFK);

}		
	

}




function  detallePedido($buscar){
$mysqli=conectar_al_servidor();

$sql= "select pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,dtv.estado,detalleproducto,dtv.descuento,dtv.comision,vt.cod_venta,vt.TipoPago,vt.num_factura,vt.puntoexpedicion,vt.fecha_venta,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.subtotal,dtv.subPrecioCompra,
IFNULL((Select count(idgarantia) from garantias gt where gt.cod_detalle_venta_fk=dtv.cod_detalle and (gt.estado='Pendiente a verificar' or gt.estado='verificacion') limit 1),0) as nroGarantia,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
IFNULL((Select monto_impuesto from impuesto ipt where ipt.cod_Impuesto=pr.cod_ImpuestoFK and ipt.Estado='Activo' limit 1),1) as impuesto
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where dtv.cod_ventaFK='$buscar'";



$pagina="";
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

$cod_producto = utf8_encode($valor['cod_producto']); 
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$estado = utf8_encode($valor['estado']); 
$nroGarantia = utf8_encode($valor['nroGarantia']); 
$impuesto = utf8_encode($valor['impuesto']); 
$descuento = utf8_encode($valor['descuento']); 
$detalleproducto = utf8_encode($valor['detalleproducto']); 
$comision = utf8_encode($valor['comision']); 
$cod_venta = utf8_encode($valor['cod_venta']); 
$TipoPago = utf8_encode($valor['TipoPago']); 
 $num_factura=utf8_encode($valor['num_factura']);
$puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
$NombreMarca=utf8_encode($valor['NombreMarca']);
$fecha_venta=utf8_encode($valor['fecha_venta']);
$telefono=utf8_encode($valor['telefono']);


	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  name='tdDetalleVenta' >
<td  id='td_datos_1' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_2' style='display:none'>".$nombre_producto." *".$NombreMarca."*</td>
<td   style='width:20%;>".$nombre_producto." *".$NombreMarca."</td>
<td  id='td_datos_3' style='display:none'>".$detalleproducto."</td>
<td  id='td_datos_4' style='width:10%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($cantidad_detalle,'2',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_7' style='width:10%'>".number_format($subtotal,'0',',','.')."</td>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}





function abm($fecha_venta,$tipo,$cod_ventaFK,$num_factura,$operacion)
{
	
$mysqli=conectar_al_servidor(); 
$control=1;	
$totalRegistro=$_POST['totalRegistro'];
$totalRegistro = utf8_decode($totalRegistro);
while($control<=$totalRegistro){
 

$cod_combo=$_POST['cod_combo'.$control];
$cod_combo = utf8_decode($cod_combo);

$tipo_combo = 'NO';
if($cod_combo !=''){
	$tipo_combo = 'SI';
}else{
	$cod_combo = '0';
}

$cod_productoFK=$_POST['cod_productoFK'.$control];
$cod_productoFK = utf8_decode($cod_productoFK);

$cantidad_detalle=$_POST['cantidad_detalle'.$control];
$cantidad_detalle = quitarseparadormiles($cantidad_detalle);

$precio_producto=$_POST['precio_producto'.$control];
$precio_producto = quitarseparadormiles($precio_producto);

$subtotal=$_POST['subtotal'.$control];
$subtotal = quitarseparadormiles($subtotal);

$comision=$_POST['comision'.$control];
$comision = quitarseparadormiles($comision);

$descuento=$_POST['descuento'.$control];
$descuento = quitarseparadormiles($descuento);

$detalleproducto=$_POST['detalleproducto'.$control];
$detalleproducto = utf8_decode($detalleproducto);
	
$subPrecioCompra=obtenerCostoProducto($cod_productoFK);	
	
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);	

if($cantidad_detalle!="" || $cod_productoFK!="" || $cod_ventaFK!=""  ){

$consulta1="Insert into detalle_venta (cantidad_detalle,descuento,cod_productoFK,precio_producto,cod_ventaFK,subtotal,subPrecioCompra,estado,comision,detalleproducto,idcombo,tipo_combo)
values(?,?,?,?,?,?,?,'Activo',?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssssss';
$stmt1->bind_param($ss,$cantidad_detalle,$descuento,$cod_productoFK,$precio_producto,$cod_ventaFK,$subtotal,$subPrecioCompra,$comision,$detalleproducto,$cod_combo,$tipo_combo);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

$TipoVenta = obtener_Tipo_producto($cod_productoFK);

if($TipoVenta == 'VENTA DIRECTA' || $TipoVenta == 'REGALO'){
	// editar_cantidad($cod_productoFK,$cantidad_detalle,"resta",$cod_local);
	SumarRestarStockA($cantidad_detalle,$cod_productoFK,$cod_local,"RESTA","VENTA");
}
 
$control=$control+1;
}	
	
}

 
$subtotal=obtenerTotal($cod_ventaFK);
actualizarTotal($cod_ventaFK,$subtotal);

funcionCrearCredito($tipo,$fecha_venta,$cod_ventaFK,$subtotal,0);

$informacion =array("1" => "exito","2" => number_format($subtotal,'0',',','.'),"3" => $cod_ventaFK,"4" => $num_factura);
echo json_encode($informacion);	
exit;
	
}




function obtener_Tipo_producto($cod_productoFK)
{
	 
if( $cod_productoFK==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
} 
$mysqli=conectar_al_servidor(); 
 
$consulta1="SELECT tipo FROM producto WHERE cod_producto = '$cod_productoFK'";
 
$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

} 
	$result = $stmt1->get_result();
 $valor= mysqli_num_rows($result);
 $tipo ='';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
		      $tipo=$valor['tipo'];
		  	    
	  }
 }

return $tipo;
}








function obtener_nombre_producto($cod_productoFK)
{
	 
if( $cod_productoFK==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
}
 
$mysqli=conectar_al_servidor(); 
 
$consulta1="SELECT nombre_producto FROM producto WHERE cod_producto = '$cod_productoFK'";
 
$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

} 
	$result = $stmt1->get_result();
 $valor= mysqli_num_rows($result);
 $nombre_producto ='';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
		      $nombre_producto=$valor['nombre_producto'];
		  	    
	  }
 }

return $nombre_producto;
}



function cambiar($cod_detalle,$cod_ventaFK,$cantidaCambio,$CodProductoCambio,$metodopago,$cod_usuarioFK,$Local_FK)
{
	
	
if($cod_detalle=="" || $cod_ventaFK==""  ){
$inforOacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

// editar_cantidad($CodProductoCambio,$cantidaCambio,"suma",$Local_FK);
SumarRestarStockA($cantidaCambio,$CodProductoCambio,$Local_FK,"SUMA","PRODUCTO DEVUELTO A STOCK POR CAMBIO 1");

$consulta1="delete from detalle_venta where cod_detalle=? ";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$cod_detalle);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$consulta1="Insert into cambiarproducto (fecha,cod_productoFK,cod_ventaFK,cod_usuarioFK)
values(Current_Date,?,?,?)";

$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$CodProductoCambio,$cod_ventaFK,$cod_usuarioFK);


if (!$stmt1->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

$control=1;	
$totalRegistro=$_POST['TotalRegistro'];
$totalRegistro = utf8_decode($totalRegistro);

$motivo='Cambio';

while($control<=$totalRegistro){
	
	
$cod_productoFK=$_POST['cod_productoFK'.$control];
$cod_productoFK = utf8_decode($cod_productoFK);

$cantidad_detalle=$_POST['cantidad_detalle'.$control];
$cantidad_detalle = quitarseparadormiles($cantidad_detalle);

$precio_producto=$_POST['precio_producto'.$control];
$precio_producto = quitarseparadormiles($precio_producto);

$subtotal=$_POST['subtotal'.$control];
$subtotal = quitarseparadormiles($subtotal);

$comision=$_POST['comision'.$control];
$comision = quitarseparadormiles($comision);

$descuento=$_POST['descuento'.$control];
$descuento = quitarseparadormiles($descuento);

$detalleproducto=$_POST['detalleproducto'.$control];
$detalleproducto = utf8_decode($detalleproducto);
	
$subPrecioCompra=obtenerCostoProducto($cod_productoFK);	
	

	
if($cantidad_detalle!="" || $cod_productoFK!="" || $cod_ventaFK!=""  ){

$consulta1="Insert into detalle_venta (cantidad_detalle,descuento,cod_productoFK,precio_producto,cod_ventaFK,subtotal,subPrecioCompra,estado,comision,detalleproducto)
values(?,?,?,?,?,?,?,'Activo',?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssss';
$stmt1->bind_param($ss,$cantidad_detalle,$descuento,$cod_productoFK,$precio_producto,$cod_ventaFK,$subtotal,$subPrecioCompra,$comision,$detalleproducto);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


// editar_cantidad($cod_productoFK,$cantidad_detalle,"resta",$Local_FK);
SumarRestarStockA($cantidad_detalle,$cod_productoFK,$Local_FK,"RESTA","PRODUCTO DEVUELTO A STOCK POR CAMBIO 2");


$consulta1="Insert into detallescambio (cant,cod_productoFK,idcambiarproductoFK)
values(?,?,(select idcambiarproducto from cambiarproducto where cod_ventaFK='$cod_ventaFK' order by  idcambiarproducto desc limit 1 ))";

$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$cantidad_detalle,$cod_productoFK);


if (!$stmt1->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}



}	
	
$control=$control+1;
	
	
}

$subtotal=obtenerTotal($cod_ventaFK);
 actualizarTotal($cod_ventaFK,$subtotal);
 refinanciarencambio($cod_ventaFK,$subtotal,$metodopago);
$informacion =array("1" => "exito","2" => number_format($subtotal,'0',',','.'));
echo json_encode($informacion);	
exit;
	
}


function quitarDevolucion($cod_detalle,$cod_productoFK,$cod_ventaFK,$motivo,$cantidaCambio,$Local_FK)
{
	
	
	
if($cod_detalle=="" || $cod_productoFK=="" || $cod_ventaFK==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
}
$motivo="Devolucion";

$mysqli=conectar_al_servidor(); 



// $consulta1="delete from detalle_venta where cod_detalle=? ";
// $stmt1 = $mysqli->prepare($consulta1);
// $ss='s';
// $stmt1->bind_param($ss,$cod_detalle);
// if (!$stmt1->execute()) {
	
// echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
// exit;

// }


$consulta1="Insert into cambios (motivo,fecha,cant,cod_producto,cod_venta,coddetalleventa)
values('$motivo',Current_Date,'$cantidaCambio','$cod_productoFK','$cod_ventaFK','$cod_detalle')";


$stmt1 = $mysqli->prepare($consulta1);


if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

// editar_cantidad($cod_productoFK,$cantidaCambio,"suma",$Local_FK);
SumarRestarStockA($cantidaCambio,$cod_productoFK,$Local_FK,"SUMA","DEVOLUCION");

$subtotal=obtenerTotal($cod_ventaFK);


$informacion =array("1" => "exito","2" => number_format($subtotal,'0',',','.'));
echo json_encode($informacion);	
exit;
}


function quitardegarantia($cod_detalle)
{
	
	
	
if($cod_detalle==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();
$consulta1="update detalle_venta set estado='Activo' where cod_detalle=? ";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$cod_detalle);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function usodegarantia($telefonoaviso,$observacion,$fecharecibido,$cod_detalle,$cod_productoFK,$cod_ventaFK,$cod_usuarioFK,$operacion)
{
	
	
	
if($cod_detalle=="" || $cod_productoFK=="" || $cod_ventaFK==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}
$motivo="Devolucion";

$mysqli=conectar_al_servidor(); 



// $consulta1="update detalle_venta set estado='Garantia' where cod_detalle=? ";
// $stmt1 = $mysqli->prepare($consulta1);
// $ss='s';
// $stmt1->bind_param($ss,$cod_detalle);

// if (!$stmt1->execute()) {
// echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
// exit;

// }






$consulta1="Insert into garantias (fecharecibido,observacion,estado,cod_productoFK,cod_ventaFK,cod_usuarioFKRecibido,cod_detalle_venta_fk,telefonoaviso)
values('$fecharecibido','$observacion','Pendiente a verificar','$cod_productoFK','$cod_ventaFK','$cod_usuarioFK','$cod_detalle','$telefonoaviso')";

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function editarusogarantia($idgarantia,$fecha,$estado,$codUsuarioFk,$tipo)
{
	
	
	
if($idgarantia=="" || $fecha=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

if($tipo == 'VENTA'){
	if($estado=="verificacion"){
	$consulta1="update  garantias set estado='verificacion',fechaenvio='$fecha',cod_usuarioFkEnvio='$codUsuarioFk' where idgarantia='$idgarantia' ";
}
if($estado=="listo"){
	$consulta1="update  garantias set estado='listo',fechadevuelto='$fecha',cod_usuarioFkDevuelto='$codUsuarioFk' where idgarantia='$idgarantia' ";
}
if($estado=="entregado"){
	$consulta1="update  garantias set estado='entregado',fechaentrega='$fecha',cod_usuarioFkEntrega='$codUsuarioFk' where idgarantia='$idgarantia' ";
}
}else{
	if($estado=="verificacion"){
		$consulta1="update garantias_producto set estado='verificacion', fechaenvio='$fecha', cod_usuarioFkEnvio='$codUsuarioFk' where idgarantiaproducto='$idgarantia' ";
	}
	if($estado=="listo"){
		$consulta1="update  garantias_producto set estado='listo',fechadevuelto='$fecha',cod_usuarioFkDevuelto='$codUsuarioFk' where idgarantiaproducto='$idgarantia' ";
	}
	if($estado=="entregado"){
		$consulta1="update  garantias_producto set estado='entregado',fechaentrega='$fecha',cod_usuarioFkEntrega='$codUsuarioFk' where idgarantiaproducto='$idgarantia' ";
		
		$datos = obtenerDatosProductoGarantia($idgarantia);
		$cantidad = $datos[1];
		$cod_productoFK = $datos[2];
		$cod_localFK = $datos[0];
		
		// SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,'suma');
		SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,"SUMA","PRODUCTO DESDE GARANTIA");
	}
}


$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
function anulargarantia($idgarantia,$tipo)
{
	
if($idgarantia==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d'); 

 $user=$_POST['useru'];
    $codUsuarioFk = utf8_decode($user);


$mysqli=conectar_al_servidor(); 

if($tipo == 'VENTA'){

	$consulta1="update  garantias set estado='sin garantia',fecha_anulado='$fecha_inser',cod_usuarioFkEnvio='$codUsuarioFk' where idgarantia='$idgarantia' ";

}else{

	$consulta1="update garantias_producto set estado='sin garantia', fecha_anulado='$fecha_inser', cod_usuarioFkEnvio='$codUsuarioFk' where idgarantiaproducto='$idgarantia' ";

}


$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
	

echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function quitarproducto($cod_detalle,$cod_ventaFK,$cantida,$codProducto,$operacion,$motivo,$Local_FK)
{
	
	
if($cod_detalle=="" ||  $cod_ventaFK==""  ){
$inforOacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
$fecha = date('Y-m-d', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);

$consulta="Insert into detallesventaeliminado (cod_producto,motivo,fecha,cod_user_insert,fecha_insert)
values(?,?,?,?,?)";
$stmt = $mysqli->prepare($consulta);
$ss='sssss';
$stmt->bind_param($ss,$codProducto,$motivo,$fecha,$user,$fecha_inser_edit);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


$consulta1="delete from detalle_venta where cod_detalle=? ";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$cod_detalle);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
if($operacion=="1"){
// editar_cantidad($codProducto,$cantida,"suma",$Local_FK);
SumarRestarStockA($cantida,$codProducto,$Local_FK,"SUMA","DETALLE VENTA ELIMINADA");
}
$subtotal=obtenerTotal($cod_ventaFK);
 eliminarestecreditos($cod_ventaFK);	
actualizarTotal($cod_ventaFK,$subtotal); 
 


$informacion =array("1" => "exito","2" => number_format($subtotal,'0',',','.'),"3" => $cod_ventaFK);
echo json_encode($informacion);	
exit;
	
}


function eliminarestecreditos($cod_venta){
		$mysqli=conectar_al_servidor();
			$consulta="delete from credito where  cod_venta='$cod_venta' ";	

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);
}


function editar_cantidad($idproductos,$cantidad,$t,$cod_localfk){
      
	  $mysqli=conectar_al_servidor(); 
	  
	   $user=$_POST['useru'];
    $user = utf8_decode($user);

	    if($t=="resta"){
			$consulta="Update stocklocales set cantidad=(cantidad-$cantidad), user_update='$user'  where cod_productofk='".$idproductos."' and cod_localfk='".$cod_localfk."'";
		
				

	}else{
		 $consulta="Update stocklocales set cantidad=(cantidad+$cantidad), user_update='$user'  where cod_productofk='".$idproductos."' and cod_localfk='".$cod_localfk."'";
          
			

	}
	


	$stmt = $mysqli->prepare($consulta);
	
if ( ! $stmt->execute()) {
   	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}


    }

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


	function obtenerStockActual($codProducto)
{
	$mysqli=conectar_al_servidor();
	 $Stock='';
		$sql= "Select stock_producto
		from producto where cod_producto='$codProducto' ";
		

   
   $stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $Stock=$valor['stock_producto'];
		  	 
			  
	  }
 }
 
 
  return $Stock;

}

function obtenerDatosProductoGarantia($idGarantia)
{
	$mysqli=conectar_al_servidor();
	 $Stock='';
		$sql= "SELECT * FROM `garantias_producto` WHERE idgarantiaproducto = '$idGarantia' ";
		

   
   $stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
 	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $datos = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $datos[0]=$valor['cod_localFK'];
		      $datos[1]=$valor['cantidad'];
		      $datos[2]=$valor['cod_productoFK'];
		  	 
			  
	  }
 }
 
 
  return $datos;
}

function obtenerTotal($cod_ventaFK)
{
	$mysqli=conectar_al_servidor();
	 $subtotal='';
	$sql= "Select sum(subtotal) as subtotal from detalle_venta where cod_ventaFK='$cod_ventaFK'  ";
		
   
   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $subtotal=$valor['subtotal'];
		  	
			  
			  
	  }
 }
 
 
return $subtotal;


}


function obtenerCostoProducto($cod_producto)
{
	$mysqli=conectar_al_servidor();
	 $precio_compra='';
	$sql= "Select precio_compra from producto where cod_producto='$cod_producto'  ";
		
   
   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $precio_compra=$valor['precio_compra'];
		  	
			  
			  
	  }
 }
 
 
return $precio_compra;


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


}




function EditarSolicitud($idAbm,$detalleVenta,$cod_usu)
{

$mysqli=conectar_al_servidor(); 


$consulta1="Update solicitudcredito set  estado='FINALIZADO' , detalleVenta='$detalleVenta'   where idSolicitudCredito=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss ,$idAbm);

if (!$stmt1->execute()) {	

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);

}




function iniciarVenta($codSolicitudCreditoFK,$puntoexpedicion,$tipo_comprobante,$fecha_venta,$cod_usuarioFK,$cod_clienteFK,$num_factura,$cod_cobradorFK,$TipoVenta,$TipoPago,$vendedor1,$vendedor2,$comisioncobrador,$cod_local,$idGaranteFk){
	
	$mysqli=conectar_al_servidor(); 
	
	if($num_factura==""){
	if($tipo_comprobante=="FACTURA"){
	$datos=buscarcodNroFactura($cod_local,$puntoexpedicion);
	$num_factura=buscarnrofactura($datos[0],$datos[1]);
	$codnrofactura=$datos[0];
	}else{
		$num_factura=buscarnroventab();
		$puntoexpedicion="";
	   $codnrofactura="";
	}
	}
		/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d h:i:s', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);


if($codSolicitudCreditoFK==''){
	$codSolicitudCreditoFK=0;
}

	$consulta1="Insert into venta (idGaranteFk,fecha_venta,total_venta,cod_usuarioFK,cod_clienteFK,num_factura,cod_cobradorFK,TipoVenta,TipoPago,Vendedor1,Vendedor2,comision,cod_local,tipo_comprobante,puntoexpedicion,codnrofactura,cod_user_insert,fecha_insert,codSolicitudCreditoFK,estado_entrega)
values($idGaranteFk,'$fecha_venta','0',$cod_usuarioFK,$cod_clienteFK,'$num_factura',$cod_cobradorFK,'$TipoVenta','$TipoPago','$vendedor1','$vendedor2','$comisioncobrador',$cod_local,'$tipo_comprobante','$puntoexpedicion','$codnrofactura','$user','$fecha_inser_edit','$codSolicitudCreditoFK','NO')";

$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

if($codSolicitudCreditoFK!="" || $codSolicitudCreditoFK!="0" ){
	$detalleVenta=$puntoexpedicion.'-'.$num_factura;
	EditarSolicitud($codSolicitudCreditoFK,$detalleVenta,$cod_usuarioFK);
}

$cod_venta=obtenerId($cod_clienteFK,$cod_usuarioFK,$num_factura);

 
   $datos[0]=$cod_venta;
   $datos[1]=$num_factura;
   return $datos;
}


function funcionCrearCredito($tipo,$fecha_venta,$cod_venta,$Monto,$descuento){
 
if($tipo == "1"){
	
	$mysqli=conectar_al_servidor(); 
$consulta="delete from credito where  cod_venta='$cod_venta'";
$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$consulta="Insert into credito (plazo, 	fechapago, cod_venta, Monto, Esado,Nro_recibo,descuento)
			values('Contado','$fecha_venta','$cod_venta','$Monto','Pendiente','0','$descuento')";
			
$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
}	
	
	
}




function obtenerId($cod_clienteFK,$cod_usuarioFK,$num_factura)
{
	$mysqli=conectar_al_servidor();
	 $cod_venta='';
		$sql= "Select cod_venta from venta where cod_clienteFK='$cod_clienteFK' and cod_usuarioFK='$cod_usuarioFK' and num_factura='$num_factura' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_venta=$valor['cod_venta'];
		  	
			  
			  
	  }
 }
 
 
return $cod_venta;


}


function  BuscarRegistro($buscar)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

$sql= "select dtv.descripcion ,pr.tipo_producto,vt.fecha_venta, 
pr.cod_producto,pr.cod_barra,pr.nombre_producto,dtv.cod_detalle,vt.total_venta,IFNULL(dtv.comision,0) as comision,dtv.estado,detalleproducto,vt.num_factura,vt.puntoexpedicion,concat(vt.puntoexpedicion,'-',vt.num_factura) as fac,
IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
(Select direccion from persona where cod_persona=cod_clienteFK) as clientedireccion,
(Select concat(direccion,'-',email) from persona where  cod_persona=cod_clienteFK) as zonaCliente,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as clientetelefono,
(Select concat(direccion,'-',email) from persona where  cod_persona=vt.idGaranteFk) as zonaGarante,
(Select telefono from persona where cod_persona=vt.idGaranteFk) as Garantetelefono,
(Select ci_cliente from cliente where cod_cliente=vt.idGaranteFk) as nrodocgarante,
(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as nrodocliente,
(Select rut_cliente from cliente where cod_cliente=vt.cod_clienteFK) as ruccliente,vt.TipoVenta,
(Select count(fechapago) from credito where cod_venta=vt.cod_venta and plazo!='ENTREGA' ) as nroCouta,
IFNULL((select count(cr.plazo) from  credito cr where vt.cod_venta=cr.cod_venta),1) as plazo,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,dtv.descuento,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
IFNULL((Select monto_impuesto from impuesto ipt where ipt.cod_Impuesto=pr.cod_ImpuestoFK and ipt.Estado='Activo' limit 1),1) as impuesto
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where dtv.cod_ventaFK='$buscar'";

// echo($sql);
// exit;
$clientenombre = ""; 
$clientedireccion = ""; 
$clientetelefono = ""; 
$nrodocliente = ""; 
$nrodocgarante = ""; 
$zonaCliente = ""; 
$Garantetelefono = ""; 
$zonaGarante = ""; 
$TipoVenta = ""; 

$pagina = "";   
$paginarecibo = "";      
$ruccliente = "";      
$paginatickect = "";     
$paginaContrato = "";      
$totalventa = "0";   
$totalpagado = "0";   
$nroFactura = "0";   
$nroVenta = "0";   
$nroCouta = "1";   
$fac="";
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$SubTotalestotalIva10=0;
$SubTotalestotalIva5=0;
$totalIvaEx=0;
$totalDescuentoDetalles=0;
$totales10=0;
$totales5=0;
$totalesExt=0;
$totalesiva=0;
$plazo=1;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$descripcion = utf8_encode($valor['descripcion']); 
$TipoVenta = utf8_encode($valor['TipoVenta']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$cod_producto = utf8_encode($valor['cod_producto']); 
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$cod_ventaFK = utf8_encode($valor['cod_ventaFK']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$totalventa = utf8_encode($valor['total_venta']); 
$totalpagado = utf8_encode($valor['totalpagado']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$impuesto = utf8_encode($valor['impuesto']); 
$clientenombre = utf8_encode($valor['clientenombre']); 
$clientedireccion = utf8_encode($valor['clientedireccion']); 
$clientetelefono = utf8_encode($valor['clientetelefono']); 
$nrodocliente = utf8_encode($valor['nrodocliente']); 
$plazo = utf8_encode($valor['plazo']); 
$detalleproducto = utf8_encode($valor['detalleproducto']); 
$num_factura = utf8_encode($valor['num_factura']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$Garantetelefono = utf8_encode($valor['Garantetelefono']); 
$zonaGarante = utf8_encode($valor['zonaGarante']); 
$zonaCliente = utf8_encode($valor['zonaCliente']); 
$ruccliente = utf8_encode($valor['ruccliente']); 
$nroCouta = utf8_encode($valor['nroCouta']); 
$descuento = utf8_encode($valor['descuento']); 
$nrodocgarante = utf8_encode($valor['nrodocgarante']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$fac = utf8_encode($valor['fac']); 
$tipo_producto = utf8_encode($valor['tipo_producto']);
$fecha_venta = utf8_encode($valor['fecha_venta']);

$totalDescuentoDetalles = $totalDescuentoDetalles+$descuento; 

if($puntoexpedicion!=""){
	$nroFactura=$puntoexpedicion."-".$num_factura;
}else{
	$nroFactura=$num_factura;
}

$subtotalIva5=0;
$subtotalIva10=0;
$subtotalIvaext=0;
if($impuesto==11){
$subtotalIva10=($subtotal/$impuesto);
$totalesiva=$totalesiva+$subtotalIva10;
$totales10=$totales10+$subtotalIva10;
$SubTotalestotalIva10=$SubTotalestotalIva10+$subtotal;

}
if($impuesto==21){
$subtotalIva5=($subtotal/$impuesto);
$totalesiva=$totalesiva+$subtotalIva5;
$totales5=$totales5+$subtotalIva5;
$SubTotalestotalIva5=$SubTotalestotalIva5+$subtotal;
}
if($impuesto==1){
$subtotalIvaext=$subtotal;
$totalesExt=$totalesExt+$subtotalIvaext;
}


$styleG=""; 
$styleDetalle=""; 
if($totalpagado>0){
	$eventos="";
}else{
	$eventos="obtenerdatosabmdetalleventa(this)";
}

$filas[]=array(
	"cod_producto"=>$cod_producto,
	"cod_detalle"=>$cod_detalle,
	"cod_barra"=>$cod_barra,
	"producto"=>$nombre_producto,
	"marca"=>$NombreMarca,
	"producto_mostrado"=>$nombre_producto." *".$NombreMarca."*",
	"precio"=>floatval($precio_producto),
	"precio_formateado"=>number_format($precio_producto,'0',',','.'),
	"cantidad"=>floatval($cantidad_detalle),
	"cantidad_formateada"=>number_format($cantidad_detalle,'2',',','.'),
	"descuento"=>floatval($descuento),
	"descuento_formateado"=>number_format($descuento,'0',',','.'),
	"subtotal"=>floatval($subtotal),
	"subtotal_formateado"=>number_format($subtotal,'0',',','.'),
	"comision"=>floatval($comision),
	"comision_formateada"=>number_format($comision,'0',',','.'),
	"tipo_producto"=>$tipo_producto,
	"seleccionable"=>floatval($totalpagado)<=0
);
 
if($tipo_producto == 'COMBO'){
	$datos = buscar_vista_productos_combo_solicitud($cod_productoFK,$plazo,$totalpagado,$impuesto,$descuento);
	 $pagina = $datos[0];
	 $paginarecibo = $datos[1];
	 $paginatickect = $datos[2];
}else{


	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='$eventos' class='$styleDetalle'  name='tdDetalleVenta'>
<td id='td_id_1' style='display:none'>".$cod_producto."</td>
<td id='td_id_2' style='display:none'></td>
<td  style='width:5%'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%;".$styleG."'>".$nombre_producto." *".$NombreMarca."*</td>
<td  id='td_datos_3' style='width:10%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_4' style='width:5%'>".number_format($cantidad_detalle,'2',',','.')."</td>
<td  id='td_datos_5' style='width:10%;display:none'>".number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($subtotal,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($comision,'0',',','.')."</td>
</tr>
</table>";

$descripcionDetalleVenta=buscardescripcionDetalleVenta($cod_detalle);

$paginarecibo.="
<table class='tableReporRecibo' >
<tr >
<td  style='width:10%;text-aling:center'>".number_format($cantidad_detalle,'2',',','.')."</td>
<td  style='width:50%'>$nombre_producto * $NombreMarca * $descripcion <br> $descripcionDetalleVenta</td>
<td  style='width:10%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  style='width:10%;text-aling:center'>".number_format($subtotalIvaext,'0',',','.') ."</td>
<td  style='width:5%;text-aling:center'>".number_format($subtotalIva5,'0',',','.') ."</td>
<td  style='width:15%;text-aling:center'>".number_format($subtotal,'0',',','.') ."</td>
</tr>
</table>";

$paginatickect.="<table class='tableTicket'>
<tr>
<td style='width:20%'>".number_format($cantidad_detalle,'0',',','.')."</td>
<td style='width:80%'>".$nombre_producto." *".$NombreMarca."*</td>
</tr>
</table>";

$paginaContrato.="<table class='tableTicket'>
<tr>
<td style='width:10%'>". $cod_barra ."</td>
<td style='width:50%'>". $nombre_producto ."</td>
<td style='width:10%'>".number_format($cantidad_detalle,'0',',','.')."</td>
<td style='width:10%'>".number_format($precio_producto,'0',',','.')."</td>
<td style='width:20%'>".number_format($subtotal,'0',',','.')."</td> 
</tr>
</table>";

}
}
}


$datos=buscardatoscuenta($buscar); 
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
$interes=$datos[12] ;
$entrega=$datos[13] ;
$controlMonto=$datos[14] ;
$ultimafechapago=$datos[15] ;

$datos=calcularintereses2($cod_venta,0,0,"2","2","2","no");
$totalEnDescuento=$datos[0];
$totalInteres=$datos[12];
$deuda=$datos[4];
$diasatrasado=$datos[5];
$acobrar=$datos[8];
$totalCredito=$datos[11];
$totalDescuentosAplicado=$totalDescuentoDetalles+$totalEnDescuento;
if($totalCredito>0){
	$Subttotalventa=$totalCredito+$totalDescuentoDetalles;
	$totalventa=$totalCredito-$totalEnDescuento;
}else{
	$Subttotalventa=$totalventa+$totalDescuentoDetalles;
	$totalventa=$totalventa-$totalEnDescuento;
}
$verDetallePago=buscarpagosDetallePago($cod_ventaFK);
$plazoPago = buscarpagosTitulo($cod_ventaFK);

$cuotas=buscarcantidadcuotapagados($cod_venta)."/".$nroCouta;
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"5" => $paginarecibo,"14" => $paginatickect,"3" => number_format($totalventa,'0',',','.'),"4" => number_format($totalpagado,'0',',','.')
,"6" => number_format($SubTotalestotalIva5,'0',',','.'),"7" => number_format($SubTotalestotalIva10,'0',',','.'),"8" => number_format($totales10,'0',',','.')
,"9" => number_format($totales5,'0',',','.'),"10" =>$clientenombre ,"11" => $clientedireccion ,"12" => $clientetelefono ,"13" => $nrodocliente
,"15" => $plazo ,"16" => $fechapago ,"23" => number_format($Monto,'0',',','.')  ,"18" => $Nro_recibo ,"19" => $nroCuota ,"20" =>$dias ,"21" => number_format($interes,'2',',','.')  ,"22" => $TipoPago ,"17" =>number_format($entrega,'0',',','.')
,"24"=>$controlMonto,
"25"=>$fac,
"26"=>$ultimafechapago,
"27"=>$zonaCliente,
"28"=>$Garantetelefono,
"29"=>$zonaGarante,
"30"=>number_format($totalInteres,'0',',','.'),
"31"=>number_format($deuda,'0',',','.'),
"32"=>$diasatrasado,
"33"=>$ruccliente,
"34"=> number_format($totalEnDescuento,'0',',','.'),
"35"=>$cuotas,
"36"=>number_format($totalesiva,'0',',','.'),
"37"=>number_format($totalDescuentosAplicado,'0',',','.'),
"38"=>number_format($Subttotalventa,'0',',','.'),
"39"=>$nrodocgarante,
"40"=>$TipoVenta ,
"41"=>$plazoPago[2],
"42"=>$plazoPago[3],
"43"=>$plazoPago[4],
"44"=>$plazoPago[5],
"45"=>number_format($plazoPago[1],'0',',','.'),
"46"=>$fecha_venta,
"47"=>$paginaContrato,
"48"=>number_format($verDetallePago[0],'0',',','.'),
"49"=>number_format($verDetallePago[1],'0',',','.'),
"50"=>number_format($verDetallePago[2],'0',',','.'));
echo json_encode($informacion);	
exit;
}



function buscarpagosDetallePago($CodVenta)
{
$mysqli=conectar_al_servidor();


$sql= "select  (select count(*) from credito c where vt.cod_venta=c.cod_venta ) as plazo,
  ifnull((SELECT c.Monto FROM credito c WHERE vt.cod_venta = c.cod_venta GROUP BY c.Monto ORDER BY COUNT(*) DESC LIMIT 1) ,0) as MontoCouta,
  ifnull((select sum(Monto) from pago p where vt.cod_venta=p.cod_venta_fk and Tipo='Pago Cuota'),0) as Entrega
  from venta vt 
 where vt.cod_venta='$CodVenta'    ";
 
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
 
$datos[0]="";
$datos[1]="";
$datos[2]="";
  
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
     
$plazo = utf8_encode($valor['plazo']);      
$MontoCouta = utf8_encode($valor['MontoCouta']);   
$Entrega = utf8_encode($valor['Entrega']);   
 
}
  
}
$datos[0]=$plazo;
$datos[1]=$MontoCouta;
$datos[2]=$Entrega; 
return $datos;	

}




function buscarpagosTitulo($CodVenta)
{
$mysqli=conectar_al_servidor();


$sql= "select cr.fechapago,cr.plazo,cr.Monto as montocredito,pg.idPago,pg.Fecha,pg.Monto,pg.nrofactura,pg.tipo,vt.TipoVenta,vt.total_venta
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

if($plazo=="Contado"){
	$tipo="";
	$plazo="CONTADO";
	$totalCuota=$totalCuota  + $Monto;
}


if($tipo=="Interes"){
	$tipo="INTERES";
	$totalInteres=$totalInteres  + $Monto;
}
if($tipo=="Pago Cuota"){
	$tipo="PAGO DE CUOTA";
	$totalCuota=$totalCuota  + $Monto;
}



if($tipo=="CARGO ADMINISTRATIVO"){
	$tipo="CARGO ADMINISTRATIVO";
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
<td style='width:40%'>".$tipo."--".$plazo."</td>
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




function buscardescripcionDetalleVenta($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select nombre
 from  descripcionventa 
 where cod_detalleFK='$buscar' ";
 

$pagina="";
 
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

$nombre = utf8_encode($valor['nombre']);
$pagina.="<p style='font-size: 9px;'>$nombre</p>";

}
}
 mysqli_close($mysqli); 
return $pagina;

}




function buscarcantidadcuotapagados($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select count(vt.num_factura) as cuotas
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar'
 and  ((cr.Monto-cr.descuento)-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0))<=0
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

function  productosCompradoscliente($buscar,$formato='')
{
$mysqli=conectar_al_servidor();

$sql= "select pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,vt.total_venta,IFNULL(dtv.comision,0) as comision,dtv.estado,detalleproducto,vt.num_factura,vt.puntoexpedicion,
IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
(Select direccion from persona where cod_persona=cod_clienteFK) as clientedireccion,
(Select nombre from zona where idzona=(Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK limit 1) limit 1) as zonaCliente,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as clientetelefono,
(Select nombre from zona where idzona=(Select idzonaFk from cliente where cod_cliente=vt.idGaranteFk limit 1) limit 1) as zonaGarante,
(Select telefono from persona where cod_persona=vt.idGaranteFk) as Garantetelefono,
(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as nrodocliente,
(Select rut_cliente from cliente where cod_cliente=vt.cod_clienteFK) as ruccliente,
IFNULL((select count(cr.plazo) from  credito cr where vt.cod_venta=cr.cod_venta),1) as plazo,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
IFNULL((Select monto_impuesto from impuesto ipt where ipt.cod_Impuesto=pr.cod_ImpuestoFK and ipt.Estado='Activo' limit 1),1) as impuesto
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where dtv.cod_ventaFK='$buscar'";
$clientenombre = ""; 
$clientedireccion = ""; 
$clientetelefono = ""; 
$nrodocliente = ""; 
$zonaCliente = ""; 
$Garantetelefono = ""; 
$zonaGarante = ""; 

$pagina = "";
$filas = array();
$filas = array();
$paginarecibo = "";      
$ruccliente = "";      
$paginatickect = "";      
$totalventa = "0";   
$totalpagado = "0";   
$nroFactura = "0";   
$nroVenta = "0";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$SubTotalestotalIva10=0;
$SubTotalestotalIva5=0;
$totalIvaEx=0;

$totales10=0;
$totales5=0;
$totalesExt=0;
$plazo=1;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_producto']); 
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$cod_ventaFK = utf8_encode($valor['cod_ventaFK']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$totalventa = utf8_encode($valor['total_venta']); 
$totalpagado = utf8_encode($valor['totalpagado']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$impuesto = utf8_encode($valor['impuesto']); 
$clientenombre = utf8_encode($valor['clientenombre']); 
$clientedireccion = utf8_encode($valor['clientedireccion']); 
$clientetelefono = utf8_encode($valor['clientetelefono']); 
$nrodocliente = utf8_encode($valor['nrodocliente']); 
$plazo = utf8_encode($valor['plazo']); 
$detalleproducto = utf8_encode($valor['detalleproducto']); 
$num_factura = utf8_encode($valor['num_factura']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$Garantetelefono = utf8_encode($valor['Garantetelefono']); 
$zonaGarante = utf8_encode($valor['zonaGarante']); 
$zonaCliente = utf8_encode($valor['zonaCliente']); 
$ruccliente = utf8_encode($valor['ruccliente']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 

$filas[]=array(
	"cod_producto" => $cod_producto,
	"cod_detalle" => $cod_detalle,
	"producto" => $nombre_producto,
	"marca" => $NombreMarca,
	"producto_mostrado" => $nombre_producto." *".$NombreMarca."*",
	"cantidad" => floatval($cantidad_detalle),
	"cantidad_formateada" => number_format($cantidad_detalle,'2',',','.'),
	"precio" => floatval($precio_producto),
	"precio_formateado" => number_format($precio_producto,'0',',','.'),
	"subtotal" => floatval($subtotal),
	"subtotal_formateado" => number_format($subtotal,'0',',','.')
);

if($puntoexpedicion!=""){
	$nroFactura=$puntoexpedicion."-".$num_factura;
}else{
	$nroFactura=$num_factura;
}

$subtotalIva5=0;
$subtotalIva10=0;
$subtotalIvaext=0;
if($impuesto==11){
$subtotalIva10=($subtotal*($impuesto/100));
$totales10=$totales10+$subtotalIva10;
$subtotalIva10=$subtotal;
$SubTotalestotalIva10=$SubTotalestotalIva10+$subtotalIva10;
}
if($impuesto==21){
$subtotalIva5=($subtotal*($impuesto/100));
$totales5=$totales5+$subtotalIva5;
$subtotalIva5=$subtotal;
$SubTotalestotalIva5=$SubTotalestotalIva5+$subtotalIva5;

}
if($impuesto==1){
$subtotalIvaext=$subtotal;
$totalesExt=$totalesExt+$subtotalIvaext;
}


$styleG=""; 
$styleDetalle=""; 
$eventos="obtenerdatosabmdetalleventa(this)";


	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  class='$styleDetalle'  name='tdDetalleVenta'>
<td id='td_id_1' style='display:none'>".$cod_producto."</td>
<td id='td_id_2' style='display:none'>".$cod_detalle."</td>
<td  id='td_datos_1' style='width:20%;".$styleG."'>".$nombre_producto." *".$NombreMarca."* </td>
<td  id='td_datos_4' style='width:5%'>".number_format($cantidad_detalle,'2',',','.')."</td>
<td  id='td_datos_3' style='width:10%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($subtotal,'0',',','.')."</td>
</tr>
</table>";

}
}

$datocuenta=calcularintereses2($buscar,0,0,"2","2","2","no");
$totalInteres=$datocuenta[12];
$totalPagado=$datocuenta[3];
$acobrar=$datocuenta[4];
$deuda=$datocuenta[4];
$porinteres=$datocuenta[14];

$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($totalventa,'0',',','.'),"4" => number_format($totalPagado,'0',',','.') ,"5" =>   number_format($acobrar,'0',',','.'),"6" => $nroFactura );
echo json_encode($informacion);	
exit;
}

function  productosCompradosclienteInactivo($buscar)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

$sql= "select vt.fecha_venta,pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,vt.total_venta,IFNULL(dtv.comision,0) as comision,dtv.estado,detalleproducto,vt.num_factura,vt.puntoexpedicion,
IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
(Select direccion from persona where cod_persona=cod_clienteFK) as clientedireccion,
(Select nombre from zona where idzona=(Select idzonaFk from cliente where cod_cliente=vt.cod_clienteFK limit 1) limit 1) as zonaCliente,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as clientetelefono,
(Select nombre from zona where idzona=(Select idzonaFk from cliente where cod_cliente=vt.idGaranteFk limit 1) limit 1) as zonaGarante,
(Select telefono from persona where cod_persona=vt.idGaranteFk) as Garantetelefono,
(Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK) as nrodocliente,
(Select rut_cliente from cliente where cod_cliente=vt.cod_clienteFK) as ruccliente,
IFNULL((select count(cr.plazo) from  credito cr where vt.cod_venta=cr.cod_venta),1) as plazo,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,
IFNULL((Select monto_impuesto from impuesto ipt where ipt.cod_Impuesto=pr.cod_ImpuestoFK and ipt.Estado='Activo' limit 1),1) as impuesto
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where vt.cod_clienteFK='$buscar' order by fecha_venta desc";
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



$cod_producto = utf8_encode($valor['cod_producto']); 
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$cod_ventaFK = utf8_encode($valor['cod_ventaFK']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$totalventa = utf8_encode($valor['total_venta']); 
$totalpagado = utf8_encode($valor['totalpagado']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']);  
$impuesto = utf8_encode($valor['impuesto']); 
$clientenombre = utf8_encode($valor['clientenombre']); 
$clientedireccion = utf8_encode($valor['clientedireccion']); 
$clientetelefono = utf8_encode($valor['clientetelefono']); 
$nrodocliente = utf8_encode($valor['nrodocliente']); 
$plazo = utf8_encode($valor['plazo']); 
$detalleproducto = utf8_encode($valor['detalleproducto']); 
$num_factura = utf8_encode($valor['num_factura']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$Garantetelefono = utf8_encode($valor['Garantetelefono']); 
$zonaGarante = utf8_encode($valor['zonaGarante']); 
$zonaCliente = utf8_encode($valor['zonaCliente']); 
$ruccliente = utf8_encode($valor['ruccliente']); 
$fecha_venta = utf8_encode($valor['fecha_venta']); 

$filas[]=array(
	"cod_producto"=>$cod_producto,
	"cod_detalle"=>$cod_detalle,
	"producto"=>$nombre_producto,
	"fecha_venta"=>$fecha_venta,
	"numero_factura"=>($puntoexpedicion!="" ? $puntoexpedicion."-".$num_factura : $num_factura),
	"cantidad"=>floatval($cantidad_detalle),
	"cantidad_formateada"=>number_format($cantidad_detalle,'2',',','.'),
	"precio"=>floatval($precio_producto),
	"precio_formateado"=>number_format($precio_producto,'0',',','.'),
	"subtotal"=>floatval($subtotal),
	"subtotal_formateado"=>number_format($subtotal,'0',',','.')
);

if($puntoexpedicion!=""){
	$nroFactura=$puntoexpedicion."-".$num_factura;
}else{
	$nroFactura=$num_factura;
}



$styleG=""; 
$styleDetalle=""; 
$eventos="obtenerdatosabmdetalleventa(this)";


	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  class='$styleDetalle'  name='tdDetalleVenta'>
<td  id='td_datos_1' style='width:70%;".$styleG."'>".$nombre_producto."</td>
<td  id='td_datos_1' style='width:30%;'>".$fecha_venta."</td>
</tr>
</table>";

}
}


$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina);
echo json_encode($informacion);	
exit;
}

function  BuscarRegistroEnHistorilaVenta($buscar)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

$sql= "select pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,dtv.estado,detalleproducto,dtv.descuento,dtv.comision,vt.cod_venta,vt.TipoPago,vt.num_factura,vt.puntoexpedicion,vt.fecha_venta,dtv.tipo_combo,dtv.idcombo,
(Select telefono from persona where cod_persona=vt.cod_clienteFK) as telefono,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.subtotal,dtv.subPrecioCompra,
IFNULL((Select count(idgarantia) from garantias gt where gt.cod_detalle_venta_fk=dtv.cod_detalle and (gt.estado='Pendiente a verificar' or gt.estado='verificacion') limit 1),0) as nroGarantia,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
IFNULL((Select monto_impuesto from impuesto ipt where ipt.cod_Impuesto=pr.cod_ImpuestoFK and ipt.Estado='Activo' limit 1),1) as impuesto
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where dtv.cod_ventaFK='$buscar'";
$pagina="";
$filas=array();
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalIva10=0;
$totalIva5=0;
$totalIvaEx=0;

$totales10=0;
$totales5=0;
$totalesExt=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_producto']); 
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$estado = utf8_encode($valor['estado']); 
$nroGarantia = utf8_encode($valor['nroGarantia']); 
$impuesto = utf8_encode($valor['impuesto']); 
$descuento = utf8_encode($valor['descuento']); 
$detalleproducto = utf8_encode($valor['detalleproducto']); 
$comision = utf8_encode($valor['comision']); 
$cod_venta = utf8_encode($valor['cod_venta']); 
$TipoPago = utf8_encode($valor['TipoPago']); 
 $num_factura=utf8_encode($valor['num_factura']);
$puntoexpedicion=utf8_encode($valor['puntoexpedicion']);
$NombreMarca=utf8_encode($valor['NombreMarca']);
$fecha_venta=utf8_encode($valor['fecha_venta']);
$telefono=utf8_encode($valor['telefono']);
$tipo_combo=utf8_encode($valor['tipo_combo']);
$idcombo=utf8_encode($valor['idcombo']);



		  	    if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}

$subtotalIva5=0;
$subtotalIva10=0;
$subtotalIvaext=0;
if($impuesto==11){
$subtotalIva10=($subtotal*$impuesto)/100;
$subtotalIva10=$subtotal-$subtotalIva10;
$totalIva10=$totalIva10+$subtotalIva10;
$subtotalIva10=$subtotal;
$totales10=$totales10+$subtotalIva10;
}
if($impuesto==21){
$subtotalIva5=($subtotal*$impuesto)/100;
$subtotalIva5=$subtotal-$subtotalIva5;	
$totalIva5=$totalIva5+$subtotalIva5;
$subtotalIva5=$subtotal;
$totales5=$totales5+$subtotalIva5;
}
if($impuesto==1){
$subtotalIvaext=$subtotal;
$totalesExt=$totalesExt+$subtotalIvaext;
}


$styleG=""; 
$styleDetalle=""; 
$tituloext=""; 
$eventos="obtenerdatosabmdetalleventaDevoluciones(this)";
if($nroGarantia>0){
	$eventos="";
	$tituloext=" <BR> <b><i>(PROCESO DE GARANTIA)<i><b>";
}


$nombreCombo = '';
if($idcombo != ''){
	$nombreCombo = obtener_nombre_producto($idcombo);
}

$filas[]=array(
	"cod_producto"=>$cod_producto,
	"producto"=>$nombre_producto,
	"marca"=>$NombreMarca,
	"producto_mostrado"=>$nombre_producto." *".$NombreMarca."*".($nroGarantia>0 ? " (PROCESO DE GARANTIA)" : ""),
	"detalleproducto"=>$detalleproducto,
	"precio"=>floatval($precio_producto),
	"precio_formateado"=>number_format($precio_producto,'0',',','.'),
	"cantidad"=>floatval($cantidad_detalle),
	"cantidad_formateada"=>number_format($cantidad_detalle,'2',',','.'),
	"descuento"=>floatval($descuento),
	"descuento_formateado"=>number_format($descuento,'0',',','.'),
	"subtotal"=>floatval($subtotal),
	"subtotal_formateado"=>number_format($subtotal,'0',',','.'),
	"tipo_combo"=>$tipo_combo,
	"combo"=>$nombreCombo,
	"comision"=>$comision,
	"cod_detalle"=>$cod_detalle,
	"cod_venta"=>$cod_venta,
	"tipo_pago"=>$TipoPago,
	"numero_factura"=>$nrof,
	"fecha_venta"=>$fecha_venta,
	"telefono"=>$telefono,
	"en_garantia"=>intval($nroGarantia)>0
);

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' class='$styleDetalle'  name='tdDetalleVenta' onclick='$eventos' >
<td  id='td_datos_1' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_2' style='display:none'>".$nombre_producto." *".$NombreMarca."*</td>
<td   style='width:20%;".$styleG."'>".$nombre_producto." *".$NombreMarca."*".$tituloext."</td>
<td  id='td_datos_3' style='display:none'>".$detalleproducto."</td>
<td  id='td_datos_4' style='width:10%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($cantidad_detalle,'2',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_7' style='width:10%'>".number_format($subtotal,'0',',','.')."</td>
<td  id='td_datos_15' style='width:10%'>".$tipo_combo."</td>
<td  id='' style='width:10%'>".$nombreCombo."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$cod_detalle."</td>
<td  id='td_datos_10' style='display:none'>".$cod_venta."</td>
<td  id='td_datos_11' style='display:none'>".$TipoPago."</td>
<td  id='td_datos_12' style='display:none'>".$nrof."</td>
<td  id='td_datos_13' style='display:none'>".$fecha_venta."</td>
<td  id='td_datos_14' style='display:none'>".$telefono."</td>
</tr>
</table>";




}
}


$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina);
echo json_encode($informacion);	
exit;
}


function buscardatoscuenta($buscar)
{
	

$mysqli=conectar_al_servidor();
$fechahoy=date('Y-m-d');	
$sql= "select cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,cr.Nro_recibo,vt.TipoPago,dias,cr.descuento,cr.interes,cr.tipo,
(select fechapago from credito cr where cr.cod_venta='$buscar' order by  fechapago desc limit 1) as ultimaFechaPago
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 where vt.cod_venta='$buscar' order by  fechapago ";
 
$datos;
$idcredito = "";    
$plazo = "";  
$fechapago = "";          
$cod_venta ="";          
$MontoControl = "0"; 
$controlMonto = 0; 
$Monto = "0"; 
$totalPago = "0"; 
$Esado = "";          
$Nro_recibo = "";
$TipoPago ="";
$nroCuota ="0";
$dias ="10";
$interes ="0.10";
$descuento ="0";
$entrega ="0";
$ultimaFechaPago ="0";

 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$nroCuotas=0;
$controlStyle="";
if ($valor>0)
{
	$nroCuota=0;
while ($valor= mysqli_fetch_assoc($result))
{  

$tipo = utf8_encode($valor['tipo']); 
$ultimaFechaPago = utf8_encode($valor['ultimaFechaPago']);   
if($tipo!="ENTREGA"){
	$nroCuota++;
if($fechapago==""){
    
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
}
$nm = utf8_encode($valor['Monto']); 

if($MontoControl!=$nm){
	$MontoControl=$nm;
	$controlMonto=$controlMonto+1;
}
 
}else{
	$entrega = utf8_encode($valor['Monto']);
}

$nroCuotas=$nroCuotas+1;
}
}

 mysqli_close($mysqli);
$datos[0]=$idcredito;    
$datos[1]=$nroCuotas;  
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
$datos[14]=$controlMonto ;
$datos[15]=$ultimaFechaPago ;
return $datos;


}
 
function responderProductosVendidos($array)
{
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
    }

    echo json_encode($array, JSON_UNESCAPED_UNICODE);
    exit;
}

function errorProductosVendidos($mensaje, $detalle = "", $sql = "")
{
    $html = "
    <div style='padding:15px;background:#fff3cd;border:1px solid #ffeeba;color:#856404;border-radius:8px;margin:10px;font-size:13px;'>
        <b>Ocurrió un error al buscar productos vendidos.</b><br>
        " . htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8') . "<br>
        <small>" . htmlspecialchars($detalle, ENT_QUOTES, 'UTF-8') . "</small>
    </div>";

    responderProductosVendidos(array(
        "1" => "exito",
        "2" => $html,
        "3" => "0",
        "4" => "0",
        "5" => "0",
        "99" => 0,
        "error" => $mensaje,
        "detalle" => $detalle,
        "sql" => $sql
    ));
}

function limpiarTextoSQL($mysqli, $valor)
{
    return $mysqli->real_escape_string(trim((string)$valor));
}

function escaparHtml($valor)
{
    return htmlspecialchars((string)$valor, ENT_QUOTES, 'UTF-8');
}

function buscarproductovendidos($tipo, $codigo, $producto, $fecha1, $fecha2, $cod_local, $marca, $tipo_venta, $agrupacionproductovendidoinforme, $array_cod_filtro_productos_vendidos)
{
    $mysqli = conectar_al_servidor();
    $formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

    if (!$mysqli) {
        errorProductosVendidos("No se pudo conectar al servidor MySQL.");
    }

    if (method_exists($mysqli, "set_charset")) {
        $mysqli->set_charset("utf8mb4");
    }

    $tipo = limpiarTextoSQL($mysqli, $tipo);
    $codigo = limpiarTextoSQL($mysqli, $codigo);
    $producto = limpiarTextoSQL($mysqli, $producto);
    $fecha1 = limpiarTextoSQL($mysqli, $fecha1);
    $fecha2 = limpiarTextoSQL($mysqli, $fecha2);
    $cod_local = limpiarTextoSQL($mysqli, $cod_local);
    $marca = limpiarTextoSQL($mysqli, $marca);
    $tipo_venta = limpiarTextoSQL($mysqli, $tipo_venta);
    $agrupacionproductovendidoinforme = limpiarTextoSQL($mysqli, $agrupacionproductovendidoinforme);

    $condicionfecha = "";
    if ($fecha1 != "" && $fecha2 != "") {
        $condicionfecha = " AND vt.fecha_venta BETWEEN '" . $fecha1 . "' AND '" . $fecha2 . "' ";
    }

    $condicionCodLocal = "";
    if ($cod_local != "") {
        $condicionCodLocal = " AND vt.cod_local = '" . $cod_local . "' ";
    }

    $condiciontipo_venta = "";
    if ($tipo_venta != "") {
        $condiciontipo_venta = " AND vt.TipoVenta = '" . $tipo_venta . "' ";
    }

    $condicionMarca = "";
    if ($marca != "") {
        $condicionMarca = " AND pr.cod_marcasFK = '" . $marca . "' ";
    }

    $condicioncodigo = "";
    if ($codigo != "") {
        $condicioncodigo = " AND pr.cod_barra = '" . $codigo . "' ";
    }

    $condiciontipo = "";
    if ($tipo != "") {
        $condiciontipo = " AND pr.tipo = '" . $tipo . "' ";
    }

    $condicionproducto = "";
    if ($producto != "") {
        $condicionproducto = " AND CONCAT(pr.nombre_producto, ' ', pr.cod_producto) LIKE '%" . $producto . "%' ";
    }

    $condiciongroupby = "";

    if ($agrupacionproductovendidoinforme == "1") {
        $condiciongroupby = " GROUP BY pr.cod_producto ";
    } else if ($agrupacionproductovendidoinforme == "2") {
        $condiciongroupby = " GROUP BY dtv.cod_detalle ";
    } else if ($agrupacionproductovendidoinforme == "3") {
        $condiciongroupby = " GROUP BY pr.cod_categoriaFK ";
    } else if ($agrupacionproductovendidoinforme == "4") {
        $condiciongroupby = " GROUP BY pr.cod_marcasFK ";
    } else if ($agrupacionproductovendidoinforme == "5") {
        $condiciongroupby = " GROUP BY pr.CodProveedor ";
    }

    /*
        El JS manda:
        JSON.stringify(array_cod_filtro_productos_vendidos)

        Por eso acá puede llegar como texto JSON, no como array.
    */
    if (is_string($array_cod_filtro_productos_vendidos)) {
        $arrayTemporal = json_decode($array_cod_filtro_productos_vendidos, true);

        if (is_array($arrayTemporal)) {
            $array_cod_filtro_productos_vendidos = $arrayTemporal;
        } else {
            $array_cod_filtro_productos_vendidos = array();
        }
    }

    if (!is_array($array_cod_filtro_productos_vendidos)) {
        $array_cod_filtro_productos_vendidos = array();
    }

    $arrayCategorias = array();

    foreach ($array_cod_filtro_productos_vendidos as $valor) {
        $valor = trim((string)$valor);

        if ($valor == "") {
            continue;
        }

        $arrayCategorias[] = "'" . limpiarTextoSQL($mysqli, $valor) . "'";
    }

    $condicionCategoria = "";

    if (count($arrayCategorias) > 0) {
        $condicionCategoria = " AND pr.cod_categoriaFK IN (" . implode(",", $arrayCategorias) . ") ";
    }

    /*
        Se usan MAX() en las columnas que no son SUM()
        para evitar error en servidores con ONLY_FULL_GROUP_BY.
    */
    $sql = "
    SELECT 
        MAX(pr.cod_barra) AS cod_barra,
        MAX(pr.CodProveedor) AS CodProveedor,
        MAX(pr.cod_producto) AS cod_producto,
        MAX(pr.nombre_producto) AS nombre_producto,
        MAX(CONCAT(vt.puntoexpedicion, '-', vt.num_factura)) AS nroventa,

        SUM(dtv.cantidad_detalle) AS totalCantidad,
        MAX(vt.TipoVenta) AS TipoVenta,
        MAX(dtv.precio_producto) AS precio_producto,
        MAX(vt.fecha_venta) AS fecha_venta,

        MAX((SELECT descripcion FROM categoria WHERE cod_categoria = pr.cod_categoriaFK LIMIT 1)) AS NombreCategoria,
        MAX(pr.cod_categoriaFK) AS cod_categoriaFK,

        MAX((SELECT descripcion FROM marcas WHERE cod_marcas = pr.cod_marcasFK LIMIT 1)) AS NombreMarca,
        MAX(pr.cod_marcasFK) AS cod_marcasFK,

        SUM(dtv.subtotal) AS totalVenta,
        MAX(pr.tipo) AS tipo,

        SUM(IFNULL((SELECT punto FROM puntos WHERE cod_productoFK = dtv.cod_productoFK LIMIT 1), 0)) AS totalPuntaje,

        SUM(dtv.cantidad_detalle * dtv.subPrecioCompra) AS totalCosto,

        MAX((SELECT Nombre FROM local l WHERE l.cod_local = vt.cod_local LIMIT 1)) AS nombrelocal,

        MAX(dtv.subPrecioCompra) AS subPrecioCompra,
        MAX(dtv.cantidad_detalle) AS cantidad_detalle,
        MAX(vt.cod_venta) AS cod_venta

    FROM producto pr

    INNER JOIN detalle_venta dtv 
        ON dtv.cod_productoFK = pr.cod_producto

    INNER JOIN venta vt 
        ON vt.cod_venta = dtv.cod_ventaFK

    WHERE IFNULL((SELECT COUNT(fecha) FROM cambios WHERE coddetalleventa = dtv.cod_detalle AND motivo = 'Devolucion' LIMIT 1), 0) = 0

    AND IFNULL((SELECT COUNT(fecha) FROM cambios WHERE coddetalleventa = dtv.cod_detalle AND motivo = 'Cambio' LIMIT 1), 0) = 0

    AND IFNULL((SELECT COUNT(fecha) FROM cambios WHERE coddetalleventa = dtv.cod_detalle AND motivo = 'Garantia' LIMIT 1), 0) = 0

    AND IFNULL((SELECT COUNT(fecha) FROM cancelaciones WHERE cod_venta = vt.cod_venta LIMIT 1), 0) = 0

    " . $condicionfecha . "
    " . $condicionCodLocal . "
    " . $condicionCategoria . "
    " . $condicionMarca . "
    " . $condicioncodigo . "
    " . $condicionproducto . "
    " . $condiciontipo_venta . "
    " . $condiciontipo . "
    " . $condiciongroupby . "

    ORDER BY totalCantidad DESC
    ";

    $result = $mysqli->query($sql);

    if (!$result) {
        errorProductosVendidos("Error SQL en buscarproductovendidos", $mysqli->error, $sql);
    }

    $nroRegistro = mysqli_num_rows($result);

    $pagina = "";
    $filas = array();
    $totalventas = 0;
    $totalinvertido = 0;
    $styleName = "tableRegistroSearch";

    if ($nroRegistro > 0) {

        while ($valor = mysqli_fetch_assoc($result)) {

            $cod_producto = $valor['cod_producto'];
            $fecha_venta = $valor['fecha_venta'];
            $cod_barra = $valor['cod_barra'];
            $nombre_producto = $valor['nombre_producto'];
            $totalCantidad = (float)$valor['totalCantidad'];
            $totalVenta = (float)$valor['totalVenta'];
            $nombrelocal = $valor['nombrelocal'];
            $totalCosto = (float)$valor['totalCosto'];
            $NombreCategoria = $valor['NombreCategoria'];
            $NombreMarca = $valor['NombreMarca'];
            $nroventa = $valor['nroventa'];
            $TipoVenta = $valor['TipoVenta'];
            $cod_venta = $valor['cod_venta'];
            $CodProveedor = $valor['CodProveedor'];
            $tipoProducto = $valor['tipo'];
            $TotalPuntaje = (float)$valor['totalPuntaje'];

            $nroventas = "";
            $plazo = "";

            if ($agrupacionproductovendidoinforme == "2") {
                $nroventas = "<br><b><i>" . escaparHtml($nroventa) . "</i></b>";
                $plazo = obtener_plazo($cod_venta);
            }

            /*
                Para agrupaciones, mostramos un nombre más lógico.
            */
            if ($agrupacionproductovendidoinforme == "3") {
                $cod_barra = "";
                $nombre_producto = "Categoría: " . $NombreCategoria;
                $TipoVenta = "";
            } else if ($agrupacionproductovendidoinforme == "4") {
                $cod_barra = "";
                $nombre_producto = "Marca: " . $NombreMarca;
                $TipoVenta = "";
            } else if ($agrupacionproductovendidoinforme == "5") {
                $cod_barra = "";
                $nombre_producto = "Proveedor: " . $CodProveedor;
                $TipoVenta = "";
            }

            $Total = $totalVenta;

            $totalventas = $totalventas + $Total;
            $totalinvertido = $totalinvertido + $totalCosto;
            $ganancia = $Total - $totalCosto;

            $filas[] = array(
                "codigo" => $cod_barra,
                "producto" => $nombre_producto,
                "marca" => $NombreMarca,
                "categoria" => $NombreCategoria,
                "tipo_producto" => $tipoProducto,
                "cantidad" => $totalCantidad,
                "cantidad_formateada" => number_format($totalCantidad, 0, ',', '.'),
                "total_venta" => $Total,
                "total_venta_formateado" => number_format($Total, 0, ',', '.'),
                "total_costo" => $totalCosto,
                "total_costo_formateado" => number_format($totalCosto, 0, ',', '.'),
                "ganancia" => $ganancia,
                "ganancia_formateada" => number_format($ganancia, 0, ',', '.'),
                "tipo_venta" => $TipoVenta,
                "numero_venta" => $agrupacionproductovendidoinforme == "2" ? $nroventa : "",
                "plazo" => $plazo,
                "puntaje" => $TotalPuntaje,
                "puntaje_formateado" => number_format($TotalPuntaje, 0, ',', '.'),
                "local" => $nombrelocal
            );

            $styleName = CargarStyleTable($styleName);

            $pagina .= "
            <table class='" . escaparHtml($styleName) . "' border='1' cellspacing='1' cellpadding='5'>
                <tr id='tbSelecRegistro'>
                    <td style='width:10%'>" . escaparHtml($cod_barra) . "</td>
                    <td style='width:15%'>" . escaparHtml($nombre_producto) . $nroventas . "</td>
                    <td style='width:10%'>" . escaparHtml($NombreMarca) . "</td>
                    <td style='width:10%'>" . escaparHtml($NombreCategoria) . "</td>
                    <td style='width:5%'>" . escaparHtml($tipoProducto) . "</td>
                    <td style='width:5%'>" . number_format($totalCantidad, 0, ',', '.') . "</td>
                    <td style='width:5%'>" . number_format($Total, 0, ',', '.') . "</td>
                    <td style='width:5%'>" . number_format($totalCosto, 0, ',', '.') . "</td>
                    <td style='width:5%'>" . number_format($ganancia, 0, ',', '.') . "</td>
                    <td style='width:10%'>" . escaparHtml($TipoVenta) . "</td>
                    <td style='width:5%'>" . escaparHtml($plazo) . "</td>
                    <td style='width:5%'>" . number_format($TotalPuntaje, 0, ',', '.') . "</td>
                    <td style='width:5%'>" . escaparHtml($nombrelocal) . "</td>
                </tr>
            </table>";
        }
    }

    $informacion = array(
        "1" => "exito",
        "2" => $formato == 'json' ? $filas : $pagina,
        "3" => number_format($nroRegistro, 0, ',', '.'),
        "4" => number_format($totalventas, 0, ',', '.'),
        "5" => number_format($totalinvertido, 0, ',', '.'),
        "99" => $nroRegistro
    );

    responderProductosVendidos($informacion);
}


function buscarTotalVentaProducto($Condicion, $condicionCodLocal, $condiciontipo_venta, $condicionfecha)
{
    $mysqli = conectar_al_servidor();

    if (!$mysqli) {
        return array(0, 0);
    }

    if (method_exists($mysqli, "set_charset")) {
        $mysqli->set_charset("utf8mb4");
    }

    /*
        Dejo esta función corregida por si la usás en otra parte.
        En la función principal de arriba ya no hace falta llamarla.
    */
    $sql = "
    SELECT  
        (dtv.cantidad_detalle * dtv.precio_producto) AS total,
        IFNULL((SELECT punto FROM puntos WHERE cod_productoFK = dtv.cod_productoFK LIMIT 1), 0) AS puntaje

    FROM detalle_venta dtv

    INNER JOIN producto pr 
        ON pr.cod_producto = dtv.cod_productoFK

    INNER JOIN venta vt 
        ON vt.cod_venta = dtv.cod_ventaFK

    WHERE IFNULL((SELECT COUNT(fecha) FROM cancelaciones WHERE cod_venta = vt.cod_venta LIMIT 1), 0) = 0

    AND IFNULL((SELECT COUNT(fecha) FROM cambios WHERE coddetalleventa = dtv.cod_detalle AND motivo = 'Devolucion' LIMIT 1), 0) = 0

    AND IFNULL((SELECT COUNT(fecha) FROM cambios WHERE coddetalleventa = dtv.cod_detalle AND motivo = 'Cambio' LIMIT 1), 0) = 0

    AND IFNULL((SELECT COUNT(fecha) FROM cambios WHERE coddetalleventa = dtv.cod_detalle AND motivo = 'Garantia' LIMIT 1), 0) = 0

    " . $Condicion . "
    " . $condicionCodLocal . "
    " . $condiciontipo_venta . "
    " . $condicionfecha;

    $result = $mysqli->query($sql);

    if (!$result) {
        return array(0, 0);
    }

    $totalVenta = 0;
    $totalPuntaje = 0;

    while ($valor = mysqli_fetch_assoc($result)) {
        $totalVenta += (float)$valor['total'];
        $totalPuntaje += (float)$valor['puntaje'];
    }

    mysqli_close($mysqli);

    return array($totalVenta, $totalPuntaje);
}


function obtener_plazo($cod_venta)
{
    $mysqli = conectar_al_servidor();

    if (!$mysqli) {
        return 0;
    }

    if (method_exists($mysqli, "set_charset")) {
        $mysqli->set_charset("utf8mb4");
    }

    $cod_venta = $mysqli->real_escape_string((string)$cod_venta);

    /*
        Evité el nombre fijo de base de datos:
        dsbvhebx_electroguaioficial.credito

        En localhost puede existir, pero en otro servidor puede cambiar.
    */
    $sql = "SELECT COUNT(idcredito) AS contador FROM credito WHERE cod_venta = '" . $cod_venta . "'";

    $result = $mysqli->query($sql);

    if (!$result) {
        mysqli_close($mysqli);
        return 0;
    }

    $row = mysqli_fetch_assoc($result);

    $contador = 0;

    if ($row && isset($row["contador"])) {
        $contador = (int)$row["contador"];
    }

    mysqli_close($mysqli);

    return $contador;
}
 



function  buscarmasproductovendidos($codigo,$producto,$fecha1,$fecha2,$cod_local,$categoria,$marca,$totalventa,$totalinvertidos,$tipo_venta,$registrocargado,$agrupacionproductovendidoinforme)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	 $condicionfecha="and vt.fecha_venta>='".$fecha1."' and vt.fecha_venta<='".$fecha2."'";
		 if($fecha1=="" && $fecha2==""){
			$condicionfecha=" "; 
		 }
		 $condicionCodLocal=" and vt.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		 
		 $condiciontipo_venta=" and vt.TipoVenta='$tipo_venta' ";
		 if($tipo_venta==""){
			$condiciontipo_venta=" "; 
		 }
		 $condicionCategoria=" and pr.cod_categoriaFK='$categoria' ";
		 if($categoria==""){
			$condicionCategoria=""; 
		 }
		 $condicionMarca=" and pr.cod_marcasFK='$marca' ";
		 if($marca==""){
			$condicionMarca=""; 
		 }
		 $condicioncodigo=" and pr.cod_barra='$codigo' ";
		 if($codigo==""){
			$condicioncodigo=""; 
		 }
		 $condicionproducto="and concat(pr.nombre_producto,' ',pr.cod_producto) like '%".$producto."%' ";
		 if($producto==""){
			$condicionproducto=""; 
		 }

	$condiciongroupby="";
	if($agrupacionproductovendidoinforme=="1"){
		$condiciongroupby=" group by pr.cod_producto ";
	}
	if($agrupacionproductovendidoinforme=="2"){
		$condiciongroupby= " group by dtv.cod_detalle  ";
	}
		
$sql= "select pr.cod_barra,pr.nombre_producto,concat(puntoexpedicion,'-',num_factura) as nroventa,
sum(dtv.cantidad_detalle) as totalCantidad,vt.TipoVenta,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
sum(dtv.subtotal) as totalVenta,
sum(dtv.cantidad_detalle*dtv.subPrecioCompra) as totalCosto,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK 
where  IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0)=0
and IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0)=0
and IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0)=0
and  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  
 ".$condicionfecha.$condicionCodLocal.$condicionCategoria.$condicionMarca.$condicioncodigo.$condicionproducto.$condiciontipo_venta.$condiciongroupby." order by totalCantidad desc limit ".$registrocargado.", 50 ";
 



$pagina = "";
$filas = array();

// $totalpagado = "0";   
$totalventas = $totalventa;   
$totalinvertido = $totalinvertidos;   
$stmt = $mysqli->prepare($sql);
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



$cod_producto = utf8_encode($valor['cod_barra']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$totalCantidad = utf8_encode($valor['totalCantidad']);          
$totalVenta = utf8_encode($valor['totalVenta']); 
$nombrelocal = utf8_encode($valor['nombrelocal']); 
$totalCosto = utf8_encode($valor['totalCosto']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$nroventa = utf8_encode($valor['nroventa']); 
$TipoVenta = utf8_encode($valor['TipoVenta']); 

$totalventas=$totalventas+$totalVenta;
$totalinvertido=$totalinvertido+$totalCosto;
$nroventas="";
if($agrupacionproductovendidoinforme=="2"){
		$nroventas="<br><b><i>".$nroventa."</i></b>";
	}
$ganancia=$totalVenta-$totalCosto;
$filas[]=array(
	"codigo"=>$cod_producto,
	"producto"=>$nombre_producto,
	"marca"=>$NombreMarca,
	"categoria"=>$NombreCategoria,
	"tipo_producto"=>"",
	"cantidad"=>floatval($totalCantidad),
	"cantidad_formateada"=>number_format($totalCantidad,'2',',','.'),
	"total_venta"=>floatval($totalVenta),
	"total_venta_formateado"=>number_format($totalVenta,'0',',','.'),
	"total_costo"=>floatval($totalCosto),
	"total_costo_formateado"=>number_format($totalCosto,'0',',','.'),
	"ganancia"=>floatval($ganancia),
	"ganancia_formateada"=>number_format($ganancia,'0',',','.'),
	"tipo_venta"=>$TipoVenta,
	"numero_venta"=>$agrupacionproductovendidoinforme=="2" ? $nroventa : "",
	"plazo"=>"",
	"puntaje"=>0,
	"puntaje_formateado"=>"0",
	"local"=>$nombrelocal
);
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'   >
<td id='' style='width:10%'>".$cod_producto."</td>
<td id='' style='width:20%'>".$nombre_producto.$nroventas."</td>
<td id='' style='width:10%'>".$NombreMarca."</td>
<td id='' style='width:10%'>".$NombreCategoria."</td>
<td  id='' style='width:10%'>".number_format($totalCantidad,'2',',','.') ."</td>
<td  id='' style='width:10%'>".number_format($totalVenta,'0',',','.')."</td>
<td  id='' style='width:10%'>".$TipoVenta."</td>
<td  id='' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";


}
}

  
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($totalventas,'0',',','.'),"5" => number_format($totalinvertido,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}


function  BuscarRegistroDevolucion($buscar,$cod_local)
{
$mysqli=conectar_al_servidor();
$condicionCodLocal=" and vt.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
$sql= "select pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,dtv.detalleproducto,vt.total_venta,dtv.comision,vt.puntoexpedicion,vt.num_factura,vt.fecha_venta,vt.TipoPago,dtv.estado,IFNULL(dtv.descuento,0) as descuento,
IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado,
(Select fechapago from credito where cod_venta=vt.cod_venta order by fechapago asc limit 1) as fechaprimerpago,
IFNULL((Select Monto from credito where cod_venta=vt.cod_venta  limit 1),0) as Monto,
(Select count(fechapago) from credito where cod_venta=vt.cod_venta) as cantidadcuota,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
 where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  and concat(pr.cod_producto,' ',pr.nombre_producto,' ',vt.num_factura,' ',(Select telefono from persona where cod_persona=cod_clienteFK),' ',(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK),' ',(Select ci_cliente from cliente where cod_cliente=cod_clienteFK)) like '%".$buscar."%' ".$condicionCodLocal." 
 order by vt.cod_venta desc limit 500";

$pagina = "";   
$totalventa = "0";   
$totalpagado = "0";   
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



$cod_producto = utf8_encode($valor['cod_producto']);   
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$cod_ventaFK = utf8_encode($valor['cod_ventaFK']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$totalventa = utf8_encode($valor['total_venta']); 
$totalpagado = utf8_encode($valor['totalpagado']); 
$comision = utf8_encode($valor['comision']); 
$num_factura = utf8_encode($valor['num_factura']); 
$fecha_venta = utf8_encode($valor['fecha_venta']); 
$clientenombre = utf8_encode($valor['clientenombre']); 
$cantidadcuota = utf8_encode($valor['cantidadcuota']); 
$fechaprimerpago = utf8_encode($valor['fechaprimerpago']); 
$Monto = utf8_encode($valor['Monto']); 
$estado = utf8_encode($valor['estado']); 
$TipoPago = utf8_encode($valor['TipoPago']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$detalleproducto = utf8_encode($valor['detalleproducto']); 
$descuento = utf8_encode($valor['descuento']); 
$styleG=""; 
$styleDetalle=""; 
$eventos="obtenerdatosabmdetalleventaDevoluciones(this)";

  if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' class='$styleDetalle' onclick='$eventos'>
<td id='td_datos_9'  style='width:10%'>".$clientenombre."</td>
<td id='td_datos_18'  style='width:10%'>".$nrof."</td>
<td id='td_datos_1'  style='display:none'>".$num_factura."</td>
<td id='td_datos_2'  style='width:10%'>".$fecha_venta."</td>
<td id='td_datos_3'  style='display:none'>".$cod_producto."</td>
<td id='td_datos_4'  style='display:none'>".$cod_detalle."</td>
<td  id='td_datos_5' style='width:20%;".$styleG."'>".$nombre_producto."</td>
<td  id='td_datos_6' style='width:5%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_7' style='width:5%'>".number_format($cantidad_detalle,'2',',','.')."</td>
<td  id='td_datos_20' style='width:5%'>".number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_8' style='width:5%'>".number_format($subtotal,'0',',','.')."</td>
<td  id='td_datos_10' style='display:none'>".$comision."</td>
<td  id='td_datos_11' style='display:none'>".number_format($totalpagado,'0',',','.')."</td>
<td  id='td_datos_12' style='display:none'>".number_format($totalventa,'0',',','.')."</td>
<td  id='td_datos_15' style='display:none'>".number_format($Monto,'0',',','.')."</td>
<td  id='td_datos_13' style='display:none'>".$cantidadcuota."</td>
<td  id='td_datos_14' style='display:none'>".$fechaprimerpago."</td>
<td  id='td_datos_16' style='display:none'>".$TipoPago."</td>
<td  id='td_datos_17' style='display:none'>".$cod_ventaFK."</td>
<td  id='td_datos_19' style='display:none'>".$detalleproducto."</td>
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => number_format($totalventa,'0',',','.'),"4" => number_format($totalpagado,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function  buscarexpedientes($cliente)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

$sql= "select vt.puntoexpedicion,vt.num_factura,pr.cod_producto,pr.nombre_producto,dtv.descuento,dtv.cod_detalle,vt.total_venta,IFNULL(dtv.comision,0) as comision,dtv.estado,dtv.detalleproducto,
IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where vt.cod_clienteFK='$cliente'";
$controlVentas="";
$pagina = "";
$filas = array();
$totalventa = "0";   
$totalpagado = "0";   
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



$cod_producto = utf8_encode($valor['cod_producto']); 
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$cod_ventaFK = utf8_encode($valor['cod_ventaFK']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$totalventa = utf8_encode($valor['total_venta']); 
$totalpagado = utf8_encode($valor['totalpagado']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$num_factura = utf8_encode($valor['num_factura']); 
$detalleproducto = utf8_encode($valor['detalleproducto']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']); 
$descuento = utf8_encode($valor['descuento']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$styleG=""; 
$styleDetalle=""; 



$tituloPagos="";
if($controlVentas!=$cod_ventaFK){
	$tituloPagos="<p class='ptituloZ'>Nro de Factura: ".$num_factura."</p>";
	$controlVentas=$cod_ventaFK;
}

if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}

$filas[]=array(
	"numero_factura"=>$nrof,
	"cod_producto"=>$cod_producto,
	"cod_detalle"=>$cod_detalle,
	"producto"=>$nombre_producto,
	"marca"=>$NombreMarca,
	"producto_mostrado"=>$nombre_producto." *".$NombreMarca."*",
	"cantidad"=>floatval($cantidad_detalle),
	"cantidad_formateada"=>number_format($cantidad_detalle,'2',',','.'),
	"precio"=>floatval($precio_producto),
	"precio_formateado"=>number_format($precio_producto,'0',',','.'),
	"descuento"=>floatval($descuento),
	"descuento_formateado"=>number_format($descuento,'0',',','.'),
	"subtotal"=>floatval($subtotal),
	"subtotal_formateado"=>number_format($subtotal,'0',',','.'),
	"cod_venta"=>$cod_ventaFK
);


$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  class='$styleDetalle' >
<td id=''  style='width:10%'>".$nrof."</td>
<td  id='' style='width:20%'>".$nombre_producto." *".$NombreMarca."*</td>
<td  id='' style='width:10%'>".number_format($cantidad_detalle,'2',',','.')."</td>
<td  id='' style='width:10%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='' style='width:10%'>".number_format($descuento,'0',',','.') ."</td>
<td  id='' style='width:10%'>".number_format($subtotal,'0',',','.') ."</td>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function comisionvendedor($fecha1,$fecha2,$vendedor,$fechafiltro,$Descuento,$Flete,$cliente,$Local,$producto,$tipo_venta)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

$condicionfecha="";
if($fecha1 !="" && $fecha2 !=""){
$condicionfecha=" and vt.fecha_venta>='$fecha1' and vt.fecha_venta<='$fecha2' ";	
}
$condicionfechafiltro="";
if($fechafiltro !="" ){
$condicionfechafiltro=" and vt.fecha_venta='$fechafiltro' ";	
}

$condiciontipo_venta="";
if($tipo_venta !="" ){
$condiciontipo_venta=" and vt.TipoVenta='$tipo_venta' ";	
}

$condicionfechaVendedor="";
if($vendedor !="" ){
$condicionfechaVendedor=" and (Vendedor1='$vendedor' or Vendedor2='$vendedor')";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%' ";
}

$condicioncliente="";
if($cliente!=""){
	$condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%".$cliente."%' ";
}

$condicionLocal="";
if($Local!=""){
	$condicionLocal=" and vt.cod_local = '".$Local."' ";
}


$condicionDescuento="";
if($Descuento==""){
	$condicionDescuento=" and pr.cod_producto != '13603' ";
}

$condicionFlete="";
if($Flete==""){
	$condicionFlete=" and pr.cod_producto != '13753' ";
}


$sql= "select pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,vt.puntoexpedicion,vt.total_venta,dtv.comision,vt.num_factura,vt.fecha_venta,vt.Vendedor1,vt.Vendedor2,dtv.estado,vt.TipoVenta,
IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado,
(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
IFNULL((SELECT punto FROM puntos where cod_productoFK = dtv.cod_productoFK),0) as puntaje,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as Cliente,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra
 from  producto pr 
 inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where  dtv.cod_detalle!='0' and IFNULL((Select count(fecha) from cancelaciones cl where cl.cod_venta=vt.cod_venta limit 1),0)=0 ".$condicionfecha.$condicionfechafiltro.$condicionfechaVendedor.$condicionproducto.$condicionDescuento.$condicionFlete.$condicioncliente.$condicionLocal.$condiciontipo_venta." group by dtv.cod_detalle limit 100";

// echo $sql;
// exit;

$pagina = "
<table style='display:none'>
<tr>
<td><b>VENDEDOR</b></td>
<td><b>NRO. FACT</b></td>
<td><b>F-VENTA</b></td>
<td><b>PRODUCTO</b></td>
<td><b>COSTO</b></td>
<td><b>CANT.</b></td>
<td><b>TIPO</b></td>
<td><b>PUNTAJE</b></td>
<td><b>LOCAL</b></td>
</tr>
</table>
";   
$filas = array();

$totalacobrar = "0";   
$totalventas = "0";   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$registrocargados=0;
$styleName="tableRegistroSearch";
$acobrar="";
$styleDetalle=""; 
$styleG=""; 
$TotalDescuento="0";


if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$Cliente = utf8_encode($valor['Cliente']);
$cod_producto = utf8_encode($valor['cod_producto']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$cod_ventaFK = utf8_encode($valor['cod_ventaFK']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$totalventa = utf8_encode($valor['total_venta']); 
$totalpagado = utf8_encode($valor['totalpagado']); 
$comision = utf8_encode($valor['comision']); 
$num_factura = utf8_encode($valor['num_factura']); 
$fecha_venta = utf8_encode($valor['fecha_venta']); 
$Vendedor1 = utf8_encode($valor['Vendedor1']); 
$Vendedor2 = utf8_encode($valor['Vendedor2']); 
$estado = utf8_encode($valor['estado']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);   
$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);   
$nombrevendedor2 = utf8_encode($valor['nombrevendedor2']);  
$nombrelocal = utf8_encode($valor['nombrelocal']);  
$TipoVenta = utf8_encode($valor['TipoVenta']);  
$puntaje = utf8_encode($valor['puntaje']);  
$vendedores=$nombrevendedor1;
$vendedores.="<br>".$nombrevendedor2;
$totalventa=$precio_producto*$cantidad_detalle;


if($comision>0){


$comisionmonto=($subtotal*$comision)/100;
$styleG=""; 
$styleDetalle=""; 


$controlComision=0;
if($Vendedor1!=""){
$controlComision=$controlComision+1;	
}
if($Vendedor2!=""){
$controlComision=$controlComision+2;	
}
if($controlComision==0){
$controlComision=1;
}
$totalVentaDetalle=$precio_producto*$cantidad_detalle;
$acobrar=$comisionmonto/$controlComision;

}
$totalventas=$totalventas+$totalventa;
$totalacobrar=$totalacobrar+$acobrar;
			
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}

$filas[]=array(
	"vendedor"=>trim($nombrevendedor1.(($nombrevendedor1!="" && $nombrevendedor2!="") ? " / " : "").$nombrevendedor2),
	"numero_factura"=>$nrof,
	"cliente"=>$Cliente,
	"fecha_venta"=>$fecha_venta,
	"producto"=>$nombre_producto,
	"precio"=>floatval($precio_producto),
	"precio_formateado"=>number_format($precio_producto,'0',',','.'),
	"cantidad"=>floatval($cantidad_detalle),
	"cantidad_formateada"=>number_format($cantidad_detalle,'0',',','.'),
	"tipo_venta"=>$TipoVenta,
	"puntaje"=>floatval($puntaje),
	"local"=>$nombrelocal,
	"comision"=>floatval($acobrar)
);

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' class='$styleDetalle' >
<td  id='' style='width:10%'>".$vendedores."</td>
<td  id='' style='width:5%'>".$nrof."</td>
<td  id='' style='width:10%'>".$Cliente."</td>
<td  id='' style='width:10%'>".$fecha_venta."</td>
<td  id='' style='width:15%;".$styleG."'>".$nombre_producto."</td>
<td  id='' style='width:5%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='' style='width:5%'>".number_format($cantidad_detalle,'0',',','.')." </td>
<td  id='' style='width:5%'>".$TipoVenta." </td>
<td  id='' style='width:5%'>".$puntaje." </td>
<td  id='' style='width:5%'>".$nombrelocal." </td>
</tr>
</table>";
$registrocargados=$registrocargados+1;


if($cod_producto=="13603"){
	$TotalDescuento = $TotalDescuento + $precio_producto ;
}

}
}

$sql= "select pr.cod_producto
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where  dtv.cod_detalle!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ".$condicionfecha.$condicionfechafiltro.$condicionfechaVendedor.$condicionproducto.$condicionDescuento.$condicionFlete.$condicioncliente.$condicionLocal.$condiciontipo_venta." group by dtv.cod_detalle "; 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistros=$valor;

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($totalacobrar,'0',',','.'),"4" => number_format($totalventas,'0',',','.'),"5"=>$nroRegistro,"99"=>$registrocargados,"100"=>$totalregistros,"101"=> number_format($TotalDescuento,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function mascomisionvendedor($fecha1,$fecha2,$vendedor,$fechafiltro,$registrocargado,$totalcomision,$totalventa,$registroscargados,$Descuento,$Flete,$producto,$totalDescuento,$cliente,$Local,$tipo_venta)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

$condicionfecha="";
if($fecha1 !="" && $fecha2 !=""){
$condicionfecha=" and vt.fecha_venta>='$fecha1' and vt.fecha_venta<='$fecha2' ";	
}
$condicionfechafiltro="";
if($fechafiltro !="" ){
$condicionfechafiltro=" and vt.fecha_venta='$fechafiltro' ";	
}
$condicionfechaVendedor="";
if($vendedor !="" ){
$condicionfechaVendedor=" and (Vendedor1='$vendedor' or Vendedor2='$vendedor')";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%' ";
}
$condiciontipo_venta="";
if($tipo_venta !="" ){
$condiciontipo_venta=" and vt.TipoVenta='$tipo_venta' ";	
}
$condicioncliente="";
if($cliente!=""){
	$condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) like '%".$cliente."%' ";
}
$condicionLocal="";
if($Local!=""){
	$condicionLocal=" and vt.cod_local = '".$Local."' ";
}


$condicionDescuento="";
if($Descuento==""){
	$condicionDescuento=" and pr.cod_producto != '13603' ";
}

$condicionFlete="";
if($Flete==""){
	$condicionFlete=" and pr.cod_producto != '13753' ";
}

$sql= "select pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,vt.puntoexpedicion,vt.total_venta,dtv.comision,vt.num_factura,vt.fecha_venta,vt.Vendedor1,vt.Vendedor2,dtv.estado,vt.TipoVenta,
IFNULL((select sum(pg.Monto) from pago pg  where vt.cod_venta=pg.cod_venta_fk),0) as totalpagado,
(Select nombre from vendedor where idvendedor=Vendedor1) as nombrevendedor1,
(Select nombre from vendedor where idvendedor=Vendedor2) as nombrevendedor2,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as Cliente,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
IFNULL((SELECT punto FROM puntos where cod_productoFK = dtv.cod_productoFK),0) as puntaje,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK
where  dtv.cod_detalle!='0' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ".$condicionfecha.$condicionfechafiltro.$condicionfechaVendedor.$condicionproducto.$condicionDescuento.$condicionFlete.$condicioncliente.$condicionLocal.$condiciontipo_venta." group by dtv.cod_detalle limit ".$registrocargado." , 100 ";

$pagina = "";
$filas = array();
$acobrar="";
$styleDetalle=""; 
$styleG=""; 

$totalacobrar =$totalcomision;   
$totalventas = $totalventa;   
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargado;
$registrocargados=$registroscargados;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$Cliente = utf8_encode($valor['Cliente']);
$cod_producto = utf8_encode($valor['cod_producto']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']); 
$cod_productoFK = utf8_encode($valor['cod_productoFK']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$cod_ventaFK = utf8_encode($valor['cod_ventaFK']); 
$subPrecioCompra = utf8_encode($valor['subPrecioCompra']); 
$subtotal = utf8_encode($valor['subtotal']); 
$totalventa = utf8_encode($valor['total_venta']); 
$totalpagado = utf8_encode($valor['totalpagado']); 
$comision = utf8_encode($valor['comision']); 
$num_factura = utf8_encode($valor['num_factura']); 
$fecha_venta = utf8_encode($valor['fecha_venta']); 
$Vendedor1 = utf8_encode($valor['Vendedor1']); 
$Vendedor2 = utf8_encode($valor['Vendedor2']); 
$estado = utf8_encode($valor['estado']); 
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);   
$nombrevendedor1 = utf8_encode($valor['nombrevendedor1']);   
$nombrevendedor2 = utf8_encode($valor['nombrevendedor2']);  
$nombrelocal = utf8_encode($valor['nombrelocal']);  
$TipoVenta = utf8_encode($valor['TipoVenta']);  
$puntaje = utf8_encode($valor['puntaje']);  
$totalventa=$precio_producto*$cantidad_detalle;
$vendedores=$nombrevendedor1;
$vendedores.="<br>".$nombrevendedor2;
if($comision>0){


$comisionmonto=($subtotal*$comision)/100;
$styleG=""; 
$styleDetalle=""; 


$controlComision=0;
if($Vendedor1!=""){
$controlComision=$controlComision+1;	
}
if($Vendedor2!=""){
$controlComision=$controlComision+2;	
}
if($controlComision==0){
$controlComision=1;
}
$totalVentaDetalle=$precio_producto*$cantidad_detalle;
$acobrar=$comisionmonto/$controlComision;

}
$totalventas=$totalventas+$totalventa;
$totalacobrar=$totalacobrar+$acobrar;
			
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' class='$styleDetalle' >
<td  id='' style='width:10%'>".$vendedores."</td>
<td  id='' style='width:5%'>".$nrof."</td>
<td  id='' style='width:10%'>".$Cliente."</td>
<td  id='' style='width:10%'>".$fecha_venta."</td>
<td  id='' style='width:15%;".$styleG."'>".$nombre_producto."</td>
<td  id='' style='width:5%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='' style='width:5%'>".number_format($cantidad_detalle,'0',',','.')." </td>
<td  id='' style='width:5%'>".$TipoVenta." </td>
<td  id='' style='width:5%'>".$puntaje." </td>
<td  id='' style='width:5%'>".$nombrelocal." </td>
</tr>
</table>";
$registrocargados=$registrocargados+1;

if($cod_producto=="13603"){
	$totalDescuento = $totalDescuento + $precio_producto ;
}

$filas[]=array(
	"vendedor"=>trim($nombrevendedor1.(($nombrevendedor1!="" && $nombrevendedor2!="") ? " / " : "").$nombrevendedor2),
	"numero_factura"=>$nrof,
	"cliente"=>$Cliente,
	"fecha_venta"=>$fecha_venta,
	"producto"=>$nombre_producto,
	"precio"=>floatval($precio_producto),
	"precio_formateado"=>number_format($precio_producto,'0',',','.'),
	"cantidad"=>floatval($cantidad_detalle),
	"cantidad_formateada"=>number_format($cantidad_detalle,'0',',','.'),
	"tipo_venta"=>$TipoVenta,
	"puntaje"=>floatval($puntaje),
	"local"=>$nombrelocal,
	"comision"=>floatval($acobrar)
);
}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($totalacobrar,'0',',','.'),"4" => number_format($totalventas,'0',',','.'),"5"=>$registrocargados,"99"=>$nroRegistro , "101"=>number_format($totalDescuento,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarnroventab()
{
	
	
	$mysqli=conectar_al_servidor();
	 $sql= "Select count(cod_venta) from venta ";
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}

$result = $stmt->get_result();
$NroVenta=$result->fetch_row();
  $NroVenta=$NroVenta[0];
  $NroVenta=$NroVenta;
 if($NroVenta<10){
	 $NroVenta="0000".$NroVenta;
 }else{
 if($NroVenta<100){
	 $NroVenta="000".$NroVenta;
 }else{
	 if($NroVenta<1000){
	 $NroVenta="00".$NroVenta;
    } 
 }
 }
  mysqli_close($mysqli); 
 return $NroVenta;

}

function buscarHistorialGarantia($nrofactura,$cod_local,$documento,$cliente,$estado,$fecha1,$fecha2,$condicionSelecFecha)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
$fechahoy=date('Y-m-d');	


if($estado != ''){
	
	
	$condicionestado="";
	if($estado!=""){
	$condicionestado=" and gt.estado='$estado'";
	}

	$condicionestadogp="";
	if($estado!=""){
	$condicionestadogp=" and gtp.estado='$estado'";
	}
	
	
}else{
	$condicionestado=" and gt.estado != 'sin garantia' ";
	
	$condicionestadogp=" and gtp.estado != 'sin garantia' ";
}



$condicionnrofactura="";
if($nrofactura!=""){
$condicionnrofactura=" and vt.num_factura like '%".$nrofactura."%' ";
}
$condicionCodLocal=" "; 
if($cod_local!=""){
$condicionCodLocal=" and vt.cod_local='$cod_local' ";
}

$condicionCodLocalGP=" "; 
if($cod_local!=""){
$condicionCodLocalGP=" and gtp.cod_localFK='$cod_local' ";
}

$condiciondocumento="";
if($documento!=""){
$condiciondocumento=" and (Select ci_cliente from cliente where cod_cliente=cod_clienteFK ) = '".$documento."' ";
}
$condicioncliente="";
if($cliente!=""){
$condicioncliente=" and (Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%".$cliente."%' ";
}

$condicionFecha = '';
if($condicionSelecFecha != ''){
	if($condicionSelecFecha == '1'){
		$condicionFecha =" and fecharecibido BETWEEN '$fecha1' and '$fecha2'";
	}
	
	if($condicionSelecFecha == "2"){
		$condicionFecha =" and fechaenvio BETWEEN '$fecha1' and '$fecha2'";
	}
	
	if($condicionSelecFecha == "3"){
		$condicionFecha =" and fechadevuelto BETWEEN '$fecha1' and '$fecha2'";
	}
	
	if($condicionSelecFecha == "4"){
		$condicionFecha =" and fechaentrega BETWEEN '$fecha1' and '$fecha2'";
	}
}

$sql= "select gt.idgarantia,gt.fecharecibido,gt.fechaenvio,gt.fechaentrega,gt.fechadevuelto,gt.fecha_anulado,gt.observacion,gt.estado,gt.cod_ventaFK,
pr.cod_producto,pr.nombre_producto,vt.puntoexpedicion,vt.num_factura,
(Select ci_cliente from cliente where cod_cliente=cod_clienteFK ) as nrodocliente,
 telefonoaviso as telefono,
 'VENTA' as tipo,
 0 as cantidad,
(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) as clientenombre,
(Select nombre_persona from persona where cod_persona=cod_usuarioFKRecibido) as usuariorecibidopor,
(Select nombre_persona from persona where cod_persona=cod_usuarioFkEnvio) as usuarioenviado,
(Select nombre_persona from persona where cod_persona=cod_usuarioFkDevuelto) as usuariolisto,
(Select nombre_persona from persona where cod_persona=cod_usuarioFkEntrega) as usuarioentrega,
(Select nombre_persona from persona where cod_persona=cod_usuarioFKAnula) as usuarioanula
from garantias gt inner join venta vt on vt.cod_venta=gt.cod_ventaFK 
inner join detalle_venta dtv on dtv.cod_ventaFK=vt.cod_venta
inner join producto pr on dtv.cod_productoFK=pr.cod_producto 
where gt.idgarantia!='' ".$condicionestado.$condicionnrofactura.$condicionCodLocal.$condiciondocumento.$condicioncliente.$condicionFecha." group by gt.idgarantia";
 
 
 if($condicionnrofactura =='' && $condiciondocumento == '' && $condicioncliente == ''){
 
 $sql2 = "
 
 UNION

select gtp.idgarantiaproducto as idgarantia,gtp.fecharecibido,
gtp.fechaenvio,gtp.fechaentrega,gtp.fechadevuelto,gtp.fecha_anulado,gtp.observacion,gtp.estado,0 as cod_ventaFK,
pr.cod_producto,pr.nombre_producto, 0 as puntoexpedicion, 0 as num_factura,
0 as nrodocliente,
 0 as telefono,
  'DIRECTO' as tipo,
  cantidad,
0 as clientenombre,
(Select nombre_persona from persona where cod_persona=cod_usuarioFKRecibido) as usuariorecibidopor,
(Select nombre_persona from persona where cod_persona=cod_usuarioFkEnvio) as usuarioenviado,
(Select nombre_persona from persona where cod_persona=cod_usuarioFkDevuelto) as usuariolisto,
(Select nombre_persona from persona where cod_persona=cod_usuarioFkEntrega) as usuarioentrega,
(Select nombre_persona from persona where cod_persona=cod_usuarioFKAnula) as usuarioanula
from garantias_producto gtp inner join producto pr on gtp.cod_productoFK=pr.cod_producto 
where gtp.idgarantiaproducto!=''  ".$condicionestadogp.$condicionCodLocalGP.$condicionFecha." group by gtp.idgarantiaproducto  order by idgarantia desc";
 
 
 $sql.= $sql2;
 
 }
// echo $sql;
 // exit;
 
$pagina="";
$filas=array();

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


$idgarantia = utf8_encode($valor['idgarantia']); 
$fecharecibido = utf8_encode($valor['fecharecibido']);  
$fechaenvio = utf8_encode($valor['fechaenvio']);          
$fechadevuelto = utf8_encode($valor['fechadevuelto']);          
$fechaentrega = utf8_encode($valor['fechaentrega']);          
$observacion = utf8_encode($valor['observacion']);          
$estado = utf8_encode($valor['estado']); 
$estadox = utf8_encode($valor['estado']); 
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$num_factura = utf8_encode($valor['num_factura']);
$nrodocliente = utf8_encode($valor['nrodocliente']);
$clientenombre = utf8_encode($valor['clientenombre']);
$telefono = utf8_encode($valor['telefono']);
$usuariorecibidopor = utf8_encode($valor['usuariorecibidopor']);
$usuarioenviado = utf8_encode($valor['usuarioenviado']);
$usuariolisto = utf8_encode($valor['usuariolisto']);
$usuarioentrega = utf8_encode($valor['usuarioentrega']);
$usuarioanula = utf8_encode($valor['usuarioanula']);
$tipo = utf8_encode($valor['tipo']);
$cantidad = utf8_encode($valor['cantidad']);
$fecha_anulado = utf8_encode($valor['fecha_anulado']);


if($estado=="Pendiente a verificar"){
	$estado="PENDIENTE A VERIFICAR";
}
if($estado=="verificacion"){
	$estado="EN VERIFICACION";
}
if($estado=="entregado"){
		$estado="ENTREGADO";
}
if($estado=="listo"){
		$estado="LISTO PARA ENTREGAR";
}

if($estado=="sin garantia"){
		$estado="SIN GARANTÍA";
}

$tituloUsuarios="
Cargado: ".$usuariorecibidopor."
<br>
A verificacion: ".$usuarioenviado."
<br>
Listo para entregar: ".$usuariolisto."
<br>
Entregado por : ".$usuarioentrega."
<br>
Anulado por : ".$usuarioanula;

$tituloFechas="
Cargado : ".$fecharecibido."
<br>
A verificacion : ".$fechaenvio."
<br>
Listo para entregar : ".$fechadevuelto."
<br>
Entregado : ".$fechaentrega."
<br>
 Anulado : ".$fecha_anulado;



if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}

$filas[]=array(
	"id_garantia"=>$idgarantia,
	"numero_factura"=>$nrof,
	"documento"=>$nrodocliente,
	"cliente"=>$clientenombre,
	"telefono"=>$telefono,
	"producto"=>$nombre_producto,
	"cantidad"=>floatval($cantidad),
	"cantidad_formateada"=>number_format($cantidad,'2',',','.'),
	"observacion"=>$observacion,
	"estado"=>$estado,
	"estado_codigo"=>$estadox,
	"tipo"=>$tipo,
	"fechas"=>"Cargado: ".$fecharecibido." | A verificacion: ".$fechaenvio." | Listo: ".$fechadevuelto." | Entregado: ".$fechaentrega." | Anulado: ".$fecha_anulado,
	"usuarios"=>"Cargado: ".$usuariorecibidopor." | A verificacion: ".$usuarioenviado." | Listo: ".$usuariolisto." | Entregado: ".$usuarioentrega." | Anulado: ".$usuarioanula
);

$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproductosgarantia(this)' >
<td id='td_id_1' style='display:none' >".$idgarantia."</td>
<td id='td_datos_1' style='width:10%' >".$nrof."</td>
<td id='td_datos_3' style='width:10%' >".$nrodocliente."</td>
<td id='td_datos_4' style='width:10%' >".$clientenombre."</td>
<td id='td_datos_4' style='width:10%' >".$telefono."</td>
<td id='td_datos_5' style='width:10%' >".$nombre_producto."</td>
<td id='td_datos_8' style='width:10%' >".$cantidad."</td>
<td id='td_datos_6' style='width:10%' >".$observacion."</td>
<td id='' style='width:10%' >".$estado."</td>
<td id='td_datos_7' style='width:10%' >".$tituloFechas."</td>
<td id='td_datos_10' style='width:10%' >".$tituloUsuarios."</td>

<td id='td_datos_9' style='display:none' >".$estadox."</td>
<td id='td_datos_11' style='display:none' >".$tipo."</td>
</tr>
</table>
";



}
}

$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;


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


function refinanciarencambio($cod_venta,$totalActual,$metodopago){
	
	
	$mysqli=conectar_al_servidor();
	$sql= "Select idcredito,Monto,descuento,fechapago,dias,interes,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago
	from credito cr
	where cr.cod_venta='$cod_venta' ";
	
	$descuento=0;  
	$totalenCuotas=0;
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $F=0;
 $cont=0;
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     
			 $cuota=utf8_encode($valor['Monto']);
			 $fechapago=utf8_encode($valor['fechapago']);
			 $dias=utf8_encode($valor['dias']);
			 $interes=utf8_encode($valor['interes']);
			 $totalenCuotas=$totalenCuotas+$cuota;				 
			 $cont=$cont+1;
			
			  
	  }
 }
 
		
       $sobranteTotales=$totalActual-$totalenCuotas;
	   if($sobranteTotales<0){
		$sobranteTotales=$sobranteTotales*-1;
		   
   $sql= "Select idcredito,Monto,descuento,fechapago,dias,interes,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0) as totalPago
	from credito cr	where cr.cod_venta='$cod_venta'  
	and (IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito),0)+descuento)<Monto order by fechapago desc ";
	

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		     
			 $cuota=utf8_encode($valor['Monto']);
			 $idcredito=utf8_encode($valor['idcredito']);
			 $dias=utf8_encode($valor['dias']);
			 $interes=utf8_encode($valor['interes']);
			 if($sobranteTotales>0){
				 
			 if($sobranteTotales>$cuota){
				 $consulta="Delete From credito Where idcredito='$idcredito'";	

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
$sobranteTotales=$sobranteTotales-$cuota;

			 }else{
				
 $consulta="Update credito set Monto='$sobranteTotales'  Where idcredito='$idcredito'";	

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
 	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
$sobranteTotales=$sobranteTotales-$cuota;
				
			 }
			 
			 }
			
			  
	  }
 }
		   
		   
		   
		   

	   }else{
		 $fechaInicio=$fechapago;
		 if($metodopago=="Mensual")	{
			$F=$F+1; 
			$fecha = strtotime('+'.$F." month",strtotime($fechaInicio));
		 }
		 if($metodopago=="Semanal")	{
			 $F=$F+7;
			 $fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
		 }
		if($metodopago=="Quincenal")	{
			 $F=$F+15;
			 $fecha = strtotime('+'.$F." day",strtotime($fechaInicio));
		 }
		 $fechapago=date("Y-m-d H:i:s",$fecha);
		 $plazo=($cont+1)."/".($cont+1);
		 $consulta="Insert into credito (plazo,fechapago, cod_venta, Monto, Esado,Nro_recibo,dias,interes,total,descuento)
			values('$plazo','$fechapago','$cod_venta','$sobranteTotales','Pendiente','0','$dias','$interes','$sobranteTotales','0')";	

	$stmt = $mysqli->prepare($consulta);

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
		   
	   }
		
		
	
			  mysqli_close($mysqli);
			 $informacion =array("1" => "exito" );
echo json_encode($informacion);	
exit;
	
		
}


function buscar_vista_productos_combo_solicitud($cod_comboFK,$cantidadCuotaSolicitud,$totalpagado,$impuesto,$descuento)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $paginarecibo='';
	 $paginatickect='';
	 
	 
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
		(SELECT cantidad FROM stocklocales sl WHERE sl.cod_productofk = cod_producto LIMIT 1) as stock_producto,
		(SELECT descripcion FROM impuesto WHERE cod_Impuesto = (SELECT cod_ImpuestoFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as NombreImpuesto
		FROM detalle_combo_producto dcp WHERE cod_comboFK = '$cod_comboFK'";

/* echo $sql;
exit; */
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}

$SubTotalestotalIva10=0;
$SubTotalestotalIva5=0;
$totalIvaEx=0;
$totalDescuentoDetalles=0;
$totales10=0;
$totales5=0;
$totalesExt=0;
$totalesiva=0;
$plazo=1;

	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 $arrayPaginas = array();
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
$paginapreciototal = obtener_precio_producto($cod_comboFK,$cantidadCuotaSolicitud);

if($paginapreciosb > 0){
	$paginapreciosb = modificarprecioproducto($cod_comboFK,$paginapreciosb,$paginapreciototal,$cantidadCuotaSolicitud);
}

$subtotal = $paginapreciosb * $cantidad;



		  	 $styleName=CargarStyleTable($styleName);

/* $nroid = rand(1, 1000);
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
<td  id='td_datos_7' style='width:10%'>0</td>
<td  id='td_datos_10' style='display:none'>".$cantidadCuotaSolicitud."</td>
<td  id='td_datos_11' style='display:none'>".$promo."</td>
<td  id='td_datos_16' style='display:none'>".$cod_comboFK."</td>
</tr>
</table>"; */
	

$styleG=""; 
$styleDetalle=""; 
if($totalpagado>0){
	$eventos="";
}else{
	$eventos="obtenerdatosabmdetalleventa(this)";
}


$subtotalIva5=0;
$subtotalIva10=0;
$subtotalIvaext=0;
if($impuesto==11){
$subtotalIva10=($subtotal/$impuesto);
$totalesiva=$totalesiva+$subtotalIva10;
$totales10=$totales10+$subtotalIva10;
$SubTotalestotalIva10=$SubTotalestotalIva10+$subtotal;

}
if($impuesto==21){
$subtotalIva5=($subtotal/$impuesto);
$totalesiva=$totalesiva+$subtotalIva5;
$totales5=$totales5+$subtotalIva5;
$SubTotalestotalIva5=$SubTotalestotalIva5+$subtotal;
}
if($impuesto==1){
$subtotalIvaext=$subtotal;
$totalesExt=$totalesExt+$subtotalIvaext;
}


 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='$eventos' class='$styleDetalle'  name='tdDetalleVenta'>
<td id='td_id_1' style='display:none'>".$cod_producto."</td>
<td id='td_id_2' style='display:none'></td>
<td  style='width:5%'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%;".$styleG."'>".$nombre_producto." *".$NombreMarca."*</td>
<td  id='td_datos_3' style='width:10%'>".number_format($paginapreciosb,'0',',','.') ."</td>
<td  id='td_datos_4' style='width:5%'>".number_format($cantidad,'2',',','.')."</td>
<td  id='td_datos_5' style='width:10%;display:none'>".number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($subtotal,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($comision,'0',',','.')."</td>
</tr>
</table>";


// $descripcionDetalleVenta=buscardescripcionDetalleVenta($cod_detalle);

// <td  style='width:35px'>".$cod_barra."</td>
$paginarecibo.="
<table class='tableReporRecibo' >
<tr >
<td  style='width:10%;text-aling:center'>".number_format($cantidad,'2',',','.')."</td>
<td  style='width:50%'>$nombre_producto * $NombreMarca</td>
<td  style='width:10%'>".number_format($paginapreciosb,'0',',','.') ."</td>
<td  style='width:10%;text-aling:center'>".number_format($subtotalIvaext,'0',',','.') ."</td>
<td  style='width:5%;text-aling:center'>".number_format($subtotalIva5,'0',',','.') ."</td>
<td  style='width:15%;text-aling:center'>".number_format($subtotal,'0',',','.') ."</td>
</tr>
</table>";

$paginatickect.="<table class='tableTicket'>
<tr>
<td style='width:20%'>".number_format($cantidad,'0',',','.')."</td>
<td style='width:80%'>".$nombre_producto." *".$NombreMarca."*</td>
</tr>
</table>";






	
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);

$arrayPaginas[0] = $pagina;
$arrayPaginas[1] = $paginarecibo;
$arrayPaginas[2] = $paginatickect;

return $arrayPaginas;
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

function obtener_precio_producto($cod_producto, $cuota)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$sql= "SELECT precio FROM detallesprecio WHERE cod_producto ='$cod_producto' and Cuota = '$cuota'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
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



function comisionvendedoragrupado($fecha1, $fecha2, $condicion,$array_cod_filtro_local_info_vendedores,$array_cod_filtro_seccion_info_vendedores,$array_cod_filtro_vendedor_info_vendedores)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

/* $condicionsector = '';
if($sector !=''){
	$condicionsector = " and sector ='$sector'";
} */

	$condicionIn= "";
$contador = 0;
foreach ($array_cod_filtro_local_info_vendedores as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}

$condicionlocal = '';
if($contador !=0){
	$condicionlocal = " and cod_localfk  in ($condicionIn)";
}

$condicionIn= "";
$contador = 0;
foreach ($array_cod_filtro_vendedor_info_vendedores as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="$valor";
	}else{
		$condicionIn .=",$valor";
	}
}

$condicionvendedor = '';
if($contador !=''){
	$condicionvendedor = " and idvendedor in ($condicionIn)";
}


$condicionIn= "";
$contador = 0;
foreach ($array_cod_filtro_seccion_info_vendedores as $valor) {
	$contador++;
	if($contador == 1){
		$condicionIn .="'$valor'";
	}else{
		$condicionIn .=",'$valor'";
	}
}

$condicionsector = '';
if($contador !=0){
	$condicionsector = " and sector  in ($condicionIn)";
}


$sql= "select idvendedor,nombre from vendedor WHERE estado ='Activo' ".$condicionsector.$condicionlocal.$condicionvendedor;


$pagina = "
<table style='display:none'>
<tr>
<td><b>VENDEDOR</b></td>
<td><b>VENTA</b></td>
<td><b>META</b></td>
<td><b>PUNTOS</b></td>
<td><b>PORCENTAJE</b></td>
</tr>
</table>
";   
$filas = array();
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$cantidad = $valor;
$styleName="tableRegistroSearch";

$totalVenta = 0;
$totalMeta = 0;
$totalPuntaje = 0;
$totalPorcentaje = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$nombrevendedor1 = utf8_encode($valor['nombre']);   
$Vendedor1 = utf8_encode($valor['idvendedor']);   


if($condicion =='CONTADO'){
	$meta_contado = buscarMetaVendedorContado($fecha1,$fecha2,$Vendedor1);
	$meta_contado = floatval($meta_contado);
	$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
	$VentaContado=$totalVentas[0];
	$VentaContado = floatval($VentaContado);
	$puntos =buscarTotalPuntos($Vendedor1,$condicion,$fecha1,$fecha2);
	
	$porcentaje_contado = 0;
		if($meta_contado > 0 && $VentaContado > 0){
			$porcentaje_contado= ($VentaContado * 100 ) / $meta_contado;
			$porcentaje_contado= round($porcentaje_contado);
		}
		
		$totalVenta+= $VentaContado;
		$totalMeta+= $meta_contado;
		$totalPuntaje+= $puntos;
		$totalPorcentaje+= $porcentaje_contado;
		$filas[]=array(
			"vendedor"=>$nombrevendedor1,
			"venta"=>$VentaContado,
			"venta_formateada"=>number_format($VentaContado,'0',',','.'),
			"meta"=>$meta_contado,
			"meta_formateada"=>number_format($meta_contado,'0',',','.'),
			"puntos"=>intval($puntos),
			"porcentaje"=>$porcentaje_contado,
			"porcentaje_formateado"=>$porcentaje_contado."%"
		);
		
		 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td  id='' style='width:15%'>".$nombrevendedor1."</td>
<td  id='' style='width:10%'>".number_format($VentaContado,'0',',','.')." </td>
<td  id='' style='width:10%'>".number_format($meta_contado,'0',',','.')." </td>
<td  id='' style='width:10%'>".$puntos."</td>
<td  id='' style='width:10%'>".$porcentaje_contado."%</td>
</tr>
</table>";

}else if($condicion=='CREDITO'){
	
	
$meta_credito = buscarMetaVendedorCredito($fecha1,$fecha2,$Vendedor1);
$meta_credito = floatval($meta_credito);
$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
$VentaCredito=$totalVentas[1];
$VentaCredito = floatval($VentaCredito);
	$puntos =buscarTotalPuntos($Vendedor1,$condicion,$fecha1,$fecha2);
		
		
		$porcentaje_credito = 0;
		if($meta_credito > 0 && $VentaCredito > 0){
			$porcentaje_credito= ($VentaCredito * 100 ) / $meta_credito;
			$porcentaje_credito= round($porcentaje_credito);
		}
	
	
		$totalVenta+= $VentaCredito;
		$totalMeta+= $meta_credito;
		$totalPuntaje+= $puntos;
		$totalPorcentaje+= $porcentaje_credito;
		$filas[]=array(
			"vendedor"=>$nombrevendedor1,
			"venta"=>$VentaCredito,
			"venta_formateada"=>number_format($VentaCredito,'0',',','.'),
			"meta"=>$meta_credito,
			"meta_formateada"=>number_format($meta_credito,'0',',','.'),
			"puntos"=>intval($puntos),
			"porcentaje"=>$porcentaje_credito,
			"porcentaje_formateado"=>$porcentaje_credito."%"
		);
	
	
	 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td  id='' style='width:15%'>".$nombrevendedor1."</td>
<td  id='' style='width:10%'>".number_format($VentaCredito,'0',',','.')." </td>
<td  id='' style='width:10%'>".number_format($meta_credito,'0',',','.')." </td>
<td  id='' style='width:10%'>".$puntos."</td>
<td  id='' style='width:10%'>".$porcentaje_credito."%</td>
</tr>
</table>";



}else{
	
	//venta contado
	$meta_contado = buscarMetaVendedorContado($fecha1,$fecha2,$Vendedor1);
	$meta_contado = floatval($meta_contado);
	$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
	$VentaContado=$totalVentas[0];
	$VentaContado = floatval($VentaContado);
	$puntosContado =buscarTotalPuntos($Vendedor1,"CONTADO",$fecha1,$fecha2);
	
	
	//venta credito
	$meta_credito = buscarMetaVendedorCredito($fecha1,$fecha2,$Vendedor1);
	$meta_credito = floatval($meta_credito);
	
	$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
	$VentaCredito=$totalVentas[1];
	$VentaCredito = floatval($VentaCredito);
	$puntosCredito =buscarTotalPuntos($Vendedor1,"CREDITO",$fecha1,$fecha2);
		
	$VentaTotal = $VentaCredito + $VentaContado;
		$metaTotal = $meta_credito + $meta_contado;
		$total_puntos = intval($puntosContado) + intval($puntosCredito);
		
		$porcentaje = 0;
		if($metaTotal > 0 && $VentaTotal > 0){
			$porcentaje= ($VentaTotal * 100 ) / $metaTotal;
			$porcentaje= round($porcentaje);
		}
	
	
	$totalVenta+= $VentaTotal;
		$totalMeta+= $metaTotal;
		$totalPuntaje+= $total_puntos;
		$totalPorcentaje+= $porcentaje;
		$filas[]=array(
			"vendedor"=>$nombrevendedor1,
			"venta"=>$VentaTotal,
			"venta_formateada"=>number_format($VentaTotal,'0',',','.'),
			"meta"=>$metaTotal,
			"meta_formateada"=>number_format($metaTotal,'0',',','.'),
			"puntos"=>intval($total_puntos),
			"porcentaje"=>$porcentaje,
			"porcentaje_formateado"=>$porcentaje."%"
		);
	
	$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td  id='' style='width:15%'>".$nombrevendedor1."</td>
<td  id='' style='width:10%'>".number_format($VentaTotal,'0',',','.')." </td>
<td  id='' style='width:10%'>".number_format($metaTotal,'0',',','.')." </td>
<td  id='' style='width:10%'>".$total_puntos."</td>
<td  id='' style='width:10%'>".$porcentaje."%</td>
</tr>
</table>";
	
	
	
}




}
}


if($totalMeta > 0){
	$por = round(($totalVenta * 100)  / $totalMeta);
}else{
	$por = 0;
}



$pagina.="
<table style='display:none'>
<tr>
<td></td>
<td><b>".number_format($totalVenta,'0',',','.')."</b></td>
<td><b>".number_format($totalMeta,'0',',','.')."</b></td>
<td><b>".$totalPuntaje."</b></td>
<td><b>".$por."%</b></td>
</tr>
</table>
";
    
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3"=>number_format($totalVenta,'0',',','.'),"4"=>number_format($totalMeta,'0',',','.'),"5"=>$totalPuntaje,"6"=>$por."%");
echo json_encode($informacion);	
exit;
}

function buscarMetaVendedorContado($fecha1,$fecha2,$cod_vendedor)
{
	
	$mysqli=conectar_al_servidor();
	$condicionNroCompra="";
	 $pagina="";
	

	$fechames1 = $fecha1; 
	$fechames1 = new DateTime($fechames1); 
	$fechames1 = $fechames1->format('Y-m');
	
	$fechames2 =  $fecha2; 
	$fechames2 = new DateTime($fechames2); 
	$fechames2 = $fechames2->format('Y-m');
	
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(fecha, '%Y-%m') between  '$fechames1' and '$fechames2' ";
}
	
		$sql= "Select idvendedor, nombre, nrotelef,  cod_localfk,url,m.fecha,IFNULL(m.montoContado,0) as montoContado,IFNULL(m.montoCredito,0) as montoCredito,m.idMetas,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local , DATE_FORMAT(fecha, '%Y-%m') as mes , m.Estado
		from metas  m
		inner join vendedor ve on ve.idvendedor = m.cod_vendedorFK
		where ve.estado='activo' and m.Estado='Activo' and ve.idvendedor = '$cod_vendedor' ".$condicionFecha."   group by idMetas asc order by mes asc LIMIT 1";
	  	  

		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

  
  
$montoContado = 0;
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  	  $montoContado=utf8_encode($valor['montoContado']);
		  	 
			  
	  }
	 
 }
 
  
return $montoContado;
}
function buscarMetaVendedorCredito($fecha1,$fecha2,$cod_vendedor)
{
	
	$mysqli=conectar_al_servidor();
	$condicionNroCompra="";
	 $pagina="";
	

	$fechames1 = $fecha1; 
	$fechames1 = new DateTime($fechames1); 
	$fechames1 = $fechames1->format('Y-m');
	
	$fechames2 =  $fecha2; 
	$fechames2 = new DateTime($fechames2); 
	$fechames2 = $fechames2->format('Y-m');
	
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(fecha, '%Y-%m') between  '$fechames1' and '$fechames2' ";
}
	
		$sql= "Select idvendedor, nombre, nrotelef,  cod_localfk,url,m.fecha,IFNULL(m.montoContado,0) as montoContado,IFNULL(m.montoCredito,0) as montoCredito,m.idMetas,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local , DATE_FORMAT(fecha, '%Y-%m') as mes , m.Estado
		from metas  m
		inner join vendedor ve on ve.idvendedor = m.cod_vendedorFK
		where ve.estado='activo' and m.Estado='Activo' and ve.idvendedor = '$cod_vendedor' ".$condicionFecha."   group by idMetas asc order by mes asc LIMIT 1";
	  	  

		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

  
  
$montoCredito = 0;
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  	  $montoCredito=utf8_encode($valor['montoCredito']);
		  	 
			  
	  }
	 
 }
 
  
return $montoCredito;
}


function buscarTotalPuntos($Vendedor,$tipo,$fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		/* $condicionLocal="";
	if($local!=""){
		$condicionLocal=" and  vt.cod_local='$local' ";
	} */
	
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and  fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
	$condiciontipo="";
	if($tipo!=""){
		$condiciontipo=" and  vt.TipoVenta='$tipo' ";
	}
	
		$sql= "Select ifnull(sum(cantidad_detalle * ifnull((select punto  from puntos p where p.cod_productoFK=dt.cod_productoFK ),0)),0)  as puntos 
        from venta vt inner join detalle_venta dt on cod_ventaFK=cod_venta where  Vendedor1='".$Vendedor."' ".$condicionfecha.$condiciontipo."   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   limit 1 ";
		
		// echo($sql);
		// exit;
	
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
 	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
$puntos=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $puntos=$valor['puntos']; 			  
	  }
 }

 return $puntos;	

}

function buscarTotalVentaVendedor($Vendedor,$fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
	
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and  fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
	
	
		$sql= "Select total_venta , TipoVenta 
        from venta vt where  Vendedor1='".$Vendedor."' ".$condicionfecha."   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ";
		
		// echo($sql);
		// exit;
	
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
  	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
$total_venta=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 
  $total_ventaContado=0;
  $total_ventaCredito=0;
  $TotalVenta=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
				$total_venta = (float)$valor['total_venta']; 
				$tipoVenta   = strtoupper(trim($valor['TipoVenta'])); // normalizo texto
				$TotalVenta += $total_venta ;
				if ($tipoVenta === "CONTADO") {
					$total_ventaContado += $total_venta;
				} elseif ($tipoVenta === "CREDITO") {
					$total_ventaCredito += $total_venta;
				}
	  }
 }

$Datos[0]= $total_ventaContado;
$Datos[1]= $total_ventaCredito;
$Datos[2]= $TotalVenta;

 return $Datos;	

}

function buscarAccion($idAbm)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select idMetas, montoCredito, montoContado, Estado, Cod_vendedorFK
        from metas where idMetas='".$idAbm."' limit 1 ";
		

   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   	echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
	exit;
}
$accion="NO";
$idDetalleZona=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $montoContado="0";
 $montoCredito="0";
 $idMetas = '0';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $montoCredito=$valor['montoCredito']; 
		      $montoContado=$valor['montoContado'];
			  $idMetas=$valor['idMetas']; 			  
	  }
 }

 $Resultado[0]= $montoContado;
 $Resultado[1]= $montoCredito;
 $Resultado[2]= $idMetas;

 return $Resultado;	



}

function buscar_meta_vendedor($fecha1, $fecha2,$condicion,$cod_vendedor)
{
$mysqli=conectar_al_servidor();

$sql= "select idvendedor,nombre from vendedor WHERE estado ='Activo' and idvendedor =$cod_vendedor ";

 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$cantidad = $valor;
$styleName="tableRegistroSearch";

$totalVenta = 0;
$totalMeta = 0;
$totalPuntaje = 0;
$totalPorcentaje = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$nombrevendedor1 = utf8_encode($valor['nombre']);   
$Vendedor1 = utf8_encode($valor['idvendedor']);   


if($condicion =='CONTADO'){
	$meta_contado = buscarMetaVendedorContado($fecha1,$fecha2,$Vendedor1);
	$meta_contado = floatval($meta_contado);
	$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
	$VentaContado=$totalVentas[0];
	$VentaContado = floatval($VentaContado);
	$puntos =buscarTotalPuntos($Vendedor1,$condicion,$fecha1,$fecha2);
	
	$porcentaje_contado = 0;
		if($meta_contado > 0 && $VentaContado > 0){
			$porcentaje_contado= ($VentaContado * 100 ) / $meta_contado;
			$porcentaje_contado= round($porcentaje_contado);
		}
		
		$totalVenta+= $VentaContado;
		$totalMeta+= $meta_contado;
		$totalPuntaje+= $puntos;
		$totalPorcentaje+= $porcentaje_contado;
		
		

}else if($condicion=='CREDITO'){
	
	
$meta_credito = buscarMetaVendedorCredito($fecha1,$fecha2,$Vendedor1);
$meta_credito = floatval($meta_credito);
$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
$VentaCredito=$totalVentas[1];
$VentaCredito = floatval($VentaCredito);
	$puntos =buscarTotalPuntos($Vendedor1,$condicion,$fecha1,$fecha2);
		
		
		$porcentaje_credito = 0;
		if($meta_credito > 0 && $VentaCredito > 0){
			$porcentaje_credito= ($VentaCredito * 100 ) / $meta_credito;
			$porcentaje_credito= round($porcentaje_credito);
		}
	
	
		$totalVenta+= $VentaCredito;
		$totalMeta+= $meta_credito;
		$totalPuntaje+= $puntos;
		$totalPorcentaje+= $porcentaje_credito;
	
	
	 



}else{
	
	//venta contado
	$meta_contado = buscarMetaVendedorContado($fecha1,$fecha2,$Vendedor1);
	$meta_contado = floatval($meta_contado);
	$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
	$VentaContado=$totalVentas[0];
	$VentaContado = floatval($VentaContado);
	$puntosContado =buscarTotalPuntos($Vendedor1,"CONTADO",$fecha1,$fecha2);
	
	
	//venta credito
	$meta_credito = buscarMetaVendedorCredito($fecha1,$fecha2,$Vendedor1);
	$meta_credito = floatval($meta_credito);
	
	$totalVentas =buscarTotalVentaVendedor($Vendedor1,$fecha1,$fecha2);
	$VentaCredito=$totalVentas[1];
	$VentaCredito = floatval($VentaCredito);
	$puntosCredito =buscarTotalPuntos($Vendedor1,"CREDITO",$fecha1,$fecha2);
		
	$VentaTotal = $VentaCredito + $VentaContado;
		$metaTotal = $meta_credito + $meta_contado;
		$total_puntos = intval($puntosContado) + intval($puntosCredito);
		
		$porcentaje = 0;
		if($metaTotal > 0 && $VentaTotal > 0){
			$porcentaje= ($VentaTotal * 100 ) / $metaTotal;
			$porcentaje= round($porcentaje);
		}
	
	
	$totalVenta+= $VentaTotal;
		$totalMeta+= $metaTotal;
		$totalPuntaje+= $total_puntos;
		$totalPorcentaje+= $porcentaje;
	
	
	
	
	
}




}
}


if($totalMeta > 0){
	$por = round(($totalVenta * 100)  / $totalMeta);
}else{
	$por = 0;
}
    

	$pagina="
<table style='display:none'>
<tr>
<td></td>
<td><b>TOTAL VENTA: ".number_format($totalVenta,'0',',','.')."</b></td>
<td><b>TOTAL META: ".number_format($totalMeta,'0',',','.')."</b></td>
<td><b>PORCENTAJE: ".$por."%</b></td>
</tr>
</table>
";
	
	
$informacion =array("1" => "exito","2"=>$pagina,"3"=>number_format($totalVenta,'0',',','.'),"4"=>number_format($totalMeta,'0',',','.'),"5"=>$totalPuntaje,"6"=>$por."%");
echo json_encode($informacion);	
exit;
}

verificar($operacion);
?>
