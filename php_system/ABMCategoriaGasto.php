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


	
if($funt=="Nuevo" || $funt=="editar")
{
	
	
	$cod_categoria=$_POST['idabm'];
    $cod_categoria = utf8_decode($cod_categoria);
	$CategoriaGasto=$_POST['CategoriaGasto'];
    $CategoriaGasto = utf8_decode($CategoriaGasto);
	$estado=$_POST['estado'];
    $estado = utf8_decode($estado);

    
    
	abm($cod_categoria,$CategoriaGasto,$estado,$funt);

}

if($funt=="buscar")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
	buscar($buscar,$Estado);

}	

if($funt=="buscaroption")
{

	buscarOption();

}	


}

function abm($cod_categoria,$CategoriaGasto,$estado,$funt)
{
	
	if($CategoriaGasto=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="Nuevo")
	{
				$consulta= "Select count(*) from categoriaGasto where nombre=? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $CategoriaGasto); 


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
	if($funt=="Nuevo")
	{
	
    
    $consulta="insert into categoriaGasto (nombre,estado) values ('$CategoriaGasto','$estado')";	
     $stmt = $mysqli->prepare($consulta);
 
 
	}
	if($funt=="editar")
	{
        
        
    
    $consulta="Update categoriaGasto set nombre=?,estado=? where cod_categoriaGasto=?";	

	$stmt = $mysqli->prepare($consulta);
        


    $ss='sss';
        
    $stmt->bind_param($ss,$categoriaGasto,$estado,$cod_categoria); 
        
	
       
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
function buscar($buscar,$estado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select cod_categoriaGasto,nombre,estado
        from categoriaGasto where nombre like ?  and estado=? order by nombre asc ";
		
 
   
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar1,$estado);

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
		  
		  
		  
		      $cod_categoriaGasto=$valor['cod_categoriaGasto'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosCategoriaGasto(this)'>
			  <td id='td_id' style='display:none;'>".$cod_categoriaGasto."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$nombre."</td>
			   <td  id='td_datos_2' style='display:none'>".$estado."</td>
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
		$sql= "Select cod_categoriaGasto, nombre, estado
        from categoriaGasto where estado='Activo' order by nombre asc ";
		   
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
		    
		      $cod_categoriaGasto=$valor['cod_categoriaGasto'];
		  	  $nombre=utf8_encode($valor['nombre']); 
		  	 
			  $pagina.="<option value='$cod_categoriaGasto' >$nombre</option>";
 
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}






verificar($funt);
?>