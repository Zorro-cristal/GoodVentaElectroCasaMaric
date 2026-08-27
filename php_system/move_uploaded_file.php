<?php
/*
Subir archivo a servidor con PHP
@author parzibyte
 */
# La carpeta en donde guardaremos los archivos, en este caso es "subidas" pero podría ser
# cualqueir otro, incluso podría ser aquí mismo sin subcarpetas

function mover_archivo_carpeta($dir,$nombreArchivo,$nombrePost){
	$rutaDeSubidasPrevia = __DIR__ . $dir;
$rutaDeSubidas = str_replace('\\','/',$rutaDeSubidasPrevia);

# Crear si no existe
if (!is_dir($rutaDeSubidas)) {
    mkdir($rutaDeSubidas, 0777, true);
}

if(isset($_FILES[$nombrePost])){
# Tomar el archivo. Recordemos que "archivo" es el atributo "name" de nuestro input
$informacionDelArchivo = $_FILES[$nombrePost];
# La ubicación en donde PHP lo puso
$ubicacionTemporal = $informacionDelArchivo["tmp_name"];
#Nota: aquí tomamos el nombre que trae, pero recomiendo renombrarlo a otra cosa usando, por ejemplo, uniqid
// $nombreArchivo = $informacionDelArchivo["name"];
$nuevaUbicacion = $rutaDeSubidas . "/" . $nombreArchivo;
# Mover
$resultado = move_uploaded_file($ubicacionTemporal, $nuevaUbicacion);
return $resultado;
}else{
	echo "No se detecto el archivo";
	exit;
}

}

function mover_archivo_carpeta_cliente($dir,$nombreArchivo,$nombrePost){
	$rutaDeSubidasPrevia = __DIR__ ;
	$rutaDeSubidas = str_replace('\\','/',$rutaDeSubidasPrevia);
	$rutaDeSubidas = str_replace('/php_system',$dir,$rutaDeSubidas);

# Crear si no existe
if (!is_dir($rutaDeSubidas)) {
    mkdir($rutaDeSubidas, 0777, true);
}

if(isset($_FILES[$nombrePost])){

# Tomar el archivo. Recordemos que "archivo" es el atributo "name" de nuestro input
$informacionDelArchivo = $_FILES[$nombrePost];
# La ubicación en donde PHP lo puso
$ubicacionTemporal = $informacionDelArchivo["tmp_name"];
#Nota: aquí tomamos el nombre que trae, pero recomiendo renombrarlo a otra cosa usando, por ejemplo, uniqid
// $nombreArchivo = $informacionDelArchivo["name"];
$nuevaUbicacion = $rutaDeSubidas . "/" . $nombreArchivo;
# Mover
$resultado= array();
$resultado[0] = move_uploaded_file($ubicacionTemporal, $nuevaUbicacion);
$resultado[1] = $nuevaUbicacion;

return $resultado;
}else{
	echo "No se detecto el archivo";
	exit;
}
}

?>