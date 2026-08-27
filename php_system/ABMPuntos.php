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


	
	




	
if($funt=="nuevo" || $funt=="editar" || $funt=="eliminar")
{
	
	
	$cod_puntos=$_POST['idabm'];
    $cod_puntos = utf8_decode($cod_puntos);
	$puntos=$_POST['puntos'];
    $puntos = utf8_decode($puntos);
	$cod_productoFK=$_POST['cod_productoFK'];
    $cod_productoFK = utf8_decode($cod_productoFK); 

    
    
	abm($cod_puntos,$puntos ,$cod_productoFK ,$funt);

}

if($funt=="buscar")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	buscar($buscar);

}	

if($funt=="buscarOption")
{
buscarOption();

}	


}

function abm($cod_puntos,$puntos,$cod_productoFK, $funt)
{
	
	if($puntos=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "delete from puntos where cod_productoFK='$cod_productoFK' and idpuntos !='' ";
	
	
			 $stmt = $mysqli->prepare($consulta);
			 
			if ( ! $stmt->execute()) {
				$informacion =array("1" => "error");
				echo json_encode($informacion);	
				exit;
			}



			 $consulta="insert into puntos (punto,cod_productoFK) values (?,?)";	
				 $stmt = $mysqli->prepare($consulta);
				$ss='ss';
				$stmt->bind_param($ss,$puntos,$cod_productoFK); 
					
			 
			if ( ! $stmt->execute() ) {
			echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
			exit;

			}
  
	}
	
  
	if($funt=="editar")
		{
				 
		
			$consulta="update puntos  set punto='$puntos'  where idpuntos='$cod_puntos' ";	
			$stmt = $mysqli->prepare($consulta);
	   
	 
			if ( ! $stmt->execute() ) {
			echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
			exit;

		}
		}
		
		
		if($funt=="eliminar")
		{
				  
			 $consulta= "delete from puntos where idpuntos ='$cod_puntos' ";
	
	
			 $stmt = $mysqli->prepare($consulta);
			 
			if ( ! $stmt->execute()) {
				$informacion =array("1" => "error");
				echo json_encode($informacion);	
				exit;
			}

		}


 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
 
}
 
function buscar($buscar)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		$sql= "Select punto,idpuntos from puntos where cod_productoFK ='$buscar'  ";
		
 
   
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
 
		      $punto=$valor['punto'];
		  	  $idpuntos=utf8_encode($valor['idpuntos']); 
			  $filas[]=array("codigo" => $idpuntos, "punto" => $punto);
 
			  $styleName=CargarStyleTable($styleName);
			  if($formato !== "json") {
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmPuntos(this)'>
			  <td id='td_id' style='display:none;'>".$idpuntos."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$punto."</td> 
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
	 $pagina="<option value='' >TODOS</option>";  
		$sql= "Select cod_marcas,descripcion,Estado
        from marcas where Estado='Activo' order by descripcion asc ";
		
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
		  
		  
		  
		      $cod_marcas=$valor['cod_marcas'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	 
			   $pagina.="<option value='$cod_marcas' >$descripcion</option>";
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}
 

verificar($funt);
?>
