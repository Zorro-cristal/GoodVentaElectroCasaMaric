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
	$idAgenda=$_POST['idAgendaPersonal'];
$idAgenda = utf8_decode($idAgenda);
	$motivo=$_POST['motivo'];
$motivo = utf8_decode($motivo);
	$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
	$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$cod_tipo_agendaFK=$_POST['cod_tipo_agendaFK'];
$cod_tipo_agendaFK = utf8_decode($cod_tipo_agendaFK);
	

abm($cod_tipo_agendaFK,$idAgenda,$motivo,$fecha,$estado,$operacion);

}


if($operacion=="buscar")
{
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$cod_tipo_agendaFK=$_POST["cod_tipo_agendaFK"];
 	$cod_tipo_agendaFK=utf8_decode($cod_tipo_agendaFK);
	
 	buscar($fecha1,$fecha2,$cod_tipo_agendaFK);

}	

}

}

function abm($cod_tipo_agendaFK,$idAgenda,$motivo,$fecha,$estado,$operacion)
{
	
if($motivo==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}


 $user=$_POST['useru'];
    $user = utf8_decode($user);

$mysqli=conectar_al_servidor(); 

if($operacion=="nuevo")
{
$consulta1="Insert into agenda_personal (cod_tipo_agendaFK,fecha_hora,motivo,fecha,estado,cod_usuario) values ('$cod_tipo_agendaFK',NOW(),'$motivo','$fecha','$estado','$user')";
$stmt1 = $mysqli->prepare($consulta1);
}


if($operacion=="editar")
{

$consulta1="Update agenda_personal set motivo=?,fecha=?,estado=?,cod_tipo_agendaFK=? where idagenda_personal=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$motivo,$fecha,$estado,$cod_tipo_agendaFK,$idAgenda);
}

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function buscar($fecha1,$fecha2,$cod_tipo_agendaFK)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$filas=array();

$condicionfecha="";
if($fecha1!="" || $fecha2!=""){
	$condicionfecha=" and fecha between '$fecha1' and '$fecha2' ";
}

$condiciontipo="";
if($cod_tipo_agendaFK!=""){
	$condiciontipo=" and cod_tipo_agendaFK ='$cod_tipo_agendaFK'";
}

$sql= "SELECT idagenda_personal,motivo,fecha,estado,cod_tipo_agendaFK,
(SELECT descripcion FROM descripcion_tipo_agenda_personal WHERE iddescripcion_tipo_agenda_personal = cod_tipo_agendaFK) as tipo 
FROM agenda_personal WHERE estado = 'Activo' ".$condicionfecha.$condiciontipo." limit 500";

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
 $styleName="tableRegistroSearch";
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  
$estado = utf8_encode($valor['estado']);  
$Motivo = utf8_encode($valor['motivo']);     
$fecha = utf8_encode($valor['fecha']);
$idagenda_personal = utf8_encode($valor['idagenda_personal']);
$tipo = utf8_encode($valor['tipo']);
$cod_tipo_agendaFK = utf8_encode($valor['cod_tipo_agendaFK']);

$filas[]=array(
"codigo" => $idagenda_personal,
"fecha" => $fecha,
"motivo" => $Motivo,
"tipo" => $tipo,
"cod_tipo_agenda" => $cod_tipo_agendaFK,
"estado" => $estado
);

if($formato !== "json") {
 $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmAgendaPersonal(this)'>
<td  id='td_id' style='display:none'>".$idagenda_personal."</td>
<td  id='td_datos_1' style='width:10%'>".$fecha."</td>
<td  id='td_datos_2' style='width:80%'>".$Motivo."</td>
<td  id='' style='width:10%'>".$tipo."</td>
<td  id='td_datos_3' style='display:none'>".$cod_tipo_agendaFK."</td>
<td  id='td_datos_4' style='display:none'>".$estado."</td>
</tr>
</table>";
}


}
}


     mysqli_close($mysqli);
$informacion =array("1" => "exito","2" =>($formato === "json" ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}


verificar($operacion);
?>
