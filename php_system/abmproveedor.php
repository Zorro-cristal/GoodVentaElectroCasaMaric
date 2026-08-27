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



if($operacion=="nuevo" || $operacion=="editar" )
{


$cod_persona=$_POST['cod_persona'];
$cod_persona = utf8_decode($cod_persona);

$nombre_persona=$_POST['nombre_persona'];
$nombre_persona = utf8_decode($nombre_persona);

$direccion=$_POST['direccion'];
$direccion = utf8_decode($direccion);

$telefono=$_POST['telefono'];
$telefono = utf8_decode($telefono);

$email=$_POST['email'];
$email = utf8_decode($email);

$cod_proveedor=$cod_persona;

$rut_proveedor=$_POST['rut_proveedor'];
$rut_proveedor = utf8_decode($rut_proveedor);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

abm($estado,$cod_persona,$nombre_persona,$direccion,$telefono,$email,$cod_proveedor,$rut_proveedor,$operacion);

}

if($operacion=="eliminardocumentoArchivosExcelPedidosProveedor")
{
$idcontrato=$_POST['idproveedor'];
$idcontrato = utf8_decode($idcontrato);
$iddocumento=$_POST['iddocumento'];
$iddocumento = utf8_decode($iddocumento);
$urldocumento=$_POST['urldocumento'];
$urldocumento = utf8_decode($urldocumento);
eliminardocumentoArchivosExcelPedidosProveedor($idcontrato,$iddocumento,$urldocumento);

}

if($operacion=="insertarArchivo")
{
$cod_proveedorFK=$_POST['cod_proveedorFK'];
$cod_proveedorFK = utf8_decode($cod_proveedorFK);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$archivo=$_POST['archivo'];
$archivo = utf8_decode($archivo);
$ext=$_POST['ext'];
$ext = utf8_decode($ext);


insertarArchivo($cod_proveedorFK,$ext,$archivo,$descripcion,$fecha);
}

if($operacion=="buscaroptionDescripcionArchivoPedidoProveedor")
{

	buscaroptionDescripcionArchivoPedidoProveedor();

}



if($operacion=="NuevoDescripcionArchivoPedidoProveedor")
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

	NuevoDescripcionArchivoPedidoProveedor($descripcion);

}

if($operacion=="buscarDocumentosCargaArchivoProveedorPedido")
{
$cod_proveedor=$_POST['cod_proveedorFK'];
$cod_proveedor = utf8_decode($cod_proveedor);

$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);

$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);

$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
buscarDocumentosCargaArchivo($cod_proveedor,$fecha1,$fecha2,$formato);
}

 if($operacion=="buscarselect")
{
buscarselect();
}


 
 if($operacion=="buscar"){
 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$ruc=$_POST["ruc"];
 	$ruc=utf8_decode($ruc);
	$proveedor=$_POST["proveedor"];
 	$proveedor=utf8_decode($proveedor);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
 	BuscarRegistro($codigo,$ruc,$proveedor,$estado);
 } 
 if($operacion=="buscarvista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	BuscarRegistroEnVista($buscar);
 }





}


/*Funcion para insertar,modificar o eliminar registros*/
function abm($estado,$cod_persona,$nombre_persona,$direccion,$telefono,$email,$cod_proveedor,$rut_proveedor,$operacion)
{

if($nombre_persona==""  || $rut_proveedor=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);
if($operacion=="nuevo") 
{
$consulta1="Insert into persona (nombre_persona,direccion,telefono,email)
values(?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$nombre_persona,$direccion,$telefono,$email);

$consulta2="Insert into proveedor (rut_proveedor,cod_proveedor,estado,cod_user_insert,fecha_insert)
values(?,(select cod_persona from persona order by cod_persona desc limit 1),?,?,?)";
$stmt2 = $mysqli->prepare($consulta2);
$ss='ssss';
$stmt2->bind_param($ss,$rut_proveedor,$estado,$user,$fecha_inser_edit);

}


if($operacion=="editar")
{

$consulta1="Update persona set nombre_persona=?,direccion=?,telefono=?,email=? where cod_persona=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$nombre_persona,$direccion,$telefono,$email,$cod_persona);


$consulta2="update proveedor set rut_proveedor=?,estado=?,cod_user_edit=?,fecha_edit=? where cod_proveedor=? ";
$stmt2 = $mysqli->prepare($consulta2);
$ss='sssss';
$stmt2->bind_param($ss,$rut_proveedor,$estado,$user,$fecha_inser_edit,$cod_persona);


}
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

if (!$stmt2->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}


/*Buscar Registro en vista*/
function BuscarRegistro($codigo,$ruc,$proveedor,$estado)
{
$mysqli=conectar_al_servidor();
$condicioncod="";
if($codigo!=""){
	$condicioncod=" and pr.cod_persona = '".$codigo."'";
}
$condicionruc="";
if($ruc!=""){
	$condicionruc=" and cl.rut_proveedor = '".$ruc."'";
}

$condicionproveedor="";
if($proveedor!=""){
	$condicionproveedor=" and pr.nombre_persona like '%".$proveedor."%'";
}
$sql= "select pr.cod_persona,pr.nombre_persona,pr.direccion,pr.telefono,pr.email,cl.rut_proveedor,cl.estado,
cl.fecha_insert,cl.fecha_edit,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_insert )as insertadopor,
(Select nombre_persona from persona pra where pra.cod_persona=cod_user_edit )as editadopor
from  persona pr inner join  proveedor cl on cl.cod_proveedor=pr.cod_persona 
where cl.estado=? ".$condicioncod.$condicionruc.$condicionproveedor;
$pagina = "";   
$filas = array();
$formato = isset($_POST['formato']) ? $_POST['formato'] : '';
$stmt = $mysqli->prepare($sql);
$s='s';
$stmt->bind_param($s,$estado);
if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$cod_persona = utf8_encode($valor['cod_persona']);/*Obtenemos el registro mediante el nombre del atributo */      
$nombre_persona = utf8_encode($valor['nombre_persona']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_proveedor = utf8_encode($valor['rut_proveedor']); 
$estado = utf8_encode($valor['estado']); 
$insertadopor = utf8_encode($valor['insertadopor']); 
$editadopor = utf8_encode($valor['editadopor']); 
$fecha_insert = utf8_encode($valor['fecha_insert']); 
$fecha_edit = utf8_encode($valor['fecha_edit']); 

$filas[] = array(
"codigo" => $cod_persona,
"ruc" => $rut_proveedor,
"proveedor" => $nombre_persona,
"direccion" => $direccion,
"telefono" => $telefono,
"email" => $email,
"estado" => $estado,
"insertadopor" => $insertadopor,
"editadopor" => $editadopor,
"fecha_insert" => $fecha_insert,
"fecha_edit" => $fecha_edit
);

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmProveedor(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$cod_persona."</td>
<td  id='td_datos_2' style='width:10%'>".$rut_proveedor."</td>
<td id='td_datos_1' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_3' style='display:none'>".$direccion."</td>
<td  id='td_datos_4' style='width:10%'>".$telefono."</td>
<td  id='td_datos_5' style='display:none'>".$email."</td>
<td  id='td_datos_6' style='display:none'>".$estado."</td>
<td  id='td_datos_100' style='display:none'>".$insertadopor."</td>
<td  id='td_datos_101' style='display:none'>".$editadopor."</td>
<td  id='td_datos_102' style='display:none'>".$fecha_insert."</td>
<td  id='td_datos_103' style='display:none'>".$fecha_edit."</td>
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

/*Buscar Registro en vista*/
function BuscarRegistroEnVista($buscar)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$filas=array();

$sql= "select pr.cod_persona,pr.nombre_persona,pr.direccion,pr.telefono,pr.email,cl.rut_proveedor,cl.estado 
from  persona pr inner join  proveedor cl on cl.cod_proveedor=pr.cod_persona 
where concat(pr.nombre_persona,' ',cl.rut_proveedor) like ? and cl.estado='Activo' ";/*Sentencia para buscar registros*/
$pagina = "";   
$buscar="%".$buscar."%";
$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
$s='s';/*Variable que indica la cantidad paramentros a cargar en la sentencia, guiarse por la cantidad de ? que se encuentra en la sentencia*/
$stmt->bind_param($s,$buscar);/*Se cargar los paramentros a la sentencia preparada*/
/*Función para ejecutar sentencias sql*/
if ( ! $stmt->execute()) {
/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$cod_persona = utf8_encode($valor['cod_persona']);/*Obtenemos el registro mediante el nombre del atributo */      
$nombre_persona = utf8_encode($valor['nombre_persona']);          
$direccion = utf8_encode($valor['direccion']);          
$telefono = utf8_encode($valor['telefono']); 
$email = utf8_encode($valor['email']); 
$rut_proveedor = utf8_encode($valor['rut_proveedor']); 
$estado = utf8_encode($valor['estado']); 
$filas[]=array(
	"codigo"=>$cod_persona,
	"ruc"=>$rut_proveedor,
	"proveedor"=>$nombre_persona,
	"direccion"=>$direccion,
	"telefono"=>$telefono,
	"email"=>$email,
	"estado"=>$estado
);

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaProveedor(this)'>
<td id='td_id' style='display:none'>".$cod_persona."</td>
<td  id='td_datos_2' style='width:10%'>".$rut_proveedor."</td>
<td id='td_datos_1' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_3' style='display:none'>".$direccion."</td>
<td  id='td_datos_4' style='width:10%'>".$telefono."</td>
<td  id='td_datos_5' style='display:none'>".$email."</td>
<td  id='td_datos_6' style='display:none'>".$estado."</td>
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
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


function buscarDocumentosCargaArchivo($codigo,$fecha1,$fecha2,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 
	 $condicionfecha = '';
	 if($fecha1 != ''){
		 $condicionfecha = " and fecha between '$fecha1' and '$fecha2'";
	 }
	 
	 $condicionproveedor = '';
	 if($codigo != ''){
		 $condicionproveedor = " and cod_proveedorFK='$codigo'";
	 }
	 
		$sql= "SELECT idarchivos_pedido_proveedor,url,descripcion,fecha,cod_proveedorFK,
		(SELECT nombre_persona FROM persona WHERE cod_persona = cod_proveedorFK) as proveedor
				FROM archivos_pedido_proveedor where idarchivos_pedido_proveedor != '' ".$condicionproveedor.$condicionfecha;
  
  // echo $sql;
  // exit;
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idarchivos_pedido_proveedor=$valor['idarchivos_pedido_proveedor'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $cod_proveedorFK=utf8_encode($valor['cod_proveedorFK']);
		  	  $proveedor=utf8_encode($valor['proveedor']);
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);
			  $filas[]=array(
				  "codigo_fila" => $codigo,
				  "id_archivo" => $idarchivos_pedido_proveedor,
				  "id_proveedor" => $cod_proveedorFK,
				  "url" => $archivourl,
				  "tipo" => "EXCEL",
				  "descripcion" => $descripcion,
				  "proveedor" => $proveedor,
				  "fecha" => $fecha
			  );
			  
			  if($formato!='json'){
		  	  $pagina.="
<table id='$codigo' class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistroArchivo' onclick='SeleccionarItemArchivosExcelPedidosProveedor(this)' name='tableRegistroSelec'>
<td id='td_id_1' style='display:none'>".$codigo."</td>
<td id='td_id_2' style='display:none'>".$idarchivos_pedido_proveedor."</td>
<td id='td_id_3' style='display:none'>".$cod_proveedorFK."</td>
<td id='td_datos_1' style='display:none'>".$archivourl."</td>
<td id='' style='width:20%'>EXCEL</td>
<td id='td_datos_2' style='width:30%'>".$descripcion."</td>
<td id='' style='width:30%'>".$proveedor."</td>
<td id='td_datos_3' style='width:20%'>".$fecha."</td>
</tr>
</table>";
			  }
			  
			  $codigo="";
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscaroptionDescripcionArchivoPedidoProveedor()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from descripcion_archivo_pedido_proveedor where estado='Activo' ";
		
		
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
		  
		  
		      $iddescripcion_archivo=$valor['iddescripcion_archivo_pedido_proveedor'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$iddescripcion_archivo' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function NuevoDescripcionArchivoPedidoProveedor($descripcion)
{
	
if($descripcion==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into descripcion_archivo_pedido_proveedor (descripcion,estado) values (upper(?),'Activo')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$descripcion);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}


function insertarArchivo($cod_detalle,$exte,$archivo,$descripcion,$fecha)
{
	$documento=substr($archivo, strpos($archivo, ",") + 1);;
	$documento = base64_decode($documento);
	
	$id_documento=rand(10,5000);		  
	$donde="../archivosexcel/";
	$id_documento=$cod_detalle;
	
	$id_f=subir_imagen_base64($donde,$documento,$id_documento,$exte);
	$ruta="/GoodVentaElectroCasaMaric/archivosexcel/".$cod_detalle.$id_f.'.'.$exte;
	
	CargarArchivoProveedor($ruta,$cod_detalle,$descripcion,$fecha);
}
function CargarArchivoProveedor($Urldoc,$idproveedorfk,$descripcion,$fecha){
	$mysqli=conectar_al_servidor();
	$consulta="INSERT INTO `archivos_pedido_proveedor` (url,cod_proveedorFK,descripcion,fecha) VALUES ('$Urldoc','$idproveedorfk','$descripcion','$fecha') ";
	
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
function eliminardocumentoArchivosExcelPedidosProveedor($cod_proveedorFK,$iddocumento,$urldocumento)
{
	$mysqli=conectar_al_servidor();
	$sql= "DELETE FROM archivos_pedido_proveedor WHERE cod_proveedorFK='$cod_proveedorFK' and idarchivos_pedido_proveedor='$iddocumento'";
 
 
 $file_delete = dirname(__FILE__) . $urldocumento;
 $file_delete = str_replace("/", "\\", $file_delete);
 $file_delete = str_replace("\php", "", $file_delete);
 $file_delete = str_replace("_", "\\", $file_delete);
 $file_delete = str_replace("\system", "", $file_delete);
 
 
$control = "Fracaso al borrar";

if (file_exists($file_delete)) {
    if (unlink($file_delete)) {
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
