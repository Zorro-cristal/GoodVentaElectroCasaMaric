<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");

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
	
	
	$idDocumentos=$_POST['idabm'];
    $idDocumentos = utf8_decode($idDocumentos);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$Estado=$_POST['estado'];
    $Estado = utf8_decode($Estado);

    
    
	abm($idDocumentos,$descripcion,$Estado,$funt);

}

if($funt=="nuevodocumentocliente" || $funt=="editardocumentocliente")
{
	
	
	$idDocumentos=$_POST['idabm'];
    $idDocumentos = utf8_decode($idDocumentos);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$Estado=$_POST['estado'];
    $Estado = utf8_decode($Estado);

    
    
	abmdocumentocliente($idDocumentos,$descripcion,$Estado,$funt);

}

if($funt=="EliminarDocumentoEntregado")
{
	
	
	$idDocumentos=$_POST['iddocumento'];
    $idDocumentos = utf8_decode($idDocumentos);
	$cod_venta=$_POST['cod_venta'];
    $cod_venta = utf8_decode($cod_venta);

	EliminarDocumentoEntregado($idDocumentos,$cod_venta);

}

if($funt=="EliminarDocumentoEntregadoCliente")
{
	
	
	$idDocumentos=$_POST['iddocumento'];
    $idDocumentos = utf8_decode($idDocumentos);
	$cod_venta=$_POST['cod_venta'];
    $cod_venta = utf8_decode($cod_venta);

	EliminarDocumentoEntregadoCliente($idDocumentos,$cod_venta);

}

if($funt=="checkearDocumentoEntregado")
{
	
	
	$idDocumentos=$_POST['iddocumento'];
    $idDocumentos = utf8_decode($idDocumentos);
	$cod_venta=$_POST['cod_venta'];
    $cod_venta = utf8_decode($cod_venta);
	$cod_cobrador=$_POST['useru'];
    $cod_cobrador = utf8_decode($cod_cobrador);

	checkearDocumentoEntregado($idDocumentos,$cod_venta,$cod_cobrador);

}

if($funt=="checkearDocumentoEntregadoCliente")
{
	
	
	$idDocumentos=$_POST['iddocumento'];
    $idDocumentos = utf8_decode($idDocumentos);
	$cod_venta=$_POST['cod_venta'];
    $cod_venta = utf8_decode($cod_venta);
	$cod_cobrador=$_POST['useru'];
    $cod_cobrador = utf8_decode($cod_cobrador);

	checkearDocumentoEntregadoCliente($idDocumentos,$cod_venta,$cod_cobrador);

}

if($funt=="buscar")
{
	$buscar=$_POST['descripcion'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
	buscar($buscar,$Estado);

}

if($funt=="buscar_documento_cliente")
{
	$buscar=$_POST['descripcion'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
	buscar_documento_cliente($buscar,$Estado);

}

if($funt=="buscar_documento_revisados")
{

$codVenta=$_POST['codVenta'];
$codVenta = utf8_decode($codVenta);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscar_documento_revisados($codVenta,$formato);

}

if($funt=="buscar_documento_revisados_cliente")
{

$codVenta=$_POST['codVenta'];
$codVenta = utf8_decode($codVenta);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscar_documento_revisados_cliente($codVenta,$formato);

}

if($funt=="informedocumentosentregados")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$documento=$_POST["documento"];
 	$documento=utf8_decode($documento);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$vendedor=$_POST["vendedor"];
 	$vendedor=utf8_decode($vendedor);
	$vendedor2=$_POST["vendedor2"];
 	$vendedor2=utf8_decode($vendedor2);
	
	$estado_entregado=$_POST["estado_entregado"];
 	$estado_entregado=utf8_decode($estado_entregado);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	informedocumentosentregados($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$vendedor2,$estado_entregado,$formato);
}

if($funt=="informedocumentosentregadoscliente")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);


$documento=$_POST["documento"];
 	$documento=utf8_decode($documento);
	$cliente=$_POST["cliente"];
 	$cliente=utf8_decode($cliente);
	$zona=$_POST["zona"];
 	$zona=utf8_decode($zona);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$vendedor=$_POST["vendedor"];
 	$vendedor=utf8_decode($vendedor);
	$vendedor2=$_POST["vendedor2"];
 	$vendedor2=utf8_decode($vendedor2);
	
	$estado_entregado=$_POST["estado_entregado"];
 	$estado_entregado=utf8_decode($estado_entregado);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

	informedocumentosentregadoscliente($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$vendedor2,$estado_entregado,$formato);
}

if($funt=="documentosentregadosdetalle")
{
	$cod_ventaFK=$_POST['cod_ventaFK'];
$cod_ventaFK = utf8_decode($cod_ventaFK);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	documentosentregadosdetalle($cod_ventaFK,$formato);

}	


}

function abm($idDocumentos,$descripcion,$Estado,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from documentos where descripcion=? and Estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $descripcion); 


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

if($valor==1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}
	if($funt=="nuevo")
	{
	
    
    $consulta="insert into documentos (descripcion,Estado) values (upper(?),?)";
     $stmt = $mysqli->prepare($consulta);
    $ss='ss';
    $stmt->bind_param($ss,$descripcion,$Estado); 
        
 
	}
	if($funt=="editar")
	{
    $consulta="Update documentos set descripcion=upper(?),Estado=? where iddocumentos=?";	

	$stmt = $mysqli->prepare($consulta);
        


    $ss='sss';
        
    $stmt->bind_param($ss,$descripcion,$Estado,$idDocumentos); 
        
	
       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
	
	
	
}

function abmdocumentocliente($idDocumentos,$descripcion,$Estado,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from documentos_cliente where descripcion=? and Estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $descripcion); 


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

if($valor==1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}
	if($funt=="nuevodocumentocliente")
	{
	
    
    $consulta="insert into documentos_cliente (descripcion,Estado) values (upper(?),?)";
     $stmt = $mysqli->prepare($consulta);
    $ss='ss';
    $stmt->bind_param($ss,$descripcion,$Estado); 
        
 
	}
	if($funt=="editardocumentocliente")
	{
    $consulta="Update documentos_cliente set descripcion=upper(?),Estado=? where iddocumentos_cliente=?";	

	$stmt = $mysqli->prepare($consulta);
        


    $ss='sss';
        
    $stmt->bind_param($ss,$descripcion,$Estado,$idDocumentos); 
        
	
       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
	
	
	
}




function buscar($buscar,$Estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		$sql= "Select *
        from documentos where descripcion like ?  and Estado=? order by descripcion asc ";
		
 
   
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
//$buscar="".$buscar."";
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
		  
		  
		  
		      $iddocumentos=$valor['iddocumentos'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['estado']);
			  $filas[]=array(
				  "codigo" => $iddocumentos,
				  "descripcion" => $descripcion,
				  "estado" => $Estado
			  );
		  	 
			  
		  	 
			  $styleName=CargarStyleTable($styleName);
			 if($formato !== "json") {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmDocumentos(this)'>
			  <td id='td_id' style='display:none;'>".$iddocumentos."</td>
			  <td id='td_datos_1'style='width:100%' class='tdRegistroSearch' >".$descripcion."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}
function buscar_documento_cliente($buscar,$Estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		$sql= "Select *
        from documentos_cliente where descripcion like ?  and Estado=? order by descripcion asc ";
		
 
   
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
//$buscar="".$buscar."";
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
		  
		  
		  
		      $iddocumentos=$valor['iddocumentos_cliente'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['estado']);
			  $filas[]=array(
				  "codigo" => $iddocumentos,
				  "descripcion" => $descripcion,
				  "estado" => $Estado
			  );
		  	 
			  
		  	 
			  $styleName=CargarStyleTable($styleName);
			 if($formato !== "json") {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmDocumentosCliente(this)'>
			  <td id='td_id' style='display:none;'>".$iddocumentos."</td>
			  <td id='td_datos_1'style='width:100%' class='tdRegistroSearch' >".$descripcion."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}


function buscar_documento_revisados($codVenta,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "Select *
        from documentos where Estado='Activo' order by descripcion asc ";
		
   
   $stmt = $mysqli->prepare($sql);

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
		  
		  
		  
		      $iddocumentos=$valor['iddocumentos'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['estado']);
		  	 
			  $control = verificar_existencia($iddocumentos,$codVenta);
			  $filas[]=array(
				  'codigo'=>$iddocumentos,
				  'descripcion'=>$descripcion,
				  'estado'=>$Estado,
				  'entregado'=>$control ? 1 : 0
			  );
			  
			  $check = "<input type='checkbox' onclick='AbmRevisionDocumentos(this)' id='".$iddocumentos."'>";
			  
			  if($control){
				$check = "<input type='checkbox' onclick='EliminarRevisionDocumentos(this)' id='".$iddocumentos."' checked>";
			  }
			  
			  
			  
			  if($formato !== 'json') {
			  $pagina.="
			  <table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
			  <tr id='tbSelecRegistro'>
			  <td id='td_datos_1'style='width:50%' >".$descripcion."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			   <td style='width:50%'>".$check."</td>
			  </tr>
			  </table>";
			  }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}
function buscar_documento_revisados_cliente($codVenta,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "Select *
        from documentos_cliente where Estado='Activo' order by descripcion asc ";
		
   
   $stmt = $mysqli->prepare($sql);

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
		  
		  
		  
		      $iddocumentos=$valor['iddocumentos_cliente'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['estado']);
		  	 
			  $control = verificar_existencia_documento_cliente($iddocumentos,$codVenta);
			  $filas[]=array(
				  'codigo'=>$iddocumentos,
				  'descripcion'=>$descripcion,
				  'estado'=>$Estado,
				  'entregado'=>$control ? 1 : 0
			  );
			  
			  $check = "<input type='checkbox' onclick='AbmRevisionDocumentosCliente(this)' id='".$iddocumentos."'>";
			  
			  if($control){
				$check = "<input type='checkbox' onclick='EliminarRevisionDocumentosCliente(this)' id='".$iddocumentos."' checked>";
			  }
			  
			  
			  
			  if($formato !== 'json') {
			  $pagina.="
			  <table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
			  <tr id='tbSelecRegistro'>
			  <td id='td_datos_1'style='width:50%' >".$descripcion."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			   <td style='width:50%'>".$check."</td>
			  </tr>
			  </table>";
			  }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}

function verificar_existencia($iddocumentoFK,$cod_ventaFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select count(iddetalles_entrega) as cantidad
        from detalles_entrega where iddocumentosFK = '$iddocumentoFK' and cod_ventaFK = '$cod_ventaFK' ";
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 

 $cantidad = "";
 if ($valor>0)
 {
	 while ($valor= mysqli_fetch_assoc($result))
	  {
	  $cantidad=$valor['cantidad'];
	  }
}

 mysqli_close($mysqli);
 

 return $cantidad;
}

function verificar_existencia_documento_cliente($iddocumentoFK,$cod_ventaFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select count(iddetalles_entrega_cliente) as cantidad
        from detalles_entrega_cliente where iddocumentos_clienteFK = '$iddocumentoFK' and cod_ventaFK = '$cod_ventaFK' ";
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 

 $cantidad = "";
 if ($valor>0)
 {
	 while ($valor= mysqli_fetch_assoc($result))
	  {
	  $cantidad=$valor['cantidad'];
	  }
}

 mysqli_close($mysqli);
 

 return $cantidad;
}


function informedocumentosentregados($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$vendedor2,$estado_entregado,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 $condicionVendedor="";
	 if($vendedor!=""){
	   $condicionVendedor=" and  sc.entrega_cobradorFK ='".$vendedor."'";		
	 }
	 
$condicionVendedor2="";
	 if($vendedor2!=""){
	   $condicionVendedor2="and  sc.cod_cobradorFK ='".$vendedor2."'";		
	 }
	 
	 $condicionFecha = "";
	 if($fecha1 != "" || $fecha2 != ""){
		 $condicionFecha = " and dt.fecha between '$fecha1' and '$fecha2'";
	 }
	 
	 $condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente= '".$documento."' ";
}
$condicioncliente="";
if($cliente!=""){
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK ) like '%".$cliente."%' ";
}
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}
$condicionlocal="";
if($local!=""){
$condicionlocal="and sc.cod_localFK= '".$local."' ";
}

$condicionestado_entregado="";
if($estado_entregado!=""){
$condicionestado_entregado="and sc.estado_entrega= '".$estado_entregado."' ";
}
	 
	 
		$sql= "SELECT 
		(Select nombre from zona where idzonaFk=idzona )as zona,estado_entrega,sc.estado,
		(Select Nombre from local where cod_local=cod_localFK ) as local,sc.cod_localFK,
		(Select nombre_persona from persona pra where pra.cod_persona =sc.cod_cobradorFK )as UsuarioIngresa,
		(Select nombre_persona from persona pra where pra.cod_persona =sc.entrega_cobradorFK )as entregador,
		(Select nombre_persona from persona pra where pra.cod_persona = sc.cod_usuarioFK )as Usuarioaprueba,
		cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
		cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
		(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK )as cliente,
		(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
		(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante,
		dt.iddetalles_entrega,dt.cod_ventaFK,dt.iddocumentosFK,dt.cod_cobradorFK,dt.fecha,
		(SELECT nombre_persona from persona WHERE cod_persona = dt.cod_cobradorFK) as cobrador
		FROM detalles_entrega dt inner join venta vt ON dt.cod_ventaFK = vt.cod_venta
        inner join solicitudcredito sc ON vt.codSolicitudCreditoFK = sc.idSolicitudCredito
		inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
		inner join   persona pr on cl.cod_cliente=pr.cod_persona 
		WHERE iddetalles_entrega != '0' and (SELECT count(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 ".$condicionFecha.$condiciondocumento.$condicioncliente.$condicionzona.$condicionlocal.$condicionVendedor.$condicionestado_entregado.$condicionVendedor2." group by cod_ventaFK ";


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
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $iddetalles_entrega=$valor['iddetalles_entrega'];
		  	  $cod_ventaFK=utf8_encode($valor['cod_ventaFK']);
		  	  $iddocumentosFK=utf8_encode($valor['iddocumentosFK']);
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
		  	  $cobrador=utf8_encode($valor['cobrador']);
		  	  $fecha=utf8_encode($valor['fecha']);
			  $ci_cliente = utf8_encode($valor['ci_cliente']);
			  $nombre_persona = utf8_encode($valor['cliente']); 
		  	 $zona = utf8_encode($valor['zona']); 
			 $local = utf8_encode($valor['local']); 
			 $estado_entrega = utf8_encode($valor['estado_entrega']); 
			 $estado = utf8_encode($valor['estado']); 
			 $entregador = utf8_encode($valor['entregador']); 
			 $UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
			 
			 
			  $detalle = buscardetallesventa($cod_ventaFK, $formato === 'json');
			  
			  $detalleCliente = buscardetallesventacliente($cod_ventaFK);
			  $nombre_producto = $detalleCliente[0];
			  $documento = $detalleCliente[1];
			  
			  $cantidad_chekeado = obtenercantidaddocumentoschekqueados($cod_ventaFK);
			  $cantidad_existentes = obtenercantidaddocumentosexistentes();
			  $filas[]=array(
				  'id_detalle'=>$iddetalles_entrega,
				  'cod_venta'=>$cod_ventaFK,
				  'id_documento'=>$iddocumentosFK,
				  'documento'=>$ci_cliente,
				  'cliente'=>$nombre_persona,
				  'zona'=>$zona,
				  'local'=>$local,
				  'estado_entrega'=>$estado_entrega,
				  'estado'=>$estado,
				  'entregador'=>$entregador,
				  'productos'=>$detalle,
				  'fecha'=>$fecha,
				  'documentos_entregados'=>(int)$cantidad_chekeado,
				  'documentos_totales'=>(int)$cantidad_existentes,
				  'documentos_resumen'=>$cantidad_chekeado.'/'.$cantidad_existentes,
				  'vendedor'=>$UsuarioIngresa
			  );
			  
			  $styleName=CargarStyleTable($styleName);
			  if($formato !== 'json') {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosdocumentosentregados(this)'>
			  <td id='' style='display:none;'>".$iddetalles_entrega."</td>
			  <td id='td_id' style='display:none' >".$cod_ventaFK."</td>
			  <td  id='' style='width:5%'>".$ci_cliente."</td>
			  <td  id='' style='width:10%'>".$nombre_persona."</td>
			  <td  id='' style='width:5%'>".$zona."</td>
			  <td  id='' style='width:5%'>".$local."</td>
			  <td  id='' style='width:5%'>".$estado_entrega."</td>
			  <td  id='' style='width:5%'>".$estado."</td>
			  <td  id='' style='width:5%'>".$entregador."</td>
			  <td id='' style='width:10%' >".$detalle."</td>
			  <td id='' style='width:5%' >".$fecha."</td>
			  <td id='' style='width:5%' >".$cantidad_chekeado."/".$cantidad_existentes."</td>
			  <td  id='' style='width:5%'>".$UsuarioIngresa."</td>
			  </tr>
			  </table>";
			  }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}

function informedocumentosentregadoscliente($fecha1,$fecha2,$documento,$cliente,$zona,$estado,$local,$vendedor,$vendedor2,$estado_entregado,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 $condicionVendedor="";
	 if($vendedor!=""){
	   $condicionVendedor=" and  sc.entrega_cobradorFK ='".$vendedor."'";		
	 }
	 
$condicionVendedor2="";
	 if($vendedor2!=""){
	   $condicionVendedor2="and  sc.cod_cobradorFK ='".$vendedor2."'";		
	 }
	 
	 $condicionFecha = "";
	 if($fecha1 != "" || $fecha2 != ""){
		 $condicionFecha = " and dtc.fecha between '$fecha1' and '$fecha2'";
	 }
	 
	 $condiciondocumento="";
if($documento!=""){
$condiciondocumento="and cl.ci_cliente= '".$documento."' ";
}
$condicioncliente="";
if($cliente!=""){
$condicioncliente="and (Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK ) like '%".$cliente."%' ";
}
$condicionzona="";
if($zona!=""){
$condicionzona="and cl.idzonaFk= '".$zona."' ";
}
$condicionlocal="";
if($local!=""){
$condicionlocal="and sc.cod_localFK= '".$local."' ";
}

$condicionestado_entregado="";
if($estado_entregado!=""){
$condicionestado_entregado="and sc.estado_entrega= '".$estado_entregado."' ";
}
	 
		$sql= "SELECT 
		(Select nombre from zona where idzonaFk=idzona )as zona,estado_entrega,sc.estado,
		(Select Nombre from local where cod_local=cod_localFK ) as local,sc.cod_localFK,
		(Select nombre_persona from persona pra where pra.cod_persona =sc.cod_cobradorFK )as UsuarioIngresa,
		(Select nombre_persona from persona pra where pra.cod_persona =sc.entrega_cobradorFK )as entregador,
		(Select nombre_persona from persona pra where pra.cod_persona = sc.cod_usuarioFK )as Usuarioaprueba,
		cl.whapp,pr.direccion,pr.telefono,pr.email,cl.ci_cliente,cl.rut_cliente,cl.Calificacion,cl.obsTrabajo,
		cl.idzonaFk,cl.lugardetrabajo,cl.salario,cl.antiguedad,cl.teleftrab1,cl.teleftrab2,cl.direcciontrab,cl.fechanac,
		(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=sc.cod_clienteFK )as cliente,
		(Select concat(nombre_persona,' ',apellido_persona) from persona pra where pra.cod_persona=cod_codeudorFK )as garante,
		(Select ci_cliente from cliente pra where pra.cod_cliente=cod_codeudorFK )as docgarante,
		
		dtc.iddetalles_entrega_cliente,dtc.cod_ventaFK,dtc.iddocumentos_clienteFK,dtc.cod_cobradorFK,dtc.fecha,
		(SELECT nombre_persona from persona WHERE cod_persona = dtc.cod_cobradorFK) as cobrador
		FROM detalles_entrega_cliente dtc inner join venta vt ON dtc.cod_ventaFK = vt.cod_venta 
		inner join solicitudcredito sc ON vt.codSolicitudCreditoFK = sc.idSolicitudCredito
		inner join  cliente cl on cl.cod_cliente=sc.cod_clienteFK 
		inner join   persona pr on cl.cod_cliente=pr.cod_persona 
		WHERE iddetalles_entrega_cliente != '0' and (SELECT count(*) FROM cancelaciones c WHERE c.cod_venta = vt.cod_venta) = 0 ".$condicionFecha.$condiciondocumento.$condicioncliente.$condicionzona.$condicionlocal.$condicionVendedor.$condicionestado_entregado.$condicionVendedor2." group by cod_ventaFK ";

// echo $sql;
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
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $iddetalles_entrega=$valor['iddetalles_entrega_cliente'];
		  	  $cod_ventaFK=utf8_encode($valor['cod_ventaFK']);
		  	  $iddocumentosFK=utf8_encode($valor['iddocumentos_clienteFK']);
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
		  	  $cobrador=utf8_encode($valor['cobrador']);
		  	  $fecha=utf8_encode($valor['fecha']);
			  $ci_cliente = utf8_encode($valor['ci_cliente']);
			  $nombre_persona = utf8_encode($valor['cliente']); 
		  	 $zona = utf8_encode($valor['zona']); 
			 $local = utf8_encode($valor['local']); 
			 $estado_entrega = utf8_encode($valor['estado_entrega']); 
			 $estado = utf8_encode($valor['estado']); 
			 $entregador = utf8_encode($valor['entregador']); 
			 $UsuarioIngresa = utf8_encode($valor['UsuarioIngresa']); 
		  	 
			  $detalle = buscardetallesventa($cod_ventaFK, $formato === 'json');
			  
			  $detalleCliente = buscardetallesventacliente($cod_ventaFK);
			  $nombre_producto = $detalleCliente[0];
			  $documento = $detalleCliente[1];
			  
			  $cantidad_chekeado = obtenercantidaddocumentoschekqueados_cliente($cod_ventaFK);
			  $cantidad_existentes = obtenercantidaddocumentosexistentes_cliente();
			  $filas[]=array(
				  'id_detalle'=>$iddetalles_entrega,
				  'cod_venta'=>$cod_ventaFK,
				  'id_documento'=>$iddocumentosFK,
				  'documento'=>$ci_cliente,
				  'cliente'=>$nombre_persona,
				  'zona'=>$zona,
				  'local'=>$local,
				  'estado_entrega'=>$estado_entrega,
				  'estado'=>$estado,
				  'entregador'=>$entregador,
				  'productos'=>$detalle,
				  'fecha'=>$fecha,
				  'documentos_entregados'=>(int)$cantidad_chekeado,
				  'documentos_totales'=>(int)$cantidad_existentes,
				  'documentos_resumen'=>$cantidad_chekeado.'/'.$cantidad_existentes,
				  'vendedor'=>$UsuarioIngresa
			  );
			  
			  $styleName=CargarStyleTable($styleName);
			  if($formato !== 'json') {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosdocumentosentregadoscliente(this)'>
			  <td id='' style='display:none;'>".$iddetalles_entrega."</td>
				<td  id='' style='width:5%'>".$ci_cliente."</td>
			  <td  id='' style='width:10%'>".$nombre_persona."</td>
			   <td id='td_id' style='display:none' >".$cod_ventaFK."</td>
			  <td  id='' style='width:5%'>".$zona."</td>
			  <td  id='' style='width:5%'>".$local."</td>
			  <td  id='' style='width:5%'>".$estado_entrega."</td>
			  <td  id='' style='width:5%'>".$estado."</td>
			  <td  id='' style='width:5%'>".$entregador."</td>
			  <td id='' style='width:10%' >".$detalle."</td>
			  <td id='' style='width:5%' >".$fecha."</td>
			  <td id='' style='width:5%' >".$cantidad_chekeado."/".$cantidad_existentes."</td>
			  <td  id='' style='width:5%'>".$UsuarioIngresa."</td>
			  </tr>
			  </table>";
			  }
			    	 
		  	
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}
function documentosentregadosdetalle($cod_ventaFK,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 
	 
		$sql= "SELECT iddetalles_entrega,cod_ventaFK,iddocumentosFK,
		(select descripcion from documentos where iddocumentos = iddocumentosFK) as nombredocumento
		from `detalles_entrega`	WHERE cod_ventaFK = '$cod_ventaFK'";


   
   $stmt = $mysqli->prepare($sql);

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
		  
		  
		  
		      $iddetalles_entrega=$valor['iddetalles_entrega'];
		  	  $cod_ventaFK=utf8_encode($valor['cod_ventaFK']);
			  $iddocumentosFK=utf8_encode($valor['iddocumentosFK']);
			  $nombredocumento=utf8_encode($valor['nombredocumento']);
			  $filas[]=array(
				  'codigo'=>$iddetalles_entrega,
				  'cod_venta'=>$cod_ventaFK,
				  'id_documento'=>$iddocumentosFK,
				  'documento'=>$nombredocumento
			  );
		  	 
			  
			  
			  $styleName=CargarStyleTable($styleName);
			  if($formato !== 'json') {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='obtenerdatosdocumentosentregados(this)'>
			  <td id='td_id' style='display:none;'>".$iddetalles_entrega."</td>
			  <td id='' style='width:100%' >".$nombredocumento."</td>
			  </tr>
			  </table>";
			  }
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}

function buscardetallesventa($codventa, $estructurado = false)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $productos=array();
		$sql= "Select (SELECT nombre_producto from producto where cod_producto = cod_productoFK) as nombre from detalle_venta where cod_ventaFK = $codventa";
   
   $stmt = $mysqli->prepare($sql);

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
		  
		      $detalleproducto=utf8_encode($valor['nombre']);

			  $styleName=CargarStyleTable($styleName);
			  $pagina.="*".$detalleproducto;
			  $productos[]=$detalleproducto;
			    	 
		  	
			  
			  
	  }
 }
 
 
return $estructurado ? $productos : $pagina;
}

function buscardetallesventacliente($codventa)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "SELECT (SELECT concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) as nombre_persona,
		(SELECT rut_cliente from cliente where cod_cliente = cod_clienteFK) as documento
		from venta WHERE cod_venta = '$codventa'";
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$datosArray = [];
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $nombre_persona=utf8_encode($valor['nombre_persona']);
		      $documento=utf8_encode($valor['documento']);	
			  
			  $datosArray[0] = $nombre_persona;
			  $datosArray[1] = $documento;
	  }
 }
 
 
return $datosArray;
}


function EliminarDocumentoEntregado($idDocumentos,$cod_venta)
{
	
	if($idDocumentos=="" || $cod_venta == "" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();
    
    $consulta="DELETE FROM detalles_entrega WHERE cod_ventaFK = '$cod_venta' and iddocumentosFK = '$idDocumentos'";
     

$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}
function EliminarDocumentoEntregadoCliente($idDocumentos,$cod_venta)
{
	
	if($idDocumentos=="" || $cod_venta == "" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();
    
    $consulta="DELETE FROM detalles_entrega_cliente WHERE cod_ventaFK = '$cod_venta' and iddocumentos_clienteFK = '$idDocumentos'";
     

$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}

function checkearDocumentoEntregado($idDocumentos,$cod_venta,$cod_cobrador)
{
	
	if($idDocumentos=="" || $cod_venta == "" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}
	

	$mysqli=conectar_al_servidor();


date_default_timezone_set('America/Anguilla');    
$fechaactual = date('Y-m-d', time()); 
	/* $fechaactual = date("Y-m-d"); */
    
    $consulta="insert into detalles_entrega (cod_ventaFK,iddocumentosFK,cod_cobradorFK,fecha) values ('$cod_venta','$idDocumentos','$cod_cobrador','$fechaactual')";
     


$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}

function checkearDocumentoEntregadoCliente($idDocumentos,$cod_venta,$cod_cobrador)
{
	
	if($idDocumentos=="" || $cod_venta == "" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();


date_default_timezone_set('America/Anguilla');    
$fechaactual = date('Y-m-d', time()); 
	/* $fechaactual = date("Y-m-d"); */
    
    $consulta="insert into detalles_entrega_cliente (cod_ventaFK,iddocumentos_clienteFK,cod_cobradorFK,fecha) values ('$cod_venta','$idDocumentos','$cod_cobrador','$fechaactual')";
     

$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}


function obtenercantidaddocumentoschekqueados($codventa)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$sql= "SELECT count(iddetalles_entrega) as cantidad
		from `detalles_entrega`	WHERE cod_ventaFK = '$codventa'";


   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $cantidad="";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cantidad=$valor['cantidad'];
		  	 
			    	 
		  	
			  
			  
	  }
 }
 
 
return $cantidad;
}
function obtenercantidaddocumentosexistentes()
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$sql= "SELECT count(iddocumentos) as cantidad
		from `documentos`	WHERE estado = 'Activo'";


   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $cantidad="";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cantidad=$valor['cantidad'];
		  	 
			    	 
		  	
			  
			  
	  }
 }
 
 
return $cantidad;
}

function obtenercantidaddocumentoschekqueados_cliente($codventa)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$sql= "SELECT count(iddetalles_entrega_cliente) as cantidad
		from `detalles_entrega_cliente`	WHERE cod_ventaFK = '$codventa'";


   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $cantidad="";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cantidad=$valor['cantidad'];
		  	 
			    	 
		  	
			  
			  
	  }
 }
 
 
return $cantidad;
}
function obtenercantidaddocumentosexistentes_cliente()
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$sql= "SELECT count(iddocumentos_cliente) as cantidad
		from `documentos_cliente`	WHERE estado = 'Activo'";


   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $cantidad="";
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cantidad=$valor['cantidad'];
		  	 
			    	 
		  	
			  
			  
	  }
 }
 
 
return $cantidad;
}





verificar($funt);
?>
