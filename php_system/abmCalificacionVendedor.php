<?php


$funt = $_POST['funt'];
$funt = utf8_decode($funt);

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
function verificar($funt)
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


if($funt=="buscarCalificacionVendedor")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);
$vendedor=$_POST['vendedor'];
$vendedor = utf8_decode($vendedor);
$calificacion=$_POST['calificacion'];
$calificacion = utf8_decode($calificacion);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";


	buscarCalificacionVendedor($fecha1,$fecha2,$local,$vendedor,$calificacion,$estado,$formato);

}

if($funt=="buscarCalificacionVendedorGeneral")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";


	buscarCalificacionVendedorGeneral($fecha1,$fecha2,$local,$formato);

}
	
if($funt=="nuevo" || $funt=="editar")
{
	
	
	$cod_categoria=$_POST['idabm'];
    $cod_categoria = utf8_decode($cod_categoria);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$Estado=$_POST['Estado'];
    $Estado = utf8_decode($Estado);
	$rangoinicio=$_POST['rangoinicio'];
    $rangoinicio = utf8_decode($rangoinicio);
	$rangofin=$_POST['rangofin'];
    $rangofin = utf8_decode($rangofin);
	$puntaje=$_POST['puntaje'];
    $puntaje = utf8_decode($puntaje);
	
	
	// echo json_encode(array($rangoinicio,$rangofin));
	// exit;
	
	
	abm($rangoinicio,$rangofin,$cod_categoria,$descripcion,$Estado,$puntaje,$funt);

}

if($funt=="buscar")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	buscar($buscar,$Estado,$formato);

}	

if($funt=="buscarOption")
{

	buscarOption();

}	



if($funt=="nuevo_cal" || $funt=="editar_cal")
{
	
	
	$cod_categoria=$_POST['idabm'];
    $cod_categoria = utf8_decode($cod_categoria);
	$descripcion=$_POST['descripcion'];
    $descripcion = utf8_decode($descripcion);
	$Estado=$_POST['Estado'];
    $Estado = utf8_decode($Estado);
	$puntos=$_POST['puntos'];
    $puntos = utf8_decode($puntos);
    
	abm_cal($puntos,$cod_categoria,$descripcion,$Estado,$funt);

}

if($funt=="buscar_cal")
{
	$buscar=$_POST['buscar'];
$buscar = utf8_decode($buscar);
$Estado=$_POST['estado'];
$Estado = utf8_decode($Estado);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";
	buscar_cal($buscar,$Estado,$formato);

}	

if($funt=="buscarOption_cal")
{

	buscarOption_cal();

}

if($funt=="cargar_obs_calificacion_vendedor")
{
	
	
	$obs=$_POST['inptCargarObsCalificacionVendedor'];
    $obs = utf8_decode($obs);
	$id_califacion_vendedor=$_POST['id_califacion_vendedor'];
    $id_califacion_vendedor = utf8_decode($id_califacion_vendedor);
	
	cargar_obs_calificacion_vendedor($id_califacion_vendedor,$obs);

}

}



function abm($rangoinicio,$rangofin,$cod_calificacion_vendedor,$descripcion,$Estado,$puntaje,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from calificacion_vendedor where descripcion=? and Estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $descripcion); 


if ( ! $stmt->execute()) {
	$informacion =array("1" => "error");
	echo json_encode($informacion);	
	exit;
}

$valor = 0;
$stmt->bind_result($valor);
while ($stmt->fetch()) { 
   
	 $valor =$valor;
}

if($valor==1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}
	if($funt=="nuevo")
	{
	
    
		$consulta="insert into calificacion_vendedor (rangoinicio,rangofin,descripcion,Estado,puntaje) values ('$rangoinicio','$rangofin','$descripcion','$Estado','$puntaje')";	
		$stmt = $mysqli->prepare($consulta);
		// $ss='sssss';
		// $stmt->bind_param($ss,$rangoinicio,$rangofin,$descripcion,$Estado,$puntaje); 
        
 
	}
	if($funt=="editar")
	{
    
    $consulta="Update calificacion_vendedor set descripcion='$descripcion',Estado='$Estado',rangoinicio = '$rangoinicio',rangofin='$rangofin',puntaje='$puntaje' where cod_calificacion_vendedor='$cod_calificacion_vendedor'";	
	
	// echo $consulta;
	// exit;

	$stmt = $mysqli->prepare($consulta);
    // $ss='ssssss';
    // $stmt->bind_param($ss,$descripcion,$Estado,$rangoinicio,$rangofin,$cod_calificacion_vendedor,$puntaje); 
        
	
       
	}
	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
	
	
	
}
function buscar($buscar,$Estado,$formato="")
{
	$mysqli = conectar_al_servidor();
$pagina = '';
$filas = array();
$formato = strtolower((string)$formato);

$condicionbuscar = '';
if($buscar != ''){
	$condicionbuscar = " and descripcion like '%$buscar%'";
}

$sql = "SELECT cod_calificacion_vendedor, descripcion, Estado, rangoinicio, rangofin, puntaje
        FROM calificacion_vendedor
        WHERE Estado = '$Estado'".$condicionbuscar."
        ORDER BY descripcion ASC";


// echo $sql;
// exit;

$stmt = $mysqli->prepare($sql);

if (!$stmt->execute()) {
    echo "Error";
    exit;
}



	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cod_calificacion_vendedor=$valor['cod_calificacion_vendedor'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	  $rangoinicio=utf8_encode($valor['rangoinicio']);
		  	  $rangofin=utf8_encode($valor['rangofin']);
		  	  $puntaje=utf8_encode($valor['puntaje']);

		  $filas[] = array(
			  "cod_calificacion_vendedor" => (string)$cod_calificacion_vendedor,
			  "descripcion" => (string)$descripcion,
			  "estado" => (string)$Estado,
			  "rangoinicio" => (string)$rangoinicio,
			  "rangofin" => (string)$rangofin,
			  "puntaje" => (string)$puntaje
		  );
		  
			if($formato!="json"){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmRangoCalificacionVendedor(this)'>
			  <td id='td_id' style='display:none;'>".$cod_calificacion_vendedor."</td>
			  <td id='td_datos_1'style='width:25%' class='tdRegistroSearch' >".$descripcion."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			  <td id='td_datos_3'style='width:25%' class='tdRegistroSearch' >".$rangoinicio."</td>
			  <td id='td_datos_4'style='width:25%' class='tdRegistroSearch' >".$rangofin."</td>
			  <td id='td_datos_5'style='width:25%' class='tdRegistroSearch' >".$puntaje."</td>
			  </tr>
			  </table>";
			}
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $salida = $formato === 'json' ? $filas : $pagina;
  $informacion =array("1" => "exito","2" => $salida,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}
function buscarOption()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select cod_calificacion_vendedor,descripcion,Estado
        from calificacion_vendedor where Estado='Activo' order by descripcion asc ";
		   
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  
		      $cod_calificacion_vendedor=$valor['cod_calificacion_vendedor'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$cod_calificacion_vendedor' >$descripcion</option>";
		  	 
			 
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}


function buscarCalificacionVendedor($fecha1,$fecha2,$local,$vendedor,$calificacion,$estado,$formato="")
{
	// echo $calificacion;
	// exit;
	
	$mysqli=conectar_al_servidor();
	 $pagina="";  
	 $filas=array();
	 $formato = strtolower((string)$formato);
	 
	 $condicionvendedor = '';
	 if($vendedor != ''){
		 $condicionvendedor = " and idvendedor = '$vendedor'";
	 }
	 
		$sql= "SELECT * FROM vendedor WHERE estado = 'Activo' and control_vendedor = 1".$condicionvendedor." order by idvendedor";
		
	
		
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
	echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}

	$styleName="tableRegistroSearch";
	$result = $stmt->get_result();
	$valor= mysqli_num_rows($result);
	$totalresouesta= $valor;
  
  
	// ✅ puntos base (contactado/agendado/credito/contado)
    $puntajesBase = obtener_puntajes_agendado_contacto();
    $valorPuntoContacto = isset($puntajesBase[0]) ? (float)$puntajesBase[0] : 0;
    $valorPuntoAgendado = isset($puntajesBase[1]) ? (float)$puntajesBase[1] : 0;
    $valorPuntoCredito  = isset($puntajesBase[2]) ? (float)$puntajesBase[2] : 0;
    $valorPuntoContado  = isset($puntajesBase[3]) ? (float)$puntajesBase[3] : 0;

    $arrayDatos = obtener_rango_puntajes();
    $cantRangos = is_array($arrayDatos) ? count($arrayDatos) : 0;
  
	$fechas = obtenerFechasEnRango($fecha1, $fecha2, 'Y-m-d');
	
	

for ($idxFecha = 0; $idxFecha < count($fechas); $idxFecha++)
{
    $fechaDia = $fechas[$idxFecha];

    $tituloPagina = "<table style='background-color: #2196f3;color:white;width:100%' border='1' cellspacing='1' cellpadding='5'>
        <tr id='tbSelecRegistro'>
            <td style='width:10%;text-align:center;'>".htmlspecialchars(formatearFecha($fechaDia), ENT_QUOTES, 'UTF-8')."</td>
        </tr>
    </table>";

    // ✅ Se imprime solo si aparece al menos un vendedor para esa fecha
    $imprimioTitulo = false;

    mysqli_data_seek($result, 0);

    while ($fila = mysqli_fetch_assoc($result))
    {
        $vendedor = isset($fila['nombre']) ? utf8_encode($fila['nombre']) : '';
		$idvendedor = isset($fila['idvendedor']) ? utf8_encode($fila['idvendedor']) : '';
		$cod_usuarioFK = isset($fila['cod_usuarioFK']) ? utf8_encode($fila['cod_usuarioFK']) : '';
        $vendedorHTML = htmlspecialchars($vendedor, ENT_QUOTES, 'UTF-8');



		//CALCULOS
        $total_clientes_contactados = (float) obtener_total_clientes_contactados($cod_usuarioFK, $fechaDia);
        $total_clientes_agendados = (float) obtener_total_clientes_agendados($cod_usuarioFK, $fechaDia);
        $obtener_cantidad_venta_credito = (float) obtener_cantidad_venta_credito($idvendedor, $fechaDia);
        $obtener_cantidad_venta_contado = (float) obtener_cantidad_venta_contado($idvendedor, $fechaDia);

        $totalPuntajeVendedor =
            ($valorPuntoContacto  * $total_clientes_contactados) +
            ($valorPuntoAgendado * $total_clientes_agendados) +
            ($valorPuntoCredito * $obtener_cantidad_venta_credito) +
            ($valorPuntoContado * $obtener_cantidad_venta_contado);
			
        $obtener_total_ventas = (float) obtener_total_ventas($idvendedor, $fechaDia);
			
			
			
			
        for ($idxRango = 0; $idxRango < $cantRangos; $idxRango++)
        {
            $desde = isset($arrayDatos[$idxRango][1]) ? (float)$arrayDatos[$idxRango][1] : null;
            $hasta = isset($arrayDatos[$idxRango][2]) ? (float)$arrayDatos[$idxRango][2] : null;

            if ($desde === null || $hasta === null) continue;

            if ($totalPuntajeVendedor >= $desde && $totalPuntajeVendedor <= $hasta)
            {
                $textoCalif  = isset($arrayDatos[$idxRango][0]) ? $arrayDatos[$idxRango][0] : '';
                $codigoCalif = isset($arrayDatos[$idxRango][3]) ? (string)$arrayDatos[$idxRango][3] : '';

                if ($calificacion === '' || $codigoCalif === (string)$calificacion)
                {
                    // Estado / observación
                    $estadorevision = 'PENDIENTE';
                    $obs = obtener_estado_observacion($idvendedor, $fechaDia);
					$onclick='Obtenerdatoscalificacionvendedor(this)';
					
                    if ($obs != "0") {
                        $estadorevision = 'CONTROLADO';
						$onclick = '';
                    } else {
                        $estadorevision = 'PENDIENTE';
                        $obs = '';
                    }

                    // ✅ filtro real por estado (si viene vacío, no filtra)
                    if ($estado !== '' && $estado !== $estadorevision) {
                        break; // ya encontró rango, pero no pasa filtro estado
                    }

                    // ✅ aquí recién imprimo el título (una sola vez por fecha)
                    if (!$imprimioTitulo) {
						if($formato!="json"){
							$pagina .= $tituloPagina;
						}
                        $imprimioTitulo = true;
                    }

					if($formato!="json"){
						$styleName = CargarStyleTable($styleName);
					}

                    $hidden = "{$fechaDia}_{$idvendedor}";

					$filas[] = array(
						"fecha" => (string)$fechaDia,
						"fecha_formateada" => (string)formatearFecha($fechaDia),
						"vendedor" => (string)$vendedor,
						"contactados" => $total_clientes_contactados,
						"agendados" => $total_clientes_agendados,
						"ventas_credito" => $obtener_cantidad_venta_credito,
						"ventas_contado" => $obtener_cantidad_venta_contado,
						"puntaje_total" => $totalPuntajeVendedor,
						"total_ventas" => $obtener_total_ventas,
						"total_ventas_formateado" => number_format($obtener_total_ventas, 0, ',', '.'),
						"calificacion" => (string)$textoCalif,
						"estado_revision" => (string)$estadorevision,
						"observacion" => (string)$obs,
						"id_calificacion" => (string)$hidden,
						"seleccionable" => $estadorevision === 'PENDIENTE'
					);

					if($formato!="json"){
                    $pagina .= "
                    <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
                        <tr id='tbSelecRegistro' onclick='$onclick'>
                            <td style='width:10%;text-align:center;' id='td_datos_1'>$vendedorHTML</td>
                            <td style='width:10%;text-align:center;' id='td_datos_2'>$total_clientes_contactados</td>
                            <td style='width:10%;text-align:center;' id='td_datos_3'>$total_clientes_agendados</td>
                            <td style='width:10%;text-align:center;' id='td_datos_4'>$obtener_cantidad_venta_credito</td>
                            <td style='width:10%;text-align:center;' id='td_datos_5'>$obtener_cantidad_venta_contado</td>
                            <td style='width:10%;text-align:center;' id='td_datos_6'>$totalPuntajeVendedor</td>
                            <td style='width:10%;text-align:center;' id='td_datos_11'>".number_format($obtener_total_ventas,'0',',','.')."</td>
                            <td style='width:10%;text-align:center;' id='td_datos_7'>".htmlspecialchars((string)$textoCalif, ENT_QUOTES, 'UTF-8')."</td>
                            <td style='width:10%;text-align:center;' id='td_datos_8'>$estadorevision</td>
                            <td style='width:10%;text-align:center;' id='td_datos_9'>".htmlspecialchars((string)$obs, ENT_QUOTES, 'UTF-8')."</td>
                            <td style='display:none' id='td_datos_10'>$hidden</td>
                        </tr>
                    </table>";
					}
                }

                break; // no seguir buscando rangos
            }
        }
    }
}


 
 
  mysqli_close($mysqli);
  $salida = $formato === 'json' ? $filas : $pagina;
  $informacion =array("1" => "exito","2" => $salida,"3"=>$totalresouesta);
echo json_encode($informacion);	
exit;
}


/* function buscarCalificacionVendedorGeneral($fecha1, $fecha2, $local)
{
    $mysqli = conectar_al_servidor();
    $pagina = "";
 
	 
		$sql= "SELECT * FROM vendedor WHERE estado = 'Activo' and control_vendedor = 1 order by idvendedor";

    $stmt = $mysqli->prepare($sql);
    if (!$stmt->execute()) {
        echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
        exit;
    }

    $result = $stmt->get_result();
    $valor = mysqli_num_rows($result);
    $totalresouesta = $valor;

    if ($valor <= 0) {
        mysqli_close($mysqli);
        echo json_encode(["1" => "exito", "2" => "", "3" => 0]);
        exit;
    }

   // ✅ puntos base (contactado/agendado/credito/contado)
    $puntajesBase = obtener_puntajes_agendado_contacto();
    $valorPuntoContacto = isset($puntajesBase[0]) ? (float)$puntajesBase[0] : 0;
    $valorPuntoAgendado = isset($puntajesBase[1]) ? (float)$puntajesBase[1] : 0;
    $valorPuntoCredito  = isset($puntajesBase[2]) ? (float)$puntajesBase[2] : 0;
    $valorPuntoContado  = isset($puntajesBase[3]) ? (float)$puntajesBase[3] : 0;

    // ✅ rangos + puntaje de calificación (tu función)
    $rangos = obtener_rango_puntajes();

    // Columnas (descripciones únicas en orden)
    $columnas = [];
    foreach ($rangos as $r) { 
		$desc = isset($r[0]) ? (string)$r[0] : '';
        if ($desc !== '' && !in_array($desc, $columnas, true)) {
            $columnas[] = $desc;
        }
    }
    // opcional: si quieres mostrar SIN RANGO
    if (!in_array('SIN RANGO', $columnas, true)) $columnas[] = 'SIN RANGO';

    // Rango de fechas
    $fechas = obtenerFechasEnRango($fecha1, $fecha2, 'Y-m-d');

    // ✅ Inicializar ranking con vendedores
    $ranking = [];
    mysqli_data_seek($result, 0);
    while ($fila = mysqli_fetch_assoc($result)) {
        $cod = isset($fila['idvendedor']) ? utf8_encode($fila['idvendedor']) : '';
		$nom = isset($fila['nombre']) ? utf8_encode($fila['nombre']) : '';
		$cod_usuarioFK = isset($fila['cod_usuarioFK']) ? utf8_encode($fila['cod_usuarioFK']) : '';

        $ranking[$cod] = [
            'nombre' => $nom,
            'conteo' => array_fill_keys($columnas, 0),
            'total'  => 0
        ];
    }

    // ✅ Acumular por fecha
    foreach ($fechas as $fechaDia) {
        foreach ($ranking as $codVendedor => &$info) {

           //CALCULOS
        $total_clientes_contactados = (float) obtener_total_clientes_contactados($cod_usuarioFK, $fechaDia);
        $total_clientes_agendados = (float) obtener_total_clientes_agendados($cod_usuarioFK, $fechaDia);
        $obtener_cantidad_venta_credito = (float) obtener_cantidad_venta_credito($cod, $fechaDia);
        $obtener_cantidad_venta_contado = (float) obtener_cantidad_venta_contado($cod, $fechaDia);

        $totalPuntajeVendedor =
            ($valorPuntoContacto  * $total_clientes_contactados) +
            ($valorPuntoAgendado * $total_clientes_agendados) +
            ($valorPuntoCredito * $obtener_cantidad_venta_credito) +
            ($valorPuntoContado * $obtener_cantidad_venta_contado);

            $calif = obtenerCalificacionPorPuntaje($totalPuntajeVendedor, $rangos);
            $desc  = $calif['descripcion'];
            $pts   = (float)$calif['puntaje'];

            if (!isset($info['conteo'][$desc])) {
                // cae en "SIN RANGO" u otra no prevista
                $desc = 'SIN RANGO';
            }

            $info['conteo'][$desc] += 1;
            $info['total'] += $pts;
        }
        unset($info);
    }

    // ✅ Ordenar por total desc
    uasort($ranking, function($a, $b) {
    if ($a['total'] == $b['total']) {
        return 0;
    }
    return ($a['total'] < $b['total']) ? 1 : -1; // orden descendente
});


    // ✅ Render de la tabla general
    $styleName = "tableRegistroSearch";
    $styleName = CargarStyleTable($styleName);

    $pagina .= "<table class='$styleName' border='1' cellspacing='1' cellpadding='5' style='width:100%'>";

    // Header
    $pagina .= "<tr id='tbSelecRegistro'>";
    $pagina .= "<td style='width:20%;text-align:left;font-weight:bold;'>COBRADOR</td>";
    foreach ($columnas as $col) {
        $pagina .= "<td style='width:10%;text-align:center;font-weight:bold;'>".htmlspecialchars($col, ENT_QUOTES, 'UTF-8')."</td>";
    }
    $pagina .= "<td style='width:10%;text-align:center;font-weight:bold;'>PUNTOS TOTALES</td>";
    $pagina .= "</tr>";

    // Rows
    foreach ($ranking as $info) {
        $nombre = htmlspecialchars($info['nombre'], ENT_QUOTES, 'UTF-8');

        $pagina .= "<tr id='tbSelecRegistro'>";
        $pagina .= "<td style='width:20%'>$nombre</td>";

        foreach ($columnas as $col) {
            $val = isset($info['conteo'][$col]) ? (int)$info['conteo'][$col] : 0;
            $pagina .= "<td style='width:10%;text-align:center;'>$val</td>";
        }

        $totalPts = $info['total'];
        $pagina .= "<td style='width:10%;text-align:center;'>$totalPts</td>";
        $pagina .= "</tr>";
    }

    $pagina .= "</table>";

    mysqli_close($mysqli);
    echo json_encode(["1" => "exito", "2" => $pagina, "3" => $totalresouesta]);
    exit;
}

 */
 function buscarCalificacionVendedorGeneral($fecha1, $fecha2, $local, $formato="")
{
    $mysqli = conectar_al_servidor();
    $pagina = "";
    $filas = array();
    $formato = strtolower((string)$formato);

    // Si quieres filtrar por local, agrega algo como:
    // $sql = "SELECT idvendedor, nombre, cod_usuarioFK FROM vendedor
    //         WHERE estado='Activo' AND control_vendedor=1 AND local = ?
    //         ORDER BY idvendedor";
    //
    // Por ahora lo dejo igual que tu query original:
    $sql = "SELECT idvendedor, nombre, cod_usuarioFK
            FROM vendedor
            WHERE estado='Activo' AND control_vendedor=1
            ORDER BY idvendedor";

    $stmt = $mysqli->prepare($sql);
    if (!$stmt) {
        mysqli_close($mysqli);
        echo json_encode(["1" => "error", "2" => "Error preparando SQL", "3" => 0]);
        exit;
    }

    // Si activas filtro por local:
    // $stmt->bind_param("s", $local);

    if (!$stmt->execute()) {
        $err = 'The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error;
        mysqli_close($mysqli);
        echo json_encode(["1" => "error", "2" => $err, "3" => 0]);
        exit;
    }

    $result = $stmt->get_result();
    $totalresouesta = $result ? (int)$result->num_rows : 0;

    if ($totalresouesta <= 0) {
        mysqli_close($mysqli);
        $salida = $formato === 'json' ? array() : "";
        echo json_encode(["1" => "exito", "2" => $salida, "3" => 0, "4" => array()]);
        exit;
    }

    // ✅ puntos base (contactado/agendado/credito/contado)
    $puntajesBase = obtener_puntajes_agendado_contacto();
    $valorPuntoContacto = isset($puntajesBase[0]) ? (float)$puntajesBase[0] : 0.0;
    $valorPuntoAgendado = isset($puntajesBase[1]) ? (float)$puntajesBase[1] : 0.0;
    $valorPuntoCredito  = isset($puntajesBase[2]) ? (float)$puntajesBase[2] : 0.0;
    $valorPuntoContado  = isset($puntajesBase[3]) ? (float)$puntajesBase[3] : 0.0;

    // ✅ rangos + puntaje de calificación
    $rangos = obtener_rango_puntajes();

    // Columnas (descripciones únicas en orden)
    $columnas = [];
    foreach ($rangos as $r) {
        $desc = isset($r[0]) ? (string)$r[0] : '';
        if ($desc !== '' && !in_array($desc, $columnas, true)) {
            $columnas[] = $desc;
        }
    }
    if (!in_array('SIN RANGO', $columnas, true)) {
        $columnas[] = 'SIN RANGO';
    }

    // Rango de fechas
    $fechas = obtenerFechasEnRango($fecha1, $fecha2, 'Y-m-d');

    // ✅ Inicializar ranking con vendedores
    //    IMPORTANTE: guardar cod_usuarioFK POR vendedor
    $ranking = [];

    $result->data_seek(0);
    while ($fila = $result->fetch_assoc()) {
       $cod = isset($fila['idvendedor']) ? (string)$fila['idvendedor'] : '';
		$nom = isset($fila['nombre']) ? utf8_encode($fila['nombre']) : '';
		$cod_usuarioFK = isset($fila['cod_usuarioFK']) ? (string)$fila['cod_usuarioFK'] : '';

        if ($cod === '') {
            continue;
        }

        $ranking[$cod] = [
            'nombre'       => $nom,
            'cod_usuarioFK'=> $cod_usuarioFK,            // ✅ CLAVE
            'conteo'       => array_fill_keys($columnas, 0),
            'total'        => 0.0
        ];
    }

    // ✅ Acumular por fecha
    foreach ($fechas as $fechaDia) {
        foreach ($ranking as $codVendedor => &$info) {

            $codUsuario = $info['cod_usuarioFK'];

            // CALCULOS
            $total_clientes_contactados = (float) obtener_total_clientes_contactados($codUsuario, $fechaDia);
            $total_clientes_agendados   = (float) obtener_total_clientes_agendados($codUsuario, $fechaDia);
            $cant_credito               = (float) obtener_cantidad_venta_credito($codVendedor, $fechaDia);
            $cant_contado               = (float) obtener_cantidad_venta_contado($codVendedor, $fechaDia);

            $totalPuntajeVendedor =
                ($valorPuntoContacto * $total_clientes_contactados) +
                ($valorPuntoAgendado * $total_clientes_agendados) +
                ($valorPuntoCredito  * $cant_credito) +
                ($valorPuntoContado  * $cant_contado);

            $calif = obtenerCalificacionPorPuntaje($totalPuntajeVendedor, $rangos);
            $desc  = isset($calif['descripcion']) ? (string)$calif['descripcion'] : 'SIN RANGO';
            $pts   = isset($calif['puntaje']) ? (float)$calif['puntaje'] : 0.0;

            if (!isset($info['conteo'][$desc])) {
                $desc = 'SIN RANGO';
            }

            $info['conteo'][$desc] += 1;
            $info['total'] += $pts;
        }
        unset($info);
    }

    // ✅ Ordenar por total desc
    uasort($ranking, function ($a, $b) {
        if ($a['total'] == $b['total']) return 0;
        return ($a['total'] < $b['total']) ? 1 : -1;
    });

    foreach ($ranking as $info) {
        $conteos = array();
        foreach ($columnas as $col) {
            $conteos[] = array(
                "descripcion" => (string)$col,
                "cantidad" => isset($info['conteo'][$col]) ? (int)$info['conteo'][$col] : 0
            );
        }
        $filas[] = array(
            "nombre" => (string)$info['nombre'],
            "conteos" => $conteos,
            "total" => (float)$info['total']
        );
    }

    // ✅ Render de la tabla general
    $styleName = "tableRegistroSearch";
    $styleName = CargarStyleTable($styleName);

    if($formato!="json"){
    $pagina .= "<table class='".htmlspecialchars($styleName, ENT_QUOTES, 'UTF-8')."' border='1' cellspacing='1' cellpadding='5' style='width:100%'>";

    // Header
    $pagina .= "<tr id='tbSelecRegistro'>";
    $pagina .= "<td style='width:20%;text-align:left;font-weight:bold;'>COBRADOR</td>";
    foreach ($columnas as $col) {
        $pagina .= "<td style='width:10%;text-align:center;font-weight:bold;'>".htmlspecialchars($col, ENT_QUOTES, 'UTF-8')."</td>";
    }
    $pagina .= "<td style='width:10%;text-align:center;font-weight:bold;'>PUNTOS TOTALES</td>";
    $pagina .= "</tr>";

    // Rows
    foreach ($ranking as $info) {
        $nombre = htmlspecialchars((string)$info['nombre'], ENT_QUOTES, 'UTF-8');

        $pagina .= "<tr id='tbSelecRegistro'>";
        $pagina .= "<td style='width:20%'>".$nombre."</td>";

        foreach ($columnas as $col) {
            $val = isset($info['conteo'][$col]) ? (int)$info['conteo'][$col] : 0;
            $pagina .= "<td style='width:10%;text-align:center;'>".$val."</td>";
        }

        $totalPts = (float)$info['total'];
        $pagina .= "<td style='width:10%;text-align:center;'>".$totalPts."</td>";
        $pagina .= "</tr>";
    }

    $pagina .= "</table>";
    }

    mysqli_close($mysqli);
    $salida = $formato === 'json' ? $filas : $pagina;
    echo json_encode(["1" => "exito", "2" => $salida, "3" => $totalresouesta, "4" => $columnas]);
    exit;
}

function obtenerCalificacionPorPuntaje($puntajeTotal, $rangos)
{
    foreach ($rangos as $r) {
       $desc = isset($r[0]) ? (string)$r[0] : '';
		$ini  = isset($r[1]) ? (float)$r[1] : 0;
		$fin  = isset($r[2]) ? (float)$r[2] : 0;
		$pts  = isset($r[4]) ? (float)$r[4] : 0;

        if ($puntajeTotal >= $ini && $puntajeTotal <= $fin) {
            return ['descripcion' => $desc, 'puntaje' => $pts];
        }
    }
    return ['descripcion' => 'SIN RANGO', 'puntaje' => 0];
}


function formatearFecha($fecha)
{
    $date = DateTime::createFromFormat('Y-m-d', $fecha);
    return $date ? $date->format('d-m-Y') : null;
}

function obtenerFechasEnRango($fechaInicio, $fechaFin, $formato = 'Y-m-d')
{
    $fechas = [];

    try {
        $inicio = new DateTime($fechaInicio);
        $fin    = new DateTime($fechaFin);

        // Validar que inicio no sea mayor que fin
        if ($inicio > $fin) {
            return [];
        }

        // Incluir la fecha final sumando 1 día
        $fin->modify('+1 day');

        $intervalo = new DateInterval('P1D');
        $periodo   = new DatePeriod($inicio, $intervalo, $fin);

        foreach ($periodo as $fecha) {
            $fechas[] = $fecha->format($formato);
        }

    } catch (Exception $e) {
        return [];
    }

    return $fechas;
}



function obtener_total_clientes_contactados($cod_usuario,$fecha)
{
	$mysqli = conectar_al_servidor();
 
	$total_cliente = 0;	


	$sql = "SELECT count(*) as total_cliente FROM detalle_callcenterventas where agente_cod_usuarioFK = '$cod_usuario' and fecha_ingreso = '$fecha';";
	
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$datos = array();
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$total_cliente = $valor['total_cliente'];
		}
	}
	
	return $total_cliente;
}
function obtener_total_clientes_agendados($cod_usuario,$fecha)
{
	$mysqli = conectar_al_servidor();
 
	$total_cliente = 0;	


	$sql = "SELECT count(*) as total_cliente
 FROM agenda_callcenterventas ac WHERE (SELECT agente_cod_usuarioFK FROM detalle_callcenterventas WHERE iddetalle_callcenterventas = ac.iddetalle_callcenterventasFK) = '$cod_usuario' and ac.fecha_insert = '$fecha'";
	
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$datos = array();
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$total_cliente = $valor['total_cliente'];
		}
	}
	
	return $total_cliente;
}
function obtener_cantidad_venta_credito($cod_vendedor,$fecha)
{
	$mysqli = conectar_al_servidor();
 
	$contador = 0;	


		$sql= "Select count(cod_venta) as contador 
        from venta vt where  Vendedor1='$cod_vendedor' and vt.fecha_venta = '$fecha' and vt.TipoVenta='CREDITO' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ";
	
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$datos = array();
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$contador = $valor['contador'];
		}
	}
	
	return $contador;
}
function obtener_cantidad_venta_contado($cod_vendedor,$fecha)
{
	$mysqli = conectar_al_servidor();
 
	$contador = 0;	


		$sql= "Select count(cod_venta) as contador 
        from venta vt where  Vendedor1='$cod_vendedor' and vt.fecha_venta = '$fecha' and vt.TipoVenta='CONTADO' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ";
	
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$datos = array();
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$contador = $valor['contador'];
		}
	}
	
	return $contador;
}
function obtener_total_ventas($cod_vendedor,$fecha)
{
	$mysqli = conectar_al_servidor();
 
	$total = 0;	


		$sql= "Select sum(total_venta) as total
        from venta vt where  Vendedor1='$cod_vendedor' and vt.fecha_venta = '$fecha' and IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0  ";
	
 
	$stmt = $mysqli->prepare($sql);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$datos = array();
	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$total = $valor['total'];
		}
	}
	
	return $total;
}

function obtener_puntajes_agendado_contacto()
{

$mysqli=conectar_al_servidor();


	 $pagina="";

	
	$sql= "SELECT * FROM cargar_calificacion_vendedor WHERE estado = 'Activo'";

 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$styleName="tableRegistroSearch";

$arrayDatos = array();

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$puntos=utf8_encode($valor['puntos']);

array_push($arrayDatos,$puntos);
}
}

return $arrayDatos;

}

function obtener_estado_observacion($cod_vendedor,$fecha)
{

$mysqli=conectar_al_servidor();

	
	$sql= "SELECT descripicion FROM observacion_calificacion_vendedor WHERE cod_vendedor='$cod_vendedor' and fecha = '$fecha'";

// echo $sql;
// exit;
 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



$result = $stmt->get_result();
$valor= mysqli_num_rows($result);

$descripicion = '';

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$descripicion=utf8_encode($valor['descripicion']);


}
}else{
	return 0;
}

return $descripicion;

}

function obtener_rango_puntajes()
{

$mysqli=conectar_al_servidor();


	 $pagina="";

	
	$sql= "SELECT * FROM calificacion_vendedor WHERE estado = 'Activo'";

 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$styleName="tableRegistroSearch";

$arrayParcial = array();
$arrayReturn = array();

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$cod_calificacion_vendedor=utf8_encode($valor['cod_calificacion_vendedor']);
$descripcion=utf8_encode($valor['descripcion']);
$rangoinicio=utf8_encode($valor['rangoinicio']);
$rangofin=utf8_encode($valor['rangofin']);
$puntaje=utf8_encode($valor['puntaje']);

array_push($arrayParcial, $descripcion);
array_push($arrayParcial, $rangoinicio);
array_push($arrayParcial, $rangofin);
array_push($arrayParcial, $cod_calificacion_vendedor);
array_push($arrayParcial, $puntaje);

array_push($arrayReturn,$arrayParcial);
$arrayParcial = array();
}
}



return $arrayReturn;

}


/* CALIFICACION VENDEDOR */
function abm_cal($puntos,$cod_cargar_calificacion_vendedor,$descripcion,$Estado,$funt)
{
	
	
	// echo $funt;
	// exit;
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo_cal")
	{
				$consulta= "Select count(*) from cargar_calificacion_vendedor where descripcion=? and Estado ='Activo' ";
	
	
		$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $descripcion); 


if ( ! $stmt->execute()) {
	$informacion =array("1" => "error");
	echo json_encode($informacion);	
	exit;
}

$valor = 0;
$stmt->bind_result($valor);
while ($stmt->fetch()) { 
   
	 $valor =$valor;
}

if($valor==1)
{
	$informacion =array("1" => "EX");
	echo json_encode($informacion);	
	exit;
}   
	}
	
	
	if($funt=="nuevo_cal")
	{
	
				$consulta="insert into cargar_calificacion_vendedor (puntos,descripcion,Estado) values ('$puntos','$descripcion','$Estado')";	      	$stmt = $mysqli->prepare($consulta);
		if ( ! $stmt->execute() ) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
		exit;
		}
	}
	
	
	if($funt=="editar_cal")
	{
        
    $consulta="Update cargar_calificacion_vendedor set descripcion='$descripcion',Estado='$Estado',puntos = '$puntos' where cod_cargar_calificacion_vendedor='$cod_cargar_calificacion_vendedor'";	

// echo $consulta;
// exit;

				$stmt = $mysqli->prepare($consulta);
		if ( ! $stmt->execute() ) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
		exit;
		}
	
       
	}




 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

	
	
	
	
}
function buscar_cal($buscar,$Estado,$formato="")
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $filas=array();
	 $formato = strtolower((string)$formato);
		$sql= "Select cod_cargar_calificacion_vendedor,descripcion,Estado,puntos
        from cargar_calificacion_vendedor where descripcion like ?  and Estado=? order by descripcion asc ";
		
   $stmt = $mysqli->prepare($sql);
  	$s='ss';
$buscar1="%".$buscar."%";
//$buscar="".$buscar."";
$stmt->bind_param($s,$buscar1,$Estado);

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 $styleName="tableRegistroSearch";
 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		  
		  
		  
		      $cod_cargar_calificacion_vendedor=$valor['cod_cargar_calificacion_vendedor'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	  $puntos=utf8_encode($valor['puntos']);

			  $filas[] = array(
				  "cod_cargar_calificacion_vendedor" => (string)$cod_cargar_calificacion_vendedor,
				  "descripcion" => (string)$descripcion,
				  "estado" => (string)$Estado,
				  "puntos" => (string)$puntos
			  );
		  
			if($formato!="json"){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmCargarCalificacionVendedor(this)'>
			  <td id='td_id' style='display:none;'>".$cod_cargar_calificacion_vendedor."</td>
			  <td id='td_datos_1'style='width:70%' class='tdRegistroSearch' >".$descripcion."</td>
			  <td id='td_datos_3'style='width:30%' class='tdRegistroSearch' >".$puntos."</td>
			   <td  id='td_datos_2' style='display:none'>".$Estado."</td>
			  </tr>
			  </table>";
			}
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $salida = $formato === 'json' ? $filas : $pagina;
  $informacion =array("1" => "exito","2" => $salida,"3"=> $totalresouesta);
echo json_encode($informacion);	
exit;


}
function buscarOption_cal()
{
	$mysqli=conectar_al_servidor();
	 $pagina="";  
		$sql= "Select cod_cargar_calificacion_vendedor,descripcion,Estado
        from cargar_calificacion_vendedor where Estado='Activo' order by descripcion asc ";
		   
   $stmt = $mysqli->prepare($sql);
  	
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}


	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $totalresouesta= $valor;
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		  
		      $cod_cargar_calificacion_vendedor=$valor['cod_cargar_calificacion_vendedor'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$cod_cargar_calificacion_vendedor' >$descripcion</option>";
		  	 
			 
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}


/* CARGAR OBSERVACION */
function cargar_obs_calificacion_vendedor($id, $obs)
{
	
	if($id=="" || $obs ==""){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();
	
	
	$partes = explode("_", $id);
	$fecha = $partes[0];
	$cod_vendedor = $partes[1];
	
    
	$consulta="insert into observacion_calificacion_vendedor (descripicion,cod_vendedor,fecha) values ('$obs','$cod_vendedor','$fecha')";
	$stmt = $mysqli->prepare($consulta);

	
if ( ! $stmt->execute() ) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}


 mysqli_close($mysqli);
$informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}



verificar($funt);
?>
