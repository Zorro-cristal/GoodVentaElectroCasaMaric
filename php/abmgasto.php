<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include('quitarseparadormiles.php');
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
	
	
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$idaperturacierrecaja=$_POST['idaperturacierrecaja'];
$idaperturacierrecaja = utf8_decode($idaperturacierrecaja);
$nroboleta=$_POST['nroboleta'];
$nroboleta = utf8_decode($nroboleta);
$banco=$_POST['banco'];
$banco = utf8_decode($banco);
$nrocuenta=$_POST['nrocuenta'];
$nrocuenta = utf8_decode($nrocuenta);

$Arreglo=$_POST['Arreglo'];
$Arreglo = utf8_decode($Arreglo);

$observacion=$_POST['observacion'];
$observacion = utf8_decode($observacion);

$cod_motivo=$_POST['cod_motivo'];
$cod_motivo = utf8_decode($cod_motivo);

$cod_usuario = $user;

	abm($cod_motivo,$Arreglo,$nroboleta, $banco , $nrocuenta,$monto,$fecha,$cod_usuario,$tipo,$idaperturacierrecaja,$observacion,$operacion);

}

if($operacion=="buscar")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$cod_usuario = $user;
$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);



buscar($fecha1,$fecha2,$tipo,$cod_usuario,$motivo);

}

if($operacion=="buscartotalingresoegreso")
{
$codCobrador=$_POST['useru'];
$codCobrador = utf8_decode($codCobrador);




buscartotalingresoegreso($codCobrador);

}	

if($operacion=="buscaroption")
{

	buscaroption();

}


if($operacion=="NuevoMotivo")
{
	$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);

	NuevoMotivo($motivo);

}	


}

function abm($cod_motivo,$Arreglo,$nroboleta, $banco , $nrocuenta,$monto,$fecha,$cod_cobradorFK,$tipo,$idaperturacierrecaja,$observacion,$operacion)
{
	
	
if($monto==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$estado = 'Activo';


$consulta1="Insert into gastos_cobrador (arreglo,monto,fecha,estado,cod_cobradorFK,tipo,codApertura,nroboleta,banco,nrocuenta,cod_motivo,observacion)
values(?,?,?,?,?,?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssssss';
$stmt1->bind_param($ss,$Arreglo,$monto,$fecha,$estado,$cod_cobradorFK,$tipo,$idaperturacierrecaja,$nroboleta, $banco , $nrocuenta,$cod_motivo,$observacion);


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



$ext=$_POST['ext'];
$ext = utf8_decode($ext);
if($ext != ''){
	$idegresoingreso = obtenerUltimaId();
	cargarFotos($idegresoingreso);
}



mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function cargarFotos($cod_egresoingreso){
	
$ext=$_POST['ext'];
$ext = utf8_decode($ext);



$foto=substr($_POST['foto'], strpos($_POST['foto'], ",") + 1);;
$foto = base64_decode($foto);
$id_foto="";
		     $donde="../fotos/gastos/";
			  $id_foto=$cod_egresoingreso;
                $id_f=subir_imagen_base64($donde,$foto,$id_foto,$ext);
$ruta="/GoodVentaElectroCasaMaric/fotos/gastos/".$cod_egresoingreso.$id_f.'.'.$ext;
CargaFoto("url",$ruta,$cod_egresoingreso);



}

function CargaFoto($tableName,$Urlfoto,$cod_egresoingreso){
	$mysqli=conectar_al_servidor();
	$consulta="Update gastos_cobrador set ".$tableName."=? where idgastos_cobrador=? ";	

	$stmt = $mysqli->prepare($consulta);
$ss='ss';
$stmt->bind_param($ss,$Urlfoto,$cod_egresoingreso); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

 mysqli_close($mysqli); 
}

function obtenerUltimaId()
{
	$idgastos_cobrador ="";
	$mysqli=conectar_al_servidor();
	$sql= "Select idgastos_cobrador from gastos_cobrador where estado='Activo'  order by idgastos_cobrador desc limit 1";
	
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
		  
		  
		      $idgastos_cobrador=$valor['idgastos_cobrador'];
		   	 
			  
	  }
 }
 
  mysqli_close($mysqli); 
 return $idgastos_cobrador;
}

function buscar($fecha1,$fecha2,$tipo,$cod_usuario,$motivo)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';

		 $condiciontipo="";
		 if($tipo!=""){
			$condiciontipo=" and tipo='$tipo' "; 
		 }
		 $condicionusuario="";
		 if($cod_usuario!=""){
			$condicionusuario=" and cod_cobradorFK ='".$cod_usuario."' "; 
		 }
		 $condicionrangofechas="";
		 if($fecha1!="" && $fecha2!="" ){
			$condicionrangofechas=" and fecha>='$fecha1' and fecha<='$fecha2' "; 
		 }
		 
		 $condicionmotivo="";
		 if($motivo!=""){
			$condicionmotivo=" and cod_motivo = '$motivo'"; 
		 }
		 
		 
		$sql= "Select arreglo,monto,fecha,estado,cod_cobradorFK,idgastos_cobrador,tipo,nroboleta,banco,nrocuenta,cod_motivo,
		(SELECT descripcion from motivo_e_i WHERE idmotivo_e_i = cod_motivo) as motivo,
		cod_motivo,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as usuarionombre
		from gastos_cobrador g where  estado='Activo' ".$condiciontipo.$condicionusuario.$condicionrangofechas.$condicionmotivo;

   
   $stmt = $mysqli->prepare($sql);
 
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
		  
		  
		      $cod_motivo=$valor['cod_motivo'];
		      $idgastos=$valor['idgastos_cobrador'];
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $monto=utf8_encode($valor['monto']);
		  	  $motivo=utf8_encode($valor['motivo']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $nroboleta=utf8_encode($valor['nroboleta']);
		  	  $banco=utf8_encode($valor['banco']);
		  	  $nrocuenta=utf8_encode($valor['nrocuenta']);
			  $arreglo=utf8_encode($valor['arreglo']);
			  
		  	 
	
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red;display:none'>".$idgastos."</td>
<td id='td_datos_1' style='width:33%'>".$motivo."</td>
<td id='td_datos_2' style='width:33%'>". number_format($monto,'0',',','.')."</td>
<td id='td_datos_3' style='width:33%'>".$tipo."</td>
<td id='td_datos_4' style='display:none'>".$cod_motivo."</td>
<td id='td_datos_5' style='display:none'>".$fecha."</td>
<td id='td_datos_6' style='display:none'>".$nroboleta."</td>
<td id='td_datos_7' style='display:none'>".$banco."</td>
<td id='td_datos_8' style='display:none'>".$nrocuenta."</td>
<td id='td_datos_9' style='display:none'>".$arreglo."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscartotalingresoegreso($codCobrador)
{
	$mysqli=conectar_al_servidor();


		 $fechahoy = date('Y-m-d');
		 
		 
		$sql= "Select arreglo,monto,fecha,estado,cod_cobradorFK,idgastos_cobrador,tipo,nroboleta,banco,nrocuenta,cod_motivo,
		(SELECT descripcion from motivo_e_i WHERE idmotivo_e_i = cod_motivo) as motivo,
		(Select nombre_persona from persona where cod_persona=cod_cobradorFK) as usuarionombre
		from gastos_cobrador g where  estado='Activo' and cod_cobradorFK = '$codCobrador' and fecha = '$fechahoy'";

   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 $totalIngreso = "0";
 $totalEgreso = "0";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  	  $monto=utf8_encode($valor['monto']);
		  	  $tipo=utf8_encode($valor['tipo']);

			  
			  if($tipo == "INGRESO"){
				  $totalIngreso = $totalIngreso + $monto;
			  }else{
				  $totalEgreso = $totalEgreso + $monto;
			  }
			  
		  	 
	
		  	  
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => number_format($totalIngreso,'0',',','.'),"3"=>number_format($totalEgreso,'0',',','.'));
echo json_encode($informacion);	
exit;
}



function buscaroption()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from motivo_e_i where estado='Activo' order by  descripcion asc  ";
		
		
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
		  
		  
		      $idmotivo_e_i=$valor['idmotivo_e_i'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$idmotivo_e_i' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}




verificar($operacion);
?>