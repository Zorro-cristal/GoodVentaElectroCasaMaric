<?php
$funt = $_POST['funt'];
//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");

function verificar($funt)
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




	
if($funt=="editar")
{

$acciones=$_POST['acciones'];
$acciones = utf8_decode($acciones);
$idAbmUsuario=$_POST['idAbmUsuario'];
$idAbmUsuario = utf8_decode($idAbmUsuario);
$idabm=$_POST['idabm'];
$idabm = utf8_decode($idabm);
abm($acciones,$idabm,$funt,$idAbmUsuario);
}

if($funt=="buscar")
{
$buscador=$_POST['buscador'];
$buscador = utf8_decode($buscador);
$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
buscar($buscar,$buscador,$formato);
}

}

function abm($acciones,$idabm,$funt,$user)
{
	
if( $idabm=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
}

	$mysqli=conectar_al_servidor();

	if($funt=="editar")
	{
	$consulta="Update accesosuser set accion=? where idaccesosUser=?";	

	$stmt = $mysqli->prepare($consulta);


$ss='ss';

$stmt->bind_param($ss,$acciones,$idabm); 

	}
	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$porcentaje=ObtenerPorcentaje($user);
  $informacion =array("1" => "exito","2"=>$porcentaje);
echo json_encode($informacion);	
exit;


	
	
	
	
}

function ObtenerPorcentaje($buscar)
{
	$mysqli=conectar_al_servidor();
	$sql= "Select lta.nro,lta.formulario,lta.codigo,lta.nombre,acus.idaccesosUser,acus.accion,acus.usuarios_idusario,lta.formulario
	from accesosuser acus inner join listadodeacceso lta on lta.idlistadodeacceso=acus.idlistadodeaccesoFK
	where usuarios_idusario = ? and acus.tipo='Administrativo' order by lta.nro asc,lta.orden asc";
		
   $nrodeactivos=0;
   $totalactivos=0;
 
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';

$stmt->bind_param($s,$buscar);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalactivos=$valor;
 $controltitulo="";
 

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  $accion=utf8_encode($valor['accion']);
		   if($accion=="SI"){
			  $nrodeactivos=$nrodeactivos+1;	
          	
			 }
          		
			 
			    	 		  
	  }
 }
  mysqli_close($mysqli);
 
  $nrodeactivos=($nrodeactivos*100)/$totalactivos;
  return number_format($nrodeactivos,'0',',','.');


}



function buscar($buscar,$buscador,$formato='')
{
	$mysqli=conectar_al_servidor();
	 $pagina1='';
	 $filas=array();
	 $pagina2='';
	 $pagina3='';
		$sql= "Select lta.nro,lta.formulario,lta.codigo,lta.nombre,acus.idaccesosUser,acus.accion,acus.usuarios_idusario,lta.formulario
		from accesosuser acus inner join listadodeacceso lta on lta.idlistadodeacceso=acus.idlistadodeaccesoFK
		where usuarios_idusario = ? and acus.tipo='Administrativo' and concat(lta.nombre,' ',lta.formulario) like '%".$buscador."%' order by lta.nro asc,lta.orden asc";
		
   $nrodeactivos=0;
   $totalactivos=0;
 
   
   $stmt = $mysqli->prepare($sql);
  	$s='s';

$stmt->bind_param($s,$buscar);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalactivos=$valor;
 $controltitulo="";
$styleName="tableRegistroSearch";

 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		      $idaccesosUser=$valor['idaccesosUser'];
			  $accion=utf8_encode($valor['accion']);
			  $usuarios_idusario=utf8_encode($valor['usuarios_idusario']);
			  $nombre=utf8_encode($valor['nombre']);
			  $codigo=utf8_encode($valor['codigo']);
			  $formulario=utf8_encode($valor['formulario']);
			  $es_nuevo_grupo=($controltitulo!=$formulario);
			  $tituloacceso="";
			 if($es_nuevo_grupo){
				   $tituloacceso="<p class='ptituloZ'>".$formulario."</p>";
				   $controltitulo=$formulario;
			 }
			 $filas[]=array(
				 'id_acceso'=>$idaccesosUser,
				 'accion'=>$accion,
				 'usuario'=>$usuarios_idusario,
				 'nombre'=>$nombre,
				 'codigo'=>$codigo,
				 'formulario'=>$formulario,
				 'nuevo_grupo'=>$es_nuevo_grupo
			 );
		  	 $inputcheck="<input id='".$idaccesosUser."' type='checkbox' onclick='abmacceso(this)'  />";
			 if($accion=="SI"){
			$inputcheck="<input id='".$idaccesosUser."' type='checkbox'  checked onclick='abmacceso(this)' />";
			$nrodeactivos=$nrodeactivos+1;
			 }
   
$pagina1 .= "
<div class='acceso-card-ios'>

    <!-- Título dentro del card -->
    ".($tituloacceso ? "<div class='acceso-card-title'>$tituloacceso</div>" : "")."

    <div class='acceso-card-content'>
        <label class='switch-ios'>
            <input id='$idaccesosUser' type='checkbox' ".($accion=='SI'?'checked':'')." onclick='abmacceso(this)'>
            <span class='slider-ios'></span>
        </label>

        <span class='acceso-text-ios'>$nombre</span>
    </div>

</div>
";

 
			  
	  }
 }
  mysqli_close($mysqli);
  
	$nrodeactivos = ($nrodeactivos == 0) ? 1 : $nrodeactivos;
	$totalactivos = ($totalactivos == 0) ? 1 : $totalactivos;
 
  $nrodeactivos=($nrodeactivos*100)/$totalactivos;
 
  $resultado=($formato==='json') ? $filas : $pagina1;
  $informacion =array("1" => 'exito',"2" => $resultado,"3"=>number_format($nrodeactivos,'0',',','.'));
echo json_encode($informacion);	
exit;


}


verificar($funt);
?>
