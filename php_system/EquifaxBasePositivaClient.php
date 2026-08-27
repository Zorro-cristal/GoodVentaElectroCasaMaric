<?php

class EquifaxBasePositivaClient
{
    private $config;

    public function __construct($config)
    {
        $this->config = $config;
    }

    public function obtenerToken()
    {
        $url = trim($this->config['token_url']);
        if ($url === '') {
            $url = rtrim($this->config['base_url'], '/') . '/v2/oauth/token';
        }

        $respuesta = $this->request($url, 'POST', array(
            CURLOPT_USERPWD => $this->config['client_id'] . ':' . $this->config['client_secret'],
            CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
            CURLOPT_HTTPHEADER => array('Accept: application/json', 'Content-Type: application/x-www-form-urlencoded'),
            CURLOPT_POSTFIELDS => http_build_query(array(
                'scope' => $this->config['scope'],
                'grant_type' => 'client_credentials'
            ))
        ));

        if (empty($respuesta['json']['access_token'])) {
            throw new RuntimeException('Equifax no devolvio un access_token.');
        }
        return $respuesta['json']['access_token'];
    }

    public function enviarArchivo($zipPath, $periodo)
    {
        if (!is_file($zipPath)) {
            throw new RuntimeException('No se encontro el archivo ZIP a enviar.');
        }
        if (filesize($zipPath) > 10 * 1024 * 1024) {
            throw new RuntimeException('El ZIP supera el limite de 10 MB de Equifax.');
        }

        $token = $this->obtenerToken();
        $url = rtrim($this->config['base_url'], '/') . '/business/contribution-api/v1/s2s-service/api/v1/eventtracking';
        if (strtoupper($this->config['ambiente']) === 'SANDBOX') {
            $url = rtrim($this->config['base_url'], '/') . '/business/contribution-api/v1/eventtracking';
        }

        $archivo = function_exists('curl_file_create')
            ? curl_file_create($zipPath, 'application/zip', basename($zipPath))
            : '@' . realpath($zipPath);

        return $this->request($url, 'POST', array(
            CURLOPT_HTTPHEADER => array('Accept: application/json', 'Authorization: Bearer ' . $token),
            CURLOPT_POSTFIELDS => array(
                'supplierId' => $this->config['supplier_id'],
                'periodo' => $periodo,
                'contributionName' => $this->config['contribution_name'],
                'userId' => $this->config['user_id'],
                'file' => $archivo
            )
        ));
    }

    public function consultarCarga($idCarga)
    {
        $token = $this->obtenerToken();
        $base = rtrim($this->config['base_url'], '/');
        if (strtoupper($this->config['ambiente']) === 'SANDBOX') {
            $url = $base . '/business/contribution-api/v1/find_detail/externo/' . rawurlencode($idCarga) . '/' . rawurlencode($this->config['supplier_id']);
        } else {
            $url = $base . '/business/contribution-api/v1/s2s-service/api/v1/eventtracking/find_detail/externo/' . rawurlencode($idCarga) . '/' . rawurlencode($this->config['supplier_id']);
        }
        return $this->request($url, 'GET', array(
            CURLOPT_HTTPHEADER => array('Accept: application/json', 'Authorization: Bearer ' . $token)
        ));
    }

    private function request($url, $method, $options)
    {
        if (!function_exists('curl_init')) {
            throw new RuntimeException('La extension cURL de PHP no esta habilitada.');
        }
        $ch = curl_init($url);
        $baseOptions = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_CONNECTTIMEOUT => 15,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_FOLLOWLOCATION => false
        );
        curl_setopt_array($ch, $options + $baseOptions);
        $body = curl_exec($ch);
        if ($body === false) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new RuntimeException('No fue posible conectar con Equifax: ' . $error);
        }
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $json = json_decode($body, true);
        if ($status < 200 || $status >= 300) {
            $mensaje = is_array($json) ? json_encode($json) : substr(strip_tags($body), 0, 500);
            throw new RuntimeException('Equifax respondio HTTP ' . $status . ': ' . $mensaje);
        }
        return array('status' => $status, 'body' => $body, 'json' => is_array($json) ? $json : array());
    }
}
