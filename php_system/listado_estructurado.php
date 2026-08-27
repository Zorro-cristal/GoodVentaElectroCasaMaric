<?php

/*
 * Adaptador de compatibilidad para los listados heredados.
 *
 * Cuando el cliente solicita formato=nodos o formato_salida=nodos, convierte
 * solamente los campos indicados de la respuesta JSON (por defecto el campo
 * 2) en una estructura de nodos. De esta forma PHP devuelve un array y
 * JavaScript reconstruye el contenido sin alterar consultas, permisos ni los
 * hooks de las filas.
 */

function gv_listado_solicita_nodos()
{
    $formato = isset($_POST['formato']) ? strtolower(trim((string) $_POST['formato'])) : '';
    $formatoSalida = isset($_POST['formato_salida']) ? strtolower(trim((string) $_POST['formato_salida'])) : '';
    return $formato === 'nodos' || $formatoSalida === 'nodos';
}

function gv_listado_campos_nodos()
{
    $campos = isset($_POST['formato_nodos_campos']) ? (string) $_POST['formato_nodos_campos'] : '2';
    $resultado = array();
    foreach (explode(',', $campos) as $campo) {
        $campo = trim($campo);
        if ($campo !== '' && ctype_digit($campo)) {
            $resultado[] = (string) ((int) $campo);
        }
    }
    return count($resultado) ? array_values(array_unique($resultado)) : array('2');
}

function gv_listado_atributos_dom(DOMElement $elemento)
{
    $atributos = array();
    if (!$elemento->hasAttributes()) {
        return $atributos;
    }
    foreach ($elemento->attributes as $atributo) {
        $atributos[$atributo->nodeName] = $atributo->nodeValue;
    }
    return $atributos;
}

function gv_listado_nodo_dom(DOMNode $nodo)
{
    if ($nodo->nodeType === XML_TEXT_NODE || $nodo->nodeType === XML_CDATA_SECTION_NODE) {
        return array('tipo' => 'texto', 'texto' => $nodo->nodeValue);
    }
    if ($nodo->nodeType === XML_COMMENT_NODE) {
        return array('tipo' => 'comentario', 'texto' => $nodo->nodeValue);
    }
    if ($nodo->nodeType !== XML_ELEMENT_NODE) {
        return null;
    }

    $hijos = array();
    foreach ($nodo->childNodes as $hijo) {
        $descripcion = gv_listado_nodo_dom($hijo);
        if ($descripcion !== null) {
            $hijos[] = $descripcion;
        }
    }

    return array(
        'tipo' => 'elemento',
        'etiqueta' => strtolower($nodo->nodeName),
        'atributos' => gv_listado_atributos_dom($nodo),
        'hijos' => $hijos
    );
}

function gv_listado_html_a_nodos($html)
{
    if ($html === null || $html === '') {
        return array();
    }
    if (!class_exists('DOMDocument')) {
        return array(array('tipo' => 'texto', 'texto' => (string) $html));
    }

    $documento = new DOMDocument('1.0', 'UTF-8');
    $estadoErrores = libxml_use_internal_errors(true);
    $contenido = '<?xml encoding="UTF-8"><div id="gv-listado-raiz">'.(string) $html.'</div>';
    $documento->loadHTML($contenido, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();
    libxml_use_internal_errors($estadoErrores);

    $raiz = $documento->getElementById('gv-listado-raiz');
    if (!$raiz) {
        return array();
    }

    $nodos = array();
    foreach ($raiz->childNodes as $nodo) {
        $descripcion = gv_listado_nodo_dom($nodo);
        if ($descripcion !== null) {
            $nodos[] = $descripcion;
        }
    }
    return $nodos;
}

function gv_listado_transformar_salida($salida)
{
    if (!gv_listado_solicita_nodos()) {
        return $salida;
    }
    $respuesta = json_decode($salida, true);
    if (!is_array($respuesta)) {
        return $salida;
    }

    foreach (gv_listado_campos_nodos() as $campo) {
        if (array_key_exists($campo, $respuesta) && is_string($respuesta[$campo])) {
            $valor = $respuesta[$campo];
            if ($valor === '' || preg_match('/<\s*(?:table|thead|tbody|tfoot|tr|td|th|div|section|article|ul|ol|li|button|input|img|span|p|h[1-6])\b/i', $valor)) {
                $respuesta[$campo] = gv_listado_html_a_nodos($valor);
            }
        }
    }
    $respuesta['_formato'] = 'nodos';
    return json_encode($respuesta);
}

if (gv_listado_solicita_nodos() && !defined('GV_LISTADO_BUFFER_ACTIVO')) {
    define('GV_LISTADO_BUFFER_ACTIVO', true);
    ob_start('gv_listado_transformar_salida');
}

?>
