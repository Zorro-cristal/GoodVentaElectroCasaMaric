<?php
require("conexion.php");
include("verificar_navegador.php");
// include("buscar_nivel.php");
include("classTable.php");
include("cargar_archivo.php");
include("subir_foto_base64.php");
include('quitarseparadormiles.php');
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

$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);

$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$chapa=$_POST['chapa'];
$chapa = utf8_decode($chapa);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$idAbmVehivulos=$_POST['idAbmVehivulos'];
$idAbmVehivulos = utf8_decode($idAbmVehivulos);

$fotoperfilVehivulos= isset($_POST['lafoto']) ? $_POST['lafoto'] : null; 
$fotoperfilVehivulos = utf8_decode($fotoperfilVehivulos);

$local=$_POST['local'];
$local = utf8_decode($local);

abm($local,$fotoperfilVehivulos,$nombre,$descripcion,$chapa,$estado,$idAbmVehivulos,$operacion);

}

 
  
 if($operacion=="buscar"){
 	$chapa=$_POST["chapa"];
 	$chapa=utf8_decode($chapa);
	$descripcion=$_POST["descripcion"];
 	$descripcion=utf8_decode($descripcion);
	$nombre=$_POST["nombre"];
 	$nombre=utf8_decode($nombre);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
 
	
 	BuscarRegistro($local,$chapa,$descripcion,$nombre,$estado);
 } 
 
 
 
 if($operacion=="buscarDatosVehiculos")
{
 
$cod_localFKUSer=$_POST['cod_localFKUSer'];
$cod_localFKUSer = utf8_decode($cod_localFKUSer);


$vehiculo=$_POST['vehiculo'];
$vehiculo = utf8_decode($vehiculo);

buscarDatosVehiculos($vehiculo,$cod_localFKUSer);

}
 
 

if($operacion=="nuevoDetalleVehiculo" || $operacion=="editarDetalleVehiculo"|| $operacion=="FinalizarDetalleVehiculo" )
{

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$kilometroInicio=$_POST['kilometroInicio'];
$kilometroInicio = quitarseparadormiles($kilometroInicio);

$kilometroFin=$_POST['kilometroFin'];
$kilometroFin = quitarseparadormiles($kilometroFin);

$costo=$_POST['costo'];
$costo = quitarseparadormiles($costo);

$Cod_descripcion=$_POST['Cod_descripcion'];
$Cod_descripcion = utf8_decode($Cod_descripcion);
 
$observacion=$_POST['observacion'];
$observacion = utf8_decode($observacion);

$estadoDetalle=$_POST['estadoDetalle'];
$estadoDetalle = utf8_decode($estadoDetalle);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$idAbm=$_POST['idAbm'];
$idAbm = utf8_decode($idAbm);

$cod_Vehiculodetalle=$_POST['cod_Vehiculodetalle'];
$cod_Vehiculodetalle = utf8_decode($cod_Vehiculodetalle);

$idFkCobrador=$_POST['idFkCobrador'];
$idFkCobrador = utf8_decode($idFkCobrador);

abmDetalleVehiculo($idFkCobrador,$cod_Vehiculodetalle,$fecha,$kilometroInicio,$kilometroFin,$costo,$Cod_descripcion,$observacion,$estadoDetalle,$estado,$idAbm,$operacion);

}



  
 if($operacion=="buscarDetalleVehivulos"){
 	$detalle=$_POST["detalle"];
 	$detalle=utf8_decode($detalle);
	$observacion=$_POST["observacion"];
 	$observacion=utf8_decode($observacion);
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	$encargado=$_POST["encargado"];
 	$encargado=utf8_decode($encargado);
	
	$estadoDetalle=$_POST["estadoDetalle"];
 	$estadoDetalle=utf8_decode($estadoDetalle);
	
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
	$cod_Vehiculodetalle=$_POST["cod_Vehiculodetalle"];
 	$cod_Vehiculodetalle=utf8_decode($cod_Vehiculodetalle);
 
	
 	buscarDetalleVehivulos($detalle,$observacion,$fecha,$encargado,$estadoDetalle,$estado,$cod_Vehiculodetalle);
 } 
 
  
  
    
 if($operacion=="nuevokilometraje" || $operacion=="editarkilometraje"  ){
	$fecha=$_POST["fecha"];
 	$fecha=utf8_decode($fecha);
	
 	$nro=$_POST["kilometro"];
 	$nro=quitarseparadormiles($nro);
	
	$cod_encargadoFK=$_POST["idFkCobrador"];
 	$cod_encargadoFK=utf8_decode($cod_encargadoFK);
	
	$cod_vehiculoFK=$_POST["cod_Vehiculodetalle"];
 	$cod_vehiculoFK=utf8_decode($cod_vehiculoFK);
	
	$idAbm=$_POST["idAbm"];
 	$idAbm=utf8_decode($idAbm);
	 
 	abmKilometraje($idAbm,$fecha,$nro,$cod_encargadoFK,$cod_vehiculoFK,$operacion);
 } 
 
  
 if($operacion=="buscarabmkilometraje"){
	
	$cod_Vehiculodetalle=$_POST["cod_Vehiculodetalle"];
 	$cod_Vehiculodetalle=utf8_decode($cod_Vehiculodetalle);

 	buscarabmkilometraje($cod_Vehiculodetalle);
 } 
 
  
    
 if($operacion=="BuscarNotificaciones"){
 	BuscarNotificaciones();
 } 
 
 
   
 if($operacion=="buscarabmNotificaciones"){
	
	$cod_notificacion=$_POST["cod_notificacion"];
 	$cod_notificacion=utf8_decode($cod_notificacion);

 	buscarabmNotificaciones($cod_notificacion);
 } 
 
 
 
  
 if($operacion=="buscarInformeMantenimientoVehivulos"){
 	$fecha1=$_POST["fecha1"];
 	$fecha1=utf8_decode($fecha1);
	$fecha2=$_POST["fecha2"];
 	$fecha2=utf8_decode($fecha2);
	$vehiculo=$_POST["vehiculo"];
 	$vehiculo=utf8_decode($vehiculo);
	$detalle=$_POST["detalle"];
 	$detalle=utf8_decode($detalle);
	$encargado=$_POST["encargado"];
 	$encargado=utf8_decode($encargado);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado); 
	
 	buscarInformeMantenimientoVehivulos($estado,$fecha1,$fecha2,$vehiculo,$detalle,$encargado);
 } 
 
   
 
 
}



function buscarInformeMantenimientoVehivulos($estado,$fecha1,$fecha2,$vehiculo,$detalle,$encargado)
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	
 

$condicionfecha="";
	if($fecha1!=""  || $fecha2!=""){
		$condicionfecha=" and fecha between  '".$fecha1."' and  '".$fecha2."' ";
	}

$condicionencargado="";
	if($encargado!=""){
		$condicionencargado=" and cod_encargadoFK = '".$encargado."' ";
	}

$condicionvehiculo="";
	if($vehiculo!=""){
		$condicionvehiculo=" and (select concat(nombre,' ',chapa) from vehiculo where cod_vehiculoFK=cod_vehiculo) like '%".$vehiculo."%' ";
	}

$condiciondetalle="";
	if($detalle!=""){
		$condiciondetalle=" and (select nombre from tipo_detalle_vehiculo where idtipo_detalle_vehiculo=cod_tipo_detalle_vehiculoFK) like '%".$detalle."%' ";
	}

$condicionestado="";
	if($estado!=""){
		$condicionestado=" and estado_redistro = '".$estado."' ";
	}
	
	
		$sql= "SELECT iddetalle_vehiculo,fecha,nro_inicio,nro_fin,precio,estado,cod_vehiculoFK,cod_tipo_detalle_vehiculoFK,
		cod_encargadoFK,estado_redistro,observacion,
		(select nombre from tipo_detalle_vehiculo where idtipo_detalle_vehiculo=cod_tipo_detalle_vehiculoFK) as det_vehiculo , 
		(select nombre_persona from persona where cod_persona=cod_encargadoFK) as encargado,(select concat(nombre,' / ',chapa) from vehiculo where cod_vehiculoFK=cod_vehiculo) as vehiculo 
		from detalle_vehiculo dv 
		where dv.estado!=''  ".$condicionfecha.$condicionencargado.$condicionvehiculo." order  by  fecha desc , iddetalle_vehiculo desc  ";
	  	  

		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 $totalCosto  = 0; 
 $nroRegistro= $valor; 
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
				$iddetalle_vehiculo=$valor['iddetalle_vehiculo'];
				$fecha=$valor['fecha'];
		      $nro_inicio=utf8_encode($valor['nro_inicio']);
		  	  $nro_fin=utf8_encode($valor['nro_fin']); 
		  	  $precio=utf8_encode($valor['precio']); 
		  	  $estado=utf8_encode($valor['estado']); 
		  	  $cod_tipo_detalle_vehiculoFK=utf8_encode($valor['cod_tipo_detalle_vehiculoFK']); 
		  	  $cod_encargadoFK=utf8_encode($valor['cod_encargadoFK']); 
		  	  $estado_redistro=utf8_encode($valor['estado_redistro']); 
		  	  $observacion=utf8_encode($valor['observacion']); 
		  	  $det_vehiculo=utf8_encode($valor['det_vehiculo']); 
		  	  $encargado=utf8_encode($valor['encargado']); 
		  	  $vehiculo=utf8_encode($valor['vehiculo']); 
			$totalCosto = $totalCosto + $precio ;
 
		$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  style='width:15%'>".$vehiculo."</td>
<td  style='width:20%'>".$det_vehiculo."</td>
<td  style='width:10%'>".$fecha."</td>
<td  style='width:10%'>".number_format($precio,'0',',','.')."</td>
<td  style='width:15%'>".$encargado."</td>
<td  style='width:10%'>".number_format($nro_inicio,'0',',','.')."</td>
<td  style='width:10%'>".number_format($nro_fin,'0',',','.')."</td>
<td  style='width:10%'>".$estado_redistro."</td> 
</tr>
</table>";
		
			  
			  
	  }
	   
 }
 
  

  
$informacion =array("1" => "exito","2" => $pagina ,"3"=> number_format($nroRegistro,'0',',','.') ,"4"=> number_format($totalCosto,'0',',','.') );
echo json_encode($informacion);	
exit;
}

  


function buscarabmNotificaciones($cod_notificacion)
{
	
	$mysqli=conectar_al_servidor();
	 
 
	
		$sql= "SELECT iddetalle_vehiculo,fecha,nro_inicio,nro_fin,precio,estado,cod_vehiculoFK,cod_tipo_detalle_vehiculoFK,
		cod_encargadoFK,estado_redistro,observacion,
		(select nombre from tipo_detalle_vehiculo where idtipo_detalle_vehiculo=cod_tipo_detalle_vehiculoFK) as det_vehiculo , 
		(select nombre_persona from persona where cod_persona=cod_encargadoFK) as encargado
		from detalle_vehiculo dv  where  dv.iddetalle_vehiculo='".$cod_notificacion."' ";
	  	  

		  	 
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
				$iddetalle_vehiculo=$valor['iddetalle_vehiculo'];
				$fecha=$valor['fecha'];
		      $nro_inicio=utf8_encode($valor['nro_inicio']);
		  	  $nro_fin=utf8_encode($valor['nro_fin']); 
		  	  $precio=utf8_encode($valor['precio']); 
		  	  $estado=utf8_encode($valor['estado']); 
		  	  $cod_tipo_detalle_vehiculoFK=utf8_encode($valor['cod_tipo_detalle_vehiculoFK']); 
		  	  $cod_encargadoFK=utf8_encode($valor['cod_encargadoFK']); 
		  	  $estado_redistro=utf8_encode($valor['estado_redistro']); 
		  	  $observacion=utf8_encode($valor['observacion']); 
		  	  $det_vehiculo=utf8_encode($valor['det_vehiculo']); 
		  	  $encargado=utf8_encode($valor['encargado']); 
 

					$informacion =array("1" => "exito",
					"2" => $det_vehiculo ,
					"3" => $observacion ,
					"4" => $fecha ,
					"5" => $estado_redistro ,
					"6" => number_format($precio,'0',',','.') ,
					"7" => number_format($nro_inicio,'0',',','.') ,
					"8" => number_format($nro_fin,'0',',','.') );
					echo json_encode($informacion);	
					exit;
		
			  
			  
	  }
	   
 }
 
}



  
function BuscarNotificaciones()
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	
	
		$sql= "SELECT iddetalle_vehiculo, fecha ,nro_inicio,nro_fin ,precio ,estado,cod_vehiculoFK ,cod_tipo_detalle_vehiculoFK ,cod_encargadoFK ,estado_redistro, observacion ,(select nombre from tipo_detalle_vehiculo where idtipo_detalle_vehiculo=cod_tipo_detalle_vehiculoFK) as det_vehiculo , 
		ifnull((select nro from kilometraje k where  k.cod_vehiculoFK= dv.cod_vehiculoFK order by nro desc limit 1),0) as kilometro , 
        (ifnull(nro_fin -(select nro from kilometraje k where  k.cod_vehiculoFK= dv.cod_vehiculoFK order by nro desc limit 1),0)) as dif,
		(select concat(nombre,' / ',chapa) from vehiculo where cod_vehiculoFK=cod_vehiculo) as vehiculo 
		from detalle_vehiculo dv  where dv.estado_redistro='ACTIVO' and dv.estado='Activo' and 
        (ifnull(nro_fin -(select nro from kilometraje k where  k.cod_vehiculoFK= dv.cod_vehiculoFK order by nro desc limit 1),0))< 100 ";
	  	  

		  	 
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
		  
		  
		      $iddetalle_vehiculo=$valor['iddetalle_vehiculo'];
		      $nro_fin=$valor['nro_fin'];
		      $det_vehiculo=utf8_encode($valor['det_vehiculo']); 
		      $kilometro=utf8_encode($valor['kilometro']); 
		      $vehiculo=utf8_encode($valor['vehiculo']); 
			$resultado= $nro_fin - $kilometro;
			
			if($resultado<=0){
				
				$pagina.="<a class='list-group-item' id='".$iddetalle_vehiculo."' onclick='ObtenerdatosAbmNotificaciones(this)' >
										<div class='row g-0 align-items-center'>
											<div class='col-2'>
												<i class='text-danger bx bx-error-circle'  data-feather='alert-circle'></i>
											</div>
											<div class='col-10'>
												<div class='text-dark'> Urgente- ".$vehiculo."</div>
												<div class='text-muted small mt-1'>".$det_vehiculo."</div>
												<div class='text-muted small mt-1'>Mantenimiento en: ".number_format($resultado,'0',',','.')." KM</div>
											</div>
										</div>
							</a> ";
				
				
				
			}else{
				
				$pagina.="<a   class='list-group-item' id='".$iddetalle_vehiculo."' onclick='ObtenerdatosAbmNotificaciones(this)' >
										<div class='row g-0 align-items-center'>
											<div class='col-2'>
												<i class='text-warning bx bx-bell' data-feather='bell'></i>
											</div>
											<div class='col-10'>
												<div class='text-dark'> Advertencia- ".$vehiculo."</div>
												<div class='text-muted small mt-1'>".$det_vehiculo."</div>
												<div class='text-muted small mt-1'>Mantenimiento en: ".number_format($resultado,'0',',','.')." KM</div>
											</div>
										</div>
							</a>";
				
				
			}
				 
		
			  
			  
	  }
	   
 }
 
  

  
$informacion =array("1" => "exito","2" => $pagina ,"3"=> number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}

  

/*Funcion para insertar,modificar o eliminar registros*/
function abmDetalleVehiculo($idFkCobrador,$cod_Vehiculodetalle,$fecha,$kilometroInicio,$kilometroFin,$costo,$Cod_descripcion,$observacion,$estadoDetalle,$estado,$idAbm,$operacion)
{

 

$mysqli=conectar_al_servidor(); 
/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d | h:i:sa', time()); 
	 $user=$_POST['useru'];
    $user = utf8_decode($user);
if($operacion=="nuevoDetalleVehiculo") 
{
$consulta1="Insert into detalle_vehiculo (fecha,nro_inicio,nro_fin,precio,estado,cod_vehiculoFK,cod_tipo_detalle_vehiculoFK,cod_encargadoFK,estado_redistro,observacion)
values('$fecha','$kilometroInicio','$kilometroFin','$costo','$estado','$cod_Vehiculodetalle','$Cod_descripcion','$idFkCobrador','$estadoDetalle','$observacion')";


$stmt1 = $mysqli->prepare($consulta1);
 
}

if($operacion=="editarDetalleVehiculo")
{

$consulta1="Update detalle_vehiculo set fecha=?,nro_inicio=?,nro_fin=?,precio=?,estado=?,cod_vehiculoFK=?,cod_tipo_detalle_vehiculoFK=?,cod_encargadoFK=?,estado_redistro=?,observacion=? where iddetalle_vehiculo=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssssss';
$stmt1->bind_param($ss,$fecha,$kilometroInicio,$kilometroFin,$costo,$estado,$cod_Vehiculodetalle,$Cod_descripcion,$idFkCobrador,$estadoDetalle,$observacion,$idAbm);

}


if($operacion=="FinalizarDetalleVehiculo")
{

$consulta1="Update detalle_vehiculo set estado_redistro=?  where iddetalle_vehiculo=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ss';
$stmt1->bind_param($ss,$estadoDetalle,$idAbm);

}


if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

if($operacion!="FinalizarDetalleVehiculo"){
$KilometrajeVehivulo=obtenerKMMaximoVehiculo($cod_Vehiculodetalle);
$KilometrajeActual=obtenerKilometrajeVehiculo($cod_Vehiculodetalle);

if($KilometrajeActual<=$KilometrajeVehivulo){
	abmKilometraje("",$fecha,$kilometroInicio,$idFkCobrador,$cod_Vehiculodetalle,"nuevokilometraje");
}

}

$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}


function obtenerKMMaximoVehiculo($cod_Vehiculodetalle)
{
	$nro_inicio =0;
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select nro_inicio from detalle_vehiculo where cod_vehiculoFK='$cod_Vehiculodetalle' order by nro_inicio desc limit 1";
	
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
		      $nro_inicio=$valor['nro_inicio'];	  	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $nro_inicio;
}


function obtenerKilometrajeVehiculo($cod_Vehiculodetalle)
{
	$nro =0;
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select nro from kilometraje where cod_vehiculoFK='$cod_Vehiculodetalle' order by  nro limit 1";
	
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
		      $nro=$valor['nro'];	  	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $nro;
}


function buscarDetalleVehivulos($detalle,$observacion,$fecha,$encargado,$estadoDetalle,$estado,$cod_Vehiculodetalle)
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	
 
	$condiciondetalle="";
	if($detalle!=""){
		$condiciondetalle=" and cod_tipo_detalle_vehiculoFK = '".$detalle."' ";
	}
	 
	$condicionobservacion="";
	if($observacion!=""){
		$condicionobservacion=" and observacion like '%".$observacion."%' ";
	}

$condicionfecha="";
	if($fecha!=""){
		$condicionfecha=" and fecha = '".$fecha."' ";
	}

$condicionencargado="";
	if($encargado!=""){
		$condicionencargado=" and cod_encargadoFK = '".$encargado."' ";
	}

$condicionestadoDetalle="";
	if($estadoDetalle!=""){
		$condicionestadoDetalle=" and estado_redistro = '".$estadoDetalle."' ";
	}	
	
		$sql= "SELECT iddetalle_vehiculo,fecha,nro_inicio,nro_fin,precio,estado,cod_vehiculoFK,cod_tipo_detalle_vehiculoFK,
		cod_encargadoFK,estado_redistro,observacion,
		(select nombre from tipo_detalle_vehiculo where idtipo_detalle_vehiculo=cod_tipo_detalle_vehiculoFK) as det_vehiculo , 
		(select nombre_persona from persona where cod_persona=cod_encargadoFK) as encargado
		from detalle_vehiculo dv 
		where dv.estado='".$estado."' and dv.cod_vehiculoFK='".$cod_Vehiculodetalle."' ".$condiciondetalle.$condicionobservacion.$condicionfecha.$condicionencargado.$condicionestadoDetalle." order  by  fecha desc , iddetalle_vehiculo desc limit 300";
	  	  

		  	 
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
				$iddetalle_vehiculo=$valor['iddetalle_vehiculo'];
				$fecha=$valor['fecha'];
		      $nro_inicio=utf8_encode($valor['nro_inicio']);
		  	  $nro_fin=utf8_encode($valor['nro_fin']); 
		  	  $precio=utf8_encode($valor['precio']); 
		  	  $estado=utf8_encode($valor['estado']); 
		  	  $cod_tipo_detalle_vehiculoFK=utf8_encode($valor['cod_tipo_detalle_vehiculoFK']); 
		  	  $cod_encargadoFK=utf8_encode($valor['cod_encargadoFK']); 
		  	  $estado_redistro=utf8_encode($valor['estado_redistro']); 
		  	  $observacion=utf8_encode($valor['observacion']); 
		  	  $det_vehiculo=utf8_encode($valor['det_vehiculo']); 
		  	  $encargado=utf8_encode($valor['encargado']); 

 
		$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmDetalleVehivulos(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$iddetalle_vehiculo."</td>
<td  id='td_datos_1' style='width:15%'>".$det_vehiculo."</td>
<td  id='td_datos_2' style='width:15%'>".$observacion."</td>
<td  id='td_datos_3' style='width:10%'>".$fecha."</td>
<td  id='td_datos_4' style='width:10%'>".number_format($precio,'0',',','.')."</td>
<td  id='td_datos_5' style='width:10%'>".number_format($nro_inicio,'0',',','.')."</td>
<td  id='td_datos_6' style='width:10%'>".number_format($nro_fin,'0',',','.')."</td>
<td  id='td_datos_7' style='width:15%'>".$encargado."</td>
<td  id='td_datos_8' style='width:10%'>".$estado_redistro."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_10' style='display:none'>".$cod_tipo_detalle_vehiculoFK."</td>
<td  id='td_datos_11' style='display:none'>".$cod_encargadoFK."</td>
</tr>
</table>";
		
			  
			  
	  }
	   
 }
 
  

  
$informacion =array("1" => "exito","2" => $pagina ,"3"=> number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}

  
function buscarDatosVehiculos($vehiculo,$cod_localFKUSer)
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	
 
		$condiconCodLocal = '';
		if($cod_localFKUSer=='1' || $cod_localFKUSer == '8'){
			$condiconCodLocal = ' and cod_localFK in(1,8)';
		}else{
			$condiconCodLocal = " and cod_localFK ='$cod_localFKUSer'";
		}
		
	 
	$condicionvehiculo="";
	if($vehiculo!=""){
		$condicionvehiculo=" and concat(nombre,' ',descripcion,' ',chapa) like '%".$vehiculo."%' ";
	}	
	
		$sql= "SELECT  cod_vehiculo,nombre,descripcion,chapa,estado,url,cod_localFK,
		ifnull((select nro from kilometraje where  cod_vehiculo= cod_vehiculoFK order by nro desc limit 1),0) as kilometro
		from vehiculo v 
		where v.estado='activo' ".$condicionvehiculo.$condiconCodLocal." ";
 
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
		  
		  
		      $cod_vehiculo=$valor['cod_vehiculo'];
		      $nombre=utf8_encode($valor['nombre']);
		  	  $descripcion=utf8_encode($valor['descripcion']); 
		  	  $url_img=utf8_encode($valor['url']); 
		  	  $chapa=utf8_encode($valor['chapa']); 
		  	  $estado=utf8_encode($valor['estado']); 
		  	  $cod_localFK=utf8_encode($valor['cod_localFK']); 
		  	  $kilometro=utf8_encode($valor['kilometro']); 

 
				 $pagina.="<div class='sales' style='margin:5%;' >
				<h3>".$nombre." - ".$chapa."</h3>
                        <div>
                            <div  class='imgFotoCi' style='background-image: url(".$url_img.")'></div>
                        </div>
						<div class='info'> 
                            <h1 style='font-size: 1.2rem;' >Kilometraje:".number_format($kilometro,'0',',','.')." </h1>
<div class='info'> 
<input type='button' value='Mantenimiento' class='btn4' id='$cod_vehiculo' data-url='".$nombre." ".$chapa."' data-email='".$cod_vehiculo."' onclick='verCerrarDetalleVehivulos(this)' style='background-color: #4caf50;margin: 2%;width: 55%;color: #e9e9e9;font-size: 15px;'>							
 
<input type='button' value='Kilometraje' class='btn4' id='$cod_vehiculo' data-url='".$nombre." ".$chapa."' data-email='".$cod_vehiculo."' onclick='verCerrarkilometraje(this)'  style='background-color: #dc3545;margin: 2%;width: 55%;color: #e9e9e9;font-size: 15px;'>							
							
</div>
                        </div>
                </div> ";
		
			  
			  
	  }
	   
 }
 
  

  
$informacion =array("1" => "exito","2" => $pagina ,"3"=> number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}

 

/*Funcion para insertar,modificar o eliminar registros*/
function abm($local,$fotoperfilVehivulos,$nombre,$descripcion,$chapa,$estado,$idAbmVehivulos,$operacion)
{

if($nombre==""  ){
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
$consulta1="Insert into vehiculo ( nombre, descripcion, chapa, estado, cod_localFK)
values(?,?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$nombre,$descripcion,$chapa,$estado,$local);
 
}

if($operacion=="editar")
{

$consulta1="Update vehiculo set nombre=?, descripcion=?, chapa=?, estado=?, cod_localFK=? where cod_vehiculo=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$nombre,$descripcion,$chapa,$estado,$local,$idAbmVehivulos);

}
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 
if($fotoperfilVehivulos!=''){
	if($idAbmVehivulos==""){
		$idAbmVehivulos=obtenerUltimaId();
	}	
	cargarFotos($idAbmVehivulos);
}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

 
function obtenerUltimaId()
{
	$cod_vehiculo ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select cod_vehiculo from vehiculo order by cod_vehiculo desc limit 1";
	
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
		      $cod_vehiculo=$valor['cod_vehiculo'];	  	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $cod_vehiculo;
}


function cargarFotos($idAbmVehivulos){
	
$extperfilVehivulos=$_POST['extperfilVehivulos'];
$extperfilVehivulos = utf8_decode($extperfilVehivulos);

 $fotovehiculo=substr($_POST['fotovehiculo'], strpos($_POST['fotovehiculo'], ",") + 1);;
$fotovehiculo = base64_decode($fotovehiculo);
$id_foto="";		  
		     $donde="../fotos/fotoPerfil/";
			  $id_foto=$idAbmVehivulos;
                $id_f=subir_imagen_base64($donde,$fotovehiculo,$id_foto,$extperfilVehivulos);
$ruta="/GoodVentaElectroCasaMaric/fotos/fotoPerfil/".$idAbmVehivulos.$id_f.'.'.$extperfilVehivulos;

$mysqli=conectar_al_servidor();
	$consulta="UPDATE vehiculo SET url = '$ruta' WHERE cod_vehiculo  = '$idAbmVehivulos'";	
	$stmt = $mysqli->prepare($consulta);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}

	
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

 
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
function BuscarRegistro($local,$chapa,$descripcion,$nombre,$estado)
{
$mysqli=conectar_al_servidor();
$condicionchapa="";
if($chapa!=""){
	$condicionchapa=" and chapa like '%".$chapa."%'";
}
$condiciondescripcion="";
if($descripcion!=""){
	$condiciondescripcion=" and descripcion like '%".$descripcion."%'";
}

$condicionlocal="";
if($local!=""){
	$condicionlocal=" and cod_localFK = '".$local."'";
}

$condicionnombre="";
if($nombre!=""){
	$condicionnombre=" and nombre like '%".$nombre."%'";
}
 
$sql= "select cod_vehiculo, nombre, descripcion, chapa, estado, cod_localFK, url,
(Select Nombre from local where cod_local=cod_localFK ) as local  
from  vehiculo 
where estado=? ".$condicionchapa.$condiciondescripcion.$condicionnombre.$condicionlocal ;
$pagina = "";   
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
 
$descripcion = utf8_encode($valor['descripcion']);   
$nombre = utf8_encode($valor['nombre']); 
$estado = utf8_encode($valor['estado']); 
$cod_vehiculo = utf8_encode($valor['cod_vehiculo']); 
$chapa = utf8_encode($valor['chapa']);  
$url = utf8_encode($valor['url']);  
$cod_localFK = utf8_encode($valor['cod_localFK']);  
$local = utf8_encode($valor['local']); 
 

 

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmVehivulos(this)'>
<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$cod_vehiculo."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre."</td>
<td  id='td_datos_2' style='width:30%'>".$descripcion."</td>
<td  id='td_datos_3' style='width:20%'>".$chapa."</td> 
<td  id='td_datos_4' style='width:20%'>".$local."</td> 
<td  id='td_datos_5' style='display:none'>".$estado."</td>
<td  id='td_datos_6' style='display:none'>".$url."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localFK."</td> 
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}

  
/*Funcion para insertar,modificar o eliminar registros*/
function abmKilometraje($idAbm,$fecha,$nro,$cod_encargadoFK,$cod_vehiculoFK,$operacion)
{

$mysqli=conectar_al_servidor(); 
 
 if($operacion=="nuevokilometraje")
{
$consulta1="Insert into kilometraje ( fecha,nro,cod_encargadoFK,cod_vehiculoFK) values (?,?,?,?)";

$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$fecha,$nro,$cod_encargadoFK,$cod_vehiculoFK);
}
if($operacion=="editarkilometraje")
{

$consulta1="Update kilometraje set fecha=?,nro=?,cod_encargadoFK=?,cod_vehiculoFK=? where idkilometraje=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssss';
$stmt1->bind_param($ss,$fecha,$nro,$cod_encargadoFK,$cod_vehiculoFK,$idAbm);

}
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
  

$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}


 
function buscarabmkilometraje($cod_Vehiculodetalle)
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	
  
	
		$sql= "SELECT idkilometraje ,fecha ,nro,cod_encargadoFK ,cod_vehiculoFK ,(select nombre_persona from persona where cod_persona=cod_encargadoFK) as encargado
		from kilometraje k 
		where  k.cod_vehiculoFK='".$cod_Vehiculodetalle."'   order  by  idkilometraje desc  limit 300";
	  	  

		  	 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 $nroRegistro= $valor;
 
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
			$idkilometraje=$valor['idkilometraje'];
			$fecha=$valor['fecha'];
		    $nro=utf8_encode($valor['nro']);
		  	$cod_encargadoFK=utf8_encode($valor['cod_encargadoFK']); 
		  	$cod_vehiculoFK=utf8_encode($valor['cod_vehiculoFK']); 
		  	$encargado=utf8_encode($valor['encargado']); 
		  	  
		$styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmkilometraje(this)'>
<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$idkilometraje."</td> 
<td  id='td_datos_1' style='width:25%'>".number_format($nro,'0',',','.')."</td> 
<td  id='td_datos_2' style='width:25%'>".$fecha."</td>
<td  id='td_datos_3' style='width:25%'>".$encargado."</td> 
</tr>
</table>";
 
	  }
	   
 }
 
  

  
$informacion =array("1" => "exito","2" => $pagina ,"3"=> number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}




ObtenerDatos($operacion);

?>