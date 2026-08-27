<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
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

if($funt=="EliminarDocumentoEntregado")
{
	
	
	$idDocumentos=$_POST['iddocumento'];
    $idDocumentos = utf8_decode($idDocumentos);
	$cod_venta=$_POST['cod_venta'];
    $cod_venta = utf8_decode($cod_venta);

	EliminarDocumentoEntregado($idDocumentos,$cod_venta);

}

if($funt=="buscar")
{
	
	$codVenta=$_POST['codVenta'];
    $codVenta = utf8_decode($codVenta);
	buscar($codVenta);

}	


}


function checkearDocumentoEntregado($idDocumentos,$cod_venta,$cod_cobrador)
{
	
	if($idDocumentos=="" || $cod_venta == "" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();

	$fechaactual = date("Y-m-d");
    
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




function buscar($codVenta)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
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
			  
			  $check = "<input type='checkbox' onclick='AbmDocumentosEntrega(this)' id='".$iddocumentos."'>";
			  
			  if($control){
				$check = "<input type='checkbox' onclick='EliminarDocumentoEntregado(this)' id='".$iddocumentos."' checked>";
			  }
			  
			  
			  
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
 
 
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
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





verificar($funt);
?>