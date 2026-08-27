/*
ABM TIPO PAGO
*/
function valorSeguroInformeCliente(valor) {
	return valor === null || typeof valor === "undefined" ? "" : String(valor);
}

function limpiarContenedorInformeCliente(idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) {
		return null;
	}
	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}
	return contenedor;
}

function claseTablaInformeCliente(clase) {
	return clase === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
}

function crearFilaInformeCliente(clase, borde, espaciado, relleno, nombreFila, alSeleccionar) {
	var tabla = document.createElement("table");
	tabla.className = claseTablaInformeCliente(clase);
	tabla.setAttribute("border", valorSeguroInformeCliente(borde));
	tabla.setAttribute("cellspacing", valorSeguroInformeCliente(espaciado));
	tabla.setAttribute("cellpadding", valorSeguroInformeCliente(relleno));
	var cuerpo = document.createElement("tbody");
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	if (nombreFila) {
		fila.setAttribute("name", nombreFila);
	}
	if (typeof alSeleccionar === "function") {
		fila.onclick = function () {
			alSeleccionar(this);
		};
	}
	cuerpo.appendChild(fila);
	tabla.appendChild(cuerpo);
	return { tabla: tabla, fila: fila };
}

function agregarCeldaInformeCliente(fila, id, valor, ancho, oculta) {
	var celda = document.createElement("td");
	if (id) {
		celda.id = id;
	}
	if (ancho) {
		celda.style.width = ancho;
	}
	if (oculta) {
		celda.style.display = "none";
	}
	celda.textContent = valorSeguroInformeCliente(valor);
	fila.appendChild(celda);
	return celda;
}

function agregarTextoMultilineaInformeCliente(celda, valor) {
	var lineas = valorSeguroInformeCliente(valor).split(/\r?\n/);
	lineas.forEach(function (linea, indice) {
		if (indice > 0) {
			celda.appendChild(document.createElement("br"));
		}
		celda.appendChild(document.createTextNode(linea));
	});
}

function renderCuentaImpago(filas) {
	var contenedor = limpiarContenedorInformeCliente("table_Cliente_Impago");
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearFilaInformeCliente(registro.clase_fila, 1, 1, 5, "", null);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.fecha_visita_formateada, "15%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.cliente, "25%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.motivo, "30%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.cobrador, "15%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.fecha_compromiso_formateada, "15%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderCumpleClientes(filas) {
	var contenedor = limpiarContenedorInformeCliente("table_CumpleCliente");
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearFilaInformeCliente(registro.clase_fila, 1, 1, 5, "", obtenerDatosInformeCumpleCliente);
		agregarCeldaInformeCliente(tablaFila.fila, "td_id", registro.id_cliente, "", true);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_1", registro.fecha_nacimiento, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_2", registro.cliente, "20%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_3", registro.proximo_cumpleanos, "20%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_4", registro.zona, "15%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.telefono, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_5", registro.ultima_venta, "15%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.tramo, "5%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.estado_seguimiento, "5%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderDetalleCumpleCliente(filas) {
	var contenedor = limpiarContenedorInformeCliente("table_cargar_detalle_cliente_cumple");
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearFilaInformeCliente(registro.clase_fila, 0, 0, 0, "", null);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.observacion, "30%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.fecha, "30%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.estado, "30%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderClientesFieles(filas) {
	var contenedor = limpiarContenedorInformeCliente("table_Cliente_Fiel");
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearFilaInformeCliente(registro.clase_fila, 0, 0, 0, "TablaClientesFieles", obtenerdatosClienteFiel);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_1", registro.fecha_venta, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.numero_factura, "10%", false);

		var celdaCliente = agregarCeldaInformeCliente(tablaFila.fila, "", "", "15%", false);
		celdaCliente.appendChild(document.createTextNode(valorSeguroInformeCliente(registro.cliente)));
		celdaCliente.appendChild(document.createElement("br"));
		celdaCliente.appendChild(document.createTextNode("*" + valorSeguroInformeCliente(registro.documento) + "* "));
		var telefono = document.createElement("b");
		telefono.textContent = valorSeguroInformeCliente(registro.telefono);
		celdaCliente.appendChild(telefono);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_2", registro.cliente, "", true);

		var celdaProductos = agregarCeldaInformeCliente(tablaFila.fila, "", "", "18%", false);
		agregarTextoMultilineaInformeCliente(celdaProductos, registro.detalle_productos);

		var celdaMontos = agregarCeldaInformeCliente(tablaFila.fila, "", "", "10%", false);
		celdaMontos.appendChild(document.createTextNode("VNT:" + valorSeguroInformeCliente(registro.total_venta_formateado)));
		celdaMontos.appendChild(document.createElement("br"));
		celdaMontos.appendChild(document.createElement("br"));
		celdaMontos.appendChild(document.createTextNode("PG:" + valorSeguroInformeCliente(registro.total_pagado_formateado)));
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_3", registro.total_venta, "", true);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_4", registro.telefono, "", true);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_5", registro.id_cliente, "", true);
		agregarCeldaInformeCliente(tablaFila.fila, "td_datos_6", registro.id_venta, "", true);
		agregarCeldaInformeCliente(tablaFila.fila, "", valorSeguroInformeCliente(registro.creditos_pagados) + "/" + valorSeguroInformeCliente(registro.total_creditos), "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.dias_atraso, "7%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.total_deuda_formateado, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.vendedor, "10%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function aplicarEstiloPagoPendienteCliente(fila, estilo) {
	var estiloSeguro = valorSeguroInformeCliente(estilo).toLowerCase();
	if (estiloSeguro.indexOf("text-decoration: line-through") !== -1) {
		fila.style.textDecoration = "line-through";
	}
	if (estiloSeguro.indexOf("background-color: #ccc") !== -1) {
		fila.style.backgroundColor = "#ccc";
		fila.style.color = "#000";
	}
}

function renderPagosPendientesClienteFiel(filas) {
	var contenedor = limpiarContenedorInformeCliente("table_historial_clientefiel_pagos_pendientes");
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		if (registro.mostrar_titulo_factura) {
			var titulo = document.createElement("p");
			titulo.className = "ptituloZ";
			titulo.textContent = "Nro de Factura: " + valorSeguroInformeCliente(registro.numero_factura);
			fragmento.appendChild(titulo);
		}
		var tablaFila = crearFilaInformeCliente(registro.clase_fila, 1, 1, 5, "", null);
		aplicarEstiloPagoPendienteCliente(tablaFila.fila, registro.estilo_fila);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.plazo, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.fecha_pago, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.monto_formateado, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.descuento_formateado, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.total_interes_formateado, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.total_formateado, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.total_pagado_formateado, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.deuda_actual_formateada, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.dias_atraso, "10%", false);
		agregarCeldaInformeCliente(tablaFila.fila, "", registro.cantidad_pagos, "10%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

var listadoAbmTipoPago = null;
function iniciarListadoAbmTipoPago() {
	if (listadoAbmTipoPago || !window.AbmListadoCore) { return listadoAbmTipoPago; }
	var cuerpo = document.getElementById("table_abm_TipoPago");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmTipoPago";
	listadoAbmTipoPago = window.AbmListadoCore.crear({
		nombre: "tipo_pago",
		idCabecera: "cabeceraAbmTipoPago",
		idCuerpo: "table_abm_TipoPago",
		ordenInicial: "nombre",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "10%" },
			{ campo: "nombre", titulo: "DESCRIP.", ancho: "70%" },
			{ campo: "datos", titulo: "DATOS.", ancho: "20%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmTipoPago",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "nombre", columna: "nombre" },
				{ id: "td_datos_2", campo: "datos", columna: "datos" },
				{ id: "td_datos_3", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmTipoPago.iniciar();
	return listadoAbmTipoPago;
}

var listadoAuditoriaProducto = null;
function iniciarListadoAuditoriaProducto() {
	if (listadoAuditoriaProducto || !window.AbmListadoCore) { return listadoAuditoriaProducto; }
	var cuerpo = document.getElementById("table_AudiProducto");
	var cabecera = document.getElementById("tdTituloAudiProducto");
	if (!cuerpo || !cabecera) { return null; }
	listadoAuditoriaProducto = window.AbmListadoCore.crear({
		nombre: "auditoria_producto",
		idCabecera: "tdTituloAudiProducto",
		idCuerpo: "table_AudiProducto",
		ordenInicial: "fecha",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD BARRA", ancho: "10%" },
			{ campo: "producto", titulo: "NOMBRE PRODUCTO", ancho: "26%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "10%" },
			{ campo: "operacion", titulo: "OPERACION", ancho: "7%" },
			{ campo: "cantidad", titulo: "CANTIDAD", ancho: "7%" },
			{ campo: "usuario", titulo: "USUARIO", ancho: "10%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "10%" },
			{ campo: "hora", titulo: "HORA", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: {
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ campo: "codigo_barra", columna: "codigo_barra", className: "tdRegistroSearch" },
				{ campo: "producto", columna: "producto", className: "tdRegistroSearch" },
				{ campo: "tipo", columna: "tipo", className: "tdRegistroSearch" },
				{ campo: "operacion", columna: "operacion", className: "tdRegistroSearch" },
				{ campo: "cantidad_formateada", columna: "cantidad", className: "tdRegistroSearch" },
				{ campo: "usuario", columna: "usuario", className: "tdRegistroSearch" },
				{ campo: "fecha", columna: "fecha", className: "tdRegistroSearch" },
				{ campo: "hora", columna: "hora", className: "tdRegistroSearch" },
				{ campo: "local", columna: "local", className: "tdRegistroSearch" },
				{ id: "td_datos_usuario", campo: "codigo_usuario", tecnica: true },
				{ id: "td_datos_stock_local", campo: "codigo_stock_local", tecnica: true }
			]
		}
	});
	listadoAuditoriaProducto.iniciar();
	return listadoAuditoriaProducto;
}
function verCerrarAbmTipoPago(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmTipoPago").style.display==""){
		document.getElementById("divMinimizadoTipoPago").style.display="none"
		limpiarcamposTipoPago()
		limpiarcamposbuscarTipoPago()
 
	$("div[id=divAbmTipoPago]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADOTIPOPAGO","accion")==false){return;}
		mostrarSoloUno("divAbmTipoPago")	
		document.getElementById("divAbmTipoPago").style.display=""
 
	}
}

function verCerrarVentanaAbmTipoPago(d, l) {
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOTIPOPAGO","accion")==false){return;}
			limpiarcamposTipoPago()
		}
		$("div[id=divAbmTipoPago2]").fadeIn(250)
		document.getElementById('divAbmTipoPago1').style.display = "none"
	} else {
		$("div[id=divAbmTipoPago1]").fadeIn(250)
		document.getElementById('divAbmTipoPago2').style.display = "none"
	}
}


function limpiarcamposbuscarTipoPago(){
	    document.getElementById('inptBuscarAbmTipoPago2').value=""
		document.getElementById("table_abm_TipoPago").innerHTML = ""
		document.getElementById("inptTotalRegistoTipoPago").value = "";
}
function minimizarabmTipoPago(){ 
	$("div[id=divAbmTipoPago]").fadeOut(500);	
	document.getElementById("divMinimizadoTipoPago").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmTipoVenta"));
}

function verVentanaEditarTipoPago() {
	if (idAbmTipoPago == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	verCerrarVentanaAbmTipoPago("1", "2")
}
var idAbmTipoPago = ""
function obtenerdatosabmTipoPago(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreTipoPago').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccTipoPago').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptDatosTipoPago').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptEstadoTipoPago').value = $(datostr).children('td[id="td_datos_3"]').html();
	
	document.getElementById('btnAbmTipoPago').value = "Editar datos";
	document.getElementById('btnEditarDatosTipoPago').style.backgroundColor="";
	idAbmTipoPago = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposTipoPago() {
	var inptNombreTipoPago = document.getElementById('inptNombreTipoPago').value
	var inptDatosTipoPago =  $("select[id=inptDatosTipoPago]").children(":selected").attr("value")
	var inptEstadoTipoPago = document.getElementById('inptEstadoTipoPago').value
	if (inptNombreTipoPago == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE LA CAJA")
		return false;
	}
	
	var accion = "";
	if (idAbmTipoPago != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADOTIPOPAGO","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADOTIPOPAGO","accion")==false){return;}
	}
	abmTipoPago(inptNombreTipoPago, inptDatosTipoPago  ,inptEstadoTipoPago , idAbmTipoPago, accion);
}
function abmTipoPago(nombre, dato  ,estado , idtipo, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_tipoPago", idtipo)
	datos.append("nombre", nombre)
	datos.append("datos", dato)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmTipoVenta.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("")
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					limpiarcamposTipoPago()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmTipoPago = ""
					buscarabmTipoPago();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function checkestadoTipoPago(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarTipoPago1').checked=true
	document.getElementById('inptSeleccEstadoBuscarTipoPago2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarTipoPago1').checked=false
	document.getElementById('inptSeleccEstadoBuscarTipoPago2').checked=true
	}
}
function buscarabmTipoPago() {
	if(controlacceso("BUSCARLISTADOTIPOPAGO","accion")==false){return;}
	var listado = iniciarListadoAbmTipoPago();
	var nombre = document.getElementById('inptBuscarAbmTipoPago2').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarTipoPago1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_TipoPago").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nombre": nombre,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmTipoVenta.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_TipoPago").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_TipoPago").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptTotalRegistoTipoPago").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmTipoPago);
} else {
	iniciarListadoAbmTipoPago();
}
function limpiarcamposTipoPago() {
	document.getElementById('inptNombreTipoPago').value = "";
	document.getElementById('inptDatosTipoPago').value = "NO";	
	document.getElementById('inptRegistroSeleccTipoPago').value = "";
	document.getElementById('inptEstadoTipoPago').value = "Activo";
	document.getElementById('btnEditarDatosTipoPago').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmTipoPago').value = "Guardar datos";
	idAbmTipoPago= "";
}








function verCerrarInformeClieteImpago(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divClienteImpago").style.display==""){
		document.getElementById("divMinimizadoInformeClienteImpago").style.display="none"
		
 
	$("div[id=divClienteImpago]").fadeOut(500);			
	}else{	
        // if(controlacceso("VERVISITACLIENTES","accion")==false){return;}	
		document.getElementById("divClienteImpago").style.display=""
		  
	}
}


function minimizarInformeClieteImpago(){
 
	$("div[id=divClienteImpago]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeClienteImpago").style.display="";
}



var Contenidomensaje ="";

function checkHistorialClieteImpago(d){	
	if(d=="1"){
		document.getElementById('checkHistorialClieteImpago1').checked=true
		document.getElementById('checkHistorialClieteImpago2').checked=false
		document.getElementById('inptBuscarClieteImpagoF1').value = "";
	    document.getElementById('inptBuscaClieteImpagoF2').value = "";	
	}else{		
		document.getElementById('checkHistorialClieteImpago1').checked=false
		document.getElementById('checkHistorialClieteImpago2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarClieteImpagoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaClieteImpagoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


function checkHistorialTipoFecha(d){	
	if(d=="1"){
		document.getElementById('checkHistorialCIFC').checked=true
		document.getElementById('checkHistorialCIFV').checked=false
	}else{		
		document.getElementById('checkHistorialCIFC').checked=false
		document.getElementById('checkHistorialCIFV').checked=true
	
	}
}



function buscarcuentaImpago() {

	var fecha1 = document.getElementById('inptBuscarClieteImpagoF1').value
	var fecha2 = document.getElementById('inptBuscaClieteImpagoF2').value
	var local = document.getElementById('inptlocalImpago').value
	var zona= document.getElementById("inptZonaImpago").value	
	var cliente= document.getElementById("inptBuscarInfClienteImpago1").value
	var cobrador= document.getElementById("inptBuscarInfClienteImpago2").value
	var estado= document.getElementById("inptBuscarInfClienteImpago3").value
	var campoBusquedaGeneral = document.getElementById("inptBuscarGeneralVisitaClientes")
	var buscarGeneral = campoBusquedaGeneral ? campoBusquedaGeneral.value.trim() : ""
	var tipo=""
	if(document.getElementById('checkHistorialCIFC').checked==true){
		tipo="compromiso"
	}else{
		tipo="visita"
	}

	if(document.getElementById('checkHistorialClieteImpago2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	}else{
	fecha1 = ""
	fecha2 = ""
	}
	
	
   
	document.getElementById("table_Cliente_Impago").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoCliente_Impago").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"local": local,
			"zona": zona,
			"cliente": cliente,
			"cobrador": cobrador,
			"buscar_general": buscarGeneral,
			"tipo": tipo,
			"estado": estado,
			"funt": "buscarcuentaImpago",
			"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Cliente_Impago").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_Cliente_Impago").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					renderCuentaImpago(datos_buscados);
					document.getElementById("inptTotalRegistoCliente_Impago").value = datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


function copiarAlPortapapelesImpago() {
  var aux = document.createElement("input");
  aux.setAttribute("value", Contenidomensaje);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ver_vetana_informativa("MENSAJE GENERADO CON EXITO FAVOR PEGAR EN EL ARCHIVO EXCEL")
}



/* INFORME AUDITORIA PRODUCTO */

function verCerrarInformeAudiProducto(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAudiProducto").style.display==""){
		document.getElementById("divMinimizadoInformeAudiProducto").style.display="none"
		 
	$("div[id=divAudiProducto]").fadeOut(500);		
limpiarInformeAudiProducto()	
	}else{	
	 if(controlacceso("VERAUDITORIAPRODUCTO","accion")==false){return;}
	 mostrarSoloUno("divAudiProducto")	
		document.getElementById("divAudiProducto").style.display=""
		  
	}
}

function limpiarInformeAudiProducto(){
	checkHistorialAudiProducto(1)
	var buscadorGeneral = document.getElementById("inptBuscarGeneralAudiProducto")
	if (buscadorGeneral) buscadorGeneral.value = ''
	document.getElementById("inptBuscarInfAudiProducto1").value = ''
	document.getElementById("inptBuscarInfAudiProducto2").value = ''
	document.getElementById("inptBuscarInfAudiProducto3").value = ''
	document.getElementById("inptBuscarInfAudiProducto4").value = ''
	document.getElementById("inptTotalRegistoAudiProducto").value = ''
	document.getElementById("table_AudiProducto").innerHTML = ''
	if (listadoAuditoriaProducto) { listadoAuditoriaProducto.establecerRegistros([]); }
}

function minimizarInformeAudiProducto(){
 
	$("div[id=divAudiProducto]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeAudiProducto").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuAuditoriaProducto"));
}

function checkHistorialAudiProducto(d){	
	if(d=="1"){
		document.getElementById('checkHistorialAudiProducto1').checked=true
		document.getElementById('checkHistorialAudiProducto2').checked=false
		document.getElementById('inptBuscarAudiProductoF1').value = "";
	    document.getElementById('inptBuscaAudiProductoF2').value = "";	
	}else{		
		document.getElementById('checkHistorialAudiProducto1').checked=false
		document.getElementById('checkHistorialAudiProducto2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarAudiProductoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaAudiProductoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


function buscarSelectAuditoriaProducto() {
	document.getElementById("inptBuscarInfAudiProducto5").innerHTML = "";	
	document.getElementById("inptBuscarInfAudiProducto3").innerHTML = "";	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarSelectAuditoriaProducto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					document.getElementById("inptBuscarInfAudiProducto5").innerHTML ="<option value=''>SELECCIONAR</option>" + datos[3]
					document.getElementById("inptBuscarInfAudiProducto3").innerHTML ="<option value=''>SELECCIONAR</option>" + datos[2]
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



function buscarAudiProducto() {
 if(controlacceso("VERAUDITORIAPRODUCTO","accion")==false){return;}
	var listado = iniciarListadoAuditoriaProducto();
	var fecha1 = document.getElementById('inptBuscarAudiProductoF1').value
	var fecha2 = document.getElementById('inptBuscaAudiProductoF2').value
	var local = document.getElementById('inptlocalAudiProducto').value
	var usuario= document.getElementById("inptBuscarInfAudiProducto3").value	
	var producto= document.getElementById("inptBuscarInfAudiProducto2").value
	var cod_barra= document.getElementById("inptBuscarInfAudiProducto1").value
	var fecha= document.getElementById("inptBuscarInfAudiProducto4").value
	var tipo= document.getElementById("inptBuscarInfAudiProducto5").value
	var buscadorGeneral = document.getElementById("inptBuscarGeneralAudiProducto")
	var busqueda_general = buscadorGeneral ? buscadorGeneral.value : ""

	if(!document.getElementById('checkHistorialAudiProducto2').checked==true){
	fecha1 = ""
	fecha2 = ""
	}
	 
   
	document.getElementById("table_AudiProducto").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoAudiProducto").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"local": local,
			"usuario": usuario,
			"producto": producto,
			"cod_barra": cod_barra,
			"fecha": fecha,
			"tipo": tipo,
			"busqueda_general": busqueda_general,
			"formato": listado ? "json" : "",
			"funt": "AuditoriaProducto"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_AudiProducto").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_AudiProducto").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado && Array.isArray(datos[2])) {
						listado.establecerRegistros(datos[2]);
					} else {
						document.getElementById("table_AudiProducto").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					}
					document.getElementById("inptTotalRegistoAudiProducto").value = datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function verCerrarInformeClienteFiel(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divClienteFiel").style.display==""){
		document.getElementById("divMinimizadoInformeClienteFiel").style.display="none"
		
limpiarinformeclientefiel()
	$("div[id=divClienteFiel]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMECLIENTEFIEL","accion")==false){return;}
mostrarSoloUno("divClienteFiel")	
		document.getElementById("divClienteFiel").style.display=""
	
	}
}


function minimizarInformeClienteFiel(){
	$("div[id=divClienteFiel]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeClienteFiel").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuClienteFiel"));
}

function limpiarinformeclientefiel(){
	document.getElementById('inptlocalClienteFiel').value = '';
	document.getElementById('inptCondicionClienteFiel').value = '';
	document.getElementById('inptTipoVentaClienteFiel').value = '';
	document.getElementById('inptDiasAtrasoClienteFiel').value = '';
	document.getElementById('inptZonaClienteFiel').value = '';
	
	document.getElementById('inptBuscarInfClienteFiel1').value = '';
	document.getElementById('inptBuscarInfClienteFiel2').value = '';
	checkHistorialClienteFiel(1)
	cod_clienteFiel = '';
	verCerrarVentanasClientesFiel(1)
	
	document.getElementById('table_historial_clientefiel_pagos_pendientes').innerHTML = ''
	document.getElementById('table_Cliente_Fiel').innerHTML = ''
}

function checkHistorialClienteFiel(d){	
	if(d=="1"){
		document.getElementById('checkHistorialClienteFiel1').checked=true
		document.getElementById('checkHistorialClienteFiel2').checked=false
		document.getElementById('inptBuscarClienteFielF1').value = "";
	    document.getElementById('inptBuscaClienteFielF2').value = "";	
	}else{		
		document.getElementById('checkHistorialClienteFiel1').checked=false
		document.getElementById('checkHistorialClienteFiel2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarClienteFielF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaClienteFielF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


function buscarClienteFiel() {
if(controlacceso("VERINFORMECLIENTEFIEL","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarClienteFielF1').value
	var fecha2 = document.getElementById('inptBuscaClienteFielF2').value
	var local = document.getElementById('inptlocalClienteFiel').value
	var zona= document.getElementById("inptZonaClienteFiel").value	
	var cliente= document.getElementById("inptBuscarInfClienteFiel1").value
	var vendedor= document.getElementById("inptBuscarInfClienteFiel2").value
	var condicion= document.getElementById("inptCondicionClienteFiel").value
	var tipoventa= document.getElementById("inptTipoVentaClienteFiel").value
	var diasatraso= document.getElementById("inptDiasAtrasoClienteFiel").value

	if(document.getElementById('checkHistorialClienteFiel2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	}else{
	fecha1 = ""
	fecha2 = ""
	}
   
	document.getElementById("table_Cliente_Fiel").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoCliente_Fiel").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"local": local,
			"zona": zona,
			"cliente": cliente,
			"vendedor": vendedor,
			"condicion": condicion,
			"tipoventa": tipoventa,
			"diasatraso": diasatraso,
			"funt": "buscarClienteFiel",
			"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Cliente_Fiel").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_Cliente_Fiel").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					renderClientesFieles(datos_buscados);
					document.getElementById("inptTotalRegistoCliente_Fiel").value = datos[3];
					document.getElementById("table_Cliente_Fiel_excel").innerHTML = datos[5];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function ExcelInformeClientesFiel() {

	$("#table_Cliente_Fiel_excel").table2excel({
       // exclude CSS class
       exclude: ".noExl",
       name: "cobradores_meta"
       }); 
	 
}


var cod_clienteFiel = '';
function obtenerdatosClienteFiel(datostr){
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	cod_clienteFiel = $(datostr).children('td[id="td_datos_5"]').html();
}

function buscarpagospendientesclientesfiel(){ 	
if(cod_clienteFiel==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 document.getElementById("table_historial_clientefiel_pagos_pendientes").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": cod_clienteFiel,
			"funt": "buscarccuentasExpPendientes",
			"formato": "json"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
			type:"post",
			 
		
			beforeSend: function(){				
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_clientefiel_pagos_pendientes").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_clientefiel_pagos_pendientes").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  			
			 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
		  var datos_buscados=datos[2];		 
			renderPagosPendientesClienteFiel(datos_buscados);
			// document.getElementById("inptRegistroNroExpPagosPend").value=datos[3];
			// document.getElementById("inptTotalDeudaExpPe").value=datos[4];  
			
			}
			}catch(error)
				{
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});	
}

function verCerrarVentanasClientesFiel(d){
	document.getElementById("btnClientesFiel1").style=''
	document.getElementById("btnClientesFiel2").style=''
	document.getElementById("btnHistorialClienteFiel1").style.display='none'
	document.getElementById("btnHistorialClienteFiel2").style.display='none'
	
	if(d=="1"){
		document.getElementById("btnClientesFiel1").style='background-color:#FF9800;color:#fff'
		document.getElementById("btnHistorialClienteFiel1").style.display=''	}
	if(d=="2"){
			if(cod_clienteFiel ==''){
			verCerrarVentanasClientesFiel('1')
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			return
			}
		buscarpagospendientesclientesfiel()
		document.getElementById("btnClientesFiel2").style='background-color:#FF9800;color:#fff'
			document.getElementById("btnHistorialClienteFiel2").style.display=''
	}	
	
}



/* INFORME CUMPLEAÑOS CLIENTES */
function verCerrarInformeCumpleCliente(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divCumpleCliente").style.display==""){
		document.getElementById("divMinimizadoInformeCumpleCliente").style.display="none"
		
 
	$("div[id=divCumpleCliente]").fadeOut(500);			
	}else{
if(controlacceso("VERINFORMECUMPLECLIENTE","accion")==false){return;}
mostrarSoloUno("divCumpleCliente")	
		document.getElementById("divCumpleCliente").style.display=""
		  
	}
}


function minimizarInformeCumpleCliente(){
 
	$("div[id=divCumpleCliente]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeCumpleCliente").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuCumpleCliente"));
}


var MensajeFelicita="";
var MensajePromo="";

function buscarCumpleCliente() {
if(controlacceso("VERINFORMECUMPLECLIENTE","accion")==false){return;}
	var Fecha1 = document.getElementById('inptBuscarCumpleClienteF1').value
	var Fecha2 = document.getElementById('inptBuscarCumpleClienteF2').value
	var Zona = document.getElementById('inptZonaCumpleCliente').value
	var local = document.getElementById('inptLocalCumpleCliente').value
	var estado = document.getElementById('inptEstadoCumpleCliente').value
	
    MensajeFelicita= ""
	MensajePromo= ""
					
	document.getElementById("table_CumpleCliente").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoCumpleCliente").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"Fecha1": Fecha1,
			"Fecha2": Fecha2,
			"Zona": Zona,
			"local": local,
			"estado": estado,
			"funt": "buscarcumpleCliente",
			"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_CumpleCliente").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_CumpleCliente").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					renderCumpleClientes(datos_buscados);
					document.getElementById("inptTotalRegistoCumpleCliente").value = datos[3];
					MensajeFelicita= datos[4];
					MensajePromo= datos[5];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function copiarMensajeFelicita() {
	
	if(MensajeFelicita==""){
		 ver_vetana_informativa("NO EXISTEN CLIENTES QUE CUMPLEN AÑOS ES LA FECHA")
		return false;
	}
  var aux = document.createElement("input");
  aux.setAttribute("value", MensajeFelicita);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ver_vetana_informativa("MENSAJE GENERADO CON EXITO FAVOR PEGAR EN EL ARCHIVO EXCEL")
}

function copiarMensajePromo() {

	if(MensajePromo==""){
		 ver_vetana_informativa("NO EXISTE CLIENTES QUE CUMPLEN AÑOS EN EL MES ")
		return false;
	}
  var aux = document.createElement("input");
  aux.setAttribute("value", MensajePromo);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ver_vetana_informativa("MENSAJE GENERADO CON EXITO FAVOR PEGAR EN EL ARCHIVO EXCEL")
}

let cod_cliente_cumple = '';
function obtenerDatosInformeCumpleCliente(datostr){
	 $("tr[id=tbSelecRegistro]").each(function(i, td){		
		 td.className=''
		
	   });
    datostr.className='tableRegistroSelec'
	cod_cliente_cumple=$(datostr).children('td[id="td_id"]').html();
}
function verCerrarCargarDetalleClienteCumple(){
	if(document.getElementById("divCargarDetalleClienteCumple").style.display==""){ 
		document.getElementById("divCargarDetalleClienteCumple").style.display="none" 
		cod_cliente_cumple = '';
		document.getElementById('inptDescripcionCargarDetalleClienteCumple').value = '';
		document.getElementById('inptEstadoCargarDetalleClienteCumple').value = '';
		document.getElementById("table_cargar_detalle_cliente_cumple").innerHTML = ''
	}else{
		if(cod_cliente_cumple==''){
			ver_vetana_informativa("FALTÓ SELECCIONAR UN REGISTRO");
			return;
		}
		buscarCargarDetalleCliente()
		document.getElementById("divCargarDetalleClienteCumple").style.display="" 
	}
}
function verificar_cargar_detalle_clientes_cumple(){
	let descripcion = document.getElementById('inptDescripcionCargarDetalleClienteCumple').value;
	let estado_cliente = document.getElementById('inptEstadoCargarDetalleClienteCumple').value;
	
	if(estado_cliente==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN ESTADO");
		return;
	}
	
	if(descripcion==""){
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION");
		return;
	}
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "cargar_detalle_clientes_cumple")
			 datos.append("cod_cliente" , cod_cliente_cumple)
			 datos.append("descripcion" , descripcion)
			 datos.append("estado_cliente" , estado_cliente)
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
			  error: function(jqXHR, textstatus, errorThrowm){
					verCerrarEfectoCargando("")
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  	 verCerrarEfectoCargando("")
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
			Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {				
				
				
				document.getElementById('inptDescripcionCargarDetalleClienteCumple').value=''
				document.getElementById('inptEstadoCargarDetalleClienteCumple').value=''
				buscarCargarDetalleCliente()
				ver_vetana_informativa("DATOS GUARDADOS CORRECTAMENTE")
			}
			
			}catch(error)
				{
					 ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
		 
					
			}
			});
			
	
}
function buscarCargarDetalleCliente(){
	
	document.getElementById("table_cargar_detalle_cliente_cumple").innerHTML = ''
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_cliente_cumple": cod_cliente_cumple,
		"funt": "buscarCargarDetalleCliente",
		"formato": "json"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_cargar_detalle_cliente_cumple").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_cargar_detalle_cliente_cumple").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderDetalleCumpleCliente(datos_buscados);
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function vercerrarvistacuentasclientecumple(d){
	if(d == '1'){
		if(cod_cliente_cumple == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
		return;
	}
		document.getElementById('divVistaCuentasClienteCallCenter').style.display = ''
		buscarcuentaacobrarcallcenter(cod_cliente_cumple)
	}else{
		document.getElementById('divVistaCuentasClienteCallCenter').style.display = 'none'
	}
} 



function verificarcamposCallCenterClienteFiel() {
	if(document.getElementById('table_Cliente_Fiel').innerHTML == ''){
		ver_vetana_informativa('FALTÓ REALIZAR UNA BUSQUEDA');
		return;
	}
	
	if(!confirm('REALMENTE DESEA MANDAR AL CALLCENTER DE VENTAS?')){
		return false;
	}

	var accion = "guardarEnCallCenterVenta";
	
	abmCallCenterClienteFiel(accion);
}
function abmCallCenterClienteFiel(accion) {
	verCerrarEfectoCargando("1")
	
	var datos = new FormData();
	obtener_datos_user();
	
	var control=1;
	$("tr[name=TablaClientesFieles]").each(function(i, elementohtml){	
	
	var fecha=$(elementohtml).children('td[id="td_datos_1"]').html();
    datos.append("fecha"+control, fecha)	
	
	var cliente=$(elementohtml).children('td[id="td_datos_2"]').html();
    datos.append("cliente"+control, cliente)
	
	var total_venta=$(elementohtml).children('td[id="td_datos_3"]').html();
    datos.append("total_venta"+control, total_venta)
	
	var telefono=$(elementohtml).children('td[id="td_datos_4"]').html();
    datos.append("telefono"+control, telefono)
	
	control=control+1;	
	});
	   
	   
	control=control-1;	
	if(control<=0){
	ver_vetana_informativa("FALTO DATOS DE CLIENTE")
	return false ;
	}
	

	
	
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("totalRegistro", control)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("")
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


