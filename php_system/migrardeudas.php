<?php
// El JSON de entrada
$jsonData = '[
    {
        "comprobante":"CUENTA CARGADA MANUALMENTE",
        "documento":"4855913",
        "razonSocial":"LIZ JOHANA MARIA LEIVA BRITEZ ",
        "importeCuenta":774000,
        "importePagado":0,
        "saldo":774000,
        "fechaCuenta":"08\/06\/2017",
        "fechaInicioPago":"22\/05\/2017",
        "cantidadCuotas":6,
        "cantidadCuotasPagadas":0
    },
    {
        "comprobante":"CUENTA CARGADA MANUALMENTE",
        "documento":"1.091.378",
        "razonSocial":"EUSEVIO SILVA(INFO) ",
        "importeCuenta":2750000,
        "importePagado":50000,
        "saldo":2700000,
        "fechaCuenta":"09\/06\/2017",
        "fechaInicioPago":"12\/05\/2017",
        "cantidadCuotas":55,
        "cantidadCuotasPagadas":1
    },
    {
        "comprobante":"CUENTA CARGADA MANUALMENTE",
        "documento":"4443443",
        "razonSocial":"MILDA CONCEPCION BRITEZ FERNANDEZ(INFO) ",
        "importeCuenta":3760000,
        "importePagado":0,
        "saldo":3760000,
        "fechaCuenta":"12\/06\/2017",
        "fechaInicioPago":"06\/06\/2017",
        "cantidadCuotas":8,
        "cantidadCuotasPagadas":0
    }
]';

// Decodificar el JSON a un array asociativo de PHP
$dataArray = json_decode($jsonData, true);

// Verificar si hubo un error en la decodificación
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "Error al decodificar el JSON: " . json_last_error_msg();
    exit;
}


// Recorrer el array y mostrar la información
foreach ($dataArray as $item) {
    echo "Comprobante: " . $item['comprobante'] . "<br>";
    echo "Documento: " . $item['documento'] . "<br>";
    echo "Razon Social: " . $item['razonSocial'] . "<br>";
    echo "Importe Cuenta: " . $item['importeCuenta'] . "<br>";
    echo "Importe Pagado: " . $item['importePagado'] . "<br>";
    echo "Saldo: " . $item['saldo'] . "<br>";
    echo "Fecha Cuenta: " . $item['fechaCuenta'] . "<br>";
    echo "Fecha Inicio Pago: " . $item['fechaInicioPago'] . "<br>";
    echo "Cantidad Cuotas: " . $item['cantidadCuotas'] . "<br>";
    echo "Cantidad Cuotas Pagadas: " . $item['cantidadCuotasPagadas'] . "<br>";
    echo "<br> <br> <br> <br>";
	
	
	
	
	
	
}
?>
