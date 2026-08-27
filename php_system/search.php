<?php
if (isset($_GET['q'])) {
    $search = htmlspecialchars($_GET['q']); // Evita inyección de código
    echo "Resultados para: " . $search;
}
?>
