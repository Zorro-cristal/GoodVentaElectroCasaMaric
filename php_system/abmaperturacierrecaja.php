<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include('quitarseparadormiles.php');
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
if($resp!="ok" && $operacion!="buscaroption"){
$informacion =array("1" => "UI");
echo json_encode($informacion);	
exit;
}




if($operacion=="nuevo" || $operacion=="editar")
{
$idarqueocaja=$_POST['idarqueocaja'];
$idarqueocaja = utf8_decode($idarqueocaja);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$montoapertura=$_POST['montoapertura'];
$montoapertura = quitarseparadormiles($montoapertura);
$montocierre=$_POST['montocierre'];
$montocierre = quitarseparadormiles($montocierre);
$fechaapertura=$_POST['fechaapertura'];
$fechacierre=$_POST['fechacierre'];
$caja_idcaja=$_POST['caja_idcaja'];
$caja_idcaja = utf8_decode($caja_idcaja);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$codusuarioap=$_POST['codusuarioap'];
$codusuarioap = utf8_decode($codusuarioap);
$codusuarioce = $user;
abm($idarqueocaja,$cod_local,$caja_idcaja,$montoapertura,$montocierre,$fechaapertura,$fechacierre,$estado,$codusuarioap,$codusuarioce,$operacion);

}

if($operacion=="BuscarAbmCajaApp")
{ 
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
BuscarAbmCajaApp($formato);

}	

if($operacion=="nuevoCajaApp")
{
$idabm=$_POST['idabm'];
$idabm = utf8_decode($idabm);
$codApertura=$_POST['codApertura'];
$codApertura = utf8_decode($codApertura);
nuevoCajaApp($idabm,$codApertura);

}	

if($operacion=="controldecaja")
{
$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$Usuario=$_POST['Usuario'];
$Usuario = utf8_decode($Usuario);

controldecaja($buscar,$cod_local,$Usuario);

}	

if($operacion=="buscarmoviemientocaja")
{
$idArqeoFk=$_POST['idArqeoFk'];
$idArqeoFk = utf8_decode($idArqeoFk);
buscarmoviemientocaja($idArqeoFk);

}	

if($operacion=="buscarvista")
{
$caja=$_POST['caja'];
$caja = utf8_decode($caja);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$local=$_POST['local'];
$local = utf8_decode($local);
$fechaapertura=$_POST['fechaapertura'];
$fechaapertura = utf8_decode($fechaapertura);
$fechafin=$_POST['fechafin'];
$fechafin = utf8_decode($fechafin);
$usuario=$_POST['usuario'];
$usuario = utf8_decode($usuario);
buscarvista($fechaapertura,$fechafin,$caja,$estado,$local,$usuario);

}

if($operacion=="buscarcajaapp")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
buscarcajaapp($fecha1,$fecha2,$cobrador,$estado,$formato);

}	


if($operacion=="buscarinformecajacobrador")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$fecha_apertura=$_POST['fecha_apertura'];
$fecha_apertura = utf8_decode($fecha_apertura);
$fecha_cierre=$_POST['fecha_cierre'];
$fecha_cierre = utf8_decode($fecha_cierre);
buscarinformecajacobrador($fecha1,$fecha2,$cobrador,$estado,$fecha_apertura,$fecha_cierre);
}	

}

function abm($idarqueocaja,$cod_local,$caja_idcaja,$montoapertura,$montocierre,$fechaapertura,$fechacierre,$estado,$codusuarioap,$codusuarioce,$operacion)
{
	
	
$mysqli=conectar_al_servidor();

if($operacion=="nuevo")
{
 
$consulta1="Insert into arqueocaja (cod_local,caja_idcaja,montoapertura,fechaapertura,estado,codusuarioap,montocierre)
values(?,?,?,?,?,?,'0')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$cod_local,$caja_idcaja,$montoapertura,$fechaapertura,$estado,$codusuarioap);
 
}
 
if($operacion=="editar")
{

$consulta1="Update arqueocaja set codusuarioce=?,montocierre=?,fechacierre=?,estado='Cerrado' where idarqueocaja=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$codusuarioce,$montocierre,$fechacierre,$idarqueocaja); 

}
 

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}




function controldecaja($buscar,$cod_local,$user)
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select idarqueocaja, caja_idcaja, montoapertura, montocierre, fechaapertura, fechacierre, estado, codusuarioap, codusuarioce,
		(Select nombre_persona from persona where cod_persona=codusuarioap) as usuarioap
		from arqueocaja where caja_idcaja='$buscar' and estado='Activo' and cod_local='$cod_local' and codusuarioap='$user' ";
		 $pagina="";  

   // echo($sql);
   // exit; 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalRecaudado= 0;
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idarqueocaja=$valor['idarqueocaja'];
		  	  $caja_idcaja=utf8_encode($valor['caja_idcaja']);
		  	  $montoapertura=utf8_encode($valor['montoapertura']);
		  	  $montocierre=utf8_encode($valor['montocierre']);
		  	  $fechaapertura=utf8_encode($valor['fechaapertura']);
		  	  $fechacierre=utf8_encode($valor['fechacierre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $codusuarioap=utf8_encode($valor['codusuarioap']);
		  	  $codusuarioce=utf8_encode($valor['codusuarioce']);
		  	  $usuarioap=utf8_encode($valor['usuarioap']);
		  	  $totalRecaudado=ObtenerTotalCaja($idarqueocaja,$montoapertura);
		  	 			  
	  }
	  
	  $informacion =array("1" => "exito","2" =>"1","3"=>$idarqueocaja,"4"=>$caja_idcaja,"5"=>  number_format($montoapertura,'0',',','.')
	  ,"6"=>  number_format($montocierre,'0',',','.'),"7"=>$fechaapertura,"8"=>$fechacierre,"9"=>$estado,"10"=>  number_format($totalRecaudado,'0',',','.')
	  ,"11"=>$codusuarioap ,"12"=>$usuarioap);
echo json_encode($informacion);	
exit;
 }else{
	 $totalRecaudado=obternerultimacajauser($buscar,$cod_local,$user);
	$informacion =array("1" => "exito","2" =>"0","3"=> number_format($totalRecaudado,'0',',','.'));
echo json_encode($informacion);	
exit;
 
 }
  
}

function obternerultimacajauser($buscar,$cod_local,$user)
{
	$mysqli=conectar_al_servidor();
	
		$sql="Select idarqueocaja,montoapertura
		from arqueocaja where caja_idcaja='$buscar' and cod_local='$cod_local' and codusuarioap='$user' order by  idarqueocaja desc limit 1";

   // echo($sql);
   // exit;
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalRecaudado= 0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idarqueocaja=$valor['idarqueocaja'];
		  	  $montoapertura=utf8_encode($valor['montoapertura']);
		  	  $totalRecaudado=ObtenerTotalCaja($idarqueocaja,$montoapertura);
		  	 			  
	  } 
	
 
 }
 
 return $totalRecaudado;
 
 

}


/*Buscar Registro*/
function buscarvista($fechaapertura,$fechafin,$caja,$estado,$local,$usuario)
{
	
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
$filas=array();

$condicionFechaInicio="";
if($fechaapertura!=""){
$fechaapertura=$fechaapertura." 00:00:00";
$condicionFechaInicio=" and fechaapertura>='$fechaapertura'";	
}
$condicionFechaCierre="";
if($fechafin!=""){
$fechafin=$fechafin." 00:00:00";
$condicionFechaCierre=" and fechacierre>='$fechafin'";	
}
$condicionCaja="";
if($caja!=""){
$condicionCaja=" and (Select cajanro from caja l where l.idcaja=caja_idcaja) like '%".$caja."%'";	
}
$condicionEstado="";
if($estado!=""){
$condicionEstado=" and estado='$estado' ";	
}
$condicionLocal="";
if($local!=""){
$condicionLocal=" and ap.cod_local='$local' ";	
}
$condicionUsuario="";
if($usuario!=""){
$condicionUsuario=" and (Select nombre_persona from persona where cod_persona=codusuarioap) like '%".$usuario."%'";		
}

$sql= "Select idarqueocaja, caja_idcaja, montoapertura, montocierre, fechaapertura, fechacierre, estado, codusuarioap, codusuarioce,cod_local,
(Select cajanro from caja l where l.idcaja=caja_idcaja) as cajanro,
(ifnull((Select sum(Monto) from pago where codApertura=idarqueocaja),0)) as cobros,
(ifnull((Select sum(monto) from gastos where codApertura=idarqueocaja and tipo='Egreso'),0)) as egreso,
(ifnull((Select sum(monto) from gastos where codApertura=idarqueocaja and tipo='Ingreso'),0)) as ingreso,
(Select nombre_persona from persona where cod_persona=codusuarioap) as usuarioap,
(Select nombre_persona from persona where cod_persona=codusuarioce) as usuariocie,
(Select Nombre from local l where l.cod_local=ap.cod_local) as nombrelocal
from arqueocaja ap where  estado!='Cancelado' ".$condicionFechaInicio.$condicionFechaCierre.$condicionEstado.$condicionLocal.$condicionUsuario." order by idarqueocaja desc limit 100  ";

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


$Totaldiferencia = 0;
$TotalApertura = 0;
$TotalCierre = 0;

$TotalIngreso = 0;
$TotalEgreso = 0;
$TotalCobros = 0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$idarqueocaja = utf8_encode($valor['idarqueocaja']); 
$caja_idcaja = utf8_encode($valor['caja_idcaja']);          
$montoapertura = utf8_encode($valor['montoapertura']);          
$montocierre = utf8_encode($valor['montocierre']); 
$fechaapertura = utf8_encode($valor['fechaapertura']); 
$fechacierre = utf8_encode($valor['fechacierre']); 
$estado = utf8_encode($valor['estado']); 
$codusuarioap = utf8_encode($valor['codusuarioap']); 
$codusuarioce = utf8_encode($valor['codusuarioce']); 
$cod_local = utf8_encode($valor['cod_local']); 
$nombrelocal = utf8_encode($valor['nombrelocal']); 
$cajanro = utf8_encode($valor['cajanro']); 
$usuarioap = utf8_encode($valor['usuarioap']); 
$usuariocie = utf8_encode($valor['usuariocie']); 



$cobros = utf8_encode($valor['cobros']); 
$egreso = utf8_encode($valor['egreso']); 
$ingreso = utf8_encode($valor['ingreso']); 

$TotalIngreso =  $TotalIngreso +$ingreso ;
$TotalEgreso =$TotalEgreso +$egreso ;
$TotalCobros = $TotalCobros + $cobros;


$TotalApertura += $montoapertura;
$TotalCierre += $montocierre;

$diferencia = ($TotalCobros + $TotalIngreso) - $TotalEgreso;
$diferencia = abs($diferencia);
 
$fechaapertura2 = date("d-m-Y H:i:s", strtotime($fechaapertura));
$fechacierre2="";
if($fechacierre!=""){
	$fechacierre2 = date("d-m-Y H:i:s", strtotime($fechacierre));
}

$filas[]=array(
	"id_arqueo" => $idarqueocaja,
	"id_caja" => $caja_idcaja,
	"cod_usuario_apertura" => $codusuarioap,
	"cod_usuario_cierre" => $codusuarioce,
	"cod_local" => $cod_local,
	"local" => $nombrelocal,
	"caja" => $cajanro,
	"estado" => $estado,
	"fecha_apertura" => $fechaapertura,
	"fecha_apertura_formateada" => $fechaapertura2,
	"fecha_cierre" => $fechacierre,
	"fecha_cierre_formateada" => $fechacierre2,
	"monto_apertura" => floatval($montoapertura),
	"monto_apertura_formateado" => number_format($montoapertura,'0',',','.'),
	"monto_cierre" => floatval($montocierre),
	"monto_cierre_formateado" => number_format($montocierre,'0',',','.'),
	"egresos" => floatval($TotalEgreso),
	"egresos_formateado" => number_format($TotalEgreso,'0',',','.'),
	"diferencia" => floatval($diferencia),
	"diferencia_formateada" => number_format($diferencia,'0',',','.'),
	"usuario_apertura" => $usuarioap,
	"usuario_cierre" => $usuariocie
);
 
	    	  $styleName=CargarStyleTable($styleName);
		  if($formato!='json'){
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosaperturacierrecaja(this)'>
<td id='td_id_1' style='display:none'>".$idarqueocaja."</td>
<td id='td_id_2' style='display:none'>".$caja_idcaja."</td>
<td id='td_id_3' style='display:none'>".$codusuarioap."</td>
<td id='td_id_4' style='display:none'>".$codusuarioce."</td>
<td id='td_id_5' style='display:none'>".$cod_local."</td>
<td id='td_datos_2' style='display:none'>".$nombrelocal."</td>
<td id='td_datos_1' style='width:5%'>".$cajanro."</td>
<td id='td_datos_9' style='width:10%'>".$estado."</td>
<td id='td_datos_3' style='display:none'>".$fechaapertura2."</td>
<td id='td_datos_4' style='display:none'>".$fechacierre2."</td>

<td   style='width:10%'>".$fechaapertura2."</td>
<td   style='width:10%'>".$fechacierre2."</td>

<td id='td_datos_7' style='width:10%'>".number_format($montoapertura,'0',',','.')."</td>
<td id='td_datos_8' style='width:10%'>".number_format($montocierre,'0',',','.')."</td>
<td id='' style='width:10%'>".number_format($TotalEgreso ,'0',',','.')."</td>
<td id='' style='width:10%'>".number_format($diferencia ,'0',',','.')."</td>
<td id='td_datos_5' style='width:15%'>".$usuarioap."</td>
<td id='td_datos_2' style='width:10%'>".$nombrelocal."</td>
<td id='td_datos_6' style='display:none'>".$usuariocie."</td>
</tr>
</table>";
		  }


}
}

$Totaldiferencia = ($TotalCobros + $TotalIngreso) - $TotalEgreso;


$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4"=>number_format($Totaldiferencia,'0',',','.'),"5"=>number_format($TotalApertura,'0',',','.'),"6"=>number_format($TotalCierre,'0',',','.'),"7"=>number_format($TotalIngreso,'0',',','.'),"8"=>number_format($TotalEgreso,'0',',','.'),"9"=>number_format($TotalCobros,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscarcajaapp($fecha1,$fecha2,$cobrador,$estado,$formato='')
{
	
$mysqli=conectar_al_servidor();

$condicionFechas="";
if($fecha1!="" && $fecha2!=""){
$condicionFechas="and fechaapertura>='".$fecha1." 00:00:00' and fechaapertura <='".$fecha2." 23:59:59' ";	
}
$condicionCobrador="";
if($cobrador!=""){
	$condicionCobrador=" and (Select nombre_persona from persona where cod_persona=cod_cobrador) like '%".$cobrador."%' ";
}
$condicionestado="";
if($estado!=""){
	$condicionestado=" and estado='".$estado."' ";
}


$sql= "Select idaperturacajaapp, fechaapertura, fechacierre, estado, IFNULL(montocierre,0) as montocierre, cod_cobrador,
(Select nombre_persona from persona where cod_persona=cod_cobrador) as usuario
from aperturacajaapp ap where  estado!='Cancelado' ".$condicionFechas.$condicionCobrador.$condicionestado." order by idaperturacajaapp desc limit 100  ";
$pagina = "";   
$filas = array();
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

$totalRecaudado = 0;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$idaperturacajaapp = utf8_encode($valor['idaperturacajaapp']); 
$fechaapertura = utf8_encode($valor['fechaapertura']);          
$fechacierre = utf8_encode($valor['fechacierre']);          
$estado = utf8_encode($valor['estado']); 
$montocierre = utf8_encode($valor['montocierre']); 
$cod_cobrador = utf8_encode($valor['cod_cobrador']); 
$usuario = utf8_encode($valor['usuario']); 

$totalRecaudado += $montocierre;

$filas[]=array(
	"codigo"=>$idaperturacajaapp,
	"cobrador"=>$usuario,
	"fecha_apertura"=>$fechaapertura,
	"fecha_cierre"=>$fechacierre,
	"monto_recaudado"=>(float)$montocierre,
	"monto_recaudado_formateado"=>number_format($montocierre,'0',',','.'),
	"estado"=>$estado
);

	    	 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosaperturacierrecajaapp(this)'>
<td id='td_id_1' style='display:none'>".$idaperturacajaapp."</td>
<td id='td_datos_1' style='width:10%'>".$usuario."</td>
<td id='td_datos_9' style='width:10%'>".$fechaapertura."</td>
<td id='td_datos_3' style='width:10%'>".$fechacierre."</td>
<td id='td_datos_7' style='width:10%'>".number_format($montocierre,'0',',','.')."</td>
<td id='td_datos_5' style='width:10%'>".$estado."</td>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3" => $nroRegistro, "4"=>number_format($totalRecaudado,'0',',','.'));
echo json_encode($informacion);	
exit;
}
function buscarinformecajacobrador($fecha1,$fecha2,$cobrador,$estado,$fecha_apertura,$fecha_cierre)
{
	
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$filas=array();

$condicionFechas="";
if($fecha1!="" && $fecha2!=""){
$condicionFechas="and fechaapertura>='".$fecha1." 00:00:00' and fechaapertura <='".$fecha2." 23:59:59' ";	
}
$condicionCobrador="";
if($cobrador!=""){
	$condicionCobrador=" and (Select nombre_persona from persona where cod_persona=cod_cobrador) like '%".$cobrador."%' ";
}
$condicionestado="";
if($estado!=""){
	$condicionestado=" and estado='".$estado."' ";
}


$condicionfechaapertura="";
if($fecha_apertura!=""){
$condicionfechaapertura=" and DATE(fechaapertura) = '".$fecha_apertura."' ";	
}

$condicionfechacierre="";
if($fecha_cierre!=""){
$condicionfechacierre=" and DATE(fechacierre) = '".$fecha_cierre."' ";	
}

$sql= "Select idaperturacajaapp, fechaapertura, fechacierre, estado, IFNULL(montocierre,0) as montocierre, cod_cobrador,
(Select nombre_persona from persona where cod_persona=cod_cobrador) as usuario
from aperturacajaapp ap where  estado!='Cancelado' ".$condicionFechas.$condicionCobrador.$condicionestado.$condicionfechaapertura.$condicionfechacierre." order by idaperturacajaapp desc limit 100  ";


// echo $sql;
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

$totalRecaudado = 0;
$totalEgreso = 0;
$totalADepositar = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$idaperturacajaapp = utf8_encode($valor['idaperturacajaapp']); 
$fechaapertura = utf8_encode($valor['fechaapertura']);          
$fechacierre = utf8_encode($valor['fechacierre']);          
$estado = utf8_encode($valor['estado']); 
$montocierre = utf8_encode($valor['montocierre']); 
$cod_cobrador = utf8_encode($valor['cod_cobrador']); 
$usuario = utf8_encode($valor['usuario']); 

$totalRecaudado += $montocierre;

$datos = datosdeCajaAppPorCodApertura($idaperturacajaapp);
$totalEgreso+= $datos[2];
$totalADepositar += $montocierre - $datos[2];
$filas[]=array(
	"codigo"=>$idaperturacajaapp,
	"cobrador"=>$usuario,
	"fecha_apertura"=>$fechaapertura,
	"fecha_cierre"=>$fechacierre,
	"monto_recaudado"=>$montocierre,
	"monto_recaudado_formateado"=>number_format($montocierre,'0',',','.'),
	"estado"=>$estado,
	"detalle_ingreso"=>$datos[3]['ingreso'],
	"detalle_ingreso_formateado"=>$datos[3]['ingreso_formateado'],
	"detalle_egreso"=>$datos[3]['egreso'],
	"detalle_egreso_formateado"=>$datos[3]['egreso_formateado'],
	"a_depositar"=>($montocierre-$datos[2]),
	"a_depositar_formateado"=>number_format($montocierre-$datos[2],'0',',','.')
);

	    	 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosaperturacierrecajaapp(this)'>
<td id='td_id_1' style='display:none'>".$idaperturacajaapp."</td>
<td id='td_datos_1' style='width:10%'>".$usuario."</td>
<td id='td_datos_9' style='width:10%'>".$fechaapertura."</td>
<td id='td_datos_3' style='width:10%'>".$fechacierre."</td>
<td id='td_datos_7' style='width:10%'>".number_format($montocierre,'0',',','.')."</td>
<td id='td_datos_5' style='width:10%'>".$estado."</td>
<td id='td_datos_6' style='width:30%'>".$datos[0]."</td>
<td id='td_datos_8' style='width:10%;text-align:center;'>".number_format($montocierre - $datos[2],'0',',','.')."</td>
</tr>
</table>";


}
}


$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro, "4"=>number_format($totalRecaudado,'0',',','.'),"5"=>number_format($totalEgreso,'0',',','.'),"6"=>number_format($totalADepositar,'0',',','.'));
echo json_encode($informacion);	
exit;
}


function ObtenerTotalCaja($idArqeoFk,$montoInicio)
{
$mysqli=conectar_al_servidor();

$sql= "select  sum(pg.Monto) as Monto
 from  pago pg 
 where pg.Monto>0 and pg.codApertura='$idArqeoFk' ";	
$Pagos = "0";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
          
$m = $valor['Monto'];          
$Pagos=$Pagos+$m;

	    	 


}
}

$sql= "Select monto from gastos g where codApertura='$idArqeoFk' and estado='Activo' and tipo='Egreso' ";
$MontoEgresos = "0";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
          
$m = $valor['monto'];          
$MontoEgresos=$MontoEgresos+$m;

	    	 


}
}


$sql= "Select monto
		from gastos g where codApertura='$idArqeoFk' and estado='Activo' and tipo='Ingreso'";	
$MontoIngreso= "0";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
          
$m = $valor['monto'];          
$MontoIngreso=$MontoIngreso+$m;

	    	 


}
}


$sql= "Select monto
		from gastos g where codApertura='$idArqeoFk' and estado='Activo' and tipo='Deposito' ";	
			
		
$MontoDeposito = "0";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
          
$m = $valor['monto'];          
$MontoDeposito=$MontoDeposito+$m;

	    	 


}
}



$datosdeCajaApp=datosdeCajaApp($idArqeoFk);

$CajaApp= $datosdeCajaApp[1];



$datosdeCajaRecibir=datosdeCajaRecibir($idArqeoFk);
$datosdeCajaEnviado=datosdeCajaEnviado($idArqeoFk);



$totalIngreso=$MontoIngreso+$Pagos+$montoInicio+$CajaApp + $datosdeCajaRecibir[1];
$Monto=$totalIngreso-($MontoEgresos + $MontoDeposito + $datosdeCajaEnviado[1]);
 

return $Monto;
}



function buscarmoviemientocaja($idArqeoFk)
{
$mysqli=conectar_al_servidor();

$sql= "select Monto,tipo,cod_venta_fk,descripcion,
(Select Nombre from local l where l.cod_local=pg.codCaja) as nombrelocal
 from  pago pg 
 where pg.Monto>0 and pg.codApertura='$idArqeoFk' ";
$totalPagado = "0";   
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
          

$Monto = utf8_encode($valor['Monto']); 
$nombrelocal = utf8_encode($valor['nombrelocal']); 
$cod_venta_fk = utf8_encode($valor['cod_venta_fk']); 
$tipo = utf8_encode($valor['tipo']); 
$descripcion = utf8_encode($valor['descripcion']); 


$totalPagado=$totalPagado+$Monto;
if($descripcion=="ventas"){
	$descripcion=buscar_detalles_venta($cod_venta_fk);
}
	$pagina.="
<table class='tableTicket' border='0' cellspacing='0' cellpadding='0'>
<tr >
<td id='' style='width:75%;text-align:left;padding:5px;line-height: 18px;' >".$descripcion."</td>
<td id='' style='width:25%'>". number_format($Monto,'0',',','.')."</td>
</tr>
</table>
";


}
}

$datosdeCajaApp=datosdeCajaApp($idArqeoFk);

$CajaApp= $datosdeCajaApp[1];

$datosdeCajaRecibir=datosdeCajaRecibir($idArqeoFk);
$datosdeCajaEnviado=datosdeCajaEnviado($idArqeoFk);


$montoapertura=Obtenermontoapertura($idArqeoFk);
$datosdeEgresos=datosdeEgresos($idArqeoFk);
$datosdeIngreso=datosdeIngreso($idArqeoFk);


$totalPagado=($totalPagado+$datosdeIngreso[0]+$montoapertura + $CajaApp + $datosdeCajaRecibir[1])- ($datosdeEgresos[0] + $datosdeCajaEnviado[1]);
 $informacion =array("1" => "exito","2" =>  number_format($totalPagado,'0',',','.'),"3"=> $pagina);
echo json_encode($informacion);	
exit;
}

/*Buscar */
function datosdeCajaAppPorCodApertura($idaperturacajaapp)
{
$mysqli=conectar_al_servidor();
 
	
$sql= "select idaperturacajaapp , (select nombre_persona from persona where cod_cobrador=cod_persona) as cobrador ,
 ifnull((select sum(monto) from gastos_cobrador where codApertura=idaperturacajaapp and tipo='INGRESO' and estado='Activo'),0) as ingreso ,
 ifnull((select sum(monto) from gastos_cobrador where codApertura=idaperturacajaapp and tipo='EGRESO' and estado='Activo'),0) as egreso ,
fechaapertura from  aperturacajaapp  where idaperturacajaapp='$idaperturacajaapp' ";	


 $pagina="";
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";
$totalPagado=0;
$resultado=0;
$totalIngreso = 0;
$totalEgreso = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idaperturacajaapp = utf8_encode($valor['idaperturacajaapp']);
$cobrador = utf8_encode($valor['cobrador']);
$fechaapertura = utf8_encode($valor['fechaapertura']);

$ingreso = utf8_encode($valor['ingreso']);
$egreso = utf8_encode($valor['egreso']);

$resultado=$resultado + ($ingreso-$egreso);

$totalIngreso += $ingreso;
$totalEgreso += $egreso;





	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:30%;text-align:left;padding:5px;line-height: 18px;display:none' >".$cobrador." <br> ".$fechaapertura."</td>
<td id='' style='width:50%;text-align:center;'>". number_format($totalIngreso,'0',',','.')."</td>
<td id='' style='width:50%;text-align:center;'>". number_format($totalEgreso,'0',',','.')."</td>
</tr>
</table>
";

// $totalPagado= $totalPagado + $monto;




}

}

   
   
$totalPagado= $totalPagado + $resultado;


$datos[0]=$pagina;
$datos[1]=$totalPagado;
$datos[2]=$totalEgreso;
$datos[3]=array(
	'ingreso'=>$totalIngreso,
	'ingreso_formateado'=>number_format($totalIngreso,'0',',','.'),
	'egreso'=>$totalEgreso,
	'egreso_formateado'=>number_format($totalEgreso,'0',',','.')
);
return $datos;
}



/*Buscar */
function datosdeCajaApp($idArqeoFk)
{
$mysqli=conectar_al_servidor();
 
	
$sql= "select idaperturacajaapp , (select nombre_persona from persona where cod_cobrador=cod_persona) as cobrador ,
 ifnull((select sum(monto) from gastos_cobrador where codApertura=idaperturacajaapp and tipo='INGRESO' and estado='Activo'),0) as ingreso ,
 ifnull((select sum(monto) from gastos_cobrador where codApertura=idaperturacajaapp and tipo='EGRESO' and estado='Activo'),0) as egreso ,
fechaapertura from  aperturacajaapp  where cod_AperturaCajaFK='$idArqeoFk' ";	


 $pagina="";
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";
$totalPagado=0;
$resultado=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$idaperturacajaapp = utf8_encode($valor['idaperturacajaapp']);
$cobrador = utf8_encode($valor['cobrador']);
$fechaapertura = utf8_encode($valor['fechaapertura']);

$ingreso = utf8_encode($valor['ingreso']);
$egreso = utf8_encode($valor['egreso']);

$resultado=$resultado + ($ingreso-$egreso);

$sql2= " select  ifnull(sum(pg.Monto),0) as monto  from  pago pg 
 where pg.Monto>0 and pg.codAperturaApp='$idaperturacajaapp' ";	


$stmt2 = $mysqli->prepare($sql2);
if ( ! $stmt2->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;
}

$result2 = $stmt2->get_result();
$valor2= mysqli_num_rows($result2);
// $nroRegistro=$valor2;
$styleName="tableRegistroSearch";


if ($valor2>0)
{
while ($valor2= mysqli_fetch_assoc($result2))
{ 

	$monto = utf8_encode($valor2['monto']);

	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:30%;text-align:left;padding:5px;line-height: 18px;' >".$cobrador." <br> ".$fechaapertura."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')."</td>
<td id='' style='width:20%'></td>
</tr>
</table>
";

$totalPagado= $totalPagado + $monto;


}

}

}
}
   
   
$totalPagado= $totalPagado + $resultado;


$datos[0]=$pagina;
$datos[1]=$totalPagado;
return $datos;
}




/*Buscar */
function datosdeCajaEnviado($idArqeoFk)
{
$mysqli=conectar_al_servidor();
 
	
$sql= "select idmigrar_caja, obs, fecha, monto, cod_caja_desdeFK, cod_caja_hastaFK, estado, tipo, cod_usuRecibeFK, cod_UsuEnviaFK , 
				(select nombre_persona from persona where cod_persona=cod_usuRecibeFK) as usuarioRecibe  ,
				(select nombre_persona from persona where cod_persona=cod_UsuEnviaFK) as usuarioEnvia from  migrar_caja  where cod_caja_desdeFK='$idArqeoFk' ";	


 $pagina="";
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalCaja=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$monto = utf8_encode($valor['monto']); 
$usuarioRecibe = utf8_encode($valor['usuarioRecibe']); 

$totalCaja= $totalCaja + $monto ;
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:30%;text-align:left;padding:5px;line-height: 18px;' >".$usuarioRecibe."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')." </td>
<td id='' style='width:20%'> </td>
</tr>
</table>
";




}
}
   
$datos[0]=$pagina;
$datos[1]=$totalCaja;
return $datos;
}



/*Buscar */
function datosdeCajaRecibir($idArqeoFk)
{
$mysqli=conectar_al_servidor();
 
	
$sql= "select idmigrar_caja, obs, fecha, monto, cod_caja_desdeFK, cod_caja_hastaFK, estado, tipo, cod_usuRecibeFK, cod_UsuEnviaFK , 
				(select nombre_persona from persona where cod_persona=cod_usuRecibeFK) as usuarioRecibe  ,
				(select nombre_persona from persona where cod_persona=cod_UsuEnviaFK) as usuarioEnvia from  migrar_caja  where cod_caja_hastaFK='$idArqeoFk' ";	


 $pagina="";
 
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalCaja=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$monto = utf8_encode($valor['monto']); 
$usuarioEnvia = utf8_encode($valor['usuarioEnvia']); 

$totalCaja= $totalCaja + $monto ;
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:30%;text-align:left;padding:5px;line-height: 18px;' >".$usuarioEnvia."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')." </td>
<td id='' style='width:20%'> </td>
</tr>
</table>
";




}
}
   
$datos[0]=$pagina;
$datos[1]=$totalCaja;
return $datos;
}





/*Buscar */
function buscar_detalles_venta($buscar)
{
$mysqli=conectar_al_servidor();

$sql= "select pr.nombre_producto,
dtv.cantidad_detalle,dtv.cod_productoFK,dtv.precio_producto,dtv.cod_ventaFK,dtv.subtotal,dtv.subPrecioCompra,dtv.detalleproducto
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";
$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$a=1;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  



$nombre_producto = utf8_encode($valor['nombre_producto']);       
$cantidad_detalle = utf8_encode($valor['cantidad_detalle']);       
$detalleproducto = utf8_encode($valor['detalleproducto']);       
$subtotal = utf8_decode($valor['subtotal']);      
if($pagina==""){
	$pagina.=$a.") &nbsp".$nombre_producto.",&nbsp&nbsp".number_format($cantidad_detalle,'2',',','.')."(".$detalleproducto.")";	
	}else{
		$pagina.="<br>".$a.") &nbsp".$nombre_producto.",&nbsp&nbsp".number_format($cantidad_detalle,'2',',','.')."(".$detalleproducto.")";	
	}


}
}

return $pagina;
}


function datosdeEgresos($idArqeoFk)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
		$sql= "Select monto
		from gastos g where codApertura='$idArqeoFk' and estado='Activo' and (tipo='Egreso' or tipo='Deposito') ";
		
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalGasto=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      
		  	  $monto=utf8_encode($valor['monto']);
		  	 $totalGasto=$totalGasto+$monto;
		  	 
	
			    	 
		  	  
			  
			  
	  }
 }


 $datos[0]= $totalGasto;
 return $datos;
}

function datosdeIngreso($idArqeoFk)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	
		$sql= "Select monto
		from gastos g where codApertura='$idArqeoFk' and estado='Activo' and tipo='Ingreso' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalGasto=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		   
		  	  $monto=utf8_encode($valor['monto']);
		  	 $totalGasto=$totalGasto+$monto;
		  	 	 
		
			    	 
		  	  
			  
			  
	  }
 }

 $datos[0]= $totalGasto;
 return $datos;
}

function Obtenermontoapertura($idArqeoFk)
{
$mysqli=conectar_al_servidor();

$sql= "Select montoapertura
from arqueocaja  where idarqueocaja='$idArqeoFk'  ";
$montoapertura = "0";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
          
$montoapertura = utf8_encode($valor['montoapertura']);          

	    	 


}
}

return $montoapertura;
}

function nuevoCajaApp($idabm,$codApertura)
{
	
	
$mysqli=conectar_al_servidor();
 
 
$consulta1="Update aperturacajaapp set cod_AperturaCajaFK='$codApertura'  where idaperturacajaapp='$idabm'";	

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

function BuscarAbmCajaApp($formato='')
{
	
$mysqli=conectar_al_servidor();

 

$sql= "Select idaperturacajaapp, fechaapertura, fechacierre, estado, IFNULL(montocierre,0) as montocierre, 
IFNULL(montogasto,0) as montogasto, IFNULL(totalcaja,0) as totalcaja, cod_cobrador,
(Select nombre_persona from persona where cod_persona=cod_cobrador) as usuario
from aperturacajaapp ap where  estado='Cerrado' and cod_AperturaCajaFK='0' order by idaperturacajaapp desc   ";
$pagina = "";
$filas = array();
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
$idaperturacajaapp = utf8_encode($valor['idaperturacajaapp']); 
$fechaapertura = utf8_encode($valor['fechaapertura']);          
$fechacierre = utf8_encode($valor['fechacierre']);          
$estado = utf8_encode($valor['estado']); 
$montocierre = utf8_encode($valor['montocierre']); 
$cod_cobrador = utf8_encode($valor['cod_cobrador']); 
$usuario = utf8_encode($valor['usuario']);

$montogasto = utf8_encode($valor['montogasto']);
$totalcaja = utf8_encode($valor['totalcaja']);
$montocierreRaw = $montocierre;
$montogastoRaw = $montogasto;
$totalcajaRaw = $totalcaja;

if($montocierre!=''){
	  $montocierre =number_format($montocierre,'0',',','.') ;
}

if($montogasto!=''){
	  $montogasto =number_format($montogasto,'0',',','.') ;
}
if($totalcaja!=''){
	  $totalcaja =number_format($totalcaja,'0',',','.') ;
}

$filas[]=array(
	"codigo" => $idaperturacajaapp,
	"fecha_apertura" => $fechaapertura,
	"fecha_cierre" => $fechacierre,
	"usuario" => $usuario,
	"monto_cierre" => $montocierreRaw,
	"monto_cierre_formateado" => $montocierre,
	"monto_gasto" => $montogastoRaw,
	"monto_gasto_formateado" => $montogasto,
	"total_caja" => $totalcajaRaw,
	"total_caja_formateado" => $totalcaja
);

	if($formato!='json'){
	    	 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmCajaApp(this)'>
<td id='td_id_1' style='display:none'>".$idaperturacajaapp."</td>
<td id='td_datos_9' style='width:16.5%'>".$fechaapertura."</td>
<td id='td_datos_3' style='width:16.5%'>".$fechacierre."</td>
<td id='td_datos_1' style='width:16.5%'>".$usuario."</td>
<td id='td_datos_7' style='width:16.5%'>".$montocierre."</td>
<td id='td_datos_8' style='width:16.5%'>".$montogasto."</td>
<td id='td_datos_9' style='width:16.5%'>".$totalcaja."</td>
</tr>
</table>";
	}


}
}


$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

verificar($operacion);
?>
