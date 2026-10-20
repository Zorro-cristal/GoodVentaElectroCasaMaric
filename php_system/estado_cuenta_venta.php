<?php
// Estado de cuenta por saldo de cuotas; los contados no necesitan cuotas ficticias.
function sqlCuotaCapitalPendiente($alias='ec')
{
	return '(IFNULL('.$alias.'.Monto,0)-IFNULL('.$alias.'.descuento,0)-IFNULL((SELECT SUM(ep.Monto) FROM pago ep WHERE ep.cod_creditoFK='.$alias.'.idcredito AND ep.Tipo=\'Pago Cuota\'),0))';
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
	return '(CASE WHEN '.$alias.'.TipoVenta=\'CONTADO\' THEN IFNULL('.$alias.'.total_venta,0) ELSE IFNULL((SELECT SUM(ep.Monto) FROM pago ep WHERE ep.cod_venta_fk='.$alias.'.cod_venta AND ep.Tipo=\'Pago Cuota\'),0) END)';
}

function totalPagadoVenta($tipoVenta,$totalVenta,$abonos,$entrega=0)
{
	return strtoupper(trim($tipoVenta))==='CONTADO' ? (float)$totalVenta : (float)$abonos+(float)$entrega;
}

function deudaPendienteVenta($tipoVenta,$datos)
{
	return strtoupper(trim($tipoVenta))==='CONTADO' ? 0 : max(0,(float)$datos[4]);
}
