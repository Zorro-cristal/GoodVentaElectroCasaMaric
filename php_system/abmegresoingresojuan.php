<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include('quitarseparadormiles.php');
include("buscar_nivel.php");
require("conexion.php");
include("verificar_navegador.php");
include("classTable.php");
include("subir_foto_base64.php");



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
	
	
	$idgastos_juan=$_POST['idegresoingreso'];
$idgastos_juan = utf8_decode($idgastos_juan);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
	$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
	$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);

$nroboleta=$_POST['nroboleta'];
$nroboleta = utf8_decode($nroboleta);
$banco=$_POST['banco'];
$banco = utf8_decode($banco);
$nrocuenta=$_POST['nrocuenta'];
$nrocuenta = utf8_decode($nrocuenta);

$Arreglo=$_POST['Arreglo'];
$Arreglo = utf8_decode($Arreglo);

$cod_motivo_juan=$_POST['cod_motivo'];
$cod_motivo_juan = utf8_decode($cod_motivo_juan);

$extgasto=$_POST['ext'];
$extgasto = utf8_decode($extgasto);

$cod_usuario = $user;
$personales = "";



$fechaDeposito=$_POST['fechaDeposito'];
$fechaDeposito = utf8_decode($fechaDeposito);


	abm($fechaDeposito,$cod_motivo_juan,$Arreglo,$nroboleta, $banco , $nrocuenta ,$idgastos_juan,$monto,$motivo,$fecha,$estado,$personales,$cod_usuario,$cod_local,$tipo,$extgasto,$operacion);

}

if($operacion=="confirmarEgresoIngreso")
{
	
	
$idgastos_juan=$_POST['idegresoingresojuan'];
$idgastos_juan = utf8_decode($idgastos_juan);


$cod_usuario = $user;

	confirmarEgresoIngreso($idgastos_juan);

}

if($operacion=="buscar")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$usuario=$_POST['usuario'];
$usuario = utf8_decode($usuario);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$arreglo=$_POST['arreglo'];
$arreglo = utf8_decode($arreglo);

$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
$confirmado=$_POST['confirmado'];
$confirmado = utf8_decode($confirmado);
$banco=$_POST['banco'];
$banco = utf8_decode($banco);

$nroboleta=$_POST['nroboleta'];
$nroboleta = utf8_decode($nroboleta);

$agrupacionformulariogasto=$_POST['agrupacionformularioegresoingreso'];
$agrupacionformulariogasto = utf8_decode($agrupacionformulariogasto);

$monto=$_POST['monto'];
$monto = utf8_decode($monto);

$permisover=$_POST['permisover'];
$permisover = utf8_decode($permisover); 
 
if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
}
buscar($permisover,$user,$arreglo,$fecha1,$fecha2,$estado,$cod_local,$tipo,$usuario,$fecha,$motivo,$confirmado,$agrupacionformulariogasto,$banco,$nroboleta,$monto);

}


if($operacion=="evaluacionGasto")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);
$tipo_arreglo=$_POST['tipo_arreglo'];
$tipo_arreglo = utf8_decode($tipo_arreglo);

	buscarevaluacionGasto($fecha1,$fecha2,$local,$tipo_arreglo);

}
if($operacion=="evaluacionpagosventa")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);

	evaluacionpagosventa($fecha1,$fecha2,$local);

}
if($operacion=="evaluacionproductodcomprados")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);

	evaluacionproductodcomprados($fecha1,$fecha2,$local);

}
if($operacion=="evaluacionproductodvendidos")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);

	evaluacionproductodvendidos($fecha1,$fecha2,$local);

}
if($operacion=="evaluacionpagoscomprados")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);

	evaluacionpagoscomprados($fecha1,$fecha2,$local);

}

if($operacion=="evaluacion")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);

	buscarevaluacion($fecha1,$fecha2,$local);

}


if($operacion=="buscaroption")
{

	buscaroption();

}

if($operacion=="buscarabmmotivoingresoegreso")
{


$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

	buscarabmmotivoingresoegreso($buscar,$estado);

}


if($operacion=="NuevoMotivo")
{
	$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

	NuevoMotivo($motivo,$estado);

}

if($operacion=="editarMotivo")
{
	$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$idabm=$_POST['idabm'];
$idabm = utf8_decode($idabm);

	editarMotivo($motivo,$estado,$idabm);

}	


}

function abm($fechaDeposito,$cod_motivo_juan,$Arreglo,$nroboleta, $banco , $nrocuenta,$idgastos_juan,$monto,$motivo,$fecha,$estado,$personales,$cod_usuario,$cod_local,$tipo,$extgasto,$operacion)
{
	
	
if($monto==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

if($operacion=="nuevo")
{
 
$consulta1="Insert into gastos_juan (arreglo,monto,motivo,fecha,estado,cod_usuario,personales,cod_descripcion_local_gasto_juanFK,tipo,nroboleta,banco,nrocuenta,cod_motivo_juan,fechaDeposito)
values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssssssss';
$stmt1->bind_param($ss,$Arreglo,$monto,$motivo,$fecha,$estado,$cod_usuario,$personales,$cod_local,$tipo,$nroboleta, $banco , $nrocuenta,$cod_motivo_juan,$fechaDeposito);
}
 
if($operacion=="editar")
{

$consulta1="Update gastos_juan set arreglo=?, monto=?,motivo=?,fecha=?,estado=?,
personales=?,cod_descripcion_local_gasto_juanFK=?,tipo=?,nroboleta=?,banco=?,nrocuenta=?,cod_motivo_juan=?,fechaDeposito='$fechaDeposito' where idgastos_juan=?";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssssssss';
$stmt1->bind_param($ss,$Arreglo,$monto,$motivo,$fecha,$estado,$personales,$cod_local,$tipo,$nroboleta,$banco,$nrocuenta,$cod_motivo_juan,$idgastos_juan); 

}
 
if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

if($operacion=='editar'){
	cargar_foto_gastos($idgastos_juan);
}else{
	$ult_id = mysqli_insert_id($mysqli);
	cargar_foto_gastos($ult_id);
}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function cargar_foto_gastos($cod_gasto){
	
/* 	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); */
	
$ext=$_POST['ext'];
$ext = utf8_decode($ext);

if($ext!=""){
$foto=substr($_POST['foto'], strpos($_POST['foto'], ",") + 1);

$foto = base64_decode($foto);
	  
		     $donde="../fotos/gastos_juan/";

			  $id_foto = generarCodigoAleatorio(7);
                $id_f=subir_imagen_base64($donde,$foto,$id_foto,$ext);
$ruta="/GoodVentaElectroCasaMaric/fotos/gastos_juan/".$id_foto.$id_f.'.'.$ext;

$mysqli=conectar_al_servidor();
$consulta="UPDATE gastos_juan SET url = '$ruta' WHERE idgastos_juan  = '$cod_gasto'";	
	$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	
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

function confirmarEgresoIngreso($idgastos_juan)
{

$mysqli=conectar_al_servidor();


$consulta1="Update gastos_juan set confirmado='SI' where idgastos_juan='$idgastos_juan'";
$stmt1 = $mysqli->prepare($consulta1);



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function buscar($permisover,$user,$arreglo,$fecha1,$fecha2,$estado,$cod_local,$tipo,$usuario,$fecha,$cod_motivo_juan,$confirmado,$agrupacionformulariogasto,$banco,$nroboleta,$monto)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	 $condicionCodLocal=" and g.cod_descripcion_local_gasto_juanFK='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		 $condiciontipo="";
		 if($tipo!=""){
			$condiciontipo=" and tipo='$tipo' "; 
		 }
		 
		 $condicionbanco="";
		 if($banco!=""){
			$condicionbanco=" and banco like '%".$banco."%' "; 
		 }
		 
		 $condicionmonto="";
		 if($monto!=""){
			$condicionmonto=" and monto='$monto' "; 
		 }
		 
		 $condicionconfirmado="";
		 if($confirmado!=""){
			$condicionconfirmado=" and confirmado='$confirmado' "; 
		 }		 
		 
		 $condicionarreglo="";
		 if($arreglo!=""){
			$condicionarreglo=" and arreglo='$arreglo' "; 
		 }		 
		 
		 $condicionnroboleta="";
		 if($nroboleta!=""){
			$condicionnroboleta=" and nroboleta like '%".$nroboleta."%' "; 
		 }
		 
		 $condicionfecha="";
		 if($fecha!=""){
			$condicionfecha=" and fecha='$fecha' "; 
		 }
		 $condicionusuario="";
		 if($usuario!=""){
			$condicionusuario=" and (Select nombre_persona from persona where cod_persona=cod_usuario) like '%".$usuario."%' "; 
		 }
		 $condicionrangofechas="";
		 if($fecha1!="" && $fecha2!="" ){
			$condicionrangofechas=" and fecha>='$fecha1' and fecha<='$fecha2' "; 
		 }
		 
		 $condicionmotivo="";
		 if($cod_motivo_juan!=""){
			$condicionmotivo=" and  cod_motivo_juan = '".$cod_motivo_juan."' "; 
		 }
		 
		 $condicionagrupacion = '';
		 if($agrupacionformulariogasto == '2'){
			 $condicionagrupacion = ' group by cod_motivo_juan';
		 }
		 
		 
		  $condicionpermisover="";
		 if($permisover=="NO"){
			$condicionpermisover=" and cod_usuario='$user' "; 
		 }
		 
		 
		$sql= "Select fechaDeposito,arreglo,monto, ifnull((select descripcion from  motivo_e_i_juan where idmotivo_e_i_juan=cod_motivo_juan),'') as descripcion,motivo,fecha,estado,cod_usuario,idgastos_juan,tipo,cod_descripcion_local_gasto_juanFK,nroboleta,banco,nrocuenta,cod_motivo_juan,
		(Select nombre_persona from persona where cod_persona=cod_usuario) as usuarionombre,confirmado,url,
		(SELECT idbanco FROM banco b where b.nombre = g.banco) as cod_banco,
		(Select descripcion from descripcion_local_gasto_juan where cod_descripcion_local_gasto_juanFK=cod_descripcion_local_gasto_juan) as nombrelocal
		from gastos_juan g where  estado='$estado' ".$condicionpermisover.$condicionCodLocal.$condicionarreglo.$condiciontipo.$condicionfecha.$condicionusuario.$condicionrangofechas.$condicionmotivo.$condicionconfirmado.$condicionagrupacion.$condicionbanco.$condicionnroboleta.$condicionmonto;
   


   
   
   $arregloFiltro = $arreglo;
   $fecha1Filtro = $fecha1;
   $fecha2Filtro = $fecha2;
   $estadoFiltro = $estado;
   $cod_localFiltro = $cod_local;
   $tipoFiltro = $tipo;
   $usuarioFiltro = $usuario;
   $fechaFiltro = $fecha;
   $cod_motivoFiltro = $cod_motivo_juan;
   $confirmadoFiltro = $confirmado;
   
   
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
 $totalMonto = 0;
 $totalMontoAgrupado = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $fechaDeposito=$valor['fechaDeposito'];
		      $cod_motivo_juan=$valor['cod_motivo_juan'];
		      $descripcion=utf8_encode($valor['descripcion']);
		      $idgastos_juan=$valor['idgastos_juan'];
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $monto=utf8_encode($valor['monto']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_local=utf8_encode($valor['cod_descripcion_local_gasto_juanFK']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	  $nroboleta=utf8_encode($valor['nroboleta']);
		  	  $banco=utf8_encode($valor['banco']);
		  	  $nrocuenta=utf8_encode($valor['nrocuenta']);
			  $arreglo=utf8_encode($valor['arreglo']);
			  $confirmado=utf8_encode($valor['confirmado']);
			  $url=utf8_encode($valor['url']);
			  $cod_banco=utf8_encode($valor['cod_banco']);
			  
				$totalGasto=$totalGasto+$monto;
		  	 
				$fecha2 = date("d-m-Y", strtotime($fecha));
	
		  	  $styleName=CargarStyleTable($styleName);
			  
			  $style='';
			  if($confirmado == 'SI'){
				  $style= 'background-color:#09b26d;color:#fff';
			  }
			  $MotivoGrupo="";
			  if($agrupacionformulariogasto == '2'){
				  $totalMonto = obtener_total_agrupacion_motivo($arregloFiltro,$fecha1Filtro,$fecha2Filtro,$estadoFiltro,$cod_localFiltro,$tipoFiltro,$usuarioFiltro,$fechaFiltro,$cod_motivo_juan,$confirmadoFiltro);
				  $totalMontoAgrupado += $totalMonto;
				  $MotivoGrupo=$descripcion;
			  }else{
				  $MotivoGrupo=$motivo." <br><b>".$descripcion."</b>";
			  }
			  $btnVer = '';
			  $fotourl = '';
			  $ext = '';
			  if($url != ''){
				$partes = explode('.', $url, 2);
				$fotourl = $partes[0];
				$ext = isset($partes[1]) ? $partes[1] : '';
				
				$btnVer = "<input type=\"button\" value=\"Ver\" style=\"width:50px\" class=\"btn4\" onclick=\"verdocumentoClienteSolicitud('$url')\" />";
			  }
			  
if($tipo!="Deposito"){
	$fechaDeposito="";
}  

			  $montoListado=$agrupacionformulariogasto == '2' ? $totalMonto : $monto;
			  $filas[]=array(
				  "id" => $idgastos_juan,
				  "motivo" => $motivo,
				  "descripcion" => $descripcion,
				  "motivo_orden" => $agrupacionformulariogasto == '2' ? $descripcion : trim($motivo.' '.$descripcion),
				  "monto" => floatval($montoListado),
				  "monto_formateado" => number_format($montoListado,'0',',','.'),
				  "tipo" => $tipo,
				  "fecha_deposito" => $fechaDeposito,
				  "fecha" => $fecha,
				  "fecha_formateada" => $fecha2,
				  "nro_boleta" => $nroboleta,
				  "local" => $nombrelocal,
				  "banco" => $banco,
				  "cod_banco" => $cod_banco,
				  "cuenta" => $nrocuenta,
				  "arreglo" => $arreglo,
				  "usuario" => $usuarionombre,
				  "confirmado" => $confirmado,
				  "estado" => $estado,
				  "cod_local" => $cod_local,
				  "cod_motivo" => $cod_motivo_juan,
				  "url" => $url,
				  "foto_url" => $fotourl,
				  "foto_ext" => $ext,
				  "agrupado" => $agrupacionformulariogasto == '2' ? 'SI' : 'NO'
			  );
			  
			  if($formato!='json'){
			  $pagina.="
<table class='$styleName'style='$style' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmEgresoIngresoJuan(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idgastos_juan."</td>
<td  id='td_datos_2'	style='width:10%'>".$MotivoGrupo."</td>
<td  id='td_datos_1'	style='width:5%'>". number_format($agrupacionformulariogasto == '2' ? $totalMonto : $monto ,'0',',','.')."</td>
<td  	style='width:5%'>".$tipo."<br>".$fechaDeposito."</td>
<td  id='td_datos_6'	style='display:none'>".$tipo."</td>
<td  id='td_datos_3'	style='display:none'>".$fecha."</td>
<td                  	style='width:10%'>".$fecha2."</td>
<td  id='td_datos_14'	style='width:10%'>".$nroboleta."</td>
<td  id='' 				style='width:10%'>".$nombrelocal."</td>
<td  id=''	style='width:5%'>".$banco."</td>
<td  id='td_datos_9'	style='display:none'>".$cod_banco."</td>
<td  id='td_datos_10' 	style='width:10%'>".$nrocuenta."</td>
<td  id='td_datos_11'	style='width:5%'>".$arreglo."</td>
<td  id='td_datos_8' 	style='width:10%'>".$usuarionombre."</td>
<td  					style='width:5%'>".$confirmado."</td>
<td  					style='width:5%'>".$btnVer."</td>
<td  id='td_datos_5' 	style='display:none'>".$estado."</td>
<td  id='td_datos_7' 	style='display:none'>".$cod_local."</td>
<td  					style='display:none'>".$cod_motivo_juan."</td>
<td  id='td_datos_13'					style='display:none'>".$motivo."</td>
<td  id='td_datos_15'	style='display:none'>".$url."</td>
<td  id='td_datos_16'	style='display:none'>".$fotourl."</td>
<td  id='td_datos_17'	style='display:none'>".$ext."</td>
<td  id='td_datos_18'	style='display:none'>".$fechaDeposito."</td>
<td  id='td_datos_12'	style='display:none'>".$descripcion."</td>
</tr>
</table>";
			  }
			  
	  }
 }
 
 /*v=spf1 +a +mx include:relay.mailchannels.net ~all*/
 
/*  echo $totalMonto;
 exit; */
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $formato=='json' ? $filas : $pagina,"3" => $nroRegistro,"4" =>  number_format($agrupacionformulariogasto == '2' ? $totalMontoAgrupado : $totalGasto,'0',',','.'));
echo json_encode($informacion);	
exit;


}

function obtener_total_agrupacion_motivo($arreglo,$fecha1,$fecha2,$estado,$cod_local,$tipo,$usuario,$fecha,$motivo,$confirmado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
$condicionCodLocal=" and g.cod_descripcion_local_gasto_juanFK='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		 $condiciontipo="";
		 if($tipo!=""){
			$condiciontipo=" and tipo='$tipo' "; 
		 }
		 
		 $condicionconfirmado="";
		 if($confirmado!=""){
			$condicionconfirmado=" and confirmado='$confirmado' "; 
		 }
		 
		 
		 $condicionarreglo="";
		 if($arreglo!=""){
			$condicionarreglo=" and arreglo='$arreglo' "; 
		 }
		 
		 
		 $condicionfecha="";
		 if($fecha!=""){
			$condicionfecha=" and fecha='$fecha' "; 
		 }
		 $condicionusuario="";
		 if($usuario!=""){
			$condicionusuario=" and (Select nombre_persona from persona where cod_persona=cod_usuario) like '%".$usuario."%' "; 
		 }
		 $condicionrangofechas="";
		 if($fecha1!="" && $fecha2!="" ){
			$condicionrangofechas=" and fecha>='$fecha1' and fecha<='$fecha2' "; 
		 }
		 
		 $condicionmotivo="";
		 if($motivo!=""){
			$condicionmotivo=" and  cod_motivo_juan = '".$motivo."' "; 
		 }
		 
		$sql= "Select arreglo,monto, ifnull((select descripcion from  motivo_e_i_juan where idmotivo_e_i_juan=cod_motivo_juan),'') as descripcion,motivo,fecha,estado,cod_usuario,idgastos_juan,tipo,cod_descripcion_local_gasto_juanFK,nroboleta,banco,nrocuenta,cod_motivo_juan,
		(Select nombre_persona from persona where cod_persona=cod_usuario) as usuarionombre,confirmado,
		(Select descripcion from descripcion_local_gasto_juan where cod_descripcion_local_gasto_juanFK=cod_descripcion_local_gasto_juan) as nombrelocal
		from gastos_juan g where  estado='$estado' ".$condicionCodLocal.$condicionarreglo.$condiciontipo.$condicionfecha.$condicionusuario.$condicionrangofechas.$condicionmotivo.$condicionconfirmado;
   
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
 $totalMonto = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  

		  	  $monto=utf8_encode($valor['monto']);
		  	 
			  $totalMonto += $monto;
	  }
 }

 
return $totalMonto;
}



function buscarevaluacion($fecha1,$fecha2,$cod_local)
{
	
$datosGastos=buscaregastos($fecha1,$fecha2,$cod_local);
$paginaGasto=$datosGastos[0];
$nroRegistroGasto=$datosGastos[1];
$totalGasto=$datosGastos[2];
$datosPagos=buscarpagos($fecha1,$fecha2,$cod_local);
$paginaPagos=$datosPagos[0];
$totalPagos=$datosPagos[1];
$nroRegistroPagos=$datosPagos[2];
$datosEntregas=buscarpagosEntregas($fecha1,$fecha2,$cod_local);
$paginaEntrega=$datosEntregas[0];
$totalEntrega=$datosEntregas[1];
$nroRegistroEntrega=$datosEntregas[2];
// $datosVentas=buscarproductovendidos($fecha1,$fecha2,$cod_local,"CREDITO");
// $paginaVentas=$datosVentas[0];
// $totalventas=$datosVentas[1];
// $nroRegistroVentas=$datosVentas[2];
// $datosVentasContado=buscarproductovendidos($fecha1,$fecha2,$cod_local,"CONTADO");
// $paginaVentasContado=$datosVentasContado[0];
// $totalventasContado=$datosVentasContado[1];
// $nroRegistroVentasContado=$datosVentasContado[2];
$paginaVentas=0;
$totalventas=0;
$nroRegistroVentas=0;
$paginaVentasContado=0;
$totalventasContado=0;
$nroRegistroVentasContado=0;
$datosCompras=buscarproductocomprados($fecha1,$fecha2,$cod_local);
$paginaVentasCompras=$datosCompras[0];
$totalCompras=$datosCompras[1];
$nroRegistroCompras=$datosCompras[2];
$datosProductosVen= buscarproductovendidos($fecha1,$fecha2,$cod_local);
$paginaProductosVend=$datosProductosVen[0];
$totalProductoVend=$datosProductosVen[1];
$nroRegistroProductoVend=$datosProductosVen[2];



$Saldo=($totalPagos+$totalEntrega)-$totalGasto;

$totalGasto=number_format($totalGasto,'0',',','.');
$totalPagos=number_format($totalPagos,'0',',','.');
$totalEntrega=number_format($totalEntrega,'0',',','.');
$totalventas=number_format($totalventas,'0',',','.');
$totalventasContado=number_format($totalventasContado,'0',',','.');
$totalCompras=number_format($totalCompras,'0',',','.');
$totalProductoVend=number_format($totalProductoVend,'0',',','.');
$Saldo=number_format($Saldo,'0',',','.');

  
$informacion =array("1" => "exito","2" => $paginaGasto,"3" => $totalGasto,"4" => $nroRegistroGasto
,"5" => $paginaPagos,"6" => $totalPagos,"7" => $nroRegistroPagos
,"8" => $paginaEntrega,"9" => $totalEntrega,"10" => $nroRegistroEntrega
,"11" => $paginaVentas,"12" => $totalventas,"13" => $nroRegistroVentas,"14" => $Saldo
,"15" => $paginaVentasContado,"17" => $totalventasContado,"16" => $nroRegistroVentasContado
,"18" => $paginaVentasCompras,"19" => $totalCompras,"20" => $nroRegistroCompras
,"21" => $paginaProductosVend,"22" => $totalProductoVend,"23" => $nroRegistroProductoVend);
echo json_encode($informacion);	
exit;
}




function buscarevaluacionGasto($fecha1,$fecha2,$cod_local,$tipo_arreglo)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $condicionCodLocal=" and g.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		 
		 $condiciontipoarreglo="";
		 if($tipo_arreglo!=""){
			$condiciontipoarreglo=" and g.arreglo='$tipo_arreglo'"; 
		 }
		$sql= "Select monto,motivo,fecha,estado,cod_usuario,idgastos_juan,personales,cod_local,
		(Select nombre_persona from persona where cod_persona=cod_usuario) as usuarionombre,
		(Select Nombre from local l where l.cod_local=g.cod_local ) as nombrelocal
		from gastos_juan g where fecha>='$fecha1' and fecha<='$fecha2' and estado='Activo' ".$condicionCodLocal.$condiciontipoarreglo;
		

   
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
		  
		  
		      $idgastos_juan=$valor['idgastos_juan'];
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $monto=utf8_encode($valor['monto']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $personales=utf8_encode($valor['personales']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $cod_local=utf8_encode($valor['cod_local']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	 $totalGasto=$totalGasto+$monto;
		  	 
			    	 
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick=''>
<td  id='td_datos_2' style='width:10%'>".$motivo."</td>
<td  id='td_datos_1' style='width:10%'>". number_format($monto,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".$personales."</td>
<td  id='td_datos_3' style='width:10%'>".$fecha."</td>
<td  id='td_datos_4' style='width:10%'>".$usuarionombre."</td>
<td  id='' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";
			  
			  
	  }
 }

 
$informacion =array("1" => "exito","2" => $pagina,"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($totalGasto,'0',',','.'));
echo json_encode($informacion);	
exit;

}

/*Buscar */
function evaluacionpagosventa($fecha1,$fecha2,$cod_local)
{
$mysqli=conectar_al_servidor();
 $condicionCodLocal=" and vt.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }

	
$sql= "select pg.idPago,pg.nrofactura, pg.Fecha, pg.Monto,pg.cod_venta_fk, pg.comision, pg.lot, pg.lat,(Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK) as nombrecliente,
(Select nombre_persona from persona where cod_persona=pg.cod_cobradorFK) as cobradornombre,date_format(hora ,'%H:%i' ) as hora,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal,
vt.num_factura,vt.puntoexpedicion,
(Select nombre from zona z where z.idzona=(Select idzonaFk from cliente pr inner join venta vt on vt.cod_clienteFK=pr.cod_cliente where vt.cod_venta=pg.cod_venta_fk)) as nombrezona
 from  pago pg inner join venta vt on vt.cod_venta=pg.cod_venta_fk 
 where Fecha>='$fecha1' and Fecha<='$fecha2' ".$condicionCodLocal." group by  pg.idPago ";/*Sentencia para buscar registros*/	
	




 $pagina = "";   
$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
/*Función para ejecutar sentencias sql*/
if ( ! $stmt->execute()) {
/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}
$totalPagado=0;
$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$idPago = utf8_encode($valor['idPago']);    
$num_factura = utf8_encode($valor['num_factura']);    
$Monto = utf8_encode($valor['Monto']);      
$Fecha = utf8_encode($valor['Fecha']);      
$cobradornombre = utf8_encode($valor['cobradornombre']);      
$cod_venta = utf8_encode($valor['cod_venta_fk']);      
$nombrezona = utf8_encode($valor['nombrezona']);      
$hora = utf8_encode($valor['hora']);      
$comision = utf8_encode($valor['comision']);      
$lot = utf8_encode($valor['lot']);      
$lat = utf8_encode($valor['lat']);      
$nombrecliente = utf8_encode($valor['nombrecliente']);      
$nombrelocal = utf8_encode($valor['nombrelocal']);      
$nrofactura = utf8_encode($valor['nrofactura']);      
$totalPagado=$Monto+$totalPagado;
 	$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);   
			
			   if($puntoexpedicion!=""){
	$nrof=$puntoexpedicion."-".$num_factura;
}else{
	$nrof=$num_factura;
}	

$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'  >
<td id='td_datos_3' style='width:10%'>".$nrof."</td>
<td id='' style='width:10%' >".$Fecha." ".$hora."</td>
<td id='td_datos_5' style='width:10%'>". number_format($Monto,'0',',','.')."</td>
<td id='' style='width:10%'>".$nombrezona."</td>
<td id='' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";


}
}

$informacion =array("1" => "exito","2" => $pagina,"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($totalPagado,'0',',','.'));
echo json_encode($informacion);	
exit;
}


function evaluacionproductodcomprados($fecha1,$fecha2,$cod_local)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	  $condicionCodLocal=" and cpr.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		$sql= "Select sum(dc.cantidad_detalle_compra) as totalCantidad,pro.cod_producto
		,sum(dc.subTotal) as totalCompra,dc.precio_producto as precio_producto
		,dc.cod_productoFK,pro.nombre_producto
		,(select descripcion from marcas where cod_marcas= pro.cod_marcasFK limit 1 ) as NombreMarca
		,(Select Nombre from local l where l.cod_local=cpr.cod_local) as nombrelocal
		from detalle_compra dc inner join producto pro on pro.cod_producto=dc.cod_productoFK inner join compra cpr on cpr.cod_compra=dc.cod_compraFK
		where fecha_compra>='".$fecha1."' and fecha_compra<='".$fecha2."'  ".$condicionCodLocal." group by pro.cod_producto,dc.precio_producto";
		$total_compra=0;
		$nroRegistro=0;
   
   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
   echo "Error";
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
		  
		  
		      $totalCantidad=$valor['totalCantidad'];
		      $totalCompra=$valor['totalCompra'];
		  	  $nombre_producto=utf8_encode($valor['nombre_producto']);
		  	  $cod_producto=utf8_encode($valor['cod_producto']);
		  	  $NombreMarca=utf8_encode($valor['NombreMarca']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	  $precio_producto=utf8_encode($valor['precio_producto']);
		  	
		  	
		  	 $total_compra=$totalCompra+$total_compra;
			    	 
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='' style='width:10%'>".$cod_producto."</td>
<td  id='' style='width:15%'>".$nombre_producto."</td>
<td  id='' style='width:10%'>".$NombreMarca."</td>
<td  id=''  style='width:10%'>".number_format($totalCantidad,'2',',','.')."</td>
<td  id=''  style='width:10%'>".number_format($precio_producto,'0',',','.')."</td>
<td  id=''  style='width:10%'>".number_format($totalCompra,'0',',','.')."</td>
<td  id='' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";
			  
			  
	  }
 }
 

 
 $informacion =array("1" => "exito","2" => $pagina,"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($total_compra,'0',',','.'));
echo json_encode($informacion);	
exit;

}

function evaluacionpagoscomprados($fecha1,$fecha2,$cod_local)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	  $condicionCodLocal=" and cpr.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		$sql= "Select pg.monto,pg.fechadelpago,pg.fechaapagar,pg.tipo,cpr.num_comprobante
		,(Select Nombre from local l where l.cod_local=cpr.cod_local) as nombrelocal
		from pagosdecompra pg inner join compra cpr on cpr.cod_compra=pg.cod_compraFk
		where pg.fechadelpago>='".$fecha1."' and pg.fechadelpago<='".$fecha2."' and pg.estado='Pagado'  ".$condicionCodLocal."";
		
		
		$total_compra=0;
		$nroRegistro=0;
   
   
   $stmt = $mysqli->prepare($sql);
  

if ( ! $stmt->execute()) {
   echo "Error";
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
		  
		  
		      $monto=$valor['monto'];
		      $fechadelpago=utf8_encode($valor['fechadelpago']);
		  	  $fechaapagar=utf8_encode($valor['fechaapagar']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $num_comprobante=utf8_encode($valor['num_comprobante']);
		  	  $nombrelocal=utf8_encode($valor['nombrelocal']);
		  	
		  	
		  	
		  	 $total_compra=$total_compra+$monto;
			    	 
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='' style='width:10%'>".number_format($monto,'0',',','.')."</td>
<td  id='' style='width:10%'>".$fechadelpago."</td>
<td  id='' style='width:10%'>".$fechaapagar."</td>
<td  id='' style='width:10%'>".$tipo."</td>
<td  id='' style='width:10%'>".$num_comprobante."</td>
<td  id='' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";
			  
			  
	  }
 }
 

 
 $informacion =array("1" => "exito","2" => $pagina,"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($total_compra,'0',',','.'));
echo json_encode($informacion);	
exit;

}


function  evaluacionproductodvendidos($fecha1,$fecha2,$cod_local)
{
$mysqli=conectar_al_servidor();
	 $condicionCodLocal=" and vt.cod_local='$cod_local' ";
		 if($cod_local==""){
			$condicionCodLocal=" "; 
		 }
		
$sql= "select pr.cod_producto,pr.nombre_producto,
sum(dtv.cantidad_detalle) as totalCantidad,
(select descripcion from marcas where cod_marcas= pr.cod_marcasFK limit 1 ) as NombreMarca,
sum(dtv.cantidad_detalle*dtv.precio_producto) as totalVenta,
sum(dtv.cantidad_detalle*dtv.subPrecioCompra) as totalCosto,
(Select Nombre from local l where l.cod_local=vt.cod_local) as nombrelocal
 from  producto pr inner join detalle_venta dtv on dtv.cod_productoFK=pr.cod_producto
 inner join venta vt on vt.cod_venta=dtv.cod_ventaFK 
where vt.fecha_venta>='".$fecha1."' and vt.fecha_venta<='".$fecha2."'
and IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0)=0
and IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0)=0
and IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0)=0
 ".$condicionCodLocal." group by pr.cod_producto ";/*Sentencia para buscar registros*/

$pagina = "";   
$totalventa = "0";   
$totalpagado = "0";   
$totalventas = "0";   
$totalinvertido = "0";   
$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
/*Función para ejecutar sentencias sql*/
if ( ! $stmt->execute()) {
/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
$styleName="tableRegistroSearch";



if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$cod_producto = utf8_encode($valor['cod_producto']);/*Obtenemos el registro mediante el nombre del atributo */      
$nombre_producto = utf8_encode($valor['nombre_producto']);          
$totalCantidad = utf8_encode($valor['totalCantidad']);          
$totalVenta = utf8_encode($valor['totalVenta']); 
$nombrelocal = utf8_encode($valor['nombrelocal']); 
$totalCosto = utf8_encode($valor['totalCosto']); 
$NombreMarca = utf8_encode($valor['NombreMarca']); 

$totalventas=$totalVenta+$totalventas;
$totalinvertido=$totalinvertido+$totalCosto;

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro'   >
<td id='' style='width:10%'>".$cod_producto."</td>
<td id='' style='width:20%'>".$nombre_producto."</td>
<td id='' style='width:15%'>".$NombreMarca."</td>
<td  id='' style='width:10%'>".number_format($totalCantidad,'2',',','.') ."</td>
<td  id='' style='width:10%'>".number_format($totalVenta,'0',',','.')."</td>
<td  id='' style='width:10%'>".$nombrelocal."</td>
</tr>
</table>";


}
}
$informacion =array("1" => "exito","2" => $pagina,"3" => number_format($nroRegistro,'0',',','.'),"4" => number_format($totalventas,'0',',','.'));
echo json_encode($informacion);	
exit;
}

function buscaroption()
{
	$mysqli=conectar_al_servidor();
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$filas=array();
	
		$sql= "Select * from motivo_e_i_juan where estado='Activo' order by descripcion asc  ";
		
		
		 $pagina="<option  value='' >SELECCIONAR</option>";       
   $paginaList = "";
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
		  
		  
		      $idmotivo_e_i=$valor['idmotivo_e_i_juan'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
			  $filas[]=array(
				  "codigo" => $idmotivo_e_i,
				  "descripcion" => $descripcion,
				  "estado" => utf8_encode(isset($valor['Estado']) ? $valor['Estado'] : $valor['estado'])
			  );
				  	 
		  	 
			    	
			  $pagina.="<option  value='$idmotivo_e_i' >".$descripcion."</option>";     
			  
			  
			  $paginaList.="<option id='$idmotivo_e_i' value='".$descripcion."'></option>";	
	  }
 }
 
 

 
 mysqli_close($mysqli);
 if($formato=='json'){
	 $pagina=$filas;
	 $paginaList=$filas;
 }
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro,"4"=>$paginaList);
echo json_encode($informacion);	
exit;


}


function NuevoMotivo($motivo,$estado)
{
	
if($motivo==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into motivo_e_i_juan (descripcion,estado) values (upper(?),'$estado')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$motivo);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}


function editarMotivo($motivo,$estado,$idabm)
{
	
if($motivo==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="update motivo_e_i_juan SET descripcion = upper('$motivo'), estado ='$estado' WHERE idmotivo_e_i_juan ='$idabm'";
$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function buscarabmmotivoingresoegreso($buscar,$Estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		$sql= "Select idmotivo_e_i_juan,descripcion,Estado
        from motivo_e_i_juan where descripcion like ?  and Estado=? order by descripcion asc ";
		
 
   
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
$stmt->bind_param($s,$buscar1,$Estado);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $idmotivo_e_i=$valor['idmotivo_e_i_juan'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
			  $filas[]=array(
				  "codigo" => $idmotivo_e_i,
				  "descripcion" => $descripcion,
				  "estado" => $Estado
			  );
		  	 
			  
		  	 
			  $styleName=CargarStyleTable($styleName);
			  if($formato!='json'){
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmMotivoEgresoIngresoJuan(this)'>
			  <td id='td_id' style='display:none;'>".$idmotivo_e_i."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$descripcion."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			  </tr>
			  </table>";
			  }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}




verificar($operacion);
?>
