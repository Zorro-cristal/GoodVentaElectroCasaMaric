<?php
    require("conexion.php");
    include("verificar_navegador.php");

    function ObtenerDatos($operacion) {
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
        
        switch ($operacion) {
            case 'vistaOrdenesWeb':
                $ci_cliente= $_POST['ci_cliente'];
                $ci_cliente = utf8_decode($ci_cliente);
                $orden_estado= $_POST['orden_estado'];
                $orden_estado = utf8_decode($orden_estado);
                $nombre_cliente = $_POST['nombre_cliente'];
                $nombre_cliente = utf8_decode($nombre_cliente);
                $id_orden = $_POST['id_orden'];
                $id_orden = utf8_decode($id_orden);
				$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

                vistaOrdenesWeb($id_orden, $ci_cliente, $orden_estado, $nombre_cliente, $formato);
                break;
            case 'vistaDetallesOrdenesWeb':
                $id_orden= $_POST['id_orden'];
                $id_orden = utf8_decode($id_orden);
				$formato = isset($_POST['formato']) ? utf8_decode($_POST['formato']) : '';

                vistaDetallesOrdenesWeb($id_orden, $formato);
                break;
            default:
                echo json_encode(array("1" => "error", "2" => "Funcion $operacion no implementada."));
        }
    }

    function vistaDetallesOrdenesWeb($id_orden, $formato='') {
        $result= obtenerDetallesOrdenes(array('orden_id' => $id_orden));
        $pagina= "";
		$filas= array();
        $precioTotal= 0;
        $cantTotal= 0;
		
        
        foreach ($result as $det_ord) {
            $cantTotal += intval($det_ord['cantidad']);
            $precioTotal += intval($det_ord['precio']);
			$filas[]=array(
				'codigo'=>$det_ord['id'],
				'producto_codigo'=>$det_ord['producto_id'],
				'codigo_barra'=>$det_ord['cod_barra'],
				'producto'=>$det_ord['nombreProducto'],
				'marca'=>$det_ord['nombreMarca'],
				'cantidad'=>$det_ord['cantidad'],
				'precio'=>$det_ord['precio']
			);

            $pagina .= "<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'><tr>
                <td id='td_id' style='width: 10%;text-align: center;'>".$det_ord['id']."</td>
                <td id='td_datos_1' style='display: none;'>".$det_ord['producto_id']."</td>
                <td id='td_datos_2' style='width: 15%;text-align: center;'>".$det_ord['cod_barra']."</td>
                <td id='td_datos_3'>".$det_ord['nombreProducto']."</td>
                <td id='td_datos_4' style='width: 20%;text-align: center;'>".$det_ord['nombreMarca']."</td>
                <td id='td_datos_5' style='width: 10%;text-align: center;'>".$det_ord['cantidad']."</td>
                <td id='td_datos_6' style='width: 15%;text-align: center;'>".$det_ord['precio']."</td>
            </tr></table>";
        }
		echo json_encode(array("1" => "exito", "2" => ($formato==='json' ? $filas : $pagina), "3" => $result, "4" => $cantTotal, "5" => $precioTotal));
    }

    function vistaOrdenesWeb($id_orden, $ci_cliente, $orden_estado, $nombre_cliente, $formato='') {
        $pagina= "";
		$filas= array();

        //Primero obtiene los codigo de cada orden por cliente
        $ordenes = obtenerOrdenes(array('id' => $id_orden, 'ci' => $ci_cliente, 'estado' => $orden_estado, 'nombre_cliente' => $nombre_cliente));
        foreach ($ordenes as $ord) {
			$documento=$ord['cedula'].(!empty($ord['ruc']) ? '- '.$ord['ruc'] : '');
			$filas[]=array(
				'codigo'=>$ord['idOrden'],
				'documento'=>$documento,
				'cedula'=>$ord['cedula'],
				'ruc'=>$ord['ruc'],
				'nombres'=>$ord['nombres'],
				'apellidos'=>$ord['apellidos'],
				'cliente'=>$ord['nombres'].' '.$ord['apellidos'],
				'estado'=>$ord['estadoOrden'],
				'fecha'=>$ord['fecha_creacion'],
				'cantidad'=>$ord['cantidadTotal'],
				'total'=>$ord['precioTotal'],
				'telefono'=>$ord['telefono'],
				'direccion'=>$ord['direccion'],
				'cantidad_cuotas'=>$ord['cant_cuota'],
				'fecha_nacimiento'=>$ord['fecha_nacimiento']
			);
            $pagina .= "<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0' onclick='obtenerDatosOrdenesWeb(this)'><tr>
                <td id='td_id' style='width: 10%;text-align: center;'>".$ord['idOrden']."</td>
                <td style='width: 10%;text-align: center;'>".$ord['cedula'].(!empty($ord['ruc']) ? '- '.$ord['ruc'] : '')."</td>
                <td id='td_datos_1' style='display: none;'>".$ord['cedula']."</td>
                <td id='td_datos_2' style='display: none;'>".$ord['ruc']."</td>
                <td id='td_datos_3' style='display: none;'>".$ord['nombres']."</td>
                <td id='td_datos_4' style='display: none;'>".$ord['apellidos']."</td>
                <td style='width: 30%;text-align: center;'>".$ord['nombres']." ".$ord['apellidos']."</td>
                <td id='td_datos_5' style='width: 10%;text-align: center;'>".$ord['estadoOrden']."</td>
                <td id='td_datos_6' style='width: 20%;text-align: center;'>".$ord['fecha_creacion']."</td>
                <td id='td_datos_9' style='width: 10%;text-align: center;'>".$ord['cantidadTotal']."</td>
                <td id='td_datos_10' style='width: 10%;text-align: center;'>".$ord['precioTotal']."</td>
                <td id='td_datos_11' style='display: none'>".$ord['telefono']."</td>
                <td id='td_datos_12' style='display: none'>".$ord['direccion']."</td>
                <td id='td_datos_13' style='display: none'>".$ord['cant_cuota']."</td>
                <td id='td_datos_14' style='display: none'>".$ord['fecha_nacimiento']."</td>
            </tr></table>";
        }

		echo json_encode(array("1" => "exito", "2" => ($formato==='json' ? $filas : $pagina)));
        exit;
    }

    function conexionBddWeb() {
        /*SERVIDOR,NOMBRE USUARIO,CONTRASEÑA USUARIO,NOMBRE DE LA BASE DE DATOS*/	
        $mysqli = new mysqli('localhost','root','','ecommerce_electroguai');
        $mysqli->set_charset("utf8mb4");
		
        return  $mysqli;
    }

 function obtenerDetallesOrdenes($filtros = array()) {
    $sqlFiltro = "";

    foreach ($filtros as $key => $value) {
        if (isset($value) && $value !== '') {
            if ($sqlFiltro == "") {
                $sqlFiltro = "WHERE ";
            } else {
                $sqlFiltro .= " AND ";
            }

            if (is_numeric($value)) {
                $sqlFiltro .= "$key = $value";
            } else {
                $sqlFiltro .= "$key = '$value'";
            }
        }
    }

    $sql = "SELECT do.*, p.nombre AS nombreProducto, p.cod_barra, m.nombre AS nombreMarca
            FROM detalles_ordenes do
            JOIN productos p ON p.id = do.producto_id
            JOIN marcas m ON m.id = p.marca_id $sqlFiltro";

   

    $mysqliWeb = conexionBddWeb();
    if ($mysqliWeb->connect_errno) {
        die("Error al conectar: ".$mysqliWeb->connect_error);
    }

    $result = $mysqliWeb->query($sql);

    if (!$result) {
        die('Error en consulta: '.$mysqliWeb->error);
    }

    $datos = array();
    while ($fila = $result->fetch_assoc()) {
        $datos[] = $fila;
    }

  

    $result->free();
    return $datos;
}


    function obtenerOrdenes($filtros= array()) {
        $campos="o.id as idOrden, o.estado as estadoOrden, o.fecha_creacion, o.usuario_id, c.*, o.cant_cuota,
        (select sum(cantidad) from detalles_ordenes where orden_id = o.id) as cantidadTotal,
        (select sum(precio) from detalles_ordenes where orden_id = o.id) as precioTotal";
        $sqlFiltro= "";

        foreach ($filtros as $key => $value) {
            if (!empty($value)){
                    if ($sqlFiltro == "") {
                    $sqlFiltro= "WHERE ";
                } else {
                    $sqlFiltro .= " AND ";
                }
                switch ($key) {
                    case 'ci':
                        $sqlFiltro .= "c.cedula = ".$value;
                        break;
                    case 'estado':
                        $sqlFiltro .= "o.estado = ".$value;
                        break;
                    case 'nombre_cliente':
                        $sqlFiltro .= "c.nombre = ".$value;
                        break;
                    case 'id':
                        $sqlFiltro .= "o.id = ".$value;
                        break;
                }
            }
        }

        $sql= "select $campos 
            from ordenes o 
            join usuarios u on u.id = o.usuario_id
            join clientes c on c.id = u.cliente_id $sqlFiltro ORDER BY fecha_creacion DESC";

        $mysqliWeb = conexionBddWeb();
        $stmt = $mysqliWeb->prepare($sql);

        if (!$stmt->execute()) {
            echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
            return false;
        }

        $result = $stmt->get_result();
        $result = $result->fetch_all(MYSQLI_ASSOC);

        $stmt->close();
        return $result;
    }

    $operacion = $_POST['funt'];
    $operacion = utf8_decode($operacion);
    obtenerDatos($operacion);
?>
