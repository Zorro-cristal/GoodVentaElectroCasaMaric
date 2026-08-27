<?php
require("conexion.php");
include("verificar_navegador.php");
include("buscar_nivel.php");

$operacion=isset($_POST['funt']) ? utf8_decode($_POST['funt']) : '';
$user=isset($_POST['useru']) ? utf8_decode($_POST['useru']) : '';
$pass=isset($_POST['passu']) ? str_replace("=","+",$_POST['passu']) : '';
$navegador=isset($_POST['navegador']) ? utf8_decode($_POST['navegador']) : '';

if($user==='' || verificar_navegador($user,$navegador,$pass)!="ok"){
	responderFlujo(array("1" => "UI"));
}
if(controldeaccesoacasas($user,"VERFLUJODATOSCLIENTE","u.accion='SI'")!=1){
	responderFlujo(array("1" => "NI"));
}

if($operacion==="buscar_clientes"){
	$buscar=isset($_POST['buscar']) ? utf8_decode(trim($_POST['buscar'])) : '';
	buscarClientesFlujo($buscar);
}
if($operacion==="buscar_flujo"){
	$cod_cliente=isset($_POST['cod_cliente']) ? intval($_POST['cod_cliente']) : 0;
	$tipo=isset($_POST['tipo']) ? strtoupper(trim($_POST['tipo'])) : '';
	$fecha_desde=isset($_POST['fecha_desde']) ? trim($_POST['fecha_desde']) : '';
	$fecha_hasta=isset($_POST['fecha_hasta']) ? trim($_POST['fecha_hasta']) : '';
	$offset=isset($_POST['offset']) ? max(0,intval($_POST['offset'])) : 0;
	$limite=isset($_POST['limite']) ? intval($_POST['limite']) : 80;
	buscarFlujoCliente($cod_cliente,$tipo,$fecha_desde,$fecha_hasta,$offset,$limite);
}
if($operacion==="detalle_movimiento"){
	$cod_cliente=isset($_POST['cod_cliente']) ? intval($_POST['cod_cliente']) : 0;
	$tipo=isset($_POST['tipo']) ? strtoupper(trim($_POST['tipo'])) : '';
	$codigo=isset($_POST['codigo']) ? intval($_POST['codigo']) : 0;
	buscarDetalleMovimientoFlujo($cod_cliente,$tipo,$codigo);
}

responderFlujo(array("1" => "error"));

function responderFlujo($datos)
{
	echo json_encode($datos);
	exit;
}

function textoUtf8Flujo($valor)
{
	return $valor===null ? '' : utf8_encode((string)$valor);
}

function buscarClientesFlujo($buscar)
{
	if($buscar===''){
		responderFlujo(array("1" => "exito","2" => array()));
	}
	$mysqli=conectar_al_servidor();
	$termino='%'.$buscar.'%';
	$compacto='%'.preg_replace('/[^0-9A-Za-z]/','',$buscar).'%';
	$sql="SELECT c.cod_cliente,
	             TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona)) AS nombre,
	             COALESCE(NULLIF(c.ci_cliente,''),c.rut_cliente) AS documento,
	             p.telefono,c.estado,
	             COALESCE(NULLIF(c.calificacion_cliente,''),'SIN REGISTRO') AS calificacion,
	             c.fecha_insert
	      FROM cliente c
	      INNER JOIN persona p ON p.cod_persona=c.cod_cliente
	      WHERE TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona)) LIKE ?
	         OR REPLACE(REPLACE(REPLACE(COALESCE(c.ci_cliente,c.rut_cliente),'.',''),'-',''),' ','') LIKE ?
	         OR REPLACE(REPLACE(p.telefono,'-',''),' ','') LIKE ?
	      ORDER BY p.nombre_persona,p.apellido_persona
	      LIMIT 30";
	$stmt=$mysqli->prepare($sql);
	$stmt->bind_param('sss',$termino,$compacto,$compacto);
	if(!$stmt->execute()){
		responderFlujo(array("1" => "error"));
	}
	$result=$stmt->get_result();
	$filas=array();
	while($fila=mysqli_fetch_assoc($result)){
		$filas[]=array(
			"codigo" => intval($fila['cod_cliente']),
			"nombre" => textoUtf8Flujo($fila['nombre']),
			"documento" => textoUtf8Flujo($fila['documento']),
			"telefono" => textoUtf8Flujo($fila['telefono']),
			"estado" => textoUtf8Flujo($fila['estado']),
			"calificacion" => textoUtf8Flujo($fila['calificacion']),
			"fecha_registro" => $fila['fecha_insert']
		);
	}
	$stmt->close();
	$mysqli->close();
	responderFlujo(array("1" => "exito","2" => $filas));
}

function enlazarParametrosFlujo($stmt,$tipos,&$parametros)
{
	$referencias=array();
	$referencias[]=&$tipos;
	for($i=0;$i<count($parametros);$i++){
		$referencias[]=&$parametros[$i];
	}
	call_user_func_array(array($stmt,'bind_param'),$referencias);
}

function buscarDetalleMovimientoFlujo($cod_cliente,$tipo,$codigo)
{
	if($cod_cliente<=0 || $codigo<=0 || !in_array($tipo,array('VENTA','PAGO','AGENDA','AGENDA_CALLCENTER'),true)){
		responderFlujo(array("1" => "DI"));
	}
	$mysqli=conectar_al_servidor();
	if($tipo==='VENTA'){
		$sql="SELECT v.cod_venta,v.fecha_venta,v.fecha_insert,v.TipoVenta,v.TipoPago,
		             v.tipo_comprobante,v.puntoexpedicion,v.num_factura,v.total_venta,
		             v.pago,v.descuento,v.estado,v.anulado,l.Nombre AS local,
		             TRIM(CONCAT_WS(' ',pc.nombre_persona,pc.apellido_persona)) AS cliente,
		             COALESCE(NULLIF(c.ci_cliente,''),c.rut_cliente) AS documento,pc.telefono,
		             TRIM(CONCAT_WS(' ',pu.nombre_persona,pu.apellido_persona)) AS responsable,
		             IFNULL((SELECT SUM(pg.Monto) FROM pago pg
		                     WHERE pg.cod_venta_fk=v.cod_venta AND pg.Tipo='Pago Cuota'
		                       AND COALESCE(pg.anulado,0)<>1),0) AS total_pagado
		      FROM venta v
		      INNER JOIN persona pc ON pc.cod_persona=v.cod_clienteFK
		      INNER JOIN cliente c ON c.cod_cliente=v.cod_clienteFK
		      LEFT JOIN persona pu ON pu.cod_persona=v.cod_usuarioFK
		      LEFT JOIN local l ON l.cod_local=v.cod_local
		      WHERE v.cod_venta=? AND v.cod_clienteFK=? LIMIT 1";
		$stmt=$mysqli->prepare($sql);
		$stmt->bind_param('ii',$codigo,$cod_cliente);
		$stmt->execute();
		$result=$stmt->get_result();
		if(mysqli_num_rows($result)===0) responderFlujo(array("1" => "NR"));
		$fila=mysqli_fetch_assoc($result);
		$stmt->close();

		$sqlDetalle="SELECT dv.cod_detalle,dv.cod_productoFK,
		                   COALESCE(NULLIF(pr.nombre_producto,''),dv.cod_productoFK) AS producto,
		                   dv.cantidad_detalle,dv.precio_producto,dv.subtotal,dv.descuento,
		                   dv.detalleproducto,dv.descripcion,dv.estado
		            FROM detalle_venta dv
		            LEFT JOIN producto pr ON pr.cod_producto=dv.cod_productoFK
		            WHERE dv.cod_ventaFK=? ORDER BY dv.cod_detalle";
		$stmt=$mysqli->prepare($sqlDetalle);
		$stmt->bind_param('i',$codigo);
		$stmt->execute();
		$result=$stmt->get_result();
		$productos=array();
		while($detalle=mysqli_fetch_assoc($result)){
			$productos[]=array(
				"codigo" => textoUtf8Flujo($detalle['cod_productoFK']),
				"producto" => textoUtf8Flujo($detalle['producto']),
				"cantidad" => floatval($detalle['cantidad_detalle']),
				"precio" => floatval($detalle['precio_producto']),
				"subtotal" => floatval($detalle['subtotal']),
				"descuento" => floatval($detalle['descuento']),
				"detalle" => textoUtf8Flujo($detalle['detalleproducto']),
				"descripcion" => textoUtf8Flujo($detalle['descripcion']),
				"estado" => textoUtf8Flujo($detalle['estado'])
			);
		}
		$stmt->close();
		$totalNeto=floatval($fila['total_venta'])-floatval($fila['descuento']);
		$totalPagado=floatval($fila['pago'])+floatval($fila['total_pagado']);
		$datos=array(
			"tipo" => "VENTA","codigo" => intval($fila['cod_venta']),
			"fecha" => $fila['fecha_insert'] ? $fila['fecha_insert'] : $fila['fecha_venta'],
			"tipo_venta" => textoUtf8Flujo($fila['TipoVenta']),
			"tipo_pago" => textoUtf8Flujo($fila['TipoPago']),
			"comprobante" => textoUtf8Flujo($fila['tipo_comprobante']),
			"factura" => textoUtf8Flujo(trim($fila['puntoexpedicion'].' '.$fila['num_factura'])),
			"cliente" => textoUtf8Flujo($fila['cliente']),
			"documento" => textoUtf8Flujo($fila['documento']),
			"telefono" => textoUtf8Flujo($fila['telefono']),
			"local" => textoUtf8Flujo($fila['local']),
			"responsable" => textoUtf8Flujo($fila['responsable']),
			"estado" => intval($fila['anulado'])===1 ? "ANULADA" : textoUtf8Flujo($fila['estado'] ? $fila['estado'] : 'REGISTRADA'),
			"total" => floatval($fila['total_venta']),
			"descuento" => floatval($fila['descuento']),
			"entrega" => floatval($fila['pago']),
			"total_pagado" => $totalPagado,
			"saldo" => max(0,$totalNeto-$totalPagado),
			"productos" => $productos
		);
		$mysqli->close();
		responderFlujo(array("1" => "exito","2" => $datos));
	}

	if($tipo==='PAGO'){
		$sql="SELECT pg.idPago,pg.Fecha,pg.hora,pg.Monto,pg.Tipo,pg.tipopago,pg.descripcion,
		             pg.nrofactura,pg.anulado,pg.cod_venta_fk,cr.plazo,cr.fechapago,
		             GREATEST(DATEDIFF(COALESCE(pg.Fecha,DATE(pg.hora)),cr.fechapago),0) AS dias_atraso,
		             v.TipoVenta,v.puntoexpedicion,v.num_factura,
		             TRIM(CONCAT_WS(' ',pc.nombre_persona,pc.apellido_persona)) AS cliente,
		             COALESCE(NULLIF(c.ci_cliente,''),c.rut_cliente) AS documento,
		             TRIM(CONCAT_WS(' ',pr.nombre_persona,pr.apellido_persona)) AS responsable
		      FROM pago pg
		      INNER JOIN venta v ON v.cod_venta=pg.cod_venta_fk
		      INNER JOIN persona pc ON pc.cod_persona=v.cod_clienteFK
		      INNER JOIN cliente c ON c.cod_cliente=v.cod_clienteFK
		      LEFT JOIN credito cr ON cr.idcredito=pg.cod_creditoFK
		      LEFT JOIN persona pr ON pr.cod_persona=pg.cod_cobradorFK
		      WHERE pg.idPago=? AND v.cod_clienteFK=? LIMIT 1";
		$stmt=$mysqli->prepare($sql);
		$stmt->bind_param('ii',$codigo,$cod_cliente);
		$stmt->execute();
		$result=$stmt->get_result();
		if(mysqli_num_rows($result)===0) responderFlujo(array("1" => "NR"));
		$fila=mysqli_fetch_assoc($result);
		$stmt->close();
		$datos=array(
			"tipo" => "PAGO","codigo" => intval($fila['idPago']),
			"venta_codigo" => intval($fila['cod_venta_fk']),
			"fecha" => $fila['hora'] ? $fila['hora'] : $fila['Fecha'],
			"monto" => floatval($fila['Monto']),
			"concepto" => textoUtf8Flujo($fila['Tipo']),
			"metodo" => textoUtf8Flujo($fila['tipopago']),
			"descripcion" => textoUtf8Flujo($fila['descripcion']),
			"recibo" => textoUtf8Flujo($fila['nrofactura']),
			"cuota" => textoUtf8Flujo($fila['plazo']),
			"vencimiento" => $fila['fechapago'],
			"dias_atraso" => intval($fila['dias_atraso']),
			"cliente" => textoUtf8Flujo($fila['cliente']),
			"documento" => textoUtf8Flujo($fila['documento']),
			"responsable" => textoUtf8Flujo($fila['responsable']),
			"tipo_venta" => textoUtf8Flujo($fila['TipoVenta']),
			"factura_venta" => textoUtf8Flujo(trim($fila['puntoexpedicion'].' '.$fila['num_factura'])),
			"estado" => intval($fila['anulado'])===1 ? "ANULADO" : "REGISTRADO"
		);
		$mysqli->close();
		responderFlujo(array("1" => "exito","2" => $datos));
	}

	if($tipo==='AGENDA'){
		$sql="SELECT vc.cod_VisitasCliente,vc.fecha,vc.fechaCompro,vc.Motivo,vc.estado,
		             TRIM(CONCAT_WS(' ',pc.nombre_persona,pc.apellido_persona)) AS cliente,
		             COALESCE(NULLIF(c.ci_cliente,''),c.rut_cliente) AS documento,pc.telefono,
		             z.nombre AS zona,
		             TRIM(CONCAT_WS(' ',pr.nombre_persona,pr.apellido_persona)) AS responsable
		      FROM visitascliente vc
		      INNER JOIN persona pc ON pc.cod_persona=vc.cod_clienteFK
		      INNER JOIN cliente c ON c.cod_cliente=vc.cod_clienteFK
		      LEFT JOIN zona z ON z.idzona=c.idzonaFk
		      LEFT JOIN persona pr ON pr.cod_persona=vc.cod_cobradorFK
		      WHERE vc.cod_VisitasCliente=? AND vc.cod_clienteFK=? LIMIT 1";
		$stmt=$mysqli->prepare($sql);
		$stmt->bind_param('ii',$codigo,$cod_cliente);
		$stmt->execute();
		$result=$stmt->get_result();
		if(mysqli_num_rows($result)===0) responderFlujo(array("1" => "NR"));
		$fila=mysqli_fetch_assoc($result);
		$stmt->close();
		$datos=array(
			"tipo" => "AGENDA","codigo" => intval($fila['cod_VisitasCliente']),
			"fecha" => $fila['fecha'],"fecha_compromiso" => $fila['fechaCompro'],
			"motivo" => textoUtf8Flujo($fila['Motivo']),
			"estado" => textoUtf8Flujo($fila['estado']),
			"cliente" => textoUtf8Flujo($fila['cliente']),
			"documento" => textoUtf8Flujo($fila['documento']),
			"telefono" => textoUtf8Flujo($fila['telefono']),
			"zona" => textoUtf8Flujo($fila['zona']),
			"responsable" => textoUtf8Flujo($fila['responsable'])
		);
		$mysqli->close();
		responderFlujo(array("1" => "exito","2" => $datos));
	}

	$sql="SELECT ac.idagenda_callcenterventas,ac.fecha_insert,ac.fecha,ac.observacion,ac.estado,
	             COALESCE(NULLIF(dc.nombre_cliente,''),TRIM(CONCAT_WS(' ',pc.nombre_persona,pc.apellido_persona))) AS cliente,
	             COALESCE(NULLIF(c.ci_cliente,''),c.rut_cliente) AS documento,
	             COALESCE(NULLIF(dc.telefono,''),pc.telefono) AS telefono,dc.origen,
	             TRIM(CONCAT_WS(' ',pr.nombre_persona,pr.apellido_persona)) AS responsable
	      FROM agenda_callcenterventas ac
	      INNER JOIN detalle_callcenterventas dc ON dc.iddetalle_callcenterventas=ac.iddetalle_callcenterventasFK
	      LEFT JOIN persona pc ON pc.cod_persona=dc.cod_clienteFK
	      LEFT JOIN cliente c ON c.cod_cliente=dc.cod_clienteFK
	      LEFT JOIN persona pr ON pr.cod_persona=dc.agente_cod_usuarioFK
	      WHERE ac.idagenda_callcenterventas=? AND dc.cod_clienteFK=? LIMIT 1";
	$stmt=$mysqli->prepare($sql);
	$stmt->bind_param('ii',$codigo,$cod_cliente);
	$stmt->execute();
	$result=$stmt->get_result();
	if(mysqli_num_rows($result)===0) responderFlujo(array("1" => "NR"));
	$fila=mysqli_fetch_assoc($result);
	$stmt->close();
	$mysqli->close();
	responderFlujo(array("1" => "exito","2" => array(
		"tipo" => "AGENDA_CALLCENTER","codigo" => intval($fila['idagenda_callcenterventas']),
		"fecha" => $fila['fecha_insert'],"fecha_compromiso" => $fila['fecha'],
		"motivo" => textoUtf8Flujo($fila['observacion']),
		"estado" => textoUtf8Flujo($fila['estado']),
		"cliente" => textoUtf8Flujo($fila['cliente']),
		"documento" => textoUtf8Flujo($fila['documento']),
		"telefono" => textoUtf8Flujo($fila['telefono']),
		"zona" => textoUtf8Flujo($fila['origen']),
		"responsable" => textoUtf8Flujo($fila['responsable'])
	)));
}

function buscarFlujoCliente($cod_cliente,$tipo,$fecha_desde,$fecha_hasta,$offset,$limite)
{
	$tiposPermitidos=array(
		'','REGISTRO','ACTUALIZACION','VENTA','CREDITO_PENDIENTE','PAGO','AGENDA','AGENDA_CALLCENTER',
		'ACTIVIDAD_CALLCENTER','SOLICITUD_CREDITO','FOTO','ARCHIVO'
	);
	if($cod_cliente<=0 || !in_array($tipo,$tiposPermitidos,true)){
		responderFlujo(array("1" => "DI"));
	}
	if($fecha_desde!=='' && !preg_match('/^\d{4}-\d{2}-\d{2}$/',$fecha_desde)){
		responderFlujo(array("1" => "DI"));
	}
	if($fecha_hasta!=='' && !preg_match('/^\d{4}-\d{2}-\d{2}$/',$fecha_hasta)){
		responderFlujo(array("1" => "DI"));
	}
	$limite=max(20,min(150,$limite));
	$limiteConsulta=$limite+1;
	$mysqli=conectar_al_servidor();

	$cliente=obtenerClienteFlujo($mysqli,$cod_cliente);
	if($cliente===null){
		responderFlujo(array("1" => "NR"));
	}
	$resumen=obtenerResumenFlujo($mysqli,$cod_cliente);

	$sql="SELECT flujo.tipo,flujo.fecha_evento,flujo.titulo,flujo.descripcion,
	             flujo.referencia,flujo.monto,flujo.dias_atraso,flujo.estado,flujo.responsable,
	             u.foto_perfil AS responsable_foto
	      FROM (
	        SELECT 'REGISTRO' AS tipo,c.fecha_insert AS fecha_evento,
	               'Registro inicial del cliente' AS titulo,
	               CONCAT('Documento: ',COALESCE(NULLIF(c.ci_cliente,''),c.rut_cliente)) AS descripcion,
	               CONCAT('CLIENTE #',c.cod_cliente) AS referencia,
	               CAST(NULL AS DECIMAL(15,2)) AS monto,CAST(NULL AS SIGNED) AS dias_atraso,c.estado,
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=CAST(c.cod_user_insert AS UNSIGNED) LIMIT 1),'Sistema') AS responsable,
	               CAST(c.cod_user_insert AS UNSIGNED) AS responsable_codigo
	        FROM cliente c WHERE c.cod_cliente=?

	        UNION ALL
	        SELECT 'ACTUALIZACION',c.fecha_edit,'Datos del cliente actualizados',
	               'Se modificaron datos personales o comerciales',
	               CONCAT('CLIENTE #',c.cod_cliente),NULL,NULL,c.estado,
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=CAST(c.cod_user_edit AS UNSIGNED) LIMIT 1),'Sistema'),
	               CAST(c.cod_user_edit AS UNSIGNED)
	        FROM cliente c WHERE c.cod_cliente=? AND c.fecha_edit IS NOT NULL

	        UNION ALL
	        SELECT 'VENTA',COALESCE(v.fecha_insert,CAST(v.fecha_venta AS DATETIME)),
	               CONCAT('Venta #',v.cod_venta),
	               CONCAT_WS(' - ',v.TipoVenta,CONCAT('Factura: ',COALESCE(NULLIF(v.num_factura,''),'Sin numero')),v.TipoPago),
	               CONCAT('VENTA #',v.cod_venta),v.total_venta,NULL,
	               CASE WHEN COALESCE(v.anulado,0)=1 THEN 'ANULADA' ELSE COALESCE(NULLIF(v.estado,''),'REGISTRADA') END,
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=v.cod_usuarioFK LIMIT 1),'Sin responsable'),
	               v.cod_usuarioFK
	        FROM venta v WHERE v.cod_clienteFK=?

	        UNION ALL
	        SELECT 'CREDITO_PENDIENTE',CAST(cr.fechapago AS DATETIME),
	               CONCAT('Credito pendiente #',cr.idcredito),
	               CONCAT_WS(' - ',CONCAT('Cuota: ',cr.plazo),
	                         CONCAT('Vencimiento: ',DATE_FORMAT(cr.fechapago,'%d/%m/%Y')),
	                         CONCAT('Venta #',cr.cod_venta)),
	               CONCAT('CREDITO #',cr.idcredito),
	               (cr.Monto-cr.descuento)-IFNULL((
	                   SELECT SUM(pc.Monto) FROM pago pc
	                   WHERE pc.cod_creditoFK=cr.idcredito
	                     AND pc.Tipo='Pago Cuota' AND COALESCE(pc.anulado,0)<>1
	               ),0),
	               GREATEST(DATEDIFF(CURDATE(),cr.fechapago),0),'PENDIENTE',
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=v.cod_usuarioFK LIMIT 1),'Sin responsable'),
	               v.cod_usuarioFK
	        FROM credito cr
	        INNER JOIN venta v ON v.cod_venta=cr.cod_venta
	        WHERE v.cod_clienteFK=?
	          AND cr.fechapago<CURDATE()
	          AND COALESCE(cr.anulado,0)<>1
	          AND COALESCE(v.anulado,0)<>1
	          AND (cr.Monto-cr.descuento)-IFNULL((
	               SELECT SUM(pc.Monto) FROM pago pc
	               WHERE pc.cod_creditoFK=cr.idcredito
	                 AND pc.Tipo='Pago Cuota' AND COALESCE(pc.anulado,0)<>1
	          ),0)>0

	        UNION ALL
	        SELECT 'PAGO',COALESCE(p.hora,CAST(p.Fecha AS DATETIME)),
	               CONCAT('Pago #',p.idPago),
	               CONCAT_WS(' - ',p.tipopago,p.descripcion,CONCAT('Venta #',p.cod_venta_fk)),
	               CONCAT('PAGO #',p.idPago),p.Monto,
	               CASE WHEN cr.fechapago IS NULL THEN NULL
	                    ELSE GREATEST(DATEDIFF(COALESCE(p.Fecha,DATE(p.hora)),cr.fechapago),0) END,
	               CASE WHEN COALESCE(p.anulado,0)=1 THEN 'ANULADO' ELSE 'REGISTRADO' END,
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',pr.nombre_persona,pr.apellido_persona))
	                         FROM persona pr WHERE pr.cod_persona=p.cod_cobradorFK LIMIT 1),'Sin responsable'),
	               p.cod_cobradorFK
	        FROM pago p
	        INNER JOIN venta v ON v.cod_venta=p.cod_venta_fk
	        LEFT JOIN credito cr ON cr.idcredito=p.cod_creditoFK
	        WHERE v.cod_clienteFK=?

	        UNION ALL
	        SELECT 'AGENDA',vc.fecha,'Agenda o visita registrada',
	               CONCAT_WS(' - ',vc.Motivo,CONCAT('Compromiso: ',vc.fechaCompro)),
	               CONCAT('AGENDA #',vc.cod_VisitasCliente),NULL,NULL,vc.estado,
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=vc.cod_cobradorFK LIMIT 1),'Sin responsable'),
	               vc.cod_cobradorFK
	        FROM visitascliente vc WHERE vc.cod_clienteFK=?

	        UNION ALL
	        SELECT 'AGENDA_CALLCENTER',CAST(ac.fecha_insert AS DATETIME),'Agenda de call center',
	               CONCAT_WS(' - ',ac.observacion,CONCAT('Agendado para: ',ac.fecha)),
	               CONCAT('AGENDA CC #',ac.idagenda_callcenterventas),NULL,NULL,ac.estado,
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=dc.agente_cod_usuarioFK LIMIT 1),'Sin responsable'),
	               dc.agente_cod_usuarioFK
	        FROM agenda_callcenterventas ac
	        INNER JOIN detalle_callcenterventas dc ON dc.iddetalle_callcenterventas=ac.iddetalle_callcenterventasFK
	        WHERE dc.cod_clienteFK=?

	        UNION ALL
	        SELECT 'ACTIVIDAD_CALLCENTER',CAST(a.fecha AS DATETIME),'Actividad de call center',
	               a.actividad,CONCAT('ACTIVIDAD #',a.idactividad_callcenter),NULL,NULL,'REGISTRADA',
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=a.cod_usarioFK LIMIT 1),'Sin responsable'),
	               a.cod_usarioFK
	        FROM actividad_callcenter a WHERE a.cod_clienteFK=?

	        UNION ALL
	        SELECT 'SOLICITUD_CREDITO',CAST(s.fecha AS DATETIME),
	               CONCAT('Solicitud de crédito #',s.idSolicitudCredito),
	               CONCAT_WS(' - ',s.detalleVenta,s.observacion),
	               CONCAT('SOLICITUD #',s.idSolicitudCredito),s.entrega_inicial,NULL,s.estado,
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=s.cod_usuarioFK LIMIT 1),'Sin responsable'),
	               s.cod_usuarioFK
	        FROM solicitudcredito s WHERE s.cod_clienteFK=?

	        UNION ALL
	        SELECT 'FOTO',CAST(f.fecha AS DATETIME),'Foto agregada al expediente',
	               f.descripcion,CONCAT('FOTO #',f.idfotos_cliente),NULL,NULL,COALESCE(f.calificacion,'REGISTRADA'),
	               COALESCE((SELECT TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona))
	                         FROM persona p WHERE p.cod_persona=f.cod_cobradorFK LIMIT 1),'Sin responsable'),
	               f.cod_cobradorFK
	        FROM fotos_cliente f WHERE f.cod_clienteFK=?

	        UNION ALL
	        SELECT 'ARCHIVO',CAST(ar.fecha AS DATETIME),'Archivo agregado al expediente',
	               ar.descripcion,CONCAT('ARCHIVO #',ar.idarchivos_cliente),NULL,NULL,COALESCE(ar.estado_archivo,'REGISTRADO'),
	               'Sistema',NULL
	        FROM archivos_cliente ar WHERE ar.cod_clienteFK=?
	      ) flujo
	      LEFT JOIN usuario u ON u.cod_usuario=flujo.responsable_codigo
	      WHERE (?='' OR flujo.tipo=?)
	        AND (?='' OR DATE(flujo.fecha_evento)>=?)
	        AND (?='' OR DATE(flujo.fecha_evento)<=?)
	      ORDER BY DATE(flujo.fecha_evento) DESC,
	               CASE flujo.tipo WHEN 'VENTA' THEN 1 WHEN 'PAGO' THEN 2 ELSE 3 END,
	               flujo.fecha_evento DESC,flujo.referencia DESC
	      LIMIT ? OFFSET ?";

	$stmt=$mysqli->prepare($sql);
	if(!$stmt){
		responderFlujo(array("1" => "error"));
	}
	$parametros=array(
		$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,
		$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,
		$tipo,$tipo,$fecha_desde,$fecha_desde,$fecha_hasta,$fecha_hasta,
		$limiteConsulta,$offset
	);
	$tiposBind='iiiiiiiiiiissssssii';
	enlazarParametrosFlujo($stmt,$tiposBind,$parametros);
	if(!$stmt->execute()){
		responderFlujo(array("1" => "error"));
	}
	$result=$stmt->get_result();
	$eventos=array();
	while($fila=mysqli_fetch_assoc($result)){
		$eventos[]=array(
			"tipo" => $fila['tipo'],
			"fecha" => $fila['fecha_evento'],
			"titulo" => textoUtf8Flujo($fila['titulo']),
			"descripcion" => textoUtf8Flujo($fila['descripcion']),
			"referencia" => textoUtf8Flujo($fila['referencia']),
			"monto" => $fila['monto']===null ? null : floatval($fila['monto']),
			"dias_atraso" => $fila['dias_atraso']===null ? null : intval($fila['dias_atraso']),
			"estado" => textoUtf8Flujo($fila['estado']),
			"responsable" => textoUtf8Flujo($fila['responsable']),
			"responsable_foto" => textoUtf8Flujo($fila['responsable_foto'])
		);
	}
	$stmt->close();
	$hayMas=count($eventos)>$limite;
	if($hayMas) array_pop($eventos);
	$mysqli->close();
	responderFlujo(array(
		"1" => "exito",
		"2" => $cliente,
		"3" => $resumen,
		"4" => $eventos,
		"5" => $hayMas,
		"6" => $offset+count($eventos)
	));
}

function obtenerClienteFlujo($mysqli,$cod_cliente)
{
	$sql="SELECT c.cod_cliente,TRIM(CONCAT_WS(' ',p.nombre_persona,p.apellido_persona)) AS nombre,
	             COALESCE(NULLIF(c.ci_cliente,''),c.rut_cliente) AS documento,p.telefono,
	             p.email,p.direccion,c.estado,c.fecha_insert,
	             COALESCE((SELECT z.nombre FROM zona z WHERE z.idzona=c.idzonaFk LIMIT 1),'Sin zona') AS zona
	      FROM cliente c INNER JOIN persona p ON p.cod_persona=c.cod_cliente
	      WHERE c.cod_cliente=? LIMIT 1";
	$stmt=$mysqli->prepare($sql);
	$stmt->bind_param('i',$cod_cliente);
	$stmt->execute();
	$result=$stmt->get_result();
	if(mysqli_num_rows($result)===0){
		$stmt->close();
		return null;
	}
	$fila=mysqli_fetch_assoc($result);
	$stmt->close();
	return array(
		"codigo" => intval($fila['cod_cliente']),
		"nombre" => textoUtf8Flujo($fila['nombre']),
		"documento" => textoUtf8Flujo($fila['documento']),
		"telefono" => textoUtf8Flujo($fila['telefono']),
		"email" => textoUtf8Flujo($fila['email']),
		"direccion" => textoUtf8Flujo($fila['direccion']),
		"estado" => textoUtf8Flujo($fila['estado']),
		"zona" => textoUtf8Flujo($fila['zona']),
		"fecha_registro" => $fila['fecha_insert']
	);
}

function obtenerResumenFlujo($mysqli,$cod_cliente)
{
	$sql="SELECT
	      (SELECT COUNT(*) FROM venta v WHERE v.cod_clienteFK=?) AS ventas,
	      (SELECT IFNULL(SUM(v.total_venta),0) FROM venta v WHERE v.cod_clienteFK=?) AS total_ventas,
	      (SELECT COUNT(*) FROM pago p INNER JOIN venta v ON v.cod_venta=p.cod_venta_fk WHERE v.cod_clienteFK=?) AS pagos,
	      (SELECT IFNULL(SUM(p.Monto),0) FROM pago p INNER JOIN venta v ON v.cod_venta=p.cod_venta_fk WHERE v.cod_clienteFK=?) AS total_pagos,
	      ((SELECT COUNT(*) FROM visitascliente vc WHERE vc.cod_clienteFK=?)
	       +(SELECT COUNT(*) FROM agenda_callcenterventas ac INNER JOIN detalle_callcenterventas dc
	         ON dc.iddetalle_callcenterventas=ac.iddetalle_callcenterventasFK WHERE dc.cod_clienteFK=?)) AS agendas,
	      (SELECT COUNT(*) FROM solicitudcredito s WHERE s.cod_clienteFK=?) AS solicitudes";
	$stmt=$mysqli->prepare($sql);
	$stmt->bind_param('iiiiiii',$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente,$cod_cliente);
	$stmt->execute();
	$result=$stmt->get_result();
	$fila=mysqli_fetch_assoc($result);
	$stmt->close();
	return array(
		"ventas" => intval($fila['ventas']),
		"total_ventas" => floatval($fila['total_ventas']),
		"pagos" => intval($fila['pagos']),
		"total_pagos" => floatval($fila['total_pagos']),
		"agendas" => intval($fila['agendas']),
		"solicitudes" => intval($fila['solicitudes'])
	);
}
?>
