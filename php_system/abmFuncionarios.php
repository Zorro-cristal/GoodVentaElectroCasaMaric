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


$nombre=$_POST['nombre'];
$nombre = utf8_decode($nombre);

$apellido=$_POST['apellido'];
$apellido = utf8_decode($apellido);

$doc=$_POST['doc'];
$doc = utf8_decode($doc);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

$cargo=$_POST['cargo'];
$cargo = utf8_decode($cargo);

$estado=$_POST['estado'];
$estado = utf8_decode($estado);

$idAbmFuncionarios=$_POST['idAbmFuncionarios'];
$idAbmFuncionarios = utf8_decode($idAbmFuncionarios);

$tipofuncionario=$_POST['tipofuncionario'];
$tipofuncionario = utf8_decode($tipofuncionario);


$extperfilFuncionario=$_POST['extperfilFuncionario'];
$extperfilFuncionario = utf8_decode($extperfilFuncionario);

$local=$_POST['local'];
$local = utf8_decode($local);

abm($local,$extperfilFuncionario,$tipofuncionario,$nombre,$apellido,$doc,$fecha,$descripcion,$cargo,$estado,$idAbmFuncionarios,$operacion);

}


if ($operacion == "buscar_informe_salariofuncionario_general") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		
		$local = $_POST['local'];
		$local = utf8_decode($local);
		$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
		buscar_informe_salariofuncionario_general($anho, $local,$formato);
	}
	

		if ($operacion == "buscar_informe_salariofuncionario_general_grafica") {
		$anho = $_POST['anho'];
		$anho = utf8_decode($anho);
		$local = $_POST['local'];
		$local = utf8_decode($local);
		buscar_informe_salariofuncionario_general_grafica($anho,$local);
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
  
if($operacion=="buscaroptionDescripcionArchivoFuncionario")
{

	buscaroptionDescripcionArchivoFuncionario();

}
  
  if($operacion=="NuevoDescripcionArchivoFuncionario")
{
	$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);

	NuevoDescripcionArchivoFuncionario($descripcion);

}
  
  if($operacion=="insertarArchivo")
{
$cod_funcionario=$_POST['cod_funcionario'];
$cod_funcionario = utf8_decode($cod_funcionario);
$descripcion=$_POST['descripcion'];
$descripcion = utf8_decode($descripcion);
$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);
$archivo=$_POST['archivo'];
$archivo = utf8_decode($archivo);
$ext=$_POST['ext'];
$ext = utf8_decode($ext);


insertarArchivo($cod_funcionario,$ext,$archivo,$descripcion,$fecha);
}

if($operacion=="eliminardocumentoArchivoFuncionario")
{
$idcontrato=$_POST['cod_funcionario'];
$idcontrato = utf8_decode($idcontrato);
$iddocumento=$_POST['iddocumento'];
$iddocumento = utf8_decode($iddocumento);
$urldocumento=$_POST['urldocumento'];
$urldocumento = utf8_decode($urldocumento);
eliminardocumentoArchivoFuncionario($idcontrato,$iddocumento,$urldocumento);

}
 
 
 if($operacion=="buscarDocumentosCargaArchivo")
{
$idcontrato=$_POST['cod_funcionario'];
$idcontrato = utf8_decode($idcontrato);
buscarDocumentosCargaArchivo($idcontrato);
}

  
 if($operacion=="buscar"){
 	$doc=$_POST["doc"];
 	$doc=utf8_decode($doc);
	$Funcionarios=$_POST["Funcionarios"];
 	$Funcionarios=utf8_decode($Funcionarios);
	$cargo=$_POST["cargo"];
 	$cargo=utf8_decode($cargo);
	$estado=$_POST["estado"];
 	$estado=utf8_decode($estado);
	$local=$_POST["local"];
 	$local=utf8_decode($local);
	
	$contrato=$_POST["contrato"];
 	$contrato=utf8_decode($contrato);
	
 	BuscarRegistro($local,$contrato,$doc,$Funcionarios,$cargo,$estado);
 } 
 
   
 if($operacion=="buscarFuncionariosCargo"){
 	$buscar=$_POST["buscar"];
	$buscar=utf8_decode($buscar);
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	buscarFuncionariosCargo($buscar,$formato);
 } 
 
 
  if($operacion=="EliminarFuncionariosCargo"){
 	$buscar=$_POST["buscar"];
 	$buscar=utf8_decode($buscar);

 	EliminarFuncionariosCargo($buscar);
 } 
 
  
  if($operacion=="ListadoFuncioarios"){
 	$tipo=$_POST["tipo"];
 	$tipo=utf8_decode($tipo);
	$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	if($tipo=="VENDEDOR"){
		BuscarRegistroVendedor($formato);
	}
	if($tipo=="COBRADOR"){
		BuscarRegistroCobrador($formato);
	}
	if($tipo=="USUARIO SISTEMA"){
		BuscarRegistroUsuarioSistema($formato);
	}
 	
 }
 
 
 
 if($operacion=="buscarSalarioFuncionario")
{
 
$local=$_POST['local'];
$local = utf8_decode($local);

$cargo=$_POST['cargo'];
$cargo = utf8_decode($cargo);

$funcionario=$_POST['funcionario'];
$funcionario = utf8_decode($funcionario);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';

buscarSalarioFuncionario($funcionario,$local,$cargo,$formato);

}



 if($operacion=="salarios")
{
 
$mes=$_POST['mes'];
$mes = utf8_decode($mes);

$ahno=$_POST['ahno'];
$ahno = utf8_decode($ahno);

$cod_funcionarioSalario=$_POST['cod_funcionarioSalario'];
$cod_funcionarioSalario = utf8_decode($cod_funcionarioSalario);

$idFuncionarioSalario=$_POST['idFuncionarioSalario'];
$idFuncionarioSalario = utf8_decode($idFuncionarioSalario);
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';

salarios( $idFuncionarioSalario,$mes,$ahno,$cod_funcionarioSalario,$formato);

}


 if($operacion=="nuevoSueldoCalculo")
{
 
$sueldo=$_POST['sueldo'];
$sueldo = quitarseparadormiles($sueldo);

$fecha=$_POST['fecha'];
$fecha = utf8_decode($fecha);

$cod_persona=$_POST['cod_persona'];
$cod_persona = utf8_decode($cod_persona);

nuevoSueldoCalculo( $sueldo,$fecha,$cod_persona);

}


  
}



function nuevoSueldoCalculo( $sueldo,$fecha,$cod_persona)
{
	
	
if( $sueldo=="" || $fecha==""  || $cod_persona==""  ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
 
$consulta1="Insert into sueldo (sueldo,fecha,codpersona,estado,tipo,desde,estado_registro)
values('$sueldo','$fecha','$cod_persona','Activo','SUELDO','funcionario','PAGADO')";
$stmt1 = $mysqli->prepare($consulta1);


if (!$stmt1->execute()) {
	
echo trigger_error('The query execution failed; MySQL said ('.$stmt1->errno.') '.$stmt1->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
	
}

 
function salarios( $idFuncionarioSalario, $mes,$ahno,$cod_funcionarioSalario,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	 $tarjetas=array();
	
	$condicionLocal="";
	// if($local!=""){
		// $condicionLocal=" and cod_localFK='$local' ";
	// }
	$condicioncargo="";
	// if($cargo!=""){
		// $condicioncargo=" and cod_cargosFK='$cargo' ";
	// }
	
	
		$sql= "SELECT  idfuncionarios,fechaingreso,tipo_contrato,sueldo_base,m.estado,m.cod_cargosFK as cod_cargo ,
		url,cod_localFK,c.nombre as cargo , upper(agrupacion_comision) as agrupacion_comision,comision_desde  
		from funcionarios f inner join cargos c on c.idcargos=f.cod_cargosFK
		inner join metas_salario m on m.cod_cargosFK=c.idcargos
		where f.estado='activo' and m.cod_cargosFK='$cod_funcionarioSalario' and idfuncionarios='$idFuncionarioSalario' ".$condicionLocal.$condicioncargo."  group by agrupacion_comision asc   ";
	  	  
// echo($sql);
// exit;
		  	 
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
 $TotalComision=0;
 $idfuncionarios="";
 $TotalaCobrar="";
 $TotalSalario="";
 $TotalIPS="";
 $PendienteaCobrar="";
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
		  	  $url_img=utf8_encode($valor['url']); 
		  	  $cargo=utf8_encode($valor['cargo']); 
		  	  $idfuncionarios=utf8_encode($valor['idfuncionarios']);  
		  	  $agrupacion_comision=utf8_encode($valor['agrupacion_comision']); 
		  	  $cod_cargo=utf8_encode($valor['cod_cargo']); 
		  	  $comision_desde=utf8_encode($valor['comision_desde']); 
  
			$tabla=buscarDetalleMetasSalario($mes,$ahno,$cod_cargo,$agrupacion_comision,$idfuncionarios);
			
			$tabla3=$tabla[3];
			$tabla1=$tabla[1];
			if($tabla3==0){
				$tabla3=1;
			}
			if($tabla1==0){
				$tabla1=1;
			}
			
			$Efectividad=($tabla1 * 100)/$tabla3;
				 $tarjetas[]=array(
					 "tipo" => "meta",
					 "titulo" => $agrupacion_comision,
					 "monto_titulo" => number_format($tabla[1],'0',',','.'),
					 "detalles" => isset($tabla[4]) ? $tabla[4] : array(),
					 "total_meta" => number_format($tabla[3],'0',',','.'),
					 "efectividad" => number_format($Efectividad,'1',',','.'),
					 "total_cobrar" => number_format($tabla[2],'0',',','.')
				 );
				 $pagina.=" <div class='col-md-6 col-xl-4'>
                <div class='cardtb'>
                  <div class='card-header'>
                    <h3 class='card-title'>".$agrupacion_comision." SOBRE :<b> ".number_format($tabla[1],'0',',','.')." Gs.</b></h3>
                  </div>
                  <div class='card-body' style='overflow:auto;height:200px'>
                    
					$tabla[0]
					 
                  </div>
                  <div class='card-footer'>
                <p class='pTituloC' >Total Meta:<b> ".number_format($tabla[3],'0',',','.')." </b> ==> Efectividad= <b> ".number_format($Efectividad,'1',',','.')."%</b></p>
                   <p class='pTituloC' >Total a Cobrar:<b> ".number_format($tabla[2],'0',',','.')." </b></p>
                  </div>
                </div>
              </div>";
			   $TotalComision=$TotalComision + $tabla[2];  
	  }
	   
 }
			$idfuncionarios=buscarDetalleAdelantoExtraSalario($mes,$ahno,$idfuncionarios);
			
			$pagina.=" <div class='col-md-6 col-xl-4'>
                <div class='cardtb'>
                  <div class='card-header'>
                    <h3 class='card-title'>EXTRA :<b>  ".number_format($idfuncionarios[6],'0',',','.')." Gs.</b></h3>
                  </div>
                  <div class='card-body' style='overflow:auto;height:200px'>
                    $idfuncionarios[0]
					$idfuncionarios[5]				 
					 
                  </div>
                  <div class='card-footer'> 
                   <p class='pTituloC' >Total Cobrado:<b>  ".number_format($idfuncionarios[6],'0',',','.')." </b></p>
                  </div>
                </div>
              </div>";
			
			 $pagina.=" <div class='col-md-6 col-xl-4'>
                <div class='cardtb'>
                  <div class='card-header'>
                    <h3 class='card-title'>ADELANTO :<b> ".number_format($idfuncionarios[2],'0',',','.')."  Gs.</b></h3>
                  </div>
                  <div class='card-body' style='overflow:auto;height:200px'>
                    $idfuncionarios[0]
                    $idfuncionarios[1]				 
					 
                  </div>
                  <div class='card-footer'> 
                   <p class='pTituloC' >Total Cobrado:<b> ".number_format($idfuncionarios[2],'0',',','.')."  </b></p>
                  </div>
                </div>
              </div>";
			  
			  
			  
			  $pagina.=" <div class='col-md-6 col-xl-4'>
                <div class='cardtb'>
                  <div class='card-header'>
                    <h3 class='card-title'>SALARIO COBRADO :<b>  ".number_format($idfuncionarios[4],'0',',','.')." Gs.</b></h3>
                  </div>
                  <div class='card-body' style='overflow:auto;height:200px'>
                    $idfuncionarios[0]
					$idfuncionarios[3]
					 
                  </div>
                  <div class='card-footer'> 
                   <p class='pTituloC' >Total a Cobrado:<b> ".number_format($idfuncionarios[4],'0',',','.')."  </b></p>
                  </div>
                </div>
              </div>";
			  
			   $pagina.=" <div class='col-md-6 col-xl-4'>
                <div class='cardtb'>
                  <div class='card-header'>
                    <h3 class='card-title'>I.P.S. :<b>  ".number_format($idfuncionarios[8],'0',',','.')." Gs.</b></h3>
                  </div>
                  <div class='card-body' style='overflow:auto;height:200px'>
                    $idfuncionarios[0]
					$idfuncionarios[7]
					 
                  </div>
                  <div class='card-footer'> 
                   <p class='pTituloC' >Total a Cobrado:<b> ".number_format($idfuncionarios[8],'0',',','.')."  </b></p>
                  </div>
                </div>
              </div>";

			  $detallesAdicionales=isset($idfuncionarios[9]) ? $idfuncionarios[9] : array();
			  $tarjetas[]=array(
				  "tipo" => "movimiento",
				  "titulo" => "EXTRA",
				  "monto_titulo" => number_format($idfuncionarios[6],'0',',','.'),
				  "detalles" => isset($detallesAdicionales['extra']) ? $detallesAdicionales['extra'] : array(),
				  "etiqueta_total" => "Total Cobrado:",
				  "total" => number_format($idfuncionarios[6],'0',',','.')
			  );
			  $tarjetas[]=array(
				  "tipo" => "movimiento",
				  "titulo" => "ADELANTO",
				  "monto_titulo" => number_format($idfuncionarios[2],'0',',','.'),
				  "detalles" => isset($detallesAdicionales['adelanto']) ? $detallesAdicionales['adelanto'] : array(),
				  "etiqueta_total" => "Total Cobrado:",
				  "total" => number_format($idfuncionarios[2],'0',',','.')
			  );
			  $tarjetas[]=array(
				  "tipo" => "movimiento",
				  "titulo" => "SALARIO COBRADO",
				  "monto_titulo" => number_format($idfuncionarios[4],'0',',','.'),
				  "detalles" => isset($detallesAdicionales['sueldo']) ? $detallesAdicionales['sueldo'] : array(),
				  "etiqueta_total" => "Total a Cobrado:",
				  "total" => number_format($idfuncionarios[4],'0',',','.')
			  );
			  $tarjetas[]=array(
				  "tipo" => "movimiento",
				  "titulo" => "I.P.S.",
				  "monto_titulo" => number_format($idfuncionarios[8],'0',',','.'),
				  "detalles" => isset($detallesAdicionales['ips']) ? $detallesAdicionales['ips'] : array(),
				  "etiqueta_total" => "Total a Cobrado:",
				  "total" => number_format($idfuncionarios[8],'0',',','.')
			  );
			  
 $TotalIPS= $idfuncionarios[8];		  

$TotalExtras=$idfuncionarios[6] ;
 
$TotalaCobrar=($TotalComision + $TotalExtras);
$TotalSalario=$idfuncionarios[4] + $idfuncionarios[2];
$PendienteaCobrar=($TotalComision + $TotalExtras - $TotalIPS) - $TotalSalario;
$Adelanos=$idfuncionarios[2];
	
	if($PendienteaCobrar<=0){
		$PendienteaCobrar=0;
	}
  
$informacion =array("1" => "exito","2" => ($formato==='json' ? $tarjetas : $pagina) ,"3"=> number_format($nroRegistro,'0',',','.') ,"4"=> number_format($TotalaCobrar,'0',',','.') ,"5"=> number_format($TotalSalario,'0',',','.') ,"6"=> number_format($TotalExtras,'0',',','.') ,"7"=> number_format($PendienteaCobrar,'0',',','.'),"8"=> number_format($Adelanos,'0',',','.'),"9"=> number_format($TotalIPS,'0',',','.') );
echo json_encode($informacion);	
exit;
}

function buscarDetalleAdelantoExtraSalario($mes,$ahno,$idfuncionarios)
{
	$mysqli=conectar_al_servidor();
	 
		$sql= "select idsueldo,comision ,totalrecaudado ,sueldo ,fecha ,estado ,tipo ,codpersona ,tipouser ,desde ,estado_registro
		from sueldo where estado='Activo' and desde!='' and codpersona='$idfuncionarios' and DATE_FORMAT(fecha, '%Y-%m') = '".$ahno."-".$mes."' ";
		
		// echo($sql);
		// exit;
 
   $stmt = $mysqli->prepare($sql);
  	 

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
	$paginaAdelanto='';
	$paginaExtra='';
	$paginaSueldo='';
	$paginaIPS='';
	$detallesAdelanto=array();
	$detallesExtra=array();
	$detallesSueldo=array();
	$detallesIPS=array();
	
   $paginatitulo="<table class='tableCabeceraRegistro' style='width: 100%;' >
<tbody>
<tr>
<td class='td_registro' style='width:10%;'>
</td> 
<td class='td_registro' style='width:60%;'>
DESCRIPCION
</td>
<td class='td_registro' style='width:30%;'>
MONTO
</td>
</tr>
</tbody>
</table>
";
 
 $TotalAdelanto=0;
 $TotalExtra=0;
 $TotalSueldo=0;
 $TotalIPS=0;
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {		   
		  	  $sueldo=utf8_encode($valor['sueldo']);
		  	  $tipo=utf8_encode($valor['tipo']);
			  $fecha=$valor['fecha'];
		  	  $estado_registro=utf8_encode($valor['estado_registro']);
		  	    
			    $icono="";
				$tema="";
			 if($estado_registro=="PENDIENTE"){
				$icono=" bx bx-x-circle";
				$tema=" not-completed";				 
			 }else{
				$icono="bx bx-check-circle";
			    $tema="completed";
			 } 
			 
			 $imprimirSalario=" id='$sueldo' data-url='$tipo'  data-name='imprimirSalario'";
			 
			   if($tipo=="ADELANTO" || $tipo=="UNIFORME" || $tipo=="MULTA"|| $tipo=="VENTA ANULADO" ){
				   $detallesAdelanto[]=array(
					   "tipo" => $tipo,
					   "fecha" => $fecha,
					   "monto" => $sueldo,
					   "monto_mostrar" => number_format($sueldo,'0',',','.'),
					   "estado" => $estado_registro,
					   "tema" => $tema,
					   "icono" => $icono,
					   "imprimible" => true
				   );
				   $paginaAdelanto.="
			   	   <div class='reminders' $imprimirSalario>
                      <ul class='task-list'>
                         <li class='$tema'>
                            <div class='task-title'>
                               <i class='$icono'></i>
                                <p>".$tipo."-".$fecha."</p>
                            </div>
							<div class='task-title'>
                                <p>".number_format($sueldo,'0',',','.')."</p>
                            </div>
                        </li>  			
                    </ul>
                </div>";
				    $TotalAdelanto= $TotalAdelanto + $sueldo;
			   }
			   
			    if($tipo=="SUELDO"){
				   $detallesSueldo[]=array(
					   "tipo" => $tipo,
					   "fecha" => $fecha,
					   "monto" => $sueldo,
					   "monto_mostrar" => number_format($sueldo,'0',',','.'),
					   "estado" => $estado_registro,
					   "tema" => $tema,
					   "icono" => $icono,
					   "imprimible" => false
				   );
				   $paginaSueldo.="
			   	   <div class='reminders' >
                      <ul class='task-list'>
                         <li class='$tema'>
                            <div class='task-title'>
                               <i class='$icono'></i>
                               <p>".$tipo."-".$fecha."</p>
                            </div>
							<div class='task-title'>
                                <p>".number_format($sueldo,'0',',','.')."</p>
                            </div>
                        </li>  			
                    </ul>
                </div>";
				    $TotalSueldo= $TotalSueldo + $sueldo;
			   }
			   
			    if($tipo=="EXTRA" || $tipo=="PLUS MOTIVACIONAL"|| $tipo=="PAGO GARANTIAS" ){
				   $detallesExtra[]=array(
					   "tipo" => $tipo,
					   "fecha" => $fecha,
					   "monto" => $sueldo,
					   "monto_mostrar" => number_format($sueldo,'0',',','.'),
					   "estado" => $estado_registro,
					   "tema" => $tema,
					   "icono" => $icono,
					   "imprimible" => true
				   );
				   $paginaExtra.="
			   	   <div class='reminders' $imprimirSalario>
                      <ul class='task-list'>
                         <li class='$tema'>
                            <div class='task-title'>
                               <i class='$icono'></i>
                               <p>".$tipo."-".$fecha."</p>
                            </div>
							<div class='task-title'>
                                <p>".number_format($sueldo,'0',',','.')."</p>
                            </div>
                        </li>  			
                    </ul>
                </div>";
				    $TotalExtra= $TotalExtra + $sueldo;
			   }
			   
			   
			   if($tipo=="I.P.S." ){
				   $detallesIPS[]=array(
					   "tipo" => $tipo,
					   "fecha" => $fecha,
					   "monto" => $sueldo,
					   "monto_mostrar" => number_format($sueldo,'0',',','.'),
					   "estado" => $estado_registro,
					   "tema" => $tema,
					   "icono" => $icono,
					   "imprimible" => true
				   );
				   $paginaIPS.="
			   	   <div class='reminders' $imprimirSalario>
                      <ul class='task-list'>
                         <li class='$tema'>
                            <div class='task-title'>
                               <i class='$icono'></i>
                               <p>".$tipo."-".$fecha."</p>
                            </div>
							<div class='task-title'>
                                <p>".number_format($sueldo,'0',',','.')."</p>
                            </div>
                        </li>  			
                    </ul>
                </div>";
				    $TotalIPS+= $TotalIPS + $sueldo;
			 } 
	   }
 }
  mysqli_close($mysqli);
  
   $RetunDatos[0]=$paginatitulo;
   $RetunDatos[1]=$paginaAdelanto;
   $RetunDatos[2]=$TotalAdelanto;
   $RetunDatos[3]=$paginaSueldo;
   $RetunDatos[4]=$TotalSueldo;
   $RetunDatos[5]=$paginaExtra;
   $RetunDatos[6]=$TotalExtra;
   $RetunDatos[7]=$paginaIPS;
   $RetunDatos[8]=$TotalIPS;
   $RetunDatos[9]=array(
	   "adelanto" => $detallesAdelanto,
	   "sueldo" => $detallesSueldo,
	   "extra" => $detallesExtra,
	   "ips" => $detallesIPS
   );
 return  $RetunDatos;
  
}

function buscarSalarioFuncionario($funcionario,$local,$cargo,$formato='')
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	 $filas=array();
	
 
	$condicionLocal="";
	if($local!=""){
		$condicionLocal=" and cod_localFK='$local' ";
	}
	$condicioncargo="";
	if($cargo!=""){
		$condicioncargo=" and cod_cargosFK='$cargo' ";
	}
	
	$condicionFuncionario="";
	if($funcionario!=""){
		$condicionFuncionario=" and concat(nombre,' ',apellido,' ',ci_funcionario) like '%".$funcionario."%' ";
	}	
	
		$sql= "SELECT  idfuncionarios,fechaingreso,tipo_contrato,sueldo_base,estado,cod_cargosFK,nombre,apellido,ci_funcionario,
		url,cod_localFK,(Select nombre from cargos where idcargos=cod_cargosFK ) as cargo
		from funcionarios  f 
		where f.estado='activo' ".$condicionLocal.$condicioncargo.$condicionFuncionario." ";
	  	  

		  	 
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
		  
		  
		      $ci_funcionario=$valor['ci_funcionario'];
		      $nombre=utf8_encode($valor['nombre']);
		  	  $apellido=utf8_encode($valor['apellido']); 
		  	  $url_img=utf8_encode($valor['url']); 
		  	  $cargo=utf8_encode($valor['cargo']); 
		  	  $cod_cargosFK=utf8_encode($valor['cod_cargosFK']); 
		  	  $idfuncionarios=utf8_encode($valor['idfuncionarios']); 
			  $filas[]=array(
				  "codigo_cargo" => $cod_cargosFK,
				  "codigo_funcionario" => $idfuncionarios,
				  "nombre" => $nombre,
				  "apellido" => $apellido,
				  "funcionario" => $nombre." ".$apellido,
				  "cargo" => $cargo,
				  "imagen" => $url_img
			  );

			 if($formato !== "json") {
				 $pagina.="<div class='sales' id='$cod_cargosFK' data-url='".$nombre." ".$apellido."' data-email='".$idfuncionarios."'  data-name='".$cargo."' onclick='verCerrarSalarioFuncionarios(this)' >
				<h3>".$nombre." - ".$apellido."</h3>
                        <div>
                            <div  class='imgFotoCi' style='background-image: url(".$url_img.")'></div>
                        </div>
						<div class='info'> 
                            <h1 style='font-size: 1.2rem;' >".$cargo." </h1>                            
                        </div>
                </div> ";
			 }
		
			  
			  
	  }
	   
 }
 
  

  
$informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina) ,"3"=> number_format($nroRegistro,'0',',','.') );
echo json_encode($informacion);	
exit;
}


function buscarDetalleMetasSalario($mes,$ahno,$cargo,$agrupacion,$idfuncionarios)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select idmetas_salario, descripcion, tipo, porcentaje, cod_cargosFK, desde, hasta, comision_desde, agrupacion_comision, estado, metodo , tipoVenta
        from metas_salario  where  cod_cargosFK='$cargo' and agrupacion_comision='$agrupacion' and estado='Activo'  order by  hasta desc  ";
		
		// echo($sql);
		// exit;
 
   $stmt = $mysqli->prepare($sql);
  	 

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 
   $pagina.="<table class='tableCabeceraRegistro' style='width: 100%;' >
<tbody>
<tr>
<td class='td_registro' style='width:10%;'>
META
</td> 
<td class='td_registro' style='width:45%;'>
DESCRIPCION
</td>
<td class='td_registro' style='width:15%;'>
DESDE
</td>
 <td class='td_registro' style='width:15%;'>
HASTA
</td>
<td class='td_registro' style='width:15%;'>
COMISION
</td>
</tr>
</tbody>
</table>
";
 
 $VerificarMeta="";
 $CondicionMetas=0;
 $RetunDatos="";
 $TotalMeta=0;
 $comision=0;
 $comisionaCobrar=0;
 $TotalMetaFuncionario=0;
 $detalles=array();
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idmetas_salario=$valor['idmetas_salario'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $tipo=utf8_encode($valor['tipo']);
			  $porcentaje=$valor['porcentaje'];
		  	  $cod_cargosFK=utf8_encode($valor['cod_cargosFK']);
		  	  $desde=utf8_encode($valor['desde']);
			  $hasta=$valor['hasta'];
		  	  $comision_desde=utf8_encode($valor['comision_desde']);
		  	  $agrupacion_comision=utf8_encode($valor['agrupacion_comision']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $metodo=utf8_encode($valor['metodo']);
		  	  $tipoVenta=utf8_encode($valor['tipoVenta']);
		  	 
			 $desde=(float) $desde;
			 $hasta=(float) $hasta;
				
			 if(strlen($porcentaje)>=4 ){
				 $porcentaje1=  number_format($porcentaje,'0',',','.') ;
				
			 }else{
				 $porcentaje1=  $porcentaje." %";
				}
			 
			 
			 if($tipo!='Porcentaje'){
				 $desde1=  number_format($desde,'0',',','.') ;				 
			 }else{
				 $desde1= $desde." %";
			 }
 
			 
			 if($tipo!='Porcentaje'){
				 $hasta1=  number_format($hasta,'0',',','.') ;				  
			 }else{
				 $hasta1= $hasta." %";	
			 }
  
			   $icono="bx bx-check-circle";
			   $tema="completed";
			   
		if($comision_desde!="CALLCENTER"){
			
			 $VerificarMeta=VerificarMeta($tipoVenta,$mes,$ahno,$desde,$hasta,$tipo, $comision_desde,$metodo,$idfuncionarios);
			  $TotalMeta=$VerificarMeta[1];
			  $TotalMetaFuncionario=$VerificarMeta[2];
			  
			  $imprimirSalario="";
			   	$comision=0;	   
			 if($VerificarMeta[0]=="NO"){
				$icono=" bx bx-x-circle";
				$tema=" not-completed";
				$imprimirSalario="";				
			 }else{
				 if($CondicionMetas==0){
					 if($tipo=='Porcentaje'){
						 if($metodo=='FIJO'){
							 $comision=$porcentaje;
						 }else{
							  $comision=  ($TotalMeta * $porcentaje) / 100;
						 }
					}else{
						if($metodo=='FIJO'){
							 $comision=$porcentaje;
						 }else{
							 $comision=  ($TotalMeta * $porcentaje) / 100;
						 }					
					}
					$comisionaCobrar=$comision;
					$imprimirSalario=" id='$comision' data-url='$agrupacion'  data-name='imprimirSalario'";
				}
				 $CondicionMetas++;
			 }
			 
			 $descripcionporcentaje="";
			 if($tipo=='Porcentaje' && strlen($porcentaje)<="3"){
				 $descripcionporcentaje=" - ".$porcentaje."%";
			 }
			 
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			   	   <div class='reminders' $imprimirSalario >
                      <ul class='task-list'>
                         <li class='$tema'>
                            <div class='task-title'>
                               <i class='$icono'></i>
                                <p>".$descripcion.$descripcionporcentaje."</p>
                            </div>
							<div class='task-title'>
                                <p>".$desde1."</p>
                            </div>
							<div class='task-title'>
                                <p>".$hasta1."</p>
                            </div>
							<div class='task-title'>
                                <p>".number_format($comision,'0',',','.')."</p>
                            </div>
                        </li>  			
                    </ul>
                </div>";
					
		}else{
			 
			
			$VerificarMeta=VerificarCallCenter($mes,$ahno,$idfuncionarios,$tipo, $desde, $hasta) ;
			  $TotalMeta=$VerificarMeta[1];
			  $TotalMetaFuncionario=$VerificarMeta[2];
			  
			  $imprimirSalario="";
			   	$comision=0;	   
			 if($VerificarMeta[0]=="NO"){
				$icono=" bx bx-x-circle";
				$tema=" not-completed";
				$imprimirSalario="";				
			 }else{
				 if($CondicionMetas==0){
					 if($tipo=='Porcentaje'){
						 if($metodo=='FIJO'){
							 $comision=$porcentaje;
						 }else{
							  $comision=  ($TotalMeta * $porcentaje) / 100;
						 }
					}else{
						if($metodo=='FIJO'){
							 $comision=$porcentaje;
						 }else{
							 $comision=  ($TotalMeta * $porcentaje) / 100;
						 }					
					}
					$comisionaCobrar=$comision;
					$imprimirSalario=" id='$comision' data-url='$agrupacion'  data-name='imprimirSalario'";
				}
				 $CondicionMetas++;
			 }
			 
			 $descripcionporcentaje="";
			 if($tipo=='Porcentaje' && strlen($porcentaje)<="3"){
				 $descripcionporcentaje=" - ".$porcentaje."%";
			 }
			 
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			   	   <div class='reminders' $imprimirSalario >
                      <ul class='task-list'>
                         <li class='$tema'>
                            <div class='task-title'>
                               <i class='$icono'></i>
                                <p>".$descripcion.$descripcionporcentaje."</p>
                            </div>
							<div class='task-title'>
                                <p>".$desde1."</p>
                            </div>
							<div class='task-title'>
                                <p>".$hasta1."</p>
                            </div>
							<div class='task-title'>
                                <p>".number_format($comision,'0',',','.')."</p>
                            </div>
                        </li>  			
                    </ul>
                </div>";
 
		}

		$detalles[]=array(
			"descripcion" => $descripcion.$descripcionporcentaje,
			"desde" => $desde1,
			"hasta" => $hasta1,
			"comision" => $comision,
			"comision_mostrar" => number_format($comision,'0',',','.'),
			"tema" => $tema,
			"icono" => $icono,
			"imprimible" => ($imprimirSalario!=""),
			"tipo_impresion" => $agrupacion
		);

				
	  }
 }
 
  
 
  mysqli_close($mysqli);
  
   $RetunDatos[0]=$pagina;
   $RetunDatos[1]=$TotalMeta;
   $RetunDatos[2]=$comisionaCobrar;
   $RetunDatos[3]=$TotalMetaFuncionario;
   $RetunDatos[4]=$detalles;
 return  $RetunDatos;
 
  

}



/*Buscar Registro en vista*/
function VerificarCallCenter($mes,$ahno,$idfuncionarios,$tipo, $desde, $hasta)
{
$mysqli=conectar_al_servidor();
 
$sql= "select cf.tipo as tipoFuncionario,cod_cobr_vend
from  funcionarios inner join cuentas_funcionario cf on cod_funcionarios=idfuncionarios
 where cod_funcionarios='$idfuncionarios' and cf.tipo='USUARIO SISTEMA'  " ;

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

$datos="";
$retorno="SI";
$TotalMeta=0;
$TotalMetaCobranza=0;
$Metas="";
$porcentajeCobrado=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  
   
$cod_cobr_vend = utf8_encode($valor['cod_cobr_vend']);
 
 $datos = buscarMetasCallCenter($mes, $ahno, $cod_cobr_vend);

$retorno = "NO"; // Valor por defecto   

if (!empty($datos)) {
    $TotalMeta = $TotalMeta + $datos[0];
    $TotalMetaCobranza = $TotalMetaCobranza + $datos[1];
	
	 $porcentajeCobrado = calcularPorcentaje($TotalMeta, $TotalMetaCobranza, $tipo);

    if (verificarRango($porcentajeCobrado, $desde, $hasta)) {
        $retorno = "SI";
    }
	
}


}
}

 $Metas[0]=$retorno;
 $Metas[1]=$TotalMeta;
 $Metas[2]=$TotalMetaCobranza; 
 return $Metas;
}

function buscarMetasCallCenter($mes, $ahno, $cod_cobr_vend)
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	
 
	$condicionFecha=" and DATE_FORMAT(cc.fechafin, '%Y-%m') = '".$ahno."-".$mes."' ";
 
 
		$sql= "Select cod_controlcobrador, montoNeto 
		from controlcobrador cc where cc.cod_callcenterFK = '$cod_cobr_vend' ".$condicionFecha."  group by cod_controlcobrador asc  ";
	  	 
		 // echo($sql);
		 // exit;
 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result); 
 $totalMetas  = 0;   
 $TotalNeto  = 0;
$datos=null; 
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		     $cod_controlcobrador=$valor['cod_controlcobrador'];
		     $montoNeto=$valor['montoNeto'];
		        
			 $totalMetas = $totalMetas + buscarTotalCobradoCallCenter($cod_controlcobrador);
			 $TotalNeto = $TotalNeto + $montoNeto;
 	 
	  }
  
 }
 
$datos[0]= $totalMetas; 
$datos[1]= $TotalNeto; 
 
return $datos;
}
 
 
function buscarTotalCobradoCallCenter($cod_controlcobrador)
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";
	  
		$sql= "Select sum(Monto) as Monto from pago   		 
		where cod_tareaCobadorFK = '$cod_controlcobrador' and Monto>0 ";
	  	 
		 // echo($sql);
		 // exit;
 
   $stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $styleName="tableRegistroSearch";
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalCobranza  = 0; 
  if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result))
	  { 
		      $totalCobranza+=$valor['Monto'];
  
	  }
  
 }
 
return $totalCobranza;
}


/*Buscar Registro en vista*/
function VerificarMeta($tipoVenta,$mes,$ahno,$desde,$hasta,$tipo,$comision_desde,$metodo,$idfuncionarios)
{
$mysqli=conectar_al_servidor();

if($comision_desde=="COBRANZA"){
	$comision_desde2="COBRADOR";
}else{
	$comision_desde2="VENDEDOR";
}
   
$sql= "select cf.tipo as tipoFuncionario,cod_cobr_vend
from  funcionarios 
inner join cuentas_funcionario cf on cod_funcionarios=idfuncionarios
 where cod_funcionarios='$idfuncionarios' and cf.tipo='$comision_desde2' " ;

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

$datos="";
$retorno="NO";
$TotalMeta=0;
$TotalMetaCobranza=0;
$Metas="";
$porcentajeCobrado=0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  
 

$tipoFuncionario = utf8_encode($valor['tipoFuncionario']);
$cod_cobr_vend = utf8_encode($valor['cod_cobr_vend']);

$condicion = "";
$retorno = "NO"; // Valor por defecto

$usarVenta = ($comision_desde == "VENTA");
$usarCobranza = ($comision_desde == "COBRANZA");

if ($tipoFuncionario == "VENDEDOR") {
    if ($usarVenta) {
        $condicion = "1";
        $datos = buscarMetasVenta($tipoVenta,$mes, $ahno, $tipo, $cod_cobr_vend);
    } elseif ($usarCobranza) {
        $condicion = "2";
        $datos = buscarMetasCobrador($tipoVenta,$mes, $ahno, $tipo, $cod_cobr_vend);
    }
} else {
    if ($usarVenta) {
        $condicion = "3";
        $datos = buscarMetasVenta($tipoVenta,$mes, $ahno, $tipo, $cod_cobr_vend);
    } elseif ($usarCobranza) {
        $condicion = "4";
        $datos = buscarMetasCobrador($tipoVenta,$mes, $ahno, $tipo, $cod_cobr_vend);
    }
}

if (!empty($datos)) {
    $TotalMeta = $TotalMeta + $datos[1];
    $TotalMetaCobranza = $TotalMetaCobranza + $datos[2];

    $porcentajeCobrado = calcularPorcentaje($TotalMeta, $TotalMetaCobranza, $tipo);

    if (verificarRango($porcentajeCobrado, $desde, $hasta)) {
        $retorno = "SI";
    }
}
}
}

 $Metas[0]=$retorno;
 $Metas[1]=$TotalMeta;
 $Metas[2]=$TotalMetaCobranza;
 $Metas[3]=$porcentajeCobrado; 
 return $Metas;
}




function sanitizarMeta($valor) {
    return ($valor == 0) ? 1 : $valor;
}

function calcularPorcentaje($total, $cobranza, $tipo) {
    $total = sanitizarMeta($total);
    $cobranza = sanitizarMeta($cobranza);

    if ($tipo == "Porcentaje") {
        return round(($total * 100) / $cobranza);
    } else {
        return round($total);
    }
}

function verificarRango($porcentaje, $desde, $hasta) {
    return ($porcentaje >= $desde && $porcentaje <= $hasta);
}


 
function buscarMetasVenta($tipoVenta,$mes,$ahno,$tipo,$idfuncionarios)
{
	
	$mysqli=conectar_al_servidor();
	 
	 $pagina="";

	$condicionFecha=" and DATE_FORMAT(m.fecha, '%Y-%m') = '".$ahno."-".$mes."' ";
 
 
		$sql= "Select idvendedor, nombre, nrotelef,  cod_localfk,url,m.fecha,m.montoContado,m.montoCredito,m.idMetas,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local , DATE_FORMAT(m.fecha, '%Y-%m') as mesVenta , m.Estado
		from metas  m
		inner join vendedor ve on ve.idvendedor = m.cod_vendedorFK
		where ve.estado='activo' and m.Estado='Activo' and ve.idvendedor = '$idfuncionarios' ".$condicionFecha."  group by idMetas asc  ";
	  	 
		 // echo($sql);
		 // exit;
 
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
 $Datos="";
 $TotalMetasFuncionario=0;
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
		  	  $mesVenta=utf8_encode($valor['mesVenta']);
		  	  $Estado=utf8_encode($valor['Estado']);


				if($tipoVenta=="CREDITO"){
					$TotalMetasFuncionario=$montoCredito;
				 }
				if($tipoVenta=="CONTADO"){
					$TotalMetasFuncionario=$montoContado;
				}
				if($tipoVenta==""){
					$TotalMetasFuncionario=$montoCredito+$montoContado;
					}
			 
			 
			 $totalMetas= $totalMetas + $TotalMetasFuncionario; 
			 
			 $totalVentas =buscarTotalVentaVendedor($tipoVenta,$idvendedor,$mesVenta);

		  	 $TotalVenta2=$TotalVenta2 + $totalVentas;
			 
			 if($TotalMetasFuncionario==0 || $TotalMetasFuncionario==""){
				 $TotalMetasFuncionario=1;
			 }
			 
			 $Resultado1= ($totalVentas * 100 ) / $TotalMetasFuncionario;
							  
			  
	  }
	  if($tipo=="Porcentaje"){
		   $Porcentaje= ($TotalVenta2 * 100 ) / $totalMetas;
	  }else{
		   $Porcentaje= $TotalVenta2 ;
	  }
	  
 }
$Datos[0]=$Porcentaje;
$Datos[1]=$TotalVenta2;
$Datos[2]=$TotalMetasFuncionario;
return $Datos;
}



function buscarMetasCobrador($tipoVenta,$mes,$ahno,$tipo,$cod_cobr_vend)
{
	$mysqli=conectar_al_servidor();
 
	 $pagina='';
	 
	$condicionFecha=" and DATE_FORMAT(fecha, '%Y-%m') = '".$ahno."-".$mes."' ";
  
	$condicioncobrador=" and cod_cobradorFK  = '".$cod_cobr_vend."'";
  
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
 $Metas=0;
 $monto=0;
 $Resultado1=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  	  $idAbm=utf8_encode($valor['cod_meta_cobrador']); 
		  	  $monto=utf8_encode($valor['monto']); 
		  	  $cod_cobradorFK=utf8_encode($valor['cod_cobradorFK']);
			  
			  $TotalMetas=$TotalMetas + $monto ;
			  $TotalCobrado=buscarMontoCobro($mes,$ahno,$cod_cobradorFK);
			    $TotalCobranza=$TotalCobrado[0];
 
				$Resultado1= ($TotalCobrado[0] * 100 ) / $monto;
		   
	  }
 }
	  if($tipo=="Porcentaje"){
		   $Porcentaje= $Resultado1 ;
	  }else{
		   $Porcentaje= $TotalCobranza ;
	  }
	  

$Datos[0]=$Porcentaje;
$Datos[1]=$TotalCobranza;
$Datos[2]=$monto;
return $Datos;

}


function buscarMontoCobro($mes,$ahno,$cod_cobrador)
{
	$mysqli = conectar_al_servidor();
 
	$TotalPagos = 0;	
 
	$condicionFecha="  ";
 
	$condiciontipo = " and  vt.TipoVenta ='CREDITO'";
		 
	$condicionEntrega=" and (Select plazo from credito l where l.idcredito=pg.cod_creditoFK) !='Entrega' ";		
 
	$sql = "Select ifnull(sum(Monto),0) as TotalPagos from  pago pg inner join venta vt on cod_venta=cod_venta_fk  where 
	(( select cod_cobradorFK from persona inner join zona on cod_persona =cod_cobradorFK where idzona=
	(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )=$cod_cobrador and  DATE_FORMAT(hora, '%Y-%m') = '".$ahno."-".$mes."'  and DATE_FORMAT((select fechapago from credito where cod_creditoFK=idcredito), '%Y-%m') <= '".$ahno."-".$mes."'  ".$condicionFecha.$condiciontipo.$condicionEntrega;
	
	
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


function buscarAccion($idAbm)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
		$sql= "Select idMetas, montoContado ,montoCredito , Estado, Cod_vendedorFK
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
 $montoCredito="0";
 $montoContado="0";
 $idMetas = '0';
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $montoContado=$valor['montoContado']; 
		      $montoCredito=$valor['montoCredito']; 
			  $idMetas=$valor['idMetas']; 			  
	  }
 }
 $Resultado[0]= $montoContado;
 $Resultado[1]= $montoCredito;


 return $Resultado;	



}


function buscarTotalVentaVendedor($tipoVenta,$Vendedor,$fecha1)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	  
	 	$condicionfecha="";
	if($fecha1!="" || $fecha2!=""){
		$condicionfecha=" and DATE_FORMAT(fecha_venta, '%Y-%m') = '".$fecha1."' ";
	}
 
	 	$condiciontipoVenta="";
	if($tipoVenta!=""  ){
		$condiciontipoVenta=" and TipoVenta = '".$tipoVenta."' ";
	}
	 	
		$sql= "Select ifnull(sum(total_venta),0) as total_venta  
        from venta vt where  Vendedor1='".$Vendedor."' ".$condicionfecha.$condiciontipoVenta."  and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0   limit 1 ";
 
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

 

/*Funcion para insertar,modificar o eliminar registros*/
function EliminarFuncionariosCargo($buscar)
{

if($buscar==""){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor(); 
 
$consulta1="delete from cuentas_funcionario where cod_cuentas_funcionario='$buscar'";

$stmt1 = $mysqli->prepare($consulta1);
 
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}




/*Buscar Registro en vista*/
function buscarFuncionariosCargo($buscar,$formato='')
{
$mysqli=conectar_al_servidor();

$sql= " select cod_cuentas_funcionario ,cod_cobr_vend ,tipo ,cod_funcionarios ,
		if(tipo='VENDEDOR',(Select upper(nombre) from vendedor where idvendedor=cod_cobr_vend), (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobr_vend ) ) as nombre
		from cuentas_funcionario where cod_funcionarios='$buscar' order by tipo asc , nombre asc  ";/*Sentencia para buscar registros*/

// echo($sql);
// exit;

$pagina = "";
$filas = array();
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
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result)) 
{  
 
$cod_cuentas_funcionario = utf8_encode($valor['cod_cuentas_funcionario']); 
$nombre = utf8_encode($valor['nombre']);   
$tipo = utf8_encode($valor['tipo']);   

$filas[]=array(
	"codigo" => $cod_cuentas_funcionario,
	"funcionario" => $nombre,
	"tipo" => $tipo
);

$Accion="";
if($formato!='json'){
$Accion=" <input type='button' id='$cod_cuentas_funcionario'  value='Eliminar' class='btn4' onclick='EliminarFuncionariosCargo(this)'> ";

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' >
<td  id='td_id'      style='display:none'>".$cod_cuentas_funcionario."</td>
<td  id='td_datos_1' style='width:60%'>".$nombre."</td> 
<td  id='td_datos_2' style='width:20%'>".$tipo."</td>
<td  id='td_datos_3' style='width:20%'>".$Accion."</td> 
</tr>
</table>";
	}


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato=='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}



/*Funcion para insertar,modificar o eliminar registros*/
function nuevoFuncionarioCargo($idabm,$TipoListaFuncionarios,$idAbmFuncionarios,$operacion)
{

if($idabm==""){
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
 
$consulta1="Insert into cuentas_funcionario ( cod_cobr_vend,tipo,cod_funcionarios )values(?,?,?)";

$stmt1 = $mysqli->prepare($consulta1);
$ss='sss';
$stmt1->bind_param($ss,$idabm,$TipoListaFuncionarios,$idAbmFuncionarios);
 

if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}


$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}


/*Funcion para insertar,modificar o eliminar registros*/
function abm($local,$extperfilFuncionario,$tipofuncionario,$nombre,$apellido,$doc,$fecha,$descripcion,$cargo,$estado,$idAbmFuncionarios,$operacion)
{

if($nombre==""  || $apellido=="" ){
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
$consulta1="Insert into funcionarios ( tipo,fechaingreso,tipo_contrato,estado,cod_cargosFK,nombre,apellido,ci_funcionario,cod_localFK)
values(?,?,?,?,?,upper(?),upper(?),?,?)";

$stmt1 = $mysqli->prepare($consulta1);
$ss='sssssssss';
$stmt1->bind_param($ss,$tipofuncionario,$fecha,$descripcion,$estado,$cargo,$nombre,$apellido,$doc,$local);
 
}

if($operacion=="editar")
{

$consulta1="Update funcionarios set tipo=?,fechaingreso=?,tipo_contrato=?,estado=?,cod_cargosFK=?,nombre=upper(?),apellido=(?),ci_funcionario=?,cod_localFK=? where idfuncionarios=?";	
$stmt1 = $mysqli->prepare($consulta1);
$ss='ssssssssss';
$stmt1->bind_param($ss,$tipofuncionario,$fecha,$descripcion,$estado,$cargo,$nombre,$apellido,$doc,$local,$idAbmFuncionarios);

}
if (!$stmt1->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;

}

 
if($extperfilFuncionario!=''){
	if($idAbmFuncionarios==""){
		$idAbmFuncionarios=obtenerUltimaId();
	}	
	cargarFotos($idAbmFuncionarios);
}



$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}


function obtenerUltimaId()
{
	$cod_persona ="";
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "Select idfuncionarios from funcionarios order by idfuncionarios desc limit 1";
	
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
		      $cod_persona=$valor['idfuncionarios'];	  	 
			  
	  }
 }
 
  mysqli_close($mysqli);
 return $cod_persona;
}



 function cargarFotos($cod_persona){
	
	$extperfilFuncionario=$_POST['extperfilFuncionario'];
$extperfilFuncionario = utf8_decode($extperfilFuncionario);

			  $nombreArchivo = generarCodigoAleatorio(7) . $cod_persona;
$ruta="/fotos/fotoPerfil";
$nombrePost = 'fotoperfilFuncionario';
$respuesta = mover_archivo_carpeta($ruta,$nombreArchivo,$nombrePost,$extperfilFuncionario);

$ruta="/GoodVentaElectroCasaMaric/fotos/fotoPerfil/".$nombreArchivo.".".$extperfilFuncionario;

if($respuesta){
	$mysqli=conectar_al_servidor();
	$consulta="UPDATE funcionarios SET url = '$ruta' WHERE idfuncionarios  = '$cod_persona'";	
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
function BuscarRegistro($local,$contrato,$doc,$Funcionarios,$cargo,$estado)
{
$mysqli=conectar_al_servidor();
$filas=array();
$formato=isset($_POST['formato']) ? $_POST['formato'] : '';
$condiciondoc="";
if($doc!=""){
	$condiciondoc=" and ci_funcionario like '%".$doc."%'";
}
$condicioncargo="";
if($cargo!=""){
	$condicioncargo=" and (Select nombre from cargos where idcargos=cod_cargosFK ) like '%".$cargo."%'";
}

$condicionlocal="";
if($local!=""){
	$condicionlocal=" and cod_localFK = '".$local."'";
}

$condicionFuncionarios="";
if($Funcionarios!=""){
	$condicionFuncionarios=" and concat(nombre,' ',apellido) like '%".$Funcionarios."%'";
}

$condicioncontrato="";
if($contrato!=""){
	$condicioncontrato=" and tipo_contrato like '%".$contrato."%'";
}
$sql= "select tipo,fechaingreso,tipo_contrato,estado,cod_cargosFK,nombre,apellido,ci_funcionario, idfuncionarios, 
(Select nombre from cargos where idcargos=cod_cargosFK ) as cargo ,
(Select Nombre from local where cod_local=cod_localFK ) as local , url ,cod_localFK
from  funcionarios 
where estado=? ".$condiciondoc.$condicioncargo.$condicionFuncionarios.$condicionlocal.$condicioncontrato;
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
 
$tipo = utf8_encode($valor['tipo']);/*Obtenemos el registro mediante el nombre del atributo */      
$fechaingreso = utf8_encode($valor['fechaingreso']);          
$tipo_contrato = utf8_encode($valor['tipo_contrato']);          
$cod_cargosFK = utf8_encode($valor['cod_cargosFK']); 
$nombre = utf8_encode($valor['nombre']); 
$apellido = utf8_encode($valor['apellido']); 
$estado = utf8_encode($valor['estado']); 
$ci_funcionario = utf8_encode($valor['ci_funcionario']); 
$idfuncionarios = utf8_encode($valor['idfuncionarios']); 
$cargo = utf8_encode($valor['cargo']);  
$url = utf8_encode($valor['url']);  
$cod_localFK = utf8_encode($valor['cod_localFK']);  
$local = utf8_encode($valor['local']); 
 
// Fecha inicial
$fechaInicio = new DateTime($fechaingreso);

// Fecha actual
$fechaActual = new DateTime(); // Toma la fecha actual del sistema

// Calcular la diferencia
$diferencia = $fechaInicio->diff($fechaActual);

// Mostrar la diferencia en años, meses y días
 $andiguedad=  $diferencia->y . " años, " . $diferencia->m . " meses y " . $diferencia->d . " días.";
 

	  $filas[]=array(
		"codigo" => $idfuncionarios,
		"documento" => $ci_funcionario,
		"funcionario" => $nombre." ".$apellido,
		"cargo" => $cargo,
		"antiguedad" => $andiguedad,
		"tipo_contrato" => $tipo_contrato,
		"local" => $local,
		"tipo" => $tipo,
		"fecha_ingreso" => $fechaingreso,
		"codigo_cargo" => $cod_cargosFK,
		"nombre" => $nombre,
		"apellido" => $apellido,
		"estado" => $estado,
		"foto" => $url,
		"codigo_local" => $cod_localFK
	  );

	  $styleName=CargarStyleTable($styleName);
	  if($formato !== "json") {
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmFuncionarios(this)'>
<td id='td_id' style='width:5%; background-color: #efeded;color:red'>".$idfuncionarios."</td>
<td  id='td_datos_1' style='width:10%'>".$ci_funcionario."</td>
<td  id='td_datos_10' style='width:15%'>".$nombre." ".$apellido."</td>
<td  id='td_datos_2' style='width:10%'>".$cargo."</td>
<td  				 style='width:10%'>".$andiguedad."</td>
<td  id='td_datos_3' style='width:10%'>".$tipo_contrato."</td>
<td  id='td_datos_4' style='display:none'>".$tipo."</td>
<td  id='td_datos_5' style='display:none'>".$fechaingreso."</td>
<td  id='td_datos_6' style='display:none'>".$cod_cargosFK."</td>
<td  id='td_datos_7' style='display:none'>".$nombre."</td>
<td  id='td_datos_8' style='display:none'>".$apellido."</td>
<td  id='td_datos_9' style='display:none'>".$estado."</td>
<td  id='td_datos_11' style='display:none'>".$url."</td>
<td  id='td_datos_12' style='display:none'>".$cod_localFK."</td>
<td  id='td_datos_13' style='width:10%'>".$local."</td>
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

/*Buscar Registro en vista*/
function BuscarRegistroVendedor($formato='')
{
$mysqli=conectar_al_servidor();

$sql= "  Select idvendedor, nombre, nrotelef, estado, cod_localfk,sector,url,
		(select Nombre from local where cod_local=cod_localfk limit 1 ) as local
		from vendedor where estado='Activo' order by local asc  ";/*Sentencia para buscar registros*/
$pagina = "";   
$filas = array();

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
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{  



$idvendedor = utf8_encode($valor['idvendedor']);/*Obtenemos el registro mediante el nombre del atributo */      
$nombre = utf8_encode($valor['nombre']);   
$local = utf8_encode($valor['local']);   

	  $filas[]=array(
		  "codigo"=>$idvendedor,
		  "funcionario"=>$nombre,
		  "tipo"=>"VENDEDOR",
		  "local"=>$local
	  );

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmListaFincionario(this)'>
<td  id='td_id'      style='display:none'>".$idvendedor."</td>
<td  id='td_datos_1' style='width:40%'>".$nombre."</td> 
<td  id='td_datos_2' style='width:20%'>VENDEDOR</td>
<td  id='td_datos_3' style='width:40%'>".$local."</td> 
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
function BuscarRegistroCobrador($formato='')
{
$mysqli=conectar_al_servidor();

$sql= " Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobrador ) as nombre , cod_cobrador ,
(select Nombre from local where cod_local=cod_localFK limit 1 ) as local from cobrador where estado='Activo' order by local asc ";/*Sentencia para buscar registros*/
$pagina = "";   
$filas = array();

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
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{   

$cod_cobrador = utf8_encode($valor['cod_cobrador']);/*Obtenemos el registro mediante el nombre del atributo */      
$nombre = utf8_encode($valor['nombre']);   
$local = utf8_encode($valor['local']);   

	  $filas[]=array(
		  "codigo"=>$cod_cobrador,
		  "funcionario"=>$nombre,
		  "tipo"=>"COBRADOR",
		  "local"=>$local
	  );

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmListaFincionario(this)'>
<td  id='td_id'      style='display:none'>".$cod_cobrador."</td>
<td  id='td_datos_1' style='width:40%'>".$nombre."</td> 
<td  id='td_datos_2' style='width:20%'>COBRADOR</td> 
<td  id='td_datos_3' style='width:40%'>".$local."</td> 
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
function BuscarRegistroUsuarioSistema($formato='')
{
$mysqli=conectar_al_servidor();

$sql= " Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_usuario ) as nombre , cod_usuario ,
(select Nombre from local where cod_local=cod_localFK limit 1 ) as local from usuario where estado='Activo' order by local asc ";/*Sentencia para buscar registros*/
$pagina = "";   
$filas = array();

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
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))/*bucle para recorrer la fila o filas obtenidas*/
{   

$cod_usuario = utf8_encode($valor['cod_usuario']);/*Obtenemos el registro mediante el nombre del atributo */      
$nombre = utf8_encode($valor['nombre']);   
$local = utf8_encode($valor['local']);   

	  $filas[]=array(
		  "codigo"=>$cod_usuario,
		  "funcionario"=>$nombre,
		  "tipo"=>"USUARIO SISTEMA",
		  "local"=>$local
	  );

	  $styleName=CargarStyleTable($styleName);
	  $pagina.="
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmListaFincionario(this)'>
<td  id='td_id'      style='display:none'>".$cod_usuario."</td>
<td  id='td_datos_1' style='width:40%'>".$nombre."</td> 
<td  id='td_datos_2' style='width:20%'>USUARIO SISTEMA</td> 
<td  id='td_datos_3' style='width:40%'>".$local."</td> 
</tr>
</table>";


}
}

/*Retornamos los datos obtenidos mediante el JSON */      
$informacion =array("1" => "exito","2" => ($formato === "json" ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;
}
function buscaroptionDescripcionArchivoFuncionario()
{
	$mysqli=conectar_al_servidor();
	
		$sql= "Select * from descripcion_archivo_funcionario where estado='Activo' ";
		
		
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
		  
		  
		      $iddescripcion_archivo_funcionario=$valor['iddescripcion_archivo_funcionario'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
				  	 
		  	 
			    	
			  $pagina.="<option  value='$iddescripcion_archivo_funcionario' >".$descripcion."</option>";     
			  
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}

function NuevoDescripcionArchivoFuncionario($descripcion)
{
	
if($descripcion==""   ){
$informacion =array("1" => "camposvacio");
echo json_encode($informacion);	
exit;
}

$mysqli=conectar_al_servidor();

$consulta1="Insert into descripcion_archivo_funcionario (descripcion,estado) values (upper(?),'Activo')";
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
function buscarDocumentosCargaArchivo($codigo)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $formato=isset($_POST['formato']) ? $_POST['formato'] : '';
	 $filas=array();
		$sql= "SELECT *
				FROM archivos_funcionario where cod_funcionarioFK='$codigo'";
  
   
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
		  
		  
		      $idarchivos_funcionario=$valor['idarchivos_funcionario'];
		  	  $archivourl=utf8_encode($valor['url']);
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $cod_funcionarioFK=$valor['cod_funcionarioFK'];
		  	 
		  	 
			  $codigo= substr(str_shuffle($permitted_chars), 0, 5);
			  $filas[]=array(
				  'codigo_interno'=>$codigo,
				  'codigo_archivo'=>$idarchivos_funcionario,
				  'codigo_funcionario'=>$cod_funcionarioFK,
				  'url'=>$archivourl,
				  'tipo'=>'PDF',
				  'descripcion'=>$descripcion,
				  'fecha'=>$fecha
			  );
			  
			  
		  	  $pagina.="
<table id='$codigo' class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>
<tr id='tbSelecRegistroArchivo' onclick='SeleccionarItemArchivosFuncionario(this)' name='tableRegistroSelec'>
<td id='td_id_1' style='display:none'>".$codigo."</td>
<td id='td_id_2' style='display:none'>".$idarchivos_funcionario."</td>
<td id='td_id_3' style='display:none'>".$cod_funcionarioFK."</td>
<td id='td_datos_1' style='display:none'>".$archivourl."</td>
<td id='' style='width:20%'>PDF</td>
<td id='td_datos_2' style='width:60%'>".$descripcion."</td>
<td id='td_datos_3' style='width:20%'>".$fecha."</td>
</tr>
</table>";
			  
			  $codigo="";
	  }
 }
 
 
 mysqli_close($mysqli);
 $informacion =array("1" => "exito","2" => ($formato==='json' ? $filas : $pagina),"3" => $nroRegistro);
echo json_encode($informacion);	
exit;


}


function insertarArchivo($cod_detalle,$exte,$archivo,$descripcion,$fecha)
{
	$documento=substr($archivo, strpos($archivo, ",") + 1);;
	$documento = base64_decode($documento);
	
	$id_documento=rand(10,5000);		  
	$donde="../archivospdffuncionario/";
	$id_documento=$cod_detalle;
	
	$id_f=subir_imagen_base64($donde,$documento,$id_documento,$exte);
	$ruta="/GoodVentaElectroCasaMaric/archivospdffuncionario/".$cod_detalle.$id_f.'.'.$exte;
	
	CargaArchivoFuncionario($ruta,$cod_detalle,$descripcion,$fecha);
}
function CargaArchivoFuncionario($Urldoc,$idcontratofk,$descripcion,$fecha){
	$mysqli=conectar_al_servidor();
	$consulta="INSERT INTO archivos_funcionario (url,cod_funcionarioFK,descripcion,fecha) VALUES ('$Urldoc','$idcontratofk','$descripcion','$fecha') ";
	
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

function eliminardocumentoArchivoFuncionario($idcontratoFK,$iddocumento,$urldocumento)
{
	$mysqli=conectar_al_servidor();
	$sql= "DELETE FROM archivos_funcionario WHERE cod_funcionarioFK='$idcontratoFK' and idarchivos_funcionario='$iddocumento'";
 
 
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


function buscar_informe_salariofuncionario_general($anho,$local,$formato='')
{

	$styleName = "tableRegistroSearch";
	$td = '';
	$pagina = '';
	$filas = array();
	
	for($x = 1; $x <= 31; $x++){
		$fila=array("dia" => $x);
		if($formato!='json'){
			$styleName = CargarStyleTable($styleName);
			$pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' >
			<tr id='tbSelecRegistro'><td style='width:5%'>" . $x . "</td>";
		}
		for ($i = 1; $i <= 12; $i++) {
			$td='';
			$total = (float)obtener_total_salario_dia($anho,$i,$x,$local);
			$fila["mes_".$i]=$total;
			$fila["mes_".$i."_formateado"]=number_format($total, '0', ',', '.');
			$td = "<td style='width:5%'>" .  number_format($total, '0', ',', '.') . "</td>";
			if($formato!='json'){$pagina.= $td;}
		}
		$filas[]=$fila;
		
		if($formato!='json'){$pagina.="</tr>
		</table>";}
	}

	$informacion = array("1" => "exito", "2" => ($formato=='json' ? $filas : $pagina));
	echo json_encode($informacion);
	exit;
}

function obtener_total_salario_dia($anho,$mes,$dia,$local)
{
	$mysqli = conectar_al_servidor();
	
	$fecha = $anho."-".$mes."-".$dia;
	 
	 $condicionFecha = " and fecha = '$fecha' ";
	
	$condicionlocal = "";
	if ($local != "") {
		$condicionlocal = " and (SELECT cod_localFK FROM funcionarios WHERE codpersona = idfuncionarios) ='" . $local . "'";
	}
 
 
	// $sql = "SELECT sum(sueldo) as sueldo FROM sueldo where estado = 'Activo' ".$condicionFecha.$condicionlocal;
	
		 $sql= "Select idsueldo,ifnull(comision,0) as comision,ifnull(totalrecaudado,0) as totalrecaudado,sueldo,fecha,codpersona,estado,tipo,
		 tipouser,estado_registro,
		if(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) as usuarionombre,desde,
		if(desde='',(Select sector from vendedor where codpersona=idvendedor),((Select (select nombre from cargos where idcargos=cod_cargosFK) from funcionarios where codpersona=idfuncionarios))) as sector
		from sueldo where estado='Activo'  ".$condicionFecha.$condicionlocal." group by codpersona asc order by fecha desc";
 
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$pagina = '';
	 $totalSalario=0;
 $totalCobrar=0;
 $totalAdelanto=0;
 $totalExtra=0;
 $total=0;
 
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			
		      $idsueldo=$valor['idsueldo'];
		      $comision=$valor['comision'];
		  	  $totalrecaudado=utf8_encode($valor['totalrecaudado']);
		  	  $sueldo=utf8_encode($valor['sueldo']);
		  	  $cod_persona=utf8_encode($valor['codpersona']);
		  	  // $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $tipouser=utf8_encode($valor['tipouser']);
		  	  $sector=utf8_encode($valor['sector']);
		  	  $desde=utf8_encode($valor['desde']);
		  	  $estado_registro=utf8_encode($valor['estado_registro']);
			  
			  $pagina2=buscardetallado($fecha,$estado,$cod_persona,'',''); 
			  
			  
			  
			  
			// $pagina.=$pagina2[0].$pagina3;  
			$totalSalario = $totalSalario + $pagina2[4];
			$totalCobrar = $totalCobrar + $pagina2[1];
			$totalAdelanto = $totalAdelanto + $pagina2[2];
			$totalExtra = $totalExtra + $pagina2[3];
		
		
		}
	}
	
	return $totalSalario;
}

function buscardetallado($fecha,$estado,$cod_persona,$tipo,$sector)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $condiciontipo="";
	 if($tipo!=""){
		$condiciontipo="and tipo='$tipo'"; 
	 }
	 
	
		$condicionfecha =" and fecha = '$fecha'"; 
	 
	 
	 $condicionsector="";
	 if($sector!=""){
		$condicionsector =" and (Select cod_cargosFK from funcionarios where codpersona=idfuncionarios)  = '$sector'"; 
	 }
	
		 $sql= "Select idsueldo,ifnull(comision,0) as comision,ifnull(totalrecaudado,0) as totalrecaudado,sueldo,fecha,codpersona,estado,tipo,
		 tipouser,estado_registro,
		if(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) as usuarionombre,desde,
		if(desde='',(Select sector from vendedor where codpersona=idvendedor),((Select (select nombre from cargos where idcargos=cod_cargosFK) from funcionarios where codpersona=idfuncionarios))) as sector
		from sueldo where   codpersona =".$cod_persona."
		and estado='$estado'  ".$condiciontipo.$condicionfecha.$condicionsector." order by fecha desc";
 
 // echo($sql);
 // exit;
 
   $stmt = $mysqli->prepare($sql);
 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor;
 $styleName="tableRegistroSearch";
 $datos[]=null;
 $totalaCobrar=0;
 $totalAdelanto=0;
 $totalExtra=0;
 $totalSalario=0;
 $total=0;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		      $idsueldo=$valor['idsueldo'];
		      $comision=$valor['comision'];
		  	  $totalrecaudado=utf8_encode($valor['totalrecaudado']);
		  	  $sueldo=utf8_encode($valor['sueldo']);
		  	  $cod_persona=utf8_encode($valor['codpersona']);
		  	  $fecha=utf8_encode($valor['fecha']);
		  	  $estado=utf8_encode($valor['estado']);
		  	  $tipo=utf8_encode($valor['tipo']);
		  	  $usuarionombre=utf8_encode($valor['usuarionombre']);
		  	  $tipouser=utf8_encode($valor['tipouser']);
		  	  $sector=utf8_encode($valor['sector']);
		  	  $desde=utf8_encode($valor['desde']);
		  	  $estado_registro=utf8_encode($valor['estado_registro']);
			  
		  	 // $totalaCobrar=$totalaCobrar+$sueldo;
		  	 $onclick="";
			 if($desde!=""){
				 $onclick=" onclick='obtenerdatosabmSueldo(this)' ";
			 }
			 
			  if($tipo=="ADELANTO" || $tipo=="UNIFORME" || $tipo=="MULTA"|| $tipo=="VENTA ANULADO" ){
				  $totalAdelanto=$totalAdelanto + $sueldo;
				  $totalSalario=$totalSalario + $sueldo;
			  }
			  
			  if($tipo=="EXTRA" || $tipo=="PLUS MOTIVACIONAL"|| $tipo=="PAGO GARANTIAS" ){
				  $totalExtra=$totalExtra + $sueldo; 
			  }
			  
			  if($tipo=="COMISION COBRANZA TOP DE GAMAS" || $tipo=="COMISION VENTA TOP DE GAMAS"){
				  $totalExtra=$totalExtra + $sueldo;
				  
			  }
			 
			 
			  if($tipo=="SUELDO"){
				  $totalaCobrar=$totalaCobrar + $sueldo;
				  $totalSalario=$totalSalario + $sueldo;
			  }
			 
			  
	  }
 }
 $datos[0]= $pagina;
 $datos[1]= $totalaCobrar;
 $datos[2]= $totalAdelanto;
 $datos[3]= $totalExtra;
 $datos[4]= $totalSalario;
 return $datos;


}



function buscar_informe_salariofuncionario_general_grafica($anho,$local)
{
	
	
	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	

	
	$array_total_ventas_1 = array();
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {

			$total = obtener_total_salario_dia($anho,$i,$x,$local);
			if($i == 1){
				$totalVenta1 += $total;

			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	
	array_push($array_total_ventas_1,$totalVenta1);
	array_push($array_total_ventas_1,$totalVenta2);
	array_push($array_total_ventas_1,$totalVenta3);
	array_push($array_total_ventas_1,$totalVenta4);
	array_push($array_total_ventas_1,$totalVenta5);
	array_push($array_total_ventas_1,$totalVenta6);
	array_push($array_total_ventas_1,$totalVenta7);
	array_push($array_total_ventas_1,$totalVenta8);
	array_push($array_total_ventas_1,$totalVenta9);
	array_push($array_total_ventas_1,$totalVenta10);
	array_push($array_total_ventas_1,$totalVenta11);
	array_push($array_total_ventas_1,$totalVenta12);



	$totalVenta1 = 0;
	$totalVenta2 = 0;
	$totalVenta3 = 0;
	$totalVenta4 = 0;
	$totalVenta5 = 0;
	$totalVenta6 = 0;
	$totalVenta7 = 0;
	$totalVenta8 = 0;
	$totalVenta9 = 0;
	$totalVenta10 = 0;
	$totalVenta11 = 0;
	$totalVenta12 = 0;
	
	
	$array_total_ventas_2 = array();
	$anho2 = $anho;
	$anho2 = intval($anho2);
	$anho2--;
	
	for($x = 1; $x <= 31; $x++){
		
		for ($i = 1; $i <= 12; $i++) {

			$total = obtener_total_salario_dia($anho2,$i,$x,$local);
			if($i == 1){
				$totalVenta1 += $total;

			}
			if($i == 2){
				$totalVenta2 += $total;
				
			}
			if($i == 3){
				$totalVenta3 += $total;
				
			}
			if($i == 4){
				$totalVenta4 += $total;
				
			}
			if($i == 5){
				$totalVenta5 += $total;
				
			}
			if($i == 6){
				$totalVenta6 += $total;
				
			}
			if($i == 7){
				$totalVenta7 += $total;
				
			}
			if($i == 8){
				$totalVenta8 += $total;
				
			}
			if($i == 9){
				$totalVenta9 += $total;
				
			}
			if($i == 10){
				$totalVenta10 += $total;
				
			}
			if($i == 11){
				$totalVenta11 += $total;
				
			}
			if($i == 12){
				$totalVenta12 += $total;
				
			}
			
		}
	}
	
	array_push($array_total_ventas_2,$totalVenta1);
	array_push($array_total_ventas_2,$totalVenta2);
	array_push($array_total_ventas_2,$totalVenta3);
	array_push($array_total_ventas_2,$totalVenta4);
	array_push($array_total_ventas_2,$totalVenta5);
	array_push($array_total_ventas_2,$totalVenta6);
	array_push($array_total_ventas_2,$totalVenta7);
	array_push($array_total_ventas_2,$totalVenta8);
	array_push($array_total_ventas_2,$totalVenta9);
	array_push($array_total_ventas_2,$totalVenta10);
	array_push($array_total_ventas_2,$totalVenta11);
	array_push($array_total_ventas_2,$totalVenta12);



	$informacion = array("1" => "exito","3"=>$array_total_ventas_1,"4"=>$array_total_ventas_2,"5"=>$anho,"6"=>$anho2);
	echo json_encode($informacion);
	exit;
}



ObtenerDatos($operacion);

?>
