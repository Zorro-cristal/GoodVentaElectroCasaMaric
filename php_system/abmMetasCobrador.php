<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include('quitarseparadormiles.php');
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


	
if($operacion=="nuevo" || $operacion=="editar")
{
	
	
	$idAbmMetaCobrador=$_POST['idAbmMetaCobrador'];
$idAbmMetaCobrador = utf8_decode($idAbmMetaCobrador);
$monto=$_POST['monto'];
$monto = quitarseparadormiles($monto);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador); 
	abm($idAbmMetaCobrador,$monto,$fecha,$cobrador ,$operacion);

}
 
if($operacion=="buscarMetasCobrador")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$local=$_POST['local'];
$local = utf8_decode($local);
$tipo=$_POST['tipo'];
$tipo = utf8_decode($tipo);

$tipoPago=$_POST['tipoPago'];
$tipoPago = utf8_decode($tipoPago);
$tipoCuota=$_POST['tipoCuota'];
$tipoCuota = utf8_decode($tipoCuota);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

buscarMetasCobrador($tipoPago, $tipoCuota , $fecha1,$fecha2,$cobrador,$local,$tipo,$formato);
}	
 
}

function abm($idAbmMetaCobrador,$monto,$fecha,$cobrador ,$operacion)
{
	
	
if($monto=="" || $cobrador =="" ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

if($operacion=="nuevo") 
{


$consulta1="Insert into meta_cobrador (monto,fecha,cod_cobradorFK)
values(?,?,?)";
$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$monto,$fecha,$cobrador );


}



if($operacion=="editar")
{

$consulta1="Update meta_cobrador set monto=?,fecha=?,cod_cobradorFK=? where cod_meta_cobrador=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssss';
$stmt1->bind_param($ss,$monto,$fecha,$cobrador,$idAbmMetaCobrador); 

}




if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

function buscarMetasCobrador($tipoPago, $tipoCuota , $fecha1,$fecha2,$cobrador,$local,$tipo,$formato='')
{
	$mysqli=conectar_al_servidor();
	
	$fechames1 = $fecha1; 
	$fechames1 = new DateTime($fechames1); 
	$fechames1 = $fechames1->format('Y-m');
	
	$fechames2 =  $fecha2; 
	$fechames2 = new DateTime($fechames2); 
	$fechames2 = $fechames2->format('Y-m');
	
	 $pagina='';
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(fecha, '%Y-%m') between  '$fechames1' and '$fechames2' ";
}
$condicioncobrador="";
if($cobrador!=""){
	$condicioncobrador=" and cod_cobradorFK  = '".$cobrador."'";
}


	 
		$sql= "Select monto , fecha ,url_img , cod_cobradorFK ,cod_meta_cobrador , 
		(select upper(nombre_persona) from persona where cod_persona = cod_cobrador) as cobrador  from  meta_cobrador  mc
		inner join cobrador  cb on cod_cobradorFK=cod_cobrador where cb.estado='Activo' ".$condicionFecha.$condicioncobrador." order by fecha asc ";
		

   
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $TotalCobranza=0;
 $TotalMetas=0;
 $Porcentaje=0;
  
  $paginaArray1=array();
  $paginaArray2=array();
  $paginaSumaArray1=array();
  $paginaSumaArray2=array();
  $paginaimprimir="";
  $filas=array();
  
  $contadorarray=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  	  $idAbm=utf8_encode($valor['cod_meta_cobrador']); 
		  	  $monto=utf8_encode($valor['monto']); 
		  	  $fecha=utf8_encode($valor['fecha']); 
		  	  $cobrador=utf8_encode($valor['cobrador']); 
		  	  $url_img=utf8_encode($valor['url_img']); 
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
			  
			  $TotalMetas=$TotalMetas + $monto ;
			  $TotalCobrado=buscarMontoCobro($tipoPago, $tipoCuota ,$fecha1,$fecha2,$local,$tipo,$cod_cobradorFK,$fecha);
			  
			  $TotalCobranza= $TotalCobranza + $TotalCobrado[0];
		  		if($url_img==""){
					$url_img="/GoodVentaElectroCasaMaric/iconos/sinperfil.png";
				}	


				$Resultado1= $monto != 0 ? ($TotalCobrado[0] * 100 ) / $monto : 0;
				 
				$fechaanho1 = $fecha; 
				$fechaanho1 = new DateTime($fechaanho1); 
				$fechaanho1 = $fechaanho1->format('Y');
				
				
				$fechaMiMes1 = $fecha; 
				$fechaMiMes1 = new DateTime($fechaMiMes1); 
				$fechaMiMes1 = $fechaMiMes1->format('m');
				
				$fechaMiMes1=obtenermesletrasesp($fechaMiMes1);
 
				$resulRedondeo=round($Resultado1);
				$filas[]=array(
					"resultado_porcentaje" => $resulRedondeo,
					"codigo_meta" => $idAbm,
					"monto" => (float)$monto,
					"monto_formateado" => number_format($monto,'0',',','.'),
					"fecha" => $fecha,
					"cobrador" => $cobrador,
					"imagen" => $url_img,
					"codigo_cobrador" => $cod_cobradorFK,
					"total_cobrado" => (float)$TotalCobrado[0],
					"total_cobrado_formateado" => number_format($TotalCobrado[0],'0',',','.'),
					"anio" => $fechaanho1,
					"mes" => $fechaMiMes1
				);
				
		  	  $pagina=" 				
                <div class='sales' id='".$fecha."' onclick='obtenerdatosvistaventaMetasCobradores(this,$monto,".$fecha.",$cod_cobradorFK,$idAbm)'>
				<h3>".$cobrador."</h3>
                    <div class='status'>
                        <div  style='width: 140px'>
                            <div  class='imgFotoCi' style='background-image: url(".$url_img.");width: 140px'></div>
                        </div>
						<div class='info'>
                            <h3  >".$fechaMiMes1."-".$fechaanho1."</h3>
                            <h1  >".number_format($TotalCobrado[0],'0',',','.')." Gs.</h1>
                            <h4  >Meta: </h4>
							<h4  > ".number_format($monto,'0',',','.')." Gs.</h4>
                        </div>
                        <div class='progresss'>
                           <div role='progressbar'  aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='--value: ".$resulRedondeo." ;width: 100%;'></div>
                        </div>
                    </div>
                </div> ";
				
				
				$paginaArray1=array($contadorarray => $resulRedondeo);
				$paginaSumaArray1=$paginaSumaArray1 + $paginaArray1;
				$paginaArray2=array($contadorarray => $pagina);
				$paginaSumaArray2=$paginaSumaArray2 + $paginaArray2;
				
	    $contadorarray++;
	  }
 }
arsort($paginaSumaArray1);
usort($filas,function($a,$b){
	if($a['resultado_porcentaje']==$b['resultado_porcentaje']){return 0;}
	return $a['resultado_porcentaje'] < $b['resultado_porcentaje'] ? 1 : -1;
});

foreach ($paginaSumaArray1 as $clave => $valor) {
	$miclave= $clave;
	$paginaimprimir.= $paginaSumaArray2[$miclave];
   
}




  if($TotalMetas==0){
	    $Porcentaje= ( $TotalCobranza * 100) / 1;
  }else{
	    $Porcentaje= ( $TotalCobranza * 100) / $TotalMetas;
  }


 
/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato === 'json' ? $filas : $paginaimprimir),"3" => $nroRegistro,"4" =>number_format($TotalCobranza,'0',',','.'),"5" =>number_format($TotalMetas,'0',',','.'),"6" =>number_format($Porcentaje,'0',',','.'));
echo json_encode($informacion);	
exit;


}


function buscarMontoCobro($tipoPago, $tipoCuota ,$fecha1,$fecha2,$local,$tipo,$cod_cobrador,$fecha)
{
	$mysqli = conectar_al_servidor();
 
	$TotalPagos = 0;	
 

// Crear un objeto DateTime a partir de la fecha
$fechaObj = new DateTime($fecha);

// Formatear la fecha en el formato YYYY-MM
$fechaFormateada = $fechaObj->format('Y-m');
 
	$condicionFecha="";
if($fecha1!="" && $fecha2!=""){
	$condicionFecha=" and DATE_FORMAT(hora, '%Y-%m-%d')   between  '$fecha1' and '$fecha2' ";
}
  
 
	$condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }
	 
	 $condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
	
	$condiciontipoPago = "";
	if ($tipoPago != "") {
		$condiciontipoPago = " and  Tipo ='" . $tipoPago . "'";
	}
	
	$condiciontipo = "";
	if ($tipo != "") {
		$condiciontipo = " and  vt.TipoVenta ='" . $tipo . "'";
	}
	
	$condicionEntrega="";
	 if($tipoCuota=="Cuota"){
	   $condicionEntrega=" and (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) !='Entrega'";		
	 }
	 if($tipoCuota=="Entrega"){
	   $condicionEntrega=" and ( (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='Entrega' or (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) ='ENTREGA' )";		
	 }

 
	$sql = "Select ifnull(sum(Monto),0) as TotalPagos from  pago pg inner join venta vt on cod_venta=cod_venta_fk  where 
	(( select cod_cobradorFK from persona inner join zona on cod_persona =cod_cobradorFK where idzona=
	(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )=$cod_cobrador and  DATE_FORMAT(hora, '%Y-%m') = '$fechaFormateada'  and DATE_FORMAT((select fechapago from credito where cod_creditoFK=idcredito), '%Y-%m') <= '$fechaFormateada'  ".$condicionFecha.$condicionlocal.$condiciontipo.$condicionEntrega.$condiciontipoPago;
	
	
	// echo($sql);
	// exit;
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$TotalPagos = $valor['TotalPagos'];
		}
	}
	
	


$datos[0]= $TotalPagos;


return $datos;

}


function obtenermesletrasesp($mes){
	
	if($mes=="01"){return "ENERO";}
	if($mes=="02"){return "FEBRERO";}
	if($mes=="03"){return "MARZO";}
	if($mes=="04"){return "ABRIL";}
	if($mes=="05"){return "MAYO";}
	if($mes=="06"){return "JUNIO";}
	if($mes=="07"){return "JULIO";}
	if($mes=="08"){return "AGOSTO";}
	if($mes=="09"){return "SEPTIEMPBRE";}
	if($mes=="10"){return "OCTUBRE";}
	if($mes=="11"){return "NOVIEMBRE";}
	if($mes=="12"){return "DICIEMBRE";}
	
	
}


verificar($operacion);
?>
