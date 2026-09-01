/* ABM MOTIVO EN EGRESO/INGRESO */
var listadoAbmMotivoEgresoIngreso = null;
function iniciarListadoAbmMotivoEgresoIngreso() {
	if (listadoAbmMotivoEgresoIngreso || !window.AbmListadoCore) return listadoAbmMotivoEgresoIngreso;
	var cuerpo = document.getElementById("divBuscadorMotivoEgresoIngreso");
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && cabecera.tagName !== "TABLE") cabecera = cabecera.previousElementSibling;
	if (!cabecera) return null;
	cabecera.id = "cabeceraAbmMotivoEgresoIngreso";
	listadoAbmMotivoEgresoIngreso = window.AbmListadoCore.crear({
		nombre: "motivo_egreso_ingreso",
		idCabecera: "cabeceraAbmMotivoEgresoIngreso",
		idCuerpo: "divBuscadorMotivoEgresoIngreso",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmMotivoEgresoIngreso",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmMotivoEgresoIngreso.iniciar();
	return listadoAbmMotivoEgresoIngreso;
}

function renderizarCatalogoMotivoEgresoIngreso(idContenedor, registros, valorCodigo, textoInicial) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	if (textoInicial !== null) {
		var inicial = document.createElement("option");
		inicial.value = "";
		inicial.textContent = textoInicial;
		contenedor.appendChild(inicial);
	}
	if (!Array.isArray(registros)) return;
	registros.forEach(function (registro) {
		var opcion = document.createElement("option");
		opcion.value = valorCodigo ? (registro.codigo || "") : (registro.descripcion || "");
		opcion.textContent = registro.descripcion || "";
		opcion.setAttribute("data-codigo", registro.codigo || "");
		if (!valorCodigo) opcion.id = registro.codigo || "";
		contenedor.appendChild(opcion);
	});
}

/* Listados de productos e inventario construidos desde filas JSON. */
function buscarCabeceraProductosEstructurada(cuerpo, indice) {
	var actual = cuerpo ? cuerpo.previousElementSibling : null;
	var candidatas = [];
	while (actual) {
		if (actual.tagName === "TABLE" && actual.querySelector(".td_registro") && !actual.querySelector("input, select, textarea")) {
			candidatas.push(actual);
		}
		actual = actual.previousElementSibling;
	}
	return candidatas[indice || 0] || null;
}

function crearListadoProductosEstructurado(configuracion) {
	if (!window.AbmListadoCore) return null;
	var cuerpo = document.getElementById(configuracion.idCuerpo);
	if (!cuerpo) return null;
	var cabecera = configuracion.idCabecera ? document.getElementById(configuracion.idCabecera) : null;
	if (!cabecera) cabecera = buscarCabeceraProductosEstructurada(cuerpo, configuracion.indiceCabecera || 0);
	if (!cabecera) return null;
	var idCabecera = configuracion.idCabeceraCore || configuracion.idCabecera || ("cabecera_" + configuracion.nombre);
	cabecera.id = idCabecera;
	var opciones = {
		nombre: configuracion.nombre,
		idCabecera: idCabecera,
		idCuerpo: configuracion.idCuerpo,
		ordenInicial: configuracion.ordenInicial || "",
		ordenable: configuracion.ordenable !== false,
		columnas: configuracion.columnas || []
	};
	if (configuracion.crearFila) opciones.crearFila = configuracion.crearFila;
	else opciones.fila = configuracion.fila;
	var listado = window.AbmListadoCore.crear(opciones);
	if (listado.columnasActivas && listado.columnasActivas().length === 0 && listado.restablecerColumnas) {
		listado.restablecerColumnas();
	} else {
		listado.iniciar();
	}
	return listado;
}

function crearBotonListadoEstructurado(texto, clase, etiqueta, accion) {
	var boton = document.createElement("input");
	boton.type = "button";
	boton.value = texto;
	boton.className = clase || "btn4";
	boton.style.width = "50px";
	boton.setAttribute("aria-label", etiqueta || texto);
	boton.addEventListener("click", function (evento) {
		evento.stopPropagation();
		accion();
	});
	return boton;
}

var listadoInformePagoProveedor = null;
function iniciarListadoInformePagoProveedor() {
	if (listadoInformePagoProveedor) return listadoInformePagoProveedor;
	listadoInformePagoProveedor = crearListadoProductosEstructurado({
		nombre: "informe_pago_proveedor", idCuerpo: "table_informe_pagos_a_proveedor",
		columnas: [
			{ campo: "id_pago", titulo: "#", ancho: "20%" }, { campo: "monto", titulo: "MONTO", ancho: "20%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "20%" }, { campo: "usuario", titulo: "USUARIO", ancho: "20%" },
			{ campo: "accion", titulo: "ACCION", ancho: "20%" }
		],
		fila: { funcionSeleccion: "Obtenerdatosinformepagoaproveedor", celdas: [
			{ id: "td_datos_id", campo: "id_pago", columna: "id_pago", render: function (valor, registro, celda) { celda.style.backgroundColor = "#efeded"; celda.style.color = "red"; return valor; } },
			{ campo: "monto_formateado", columna: "monto" }, { campo: "fecha", columna: "fecha" }, { campo: "usuario", columna: "usuario" },
			{ columna: "accion", campo: "url", render: function (valor) {
				if (!valor) return "";
				return crearBotonListadoEstructurado("VER", "btn4", "Ver comprobante de pago", function () { verdocumentoClienteSolicitud(valor); });
			} }
		] }
	});
	return listadoInformePagoProveedor;
}

var listadoInformePagoProveedorCheques = null;
function iniciarListadoInformePagoProveedorCheques() {
	if (listadoInformePagoProveedorCheques) return listadoInformePagoProveedorCheques;
	listadoInformePagoProveedorCheques = crearListadoProductosEstructurado({
		nombre: "informe_pago_proveedor_cheques", idCuerpo: "table_informe_pagos_a_proveedor_cheques",
		columnas: [
			{ campo: "numero_cheque", titulo: "NRO CHEQUE", ancho: "5%" }, { campo: "orden", titulo: "ORDEN", ancho: "5%" },
			{ campo: "fecha_emision", titulo: "FECHA EMISION", ancho: "5%" }, { campo: "concepto", titulo: "CONCEPTO", ancho: "5%" },
			{ campo: "importe", titulo: "IMPORTE", ancho: "5%" }, { campo: "banco", titulo: "BANCO", ancho: "5%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "5%" }
		],
		fila: { celdas: [
			{ campo: "numero_cheque", columna: "numero_cheque", render: function (valor, registro, celda) { celda.style.backgroundColor = "#efeded"; celda.style.color = "red"; return valor; } },
			{ campo: "orden", columna: "orden" }, { campo: "fecha_emision", columna: "fecha_emision" }, { campo: "concepto", columna: "concepto" },
			{ campo: "importe_formateado", columna: "importe" }, { campo: "banco", columna: "banco" }, { campo: "proveedor", columna: "proveedor" }
		] }
	});
	return listadoInformePagoProveedorCheques;
}

var listadoInformePagoProveedorCompras = null;
function iniciarListadoInformePagoProveedorCompras() {
	if (listadoInformePagoProveedorCompras) return listadoInformePagoProveedorCompras;
	listadoInformePagoProveedorCompras = crearListadoProductosEstructurado({
		nombre: "informe_pago_proveedor_compras", idCuerpo: "table_informe_pagos_a_proveedor_compras",
		columnas: [
			{ campo: "fecha_compra", titulo: "FECHA", ancho: "33%" },
			{ campo: "numero_comprobante", titulo: "NUM COMPROBANTE", ancho: "33%" },
			{ campo: "total", titulo: "TOTAL", ancho: "33%" }
		],
		fila: { celdas: [
			{ campo: "fecha_compra", columna: "fecha_compra" }, { campo: "numero_comprobante", columna: "numero_comprobante" },
			{ campo: "total_formateado", columna: "total" }
		] }
	});
	return listadoInformePagoProveedorCompras;
}

var listadoComisionCobrador = null;
function iniciarListadoComisionCobrador() {
	if (listadoComisionCobrador) return listadoComisionCobrador;
	listadoComisionCobrador = crearListadoProductosEstructurado({
		nombre: "comision_cobrador", idCuerpo: "table_comision_cobrador",
		columnas: [
			{ campo: "cobrador", titulo: "COBRADOR", ancho: "10%" }, { campo: "factura", titulo: "FACTURA", ancho: "10%" },
			{ campo: "monto", titulo: "MONTO", ancho: "10%" }, { campo: "fecha", titulo: "FECHA", ancho: "10%" },
			{ campo: "zona", titulo: "ZONA", ancho: "10%" }, { campo: "porcentaje_comision", titulo: "COMISION(%)", ancho: "10%" },
			{ campo: "comision_total", titulo: "T. COMISION", ancho: "10%" }
		],
		fila: { funcionSeleccion: "obtenerdatoscomisioncobrador", celdas: [
			{ id: "td_id_1", campo: "id_pago", tecnica: true }, { campo: "cobrador", columna: "cobrador" }, { campo: "factura", columna: "factura" },
			{ id: "td_datos_1", campo: "numero_factura", tecnica: true }, { id: "td_datos_2", campo: "monto_formateado", columna: "monto" },
			{ id: "td_datos_3", campo: "fecha", columna: "fecha" }, { id: "td_datos_4", campo: "zona", columna: "zona" },
			{ id: "td_datos_5", campo: "porcentaje_comision", columna: "porcentaje_comision" },
			{ id: "td_datos_6", campo: "comision_total_formateada", columna: "comision_total" }
		] }
	});
	return listadoComisionCobrador;
}

var listadoComisionCobradorAgrupado = null;
function iniciarListadoComisionCobradorAgrupado() {
	if (listadoComisionCobradorAgrupado) return listadoComisionCobradorAgrupado;
	listadoComisionCobradorAgrupado = crearListadoProductosEstructurado({
		nombre: "comision_cobrador_agrupado", idCuerpo: "table_comision_cobrador_agrupado",
		columnas: [
			{ campo: "cobrador", titulo: "COBRADOR", ancho: "15%" }, { campo: "total_cobrado", titulo: "T-COBRADO", ancho: "10%" },
			{ campo: "meta", titulo: "META", ancho: "10%" }, { campo: "porcentaje", titulo: "PORCENTAJE", ancho: "10%" }
		],
		fila: { celdas: [
			{ campo: "cobrador", columna: "cobrador" }, { campo: "total_cobrado_formateado", columna: "total_cobrado" },
			{ campo: "meta_formateada", columna: "meta" }, { campo: "porcentaje_formateado", columna: "porcentaje" },
			{ campo: "codigo_cobrador", tecnica: true }, { campo: "fecha", tecnica: true }
		] }
	});
	return listadoComisionCobradorAgrupado;
}

var listadoPagosEliminados = null;
function iniciarListadoPagosEliminados() {
	if (listadoPagosEliminados) return listadoPagosEliminados;
	listadoPagosEliminados = crearListadoProductosEstructurado({
		nombre: "pagos_eliminados", idCuerpo: "table_pagos_eliminados_historial", ordenInicial: "fecha",
		columnas: [
			{ campo: "numero_venta", titulo: "NRO VENTA", ancho: "10%" }, { campo: "monto", titulo: "MONTO", ancho: "10%" },
			{ campo: "cuota", titulo: "CUOTA", ancho: "10%" }, { campo: "cliente", titulo: "CLIENTE", ancho: "10%" },
			{ campo: "documento", titulo: "CI", ancho: "10%" }, { campo: "motivo", titulo: "MOTIVO", ancho: "10%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "10%" }, { campo: "usuario", titulo: "USUARIO", ancho: "10%" }
		],
		fila: { celdas: [
			{ campo: "numero_venta", columna: "numero_venta" }, { campo: "monto_formateado", columna: "monto" }, { campo: "cuota", columna: "cuota" },
			{ campo: "cliente", columna: "cliente" }, { campo: "documento", columna: "documento" }, { campo: "motivo", columna: "motivo" },
			{ campo: "fecha", columna: "fecha" }, { campo: "usuario", columna: "usuario" }, { campo: "codigo", tecnica: true }
		] }
	});
	return listadoPagosEliminados;
}

var listadoComprasEliminadas = null;
function iniciarListadoComprasEliminadas() {
	if (listadoComprasEliminadas) return listadoComprasEliminadas;
	listadoComprasEliminadas = crearListadoProductosEstructurado({
		nombre: "compras_eliminadas", idCuerpo: "table_compras_eliminados_historial", ordenInicial: "fecha_eliminacion",
		columnas: [
			{ campo: "numero_comprobante", titulo: "NRO COMPRA", ancho: "10%" }, { campo: "motivo", titulo: "MOTIVO", ancho: "10%" },
			{ campo: "fecha_eliminacion", titulo: "FECHA", ancho: "10%" }, { campo: "eliminado_por", titulo: "USUARIO", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: { celdas: [
			{ id: "td_datos_1", campo: "numero_comprobante", columna: "numero_comprobante" }, { id: "td_datos_3", campo: "motivo", columna: "motivo" },
			{ campo: "fecha_eliminacion", columna: "fecha_eliminacion" }, { campo: "eliminado_por", columna: "eliminado_por" },
			{ campo: "local", columna: "local" }, { campo: "codigo_compra", tecnica: true }, { campo: "fecha_compra", tecnica: true }
		] }
	});
	return listadoComprasEliminadas;
}

var listadoEgresoIngresoCobrador = null;
function iniciarListadoEgresoIngresoCobrador() {
	if (listadoEgresoIngresoCobrador) return listadoEgresoIngresoCobrador;
	listadoEgresoIngresoCobrador = crearListadoProductosEstructurado({
		nombre: "egreso_ingreso_cobrador", idCuerpo: "table_informe_egreso_ingreso_cobradores", idCabecera: "tdTituloImpreEgresoIngresoCobradores",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" }, { campo: "motivo", titulo: "MOTIVO", ancho: "5%" },
			{ campo: "monto", titulo: "MONTO", ancho: "5%" }, { campo: "tipo", titulo: "TIPO", ancho: "10%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "5%" }, { campo: "numero_boleta", titulo: "NRO BOLETA", ancho: "5%" },
			{ campo: "banco", titulo: "BANCO", ancho: "10%" }, { campo: "numero_cuenta", titulo: "CUENTA", ancho: "10%" },
			{ campo: "arreglo", titulo: "ARREGLO", ancho: "10%" }, { campo: "cobrador", titulo: "COBRADOR", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }, { campo: "confirmado", titulo: "CONFIRMADO", ancho: "5%" },
			{ campo: "accion", titulo: "ACCION", ancho: "5%" }, { campo: "observacion_accion", titulo: "OBS", ancho: "5%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosinformeegresoingresocobrador",
			atributosFila: function (registro) { return registro.confirmado === "SI" ? { style: { backgroundColor: "green", color: "white" } } : {}; },
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo", render: function (valor, registro, celda) { celda.style.backgroundColor = "#efeded"; celda.style.color = "red"; return valor; } },
				{ id: "td_datos_2", campo: "motivo", columna: "motivo" }, { id: "td_datos_1", campo: "monto_formateado", columna: "monto" },
				{ id: "td_datos_6", campo: "tipo", columna: "tipo" }, { campo: "fecha_visible", columna: "fecha" },
				{ id: "td_datos_7", campo: "fecha", tecnica: true }, { id: "td_datos_3", campo: "numero_boleta", columna: "numero_boleta" },
				{ id: "td_datos_9", campo: "banco", columna: "banco" }, { id: "td_datos_10", campo: "numero_cuenta", columna: "numero_cuenta" },
				{ id: "td_datos_11", campo: "arreglo", columna: "arreglo" }, { id: "td_datos_8", campo: "cobrador", columna: "cobrador" },
				{ id: "td_datos_5", campo: "estado", tecnica: true }, { id: "td_datos_12", campo: "codigo_motivo", tecnica: true },
				{ id: "td_datos_13", campo: "local", columna: "local" }, { id: "td_datos_14", campo: "confirmado", columna: "confirmado" },
				{ id: "td_datos_15", campo: "url", columna: "accion", render: function (valor) {
					if (!valor) return "";
					return crearBotonListadoEstructurado("VER", "btn4", "Ver comprobante", function () { verdocumentoClienteSolicitud(valor); });
				} },
				{ id: "td_datos_16", campo: "observacion", columna: "observacion_accion", render: function (valor) {
					if (!valor) return "";
					var boton = crearBotonListadoEstructurado("OBS", "btn4", "Ver observacion", function () { verObservacionIngresoEgresoCobrador(valor); });
					boton.style.backgroundColor = "#ff5733";
					return boton;
				} }
			]
		}
	});
	return listadoEgresoIngresoCobrador;
}

var listadosEvaluacion = {};
function iniciarListadoEvaluacion(nombre) {
	if (listadosEvaluacion[nombre]) return listadosEvaluacion[nombre];
	var configuraciones = {
		gasto: { id: "table_evaluacion_gasto", columnas: [
			{ campo: "motivo", titulo: "MOTIVO", ancho: "10%" }, { campo: "monto", titulo: "MONTO", ancho: "10%" },
			{ campo: "personales", titulo: "PERSONAL", ancho: "10%" }, { campo: "fecha", titulo: "FECHA", ancho: "10%" },
			{ campo: "usuario", titulo: "USUARIO", ancho: "10%" }, { campo: "local", titulo: "LOCAL", ancho: "10%" }
		], celdas: [
			{ id: "td_datos_2", campo: "motivo", columna: "motivo" }, { id: "td_datos_1", campo: "monto_formateado", columna: "monto" },
			{ id: "td_datos_6", campo: "personales", columna: "personales" }, { id: "td_datos_3", campo: "fecha", columna: "fecha" },
			{ id: "td_datos_4", campo: "usuario", columna: "usuario" }, { campo: "local", columna: "local" }, { campo: "codigo", tecnica: true }
		] },
		pagos: { id: "table_evaluacion_pagos", columnas: [
			{ campo: "factura", titulo: "FACTURA", ancho: "10%" }, { campo: "fecha_hora", titulo: "FECHA/HORA", ancho: "10%" },
			{ campo: "monto", titulo: "MONTO", ancho: "10%" }, { campo: "zona", titulo: "ZONA", ancho: "10%" }, { campo: "local", titulo: "LOCAL", ancho: "10%" }
		], celdas: [
			{ id: "td_datos_3", campo: "factura", columna: "factura" }, { campo: "fecha_hora", columna: "fecha_hora" },
			{ id: "td_datos_5", campo: "monto_formateado", columna: "monto" }, { campo: "zona", columna: "zona" }, { campo: "local", columna: "local" },
			{ campo: "id_pago", tecnica: true }
		] },
		vendidos: { id: "table_evaluacion_producto_vendidos", columnas: [
			{ campo: "codigo_producto", titulo: "CODIGO", ancho: "10%" }, { campo: "producto", titulo: "PRODUCTO", ancho: "20%" },
			{ campo: "marca", titulo: "MARCA", ancho: "15%" }, { campo: "cantidad", titulo: "CANTIDAD", ancho: "10%" },
			{ campo: "total_venta", titulo: "SUBTOTAL", ancho: "10%" }, { campo: "local", titulo: "LOCAL", ancho: "10%" }
		], celdas: [
			{ campo: "codigo_producto", columna: "codigo_producto" }, { campo: "producto", columna: "producto" }, { campo: "marca", columna: "marca" },
			{ campo: "cantidad_formateada", columna: "cantidad" }, { campo: "total_venta_formateado", columna: "total_venta" }, { campo: "local", columna: "local" }
		] },
		comprados: { id: "table_evaluacion_producto_comprados", columnas: [
			{ campo: "codigo_producto", titulo: "COD.", ancho: "10%" }, { campo: "producto", titulo: "PRODUCTO", ancho: "15%" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" }, { campo: "cantidad", titulo: "CANT.", ancho: "10%" },
			{ campo: "precio", titulo: "COSTO", ancho: "10%" }, { campo: "total", titulo: "SUBTOTAL", ancho: "10%" }, { campo: "local", titulo: "LOCAL", ancho: "10%" }
		], celdas: [
			{ campo: "codigo_producto", columna: "codigo_producto" }, { campo: "producto", columna: "producto" }, { campo: "marca", columna: "marca" },
			{ campo: "cantidad_formateada", columna: "cantidad" }, { campo: "precio_formateado", columna: "precio" },
			{ campo: "total_formateado", columna: "total" }, { campo: "local", columna: "local" }
		] },
		pagos_compras: { id: "table_evaluacion_pagos_compras", columnas: [
			{ campo: "monto", titulo: "MONTO", ancho: "10%" }, { campo: "fecha_pago", titulo: "FECHA DEL PAG.", ancho: "10%" },
			{ campo: "fecha_a_pagar", titulo: "FECHA CARG.", ancho: "10%" }, { campo: "tipo", titulo: "TIPO", ancho: "10%" },
			{ campo: "numero_comprobante", titulo: "NRO COMPRA", ancho: "10%" }, { campo: "local", titulo: "LOCAL", ancho: "10%" }
		], celdas: [
			{ campo: "monto_formateado", columna: "monto" }, { campo: "fecha_pago", columna: "fecha_pago" },
			{ campo: "fecha_a_pagar", columna: "fecha_a_pagar" }, { campo: "tipo", columna: "tipo" },
			{ campo: "numero_comprobante", columna: "numero_comprobante" }, { campo: "local", columna: "local" }
		] }
	};
	var config = configuraciones[nombre];
	if (!config) return null;
	listadosEvaluacion[nombre] = crearListadoProductosEstructurado({
		nombre: "evaluacion_" + nombre, idCuerpo: config.id, columnas: config.columnas, fila: { celdas: config.celdas }
	});
	return listadosEvaluacion[nombre];
}

function crearMarcadorCargaListado(idCuerpo, idMarcador) {
	var anterior = document.getElementById(idMarcador);
	if (anterior && anterior.parentNode) anterior.parentNode.removeChild(anterior);
	var cuerpo = document.getElementById(idCuerpo);
	if (!cuerpo) return null;
	var marcador = document.createElement("div");
	marcador.id = idMarcador;
	cuerpo.appendChild(marcador);
	return marcador;
}

function limpiarMarcadorCargaListado(idMarcador) {
	var marcador = document.getElementById(idMarcador);
	if (marcador && marcador.parentNode) marcador.parentNode.removeChild(marcador);
}

function estiloTablaStockNegativo(registro) {
	return registro && registro.stock_negativo ? { style: { backgroundColor: "#FF5722", color: "#fff" } } : {};
}

var listadoCodigoBarraProductos = null;
function iniciarListadoCodigoBarraProductos() {
	if (listadoCodigoBarraProductos) return listadoCodigoBarraProductos;
	listadoCodigoBarraProductos = crearListadoProductosEstructurado({
		nombre: "codigo_barra_productos",
		idCuerpo: "table_comision_productos_cod_barra",
		ordenInicial: "producto",
		columnas: [
			{ campo: "seleccionado", titulo: "IMPRIMIR", ancho: "10%" },
			{ campo: "codigo_barra", titulo: "COD. PROCT.", ancho: "15%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "35%" },
			{ campo: "precio_contado", titulo: "P. VENTA", ancho: "20%" },
			{ campo: "cantidad", titulo: "CANT.", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var camposVisibles = {};
			columnas.forEach(function (columna) { camposVisibles[columna.campo] = columna; });
			var tabla = utilidades.crearElemento("table", {
				className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch",
				border: "1", cellspacing: "1", cellpadding: "5"
			});
			var fila = utilidades.crearElemento("tr", { id: "tr_Codigo_barras" });
			function agregarCelda(campo, ancho, id, contenido, tecnica) {
				var celda = utilidades.crearElemento("td", id ? { id: id } : {});
				if (tecnica || !camposVisibles[campo]) celda.style.display = "none";
				else celda.style.width = ancho;
				if (contenido instanceof Node) celda.appendChild(contenido);
				else celda.textContent = contenido == null ? "" : String(contenido);
				fila.appendChild(celda);
				return celda;
			}
			var check = utilidades.crearElemento("input", { id: "btnCheck", type: "checkbox" });
			check.setAttribute("aria-label", "Seleccionar " + (registro.producto || "producto") + " para imprimir");
			check.checked = !!registro.seleccionado;
			check.addEventListener("change", function () { registro.seleccionado = check.checked; });
			agregarCelda("seleccionado", "10%", "td_datos_6", check, false);
			agregarCelda("codigo_barra", "15%", "td_datos_1", registro.codigo_barra, false);
			agregarCelda("producto", "35%", "td_datos_2", registro.producto, false);
			agregarCelda("precio_contado", "20%", "td_datos_3", registro.precio_contado_formateado, false);
			var cantidad = utilidades.crearElemento("input", { id: "inptCantidad", type: "text", className: "input5" });
			cantidad.setAttribute("aria-label", "Cantidad de etiquetas para " + (registro.producto || "producto"));
			cantidad.value = Number(registro.cantidad) > 0 ? registro.cantidad : "";
			cantidad.addEventListener("input", function () { registro.cantidad = cantidad.value; });
			agregarCelda("cantidad", "10%", "td_datos_5", cantidad, false);
			agregarCelda("local", "10%", "", registro.local, false);
			var detalle = agregarCelda("detalle", "", "td_datos_7", "", true);
			var titulo = utilidades.crearElemento("b", { className: "pTitulo2" }, "EN CUOTAS:");
			titulo.style.fontSize = "13px";
			titulo.style.padding = "5px";
			detalle.appendChild(titulo);
			(registro.cuotas || []).forEach(function (cuota, posicion) {
				var tablaCuota = utilidades.crearElemento("table", {
					className: posicion % 2 ? "tableRegistroSearch2" : "tableRegistroSearch",
					border: "1", cellspacing: "1", cellpadding: "5"
				});
				tablaCuota.style.height = "20px";
				tablaCuota.style.fontSize = "11px";
				var filaCuota = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
				var celdaCuota = utilidades.crearElemento("td", {}, cuota.cuota + " X Gs. " + cuota.precio_cuota_formateado);
				celdaCuota.style.width = "100%";
				celdaCuota.style.padding = "0";
				filaCuota.appendChild(celdaCuota);
				tablaCuota.appendChild(filaCuota);
				detalle.appendChild(tablaCuota);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	return listadoCodigoBarraProductos;
}

var listadoExistenciaLocalCatalogo = null;
function iniciarListadoExistenciaLocalCatalogo() {
	if (listadoExistenciaLocalCatalogo) return listadoExistenciaLocalCatalogo;
	listadoExistenciaLocalCatalogo = crearListadoProductosEstructurado({
		nombre: "existencia_local_catalogo", idCuerpo: "divBuscadorExistenciaLocalCatalogo", ordenInicial: "local",
		columnas: [{ campo: "stock", titulo: "STOCK", ancho: "30%" }, { campo: "local", titulo: "LOCAL", ancho: "70%" }],
		fila: { celdas: [
			{ id: "td_id", campo: "codigo_producto", tecnica: true },
			{ campo: "stock_formateado", columna: "stock", className: "tdRegistroSearch" },
			{ campo: "local", columna: "local", className: "tdRegistroSearch" }
		] }
	});
	return listadoExistenciaLocalCatalogo;
}

var listadoComboCatalogo = null;
function iniciarListadoComboCatalogo() {
	if (listadoComboCatalogo) return listadoComboCatalogo;
	listadoComboCatalogo = crearListadoProductosEstructurado({
		nombre: "combo_catalogo", idCuerpo: "divBuscadorProductosComboCatalogo", ordenInicial: "producto",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "20%" }, { campo: "producto", titulo: "DESCRIPCION", ancho: "40%" },
			{ campo: "stock", titulo: "STOCK", ancho: "20%" }, { campo: "cantidad", titulo: "CANTIDAD", ancho: "20%" }
		],
		fila: {
			atributosFila: { name: "trListadoComboProductoVenta" },
			celdas: [
				{ id: "td_datos_13", campo: "codigo_barra", tecnica: true },
				{ campo: "codigo_barra", columna: "codigo_barra", className: "tdRegistroSearch" },
				{ id: "td_id", campo: "codigo_producto", tecnica: true },
				{ id: "td_datos_1", campo: "producto", columna: "producto", className: "tdRegistroSearch" },
				{ campo: "marca", tecnica: true }, { id: "td_datos_2", campo: "descripcion", tecnica: true },
				{ id: "td_datos_12", campo: "categoria", tecnica: true }, { id: "td_datos_3", campo: "unidad", tecnica: true },
				{ id: "td_datos_4", campo: "precio_formateado", tecnica: true }, { id: "td_datos_5", campo: "costo_formateado", tecnica: true },
				{ id: "td_datos_6", campo: "stock", columna: "stock", className: "tdRegistroSearch" },
				{ id: "td_datos_7", campo: "codigo_local", tecnica: true }, { id: "td_datos_8", campo: "comision", tecnica: true },
				{ id: "td_datos_9", campo: "estado", tecnica: true }, { id: "td_datos_10", campo: "local", tecnica: true },
				{ id: "td_datos_11", campo: "detalle_precios", tecnica: true }, { id: "td_datos_15", campo: "stock", tecnica: true },
				{ id: "td_datos_16", campo: "cantidad", columna: "cantidad", className: "tdRegistroSearch" },
				{ id: "td_datos_17", campo: "codigo_combo", tecnica: true }
			]
		}
	});
	return listadoComboCatalogo;
}

var listadoInformeDepositoListado = null;
function iniciarListadoInformeDepositoListado() {
	if (listadoInformeDepositoListado) return listadoInformeDepositoListado;
	listadoInformeDepositoListado = crearListadoProductosEstructurado({
		nombre: "informe_deposito_listas", idCuerpo: "table_informe_deposito_listado", ordenInicial: "fecha",
		columnas: [{ campo: "nombre", titulo: "NOMBRE", ancho: "33%" }, { campo: "fecha", titulo: "FECHA", ancho: "33%" }, { campo: "local", titulo: "LOCAL", ancho: "33%" }],
		fila: { funcionSeleccion: "obtenerdatosinformedeposito", celdas: [
			{ id: "td_id", campo: "codigo", tecnica: true }, { campo: "nombre", columna: "nombre", className: "tdRegistroSearch" },
			{ campo: "fecha", columna: "fecha", className: "tdRegistroSearch" }, { campo: "local", columna: "local", className: "tdRegistroSearch" }
		] }
	});
	return listadoInformeDepositoListado;
}

var listadoInformeDepositoProductos = null;
function iniciarListadoInformeDepositoProductos() {
	if (listadoInformeDepositoProductos) return listadoInformeDepositoProductos;
	listadoInformeDepositoProductos = crearListadoProductosEstructurado({
		nombre: "informe_deposito_productos", idCuerpo: "table_informe_deposito_productos", idCabecera: "tdTituloImpreInformeDeposito", ordenInicial: "producto",
		columnas: [
			{ campo: "producto", titulo: "PRODUCTO", ancho: "14%" }, { campo: "stock", titulo: "STOCK", ancho: "14%" },
			{ campo: "stock_anterior", titulo: "STOCK ANTERIOR", ancho: "14%" }, { campo: "diferencia", titulo: "DIFERENCIA", ancho: "14%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "14%" }, { campo: "usuario", titulo: "USUARIO", ancho: "14%" }, { campo: "local", titulo: "LOCAL", ancho: "14%" }
		],
		fila: {
			atributosTabla: function (registro) {
				if (registro.estado_variacion === "aumento") return { style: { backgroundColor: "green", color: "white" } };
				if (registro.estado_variacion === "disminucion") return { style: { backgroundColor: "red", color: "white" } };
				return {};
			},
			celdas: [
				{ campo: "producto", columna: "producto", className: "tdRegistroSearch" }, { campo: "stock", columna: "stock", className: "tdRegistroSearch" },
				{ campo: "stock_anterior", columna: "stock_anterior", className: "tdRegistroSearch" }, { campo: "diferencia", columna: "diferencia", className: "tdRegistroSearch" },
				{ campo: "fecha", columna: "fecha", className: "tdRegistroSearch" }, { campo: "usuario", columna: "usuario", className: "tdRegistroSearch" },
				{ campo: "local", columna: "local", className: "tdRegistroSearch" }
			]
		}
	});
	return listadoInformeDepositoProductos;
}

var listadoDocumentosInformeDeposito = null;
function iniciarListadoDocumentosInformeDeposito() {
	if (listadoDocumentosInformeDeposito) return listadoDocumentosInformeDeposito;
	listadoDocumentosInformeDeposito = crearListadoProductosEstructurado({
		nombre: "documentos_informe_deposito", idCuerpo: "buscador_documentos_pdf_informe_deposito", ordenInicial: "fecha",
		columnas: [{ campo: "fecha", titulo: "FECHA", ancho: "40%" }, { campo: "usuario", titulo: "USUARIO", ancho: "40%" }, { campo: "accion", titulo: "ACCION", ancho: "20%" }],
		fila: { celdas: [
			{ id: "td_id", campo: "codigo", tecnica: true }, { campo: "fecha", columna: "fecha", className: "tdRegistroSearch" },
			{ id: "td_datos_1", campo: "usuario", columna: "usuario", className: "tdRegistroSearch" },
			{ id: "td_datos_4", columna: "accion", className: "tdRegistroSearch", render: function (valor, registro) {
				var boton = document.createElement("input"); boton.type = "button"; boton.value = "VER"; boton.className = "btn4"; boton.style.width = "50px";
				boton.setAttribute("aria-label", "Ver documento del " + (registro.fecha || "informe"));
				boton.addEventListener("click", function () { verdocumentoClienteSolicitud(registro.url); }); return boton;
			} }
		] }
	});
	return listadoDocumentosInformeDeposito;
}

var listadoSolicitudDespacho = null;
function iniciarListadoSolicitudDespacho() {
	if (listadoSolicitudDespacho) return listadoSolicitudDespacho;
	listadoSolicitudDespacho = crearListadoProductosEstructurado({
		nombre: "solicitud_despacho", idCuerpo: "table_buscar_SolicitudDespacho", ordenInicial: "fecha",
		columnas: [
			{ campo: "producto", titulo: "PRODUCTO", ancho: "30%" }, { campo: "stock", titulo: "CANTIDAD", ancho: "10%" },
			{ campo: "local_origen", titulo: "DEL LOCAL", ancho: "10%" }, { campo: "local_destino", titulo: "A LOCAL", ancho: "10%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "10%" }, { campo: "usuario", titulo: "USUARIO", ancho: "10%" }, { campo: "estado", titulo: "ESTADO", ancho: "10%" }
		],
		fila: { funcionSeleccion: "obtenerdatossolicituddespacho", celdas: [
			{ id: "td_id", campo: "codigo", tecnica: true }, { campo: "producto", columna: "producto", className: "tdRegistroSearch" },
			{ campo: "stock_formateado", columna: "stock", className: "tdRegistroSearch" }, { campo: "local_origen", columna: "local_origen", className: "tdRegistroSearch" },
			{ campo: "local_destino", columna: "local_destino", className: "tdRegistroSearch" }, { campo: "fecha", columna: "fecha", className: "tdRegistroSearch" },
			{ campo: "usuario", columna: "usuario", className: "tdRegistroSearch" }, { campo: "estado", columna: "estado", className: "tdRegistroSearch" }
		] }
	});
	return listadoSolicitudDespacho;
}

function celdasListadoInventario(incluirProveedor) {
	var celdas = [
		{ campo: "codigo_barra", columna: "codigo_barra", className: "tdRegistroSearch" }, { campo: "producto", columna: "producto", className: "tdRegistroSearch" },
		{ campo: "categoria", columna: "categoria", className: "tdRegistroSearch" }, { campo: "marca", columna: "marca", className: "tdRegistroSearch" }
	];
	if (incluirProveedor) celdas.push({ campo: "proveedor", columna: "proveedor", className: "tdRegistroSearch" });
	celdas.push({ campo: "stock_formateado", columna: "stock", className: "tdRegistroSearch" });
	celdas.push({ campo: "costo_formateado", columna: "costo", className: "tdRegistroSearch" });
	celdas.push({ campo: "total_costo_formateado", columna: "total_costo", className: "tdRegistroSearch" });
	celdas.push({ campo: "local", columna: "local", className: "tdRegistroSearch" });
	return celdas;
}

var listadoInventarioProductos = null;
function iniciarListadoInventarioProductos() {
	if (listadoInventarioProductos) return listadoInventarioProductos;
	listadoInventarioProductos = crearListadoProductosEstructurado({
		nombre: "inventario_productos", idCuerpo: "table_comision_productosInventario", idCabecera: "tdTituloImpreInventario", ordenInicial: "producto",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD. PRODUCTO", ancho: "10%" }, { campo: "producto", titulo: "PRODUCTO", ancho: "40%" },
			{ campo: "categoria", titulo: "CATEGORIA", ancho: "15%" }, { campo: "marca", titulo: "MARCA", ancho: "15%" },
			{ campo: "stock", titulo: "STOCK", ancho: "10%" }, { campo: "costo", titulo: "COSTO", ancho: "10%", visible: false },
			{ campo: "total_costo", titulo: "TOTAL COSTO", ancho: "10%", visible: false }, { campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: { atributosTabla: estiloTablaStockNegativo, celdas: celdasListadoInventario(false) }
	});
	return listadoInventarioProductos;
}

var listadoInformeGeneralProductos = null;
function iniciarListadoInformeGeneralProductos() {
	if (listadoInformeGeneralProductos) return listadoInformeGeneralProductos;
	listadoInformeGeneralProductos = crearListadoProductosEstructurado({
		nombre: "informe_general_productos", idCuerpo: "table_productos_informegralproductos", idCabecera: "tdTituloImpreinformegralproductos", ordenInicial: "categoria",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD. PRODUCTO", ancho: "8%" }, { campo: "producto", titulo: "PRODUCTO", ancho: "22%" },
			{ campo: "categoria", titulo: "CATEGORIA", ancho: "15%" }, { campo: "marca", titulo: "MARCA", ancho: "15%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "10%" }, { campo: "stock", titulo: "STOCK", ancho: "5%" },
			{ campo: "costo", titulo: "COSTO", ancho: "5%" }, { campo: "total_costo", titulo: "TOTAL COSTO", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: { atributosTabla: estiloTablaStockNegativo, celdas: celdasListadoInventario(true) }
	});
	return listadoInformeGeneralProductos;
}

var listadoStockProductos = null;
var listadoStockProductosImpresion = null;
function iniciarListadoStockProductos() {
	if (!listadoStockProductos) {
		listadoStockProductos = crearListadoProductosEstructurado({
			nombre: "stock_productos", idCuerpo: "table_comision_productosStock", idCabecera: "tdTituloStock", ordenInicial: "producto",
			columnas: [
				{ campo: "codigo_barra", titulo: "COD. PRODUCTO", ancho: "10%" }, { campo: "producto", titulo: "PRODUCTO", ancho: "30%" },
				{ campo: "categoria", titulo: "CATEGORIA", ancho: "10%" }, { campo: "marca", titulo: "MARCA", ancho: "10%" },
				{ campo: "stock_minimo", titulo: "STOCK MINIMO", ancho: "5%" }, { campo: "stock_actual", titulo: "STOCK ACTUAL", ancho: "5%" },
				{ campo: "faltante", titulo: "FALTANTE", ancho: "5%" }, { campo: "precio", titulo: "PRECIO", ancho: "5%" },
				{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "10%" }, { campo: "local", titulo: "LOCAL", ancho: "10%" }
			],
			fila: { celdas: [
				{ campo: "codigo_barra", columna: "codigo_barra", className: "tdRegistroSearch" }, { campo: "producto", columna: "producto", className: "tdRegistroSearch" },
				{ campo: "categoria", columna: "categoria", className: "tdRegistroSearch" }, { campo: "marca", columna: "marca", className: "tdRegistroSearch" },
				{ campo: "stock_minimo", columna: "stock_minimo", className: "tdRegistroSearch" }, { campo: "stock_actual", columna: "stock_actual", className: "tdRegistroSearch" },
				{ campo: "faltante", columna: "faltante", className: "tdRegistroSearch" }, { campo: "precio_formateado", columna: "precio", className: "tdRegistroSearch" },
				{ campo: "proveedor", columna: "proveedor", className: "tdRegistroSearch" }, { campo: "local", columna: "local", className: "tdRegistroSearch" }
			] }
		});
	}
	if (!listadoStockProductosImpresion) {
		listadoStockProductosImpresion = crearListadoProductosEstructurado({
			nombre: "stock_productos_impresion", idCuerpo: "table_comision_productosStock_2", idCabecera: "tdTituloImpreStock", ordenInicial: "producto",
			columnas: [{ campo: "producto", titulo: "PRODUCTO", ancho: "55%" }, { campo: "marca", titulo: "MARCA", ancho: "15%" }, { campo: "faltante", titulo: "FALTANTE", ancho: "10%" }, { campo: "local", titulo: "LOCAL", ancho: "20%" }],
			fila: { celdas: [
				{ campo: "producto", columna: "producto", className: "tdRegistroSearch" }, { campo: "marca", columna: "marca", className: "tdRegistroSearch" },
				{ campo: "faltante", columna: "faltante", className: "tdRegistroSearch" }, { campo: "local", columna: "local", className: "tdRegistroSearch" }
			] }
		});
	}
	return listadoStockProductos;
}

function renderizarCatalogoProductos(registros) {
	var contenedor = document.getElementById("table_comision_productos_catalago");
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	(Array.isArray(registros) ? registros : []).forEach(function (registro) {
		var tarjeta = document.createElement("div");
		tarjeta.className = "d-flex justify-content-center align-items-center";
		tarjeta.id = registro.codigo || "";
		tarjeta.setAttribute("role", "button");
		tarjeta.tabIndex = 0;
		tarjeta.style.cssText = "height:450px;border:8px solid #dddddd;background:#dddddd;border-radius:5px;";
		tarjeta.addEventListener("click", function () { obtenerdatoscatalogo(tarjeta); });
		tarjeta.addEventListener("keydown", function (evento) {
			if (evento.key === "Enter" || evento.key === " ") { evento.preventDefault(); obtenerdatoscatalogo(tarjeta); }
		});
		var detalle = document.createElement("div"); detalle.className = "ContenedorDetalleCatalogo position-relative d-flex flex-column w-100 h-100";
		if (Number(registro.puntos) !== 0) {
			var puntos = document.createElement("h2"); puntos.className = "position-absolute top-0 end-0 bg-danger text-white m-2 p-2 rounded";
			puntos.textContent = registro.puntos + " pts"; detalle.appendChild(puntos);
		}
		var promos = {
			"SI": ["/GoodVentaElectroCasaMaric/iconos/oferta.png", "linear-gradient(to bottom left,#d7cccc 40%,#bbc6ff 100%)"],
			"BLACK FRIDAY": ["/GoodVentaElectroCasaMaric/iconos/logo_BF.png", "linear-gradient(to bottom left,#d7cccc 40%,#adadad 100%)"],
			"REMATE": ["/GoodVentaElectroCasaMaric/iconos/GranRemate.png", "linear-gradient(to bottom left,#79e386 50%,#607D8B 100%)"],
			"RECUPERADO": ["/GoodVentaElectroCasaMaric/iconos/Recuperado.png", "linear-gradient(to bottom left,#2196F3 50%,#607D8B 100%)"],
			"DÍA DE LA MADRE": ["/GoodVentaElectroCasaMaric/iconos/dm.png", "linear-gradient(to bottom left,#c18977 50%,#dda756 100%)"],
			"DÍA DEL PADRE": ["/GoodVentaElectroCasaMaric/iconos/dp.png", "linear-gradient(to bottom left,#c18977 50%,#dda756 100%)"],
			"DÃA DE LA MADRE": ["/GoodVentaElectroCasaMaric/iconos/dm.png", "linear-gradient(to bottom left,#c18977 50%,#dda756 100%)"],
			"DÃA DEL PADRE": ["/GoodVentaElectroCasaMaric/iconos/dp.png", "linear-gradient(to bottom left,#c18977 50%,#dda756 100%)"]
		};
		var promocion = promos[registro.promo] || null;
		if (promocion) {
			var oferta = document.createElement("div"); oferta.className = "card_image_oferta";
			var imagenOferta = document.createElement("img"); imagenOferta.src = promocion[0]; imagenOferta.alt = registro.promo || "Promocion"; imagenOferta.className = "img-fluid";
			imagenOferta.style.cssText = "width:100%;height:auto;transform:rotate(-30deg);"; oferta.appendChild(imagenOferta); detalle.appendChild(oferta);
		}
		var marcoImagen = document.createElement("div"); marcoImagen.className = "text-center flex-grow-1 d-flex align-items-center justify-content-center";
		var imagen = document.createElement("img"); imagen.src = registro.imagen_url || "/GoodVentaElectroCasaMaric/iconos/imagen.png"; imagen.alt = registro.producto || "Producto"; imagen.className = "img-fluid mt-3";
		imagen.style.cssText = "max-height:300px;max-width:80%;object-fit:contain;";
		imagen.addEventListener("error", function () { imagen.src = "/GoodVentaElectroCasaMaric/iconos/imagen.png"; }, { once: true });
		marcoImagen.appendChild(imagen); detalle.appendChild(marcoImagen);
		var pie = document.createElement("div"); pie.className = "p-3 mt-auto w-100 d-flex flex-column align-items-center";
		pie.style.minHeight = "150px"; if (promocion) { pie.style.background = promocion[1]; pie.style.color = "white"; }
		function linea(etiqueta, valor) { var p = document.createElement("p"); p.className = "mb-1 text-center"; p.textContent = etiqueta + valor; pie.appendChild(p); }
		var tituloProducto = document.createElement("h2"); tituloProducto.className = "h5 fw-bold text-center"; tituloProducto.textContent = registro.producto || ""; pie.appendChild(tituloProducto);
		linea("Stock: ", registro.stock); linea("Marca: ", registro.marca || ""); linea("Cod. Barra: ", registro.codigo_barra || "");
		var precio = document.createElement("h2"); precio.className = "h4 mt-2 text-center"; precio.textContent = (registro.precio_contado_formateado || "0") + " Gs."; pie.appendChild(precio);
		detalle.appendChild(pie); tarjeta.appendChild(detalle); fragmento.appendChild(tarjeta);
	});
	contenedor.appendChild(fragmento);
}
function verCerrarAbmNuevoMotivo(){
	if(controlacceso("CREARNUEVOMOTIVO","accion")==false){return;}
	if(document.getElementById("divAbmNuevoMotivo").style.display==""){
		
		$("div[id=divAbmNuevoMotivo]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divAbmNuevoMotivo").style.display=""
BuscarAbmMotivoEgresoIngreso()
	}
}
function VerificarDatosMotivoEgresoIngreso() {
	var inptNuevoMotivo = document.getElementById('inptNuevoMotivoEgresoIngreso').value
	var inptEstadoMotivoEgresoIngreso = document.getElementById('inptEstadoMotivoEgresoIngreso').value
	
	if (inptNuevoMotivo == "") {
		ver_vetana_informativa("FALTO AGREGAR NUEVO MOTIVO")
		return false;
	}	


	if(idAbmMotivoEgresoIngreso != ''){
		accion = "editarMotivo";
	}else{
		accion = "NuevoMotivo";
	}
		
	
	abmNuevoMotivo(inptNuevoMotivo,inptEstadoMotivoEgresoIngreso, accion);
}
function abmNuevoMotivo(motivo, estado , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("motivo", motivo)
	datos.append("estado", estado)
	datos.append("idabm", idAbmMotivoEgresoIngreso)


	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
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
					buscaroptionMotivoEgresoIngreso()
					// verCerrarAbmNuevoMotivo()
					BuscarAbmMotivoEgresoIngreso()
					limpiarcamposmotivoegresoingreso()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscaroptionMotivoEgresoIngreso() {

	document.getElementById("ListMotivoMisGastos").innerHTML = ""
	document.getElementById("inptMotivoEgresoIngresoCobrador").innerHTML = ""
	// document.getElementById("inptBuscarIngresoEgreso3").innerHTML = ""
	document.getElementById("inptBuscarEgresoIngresoCobradores3").innerHTML = ""
	document.getElementById("listBuscarIngresoEgreso3").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("ListMotivoMisGastos").innerHTML = ''
			document.getElementById("inptMotivoEgresoIngresoCobrador").innerHTML = ''
			// document.getElementById("inptBuscarIngresoEgreso3").innerHTML = ""
			document.getElementById("inptBuscarEgresoIngresoCobradores3").innerHTML = ""
			document.getElementById("listBuscarIngresoEgreso3").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("ListMotivoMisGastos").innerHTML = ''
			document.getElementById("inptMotivoEgresoIngresoCobrador").innerHTML = ''
			// document.getElementById("inptBuscarIngresoEgreso3").innerHTML = ""
			document.getElementById("inptBuscarEgresoIngresoCobradores3").innerHTML = ""
			document.getElementById("listBuscarIngresoEgreso3").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = Array.isArray(datos[2]) ? datos[2] : [];
					renderizarCatalogoMotivoEgresoIngreso("ListMotivoMisGastos", datos_buscados, false, null)
					renderizarCatalogoMotivoEgresoIngreso("inptMotivoEgresoIngresoCobrador", datos_buscados, true, "SELECCIONAR")
					// document.getElementById("inptBuscarIngresoEgreso3").innerHTML = datos_buscados
					renderizarCatalogoMotivoEgresoIngreso("inptBuscarEgresoIngresoCobradores3", datos_buscados, true, "SELECCIONAR")
					renderizarCatalogoMotivoEgresoIngreso("listBuscarIngresoEgreso3", datos_buscados, false, null)

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function BuscarAbmMotivoEgresoIngreso() {
	var listado = iniciarListadoAbmMotivoEgresoIngreso()
	var buscador = document.getElementById("inptBuscarAbmMotivoEgresoIngreso").value
	var estado = "Activo"
	document.getElementById("divBuscadorMotivoEgresoIngreso").innerHTML = paginacargando
    document.getElementById("lblNroRegistroMotivoEgresoIngreso").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "buscarabmmotivoingresoegreso"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorMotivoEgresoIngreso").innerHTML = ''
			document.getElementById("lblNroRegistroMotivoEgresoIngreso").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorMotivoEgresoIngreso").innerHTML = ''
			document.getElementById("lblNroRegistroMotivoEgresoIngreso").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
                   document.getElementById("lblNroRegistroMotivoEgresoIngreso").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   buscaroptionMotivoEgresoIngreso()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
		});
	}
	if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmMotivoEgresoIngreso);
	else iniciarListadoAbmMotivoEgresoIngreso();

var idAbmMotivoEgresoIngreso = "";
function ObtenerdatosAbmMotivoEgresoIngreso(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	ElementoSeleccMarca=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNuevoMotivoEgresoIngreso").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoMotivoEgresoIngreso").value = $(datostr).children('td[id="td_datos_2"]').html();
	idAbmMotivoEgresoIngreso= $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnMotivoIngresoEgreso").value="Editar Datos"
}

function limpiarcamposmotivoegresoingreso(){
	  document.getElementById("inptNuevoMotivoEgresoIngreso").value = ''
    document.getElementById("inptEstadoMotivoEgresoIngreso").value = 'Activo'
	idAbmMotivoEgresoIngreso=''
     document.getElementById("btnMotivoIngresoEgreso").value="Guardar"
}

/*VISTA DE CAJA*/
function verCerrarVistaCajaApp(){
	
	
	if(document.getElementById("divVistaCajaApp").style.display==""){
	//document.getElementById("divVistaCajaApp").style.display="none"
	
	limpiacamposvistacaja()
	 
$("div[id=divVistaCajaApp]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divVistaCajaApp").style.display=""
		
		  
	}
}

function limpiacamposvistacaja(){
	document.getElementById('inptBuscarVistaCajaF1').value="";
    document.getElementById('inptBuscarVistaCajaF2').value="";
	document.getElementById('inptBuscarVistaCaja1').value="";
	document.getElementById('inptBuscarVistaCaja2').value="";
	document.getElementById('inptTotalRegistoVistaCaja').value="";
	document.getElementById('table_vista_caja_app').innerHTML="";
}

function checkHistorialVistadeCaja(d){	
	if(d=="1"){
		document.getElementById('checkHistorialVistadeCaja1').checked=true
		document.getElementById('checkHistorialVistadeCaja2').checked=false
		document.getElementById('inptBuscarVistaCajaF1').value = "";
	    document.getElementById('inptBuscarVistaCajaF2').value = "";	
	}else{		
		document.getElementById('checkHistorialVistadeCaja1').checked=false
		document.getElementById('checkHistorialVistadeCaja2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarVistaCajaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarVistaCajaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

var listadoVistaCajaApp = null;
function iniciarListadoVistaCajaApp() {
	if (listadoVistaCajaApp) return listadoVistaCajaApp;
	listadoVistaCajaApp = crearListadoProductosEstructurado({
		nombre: "vista_caja_app",
		idCuerpo: "table_vista_caja_app",
		ordenInicial: "fecha_apertura",
		columnas: [
			{ campo: "cobrador", titulo: "COBRADOR", ancho: "10%" },
			{ campo: "fecha_apertura", titulo: "FECHA APERTURA", ancho: "10%" },
			{ campo: "fecha_cierre", titulo: "FECHA CIERRE", ancho: "10%" },
			{ campo: "monto_recaudado", titulo: "MONTO RECAUDADO", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosaperturacierrecajaapp",
			celdas: [
				{ id: "td_id_1", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "cobrador", columna: "cobrador" },
				{ id: "td_datos_9", campo: "fecha_apertura", columna: "fecha_apertura" },
				{ id: "td_datos_3", campo: "fecha_cierre", columna: "fecha_cierre" },
				{ id: "td_datos_7", campo: "monto_recaudado_formateado", columna: "monto_recaudado" },
				{ id: "td_datos_5", campo: "estado", columna: "estado" }
			]
		}
	});
	return listadoVistaCajaApp;
}

function buscarvistacajaapp() {

	var fecha1 = document.getElementById('inptBuscarVistaCajaF1').value
	var fecha2 = document.getElementById('inptBuscarVistaCajaF2').value
	var cobrador = document.getElementById('inptBuscarVistaCaja1').value
	var estado = document.getElementById('inptBuscarVistaCaja2').value
	document.getElementById("table_vista_caja_app").innerHTML = paginacargando;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrador": cobrador,
		"estado": estado,
		"formato": "json",
		"funt": "buscarcajaapp"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_caja_app").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_caja_app").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					var listado = iniciarListadoVistaCajaApp();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_vista_caja_app").innerHTML = typeof datos_buscados === "string" ? datos_buscados : "";
					document.getElementById("inptTotalRegistoVistaCaja").value = datos[3];
					
				}
				
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
	var codCajaApp="";
function obtenerdatosaperturacierrecajaapp(datostr) {
	
	codCajaApp = $(datostr).children('td[id="td_id_1"]').html();
	buscararqueo3()
	
	document.getElementById("divVistaCajaApp").style.display="none"
}

/*
COBROS REALIZADOS
*/
function verCerrarInformeArqueo(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divArqueo").style.display==""){
	//  
	$("div[id=divArqueo]").fadeOut(500);	
	document.getElementById("divMinimizadoCobrosRealizados1").style.display="none"
	document.getElementById("divMinimizadoCobrosRealizados2").style.display="none"
	limpiacamposArqueo()
		
	}else{		
	if(controlacceso("VERCOBROSREALIZADOS","accion")==false){return;}
	mostrarSoloUno("divArqueo")	
		document.getElementById("divArqueo").style.display=""
 
	}
}
function limpiacamposArqueo(){
	document.getElementById('inptBuscarCobrosRealizados4').value="";
    document.getElementById('inptBuscarCobrosRealizados1').value="";
	document.getElementById('inptBuscarCobrosRealizados3').value="";
	document.getElementById('inptBuscarCobrosRealizadosF1').value="";
	document.getElementById('inptBuscarCobrosRealizadosF2').value="";
	document.getElementById('inptBuscarCobrosRealizados2').value="";
	document.getElementById('inptlocalCobrosRealizados3').value="";
	document.getElementById('inptBuscarCobrosRealizados5').value="";
	document.getElementById('inptBuscarCobrosRealizados7').value="";
	document.getElementById('inptTotalRegistoArqueo').value="";
	document.getElementById('inptTotalArqueo').value="";
	document.getElementById('inptTotalEfectivoArqueo').value="";
	document.getElementById('inptTotalTarjetaArqueo').value="";
	document.getElementById('inptCobrosRealizadosComprobante').value="";
	renderResumenTiposPagoCobrosRealizados([], true);
	if (listadoCobrosRealizados) listadoCobrosRealizados.establecerRegistros([]);
	else document.getElementById("table_arqeo").innerHTML=""
}
function minimizarArqueo(){
	//  
	$("div[id=divArqueo]").fadeOut(500);	
	document.getElementById("divMinimizadoCobrosRealizados1").style.display=""
	document.getElementById("divMinimizadoCobrosRealizados2").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCobrosRealizado1"));
}
function checkfiltrosCobrosRealizados(d){	
	if(d=="1"){
		document.getElementById('checkfiltrosCobrosRealizados1').checked=true
		document.getElementById('checkfiltrosCobrosRealizados2').checked=false
		document.getElementById('inptBuscarCobrosRealizadosF1').value = "";
	    document.getElementById('inptBuscarCobrosRealizadosF2').value = "";	
	}else{		
		document.getElementById('checkfiltrosCobrosRealizados1').checked=false
		document.getElementById('checkfiltrosCobrosRealizados2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarCobrosRealizadosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarCobrosRealizadosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

var cobradorarqueo = "";
var idHistorialPago = "";
var cod_ventaFKPago = "";
var lat = "";
var lot = "";
var listadoCobrosRealizados = null;

function renderResumenTiposPagoCobrosRealizados(resumen, ocultar) {
	var contenedor = document.getElementById("resumenTiposPagoArqueo");
	if (!contenedor) return;

	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}
	contenedor.hidden = true;
	if (ocultar === true) return;

	var metricas = document.createElement("div");
	metricas.className = "cobros-resumen-tipos__metricas";

	function agregarMetrica(etiqueta, valor, claseAdicional) {
		var metrica = document.createElement("div");
		metrica.className = "cobros-resumen-global" + (claseAdicional ? " " + claseAdicional : "");

		var nombre = document.createElement("span");
		nombre.textContent = etiqueta;
		metrica.appendChild(nombre);

		var importe = document.createElement("strong");
		importe.textContent = valor;
		metrica.appendChild(importe);

		metricas.appendChild(metrica);
	}

	var totalClientes = document.getElementById("inptTotalClienteArqueo");
	var totalPagos = document.getElementById("inptTotalArqueo");
	var valorClientes = totalClientes && totalClientes.value ? totalClientes.value : "0";
	var valorPagos = totalPagos && totalPagos.value ? totalPagos.value : "0";
	if (!/\sGs$/i.test(valorPagos)) valorPagos += " Gs";

	agregarMetrica("Clientes que pagaron", valorClientes, "cobros-resumen-global--clientes");
	agregarMetrica("Total de todos los pagos", valorPagos, "cobros-resumen-global--total");
	contenedor.appendChild(metricas);

	var lista = document.createElement("div");
	lista.className = "cobros-resumen-tipos__lista";

	if (!Array.isArray(resumen) || resumen.length === 0) {
		var vacio = document.createElement("span");
		vacio.className = "cobros-resumen-tipos__vacio";
		vacio.textContent = "Sin cobros para totalizar";
		lista.appendChild(vacio);
	} else {
		resumen.forEach(function (item) {
			var tarjeta = document.createElement("article");
			tarjeta.className = "cobros-resumen-tipo";

			var cabecera = document.createElement("div");
			cabecera.className = "cobros-resumen-tipo__cabecera";

			var metodo = document.createElement("span");
			metodo.className = "cobros-resumen-tipo__metodo";
			metodo.textContent = item.metodo || "SIN ESPECIFICAR";
			cabecera.appendChild(metodo);

			var registros = document.createElement("span");
			registros.className = "cobros-resumen-tipo__registros";
			registros.textContent = (item.registros || 0) + ((item.registros || 0) === 1 ? " registro" : " registros");
			cabecera.appendChild(registros);
			tarjeta.appendChild(cabecera);

			var monto = document.createElement("strong");
			monto.className = "cobros-resumen-tipo__monto";
			monto.textContent = (item.monto_formateado || "0") + " Gs";
			tarjeta.appendChild(monto);

			if (Array.isArray(item.tipos) && item.tipos.length > 0) {
				var detalle = document.createElement("div");
				detalle.className = "cobros-resumen-tipo__detalle";
				item.tipos.forEach(function (tipo) {
					var etiqueta = document.createElement("span");
					etiqueta.className = "cobros-resumen-tipo__etiqueta";
					etiqueta.textContent = (tipo.tipo || "SIN TIPO") + ": " + (tipo.monto_formateado || "0") + " Gs";
					detalle.appendChild(etiqueta);
				});
				tarjeta.appendChild(detalle);
			}

			lista.appendChild(tarjeta);
		});
	}

	contenedor.appendChild(lista);
	contenedor.hidden = false;
}

function crearClienteCobrosRealizados(registro) {
	var fragmento = document.createDocumentFragment();
	var calificacion = registro.calificacion || "";
	if (registro.grupo === "cuota" && calificacion !== "" && calificacion !== "SIN REGISTRO") {
		var colores = {
			"CAT A": "#00FF00", "CAT B": "#66FF33", "CAT C": "#CCFF33",
			"CAT D": "#FFFF00", "CAT E": "#FFCC33", "CAT F": "#FF9900",
			"CAT G": "#FF6600", "CAT H": "#FF3300", "CAT I": "#FF0000",
			"CAT J": "#CC0000", "CAT K": "#990000"
		};
		var insignia = document.createElement("span");
		insignia.className = "fw-bold px-2 py-1 rounded";
		insignia.style.backgroundColor = colores[calificacion] || "#010036";
		insignia.style.color = colores[calificacion] ? "#000" : "#fcfcfc";
		insignia.textContent = calificacion;
		fragmento.appendChild(insignia);
		fragmento.appendChild(document.createElement("br"));
	}
	fragmento.appendChild(document.createTextNode("*" + (registro.documento || "") + "*"));
	fragmento.appendChild(document.createElement("br"));
	fragmento.appendChild(document.createTextNode(registro.cliente || ""));
	return fragmento;
}

function crearFacturaCobrosRealizados(registro) {
	var fragmento = document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.factura || ""));
	fragmento.appendChild(document.createElement("br"));
	var comprobante = document.createElement("strong");
	comprobante.textContent = registro.comprobante_pago || "";
	fragmento.appendChild(comprobante);
	return fragmento;
}

function crearFechaCobrosRealizados(registro) {
	var fragmento = document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.hora || ""));
	fragmento.appendChild(document.createElement("br"));
	fragmento.appendChild(document.createTextNode("Venc.:" + (registro.fecha_vencimiento || "")));
	return fragmento;
}

function iniciarListadoCobrosRealizados() {
	if (listadoCobrosRealizados || !window.AbmListadoCore) return listadoCobrosRealizados;
	var cabecera = document.getElementById("tdTituloImpreArqueo");
	var cuerpo = document.getElementById("table_arqeo");
	if (!cabecera || !cuerpo) return null;
	var filaCabecera = cabecera.querySelector("tr");
	if (!filaCabecera) return null;
	filaCabecera.id = "filaTituloImpreArqueo";
	var ambito = document.getElementById("divArqueo");
	var opcionesColumnas = ambito ? ambito.querySelector(".abm-estandar-menu-columnas") : null;
	if (opcionesColumnas) opcionesColumnas.id = "opcionesColumnasCobrosRealizados";

	listadoCobrosRealizados = window.AbmListadoCore.crear({
		nombre: "cobros_realizados",
		idCabecera: "filaTituloImpreArqueo",
		idCuerpo: "table_arqeo",
		idOpcionesColumnas: "opcionesColumnasCobrosRealizados",
		columnas: [
			{ campo: "cliente", titulo: "CLIENTE", ancho: "10%" },
			{ campo: "cobrador_asignado", titulo: "COBRADOR ASIG", ancho: "10%" },
			{ campo: "cobrador", titulo: "COBRADOR", ancho: "10%" },
			{ campo: "factura", titulo: "NRO FACTURA", ancho: "10%" },
			{ campo: "fecha_pago", titulo: "FECHA PAGO", ancho: "10%" },
			{ campo: "monto", titulo: "MONTO", ancho: "5%" },
			{ campo: "total_pagado", titulo: "T. PAGADO", ancho: "5%" },
			{ campo: "metodo", titulo: "METODO", ancho: "5%" },
			{ campo: "tipo_comprobante", titulo: "COMPROBANTE", ancho: "5%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "5%" },
			{ campo: "cuota", titulo: "CUOTA", ancho: "5%" },
			{ campo: "condicion", titulo: "CONDICION", ancho: "10%" },
			{ campo: "morosidad", titulo: "MOROSIDAD", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatospagos",
			atributosFila: function (registro) {
				if (registro.grupo === "cuota" && registro.cancelado === "SI") {
					return { style: { backgroundColor: "#FFEB3B", color: "#000" } };
				}
				return {};
			},
			celdas: [
				{ id: "td_datos_1", campo: "id_pago", tecnica: true },
				{ id: "td_datos_3", campo: "num_factura", tecnica: true },
				{ id: "td_datos_9", campo: "cliente", columna: "cliente", render: function (valor, registro) { return crearClienteCobrosRealizados(registro); } },
				{ campo: "cobrador_asignado", columna: "cobrador_asignado" },
				{ id: "td_datos_4", campo: "cobrador", columna: "cobrador" },
				{ campo: "factura", columna: "factura", render: function (valor, registro) { return crearFacturaCobrosRealizados(registro); } },
				{ id: "td_datos_2", campo: "fecha_pago", tecnica: true },
				{ campo: "fecha_pago", columna: "fecha_pago", render: function (valor, registro) { return crearFechaCobrosRealizados(registro); } },
				{ id: "td_datos_5", campo: "monto_formateado", columna: "monto" },
				{ campo: "total_pagado_formateado", columna: "total_pagado" },
				{ campo: "metodo", columna: "metodo" },
				{ campo: "tipo_comprobante", columna: "tipo_comprobante" },
				{ campo: "tipo", columna: "tipo" },
				{ id: "td_datos_12", campo: "cuota", columna: "cuota" },
				{ campo: "condicion", columna: "condicion" },
				{ campo: "morosidad", columna: "morosidad" },
				{ campo: "zona", tecnica: true },
				{ id: "td_datos_6", campo: "comision", tecnica: true },
				{ id: "td_datos_7", campo: "longitud", tecnica: true },
				{ id: "td_datos_8", campo: "latitud", tecnica: true },
				{ id: "td_datos_10", campo: "cod_venta", tecnica: true },
				{ id: "td_datos_11", campo: "cod_credito", tecnica: true },
				{ id: "td_datos_13", campo: "cod_cliente", tecnica: true }
			]
		}
	});
	listadoCobrosRealizados.iniciar();
	return listadoCobrosRealizados;
}

function prepararListadoCobrosRealizados() {
	setTimeout(iniciarListadoCobrosRealizados, 0);
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", prepararListadoCobrosRealizados);
} else {
	prepararListadoCobrosRealizados();
}

function obtenerdatospagos(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	idHistorialPago = $(datostr).children('td[id="td_datos_1"]').html() || "";
	cod_ventaFKPago = $(datostr).children('td[id="td_datos_10"]').html() || "";
	cod_clienteBuscarUbicacion = $(datostr).children('td[id="td_datos_13"]').html() || "";
		document.getElementById("btnEliminarCobros1").style.backgroundColor="red"
		
		lat = $(datostr).children('td[id="td_datos_8"]').html() || "";
		lot = $(datostr).children('td[id="td_datos_7"]').html() || "";
		LatGeo = lat;
		LonGeo = lot;
		
		document.getElementById('inptCuotaNroOpcionespagosCobrosRealizados').value = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptMontoOpcionpagosCobrosRealizados').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptMotivoOpcionpagosCobrosRealizados').value = "";	
	codCreditoPagos = $(datostr).children('td[id="td_datos_11"]').html() || "";
	
	document.getElementById('btnCobrosRealizadosUbicacion').style.backgroundColor = ''
	
}
function VerUbicacion(){
	if(lat=="" || lot=="" || lat === "0" || lot === "0"){
		ver_vetana_informativa("ESTE PAGO NO CUENTA CON LATITUD Y LONGITUD")
	  return false;

	}
	window.open("https://www.google.com.py/maps/place/"+lat+","+lot)
}
/*
IMPRIMIR COD. DE BARRAS
*/
function verCerrarInformeCodBarra(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeCodBarra").style.display==""){
	    document.getElementById("divMinimizadoImprimirCodBarra").style.display="none"
//  
	$("div[id=divInformeCodBarra]").fadeOut(500);	
		limpiarCamposBuscadorCodBarra();
		}else{		
		if(controlacceso("VERINFORMECODIGOBARRA","accion")==false){return;}
		mostrarSoloUno("divInformeCodBarra")	
		document.getElementById("divInformeCodBarra").style.display=""
 //  
	
		
	}
}
function limpiarCamposBuscadorCodBarra(){
	document.getElementById("inptProveedorProductoCodBarra1").value=""
	document.getElementById("inptProveedorProductoCodBarra2").value=""
	document.getElementById("table_comision_productos_cod_barra").innerHTML=""
	if (listadoCodigoBarraProductos) listadoCodigoBarraProductos.establecerRegistros([]);
}
function minimizarventanacodbarra(){
	document.getElementById("divMinimizadoImprimirCodBarra").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCodigoBarra"));
	$("div[id=divInformeCodBarra]").fadeOut(500);	
}
function buscarcodBarraProducto() {
	if(controlacceso("VERINFORMECODIGOBARRA","accion")==false){return;}
	var listado = iniciarListadoCodigoBarraProductos();
	var paginas = controldeSelecCodigoBarra();
	var codigo = document.getElementById('inptProveedorProductoCodBarra1').value
	var producto = document.getElementById('inptProveedorProductoCodBarra2').value
	var local = document.getElementById('inptlocalProductoBuscarCodBarra').value
	var existencia = document.getElementById('inptExistenciaProductoBuscarCodBarra').value
	document.getElementById("table_comision_productos_cod_barra").innerHTML = listado ? paginacargando : paginas+paginacargando;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"producto": producto,
		"codigo": codigo,
		"local": local,
		"existencia": existencia,
		"formato": listado ? "json" : "",
		"funt": "buscarcodBarra"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_productos_cod_barra").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_productos_cod_barra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado && Array.isArray(datos[2])) {
						var claves = {};
						paginas.forEach(function (registro) { claves[String(registro.codigo) + "|" + String(registro.codigo_local)] = true; });
						var nuevos = datos[2].filter(function (registro) { return !claves[String(registro.codigo) + "|" + String(registro.codigo_local)]; });
						listado.establecerRegistros(paginas.concat(nuevos));
					} else {
						document.getElementById("table_comision_productos_cod_barra").innerHTML = paginas + (typeof datos[2] === "string" ? datos[2] : "");
					}
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function controldeSelecCodigoBarra(){
	var listado = iniciarListadoCodigoBarraProductos();
	if (listado) {
		return listado.estado.registros.filter(function (registro) {
			return !!registro.seleccionado || Number(registro.cantidad) > 0;
		});
	}
	var pagina="";
	$("tr[id=tr_Codigo_barras]").each(function(i, elementohtml){        
		var tdCheck=$(elementohtml).children('td[id="td_datos_6"]');
		var inpt=$(tdCheck).children('input[id="btnCheck"]');
		var tdCant=$(elementohtml).children('td[id="td_datos_5"]');
		var tdprecio=$(elementohtml).children('td[id="td_datos_7"]');
		var inptCantidad=$(tdCant).children('input[id="inptCantidad"]').val();		
		if ($(inpt).is(':checked') || inptCantidad>0 ) {      
        pagina+="<table class='tableRegistroSearch'  border='0' cellspacing='0' cellpadding='0'>"
+"<tr id='tr_Codigo_barras' >"
+"<td id='td_datos_6' style='width:10%'><input id='btnCheck' type='checkbox'  checked  /></td>"
+"<td id='td_datos_1' style='width:15%'>"+$(elementohtml).children('td[id="td_datos_1"]').html()+"</td>"
+"<td id='td_datos_2' style='width:35%'>"+$(elementohtml).children('td[id="td_datos_2"]').html()+"</td>"
+"<td  id='td_datos_3' style='width:20%'>"+$(elementohtml).children('td[id="td_datos_3"]').html()+"</td>"
+"<td id='td_datos_5' style='width:10%'><input id='inptCantidad'  type='text'  class='input5' value='"+inptCantidad+"' /></td>"
+"<td  id='td_datos_7' style='display:none'>"+$(elementohtml).children('td[id="td_datos_7"]').html()+"</td>"
+"</tr>"
+"</table>";     
       }		
	   });	   
	   return pagina;
}
function ImprimirCodigoBarra(){
	var pagina="";
	var nroimg=0;
	var nroimgCant=0;
	var contadorIng=0;
	var etiquetasImprimir=[];
	$("tr[id=tr_Codigo_barras]").each(function(i, elementohtml){        
		var tdCheck=$(elementohtml).children('td[id="td_datos_6"]');
		var inpt=$(tdCheck).children('input[id="btnCheck"]');
		var tdCant=$(elementohtml).children('td[id="td_datos_5"]');
		var tdprecio=$(elementohtml).children('td[id="td_datos_7"]');
		var inptCantidad=$(tdCant).children('input[id="inptCantidad"]').val();	

	
		if ($(inpt).is(':checked') || inptCantidad>0 ) {
	
      nroimgCant=0;
	  
	  var precio_contado= $(elementohtml).children('td[id="td_datos_3"]').html()
	 
	  
	  
	  
      while(nroimgCant<inptCantidad){
		  
		  
	  let TextoContadoTicket = "";		  
	
	  if(precio_contado!=0){
		  TextoContadoTicket = "<div class='etiqueta-precio__bloque etiqueta-precio__contado'><b>CONTADO:</b><span>"+$(elementohtml).children('td[id="td_datos_3"]').html() +" Gs.</span></div>";
		  
	  }	   
		  
    pagina="<article class='divCodigobarra etiqueta-precio'>"
	+"<table class='etiqueta-precio__tabla'><tbody><tr>"
	+"<td class='etiqueta-precio__logo'>"
	+"<img src='/GoodVentaElectroCasaMaric/iconos/LogoSA.JPG' alt='Grupo Elim S.A.'/>"
	+"</td>"
	+"<td class='etiqueta-precio__detalle'>"
	+"<div class='etiqueta-precio__bloque etiqueta-precio__producto'>"
	+"<b>PRODUCTO:</b><strong>"+$(elementohtml).children('td[id="td_datos_2"]').html() +"</strong></div>"
	+TextoContadoTicket
	+"<div class='etiqueta-precio__bloque etiqueta-precio__cuotas'>"+$(elementohtml).children('td[id="td_datos_7"]').html()+"</div>"
	+"</td></tr></tbody></table>"
	+"</article>";
	
	
  etiquetasImprimir.push(pagina);
     // JsBarcode("#CodBarra"+nroimg+"_"+nroimgCant, $(elementohtml).children('td[id="td_datos_1"]').html());
	 nroimgCant=nroimgCant+1;
	 contadorIng=contadorIng + 1;
	  }	 
	 nroimg=nroimg+1;
       }		
	   });
	if(etiquetasImprimir.length===0){
		alert("Seleccione al menos un producto e indique la cantidad de etiquetas.");
		return;
	}

	var documentoEtiquetas="<style>"
		+".impresion-etiquetas{width:100%;height:auto;overflow:visible;background:#fff;color:#111;font-family:Arial,sans-serif;}"
		+".impresion-etiquetas__pagina{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;width:100%;height:auto;overflow:visible;align-content:start;page-break-after:always;break-after:page;}"
		+".impresion-etiquetas__pagina:last-child{page-break-after:auto;break-after:auto;}"
		+".impresion-etiquetas .divCodigobarra{float:none!important;width:100%!important;min-width:0;height:auto;overflow:hidden!important;box-sizing:border-box;padding:2mm;border:0.35mm dashed #ccc;background:#fff;page-break-inside:avoid;break-inside:avoid;}"
		+".etiqueta-precio,.etiqueta-precio *{box-sizing:border-box;}"
		+".etiqueta-precio__tabla{width:100%!important;max-width:100%!important;table-layout:fixed;border-collapse:collapse;}"
		+".etiqueta-precio__logo{width:38%;padding:2mm;vertical-align:top;text-align:center;overflow:hidden;}"
		+".etiqueta-precio__logo img{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:25mm;margin:1mm auto;object-fit:contain;}"
		+".etiqueta-precio__detalle{width:62%;min-width:0;padding:0;vertical-align:top;overflow:hidden;}"
		+".etiqueta-precio__bloque{width:100%;min-width:0;margin:0 0 0.8mm;padding:1.2mm;border:0.3mm solid #393939;border-radius:2.2mm;overflow:hidden;font-size:7.5pt;line-height:1.15;}"
		+".etiqueta-precio__bloque>b{display:block;margin:0 0 0.5mm;font-size:7pt;text-decoration:underline;text-align:left;}"
		+".etiqueta-precio__producto strong,.etiqueta-precio__contado span{display:block;width:100%;font-size:8pt;line-height:1.2;text-align:center;overflow-wrap:anywhere;}"
		+".etiqueta-precio__cuotas .pTitulo2{display:block!important;margin:0 0 0.5mm!important;padding:0!important;font-size:7pt!important;line-height:1!important;}"
		+".etiqueta-precio__cuotas table{width:100%!important;max-width:100%!important;height:auto!important;margin:0!important;border-collapse:collapse!important;table-layout:fixed!important;font-size:6.5pt!important;line-height:1.05!important;}"
		+".etiqueta-precio__cuotas td{width:100%!important;padding:0.25mm 0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:clip!important;}"
		+"@page{size:A4 portrait;margin:7mm;}"
		+"@media print{html,body,form,#divimpr{width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;overflow:visible!important;} .imgFondoapp{display:none!important;}}"
		+"</style><div class='impresion-etiquetas'>";

	for(var indiceEtiqueta=0;indiceEtiqueta<etiquetasImprimir.length;indiceEtiqueta++){
		if(indiceEtiqueta%6===0){
			documentoEtiquetas+="<section class='impresion-etiquetas__pagina'>";
		}
		documentoEtiquetas+=etiquetasImprimir[indiceEtiqueta];
		if(indiceEtiqueta%6===5 || indiceEtiqueta===etiquetasImprimir.length-1){
			documentoEtiquetas+="</section>";
		}
	}
	documentoEtiquetas+="</div>";
	document.getElementById("DivTablasBarras").innerHTML=documentoEtiquetas;
	var documento=document.getElementById("DivTablasBarras").innerHTML;
	// documento=b64EncodeUnicode(documento)
	 localStorage.setItem("reporte", documento);
	  localStorage.setItem("tipo", "reporte");
	 window.open("/GoodVentaElectroCasaMaric/system/report.html?x=20260723impresionetiquetas2");
	document.getElementById("DivTablasBarras").innerHTML="";
}
/*
INFORME CATALOGO
*/
function verCerrarInformeCatalogo(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeCatalago").style.display==""){
		limpiarbuscadorcatalogo()
		//  
	$("div[id=divInformeCatalago]").fadeOut(500);	
		document.getElementById("divMinimizadoCatalago").style.display="none"
		
		}else{
if(controlacceso("VERCATALOGO","accion")==false){return;}
mostrarSoloUno("divInformeCatalago")			
		document.getElementById("divInformeCatalago").style.display=""
 
	}
}
function limpiarbuscadorcatalogo(){
	document.getElementById("inptProveedorProductoCatalogo").value=""
	document.getElementById("table_comision_productos_catalago").innerHTML=""
}
function minimizarcatalogo(){ 
	$("div[id=divInformeCatalago]").fadeOut(500);
	document.getElementById("divMinimizadoCatalago").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCatalogo2"));
}

function buscarproductoscatalago() {	
if(controlacceso("VERCATALOGO","accion")==false){return;}	
	var descripcion = document.getElementById('inptProveedorProductoCatalogo').value
	var categoria = document.getElementById('inptCategoriaProductoCatalogo').value
	var marca = document.getElementById('inptMarcaProductoCatalogo3').value
	var control = document.getElementById('inptStockProductoCatalogo').value
	var local = document.getElementById('inptlocalProductoBuscarCatalago').value
	var promo = document.getElementById('inptPromoProductoCatalogo').value
	document.getElementById("table_comision_productos_catalago").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"descripcion": descripcion,
		"categoria": categoria,
		"marca": marca,
		"control": control,
		"local": local,
		"promo": promo,
		"formato": "json",
		"funt": "buscarCatalogo"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_productos_catalago").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_productos_catalago").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if (Array.isArray(datos[2])) renderizarCatalogoProductos(datos[2]);
					else document.getElementById("table_comision_productos_catalago").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


// PRECIO CATALOGO
function verCerrarFrmPrecioCatalogo(d){
	if(d=="1"){
		document.getElementById('divAbmPrecioCatalogo').style.display = ''
	}else{
		document.getElementById('divAbmPrecioCatalogo').style.display = 'none'
	}
}


function buscardetallesprecioenbuscarcatalogo(cod_producto) {
	var cuerpo = document.getElementById("divBuscadorPrecioCatalogo");
	var listado = typeof iniciarListadoResumenDetallePrecio === "function"
		? iniciarListadoResumenDetallePrecio("divBuscadorPrecioCatalogo")
		: null;
	if (!cuerpo) { return; }
	if (listado) { listado.establecerRegistros([]); }
	cuerpo.innerHTML = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": cod_producto,
		"formato": listado ? "json" : "",
		"funt": "buscarabmproductos"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			cuerpo.innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			cuerpo.innerHTML = ''
			try {
				var datosRespuesta = $.parseJSON(Respuesta);
				Respuesta = datosRespuesta["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado && Array.isArray(datosRespuesta[2])) {
						listado.establecerRegistros(datosRespuesta[2]);
					} else {
						cuerpo.innerHTML = typeof datosRespuesta[2] === "string" ? datosRespuesta[2] : "";
					}
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}



function buscardetallesexistenciaporlocal(cod_producto) {
	var listado = iniciarListadoExistenciaLocalCatalogo();
	if (listado) listado.establecerRegistros([]); else document.getElementById("divBuscadorExistenciaLocalCatalogo").innerHTML = "";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": cod_producto,
		"formato": listado ? "json" : "",
		"funt": "buscarexistencialocal"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorExistenciaLocalCatalogo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorExistenciaLocalCatalogo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("divBuscadorExistenciaLocalCatalogo").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}


function obtenerdatoscatalogo(datos){
	// buscardetallesprecioenbuscarcatalogo(datos.id);
	buscardetallesexistenciaporlocal(datos.id);
	buscarcomboproductocatalogo(datos.id);
	buscardetalles_lista_precio(datos.id);
	verCerrarFrmPrecioCatalogo("1")
}

function buscarcomboproductocatalogo(cod_comboFKproducto) {
	var listado = iniciarListadoComboCatalogo();
	document.getElementById("divBuscadorProductosComboCatalogo").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_comboFK": cod_comboFKproducto,
		"cod_localFK": cod_localFKUSer,
		"formato": listado ? "json" : "",
		"funt": "buscar_vista_productos_combo_catalogo"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorProductosComboCatalogo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorProductosComboCatalogo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
				else document.getElementById("divBuscadorProductosComboCatalogo").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
				// vercerrarvistacombo('1',desde)
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function construirCarrusel(array){
	
	let paginaCarrusel = '';
	
	array.forEach(url =>{
		let elemento = '<section class="slider-section">'+
                '<img src="'+url+'">'+
            '</section>';
			
			paginaCarrusel += elemento;
	});
	
	document.getElementById('slider').innerHTML = paginaCarrusel;
	
	sliderSection = document.querySelectorAll(".slider-section");
	
	widthImg = (sliderSection.length * 10) / sliderSection.length;
}

//VISOR DE IMAGEN VEHICULOS
function verCerrarVisorCarrusel(d){
	if(d == '1'){
		document.getElementById('divVisorVehiculos').style.display = 'none'
	}else{
		document.getElementById('divVisorVehiculos').style.display = ''
	}
}

/*
CLIENTES INACTIVOS
*/
function vercerrarclientesinactivos(d) {
	document.getElementById("divSegundoPlano").style.display="none";
	if (d == "1") {
		if(controlacceso("VERCLIENTESINACTIVOS","accion")==false){return;}
		mostrarSoloUno("divClientesInactivos")	
		document.getElementById("divClientesInactivos").style.display=""
		  		
		} else {
			if(controldebusquedadClientesInactivos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		limpiarcamposbuscarclientes()
		document.getElementById("divMinimizadoClientesInactivo").style.display="none"
		 
	$("div[id=divClientesInactivos]").fadeOut(500);			
	}
}
function limpiarcamposbuscarclientes(){
	if(controldebusquedadClientesInactivos==true){
	
	return
}
	document.getElementById("inputBuscarClientesInactivos1").value=""
	document.getElementById("inputBuscarClientesInactivos2").value=""
	document.getElementById("inputBuscarClientesInactivos3").value=""
	document.getElementById("inptTotalRegistoClientesInactivos").value=""
	document.getElementById("table_clientes_inactivos").innerHTML=""
	document.getElementById("table_clientes_inactivos_productos").innerHTML=""
	document.getElementById("table_clientes_inactivos_mensaje").innerHTML=""
	document.getElementById("inptFechaMensaje").value=""
	document.getElementById("inptHoraMensaje").value=""
	document.getElementById("tbProcessClientesInactivo").style.display="none"
}
function minimizarclientesinactivo(){
	 
	$("div[id=divClientesInactivos]").fadeOut(500);	
	document.getElementById("divMinimizadoClientesInactivo").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuClientesInactivo"));
}
function vercerrarfiltrosarqueo(d){
	if(d=="1"){
		document.getElementById("divFiltrosArqueo").style.display=""
	}else{
		document.getElementById("divFiltrosArqueo").style.display="none"
	}
}
var registrocargadoclientesinactivos="";
var totalregistroclientesinactivos="";
var controldebusquedadClientesInactivos=false
function cancelarClientesInactivo(){
	controldebusquedadClientesInactivos=false
	document.getElementById("divProgressClientesInactivo").style.backgroundColor='#ff5722'
}
function buscarclientesinactivos() {
	if(controlacceso("VERCLIENTESINACTIVOS","accion")==false){return;}
	var documento=document.getElementById("inputBuscarClientesInactivos1").value
	var cliente=document.getElementById("inputBuscarClientesInactivos2").value
	var nrotelefono=document.getElementById("inputBuscarClientesInactivos3").value
	var buscar=document.getElementById("inputSelectZonaComisionClientesInactivos").value
	var Vendedor=document.getElementById("inputSelectVendedorClientesInactivos").value
	var Local=document.getElementById("inputSelectLocalClientesInactivos").value
	// if(buscar==""){
			// ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
		// return
	// }
	if(controldebusquedadClientesInactivos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadClientesInactivos=true
	document.getElementById("table_clientes_inactivos").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoClientesInactivos").value = ""
	document.getElementById("table_clientes_inactivos_productos").innerHTML = ""
	
	document.getElementById("tbProcessClientesInactivo").style.display = "none"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"documento": documento,
		"cliente": cliente,
		"nrotelefono": nrotelefono,
		"buscar": buscar,
		"Vendedor": Vendedor,
		"Local": Local,		
		"funt": "buscarclientesincativos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_clientes_inactivos").innerHTML = ''
			controldebusquedadClientesInactivos=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_clientes_inactivos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
					Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_clientes_inactivos").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistoClientesInactivos").value = datos[3];
					registrocargadoclientesinactivos=datos[99];
					totalregistroclientesinactivos=datos[100];
			
					
						 if(totalregistroclientesinactivos>registrocargadoclientesinactivos){
						 	var porce=((registrocargadoclientesinactivos*100)/totalregistroclientesinactivos).toFixed(0)
	document.getElementById("divProgressClientesInactivo").style.width=porce+"%"
						 document.getElementById("table_clientes_inactivos").innerHTML += "<div id='table_mas_clientes_inactivos'></div>"
						  buscarmasclientesinactivos();
					 }else{
						 controldebusquedadClientesInactivos=false
					 }
				}
			} catch (error) {
				controldebusquedadClientesInactivos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



function buscarmasclientesinactivos(c) {
	if(controlacceso("VERCLIENTESINACTIVOS","accion")==false){return;}
	var documento=document.getElementById("inputBuscarClientesInactivos1").value
	var cliente=document.getElementById("inputBuscarClientesInactivos2").value
	var nrotelefono=document.getElementById("inputBuscarClientesInactivos3").value
	var buscar=document.getElementById("inputSelectZonaComisionClientesInactivos").value
	var Vendedor=document.getElementById("inputSelectVendedorClientesInactivos").value
	var Local=document.getElementById("inputSelectLocalClientesInactivos").value
	// if(buscar==""){
			// ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
		// return
	// }
	if(c=="1"){
		controldebusquedadClientesInactivos=true
	}
	if(controldebusquedadClientesInactivos==false){

	return
}
controldebusquedadClientesInactivos=true
	document.getElementById("table_mas_clientes_inactivos").innerHTML = paginacargando
	document.getElementById("divProgressClientesInactivo").style.backgroundColor=''
	document.getElementById("tbProcessClientesInactivo").style.display = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"documento": documento,
		"cliente": cliente,
		"nrotelefono": nrotelefono,
		"buscar": buscar,
		"Vendedor": Vendedor,
		"Local": Local,		
		"registrocargado": registrocargadoclientesinactivos,
		"funt": "buscarmasclientesincativos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_clientes_inactivos").innerHTML = ''
			document.getElementById("divProgressClientesInactivo").style.backgroundColor='#ff5722'
			controldebusquedadClientesInactivos=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_mas_clientes_inactivos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
					Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_mas_clientes_inactivos").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistoClientesInactivos").value = datos[3];
					registrocargadoclientesinactivos=datos[99];
					
					
						 if(totalregistroclientesinactivos>registrocargadoclientesinactivos){
						 	var porce=((registrocargadoclientesinactivos*100)/totalregistroclientesinactivos).toFixed(0)
	document.getElementById("divProgressClientesInactivo").style.width=porce+"%"
						 document.getElementById("table_mas_clientes_inactivos").innerHTML += "<div id='table_mas_clientes_inactivos'></div>"
						 document.getElementById("table_mas_clientes_inactivos").id=""
						  buscarmasclientesinactivos();
					 }else{
						 document.getElementById("tbProcessClientesInactivo").style.display = "none"
						 controldebusquedadClientesInactivos=false
					 }
				}
			} catch (error) {
				document.getElementById("divProgressClientesInactivo").style.backgroundColor='#ff5722'
				controldebusquedadClientesInactivos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function obtenerdatosvistaclienteinactivo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idClienteInactivoFK = $(datostr).children('td[id="td_id"]').html();
	buscarproductoshistorialclienteinactivo()
	buscarmensajeslclienteinactivo()	
}
var idClienteInactivoFK="";
function buscarproductoshistorialclienteinactivo() {
	document.getElementById("table_clientes_inactivos_productos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codCliente": idClienteInactivoFK,
		"funt": "productosCompradosclienteInactivo"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_clientes_inactivos_productos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_clientes_inactivos_productos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_clientes_inactivos_productos").innerHTML = datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function buscarmensajeslclienteinactivo() {
	document.getElementById("table_clientes_inactivos_mensaje").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idClienteInactivoFK,
		"funt": "buscarmensajes"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_clientes_inactivos_mensaje").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_clientes_inactivos_mensaje").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
					var datos_buscados = datos[2];
					document.getElementById("table_clientes_inactivos_mensaje").innerHTML = datos_buscados					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)		
				}
		}
		
	});
}
function actualizarFechaDeMensajes() {
	var fecha=document.getElementById("inptFechaMensaje").value
	var hora=document.getElementById("inptHoraMensaje").value
	if(idClienteInactivoFK==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
					return false;
	}
	if(fecha==""){
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA")
					return false;
	}
	if(hora==""){
		ver_vetana_informativa("FALTO SELECCIONAR LA HORA")
					return false;
	}
verCerrarEfectoCargando("1")
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"hora": hora,
		"idcliente": idClienteInactivoFK,
		"funt": "guardarmensaje"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			verCerrarEfectoCargando("2")
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("2")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
			
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {			
				buscarmensajeslclienteinactivo();
				ver_vetana_informativa("DATOS GUARDADO CORRECTAMENTE")
					return false;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
/*
CUENTAS A PAGAR 
*/
var listadoCuentasAPagar = null;

function obtenerFilaCabeceraCuentasAPagar() {
	var cuerpo = document.getElementById("table_CuentaApagar");
	if (!cuerpo) return null;
	var tabla = cuerpo.previousElementSibling;
	while (tabla && (tabla.tagName !== "TABLE" || tabla.querySelector("input,select,textarea"))) {
		tabla = tabla.previousElementSibling;
	}
	if (!tabla || !tabla.rows || !tabla.rows[0]) return null;
	tabla.rows[0].id = "cabeceraCuentasAPagar";
	return tabla.rows[0];
}

function iniciarListadoCuentasAPagar() {
	if (listadoCuentasAPagar || !window.AbmListadoCore) return listadoCuentasAPagar;
	if (!obtenerFilaCabeceraCuentasAPagar()) return null;
	listadoCuentasAPagar = window.AbmListadoCore.crear({
		nombre: "cuentas_a_pagar",
		idCabecera: "cabeceraCuentasAPagar",
		idCuerpo: "table_CuentaApagar",
		columnas: [
			{ campo: "num_comprobante", titulo: "NRO FACTURA", ancho: "10%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "15%" },
			{ campo: "fecha_a_pagar", titulo: "FECHA PAGO", ancho: "10%" },
			{ campo: "nro_cheque", titulo: "NRO DE CHEQUE", ancho: "10%" },
			{ campo: "monto", titulo: "MONTO", ancho: "10%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "5%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosacompra",
			atributosFila: function (registro) { return { dataset: { compra: registro.cod_compra || "" } } },
			celdas: [
				{ campo: "cod_compra", tecnica: true },
				{ campo: "num_comprobante", columna: "num_comprobante" },
				{ campo: "proveedor", columna: "proveedor" },
				{ campo: "fecha_a_pagar", columna: "fecha_a_pagar" },
				{ campo: "nro_cheque", columna: "nro_cheque" },
				{ campo: "monto_formateado", columna: "monto" },
				{ campo: "tipo", columna: "tipo" },
				{ id: "td_datos_1", campo: "num_comprobante", tecnica: true },
				{ id: "td_datos_2", campo: "fecha_compra", tecnica: true },
				{ id: "td_datos_3", campo: "proveedor", tecnica: true },
				{ id: "td_datos_7", campo: "subtotal_formateado", tecnica: true },
				{ id: "td_datos_8", campo: "descuento_formateado", tecnica: true },
				{ id: "td_datos_4", campo: "total_formateado", tecnica: true },
				{ id: "td_datos_9", campo: "total_pagado_formateado", tecnica: true },
				{ id: "td_datos_10", campo: "total_pendiente_formateado", tecnica: true },
				{ id: "td_datos_5", campo: "cod_compra", tecnica: true },
				{ id: "td_datos_6", campo: "cod_proveedor", tecnica: true },
				{ id: "td_datos_11", campo: "cod_local", tecnica: true },
				{ id: "td_datos_12", campo: "total_pagos_formateado", tecnica: true }
			]
		},
		despuesRender: function (contenedor) {
			if (typeof codCompraSeleccionadaListado === "undefined" || !codCompraSeleccionadaListado) return;
			Array.prototype.some.call(contenedor.querySelectorAll("tr[data-compra]"), function (fila) {
				if (String(fila.getAttribute("data-compra") || "") !== String(codCompraSeleccionadaListado)) return false;
				fila.className = "tableRegistroSelec";
				if (typeof elementocompra !== "undefined") elementocompra = fila;
				return true;
			});
		}
	});
	listadoCuentasAPagar.iniciar();
	return listadoCuentasAPagar;
}

function verCerrarInformeCuentasAPagar(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divCuentasAPagar").style.display==""){
		limpiarcamposbuscadorcuentaspagar()
		 
	$("div[id=divCuentasAPagar]").fadeOut(500);	
		document.getElementById("divMinimizadoCuentasPagar").style.display="none"		
		}else{
if(controlacceso("VERCUENTASAPAGAR","accion")==false){return;}		
mostrarSoloUno("divCuentasAPagar")	
		document.getElementById("divCuentasAPagar").style.display=""
		   
		}
}
function limpiarcamposbuscadorcuentaspagar(){
	document.getElementById("inptBuscarCuentaApagarF1").value=""
	document.getElementById("inptBuscarCuentaApagarF2").value=""
	document.getElementById("inptCuentasPagar1").value=""
	document.getElementById("inptCuentasPagar2").value=""
	document.getElementById("inptCuentasPagar3").value=""
	document.getElementById("inptCuentasPagar4").value=""
	document.getElementById("inptTotalRegistoCuentaApagar").value=""
	document.getElementById("inptTotalCuentaApagar").value=""
	document.getElementById("inptRegistroSeleccionadoCuentaApagar").value=""
	if(listadoCuentasAPagar) listadoCuentasAPagar.establecerRegistros([], false)
	else document.getElementById("table_CuentaApagar").innerHTML=""
}
function minimizarcuentaspagar(){	 
	$("div[id=divCuentasAPagar]").fadeOut(500);	
	document.getElementById("divMinimizadoCuentasPagar").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCuentasPagar"));
}
function checkHistorialCuentaPagar(d){	
	if(d=="1"){
		document.getElementById('checkHistorialCuentaPagar1').checked=true
		document.getElementById('checkHistorialCuentaPagar2').checked=false
		document.getElementById('inptBuscarCuentaApagarF1').value = "";
	    document.getElementById('inptBuscarCuentaApagarF2').value = "";	
	}else{		
		document.getElementById('checkHistorialCuentaPagar1').checked=false
		document.getElementById('checkHistorialCuentaPagar2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarCuentaApagarF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarCuentaApagarF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarcuentasapagar() {
	if(controlacceso("VERCUENTASAPAGAR","accion")==false){return;}	
	var listado = iniciarListadoCuentasAPagar()
    var fecha1 = document.getElementById('inptBuscarCuentaApagarF1').value
	var fecha2 = document.getElementById('inptBuscarCuentaApagarF2').value
	var nrofactura = document.getElementById('inptCuentasPagar1').value
	var proveedor = document.getElementById('inptCuentasPagar2').value
	var filtrofecha = document.getElementById('inptCuentasPagar3').value
	var nrocheque = document.getElementById('inptCuentasPagar4').value
	var cod_local = document.getElementById('inptlocalCuentaApagar').value
	if(document.getElementById('checkHistorialCuentaPagar2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	
	}
	
	if(document.getElementById('checkHistorialCuentaPagar1').checked==true){
		
	var fecha1 =""
	var fecha2 =""
	
	}
	
	  
	
	if(listado) listado.establecerRegistros([], false)
	document.getElementById("table_CuentaApagar").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"proveedor": proveedor,
		"cod_local": cod_local,
		"nrofactura": nrofactura,
		"filtrofecha": filtrofecha,
		"nrocheque": nrocheque,
		"formato": listado ? "json" : "html",
		"funt": "buscarcuentasapagar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_CuentaApagar").innerHTML = ''
			},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_CuentaApagar").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_CuentaApagar").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoCuentaApagar").value = datos[3];
					document.getElementById("inptTotalCuentaApagar").value = datos[4];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function iracompra() {
if(controlacceso("EDITARCARGADECOMPRAS","accion")==false){	   
	   //SIN PERMISO
	   return;
		}
		
if (elementocompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
datos = elementocompra
	document.getElementById('inptNrocompra').value = $(datos).children('td[id="td_datos_1"]').text()
	document.getElementById('inpCodCompra').value = $(datos).children('td[id="td_datos_1"]').text()
	document.getElementById('inptFechaCompra').value = $(datos).children('td[id="td_datos_2"]').text()
	document.getElementById('inptProveedorCompra').value = $(datos).children('td[id="td_datos_3"]').text()
	document.getElementById('inptlocalCompra').value = $(datos).children('td[id="td_datos_11"]').text()
	  document.getElementById('inptlocalCompra').disabled=true
	document.getElementById('inptDescuentocompra').value = $(datos).children('td[id="td_datos_8"]').text()	
	document.getElementById('inptPagosRealizadoscompra').value = $(datos).children('td[id="td_datos_12"]').text()	
	codProveedorCompra = $(datos).children('td[id="td_datos_6"]').text()
	idAbmCompra = $(datos).children('td[id="td_datos_5"]').text();
	document.getElementById("btnAbmCompra").value = "Editar Datos"
	document.getElementById("btnAbmCompra").style.display = ""
	buscardetallescompra()	
	var ventanaHistorialCompra = document.getElementById("divHistorialCompra")
	var ventanaCompra = document.getElementById("divAbmCompra")
	if (ventanaHistorialCompra) {
		ventanaHistorialCompra.style.display = ""
		ventanaHistorialCompra.style.zIndex = "6000"
	}
	if (ventanaCompra) {
		ventanaCompra.style.display = ""
		ventanaCompra.style.zIndex = "6100"
	}
	verCerrarVentanasHistorialCompra("1")
}
/*
HISTORIAL DE GARANTIAS
*/
function verCerrarInformeProductoEnGarantia(d){
	document.getElementById("divSegundoPlano").style.display="none";
	if(d=="1"){
		if(controlacceso("VERINFORMEGARANTIA","accion")==false){return;}
		mostrarSoloUno("divProductoEnGarantia")	
		 document.getElementById("divProductoEnGarantia").style.display = "";
		 		
	}else{
		document.getElementById("divMinimizadoProductoEnGarantia").style.display = "none";
		limpiarcamposproductosganrantia()
 
	$("div[id=divProductoEnGarantia]").fadeOut(500);	
		
	}	
}
function limpiarcamposproductosganrantia(){
	document.getElementById("inptBuscarProductosGarantia1").value=""
	document.getElementById("inptBuscarProductosGarantia2").value=""
	document.getElementById("inptBuscarProductosGarantia3").value=""
	document.getElementById("table_ProductoGarantia").innerHTML = ""
	document.getElementById("inptTotalRegistoProductoGarantia").value = ""
	
}
function minimizarproductogarantia(){
	 document.getElementById("divMinimizadoProductoEnGarantia").style.display = "";
 copiarBotonEnContenedor(document.getElementById("divMenuProductosGarantia"));
	$("div[id=divProductoEnGarantia]").fadeOut(500);	
}

function buscarHistorialGarantia() {
	if(controlacceso("BUSCARINFORMEGARANTIA","accion")==false){return;}
	var nrofactura = document.getElementById("inptBuscarProductosGarantia1").value
	var cod_local = document.getElementById("inptlocalProductoGarantia").value
	var documento = document.getElementById("inptBuscarProductosGarantia2").value
	var cliente = document.getElementById("inptBuscarProductosGarantia3").value
	var estado = document.getElementById("inptBuscarProductosGarantia6").value
	document.getElementById("table_ProductoGarantia").innerHTML = paginacargando
	
	var fecha1= document.getElementById('inptBuscarInformeGarantiaF1').value;
	var fecha2= document.getElementById('inptBuscarInformeGarantiaF2').value;
	
	
	var condicionSelecFecha = '';
	if(document.getElementById('inptCheckinformegarantia1').checked == true){
		if(fecha1 == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR FECHA DE INICIO');
			return;
		}
		if(fecha2 == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR FECHA FIN');
			return;
		}
		condicionSelecFecha = document.getElementById('inptBuscarProductosGarantia7').value;
	}else{
		fecha1='';
		fecha2='';
		condicionSelecFecha = '';
	}
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nrofactura": nrofactura,
		"documento": documento,
		"cliente": cliente,
		"cod_local": cod_local,
		"estado": estado,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"condicionSelecFecha": condicionSelecFecha,
		"funt": "buscarHistorialGarantia"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_ProductoGarantia").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_ProductoGarantia").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_ProductoGarantia").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistoProductoGarantia").value = datos[3]
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var idGarantiaModificar="";
var observacionGarantiaTikect="";
var tipoGarantiaModificar = '';
function obtenerdatosvistaproductosgarantia(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idGarantiaModificar = $(datostr).children('td[id="td_id_1"]').html();
	var estadogarantia = $(datostr).children('td[id="td_datos_9"]').html();
	var optionselect=""
	if(estadogarantia=="Pendiente a verificar"){
	optionselect="<option  value='verificacion' >EN VERIFICACION</option>";  
	}
	if(estadogarantia=="verificacion"){
	optionselect="<option  value='listo' >LISTO PARA ENTREGAR</option>";  
	}
	if(estadogarantia=="listo"){
	optionselect="<option  value='entregado' >ENTREGADO</option>";  
	}
	
	document.getElementById('inputSelectEstadoengarantiaHistorial').innerHTML = optionselect;
	document.getElementById('inptRegistroSeleccionadoProductoGarantia').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNroVentaGarantiaHistorial').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptProductoDevolucionGarantiaHistorial').value = $(datostr).children('td[id="td_datos_5"]').html();
	observacionGarantiaTikect = $(datostr).children('td[id="td_datos_6"]').html();
	tipoGarantiaModificar = $(datostr).children('td[id="td_datos_11"]').html();
	SeleccEstadoGarantia()
	document.getElementById('inptFechaEntregaGarantiaHistorial').value ="";	
	if(estadogarantia=="entregado"){
	idGarantiaModificar="";
		document.getElementById('inptRegistroSeleccionadoProductoGarantia').value = "";
	}
	
}
function verCerrarHistorialProductoEnGarantia(d){
	if(d=="1"){
		if(idGarantiaModificar==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return
		}
		
		 document.getElementById("divGarantiaProductoHistorial").style.display = "";
	}else{
		 document.getElementById("divGarantiaProductoHistorial").style.display = "none";
	}	
}
function SeleccEstadoGarantia(){		
    document.getElementById('divFechaEnvio').style.display="none"
	document.getElementById('divFechaDevuelto').style.display="none"
	document.getElementById('divFechaEntrega').style.display="none"
	if(document.getElementById('inputSelectEstadoengarantiaHistorial').value=="verificacion"){
		document.getElementById('divFechaEnvio').style.display=""
	}
	if(document.getElementById('inputSelectEstadoengarantiaHistorial').value=="listo"){
		document.getElementById('divFechaDevuelto').style.display=""
	}
	if(document.getElementById('inputSelectEstadoengarantiaHistorial').value=="entregado"){
		document.getElementById('divFechaEntrega').style.display=""
	}
}
function modificarRegistroGarantia() {
   	
     var inputSelectEstadoengarantiaHistorial=document.getElementById("inputSelectEstadoengarantiaHistorial").value
     var fecha=""
	 if(inputSelectEstadoengarantiaHistorial=="verificacion"){
		fecha=document.getElementById("inptFechaEnvioGarantiaHistorial").value		
	}
	if(inputSelectEstadoengarantiaHistorial=="listo"){
		fecha=document.getElementById("inptFechaDevueltaGarantiaHistorial").value
	}
	if(inputSelectEstadoengarantiaHistorial=="entregado"){
		fecha=document.getElementById("inptFechaEntregaGarantiaHistorial").value
	}	 
	if (idGarantiaModificar == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	if (inptFechaEntregaGarantiaHistorial == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN FECHA ")
		return false;
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editarusogarantia")
	datos.append("idgarantia", idGarantiaModificar)
	datos.append("fecha", fecha)
	datos.append("estado", inputSelectEstadoengarantiaHistorial)
	datos.append("tipo", tipoGarantiaModificar)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
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
					if(inputSelectEstadoengarantiaHistorial=="verificacion"){
						ImprimirDivTicketGarantiaVerificacion()
					}
					if(inputSelectEstadoengarantiaHistorial=="entregado"){
						ImprimirDivTicketGarantiaEntrega()
					}
					document.getElementById("divGarantiaProductoHistorial").style.display = "none";
				   buscarHistorialGarantia()
                   				   tipoGarantiaModificar = '';
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});	
}
function anularRegistroGarantia() {
	if (idGarantiaModificar == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "anulargarantia")
	datos.append("idgarantia", idGarantiaModificar)
	datos.append("tipogarantiamodificar", tipoGarantiaModificar)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
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
					/* if(inputSelectEstadoengarantiaHistorial=="verificacion"){
						ImprimirDivTicketGarantiaVerificacion()
					}
					if(inputSelectEstadoengarantiaHistorial=="entregado"){
						ImprimirDivTicketGarantiaEntrega()
					}
					document.getElementById("divGarantiaProductoHistorial").style.display = "none"; */
					idGarantiaModificar = '';
					buscarHistorialGarantia()
					tipoGarantiaModificar = '';
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});	
}

function checkfiltrosinformegarantia(d){
	if(d=="1"){
	document.getElementById('inptCheckinformegarantia1').checked=true
	document.getElementById('inptCheckinformegarantia2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeGarantiaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeGarantiaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
	document.getElementById('inptCheckinformegarantia1').checked=false
	document.getElementById('inptCheckinformegarantia2').checked=true
	document.getElementById('inptBuscarInformeGarantiaF1').value="";
      document.getElementById('inptBuscarInformeGarantiaF2').value="";
	
	}
}

//INFORME SOLICITUD DE DESCUENTO INTERES
function verCerrarInformeSolicitudDescuentoInteres(){

	if(document.getElementById("divInformeSoliDescuentoInteres").style.display==""){
		document.getElementById("divInformeSoliDescuentoInteres").style.display="none"
		limpiarInformeSolicitudDescuentoInteres()
	}else{	
if(controlacceso("VERINFORMEDESCUENTOINTERES","accion")==false){return;}
mostrarSoloUno("divInformeSoliDescuentoInteres")	
	document.getElementById("divInformeSoliDescuentoInteres").style.display=""
	}
}
function limpiarInformeSolicitudDescuentoInteres(){
	document.getElementById("inptBuscarSoliDescuentoInteresF1").value=""
	document.getElementById("inptBuscaSoliDescuentoInteresF2").value=""
	document.getElementById("inptBuscarInfSoliDescuentoInteres1").value=""
	document.getElementById("inptBuscarInfSoliDescuentoInteres4").value=""
	document.getElementById("inptBuscarInfSoliDescuentoInteres2").value=""
	document.getElementById("inptBuscarInfSoliDescuentoInteres3").value=""
	document.getElementById("inptTotalRegistoSoliDescuentoInteres").value=""
	document.getElementById("table_informe_solicitud_descuento_interes").innerHTML=""
	
}
function minimizarInformeSolicitudDescuentoInteres(){
	$("div[id=divInformeSoliDescuentoInteres]").fadeOut(500);
	document.getElementById("divMinimizadoInformeSoliDescuentoInteres").style.display=""
	copiarBotonEnContenedor(document.getElementById("divInformeSoliDescuentoInteres"));
}

function crearFilaTablaInformeSolicitudDescuentoInteres(indice) {
	var tabla = document.createElement("table");
	tabla.className = indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	var cuerpo = document.createElement("tbody");
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	cuerpo.appendChild(fila);
	tabla.appendChild(cuerpo);
	return { tabla: tabla, fila: fila };
}

function agregarCeldaInformeSolicitudDescuentoInteres(fila, id, valor, ancho, oculto) {
	var celda = document.createElement("td");
	if (id) { celda.id = id; }
	if (ancho) { celda.style.width = ancho; }
	if (oculto) { celda.style.display = "none"; }
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderInformeSolicitudDescuentoInteres(filas) {
	var contenedor = document.getElementById("table_informe_solicitud_descuento_interes");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato, indice) {
		var estructura = crearFilaTablaInformeSolicitudDescuentoInteres(indice);
		if (dato.estilo_estado) { estructura.fila.style.cssText = dato.estilo_estado; }
		estructura.fila.addEventListener("click", function () {
			if (dato.accion === "editar") { obtenerdatosMensajeDetalleDescuentoInteres(estructura.fila); }
			else { mensajeDescuentoInteresFinalizado(); }
		});
		var credito = agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_13", dato.cod_credito, "10%", false);
		credito.style.backgroundColor = "#efeded";
		credito.style.color = "red";
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_14", dato.motivo, "10%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_15", dato.cliente, "10%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_17", dato.detalle_cuota, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_16", dato.dias_atraso, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_18", dato.monto_cuota_formateado, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_6", dato.total_solicitado_formateado, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_3", dato.total_aprobado_formateado, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_7", dato.total_interes_formateado, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_9", dato.usuario_solicitud, "10%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "", dato.fecha_solicitud, "10%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "", dato.estado, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "", dato.usuario_aprobado, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "", dato.estado_uso, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "", dato.tipo_pago, "5%", false);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_10", dato.id_solicitud, "", true);
		agregarCeldaInformeSolicitudDescuentoInteres(estructura.fila, "td_datos_12", dato.local, "", true);
		contenedor.appendChild(estructura.tabla);
	});
}

function buscarInformeSolicitudDescuentoInteres() {	
	/* if(controlacceso("VERCATALOGO","accion")==false){return;}	 */
	var cod_credito = document.getElementById('inptBuscarInfSoliDescuentoInteres1').value
	var motivo = document.getElementById('inptBuscarInfSoliDescuentoInteres2').value
	var usuario = document.getElementById('inptBuscarInfSoliDescuentoInteres3').value
	var fecha1 = document.getElementById('inptBuscarSoliDescuentoInteresF1').value
	var fecha2 = document.getElementById('inptBuscaSoliDescuentoInteresF2').value
	var estado = document.getElementById('inptBuscarInfSoliDescuentoInteres4').value
	var estado_uso = document.getElementById('inptBuscarInfSoliDescuentoInteres5').value
	var cliente = document.getElementById('inptBuscarInfSoliDescuentoInteres6').value
	
	if(document.getElementById('checkHistorialSoliDescuentoInteres2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}
	
	document.getElementById("table_informe_solicitud_descuento_interes").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_credito": cod_credito,
		"motivo": motivo,
		"usuario": usuario,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"estado_uso": estado_uso,
		"cliente": cliente,
		"funt": "buscarInforme",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoInteres.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_solicitud_descuento_interes").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_informe_solicitud_descuento_interes").innerHTML = ''
			document.getElementById("inptTotalDescuentosSoliDescuentoInteres").value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderInformeSolicitudDescuentoInteres(Array.isArray(datos_buscados) ? datos_buscados : [])
					document.getElementById("inptTotalRegistoSoliDescuentoInteres").value = datos[3]
					document.getElementById("inptTotalDescuentosSoliDescuentoInteres").value = datos[4]
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkHistorialSoliDescuentoInteres(d){	
	if(d=="1"){
		document.getElementById('checkHistorialSoliDescuentoInteres1').checked=true
		document.getElementById('checkHistorialSoliDescuentoInteres2').checked=false
		document.getElementById('inptBuscarSoliDescuentoInteresF1').value = "";
	    document.getElementById('inptBuscaSoliDescuentoInteresF2').value = "";	
	}else{		
		document.getElementById('checkHistorialSoliDescuentoInteres1').checked=false
		document.getElementById('checkHistorialSoliDescuentoInteres2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarSoliDescuentoInteresF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaSoliDescuentoInteresF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

//INFORME PAGOS A PROVEEDOR
function verCerrarInformePagosAProveedor(){

	if(document.getElementById("divInformePagosAProveedor").style.display==""){
		document.getElementById("divInformePagosAProveedor").style.display="none"
		document.getElementById("divMinimizadoInformePagosAProveedor").style.display="none"
		limpiarInformePagosAProveedor()
	}else{	
if(controlacceso("VERINFORMEPAGOSAPROVEEDOR","accion")==false){return;}
mostrarSoloUno("divInformePagosAProveedor")		 
	document.getElementById("divInformePagosAProveedor").style.display=""
	}
}
function limpiarInformePagosAProveedor(){
	document.getElementById("inptBuscarPagosAProveedorF1").value=""
	document.getElementById("inptBuscaPagosAProveedorF2").value=""
	document.getElementById("inptBuscarInfPagosAProveedor1").value=""
	document.getElementById("inptBuscarInfPagosAProveedor2").value=""
	document.getElementById("inptTotalRegistoPagosAProveedor").value=""
	document.getElementById("inptTotalPagadoPagosAProveedor").value=""
	document.getElementById("table_informe_pagos_a_proveedor").innerHTML=""
	document.getElementById("table_informe_pagos_a_proveedor_cheques").innerHTML=""
	document.getElementById("table_informe_pagos_a_proveedor_compras").innerHTML=""
	if (listadoInformePagoProveedor) listadoInformePagoProveedor.establecerRegistros([])
	if (listadoInformePagoProveedorCheques) listadoInformePagoProveedorCheques.establecerRegistros([])
	if (listadoInformePagoProveedorCompras) listadoInformePagoProveedorCompras.establecerRegistros([])
	informe_pago_total_compra = '';
	verCerrarVentanasInformePagosAProveedor(1)
}
function minimizarInformePagosAProveedor(){
	$("div[id=divInformePagosAProveedor]").fadeOut(500);
	document.getElementById("divMinimizadoInformePagosAProveedor").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuInformePagosAProveedor"));
}
function buscarInformePagosAProveedor() {	
	var listado = iniciarListadoInformePagoProveedor()
	/* if(controlacceso("VERCATALOGO","accion")==false){return;}	 */
	var fecha_filtro = document.getElementById('inptBuscarInfPagosAProveedor1').value
	var usuario = document.getElementById('inptBuscarInfPagosAProveedor2').value
	var fecha1 = document.getElementById('inptBuscarPagosAProveedorF1').value
	var fecha2 = document.getElementById('inptBuscaPagosAProveedorF2').value
	
	if(document.getElementById('checkHistorialPagosAProveedor2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}
	
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_informe_pagos_a_proveedor").innerHTML = paginacargando
	document.getElementById('inptTotalPagadoPagosAProveedor').value = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha_filtro": fecha_filtro,
		"usuario": usuario,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"formato": listado ? "json" : "html",
		"funt": "buscarInformePagosAProveedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_informe_pagos_a_proveedor").innerHTML = ''
			document.getElementById('inptTotalPagadoPagosAProveedor').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_informe_pagos_a_proveedor").innerHTML = ''
			document.getElementById('inptTotalPagadoPagosAProveedor').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_informe_pagos_a_proveedor").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoPagosAProveedor").value = datos[3]
					document.getElementById('inptTotalPagadoPagosAProveedor').value = datos[4];
					informe_pago_total_compra = '';
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarInformePagosAProveedorCheques() {	
	
	var listado = iniciarListadoInformePagoProveedorCheques()
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_informe_pagos_a_proveedor_cheques").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idpago_total_compra": informe_pago_total_compra,
		"formato": listado ? "json" : "html",
		"funt": "buscarInformePagosAProveedorCheques"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_informe_pagos_a_proveedor_cheques").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_informe_pagos_a_proveedor_cheques").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_informe_pagos_a_proveedor_cheques").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarInformePagosAProveedorCompras() {	
	
	var listado = iniciarListadoInformePagoProveedorCompras()
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_informe_pagos_a_proveedor_compras").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idpago_total_compra": informe_pago_total_compra,
		"formato": listado ? "json" : "html",
		"funt": "buscarInformePagosAProveedorCompras"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_informe_pagos_a_proveedor_compras").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_informe_pagos_a_proveedor_compras").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_informe_pagos_a_proveedor_compras").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function checkHistorialPagosAProveedor(d){	
	if(d=="1"){
		document.getElementById('checkHistorialPagosAProveedor1').checked=true
		document.getElementById('checkHistorialPagosAProveedor2').checked=false
		document.getElementById('inptBuscarPagosAProveedorF1').value = "";
	    document.getElementById('inptBuscaPagosAProveedorF2').value = "";	
	}else{		
		document.getElementById('checkHistorialPagosAProveedor1').checked=false
		document.getElementById('checkHistorialPagosAProveedor2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarPagosAProveedorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaPagosAProveedorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
let informe_pago_total_compra = '';
function Obtenerdatosinformepagoaproveedor(datostr){
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	informe_pago_total_compra = $(datostr).children('td[id="td_datos_id"]').html();
}

function verCerrarVentanasInformePagosAProveedor(d){
	document.getElementById("btnInformePagosAProveedor1").style=''
	document.getElementById("btnInformePagosAProveedor2").style=''
	document.getElementById("btnInformePagosAProveedor3").style=''
	document.getElementById("ventanaInformePagosAProveedor1").style.display='none'
	document.getElementById("ventanaInformePagosAProveedor2").style.display='none'
	document.getElementById("ventanaInformePagosAProveedor3").style.display='none'
	
	if(d=="1"){
		document.getElementById("btnInformePagosAProveedor1").style='background-color:#FF9800;color:#fff'
		document.getElementById("ventanaInformePagosAProveedor1").style.display='';
	}
	if(d=="2"){
		document.getElementById("btnInformePagosAProveedor2").style='background-color:#FF9800;color:#fff'
		document.getElementById("ventanaInformePagosAProveedor2").style.display='';
		
		if(informe_pago_total_compra == ''){
			ver_vetana_informativa('FALTO SELECCIONAR UN PAGO PARA VER LOS DETALLES');
			verCerrarVentanasInformePagosAProveedor(1)
			return;
		}
		
		buscarInformePagosAProveedorCheques()
	}
	if(d=="3"){
		document.getElementById("btnInformePagosAProveedor3").style='background-color:#FF9800;color:#fff'
		document.getElementById("ventanaInformePagosAProveedor3").style.display='';
		
		if(informe_pago_total_compra == ''){
			ver_vetana_informativa('FALTO SELECCIONAR UN PAGO PARA VER LOS DETALLES');
			verCerrarVentanasInformePagosAProveedor(1)
			return;
		}
		buscarInformePagosAProveedorCompras()
	}
	
}

/* GENERAR LISTA CALLCENTER */
function VerCerrarVentanaListaCallCenter(d){
	if(controlacceso("VERGENERARLISTACALLCENTER","accion")==false){return;}
if(d == '1'){
	if(array_codcliente_callcenter == ''){
		ver_vetana_informativa("FALTÓ REALIZAR UNA BUSQUEDA PARA GENERAR LA LISTA")
		return;
	}
	buscar_agentes_callcenter()
		document.getElementById("divGenerarListaCallCenter").style.display=""
	}else{
		document.getElementById("divGenerarListaCallCenter").style.display="none"
		document.getElementById("buscar_agente_callcenter").innerHTML = ""
		document.getElementById('inptCantidadClientesCallCenter').value = '';
		document.getElementById('inptFechaInicioPeriodoCallCenter').value = '';
		document.getElementById('inptFechaFinPeriodoCallCenter').value = '';
		document.getElementById('inptNombreCallCenter').value = '';
}
}
var listadoAgentesCallCenter = null;
function iniciarListadoAgentesCallCenter() {
	if (listadoAgentesCallCenter) return listadoAgentesCallCenter;
	listadoAgentesCallCenter = crearListadoProductosEstructurado({
		nombre: "agentes_callcenter",
		idCuerpo: "buscar_agente_callcenter",
		ordenInicial: "nombre",
		columnas: [
			{ campo: "seleccion", titulo: "SELECCIONAR", ancho: "10%", ordenable: false },
			{ campo: "nombre", titulo: "AGENTE", ancho: "90%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var clase = registro.clase_fila === "tableRegistroSearch2" || indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch";
			var tabla = utilidades.crearElemento("table", { className: clase, border: "1", cellspacing: "1", cellpadding: "5" });
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
			var celdaSeleccion = utilidades.crearElemento("td");
			celdaSeleccion.style.width = "10%";
			var check = utilidades.crearElemento("input", { type: "checkbox", id: registro.id == null ? "" : String(registro.id) });
			check.setAttribute("aria-label", "Seleccionar agente " + (registro.nombre || ""));
			check.addEventListener("change", function () { obteneridarrayagente(check); });
			celdaSeleccion.appendChild(check);
			var nombre = utilidades.crearElemento("td", { id: "td_datos_1", dataset: { columna: "nombre" } }, registro.nombre || "");
			nombre.style.width = "90%";
			fila.appendChild(celdaSeleccion);
			fila.appendChild(nombre);
			tabla.appendChild(fila);
			return tabla;
		}
	});
	return listadoAgentesCallCenter;
}

function buscar_agentes_callcenter() {
	document.getElementById("buscar_agente_callcenter").innerHTML = paginacargando
	obtener_datos_user();
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscar_agentes_callcenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("buscar_agente_callcenter").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("buscar_agente_callcenter").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					array_agentes = [];
					var listado = iniciarListadoAgentesCallCenter();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("buscar_agente_callcenter").innerHTML = typeof datos_buscados === "string" ? datos_buscados : "";
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var array_agentes = []
function obteneridarrayagente(datos){
	var id = datos.id;
	let index = array_agentes.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_agentes.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_agentes.push(id);
    }
}
function verificarGenerarListaCallCenter(){
	var inptFechaInicioPeriodoCallCenter = document.getElementById('inptFechaInicioPeriodoCallCenter').value;
	var inptFechaFinPeriodoCallCenter = document.getElementById('inptFechaFinPeriodoCallCenter').value;
	var inptNombreCallCenter = document.getElementById('inptNombreCallCenter').value;
	
	if(inptFechaInicioPeriodoCallCenter ==''){
		ver_vetana_informativa('FALTO SELECCIONAR LA FECHA DE INCIO DE PERIODO');
		return;
	}
	
	if(inptFechaFinPeriodoCallCenter ==''){
		ver_vetana_informativa('FALTO SELECCIONAR LA FECHA FIN DE PERIODO');
		return;
	}
	if(inptNombreCallCenter ==''){
		ver_vetana_informativa('FALTO INGRESAR EL NOMBRE DEL LISTADO');
		return;
	}
	
	if(array_agentes == ''){
		ver_vetana_informativa('FALTO SELECCIONAR EL/LOS AGENTES ENCARGADOS');
		return;
	}
	
	generarListaCallCenter(inptNombreCallCenter,inptFechaInicioPeriodoCallCenter,inptFechaFinPeriodoCallCenter);
}
function generarListaCallCenter(nombre,fecha_inicio_periodo,fecha_fin_periodo){
	
	var fecha_inicio = document.getElementById('inptBuscarInformeCreditoF1informe').value;
	var fecha_fin = document.getElementById('inptBuscarInformeCreditoF2informe').value;
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "generarListaCallcenter")
	datos.append("fecha_inicio", fecha_inicio)
	datos.append("fecha_fin", fecha_fin)
	datos.append("fecha_inicio_periodo", fecha_inicio_periodo)
	datos.append("nombre", nombre)
	datos.append("fecha_fin_periodo", fecha_fin_periodo)
	datos.append("array_agentes", JSON.stringify(array_agentes))
	datos.append("array_codcliente_callcenter", JSON.stringify(array_codcliente_callcenter))
	datos.append("array_cod_tipo_cliente_credito", JSON.stringify(array_cod_tipo_cliente_credito))
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
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
					limpiarventanaGenerarCallCenter()
					VerCerrarVentanaListaCallCenter("2")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});	
}
function limpiarventanaGenerarCallCenter(){
	document.getElementById('inptNombreCallCenter').value = ''
	document.getElementById('inptFechaInicioPeriodoCallCenter').value = ''
	document.getElementById('inptFechaFinPeriodoCallCenter').value = ''
	document.getElementById('buscar_agente_callcenter').innerHTML = ''
	array_agentes = [];
	array_codcliente_callcenter = [];
}


/*
CONSULTA DE CAJA
*/
function renderInformeConsultaCaja(secciones) {
	var contenedor = document.getElementById('table_Consultar_caja');
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	(Array.isArray(secciones) ? secciones : []).forEach(function (seccion) {
		var titulo = document.createElement('p');
		titulo.className = 'ptituloZ';
		titulo.textContent = seccion && seccion.titulo ? seccion.titulo : '';
		fragmento.appendChild(titulo);
		var filas = seccion && Array.isArray(seccion.filas) ? seccion.filas : [];
		if (!filas.length) filas = [{ detalle: 'NO SE ENCONTRARON REGISTROS', detalle_secundario: '', monto: '', local: '' }];
		filas.forEach(function (registro, indice) {
			var tabla = document.createElement('table');
			tabla.className = indice % 2 ? 'tableRegistroSearch2' : 'tableRegistroSearch';
			tabla.setAttribute('border', '1');
			tabla.setAttribute('cellspacing', '1');
			tabla.setAttribute('cellpadding', '5');
			var fila = document.createElement('tr');
			fila.id = 'tbSelecRegistro';
			var detalle = document.createElement('td');
			detalle.style.width = '60%';
			detalle.style.textAlign = 'left';
			detalle.style.padding = '5px';
			detalle.style.lineHeight = '18px';
			detalle.appendChild(document.createTextNode(registro.detalle == null ? '' : String(registro.detalle)));
			if (registro.detalle_secundario) {
				detalle.appendChild(document.createElement('br'));
				var secundario = document.createElement('strong');
				secundario.textContent = String(registro.detalle_secundario);
				detalle.appendChild(secundario);
			}
			var monto = document.createElement('td');
			monto.style.width = '20%';
			monto.textContent = registro.monto == null ? '' : String(registro.monto);
			var local = document.createElement('td');
			local.style.width = '20%';
			local.textContent = registro.local == null ? '' : String(registro.local);
			fila.appendChild(detalle);
			fila.appendChild(monto);
			fila.appendChild(local);
			tabla.appendChild(fila);
			fragmento.appendChild(tabla);
		});
	});
	contenedor.appendChild(fragmento);
}
function verCerrarInformeConsultaCaja(){
	if(document.getElementById("divConsultaCaja").style.display==""){
		document.getElementById("divMinimizadoConsultarCaja").style.display="none"
			limpiarcamposbuscadorConsultarCaja()
		//  
	$("div[id=divConsultaCaja]").fadeOut(500);			
	}else{		
	if(controlacceso("VERCONSULTADECAJA","accion")==false){return;}
	mostrarSoloUno("divConsultaCaja")	
		document.getElementById("divConsultaCaja").style.display=""
		 //  	
	}
}
function limpiarcamposbuscadorConsultarCaja(){
	document.getElementById("inptTotalIngresoConsularCaja").value = ""
					document.getElementById("inptTotalEgresoConsularCaja").value = ""
					document.getElementById("inptTotalConsularCaja").value = ""
					document.getElementById("inptTotalEfectivoConsultarCaja").value = ""
					document.getElementById("inptTotalTarjetaConsularCaja").value = ""
					
					document.getElementById("inptBuscarVistaApCie1").value = ""
					document.getElementById("inptBuscarVistaApCie7").value = ""
					document.getElementById("inptBuscarVistaApCie2").value = ""
					document.getElementById("inptBuscarVistaApCie3").value = ""
					document.getElementById("inptBuscarVistaApCie4").value = ""
					document.getElementById("inptBuscarVistaApCie5").value = ""
					document.getElementById("inptBuscarVistaApCie6").value = ""
					document.getElementById("table_Consultar_caja").innerHTML = ""
}
function minimizarconsultacaja(){ 
	$("div[id=divConsultaCaja]").fadeOut(500);	
	document.getElementById("divMinimizadoConsultarCaja").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuConsultadeCaja"));
}
var cobradorarqueo = "";


function buscarinformecaja() {
	if(controlacceso("VERCONSULTADECAJA","accion")==false){return;}
	document.getElementById("inptTotalIngresoConsularCaja").value = "..."
					document.getElementById("inptTotalEgresoConsularCaja").value = "..."
					document.getElementById("inptTotalConsularCaja").value = "..."
					document.getElementById("inptTotalEfectivoConsultarCaja").value = "..."
					document.getElementById("inptTotalTarjetaConsularCaja").value = "..."
					
					document.getElementById("inptTotalCajaAppConsularCaja").value = "..."
					document.getElementById("inptTotalCajaMigradoConsularCaja").value = "..."
					document.getElementById("inptTotalCajaRecibidoConsularCaja").value = "..."
					
	document.getElementById("table_Consultar_caja").innerHTML = paginacargando
	obtener_datos_user();
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idArqeoFk1": idArqeoFk,
		"formato": "json",
		"funt": "buscarinformecaja"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abminforemcaja.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Consultar_caja").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_Consultar_caja").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					renderInformeConsultaCaja(datos[2]);
					document.getElementById("inptTotalEfectivoConsultarCaja").value = datos[7]
					document.getElementById("inptTotalTarjetaConsularCaja").value = datos[6]
					document.getElementById("inptTotalIngresoConsularCaja").value = datos[3]
					document.getElementById("inptTotalEgresoConsularCaja").value = datos[4]
					document.getElementById("inptTotalConsularCaja").value = datos[5]
					
					document.getElementById("inptTotalCajaAppConsularCaja").value = datos[8]
					document.getElementById("inptTotalCajaMigradoConsularCaja").value = datos[9]
					document.getElementById("inptTotalCajaRecibidoConsularCaja").value = datos[10]
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

/*
PRODUCTOS VENDIDOS
*/
function verCerrarInformeProductosVendidos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeProductosVentas").style.display==""){
			if(controldebusquedadProductosVendidos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
	document.getElementById("divMinimizadoProductoVendido").style.display="none"
	limpiarcamposproductosvendidos()
 
	$("div[id=divInformeProductosVentas]").fadeOut(500);	
	}else{		
	if(controlacceso("VERINFORMEDEPRODUCTOSVENDIDOS","accion")==false){return;}
	mostrarSoloUno("divInformeProductosVentas")	
		document.getElementById("divInformeProductosVentas").style.display=""
   
	buscar_opciones_filtro_productos_vendidos()
	}
}
function limpiarcamposproductosvendidos(){
		if(controldebusquedadProductosVendidos==true){

	return
}
	document.getElementById("inptBuscarProductosVendidosF1").value=""
	document.getElementById("inptBuscarProductosVendidosF2").value=""
	document.getElementById("inptBuscarProductosVendidos1").value=""
	document.getElementById("inptBuscarProductosVendidos2").value=""
	document.getElementById("inptTotalRegistroProductosVendidos").value=""
	document.getElementById("inptTotalRegistroTotalVentas").value=""
	document.getElementById("inptTotalVentasInvertido").value=""
	document.getElementById("table_comision_productosVendidos").innerHTML=""
	document.getElementById("tbProcessProductosVendidos").style.display="none"
	array_cod_filtro_productos_vendidos = [];
	document.getElementById("divBuscadorFiltroProductosVendidos").innerHTML = "";
	document.getElementById('checkSeleccTodoFiltroProdVendidos').checked = true;
}
function minimizarproductosvendidos(){
 
	$("div[id=divInformeProductosVentas]").fadeOut(500);	
	document.getElementById("divMinimizadoProductoVendido").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuProductosVendidos"));
}
function checkHistorialProductoVendidos(d){	
	if(d=="1"){
		document.getElementById('checkHistorialProductoVendido1').checked=true
		document.getElementById('checkHistorialProductoVendido2').checked=false
		document.getElementById('inptBuscarProductosVendidosF1').value = "";
	    document.getElementById('inptBuscarProductosVendidosF2').value = "";	
	}else{		
		document.getElementById('checkHistorialProductoVendido1').checked=false
		document.getElementById('checkHistorialProductoVendido2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarProductosVendidosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarProductosVendidosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function cambiarTipoInformeProductosVendidos(d){
	if(controldebusquedadProductosVendidos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
document.getElementById("btnInformeProductoVendidos1").style=""
document.getElementById("btnInformeProductoVendidos2").style=""
document.getElementById("btnInformeProductoVendidos3").style=""
document.getElementById("btnInformeProductoVendidos4").style=""
document.getElementById("btnInformeProductoVendidos5").style=""
if(d=="1"){
	document.getElementById("btnInformeProductoVendidos1").style="background-color:#ff9800;color:#fff"
	agrupacionproductovendidoinforme="1";
}

if(d=="2"){
	document.getElementById("btnInformeProductoVendidos2").style="background-color:#ff9800;color:#fff"
	agrupacionproductovendidoinforme="2";
}

if(d=="3"){
	document.getElementById("btnInformeProductoVendidos3").style="background-color:#ff9800;color:#fff"
	agrupacionproductovendidoinforme="3";
}

if(d=="4"){
	document.getElementById("btnInformeProductoVendidos4").style="background-color:#ff9800;color:#fff"
	agrupacionproductovendidoinforme="4";
}

if(d=="5"){
	document.getElementById("btnInformeProductoVendidos5").style="background-color:#ff9800;color:#fff"
	agrupacionproductovendidoinforme="5";
}

}
var agrupacionproductovendidoinforme="1";
var registrocargadoproductosvendidos="";
var totalregistroproductosvendidos="";
var controldebusquedadProductosVendidos=false
function cancelarProductosVendidos(){
	controldebusquedadProductosVendidos=false
	document.getElementById("divProgressProductosVendidos").style.backgroundColor='#ff5722'
}



function buscarproductosvendidos() {

    if (controlacceso("VERINFORMEDEPRODUCTOSVENDIDOS", "accion") == false) {
        return;
    }

    var fecha1 = document.getElementById('inptBuscarProductosVendidosF1').value;
    var fecha2 = document.getElementById('inptBuscarProductosVendidosF2').value;
    var cod_local = document.getElementById('inptlocalInformeProductosVendidos').value;
    var marca = document.getElementById('inptMarcaInformeProductosVendidos').value;
    var codigo = document.getElementById('inptBuscarProductosVendidos1').value;
    var producto = document.getElementById('inptBuscarProductosVendidos2').value;
    var tipo_venta = document.getElementById('inpttipoventaInformeProductosVendidos').value;
    var tipo = document.getElementById('inptTipoProductoInformeProductosVendidos').value;

    if (document.getElementById('checkHistorialProductoVendido2').checked == true) {

        if (fecha1 == "") {
            ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO");
            return false;
        }

        if (fecha2 == "") {
            ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN");
            return false;
        }

    } else {
        fecha1 = "";
        fecha2 = "";
    }

    document.getElementById("table_comision_productosVendidos").innerHTML = paginacargando;

    obtener_datos_user();

    if (typeof array_cod_filtro_productos_vendidos == "undefined") {
        array_cod_filtro_productos_vendidos = [];
    }

    var datos = {
        "useru": userid,
        "passu": passuser,
        "navegador": navegador,
        "fecha1": fecha1,
        "fecha2": fecha2,
        "cod_local": cod_local,
        "marca": marca,
        "codigo": codigo,
        "producto": producto,
        "tipo_venta": tipo_venta,
        "tipo": tipo,
        "agrupacionproductovendidoinforme": agrupacionproductovendidoinforme,
        "array_cod_filtro_productos_vendidos": JSON.stringify(array_cod_filtro_productos_vendidos),
        "funt": "buscarproductovendidos"
    };

    $.ajax({
        data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
        type: "post",
        dataType: "text",

        beforeSend: function () {
        },

        error: function (jqXHR, textstatus, errorThrowm) {

            console.error("ERROR AJAX");
            console.error("Estado:", jqXHR.status);
            console.error("Texto:", textstatus);
            console.error("Error:", errorThrowm);
            console.error("Respuesta servidor:", jqXHR.responseText);

            manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");

            document.getElementById("table_comision_productosVendidos").innerHTML = '';

            var titulo = "Error AJAX productos vendidos: " + textstatus +
                " \r\n Estado: " + jqXHR.status +
                " \r\n Respuesta: " + jqXHR.responseText;

            GuardarArchivosLog(titulo);
        },

        success: function (responseText) {

            console.log("RESPUESTA CRUDA PRODUCTOS VENDIDOS:", responseText);

            document.getElementById("table_comision_productosVendidos").innerHTML = '';

            if (responseText == null || $.trim(responseText) == "") {
                ver_vetana_informativa("EL SERVIDOR RESPONDIÓ VACÍO. REVISÁ EL PHP O EL ERROR_LOG DEL SERVIDOR.");

                var tituloVacio = "Error: servidor respondió vacío en buscarproductovendidos";
                GuardarArchivosLog(tituloVacio);

                return;
            }

            var datosJson;

            try {
                datosJson = $.parseJSON(responseText);
            } catch (error) {

                console.error("ERROR AL CONVERTIR JSON:", error);
                console.error("RESPUESTA RECIBIDA:", responseText);

                ver_vetana_informativa("LA RESPUESTA DEL SERVIDOR NO ES JSON VÁLIDO. REVISÁ LA CONSOLA.");

                var titulo = "Error parseando JSON: " + error +
                    " \r\n Consola: " + responseText;

                GuardarArchivosLog(titulo);

                return;
            }

            var Respuesta = datosJson["1"];
            Respuesta = respuestaJqueryAjax(Respuesta);

            if (Respuesta == true) {

                var datos_buscados = datosJson[2];

                document.getElementById("table_comision_productosVendidos").innerHTML = datos_buscados;
                document.getElementById("inptTotalRegistroProductosVendidos").value = datosJson[3];
                document.getElementById("inptTotalRegistroTotalVentas").value = datosJson[4];
                document.getElementById("inptTotalVentasInvertido").value = datosJson[5];

                var totalinvertido = QuitarSeparadorMilValor(datosJson[5]);
                var totaliVenta = QuitarSeparadorMilValor(datosJson[4]);
                var Ganancias = totaliVenta - totalinvertido;

                document.getElementById("inptTotalGananciasInvertido").value = separadordemilesnumero(Ganancias);

            } else {

                console.error("RESPUESTA NO EXITOSA:", datosJson);

                if (datosJson["error"] != undefined) {
                    ver_vetana_informativa(datosJson["error"]);
                }
            }
        }
    });
}


function buscarmasproductosvendidos(c) {
if(controlacceso("VERINFORMEDEPRODUCTOSVENDIDOS","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarProductosVendidosF1').value
	var fecha2 = document.getElementById('inptBuscarProductosVendidosF2').value
	var cod_local = document.getElementById('inptlocalInformeProductosVendidos').value
	var categoria = document.getElementById('inptCategoriaProductoInformeProductosVendidos').value
	var marca = document.getElementById('inptMarcaInformeProductosVendidos').value
	var codigo = document.getElementById('inptBuscarProductosVendidos1').value
	var producto = document.getElementById('inptBuscarProductosVendidos2').value
	var tipo_venta = document.getElementById('inpttipoventaInformeProductosVendidos').value
	if (document.getElementById('checkHistorialProductoVendido2').checked==true) {
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
	fecha1="";	
	fecha2="";	
	}
	if(c=="1"){
		controldebusquedadProductosVendidos=true
	}
		if(controldebusquedadProductosVendidos==false){
		
	return
}
controldebusquedadProductosVendidos=true
	document.getElementById("table_comision_mas_productosVendidos").innerHTML = paginacargando
	document.getElementById("tbProcessProductosVendidos").style.display=''
	document.getElementById("divProgressProductosVendidos").style.backgroundColor=''
	var totalventa=document.getElementById("inptTotalRegistroTotalVentas").value;
	var totalinvertido=document.getElementById("inptTotalVentasInvertido").value;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cod_local": cod_local,
		"categoria": categoria,
		"marca": marca,
		"codigo": codigo,
		"producto": producto,
		"totalventa": totalventa,
		"totalinvertido": totalinvertido,
		"tipo_venta": tipo_venta,
		"registrocargado": registrocargadoproductosvendidos,
		"agrupacionproductovendidoinforme": agrupacionproductovendidoinforme,
		"funt": "buscarmasproductovendidos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_mas_productosVendidos").innerHTML = ''
			controldebusquedadProductosVendidos=false
			document.getElementById("divProgressProductosVendidos").style.backgroundColor='#ff5722'
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_mas_productosVendidos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_comision_mas_productosVendidos").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistroProductosVendidos").value = datos[3];
					document.getElementById("inptTotalRegistroTotalVentas").value = datos[4];
					document.getElementById("inptTotalVentasInvertido").value = datos[5];
					var totalinvertido= QuitarSeparadorMilValor(datos[5]);
					var totaliVenta= QuitarSeparadorMilValor(datos[4]);
					var Ganancias = totaliVenta - totalinvertido;
					document.getElementById("inptTotalGananciasInvertido").value = separadordemilesnumero(Ganancias)
						registrocargadoproductosvendidos=datos[99];
				 if(totalregistroproductosvendidos>registrocargadoproductosvendidos){
						 	var porce=((registrocargadoproductosvendidos*100)/totalregistroproductosvendidos).toFixed(0)
	document.getElementById("divProgressProductosVendidos").style.width=porce+"%"
						 document.getElementById("table_comision_mas_productosVendidos").innerHTML += "<div id='table_comision_mas_productosVendidos'></div>"
						 document.getElementById("table_comision_mas_productosVendidos").id=""
						  buscarmasproductosvendidos();
					 }else{
						 	document.getElementById("tbProcessProductosVendidos").style.display='none'
						 controldebusquedadProductosVendidos=false
					 }
					
				}
			} catch (error) {
				document.getElementById("divProgressProductosVendidos").style.backgroundColor='#ff5722'
				controldebusquedadProductosVendidos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/*
FILTRO CATEGORIA PRODUCTOS VENDIDOS
*/
function verCerrarFiltroProductosVendidos(d){
	
	if(d=="1"){
		document.getElementById("divFiltroProductosVendidos").style.display ="";
	}else{
		$("div[id=divFiltroProductosVendidos]").fadeOut(500);
	}
}
let array_cod_filtro_productos_vendidos_lengt = 0;
var array_cod_filtro_productos_vendidos = [];
function renderizar_opciones_filtro_productos_vendidos(registros) {
	var contenedor = document.getElementById("divBuscadorFiltroProductosVendidos");
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(registros || []).forEach(function (registro, indice) {
		var tabla = document.createElement("table");
		tabla.className = indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");

		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";

		var descripcion = document.createElement("td");
		descripcion.style.width = "50%";
		descripcion.textContent = registro.descripcion == null ? "" : registro.descripcion;

		var seleccion = document.createElement("td");
		seleccion.style.width = "50%";
		var check = document.createElement("input");
		check.type = "checkbox";
		check.id = String(registro.codigo == null ? "" : registro.codigo);
		check.name = "check_filtro_productos_vendidos";
		check.checked = registro.seleccionado !== false;
		check.addEventListener("click", function () {
			obteneridfiltroproductosvendidos(this);
		});

		seleccion.appendChild(check);
		fila.appendChild(descripcion);
		fila.appendChild(seleccion);
		tabla.appendChild(fila);
		contenedor.appendChild(tabla);
	});
}
function buscar_opciones_filtro_productos_vendidos() {
	document.getElementById("divBuscadorFiltroProductosVendidos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscar_opciones_filtro_productos_vendidos"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMCategoria.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFiltroProductosVendidos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFiltroProductosVendidos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				if (Array.isArray(datos_buscados)) renderizar_opciones_filtro_productos_vendidos(datos_buscados);
				else document.getElementById("divBuscadorFiltroProductosVendidos").innerHTML = datos_buscados
				array_cod_filtro_productos_vendidos = Array.isArray(datos[4]) ? datos[4] : []
				array_cod_filtro_productos_vendidos_lengt = array_cod_filtro_productos_vendidos.length;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function obteneridfiltroproductosvendidos(datos){
	
	var id = datos.id;
	let index = array_cod_filtro_productos_vendidos.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_filtro_productos_vendidos.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_filtro_productos_vendidos.push(id);
    }
	
	if(array_cod_filtro_productos_vendidos_lengt == array_cod_filtro_productos_vendidos.length){
		document.getElementById('checkSeleccTodoFiltroProdVendidos').checked = true;
	}else{
		document.getElementById('checkSeleccTodoFiltroProdVendidos').checked = false;
	}
}

function checkSeleccTodoFiltroProdVendidos(){
	if(document.getElementById('checkSeleccTodoFiltroProdVendidos').checked == true){
		document.getElementById('checkSeleccTodoFiltroProdVendidos').checked = false;
		marcarTodosFiltroProductosVendidos("1")
	}else{
		document.getElementById('checkSeleccTodoFiltroProdVendidos').checked = true;
		marcarTodosFiltroProductosVendidos("")
	}
}

function marcarTodosFiltroProductosVendidos(d){
	let checks = document.querySelectorAll("input[name='check_filtro_productos_vendidos']");
	
	if(d=='1'){
		checks.forEach((checks, index) => {
		checks.checked = false;
		});
		array_cod_filtro_productos_vendidos = []
	}else{
		array_cod_filtro_productos_vendidos = []
		checks.forEach((checks, index) => {
		checks.checked = true;
		array_cod_filtro_productos_vendidos.push(checks.id);
		});
	}
}


/*
FILTRO LOCALES INFORME DE VENDEDORES
*/
function verCerrarFiltroLocalInfoVendedores(d){
	
	if(d=="1"){
		document.getElementById("divFiltroLocalInfoVendedores").style.display ="";
	}else{
		$("div[id=divFiltroLocalInfoVendedores]").fadeOut(500);
	}
}
let array_cod_filtro_local_info_vendedores_lengt = 0;
var array_cod_filtro_local_info_vendedores = [];
function buscar_opciones_filtro_local_info_vendedores() {
	document.getElementById("divBuscadorFiltroLocalInfoVendedores").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscar_opciones_filtro_local_info_vendedores"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFiltroLocalInfoVendedores").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFiltroLocalInfoVendedores").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorFiltroLocalInfoVendedores").innerHTML = datos_buscados
				array_cod_filtro_local_info_vendedores = datos[4]
				array_cod_filtro_local_info_vendedores_lengt = array_cod_filtro_local_info_vendedores.length;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function obteneridfiltroLocalInfoVendedores(datos){
	
	var id = datos.id;
	let index = array_cod_filtro_local_info_vendedores.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_filtro_local_info_vendedores.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_filtro_local_info_vendedores.push(id);
    }
	
	if(array_cod_filtro_local_info_vendedores_lengt == array_cod_filtro_local_info_vendedores.length){
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = true;
	}else{
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = false;
	}
}

function checkSeleccTodoFiltroInfoVendedores(){
	if(document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked == true){
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = false;
		marcarTodosFiltroLocalInfoVendedores("1")
	}else{1
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = true;
		marcarTodosFiltroLocalInfoVendedores("")
	}
}

function marcarTodosFiltroLocalInfoVendedores(d){
	let checks = document.querySelectorAll("input[name='check_filtro_local_info_vendedores']");
	
	if(d=='1'){
		checks.forEach((checks, index) => {
		checks.checked = false;
		});
		array_cod_filtro_local_info_vendedores = []
	}else{
		array_cod_filtro_local_info_vendedores = []
		checks.forEach((checks, index) => {
		checks.checked = true;
		array_cod_filtro_local_info_vendedores.push(checks.id);
		});
	}
}



/*
FILTRO SECCION INFORME DE VENDEDORES
*/
function verCerrarFiltroSeccionInfoVendedores(d){
	
	if(d=="1"){
		document.getElementById("divFiltroSeccionInfoVendedores").style.display ="";
	}else{
		$("div[id=divFiltroSeccionInfoVendedores]").fadeOut(500);
	}
}
let array_cod_filtro_seccion_info_vendedores_lengt = 0;
var array_cod_filtro_seccion_info_vendedores = [];
function buscar_opciones_filtro_seccion_info_vendedores() {
	document.getElementById("divBuscadorFiltroSeccionInfoVendedores").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscar_opciones_filtro_seccion_info_vendedores"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFiltroSeccionInfoVendedores").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFiltroSeccionInfoVendedores").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorFiltroSeccionInfoVendedores").innerHTML = datos_buscados
				array_cod_filtro_seccion_info_vendedores = datos[4]
				array_cod_filtro_seccion_info_vendedores_lengt = array_cod_filtro_seccion_info_vendedores.length;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function obteneridfiltroSeccionInfoVendedores(datos){
	
	var id = datos.id;
	let index = array_cod_filtro_seccion_info_vendedores.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_filtro_seccion_info_vendedores.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_filtro_seccion_info_vendedores.push(id);
    }
	
	if(array_cod_filtro_seccion_info_vendedores_lengt == array_cod_filtro_seccion_info_vendedores.length){
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = true;
	}else{
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = false;
	}
}

function checkSeleccTodoFiltroSeccionInfoVendedores(){
	if(document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked == true){
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = false;
		marcarTodosFiltroSeccionInfoVendedores("1")
	}else{1
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = true;
		marcarTodosFiltroSeccionInfoVendedores("")
	}
}

function marcarTodosFiltroSeccionInfoVendedores(d){
	let checks = document.querySelectorAll("input[name='check_filtro_seccion_info_vendedores']");
	
	if(d=='1'){
		checks.forEach((checks, index) => {
		checks.checked = false;
		});
		array_cod_filtro_seccion_info_vendedores = []
	}else{
		array_cod_filtro_seccion_info_vendedores = []
		checks.forEach((checks, index) => {
		checks.checked = true;
		array_cod_filtro_seccion_info_vendedores.push(checks.id);
		});
	}
}

/*
FILTRO SECCION INFORME DE VENDEDORES
*/
function verCerrarFiltroVendedorInfoVendedores(d){
	
	if(d=="1"){
		document.getElementById("divFiltroVendedorInfoVendedores").style.display ="";
	}else{
		$("div[id=divFiltroVendedorInfoVendedores]").fadeOut(500);
	}
}
let array_cod_filtro_vendedor_info_vendedores_lengt = 0;
var array_cod_filtro_vendedor_info_vendedores = [];
function buscar_opciones_filtro_vendedor_info_vendedores() {
	document.getElementById("divBuscadorFiltroVendedorInfoVendedores").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscar_opciones_filtro_vendedor_info_vendedores"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFiltroVendedorInfoVendedores").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFiltroVendedorInfoVendedores").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorFiltroVendedorInfoVendedores").innerHTML = datos_buscados
				array_cod_filtro_vendedor_info_vendedores = datos[4]
				array_cod_filtro_vendedor_info_vendedores_lengt = array_cod_filtro_vendedor_info_vendedores.length;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function obteneridfiltroVendedorInfoVendedores(datos){
	
	var id = datos.id;
	let index = array_cod_filtro_vendedor_info_vendedores.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_filtro_vendedor_info_vendedores.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_filtro_vendedor_info_vendedores.push(id);
    }
	
	if(array_cod_filtro_vendedor_info_vendedores_lengt == array_cod_filtro_vendedor_info_vendedores.length){
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = true;
	}else{
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = false;
	}
}

function checkSeleccTodoFiltroVendedorInfoVendedores(){
	if(document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked == true){
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = false;
		marcarTodosFiltroVendedorInfoVendedores("1")
	}else{1
		document.getElementById('checkSeleccTodoFiltroInfoVendedores').checked = true;
		marcarTodosFiltroVendedorInfoVendedores("")
	}
}

function marcarTodosFiltroVendedorInfoVendedores(d){
	let checks = document.querySelectorAll("input[name='check_filtro_vendedor_info_vendedores']");
	
	if(d=='1'){
		checks.forEach((checks, index) => {
		checks.checked = false;
		});
		array_cod_filtro_vendedor_info_vendedores = []
	}else{
		array_cod_filtro_vendedor_info_vendedores = []
		checks.forEach((checks, index) => {
		checks.checked = true;
		array_cod_filtro_vendedor_info_vendedores.push(checks.id);
		});
	}
}



/*
PRODUCTOS NO VENDIDOS
*/
function verCerrarInformeProductosNoVendidos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeProductosNoVendidos").style.display==""){
	document.getElementById("divMinimizadoProductoNoVendido").style.display="none"
	limpiarcamposproductosnovendidos()
	 
	$("div[id=divInformeProductosNoVendidos]").fadeOut(500);	
	}else{
	if(controlacceso("VERINFORMEDEPRODUCTOSNOVENDIDOS","accion")==false){return;}
	mostrarSoloUno("divInformeProductosNoVendidos")	
		document.getElementById("divInformeProductosNoVendidos").style.display=""
   
	
	}
}
function limpiarcamposproductosnovendidos(){
	document.getElementById("inptRangoProductosNoVendidos").value=""
	document.getElementById("inptBuscarProductosNoVendidos1").value=""
	document.getElementById("inptBuscarProductosNoVendidos2").value=""
	document.getElementById("inptTotalRegistroProductosNoVendidos").value=""
	document.getElementById("table_comision_productosNoVendidos").innerHTML=""
}
function minimizarproductosnovendidos(){
	 
	$("div[id=divInformeProductosNoVendidos]").fadeOut(500);	
	document.getElementById("divMinimizadoProductoNoVendido").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuProductosNoVendidos"));
}
function buscarproductosnovendidos() {
if(controlacceso("VERINFORMEDEPRODUCTOSNOVENDIDOS","accion")==false){return;}
	var cod_local = document.getElementById('inptlocalInformeProductosNoVendidos').value
	var categoria = document.getElementById('inptCategoriaProductoInformeProductosNoVendidos').value
	var marca = document.getElementById('inptMarcaInformeProductosNoVendidos').value
	var codigo = document.getElementById('inptBuscarProductosNoVendidos1').value
	var producto = document.getElementById('inptBuscarProductosNoVendidos2').value
	var control = document.getElementById('inptRangoProductosNoVendidos').value
	
	if (control == "") {
		ver_vetana_informativa("FALTÓ SELECCIONAR UN RANGO")
		return;
	}
	
	document.getElementById("table_comision_productosNoVendidos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"control": control,
		"cod_local": cod_local,
		"categoria": categoria,
		"marca": marca,
		"codigo": codigo,
		"producto": producto,
		"funt": "buscarproductonovendidos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_productosNoVendidos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_productosNoVendidos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_comision_productosNoVendidos").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistroProductosNoVendidos").value = datos[3];	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

/*
LISTADO CALLCENTER
*/
var listadoClientesCallCenter = null;

function obtenerFilaCabeceraListadoCallCenter() {
	var cuerpo = document.getElementById("table_buscar_listado_callcenter");
	if (!cuerpo) return null;
	var tabla = cuerpo.previousElementSibling;
	while (tabla && (tabla.tagName !== "TABLE" || tabla.querySelector("input,select,textarea"))) {
		tabla = tabla.previousElementSibling;
	}
	if (!tabla || !tabla.rows || !tabla.rows[0]) return null;
	tabla.rows[0].id = "cabeceraListadoCallCenter";
	return tabla.rows[0];
}

function crearClienteListadoCallCenter(registro) {
	var fragmento = document.createDocumentFragment();
	if (registro.tipo_estado_nombre) {
		var estado = document.createElement("p");
		estado.style.color = "#d10000";
		estado.style.margin = "0";
		estado.textContent = registro.tipo_estado_nombre;
		fragmento.appendChild(estado);
	}
	fragmento.appendChild(document.createTextNode(registro.cliente || ""));
	return fragmento;
}

function iniciarListadoClientesCallCenter() {
	if (listadoClientesCallCenter || !window.AbmListadoCore) return listadoClientesCallCenter;
	if (!obtenerFilaCabeceraListadoCallCenter()) return null;
	listadoClientesCallCenter = window.AbmListadoCore.crear({
		nombre: "listado_clientes_callcenter",
		idCabecera: "cabeceraListadoCallCenter",
		idCuerpo: "table_buscar_listado_callcenter",
		columnas: [
			{ campo: "cliente", titulo: "CLIENTE", ancho: "30%" },
			{ campo: "cedula", titulo: "CI", ancho: "10%" },
			{ campo: "telefono", titulo: "NRO TELEFONO", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "10%" },
			{ campo: "informconf", titulo: "INFORMCONF", ancho: "10%" },
			{ campo: "cobrador", titulo: "COBRADOR", ancho: "20%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosclienteCallCenter",
			atributosFila: function (registro) {
				var estilo = {};
				if (registro.informconf === "INFORMCONF") {
					estilo.backgroundColor = "#FF9800";
					estilo.color = "white";
				}
				return {
					style: estilo,
					dataset: {
						cliente: registro.cliente || "",
						detalleCallcenter: registro.iddetalle_callcenter || "",
						codCliente: registro.cod_cliente || ""
					}
				};
			},
			celdas: [
				{ id: "td_id", campo: "iddetalle_callcenter", tecnica: true },
				{ id: "td_id_2", campo: "cod_cliente", tecnica: true },
				{ id: "td_datos_1", campo: "cliente", columna: "cliente", render: function (valor, registro) { return crearClienteListadoCallCenter(registro); } },
				{ campo: "cedula", columna: "cedula" },
				{ campo: "telefono", columna: "telefono" },
				{ campo: "estado", columna: "estado" },
				{ campo: "informconf", columna: "informconf" },
				{ campo: "cobrador", columna: "cobrador" }
			]
		},
		despuesRender: function (contenedor) {
			if (typeof cod_DetalleCallCenter === "undefined" || !cod_DetalleCallCenter) return;
			Array.prototype.some.call(contenedor.querySelectorAll("tr[data-detalle-callcenter]"), function (fila) {
				if (String(fila.getAttribute("data-detalle-callcenter") || "") !== String(cod_DetalleCallCenter)) return false;
				fila.className = "tableRegistroSelec";
				return true;
			});
		}
	});
	listadoClientesCallCenter.iniciar();
	return listadoClientesCallCenter;
}

function verCerrarListadoCallCenter(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divListadoCallCenter").style.display==""){
	document.getElementById("divMinimizadoListadoCallCenter").style.display="none"
	limpiarcamposbuscarcallcenter()
	//  
	$("div[id=divListadoCallCenter]").fadeOut(500);	
	}else{
	if(controlacceso("VERCALLCENTER","accion")==false){return;}
	mostrarSoloUno("divListadoCallCenter")	
		document.getElementById("divListadoCallCenter").style.display="" 
	}
}
function limpiarcamposbuscarcallcenter(){
	document.getElementById("inptBuscarListaCallCenter1").value=""
	var listado = iniciarListadoClientesCallCenter()
	if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_buscar_listado_callcenter").innerHTML="" }
	document.getElementById("inptTotalRegistrosCallCenter").value = ''
}
function minimizarListadoCallCenter(){	 
	$("div[id=divListadoCallCenter]").fadeOut(500);	
	document.getElementById("divMinimizadoListadoCallCenter").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuListadoCallCenter"));
}
function buscarlistadocallcenter() {
	var listado = iniciarListadoClientesCallCenter()
	var cliente = document.getElementById('inptBuscarListaCallCenter1').value
	var cedula = document.getElementById('inptBuscarListaCallCenter3').value
	var estado = document.getElementById('inptBuscarListaCallCenter2')
	estado = estado.options[estado.selectedIndex].text;
	var cobrador = document.getElementById('inptBuscarListaCallCenter4').value
	
	if(listado){ listado.establecerRegistros([], false) }
	document.getElementById("table_buscar_listado_callcenter").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cliente": cliente,
		"estado": estado,
		"cedula": cedula,
		"cobrador": cobrador,
		"formato": listado ? "json" : "html",
		"funt": "buscarListadoCallCenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_buscar_listado_callcenter").innerHTML = '' }
			document.getElementById("inptTotalRegistrosCallCenter").value = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_buscar_listado_callcenter").innerHTML = '' }
			document.getElementById("inptTotalRegistrosCallCenter").value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)){ listado.establecerRegistros(datos_buscados, false) }else{ document.getElementById("table_buscar_listado_callcenter").innerHTML = typeof datos_buscados === "string" ? datos_buscados : "" }
					document.getElementById("inptTotalRegistrosCallCenter").value = datos[3]
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function actualizarEstadoClienteCallCenter(estado) {
	if(estado =='INCOBRABLE'){
		if(controlacceso("INGRESARCLIENTEINCOBRABLE","accion")==false){return;}
	}
	
	if(cod_DetalleCallCenter == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"iddetalle_callcenter": cod_DetalleCallCenter,
		"estado": estado,
		"funt": "actualizarEstadoClienteCallCenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
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
					cod_DetalleCallCenter ='';
					buscarlistadocallcenter()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function actualizarTodosEstadosCallCenter() {
	if(controlacceso("PASARANOCONCRETADOTODOSLOSCLIENTECALLCENTERCOBROS","accion")==false){return;}
	if(!confirm('REALMENTE DESEA CONTINUAR?')){
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "actualizarTodosEstadosCallCenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
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
					ver_vetana_informativa('DATOS CARGADOS CORRECTAMENTE');
					buscarlistadocallcenter()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

var cod_DetalleCallCenter = '';
var cod_clienteCallCenter = '';
function obtenerdatosclienteCallCenter(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	
	cod_DetalleCallCenter = datostr.getAttribute('data-detalle-callcenter') || $(datostr).children('td[id="td_id"]').text();
	cod_clienteCallCenter = datostr.getAttribute('data-cod-cliente') || $(datostr).children('td[id="td_id_2"]').text();
	var clienteCallCenter = datostr.getAttribute('data-cliente');
	if(clienteCallCenter === null){ clienteCallCenter = $(datostr).children('td[id="td_datos_1"]').text(); }
	document.getElementById('inptClienteAgendaCallCenter').value = clienteCallCenter;
}

function buscarcreditos_imprimir() {
	verCerrarEfectoCargando("1")
	document.getElementById("table_abm_opciones_pago").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkVenta,
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_opciones_pago").innerHTML = ''
			verCerrarEfectoCargando("2")
		},
		success: function (responseText) {
			verCerrarEfectoCargando("1")
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_opciones_pago").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					paginaExtractoCuota = datos[12];
					document.getElementById("table_abm_opciones_pago").innerHTML = datos_buscados
					document.getElementById("inptTotalPagado").value = datos[3]
					document.getElementById("inptTotalPagadoOpcionesPago").value = datos[3]
					document.getElementById("inptDeudaActual").value = datos[4]
					document.getElementById('inptInteresPagoOpciones').value = datos[5]
					document.getElementById('inptTotalInteres').value = datos[7]
					document.getElementById('inptDiasAtrazadoCargarPago').value = datos[8]
					document.getElementById('inptEntregaPapo').value = datos[9]
					document.getElementById('inptTotalDescuentoOpcionesPago').value = datos[11]					
					document.getElementById('inptMontoCuotaPago').value = datos[15]
					document.getElementById('inptCuotasAtrazadoCargarPago').value = datos[14]
					document.getElementById('inptTotalinteresPago').value = datos[18]
					document.getElementById('inptSubtotalPago').value = datos[13]
					document.getElementById('inptTotalDeudaPago').value = datos[17]
					document.getElementById('inptDescuentoCargaPago').value = 0
					document.getElementById('inptMontoCargaPago').value = 0
					
					ImportePagare = datos[3]
					InteresRecibo=datos[19]
					DeudaActualRecibo=datos[17]
					TotalDescuentoRecibo=datos[11]	
					
					
					nombreClienteImprimir=datos[20]
					NroVentaClienteImprimir=datos[21]
					DetalleVentaClienteImprimir=datos[22]
					TipoVentaClienteImprimir=datos[23]
					FechaClienteImprimir=datos[24]
					
					
					
					if(datos[3]>0){
					document.getElementById("btnAbmGenerarCuotas").style.display='none'
					}else{
					document.getElementById("btnAbmGenerarCuotas").style.display=''
					}
					if(datos_buscados==""){
						document.getElementById("btnAbmGenerarCuotas").value='Generar Cuotas'
					}else{
						document.getElementById("btnAbmGenerarCuotas").value='Volver a generar Cuotas'
					}
					
					calcular_total_con_entrega()
					ImprimirExtracto(datos[25],datos[26],datos[27],datos[28],datos[29],datos[30],datos[31])
verCerrarEfectoCargando("2")
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function verCerrarReferenciasCliente(){
	
	buscarFotosGaleria(cod_clienteCallCenter)
	buscarDocumentosClienteSolicitud(cod_clienteCallCenter)
	buscarmasreferenciasSolicitudCreditoVista(cod_clienteCallCenter)
	buscarInfoClienteReferencia(cod_clienteCallCenter)
		document.getElementById("divVistaSolicitudCreditoDetalle").style.display=""
	
}

function buscarInfoClienteReferencia(CodClienteFK){
		 verCerrarEfectoCargando("1");
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": CodClienteFK,
			"funt": "buscarInfoClienteReferencia"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	verCerrarEfectoCargando("");
			},
			success: function(responseText)
			{
	verCerrarEfectoCargando("");
			var Respuesta=responseText;
     console.log(Respuesta)
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		    var array_datos=datos[2];		 
				
			 	document.getElementById('inptNombreSolicitudCreditoVista').value=array_datos[2];
				document.getElementById('inptNroDocSolicitudCreditoVista').value=array_datos[10];
				document.getElementById('inptNroRucSolicitudCreditoVista').value=array_datos[6];
				document.getElementById('inptNroTelefSolicitudCreditoVista').value=array_datos[14];
				document.getElementById('inptNrowhatsappSolicitudCreditoVista').value=array_datos[7];
				document.getElementById('inptFechaNacSolicitudCreditoVista').value=array_datos[1];
				document.getElementById('inptDireccionSolicitudCreditoVista').value=array_datos[3];
				document.getElementById('inptReferenciaSolicitudCreditoVista').value=array_datos[5];
				document.getElementById('inptZonaSolicitudCreditoVista').value=array_datos[9];
				document.getElementById('inptLugrarTrabajoSolicitudCreditoVista').value=array_datos[11];
				document.getElementById('inptDireccionTrabajoSolicitudCreditoVista').value=array_datos[3];
				document.getElementById('inptSalarioSolicitudCreditoVista').value=array_datos[12];
				document.getElementById('inptAntiguedadSolicitudCreditoVista').value=array_datos[13];
				document.getElementById('inptNroTelefTrabajoSolicitudCredito1Vista').value=array_datos[14];
				document.getElementById('inptNroTelefTrabajoSolicitudCredito2Vista').value=array_datos[15];
				document.getElementById('inptObserbacionTrabajoSolicitudCredito2Vista').value=array_datos[0];
				
				document.getElementById('inptNombreSolicitudCreditoVistaAprobarSoli').value=array_datos[2];
				document.getElementById('inptNroDocSolicitudCreditoVistaAprobarSoli').value=array_datos[10];
				document.getElementById('inptNroRucSolicitudCreditoVistaAprobarSoli').value=array_datos[6];
				document.getElementById('inptNroTelefSolicitudCreditoVistaAprobarSoli').value=array_datos[14];
				document.getElementById('inptNrowhatsappSolicitudCreditoVistaAprobarSoli').value=array_datos[7];
				document.getElementById('inptFechaNacSolicitudCreditoVistaAprobarSoli').value=array_datos[1];
				document.getElementById('inptDireccionSolicitudCreditoVistaAprobarSoli').value=array_datos[3];
				document.getElementById('inptReferenciaSolicitudCreditoVistaAprobarSoli').value=array_datos[5];
				document.getElementById('inptZonaSolicitudCreditoVistaAprobarSoli').value=array_datos[9];
				document.getElementById('inptLugrarTrabajoSolicitudCreditoVistaAprobarSoli').value=array_datos[11];
				document.getElementById('inptDireccionTrabajoSolicitudCreditoVistaAprobarSoli').value=array_datos[3];
				document.getElementById('inptSalarioSolicitudCreditoVistaAprobarSoli').value=array_datos[12];
				document.getElementById('inptAntiguedadSolicitudCreditoVistaAprobarSoli').value=array_datos[13];
				document.getElementById('inptNroTelefTrabajoSolicitudCredito1VistaAprobarSoli').value=array_datos[14];
				document.getElementById('inptNroTelefTrabajoSolicitudCredito2VistaAprobarSoli').value=array_datos[15];
				document.getElementById('inptObserbacionTrabajoSolicitudCredito2VistaAprobarSoli').value=array_datos[0];
				
			
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



/* BUSCAR CUENTA CLIENTE EN CALLCENTER*/
function valorSeguroCuentaCallCenter(valor){
	return valor === null || typeof valor === "undefined" ? "" : String(valor);
}

function crearTablaFilaCuentaCallCenter(clase, alSeleccionar){
	var tabla = document.createElement("table");
	tabla.className = clase === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	if(typeof alSeleccionar === "function"){
		fila.onclick = function(){ alSeleccionar(this); };
	}
	tabla.appendChild(fila);
	return { tabla: tabla, fila: fila };
}

function agregarCeldaCuentaCallCenter(fila, id, valor, ancho, oculta){
	var celda = document.createElement("td");
	if(id){ celda.id = id; }
	if(ancho){ celda.style.width = ancho; }
	if(oculta){ celda.style.display = "none"; }
	celda.textContent = valorSeguroCuentaCallCenter(valor);
	fila.appendChild(celda);
	return celda;
}

function renderCuentaCobrarCallCenter(registros){
	var contenedor = document.getElementById("table_vista_cuenta_cliente_call_center");
	if(!contenedor || !Array.isArray(registros)){ return; }
	contenedor.textContent = "";
	var fragmento = document.createDocumentFragment();
	registros.forEach(function(registro){
		var tablaFila = crearTablaFilaCuentaCallCenter(registro.clase_fila, obtenerdatoscuentaacobrarcallcenter);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_id_1", registro.id_cliente, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_1", registro.id_venta, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_2", registro.numero_factura, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.plazo, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_26", registro.cliente, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.documento, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.telefono, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.factura, "", true);
		var celdaProductos = agregarCeldaCuentaCallCenter(tablaFila.fila, "", "", "20%", false);
		(Array.isArray(registro.productos) ? registro.productos : []).forEach(function(producto){
			var tablaProducto = crearTablaFilaCuentaCallCenter("tableRegistroSearch", obtenerdatoscreditodetalle);
			agregarCeldaCuentaCallCenter(tablaProducto.fila, "td_id_1", registro.id_venta, "", true);
			agregarCeldaCuentaCallCenter(tablaProducto.fila, "td_id_2", "", "", true);
			agregarCeldaCuentaCallCenter(tablaProducto.fila, "", producto, "100%", false);
			celdaProductos.appendChild(tablaProducto.tabla);
		});
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_5", registro.cobrador, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_12", registro.total_venta, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.fecha_vencimiento, "5%", false);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_3", registro.fecha_pago, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_19", registro.cuotas, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_6", registro.monto_cuota, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_18", registro.descuento, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.interes_pagado, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.pagado_sin_interes, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_13", registro.total_pagado, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_17", registro.total_interes, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_20", registro.cuotas_atrasadas, "5%", false);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_10", registro.dias_atrasados, "5%", false);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_22", registro.deuda_pendiente, "5%", false);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_11", registro.total_deuda, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_14", registro.total_a_pagar, "5%", false);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_7", registro.pago_acumulado, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_8", registro.total_venta_oculto, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_9", registro.id_cobrador, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "", registro.local, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_15", registro.tipo_comprobante, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_16", registro.punto_expedicion, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_21", registro.total_sin_interes, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_23", registro.vendedor, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_24", registro.latitud, "", true);
		agregarCeldaCuentaCallCenter(tablaFila.fila, "td_datos_25", registro.longitud, "", true);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function vercerrarvistacuentasclientecallcenter(d){
	if(d == '1'){
		if(cod_clienteCallCenter == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
		return;
	}
		document.getElementById('divVistaCuentasClienteCallCenter').style.display = ''
		buscarcuentaacobrarcallcenter(cod_clienteCallCenter)
	}else{
		document.getElementById('divVistaCuentasClienteCallCenter').style.display = 'none'
	}
}
function buscarcuentaacobrarcallcenter(cod_cliente) {	
    document.getElementById("inptRegistroRegistrocargadoCuentaAcobrarCallCenter").value = ""
	document.getElementById("inptRegistroNroHistorialTotalADeudadCuentaCallCenter").value =  ""
	document.getElementById("inptRegistroHistorialTotalACobraCuentaCallCenter").value =  ""
	document.getElementById("table_vista_cuenta_cliente_call_center").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_clienteFK": cod_cliente,
		"formato": "json",
		"funt": "cuentasacobrarcallcenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_cuenta_cliente_call_center").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_cuenta_cliente_call_center").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					
					renderCuentaCobrarCallCenter(datos_buscados)
					 document.getElementById("inptRegistroRegistrocargadoCuentaAcobrarCallCenter").value =datos[3]
	                document.getElementById("inptRegistroNroHistorialTotalADeudadCuentaCallCenter").value =  datos[4]
	                document.getElementById("inptRegistroHistorialTotalACobraCuentaCallCenter").value =  datos[5]
					
						
					}
					
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function obtenerdatoscuentaacobrarcallcenter(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	idFkVenta = $(datostr).children('td[id="td_datos_1"]').html();
	buscarcreditosexpediente_imprimir()
}

/* AGENDAR CLIENTE DESDE CALLCENTER */
function verCerrarAbmAgendaCallCenter(d){
	if(d=='1'){
		 
		$("div[id=divAbmAgendaCallCenter]").fadeOut(500);	
	}else{
		if(document.getElementById('inptSelecActualizarEstadoCliente').value  == ''){
		ver_vetana_informativa('FALTO SELECCIONAR UN ESTADO PARA EL CLIENTE');
		return;
	}
	if( cod_clienteCallCenter == ''){
		ver_vetana_informativa('FALTO SELECCIONAR UN CLIENTE');
		return;
	}
		
		document.getElementById("divAbmAgendaCallCenter").style.display=""
		 
	}
}

function verificarcamposAgendaCallCenter(){
	var inptMotivoAgendaCallCenter = document.getElementById('inptMotivoAgendaCallCenter').value
	var inptCompromisoAgendaCallCenter = document.getElementById('inptCompromisoAgendaCallCenter').value
	
	if(inptMotivoAgendaCallCenter == ''){
		ver_vetana_informativa('FALTÓ INGRESAR UN MOTIVO PARA EL CLIENTE');
		return;
	}
	
	if(inptCompromisoAgendaCallCenter == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UNA FECHA PARA EL CLIENTE');
		return;
	}
	
	abmAgenda(inptMotivoAgendaCallCenter, inptCompromisoAgendaCallCenter  ,'Activo' ,cod_clienteCallCenter , '', 'nuevo','2');
}
function limpiarcamposAgendaCallCenter() {
	document.getElementById('inptClienteAgendaCallCenter').value = "";
	document.getElementById('inptMotivoAgendaCallCenter').value = "";	
	document.getElementById('inptCompromisoAgendaCallCenter').value = "";
	cod_clienteCallCenter = "";
	document.getElementById('divAbmAgendaCallCenter').style.display = 'none'
	document.getElementById('inptSelecActualizarEstadoCliente').value = ''
}

/*
PRODUCTOS COMPRADOS
*/
var listadoProductosComprados = null;

function obtenerFilaCabeceraProductosComprados() {
	var cuerpo = document.getElementById("table_comision_productosComprados");
	if (!cuerpo) return null;
	var tabla = cuerpo.previousElementSibling;
	while (tabla && (tabla.tagName !== "TABLE" || tabla.querySelector("input,select,textarea"))) {
		tabla = tabla.previousElementSibling;
	}
	if (!tabla || !tabla.rows || !tabla.rows[0]) return null;
	tabla.rows[0].id = "cabeceraProductosComprados";
	return tabla.rows[0];
}

function iniciarListadoProductosComprados() {
	if (listadoProductosComprados || !window.AbmListadoCore) return listadoProductosComprados;
	if (!obtenerFilaCabeceraProductosComprados()) return null;
	listadoProductosComprados = window.AbmListadoCore.crear({
		nombre: "productos_comprados",
		idCabecera: "cabeceraProductosComprados",
		idCuerpo: "table_comision_productosComprados",
		columnas: [
			{ campo: "fecha_compra", titulo: "FECHA", ancho: "10%" },
			{ campo: "codigo", titulo: "CODIGO", ancho: "10%" },
			{ campo: "nombre_producto", titulo: "PRODUCTO", ancho: "20%" },
			{ campo: "marca", titulo: "MARCA", ancho: "7%" },
			{ campo: "categoria", titulo: "CATEGORIA", ancho: "10%" },
			{ campo: "cantidad", titulo: "CANT.", ancho: "7%" },
			{ campo: "precio", titulo: "PRECIO", ancho: "7%" },
			{ campo: "total", titulo: "TOTAL", ancho: "9%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: {
			celdas: [
				{ campo: "fecha_compra", columna: "fecha_compra" },
				{ campo: "codigo", columna: "codigo" },
				{ campo: "nombre_producto", columna: "nombre_producto" },
				{ campo: "marca", columna: "marca" },
				{ campo: "categoria", columna: "categoria" },
				{ campo: "cantidad_formateada", columna: "cantidad" },
				{ campo: "precio_formateado", columna: "precio" },
				{ campo: "total_formateado", columna: "total" },
				{ campo: "proveedor", columna: "proveedor" },
				{ campo: "local", columna: "local" }
			]
		}
	});
	listadoProductosComprados.iniciar();
	return listadoProductosComprados;
}

function verCerrarInformeProductosComprados(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeProductosComprados").style.display==""){
			if(controldebusquedadProductosComprados==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoProductoComprado").style.display="none"
		limpiarCamposBuscadorProductosComprados()
 
	$("div[id=divInformeProductosComprados]").fadeOut(500);	
	}else{		
	if(controlacceso("VERINFORMEDEPRODUCTOSCOMPRADOS","accion")==false){return;}
	mostrarSoloUno("divInformeProductosComprados")
		document.getElementById("divInformeProductosComprados").style.display=""
  
	
	}
}
function limpiarCamposBuscadorProductosComprados(){
		if(controldebusquedadProductosComprados==true){
		
	return
}
	document.getElementById("inptBuscarProductosCompradosF1").value=""
	document.getElementById("inptBuscarProductosCompradosF2").value=""
	document.getElementById("inptBuscarProductosComprados1").value=""
	document.getElementById("inptBuscarProductosComprados2").value=""
	document.getElementById("inptTotalRegistroProductoComprados").value=""
	document.getElementById("inptTotalProductosComprados").value=""
	if(listadoProductosComprados) listadoProductosComprados.establecerRegistros([], false)
	else document.getElementById("table_comision_productosComprados").innerHTML=""
	document.getElementById("tbProcessProductosComprados").style.display="none"
}
function minimizarventanaProductosComprados(){
 
	$("div[id=divInformeProductosComprados]").fadeOut(500);	
	document.getElementById("divMinimizadoProductoComprado").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuProductosComprados"));
}
function checkHistorialProductoComprados(d){	
	if(d=="1"){
		document.getElementById('checkHistorialProductoComprados1').checked=true
		document.getElementById('checkHistorialProductoComprados2').checked=false
		document.getElementById('inptBuscarProductosCompradosF1').value = "";
	    document.getElementById('inptBuscarProductosCompradosF2').value = "";	
	}else{		
		document.getElementById('checkHistorialProductoComprados1').checked=false
		document.getElementById('checkHistorialProductoComprados2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarProductosCompradosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarProductosCompradosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
var registrocargadoproductoscomprados="";
var totalregistroproductoscomproados="";
var controldebusquedadProductosComprados=false
function cancelarProductosComprados(){
	controldebusquedadProductosComprados=false
	document.getElementById("divProgressProductosComprados").style.backgroundColor='#ff5722'
}
function buscarproductoscomprados() {
	if(controlacceso("VERINFORMEDEPRODUCTOSCOMPRADOS","accion")==false){return;}
	var listado = iniciarListadoProductosComprados()
	var cod_local = document.getElementById('inptlocalInformeProductosComprados').value
	var categoria = document.getElementById('inptCategoriaInformeProductosComprados').value
	var marca = document.getElementById('inptMarcaInformeProductosComprados').value
	var fecha1 = document.getElementById('inptBuscarProductosCompradosF1').value
	var fecha2 = document.getElementById('inptBuscarProductosCompradosF2').value
	var codigo = document.getElementById('inptBuscarProductosComprados1').value
	var producto = document.getElementById('inptBuscarProductosComprados2').value
	if(document.getElementById('checkHistorialProductoComprados2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
	fecha1 = ""
	fecha2 = ""
		
	}
	/* if(controldebusquedadProductosComprados==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
} */
	// controldebusquedadProductosComprados=true
	if(listado) listado.establecerRegistros([], false)
	document.getElementById("table_comision_productosComprados").innerHTML = paginacargando
	// document.getElementById("tbProcessProductosComprados").style.display="none"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"marca": marca,
		"cod_local": cod_local,
		"categoria": categoria,
		"codigo": codigo,
		"producto": producto,
		"formato": listado ? "json" : "html",
		"funt": "buscarproductocomprados"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallecompra.php",
		type: "post",
		 
		
		beforeSend: function () {
			},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_comision_productosComprados").innerHTML = ''
			/* controldebusquedadProductosComprados=false */
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_comision_productosComprados").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_comision_productosComprados").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalProductosComprados").value = datos[3];
					document.getElementById("inptTotalRegistroProductoComprados").value = datos[4];
					// registrocargadoproductoscomprados=datos[99];
					// totalregistroproductoscomproados=datos[100];
		
						/*  if(totalregistroproductoscomproados>registrocargadoproductoscomprados){
						 	var porce=((registrocargadoproductoscomprados*100)/totalregistroproductoscomproados).toFixed(0)
	document.getElementById("divProgressProductosComprados").style.width=porce+"%"
						 document.getElementById("table_comision_productosComprados").innerHTML += "<div id='table_comision_mas_productosComprados'></div>"
						  buscarmasproductoscomprados();
							
					 }else{
						 controldebusquedadProductosComprados=false
					 } */
				}
			} catch (error) {
				// controldebusquedadProductosComprados=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarmasproductoscomprados(c) {
	if(controlacceso("VERINFORMEDEPRODUCTOSCOMPRADOS","accion")==false){return;}
	var listado = iniciarListadoProductosComprados()
	var cod_local = document.getElementById('inptlocalInformeProductosComprados').value
	var categoria = document.getElementById('inptCategoriaInformeProductosComprados').value
	var marca = document.getElementById('inptMarcaInformeProductosComprados').value
	var fecha1 = document.getElementById('inptBuscarProductosCompradosF1').value
	var fecha2 = document.getElementById('inptBuscarProductosCompradosF2').value
	var codigo = document.getElementById('inptBuscarProductosComprados1').value
	var producto = document.getElementById('inptBuscarProductosComprados2').value
	if(document.getElementById('checkHistorialProductoComprados2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
	fecha1 = ""
	fecha2 = ""
		
	}
	if(c=="1"){
		controldebusquedadProductosComprados=true
	}
	if(controldebusquedadProductosComprados==false){
		
	return
}
	controldebusquedadProductosComprados=true
	var destinoMasProductosComprados = document.getElementById("table_comision_mas_productosComprados")
	if(!listado && !destinoMasProductosComprados){
		controldebusquedadProductosComprados=false
		return
	}
	if(destinoMasProductosComprados) destinoMasProductosComprados.innerHTML = paginacargando
	document.getElementById("tbProcessProductosComprados").style.display=""
	document.getElementById("divProgressProductosComprados").style.backgroundColor=''
	var totalcompra=document.getElementById("inptTotalProductosComprados").value;
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"marca": marca,
		"cod_local": cod_local,
		"categoria": categoria,
		"codigo": codigo,
		"producto": producto,
		"registrocargado": registrocargadoproductoscomprados,
		"totalcompra": totalcompra,
		"formato": listado ? "json" : "html",
		"funt": "buscarmasproductocomprados"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallecompra.php",
		type: "post",
		 
		
		beforeSend: function () {
			},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(destinoMasProductosComprados) destinoMasProductosComprados.innerHTML = ''
			document.getElementById("divProgressProductosComprados").style.backgroundColor='#ff5722'
			controldebusquedadProductosComprados=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(destinoMasProductosComprados) destinoMasProductosComprados.innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, true)
					else if(destinoMasProductosComprados) destinoMasProductosComprados.innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalProductosComprados").value = datos[3];
					document.getElementById("inptTotalRegistroProductoComprados").value = datos[4];
					registrocargadoproductoscomprados=datos[99];
					
		
		
		
						 if(totalregistroproductoscomproados>registrocargadoproductoscomprados){
						 	var porce=((registrocargadoproductoscomprados*100)/totalregistroproductoscomproados).toFixed(0)
	document.getElementById("divProgressProductosComprados").style.width=porce+"%"
						 if(!listado && destinoMasProductosComprados){
						 	destinoMasProductosComprados.insertAdjacentHTML("beforeend", "<div id='table_comision_mas_productosComprados'></div>")
						 	destinoMasProductosComprados.id=""
						 }
						  buscarmasproductoscomprados();
					 }else{
						 document.getElementById("tbProcessProductosComprados").style.display="none"
						 controldebusquedadProductosComprados=false
					 }
				}
			} catch (error) {
				document.getElementById("divProgressProductosComprados").style.backgroundColor='#ff5722'
				controldebusquedadProductosComprados=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

/*
COMISIÓN DE COBRADOR
*/
function verCerrarInformeComisionCobrador(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divComisionCobrador").style.display==""){
		if(controldebusquedadComisionCobrador==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
	document.getElementById("divMinimizadoComisionCobrador").style.display="none"
	limpiarcamposbuscarcomisioncobrador()
 
	$("div[id=divComisionCobrador]").fadeOut(500);	
	}else{		
	if(controlacceso("VERINFORMEDECOMISIONCOBRADOR","accion")==false){return;}
	mostrarSoloUno("divComisionCobrador")	
		document.getElementById("divComisionCobrador").style.display=""
  
	
	}
}
function minimizarInformeComisionCobrador(){
 
	$("div[id=divComisionCobrador]").fadeOut(500);
	document.getElementById("divMinimizadoComisionCobrador").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuComisionCobrador"));
}
function limpiarcamposbuscarcomisioncobrador(){
	if(controldebusquedadComisionCobrador==true){
	
	return
}
	 document.getElementById('inptBuscarComisionCobradorF1').value=""
	 document.getElementById('inptBuscarComisionCobradorF2').value=""
	 document.getElementById('inputSelectZonaComisionCobrador').value=""
	  document.getElementById('inptBuscarComisionCobrador1').value=""
	 document.getElementById('inptBuscarComisionCobrador2').value=""
	 document.getElementById("inptTotalRecaudadoComision").value = "";
					document.getElementById("inptTotalRegistoComision").value = "";
					document.getElementById("inptTotalComision").value = "";
	 document.getElementById('table_comision_cobrador').innerHTML=""
	 if (listadoComisionCobrador) listadoComisionCobrador.establecerRegistros([])
	 if (listadoComisionCobradorAgrupado) listadoComisionCobradorAgrupado.establecerRegistros([])
	 document.getElementById('tbProcessComisionCobrador').style.display="none"
}
function minimizarventanaComisionCobrador(){
	document.getElementById("divComisionCobrador").style.display="none"
	document.getElementById("divMinimizadoComisionCobrador").style.display=""
}
function checkHistorialComisionCobrador(d){	
	if(d=="1"){
		document.getElementById('checkHistorialComisionCobrador1').checked=true
		document.getElementById('checkHistorialComisionCobrador2').checked=false
		document.getElementById('inptBuscarComisionCobradorF1').value = "";
	    document.getElementById('inptBuscarComisionCobradorF2').value = "";	
	}else{		
		document.getElementById('checkHistorialComisionCobrador1').checked=false
		document.getElementById('checkHistorialComisionCobrador2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarComisionCobradorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarComisionCobradorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
var codCobradorComision = "";
var registrocargadocomisioncobrador="";
var totalregistrocomisioncobrador="";
var controldebusquedadComisionCobrador=false
function cancelarComisionCobrador(){
	controldebusquedadComisionCobrador=false
	document.getElementById("divProgressComisionCobrador").style.backgroundColor='#ff5722'
}
function buscarcomisioncobrador() {
	if(agrupacioncomisioncobrador=="2"){
		buscarcomisioncobradoragrupado()
		return;
	}
	var listado = iniciarListadoComisionCobrador()
	
if(controlacceso("VERINFORMEDECOMISIONCOBRADOR","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarComisionCobradorF1').value
	var fecha2 = document.getElementById('inptBuscarComisionCobradorF2').value
	var zona = document.getElementById('inputSelectZonaComisionCobrador').value
	var cobrado = document.getElementById('inptBuscarComisionCobrador1').value
	var fechafiltro = document.getElementById('inptBuscarComisionCobrador2').value
	if(document.getElementById('checkHistorialComisionCobrador2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	}else{
	fecha1 =""
	fecha2 = ""
	}
	if(controldebusquedadComisionCobrador==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadComisionCobrador=true
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_comision_cobrador").innerHTML = paginacargando
	document.getElementById("tbProcessComisionCobrador").style.display="none"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrado": cobrado,
		"fechafiltro": fechafiltro,
		"zona": zona,
		"formato": listado ? "json" : "html",
		"funt": "comisioncobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_comision_cobrador").innerHTML = ''
			controldebusquedadComisionCobrador=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_comision_cobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_comision_cobrador").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRecaudadoComision").value = datos[3];
					document.getElementById("inptTotalRegistoComision").value = datos[4];
					document.getElementById("inptTotalComision").value = datos[5];
						registrocargadocomisioncobrador=datos[99];
					totalregistrocomisioncobrador=datos[100];
					
					
					
						 if(totalregistrocomisioncobrador>registrocargadocomisioncobrador){
						 	var porce=((registrocargadocomisioncobrador*100)/totalregistrocomisioncobrador).toFixed(0)
	                       document.getElementById("divProgressComisionCobrador").style.width=porce+"%"
						 if (!listado) document.getElementById("table_comision_cobrador").innerHTML += "<div id='table_comision_mas_cobrador'></div>"
						  buscarmascomisioncobrador();
					 }else{
						 controldebusquedadComisionCobrador=false
						 buscar_meta_cobrador()
					 }
					
				}
			} catch (error) {
				controldebusquedadComisionCobrador=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
		});
}
function buscarmascomisioncobrador(c) {
if(controlacceso("VERINFORMEDECOMISIONCOBRADOR","accion")==false){return;}
	var listado = iniciarListadoComisionCobrador()
	var fecha1 = document.getElementById('inptBuscarComisionCobradorF1').value
	var fecha2 = document.getElementById('inptBuscarComisionCobradorF2').value
	var zona = document.getElementById('inputSelectZonaComisionCobrador').value
	var cobrado = document.getElementById('inptBuscarComisionCobrador1').value
	var fechafiltro = document.getElementById('inptBuscarComisionCobrador2').value
	if(document.getElementById('checkHistorialComisionCobrador2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	}else{
	fecha1 =""
	fecha2 = ""
	}
	if(c=="1"){
		controldebusquedadComisionCobrador=true
	}
	if(controldebusquedadComisionCobrador==false){
		return
}
controldebusquedadComisionCobrador=true
	var destinoMasCobrador = document.getElementById("table_comision_mas_cobrador")
	if (!listado && destinoMasCobrador) destinoMasCobrador.innerHTML = paginacargando
	document.getElementById("tbProcessComisionCobrador").style.display=""
	document.getElementById("divProgressComisionCobrador").style.backgroundColor=''
	var totalrecaudacion=document.getElementById("inptTotalRecaudadoComision").value;
	var totalcomision=document.getElementById("inptTotalComision").value ;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrado": cobrado,
		"fechafiltro": fechafiltro,
		"zona": zona,
		"totalrecaudacion": totalrecaudacion,
		"totalcomision": totalcomision,
		"registrocargado": registrocargadocomisioncobrador,
		"formato": listado ? "json" : "html",
		"funt": "mascomisioncobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (!listado && destinoMasCobrador) destinoMasCobrador.innerHTML = ''
			document.getElementById("divProgressComisionCobrador").style.backgroundColor='#ff5722'
			controldebusquedadComisionCobrador=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado && destinoMasCobrador) destinoMasCobrador.innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, true)
					else if (destinoMasCobrador) destinoMasCobrador.innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRecaudadoComision").value = datos[3];
					document.getElementById("inptTotalRegistoComision").value = datos[4];
					document.getElementById("inptTotalComision").value = datos[5];
						registrocargadocomisioncobrador=datos[99];
					
						 if(totalregistrocomisioncobrador>registrocargadocomisioncobrador){
						 	var porce=((registrocargadocomisioncobrador*100)/totalregistrocomisioncobrador).toFixed(0)
	                       document.getElementById("divProgressComisionCobrador").style.width=porce+"%"
						 if (!listado && destinoMasCobrador) {
							destinoMasCobrador.insertAdjacentHTML("beforeend", "<div id='table_comision_mas_cobrador'></div>")
							destinoMasCobrador.id=""
						 }
						  buscarmascomisioncobrador();
					 }else{
						 	document.getElementById("tbProcessComisionCobrador").style.display="none"
						 controldebusquedadComisionCobrador=false
						 buscar_meta_cobrador()
					 }
					
				}
			} catch (error) {
				document.getElementById("divProgressComisionCobrador").style.backgroundColor='#ff5722'
				controldebusquedadComisionCobrador=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
		});
}


function buscarcomisioncobradoragrupado() {
	var listado = iniciarListadoComisionCobradorAgrupado()
	let fecha1 = document.getElementById('inptBuscarComisionCobradorF1').value;
	let fecha2 = document.getElementById('inptBuscarComisionCobradorF2').value;
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	
	
	let condicion = document.getElementById('inptBuscarComisionCobradorAgrupado1').value;
	let tipo_pago = document.getElementById('inptBuscarComisionCobradorAgrupado2').value;
	let tipo_cuota = document.getElementById('inptBuscarComisionCobradorAgrupado3').value;
	let cod_local = document.getElementById('inptBuscarComisionCobradorAgrupadoLocal').value;
	
	
	document.getElementById('inptTotalCobroComisionCobradorAgrupado').value = '';
	document.getElementById('inptTotalMetaComisionCobradorAgrupado').value = '';
	document.getElementById('inptTotalPorcentajeComisionCobradorAgrupado').value = '';
	
	/* if(array_cod_filtro_local_info_cobradores.length <=0){
		ver_vetana_informativa('FALTÓ SELECCIONAR LOCAL');
		return;
	} */
	
	if(array_cod_filtro_cobrador_info_cobradores.length <=0){
		ver_vetana_informativa('FALTÓ SELECCIONAR COBRADOR');
		return;
	}
	
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_comision_cobrador_agrupado").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,				
		"fecha1": fecha1,				
		"fecha2": fecha2,				
		"condicion": condicion,	
		"tipo_pago": tipo_pago,	
		"tipo_cuota": tipo_cuota,	
		"cod_local": cod_local,	
		"array_cod_filtro_cobrador_info_cobradores": JSON.stringify(array_cod_filtro_cobrador_info_cobradores),		
		"formato": listado ? "json" : "html",
		"funt": "comisioncobradoragrupado"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_comision_cobrador_agrupado").innerHTML = ''
			
			document.getElementById('inptTotalCobroComisionCobradorAgrupado').value = '';
	document.getElementById('inptTotalMetaComisionCobradorAgrupado').value = '';
	document.getElementById('inptTotalPorcentajeComisionCobradorAgrupado').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_comision_cobrador_agrupado").innerHTML = ''
			
			document.getElementById('inptTotalCobroComisionCobradorAgrupado').value = '';
	document.getElementById('inptTotalMetaComisionCobradorAgrupado').value = '';
	document.getElementById('inptTotalPorcentajeComisionCobradorAgrupado').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) {
						datos_buscados = datos_buscados.slice().sort(function (a, b) { return Number(b.porcentaje || 0) - Number(a.porcentaje || 0); })
						listado.establecerRegistros(datos_buscados)
					} else document.getElementById("table_comision_cobrador_agrupado").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					
					document.getElementById('inptTotalCobroComisionCobradorAgrupado').value = datos[3];
	document.getElementById('inptTotalMetaComisionCobradorAgrupado').value = datos[4];
	document.getElementById('inptTotalPorcentajeComisionCobradorAgrupado').value = datos[6];
					if (!listado) ordenarPorcentajeBuscarAgrupacionInfoCobradores();
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function ordenarPorcentajeBuscarAgrupacionInfoCobradores() {
  const contenedor = document.getElementById("table_comision_cobrador_agrupado");

  // Obtener todas las tablas visibles (sin display:none)
  const tablasVisibles = Array.from(contenedor.querySelectorAll("table"))
    .filter(t => t.style.display !== "none");

  // Obtener las tablas ocultas (para mantenerlas intactas)
  const tablasOcultas = Array.from(contenedor.querySelectorAll("table"))
    .filter(t => t.style.display === "none");

  // Convertir las visibles en objetos con el porcentaje numérico
  const datos = tablasVisibles.map(tabla => {
    const celdas = tabla.querySelectorAll("td");
    const textoPorcentaje = celdas[celdas.length - 1].innerText.trim();
    const porcentaje = parseFloat(textoPorcentaje.replace("%", "")) || 0;
    return { tabla, porcentaje };
  });

  // Ordenar de mayor a menor porcentaje
  datos.sort((a, b) => b.porcentaje - a.porcentaje);

  // Limpiar el contenedor
  contenedor.innerHTML = "";

  // Volver a insertar las tablas:
  // 1️⃣ la primera oculta (encabezado)
  if (tablasOcultas.length > 0) contenedor.appendChild(tablasOcultas[0]);

  // 2️⃣ todas las tablas ordenadas
  datos.forEach(d => contenedor.appendChild(d.tabla));

  // 3️⃣ la última oculta (totales)
  if (tablasOcultas.length > 1) contenedor.appendChild(tablasOcultas[1]);
}


var agrupacioncomisioncobrador="1";
function cambiarBusquedaAgrupadoComisionCobrador(d){
	if(controldebusquedadComisionCobrador==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
document.getElementById("btnHistorialComisionCobrador1").style=""
document.getElementById("btnHistorialComisionCobrador2").style=""

document.getElementById("divVentanaComisionCobrador1").style.display="none"
	document.getElementById("divVentanaComisionCobrador2").style.display="none"

if(d=="1"){
	document.getElementById("btnHistorialComisionCobrador1").style="background-color:#ff9800;color:#fff"
	agrupacioncomisioncobrador="1";
	document.getElementById("divVentanaComisionCobrador1").style.display=""
}

if(d=="2"){
	document.getElementById("btnHistorialComisionCobrador2").style="background-color:#ff9800;color:#fff"
	agrupacioncomisioncobrador="2";

	document.getElementById("divVentanaComisionCobrador2").style.display=""
}
}

function buscar_meta_cobrador() {
	let fecha1 = document.getElementById('inptBuscarComisionCobradorF1').value;
	let fecha2 = document.getElementById('inptBuscarComisionCobradorF2').value;
	

	let cod_cobrador = document.getElementById('inptBuscarComisionCobrador1').value;
	
	document.getElementById('inptTotalMetaComisionCobrador').value = '';
	document.getElementById('inptPorcentajeComisionCobrador').value = '';
	
	if(fecha1 =='' || fecha2 == '' || cod_cobrador ==''){
		console.log('FALTA PARAMETROS')
		return;
	}
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,				
		"fecha1": fecha1,				
		"fecha2": fecha2,						
		"cod_cobrador": cod_cobrador,		
		"funt": "buscar_meta_cobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById('inptTotalMetaComisionCobrador').value = '';
	document.getElementById('inptPorcentajeComisionCobrador').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById('inptTotalMetaComisionCobrador').value = '';
			document.getElementById('inptPorcentajeComisionCobrador').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {			
					document.getElementById('inptTotalMetaComisionCobrador').value = datos[4];
	document.getElementById('inptPorcentajeComisionCobrador').value = datos[6];
	
	
	
let tableMasCobrador = document.getElementById('table_comision_mas_cobrador');
let tableCobrador = document.getElementById('table_comision_cobrador');

if (!listadoComisionCobrador && tableMasCobrador && tableMasCobrador.innerHTML !== '') {
    tableMasCobrador.innerHTML += datos[2];
} else if (!listadoComisionCobrador && tableCobrador) {
    tableCobrador.innerHTML += datos[2];
}
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


/*
FILTRO COBRADORES EN INFORME COMISION DE COBRADORES
*/
function verCerrarFiltroCobradorInfoCobradores(d){
	
	if(d=="1"){
		document.getElementById("divFiltroCobradorInfoCobradores").style.display ="";
	}else{
		$("div[id=divFiltroCobradorInfoCobradores]").fadeOut(500);
	}
}
let array_cod_filtro_cobrador_info_cobradores_lengt = 0;
var array_cod_filtro_cobrador_info_cobradores = [];
function buscar_opciones_filtro_cobrador_info_cobradores() {
	document.getElementById("divBuscadorFiltroCobradorInfoCobradores").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscar_opciones_filtro_cobrador_info_cobradores"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFiltroCobradorInfoCobradores").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFiltroCobradorInfoCobradores").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorFiltroCobradorInfoCobradores").innerHTML = datos_buscados
				array_cod_filtro_cobrador_info_cobradores = datos[4]
				array_cod_filtro_cobrador_info_cobradores_lengt = array_cod_filtro_cobrador_info_cobradores.length;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function obteneridfiltroCobradorInfoCobradores(datos){
	
	var id = datos.id;
	let index = array_cod_filtro_cobrador_info_cobradores.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_filtro_cobrador_info_cobradores.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_filtro_cobrador_info_cobradores.push(id);
    }
	
	if(array_cod_filtro_cobrador_info_cobradores_lengt == array_cod_filtro_cobrador_info_cobradores.length){
		document.getElementById('checkSeleccTodoFiltroInfoCobradores').checked = true;
	}else{
		document.getElementById('checkSeleccTodoFiltroInfoCobradores').checked = false;
	}
}

function checkSeleccTodoFiltroCobradorInfoCobradores(){
	if(document.getElementById('checkSeleccTodoFiltroCobradorInfoCobradores').checked == true){
		document.getElementById('checkSeleccTodoFiltroCobradorInfoCobradores').checked = false;
		marcarTodosFiltroCobradorInfoCobradores("1")
	}else{
		document.getElementById('checkSeleccTodoFiltroCobradorInfoCobradores').checked = true;
		marcarTodosFiltroCobradorInfoCobradores("")
	}
}

function marcarTodosFiltroCobradorInfoCobradores(d){
	let checks = document.querySelectorAll("input[name='check_filtro_cobrador_info_cobradores']");
	
	if(d=='1'){
		checks.forEach((checks, index) => {
		checks.checked = false;
		});
		array_cod_filtro_cobrador_info_cobradores = []
	}else{
		array_cod_filtro_cobrador_info_cobradores = []
		checks.forEach((checks, index) => {
		checks.checked = true;
		array_cod_filtro_cobrador_info_cobradores.push(checks.id);
		});
	}
}

/*
FILTRO LOCALES INFORME DE COBRADORES
*/
function verCerrarFiltroLocalInfoCobradores(d){
	
	if(d=="1"){
		document.getElementById("divFiltroLocalInfoCobradores").style.display ="";
	}else{
		$("div[id=divFiltroLocalInfoCobradores]").fadeOut(500);
	}
}
let array_cod_filtro_local_info_cobradores_lengt = 0;
var array_cod_filtro_local_info_cobradores = [];
function buscar_opciones_filtro_local_info_cobradores() {
	document.getElementById("divBuscadorFiltroLocalInfoCobradores").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscar_opciones_filtro_local_info_cobradores"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFiltroLocalInfoCobradores").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFiltroLocalInfoCobradores").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorFiltroLocalInfoCobradores").innerHTML = datos_buscados
				array_cod_filtro_local_info_cobradores = datos[4]
				array_cod_filtro_local_info_cobradores_lengt = array_cod_filtro_local_info_cobradores.length;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function obteneridfiltroLocalInfoCobradores(datos){
	
	var id = datos.id;
	let index = array_cod_filtro_local_info_cobradores.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_filtro_local_info_cobradores.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_filtro_local_info_cobradores.push(id);
    }
	
	if(array_cod_filtro_local_info_cobradores_lengt == array_cod_filtro_local_info_cobradores.length){
		document.getElementById('checkSeleccTodoFiltroInfoCobradores').checked = true;
	}else{
		document.getElementById('checkSeleccTodoFiltroInfoCobradores').checked = false;
	}
}

function checkSeleccTodoFiltroInfoCobradores(){
	if(document.getElementById('checkSeleccTodoFiltroInfoCobradores').checked == true){
		document.getElementById('checkSeleccTodoFiltroInfoCobradores').checked = false;
		marcarTodosFiltroLocalInfoCobradores("1")
	}else{1
		document.getElementById('checkSeleccTodoFiltroInfoCobradores').checked = true;
		marcarTodosFiltroLocalInfoCobradores("")
	}
}

function marcarTodosFiltroLocalInfoCobradores(d){
	let checks = document.querySelectorAll("input[name='check_filtro_local_info_cobradores']");
	
	if(d=='1'){
		checks.forEach((checks, index) => {
		checks.checked = false;
		});
		array_cod_filtro_local_info_cobradores = []
	}else{
		array_cod_filtro_local_info_cobradores = []
		checks.forEach((checks, index) => {
		checks.checked = true;
		array_cod_filtro_local_info_cobradores.push(checks.id);
		});
	}
}

function ExcelInformeComisionCobradores() {

	$("#table_comision_cobrador_agrupado").table2excel({
       // exclude CSS class
       exclude: ".noExl",
       name: "cobradores_meta"
       }); 
	 
}
function ExcelInformeComisionCobradoresIndividual() {

	$("#table_comision_cobrador").table2excel({
       // exclude CSS class
       exclude: ".noExl",
       name: "cobradores_meta"
       }); 
	 
}

/*
COMISION VENDEDOR
*/
function verCerrarInformeComisionVendedor(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divComisionvendedor").style.display==""){
		if(controldebusquedadComisionVendedor==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoComisionVendedor").style.display="none"
		limpiarcamposbuscadorcomisionvendedor()
 
	$("div[id=divComisionvendedor]").fadeOut(500);	
		
	}else{		
	if(controlacceso("VERINFORMEDECOMISIONVENDEDOR","accion")==false){return;}
	mostrarSoloUno("divComisionvendedor")	
		document.getElementById("divComisionvendedor").style.display=""
		  
	}
}
function minimizarInformeComisionVendedor(){
 
	$("div[id=divComisionvendedor]").fadeOut(500);	
	document.getElementById("divMinimizadoComisionVendedor").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuComisionVendedor"));
}
function limpiarcamposbuscadorcomisionvendedor(){
	if(controldebusquedadComisionVendedor==true){

	return
}
	document.getElementById('inptBuscarComisionVendedorF1').value=""
	document.getElementById('inptBuscarComisionVendedorF2').value=""
	document.getElementById('inptBuscarComisionVendedor1').value=""
	 document.getElementById('inptBuscarComisionVendedor2').value=""
	 document.getElementById('inptBuscarComisionVendedor2').value=""
	 document.getElementById("table_comision_vendedor").innerHTML = ""
	 document.getElementById("table_comision_vendedor_agrupado").innerHTML = ""
    document.getElementById("inptTotalRecaudadoComisionVendedor").value = ""
		document.getElementById("inptTotalVentaComisionVendedor").value = ""
	document.getElementById("inptTotalRegistoComisionVendedor").value = ""
	document.getElementById("tbProcessComisionVendedor").style.display = "none"
	cambiarBusquedaAgrupadoComisionVendedor(1)
}
function checkHistorialComisionVendedor(d){	
	if(d=="1"){
		document.getElementById('checkHistorialComisionVendedor1').checked=true
		document.getElementById('checkHistorialComisionVendedor2').checked=false
		document.getElementById('inptBuscarComisionVendedorF1').value = "";
	    document.getElementById('inptBuscarComisionVendedorF2').value = "";	
	}else{		
		document.getElementById('checkHistorialComisionVendedor1').checked=false
		document.getElementById('checkHistorialComisionVendedor2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarComisionVendedorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarComisionVendedorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
var codvendedorComision = "";
var registrocargadocomisionvendedor="";
var totalregistrocomisionvendedor="";
var controldebusquedadComisionVendedor=false
function cancelarComisionVendedor(){
	controldebusquedadComisionVendedor=false
	document.getElementById("divProgressComisionVendedor").style.backgroundColor='#ff5722'
}
var agrupacioncomisionvendedor="1";
function cambiarBusquedaAgrupadoComisionVendedor(d){
	if(controldebusquedadComisionVendedor==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
document.getElementById("btnHistorialComisionVendedor1").style=""
document.getElementById("btnHistorialComisionVendedor2").style=""

document.getElementById("divVentanaComisionVendedor1").style.display="none"
	document.getElementById("divVentanaComisionVendedor2").style.display="none"

if(d=="1"){
	document.getElementById("btnHistorialComisionVendedor1").style="background-color:#ff9800;color:#fff"
	agrupacioncomisionvendedor="1";
	document.getElementById("divVentanaComisionVendedor1").style.display=""
}

if(d=="2"){
	document.getElementById("btnHistorialComisionVendedor2").style="background-color:#ff9800;color:#fff"
	agrupacioncomisionvendedor="2";

	document.getElementById("divVentanaComisionVendedor2").style.display=""
}
}

function buscarcomisionvendedor() {
	if(agrupacioncomisionvendedor=="2"){
		buscarcomisionvendedoragrupado()
		return;
	}
if(controlacceso("VERINFORMEDECOMISIONVENDEDOR","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarComisionVendedorF1').value
	var fecha2 = document.getElementById('inptBuscarComisionVendedorF2').value
	var vendedor = document.getElementById('inptBuscarComisionVendedor1').value
	var fechafiltro = document.getElementById('inptBuscarComisionVendedor2').value
	var producto = document.getElementById('inptBuscarComisionVendedor3').value
	var cliente = document.getElementById('inptBuscarComisionVendedorCliente').value
	var tipo_venta = document.getElementById('inptBuscarComisionVendedor4').value
	
	
	if(document.getElementById('checkHistorialComisionVendedor2').checked==true){
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
	if(controldebusquedadComisionVendedor==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
	var Descuento="";
	var Flete="";
	if(document.getElementById('checkVendedorDescuento').checked==true){
		Descuento ="SI";
	}
	if(document.getElementById('checkVendedorFlete').checked==true){
		Flete ="SI";
	}
	
	var Local = document.getElementById('inptBuscarHistorialLocal').value
	
	controldebusquedadComisionVendedor=true
	document.getElementById("table_comision_vendedor").innerHTML = paginacargando
	document.getElementById("tbProcessComisionVendedor").style.display = "none"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"vendedor": vendedor,
		"producto": producto,
		"fechafiltro": fechafiltro,
		"Descuento": Descuento,
		"Flete": Flete,
		"cliente": cliente,	
		"Local": Local,			
		"tipo_venta": tipo_venta,					
		"funt": "comisionvendedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_vendedor").innerHTML = ''
			controldebusquedadComisionVendedor=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_vendedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_comision_vendedor").innerHTML = datos_buscados
					document.getElementById("inptTotalRecaudadoComisionVendedor").value = datos[3];
					document.getElementById("inptTotalVentaComisionVendedor").value = datos[4];
					document.getElementById("inptTotalRegistoComisionVendedor").value = datos[5];
					document.getElementById("inptTotalDescuentoComisionVendedor").value = datos[101];
						registrocargadocomisionvendedor=datos[99];
					totalregistrocomisionvendedor=datos[100];
						 if(totalregistrocomisionvendedor>registrocargadocomisionvendedor){
						 	var porce=((registrocargadocomisionvendedor*100)/totalregistrocomisionvendedor).toFixed(0)
	document.getElementById("divProgressComisionVendedor").style.width=porce+"%"
						 document.getElementById("table_comision_vendedor").innerHTML += "<div id='table_comision_mas_vendedor'></div>"
						  buscarmascomisionvendedor();
					 }else{
						 controldebusquedadComisionVendedor=false
					buscar_meta_vendedor()
					 }
					
				}
			} catch (error) {
				controldebusquedadComisionVendedor=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function buscarmascomisionvendedor(c) {
if(controlacceso("VERINFORMEDECOMISIONVENDEDOR","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarComisionVendedorF1').value
	var fecha2 = document.getElementById('inptBuscarComisionVendedorF2').value
	var vendedor = document.getElementById('inptBuscarComisionVendedor1').value
	var fechafiltro = document.getElementById('inptBuscarComisionVendedor2').value
	var producto = document.getElementById('inptBuscarComisionVendedor3').value
	var cliente = document.getElementById('inptBuscarComisionVendedorCliente').value
	var tipo_venta = document.getElementById('inptBuscarComisionVendedor4').value
	if(document.getElementById('checkHistorialComisionVendedor2').checked==true){
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
	if(c=="1"){
		controldebusquedadComisionVendedor=true
	}
	if(controldebusquedadComisionVendedor==false){
		
	return
}


var Descuento="";
	var Flete="";
	if(document.getElementById('checkVendedorDescuento').checked==true){
		Descuento ="SI";
	}
	if(document.getElementById('checkVendedorFlete').checked==true){
		Flete ="SI";
	}
	var Local = document.getElementById('inptBuscarHistorialLocal').value
	controldebusquedadComisionVendedor=true
	document.getElementById("table_comision_mas_vendedor").innerHTML = paginacargando
	document.getElementById("tbProcessComisionVendedor").style.display = ""
	
	var totalDescuento = document.getElementById("inptTotalDescuentoComisionVendedor").value;
	totalDescuento =QuitarSeparadorMilValor(totalDescuento);
	var totalventa=document.getElementById("inptTotalVentaComisionVendedor").value;
	var totalcomision=document.getElementById("inptTotalRecaudadoComisionVendedor").value;
	var registroscargados=document.getElementById("inptTotalRegistoComisionVendedor").value;
	document.getElementById("divProgressComisionVendedor").style.backgroundColor=''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"vendedor": vendedor,
		"fechafiltro": fechafiltro,
		"registrocargado": registrocargadocomisionvendedor,
		"totalcomision": totalcomision,
		"totalventa": totalventa,
		"producto": producto,
		"registroscargados": registroscargados,
		"Descuento": Descuento,
		"Flete": Flete,
		"cliente": cliente,		
		"Local": Local,	
		"tipo_venta": tipo_venta,	
		"totalDescuento": totalDescuento,	
		"funt": "mascomisionvendedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_mas_vendedor").innerHTML = ''
			document.getElementById("divProgressComisionVendedor").style.backgroundColor='#ff5722'
			controldebusquedadComisionVendedor=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_mas_vendedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_comision_mas_vendedor").innerHTML = datos_buscados
					document.getElementById("inptTotalRecaudadoComisionVendedor").value = datos[3];
					document.getElementById("inptTotalVentaComisionVendedor").value = datos[4];
					document.getElementById("inptTotalRegistoComisionVendedor").value = datos[5];
					document.getElementById("inptTotalDescuentoComisionVendedor").value = datos[101];
						registrocargadocomisionvendedor=datos[99];
						 if(totalregistrocomisionvendedor>registrocargadocomisionvendedor){
						 	var porce=((registrocargadocomisionvendedor*100)/totalregistrocomisionvendedor).toFixed(0)
	document.getElementById("divProgressComisionVendedor").style.width=porce+"%"
						 document.getElementById("table_comision_mas_vendedor").innerHTML += "<div id='table_comision_mas_vendedor'></div>"
						 document.getElementById("table_comision_mas_vendedor").id=""
						 buscarmascomisionvendedor();
					 }else{
						 document.getElementById("tbProcessComisionVendedor").style.display = "none"
						 controldebusquedadComisionVendedor=false
						 buscar_meta_vendedor()
					 }
					
				}
			} catch (error) {
				document.getElementById("divProgressComisionVendedor").style.backgroundColor='#ff5722'
				controldebusquedadComisionVendedor=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function buscarcomisionvendedoragrupado() {
	let fecha1 = document.getElementById('inptBuscarComisionVendedorF1').value;
	let fecha2 = document.getElementById('inptBuscarComisionVendedorF2').value;
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	
	
	let condicion = document.getElementById('inptBuscarComisionVendedorAgrupado1').value;
	// let sector = document.getElementById('inptBuscarComisionVendedorAgrupado2').value;
	// let cod_local = document.getElementById('inptBuscarComisionVendedorAgrupado3').value;
	// let cod_vendedor = document.getElementById('inptBuscarComisionVendedorAgrupado4').value;
	
	document.getElementById('inptTotalVentaComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalMetaComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalPuntajeComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalPorcentajeComisionVendedorAgrupado').value = '';
	
	
	document.getElementById("table_comision_vendedor_agrupado").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,				
		"fecha1": fecha1,				
		"fecha2": fecha2,				
		"condicion": condicion,					
		// "cod_local": cod_local,				
		// "cod_vendedor": cod_vendedor,	
		"array_cod_filtro_local_info_vendedores": JSON.stringify(array_cod_filtro_local_info_vendedores),		
		"array_cod_filtro_seccion_info_vendedores": JSON.stringify(array_cod_filtro_seccion_info_vendedores),		
		"array_cod_filtro_vendedor_info_vendedores": JSON.stringify(array_cod_filtro_vendedor_info_vendedores),		
		"funt": "comisionvendedoragrupado"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_vendedor_agrupado").innerHTML = ''
			
			document.getElementById('inptTotalVentaComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalMetaComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalPuntajeComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalPorcentajeComisionVendedorAgrupado').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_vendedor_agrupado").innerHTML = ''
			
			document.getElementById('inptTotalVentaComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalMetaComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalPuntajeComisionVendedorAgrupado').value = '';
	document.getElementById('inptTotalPorcentajeComisionVendedorAgrupado').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_comision_vendedor_agrupado").innerHTML = datos_buscados
					
					document.getElementById('inptTotalVentaComisionVendedorAgrupado').value = datos[3];
	document.getElementById('inptTotalMetaComisionVendedorAgrupado').value = datos[4];
	document.getElementById('inptTotalPuntajeComisionVendedorAgrupado').value = datos[5];
	document.getElementById('inptTotalPorcentajeComisionVendedorAgrupado').value = datos[6];
					ordenarPorcentajeBuscarAgrupacionInfoVendedores();
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


function buscar_meta_vendedor() {
	let fecha1 = document.getElementById('inptBuscarComisionVendedorF1').value;
	let fecha2 = document.getElementById('inptBuscarComisionVendedorF2').value;
	
	let condicion = document.getElementById('inptBuscarComisionVendedor4').value;
	let cod_vendedor = document.getElementById('inptBuscarComisionVendedor1').value;
	
	document.getElementById('inptTotalMetaComisionVendedor').value = '';
	document.getElementById('inptPorcentajeComisionVendedor').value = '';
	
	if(fecha1 =='' || fecha2 == '' || cod_vendedor ==''){
		console.log('FALTA PARAMETROS')
		return;
	}
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,				
		"fecha1": fecha1,				
		"fecha2": fecha2,				
		"condicion": condicion,					
		"cod_vendedor": cod_vendedor,		
		"funt": "buscar_meta_vendedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById('inptTotalMetaComisionVendedor').value = '';
	document.getElementById('inptPorcentajeComisionVendedor').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById('inptTotalMetaComisionVendedor').value = '';
			document.getElementById('inptPorcentajeComisionVendedor').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {			
					document.getElementById('inptTotalMetaComisionVendedor').value = datos[4];
	document.getElementById('inptPorcentajeComisionVendedor').value = datos[6];
	
	let tableMasVendedor = document.getElementById('table_comision_mas_vendedor');
let tableVendedor = document.getElementById('table_comision_vendedor');

if (tableMasVendedor && tableMasVendedor.innerHTML !== '') {
    tableMasVendedor.innerHTML += datos[2];
} else if (tableVendedor) {
    tableVendedor.innerHTML += datos[2];
}
	
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


function ordenarPorcentajeBuscarAgrupacionInfoVendedores() {
  const contenedor = document.getElementById("table_comision_vendedor_agrupado");

  // Obtener todas las tablas visibles (sin display:none)
  const tablasVisibles = Array.from(contenedor.querySelectorAll("table"))
    .filter(t => t.style.display !== "none");

  // Obtener las tablas ocultas (para mantenerlas intactas)
  const tablasOcultas = Array.from(contenedor.querySelectorAll("table"))
    .filter(t => t.style.display === "none");

  // Convertir las visibles en objetos con el porcentaje numérico
  const datos = tablasVisibles.map(tabla => {
    const celdas = tabla.querySelectorAll("td");
    const textoPorcentaje = celdas[celdas.length - 1].innerText.trim();
    const porcentaje = parseFloat(textoPorcentaje.replace("%", "")) || 0;
    return { tabla, porcentaje };
  });

  // Ordenar de mayor a menor porcentaje
  datos.sort((a, b) => b.porcentaje - a.porcentaje);

  // Limpiar el contenedor
  contenedor.innerHTML = "";

  // Volver a insertar las tablas:
  // 1️⃣ la primera oculta (encabezado)
  if (tablasOcultas.length > 0) contenedor.appendChild(tablasOcultas[0]);

  // 2️⃣ todas las tablas ordenadas
  datos.forEach(d => contenedor.appendChild(d.tabla));

  // 3️⃣ la última oculta (totales)
  if (tablasOcultas.length > 1) contenedor.appendChild(tablasOcultas[1]);
}

function ExcelInformeVentaVendedores() {

	$("#table_comision_vendedor_agrupado").table2excel({
       // exclude CSS class
       exclude: ".noExl",
       name: "vendedores_meta"
       }); 
	 
}
function ExcelInformeVentaVendedoresIndividual() {

	$("#table_comision_vendedor").table2excel({
       // exclude CSS class
       exclude: ".noExl",
       name: "vendedores_meta"
       }); 
	 
}

/*
PAGOS ELIMINADOS
*/
function verCerrarInformePagosEliminados(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divPagosEliminados").style.display==""){
		document.getElementById("divMinimizadoInformePagosEliminados").style.display="none"
		limpiarcamposbuscadorInformePagosEliminados()
 
	$("div[id=divPagosEliminados]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMEDEPAGOSELIMINADOS","accion")==false){return;}	
mostrarSoloUno("divPagosEliminados")	
		document.getElementById("divPagosEliminados").style.display=""
		  
	}
}
function minimizarInformePagosEliminados(){ 
	$("div[id=divPagosEliminados]").fadeOut(500);	
	document.getElementById("divMinimizadoInformePagosEliminados").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuPagosEliminados"));
}
function limpiarcamposbuscadorInformePagosEliminados(){
	document.getElementById('inptBuscarComisionPagosEliminadosF1').value=""
	document.getElementById('inptBuscarComisionPagosEliminadosF2').value=""
	 document.getElementById("table_pagos_eliminados_historial").innerHTML = ""
	if (listadoPagosEliminados) listadoPagosEliminados.establecerRegistros([])
    document.getElementById("inptTotalRegistoPagosEliminados").value = ""
}
function checkHistorialPagosEliminados(d){	
	if(d=="1"){
		document.getElementById('checkHistorialPagosEliminados1').checked=true
		document.getElementById('checkHistorialPagosEliminados2').checked=false
		document.getElementById('inptBuscarComisionPagosEliminadosF1').value = "";
	    document.getElementById('inptBuscarComisionPagosEliminadosF2').value = "";	
	}else{		
		document.getElementById('checkHistorialPagosEliminados1').checked=false
		document.getElementById('checkHistorialPagosEliminados2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarComisionPagosEliminadosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarComisionPagosEliminadosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarpagoeliminados() {
if(controlacceso("VERINFORMEDEPAGOSELIMINADOS","accion")==false){return;}	
	var listado = iniciarListadoPagosEliminados()
	var fecha1 = document.getElementById('inptBuscarComisionPagosEliminadosF1').value
	var fecha2 = document.getElementById('inptBuscarComisionPagosEliminadosF2').value
	
	var cliente = document.getElementById('inptBuscarPagosEliminados1').value;
	var ci = document.getElementById('inptBuscarPagosEliminados2').value;
	var motivo = document.getElementById('inptBuscarPagosEliminados3').value;
	var fecha = document.getElementById('inptBuscarPagosEliminados4').value;

	if(document.getElementById('checkHistorialPagosEliminados2').checked==true){
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
	
	
	
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_pagos_eliminados_historial").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoPagosEliminados").value =""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cliente": cliente,
		"ci": ci,
		"motivo": motivo,
		"fecha": fecha,
		"formato": listado ? "json" : "html",
		"funt": "buscarpagoseliminados"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_pagos_eliminados_historial").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_pagos_eliminados_historial").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_pagos_eliminados_historial").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoPagosEliminados").value = datos[3];
					
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

/*
INFORME DEPOSITO
*/
var idinformedepositolistado = '';
function verCerrarInformeDeposito(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeDeposito").style.display==""){
		document.getElementById("divMinimizadoInformeDeposito").style.display="none"
		limpiarcamposbuscadorInformeDeposito()
 
	$("div[id=divInformeDeposito]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMEDEPOSITO","accion")==false){return;}	
mostrarSoloUno("divInformeDeposito")	
		document.getElementById("divInformeDeposito").style.display=""
		  
	}
}
function minimizarInformeDeposito(){ 
	$("div[id=divInformeDeposito]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeDeposito").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuInformeDeposito"));
}
function limpiarcamposbuscadorInformeDeposito(){
	document.getElementById('inptBuscarInformeDepositoF1').value=""
	document.getElementById('inptBuscarInformeDepositoF2').value=""
	 document.getElementById("table_informe_deposito_listado").innerHTML = ""
	 document.getElementById("table_informe_deposito_productos").innerHTML = ""
    document.getElementById("inptTotalRegistoInformeDepositoProductos").value = ""
    document.getElementById("inptTotalRegistoInformeDepositoListado").value = ""
    document.getElementById("inptBuscarInformeDeposito1").value = ""
    document.getElementById("inptBuscarInformeDeposito2").value = ""
    document.getElementById("inptBuscarInformeDeposito3").value = ""
	idinformedepositolistado ='';
	if (listadoInformeDepositoListado) listadoInformeDepositoListado.establecerRegistros([]);
	if (listadoInformeDepositoProductos) listadoInformeDepositoProductos.establecerRegistros([]);
}
function checkHistorialInformeDeposito(d){	
	if(d=="1"){
		document.getElementById('checkHistorialInformeDeposito1').checked=true
		document.getElementById('checkHistorialInformeDeposito2').checked=false
		document.getElementById('inptBuscarInformeDepositoF1').value = "";
	    document.getElementById('inptBuscarInformeDepositoF2').value = "";	
	}else{		
		document.getElementById('checkHistorialInformeDeposito1').checked=false
		document.getElementById('checkHistorialInformeDeposito2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeDepositoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeDepositoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarinformedepositolistado(){
	var listado = iniciarListadoInformeDepositoListado();
	var fecha1 = document.getElementById('inptBuscarInformeDepositoF1').value
	var fecha2 = document.getElementById('inptBuscarInformeDepositoF2').value
	var cod_localFK = document.getElementById('inptBuscarInformeDeposito3').value;

	if(document.getElementById('checkHistorialInformeDeposito2').checked==true){
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
	
	document.getElementById("table_informe_deposito_listado").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeDepositoListado").value =""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cod_localFK": cod_localFK,
		"formato": listado ? "json" : "",
		"funt": "buscarinformedepositolistado"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_deposito_listado").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_informe_deposito_listado").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("table_informe_deposito_listado").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					document.getElementById("inptTotalRegistoInformeDepositoListado").value = datos[3];
					
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function buscarinformedepositoproductos(){
	var listado = iniciarListadoInformeDepositoProductos();

	var estado = document.getElementById('inptBuscarInformeDeposito1').value
	var diferencia = document.getElementById('inptBuscarInformeDeposito2').value
	var local = document.getElementById('inptBuscarInformeDeposito3').value
	var fecha1 = document.getElementById('inptBuscarInformeDepositoF1').value
	var fecha2 = document.getElementById('inptBuscarInformeDepositoF2').value

	if(document.getElementById('checkHistorialInformeDeposito2').checked==true){
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
	
	
	document.getElementById("table_informe_deposito_productos").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeDepositoProductos").value =""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"estado": estado,
		"diferencia": diferencia,
		"local": local,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"idinformedepositolistado": idinformedepositolistado,
		"formato": listado ? "json" : "",
		"funt": "buscarinformedepositoproductos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_deposito_productos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_informe_deposito_productos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("table_informe_deposito_productos").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					document.getElementById("inptTotalRegistoInformeDepositoProductos").value = datos[3];
					
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function verCerrarVentanasInformeDeposito(d){
		if(idinformedepositolistado == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA REGISTRO")
		return;
	}
	document.getElementById("btnInformeDeposito1").style=''
	document.getElementById("btnInformeDeposito2").style=''
	document.getElementById("divVentanaInformeDeposito1").style.display='none'
	document.getElementById("divVentanaInformeDeposito2").style.display='none'
	document.getElementById("inptTotalRegistoInformeDepositoProductos").style.display='none'
	document.getElementById("inptTotalRegistoInformeDepositoListado").style.display='none'
	document.getElementById("btnbuscarinformedepositolistados").style.display='none'
	document.getElementById("btnbuscarinformedepositoproductos").style.display='none'

	if(d=="1"){
		document.getElementById("btnInformeDeposito1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeDeposito1").style.display=''
		document.getElementById("inptTotalRegistoInformeDepositoListado").style.display=''
		document.getElementById("btnbuscarinformedepositolistados").style.display=''
	}
	if(d=="2"){
		 document.getElementById("btnInformeDeposito2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeDeposito2").style.display=''
		document.getElementById("inptTotalRegistoInformeDepositoProductos").style.display=''
		document.getElementById("btnbuscarinformedepositoproductos").style.display=''
	}
}
function obtenerdatosinformedeposito(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idinformedepositolistado = $(datostr).children('td[id="td_id"]').html();
	buscarinformedepositoproductos()
}

/* CARGAR DOCUMENTO PDF INFORME DEPOSITO */
function verCerrarVentanaCargaPDFInformeDeposito(d){
	if(idinformedepositolistado == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UNA LISTA');
		return;
	}
	if(d == '1'){
		document.getElementById("divCargaPDFInformeDeposito").style.display=""
		buscarpdfinformedeposito()
	}else{
		document.getElementById("divCargaPDFInformeDeposito").style.display="none"
	}
}

// CARGAR PDF INFORME CONTROL DEPOSITO
function ExploradorPDFInformeControlDeposito(File){	
$("input[id="+File+"]").click();
}
function readFilePDFInformeControlDeposito(input){
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension.toLowerCase()=="pdf")){
}else{
ver_vetana_informativa("DEBE SER UN ARCHIVO PDF")
return false;
}
var readerPrincipal = new FileReader();
readerPrincipal.onload = function(e){
	extinformedeposito = file_extension;
	pdfinformedeposito = e.target.result;
	
document.getElementById('inptDescripcionCargaPDFInformeDeposito').placeholder = 'Documento Listo';

}
readerPrincipal.readAsDataURL(input.files[0]);
}

function buscarpdfinformedeposito(){
	var listado = iniciarListadoDocumentosInformeDeposito();
document.getElementById("buscador_documentos_pdf_informe_deposito").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idinformedepositolistado": idinformedepositolistado,
		"formato": listado ? "json" : "",
		"funt": "buscar_documentos_informe_deposito"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("buscador_documentos_pdf_informe_deposito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("buscador_documentos_pdf_informe_deposito").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("buscador_documentos_pdf_informe_deposito").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function limpiarVentanaCargaPDFInformeDeposito(){
	document.getElementById('inptDescripcionCargaPDFInformeDeposito').value = '';
	
	pdfinformedeposito="";
	extinformedeposito="";
	
}




function verificarcamposCargaPDFInformeDeposito(){
	if(extinformedeposito ==''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN ARCHIVO');
		return;
	}
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "nuevo_archivo_control_deposito",
		"idinformedepositolistado": idinformedepositolistado,
		"ext": extinformedeposito,
		"pdf": pdfinformedeposito,
		
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
	   
					buscarpdfinformedeposito()
					ver_vetana_informativa('SE HA CARGADO CORRECTAMENTE');
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
	
}

/*
EGRESO/INGRESO COBRADORES
*/
function verCerrarInformeEgresoIngresoCobradores(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeEgresoIngresoCobradores").style.display==""){
		document.getElementById("divMinimizadoInformeEgresoIngresoCobradores").style.display="none"
		limpiarcamposbuscadorInformeEgresoIngresoCobradores()
 
	$("div[id=divInformeEgresoIngresoCobradores]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMEDEEGRESOINGRESOCOBRADORES","accion")==false){return;}	
mostrarSoloUno("divInformeEgresoIngresoCobradores")	
		document.getElementById("divInformeEgresoIngresoCobradores").style.display=""
		  
	}
}
function minimizarInformeEgresoIngresoCobradores(){ 
	$("div[id=divInformeEgresoIngresoCobradores]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeEgresoIngresoCobradores").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuInformeEgresoIngresoCobradores"));
}
function limpiarcamposbuscadorInformeEgresoIngresoCobradores(){
	document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF1').value=""
	document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF2').value=""
	 document.getElementById("table_informe_egreso_ingreso_cobradores").innerHTML = ""
	if (listadoEgresoIngresoCobrador) listadoEgresoIngresoCobrador.establecerRegistros([])
    document.getElementById("inptTotalRegistoInformeEgresoIngresoCobradores").value = ""
}
function checkHistorialInformeEgresoIngresoCobradores(d){	
	if(d=="1"){
		document.getElementById('checkHistorialInformeEgresoIngresoCobradores1').checked=true
		document.getElementById('checkHistorialInformeEgresoIngresoCobradores2').checked=false
		document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF1').value = "";
	    document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF2').value = "";	
	}else{		
		document.getElementById('checkHistorialInformeEgresoIngresoCobradores1').checked=false
		document.getElementById('checkHistorialInformeEgresoIngresoCobradores2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}




function buscarInformeEgresoIngresoCobradores(){
if(controlacceso("VERINFORMEDEEGRESOINGRESOCOBRADORES","accion")==false){return;}	
	var listado = iniciarListadoEgresoIngresoCobrador()
	var fecha1 = document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF1').value
	var fecha2 = document.getElementById('inptBuscarInformeEgresoIngresoCobradoresF2').value
	var confirmado = document.getElementById('inptConfirmadoEgresoIngresoCobradores').value
	if(document.getElementById('checkHistorialInformeEgresoIngresoCobradores2').checked==true){
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
	
	var tipo = document.getElementById('inptSeleccTipoBuscarEgresoIngresoCobradores').value
	var arreglo = document.getElementById('inptSeleccArregloBuscarEgresoIngresoCobradores').value
	var fecha = document.getElementById('inptBuscarEgresoIngresoCobradores2').value
	var usuario = document.getElementById('inptBuscarEgresoIngresoCobradores1').value
	var motivo = document.getElementById('inptBuscarEgresoIngresoCobradores3').value
	var cod_localFK = document.getElementById('inptLocalBuscarEgresoIngresoCobradores').value
	
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_informe_egreso_ingreso_cobradores").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeEgresoIngresoCobradores").value =""
	document.getElementById("inptTotalEgresoInformeEgresoIngresoCobradores").value =""
	document.getElementById("inptTotalIngresoInformeEgresoIngresoCobradores").value =""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"tipo": tipo,
		"usuario": usuario,
		"fecha": fecha,
		"arreglo": arreglo,
		"motivo": motivo,
		"cod_localFK": cod_localFK,
		"confirmado": confirmado,
		"agrupacionformulariogastoscobrador": agrupacionformulariogastoscobrador,
		"formato": listado ? "json" : "html",
		"funt": "buscarinformeegresoingresocobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_informe_egreso_ingreso_cobradores").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_informe_egreso_ingreso_cobradores").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_informe_egreso_ingreso_cobradores").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoInformeEgresoIngresoCobradores").value = datos[3];
					document.getElementById("inptTotalEgresoInformeEgresoIngresoCobradores").value = datos[4];
					document.getElementById("inptTotalIngresoInformeEgresoIngresoCobradores").value = datos[5];
					limpiarcamposEditarEgresoIngresoCobrador()
					document.getElementById('btnEditarDatosEgresoIngresoCobrador').style.backgroundColor='#b7b7b7';
					document.getElementById('btnConfirmarGastoEgresoIngresoCobrador').style.backgroundColor='#b7b7b7';
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}



var idEgresoIngresoCobrador = "";
function obtenerdatosinformeegresoingresocobrador(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	
	idEgresoIngresoCobrador = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptMontoEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptMotivoEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptFechaEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptTipoEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptNroBoletaEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptBancoEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_9"]').html();
	document.getElementById('inptCuentaEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptArregloEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById('inptEstadoEgresoIngresoCobrador').value = $(datostr).children('td[id="td_datos_5"]').html();
	
	document.getElementById('btnEditarDatosEgresoIngresoCobrador').style.backgroundColor = ''
	document.getElementById('btnConfirmarGastoEgresoIngresoCobrador').style.backgroundColor = ''
	
}
function verCerrarVentanaEditarEgresoIngresoCobrador(d){
	if(controlacceso("EDITAREGRESOINGRESOCOBRADORES","accion")==false){return;}	
	
	if(d == "1"){
		if(idEgresoIngresoCobrador === ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN REGISTRO");
		return;
	}
		document.getElementById('divEditarEgresoIngresoCobrador').style.display = ''
	}else{
		document.getElementById('divEditarEgresoIngresoCobrador').style.display = 'none'
	}
}
function verificarcamposEgresoIngresoCobrador() {
	var inptMotivoEgresoIngresoCobrador= document.getElementById('inptMotivoEgresoIngresoCobrador').value
	var inptMontoEgresoIngresoCobrador = document.getElementById('inptMontoEgresoIngresoCobrador').value
	var inptFechaEgresoIngresoCobrador = document.getElementById('inptFechaEgresoIngresoCobrador').value
	var inptEstadoEgresoIngresoCobrador = document.getElementById('inptEstadoEgresoIngresoCobrador').value
	var inptArregloEgresoIngresoCobrador = document.getElementById('inptArregloEgresoIngresoCobrador').value
	var inptTipoEgresoIngresoCobrador = document.getElementById('inptTipoEgresoIngresoCobrador').value
	var inptNroBoletaEgresoIngresoCobrador = document.getElementById('inptNroBoletaEgresoIngresoCobrador').value
	var inptBancoEgresoIngresoCobrador = document.getElementById('inptBancoEgresoIngresoCobrador').value
	var inptCuentaEgresoIngresoCobrador = document.getElementById('inptCuentaEgresoIngresoCobrador').value
	
if (inptArregloEgresoIngresoCobrador == "" && inptTipoEgresoIngresoCobrador=="EGRESO") {
		ver_vetana_informativa("FALTO SELECCIONAR UN ARREGLO")
		return false;
	}
	if (inptMontoEgresoIngresoCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DEL GASTO")
		return false;
	}
	if (inptMotivoEgresoIngresoCobrador == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL MOTIVO DEL GASTO")
		return false;
	}
	if (inptFechaEgresoIngresoCobrador == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DEL GASTO")
		return false;
	}
	var accion = "editar_egresoingreso_cobrador";
	
	if(controlacceso("EDITARLISTADOEGRESOINGRESO","accion")==false){return;}
		
	editar_ei_cobrador(inptMotivoEgresoIngresoCobrador,inptArregloEgresoIngresoCobrador,inptNroBoletaEgresoIngresoCobrador, inptBancoEgresoIngresoCobrador , inptCuentaEgresoIngresoCobrador ,inptMontoEgresoIngresoCobrador, inptFechaEgresoIngresoCobrador, inptEstadoEgresoIngresoCobrador, idEgresoIngresoCobrador, inptTipoEgresoIngresoCobrador, accion);
}
function editar_ei_cobrador(cod_motivo,Arreglo,nroboleta ,banco ,nrocuenta,monto, fecha, estado, idgastos, tipo, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idgastos_cobrador", idgastos)
	datos.append("monto", monto)
	datos.append("fecha", fecha)
	datos.append("estado", estado)
	datos.append("tipo", tipo)
	datos.append("nroboleta", nroboleta)
	datos.append("banco", banco)
	datos.append("Arreglo", Arreglo)
	datos.append("nrocuenta", nrocuenta)
	datos.append("cod_motivo", cod_motivo)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
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
					limpiarcamposEditarEgresoIngresoCobrador()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idEgresoIngresoCobrador = ""
					buscarInformeEgresoIngresoCobradores()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposEditarEgresoIngresoCobrador(){
	document.getElementById('inptMontoEgresoIngresoCobrador').value = ""
	document.getElementById('inptMotivoEgresoIngresoCobrador').value = ""
	document.getElementById('inptFechaEgresoIngresoCobrador').value = ""
	document.getElementById('inptNroBoletaEgresoIngresoCobrador').value = ""
	document.getElementById('inptBancoEgresoIngresoCobrador').value = ""
	document.getElementById('inptCuentaEgresoIngresoCobrador').value = ""
	document.getElementById('inptArregloEgresoIngresoCobrador').value = ""
	document.getElementById('inptTipoEgresoIngresoCobrador').value = "INGRESO"
	document.getElementById('inptEstadoEgresoIngresoCobrador').value = "Activo"
	idEgresoIngresoCobrador = ""
}
var agrupacionformulariogastoscobrador = "1"
function cambiarTipoGastoCobrador(d){
document.getElementById("btnGastoCobrador1").style=""
document.getElementById("btnGastoCobrador2").style=""
if(d=="1"){
	document.getElementById("btnGastoCobrador1").style="background-color:#ff9800;color:#fff"
	agrupacionformulariogastoscobrador="1";
}else{
	document.getElementById("btnGastoCobrador2").style="background-color:#ff9800;color:#fff"
	agrupacionformulariogastoscobrador="2";
}
}
function confirmarGastoEgresoIngresoCobrador() {
	if(controlacceso("CONFIRMAREGRESOINGRESOCOBRADORES","accion")==false){return;}
	if(idEgresoIngresoCobrador == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR EL GASTO A CONFIRMAR")
		return;
	}
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "confirmarEgresoIngresoCobrador")
	datos.append("idgastos", idEgresoIngresoCobrador)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
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
					idEgresoIngresoCobrador = ""
					buscarInformeEgresoIngresoCobradores()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

// VER OBSERVACION INGRESO EGRESO COBRADORES
function verCerrarVentanaObservacionCobradores(){
	if(document.getElementById("divVerObsIngresoEgresoCobradores").style.display==""){
	$("div[id=divVerObsIngresoEgresoCobradores]").fadeOut(500);	
document.getElementById('inptVerObservacionIngresoEgresoCobrador').value = ''	
	}else{	
		document.getElementById("divVerObsIngresoEgresoCobradores").style.display=""
	}
}

function verObservacionIngresoEgresoCobrador(obs,cod_VentaDetalleSolicitudAlulacion){
	verCerrarVentanaObservacionCobradores()
	document.getElementById('inptVerObservacionIngresoEgresoCobrador').value = obs;
	// buscarInformeDetalleventas_solicitud_anulacion(cod_VentaDetalleSolicitudAlulacion);
}



function buscarInformeDetalleventas_solicitud_anulacion(cod_VentaDetalleSolicitudAlulacion){ 
	
	document.getElementById("table_ventas_solicitud_anulacion").innerHTML = paginacargando
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_ventaFK": cod_VentaDetalleSolicitudAlulacion, 
		"funt": "buscarInformeDetalleventas_solicitud_anulacion"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_ventas_solicitud_anulacion").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_ventas_solicitud_anulacion").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_ventas_solicitud_anulacion").innerHTML = datos_buscados					 
				}
			} catch (error) {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
			}
	});
}

 

/*
COMPRAS ELIMINADOS
*/
function verCerrarInformeComprasEliminados(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divComprasEliminados").style.display==""){
		document.getElementById("divMinimizadoInformeComprasEliminados").style.display="none"
		limpiarcamposbuscadorInformePagosEliminados()
 
	$("div[id=divComprasEliminados]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMEDECOMPRASELIMINADO","accion")==false){return;}	
mostrarSoloUno("divComprasEliminados")	
		document.getElementById("divComprasEliminados").style.display=""
		  
	}
}
function minimizarInformeComprasEliminados(){
 
	$("div[id=divComprasEliminados]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeComprasEliminados").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuComprasEliminados"));
}
function limpiarcamposbuscadorInformePagosEliminados(){
	document.getElementById('inptBuscarComprasEliminadosF1').value=""
	document.getElementById('inptBuscarComprasEliminadosF2').value=""
	document.getElementById('inptBuscarComprasEliminados3').value=""
	 document.getElementById("table_compras_eliminados_historial").innerHTML = ""
	if (listadoComprasEliminadas) listadoComprasEliminadas.establecerRegistros([])
    document.getElementById("inptTotalRegistoComprasEliminados").value = ""
}
function checkHistorialComprasEliminados(d){	
	if(d=="1"){
		document.getElementById('checkHistorialComprasEliminados1').checked=true
		document.getElementById('checkHistorialComprasEliminados2').checked=false
		document.getElementById('inptBuscarComprasEliminadosF1').value = "";
	    document.getElementById('inptBuscarComprasEliminadosF2').value = "";	
	}else{		
		document.getElementById('checkHistorialComprasEliminados1').checked=false
		document.getElementById('checkHistorialComprasEliminados2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarComprasEliminadosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarComprasEliminadosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarcompraseliminados() {
if(controlacceso("VERINFORMEDECOMPRASELIMINADO","accion")==false){return;}	
	var listado = iniciarListadoComprasEliminadas()
	var fecha1 = document.getElementById('inptBuscarComprasEliminadosF1').value
	var fecha2 = document.getElementById('inptBuscarComprasEliminadosF2').value
	var nrocompra = document.getElementById('inptBuscarComprasEliminados3').value

	if(document.getElementById('checkHistorialComprasEliminados2').checked==true){
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
	
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_compras_eliminados_historial").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoComprasEliminados").value =""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"nrocompra": nrocompra,
		"formato": listado ? "json" : "html",
		"funt": "buscarcompraseliminados"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_compras_eliminados_historial").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (!listado) document.getElementById("table_compras_eliminados_historial").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_compras_eliminados_historial").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoComprasEliminados").value = datos[3];
					
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


/*VER HISTORIAL DEVOLUCIONES*/
function verCerrarInformeDevoluciones(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeDevoluciones").style.display==""){
		document.getElementById("divMinimizadoInformeCambios").style.display="none"
 
	$("div[id=divInformeDevoluciones]").fadeOut(500);	
		limpiarCamposBuscadorDevoluciones()
	}else{		
	if(controlacceso("VERINFORMECAMBIOS","accion")==false){return;}
		document.getElementById("divInformeDevoluciones").style.display=""
 
		
	}
}
function limpiarCamposBuscadorDevoluciones(){
	document.getElementById("inptBuscarDevolucionesF1").value=""
	document.getElementById("inptBuscarDevolucionesF2").value=""
	document.getElementById("inptBuscarDevoluciones1").value=""
	document.getElementById("inptBuscarDevoluciones2").value=""
	document.getElementById("inptTotalRegistroDevolucion").value=""
	document.getElementById("table_comision_devolucion").innerHTML=""
}
function minimizarventanaDevoluciones(){
	
	document.getElementById("divMinimizadoInformeCambios").style.display=""

 
	$("div[id=divInformeDevoluciones]").fadeOut(500);	
	
}
function checkHistorialDevoluciones(d){	
	if(d=="1"){
		document.getElementById('checkHistorialDevoluciones1').checked=true
		document.getElementById('checkHistorialDevoluciones2').checked=false
		document.getElementById('inptBuscarDevolucionesF1').value = "";
	    document.getElementById('inptBuscarDevolucionesF2').value = "";	
	}else{		
		document.getElementById('checkHistorialDevoluciones1').checked=false
		document.getElementById('checkHistorialDevoluciones2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarDevolucionesF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarDevolucionesF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarhistorialdevoluciones() {
	if(controlacceso("VERINFORMECAMBIOS","accion")==false){return;}
	var fecha1 = document.getElementById("inptBuscarDevolucionesF1").value
	var fecha2 = document.getElementById("inptBuscarDevolucionesF2").value
	var nrofactura = document.getElementById("inptBuscarDevoluciones1").value
	var fechafiltro = document.getElementById("inptBuscarDevoluciones2").value
	var cod_local = document.getElementById("inptlocalInformeDevoluciones").value
	if (document.getElementById('checkHistorialDevoluciones2').checked==true) {
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
			return false;
		}
		if (fecha2 == "") {
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
			return false;
		}
	}else{
	fecha1 = ""
	fecha2 = ""
	}

	document.getElementById("table_comision_devolucion").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"nrofactura": nrofactura,
		"fechafiltro": fechafiltro,
		"cod_local": cod_local,
		"funt": "buscarCambiosRealizados"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_devolucion").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_devolucion").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];

				if (Respuesta == "UI") {

					ir_a_login()
					ver_vetana_informativa("USUARIO INCORRECTO VUELVA A INICIAR SESION...")
					return false;



				}
				if (Respuesta == "NI") {
					ver_vetana_informativa("NO TIENES PERMISO PARA CONTINUA")
					return false;
                  }
				if (Respuesta == "exito") {



					var datos_buscados = datos[2];

					document.getElementById("table_comision_devolucion").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistroDevolucion").value = datos[3]




				}
			} catch (error) {

			}
		}
	});


}

/* SOLICITUD DESPACHO */
function verCerrarListadoSolicitudDespacho(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divListadoSolicitudDespacho").style.display==""){
	document.getElementById("divMinimizadoListadoSolicitudDespacho").style.display="none"
	limpiarcamposbuscarSolicitudDespacho()
	 
	$("div[id=divListadoSolicitudDespacho]").fadeOut(500);	
	}else{
	if(controlacceso("VERSOLICITUDDESPACHO","accion")==false){return;}
	mostrarSoloUno("divListadoSolicitudDespacho")	
	document.getElementById("divListadoSolicitudDespacho").style.display=""
    buscarlistadoSolicitudDespacho()
	}
}
function limpiarcamposbuscarSolicitudDespacho(){
	document.getElementById("table_buscar_SolicitudDespacho").innerHTML=""
	if (listadoSolicitudDespacho) listadoSolicitudDespacho.establecerRegistros([]);
}
function minimizarListadoSolicitudDespacho(){	 
	$("div[id=divListadoSolicitudDespacho]").fadeOut(500);	
	document.getElementById("divMinimizadoListadoSolicitudDespacho").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuListadoSoliicitudDespacho"));
}
function buscarlistadoSolicitudDespacho() {
	var listado = iniciarListadoSolicitudDespacho();
	document.getElementById("table_buscar_SolicitudDespacho").innerHTML = paginacargando
	document.getElementById('inptTotalRegistroSolicitudDespacho').value = ''
	
	idhistorialdespacho = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": listado ? "json" : "",
		"funt": "buscarListadoSolicitudDespacho"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_buscar_SolicitudDespacho").innerHTML = ''
			document.getElementById('inptTotalRegistroSolicitudDespacho').value = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_buscar_SolicitudDespacho").innerHTML = ''
			document.getElementById('inptTotalRegistroSolicitudDespacho').value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("table_buscar_SolicitudDespacho").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					document.getElementById('inptTotalRegistroSolicitudDespacho').value = datos[3]
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function buscarlistadoSolicitudDespachoTodosLocales() {
	var listado = iniciarListadoSolicitudDespacho();
	if(controlacceso("VERTODOSSOLICITUDESDESPACHO","accion")==false){return;}
	
	
	document.getElementById("table_buscar_SolicitudDespacho").innerHTML = paginacargando
	document.getElementById('inptTotalRegistroSolicitudDespacho').value = ''
	let local = document.getElementById('inptFiltroLocalSolicitudDespacho').value
	let local2 = document.getElementById('inptFiltroLocalSolicitudDespacho2').value
	let producto = document.getElementById('inptFiltroProductoSolicitudDespacho').value
	idhistorialdespacho = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"local": local,
		"local2": local2,
		"producto": producto,
		"formato": listado ? "json" : "",
		"funt": "buscarListadoSolicitudDespachoTodosLocales"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_buscar_SolicitudDespacho").innerHTML = ''
			document.getElementById('inptTotalRegistroSolicitudDespacho').value = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_buscar_SolicitudDespacho").innerHTML = ''
			document.getElementById('inptTotalRegistroSolicitudDespacho').value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("table_buscar_SolicitudDespacho").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					document.getElementById('inptTotalRegistroSolicitudDespacho').value = datos[3]
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


var controlAceptarDespacho=true;
function aceptarSolicitudDespacho() {
	if(controlacceso("ACEPTARSOLICITUDDESPACHO","accion")==false){return;}
	if(idhistorialdespacho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UNA SOLICITUD');
		return;
	}
	if(controlAceptarDespacho==false){
		ver_vetana_informativa('ACCION EN PROCESO FAVOR AGUARDE UN MOMENTO');
		return;
	}
	controlAceptarDespacho=false;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idhistorialdespacho": idhistorialdespacho,
		"funt": "aceptarSolicitudDespacho"
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
				controlAceptarDespacho=true				   
			   ver_vetana_informativa('SE HA CARGADO CORRECTAMENTE');
			   buscarlistadoSolicitudDespacho()
				}
			} catch (error) {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});
}



var controlRechazarDespacho=true;
function RechazarSolicitudDespacho() {
	if(controlacceso("ACEPTARSOLICITUDDESPACHO","accion")==false){return;}
	if(idhistorialdespacho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UNA SOLICITUD');
		return;
	}
	if(controlRechazarDespacho==false){
		ver_vetana_informativa('ACCION EN PROCESO FAVOR AGUARDE UN MOMENTO');
		return;
	}
	controlRechazarDespacho=false;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idhistorialdespacho": idhistorialdespacho,
		"funt": "RechazarSolicitudDespacho"
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
				controlRechazarDespacho=true				   
			   ver_vetana_informativa('SE HA RECHAZADO CORRECTAMENTE');
			   buscarlistadoSolicitudDespacho()
			   idhistorialdespacho = ''
				}
			} catch (error) {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});
}





var idhistorialdespacho = '';
function obtenerdatossolicituddespacho(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	idhistorialdespacho = $(datostr).children('td[id="td_id"]').html();
}



/*
INFORME DE EVALUACIÓN
*/
function verCerrarInformeDeEvaluacion(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeEvaluacion").style.display==""){
limpiarcamposinformeevaluacion()
		document.getElementById("divMinimizadoInformeEvaluacion").style.display="none"
 
	$("div[id=divInformeEvaluacion]").fadeOut(500);	
	}else{	
if(controlacceso("VERINFORMEEVALUACION","accion")==false){return;}	
mostrarSoloUno("divInformeEvaluacion")	
		document.getElementById("divInformeEvaluacion").style.display=""
 
		
	}
}
function minimizarinformeevaluacion(){
	//document.getElementById("divInformeEvaluacion").style.display = "none";
	 document.getElementById("divMinimizadoInformeEvaluacion").style.display = "";
 copiarBotonEnContenedor(document.getElementById("divMenuInformeEvaluacion"));
	$("div[id=divInformeEvaluacion]").fadeOut(500);	
}
function limpiarcamposinformeevaluacion(){
 document.getElementById("inptBuscarEvaluacionF1").value=""
 document.getElementById("inptBuscarEvaluacionF2").value=""
 document.getElementById("inptRegistroEvaluacionGastos").value=""
 document.getElementById("inptTotalEvaluacionGastos").value=""
 document.getElementById("table_evaluacion_gasto").innerHTML=""
 document.getElementById("inptRegistroEvaluacionPagos").value=""
 document.getElementById("inptTotalEvaluacionPagos").value=""
 document.getElementById("table_evaluacion_pagos").innerHTML=""
 document.getElementById("inptRegistroEvaluacionProductosVendidos").value=""
 document.getElementById("inptTotalEvaluacionProductosVendidos").value=""
 document.getElementById("table_evaluacion_producto_vendidos").innerHTML=""
 document.getElementById("inptRegistroEvaluacionProductoComprados").value=""
 document.getElementById("inptTotalEvaluacionProductosComprados").value=""
 document.getElementById("table_evaluacion_producto_comprados").innerHTML=""
 document.getElementById("inptRegistroEvaluacionPagosCompras").value=""
 document.getElementById("inptTotalEvaluacionPagosCompras").value=""
 document.getElementById("table_evaluacion_pagos_compras").innerHTML=""
	Object.keys(listadosEvaluacion).forEach(function (nombre) {
		if (listadosEvaluacion[nombre]) listadosEvaluacion[nombre].establecerRegistros([])
	})
}
function verCerrarVentanasEvaluacionInforme(d){
	document.getElementById("btnHistoriaEvaluacion1").style=''
	document.getElementById("btnHistoriaEvaluacion2").style=''
	document.getElementById("btnHistoriaEvaluacion4").style=''
	document.getElementById("btnHistoriaEvaluacion5").style=''
	document.getElementById("btnHistoriaEvaluacion6").style=''
	document.getElementById("divEvaluacionGastos").style.display='none'
	document.getElementById("divEvaluacionPagoCuota").style.display='none'
	document.getElementById("divEvualcionProductosComprados").style.display='none'
	document.getElementById("divEvualcionProductosVendidos").style.display='none'
	document.getElementById("divEvualcionPagosCompras").style.display='none'
	if(d=="1"){
		document.getElementById("btnHistoriaEvaluacion1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divEvaluacionGastos").style.display=''
	}
	if(d=="2"){		
		 	document.getElementById("btnHistoriaEvaluacion2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divEvaluacionPagoCuota").style.display=''
	}
		if(d=="3"){		
		document.getElementById("btnHistoriaEvaluacion3").style='background-color:#ff9800;color:#fff'
			document.getElementById("divEvaluacionEntrega").style.display=''			
		}
		if(d=="4"){	
		document.getElementById("btnHistoriaEvaluacion4").style='background-color:#ff9800;color:#fff'
			document.getElementById("divEvualcionProductosComprados").style.display=''			
		}
		if(d=="5"){	
		document.getElementById("btnHistoriaEvaluacion5").style='background-color:#ff9800;color:#fff'
			document.getElementById("divEvualcionProductosVendidos").style.display=''			
		}
		if(d=="6"){	
		document.getElementById("btnHistoriaEvaluacion6").style='background-color:#ff9800;color:#fff'
			document.getElementById("divEvualcionPagosCompras").style.display=''			
		}	
}
function buscarevaluacion(){
	buscarevaluacionGasto()
	buscarevaluacionPago()
	buscarevaluacionProductosvendidos()
	buscarevaluacionProductosComprados()
	buscarevaluacionPagosCompra()		
}
function buscarevaluacionGasto() {
	if(controlacceso("VERINFORMEEVALUACION","accion")==false){return;}	
	var listado = iniciarListadoEvaluacion("gasto")
	var fecha1 = document.getElementById("inptBuscarEvaluacionF1").value
	var fecha2 = document.getElementById("inptBuscarEvaluacionF2").value
	var local = document.getElementById("inptlocalInformeEvaluacion").value
	var tipo_arreglo = document.getElementById("inptTipoArregloInformeEvaluacion").value
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_gasto").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"tipo_arreglo": tipo_arreglo,
		"formato": listado ? "json" : "html",
		"funt": "evaluacionGasto"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_evaluacion_gasto").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				if (!listado) document.getElementById("table_evaluacion_gasto").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (listado && Array.isArray(pagina)) listado.establecerRegistros(pagina)
					else document.getElementById("table_evaluacion_gasto").innerHTML = typeof pagina === "string" ? pagina : ""
		document.getElementById("inptRegistroEvaluacionGastos").value = datos[3]
	document.getElementById("inptTotalEvaluacionGastos").value = datos[4]	
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarevaluacionPago() {
	if(controlacceso("VERINFORMEEVALUACION","accion")==false){return;}	
	var listado = iniciarListadoEvaluacion("pagos")
	var fecha1 = document.getElementById("inptBuscarEvaluacionF1").value
	var fecha2 = document.getElementById("inptBuscarEvaluacionF2").value
	var local = document.getElementById("inptlocalInformeEvaluacion").value
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_pagos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"formato": listado ? "json" : "html",
		"funt": "evaluacionpagosventa"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_pagos").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)				
	if (!listado) document.getElementById("table_evaluacion_pagos").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var pagina = datos[2];
					if (listado && Array.isArray(pagina)) listado.establecerRegistros(pagina)
					else document.getElementById("table_evaluacion_pagos").innerHTML = typeof pagina === "string" ? pagina : ""	
					document.getElementById("inptRegistroEvaluacionPagos").value = datos[3]
					document.getElementById("inptTotalEvaluacionPagos").value = datos[4]	
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarevaluacionProductosvendidos() {
	if(controlacceso("VERINFORMEEVALUACION","accion")==false){return;}	
	var listado = iniciarListadoEvaluacion("vendidos")
	var fecha1 = document.getElementById("inptBuscarEvaluacionF1").value
	var fecha2 = document.getElementById("inptBuscarEvaluacionF2").value
	var local = document.getElementById("inptlocalInformeEvaluacion").value
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_producto_vendidos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"formato": listado ? "json" : "html",
		"funt": "evaluacionproductodvendidos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")			
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_producto_vendidos").innerHTML = ""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)				
	if (!listado) document.getElementById("table_evaluacion_producto_vendidos").innerHTML = ""
	try {	
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
			Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (listado && Array.isArray(pagina)) listado.establecerRegistros(pagina)
					else document.getElementById("table_evaluacion_producto_vendidos").innerHTML = typeof pagina === "string" ? pagina : ""
	document.getElementById("inptRegistroEvaluacionProductosVendidos").value = datos[3]
	document.getElementById("inptTotalEvaluacionProductosVendidos").value = datos[4]
	
				}				
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarevaluacionProductosComprados() {
	if(controlacceso("VERINFORMEEVALUACION","accion")==false){return;}	
	var listado = iniciarListadoEvaluacion("comprados")
	var fecha1 = document.getElementById("inptBuscarEvaluacionF1").value
	var fecha2 = document.getElementById("inptBuscarEvaluacionF2").value
	var local = document.getElementById("inptlocalInformeEvaluacion").value
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_producto_comprados").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"formato": listado ? "json" : "html",
		"funt": "evaluacionproductodcomprados"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")		
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_producto_comprados").innerHTML = ""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)				
	if (!listado) document.getElementById("table_evaluacion_producto_comprados").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var pagina = datos[2];
				if (listado && Array.isArray(pagina)) listado.establecerRegistros(pagina)
				else document.getElementById("table_evaluacion_producto_comprados").innerHTML = typeof pagina === "string" ? pagina : ""		
	document.getElementById("inptRegistroEvaluacionProductoComprados").value = datos[3]
	document.getElementById("inptTotalEvaluacionProductosComprados").value = datos[4]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarevaluacionPagosCompra() {
	if(controlacceso("VERINFORMEEVALUACION","accion")==false){return;}	
	var listado = iniciarListadoEvaluacion("pagos_compras")
	var fecha1 = document.getElementById("inptBuscarEvaluacionF1").value
	var fecha2 = document.getElementById("inptBuscarEvaluacionF2").value
	var local = document.getElementById("inptlocalInformeEvaluacion").value
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_pagos_compras").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"formato": listado ? "json" : "html",
		"funt": "evaluacionpagoscomprados"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	if (listado) listado.establecerRegistros([])
	else document.getElementById("table_evaluacion_pagos_compras").innerHTML = ""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)			
	if (!listado) document.getElementById("table_evaluacion_pagos_compras").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   
					var paginaCompras = datos[2];
					if (listado && Array.isArray(paginaCompras)) listado.establecerRegistros(paginaCompras)
					else document.getElementById("table_evaluacion_pagos_compras").innerHTML = typeof paginaCompras === "string" ? paginaCompras : ""
					document.getElementById("inptRegistroEvaluacionPagosCompras").value = datos[3]
					document.getElementById("inptTotalEvaluacionPagosCompras").value = datos[4]	
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/*
INFORME DE DOCUMENTOS ENTREGADOS
*/
var listadoVentasDocumentosEntregados=null;
var listadoDetalleDocumentosEntregados=null;
var listadoVentasDocumentosEntregadosCliente=null;
var listadoDetalleDocumentosEntregadosCliente=null;

function configurarListadoVentasDocumentosEntregados(nombre,idCuerpo,funcionSeleccion){
	return crearListadoProductosEstructurado({
		nombre:nombre,
		idCuerpo:idCuerpo,
		ordenInicial:"fecha",
		columnas:[
			{campo:"documento",titulo:"CI",ancho:"5%"},
			{campo:"cliente",titulo:"CLIENTE",ancho:"10%"},
			{campo:"zona",titulo:"ZONA",ancho:"5%"},
			{campo:"local",titulo:"LOCAL",ancho:"5%"},
			{campo:"estado_entrega",titulo:"ENTREGADO",ancho:"5%"},
			{campo:"estado",titulo:"ESTADO",ancho:"5%"},
			{campo:"entregador",titulo:"ENTREGADO POR",ancho:"5%"},
			{campo:"productos",titulo:"PRODUCTO(S)",ancho:"10%"},
			{campo:"fecha",titulo:"FECHA",ancho:"5%"},
			{campo:"documentos_resumen",titulo:"DOCUMENTOS ENTREGADOS",ancho:"5%"},
			{campo:"vendedor",titulo:"VENDEDOR",ancho:"5%"}
		],
		fila:{funcionSeleccion:funcionSeleccion,celdas:[
			{campo:"id_detalle",tecnica:true},
			{id:"td_id",campo:"cod_venta",tecnica:true},
			{campo:"documento",columna:"documento"},
			{campo:"cliente",columna:"cliente"},
			{campo:"zona",columna:"zona"},
			{campo:"local",columna:"local"},
			{campo:"estado_entrega",columna:"estado_entrega"},
			{campo:"estado",columna:"estado"},
			{campo:"entregador",columna:"entregador"},
			{campo:"productos",columna:"productos",render:function(valor){
				return Array.isArray(valor) ? valor.join(" * ") : valor;
			}},
			{campo:"fecha",columna:"fecha"},
			{campo:"documentos_resumen",columna:"documentos_resumen"},
			{campo:"vendedor",columna:"vendedor"}
		]}
	});
}

function configurarListadoDetalleDocumentosEntregados(nombre,idCuerpo){
	return crearListadoProductosEstructurado({
		nombre:nombre,
		idCuerpo:idCuerpo,
		ordenInicial:"documento",
		columnas:[{campo:"documento",titulo:"DOCUMENTOS CHEQUEADOS POR COBRADOR/ENCARGADO",ancho:"100%"}],
		fila:{funcionSeleccion:"obtenerdatosdocumentosentregados",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{campo:"documento",columna:"documento"},
			{campo:"cod_venta",tecnica:true},
			{campo:"id_documento",tecnica:true}
		]}
	});
}

function iniciarListadoVentasDocumentosEntregados(){
	if(!listadoVentasDocumentosEntregados){
		listadoVentasDocumentosEntregados=configurarListadoVentasDocumentosEntregados("ventas_documentos_entregados","table_ventas_documentos_entregados","obtenerdatosdocumentosentregados");
	}
	return listadoVentasDocumentosEntregados;
}

function iniciarListadoDetalleDocumentosEntregados(){
	if(!listadoDetalleDocumentosEntregados){
		listadoDetalleDocumentosEntregados=configurarListadoDetalleDocumentosEntregados("detalle_documentos_entregados","table_documentos_entregados");
	}
	return listadoDetalleDocumentosEntregados;
}

function iniciarListadoVentasDocumentosEntregadosCliente(){
	if(!listadoVentasDocumentosEntregadosCliente){
		listadoVentasDocumentosEntregadosCliente=configurarListadoVentasDocumentosEntregados("ventas_documentos_entregados_cliente","table_ventas_documentos_entregados_cliente","obtenerdatosdocumentosentregadoscliente");
	}
	return listadoVentasDocumentosEntregadosCliente;
}

function iniciarListadoDetalleDocumentosEntregadosCliente(){
	if(!listadoDetalleDocumentosEntregadosCliente){
		listadoDetalleDocumentosEntregadosCliente=configurarListadoDetalleDocumentosEntregados("detalle_documentos_entregados_cliente","table_documentos_entregados_cliente");
	}
	return listadoDetalleDocumentosEntregadosCliente;
}

function iniciarListadosDocumentosEntregados(){
	iniciarListadoVentasDocumentosEntregados();
	iniciarListadoDetalleDocumentosEntregados();
	iniciarListadoVentasDocumentosEntregadosCliente();
	iniciarListadoDetalleDocumentosEntregadosCliente();
}
if(document.readyState==="loading"){
	document.addEventListener("DOMContentLoaded",iniciarListadosDocumentosEntregados);
}else{
	iniciarListadosDocumentosEntregados();
}

function verCerrarInformeDocumentosEntregados(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeDocumentosEntregados").style.display==""){
limpiarcamposinformedocumentosentregados()
		document.getElementById("divMinimizadoInformeDocumentosEntregados").style.display="none"
 
	$("div[id=divInformeDocumentosEntregados]").fadeOut(500);	
	}else{	
if(controlacceso("VERINFORMEDOCUMENTOSENTREGADOS","accion")==false){return;}	
mostrarSoloUno("divInformeDocumentosEntregados")	
		document.getElementById("divInformeDocumentosEntregados").style.display=""
 
		document.getElementById('inptBuscarInformeDocumentosEntregadosF1').value = obtenerFechaActual();
		document.getElementById('inptBuscarInformeDocumentosEntregadosF2').value = obtenerFechaActual();
		
		 buscarCobradorSelecEntregadoRevisionDocumentos()
 buscarCobradorSelecVendedorRevisionDocumentos()
	}
}
function minimizarinformedocumentosentregados(){
	 document.getElementById("divMinimizadoInformeDocumentosEntregados").style.display = "";
 copiarBotonEnContenedor(document.getElementById("divMenuInformeDocumentosEntregados"));
	$("div[id=divInformeDocumentosEntregados]").fadeOut(500);	
}
function limpiarcamposinformedocumentosentregados(){
 document.getElementById("inptBuscarInformeDocumentosEntregadosF1").value=""
 document.getElementById("inptBuscarInformeDocumentosEntregadosF2").value=""
 document.getElementById("inptRegistroVentasDocumentosEntregados").value=""
 document.getElementById("inptRegistroDocumentosEntregados").value=""
 document.getElementById("table_ventas_documentos_entregados").innerHTML=""
 document.getElementById("table_documentos_entregados").innerHTML="" 
	if(listadoVentasDocumentosEntregados) listadoVentasDocumentosEntregados.establecerRegistros([]);
	if(listadoDetalleDocumentosEntregados) listadoDetalleDocumentosEntregados.establecerRegistros([]);
 documentosEntregaCodVentaFK = ""
 document.getElementById("btnInformeDocumentosEntregados1").style='background-color:#ff9800;color:#fff'
 document.getElementById("btnInformeDocumentosEntregados2").style=''
document.getElementById("divInformeVentasDocumentosEntregadas").style.display=''
document.getElementById("divInformeDocumentosEntregadas").style.display='none'
}
function verCerrarVentanasDocumentosEntregados(d){
		if(documentosEntregaCodVentaFK == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA REGISTRO")
		return;
	}
	document.getElementById("btnInformeDocumentosEntregados1").style=''
	document.getElementById("btnInformeDocumentosEntregados2").style=''
	document.getElementById("divInformeVentasDocumentosEntregadas").style.display='none'
	document.getElementById("divInformeDocumentosEntregadas").style.display='none'

	if(d=="1"){
		document.getElementById("btnInformeDocumentosEntregados1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentasDocumentosEntregadas").style.display=''
	}
	if(d=="2"){
		 	document.getElementById("btnInformeDocumentosEntregados2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeDocumentosEntregadas").style.display=''
	}
}

function buscarventasinformedocumentosentregados() {
	if(controlacceso("VERINFORMEDOCUMENTOSENTREGADOS","accion")==false){return;}	
	var listado=iniciarListadoVentasDocumentosEntregados();
	var fecha1 = document.getElementById("inptBuscarInformeDocumentosEntregadosF1").value
	var fecha2 = document.getElementById("inptBuscarInformeDocumentosEntregadosF2").value
	var local = document.getElementById('buscarInformeVentasDocumentosEntregadas8').value
	var zona= document.getElementById("buscarInformeVentasDocumentosEntregadas3").value	
	var cliente= document.getElementById("buscarInformeVentasDocumentosEntregadas2").value
	var documento= document.getElementById("buscarInformeVentasDocumentosEntregadas1").value
	var vendedor= document.getElementById("buscarInformeVentasDocumentosEntregadas7").value
	var vendedor2= document.getElementById("buscarInformeVentasDocumentosEntregadas6").value
	var estado_entregado= document.getElementById("buscarInformeVentasDocumentosEntregadas4").value
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	document.getElementById("table_ventas_documentos_entregados").innerHTML = paginacargando
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
		"documento": documento,
		"estado": "",
		"vendedor": vendedor,
		"estado_entregado": estado_entregado,
		"vendedor2": vendedor2,
		"formato": "json",
		"funt": "informedocumentosentregados"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_ventas_documentos_entregados").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_ventas_documentos_entregados").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else if(typeof datos[2]==="string"){
						document.getElementById("table_ventas_documentos_entregados").innerHTML=datos[2];
					}
		document.getElementById("inptRegistroVentasDocumentosEntregados").value = datos[3]
	document.getElementById("table_documentos_entregados").innerHTML = "";
	if(listadoDetalleDocumentosEntregados) listadoDetalleDocumentosEntregados.establecerRegistros([]);
	documentosEntregaCodVentaFK = ""
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformedocumentosentregados() {
	if(controlacceso("VERINFORMEDOCUMENTOSENTREGADOS","accion")==false){return;}	
	var listado=iniciarListadoDetalleDocumentosEntregados();
	document.getElementById("inptRegistroDocumentosEntregados").value ="";
	document.getElementById("table_documentos_entregados").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_ventaFK": documentosEntregaCodVentaFK,
		"formato": "json",
		"funt": "documentosentregadosdetalle"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_documentos_entregados").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_documentos_entregados").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else if(typeof datos[2]==="string"){
						document.getElementById("table_documentos_entregados").innerHTML=datos[2];
					}
		document.getElementById("inptRegistroDocumentosEntregados").value = datos[3]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
var documentosEntregaCodVentaFK = "";
function obtenerdatosdocumentosentregados(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	documentosEntregaCodVentaFK = $(datostr).children('td[id="td_id"]').html();
	buscarinformedocumentosentregados()
}


/*
INFORME DE DOCUMENTOS ENTREGADOS CLIENTE
*/
function verCerrarInformeDocumentosEntregadosCliente(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeDocumentosEntregadosCliente").style.display==""){
limpiarcamposInformeDocumentosEntregadosCliente()
		document.getElementById("divMinimizadoInformeDocumentosEntregadosCliente").style.display="none"
 
	$("div[id=divInformeDocumentosEntregadosCliente]").fadeOut(500);	
	}else{	
if(controlacceso("VERINFORMEDOCUMENTOSENTREGADOSCLIENTE","accion")==false){return;}
mostrarSoloUno("divInformeDocumentosEntregadosCliente")	
		document.getElementById("divInformeDocumentosEntregadosCliente").style.display=""
 
		document.getElementById('inptBuscarInformeDocumentosEntregadosClienteF1').value = obtenerFechaActual();
		document.getElementById('inptBuscarInformeDocumentosEntregadosClienteF2').value = obtenerFechaActual();
		
		buscarCobradorSelecEntregadoRevisionDocumentos()
 buscarCobradorSelecVendedorRevisionDocumentos()
	}
}
function minimizarinformeDocumentosEntregadosCliente(){ 
	 document.getElementById("divMinimizadoInformeDocumentosEntregadosCliente").style.display = "";
 copiarBotonEnContenedor(document.getElementById("divMenuInformeDocumentosEntregadosCliente"));
	$("div[id=divInformeDocumentosEntregadosCliente]").fadeOut(500);	
}
function limpiarcamposInformeDocumentosEntregadosCliente(){
 document.getElementById("inptBuscarInformeDocumentosEntregadosClienteF1").value=""
 document.getElementById("inptBuscarInformeDocumentosEntregadosClienteF2").value=""
 document.getElementById("inptRegistroVentasDocumentosEntregadosCliente").value=""
 document.getElementById("inptRegistroDocumentosEntregadosCliente").value=""
 document.getElementById("table_ventas_documentos_entregados_cliente").innerHTML=""
 document.getElementById("table_documentos_entregados_cliente").innerHTML="" 
	if(listadoVentasDocumentosEntregadosCliente) listadoVentasDocumentosEntregadosCliente.establecerRegistros([]);
	if(listadoDetalleDocumentosEntregadosCliente) listadoDetalleDocumentosEntregadosCliente.establecerRegistros([]);
 documentosEntregaClienteCodVentaFK = ""
 document.getElementById("btnInformeDocumentosEntregadosCliente1").style='background-color:#ff9800;color:#fff'
 document.getElementById("btnInformeDocumentosEntregadosCliente2").style=''
document.getElementById("divInformeVentasDocumentosEntregadasCliente").style.display=''
document.getElementById("divInformeDocumentosEntregadasCliente").style.display='none'
}
function verCerrarVentanasDocumentosEntregadosCliente(d){
		if(documentosEntregaClienteCodVentaFK == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA REGISTRO")
		return;
	}
	document.getElementById("btnInformeDocumentosEntregadosCliente1").style=''
	document.getElementById("btnInformeDocumentosEntregadosCliente2").style=''
	document.getElementById("divInformeVentasDocumentosEntregadasCliente").style.display='none'
	document.getElementById("divInformeDocumentosEntregadasCliente").style.display='none'

	if(d=="1"){
		document.getElementById("btnInformeDocumentosEntregadosCliente1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentasDocumentosEntregadasCliente").style.display=''
	}
	if(d=="2"){
		 	document.getElementById("btnInformeDocumentosEntregadosCliente2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeDocumentosEntregadasCliente").style.display=''
	}
}
function buscarventasInformeDocumentosEntregadosCliente() {
	var listado=iniciarListadoVentasDocumentosEntregadosCliente();
	var fecha1 = document.getElementById("inptBuscarInformeDocumentosEntregadosClienteF1").value
	var fecha2 = document.getElementById("inptBuscarInformeDocumentosEntregadosClienteF2").value
	var local = document.getElementById('buscarInformeVentasDocumentosEntregadasCliente8').value
	var zona= document.getElementById("buscarInformeVentasDocumentosEntregadasCliente3").value	
	var cliente= document.getElementById("buscarInformeVentasDocumentosEntregadasCliente2").value
	var documento= document.getElementById("buscarInformeVentasDocumentosEntregadasCliente1").value
	var vendedor= document.getElementById("buscarInformeVentasDocumentosEntregadasCliente7").value
	var vendedor2= document.getElementById("buscarInformeVentasDocumentosEntregadasCliente6").value
	var estado_entregado= document.getElementById("buscarInformeVentasDocumentosEntregadasCliente4").value
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	document.getElementById("table_ventas_documentos_entregados_cliente").innerHTML = paginacargando
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
		"documento": documento,
		"estado": "",
		"vendedor": vendedor,
		"estado_entregado": estado_entregado,
		"vendedor2": vendedor2,
		"formato": "json",
		"funt": "informedocumentosentregadoscliente"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_ventas_documentos_entregados_cliente").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_ventas_documentos_entregados_cliente").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else if(typeof datos[2]==="string"){
						document.getElementById("table_ventas_documentos_entregados_cliente").innerHTML=datos[2];
					}
		document.getElementById("inptRegistroVentasDocumentosEntregadosCliente").value = datos[3]
	document.getElementById("table_documentos_entregados_cliente").innerHTML = "";
	if(listadoDetalleDocumentosEntregadosCliente) listadoDetalleDocumentosEntregadosCliente.establecerRegistros([]);
	documentosEntregaClienteCodVentaFK = ""
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarInformeDocumentosEntregadosCliente() {
	var listado=iniciarListadoDetalleDocumentosEntregadosCliente();
	document.getElementById("inptRegistroDocumentosEntregadosCliente").value ="";
	document.getElementById("table_documentos_entregados_cliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_ventaFK": documentosEntregaClienteCodVentaFK,
		"formato": "json",
		"funt": "documentosentregadosdetalle"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_documentos_entregados_cliente").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_documentos_entregados_cliente").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else if(typeof datos[2]==="string"){
						document.getElementById("table_documentos_entregados_cliente").innerHTML=datos[2];
					}
		document.getElementById("inptRegistroDocumentosEntregadosCliente").value = datos[3]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
var documentosEntregaClienteCodVentaFK = "";
function obtenerdatosdocumentosentregadoscliente(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	documentosEntregaClienteCodVentaFK = $(datostr).children('td[id="td_id"]').html();
	buscarInformeDocumentosEntregadosCliente()
}



/*
INFORME DE INVENTARIO
*/
function verCerrarInformeInventario(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeInventario").style.display==""){
		if(controldebusquedadInventario==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoInformeInventario").style.display="none"
 
	$("div[id=divInformeInventario]").fadeOut(500);	
		limpiarcamposbuscarinventario()
	}else{
if(controlacceso("VERINFORMEDEINVENTARIO","accion")==false){return;}		
mostrarSoloUno("divInformeInventario")		
		document.getElementById("divInformeInventario").style.display=""
	 
	
	}
}
function limpiarcamposbuscarinventario(){
	if(controldebusquedadInventario==true){
	
	return
}
	document.getElementById("inptBuscarInventario1").value=""
	document.getElementById("inptBuscarInventario2").value=""
	document.getElementById("inptBuscarInventario3").value=""
	document.getElementById("inptTotalRegistroInventario").value=""
	document.getElementById("inptTotalRegistroProductosCostoInventario").value=""
	document.getElementById("table_comision_productosInventario").innerHTML=""
	if (listadoInventarioProductos) listadoInventarioProductos.establecerRegistros([]);
	document.getElementById("tbProcessInventario").style.display="none"
}
function minimizarInventario(){
		document.getElementById("divMinimizadoInformeInventario").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuInformeInventario"));
	$("div[id=divInformeInventario]").fadeOut(500);
}
var registrocargadoinventario="";
var totalregistroinventario="";
var controldebusquedadInventario=false
function cancelarInventario(){
	controldebusquedadInventario=false
	document.getElementById("divProgressInventario").style.backgroundColor='#ff5722'
}
function buscarproductosinventario() {
if(controlacceso("VERINFORMEDEINVENTARIO","accion")==false){return;}	
	var listado = iniciarListadoInventarioProductos();
	var codproducto = document.getElementById('inptBuscarInventario1').value
	var producto = document.getElementById('inptBuscarInventario2').value
	var stock = document.getElementById('inptBuscarInventario3').value
	var local = document.getElementById('inptlocalProductoBuscarInventario').value
	var Categoria = document.getElementById('inptCategoriaProductoBuscarInventario').value
	var Marcas = document.getElementById('inptMarcasProductoBuscarInventario').value
	var controlExistencia = document.getElementById('inptExistenciaProductoBuscarInventario').value
	var cod_admin_locales = document.getElementById('inptlocalAdminLocalesBuscarInventario').value
		if(controldebusquedadInventario==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadInventario=true
	document.getElementById("table_comision_productosInventario").innerHTML = paginacargando
document.getElementById("tbProcessInventario").style.display='none'
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codproducto": codproducto,
		"producto": producto,
		"stock": stock,
		"local": local,
		"Categoria": Categoria,
		"Marcas": Marcas,
		"control": controlExistencia,
		"cod_admin_locales": cod_admin_locales,
		"formato": listado ? "json" : "",
		"funt": "buscarInventario"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_productosInventario").innerHTML = ''
			controldebusquedadInventario=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_productosInventario").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("table_comision_productosInventario").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					document.getElementById("inptTotalRegistroInventario").value = datos[3];
					document.getElementById("inptTotalRegistroProductosCostoInventario").value = datos[4];
					
					registrocargadoinventario=datos[99];
					totalregistroinventario=datos[100];
		
						 if(totalregistroinventario>registrocargadoinventario){
						 	var porce=((registrocargadoinventario*100)/totalregistroinventario).toFixed(0)
	document.getElementById("divProgressInventario").style.width=porce+"%"
						 if (listado) crearMarcadorCargaListado("table_comision_productosInventario", "table_mas_comision_productosInventario");
						 else document.getElementById("table_comision_productosInventario").innerHTML += "<div id='table_mas_comision_productosInventario'></div>";
						  buscarmasproductosinventario();
					 }else{
						 controldebusquedadInventario=false
					 }
					
					
				}
			} catch (error) {
				controldebusquedadInventario=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}


	function buscarmasproductosinventario(c) {
if(controlacceso("VERINFORMEDEINVENTARIO","accion")==false){return;}	
	var listado = iniciarListadoInventarioProductos();
	var codproducto = document.getElementById('inptBuscarInventario1').value
	var producto = document.getElementById('inptBuscarInventario2').value
	var stock = document.getElementById('inptBuscarInventario3').value
	var local = document.getElementById('inptlocalProductoBuscarInventario').value
	var Categoria = document.getElementById('inptCategoriaProductoBuscarInventario').value
	var Marcas = document.getElementById('inptMarcasProductoBuscarInventario').value
	var controlExistencia = document.getElementById('inptExistenciaProductoBuscarInventario').value
	var cod_admin_locales = document.getElementById('inptlocalAdminLocalesBuscarInventario').value
	if(c=="1"){
	controldebusquedadInventario=true	
	}
		if(controldebusquedadInventario==false){
		
	return
}
controldebusquedadInventario=true
	var marcadorInventario = document.getElementById("table_mas_comision_productosInventario");
	if (marcadorInventario) marcadorInventario.innerHTML = paginacargando;
document.getElementById("tbProcessInventario").style.display=''
document.getElementById("divProgressInventario").style.backgroundColor=''
var totalcostos=document.getElementById("inptTotalRegistroProductosCostoInventario").value
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codproducto": codproducto,
		"producto": producto,
		"stock": stock,
		"local": local,
		"Categoria": Categoria,
		"Marcas": Marcas,
		"control": controlExistencia,
		"totalcostos": totalcostos,
		"cod_admin_locales": cod_admin_locales,
		"registrocargados": registrocargadoinventario,
		"formato": listado ? "json" : "",
		"funt": "buscarMasInventario"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarMarcadorCargaListado("table_mas_comision_productosInventario");
			document.getElementById("divProgressInventario").style.backgroundColor='#ff5722'
			controldebusquedadInventario=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			limpiarMarcadorCargaListado("table_mas_comision_productosInventario");
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2], true);
					else {
						var cuerpoInventario = document.getElementById("table_comision_productosInventario");
						if (cuerpoInventario && typeof datos[2] === "string") cuerpoInventario.insertAdjacentHTML("beforeend", datos[2]);
					}
					document.getElementById("inptTotalRegistroInventario").value = datos[3];
					document.getElementById("inptTotalRegistroProductosCostoInventario").value = datos[4];
					
					registrocargadoinventario=datos[99];
		
						 if(totalregistroinventario>registrocargadoinventario){
						 	var porce=((registrocargadoinventario*100)/totalregistroinventario).toFixed(0)
	document.getElementById("divProgressInventario").style.width=porce+"%"
						 crearMarcadorCargaListado("table_comision_productosInventario", "table_mas_comision_productosInventario");
						  buscarmasproductosinventario();
					 }else{
						 document.getElementById("tbProcessInventario").style.display='none'
						 controldebusquedadInventario=false
					 }
					
					
				}
			} catch (error) {
				document.getElementById("divProgressInventario").style.backgroundColor='#ff5722'
				controldebusquedadInventario=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}


/*
INFORME GRAL. DE PRODUCTOS
*/
function verCerrarInformeGralProductos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeGralProductos").style.display==""){
		if(controldebusquedadinformegralproductos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoInformeGralProductos").style.display="none"
//  
	// $("div[id=divInformeGralProductos]").fadeOut(500);	
	document.getElementById("divInformeGralProductos").style.display="none"
		limpiarcamposbuscarinformegralproductos()
	}else{
if(controlacceso("VERINFORMEGRALPRODUCTOS","accion")==false){return;}	
mostrarSoloUno("divInformeGralProductos")			
		document.getElementById("divInformeGralProductos").style.display=""
	//  
	
	}
}
function limpiarcamposbuscarinformegralproductos(){
	if(controldebusquedadinformegralproductos==true){
	
	return
}
	document.getElementById("inptBuscarinformegralproductos1").value=""
	document.getElementById("inptBuscarinformegralproductos2").value=""
	document.getElementById("inptBuscarinformegralproductos3").value=""
	document.getElementById("inptBuscarinformegralproductos4").value=""
	document.getElementById("inptProveedorProductoBuscarinformegralproductos").value=""
	document.getElementById("inptTotalRegistroinformegralproductos").value=""
	document.getElementById("inptTotalRegistroProductosCostoinformegralproductos").value=""
	document.getElementById("inptTotalStockinformegralproductos").value=""
	document.getElementById("table_productos_informegralproductos").innerHTML=""
	if (listadoInformeGeneralProductos) listadoInformeGeneralProductos.establecerRegistros([]);
	document.getElementById("tbProcessinformegralproductos").style.display="none"
	document.getElementById("btnInformeGralProductos3").style="background-color: rgb(255, 152, 0); color: rgb(255, 255, 255);"
	agrupaciongralproducto = "";
}
function minimizarinformegralproductos(){
		document.getElementById("divMinimizadoInformeGralProductos").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuInformeGralProductos"));
	$("div[id=divInformeGralProductos]").fadeOut(500);
}
var registrocargadoinformegralproductos="";
var totalregistroinformegralproductos="";
var controldebusquedadinformegralproductos=false
agrupaciongralproducto = "";
function cancelarinformegralproductos(){
	controldebusquedadinformegralproductos=false
	document.getElementById("divProgressinformegralproductos").style.backgroundColor='#ff5722'
}
function cambiarTipoInformeGralProductos(d){
	if(controldebusquedadinformegralproductos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
document.getElementById("btnInformeGralProductos1").style=""
document.getElementById("btnInformeGralProductos2").style=""
document.getElementById("btnInformeGralProductos3").style=""
if(d=="1"){
	document.getElementById("btnInformeGralProductos1").style="background-color:#ff9800;color:#fff"
	agrupaciongralproducto="1";
}if(d=="2"){
	document.getElementById("btnInformeGralProductos2").style="background-color:#ff9800;color:#fff"
	agrupaciongralproducto="2";
}
if(d=="3"){
	document.getElementById("btnInformeGralProductos3").style="background-color:#ff9800;color:#fff"
	agrupaciongralproducto="";
}
}
function buscarinformegralproductos() {
if(controlacceso("VERINFORMEGRALPRODUCTOS","accion")==false){return;}	
	var listado = iniciarListadoInformeGeneralProductos();
	var codproducto = document.getElementById('inptBuscarinformegralproductos1').value
	var producto = document.getElementById('inptBuscarinformegralproductos2').value
	var stock = document.getElementById('inptBuscarinformegralproductos4').value
	var local = document.getElementById('inptlocalProductoBuscarinformegralproductos').value
	var Categoria = document.getElementById('inptCategoriaProductoBuscarinformegralproductos').value
	var Marcas = document.getElementById('inptMarcasProductoBuscarinformegralproductos').value
	var cod_proveedor = document.getElementById('inptProveedorProductoBuscarinformegralproductos').value
	var controlExistencia = document.getElementById('inptExistenciaProductoBuscarinformegralproductos').value
	var fechaStock = document.getElementById('inptlocalProductoBuscarinformegralproductosFechaStock').value
	fechaStock = fechaStock.replace("T", " ");
		if(controldebusquedadinformegralproductos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadinformegralproductos=true
	document.getElementById("table_productos_informegralproductos").innerHTML = paginacargando
document.getElementById("tbProcessinformegralproductos").style.display='none'
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codproducto": codproducto,
		"producto": producto,
		"stock": stock,
		"local": local,
		"Categoria": Categoria,
		"Marcas": Marcas,
		"control": controlExistencia,
		"agrupaciongralproducto": agrupaciongralproducto,
		"cod_proveedor": cod_proveedor,
		"fechaStock": fechaStock,
		"formato": listado ? "json" : "",
		"funt": "buscarinformegralproductos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_productos_informegralproductos").innerHTML = ''
			controldebusquedadinformegralproductos=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_productos_informegralproductos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2]);
					else document.getElementById("table_productos_informegralproductos").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					document.getElementById("inptTotalRegistroinformegralproductos").value = datos[3];
					document.getElementById("inptTotalRegistroProductosCostoinformegralproductos").value = datos[4];
					document.getElementById("inptTotalStockinformegralproductos").value = datos[5];
					
					registrocargadoinformegralproductos=datos[99];
					totalregistroinformegralproductos=datos[100];
		
						 if(totalregistroinformegralproductos>registrocargadoinformegralproductos){
						 	var porce=((registrocargadoinformegralproductos*100)/totalregistroinformegralproductos).toFixed(0)
	document.getElementById("divProgressinformegralproductos").style.width=porce+"%"
						 if (listado) crearMarcadorCargaListado("table_productos_informegralproductos", "table_mas_comision_productosinformegralproductos");
						 else document.getElementById("table_productos_informegralproductos").innerHTML += "<div id='table_mas_comision_productosinformegralproductos'></div>";
						  buscarmasinformegralproductos();
					 }else{
						 controldebusquedadinformegralproductos=false
					 }
					
					
				}
			} catch (error) {
				controldebusquedadinformegralproductos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarmasinformegralproductos(c) {
	var listado = iniciarListadoInformeGeneralProductos();
	var codproducto = document.getElementById('inptBuscarinformegralproductos1').value
	var producto = document.getElementById('inptBuscarinformegralproductos2').value
	var stock = document.getElementById('inptBuscarinformegralproductos4').value
	var local = document.getElementById('inptlocalProductoBuscarinformegralproductos').value
	var Categoria = document.getElementById('inptCategoriaProductoBuscarinformegralproductos').value
	var Marcas = document.getElementById('inptMarcasProductoBuscarinformegralproductos').value
	var controlExistencia = document.getElementById('inptExistenciaProductoBuscarinformegralproductos').value
	var cod_proveedor = document.getElementById('inptProveedorProductoBuscarinformegralproductos').value
	var fechaStock = document.getElementById('inptlocalProductoBuscarinformegralproductosFechaStock').value
	fechaStock = fechaStock.replace("T", " ");
	
	if(c=="1"){
	controldebusquedadinformegralproductos=true	
	}
		if(controldebusquedadinformegralproductos==false){
		
	return
}
controldebusquedadinformegralproductos=true
	var marcadorInformeGeneral = document.getElementById("table_mas_comision_productosinformegralproductos");
	if (marcadorInformeGeneral) marcadorInformeGeneral.innerHTML = paginacargando;
document.getElementById("tbProcessinformegralproductos").style.display=''
document.getElementById("divProgressinformegralproductos").style.backgroundColor=''
var totalcostos=document.getElementById("inptTotalRegistroProductosCostoinformegralproductos").value
var stocktotal=document.getElementById("inptTotalStockinformegralproductos").value
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codproducto": codproducto,
		"producto": producto,
		"stock": stock,
		"local": local,
		"Categoria": Categoria,
		"Marcas": Marcas,
		"control": controlExistencia,
		"totalcostos": totalcostos,
		"stocktotal": stocktotal,
		"agrupaciongralproducto": agrupaciongralproducto,
		"registrocargados": registrocargadoinformegralproductos,
		"cod_proveedor": cod_proveedor,
		"fechaStock": fechaStock,
		"formato": listado ? "json" : "",
		"funt": "buscarMasinformegralproductos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarMarcadorCargaListado("table_mas_comision_productosinformegralproductos");
			document.getElementById("divProgressinformegralproductos").style.backgroundColor='#ff5722'
			controldebusquedadinformegralproductos=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			limpiarMarcadorCargaListado("table_mas_comision_productosinformegralproductos");
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   				   
					if (listado && Array.isArray(datos[2])) listado.establecerRegistros(datos[2], true);
					else {
						var cuerpoInformeGeneral = document.getElementById("table_productos_informegralproductos");
						if (cuerpoInformeGeneral && typeof datos[2] === "string") cuerpoInformeGeneral.insertAdjacentHTML("beforeend", datos[2]);
					}
					document.getElementById("inptTotalRegistroinformegralproductos").value = datos[3];
					document.getElementById("inptTotalRegistroProductosCostoinformegralproductos").value = datos[4];
					document.getElementById("inptTotalStockinformegralproductos").value = datos[5];
					
					registrocargadoinformegralproductos=datos[99];
		
						 if(totalregistroinformegralproductos>registrocargadoinformegralproductos){
						 	var porce=((registrocargadoinformegralproductos*100)/totalregistroinformegralproductos).toFixed(0)
	document.getElementById("divProgressinformegralproductos").style.width=porce+"%"
						 crearMarcadorCargaListado("table_productos_informegralproductos", "table_mas_comision_productosinformegralproductos");
						  buscarmasinformegralproductos();
					 }else{
						 document.getElementById("tbProcessinformegralproductos").style.display='none'
						 controldebusquedadinformegralproductos=false
					 }
					
					
				}
			} catch (error) {
				document.getElementById("divProgressinformegralproductos").style.backgroundColor='#ff5722'
				controldebusquedadinformegralproductos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}




/*
INFORME DE STOCK
*/
function verCerrarInformeStock(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeStock").style.display==""){
		if(controldebusquedadStock==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoInformeStock").style.display="none"
 
	$("div[id=divInformeStock]").fadeOut(500);	
		limpiarcamposbuscarStock()
	}else{
if(controlacceso("VERINFORMEDESTOCK","accion")==false){return;}		
mostrarSoloUno("divInformeStock")		
		document.getElementById("divInformeStock").style.display=""
	 
	
	}
}
function limpiarcamposbuscarStock(){
	if(controldebusquedadStock==true){
	
	return
}
	document.getElementById("inptBuscarStock1").value=""
	document.getElementById("inptBuscarStock2").value=""
	document.getElementById("inptBuscarStock3").value=""
	document.getElementById("inptTotalRegistroStock").value=""
	document.getElementById("inptTotalRegistroProductosCostoStock").value=""
	document.getElementById("table_comision_productosStock").innerHTML=""
	document.getElementById("table_comision_productosStock_2").innerHTML=""
	if (listadoStockProductos) listadoStockProductos.establecerRegistros([]);
	if (listadoStockProductosImpresion) listadoStockProductosImpresion.establecerRegistros([]);
	document.getElementById("tbProcessStock").style.display="none"
}
function minimizarStock(){
		document.getElementById("divMinimizadoInformeStock").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuInformeStock"));
	$("div[id=divInformeStock]").fadeOut(500);
}
var registrocargadoStock="";
var totalregistroStock="";
var controldebusquedadStock=false
function cancelarStock(){
	controldebusquedadStock=false
	document.getElementById("divProgressStock").style.backgroundColor='#ff5722'
}
function buscarproductosStock() {
if(controlacceso("VERINFORMEDESTOCK","accion")==false){return;}	
	var listado = iniciarListadoStockProductos();
	var codproducto = document.getElementById('inptBuscarStock1').value
	var producto = document.getElementById('inptBuscarStock2').value
	var stock = document.getElementById('inptBuscarStock3').value
	var local = document.getElementById('inptlocalProductoBuscarStock').value
	var existencia = document.getElementById('inptExistenciaProductoBuscarstock').value
	var Categoria = document.getElementById('inptCategoriaProductoBuscarStock').value
	var Marcas = document.getElementById('inptMarcasProductoBuscarStock').value
	var cod_admin_locales = document.getElementById('inptlocalAdminLocalesBuscarStock').value
	var proveedor = document.getElementById('inptBuscarStock4').value
	var agrupadopor = document.getElementById('inptgroupbyAdminLocalesBuscarStock').value
	
	if(controldebusquedadStock==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadStock=true
	document.getElementById("table_comision_productosStock").innerHTML = paginacargando
document.getElementById("tbProcessStock").style.display='none'
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codproducto": codproducto,
		"producto": producto,
		"stock": stock,
		"local": local,
		"Categoria": Categoria,
		"existencia": existencia,
		"Marcas": Marcas,
		"cod_admin_locales": cod_admin_locales,
		"proveedor": proveedor,
		"agrupadopor": agrupadopor,
		"formato": listado ? "json" : "",
		"funt": "buscarStock"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_comision_productosStock").innerHTML = ''
			controldebusquedadStock=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_comision_productosStock").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   				   
					if (listado && Array.isArray(datos[2])) {
						listado.establecerRegistros(datos[2]);
						if (listadoStockProductosImpresion) listadoStockProductosImpresion.establecerRegistros(Array.isArray(datos[5]) ? datos[5] : datos[2]);
					} else {
						document.getElementById("table_comision_productosStock").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
						document.getElementById("table_comision_productosStock_2").innerHTML = typeof datos[5] === "string" ? datos[5] : "";
					}
					document.getElementById("inptTotalRegistroStock").value = datos[3];
					document.getElementById("inptTotalRegistroProductosCostoStock").value = datos[4];
					
					registrocargadoStock=datos[99];
					totalregistroStock=datos[100];
		
						 if(totalregistroStock>registrocargadoStock){
						 	var porce=((registrocargadoStock*100)/totalregistroStock).toFixed(0)
	document.getElementById("divProgressStock").style.width=porce+"%"
						 if (listado) {
							crearMarcadorCargaListado("table_comision_productosStock", "table_mas_comision_productosStock");
							crearMarcadorCargaListado("table_comision_productosStock_2", "table_mas_comision_productosStock_2");
						 } else {
							document.getElementById("table_comision_productosStock").innerHTML += "<div id='table_mas_comision_productosStock'></div>";
							document.getElementById("table_comision_productosStock_2").innerHTML += "<div id='table_mas_comision_productosStock_2'></div>";
						 }
						  buscarmasproductosStock();
					 }else{
						 controldebusquedadStock=false
					 }
					
					
				}
			} catch (error) {
				controldebusquedadStock=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarmasproductosStock(c) {
if(controlacceso("VERINFORMEDESTOCK","accion")==false){return;}	
	var listado = iniciarListadoStockProductos();
	var codproducto = document.getElementById('inptBuscarStock1').value
	var producto = document.getElementById('inptBuscarStock2').value
	var stock = document.getElementById('inptBuscarStock3').value
	var local = document.getElementById('inptlocalProductoBuscarStock').value
	var existencia = document.getElementById('inptExistenciaProductoBuscarstock').value
	var Categoria = document.getElementById('inptCategoriaProductoBuscarStock').value
	var Marcas = document.getElementById('inptMarcasProductoBuscarStock').value
	var cod_admin_locales = document.getElementById('inptlocalAdminLocalesBuscarStock').value
	var proveedor = document.getElementById('inptBuscarStock4').value
	var agrupadopor = document.getElementById('inptgroupbyAdminLocalesBuscarStock').value
	if(c=="1"){
	controldebusquedadStock=true	
	}
		if(controldebusquedadStock==false){
		
	return
}
controldebusquedadStock=true
	var marcadorStock = document.getElementById("table_mas_comision_productosStock");
	if (marcadorStock) marcadorStock.innerHTML = paginacargando;
document.getElementById("tbProcessStock").style.display=''
document.getElementById("divProgressStock").style.backgroundColor=''
var totalcostos=document.getElementById("inptTotalRegistroProductosCostoStock").value
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codproducto": codproducto,
		"producto": producto,
		"stock": stock,
		"local": local,
		"Categoria": Categoria,
		"Marcas": Marcas,
		"totalcostos": totalcostos,
		"existencia": existencia,
		"registrocargados": registrocargadoStock,
		"cod_admin_locales": cod_admin_locales,
		"proveedor": proveedor,
		"agrupadopor": agrupadopor,
		"formato": listado ? "json" : "",
		"funt": "buscarMasStock"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarMarcadorCargaListado("table_mas_comision_productosStock");
			limpiarMarcadorCargaListado("table_mas_comision_productosStock_2");
			document.getElementById("divProgressStock").style.backgroundColor='#ff5722'
			controldebusquedadStock=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			limpiarMarcadorCargaListado("table_mas_comision_productosStock");
			limpiarMarcadorCargaListado("table_mas_comision_productosStock_2");
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   				   
					if (listado && Array.isArray(datos[2])) {
						listado.establecerRegistros(datos[2], true);
						if (listadoStockProductosImpresion) listadoStockProductosImpresion.establecerRegistros(Array.isArray(datos[5]) ? datos[5] : datos[2], true);
					} else {
						var cuerpoStock = document.getElementById("table_comision_productosStock");
						var cuerpoStockImpresion = document.getElementById("table_comision_productosStock_2");
						if (cuerpoStock && typeof datos[2] === "string") cuerpoStock.insertAdjacentHTML("beforeend", datos[2]);
						if (cuerpoStockImpresion && typeof datos[5] === "string") cuerpoStockImpresion.insertAdjacentHTML("beforeend", datos[5]);
					}
					document.getElementById("inptTotalRegistroStock").value = datos[3];
					document.getElementById("inptTotalRegistroProductosCostoStock").value = datos[4];
					
					registrocargadoStock=datos[99];
		
						 if(totalregistroStock>registrocargadoStock){
						 	var porce=((registrocargadoStock*100)/totalregistroStock).toFixed(0)
	document.getElementById("divProgressStock").style.width=porce+"%"
						 crearMarcadorCargaListado("table_comision_productosStock", "table_mas_comision_productosStock");
						 crearMarcadorCargaListado("table_comision_productosStock_2", "table_mas_comision_productosStock_2");
						 
						  buscarmasproductosStock();
					 }else{
						 document.getElementById("tbProcessStock").style.display='none'
						 controldebusquedadStock=false
					 }
					
					
				}
			} catch (error) {
				document.getElementById("divProgressStock").style.backgroundColor='#ff5722'
				controldebusquedadStock=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}


/*
INFORME DE INFORMCONF
*/
function verCerrarInformeInformconf(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeInformconf").style.display==""){
		if(controldebusquedadInformconf==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
		return
	}
	document.getElementById("divMinimizadoInformeInformconf").style.display="none"
	 
	$("div[id=divInformeInformconf]").fadeOut(500);	
		limpiarcamposbuscarInformconf()
	}else{
	if(controlacceso("VERINFORMEDEINFORMCONF","accion")==false){return;}
mostrarSoloUno("divInformeInformconf")		
		document.getElementById("divInformeInformconf").style.display=""
	 
	
	}
}
function limpiarcamposbuscarInformconf(){
	if(controldebusquedadInformconf==true){
	
	return
}
	document.getElementById("inptTotalRegistroInformconf").value=""
	document.getElementById("table_informe_informconf").innerHTML=""
	document.getElementById("tbProcessInformconf").style.display="none"
}
function minimizarInformconf(){
		document.getElementById("divMinimizadoInformeInformconf").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuInformeInformconf"));
	$("div[id=divInformeInformconf]").fadeOut(500);
}
var registrocargadoInformconf="";
var totalregistroInformconf="";
var controldebusquedadInformconf=false
function cancelarInformconf(){
	controldebusquedadInformconf=false
	document.getElementById("divProgressInformconf").style.backgroundColor='#ff5722'
}

function agregarCeldaInformconf(fila, id, valor, ancho, oculta){
	var celda = document.createElement("td");
	if(id){ celda.id = id; }
	if(ancho){ celda.style.width = ancho; }
	if(oculta){ celda.style.display = "none"; }
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderFilasInformconf(registros, contenedor){
	if(!contenedor || !Array.isArray(registros)){ return; }
	contenedor.textContent = "";
	var fragmento = document.createDocumentFragment();
	registros.forEach(function(registro){
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.onclick = function(){ obtenerdatosInformeInformconf(this); };
		agregarCeldaInformconf(fila, "td_id_1", registro.id_cliente, "", true);
		agregarCeldaInformconf(fila, "td_id_2", registro.id_venta, "", true);
		agregarCeldaInformconf(fila, "", registro.cliente, "40%", false);
		agregarCeldaInformconf(fila, "", registro.detalle_venta, "40%", false);
		var celdaFecha = agregarCeldaInformconf(fila, "", "", "20%", false);
		var fecha = document.createElement("input");
		fecha.type = "date";
		fecha.value = registro.fecha_ingreso || "";
		fecha.className = "inputText";
		fecha.onchange = function(){ cambiarFechaInformconf(this); };
		celdaFecha.appendChild(fecha);
		tabla.appendChild(fila);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function agregarContenedorMasInformconf(padre){
	var siguiente = document.createElement("div");
	siguiente.id = "table_mas_informconf";
	padre.appendChild(siguiente);
	return siguiente;
}

function buscarInformconf() {
if(controlacceso("VERINFORMEDEINFORMCONF","accion")==false){return;}	
	var cliente = document.getElementById('inptBuscarInformconf1').value
	var fecha = document.getElementById('inptBuscarInformconf2').value
	
		if(controldebusquedadInformconf==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadInformconf=true
	document.getElementById("table_informe_informconf").innerHTML = paginacargando
document.getElementById("tbProcessInformconf").style.display='none'
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cliente": cliente,
		"fecha": fecha,
		"formato": "json",
		"funt": "buscar_clientes_informconf"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_informconf").innerHTML = ''
			controldebusquedadInformconf=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_informe_informconf").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   							   
					var datos_buscados = datos[2];
					
					var contenedorInformconf = document.getElementById("table_informe_informconf");
					renderFilasInformconf(datos_buscados, contenedorInformconf)
					document.getElementById("inptTotalRegistroInformconf").value = datos[3];
					document.getElementById('btnCambiarEstadoClienteInformconf').style.backgroundColor='#d3d3d3'
					cod_clienteInformconfFK = "";
					cod_ventaInformconfFK = "";
					
					registrocargadoInformconf=datos[99];
					totalregistroInformconf=datos[100];
		
						 if(totalregistroInformconf>registrocargadoInformconf){
						 	var porce=((registrocargadoInformconf*100)/totalregistroInformconf).toFixed(0)
	document.getElementById("divProgressInformconf").style.width=porce+"%"
						 agregarContenedorMasInformconf(contenedorInformconf)
						  buscarmasInformconf();
					 }else{
						 controldebusquedadInformconf=false
					 }
					
					
				}
			} catch (error) {
				controldebusquedadInformconf=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarmasInformconf(c) {
	var cliente =  document.getElementById('inptBuscarInformconf1').value;
	var fecha =  document.getElementById('inptBuscarInformconf2').value;
	
	if(c=="1"){
	controldebusquedadInformconf=true	
	}
		if(controldebusquedadInformconf==false){
		
	return
}
controldebusquedadInformconf=true
	document.getElementById("table_mas_informconf").innerHTML = paginacargando
document.getElementById("tbProcessInformconf").style.display=''
document.getElementById("divProgressInformconf").style.backgroundColor=''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cliente": cliente,
		"fecha": fecha,
		"registrocargados": registrocargadoInformconf,
		"formato": "json",
		"funt": "buscar_mas_clientes_informconf"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_informconf").innerHTML = ''
			document.getElementById("divProgressInformconf").style.backgroundColor='#ff5722'
			controldebusquedadInformconf=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_mas_informconf").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   							   
					var datos_buscados = datos[2];
					
					var contenedorMasInformconf = document.getElementById("table_mas_informconf");
					renderFilasInformconf(datos_buscados, contenedorMasInformconf)
					document.getElementById("inptTotalRegistroInformconf").value = datos[3];
					
					registrocargadoInformconf=datos[99];
		
						 if(totalregistroInformconf>registrocargadoInformconf){
						 	var porce=((registrocargadoInformconf*100)/totalregistroInformconf).toFixed(0)
	document.getElementById("divProgressInformconf").style.width=porce+"%"
						 contenedorMasInformconf.removeAttribute("id")
						 agregarContenedorMasInformconf(contenedorMasInformconf)
						  buscarmasInformconf();
					 }else{
						 document.getElementById("tbProcessInformconf").style.display='none'
						 controldebusquedadInformconf=false
					 }
					
					
				}
			} catch (error) {
				document.getElementById("divProgressInformconf").style.backgroundColor='#ff5722'
				controldebusquedadInformconf=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

var cod_clienteInformconfFK = "";
var cod_ventaInformconfFK = "";
function obtenerdatosInformeInformconf(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	
	cod_clienteInformconfFK= $(datostr).children('td[id="td_id_1"]').html();
	cod_ventaInformconfFK= $(datostr).children('td[id="td_id_2"]').html();
	
	document.getElementById('btnCambiarEstadoClienteInformconf').style.backgroundColor='#ff0000';
}
function cambiarFechaInformconf(datos){
	if(controlacceso("CAMBIARFECHAINGRESOINFORMCONF","accion")==false){
		datos.value = '';
		return;
	}
	
	ambFechaIngresoInformeInformconf(datos.value)
}
function ambFechaIngresoInformeInformconf(fecha) {
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"cod_clienteFK": cod_clienteInformconfFK,
		"cod_ventaFK": cod_ventaInformconfFK,
		"funt": "ambFechaIngresoInformeInformconf"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				}
			} catch (error) {
				controldebusquedadStock=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function cambiarEstadoInformeInforconf() {
	if(controlacceso("CAMBIARESTADOCLIENTEINFORMCONF","accion")==false){return;}
	if(cod_clienteInformconfFK == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO");
		return;
	}
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_clienteFK": cod_clienteInformconfFK,
		"cod_ventaFK": cod_ventaInformconfFK,
		"funt": "cambiarEstadoInformeInforconf"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				}
			} catch (error) {
				controldebusquedadStock=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}






/*
GANANCIA POR VENTA
*/
function verCerrarInformeGananciasVentas(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divGananciasporventa").style.display==""){
		if(controldebusquedadGananciaPorVenta==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
limpiarcamposbuscadorgananciasporventas()
		document.getElementById("divMinimizadoInformeGananciaPorVenta").style.display="none"
 
	$("div[id=divGananciasporventa]").fadeOut(500);	
		
	}else{		
	if(controlacceso("VERINFORMEDEGANANCIAPORVENTA","accion")==false){return;}
	mostrarSoloUno("divGananciasporventa")	
		document.getElementById("divGananciasporventa").style.display=""
  
		
	}
}
function limpiarcamposbuscadorgananciasporventas(){
	if(controldebusquedadGananciaPorVenta==true){
	return
}
	document.getElementById("inptBuscarInfGananciaVentaF1").value=""
	document.getElementById("inptBuscarInfGananciaVentaF2").value=""
	document.getElementById("inptBuscarInfGananciaVenta1").value=""
	document.getElementById("inptBuscarInfGananciaVenta2").value=""
	document.getElementById("inptBuscarInfGananciaVenta3").value=""
	document.getElementById("inptBuscarInfGananciaVenta4").value=""

	document.getElementById("inptTotalRegstroGananciasVenta").value=""
	document.getElementById("inptTotalCostoGananciasVenta").value=""
	document.getElementById("inptTotalComisionGananciasVenta").value=""
	document.getElementById("inptTotalPagadoGananciasVenta").value=""
	document.getElementById("inptTotalEvaluacionGananciasVenta").value=""
	document.getElementById("table_historial_ganancias_venta").innerHTML=""
	document.getElementById("tbProcessGananciaPorVenta").style.display="none"
}
function minimizargananciaporventas(){
	document.getElementById("divMinimizadoInformeGananciaPorVenta").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuInformeGanPorVenta"));
	$("div[id=divGananciasporventa]").fadeOut(500);	
}
function bloquearBuscarPorgananciaventa(d){
	document.getElementById('divFiltroGananciaporventa1').style.display="none";
	document.getElementById('divFiltroGananciaporventa2').style.display="none";
	document.getElementById('inptBuscarInfGananciaporventa').value=""
	document.getElementById('inptBuscarInfGananciaVentaF1').value=""
	document.getElementById('inptBuscarInfGananciaVentaF2').value=""
	if(d=="1"){
	document.getElementById('divFiltroGananciaporventa1').style.display="";
		document.getElementById('inputSelectTipoBuscarInfGananciaventa').value="2"
	}
	if(d=="2"){
	document.getElementById('divFiltroGananciaporventa2').style.display="";
		document.getElementById('inputSelectTipoBuscarInfGananciaventa').value="1"
	}	
}
var TotalRegistroCargadoGanancias=0;
function checkHistorialGananciaVenta(d){	
	if(d=="1"){
		document.getElementById('checkHistorialGananciaVenta1').checked=true
		document.getElementById('checkHistorialGananciaVenta2').checked=false
		document.getElementById('inptBuscarInfGananciaVentaF1').value = "";
	    document.getElementById('inptBuscarInfGananciaVentaF2').value = "";	
	}else{		
		document.getElementById('checkHistorialGananciaVenta1').checked=false
		document.getElementById('checkHistorialGananciaVenta2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInfGananciaVentaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInfGananciaVentaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
var registrocargadogananciaporventa="";
var totalregistrogananciaporventa="";
var controldebusquedadGananciaPorVenta=false
function cancelarGananciaPorVenta(){
	controldebusquedadGananciaPorVenta=false
	document.getElementById("divProgressGananciaPorVenta").style.backgroundColor='#ff5722'
}
function buscargananciaventa() {
	if(controlacceso("VERINFORMEDEGANANCIAPORVENTA","accion")==false){return;}
	var nroventa = document.getElementById('inptBuscarInfGananciaVenta1').value
	var cliente = document.getElementById('inptBuscarInfGananciaVenta2').value
	var nrodocumento = document.getElementById('inptBuscarInfGananciaVenta3').value
	var fechafiltro = document.getElementById('inptBuscarInfGananciaVenta4').value
	var fecha1 = document.getElementById('inptBuscarInfGananciaVentaF1').value
	var fecha2 = document.getElementById('inptBuscarInfGananciaVentaF2').value
	var cod_local = document.getElementById('inptlocalInformeGananciaporventa').value
	var tipoventa = document.getElementById('inptBuscarInfGananciaVenta5').value
	
	if (document.getElementById('checkHistorialGananciaVenta2').checked==true) {
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
	
if(controldebusquedadGananciaPorVenta==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadGananciaPorVenta=true
	document.getElementById("table_historial_ganancias_venta").innerHTML = paginacargando
	document.getElementById("tbProcessGananciaPorVenta").style.display="none"
		document.getElementById("inptTotalCostoGananciasVenta").value ="";
	document.getElementById("inptTotalComisionGananciasVenta").value ="";
	document.getElementById("inptTotalPagadoGananciasVenta").value = "";
	document.getElementById("inptTotalEvaluacionGananciasVenta").value = "";
	document.getElementById("inptTotalRegstroGananciasVenta").value = "";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nroventa": nroventa,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cliente": cliente,
		"nrodocumento": nrodocumento,
		"fechafiltro": fechafiltro,
		"cod_local": cod_local,
		"tipoventa": tipoventa,
		"funt": "ganaciaventa"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
        //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_ganancias_venta").innerHTML = ''
			controldebusquedadGananciaPorVenta=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_ganancias_venta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
				var datos_buscados = datos[2];
				document.getElementById("inptTotalCostoGananciasVenta").value = datos[3];
					document.getElementById("inptTotalComisionGananciasVenta").value = datos[4];
					document.getElementById("inptTotalPagadoGananciasVenta").value = datos[5];
					document.getElementById("inptTotalEvaluacionGananciasVenta").value = datos[6];
					document.getElementById("inptTotalRegstroGananciasVenta").value = datos[7];
				document.getElementById("table_historial_ganancias_venta").innerHTML = datos_buscados
				document.getElementById("inptTotalVentaGananciasVenta").value = datos[8];
				 costoTotal= QuitarSeparadorMilValor(datos[3]);
				 VentaTotal=  QuitarSeparadorMilValor(datos[8]);
				 var ganancia =  VentaTotal - costoTotal ;
				document.getElementById("inptTotalGananciasVenta").value = separadordemilesnumero(ganancia)
				 	registrocargadogananciaporventa=datos[99];
					totalregistrogananciaporventa=datos[100];
				
						 if(totalregistrogananciaporventa>registrocargadogananciaporventa){
						 	var porce=((registrocargadogananciaporventa*100)/totalregistrogananciaporventa).toFixed(0)
	document.getElementById("divProgressGananciaPorVenta").style.width=porce+"%"
						 document.getElementById("table_historial_ganancias_venta").innerHTML += "<div id='table_historial_ganancias_venta_mas'></div>"
						  buscarmasgananciaventa();
					 }else{
						 controldebusquedadGananciaPorVenta=false
					 }
				}
			} catch (error) {
				controldebusquedadGananciaPorVenta=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

var costoTotal= 0;
var VentaTotal= 0;	
	
function buscarmasgananciaventa(c) {
	if(controlacceso("VERINFORMEDEGANANCIAPORVENTA","accion")==false){return;}
	var nroventa = document.getElementById('inptBuscarInfGananciaVenta1').value
	var cliente = document.getElementById('inptBuscarInfGananciaVenta2').value
	var nrodocumento = document.getElementById('inptBuscarInfGananciaVenta3').value
	var fechafiltro = document.getElementById('inptBuscarInfGananciaVenta4').value
	var fecha1 = document.getElementById('inptBuscarInfGananciaVentaF1').value
	var fecha2 = document.getElementById('inptBuscarInfGananciaVentaF2').value
	var cod_local = document.getElementById('inptlocalInformeGananciaporventa').value
	var tipoventa = document.getElementById('inptBuscarInfGananciaVenta5').value
	var SumaVenta = document.getElementById('inptTotalVentaGananciasVenta').value
	if (document.getElementById('checkHistorialGananciaVenta2').checked==true) {
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
	
	if(c=="1"){
		controldebusquedadGananciaPorVenta=true
	}
if(controldebusquedadGananciaPorVenta==false){
	return
}


controldebusquedadGananciaPorVenta=true
	document.getElementById("table_historial_ganancias_venta_mas").innerHTML = paginacargando
	document.getElementById("tbProcessGananciaPorVenta").style.display=""
	document.getElementById("divProgressGananciaPorVenta").style.backgroundColor=''
	var totalcostos=document.getElementById("inptTotalCostoGananciasVenta").value
	var totalcomision=document.getElementById("inptTotalComisionGananciasVenta").value
	var totalpagado=document.getElementById("inptTotalPagadoGananciasVenta").value
	var totalevaluacion=document.getElementById("inptTotalEvaluacionGananciasVenta").value
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nroventa": nroventa,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"costoTotal": costoTotal,
		"VentaTotal": SumaVenta,
		"cliente": cliente,
		"nrodocumento": nrodocumento,
		"fechafiltro": fechafiltro,
		"cod_local": cod_local,
		"tipoventa": tipoventa,
		"totalcostos": totalcostos,
		"totalcomision": totalcomision,
		"totalpagado": totalpagado,
		"totalevaluacion": totalevaluacion,
		"registrocargado": registrocargadogananciaporventa,
		"funt": "masganaciaventa"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
        //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_ganancias_venta_mas").innerHTML = ''
			document.getElementById("divProgressGananciaPorVenta").style.backgroundColor='#ff5722'
			controldebusquedadGananciaPorVenta=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_ganancias_venta_mas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
				var datos_buscados = datos[2];
				document.getElementById("inptTotalCostoGananciasVenta").value = datos[3];
					document.getElementById("inptTotalComisionGananciasVenta").value = datos[4];
					document.getElementById("inptTotalPagadoGananciasVenta").value = datos[5];
					document.getElementById("inptTotalEvaluacionGananciasVenta").value = datos[6];
					document.getElementById("inptTotalRegstroGananciasVenta").value = datos[7];
					document.getElementById("inptTotalVentaGananciasVenta").value = datos[8];
				document.getElementById("table_historial_ganancias_venta_mas").innerHTML = datos_buscados
				
				 var  costoTotal2= QuitarSeparadorMilValor(datos[3]);
				 var VentaTotal2=  QuitarSeparadorMilValor(datos[8]);
				 var ganancia =  VentaTotal2 - costoTotal2 ;
				document.getElementById("inptTotalGananciasVenta").value = separadordemilesnumero(ganancia)
				
				 	registrocargadogananciaporventa=datos[99];
					
						 if(totalregistrogananciaporventa>registrocargadogananciaporventa){
						 	var porce=((registrocargadogananciaporventa*100)/totalregistrogananciaporventa).toFixed(0)
	document.getElementById("divProgressGananciaPorVenta").style.width=porce+"%"
						 document.getElementById("table_historial_ganancias_venta_mas").innerHTML += "<div id='table_historial_ganancias_venta_mas'></div>"
						 document.getElementById("table_historial_ganancias_venta_mas").id=""
						  buscarmasgananciaventa();
					 }else{
						 document.getElementById("tbProcessGananciaPorVenta").style.display="none"
						 controldebusquedadGananciaPorVenta=false
					 }
				}
			} catch (error) {
				document.getElementById("divProgressGananciaPorVenta").style.backgroundColor='#ff5722'
				controldebusquedadGananciaPorVenta=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}


/*
VENTAS CANCELADAS 
*/
function verCerrarInformeVentasCanceladas(){
	document.getElementById("divSegundoPlano").style.display="none";
	var divVentasAnuladas = document.getElementById("divinfoVentasCanceladas");
	var tdVentasAnuladas = document.getElementById("tdInfoVentasCanceladas");
	if(document.getElementById("divinfoVentasCanceladas").style.display==""){
		 if(controldebusquedadVentasCanceladas==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoVentaCancelada").style.display="none"
		limpiarcamposventascanceladas()
		tdVentasAnuladas.className="magictime vanishOut"
	$("div[id=divinfoVentasCanceladas]").stop(true,true).fadeOut(500);	
	}else{		
	if(controlacceso("VERINFORMEDEVENTASCANCELADAS","accion")==false){return;}
	document.getElementById("divMinimizadoVentaCancelada").style.display="none"
	mostrarSoloUno("divinfoVentasCanceladas")	
	$("div[id=divinfoVentasCanceladas]").stop(true,true).css("opacity","")
		tdVentasAnuladas.className=""
		divVentasAnuladas.style.display="" 	
	}
}
function limpiarcamposventascanceladas(){	
 if(controldebusquedadVentasCanceladas==true){

	return
}
document.getElementById('inptBuscarInfVentasCanceladas1').value=""
 document.getElementById('inptBuscarInfVentasCanceladas2').value=""
 document.getElementById('inptBuscarInfVentasCanceladas3').value=""
 document.getElementById('inptlocalInformeVentaCanceladas').value=""
 document.getElementById('inptBuscarInfVentasCanceladasF1').value=""
 document.getElementById('inptBuscarInfVentasCanceladasF2').value=""
 document.getElementById('inptRegistroNroHistorialVentaCancelada').value=""
 document.getElementById('table_historial_venta_cancelado').innerHTML=""
 document.getElementById('tbProcessVentasCanceladas').style.display="none"
}
function minimizarventanacanceladas(){
	document.getElementById("divMinimizadoVentaCancelada").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuVentasCanceladas"));
	$("div[id=divinfoVentasCanceladas]").fadeOut(500);	
}
function checkHistorialVentasCanceladas(d){	
	if(d=="1"){
		document.getElementById('checkHistorialVentasCanceladas1').checked=true
		document.getElementById('checkHistorialVentasCanceladas2').checked=false
		document.getElementById('inptBuscarInfVentasCanceladasF1').value = "";
	    document.getElementById('inptBuscarInfVentasCanceladasF2').value = "";	
	}else{		
		document.getElementById('checkHistorialVentasCanceladas1').checked=false
		document.getElementById('checkHistorialVentasCanceladas2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInfVentasCanceladasF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInfVentasCanceladasF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

var registrocargadoventascanceladas="";
var totalregistroventascanceladas="";
var controldebusquedadVentasCanceladas=false
function cancelarVentasCanceladas(){
	controldebusquedadVentasCanceladas=false
	document.getElementById("divProgressVentasCanceladas").style.backgroundColor='#ff5722'
}

function buscarhistorialventaCancelada(){
	if(controlacceso("VERINFORMEDEVENTASCANCELADAS","accion")==false){return;}
  var filtrofecha=document.getElementById('inptBuscarInfVentasCanceladas1').value
 var nroventa=document.getElementById('inptBuscarInfVentasCanceladas2').value
 var cliente=document.getElementById('inptBuscarInfVentasCanceladas3').value
 var codlocal=document.getElementById('inptlocalInformeVentaCanceladas').value
 var fecha1=document.getElementById('inptBuscarInfVentasCanceladasF1').value
 var fecha2=document.getElementById('inptBuscarInfVentasCanceladasF2').value
 if(document.getElementById('checkHistorialVentasCanceladas2').checked==true){
	 if(fecha1==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		 return
	 }
	 if(fecha2==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		 return
	 }
 }else{
 fecha1=""
 fecha2=""
 }
 if(controldebusquedadVentasCanceladas==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
 controldebusquedadVentasCanceladas=true
		 document.getElementById("table_historial_venta_cancelado").innerHTML=paginacargando
		 document.getElementById("tbProcessVentasCanceladas").style.display="none"
		 	obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"filtrofecha": filtrofecha,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"nroventa": nroventa,
			"cliente": cliente,
			"codlocal": codlocal,
			"funt": "historialventacancelado"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
			type:"post",
			 
		
			beforeSend: function(){		
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_venta_cancelado").innerHTML=''
			controldebusquedadVentasCanceladas=false
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_venta_cancelado").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  Respuesta=respuestaJqueryAjax(Respuesta)
		if (Respuesta == true) {					
		    var datos_buscados=datos[2];
			document.getElementById("table_historial_venta_cancelado").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroHistorialVentaCancelada").value=datos[3];	
			registrocargadoventascanceladas=datos[99];
			totalregistroventascanceladas=datos[100];
 		 if(totalregistroventascanceladas>registrocargadoventascanceladas){
	 	var porce=((registrocargadoventascanceladas*100)/totalregistroventascanceladas).toFixed(0)
    	document.getElementById("divProgressVentasCanceladas").style.width=porce+"%"
	    document.getElementById("table_historial_venta_cancelado").innerHTML += "<div id='table_historial_mas_venta_cancelado'></div>"
				  buscarMashistorialventaCancelada();
					 }else{
						 controldebusquedadVentasCanceladas=false
					 }
			}
			}catch(error)
				{
					controldebusquedadVentasCanceladas=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});		
}
function buscarMashistorialventaCancelada(c){
	if(controlacceso("VERINFORMEDEVENTASCANCELADAS","accion")==false){return;}
  var filtrofecha=document.getElementById('inptBuscarInfVentasCanceladas1').value
 var nroventa=document.getElementById('inptBuscarInfVentasCanceladas2').value
 var cliente=document.getElementById('inptBuscarInfVentasCanceladas3').value
 var codlocal=document.getElementById('inptlocalInformeVentaCanceladas').value
 var fecha1=document.getElementById('inptBuscarInfVentasCanceladasF1').value
 var fecha2=document.getElementById('inptBuscarInfVentasCanceladasF2').value
 if(document.getElementById('checkHistorialVentasCanceladas2').checked==true){
	 if(fecha1==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		 return
	 }
	 if(fecha2==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		 return
	 }
 }else{
 fecha1=""
 fecha2=""
 }
 if(c=="1"){
	 controldebusquedadVentasCanceladas=true
 }
 if(controldebusquedadVentasCanceladas==false){
	return
}
 controldebusquedadVentasCanceladas=true
		 document.getElementById("table_historial_mas_venta_cancelado").innerHTML=paginacargando
		 document.getElementById("tbProcessVentasCanceladas").style.display=""
		 document.getElementById("divProgressVentasCanceladas").style.backgroundColor=''
		 	obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"filtrofecha": filtrofecha,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"nroventa": nroventa,
			"cliente": cliente,
			"codlocal": codlocal,
			"registrocargado": registrocargadoventascanceladas,
			"funt": "mashistorialventacancelado"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
			type:"post",
			 
		
			beforeSend: function(){		
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_mas_venta_cancelado").innerHTML=''
			document.getElementById("divProgressVentasCanceladas").style.backgroundColor='#ff5722'
			controldebusquedadVentasCanceladas=false
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_mas_venta_cancelado").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  Respuesta=respuestaJqueryAjax(Respuesta)
		if (Respuesta == true) {					
		    var datos_buscados=datos[2];
			document.getElementById("table_historial_mas_venta_cancelado").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroHistorialVentaCancelada").value=datos[3];	
			registrocargadoventascanceladas=datos[99];
			
 		 if(totalregistroventascanceladas>registrocargadoventascanceladas){
	 	var porce=((registrocargadoventascanceladas*100)/totalregistroventascanceladas).toFixed(0)
    	document.getElementById("divProgressVentasCanceladas").style.width=porce+"%"
	    document.getElementById("table_historial_mas_venta_cancelado").innerHTML += "<div id='table_historial_mas_venta_cancelado'></div>"
		document.getElementById("table_historial_mas_venta_cancelado").id=""
				  buscarMashistorialventaCancelada();
					 }else{
						 document.getElementById("tbProcessVentasCanceladas").style.display="none"
						 controldebusquedadVentasCanceladas=false
					 }
			}
			}catch(error)
				{
					document.getElementById("divProgressVentasCanceladas").style.backgroundColor='#ff5722'
					controldebusquedadVentasCanceladas=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});		
}


/*
ORDENES DE IMPRESION
*/
var nroventasticket="";
var nombreapellidoticket="";
var nrodocumentoticket="";
var paginadetalleticket="";
var totalventaticket="";
var subtotalventaticket="";
var descuentoticket=""
var totaldeudaticket="";
var saldoticket="";
var cuotasrestanteticket=""
var totalventaticke="";
function imprimirticketventa(){
	
}







/*
CONTROL DE RESPUESTAJQUERE
*/
function respuestaJqueryAjax(Respuesta){
	if (Respuesta == "UI") {
    ir_a_login()
	ver_vetana_informativa("USUARIO INCORRECTO VUELVA A INICIAR SESION...")
	return false;
	}
    if (Respuesta == "NI") {
	ver_vetana_informativa("NO TIENES PERMISO PARA CONTINUA")
	return false;
    }
	if (Respuesta == "CI") {
	ver_vetana_informativa("CONTRASEÑA O USUARIO INVÁLIDOS")
	return false;
    }
	if (Respuesta == "CAMPOSVACIOS") {
    ver_vetana_informativa("FALTO INGRESAR ALGUNOS CAMPOS...")
	return false;
    }
	if(Respuesta == "EX") {
    ver_vetana_informativa("YA EXISTE UN REGISTRO SIMILAR...")
	return false;
    }
	if (Respuesta == "exito") {
	return true;
    }
	
	if(Respuesta == "EXPR") {
    ver_vetana_informativa("YA EXISTE UN PRODUCTO SIMILAR...")
	return false;
    }
	
	if(Respuesta == "EXDT") {
    ver_vetana_informativa("YA EXISTE UN DATO SIMILAR...")
	return false;
    }
	
	if(Respuesta == "EXDES") {
    ver_vetana_informativa("YA EXISTE UNA SOLICITUD PARA ESE CLIENTE PENDIENTE O APROBADO")
	return false;
    }
	
}
/*
Control de acceso 
*/
function controlacceso(frm,accion){ 

	if(accesosuser[frm][accion]!= "SI"){
		ver_vetana_informativa("NO TIENES PERMISO PARA ACCEDER")
		  return false;
	}else{
		return true;
	}
}



function controlacceso2(frm,accion){

	// Los catálogos y formularios pueden terminar de montar antes que la
	// consulta de permisos. En ese intervalo el acceso debe quedar denegado,
	// pero nunca interrumpir la inicialización con un TypeError.
	if (
		typeof accesosuser !== "object" ||
		accesosuser === null ||
		typeof accesosuser[frm] !== "object" ||
		accesosuser[frm] === null ||
		accesosuser[frm][accion] != "SI"
	) {
		return false;
	}else{
		return true;
	}
}

/*
GUARDAR ARCHIVOS LOG
*/
function GuardarArchivosLog(errorlog)
{
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	var hora = f.getHours() 
    var minuto = f.getMinutes() 
    var segundo = f.getSeconds() 
	var archivoname = f.getFullYear() + "_" + mes + "_" + dia+"_"+hora+"_"+minuto+"_"+segundo;
	var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blob = new File([errorlog], "log_"+archivoname+".txt");
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = blob.name;
    a.click();
    window.URL.revokeObjectURL(url);
    
}



var kbenviado=0;
var kbrecibido=0;
function cargarConectividad(datos,s,b){
	if(datos=="error"){
		kbenviado=0
		kbrecibido=0
		document.getElementById("pConectivida1").innerHTML=kbenviado+"/"+kbrecibido
		document.getElementById("imgConectividad1").style.display="none"
		document.getElementById("imgConectividad2").style.display=""
	}
	
	if(datos=="limipiar"){
		kbenviado=0
		kbrecibido=0
		//document.getElementById("pConectivida1").innerHTML=" - / -"
	}
	if(datos=="enviado"){
		kbenviado=s
		document.getElementById("pConectivida1").innerHTML=kbenviado+"/ - Kb"
		document.getElementById("imgConectividad1").style.display=""
		document.getElementById("imgConectividad2").style.display="none"
	}
	if(datos=="recibido"){
		kbrecibido=b
		document.getElementById("pConectivida1").innerHTML=kbenviado+"/"+kbrecibido+" Kb"
		document.getElementById("imgConectividad1").style.display=""
		document.getElementById("imgConectividad2").style.display="none"
		//
	}
	
}

function obtenerTotalKbTables(idTable){
	 var string=document.getElementById(idTable).innerHTML
	 var kb=new Blob([string]).size;
	 return kb
	
}


function buscararqueo2() {
	var listado = iniciarListadoCobrosRealizados();
	var cobrador = document.getElementById('inptBuscarCobrosRealizados4').value
	var cobradorasig = document.getElementById('inptBuscarCobrosRealizados8').value
	var cliente = document.getElementById('inptBuscarCobrosRealizados1').value
	var fechafija = document.getElementById('inptBuscarCobrosRealizados3').value
	var fecha1 = document.getElementById('inptBuscarCobrosRealizadosF1').value
	var fecha2 = document.getElementById('inptBuscarCobrosRealizadosF2').value
	var factura = document.getElementById('inptBuscarCobrosRealizados2').value
	var local = document.getElementById('inptlocalCobrosRealizados3').value
	var metodo = document.getElementById('inptBuscarCobrosRealizados5').value
	var tipo = document.getElementById('inptBuscarCobrosRealizados7').value
	var condicion = document.getElementById('inptBuscarCobrosRealizados6').value
	var fecha_venc = document.getElementById('inptBuscarCobrosRealizadoFechaVenc').value
	var tiempo_cobro = document.getElementById('inptPagoAdelantadoCobrosRealizados').value
	var codMoraCliente = document.getElementById('inptMorosidadCobrosRealizado').value
	var tipocredito = document.getElementById('inptBuscarCobrosRealizados9').value
	var tipo_cliente = document.getElementById('inptTipoClienteCobrosRealizado').value
	var tipo_comprobante = document.getElementById('inptCobrosRealizadosComprobante').value
	
	
	var Entrega = "NO";	
	if(document.getElementById('checkfiltrosCobrosRealizadosEntrega').checked==true){
		Entrega='SI'
	}
	
	document.getElementById("btnEliminarCobros1").style.backgroundColor="#ccc"
   idHistorialPago = "";
	document.getElementById("table_arqeo").innerHTML = paginacargando
	renderResumenTiposPagoCobrosRealizados([], true);
	
	
	obtener_datos_user();
	var cod_cobradorFK = CodCobradorUser;
	if(controlaccesoDescuento("VERTODOSCOBROS","accion")!=false){
		cod_cobradorFK = "";
	}
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"fecha_venc": fecha_venc,
		"cobrador": cobrador,
		"cobradorasig": cobradorasig,
		"cliente": cliente,
		"factura": factura,
		"fechafija": fechafija,
		"metodo": metodo,
		"local": local,
		"condicion": condicion,
		"tipo": tipo,
		"cod_cobradorFK": cod_cobradorFK,
		"codCaja": "",
		"tiempo_cobro": tiempo_cobro,
		"codMoraCliente": codMoraCliente,
		"Entrega": tipocredito,
		"tipo_cliente": tipo_cliente,
		"tipo_comprobante": tipo_comprobante,
		"formato": listado ? "json" : "",
		"desde": "arqueo2",
		"funt": "arqueo"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_arqeo").innerHTML = ''
			renderResumenTiposPagoCobrosRealizados([], true);
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_arqeo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
					else document.getElementById("table_arqeo").innerHTML = datos[2] || "";
					document.getElementById("inptTotalArqueo").value = datos[3]
					document.getElementById("inptTotalRegistoArqueo").value = datos[4]
					document.getElementById("inptTotalEfectivoArqueo").value = datos[5]
					document.getElementById("inptTotalTarjetaArqueo").value = datos[6]
					
					document.getElementById("inptTotalClienteArqueo").value = datos[7]
					renderResumenTiposPagoCobrosRealizados(Array.isArray(datos[8]) ? datos[8] : [], false);
		
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function buscararqueo3() {
	var listado = iniciarListadoCobrosRealizados();
	var cobrador = ""
	var cliente = ""
	var fechafija = ""
	var fecha1 = ""
	var fecha2 = ""
	var factura = ""
	var local = ""
	var metodo = ""
	var codCaja=codCajaApp
	
	var cobradorasig = ""
	var tiempo_cobro = ""
	var codMoraCliente = ""
	
	var fecha_venc = ""
	var condicion = ""
	var tipo = ""
	
	var Entrega = "NO";	
	if(document.getElementById('checkfiltrosCobrosRealizadosEntrega').checked==true){
		Entrega='SI'
	}
	
	
	var cod_cobradorFK = CodCobradorUser;
	if(controlaccesoDescuento("VERTODOSCOBROS","accion")!=false){
		cod_cobradorFK = "";
	}

 idHistorialPago = "";
	document.getElementById("btnEliminarCobros1").style.backgroundColor="#ccc"
	document.getElementById("table_arqeo").innerHTML = paginacargando
	renderResumenTiposPagoCobrosRealizados([], true);
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrador": cobrador,
		"cobradorasig": cobradorasig,
		"cliente": cliente,
		"factura": factura,
		"fechafija": fechafija,
		"metodo": metodo,
		"local": local,
		"codCaja": codCaja,
		"tiempo_cobro": tiempo_cobro,
		"codMoraCliente": codMoraCliente,
		"Entrega": Entrega,
		"fecha_venc": fecha_venc,
		"condicion": condicion,
		"tipo": tipo,
		"tipo_cliente": tipo,
		"cod_cobradorFK": cod_cobradorFK,
		"formato": listado ? "json" : "",
		"desde": "arqueo3",
		"funt": "arqueo"
		
	
		
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_arqeo").innerHTML = ''
			renderResumenTiposPagoCobrosRealizados([], true);
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_arqeo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
					else document.getElementById("table_arqeo").innerHTML = datos[2] || "";
					document.getElementById("inptTotalArqueo").value = datos[3]
					document.getElementById("inptTotalRegistoArqueo").value = datos[4]
					document.getElementById("inptTotalEfectivoArqueo").value = datos[5]
					document.getElementById("inptTotalTarjetaArqueo").value = datos[6]
					document.getElementById("inptTotalClienteArqueo").value = datos[7]
					renderResumenTiposPagoCobrosRealizados(Array.isArray(datos[8]) ? datos[8] : [], false);
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/*CARGAR DRIVER IMPRESION*/
function guardarendriverimpresion(codigo, tipo,estado, caja, local, diasa, subtotal,descuento,totalpagado,interespagado,totalInteres,saldointeres,saldo,NroCuotas,montopagado,nrorecibopago,cod_usuarioFK) {

	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "nuevo")
	datos.append("codigo", codigo)
	datos.append("tipo", tipo)
	datos.append("estado", estado)
	datos.append("caja", caja)
	datos.append("local", local)
	datos.append("diasa", diasa)
	datos.append("subtotal", subtotal)
	datos.append("descuento", descuento)
	datos.append("totalpagado", totalpagado)
	datos.append("interespagado", interespagado)
	datos.append("totalInteres", totalInteres)
	datos.append("saldointeres", saldointeres)
	datos.append("saldo", saldo)
	datos.append("NroCuotas", NroCuotas)
	datos.append("montopagado", montopagado)
	datos.append("nrorecibopago", nrorecibopago)
	datos.append("cod_usuarioFK", cod_usuarioFK)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/driverimpresion.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
			 
		
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmconfirmarpago")
            controlInsercionPagos=false
			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("")
			Respuesta = responseText;
			console.log(Respuesta)
			controlInsercionPagos=false
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];

				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				
				
					
				
				}
				

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function verCerrarInformeEntregaCobrador(){
	if(document.getElementById("divEntregaCobrador").style.display==""){
		
		//document.getElementById("divEntregaCobrador").style.display="none"
		 mostrarSoloUno("divEntregaCobrador")	
	$("div[id=divEntregaCobrador]").fadeOut(500);	
		
	}else{		
	if(controlacceso("COBROSREALIZADOS","accion")==false){
	   	   //SIN PERMISO
	   return;
		}
		document.getElementById("divEntregaCobrador").style.display=""
		 
		
	}
}

function CrearProductoCompra(){
	
	document.getElementById("divAbmProducto").style.display=""

	document.getElementById("imgCerrarProducto").style.display=""
	document.getElementById("imgMinimizaeProducto").style.display="none"
	document.getElementById('divAbmProducto1').style.display = "none"
	document.getElementById('divAbmProducto2').style.display = ""
		//  
	limpiarcamposproducto()
	
}

function vercerrarventanactualizacion(d){
	if(d=="1"){
		document.getElementById("divActualizarSistema").style.display=""
		  
	}else{
		//document.getElementById("divActualizarSistema").style.display="none"
		 
	$("div[id=divActualizarSistema]").fadeOut(500);	
	}
	
}


 /*
LISTA DE ACCESOS
*/

var idAbmListaAccesos="";
var ControlVistaListaAccesos=""
var nombreformulario=""
function verCerrarFrmListaAccesos(d){
	  document.getElementById("divSegundoPlano").style.display="none"	
	if(controlacceso("VERLISTADODEACCESO","accion")==false){ return;}
	
	if(d=="1"){
		
	document.getElementById("divAbmListaAccesos").style.display=""
	
	}else{
	$("div[id=divAbmListaAccesos]").fadeOut(500);	
	LimpiarCamposListaAccesos()
	LimpiarCamposBusquedaListaAccesos()
	}
}
function LimpiarCamposListaAccesos(){
	document.getElementById("inptRegistroSeleccionadoListadoAcceso").value=""
	document.getElementById("inptRegistroSeleccionadoFormListadoAcceso").value=""
	
	idAbmListaAccesos=""
	nombreformulario=""
	
	document.getElementById("btnEditarNombreAcceso").style.backgroundColor="#b5f5b7"
     document.getElementById("btnEditarNombreFormulario").style.backgroundColor="#b5f5b7"
}
function LimpiarCamposBusquedaListaAccesos(){
	document.getElementById("inptBuscarListaAccesos1").value=""
	document.getElementById("divBuscadorListaAccesos").innerHTML=""
	
}

function limpiarNodoListadoPermisos(nodo) {
	while (nodo && nodo.firstChild) {
		nodo.removeChild(nodo.firstChild);
	}
}

function crearTablaListadoPermisos(indice) {
	var tabla = document.createElement("table");
	tabla.className = indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	return tabla;
}

function crearCeldaListadoPermisos(valor, id, ancho, oculta) {
	var celda = document.createElement("td");
	if (id) {
		celda.id = id;
	}
	if (oculta === true) {
		celda.style.display = "none";
	} else if (ancho) {
		celda.style.width = ancho;
	}
	if (valor !== null && typeof valor !== "undefined") {
		celda.textContent = String(valor);
	}
	return celda;
}

function agregarTituloGrupoListadoPermisos(fragmento, formulario) {
	var titulo = document.createElement("p");
	titulo.className = "ptituloZ";
	titulo.textContent = formulario == null ? "" : String(formulario);
	fragmento.appendChild(titulo);
}

function renderizarListaAccesos(registros) {
	var contenedor = document.getElementById("divBuscadorListaAccesos");
	if (!contenedor) {
		return;
	}
	limpiarNodoListadoPermisos(contenedor);
	var lista = Array.isArray(registros) ? registros : [];
	var fragmento = document.createDocumentFragment();
	var formularioAnterior = null;

	lista.forEach(function (registro, indice) {
		var formulario = registro.formulario == null ? "" : String(registro.formulario);
		if (indice === 0 || formularioAnterior !== formulario) {
			agregarTituloGrupoListadoPermisos(fragmento, formulario);
			formularioAnterior = formulario;
		}

		var tabla = crearTablaListadoPermisos(indice);
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.addEventListener("click", function () {
			ObtenerdatosAbmListaAccesos(fila);
		});
		fila.appendChild(crearCeldaListadoPermisos(registro.idlistadodeacceso, "td_id", "", true));

		var celdaOrden = crearCeldaListadoPermisos("", "", "10%", false);
		var inputOrden = document.createElement("input");
		inputOrden.type = "text";
		inputOrden.className = "input3";
		inputOrden.id = registro.idlistadodeacceso == null ? "" : String(registro.idlistadodeacceso);
		inputOrden.value = registro.orden == null ? "" : String(registro.orden);
		inputOrden.style.width = "80px";
		inputOrden.style.textAlign = "center";
		inputOrden.addEventListener("keyup", function (event) {
			if (event.keyCode === 13) {
				guardarordenlistadoacceso(inputOrden);
			}
		});
		celdaOrden.appendChild(inputOrden);
		fila.appendChild(celdaOrden);

		var celdaNombre = crearCeldaListadoPermisos(registro.nombre, "td_datos_1", "90%", false);
		celdaNombre.style.textAlign = "left";
		celdaNombre.style.paddingLeft = "10px";
		fila.appendChild(celdaNombre);
		fila.appendChild(crearCeldaListadoPermisos(formulario, "td_datos_2", "", true));
		tabla.appendChild(fila);
		fragmento.appendChild(tabla);
	});

	contenedor.appendChild(fragmento);
}

function renderizarListaNiveles(registros) {
	var contenedor = document.getElementById("divBuscadorListaNiveles");
	if (!contenedor) {
		return;
	}
	limpiarNodoListadoPermisos(contenedor);
	var lista = Array.isArray(registros) ? registros : [];
	var fragmento = document.createDocumentFragment();

	lista.forEach(function (registro, indice) {
		var tabla = crearTablaListadoPermisos(indice);
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.addEventListener("click", function () {
			ObtenerdatosAbmListaNiveles(fila);
		});
		fila.appendChild(crearCeldaListadoPermisos(registro.cod_niveles, "td_id", "", true));
		fila.appendChild(crearCeldaListadoPermisos(registro.nombre, "td_datos_1", "60%", false));
		fila.appendChild(crearCeldaListadoPermisos(registro.estado, "td_datos_2", "", true));
		tabla.appendChild(fila);
		fragmento.appendChild(tabla);
	});

	contenedor.appendChild(fragmento);
}

function renderizarDetallesAccesoListaNiveles(registros) {
	var contenedor = document.getElementById("divBuscadorDetallesAccesoListaNiveles");
	if (!contenedor) {
		return;
	}
	limpiarNodoListadoPermisos(contenedor);
	var lista = Array.isArray(registros) ? registros : [];
	var fragmento = document.createDocumentFragment();
	var formularioAnterior = null;

	lista.forEach(function (registro, indice) {
		var formulario = registro.formulario == null ? "" : String(registro.formulario);
		if (indice === 0 || formularioAnterior !== formulario) {
			agregarTituloGrupoListadoPermisos(fragmento, formulario);
			formularioAnterior = formulario;
		}

		var tabla = crearTablaListadoPermisos(indice);
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		var celdaNombre = crearCeldaListadoPermisos(registro.nombre, "td_datos_7", "70%", false);
		celdaNombre.style.textAlign = "left";
		celdaNombre.style.paddingLeft = "10px";
		fila.appendChild(celdaNombre);

		var celdaAccion = crearCeldaListadoPermisos("", "td_datos_2", "20%", false);
		var checkAcceso = document.createElement("input");
		checkAcceso.type = "checkbox";
		checkAcceso.id = registro.iddetallesniveles == null ? "" : String(registro.iddetallesniveles);
		checkAcceso.checked = String(registro.accion || "").toUpperCase() === "SI";
		checkAcceso.addEventListener("click", function () {
			abmaccesolistanivel(checkAcceso);
		});
		celdaAccion.appendChild(checkAcceso);
		fila.appendChild(celdaAccion);
		tabla.appendChild(fila);
		fragmento.appendChild(tabla);
	});

	contenedor.appendChild(fragmento);
	actualizarEstadoMarcarTodosDetallesAcceso();
}

function obtenerChecksDetallesAccesoVisibles() {
	var contenedor = document.getElementById("divBuscadorDetallesAccesoListaNiveles");
	if (!contenedor) {
		return [];
	}
	return Array.prototype.slice.call(
		contenedor.querySelectorAll("input[type='checkbox'][id]")
	);
}

function actualizarEstadoMarcarTodosDetallesAcceso() {
	var checkTodos = document.getElementById("checkMarcarTodosDetallesAcceso");
	if (!checkTodos) {
		return;
	}
	var checks = obtenerChecksDetallesAccesoVisibles();
	var marcados = checks.filter(function (check) {
		return check.checked;
	}).length;
	checkTodos.disabled = checks.length === 0;
	checkTodos.checked = checks.length > 0 && marcados === checks.length;
	checkTodos.indeterminate = marcados > 0 && marcados < checks.length;
}

function marcarTodosDetallesAcceso(checkTodos) {
	if (controlacceso("VERLISTADODENIVELES", "accion") == false) {
		actualizarEstadoMarcarTodosDetallesAcceso();
		return;
	}
	var checks = obtenerChecksDetallesAccesoVisibles();
	var ids = checks.map(function (check) {
		return check.id;
	}).filter(function (id) {
		return id !== "";
	});
	if (ids.length === 0) {
		actualizarEstadoMarcarTodosDetallesAcceso();
		return;
	}

	var accion = checkTodos.checked ? "SI" : "NO";
	checkTodos.disabled = true;
	checks.forEach(function (check) {
		check.disabled = true;
	});
	verCerrarEfectoCargando("1");
	obtener_datos_user();

	var datos = new FormData();
	datos.append("usuarios_idusario", userid);
	datos.append("useru", userid);
	datos.append("passu", passuser);
	datos.append("navegador", navegador);
	datos.append("funt", "editaraccesosmasivo");
	datos.append("ids", JSON.stringify(ids));
	datos.append("idAbmListaNiveles", idAbmListaNiveles);
	datos.append("acciones", accion);

	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoNiveles.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("");
			checks.forEach(function (check) {
				check.disabled = false;
			});
			actualizarEstadoMarcarTodosDetallesAcceso();
			manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");
		},
		success: function (responseText) {
			verCerrarEfectoCargando("");
			try {
				var respuesta = $.parseJSON(responseText);
				if (respuestaJqueryAjax(respuesta["1"]) == true) {
					checks.forEach(function (check) {
						check.checked = accion === "SI";
						check.disabled = false;
					});
					actualizarEstadoMarcarTodosDetallesAcceso();
					ver_vetana_informativa("ACCESOS ACTUALIZADOS CORRECTAMENTE");
					return;
				}
			} catch (error) {
				GuardarArchivosLog("Error: " + error + " \r\n Consola: " + responseText);
			}
			checks.forEach(function (check) {
				check.disabled = false;
			});
			actualizarEstadoMarcarTodosDetallesAcceso();
			ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR");
		}
	});
}

function ObtenerdatosAbmListaAccesos(datostr) {


	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
		
	datostr.className = 'tableRegistroSelec'
	idAbmListaAccesos = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptRegistroSeleccionadoListadoAcceso').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccionadoFormListadoAcceso').value = $(datostr).children('td[id="td_datos_2"]').html();
	nombreformulario = $(datostr).children('td[id="td_datos_2"]').html();

     document.getElementById("btnEditarNombreAcceso").style.backgroundColor="#4CAF50"
     document.getElementById("btnEditarNombreFormulario").style.backgroundColor="#4CAF50"



}
function VerificarDatosListaAccesos1(){
	
	var inptRegistroSeleccionadoListadoAcceso = document.getElementById("inptRegistroSeleccionadoListadoAcceso").value
	
	if(inptRegistroSeleccionadoListadoAcceso==""){
		document.getElementById("inptRegistroSeleccionadoListadoAcceso").focus()
		ver_vetana_informativa("Falto ingresar el nombre")
		return
	}
	
	
	var accion = "editarnombreacceso";
		if(controlacceso("VERLISTADODEACCESO","accion")==false){ return;}
	
	AbmListaNombreAccesos(inptRegistroSeleccionadoListadoAcceso,idAbmListaAccesos, accion)
}
function AbmListaNombreAccesos(nombre,idabm, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("nombre", nombre)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoacceso.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
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
		
                   LimpiarCamposListaAccesos()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmListaAccesos()
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function guardarordenlistadoacceso(datos) {
	verCerrarEfectoCargando("1")
	var idabm=datos.id
	var orden=datos.value
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editarorden")
	datos.append("idabm", idabm)
	datos.append("orden", orden)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoacceso.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
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
		
                   LimpiarCamposListaAccesos()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmListaAccesos()
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function VerificarDatosListaAccesos2(){
	
	var inptRegistroSeleccionadoFormListadoAcceso = document.getElementById("inptRegistroSeleccionadoFormListadoAcceso").value
	
	if(inptRegistroSeleccionadoFormListadoAcceso==""){
		document.getElementById("inptRegistroSeleccionadoFormListadoAcceso").focus()
		ver_vetana_informativa("Falto ingresar el nombre")
		return
	}
	
	
	var accion = "editarnombreformulario";
	
	
	AbmListaFormularioAccesos(inptRegistroSeleccionadoFormListadoAcceso,nombreformulario, accion)
}
function AbmListaFormularioAccesos(nombre,idabm, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("nombre", nombre)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoacceso.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
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
		
                   LimpiarCamposListaAccesos()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmListaAccesos()
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function BuscarAbmListaAccesos() {
if(controlacceso("VERLISTADODEACCESO","accion")==false){ return;}
	var nombre = document.getElementById('inptBuscarListaAccesos1').value
	document.getElementById("divBuscadorListaAccesos").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": nombre,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoacceso.php",
		type: "post",
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarNodoListadoPermisos(document.getElementById("divBuscadorListaAccesos"))
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			limpiarNodoListadoPermisos(document.getElementById("divBuscadorListaAccesos"))
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
		       if (Respuesta == true) {

					var datos_buscados = datos[2];
					if (!Array.isArray(datos_buscados)) {
						throw new Error("Listado de Accesos no devolvio un array de registros");
					}
					renderizarListaAccesos(datos_buscados)
                  
				  
					if(datos_buscados.length===0){
					   ver_vetana_informativa("NO ENCONTRARON REGISTROS COINCIDENTES")
				   }
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function VerCerrarAddAccesos(d){
	document.getElementById("divAbmNuevoAcceso").style.display="none"
	if(d=="1"){
		document.getElementById("divAbmNuevoAcceso").style.display=""
	}
	
}
function LimpiarCamposAddAcceso(){
	document.getElementById("inptCodigoAcceso").value=""
	document.getElementById("inptNombreAcceso").value=""
	document.getElementById("inptAccesoAcceso").value=""
	document.getElementById("inptOrdenAcceso").value=""
	document.getElementById("inptFormularioAcceso").value=""
}
function VerificarAddDatosAccesos(){
	
	var inptCodigoAcceso = document.getElementById("inptCodigoAcceso").value
	var inptNombreAcceso = document.getElementById("inptNombreAcceso").value
	var inptAccesoAcceso = document.getElementById("inptAccesoAcceso").value
	var inptOrdenAcceso = document.getElementById("inptOrdenAcceso").value
	var inptFormularioAcceso = document.getElementById("inptFormularioAcceso").value
	
	if(inptOrdenAcceso==""){
		document.getElementById("inptOrdenAcceso").focus()
		ver_vetana_informativa("Falto ingresar orden")
		return
	}
	if(inptFormularioAcceso==""){
		document.getElementById("inptFormularioAcceso").focus()
		ver_vetana_informativa("Falto ingresar el formulario")
		return
	}
	if(inptCodigoAcceso==""){
		document.getElementById("inptCodigoAcceso").focus()
		ver_vetana_informativa("Falto ingresar el codigo")
		return
	}
	if(inptNombreAcceso==""){
		document.getElementById("inptNombreAcceso").focus()
		ver_vetana_informativa("Falto ingresar el nombre")
		return
	}
	if(inptAccesoAcceso==""){
		document.getElementById("inptAccesoAcceso").focus()
		ver_vetana_informativa("Falto seleccionar el acceso")
		return
	}
	
	
	var accion = "addAcceso";	
	AbmAddAccesos(inptFormularioAcceso,inptOrdenAcceso,inptCodigoAcceso,inptNombreAcceso,inptAccesoAcceso, accion)
}
function AbmAddAccesos(formulario,orden,codigo,nombre,acceso, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("codigo", codigo)
	datos.append("nombre", nombre)
	datos.append("acceso", acceso)
	datos.append("orden", orden)
	datos.append("formulario", formulario)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoacceso.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
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
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

/* ELIMINAR UN ACCESO */
function eliminarAcceso() {
	if(idAbmListaAccesos === ''){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ACCESO")
		return;
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "eliminarAcceso")
	datos.append("idlistadoacceso", idAbmListaAccesos)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoacceso.php",
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
idAbmListaAccesos = "";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmListaAccesos()
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}



  /*
LISTA DE NIVELES
*/
var idAbmListaNiveles="";
var ControlVistaListaNiveles=""
function verCerrarFrmListaNiveles(d){
	
	  document.getElementById("divSegundoPlano").style.display="none"	
	if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	
	if(d=="1"){
	
	document.getElementById("divAbmListaNiveles").style.display="";
 
	
	}else{
	//document.getElementById("divAbmListaNiveles").style.display="none";
 
	$("div[id=divAbmListaNiveles]").fadeOut(500);
	LimpiarCamposListaNiveles()
	LimpiarCamposBusquedaListaNiveles()
	}
}
function NuevoListaNivelesFrm(){
	if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
		document.getElementById("divAbmListaNiveles1").style.display="none"
		document.getElementById("divAbmListaNiveles2").style.display=""
		LimpiarCamposListaNiveles()
}
function EditarListaNivelesFrm(){
	if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	if(idAbmListaNiveles==""){		
		ver_vetana_informativa("Falto seleccionar un registro")
		return
	}
		document.getElementById("divAbmListaNiveles1").style.display="none"
		document.getElementById("divAbmListaNiveles2").style.display=""
		
}
function BuscarListaNivelesFrm(){

		document.getElementById("divAbmListaNiveles1").style.display=""
		document.getElementById("divAbmListaNiveles2").style.display="none"
}
function LimpiarCamposListaNiveles(){
	document.getElementById("inptNombreListaNiveles").value=""
	document.getElementById("inptEstadoListaNiveles").value="Activo"
	document.getElementById("inptRegistroSeleccionadoListaNiveles").value=""
	document.getElementById("btnEditarDatosListaNiveles").style.backgroundColor='#b5f5b7'
     document.getElementById("btnEliminarDatosListaNiveles").style.backgroundColor='#ffcece'
     document.getElementById("btnDetallesDatosListaNiveles").style.backgroundColor='#aad9ff'
	idAbmListaNiveles=""
	document.getElementById("btnAbmListaNiveles").value="Guardar Datos"
}
function LimpiarCamposBusquedaListaNiveles(){
	document.getElementById("inptBuscarListaNiveles1").value=""
	document.getElementById("divBuscadorListaNiveles").innerHTML=""
	document.getElementById("lblNroRegistroListaNiveles").innerHTML=""
}
function ObtenerdatosAbmListaNiveles(datostr) {


	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
		
	datostr.className = 'tableRegistroSelec'
	idAbmListaNiveles = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptRegistroSeleccionadoListaNiveles').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNombreListaNiveles').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoListaNiveles').value = $(datostr).children('td[id="td_datos_2"]').html();
     document.getElementById("btnEditarDatosListaNiveles").style.backgroundColor='#4CAF50'
     document.getElementById("btnEliminarDatosListaNiveles").style.backgroundColor='red'
     document.getElementById("btnDetallesDatosListaNiveles").style.backgroundColor='#40a7fb'
     document.getElementById("btnAbmListaNiveles").value="Editar Datos"



}
function EliminarRegitroListaNiveles(){
		if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	if(idAbmListaNiveles==""){		
		ver_vetana_informativa("Falto seleccionar un registro")
		return
	}
	if(confirm("Estas seguro que quieres eliminar el registro seleccionado")){
		 document.getElementById("inptEstadoListaNiveles").value="Inactivo";
	VerificarDatosListaNiveles()
	}

}
function VerificarDatosListaNiveles(){
	
	var inptNombreListaNiveles = document.getElementById("inptNombreListaNiveles").value
	var inptEstadoListaNiveles = document.getElementById("inptEstadoListaNiveles").value
	
	
	

	if(inptNombreListaNiveles==""){
		document.getElementById("inptNombreListaNiveles").focus()
		ver_vetana_informativa("Falto ingresar el nombre de la filial")
		return
	}
	
	var accion = "";
	if (idAbmListaNiveles != "") {
		accion = "editar";
		if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	}
	AbmListaNiveles(inptNombreListaNiveles,inptEstadoListaNiveles,idAbmListaNiveles, accion)
}
function AbmListaNiveles(nombre,estado, idabm, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("nombre", nombre)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoNiveles.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
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
				   LimpiarCamposListaNiveles()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmListaNiveles()
					BuscarNivelesSelect()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function checkestadoListadoAcceso(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoListadoAcceso1').checked=true
	document.getElementById('inptSeleccEstadoListadoAcceso2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoListadoAcceso1').checked=false
	document.getElementById('inptSeleccEstadoListadoAcceso2').checked=true
	}
}
function BuscarAbmListaNiveles() {
	if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	var buscador = document.getElementById('inptBuscarListaNiveles1').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoListadoAcceso1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("divBuscadorListaNiveles").innerHTML = paginacargando
  
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoNiveles.php",
		type: "post",
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarNodoListadoPermisos(document.getElementById("divBuscadorListaNiveles"))
		
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			limpiarNodoListadoPermisos(document.getElementById("divBuscadorListaNiveles"))
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
		       if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (!Array.isArray(datos_buscados)) {
						throw new Error("Lista de Niveles no devolvio un array de registros");
					}
					renderizarListaNiveles(datos_buscados)
if(datos_buscados.length===0){
					   ver_vetana_informativa("NO ENCONTRARON REGISTROS COINCIDENTES")
				   }
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function verCerrarFrmDetallesAccesoListaNiveles(d){
		if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	if(d=="1"){
	if(idAbmListaNiveles==""){
			ver_vetana_informativa("Falto seleccionar un registro")
		return false;
	}
	document.getElementById("divDetallesAccesoListaNiveles").style.display="";
  
	buscardetalleslistaniveles()
	}else{
	//document.getElementById("divDetallesAccesoListaNiveles").style.display="none";
 
	$("div[id=divDetallesAccesoListaNiveles]").fadeOut(500);	

	}
}
function buscardetalleslistaniveles() {
	if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	var buscador = document.getElementById('inptBuscarDetallesAccesoListaNiveles1').value
	var checkTodosDetalles = document.getElementById("checkMarcarTodosDetallesAcceso");
	if (checkTodosDetalles) {
		checkTodosDetalles.checked = false;
		checkTodosDetalles.indeterminate = false;
		checkTodosDetalles.disabled = true;
	}
	document.getElementById("divBuscadorDetallesAccesoListaNiveles").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"idAbmListaNiveles": idAbmListaNiveles,
		"formato": "json",
		"funt": "buscardetalles"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoNiveles.php",
		type: "post",
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarNodoListadoPermisos(document.getElementById("divBuscadorDetallesAccesoListaNiveles"))
		
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			limpiarNodoListadoPermisos(document.getElementById("divBuscadorDetallesAccesoListaNiveles"))
		
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
		       if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (!Array.isArray(datos_buscados)) {
						throw new Error("Detalles de Acceso por Nivel no devolvio un array de registros");
					}
					renderizarDetallesAccesoListaNiveles(datos_buscados)
                  
				  
if(datos_buscados.length===0){
					   ver_vetana_informativa("NO ENCONTRARON REGISTROS COINCIDENTES")
				   }
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function abmaccesolistanivel(d) {
	if(controlacceso("VERLISTADODENIVELES","accion")==false){return;}
	var intpu=$(d)
	var idabm=d.id
	var accion="NO"
	if ($(intpu).is(':checked') ){
	accion="SI"
	}
	actualizarEstadoMarcarTodosDetallesAcceso()
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("usuarios_idusario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editaracceso")
	datos.append("idabm", idabm)
	datos.append("acciones", accion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoNiveles.php",
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
function BuscarNivelesSelect() {

	document.getElementById("inptTipoUser").innerHTML = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarSelect"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoNiveles.php",
		type: "post",
			 xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
         var kb=((evt.loaded*1)/1000).toFixed(1)
		
		 if(kb=="0.0"){
			kb=0.1;
		}
               cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
			kb=0.1;
		}
                    cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
          manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptTipoUser").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptTipoUser").innerHTML = ''
			
		
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
		       if (Respuesta == true) {
				   
					var pagina = datos[2];
					document.getElementById("inptTipoUser").innerHTML=pagina
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});





}

