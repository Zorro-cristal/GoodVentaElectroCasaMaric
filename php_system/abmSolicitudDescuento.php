<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

include("buscar_nivel.php");
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
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
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";


if($resp!="ok" && $operacion!="buscaroption"){
$informacion =array("1" => "UI");
echo json_encode($informacion);	
exit;
}
	
if($operacion=="nuevo" )
{
	
	
	$cod_clienteFK=$_POST['cod_clienteFK'];
	$cod_clienteFK = utf8_decode($cod_clienteFK);
	$CodUsu=$_POST['CodUsu'];
	$CodUsu = utf8_decode($CodUsu);
	$cod_ProductoFK=$_POST['cod_ProductoFK'];
	$cod_ProductoFK = utf8_decode($cod_ProductoFK);
	$cantidad=$_POST['cantidad'];
	$cantidad = utf8_decode($cantidad);
	$precio=$_POST['precio'];
	$precio = quitarseparadormiles($precio);
	
	$precioproducto=$_POST['precioproducto'];
	$precioproducto = quitarseparadormiles($precioproducto);
	
	
	
	
	abm($CodUsu,$cod_ProductoFK,$cantidad,$precio,$precioproducto,$cod_clienteFK,$operacion);

}


if($operacion=="buscarDescuento")
{

	buscar($formato);

}	

if($operacion=="buscarSoliDescuento")
{
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$UsuSoli=$_POST['UsuSoli'];
	$UsuSoli = utf8_decode($UsuSoli);
	$UsuApro=$_POST['UsuApro'];
	$UsuApro = utf8_decode($UsuApro);
	$producto=$_POST['producto'];
	$producto = utf8_decode($producto);
	$cliente=$_POST['cliente'];
	$cliente = utf8_decode($cliente);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	buscarSoliDescuento($fecha1,$fecha2,$UsuSoli,$UsuApro,$producto,$cliente,$estado,$formato);

}	

if($operacion=="buscarSolicitudDesccuentoporProducto")
{
	
	$cod_productoFK=$_POST['cod_productoFK'];
	$cod_productoFK = utf8_decode($cod_productoFK);
	$cod_usuarioFK=$_POST['cod_usuarioFK'];
	$cod_usuarioFK = utf8_decode($cod_usuarioFK);
	buscarSolicitudDesccuentoporProducto($cod_productoFK,$cod_usuarioFK);

}



if($operacion=="buscarDescuentovista")
{
	
	$buscar=$_POST['buscar'];
	$buscar = utf8_decode($buscar);
	$UsuarioFK=$_POST['UsuarioFK'];
	$UsuarioFK = utf8_decode($UsuarioFK);
	buscarvistaVenta($buscar,$UsuarioFK,$formato);

}	


if($operacion=="EditarAprobado")
{
	$idABM=$_POST['idABM'];
	$idABM = utf8_decode($idABM);
	EditarAprobado($idABM);

}	


if($operacion=="Editar" )
{
	
	
	$CodUsu=$_POST['CodUsu'];
	$CodUsu = utf8_decode($CodUsu);
	$cod_ProductoFK=$_POST['cod_ProductoFK'];
	$cod_ProductoFK = utf8_decode($cod_ProductoFK);
	$cantidad=$_POST['cantidad'];
	$cantidad = utf8_decode($cantidad);
	$precio=$_POST['precio'];
	$precio = quitarseparadormiles($precio);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$idABM=$_POST['idABM'];
	$idABM = utf8_decode($idABM);	
	
	
	Editar($CodUsu,$cod_ProductoFK,$cantidad,$precio,$estado,$idABM,$operacion);

}


}



function  buscarSolicitudDesccuentoporProducto($cod_productoFK,$cod_usuarioFK)
{
$mysqli=conectar_al_servidor();


	$sql= "SELECT idsolicituddescuendo,precioDescuento FROM solicituddescuendo where cod_usuarioFK='$cod_usuarioFK' and estado='Aprobado' and cod_productoFK='$cod_productoFK' limit 1 ";
	
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

$idsolicituddescuendo="";
$precioDescuento="";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
	
	$idsolicituddescuendo = utf8_encode($valor['idsolicituddescuendo']); 
	$precioDescuento = utf8_encode($valor['precioDescuento']); 
}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $idsolicituddescuendo,"3" => $precioDescuento);
echo json_encode($informacion);	
exit;
}







function Editar($CodUsu,$cod_ProductoFK,$cantidad,$precio,$estado,$idABM,$operacion)
{
	
	
if($cantidad==""  || $precio==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$consulta1="update solicituddescuendo set estado='$estado',  cod_UsuAprobado='$CodUsu', cantidad='$cantidad', precioDescuento='$precio' where idsolicituddescuendo= $idABM";
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


function EditarAprobado($idABM)
{
	

$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$consulta1="update solicituddescuendo set estado='Finalizado' where idsolicituddescuendo= $idABM";



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



function abm($CodUsu,$cod_ProductoFK,$cantidad,$precio,$precioproducto,$cod_clienteFK,$operacion)
{
	
	
if($cantidad==""  || $precio=="" || $cod_clienteFK == "" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


if(comprobar_solicitud_pendiente($cod_clienteFK) >= 1){
	$informacion =array("1" => "EXDES");
	echo json_encode($informacion);	
	exit;
}

$mysqli=conectar_al_servidor();



$fechahoy=date('Y-m-d');

$consulta1="Insert into solicituddescuendo (estado, fecha, cod_UsuAprobado, cod_productoFK, cod_usuarioFK, cantidad, precioDescuento,precio,cod_clienteFK)
values('Pendiente','$fechahoy','0','$cod_ProductoFK','$CodUsu','$cantidad','$precio','$precioproducto','$cod_clienteFK')";



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

function comprobar_solicitud_pendiente($cod_clienteFK)
{
	$mysqli=conectar_al_servidor();

	
		$sql= "SELECT count(*) as contador FROM solicituddescuendo WHERE estado = 'Pendiente' and cod_clienteFK = '$cod_clienteFK';";
		
		// echo $sql;
		// exit;
   
   $stmt = $mysqli->prepare($sql);
   

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 $contador = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
			  
		$contador = utf8_encode($valor['contador']); 
			  
			  
	  }
 }
 
 mysqli_close($mysqli);

return $contador;

}



function buscar($formato="")
{
	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $pag2="";
	 $filas=array();
	 $formato=strtolower((string)$formato);
	
		$sql= "SELECT  cod_productoFK , nombre_producto as producto
		, cod_barra  as codBarra, cod_clienteFK,
		(SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) as cliente
		, IFNULL(precio_compra,0)  as precioCompra
		, precio_producto  as precio_producto , IFNULL(precio,0) as precio
		,(select nombre_persona from persona where cod_persona= cod_usuarioFK ) as usuario,
		(select Nombre from local where cod_local = (SELECT cod_localFK from usuario where cod_usuario = cod_usuarioFK)) as nombre_local
 , idsolicituddescuendo, sd.estado, fecha, cod_UsuAprobado, cantidad, IFNULL(precioDescuento,0) as precioDescuento, cod_usuarioFK 
 FROM solicituddescuendo sd inner join producto on cod_producto= cod_productoFK
 where  sd.estado='Pendiente' ";
		

   
   $stmt = $mysqli->prepare($sql);
   
   $Style="background: none 0px 0px repeat scroll #2196f3;
   border: 2px solid #ffffff;
   border-radius: 6px;
   cursor: pointer;
   margin-top:2px;
   ";


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
			  $precioCompra=utf8_encode($valor['precioCompra']);
			  $precio=utf8_encode($valor['precio']);
			  $codBarra=utf8_encode($valor['codBarra']);
		      $cod_productoFK=utf8_encode($valor['cod_productoFK']);
			  $producto=utf8_encode($valor['producto']);
		  	  $idsolicituddescuendo=utf8_encode($valor['idsolicituddescuendo']);
		  	  $estado=utf8_encode($valor['estado']);
			  $fecha=utf8_encode($valor['fecha']);
			  $cod_UsuAprobado=utf8_encode($valor['cod_UsuAprobado']);
			  $cantidad=utf8_encode($valor['cantidad']);
			  $precioDescuento=utf8_encode($valor['precioDescuento']);
			  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $usuario=utf8_encode($valor['usuario']);
			  $nombre_local=utf8_encode($valor['nombre_local']);
			  $cliente=utf8_encode($valor['cliente']);

			  $filas[]=array(
				  "id_solicitud"=>$idsolicituddescuendo,
				  "cod_producto"=>$cod_productoFK,
				  "codigo_barra"=>$codBarra,
				  "producto"=>$producto,
				  "cantidad"=>$cantidad,
				  "precio_descuento"=>$precioDescuento,
				  "precio_descuento_formateado"=>number_format($precioDescuento,'0',',','.'),
				  "fecha"=>$fecha,
				  "usuario"=>$usuario,
				  "estado"=>$estado,
				  "local"=>$nombre_local,
				  "precio_compra_formateado"=>number_format($precioCompra,'0',',','.'),
				  "precio_producto_formateado"=>number_format($precio,'0',',','.'),
				  "cliente"=>$cliente
			  );
			  
			  if($estado=="Aprobado"){
				  $estadoSoli="SI";
			  }else{
				  $estadoSoli="NO";
			  }
		  	 
			 if($formato!="json"){
		 	 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' onclick='obtenerdatosMensajeDetalle(this)'>
				<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$cod_productoFK."</td>
				<td  id='td_datos_1' style='width:25%'>".$producto."</td>
				<td  id='td_datos_2' style='width:10%'>".$cantidad."</td>
				<td  id='td_datos_3' style='width:25%'>".$precioDescuento."</td>
				<td  id='td_datos_4' style='width:10%'>".$fecha."</td>
				<td  id='td_datos_5' style='width:20%'>".$usuario."</td>
				
				</tr>
				</table>";
				
	
				
				
				$pag2.="<div id='DivMensaje_$idsolicituddescuendo' >
				<table style='width:100%;' >
				<tr id='tbSelecRegistro' onclick='obtenerdatosMensajeDetalle(this)'>
				<td style='width:100%;'>
				
				<ul class='task-list'>
                        <li class='completed'>
                            <div class='task-title'>
                                <i class='bx bx-check-circle'></i>
                                <p>'".$producto."'</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded' onclick='verCerrarMensajeDescuentoDetalle($idsolicituddescuendo)' ></i>
                        </li>
                    </ul>
			
				</td>				
				<td  id='td_datos_1' style='display:none'>".$producto."</td>
				<td  id='td_datos_2' style='display:none'>".$cantidad."</td>
				<td  id='td_datos_3' style='display:none'>".number_format($precioDescuento,'0',',','.')."</td>
				<td  id='td_datos_4' style='display:none'>".$fecha."</td>
				<td  id='td_datos_5' style='display:none'>".$usuario."</td>
				<td  id='td_datos_6' style='display:none'>".$idsolicituddescuendo."</td>
				<td  id='td_datos_7' style='display:none'>".$estado."</td>
				<td  id='td_datos_8' style='display:none'>".$codBarra."</td>
				<td  id='td_datos_9' style='display:none'>".$cod_productoFK."</td>
				<td  id='td_datos_10' style='display:none'>".$nombre_local."</td>
				
				<td  id='td_datos_11' style='display:none'>".number_format($precioCompra,'0',',','.')."</td>
				<td  id='td_datos_12' style='display:none'>".number_format($precio,'0',',','.')."</td>
				<td  id='td_datos_13' style='display:none'>".$cliente."</td>
				
								
				</tr>
				</table>
				</div>";
			 }
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $salida=$formato==="json" ? $filas : $pagina;
 $mensajes=$formato==="json" ? $filas : $pag2;
 $informacion =array("1" => "exito","2" => $salida,"3" => $nroRegistro ,"4" => $mensajes ,"5" => $estadoSoli);
echo json_encode($informacion);	
exit;


}



function buscarSoliDescuento($fecha1,$fecha2,$UsuSoli,$UsuApro,$producto,$cliente,$estado,$formato="")
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=strtolower((string)$formato);
	 
	 
	 $condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and fecha between '$fecha1' and '$fecha2' ";
}
$condicionUsuSoli="";
if($UsuSoli!=""){
	$condicionUsuSoli=" and usuariosoli like '%$UsuSoli%' ";
}
$condicionUsuApro="";
if($UsuApro!=""){
	$condicionUsuApro=" and usuarioapro like '%$UsuApro%' ";
}

$condicionestado="";
if($estado!=""){
	$condicionestado=" and estado ='$estado' ";
}

$condicionproducto="";
if($producto!=""){
	$condicionproducto=" and (select nombre_producto from producto where cod_producto= cod_productoFK ) like '%".$producto."%'";
}

$condicioncliente="";
if($cliente!=""){
	$condicioncliente=" and (select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona= cod_clienteFK) like '%".$cliente."%'";
}



	
		$sql= "SELECT  cod_productoFK ,(select nombre_producto from producto where cod_producto= cod_productoFK ) as producto,cod_clienteFK,IFNULL(precio,0) as precio,
		(select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona= cod_clienteFK ) as cliente
		,(select cod_barra from producto where cod_producto= cod_productoFK ) as codBarra
		,(select nombre_persona from persona where cod_persona= cod_usuarioFK ) as usuariosoli
		,(select nombre_persona from persona where cod_persona= cod_UsuAprobado ) as usuarioapro
 , idsolicituddescuendo, estado, fecha, cod_UsuAprobado, cantidad, precioDescuento, cod_usuarioFK FROM solicituddescuendo where 
 estado!='' ".$condicionFecha.$condicionUsuSoli.$condicionUsuApro.$condicionproducto.$condicioncliente.$condicionestado." ";
		
   // echo($sql);
   // exit;
   
   $stmt = $mysqli->prepare($sql);
   

  	

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 $totalDescuentos = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
			  $codBarra=utf8_encode($valor['codBarra']);
		      $cod_productoFK=utf8_encode($valor['cod_productoFK']);
			  $producto=utf8_encode($valor['producto']);
		  	  $idsolicituddescuendo=utf8_encode($valor['idsolicituddescuendo']);
		  	  $estado=utf8_encode($valor['estado']);
			  $fecha=utf8_encode($valor['fecha']);
			  $cod_UsuAprobado=utf8_encode($valor['cod_UsuAprobado']);
			  $cantidad=utf8_encode($valor['cantidad']);
			  $precioDescuento=utf8_encode($valor['precioDescuento']);
			  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $usuariosoli=utf8_encode($valor['usuariosoli']);
			  $usuarioapro=utf8_encode($valor['usuarioapro']);
			  $cliente=utf8_encode($valor['cliente']);
			  $precio=utf8_encode($valor['precio']);

			  $filas[]=array(
				  "codigo_barra"=>$codBarra,
				  "cod_producto"=>$cod_productoFK,
				  "cliente"=>$cliente,
				  "producto"=>$producto,
				  "cantidad"=>$cantidad,
				  "precio_descuento_formateado"=>number_format($precioDescuento,'0',',','.'),
				  "precio_producto_formateado"=>number_format($precio,'0',',','.'),
				  "usuario_solicitud"=>$usuariosoli,
				  "fecha"=>$fecha,
				  "estado"=>$estado,
				  "usuario_aprobado"=>$usuarioapro,
				  "id_solicitud"=>$idsolicituddescuendo
			  );
			
			if($estado == 'Finalizado'){
				$dif = $precio - $precioDescuento;
				$totalDescuentos+= $dif;
			}
			
		  	 
			 if($formato!="json"){
		 	 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' onclick='obtenerdatosSolicitudDescuento(this)'>
				<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$codBarra."</td>
				<td  id='td_datos_1' style='width:15%'>".$cliente."</td>
				<td  id='td_datos_1' style='width:15%'>".$producto."</td>
				<td  id='td_datos_2' style='width:10%'>".$cantidad."</td>
				<td  id='td_datos_3' style='width:5%'>".number_format($precioDescuento,'0',',','.')."</td>
				<td  id='' style='width:5%'>".number_format($precio,'0',',','.')."</td>
				<td  id='td_datos_4' style='width:12%'>".$usuariosoli."</td>
				<td  id='td_datos_5' style='width:8%'>".$fecha."</td>
				<td  id='td_datos_6' style='width:8%'>".$estado."</td>
				<td  id='td_datos_7' style='width:12%'>".$usuarioapro."</td>				
				<td  id='td_datos_8' style='display:none'>".$idsolicituddescuendo."</td>
				</tr>
				</table>";
			 }
				
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $salida=$formato==="json" ? $filas : $pagina;
 $informacion =array("1" => "exito","2" => $salida,"3" => $nroRegistro,"4"=> number_format(abs($totalDescuentos),'0',',','.'));
echo json_encode($informacion);	
exit;


}




function  buscarvistaVenta($buscar,$cod_usuarioFK,$formato="")
{
$mysqli=conectar_al_servidor();
$filas=array();
$formato=strtolower((string)$formato);



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
pr.precio_producto,pr.precio_compra,pr.comision,pr.estado,sd.cantidad,sd.precioDescuento,sd.estado as est,sd.fecha,sd.idsolicituddescuendo,
(select nombre_persona from persona where cod_persona= sd.cod_UsuAprobado limit 1 ) as aprobadoPor ,
(select descripcion from categoria where cod_categoria= pr.cod_categoriaFK limit 1 ) as NombreCategoria,
(select descripcion from impuesto where cod_Impuesto= pr.cod_ImpuestoFK limit 1 ) as NombreImpuesto,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca
 from  producto pr inner join solicituddescuendo sd on sd.cod_productoFK=pr.cod_producto
where  pr.estado='Activo' and sd.estado='Aprobado' and  cod_usuarioFK=".$cod_usuarioFK."  ".$CondicionBuscadorTotalResyltado." limit 50";
	
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
$idsolicituddescuendo = utf8_encode($valor['idsolicituddescuendo']); 
$est = utf8_encode($valor['est']); 
$fecha = utf8_encode($valor['fecha']); 
$aprobadoPor = utf8_encode($valor['aprobadoPor']); 
$cod_barra = utf8_encode($valor['cod_barra']);
$cod_producto = utf8_encode($valor['cod_producto']);
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$descripcion_producto = utf8_encode($valor['descripcion_producto']);          
$unidad_producto = utf8_encode($valor['unidad_producto']); 
$precioDescuento = utf8_encode($valor['precioDescuento']); 
$precio_compra = utf8_encode($valor['precio_compra']); 
$comision = utf8_encode($valor['comision']); 
$estado = utf8_encode($valor['estado']); 
$NombreCategoria = utf8_encode($valor['NombreCategoria']); 
$NombreImpuesto = utf8_encode($valor['NombreImpuesto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 
$codProveedorFK = utf8_encode($valor['codProveedor']); 
$cantidad = utf8_encode($valor['cantidad']); 

$filas[]=array(
	"id_solicitud"=>$idsolicituddescuendo,
	"estado_solicitud"=>$est,
	"fecha"=>$fecha,
	"aprobado_por"=>$aprobadoPor,
	"codigo_barra"=>$cod_barra,
	"cod_producto"=>$cod_producto,
	"producto"=>$nombre_producto,
	"marca"=>$NombreMarca,
	"descripcion"=>$descripcion_producto,
	"categoria"=>$NombreCategoria,
	"unidad"=>$unidad_producto,
	"cantidad"=>$cantidad,
	"precio_descuento_formateado"=>number_format($precioDescuento,'0',',','.'),
	"precio_compra_formateado"=>number_format($precio_compra,'0',',','.'),
	"comision"=>$comision,
	"estado_producto"=>$estado
);

$htmlFila="";
if($formato!="json"){
$styleName=CargarStyleTable($styleName);
	  $htmlFila="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaproductodesdeventaDescuento(this)' name='trVistaProductoDescuento_".$cod_barra."'  >
<td id='td_datos_13' style='display:none'>".$cod_barra."</td>
<td id='td_datos_15' style='width:7%; background-color: #efeded;color:red'>".$cod_barra." </td>
<td id='td_id' style='display:none'>".$cod_producto."</td>
<td  id='td_datos_1' style='width:28%'>".$nombre_producto."*".$NombreMarca."</td>
<td  id='td_datos_10' style='width:5%'>".$cantidad."</td>
<td  id='td_datos_2' style='display:none'>".$descripcion_producto."</td>
<td  id='td_datos_12' style='display:none'>".$NombreCategoria."</td>
<td  id='td_datos_3' style='display:none'>".$unidad_producto."</td>
<td  id='td_datos_precio_contado' style='width:10%'>". number_format($precioDescuento,'0',',','.')."</td>
<td   style='width:20%'>".$aprobadoPor."</td>
<td  id='td_datos_11' style='width:15%'>".$fecha."</td>
<td   style='width:15%'>".$est."</td>
<td  id='td_datos_4' style='display:none'>". number_format($precioDescuento,'0',',','.')."</td>
<td  id='td_datos_5' style='display:none'>".number_format($precio_compra,'0',',','.')."</td>
<td  id='td_datos_8' style='display:none'>".$comision."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_20' style='display:none'>".$idsolicituddescuendo."</td>
</tr>
</table>";
	  $pagina.=$htmlFila;
}
	 





}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$salida=$formato==="json" ? $filas : $pagina;
$informacion =array("1" => "exito","2" => $salida,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}




verificar($operacion);
?>
