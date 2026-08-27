<?php

require_once(__DIR__.DIRECTORY_SEPARATOR.'listado_estructurado.php');

function conectar_al_servidor(){

/*SERVIDOR,NOMBRE USUARIO,CONTRASEÑA USUARIO,NOMBRE DE LA BASE DE DATOS*/	
// $mysqli = new mysqli('localhost','gbqjfbzl_fley','gbqjfbzl_fley','gbqjfbzl_fley');

$mysqli = new mysqli('localhost','syscvxco_casamaric','syscvxco_casamaric','syscvxco_casamaric');
$mysqli->set_charset("latin1");
return  $mysqli;

}



?>
