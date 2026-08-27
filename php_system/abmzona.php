<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");

function verificar($operacion)
{
	
	
	if($operacion=="buscaroption")
{
	


	buscaroption();

}else {	
	
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



//CONTROL DE ACCESO



	
if($operacion=="nuevo" || $operacion=="editar")
{
	
	
	$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$idcobradorFK=$_POST['idcobradorFK'];
$idcobradorFK = utf8_decode($idcobradorFK);
$idzona=$_POST['idzona'];
$idzona = utf8_decode($idzona);
abm($nombre,$estado,$idcobradorFK,$idzona,$operacion);

}

if($operacion=="buscar")
{
	$codigo=$_POST['codigo'];
$codigo = utf8_decode($codigo);
$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$encargado=$_POST['encargado'];
$encargado = utf8_decode($encargado);

	buscar($codigo,$nombre,$estado,$encargado);

}	
if($operacion=="buscarvista")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	buscarvista($buscar);

}

if($operacion=="buscaroptionzonanuevocliente")
{

	buscaroptionzonanuevocliente();

}
}

}

function abm($nombre,$estado,$idcobradorFK,$idzona,$operacion)
{
	
	
if($nombre=="" || $idcobradorFK==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 

if($operacion=="nuevo")
{


$consulta1="Insert into zona (nombre,estado,cod_cobradorFK)
values(?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$nombre,$estado,$idcobradorFK);


}


if($operacion=="editar")
{

$consulta1="Update zona set nombre=?,estado=?,cod_cobradorFK=? where idzona=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$nombre,$estado,$idcobradorFK,$idzona);

}

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function buscar($codigo,$nombre,$estado,$encargado)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $registros=array();
	 $devolverArray=isset($_POST['formato']) && $_POST['formato']==='json';
	 	$condicioncodigo="";
if($codigo!=""){
	$condicioncodigo=" and idzona ='".$codigo."'";
}
$condicionnombre="";
if($nombre!=""){
	$condicionnombre=" and nombre  like '%".$nombre."%'";
}
$condicionencargado="";
if($encargado!=""){
	$condicionencargado=" and (SELECT nombre_persona FROM persona WHERE cod_persona = cod_cobradorFK)  like '%".$encargado."%'";
}
		$sql= "Select idzona,nombre,estado,
		(SELECT nombre_persona FROM persona inner join cobrador on  cod_persona = cod_cobrador WHERE cod_persona = cod_cobradorFK and estado='Activo') as cobrador,
		(Select count(cod_cliente) from cliente where idzonaFk=idzona) as nroCliente,cod_cobradorFK
		from zona  where estado=? ".$condicioncodigo.$condicionnombre.$condicionencargado;
		
   // echo($sql);
   // exit;
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';

$stmt->bind_param($s,$estado);

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
		  
		  
		      $idzona=$valor['idzona'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $nroCliente=utf8_encode($valor['nroCliente']);
		  	  $encargado=utf8_encode($valor['cobrador']);
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
		  	  $registros[]=array(
		  	  	'codigo'=>$idzona,
		  	  	'nombre'=>$nombre,
		  	  	'encargado'=>$encargado,
		  	  	'nro_clientes'=>$nroCliente,
		  	  	'estado'=>$estado,
		  	  	'cod_cobrador'=>$cod_cobradorFK
		  	  );
		  	 
		  	 
			  $styleName=CargarStyleTable($styleName);  	 
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmZona(this)'>
<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$idzona."</td>
<td  id='td_datos_1' style='width:50%'>".$nombre."</td>
<td  id='td_datos_3' style='width:30%'>".$encargado."</td>
<td  id='' style='width:10%'>".number_format($nroCliente,'0',',','.')."</td>
<td  id='td_datos_2' style='display:none'>".$estado."</td>
<td  id='td_datos_4' style='display:none'>".$cod_cobradorFK."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
$informacion =array("1" => "exito","2" => ($devolverArray ? $registros : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscarvista($buscar)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	 $filas=array();
		$sql= "Select * from zona where nombre like ?  and estado='Activo' ";
		
   
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';
$buscar="%".$buscar."%";
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar);

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
		  
		  
		      $idzona=$valor['idzona'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
			  $filas[]=array(
				  'codigo'=>$idzona,
				  'zona'=>$nombre,
				  'estado'=>$estado
			  );
		  	 
		  	 
			    	 $styleName=CargarStyleTable($styleName);  
		  	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosVistaZona(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idzona."</td>
<td  id='td_datos_1' style='width:50%'>".$nombre."</td>
<td  id='td_datos_2' style='display:none'>".$estado."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscaroption()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from zona where estado='Activo'";
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
		  
		  
		      $idzona=$valor['idzona'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$idzona' >".$nombre."</option>";   
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function buscaroptionzonanuevocliente()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "SELECT zona from nuevos_cliente group by zona";
		 $pagina="";  

   
   
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
		  
		  
		     
		  	  $nombre=utf8_encode($valor['zona']);
		  	  
		  	 
		  	 
			    	
			  $pagina.="<option  value='$nombre' >".$nombre."</option>";   
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}




verificar($operacion);
?>
