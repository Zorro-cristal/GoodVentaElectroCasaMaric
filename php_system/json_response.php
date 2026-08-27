<?php

if (!function_exists("gt_json_response")) {
	function gt_json_response($informacion)
	{
		if (!headers_sent()) {
			header("Content-Type: application/json; charset=UTF-8");
		}
		echo json_encode($informacion);
	}
}

?>
