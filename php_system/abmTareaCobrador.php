<?php



require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include('quitarseparadormiles.php');
include("subir_foto_base64.php");
include("calcularintereses.php");


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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si se ha enviado la variable 'creditos'
    if (isset($_POST['creditos'])) {
        // Obtener la cadena JSON
        $creditosJSON = $_POST['creditos'];

        // Decodificar la cadena JSON a un array de PHP
        $creditos = json_decode($creditosJSON, true);

        // Verificar si la decodificación fue exitosa
        if (is_array($creditos)) {
            // Recorrer el array y procesar cada elemento
            foreach ($creditos as $idcredito) {
                // Procesar $idcredito según sea necesario
 
			$consulta2=" Insert into detalle_tarea_cobrador (cod_controlcobradorFK, cod_creditoFK )values('$cod_controlcobrador','$idcredito')";
					$stmt2 = $mysqli->prepare($consulta2);
 
				if (!$stmt2->execute()) {
					
				echo trigger_error('The query execution failed; MySQL said ('.$stmt2->errno.') '.$stmt2->error, E_USER_ERROR);
				exit;

				}
				
				 
				
				$consulta3=" update credito set cod_tareaFK='$cod_controlcobrador'  where idcredito='$idcredito' ";
					$stmt3 = $mysqli->prepare($consulta3);
 
				if (!$stmt3->execute()) {
					
				echo trigger_error('The query execution failed; MySQL said ('.$stmt3->errno.') '.$stmt3->error, E_USER_ERROR);
				exit;

				}
				
				
 
            }
        } else {
            // Manejar el error de decodificación
            echo "Error al decodificar la cadena JSON.";
        }
    } else {
        // Manejar el caso en que 'creditos' no esté presente en la solicitud POST
        echo "No se recibió la variable 'creditos'.";
    }
    }

 




 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}
 




ObtenerDatos($operacion);

?>