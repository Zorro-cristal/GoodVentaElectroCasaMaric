<?php
require("conexion.php");
include("verificar_navegador.php");
include('quitarseparadormiles.php');
include("buscar_nivel.php");
include("subir_foto_base64.php");
include("classTable.php");

date_default_timezone_set('America/Anguilla');

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);

function ObtenerDatosEspecificaciones($operacion)
{

    $user = $_POST['useru'];
    $user = utf8_decode($user);
    $pass = $_POST['passu'];
    $pass = str_replace("=", "+", $pass);
    $navegador = $_POST['navegador'];
    $navegador = utf8_decode($navegador);
    $resp = verificar_navegador($user, $navegador, $pass);
    if ($resp != "ok") {
        $informacion = array("1" => "UI");
        echo json_encode($informacion);
        exit;
    }
    //CONTROL DE ACCESO

    switch ($operacion) {
        case 'nuevo':
            $id_especificacion= $_POST['id_especificacion'];
            $caracteristica= $_POST['caracteristica'];
            $titulo= $_POST['titulo'];
            $cod_productoFK= $_POST['cod_productoFK'];

            $id_abm= abm(array(
                'id' => $id_especificacion,
                'caracteristica' => $caracteristica,
                'titulo' => $titulo,
                'cod_productoFK' => $cod_productoFK
            ));

            echo json_encode(array("1" => "exito","2" => $id_abm));
            break;
        case 'editar':
            $caracteristica= $_POST['caracteristica'];
            $titulo= $_POST['titulo'];
            $cod_productoFK= $_POST['cod_productoFK'];

            $id_abm= abmEspecificacion(array(
                'caracteristica' => $caracteristica,
                'titulo' => $titulo,
                'cod_productoFK' => $cod_productoFK
            ));

            echo json_encode(array("1" => "exito","2" => $id_abm));
            break;
        case 'buscarEspecificacionVistaCliente':
            $cod_productoFK= $_POST['cod_producto'];
            buscarEspecificacionVistaCliente($cod_productoFK);
            break;
        case 'nuevoEditarABM':
            $especificaciones= $_POST['especificaciones'];
            $especificaciones= json_decode($especificaciones, true);
            $cod_productoFK= $_POST['cod_productoFK'];
            
            //  Obtiene las especificaciones ya cargadas y elimina las que no fueron 
            $especificaciones_cargadas= buscarEspecificaciones(array('cod_productoFK' => $cod_productoFK));
            foreach ($especificaciones_cargadas as $esp_c) {
                $existe= false;
                foreach ($especificaciones as $esp) {
                    if ($esp_c['id'] == $esp['id']) {
                        $existe= true;
                        break;
                    }
                }
                if (!$existe) {
                    eliminarEspecificacion($esp_c['id']);
                }
            }

            foreach ($especificaciones as $espec) {
                abmEspecificacion(array(
                    'id' => $espec['id'],
                    'caracteristica' => $espec['caracteristica'],
                    'titulo' => $espec['titulo'],
                    'cod_productoFK' => $cod_productoFK
                ));
            }
            echo json_encode(array("1" => "exito"));
            break;
    }
}

function buscarEspecificacionVistaCliente($cod_productoFK) {
    $especificaciones= buscarEspecificaciones(array('cod_productoFK' => $cod_productoFK));
    $pagina="";
	
    foreach ($especificaciones as $espec) {
        $pagina .= "<div class='divMenuf' style='display: flex;'>
            <input class='inptIdEspecificacionVistaCliente' value='".htmlspecialchars($espec['id'])."' type='hidden'>
            <div style='width: 80%;'>
                <table style='width:100%'>
                    <tr>
                        <td>
                            <p class='pTituloC'>Titulo:</p>
                            <input class='inputText inptTituloEspecificacionVistaCliente' style='width:200px;' value='".htmlspecialchars($espec['titulo'])."'>
                        </td>
                    </tr>
                </table>
                <table style='width:100%'>
                    <tr>
                        <td>
                            <p class='pTituloC'>Descripcion:</p>
                            <input class='inputText inptDescripcionEspecificacionVistaCliente' style='width:200px;' value='".htmlspecialchars($espec['caracteristica'])."'>
                        </td>
                    </tr>
                </table>
            </div>
            <img src='/GoodVentaElectroCasaMaric/iconos/botonCerrar.png' class='iconoBtn' style= 'margin: auto' title='Eliminar especificacion' onclick='eliminarEspecificacionCliente(this)'>
        </div>";
    }

    $respuesta= array("1" => "exito","2" => $pagina, "3" => count($especificaciones));
    $respuesta= json_encode($respuesta);
    echo $respuesta;
}

function abmEspecificacion($datosRecib){
    $mysqli=conectar_al_servidor(); 

    if (!empty($datosRecib['id'])) {
        $params= "caracteristica = ?";
        $datos= array($datosRecib['caracteristica']);
        if (!empty($datosRecib['titulo'])) {
            $params .= ", titulo = ?";
            $datos[] = $datosRecib['titulo'];
        }
        $datos[]= $datosRecib['id'];
        $sql= "UPDATE especificaciones SET $params WHERE id = ?";
    } else {
        $params= "caracteristica, cod_productoFK";
        $valores= "?, ?";
        $datos= array($datosRecib['caracteristica'], $datosRecib['cod_productoFK']);
        if (!empty($datosRecib['titulo'])) {
            $params .= ", titulo";
            $valores .= ", ?";
            $datos[]= $datosRecib['titulo'];
        }
        $sql= "INSERT INTO especificaciones ($params) VALUES ($valores)";
    }

    $stmt = $mysqli->prepare($sql);
    
    $ss = str_repeat('s', count($datos));
    $tmp = [];
    foreach ($datos as $key => $value) {
        $tmp[$key] = &$datos[$key];
    }
    array_unshift($tmp, $ss);
    call_user_func_array([$stmt, 'bind_param'], $tmp);

    $result= $stmt->execute();
    if (!$result) {
        echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
        exit;
    }

    // Retorna la id
    return empty($datos['id_especificacion']) ? $mysqli->insert_id : $datos['id_especificacion'];
}

function buscarEspecificaciones($filtros) {
    $mysqli=conectar_al_servidor(); 

    $sqlFiltro= "";
    foreach ($filtros as $clave => $valor) {
        if ($valor == null) {
            continue;
        }
        if ($sqlFiltro == "") {
            $sqlFiltro= " WHERE ";
        } else {
            $sqlFiltro .= "AND";
        }

        if (is_numeric($valor) || is_bool($valor)) {
            $sqlFiltro .= " ".$clave."=".$valor;
        } else {
            $sqlFiltro .= " ".$clave." like '%".$valor."%'";
        }
    }

    $query= "SELECT * FROM especificaciones $sqlFiltro";
    $stmt = $mysqli->prepare($query);
    $result= $stmt->execute();
    if (!$result) {
        echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
        exit;
    }
    
    $result= $stmt-> get_result();
    $datos=[];
    while ($valor= mysqli_fetch_assoc($result)) {
        $datos[]= $valor;
    }

    return $datos;
}

function eliminarEspecificacion($id) {
  $mysqli=conectar_al_servidor(); 

    $sql= "DELETE FROM especificaciones WHERE id= ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $id);
    
    $result= $stmt->execute();
    if (!$result) {
        echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
        exit;
    }

    // Retorna la id
    return $id;
}

obtenerDatosEspecificaciones($operacion);
?>