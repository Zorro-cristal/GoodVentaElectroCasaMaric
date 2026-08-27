<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("BuscarNroFactura.php");
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




if($operacion=="buscarinformecaja")
{
	
$idArqeoFk=$_POST['idArqeoFk1'];
$idArqeoFk = utf8_decode($idArqeoFk);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
generarinforme($idArqeoFk,$formato);

}




}


function generarinforme($idArqeoFk,$formato=''){
	$styleName="tableRegistroSearch";
	$pagina="";
	$secciones=array();
	$datosventas=datosdepagosventas($idArqeoFk);
	$secciones[]=array('titulo'=>'PAGOS REALIZADOS','filas'=>$datosventas[4]);
	if($datosventas[0]==""){
	$styleName=CargarStyleTable($styleName);
	$pagina.="<p class='ptituloZ'>PAGOS REALIZADOS</p>
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:30%' >NO SE ENCONTRARON REGISTROS</td>
</tr>
</table>";
	}else{
		$pagina.="<p class='ptituloZ'>PAGOS REALIZADOS</p>".$datosventas[0];
	}
	$totalpagos=$datosventas[1];
	$totaltarjeta=$datosventas[2];
	$totalefectivo=$datosventas[3];
	
	
$datosIngreso=datosdeIngreso($idArqeoFk);
$secciones[]=array('titulo'=>'INGRESOS A CAJA','filas'=>$datosIngreso[2]);
if($datosIngreso[0]==""){
	
	$styleName=CargarStyleTable($styleName);
	$pagina.="<p class='ptituloZ'>INGRESOS A CAJA</p>
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:30%' >NO SE ENCONTRARON REGISTROS</td>
</tr>
</table>";
	}else{
		$pagina.="<p class='ptituloZ'>INGRESOS A CAJA</p>".$datosIngreso[0];
	}

$totalingreso=$datosIngreso[1];
	

$datosEgreso=datosdeEgresos($idArqeoFk);
$secciones[]=array('titulo'=>'EGRESOS DE CAJA','filas'=>$datosEgreso[2]);
	
	if($datosEgreso[0]==""){
		$styleName=CargarStyleTable($styleName);
	$pagina.="<p class='ptituloZ'>EGRESOS DE CAJA</p>
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:30%' >NO SE ENCONTRARON REGISTROS</td>
</tr>
</table>";
	}else{
		$pagina.="<p class='ptituloZ'>EGRESOS DE CAJA</p>".$datosEgreso[0];
	}
$totalegreso=$datosEgreso[1];





$datosdeDeposito=datosdeDeposito($idArqeoFk);
$secciones[]=array('titulo'=>'DEPOSITO','filas'=>$datosdeDeposito[2]);
	
	if($datosdeDeposito[0]==""){
		$styleName=CargarStyleTable($styleName);
	$pagina.="<p class='ptituloZ'>DEPOSITO</p>
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:30%' >NO SE ENCONTRARON REGISTROS</td>
</tr>
</table>";
	}else{
		$pagina.="<p class='ptituloZ'>DEPOSITO</p>".$datosdeDeposito[0];
	}
$totalDeposito=$datosdeDeposito[1];

 
$datosdeCajaApp=datosdeCajaApp($idArqeoFk);
$secciones[]=array('titulo'=>'CAJA APP','filas'=>$datosdeCajaApp[2]);
	
	if($datosdeCajaApp[0]==""){
		$styleName=CargarStyleTable($styleName);
	$pagina.="<p class='ptituloZ'>CAJA APP</p>
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:30%' >NO SE ENCONTRARON REGISTROS</td>
</tr>
</table>";
	}else{
		$pagina.="<p class='ptituloZ'>CAJA APP</p>".$datosdeCajaApp[0];
	}
$totalCajaApp=$datosdeCajaApp[1];


//////Caja Migrado

$datosdeCajaEnviado=datosdeCajaEnviado($idArqeoFk);
$secciones[]=array('titulo'=>'CAJA MIGRADO','filas'=>$datosdeCajaEnviado[2]);
	
	if($datosdeCajaEnviado[0]==""){
		$styleName=CargarStyleTable($styleName);
	$pagina.="<p class='ptituloZ'>CAJA MIGRADO</p>
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:30%' >NO SE ENCONTRARON REGISTROS</td>
</tr>
</table>";
	}else{
		$pagina.="<p class='ptituloZ'>CAJA MIGRADO</p>".$datosdeCajaEnviado[0];
	}
$totalCajaEnviado=$datosdeCajaEnviado[1];


//////Caja Recibido

$datosdeCajaRecibir=datosdeCajaRecibir($idArqeoFk);
$secciones[]=array('titulo'=>'CAJA RECIBIDO','filas'=>$datosdeCajaRecibir[2]);
	
	if($datosdeCajaRecibir[0]==""){
		$styleName=CargarStyleTable($styleName);
	$pagina.="<p class='ptituloZ'>CAJA RECIBIDO</p>
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr >
<td id='' style='width:30%' >NO SE ENCONTRARON REGISTROS</td>
</tr>
</table>";
	}else{
		$pagina.="<p class='ptituloZ'>CAJA RECIBIDO</p>".$datosdeCajaRecibir[0];
	}
$totalCajaRecibido=$datosdeCajaRecibir[1];


$montoinicio=ObtenerTotalCaja($idArqeoFk);

$ingresos=$totalingreso;
$egresos=$totalegreso;
$total=($ingresos+$totalpagos+$totalCajaApp + $totalCajaRecibido)-($egresos + $totalCajaEnviado + $totalDeposito);
$total=$montoinicio+$total;
$informacion =array("1" => "exito","2" => ($formato==='json' ? $secciones : $pagina),"3" => number_format($ingresos,'0',',','.'),"4" => number_format($egresos,'0',',','.')
,"5" => number_format($total,'0',',','.'),"6" => number_format($totalDeposito,'0',',','.'),"7" => number_format($totalefectivo,'0',',','.'),"8" => number_format($totalCajaApp,'0',',','.'),"9" => number_format($totalCajaEnviado,'0',',','.'),"10" => number_format($totalCajaRecibido,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function datosdeDeposito($idArqeoFk)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
		$sql= "Select monto,motivo,fecha,estado,cod_usuario,idgastos,personales,cod_local,
		(Select nombre_persona from persona where cod_persona=cod_usuario) as usuarionombre,
		 (Select Nombre from local l where l.cod_local=g.cod_local ) as nombrelocal
		 from gastos g where codApertura='$idArqeoFk' and estado='Activo' and  tipo='Deposito' ";
		
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
 $totalGasto=0;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idgastos=$valor['idgastos'];
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $monto=utf8_encode($valor['monto']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $personales=utf8_encode($valor['personales']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	 $totalGasto=$totalGasto+$monto;
			 $filas[]=array(
				 'detalle'=>$motivo,
				 'detalle_secundario'=>'',
				 'monto'=>number_format($monto,'0',',','.'),
				 'monto_valor'=>$monto,
				 'local'=>$nombrelocal
			 );
		  	 
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:60%;text-align:left;padding:5px' >".$motivo."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')."</td>
<td id='' style='width:20%'>". $nombrelocal."</td>
</tr>
</table>
";
			    	 
		  	  
			  
			  
	  }
 }

 $datos[0]= $pagina;
 $datos[1]= $totalGasto;
 $datos[2]= $filas;
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
 $filas=array();
 
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
 
$obs = utf8_encode($valor['obs']); 
$fecha = utf8_encode($valor['fecha']); 
$monto = utf8_encode($valor['monto']); 
$usuarioRecibe = utf8_encode($valor['usuarioRecibe']); 

$totalCaja= $totalCaja + $monto ;
	$filas[]=array(
		'detalle'=>$usuarioRecibe,
		'detalle_secundario'=>'**'.$obs.' - '.$fecha.'**',
		'monto'=>number_format($monto,'0',',','.'),
		'monto_valor'=>$monto,
		'local'=>''
	);
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:60%;text-align:left;padding:5px;line-height: 18px;' >".$usuarioRecibe."<b> **$obs - $fecha**</b></td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')." </td>
<td id='' style='width:20%'> </td>
</tr>
</table>
";




}
}
   
$datos[0]=$pagina;
$datos[1]=$totalCaja;
$datos[2]=$filas;
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
 $filas=array();
 
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
	$filas[]=array(
		'detalle'=>$usuarioEnvia,
		'detalle_secundario'=>'',
		'monto'=>number_format($monto,'0',',','.'),
		'monto_valor'=>$monto,
		'local'=>''
	);
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:60%;text-align:left;padding:5px;line-height: 18px;' >".$usuarioEnvia."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')." </td>
<td id='' style='width:20%'> </td>
</tr>
</table>
";




}
}
   
$datos[0]=$pagina;
$datos[1]=$totalCaja;
$datos[2]=$filas;
return $datos;
}
 
/*Buscar */
function datosdeCajaApp($idArqeoFk)
{
$mysqli=conectar_al_servidor();
 
	
$sql= "select idaperturacajaapp , (select nombre_persona from persona where cod_cobrador=cod_persona) as cobrador ,
 ifnull((select sum(monto) from gastos_cobrador where codApertura=idaperturacajaapp and tipo='INGRESO' and estado ='Activo'),0) as ingreso ,
 ifnull((select sum(monto) from gastos_cobrador where codApertura=idaperturacajaapp and tipo='EGRESO' and estado ='Activo'),0) as egreso ,
fechaapertura from  aperturacajaapp  where cod_AperturaCajaFK='$idArqeoFk' ";	


 $pagina="";
 $filas=array();
 
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

$MotoPago=0;

if ($valor2>0)
{
while ($valor2= mysqli_fetch_assoc($result2))
{ 

	$monto = utf8_encode($valor2['monto']);
	$filas[]=array(
		'detalle'=>$cobrador,
		'detalle_secundario'=>$fechaapertura,
		'monto'=>number_format($monto,'0',',','.'),
		'monto_valor'=>$monto,
		'local'=>''
	);

	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:60%;text-align:left;padding:5px;line-height: 18px;' >".$cobrador." <br> ".$fechaapertura."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')."</td>
<td id='' style='width:20%'> </td> 
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
$datos[2]=$filas;
return $datos;
}



/*Buscar */
function datosdepagosventas($idArqeoFk)
{
$mysqli=conectar_al_servidor();
 
	
$sql= "SELECT
    SUM(pg.Monto) AS Monto,
    pg.tipo,
    pg.cod_venta_fk,
    pg.descripcion,
    tp.nombre AS tipopago,
    l.nombre AS nombrelocal,
    CONCAT(p.nombre_persona, ' ', p.apellido_persona) AS nombreCliente
FROM
    pago pg
    INNER JOIN venta vt ON vt.cod_venta = pg.cod_venta_fk
    LEFT JOIN tipopago tp ON tp.cod_tipoPago = pg.cod_tipoPagoFK
    LEFT JOIN local l ON l.cod_local = vt.cod_local
    LEFT JOIN persona p ON p.cod_persona = vt.cod_clienteFK
WHERE
    pg.Monto > 0
    AND pg.codApertura = '$idArqeoFk'
GROUP BY
    pg.tipo,
    pg.cod_venta_fk,
    pg.descripcion,
    tp.nombre,
    l.nombre,
    p.nombre_persona,
    p.apellido_persona
ORDER BY concat(p.nombre_persona,p.apellido_persona) asc ";	

$pagina="";
$filas=array();

$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$totaltarjeta=0;
$totalefectivo=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
 
$nombreCliente = utf8_encode($valor['nombreCliente']); 
$Monto = utf8_encode($valor['Monto']); 
$nombrelocal = utf8_encode($valor['nombrelocal']); 
$cod_venta_fk = utf8_encode($valor['cod_venta_fk']); 
$tipo = utf8_encode($valor['tipo']); 
$descripcion = utf8_encode($valor['descripcion']); 
$tipopago = utf8_encode($valor['tipopago']); 

	if($tipo=="Tarjeta"){
$totaltarjeta=$totaltarjeta+$Monto;
}else{
$totalefectivo=$totalefectivo+$Monto;	
} 
$totalPagado=$totalPagado+$Monto;
$descripcionTexto=$descripcion;
if($descripcion=="ventas"){
	$detalleVenta=buscar_detalles_venta($cod_venta_fk);
	$descripcion=$detalleVenta['html'];
	$descripcionTexto=$detalleVenta['texto'];
}
	$filas[]=array(
		'detalle'=>$descripcionTexto,
		'detalle_secundario'=>$nombreCliente,
		'monto'=>number_format($Monto,'0',',','.').' ('.$tipopago.')',
		'monto_valor'=>$Monto,
		'local'=>$nombrelocal
	);
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:60%;text-align:left;padding:5px;line-height: 18px;' >".$descripcion." <br><b style='    border-bottom: 1px solid;   margin-left: 20px;'>".$nombreCliente."</b></td>
<td id='' style='width:20%'>". number_format($Monto,'0',',','.')." &nbsp&nbsp(".$tipopago.")</td>
<td id='' style='width:20%'>". $nombrelocal."</td>
</tr>
</table>
";
 
}
}
   
$datos[0]=$pagina;
$datos[1]=$totalPagado;
$datos[2]=$totaltarjeta;
$datos[3]=$totalefectivo;
$datos[4]=$filas;
return $datos;
}


function datosdeEgresos($idArqeoFk)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
		$sql= "Select monto,motivo,fecha,estado,cod_usuario,idgastos,personales,cod_local,
		(Select nombre_persona from persona where cod_persona=cod_usuario) as usuarionombre,
		(Select Nombre from local l where l.cod_local=g.cod_local ) as nombrelocal
		from gastos g where codApertura='$idArqeoFk' and estado='Activo' and tipo='Egreso' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $totalGasto=0;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idgastos=$valor['idgastos'];
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $monto=utf8_encode($valor['monto']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $personales=utf8_encode($valor['personales']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	 $totalGasto=$totalGasto+$monto;
			 $filas[]=array(
				 'detalle'=>$motivo,
				 'detalle_secundario'=>'',
				 'monto'=>number_format($monto,'0',',','.'),
				 'monto_valor'=>$monto,
				 'local'=>$nombrelocal
			 );
		  	 
	$styleName=CargarStyleTable($styleName);
	$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:60%;text-align:left;padding:5px' >".$motivo."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')."</td>
<td id='' style='width:20%'>". $nombrelocal."</td>
</tr>
</table>
";
			    	 
		  	  
			  
			  
	  }
 }

 $datos[0]= $pagina;
 $datos[1]= $totalGasto;
 $datos[2]= $filas;
 return $datos;
}

function datosdeIngreso($idArqeoFk)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	
		$sql= "Select monto,motivo,fecha,estado,cod_usuario,idgastos,personales,cod_local,
		(Select nombre_persona from persona where cod_persona=cod_usuario) as usuarionombre,
		(Select Nombre from local l where l.cod_local=g.cod_local ) as nombrelocal
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
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idgastos=$valor['idgastos'];
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $monto=utf8_encode($valor['monto']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $personales=utf8_encode($valor['personales']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	 $totalGasto=$totalGasto+$monto;
			 $filas[]=array(
				 'detalle'=>$motivo,
				 'detalle_secundario'=>'',
				 'monto'=>number_format($monto,'0',',','.'),
				 'monto_valor'=>$monto,
				 'local'=>$nombrelocal
			 );
			 
			 
		  	 	 	$styleName=CargarStyleTable($styleName);
					$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'>
<td id='' style='width:60%;text-align:left;padding:5px' >".$motivo."</td>
<td id='' style='width:20%'>". number_format($monto,'0',',','.')."</td>
<td id='' style='width:20%'>". $nombrelocal."</td>
</tr>
</table>
";
		
			    	 
		  	  
			  
			  
	  }
 }

 $datos[0]= $pagina;
 $datos[1]= $totalGasto;
 $datos[2]= $filas;
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
$texto = "";
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
$lineaTexto=$a.") ".$nombre_producto.", ".number_format($cantidad_detalle,'2',',','.')."(".$detalleproducto.")";
if($pagina==""){
	$pagina.=$a.") &nbsp".$nombre_producto.",&nbsp&nbsp".number_format($cantidad_detalle,'2',',','.')."(".$detalleproducto.")";	
	$texto=$lineaTexto;
	}else{
		$pagina.="<br>".$a.") &nbsp".$nombre_producto.",&nbsp&nbsp".number_format($cantidad_detalle,'2',',','.')."(".$detalleproducto.")";	
		$texto.="\n".$lineaTexto;
	}


}
}

return array('html'=>$pagina,'texto'=>$texto);
}

function ObtenerTotalCaja($idArqeoFk)
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



verificar($operacion);
?>
