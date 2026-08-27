
<?php

// "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";

header('Content-Type: text/html; charset=utf-8');
require_once '../php_system/conexion.php';
 
/* ===========================================================
   RECIBIR JSON DESDE AJAX
   =========================================================== */

$input = json_decode(file_get_contents("php://input"), true);

$datosClienteJson = isset($input["datosCliente"]) ? $input["datosCliente"] : "";

if ($datosClienteJson == "") {
    echo json_encode(array(
        "estado" => "ERROR",
        "observacion" => "Datos del cliente no recibidos"
    ));
    exit;
}

/* ===========================================================
   FUNCIONES: CARGAR DATOS DESDE BD
   =========================================================== */

function cargarReglamento()
{
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");

    $sql = "SELECT puntaje_minimo, puntaje_maximo, resultado
            FROM reglas_credito
            ORDER BY puntaje_minimo ASC";

    $res = $mysqli->query($sql);

    $txt = "";
    while ($r = $res->fetch_assoc()) {
        $txt .= "Regla {$r['resultado']}: {$r['puntaje_minimo']}-{$r['puntaje_maximo']} => {$r['resultado']}\n";
    }
    return $txt;
}


function cargarCriterios()
{
    $mysqli = conectar_al_servidor();
    $mysqli->set_charset("utf8mb4");

    $sql = "SELECT * FROM parametros_credito  ORDER BY FIELD(tipo, 'rechazo', 'revision', 'puntaje', 'aprobado'); ";
    $res = $mysqli->query($sql);

    $txt = "";
    while ($p = $res->fetch_assoc()) {

        if ($p['tipo'] == 'rechazo') {
            $txt .= "{$p['id']} {$p['categoria']}: {$p['descripcion']} => RECHAZO\n";
            continue;
        }

        if ($p['tipo'] == 'revision') {
            $txt .= "{$p['id']} {$p['categoria']}: {$p['descripcion']} => REVISION\n";
            continue;
        }
        
        if ($p['tipo'] == 'aprobado') {
            $txt .= "{$p['id']} {$p['categoria']}: {$p['descripcion']} => APROBADO\n";
            continue;
        }

        if ($p['minimo'] !== "" && $p['maximo'] !== "") {
            $cond = "{$p['minimo']}-{$p['maximo']}";
        } elseif ($p['minimo'] !== "") {
            $cond = ">= {$p['minimo']}";
        } elseif ($p['maximo'] !== "") {
            $cond = "<= {$p['maximo']}";
        } else {
            $cond = $p['valor_texto'];
        }

        $txt .= "{$p['id']} {$p['categoria']}: {$p['descripcion']} ($cond) => {$p['puntaje']} PUNTOS\n";
    }

    return $txt;
}

/* ===========================================================
   FUNCIÓN PRINCIPAL — LLAMAR A OPENAI
   =========================================================== */

function chatGPTCreditoArray($reglamento, $criterios, $datosClienteJson)
{
    $apiKey = "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";


    $data = array(
       "model" => "gpt-5.2",
        "messages" => array(
array(
    "role" => "system",
    "content" =>
"

Eres un agente aprobador de crédito para una empresa comercial.
Tu función es evaluar solicitudes de crédito de forma objetiva, consistente y explicable.

NO inventes datos.
NO tomes decisiones emocionales.
Basa la decisión únicamente en la información recibida y en las reglas definidas.
Si faltan datos, indícalo explícitamente.


Reglamento de crédito:
$reglamento

Criterios de evaluación:
$criterios

INSTRUCCIONES OBLIGATORIAS PARA EL MODELO:

1. Leer los datos EXACTAMENTE como están escritos en 'Datos del cliente'.
2. QUEDA PROHIBIDO:
   - Inferir valores.
   - Aproximar o redondear.
   - Corregir o completar datos faltantes.
   - Interpretar rangos de forma amplia.
3. Si un criterio dice 'mayor o igual a 130':
   - Solo es rechazo si dias_atraso >= 130.
   - Si dias_atraso = 129 o menos, NO ES rechazo.
4. Primero detectar criterios de Rechazo.
5. Solo si no hay rechazos, sumar puntajes EXACTOS sin olvidar ningun punto y aplicar el reglamento de puntuación.
6. Si dos reglas parecen similares, SIEMPRE elegir la que COINCIDE EXACTAMENTE con el valor.
7. No inventar razones adicionales.
8. Si el resultado es 'REVISION' o 'RECHAZO', en el campo 'observacion' debe incluir **TODOS los criterios incumplidos**, separados por comas o en lista, describiendo brevemente cada incumplimiento.
9. Si no hay incumplimientos, observacion puede decir 'Todos los criterios cumplidos'.
10. Responder únicamente con JSON válido RFC8259.
11. Devolver en el json dentro de la observacion cuantos puntos suma sin olvidar ningun criterio.
12. no confundir porcentaje_deuda_relacion_salario_deuda con porcentaje_deuda_ultima_venta, relacion salario deuda es el porcentaje de la deuda comparado con el salario y deuda ultima venta es la deuda de la ultima venta activa.
13. al responder en la observacion necesito que me devuelvas solo los que incumple y no asi los que son puntaje 
14 en caso de revision necesito que solo devuelva todos los motivos ejemplo Informconf, faja, y los demas detalles de la lista yal final el resultado de la suma de los puntajes 
15. para generar el puntaje en caso de entrar en revision necesito que especifique cuales numo y por que 
 

PRIORIDAD del orden de evaluación.
NO altera puntaje.
NO altera decisión final.
SOLO ordena análisis.

1. Tipo de Faja
2. Historial informconf
3. Antiguedd laboral
4. Edad
5. Tipo de vivienda
6. Cedula de identidad
7. Dias de atraso
9. Cuota propuesta

No recalcules
No estimes
Usa exactamente los valores dados

al momento de sumar los puntaje tener en cuenta 
1. Historial informconf
2. Antiguedd laboral
3. Edad
4. Tipo de vivienda 
5. Dias de atraso 



Usar exclusivamente la información contenida en estas variables. 
No utilizar conocimiento externo ni supuestos estadísticos.


No reestructurar reglas.
No optimizar criterios.
No reinterpretar lógica.
Ejecutar evaluación de forma determinística.


FORMATO DE SALIDA OBLIGATORIO:
{
  \"estado\": \"APROBADO|REVISION|RECHAZADO\",
  \"observacion\": \" un div contenedor con css y adentro una tabla que contenga y en cada tr un criterio una Razón breve y en caso de que se genere puntaje que tenga su propia tabla con css y cada puntaje dentro de un tr\"
}

El modelo debe responder **exclusivamente** un JSON válido siguiendo el formato anterior, sin agregar comentarios ni texto adicional."
),
array(
    "role" => "user",
    "content" =>
"DATOS DEL CLIENTE (JSON EXACTO):\n$datosClienteJson

Evalúa los datos del JSON sin cambiar números ni formatos."
)


        )
    );
	 

    $payload = json_encode($data);


    $ch = curl_init("https://api.openai.com/v1/chat/completions");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 90);

    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);

    if (isset($data["choices"][0]["message"]["content"])) {

        $texto = trim($data["choices"][0]["message"]["content"]);

        preg_match('/\{.*\}/s', $texto, $matches);

        if (isset($matches[0])) {
            $json = json_decode($matches[0], true);
            if ($json && isset($json["estado"]) && isset($json["observacion"])) {
                return array($json["estado"], $json["observacion"]);
            }
        }
		echo json_encode(array(
        "estado" => "ERROR",
        "observacion" => "No se obtuvo un JSON válido"
    )); 
    }

	echo json_encode(array(
        "estado" => "ERROR",
        "observacion" => "La API no devolvió respuesta válida"
    )); 
}

/* ===========================================================
   PROCESAR Y RESPONDER
   =========================================================== */

$reglamento = cargarReglamento();
$criterios  = cargarCriterios();

$resultado = chatGPTCreditoArray($reglamento, $criterios, $datosClienteJson);

echo json_encode(array(
    "estado" => $resultado[0],
    "observacion" => $resultado[1]
));
exit;

?>