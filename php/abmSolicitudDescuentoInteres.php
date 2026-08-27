<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);


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


if($resp!="ok" && $operacion!="buscaroption"){
$informacion =array("1" => "UI");
echo json_encode($informacion);	
exit;
}
	
if($operacion=="nuevo" )
{
	
	
	$cuota_nro=$_POST['cuota_nro'];
	$cuota_nro = utf8_decode($cuota_nro);
	$motivo=$_POST['motivo'];
	$motivo = utf8_decode($motivo);
	$CodUsu=$_POST['CodUsu'];
	$CodUsu = utf8_decode($CodUsu);
	$cod_creditoFK=$_POST['cod_creditoFK'];
	$cod_creditoFK = utf8_decode($cod_creditoFK);
	$cod_localFK=$_POST['cod_localFK'];
	$cod_localFK = utf8_decode($cod_localFK);
	$monto=$_POST['monto'];
	$monto = quitarseparadormiles($monto);
	$montocuota=$_POST['montocuota'];
	$montocuota = quitarseparadormiles($montocuota);
	$totalInteres=$_POST['totalInteres'];
	$totalInteres = quitarseparadormiles($totalInteres);
	$cod_clienteFK=$_POST['idClienteCuenta'];
	$cod_clienteFK = utf8_decode($cod_clienteFK);
	
	$cod_ventaFK=$_POST['cod_ventaFK'];
	$cod_ventaFK = utf8_decode($cod_ventaFK);
	
	
	
	abm($cod_ventaFK,$CodUsu,$cod_creditoFK,$monto,$cod_localFK,$totalInteres,$cuota_nro,$motivo,$cod_clienteFK,$montocuota,$operacion);

}

if($operacion=="nuevo_tipo_parcial" )
{
	
	

	$motivo=$_POST['motivo'];
	$motivo = utf8_decode($motivo);
	$CodUsu=$_POST['CodUsu'];
	$CodUsu = utf8_decode($CodUsu);
	$cod_localFK=$_POST['cod_localFK'];
	$cod_localFK = utf8_decode($cod_localFK);
	$monto=$_POST['monto'];
	$monto = quitarseparadormiles($monto);
	$totalInteres=$_POST['totalInteres'];
	$totalInteres = quitarseparadormiles($totalInteres);
	$cod_clienteFK=$_POST['idClienteCuenta'];
	$cod_clienteFK = utf8_decode($cod_clienteFK);
	
	$cod_ventaFK=$_POST['cod_ventaFK'];
	$cod_ventaFK = utf8_decode($cod_ventaFK);
	
	
	
	nuevo_tipo_parcial($cod_ventaFK,$CodUsu,$monto,$cod_localFK,$totalInteres,$motivo,$cod_clienteFK,$operacion);

}


if($operacion=="buscarDescuento")
{

	buscar();

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
	buscarSoliDescuento($fecha1,$fecha2,$UsuSoli,$UsuApro,$producto);

}	

if($operacion=="comprobarSolicitudDescuentoInteres")
{
	$codCredito=$_POST['codCredito'];
	$codCredito = utf8_decode($codCredito);
	comprobarSolicitudDescuentoInteres($codCredito);

}	

if($operacion=="comprobarSolicitudDescuentoInteresTipoParcial")
{
	$cod_ventaFK=$_POST['cod_ventaFK'];
	$cod_ventaFK = utf8_decode($cod_ventaFK);
	comprobarSolicitudDescuentoInteresTipoParcial($cod_ventaFK);

}

if($operacion=="comprobarEstadosSolicitudDescuentoInteres")
{
	$$cod_ventaFK=$_POST['$cod_ventaFK'];
	$$cod_ventaFK = utf8_decode($$cod_ventaFK);
	comprobarEstadosSolicitudDescuentoInteres($$cod_ventaFK,'');

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
	buscarvistaVenta($buscar,$UsuarioFK);

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
	$totalApro=$_POST['totalApro'];
	$totalApro = quitarseparadormiles($totalApro);
	$fecha_apro=$_POST['fecha_apro'];
	$fecha_apro = utf8_decode($fecha_apro);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$idABM=$_POST['idABM'];
	$idABM = utf8_decode($idABM);	
	
	
	Editar($CodUsu,$totalApro,$fecha_apro,$estado,$idABM,$operacion);

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







function Editar($CodUsu,$totalApro,$fecha_apro,$estado,$idABM,$operacion)
{
	
	
if($totalApro==""  || $idABM==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$consulta1="update solicituddescuentointeres set estado='$estado',  cod_UsuAprobado='$CodUsu', totalaprobado='$totalApro',fecha_apro='$fecha_apro' where idsolicituddescuentointeres= $idABM";

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



function abm($cod_ventaFK,$CodUsu,$cod_creditoFK,$monto,$cod_localFK,$totalInteres,$cuota_nro,$motivo,$cod_clienteFK,$montocuota,$operacion)
{
	
	$comprobarExistenciaOtroDescuento = comprobarEstadosSolicitudDescuentoInteres($cod_ventaFK,$cod_creditoFK);
	
	if($comprobarExistenciaOtroDescuento){
		$informacion =array("1" => "exito","2"=>"EXISTEDESCUENTO");
		echo json_encode($informacion);	
		exit;
	}
	
	
	
if($monto==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();

if($operacion=="nuevo")
{
	date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d | h:i:sa', time()); 

$consulta1="Insert into solicituddescuentointeres (totalSolic, fecha_solic, cod_UsuAprobado, cod_creditoFK, cod_usuarioFK,estado,cod_local,totalInteres,detalle_cuota,estado_uso,motivo,tipo_pago,cod_clienteFK,montocuota,cod_ventaFK)
values('$monto','$fecha_inser','','$cod_creditoFK','$CodUsu','PENDIENTE',$cod_localFK,'$totalInteres','$cuota_nro','PENDIENTE','$motivo','NORMAL','$cod_clienteFK','$montocuota','$cod_ventaFK')";
$stmt1 = $mysqli->prepare($consulta1);

}




if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function nuevo_tipo_parcial($cod_ventaFK,$CodUsu,$monto,$cod_localFK,$totalInteres,$motivo,$cod_clienteFK,$operacion)
{
	
	$comprobarExistenciaOtroDescuento = comprobarEstadosSolicitudDescuentoInteres($cod_ventaFK,'');
	
	if($comprobarExistenciaOtroDescuento){
		$informacion =array("1" => "exito","2"=>"EXISTEDESCUENTO");
		echo json_encode($informacion);	
		exit;
	}
	
	
if($monto==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();



	date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d | h:i:sa', time()); 

$consulta1="Insert into solicituddescuentointeres (totalSolic, fecha_solic, cod_usuarioFK,estado,cod_local,totalInteres,estado_uso,motivo,tipo_pago,cod_clienteFK,cod_ventaFK)
values('$monto','$fecha_inser','$CodUsu','PENDIENTE',$cod_localFK,'$totalInteres','PENDIENTE','$motivo','PARCIAL','$cod_clienteFK','$cod_ventaFK')";



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



function buscar()
{
	
	
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $pag2="";
	
		$sql= "SELECT  idsolicituddescuentointeres,totalSolic,totalInteres,fecha_solic,cod_usuarioFK,cod_creditoFK,estado,cod_UsuAprobado,fecha_apro,motivo,
		(select nombre_persona from persona where cod_persona= cod_usuarioFK ) as usuario,detalle_cuota,
		(select Nombre from local where cod_local = (SELECT cod_localFK from usuario where cod_usuario = cod_usuarioFK)) as nombre_local
		FROM solicituddescuentointeres where estado='PENDIENTE'";
		

		
   // echo($sql);
   // exit;
   
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
		  
			  $total=utf8_encode($valor['totalSolic']);
			  $totalInteres=utf8_encode($valor['totalInteres']);
		      $cod_creditoFK=utf8_encode($valor['cod_creditoFK']);
		  	  $idsolicituddescuentointeres=utf8_encode($valor['idsolicituddescuentointeres']);
		  	  $estado=utf8_encode($valor['estado']);
			  $fecha_solic=utf8_encode($valor['fecha_solic']);
			  $cod_UsuAprobado=utf8_encode($valor['cod_UsuAprobado']);
			  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $usuario=utf8_encode($valor['usuario']);
			  $nombre_local=utf8_encode($valor['nombre_local']);
			  $detalle_cuota=utf8_encode($valor['detalle_cuota']);
			  $motivo=utf8_encode($valor['motivo']);
			  
			  if($estado=="APROBADO"){
				  $estadoSoli="SI";
			  }else{
				  $estadoSoli="NO";
			  }
		  	 
			 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' onclick='obtenerdatosMensajeDetalleDescuentoInteres(this)'>
				<td  id='td_datos_1' style='width:25%'>".$total."</td>
				<td  id='td_datos_2' style='width:25%'>".$totalInteres."</td>
				<td  id='td_datos_3' style='width:10%'>".$fecha_solic."</td>
				<td  id='td_datos_4' style='width:20%'>".$usuario."</td>
				<td  id='td_datos_5' style='width:20%'>".$detalle_cuota."</td>
				</tr>
				</table>";
				
				$pag2.="<div id='divMensajeDescuentoInteres_$idsolicituddescuentointeres' style='$Style'>
				<table style='width:100%;' >
				<tr id='tbSelecRegistro' onclick='obtenerdatosMensajeDetalleDescuentoInteres(this)'>
				<td style='width:95%;'>
				<p class='pTituloB' style='font-size: 12px;  color: #ffffff;'>Hay Solicitud de Descuento Pendiente==>  <b style='font-size: 18px;' >Interes</b>  </p>
				</td>				
				<td  id='td_datos_6' style='display:none'>".number_format($total,'0',',','.')."</td>
				<td  id='td_datos_7' style='display:none'>".number_format($totalInteres,'0',',','.')."</td>
				<td  id='td_datos_8' style='display:none'>".$fecha_solic."</td>
				<td  id='td_datos_9' style='display:none'>".$usuario."</td>
				<td  id='td_datos_10' style='display:none'>".$idsolicituddescuentointeres."</td>
				<td  id='td_datos_11' style='display:none'>".$estado."</td>
				<td  id='td_datos_12' style='display:none'>".$nombre_local."</td>
				<td  id='td_datos_13' style='display:none'>".$cod_creditoFK."</td>
				<td  id='td_datos_14' style='display:none'>".$motivo."</td>

				
				<td style='width:5%'>
				<img src='/GoodVentaElectroCasaMaric/iconos/botonCerrar.png' class='iconoBtn' title='Cerrar Ventana' onclick='verCerrarMensajeDescuentoInteresDetalle($idsolicituddescuentointeres)' />
				</td>
								
				</tr>
				</table>
				</div>";
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro ,"4" => $pag2 ,"5" => $estadoSoli);
echo json_encode($informacion);	
exit;
}



function buscarSoliDescuento($fecha1,$fecha2,$UsuSoli,$UsuApro,$producto)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
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

$condicionproducto="";
if($producto!=""){
	$condicionproducto=" producto like '%".$producto."%'";
}



	
		$sql= "SELECT  cod_productoFK ,(select nombre_producto from producto where cod_producto= cod_productoFK ) as producto
		,(select cod_barra from producto where cod_producto= cod_productoFK ) as codBarra
		,(select nombre_persona from persona where cod_persona= cod_usuarioFK ) as usuariosoli
		,(select nombre_persona from persona where cod_persona= cod_UsuAprobado ) as usuarioapro
 , idsolicituddescuendo, estado, fecha, cod_UsuAprobado, cantidad, precioDescuento, cod_usuarioFK FROM solicituddescuendo where 
 estado!='' ".$condicionFecha.$condicionUsuSoli.$condicionUsuApro.$condicionproducto." ";
		
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
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
			  $codBarra=$valor['codBarra'];
		      $cod_productoFK=$valor['cod_productoFK'];
			  $producto=$valor['producto'];
		  	  $idsolicituddescuendo=utf8_encode($valor['idsolicituddescuendo']);
		  	  $estado=utf8_encode($valor['estado']);
			  $fecha=utf8_encode($valor['fecha']);
			  $cod_UsuAprobado=utf8_encode($valor['cod_UsuAprobado']);
			  $cantidad=utf8_encode($valor['cantidad']);
			  $precioDescuento=utf8_encode($valor['precioDescuento']);
			  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $usuariosoli=utf8_encode($valor['usuariosoli']);
			  $usuarioapro=utf8_encode($valor['usuarioapro']);
			
		  	 
			 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' onclick='obtenerdatosSolicitudDescuento(this)'>
				<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$codBarra."</td>
				<td  id='td_datos_1' style='width:30%'>".$producto."</td>
				<td  id='td_datos_2' style='width:10%'>".$cantidad."</td>
				<td  id='td_datos_3' style='width:10%'>".number_format($precioDescuento,'0',',','.')."</td>
				<td  id='td_datos_4' style='width:12%'>".$usuariosoli."</td>
				<td  id='td_datos_5' style='width:8%'>".$fecha."</td>
				<td  id='td_datos_6' style='width:8%'>".$estado."</td>
				<td  id='td_datos_7' style='width:12%'>".$usuarioapro."</td>				
				<td  id='td_datos_8' style='display:none'>".$idsolicituddescuendo."</td>
				</tr>
				</table>";
				
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function comprobarSolicitudDescuentoInteres($codCredito)
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from solicituddescuentointeres where cod_creditoFK = '$codCredito' and estado_uso = 'PENDIENTE' and tipo_pago = 'NORMAL'";
		
		/* echo $sql;
		exit; */
		
   
   $stmt = $mysqli->prepare($sql);
   


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 $estadosolicitudinteres = "";
 $totalaprobado = "";
 $estado_uso = "";

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  	  $idsolicituddescuentointeres=utf8_encode($valor['idsolicituddescuentointeres']);
		  	  $total=utf8_encode($valor['totalSolic']);
		  	  $totalInteres=utf8_encode($valor['totalInteres']);
		  	  $totalaprobado=utf8_encode($valor['totalaprobado']);
			  $cod_UsuAprobado=utf8_encode($valor['cod_UsuAprobado']);
			  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $estadosolicitudinteres=utf8_encode($valor['estado']);
			  $estado_uso=utf8_encode($valor['estado_uso']);
			  
			  
	  }
 }
 
 if($estadosolicitudinteres == 'PENDIENTE'){
	$estadosolicitudinteres = 0;
 }else if($estadosolicitudinteres == 'APROBADO'){
	$estadosolicitudinteres = 1;
 }else if($estadosolicitudinteres == ''){
	 $estadosolicitudinteres = '';
 }else if($estadosolicitudinteres == 'RECHAZADO'){
	 $estadosolicitudinteres = 2;
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $estadosolicitudinteres,"3"=>$totalaprobado);
echo json_encode($informacion);	
exit;


}

function comprobarSolicitudDescuentoInteresTipoParcial($cod_ventaFK)
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from solicituddescuentointeres where cod_ventaFK = '$cod_ventaFK' and estado_uso = 'PENDIENTE' and tipo_pago = 'PARCIAL'";
		
		/* echo $sql;
		exit; */
		
   
   $stmt = $mysqli->prepare($sql);
   


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 $estadosolicitudinteres = "";
 $totalaprobado = "";
 $estado_uso = "";

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  	  $idsolicituddescuentointeres=utf8_encode($valor['idsolicituddescuentointeres']);
		  	  $total=utf8_encode($valor['totalSolic']);
		  	  $totalInteres=utf8_encode($valor['totalInteres']);
		  	  $totalaprobado=utf8_encode($valor['totalaprobado']);
			  $cod_UsuAprobado=utf8_encode($valor['cod_UsuAprobado']);
			  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $estadosolicitudinteres=utf8_encode($valor['estado']);
			  $estado_uso=utf8_encode($valor['estado_uso']);
			  
			  
	  }
 }
 
 if($estadosolicitudinteres == 'PENDIENTE'){
	$estadosolicitudinteres = 0;
 }else if($estadosolicitudinteres == 'APROBADO'){
	$estadosolicitudinteres = 1;
 }else if($estadosolicitudinteres == ''){
	 $estadosolicitudinteres = '';
 }else if($estadosolicitudinteres == 'RECHAZADO'){
	 $estadosolicitudinteres = 2;
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $estadosolicitudinteres,"3"=>$totalaprobado);
echo json_encode($informacion);	
exit;


}
function comprobarEstadosSolicitudDescuentoInteres($cod_ventaFK,$cod_creditoFK)
{
	$mysqli=conectar_al_servidor();
	
	$condicioncodcredito = '';
	if($cod_creditoFK != ''){
		$condicioncodcredito = " and cod_creditoFK = '$cod_creditoFK'";
	}
	
		$sql= "Select * from solicituddescuentointeres where cod_ventaFK = '$cod_ventaFK' and estado_uso = 'PENDIENTE' and estado ='APROBADO' and (tipo_pago = 'NORMAL' or tipo_pago = 'PARCIAL')".$condicioncodcredito;

		
   
   $stmt = $mysqli->prepare($sql);
   


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 


$estadosolicitudinteres = false;
 if ($valor>0)
 {
	  $estadosolicitudinteres = true;
 }
 
 
 
 //Comprobar si no existe una solicitud pendiente PARCIAL
 
 
		$sql= "Select * from solicituddescuentointeres where cod_ventaFK = '$cod_ventaFK' and estado_uso = 'PENDIENTE' and tipo_pago = 'PARCIAL' and estado != 'RECHAZADO'";

		// echo $sql;
		// exit;
   
   $stmt = $mysqli->prepare($sql);
   


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 



 if ($valor>0)
 {
	  $estadosolicitudinteres = true;
 }
 
//comprobar si no existe una solicitud pendiente NORMAL
	$sql= "Select * from solicituddescuentointeres where cod_ventaFK = '$cod_ventaFK' and estado_uso = 'PENDIENTE' and tipo_pago = 'NORMAL' and estado != 'RECHAZADO'";

		// echo $sql;
		// exit;
   
   $stmt = $mysqli->prepare($sql);
   


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 



 if ($valor>0)
 {
	  $estadosolicitudinteres = true;
 }
 
 mysqli_close($mysqli);
return $estadosolicitudinteres;
}




function  buscarvistaVenta($buscar,$cod_usuarioFK)
{
$mysqli=conectar_al_servidor();



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

$styleName=CargarStyleTable($styleName);
	  $pagina.="
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
	 





}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}




verificar($operacion);
?>