<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include('quitarseparadormiles.php');
include("subir_foto_base64.php");
include("cargar_archivo.php");
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
	
$idAbmCheque=$_POST['idAbmCheque'];
    $idAbmCheque = utf8_decode($idAbmCheque);
	
$fechaemi=$_POST['fechaemi'];
    $fechaemi = utf8_decode($fechaemi);

$fechaven=$_POST['fechaven'];
    $fechaven = utf8_decode($fechaven);

$nroCheque=$_POST['nroCheque'];
    $nroCheque = utf8_decode($nroCheque);

$orden=$_POST['orden'];
    $orden = utf8_decode($orden);

$concepto=$_POST['concepto'];
    $concepto = utf8_decode($concepto);

$importe=$_POST['importe'];
    $importe = quitarseparadormiles($importe);

$banco=$_POST['banco'];
    $banco = utf8_decode($banco);
	
$estado=$_POST['estado'];
    $estado = utf8_decode($estado);
	
$pagado=$_POST['pagado'];
    $pagado = utf8_decode($pagado);
	
	$tipo=$_POST['tipo'];
    $tipo = utf8_decode($tipo);

	abm($idAbmCheque,$pagado,$fechaemi,$fechaven,$nroCheque,$orden,$concepto,$importe,$banco,$tipo,$estado,$funt);
	


}

if($funt=="actualizarPagadoListado")
{
	$idAbmCheque=isset($_POST['idAbmCheque']) ? $_POST['idAbmCheque'] : '';
	$pagado=isset($_POST['pagado']) ? utf8_decode($_POST['pagado']) : '';
	actualizarPagadoListado($idAbmCheque,$pagado);
}

if($funt=="cargarImagenPagoProveedor")
{
	
	
	$id_carga_pago_total_a_compra=$_POST['id_carga_pago_total_a_compra'];
	$id_carga_pago_total_a_compra = utf8_decode($id_carga_pago_total_a_compra);
	// $pdf=$_POST['pdf'];
	// $pdf = utf8_decode($pdf);

	cargarImagenPagoProveedor($id_carga_pago_total_a_compra);

}

if ($funt == "buscar_informe_cheque_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$pagado = $_POST['pagado'];
		$pagado = utf8_decode($pagado);
		$tipoDeuda = $_POST['tipoDeuda'];
		$tipoDeuda = utf8_decode($tipoDeuda);
		$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		buscar_informe_cheque_general($anho, $pagado, $tipoDeuda,$formato);
	}
	
	
		if ($funt == "buscar_informe_cheque_general_general_grafica") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$pagado = $_POST['pagado'];
		$pagado = utf8_decode($pagado);
		$tipoDeuda = $_POST['tipoDeuda'];
		$tipoDeuda = utf8_decode($tipoDeuda);
		buscar_informe_cheque_general_general_grafica($anho,$pagado,$tipoDeuda);
	}
	

if($funt=="nuevochequecargarpago")
{
	
$fechaemi=$_POST['fechaemi'];
    $fechaemi = utf8_decode($fechaemi);

$fechaven=$_POST['fechaven'];
    $fechaven = utf8_decode($fechaven);

$nroCheque=$_POST['nroCheque'];
    $nroCheque = utf8_decode($nroCheque);

$orden=$_POST['orden'];
    $orden = utf8_decode($orden);

$concepto=$_POST['concepto'];
    $concepto = utf8_decode($concepto);

$importe=$_POST['importe'];
    $importe = quitarseparadormiles($importe);

$banco=$_POST['banco'];
    $banco = utf8_decode($banco);
	
$estado=$_POST['estado'];
    $estado = utf8_decode($estado);
	
$pagado=$_POST['pagado'];
    $pagado = utf8_decode($pagado);
	
	$tipo=$_POST['tipo'];
    $tipo = utf8_decode($tipo);
	
	$codProveedorPago=$_POST['codProveedorPago'];
    $codProveedorPago = utf8_decode($codProveedorPago);
	
	$array_cod_compras = json_decode($_POST['array_cod_compras']);
	
	$id_pago_total_compra = utf8_decode($_POST['id_pago_total_compra']);
	
	$user=$_POST['useru'];
$user = utf8_decode($user);

	nuevochequecargarpago($pagado,$fechaemi,$fechaven,$nroCheque,$orden,$concepto,$importe,$banco,$tipo,$estado,$array_cod_compras,$codProveedorPago,$user,$id_pago_total_compra);
	


}

if($funt=="buscar")
{
	$fechaEmi=$_POST['fechaEmi'];
$fechaEmi = utf8_decode($fechaEmi);
	$NroCheque=$_POST['NroCheque'];
$NroCheque = utf8_decode($NroCheque);
	$fechaven=$_POST['fechaven'];
$fechaven = utf8_decode($fechaven);
	$orden=$_POST['orden'];
$orden = utf8_decode($orden);
	$concepto=$_POST['concepto'];
$concepto = utf8_decode($concepto);
	$pago=$_POST['pago'];
$pago = utf8_decode($pago);
	$banco=$_POST['banco'];
$banco = utf8_decode($banco);
	$Fecha1=$_POST['Fecha1'];
$Fecha1 = utf8_decode($Fecha1);
	$Fecha2=$_POST['Fecha2'];
$Fecha2 = utf8_decode($Fecha2);	

$agrupado=$_POST['agrupado'];
$agrupado = utf8_decode($agrupado);	

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$cod_cheque=$_POST['cod_cheque'];
$cod_cheque = utf8_decode($cod_cheque);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	buscar($fechaEmi,$NroCheque,$fechaven,$orden,$concepto,$pago,$banco,$Fecha1,$Fecha2,$tipo,$monto,$cod_cheque,$agrupado,$formato);
	
}

if($funt=="buscarpagadoproveedor")
{


$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	buscarpagadoproveedor($buscar);
	
}	

if($funt=="buscarOption")
{

	buscarOption();

}	



if($funt=="NuevoConcepto")
{
	$concepto=$_POST['concepto'];
$concepto = utf8_decode($concepto);

	NuevoConcepto($concepto);

}	


if($funt=="buscaroptionConcepto")
{

	buscaroptionConcepto();

}

if($funt=="buscarInformePagosAProveedor")
{

$fecha_filtro=$_POST['fecha_filtro'];
$fecha_filtro = utf8_decode($fecha_filtro);
$usuario=$_POST['usuario'];
$usuario = utf8_decode($usuario);
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

	buscarInformePagosAProveedor($fecha_filtro,$usuario,$fecha1,$fecha2);

}

if($funt=="buscarInformePagosAProveedorCheques")
{

$idpago_total_compra=$_POST['idpago_total_compra'];
$idpago_total_compra = utf8_decode($idpago_total_compra);


	buscarInformePagosAProveedorCheques($idpago_total_compra);

}

if($funt=="buscarInformePagosAProveedorCompras")
{

$idpago_total_compra=$_POST['idpago_total_compra'];
$idpago_total_compra = utf8_decode($idpago_total_compra);


	buscarInformePagosAProveedorCompras($idpago_total_compra);

}


}

function buscaroptionConcepto()
{
	$mysqli=conectar_al_servidor();
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$filas=array();
	
		$sql= "Select * from concepto_cheque where estado='Activo' order by descripcion asc  ";
		
		
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
		  
		      $idconcepto_cheque=$valor['idconcepto_cheque'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
			  $filas[]=array(
				  "codigo" => $idconcepto_cheque,
				  "descripcion" => $descripcion,
				  "estado" => utf8_encode($valor['estado'])
			  );
				  	 	
			  $pagina.="<option  value='$descripcion' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 if($formato=='json'){
	 $pagina=$filas;
 }
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}




function NuevoConcepto($concepto)
{
	
if($concepto==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into concepto_cheque (descripcion,estado) values (upper(?),'Activo')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$concepto);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}


function actualizarPagadoListado($idAbmCheque,$pagado)
{
	if(!ctype_digit((string)$idAbmCheque) || ($pagado!="PENDIENTE" && $pagado!="PAGADO")){
		echo json_encode(array("1"=>"camposvacio"));
		exit;
	}
	$mysqli=conectar_al_servidor();
	$valorPagado=$pagado=="PAGADO" ? 1 : 0;
	$estadoActivo="Activo";
	$stmt=$mysqli->prepare("UPDATE cheque SET pagado=? WHERE idcheque=? AND estado=?");
	if(!$stmt){
		echo json_encode(array("1"=>"error"));
		exit;
	}
	$stmt->bind_param("iis",$valorPagado,$idAbmCheque,$estadoActivo);
	if(!$stmt->execute() || $stmt->affected_rows<1){
		echo json_encode(array("1"=>"registronoencontrado"));
		exit;
	}
	echo json_encode(array("1"=>"exito","2"=>$pagado));
	exit;
}

function abm($idAbmCheque,$pagado,$fechaemi,$fechaven,$nroCheque,$orden,$concepto,$importe,$banco,$tipo,$estado,$funt)
{
	
	if($importe=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

if($pagado=="PENDIENTE"){
	$pagado="0";
}else{
	$pagado="1";
}

	if($funt=="nuevo")
	{
	
	
	
	// $consulta= "Select count(*) from cheque where cod_bancoFK=? and nroche=?  ";
// $stmt = $mysqli->prepare($consulta);
// $ss='ss';
// $stmt->bind_param($ss,$banco,$nroCheque); 
// if ( ! $stmt->execute()) {
	// $informacion =array("1" => "error");
	// echo json_encode($informacion);	
	// exit;
// }
// $valor = 0;
// $stmt->bind_result($valor);
// while ($stmt->fetch()) { 
   
	 // $valor =$valor;
// }

// if($valor>0)
// {
	// $informacion =array("1" => "EXDT");
	// echo json_encode($informacion);	
	// exit;
// }  
	
	
	
    
    $consulta="insert into cheque ( fecemi, nroche, fecven, orden, concep, importe, pagado, cod_bancoFK,estado,tipo) values (?,?,?,upper(?),upper(?),?,?,?,?,?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='ssssssssss';
    $stmt->bind_param($ss,$fechaemi,$nroCheque,$fechaven,$orden,$concepto,$importe,$pagado,$banco,$estado,$tipo); 
        
 
	}
	if($funt=="editar")
	{
    
    $consulta="Update cheque set fecemi='$fechaemi', nroche='$nroCheque', fecven='$fechaven', orden=upper('$orden'), concep=upper('$concepto'), importe=$importe, pagado=$pagado, cod_bancoFK=$banco,estado='$estado',tipo='$tipo' where idcheque=$idAbmCheque";	

	$stmt = $mysqli->prepare($consulta);
	
	// echo($consulta);
	// exit;

       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

$ext=$_POST['ext'];
    $ext = utf8_decode($ext);
	if($ext != ''){
		if($funt == 'editar'){
			cargar_archivo($idAbmCheque);
		}else{
			cargar_archivo(mysqli_insert_id($mysqli));
		}
	}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function cargar_archivo($idcheque){
	
	$ext=$_POST['ext'];
    $ext = utf8_decode($ext);
			  $nombreArchivo = generarCodigoAleatorio(7) . $idcheque;
$ruta="/archivoscheque";
$nombrePost = 'imagencheque';
$respuesta = mover_archivo_carpeta($ruta,$nombreArchivo,$nombrePost,$ext);

$ruta="/GoodVentaElectroCasaMaric/archivoscheque/".$nombreArchivo.".".$ext;

if($respuesta){
	$mysqli=conectar_al_servidor();
	$consulta="UPDATE cheque SET url = '$ruta' WHERE idcheque  = '$idcheque'";	
	$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}else{
	$informacion =array("1" => "exito", "2" => 'Problema al cargar el documento');
	echo json_encode($informacion);	
	exit;
}



}

function generarCodigoAleatorio($longitud) {
    $caracteres = '0123456789';
    $numeroCaracteres = strlen($caracteres);
    $codigoAleatorio = '';
    
    for ($i = 0; $i < $longitud; $i++) {
        $codigoAleatorio .= $caracteres[rand(0, $numeroCaracteres - 1)];
    }
    
    return $codigoAleatorio;
}

function nuevochequecargarpago($pagado,$fechaemi,$fechaven,$nroCheque,$orden,$concepto,$importe,$banco,$tipo,$estado,$array_cod_compras,$codProveedorPago,$user,$id_pago_total_compra)
{

	
	
	if($importe=="" ){
$informacion =array("1" => "CAMPOSVACIOS");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

if($pagado=="PENDIENTE"){
	$pagado="0";
}else{
	$pagado="1";
}


	
	
	$consulta= "Select count(*) from cheque where cod_bancoFK='$banco' and nroche='$nroCheque' and estado ='Activo'";
$stmt = $mysqli->prepare($consulta);

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

if($valor>0)
{
	$informacion =array("1" => "EXDT");
	echo json_encode($informacion);	
	exit;
}  
	
	
	date_default_timezone_set('America/Anguilla');    
	$fecha = date('Y-m-d', time()); 
    
    $consulta="insert into cheque ( fecemi, nroche, fecven, orden, concep, importe, pagado, cod_bancoFK,estado,tipo,ingresadopor_cod_user,fechaingresado) values (?,?,?,upper(?),upper(?),?,?,?,?,?,?,?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='ssssssssssss';
    $stmt->bind_param($ss,$fechaemi,$nroCheque,$fechaven,$orden,$concepto,$importe,$pagado,$banco,$estado,$tipo,$user,$fecha); 
        
 

	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

$codCheque = obtenerultimaidcheque();
cargararraycodcompras($array_cod_compras,$codCheque,$codProveedorPago,$id_pago_total_compra);


	$ext=$_POST['ext'];
$ext = utf8_decode($ext);

if($ext != ''){
	cargar_archivo($codCheque);
}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}
function obtenerultimaidcheque()
{
	$idcheque ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select idcheque from cheque where estado='Activo'  order by idcheque desc limit 1";
	
   $stmt = $mysqli->prepare($sql); 
 if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idcheque=$valor['idcheque'];
		   	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $idcheque;
}

function cargararraycodcompras($array_cod_compras,$codCheque,$codProveedorPago,$id_pago_total_compra)
{

	$mysqli=conectar_al_servidor();
 
for ($i = 0; $i < count($array_cod_compras); $i++) {
	
$sql= "Insert into `detalle_pago_cheque` (idchequeFK,cod_compraFK,cod_proveedorFK,idpago_total_compraFK,estado) values ('".$codCheque."','".$array_cod_compras[$i]."','".$codProveedorPago."','$id_pago_total_compra','Activo')";
$stmt = $mysqli->prepare($sql); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


}

mysqli_close($mysqli);

}
function buscar($fechaEmi,$NroCheque,$fechaven,$orden,$concepto,$pago,$banco,$Fecha1,$Fecha2,$tipo,$monto,$cod_cheque,$agrupado,$formato)
{
	$mysqli=conectar_al_servidor();
	
		 $condicionfechaEmi=" ";
		if($fechaEmi!=""){
			$condicionfechaEmi=" and fecemi='$fechaEmi'  "; 
		 }
		 
		 $condicionNroCheque="";
		 if($NroCheque!=""){
			$condicionNroCheque=" and nroche='$NroCheque' "; 
		 }
		 
		 $condicionfechaven="";
		 if($fechaven!=""){
			$condicionfechaven=" and fecven='$fechaven' "; 
		 }		 
		 
		 $condicionorden="";
		 if($orden!=""){
			$condicionorden=" and orden like '%$orden%' "; 
		 }
		 
		 $condicionmonto="";
		 if($monto!=""){
			$condicionmonto=" and importe = '$monto' "; 
		 }
		 
		 $condiciontipo="";
		 if($tipo!=""){
			$condiciontipo=" and tipo = '$tipo' "; 
		 }
		 
		 $condicionconcepto="";
		 if($concepto!=""){
			$condicionconcepto=" and concep like '%$concepto%' "; 
		 }
		 
		  $condicioncodcheque="";
		 if($cod_cheque!=""){
			$condicioncodcheque=" and idcheque = '$cod_cheque' "; 
		 }
		 
		 $condicionpago="";
		 if($pago!=""){
			 if($pago=="PAGADO"){
				 $condicionpago=" and pagado='1' ";
			 }else{
				 $condicionpago=" and pagado='0' ";
			 }
			 
		 }
		 $condicionbanco="";
		 if($banco!=""){
			$condicionbanco=" and cod_bancoFK = '".$banco."' "; 
		 }
		 $condicionrangofechas="";
		 if($Fecha1!="" && $Fecha2!="" ){
			$condicionrangofechas=" and fecven between '$Fecha1' and '$Fecha2' "; 
		 }
	 $pagina='';
	 $filas=array();
	
if($agrupado ==''){
		$sql= "Select idcheque, fecemi, nroche, fecven, orden, concep, importe, pagado, cod_bancoFK ,url, estado,tipo,
		(select nombre from banco where idbanco=cod_bancoFK) as banco
        from cheque where  estado='Activo' ".$condicionfechaEmi.$condicionNroCheque.$condicionfechaven.$condicionorden.$condicionconcepto.$condicionpago.$condicionbanco.$condicionrangofechas.$condicionmonto.$condiciontipo.$condicioncodcheque." order by fecven desc limit 500 ";
}

if($agrupado =='1'){
		$sql= "Select idcheque, fecemi, nroche, fecven, orden, concep, sum(importe) as importe, pagado, cod_bancoFK ,url, estado,tipo,
		(select nombre from banco where idbanco=cod_bancoFK) as banco
        from cheque where  estado='Activo' ".$condicionfechaEmi.$condicionNroCheque.$condicionfechaven.$condicionorden.$condicionconcepto.$condicionpago.$condicionbanco.$condicionrangofechas.$condicionmonto.$condiciontipo.$condicioncodcheque." group by cod_bancoFK order by fecven desc";
}

if($agrupado =='2'){
		$sql= "Select idcheque, fecemi, nroche, fecven, orden, concep, sum(importe) as importe, pagado, cod_bancoFK ,url, estado,tipo,
		(select nombre from banco where idbanco=cod_bancoFK) as banco
        from cheque where  estado='Activo' ".$condicionfechaEmi.$condicionNroCheque.$condicionfechaven.$condicionorden.$condicionconcepto.$condicionpago.$condicionbanco.$condicionrangofechas.$condicionmonto.$condiciontipo.$condicioncodcheque." group by orden order by fecven desc";
}
		
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
 
 $totalImporte=0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idcheque=$valor['idcheque'];
		  	  $fecemi=utf8_encode($valor['fecemi']);
		  	  $nroche=utf8_encode($valor['nroche']);
			  $fecven=$valor['fecven'];
		  	  $orden=utf8_encode($valor['orden']);
		  	  $concep=utf8_encode($valor['concep']);
			  $importe=$valor['importe'];
		  	  $pagado=utf8_encode($valor['pagado']);
		  	  $cod_bancoFK=utf8_encode($valor['cod_bancoFK']);
			  $banco=utf8_encode($valor['banco']);
			  $estado=$valor['estado'];
			  $tipo=$valor['tipo'];
			  $url=$valor['url'];
	if($pagado=="0"){
		$pagado="PENDIENTE";
	}else{
		$pagado="PAGADO";
	}

// if($pagado=="PENDIENTE"){
	 $totalImporte= $totalImporte + $importe;
// }	
	

$fecemi2 = date("d-m-Y", strtotime($fecemi));
$fecven2 = date("d-m-Y", strtotime($fecven));
	if($tipo =='DEUDA'){
		$tipo = 'DEUDA BANCARIA';
	}
	
	if($tipo =='DEUDA2'){
		$tipo = 'DEUDA';
	}
	
	$ver = '';
if($url !=''){
	$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
}

			  $importeFormateado=number_format($importe,'0',',','.');
			  $filas[]=array(
				  "codigo" => $idcheque,
				  "fecha_emision" => $fecemi,
				  "fecha_emision_formateada" => $fecemi2,
				  "numero_cheque" => $nroche,
				  "fecha_vencimiento" => $fecven,
				  "fecha_vencimiento_formateada" => $fecven2,
				  "orden" => $orden,
				  "concepto" => $concep,
				  "importe_valor" => (float)$importe,
				  "importe_formateado" => $importeFormateado,
				  "pagado" => $pagado,
				  "banco" => $banco,
				  "tipo" => $tipo,
				  "url" => $url,
				  "codigo_banco" => $cod_bancoFK,
				  "estado" => $estado
			  );

			 if($formato!='json'){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmCheque(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idcheque."</td>
<td  id='td_datos_1' style='display:none'>".$fecemi."</td>
<td  id='' style='width:10%'>".$fecemi2."</td>
<td  id='td_datos_2' style='width:10%'>".$nroche."</td>
<td  id='td_datos_3' style='display:none'>".$fecven."</td>
<td  id='' style='width:10%'>".$fecven2."</td>
<td  id='td_datos_4' style='width:5%'>".$orden."</td>
<td  id='td_datos_5' style='width:10%'>".$concep."</td>
<td  id='td_datos_6' style='width:10%'>".$importeFormateado."</td>
<td  id='td_datos_7' style='width:10%'>".$pagado."</td>
<td  id='td_datos_8' style='width:10%'>".$banco."</td>
<td  id='td_datos_11' style='width:10%'>".$tipo."</td>
<td  id='' style='width:5%'>".$ver."</td>
<td  id='td_datos_9' style='display:none'>".$cod_bancoFK."</td>
<td  id='td_datos_10' style='display:none'>".$estado."</td>
</tr>
</table>";	 
			 }
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3"=> $totalresouesta,"4"=> number_format($totalImporte,'0',',','.'));
echo json_encode($informacion);	
exit;


}
function buscarOption()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >TODOS</option>";  
		$sql= "Select idbanco,nombre,estado
        from banco where estado='Activo' order by nombre asc ";
		   
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
		   
		  
		      $idbanco=$valor['idbanco'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  // $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$idbanco' >$nombre</option>";
		  	 
	  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}


function buscarpagadoproveedor($buscar)
{
	$mysqli=conectar_al_servidor();
	
	
	
	 $pagina='';
		$sql= "Select idcheque, fecemi, nroche, fecven, orden, concep, importe, pagado, cod_bancoFK , estado,tipo,
		(select nombre from banco where cod_bancoFK=idbanco) as banco
        from cheque where  estado='Activo' and cod_compraFK = '$buscar' order by fecven desc limit 500 ";
		
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
 
 $totalImporte=0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idcheque=$valor['idcheque'];
		  	  $fecemi=utf8_encode($valor['fecemi']);
		  	  $nroche=utf8_encode($valor['nroche']);
			  $fecven=$valor['fecven'];
		  	  $orden=utf8_encode($valor['orden']);
		  	  $concep=utf8_encode($valor['concep']);
			  $importe=$valor['importe'];
		  	  $pagado=utf8_encode($valor['pagado']);
		  	  $cod_bancoFK=utf8_encode($valor['cod_bancoFK']);
			  $banco=utf8_encode($valor['banco']);
			  $estado=$valor['estado'];
			  $tipo=$valor['tipo'];


	 $totalImporte= $totalImporte + $importe;
	
	

$fecemi2 = date("d-m-Y", strtotime($fecemi));
$fecven2 = date("d-m-Y", strtotime($fecven));
	
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick=''>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idcheque."</td>
<td  id='td_datos_1' style='display:none'>".$fecemi."</td>
<td  id='' style='width:10%'>".$fecemi2."</td>
<td  id='td_datos_2' style='width:10%'>".$nroche."</td>
<td  id='td_datos_3' style='display:none'>".$fecven."</td>
<td  id='' style='width:10%'>".$fecven2."</td>
<td  id='td_datos_4' style='width:5%'>".$orden."</td>
<td  id='td_datos_5' style='width:15%'>".$concep."</td>
<td  id='td_datos_6' style='width:10%'>". number_format($importe,'0',',','.')."</td>
<td  id='td_datos_7' style='width:10%'>".$pagado."</td>
<td  id='td_datos_8' style='width:5%'>".$banco."</td>
<td  id='td_datos_11' style='width:10%'>".$tipo."</td>
<td  id='td_datos_9' style='display:none'>".$cod_bancoFK."</td>
<td  id='td_datos_10' style='display:none'>".$estado."</td>
</tr>
</table>";
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta,"4"=> number_format($totalImporte,'0',',','.'));
echo json_encode($informacion);	
exit;


}

function cargarImagenPagoProveedor($id_carga_pago_total_a_compra){
	
	
			  $nombreArchivo = generarCodigoAleatorio(7) . $id_carga_pago_total_a_compra;
$ruta="/img_pago_proveedor";
$nombrePost = 'imagen';

$ext=$_POST['ext'];
$ext = utf8_decode($ext);

$respuesta = mover_archivo_carpeta($ruta,$nombreArchivo,$nombrePost,$ext);

$ruta="/GoodVentaElectroCasaMaric/img_pago_proveedor/".$nombreArchivo.".".$ext;

if($respuesta){
	$mysqli=conectar_al_servidor();
	$consulta="UPDATE pago_total_compra SET url = '$ruta' WHERE idpago_total_compra  = '$id_carga_pago_total_a_compra'";	
	$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}else{
	$informacion =array("1" => "exito", "2" => 'Problema al cargar el documento');
	echo json_encode($informacion);	
	exit;
}



}

function buscarInformePagosAProveedor($fecha_filtro,$usuario,$fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	 $filas=array();
	 
	 
	 $condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and fecha between '$fecha1' and '$fecha2' ";
}
$condicionusuario="";
if($usuario!=""){
	$condicionusuario=" and (select nombre_persona from persona where cod_persona= user_insert ) like '%".$usuario."%' ";
}
	 $condicionfecha_filtro="";
if($fecha_filtro != ""){
	$condicionfecha_filtro=" and fecha = '$fecha_filtro' ";
}


	
		$sql= "SELECT fecha,(select nombre_persona from persona where cod_persona= user_insert ) as usuario,idpago_total_compra,monto,url FROM pago_total_compra WHERE idpago_total_compra != ''".$condicionFecha.$condicionusuario.$condicionfecha_filtro." ";

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
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 $total = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {

			  $idpago_total_compra=utf8_encode($valor['idpago_total_compra']);
			  $fecha=utf8_encode($valor['fecha']);
			  $monto=utf8_encode($valor['monto']);
			  $usuario=utf8_encode($valor['usuario']);
			  $url=utf8_encode($valor['url']);
			  
			  $ver = '';
				if($url !=''){
					$ver = "<input type=\"button\" value=\"VER\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
				}
			  
			  $total+= $monto;
			  $filas[]=array(
				"id_pago" => $idpago_total_compra,
				"monto" => (float)$monto,
				"monto_formateado" => number_format($monto,'0',',','.'),
				"fecha" => $fecha,
				"usuario" => $usuario,
				"url" => $url
			  );
		  	 
			 if($formato!='json'){
			 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro' onclick='Obtenerdatosinformepagoaproveedor(this)'>
				<td id='td_datos_id' style='width:20%; background-color: #efeded;color:red'>".$idpago_total_compra."</td>
				<td  id='' style='width:20%'>".number_format($monto,'0',',','.')."</td>
				<td  id='' style='width:20%'>".$fecha."</td>
				<td  id='' style='width:20%'>".$usuario."</td>
				<td  id='' style='width:20%;text-align: center;'>".$ver."</td>
					
				</tr>
				</table>";
			 }
				
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro,"4"=> number_format($total,'0',',','.'));
echo json_encode($informacion);	
exit;


}
function buscarInformePagosAProveedorCheques($idpago_total_compra)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	 $filas=array();


	
		$sql= "SELECT nroche, orden, concep, importe,(SELECT nombre FROM banco WHERE idbanco = ch.cod_bancoFK) as banco, (SELECT nombre_persona FROM persona WHERE cod_persona = cod_proveedorFK) as proveedor,fecemi FROM detalle_pago_cheque dpc INNER JOIN cheque ch ON dpc.idchequeFK = ch.idcheque  WHERE idpago_total_compraFK = '$idpago_total_compra' and ch.estado = 'Activo' GROUP BY idchequeFK";



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

			  $nroche=utf8_encode($valor['nroche']);
			  $orden=utf8_encode($valor['orden']);
			  $concep=utf8_encode($valor['concep']);
			  $importe=utf8_encode($valor['importe']);
			  $banco=utf8_encode($valor['banco']);
			  $proveedor=utf8_encode($valor['proveedor']);
			  $fecemi=utf8_encode($valor['fecemi']);
			  $filas[]=array(
				"numero_cheque" => $nroche,
				"orden" => $orden,
				"fecha_emision" => $fecemi,
				"concepto" => $concep,
				"importe" => (float)$importe,
				"importe_formateado" => number_format($importe,'0',',','.'),
				"banco" => $banco,
				"proveedor" => $proveedor
			  );
			  
			 if($formato!='json'){
			 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro'>
				<td id='' style='width:5%; background-color: #efeded;color:red'>".$nroche."</td>
				<td  style='width:5%'>".$orden."</td>
				<td  style='width:5%'>".$fecemi."</td>
				<td  style='width:5%'>".$concep."</td>
				<td  style='width:5%'>".number_format($importe,'0',',','.')."</td>
				<td  style='width:5%'>".$banco."</td>
				<td  style='width:5%'>".$proveedor."</td>
				</tr>
				</table>";
			 }
				
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;

}
function buscarInformePagosAProveedorCompras($idpago_total_compra)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	 $filas=array();


	
		$sql= "SELECT c.fecha_compra,c.num_comprobante,(SELECT sum(subTotal) FROM detalle_compra WHERE cod_compraFK = dpc.cod_compraFK) as total FROM detalle_pago_cheque dpc INNER JOIN compra c ON dpc.cod_compraFK = c.cod_compra  
		WHERE dpc.idpago_total_compraFK = '$idpago_total_compra' GROUP BY dpc.cod_compraFK";



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

			  $fecha_compra=utf8_encode($valor['fecha_compra']);
			  $num_comprobante=utf8_encode($valor['num_comprobante']);
			  $total=utf8_encode($valor['total']);
			  $filas[]=array(
				"fecha_compra" => $fecha_compra,
				"numero_comprobante" => $num_comprobante,
				"total" => (float)$total,
				"total_formateado" => number_format($total,'0',',','.')
			  );
			  
			  
			 if($formato!='json'){
			 $styleName=CargarStyleTable($styleName);
		  	  $pagina.="
				<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
				<tr id='tbSelecRegistro'>
				<td id='' style='width:33%;'>".$fecha_compra."</td>
				<td  style='width:33%'>".$num_comprobante."</td>
				<td  style='width:33%'>".number_format($total,'0',',','.')."</td>
				</tr>
				</table>";
			 }
				
		
			  
			  
	  }
 }
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;

}

function buscar_informe_cheque_general($anho,$pagado,$tipoDeuda,$formato='')
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	$filas = array();
	
	for($x = 1; $x <= 31; $x++){
		$fila=array("dia" => $x);
		if($formato!='json'){
			$styleName = CargarStyleTable($styleName);
			$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
			<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		}
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = (float)obtener_total_cheque_dia($anho,$i,$x,$pagado,$tipoDeuda);
			$fila["mes_".$i]=$total;
			$fila["mes_".$i."_formateado"]=number_format($total, '0', ',', '.');
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			if($formato!='json'){$pagina.= $td;}
		}
		$filas[]=$fila;
		
		if($formato!='json'){$pagina.="</tr>
		</table>";}
	}

	$informacion = array("1" => "exito", "2" => ($formato=='json' ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}

function obtener_total_cheque_dia($anho,$mes,$dia,$pagado,$tipoDeuda)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and fecven = '$fecha' ";
	
	 $condicionpagado = "";
	if ($pagado != "") {
		$condicionpagado = " and pagado ='" . $pagado . "'";
	}
	
	$condiciontipodeuda = "";
	if ($tipoDeuda != "") {
		$condiciontipodeuda = " and tipo ='" . $tipoDeuda . "'";
	}
 
 
	$sql = "SELECT sum(ifnull(importe,0)) as importe FROM cheque WHERE estado = 'Activo'".$condicionFecha.$condicionpagado.$condiciontipodeuda;
 
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
	$importe = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$importe = $valor['importe'];
		}
	}
	
	return $importe;
}

function buscar_informe_cheque_general_general_grafica($anho,$pagado,$tipoDeuda)
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

			$total = obtener_total_cheque_dia($anho,$i,$x,$pagado,$tipoDeuda);
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

			$total = obtener_total_cheque_dia($anho2,$i,$x,$pagado,$tipoDeuda);
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



verificar($funt);
?>
