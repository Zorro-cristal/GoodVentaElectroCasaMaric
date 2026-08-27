<?php
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("subir_foto_base64.php");
include("classTable.php");



$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

/*
 * Los listados modernizados solicitan filas estructuradas para construir el
 * DOM en JavaScript. El HTML anterior se conserva como compatibilidad para
 * consumidores que todavia no envian formato=json.
 */
function solicitarFormatoJsonProductos()
{
   return isset($_POST['formato']) && utf8_decode($_POST['formato']) === 'json';
}

/*
 * Contrato comun para las distintas vistas de productos. Cada operacion puede
 * agregar campos propios mediante $extras sin volver a acoplar la respuesta a
 * una fila HTML.
 */
function crearRegistroProductoListado($cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,$precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,$comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,$extras=array())
{
   $registro=array(
      "codigo"=>$cod_producto,
      "codigo_barra"=>$cod_barra,
      "producto"=>$nombre_producto,
      "descripcion"=>$descripcion_producto,
      "unidad"=>$unidad_producto,
      "precio"=>(float)$precio_producto,
      "precio_formateado"=>number_format((float)$precio_producto,'0',',','.'),
      "costo"=>(float)$precio_compra,
      "costo_formateado"=>number_format((float)$precio_compra,'0',',','.'),
      "stock"=>(float)$stock_producto,
      "stock_formateado"=>number_format((float)$stock_producto,'2',',','.'),
      "codigo_local"=>$cod_localFK,
      "local"=>$local,
      "comision"=>$comision,
      "estado"=>$estado,
      "categoria"=>$NombreCategoria,
      "impuesto"=>$NombreImpuesto,
      "marca"=>$NombreMarca
   );
   foreach($extras as $clave=>$valor){
      $registro[$clave]=$valor;
   }
   return $registro;
}

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
//CONTROL DE ACCESO



if($operacion=="nuevo" || $operacion=="editar" )
{


$cod_producto=$_POST['cod_producto'];
$cod_producto = utf8_decode($cod_producto);

$nombre_producto=$_POST['nombre_producto'];
$nombre_producto = utf8_decode($nombre_producto);


$descripcion_producto=$_POST['descripcion_producto'];
$descripcion_producto = utf8_decode($descripcion_producto);

$unidad_producto=$_POST['unidad_producto'];
$unidad_producto = utf8_decode($unidad_producto);

$precio_producto=$_POST['precio_producto'];
$precio_producto = quitarseparadormiles($precio_producto);

$precio_compra=$_POST['precio_compra'];
$precio_compra = quitarseparadormiles($precio_compra);

$cod_localFK=$_POST['cod_localFK'];
$cod_localFK = utf8_decode($cod_localFK);

$comision=$_POST['comision'];
$comision = utf8_decode($comision);

$stock_producto=$_POST['stock_producto'];
$stock_producto = quitarseparadormiles($stock_producto);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$cod_categoriaFK=$_POST['cod_categoriaFK'];
$cod_categoriaFK = utf8_decode($cod_categoriaFK);

$cod_marcasFK=$_POST['cod_marcasFK'];
$cod_marcasFK = utf8_decode($cod_marcasFK);

$cod_ImpuestoFK=$_POST['cod_ImpuestoFK'];
$cod_ImpuestoFK = utf8_decode($cod_ImpuestoFK);

$porcentaje=$_POST['porcentaje'];
$porcentaje = utf8_decode($porcentaje);

$codBarras=$_POST['codBarras'];
$codBarras = utf8_decode($codBarras);

$tipoproducto=$_POST['tipoproducto'];
$tipoproducto = utf8_decode($tipoproducto);

$CodProveedorFK=$_POST['CodProveedorFK'];
$CodProveedorFK = utf8_decode($CodProveedorFK);

$codFabricaFK=$_POST['codFabricaFK'];
$codFabricaFK = utf8_decode($codFabricaFK);

$linkproducto=$_POST['linkproducto'];
$linkproducto = utf8_decode($linkproducto);

$nombredescripcionAnt=$_POST['nombredescripcionAnt'];
$nombredescripcionAnt = utf8_decode($nombredescripcionAnt);

$precio_compraAnt=$_POST['precio_compraAnt'];
$precio_compraAnt = quitarseparadormiles($precio_compraAnt);

$precio_ventaAnt=$_POST['precio_ventaAnt'];
$precio_ventaAnt = quitarseparadormiles($precio_ventaAnt);

$stockAnt=$_POST['stockAnt'];
$stockAnt = quitarseparadormiles($stockAnt);

$cod_barraAnt=$_POST['cod_barraAnt'];
$cod_barraAnt = utf8_decode($cod_barraAnt);

$promo=$_POST['promo'];
$promo = utf8_decode($promo);

$stockminimo=$_POST['stockminimo'];
$stockminimo = utf8_decode($stockminimo);

$tipo_combo=$_POST['tipo_combo'];
$tipo_combo = utf8_decode($tipo_combo);

$precioEditable=$_POST['precioEditable'];
$precioEditable = utf8_decode($precioEditable);


abm($precioEditable,$tipo_combo,$stockminimo,$promo,$nombredescripcionAnt,$precio_compraAnt,$precio_ventaAnt,$stockAnt,$cod_barraAnt,$linkproducto,$codFabricaFK,$CodProveedorFK,$tipoproducto,$cod_producto,$codBarras,$cod_categoriaFK,$cod_marcasFK,$cod_ImpuestoFK,$porcentaje,$nombre_producto,$descripcion_producto,$unidad_producto,$precio_producto,$precio_compra,$cod_localFK,$comision,$stock_producto,$estado,$operacion);

}

 if ($operacion == "buscar_informe_stock_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		
		buscar_informe_stock_general($anho);
}


if ($operacion == "buscar_informe_stock_general_grafica") {
		$anho = $_POST['anho'];
		// $anho = utf8_decode($anho);
		// $pagado = $_POST['pagado'];
		// $pagado = utf8_decode($pagado);
		// $tipoDeuda = $_POST['tipoDeuda'];
		// $tipoDeuda = utf8_decode($tipoDeuda);
		buscar_informe_stock_general_grafica($anho);
	}
 
 if($operacion=="EnviarProductoA"){
	 
	 
 	$stock=$_POST["stock"];
 	$stock=quitarseparadormiles($stock);
	$cod_local_a=$_POST["cod_local_a"];
 	$cod_local_a=utf8_decode($cod_local_a);
	$cod_local_de=$_POST["cod_local_de"];
 	$cod_local_de=utf8_decode($cod_local_de);
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	$cod_producto_fk=$_POST["cod_producto_fk"];
 	$cod_producto_fk=utf8_decode($cod_producto_fk);
	$cod_ext=$_POST["cod_ext"];
 	$cod_ext=utf8_decode($cod_ext);
	
 	EnviarProductoA($stock,$cod_local_a,$cod_local_de,$fecha,$cod_producto_fk,$cod_ext,$user);
 } 
 
 
 if($operacion=="NuevoGarantiaProducto" )
{
	
	

	$cod_productoFK=$_POST['cod_productoFK'];
$cod_productoFK = utf8_decode($cod_productoFK);
$observacion=$_POST['observacion'];
$observacion = utf8_decode($observacion);
$fecharecibido=$_POST['fecharecibido'];
$fecharecibido = utf8_decode($fecharecibido);
$producto_cod_localFK=$_POST['producto_cod_localFK'];
$producto_cod_localFK = utf8_decode($producto_cod_localFK);

$cantidad=$_POST['cantidad'];
$cantidad = utf8_decode($cantidad);


NuevoGarantiaProducto($observacion,$fecharecibido,$cod_productoFK,$user,$producto_cod_localFK,$cantidad);

}
 
 
 if($operacion=="buscar_informe_movimiento_stock"){
	 
	 
 	
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$motivo=$_POST["motivo"];
 	$motivo=utf8_decode($motivo);
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	
 	buscar_informe_movimiento_stock($fecha1,$fecha2,$cod_localFK,$producto,$motivo,$fecha);
 }
 
  if($operacion=="comprobarproductotipocombo"){
	 
	 
 	
	
	$idproducto=$_POST["idproducto"];
 	$idproducto=utf8_decode($idproducto);
	
 	comprobarproductotipocombo($idproducto);
 }
 
  if($operacion=="nuevo_archivo_control_deposito"){
	  
	$idinformedepositolistado=$_POST["idinformedepositolistado"];
 	$idinformedepositolistado=utf8_decode($idinformedepositolistado);
	
 	cargarPDFControlDeposito($idinformedepositolistado);
 } 
 
 
 if($operacion=="buscarSelectAuditoriaProducto"){
 
 	buscarSelectAuditoriaProducto();
 }  
 
 
 if($operacion=="buscar_vista_productos_combo"){
	  
	$cod_comboFK=$_POST["cod_comboFK"];
 	$cod_comboFK=utf8_decode($cod_comboFK);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	
 	buscar_vista_productos_combo($cod_comboFK,$cod_localFK);
 }
 
  if($operacion=="buscar_vista_productos_combo_catalogo"){
	  
	$cod_comboFK=$_POST["cod_comboFK"];
 	$cod_comboFK=utf8_decode($cod_comboFK);
	
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	
 	buscar_vista_productos_combo_catalogo($cod_comboFK,$cod_localFK);
 }
 
  if($operacion=="buscar_vista_productos_combo_solicitud"){
	  
	$cod_comboFK=$_POST["cod_comboFK"];
 	$cod_comboFK=utf8_decode($cod_comboFK);
	
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$cantidadCuotaSolicitud=$_POST["cantidadCuotaSolicitud"];
 	$cantidadCuotaSolicitud=utf8_decode($cantidadCuotaSolicitud);
	
	$ConDescuento=$_POST["ConDescuento"];
 	$ConDescuento=utf8_decode($ConDescuento);
	
 	buscar_vista_productos_combo_solicitud($cod_comboFK,$local,$cantidadCuotaSolicitud,$ConDescuento);
 }
 
   if($operacion=="buscar_documentos_informe_deposito"){
	  
	$idinformedepositolistado=$_POST["idinformedepositolistado"];
 	$idinformedepositolistado=utf8_decode($idinformedepositolistado);
	
 	buscar_documentos_informe_deposito($idinformedepositolistado);
 }
 
   if($operacion=="eliminar_combo"){
	  
	$idcombo=$_POST["idcombo"];
 	$idcombo=utf8_decode($idcombo);
	
 	eliminar_combo($idcombo);
 }
 
    if($operacion=="buscar_combos"){
	
 	buscar_combos();
 }
 
 if($operacion=="SalidaDeposito"){
	 
	 
 	$stock=$_POST["stock"];
 	$stock=quitarseparadormiles($stock);
	$cod_local_deposito=$_POST["cod_local_deposito"];
 	$cod_local_deposito=utf8_decode($cod_local_deposito);
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	$cod_producto_fk=$_POST["cod_producto_fk"];
 	$cod_producto_fk=utf8_decode($cod_producto_fk);
	$cod_ext=$_POST["cod_ext"];
 	$cod_ext=utf8_decode($cod_ext);
	$stock_ant=$_POST["stock_ant"];
 	$stock_ant=utf8_decode($stock_ant);
	$nombre_lista=$_POST["nombre_lista"];
 	$nombre_lista=utf8_decode($nombre_lista);
	$idnombrelistacontroldeposito=$_POST["idnombrelistacontroldeposito"];
 	$idnombrelistacontroldeposito=utf8_decode($idnombrelistacontroldeposito);
	
 	SalidaDeposito($stock,$cod_local_deposito,$fecha,$cod_producto_fk,$cod_ext,$user,$stock_ant,$nombre_lista,$idnombrelistacontroldeposito);
 }

 if($operacion=="anulardespacho"){
	$cod_ext=$_POST["cod_ext"];
 	$cod_ext=utf8_decode($cod_ext);
	anulardespacho($cod_ext);
 }
 
  if($operacion=="nuevo_combo"){
	
	nuevo_combo($user);
 }
 if($operacion=="eliminar_producto_combo"){
	$id_detalle_combo_producto=$_POST["id_detalle_combo_producto"];
 	$id_detalle_combo_producto=utf8_decode($id_detalle_combo_producto);
	eliminar_producto_combo($id_detalle_combo_producto);
 }

 if($operacion=="add_producto_combo"){
	$idcombo_producto=$_POST["idcombo_producto"];
 	$idcombo_producto=utf8_decode($idcombo_producto);
	
	$cod_productoFK=$_POST["cod_productoFK"];
 	$cod_productoFK=utf8_decode($cod_productoFK);
	
	$cantidad=$_POST["cantidad"];
 	$cantidad=utf8_decode($cantidad);
	
	$monto_descuento=$_POST["monto_descuento"];
 	$monto_descuento=quitarseparadormiles($monto_descuento);
	
	
	add_producto_combo($idcombo_producto,$cod_productoFK,$monto_descuento,$cantidad);
 }
 
 if($operacion=="buscardetallescomboproducto"){

	 
	$idcombo_producto=$_POST["idcombo_producto"];
 	$idcombo_producto=utf8_decode($idcombo_producto);
	 
	buscardetallescomboproducto($idcombo_producto);
 }
 
 if($operacion=="anularsalidaProducto"){
	$cod_ext=$_POST["cod_ext"];
 	$cod_ext=utf8_decode($cod_ext);
	anularsalidaProducto($cod_ext);
 }

 if($operacion=="buscarListadoSolicitudDespacho"){
	

	$local=buscarlocaluser($user);

	 
	 
	buscarListadoSolicitudDespacho($local);
 } 
 
 
 if($operacion=="buscarListadoSolicitudDespachoTodosLocales"){


$local=$_POST["local"];
 	$local=utf8_decode($local);	

$local2=$_POST["local2"];
 	$local2=utf8_decode($local2);	

$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);	 

	buscarListadoSolicitudDespachoTodosLocales($producto,$local,$local2);
 }

 if($operacion=="buscar"){
	 
	 
 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$proveedor=$_POST["proveedor"];
 	$proveedor=utf8_decode($proveedor);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$promo=$_POST["promo"];
 	$promo=utf8_decode($promo);
	
	$ConStock=$_POST["ConStock"];
 	$ConStock=utf8_decode($ConStock);
	
	$puntaje=$_POST["puntaje"];
 	$puntaje=utf8_decode($puntaje);
	
	
	$EditarPrecio=$_POST["EditarPrecio"];
 	$EditarPrecio=utf8_decode($EditarPrecio);
	
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	BuscarRegistro($EditarPrecio,$promo,$codigo,$producto,$marca,$categoria,$stock,$proveedor,$estado,$local,$ConStock,$puntaje);
 }
 
  if($operacion=="buscar_producto_movimiento_stock"){
	 
	 
 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$busquedaGeneral=isset($_POST["busqueda_general"]) ? $_POST["busqueda_general"] : "";
 	$busquedaGeneral=utf8_decode($busquedaGeneral);
	

 	buscar_producto_movimiento_stock($codigo,$producto,$marca,$categoria,$local,$stock,$busquedaGeneral);
 }  
 
 
 if($operacion=="buscar_producto_stock_minimo_producto"){
	 
	 
 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$cod_proveedor=$_POST["proveedor"];
 	$cod_proveedor=utf8_decode($cod_proveedor);
	

 	buscar_producto_stock_minimo_producto($codigo,$producto,$marca,$categoria,$local,$cod_proveedor);
 }
 if($operacion=="buscarmas"){
	 
	 
 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$proveedor=$_POST["proveedor"];
 	$proveedor=utf8_decode($proveedor);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$ConStock=$_POST["ConStock"];
 	$ConStock=utf8_decode($ConStock);
	$promo=$_POST["promo"];
 	$promo=utf8_decode($promo);
	
	$EditarPrecio=$_POST["EditarPrecio"];
 	$EditarPrecio=utf8_decode($EditarPrecio);
	
	$puntaje=$_POST["puntaje"];
 	$puntaje=utf8_decode($puntaje);
	
	$registrocargado=$_POST["registrocargado"];
 	$registrocargado=utf8_decode($registrocargado);
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	BuscarMasRegistro($EditarPrecio,$promo,$codigo,$producto,$marca,$categoria,$stock,$proveedor,$estado,$local,$registrocargado,$ConStock,$puntaje);
 }

 if($operacion=="buscarporcodigoeditar"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarporcodigoeditar($buscar);
 }

if($operacion=="buscarinformedepositoproductos" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$diferencia=$_POST['diferencia'];
$diferencia = utf8_decode($diferencia);
$local=$_POST['local'];
$local = utf8_decode($local);
$idinformedepositolistado=$_POST['idinformedepositolistado'];
$idinformedepositolistado = utf8_decode($idinformedepositolistado);
buscarinformedepositoproductos($fecha1,$fecha2,$estado,$diferencia,$local,$idinformedepositolistado);

}

if($operacion=="buscarinformedepositolistado" )
{


$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cod_localFK=$_POST['cod_localFK'];
$cod_localFK = utf8_decode($cod_localFK);
buscarinformedepositolistado($fecha1,$fecha2,$cod_localFK);

}

 if($operacion=="buscarvista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$Categoria=$_POST["Categoria"];
 	$Categoria=utf8_decode($Categoria);
	$Marca=$_POST["Marca"];
 	$Marca=utf8_decode($Marca);
	$codProveedor=$_POST["codProveedor"];
 	$codProveedor=utf8_decode($codProveedor);
	buscarvista($buscar,$local,$Categoria,$Marca,$codProveedor);
 }
 

 
  if($operacion=="AuditoriaProducto"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$usuario=$_POST["usuario"];
 	$usuario=utf8_decode($usuario);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$cod_barra=$_POST["cod_barra"];
 	$cod_barra=utf8_decode($cod_barra);
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$busqueda_general=isset($_POST["busqueda_general"])?utf8_decode($_POST["busqueda_general"]):"";
	AuditoriaProducto($fecha1,$fecha2,$local,$usuario,$producto,$cod_barra,$fecha,$tipo,$busqueda_general);
 }
 
   if($operacion=="buscarvistaventa"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$ConDescuento= "false";
	if (isset($_POST["conDescuento"])) {
		$ConDescuento= $_POST["conDescuento"];
		$ConDescuento=utf8_decode($ConDescuento);
	}
	buscarvistaVenta($buscar,$local, $ConDescuento);
 }
 
    if($operacion=="buscarvistaventaSolicitud"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$cantidadCuotaSolicitud=$_POST["cantidadCuotaSolicitud"];
 	$cantidadCuotaSolicitud=utf8_decode($cantidadCuotaSolicitud);
 
		$ConDescuento= $_POST["ConDescuento"];
		$ConDescuento=utf8_decode($ConDescuento);
 
	
	buscarvistaventaSolicitud($buscar,$local,$cantidadCuotaSolicitud, $ConDescuento);
 }
 
 
 if($operacion=="buscarvistacompras"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	buscarvistacompras($buscar,$local);
 }
 if($operacion=="buscarvistalistadodespacho"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	buscarvistalistadodespacho($buscar,$local);
 }
 if($operacion=="buscarvistasalidadeposito"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	buscarvistasalidadeposito($buscar,$local,$stock);
 }
 
  if($operacion=="buscarvistaproductocombo"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	buscarvistaproductocombo($buscar,$stock);
 }
 
 if($operacion=="buscarporcodigo"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
 	buscarporcodigo($buscar,$local);
 }
 
 if($operacion=="buscarconsultarprecios"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
 	buscarconsultarprecios($buscar,$local,$categoria,$marca);
 }

 if($operacion=="buscarcodBarra"){
 	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$existencia=$_POST["existencia"];
 	$existencia=utf8_decode($existencia);
	
 	buscarcodBarra($producto,$codigo,$local,$existencia);
 }

 if($operacion=="buscarInventario"){
 	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$codproducto=$_POST["codproducto"];
 	$codproducto=utf8_decode($codproducto);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$Categoria=$_POST['Categoria'];
	$Categoria = utf8_decode($Categoria);
	$Marcas=$_POST['Marcas'];
	$Marcas = utf8_decode($Marcas);
	$control=$_POST['control'];
	$control = utf8_decode($control);
	$cod_admin_locales=$_POST['cod_admin_locales'];
	$cod_admin_locales = utf8_decode($cod_admin_locales);
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	buscarInventario($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$cod_admin_locales);
 }
 
 if($operacion=="buscarMasInventario"){
 	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$codproducto=$_POST["codproducto"];
 	$codproducto=utf8_decode($codproducto);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$Categoria=$_POST['Categoria'];
	$Categoria = utf8_decode($Categoria);
	$Marcas=$_POST['Marcas'];
	$Marcas = utf8_decode($Marcas);
	$control=$_POST['control'];
	$control = utf8_decode($control);
	$totalcostos=$_POST['totalcostos'];
	$totalcostos = quitarseparadormiles($totalcostos);
	$registrocargados=$_POST['registrocargados'];
	$registrocargados = utf8_decode($registrocargados);
	$cod_admin_locales=$_POST['cod_admin_locales'];
	$cod_admin_locales = utf8_decode($cod_admin_locales);
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	buscarMasInventario($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$totalcostos,$cod_admin_locales,$registrocargados);
 }


 if($operacion=="buscarinformegralproductos"){
 	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$codproducto=$_POST["codproducto"];
 	$codproducto=utf8_decode($codproducto);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$Categoria=$_POST['Categoria'];
	$Categoria = utf8_decode($Categoria);
	$Marcas=$_POST['Marcas'];
	$Marcas = utf8_decode($Marcas);
	$control=$_POST['control'];
	$control = utf8_decode($control);
	$agrupaciongralproducto=$_POST['agrupaciongralproducto'];
	$agrupaciongralproducto = utf8_decode($agrupaciongralproducto);
	$cod_proveedor=$_POST['cod_proveedor'];
	$cod_proveedor = utf8_decode($cod_proveedor);
	$fechaStock=$_POST['fechaStock'];
	$fechaStock = utf8_decode($fechaStock);
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	buscarinformegralproductos($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$agrupaciongralproducto,$cod_proveedor,$fechaStock);
 }
 
 if($operacion=="buscarMasinformegralproductos"){
 	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$codproducto=$_POST["codproducto"];
 	$codproducto=utf8_decode($codproducto);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$Categoria=$_POST['Categoria'];
	$Categoria = utf8_decode($Categoria);
	$Marcas=$_POST['Marcas'];
	$Marcas = utf8_decode($Marcas);
	$control=$_POST['control'];
	$control = utf8_decode($control);
	$stocktotal=$_POST['stocktotal'];
	$stocktotal = utf8_decode($stocktotal);
	$totalcostos=$_POST['totalcostos'];
	$totalcostos = quitarseparadormiles($totalcostos);
	$registrocargados=$_POST['registrocargados'];
	$registrocargados = utf8_decode($registrocargados);
	$agrupaciongralproducto=$_POST['agrupaciongralproducto'];
	$agrupaciongralproducto = utf8_decode($agrupaciongralproducto);
	$cod_proveedor=$_POST['cod_proveedor'];
	$cod_proveedor = utf8_decode($cod_proveedor);
	$fechaStock=$_POST['fechaStock'];
	$fechaStock = utf8_decode($fechaStock);
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	buscarMasinformegralproductos($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$stocktotal,$totalcostos,$agrupaciongralproducto,$registrocargados,$cod_proveedor,$fechaStock);
 }



 if($operacion=="buscarStock"){
 	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$codproducto=$_POST["codproducto"];
 	$codproducto=utf8_decode($codproducto);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$Categoria=$_POST['Categoria'];
	$Categoria = utf8_decode($Categoria);
	$Marcas=$_POST['Marcas'];
	$Marcas = utf8_decode($Marcas);
	$cod_admin_locales=$_POST['cod_admin_locales'];
	$cod_admin_locales = utf8_decode($cod_admin_locales);
	
	
	$existencia=$_POST["existencia"];
 	$existencia=utf8_decode($existencia);
	
	$proveedor=$_POST["proveedor"];
 	$proveedor=utf8_decode($proveedor);
	
	$agrupadopor=$_POST["agrupadopor"];
 	$agrupadopor=utf8_decode($agrupadopor);
	
	
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	buscarStock($proveedor,$producto,$codproducto,$stock,$local,$Categoria,$Marcas,$existencia,$cod_admin_locales,$agrupadopor);
 }
 
 if($operacion=="buscarMasStock"){
 	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);
	$codproducto=$_POST["codproducto"];
 	$codproducto=utf8_decode($codproducto);
	$stock=$_POST["stock"];
 	$stock=utf8_decode($stock);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$Categoria=$_POST['Categoria'];
	$Categoria = utf8_decode($Categoria);
	$Marcas=$_POST['Marcas'];
	$Marcas = utf8_decode($Marcas);
	$totalcostos=$_POST['totalcostos'];
	
	$existencia=$_POST["existencia"];
 	$existencia=utf8_decode($existencia);
	$cod_admin_locales=$_POST["cod_admin_locales"];
 	$cod_admin_locales=utf8_decode($cod_admin_locales);
	
	$proveedor=$_POST["proveedor"];
 	$proveedor=utf8_decode($proveedor);
	
	$agrupadopor=$_POST["agrupadopor"];
 	$agrupadopor=utf8_decode($agrupadopor);
	
	$totalcostos = quitarseparadormiles($totalcostos);
	$registrocargados=$_POST['registrocargados'];
	$registrocargados = utf8_decode($registrocargados);
	if($local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$local=buscarlocaluser($user);
	}
}
 	buscarMasStock($proveedor,$producto,$codproducto,$stock,$local,$Categoria,$Marcas,$totalcostos,$registrocargados,$existencia,$cod_admin_locales,$agrupadopor);
 }

 if($operacion=="buscarCatalogo"){
 	$buscar=$_POST["descripcion"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$control=$_POST["control"];
 	$control=utf8_decode($control);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	
	$promo=$_POST["promo"];
 	$promo=utf8_decode($promo);
	
 	buscarCatalogo($promo,$buscar,$local,$control,$marca,$categoria);
 }
 
 if($operacion=="buscarexistencialocal"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);

 	buscarexistencialocal($buscar);
 }

 if($operacion=="buscarMasCatalogo"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$registrocargado=$_POST["registrocargado"];
 	$registrocargado=utf8_decode($registrocargado);
	
	$promo=$_POST["promo"];
 	$promo=utf8_decode($promo);
	
	$control=$_POST["control"];
 	$control=utf8_decode($control);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	
 	buscarMasCatalogo($registrocargado,$promo,$buscar,$local,$control,$marca,$categoria);
 }

 if($operacion=="editarpreciocontado"){
 	$precioventa=$_POST["precioventa"];
 	$precioventa=quitarseparadormiles($precioventa);
	$Porcentaje=$_POST["Porcentaje"];
 	$Porcentaje=quitarseparadormiles($Porcentaje);
	$cod_producto=$_POST["cod_producto"];
 	$cod_producto=utf8_decode($cod_producto);
 	editarpreciocontado($precioventa,$Porcentaje,$cod_producto);
 }


 if($operacion=="historialdespachado"){
	 
	 
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$codlocal1=$_POST["codlocal1"];
 	$codlocal1=utf8_decode($codlocal1);
	$codlocal2=$_POST["codlocal2"];
 	$codlocal2=utf8_decode($codlocal2);
	$cod_producto=$_POST["cod_producto"];
 	$cod_producto=utf8_decode($cod_producto);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);	
	$estado_solic=$_POST["estado_solic"];
 	$estado_solic=utf8_decode($estado_solic);	
 	historialdespachado($fecha1,$fecha2,$codlocal1,$codlocal2,$cod_producto,$producto,$estado_solic);
 }
 if($operacion=="historialmasdespachado"){
	 
	 
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$codlocal1=$_POST["codlocal1"];
 	$codlocal1=utf8_decode($codlocal1);
	$codlocal2=$_POST["codlocal2"];
 	$codlocal2=utf8_decode($codlocal2);
	$cod_producto=$_POST["cod_producto"];
 	$cod_producto=utf8_decode($cod_producto);
	$producto=$_POST["producto"];
 	$producto=utf8_decode($producto);	
	$estado_solic=$_POST["estado_solic"];
 	$estado_solic=utf8_decode($estado_solic);	
	$registrocargado=$_POST["registrocargado"];
 	$registrocargado=utf8_decode($registrocargado);	
 	historialmasdespachado($fecha1,$fecha2,$codlocal1,$codlocal2,$cod_producto,$producto,$estado_solic,$registrocargado);
 }

 if($operacion=="comprobar_codigo"){
 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
 	comprobarduplicado($codigo);
 }

 if($operacion=="aceptarSolicitudDespacho"){
 	$idhistorialdespacho=$_POST["idhistorialdespacho"];
 	$idhistorialdespacho=utf8_decode($idhistorialdespacho);
 	aceptarSolicitudDespacho($idhistorialdespacho);
 }



 if($operacion=="RechazarSolicitudDespacho"){
 	$idhistorialdespacho=$_POST["idhistorialdespacho"];
 	$idhistorialdespacho=utf8_decode($idhistorialdespacho);
 	RechazarSolicitudDespacho($idhistorialdespacho);
 }


   if($operacion=="buscarpresupuesto"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	buscarpresupuesto($buscar,$local);
 }



if($operacion=="ContabilidadVenta"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	ContabilidadVenta($fecha1,$fecha2,$local,$estado);

}

if($operacion=="ContabilidadCompra"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	ContabilidadCompra($fecha1,$fecha2,$local);

}
 
 
 if($operacion=="nuevoTablaDetallePrecio" )
{
$cod_producto=$_POST['cod_producto'];
$cod_producto = ($cod_producto);

$contado=$_POST['contado'];
$contado = quitarseparadormiles($contado);

$porcentaje=$_POST['porcentaje'];
$porcentaje = ($porcentaje);

nuevoTablaDetallePrecio($cod_producto,$contado,$porcentaje);
 }
 
  if($operacion=="EliminarProducto"){
	$cod_producto=$_POST["cod_producto"];
 	$cod_producto=utf8_decode($cod_producto);
	EliminarProducto($cod_producto);
 }
 
 
 
 
 if($operacion=="ContadorProducto"){
 	 
	ContadorProducto();

}
 


 if($operacion=="buscardetallespreciossolicitud"){
	 
	 
	 $cod_productoSolicitud=$_POST["cod_productoSolicitud"];
 	$cod_productoSolicitud=utf8_decode($cod_productoSolicitud);
	$cantidadCuotaSolicitud=$_POST["cantidadCuotaSolicitud"];
 	$cantidadCuotaSolicitud=utf8_decode($cantidadCuotaSolicitud);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK); 
		$ConDescuento= $_POST["ConDescuento"];
		$ConDescuento= utf8_decode($ConDescuento);
 
 	 
	$precio=buscardetallespreciossolicitud($cod_productoSolicitud,$cantidadCuotaSolicitud,$cod_localFK,$ConDescuento);
	
	$informacion =array("1" => "exito","2" => $precio);
	echo json_encode($informacion);	
	exit;

}
 


if($operacion=="modificar_stock"){
	$cantidad=$_POST["cantidad"];
 	$cantidad=utf8_decode($cantidad);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$cod_motivo=$_POST["cod_motivo"];
 	$cod_motivo=utf8_decode($cod_motivo);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$cod_productoFK=$_POST["cod_productoFK"];
 	$cod_productoFK=utf8_decode($cod_productoFK);
	modificar_stock($cantidad,$tipo,$cod_motivo,$cod_localFK,$user,$cod_productoFK);
 }
 
 if($operacion=="modificar_stock_minimo"){
	$cantidad=$_POST["cantidad"];
 	$cantidad=utf8_decode($cantidad);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	$cod_productoFK=$_POST["cod_productoFK"];
 	$cod_productoFK=utf8_decode($cod_productoFK);
	modificar_stock_minimo($cantidad,$cod_localFK,$user,$cod_productoFK);
 }

}




function  ContadorProducto()
{
$mysqli=conectar_al_servidor();


$sql= "select count(pr.cod_producto)+40000 from  producto pr ";

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nroOrden=$result->fetch_row();
$nroOrden=$nroOrden[0];
$nroOrden=$nroOrden+1;


$informacion =array("1" => "exito","2" => $nroOrden);
echo json_encode($informacion);	
exit;

}






function EliminarProducto($cod_producto)
{
$mysqli=conectar_al_servidor(); 

$consulta1="update producto set estado='Inactivo' where cod_producto='$cod_producto'";
$stmt1 = $mysqli->prepare($consulta1);


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$informacion =array("1" => "exito","2" => $cod_producto);
echo json_encode($informacion);	
exit;


}




Function nuevoTablaDetallePrecio($cod_producto,$precioCompra,$porcentaje)
{
	
}

/*Funcion para insertar,modificar o eliminar registros*/
function abmTabla($iddetallesprecio,$precio,$descripcion,$cod_producto,$comision,$Porcentaje,$Cuota,$preciocuota,$operacion)
{

if( $cod_producto=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 



$consulta1="Insert into detallesprecio (precio,descripcion,cod_producto,comision,Porcentaje,Cuota,preciocuota)
values(?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssss';
$stmt1->bind_param($ss,$precio,$descripcion,$cod_producto,$comision,$Porcentaje,$Cuota,$preciocuota);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

}




function abm($precioEditable,$tipo_combo,$stockminimo,$promo,$nombredescripcionAnt,$precio_compraAnt,$precio_ventaAnt,$stockAnt,$cod_barraAnt,$linkproducto,$codFabricaFK,$CodProveedorFK,$tipo,$cod_producto,$cod_barra,$cod_categoriaFK,$cod_marcasFK,$cod_ImpuestoFK,$porcentaje,$nombre_producto,$descripcion_producto,$unidad_producto,$precio_producto,$precio_compra,$cod_localFK,$comision,$stock_producto,$estado,$operacion)
{

if($nombre_producto==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);

$mysqli=conectar_al_servidor(); 

if($operacion=="nuevo") 
{


$consulta= "Select count(*) from producto where cod_barra=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss,$cod_barra); 
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

if($valor>0)
{
	$informacion =array("1" => "EXPR");
	echo json_encode($informacion);	
	exit;
}  


	
$cod_producto=buscarCodigoProductos();

$consulta1="Insert into producto (CodProveedor,cod_barra,cod_producto,porcentaje,cod_categoriaFK,cod_marcasFK,cod_ImpuestoFK,nombre_producto,descripcion_producto,unidad_producto,precio_producto,precio_compra,comision,estado,tipo,cod_user_insert,fecha_insert,codFabricaFK,link,promo,tipo_producto,condicion_precio)
values(?,?,?,?,?,?,?,upper(?),?,?,?,?,?,?,?,?,?,?,?,?,?,'$precioEditable')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssssssssssssssss';
$stmt1->bind_param($ss,$CodProveedorFK,$cod_barra,$cod_producto,$porcentaje,$cod_categoriaFK,$cod_marcasFK,$cod_ImpuestoFK,$nombre_producto,$descripcion_producto,$unidad_producto,$precio_producto,$precio_compra,$comision,$estado,$tipo,$user,$fecha_inser_edit,$codFabricaFK,$linkproducto,$promo,$tipo_combo);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



}


if($operacion=="editar")
{
	
		$DatosProducto=buscardatosproductoparaauditoria($cod_producto,$cod_localFK);
	
$consulta1="Update producto set CodProveedor=?,tipo=?,cod_barra=?,nombre_producto=upper(?),porcentaje=?,cod_categoriaFK=?,cod_marcasFK=?,cod_ImpuestoFK=?,descripcion_producto=?,unidad_producto=?,precio_producto=?,precio_compra=?,comision=?,estado=?,cod_user_edit=?,fecha_edit=?,link=?,promo=?,tipo_producto=?,condicion_precio='$precioEditable' where cod_producto=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssssssssssssss';
$stmt1->bind_param($ss,$CodProveedorFK,$tipo,$cod_barra,$nombre_producto,$porcentaje,$cod_categoriaFK,$cod_marcasFK,$cod_ImpuestoFK,$descripcion_producto,$unidad_producto,$precio_producto,$precio_compra,$comision,$estado,$user,$fecha_inser_edit,$linkproducto,$promo,$tipo_combo,$cod_producto); 

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
}

if($promo!="SI" && $precioEditable=="SI" && $precio_compra!=0 ){
	BuscarListaCategoriaPrecioProductoDetalleCategoria($cod_producto,$cod_categoriaFK,$precio_compra);	
}


if($operacion=="nuevo"){
	buscarlocalesproductos($stock_producto,$cod_producto,$cod_localFK);
	// agregarStockMinimo(0,$cod_producto,$cod_localFK);
	
	BuscarListaCategoriaPrecioProductoDetalleCategoria($cod_producto,$cod_categoriaFK,$precio_compra);
}



cargarFotos($cod_producto);

/* if($operacion=="editar"){
	$control = comprobar_registro_existencia_stock_minimo($cod_localFK,$cod_producto);
	if($control){
		actualizarStockMinimo($stockminimo,$cod_producto,$cod_localFK);
	}else{
		agregarStockMinimo($stockminimo,$cod_producto,$cod_localFK);
	}
	EditarStockA($stock_producto,$cod_producto,$cod_localFK);
	 
 
 
} */

$informacion =array("1" => "exito","2" => $cod_producto);
echo json_encode($informacion);	
exit;

}







////////desde aca es actualizar precio////////////




function  BuscarListaCategoriaPrecioProductoDetalleCategoria($cod_producto,$CodCategoria,$PrecioCompra)
{
$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');


$sql= "select cod_lista_precio_producto,tipo,dlp.descripcion
from lista_precio_producto dlp 
inner join  categoria_lista_precio on cod_lista_precio_producto=cod_lista_precio_productoFK
 where   fecha_hasta>='".$fechahoy."' and estado='Activo' and  pr_desde<=$PrecioCompra and pr_hasta>=$PrecioCompra 
  and  accion='SI' and  cod_categoriaFK='".$CodCategoria."' ";

 
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
 
$cod_lista_precio_producto = utf8_encode($valor['cod_lista_precio_producto']);  
$tipo = utf8_encode($valor['tipo']);         

ActualizarPrecioProductoDetalleCategoria($cod_producto,$cod_lista_precio_producto,$tipo,$PrecioCompra);
}
}
  mysqli_close($mysqli);
 
}






function  ActualizarPrecioProductoDetalleCategoria($cod_producto,$cod_lista_precio_producto,$tipo,$PrecioCompra)
{
$mysqli=conectar_al_servidor();

$sql= "select cod_detalle_listado_precio,cuota,descuento,porcentaje,dlp.descripcion
from detalle_listado_precio dlp  
 where cod_lista_precio_productoFK='".$cod_lista_precio_producto."' order by dlp.cuota asc";

 
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
 
$cod_detalle_listado_precio = utf8_encode($valor['cod_detalle_listado_precio']);    
$cuota = utf8_encode($valor['cuota']);    
$descuento = utf8_encode($valor['descuento']);    
$porcentaje = utf8_encode($valor['porcentaje']);    
$descripcion = utf8_encode($valor['descripcion']);    

buscarDetallePrecio($cod_lista_precio_producto,$cod_detalle_listado_precio,$PrecioCompra,$cod_producto,$porcentaje,$cuota,$descuento, $descripcion,$tipo);
}
}
  mysqli_close($mysqli);
 
}
 

function buscarDetallePrecio($cod_lista_precio_producto,$cod_detalle_listado_precio,$PrecioCompra,$cod_producto,$porcentaje, $cuota,$descuento,$descripcion,$tipo)
{
	 
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select cod_detalle_listado_precio_producto  from detalle_listado_precio_producto where  cod_producto = '".$cod_producto."'  and Cuota='".$cuota."' and cod_lista_precio_productoFK='".$cod_lista_precio_producto."' ";
 
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
		  
		      $cod_detalle_listado_precio_producto=$valor['cod_detalle_listado_precio_producto'];
			  
			  
			  if($tipo=="PORCENTAJE"){
				  $porcen=100 + $porcentaje;
			  $precioTotal=($PrecioCompra* $porcen) / 100;
			  
			  $preciocuota=$precioTotal/$cuota;
			  
			  $preciocuota = ceil($preciocuota/1000) * 1000;
				
				$precioTotal= $preciocuota * $cuota;
				
				
				$ConDescuento=  $precioTotal - ($precioTotal * ($descuento / 100));
				
				
				
				$cuotaConDescuento=$ConDescuento/$cuota;
				
				
				  
			  }else{
				   
					$precioTotal= $PrecioCompra + $porcentaje ;
			  
					$preciocuota=$precioTotal/$cuota;
			  
					$preciocuota = ceil($preciocuota/1000) * 1000;
				
					$precioTotal= $preciocuota * $cuota;
				
				
					$ConDescuento=  $precioTotal - $descuento;
				
				
				
					$cuotaConDescuento=$ConDescuento/$cuota;
			  }
			  
			   
		  	 			$cuotaConDescuento = ceil($cuotaConDescuento / 1000) * 1000;	  
			     
				$consulta="Update detalle_listado_precio_producto set precio=?,  Porcentaje=?, Cuota=? , preciocuota=?, descuento=?,  descripcion=? where cod_detalle_listado_precio_producto=?";	

				$stmt = $mysqli->prepare($consulta);

				$ss='sssssss';
					
				$stmt->bind_param($ss,$precioTotal,$porcentaje,$cuota,$preciocuota,$cuotaConDescuento,$descripcion,$cod_detalle_listado_precio_producto); 
					
				
				if ( ! $stmt->execute() ) {
				echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
				exit;

				}
		  	  
			 
	  }
 }else{
	  	
			if($tipo=="PORCENTAJE"){
				 $porcen=100 + $porcentaje;
			  $precioTotal=($PrecioCompra* $porcen) / 100;
			  
			  $preciocuota=$precioTotal/$cuota;
			  
			  $preciocuota = ceil($preciocuota/1000) * 1000;
				
				$precioTotal= $preciocuota * $cuota;



				$ConDescuento=  $precioTotal - ($precioTotal * ($descuento / 100));
				
				
				
				$cuotaConDescuento=$ConDescuento/$cuota;
			}else{
				
			 
			  $precioTotal= $PrecioCompra + $porcentaje ;
			  
			  $preciocuota=$precioTotal/$cuota;
			  
			  $preciocuota = ceil($preciocuota/1000) * 1000;
				
				$precioTotal= $preciocuota * $cuota;


				$ConDescuento=  $precioTotal -  $descuento ;
				
								
				$cuotaConDescuento=$ConDescuento/$cuota;
			}
			
			
				$cuotaConDescuento = ceil($cuotaConDescuento / 1000) * 1000;
				
				EliminarPrecios($cod_lista_precio_producto,$cod_producto);
			     
				$consulta="insert into detalle_listado_precio_producto( precio , Porcentaje, Cuota , preciocuota , cod_detalle_listado_precioFK , cod_producto , descripcion ,comision ,descuento,cod_lista_precio_productoFK) values('$precioTotal','$porcentaje','$cuota','$preciocuota','$cod_detalle_listado_precio','$cod_producto','$descripcion',0,'$cuotaConDescuento','$cod_lista_precio_producto')";	

				$stmt = $mysqli->prepare($consulta);
 
				if ( ! $stmt->execute() ) {
				echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
				exit;

				} 
  
 }
 
  mysqli_close($mysqli);
 
}



function EliminarPrecios($cod_lista_precio_producto,$cod_producto){
       $mysqli=conectar_al_servidor(); 

			$consulta="delete from detalle_listado_precio_producto   where cod_producto='".$cod_producto."' and cod_lista_precio_productoFK !='".$cod_lista_precio_producto."'";	
 
	$stmt = $mysqli->prepare($consulta);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


    }




////////hasta aca es actualizar precio////////////

function buscardatosproductoparaauditoria($cod_producto,$cod_localFK)
{
	$mysqli=conectar_al_servidor();	
	$sql= "select pr.cod_barra,pr.cod_producto,pr.nombre_producto,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where estado='Activo' and pr.cod_producto='".$cod_producto."' and stk.cod_localFK='".$cod_localFK."'  ";	  
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 
 $cod_barra="";
 $nombre="";
 $compra="";
 $venta="";
 $stock=""; 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
				 $cod_barra=$valor['cod_barra'];
				 $nombre=$valor['nombre_producto'];
				 $compra=$valor['precio_compra'];
				 $venta=$valor['precio_producto'];
				 $stock=$valor['stock_producto'];
			 
	}
 }
 
 $datos[0]= $cod_barra ;
 $datos[1]= $nombre;
 $datos[2]= $compra;
 $datos[3]= $venta;
 $datos[4]= $stock;
 
 mysqli_close($mysqli);
return $datos;

}



 



function editarpreciocontado($precio_producto,$porcentaje,$cod_producto)
{

if($cod_producto=="" || $porcentaje=="" || $precio_producto==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);

$mysqli=conectar_al_servidor(); 


$consulta1="Update producto set  porcentaje=?,precio_producto=?,cod_user_edit=?,fecha_edit=? where cod_producto=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$porcentaje,$precio_producto,$user,$fecha_inser_edit,$cod_producto); 


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

function buscarlocalesproductos($stockproducto,$cod_productofk,$cod_localFK)
{
	$mysqli=conectar_al_servidor();	
	$sql= "Select * from local where estado='Activo' ";	  
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
		  
		  
		      $cod_local=$valor['cod_local'];
			  /* if($cod_localFK==$cod_local){
				  $cantidad=$stockproducto;
			  }else{
				   $cantidad=0;
			  } */
			  anhadirStockA(0,$cod_productofk,$cod_local);
	}
 }
 
 
 mysqli_close($mysqli);


}


function obtenerproductostockminimo($cod_productofk,$cod_localFK)
{
	$mysqli=conectar_al_servidor();	
	$sql= "Select cantidad from stockminimo where cod_productoFK='$cod_productofk' and cod_localFK='$cod_localFK' LIMIT 1 ";	  
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $cantidad = 0;
 if ($valor>0)
 {
	while ($valor= mysqli_fetch_assoc($result))
	{  

	 $cantidad = $valor["cantidad"];
	}
 }
 
 
 mysqli_close($mysqli);

return $cantidad;
}

function cargarFotos($cod_producto){
	
$ext=$_POST['ext'];
$ext = utf8_decode($ext);

if($ext!=""){
$foto=substr($_POST['foto'], strpos($_POST['foto'], ",") + 1);

$foto = base64_decode($foto);
$id_foto="";		  
		     $donde="../fotos/productos/";
			  $id_foto=$cod_producto;
                $id_f=subir_imagen_base64($donde,$foto,$id_foto,$ext);
$ruta="/GoodVentaElectroCasaMaric/fotos/productos/".$cod_producto.$id_f.'.'.$ext;
CargaFoto($ruta,$cod_producto);
}
}

function CargaFoto($Urlfoto,$cod_producto){
	$mysqli=conectar_al_servidor();
	$consulta="Update producto set url=? where cod_producto=? ";	


	$stmt = $mysqli->prepare($consulta);
$ss='ss';
$stmt->bind_param($ss,$Urlfoto,$cod_producto); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
	 mysqli_close($mysqli);
}



function  buscarCodigoProductos()
{
$mysqli=conectar_al_servidor();


$sql= "select count(pr.cod_producto)+10000
 from  producto pr ";

$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nroOrden=$result->fetch_row();
$nroOrden=$nroOrden[0];
$nroOrden=$nroOrden+1;
return $nroOrden;

}

function productoRegistroListadoArray($fila, $stockminimo)
{
    $campos=array('tipo','cod_barra','porcentaje','cod_producto','nombre_producto','descripcion_producto','url','unidad_producto','cod_localFK','cod_categoriaFK','cod_marcasFK','cod_ImpuestoFK','link','promo','tipo_producto','precio_producto','precio_compra','stock_producto','comision','estado','CodProveedor','proveedor','condicion_precio','localnombre','NombreCategoria','NombreImpuesto','NombreMarca','fecha_insert','fecha_edit','puntaje','insertadopor','editadopor');
    $registro=array();
    foreach($campos as $campo){
        $registro[$campo]=isset($fila[$campo]) && $fila[$campo]!==null ? utf8_encode((string)$fila[$campo]) : '';
    }
    $registro['stockminimo']=utf8_encode((string)$stockminimo);
    $registro['totalcostos']=(string)round(((float)$registro['precio_compra'])*((float)$registro['stock_producto']));
    return $registro;
}

function BuscarRegistro($EditarPrecio,$promo,$codigo,$producto,$marca,$categoria,$stock,$proveedor,$estado,$local,$ConStock,$puntaje)
{
$mysqli=conectar_al_servidor();
$condicionLocal="";
if($local!=""){
$condicionLocal="and stk.cod_localFK='".$local."' ";
}
$condicionCategria="";
if($categoria!=""){
$condicionCategria="and pr.cod_categoriaFK='".$categoria."' ";
}

$condicionMarca="";
if($marca!=""){
$condicionMarca="and pr.cod_marcasFK='".$marca."' ";
}
$condicionCodigo="";
if($codigo!=""){
$condicionCodigo="and pr.cod_barra = '".$codigo."' ";
}
$condicionPromo="";
if($promo!=""){
$condicionPromo="and pr.promo = '".$promo."' ";
}
$condicionProducto="";
if($producto!=""){
$condicionProducto="and concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$producto."%' ";
}
$condicionstock="";
if($stock!=""){
$condicionstock=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= '".$stock."' ";
}
$condicionproveedor="";
if($proveedor!=""){
$condicionproveedor="and (Select nombre_persona from persona where cod_persona=pr.CodProveedor limit 1) like  '%".$proveedor."%' ";
}

$condicionstockCondi="";
if($ConStock=="constock"){
$condicionstockCondi=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0 ";
}
if($ConStock=="sinstock"){
$condicionstockCondi=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0 ";
}

$condicionEditarPrecio="";
if($EditarPrecio!=""){
$condicionEditarPrecio="and condicion_precio= '".$EditarPrecio."' ";
}

$condicionPuntaje="";
if($puntaje=="1"){
$condicionPuntaje=" and IFNULL((SELECT punto FROM puntos where cod_productoFK = pr.cod_producto),0) = 0 ";
}

if($puntaje=="2"){
$condicionPuntaje=" and IFNULL((SELECT punto FROM puntos where cod_productoFK = pr.cod_producto),0) > 0 ";
}

$sql= "select pr.tipo,pr.cod_barra,pr.porcentaje,pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.url,
pr.unidad_producto,stk.cod_localFK,cod_categoriaFK,cod_marcasFK,cod_ImpuestoFK,pr.link,pr.promo,pr.tipo_producto,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,pr.comision,pr.estado,pr.CodProveedor,
(Select nombre_persona from persona where cod_persona=pr.CodProveedor limit 1) as proveedor,condicion_precio,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as localnombre,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
pr.fecha_insert,pr.fecha_edit,
IFNULL((SELECT punto FROM puntos where cod_productoFK = pr.cod_producto),0) as puntaje,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='".$estado."' and (select estado from local where cod_local= stk.cod_localFK limit 1 ) ='Activo'  ".$condicionPromo.$condicionMarca.$condicionCategria.$condicionLocal.$condicionCodigo.$condicionProducto.$condicionstock.$condicionproveedor.$condicionstockCondi.$condicionEditarPrecio.$condicionPuntaje." order by pr.nombre_producto asc limit 100 "; 	




$stmt = $mysqli->prepare($sql);
$pagina = "";
$registros=array();
$devolverArray=isset($_POST['formato']) && $_POST['formato']==='json';
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


$link = utf8_encode($valor['link']);
$promo = utf8_encode($valor['promo']);
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
$local = utf8_encode($valor['cod_localFK']); 
$localnombre = utf8_encode($valor['localnombre']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$cod_categoriaFK = utf8_encode($valor['cod_categoriaFK']); 
$cod_marcasFK = utf8_encode($valor['cod_marcasFK']); 
$cod_ImpuestoFK = utf8_encode($valor['cod_ImpuestoFK']); 
$porcentaje = utf8_encode($valor['porcentaje']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$tipo = utf8_encode($valor['tipo']); 
$CodProveedorFK = utf8_encode($valor['CodProveedor']); 
$proveedor = utf8_encode($valor['proveedor']); 
$insertadopor = utf8_encode($valor['insertadopor']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
$url = utf8_encode($valor['url']); 
$tipo_producto = utf8_encode($valor['tipo_producto']); 
$condicion_precio = utf8_encode($valor['condicion_precio']); 
$puntaje = utf8_encode($valor['puntaje']); 
$stockminimo = obtenerproductostockminimo($cod_producto,$cod_localFK);
$registros[]=productoRegistroListadoArray($valor,$stockminimo);
$totalcostos=$precio_compra*$stock_producto;
$styleName=CargarStyleTable($styleName);


if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosabmProducto(this)'>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td id='td_datos_19' style='width:5%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreImpuesto."</td>
<td  id='td_datos_13' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_11' style='width:10%'>".$NombreCategoria."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_6' style='width:5%'>".number_format($stock_producto,'0',',','.')."</td>
<td  id='td_datos_4' style='display:none'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_5' style='width:5%'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_18' style='display:none'>".number_format($totalcostos,'0',',','.')."</td>
<td  id='' style='width:10%'>".$localnombre."</td>
<td  id='td_datos_22' style='width:10%'>".$proveedor."</td>
<td  id='td_datos_24' style='width:5%'>".$promo."</td>
<td  id='td_datos_25' style='width:5%'>".$puntaje."</td>
<td  id='td_datos_108' style='width:5%'>".$condicion_precio."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_14' style='display:none'>".$cod_categoriaFK."</td>
<td  id='td_datos_15' style='display:none'>".$cod_marcasFK."</td>
<td  id='td_datos_16' style='display:none'>".$cod_ImpuestoFK."</td>
<td  id='td_datos_17' style='display:none'>".$porcentaje."</td>
<td  id='td_datos_20' style='display:none'>".$tipo."</td>
<td  id='td_datos_23' style='display:none'>".$CodProveedorFK."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
<td  id='td_datos_104' style='display:none'>".$link."</td>
<td  id='td_datos_105' style='display:none'>".$url."</td>
<td  id='td_datos_106' style='display:none'>".$stockminimo."</td>
<td  id='td_datos_107' style='display:none'>".$tipo_producto."</td>
</tr>
</table>";
}


}
}

$sql= "select pr.tipo
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='".$estado."' and (select estado from local where cod_local= stk.cod_localFK limit 1 ) ='Activo' ".$condicionMarca.$condicionCategria.$condicionLocal.$condicionCodigo.$condicionProducto.$condicionstock.$condicionproveedor.$condicionstockCondi.$condicionPromo.$condicionEditarPrecio.$condicionPuntaje." order by pr.nombre_producto asc  "; 	
  $stmt = $mysqli->prepare($sql); 
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;
$informacion =array("1" => "exito","2" => ($devolverArray ? $registros : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($valor,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistro);
echo json_encode($informacion);	
exit;
}

function BuscarMasRegistro($EditarPrecio,$promo,$codigo,$producto,$marca,$categoria,$stock,$proveedor,$estado,$local,$registrocargado,$ConStock,$puntaje)
{
$mysqli=conectar_al_servidor();
$condicionLocal="";
if($local!=""){
$condicionLocal="and stk.cod_localFK='".$local."' ";
}
$condicionCategria="";
if($categoria!=""){
$condicionCategria="and pr.cod_categoriaFK='".$categoria."' ";
}

$condicionMarca="";
if($marca!=""){
$condicionMarca="and pr.cod_marcasFK='".$marca."' ";
}
$condicionCodigo="";
if($codigo!=""){
$condicionCodigo="and pr.cod_barra = '".$codigo."' ";
}
$condicionPromo="";
if($promo!=""){
$condicionPromo="and pr.promo = '".$promo."' ";
}
$condicionProducto="";
if($producto!=""){
$condicionProducto="and concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$producto."%' ";
}
$condicionstock="";
if($stock!=""){
$condicionstock=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= '".$stock."' ";
}
$condicionproveedor="";
if($proveedor!=""){
$condicionproveedor="and (Select nombre_persona from persona where cod_persona=pr.CodProveedor limit 1) like  '%".$proveedor."%' ";
}

$condicionstockCondi="";
if($ConStock=="constock"){
$condicionstockCondi=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0 ";
}
if($ConStock=="sinstock"){
$condicionstockCondi=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0 ";
}

$condicionEditarPrecio="";
if($EditarPrecio!=""){
$condicionEditarPrecio="and condicion_precio= '".$EditarPrecio."' ";
}

$condicionPuntaje="";
if($puntaje=="1"){
$condicionPuntaje=" and IFNULL((SELECT punto FROM puntos where cod_productoFK = pr.cod_producto),0) = 0 ";
}

if($puntaje=="2"){
$condicionPuntaje=" and IFNULL((SELECT punto FROM puntos where cod_productoFK = pr.cod_producto),0) > 0 ";
}

$sql= "select pr.tipo,pr.cod_barra,pr.porcentaje,pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,stk.cod_localFK,cod_categoriaFK,cod_marcasFK,cod_ImpuestoFK,pr.promo,pr.tipo_producto,condicion_precio,link,url,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,pr.comision,pr.estado,pr.CodProveedor,
(Select nombre_persona from persona where cod_persona=pr.CodProveedor limit 1) as proveedor,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as localnombre,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
pr.fecha_insert,pr.fecha_edit,
IFNULL((SELECT punto FROM puntos where cod_productoFK = pr.cod_producto),0) as puntaje,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='".$estado."' and (select estado from local where cod_local= stk.cod_localFK limit 1 ) ='Activo' ".$condicionMarca.$condicionCategria.$condicionLocal.$condicionCodigo.$condicionProducto.$condicionstock.$condicionproveedor.$condicionstockCondi.$condicionPromo.$condicionEditarPrecio.$condicionPuntaje." order by pr.nombre_producto asc limit ".$registrocargado.", 100 "; 



$stmt = $mysqli->prepare($sql);
$pagina = "";
$registros=array();
$devolverArray=isset($_POST['formato']) && $_POST['formato']==='json';
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

 
$url = utf8_encode($valor['url']); 
$link = utf8_encode($valor['link']); 
$condicion_precio = utf8_encode($valor['condicion_precio']);
$cod_producto = utf8_encode($valor['cod_producto']);
$promo = utf8_encode($valor['promo']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
$unidad_producto = utf8_encode($valor['unidad_producto']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$precio_compra = utf8_encode($valor['precio_compra']); 
$stock_producto = utf8_encode($valor['stock_producto']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$local = utf8_encode($valor['cod_localFK']); 
$localnombre = utf8_encode($valor['localnombre']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$cod_categoriaFK = utf8_encode($valor['cod_categoriaFK']); 
$cod_marcasFK = utf8_encode($valor['cod_marcasFK']); 
$cod_ImpuestoFK = utf8_encode($valor['cod_ImpuestoFK']); 
$porcentaje = utf8_encode($valor['porcentaje']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$tipo = utf8_encode($valor['tipo']); 
$CodProveedorFK = utf8_encode($valor['CodProveedor']); 
$proveedor = utf8_encode($valor['proveedor']); 
$insertadopor = utf8_encode($valor['insertadopor']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
$tipo_producto = utf8_encode($valor['tipo_producto']); 
$puntaje = utf8_encode($valor['puntaje']); 
$totalcostos=$precio_compra*$stock_producto;
$styleName=CargarStyleTable($styleName);

$stockminimo = obtenerproductostockminimo($cod_producto,$cod_localFK);
$registros[]=productoRegistroListadoArray($valor,$stockminimo);


if(!$devolverArray){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosabmProducto(this)'>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td id='td_datos_19' style='width:5%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreImpuesto."</td>
<td  id='td_datos_13' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_11' style='width:10%'>".$NombreCategoria."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_6' style='width:5%'>".number_format($stock_producto,'0',',','.')."</td>
<td  id='td_datos_4' style='display:none'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_5' style='width:5%'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_18' style='display:none'>".number_format($totalcostos,'0',',','.')."</td>
<td  id='' style='width:10%'>".$localnombre."</td>
<td  id='td_datos_22' style='width:10%'>".$proveedor."</td>
<td  id='td_datos_24' style='width:5%'>".$promo."</td>
<td  id='td_datos_25' style='width:5%'>".$puntaje."</td>
<td  id='td_datos_108' style='width:5%'>".$condicion_precio."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_14' style='display:none'>".$cod_categoriaFK."</td>
<td  id='td_datos_15' style='display:none'>".$cod_marcasFK."</td>
<td  id='td_datos_16' style='display:none'>".$cod_ImpuestoFK."</td>
<td  id='td_datos_17' style='display:none'>".$porcentaje."</td>
<td  id='td_datos_20' style='display:none'>".$tipo."</td>
<td  id='td_datos_23' style='display:none'>".$CodProveedorFK."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
<td  id='td_datos_104' style='display:none'>".$link."</td>
<td  id='td_datos_105' style='display:none'>".$url."</td>
<td  id='td_datos_106' style='display:none'>".$stockminimo."</td>
<td  id='td_datos_107' style='display:none'>".$tipo_producto."</td>
</tr>
</table>";
}



}
}

    
$informacion =array("1" => "exito","2" => ($devolverArray ? $registros : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($valor,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}

function EnviarProductoA($stock,$cod_local_a,$cod_local_de,$fecha,$cod_producto_fk,$cod_ext,$cod_usuario_fk)
{
	
$mysqli=conectar_al_servidor();


$stockAnterior=obtener_stock_localesProducto($cod_producto_fk,$cod_local_de);


$consulta1="Insert into historialdespacho (stock,cod_local_a,cod_local_de,fecha,cod_producto_fk,cod_usuario_fk,cod_ext,estado_solicitud,stock_ant) values(?,?,?,?,?,?,?,'ACEPTADO',?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$stock,$cod_local_a,$cod_local_de,$fecha,$cod_producto_fk,$cod_usuario_fk,$cod_ext,$stockAnterior);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



SumarRestarStockA($stock,$cod_producto_fk,$cod_local_de,"RESTA","PRODUCTO DESPACHADO");
SumarRestarStockA($stock,$cod_producto_fk,$cod_local_a,"SUMA","PRODUCTO DESPACHADO");

 mysqli_close($mysqli);
 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function obtener_stock_localesProducto($cod_productoFK,$cod_localFK)
{
	$cantidad =0;
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "select stk.cantidad from  stocklocales stk where  stk.cod_productofk = '$cod_productoFK' and cod_localfk='$cod_localFK'";
	
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
		      $cantidad=$valor['cantidad'];
	  }
 }
 
  mysqli_close($mysqli);
 return $cantidad;
}






function SalidaDeposito($stock,$cod_local_deposito,$fecha,$cod_producto_fk,$cod_ext,$cod_usuario_fk,$stock_ant,$nombre_lista,$idcontroldepositoFK)
{
	
$mysqli=conectar_al_servidor();

$estado_stock = 'CORRECTO';
if($stock != $stock_ant){
	$estado_stock = 'INCORRECTO';
}

if($idcontroldepositoFK==''){
	$idcontroldepositoFK = insertar_nombre_lista_controldeposito($nombre_lista,$cod_local_deposito);
}



$consulta1="Insert into historialsalidadeposito (stock,cod_local_deposito,fecha,cod_producto_fk,cod_usuario_fk,cod_ext,stock_ant,estado,estado_stock,idlista_controldepositoFK)
 values(?,?,?,?,?,?,?,'Activo',?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssss';
$stmt1->bind_param($ss,$stock,$cod_local_deposito,$fecha,$cod_producto_fk,$cod_usuario_fk,$cod_ext,$stock_ant,$estado_stock,$idcontroldepositoFK);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

 mysqli_close($mysqli);
 
$informacion =array("1" => "exito","2" => $idcontroldepositoFK);
echo json_encode($informacion);	
exit;
}

function insertar_nombre_lista_controldeposito($nombre,$cod_localFK)
{
	
$mysqli=conectar_al_servidor();

	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d'); 

$consulta1="Insert into `lista_controldeposito` (nombre,fecha_insert,cod_localFK)
 values('$nombre','$fecha_inser_edit','$cod_localFK')";
 $stmt1 = $mysqli->prepare($consulta1);


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$ult_id = mysqli_insert_id($mysqli);
mysqli_close($mysqli);
return $ult_id;
}

function anhadirStockA($cantidad,$cod_productofk,$cod_localfk)
{
	
$mysqli=conectar_al_servidor();
$consulta1="Insert into stocklocales (cantidad,cod_productofk,cod_localfk) values(?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$cantidad,$cod_productofk,$cod_localfk);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);

}

function EditarStockA($cantidad,$cod_productofk,$cod_localfk)
{
$mysqli=conectar_al_servidor();

$user=$_POST['useru'];
    $user = utf8_decode($user);

$consulta1="update stocklocales set cantidad='$cantidad',user_update = '$user' where cod_productofk='$cod_productofk' and cod_localfk='$cod_localfk' ";



$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);

}

function agregarStockMinimo($cantidad,$cod_productofk,$cod_localfk)
{
	$user=$_POST['useru'];
    $user = utf8_decode($user);
	
$mysqli=conectar_al_servidor();
$consulta1="INSERT INTO stockminimo (cantidad,cod_productoFK,cod_localFK,user_update) values ('$cantidad','$cod_productofk','$cod_localfk','$user') ";

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);
}

function actualizarStockMinimo($cantidad,$cod_productofk,$cod_localfk)
{
$mysqli=conectar_al_servidor();


$user=$_POST['useru'];
    $user = utf8_decode($user);

$consulta1="UPDATE stockminimo SET cantidad = '$cantidad' WHERE cod_productoFK = '$cod_productofk' and cod_localFK = '$cod_localfk' and user_update = '$user' ";

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);
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


function  buscarporcodigoeditar($buscar)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$sql= "select pr.tipo,pr.cod_barra,pr.porcentaje,pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,cod_categoriaFK
,cod_marcasFK,cod_ImpuestoFK,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,pr.CodProveedor,
(Select nombre_persona from persona where cod_persona=pr.CodProveedor limit 1) as proveedor,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as localnombre,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.cod_producto='$buscar' order by pr.nombre_producto asc limit 1 ";
$stmt = $mysqli->prepare($sql);
$pagina = "";   
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
$local = utf8_encode($valor['cod_localFK']); 
$localnombre = utf8_encode($valor['localnombre']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$cod_categoriaFK = utf8_encode($valor['cod_categoriaFK']); 
$cod_marcasFK = utf8_encode($valor['cod_marcasFK']); 
$cod_ImpuestoFK = utf8_encode($valor['cod_ImpuestoFK']); 
$porcentaje = utf8_encode($valor['porcentaje']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$tipo = utf8_encode($valor['tipo']); 
$CodProveedorFK = utf8_encode($valor['CodProveedor']); 
$proveedor = utf8_encode($valor['proveedor']); 

$totalcostos=$precio_compra*$stock_producto;
$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$localnombre,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "codigo_categoria"=>$cod_categoriaFK,
      "codigo_marca"=>$cod_marcasFK,
      "codigo_impuesto"=>$cod_ImpuestoFK,
      "porcentaje"=>$porcentaje,
      "tipo"=>$tipo,
      "codigo_proveedor"=>$CodProveedorFK,
      "proveedor"=>$proveedor,
      "total_costo"=>(float)$totalcostos,
      "total_costo_formateado"=>number_format((float)$totalcostos,'0',',','.')
   )
);

	  $pagina.="
<table style='display:none'>
<tr id='tbRegistroCodProducto' >
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td id='td_datos_19' style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreImpuesto."</td>
<td  id='td_datos_13' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_11' style='width:10%'>".$NombreCategoria."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_4' style='width:10%'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($stock_producto,'2',',','.')."</td>
<td  id='td_datos_18' style='display:none'>".number_format($totalcostos,'0',',','.')."</td>
<td  id='td_datos_22' style='width:10%'>".$proveedor."</td>
<td  id='' style='width:10%'>".$localnombre."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_14' style='display:none'>".$cod_categoriaFK."</td>
<td  id='td_datos_15' style='display:none'>".$cod_marcasFK."</td>
<td  id='td_datos_16' style='display:none'>".$cod_ImpuestoFK."</td>
<td  id='td_datos_17' style='display:none'>".$porcentaje."</td>
<td  id='td_datos_20' style='display:none'>".$tipo."</td>
<td  id='td_datos_23' style='display:none'>".$CodProveedorFK."</td>

</tr>
</table>";


}
}

$sql= "select count(pr.cod_producto) from  producto pr where  pr.estado='Activo' ";	
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$result = $stmt->get_result();
$nro_total=$result->fetch_row();
$valor=$nro_total[0];

    
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($valor,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarInventario($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$cod_admin_locales)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicioncategoria="";
if($Categoria!=""){
	$condicioncategoria=" and pr.cod_categoriaFK='$Categoria'";
}
$condicionmarca="";
if($Marcas!=""){
	$condicionmarca=" and pr.cod_marcasFK='$Marcas'";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%'";
}
$condicionstock="";
if($stock!=""){
	$condicionstock=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= '".$stock."'";
}
$condicioncodproducto="";
if($codproducto!=""){
	$condicioncodproducto=" and pr.cod_barra = '".$codproducto."'";
}
$condicionlocal="";
if($local!=""){
	$condicionlocal=" and stk.cod_localFK = '".$local."'";
}


$condicionIn = "";
$condicioncod_admin_locales="";
if($cod_admin_locales!=""){
	$datos = obtener_cod_admin_locales($cod_admin_locales);
	$contador = 0;
	foreach ($datos as $valor) {
			$contador++;
			if($contador == 1){
				$condicionIn .="$valor";
			}else{
				$condicionIn .=",$valor";
			}
	}
	
	$condicioncod_admin_locales .= " and stk.cod_localFK in ($condicionIn)";
}




// echo $condicioncod_admin_locales;
// exit;

$condicioncontrol="";
if($control!=""){
	if($control =="1"){
		$condicioncontrol=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0";
	}
	
	if($control =="2"){
		$condicioncontrol=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0";
	}
}

$sql= "select pr.cod_barra,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,(pr.precio_producto-pr.precio_compra) as ganancia,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='Activo' and (select estado from local where cod_local= stk.cod_localFK limit 1 )='Activo' ".$condicionproducto.$condicionstock.$condicioncodproducto.$condicioncategoria.$condicionmarca.$condicionlocal.$condicioncontrol.$condicioncod_admin_locales." ORDER BY nombre_producto ASC limit 50";

$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$costototales=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_barra']);
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
$ganancia = utf8_encode($valor['ganancia']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$totalcostos=$precio_compra*$stock_producto;
$costototales=$costototales+$totalcostos;
$styleFondo="";
if($stock_producto<0){
$styleFondo="background-color:#FF5722;color:#fff";	
}


$precioTotal=$precio_compra * $stock_producto;
$filas[]=array(
"codigo_barra"=>$cod_producto,
"producto"=>$nombre_producto,
"categoria"=>$NombreCategoria,
"marca"=>$NombreMarca,
"stock"=>(float)$stock_producto,
"stock_formateado"=>number_format($stock_producto,'0',',','.'),
"costo"=>(float)$precio_compra,
"costo_formateado"=>number_format($precio_compra,'0',',','.'),
"total_costo"=>(float)$precioTotal,
"total_costo_formateado"=>number_format($precioTotal,'0',',','.'),
"local"=>$local,
"stock_negativo"=>((float)$stock_producto<0)
);
//$paginaprecios=number_format($precio_producto,'0',',','.')."Gs, Contado <br>".buscardetallespreciosb($cod_producto, $precio_producto,$comision);
$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' style='$styleFondo'>
<tr id='tbSelecRegistro' >
<td  style='width:10%'>".$cod_producto."</td>
<td  style='width:40%'>".$nombre_producto."</td>
<td  style='width:15%'>".$NombreCategoria."</td>
<td  style='width:15%'>".$NombreMarca."</td>
<td  style='width:10%;'>".number_format($stock_producto,'0',',','.')."</td>
<td  style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  style='display:none'>".number_format($precioTotal,'0',',','.')."</td>
<td  style='width:10%'>".$local."</td>
</tr>
</tr>
</table>";
	}


}
}
$sql= "select pr.cod_barra
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='Activo' and (select estado from local where cod_local= stk.cod_localFK limit 1 )='Activo'  ".$condicionproducto.$condicionstock.$condicioncodproducto.$condicioncategoria.$condicionmarca.$condicionlocal.$condicioncontrol.$condicioncod_admin_locales." ";
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;    

$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($costototales,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistro);
echo json_encode($informacion);	
exit;
}

function buscarMasInventario($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$totalcostos,$cod_admin_locales,$registrocargados)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicioncategoria="";
if($Categoria!=""){
	$condicioncategoria=" and pr.cod_categoriaFK='$Categoria'";
}
$condicionmarca="";
if($Marcas!=""){
	$condicionmarca=" and pr.cod_marcasFK='$Marcas'";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%'";
}
$condicionstock="";
if($stock!=""){
	$condicionstock=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= '".$stock."'";
}
$condicioncodproducto="";
if($codproducto!=""){
	$condicioncodproducto=" and pr.cod_barra = '".$codproducto."'";
}
$condicionlocal="";
if($local!=""){
	$condicionlocal=" and stk.cod_localFK = '".$local."'";
}
$condicioncontrol="";
if($control!=""){
	if($control =="1"){
		$condicioncontrol=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0";
	}
	
	if($control =="2"){
		$condicioncontrol=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0";
	}
}


$condicionIn = "";
$condicioncod_admin_locales="";
if($cod_admin_locales!=""){
	$datos = obtener_cod_admin_locales($cod_admin_locales);
	$contador = 0;
	foreach ($datos as $valor) {
			$contador++;
			if($contador == 1){
				$condicionIn .="$valor";
			}else{
				$condicionIn .=",$valor";
			}
	}
	
	$condicioncod_admin_locales .= " and stk.cod_localFK in ($condicionIn)";
}



$sql= "select pr.cod_barra,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,(pr.precio_producto-pr.precio_compra) as ganancia,
pr.precio_producto,pr.precio_compra,
IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,
stk.cod_localFK,pr.comision,pr.estado,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='Activo' and (select estado from local where cod_local= stk.cod_localFK limit 1 )='Activo'  ".$condicionproducto.$condicionstock.$condicioncodproducto.$condicioncategoria.$condicionmarca.$condicionlocal.$condicioncontrol.$condicioncod_admin_locales." ORDER BY nombre_producto limit ".$registrocargados." , 50 ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargados;
$costototales=$totalcostos;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_barra']);
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
$ganancia = utf8_encode($valor['ganancia']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$totalcostos=$precio_compra*$stock_producto;
$costototales=$costototales+$totalcostos;
$styleFondo="";
if($stock_producto<0){
$styleFondo="background-color:#FF5722;color:#fff";	
}

$precioTotal=$precio_compra * $stock_producto;
$filas[]=array(
"codigo_barra"=>$cod_producto,
"producto"=>$nombre_producto,
"categoria"=>$NombreCategoria,
"marca"=>$NombreMarca,
"stock"=>(float)$stock_producto,
"stock_formateado"=>number_format($stock_producto,'0',',','.'),
"costo"=>(float)$precio_compra,
"costo_formateado"=>number_format($precio_compra,'0',',','.'),
"total_costo"=>(float)$precioTotal,
"total_costo_formateado"=>number_format($precioTotal,'0',',','.'),
"local"=>$local,
"stock_negativo"=>((float)$stock_producto<0)
);
//$paginaprecios=number_format($precio_producto,'0',',','.')."Gs, Contado <br>".buscardetallespreciosb($cod_producto, $precio_producto,$comision);
$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' style='$styleFondo'>
<tr id='tbSelecRegistro' >
<td  style='width:10%'>".$cod_producto."</td>
<td  style='width:40%'>".$nombre_producto."</td>
<td  style='width:15%'>".$NombreCategoria."</td>
<td  style='width:15%'>".$NombreMarca."</td>
<td  style='width:10%;'>".number_format($stock_producto,'0',',','.')."</td>
<td  style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  style='display:none'>".number_format($precioTotal,'0',',','.')."</td>
<td  style='width:10%'>".$local."</td>
</tr>
</tr>
</table>";
	}


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($costototales,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscarStock($proveedor,$producto,$codproducto,$stock,$local,$Categoria,$Marcas,$existencia,$cod_admin_locales,$agrupadopor)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$condicionproveedor="";
if($proveedor!=""){
	$condicionproveedor=" and per.nombre_persona like '%$proveedor%'";
}

$condicioncategoria="";
if($Categoria!=""){
	$condicioncategoria=" and pr.cod_categoriaFK='$Categoria'";
}



$condicionmarca="";
if($Marcas!=""){
	$condicionmarca=" and pr.cod_marcasFK='$Marcas'";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%'";
}
$condicionstock="";
if($stock!=""){
	// $condicionstock=" and stk.cantidad <= '".$stock."'";
}
$condicioncodproducto="";
if($codproducto!=""){
	$condicioncodproducto=" and pr.cod_barra = '".$codproducto."'";
}
$condicionlocal="";
if($local!=""){
	$condicionlocal=" and stk.cod_localFK = '".$local."'";
}

$condicionexistencia="";
if($existencia=="1"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}

if($existencia=="2"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) < (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}

if($existencia=="3"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) = (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}

if($existencia=="4"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}


$group=" group by stk.cod_localFK, pr.cod_barra asc ";
if($agrupadopor== '1'){
	$group = ' group by pr.cod_producto ,al.idadmin_local asc';
}

$condicionIn = "";
$condicioncod_admin_locales="";

if($cod_admin_locales!=""){
 
	$condicioncod_admin_locales = " and idadmin_local='".$cod_admin_locales."'";
	$group=' group by pr.cod_barra asc';
}



$sql= "SELECT 
    pr.cod_barra,pr.nombre_producto, pr.descripcion_producto, pr.unidad_producto,   
    pr.precio_producto, pr.precio_compra, IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) AS stock_producto, stk.cod_localFK, pr.comision, pr.estado, cat.descripcion AS NombreCategoria, mar.descripcion AS NombreMarca, per.nombre_persona AS proveedor, sum(sm.stockMinimo) as stockMinimo, l.Nombre AS local,if( IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) < sum(sm.stockMinimo), sum(sm.stockMinimo) - IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0),0 ) as faltante,
	al.descripcion as admin_local
FROM producto pr
INNER JOIN stocklocales stk ON stk.cod_productofk = pr.cod_producto
INNER JOIN detalle_admin_local dal ON dal.cod_localFK = stk.cod_localFK
INNER JOIN admin_local al ON al.idadmin_local = dal.idadmin_localFK
INNER JOIN local l ON l.cod_local = stk.cod_localFK
LEFT JOIN categoria cat ON cat.cod_categoria = pr.cod_categoriaFK
LEFT JOIN marcas mar ON mar.cod_marcas = pr.cod_marcasFK
LEFT JOIN persona per ON per.cod_persona = pr.CodProveedor
LEFT JOIN (
    SELECT cod_productoFK, cod_localFK, SUM(cantidad) AS stockMinimo
    FROM stockminimo 
    GROUP BY cod_productoFK, cod_localFK
) sm ON sm.cod_productoFK = pr.cod_producto AND sm.cod_localFK = stk.cod_localFK
WHERE 
    pr.estado = 'Activo' 
    AND l.estado = 'Activo'
	AND (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)>0
 ".$condicionexistencia.$condicionproducto.$condicionstock.$condicioncodproducto.$condicioncategoria.$condicionmarca.$condicionlocal.$condicioncod_admin_locales.$condicionproveedor." $group limit  150 ";
 


$pagina = "";  
$pagina2 = ""; 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$costototales=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_barra']);
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
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$stockMinimo = utf8_encode($valor['stockMinimo']);
$proveedor = utf8_encode($valor['proveedor']);
$admin_local = utf8_encode($valor['admin_local']);
$faltante = utf8_encode($valor['faltante']);
$totalcostos=$precio_compra*$stock_producto;
$costototales=$costototales+$totalcostos;

$styleFondo="";
/* $faltante = 0;
if($stock_producto < $stockMinimo){
	$faltante = $stockMinimo - $stock_producto;
} */
 
$styleName=CargarStyleTable($styleName);
	$filas[]=array(
		"codigo_barra"=>$cod_producto,
		"producto"=>$nombre_producto,
		"categoria"=>$NombreCategoria,
		"marca"=>$NombreMarca,
		"stock_minimo"=>(float)$stockMinimo,
		"stock_actual"=>(float)$stock_producto,
		"faltante"=>(float)$faltante,
		"precio"=>(float)$precio_producto,
		"precio_formateado"=>number_format($precio_producto,'0',',','.'),
		"proveedor"=>$proveedor,
		"local"=>$admin_local,
		"local_nombre"=>$local,
		"codigo_local"=>$cod_localFK
	);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  style='width:10%'>".$cod_producto."</td>
<td  style='width:30%'>".$nombre_producto."</td>
<td  style='width:10%'>".$NombreCategoria."</td>
<td  style='width:10%'>".$NombreMarca."</td>
<td  style='width:5%'>".$stockMinimo."</td>
<td  style='width:5%;'>".$stock_producto."</td>
<td  style='width:5%;'>".$faltante."</td>
<td  style='width:5%;'>".number_format($precio_producto,'0',',','.')."</td>
<td  style='width:10%'>".$proveedor."</td>
<td  style='width:10%'>".$admin_local."</td>
</tr>
</tr>
</table>"; 


$pagina2.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  style='display:none'>".$cod_producto."</td>
<td  style='width:30%'>".$nombre_producto."</td>
<td  style='display:none'>".$NombreCategoria."</td>
<td  style='width:10%'>".$NombreMarca."</td>
<td  style='display:none'>".$stockMinimo."</td>
<td  style='display:none'>".$stock_producto."</td>
<td  style='width:5%;'>".$faltante."</td>
<td  style='display:none'>".number_format($precio_producto,'0',',','.')."</td>
<td  style='display:none'>".$proveedor."</td>
<td  style='width:10%'>".$admin_local."</td>
</tr>
</tr>
</table>";
	}


}
}
 

$sql= "SELECT  pr.cod_barra 
FROM producto pr
INNER JOIN stocklocales stk ON stk.cod_productofk = pr.cod_producto
INNER JOIN detalle_admin_local dal ON dal.cod_localFK = stk.cod_localFK
INNER JOIN admin_local al ON al.idadmin_local = dal.idadmin_localFK
INNER JOIN local l ON l.cod_local = stk.cod_localFK
LEFT JOIN categoria cat ON cat.cod_categoria = pr.cod_categoriaFK
LEFT JOIN marcas mar ON mar.cod_marcas = pr.cod_marcasFK
LEFT JOIN persona per ON per.cod_persona = pr.CodProveedor
LEFT JOIN (
    SELECT cod_productoFK, cod_localFK, SUM(cantidad) AS stockMinimo
    FROM stockminimo 
    GROUP BY cod_productoFK, cod_localFK
) sm ON sm.cod_productoFK = pr.cod_producto AND sm.cod_localFK = stk.cod_localFK
WHERE 
    pr.estado = 'Activo' 
    AND l.estado = 'Activo'
	AND (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)>0
 ".$condicionexistencia.$condicionproducto.$condicionstock.$condicioncodproducto.$condicioncategoria.$condicionmarca.$condicionlocal.$condicioncod_admin_locales.$condicionproveedor." $group  ";


$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;    

$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($costototales,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistro,"5"=>($formatoJson ? $filas : $pagina2));
echo json_encode($informacion);	
exit;
}

function buscarMasStock($proveedor,$producto,$codproducto,$stock,$local,$Categoria,$Marcas,$totalcostos,$registrocargados,$existencia,$cod_admin_locales,$agrupadopor)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$condicionproveedor="";
if($proveedor!=""){
	$condicionproveedor=" and per.nombre_persona like '%$proveedor%'";
}

$condicioncategoria="";
if($Categoria!=""){
	$condicioncategoria=" and pr.cod_categoriaFK='$Categoria'";
}
$condicionmarca="";
if($Marcas!=""){
	$condicionmarca=" and pr.cod_marcasFK='$Marcas'";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%'";
}
$condicionstock="";
if($stock!=""){
	// $condicionstock=" and stk.cantidad >= '".$stock."'";
}
$condicioncodproducto="";
if($codproducto!=""){
	$condicioncodproducto=" and pr.cod_barra = '".$codproducto."'";
}
$condicionlocal="";
if($local!=""){
	$condicionlocal=" and stk.cod_localFK = '".$local."'";
}


$condicionexistencia="";
if($existencia=="1"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}

if($existencia=="2"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) < (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}

if($existencia=="3"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) = (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}

if($existencia=="4"){
	$condicionexistencia=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)";
}

$group=" group by stk.cod_localFK, pr.cod_barra asc ";
if($agrupadopor== '1'){
	$group = ' group by pr.cod_producto ,al.idadmin_local asc';
}

$condicionIn = "";
$condicioncod_admin_locales="";

if($cod_admin_locales!=""){
 
	$condicioncod_admin_locales = " and idadmin_local='".$cod_admin_locales."'";
	$group=' group by pr.cod_barra asc';
}


$sql= "SELECT 
    pr.cod_barra,pr.nombre_producto, pr.descripcion_producto, pr.unidad_producto,  
    pr.precio_producto, pr.precio_compra, IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) AS stock_producto, stk.cod_localFK, pr.comision, pr.estado, cat.descripcion AS NombreCategoria, mar.descripcion AS NombreMarca, per.nombre_persona AS proveedor, sum(sm.stockMinimo) as stockMinimo, l.Nombre AS local,if( IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) < sum(sm.stockMinimo), sum(sm.stockMinimo) - IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0),0 ) as faltante,
	al.descripcion as admin_local
FROM producto pr
INNER JOIN stocklocales stk ON stk.cod_productofk = pr.cod_producto
INNER JOIN detalle_admin_local dal ON dal.cod_localFK = stk.cod_localFK
INNER JOIN admin_local al ON al.idadmin_local = dal.idadmin_localFK
INNER JOIN local l ON l.cod_local = stk.cod_localFK
LEFT JOIN categoria cat ON cat.cod_categoria = pr.cod_categoriaFK
LEFT JOIN marcas mar ON mar.cod_marcas = pr.cod_marcasFK
LEFT JOIN persona per ON per.cod_persona = pr.CodProveedor
LEFT JOIN (
    SELECT cod_productoFK, cod_localFK, SUM(cantidad) AS stockMinimo
    FROM stockminimo 
    GROUP BY cod_productoFK, cod_localFK
) sm ON sm.cod_productoFK = pr.cod_producto AND sm.cod_localFK = stk.cod_localFK
WHERE 
    pr.estado = 'Activo' 
    AND l.estado = 'Activo'
	AND (select (sm.cantidad) from  stockminimo sm where sm.cod_productoFK= pr.cod_producto and sm.cod_localFK=stk.cod_localFK)>0
 ".$condicionexistencia.$condicionproducto.$condicionstock.$condicioncodproducto.$condicioncategoria.$condicionmarca.$condicionlocal.$condicioncod_admin_locales.$condicionproveedor." $group limit ".$registrocargados." , 150 ";



$pagina = "";
$pagina2 = "";
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargados;
$costototales=$totalcostos;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_barra']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
$unidad_producto = utf8_encode($valor['unidad_producto']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$precio_compra = utf8_encode($valor['precio_compra']); 
$stock_producto = utf8_encode($valor['stock_producto']); 
$stockMinimo = utf8_encode($valor['stockMinimo']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$local = utf8_encode($valor['local']);   
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$proveedor = utf8_encode($valor['proveedor']); 
$admin_local = utf8_encode($valor['admin_local']); 
$faltante = utf8_encode($valor['faltante']); 
$totalcostos=$precio_compra*$stock_producto;
$costototales=$costototales+$totalcostos;

$styleFondo="";
/* $faltante = 0;
if($stock_producto < $stockMinimo){
	$faltante = $stockMinimo - $stock_producto;
} */
 
$styleName=CargarStyleTable($styleName);
	$filas[]=array(
		"codigo_barra"=>$cod_producto,
		"producto"=>$nombre_producto,
		"categoria"=>$NombreCategoria,
		"marca"=>$NombreMarca,
		"stock_minimo"=>(float)$stockMinimo,
		"stock_actual"=>(float)$stock_producto,
		"faltante"=>(float)$faltante,
		"precio"=>(float)$precio_producto,
		"precio_formateado"=>number_format($precio_producto,'0',',','.'),
		"proveedor"=>$proveedor,
		"local"=>$admin_local,
		"local_nombre"=>$local,
		"codigo_local"=>$cod_localFK
	);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  style='width:10%'>".$cod_producto."</td>
<td  style='width:30%'>".$nombre_producto."</td>
<td  style='width:10%'>".$NombreCategoria."</td>
<td  style='width:10%'>".$NombreMarca."</td>
<td  style='width:5%'>".$stockMinimo."</td>
<td  style='width:5%;'>".$stock_producto."</td>
<td  style='width:5%;'>".$faltante."</td>
<td  style='width:5%;'>".number_format($precio_producto,'0',',','.')."</td>
<td  style='width:10%'>".$proveedor."</td>
<td  style='width:10%'>".$admin_local."</td>
</tr>
</tr>
</table>";
	}

$pagina2.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  style='display:none'>".$cod_producto."</td>
<td  style='width:30%'>".$nombre_producto."</td>
<td  style='display:none'>".$NombreCategoria."</td>
<td  style='width:10%'>".$NombreMarca."</td>
<td  style='display:none'>".$stockMinimo."</td>
<td  style='display:none'>".$stock_producto."</td>
<td  style='width:5%;'>".$faltante."</td>
<td  style='display:none'>".number_format($precio_producto,'0',',','.')."</td>
<td  style='display:none'>".$proveedor."</td>
<td  style='width:10%'>".$admin_local."</td>
</tr>
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($costototales,'0',',','.'),"99"=>$nroRegistro,"5"=>($formatoJson ? $filas : $pagina2));
echo json_encode($informacion);	
exit;
}

function anulardespacho($cod_ext)
{
$mysqli=conectar_al_servidor();
$sql= "select htd.idhistorialdespacho,htd.stock,htd.fecha, htd.cod_local_de, htd.cod_local_a, htd.cod_producto_fk, htd.cod_usuario_fk,
pr.nombre_producto,pr.cod_barra
from  producto pr inner join historialdespacho htd on htd.cod_producto_fk=pr.cod_producto
where htd.cod_ext='".$cod_ext."' limit 1";
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
$idhistorialdespacho = utf8_encode($valor['idhistorialdespacho']);
$stock = utf8_encode($valor['stock']);          
$cod_local_de = utf8_encode($valor['cod_local_de']); 
$cod_local_a = utf8_encode($valor['cod_local_a']); 
$cod_producto_fk = utf8_encode($valor['cod_producto_fk']); 
/* SumarRestarStockA($stock,$cod_producto_fk,$cod_local_a,"restar");*/
// SumarRestarStockA($stock,$cod_producto_fk,$cod_local_de,"suma"); 
SumarRestarStockA($stock,$cod_producto_fk,$cod_local_de,"SUMA","DESPACHO ANULADO");
EditarHistorialDespacho($idhistorialdespacho);


}
}
 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function anularsalidaProducto($cod_ext)
{
$mysqli=conectar_al_servidor();

	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d h:i:s', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);
$mysqli=conectar_al_servidor();
$consulta1="update historialsalidadeposito set estado='Inactivo',cod_anulado_por='$user',fecha_anulacion='$fecha_inser_edit' where cod_ext='$cod_ext'";

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}



function EditarHistorialDespacho($idhistorialdespacho)
{
	/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);
$mysqli=conectar_al_servidor();
$consulta1="update historialdespacho set estado='Inactivo',cod_anulado_por='$user',fecha_anulacion='$fecha_inser_edit' where idhistorialdespacho='$idhistorialdespacho'";

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
 mysqli_close($mysqli);

}

function historialdespachado($fecha1,$fecha2,$codlocal1,$codlocal2,$cod_producto,$producto,$estado_solic)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condiciofecha="";
if($fecha1!=""){
	$condiciofecha=" and htd.fecha between '$fecha1' and '$fecha2'";
}
$condicionlocal1="";
if($codlocal1!=""){
	$condicionlocal1=" and htd.cod_local_a='$codlocal1'";
}
$condicionlocal2="";
if($codlocal2!=""){
	$condicionlocal2=" and htd.cod_local_a='$codlocal2'";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%'";
}
$condicioncodproducto="";
if($cod_producto!=""){
	$condicioncodproducto=" and pr.cod_barra = '".$cod_producto."'";
}
$condicioncodestado_solic="";
if($estado_solic!=""){
	$condicioncodestado_solic=" and htd.estado_solicitud = '".$estado_solic."'";
}

$sql= "select htd.idhistorialdespacho,htd.stock,htd.fecha, htd.cod_local_de, htd.cod_local_a, htd.cod_producto_fk, htd.cod_usuario_fk,
pr.nombre_producto,pr.cod_barra,htd.estado_solicitud,
(select Nombre from local where cod_local=htd.cod_local_de limit 1 ) as localde,
(select Nombre from local where cod_local=htd.cod_local_a limit 1 ) as locala,
(Select nombre_persona from persona where cod_persona=htd.cod_usuario_fk) as usuarionombre,
(Select nombre_persona from persona where cod_persona=htd.aceptado_por_userFK) as usuarioaceptado
from  producto pr inner join historialdespacho htd on htd.cod_producto_fk=pr.cod_producto
where pr.estado='Activo' and htd.estado='Activo' ".$condiciofecha.$condicionlocal1.$condicionlocal2.$condicionproducto.$condicioncodproducto.$condicioncodestado_solic." limit 50";

$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$costototales=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$idhistorialdespacho = utf8_encode($valor['idhistorialdespacho']);
$stock = utf8_encode($valor['stock']);          
$fecha = utf8_encode($valor['fecha']);          
$cod_local_de = utf8_encode($valor['cod_local_de']); 
$cod_local_a = utf8_encode($valor['cod_local_a']); 
$cod_producto_fk = utf8_encode($valor['cod_producto_fk']); 
$cod_usuario_fk = utf8_encode($valor['cod_usuario_fk']); 
$nombre_producto = utf8_encode($valor['nombre_producto']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$localde = utf8_encode($valor['localde']); 
$locala = utf8_encode($valor['locala']); 
$usuarionombre = utf8_encode($valor['usuarionombre']); 
$usuarioaceptado = utf8_encode($valor['usuarioaceptado']); 
$estado_solicitud = utf8_encode($valor['estado_solicitud']); 


$filas[]=array(
"codigo"=>$idhistorialdespacho,
"fecha"=>$fecha,
"codigo_local_origen"=>$cod_local_de,
"local_origen"=>$localde,
"codigo_local_destino"=>$cod_local_a,
"local_destino"=>$locala,
"codigo_producto"=>$cod_producto_fk,
"codigo_barra"=>$cod_barra,
"producto"=>$nombre_producto,
"cantidad"=>(float)$stock,
"cantidad_formateada"=>number_format($stock,'2',',','.'),
"codigo_usuario"=>$cod_usuario_fk,
"responsable"=>$usuarionombre,
"aceptado_por"=>$usuarioaceptado,
"estado"=>$estado_solicitud
);

$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td  style='width:10%'>".$fecha."</td>
<td  style='width:10%'>".$localde."</td>
<td  style='width:10%'>".$locala."</td>
<td  style='width:10%'>".$cod_barra."</td>
<td  style='width:10%'>".$nombre_producto."</td>
<td  style='width:10%;'>".number_format($stock,'2',',','.')."</td>
<td  style='width:10%'>".$usuarionombre."</td>
<td  style='width:10%'>".$usuarioaceptado."</td>
<td  style='width:10%'>".$estado_solicitud."</td>
</tr>
</tr>
</table>";
	}


}
}
$sql= "select htd.idhistorialdespacho,htd.stock,htd.fecha, htd.cod_local_de, htd.cod_local_a, htd.cod_producto_fk, htd.cod_usuario_fk,
pr.nombre_producto,pr.cod_barra,
(select Nombre from local where cod_local=htd.cod_local_de limit 1 ) as localde,
(select Nombre from local where cod_local=htd.cod_local_a limit 1 ) as locala,
(Select nombre_persona from persona where cod_persona=htd.cod_usuario_fk) as usuarionombre
from  producto pr inner join historialdespacho htd on htd.cod_producto_fk=pr.cod_producto
where pr.estado='Activo' and htd.estado='Activo' ".$condiciofecha.$condicionlocal1.$condicionlocal2.$condicionproducto.$condicioncodproducto.$condicioncodestado_solic;
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistros=$valor;

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"99"=>$nroRegistro,"100"=>$totalregistros);
echo json_encode($informacion);	
exit;
}

function historialmasdespachado($fecha1,$fecha2,$codlocal1,$codlocal2,$cod_producto,$producto,$estado_solic,$registrocargado)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condiciofecha="";
if($fecha1!=""){
	$condiciofecha=" and htd.fecha between '$fecha1' and '$fecha2'";
}
$condicionlocal1="";
if($codlocal1!=""){
	$condicionlocal1=" and htd.cod_local_a='$codlocal1'";
}
$condicionlocal2="";
if($codlocal2!=""){
	$condicionlocal2=" and htd.cod_local_a='$codlocal2'";
}
$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and pr.nombre_producto like '%".$producto."%'";
}
$condicioncodproducto="";
if($cod_producto!=""){
	$condicioncodproducto=" and pr.cod_barra = '".$cod_producto."'";
}

$condicioncodestado_solic="";
if($estado_solic!=""){
	$condicioncodestado_solic=" and htd.estado_solicitud = '".$estado_solic."'";
}

$sql= "select htd.idhistorialdespacho,htd.stock,htd.fecha, htd.cod_local_de, htd.cod_local_a, htd.cod_producto_fk, htd.cod_usuario_fk,htd.estado_solicitud,
pr.nombre_producto,pr.cod_barra,
(select Nombre from local where cod_local=htd.cod_local_de limit 1 ) as localde,
(select Nombre from local where cod_local=htd.cod_local_a limit 1 ) as locala,
(Select nombre_persona from persona where cod_persona=htd.cod_usuario_fk) as usuarionombre,
(Select nombre_persona from persona where cod_persona=htd.aceptado_por_userFK) as usuarioaceptado
from  producto pr inner join historialdespacho htd on htd.cod_producto_fk=pr.cod_producto
where pr.estado='Activo'  and htd.estado='Activo' ".$condiciofecha.$condicionlocal1.$condicionlocal2.$condicionproducto.$condicioncodproducto.$condicioncodestado_solic." limit ".$registrocargado.", 50 ";




$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargado;
$costototales=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$idhistorialdespacho = utf8_encode($valor['idhistorialdespacho']);
$stock = utf8_encode($valor['stock']);          
$fecha = utf8_encode($valor['fecha']);          
$cod_local_de = utf8_encode($valor['cod_local_de']); 
$cod_local_a = utf8_encode($valor['cod_local_a']); 
$cod_producto_fk = utf8_encode($valor['cod_producto_fk']); 
$cod_usuario_fk = utf8_encode($valor['cod_usuario_fk']); 
$nombre_producto = utf8_encode($valor['nombre_producto']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$localde = utf8_encode($valor['localde']); 
$locala = utf8_encode($valor['locala']); 
$usuarionombre = utf8_encode($valor['usuarionombre']); 
$usuarioaceptado = utf8_encode($valor['usuarioaceptado']); 
$estado_solicitud = utf8_encode($valor['estado_solicitud']); 
$filas[]=array(
"codigo"=>$idhistorialdespacho,
"fecha"=>$fecha,
"codigo_local_origen"=>$cod_local_de,
"local_origen"=>$localde,
"codigo_local_destino"=>$cod_local_a,
"local_destino"=>$locala,
"codigo_producto"=>$cod_producto_fk,
"codigo_barra"=>$cod_barra,
"producto"=>$nombre_producto,
"cantidad"=>(float)$stock,
"cantidad_formateada"=>number_format($stock,'2',',','.'),
"codigo_usuario"=>$cod_usuario_fk,
"responsable"=>$usuarionombre,
"aceptado_por"=>$usuarioaceptado,
"estado"=>$estado_solicitud
);
$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  style='width:10%'>".$fecha."</td>
<td  style='width:10%'>".$localde."</td>
<td  style='width:10%'>".$locala."</td>
<td  style='width:10%'>".$cod_barra."</td>
<td  style='width:10%'>".$nombre_producto."</td>
<td  style='width:10%;'>".number_format($stock,'2',',','.')."</td>
<td  style='width:10%'>".$usuarionombre."</td>
<td  style='width:10%'>".$usuarioaceptado."</td>
<td  style='width:10%'>".$estado_solicitud."</td>
</tr>
</tr>
</table>";
	}


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}


function buscarCatalogo($promo,$buscar,$local,$control,$marca,$categoria)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionlocal="";
if($local!=""){
	$condicionlocal=" and stk.cod_localFK='$local'";
}
$Cod_localFK=$local;
$condicionStockLocalCatalogo="";
if($local!=""){
	$condicionStockLocalCatalogo=" and sl_stock.cod_localFK='$local'";
}
$stockSqlCatalogo="IFNULL((
	SELECT SUM(sp_stock.entero)
	FROM stock_producto sp_stock
	INNER JOIN stocklocales sl_stock ON sl_stock.idstocklocales=sp_stock.cod_stocklocalesFK
	INNER JOIN local l_stock ON l_stock.cod_local=sl_stock.cod_localFK
	WHERE sl_stock.cod_productofk=pr.cod_producto
	AND l_stock.estado='Activo'
	".$condicionStockLocalCatalogo."
),0)";
$condicionControl = "";
if($control == 2){
	$condicionControl= " and ".$stockSqlCatalogo." > 0";
}

if($control == 3){
	$condicionControl= " and ".$stockSqlCatalogo." <= 0";
}

$condicionMarca="";
if($marca!=""){
$condicionMarca=" and pr.cod_marcasFK='".$marca."' ";
}

$condicionCategria="";
if($categoria!=""){
$condicionCategria=" and pr.cod_categoriaFK='".$categoria."' ";
}


$condicionpromo="";
if($promo!=""){
$condicionpromo=" and pr.promo='".$promo."' ";
}
 
$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,(pr.precio_producto-pr.precio_compra) as ganancia,
pr.precio_producto,pr.precio_compra,pr.stock_producto,MIN(stk.cod_localFK) as cod_localFK,pr.comision,pr.estado,pr.url,pr.cod_barra,
MIN(l.Nombre) as local,pr.promo,
MAX((select descripcion from marcas where cod_marcas=pr.cod_marcasFK limit 1)) as NombreMarca,
MAX(ifnull((select punto from puntos p where pr.cod_producto=p.cod_productoFK limit 1),0)) as puntos,
".$stockSqlCatalogo." as stock,tipo_producto
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
inner join local l on stk.cod_localfk=l.cod_local
where concat(pr.nombre_producto,' ',pr.cod_producto,' ',pr.cod_barra,' ',pr.descripcion_producto) like '%".$buscar."%'
and pr.estado='Activo' and l.estado='Activo'
".$condicionpromo.$condicionlocal.$condicionControl.$condicionMarca.$condicionCategria."
group by pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.precio_producto,
pr.precio_compra,pr.stock_producto,pr.comision,pr.estado,pr.url,pr.cod_barra,pr.promo,pr.tipo_producto
order by pr.nombre_producto asc limit 1000";

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
$costototales=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cod_producto = utf8_encode($valor['cod_producto']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
$unidad_producto = utf8_encode($valor['unidad_producto']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$precio_compra = utf8_encode($valor['precio_compra']); 
$stock = utf8_encode($valor['stock']);  
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$local = utf8_encode($valor['local']); 
$ganancia = utf8_encode($valor['ganancia']); 
$url = utf8_encode($valor['url']); 
$NombreMarca = utf8_encode($valor['NombreMarca']);
$cod_barra = utf8_encode($valor['cod_barra']);
$promo = utf8_encode($valor['promo']);
$puntos = utf8_encode($valor['puntos']);
$tipo_producto = utf8_encode($valor['tipo_producto']);

$codLocalPrecioCatalogo=$Cod_localFK!="" ? $Cod_localFK : utf8_encode($valor['cod_localFK']);
$Precio_contado=buscarListaDetallePrecioProductos($cod_producto,$codLocalPrecioCatalogo,3,$mysqli);
 
if($tipo_producto=="COMBO" && $Cod_localFK!=""){
	$stock=BuscarStockCombo($cod_producto,$codLocalPrecioCatalogo);
}
  
if ($url == "") {
    $url = '/GoodVentaElectroCasaMaric/iconos/imagen.png';
}

$styleCard = "";
$styleImg = "display:none";
$src = "";
if ($promo == 'SI') {
    $styleCard = "background: linear-gradient(to bottom left, #d7cccc 40%, #bbc6ff 100%);";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/oferta.png";
}

if ($promo == 'BLACK FRIDAY') {
    $styleCard = "background: linear-gradient(to bottom left, #d7cccc 40%, #adadad 100%);";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/logo_BF.png";
}


if ($promo == 'REMATE') {
    $styleCard = "background: linear-gradient(to bottom left, #79e386 50%, #607D8B 100%); min-height: 150px; color: white;";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/GranRemate.png";
}


if ($promo == 'RECUPERADO') {
    $styleCard = "background: linear-gradient(to bottom left, #2196F3 50%, #607D8B 100%); min-height: 150px; color: white;";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/Recuperado.png";
}


if ($promo == 'DÍA DE LA MADRE') {
    $styleCard = "    background: linear-gradient(to bottom left, #c18977 50%, #dda756 100%); min-height: 150px; color: white;";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/dm.png";
}

if ($promo == 'DÍA DEL PADRE') {
    $styleCard = "    background: linear-gradient(to bottom left, #c18977 50%, #dda756 100%); min-height: 150px; color: white;";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/dp.png";
}



$pnt = "";
if ($puntos != '0') {
    $pnt = "<h2 class='position-absolute top-0 end-0 bg-danger text-white m-2 p-2 rounded'>" . $puntos . " pts</h2>";
}

$precioContado=isset($Precio_contado[3]) ? $Precio_contado[3] : 0;
$filas[]=array(
"codigo"=>$cod_producto,
"producto"=>$nombre_producto,
"descripcion"=>$descripcion_producto,
"unidad"=>$unidad_producto,
"stock"=>(float)$stock,
"marca"=>$NombreMarca,
"codigo_barra"=>$cod_barra,
"promo"=>$promo,
"puntos"=>(float)$puntos,
"tipo_producto"=>$tipo_producto,
"imagen_url"=>$url,
"precio_contado"=>(float)$precioContado,
"precio_contado_formateado"=>number_format($precioContado,'0',',','.'),
"local"=>$local
);
if(!$formatoJson){
$pagina .= "<div class='d-flex justify-content-center align-items-center' style='height: 450px; border: 8px solid #dddddd; background:#dddddd; border-radius: 5px;' id='" . $cod_producto . "' onclick='obtenerdatoscatalogo(this)'>
    <div class='ContenedorDetalleCatalogo position-relative d-flex flex-column w-100 h-100'> $pnt
        <div class='card_image_oferta' style='$styleImg'> <img src='$src' style='width:100%;height: auto;transform: rotate(-30deg);' class='img-fluid'> </div>
        <div class='text-center flex-grow-1 d-flex align-items-center justify-content-center'>
            <img src='" . $url . "' class='img-fluid mt-3' style='max-height: 300px; max-width: 80%; object-fit: contain;'>
        </div>
        <div class='p-3 mt-auto w-100 d-flex flex-column align-items-center' style='$styleCard; min-height: 150px;'>
            <h2 class='h5 fw-bold text-center'>" . $nombre_producto . "</h2>
            <p class='mb-1 text-center'><b>Stock: </b>" . $stock . "</p>
            <p class='mb-1 text-center'><b>Marca: </b>" . $NombreMarca . "</p>
            <p class='mb-1 text-center'><b>Cod. Barra: </b>" . $cod_barra . "</p>
            <h2 class='h4 mt-2 text-center'>" . number_format($Precio_contado[3], '0', ',', '.') . " Gs.</h2>
        </div>
    </div>
</div>";
}
  
}
}
 
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}



function BuscarStockCombo($cod_comboFK,$cod_localfk)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 $sql= "SELECT IFNULL(sum(entero),0) as stock_producto FROM stock_producto WHERE cod_stocklocalesFK = (select idstocklocales FROM stocklocales where cod_productofk = '$cod_comboFK' and cod_localfk = '$cod_localfk');";


// echo $sql;
// exit; 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$Stock=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
			$Stock = utf8_encode($valor['stock_producto']);
   }
 }
 
mysqli_close($mysqli);
 return $Stock;
}








function buscarMasCatalogo($registrocargado,$promo,$buscar,$local,$control,$marca,$categoria)
{
$mysqli=conectar_al_servidor();
$condicionlocal="";
if($local!=""){
	$condicionlocal=" and stk.cod_localFK='$local'";
}

$condicionControl = "";
if($control == 2){
	$condicionControl= " and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0)) > 0";
}

if($control == 3){
	$condicionControl= " and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0";
}

$condicionMarca="";
if($marca!=""){
$condicionMarca=" and pr.cod_marcasFK='".$marca."' ";
}

$condicionCategria="";
if($categoria!=""){
$condicionCategria=" and pr.cod_categoriaFK='".$categoria."' ";
}


$condicionpromo="";
if($promo!=""){
$condicionpromo=" and pr.promo='".$promo."' ";
}



$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,(pr.precio_producto-pr.precio_compra) as ganancia,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) AS stock_producto,stk.cod_localFK,pr.comision,pr.estado,pr.url,pr.cod_barra,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,pr.promo,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
ifnull((select punto from puntos p where pr.cod_producto= p.cod_productoFK limit 1 ),0) as puntos,
IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where concat(pr.nombre_producto,' ',pr.cod_producto,' ',pr.descripcion_producto) like '%".$buscar."%' and pr.estado='Activo' ".$condicionpromo.$condicionlocal.$condicionControl.$condicionMarca.$condicionCategria."  limit ".$registrocargado.", 100 ";


$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargado;
$costototales=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$cod_producto = utf8_encode($valor['cod_producto']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
$unidad_producto = utf8_encode($valor['unidad_producto']); 
$precio_producto = utf8_encode($valor['precio_producto']); 
$precio_compra = utf8_encode($valor['precio_compra']); 
$stock = utf8_encode($valor['stock']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$local = utf8_encode($valor['local']); 
$ganancia = utf8_encode($valor['ganancia']); 
$url = utf8_encode($valor['url']); 
$NombreMarca = utf8_encode($valor['NombreMarca']);
$cod_barra = utf8_encode($valor['cod_barra']);
$promo = utf8_encode($valor['promo']);
$puntos = utf8_encode($valor['puntos']);

if ($url == "") {
    $url = '/GoodVentaElectroCasaMaric/iconos/imagen.png';
}

$styleCard = "";
$styleImg = "display:none";
$src = "";
if ($promo == 'SI') {
    $styleCard = "background: linear-gradient(to bottom left, #d7cccc 40%, #bbc6ff 100%);";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/oferta.png";
}

if ($promo == 'BLACK FRIDAY') {
    $styleCard = "background: linear-gradient(to bottom left, #d7cccc 40%, #adadad 100%);";
    $styleImg = "";
    $src = "/GoodVentaElectroCasaMaric/iconos/logo_BF.png";
}
$pnt = "";
if ($puntos != '0') {
    $pnt = "<h2 class='position-absolute top-0 end-0 bg-danger text-white m-2 p-2 rounded'>" . $puntos . " pts</h2>";
}

$pagina .= "<div class='d-flex justify-content-center align-items-center' style='height: 450px; border: 10px solid #dddddd; background:#dddddd; border-radius: 5px;' id='" . $cod_producto . "' onclick='obtenerdatoscatalogo(this)'>
    <div class='ContenedorDetalleCatalogo position-relative d-flex flex-column w-100 h-100'> $pnt
        <div class='card_image_oferta' style='$styleImg'> <img src='$src' class='img-fluid'> </div>
        <div class='text-center flex-grow-1 d-flex align-items-center justify-content-center'><img src='" . $url . "' class='img-fluid mt-3' style='max-height: 300px;'></div>
        <div class='p-3 mt-auto w-100' style='$styleCard'>
            <h2 class='h5 fw-bold'>" . $nombre_producto . "</h2>
            <p class='mb-1'><b>Stock: </b>" . $stock . "</p>
            <p class='mb-1'><b>Marca: </b>" . $NombreMarca . "</p>
            <p class='mb-1'><b>Cod. Barra: </b>" . $cod_barra . "</p>
            <h2 class='h4 mt-2'>$" . number_format($precio_producto, '0', ',', '.') . "</h2>
        </div>
    </div>
</div>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscarvista($buscar,$local,$Categoria,$Marca,$codProveedor)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	$condicionLocal=" and pr.cod_localFK='$local' ";
}
if($Categoria!=""){
	$condicionCategria=" and pr.cod_categoriaFK='$Categoria' ";
}
if($Marca!=""){
	$condicionMarca=" and pr.cod_marcasFK='$Marca' ";
}
$orderby="";
if($codProveedor!=""){
	$orderby=" order by codProveedor='$codProveedor' desc ";
}


	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,
pr.precio_producto,pr.precio_compra,pr.stock_producto,pr.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= pr.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr
where concat(pr.nombre_producto,' ',pr.cod_barra,' ',pr.descripcion_producto) like ? 
and pr.estado='Activo' ".$condicionLocal.$condicionCategria.$condicionMarca.$orderby." limit 250";/*Sentencia para buscar registros*/
	


$pagina = "";   
$buscar="%".$buscar."%";
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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$styleProveedor="";
if($codProveedorFK==$codProveedor && $codProveedorFK!=""){
$styleProveedor="background-color: #efeded;color:#000";	
}
$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "codigo_proveedor"=>$codProveedorFK,
      "detalle_precios_html"=>$paginaprecios,
      "proveedor_preferido"=>($codProveedorFK==$codProveedor && $codProveedorFK!="")
   )
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproducto(this)' name='trVistaProducto_".$cod_barra."' style='$styleProveedor' >
<td id='td_datos_13' style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='width:20%'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_4' style='display:none'>". number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='display:none'>".number_format($stock_producto,'2',',','.')."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
</tr>
</table>";





}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscarporcodigo($buscar,$local)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionlocal="";
if($local!=""){
	$condicionLocal=" and stk.cod_localFK='$local' ";
}
		$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,cod_barra,pr.porcentaje,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= pr.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.cod_barra = ? and pr.estado='Activo' ".$condicionLocal." limit 1 ";


$pagina = "";   
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
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_producto']);
$cod_barra = utf8_encode($valor['cod_barra']);
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
$porcentaje = utf8_encode($valor['porcentaje']); 
$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
if($cod_producto=="13603"){
	$stock_producto = "1";
}
$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "porcentaje"=>$porcentaje,
      "detalle_precios_html"=>$paginaprecios
   )
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproducto(this)' name='trVistaProducto_".$cod_barra."' >
<td id='td_datos_13' style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='width:20%'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_4' style='display:none'>". number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='display:none'>".number_format($stock_producto,'2',',','.')."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
<td  id='td_datos_14' style='display:none'>".$porcentaje."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
</tr>
</table>";





}
}
    
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscarcodBarra($producto,$codigo,$local,$existencia)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionlocal="";
if($local!=""){
	$localSeguro=$mysqli->real_escape_string($local);
	$condicionlocal= " and stk.cod_localFK='$localSeguro' ";
}
$condicioncodigo="";
if($codigo!=""){
	$codigoSeguro=$mysqli->real_escape_string($codigo);
	$condicioncodigo= " and (
		ifnull(pr.cod_barra,'') like '%".$codigoSeguro."%'
		or ifnull(pr.cod_producto,'') like '%".$codigoSeguro."%'
	) ";
}
$condicionproducto="";
if($producto!=""){
	$productoSeguro=$mysqli->real_escape_string($producto);
	$condicionproducto= " and concat(
		ifnull(pr.nombre_producto,''),' ',
		ifnull(pr.descripcion_producto,''),' ',
		ifnull(pr.cod_barra,''),' ',
		ifnull(pr.cod_producto,'')
	) like '%".$productoSeguro."%'";
}
		
$condicionexistencia="";
if($existencia=="1"){
	$condicionexistencia=" and stk.cantidad >= '1'";
}

if($existencia=="2"){
	$condicionexistencia=" and stk.cantidad <= '0'";
}	
		
		$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,cod_barra,
pr.precio_producto,pr.precio_compra,stk.cantidad as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='Activo' ".$condicionexistencia.$condicionlocal.$condicioncodigo.$condicionproducto;


$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$cod_producto = utf8_encode($valor['cod_producto']);/*Obtenemos el registro mediante el nombre del atributo */      
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
$cod_barra = utf8_encode($valor['cod_barra']); 

$paginaprecios=buscardetallespreciosimprimir($cod_producto, $precio_producto,$comision);

$filas[]=array(
"codigo"=>$cod_producto,
"codigo_barra"=>$cod_barra,
"producto"=>$nombre_producto,
"descripcion"=>$descripcion_producto,
"unidad"=>$unidad_producto,
"precio_contado"=>(float)$paginaprecios[1],
"precio_contado_formateado"=>number_format($paginaprecios[1],'0',',','.'),
"cantidad"=>0,
"seleccionado"=>false,
"local"=>$local,
"codigo_local"=>$cod_localFK,
"cuotas"=>(isset($paginaprecios[2]) ? $paginaprecios[2] : array())
);

	 
$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tr_Codigo_barras' >
<td id='td_datos_6' style='width:10%'><input id='btnCheck' type='checkbox'   /></td>
<td id='td_datos_1' style='width:15%'>".$cod_barra."</td>
<td id='td_datos_2'  style='width:35%'>".$nombre_producto."</td>
<td  id='td_datos_3' style='width:20%'>".number_format($paginaprecios[1],'0',',','.')."</td>
<td id='td_datos_5' style='width:10%'><input id='inptCantidad' type='text' value='' class='input5' /></td>
<td id='' style='width:10%'>".$local."</td>
<td id='td_datos_7' style='display:none'>".$paginaprecios[0]."</td>
</tr>
</table>";
	}
	}
	}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscarconsultarprecios($buscar,$loca,$categoria,$marcal)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
if($loca!=""){
$condicionLocal=" and pr.cod_localFK='$loca' ";
}
$condicionCategria="";
if($categoria!=""){
$condicionCategria=" and pr.cod_categoriaFK='$categoria' ";
}
$condicionMarca="";
if($marcal!=""){
$condicionMarca="and pr.cod_marcasFK='$marcal' ";
}

		$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,
pr.precio_producto,pr.precio_compra,pr.stock_producto,pr.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= pr.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr
where concat(pr.nombre_producto,' ',pr.cod_barra,' ',pr.descripcion_producto) like ? and pr.estado='Activo' 
".$condicionLocal.$condicionCategria.$condicionMarca."
limit 500";/*Sentencia para buscar registros*/


$pagina = "";   
$buscar="%".$buscar."%";
$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
$s='s';/*Variable que indica la cantidad paramentros a cargar en la sentencia, guiarse por la cantidad de ? que se encuentra en la sentencia*/
$stmt->bind_param($s,$buscar);/*Se cargar los paramentros a la sentencia preparada*/
/*Función para ejecutar sentencias sql*/
if ( ! $stmt->execute()) {
/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
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

$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca
);
$styleName=CargarStyleTable($styleName);

	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosConsultarPrecioProducto(this)' name='trVistaProducto_".$cod_barra."' >
<td id='td_datos_13' style='width:15%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:35%'>".$nombre_producto."</td>
<td  id='td_datos_14' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_4' style='display:none'>". number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%;'>".number_format($stock_producto,'2',',','.')."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='width:15%;'>".$local."</td>
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


function  buscardetallesprecios($buscar,$preciocontado,$comisioncontado)
{
$mysqli=conectar_al_servidor();

$sql= "select (select porcentaje from producto p where p.cod_producto=dt.cod_producto) as porcentajeContado , precio,Porcentaje as porcen,descripcion,cod_producto,iddetallesprecio,comision,Cuota
 from  detallesprecio dt where cod_producto=?  ";
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
$porcentajeContado=0;
$Porcentaje=0;
$preciocontado=0;
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
 
return $pagina;
}


function  buscardetallespreciosb($buscar)
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


	  $pagina.="Cuota Nro: ".$Cuota." =<b>".number_format($precio,'0',',','.')."Gs</b><br>";



}
}

return $pagina;
}


function  buscarvistaventaSolicitud($buscar,$local,$cantidadCuotaSolicitud,$ConDescuento)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	$condicionLocal=" and stk.cod_localFK='$local' ";
}
$Cod_local=$local;

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
	$CondicionBuscador1=" and concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$Buscador[$contador]."%' ";	
	$CondicionBuscadorTotal1.=$CondicionBuscador1;
	
	$CondicionBuscador2="";
	$CondicionBuscadorTotal2.=$CondicionBuscador2;
}
	$contador++;
}
$CondicionBuscadorTotalResyltado=$CondicionBuscadorTotal1.$CondicionBuscadorTotal2;

}else{
	$CondicionBuscadorTotalResyltado=" and concat(pr.nombre_producto,' ',descripcion_producto) like '%%'";	
}

	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,pr.tipo_producto,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(sp.entero) FROM stock_producto sp WHERE sp.cod_stocklocalesFK=stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local, 
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='Activo' ".$condicionLocal.$CondicionBuscadorTotalResyltado." limit 50";
	
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
$control=0;
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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$tipo_producto = utf8_encode($valor['tipo_producto']); 



$btnVistaCombo = '';
$btnOnclick = 'obtenerdatosvistaproductodesdeSolicitudCredito(this)';
if($tipo_producto == 'COMBO'){
	$btnVistaCombo = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"buscarvistacomboproductosolicitud('$cod_producto','solicitud','$cod_localFK')\" />";
	$btnOnclick = '';
}


$Precio_contado=buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,3);
$controlPrecio = buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,1);
 $paginapreciosb=buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,2);
 
if($controlPrecio[0]==0){
	$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
	$Precio_contado2=$precio_producto;
 
}else{
	
	
	if ($ConDescuento == "SI"){
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
	if ($ConDescuento == "SI"){
		$paginapreciosb2=$paginapreciosb[5];
	} else {
		$paginapreciosb2=$paginapreciosb[2];
	}
}


if($tipo_producto == 'COMBO'){
	$Precio_contado2=buscardetallespreciossolicitud($cod_producto,$cantidadCuotaSolicitud,$cod_localFK,$ConDescuento);
	$Precio_contado2 = str_replace(".", "", $Precio_contado2);
}

$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "codigo_proveedor"=>$codProveedorFK,
      "tipo_producto"=>$tipo_producto,
      "es_combo"=>($tipo_producto=='COMBO'),
      "precio_contado"=>(float)$Precio_contado2,
      "precio_contado_formateado"=>number_format((float)$Precio_contado2,'0',',','.'),
      "precios_credito_html"=>$paginapreciosb2,
      "detalle_precios_html"=>$paginaprecios,
      "indice"=>$control
   )
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='$btnOnclick' name='trVistaProducto_".$cod_barra."'   >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:15%; background-color: #efeded;color:red'>".$cod_barra."
<br><input style='outline:none;height: 0px;padding: 0px;' type='button' class='$nroRegistro' value='$control' name='$cod_barra' id='btnfocusProducto' onfocus='recorrerFocusTableProductoVenta(this)' ></td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:40%'>".$nombre_producto."</td>
<td  id='' style='width:20%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_precio_contado' style='display:none;'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_precios_creditos' style='display:none;    line-height: 18px;    font-size: 9px;'>".$paginapreciosb2."</td>
<td  id='td_datos_4' style='width:15%'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:5%'>".$stock_producto."</td>
<td  id='td_datos_16' style='width:5%'>".$btnVistaCombo."</td>
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
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


function  buscarvistaVenta($buscar,$local, $ConDescuento)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	$condicionLocal=" and stk.cod_localFK='$local'";
}

$Cod_local=$local;

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
	$CondicionBuscador1=" and concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$Buscador[$contador]."%' ";	
	$CondicionBuscadorTotal1.=$CondicionBuscador1;
	
	$CondicionBuscador2="";
	$CondicionBuscadorTotal2.=$CondicionBuscador2;
}
	$contador++;
}
$CondicionBuscadorTotalResyltado=$CondicionBuscadorTotal1.$CondicionBuscadorTotal2;

}else{
	$CondicionBuscadorTotalResyltado=" and concat(pr.nombre_producto,' ',descripcion_producto) like '%%'";	
}


	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,pr.tipo_producto,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,pr.promo,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where  pr.estado='Activo' and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0".$condicionLocal.$CondicionBuscadorTotalResyltado." limit 50";
	
/* echo $sql;
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
$control=0;
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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$promo = utf8_encode($valor['promo']); 
$tipo_producto = utf8_encode($valor['tipo_producto']);

$btnVistaCombo = '';
$btnOnclick = 'obtenerdatosvistaproductodesdeventa(this)';
if($tipo_producto == 'COMBO'){
	$btnVistaCombo = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"buscarvistacomboproducto('$cod_producto','venta')\" />";
	$btnOnclick = '';
}


$styleProveedor="";
/* if($cod_producto=="13603"){
	$stock_producto = "1";
} */
$Precio_contado=buscarListaDetallePrecioProductos($cod_producto,$Cod_local,3);
$controlPrecio = buscarListaDetallePrecioProductos($cod_producto,$Cod_local,1);
$paginapreciosb=buscarListaDetallePrecioProductos($cod_producto,$Cod_local,2);

if($controlPrecio[0]==0){
	$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
	$Precio_contado2=$precio_producto;
 
}else{
	if ($ConDescuento == "true") {
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
	if ($ConDescuento == "true") {
		$paginapreciosb2=$paginapreciosb[5];
	} else {
		$paginapreciosb2=$paginapreciosb[2];
	}
}

$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "codigo_proveedor"=>$codProveedorFK,
      "tipo_producto"=>$tipo_producto,
      "es_combo"=>($tipo_producto=='COMBO'),
      "promo"=>$promo,
      "precio_contado"=>(float)$Precio_contado2,
      "precio_contado_formateado"=>number_format((float)$Precio_contado2,'0',',','.'),
      "precios_credito_html"=>$paginapreciosb2,
      "detalle_precios_html"=>$paginaprecios,
      "precio_minimo"=>(float)$precio_compra,
      "indice"=>$control
   )
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='".$btnOnclick."' name='trVistaProducto_".$cod_barra."' style='$styleProveedor' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:12%; background-color: #efeded;color:red'>".$cod_barra."
<br><input style='outline:none;height: 0px;padding: 0px;' type='button' class='$nroRegistro' value='$control' name='$cod_barra' id='btnfocusProducto' onfocus='recorrerFocusTableProductoVenta(this)' ></td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_precio_contado' style='width:10%'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_precios_creditos' style='width:10%;display:none;    line-height: 18px;    font-size: 9px;'>".$paginapreciosb2."</td>
<td  id='td_datos_4' style='display:none'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:5%'>".$stock_producto."</td>
<td  id='td_datos_18' style='width:5%'>".$btnVistaCombo."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
<td  id='td_datos_16' style='display:none'>".$promo."</td>
<td  id='td_datos_17' style='display:none'>".$precio_compra."</td>
</tr>
</table>";
	 
$control=$control+1;




}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}






function  buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,$desde,$conexionExistente=null)
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














function  buscarvistalistadodespacho($buscar,$local)
{
$mysqli=$conexionExistente!==null ? $conexionExistente : conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	$condicionLocal=" and stk.cod_localFK='$local' ";
}



	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where concat(pr.nombre_producto,' ',pr.cod_barra,' ',pr.descripcion_producto) like ? 
and pr.estado='Activo' and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0)>0 ".$condicionLocal." limit 50";
	


$pagina = "";   
$buscar="%".$buscar."%";
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
$control=0;
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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$styleProveedor="";
if($cod_producto=="13603"){
	$stock_producto = "1";
}

$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array("codigo_proveedor"=>$codProveedorFK,"indice"=>$control)
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproductodesdelistadodespacho(this)'>
<td id='td_datos_13'  style='width:12%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_6' style='width:10%'>".$stock_producto."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
</tr>
</table>";
	 
$control=$control+1;




}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscarvistasalidadeposito($buscar,$local,$stock)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	$condicionLocal=" and stk.cod_localFK='$local' ";
}

$condicionStock = '';
if($stock =="1"){
	$condicionStock=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0 ";
}

if($stock =="2"){
	$condicionStock=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0 ";
}



	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where concat(pr.nombre_producto,' ',pr.cod_barra,' ',pr.descripcion_producto) like ? 
and pr.estado='Activo' ".$condicionLocal.$condicionStock."order by pr.nombre_producto ASC";
	
/* echo $sql;
exit; */

$pagina = "";   
$buscar="%".$buscar."%";
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
$control=0;
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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$styleProveedor="";
if($cod_producto=="13603"){
	$stock_producto = "1";
}

$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array("codigo_proveedor"=>$codProveedorFK,"indice"=>$control)
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproductodesdeSalidadDeposito(this)'>
<td id='td_datos_13'  style='width:12%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_6' style='width:10%'>".$stock_producto."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
</tr>
</table>";
	 
$control=$control+1;




}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}
function  buscarvistaproductocombo($buscar, $stock)
{
	
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionStock = '';
if($stock =="1"){
	$condicionStock=" and stock_producto > 0 ";
}

if($stock =="2"){
	$condicionStock=" and stock_producto <= 0 ";
}



	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,
pr.precio_producto,pr.precio_compra,sum(IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0)) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where concat(pr.nombre_producto,' ',pr.cod_barra,' ',pr.descripcion_producto) like ? 
and pr.estado='Activo' ".$condicionStock." group by pr.cod_producto order by pr.nombre_producto ASC";
	
// echo $sql;
// exit; 

$pagina = "";   
$buscar="%".$buscar."%";
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
$control=0;
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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$styleProveedor="";
if($cod_producto=="13603"){
	$stock_producto = "1";
}

$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array("codigo_proveedor"=>$codProveedorFK,"indice"=>$control)
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='Obtenerdatosbuscarproductocombo(this)'>
<td id='td_datos_13'  style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_6' style='width:10%'>".$stock_producto."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
<td  id='td_datos_16' style='display:none'>".$precio_producto."</td>
<td  id='td_datos_17' style='width:10%'>".number_format($precio_compra,'0',',','.')."</td>
</tr>
</table>";
	 
$control=$control+1;




}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscarvistacompras($buscar,$local)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	$condicionLocal=" and stk.cod_localFK='$local' ";
}



	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,pr.porcentaje,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where concat(pr.nombre_producto,' ',pr.cod_barra,' ',pr.descripcion_producto) like ? 
and pr.estado='Activo' ".$condicionLocal." limit 50";
	


$pagina = "";   
$buscar="%".$buscar."%";
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
$control=0;
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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$porcentaje = utf8_encode($valor['porcentaje']); 
$styleProveedor="";

$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "codigo_proveedor"=>$codProveedorFK,
      "porcentaje"=>$porcentaje,
      "detalle_precios_html"=>$paginaprecios,
      "stock_unidad_formateado"=>number_format((float)$stock_producto,'2',',','.')." (".$unidad_producto.")",
      "indice"=>$control
   )
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproductodesdecompra(this)' name='trVistaProducto_".$cod_barra."' style='$styleProveedor' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:12%; background-color: #efeded;color:red'>".$cod_barra."
<br><input style='outline:none;height: 0px;padding: 0px;' type='button' class='$nroRegistro' value='$control' name='$cod_barra' id='btnfocusProductocompra' onfocus='recorrerFocusTableProductoCompra(this)' ></td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='width:10%'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_4' style='display:none'>". number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($stock_producto,'2',',','.')." (".$unidad_producto.")</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
<td  id='td_datos_14' style='display:none'>".$porcentaje."</td>
</tr>
</table>";
$control=$control+1;




}
}
    
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


function  buscarpresupuesto($buscar,$local)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicionLocal="";
$condicionCategria="";
$condicionMarca="";
if($local!=""){
	$condicionLocal=" and stk.cod_localFK='$local' ";
}


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
	$CondicionBuscador1=" and concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$Buscador[$contador]."%' ";	
	$CondicionBuscadorTotal1.=$CondicionBuscador1;
	
	$CondicionBuscador2="";
	$CondicionBuscadorTotal2.=$CondicionBuscador2;
}
	$contador++;
}
$CondicionBuscadorTotalResyltado=$CondicionBuscadorTotal1.$CondicionBuscadorTotal2;

}else{
	$CondicionBuscadorTotalResyltado=" and concat(pr.nombre_producto,' ',descripcion_producto) like '%%'";	
}


	$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where  pr.estado='Activo' ".$condicionLocal.$CondicionBuscadorTotalResyltado." limit 50";
	


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
$local = utf8_encode($valor['local']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$styleProveedor="";
if($cod_producto=="13603"){
	$stock_producto = "1";
}
$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);
$paginapreciosb=buscardetallespreciosb($cod_producto);
if($paginapreciosb==""){
$paginapreciosb="Sin Credito";	
}
$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$local,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "codigo_proveedor"=>$codProveedorFK,
      "precio_contado"=>(float)$precio_producto,
      "precio_contado_formateado"=>number_format((float)$precio_producto,'0',',','.'),
      "precios_credito_html"=>$paginapreciosb,
      "detalle_precios_html"=>$paginaprecios,
      "indice"=>$control
   )
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproductodesdePresupuesto(this)' name='trVistaProducto_".$cod_barra."' style='$styleProveedor' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:12%; background-color: #efeded;color:red'>".$cod_barra."
<br><input style='outline:none;height: 0px;padding: 0px;' type='button' class='$nroRegistro' value='$control' name='$cod_barra' id='btnfocusProducto' onfocus='recorrerFocusTableProductoVenta(this)' ></td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_precio_contado' style='width:10%'>". number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_precios_creditos' style='width:10%;display:none;    line-height: 18px;    font-size: 9px;'>".$paginapreciosb."</td>
<td  id='td_datos_4' style='display:none'>". number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".$stock_producto."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
</tr>
</table>";
	 
$control=$control+1;




}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function abmAuditoria($nombre_descripcion,$precio_compra,$precio_venta,$stock,$cod_barra,$nombredescripcionAnt,$precio_compraAnt,$precio_ventaAnt,$stockAnt,$cod_barraAnt,$fecha,$cod_usuarioFK,$Accion,$cod_productoFK,$cod_localFK)
{

	
	if($nombre_descripcion=="" && $precio_compra=="0" && $precio_venta=="0" && $stock=="0" && $cod_barra==""){
		
	}else{	
$mysqli=conectar_al_servidor(); 


$consulta1="Insert into auditoriaproducto (nombre_descripcion, precio_compra, precio_venta, stock, cod_barra, nombredescripcionAnt, precio_compraAnt, precio_ventaAnt, stockAnt, cod_barraAnt, fecha, cod_usuarioFK,accion,cod_productoFK,cod_localfk)
values('$nombre_descripcion','$precio_compra','$precio_venta','$stock','$cod_barra','$nombredescripcionAnt','$precio_compraAnt','$precio_ventaAnt','$stockAnt','$cod_barraAnt','$fecha','$cod_usuarioFK','$Accion','$cod_productoFK','$cod_localFK')";
$stmt1 = $mysqli->prepare($consulta1);


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
	}
	
}


function AuditoriaProducto($fechaDesde,$fechaHasta,$local,$usuario,$producto,$cod_barra,$fecha,$tipo,$busqueda_general=""){
	

$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$condicionFechaDesde="";
if($fechaDesde!=""){
	$condicionFechaDesde=" and'$fechaHasta'>= DATE(fecha_hora)";
}

$condicionFechaHasta="";
if($fechaHasta!=""){
	$condicionFechaHasta=" and   '$fechaDesde'  <= DATE(fecha_hora) ";
}

$condicionFechaFiltro="";
if($fecha!=""){
	$condicionFechaFiltro=" and  DATE(fecha_hora) = '$fecha' ";
}

$condicionTipo="";
if($tipo!=""){
	$condicionTipo=" and  tipo = '$tipo' ";
}

$condicionlocal="";
if($local!=""){
	$condicionlocal=" and  (SELECT cod_localfk FROM stocklocales WHERE idstocklocales = cod_stocklocalesFK) = '$local' ";
}

$condicionusuario="";
if($usuario!=""){
	$condicionusuario=" and user_insert = '".$usuario."' ";
}

$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and (select nombre_producto from producto where cod_producto=(SELECT cod_productofk FROM stocklocales WHERE idstocklocales = cod_stocklocalesFK)) like '%".$producto."%' ";
}

$condicioncod_barra="";
if($cod_barra!=""){
	$condicioncod_barra=" and (select cod_barra from producto where cod_producto=(SELECT cod_productofk FROM stocklocales WHERE idstocklocales = cod_stocklocalesFK)) = '".$cod_barra."' ";
}

$condicionBusquedaGeneral="";
if($busqueda_general!=""){
	$busquedaGeneralSegura=$mysqli->real_escape_string($busqueda_general);
	$condicionBusquedaGeneral=" and exists (
		select 1 from stocklocales sl
		inner join producto pr on pr.cod_producto=sl.cod_productofk
		where sl.idstocklocales=stock_producto.cod_stocklocalesFK
		and (pr.nombre_producto like '%".$busquedaGeneralSegura."%' or pr.cod_barra like '%".$busquedaGeneralSegura."%')
	) ";
}


	$sql= "SELECT idstock_producto, tipo, operacion,entero, user_insert,fecha_hora,cod_stocklocalesFK,
	(select nombre_producto from producto where cod_producto=(SELECT cod_productofk FROM stocklocales WHERE idstocklocales = cod_stocklocalesFK)) as nombre_producto,
	(select nombre_persona from persona where cod_persona=user_insert) as usuario,
	(select cod_barra from producto where cod_producto=(SELECT cod_productofk FROM stocklocales WHERE idstocklocales = cod_stocklocalesFK)) as cod_barra,
	(SELECT nombre FROM local WHERE cod_local = (SELECT cod_localfk FROM stocklocales WHERE idstocklocales = cod_stocklocalesFK)) as local,
	DATE(fecha_hora) AS fecha, TIME(fecha_hora) AS hora
from  stock_producto 
where idstock_producto!='' ".$condicionFechaDesde.$condicionFechaHasta.$condicionFechaFiltro.$condicionlocal.$condicionusuario.$condicionproducto.$condicioncod_barra.$condicionBusquedaGeneral.$condicionTipo." limit 1000";


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
$nombre_producto = utf8_encode($valor['nombre_producto']);
$cod_barra = utf8_encode($valor['cod_barra']);
$usuario = utf8_encode($valor['usuario']);
$local = utf8_encode($valor['local']);
$fecha = utf8_encode($valor['fecha']);
$hora = utf8_encode($valor['hora']);
$tipo = utf8_encode($valor['tipo']);
$operacion = utf8_encode($valor['operacion']);
$entero = utf8_encode($valor['entero']);
$entero = abs($entero);
$idstock_producto = utf8_encode($valor['idstock_producto']);
$user_insert = utf8_encode($valor['user_insert']);
$cod_stocklocalesFK = utf8_encode($valor['cod_stocklocalesFK']);


$filas[]=array(
"codigo"=>$idstock_producto,
"codigo_barra"=>$cod_barra,
"producto"=>$nombre_producto,
"tipo"=>$tipo,
"operacion"=>$operacion,
"cantidad"=>(float)$entero,
"cantidad_formateada"=>$entero,
"codigo_usuario"=>$user_insert,
"usuario"=>$usuario,
"fecha"=>$fecha,
"hora"=>$hora,
"local"=>$local,
"codigo_stock_local"=>$cod_stocklocalesFK
);


$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td  id='' style='width:10%'>".$cod_barra."</td>
<td  id='' style='width:26%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$tipo."</td>
<td  id='' style='width:7%'>".$operacion."</td>
<td  id='' style='width:7%'>".$entero."</td>
<td  id='' style='width:10%'>".$usuario."</td>
<td  id='' style='width:10%'>".$fecha."</td>
<td  id='' style='width:10%'>".$hora."</td>
<td  id='' style='width:10%'>".$local."</td>
</tr>
</table>";





}
}
}

$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}




function  buscardetallespreciossolicitud($buscar,$cuota,$cod_localFK, $ConDescuento)
{
$mysqli=conectar_al_servidor();


$fechahoy=date('Y-m-d');

$CondicionLocal=" ";
if($cod_localFK!=""){
	$CondicionLocal=" and cod_localFK='".$cod_localFK."'";
}

// $sql= "select  cod_detalle_listado_precio_producto ,precio,dlpp.descripcion,cod_producto,comision,dlpp.Porcentaje,preciocuota ,
// dlpp.descuento,dlpp.Cuota , (select Nombre from local where cod_localFK=cod_local) as local , accion
// from  detalle_listado_precio_producto dlpp
// inner join detalle_listado_precio dlp on cod_detalle_listado_precio=cod_detalle_listado_precioFK
// inner join lista_precio_producto lpp on cod_lista_precio_producto=dlp.cod_lista_precio_productoFK
// inner  join local_lista_precio llp on  llp.cod_lista_precio_productoFK=lpp.cod_lista_precio_producto
 // where lpp.estado='Activo' and cod_producto='".$buscar."' and accion='SI' and dlpp.Cuota='$cuota'  and fecha_hasta>='".$fechahoy."' ".$CondicionLocal." group by cod_detalle_listado_precio_producto asc order by dlpp.Cuota asc limit 1 ";
 
$sql= "select  cod_detalle_listado_precio_producto ,precio,dlpp.descripcion,cod_producto,comision,dlpp.Porcentaje,preciocuota ,
dlpp.descuento,dlpp.Cuota , (select Nombre from local where cod_localFK=cod_local) as local , accion
from  detalle_listado_precio_producto dlpp
inner join detalle_listado_precio dlp on cod_detalle_listado_precio=cod_detalle_listado_precioFK
inner join lista_precio_producto lpp on cod_lista_precio_producto=dlp.cod_lista_precio_productoFK
inner  join local_lista_precio llp on  llp.cod_lista_precio_productoFK=lpp.cod_lista_precio_producto
 where lpp.estado='Activo' and cod_producto='".$buscar."' and accion='SI' and dlpp.Cuota='$cuota'  and fecha_hasta>='".$fechahoy."' ".$CondicionLocal." group by cod_detalle_listado_precio_producto asc order by dlpp.Cuota asc limit 1 ";
 

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

if($ConDescuento=="SI"){
		$precio = intval($valor['descuento']);
		$cuota= intval($valor['Cuota']);
		$precio= $precio * $cuota;
}else{
	$precio = utf8_encode($valor['precio']);
}
		
	 
	
	$pagina=number_format($precio,'0',',','.');
}
}

return $pagina;
}


function comprobarduplicado($cod_barra){
	
	$mysqli=conectar_al_servidor(); 
	$consulta= "Select count(*) as contador from producto where cod_barra='$cod_barra'  ";
	
	// echo($consulta);
	// exit;
	
	$stmt = $mysqli->prepare($consulta);


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$control = 0;
$contador=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
if($valor>=1)
{
	while ($valor= mysqli_fetch_assoc($result))
{  

$contador = utf8_encode($valor['contador']);
}
	$control = $contador;
}

 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $control);
echo json_encode($informacion);	
exit;
}





function ContabilidadVenta($fecha1,$fecha2,$Local,$estado){
	
	$mysqli=conectar_al_servidor(); 
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	
	$condicionLocal="";
	if($Local!=""){
		$condicionLocal=" and v.cod_local = '$Local' ";
	}
	
	$condicionFecha="";
if($fecha1!="" && $fecha2!="" ){
	$condicionFecha=" and  v.fecha_venta between '".$fecha1."' and '".$fecha2."'";
}




$condicionestado = '';
if($estado !=''){
	if($estado == 1){
		$condicionestado = ' and (SELECT count(c.cod_venta) FROM cancelaciones c WHERE c.cod_venta = v.cod_venta) = 0';
	}else{
		$condicionestado = ' and (SELECT count(c.cod_venta) FROM cancelaciones c WHERE c.cod_venta = v.cod_venta) > 0';
	}
}
	
	$consulta=  " SELECT (select timbrado from nrofactura where Cod_Nro=codnrofactura) as timbrado, v.TipoVenta , 
                (select ire from nrofactura where Cod_Nro=codnrofactura) as ire,
                (select irp from nrofactura where Cod_Nro=codnrofactura) as irp,
                (select iva from nrofactura where Cod_Nro=codnrofactura) as iva,
				(SELECT ci_cliente FROM cliente  WHERE v.cod_clienteFK = cod_cliente ) AS CI ,
                v.cod_venta ,v.estado , date_format(v.fecha_venta,'%d/%m/%Y') as fecha,  v.total_venta,v.tipo_comprobante, 
                 substring_index((SELECT p.rut_cliente FROM cliente p WHERE v.cod_clienteFK = p.cod_cliente ),'-',1) AS RUC1 
                ,if((SELECT p.rut_cliente FROM cliente p WHERE v.cod_clienteFK = p.cod_cliente ) like '%-%',
                substring_index((SELECT p.rut_cliente FROM cliente p WHERE v.cod_clienteFK = p.cod_cliente ),'-',-1),0) AS RUC2 

                ,round((select (sum(if((select (select monto_impuesto from impuesto where cod_Impuesto=cod_ImpuestoFK) FROM producto  WHERE cod_producto = cod_productoFK)=11,((d.subtotal)),0))) from detalle_venta d WHERE v.cod_venta = d.cod_ventaFK)) as totalIva10
                ,round((select (sum(if((select (select monto_impuesto from impuesto where cod_Impuesto=cod_ImpuestoFK) FROM producto  WHERE cod_producto = cod_productoFK)=21,((d.subtotal)),0))) from detalle_venta d WHERE v.cod_venta = d.cod_ventaFK)) as totalIva5
                ,round((select (sum(if((select (select monto_impuesto from impuesto where cod_Impuesto=cod_ImpuestoFK) FROM producto  WHERE cod_producto = cod_productoFK)=0,((d.subtotal)),0))) from detalle_venta d WHERE v.cod_venta = d.cod_ventaFK)) as Excentas 
                ,(SELECT concat(nombre_persona,' ',apellido_persona) FROM persona p WHERE v.cod_clienteFK = p.cod_persona ) AS nombreCliente
                ,Cast( sum(d.cantidad_detalle) as Decimal(10,2)) as cantidad  ,v.num_factura , v.puntoexpedicion
                 FROM  detalle_venta d   INNER JOIN venta v  ON v.cod_venta = d.cod_ventaFK WHERE  v.cod_venta!='' ".$condicionFecha.$condicionLocal.$condicionestado." and tipo_comprobante='FACTURA'   group by v.cod_venta ";




    	$stmt = $mysqli->prepare($consulta);
		
		

 $pagina="";  
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
 $styleName="tableRegistroSearch";
 
 $TotalVenta="";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$RUC1 = utf8_encode($valor['RUC1']); 
$CI = utf8_encode($valor['CI']); 
$nombreCliente = utf8_encode($valor['nombreCliente']);
$fecha = utf8_encode($valor['fecha']);          
$timbrado = utf8_encode($valor['timbrado']);          
$num_factura = utf8_encode($valor['num_factura']);          
$totalIva10 = utf8_encode($valor['totalIva10']);  
$totalIva5 = utf8_encode($valor['totalIva5']);  
$Excentas = utf8_encode($valor['Excentas']);  
$total_venta = utf8_encode($valor['total_venta']);  
$TipoVenta = utf8_encode($valor['TipoVenta']);  
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);  


 $TotalVenta= $TotalVenta + $total_venta ;

$iva = utf8_encode($valor['iva']);  
$ire = utf8_encode($valor['ire']);  
$irp = utf8_encode($valor['irp']);  
 if ($iva=="SI") {
		$iva = "S";
     } else {
        $iva = "N";
     }

if ($ire=="SI") {
		$ire = "S";
	} else {
		$ire = "N";
	}
if ($irp=="SI") {
		$irp = "S";
	} else {
		$irp = "N";
	}
	
$codigoTIpoID="";
if ($RUC1=="") {
		$codigoTIpoID = "12";
	} else {
		$codigoTIpoID ="11";
	}

if ($RUC1=="") {
		$RUC1 = $CI;
	}	
	

if ($TipoVenta=="CONTADO") {
		$TipoVenta = "1";
	} else {
		$TipoVenta = "2";
	}
if ($nombreCliente=="CLIENTE OCASIONAL") {
		$nombreCliente = "SIN NOMBRE";
		$RUC1 = "x";
		$codigoTIpoID ="15";
}

$filas[]=array(
	"codigo_tipo_registro"=>1,
	"codigo_tipo_identificacion"=>$codigoTIpoID,
	"numero_identificacion"=>quitarseparadormiles($RUC1),
	"nombre_razon_social"=>$nombreCliente,
	"codigo_tipo_comprobante"=>109,
	"fecha_emision"=>$fecha,
	"numero_timbrado"=>$timbrado,
	"numero_comprobante"=>$puntoexpedicion."-".$num_factura,
	"iva_10"=>(float)$totalIva10,
	"iva_10_formateado"=>$totalIva10,
	"iva_5"=>(float)$totalIva5,
	"iva_5_formateado"=>$totalIva5,
	"exentas"=>(float)$Excentas,
	"exentas_formateado"=>$Excentas,
	"monto_total"=>(float)$total_venta,
	"monto_total_formateado"=>$total_venta,
	"condicion"=>$TipoVenta,
	"moneda_extranjera"=>"N",
	"imputa_iva"=>$iva,
	"imputa_ire"=>$ire,
	"imputa_irp"=>$irp,
	"campo_18"=>"",
	"campo_19"=>""
);

$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td   style='width:4%'>1</td>
<td   style='width:5%'>".$codigoTIpoID."</td>
<td   style='width:5%'>".quitarseparadormiles($RUC1)."</td>
<td   style='width:20%'>".$nombreCliente."</td>
<td   style='width:5%'>109</td>
<td   style='width:5%'>".$fecha."</td>
<td   style='width:5%'>".$timbrado."</td>
<td   style='width:10%'>".$puntoexpedicion."-".$num_factura."</td>
<td   style='width:5%'>".$totalIva10."</td>
<td   style='width:5%'>".$totalIva5."</td>
<td   style='width:5%'>".$Excentas."</td>
<td   style='width:5%'>".$total_venta."</td>
<td   style='width:5%'>".$TipoVenta."</td>
<td   style='width:3%'>N</td>
<td   style='width:3%'>".$iva."</td>
<td   style='width:3%'>".$ire."</td>
<td   style='width:3%'>".$irp."</td>
<td   style='width:2%'></td>
<td   style='width:2%'></td>
</tr>
</table>";


}
}
    
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro,"4" => number_format($TotalVenta,'0',',','.'));
echo json_encode($informacion);	
exit;
}




function ContabilidadCompra($fecha1,$fecha2,$Local){
	
	$mysqli=conectar_al_servidor(); 
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	
	$condicionLocal="";
	if($Local!=""){
		$condicionLocal=" and v.cod_local = '$Local' ";
	}
	
	$condicionFecha="";
if($fecha1!="" && $fecha2!="" ){
	$condicionFecha=" and  v.fecha_compra between '".$fecha1."' and '".$fecha2."'";
}

	
	$consulta=  " SELECT  timbrado, tipo_compra, v.tipoFactura ,v.cod_compra ,v.estado , date_format(v.fecha_compra,'%d/%m/%Y') as fecha,  
    substring_index((SELECT p.rut_proveedor FROM proveedor p WHERE v.cod_proveedorFK = p.cod_proveedor ),'-',1) AS RUC1
     ,(select sum(precio_producto * cantidad_detalle_compra) from detalle_compra where v.cod_compra = cod_compraFK ) as total_compra
    ,round((select (sum(if((select (select monto_impuesto from impuesto where cod_Impuesto=cod_ImpuestoFK) FROM producto  WHERE cod_producto = cod_productoFK)=11,((d.subtotal)),0))) from detalle_compra d WHERE v.cod_compra = d.cod_compraFK)) as totalIva10
	,round((select (sum(if((select (select monto_impuesto from impuesto where cod_Impuesto=cod_ImpuestoFK) FROM producto  WHERE cod_producto = cod_productoFK)=21,((d.subtotal)),0))) from detalle_compra d WHERE v.cod_compra = d.cod_compraFK)) as totalIva5
	,round((select (sum(if((select (select monto_impuesto from impuesto where cod_Impuesto=cod_ImpuestoFK) FROM producto  WHERE cod_producto = cod_productoFK)=0,((d.subtotal)),0))) from detalle_compra d WHERE v.cod_compra = d.cod_compraFK)) as Excentas 
                ,(SELECT p.nombre_persona FROM persona p WHERE v.cod_proveedorFK = p.cod_persona ) AS nombreProveedor
                ,Cast( sum(d.cantidad_detalle_compra) as Decimal(10,2)) as cantidad  ,v.num_comprobante , v.tipo_comprobante
                 FROM  detalle_compra d   INNER JOIN compra v  ON v.cod_compra = d.cod_compraFK WHERE  v.cod_compra!='' ".$condicionFecha.$condicionLocal."   group by v.cod_compra ";

    	$stmt = $mysqli->prepare($consulta);
		
		

 $pagina="";  
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

$RUC1 = utf8_encode($valor['RUC1']); 
// $CI = utf8_encode($valor['CI']); 
$nombreProveedor = utf8_encode($valor['nombreProveedor']);
$fecha = utf8_encode($valor['fecha']);          
$timbrado = utf8_encode($valor['timbrado']);          
$tipoFactura = utf8_encode($valor['tipoFactura']);          
$totalIva10 = utf8_encode($valor['totalIva10']);  
$totalIva5 = utf8_encode($valor['totalIva5']);  
$Excentas = utf8_encode($valor['Excentas']);  
$total_compra = utf8_encode($valor['total_compra']);  
$tipo_compra = utf8_encode($valor['tipo_compra']);  
$num_comprobante = utf8_encode($valor['num_comprobante']);  

$iva ="S";  
$ire ="N"; 
$irp ="N"; 

	
$codigoTIpoID="";
if ($RUC1=="") {
		$codigoTIpoID = "12";
	} else {
		$codigoTIpoID ="11";
	}


if ($tipo_compra=="CONTADO") {
		$tipo_compra = "1";
	} else {
		$tipo_compra = "2";
	}


if ($tipoFactura=="FACTURA LEGAL") {
		$tipoFactura = "109";
	} else {
		$tipoFactura = "";
	}

$filas[]=array(
	"codigo_tipo_registro"=>1,
	"codigo_tipo_identificacion"=>$codigoTIpoID,
	"numero_identificacion"=>quitarseparadormiles($RUC1),
	"nombre_razon_social"=>$nombreProveedor,
	"codigo_tipo_comprobante"=>$tipoFactura,
	"fecha_emision"=>$fecha,
	"numero_timbrado"=>$timbrado,
	"numero_comprobante"=>$num_comprobante,
	"iva_10"=>(float)$totalIva10,
	"iva_10_formateado"=>$totalIva10,
	"iva_5"=>(float)$totalIva5,
	"iva_5_formateado"=>$totalIva5,
	"exentas"=>(float)$Excentas,
	"exentas_formateado"=>$Excentas,
	"monto_total"=>(float)$total_compra,
	"monto_total_formateado"=>$total_compra,
	"condicion"=>$tipo_compra,
	"moneda_extranjera"=>"N",
	"imputa_iva"=>$iva,
	"imputa_ire"=>$ire,
	"imputa_irp"=>$irp,
	"documento_asociado"=>"N",
	"campo_19"=>"",
	"campo_20"=>""
);

$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td   style='width:4%'>1</td>
<td   style='width:5%'>".$codigoTIpoID."</td>
<td   style='width:5%'>".quitarseparadormiles($RUC1)."</td>
<td   style='width:20%'>".$nombreProveedor."</td>
<td   style='width:5%'>".$tipoFactura."</td>
<td   style='width:5%'>".$fecha."</td>
<td   style='width:5%'>".$timbrado."</td>
<td   style='width:10%'>".$num_comprobante."</td>
<td   style='width:5%'>".$totalIva10."</td>
<td   style='width:5%'>".$totalIva5."</td>
<td   style='width:5%'>".$Excentas."</td>
<td   style='width:5%'>".$total_compra."</td>
<td   style='width:5%'>".$tipo_compra."</td>
<td   style='width:3%'>N</td>
<td   style='width:3%'>".$iva."</td>
<td   style='width:3%'>".$ire."</td>
<td   style='width:3%'>".$irp."</td>
<td   style='width:3%'>N</td>
<td   style='width:2%'></td>
<td   style='width:2%'></td>
</tr>
</table>";


}
}
    
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


function  buscardetallespreciosimprimir($buscar,$preciocontado,$comisioncontado)
{
$mysqli=conectar_al_servidor();
$cuotas=array();

$sql= "select (select porcentaje from producto p where p.cod_producto=dt.cod_producto) as porcentajeContado , preciocuota,Porcentaje as porcen,descripcion,cod_producto,comision,Cuota
 from  detalle_listado_precio_producto dt
where cod_producto=? order by Cuota asc ";
 $pagina=" <b class='pTitulo2' style='font-size: 13px;padding: 5px;' > <u>EN CUOTAS:</u>  </b>";  
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
$porcentajeContado=0;
$Porcentaje=0;
// El precio propio del producto es el valor principal. Si falta, se completa
// desde detallesprecio, que conserva las cuotas importadas.
$preciocontado=(float)$preciocontado;

if ($valor==0)
{
    $sql= "select (select porcentaje from producto p where p.cod_producto=dt.cod_producto) as porcentajeContado,
    preciocuota, Porcentaje as porcen, descripcion, cod_producto, comision, Cuota
    from detallesprecio dt
    where cod_producto=? order by Cuota asc ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param($s,$buscar);
    if ( ! $stmt->execute()) {
        echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
        exit;
    }
    $result = $stmt->get_result();
    $valor= mysqli_num_rows($result);
    $nroRegistro=$valor;
}

 $styleName="tableRegistroSearch";
 
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$porcentajeContado = utf8_encode($valor['porcentajeContado']);  
$Porcentaje = utf8_encode($valor['porcen']);  
$preciocuota = utf8_encode($valor['preciocuota']);     
$precioDetalle = isset($valor['precio']) ? (float)$valor['precio'] : 0;
$descripcion = utf8_encode($valor['descripcion']);                    
$comision = utf8_encode($valor['comision']);          
$Cuota = utf8_encode($valor['Cuota']); 

if($preciocontado<=0 && $precioDetalle>0){
	$preciocontado=$precioDetalle;
}

if($Cuota=="1"){
	if($preciocontado<=0 && (float)$preciocuota>0){
		$preciocontado=$preciocuota;
	}
}else{
	$cuotas[]=array(
		"cuota"=>(float)$Cuota,
		"precio_cuota"=>(float)$preciocuota,
		"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.')
	);
	$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' style='height: 20px; font-size: 11px;padding: 0px;' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td   style='width:100%;padding: 0px;'>&nbsp;".$Cuota."&nbsp; X&nbsp; <b>&nbsp;&nbsp;<u> Gs.&nbsp;&nbsp;&nbsp; ".number_format($preciocuota,'0',',','.')." </u></b></td>
</tr>
</table>";
}      


}
}
 
 $datos[0]=$pagina;
 $datos[1]=$preciocontado;
 $datos[2]=$cuotas;
return $datos;
}



function obtenerUltimaId()
{
	$cod_producto ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select cod_producto from producto where estado='Activo'  order by cod_producto desc limit 1";
	
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
		  
		  
		      $cod_producto=$valor['cod_producto'];
		   	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $cod_producto;
}



function  buscarexistencialocal($buscar)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$sql= "select pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.unidad_producto,pr.cod_barra,pr.codProveedor,pr.porcentaje,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,stk.cod_localFK,pr.comision,pr.estado,
(select Nombre from local where cod_local= stk.cod_localFK  and estado='Activo' limit 1 ) as local,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto 

where pr.cod_producto = ? and pr.estado='Activo' and (select estado from local where cod_local= stk.cod_localFK  and estado='Activo' limit 1 )='Activo' limit 50";
	


$pagina = "";   
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
$control=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
 
$stock_producto = utf8_encode($valor['stock_producto']); 
$cod_producto = utf8_encode($valor['cod_producto']); 
$local = utf8_encode($valor['local']); 

$filas[]=array(
"codigo_producto"=>$cod_producto,
"stock"=>(float)$stock_producto,
"stock_formateado"=>$stock_producto,
"local"=>$local
);
$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='' >
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='' style='width:30%'>".$stock_producto."</td>
<td  id='' style='width:70%'>".$local."</td>
</tr>
</table>";
	}
	}
	}
    
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscarinformedepositoproductos($fecha1,$fecha2,$estado,$diferencia,$local,$idinformedepositolistado)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$condicionfecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionfecha=" and fecha>='$fecha1'and fecha<='$fecha2'";
}

$condicionestado ='';
if($estado !=''){
	$condicionestado = " and estado_stock = '$estado'";
}


$condiciondiferencia ='';
if($diferencia !=''){
	if($diferencia == '1'){
		$condiciondiferencia =' and stock = stock_ant ';
	}
	
	if($diferencia == '2'){
		$condiciondiferencia =' and stock > stock_ant ';
	}
	
	if($diferencia == '3'){
		$condiciondiferencia =' and stock < stock_ant ';
	}
}

$condicionlocal = '';
if($local !=''){
	$condicionlocal = " and (SELECT cod_local from local where cod_local = cod_local_deposito) = '$local'";
}

$sql= "Select idhistorialsalidadeposito, stock, fecha, cod_local_deposito, estado, cod_usuario_fk,stock_ant,
(SELECT nombre_producto from producto where cod_producto = cod_producto_fk) nombre_producto,
(SELECT Nombre from local where cod_local = cod_local_deposito) local,
(SELECT nombre_persona from persona where cod_persona = cod_usuario_fk) as usuario
from historialsalidadeposito where estado = 'Activo' and idlista_controldepositoFK = '$idinformedepositolistado'".$condicionfecha.$condicionestado.$condiciondiferencia.$condicionlocal;

/* echo $sql;
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
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idhistorialsalidadeposito = utf8_encode($valor['idhistorialsalidadeposito']);    
$stock = utf8_encode($valor['stock']);      
$cod_local_deposito = utf8_encode($valor['cod_local_deposito']);
$estado = utf8_encode($valor['estado']);      
$stock_ant = utf8_encode($valor['stock_ant']);      
$nombre_producto = utf8_encode($valor['nombre_producto']);
$local = utf8_encode($valor['local']);
$usuario = utf8_encode($valor['usuario']);
$fecha = utf8_encode($valor['fecha']);
$fecha = date("d-m-Y", strtotime($fecha));
$diferencia = $stock_ant - $stock;
$diferencia = abs($diferencia);

$style='';

if($stock > $stock_ant){
	$style='background-color:green;color:white;';
}
if($stock < $stock_ant){
	$style='background-color:red;color:white;';
}

$filas[]=array(
"codigo"=>$idhistorialsalidadeposito,
"producto"=>$nombre_producto,
"stock"=>(float)$stock,
"stock_anterior"=>(float)$stock_ant,
"diferencia"=>(float)$diferencia,
"fecha"=>$fecha,
"usuario"=>$usuario,
"codigo_local"=>$cod_local_deposito,
"local"=>$local,
"estado_variacion"=>($stock>$stock_ant ? "aumento" : ($stock<$stock_ant ? "disminucion" : "sin_cambio"))
);
   
$styleName=CargarStyleTable($styleName);
if(!$formatoJson){
$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' style='$style' >
<td style='width:10%'>".$nombre_producto."</td>
<td style='width:10%'>".$stock."</td>
<td style='width:10%'>".$stock_ant."</td>
<td style='width:10%'>".$diferencia."</td>
<td style='width:10%'>".$fecha."</td>
<td style='width:10%'>".$usuario."</td>
<td style='width:10%'>".$local."</td>
</tr>
</table>";
}

}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" =>number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}
function buscarinformedepositolistado($fecha1,$fecha2,$cod_localFK)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$condicionfecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionfecha=" and fecha_insert>='$fecha1'and fecha_insert<='$fecha2'";
}

$condicionlocal="";
if($cod_localFK!=""){
	$condicionlocal=" and cod_localFK = '$cod_localFK'";
}

$sql= "Select idlista_controldeposito, nombre,fecha_insert,cod_localFK,
(select nombre from local where cod_local = cod_localFK) as local
from `lista_controldeposito` where idlista_controldeposito != 0".$condicionfecha.$condicionlocal;

/* echo $sql;
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
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idlista_controldeposito = utf8_encode($valor['idlista_controldeposito']);    
$nombre = utf8_encode($valor['nombre']);      
$fecha_insert = utf8_encode($valor['fecha_insert']);      
$local = utf8_encode($valor['local']);      
$codigo_local = utf8_encode($valor['cod_localFK']);

$filas[]=array(
"codigo"=>$idlista_controldeposito,
"nombre"=>$nombre,
"fecha"=>$fecha_insert,
"local"=>$local,
"codigo_local"=>$codigo_local
);
   
$styleName=CargarStyleTable($styleName);
if(!$formatoJson){
$pagina.="<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosinformedeposito(this)' >
<td id='td_id' style='display:none'>".$idlista_controldeposito."</td>
<td style='width:33%'>".$nombre."</td>
<td style='width:33%'>".$fecha_insert."</td>
<td style='width:33%'>".$local."</td>
</tr>
</table>";
}

}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" =>number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}
function obtener_sumatoria_cantidad_stock_locales($cod_productoFK)
{
	$stock_total ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "select IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_total
		from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
		where pr.estado='Activo' and stk.cod_productofk = '$cod_productoFK'";
	
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
		  
		  
		      $stock_total=$valor['stock_total'];
		   	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $stock_total;
}

function buscarinformegralproductos($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$agrupaciongralproducto,$cod_proveedor,$fechaStock)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicioncategoria = "";
if ($Categoria != "") {
    $condicioncategoria = " AND pr.cod_categoriaFK = '$Categoria'";
}

$condicionmarca = "";
if ($Marcas != "") {
    $condicionmarca = " AND pr.cod_marcasFK = '$Marcas'";
}

$condicionproducto = "";
if ($producto != "") {
    $condicionproducto = " AND pr.nombre_producto LIKE '%$producto%'";
}

$condicionstock = "";
if ($stock != "") {
    $condicionstock = " HAVING stock_producto = '$stock'";
}

$condicioncodproducto = "";
if ($codproducto != "") {
    $condicioncodproducto = " AND pr.cod_barra = '$codproducto'";
}

$condicionlocal = "";
if ($local != "") {
    $condicionlocal = " AND stk.cod_localFK = '$local'";
}

$condicionproveedor = "";
if ($cod_proveedor != "") {
    $condicionproveedor = " AND pr.CodProveedor = '$cod_proveedor'";
}

$condicionfechastock = "";
if ($fechaStock != "") {
    $condicionfechastock = " AND sp.fecha_hora <= '$fechaStock'";
}

$condicioncontrol = "";
if ($control != "") {
    if ($control == "1") {
        $condicioncontrol = " HAVING stock_producto > 0";
    }
    if ($control == "2") {
        $condicioncontrol = " HAVING stock_producto <= 0";
    }
}

$condiciongroupby = " GROUP BY stk.idstocklocales";
if ($agrupaciongralproducto == "1") {
    $condiciongroupby = " GROUP BY pr.cod_producto";
}
if ($agrupaciongralproducto == "2") {
    $condiciongroupby = " GROUP BY pr.cod_categoriaFK";
}

$sql = "
SELECT 
    pr.cod_barra,
    pr.nombre_producto,
    pr.descripcion_producto,
    pr.unidad_producto,
    (pr.precio_producto - pr.precio_compra) AS ganancia,
    pr.precio_producto,
    pr.precio_compra,
    SUM(IFNULL(sp.entero, 0)) AS stock_producto,
    stk.cod_localFK,
    pr.comision,
    pr.estado,
    (SELECT descripcion FROM categoria WHERE cod_categoria = pr.cod_categoriaFK LIMIT 1) AS NombreCategoria,
    (SELECT descripcion FROM marcas WHERE cod_marcas = pr.cod_marcasFK LIMIT 1) AS NombreMarca,
    (SELECT nombre_persona FROM persona WHERE cod_persona = pr.CodProveedor LIMIT 1) AS proveedor,
    (SELECT Nombre FROM local WHERE cod_local = stk.cod_localFK LIMIT 1) AS local
FROM 
    producto pr
INNER JOIN 
    stocklocales stk ON stk.cod_productofk = pr.cod_producto
LEFT JOIN 
    stock_producto sp ON sp.cod_stocklocalesFK = stk.idstocklocales
WHERE 
    pr.estado = 'Activo' and (SELECT estado FROM local WHERE cod_local = stk.cod_localFK LIMIT 1) = 'Activo'
    $condicionproducto
    $condicioncodproducto
    $condicioncategoria
    $condicionmarca
    $condicionlocal
    $condicionproveedor
$condicionfechastock
$condiciongroupby
$condicionstock
$condicioncontrol
ORDER BY 
    NombreCategoria ASC, stock_producto DESC
LIMIT 50
";
  

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
$costototales=0;
$totalStock = 0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_barra']);
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
$ganancia = utf8_encode($valor['ganancia']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$proveedor = utf8_encode($valor['proveedor']); 
$totalcostos=$precio_compra*$stock_producto;
$costototales=$costototales+$totalcostos;
$totalStock += $stock_producto;
$styleFondo="";
if($stock_producto<0){
$styleFondo="background-color:#FF5722;color:#fff";	
}


$precioTotal=$precio_compra * $stock_producto;
$filas[]=array(
"codigo_barra"=>$cod_producto,
"producto"=>$nombre_producto,
"categoria"=>$NombreCategoria,
"marca"=>$NombreMarca,
"proveedor"=>$proveedor,
"stock"=>(float)$stock_producto,
"stock_formateado"=>number_format($stock_producto,'0',',','.'),
"costo"=>(float)$precio_compra,
"costo_formateado"=>number_format($precio_compra,'0',',','.'),
"total_costo"=>(float)$precioTotal,
"total_costo_formateado"=>number_format($precioTotal,'0',',','.'),
"codigo_local"=>$cod_localFK,
"local"=>$local,
"stock_negativo"=>((float)$stock_producto<0)
);
//$paginaprecios=number_format($precio_producto,'0',',','.')."Gs, Contado <br>".buscardetallespreciosb($cod_producto, $precio_producto,$comision);


	$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' style='$styleFondo'>
<tr id='tbSelecRegistro' >
<td  style='width:8%'>".$cod_producto."</td>
<td  style='width:22%'>".$nombre_producto."</td>
<td  style='width:15%'>".$NombreCategoria."</td>
<td  style='width:15%'>".$NombreMarca."</td>
<td  style='width:10%'>".$proveedor."</td>
<td  style='width:5%;'>".number_format($stock_producto,'0',',','.')."</td>
<td  style='width:5%'>".number_format($precio_compra,'0',',','.')."</td>
<td  style='width:10%'>".number_format($precioTotal,'0',',','.')."</td>
<td  style='width:10%'>".$local."</td>
</tr>
</tr>
</table>";
	}





}
}
$sql= "select pr.cod_barra , SUM(IFNULL(sp.entero, 0)) AS stock_producto
FROM 
    producto pr
INNER JOIN 
    stocklocales stk ON stk.cod_productofk = pr.cod_producto
LEFT JOIN 
    stock_producto sp ON sp.cod_stocklocalesFK = stk.idstocklocales
WHERE 
    pr.estado = 'Activo' and (SELECT estado FROM local WHERE cod_local = stk.cod_localFK LIMIT 1) = 'Activo'
    $condicionproducto
    $condicioncodproducto
    $condicioncategoria
    $condicionmarca
    $condicionlocal
    $condicionproveedor
	$condicionfechastock
$condiciongroupby
$condicionstock
$condicioncontrol ";

// echo($sql);
// exit;


$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$totalregistro=$valor;    

$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($costototales,'0',',','.'),"5" => $totalStock,"99"=>$nroRegistro,"100"=>$totalregistro);
echo json_encode($informacion);	
exit;
}

function buscarMasinformegralproductos($producto,$codproducto,$stock,$local,$Categoria,$Marcas,$control,$totalStock,$totalcostos,$agrupaciongralproducto,$registrocargados,$cod_proveedor,$fechaStock)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();
$condicioncategoria = "";
if ($Categoria != "") {
    $condicioncategoria = " AND pr.cod_categoriaFK = '$Categoria'";
}

$condicionmarca = "";
if ($Marcas != "") {
    $condicionmarca = " AND pr.cod_marcasFK = '$Marcas'";
}

$condicionproducto = "";
if ($producto != "") {
    $condicionproducto = " AND pr.nombre_producto LIKE '%$producto%'";
}

$condicionstock = "";
if ($stock != "") {
    $condicionstock = " HAVING stock_producto = '$stock'";
}

$condicioncodproducto = "";
if ($codproducto != "") {
    $condicioncodproducto = " AND pr.cod_barra = '$codproducto'";
}

$condicionlocal = "";
if ($local != "") {
    $condicionlocal = " AND stk.cod_localFK = '$local'";
}

$condicionproveedor = "";
if ($cod_proveedor != "") {
    $condicionproveedor = " AND pr.CodProveedor = '$cod_proveedor'";
}

$condicionfechastock = "";
if ($fechaStock != "") {
    $condicionfechastock = " AND sp.fecha_hora <= '$fechaStock'";
}

$condicioncontrol = "";
if ($control != "") {
    if ($control == "1") {
        $condicioncontrol = " HAVING stock_producto > 0";
    }
    if ($control == "2") {
        $condicioncontrol = " HAVING stock_producto <= 0";
    }
}

$condiciongroupby = " GROUP BY stk.idstocklocales";
if ($agrupaciongralproducto == "1") {
    $condiciongroupby = " GROUP BY pr.cod_producto";
}
if ($agrupaciongralproducto == "2") {
    $condiciongroupby = " GROUP BY pr.cod_categoriaFK";
}

$sql = "
SELECT 
    pr.cod_barra,
    pr.nombre_producto,
    pr.descripcion_producto,
    pr.unidad_producto,
    (pr.precio_producto - pr.precio_compra) AS ganancia,
    pr.precio_producto,
    pr.precio_compra,
    SUM(IFNULL(sp.entero, 0)) AS stock_producto,
    stk.cod_localFK,
    pr.comision,
    pr.estado,
    (SELECT descripcion FROM categoria WHERE cod_categoria = pr.cod_categoriaFK LIMIT 1) AS NombreCategoria,
    (SELECT descripcion FROM marcas WHERE cod_marcas = pr.cod_marcasFK LIMIT 1) AS NombreMarca,
    (SELECT nombre_persona FROM persona WHERE cod_persona = pr.CodProveedor LIMIT 1) AS proveedor,
    (SELECT Nombre FROM local WHERE cod_local = stk.cod_localFK LIMIT 1) AS local
FROM 
    producto pr
INNER JOIN 
    stocklocales stk ON stk.cod_productofk = pr.cod_producto
LEFT JOIN 
    stock_producto sp ON sp.cod_stocklocalesFK = stk.idstocklocales
WHERE 
    pr.estado = 'Activo' and (SELECT estado FROM local WHERE cod_local = stk.cod_localFK LIMIT 1) = 'Activo'
    $condicionproducto
    $condicioncodproducto
    $condicioncategoria
    $condicionmarca
    $condicionlocal
    $condicionproveedor
$condicionfechastock
$condiciongroupby
$condicionstock
$condicioncontrol
ORDER BY 
    NombreCategoria ASC, stock_producto DESC
 limit ".$registrocargados." , 50 ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor+$registrocargados;
$costototales=$totalcostos;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_barra']);
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
$ganancia = utf8_encode($valor['ganancia']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$proveedor = utf8_encode($valor['proveedor']); 
$totalcostos=$precio_compra*$stock_producto;
$costototales=$costototales+$totalcostos;
$totalStock += $stock_producto;
$styleFondo="";
if($stock_producto<0){
$styleFondo="background-color:#FF5722;color:#fff";	
}

$precioTotal=$precio_compra * $stock_producto;
$filas[]=array(
"codigo_barra"=>$cod_producto,
"producto"=>$nombre_producto,
"categoria"=>$NombreCategoria,
"marca"=>$NombreMarca,
"proveedor"=>$proveedor,
"stock"=>(float)$stock_producto,
"stock_formateado"=>number_format($stock_producto,'0',',','.'),
"costo"=>(float)$precio_compra,
"costo_formateado"=>number_format($precio_compra,'0',',','.'),
"total_costo"=>(float)$precioTotal,
"total_costo_formateado"=>number_format($precioTotal,'0',',','.'),
"codigo_local"=>$cod_localFK,
"local"=>$local,
"stock_negativo"=>((float)$stock_producto<0)
);
//$paginaprecios=number_format($precio_producto,'0',',','.')."Gs, Contado <br>".buscardetallespreciosb($cod_producto, $precio_producto,$comision);
$styleName=CargarStyleTable($styleName);



	$styleName=CargarStyleTable($styleName);
	if(!$formatoJson){
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' style='$styleFondo'>
<tr id='tbSelecRegistro' >
<td  style='width:8%'>".$cod_producto."</td>
<td  style='width:22%'>".$nombre_producto."</td>
<td  style='width:15%'>".$NombreCategoria."</td>
<td  style='width:15%'>".$NombreMarca."</td>
<td  style='width:10%'>".$proveedor."</td>
<td  style='width:5%;'>".number_format($stock_producto,'0',',','.')."</td>
<td  style='width:5%'>".number_format($precio_compra,'0',',','.')."</td>
<td  style='width:10%'>".number_format($precioTotal,'0',',','.')."</td>
<td  style='width:10%'>".$local."</td>
</tr>
</tr>
</table>";
	}



}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($costototales,'0',',','.'),"5" => $totalStock ,"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;
}

function buscar_producto_movimiento_stock($codigo,$producto,$marca,$categoria,$local,$stock,$busquedaGeneral)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$condicionCategria="";
if($categoria!=""){
$condicionCategria="and pr.cod_categoriaFK='".$categoria."' ";
}

$condicionMarca="";
if($marca!=""){
$condicionMarca="and pr.cod_marcasFK='".$marca."' ";
}
$condicionCodigo="";
if($codigo!=""){
$condicionCodigo="and pr.cod_barra = '".$codigo."' ";
}

$condicionProducto="";
if($producto!=""){
$condicionProducto="and concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$producto."%' ";
}

$condicionBusquedaGeneral="";
if($busquedaGeneral!=""){
$busquedaGeneral=$mysqli->real_escape_string($busquedaGeneral);
$condicionBusquedaGeneral="and (concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$busquedaGeneral."%' or pr.cod_barra like '%".$busquedaGeneral."%') ";
}

$condicionLocal="";
if($local!=""){
$condicionLocal="and stk.cod_localFK='".$local."' ";
}

$condicionstockCondi="";
if($stock=="2"){
$condicionstockCondi=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0 ";
}
if($stock=="3"){
$condicionstockCondi=" and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0 ";
}

$sql= "select pr.tipo,pr.cod_barra,pr.porcentaje,pr.cod_producto,pr.nombre_producto,pr.descripcion_producto,pr.url,
pr.unidad_producto,stk.cod_localFK,cod_categoriaFK,cod_marcasFK,cod_ImpuestoFK,pr.link,pr.promo,
pr.precio_producto,pr.precio_compra,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,pr.comision,pr.estado,pr.CodProveedor,
(Select nombre_persona from persona where cod_persona=pr.CodProveedor limit 1) as proveedor,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as localnombre,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
pr.fecha_insert,pr.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
 from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where pr.estado='Activo' and (select estado from local where cod_local= stk.cod_localFK limit 1 )='Activo' ".$condicionMarca.$condicionCategria.$condicionCodigo.$condicionProducto.$condicionBusquedaGeneral.$condicionLocal.$condicionstockCondi." order by pr.nombre_producto asc limit 500 "; 	

// echo $sql;
// exit;

$stmt = $mysqli->prepare($sql);
$pagina = "";   
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


$link = utf8_encode($valor['link']);
$promo = utf8_encode($valor['promo']);
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
$local = utf8_encode($valor['cod_localFK']); 
$localnombre = utf8_encode($valor['localnombre']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$cod_categoriaFK = utf8_encode($valor['cod_categoriaFK']); 
$cod_marcasFK = utf8_encode($valor['cod_marcasFK']); 
$cod_ImpuestoFK = utf8_encode($valor['cod_ImpuestoFK']); 
$porcentaje = utf8_encode($valor['porcentaje']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$tipo = utf8_encode($valor['tipo']); 
$CodProveedorFK = utf8_encode($valor['CodProveedor']); 
$proveedor = utf8_encode($valor['proveedor']); 
$insertadopor = utf8_encode($valor['insertadopor']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 
$url = utf8_encode($valor['url']); 
$stockminimo = obtenerproductostockminimo($cod_producto,$cod_localFK);
$totalcostos=$precio_compra*$stock_producto;
$filas[]=crearRegistroProductoListado(
   $cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
   $precio_producto,$precio_compra,$stock_producto,$cod_localFK,$localnombre,
   $comision,$estado,$NombreCategoria,$NombreImpuesto,$NombreMarca,
   array(
      "codigo_categoria"=>$cod_categoriaFK,
      "codigo_marca"=>$cod_marcasFK,
      "codigo_impuesto"=>$cod_ImpuestoFK,
      "porcentaje"=>$porcentaje,
      "tipo"=>$tipo,
      "codigo_proveedor"=>$CodProveedorFK,
      "proveedor"=>$proveedor,
      "promo"=>$promo,
      "link"=>$link,
      "imagen_url"=>$url,
      "usuario_alta"=>$insertadopor,
      "usuario_edicion"=>$editadopor,
      "fecha_alta"=>$fecha_insert,
      "fecha_edicion"=>$fecha_edit,
      "stock_minimo"=>(float)$stockminimo,
      "total_costo"=>(float)$totalcostos,
      "total_costo_formateado"=>number_format((float)$totalcostos,'0',',','.')
   )
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='ObtenerdatosMovimientoStock(this)'>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td id='td_datos_19' style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreImpuesto."</td>
<td  id='td_datos_13' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_11' style='width:10%'>".$NombreCategoria."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($stock_producto,'2',',','.')."</td>
<td  id='td_datos_4' style='display:none'>".number_format($precio_producto,'0',',','.') ."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_18' style='display:none'>".number_format($totalcostos,'0',',','.')."</td>
<td  id='td_datos_22' style='display:none'>".$proveedor."</td>
<td  id='td_datos_24' style='display:none'>".$promo."</td>
<td  id='' style='width:10%'>".$localnombre."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_14' style='display:none'>".$cod_categoriaFK."</td>
<td  id='td_datos_15' style='display:none'>".$cod_marcasFK."</td>
<td  id='td_datos_16' style='display:none'>".$cod_ImpuestoFK."</td>
<td  id='td_datos_17' style='display:none'>".$porcentaje."</td>
<td  id='td_datos_20' style='display:none'>".$tipo."</td>
<td  id='td_datos_23' style='display:none'>".$CodProveedorFK."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
<td  id='td_datos_104' style='display:none'>".$link."</td>
<td  id='td_datos_105' style='display:none'>".$url."</td>
<td  id='td_datos_106' style='display:none'>".$stockminimo."</td>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}
function buscar_producto_stock_minimo_producto($codigo,$producto,$marca,$categoria,$local,$cod_proveedor)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonProductos();
$filas=array();

$condicionCategria="";
if($categoria!=""){
$condicionCategria="and pr.cod_categoriaFK='".$categoria."' ";
}

$condicionMarca="";
if($marca!=""){
$condicionMarca="and pr.cod_marcasFK='".$marca."' ";
}
$condicionCodigo="";
if($codigo!=""){
$condicionCodigo="and pr.cod_barra = '".$codigo."' ";
}

$condicionProducto="";
if($producto!=""){
$condicionProducto="and concat(pr.nombre_producto,' ',pr.descripcion_producto) like '%".$producto."%' ";
}

$condicionLocal="";
if($local!=""){
$condicionLocal="and stk.cod_localFK='".$local."' ";
}

$condicioncod_proveedor="";
if($cod_proveedor != ""){
$condicioncod_proveedor="and pr.CodProveedor='".$cod_proveedor."' ";
}



$sql= "select pr.cod_producto,pr.nombre_producto,pr.estado,pr.CodProveedor,stk.cod_localFK,pr.cod_barra,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as localnombre,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
(select nombre_persona from persona where cod_persona= pr.CodProveedor limit 1 ) as proveedor,
IFNULL((SELECT cantidad FROM stockminimo sm WHERE sm.cod_productoFK = pr.cod_producto and sm.cod_localFK = stk.cod_localfk),0) as stock_minimo
 from producto pr inner join stocklocales stk on pr.cod_producto = stk.cod_productofk
where pr.estado='Activo' and (select estado from local where cod_local= stk.cod_localFK limit 1 )='Activo' ".$condicionMarca.$condicionCategria.$condicionCodigo.$condicionProducto.$condicionLocal.$condicioncod_proveedor." order by pr.nombre_producto asc limit 300 "; 	

// echo $sql;
// exit;

$stmt = $mysqli->prepare($sql);
$pagina = "";   
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
$stock_minimo = utf8_encode($valor['stock_minimo']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$localnombre = utf8_encode($valor['localnombre']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$proveedor = utf8_encode($valor['proveedor']); 

$filas[]=array(
   "codigo"=>$cod_producto,
   "codigo_barra"=>$cod_barra,
   "producto"=>$nombre_producto,
   "marca"=>$NombreMarca,
   "categoria"=>$NombreCategoria,
   "stock_minimo"=>(float)$stock_minimo,
   "stock_minimo_formateado"=>$stock_minimo,
   "codigo_local"=>$cod_localFK,
   "local"=>$localnombre,
   "proveedor"=>$proveedor
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='ObtenerdatosStockMinimoProducto(this)'>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td id='td_datos_19' style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='td_datos_13' style='width:10%'>".$NombreMarca."</td>
<td  id='td_datos_11' style='width:10%'>".$NombreCategoria."</td>
<td  id='td_datos_6' style='width:10%'>".$stock_minimo."</td>
<td  id='' style='width:10%'>".$proveedor."</td>
<td  id='' style='width:10%'>".$localnombre."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}
/*Funcion para insertar,modificar o eliminar registros*/
function modificar_stock($cantidad,$tipo,$cod_motivo,$cod_localFK,$user,$cod_productoFK)
{

if( $cod_productoFK=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 

$consulta1="Insert into movimiento_stock (cod_user_insert,fecha,cod_productoFK,idmotivo_movimiento_stockFK,cantidad,tipo,estado,cod_localFK)
values('$user','$fecha_inser_edit','$cod_productoFK','$cod_motivo','$cantidad','$tipo','Activo','$cod_localFK')";
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

if($tipo == 'Sumar'){
	// SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,"suma");
	SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,"SUMA","AJUSTE DE STOCK");
}else{
	// SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,"resta");
	SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,"RESTA","AJUSTE DE STOCK");
}

mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
/*Funcion para insertar,modificar o eliminar registros*/
function modificar_stock_minimo($cantidad,$cod_localFK,$user,$cod_productoFK)
{

if( $cod_productoFK=="" || $cantidad=="" || $cod_localFK=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time());

$control = comprobar_registro_existencia_stock_minimo($cod_localFK,$cod_productoFK);

if($control){
	$consulta1="Insert into stockminimo (user_update,cod_productoFK,cantidad,cod_localFK)
values('$user','$cod_productoFK','$cantidad','$cod_localFK')";

}else{
		$consulta1="UPDATE stockminimo SET cantidad = '$cantidad' WHERE cod_productoFK = '$cod_productoFK' and cod_localFK = '$cod_localFK'";

}
 
 
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
function comprobar_registro_existencia_stock_minimo($cod_localFK,$cod_productoFK){
	$mysqli=conectar_al_servidor();


$sql= "SELECT count(idstockminimo) as contador FROM stockminimo WHERE cod_productoFK = '$cod_productoFK' and cod_localFK = '$cod_localFK'";



  
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$contador = '';

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$contador = utf8_encode($valor['contador']);




}
}


mysqli_close($mysqli);



if($contador > 0){
	return false;
}else{
	return true;
}

}

function buscar_informe_movimiento_stock($fecha1,$fecha2,$cod_localFK,$producto,$motivo,$fecha){
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();

$condicionfecha="";
if($fecha!=""){
	$condicionfecha=" and fecha='$fecha'";
}

	 $condicionRangoFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionRangoFecha=" and fecha between '$fecha1' and '$fecha2' ";
}

$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and (SELECT nombre_producto from producto where cod_producto = cod_productoFK) like '%".$producto."%'";
}

$condicionmotivo="";
if($motivo!=""){
	$condicionmotivo=" and (SELECT descripcion from motivo_movimiento_stock where idmotivo_movimiento_stock = idmotivo_movimiento_stockFK) = '".$motivo."'";
}
$condicionlocal="";
if($cod_localFK!=""){
	$condicionlocal=" and cod_localFK = '".$cod_localFK."'";
}


$sql= "SELECT cod_user_insert,fecha,cantidad,cod_productoFK,tipo,estado,cod_localFK,idmotivo_movimiento_stockFK,
(SELECT nombre_persona from persona where cod_persona = cod_user_insert) as usuario,
(SELECT nombre_producto from producto where cod_producto = cod_productoFK) as producto,
(SELECT nombre from local where cod_local = cod_localFK) as local,
(SELECT descripcion from motivo_movimiento_stock where idmotivo_movimiento_stock = idmotivo_movimiento_stockFK) as motivo
FROM movimiento_stock where estado = 'Activo' ".$condicionfecha.$condicionRangoFecha.$condicionproducto.$condicionmotivo.$condicionlocal." limit 150";



$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$costototales=0;
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_user_insert = utf8_encode($valor['cod_user_insert']);
$fecha = utf8_encode($valor['fecha']);
$cantidad = utf8_encode($valor['cantidad']);
$cod_productoFK = utf8_encode($valor['cod_productoFK']);
$tipo = utf8_encode($valor['tipo']);
$estado = utf8_encode($valor['estado']);
$cod_localFK = utf8_encode($valor['cod_localFK']);
$idmotivo_movimiento_stockFK = utf8_encode($valor['idmotivo_movimiento_stockFK']);

$usuario = utf8_encode($valor['usuario']);
$producto = utf8_encode($valor['producto']);
$local = utf8_encode($valor['local']);
$motivo = utf8_encode($valor['motivo']);

$filas[]=array(
   "codigo_producto"=>$cod_productoFK,
   "producto"=>$producto,
   "codigo_motivo"=>$idmotivo_movimiento_stockFK,
   "motivo"=>$motivo,
   "fecha"=>$fecha,
   "codigo_usuario"=>$cod_user_insert,
   "usuario"=>$usuario,
   "cantidad"=>(float)$cantidad,
   "cantidad_formateada"=>$cantidad,
   "tipo"=>$tipo,
   "estado"=>$estado,
   "codigo_local"=>$cod_localFK,
   "local"=>$local
);
$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  style='width:20%'>".$producto."</td>
<td  style='width:15%'>".$motivo."</td>
<td  style='width:10%'>".$fecha."</td>
<td  style='width:10%'>".$usuario."</td>
<td  style='width:10%'>".$cantidad."</td>
<td  style='width:10%;'>".$tipo."</td>
<td  style='width:15%'>".$local."</td>
</tr>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => number_format($nroRegistro,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarListadoSolicitudDespacho($cod_local)
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
	 
		$sql= "SELECT idhistorialdespacho,stock,fecha,cod_local_de,cod_local_a,cod_producto_fk,estado_solicitud,
		(SELECT nombre_producto from producto where cod_producto  = cod_producto_fk) as producto,
		(SELECT nombre_persona from persona where cod_persona = cod_usuario_fk) as usuario,
		(SELECT nombre from local where cod_local = cod_local_de) as from_local,
		(SELECT nombre from local where cod_local = cod_local_a) as to_local
		from historialdespacho where estado ='Activo' and estado_solicitud = 'PENDIENTE' and cod_local_a = '$cod_local' order by idhistorialdespacho asc ";
	
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
 $codigo ='';
 $accion = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idhistorialdespacho=utf8_encode($valor['idhistorialdespacho']);
			  $stock=utf8_encode($valor['stock']);
			  $fecha=utf8_encode($valor['fecha']);
			  $from_local=utf8_encode($valor['from_local']);
			  $estado_solicitud=utf8_encode($valor['estado_solicitud']);
			  $producto=utf8_encode($valor['producto']);
			  $usuario=utf8_encode($valor['usuario']);
			  $to_local=utf8_encode($valor['to_local']);
			  $cod_local_de=utf8_encode($valor['cod_local_de']);
			  $cod_local_a=utf8_encode($valor['cod_local_a']);
			  $cod_producto_fk=utf8_encode($valor['cod_producto_fk']);

			  $filas[]=array(
				"codigo"=>$idhistorialdespacho,
				"codigo_producto"=>$cod_producto_fk,
				"producto"=>$producto,
				"stock"=>(float)$stock,
				"stock_formateado"=>$stock,
				"codigo_local_origen"=>$cod_local_de,
				"local_origen"=>$from_local,
				"codigo_local_destino"=>$cod_local_a,
				"local_destino"=>$to_local,
				"fecha"=>$fecha,
				"usuario"=>$usuario,
				"estado"=>$estado_solicitud
			  );
		  	 
			
			
			  
		  	 $styleName=CargarStyleTable($styleName);
			 if(!$formatoJson){
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatossolicituddespacho(this)'>
			  <td id='td_id' style='display:none' >".$idhistorialdespacho."</td>
			  <td id='' style='width:30%' >".$producto."</td>
			  <td id='' style='width:10%' >".$stock."</td>
			  <td id='' style='width:10%' >".$from_local."</td>
			  <td id='' style='width:10%' >".$to_local."</td>
			  <td id='' style='width:10%' >".$fecha."</td>
			  <td style='width:10%' >".$usuario."</td>
			  <td style='width:10%' >".$estado_solicitud."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}

function buscarListadoSolicitudDespachoTodosLocales($producto,$local,$local2)
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
		$condicionlocal = '';
		if($local != ''){
		$condicionlocal = " and  cod_local_de = '$local' ";
		}

$condicionlocal2 = '';
		if($local2 != ''){
		$condicionlocal2 = " and  cod_local_a = '$local2' ";
		}
		$condicionproducto = '';
		if($producto != ''){
			$condicionproducto = " and  (SELECT nombre_producto from producto where cod_producto  = cod_producto_fk) like '%".$producto."%' ";
		}
	 
		$sql= "SELECT idhistorialdespacho,stock,fecha,cod_local_de,cod_local_a,cod_producto_fk,estado_solicitud,
		(SELECT nombre_producto from producto where cod_producto  = cod_producto_fk) as producto,
		(SELECT nombre_persona from persona where cod_persona = cod_usuario_fk) as usuario,
		(SELECT nombre from local where cod_local = cod_local_de) as from_local,
		(SELECT nombre from local where cod_local = cod_local_a) as to_local
		from historialdespacho where estado ='Activo' and estado_solicitud = 'PENDIENTE'".$condicionlocal.$condicionlocal2.$condicionproducto." order by idhistorialdespacho asc ";
	
/* echo $sql;
exit;  */
   
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
		  
		      $idhistorialdespacho=utf8_encode($valor['idhistorialdespacho']);
			  $stock=utf8_encode($valor['stock']);
			  $fecha=utf8_encode($valor['fecha']);
			  $from_local=utf8_encode($valor['from_local']);
			  $estado_solicitud=utf8_encode($valor['estado_solicitud']);
			  $producto=utf8_encode($valor['producto']);
			  $usuario=utf8_encode($valor['usuario']);
			  $to_local=utf8_encode($valor['to_local']);
			  $cod_local_de=utf8_encode($valor['cod_local_de']);
			  $cod_local_a=utf8_encode($valor['cod_local_a']);
			  $cod_producto_fk=utf8_encode($valor['cod_producto_fk']);

			  $filas[]=array(
				"codigo"=>$idhistorialdespacho,
				"codigo_producto"=>$cod_producto_fk,
				"producto"=>$producto,
				"stock"=>(float)$stock,
				"stock_formateado"=>$stock,
				"codigo_local_origen"=>$cod_local_de,
				"local_origen"=>$from_local,
				"codigo_local_destino"=>$cod_local_a,
				"local_destino"=>$to_local,
				"fecha"=>$fecha,
				"usuario"=>$usuario,
				"estado"=>$estado_solicitud
			  );
		  	 
			
			
			  
		  	 $styleName=CargarStyleTable($styleName);
			 if(!$formatoJson){
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatossolicituddespacho(this)'>
			  <td id='td_id' style='display:none' >".$idhistorialdespacho."</td>
			  <td id='' style='width:30%' >".$producto."</td>
			  <td id='' style='width:10%' >".$stock."</td>
			  <td id='' style='width:10%' >".$from_local."</td>
			  <td id='' style='width:10%' >".$to_local."</td>
			  <td id='' style='width:10%' >".$fecha."</td>
			  <td style='width:10%' >".$usuario."</td>
			  <td style='width:10%' >".$estado_solicitud."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}





function aceptarSolicitudDespacho($idhistorialdespacho)
{
    $mysqli = conectar_al_servidor();
   
    if (empty($idhistorialdespacho)) {
        echo json_encode(["1" => "camposvacio"]);
        exit;
    }

    // Obtener datos del historial de despacho
    $consulta = "SELECT stock, cod_local_de, cod_local_a, cod_producto_fk 
                 FROM historialdespacho 
                 WHERE idhistorialdespacho = ? AND estado = 'Activo' AND estado_solicitud = 'PENDIENTE' 
                 LIMIT 1";
    
    $stmt = $mysqli->prepare($consulta);
    $stmt->bind_param("i", $idhistorialdespacho);
    
    if (!$stmt->execute()) {
        echo json_encode(["1" => "error"]);
        exit;
    }

    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        mysqli_close($mysqli);
        echo json_encode(["1" => "exito" ]);
        exit;
    }

    $row = $result->fetch_assoc();
    $stock = $row['stock'];
    $cod_local_de = $row['cod_local_de'];
    $cod_local_a = $row['cod_local_a'];
    $cod_producto_fk = $row['cod_producto_fk'];

    // Aceptar solicitud
    date_default_timezone_set('America/Anguilla');
    $fecha_inser_edit = date('Y-m-d');
    $user = isset($_POST['useru']) ? utf8_decode($_POST['useru']) : '';

    $sqlUpdate = "UPDATE historialdespacho 
                  SET estado_solicitud = 'ACEPTADO', aceptado_por_userFK = ?, fecha_aceptado = ? 
                  WHERE idhistorialdespacho = ?";
    
    $stmtUpdate = $mysqli->prepare($sqlUpdate);
    $stmtUpdate->bind_param("ssi", $user, $fecha_inser_edit, $idhistorialdespacho);

    if (!$stmtUpdate->execute()) {
        echo json_encode(["1" => "error"]);
        exit;
    }

    // Verificar si existe el stock en destino
    $sqlStock = "SELECT COUNT(*) FROM stocklocales 
                 WHERE cod_productofk = ? AND cod_localfk = ?";
    
    $stmtStock = $mysqli->prepare($sqlStock);
    $stmtStock->bind_param("ss", $cod_producto_fk, $cod_local_a);

    if (!$stmtStock->execute()) {
        echo json_encode(["1" => "error"]);
        exit;
    }

    $stmtStock->bind_result($existeStock);
    $stmtStock->fetch();

    // Actualizar stock
    if ($existeStock == 1) {
        // SumarRestarStockA($stock, $cod_producto_fk, $cod_local_a, "suma");
		SumarRestarStockA($stock,$cod_producto_fk,$cod_local_a,"SUMA","DESPACHO ACEPTADO");
    } else {
        anhadirStockA(0, $cod_producto_fk, $cod_local_a);
		SumarRestarStockA($stock,$cod_producto_fk,$cod_local_a,"SUMA","INICIO");
    }



    mysqli_close($mysqli);
    echo json_encode(["1" => "exito"]);
    exit;
}



function RechazarSolicitudDespacho($idhistorialdespacho)
{
    $mysqli = conectar_al_servidor();
   
    if (empty($idhistorialdespacho)) {
        echo json_encode(["1" => "camposvacio"]);
        exit;
    }

    // Obtener datos del historial de despacho
    $consulta = "SELECT stock, cod_local_de, cod_local_a, cod_producto_fk 
                 FROM historialdespacho 
                 WHERE idhistorialdespacho = ? AND estado = 'Activo' AND estado_solicitud = 'PENDIENTE' 
                 LIMIT 1";
    
    $stmt = $mysqli->prepare($consulta);
    $stmt->bind_param("i", $idhistorialdespacho);
    
    if (!$stmt->execute()) {
        echo json_encode(["1" => "error"]);
        exit;
    }

    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        mysqli_close($mysqli);
        echo json_encode(["1" => "exito" ]);
        exit;
    }

    $row = $result->fetch_assoc();
    $stock = $row['stock'];
    $cod_local_de = $row['cod_local_de'];
    $cod_local_a = $row['cod_local_a'];
    $cod_producto_fk = $row['cod_producto_fk'];

    // Aceptar solicitud
    date_default_timezone_set('America/Anguilla');
    $fecha_inser_edit = date('Y-m-d');
    $user = isset($_POST['useru']) ? utf8_decode($_POST['useru']) : '';

    $sqlUpdate = "UPDATE historialdespacho 
                  SET estado_solicitud = 'RECHAZADO', aceptado_por_userFK = ?, fecha_aceptado = ? 
                  WHERE idhistorialdespacho = ?";
    
    $stmtUpdate = $mysqli->prepare($sqlUpdate);
    $stmtUpdate->bind_param("ssi", $user, $fecha_inser_edit, $idhistorialdespacho);

    if (!$stmtUpdate->execute()) {
        echo json_encode(["1" => "error"]);
        exit;
    }
 
     // SumarRestarStockA($stock, $cod_producto_fk, $cod_local_de, "suma");
	 SumarRestarStockA($stock,$cod_producto_fk,$cod_local_de,"SUMA","DESPACHO RECHAZADO");
   

    mysqli_close($mysqli);
    echo json_encode(["1" => "exito"]);
    exit;
}


function NuevoGarantiaProducto($observacion,$fecharecibido,$cod_productoFK,$cod_usuarioFK,$cod_localFK,$cantidad)
{
	
if($cod_productoFK==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

$consulta1="Insert into `garantias_producto` (fecharecibido,observacion,estado,cod_productoFK,cod_usuarioFKRecibido,cod_localFK,cantidad)
values('$fecharecibido','$observacion','Pendiente a verificar','$cod_productoFK','$cod_usuarioFK','$cod_localFK','$cantidad')";


// SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,'resta');
SumarRestarStockA($cantidad,$cod_productoFK,$cod_localFK,"RESTA","PRODUCTO A GARANTIA");

$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
function EditarEstadoGarantiaProducto($idgarantia,$fecha,$estado,$codUsuarioFk)
{
if($idgarantia=="" || $fecha=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

if($estado=="verificacion"){
	$consulta1="update  garantias_producto set estado='verificacion',fechaenvio='$fecha',cod_usuarioFkEnvio='$codUsuarioFk' where idgarantia='$idgarantia' ";
}
if($estado=="listo"){
	$consulta1="update  garantias_producto set estado='listo',fechadevuelto='$fecha',cod_usuarioFkDevuelto='$codUsuarioFk' where idgarantia='$idgarantia' ";
}
if($estado=="entregado"){
	$consulta1="update  garantias_producto set estado='entregado',fechaentrega='$fecha',cod_usuarioFkEntrega='$codUsuarioFk' where idgarantia='$idgarantia' ";
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





function nuevo_combo($user_insert)
{

date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 


$mysqli=conectar_al_servidor(); 

$consulta1="Insert into `combo_producto` (fecha_insert,user_insert,estado)
values('$fecha_inser_edit','$user_insert','ACTIVO')";


$stmt1 = $mysqli->prepare($consulta1);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

$ult_id = mysqli_insert_id($mysqli);

mysqli_close($mysqli);
$informacion =array("1" => "exito","2"=>$ult_id);
echo json_encode($informacion);	
exit;
}
function add_producto_combo($idcombo_producto,$cod_productoFK,$monto_descuento,$cantidad)
{
	
if($idcombo_producto == "" || $cod_productoFK == ''){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor(); 

$consulta1="Insert into `detalle_combo_producto` (cod_productoFK,cod_comboFK,precio_descuento,cantidad)
values('$cod_productoFK','$idcombo_producto','$monto_descuento','$cantidad')";

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

function eliminar_producto_combo($id_detalle_combo_producto)
{

	
if($id_detalle_combo_producto == ""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor(); 

$consulta1="DELETE FROM detalle_combo_producto WHERE iddetalle_combo_producto = '$id_detalle_combo_producto'";

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

function buscardetallescomboproducto($idcombo_producto)
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
	 
		$sql= "SELECT cod_productoFK, cod_comboFK, iddetalle_combo_producto,cantidad,
		(SELECT cod_barra FROM producto WHERE cod_producto = cod_productoFK) as cod_barra,
		(SELECT nombre_producto FROM producto WHERE cod_producto = cod_productoFK) as nombre_producto,
		(SELECT precio_producto FROM producto WHERE cod_producto = cod_productoFK) as precio_producto,
		(SELECT precio_compra FROM producto WHERE cod_producto = cod_productoFK) as precio_compra,
		(SELECT porcentaje FROM producto WHERE cod_producto = cod_productoFK) as porcentaje
		FROM detalle_combo_producto
		WHERE cod_comboFK = '$idcombo_producto'";
   
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
 $totalPrecio = 0;
 $porcentaje=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $iddetalle_combo_producto=utf8_encode($valor['iddetalle_combo_producto']);
			  $cod_barra=utf8_encode($valor['cod_barra']);
			  $nombre_producto=utf8_encode($valor['nombre_producto']);
			  $precio_producto=utf8_encode($valor['precio_producto']);
			  $cod_comboFK=utf8_encode($valor['cod_comboFK']);
			  $cod_productoFK=utf8_encode($valor['cod_productoFK']);
			  $precio_compra=utf8_encode($valor['precio_compra']);
			  $porcentaje=utf8_encode($valor['porcentaje']);
			  $cantidad=utf8_encode($valor['cantidad']);
			  
			  if($nombre_producto == 'DESCUENTO'){
				  $precio_compra = obtener_costo_combo($cod_productoFK,$cod_comboFK);
				  $precio_compra = -$precio_compra;
			  }
			  
		  	 
				$totalPrecio +=$precio_compra;

				$filas[]=array(
					"codigo_detalle"=>$iddetalle_combo_producto,
					"codigo_combo"=>$cod_comboFK,
					"codigo_producto"=>$cod_productoFK,
					"codigo_barra"=>$cod_barra,
					"producto"=>$nombre_producto,
					"precio"=>(float)$precio_compra,
					"precio_formateado"=>number_format((float)$precio_compra,'0',',','.'),
					"cantidad"=>(float)$cantidad,
					"cantidad_formateada"=>$cantidad,
					"porcentaje"=>(float)$porcentaje
				);
			
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistroDetalleCombo' onclick='Obtenerdatosdetallecomboproducto(this)'>
			  <td id='td_id' style='display:none' >".$iddetalle_combo_producto."</td>
			  <td id='' style='width:10%' >".$cod_barra."</td>
			  <td id='td_datos_1' style='width:75%' >".$nombre_producto."</td>
			  <td id='' style='width:10%' >".number_format($precio_compra,'0',',','.')."</td>
			  <td id='' style='width:5%' >".$cantidad."</td>
			  </tr>
			  </table>"; 
	  }
 }
 
 actualizar_precio_combo($idcombo_producto,$totalPrecio,$porcentaje);
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3"=>$totalresouesta,"4"=> number_format($totalPrecio,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function actualizar_precio_combo($cod_producto,$totalPrecio,$porcentaje){
	$mysqli=conectar_al_servidor();
	
	/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
	$fecha_inser_edit = date('Y-m-d', time()); 

	$user=$_POST['useru'];
    $user = utf8_decode($user);
	
	if($porcentaje!=0){
		
		$totalPrecioCompra= $totalPrecio;	
		
		$totalPrecioVenta= $totalPrecioCompra + (($totalPrecio * $porcentaje ) / 100 );
		
		$consulta="UPDATE producto SET precio_compra = '$totalPrecioCompra' , precio_producto = '$totalPrecioVenta' WHERE cod_producto = '$cod_producto'";	


	$stmt = $mysqli->prepare($consulta); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
		
		
		
		
	}
	
	
	
	


mysqli_close($mysqli);
}

/* CARGAR DOCUMENTO INFORME DEPOSITO */
function cargarPDFControlDeposito($idlista_controldepositoFK){
	
$ext=$_POST['ext'];
$ext = utf8_decode($ext);

if($ext!=""){
$pdf=substr($_POST['pdf'], strpos($_POST['pdf'], ",") + 1);

$pdf = base64_decode($pdf);
$id_pdf="";		  
		     $donde="../fotos/documento_control_deposito/";
			  $id_pdf=$idlista_controldepositoFK;
                $id_f=subir_imagen_base64($donde,$pdf,$id_pdf,$ext);
$ruta="/GoodVentaElectroCasaMaric/fotos/documento_control_deposito/".$idlista_controldepositoFK.$id_f.'.'.$ext;
cargarPDF($ruta,$idlista_controldepositoFK);
}
}

function cargarPDF($url,$idlista_controldepositoFK){
	$mysqli=conectar_al_servidor();
	
	/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
	$fecha_inser_edit = date('Y-m-d', time()); 

	$user=$_POST['useru'];
    $user = utf8_decode($user);
	
	$consulta="INSERT INTO `archivos_listacontroldeposito` (url,estado,idlista_controldepositoFK,fecha_insert,user_insert) values('$url','ACTIVO','$idlista_controldepositoFK','$fecha_inser_edit','$user')";	


	$stmt = $mysqli->prepare($consulta); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	exit;
}

function buscar_documentos_informe_deposito($idlista_controldepositoFK)
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
	 
		$sql= "SELECT url, estado,idarchivos_listacontroldeposito,fecha_insert,
		(SELECT nombre_persona FROM persona WHERE cod_persona = user_insert) as usuario FROM archivos_listacontroldeposito
		WHERE idlista_controldepositoFK = '$idlista_controldepositoFK'";
   

   
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
		  
		      $url=utf8_encode($valor['url']);
			  $estado=utf8_encode($valor['estado']);
			  $idarchivos_listacontroldeposito=utf8_encode($valor['idarchivos_listacontroldeposito']);
			  $fecha_insert=utf8_encode($valor['fecha_insert']);
			  $usuario=utf8_encode($valor['usuario']);

			  $filas[]=array(
				"codigo"=>$idarchivos_listacontroldeposito,
				"fecha"=>$fecha_insert,
				"usuario"=>$usuario,
				"estado"=>$estado,
				"url"=>$url
			  );

			$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
			  
		  	 $styleName=CargarStyleTable($styleName);
			 if(!$formatoJson){
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr >
			  <td id='td_id' style='display:none' >".$idarchivos_listacontroldeposito."</td>
			  <td id='' style='width:10%' >".$fecha_insert."</td>
			  <td id='td_datos_1' style='width:10%' >".$usuario."</td>
			  <td id='td_datos_4' style='width:5%;text-align:center'>".$ver."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}

function buscar_vista_productos_combo($cod_comboFK,$cod_localFK)
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
	 
		$sql= "SELECT iddetalle_combo_producto,
		(SELECT cod_producto FROM producto WHERE cod_producto = cod_productoFK) as cod_producto ,
		(SELECT Nombre FROM local where cod_local = (SELECT cod_localFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as nombre_local,
		(SELECT estado FROM producto WHERE cod_producto = cod_productoFK) as estado ,
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

// echo($sql);
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
 $totalSumatoriaCostoProductosCombo = 0;
 $cod_local = '';
 $diferencia = 0;
 $Precio_contado_combo = array(0,"","",0);
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
			$cod_local = $cod_localFK;
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
			  
			$Precio_contado = buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,3);
			$controlPrecio = buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,1);
			$paginapreciosb = buscarListaDetallePrecioProductos($cod_producto,$cod_localFK,2);
			
			$Precio_contado_combo = buscarListaDetallePrecioProductos($cod_comboFK,$cod_localFK,3);

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
			  
			  $totalSumatoriaCostoProductosCombo+=$Precio_contado2;

			  $filas[]=crearRegistroProductoListado(
				$cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
				$Precio_contado2,$precio_compra,$stock_producto,$cod_localFK,$local,$comision,$estado,
				$NombreCategoria,$NombreImpuesto,$NombreMarca,array(
					"codigo_combo"=>$cod_comboFK,
					"codigo_detalle"=>utf8_encode($valor['iddetalle_combo_producto']),
					"codigo_proveedor"=>$CodProveedor,
					"cantidad"=>(float)$cantidad,
					"cantidad_formateada"=>$cantidad,
					"precio_lista"=>(float)$precio_producto,
					"detalle_precios"=>$paginaprecios,
					"es_descuento"=>false
				)
			  );
			  
		  	 $styleName=CargarStyleTable($styleName);
			 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' name='trListadoComboProductoVenta' style='' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:5%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_4' style='width:10%'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:5%'>".$stock_producto."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
<td  id='td_datos_16' style='width:10%'>".$cantidad."</td>
<td  id='td_datos_17' style='display:none'>".$cod_comboFK."</td>
</tr>
</table>";
			    	 
		  	
			  
			  
	  }
 }
 
 

 

 if($totalSumatoriaCostoProductosCombo > $Precio_contado_combo[3]){
	 $diferencia = $totalSumatoriaCostoProductosCombo - $Precio_contado_combo[3];
 }else{
	 $diferencia = $Precio_contado_combo[3] - $totalSumatoriaCostoProductosCombo;
 }
 
 if($diferencia > 0){
	  $filas[]=crearRegistroProductoListado(
		"10818","4920","DESCUENTO","","",-$diferencia,0,1,$cod_local,"",0,"",
		"","","",array(
			"codigo_combo"=>"",
			"cantidad"=>1,
			"cantidad_formateada"=>"1",
			"precio_lista"=>(float)(-$diferencia),
			"detalle_precios"=>"",
			"es_descuento"=>true
		)
	  );
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' name='trListadoComboProductoVenta' style='' >
<td id='td_datos_13' style='display:none'>4920</td>
<td  style='width:5%; background-color: #efeded;color:red'>4920</td>
<td id='td_id' style='display:none'>10818</td>
<td  id='td_datos_1' style='width:20%'>DESCUENTO</td>
<td  id='' style='display:none'></td>
<td  id='td_datos_2' style='display:none'></td>
<td  id='td_datos_12' style='display:none'></td>
<td  id='td_datos_3' style='display:none'></td>
<td  id='td_datos_4' style='width:10%'>". number_format(-$diferencia,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>0</td>
<td  id='td_datos_6' style='width:5%'>1</td>
<td  id='td_datos_7' style='display:none'>".$cod_local."</td>
<td  id='td_datos_8' style='display:none'>0</td>
<td  id='td_datos_9' style='display:none'></td>
<td  id='td_datos_10' style='display:none'></td>
<td  id='td_datos_11' style='display:none'></td>
<td  id='td_datos_15' style='display:none'>1</td>
<td  id='td_datos_16' style='width:10%'>1</td>
<td  id='td_datos_17' style='display:none'></td>
</tr>
</table>";
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3" => $diferencia,"4" => $totalSumatoriaCostoProductosCombo,"5"=>$Precio_contado_combo[3]);
echo json_encode($informacion);	
exit;
}



function buscar_vista_productos_combo_catalogo($cod_comboFK,$local)
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
	 
		$sql= "SELECT iddetalle_combo_producto,
		(SELECT cod_producto FROM producto WHERE cod_producto = cod_productoFK) as cod_producto ,
		(SELECT Nombre FROM local where cod_local = (SELECT cod_localFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as nombre_local,
		(SELECT estado FROM producto WHERE cod_producto = cod_productoFK) as estado ,
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
			/*$promo = utf8_encode($valor['promo']); 
			 $tipo_producto = utf8_encode($valor['tipo_producto']); */
			  
		$paginaprecios=buscardetallesprecios($cod_producto, $precio_producto,$comision);	
			$filas[]=array(
				"codigo_combo"=>$cod_comboFK,
				"codigo_producto"=>$cod_producto,
				"codigo_barra"=>$cod_barra,
				"producto"=>$nombre_producto,
				"marca"=>$NombreMarca,
				"descripcion"=>$descripcion_producto,
				"categoria"=>$NombreCategoria,
				"unidad"=>$unidad_producto,
				"precio"=>(float)$precio_producto,
				"precio_formateado"=>number_format($precio_producto,'0',',','.'),
				"costo"=>(float)$precio_compra,
				"costo_formateado"=>number_format($precio_compra,'0',',','.'),
				"stock"=>(float)$stock_producto,
				"codigo_local"=>$cod_localFK,
				"comision"=>$comision,
				"estado"=>$estado,
				"local"=>$local,
				"cantidad"=>(float)$cantidad,
				"detalle_precios"=>$paginaprecios
			);
			  
		  	 $styleName=CargarStyleTable($styleName);
			 if(!$formatoJson){
			 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' name='trListadoComboProductoVenta' style='' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:20%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:40%'>".$nombre_producto."</td>
<td  id='' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_4' style='display:none'>". number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_6' style='width:20%'>".$stock_producto."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='td_datos_11' style='display:none'>".$paginaprecios."</td>
<td  id='td_datos_15' style='display:none'>".$stock_producto."</td>
<td  id='td_datos_16' style='width:20%'>".$cantidad."</td>
<td  id='td_datos_17' style='display:none'>".$cod_comboFK."</td>
</tr>
</table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}




function buscar_vista_productos_combo_solicitud($cod_comboFK,$local,$cantidadCuotaSolicitud,$ConDescuento)
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
	 
		$sql= "SELECT iddetalle_combo_producto,
		(SELECT cod_producto FROM producto WHERE cod_producto = cod_productoFK) as cod_producto ,
		(SELECT Nombre FROM local where cod_local = (SELECT cod_localFK FROM producto WHERE cod_producto = cod_productoFK) LIMIT 1) as nombre_local,
		(SELECT estado FROM producto WHERE cod_producto = cod_productoFK) as estado ,
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
			/*$promo = utf8_encode($valor['promo']); 
			 $tipo_producto = utf8_encode($valor['tipo_producto']); */
			   

/* $paginapreciosb=buscardetallespreciossolicitud($cod_producto,$cantidadCuotaSolicitud); */
$paginapreciototal = obtener_precio_producto($cod_comboFK,$cantidadCuotaSolicitud,$ConDescuento);



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

$filas[]=crearRegistroProductoListado(
	$cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
	$Precio_contado2,$precio_compra,$stock_producto,$cod_localFK,$local,$comision,$estado,
	$NombreCategoria,$NombreImpuesto,$NombreMarca,array(
		"codigo_combo"=>$cod_comboFK,
		"codigo_detalle"=>utf8_encode($valor['iddetalle_combo_producto']),
		"codigo_proveedor"=>$CodProveedor,
		"cantidad"=>(float)$cantidad,
		"cantidad_formateada"=>$cantidad,
		"precio_combo_total"=>(float)$paginapreciototal,
		"precio_combo_total_formateado"=>number_format((float)$paginapreciototal,'0',',','.'),
		"detalle_precios"=>$paginaprecios,
		"es_resumen_combo"=>false
	)
);

		  	 $styleName=CargarStyleTable($styleName);
			 $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' name='trListadoComboProductoVenta2' style='' >
<td id='' style='display:none'>".$cod_barra."</td>
<td  style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='' style='display:none'>".$cod_producto."</td>
<td  id='' style='width:30%'>".$nombre_producto."</td>
<td  id='' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$local."</td>
<td  id='' style='width:20%'>". number_format($Precio_contado2,'0',',','.')."</td>
<td  id='td_datos_6' style='width:20%'>".$stock_producto."</td>
<td  id='td_datos_16' style='width:20%'>".$cantidad."</td>
<td  id='' style='display:none'>".$paginapreciototal."</td>
</tr>
</table>";
			    	 
		  	
			  
			  
	  }
 }
 
 
  
$pagina2 = buscar_vista_detalle_productos_combo_solicitud($cod_comboFK,$cantidadCuotaSolicitud,$ConDescuento,$formatoJson);
if($formatoJson){
	$filas=array_merge($filas,$pagina2);
}else{
	$pagina .= $pagina2;
}
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina));
echo json_encode($informacion);	
exit;
}

function buscar_combos()
{
	$mysqli=conectar_al_servidor();
	$formatoJson=solicitarFormatoJsonProductos();
	$filas=array();
	 $pagina='';
	 
	 
		$sql= "SELECT idcombo_producto,fecha_insert,user_insert,
		(SELECT nombre_persona FROM persona WHERE cod_persona = user_insert) as usuario
		,estado FROM combo_producto WHERE estado ='ACTIVO'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 $totalPrecio = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idcombo_producto=utf8_encode($valor['idcombo_producto']);
			  $fecha_insert=utf8_encode($valor['fecha_insert']);
			  $user_insert=utf8_encode($valor['user_insert']);
			  $estado=utf8_encode($valor['estado']);
			  $usuario=utf8_encode($valor['usuario']);

			  $filas[]=array(
				"codigo"=>$idcombo_producto,
				"fecha"=>$fecha_insert,
				"codigo_usuario"=>$user_insert,
				"usuario"=>$usuario,
				"estado"=>$estado
			  );

			
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatoscombodetalle(this)'>
			  <td id='td_id' style='width:30%' >".$idcombo_producto."</td>
			  <td id='' style='width:35%' >".$fecha_insert."</td>
			  <td id='' style='width:35%' >".$usuario."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => ($formatoJson ? $filas : $pagina),"3"=>$totalresouesta);
echo json_encode($informacion);	
exit;
}

function obtener_costo_combo($cod_productoFK,$cod_comboFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$sql= "SELECT iddetalle_combo_producto,cod_productoFK,cod_comboFK,precio_descuento
		FROM detalle_combo_producto WHERE cod_comboFK ='$cod_comboFK' and cod_productoFK = '$cod_productoFK'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 $precio_descuento = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $iddetalle_combo_producto=utf8_encode($valor['iddetalle_combo_producto']);
			  $cod_productoFK=utf8_encode($valor['cod_productoFK']);
			  $cod_comboFK=utf8_encode($valor['cod_comboFK']);
			  $precio_descuento=utf8_encode($valor['precio_descuento']);
			  
	  }
 }
 
return $precio_descuento;
}
function obtener_precio_producto($cod_producto, $cuota,$ConDescuento)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$sql= "SELECT precio, descuento FROM detalle_listado_precio_producto WHERE cod_producto ='$cod_producto' and Cuota = '$cuota'";
   
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
 $precio_producto = 0;
 $descuento = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $precio_producto=utf8_encode($valor['precio']);
		      $descuento=utf8_encode($valor['descuento']);
			  
	  }
 }
 
 if($ConDescuento=='SI'){
	 return $cuota * $descuento;
 }
 
return $precio_producto;
}

function comprobarproductotipocombo($idproducto)
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	 
	 
	$sql= "SELECT tipo_producto FROM producto WHERE cod_producto = '$idproducto'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 $control = false;
 if ($valor>0)
 {
	 $control = true;
 }
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $control);
echo json_encode($informacion);	
exit;
}

function eliminar_combo($idcombo)
{

$mysqli=conectar_al_servidor(); 

$consulta1="UPDATE combo_producto SET estado = 'INACTIVO' WHERE idcombo_producto = '$idcombo'";


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




function buscar_vista_detalle_productos_combo_solicitud($cod_comboFK,$cantidadCuotaSolicitud,$ConDescuento,$formatoJson=false)
{
	$mysqli=conectar_al_servidor();
	$filas=array();
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
			   
 
$paginapreciototal = obtener_precio_producto($cod_comboFK,$cantidadCuotaSolicitud,$ConDescuento);

$filas[]=crearRegistroProductoListado(
	$cod_producto,$cod_barra,$nombre_producto,$descripcion_producto,$unidad_producto,
	$paginapreciototal,$precio_compra,0,$cod_localFK,"",$comision,$estado,
	$NombreCategoria,$NombreImpuesto,$NombreMarca,array(
		"codigo_combo"=>$cod_comboFK,
		"codigo_proveedor"=>$CodProveedor,
		"cantidad"=>1,
		"cantidad_formateada"=>"1",
		"precio_combo_total"=>(float)$paginapreciototal,
		"precio_combo_total_formateado"=>number_format((float)$paginapreciototal,'0',',','.'),
		"detalle_precios"=>"",
		"es_resumen_combo"=>true
	)
);


		  	 $styleName=CargarStyleTable($styleName);
			 $pagina.="
<table class='$styleName' style='display:none'  border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='' name='trListadoComboProductoVenta' style='' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:30%'>".$nombre_producto."</td>
<td  id='' style='display:none'>".$NombreMarca."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'></td>
<td  id='td_datos_11' style='width:20%'>". number_format($paginapreciototal,'0',',','.')."</td>
<td  id='td_datos_6' style='width:20%'></td>
<td  id='td_datos_16' style='width:20%'>1</td>
<td  id='td_datos_17' style='display:none'>".$paginapreciototal."</td>
</tr>
</table>";
			    	 
		  	
			  
			  
	  }
 }
 
 
 
mysqli_close($mysqli);
return $formatoJson ? $filas : $pagina;	
}

function obtener_cod_admin_locales($cod_admin_locales)
{
	$mysqli=conectar_al_servidor();

	 
	 
		$sql= "SELECT cod_localFK  FROM detalle_admin_local WHERE idadmin_localFK = '$cod_admin_locales'";
   
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
$datosArray = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $cod_localFK=utf8_encode($valor['cod_localFK']);
			    	 
		  	
			  array_push($datosArray, $cod_localFK);
			  
	  }
 }
 
mysqli_close($mysqli);

return $datosArray;
}


function buscarSelectAuditoriaProducto()
{
	
	
	$mysqli=conectar_al_servidor();
	
		$sql= "Select user_insert,(select nombre_persona from persona where cod_persona=user_insert) as usuario from stock_producto group by user_insert";
		 $paginaoptionusuario="";  

   
   
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
		  
		  
		      $usuario=$valor['usuario'];
		  	  $user_insert=utf8_encode($valor['user_insert']);
		  	 
		  	 
			    	
			  $paginaoptionusuario.="<option  value='$user_insert' >".$usuario."</option>";   
			  
	  }
 }
 
 
 $sql= "Select tipo from stock_producto group by tipo";
		 $paginaoptiontipo="";  

   
   
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
		  
		  
		      $tipo=$valor['tipo'];
		  	 
		  	 
			    	
			  $paginaoptiontipo.="<option  value='$tipo' >".$tipo."</option>";   
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $paginaoptionusuario,"3" => $paginaoptiontipo);
echo json_encode($informacion);	
exit;


}


function buscar_informe_stock_general($anho)
{

	$formatoJson = solicitarFormatoJsonProductos();
	$filas = array();
	$meses = array(1=>'enero',2=>'febrero',3=>'marzo',4=>'abril',5=>'mayo',6=>'junio',7=>'julio',8=>'agosto',9=>'septiembre',10=>'octubre',11=>'noviembre',12=>'diciembre');
	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	
	for($x = 1; $x <= 31; $x++){
		$registro = array("dia"=>$x);
		$styleName = CargarStyleTable($styleName);
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_monto_dia($anho,$i,$x);
			$registro[$meses[$i]] = (float)$total;
			$registro[$meses[$i]."_formateado"] = number_format((float)$total, '0', ',', '.');
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
		}
		$filas[] = $registro;
		
		$pagina.="</tr>
		</table>";
	}

	$informacion = array("1" => "exito", "2" => ($formatoJson ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}

function obtener_total_monto_dia($anho,$mes,$dia)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	
	$fechahoy=date('Y-m-d');
	 
	 if(strtotime($fecha) > strtotime($fechahoy)){
		 return 0;
	 }
	 
 
	$sql = "SELECT pr.precio_compra, SUM(IFNULL(sp.entero, 0)) AS stock_producto
	FROM producto pr INNER JOIN stocklocales stk ON stk.cod_productofk = pr.cod_producto
	LEFT JOIN stock_producto sp ON sp.cod_stocklocalesFK = stk.idstocklocales
	WHERE pr.estado = 'Activo' and (SELECT estado FROM local WHERE cod_local = stk.cod_localFK LIMIT 1) = 'Activo'
	AND sp.fecha_hora <= '$fecha 00:00:00' GROUP BY stk.idstocklocales";
 
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
			$precio_compra = $valor['precio_compra'];
			$stock_producto = $valor['stock_producto'];
			$subtotal = $precio_compra * $stock_producto;
			$total += $subtotal;
		}
	}
	
	return $total;
}

function buscar_informe_stock_general_grafica($anho)
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

			$total = obtener_total_monto_dia($anho,$i,$x);
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

			$total = obtener_total_monto_dia($anho2,$i,$x);
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


ObtenerDatos($operacion);

?>
