<?php
require("conexion.php");
include("classTable.php");
$operacion = $_POST['funt'];/*Función para capturar datos enviados desde la función de AJAX desde el javascript*/
$operacion = utf8_decode($operacion);

function ObtenerDatos($operacion)
{


 
 
 if($operacion=="buscarporpedido"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$control=$_POST["control"];
 	$control=utf8_decode($control);
	$categoria=$_POST["categoria"];
 	$categoria=utf8_decode($categoria);
	$marca=$_POST["marca"];
 	$marca=utf8_decode($marca);
	
	$promo=$_POST["promo"];
 	$promo=utf8_decode($promo);
	
 	BuscarRegistroEnPedidos($promo,$buscar,$local,$control,$categoria,$marca);
 }
 
   if($operacion=="buscar_vista_productos_combo_catalogo"){
	  
	$cod_comboFK=$_POST["cod_comboFK"];
 	$cod_comboFK=utf8_decode($cod_comboFK);
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	
 	buscar_vista_productos_combo_catalogo($cod_comboFK,$cod_localFK);
 }
 
 if($operacion=="buscarlista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
 	BuscarRegistroEnLista($buscar,$local);
 }

 if($operacion=="buscarpordevolucion"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	$idCliente=$_POST["idCliente"];
 	$idCliente=utf8_decode($idCliente);
 	BuscarRegistroEnDevoluciones($buscar,$idCliente,$local);
 }
 
 if($operacion=="buscarprecios"){
 
	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarprecios($buscar);
 }


if($operacion=="buscarOptionMarca")
{
buscarOptionMarca();

}

if($operacion=="buscarOptionCategoria")
{
buscarOptionCategoria();

}



 if($operacion=="buscarCatalogo"){
 	$buscar=$_POST["buscar"];
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


}

function  buscarprecios($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select precio,descripcion,cod_producto,comision,Porcentaje,preciocuota,
(select precio_producto from producto pr where pr.cod_producto=dp.cod_producto ) as precioContado , 
(select concat(nombre_producto,' ',descripcion_producto) from producto pr where pr.cod_producto=dp.cod_producto )  as Producto
 from  detalle_listado_precio_producto  dp
where cod_producto='$buscar' and dp.Cuota!=1 ";

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
$Producto = '';
$precioContado = 0;
$precioCredito = '';
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{   
$Producto = utf8_encode($valor['Producto']); 
$cod_producto = utf8_encode($valor['cod_producto']); 
$precio = utf8_encode($valor['precio']);                 
$comision = utf8_encode($valor['comision']);          
$Porcentaje = utf8_encode($valor['Porcentaje']);   
$preciocuota = utf8_encode($valor['preciocuota']);   
$descripcion = utf8_encode($valor['descripcion']);   

$precioCredito = buscardetallespreciosimprimir($cod_producto);       
$precioContado = buscardetallespreciosimprimirContado($cod_producto);       


	  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' >
<td  id='td_datos_1' style='display:none;'>".number_format($precio,'0',',','.') ."</td>
<td  id='td_datos_3' style='width:25%'>".number_format($preciocuota,'0',',','.')."</td>
<td  id='td_datos_2' style='width:25%'>".$descripcion."</td>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro ,"4" => $Producto ,"5" => number_format($precioContado,'0',',','.')  ,"6" => $precioCredito);
echo json_encode($informacion);	
exit;
}




function  buscardetallespreciosimprimirContado($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select (select porcentaje from producto p where p.cod_producto=dt.cod_producto) as porcentajeContado , preciocuota,Porcentaje as porcen,descripcion,cod_producto,comision,Cuota
 from  detalle_listado_precio_producto dt
where cod_producto=? and dt.Cuota=1  ";
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

 $styleName="tableRegistroSearch";
 
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
 
$preciocuota = utf8_encode($valor['preciocuota']);         


// $styleName=CargarStyleTable($styleName);
	  $pagina=$preciocuota;
}
}
 
return $pagina;
}






function  buscardetallespreciosimprimir($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select (select porcentaje from producto p where p.cod_producto=dt.cod_producto) as porcentajeContado , preciocuota,Porcentaje as porcen,descripcion,cod_producto,comision,Cuota
 from  detalle_listado_precio_producto dt
where cod_producto=? and dt.Cuota!=1  ";
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

 $styleName="tableRegistroSearch";
 
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  


$porcentajeContado = utf8_encode($valor['porcentajeContado']);  
$Porcentaje = utf8_encode($valor['porcen']);  
$preciocuota = utf8_encode($valor['preciocuota']);     
$descripcion = utf8_encode($valor['descripcion']);                    
$comision = utf8_encode($valor['comision']);          
$Cuota = utf8_encode($valor['Cuota']);          


// $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' style='height: 20px; font-size: 11px;padding: 0px;' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' >
<td   style='width:100%;padding: 0px;'>&nbsp;".$Cuota."&nbsp; X&nbsp; <b>&nbsp;&nbsp;<u> Gs.&nbsp;&nbsp;&nbsp; ".number_format($preciocuota,'0',',','.')." </u></b></td>
</tr>
</table>";
// $pagina="aa";
}
}
 
return $pagina;
}






/*Buscar Registro en vista*/
function BuscarRegistroEnPedidos($promo,$buscar,$local,$control,$categoria,$marca)
{
$mysqli=conectar_al_servidor();
$condicionLocal="";
if($local!=""){
	// $condicionLocal=" and stk.cod_localFK ='$local'";
}

$condicionControl = "";
if($control == 2){
	$condicionControl= " and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) <= 0";
}

if($control == 3){
	$condicionControl= " and IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) > 0";
}

$condicionMarca="";
if($marca!=""){
$condicionMarca=" and pr.cod_marcasFK='".$marca."' ";
}

$condicionCategria="";
if($categoria!=""){
$condicionCategria=" and pr.cod_categoriaFK='".$categoria."' ";
}


$condicionPromo="";
if($promo!=""){
$condicionPromo=" and pr.promo = '".$promo."' ";
}


$sql= "select pr.cod_producto,pr.nombre_producto,pr.precio_producto,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,pr.cod_barra,pr.url,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as localnombre,pr.promo,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
 where concat(pr.nombre_producto,' ',pr.cod_producto,' ',pr.descripcion_producto,' ',(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1),' ',cod_barra) like '%".$buscar."%' and pr.estado='Activo' ".$condicionPromo.$condicionLocal.$condicionControl.$condicionMarca.$condicionCategria."  group by pr.cod_producto asc limit 100 ";
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



$cod_producto = utf8_encode($valor['cod_producto']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$precio_producto = utf8_encode($valor['precio_producto']);  
$stock_producto = utf8_encode($valor['stock_producto']); 
$localnombre = utf8_encode($valor['localnombre']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$cod_barra = utf8_encode($valor['cod_barra']); 
$url = utf8_encode($valor['url']); 

$promo = utf8_encode($valor['promo']);
 $paginaSelecc=buscardetallesprecios($cod_producto,$precio_producto);


if($url == ""){
	$url = '/GoodVentaElectroCasaMaric/iconos/imagen.png';
}

$Titulo="";
$style="";
$letras="";
if($promo=='SI'){	
	$style="style='background-color:#475564;color: #ffffff;' ";
	$Titulo="<b style='color: #ffffff;'>!!PROMO¡¡</b>";
	$letras="color: #ffffff;background: #475564;";
}

  $pagina.="<br><div $style >$Titulo</div>
<table class='tableRegistroSearch'  $style border='0' cellspacing='0' cellpadding='0'>

<tr id='tbSelecRegistro' onclick='obtenerdatosProductospedidos(this)'>
<td  style='width:80%;'>

<table style='width:100%;$letras' class='tableRegistroSearchE' $style >
<tr>
<td style='width:100%;text-align:center;'>
<img src =".$url." style='width:80%;height:auto;border-radius:5px'/>
</td>
</tr>
<tr>
<td  style='width:85%;$letras'class='td_search' >".$nombre_producto."</td>
<td  style='width:15%;$letras'class='td_search' >". number_format($stock_producto,'0',',','.')."</td>
</tr>
</table>

<table style='width:100%;$letras' $style class='tableRegistroSearchF'  id='".$cod_producto."'>
<tr>
<td  style='width:100%;'class='td_search' >Marca: ".$NombreMarca."</td>
</tr>
</table>

<table style='width:100%;$letras' $style class='tableRegistroSearchF'  >
<tr>
<td  style='width:100%;'class='td_search' >Cod.: ".$cod_barra." .</td>
</tr>
</table>

<table style='width:100%;$letras' $style class='tableRegistroSearchF'  >
<tr>
<td  style='width:100%;'class='td_search' >Precio: ".number_format($precio_producto,'0',',','.')." Gs.</td>
</tr>
</table>



</td>
<td  id='td_datos_2' style='display:none' class='td_search'>". number_format($stock_producto,'0',',','.')."</td>
<td id='td_datos_1' style='display:none' class='td_search'>". number_format($precio_producto,'0',',','.')."</td>
<td id='' style='display:none' >".$localnombre."</td>
<td id='td_1' style='display:none' >".$cod_producto."</td>
<td id='td_2' style='display:none' >".$nombre_producto."</td>
<td id='td_3' style='display:none'>".$precio_producto."</td>
<td id='td_4' style='display:none'>".$paginaSelecc."</td>
<td id='td_5' style='display:none'>".$NombreMarca."</td>
</tr>
</table>";

}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

/*Buscar Registro en vista*/
function BuscarRegistroEnLista($buscar,$local)
{
$mysqli=conectar_al_servidor();
if($local!=""){
	$condicionLocal="and stk.cod_localFK='".$local."' ";
}
$sql= "select pr.cod_producto,pr.nombre_producto,pr.precio_producto,IFNULL((SELECT sum(entero) FROM stock_producto WHERE cod_stocklocalesFK = stk.idstocklocales),0) as stock_producto,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as localnombre
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where concat(pr.nombre_producto,' ',pr.descripcion_producto) like ? and pr.estado='Activo' ".$condicionLocal." limit 100 ";
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

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$cod_producto = utf8_encode($valor['cod_producto']);      
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$precio_producto = utf8_encode($valor['precio_producto']);  
$stock_producto = utf8_encode($valor['stock_producto']); 
$localnombre = utf8_encode($valor['localnombre']); 
 $paginaSelecc=buscardetallesprecios($cod_producto,$precio_producto);



  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' onclick='obtenerdatosProductoslista(this)'>
<td id='td_id' style='width:40%;' class='td_search'>".$nombre_producto."</td>
<td  id='td_datos_2' style='width:20%' class='td_search'>". number_format($stock_producto,'0',',','.')."</td>
<td id='td_datos_1' style='width:20%' class='td_search'>". number_format($precio_producto,'0',',','.')."</td>
<td id='' style='display:none' >".$localnombre."</td>
<td id='td_1' style='display:none' >".$cod_producto."</td>
<td id='td_2' style='display:none' >".$nombre_producto."</td>
<td id='td_3' style='display:none'>".$precio_producto."</td>
<td id='td_4' style='display:none'>".$paginaSelecc."</td>
</tr>
</table>";

}
}

$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}




function BuscarRegistroEnDevoluciones($buscar,$idCliente,$local)
{
$mysqli=conectar_al_servidor();

$sql= "select pr.cod_producto,pr.nombre_producto,dtv.cod_detalle,vt.cod_venta,dtv.precio_producto,vt.fecha_venta,
(select Nombre from local where cod_local= pr.cod_localFK limit 1 ) as localnombre
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
inner join venta vt on vt.cod_venta=dtv.cod_ventaFK 
 where concat(pr.nombre_producto,' ',pr.descripcion_producto) like ?  and  
 (select sum(pg.Monto) from pago pg inner join credito cr on pg.cod_creditoFK=cr.idcredito where vt.cod_venta=cr.cod_venta)<vt.total_venta 
and cod_clienteFK=? ".$condicionLocal;
$pagina = "";   
$buscar="%".$buscar."%";
$stmt = $mysqli->prepare($sql);
$s='ss';
$stmt->bind_param($s,$buscar,$idCliente);
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
$cod_detalle = utf8_encode($valor['cod_detalle']);          
$cod_venta = utf8_encode($valor['cod_venta']); 
$total_venta = utf8_encode($valor['precio_producto']); 
$fecha_venta = utf8_encode($valor['fecha_venta']); 

$pagina.="
<table class='tableBuscado' >
<tr onclick='obtenerdatosProductoDevoluciones(this)' >
<td style='width: 5%;'><img src='/GoodVentaElectroCasaMaric/iconos/productos.png' class='imgAbmBuscado' /></td>
<td style='width: 95%;text-align: left;'><p class='pTituloDatos'><b>Produc. : </b>".$nombre_producto."<br><b>Total : </b>". number_format($total_venta,'0',',','.') ."Gs. <br><b>Fecha Vent : </b>".$fecha_venta." Gs.</p></td>
<td id='td_1' style='display:none' >".$cod_producto."</td>
<td id='td_2' style='display:none' >".$nombre_producto."</td>
<td id='td_3' style='display:none'>".$cod_detalle."</td>
<td id='td_4' style='display:none'>".$cod_venta."</td>
</tr>
</table>
";


}
}

$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscardetallesprecios($buscar,$precio)
{
$mysqli=conectar_al_servidor();

$sql= "select precio,descripcion,cod_producto,iddetallesprecio
 from  detallesprecio where cod_producto='$buscar' ";
 
 
 $pagina="<option value='".number_format($precio,'0',',','.')."'  >Contado</option>";  
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



$precio = utf8_encode($valor['precio']);      
$descripcion = utf8_encode($valor['descripcion']);          
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          


	  $pagina.="<option value='".number_format($precio,'0',',','.')."'>".$descripcion."</option>";
 
}
}

return $pagina;
}


function buscarOptionMarca()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >TODOS</option>";  
		$sql= "Select cod_marcas,descripcion,Estado
        from marcas where Estado='Activo' order by descripcion asc ";
		
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
		      $cod_marcas=$valor['cod_marcas'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	 
			   $pagina.="<option value='$cod_marcas' >$descripcion</option>";
 
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}

function buscarOptionCategoria()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >TODOS</option>";  
		$sql= "Select cod_categoria,descripcion,Estado
        from categoria where Estado='Activo' order by descripcion asc ";
		   
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
		    
		      $cod_categoria=$valor['cod_categoria'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$cod_categoria' >$descripcion</option>";
  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}



function buscar_vista_productos_combo_catalogo($cod_comboFK,$cod_localFK)
{
	$mysqli=conectar_al_servidor();
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
			  
		  	 // $styleName=CargarStyleTable($styleName);
			 $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0' >
<tr id='tbSelecRegistro' onclick='' name='trListadoComboProductoVenta' style='' >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td  style='width:10%; background-color: #efeded;color:red'>".$cod_barra."</td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
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
 
mysqli_close($mysqli);
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}




function buscarCatalogo($promo,$buscar,$local,$control,$marca,$categoria)
{
$mysqli=conectar_al_servidor();
$condicionlocal="";
if($local!=""){
	$condicionlocal=" and stk.cod_localFK='$local'";
}
$Cod_localFK=$local;
$condicionControl = "";
if($control == 2){
	$condicionControl= " and (SELECT sum(entero) FROM stock_producto sp inner join  stocklocales sl on idstocklocales=cod_stocklocalesFK WHERE pr.cod_producto=sl.cod_productofk ) <= 0";
}

if($control == 3){
	$condicionControl= " and (SELECT sum(entero) FROM stock_producto sp inner join  stocklocales sl on idstocklocales=cod_stocklocalesFK WHERE pr.cod_producto=sl.cod_productofk ) > 0";
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
pr.precio_producto,pr.precio_compra,pr.stock_producto,stk.cod_localFK,pr.comision,pr.estado,pr.url,pr.cod_barra,
(select Nombre from local where cod_local= stk.cod_localFK limit 1 ) as local,pr.promo,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
ifnull((select punto from puntos p where pr.cod_producto= p.cod_productoFK limit 1 ),0) as puntos,
(SELECT sum(entero) FROM stock_producto sp inner join  stocklocales sl on idstocklocales=cod_stocklocalesFK WHERE pr.cod_producto=sl.cod_productofk ) as stock
from  producto pr inner join stocklocales stk on stk.cod_productofk=pr.cod_producto
where  concat(pr.nombre_producto,' ',pr.cod_producto,' ',pr.descripcion_producto) like '%".$buscar."%' and pr.estado='Activo' ".$condicionpromo.$condicionlocal.$condicionControl.$condicionMarca.$condicionCategria." limit 1000";
 

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

$Precio_contado=buscarListaDetallePrecioProductos($cod_producto,$Cod_localFK,3);






  
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

$pagina .= "<div class='d-flex justify-content-center align-items-center w-100 ' style='height: 500px; border: 8px solid #dddddd; background:#dddddd; border-radius: 5px;' id='" . $cod_producto . "' onclick='obtenerdatoscatalogo(this)'>
    <div class='ContenedorDetalleCatalogo position-relative d-flex flex-column w-100 h-100'>
        $pnt
        <div class='card_image_oferta' style='$styleImg'>
            <img src='$src' class='img-fluid' style=' transform: rotate(-30deg);height: auto; margin-top: 20px;'>
        </div>
        <div class='text-center flex-grow-1 d-flex   justify-content-center'>
            <img src='" . $url . "' class='img-fluid mt-3' style='max-height: 300px; max-width: 80%; height: auto; object-fit: contain;'>
        </div>

 
        <div class='mt-auto' id='miFooter' style='position: absolute; bottom: 0px;width: 100%;'>
            <div class='w-100 d-flex flex-column align-items-center' style='$styleCard;'>
                <h2 class='h5 fw-bold text-center'> $nombre_producto </h2>
                <p class='mb-1 text-center'><b>Stock: </b> $stock </p>
                <p class='mb-1 text-center'><b>Marca: </b> $NombreMarca </p>
                <p class='mb-1 text-center'><b>Cod. Barra: </b> $cod_barra </p>
                <h2 class='h4 mt-2 text-center'>".number_format($Precio_contado[3], '0', ',', '.')." Gs.</h2>
            </div>
        </div>

    </div>
</div>";
 

 



}
}


    
$informacion =array("1" => "exito","2" => $pagina,"3"=>$nroRegistro);
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


	  $pagina.="<option id='$Cuota' class='$Porcentaje'   name='$comision' value='".number_format($precio,'0',',','.')."'>".$descripcion." X ".number_format($preciocuota,'0',',','.')."</option>";
	$pagina2.="Cuota Nro: ".$Cuota." =<b>".number_format($precio,'0',',','.')."Gs</b><br>";
	$pagina3= $precio;

}
}

$Datos[0]= $Contador ;
$Datos[1]= $pagina ;
$Datos[2]= $pagina2 ;
$Datos[3]= $pagina3 ;
return $Datos ;

}






ObtenerDatos($operacion);

?>