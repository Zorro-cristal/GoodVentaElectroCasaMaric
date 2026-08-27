<?php
// Función para convertir de YYYY-MM-DD a DD-MM-YYYY
function formatDateToDDMMYYYY($dateString) {
    // Verificar que la entrada no esté vacía y que sea una cadena válida
    if (empty($dateString) || !is_string($dateString)) {
        throw new Exception('Formato de fecha inválido.');
    }
    
    // Separar el string de fecha en partes (YYYY, MM, DD)
    $dateParts = explode('-', $dateString);
    
    // Verificar que las partes de la fecha sean válidas
    if (count($dateParts) !== 3) {
        throw new Exception('Formato de fecha inválido.');
    }
    
    list($year, $month, $day) = $dateParts;
    
    // Retornar la fecha en formato DD-MM-YYYY
    return sprintf('%02d-%02d-%04d', $day, $month, $year);
}

// Función para convertir de DD-MM-YYYY a YYYY-MM-DD
function formatDateToYYYYMMDD($dateString) {
    // Verificar que la entrada no esté vacía y que sea una cadena válida
    if (empty($dateString) || !is_string($dateString)) {
        throw new Exception('Formato de fecha inválido.');
    }
    
    // Separar el string de fecha en partes (DD, MM, YYYY)
    $dateParts = explode('-', $dateString);
    
    // Verificar que las partes de la fecha sean válidas
    if (count($dateParts) !== 3) {
        throw new Exception('Formato de fecha inválido.');
    }
    
    list($day, $month, $year) = $dateParts;
    
    // Retornar la fecha en formato YYYY-MM-DD
    return sprintf('%04d-%02d-%02d', $year, $month, $day);
}
?>


