<?php

$operacion = isset($_POST['funt']) ? $_POST['funt'] : "";
$operacion = utf8_decode($operacion);

include('quitarseparadormiles.php');
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include("json_response.php");

function verificar($operacion)
{
	$user = isset($_POST['useru']) ? $_POST['useru'] : "";
	$user = utf8_decode($user);
	$pass = isset($_POST['passu']) ? $_POST['passu'] : "";
	$pass = str_replace("=", "+", $pass);
	$navegador = isset($_POST['navegador']) ? $_POST['navegador'] : "";
	$navegador = utf8_decode($navegador);
	$resp = verificar_navegador($user, $navegador, $pass);
	if ($resp != "ok") {
		$informacion = array("1" => "UI");
		gt_json_response($informacion);
		exit;
	}

	crear_tabla_gastos_fijos_empresa();

	if ($operacion == "nuevo" || $operacion == "editar") {
		$idgasto_fijo_empresa = isset($_POST['idgasto_fijo_empresa']) ? $_POST['idgasto_fijo_empresa'] : "";
		$idgasto_fijo_empresa = utf8_decode($idgasto_fijo_empresa);
		$descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : "";
		$descripcion = utf8_decode($descripcion);
		$categoria = isset($_POST['categoria']) ? $_POST['categoria'] : "";
		$categoria = utf8_decode($categoria);
		$monto = isset($_POST['monto']) ? $_POST['monto'] : "";
		$monto = quitarseparadormiles($monto);
		$frecuencia = isset($_POST['frecuencia']) ? $_POST['frecuencia'] : "";
		$frecuencia = utf8_decode($frecuencia);
		$dia_vencimiento = isset($_POST['dia_vencimiento']) ? $_POST['dia_vencimiento'] : "";
		$dia_vencimiento = utf8_decode($dia_vencimiento);
		$fecha_inicio = isset($_POST['fecha_inicio']) ? $_POST['fecha_inicio'] : "";
		$fecha_inicio = utf8_decode($fecha_inicio);
		$fecha_fin = isset($_POST['fecha_fin']) ? $_POST['fecha_fin'] : "";
		$fecha_fin = utf8_decode($fecha_fin);
		$estado = isset($_POST['estado']) ? $_POST['estado'] : "";
		$estado = utf8_decode($estado);
		$genera_cuenta_pagar = isset($_POST['genera_cuenta_pagar']) ? $_POST['genera_cuenta_pagar'] : "";
		$genera_cuenta_pagar = utf8_decode($genera_cuenta_pagar);
		$observacion = isset($_POST['observacion']) ? $_POST['observacion'] : "";
		$observacion = utf8_decode($observacion);

		abm($idgasto_fijo_empresa, $descripcion, $categoria, $monto, $frecuencia, $dia_vencimiento, $fecha_inicio, $fecha_fin, $estado, $genera_cuenta_pagar, $observacion, $user, $operacion);
	}

	if ($operacion == "buscar") {
		$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : "";
		$buscar = utf8_decode($buscar);
		$categoria = isset($_POST['categoria']) ? $_POST['categoria'] : "";
		$categoria = utf8_decode($categoria);
		$frecuencia = isset($_POST['frecuencia']) ? $_POST['frecuencia'] : "";
		$frecuencia = utf8_decode($frecuencia);
		$fecha1 = isset($_POST['fecha1']) ? $_POST['fecha1'] : "";
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = isset($_POST['fecha2']) ? $_POST['fecha2'] : "";
		$fecha2 = utf8_decode($fecha2);
		$estado = isset($_POST['estado']) ? $_POST['estado'] : "";
		$estado = utf8_decode($estado);
		$formato = isset($_POST['formato']) ? $_POST['formato'] : "";
		$formato = utf8_decode($formato);

		buscar($buscar, $categoria, $frecuencia, $fecha1, $fecha2, $estado, $formato);
	}
}

function crear_tabla_gastos_fijos_empresa()
{
	$mysqli = conectar_al_servidor();
	$sql = "CREATE TABLE IF NOT EXISTS gastos_fijos_empresa (
		idgasto_fijo_empresa INT NOT NULL AUTO_INCREMENT,
		descripcion VARCHAR(255) NOT NULL,
		categoria VARCHAR(80) NOT NULL,
		monto DECIMAL(18,2) NOT NULL DEFAULT 0,
		frecuencia VARCHAR(30) NOT NULL,
		dia_vencimiento INT NOT NULL DEFAULT 1,
		fecha_inicio DATE NOT NULL,
		fecha_fin DATE NULL,
		estado VARCHAR(20) NOT NULL DEFAULT 'Activo',
		genera_cuenta_pagar VARCHAR(2) NOT NULL DEFAULT 'NO',
		observacion TEXT NULL,
		user_insert VARCHAR(45) NULL,
		fecha_insert DATETIME NULL,
		user_edit VARCHAR(45) NULL,
		fecha_edit DATETIME NULL,
		PRIMARY KEY (idgasto_fijo_empresa)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1";

	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	$stmt->close();
	mysqli_close($mysqli);
}

function abm($idgasto_fijo_empresa, $descripcion, $categoria, $monto, $frecuencia, $dia_vencimiento, $fecha_inicio, $fecha_fin, $estado, $genera_cuenta_pagar, $observacion, $user, $operacion)
{
	if ($descripcion == "" || $categoria == "" || $monto == "" || $frecuencia == "" || $dia_vencimiento == "" || $fecha_inicio == "" || $estado == "" || $genera_cuenta_pagar == "") {
		$informacion = array("1" => "DI");
		gt_json_response($informacion);
		exit;
	}

	$dia_vencimiento = preg_replace('/\D/', '', $dia_vencimiento);
	if ($dia_vencimiento == "" || $dia_vencimiento < 1 || $dia_vencimiento > 31) {
		$informacion = array("1" => "DI");
		gt_json_response($informacion);
		exit;
	}

	$fecha_fin_sql = $fecha_fin == "" ? null : $fecha_fin;
	$fecha_hora = date("Y-m-d H:i:s");
	$mysqli = conectar_al_servidor();

	if ($operacion == "nuevo") {
		$consulta = "INSERT INTO gastos_fijos_empresa
		(descripcion,categoria,monto,frecuencia,dia_vencimiento,fecha_inicio,fecha_fin,estado,genera_cuenta_pagar,observacion,user_insert,fecha_insert)
		VALUES (upper(?),?,?,?,?,?,?,?,?,?,?,?)";
		$stmt = $mysqli->prepare($consulta);
		$ss = 'ssssssssssss';
		$stmt->bind_param($ss, $descripcion, $categoria, $monto, $frecuencia, $dia_vencimiento, $fecha_inicio, $fecha_fin_sql, $estado, $genera_cuenta_pagar, $observacion, $user, $fecha_hora);
	}

	if ($operacion == "editar") {
		$consulta = "UPDATE gastos_fijos_empresa SET descripcion=upper(?), categoria=?, monto=?, frecuencia=?, dia_vencimiento=?, fecha_inicio=?, fecha_fin=?, estado=?, genera_cuenta_pagar=?, observacion=?, user_edit=?, fecha_edit=? WHERE idgasto_fijo_empresa=?";
		$stmt = $mysqli->prepare($consulta);
		$ss = 'sssssssssssss';
		$stmt->bind_param($ss, $descripcion, $categoria, $monto, $frecuencia, $dia_vencimiento, $fecha_inicio, $fecha_fin_sql, $estado, $genera_cuenta_pagar, $observacion, $user, $fecha_hora, $idgasto_fijo_empresa);
	}

	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	$stmt->close();
	mysqli_close($mysqli);
	$informacion = array("1" => "exito");
	gt_json_response($informacion);
	exit;
}

function calcular_monto_mensual_gasto_fijo($monto, $frecuencia)
{
	if ($frecuencia == "Semanal") {
		return $monto * 4;
	}
	if ($frecuencia == "Quincenal") {
		return $monto * 2;
	}
	if ($frecuencia == "Anual") {
		return $monto / 12;
	}
	return $monto;
}

function buscar($buscar, $categoria, $frecuencia, $fecha1, $fecha2, $estado, $formato = "")
{
	$mysqli = conectar_al_servidor();
	$pagina = '';
	$filas = array();
	$condicion_fecha = "";
	$condicion_categoria = "";
	$condicion_frecuencia = "";
	$buscar1 = "%" . $buscar . "%";

	if ($fecha1 != "" && $fecha2 != "") {
		$condicion_fecha = " and fecha_inicio between ? and ?";
	}

	if ($categoria != "") {
		$condicion_categoria = " and categoria = ?";
	}

	if ($frecuencia != "") {
		$condicion_frecuencia = " and frecuencia = ?";
	}

	$sql = "SELECT idgasto_fijo_empresa,descripcion,categoria,monto,frecuencia,dia_vencimiento,fecha_inicio,IFNULL(fecha_fin,'') as fecha_fin,estado,genera_cuenta_pagar,observacion
	FROM gastos_fijos_empresa
	WHERE descripcion LIKE ? and estado=? " . $condicion_categoria . $condicion_frecuencia . $condicion_fecha . "
	ORDER BY dia_vencimiento ASC, descripcion ASC";

	$stmt = $mysqli->prepare($sql);

	if ($categoria != "" && $frecuencia != "" && $fecha1 != "" && $fecha2 != "") {
		$ss = 'ssssss';
		$stmt->bind_param($ss, $buscar1, $estado, $categoria, $frecuencia, $fecha1, $fecha2);
	} else if ($categoria != "" && $frecuencia != "") {
		$ss = 'ssss';
		$stmt->bind_param($ss, $buscar1, $estado, $categoria, $frecuencia);
	} else if ($categoria != "" && $fecha1 != "" && $fecha2 != "") {
		$ss = 'sssss';
		$stmt->bind_param($ss, $buscar1, $estado, $categoria, $fecha1, $fecha2);
	} else if ($frecuencia != "" && $fecha1 != "" && $fecha2 != "") {
		$ss = 'sssss';
		$stmt->bind_param($ss, $buscar1, $estado, $frecuencia, $fecha1, $fecha2);
	} else if ($categoria != "") {
		$ss = 'sss';
		$stmt->bind_param($ss, $buscar1, $estado, $categoria);
	} else if ($frecuencia != "") {
		$ss = 'sss';
		$stmt->bind_param($ss, $buscar1, $estado, $frecuencia);
	} else if ($fecha1 != "" && $fecha2 != "") {
		$ss = 'ssss';
		$stmt->bind_param($ss, $buscar1, $estado, $fecha1, $fecha2);
	} else {
		$ss = 'ss';
		$stmt->bind_param($ss, $buscar1, $estado);
	}

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$valor = mysqli_num_rows($result);
	$nroRegistro = $valor;
	$styleName = "tableRegistroSearch";
	$totalMonto = 0;
	$totalMensual = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$idgasto_fijo_empresa = $valor['idgasto_fijo_empresa'];
			$descripcion = utf8_encode($valor['descripcion']);
			$categoria = utf8_encode($valor['categoria']);
			$monto = $valor['monto'];
			$frecuencia = utf8_encode($valor['frecuencia']);
			$dia_vencimiento = utf8_encode($valor['dia_vencimiento']);
			$fecha_inicio = utf8_encode($valor['fecha_inicio']);
			$fecha_fin = utf8_encode($valor['fecha_fin']);
			$estado_registro = utf8_encode($valor['estado']);
			$genera_cuenta_pagar = utf8_encode($valor['genera_cuenta_pagar']);
			$observacion = utf8_encode($valor['observacion']);
			$montoMensual = calcular_monto_mensual_gasto_fijo($monto, $frecuencia);
			$monto_formateado = number_format($monto, '0', ',', '.');

			$totalMonto = $totalMonto + $monto;
			$totalMensual = $totalMensual + $montoMensual;

			$descripcion_html = htmlspecialchars($descripcion, ENT_QUOTES, 'UTF-8');
			$categoria_html = htmlspecialchars($categoria, ENT_QUOTES, 'UTF-8');
			$observacion_html = htmlspecialchars($observacion, ENT_QUOTES, 'UTF-8');

			$filas[] = array(
				"idgasto_fijo_empresa" => $idgasto_fijo_empresa,
				"categoria" => $categoria,
				"descripcion" => $descripcion,
				"monto" => (float) $monto,
				"monto_formateado" => $monto_formateado,
				"frecuencia" => $frecuencia,
				"dia_vencimiento" => $dia_vencimiento,
				"fecha_inicio" => $fecha_inicio,
				"observacion" => $observacion,
				"fecha_fin" => $fecha_fin,
				"estado" => $estado_registro,
				"genera_cuenta_pagar" => $genera_cuenta_pagar,
				"monto_mensual" => (float) $montoMensual
			);

			if ($formato != "json") {
				$styleName = CargarStyleTable($styleName);
				$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmGastosFijosEmpresa(this)' >
<td id='td_id' style='display:none'>" . $idgasto_fijo_empresa . "</td>
<td id='td_datos_1' style='width:18%'>" . $categoria_html . "</td>
<td id='td_datos_2' style='width:25%'>" . $descripcion_html . "</td>
<td id='td_datos_3' style='width:12%;text-align:right'>" . $monto_formateado . "</td>
<td id='td_datos_4' style='width:12%;text-align:center'>" . $frecuencia . "</td>
<td id='td_datos_5' style='width:10%;text-align:center'>" . $dia_vencimiento . "</td>
<td id='td_datos_6' style='width:12%;text-align:center'>" . $fecha_inicio . "</td>
<td id='td_datos_7' style='width:11%'>" . $observacion_html . "</td>
<td id='td_datos_8' style='display:none'>" . $fecha_fin . "</td>
<td id='td_datos_9' style='display:none'>" . $estado_registro . "</td>
<td id='td_datos_10' style='display:none'>" . $genera_cuenta_pagar . "</td>
</tr>
</table>";
			}
		}
	}

	$stmt->close();
	mysqli_close($mysqli);
	$informacion = array(
		"1" => "exito",
		"2" => $formato == "json" ? $filas : $pagina,
		"3" => $nroRegistro,
		"4" => number_format($totalMonto, '0', ',', '.'),
		"5" => number_format($totalMensual, '0', ',', '.')
	);
	gt_json_response($informacion);
	exit;
}

verificar($operacion);
?>
