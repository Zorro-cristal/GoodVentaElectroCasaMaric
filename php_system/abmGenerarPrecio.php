<?php
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("classTable.php");

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
function solicitarFormatoJsonGenerarPrecio()
{
	return isset($_POST['formato']) && utf8_decode($_POST['formato'])=='json';
}

function fallarGenerarPrecio($mysqli,$stmt=null)
{
	$errno = $stmt ? $stmt->errno : $mysqli->errno;
	$error = $stmt ? $stmt->error : $mysqli->error;
	echo trigger_error('The query execution failed; MySQL said ('.$errno.') '.$error, E_USER_ERROR);
	exit;
}

function ejecutarGenerarPrecio($mysqli,$sql,$tipos='',$parametros=array())
{
	$stmt = $mysqli->prepare($sql);
	if (!$stmt) {
		fallarGenerarPrecio($mysqli);
	}
	if ($tipos != '') {
		$referencias = array($tipos);
		for ($i = 0; $i < count($parametros); $i++) {
			$referencias[] = &$parametros[$i];
		}
		if (!call_user_func_array(array($stmt,'bind_param'), $referencias)) {
			fallarGenerarPrecio($mysqli,$stmt);
		}
	}
	if (!$stmt->execute()) {
		fallarGenerarPrecio($mysqli,$stmt);
	}
	return $stmt;
}

function contadorGenerarPrecio($mysqli,$sql,$tipos='',$parametros=array())
{
	$stmt = ejecutarGenerarPrecio($mysqli,$sql,$tipos,$parametros);
	$result = $stmt->get_result();
	$fila = $result ? $result->fetch_assoc() : null;
	$total = $fila && isset($fila['total']) ? $fila['total'] : 0;
	$stmt->close();
	return $total;
}

function asegurarIndiceGenerarPrecio($mysqli,$tabla,$indice,$columnas)
{
	$sql = "SELECT COUNT(*) as total
	FROM information_schema.statistics
	WHERE table_schema = DATABASE()
	AND table_name = ?
	AND index_name = ?";
	$stmt = ejecutarGenerarPrecio($mysqli,$sql,'ss',array($tabla,$indice));
	$result = $stmt->get_result();
	$fila = $result ? $result->fetch_assoc() : null;
	$stmt->close();
	if ($fila && $fila['total'] > 0) {
		return;
	}
	$mysqli->query("ALTER TABLE ".$tabla." ADD INDEX ".$indice." (".$columnas.")");
}

function asegurarIndicesGenerarPrecio($mysqli)
{
	asegurarIndiceGenerarPrecio($mysqli,'detalle_listado_precio_producto','idx_dlpp_lista_producto_cuota','cod_lista_precio_productoFK,cod_producto,Cuota');
	asegurarIndiceGenerarPrecio($mysqli,'detalle_listado_precio_producto','idx_dlpp_producto_lista','cod_producto,cod_lista_precio_productoFK');
	asegurarIndiceGenerarPrecio($mysqli,'detalle_listado_precio','idx_dlp_lista_cuota','cod_lista_precio_productoFK,cuota');
	asegurarIndiceGenerarPrecio($mysqli,'categoria_lista_precio','idx_clp_lista_accion_categoria','cod_lista_precio_productoFK,accion,cod_categoriaFK');
	asegurarIndiceGenerarPrecio($mysqli,'producto','idx_producto_categoria_precio','cod_categoriaFK,estado,condicion_precio,precio_compra');
}

function sqlProductosGenerarPrecio()
{
	return "SELECT DISTINCT pr.cod_producto, pr.precio_compra
	FROM producto pr
	INNER JOIN categoria_lista_precio clp ON clp.cod_categoriaFK = pr.cod_categoriaFK
	WHERE clp.cod_lista_precio_productoFK = ?
	AND clp.accion = 'SI'
	AND pr.estado = 'Activo'
	AND pr.precio_compra != 0
	AND pr.condicion_precio = 'SI'
	AND pr.precio_compra BETWEEN ? AND ?";
}

function expresionesCalculoGenerarPrecio($tipo)
{
	if ($tipo == "PORCENTAJE") {
		$base = "(pr.precio_compra * (100 + IFNULL(dlp.porcentaje,0)) / 100)";
	} else {
		$base = "(pr.precio_compra + IFNULL(dlp.porcentaje,0))";
	}

	$preciocuota = "(CEIL(((".$base." / NULLIF(dlp.cuota,0)) / 1000)) * 1000)";
	$precioTotal = "(".$preciocuota." * dlp.cuota)";
	if ($tipo == "PORCENTAJE") {
		$conDescuento = "(".$precioTotal." - (".$precioTotal." * IFNULL(dlp.descuento,0) / 100))";
	} else {
		$conDescuento = "(".$precioTotal." - IFNULL(dlp.descuento,0))";
	}
	$cuotaConDescuento = "(CEIL(((".$conDescuento." / NULLIF(dlp.cuota,0)) / 1000)) * 1000)";

	return array(
		"precio_total" => $precioTotal,
		"precio_cuota" => $preciocuota,
		"cuota_descuento" => $cuotaConDescuento
	);
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



 if($operacion=="buscarListaDetallePrecioProductos"){
 	$cod_producto=$_POST["cod_producto"];
 	$cod_producto=utf8_decode($cod_producto);
	
	$cod_localFK=$_POST["cod_localFK"];
 	$cod_localFK=utf8_decode($cod_localFK);
	
 	buscarListaDetallePrecioProductos($cod_producto,$cod_localFK);
 }
 
 
 if($operacion=="ActualizarPrecioProductoDetalleCategoria")
{ 
	
	$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
	$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);
	
	$tipo=$_POST['tipo'];
	$tipo = utf8_decode($tipo);
	
	$desde=$_POST['desde'];
	$desde = quitarseparadormiles($desde);
	
	$hasta=$_POST['hasta'];
	$hasta = quitarseparadormiles($hasta);
	
	ActualizarPrecioProductoDetalleCategoria($idAbmCategoriaPrecio,$desde,$hasta,$tipo);

}	


}

 

function  ActualizarPrecioProductoDetalleCategoria($idAbmCategoriaPrecio,$desde,$hasta,$tipo)
{
	$mysqli=conectar_al_servidor();
	$idAbmCategoriaPrecio = intval($idAbmCategoriaPrecio);
	$desde = floatval($desde);
	$hasta = floatval($hasta);

	if ($idAbmCategoriaPrecio <= 0) {
		$informacion =array("1" => "camposvacio");
		echo json_encode($informacion);
		exit;
	}

	asegurarIndicesGenerarPrecio($mysqli);

	$sqlProductos = sqlProductosGenerarPrecio();
	$expresiones = expresionesCalculoGenerarPrecio($tipo);

	$totalDetalles = contadorGenerarPrecio(
		$mysqli,
		"SELECT COUNT(*) as total FROM detalle_listado_precio WHERE cod_lista_precio_productoFK = ? AND cuota > 0",
		'i',
		array($idAbmCategoriaPrecio)
	);
	$totalProductos = contadorGenerarPrecio(
		$mysqli,
		"SELECT COUNT(*) as total FROM (".$sqlProductos.") productos",
		'idd',
		array($idAbmCategoriaPrecio,$desde,$hasta)
	);

	if ($totalDetalles <= 0 || $totalProductos <= 0) {
		mysqli_close($mysqli);
		$informacion =array("1" => "exito","2" => 0,"3" => 0,"4" => $totalProductos,"5" => $totalDetalles);
		echo json_encode($informacion);
		exit;
	}

	$mysqli->autocommit(false);

	$sqlEliminarOtros = "DELETE dlpp
	FROM detalle_listado_precio_producto dlpp
	INNER JOIN (".$sqlProductos.") pr ON pr.cod_producto = dlpp.cod_producto
	WHERE dlpp.cod_lista_precio_productoFK != ?";
	$stmtEliminar = ejecutarGenerarPrecio($mysqli,$sqlEliminarOtros,'iddi',array($idAbmCategoriaPrecio,$desde,$hasta,$idAbmCategoriaPrecio));
	$totalEliminados = $stmtEliminar->affected_rows;
	$stmtEliminar->close();

	$sqlActualizar = "UPDATE detalle_listado_precio_producto dlpp
	INNER JOIN detalle_listado_precio dlp ON dlp.cod_lista_precio_productoFK = ? AND dlp.cuota = dlpp.Cuota
	INNER JOIN (".$sqlProductos.") pr ON pr.cod_producto = dlpp.cod_producto
	SET dlpp.precio = ".$expresiones['precio_total'].",
		dlpp.Porcentaje = dlp.porcentaje,
		dlpp.Cuota = dlp.cuota,
		dlpp.preciocuota = ".$expresiones['precio_cuota'].",
		dlpp.descuento = ".$expresiones['cuota_descuento'].",
		dlpp.descripcion = dlp.descripcion,
		dlpp.cod_detalle_listado_precioFK = dlp.cod_detalle_listado_precio,
		dlpp.cod_lista_precio_productoFK = dlp.cod_lista_precio_productoFK
	WHERE dlpp.cod_lista_precio_productoFK = ?
	AND dlp.cuota > 0";
	$stmtActualizar = ejecutarGenerarPrecio($mysqli,$sqlActualizar,'iiddi',array($idAbmCategoriaPrecio,$idAbmCategoriaPrecio,$desde,$hasta,$idAbmCategoriaPrecio));
	$totalActualizados = $stmtActualizar->affected_rows;
	$stmtActualizar->close();

	$sqlInsertar = "INSERT INTO detalle_listado_precio_producto
	(precio,Porcentaje,Cuota,preciocuota,cod_detalle_listado_precioFK,cod_producto,descripcion,comision,descuento,cod_lista_precio_productoFK)
	SELECT ".$expresiones['precio_total'].",
		dlp.porcentaje,
		dlp.cuota,
		".$expresiones['precio_cuota'].",
		dlp.cod_detalle_listado_precio,
		pr.cod_producto,
		dlp.descripcion,
		0,
		".$expresiones['cuota_descuento'].",
		dlp.cod_lista_precio_productoFK
	FROM detalle_listado_precio dlp
	INNER JOIN (".$sqlProductos.") pr
	LEFT JOIN detalle_listado_precio_producto existente ON existente.cod_producto = pr.cod_producto
		AND existente.Cuota = dlp.cuota
		AND existente.cod_lista_precio_productoFK = dlp.cod_lista_precio_productoFK
	WHERE dlp.cod_lista_precio_productoFK = ?
	AND dlp.cuota > 0
	AND existente.cod_detalle_listado_precio_producto IS NULL";
	$stmtInsertar = ejecutarGenerarPrecio($mysqli,$sqlInsertar,'iddi',array($idAbmCategoriaPrecio,$desde,$hasta,$idAbmCategoriaPrecio));
	$totalInsertados = $stmtInsertar->affected_rows;
	$stmtInsertar->close();

	$mysqli->commit();
	$mysqli->autocommit(true);
	mysqli_close($mysqli);

	$informacion =array(
		"1" => "exito",
		"2" => $totalInsertados,
		"3" => $totalActualizados,
		"4" => $totalProductos,
		"5" => $totalDetalles,
		"6" => $totalEliminados
	);
	echo json_encode($informacion);	
	exit;
}


function BuscarCategoriaListaDetallePrecio($idAbmCategoriaPrecio,$cod_detalle_listado_precio,$cuota,$descuento,$porcentaje,$descripcion,$desde,$hasta,$tipo)
{
$mysqli=conectar_al_servidor();

$sql= "SELECT * FROM categoria_lista_precio where accion='SI' and cod_lista_precio_productoFK='".$idAbmCategoriaPrecio."'";


 
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
$cod_categoriaFK = utf8_encode($valor['cod_categoriaFK']);    
  buscarProductoCategoria($idAbmCategoriaPrecio,$cod_categoriaFK,$cod_detalle_listado_precio,$cuota,$descuento,$porcentaje,$descripcion,$desde,$hasta,$tipo);
}
}
   mysqli_close($mysqli);
}



function buscarProductoCategoria($idAbmCategoriaPrecio,$cod_categoriaFK,$cod_detalle_listado_precio,$cuota,$descuento,$porcentaje,$descripcion,$desde,$hasta,$tipo)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select * from producto where  estado='Activo' and cod_categoriaFK = '".$cod_categoriaFK."' and precio_compra!='0' and   condicion_precio='SI' and precio_compra between '".$desde."' and '".$hasta."' ";
 
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
		  
		      $cod_producto=$valor['cod_producto'];
			  $precio_compra=$valor['precio_compra'];
		  	  		  	 
			  buscarDetallePrecio($idAbmCategoriaPrecio,$cod_detalle_listado_precio,$precio_compra,$cod_producto,$porcentaje, $cuota,$descuento, $descripcion,$tipo);

	  }
 }
 
  mysqli_close($mysqli);
 
}


function buscarDetallePrecio($idAbmCategoriaPrecio,$cod_detalle_listado_precio,$PrecioCompra,$cod_producto,$porcentaje, $cuota,$descuento,$descripcion,$tipo)
{
	 
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select cod_detalle_listado_precio_producto  from detalle_listado_precio_producto where  cod_producto = '".$cod_producto."'  and Cuota='".$cuota."' and cod_lista_precio_productoFK='".$idAbmCategoriaPrecio."' ";
 
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
			     
				 
				 EliminarPrecios($idAbmCategoriaPrecio,$cod_producto);
				 
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
				
			EliminarPrecios($idAbmCategoriaPrecio,$cod_producto);
			     
				$consulta="insert into detalle_listado_precio_producto( precio , Porcentaje, Cuota , preciocuota , cod_detalle_listado_precioFK , cod_producto , descripcion ,comision ,descuento,cod_lista_precio_productoFK) values('$precioTotal','$porcentaje','$cuota','$preciocuota','$cod_detalle_listado_precio','$cod_producto','$descripcion',0,'$cuotaConDescuento','$idAbmCategoriaPrecio')";	

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




function  buscarListaDetallePrecioProductos($cod_producto,$cod_localFK)
{
	 
 
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonGenerarPrecio();
$filas=array();

$fechahoy=date('Y-m-d');

$sql= "select  cod_detalle_listado_precio_producto ,precio,dlpp.descripcion,cod_producto,comision,dlpp.Porcentaje,preciocuota ,
dlpp.descuento,dlpp.Cuota , (select Nombre from local where cod_localFK=cod_local) as local , accion
from  detalle_listado_precio_producto dlpp
inner join detalle_listado_precio dlp on cod_detalle_listado_precio=cod_detalle_listado_precioFK
inner join lista_precio_producto lpp on cod_lista_precio_producto=dlp.cod_lista_precio_productoFK
inner join local_lista_precio llp on  llp.cod_lista_precio_productoFK=lpp.cod_lista_precio_producto
 where lpp.estado='Activo' and cod_producto='".$cod_producto."' and cod_localFK='".$cod_localFK."' and accion='SI' and fecha_hasta>='".$fechahoy."' group by cod_detalle_listado_precio_producto asc order by dlpp.Cuota asc";

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
 
$precio = utf8_encode($valor['precio']);     
$descripcion = utf8_encode($valor['descripcion']);                   
$comision = utf8_encode($valor['comision']);          
$Porcentaje = utf8_encode($valor['Porcentaje']);   
$preciocuota = utf8_encode($valor['preciocuota']);             
$descuento = utf8_encode($valor['descuento']);             
$codigo = utf8_encode($valor['cod_detalle_listado_precio_producto']);

$filas[]=array(
	"codigo"=>$codigo,
	"origen"=>"lista_precio",
	"descripcion"=>$descripcion,
	"precio_cuota"=>floatval($preciocuota),
	"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.'),
	"precio"=>floatval($precio),
	"precio_formateado"=>number_format($precio,'0',',','.'),
	"descuento"=>floatval($descuento),
	"descuento_formateado"=>number_format($descuento,'0',',','.')
);

	if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='td_datos_2' style='width:50%'>".$descripcion."</td>
<td  id='td_datos_8' style='width:25%'>".number_format($preciocuota,'0',',','.') ."</td>
<td  id='td_datos_7' style='display:none'>".number_format($precio,'0',',','.') ."</td>
<td  id='td_datos_7' style='width:25%'>".number_format($descuento,'0',',','.') ."</td>
</tr>
</table>";
	}


}
}else{
	
		
$sql= "select precio,descripcion,cod_producto,iddetallesprecio,comision,Porcentaje , preciocuota from  detallesprecio where cod_producto='".$cod_producto."' order by Cuota asc";


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
  
$descripcion = utf8_encode($valor['descripcion']);  

$preciocuota = utf8_encode($valor['preciocuota']);             

$filas[]=array(
	"codigo"=>utf8_encode($valor['iddetallesprecio']),
	"origen"=>"detalle_precio",
	"descripcion"=>$descripcion,
	"precio_cuota"=>floatval($preciocuota),
	"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.'),
	"precio"=>floatval($valor['precio']),
	"precio_formateado"=>number_format($valor['precio'],'0',',','.'),
	"descuento"=>floatval($preciocuota),
	"descuento_formateado"=>number_format($preciocuota,'0',',','.')
);

	if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr   >
<td   style='width:50%'>".$descripcion."</td>
<td   style='width:25%'>".number_format($preciocuota,'0',',','.') ."</td> 
<td   style='width:25%'>".number_format($preciocuota,'0',',','.') ."</td> 
</tr>
</table>";
	}


}
}

$informacion =array("1" => "exito","2" => $formatoJson ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
	
	
}

$informacion =array("1" => "exito","2" => $formatoJson ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}







ObtenerDatos($operacion);

?>
