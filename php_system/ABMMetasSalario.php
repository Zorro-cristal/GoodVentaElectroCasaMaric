<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include('quitarseparadormiles.php');
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
	
	
	$idabm=$_POST['idabm'];
    $idabm = utf8_decode($idabm);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$comisiondesde=$_POST['comisiondesde'];
    $comisiondesde = utf8_decode($comisiondesde);
	$tipo=$_POST['tipo'];
    $tipo = utf8_decode($tipo);
	$metas=$_POST['metas'];
    $metas = utf8_decode($metas);
	$desde=$_POST['desde'];
    $desde = utf8_decode($desde);
	$hasta=$_POST['hasta'];
    $hasta = utf8_decode($hasta);
	$cod_CargoFuncionariosFK=$_POST['cod_CargoFuncionariosFK'];
    $cod_CargoFuncionariosFK = utf8_decode($cod_CargoFuncionariosFK);
	$grupo=$_POST['grupo'];
    $grupo = utf8_decode($grupo);
	
	$estado=$_POST['estado'];
    $estado = utf8_decode($estado);
	
	$metodo=$_POST['metodo'];
    $metodo = utf8_decode($metodo);
	$tipoventa=$_POST['tipoventa'];
    $tipoventa = utf8_decode($tipoventa);

    
	abm($tipoventa,$idabm,$descripcion,$comisiondesde,$tipo,$metas,$desde,$hasta,$cod_CargoFuncionariosFK,$grupo,$estado,$metodo,$funt);

}

if($funt=="buscar")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
$idAbmCargoFuncionarios=$_POST['idAbmCargoFuncionarios'];
$idAbmCargoFuncionarios = utf8_decode($idAbmCargoFuncionarios);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
	buscar($buscar,$Estado,$idAbmCargoFuncionarios,$formato);

}	

if($funt=="buscarOption")
{

	buscarOption();

}	


}

function abm($tipoventa,$idabm,$descripcion,$comisiondesde,$tipo,$metas,$desde,$hasta,$cod_CargoFuncionariosFK,$grupo,$estado,$metodo,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from metas_salario where descripcion=? and porcentaje =? and cod_cargosFK =? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='sss';
$stmt->bind_param($ss, $descripcion,$metas,$cod_CargoFuncionariosFK); 


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
			if(strlen($metas)>=4){
				 $metas=  quitarseparadormiles($metas) ;
			 }
			 
			 if(strlen($desde)>=4){
				 $desde=  quitarseparadormiles($desde) ;
			 }
			 
			 if(strlen($hasta)>=4){
				 $hasta=  quitarseparadormiles($hasta) ;
			 }

	
	if($funt=="nuevo")
	{
	
    
    $consulta="insert into metas_salario (tipoVenta,descripcion,tipo,porcentaje,cod_cargosFK,desde,hasta,comision_desde,agrupacion_comision,estado,metodo) values (upper(?),?,?,?,?,?,?,?,?,?,?)";	
     $stmt = $mysqli->prepare($consulta);
    $ss='sssssssssss';
    $stmt->bind_param($ss,$tipoventa,$descripcion,$tipo,$metas,$cod_CargoFuncionariosFK,$desde,$hasta,$comisiondesde,$grupo,$estado,$metodo); 

	}
	if($funt=="editar")
	{
    
    $consulta="Update metas_salario set descripcion=upper('$descripcion'),tipo=?,porcentaje=?,cod_cargosFK=?,desde=?,hasta=?,
	comision_desde=?,agrupacion_comision=?,metodo=?,estado='$estado' ,tipoventa=? where idmetas_salario=$idabm";	

	$stmt = $mysqli->prepare($consulta);
	
	 $ss='sssssssss';
    $stmt->bind_param($ss,$tipo,$metas,$cod_CargoFuncionariosFK,$desde,$hasta,$comisiondesde,$grupo,$metodo,$tipoventa); 
	
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



function buscar($buscar,$Estado,$idAbmCargoFuncionarios,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
		$sql= "Select idmetas_salario, descripcion, tipo, porcentaje, cod_cargosFK, desde, hasta, comision_desde, agrupacion_comision, estado, metodo , tipoVenta
        from metas_salario  where  cod_cargosFK='$idAbmCargoFuncionarios' and  descripcion like ?  and estado=? order by agrupacion_comision asc ";
	
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
		  
		      $idmetas_salario=$valor['idmetas_salario'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $tipo=utf8_encode($valor['tipo']);
			  $porcentaje=$valor['porcentaje'];
		  	  $cod_cargosFK=utf8_encode($valor['cod_cargosFK']);
		  	  $desde=utf8_encode($valor['desde']);
			  $hasta=$valor['hasta'];
		  	  $comision_desde=utf8_encode($valor['comision_desde']);
		  	  $agrupacion_comision=utf8_encode($valor['agrupacion_comision']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $metodo=utf8_encode($valor['metodo']);
		  	  $tipoVenta=utf8_encode($valor['tipoVenta']);
		  	 
			 if(strlen($porcentaje)>=4 ){
			 
				 $porcentaje1=  number_format($porcentaje,'0',',','.') ;
				 $porcentaje2=  number_format($porcentaje,'0',',','.') ;
				 
				 
			 }else{
				 $porcentaje1=  $porcentaje." %";
				 $porcentaje2=  $porcentaje ;
			 }
			 
			 
			 if($tipo!='Porcentaje'){
				 $desde1=  number_format($desde,'0',',','.') ;
				 $desde2=  number_format($desde,'0',',','.') ;
			 }
			 
			 if($tipo=='Porcentaje'){
				 $desde1= $desde." %";
				 $desde2= $desde ;
			 }
			 
			 if($tipo!='Porcentaje'){
				 $hasta1=  number_format($hasta,'0',',','.') ;
				 $hasta2=  number_format($hasta,'0',',','.') ;
			 }
			 
			  if($tipo=='Porcentaje'){
				 $hasta1= $hasta." %";
				 $hasta2= $hasta;
			 }

			 $filas[]=array(
				 'codigo'=>$idmetas_salario,
				 'descripcion'=>$descripcion,
				 'tipo_venta'=>$tipoVenta,
				 'comision_desde'=>$comision_desde,
				 'tipo'=>$tipo,
				 'grupo'=>$agrupacion_comision,
				 'salario'=>$porcentaje1,
				 'salario_valor'=>$porcentaje2,
				 'desde'=>$desde1,
				 'hasta'=>$hasta1,
				 'desde_valor'=>$desde2,
				 'hasta_valor'=>$hasta2,
				 'estado'=>$estado,
				 'metodo'=>$metodo,
				 'cargo_codigo'=>$cod_cargosFK
			 );
			  
			 
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmMetasSalario(this)'>
			  <td  id='td_id' style='display:none;'>".$idmetas_salario."</td>
			  <td  id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$descripcion."</td>
			  <td  id='td_datos_11' style='width:10%;'>".$tipoVenta."</td>
			  <td  id='td_datos_2' style='width:10%;'>".$comision_desde."</td>
			  <td  id='td_datos_3' style='width:10%;'>".$tipo."</td>
			  <td  id='td_datos_8' style='width:15%;'>".$agrupacion_comision."</td>
			  <td    style='width:10%;'>".$porcentaje1."</td>
			  <td  id='td_datos_4' style='display:none'>".$porcentaje2."</td>
			  <td    style='width:10%;'>".$desde1."</td>
			  <td   style='width:10%;'>".$hasta1."</td>
			  <td  id='td_datos_5' style='display:none'>".$desde2."</td>
			  <td  id='td_datos_6' style='display:none'>".$hasta2."</td>
			  <td  id='td_datos_7' style='display:none'>".$estado."</td>			  
			  <td  id='td_datos_9' style='display:none'>".$metodo."</td>
			  <td  id='td_datos_10' style='display:none'>".$cod_cargosFK."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}


function buscarOption()
{
	$mysqli=conectar_al_servidor();
	 $pagina="<option value='' >SELECCIONAR</option>";  
		$sql= "Select idcargos,nombre,estado
        from cargos where estado='Activo' order by nombre asc ";
		   
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
		   
		  
		      $idcargos=$valor['idcargos'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  // $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$idcargos' >$nombre</option>";
		  	 
	  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}






verificar($funt);
?>
