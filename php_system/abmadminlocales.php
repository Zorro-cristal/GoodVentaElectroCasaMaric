<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include("subir_foto_base64.php");
include("quitarseparadormiles.php");
function verificar($operacion)
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

if($operacion=="nuevo_meta" || $operacion=="editar_meta")
{
	
	
	$idAbmMetaVendedor=$_POST['idAbmMetaVendedor'];
$idAbmMetaVendedor = utf8_decode($idAbmMetaVendedor);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor); 

$estado =$_POST['estado'];
$estado = utf8_decode($estado); 
	abm_metas($estado,$idAbmMetaVendedor,$monto,$fecha,$vendedor ,$operacion);

}
	
if($operacion=="nuevo" || $operacion=="editar")
{
	
	
	$idadminlocales=$_POST['idadminlocales'];
$idadminlocales = utf8_decode($idadminlocales);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$telefono=isset($_POST['telefono']) ? $_POST['telefono'] : "";
$telefono = utf8_decode($telefono);
$direccion=isset($_POST['direccion']) ? $_POST['direccion'] : "";
$direccion = utf8_decode($direccion);
$ciudad=isset($_POST['ciudad']) ? $_POST['ciudad'] : "";
$ciudad = utf8_decode($ciudad);



	abm($descripcion,$estado,$idadminlocales,$operacion,$telefono,$direccion,$ciudad);

}

if($operacion=="actualizarDatosEmpresa")
{
	$nombre=$_POST['nombre'];
	$nombre = utf8_decode($nombre);
	$ruc=$_POST['ruc'];
	$ruc = utf8_decode($ruc);
	$ruc_original=isset($_POST['ruc_original']) ? $_POST['ruc_original'] : "";
	$ruc_original = utf8_decode($ruc_original);
	$telefono_empresa=isset($_POST['telefono']) ? $_POST['telefono'] : "";
	$telefono_empresa = utf8_decode($telefono_empresa);
	$logo_color=isset($_POST['logo_color']) ? $_POST['logo_color'] : "";
	$logo_impreso=isset($_POST['logo_impreso']) ? $_POST['logo_impreso'] : "";

	actualizarDatosEmpresa($nombre,$ruc,$telefono_empresa,$logo_color,$logo_impreso,$ruc_original);

}


if($operacion=="checkearAdminLocalLocales")
{
	
	
	$idAbmAdminLocales=$_POST['idAbmAdminLocales'];
    $idAbmAdminLocales = utf8_decode($idAbmAdminLocales);
	$idlocalFK=$_POST['idlocalFK'];
    $idlocalFK = utf8_decode($idlocalFK);

	checkearAdminLocalLocales($idAbmAdminLocales,$idlocalFK);

}

if($operacion=="eliminarRelacionAdminLocales")
{
	
	
	$idAbmAdminLocales=$_POST['idAbmAdminLocales'];
    $idAbmAdminLocales = utf8_decode($idAbmAdminLocales);
	$idlocalFK=$_POST['idlocalFK'];
    $idlocalFK = utf8_decode($idlocalFK);

	eliminarRelacionAdminLocales($idAbmAdminLocales,$idlocalFK);

}

if($operacion=="buscarAdminLocalLocales")
{
	$idAbmAdminLocales=$_POST['idAbmAdminLocales'];
	$idAbmAdminLocales = utf8_decode($idAbmAdminLocales);
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarAdminLocalLocales($idAbmAdminLocales,$formato);

}	

if( $operacion=="EditarDetalleVendedor")
{
		
	$idDV=$_POST['idDV'];
    $idDV = utf8_decode($idDV);
	$accion=$_POST['accion'];
    $accion = utf8_decode($accion);    
	EditarDetalleVendedor($idDV,$accion);

}

if($operacion=="NuevoSectorVendedor")
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

	NuevoSectorVendedor($descripcion);

}	

if($operacion=="buscarSectorVendedorOption")
{

	buscarSectorVendedorOption();

}

if($operacion=="buscar")
{
	$codigo=$_POST['codigo'];
$codigo = utf8_decode($codigo);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);


buscar($codigo,$descripcion,$estado);
}	
if($operacion=="buscarselect")
{
buscarselect();
}

if($operacion=="buscarselectsolovendedor")
{
buscarselectsolovendedor();
}	
if($operacion=="buscarvista")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
	$codlocal=$_POST['codlocal'];
$codlocal = utf8_decode($codlocal);


if($codlocal==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$codlocal=buscarlocaluser($user);
	}
	

}
	buscarvista($buscar,$codlocal);

}

if( $operacion=="editarAcceso")
{
	
	
	$idMetas=$_POST['idMetas'];
    $idMetas = utf8_decode($idMetas);
	$nro=$_POST['nro'];
    $nro = utf8_decode($nro);    
	abmAccesoMetas($nro,$idMetas,$operacion);

}

if($operacion=="buscarVendedor")
{
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
	buscarLoteamientoVendedor($cod_local);

}	



if($operacion=="buscarMetas")
{
	$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
	$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);

$sector=$_POST['sector'];
$sector = utf8_decode($sector);

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$nombre_vendedor=$_POST['nombre_vendedor'];
$nombre_vendedor = utf8_decode($nombre_vendedor);
buscarMetas($fecha1,$fecha2,$local,$sector,$tipo,$nombre_vendedor);

}

}

function abm($descripcion,$estado,$idadmin_local,$operacion,$telefono,$direccion,$ciudad)
{
	
	
if($descripcion==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();


if($operacion=="nuevo")
	{
				$consulta= "Select count(*) from admin_local where descripcion=? and estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $descripcion); 


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

$result = $stmt->get_result();
$nro_total=$result->fetch_row();
 $valor=$nro_total[0];
if($valor >= 1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}





if($operacion=="nuevo")
{
	
$consulta1="Insert into admin_local (descripcion,estado)
values(?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$descripcion,$estado);


}


if($operacion=="editar")
{

$consulta1="Update admin_local set descripcion=?,estado=? where idadmin_local=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$descripcion,$estado,$idadmin_local); 

}




if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;
}

if($operacion=="nuevo"){
	$idadmin_local=mysqli_insert_id($mysqli);
}

if(guardarDatosContactoLocal($mysqli,$idadmin_local,$descripcion,$estado,$telefono,$direccion,$ciudad)==false){
	$informacion =array("1" => "ERRORLOCAL");
	echo json_encode($informacion);
	exit;
}

$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function asegurarCamposContactoLocal($mysqli)
{
	if(asegurarColumnaLocal($mysqli,"telefono","varchar(100) DEFAULT NULL")==false){
		return false;
	}

	if(asegurarColumnaLocal($mysqli,"direccion","varchar(255) DEFAULT NULL")==false){
		return false;
	}

	if(asegurarColumnaLocal($mysqli,"ciudad","varchar(100) DEFAULT NULL")==false){
		return false;
	}

	return true;
}

function asegurarColumnaLocal($mysqli,$columna,$definicion)
{
	$consulta="SHOW COLUMNS FROM `local` LIKE '".$columna."'";
	$stmt = $mysqli->prepare($consulta);

	if(!$stmt || !$stmt->execute()){
		return false;
	}

	$result = $stmt->get_result();

	if(mysqli_num_rows($result)>0){
		return true;
	}

	$consulta="ALTER TABLE `local` ADD COLUMN `".$columna."` ".$definicion;
	$stmt = $mysqli->prepare($consulta);

	if(!$stmt || !$stmt->execute()){
		return false;
	}

	return true;
}

function guardarDatosContactoLocal($mysqli,$cod_local,$nombre,$estado,$telefono,$direccion,$ciudad)
{
	if($cod_local==""){
		return true;
	}

	if(asegurarCamposContactoLocal($mysqli)==false){
		return false;
	}

	$consulta="Select cod_local from `local` where cod_local=? limit 1";
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt){
		return false;
	}
	$ss='s';
	$stmt->bind_param($ss,$cod_local);

	if(!$stmt->execute()){
		return false;
	}

	$result = $stmt->get_result();

	if(mysqli_num_rows($result)>0){
		$consulta="Update `local` set telefono=?, direccion=?, ciudad=? where cod_local=?";
		$stmt1 = $mysqli->prepare($consulta);
		if(!$stmt1){
			return false;
		}
		$ssss='ssss';
		$stmt1->bind_param($ssss,$telefono,$direccion,$ciudad,$cod_local);
	}else{
		$consulta="Insert into `local` (cod_local,Nombre,estado,telefono,direccion,ciudad) values (?,?,?,?,?,?)";
		$stmt1 = $mysqli->prepare($consulta);
		if(!$stmt1){
			return false;
		}
		$ssssss='ssssss';
		$stmt1->bind_param($ssssss,$cod_local,$nombre,$estado,$telefono,$direccion,$ciudad);
	}

	if(!$stmt1->execute()){
		return false;
	}

	return true;
}

function sincronizarAdminLocalesDesdeLocales($mysqli)
{
	$consulta="Select lo.cod_local, lo.Nombre, lo.estado
		from `local` lo
		left join admin_local al on al.idadmin_local=lo.cod_local
		where al.idadmin_local is null";
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt || !$stmt->execute()){
		return false;
	}

	$result = $stmt->get_result();
	$locales=array();

	while($valor=mysqli_fetch_assoc($result)){
		$locales[]=$valor;
	}

	while($valor=array_shift($locales)){
		$cod_local=$valor['cod_local'];
		$nombre=$valor['Nombre'];
		$estado=$valor['estado'];

		if($nombre==""){
			$nombre="LOCAL ".$cod_local;
		}
		if($estado==""){
			$estado="Activo";
		}

		$consultaInsert="Insert into admin_local (idadmin_local,descripcion,estado) values (?,?,?)";
		$stmtInsert = $mysqli->prepare($consultaInsert);
		if(!$stmtInsert){
			return false;
		}
		$sss='sss';
		$stmtInsert->bind_param($sss,$cod_local,$nombre,$estado);
		if(!$stmtInsert->execute()){
			return false;
		}

		if(asegurarRelacionAdminLocalBase($mysqli,$cod_local,$cod_local)==false){
			return false;
		}
	}

	return true;
}

function asegurarRelacionAdminLocalBase($mysqli,$idadmin_localFK,$cod_localFK)
{
	$consulta="Select count(iddetalle_admin_local) as cantidad
		from detalle_admin_local
		where idadmin_localFK=? and cod_localFK=?";
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt){
		return false;
	}
	$ss='ss';
	$stmt->bind_param($ss,$idadmin_localFK,$cod_localFK);
	if(!$stmt->execute()){
		return false;
	}

	$result = $stmt->get_result();
	$nro_total=$result->fetch_assoc();
	if($nro_total && $nro_total['cantidad']>0){
		return true;
	}

	$consultaInsert="Insert into detalle_admin_local (idadmin_localFK,cod_localFK) values (?,?)";
	$stmtInsert = $mysqli->prepare($consultaInsert);
	if(!$stmtInsert){
		return false;
	}
	$stmtInsert->bind_param($ss,$idadmin_localFK,$cod_localFK);
	return $stmtInsert->execute();
}

function actualizarDatosEmpresa($nombre,$ruc,$telefono,$logo_color,$logo_impreso,$ruc_original)
{
	if($nombre=="" || $ruc==""){
		$informacion =array("1" => "CAMPOSVACIOS");
		echo json_encode($informacion);
		exit;
	}

	$mysqli=conectar_al_servidor();

	if(asegurarDatosEmpresaRucPrimaryKey($mysqli)==false){
		mysqli_close($mysqli);
		$informacion =array("1" => "RUCPK");
		echo json_encode($informacion);
		exit;
	}

	actualizarDatosEmpresaPorRuc($mysqli,$nombre,$ruc,$telefono,$ruc_original,$logo_color,$logo_impreso);
}

function asegurarDatosEmpresaRucPrimaryKey($mysqli)
{
	$consulta="CREATE TABLE IF NOT EXISTS `datos_empresa` (
		`ruc` varchar(100) NOT NULL,
		`nombre` varchar(100) DEFAULT NULL,
		`telefono` varchar(100) DEFAULT NULL,
		PRIMARY KEY (`ruc`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1";
	if(ejecutarConsultaDatosEmpresa($mysqli,$consulta)==false){
		return false;
	}

	if(columnaDatosEmpresaExiste($mysqli,"ruc")==false){
		if(ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` ADD COLUMN `ruc` varchar(100) NOT NULL")==false){
			return false;
		}
	}

	if(columnaDatosEmpresaExiste($mysqli,"nombre")==false){
		if(ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` ADD COLUMN `nombre` varchar(100) DEFAULT NULL")==false){
			return false;
		}
	}

	if(columnaDatosEmpresaExiste($mysqli,"telefono")==false){
		if(ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` ADD COLUMN `telefono` varchar(100) DEFAULT NULL")==false){
			return false;
		}
	}

	$totalVacios=contarConsultaDatosEmpresa($mysqli,"SELECT COUNT(*) FROM `datos_empresa` WHERE `ruc` IS NULL OR TRIM(`ruc`)=''");
	if($totalVacios<0 || $totalVacios>0){
		return false;
	}

	$totalDuplicados=contarConsultaDatosEmpresa($mysqli,"SELECT COUNT(*) FROM (SELECT `ruc` FROM `datos_empresa` GROUP BY `ruc` HAVING COUNT(*)>1) gv_duplicados");
	if($totalDuplicados<0 || $totalDuplicados>0){
		return false;
	}

	if(datosEmpresaRucEsPrimaryKey($mysqli)){
		return eliminarIdDatosEmpresaSiExiste($mysqli);
	}

	if(quitarAutoIncrementDatosEmpresa($mysqli)==false){
		return false;
	}

	if(datosEmpresaTienePrimaryKey($mysqli)){
		if(ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` DROP PRIMARY KEY")==false){
			return false;
		}
	}

	if(ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` MODIFY `ruc` varchar(100) NOT NULL")==false){
		return false;
	}

	if(datosEmpresaRucEsPrimaryKey($mysqli)){
		return eliminarIdDatosEmpresaSiExiste($mysqli);
	}

	if(ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` ADD PRIMARY KEY (`ruc`)")==false){
		return false;
	}

	return eliminarIdDatosEmpresaSiExiste($mysqli);
}

function ejecutarConsultaDatosEmpresa($mysqli,$consulta)
{
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt || !$stmt->execute()){
		return false;
	}
	return true;
}

function contarConsultaDatosEmpresa($mysqli,$consulta)
{
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt || !$stmt->execute()){
		return -1;
	}
	$result = $stmt->get_result();
	if(!$result){
		return -1;
	}
	$fila=$result->fetch_row();
	return intval($fila[0]);
}

function columnaDatosEmpresaExiste($mysqli,$columna)
{
	$columna=mysqli_real_escape_string($mysqli,$columna);
	$consulta="SHOW COLUMNS FROM `datos_empresa` LIKE '".$columna."'";
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt || !$stmt->execute()){
		return false;
	}
	$result = $stmt->get_result();
	return mysqli_num_rows($result)>0;
}

function datosEmpresaTienePrimaryKey($mysqli)
{
	$total=contarConsultaDatosEmpresa($mysqli,"SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='datos_empresa' AND CONSTRAINT_NAME='PRIMARY'");
	return $total>0;
}

function datosEmpresaRucEsPrimaryKey($mysqli)
{
	$total=contarConsultaDatosEmpresa($mysqli,"SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='datos_empresa' AND CONSTRAINT_NAME='PRIMARY'");
	if($total!=1){
		return false;
	}

	$totalRuc=contarConsultaDatosEmpresa($mysqli,"SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='datos_empresa' AND CONSTRAINT_NAME='PRIMARY' AND COLUMN_NAME='ruc'");
	return $totalRuc==1;
}

function eliminarIdDatosEmpresaSiExiste($mysqli)
{
	if(columnaDatosEmpresaExiste($mysqli,"iddatos_empresa")==false){
		return true;
	}

	return ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` DROP COLUMN `iddatos_empresa`");
}

function quitarAutoIncrementDatosEmpresa($mysqli)
{
	$consulta="SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='datos_empresa' AND EXTRA LIKE '%auto_increment%'";
	$stmt = $mysqli->prepare($consulta);
	if(!$stmt || !$stmt->execute()){
		return false;
	}

	$result = $stmt->get_result();
	while($valor= mysqli_fetch_assoc($result)){
		$columna=$valor['COLUMN_NAME'];
		$tipo=$valor['COLUMN_TYPE'];
		$nullable=$valor['IS_NULLABLE']=="YES" ? "NULL" : "NOT NULL";

		if(ejecutarConsultaDatosEmpresa($mysqli,"ALTER TABLE `datos_empresa` MODIFY `".$columna."` ".$tipo." ".$nullable)==false){
			return false;
		}
	}

	return true;
}

function actualizarDatosEmpresaPorRuc($mysqli,$nombre,$ruc,$telefono,$ruc_original,$logo_color,$logo_impreso)
{
	$cambiar_ruc=($ruc_original!="" && $ruc_original!=$ruc);

	if($cambiar_ruc){
		$sql="Select ruc from datos_empresa where ruc=? limit 1";
		$stmt = $mysqli->prepare($sql);
		if(!$stmt){
			echo "Error";
			exit;
		}
		$ss='s';
		$stmt->bind_param($ss,$ruc);

		if ( ! $stmt->execute()) {
		   echo "Error";
		   exit;
		}

		$result = $stmt->get_result();
		if(mysqli_num_rows($result)>0){
			mysqli_close($mysqli);
			$informacion =array("1" => "EX");
			echo json_encode($informacion);
			exit;
		}
	}

	if(!guardarLogosInformEmpresa($logo_color,$logo_impreso)){
		mysqli_close($mysqli);
		$informacion =array("1" => "IMG");
		echo json_encode($informacion);
		exit;
	}

	if($cambiar_ruc){
		$consulta="Update datos_empresa set ruc=?, nombre=?, telefono=? where ruc=?";
		$stmt1 = $mysqli->prepare($consulta);
		if(!$stmt1){
			echo "Error";
			exit;
		}
		$ssss='ssss';
		$stmt1->bind_param($ssss,$ruc,$nombre,$telefono,$ruc_original);
	}else{
		$sql="Select ruc from datos_empresa where ruc=? limit 1";
		$stmt = $mysqli->prepare($sql);
		if(!$stmt){
			echo "Error";
			exit;
		}
		$ss='s';
		$stmt->bind_param($ss,$ruc);

		if ( ! $stmt->execute()) {
		   echo "Error";
		   exit;
		}

		$result = $stmt->get_result();
		if(mysqli_num_rows($result)>0){
			$consulta="Update datos_empresa set nombre=?, telefono=? where ruc=?";
			$stmt1 = $mysqli->prepare($consulta);
			if(!$stmt1){
				echo "Error";
				exit;
			}
			$sss='sss';
			$stmt1->bind_param($sss,$nombre,$telefono,$ruc);
		}else{
			$consulta="Insert into datos_empresa (ruc,nombre,telefono) values (?,?,?)";
			$stmt1 = $mysqli->prepare($consulta);
			if(!$stmt1){
				echo "Error";
				exit;
			}
			$sss='sss';
			$stmt1->bind_param($sss,$ruc,$nombre,$telefono);
		}
	}

	if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
	}

	mysqli_close($mysqli);
	$informacion =array("1" => "exito");
	echo json_encode($informacion);
	exit;
}

function guardarLogosInformEmpresa($logo_color,$logo_impreso)
{
	if($logo_color!="" && guardarLogoInformEmpresa($logo_color,"logo.png")==false){
		return false;
	}

	if($logo_impreso!="" && guardarLogoInformEmpresa($logo_impreso,"logo_impreso.png")==false){
		return false;
	}

	return true;
}

function guardarLogoInformEmpresa($dataUrl,$nombreArchivo)
{
	$partes = explode(",",$dataUrl,2);

	if(count($partes)!=2){
		return false;
	}

	$encabezado=strtolower($partes[0]);

	if(strpos($encabezado,"data:image/png;base64")!==0){
		return false;
	}

	$imagen=base64_decode($partes[1],true);

	if($imagen===false){
		return false;
	}

	if(strlen($imagen)>6291456){
		return false;
	}

	if(substr($imagen,0,8)!="\x89PNG\r\n\x1a\n"){
		return false;
	}

	$directorio=dirname(__DIR__)."/iconos/";

	if(!is_dir($directorio)){
		if(!mkdir($directorio,0777,true)){
			return false;
		}
	}

	$ruta=$directorio.$nombreArchivo;

	return file_put_contents($ruta,$imagen)!==false;
}



function obtenerUltimaId()
{
	$idvendedor ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select idvendedor from vendedor where estado='Activo'  order by idvendedor desc limit 1";
	
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
		      $idvendedor=$valor['idvendedor'];	  	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $idvendedor;
}




function cargarFotos($cod_persona){
	
$extperfilVendedor=$_POST['extperfilVendedor'];
$extperfilVendedor = utf8_decode($extperfilVendedor);

if($extperfilVendedor!=""){
	$fotoperfilVendedor=substr($_POST['fotoperfilVendedor'], strpos($_POST['fotoperfilVendedor'], ",") + 1);;
$fotoperfilVendedor = base64_decode($fotoperfilVendedor);
$id_foto="";		  
		     $donde="../fotos/fotoPerfil/";
			  $id_foto=$cod_persona;
                $id_f=subir_imagen_base64($donde,$fotoperfilVendedor,$id_foto,$extperfilVendedor);
$ruta="/GoodVentaElectroCasaMaric/fotos/fotoPerfil/".$cod_persona.$id_f.'.'.$extperfilVendedor;
CargaFoto($ruta,$cod_persona);
}


}

function CargaFoto($Urlfoto,$cod_cliente){
	$mysqli=conectar_al_servidor();
	$consulta="Update vendedor set url=? where idvendedor=? ";	

	$stmt = $mysqli->prepare($consulta);
$ss='ss';
$stmt->bind_param($ss,$Urlfoto,$cod_cliente); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
	 mysqli_close($mysqli);
}






function buscar($codigo,$descripcion,$estado)
{
	$mysqli=conectar_al_servidor();
	if(asegurarCamposContactoLocal($mysqli)==false){
		$informacion =array("1" => "ERRORLOCAL");
		echo json_encode($informacion);
		exit;
	}
	if(sincronizarAdminLocalesDesdeLocales($mysqli)==false){
		$informacion =array("1" => "ERRORLOCAL");
		echo json_encode($informacion);
		exit;
	}
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$condicioncodigo="";
if($codigo!=""){
	$condicioncodigo=" and al.idadmin_local ='".$codigo."'";
}

$condiciondescripcion="";
if($descripcion!=""){
	$condiciondescripcion=" and al.descripcion  like '%".$descripcion."%'";
}
	 
		$sql= "Select al.idadmin_local, al.descripcion, al.estado,
		IFNULL(lo.telefono,'') as telefono, IFNULL(lo.direccion,'') as direccion, IFNULL(lo.ciudad,'') as ciudad
		from admin_local al
		left join `local` lo on lo.cod_local=al.idadmin_local
		where al.estado=? ".$condicioncodigo.$condiciondescripcion;
		
   
   
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
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idadmin_local=$valor['idadmin_local'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	 
		  	  $estado=utf8_encode($valor['estado']);
			  $telefono=utf8_encode($valor['telefono']);
			  $direccion=utf8_encode($valor['direccion']);
			  $ciudad=utf8_encode($valor['ciudad']);
			  $filas[]=array(
				  "codigo" => $idadmin_local,
				  "descripcion" => $descripcion,
				  "estado" => $estado,
				  "telefono" => $telefono,
				  "direccion" => $direccion,
				  "ciudad" => $ciudad
			  );
		  	
		  	 
		  	 
			if($formato !== "json") {
		  	  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmAdminLocales(this)'>
<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$idadmin_local."</td>
<td  id='td_datos_1' style='width:90%'>".$descripcion."</td>
<td  id='td_datos_3' style='display:none'>".$estado."</td>
<td  id='td_datos_4' style='display:none'>".$telefono."</td>
<td  id='td_datos_5' style='display:none'>".$direccion."</td>
<td  id='td_datos_6' style='display:none'>".$ciudad."</td>
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

function buscarselect()
{
	$mysqli=conectar_al_servidor();
	if(sincronizarAdminLocalesDesdeLocales($mysqli)==false){
		$informacion =array("1" => "ERRORLOCAL");
		echo json_encode($informacion);
		exit;
	}
	$pagina='';
	$pagina.="<option  value='' >SELECCIONAR</option>";   
	$sql= "Select idadmin_local, descripcion from admin_local where estado='Activo' ";	   
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
		  
		  
		      $idadmin_local=$valor['idadmin_local'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	 
		  	 
			    	 
		  	  $pagina.="<option  value='$idadmin_local' >".$descripcion."</option>";   
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}
function buscarselectsolovendedor()
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$pagina.="<option  value='' >SELECCIONAR</option>";   
	$sql= "select (SELECT nombre from vendedor where idvendedor = Vendedor1 and estado = 'Activo') as nombre,Vendedor1 from venta group by nombre order by nombre";	   
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
		  
		  
		      $idvendedor=$valor['Vendedor1'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	 
		  	 
			    	 if($nombre != ''){
						 $pagina.="<option  value='$idvendedor' >".$nombre."</option>";   
					 }
		  	  
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}

function buscarvista($buscar,$codlocal)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
$condicionlocal="";
if($codlocal!=""){
	$condicionlocal=" and (v.cod_localfk = '".$codlocal."' or dt.cod_localFK = '".$codlocal."')";
}
		$sql= "Select v.idvendedor, v.nombre, v.nrotelef, v.estado
		from vendedor v
		left join detallevendedor dt on dt.cod_vendedorFK = v.idvendedor and dt.accion='SI'
		where v.nombre like ?  and v.estado='Activo' ".$condicionlocal."
		group by v.idvendedor, v.nombre, v.nrotelef, v.estado
		order by v.nombre asc ";
		
   // echo($sql);
   // exit;
   
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
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  $idvendedor=$valor['idvendedor'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $nrotelef=utf8_encode($valor['nrotelef']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	 
		  	  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' onclick='obtenerdatosvistavendedor(this)'>
<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$idvendedor."</td>
<td  id='td_datos_1' style='width:45%'>".$nombre."</td>
<td  id='td_datos_2' style='width:45%'>".$nrotelef."</td>
<td  id='td_datos_3' style='display:none'>".$estado."</td>
</tr>
</table>";
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}




function buscarLoteamientoVendedor($cod_local)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	

$condicionlocal="";
if($cod_local!=""){
	$condicionlocal=" and (v.cod_localfk = '".$cod_local."' or dt.cod_localFK = '".$cod_local."')";
}
	 
		$sql= "Select v.idvendedor, v.nombre, v.nrotelef, v.estado, v.cod_localfk,
		IFNULL((select Nombre from local where cod_local=v.cod_localfk limit 1 ),'') as local
		from vendedor v
		left join detallevendedor dt on dt.cod_vendedorFK = v.idvendedor and dt.accion='SI'
		where v.estado!='' ".$condicionlocal."
		group by v.idvendedor, v.nombre, v.nrotelef, v.estado, v.cod_localfk
		order by v.nombre asc";
		
 
   
   $stmt = $mysqli->prepare($sql);
  	
 $styleName="tableRegistroSearch";
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
		  
		  
		  
		      $idvendedor=$valor['idvendedor'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
			 
			  $AccionContador=buscarAccionContador($idvendedor);
			  if($AccionContador=="0"){
				  abmAccesoMetasPHP($idvendedor,"0","nuevoAcceso");
			  }
			   $Accion=buscarAccion($idvendedor);
		  	 $NroMetas=$Accion[0];
			 $NroMetas=number_format($NroMetas,'0',',','.');
			 $idMetas=$Accion[1];
			 $Style="style=' text-align: center;
				background-color: cadetblue;
				color: white;'";
				$inputcheck="<input  name='".$idMetas."' class='inputText' $Style value='$NroMetas'  type='text' onkeyup='separadordemiles(this); if(event.keyCode == 13){abmaccesoMetas(this)}'  />";
			  $styleName=CargarStyleTable($styleName);
			 	 
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
			  <tr id='tbSelecRegistro' '>
			  <td id='td_id' style='width:5%'>".$idvendedor."</td>
			  <td id='td_datos_1'style='width:70%' class='tdRegistroSearch' >".$nombre."</td>
			   <td  id='td_datos_2' style='width:25%'>".$inputcheck."</td>
			  </tr>
			  </table>";
			    	 
		  	
			  
			  
	  }
 }
 
 
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}




function buscarAccion($idAbm)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select idMetas, nro, Estado, Cod_vendedorFK
        from metas where idMetas='".$idAbm."' limit 1 ";
		

   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$accion="NO";
$idDetalleZona=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $nro="0";
 $idMetas = '0';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $nro=$valor['nro']; 
			  $idMetas=$valor['idMetas']; 			  
	  }
 }
 $Resultado[0]= $nro;
 $Resultado[1]= $idMetas;

 return $Resultado;	



}



function buscarAccionContador($Vendedor)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select count(*) as zona  
        from metas where Cod_vendedorFK='".$Vendedor."'   limit 1 ";
		
		
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$accion=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $accion=$valor['zona']; 			  
	  }
 }

 return $accion;	

}


function abmAccesoMetas($nro,$idMetas,$funt)
{
	
	$mysqli=conectar_al_servidor();

	if($funt=="editarAcceso")
	{
               
    $consulta="update metas set nro='".$nro."' where  idMetas='".$idMetas."' ";	

	$stmt = $mysqli->prepare($consulta);
       

	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
}



function abmAccesoMetasPHP($Cod_vendedorFK,$nro,$funt)
{
	
	$mysqli=conectar_al_servidor();


	if($funt=="nuevoAcceso")
	{
	   
    $consulta="insert into metas (  Cod_vendedorFK, nro, Estado) values (?,?,'Activo')";	
     $stmt = $mysqli->prepare($consulta);
    $ss='ss';
    $stmt->bind_param($ss,$Cod_vendedorFK,$nro); 
        
 	}

	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


	
}






function buscarMetas($fecha1,$fecha2,$codlocal,$sector,$tipo,$nombre_vendedor)
{
	
	$mysqli=conectar_al_servidor();
	$condicionNroCompra="";
	 $pagina="";
	

	$fechames1 = $fecha1; 
	$fechames1 = new DateTime($fechames1); 
	$fechames1 = $fechames1->format('Y-m');
	
	$fechames2 =  $fecha2; 
	$fechames2 = new DateTime($fechames2); 
	$fechames2 = $fechames2->format('Y-m');
	
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(fecha, '%Y-%m') between  '$fechames1' and '$fechames2' ";
}
	
	$condicionLocal="";
	if($codlocal!=""){
		$condicionLocal=" and cod_localfk='$codlocal' ";
	}
	$condicionsector="";
	if($sector!=""){
		$condicionsector=" and sector='$sector' ";
	}
	
	$condicionnombrevendedor="";
	if($nombre_vendedor!=""){
		$condicionnombrevendedor=" and nombre='$nombre_vendedor' ";
	}
	
	
		$sql= "Select idvendedor, nombre, nrotelef,  cod_localfk,url,m.fecha,m.nro,m.idMetas,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local , DATE_FORMAT(fecha, '%Y-%m') as mes , m.Estado,
		(((select ifnull(sum(total_venta),0) from venta vt where Vendedor1=cod_vendedorFK and DATE_FORMAT(fecha_venta, '%Y-%m') between  '$fechames1' and '$fechames2'  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ) *100 ) / m.nro ) as TotalVenta
		from metas  m
		inner join vendedor ve on ve.idvendedor = m.cod_vendedorFK
		where ve.estado='activo' and m.Estado='Activo' ".$condicionFecha.$condicionLocal.$condicionsector.$condicionnombrevendedor."   group by idMetas asc order by mes asc , TotalVenta desc  ";
	  	  

		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalVentaResultado  = 0;
 $totalMetas  = 0;
 $TotalVenta2  = 0;
 $nroRegistro= $valor;
 $Porcentaje=0;
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idvendedor=$valor['idvendedor'];
		      $nombre=utf8_encode($valor['nombre']);
		  	  $nrotelef=utf8_encode($valor['nrotelef']);
		  	  $local=utf8_encode($valor['local']);
		  	  $url_img=utf8_encode($valor['url']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $monto=utf8_encode($valor['nro']);
		  	  $idAbm=utf8_encode($valor['idMetas']);
		  	  $mes=utf8_encode($valor['mes']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	  $TotalVenta=utf8_encode($valor['TotalVenta']);
		  	   


			  
			 $Accion=buscarAccion($idAbm);
		  	 $NroMetas=$Accion[0];
			 $NroMetas2=$Accion[0];
			 $totalMetas= $totalMetas + $NroMetas;
			 $NroMetas=number_format($NroMetas,'0',',','.');
			 
			 $totalVentas =buscarTotalVentaVendedor($idvendedor,$mes,$codlocal,$tipo,$fecha1,$fecha2);
			 $puntos =buscarTotalPuntos($idvendedor,$mes,$codlocal,$tipo,$fecha1,$fecha2);

		  	 $TotalVenta2=$TotalVenta2 + $totalVentas;
			 
			 if($NroMetas2==0 || $NroMetas2==""){
				 $NroMetas2=1;
			 }
			 
			 
			$pnt="";
if($puntos!='0'){	
	$pnt=" <h2 style='position: absolute; top: 10px; right: 10px; background-color: #f44336; color: white; margin: 0; padding: 5px 10px; border-radius: 5px;'> ".$puntos." pts</h2> ";
}
			
			 $Resultado1= ($totalVentas * 100 ) / $NroMetas2;
				
 
				
				$pagina.="<div class='' style='height: 450px; border: 3px solid #dddddd;  background:#dddddd; border-radius: 5px;   display: flex; justify-content: center; align-items: center; '  id='".$fecha."' url='$Estado'  onclick='obtenerdatosvistaventaMetasVendedor(this,$monto,".$fecha.",".$idvendedor.",".$idAbm.")'>
      <div class='ContenedorDetalleCatalogo'  > $pnt
				<h1 style='font-size: 14px;' >".$nombre." - ".$mes."</h1>
			<div class=' '><img src='".$url_img."' style='width: 70%;margin-top: 5px; '></div>
				<div class='card_content' style='width: 100%;height: 45%;    background-color:#f5f5f5' >
				  
						<div class='info'> 
                            <h1  >".number_format($totalVentas,'0',',','.')." Gs.</h1>
                            <h4  >Meta: </h4>
							<h4  > ".number_format($NroMetas2,'0',',','.')." Gs.</h4>
                        </div>
						<center>
						<div class='progresss' style='width: 35%;'  > 
							   <div role='progressbar'  aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='--value: ".round($Resultado1)." ;width: 100%;'></div> 
                        </div>
						</center>
				</div>
			</div>
    </div> ";
		
			  
			  
	  }
	   $Porcentaje= ($TotalVenta2 * 100 ) / $totalMetas;
 }
 
  

  
$informacion =array("1" => "exito","2" => $pagina ,"3"=> number_format($nroRegistro,'0',',','.'),"4"=> number_format($TotalVenta2,'0',',','.'),"5"=> number_format($totalMetas,'0',',','.'),"6"=> number_format($Porcentaje,'0',',','.'));
echo json_encode($informacion);	
exit;
}


function buscarTotalVentaVendedor($Vendedor,$fecha,$local,$tipo,$fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$condicionLocal="";
	if($local!=""){
		$condicionLocal=" and  vt.cod_local='$local' ";
	}
	
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and  fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
	$condiciontipo="";
	if($tipo!=""){
		$condiciontipo=" and  vt.TipoVenta='$tipo' ";
	}
	
		$sql= "Select ifnull(sum(total_venta),0) as total_venta  
        from venta vt where  Vendedor1='".$Vendedor."' ".$condicionfecha.$condicionLocal.$condiciontipo."   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   limit 1 ";
		
		// echo($sql);
		// exit;
	
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$total_venta=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $total_venta=$valor['total_venta']; 			  
	  }
 }

 return $total_venta;	

}





function buscarTotalVentaVendedorCredito($Vendedor,$fecha1,$fecha2,$local)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$condicionLocal="";
	if($local!=""){
		$condicionLocal=" and  vt.cod_local='$local' ";
	}
	
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
		$sql= "Select sum(total_venta) as total_venta  
        from venta vt where  vt.TipoVenta='CREDITO'  and Vendedor1='".$Vendedor."' ".$condicionfecha.$condicionLocal."   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   limit 1 ";
	
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$total_venta=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $total_venta=$valor['total_venta']; 			  
	  }
 }

 return $total_venta;	

}


function buscarTotalVentaVendedorContado($Vendedor,$fecha1,$fecha2,$local)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
		$condicionLocal="";
	if($local!=""){
		$condicionLocal=" and  vt.cod_local='$local' ";
	}
	
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
		$sql= "Select sum(total_venta) as total_venta  
        from venta vt where  vt.TipoVenta='CONTADO'  and Vendedor1='".$Vendedor."' ".$condicionfecha.$condicionLocal."   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   limit 1 ";
	
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$total_venta=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $total_venta=$valor['total_venta']; 			  
	  }
 }

 return $total_venta;	

}




function buscarTotalVenta($fecha1,$fecha2,$local)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
		$condicionLocal="";
	if($local!=""){
		$condicionLocal=" and  vt.cod_local='$local' ";
	}
	
		$sql= "Select sum(total_venta) as total_venta  
        from venta vt where  IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0    ".$condicionLocal.$condicionfecha."   limit 1 ";
	
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$total_venta=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $total_venta=$valor['total_venta']; 			  
	  }
 }

 return $total_venta;	

}
function buscarAdminLocalLocales($idAbmAdminLocales,$formato='')
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$filas=array();
	
	$sql= " select *  from local  where estado='Activo' ";
	
	
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
			  $cod_local=$valor['cod_local'];
		  	  $nombre=utf8_encode($valor['Nombre']);
		  	 
		  	 
			 $control = verificar_relacion($idAbmAdminLocales,$cod_local);
			 $filas[]=array(
				 'codigo'=>$cod_local,
				 'local'=>$nombre,
				 'asignado'=>$control ? true : false
			 );
			  
			  $check = "<input type='checkbox' onclick='AbmVerificarRelacionAdminLocales(this)' id='".$cod_local."'>";
			  
			  if($control){
				$check = "<input type='checkbox' onclick='EliminarRelacionAdminLocales(this)' id='".$cod_local."' checked>";
			  }
			 
			 $styleName=CargarStyleTable($styleName);
			    	 
		  	  $pagina.="
					<table class='$styleName' border='0' cellspacing='0' cellpadding='0'>
					<tr id='tbSelecRegistro' >
					
					<td  id='' style='width:5%'>".$cod_local."</td>
					<td  id='td_datos_1' style='width:70%'>".$nombre."</td>
					<td style='width:25%'>".$check."</td>
					</tr>
					</table>";
			  
			  
	  }
 }
 
 



/*Retornamos los datos obtenidos mediante el JSON */      
$resultado=($formato==='json') ? $filas : $pagina;
$informacion =array("1" => "exito","2" => $resultado);
echo json_encode($informacion);	
exit;


}

function verificar_relacion($idadmin_localFK,$cod_localFK)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select count(iddetalle_admin_local) as cantidad
        from detalle_admin_local where idadmin_localFK = '$idadmin_localFK' and cod_localFK = '$cod_localFK' ";
   
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

function EditarDetalleVendedor($idDV,$accion)
{
	
	$mysqli=conectar_al_servidor();

	
               
    $consulta="update detallevendedor set accion='".$accion."' where  iddetallevendedor='".$idDV."' ";

// echo($consulta);
// exit;	

	$stmt = $mysqli->prepare($consulta);
       

	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
}


function NuevoSectorVendedor($concepto)
{
	
if($concepto==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into sector_vendedor (descripcion,estado) values (upper(?),'Activo')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='s';
$stmt1->bind_param($ss,$concepto);

if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}



function buscarSectorVendedorOption()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from sector_vendedor where estado='Activo' ";
		
		
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
		  
		  
		      $idsector_vendedor=$valor['idsector_vendedor'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$descripcion' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}


function abm_metas($estado,$idAbmMetaVendedor,$monto,$fecha,$vendedor ,$operacion)
{
	
	
if($monto=="" || $vendedor =="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

if($operacion=="nuevo_meta") 
{


$consulta1="Insert into metas (nro,fecha,cod_vendedorFK,Estado)
values(?,?,?,'ACTIVO')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$monto,$fecha,$vendedor);


}



if($operacion=="editar_meta")
{

$consulta1="Update metas set nro=?,fecha=?,cod_vendedorFK=?,Estado=? where idMetas=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$monto,$fecha,$vendedor,$estado,$idAbmMetaVendedor); 

}




if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}



function buscarTotalPuntos($Vendedor,$fecha,$local,$tipo,$fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$condicionLocal="";
	if($local!=""){
		$condicionLocal=" and  vt.cod_local='$local' ";
	}
	
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and  fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
	$condiciontipo="";
	if($tipo!=""){
		$condiciontipo=" and  vt.TipoVenta='$tipo' ";
	}
	
		$sql= "Select ifnull(sum(cantidad_detalle * ifnull((select punto  from puntos p where p.cod_productoFK=dt.cod_productoFK ),0)),0)  as puntos 
        from venta vt inner join detalle_venta dt on cod_ventaFK=cod_venta where  Vendedor1='".$Vendedor."' ".$condicionfecha.$condicionLocal.$condiciontipo."   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   limit 1 ";
		
		// echo($sql);
		// exit;
	
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$puntos=0;
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		      $puntos=$valor['puntos']; 			  
	  }
 }

 return $puntos;	

}

function checkearAdminLocalLocales($idAbmAdminLocales,$idlocalFK)
{
	
	if($idAbmAdminLocales=="" || $idlocalFK == "" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();


date_default_timezone_set('America/Anguilla');    
$fechaactual = date('Y-m-d', time()); 
	/* $fechaactual = date("Y-m-d"); */
    
    $consulta="insert into detalle_admin_local (idadmin_localFK,cod_localFK) values ('$idAbmAdminLocales','$idlocalFK')";
     

$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}
function eliminarRelacionAdminLocales($idAbmAdminLocales,$idlocalFK)
{
	
	if($idAbmAdminLocales=="" || $idlocalFK == "" ){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();


date_default_timezone_set('America/Anguilla');    
$fechaactual = date('Y-m-d', time()); 
	/* $fechaactual = date("Y-m-d"); */
    
    $consulta="DELETE FROM detalle_admin_local WHERE idadmin_localFK = '$idAbmAdminLocales' and cod_localFK = '$idlocalFK'";
     

$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
}



verificar($operacion);
?>
