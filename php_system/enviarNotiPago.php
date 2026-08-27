<?php
require("conexion.php");

cargar_array();

/*Buscar Registro en vista*/
function cargar_array()
{
$mysqli=conectar_al_servidor();

$sql= "SELECT cod_notificaciones,mensaje,numero FROM notificaciones where estado_mensaje = 'PENDIENTE' OR estado_mensaje = 'ERROR' and estado = 'Activo'";


$stmt = $mysqli->prepare($sql);


if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;

$data = array();


$contador = 0;
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{

$mensaje = utf8_decode($valor['mensaje']);   
$numero = utf8_decode($valor['numero']);          
$cod_notificaciones = utf8_decode($valor['cod_notificaciones']);          


$data[$contador] = ["numero"=>$numero,"mensaje"=>$mensaje,"codigo"=>$cod_notificaciones];
$contador++;


}

crear_peticion($data);

}else{
	echo utf8_decode("No hay registros");
}

}


function crear_peticion($data)
{

// URL de la API
$url = 'http://localhost:85/twilio_api/message.php';

// Convertir los datos a JSON
$jsonData = json_encode($data);

// Iniciar cURL
$ch = curl_init($url);

// Configurar las opciones de cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retornar la respuesta en lugar de mostrarla directamente
curl_setopt($ch, CURLOPT_POST, true); // Indicar que se está realizando una petición POST
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json' // Establecer el tipo de contenido como JSON
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData); // Enviar los datos JSON

// Ejecutar la petición
$response = curl_exec($ch);

// Verificar si hubo algún error
if (curl_errno($ch)) {
    echo 'Error en cURL: ' . curl_error($ch);
} else {
    // Decodificar y mostrar la respuesta
    $responseData = json_decode($response, true);
    // print_r($responseData);
	actualizar_mensajes($responseData);
}

// Cerrar cURL
curl_close($ch);


}

function actualizar_mensajes($resultados){
	$mysqli=conectar_al_servidor();
	$codigo = '';
	foreach ($resultados as $resultado) {
			$codigo = $resultado['codigo'];
			
			if($resultado['status'] == 'enviado'){
				$consulta="UPDATE notificaciones SET estado_mensaje = 'ENVIADO' WHERE cod_notificaciones = ".$codigo;
				
				$stmt = $mysqli->prepare($consulta);
				
				if (!$stmt->execute()) {
					echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
					exit;
				}
			}else{
				$consulta="UPDATE notificaciones SET estado_mensaje = 'ERROR' WHERE cod_notificaciones = ".$codigo;
				
				$stmt = $mysqli->prepare($consulta);
				
				if (!$stmt->execute()) {
					echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
					exit;
				}
			}
	}
	
	mysqli_close($mysqli); 
}


?>