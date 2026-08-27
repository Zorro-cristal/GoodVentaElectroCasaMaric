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
	
	
	$idestados_cliente_callcenter=$_POST['idabm'];
    $idestados_cliente_callcenter = utf8_decode($idestados_cliente_callcenter);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$Estado=$_POST['estado'];
    $Estado = utf8_decode($Estado);

    
    
	abm($idestados_cliente_callcenter,$descripcion,$Estado,$funt);

}

if($funt=="nuevo_estado_venta" || $funt=="editar_estado_venta")
{
	
	
	$idestados_cliente_callcenter_venta=$_POST['idabm'];
    $idestados_cliente_callcenter_venta = utf8_decode($idestados_cliente_callcenter_venta);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$Estado=$_POST['estado'];
    $Estado = utf8_decode($Estado);

    
    
	abm_venta($idestados_cliente_callcenter_venta,$descripcion,$Estado,$funt);

}

if($funt=="buscar")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
	buscar($buscar,$Estado);

}

if($funt=="buscar_venta")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
	buscar_venta($buscar,$Estado);

}	

if($funt=="buscarOption")
{
buscarOption();

}

if($funt=="buscarOptionVenta")
{
buscarOptionVenta();

}	


}

function abm($idestados_cliente_callcenter,$descripcion,$Estado,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from estados_cliente_callcenter where descripcion=? and estado ='Activo' ";
	
	
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
	
    
    $consulta="insert into estados_cliente_callcenter (descripcion,estado) values (UPPER(?),?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='ss';
    $stmt->bind_param($ss,$descripcion,$Estado); 
        
 
	}
	if($funt=="editar")
	{
        
        
    
    $consulta="Update estados_cliente_callcenter set descripcion=UPPER(?),estado=? where idestados_cliente_callcenter=?";	

	$stmt = $mysqli->prepare($consulta);
        


    $ss='sss';
        
    $stmt->bind_param($ss,$descripcion,$Estado,$idestados_cliente_callcenter); 
        
	
       
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
		$sql= "Select idestados_cliente_callcenter,descripcion,estado
        from estados_cliente_callcenter where descripcion like ?  and estado=? order by descripcion asc ";
		
 
   
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
		  
		  
		  
		      $idestados_cliente_callcenter=$valor['idestados_cliente_callcenter'];
			  $descripcion=utf8_encode($valor['descripcion']);
			  $Estado=utf8_encode($valor['estado']);
			  $filas[]=array(
				  "codigo" => $idestados_cliente_callcenter,
				  "descripcion" => $descripcion,
				  "estado" => $Estado
			  );
			  
			  if($formato !== "json") {
			  $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmEstadoCallCenter(this)'>
			  <td id='td_id' style='display:none;'>".$idestados_cliente_callcenter."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$descripcion."</td>
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



function buscarOption()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >SELECCIONAR</option>";  
		$sql= "Select idestados_cliente_callcenter,descripcion,estado
        from estados_cliente_callcenter where estado='Activo' order by descripcion asc ";
		
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
		  
		  
		  
		      $idestados_cliente_callcenter=$valor['idestados_cliente_callcenter'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['estado']);
		  	 
			   $pagina.="<option value='$idestados_cliente_callcenter' >$descripcion</option>";
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}



function abm_venta($idestados_cliente_callcenter_venta,$descripcion,$Estado,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from estados_cliente_callcenter_venta where descripcion=? and estado ='Activo' ";
	
	
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
	if($funt=="nuevo_estado_venta")
	{
	
    
    $consulta="insert into estados_cliente_callcenter_venta (descripcion,estado) values (UPPER(?),?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='ss';
    $stmt->bind_param($ss,$descripcion,$Estado); 
        
 
	}
	if($funt=="editar_estado_venta")
	{
        
        
    
    $consulta="Update estados_cliente_callcenter_venta set descripcion=UPPER(?),estado=? where idestados_cliente_callcenter_venta=?";	

	$stmt = $mysqli->prepare($consulta);
        


    $ss='sss';
        
    $stmt->bind_param($ss,$descripcion,$Estado,$idestados_cliente_callcenter_venta); 
        
	
       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
	
	
	
}




function buscar_venta($buscar,$Estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		$sql= "Select idestados_cliente_callcenter_venta,descripcion,estado
        from estados_cliente_callcenter_venta where descripcion like ?  and estado=? order by descripcion asc ";
		
 
   
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
		  
		  
		  
		      $idestados_cliente_callcenter_venta=$valor['idestados_cliente_callcenter_venta'];
			  $descripcion=utf8_encode($valor['descripcion']);
			  $Estado=utf8_encode($valor['estado']);
			  $filas[]=array(
				  "codigo" => $idestados_cliente_callcenter_venta,
				  "descripcion" => $descripcion,
				  "estado" => $Estado
			  );
			  
			  if($formato !== "json") {
			  $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmEstadoCallCenterVenta(this)'>
			  <td id='td_id' style='display:none;'>".$idestados_cliente_callcenter_venta."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$descripcion."</td>
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



function buscarOptionVenta()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >SELECCIONAR</option>";  
		$sql= "Select idestados_cliente_callcenter_venta,descripcion,estado
        from estados_cliente_callcenter_venta where estado='Activo' order by descripcion asc ";
		
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
		  
		  
		  
		      $idestados_cliente_callcenter_venta=$valor['idestados_cliente_callcenter_venta'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['estado']);
		  	 
			   $pagina.="<option value='$descripcion' >$descripcion</option>";
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}






verificar($funt);
?>
