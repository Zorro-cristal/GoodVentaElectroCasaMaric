<?php
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
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


$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$preciodesde=$_POST['preciodesde'];
$preciodesde = quitarseparadormiles($preciodesde);

$preciohasta=$_POST['preciohasta'];
$preciohasta = quitarseparadormiles($preciohasta);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
 
abm($fecha,$descripcion,$tipo,$preciodesde,$preciohasta,$estado,$idAbmCategoriaPrecio,$operacion);
  
}
  if($operacion=="nuevoFuncionarioCargo"  )
{


$idabm=$_POST['idabm'];
$idabm = utf8_decode($idabm);
$TipoListaFuncionarios=$_POST['TipoListaFuncionarios'];
$TipoListaFuncionarios = utf8_decode($TipoListaFuncionarios);
$idAbmFuncionarios=$_POST['idAbmFuncionarios'];
$idAbmFuncionarios = utf8_decode($idAbmFuncionarios);


nuevoFuncionarioCargo($idabm,$TipoListaFuncionarios,$idAbmFuncionarios,$operacion);

}
  
 if($operacion=="buscar"){ 
	
	$descripcion=$_POST["descripcion"];
 	$descripcion=utf8_decode($descripcion);
	
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	
 	BuscarRegistro($descripcion,$estado);
 } 
  
 
if($operacion=="buscarLocalesDetallePrecio")
{
$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarLocalesDetallePrecio($idAbmCategoriaPrecio,$formato);

}	


if( $operacion=="EditarLocalesDetallePrecio")
{
		
	$idDV=$_POST['idDV'];
    $idDV = utf8_decode($idDV);
	$accion=$_POST['accion'];
    $accion = utf8_decode($accion);    
	EditarLocalesDetallePrecio($idDV,$accion);

}


if( $operacion=="EditarCategoriasDetallePrecio")
{
		
	$idDV=$_POST['idDV'];
    $idDV = utf8_decode($idDV);
	$accion=$_POST['accion'];
    $accion = utf8_decode($accion);    
	EditarCategoriasDetallePrecio($idDV,$accion);
}



if($operacion=="editarPrecio" || $operacion=="nuevoPrecio"|| $operacion=="EliminarPrecio" )
{


$cuota=$_POST['cuota'];
$cuota = utf8_decode($cuota);

$ganancia=$_POST['ganancia'];
$ganancia = quitarseparadormiles($ganancia);

$precioDescuento=$_POST['precioDescuento'];
$precioDescuento = quitarseparadormiles($precioDescuento);

$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$idAbm=$_POST['idAbm'];
$idAbm = utf8_decode($idAbm);

$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);
 
 
 
abmListaPrecio($cuota,$ganancia,$precioDescuento,$descripcion,$idAbm,$idAbmCategoriaPrecio,$operacion);
  
}



if($operacion=="buscarListaPrecioDetallePrecio")
{
$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarListaPrecioDetallePrecio($idAbmCategoriaPrecio,$formato);

}



 if($operacion=="buscarCategoriasDetallePrecio")
{
$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);

$buscar =$_POST['buscar'];
$buscar = utf8_decode($buscar);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarCategoriasDetallePrecio($idAbmCategoriaPrecio,$buscar,$formato);
}
 

 if($operacion=="buscarCheckCategoriasDetallePrecio")
{
$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);
	buscarCheckCategoriasDetallePrecio($idAbmCategoriaPrecio);
}


 if($operacion=="abmCheckCategoriasDetallePrecio"){
		$idAbmCategoriaPrecio=$_POST['idAbmCategoriaPrecio'];
		$idAbmCategoriaPrecio = utf8_decode($idAbmCategoriaPrecio);
	abmCheckCategoriasDetallePrecio($idAbmCategoriaPrecio);
}		
 
 if($operacion=="buscarCalculadora"){ 
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarCalculadora($formato);
 } 
   
 
}

 
/*Buscar Registro en vista*/
function buscarCalculadora($formato='')
{
$mysqli=conectar_al_servidor();
 

$sql= "select cod_lista_precio_producto,descripcion,fecha,pr_desde,pr_hasta,estado,tipo,fecha_hasta
from  lista_precio_producto  where estado='Activo' ";
$pagina = "";
$filas = array();
$stmt = $mysqli->prepare($sql);
 
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
 
$cod_lista_precio_producto = utf8_encode($valor['cod_lista_precio_producto']);/*Obtenemos el registro mediante el nombre del atributo */      
$descripcion = utf8_encode($valor['descripcion']);          
$fecha = utf8_encode($valor['fecha']);          
$pr_desde = utf8_encode($valor['pr_desde']); 
$pr_hasta = utf8_encode($valor['pr_hasta']); 
$estado = utf8_encode($valor['estado']); 
$tipo = utf8_encode($valor['tipo']);  
$fecha_hasta = utf8_encode($valor['fecha_hasta']);  

$detalle=buscarCalculadoraDescripcion($cod_lista_precio_producto);

$filas[]=array(
	"codigo" => $cod_lista_precio_producto,
	"descripcion" => $descripcion,
	"precio_desde" => $pr_desde,
	"precio_hasta" => $pr_hasta,
	"detalle" => $detalle
);

$jsonDetalle = htmlspecialchars(json_encode($detalle), ENT_QUOTES, 'UTF-8');

if($formato!='json'){
$styleName=CargarStyleTable($styleName);
$pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' data-detalle='$jsonDetalle' onclick='obtenerdatosCalculadoraCategoraiPrecio(this)'>
<td id='td_id' style='width:20%; background-color: #efeded;color:red'>".$cod_lista_precio_producto."</td>
<td  id='td_datos_1' style='width:80%'>".$descripcion."</td>
<td  id='td_datos_2' style='display:none;'>".$pr_desde."</td>
<td  id='td_datos_3' style='display:none;'>".$pr_hasta."</td>

</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}
}
  
  
/*Buscar Registro en vista*/
function buscarCalculadoraDescripcion($idAbmCategoriaPrecio)
{
$mysqli=conectar_al_servidor();
$data=array();
 

$sql= "select cod_detalle_listado_precio,cuota,descuento,porcentaje,cod_lista_precio_productoFK,dlp.descripcion ,tipo
from  detalle_listado_precio dlp  inner join lista_precio_producto lpp on cod_lista_precio_producto=cod_lista_precio_productoFK 
where cod_lista_precio_productoFK='$idAbmCategoriaPrecio' order by cuota asc " ;

// echo($sql);
// exit;

$pagina = "";   
$stmt = $mysqli->prepare($sql); 
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

        $data[utf8_encode($valor['cuota'])] = [
            'cuota' => utf8_encode($valor['cuota']),
            'descuento' => utf8_encode($valor['descuento']),
            'porcentaje' => utf8_encode($valor['porcentaje']) 
        ];
}
}
 return $data;
}
  







  
function abmCheckCategoriasDetallePrecio($idAbmCategoriaPrecio)
{
	
	$mysqli=conectar_al_servidor();

	
               
    $consulta="update categoria_lista_precio set accion='SI' where cod_lista_precio_productoFK='$idAbmCategoriaPrecio'  and  idcategoria_lista_precio!='' ";

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
 
 

function buscarCheckCategoriasDetallePrecio($idAbmCategoriaPrecio)
{
	$mysqli=conectar_al_servidor();
	$pagina='';
 
 
 	$sql= " select count(accion) as contador from categoria_lista_precio where accion='NO' and cod_lista_precio_productoFK=".$idAbmCategoriaPrecio;
	
   
   $stmt = $mysqli->prepare($sql);
  	
 $styleName="tableRegistroSearch";
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $contador= 0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {	  
		  
		      $contador=$valor['contador'];
			  
			  		  
	  }
 }
 

 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => $contador);
echo json_encode($informacion);	
exit;


}
 

  
function EditarCategoriasDetallePrecio($idDV,$accion)
{
	
	$mysqli=conectar_al_servidor();

	
               
    $consulta="update categoria_lista_precio set accion='".$accion."' where  idcategoria_lista_precio='".$idDV."' ";

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
 
 
function buscarCategoriasDetallePrecio($idAbmCategoriaPrecio,$buscar,$formato='')
{
	$mysqli=conectar_al_servidor();
	$pagina='';
	$filas=array();
	
	$sql= " select * from categoria  where Estado='Activo' order by descripcion asc";
	
	
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
	  
		      $cod_categoria=$valor['cod_categoria'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);

			  
		$sql2= "select count(*) as contador from categoria_lista_precio  where cod_categoriaFK=$cod_categoria and cod_lista_precio_productoFK=$idAbmCategoriaPrecio ";
			
			
			
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
	
	$consulta1="Insert into categoria_lista_precio (cod_categoriaFK,cod_lista_precio_productoFK,accion) values($cod_categoria,$idAbmCategoriaPrecio,'NO')";
	
		$stmt1 = $mysqli->prepare($consulta1);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}
	
	}
	 
 }
 
 }			  
	  }
 }
 
 
 	$sql= " select idcategoria_lista_precio,cod_categoria, descripcion,accion , 
( select count(*) from categoria_lista_precio clp  where  clp.cod_categoriaFK= c.cod_categoria and  accion='SI' ) as contador	from categoria c inner join categoria_lista_precio on  cod_categoriaFK =cod_categoria  where c.Estado='Activo' and cod_lista_precio_productoFK=".$idAbmCategoriaPrecio." and descripcion like '%".$buscar."%' order by descripcion asc";
	
   
   $stmt = $mysqli->prepare($sql);
  	
 $styleName="tableRegistroSearch";
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 
 $ContadorRegistro=0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {	  
		
 
		      $cod_categoria=$valor['cod_categoria'];
			  $idcategoria_lista_precio=$valor['idcategoria_lista_precio'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $accion=utf8_encode($valor['accion']);
		  	  $contador=utf8_encode($valor['contador']);
			  $filas[]=array(
				  "codigo" => $cod_categoria,
				  "codigo_relacion" => $idcategoria_lista_precio,
				  "descripcion" => $descripcion,
				  "accion" => $accion,
				  "contador" => $contador,
				  "asignado" => $accion=="SI"
			  );
			
			if($formato!='json'){
			$inputcheck="<input id='".$idcategoria_lista_precio."' name='SI' type='checkbox' onclick='abmCategoriasDetallePrecio(this)'  />";
		if($accion=="SI"){
			$inputcheck="<input id='".$idcategoria_lista_precio."' name='NO' type='checkbox' checked onclick='abmCategoriasDetallePrecio(this)' />";
          }
 

			  $styleName=CargarStyleTable($styleName);
			 	 
			
			  		   $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
			  <tr id='tbSelecRegistro' '>
			  <td id='td_id' style='display:none;'>".$cod_categoria."</td>
			  <td id='td_datos_1'style='width:70%' class='tdRegistroSearch' >".$descripcion." -".$contador."-</td>
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
 
 
/*Buscar Registro en vista*/
function buscarListaPrecioDetallePrecio($idAbmCategoriaPrecio,$formato='')
{
$mysqli=conectar_al_servidor();
 

$sql= "select cod_detalle_listado_precio,cuota,descuento,porcentaje,cod_lista_precio_productoFK,dlp.descripcion ,tipo
from  detalle_listado_precio dlp  inner join lista_precio_producto lpp on cod_lista_precio_producto=cod_lista_precio_productoFK 
where cod_lista_precio_productoFK='$idAbmCategoriaPrecio' order by cuota asc " ;

// echo($sql);
// exit;

$pagina = "";
$filas = array();
$stmt = $mysqli->prepare($sql); 
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
 
$cod_detalle_listado_precio = utf8_encode($valor['cod_detalle_listado_precio']);/*Obtenemos el registro mediante el nombre del atributo */    
$cuota = utf8_encode($valor['cuota']);          
$descuento = utf8_encode($valor['descuento']);          
$porcentaje = utf8_encode($valor['porcentaje']); 
$descripcion = utf8_encode($valor['descripcion']); 
$tipo = utf8_encode($valor['tipo']); 
 
 $tipoRegistro="";
 if($tipo=="PORCENTAJE"){
	 $tipoRegistro=" %";
 }else{
	 $tipoRegistro=" Gs.";
 }

 $filas[]=array(
	 "codigo" => $cod_detalle_listado_precio,
	 "descripcion" => $descripcion,
	 "porcentaje" => $porcentaje,
	 "porcentaje_formateado" => number_format($porcentaje,'0',',','.').$tipoRegistro,
	 "descuento" => $descuento,
	 "descuento_formateado" => number_format($descuento,'0',',','.').$tipoRegistro,
	 "cuota" => $cuota,
	 "tipo" => $tipo
 );
 
	if($formato!='json'){
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmListaDetalleCategoriaPrecio(this)'>
<td id='td_id' style='display:none'>".$cod_detalle_listado_precio."</td>
<td  id='td_datos_3' style='width:40%'>".$descripcion."</td> 
<td  id='td_datos_1' style='width:30%'>".number_format($porcentaje,'0',',','.')." $tipoRegistro</td>
<td  id='td_datos_2' style='width:30%'>".number_format($descuento,'0',',','.')." $tipoRegistro</td>
<td  id='td_datos_4' style='display:none'>".$porcentaje."</td>
<td  id='td_datos_5' style='display:none'>".$descuento."</td>
<td  id='td_datos_6' style='display:none'>".$cuota."</td>
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}
}
   
/*Funcion para insertar,modificar o eliminar registros*/
function abmListaPrecio($cuota,$ganancia,$precioDescuento,$descripcion,$idAbm,$idAbmCategoriaPrecio,$operacion)
{

 
if($cuota==""  || $ganancia=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 
	 
if($operacion=="nuevoPrecio") 
{
$consulta1="Insert into detalle_listado_precio (cuota,descuento,porcentaje,cod_lista_precio_productoFK,descripcion)
values('$cuota','$precioDescuento','$ganancia','$idAbmCategoriaPrecio','$descripcion')";

 
$stmt1 = $mysqli->prepare($consulta1);
 

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 
}
 

if($operacion=="editarPrecio")
{

$consulta1="Update detalle_listado_precio set cuota=?,descuento=?,porcentaje=?,cod_lista_precio_productoFK=?,descripcion=? where cod_detalle_listado_precio=?";
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$cuota,$precioDescuento,$ganancia,$idAbmCategoriaPrecio,$descripcion,$idAbm);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

}


if($operacion=="EliminarPrecio")
{

$consulta1="delete from  detalle_listado_precio where cod_detalle_listado_precio='$idAbm'";


$stmt1 = $mysqli->prepare($consulta1);

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

}
 

$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

  
function EditarLocalesDetallePrecio($idDV,$accion)
{
	
	$mysqli=conectar_al_servidor();

	
               
    $consulta="update local_lista_precio set accion='".$accion."' where  cod_local_lista_precio='".$idDV."' ";

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
 
function buscarLocalesDetallePrecio($idAbmCategoriaPrecio,$formato='')
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
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);

 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
	  
		      $cod_local=$valor['cod_local'];
		  	  $nombre=utf8_encode($valor['Nombre']);
		  	  $estado=utf8_encode($valor['estado']);

			  
		  	$sql2= "select count(*) as contador from local_lista_precio  where cod_localFK=$cod_local and cod_lista_precio_productoFK=$idAbmCategoriaPrecio ";
			
			
			
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
	
	$consulta1="Insert into local_lista_precio (cod_localFK,cod_lista_precio_productoFK,accion) values($cod_local,$idAbmCategoriaPrecio,'NO')";
	
		$stmt1 = $mysqli->prepare($consulta1);
		if (!$stmt1->execute()) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
		exit;
		}
	
	}
	 
 }
 
 }			  
	  }
 }
 
 
 	$sql= " select cod_local_lista_precio,cod_local, Nombre,accion from local lc inner join local_lista_precio on  cod_localFK =cod_local
		where lc.estado='Activo' and cod_lista_precio_productoFK=".$idAbmCategoriaPrecio;
	
   
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
			  $cod_local_lista_precio=$valor['cod_local_lista_precio'];
		  	  $Nombre=utf8_encode($valor['Nombre']);
		  	  $accion=utf8_encode($valor['accion']);
			  $filas[]=array(
				  "codigo" => $cod_local,
				  "codigo_relacion" => $cod_local_lista_precio,
				  "local" => $Nombre,
				  "accion" => $accion,
				  "asignado" => $accion=="SI"
			  );
			
			if($formato!='json'){
			$inputcheck="<input id='".$cod_local_lista_precio."' name='SI' type='checkbox' onclick='abmLocalesDetallePrecio(this)'  />";
			if($accion=="SI"){
			$inputcheck="<input id='".$cod_local_lista_precio."' name='NO' type='checkbox'  checked onclick='abmLocalesDetallePrecio(this)' />";
          		
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
 
/*Funcion para insertar,modificar o eliminar registros*/
function abm($fecha_hasta,$descripcion,$tipo,$preciodesde,$preciohasta,$estado,$idAbmCategoriaPrecio,$operacion)
{

if($preciodesde==""  || $preciohasta==""|| $descripcion=="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
/*AUDITORIA*/
	date_default_timezone_set('America/Anguilla');    
$fecha_inser_edit = date('Y-m-d', time()); 
	 
if($operacion=="nuevo") 
{
$consulta1="Insert into lista_precio_producto (descripcion,fecha,pr_desde,pr_hasta,estado,tipo,fecha_hasta)
values(?,now(),?,?,?,?,?)";
 
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssss';
$stmt1->bind_param($ss,$descripcion,$preciodesde,$preciohasta,$estado,$tipo,$fecha_hasta);
 
}

if($operacion=="editar")
{

$consulta1="Update lista_precio_producto set descripcion=?,fecha=now(),pr_desde=?,pr_hasta=?,estado=?,tipo=?,fecha_hasta=? where cod_lista_precio_producto=?";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssss';
$stmt1->bind_param($ss,$descripcion,$preciodesde,$preciohasta,$estado,$tipo,$fecha_hasta,$idAbmCategoriaPrecio);

}
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}
 


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}

 
/*Buscar Registro en vista*/
function BuscarRegistro($descripcion,$estado)
{
$mysqli=conectar_al_servidor();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$filas=array();
$condiciondescripcion="";
if($descripcion!=""){
	$condiciondescripcion=" and descripcion like '%".$descripcion."%'";
} 


$sql= "select cod_lista_precio_producto,descripcion,fecha,pr_desde,pr_hasta,estado,tipo,fecha_hasta
from  lista_precio_producto  where estado=? ".$condiciondescripcion;
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
 
$cod_lista_precio_producto = utf8_encode($valor['cod_lista_precio_producto']);/*Obtenemos el registro mediante el nombre del atributo */      
$descripcion = utf8_encode($valor['descripcion']);          
$fecha = utf8_encode($valor['fecha']);          
$pr_desde = utf8_encode($valor['pr_desde']); 
$pr_hasta = utf8_encode($valor['pr_hasta']); 
$estado = utf8_encode($valor['estado']); 
$tipo = utf8_encode($valor['tipo']);  
$fecha_hasta = utf8_encode($valor['fecha_hasta']);  

$filas[]=array(
    "codigo" => $cod_lista_precio_producto,
    "descripcion" => $descripcion,
    "fecha" => $fecha,
    "precio_desde" => $pr_desde,
    "precio_desde_formateado" => number_format($pr_desde,'0',',','.'),
    "precio_hasta" => $pr_hasta,
    "precio_hasta_formateado" => number_format($pr_hasta,'0',',','.'),
    "tipo" => $tipo,
    "fecha_hasta" => $fecha_hasta,
    "estado" => $estado
);

	if($formato !== "json") {
	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmCategoriaPrecio(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$cod_lista_precio_producto."</td>
<td  id='td_datos_1' style='width:40%'>".$descripcion."</td>
<td  id='td_datos_2' style='width:15%'>".$fecha."</td>
<td  id='td_datos_3' style='width:10%'>".number_format($pr_desde,'0',',','.')."</td> 
<td  id='td_datos_4' style='width:10%'>".number_format($pr_hasta,'0',',','.')."</td>
<td  id='td_datos_5' style='width:10%'>".$tipo."</td>
<td  id='td_datos_7' style='width:10%'>".$fecha_hasta."</td>
<td  id='td_datos_6' style='display:none'>".$estado."</td>
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
 

ObtenerDatos($operacion);

?>
