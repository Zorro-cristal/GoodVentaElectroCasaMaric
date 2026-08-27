<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
function verificar($funt)
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


	
if($funt=="nuevo" || $funt=="editar")
{
	
	
	$idlistapreciocategoria=$_POST['idabm'];
    $idlistapreciocategoria = utf8_decode($idlistapreciocategoria);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$cuota=$_POST['cuota'];
    $cuota = utf8_decode($cuota);
	$porcentaje=$_POST['porcentaje'];
    $porcentaje = utf8_decode($porcentaje);
	$descuento=$_POST['descuento'];
    $descuento = utf8_decode($descuento);
	$estado=$_POST['estado'];
    $estado = utf8_decode($estado);
	$cod_categoriaFK=$_POST['cod_categoriaFK'];
    $cod_categoriaFK = utf8_decode($cod_categoriaFK);

    
    
	abm($idlistapreciocategoria,$descripcion,$cuota,$porcentaje,$descuento,$estado,$cod_categoriaFK,$funt);

}

if($funt=="buscar")
{
	$buscar=$_POST['buscar'];
	$buscar = utf8_decode($buscar);
	$cod_categoriaFK=$_POST['cod_categoriaFK'];
	$cod_categoriaFK = utf8_decode($cod_categoriaFK);
	buscar($buscar,$cod_categoriaFK);

}	



if($funt=="ActualizarPrecioProducto")
{
	
	cargar_indicador('precio_cat');
	
	$cod_categoriaFK=$_POST['cod_categoriaFK'];
	$cod_categoriaFK = utf8_decode($cod_categoriaFK);
	buscarProductoCategoria($cod_categoriaFK);

}	





if($funt=="buscarOption")
{

	buscarOption();

}	


}

function abm($idlistapreciocategoria,$descripcion,$cuota,$porcentaje,$descuento,$estado,$cod_categoriaFK,$funt)
{
	
	if($descripcion=="" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
	$consulta= "Select count(*) from listapreciocategoria where descripcion=? and cod_categoriaFK='".$cod_categoriaFK."' and estado ='Activo' ";
	
	
	$stmt = $mysqli->prepare($consulta);
	$ss='s';
	$stmt->bind_param($ss, $descripcion); 


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

	if($valor==1)
	{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}
	if($funt=="nuevo")
	{
	
    
    $consulta="insert into listapreciocategoria (descripcion,cuota,porcentaje,descuento,estado,cod_categoriaFK) values ('$descripcion','$cuota','$porcentaje','$descuento','$estado','$cod_categoriaFK')";

     $stmt = $mysqli->prepare($consulta);
   
 
	}
	if($funt=="editar")
	{
        
        
    
    $consulta="Update listapreciocategoria set descripcion=?,cuota=?,porcentaje=?,descuento=?,estado=?,cod_categoriaFK=? where idlistapreciocategoria=?";	

	$stmt = $mysqli->prepare($consulta);
        


    $ss='sssssss';
        
    $stmt->bind_param($ss,$descripcion,$cuota,$porcentaje,$descuento,$estado,$cod_categoriaFK,$idlistapreciocategoria); 
        
	
       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
	
	
	
}
function buscar($buscar,$cod_categoriaFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		$sql= "Select * from listapreciocategoria where descripcion like ?  and estado='Activo' and cod_categoriaFK = ? order by cuota asc ";
 
   
   
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar1,$cod_categoriaFK);

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
		  
		  
		  
		      $idlistapreciocategoria=$valor['idlistapreciocategoria'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $cuota=utf8_encode($valor['cuota']);
		  	  $porcentaje=utf8_encode($valor['porcentaje']);
		  	  $descuento=utf8_encode($valor['descuento']);
		  	  $cod_categoriaFK=utf8_encode($valor['cod_categoriaFK']);
		  	  $estado=utf8_encode($valor['estado']);
			  $filas[]=array(
				  "codigo" => $idlistapreciocategoria,
				  "categoria" => $cod_categoriaFK,
				  "descripcion" => $descripcion,
				  "cuota" => $cuota,
				  "descuento" => $descuento,
				  "porcentaje" => $porcentaje,
				  "estado" => $estado
			  );
		  	 
			  
		  	 $styleName=CargarStyleTable($styleName);
			 if($formato !== "json") {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmPrecioCategoria(this)'>
			  <td id='td_id_1' style='display:none;'>".$idlistapreciocategoria."</td>
			  <td id='td_id_2' style='display:none;'>".$cod_categoriaFK."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$descripcion."</td>
			  <td id='td_datos_2'style='width:25%' class='tdRegistroSearch' >".$cuota."</td>
			  <td id='td_datos_3'style='width:25%' class='tdRegistroSearch' >".$descuento."</td>
			  <td id='td_datos_4'style='width:25%' class='tdRegistroSearch' >".$porcentaje."</td>
			   <td  id='td_datos_5' style='display:none'>".$estado."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}




function buscarOption()
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




function buscarProductoCategoria($cod_categoriaFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select * from producto where  estado='Activo' and cod_categoriaFK = '".$cod_categoriaFK."' and precio_compra!='0' and promo!='SI' and condicion_precio='SI' ";
 
   
   
   $stmt = $mysqli->prepare($sql);
  
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
  $codigoModificacion = rand(1, PHP_INT_MAX);
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $cod_producto=$valor['cod_producto'];
			  $precio_compra=$valor['precio_compra'];
		  	 
				buscarListaPrecio($codigoModificacion,$precio_compra,$cod_producto,$cod_categoriaFK);
			  deletListaPrecio($codigoModificacion,$cod_producto);
	  }
 }
 

 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;


}



function deletListaPrecio($codigoModificacion,$cod_producto)
{
			$mysqli=conectar_al_servidor();
	
	
				$consulta="delete from detallesprecio where codigo!='".$codigoModificacion."' and cod_producto='".$cod_producto."' and iddetallesprecio!=''";
				
				// echo($consulta);
				// exit;

				$stmt = $mysqli->prepare($consulta);

								
				if ( ! $stmt->execute() ) {
				echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
				exit;
				} 
				mysqli_close($mysqli);

}



function buscarListaPrecio($codigoModificacion,$PrecioCompra,$cod_producto,$cod_categoriaFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select * from listapreciocategoria where estado='Activo' and cod_categoriaFK = ?  ";
 
   
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';

$stmt->bind_param($s,$cod_categoriaFK);

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
		  
		      $idlistapreciocategoria=$valor['idlistapreciocategoria'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $cuota=utf8_encode($valor['cuota']);
		  	  $porcentaje=utf8_encode($valor['porcentaje']);
		  	  $descuento=utf8_encode($valor['descuento']);
		  	  $cod_categoriaFK=utf8_encode($valor['cod_categoriaFK']);

			  if($cuota=="1"){
				   buscarDetallePrecioContado($PrecioCompra,$cod_producto,$porcentaje, $cuota);
			  }
		  	 
			  buscarDetallePrecio($codigoModificacion,$PrecioCompra,$cod_producto,$porcentaje, $cuota, $descripcion);

			 
	  }
 }
 


}

function buscarDetallePrecioContado($PrecioCompra,$cod_producto,$porcentaje, $cuota)
{	

			$mysqli=conectar_al_servidor();  		  
			  
			  $porcen = 100 + $porcentaje;
			  $precioTotal=($PrecioCompra* $porcen) / 100;
			  			  
			  $precioTotal = ceil($precioTotal/1000) * 1000;
			  
			  
				
			 $consulta="Update producto set precio_producto='$precioTotal',  porcentaje='$porcentaje'  where cod_producto='$cod_producto'";	
			 
			$stmt = $mysqli->prepare($consulta);
 
				if ( ! $stmt->execute() ) {
				echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
				exit;
				}
				
				mysqli_close($mysqli);
		
		
		
	 }

function cargar_indicador($donde)
{	

$user=$_POST['useru'];
    $user = utf8_decode($user);
	
		date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d'); 

			$mysqli=conectar_al_servidor();  		  
			  
				
			 $consulta="INSERT INTO carga_precios (desde,user,fecha) values ('$donde','$user','$fecha_inser_edit')";	
			 
			$stmt = $mysqli->prepare($consulta);
 
				if ( ! $stmt->execute() ) {
				echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
				exit;
				}
				
				mysqli_close($mysqli);
		
		
		
}



function buscarDetallePrecio($codigoModificacion,$PrecioCompra,$cod_producto,$porcentaje, $cuota, $descripcion)
{
	
	if($cuota=="1"){
		return false;
	}	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select iddetallesprecio  from detallesprecio where  cod_producto = '".$cod_producto."'  and Cuota='".$cuota."'  and Cuota!='1'  ";


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
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $iddetallesprecio=$valor['iddetallesprecio'];
			  
			  $porcen=100 + $porcentaje;
			  $precioTotal=($PrecioCompra* $porcen) / 100;
			  
			  $preciocuota=$precioTotal/$cuota;
			  
			  $preciocuota = ceil($preciocuota/1000) * 1000;
				
				$precioTotal= $preciocuota * $cuota;
		  	 		  
			     
				$consulta="Update detallesprecio set precio=?,  Porcentaje=?, Cuota=? , preciocuota=?, codigo=?, descripcion=? where iddetallesprecio=?";	

				$stmt = $mysqli->prepare($consulta);

				$ss='sssssss';
					
				$stmt->bind_param($ss,$precioTotal,$porcentaje,$cuota,$preciocuota,$codigoModificacion,$descripcion,$iddetallesprecio); 
					
				
				if ( ! $stmt->execute() ) {
				echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
				exit;

				}
		  	 


			 
	  }
 }else{
	 
	 
	 
				$porcen=100 + $porcentaje;
				$precioTotal=($PrecioCompra* $porcen) / 100;
			  
				$preciocuota=$precioTotal/$cuota;		  

				$preciocuota = ceil($preciocuota/1000) * 1000;
				
				$precioTotal= $preciocuota * $cuota;				
			     
				$consulta="insert into detallesprecio( precio , Porcentaje, Cuota , preciocuota , codigo , cod_producto , descripcion ,comision ) values(?,?,?,?,?,?,?,'0')";	

				$stmt = $mysqli->prepare($consulta);

				$ss='sssssss';
					
				$stmt->bind_param($ss,$precioTotal,$porcentaje,$cuota,$preciocuota,$codigoModificacion,$cod_producto,$descripcion); 
					
				
				if ( ! $stmt->execute() ) {
				echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
				exit;

				} 
	 
	 
 }
 
 




}






verificar($funt);
?>
