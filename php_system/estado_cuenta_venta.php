<?php
// Estado de cuenta por saldo de cuotas; los contados no necesitan cuotas ficticias.
function sqlCapitalPagadoSaldo($referencia,$porVenta=false)
{
	$columnaPago=$porVenta ? 'cod_venta_fk' : 'cod_creditoFK';
	$columnaRegularizacion=$porVenta ? 'cod_venta' : 'idcredito';
	// Consultar cada origen por su indice evita materializar toda la vista UNION.
	return '(IFNULL((SELECT SUM(ep.Monto) FROM pago ep WHERE ep.'.$columnaPago.'='.$referencia.' AND ep.Tipo=\'Pago Cuota\'),0)'
		.'+IFNULL((SELECT SUM(rh.importe) FROM regularizacion_historica_cuota rh WHERE rh.'.$columnaRegularizacion.'='.$referencia
		.' AND rh.anulada_en IS NULL AND rh.clave_activa=rh.clave_regularizacion'
		.' AND rh.credito_activo=rh.idcredito AND rh.venta_activa=rh.cod_venta AND rh.importe>0),0))';
}

function sqlCuotaCapitalPendiente($alias='ec')
{
	return '(IFNULL('.$alias.'.Monto,0)-IFNULL('.$alias.'.descuento,0)-'.sqlCapitalPagadoSaldo($alias.'.idcredito').')';
}

function sqlVentaPendiente($alias='vt')
{
	return '('.$alias.'.TipoVenta<>\'CONTADO\' AND EXISTS (SELECT 1 FROM credito ec WHERE ec.cod_venta='.$alias.'.cod_venta AND ('.sqlCuotaCapitalPendiente('ec').'>0 OR IFNULL(ec.deudaInteres,0)>0)))';
}

function sqlVentaPagada($alias='vt')
{
	// Un credito sin cronograma no demuestra ni una deuda ni una cancelacion.
	return '('.$alias.'.TipoVenta=\'CONTADO\' OR (EXISTS (SELECT 1 FROM credito et WHERE et.cod_venta='.$alias.'.cod_venta AND et.tipo<>\'PENDIENTE\') AND NOT '.sqlVentaPendiente($alias).'))';
}

function sqlCapitalCobradoVenta($alias='vt')
{
	return '(CASE WHEN '.$alias.'.TipoVenta=\'CONTADO\' THEN IFNULL('.$alias.'.total_venta,0) ELSE '.sqlCapitalPagadoSaldo($alias.'.cod_venta',true).' END)';
}

function totalPagadoVenta($tipoVenta,$totalVenta,$abonos,$entrega=0)
{
	return strtoupper(trim($tipoVenta))==='CONTADO' ? (float)$totalVenta : (float)$abonos+(float)$entrega;
}

function deudaPendienteVenta($tipoVenta,$datos)
{
	return strtoupper(trim($tipoVenta))==='CONTADO' ? 0 : max(0,(float)$datos[4]);
}
