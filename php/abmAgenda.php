<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
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



	
if($operacion=="nuevo")
{
	$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
	$fechaCompromiso=$_POST['fechaCompromiso'];
$fechaCompromiso = utf8_decode($fechaCompromiso);
	$estado=$_POST['estado'];
$estado = utf8_decode($estado);
	$Cod_cobrador=$_POST['useru'];
$Cod_cobrador = utf8_decode($Cod_cobrador);
	$cod_clienteAgenda=$_POST['cod_clienteAgenda'];
$cod_clienteAgenda = utf8_decode($cod_clienteAgenda);
$lat=$_POST['lat'];
$lat = utf8_decode($lat);
$lot=$_POST['lot'];
$lot = utf8_decode($lot);
$visitado=$_POST['visitado'];
$visitado = utf8_decode($visitado);

abm($motivo,$fechaCompromiso,$estado,$Cod_cobrador,$cod_clienteAgenda,$lat,$lot,$visitado,$operacion);

}


if($operacion=="buscar")
{
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$cobrador=$_POST["cobrador"];
 	$cobrador=utf8_decode($cobrador);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);;
	
 	buscar($estado,$fecha1,$fecha2,$cobrador);

}	
if($operacion=="buscarvista")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	buscarvista($buscar);

}
}

}


function abm($motivo,$fechaCompromiso,$estado,$Cod_cobrador,$cod_clienteAgenda,$lat,$lot,$visitado,$operacion)
{
	
	
if($motivo=="" || $Cod_cobrador==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 


if($operacion=="nuevo")
{


$consulta1="Insert into visitascliente (fecha,Motivo,cod_clienteFK,cod_cobradorFK,fechaCompro,estado,lat,lot,visitado) values (NOW(),'$motivo',$cod_clienteAgenda,$Cod_cobrador,'$fechaCompromiso','$estado','$lat','$lot','$visitado')";

// echo($consulta1);
// exit;
$stmt1 = $mysqli->prepare($consulta1);
}

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function buscar($estado,$fecha1,$fecha2,$cobrador)
{
$mysqli=conectar_al_servidor();


$condicionfecha="";
if($fecha1!="" || $fecha2!=""){
	$condicionfecha=" and fechaCompro between '$fecha1' and '$fecha2' ";
}
$condicionestado="";
if($estado!=""){
	$condicionestado=" and vc.estado = '$estado'";
}



$sql= "select vc.estado,fechaCompro, cod_VisitasCliente, fecha, Motivo, cod_clienteFK,
 vc.cod_cobradorFK ,(select nombre_persona from persona where cod_persona = vc.cod_cobradorFK) as cobrador ,
 (select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona = cod_clienteFK) as cliente ,
 (select nombre from zona z where idzona=(select idzonaFk from cliente where cod_cliente = cod_clienteFK)) as zona  
from visitascliente  vc
inner join cliente c on vc.cod_clienteFK = c.cod_cliente
 inner join zona z on z.idzona = c.idzonaFk  
 where cod_VisitasCliente!='' and z.cod_cobradorFK='$cobrador'
".$condicionestado.$condicionfecha." limit 500";

// echo($sql);
// exit;

$pagina = "";   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {

echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$estado = utf8_encode($valor['estado']);  
$cod_clienteFK = utf8_encode($valor['cod_clienteFK']);
$cod_VisitasCliente = utf8_encode($valor['cod_VisitasCliente']);
$Motivo = utf8_encode($valor['Motivo']);     
$fecha = utf8_encode($valor['fecha']); 
$cliente = utf8_encode($valor['cliente']);     
$zona = utf8_encode($valor['zona']); 
$cobrador = utf8_encode($valor['cobrador']);  
$fechaCompro = utf8_encode($valor['fechaCompro']);    
  

$fecha_formateada = date("d/m/Y", strtotime($fechaCompro));

	  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tbody>
<tr id='tbSelecRegistro' onclick=''>
<td  id='td_id_1' style='display:none'>".$cod_VisitasCliente."</td>
<td  id='td_datos_1' style='width:75%'>".$cliente."</td>
<td id='' style='width:35%'>".$fecha_formateada."</td>
<td id='td_datos_2' style='display:none'>".$fechaCompro."</td>
</tr>
</tbody>
</table>

<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tbody>
<tr id='tbSelecRegistro'  >
 
<td  id='' style='width:100%'>".$Motivo."</td> 
</tr>
</tbody>
</table>

";


}
}
     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}



function buscarvista($buscar)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
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
 
 
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscaroption()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from zona where estado='Activo' ";
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




verificar($operacion);
?>