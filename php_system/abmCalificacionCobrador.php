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


if($funt=="buscarCalificacionCobrador")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);
$cobrador=$_POST['cobrador'];
$cobrador = utf8_decode($cobrador);
$calificacion=$_POST['calificacion'];
$calificacion = utf8_decode($calificacion);
$estado=$_POST['estado'];
$estado = utf8_decode($estado);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";


	buscarCalificacionCobrador($fecha1,$fecha2,$local,$cobrador,$calificacion,$estado,$formato);

}

if($funt=="buscarCalificacionCobradorGeneral")
{
$fecha1=$_POST['fecha1'];
$fecha1 = utf8_decode($fecha1);
$fecha2=$_POST['fecha2'];
$fecha2 = utf8_decode($fecha2);
$local=$_POST['local'];
$local = utf8_decode($local);
$formato=isset($_POST['formato']) ? utf8_decode($_POST['formato']) : "";


	buscarCalificacionCobradorGeneral($fecha1,$fecha2,$local,$formato);

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

if($funt=="cargar_obs_calificacion_cobrador")
{
	
	
	$obs=$_POST['inptCargarObsCalificacionCobrador'];
    $obs = utf8_decode($obs);
	$id_califacion_cobrador=$_POST['id_califacion_cobrador'];
    $id_califacion_cobrador = utf8_decode($id_califacion_cobrador);
	
	cargar_obs_calificacion_cobrador($id_califacion_cobrador,$obs);

}

}



function abm($rangoinicio,$rangofin,$cod_calificacion_cobrador,$descripcion,$Estado,$puntaje,$funt)
{
	
	if($descripcion=="" ){
$informacion =array("1" => "DI");
echo json_encode($informacion);	
exit;
	}

	$mysqli=conectar_al_servidor();

	if($funt=="nuevo")
	{
				$consulta= "Select count(*) from calificacion_cobrador where descripcion=? and Estado ='Activo' ";
	
	
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
	
    
		$consulta="insert into calificacion_cobrador (rangoinicio,rangofin,descripcion,Estado,puntaje) values ('$rangoinicio','$rangofin','$descripcion','$Estado','$puntaje')";	
		$stmt = $mysqli->prepare($consulta);
		// $ss='sssss';
		// $stmt->bind_param($ss,$rangoinicio,$rangofin,$descripcion,$Estado,$puntaje); 
        
 
	}
	if($funt=="editar")
	{
    
    $consulta="Update calificacion_cobrador set descripcion='$descripcion',Estado='$Estado',rangoinicio = '$rangoinicio',rangofin='$rangofin',puntaje='$puntaje' where cod_calificacion_cobrador='$cod_calificacion_cobrador'";	
	
	// echo $consulta;
	// exit;

	$stmt = $mysqli->prepare($consulta);
    // $ss='ssssss';
    // $stmt->bind_param($ss,$descripcion,$Estado,$rangoinicio,$rangofin,$cod_calificacion_cobrador,$puntaje); 
        
	
       
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

$sql = "SELECT cod_calificacion_cobrador, descripcion, Estado, rangoinicio, rangofin, puntaje
        FROM calificacion_cobrador
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
		  
		  
		  
		      $cod_calificacion_cobrador=$valor['cod_calificacion_cobrador'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	  $rangoinicio=utf8_encode($valor['rangoinicio']);
		  	  $rangofin=utf8_encode($valor['rangofin']);
		  $puntaje=utf8_encode($valor['puntaje']);

		  $filas[] = array(
			  "cod_calificacion_cobrador" => (string)$cod_calificacion_cobrador,
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
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmRangoCalificacionCobrador(this)'>
			  <td id='td_id' style='display:none;'>".$cod_calificacion_cobrador."</td>
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
		$sql= "Select cod_calificacion_cobrador,descripcion,Estado
        from calificacion_cobrador where Estado='Activo' order by descripcion asc ";
		   
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
		   
		  
		      $cod_calificacion_cobrador=$valor['cod_calificacion_cobrador'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$cod_calificacion_cobrador' >$descripcion</option>";
		  	 
			 
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}


function buscarCalificacionCobrador($fecha1,$fecha2,$local,$cobrador,$calificacion,$estado,$formato="")
{
	// echo $calificacion;
	// exit;
	
	$mysqli=conectar_al_servidor();
	 $pagina="";  
	 $filas=array();
	 $formato = strtolower((string)$formato);
	 
	 $condicioncobrador = '';
	 if($cobrador != ''){
		 $condicioncobrador = " and cod_cobrador = '$cobrador'";
	 }
	 
		$sql= "Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobrador ) as cobrador , cod_cobrador ,url_img, estado  from cobrador where estado='Activo' and 
		(select count(*) from zona where cod_cobrador=cod_cobradorFK )>=1".$condicioncobrador." order by cobrador";
		
	
		
	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
	echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	exit;
	}

	$styleName="tableRegistroSearch";
	$result = $stmt->get_result();
	$valor= mysqli_num_rows($result);
	$totalresouesta= $valor;
  
  
	$puntajes = obtener_puntajes_agendado_visitado();
    $valorPuntoVisitado = isset($puntajes[0]) ? (float)$puntajes[0] : 0;
    $valorPuntoAgendado = isset($puntajes[1]) ? (float)$puntajes[1] : 0;
    $valorPuntoCobrado  = isset($puntajes[2]) ? (float)$puntajes[2] : 0;

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

    // ✅ Se imprime solo si aparece al menos un cobrador para esa fecha
    $imprimioTitulo = false;

    mysqli_data_seek($result, 0);

    while ($fila = mysqli_fetch_assoc($result))
    {
        $cobrador = isset($fila['cobrador']) ? utf8_encode($fila['cobrador']) : '';
		$cod_cobrador = isset($fila['cod_cobrador']) ? utf8_encode($fila['cod_cobrador']) : '';

        $cobradorHTML = htmlspecialchars($cobrador, ENT_QUOTES, 'UTF-8');

        $total_clientes = (float) buscarMontoResumenCobro($local, $cod_cobrador, $fechaDia, "1");

        $datosMora = buscarDetalleResumenCobrador("1", $cod_cobrador, $fechaDia, $local);
        $t_puntaje_tramo = isset($datosMora[1]) ? (float)$datosMora[1] : 0;

        $datosVisitadoAgen = total_visitado_agendado($cod_cobrador, $fechaDia);
        $total_agendado = isset($datosVisitadoAgen[0]) ? (int)$datosVisitadoAgen[0] : 0;
        $total_visitado = isset($datosVisitadoAgen[1]) ? (int)$datosVisitadoAgen[1] : 0;

        $totalPuntajeCobrador =
            ($valorPuntoCobrado  * $total_clientes) +
            ($valorPuntoVisitado * $total_visitado) +
            ($valorPuntoAgendado * $total_agendado) +
            $t_puntaje_tramo;

        for ($idxRango = 0; $idxRango < $cantRangos; $idxRango++)
        {
            $desde = isset($arrayDatos[$idxRango][1]) ? (float)$arrayDatos[$idxRango][1] : null;
            $hasta = isset($arrayDatos[$idxRango][2]) ? (float)$arrayDatos[$idxRango][2] : null;

            if ($desde === null || $hasta === null) continue;

            if ($totalPuntajeCobrador >= $desde && $totalPuntajeCobrador <= $hasta)
            {
                $textoCalif  = isset($arrayDatos[$idxRango][0]) ? $arrayDatos[$idxRango][0] : '';
                $codigoCalif = isset($arrayDatos[$idxRango][3]) ? (string)$arrayDatos[$idxRango][3] : '';

                if ($calificacion === '' || $codigoCalif === (string)$calificacion)
                {
                    // Estado / observación
                    $estadorevision = 'PENDIENTE';
                    $obs = obtener_estado_observacion($cod_cobrador, $fechaDia);
					$onclick='Obtenerdatoscalificacioncobrador(this)';
					
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

                    $hidden = "{$fechaDia}_{$cod_cobrador}";

					$filas[] = array(
						"fecha" => (string)$fechaDia,
						"fecha_formateada" => (string)formatearFecha($fechaDia),
						"cobrador" => (string)$cobrador,
						"visitado" => $total_visitado,
						"agendado" => $total_agendado,
						"cobrado" => $total_clientes,
						"puntaje_tramo" => $t_puntaje_tramo,
						"puntaje_total" => $totalPuntajeCobrador,
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
                            <td style='width:10%' id='td_datos_1'>$cobradorHTML</td>
                            <td style='width:10%' id='td_datos_2'>$total_visitado</td>
                            <td style='width:10%' id='td_datos_3'>$total_agendado</td>
                            <td style='width:10%' id='td_datos_4'>$total_clientes</td>
                            <td style='width:10%' id='td_datos_5'>$t_puntaje_tramo</td>
                            <td style='width:10%' id='td_datos_6'>$totalPuntajeCobrador</td>
                            <td style='width:10%' id='td_datos_7'>".htmlspecialchars((string)$textoCalif, ENT_QUOTES, 'UTF-8')."</td>
                            <td style='width:10%' id='td_datos_8'>$estadorevision</td>
                            <td style='width:10%' id='td_datos_9'>".htmlspecialchars((string)$obs, ENT_QUOTES, 'UTF-8')."</td>
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
// function buscarCalificacionCobradorGeneral($fecha1,$fecha2,$local)
// {

	// $mysqli=conectar_al_servidor();
	 // $pagina="";  
	 
	 // $condicioncobrador = '';
	 // if($cobrador != ''){
		 // $condicioncobrador = " and cod_cobrador = '$cobrador'";
	 // }
	 
		// $sql= "Select  (Select upper(nombre_persona) from persona pra where pra.cod_persona =cod_cobrador ) as cobrador , cod_cobrador ,url_img, estado  from cobrador where estado='Activo' and 
		// (select count(*) from zona where cod_cobrador=cod_cobradorFK )>=1".$condicioncobrador." order by cobrador";
		
	// $stmt = $mysqli->prepare($sql);
	// if (!$stmt->execute()) {
	// echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
	// exit;
	// }

	// $styleName="tableRegistroSearch";
	// $result = $stmt->get_result();
	// $valor= mysqli_num_rows($result);
	// $totalresouesta= $valor;
  
  
	// $fechas = obtenerFechasEnRango($fecha1, $fecha2, 'Y-m-d');
	// $titulos = obtener_rango_puntajes();
	// $cantRangos = is_array($arrayDatos) ? count($arrayDatos) : 0;
	// $subpagina = '';
	// foreach ($titulos as $titulo) {
		// $subpagina.= "<td style='width:10%;text-align:center;'>".$titulo."</td>";
	// }
	
    // $tituloPagina = "<table style='background-color: #2196f3;color:white;width:100%' border='1' cellspacing='1' cellpadding='5'>
        // <tr id='tbSelecRegistro'>
            // <td style='width:10%;text-align:center;'>".htmlspecialchars($cobrador)."</td>".
			// $subpagina.
        // "</tr>
    // </table>";

// for ($idxFecha = 0; $idxFecha < count($fechas); $idxFecha++)
// {
    // $fechaDia = $fechas[$idxFecha];

    // mysqli_data_seek($result, 0);

    // while ($fila = mysqli_fetch_assoc($result))
    // {
        // $cobrador     = utf8_encode($fila['cobrador'] ?? '');
        // $cod_cobrador = utf8_encode($fila['cod_cobrador'] ?? '');

        // $cobradorHTML = htmlspecialchars($cobrador, ENT_QUOTES, 'UTF-8');

        // $total_clientes = (float) buscarMontoResumenCobro($local, $cod_cobrador, $fechaDia, "1");

        // $datosMora = buscarDetalleResumenCobrador("1", $cod_cobrador, $fechaDia, $local);
        // $t_puntaje_tramo = isset($datosMora[1]) ? (float)$datosMora[1] : 0;

        // $datosVisitadoAgen = total_visitado_agendado($cod_cobrador, $fechaDia);
        // $total_agendado = isset($datosVisitadoAgen[0]) ? (int)$datosVisitadoAgen[0] : 0;
        // $total_visitado = isset($datosVisitadoAgen[1]) ? (int)$datosVisitadoAgen[1] : 0;

        // $totalPuntajeCobrador =
            // ($valorPuntoCobrado  * $total_clientes) +
            // ($valorPuntoVisitado * $total_visitado) +
            // ($valorPuntoAgendado * $total_agendado) +
            // $t_puntaje_tramo;

        // for ($idxRango = 0; $idxRango < $cantRangos; $idxRango++)
        // {
            // $desde = isset($arrayDatos[$idxRango][1]) ? (float)$arrayDatos[$idxRango][1] : null;
            // $hasta = isset($arrayDatos[$idxRango][2]) ? (float)$arrayDatos[$idxRango][2] : null;

            // if ($desde === null || $hasta === null) continue;

            // if ($totalPuntajeCobrador >= $desde && $totalPuntajeCobrador <= $hasta)
            // {


                    // $styleName = CargarStyleTable($styleName);
                    // $pagina .= "
                    // <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
                        // <tr id='tbSelecRegistro' >
                            // <td style='width:10%' id='td_datos_1'>$cobradorHTML</td>
                            // <td style='width:10%' id='td_datos_6'>$totalPuntajeCobrador</td>
                        // </tr>
                    // </table>";
                

                // break; // no seguir buscando rangos
            // }
        // }
    // }


// }


 
 
  // mysqli_close($mysqli);
  // $informacion =array("1" => "exito","2" => $pagina,"3"=>$totalresouesta);
// echo json_encode($informacion);	
// exit;
// }

function buscarCalificacionCobradorGeneral($fecha1, $fecha2, $local, $formato="")
{
    $mysqli = conectar_al_servidor();
    $pagina = "";
    $filas = array();
    $formato = strtolower((string)$formato);

    // ✅ SQL corregido (EXISTS correlacionado) + sin usar $cobrador inexistente
    $sql = "
        SELECT
            (SELECT UPPER(pra.nombre_persona)
             FROM persona pra
             WHERE pra.cod_persona = c.cod_cobrador) AS cobrador,
            c.cod_cobrador,
            c.url_img,
            c.estado
        FROM cobrador c
        WHERE c.estado='Activo'
          AND EXISTS (SELECT 1 FROM zona z WHERE z.cod_cobradorFK = c.cod_cobrador)
        ORDER BY cobrador
    ";

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
        $salida = $formato === 'json' ? array() : "";
        echo json_encode(["1" => "exito", "2" => $salida, "3" => 0, "4" => array()]);
        exit;
    }

    // ✅ puntos base (visitado/agendado/cobrado)
    $puntajesBase = obtener_puntajes_agendado_visitado();
    $valorPuntoVisitado = isset($puntajesBase[0]) ? (float)$puntajesBase[0] : 0;
    $valorPuntoAgendado = isset($puntajesBase[1]) ? (float)$puntajesBase[1] : 0;
    $valorPuntoCobrado  = isset($puntajesBase[2]) ? (float)$puntajesBase[2] : 0;

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

    // ✅ Inicializar ranking con cobradores
    $ranking = [];
    mysqli_data_seek($result, 0);
    while ($fila = mysqli_fetch_assoc($result)) {
        $cod = isset($fila['cod_cobrador']) ? utf8_encode($fila['cod_cobrador']) : '';
		$nom = isset($fila['cobrador']) ? utf8_encode($fila['cobrador']) : '';

        $ranking[$cod] = [
            'nombre' => $nom,
            'conteo' => array_fill_keys($columnas, 0),
            'total'  => 0
        ];
    }

    // ✅ Acumular por fecha
    foreach ($fechas as $fechaDia) {
        foreach ($ranking as $codCobrador => &$info) {

            $total_clientes = (float) buscarMontoResumenCobro($local, $codCobrador, $fechaDia, "1");

            $datosMora = buscarDetalleResumenCobrador("1", $codCobrador, $fechaDia, $local);
            $t_puntaje_tramo = isset($datosMora[1]) ? (float)$datosMora[1] : 0;

            $datosVisitadoAgen = total_visitado_agendado($codCobrador, $fechaDia);
            $total_agendado = isset($datosVisitadoAgen[0]) ? (int)$datosVisitadoAgen[0] : 0;
            $total_visitado = isset($datosVisitadoAgen[1]) ? (int)$datosVisitadoAgen[1] : 0;

            $totalPuntajeCobrador =
                ($valorPuntoCobrado  * $total_clientes) +
                ($valorPuntoVisitado * $total_visitado) +
                ($valorPuntoAgendado * $total_agendado) +
                $t_puntaje_tramo;

            $calif = obtenerCalificacionPorPuntaje($totalPuntajeCobrador, $rangos);
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
    if($formato!="json"){
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



function buscarMontoResumenCobro($local,$cod_cobrador,$fecha,$control)
{
	$mysqli = conectar_al_servidor();
 
	$total_puntaje = 0;	
	$cantidad_clientes = 0;	
	
	$condicionFecha="";
	if($fecha!=""){
		$condicionFecha=" and DATE_FORMAT(hora, '%Y-%m-%d') = '$fecha'";
	}
  
 
	$condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }
	
	 $condicioncobradorasig = '';
	 if($control ==''){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobrador' ";
	 }
	 
	 if($control=='1'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobrador' and pg.cod_cobradorFK = '$cod_cobrador'";
	 }
	 
	 if($control=='2'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobrador' and pg.cod_cobradorFK != '$cod_cobrador'";
	 }

 
	$sql = "Select ifnull(sum(Monto),0) as TotalPagos,  COUNT(DISTINCT vt.cod_clienteFK) AS cantidad_clientes from  pago pg inner join venta vt on cod_venta=cod_venta_fk  where pg.idPago !='' ".$condicionlocal.$condicionFecha.$condicioncobradorasig;
	
	
	// echo($sql);
	// exit;
 
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
			$TotalPagos = $valor['TotalPagos'];
			$cantidad_clientes = $valor['cantidad_clientes'];
		}
	}
	
	return $cantidad_clientes;
}
function buscarDetalleResumenCobrador($control,$cod_cobradorFK,$fecha,$local)
{

$mysqli=conectar_al_servidor();

 $totalRegistro=0;
	 $pagina="";
	 
	 
	 $condicionFecha="";
	if($fecha!=""){
		$condicionFecha=" and DATE_FORMAT(hora, '%Y-%m-%d') = '$fecha'";
	}

	  $condicioncobradorasig = '';
	 if($control ==''){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobradorFK' ";
	 }
	 
	 if($control=='1'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobradorFK' and pg.cod_cobradorFK = '$cod_cobradorFK'";
	 }
	 
	 if($control=='2'){
		 $condicioncobradorasig=" and (( select cod_persona from persona inner join zona on cod_persona =cod_cobradorFK where idzona=(select idzonaFk from cliente where cod_cliente=cod_clienteFK)) )='$cod_cobradorFK' and pg.cod_cobradorFK != '$cod_cobradorFK'";
	 }
	 
	 $condicionlocal="";
	 if($local!=""){
	   $condicionlocal=" and (Select l.cod_local from local l  where l.cod_local= vt.cod_local limit 1)='".$local."'";		
	 }


	
			$sql= "SELECT  (SELECT CONCAT(nombre,' DE ',diadesde,' HASTA ',diahasta) 
     FROM mora_cliente 
     WHERE idmora_cliente = pg.cod_moracliente limit 1) AS mora,pg.cod_moracliente,
    SUM(pg.Monto) AS total_pagado,
	IFNULL((SELECT puntaje FROM mora_cliente WHERE idmora_cliente = pg.cod_moracliente limit 1),1) AS puntaje,
    COUNT(DISTINCT vt.cod_clienteFK) AS cantidad_clientes
FROM pago pg inner join venta vt ON pg.cod_venta_fk = vt.cod_venta
WHERE pg.Monto > 0 and pg.idPago !=''".$condicioncobradorasig.$condicionFecha.$condicionlocal." group by cod_moracliente";

 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

$totalCantidadCliente =0;
$totalpuntajeFinal = 0;
$datosArray = array();
if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$total_pagado=utf8_encode($valor['total_pagado']);
$mora=utf8_encode($valor['mora']);
$cantidad_clientes=utf8_encode($valor['cantidad_clientes']);
$puntaje=utf8_encode($valor['puntaje']);

$totalCantidadCliente += $cantidad_clientes;

$totalpuntajeFinal += $cantidad_clientes * $puntaje;


}
}


$datosArray[0] = $totalCantidadCliente;
$datosArray[1] = $totalpuntajeFinal;
   

return $datosArray;
}
function total_visitado_agendado($cod_cobradorFK,$fecha)
{

$mysqli=conectar_al_servidor();


	 $pagina="";

	
			$sql= "SELECT count(*) as agendado FROM visitascliente WHERE cod_cobradorFK = '$cod_cobradorFK' and date(fecha) ='$fecha';";


 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$agendado=utf8_encode($valor['agendado']);

}
}


$sql= "SELECT count(*) as visitado FROM visitascliente WHERE cod_cobradorFK = '$cod_cobradorFK' and date(fecha) = '$fecha' and visitado = '1'";

 
$stmt = $mysqli->prepare($sql);

if ( ! $stmt->execute()) {
echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}



$result = $stmt->get_result();
$valor= mysqli_num_rows($result);
$nroRegistro=$valor;
$styleName="tableRegistroSearch";

if ($valor>0)
{
while ($valor= mysqli_fetch_assoc($result))
{  

$visitado=utf8_encode($valor['visitado']);

}
}


$datos = array();
array_push($datos, $agendado);
array_push($datos, $visitado);
return $datos;
}

function obtener_puntajes_agendado_visitado()
{

$mysqli=conectar_al_servidor();


	 $pagina="";

	
	$sql= "SELECT * FROM cargar_calificacion_cobrador WHERE estado = 'Activo'";

 
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

function obtener_estado_observacion($cod_cobrador,$fecha)
{

$mysqli=conectar_al_servidor();

	
	$sql= "SELECT descripicion FROM observacion_calificacion_cobrador WHERE cod_cobrador='$cod_cobrador' and fecha = '$fecha'";

 
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

	
	$sql= "SELECT * FROM calificacion_cobrador WHERE estado = 'Activo'";

 
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

$cod_calificacion_cobrador=utf8_encode($valor['cod_calificacion_cobrador']);
$descripcion=utf8_encode($valor['descripcion']);
$rangoinicio=utf8_encode($valor['rangoinicio']);
$rangofin=utf8_encode($valor['rangofin']);
$puntaje=utf8_encode($valor['puntaje']);

array_push($arrayParcial, $descripcion);
array_push($arrayParcial, $rangoinicio);
array_push($arrayParcial, $rangofin);
array_push($arrayParcial, $cod_calificacion_cobrador);
array_push($arrayParcial, $puntaje);

array_push($arrayReturn,$arrayParcial);
$arrayParcial = array();
}
}



return $arrayReturn;

}

function abm_cal($puntos,$cod_cargar_calificacion_cobrador,$descripcion,$Estado,$funt)
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
				$consulta= "Select count(*) from cargar_calificacion_cobrador where descripcion=? and Estado ='Activo' ";
	
	
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
	
				$consulta="insert into cargar_calificacion_cobrador (puntos,descripcion,Estado) values ('$puntos','$descripcion','$Estado')";	      	$stmt = $mysqli->prepare($consulta);
		if ( ! $stmt->execute() ) {
		echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
		exit;
		}
	}
	
	
	if($funt=="editar_cal")
	{
        
    $consulta="Update cargar_calificacion_cobrador set descripcion='$descripcion',Estado='$Estado',puntos = '$puntos' where cod_cargar_calificacion_cobrador='$cod_cargar_calificacion_cobrador'";	

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
		$sql= "Select cod_cargar_calificacion_cobrador,descripcion,Estado,puntos
        from cargar_calificacion_cobrador where descripcion like ?  and Estado=? order by descripcion asc ";
		
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
		  
		  
		  
		      $cod_cargar_calificacion_cobrador=$valor['cod_cargar_calificacion_cobrador'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	  $puntos=utf8_encode($valor['puntos']);

			  $filas[] = array(
				  "cod_cargar_calificacion_cobrador" => (string)$cod_cargar_calificacion_cobrador,
				  "descripcion" => (string)$descripcion,
				  "estado" => (string)$Estado,
				  "puntos" => (string)$puntos
			  );
		  
			if($formato!="json"){
		  	 $styleName=CargarStyleTable($styleName);
			  $pagina.="
			  <table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
			  <tr id='tbSelecRegistro' onclick='ObtenerdatosAbmCargarCalificacionCobrador(this)'>
			  <td id='td_id' style='display:none;'>".$cod_cargar_calificacion_cobrador."</td>
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
		$sql= "Select cod_cargar_calificacion_cobrador,descripcion,Estado
        from cargar_calificacion_cobrador where Estado='Activo' order by descripcion asc ";
		   
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
		   
		  
		      $cod_cargar_calificacion_cobrador=$valor['cod_cargar_calificacion_cobrador'];
		  	  $descripcion=utf8_encode($valor['descripcion']);
		  	  $Estado=utf8_encode($valor['Estado']);
		  	 
			    $pagina.="<option value='$cod_cargar_calificacion_cobrador' >$descripcion</option>";
		  	 
			 
			    	 
		  	
			  
			  
	  }
 }
 
  mysqli_close($mysqli);
  $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;


}

function cargar_obs_calificacion_cobrador($id, $obs)
{
	
	if($id=="" || $obs ==""){
	$informacion =array("1" => "DI");
	echo json_encode($informacion);	
	exit;
	}

	$mysqli=conectar_al_servidor();
	
	
	$partes = explode("_", $id);
	$fecha = $partes[0];
	$cod_cobrador = $partes[1];
	
    
	$consulta="insert into observacion_calificacion_cobrador (descripicion,cod_cobrador,fecha) values ('$obs','$cod_cobrador','$fecha')";
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
