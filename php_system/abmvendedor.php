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

$montoCredito=$_POST['montoCredito'];
$montoCredito = quitarseparadormiles($montoCredito);

$montoContado=$_POST['montoContado'];
$montoContado = quitarseparadormiles($montoContado);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor); 

$estado =$_POST['estado'];
$estado = utf8_decode($estado); 
	abm_metas($estado,$idAbmMetaVendedor,$montoCredito,$montoContado,$fecha,$vendedor ,$operacion);

}
	
if($operacion=="nuevo" || $operacion=="editar")
{
	
	
	$idvendedor=$_POST['idvendedor'];
$idvendedor = utf8_decode($idvendedor);
$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);
	$nrotelef=$_POST['nrotelef'];
$nrotelef = utf8_decode($nrotelef);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$cod_localfk=$_POST['cod_localfk'];
$cod_localfk = utf8_decode($cod_localfk);
$sector=$_POST['sector'];
$sector = utf8_decode($sector);
$cod_usuarioFK=$_POST['cod_usuarioFK'];
$cod_usuarioFK = utf8_decode($cod_usuarioFK);
$control=$_POST['control'];
$control = utf8_decode($control);



	abm($cod_usuarioFK,$control,$nombre,$nrotelef,$estado,$idvendedor,$cod_localfk,$sector,$operacion);

}

if($operacion=="buscarVendedorLocales")
{
$cod_localvendedor=$_POST['cod_localvendedor'];
$cod_localvendedor = utf8_decode($cod_localvendedor);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarVendedorLocales($cod_localvendedor,$formato);

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
$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$cod_local=$_POST['cod_local'];
$cod_local = utf8_decode($cod_local);
$sector=$_POST['sector'];
$sector = utf8_decode($sector);
if($cod_local==""){
$controllocal=controldeaccesoacasas($user,"CAMBIARLOCAL"," u.accion='SI' ");
	if($controllocal==0){
		$cod_local=buscarlocaluser($user);
	}
	

}
buscar($codigo,$vendedor,$estado,$cod_local,$sector);
}	
if($operacion=="buscarselect")
{
buscarselect();
}

if($operacion=="buscarselectcontrolcalificacion")
{
buscarselectcontrolcalificacion();
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
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarLoteamientoVendedor($cod_local,$formato);

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
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';
buscarMetas($fecha1,$fecha2,$local,$sector,$tipo,$nombre_vendedor,$formato);

}

}

function abm($cod_usuarioFK,$control,$nombre,$nrotelef,$estado,$idvendedor,$cod_localfk,$sector,$operacion)
{
	
	
if($nombre=="" || $sector =="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

if($operacion=="nuevo") 
{


$consulta1="Insert into vendedor (nombre,nrotelef,estado,cod_localfk,sector,cod_usuarioFK,control_vendedor)
values(?,?,?,?,?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssss';
$stmt1->bind_param($ss,$nombre,$nrotelef,$estado,$cod_localfk,$sector,$cod_usuarioFK,$control);


}


if($operacion=="editar")
{

$consulta1="Update vendedor set nombre=?,nrotelef=?,estado=?,cod_localfk=?,sector=?,cod_usuarioFK=?,control_vendedor=? where idvendedor=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssss';
$stmt1->bind_param($ss,$nombre,$nrotelef,$estado,$cod_localfk,$sector,$cod_usuarioFK,$control,$idvendedor); 

}




if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

if($operacion=="nuevo")
{
	$idvendedor= obtenerUltimaId() ;
}

asegurarDetalleVendedorLocal($mysqli,$idvendedor,$cod_localfk);
cargarFotos($idvendedor);


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
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

function asegurarDetalleVendedorLocal($mysqli,$idvendedor,$cod_localfk)
{
	if($idvendedor=="" || $cod_localfk==""){
		return;
	}

	$consulta="Select count(*) as contador from detallevendedor where cod_localFK=? and cod_vendedorFK=? ";
	$stmt = $mysqli->prepare($consulta);
	$ss='ss';
	$stmt->bind_param($ss,$cod_localfk,$idvendedor);
	if ( ! $stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$contador=0;
	if ($valor= mysqli_fetch_assoc($result))
	{
		$contador=$valor['contador'];
	}

	if($contador=="0"){
		$consulta1="Insert into detallevendedor (cod_localFK,cod_vendedorFK,accion) values(?,?,'SI')";
		$stmt1 = $mysqli->prepare($consulta1);
		$stmt1->bind_param($ss,$cod_localfk,$idvendedor);
		if (!$stmt1->execute()) {
			echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
			exit;
		}
	}
}






function buscar($codigo,$vendedor,$estado,$cod_local,$sector)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$condicioncodigo="";
if($codigo!=""){
	$condicioncodigo=" and idvendedor ='".$codigo."'";
}
$condicionvendedor="";
if($vendedor!=""){
	$condicionvendedor=" and nombre  like '%".$vendedor."%'";
}
$condicionlocal="";
if($cod_local!=""){
	$condicionlocal=" and cod_localfk = '".$cod_local."'";
}

$condicionsector="";
if($sector!=""){
	$condicionsector=" and sector = '".$sector."'";
}
	 
		$sql= "Select idvendedor, nombre, nrotelef, estado, cod_localfk,sector,url,control_vendedor,cod_usuarioFK,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local
		from vendedor where estado=? ".$condicioncodigo.$condicionvendedor.$condicionlocal.$condicionsector;
		
   
   
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
		  
		  
		      $idvendedor=$valor['idvendedor'];
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $nrotelef=utf8_encode($valor['nrotelef']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $local=utf8_encode($valor['local']);
		  	  $sector=utf8_encode($valor['sector']);
		  	  $url=utf8_encode($valor['url']);
		  	  $cod_localfk=utf8_encode($valor['cod_localfk']);
		  	  $control_vendedor=utf8_encode($valor['control_vendedor']);
		  	  $cod_usuarioFK=utf8_encode($valor['cod_usuarioFK']);
			  $filas[]=array(
				  "codigo" => $idvendedor,
				  "vendedor" => $nombre,
				  "telefono" => $nrotelef,
				  "sector" => $sector,
				  "local" => $local,
				  "estado" => $estado,
				  "url_imagen" => $url,
				  "codigo_local" => $cod_localfk,
				  "control_vendedor" => $control_vendedor,
				  "codigo_usuario" => $cod_usuarioFK
			  );
		  	 
		  	 
			if($formato !== "json") {
		  	  $pagina.="
<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmVendedor(this)'>
<td id='td_id' style='width:10%; background-color: #efeded;color:red'>".$idvendedor."</td>
<td  id='td_datos_1' style='width:20%'>".$nombre."</td>
<td  id='td_datos_2' style='width:20%'>".$nrotelef."</td>
<td  id='td_datos_5' style='width:10%'>".$sector."</td>
<td  id='td_datos_4' style='width:20%'>".$local."</td>
<td  id='td_datos_3' style='display:none'>".$estado."</td>
<td  id='td_datos_6' style='display:none'>".$url."</td>
<td  id='td_datos_7' style='display:none'>".$cod_localfk."</td>
<td  id='td_datos_8' style='display:none'>".$control_vendedor."</td>
<td  id='td_datos_9' style='display:none'>".$cod_usuarioFK."</td>
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
	$pagina='';
	$pagina.="<option  value='' >SELECCIONAR</option>";   
	$sql= "Select idvendedor, nombre, nrotelef, estado, cod_localfk,
	(select Nombre from local where cod_local=cod_localfk limit 1 ) as local
	from vendedor where estado='Activo' ";	   
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
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $nrotelef=utf8_encode($valor['nrotelef']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $local=utf8_encode($valor['local']);
		  	 
		  	 
			    	 
		  	  $pagina.="<option  value='$idvendedor' >".$nombre."</option>";   
			  
			  
	  }
 }
 
 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}


function buscarselectcontrolcalificacion()
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$pagina.="<option  value='' >SELECCIONAR</option>";   
	$sql= "Select idvendedor, nombre, nrotelef, estado, cod_localfk,
	(select Nombre from local where cod_local=cod_localfk limit 1 ) as local
	from vendedor where estado='Activo' and control_vendedor = '1' ";	   
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
		  	  $nombre=utf8_encode($valor['nombre']);
		  	  $nrotelef=utf8_encode($valor['nrotelef']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $local=utf8_encode($valor['local']);
		  	 
		  	 
			    	 
		  	  $pagina.="<option  value='$idvendedor' >".$nombre."</option>";   
			  
			  
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
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	 $filas=array();
	 $condicionlocal="";
if($codlocal!=""){
	$condicionlocal=" and (
		exists (
			select 1 from detallevendedor dt
			where dt.cod_vendedorFK = v.idvendedor
			and dt.cod_localFK = ?
			and dt.accion='SI'
			limit 1
		)
		or (
			v.cod_localfk = ?
			and not exists (
				select 1 from detallevendedor dt2
				where dt2.cod_vendedorFK = v.idvendedor
				and dt2.cod_localFK = ?
				limit 1
			)
		)
	)";
}else{
	$condicionlocal=" and (
		exists (
			select 1 from detallevendedor dt
			where dt.cod_vendedorFK = v.idvendedor
			and dt.accion='SI'
			limit 1
		)
		or not exists (
			select 1 from detallevendedor dt2
			where dt2.cod_vendedorFK = v.idvendedor
			limit 1
		)
	)";
}
		$sql= "Select v.* from vendedor v
		where v.nombre like ? and v.estado='Activo' ".$condicionlocal." order by v.idvendedor asc ";
		
   // echo($sql);
   // exit;
   
   $stmt = $mysqli->prepare($sql);
$buscar="%".$buscar."%";
//$buscar="".$buscar."";
if($codlocal!=""){
  	$ssss='ssss';
	$stmt->bind_param($ssss,$buscar,$codlocal,$codlocal,$codlocal);
}else{
  	$s='s';
	$stmt->bind_param($s,$buscar);
}

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
			  $filas[]=array(
				  'codigo'=>$idvendedor,
				  'vendedor'=>$nombre,
				  'telefono'=>$nrotelef,
				  'estado'=>$estado
			  );
		  	 
		  	 
			    	 
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
$informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}




function buscarLoteamientoVendedor($cod_local,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	

$condicionlocal="";
if($cod_local!=""){
	$condicionlocal=" and cod_localfk = '".$cod_local."'";
}
	 
		$sql= "Select idvendedor, nombre, nrotelef, estado, cod_localfk,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local
		from vendedor where estado!='' ".$condicionlocal;
		
 
   
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
			 $NroMetasRaw=$NroMetas;
			 $NroMetas=number_format($NroMetas,'0',',','.');
			 $idMetas=$Accion[1];
			 $filas[]=array(
				 "codigo" => $idvendedor,
				 "vendedor" => $nombre,
				 "meta" => $NroMetasRaw,
				 "meta_formateada" => $NroMetas,
				 "id_meta_control" => $idMetas,
				 "id_meta" => isset($Accion[2]) ? $Accion[2] : ''
			 );
			 $Style="style=' text-align: center;
				background-color: cadetblue;
				color: white;'";
				$inputcheck="<input  name='".$idMetas."' class='inputText' $Style value='$NroMetas'  type='text' onkeyup='separadordemiles(this); if(event.keyCode == 13){abmaccesoMetas(this)}'  />";
			  if($formato!='json'){
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
 }
 
 
  $informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}




function buscarAccion($idAbm)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select idMetas, montoCredito, montoContado, Estado, Cod_vendedorFK
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
 $montoContado="0";
 $montoCredito="0";
 $idMetas = '0';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $montoCredito=$valor['montoCredito']; 
		      $montoContado=$valor['montoContado'];
			  $idMetas=$valor['idMetas']; 			  
	  }
 }

 $Resultado[0]= $montoContado;
 $Resultado[1]= $montoCredito;
 $Resultado[2]= $idMetas;

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
 
function buscarMetas($fecha1,$fecha2,$codlocal,$sector,$tipo,$nombre_vendedor,$formato='')
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
		$condicionnombrevendedor=" and nombre LIKE '%".$nombre_vendedor."%' ";
	}
	
	
		$sql= "Select idvendedor, nombre, nrotelef,  cod_localfk,url,m.fecha,m.montoContado,m.montoCredito,m.idMetas,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local , DATE_FORMAT(fecha, '%Y-%m') as mes , m.Estado,
		(((select ifnull(sum(total_venta),0) from venta vt where Vendedor1=cod_vendedorFK and DATE_FORMAT(fecha_venta, '%Y-%m') between  '$fechames1' and '$fechames2'  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0 ) *100 ) / m.montoContado ) as TotalVenta
		from metas  m
		inner join vendedor ve on ve.idvendedor = m.cod_vendedorFK
		where ve.estado='activo' and m.Estado='Activo' ".$condicionFecha.$condicionLocal.$condicionsector.$condicionnombrevendedor."   group by idMetas asc order by mes asc ";
	  	  

		  	 
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
 
 
  $VentaContado=0;
  $VentaCredito=0;
  
  $paginaArray1=array();
  $paginaArray2=array();
  $paginaSumaArray1=array();
  $paginaSumaArray2=array();
 $contadorarray=0;
 $datos=array();
 $filas=array();
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idvendedor=$valor['idvendedor'];
		      $nombre=utf8_encode($valor['nombre']);
		  	  $nrotelef=utf8_encode($valor['nrotelef']);
		  	  $local=utf8_encode($valor['local']);
		  	  $url_img=utf8_encode($valor['url']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $montoContado=utf8_encode($valor['montoContado']);
		  	  $montoCredito=utf8_encode($valor['montoCredito']);
		  	  $idAbm=utf8_encode($valor['idMetas']);
		  	  $mes=utf8_encode($valor['mes']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	  $TotalVenta=utf8_encode($valor['TotalVenta']);
		  	   


			  
			 $Accion=buscarAccion($idAbm);
		  	 $NroMetasContado  = !empty($Accion[0]) ? $Accion[0] : 1;
			 $NroMetasCredito  = !empty($Accion[1]) ? $Accion[1] : 1;
			 
$TotalMetasVendedor=0;
			 
switch ($tipo) {
    case "CONTADO":
	
	
        if ($NroMetasContado > 1) {
            $totalMetas += $NroMetasContado;
			$TotalMetasVendedor=$NroMetasContado;
        }
        break;

    case "CREDITO":
        if ($NroMetasCredito > 1) {
            $totalMetas += $NroMetasCredito;
			$TotalMetasVendedor=$NroMetasCredito;
        }
        break;

    default:
	
	
        if ($NroMetasContado > 1) {
            $totalMetas += $NroMetasContado;
			$TotalMetasVendedor +=$NroMetasContado;
        }
        if ($NroMetasCredito > 1) {
            $totalMetas += $NroMetasCredito;
			$TotalMetasVendedor +=$NroMetasCredito;
        }
        break;
}

			 
			 
			 $totalVentas =buscarTotalVentaVendedor($idvendedor,$mes,$codlocal,$tipo,$fecha1,$fecha2);
			 
				$VentaContado=$totalVentas[0];
				$VentaCredito=$totalVentas[1];
				
			 $TotalVenta2 = $totalVentas[2];
				$totalVentaResultado  += $TotalVenta2;			 
			 
			 $puntos =buscarTotalPuntos($idvendedor,$mes,$codlocal,$tipo,$fecha1,$fecha2);

 
			 
			$pnt="";
if($puntos!='0'){	
	$pnt=" <h2 style='position: absolute; top: 10px; right: 10px; background-color: #f44336; color: white; margin: 0; padding: 5px 10px; border-radius: 5px;'> ".$puntos." pts</h2> ";
}
			
$ResultadoContado = ($NroMetasContado > 1) ? ($VentaContado * 100) / $NroMetasContado : 100;
$ResultadoCredito = ($NroMetasCredito > 1) ? ($VentaCredito * 100) / $NroMetasCredito : 100;

				
$montoCredito = (!empty($montoCredito) ? $montoCredito : 0);
$montoContado = (!empty($montoContado) ? $montoContado : 0);

				
$TotalResultado= ($TotalMetasVendedor > 1) ? ($TotalVenta2 * 100) / $TotalMetasVendedor : 100; 

	$filas[]=array(
		"resultado_porcentaje" => round($TotalResultado),
		"codigo_meta" => $idAbm,
		"codigo_vendedor" => $idvendedor,
		"nombre" => $nombre,
		"telefono" => $nrotelef,
		"local" => $local,
		"imagen" => $url_img,
		"fecha" => $fecha,
		"mes" => $mes,
		"estado" => $Estado,
		"puntos" => (float)$puntos,
		"monto_contado" => (float)$montoContado,
		"monto_contado_formateado" => number_format($montoContado,0,',','.'),
		"monto_credito" => (float)$montoCredito,
		"monto_credito_formateado" => number_format($montoCredito,0,',','.'),
		"meta_total" => (float)$TotalMetasVendedor,
		"meta_total_formateada" => number_format($TotalMetasVendedor,0,',','.'),
		"venta_contado" => (float)$VentaContado,
		"venta_contado_formateada" => number_format($VentaContado,0,',','.'),
		"venta_credito" => (float)$VentaCredito,
		"venta_credito_formateada" => number_format($VentaCredito,0,',','.'),
		"venta_total" => (float)$TotalVenta2,
		"venta_total_formateada" => number_format($TotalVenta2,0,',','.'),
		"porcentaje_contado" => round($ResultadoContado),
		"porcentaje_credito" => round($ResultadoCredito)
	);
	
	$pagina = "
        <div class='' 
            style='height: 470px; border: 3px solid #dddddd; background:#dddddd; border-radius: 5px; display: flex; justify-content: center; align-items: center;'  
            id='".$fecha."' 
            url='$Estado'  
            onclick='obtenerdatosvistaventaMetasVendedor(this,$montoContado,$montoCredito,".$fecha.",".$idvendedor.",".$idAbm.")'>

            <div class='ContenedorDetalleCatalogo'> 
                $pnt
                <h1 style='font-size: 14px;'>".$nombre." - ".$mes."</h1>
                
                <div class=''>
                    <img src='".$url_img."' style='width: 70%; margin-top: 5px;'>
                </div>
                
                <div class='card_content' style='width: 100%; height: 50%; background-color:#f5f5f5; padding: 5px; display:flex; flex-direction:column; justify-content:space-between;'>
                    
                    <div class='info'> 
					<h4 style='margin:0; '>Total Venta</h4>
                        <h1>".number_format($TotalVenta2,0,',','.')." Gs. </h1>
                    </div>

                    <div class='card_footer' style='display:flex; justify-content:space-around; margin-top:8px; border-top:1px solid #ccc; padding-top:5px;'>
					
					
					<div style='text-align:center;width:100%;'>
                          <h5 style='margin:0; font-size:13px; color:green;'>Meta</h5>
<p style='margin:0;  font-size:12px;'>".number_format($TotalMetasVendedor,0,',','.')." </p>
                            <center>
                                <div class='progresss' style='width: 35%;'> 
                                    <div role='progressbar' class='circular-progres' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' 
                                        style='--value: ".round($TotalResultado)."; width: 100%;'>
                                    </div> 
                                </div>
                            </center>
                        </div>
						
						
                        
                        <div style='text-align:center;width:50%;display:none;'>
                            <h5 style='margin:0; font-size:13px; color:green;'>Contado</h5>
<p style='margin:0;HEIGHT: 40PX; font-size:12px;'>".number_format($VentaContado,0,',','.')." /".number_format($montoContado,0,',','.')." </p>
                            <center>
                                <div class='progresss' style='width: 50%;'> 
                                    <div role='progressbar' class='circular-progres' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' 
                                        style='--value: ".round($ResultadoContado)."; width: 100%;'>
                                    </div> 
                                </div>
                            </center>
                        </div>

                        <div style='text-align:center;width:50%;display:none;'>
                            <h5 style='margin:0; font-size:13px; color:blue;'>Crédito</h5>
<p style='margin:0;HEIGHT: 40PX; font-size:12px;'>".number_format($VentaCredito,0,',','.')." /".number_format($montoCredito,0,',','.')." </p>
                            <center>
                                <div class='progresss' style='width: 50%;'> 
                                    <div role='progressbar' class='circular-progres' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' 
                                        style='--value: ".round($ResultadoCredito)."; width: 100%;'>
                                    </div> 
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>";
		
		
	$datos[] = array(
    "resultadoPorcentaje" => round($TotalResultado),
    "html"                => $pagina,  // acá guardás el bloque ya generado
);	
		
 
			  
	  }
	   $Porcentaje= $totalMetas != 0 ? ($totalVentaResultado * 100 ) / $totalMetas : 0;
 }
 
usort($datos, function($a, $b) {
    if ($a['resultadoPorcentaje'] == $b['resultadoPorcentaje']) {
        return 0;
    }
    return ($a['resultadoPorcentaje'] < $b['resultadoPorcentaje']) ? 1 : -1;
});
usort($filas, function($a, $b) {
    if ($a['resultado_porcentaje'] == $b['resultado_porcentaje']) {
        return 0;
    }
    return ($a['resultado_porcentaje'] < $b['resultado_porcentaje']) ? 1 : -1;
});


// Generar el HTML concatenado ya ordenado
$paginaimprimir = "";
foreach ($datos as $item) {
    $paginaimprimir .= $item['html'];
}

  
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $paginaimprimir) ,"3"=> number_format($nroRegistro,'0',',','.'),"4"=> number_format($totalVentaResultado,'0',',','.'),"5"=> number_format($totalMetas,'0',',','.'),"6"=> number_format($Porcentaje,'0',',','.'));
echo json_encode($informacion);	
exit;
}


function buscarTotalVentaVendedor($Vendedor,$fecha,$local,$tipo,$fecha1,$fecha2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 
	 
	 
		$condicionLocal="";
	// if($local!=""){
		// $condicionLocal=" and  vt.cod_local='$local' ";
	// }
	
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and  fecha_venta between '".$fecha1."' and '".$fecha2."' ";
	}
	
	$condiciontipo="";
	if($tipo!=""){
		$condiciontipo=" and  vt.TipoVenta='$tipo' ";
	}
	
		$sql= "Select total_venta , TipoVenta 
        from venta vt where  Vendedor1='".$Vendedor."' ".$condicionfecha.$condicionLocal.$condiciontipo."   and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ";
		
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
 
  $total_ventaContado=0;
  $total_ventaCredito=0;
  $TotalVenta=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
				$total_venta = (float)$valor['total_venta']; 
				$tipoVenta   = strtoupper(trim($valor['TipoVenta'])); // normalizo texto
				$TotalVenta += $total_venta ;
				if ($tipoVenta === "CONTADO") {
					$total_ventaContado += $total_venta;
				} elseif ($tipoVenta === "CREDITO") {
					$total_ventaCredito += $total_venta;
				}
	  }
 }

$Datos[0]= $total_ventaContado;
$Datos[1]= $total_ventaCredito;
$Datos[2]= $TotalVenta;

 return $Datos;	

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
        from venta vt where  vt.TipoVenta='CONTADO'  and Vendedor1='".$Vendedor."' ".$condicionfecha.$condicionLocal."  
		and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   limit 1 ";
	
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
function buscarVendedorLocales($cod_localvendedor,$formato='')
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$filas=array();
	$cod_local_principal=buscarLocalPrincipalVendedor($mysqli,$cod_localvendedor);
	
	$sql= " select *  from local  where estado='Activo' ";
	
	
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
	  
		      $cod_local=$valor['cod_local'];
		  	  $nombre=utf8_encode($valor['Nombre']);
		  	  $estado=utf8_encode($valor['estado']);

			  
		  	$sql2= "select count(*) as contador from detallevendedor  where cod_localFK=$cod_local and cod_vendedorFK=$cod_localvendedor ";
			
			
			
			$stmt2 = $mysqli->prepare($sql2); 
if ( ! $stmt2->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
exit;
}
$result2 = $stmt2->get_result();
$valor2= mysqli_num_rows($result2);
$totalregistro=$valor2;
 if ($valor2>0)
 {
	  while ($valor2= mysqli_fetch_assoc($result2))
	{
		$contador=$valor2['contador'];
	 
	 if($contador=="0"){
	
	$accionInicial=($cod_local_principal!="" && $cod_local_principal==$cod_local) ? "SI" : "NO";
	$consulta1="Insert into detallevendedor (cod_localFK,cod_vendedorFK,accion) values(?,?,?)";
	
		$stmt1 = $mysqli->prepare($consulta1);
		$sss='sss';
		$stmt1->bind_param($sss,$cod_local,$cod_localvendedor,$accionInicial);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}
	
	}
	 
 }
 
 }			  
	  }
 }
 
 
 	$sql= " select iddetallevendedor,cod_local, Nombre,accion from local lc inner join detallevendedor on  cod_localFK =cod_local
		where lc.estado='Activo' and cod_vendedorFK=".$cod_localvendedor;
	
   
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
		  
		      $cod_local=$valor['cod_local'];
			  $cod_detalleVendedor=$valor['iddetallevendedor'];
		  	  $Nombre=utf8_encode($valor['Nombre']);
		  	  $accion=utf8_encode($valor['accion']);
			  $filas[]=array(
				  "codigo" => $cod_local,
				  "codigo_relacion" => $cod_detalleVendedor,
				  "local" => $Nombre,
				  "accion" => $accion,
				  "asignado" => $accion=="SI"
			  );
			
			if($formato!='json'){
			$inputcheck="<input id='".$cod_detalleVendedor."' name='SI' type='checkbox' onclick='abmVendedorLocales(this)'  />";
			if($accion=="SI"){
			$inputcheck="<input id='".$cod_detalleVendedor."' name='NO' type='checkbox'  checked onclick='abmVendedorLocales(this)' />";
          		
			 }


			  $styleName=CargarStyleTable($styleName);
			 	 
			
			  		   $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
			  <tr id='tbSelecRegistro' '>
			  <td id='td_id' style='width:5%'>".$cod_local."</td>
			  <td id='td_datos_1'style='width:70%' class='tdRegistroSearch' >".$Nombre."</td>
			   <td  id='td_datos_2' style='width:25%'>".$inputcheck."</td>
			  </tr>
			  </table>";
			}
			  		  
	  }
 }
 

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina));
echo json_encode($informacion);	
exit;


}


function buscarLocalPrincipalVendedor($mysqli,$cod_localvendedor)
{
	$cod_local_principal="";
	if($cod_localvendedor==""){
		return $cod_local_principal;
	}

	$sql= "Select cod_localfk from vendedor where idvendedor=? limit 1";
	$stmt = $mysqli->prepare($sql);
	$s='s';
	$stmt->bind_param($s,$cod_localvendedor);
	if ( ! $stmt->execute()) {
		echo "Error";
		exit;
	}
	$result = $stmt->get_result();
	if ($valor= mysqli_fetch_assoc($result))
	{
		$cod_local_principal=$valor['cod_localfk'];
	}

	return $cod_local_principal;
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
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	$filas=array();
	
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
			  $filas[]=array(
				  "codigo" => $idsector_vendedor,
				  "descripcion" => $descripcion,
				  "estado" => utf8_encode($valor['estado'])
			  );
				  	 
		  	 
			    	
			  $pagina.="<option  value='$descripcion' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 if($formato=='json'){
	 $pagina=$filas;
 }
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}


function abm_metas($estado,$idAbmMetaVendedor,$montoCredito,$montoContado,$fecha,$vendedor ,$operacion)
{
	
	
if($montoContado=="" ||$montoCredito=="" || $vendedor =="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

if($operacion=="nuevo_meta") 
{


$consulta1="Insert into metas (montoContado,montoCredito,fecha,cod_vendedorFK,Estado)
values(?,?,?,?,'ACTIVO')";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$montoContado,$montoCredito,$fecha,$vendedor);

}

if($operacion=="editar_meta")
{

$consulta1="Update metas set montoContado=?,montoCredito=?,fecha=?,cod_vendedorFK=?,Estado=? where idMetas=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$montoContado,$montoCredito,$fecha,$vendedor,$estado,$idAbmMetaVendedor); 

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
	// if($local!=""){
		// $condicionLocal=" and  vt.cod_local='$local' ";
	// }
	
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




verificar($operacion);
?>
