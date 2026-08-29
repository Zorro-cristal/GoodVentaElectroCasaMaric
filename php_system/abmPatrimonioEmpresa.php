<?php

$operacion = $_POST['funt'];
$operacion = utf8_decode($operacion);
if ($operacion == "balance") {
	// El balance puede devolver muchos detalles; el conversor a nodos duplica mucho la memoria.
	unset($_POST['formato_salida'], $_POST['formato_nodos_campos'], $_POST['formato']);
}

include('quitarseparadormiles.php');
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");
include("classTable.php");
include("json_response.php");

function verificar($operacion)
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
		gt_json_response($informacion);
		exit;
	}

	crear_tabla_patrimonio_empresa();

	if ($operacion == "nuevo" || $operacion == "editar") {
		$idpatrimonio_empresa = $_POST['idpatrimonio_empresa'];
		$idpatrimonio_empresa = utf8_decode($idpatrimonio_empresa);
		$descripcion = $_POST['descripcion'];
		$descripcion = utf8_decode($descripcion);
		$tipo = $_POST['tipo'];
		$tipo = utf8_decode($tipo);
		$valor = $_POST['valor'];
		$valor = quitarseparadormiles($valor);
		$fecha = $_POST['fecha'];
		$fecha = utf8_decode($fecha);
		$estado = $_POST['estado'];
		$estado = utf8_decode($estado);
		$observacion = $_POST['observacion'];
		$observacion = utf8_decode($observacion);

		abm($idpatrimonio_empresa, $descripcion, $tipo, $valor, $fecha, $estado, $observacion, $operacion);
	}

	if ($operacion == "buscar") {
		$buscar = $_POST['buscar'];
		$buscar = utf8_decode($buscar);
		$tipo = $_POST['tipo'];
		$tipo = utf8_decode($tipo);
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$estado = $_POST['estado'];
		$estado = utf8_decode($estado);
		$formato = isset($_POST['formato']) ? $_POST['formato'] : "";
		$formato = utf8_decode($formato);

		buscar($buscar, $tipo, $fecha1, $fecha2, $estado, $formato);
	}

	if ($operacion == "balance") {
		$fecha1 = $_POST['fecha1'];
		$fecha1 = utf8_decode($fecha1);
		$fecha2 = $_POST['fecha2'];
		$fecha2 = utf8_decode($fecha2);
		$fecha_corte = isset($_POST['fecha_corte']) ? $_POST['fecha_corte'] : $fecha2;
		$fecha_corte = utf8_decode($fecha_corte);
		$estado = $_POST['estado'];
		$estado = utf8_decode($estado);

		balance_general_empresa($fecha_corte, $estado);
	}
}

function crear_tabla_patrimonio_empresa()
{
	$mysqli = conectar_al_servidor();
	$sql = "CREATE TABLE IF NOT EXISTS patrimonio_empresa (
		idpatrimonio_empresa INT NOT NULL AUTO_INCREMENT,
		descripcion VARCHAR(255) NOT NULL,
		tipo VARCHAR(20) NOT NULL DEFAULT 'Activo',
		valor DECIMAL(18,2) NOT NULL DEFAULT 0,
		fecha DATE NOT NULL,
		estado VARCHAR(20) NOT NULL DEFAULT 'Activo',
		observacion TEXT NULL,
		PRIMARY KEY (idpatrimonio_empresa)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1";

	$stmt = $mysqli->prepare($sql);
	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}
	mysqli_close($mysqli);
}

function abm($idpatrimonio_empresa, $descripcion, $tipo, $valor, $fecha, $estado, $observacion, $operacion)
{
	if ($descripcion == "" || $tipo == "" || $valor == "" || $fecha == "" || $estado == "") {
		$informacion = array("1" => "DI");
		gt_json_response($informacion);
		exit;
	}

	$mysqli = conectar_al_servidor();

	if ($operacion == "nuevo") {
		$consulta = "INSERT INTO patrimonio_empresa (descripcion,tipo,valor,fecha,estado,observacion)
		VALUES (upper(?),?,?,?,?,?)";
		$stmt = $mysqli->prepare($consulta);
		$ss = 'ssssss';
		$stmt->bind_param($ss, $descripcion, $tipo, $valor, $fecha, $estado, $observacion);
	}

	if ($operacion == "editar") {
		$consulta = "UPDATE patrimonio_empresa SET descripcion=upper(?), tipo=?, valor=?, fecha=?, estado=?, observacion=? WHERE idpatrimonio_empresa=?";
		$stmt = $mysqli->prepare($consulta);
		$ss = 'sssssss';
		$stmt->bind_param($ss, $descripcion, $tipo, $valor, $fecha, $estado, $observacion, $idpatrimonio_empresa);
	}

	if (!$stmt->execute()) {
		echo trigger_error('The query execution failed; MySQL said (' . $stmt->errno . ') ' . $stmt->error, E_USER_ERROR);
		exit;
	}

	mysqli_close($mysqli);
	$informacion = array("1" => "exito");
	gt_json_response($informacion);
	exit;
}

function buscar($buscar, $tipo, $fecha1, $fecha2, $estado, $formato = "")
{
	$mysqli = conectar_al_servidor();
	$pagina = '';
	$filas = array();
	$condicion_fecha = "";
	$condicion_tipo = "";
	$buscar1 = "%" . $buscar . "%";

	if ($fecha1 != "" && $fecha2 != "") {
		$condicion_fecha = " and fecha between ? and ?";
	}

	if ($tipo != "") {
		$condicion_tipo = " and tipo = ?";
	}

	$sql = "SELECT idpatrimonio_empresa,descripcion,tipo,valor,fecha,estado,observacion
	FROM patrimonio_empresa
	WHERE descripcion LIKE ? and estado=? " . $condicion_tipo . $condicion_fecha . "
	ORDER BY fecha DESC, descripcion ASC";

	$stmt = $mysqli->prepare($sql);

	if ($tipo != "" && $fecha1 != "" && $fecha2 != "") {
		$ss = 'sssss';
		$stmt->bind_param($ss, $buscar1, $estado, $tipo, $fecha1, $fecha2);
	} else if ($tipo != "") {
		$ss = 'sss';
		$stmt->bind_param($ss, $buscar1, $estado, $tipo);
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
	$totalActivo = 0;
	$totalPasivo = 0;

	if ($valor > 0) {
		while ($valor = mysqli_fetch_assoc($result)) {
			$idpatrimonio_empresa = $valor['idpatrimonio_empresa'];
			$descripcion = utf8_encode($valor['descripcion']);
			$tipo = utf8_encode($valor['tipo']);
			$monto = $valor['valor'];
			$fecha = utf8_encode($valor['fecha']);
			$estado = utf8_encode($valor['estado']);
			$observacion = utf8_encode($valor['observacion']);
			$monto_formateado = number_format($monto, '0', ',', '.');

			if ($tipo == "Pasivo") {
				$totalPasivo = $totalPasivo + $monto;
			} else {
				$totalActivo = $totalActivo + $monto;
			}

			$descripcion_html = htmlspecialchars($descripcion, ENT_QUOTES, 'UTF-8');
			$observacion_html = htmlspecialchars($observacion, ENT_QUOTES, 'UTF-8');

			$filas[] = array(
				"idpatrimonio_empresa" => $idpatrimonio_empresa,
				"tipo" => $tipo,
				"descripcion" => $descripcion,
				"fecha" => $fecha,
				"valor" => (float) $monto,
				"valor_formateado" => $monto_formateado,
				"observacion" => $observacion,
				"estado" => $estado
			);

			if ($formato != "json") {
				$styleName = CargarStyleTable($styleName);
				$pagina .= "
<table class='$styleName' border='1' cellspacing='1' cellpadding='5'>
<tr id='tbSelecRegistro' onclick='obtenerdatosabmPatrimonioEmpresa(this)' >
<td id='td_id' style='display:none'>" . $idpatrimonio_empresa . "</td>
<td id='td_datos_1' style='width:18%'>" . $tipo . "</td>
<td id='td_datos_2' style='width:32%'>" . $descripcion_html . "</td>
<td id='td_datos_3' style='width:15%'>" . $fecha . "</td>
<td id='td_datos_4' style='width:15%'>" . $monto_formateado . "</td>
<td id='td_datos_5' style='width:20%'>" . $observacion_html . "</td>
<td id='td_datos_6' style='display:none'>" . $estado . "</td>
</tr>
</table>";
			}
		}
	}

	$totalPatrimonio = $totalActivo - $totalPasivo;

	mysqli_close($mysqli);
	$informacion = array(
		"1" => "exito",
		"2" => $formato == "json" ? $filas : $pagina,
		"3" => $nroRegistro,
		"4" => number_format($totalActivo, '0', ',', '.'),
		"5" => number_format($totalPasivo, '0', ',', '.'),
		"6" => number_format($totalPatrimonio, '0', ',', '.')
	);
	gt_json_response($informacion);
	exit;
}

function crear_fila_balance_general($descripcion, $fecha, $monto, $observacion)
{
	$descripcion_html = htmlspecialchars($descripcion, ENT_QUOTES, 'UTF-8');
	$observacion_html = htmlspecialchars($observacion, ENT_QUOTES, 'UTF-8');

	return "
<tr>
<td style='width:38%'>" . $descripcion_html . "</td>
<td style='width:17%;text-align:center'>" . $fecha . "</td>
<td style='width:18%;text-align:right'>" . number_format($monto, 0, ',', '.') . "</td>
<td style='width:27%'>" . $observacion_html . "</td>
</tr>";
}

function crear_fila_resumen_balance_general($id_detalle, $descripcion, $registros, $monto, $observacion)
{
	$id_html = htmlspecialchars($id_detalle, ENT_QUOTES, 'UTF-8');
	$descripcion_html = htmlspecialchars($descripcion, ENT_QUOTES, 'UTF-8');
	$observacion_html = htmlspecialchars($observacion, ENT_QUOTES, 'UTF-8');

	return "
<tr class='balance-general-grupo' data-detalle-id='" . $id_html . "' tabindex='0' onclick=\"abrirDetalleGrupoBalanceGeneral('" . $id_html . "', this)\" onkeydown=\"abrirDetalleGrupoBalanceGeneralConTecla(event, '" . $id_html . "', this)\">
<td style='width:42%'><strong>" . $descripcion_html . "</strong><span>" . $observacion_html . "</span></td>
<td style='width:18%;text-align:center'>" . number_format($registros, 0, ',', '.') . "</td>
<td style='width:22%;text-align:right'>" . number_format($monto, 0, ',', '.') . "</td>
<td style='width:18%;text-align:center'><button type='button' class='balance-general-ver-detalle' onclick=\"abrirDetalleGrupoBalanceGeneral('" . $id_html . "', this.closest('tr')); if(event){event.stopPropagation();} return false;\">Ver detalle</button></td>
</tr>";
}

function crear_detalle_oculto_balance_general($id_detalle, $titulo, $detalle)
{
	$id_html = htmlspecialchars($id_detalle, ENT_QUOTES, 'UTF-8');
	$titulo_html = htmlspecialchars($titulo, ENT_QUOTES, 'UTF-8');
	if ($detalle == "") {
		$detalle = "<tr><td colspan='4' style='text-align:center'>Sin registros</td></tr>";
	}

	return "
<div id='" . $id_html . "' class='balance-general-detalle-oculto'>
	<h3>" . $titulo_html . "</h3>
	<table class='balance-general-tabla'>
		<thead>
			<tr>
				<th>Descripcion</th>
				<th>Fecha</th>
				<th>Valor</th>
				<th>Observacion</th>
			</tr>
		</thead>
		<tbody>" . $detalle . "</tbody>
	</table>
</div>";
}

function crear_grupo_balance_general($id_detalle, $titulo, $registros, $total, $detalle, $observacion, $mostrar_cero = false)
{
	if (!$mostrar_cero && $registros <= 0 && $total == 0) {
		return array("resumen" => "", "detalle" => "");
	}

	return array(
		"resumen" => crear_fila_resumen_balance_general($id_detalle, $titulo, $registros, $total, $observacion),
		"detalle" => crear_detalle_oculto_balance_general($id_detalle, $titulo, $detalle)
	);
}

function obtener_cheques_emitidos_balance($mysqli, $fecha_corte, $estado)
{
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);

	$sql = "SELECT idcheque,fecven,nroche,orden,concep,importe,tipo,
	(SELECT nombre FROM banco b WHERE b.idbanco=ch.cod_bancoFK LIMIT 1) as banco
	FROM cheque ch
	WHERE pagado=0
	and (?='' or estado=?)
	and UPPER(IFNULL(tipo,'')) NOT LIKE 'DEUDA%'
	ORDER BY fecven ASC, nroche ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'ss';
	$stmt->bind_param($ss, $estado, $estado);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$monto = $valor['importe'];
		$nroche = utf8_encode($valor['nroche']);
		$orden = utf8_encode($valor['orden']);
		$concep = utf8_encode($valor['concep']);
		$tipo = utf8_encode($valor['tipo']);
		$banco = utf8_encode($valor['banco']);
		$fecha = utf8_encode($valor['fecven']);
		$descripcion = "CHEQUE EMITIDO NRO " . $nroche . " - " . $orden;
		$observacion = "Banco: " . $banco . " | Concepto: " . $concep . " | Tipo: " . $tipo;

		$datos["total"] = $datos["total"] + $monto;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
	}

	return $datos;
}

function obtener_deudas_cheque_balance($mysqli, $fecha_corte, $estado)
{
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);

	$sql = "SELECT idcheque,fecven,nroche,orden,concep,importe,tipo,
	(SELECT nombre FROM banco b WHERE b.idbanco=ch.cod_bancoFK LIMIT 1) as banco
	FROM cheque ch
	WHERE pagado=0
	and (?='' or estado=?)
	and UPPER(IFNULL(tipo,'')) LIKE 'DEUDA%'
	ORDER BY fecven ASC, nroche ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'ss';
	$stmt->bind_param($ss, $estado, $estado);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$monto = $valor['importe'];
		$nroche = utf8_encode($valor['nroche']);
		$orden = utf8_encode($valor['orden']);
		$concep = utf8_encode($valor['concep']);
		$tipo = utf8_encode($valor['tipo']);
		$banco = utf8_encode($valor['banco']);
		$fecha = utf8_encode($valor['fecven']);
		$descripcion = "DEUDA NRO " . $nroche . " - " . $orden;
		$observacion = "Banco: " . $banco . " | Concepto: " . $concep . " | Tipo: " . $tipo;

		$datos["total"] = $datos["total"] + $monto;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
	}

	return $datos;
}

function obtener_cheques_a_cobrar_balance($mysqli, $fecha_corte, $estado)
{
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);

	$sql = "SELECT idchequeacobrar,fecven,nroche,orden,concep,importe,tipo,
	IFNULL(NULLIF(nombre_banco,''),(SELECT nombre FROM banco b WHERE b.idbanco=ch.cod_bancoFK LIMIT 1)) as banco
	FROM chequeacobrar ch
	WHERE pagado=0
	and (?='' or estado=?)
	and fecven <= ?
	ORDER BY fecven ASC, nroche ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'sss';
	$stmt->bind_param($ss, $estado, $estado, $fecha_corte);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$monto = $valor['importe'];
		$nroche = utf8_encode($valor['nroche']);
		$orden = utf8_encode($valor['orden']);
		$concep = utf8_encode($valor['concep']);
		$tipo = utf8_encode($valor['tipo']);
		$banco = utf8_encode($valor['banco']);
		$fecha = utf8_encode($valor['fecven']);
		$descripcion = "CHEQUE A COBRAR NRO " . $nroche . " - " . $orden;
		$observacion = "Banco: " . $banco . " | Concepto: " . $concep . " | Tipo: " . $tipo;

		$datos["total"] = $datos["total"] + $monto;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
	}

	return $datos;
}

function obtener_stock_valorizado_balance($mysqli, $fecha_corte)
{
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);
	$fecha_hasta = $fecha_corte . " 23:59:59";

	$sql = "SELECT pr.cod_producto,pr.nombre_producto,pr.precio_compra,
	stk.cod_localfk,
	(SELECT Nombre FROM local WHERE cod_local = stk.cod_localfk LIMIT 1) as nombre_local,
	SUM(IFNULL(sp.entero, 0)) AS stock_producto
	FROM producto pr
	INNER JOIN stocklocales stk ON stk.cod_productofk = pr.cod_producto
	LEFT JOIN stock_producto sp ON sp.cod_stocklocalesFK = stk.idstocklocales AND sp.fecha_hora <= ?
	WHERE pr.estado = 'Activo'
	AND (SELECT estado FROM local WHERE cod_local = stk.cod_localfk LIMIT 1) = 'Activo'
	GROUP BY stk.idstocklocales,pr.cod_producto,pr.nombre_producto,pr.precio_compra,stk.cod_localfk
	HAVING stock_producto <> 0
	ORDER BY nombre_local ASC, pr.nombre_producto ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 's';
	$stmt->bind_param($ss, $fecha_hasta);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$cod_producto = utf8_encode($valor['cod_producto']);
		$nombre_producto = utf8_encode($valor['nombre_producto']);
		$nombre_local = utf8_encode($valor['nombre_local']);
		$precio_compra = $valor['precio_compra'];
		$stock_producto = $valor['stock_producto'];
		$subtotal = $precio_compra * $stock_producto;
		$descripcion = "STOCK " . $cod_producto . " - " . $nombre_producto;
		$observacion = "Local: " . $nombre_local . " | Cantidad: " . number_format($stock_producto, 2, ',', '.') . " | Costo: " . number_format($precio_compra, 0, ',', '.');

		$datos["total"] = $datos["total"] + $subtotal;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha_corte, $subtotal, $observacion);
	}
	$stmt->close();

	return $datos;
}

function obtener_creditos_sin_pago_balance($mysqli, $fecha_corte)
{
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);

	$sql = "SELECT cr.idcredito,cr.plazo,cr.fechapago,cr.cod_venta,
	IFNULL(cr.Monto,0) as monto_credito,
	IFNULL(cr.descuento,0) as descuento,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0) as total_pagado_cuota,
	(IFNULL(cr.Monto,0)-IFNULL(cr.descuento,0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0) as saldo_pendiente,
	DATEDIFF(?,cr.fechapago) as dias_atraso,
	vt.num_factura,vt.puntoexpedicion,vt.tipo_comprobante,
	IFNULL((Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK),'') as cliente,
	IFNULL((Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK),'') as documento,
	IFNULL((Select Nombre from local l where l.cod_local=vt.cod_local),'') as nombre_local,
	IFNULL((Select nombre from vendedor v where v.idvendedor=vt.Vendedor1),'') as vendedor
	FROM credito cr
	INNER JOIN venta vt ON vt.cod_venta=cr.cod_venta
	WHERE cr.fechapago <= ?
	AND cr.fechapago >= DATE_SUB(?, INTERVAL 1 YEAR)
	AND ((IFNULL(cr.Monto,0)-IFNULL(cr.descuento,0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)) > 0
	AND (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0
	AND IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0
	ORDER BY cr.fechapago ASC, cr.cod_venta ASC, cr.idcredito ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'sss';
	$stmt->bind_param($ss, $fecha_corte, $fecha_corte, $fecha_corte);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$cod_venta = utf8_encode($valor['cod_venta']);
		$idcredito = utf8_encode($valor['idcredito']);
		$plazo = utf8_encode($valor['plazo']);
		$fecha = utf8_encode($valor['fechapago']);
		$cliente = utf8_encode($valor['cliente']);
		$documento = utf8_encode($valor['documento']);
		$local = utf8_encode($valor['nombre_local']);
		$vendedor = utf8_encode($valor['vendedor']);
		$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
		$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
		$num_factura = utf8_encode($valor['num_factura']);
		$dias_atraso = $valor['dias_atraso'];
		$monto_credito = $valor['monto_credito'];
		$descuento = $valor['descuento'];
		$total_pagado_cuota = $valor['total_pagado_cuota'];
		$saldo_pendiente = $valor['saldo_pendiente'];
		$nro_factura = $num_factura;

		if ($puntoexpedicion != "") {
			$nro_factura = $puntoexpedicion . "-" . $num_factura;
		}

		$descripcion = "CREDITO PENDIENTE VTA " . $cod_venta . " - CUOTA " . $plazo;
		$observacion = "Credito: " . $idcredito . " | Cliente: " . $cliente . " | Doc: " . $documento . " | Factura: " . $tipo_comprobante . " " . $nro_factura . " | Local: " . $local . " | Vendedor: " . $vendedor . " | Atraso: " . $dias_atraso . " dias | Monto: " . number_format($monto_credito, 0, ',', '.') . " | Descuento: " . number_format($descuento, 0, ',', '.') . " | Pagado: " . number_format($total_pagado_cuota, 0, ',', '.');

		$datos["total"] = $datos["total"] + $saldo_pendiente;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $saldo_pendiente, $observacion);
	}
	$stmt->close();

	return $datos;
}

function obtener_creditos_por_vencer_sin_pago_balance($mysqli, $fecha_corte)
{
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);

	$sql = "SELECT cr.idcredito,cr.plazo,cr.fechapago,cr.cod_venta,
	IFNULL(cr.Monto,0) as monto_credito,
	IFNULL(cr.descuento,0) as descuento,
	IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0) as total_pagado_cuota,
	(IFNULL(cr.Monto,0)-IFNULL(cr.descuento,0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0) as saldo_pendiente,
	DATEDIFF(cr.fechapago,?) as dias_para_vencer,
	vt.num_factura,vt.puntoexpedicion,vt.tipo_comprobante,
	IFNULL((Select concat(nombre_persona,' ',apellido_persona) from persona where cod_persona=vt.cod_clienteFK),'') as cliente,
	IFNULL((Select ci_cliente from cliente where cod_cliente=vt.cod_clienteFK),'') as documento,
	IFNULL((Select Nombre from local l where l.cod_local=vt.cod_local),'') as nombre_local,
	IFNULL((Select nombre from vendedor v where v.idvendedor=vt.Vendedor1),'') as vendedor
	FROM credito cr
	INNER JOIN venta vt ON vt.cod_venta=cr.cod_venta
	WHERE cr.fechapago > ?
	AND ((IFNULL(cr.Monto,0)-IFNULL(cr.descuento,0))-IFNULL((select sum(pg.Monto) from pago pg where pg.cod_creditoFK=cr.idcredito and pg.tipo='Pago Cuota'),0)) > 0
	AND (select count(dtv.estado) from detalle_venta dtv where vt.cod_venta=dtv.cod_ventaFK and dtv.estado='Garantia')=0
	AND IFNULL((Select count(fecha) from cancelaciones where cod_venta=vt.cod_venta limit 1),0)=0
	ORDER BY cr.fechapago ASC, cr.cod_venta ASC, cr.idcredito ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'ss';
	$stmt->bind_param($ss, $fecha_corte, $fecha_corte);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$cod_venta = utf8_encode($valor['cod_venta']);
		$idcredito = utf8_encode($valor['idcredito']);
		$plazo = utf8_encode($valor['plazo']);
		$fecha = utf8_encode($valor['fechapago']);
		$cliente = utf8_encode($valor['cliente']);
		$documento = utf8_encode($valor['documento']);
		$local = utf8_encode($valor['nombre_local']);
		$vendedor = utf8_encode($valor['vendedor']);
		$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
		$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
		$num_factura = utf8_encode($valor['num_factura']);
		$dias_para_vencer = $valor['dias_para_vencer'];
		$monto_credito = $valor['monto_credito'];
		$descuento = $valor['descuento'];
		$total_pagado_cuota = $valor['total_pagado_cuota'];
		$saldo_pendiente = $valor['saldo_pendiente'];
		$nro_factura = $num_factura;

		if ($puntoexpedicion != "") {
			$nro_factura = $puntoexpedicion . "-" . $num_factura;
		}

		$descripcion = "CREDITO POR VENCER VTA " . $cod_venta . " - CUOTA " . $plazo;
		$observacion = "Credito: " . $idcredito . " | Cliente: " . $cliente . " | Doc: " . $documento . " | Factura: " . $tipo_comprobante . " " . $nro_factura . " | Local: " . $local . " | Vendedor: " . $vendedor . " | Vence en: " . $dias_para_vencer . " dias | Monto: " . number_format($monto_credito, 0, ',', '.') . " | Descuento: " . number_format($descuento, 0, ',', '.') . " | Pagado: " . number_format($total_pagado_cuota, 0, ',', '.');

		$datos["total"] = $datos["total"] + $saldo_pendiente;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $saldo_pendiente, $observacion);
	}
	$stmt->close();

	return $datos;
}

function obtener_pagos_salarios_balance($mysqli, $fecha_corte)
{
	$fecha_inicio = "2026-07-01";
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);

	$sql = "SELECT idsueldo,IFNULL(sueldo,0) as sueldo,fecha,codpersona,estado,tipo,tipouser,IFNULL(estado_registro,'') as estado_registro,desde,
	IF(desde='',IF(tipouser='1',(Select nombre_persona from persona where codpersona=cod_persona),(Select nombre from vendedor where codpersona=idvendedor)),(Select concat(nombre,' ',apellido) from funcionarios where codpersona=idfuncionarios)) as funcionario,
	IF(desde='',(Select sector from vendedor where codpersona=idvendedor),((Select (select nombre from cargos where idcargos=cod_cargosFK) from funcionarios where codpersona=idfuncionarios))) as cargo,
	IF(desde='','',(Select Nombre from local where cod_local=(Select cod_localFK from funcionarios where codpersona=idfuncionarios))) as nombre_local
	FROM sueldo
	WHERE estado='Activo'
	AND IFNULL(estado_registro,'PAGADO') <> 'PENDIENTE'
	AND fecha >= ?
	AND fecha <= ?
	ORDER BY fecha DESC, idsueldo DESC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'ss';
	$stmt->bind_param($ss, $fecha_inicio, $fecha_corte);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$idsueldo = utf8_encode($valor['idsueldo']);
		$funcionario = utf8_encode($valor['funcionario']);
		$cargo = utf8_encode($valor['cargo']);
		$local = utf8_encode($valor['nombre_local']);
		$tipo = utf8_encode($valor['tipo']);
		$estado_registro = utf8_encode($valor['estado_registro']);
		$desde = utf8_encode($valor['desde']);
		$fecha = utf8_encode($valor['fecha']);
		$monto = $valor['sueldo'];
		$origen = "Funcionario";

		if ($desde == "") {
			$origen = "Usuario/Vendedor";
		}
		if ($estado_registro == "") {
			$estado_registro = "PAGADO";
		}

		$descripcion = "PAGO SALARIO " . $idsueldo . " - " . $funcionario;
		$observacion = "Tipo: " . $tipo . " | Cargo/Sector: " . $cargo . " | Local: " . $local . " | Origen: " . $origen . " | Estado: " . $estado_registro;

		$datos["total"] = $datos["total"] + $monto;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
	}
	$stmt->close();

	return $datos;
}

function obtener_movimientos_gastos_depositos_balance($mysqli, $fecha_corte, $estado)
{
	$fecha_inicio = "2026-07-01";
	$datos = array(
		"depositos_ingresos" => array("total" => 0, "detalle" => "", "registros" => 0),
		"egresos" => array("total" => 0, "detalle" => "", "registros" => 0)
	);

	$sql = "SELECT g.idgastos,g.tipo,IFNULL(g.monto,0) as monto,IFNULL(g.motivo,'') as motivo,g.fecha,
	IFNULL(g.fechaDeposito,'') as fechaDeposito,IFNULL(g.arreglo,'') as arreglo,IFNULL(g.banco,'') as banco,
	IFNULL(g.nrocuenta,'') as nrocuenta,IFNULL(g.nroboleta,'') as nroboleta,IFNULL(g.confirmado,'') as confirmado,
	IFNULL((SELECT Nombre FROM local l WHERE l.cod_local=g.cod_local LIMIT 1),'') as nombrelocal,
	IFNULL((SELECT nombre_persona FROM persona WHERE cod_persona=g.cod_usuario LIMIT 1),'') as usuarionombre,
	IFNULL((SELECT descripcion FROM motivo_e_i WHERE idmotivo_e_i=g.cod_motivo LIMIT 1),'') as descripcion_motivo
	FROM gastos g
	WHERE (?='' or g.estado=?)
	AND g.tipo IN ('Deposito','Ingreso','Egreso')
	AND g.fecha >= ?
	AND g.fecha <= ?
	ORDER BY g.fecha ASC, g.idgastos ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'ssss';
	$stmt->bind_param($ss, $estado, $estado, $fecha_inicio, $fecha_corte);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$idgastos = utf8_encode($valor['idgastos']);
		$tipo = utf8_encode($valor['tipo']);
		$monto = $valor['monto'];
		$fecha = utf8_encode($valor['fecha']);
		$fechaDeposito = utf8_encode($valor['fechaDeposito']);
		$arreglo = utf8_encode($valor['arreglo']);
		$banco = utf8_encode($valor['banco']);
		$nrocuenta = utf8_encode($valor['nrocuenta']);
		$nroboleta = utf8_encode($valor['nroboleta']);
		$confirmado = utf8_encode($valor['confirmado']);
		$local = utf8_encode($valor['nombrelocal']);
		$usuario = utf8_encode($valor['usuarionombre']);
		$motivo = utf8_encode($valor['motivo']);
		$descripcion_motivo = utf8_encode($valor['descripcion_motivo']);
		$motivo_detalle = $descripcion_motivo != "" ? $descripcion_motivo : $motivo;
		$observaciones = array();

		if ($motivo_detalle != "") {
			$observaciones[] = "Motivo: " . $motivo_detalle;
		}
		if ($arreglo != "") {
			$observaciones[] = "Arreglo: " . $arreglo;
		}
		if ($local != "") {
			$observaciones[] = "Local: " . $local;
		}
		if ($usuario != "") {
			$observaciones[] = "Usuario: " . $usuario;
		}
		if ($banco != "") {
			$observaciones[] = "Banco: " . $banco;
		}
		if ($nrocuenta != "") {
			$observaciones[] = "Cuenta: " . $nrocuenta;
		}
		if ($nroboleta != "") {
			$observaciones[] = "Boleta: " . $nroboleta;
		}
		if ($fechaDeposito != "" && $fechaDeposito != "0000-00-00") {
			$observaciones[] = "Fecha deposito: " . $fechaDeposito;
		}
		if ($confirmado != "") {
			$observaciones[] = "Confirmado: " . $confirmado;
		}

		$observacion = implode(" | ", $observaciones);
		$descripcion = "MOVIMIENTO " . strtoupper($tipo) . " NRO " . $idgastos;
		if ($motivo_detalle != "") {
			$descripcion .= " - " . $motivo_detalle;
		}

		if ($tipo == "Egreso") {
			$datos["egresos"]["total"] = $datos["egresos"]["total"] + $monto;
			$datos["egresos"]["registros"] = $datos["egresos"]["registros"] + 1;
			$datos["egresos"]["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
		} else {
			$datos["depositos_ingresos"]["total"] = $datos["depositos_ingresos"]["total"] + $monto;
			$datos["depositos_ingresos"]["registros"] = $datos["depositos_ingresos"]["registros"] + 1;
			$datos["depositos_ingresos"]["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
		}
	}
	$stmt->close();

	return $datos;
}

function obtener_pagos_por_metodo_balance($mysqli, $fecha_corte)
{
	$fecha_inicio = "2026-07-01";
	$datos = array("total" => 0, "registros" => 0, "metodos" => array());

	$sql = "SELECT pg.idPago,pg.Fecha,IFNULL(pg.Monto,0) as Monto,pg.Tipo,pg.cod_venta_fk,pg.nrofactura,
	IFNULL(pg.descripcion,'') as descripcion,IFNULL(pg.tipopago,'') as tipopago,pg.cod_tipoPagoFK,
	IFNULL(tp.nombre,'') as metodo,
	vt.num_factura,vt.puntoexpedicion,vt.tipo_comprobante,
	IFNULL((SELECT concat(nombre_persona,' ',apellido_persona) FROM persona WHERE cod_persona=vt.cod_clienteFK LIMIT 1),'') as cliente,
	IFNULL((SELECT ci_cliente FROM cliente WHERE cod_cliente=vt.cod_clienteFK LIMIT 1),'') as documento,
	IFNULL((SELECT nombre_persona FROM persona WHERE cod_persona=pg.cod_cobradorFK LIMIT 1),'') as cobrador,
	IFNULL((SELECT Nombre FROM local l WHERE l.cod_local=vt.cod_local LIMIT 1),'') as nombrelocal,
	IFNULL((SELECT plazo FROM credito cr WHERE cr.idcredito=pg.cod_creditoFK LIMIT 1),'') as plazo
	FROM pago pg
	INNER JOIN venta vt ON vt.cod_venta=pg.cod_venta_fk
	LEFT JOIN tipopago tp ON tp.cod_tipoPago=pg.cod_tipoPagoFK
	WHERE pg.Monto > 0
	AND pg.Fecha >= ?
	AND pg.Fecha <= ?
	AND IFNULL(pg.anulado,'0') <> '1'
	AND IFNULL((SELECT COUNT(fecha) FROM cancelaciones WHERE cod_venta=vt.cod_venta LIMIT 1),0)=0
	ORDER BY IFNULL(NULLIF(tp.nombre,''), IFNULL(NULLIF(pg.tipopago,''), 'SIN METODO')) ASC, pg.Fecha ASC, pg.idPago ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'ss';
	$stmt->bind_param($ss, $fecha_inicio, $fecha_corte);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$idPago = utf8_encode($valor['idPago']);
		$fecha = utf8_encode($valor['Fecha']);
		$monto = $valor['Monto'];
		$tipo = utf8_encode($valor['Tipo']);
		$cod_venta = utf8_encode($valor['cod_venta_fk']);
		$nrofactura = utf8_encode($valor['nrofactura']);
		$descripcion_pago = utf8_encode($valor['descripcion']);
		$metodo = utf8_encode($valor['metodo']);
		$tipopago = utf8_encode($valor['tipopago']);
		$cod_tipoPagoFK = utf8_encode($valor['cod_tipoPagoFK']);
		$cliente = utf8_encode($valor['cliente']);
		$documento = utf8_encode($valor['documento']);
		$cobrador = utf8_encode($valor['cobrador']);
		$local = utf8_encode($valor['nombrelocal']);
		$plazo = utf8_encode($valor['plazo']);
		$tipo_comprobante = utf8_encode($valor['tipo_comprobante']);
		$puntoexpedicion = utf8_encode($valor['puntoexpedicion']);
		$num_factura = utf8_encode($valor['num_factura']);
		$nro_factura = $nrofactura;

		if ($nro_factura == "" || $nro_factura == "0000") {
			$nro_factura = $num_factura;
			if ($puntoexpedicion != "") {
				$nro_factura = $puntoexpedicion . "-" . $num_factura;
			}
		}
		if ($metodo == "") {
			$metodo = $tipopago;
		}
		if ($metodo == "") {
			$metodo = "SIN METODO";
		}

		$metodo_key = strtoupper(trim($metodo));
		if ($metodo_key == "") {
			$metodo_key = "SIN METODO";
		}
		if (!isset($datos["metodos"][$metodo_key])) {
			$datos["metodos"][$metodo_key] = array(
				"nombre" => $metodo,
				"id_detalle" => "detalle_balance_metodo_pago_" . md5($metodo_key),
				"total" => 0,
				"detalle" => "",
				"registros" => 0
			);
		}

		$descripcion = "PAGO " . strtoupper($metodo) . " NRO " . $idPago . " - VTA " . $cod_venta;
		$observacion = "Tipo: " . $tipo . " | Metodo: " . $metodo . " | Metodo ID: " . $cod_tipoPagoFK . " | Cliente: " . $cliente . " | Doc: " . $documento . " | Factura: " . $tipo_comprobante . " " . $nro_factura . " | Local: " . $local . " | Cobrador: " . $cobrador;

		if ($plazo != "") {
			$observacion .= " | Cuota: " . $plazo;
		}
		if ($descripcion_pago != "") {
			$observacion .= " | Descripcion: " . $descripcion_pago;
		}

		$datos["total"] = $datos["total"] + $monto;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["metodos"][$metodo_key]["total"] = $datos["metodos"][$metodo_key]["total"] + $monto;
		$datos["metodos"][$metodo_key]["registros"] = $datos["metodos"][$metodo_key]["registros"] + 1;
		$datos["metodos"][$metodo_key]["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
	}
	$stmt->close();

	return $datos;
}

function obtener_liquidez_banco_balance($mysqli, $fecha_corte, $estado)
{
	$fecha_inicio = "2026-07-01";
	$datos = array("total" => 0, "detalle" => "", "registros" => 0);

	$sql = "SELECT l.idliquidez,IFNULL(l.monto,0) as monto,l.fecha,l.estado,
	IFNULL((SELECT descripcion FROM banco_liquidez WHERE idbanco_liquidez=l.idbanco_liquidezFK LIMIT 1),'') as banco
	FROM liquidez l
	WHERE (?='' or l.estado=?)
	AND l.fecha >= ?
	AND l.fecha <= ?
	ORDER BY l.fecha ASC, l.idliquidez ASC";

	$stmt = $mysqli->prepare($sql);
	$ss = 'ssss';
	$stmt->bind_param($ss, $estado, $estado, $fecha_inicio, $fecha_corte);

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	while ($valor = mysqli_fetch_assoc($result)) {
		$idliquidez = utf8_encode($valor['idliquidez']);
		$monto = $valor['monto'];
		$fecha = utf8_encode($valor['fecha']);
		$estado_registro = utf8_encode($valor['estado']);
		$banco = utf8_encode($valor['banco']);
		$descripcion = "LIQUIDEZ BANCO NRO " . $idliquidez;
		$observacion = "Banco: " . $banco . " | Estado: " . $estado_registro;

		$datos["total"] = $datos["total"] + $monto;
		$datos["registros"] = $datos["registros"] + 1;
		$datos["detalle"] .= crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);
	}
	$stmt->close();

	return $datos;
}

function balance_general_empresa($fecha_corte, $estado)
{
	$mysqli = conectar_al_servidor();
	$condicion_estado = "";
	$totalActivo = 0;
	$totalPasivo = 0;
	$nroRegistro = 0;
	$totalPatrimonioActivo = 0;
	$totalPatrimonioPasivo = 0;
	$nroPatrimonioActivo = 0;
	$nroPatrimonioPasivo = 0;
	$detallePatrimonioActivo = "";
	$detallePatrimonioPasivo = "";
	$resumenActivo = "";
	$resumenPasivo = "";
	$detallesOcultos = "";

	if ($fecha_corte == "" || !preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $fecha_corte)) {
		$fecha_corte = date("Y-m-d");
	}

	if ($estado != "") {
		$condicion_estado = "estado=?";
	} else {
		$condicion_estado = "1=1";
	}

	$sql = "SELECT descripcion,tipo,valor,fecha,observacion
	FROM patrimonio_empresa
	WHERE " . $condicion_estado . " and fecha <= ?
	ORDER BY tipo ASC, descripcion ASC";

	$stmt = $mysqli->prepare($sql);

	if ($estado != "") {
		$ss = 'ss';
		$stmt->bind_param($ss, $estado, $fecha_corte);
	} else {
		$ss = 's';
		$stmt->bind_param($ss, $fecha_corte);
	}

	if (!$stmt->execute()) {
		echo "Error";
		exit;
	}

	$result = $stmt->get_result();
	$nroRegistro = mysqli_num_rows($result);

	while ($valor = mysqli_fetch_assoc($result)) {
		$descripcion = utf8_encode($valor['descripcion']);
		$tipo = utf8_encode($valor['tipo']);
		$monto = $valor['valor'];
		$fecha = utf8_encode($valor['fecha']);
		$observacion = utf8_encode($valor['observacion']);
		$fila = crear_fila_balance_general($descripcion, $fecha, $monto, $observacion);

		if ($tipo == "Pasivo") {
			$totalPasivo = $totalPasivo + $monto;
			$totalPatrimonioPasivo = $totalPatrimonioPasivo + $monto;
			$nroPatrimonioPasivo = $nroPatrimonioPasivo + 1;
			$detallePatrimonioPasivo .= $fila;
		} else {
			$totalActivo = $totalActivo + $monto;
			$totalPatrimonioActivo = $totalPatrimonioActivo + $monto;
			$nroPatrimonioActivo = $nroPatrimonioActivo + 1;
			$detallePatrimonioActivo .= $fila;
		}
	}

	$grupoPatrimonioActivo = crear_grupo_balance_general("detalle_balance_patrimonio_activo", "Patrimonio cargado - Activos", $nroPatrimonioActivo, $totalPatrimonioActivo, $detallePatrimonioActivo, "Registros cargados manualmente como Activo");
	$resumenActivo .= $grupoPatrimonioActivo["resumen"];
	$detallesOcultos .= $grupoPatrimonioActivo["detalle"];

	$liquidezBanco = obtener_liquidez_banco_balance($mysqli, $fecha_corte, $estado);
	$totalActivo = $totalActivo + $liquidezBanco["total"];
	$nroRegistro = $nroRegistro + $liquidezBanco["registros"];
	$grupoLiquidezBanco = crear_grupo_balance_general("detalle_balance_liquidez_banco", "Liquidez banco", $liquidezBanco["registros"], $liquidezBanco["total"], $liquidezBanco["detalle"], "Liquidez bancaria desde 2026-07-01 hasta la fecha de corte", true);
	$resumenActivo .= $grupoLiquidezBanco["resumen"];
	$detallesOcultos .= $grupoLiquidezBanco["detalle"];

	$movimientosGastosDepositos = obtener_movimientos_gastos_depositos_balance($mysqli, $fecha_corte, $estado);
	$pagosPorMetodo = obtener_pagos_por_metodo_balance($mysqli, $fecha_corte);
	foreach ($pagosPorMetodo["metodos"] as $metodoPago) {
		$nombreMetodoPago = strtoupper(trim($metodoPago["nombre"]));
		if ($nombreMetodoPago == "EFECTIVO" || $nombreMetodoPago == "TRANSFERENCIA") {
			continue;
		}
		$totalActivo = $totalActivo + $metodoPago["total"];
		$nroRegistro = $nroRegistro + $metodoPago["registros"];
		$grupoMetodoPago = crear_grupo_balance_general($metodoPago["id_detalle"], "Metodo de pago - " . $metodoPago["nombre"], $metodoPago["registros"], $metodoPago["total"], $metodoPago["detalle"], "Pagos cobrados por metodo desde 2026-07-01 hasta la fecha de corte");
		$resumenActivo .= $grupoMetodoPago["resumen"];
		$detallesOcultos .= $grupoMetodoPago["detalle"];
	}

	$stockValorizado = obtener_stock_valorizado_balance($mysqli, $fecha_corte);
	$totalActivo = $totalActivo + $stockValorizado["total"];
	$nroRegistro = $nroRegistro + $stockValorizado["registros"];
	$grupoStock = crear_grupo_balance_general("detalle_balance_stock", "Stock valorizado", $stockValorizado["registros"], $stockValorizado["total"], $stockValorizado["detalle"], "Inventario valorizado con precio de compra");
	$resumenActivo .= $grupoStock["resumen"];
	$detallesOcultos .= $grupoStock["detalle"];

	$chequesACobrar = obtener_cheques_a_cobrar_balance($mysqli, $fecha_corte, $estado);
	$totalActivo = $totalActivo + $chequesACobrar["total"];
	$nroRegistro = $nroRegistro + $chequesACobrar["registros"];
	$grupoChequesACobrar = crear_grupo_balance_general("detalle_balance_cheques_cobrar", "Cheques a cobrar", $chequesACobrar["registros"], $chequesACobrar["total"], $chequesACobrar["detalle"], "Cheques pendientes de cobro hasta la fecha de corte");
	$resumenActivo .= $grupoChequesACobrar["resumen"];
	$detallesOcultos .= $grupoChequesACobrar["detalle"];

	$creditosSinPago = obtener_creditos_sin_pago_balance($mysqli, $fecha_corte);
	$totalActivo = $totalActivo + $creditosSinPago["total"];
	$nroRegistro = $nroRegistro + $creditosSinPago["registros"];
	$grupoCreditosSinPago = crear_grupo_balance_general("detalle_balance_creditos_sin_pago", "Creditos pendientes sin pago", $creditosSinPago["registros"], $creditosSinPago["total"], $creditosSinPago["detalle"], "Cuotas vencidas pendientes con hasta 1 anho de atraso");
	$resumenActivo .= $grupoCreditosSinPago["resumen"];
	$detallesOcultos .= $grupoCreditosSinPago["detalle"];

	$creditosPorVencerSinPago = obtener_creditos_por_vencer_sin_pago_balance($mysqli, $fecha_corte);
	$totalActivo = $totalActivo + $creditosPorVencerSinPago["total"];
	$nroRegistro = $nroRegistro + $creditosPorVencerSinPago["registros"];
	$grupoCreditosPorVencerSinPago = crear_grupo_balance_general("detalle_balance_creditos_por_vencer_sin_pago", "Creditos por vencer sin pago", $creditosPorVencerSinPago["registros"], $creditosPorVencerSinPago["total"], $creditosPorVencerSinPago["detalle"], "Cuotas pendientes que todavia no vencieron");
	$resumenActivo .= $grupoCreditosPorVencerSinPago["resumen"];
	$detallesOcultos .= $grupoCreditosPorVencerSinPago["detalle"];

	$grupoPatrimonioPasivo = crear_grupo_balance_general("detalle_balance_patrimonio_pasivo", "Patrimonio cargado - Pasivos", $nroPatrimonioPasivo, $totalPatrimonioPasivo, $detallePatrimonioPasivo, "Registros cargados manualmente como Pasivo");
	$resumenPasivo .= $grupoPatrimonioPasivo["resumen"];
	$detallesOcultos .= $grupoPatrimonioPasivo["detalle"];

	$chequesEmitidos = obtener_cheques_emitidos_balance($mysqli, $fecha_corte, $estado);
	$totalPasivo = $totalPasivo + $chequesEmitidos["total"];
	$nroRegistro = $nroRegistro + $chequesEmitidos["registros"];
	$grupoChequesEmitidos = crear_grupo_balance_general("detalle_balance_cheques_emitidos", "Cheques emitidos", $chequesEmitidos["registros"], $chequesEmitidos["total"], $chequesEmitidos["detalle"], "Cheques pendientes del listado de Cheque");
	$resumenPasivo .= $grupoChequesEmitidos["resumen"];
	$detallesOcultos .= $grupoChequesEmitidos["detalle"];

	$deudasCheque = obtener_deudas_cheque_balance($mysqli, $fecha_corte, $estado);
	$totalPasivo = $totalPasivo + $deudasCheque["total"];
	$nroRegistro = $nroRegistro + $deudasCheque["registros"];
	$grupoDeudasCheque = crear_grupo_balance_general("detalle_balance_deudas_cheque", "Deudas registradas", $deudasCheque["registros"], $deudasCheque["total"], $deudasCheque["detalle"], "Deudas pendientes del listado de Cheque", true);
	$resumenPasivo .= $grupoDeudasCheque["resumen"];
	$detallesOcultos .= $grupoDeudasCheque["detalle"];

	if ($resumenActivo == "") {
		$resumenActivo = "<tr><td colspan='4' style='text-align:center'>Sin activos cargados</td></tr>";
	}

	if ($resumenPasivo == "") {
		$resumenPasivo = "<tr><td colspan='4' style='text-align:center'>Sin pasivos cargados</td></tr>";
	}

	$totalPatrimonio = $totalActivo - $totalPasivo;
	$sumaPasivoPatrimonio = $totalPasivo + $totalPatrimonio;

	$pagina = "
<div class='balance-general-empresa'>
	<div class='balance-general-formula'>
		<strong>Fecha de corte</strong>
		<span>" . $fecha_corte . "</span>
		<b>|</b>
		<strong>Historial acumulado hasta esa fecha</strong>
	</div>

	<div class='balance-general-resumen'>
		<div class='balance-general-card activo'>
			<span>Total Activos</span>
			<strong>" . number_format($totalActivo, 0, ',', '.') . "</strong>
		</div>
		<div class='balance-general-card pasivo'>
			<span>Total Pasivos</span>
			<strong>" . number_format($totalPasivo, 0, ',', '.') . "</strong>
		</div>
		<div class='balance-general-card patrimonio'>
			<span>Patrimonio Neto</span>
			<strong>" . number_format($totalPatrimonio, 0, ',', '.') . "</strong>
		</div>
	</div>

	<div class='balance-general-formula'>
		<strong>Activo</strong>
		<span>" . number_format($totalActivo, 0, ',', '.') . "</span>
		<b>=</b>
		<strong>Pasivo + Patrimonio Neto</strong>
		<span>" . number_format($sumaPasivoPatrimonio, 0, ',', '.') . "</span>
	</div>

	<div class='balance-general-grid'>
		<section>
			<h3>Activos</h3>
			<table class='balance-general-tabla'>
				<thead>
					<tr>
						<th>Tipo</th>
						<th>Registros</th>
						<th>Total</th>
						<th>Detalle</th>
					</tr>
				</thead>
				<tbody>" . $resumenActivo . "</tbody>
			</table>
		</section>
		<section>
			<h3>Pasivos</h3>
			<table class='balance-general-tabla'>
				<thead>
					<tr>
						<th>Tipo</th>
						<th>Registros</th>
						<th>Total</th>
						<th>Detalle</th>
					</tr>
				</thead>
				<tbody>" . $resumenPasivo . "</tbody>
			</table>
		</section>
	</div>

	<div class='balance-general-detalles'>
		" . $detallesOcultos . "
	</div>

	<div class='balance-general-modal' id='modalDetalleGrupoBalanceGeneral' onclick='cerrarDetalleGrupoBalanceGeneral(event)'>
		<div class='balance-general-modal-contenido'>
			<div class='balance-general-modal-header'>
				<strong id='tituloDetalleGrupoBalanceGeneral'>Detalle del balance</strong>
				<button type='button' onclick='cerrarDetalleGrupoBalanceGeneral()'>Cerrar</button>
			</div>
			<div class='balance-general-modal-filtro'>
				<input type='text' id='inptFiltroDetalleGrupoBalanceGeneral' placeholder='Filtrar detalle' onkeyup='filtrarDetalleGrupoBalanceGeneral()' />
				<span id='lblFiltroDetalleGrupoBalanceGeneral'></span>
			</div>
			<div class='balance-general-modal-body' id='contenidoDetalleGrupoBalanceGeneral'></div>
		</div>
	</div>
</div>";

	mysqli_close($mysqli);
	$informacion = array(
		"1" => "exito",
		"2" => $pagina,
		"3" => number_format($totalActivo, 0, ',', '.'),
		"4" => number_format($totalPasivo, 0, ',', '.'),
		"5" => number_format($totalPatrimonio, 0, ',', '.'),
		"6" => $nroRegistro
	);
	gt_json_response($informacion);
	exit;
}

verificar($operacion);
?>
