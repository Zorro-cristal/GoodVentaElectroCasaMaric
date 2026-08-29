<?php
include('quitarseparadormiles.php');

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include("buscar_nivel.php");
require("conexion.php");
include("verificar_navegador.php");
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

 
	
if($operacion=="nuevo"  || $operacion=='quitar')
{
	
	
$cantidad_detalle_compra=$_POST['cantidad_detalle_compra'];
$cantidad_detalle_compra = quitarseparadormiles($cantidad_detalle_compra);
$precio_producto=$_POST['precio_producto'];
$precio_producto = quitarseparadormiles($precio_producto);
$subTotal=$_POST['subTotal'];
$subTotal = quitarseparadormiles($subTotal);
$cod_productoFK=$_POST['cod_productoFK'];
$cod_productoFK = utf8_decode($cod_productoFK);
$cod_compraFK=$_POST['cod_compraFK'];
$cod_compraFK = utf8_decode($cod_compraFK);
$cod_detalle_compra=$_POST['cod_detalle_compra'];
$cod_detalle_compra = utf8_decode($cod_detalle_compra);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);

$editPrecioLista=$_POST['editPrecioLista'];
$editPrecioLista = utf8_decode($editPrecioLista);

$precioLista=$_POST['precioLista'];
$precioLista = quitarseparadormiles($precioLista);

$tipocompra=isset($_POST['tipocompra']) ? utf8_decode($_POST['tipocompra']) : "";
$timbrado=isset($_POST['timbrado']) ? utf8_decode($_POST['timbrado']) : "";
$tipofactura=isset($_POST['tipofactura']) ? utf8_decode($_POST['tipofactura']) : "";
$fecha_compra=isset($_POST['fecha_compra']) ? utf8_decode($_POST['fecha_compra']) : "";
$cod_proveedorFK=isset($_POST['cod_proveedorFK']) ? utf8_decode($_POST['cod_proveedorFK']) : "";
$num_comprobante=isset($_POST['num_comprobante']) ? utf8_decode($_POST['num_comprobante']) : "";
$descuento=isset($_POST['descuento']) ? quitarseparadormiles($_POST['descuento']) : 0;

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}

if($cod_compraFK==""){
	
	$tipocompra=$_POST['tipocompra'];
$tipocompra = utf8_decode($tipocompra);

$timbrado=$_POST['timbrado'];
$timbrado = utf8_decode($timbrado);

$tipofactura=$_POST['tipofactura'];
$tipofactura = utf8_decode($tipofactura);

$fecha_compra=$_POST['fecha_compra'];
$fecha_compra = utf8_decode($fecha_compra);
$cod_proveedorFK=$_POST['cod_proveedorFK'];
$cod_proveedorFK = utf8_decode($cod_proveedorFK);
$num_comprobante=$_POST['num_comprobante'];
$num_comprobante = utf8_decode($num_comprobante);

$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);
$pagado1=$_POST['pagado1'];
$pagado1 = quitarseparadormiles($pagado1);
$pagado2=$_POST['pagado2'];
$pagado2 = quitarseparadormiles($pagado2);
 
$cod_compraFK=insertarDatosCompras($tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$pagado1,$pagado2);

}
	 abm($editPrecioLista,$precioLista,$cantidad_detalle_compra,$precio_producto,$subTotal,$cod_productoFK,$cod_compraFK,$cod_detalle_compra,$cod_local,$operacion ,$tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$descuento);

}





	
if($operacion=="EditarCompra")
{

$cod_compraFK=$_POST['cod_compraFK'];
$cod_compraFK = utf8_decode($cod_compraFK);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}

$tipocompra=$_POST['tipocompra'];
$tipocompra = utf8_decode($tipocompra);

$timbrado=$_POST['timbrado'];
$timbrado = utf8_decode($timbrado);

$tipofactura=$_POST['tipofactura'];
$tipofactura = utf8_decode($tipofactura);

$fecha_compra=$_POST['fecha_compra'];
$fecha_compra = utf8_decode($fecha_compra);
$cod_proveedorFK=$_POST['cod_proveedorFK'];
$cod_proveedorFK = utf8_decode($cod_proveedorFK);
$num_comprobante=$_POST['num_comprobante'];
$num_comprobante = utf8_decode($num_comprobante);

$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);
 
EditarDatosComprasbtn($cod_compraFK,$tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento);
 
}







if($operacion=="buscar")
{
	$buscar=$_POST['buscar'];
	$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscar($buscar,$formato);

}	

if($operacion=="detalleenhistorial")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	detalleenhistorial($buscar,$formato);

}	

if($operacion=="buscarproductocomprados")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$marca=$_POST['marca'];
$marca = utf8_decode($marca);
	$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$categoria=$_POST['categoria'];
$categoria = utf8_decode($categoria);
$codigo=$_POST['codigo'];
$codigo = utf8_decode($codigo);
$producto=$_POST['producto'];
$producto = utf8_decode($producto);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
	buscarproductocomprados($marca,$fecha1,$fecha2,$cod_local,$categoria,$codigo,$producto,$formato);
}	
if($operacion=="buscarmasproductocomprados")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$marca=$_POST['marca'];
$marca = utf8_decode($marca);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$categoria=$_POST['categoria'];
$categoria = utf8_decode($categoria);
$codigo=$_POST['codigo'];
$codigo = utf8_decode($codigo);
$producto=$_POST['producto'];
$producto = utf8_decode($producto);
$registrocargado=$_POST['registrocargado'];
$registrocargado = utf8_decode($registrocargado);
$totalcompra=$_POST['totalcompra'];
$totalcompra = quitarseparadormiles($totalcompra);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}

	buscarmasproductocomprados($marca,$fecha1,$fecha2,$cod_local,$categoria,$codigo,$producto,$registrocargado,$totalcompra,$formato);

}	



}


function insertarDatosCompras($tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$pagado1,$pagado2)
{
	
	
$mysqli=conectar_al_servidor(); 


/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d h:i:s', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);

$consulta1="Insert into compra (fecha_compra,cod_proveedorFK,num_comprobante,cod_local,descuento,pagado1,pagado2,cod_user_insert,fecha_insert,estado,tipo_compra,timbrado,tipoFactura)
values(?,?,?,?,?,?,?,?,?,'Activo',?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssssss';
$stmt1->bind_param($ss,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$pagado1,$pagado2,$user,$fecha_inser_edit,$tipocompra,$timbrado,$tipofactura);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

	$cod_compra=obtenerIdCompra($cod_proveedorFK,$num_comprobante,$cod_local);

	return $cod_compra;
	
}


function obtenerIdCompra($cod_proveedorFK,$num_comprobante,$cod_local)
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
 
 
return $cod_compra;


}



function  abm($editPrecioLista,$precioLista,$cantidad_detalle_compra,$precio_producto,$subTotal,$cod_productoFK,$cod_compraFK,$cod_detalle_compra,$cod_local,$operacion ,$tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$descuento)
{
	
	if($cod_productoFK=="" || $cod_compraFK==""){
	 $informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();
$subTotal=$cantidad_detalle_compra*$precio_producto;
	  
	
	if($operacion=="nuevo")
	{
		

	$consulta="Insert into detalle_compra (cantidad_detalle_compra,cod_productoFK,precio_producto,cod_compraFK,subTotal,precio_compra,cantidadCompra) values(?,?,?,?,?,?,?)";	

	$stmt = $mysqli->prepare($consulta);


$ss='sssssss';

$stmt->bind_param($ss,$cantidad_detalle_compra,$cod_productoFK,$precio_producto,$cod_compraFK,$subTotal,$precioLista,$cantidad_detalle_compra); 

	}
	
	if($operacion=="quitar")
	{
	$consulta="delete  from detalle_compra  where cod_detalle_compra=$cod_detalle_compra";	
	

	$stmt = $mysqli->prepare($consulta);

	}
	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$total_compra=0;
if($operacion=="nuevo"){
// editar_cantidad($cod_productoFK,$cantidad_detalle_compra,"suma",$cod_local);
SumarRestarStockA($cantidad_detalle_compra,$cod_productoFK,$cod_local,"SUMA","COMPRA");
if($editPrecioLista=="si"){
	editar_costos($cod_productoFK,$precioLista);
	$Cod_categoriaFK=obtenercod_categoriaFK($cod_productoFK);
	BuscarListaCategoriaPrecioProductoDetalleCategoria($cod_productoFK,$Cod_categoriaFK,$precio_producto);
	
}
  // EditarDatosCompras($cod_compraFK,$tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento);
}
if($operacion=="quitar"){
// editar_cantidad($cod_productoFK,$cantidad_detalle_compra,"resta",$cod_local);
SumarRestarStockA($cantidad_detalle_compra,$cod_productoFK,$cod_local,"RESTA","DETALLE COMPRA ELIMINADO");
}
 
 $informacion =array("1" => "exito","2" => $cod_compraFK);
echo json_encode($informacion);	
exit;

}





function EditarDatosCompras($cod_compra,$tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento)
{
	
	
$mysqli=conectar_al_servidor(); 


/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);

$consulta1=" update compra set fecha_compra=?,cod_proveedorFK=?,num_comprobante=?,cod_local=?,descuento=?,tipo_compra=?,timbrado=?,tipoFactura=? where cod_compra='".$cod_compra."' ";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$tipocompra,$timbrado,$tipofactura);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}
	
}



function EditarDatosComprasbtn($cod_compra,$tipocompra,$timbrado,$tipofactura,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento)
{
	
	
$mysqli=conectar_al_servidor(); 


/*AUDITORIA*/
date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
$user=$_POST['useru'];
$user = utf8_decode($user);

$consulta1=" update compra set fecha_compra=?,cod_proveedorFK=?,num_comprobante=?,cod_local=?,descuento=?,tipo_compra=?,timbrado=?,tipoFactura=? where cod_compra='".$cod_compra."' ";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$fecha_compra,$cod_proveedorFK,$num_comprobante,$cod_local,$descuento,$tipocompra,$timbrado,$tipofactura);
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

 
 $informacion =array("1" => "exito");
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



/* function editar_cantidad($idproductos,$cantidad,$t,$cod_localfk){
       $mysqli=conectar_al_servidor(); 
 
 $user=$_POST['useru'];
    $user = utf8_decode($user);
 
 
	    if($t=="resta"){
			$consulta="Update stocklocales set cantidad=(cantidad-$cantidad),user_update='$user'  where cod_productofk='".$idproductos."' and cod_localfk='".$cod_localfk."'";
		
				

	}else{
		 $consulta="Update stocklocales set cantidad=(cantidad+$cantidad),user_update='$user'  where cod_productofk='".$idproductos."' and cod_localfk='".$cod_localfk."'";
          
			

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
	
	
function obtenercod_categoriaFK($codProducto)
{
	$mysqli=conectar_al_servidor();
	 $cod_categoriaFK='';
		$sql= "Select cod_categoriaFK from producto where cod_producto='$codProducto' ";
 
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
 
		      $cod_categoriaFK=$valor['cod_categoriaFK'];
   
	  }
 }
 
 
  return $cod_categoriaFK;

}

	
function editar_costos($idproductos,$costo){
       $mysqli=conectar_al_servidor(); 

			$consulta="Update producto set precio_compra='$costo'  where cod_producto='".$idproductos."'";	
 
	$stmt = $mysqli->prepare($consulta);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


    }



function buscar($buscar,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "Select dc.cod_detalle_compra,dc.cantidad_detalle_compra,dc.precio_producto,dc.subTotal,dc.cod_productoFK,pro.nombre_producto,dc.cod_compraFK,
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
				  "cod_detalle_compra"=>$cod_detalle_compra,
				  "cod_producto"=>$cod_productoFK,
				  "nombre_producto"=>$nombre_producto,
				  "precio_producto"=>(float)$precio_producto,
				  "precio_producto_formateado"=>number_format($precio_producto,'0',',','.'),
				  "cantidad"=>(float)$cantidad_detalle_compra,
				  "cantidad_formateada"=>number_format($cantidad_detalle_compra,'2',',','.'),
				  "subtotal"=>(float)$subTotal,
				  "subtotal_formateado"=>number_format($subTotal,'0',',','.'),
				  "cod_compra"=>$cod_compraFK,
				  "descuento"=>(float)$descuento
			  );
			  if($formato!='json'){
			   $styleName=CargarStyleTable($styleName); 	 
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmdetallecompra(this)'>
<td  id='td_datos_1' style='width:10%'>".$nombre_producto."</td>
<td  id='td_datos_2'  style='width:10%'>".number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_3'  style='width:10%'>".number_format($cantidad_detalle_compra,'2',',','.')."</td>
<td  id='td_datos_4' style='width:10%'>".number_format($subTotal,'0',',','.')."</td>
<td  id='td_id_1' style='display:none'>".$cod_productoFK."</td>
<td  id='td_id_2' style='display:none'>".$cod_detalle_compra."</td>
</tr>
</table>";
			  }
			  
			  
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

function detalleenhistorial($buscar,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "Select dc.cod_detalle_compra,dc.cantidad_detalle_compra,dc.precio_producto,dc.subTotal,dc.cod_productoFK,pro.nombre_producto,dc.cod_compraFK,
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
				  "cod_detalle_compra"=>$cod_detalle_compra,
				  "cod_producto"=>$cod_productoFK,
				  "nombre_producto"=>$nombre_producto,
				  "precio_producto"=>(float)$precio_producto,
				  "precio_producto_formateado"=>number_format($precio_producto,'0',',','.'),
				  "cantidad"=>(float)$cantidad_detalle_compra,
				  "cantidad_formateada"=>number_format($cantidad_detalle_compra,'2',',','.'),
				  "subtotal"=>(float)$subTotal,
				  "subtotal_formateado"=>number_format($subTotal,'0',',','.'),
				  "cod_compra"=>$cod_compraFK,
				  "descuento"=>(float)$descuento
			  );
			  if($formato!='json'){
			  $styleName=CargarStyleTable($styleName);  	 
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='td_datos_1' style='width:10%'>".$cod_productoFK."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre_producto."</td>
<td  id='td_datos_2'  style='width:10%'>".number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_3'  style='width:10%'>".number_format($cantidad_detalle_compra,'2',',','.')."</td>
<td  id='td_datos_4' style='width:10%'>".number_format($subTotal,'0',',','.')."</td>
</tr>
</table>";
			  }
			  
			  
	  }
 }
 
 
 
  $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina);
echo json_encode($informacion);	
exit;

}

	
function buscarproductocomprados($marca,$fecha1,$fecha2,$cod_local,$categoria,$codigo,$producto,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	  $condicionCodLocal=" and cpr.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		  $condicionCategoria=" and pro.cod_categoriaFK='$categoria' ";
		 if($categoria==""){
			$condicionCategoria=""; 
		 }
		 $condicionMarca=" and pro.cod_marcasFK='$marca' ";
		 if($marca==""){
			$condicionMarca=""; 
		 }
		 $condicionCodigo=" and pro.cod_barra='$codigo' ";
		 if($codigo==""){
			$condicionCodigo=""; 
		 }
		 $condicionproducto=" and concat(pro.nombre_producto,' ',pro.cod_producto) like '%".$producto."%' ";
		 if($producto==""){
			$condicionproducto=""; 
		 }
		 $condicionfecha=" and fecha_compra>='".$fecha1."' and fecha_compra<='".$fecha2."' ";
		 if($fecha1=="" && $fecha2=="" ){
			$condicionfecha=""; 
		 }
		$sql= "Select sum(dc.cantidad_detalle_compra) as totalCantidad,pro.cod_barra
		,IFNULL(sum(dc.subTotal),0) as totalCompra ,fecha_compra
		,dc.cod_productoFK,pro.nombre_producto,dc.precio_producto , (select nombre_persona from persona where cod_persona=cpr.cod_proveedorFK) as proveedor
		,(select descripcion from marcas where cod_marcas= pro.cod_marcasFK limit 1 ) as NombreMarca
	   ,(select descripcion from categoria where cod_categoria= pro.cod_categoriaFK limit 1 ) as NombreCategoria
		,(Select Nombre from local l where l.cod_local=cpr.cod_local) as nombrelocal
		from detalle_compra dc 
		inner join producto pro on pro.cod_producto=dc.cod_productoFK inner 
		join compra cpr on cpr.cod_compra=dc.cod_compraFK
		where pro.cod_barra!='0' and cpr.estado='Activo'
		 ".$condicionCodLocal.$condicionCategoria.$condicionMarca.$condicionCodigo.$condicionproducto.$condicionfecha." group by pro.cod_producto , dc.precio_producto
		 order by totalCantidad desc";
		
		$total_compra=0;
		$nroRegistro=0;  
   
   $stmt = $mysqli->prepare($sql); 

if ( ! $stmt->execute()) {
   echo "Error";
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
		      $precio_producto=$valor['precio_producto'];
		      $proveedor=utf8_encode($valor['proveedor']);
		      $totalCantidad=$valor['totalCantidad'];
		      $totalCompra=$valor['totalCompra'];
		  	  $nombre_producto=utf8_encode($valor['nombre_producto']);
		  	  $cod_producto=utf8_encode($valor['cod_barra']);
		  	  $NombreMarca=utf8_encode($valor['NombreMarca']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	  $NombreCategoria=utf8_encode($valor['NombreCategoria']);
		  	  $fecha_compra=utf8_encode($valor['fecha_compra']);
		  	
		  	
		  	 $total_compra=$totalCompra+$total_compra;
			  $filas[]=array(
				  "fecha_compra"=>$fecha_compra,
				  "codigo"=>$cod_producto,
				  "nombre_producto"=>$nombre_producto,
				  "marca"=>$NombreMarca,
				  "categoria"=>$NombreCategoria,
				  "cantidad"=>(float)$totalCantidad,
				  "cantidad_formateada"=>number_format($totalCantidad,'0',',','.'),
				  "precio"=>(float)$precio_producto,
				  "precio_formateado"=>number_format($precio_producto,'0',',','.'),
				  "total"=>(float)$totalCompra,
				  "total_formateado"=>number_format($totalCompra,'0',',','.'),
				  "proveedor"=>$proveedor,
				  "local"=>$nombrelocal
			  );
			  if($formato!='json'){
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td style='width:10%'>".$fecha_compra."</td>
<td style='width:10%'>".$cod_producto."</td>
<td style='width:20%'>".$nombre_producto."</td>
<td style='width:7%'>".$NombreMarca."</td>
<td style='width:10%'>".$NombreCategoria."</td>
<td style='width:7%'>".number_format($totalCantidad,'0',',','.')."</td>
<td style='width:7%'>".number_format($precio_producto,'0',',','.')."</td>
<td style='width:9%'>".number_format($totalCompra,'0',',','.')."</td>
<td style='width:10%'>".$proveedor."</td>
<td style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";
			  }
			  
			  
	  }
 }
 
 
/*  $sql= "Select pro.cod_barra
 from detalle_compra dc inner join producto pro on pro.cod_producto=dc.cod_productoFK inner join compra cpr on cpr.cod_compra=dc.cod_compraFK 
		where cpr.estado='Activo' and pro.cod_barra!='0'
		 ".$condicionCodLocal.$condicionCategoria.$condicionMarca.$condicionCodigo.$condicionproducto.$condicionfecha." group by pro.cod_producto ";   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalregistros=$valor; */
 
  $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($total_compra,'0',',','.'),"4" => number_format($nroRegistro,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;


}
	
function buscarmasproductocomprados($marca,$fecha1,$fecha2,$cod_local,$categoria,$codigo,$producto,$registrocargado,$totalcompra,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	  $condicionCodLocal=" and cpr.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		  $condicionCategoria=" and pro.cod_categoriaFK='$categoria' ";
		 if($categoria==""){
			$condicionCategoria=""; 
		 }
		 $condicionMarca=" and pro.cod_marcasFK='$marca' ";
		 if($marca==""){
			$condicionMarca=""; 
		 }
		 $condicionCodigo=" and pro.cod_barra='$codigo' ";
		 if($codigo==""){
			$condicionCodigo=""; 
		 }
		 $condicionproducto=" and concat(pro.nombre_producto,' ',pro.cod_producto) like '%".$producto."%' ";
		 if($producto==""){
			$condicionproducto=""; 
		 }
		 $condicionfecha=" and fecha_compra>='".$fecha1."' and fecha_compra<='".$fecha2."' ";
		 if($fecha1=="" && $fecha2=="" ){
			$condicionfecha=""; 
		 }
		$sql= "Select sum(dc.cantidad_detalle_compra) as totalCantidad,pro.cod_barra
		,IFNULL(sum(dc.subTotal),0) as totalCompra,fecha_compra,dc.precio_producto
		,dc.cod_productoFK,pro.nombre_producto,(select nombre_persona from persona where cod_persona=cpr.cod_proveedorFK) as proveedor
		,(select descripcion from marcas where cod_marcas= pro.cod_marcasFK limit 1 ) as NombreMarca
	   ,(select descripcion from categoria where cod_categoria= pro.cod_categoriaFK limit 1 ) as NombreCategoria
		,(Select Nombre from local l where l.cod_local=cpr.cod_local) as nombrelocal
		from detalle_compra dc inner join producto pro on pro.cod_producto=dc.cod_productoFK inner join compra cpr on cpr.cod_compra=dc.cod_compraFK
		where pro.cod_barra!='0'  and cpr.estado='Activo'
		 ".$condicionCodLocal.$condicionCategoria.$condicionMarca.$condicionCodigo.$condicionproducto.$condicionfecha." group by pro.cod_producto
		 order by totalCantidad desc limit ".$registrocargado." , 150 ";
		 
		$total_compra=$totalcompra;
		$nroRegistro=0;
   

   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
   echo "Error";
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
		  
		  
		      $totalCantidad=$valor['totalCantidad'];
		      $totalCompra=$valor['totalCompra'];
		      $precio_producto=$valor['precio_producto'];
		      $proveedor=utf8_encode($valor['proveedor']);
		  	  $nombre_producto=utf8_encode($valor['nombre_producto']);
		  	  $cod_producto=utf8_encode($valor['cod_barra']);
		  	  $NombreMarca=utf8_encode($valor['NombreMarca']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	  $NombreCategoria=utf8_encode($valor['NombreCategoria']);
		  	  $fecha_compra=utf8_encode($valor['fecha_compra']);
		  	
		  	
		  	 $total_compra+=$totalCompra;
			  $filas[]=array(
				  "fecha_compra"=>$fecha_compra,
				  "codigo"=>$cod_producto,
				  "nombre_producto"=>$nombre_producto,
				  "marca"=>$NombreMarca,
				  "categoria"=>$NombreCategoria,
				  "cantidad"=>(float)$totalCantidad,
				  "cantidad_formateada"=>number_format($totalCantidad,'2',',','.'),
				  "precio"=>(float)$precio_producto,
				  "precio_formateado"=>number_format($precio_producto,'0',',','.'),
				  "total"=>(float)$totalCompra,
				  "total_formateado"=>number_format($totalCompra,'0',',','.'),
				  "proveedor"=>$proveedor,
				  "local"=>$nombrelocal
			  );
			  if($formato!='json'){
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='' style='width:10%'>".$cod_producto."</td>
<td  id='' style='width:20%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id='' style='width:10%'>".$NombreCategoria."</td>
<td  id=''  style='width:10%'>".number_format($totalCantidad,'2',',','.')."</td>
<td  id=''  style='width:10%'>".number_format($totalCompra,'0',',','.')."</td>
<td  id='' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";
			  }
			  
			  
	  }
 }
 
  $informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => number_format($total_compra,'0',',','.'),
  "4" => number_format($nroRegistro,'0',',','.'),"99"=>$nroRegistro);
echo json_encode($informacion);	
exit;


}


verificar($operacion);
?>
