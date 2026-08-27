<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");

function verificar($operacion)
{
	
	
	if($operacion=="buscaroption")
{

	buscaroption();

}else {	
	
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



	


if($operacion=="nuevo" || $operacion=="editar")
{
	$idAgenda=$_POST['idAgenda'];
$idAgenda = utf8_decode($idAgenda);
	$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
	$fechaCompromiso=$_POST['fechaCompromiso'];
$fechaCompromiso = utf8_decode($fechaCompromiso);
	$estado=$_POST['estado'];
$estado = utf8_decode($estado);
	$Cod_cobrador=$_POST['Cod_cobrador'];
$Cod_cobrador = utf8_decode($Cod_cobrador);
	$cod_clienteAgenda=$_POST['cod_clienteAgenda'];
$cod_clienteAgenda = utf8_decode($cod_clienteAgenda);

$cod_DetalleCallCenter = '';
if (isset($_POST['cod_DetalleCallCenter'])) {
	$cod_DetalleCallCenter=$_POST['cod_DetalleCallCenter'];
	$cod_DetalleCallCenter = utf8_decode($cod_DetalleCallCenter);
}

abm($idAgenda,$motivo,$fechaCompromiso,$estado,$Cod_cobrador,$cod_clienteAgenda,$cod_DetalleCallCenter,$operacion);

}


if($operacion=="buscar")
{
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$cobrador=$_POST["cobrador"];
 	$cobrador=utf8_decode($cobrador);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$tipo_cliente=$_POST["tipo_cliente"];
 	$tipo_cliente=utf8_decode($tipo_cliente);
	$buscar_general=isset($_POST["buscar_general"]) ? utf8_decode($_POST["buscar_general"]) : '';
	
 	buscar($estado,$tipo,$fecha1,$fecha2,$cliente,$cobrador,$tipo_cliente,$buscar_general);

}	
if($operacion=="cuotasPendientesCliente")
{
	$codigo_cliente=isset($_POST["codigo_cliente"]) ? $_POST["codigo_cliente"] : '';
	cuotasPendientesCliente($codigo_cliente);
}
if($operacion=="buscarvista")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	buscarvista($buscar);

}
if($operacion=="actualizarEstadoClienteAgenda")
{
	$cod_agenda=$_POST['cod_agenda'];
$cod_agenda = utf8_decode($cod_agenda);	


$estado=$_POST['estado'];
$estado = utf8_decode($estado);


	actualizarEstadoClienteAgenda($cod_agenda,$estado);

}


}

}

function abm($idAgenda,$motivo,$fechaCompromiso,$estado,$Cod_cobrador,$cod_clienteAgenda,$cod_iddetalle_callcenter,$operacion)
{
	
	
if($motivo=="" || $Cod_cobrador==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

if($operacion=="nuevo")
{


$consulta1="Insert into visitascliente (fecha,Motivo,cod_clienteFK,cod_cobradorFK,fechaCompro,estado,cod_iddetalle_callcenter) values (NOW(),'$motivo',$cod_clienteAgenda,$Cod_cobrador,'$fechaCompromiso','$estado','$cod_iddetalle_callcenter')";

// echo($consulta1);
// exit;
$stmt1 = $mysqli->prepare($consulta1);
}


if($operacion=="editar")
{

$consulta1="Update visitascliente set Motivo=?,cod_clienteFK=?,cod_cobradorFK=?,fechaCompro=?,estado=? where cod_VisitasCliente=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$motivo,$cod_clienteAgenda,$Cod_cobrador,$fechaCompromiso,$estado,$idAgenda);

}

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}


function construir_condicion_busqueda_general_agenda($mysqli, $busqueda)
{
	$busqueda = trim((string)$busqueda);
	if ($busqueda === '') {
		return '';
	}

	$terminos = preg_split('/\s+/', $busqueda);
	$condiciones = array();
	foreach ($terminos as $termino) {
		$termino = trim($termino);
		if ($termino === '') {
			continue;
		}

		$terminoLike = $mysqli->real_escape_string($termino);
		$terminoLike = str_replace(array('%', '_'), array('\\%', '\\_'), $terminoLike);
		$terminoCompacto = str_replace(array(' ', '.', '-', '(', ')', '+'), '', $termino);
		$terminoCompacto = $mysqli->real_escape_string($terminoCompacto === '' ? $termino : $terminoCompacto);
		$terminoCompacto = str_replace(array('%', '_'), array('\\%', '\\_'), $terminoCompacto);

		$condiciones[] = "(
			(select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%".$terminoLike."%'
			or REPLACE(REPLACE(REPLACE((select ci_cliente from cliente where cod_cliente=cod_clienteFK),'.',''),'-',''),' ','') like '%".$terminoCompacto."%'
			or Motivo like '%".$terminoLike."%'
		)";
	}

	return count($condiciones) > 0 ? ' and '.implode(' and ', $condiciones).' ' : '';
}

function construir_condicion_cliente_agenda($mysqli, $busqueda)
{
	$busqueda = trim((string)$busqueda);
	if ($busqueda === '') {
		return '';
	}

	$terminos = preg_split('/\s+/', $busqueda);
	$condiciones = array();
	foreach ($terminos as $termino) {
		$termino = trim($termino);
		if ($termino === '') {
			continue;
		}

		$terminoLike = $mysqli->real_escape_string($termino);
		$terminoLike = str_replace(array('%', '_'), array('\\%', '\\_'), $terminoLike);
		$terminoCompacto = str_replace(array(' ', '.', '-', '(', ')', '+'), '', $termino);
		$terminoCompacto = $mysqli->real_escape_string($terminoCompacto === '' ? $termino : $terminoCompacto);
		$terminoCompacto = str_replace(array('%', '_'), array('\\%', '\\_'), $terminoCompacto);

		$condiciones[] = "(
			(select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=cod_clienteFK) like '%".$terminoLike."%'
			or REPLACE(REPLACE(REPLACE((select ci_cliente from cliente where cod_cliente=cod_clienteFK),'.',''),'-',''),' ','') like '%".$terminoCompacto."%'
		)";
	}

	return count($condiciones) > 0 ? ' and '.implode(' and ', $condiciones).' ' : '';
}

function buscar($estado,$tipo,$fecha1,$fecha2,$cliente,$cobrador,$tipo_cliente,$buscar_general='')
{
$mysqli=conectar_al_servidor();


$condicionfecha="";
if($fecha1!="" || $fecha2!=""){
	if($tipo=="compromiso" ){
		$condicionfecha=" and fechaCompro between '$fecha1' and '$fecha2' ";
	}else if($tipo=="visita"){
		$condicionfecha=" and fecha between '$fecha1' and '$fecha2 23:59:00' ";
	}else if($tipo=="visitado"){
		$condicionfecha=" and fecha between '$fecha1' and '$fecha2 23:59:00' ";
	}
}

$condicioncliente="";
if($cliente!=""){
	$condicioncliente=construir_condicion_cliente_agenda($mysqli, $cliente);
}
$condicioncobrador="";
if($cobrador!=""){
	$condicioncobrador=" and (select nombre_persona from persona where cod_persona = cod_cobradorFK) like '%$cobrador%'";
}
$condicionestado="";
if($estado!=""){
	$condicionestado=" and estado = '$estado'";
}

$condiciontipo_cliente="";
if($tipo_cliente!=""){
	$condiciontipo_cliente=" and (select tipo_cliente from cliente where cod_cliente = cod_clienteFK) = '$tipo_cliente'";
}

$condicionbusquedageneral = construir_condicion_busqueda_general_agenda($mysqli, $buscar_general);





$sql= "select estado,fechaCompro, cod_VisitasCliente, fecha, Motivo, cod_clienteFK, cod_cobradorFK ,(select nombre_persona from persona where cod_persona = cod_cobradorFK) as cobrador , (select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) as cliente , (select nombre from zona where idzona=(select idzonaFk from cliente where cod_cliente = cod_clienteFK)) as zona  from visitascliente  where cod_VisitasCliente!=''
".$condicionbusquedageneral.$condicioncliente.$condicioncobrador.$condicionestado.$condicionfecha.$condiciontipo_cliente." limit 500";

// echo($sql);
// exit;
$pagina = "";   
$filas = array();
$formato = isset($_POST['formato']) ? $_POST['formato'] : '';
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
$estado = utf8_encode($valor['estado']);  
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$cod_VisitasCliente = utf8_encode($valor['cod_VisitasCliente']);
$Motivo = utf8_encode($valor['Motivo']);     
$fecha = utf8_encode($valor['fecha']); 
$cliente = utf8_encode($valor['cliente']);     
$zona = utf8_encode($valor['zona']); 
$cobrador = utf8_encode($valor['cobrador']);  
$fechaCompro = utf8_encode($valor['fechaCompro']);  

if($estado =='Activo'){
	$estado = 'PENDIENTE';
}  
  
$fecha2 = date("d-m-Y", strtotime($fecha));
$fechaCompro2 = date("d-m-Y", strtotime($fechaCompro));
$fechaUltPago  = obtener_ult_fechapago($cod_clienteFK);

$filas[]=array(
	"codigo" => $cod_VisitasCliente,
	"fecha" => $fecha,
	"fecha_visita" => $fecha2,
	"cliente" => $cliente,
	"motivo" => $Motivo,
	"cobrador" => $cobrador,
	"fecha_compromiso" => $fechaCompro,
	"fecha_compromiso_mostrar" => $fechaCompro2,
	"fecha_ultimo_pago" => $fechaUltPago,
	"estado" => $estado,
	"codigo_cliente" => $cod_clienteFK
);

if($formato !== "json") {
 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmAgenda(this)'>
<td  id='td_datos_1' style='display:none'>".$fecha."</td>
<td    style='width:10%'>".$fecha2."</td>
<td  id='td_datos_2' style='width:25%'>".$cliente."</td>
<td  id='td_datos_3' style='width:30%'>".$Motivo."</td>
<td  id='td_datos_4' style='width:10%'>".$cobrador."</td>
<td  id='td_datos_5' style='display:none'>".$fechaCompro."</td>
<td   style='width:10%'>".$fechaCompro2."</td>
<td   style='width:10%'>".$fechaUltPago."</td>
<td  id='td_id' style='display:none'>".$cod_VisitasCliente."</td>
<td  id='td_datos_6' style='width:10%'>".$estado."</td>
<td  id='td_datos_7' style='display:none'>".$cod_clienteFK."</td>
</tr>
</table>";
	  }


}
}
     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($formato === "json" ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}



function buscarvista($buscar)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select * from zona where nombre like ?  and estado='Activo' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';
$buscar="%".$buscar."%";
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
  $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idzona=$valor['idzona'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	 $styleName=CargarStyleTable($styleName);  
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosVistaZona(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idzona."</td>
<td  id='td_datos_1' style='width:50%'>".$nombre."</td>
<td  id='td_datos_2' style='display:none'>".$estado."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function actualizarEstadoClienteAgenda($cod_agenda,$estado)
{
	$mysqli=conectar_al_servidor();
		$sql= "update visitascliente set estado = '$estado' where cod_VisitasCliente ='$cod_agenda'";
		
   
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
 
 
 
 
 if($estado == 'COBRADO'){
	 
	  $sql= "select ifnull(cod_iddetalle_callcenter,0) as cod_iddetalle_callcenter FROM visitascliente where cod_VisitasCliente ='$cod_agenda'";
		
   
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 $cod_iddetalle_callcenter = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $cod_iddetalle_callcenter=$valor['cod_iddetalle_callcenter'];
	  }
 }
 
$sql= "UPDATE detalle_callcenter SET estado ='COBRADO' where iddetalle_callcenter ='$cod_iddetalle_callcenter'";
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

}
 


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function obtener_ult_fechapago($cod_clienteFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	$sql= "select pg.Fecha,vt.cod_venta from venta vt
inner join pago pg on vt.cod_venta = pg.cod_venta_fk where vt.cod_clienteFK = '$cod_clienteFK' order by pg.Fecha desc limit 1";
		
   
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
  $styleName="tableRegistroSearch";
 $Fecha = '';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $Fecha=$valor['Fecha'];
	  }
 }
 
mysqli_close($mysqli);
return $Fecha;

}

function buscaroption()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from zona where estado='Activo' ";
		 $pagina="<option  value='' >SELECCIONAR</option>";  

   
   
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
		  
		  
		      $idzona=$valor['idzona'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$idzona' >".$nombre."</option>";   
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function cuotasPendientesCliente($codigo_cliente)
{
	$mysqli=conectar_al_servidor();
	$codigo_cliente=trim($codigo_cliente);
	if($codigo_cliente==='' || !ctype_digit((string)$codigo_cliente)){
		echo json_encode(array("1"=>"camposvacio"));
		exit;
	}

	$sql="SELECT cr.idcredito, cr.plazo, cr.fechapago, cr.cod_venta, cr.Monto,
		IFNULL(cr.descuento,0) AS descuento, IFNULL(cr.interes,0) AS tasa_interes,
		IFNULL(cr.dias,0) AS dias_gracia, IFNULL(cr.deudaInteres,0) AS deuda_interes,
		IFNULL(cr.descuentoInteres,0) AS descuento_interes,
		IFNULL(SUM(CASE WHEN pg.Tipo='Pago Cuota' THEN pg.Monto ELSE 0 END),0) AS monto_pagado,
		MAX(CASE WHEN pg.Monto<>0 THEN pg.Fecha ELSE NULL END) AS ultimo_pago
		FROM credito cr
		INNER JOIN venta vt ON vt.cod_venta=cr.cod_venta
		LEFT JOIN pago pg ON pg.cod_creditoFK=cr.idcredito
		WHERE vt.cod_clienteFK=?
		  AND cr.plazo<>'ENTREGA'
		  AND NOT EXISTS (SELECT 1 FROM cancelaciones ca WHERE ca.cod_venta=cr.cod_venta)
		GROUP BY cr.idcredito, cr.plazo, cr.fechapago, cr.cod_venta, cr.Monto,
			cr.descuento, cr.interes, cr.dias, cr.deudaInteres, cr.descuentoInteres
		ORDER BY cr.fechapago ASC, cr.idcredito ASC";
	$stmt=$mysqli->prepare($sql);
	if(!$stmt){
		echo json_encode(array("1"=>"error"));
		exit;
	}
	$stmt->bind_param("i",$codigo_cliente);
	$stmt->execute();
	$result=$stmt->get_result();
	$cuotas=array();
	$saldo_total=0;
	$hoy=date("Y-m-d");
	while($fila=mysqli_fetch_assoc($result)){
		$montoOriginal=(float)$fila["Monto"];
		$monto=max(0,$montoOriginal-(float)$fila["descuento"]);
		$pagado=(float)$fila["monto_pagado"];
		$capitalPendiente=max(0,$monto-$pagado);
		$vencida=$fila["fechapago"]<$hoy;
		$interesActual=0;
		if($vencida && $capitalPendiente>0 && (float)$fila["tasa_interes"]>0){
			$diasDesdeVencimiento=(int)((strtotime($hoy)-strtotime($fila["fechapago"]))/86400);
			if($diasDesdeVencimiento>(int)$fila["dias_gracia"]){
				$fechaInicio=$fila["fechapago"];
				if(!empty($fila["ultimo_pago"]) && $fila["ultimo_pago"]>$fechaInicio) $fechaInicio=$fila["ultimo_pago"];
				$diasInteres=max(0,(int)((strtotime($hoy)-strtotime($fechaInicio))/86400));
				$tasaDiaria=((float)$fila["tasa_interes"])/30;
				$interesActual=($tasaDiaria*($montoOriginal-$pagado)/100)*$diasInteres;
				if($interesActual>0) $interesActual=ceil($interesActual/1000)*1000;
			}
		}
		$descuentoInteres=(float)$fila["descuento_interes"];
		$deudaInteres=(float)$fila["deuda_interes"];
		if($descuentoInteres>0){
			if($descuentoInteres>=$interesActual){
				$deudaInteres=max(0,$deudaInteres-($descuentoInteres-$interesActual));
				$interesActual=0;
			}else $interesActual-=$descuentoInteres;
		}
		$interesPendiente=max(0,$interesActual+$deudaInteres);
		if($interesPendiente>0) $interesPendiente=ceil($interesPendiente/1000)*1000;
		$saldo=$capitalPendiente+$interesPendiente;
		if($saldo<=0) continue;
		$ultimoPago=!empty($fila["ultimo_pago"]) ? date("d-m-Y",strtotime($fila["ultimo_pago"])) : "-";
		$cuotas[]=array(
			"cuota"=>utf8_encode($fila["plazo"]),
			"venta"=>$fila["cod_venta"],
			"vencimiento"=>date("d-m-Y",strtotime($fila["fechapago"])),
			"ultimo_pago"=>$ultimoPago,
			"monto"=>number_format($monto,0,",","."),
			"pagado"=>number_format($pagado,0,",","."),
			"interes"=>number_format($interesPendiente,0,",","."),
			"saldo"=>number_format($saldo,0,",","."),
			"estado"=>$vencida ? "VENCIDA" : "POR VENCER",
			"vencida"=>$vencida
		);
		$saldo_total+=$saldo;
	}
	echo json_encode(array("1"=>"exito","2"=>$cuotas,"3"=>number_format($saldo_total,0,",",".")));
	exit;
}




verificar($operacion);
?>
