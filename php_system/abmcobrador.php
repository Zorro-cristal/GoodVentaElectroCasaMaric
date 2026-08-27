<?php
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
include("classTable.php");
include('quitarseparadormiles.php');
include("subir_foto_base64.php");
include("calcularintereses.php");
include("cargar_archivo.php");

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


$telefono=$_POST['telefono'];
$telefono = utf8_decode($telefono);



$cod_cobrador=$cod_persona;

$idzona=$_POST['idzona'];
$idzona = utf8_decode($idzona);

$usu=$_POST['usu'];
$usu = utf8_decode($usu);

$con=$_POST['con'];
$con = utf8_decode($con);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$accesocliente=$_POST['accesocliente'];
$accesocliente = utf8_decode($accesocliente);

$accesoproducto=$_POST['accesoproducto'];
$accesoproducto = utf8_decode($accesoproducto);

$accesocuentas=$_POST['accesocuentas'];
$accesocuentas = utf8_decode($accesocuentas);

$modosinconexion=$_POST['modosinconexion'];
$modosinconexion = utf8_decode($modosinconexion);

$realizarcobranzas=$_POST['realizarcobranzas'];
$realizarcobranzas = utf8_decode($realizarcobranzas);

$realizarentregas=$_POST['realizarentregas'];
$realizarentregas = utf8_decode($realizarentregas);

$verificarsolicitudcredito=$_POST['verificarsolicitudcredito'];
$verificarsolicitudcredito = utf8_decode($verificarsolicitudcredito);

$accesocrearsoliticudcredito=$_POST['accesocrearsoliticudcredito'];
$accesocrearsoliticudcredito = utf8_decode($accesocrearsoliticudcredito);
$accesoagendacliente=$_POST['accesoagendacliente'];
$accesoagendacliente = utf8_decode($accesoagendacliente);
$accesocargarfotoscliente=$_POST['accesocargarfotoscliente'];
$accesocargarfotoscliente = utf8_decode($accesocargarfotoscliente);
$accesocargarpdfcliente=$_POST['accesocargarpdfcliente'];
$accesocargarpdfcliente = utf8_decode($accesocargarpdfcliente);
$accesoegresoingreso=$_POST['accesoegresoingreso'];
$accesoegresoingreso = utf8_decode($accesoegresoingreso);
$accesoubicacioncliente=$_POST['accesoubicacioncliente'];
$accesoubicacioncliente = utf8_decode($accesoubicacioncliente);
$accesometascobrador=$_POST['accesometascobrador'];
$accesometascobrador = utf8_decode($accesometascobrador);

$accesosolicituddescuentocredito=$_POST['accesosolicituddescuentocredito'];
$accesosolicituddescuentocredito = utf8_decode($accesosolicituddescuentocredito);

$cod_localFK=$_POST['cod_localFK'];
$cod_localFK = utf8_decode($cod_localFK);


 

abm($accesocliente,$accesoproducto,$accesocuentas,$modosinconexion,$realizarcobranzas,$realizarentregas,$verificarsolicitudcredito,$estado,$cod_persona,$nombre_persona,$telefono,$cod_cobrador,$idzona,$usu,$con,$cod_localFK,$operacion,$accesocrearsoliticudcredito,$accesoagendacliente,$accesocargarfotoscliente,$accesocargarpdfcliente,$accesoegresoingreso,$accesoubicacioncliente,$accesometascobrador,$accesosolicituddescuentocredito);

}


if($operacion=="buscar_opciones_filtro_cobrador_info_cobradores")
{

	buscar_opciones_filtro_cobrador_info_cobradores();

}	

	
	
	
if($operacion=="buscar_opciones_filtro_local_info_cobradores")
{

	buscar_opciones_filtro_local_info_cobradores();

}	


 if($operacion=="buscaroptioncalificacionentrega")
{
buscaroptioncalificacionentrega();
}	


 if($operacion=="nuevaTarea" )
{


$fechainicio=$_POST['fechainicio'];
$fechainicio = utf8_decode($fechainicio);

$fechafin=$_POST['fechafin'];
$fechafin = utf8_decode($fechafin);

$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);

$montoTotal=$_POST['montoTotal'];
$montoTotal = quitarseparadormiles($montoTotal);

$MontosinInteres=$_POST['MontosinInteres'];
$MontosinInteres = quitarseparadormiles($MontosinInteres);

$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$zona=$_POST['zona'];
$zona = utf8_decode($zona);



abmnuevaTarea($fechainicio,$fechafin,$nombre,$montoTotal,$MontosinInteres,$descripcion,$zona,$operacion);

}

  if($operacion=="buscarListaCLientes"){
	$cod_TareasCobrador=$_POST["cod_TareasCobrador"];
 	$cod_TareasCobrador=utf8_decode($cod_TareasCobrador);
	
	$concicion=$_POST["concicion"];
 	$concicion=utf8_decode($concicion);
	
	$Zona=$_POST["Zona"];
 	$Zona=utf8_decode($Zona);
	
	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	
 	buscarListaCLientes($cod_TareasCobrador,$concicion,$Zona,$fecha1,$fecha2);
 }

 if($operacion=="EliminarCargarCobro" )
{

$cod_TareasCobrador=$_POST['cod_TareasCobrador'];
$cod_TareasCobrador = utf8_decode($cod_TareasCobrador);

EliminarCargarCobro($cod_TareasCobrador,$operacion);

}

if($operacion=="eliminarEntregaCobrador" )
{

$iddetalleentregador_local=$_POST['iddetalleentregador_local'];
$iddetalleentregador_local = utf8_decode($iddetalleentregador_local);

eliminarEntregaCobrador($iddetalleentregador_local);

}

if($operacion=="abmentregadorlocal" )
{

$cod_Entregador=$_POST['cod_Entregador'];
$cod_Entregador = utf8_decode($cod_Entregador);

$cod_localFK=$_POST['cod_localFK'];
$cod_localFK = utf8_decode($cod_localFK);

abmentregadorlocal($cod_Entregador,$cod_localFK);

}

 if($operacion=="EditarTarea" )
{


$cod_tarea=$_POST['cod_tarea'];
$cod_tarea = utf8_decode($cod_tarea);

$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);


EditarTarea($cod_tarea,$monto,$operacion);

}

if($operacion=="buscarTareasCobrador"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$cobrador=$_POST["cobrador"];
 	$cobrador=utf8_decode($cobrador);
	
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
	$descripcion=$_POST["descripcion"];
 	$descripcion=utf8_decode($descripcion);
	$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
 	buscarTareasCobrador($descripcion,$estado,$fecha1,$fecha2,$cobrador,$formato);
 }

if($operacion=="buscarEntregadorLocales"){
 	$cod_Entregador=$_POST["cod_Entregador"];
 	$cod_Entregador=utf8_decode($cod_Entregador);
 	buscarEntregadorLocales($cod_Entregador);
 }
 
 if($operacion=="buscar"){
 	$codigo=$_POST["codigo"];
 	$codigo=utf8_decode($codigo);
	$cobrador=$_POST["cobrador"];
 	$cobrador=utf8_decode($cobrador);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
 	BuscarRegistro($codigo,$cobrador,$estado);
 }

 
 if($operacion=="buscarvista"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);
 	BuscarRegistroVista($buscar);
 }



if($operacion=="buscaroption")
{

	buscaroption($user);

}

if($operacion=="buscarCobradorSelecEntregadoRevisionDocumentos")
{

	buscarCobradorSelecEntregadoRevisionDocumentos();

}

if($operacion=="buscarCobradorSelecVendedorRevisionDocumentos")
{

	buscarCobradorSelecVendedorRevisionDocumentos();

}
if($operacion=="buscarCobradorSelecEntregadoRevisionDocumentosPagare")
{

	buscarCobradorSelecEntregadoRevisionDocumentosPagare();

}

if($operacion=="buscaroptioncobradorzona")
{
	$cod_cobrador=$_POST["cod_cobrador"];
 	$cod_cobrador=utf8_decode($cod_cobrador);
	buscaroptioncobradorzona($cod_cobrador);

}

if($operacion=="buscaroptionzona")
{

	buscaroptionzona($user);

}




if($operacion=="abmAsignarCallCenter"){ 

	$cod_usuarioCalllCenter=$_POST["cod_usuarioCalllCenter"];
 	$cod_usuarioCalllCenter=utf8_decode($cod_usuarioCalllCenter);
	
	$cod_TareasCobrador=$_POST["cod_TareasCobrador"];
 	$cod_TareasCobrador=utf8_decode($cod_TareasCobrador);
	
 	abmAsignarCallCenter($cod_usuarioCalllCenter,$cod_TareasCobrador );
 }
 
}



function abmAsignarCallCenter($cod_usuarioCalllCenter,$cod_TareasCobrador )
{

$mysqli=conectar_al_servidor();

$consulta2="update  controlcobrador set cod_callcenterFK='$cod_usuarioCalllCenter'  where cod_controlcobrador=$cod_TareasCobrador ";
$stmt2 = $mysqli->prepare($consulta2);

// echo($consulta2);
// exit;

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}




function buscaroptionzona($user)
{
	

		$sql= "Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobrador ) as nombre , cod_cobrador , estado  from cobrador where estado='Activo' and 
		(select count(*) from zona where cod_cobrador=cod_cobradorFK )>=1 order by nombre ";

	$mysqli=conectar_al_servidor();
	
		
		 $pagina= "<option  value='' >SELECCIONAR</option>";   
   
   
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
		  
		  
		      $cod_cobrador=$valor['cod_cobrador'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$cod_cobrador' >".$nombre."</option>";   
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function buscaroptioncobradorzona($cod_cobrador)
{
	$condicioncodcobrador = '';
	if($cod_cobrador!=''){
		$condicioncodcobrador = " and cod_cobradorFK = '$cod_cobrador'";
	}

		$sql= "Select * from zona where estado='Activo'".$condicioncodcobrador." order by nombre ";

	$mysqli=conectar_al_servidor();
	
		
		 $pagina= "<option  value='' >SELECCIONAR</option>";   
   
   
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
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}







function abm($accesocliente,$accesoproducto,$accesocuentas,$modosinconexion,$realizarcobranzas,$realizarentregas,$verificarsolicitudcredito,$estado,$cod_persona,$nombre_persona,$telefono,$cod_cobrador,$idzona,$usu,$con,$cod_localFK,$operacion,$accesocrearsoliticudcredito,$accesoagendacliente,$accesocargarfotoscliente,$accesocargarpdfcliente,$accesoegresoingreso,$accesoubicacioncliente,$accesometascobrador,$accesosolicituddescuentocredito)
{

if($usu==""  || $nombre_persona==""  || $con=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);
exit;
}

$mysqli=conectar_al_servidor();

if($operacion=="nuevo")
{


$consulta1="Insert into persona (nombre_persona,telefono)
values(?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$nombre_persona,$telefono);

$consulta2="Insert into cobrador (idzona,usu,cod_cobrador,con,estado,accesocliente,accesoproducto,accesocuentas,modosinconexion,realizarcobranzas,realizarentregas,verificarsolicitudcredito,cod_localFK,accesocrearsoliticudcredito,accesoagendacliente,accesocargarfotoscliente,accesocargarpdfcliente,accesoegresoingreso,accesoubicacioncliente,accesometascobrador,accesosolicituddescuentocredito)
values(?,?,(select cod_persona from persona order by cod_persona desc limit 1),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
$stmt2 = $mysqli->prepare($consulta2);
$ss='ssssssssssssssssssss';
$stmt2->bind_param($ss,$idzona,$usu,$con,$estado,$accesocliente,$accesoproducto,$accesocuentas,$modosinconexion,$realizarcobranzas,$realizarentregas,$verificarsolicitudcredito,$cod_localFK,$accesocrearsoliticudcredito,$accesoagendacliente,$accesocargarfotoscliente,$accesocargarpdfcliente,$accesoegresoingreso,$accesoubicacioncliente,$accesometascobrador,$accesosolicituddescuentocredito);

}


if($operacion=="editar")
{

$consulta1="Update persona set nombre_persona=?,telefono=? where cod_persona=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$nombre_persona,$telefono,$cod_persona); 


$consulta2="update cobrador set idzona=?,usu=?,con=?,estado=?,accesocliente=? ,accesoproducto=? ,accesocuentas=? , modosinconexion=?, realizarcobranzas=?,realizarentregas=?,verificarsolicitudcredito=?,cod_localFK=?,accesocrearsoliticudcredito=?,accesoagendacliente=?,accesocargarfotoscliente=?,accesocargarpdfcliente=?,accesoegresoingreso=?,accesoubicacioncliente=?,accesometascobrador=?,accesosolicituddescuentocredito=? where cod_cobrador=? ";
$stmt2 = $mysqli->prepare($consulta2);
$ss='sssssssssssssssssssss';
$stmt2->bind_param($ss,$idzona,$usu,$con,$estado,$accesocliente,$accesoproducto,$accesocuentas,$modosinconexion,$realizarcobranzas,$realizarentregas,$verificarsolicitudcredito,$cod_localFK,$accesocrearsoliticudcredito,$accesoagendacliente,$accesocargarfotoscliente,$accesocargarpdfcliente,$accesoegresoingreso,$accesoubicacioncliente,$accesometascobrador,$accesosolicituddescuentocredito,$cod_persona);


}



if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


if($operacion=="nuevo")
{
	$cod_persona= obtenerUltimaId() ;
}

	$extperfilcobador=$_POST['extperfilcobador'];
$extperfilcobador = utf8_decode($extperfilcobador);
if($extperfilcobador!=''){
	cargarFotos($cod_persona);
}



 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}






function obtenerUltimaId()
{
	$cod_persona ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select cod_cobrador from cobrador where estado='Activo'  order by cod_cobrador desc limit 1";
	
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
		      $cod_persona=$valor['cod_cobrador'];	  	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $cod_persona;
}


 
 
 
 function cargarFotos($cod_persona){
	
	$extperfilcobador=$_POST['extperfilcobador'];
$extperfilcobador = utf8_decode($extperfilcobador);

			  $nombreArchivo = generarCodigoAleatorio(7) . $cod_persona;
$ruta="/fotos/fotoPerfil";
$nombrePost = 'fotoperfilcobador';
$respuesta = mover_archivo_carpeta($ruta,$nombreArchivo,$nombrePost,$extperfilcobador);

$ruta="/GoodVentaElectroCasaMaric/fotos/fotoPerfil/".$nombreArchivo.".".$extperfilcobador;

if($respuesta){
	$mysqli=conectar_al_servidor();
	$consulta="UPDATE cobrador SET url_img = '$ruta' WHERE cod_cobrador  = '$cod_persona'";	
	$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}else{
	$informacion =array("1" => "exito", "2" => 'Problema al cargar el documento');
	echo json_encode($informacion);	
	exit;
}



}

function generarCodigoAleatorio($longitud) {
    $caracteres = '0123456789';
    $numeroCaracteres = strlen($caracteres);
    $codigoAleatorio = '';
    
    for ($i = 0; $i < $longitud; $i++) {
        $codigoAleatorio .= $caracteres[rand(0, $numeroCaracteres - 1)];
    }
    
    return $codigoAleatorio;
}


 
 
 
 

/*Buscar Registro en vista*/
function BuscarRegistro($codigo,$cobrador,$estado)
{
$mysqli=conectar_al_servidor();
$filas=array();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$condicioncodigo="";
if($codigo!=""){
	$condicioncodigo=" and pr.cod_persona ='".$codigo."'";
}
$condicioncobrador="";
if($cobrador!=""){
	$condicioncobrador=" and pr.nombre_persona  like '%".$cobrador."%'";
}
$sql= "select pr.cod_persona,pr.nombre_persona,pr.telefono,cl.idzona,cl.usu,cl.con,cl.estado,zn.nombre,url_img
,cl.accesocliente,cl.accesoproducto,cl.accesocuentas,cl.modosinconexion,cl.realizarcobranzas,cl.realizarentregas,cl.verificarsolicitudcredito,
cl.accesocrearsoliticudcredito,cl.accesoagendacliente,cl.accesocargarfotoscliente,cl.accesocargarpdfcliente,cl.accesoegresoingreso,cl.accesoubicacioncliente,cl.accesometascobrador,cl.accesosolicituddescuentocredito,
(select Nombre from local where cod_local = cod_localFK) as local,cod_localFK
 from  persona pr inner join  cobrador cl on cl.cod_cobrador=pr.cod_persona 
 inner join zona  zn on zn.idzona=cl.idzona
where cl.estado=? ".$condicioncodigo.$condicioncobrador;
$pagina = "";   
$stmt = $mysqli->prepare($sql);
$s='s';
$stmt->bind_param($s,$estado);
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



$cod_persona = utf8_encode($valor['cod_persona']);
$nombre_persona = utf8_encode($valor['nombre_persona']);          
$zona = utf8_encode($valor['nombre']);          
$telefono = utf8_encode($valor['telefono']); 
$usu = utf8_encode($valor['usu']); 
$con = utf8_encode($valor['con']); 
$idzona = utf8_encode($valor['idzona']); 
$estado = utf8_encode($valor['estado']); 
$accesocliente = utf8_encode($valor['accesocliente']); 
$accesoproducto = utf8_encode($valor['accesoproducto']); 
$accesocuentas = utf8_encode($valor['accesocuentas']); 
$modosinconexion = utf8_encode($valor['modosinconexion']); 
$realizarcobranzas = utf8_encode($valor['realizarcobranzas']); 
$realizarentregas = utf8_encode($valor['realizarentregas']); 
$verificarsolicitudcredito = utf8_encode($valor['verificarsolicitudcredito']); 

$accesocrearsoliticudcredito = utf8_encode($valor['accesocrearsoliticudcredito']); 
$accesoagendacliente = utf8_encode($valor['accesoagendacliente']); 
$accesocargarfotoscliente = utf8_encode($valor['accesocargarfotoscliente']); 
$accesocargarpdfcliente = utf8_encode($valor['accesocargarpdfcliente']); 
$accesoegresoingreso = utf8_encode($valor['accesoegresoingreso']); 
$accesoubicacioncliente = utf8_encode($valor['accesoubicacioncliente']); 
$accesometascobrador = utf8_encode($valor['accesometascobrador']); 
$accesosolicituddescuentocredito = utf8_encode($valor['accesosolicituddescuentocredito']); 

$local = utf8_encode($valor['local']); 
$cod_localFK = utf8_encode($valor['cod_localFK']); 
$url_img = utf8_encode($valor['url_img']); 

		$filas[]=array(
			"codigo" => $cod_persona,
			"cobrador" => $nombre_persona,
			"telefono" => $telefono,
			"local" => $local,
			"zona" => $zona,
			"usuario" => $usu,
			"contrasena" => $con,
			"codigo_zona" => $idzona,
			"estado" => $estado,
			"acceso_cliente" => $accesocliente,
			"acceso_producto" => $accesoproducto,
			"acceso_cuentas" => $accesocuentas,
			"modo_sin_conexion" => $modosinconexion,
			"realizar_cobranzas" => $realizarcobranzas,
			"realizar_entregas" => $realizarentregas,
			"verificar_solicitud_credito" => $verificarsolicitudcredito,
			"codigo_local" => $cod_localFK,
			"url_imagen" => $url_img,
			"acceso_crear_solicitud_credito" => $accesocrearsoliticudcredito,
			"acceso_agenda_cliente" => $accesoagendacliente,
			"acceso_cargar_fotos_cliente" => $accesocargarfotoscliente,
			"acceso_cargar_pdf_cliente" => $accesocargarpdfcliente,
			"acceso_egreso_ingreso" => $accesoegresoingreso,
			"acceso_ubicacion_cliente" => $accesoubicacioncliente,
			"acceso_metas_cobrador" => $accesometascobrador,
			"acceso_solicitud_descuento_credito" => $accesosolicituddescuentocredito
		);

	if($formato !== "json") {
		$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCobrador(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$cod_persona."</td>
<td  id='td_datos_1' style='width:10%'>".$nombre_persona."</td>
<td  id='td_datos_2' style='width:10%'>".$telefono."</td>
<td  id='td_datos_13' style='width:10%'>".$local."</td>
<td  id='td_datos_3' style='display:none'>".$zona."</td>
<td  id='td_datos_4' style='display:none'>".$usu."</td>
<td  id='td_datos_5' style='display:none'>".$con."</td>
<td  id='td_datos_6' style='display:none'>".$idzona."</td>
<td  id='td_datos_7' style='display:none'>".$estado."</td>
<td  id='td_datos_8' style='display:none'>".$accesocliente."</td>
<td  id='td_datos_9' style='display:none'>".$accesoproducto."</td>
<td  id='td_datos_10' style='display:none'>".$accesocuentas."</td>
<td  id='td_datos_11' style='display:none'>".$modosinconexion."</td>
<td  id='td_datos_12' style='display:none'>".$realizarcobranzas."</td>
<td  id='td_datos_15' style='display:none'>".$realizarentregas."</td>
<td  id='td_datos_17' style='display:none'>".$verificarsolicitudcredito."</td>
<td  id='td_datos_14' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_16' style='display:none'>".$url_img."</td>


<td  id='td_datos_18' style='display:none'>".$accesocrearsoliticudcredito."</td>
<td  id='td_datos_19' style='display:none'>".$accesoagendacliente."</td>
<td  id='td_datos_20' style='display:none'>".$accesocargarfotoscliente."</td>
<td  id='td_datos_21' style='display:none'>".$accesocargarpdfcliente."</td>
<td  id='td_datos_22' style='display:none'>".$accesoegresoingreso."</td>
<td  id='td_datos_23' style='display:none'>".$accesoubicacioncliente."</td>
<td  id='td_datos_24' style='display:none'>".$accesometascobrador."</td>
<td  id='td_datos_25' style='display:none'>".$accesosolicituddescuentocredito."</td>



</tr>
</table>";
	}


}
}

 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

/*Buscar Registro en vista*/
function  BuscarRegistroVista($buscar)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$filas=array();

$sql= "select pr.cod_persona,pr.nombre_persona,pr.telefono,cl.idzona,cl.usu,cl.con,cl.estado,zn.nombre
 from  persona pr inner join  cobrador cl on cl.cod_cobrador=pr.cod_persona 
 inner join zona  zn on zn.idzona=cl.idzona
where concat(pr.nombre_persona,' ',zn.nombre) like ? and cl.estado='Activo' ";
$pagina = "";   
$buscar="%".$buscar."%";
$stmt = $mysqli->prepare($sql);
$s='s';
$stmt->bind_param($s,$buscar);
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



$cod_persona = utf8_encode($valor['cod_persona']);  
$nombre_persona = utf8_encode($valor['nombre_persona']);          
$zona = utf8_encode($valor['nombre']);          
$telefono = utf8_encode($valor['telefono']); 
$usu = utf8_encode($valor['usu']); 
$con = utf8_encode($valor['con']); 
$idzona = utf8_encode($valor['idzona']); 
$estado = utf8_encode($valor['estado']); 
$filas[]=array(
	"codigo"=>$cod_persona,
	"cobrador"=>$nombre_persona,
	"telefono"=>$telefono,
	"zona"=>$zona,
	"usuario"=>$usu,
	"contrasena"=>$con,
	"codigo_zona"=>$idzona,
	"estado"=>$estado
);

		$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosvistacobrador(this)'>
<td id='td_id' style='display:none'>".$cod_persona."</td>
<td  id='td_datos_1' style='width:30%'>".$nombre_persona."</td>
<td  id='td_datos_2' style='width:30%'>".$telefono."</td>
<td  id='td_datos_3' style='display:none'>".$zona."</td>
<td  id='td_datos_4' style='display:none'>".$usu."</td>
<td  id='td_datos_5' style='display:none'>".$con."</td>
<td  id='td_datos_6' style='display:none'>".$idzona."</td>
<td  id='td_datos_7' style='display:none'>".$estado."</td>
</tr>
</table>";


}
}

 mysqli_close($mysqli); 
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}





function buscaroption($user)
{
	

		$sql= "Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobrador ) as nombre , cod_cobrador , estado  from cobrador where estado='Activo' order by nombre ";

	$mysqli=conectar_al_servidor();
	
		
		 $pagina= "<option  value='' >SELECCIONAR</option>";   
   
   
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
		  
		  
		      $cod_cobrador=$valor['cod_cobrador'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $estado=utf8_encode($valor['estado']);
		  	 
		  	 
			    	
			  $pagina.="<option  value='$cod_cobrador' >".$nombre."</option>";   
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}



function buscarCobradorSelecEntregadoRevisionDocumentos()
{
	

		$sql= "SELECT (Select nombre_persona from persona pra where pra.cod_persona = entrega_cobradorFK ) as nombre,entrega_cobradorFK FROM solicitudcredito group by nombre order by nombre";


	$mysqli=conectar_al_servidor();
	
		
		 $pagina= "<option  value='' >SELECCIONAR</option>";   
   
   
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
		   $nombre=utf8_encode($valor['nombre']);
		   $entrega_cobradorFK=utf8_encode($valor['entrega_cobradorFK']);
		   
			if($nombre != ''){
				$pagina.="<option  value='$entrega_cobradorFK' >".$nombre."</option>";
			}
		         
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function buscarCobradorSelecVendedorRevisionDocumentos()
{
	

		$sql= "SELECT pra.nombre_persona, sc.cod_cobradorFK 
from persona pra INNER JOIN solicitudcredito sc 
ON pra.cod_persona = sc.cod_cobradorFK 
group by nombre_persona order by nombre_persona";


	$mysqli=conectar_al_servidor();
	
		
		 $pagina= "<option  value='' >SELECCIONAR</option>";   
   
   
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
		   $nombre=utf8_encode($valor['nombre_persona']);
		   $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
		   
			if($nombre != ''){
				$pagina.="<option  value='$cod_cobradorFK' >".$nombre."</option>";
			}
		         
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function buscarEntregadorLocales($cod_Entregador)
{
	$mysqli=conectar_al_servidor();
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$filas=array();

		$sql= "SELECT nombre,cod_local FROM local WHERE estado='Activo'";

   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $pagina= ""; 
 $styleName="tableRegistroSearch";
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  $cod_local=utf8_encode($valor['cod_local']);
		  $nombre=utf8_encode($valor['nombre']);
		  
		  $datos = comprobarEntregadorLocal($cod_local,$cod_Entregador);
		  $filas[]=array(
			  "codigo_local"=>$cod_local,
			  "local"=>$nombre,
			  "asignado"=>$datos[1] ? true : false,
			  "codigo_relacion"=>$datos[1] ? $datos[0] : ''
		  );
		  
		  $accion="<input type='checkbox' id='$cod_local' onclick='abmentregadorlocal(this)' />";
		  
		  if($datos[1]){
		  $accion="<input type='checkbox' id='$datos[0]' onclick='eliminarEntregaCobrador(this)' checked />";
		  }
		  
		$styleName=CargarStyleTable($styleName);
		$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='td_id' style='width:5%'>".$cod_local."</td>
<td  id='td_datos_1' style='width:70%'>".$nombre."</td>
<td  id='td_datos_2' style='width:25%;text-align:center'>".$accion."</td>
</tr>
</table>";
		
		
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}
function comprobarEntregadorLocal($cod_localFK,$cod_Entregador)
{
	$mysqli=conectar_al_servidor();

		$sql= "SELECT count(*) as count, iddetalleentregador_local FROM detalleentregador_local WHERE cod_localFK = '$cod_localFK' and cod_cobradorFK = '$cod_Entregador' LIMIT 1";

   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $control = false;
 $iddetalleentregador_local = '';
 $datos = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  $count=utf8_encode($valor['count']);
		  $iddetalleentregador_local=utf8_encode($valor['iddetalleentregador_local']);
		  
		  if($count > 0){
			$control = true;
			$datos[0] = $iddetalleentregador_local;
		  }
 }
 }
 
 
$datos[1] = $control;
return $datos;
}

function  buscarTareasCobrador($descripcion,$estado,$fecha1,$fecha2,$cobrador,$formato='')
{
$mysqli=conectar_al_servidor();
$condicionFecha="";
if($fecha1!="" || $fecha2!=""){
	$condicionFecha=" and fecha_ingreso between '$fecha1'  and  '$fecha2' ";
}

$condicioncobrador="";
if($cobrador!="" ){
	$condicioncobrador=" and  cod_cobradorFK = '".$cobrador."'";
}
$condiciondescripcion="";
if($descripcion!="" ){
	$condiciondescripcion=" and  descripcion like  '%".$descripcion."%' ";
}

$sql= "select cod_controlcobrador, montoNeto, montoTotal, fechainicio, fechafin,cobrado, cod_zona, estado, cod_cobradorFK, descripcion,fecha_ingreso,
(select  nombre_persona from persona where cod_persona=cod_cobradorFK) as cobrador,
(select  nombre_persona from persona where cod_persona=cod_callcenterFK) as UsuarioCallCenter,cod_callcenterFK,
(select  nombre from zona where idzona=cod_zona) as NombreZona,
ifnull(( select sum(Monto) from pago pg where  Tipo!='Pago Cuota'  and cod_tareaCobadorFK=cod_controlcobrador),0) as Intpagado
 from  controlcobrador
where estado='$estado' ".$condicionFecha.$condicioncobrador.$condiciondescripcion."  order by cod_controlcobrador desc" ;

/* 
echo($sql);
exit; */

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
$TotalNeto = 0;   
$TotalCobrar = 0;  

$TotalCobrado = 0; 
$Totalfaltante = 0;   
$TotalCobradoNeto= 0;   
$filas=array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$UsuarioCallCenter = utf8_encode($valor['UsuarioCallCenter']);  
$cod_callcenterFK = utf8_encode($valor['cod_callcenterFK']);  
$cod_controlcobrador = utf8_encode($valor['cod_controlcobrador']);  
$montoNeto = utf8_encode($valor['montoNeto']);          
$montoTotal = utf8_encode($valor['montoTotal']);          
$fechainicio = utf8_encode($valor['fechainicio']); 
$fechafin = utf8_encode($valor['fechafin']); 
$cod_zona = utf8_encode($valor['cod_zona']); 
$estado = utf8_encode($valor['estado']); 
$cod_cobradorFK = utf8_encode($valor['cod_cobradorFK']); 
$descripcion = utf8_encode($valor['descripcion']); 
$cobrador = utf8_encode($valor['cobrador']); 
$NombreZona = utf8_encode($valor['NombreZona']); 
$cobrado = utf8_encode($valor['cobrado']); 
$fecha_ingreso = utf8_encode($valor['fecha_ingreso']); 

$Intpagado = utf8_encode($valor['Intpagado']); 
 
$faltante= 0;
$Porcentaje=0;
$Porcentaje2 = 0;

$cantidadCliente=contadorCliente($cod_controlcobrador);
$CobradorTotalcobrado=ArqueoCobroCobrador($fecha1,$fecha2,$cod_controlcobrador,$cod_cobradorFK);
 
$TotalACobrarTareaCobrador=TotalACobrarTareaCobrador($cod_controlcobrador);

$cobrado= $CobradorTotalcobrado[0];
$cobradoCobrador2=number_format($cobrado,'0',',','.');
 
if($estado=='Activo'){
	$montoNeto=$TotalACobrarTareaCobrador[0];
}
 
	$faltante= $montoNeto - $CobradorTotalcobrado[1];
	
	if($montoNeto==0){
		$Porcentaje = ($cobrado * 100) / 1;
	}else{
		$Porcentaje = ($cobrado * 100) / $montoNeto;
	}

	$Porcentaje2 = number_format($Porcentaje,'1',',','.');
	
	if ($montoNeto > 0) {
		$PorcentajeNeto = ($CobradorTotalcobrado[1] * 100) / $montoNeto;
	} else {
		$PorcentajeNeto = 0; // o null según cómo quieras manejarlo
	}
	
	$PorcentajeNeto = number_format($PorcentajeNeto,'1',',','.');

		$styleName=CargarStyleTable($styleName);
	  $filas[]=array(
		"codigo" => $cod_controlcobrador,
		"fecha_creacion" => $fecha_ingreso,
		"cobrador" => $cobrador,
		"cantidad_clientes" => (int)$cantidadCliente[0],
		"rango_fechas" => $fechainicio." - ".$fechafin,
		"zona" => $NombreZona,
		"monto_total" => (float)$montoTotal,
		"monto_total_formateado" => number_format($montoTotal,'0',',','.'),
		"monto_neto" => (float)$montoNeto,
		"monto_neto_formateado" => number_format($montoNeto,'0',',','.'),
		"descripcion" => $descripcion,
		"cobrado_cobrador" => (float)$cobrado,
		"cobrado_cobrador_formateado" => $cobradoCobrador2,
		"cobrado_total" => (float)$CobradorTotalcobrado[1],
		"cobrado_total_formateado" => number_format($CobradorTotalcobrado[1],'0',',','.'),
		"faltante" => (float)$faltante,
		"faltante_formateado" => number_format($faltante,'0',',','.')." Gs.",
		"porcentaje_cobrador" => (float)$Porcentaje,
		"porcentaje_total" => (float)str_replace(',', '.', $PorcentajeNeto),
		"porcentajes_formateados" => "CC:".$Porcentaje2." % - CT:".$PorcentajeNeto."%",
		"callcenter" => $UsuarioCallCenter
	  );
	  if($formato !== 'json') {
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosvistaTareasCobrador(this)'>
<td id='td_id' style='display:none'>".$cod_controlcobrador."</td>
<td  id='' style='width:7%'>".$fecha_ingreso."</td>
<td  id='td_datos_1' style='width:7%'>".$cobrador."</td>
<td  id='' style='width:7%'>".$cantidadCliente[0]."</td>
<td  id='td_datos_2' style='width:10%'>".$fechainicio." - ".$fechafin."</td>
<td  id='td_datos_3' style='width:8%'>".$NombreZona."</td>
<td  id='td_datos_4' style='display:none'>". number_format($montoTotal,'0',',','.')."</td>
<td  id='td_datos_5' style='width:8%'>". number_format($montoNeto,'0',',','.')."</td>
<td  id='td_datos_6' style='width:13%'>".$descripcion."</td>
<td  id='td_datos_7' style='width:8%'>".$cobradoCobrador2."</td>
<td  id='td_datos_10' style='width:8%'>".number_format($CobradorTotalcobrado[1],'0',',','.')." </td>
<td  id='td_datos_8' style='width:8%'>".number_format($faltante,'0',',','.')." Gs.</td>
<td  id='td_datos_9' style='width:8%'>CC:".$Porcentaje2." % - CT:".$PorcentajeNeto."%</td>
<td  id='td_datos_9' style='width:8%'>".$UsuarioCallCenter."</td>
</tr>
</table>";
	  }


$TotalNeto = $TotalNeto + $montoNeto;   
$TotalCobrar = $TotalCobrar + $montoTotal ;  

$TotalCobrado = $TotalCobrado + $cobrado; 

$TotalCobradoNeto= $TotalCobradoNeto +  $CobradorTotalcobrado[1] ;  

}


$totalPorcentaje = $TotalNeto != 0 ? ($TotalCobrado * 100) / $TotalNeto : 0;
$totalPorcentaje = number_format($totalPorcentaje,'1',',','.');


$totalPorcentajeNeto = $TotalNeto != 0 ? ($TotalCobradoNeto * 100) / $TotalNeto : 0;
$totalPorcentajeNeto = number_format($totalPorcentajeNeto,'1',',','.');

$Totalfaltante = $TotalNeto - $TotalCobradoNeto;  

$resumen=array(
	"total_neto" => (float)$TotalNeto,
	"total_neto_formateado" => number_format($TotalNeto,'0',',','.'),
	"total_cobrado_cobrador" => (float)$TotalCobrado,
	"total_cobrado_cobrador_formateado" => number_format($TotalCobrado,'0',',','.'),
	"total_cobrado" => (float)$TotalCobradoNeto,
	"total_cobrado_formateado" => number_format($TotalCobradoNeto,'0',',','.'),
	"total_faltante" => (float)$Totalfaltante,
	"total_faltante_formateado" => number_format($Totalfaltante,'0',',','.'),
	"porcentajes_formateados" => "CC:".$totalPorcentaje."% - CT:".$totalPorcentajeNeto."%"
);
if($formato !== 'json') {
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' '>
<td  id='td_datos_7' style='width:40%;    text-align: center;'>TOTALES A COBRAR: ".number_format($TotalNeto,'0',',','.')."</td>
<td  id='td_datos_7' style='width:15%'> COBRADOR: ".number_format($TotalCobrado,'0',',','.')."</td>
<td  id='td_datos_7' style='width:15%'> TOTAL: ".number_format($TotalCobradoNeto,'0',',','.')."</td>
<td  id='td_datos_8' style='width:15%'> FALTANTE: ".number_format($Totalfaltante,'0',',','.')."</td>
<td  id='td_datos_9' style='width:15%'> CC:".$totalPorcentaje."% - CT:".$totalPorcentajeNeto."%</td>
</tr>
</table>";
}
}

if(!isset($resumen)) {
	$resumen=array(
		"total_neto" => 0,
		"total_neto_formateado" => "0",
		"total_cobrado_cobrador" => 0,
		"total_cobrado_cobrador_formateado" => "0",
		"total_cobrado" => 0,
		"total_cobrado_formateado" => "0",
		"total_faltante" => 0,
		"total_faltante_formateado" => "0",
		"porcentajes_formateados" => "CC:0% - CT:0%"
	);
}

 mysqli_close($mysqli); 
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $pagina),"3" => number_format($TotalCobrar,'0',',','.'),"4" => number_format($TotalNeto,'0',',','.'),"5" => $resumen);
echo json_encode($informacion);	
exit;
}
function contadorCliente($cod_controlcobrador)
{

$mysqli=conectar_al_servidor();

 $totalRegistro=0;
	 $pagina="";
	
		$sql= "select  count(*)  from  credito cr 
		inner join detalle_tarea_cobrador dtc on cod_creditoFK=idcredito
		where cod_controlcobradorFK='$cod_controlcobrador' group by cod_venta  ";
	
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$cantidad=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cantidad = $cantidad + 1;

}
}

$datos[0]= $cantidad ;

return $datos;
}
function ArqueoCobroCobrador($fecha1,$fecha2,$cod_controlcobrador,$cobrador)
{

$mysqli=conectar_al_servidor();

 $totalRegistro=0;
	 $pagina="";
	  $condicionfecha="";
	 if($fecha1!="" && $fecha2!=""){
		 $condicionfecha=" and pg.Fecha between '".$fecha1."' and '".$fecha2."' ";
	 }

	  $condicioncobrador=" and pg.cod_cobradorFK = '".$cobrador."'";		
	 

		$sql= "select  IFNULL(sum(Monto),0) as Monto
			from  pago pg 
			where pg.Monto>0  and Tipo='Pago Cuota' and cod_tareaCobadorFK='$cod_controlcobrador' ".$condicionfecha.$condicioncobrador."   ";/*Sentencia para buscar registros*/	

// echo $sql;
// exit;
 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$TotalCobro=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$monto = utf8_encode($valor['Monto']);  

$TotalCobro = $TotalCobro + $monto;

}
}


///////////////TOTAL//////////////////





		$sql= "select IFNULL(sum(Monto),0) as Monto
			from  pago pg 
			where cod_tareaCobadorFK='$cod_controlcobrador' ".$condicionfecha."  and Tipo='Pago Cuota'  ";/*Sentencia para buscar registros*/	

 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$TotalCobro2=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$monto = utf8_encode($valor['Monto']);  

$TotalCobro2 = $TotalCobro2 + $monto;

}
}

$datos[0]= $TotalCobro ;
$datos[1]= $TotalCobro2 ;

return $datos;
}
function TotalACobrarTareaCobrador($cod_controlcobrador)
{

$mysqli=conectar_al_servidor();

 $totalRegistro=0;
	 $pagina="";


		$sql= "select  Monto  , ifnull(cr.descuento,0) as descuento,
		ifnull((select sum(Monto) 
		from pago p 
		where cr.idcredito=p.cod_creditoFK and (p.cod_tareaCobadorFK!= '".$cod_controlcobrador."' OR p.cod_tareaCobadorFK IS NULL) and Tipo='Pago Cuota' ),0) as cobrado  
		
		from  credito cr 
		inner join  detalle_tarea_cobrador dtc on cr.idcredito=dtc.cod_creditoFK 
		where IFNULL((Select count(fecha) from cancelaciones where cod_venta=cr.cod_venta limit 1),0)=0 and  dtc.cod_controlcobradorFK = '".$cod_controlcobrador."'  ";/*Sentencia para buscar registros*/	
 

// echo($sql);
// exit;
 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$TotalCobro=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$monto = utf8_encode($valor['Monto']); 

$cobrado = utf8_encode($valor['cobrado']);  
$descuento = utf8_encode($valor['descuento']);  

$TotalCobro += ($monto - ($cobrado  +  $descuento));

}
}

 

$datos[0]= $TotalCobro ;


return $datos;
}

function EditarTarea($cod_tarea,$monto,$operacion)
{

$mysqli=conectar_al_servidor();

$consulta2="update  controlcobrador set cobrado=$monto , estado='Finalizado' where cod_controlcobrador=$cod_tarea ";
$stmt2 = $mysqli->prepare($consulta2);

// echo($consulta2);
// exit;

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}


function EliminarCargarCobro($cod_TareasCobrador,$operacion)
{

$mysqli=conectar_al_servidor();

$consulta2="update  controlcobrador set estado='Inactivo' where cod_controlcobrador=$cod_TareasCobrador ";
$stmt2 = $mysqli->prepare($consulta2);

// echo($consulta2);
// exit;

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}
function abmentregadorlocal($cod_Entregador,$cod_localFK)
{

$mysqli=conectar_al_servidor();

$consulta="INSERT detalleentregador_local (cod_cobradorFK,cod_localFK) VALUES ('$cod_Entregador','$cod_localFK')";
$stmt2 = $mysqli->prepare($consulta);

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
function eliminarEntregaCobrador($iddetalleentregador_local)
{

$mysqli=conectar_al_servidor();

$consulta="DELETE FROM detalleentregador_local WHERE iddetalleentregador_local = '$iddetalleentregador_local'";



$stmt2 = $mysqli->prepare($consulta);

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;

}

 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}


function abmnuevaTarea($fechainicio,$fechafin,$nombre,$montoTotal,$MontosinInteres,$descripcion,$zona,$operacion)
{

$mysqli=conectar_al_servidor();

	
	date_default_timezone_set('America/Anguilla');    
	$fecha_insert = date('Y-m-d', time()); 

$consulta2="Insert into controlcobrador (montoNeto, montoTotal, fechainicio, fechafin, cod_zona, estado, cod_cobradorFK, descripcion,cobrado,fecha_ingreso)
values($MontosinInteres,$montoTotal,'$fechainicio','$fechafin','$zona','Activo',$nombre,'$descripcion','0','$fecha_insert')";
$stmt2 = $mysqli->prepare($consulta2);

// echo($consulta2);
// exit;

if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

$cod_controlcobrador=0;

$sql="select cod_controlcobrador from  controlcobrador  order by  cod_controlcobrador  desc limit 1";
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
		      $cod_controlcobrador=$valor['cod_controlcobrador'];
	  }
 }


$control=1;	
$totalRegistro=$_POST['totalRegistro'];
$totalRegistro = utf8_decode($totalRegistro);
while($control<=$totalRegistro){
	
	
	$idcredito=$_POST['idcredito'.$control];
	$idcredito = utf8_decode($idcredito);
	
	$consulta2=" update credito set cod_tareaFK='$cod_controlcobrador'  where idcredito='$idcredito' ";
	$stmt2 = $mysqli->prepare($consulta2);



if (!$stmt2->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
	
	
	$control=$control+1;
}





 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}
/*Buscar Registro en vista*/

function buscarListaClientes($cod_TareasCobrador, $condicion, $Zona, $fecha1, $fecha2) {
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8");
    $formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
    $filas = array();
 
    $controlCondicion = "";
    if ($condicion != "todo") {
        $controlCondicion = " and IFNULL((SELECT SUM(Monto) 
                    FROM pago pg 
                    WHERE pg.cod_venta_fk=vt.cod_venta AND Tipo='Pago Cuota' AND cod_tareaCobadorFK= '".$cod_TareasCobrador."'),0)<=0
        ";
    }

    $controlZona = ($Zona !== "") ? " AND (SELECT idzonaFk FROM cliente WHERE cod_cliente = cod_clienteFK) = ?" : "";
    $controlFecha = ($fecha1 !== "" && $fecha2 !== "") ? " AND fechapago BETWEEN ? AND ?" : "";
 
    $sql = "
        SELECT 
            vt.cod_clienteFK,
            plazo,
            fechapago,
            (SELECT CONCAT(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona=cod_clienteFK) AS NombreCliente,
            (SELECT ci_cliente FROM cliente WHERE cod_cliente=cod_clienteFK) AS CiCliente,
            (SELECT telefono FROM persona WHERE cod_persona=cod_clienteFK) AS TelefonoCliente,
            (SELECT nombre FROM zona WHERE idzona=(SELECT idzonaFk FROM cliente WHERE cod_cliente=cod_clienteFK)) AS Zona,

            (SELECT nombre_persona FROM persona WHERE cod_persona=idGaranteFk) AS NombreGarante,
            (SELECT ci_cliente FROM cliente WHERE cod_cliente=idGaranteFk) AS CiGarante,
            (SELECT telefono FROM persona WHERE cod_persona=idGaranteFk) AS TelefonoGarante,

            (SELECT SUM(Monto) 
             FROM credito c
             INNER JOIN venta v ON v.cod_venta=c.cod_venta
			 inner join  detalle_tarea_cobrador d on c.idcredito=d.cod_creditoFK 
             WHERE d.cod_controlcobradorFK= '".$cod_TareasCobrador."' AND v.cod_clienteFK=vt.cod_clienteFK AND v.cod_venta=vt.cod_venta
            ) AS totalCredito,
            vt.cod_venta, concat(vt.puntoexpedicion,'-',vt.num_factura) as nro_factura,

            IFNULL((SELECT SUM(Monto) 
                    FROM pago pg 
                    WHERE pg.cod_venta_fk=vt.cod_venta AND Tipo='Pago Cuota' AND cod_tareaCobadorFK= '".$cod_TareasCobrador."'),0) AS pagado,

            IFNULL((SELECT SUM(p.Monto)
                    FROM pago p
                    INNER JOIN credito c ON p.cod_creditoFK=c.idcredito
					inner join  detalle_tarea_cobrador d on c.idcredito=d.cod_creditoFK 
                    WHERE p.cod_venta_fk=vt.cod_venta AND p.Tipo='Pago Cuota'
                    AND (p.cod_tareaCobadorFK != '".$cod_TareasCobrador."' OR p.cod_tareaCobadorFK IS NULL) AND d.cod_controlcobradorFK= '".$cod_TareasCobrador."'),0) AS pagadoFuera,

            (
                (
                    (SELECT SUM(Monto) 
                     FROM credito c 
                     INNER JOIN venta v ON v.cod_venta=c.cod_venta
					 inner join  detalle_tarea_cobrador d on c.idcredito=d.cod_creditoFK 
                     WHERE d.cod_controlcobradorFK= '".$cod_TareasCobrador."' AND v.cod_clienteFK=vt.cod_clienteFK AND v.cod_venta=vt.cod_venta)
                    -
                    IFNULL((SELECT SUM(pg.Monto) 
                            FROM pago pg
                            INNER JOIN credito c ON cod_creditoFK=idcredito
							inner join  detalle_tarea_cobrador d on c.idcredito=d.cod_creditoFK 
                            WHERE pg.cod_venta_fk=vt.cod_venta AND pg.Tipo='Pago Cuota'
                            AND (pg.cod_tareaCobadorFK != '".$cod_TareasCobrador."' OR pg.cod_tareaCobadorFK IS NULL) AND d.cod_controlcobradorFK= '".$cod_TareasCobrador."' ),0)
                )
                -
                (
                    IFNULL((SELECT SUM(Monto)
                            FROM pago pg 
                            WHERE pg.cod_venta_fk=vt.cod_venta 
                            AND Tipo='Pago Cuota' 
                            AND cod_tareaCobadorFK= '".$cod_TareasCobrador."'),0)
                    +
                    (SELECT SUM(c.descuento) 
                     FROM credito c 
                     INNER JOIN venta v ON v.cod_venta=c.cod_venta 
					 inner join  detalle_tarea_cobrador d on c.idcredito=d.cod_creditoFK 
                     WHERE d.cod_controlcobradorFK= '".$cod_TareasCobrador."'AND v.cod_clienteFK=vt.cod_clienteFK AND v.cod_venta=vt.cod_venta)
                )
            ) AS deuda,

            (SELECT SUM(c.descuento) 
             FROM credito c 
             INNER JOIN venta v ON v.cod_venta=c.cod_venta 
			 inner join  detalle_tarea_cobrador d on c.idcredito=d.cod_creditoFK 
             WHERE d.cod_controlcobradorFK= '".$cod_TareasCobrador."' AND v.cod_clienteFK=vt.cod_clienteFK AND v.cod_venta=vt.cod_venta
            ) AS descuento

        FROM controlcobrador cc
		INNER JOIN detalle_tarea_cobrador dtc on cc.cod_controlcobrador=dtc.cod_controlcobradorFK
		
        INNER JOIN credito cr ON dtc.cod_creditoFK= cr.idcredito 
        INNER JOIN venta vt ON vt.cod_venta=cr.cod_venta 
		
		
		
        WHERE IFNULL((SELECT COUNT(fecha) FROM cancelaciones WHERE cod_venta=vt.cod_venta LIMIT 1),0)=0
        AND cod_controlcobradorFK= '".$cod_TareasCobrador."'
        $controlZona
        $controlCondicion
        $controlFecha
        GROUP BY vt.cod_venta
        ORDER BY deuda DESC
    ";
	 
	 
	 // echo($sql);
	 // exit;
	 
    $stmt = $mysqli->prepare($sql);

    if (!$stmt->execute()) {
        trigger_error("Query failed: (".$stmt->errno.") ".$stmt->error, E_USER_ERROR);
    }

    $result = $stmt->get_result();

    $pagina = "";
	$paginaExcel = "<table>
	<tr>
	<th ><b>CI</b></th>
	<th ><b>Cliente</b></th>
	<th ><b>Telefono</b></th>
	<th ><b>Plazo</b></th>
	<th ><b>Vencimiento</b></th>
	<th ><b>Deuda</b></th>
	<th ><b>Pagado</b></th> 
	</tr>
	</table>";
    $TotalCobrar = 0;

    while ($valor = $result->fetch_assoc()) {
        $descuento      = $valor['descuento'];
        $plazo          = $valor['plazo'];
        $fechapago      = $valor['fechapago'];
        $Zona           = $valor['Zona'];
        $NombreCliente  = $valor['NombreCliente'];
        $CiCliente      = $valor['CiCliente'];
        $TelefonoCliente= $valor['TelefonoCliente'];
        $totalCredito   = $valor['totalCredito'];
        $cod_venta      = $valor['cod_venta'];
        $pagado         = $valor['pagado'];
        $cod_clienteFK  = $valor['cod_clienteFK'];
        $pagadoFuera    = $valor['pagadoFuera'];
        $NombreGarante  = $valor['NombreGarante'];
        $CiGarante      = $valor['CiGarante'];
        $TelefonoGarante= $valor['TelefonoGarante'];
        $deuda			= $valor['deuda'];
        $nro_factura	= $valor['nro_factura'];

        $Producto = buscar_detalles_venta($cod_venta, $formato == 'json' ? 'array' : 'html');

        $garante = "<br><b>Garante:".$CiGarante."/".$NombreGarante."/".$TelefonoGarante."</b>";

        $datos = calcularintereses2($cod_venta,0,0,"2","2","2","no"); 

        // $deuda = $totalCredito - ($pagado + $pagadoFuera + $descuento);

        $strDesc = ($descuento != 0) ? " <br>Desc:".number_format($descuento,0,',','.') : "";

        $totalCredito -= $pagadoFuera;

        $styleName = CargarStyleTable("tableRegistroSearch");

        $filas[] = array(
            "documento" => $CiCliente,
            "cod_cliente" => $cod_clienteFK,
            "cliente" => $NombreCliente,
            "telefono" => $TelefonoCliente,
            "garante_documento" => $CiGarante,
            "garante_nombre" => $NombreGarante,
            "garante_telefono" => $TelefonoGarante,
            "cod_venta" => $cod_venta,
            "nro_factura" => $nro_factura,
            "cuota" => $plazo,
            "fecha_vencimiento" => $fechapago,
            "zona" => $Zona,
            "productos" => $formato == 'json' ? $Producto : array(),
            "producto_orden" => $formato == 'json' ? implode(' ', array_map(function($producto){ return $producto['nombre']; }, $Producto)) : '',
            "pago_anterior" => floatval($pagadoFuera),
            "pago_anterior_formateado" => number_format($pagadoFuera,0,',','.'),
            "total_deuda" => floatval($totalCredito),
            "total_deuda_formateado" => number_format($totalCredito,0,',','.'),
            "descuento" => floatval($descuento),
            "descuento_formateado" => number_format($descuento,0,',','.'),
            "interes" => floatval($datos[10]),
            "interes_formateado" => number_format($datos[10],0,',','.'),
            "deuda_actual" => floatval($deuda),
            "deuda_actual_formateada" => number_format($deuda,0,',','.'),
            "pagado" => floatval($pagado),
            "pagado_formateado" => number_format($pagado,0,',','.')
        );

        if ($formato != 'json') {
        $pagina .= "
        <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
        <tr onclick='obtenerdatosabmAgendaDesdeTC(this)'>
            <td style='width:5%'>$CiCliente</td>
            <td id='td_datos_1' style='display:none'>$cod_clienteFK</td>
            <td id='td_datos_2' style='display:none'>$NombreCliente</td>
            <td style='width:20%'>$NombreCliente $garante</td>
            <td style='width:5%'>$TelefonoCliente</td>
            <td style='width:10%'>$nro_factura</td>
            <td style='width:10%'>Cuota:$plazo<br>Venc.:$fechapago</td>
            <td style='width:5%'>$Zona</td>
            <td style='width:20%'>$Producto</td>
            <td style='width:5%'>".number_format($pagadoFuera,0,',','.')."</td>
            <td style='width:10%'>D/T:<br>".number_format($totalCredito,0,',','.')."<br>$strDesc <br>INT.:".number_format($datos[10],0,',','.')."</td>
            <td style='width:10%'>D/A:".number_format($deuda,0,',','.')." <br> Pagado:".number_format($pagado,0,',','.')." </td>
        </tr>
        </table>";  
		}
		
		$paginaExcel .= "
        <table border='1' cellspacing='1' cellpadding='5' >
        <tr>
            <td >$CiCliente</td>
            <td >$NombreCliente</td>
            <td >$TelefonoCliente</td>
            <td >Cuota:$plazo</td>
			 <td >$fechapago</td>
            <td >".number_format($totalCredito,0,',','.')."</td>
            <td >".number_format($pagado,0,',','.')."</td>
        </tr>
        </table>";

        $TotalCobrar += $deuda;
    }

    $informacion = [
        "1" => "exito",
        "2" => $formato == 'json' ? $filas : $pagina,
        "3" => number_format($result->num_rows,0,',','.'),
        "4" => number_format($TotalCobrar,0,',','.'),
        "5" => $paginaExcel
    ];

    $stmt->close();
    $mysqli->close();

    echo json_encode($informacion);
    exit;
}






function buscar_detalles_venta($buscar,$formato='html')
{
$mysqli=conectar_al_servidor();

$sql= "select pr.nombre_producto,
 IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Devolucion' limit 1),0) as nroDevoluciones,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Cambio' limit 1),0) as nroCambios,
IFNULL((Select count(fecha) from cambios where coddetalleventa=dtv.cod_detalle and motivo='Garantia' limit 1),0) as nroGarantia
 from
 venta vt inner join detalle_venta dtv on vt.cod_venta=dtv.cod_ventaFK 
 inner join producto pr on pr.cod_producto=dtv.cod_productoFK
 where vt.cod_venta='$buscar' ";/*Sentencia para buscar registros*/
$pagina = "";   
$stmt = $mysqli->prepare($sql);/*Se prepara la sentencia sql con el objeto prepare*/
/*Función para ejecutar sentencias sql*/
if ( ! $stmt->execute()) {
/*Si la sentencia prepara retorna un false entra esta funcion y capturamos el error y lo devolvemos con un echo*/
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);/*Utilizado para cargar variables tipo resultset que nos permite recorrer las fila o filas obtenida mendiante el nombre del atributo*/
$nroRegistro=$valor;
$contador=1;
$productos=array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$nombre_producto = utf8_encode($valor['nombre_producto']);      
$nroDevoluciones = utf8_decode($valor['nroDevoluciones']);      
$nroCambios = utf8_decode($valor['nroCambios']);      
$nroGarantia = utf8_decode($valor['nroGarantia']);      
$productos[]=array(
	"orden" => $contador,
	"nombre" => $nombre_producto,
	"devoluciones" => $nroDevoluciones,
	"cambios" => $nroCambios,
	"garantias" => $nroGarantia
);
if($contador==1){
	 $pagina.="<b class='pTituloB' style='font-size:9px;color: #000'> ".$contador." )-".$nombre_producto."</b>";
}else{
	 $pagina.="<br><b class='pTituloB' style='font-size:9px;color: #000;'> ".$contador." )-".$nombre_producto."</b>";
}
 

$contador ++;
}
}
 mysqli_close($mysqli); 
if($formato=='array'){
	return $productos;
}
return $pagina;
}


function buscarCobradorSelecEntregadoRevisionDocumentosPagare()
{
	

		$sql= "SELECT (Select nombre_persona from persona pra where pra.cod_persona = entrega_cobradorFK ) as nombre,entrega_cobradorFK FROM solicitudcredito group by nombre order by nombre";


	$mysqli=conectar_al_servidor();
	
		
		 $pagina= "<option  value='' >SELECCIONAR</option>";   
   
   
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
		   $nombre=utf8_encode($valor['nombre']);
		   $entrega_cobradorFK=utf8_encode($valor['entrega_cobradorFK']);
		   
			if($nombre != ''){
				$pagina.="<option  value='$entrega_cobradorFK' >".$nombre."</option>";
			}
		         
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}


// function buscaroptioncalificacionentrega()
// {
	// $mysqli=conectar_al_servidor();
	// $pagina="<option  value='' >SELECCIONAR</option> ";   
	
	// $sql= "Select entrega_cobradorFK, (SELECT usu FROM cobrador WHERE cod_cobrador = entrega_cobradorFK) as cobrador from solicitudcredito where entrega_cobradorFK <> '' group by entrega_cobradorFK ";	   
   // $stmt = $mysqli->prepare($sql);
// if ( ! $stmt->execute()) {
   // echo "Error";
   // exit;
// }
 
	// $result = $stmt->get_result();
 // $valor= mysqli_num_rows($result);

 
 // if ($valor>0)
 // {
	  // while ($valor= mysqli_fetch_assoc($result))
	  // {
		  
		      // $cod_cobrador=$valor['entrega_cobradorFK'];
		  	  // $cobrador=utf8_encode($valor['cobrador']);
		  	 
		  	  // $pagina.="<option  value='$cod_cobrador' >".$cobrador."</option>";   
			  			  
	  // }
 // }
 
 
// /*Retornamos los datos obtenidos mediante el JSON */      
// $informacion =array("1" => "exito","2" => $pagina);
// echo json_encode($informacion);	
// exit;


// }

function buscaroptioncalificacionentrega()
{
    $mysqli = conectar_al_servidor();
    $pagina = "<option value=''>SELECCIONAR</option>";   

/* SECCION COBRADOR ENTREGA CREDITO */
    $sql = "SELECT entrega_cobradorFK, 
                   (SELECT usu FROM cobrador WHERE cod_cobrador = entrega_cobradorFK) AS cobrador 
            FROM solicitudcredito 
            WHERE entrega_cobradorFK <> '' 
            GROUP BY entrega_cobradorFK";	   

    $stmt = $mysqli->prepare($sql);
    if (!$stmt->execute()) {
        echo json_encode(["1" => "error", "2" => "Error en consulta"]);
        exit;
    }

    $result = $stmt->get_result();

    while ($fila = $result->fetch_assoc()) {
        $cod_cobrador = $fila['entrega_cobradorFK'];
        $cobrador = $fila['cobrador']; // Si tu BD ya está en utf8, NO uses utf8_encode()
        $pagina .= "<option value='$cod_cobrador'>".htmlspecialchars($cobrador)."</option>";   
    }
	
	
	/* SECCION COBRADOR ENTREGA CONTADO */
	 $pagina2 = "<option value=''>SELECCIONAR</option>";  
	 $sql = "SELECT entrega_cobradorFK, 
                   (SELECT usu FROM cobrador WHERE cod_cobrador = entrega_cobradorFK) AS cobrador 
            FROM venta
            WHERE entrega_cobradorFK <> '' 
            GROUP BY entrega_cobradorFK";	   

    $stmt = $mysqli->prepare($sql);
    if (!$stmt->execute()) {
        echo json_encode(["1" => "error", "2" => "Error en consulta"]);
        exit;
    }

    $result = $stmt->get_result();

    while ($fila = $result->fetch_assoc()) {
        $cod_cobrador = $fila['entrega_cobradorFK'];
        $cobrador = $fila['cobrador']; // Si tu BD ya está en utf8, NO uses utf8_encode()
        $pagina2 .= "<option value='$cod_cobrador'>".htmlspecialchars($cobrador)."</option>";   
    }

    /*Retornamos los datos obtenidos mediante el JSON */      
    $informacion = [
        "1" => "exito",
        "2" => $pagina,
        "3" => $pagina2
    ];

    // Importante: especificar el header para que JS entienda que es JSON
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($informacion);
    exit;
}


function buscar_opciones_filtro_cobrador_info_cobradores()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobrador ) as nombre , cod_cobrador , estado  from cobrador where estado='Activo' and 
		(select count(*) from zona where cod_cobrador=cod_cobradorFK )>=1 order by nombre";
		
 
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

 $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $arrayCat = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $nombre=utf8_encode($valor['nombre']);
		      $cod_cobrador=utf8_encode($valor['cod_cobrador']);
		  	 
			 $check = "<input type='checkbox' id='$cod_cobrador' name='check_filtro_cobrador_info_cobradores' onclick='obteneridfiltroCobradorInfoCobradores(this)' checked />";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$nombre."</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
			 array_push($arrayCat,$cod_cobrador);
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta,"4" => $arrayCat);
echo json_encode($informacion);	
exit;
}


function buscar_opciones_filtro_local_info_cobradores()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "SELECT cod_local,Nombre FROM local WHERE estado = 'Activo' order by Nombre asc";
		
 
   
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 $arrayCat = array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cod_local=utf8_encode($valor['cod_local']);
			  $Nombre=utf8_encode($valor['Nombre']);
		  	 
			 $check = "<input type='checkbox' id='$cod_local' name='check_filtro_local_info_cobradores' onclick='obteneridfiltroLocalInfoCobradores(this)' checked />";
			  
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro'>
			  <td id='' style='width:50%' >".$Nombre."</td>
			  <td id='' style='width:50%' >".$check."</td>
			  </tr>
			  </table>";
			    	 
			 array_push($arrayCat,$cod_local);
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina,"3"=> $totalresouesta,"4" => $arrayCat);
echo json_encode($informacion);	
exit;
}


ObtenerDatos($operacion);

?>
