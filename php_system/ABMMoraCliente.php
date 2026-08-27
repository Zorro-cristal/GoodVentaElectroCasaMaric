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
	
	
	$idmora_cliente=$_POST['idmora_cliente'];
    $idmora_cliente = utf8_decode($idmora_cliente);
	$nombre=$_POST['nombre'];
    $nombre = utf8_decode($nombre);
	$diadesde=$_POST['diadesde'];
    $diadesde = utf8_decode($diadesde);
	$diahasta=$_POST['diahasta'];
    $diahasta = utf8_decode($diahasta);
	$estado=$_POST['estado'];
    $estado = utf8_decode($estado);
	$puntaje=$_POST['puntaje'];
    $puntaje = utf8_decode($puntaje);

    
    
	abm($idmora_cliente,$nombre,$diadesde,$diahasta,$estado,$puntaje,$funt);

}

if($funt=="buscar")
{
	$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
	buscar($nombre,$Estado);

}

if($funt=="buscarVentasPorTramoVendedor")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
	buscarVentasPorTramoVendedor($fecha1,$fecha2);

}

if($funt=="buscartipobusqueda")
{
	buscartipobusqueda();

}

if($funt=="buscartipobusquedainformecuentasacobrar")
{
	buscartipobusquedainformecuentasacobrar();

}


if($funt=="buscartipobusquedacredito")
{
	buscartipobusquedacredito();

}

if($funt=="buscartipobusquedagenerarlistacallcenter")
{
	buscartipobusquedagenerarlistacallcenter();

}

if($funt=="GenerarMorosidad")
{
	$array_cod_cliente=json_decode($_POST['array_cod_cliente']);
	$array_cod_venta=json_decode($_POST['array_cod_venta']);
$cod_tipomoroso=$_POST['cod_tipomoroso'];
$cod_tipomoroso = utf8_decode($cod_tipomoroso);
	
	generar_morosidad($array_cod_venta,$array_cod_cliente,$cod_tipomoroso);

}	

if($funt=="buscarOption")
{

	buscarOption();

}



if($funt=="buscarOptionCliente")
{

buscarOptionCliente();
}

if($funt=="buscarOptionMoraCobrosRealizados")
{

	buscarOptionMoraCobrosRealizados();

}	


}

function abm($idmora_cliente,$nombre,$diadesde,$diahasta,$estado,$puntaje,$funt)
{
	
	if($nombre=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from mora_cliente where nombre=? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $nombre); 


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
	
    
    $consulta="insert into mora_cliente (nombre,diadesde,diahasta,estado,puntaje) values (upper(?),?,?,?,?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='sssss';
    $stmt->bind_param($ss,$nombre,$diadesde,$diahasta,$estado,$puntaje); 
        
 
	}
	if($funt=="editar")
	{
    
    $consulta="Update mora_cliente set nombre=upper('$nombre'),estado='$estado',diadesde='$diadesde',diahasta='$diahasta',puntaje = '$puntaje' where idmora_cliente=$idmora_cliente";	

	$stmt = $mysqli->prepare($consulta);
	
	// echo($consulta);
	// exit;

       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


 mysqli_close($mysqli);
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
        from mora_cliente where nombre like ?  and Estado=? order by nombre asc ";
		
 
   
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
		  
		  
		  
		      $idmora_cliente=$valor['idmora_cliente'];
			  $nombre=utf8_encode($valor['nombre']);
		  	  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
		  	  $informe=utf8_encode($valor['informe']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $puntaje=utf8_encode($valor['puntaje']);
			  $filas[]=array(
				  "codigo" => $idmora_cliente,
				  "nombre" => $nombre,
				  "desde" => $diadesde,
				  "hasta" => $diahasta,
				  "estado" => $estado,
				  "puntaje" => $puntaje
			  );
		  	 
			  
		  	 $styleName=CargarStyleTable($styleName);
			 if($formato !== "json") {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmMoraCliente(this)'>
			  <td id='td_id' style='display:none;'>".$idmora_cliente."</td>
			  <td id='td_datos_1'style='width:33%' class='tdRegistroSearch' >".$nombre."</td>
			  <td id='td_datos_3'style='width:33% class='tdRegistroSearch' >".$diadesde."</td>
			  <td id='td_datos_4'style='width:33%' class='tdRegistroSearch' >".$diahasta."</td>
			   <td  id='td_datos_2' style='display:none'>".$estado."</td>
			   <td  id='td_datos_5' style='display:none'>".$puntaje."</td>
			  </tr>
			  </table>";
			 }
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscarVentasPorTramoVendedor($fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$sql= "SELECT * FROM mora_cliente WHERE estado = 'Activo' and generar = 'SI'";
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 $control = 0;
 $arrayVendedores = obtenerArrayVendedores();
 $arrayMora = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idmora_cliente=$valor['idmora_cliente'];
			  $nombre=utf8_encode($valor['nombre']);
		  	 
			  $pagina .="<table><tr><td></td>";
			  
			  // $paginaTituloMora .= 
 
			  
	  }
 }
 
 
  
  mysqli_close($mysqli);

}

function obtenerArrayVendedores(){
	
 $mysqli=conectar_al_servidor();
 	$sql= "SELECT * FROM vendedor WHERE estado = 'Activo'";
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $vendedoresArray = array();
$parcialArray = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $idvendedor=$valor['idvendedor'];
			  $nombre=utf8_encode($valor['nombre']); 
			  
			  array_push($parcialArray, $idvendedor);
			  array_push($parcialArray, $nombre);
			  
			  array_push($vendedoresArray,$parcialArray);
			  $parcialArray = array();
	  }
 }
 
 
  mysqli_close($mysqli);
return $vendedoresArray;
}

function obtenerCantidadVentasporMora($idvendedor,$codMora){
 $mysqli=conectar_al_servidor();
 	$sql= "SELECT count(*) as contador FROM detalle_clasificacion_mora dcm inner join venta vt ON dcm.cod_venta = vt.cod_venta WHERE vendedor1 = '$idvendedor' and cod_moracliente = '$codMora'";
 
   
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $contador = 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $contador=$valor['contador'];
			  
			
	  }
 }
 
 
  mysqli_close($mysqli);
return $contador;
}


function buscartipobusqueda()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select *
        from mora_cliente where estado='Activo' order by idmora_cliente asc ";
		
 
   
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
		  
		  
		  
		      $idmora_cliente=$valor['idmora_cliente'];
			  $nombre=utf8_encode($valor['nombre']);
			  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
		  	 
			 $check = "<input type='checkbox' id='$idmora_cliente' onclick='obteneridtipobusqueda(this)'>";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$nombre." DESDE ".$diadesde." HASTA ".$diahasta." DIAS</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscartipobusquedacredito()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select *
        from mora_cliente where estado='Activo' order by idmora_cliente asc ";
		

   
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
		  
		  
		  
		      $idmora_cliente=$valor['idmora_cliente'];
			  $nombre=utf8_encode($valor['nombre']);
			  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
		  	 
			 $check = "<input type='checkbox' id='$idmora_cliente' onclick='obteneridtipobusquedacredito(this)'>";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$nombre." DESDE ".$diadesde." HASTA ".$diahasta." DIAS</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscartipobusquedainformecuentasacobrar()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select *
        from mora_cliente where estado='Activo' order by idmora_cliente asc ";
		

   
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
		  
		  
		  
		      $idmora_cliente=$valor['idmora_cliente'];
			  $nombre=utf8_encode($valor['nombre']);
			  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
		  	 
			 $check = "<input type='checkbox' id='$idmora_cliente' onclick='obteneridtipobusquedacuentasacobrar(this)'>";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$nombre." DESDE ".$diadesde." HASTA ".$diahasta." DIAS</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscartipobusquedagenerarlistacallcenter()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select *
        from mora_cliente where estado='Activo' order by idmora_cliente asc ";
		

   
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
		  
		  
		  
		      $idmora_cliente=$valor['idmora_cliente'];
			  $nombre=utf8_encode($valor['nombre']);
			  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
		  	 
			 $check = "<input type='checkbox' id='$idmora_cliente' onclick='obteneridtipobusquedalistacallcenter(this)'>";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$nombre." DESDE ".$diadesde." HASTA ".$diahasta." DIAS</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;
}
function buscarOption()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select *
        from mora_cliente where estado='Activo' and generar = 'SI' order by CONVERT(diahasta, SIGNED)  asc ";
		   
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $control = 1;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  
		      $idmora_cliente=$valor['idmora_cliente'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
			
			$descripcion = "";
			$descripcion .= $nombre;
			  if($diadesde != ""){
				 $descripcion .= " DESDE ".$diadesde;
			  }
			  
			  if($diahasta != ""){
				 $descripcion .= " HASTA ". $diahasta . " DIAS";
			  }
			  
			  if($diadesde == "" || $diahasta == ""){
				  $diadesde = $control;
				  $control++;
			  }
		  	 
		  	 
			    $pagina.="<option value='$idmora_cliente' name='$diadesde"."_"."$diahasta' >$descripcion</option>";
		  	 
	  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}


function generar_morosidad($array_cod_venta, $array_cod_cliente, $cod_tipomoroso)
{


	foreach ($array_cod_cliente as $cod_cliente) {
		actualizar_cliente_morosidad($cod_cliente, $cod_tipomoroso);
	}
	
	for($i=0; $i<count($array_cod_cliente);$i++){
		
		insertar_cliente_morosidad($array_cod_venta[$i],$array_cod_cliente[$i], $cod_tipomoroso);
	}
	
	
 
	$informacion =array("1" => "exito");
	echo json_encode($informacion);	
	exit;
}

function actualizar_cliente_morosidad($cod_cliente,$cod_tipomoroso)
{
	
	if($cod_tipomoroso=="" ){
		$informacion =array("1" => "DI");
		echo json_encode($informacion);	
		exit;
	}

	$mysqli=conectar_al_servidor();
	
    $consulta="UPDATE cliente SET cod_tipomora = '$cod_tipomoroso' WHERE cod_cliente = '$cod_cliente' and tipo_estado not in('12','13','14')";
	

	
    $stmt = $mysqli->prepare($consulta);
        

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}

	mysqli_close($mysqli);
}

function insertar_cliente_morosidad($cod_venta,$cod_cliente,$cod_tipomoroso)
{
	
		date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d h:i:s', time()); 

	$mysqli=conectar_al_servidor();
	
    $consulta="insert detalle_clasificacion_mora (cod_clienteFK,cod_venta,fecha_insert,cod_moracliente) value('$cod_cliente','$cod_venta','$fecha_inser_edit','$cod_tipomoroso')";
	

	
    $stmt = $mysqli->prepare($consulta);
        

	if ( ! $stmt->execute() ) {echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}

	mysqli_close($mysqli);
}


function buscarOptionMoraCobrosRealizados()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select *
        from mora_cliente where estado='Activo' and generar = 'SI' order by idmora_cliente asc ";
		   
		   $pagina = "<option value=''>SELECCIONAR</option>";
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}



	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $control = 1;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  
		      $idmora_cliente=$valor['idmora_cliente'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
		  	 
			 $descripcion = "";
			 $descripcion.= $nombre." DE ".$diadesde." HASTA ".$diahasta;
		  	 
			    $pagina.="<option value='$idmora_cliente' >$descripcion</option>";
		  	 
	  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}



function buscarOptionCliente()
{
	$mysqli=conectar_al_servidor();
	$pagina="<option value=''  >SELECCIONAR</option>";
		$sql= "Select *
        from mora_cliente where estado='Activo'  order by idmora_cliente asc ";
		   
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $control = 1;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  
		      $idmora_cliente=$valor['idmora_cliente'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $diadesde=utf8_encode($valor['diadesde']);
		  	  $diahasta=utf8_encode($valor['diahasta']);
			   $generar=utf8_encode($valor['generar']);
			
			$descripcion = "";
			$descripcion .= $nombre;
			  if($diadesde != ""){
				 $descripcion .= " DESDE ".$diadesde;
			  }
			  
			  if($diahasta != ""){
				 $descripcion .= " HASTA ". $diahasta . " DIAS";
			  }
			  
			  if($diadesde == "" || $diahasta == ""){
				  $diadesde = $control;
				  $control++;
			  }
			  
			  if($generar == "SI"  ){
				  $pagina.="<option value='$idmora_cliente' name='$diadesde"."_"."$diahasta' >$descripcion</option>";
			  }else{
				   $pagina.="<option value='$idmora_cliente' name='$diadesde"."_"."$diahasta' >$nombre</option>";
			  }
		  	 
		  	 
			   
		  	 
	  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}




verificar($funt);
?>
