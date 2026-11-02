<?php
// La entrega puede conservar un plazo numerico; el tipo identifica su funcion.
function sqlCreditoEsEntrega($alias='cr')
{
	return "(UPPER(TRIM(IFNULL(".$alias.".tipo,'')))='ENTREGA' OR UPPER(TRIM(IFNULL(".$alias.".plazo,'')))='ENTREGA')";
}

function sqlCreditoEsCuota($alias='cr')
{
	return "(UPPER(TRIM(IFNULL(".$alias.".tipo,'')))='CUOTAS' AND NOT ".sqlCreditoEsEntrega($alias).
		" AND UPPER(TRIM(IFNULL(".$alias.".plazo,'')))<>'CONTADO' AND IFNULL(".$alias.".Monto,0)>0".
		" AND UPPER(TRIM(IFNULL(".$alias.".Esado,'')))<>'INACTIVO')";
}

function creditoEsEntrega($credito)
{
	return strtoupper(trim((string)$credito['tipo']))==='ENTREGA'
		|| strtoupper(trim((string)$credito['plazo']))==='ENTREGA';
}

function creditoEsCuota($credito)
{
	return strtoupper(trim((string)$credito['tipo']))==='CUOTAS' && !creditoEsEntrega($credito)
		&& strtoupper(trim((string)$credito['plazo']))!=='CONTADO' && (float)$credito['Monto']>0
		&& strtoupper(trim((string)$credito['Esado']))!=='INACTIVO';
}

function plazoCreditoVisible($credito)
{
	return creditoEsEntrega($credito) ? 'Entrega' : $credito['plazo'];
}
