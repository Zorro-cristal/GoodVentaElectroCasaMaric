<?php


function calcularintereses2($buscar,$fecha1,$fecha2,$filtro1,$filtro2,$filtro3,$actualizar)
{
$mysqli=conectar_al_servidor();
$buscar=$mysqli->real_escape_string((string)$buscar);
$fecha1=$mysqli->real_escape_string((string)$fecha1);
$fecha2=$mysqli->real_escape_string((string)$fecha2);
$fechahoy=date('Y-m-d');	
$condicion="";

if($filtro1=="1"){
$condicion=" and cr.fechapago>='$fecha1' and cr.fechapago<='$fecha2'";
}
if($filtro1=="3"){
$condicion=" and cr.fechapago<='$fechahoy'";
}
$condicionpago="";
if($filtro2=="1"){
	//condicion para saber si esta pagado
$condicionpago=" and ((cr.Monto-cr.descuento)-IFNULL(pg.totalPagoCredito,0))<=0 and cr.deudaInteres<=0";
}
if($filtro2=="3"){
$condicionpago=" and (((cr.Monto-cr.descuento)-IFNULL(pg.totalPagoCredito,0))>0 or cr.deudaInteres>0)";
}
$condicioncodigo="";
$alcancePagos="";
$alcanceRegularizaciones="";
if($filtro3=="1"){
$condicioncodigo=" and cr.idcredito='$buscar'";
$alcancePagos=" where p.cod_creditoFK='$buscar'";
$alcanceRegularizaciones=" and rh.idcredito='$buscar'";
}
if($filtro3=="2"){
$condicioncodigo=" and vt.cod_venta='$buscar'";
// El vinculo a la cuota es el que determina el saldo, incluso si un pago
// historico tiene un cod_venta_fk diferente al de su credito.
$alcancePagos=" inner join credito cp on cp.idcredito=p.cod_creditoFK and cp.cod_venta='$buscar'";
$alcanceRegularizaciones=" and rh.idcredito in (select cp.idcredito from credito cp where cp.cod_venta='$buscar')";
}
	
// MySQL 5.6 materializa la vista UNION completa en cada subconsulta correlacionada.
// Filtrar ambas fuentes antes de agrupar evita releer todos los pagos por cuota.
$pagosPorCuota="select ab.cod_creditoFK,sum(ab.Monto) as totalPago,
sum(case when ab.Tipo='Pago Cuota' then ab.Monto else 0 end) as totalPagoCredito,
sum(case when ab.Tipo='Interes' then ab.Monto else 0 end) as totalPagoInteres,
max(case when ab.Monto<>0 then ab.Fecha end) as FechaUltimoPago,
case when count(case when ab.Monto<>0 and ab.Fecha is null then 1 end)>0 then null
else min(case when ab.Monto<>0 then ab.Fecha end) end as FechaPagoCredito
from (
 select p.cod_creditoFK,p.Monto,p.Tipo,p.Fecha from pago p".$alcancePagos."
 union all
 select rh.idcredito,rh.importe,'Pago Cuota',rh.fecha_historica
 from regularizacion_historica_cuota rh
 where rh.anulada_en is null and rh.clave_activa=rh.clave_regularizacion
 and rh.credito_activo=rh.idcredito and rh.venta_activa=rh.cod_venta and rh.importe>0".$alcanceRegularizaciones."
) ab group by ab.cod_creditoFK";

$sql= "select vt.cod_clienteFK,vt.TipoVenta,vt.puntoexpedicion,cr.plazo,cr.fechapago,cr.cod_venta,cr.Monto,cr.idcredito,cr.Esado,
cr.Nro_recibo,
vt.total_venta,interes,dias,vt.pago as entrega,cr.deudaInteres,
total,(totalinteres + deudaInteres) as totalinteres,totaldeuda,vt.num_factura,cr.descuento,
IFNULL(pg.FechaUltimoPago,0) as FechaUltimoPago,
IFNULL(pg.FechaPagoCredito,0) as FechaPagoCredito,
IFNULL(pg.totalPago,0) as totalPago,
IFNULL(pg.totalPagoCredito,0) as totalPagoCredito,
IFNULL(pg.totalPagoInteres,0) as totalPagoInteres,
IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0) as nroCancelado
 from  credito cr inner join venta vt on vt.cod_venta=cr.cod_venta
 left join (".$pagosPorCuota.") pg on pg.cod_creditoFK=cr.idcredito
 where (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0
    ".$condicioncodigo.$condicionpago.$condicion."  order by cr.idcredito asc";
	
	// echo $sql;
	// exit;

$pagina="";
$totalEnDescuento=0;
$TotalEnInteres=0;
$TotalEnDeuda=0;
$totalInteresActual=0;
$TotalEnPagado=0;
$TotalAPagar=0;
$TotalPagadoSinInteres=0;
$DeudaPendiente=0;
$TotalApagarSinInteres=0;
$TotalDiasAtrasado=0;
$TotalInteresesPagado=0;
$SubTotal=0;
$dias =0;
$nrodecuotasatrazado =0;
$MontoCuotas =0;
$totalPagado = "0";  
$deuda = "0";  
$tinteres = "0";  
$stylecolor="";
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$controlStyle="";
$controlVentas="";
$diff2=0;
$DiasAtrazo=0;
$SumadeudaInteres=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$FechaUltimoPago = utf8_encode($valor['FechaUltimoPago']);
$FechaPagoCredito = utf8_encode($valor['FechaPagoCredito']);  
$deudaInteres = utf8_encode($valor['deudaInteres']);
$idcredito = utf8_encode($valor['idcredito']);     
$plazo = utf8_encode($valor['plazo']);  
$fechapago = utf8_encode($valor['fechapago']);          
$cod_venta = utf8_encode($valor['cod_venta']);          
$Monto = utf8_encode($valor['Monto']); 
$totalPago = utf8_encode($valor['totalPago']); 
$Esado = utf8_encode($valor['Esado']);          
$Nro_recibo = utf8_encode($valor['Nro_recibo']);
$total_venta = utf8_encode($valor['total_venta']);
$interes = utf8_encode($valor['interes']);
$dias = utf8_encode($valor['dias']);
$total = utf8_encode($valor['total']);
$tinteres = utf8_encode($valor['totalinteres']);
$totaldeuda = utf8_encode($valor['totaldeuda']);
$entrega = utf8_encode($valor['entrega']);
$num_factura = utf8_encode($valor['num_factura']);
$descuento = utf8_encode($valor['descuento']);
$nroCancelado = utf8_encode($valor['nroCancelado']);
$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
$TipoVenta = utf8_encode($valor['TipoVenta']);
$totalPagoCredito = utf8_encode($valor['totalPagoCredito']);//TOTAL PAGADO EN CUOTA
$totalPagoInteres = utf8_encode($valor['totalPagoInteres']);//TOTAL PAGADO EN INTERESES
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);

$SumadeudaInteres= $SumadeudaInteres +$deudaInteres;


$interes = $interes /30;
$interes =round($interes, 3);

//CALCULAR EL MONTO CON DESCUENTO
$MontoConDescuento=$Monto-$descuento;
$capitalPendiente=max(0,$MontoConDescuento-$totalPagoCredito);
/*CALCULAMOS EL MONTO CON DESCUENTO*/
$MontoSobrante=$MontoConDescuento-$totalPago;
if($MontoCuotas==0){
$MontoCuotas=$MontoConDescuento-$totalPago;
}
/*VACIAMOS ALGUNAS VARIABLES*/
$deudaActua=0;
$total_interes=0;
$diff2=0;
$stylecolor=" ";
//CONDICION PARA SABER SI EL CREDITO ES UNA VENTA CANCELADA
if($nroCancelado==0){
	//CONDICION PARA SABER SI YA SE PAGO TODO
	if($capitalPendiente>0 || $deudaInteres>0){
			//ESTADO DEL PAGO
	$Esado="Pendiente";
	// El atraso del saldo pendiente no depende de la tasa ni del ultimo abono.
	$diff2=calcularDiasAtrasoCredito($fechapago,$fechahoy);
	if($actualizar=="si"){
		if($diff2>0){
			editarDiasAtrazadosdesdecalcularcredito($cod_clienteFK,$diff2);
		}
		actualizardiasatrazadocredito($idcredito,$diff2);
	}
	
	$control=$diff2>0 ? "si" : "no";
	if($control=="si"){
	$TotalApagarSinInteres=$TotalApagarSinInteres+($MontoConDescuento-($totalPagoCredito));
	//CALCULAMOS EL NRO DE CUOTAS ATRAZADAS
	$nrodecuotasatrazado=$nrodecuotasatrazado+1;
	//CONDICION PARA SABER SI HAY INTERESES EN %
	if($interes!=0){
		/*CALCULAMOS EL DIA DE GRACIA*/
	$fechahoy=date('Y-m-d');	
	$datetime1= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechahoy)))); 
	$Fecha1=strtotime($FechaUltimoPago);
	$Fecha2=strtotime($fechapago);
	if($FechaPagoCredito=="0" ){
		$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));	
	}else{
		if($Fecha1 < $Fecha2){
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$fechapago))));		
			}else{
				$datetime2= new DateTime(date('y-m-d',strtotime(str_replace('/','-',$FechaUltimoPago))));		
			}		
	}
	$interval=$datetime2->diff($datetime1);
    $diff=$interval->format('%a');
	
	
	

	
	$diasGracia=$diff2-$dias;
	if($diasGracia>0){
		//CALCULAMOS EL MONTO SOBRANTE
	$montoIn=$MontoConDescuento-$totalPagoCredito;	
	/*CALCULAMOS EL INTERES*/
	$i=($interes*($Monto - $totalPagoCredito))/100;//                                                       aca modifique para que me salga bien el interes
	$total_interes=($i*$diff);
	$total_interes = ceil($total_interes / 1000) * 1000;
	//CALCUMOS EL TOTAL A PAGAR
	$total=$montoIn+$total_interes;
	$deudaActua=$montoIn+$total_interes + $deudaInteres;
	
	if($actualizar=="si"){
	actualizarTotalCuota($idcredito,$total,$total_interes,$capitalPendiente);
	}
	
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito + $deudaInteres;
	$total=$deudaActua;
	if($actualizar=="si"){
    actualizarTotalCuota($idcredito,$total,0,$capitalPendiente);
	}
	}	
	}else{
	
	$deudaActua=$capitalPendiente+$deudaInteres;
	$total=$deudaActua;
	 if($actualizar=="si"){
	 actualizarTotalCuota($idcredito,$total,0,$capitalPendiente);
	}		
	}
			$DeudaPendiente=$DeudaPendiente+$deudaActua;
	}else{
	
	$deudaActua=$MontoConDescuento-$totalPagoCredito + $deudaInteres;
	$total=$deudaActua;
	if($actualizar=="si"){
	 actualizarTotalCuota($idcredito,$total,0,$capitalPendiente);
	}
	}
	
	
	
	}else{
	$Esado="Pagado";
	$stylecolor="background-color: #ccc;color:#000";
	$deudaActua=0;
	$total=0;
	$diff2=0;
	
	}
	
	}else{
	
	
	if(($MontoConDescuento+$tinteres)>$totalPago){
	 $Esado="Pendiente";
	 $diff2=0;
     $deudaActua=($MontoConDescuento+$tinteres)-$totalPago + $deudaInteres;
	 $total=$MontoConDescuento-$totalPago;
	 $stylecolor="text-decoration: line-through;";
	
	}else{
		$Esado="Pagado";
	$stylecolor="background-color: #ccc;color:#000";
	$deudaActua=0;
	$diff2=0;
	$total=0;
	}
    	
	
}

 

$totalInteresActual=$totalInteresActual+$total_interes + $deudaInteres;

$deuda=$deuda+$deudaActua;

if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}


$TotalPagadoSinInteres=$TotalPagadoSinInteres+$totalPagoCredito;
$TotalInteresesPagado=$TotalInteresesPagado+$totalPagoInteres;
$SubTotal=$SubTotal+$Monto;
$totalEnDescuento=$totalEnDescuento+$descuento;
$TotalEnInteres=$TotalEnInteres+$total_interes;
$TotalEnDeuda=$TotalEnDeuda+$total;
$TotalEnPagado=$TotalEnPagado+$totalPago;
$TotalAPagar=$TotalAPagar+$deudaActua;
$TotalDiasAtrasado=$TotalDiasAtrasado+$diff2;
$DiasAtrazo=max($DiasAtrazo,$diff2);


}
if($DeudaPendiente==0){
	$TotalApagarSinInteres=$MontoCuotas;
	$MontoCuota=$MontoCuotas;
	$DeudaPendiente=$MontoCuotas;
}
if($DeudaPendiente<0){
	$DeudaPendiente=0;
}
if($TotalApagarSinInteres<0){
	$TotalApagarSinInteres=0;
}

}



// Capital, cobros y cargos registrados conservan su importe exacto.
// El interes calculado ya aplica su redondeo al calcular cada cuota.


$datos[0]=$totalEnDescuento;
$datos[1]=$TotalEnInteres;
$datos[2]=$TotalEnDeuda;
$datos[3]=$TotalEnPagado;
$datos[4]=$TotalAPagar;
$datos[5]=$TotalDiasAtrasado;
$datos[6]=$nrodecuotasatrazado;
$datos[7]=$TotalApagarSinInteres;
$datos[8]=$DeudaPendiente;
$datos[9]=$stylecolor;
$datos[10]=$totalInteresActual;
$datos[11]=$SubTotal;
$datos[12]=$TotalInteresesPagado;
$datos[13]=$TotalPagadoSinInteres;
$datos[14]=$tinteres;
$datos[15]=$DiasAtrazo;
$datos[16]=$SumadeudaInteres;

 mysqli_close($mysqli);
return $datos;
}

function calcularDiasAtrasoCredito($fechaVencimiento,$fechaReferencia)
{
	// No convertir fechas desconocidas o cero en vencimientos ficticios.
	foreach(array($fechaVencimiento,$fechaReferencia) as $fecha){
		if(!is_string($fecha) || !preg_match('/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/D',$fecha,$partes)
			|| !checkdate((int)$partes[2],(int)$partes[3],(int)$partes[1])){
			return 0;
		}
	}
	$vencimiento=DateTime::createFromFormat('!Y-m-d',$fechaVencimiento);
	$referencia=DateTime::createFromFormat('!Y-m-d',$fechaReferencia);
	return max(0,(int)$vencimiento->diff($referencia)->format('%r%a'));
}

function actualizarTotalCuota($idcredito,$total,$totalinteres,$totaldeuda){
	
	$mysqli=conectar_al_servidor(); 
	$consulta1="Update credito set total=?,totalinteres=?,totaldeuda=? 
	where idcredito='$idcredito' and (totalinteres!='$totalinteres' or total!='$total' or totaldeuda!='$totaldeuda') ";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$total,$totalinteres,$totaldeuda); 

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
}
function editarDiasAtrazadosdesdecalcularcredito($codCliente,$nroDias)
{
	
$mysqli=conectar_al_servidor(); 
$consulta1="Update cliente set totaldias='$nroDias' where cod_cliente='$codCliente' and totaldias<'$nroDias' ";	
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
	mysqli_close($mysqli);
}
function actualizardiasatrazadocredito($idcredito,$nroDias)
{
	
$mysqli=conectar_al_servidor(); 
$consulta1="Update credito set diasatrasados='$nroDias' where idcredito='$idcredito' ";	
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

mysqli_close($mysqli);
	
}


function limpiarNumero($valor) {
    // Quitamos puntos de miles y espacios, luego convertimos a float
    $limpio = str_replace(['.', ' ', ','], '', $valor);
    return is_numeric($limpio) ? (float)$limpio : 0;
}



function verificar_fecha_expiracion($fecha)
{ 


	$fecha=date_create($fecha);
	$fecha=date_format($fecha,"Y-m-d H:i:s");
	$fecha = strtotime($fecha);

	$fecha_2 = date('Y-m-d H:i:s');
 
$fecha_2=strtotime($fecha_2);

 if($fecha_2>$fecha)
 {
	 return "si";
 }else
 {
	 return "no";
 }

}


?>
