<?php
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("classTable.php");

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
function solicitarFormatoJsonDetallePrecio()
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


if($operacion=="nuevo" || $operacion=="editar" || $operacion=="eliminar" )
{


$iddetallesprecio=$_POST['iddetallesprecio'];
$iddetallesprecio = utf8_decode($iddetallesprecio);

$precio=$_POST['precio'];
$precio = quitarseparadormiles($precio);


$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$cod_producto=$_POST['cod_producto'];
$cod_producto = utf8_decode($cod_producto);

$Porcentaje=$_POST['Porcentaje'];
$Porcentaje = quitarseparadormiles($Porcentaje);

$Cuota=$_POST['Cuota'];
$Cuota = utf8_decode($Cuota);

$preciocuota=$_POST['preciocuota'];
$preciocuota = quitarseparadormiles($preciocuota);

$comision=$_POST['comision'];
$comision = quitarseparadormiles($comision);



$precio_ventaDetalle=$_POST['precio_ventaDetalle'];
$precio_ventaDetalle = quitarseparadormiles($precio_ventaDetalle);


$descuento=$_POST['descuento'];
$descuento = quitarseparadormiles($descuento);

$userid=$_POST['userid'];
$userid = utf8_decode($userid);



abm($descuento,$userid,$precio_ventaDetalle,$iddetallesprecio,$precio,$descripcion,$cod_producto,$comision,$Porcentaje,$Cuota,$preciocuota,$operacion);

}



 
 
 if($operacion=="buscar"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
	
	$Cod_localFK=$_POST["Cod_localFK"];
 	$Cod_localFK=utf8_decode($Cod_localFK);
 	BuscarRegistro($buscar , $Cod_localFK);
 }
 
 if($operacion=="editarestePrecio"){
 	$codDetalle=$_POST["codDetalle"];
 	$codDetalle=utf8_decode($codDetalle);
	
	$porcentaje=$_POST["porcentaje"];
 	$porcentaje=utf8_decode($porcentaje);
	
	$precioCompra=$_POST["precioCompra"];
 	$precioCompra=utf8_decode($precioCompra);
	
	$cuotas=$_POST["cuotas"];
 	$cuotas=utf8_decode($cuotas);
	
	$PrecioContado=$_POST["PrecioContado"];
 	$PrecioContado=utf8_decode($PrecioContado);
	
	$PorcenContado=$_POST["PorcenContado"];
 	$PorcenContado=utf8_decode($PorcenContado);
	
		$precio_ventaDetalle=$_POST['precio_ventaDetalle'];
		$precio_ventaDetalle = quitarseparadormiles($precio_ventaDetalle);

		$userid=$_POST['userid'];
		$userid = utf8_decode($userid);
		
		$Cod_producto=$_POST['Cod_producto'];
		$Cod_producto = utf8_decode($Cod_producto);
	
	EditarDetallePrecio($Cod_producto,$userid,$precio_ventaDetalle,$codDetalle,$porcentaje,$cuotas,$precioCompra,$PrecioContado,$PorcenContado);
}
 
 
 
  if($operacion=="buscarTabla"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	BuscarRegistroTabla($buscar);
 }
 
 
 
 
 if($operacion=="buscarvistacompra"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	buscarvistacompra($buscar);
 }

 if($operacion=="buscarvista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	BuscarRegistroEnVista($buscar);
 }

 if($operacion=="buscarabmproductos"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar); 
	$cod_LocalFK=$_POST["cod_LocalFK"];
 	$cod_LocalFK=utf8_decode($cod_LocalFK);
 	buscarabmproductos($buscar,$cod_LocalFK);
 }
 
 
 
  if($operacion=="buscarTablapresupuesto"){
	  
$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$entrega=$_POST['entrega'];
$entrega = utf8_decode($entrega);


$Total=$_POST['Total'];
$Total = quitarseparadormiles($Total);
	
 	BuscarRegistroPresupuesto($buscar,$entrega,$Total);
 }
 
 
 
 
 



}


 


/*Funcion para insertar,modificar o eliminar registros*/
function EditarDetallePrecio($Cod_producto,$userid,$precio_ventaDetalle,$codDetalle,$porcentaje,$cuota,$precioCompra,$PrecioContado,$PorcenContado)
{

$mysqli=conectar_al_servidor(); 
$Resultado=$porcentaje-$PorcenContado;
if($Resultado==0){
	$Resultado=1;
	
$PrecioCuota=($PrecioContado)/$cuota;
$descripcion=$cuota." x ".number_format($PrecioCuota,'0',',','.');
$precio=($PrecioContado);
}else{
	
$precioCompra= round(($PrecioContado * 100) / ($PorcenContado+ 100));	
$PrecioCuota=( $precioCompra +  round(($precioCompra * $porcentaje)/100))/$cuota;
$descripcion=$cuota." x ".number_format($PrecioCuota,'0',',','.');
$precio=$precioCompra + round(($precioCompra * $porcentaje)/100);


// $precio=$precioCompra;
}




$consulta1="Update detallesprecio set precio=".$precio.",descripcion='".$descripcion."',Porcentaje=".$porcentaje.",preciocuota=".$PrecioCuota." where iddetallesprecio=".$codDetalle."";
$stmt1 = $mysqli->prepare($consulta1);

// echo($consulta1);
// exit;

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

$fechahoy=date('Y-m-d');

if($precio_ventaDetalle==$precio){
	$precio_ventaDetalle==0;
	$precio==0;
}
abmAuditoria("","0",$precio,"0","","","0",$precio_ventaDetalle,"0","",$fechahoy,$userid,"Editar Detalle precio",$Cod_producto);


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}








/*Funcion para insertar,modificar o eliminar registros*/
function abm($descuento,$userid,$precio_ventaDetalle,$iddetallesprecio,$precio,$descripcion,$cod_producto,$comision,$Porcentaje,$Cuota,$preciocuota,$operacion)
{

if($precio==""  || $descripcion=="" || $cod_producto=="" || $comision==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

if($operacion=="nuevo") 
{


$consulta1="Insert into detalle_listado_precio_producto (precio,descripcion,cod_producto,comision,Porcentaje,Cuota,preciocuota,descuento)
values(?,?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$precio,$descripcion,$cod_producto,$comision,$Porcentaje,$Cuota,$preciocuota,$descuento);

cargar_indicador('manual');

}


if($operacion=="editar")
{

$consulta1="Update detalle_listado_precio_producto set precio=?,descripcion=?,comision=?,Porcentaje=?,Cuota=?,preciocuota=?,descuento=? where cod_detalle_listado_precio_producto=?";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$precio,$descripcion,$comision,$Porcentaje,$Cuota,$preciocuota,$descuento,$iddetallesprecio); 

$fechahoy=date('Y-m-d');

if($precio_ventaDetalle==$precio){
	$precio_ventaDetalle==0;
	$precio==0;
}
 
}

if($operacion=="eliminar")
{

$consulta1="delete from detalle_listado_precio_producto  where cod_detalle_listado_precio_producto=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$iddetallesprecio); 

 
}


if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}




$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}


function  BuscarRegistro($buscar,$Cod_localFK)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonDetallePrecio();
$filas=array();

$fechahoy=date('Y-m-d');

$CondicionLocal=" ";
if($Cod_localFK!=""){
	$CondicionLocal=" and cod_localFK='".$Cod_localFK."'";
}

$sql= "select  cod_detalle_listado_precio_producto ,precio,dlpp.descripcion,cod_producto,comision,dlpp.Porcentaje,preciocuota ,
dlpp.descuento,dlpp.Cuota , (select Nombre from local where cod_localFK=cod_local) as local , accion
from  detalle_listado_precio_producto dlpp
inner join detalle_listado_precio dlp on cod_detalle_listado_precio=cod_detalle_listado_precioFK
inner join lista_precio_producto lpp on cod_lista_precio_producto=dlp.cod_lista_precio_productoFK
inner join local_lista_precio llp on  llp.cod_lista_precio_productoFK=lpp.cod_lista_precio_producto
 where lpp.estado='Activo' and cod_producto='".$buscar."' and accion='SI' and fecha_hasta>='".$fechahoy."' ".$CondicionLocal." group by cod_detalle_listado_precio_producto asc order by dlpp.Cuota asc";
 
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
$cod_detalle_listado_precio_producto = utf8_encode($valor['cod_detalle_listado_precio_producto']);          
$comision = utf8_encode($valor['comision']);          
$Porcentaje = utf8_encode($valor['Porcentaje']);          
$Cuota = utf8_encode($valor['Cuota']);          
$preciocuota = utf8_encode($valor['preciocuota']);          
$local = utf8_encode($valor['local']);          
$descuento = utf8_encode($valor['descuento']);          

$filas[]=array(
	"codigo"=>$cod_detalle_listado_precio_producto,
	"descripcion"=>$descripcion,
	"precio_cuota"=>floatval($preciocuota),
	"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.'),
	"precio"=>floatval($precio),
	"precio_formateado"=>number_format($precio,'0',',','.'),
	"descuento"=>floatval($descuento),
	"descuento_formateado"=>number_format($descuento,'0',',','.'),
	"local"=>$local,
	"comision"=>$comision,
	"porcentaje"=>floatval($Porcentaje),
	"porcentaje_formateado"=>number_format($Porcentaje,'1',',','.'),
	"cuota"=>$Cuota
);

	if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmdetallesprecio(this)'>
<td  id='td_datos_2' style='width:20%'>".$descripcion."</td>
<td  id='td_datos_7' style='width:20%'>".number_format($preciocuota,'0',',','.')."</td>
<td  id='td_datos_1' style='width:20%'>".number_format($precio,'0',',','.')."</td>
<td  id='td_datos_9' style='width:20%'>".number_format($descuento,'0',',','.')."</td>
<td  id='td_datos_8' style='width:20%'>".$local."</td>
<td  id='td_datos_3' style='display:none'>".$cod_detalle_listado_precio_producto."</td>
<td  id='td_datos_4' style='display:none'>".$comision."</td>
<td  id='td_datos_5' style='display:none'>".number_format($Porcentaje,'1',',','.')."</td>
<td  id='td_datos_6' style='display:none'>".$Cuota."</td>

</tr>
</table>";
	}


}
}

$informacion =array("1" => "exito","2" => $formatoJson ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function  buscarvistacompra($buscar)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonDetallePrecio();
$filas=array();

$sql= "select precio,descripcion,cod_producto,iddetallesprecio,comision,Porcentaje,Cuota,preciocuota
 from  detallesprecio 
where cod_producto=? ";
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



$precio = utf8_encode($valor['precio']);     
$descripcion = utf8_encode($valor['descripcion']);          
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          
$comision = utf8_encode($valor['comision']);          
$Porcentaje = utf8_encode($valor['Porcentaje']);          
$Cuota = utf8_encode($valor['Cuota']);          
$preciocuota = utf8_encode($valor['preciocuota']);          

$filas[]=array(
	"codigo"=>$iddetallesprecio,
	"precio"=>floatval($precio),
	"precio_formateado"=>number_format($precio,'0',',','.'),
	"descripcion"=>$descripcion,
	"comision"=>$comision,
	"porcentaje"=>floatval($Porcentaje),
	"porcentaje_formateado"=>number_format($Porcentaje,'1',',','.'),
	"cuota"=>$Cuota,
	"precio_cuota"=>floatval($preciocuota),
	"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.')
);

	if(!$formatoJson){
	 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmdetallespreciocompra(this)'>
<td  id='td_datos_1' style='width:50%'>".number_format($precio,'0',',','.') ."</td>
<td  id='td_datos_2' style='width:50%'>".$descripcion."</td>
<td  id='td_datos_3' style='display:none'>".$iddetallesprecio."</td>
<td  id='td_datos_4' style='display:none'>".$comision."</td>
<td  id='td_datos_5' style='display:none'>".number_format($Porcentaje,'1',',','.') ."</td>
<td  id='td_datos_6' style='display:none'>".$Cuota."</td>
<td  id='td_datos_7' style='display:none'>".number_format($preciocuota,'0',',','.') ."</td>
</tr>
</table>";
	}


}
}

$informacion =array("1" => "exito","2" => $formatoJson ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


function  BuscarRegistroEnVista($buscar)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonDetallePrecio();
$filas=array();

$sql= "select precio,descripcion,cod_producto,iddetallesprecio,comision,Porcentaje
 from  detallesprecio 
where cod_producto=? ";
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



$precio = utf8_encode($valor['precio']);     
$descripcion = utf8_encode($valor['descripcion']);          
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          
$comision = utf8_encode($valor['comision']);          
$Porcentaje = utf8_encode($valor['Porcentaje']);          

$filas[]=array(
	"codigo"=>$iddetallesprecio,
	"precio"=>floatval($precio),
	"precio_formateado"=>number_format($precio,'0',',','.'),
	"descripcion"=>$descripcion,
	"comision"=>$comision,
	"porcentaje"=>floatval($Porcentaje),
	"porcentaje_formateado"=>$Porcentaje
);

	if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='td_datos_1' style='width:50%'>".number_format($precio,'0',',','.') ."</td>
<td  id='td_datos_2' style='width:50%'>".$descripcion."</td>
<td  id='td_datos_3' style='display:none'>".$iddetallesprecio."</td>
<td  id='td_datos_4' style='display:none'>".$comision."</td>
<td  id='td_datos_5' style='display:none'>".$Porcentaje."</td>
</tr>
</table>";
	}


}
}


$informacion =array("1" => "exito","2" => $formatoJson ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}




function  buscarabmproductos($buscar,$cod_LocalFK)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonDetallePrecio();
$filas=array();

$fechahoy=date('Y-m-d');

$sql= "select precio,dlpp.descripcion,cod_producto,comision,dlpp.Porcentaje,preciocuota ,dlpp.descuento
from  detalle_listado_precio_producto dlpp
inner join detalle_listado_precio dlp on cod_detalle_listado_precio=cod_detalle_listado_precioFK
inner join lista_precio_producto lpp on cod_lista_precio_producto=dlp.cod_lista_precio_productoFK
inner join local_lista_precio on  dlp.cod_lista_precio_productoFK=cod_lista_precio_producto
 where lpp.estado='Activo' and  cod_producto='".$buscar."' and  cod_localFK='".$cod_LocalFK."' and accion='SI' and fecha_hasta>='".$fechahoy."' group by cod_detalle_listado_precio_producto asc order by dlpp.Cuota asc";


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
	"origen"=>"lista_precio",
	"descripcion"=>$descripcion,
	"precio_cuota"=>floatval($preciocuota),
	"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.')
);

	if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr   >
<td   style='width:50%'>".$descripcion."</td>
<td   style='width:20%'>".number_format($preciocuota,'0',',','.') ."</td> 
</tr>
</table>";
	}


}
}else{
	

	
$sql= "select precio,descripcion,cod_producto,iddetallesprecio,comision,Porcentaje , preciocuota from  detallesprecio where cod_producto='".$buscar."' order by Cuota asc";


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
	"origen"=>"detalle_precio",
	"descripcion"=>$descripcion,
	"precio_cuota"=>floatval($preciocuota),
	"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.')
);

	if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr   >
<td   style='width:50%'>".$descripcion."</td>
<td   style='width:20%'>".number_format($preciocuota,'0',',','.') ."</td> 
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



 




function  BuscarRegistroTabla($buscar)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonDetallePrecio();
$filas=array();

$sql= "select d.precio,descripcion,precio_compra,precio_producto,p.porcentaje as porcen,d.cod_producto,iddetallesprecio,
d.comision,d.Porcentaje,Cuota,preciocuota
 from  detallesprecio d inner join producto p on p.cod_producto= d.cod_producto
where d.cod_producto='$buscar' ";



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


$cod_producto = utf8_encode($valor['cod_producto']); 
$precio = utf8_encode($valor['precio']);     
$descripcion = utf8_encode($valor['descripcion']);          
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          
$comision = utf8_encode($valor['comision']);          
$Porcentaje = utf8_encode($valor['Porcentaje']);          
$Cuota = utf8_encode($valor['Cuota']);          
$preciocuota = utf8_encode($valor['preciocuota']);     
$precio_compra = utf8_encode($valor['precio_compra']);   
$precio_producto = utf8_encode($valor['precio_producto']);   
$porcentaje = utf8_encode($valor['porcen']);  

$filas[]=array(
	"codigo"=>$iddetallesprecio,
	"cod_producto"=>$cod_producto,
	"porcentaje"=>floatval($Porcentaje),
	"porcentaje_formateado"=>number_format($Porcentaje,'1',',','.'),
	"cuota"=>$Cuota,
	"precio_cuota"=>floatval($preciocuota),
	"precio_cuota_formateado"=>number_format($preciocuota,'0',',','.'),
	"descripcion"=>$descripcion,
	"precio_total"=>floatval($precio),
	"precio_total_formateado"=>number_format($precio,'0',',','.'),
	"precio_compra"=>floatval($precio_compra),
	"precio_contado"=>floatval($precio_producto),
	"porcentaje_contado"=>floatval($porcentaje)
);

	if(!$formatoJson){
$ImputCuotas="<input id='inptCuotas_$iddetallesprecio' type='text' value='$Cuota' class='inputText'  />";  
$ImputPrecioContado="<input id='inptPrecioContado_$iddetallesprecio' type='text' value='$precio_producto' class='inputText'  />";  
$ImputPorcentajeContado="<input id='inptPorcenContado_$iddetallesprecio' type='text' value=$porcentaje class='inputText'  />";  

$ImputPrecioAntes="<input id='ImputPrecioAntes_$iddetallesprecio' type='text' value=$precio class='inputText'  />";  
$ImputCod_producto="<input id='ImputCod_producto_$iddetallesprecio' type='text' value=$cod_producto class='inputText'  />";  

$ImputPorcentaje="<input id='inptPor_$iddetallesprecio' type='text' value='$Porcentaje' class='inputText'  />";
$Accion="<input type='Button'  value='Guardar' class='btn4' id='$iddetallesprecio' name='$precio_compra' onclick='EditarEstePrecioDetalleTabla(this)' style='background-color: #2196F3;'  />";     

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmdetallesprecio(this)'>
<td  id='td_datos_1' style='width:10%'>".$ImputPorcentaje."</td>
<td  id='td_datos_2' style='width:10%'>".$Cuota."</td>
<td  id='td_datos_3' style='width:20%'>".number_format($preciocuota,'0',',','.')."</td>
<td  id='td_datos_6' style='width:20%'>".$descripcion."</td>
<td  id='td_datos_4' style='width:20%'>".number_format($precio,'0',',','.')."</td>
<td  id='td_datos_7' style='width:10%'>".$Accion."</td>
<td  id='td_datos_8' style='display:none'>".$ImputCuotas."</td>
<td  id='td_datos_9' style='display:none'>".$ImputPrecioContado."</td>
<td  id='td_datos_10' style='display:none'>".$ImputPorcentajeContado."</td>
<td  id='td_datos_10' style='display:none'>".$ImputPrecioAntes."</td>
<td  id='td_datos_10' style='display:none'>".$ImputCod_producto."</td>
</tr>
</table>";
	}


}
}

$informacion =array("1" => "exito","2" => $formatoJson ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}







function  BuscarRegistroPresupuesto($buscar,$Entrega,$Total)
{
$mysqli=conectar_al_servidor();
$formatoJson=solicitarFormatoJsonDetallePrecio();
$filas=array();

$sql= "select precio,descripcion,precio_compra,precio_producto,p.porcentaje as porcen,d.cod_producto,iddetallesprecio,
d.comision,d.Porcentaje,Cuota,preciocuota
 from  detallesprecio d inner join producto p on p.cod_producto= d.cod_producto group by Cuota asc";

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
$contdor=0;
$precio_producto =0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$precio = utf8_encode($valor['precio']);             
$iddetallesprecio = utf8_encode($valor['iddetallesprecio']);          
$comision = utf8_encode($valor['comision']);          
$Porcentaje = utf8_encode($valor['Porcentaje']);          
$Cuota = utf8_encode($valor['Cuota']);          
$preciocuota = utf8_encode($valor['preciocuota']);     
$precio_compra = utf8_encode($valor['precio_compra']);   
$precio_producto = $Total;
$porcen = utf8_encode($valor['porcen']);  

$Entrega = quitarseparadormiles($Entrega);

$Resultado=$Porcentaje-$porcen;

if($contdor==0){
	  $filas[]=array(
		"tipo"=>"contado",
		"cuota"=>"CONTADO",
		"precio_cuota"=>floatval($precio_producto),
		"precio_cuota_formateado"=>number_format($precio_producto,'0',',','.'),
		"descripcion"=>"1 x ".number_format($precio_producto,'0',',','.'),
		"total"=>floatval($precio_producto),
		"total_formateado"=>number_format($precio_producto,'0',',','.')
	  );
	  if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmdetallesprecio(this)'>
<td  id='td_datos_2' style='width:20%'>CONTADO</td>
<td  id='td_datos_3' style='width:20%'>".number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_6' style='width:40%'>1 x ".number_format($precio_producto,'0',',','.')."</td>
<td  id='td_datos_4' style='width:20%'>".number_format($precio_producto,'0',',','.')."</td>
</tr>
</table>";
	  }
}

	$precioCuotas=(($precio_producto - $Entrega)+round((($precio_producto - $Entrega) * $Resultado)/100))/$Cuota;
	$descripcion=$Cuota." x ".number_format($precioCuotas,'0',',','.');
	$TotalPrecio=(($precio_producto - $Entrega)+round((($precio_producto - $Entrega) * $Resultado)/100));
	$filas[]=array(
		"tipo"=>"cuota",
		"cuota"=>$Cuota,
		"precio_cuota"=>floatval($precioCuotas),
		"precio_cuota_formateado"=>number_format($precioCuotas,'0',',','.'),
		"descripcion"=>$descripcion,
		"total"=>floatval($TotalPrecio),
		"total_formateado"=>number_format($TotalPrecio,'0',',','.')
	);

	if(!$formatoJson){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmdetallesprecio(this)'>
<td  id='td_datos_2' style='width:20%'>".$Cuota."</td>
<td  id='td_datos_3' style='width:20%'>".number_format($precioCuotas,'0',',','.')."</td>
<td  id='td_datos_6' style='width:40%'>".$descripcion."</td>
<td  id='td_datos_4' style='width:20%'>".number_format($TotalPrecio,'0',',','.')."</td>
</tr>
</table>";
	}

$contdor++;
}
}

$informacion =array("1" => "exito","2" => $formatoJson ? $filas : $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


function abmAuditoria($nombre_descripcion,$precio_compra,$precio_venta,$stock,$cod_barra,$nombredescripcionAnt,$precio_compraAnt,$precio_ventaAnt,$stockAnt,$cod_barraAnt,$fecha,$cod_usuarioFK,$Accion,$cod_productoFK)
{
	
	$cod_local=$_POST["cod_local"];
 	$cod_local=utf8_decode($cod_local);
	
	
	if($nombre_descripcion=="" && $precio_compra=="0" && $precio_venta==0 && $stock=="0" && $cod_barra==""){
		
	}else{	
$mysqli=conectar_al_servidor(); 


$consulta1="Insert into auditoriaProducto (nombre_descripcion, precio_compra, precio_venta, stock, cod_barra, nombredescripcionAnt, precio_compraAnt, precio_ventaAnt, stockAnt, cod_barraAnt, fecha, cod_usuarioFK,accion,cod_productoFK,cod_localfk)
values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssssssssss';
$stmt1->bind_param($ss,$nombre_descripcion,$precio_compra,$precio_venta,$stock,$cod_barra,$nombredescripcionAnt,$precio_compraAnt,$precio_ventaAnt,$stockAnt,$cod_barraAnt,$fecha,$cod_usuarioFK,$Accion,$cod_productoFK,$cod_local);


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
	}
	
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









ObtenerDatos($operacion);

?>
