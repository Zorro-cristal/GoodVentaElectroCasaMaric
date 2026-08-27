<?php



//cargar achivos importantes
require("conexion.php");

include("verificar_navegador.php");
function verificar()
{
	
	
	
	$user=$_POST['user'];
$user = utf8_decode($user);
	$pass=$_POST['pass'];
	
	  $pass = str_replace("=","+",$pass);
$navegador=$_POST['navegador'];
$navegador = utf8_decode($navegador);
$resp=verificar_navegador($user,$navegador,$pass);
if($resp=="ok"){
	buscardatos($user);
}else{
	
		  $informacion =array("1" =>"UI" );
echo json_encode($informacion);	
exit;
}
	

}


function buscardatos($user)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select concat(pr.nombre_persona,' ',pr.apellido_persona) as nombre_persona,cl.accesocliente,cl.accesoproducto,cl.accesocuentas,cl.modosinconexion,cl.realizarcobranzas,cl.cod_cobrador,cl.realizarentregas,cl.verificarsolicitudcredito,cl.accesocrearsoliticudcredito,cl.accesoagendacliente,cl.accesocargarfotoscliente,cl.accesocargarpdfcliente,cl.accesoegresoingreso,cl.accesoubicacioncliente,cl.accesometascobrador,cl.accesosolicituddescuentocredito,cl.cod_localFK
 from cobrador cl inner join persona pr on cl.cod_cobrador=pr.cod_persona  where cod_cobrador=? ";

   $stmt = $mysqli->prepare($sql);
  	$s='s';

//$buscar="".$buscar."";
$stmt->bind_param($s,$user);

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
		
		  	  $nombre_persona=utf8_encode($valor['nombre_persona']);
		  	  $accesocliente=utf8_encode($valor['accesocliente']);
		  	  $accesoproducto=utf8_encode($valor['accesoproducto']);
		  	  $accesocuentas=utf8_encode($valor['accesocuentas']);
		  	  $modosinconexion=utf8_encode($valor['modosinconexion']);
		  	  $realizarcobranzas=utf8_encode($valor['realizarcobranzas']);
		  	  $realizarentregas=utf8_encode($valor['realizarentregas']);
		  	  $cod_cobrador=utf8_encode($valor['cod_cobrador']);
		  	  $verificarsolicitudcredito=utf8_encode($valor['verificarsolicitudcredito']);
			  
		  	  $accesocrearsoliticudcredito=utf8_encode($valor['accesocrearsoliticudcredito']);
		  	  $accesoagendacliente=utf8_encode($valor['accesoagendacliente']);
		  	  $accesocargarfotoscliente=utf8_encode($valor['accesocargarfotoscliente']);
		  	  $accesocargarpdfcliente=utf8_encode($valor['accesocargarpdfcliente']);
		  	  $accesoegresoingreso=utf8_encode($valor['accesoegresoingreso']);
		  	  $accesoubicacioncliente=utf8_encode($valor['accesoubicacioncliente']);
		  	  $accesometascobrador=utf8_encode($valor['accesometascobrador']);
			  
		  	  $accesosolicituddescuentocredito=utf8_encode($valor['accesosolicituddescuentocredito']);
			  
		  	  $cod_localFK=utf8_encode($valor['cod_localFK']);
		  
		  $informacion =array("1" =>"exito","2" => $nombre_persona ,"3" => $accesocliente ,"4" => $accesoproducto ,"5" => $accesocuentas,"6" => $modosinconexion,"7" => $realizarcobranzas,"8"=> $cod_cobrador,"9"=> $realizarentregas,"10"=>$verificarsolicitudcredito,
		  "11"=>$accesocrearsoliticudcredito,
		  "12"=>$accesoagendacliente,
		  "13"=>$accesocargarfotoscliente,
		  "14"=>$accesocargarpdfcliente,
		  "15"=>$accesoegresoingreso,
		  "16"=>$accesoubicacioncliente,
		  "17"=>$accesometascobrador,
		  "18"=>$accesosolicituddescuentocredito,
		  "19"=>$cod_localFK
		  );
echo json_encode($informacion);	
exit;
		      
			  
	  }
 }else{
	  
		  $informacion =array("1" =>"UI" );
echo json_encode($informacion);	
exit;
		      
 }
 
 
 

}




verificar();
?>