<?php
// ------------------------------------------------------------
// test_openai.php – Test de conexión a la API de OpenAI
// ------------------------------------------------------------

// ⚠️ No coloques tu API KEY directo en el código.
// Para pruebas locales podés guardar la key en openai_key.txt
// (NO SUBIR ESTE ARCHIVO AL HOSTING)
// ------------------------------------------------------------

$env_var_name = 'OPENAI_API_KEY';
$key_file = __DIR__ . '/openai_key.txt';
$endpoint = "https://api.openai.com/v1/models";

// 1) Intentar obtener la API KEY desde variable de entorno
$api_key = getenv($env_var_name);

// 2) Intentar obtener desde $_SERVER (algunos hostings lo usan)
if (!$api_key && !empty($_SERVER[$env_var_name])) {
    $api_key = $_SERVER[$env_var_name];
}

// 3) Intentar desde archivo local solo si existe
if (!$api_key && file_exists($key_file)) {
    $api_key = trim(file_get_contents($key_file));
}

// 4) Si no hay clave → mostrar error
if (!$api_key || trim($api_key) === '') {
    http_response_code(400);
    echo "<h2>❌ Falta la API key</h2>";
    echo "<p>Crea <code>openai_key.txt</code> con la key o configurá la variable de entorno <code>OPENAI_API_KEY</code>.</p>";
    exit;
}

// ------------------------------------------------------------
// Llamada cURL
// ------------------------------------------------------------

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer {$api_key}",
    "Content-Type: application/json"
]);

// 🔥 FIX PARA HOSTINGS: desactivar verificación SSL (solo prueba)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

curl_setopt($ch, CURLOPT_TIMEOUT, 20);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Test Conexión OpenAI</title>
<style>
body{font-family:Arial;margin:40px}
pre{background:#f3f3f3;padding:15px;border-radius:6px}
.ok{color:green;font-weight:bold}
.err{color:red;font-weight:bold}
</style>
</head>
<body>

<h1>Prueba de conexión a OpenAI</h1>

<?php if ($curl_error): ?>
    <p class="err">❌ Error cURL: <?php echo htmlspecialchars($curl_error); ?></p>
<?php else: ?>
    <?php if ($httpcode === 200): ?>
        <p class="ok">✅ Conexión exitosa (HTTP <?php echo $httpcode; ?>)</p>
    <?php else: ?>
        <p class="err">❌ Error de API (HTTP <?php echo $httpcode; ?>)</p>
    <?php endif; ?>
<?php endif; ?>

<h3>Respuesta:</h3>
<pre>
<?php
$res = json_decode($response);
if ($res) {
    echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} else {
    echo htmlspecialchars($response);
}
?>
</pre>

</body>
</html>
