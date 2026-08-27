<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include('quitarseparadormiles.php');
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
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

	
if($operacion=="nuevo" || $operacion=="editar")
{
	
	$idliquidez=$_POST['idliquidez'];
$idliquidez = utf8_decode($idliquidez);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
	$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$cod_banco=$_POST['cod_banco'];
$cod_banco = utf8_decode($cod_banco);

abm($idliquidez,$monto,$fecha,$estado,$cod_banco,$operacion);

}

if($operacion=="buscar")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$cod_banco=$_POST['cod_banco'];
$cod_banco = utf8_decode($cod_banco);
$formato=isset($_POST['formato']) ? $_POST['formato'] : "";
$formato = utf8_decode($formato);


	buscar($fecha1,$fecha2,$estado,$cod_banco,$formato);

}	



if ($operacion == "buscar_informe_liquidez_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$cod_banco = $_POST['cod_banco'];
		$cod_banco = utf8_decode($cod_banco);
		$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
		
		buscar_informe_liquidez_general($anho, $cod_banco, $formato);
}

if ($operacion == "buscar_informe_liquidez_general_grafica") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$cod_banco = $_POST['cod_banco'];
		$cod_banco = utf8_decode($cod_banco);
		
		buscar_informe_liquidez_general_grafica($anho,$cod_banco);
	}


}


function abm($idliquidez,$monto,$fecha,$estado,$cod_banco,$operacion)
{
	

/* if( $monto=="" || $fecha==""  || $cod_banco==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
} */



$mysqli=conectar_al_servidor(); 

if($operacion=="nuevo") 
{

$consulta1="Insert into liquidez (monto,fecha,estado,idbanco_liquidezFK)
values('$monto','$fecha','$estado','$cod_banco')";

// echo $consulta1;
// exit;

$stmt1 = $mysqli->prepare($consulta1);
}


if($operacion=="editar")
{

$consulta1="Update liquidez set monto=?,fecha=?,estado=?, idbanco_liquidezFK=?  where idliquidez=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$monto,$fecha,$estado,$cod_banco,$idliquidez); 

}



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}



function buscar($fecha1,$fecha2,$estado,$idbanco_liquidez,$formato="")
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 
	 $condicionfecha="";
	 if($fecha1!="" && $fecha2!=""){
		$condicionfecha =" and fecha between '$fecha1' and  '$fecha2'"; 
	 }
	 
	$condicionbanco="";
	 if($idbanco_liquidez != ""){
		$condicionbanco =" and idbanco_liquidezFK  = '$idbanco_liquidez'"; 
	 }
	 
	 
		 $sql= "Select idliquidez,monto,fecha,estado,idbanco_liquidezFK,
		 (SELECT descripcion FROM banco_liquidez WHERE idbanco_liquidez = idbanco_liquidezFK) as banco
		 FROM liquidez
		where estado='$estado' ".$condicionfecha.$condicionbanco." order by fecha desc";


// echo $sql;
// exit;
 
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 
 $styleName="tableRegistroSearch";
 $total = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idliquidez=$valor['idliquidez'];
		  	  $monto=utf8_encode($valor['monto']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $banco=utf8_encode($valor['banco']);
		  	  $idbanco_liquidezFK=utf8_encode($valor['idbanco_liquidezFK']);
		  	  $monto_formateado=number_format($monto,'0',',','.');
			  
		  	 $total=$total+$monto;

			  $filas[]=array(
				  "idliquidez" => $idliquidez,
				  "monto" => (float) $monto,
				  "monto_formateado" => $monto_formateado,
				  "fecha" => $fecha,
				  "banco" => $banco,
				  "estado" => $estado,
				  "idbanco_liquidez" => $idbanco_liquidezFK
			  );

			  if($formato!="json"){
		  	    $styleName=CargarStyleTable($styleName);
			    $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmLiquidez(this)' >
<td id='td_id' style='display:none'>".$idliquidez."</td>
<td  id='td_datos_1' style='width:30%'>".$monto_formateado."</td>
<td  id='td_datos_2' style='width:30%'>".$fecha."</td>
<td  id='td_datos_3' style='width:30%'>".$banco."</td>
<td  id='td_datos_4' style='display:none'>".$estado."</td>
<td  id='td_datos_5' style='display:none'>".$idbanco_liquidezFK."</td>
</tr>
</table>";
			  }
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $formato=="json" ? $filas : $pagina,"3" => $nroRegistro,"4" =>  number_format($total,'0',',','.'));
echo json_encode($informacion);	
exit;


}



function buscar_informe_liquidez_general($anho,$cod_banco,$formato="")
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	$filas = array();
	$devolverArray = strtolower($formato)==="json";
	
	for($x = 1; $x <= 31; $x++){
		$styleName = CargarStyleTable($styleName);
		$totalesMes = array();
		if(!$devolverArray){
		$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
		<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		}
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = obtener_total_compra_dia($anho,$i,$x,$cod_banco);
			$totalesMes[] = number_format($total, '0', ',', '.');
			if(!$devolverArray){
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			$pagina.= $td;
			}
		}
		
		$filas[] = array("dia" => $x, "meses" => $totalesMes, "clase_fila" => $styleName);
		if(!$devolverArray){
		$pagina.="</tr>
		</table>";
		}
	}

	$informacion = array("1" => "exito", "2" => ($devolverArray ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}

function obtener_total_compra_dia($anho,$mes,$dia,$cod_banco)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and fecha = '$fecha' ";
	
	
	$condicionbanco = "";
	if ($cod_banco != "") {
		$condicionbanco = " and idbanco_liquidezFK ='" . $cod_banco . "'";
	}
 
	$sql = "SELECT sum(Monto) as total FROM liquidez WHERE estado = 'Activo'".$condicionFecha.$condicionbanco;
 
 // echo $sql;
 // exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$total = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$total = $valor['total'];
		}
	}
	
	return $total;
}



function buscar_informe_liquidez_general_grafica($anho,$cod_banco)
{
	
	
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	

	
	$array_total_ventas_1 = array();
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {

			$total = obtener_total_compra_dia($anho,$i,$x,$cod_banco);
			if($i == 1){
				$totalVenta1 += $total;

			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	
	array_push($array_total_ventas_1,$totalVenta1);
	array_push($array_total_ventas_1,$totalVenta2);
	array_push($array_total_ventas_1,$totalVenta3);
	array_push($array_total_ventas_1,$totalVenta4);
	array_push($array_total_ventas_1,$totalVenta5);
	array_push($array_total_ventas_1,$totalVenta6);
	array_push($array_total_ventas_1,$totalVenta7);
	array_push($array_total_ventas_1,$totalVenta8);
	array_push($array_total_ventas_1,$totalVenta9);
	array_push($array_total_ventas_1,$totalVenta10);
	array_push($array_total_ventas_1,$totalVenta11);
	array_push($array_total_ventas_1,$totalVenta12);



	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	
	$array_total_ventas_2 = array();
	$anho2 = $anho;
	$anho2 = intval($anho2);
	$anho2--;
	
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {

			$total = obtener_total_compra_dia($anho2,$i,$x,$cod_banco);
			if($i == 1){
				$totalVenta1 += $total;

			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	array_push($array_total_ventas_2,$totalVenta1);
	array_push($array_total_ventas_2,$totalVenta2);
	array_push($array_total_ventas_2,$totalVenta3);
	array_push($array_total_ventas_2,$totalVenta4);
	array_push($array_total_ventas_2,$totalVenta5);
	array_push($array_total_ventas_2,$totalVenta6);
	array_push($array_total_ventas_2,$totalVenta7);
	array_push($array_total_ventas_2,$totalVenta8);
	array_push($array_total_ventas_2,$totalVenta9);
	array_push($array_total_ventas_2,$totalVenta10);
	array_push($array_total_ventas_2,$totalVenta11);
	array_push($array_total_ventas_2,$totalVenta12);



	$informacion = array("1" => "exito","3"=>$array_total_ventas_1,"4"=>$array_total_ventas_2,"5"=>$anho,"6"=>$anho2);
	echo json_encode($informacion);
	exit;
}




verificar($operacion);
?>
