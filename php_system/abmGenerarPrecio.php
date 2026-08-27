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

$sql= "select cod_detalle_listado_precio,cuota,descuento,porcentaje,dlp.descripcion
from detalle_listado_precio dlp  
 where cod_lista_precio_productoFK='".$idAbmCategoriaPrecio."' order by dlp.cuota asc";

 
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

BuscarCategoriaListaDetallePrecio($idAbmCategoriaPrecio,$cod_detalle_listado_precio,$cuota,$descuento,$porcentaje,$descripcion,$desde,$hasta,$tipo);
}
}
  mysqli_close($mysqli);
$informacion =array("1" => "exito");
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
