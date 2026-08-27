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
	
	
	$detalle_cuota=$_POST['detalle_cuota'];
	$detalle_cuota = utf8_decode($detalle_cuota);
	$motivo=$_POST['motivo'];
	$motivo = utf8_decode($motivo);
	$cod_creditoFK=$_POST['cod_creditoFK'];
	$cod_creditoFK = utf8_decode($cod_creditoFK);
	$cod_localFK='1';
	$monto=$_POST['monto'];
	$monto = quitarseparadormiles($monto);
	$montocuota=$_POST['montocuota'];
	$montocuota = quitarseparadormiles($montocuota);
	$cod_clienteFK=$_POST['cod_clienteFK'];
	$cod_clienteFK = utf8_decode($cod_clienteFK);

	
	
	
	
	abm($user,$cod_creditoFK,$monto,$cod_localFK,$detalle_cuota,$motivo,$cod_clienteFK,$montocuota);

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
	$cod_clienteFK=$_POST['cod_clienteFK'];
	$cod_clienteFK = utf8_decode($cod_clienteFK);
	
	
	
	
	nuevo_tipo_parcial($CodUsu,$monto,$cod_localFK,$totalInteres,$motivo,$cod_clienteFK,$operacion);

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

if($operacion=="buscarInforme")
{
	$fecha1=$_POST['fecha1'];
	$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
	$fecha2 = utf8_decode($fecha2);
	$estado=$_POST['estado'];
	$estado = utf8_decode($estado);
	$usuario=$_POST['usuario'];
	$usuario = utf8_decode($usuario);
	$motivo=$_POST['motivo'];
	$motivo = utf8_decode($motivo);
	$cod_credito=$_POST['cod_credito'];
	$cod_credito = utf8_decode($cod_credito);
	
	
	
	
	buscarInforme($fecha1,$fecha2,$usuario,$motivo,$cod_credito,$estado);

}	

if($operacion=="comprobarSolicitudDescuentoCredito")
{
	$codCredito=$_POST['codCredito'];
	$codCredito = utf8_decode($codCredito);
	comprobarSolicitudDescuentoCredito($codCredito);

}	

if($operacion=="comprobarSolicitudDescuentoInteresTipoParcial")
{
	$cod_clienteFK=$_POST['cod_clienteFK'];
	$cod_clienteFK = utf8_decode($cod_clienteFK);
	comprobarSolicitudDescuentoInteresTipoParcial($cod_clienteFK);

}

if($operacion=="comprobarEstadosSolicitudDescuentoInteres")
{
	$cod_clienteFK=$_POST['cod_clienteFK'];
	$cod_clienteFK = utf8_decode($cod_clienteFK);
	comprobarEstadosSolicitudDescuentoInteres($cod_clienteFK);

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
	$cod_creditoFK=$_POST['cod_creditoFK'];
	$cod_creditoFK = utf8_decode($cod_creditoFK);	
	
	
	Editar($CodUsu,$totalApro,$fecha_apro,$estado,$idABM,$cod_creditoFK);

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







function Editar($CodUsu,$totalApro,$fecha_apro,$estado,$idABM,$cod_creditoFK)
{
	
	
if($totalApro==""  || $idABM=="" || $cod_creditoFK==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();

$fechahoy=date('Y-m-d');

$consulta1="update solicituddescuentocredito set estado='$estado', cod_UsuAprobado='$CodUsu', totalaprobado='$totalApro',fecha_apro='$fecha_apro' where idsolicituddescuentocredito= $idABM";

$stmt1 = $mysqli->prepare($consulta1);



if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}


if($estado == 'APROBADO'){
	actualizar_descuento_credito($cod_creditoFK,$totalApro);
}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function actualizar_descuento_credito($cod_credito,$monto_descuento)
{
	
	
if($cod_credito==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();

$consulta1="UPDATE credito SET descuento = '$monto_descuento' WHERE idcredito = '$cod_credito'";


$stmt1 = $mysqli->prepare($consulta1);



if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

 mysqli_close($mysqli);
return true;
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



function abm($CodUsu,$cod_creditoFK,$monto,$cod_localFK,$detalle_cuota,$motivo,$cod_clienteFK,$montocuota)
{
	
	// $comprobarExistenciaOtroDescuento = comprobarEstadosSolicitudDescuentoInteres($cod_clienteFK);
	
	// if($comprobarExistenciaOtroDescuento){
		// $informacion =array("1" => "exito","2"=>"EXISTEDESCUENTO");
		// echo json_encode($informacion);	
		// exit;
	// }
	
	
	
if($monto==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


$mysqli=conectar_al_servidor();



date_default_timezone_set('America/Anguilla');    
$fecha_inser = date('Y-m-d | h:i:sa', time()); 

$consulta1="Insert into solicituddescuentocredito (totalSolic, fecha_solic, cod_creditoFK, cod_usuarioFK,estado,cod_local,detalle_cuota,motivo,cod_clienteFK,monto_cuota,tipo_solicitud)
values('$monto','$fecha_inser','$cod_creditoFK','$CodUsu','PENDIENTE',$cod_localFK,'$detalle_cuota','$motivo','$cod_clienteFK','$montocuota','DESCUENTO')";

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

function nuevo_tipo_parcial($CodUsu,$monto,$cod_localFK,$totalInteres,$motivo,$cod_clienteFK,$operacion)
{
	
	$comprobarExistenciaOtroDescuento = comprobarEstadosSolicitudDescuentoInteres($cod_clienteFK);
	
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

$consulta1="Insert into solicituddescuentointeres (totalSolic, fecha_solic, cod_usuarioFK,estado,cod_local,totalInteres,estado_uso,motivo,tipo_pago,cod_clienteFK)
values('$monto','$fecha_inser','$CodUsu','PENDIENTE',$cod_localFK,'$totalInteres','PENDIENTE','$motivo','PARCIAL','$cod_clienteFK')";



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
	
		$sql= "SELECT  idsolicituddescuentocredito,totalSolic,fecha_solic,cod_usuarioFK,cod_creditoFK,estado,cod_UsuAprobado,fecha_apro,motivo,IFNULL(monto_cuota,0) as monto_cuota,
		(select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona= cod_clienteFK ) as cliente,
		(select nombre_persona from persona where cod_persona= cod_usuarioFK ) as usuario,detalle_cuota,
		(select Nombre from local where cod_local = (SELECT cod_localFK from usuario where cod_usuario = cod_usuarioFK)) as nombre_local
		FROM solicituddescuentocredito where estado='PENDIENTE' and totalSolic > 0  ";
		

   
   $stmt = $mysqli->prepare($sql);
   
   $Style="background: none 0px 0px repeat scroll #2196f3;
   border: 2px solid #ffffff;
   border-radius: 6px;
   cursor: pointer;
   margin-top:2px;
   ";



// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
}

if ($stmt === false) {
    die("Error en la preparación de la declaración: " . $mysqli->error);
}

if (! $stmt->execute()) {
    echo "Error en la ejecución de la declaración: " . $stmt->error;
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
			  $monto_cuota=utf8_encode($valor['monto_cuota']);
		      $cod_creditoFK=utf8_encode($valor['cod_creditoFK']);
		  	  $idsolicituddescuentocredito=utf8_encode($valor['idsolicituddescuentocredito']);
		  	  $estado=utf8_encode($valor['estado']);
			  $fecha_solic=utf8_encode($valor['fecha_solic']);
			  $cod_UsuAprobado=utf8_encode($valor['cod_UsuAprobado']);
			  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $usuario=utf8_encode($valor['usuario']);
			  $nombre_local=utf8_encode($valor['nombre_local']);
			  $detalle_cuota=utf8_encode($valor['detalle_cuota']);
			  $motivo=utf8_encode($valor['motivo']);
			  $cliente=utf8_encode($valor['cliente']);
			  // $diasatraso=utf8_encode($valor['diasatraso']);
			  
			  if($estado=="APROBADO"){
				  $estadoSoli="SI";
			  }else{
				  $estadoSoli="NO";
			  }
		  	 
			 
 
			 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' onclick='obtenerdatosMensajeDetalleDescuentoCredito(this)'>
				<td  id='td_datos_1' style='width:25%'>".$total."</td>
				<td  id='td_datos_2' style='width:25%'>".$monto_cuota."</td>
				<td  id='td_datos_3' style='width:10%'>".$fecha_solic."</td>
				<td  id='td_datos_4' style='width:20%'>".$usuario."</td>
				<td  id='td_datos_5' style='width:20%'>".$detalle_cuota."</td>
				</tr>
				</table>";
				
				$pag2.="<div id='divMensajeDescuentoInteres_$idsolicituddescuentocredito'>
				<table style='width:100%;' >
				<tr id='tbSelecRegistro' onclick='obtenerdatosMensajeDetalleDescuentoCredito(this)'>
				<td style='width:65%;'>".$cliente."</td>				
				<td style='width:30%;'>".$usuario."</td>				
				<td  id='td_datos_6' style='display:none'>".number_format($total,'0',',','.')."</td>
				<td  id='td_datos_7' style='display:none'>".number_format($monto_cuota,'0',',','.')."</td>
				<td  id='td_datos_8' style='display:none'>".$fecha_solic."</td>
				<td  id='td_datos_9' style='display:none'>".$usuario."</td>
				<td  id='td_datos_10' style='display:none'>".$idsolicituddescuentocredito."</td>
				<td  id='td_datos_11' style='display:none'>".$estado."</td>
				<td  id='td_datos_12' style='display:none'>".$nombre_local."</td>
				<td  id='td_datos_13' style='display:none'>".$cod_creditoFK."</td>
				<td  id='td_datos_14' style='display:none'>".$motivo."</td>
				
				<td  id='td_datos_15' style='display:none'>".$cliente."</td>
				<td  id='td_datos_17' style='display:none'>".$detalle_cuota."</td>
				<td  id='td_datos_18' style='display:none'>".number_format($monto_cuota,'0',',','.')."</td>
				<td style='width:5%'>
				<span class='status completed' onclick='verCerrarMensajeDescuentoInteresDetalle($idsolicituddescuentocredito)' >VER</span> 				
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
function buscarInforme($fecha1,$fecha2,$usuario,$motivo,$cod_credito,$estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 $condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and fecha_solic between '$fecha1' and '$fecha2' ";
}
$condicionusuario="";
if($usuario!=""){
	$condicionusuario=" and (select nombre_persona from persona where cod_persona= cod_usuarioFK ) like '%".$usuario."%' ";
}
$condicioncod_credito="";
if($cod_credito!=""){
	$condicioncod_credito=" and cod_creditoFK = '$cod_credito' ";
}

$condicionestado="";
if($estado!=""){
	$condicionestado=" and estado = '$estado' ";
}

$condicionmotivo="";
if($motivo!=""){
	$condicionmotivo=" and motivo like '%".$motivo."%'";
}



	
		$sql= "SELECT  motivo,cod_creditoFK,detalle_cuota,cod_local,monto_cuota,
		(select nombre_persona from persona where cod_persona= cod_usuarioFK ) as usuariosoli,
		(select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona= cod_clienteFK ) as cliente
		,(select nombre_persona from persona where cod_persona= cod_UsuAprobado ) as usuarioapro,
		(select Nombre from local where cod_local = sci.cod_local) as local
		,idsolicituddescuentocredito, estado, fecha_solic, cod_UsuAprobado, totalSolic, IFNULL(totalaprobado,0) as totalaprobado FROM solicituddescuentocredito sci where 
		estado !=''  ".$condicionFecha.$condicionusuario.$condicioncod_credito.$condicionmotivo.$condicionestado." ";




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
 $totalDescuento = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {

			  $motivo=utf8_encode($valor['motivo']);
		  	  $idsolicituddescuentocredito=utf8_encode($valor['idsolicituddescuentocredito']);
		  	  $estado=utf8_encode($valor['estado']);
			  $fecha_solic=utf8_encode($valor['fecha_solic']);
			  $totalSolic=utf8_encode($valor['totalSolic']);
			  $usuariosoli=utf8_encode($valor['usuariosoli']);
			  $usuarioapro=utf8_encode($valor['usuarioapro']);
			  $cod_creditoFK=utf8_encode($valor['cod_creditoFK']);
			  $totalaprobado=utf8_encode($valor['totalaprobado']);
			  $cliente=utf8_encode($valor['cliente']);
			  $detalle_cuota=utf8_encode($valor['detalle_cuota']);
			  $local=utf8_encode($valor['local']);
			  $monto_cuota=utf8_encode($valor['monto_cuota']);
			  
			  
			  
			  $monto_cuota = ($monto_cuota != '')? number_format($monto_cuota,'0',',','.') : $monto_cuota;
			  
			  $styleEstadoUso = 'background-color:green;color:white';
			  $onclick='obtenerdatosMensajeDetalleDescuentoCredito(this)';
			  if($estado == 'APROBADO' || $estado == 'RECHAZADO'){
				  $styleEstadoUso = 'background-color:red;color:white';
				  $onclick='mensajeDescuentoCreditoFinalizado()';
			  }

			$totalDescuento += $totalaprobado;
		  	 
			 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' style='$styleEstadoUso' onclick='".$onclick."'>
				<td id='td_datos_13' style='width:10%; background-color: #efeded;color:red'>".$cod_creditoFK."</td>
				<td  id='td_datos_14' style='width:10%'>".$motivo."</td>
				<td  id='td_datos_15' style='width:10%'>".$cliente."</td>
				<td  id='td_datos_17' style='width:5%'>".$detalle_cuota."</td>
				<td  id='td_datos_7' style='width:5%'>".$monto_cuota."</td>
				<td  id='td_datos_6' style='width:5%'>".number_format($totalSolic,'0',',','.')."</td>
				<td  id='td_datos_3' style='width:5%'>".number_format($totalaprobado,'0',',','.')."</td>
				<td  id='td_datos_9' style='width:10%'>".$usuariosoli."</td>
				<td  id='' style='width:10%'>".$fecha_solic."</td>
				<td  id='' style='width:5%'>".$estado."</td>
				<td  id='' style='width:10%'>".$usuarioapro."</td>				
				<td  id='td_datos_10' style='display:none'>".$idsolicituddescuentocredito."</td>				
				<td  id='td_datos_12' style='display:none'>".$local."</td>				
				</tr>
				</table>";
				
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro,"4"=> number_format(abs($totalDescuento),'0',',','.'));
echo json_encode($informacion);	
exit;


}
function comprobarSolicitudDescuentoCredito($codCredito)
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from solicituddescuentocredito where cod_creditoFK = '$codCredito'";
   
   $stmt = $mysqli->prepare($sql);
   


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 $estadoSoli="";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 

 $comprobado = true;
$estado = '';
 if ($valor>0)
 {
	 while ($valor= mysqli_fetch_assoc($result)){
		 $comprobado = false;
		 $estado=utf8_encode($valor['estado']);
	 }
		
 }
 



 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $comprobado,"3"=>$estado);
echo json_encode($informacion);	
exit;
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