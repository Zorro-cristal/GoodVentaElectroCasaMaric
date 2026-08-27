<?php
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include("subir_foto_base64.php");

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
function ObtenerDatos($operacion)
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

//CONTROL DE ACCESO





if($operacion=="eliminardocumentoCargaArchivoGeneral")
{

$iddocumento=$_POST['idarchivo'];
$iddocumento = utf8_decode($iddocumento);
$urldocumento=$_POST['urldocumento'];
$urldocumento = utf8_decode($urldocumento);
eliminardocumentoCargaArchivoGeneral($iddocumento,$urldocumento);

}

if($operacion=="insertarArchivo")
{
$mes=$_POST['mes'];
$mes = utf8_decode($mes);
$anho=$_POST['anho'];
$anho = utf8_decode($anho);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);
$cod_descripcion_tipo_movimientoFK=$_POST['cod_descripcion_tipo_movimientoFK'];
$cod_descripcion_tipo_movimientoFK = utf8_decode($cod_descripcion_tipo_movimientoFK);
$cod_descripcion_carga_archivo=$_POST['cod_descripcion_carga_archivo'];
$cod_descripcion_carga_archivo = utf8_decode($cod_descripcion_carga_archivo);
$archivo=$_POST['archivo'];
$archivo = utf8_decode($archivo);
$ext=$_POST['ext'];
$ext = utf8_decode($ext);


insertarArchivo($mes,$anho,$ext,$archivo,$cod_descripcion_tipo_movimientoFK,$cod_descripcion_carga_archivo,$tipo);
}



 if($operacion=="buscarselect")
{
buscarselect();
}


 
 if($operacion=="buscar"){
 	$mes=$_POST["mes"];
 	$mes=utf8_decode($mes);
	$anho=$_POST["anho"];
 	$anho=utf8_decode($anho);
	$tipo_movimiento=$_POST["tipo_movimiento"];
 	$tipo_movimiento=utf8_decode($tipo_movimiento);
	$descripcion=$_POST["descripcion"];
 	$descripcion=utf8_decode($descripcion);
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
 	BuscarRegistro($mes,$anho,$tipo_movimiento,$descripcion,$fecha1,$fecha2);
 } 





}


/*Buscar Registro en vista*/
function BuscarRegistro($mes,$anho,$tipo_movimiento,$descripcion,$fecha1,$fecha2)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$filas=array();
$condicionmes="";
if($mes!=""){
	$condicionmes=" and mes = '".$mes."'";
}
$condicionanho="";
if($anho!=""){
	$condicionanho=" and anho = '".$anho."'";
}

$condiciontipo_movimiento="";
if($tipo_movimiento!=""){
	$condiciontipo_movimiento=" and cod_descripcion_tipo_movimientoFK = '$tipo_movimiento'";
}


$condiciondescripcion="";
if($descripcion!=""){
	$condiciondescripcion=" and cod_descripcion_carga_archivo = '$descripcion'";
}

$condicionfechas="";
if($fecha1!="" && $fecha2 !=""){
	$condicionfechas=" and date(fecha_carga) between '$fecha1' and '$fecha2' ";
}



$sql= "SELECT idarchivos_general, tipo, url, mes, anho,
(SELECT descripcion FROM descripcion_tipo_movimiento WHERE cod_descripcion_tipo_movimiento = cod_descripcion_tipo_movimientoFK) as tipo_movimiento,
(SELECT descripcion FROM descripcion_carga_archivo WHERE cod_descripcion_carga_archivo = cod_descripcion_carga_archivoFK) as descripcion,date(fecha_carga) as fecha_carga,user_insert FROM archivos_general WHERE idarchivos_general != ''  ".$condicionmes.$condicionanho.$condiciontipo_movimiento.$condiciondescripcion.$condicionfechas;
$pagina = "";  

// echo $sql;
// exit;
 
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

$idarchivos_general = utf8_encode($valor['idarchivos_general']);
$url = utf8_encode($valor['url']);          
$mes = utf8_encode($valor['mes']);          
$anho = utf8_encode($valor['anho']);                 
$fecha_carga = utf8_encode($valor['fecha_carga']);          
$tipo_movimiento = utf8_encode($valor['tipo_movimiento']);          
$descripcion = utf8_encode($valor['descripcion']);          
$tipo = utf8_encode($valor['tipo']);          

$filas[]=array(
"codigo" => $idarchivos_general,
"url" => $url,
"tipo_archivo" => $tipo,
"fecha_carga" => $fecha_carga,
"mes" => $mes,
"mes_descripcion" => obtenerMes($mes),
"anho" => $anho,
"tipo_movimiento" => $tipo_movimiento,
"descripcion" => $descripcion
);

if($formato !== "json") {
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='SeleccionarItemCargaArchivoGeneral(this)'>
<td id='td_id' style='display:none'>".$idarchivos_general."</td>
<td  id='td_datos_2' style='display:none'>".$url."</td>
<td  id='td_datos_4' style='display:none'>".$tipo."</td>
<td id='' style='width:10%'>".$fecha_carga."</td>
<td id='td_datos_1' style='width:10%'>".obtenerMes($mes)."</td>
<td  id='td_datos_3' style='width:10%'>".$anho."</td>
<td  id='' style='width:30%'>".$tipo_movimiento."</td>
<td  id='' style='width:30%'>".$descripcion."</td>
</tr>
</table>";
}


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

function obtenerMes($mes)
{
    $meses = [
        "01" => "Enero",
        "02" => "Febrero",
        "03" => "Marzo",
        "04" => "Abril",
        "05" => "Mayo",
        "06" => "Junio",
        "07" => "Julio",
        "08" => "Agosto",
        "09" => "Septiembre",
        "10" => "Octubre",
        "11" => "Noviembre",
        "12" => "Diciembre"
    ];

    return $meses[$mes];
}

function buscarselect()
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$pagina.="<option  value='' >SELECCIONAR</option>";   
	$sql= "Select p.nombre_persona,pro.cod_proveedor
	from persona p inner join proveedor pro ON p.cod_persona = pro.cod_proveedor where pro.estado='Activo' order by nombre_persona asc ";	   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $cod_proveedor=$valor['cod_proveedor'];
		  	  $nombre=utf8_encode($valor['nombre_persona']);
		  	 
		  	 
			    	 
		  	  $pagina.="<option  value='$cod_proveedor' >".$nombre."</option>";   
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}




function insertarArchivo($mes,$anho,$ext,$archivo,$cod_descripcion_tipo_movimientoFK,$cod_descripcion_carga_archivoFK,$tipo)
{
	
	
	 $user=$_POST['useru'];
    $user = utf8_decode($user);
	
	$mysqli=conectar_al_servidor();
	$consulta="INSERT INTO `archivos_general` (tipo,mes,anho,cod_descripcion_tipo_movimientoFK,cod_descripcion_carga_archivoFK,fecha_carga,user_insert) VALUES ('$tipo','$mes','$anho','$cod_descripcion_tipo_movimientoFK','$cod_descripcion_carga_archivoFK',NOW(),'$user') ";
	
$stmt = $mysqli->prepare($consulta);

if (!$stmt->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

$documento=substr($archivo, strpos($archivo, ",") + 1);;
	$documento = base64_decode($documento);
	
	// $random=rand(10,5000);		  
	$donde="../archivos_general/";
	$id_documento=mysqli_insert_id($mysqli);
	
	$id_f=subir_imagen_base64($donde,$documento,$id_documento,$ext);
	$ruta="/GoodVentaElectroCasaMaric/archivos_general/".$id_documento.$id_f.'.'.$ext;


$consulta="UPDATE `archivos_general` SET url = '$ruta' WHERE idarchivos_general='$id_documento' ";
	
$stmt = $mysqli->prepare($consulta);

if (!$stmt->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}





 mysqli_close($mysqli); 
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}

function eliminardocumentoCargaArchivoGeneral($idarchivo,$urldocumento)
{
	$mysqli=conectar_al_servidor();
	$sql= "DELETE FROM archivos_general WHERE idarchivos_general='$idarchivo'";
 
$ruta_fisica = $_SERVER['DOCUMENT_ROOT'] . $urldocumento;
 
$control = "Fracaso al borrar";

if (file_exists($ruta_fisica)) {
    if (unlink($ruta_fisica)) {
        $control = "exito";
    } else {
        $control = "Fracaso al borrar: " . error_get_last()['message'];
    }
} else {
    $control = "El archivo no existe";
}
   
$stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	
 
mysqli_close($mysqli);
 $informacion =array("1" => $control);
echo json_encode($informacion);	
exit;


}


ObtenerDatos($operacion);

?>
