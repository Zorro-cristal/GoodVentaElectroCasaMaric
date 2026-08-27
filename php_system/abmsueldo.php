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
	
	
$idsueldo=$_POST['idsueldo'];
$idsueldo = utf8_decode($idsueldo);
$comision=$_POST['comision'];
$comision = quitarseparadormiles($comision);
$totalrecaudado=$_POST['totalrecaudado'];
$totalrecaudado = quitarseparadormiles($totalrecaudado);
$sueldo=$_POST['sueldo'];
$sueldo = quitarseparadormiles($sueldo);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$cod_persona=$_POST['cod_persona'];
$cod_persona = utf8_decode($cod_persona);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$tipouser=$_POST['tipouser'];
$tipouser = utf8_decode($tipouser);

$estadoRegistro=$_POST['estadoRegistro'];
$estadoRegistro = utf8_decode($estadoRegistro);
	abm($estadoRegistro,$idsueldo,$comision,$totalrecaudado,$sueldo,$fecha,$cod_persona,$estado,$tipo,$tipouser,$operacion);

}

if($operacion=="buscar")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$sector=$_POST['sector'];
$sector = utf8_decode($sector);

$tipoPagoSalario=$_POST['tipoPagoSalario'];
$tipoPagoSalario = utf8_decode($tipoPagoSalario);
$local=$_POST['local'];
$local = utf8_decode($local);

if($tipoPagoSalario=="Simple"){
	buscar($fecha1,$fecha2,$estado,$buscar,$tipo,$sector,$local);
}else{
	buscarSueldoDetallado($fecha1,$fecha2,$estado,$buscar,$tipo,$sector,$local);
}


}	

}



function buscarSueldoDetallado($fecha1,$fecha2,$estado,$buscar,$tipo,$sector,$local)
{
	$mysqli=conectar_al_servidor();
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$grupos=array();
	
	$sector2=$sector;
	$tipo2=$tipo;
	
	 $pagina='';
	 $condiciontipo="";
	 if($tipo!=""){
		$condiciontipo="and tipo='$tipo'"; 
	 }
	 
	 $condicionfecha="";
	 if($fecha1!="" && $fecha2!=""){
		$condicionfecha =" and fecha between '$fecha1' and  '$fecha2'"; 
	 }
	 
	 $condicionsector="";
	 if($sector!=""){
		$condicionsector =" and (Select cod_cargosFK from funcionarios where codpersona=idfuncionarios)  = '$sector'"; 
	 }
	 
	 $condicionlocal="";
	 if($local!=""){
		$condicionlocal =" and (Select cod_localFK from funcionarios where codpersona=idfuncionarios)  = '$local'"; 
	 }
	 
	
		 $sql= "Select idsueldo,ifnull(comision,0) as comision,ifnull(totalrecaudado,0) as totalrecaudado,sueldo,fecha,codpersona,estado,tipo,
		 tipouser,estado_registro,
		if(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) as usuarionombre,desde,
		if(desde='',(Select sector from vendedor where codpersona=idvendedor),((Select (select nombre from cargos where idcargos=cod_cargosFK) from funcionarios where codpersona=idfuncionarios))) as sector
		from sueldo where if(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) like '%".$buscar."%' 
		and estado='$estado'  ".$condiciontipo.$condicionfecha.$condicionsector.$condicionlocal." group by codpersona asc order by fecha desc";
 
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
 $totalSalario=0;
 $totalCobrar=0;
 $totalAdelanto=0;
 $totalExtra=0;
 $totalIPS=0;
 $total=0;
 $styleName="tableRegistroSearch";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $idsueldo=$valor['idsueldo'];
		      $comision=$valor['comision'];
		  	  $totalrecaudado=utf8_encode($valor['totalrecaudado']);
		  	  $sueldo=utf8_encode($valor['sueldo']);
		  	  $cod_persona=utf8_encode($valor['codpersona']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $tipouser=utf8_encode($valor['tipouser']);
		  	  $sector=utf8_encode($valor['sector']);
		  	  $desde=utf8_encode($valor['desde']);
		  	  $estado_registro=utf8_encode($valor['estado_registro']);
			   
		  	 $onclick="";
			 // if($desde!=""){
				 // $onclick=" onclick='obtenerdatosabmSueldo(this)' ";
			 // }
			    	 
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' style='background-color: #2e5a8b;color:#fff' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' $onclick>
<td id='td_id' style='display:none'>".$idsueldo."</td>
<td    style='width:5%'></td>
<td    style='width:35%;font-size: 15px;'>".$usuarionombre." - ".$sector."</td>
<td    style='display:none'>". number_format($totalrecaudado,'0',',','.')."</td>
<td    style='display:none'>". number_format($comision,'0',',','.')."</td>
<td    style='width:20%'>TIPO</td>
<td    style='width:20%'>MONTO</td>
<td    style='width:20%'>FECHA</td>
<td    style='display:none'>".$tipo."</td>
<td    style='display:none'>".$estado."</td>
<td    style='display:none'>".$cod_persona."</td>
<td    style='display:none'>".$tipouser."</td>
<td    style='display:none'>".$estado_registro."</td>
<td    style='display:none'>".$desde."</td>
</tr>
</table>";

 $pagina2=buscardetallado($fecha1,$fecha2,$estado,$cod_persona,$tipo2,$sector2); 
		$grupos[]=array(
			"codigo"=>$idsueldo,
			"funcionario"=>$usuarionombre,
			"sector"=>$sector,
			"total_recaudado"=>$totalrecaudado,
			"total_recaudado_formateado"=>number_format($totalrecaudado,'0',',','.'),
			"comision"=>$comision,
			"comision_formateada"=>number_format($comision,'0',',','.'),
			"tipo"=>$tipo,
			"estado"=>$estado,
			"codigo_persona"=>$cod_persona,
			"tipo_usuario"=>$tipouser,
			"estado_registro"=>$estado_registro,
			"desde"=>$desde,
			"detalles"=>$pagina2[6],
			"total_cobrar"=>$pagina2[1],
			"total_adelanto"=>$pagina2[2],
			"total_extra"=>$pagina2[3],
			"total_salario"=>$pagina2[4],
			"total_ips"=>$pagina2[5]
		);
 
 $pagina3=" 
<table style='width:100%'>
<tr>
<td style='width:60%;text-align:left'></td>

<td style='width:10%;'>
<p class='pTituloC' >Total Adelanto :</p>
<input class='inputTextDisable' type='text' disabled value='".number_format($pagina2[2],'0',',','.')."'  style='width:150px;text-align:center' />
</td>

<td style='width:10%;'>
<p class='pTituloC' >Total Extra :</p>
<input class='inputTextDisable' type='text' disabled value='".number_format($pagina2[3],'0',',','.')."'  style='width:150px;text-align:center' />
</td>

<td style='width:10%;'>
<p class='pTituloC' >Total I.P.S :</p>
<input class='inputTextDisable' type='text' disabled value='".number_format($pagina2[5],'0',',','.')."'  style='width:150px;text-align:center' />
</td>
 
<td style='width:10%;' >
<p class='pTituloC' >Total a Cobrar :</p>
<input class='inputTextDisable' type='text' disabled value='".number_format($pagina2[1],'0',',','.')."' style='width:200px' />
</td>

<td style='width:10%;'>
<p class='pTituloC' >Total Salario :</p>
<input class='inputTextDisable' type='text' disabled value='".number_format($pagina2[4],'0',',','.')."'  style='width:150px;text-align:center' />
</td>

</tr>
</table> ";
 
 
		$pagina.=$pagina2[0].$pagina3;  
		$totalSalario = $totalSalario + $pagina2[4];
		$totalCobrar = $totalCobrar + $pagina2[1];
		$totalAdelanto = $totalAdelanto + $pagina2[2];
		$totalExtra = $totalExtra + $pagina2[3];
		
		$totalIPS = $totalIPS + $pagina2[5];
		
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato==='json' ? $grupos : $pagina),"3" => $nroRegistro,"4" =>  number_format($totalSalario,'0',',','.'),"5" =>  number_format($totalCobrar,'0',',','.') ,"6" =>  number_format($totalAdelanto,'0',',','.'),"7" =>  number_format($totalExtra,'0',',','.'),"8" =>  number_format($totalIPS,'0',',','.'));
echo json_encode($informacion);	
exit;


}




function buscardetallado($fecha1,$fecha2,$estado,$cod_persona,$tipo,$sector)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $condiciontipo="";
	 if($tipo!=""){
		$condiciontipo="and tipo='$tipo'"; 
	 }
	 
	 $condicionfecha="";
	 if($fecha1!="" && $fecha2!=""){
		$condicionfecha =" and fecha between '$fecha1' and  '$fecha2'"; 
	 }
	 
	 $condicionsector="";
	 if($sector!=""){
		$condicionsector =" and (Select cod_cargosFK from funcionarios where codpersona=idfuncionarios)  = '$sector'"; 
	 }
	
		 $sql= "Select idsueldo,ifnull(comision,0) as comision,ifnull(totalrecaudado,0) as totalrecaudado,sueldo,fecha,codpersona,estado,tipo,
		 tipouser,estado_registro,
		if(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) as usuarionombre,desde,
		if(desde='',(Select sector from vendedor where codpersona=idvendedor),((Select (select nombre from cargos where idcargos=cod_cargosFK) from funcionarios where codpersona=idfuncionarios))) as sector
		from sueldo where   codpersona =".$cod_persona."
		and estado='$estado'  ".$condiciontipo.$condicionfecha.$condicionsector." order by fecha desc";
 
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
 $styleName="tableRegistroSearch";
 $datos[]=null;
 $totalaCobrar=0;
 $totalAdelanto=0;
 $totalExtra=0;
 $totalSalario=0;
 $totalIPS=0;
 $total=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idsueldo=$valor['idsueldo'];
		      $comision=$valor['comision'];
		  	  $totalrecaudado=utf8_encode($valor['totalrecaudado']);
		  	  $sueldo=utf8_encode($valor['sueldo']);
		  	  $cod_persona=utf8_encode($valor['codpersona']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $tipouser=utf8_encode($valor['tipouser']);
		  	  $sector=utf8_encode($valor['sector']);
		  	  $desde=utf8_encode($valor['desde']);
		  	  $estado_registro=utf8_encode($valor['estado_registro']);
			  
		  	 // $totalaCobrar=$totalaCobrar+$sueldo;
		  	 $onclick="";
			 if($desde!=""){
				 $onclick=" onclick='obtenerdatosabmSueldo(this)' ";
			 }
			 
			  if($tipo=="ADELANTO" || $tipo=="UNIFORME" || $tipo=="MULTA"|| $tipo=="VENTA ANULADO" || $tipo=="I.P.S."){
				  $totalAdelanto=$totalAdelanto + $sueldo;
				  $totalSalario=$totalSalario + $sueldo;
			  }
			  
			  if($tipo=="EXTRA" || $tipo=="PLUS MOTIVACIONAL"|| $tipo=="PAGO GARANTIAS" ){
				  $totalExtra=$totalExtra + $sueldo; 
			  }
			  
			  if($tipo=="COMISION COBRANZA TOP DE GAMAS" || $tipo=="COMISION VENTA TOP DE GAMAS"){
				  $totalExtra=$totalExtra + $sueldo;				  
			  }
			  
			  if($tipo=="I.P.S." ){
				  $totalIPS=$totalIPS + $sueldo;				  
			  }
			 
			 
			  if($tipo=="SUELDO"){
				  $totalaCobrar=$totalaCobrar + $sueldo;
				  $totalSalario=$totalSalario + $sueldo;
			  }
			  $filas[]=array(
				  "codigo"=>$idsueldo,
				  "funcionario"=>$usuarionombre,
				  "total_recaudado"=>$totalrecaudado,
				  "total_recaudado_formateado"=>number_format($totalrecaudado,'0',',','.'),
				  "comision"=>$comision,
				  "comision_formateada"=>number_format($comision,'0',',','.'),
				  "monto"=>$sueldo,
				  "monto_formateado"=>number_format($sueldo,'0',',','.'),
				  "fecha"=>$fecha,
				  "sector"=>$sector,
				  "tipo"=>$tipo,
				  "estado"=>$estado,
				  "codigo_persona"=>$cod_persona,
				  "tipo_usuario"=>$tipouser,
				  "estado_registro"=>$estado_registro,
				  "desde"=>$desde,
				  "seleccionable"=>($desde!=="")
			  );
			 
			    	 
		  	  $styleName=CargarStyleTable($styleName);
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' $onclick>
<td id='td_id' style='display:none'>".$idsueldo."</td>
<td  style='width:40%'></td>
<td  id='td_datos_1' style='display:none;'>".$usuarionombre."</td>
<td  id='td_datos_2' style='display:none'>". number_format($totalrecaudado,'0',',','.')."</td>
<td  id='td_datos_3' style='display:none'>". number_format($comision,'0',',','.')."</td>
<td  id='td_datos_12' style='width:20%'>".$tipo."</td>
<td  id='td_datos_4' style='width:20%'>". number_format($sueldo,'0',',','.')."</td>
<td  id='td_datos_5' style='width:20%'>".$fecha."</td>
<td  id='' style='display:none'>".$sector."</td>
<td  id='td_datos_6' style='display:none'>".$tipo."</td>
<td  id='td_datos_7' style='display:none'>".$estado."</td>
<td  id='td_datos_8' style='display:none'>".$cod_persona."</td>
<td  id='td_datos_9' style='display:none'>".$tipouser."</td>
<td  id='td_datos_10' style='display:none'>".$estado_registro."</td>
<td  id='td_datos_11' style='display:none'>".$desde."</td>
</tr>
</table>";			  
	  }
 }
 $datos[0]= $pagina;
 $datos[1]= $totalaCobrar;
 $datos[2]= $totalAdelanto;
 $datos[3]= $totalExtra;
 $datos[4]= $totalSalario;
 $datos[5]= $totalIPS;
 $datos[6]= $filas;
 return $datos;


}








function abm($estadoRegistro,$idsueldo,$comision,$totalrecaudado,$sueldo,$fecha,$cod_persona,$estado,$tipo,$tipouser,$operacion)
{
	
	
if( $sueldo=="" || $fecha==""  || $cod_persona==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}



$mysqli=conectar_al_servidor(); 

if($operacion=="nuevo") 
{

$consulta1="Insert into sueldo (comision,totalrecaudado,sueldo,fecha,codpersona,estado,tipo,desde,estado_registro)
values('0','0','$sueldo','$fecha','$cod_persona','$estado','$tipo','funcionario','$estadoRegistro')";
$stmt1 = $mysqli->prepare($consulta1);



}


if($operacion=="editar")
{

$consulta1="Update sueldo set sueldo=?,fecha=?,codpersona=?,estado=?,tipo=?, desde='funcionario', estado_registro='$estadoRegistro'  where idsueldo=?";	

$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$sueldo,$fecha,$cod_persona,$estado,$tipo,$idsueldo); 

}



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}



function buscar($fecha1,$fecha2,$estado,$buscar,$tipo,$sector,$local)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	 $condiciontipo="";
	 if($tipo!=""){
		$condiciontipo="and tipo='$tipo'"; 
	 }
	 
	 $condicionfecha="";
	 if($fecha1!="" && $fecha2!=""){
		$condicionfecha =" and fecha between '$fecha1' and  '$fecha2'"; 
	 }
	 
	 $condicionsector="";
	 if($sector!=""){
		$condicionsector =" and (Select cod_cargosFK from funcionarios where codpersona=idfuncionarios)  = '$sector'"; 
	 }
	
	$condicionlocal="";
	 if($local!=""){
		$condicionlocal =" and (Select cod_localFK from funcionarios where codpersona=idfuncionarios)  = '$local'"; 
	 }
	 
	 
		 $sql= "Select idsueldo,ifnull(comision,0) as comision,ifnull(totalrecaudado,0) as totalrecaudado,sueldo,fecha,codpersona,estado,tipo,
		 tipouser,estado_registro,
		if(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) as usuarionombre,desde,
		if(desde='',(Select sector from vendedor where codpersona=idvendedor),((Select (select nombre from cargos where idcargos=cod_cargosFK) from funcionarios where codpersona=idfuncionarios))) as sector
		from sueldo where if(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) like '%".$buscar."%' 
		and estado='$estado'  ".$condiciontipo.$condicionfecha.$condicionsector.$condicionlocal." order by fecha desc";
 
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
 $total=0;
 $styleName="tableRegistroSearch";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idsueldo=$valor['idsueldo'];
		      $comision=$valor['comision'];
		  	  $totalrecaudado=utf8_encode($valor['totalrecaudado']);
		  	  $sueldo=utf8_encode($valor['sueldo']);
		  	  $cod_persona=utf8_encode($valor['codpersona']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $tipouser=utf8_encode($valor['tipouser']);
		  	  $sector=utf8_encode($valor['sector']);
		  	  $desde=utf8_encode($valor['desde']);
		  	  $estado_registro=utf8_encode($valor['estado_registro']);
			  
		  	 $total=$total+$sueldo;
			 $filas[]=array(
				 "codigo" => $idsueldo,
				 "funcionario" => $usuarionombre,
				 "total_recaudado" => $totalrecaudado,
				 "total_recaudado_formateado" => number_format($totalrecaudado,'0',',','.'),
				 "comision" => $comision,
				 "comision_formateada" => number_format($comision,'0',',','.'),
				 "monto" => $sueldo,
				 "monto_formateado" => number_format($sueldo,'0',',','.'),
				 "fecha" => $fecha,
				 "sector" => $sector,
				 "tipo" => $tipo,
				 "estado" => $estado,
				 "codigo_persona" => $cod_persona,
				 "tipo_usuario" => $tipouser,
				 "estado_registro" => $estado_registro,
				 "desde" => $desde,
				 "seleccionable" => ($desde !== "")
			 );
		  	 $onclick="";
			 if($desde!=""){
				 $onclick=" onclick='obtenerdatosabmSueldo(this)' ";
			 }
			    	 
		  	  $styleName=CargarStyleTable($styleName);
			  if($formato !== "json") {
			  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' $onclick>
<td id='td_id' style='display:none'>".$idsueldo."</td>
<td  id='td_datos_1' style='width:20%'>".$usuarionombre."</td>
<td  id='td_datos_2' style='display:none'>". number_format($totalrecaudado,'0',',','.')."</td>
<td  id='td_datos_3' style='display:none'>". number_format($comision,'0',',','.')."</td>
<td  id='td_datos_4' style='width:20%'>". number_format($sueldo,'0',',','.')."</td>
<td  id='td_datos_5' style='width:20%'>".$fecha."</td>
<td  id='' style='width:20%'>".$sector."</td>
<td  id='td_datos_12' style='width:20%'>".$tipo."</td>
<td  id='td_datos_6' style='display:none'>".$tipo."</td>
<td  id='td_datos_7' style='display:none'>".$estado."</td>
<td  id='td_datos_8' style='display:none'>".$cod_persona."</td>
<td  id='td_datos_9' style='display:none'>".$tipouser."</td>
<td  id='td_datos_10' style='display:none'>".$estado_registro."</td>
<td  id='td_datos_11' style='display:none'>".$desde."</td>
</tr>
</table>";
			  }
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3" => $nroRegistro,"4" =>  number_format($total,'0',',','.'));
echo json_encode($informacion);	
exit;


}


function buscarevaluacion($fecha1,$fecha2)
{
	
$totalgastos=buscaregastos($fecha1,$fecha2);
//$totalcompras=buscarcompras($fecha1,$fecha2);
$totalpagos=buscarpagos($fecha1,$fecha2);
$ganancia=$totalpagos-$totalgastos;
$styleName="tableRegistroSearch";


  $styleName=CargarStyleTable($styleName);
  $pagina="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<td  id='' style='width:10%'>". number_format($totalgastos,'0',',','.')."</td>
<td  id='' style='width:10%'>". number_format($totalpagos,'0',',','.')."</td>
<td  id='' style='width:10%'>". number_format($ganancia,'0',',','.')."</td>
</tr>
</table>";
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}

function buscaregastos($fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select sum(monto) as total from gastos where fecha>='$fecha1' and fecha<='$fecha2' and estado='Activo' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 $total=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $total=$valor['total'];
		  	
		  
	  }
 }
 
 
return $total;


}

function buscarcompras($fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select sum(total_compra) as total from compra where fecha_compra>='$fecha1' and fecha_compra<='$fecha2' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 $total=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $total=$valor['total'];
		  	
		  
	  }
 }
 
 
return $total;


}

function buscarpagos($fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select sum(Monto) as total from pago where Fecha>='$fecha1' and Fecha<='$fecha2' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 $total=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $total=$valor['total'];
		  	
		  
	  }
 }
 
 
return $total;


}



verificar($operacion);
?>
