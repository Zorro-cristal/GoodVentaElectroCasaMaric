<?php
  
require("conexion.php"); 
CalcularClasificacionCliente();


 
function CalcularClasificacionCliente(){ 
$mysqli=conectar_al_servidor();
	 $pagina='';
	$sql= " Select cod_cliente from cliente where estado='Activo'   ";
 
   $stmt = $mysqli->prepare($sql);  

if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 $nroRegistro= $valor; 
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		   
		      $cod_cliente=$valor['cod_cliente'];  
		$ResultadoDA = CalcularVenta($cod_cliente);
$promedio = $ResultadoDA[0];
$ContadorCuota = $ResultadoDA[1];

if ($ContadorCuota == 0) {
    ActualizarCalificacion('SIN REGISTRO', $cod_cliente);
} else {
    if ($promedio <= 10) { $faja='CAT A'; }
    elseif ($promedio <= 20) { $faja='CAT B'; }
    elseif ($promedio <= 30) { $faja='CAT C'; }
    elseif ($promedio <= 40) { $faja='CAT D'; }
    elseif ($promedio <= 50) { $faja='CAT E'; }
    elseif ($promedio <= 60) { $faja='CAT F'; }
    elseif ($promedio <= 70) { $faja='CAT G'; }
    elseif ($promedio <= 80) { $faja='CAT H'; }
    elseif ($promedio <= 100) { $faja='CAT I'; }
    elseif ($promedio <= 150) { $faja='CAT J'; }
    else { $faja='CAT K'; }

    ActualizarCalificacion($faja, $cod_cliente);
}

	  }
 }
 
 
// $informacion =array("1" => "exito","2" => $pagina,"3" => $nroRegistro);
// echo json_encode($informacion);	
exit;
 
}
function CalcularVenta($cod_cliente)
{
    $mysqli = conectar_al_servidor();

    $sql = "
        SELECT  
            c.fechapago AS FechaVencimiento,
            (
                SELECT p.Fecha 
                FROM pago p 
                WHERE c.idcredito = p.cod_creditoFK
                ORDER BY p.idPago DESC 
                LIMIT 1
            ) AS FechaPago
        FROM venta vt
        INNER JOIN credito c ON c.cod_venta = vt.cod_venta
        WHERE 
            IFNULL(
                (SELECT COUNT(*) FROM cancelaciones WHERE cod_venta = vt.cod_venta),
                0
            ) = 0
            AND vt.cod_clienteFK = '$cod_cliente' and c.Monto!=0  and c.fechapago<=CURDATE()
			  and vt.TipoVenta='CREDITO' order by  c.fechapago asc "; 
    $result = $mysqli->query($sql);
    if (!$result) {
        return [0,0]; // en caso de error SQL
    }

    $hoy = new DateTime();
    $total_dias_atraso = 0;
    $cuotas_con_atraso = 0;
    $contador = 0;

    while ($row = mysqli_fetch_assoc($result)) {

        $contador++;
        $fechaVencimiento = new DateTime($row['FechaVencimiento']);
        $dias_atraso = 0;

        if (!empty($row['FechaPago'])) {
            $fechaPago = new DateTime($row['FechaPago']);
            if ($fechaPago > $fechaVencimiento) {
                $dias_atraso = $fechaVencimiento->diff($fechaPago)->days;
            }
        } else {
            if ($hoy > $fechaVencimiento) {
                $dias_atraso = $fechaVencimiento->diff($hoy)->days;
            }
        }

        if ($dias_atraso > 0) {
            $total_dias_atraso += $dias_atraso;
            $cuotas_con_atraso++;
        }
    }

    $promedio = ($cuotas_con_atraso > 0) ? round($total_dias_atraso / $cuotas_con_atraso) : 0;

	echo($promedio."-".$contador."<br>");

    return [$promedio, $contador];
}



function ActualizarCalificacion($Calificacion, $cod_cliente)
{
    $mysqli = conectar_al_servidor();

    $sql = "UPDATE cliente SET calificacion_cliente=? WHERE cod_cliente=?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ss", $Calificacion, $cod_cliente);
    $stmt->execute();
}


 
?>