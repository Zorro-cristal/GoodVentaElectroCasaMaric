/*ABM PRODUCTO*/
function buscarCabeceraVistaProductos(cuerpo, idCabecera) {
	var existente = document.getElementById(idCabecera);
	if (existente) return existente;
	if (!cuerpo) return null;
	var tablas = cuerpo.parentNode ? cuerpo.parentNode.querySelectorAll("table") : [];
	for (var i = tablas.length - 1; i >= 0; i--) {
		var tabla = tablas[i];
		if (tabla === cuerpo || !(tabla.compareDocumentPosition(cuerpo) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
		if (tabla.querySelector(".td_registro, th") && !tabla.querySelector("input, select, textarea")) {
			tabla.id = idCabecera;
			return tabla;
		}
	}
	var actual = cuerpo.previousElementSibling;
	while (actual) {
		if (actual.tagName === "TABLE" && actual.querySelector(".td_registro, th") && !actual.querySelector("input, select, textarea")) {
			actual.id = idCabecera;
			return actual;
		}
		actual = actual.previousElementSibling;
	}
	return null;
}

function crearListadoVistaProductos(configuracion) {
	if (!window.AbmListadoCore) return null;
	var cuerpo = document.getElementById(configuracion.idCuerpo);
	var cabecera = buscarCabeceraVistaProductos(cuerpo, configuracion.idCabecera);
	if (!cuerpo || !cabecera) return null;
	var columnas = configuracion.columnas || [];
	var listado = window.AbmListadoCore.crear({
		nombre: configuracion.nombre,
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: configuracion.ordenInicial || "producto",
		columnas: columnas,
		despuesRender: configuracion.despuesRender,
		crearFila: function (registro, columnasActivas, utilidades, indice) {
			var visibles = {};
			columnasActivas.forEach(function (columna) { visibles[columna.campo] = columna; });
			var tabla = utilidades.crearElemento("table", {
				className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch",
				border: "1", cellspacing: "1", cellpadding: "5"
			});
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro", name: "trVistaProducto_" + (registro.codigo_barra || "") });
			if (registro.proveedor_preferido) fila.style.cssText = "background-color:#efeded;color:#000";
			var idsUsados = {};
			function valorColumna(columna) {
				if (typeof columna.valor === "function") return columna.valor(registro);
				return registro[columna.campo] == null ? "" : registro[columna.campo];
			}
			function agregarCelda(id, valor, ancho, oculta, html) {
				var celda = utilidades.crearElemento("td", id ? { id: id } : {});
				if (id) idsUsados[id] = true;
				if (oculta) celda.style.display = "none";
				else if (ancho) celda.style.width = ancho;
				if (html) celda.innerHTML = valor == null ? "" : String(valor);
				else if (valor instanceof Node) celda.appendChild(valor);
				else celda.textContent = valor == null ? "" : String(valor);
				fila.appendChild(celda);
				return celda;
			}
			columnas.forEach(function (columna) {
				if (!visibles[columna.campo]) return;
				var valor = valorColumna(columna);
				var contenido = valor;
				if (columna.tipo === "combo") {
					contenido = "";
					if (registro.es_combo) {
						var boton = utilidades.crearElemento("button", { type: "button", className: "btn4" }, "VER");
						boton.style.width = "50px";
						boton.setAttribute("aria-label", "Ver productos del combo " + (registro.producto || ""));
						boton.addEventListener("click", function (evento) {
							evento.stopPropagation();
							if (typeof configuracion.abrirCombo === "function") configuracion.abrirCombo(registro);
						});
						contenido = boton;
					}
				}
				var celda = agregarCelda(columna.id || "", contenido, columna.ancho, false, columna.html === true);
				if (columna.campo === "codigo_barra" && configuracion.idFoco) {
					var foco = utilidades.crearElemento("button", { type: "button", id: configuracion.idFoco, name: registro.codigo_barra || "" });
					foco.className = String(registro.total_registros || "");
					foco.value = registro.indice == null ? indice : registro.indice;
					foco.style.cssText = "outline:none;height:0;padding:0;border:0;overflow:hidden";
					foco.setAttribute("aria-label", "Seleccionar " + (registro.producto || "producto"));
					if (configuracion.funcionFoco && typeof window[configuracion.funcionFoco] === "function") {
						foco.addEventListener("focus", function () { window[configuracion.funcionFoco](foco); });
					}
					celda.appendChild(document.createElement("br"));
					celda.appendChild(foco);
				}
			});
			var tecnicas = [
				["td_datos_13", "codigo_barra"], ["td_id", "codigo"], ["td_datos_1", "producto"],
				["td_datos_2", "descripcion"], ["td_datos_12", "categoria"], ["td_datos_3", "unidad"],
				["td_datos_4", configuracion.campoPrecioTecnico || "precio_formateado"], ["td_datos_5", "costo_formateado"],
				["td_datos_6", configuracion.campoStockTecnico || "stock_formateado"], ["td_datos_7", "codigo_local"],
				["td_datos_8", "comision"], ["td_datos_9", "estado"], ["td_datos_10", "local"],
				["td_datos_11", "detalle_precios_html", true], ["td_datos_14", "porcentaje"],
				["td_datos_15", "stock"], ["td_datos_16", configuracion.campoDato16 || "promo"],
				["td_datos_17", configuracion.campoDato17 || "precio_minimo"]
			];
			tecnicas.forEach(function (tecnica) {
				if (idsUsados[tecnica[0]]) return;
				agregarCelda(tecnica[0], registro[tecnica[1]], "", true, tecnica[2] === true);
			});
			var permiteSeleccion = !registro.es_combo || configuracion.seleccionarCombos === true;
			if (permiteSeleccion && configuracion.funcionSeleccion && typeof window[configuracion.funcionSeleccion] === "function") {
				fila.addEventListener("click", function () { window[configuracion.funcionSeleccion](fila); });
				fila.tabIndex = 0;
				fila.addEventListener("keydown", function (evento) {
					if (evento.key === "Enter" || evento.key === " ") { evento.preventDefault(); window[configuracion.funcionSeleccion](fila); }
				});
			}
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listado.iniciar();
	return listado;
}
window.crearListadoVistaProductos = crearListadoVistaProductos;

var listadoAbmProducto = null;
function formatearNumeroListadoProducto(valor) {
	var numero = Number(valor);
	return isFinite(numero) ? numero.toLocaleString("es-ES", { maximumFractionDigits: 0 }) : (valor == null ? "" : String(valor));
}

function iniciarListadoAbmProducto() {
	if (listadoAbmProducto || !window.AbmListadoCore) return listadoAbmProducto;
	var cuerpo = document.getElementById("table_abm_producto");
	var cabecera = buscarCabeceraVistaProductos(cuerpo, "cabeceraAbmProducto");
	if (!cuerpo || !cabecera) return null;
	var columnas = [
		{ campo: "cod_barra", titulo: "COD.", ancho: "5%" },
		{ campo: "nombre_producto", titulo: "PRODUCTO", ancho: "20%" },
		{ campo: "NombreMarca", titulo: "MARCA", ancho: "10%" },
		{ campo: "NombreCategoria", titulo: "CATEGORIA", ancho: "10%" },
		{ campo: "stock_producto", titulo: "STOCK", ancho: "5%" },
		{ campo: "precio_compra", titulo: "PRECIO LISTA.", ancho: "5%" },
		{ campo: "localnombre", titulo: "LOCAL", ancho: "10%" },
		{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "10%" },
		{ campo: "promo", titulo: "PROMO", ancho: "5%" },
		{ campo: "puntaje", titulo: "PUNTAJE", ancho: "5%" },
		{ campo: "condicion_precio", titulo: "EDITAR PR.", ancho: "5%" }
	];
	listadoAbmProducto = window.AbmListadoCore.crear({
		nombre: "abm_producto",
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: "nombre_producto",
		columnas: columnas,
		crearFila: function (registro, columnasActivas, utilidades, indice) {
			var visibles = {};
			columnasActivas.forEach(function (columna) { visibles[columna.campo] = columna; });
			var tabla = utilidades.crearElemento("table", {
				className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch",
				border: "1", cellspacing: "1", cellpadding: "5"
			});
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro", tabindex: "0" });
			function celda(id, valor, campo, formatear) {
				var columna = campo ? visibles[campo] : null;
				var td = utilidades.crearElemento("td", id ? { id: id } : {});
				if (campo && columna) td.style.width = columna.ancho;
				else td.style.display = "none";
				td.textContent = formatear ? formatearNumeroListadoProducto(valor) : (valor == null ? "" : String(valor));
				fila.appendChild(td);
			}
			celda("td_id", registro.cod_producto);
			celda("td_datos_19", registro.cod_barra, "cod_barra");
			celda("td_datos_1", registro.nombre_producto, "nombre_producto");
			celda("td_datos_12", registro.NombreImpuesto);
			celda("td_datos_13", registro.NombreMarca, "NombreMarca");
			celda("td_datos_11", registro.NombreCategoria, "NombreCategoria");
			celda("td_datos_2", registro.descripcion_producto);
			celda("td_datos_3", registro.unidad_producto);
			celda("td_datos_6", registro.stock_producto, "stock_producto", true);
			celda("td_datos_4", registro.precio_producto, "", true);
			celda("td_datos_5", registro.precio_compra, "precio_compra", true);
			celda("td_datos_18", registro.totalcostos, "", true);
			celda("", registro.localnombre, "localnombre");
			celda("td_datos_22", registro.proveedor, "proveedor");
			celda("td_datos_24", registro.promo, "promo");
			celda("td_datos_25", registro.puntaje, "puntaje");
			celda("td_datos_108", registro.condicion_precio, "condicion_precio");
			celda("td_datos_7", registro.cod_localFK);
			celda("td_datos_8", registro.comision);
			celda("td_datos_9", registro.estado);
			celda("td_datos_10", registro.cod_localFK);
			celda("td_datos_14", registro.cod_categoriaFK);
			celda("td_datos_15", registro.cod_marcasFK);
			celda("td_datos_16", registro.cod_ImpuestoFK);
			celda("td_datos_17", registro.porcentaje);
			celda("td_datos_20", registro.tipo);
			celda("td_datos_23", registro.CodProveedor);
			celda("td_datos_100", registro.insertadopor);
			celda("td_datos_101", registro.editadopor);
			celda("td_datos_102", registro.fecha_insert);
			celda("td_datos_103", registro.fecha_edit);
			celda("td_datos_104", registro.link);
			celda("td_datos_105", registro.url);
			celda("td_datos_106", registro.stockminimo);
			celda("td_datos_107", registro.tipo_producto);
			fila.addEventListener("click", function () { obtenerdatosabmProducto(fila); });
			fila.addEventListener("keydown", function (evento) {
				if (evento.key === "Enter" || evento.key === " ") { evento.preventDefault(); obtenerdatosabmProducto(fila); }
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoAbmProducto.iniciar();
	return listadoAbmProducto;
}

function ajustarColumnasPrecioVistaVenta() {
	var tipoVenta = document.getElementById("inptSeleccTipoVenta");
	var esCredito = tipoVenta && tipoVenta.value === "CREDITO";
	$("td[id=td_datos_precio_contado]").each(function (i, elementohtml) { elementohtml.style.display = esCredito ? "none" : ""; });
	$("td[id=td_datos_precios_creditos]").each(function (i, elementohtml) { elementohtml.style.display = esCredito ? "" : "none"; });
}

var listadoVistaProductoGeneral = null;
function iniciarListadoVistaProductoGeneral() {
	if (listadoVistaProductoGeneral) return listadoVistaProductoGeneral;
	listadoVistaProductoGeneral = crearListadoVistaProductos({
		nombre: "vista_producto_general", idCuerpo: "table_abm_vista_producto", idCabecera: "cabeceraVistaProductoGeneral",
		funcionSeleccion: "obtenerdatosvistaproducto",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "10%", id: "td_datos_13" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "20%", id: "td_datos_2" }
		]
	});
	return listadoVistaProductoGeneral;
}

var listadoVistaProductoVenta = null;
function iniciarListadoVistaProductoVenta() {
	if (listadoVistaProductoVenta) return listadoVistaProductoVenta;
	listadoVistaProductoVenta = crearListadoVistaProductos({
		nombre: "vista_producto_venta", idCuerpo: "table_vista_producto_venta", idCabecera: "cabeceraVistaProductoVenta",
		funcionSeleccion: "obtenerdatosvistaproductodesdeventa", idFoco: "btnfocusProducto", funcionFoco: "recorrerFocusTableProductoVenta",
		campoPrecioTecnico: "precio_contado_formateado", campoDato17: "precio_minimo",
		despuesRender: ajustarColumnasPrecioVistaVenta,
		abrirCombo: function (registro) { buscarvistacomboproducto(registro.codigo, "venta"); },
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "12%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "precio_contado", titulo: "PRECIO CONTADO", ancho: "10%", id: "td_datos_precio_contado", valor: function (r) { return r.precio_contado_formateado; } },
			{ campo: "precios_credito_html", titulo: "PRECIO CREDITO", ancho: "10%", id: "td_datos_precios_creditos", html: true },
			{ campo: "stock", titulo: "STOCK", ancho: "5%", id: "td_datos_6", valor: function (r) { return r.stock; } },
			{ campo: "combo", titulo: "COMBO", ancho: "5%", id: "td_datos_18", tipo: "combo" }
		]
	});
	return listadoVistaProductoVenta;
}

var listadoVistaProductoCompra = null;
function iniciarListadoVistaProductoCompra() {
	if (listadoVistaProductoCompra) return listadoVistaProductoCompra;
	listadoVistaProductoCompra = crearListadoVistaProductos({
		nombre: "vista_producto_compra", idCuerpo: "table_vista_producto_compra", idCabecera: "cabeceraVistaProductoCompra",
		funcionSeleccion: "obtenerdatosvistaproductodesdecompra", idFoco: "btnfocusProductocompra", funcionFoco: "recorrerFocusTableProductoCompra",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "12%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "categoria", titulo: "CATEGORIA", ancho: "10%", id: "td_datos_12" },
			{ campo: "costo", titulo: "COSTO", ancho: "10%", id: "td_datos_5", valor: function (r) { return r.costo_formateado; } },
			{ campo: "stock", titulo: "STOCK", ancho: "10%", id: "td_datos_6", valor: function (r) { return r.stock_unidad_formateado || r.stock_formateado; } }
		]
	});
	return listadoVistaProductoCompra;
}

var listadoVistaProductoDespacho = null;
function iniciarListadoVistaProductoDespacho() {
	if (listadoVistaProductoDespacho) return listadoVistaProductoDespacho;
	listadoVistaProductoDespacho = crearListadoVistaProductos({
		nombre: "vista_producto_despacho", idCuerpo: "table_vista_producto_despacho", idCabecera: "cabeceraVistaProductoDespacho",
		funcionSeleccion: "obtenerdatosvistaproductodesdelistadodespacho",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "12%", id: "td_datos_13" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "stock", titulo: "STOCK", ancho: "10%", id: "td_datos_6", valor: function (r) { return r.stock; } }
		]
	});
	return listadoVistaProductoDespacho;
}

var listadoVistaProductoSalidaDeposito = null;
function iniciarListadoVistaProductoSalidaDeposito() {
	if (listadoVistaProductoSalidaDeposito) return listadoVistaProductoSalidaDeposito;
	listadoVistaProductoSalidaDeposito = crearListadoVistaProductos({
		nombre: "vista_producto_salida_deposito", idCuerpo: "table_abm_listado_salida_deposito", idCabecera: "cabeceraVistaProductoSalidaDeposito",
		funcionSeleccion: "obtenerdatosvistaproductodesdeSalidadDeposito",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "12%", id: "td_datos_13" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "stock", titulo: "STOCK", ancho: "10%", id: "td_datos_6", valor: function (r) { return r.stock; } }
		]
	});
	return listadoVistaProductoSalidaDeposito;
}

function renderizarProductoEdicionEstructurado(registro) {
	var contenedor = document.getElementById("table_abm_vista_producto");
	if (!contenedor) return null;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var tabla = document.createElement("table");
	tabla.style.display = "none";
	var fila = document.createElement("tr");
	fila.id = "tbRegistroCodProducto";
	function celda(id, valor) {
		var td = document.createElement("td");
		if (id) td.id = id;
		td.style.display = "none";
		td.textContent = valor == null ? "" : String(valor);
		fila.appendChild(td);
	}
	celda("td_id", registro.codigo);
	celda("td_datos_19", registro.codigo_barra);
	celda("td_datos_1", registro.producto);
	celda("td_datos_12", registro.impuesto);
	celda("td_datos_13", registro.marca);
	celda("td_datos_11", registro.categoria);
	celda("td_datos_2", registro.descripcion);
	celda("td_datos_3", registro.unidad);
	celda("td_datos_4", registro.precio_formateado);
	celda("td_datos_5", registro.costo_formateado);
	celda("td_datos_6", registro.stock_formateado);
	celda("td_datos_18", registro.total_costo_formateado);
	celda("td_datos_22", registro.proveedor);
	celda("", registro.local);
	celda("td_datos_7", registro.codigo_local);
	celda("td_datos_8", registro.comision);
	celda("td_datos_9", registro.estado);
	celda("td_datos_10", registro.codigo_local);
	celda("td_datos_14", registro.codigo_categoria);
	celda("td_datos_15", registro.codigo_marca);
	celda("td_datos_16", registro.codigo_impuesto);
	celda("td_datos_17", registro.porcentaje);
	celda("td_datos_20", registro.tipo);
	celda("td_datos_23", registro.codigo_proveedor);
	tabla.appendChild(fila);
	contenedor.appendChild(tabla);
	return fila;
}

function verCerrarAbmProducto(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmProducto").style.display==""){
			if(controldebusquedadProductos==true){
	ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
    }
limpiarcamposproducto()
		limpiarcamposbuscarproductos()
		
//  
	$("div[id=divAbmProducto]").fadeOut(500);	
		document.getElementById("divMinimizadoListadoProducto1").style.display="none"
		document.getElementById("divMinimizadoListadoProductos").style.display="none"
		
	}else{	
		if(controlacceso("VERLISTADOPRODUCTOS","accion")==false){return;}
		mostrarSoloUno("divAbmProducto")	
		document.getElementById("divAbmProducto").style.display=""
	}
}
function verCerrarAbmProducto2(){
		document.getElementById("imgMinimizaeProducto").style.display="none"
		document.getElementById("imgCerrarProducto").style.display=""
		//  
	$("div[id=divAbmProducto]").fadeOut(500);
		document.getElementById('divAbmProducto2').style.display = "none"
		document.getElementById('divAbmProducto1').classList.remove("productos-listado-oculto")
		document.getElementById('divAbmProducto1').style.display = ""
		
}
function minimizarabmproductos(){
//  
	$("div[id=divAbmProducto]").fadeOut(500);
		document.getElementById("divMinimizadoListadoProducto1").style.display=""
		document.getElementById("divMinimizadoListadoProductos").style.display=""
		copiarBotonEnContenedor(document.getElementById("divMenuAbmProductos1"));
}
function verCerrarVentanaAbmProducto(d, l) {
		document.getElementById("imgMinimizaeProducto").style.display=""
		document.getElementById("imgCerrarProducto").style.display="none"
	if (d == "1") {
		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOPRODUCTOS","accion")==false){return;}
			limpiarcamposproducto()
			limpiarcamposDetallePrecio()
			comprobar_cod_barra()
		}else{ 
			buscardetallesprecio()
			limpiarcamposDetallePrecio()
		}
		$("div[id=divAbmProducto2]").fadeIn(250)
		document.getElementById('divAbmProducto1').classList.add("productos-listado-oculto")
	} else {
		document.getElementById('divAbmProducto1').classList.remove("productos-listado-oculto")
		$("div[id=divAbmProducto1]").fadeIn(250)
		document.getElementById('divAbmProducto2').style.display = "none"
	}
}
function verVentanaEditarProducto() {
	if(controlacceso("EDITARLISTADOPRODUCTOS","accion")==false){return;}
	if (idAbmProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmProducto("1", "2")
	comprobarproductotipocombo()
}
var idAbmProducto = ""
var idFkProductoCategoria= ""
var idFkProductoMarca = ""
var idFkProductoTipoImpuesto = ""
var codProveedorAbmProducto = ""
var linkPagina=""

var nombredescripcionAnt = ""
var precio_compraAnt= ""
var precio_ventaAnt = ""
var stockAnt = ""
var cod_barraAnt = ""

var nombreCategoriaPrecioCategoria="";
var localProductoBaja = "";
var codLocalProductoBaja = "";
var cod_localProductoGarantia = "";
function obtenerdatosabmProducto(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	elementoProductoGarantia = datostr;
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptCodProducto').value = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptRegistroSeleccProducto').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNombreProducto').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptPrecioCompraProducto').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptPrecioVentaProducto').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptStockProducto').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptComisionProducto').value = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptUnidadProducto').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptEstadoProducto').value = $(datostr).children('td[id="td_datos_9"]').html();
	document.getElementById('inptDescripProducto').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptlocalProducto').value = $(datostr).children('td[id="td_datos_10"]').html();
	codLocalProductoBaja = $(datostr).children('td[id="td_datos_7"]').html();
	localProductoBaja = $(datostr).children('td[id="td_datos_10"]').html();
	cod_localProductoGarantia = $(datostr).children('td[id="td_datos_10"]').html();
	linkPagina= $(datostr).children('td[id="td_datos_104"]').html();
	
	nombreCategoriaPrecioCategoria= $(datostr).children('td[id="td_datos_11"]').html();
	
	nombredescripcionAnt = $(datostr).children('td[id="td_datos_1"]').html()+"-"+$(datostr).children('td[id="td_datos_2"]').html();
	precio_compraAnt= $(datostr).children('td[id="td_datos_5"]').html();
	precio_ventaAnt = $(datostr).children('td[id="td_datos_4"]').html();
	stockAnt = $(datostr).children('td[id="td_datos_6"]').html();
	cod_barraAnt = $(datostr).children('td[id="td_datos_19"]').html();
	
	document.getElementById('inptCategoriaProducto').value = $(datostr).children('td[id="td_datos_14"]').html();
	document.getElementById('inptMarcaProducto').value = $(datostr).children('td[id="td_datos_15"]').html();
	document.getElementById('inptProveesorProducto').value = $(datostr).children('td[id="td_datos_23"]').html();
	
	document.getElementById('inptlinkProducto').value= $(datostr).children('td[id="td_datos_104"]').html();
	document.getElementById('inptPromoProducto').value= $(datostr).children('td[id="td_datos_24"]').html();
	document.getElementById('inptTipoImpuestoProducto').value = $(datostr).children('td[id="td_datos_12"]').html();
	// document.getElementById('inptMarcaProducto').value = $(datostr).children('td[id="td_datos_13"]').html();
	// document.getElementById('inptCategoriaProducto').value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById('inptPorcVentaProducto').value = $(datostr).children('td[id="td_datos_17"]').html();
	document.getElementById('inptTotalInversionProducto').value = $(datostr).children('td[id="td_datos_18"]').html();
	document.getElementById('inptCodBarraProducto').value = $(datostr).children('td[id="td_datos_19"]').html();
	document.getElementById('inptTipoProducto').value = $(datostr).children('td[id="td_datos_20"]').html();
	// document.getElementById('inptProveesorProducto').value = $(datostr).children('td[id="td_datos_22"]').html();
	document.getElementById('inptUsuarioInsertadoPor').value=$(datostr).children('td[id="td_datos_100"]').html()
	document.getElementById('inptFechaInsertadoPor').value=$(datostr).children('td[id="td_datos_102"]').html()
	document.getElementById('inptUsuarioEditadoPor').value=$(datostr).children('td[id="td_datos_101"]').html()
	document.getElementById('inptFechaEditadoPor').value=$(datostr).children('td[id="td_datos_103"]').html()
	document.getElementById('inptStockMinimoProducto').value=$(datostr).children('td[id="td_datos_106"]').html()
	document.getElementById('inptTipoComboProducto').value=$(datostr).children('td[id="td_datos_107"]').html()
 

	fotoproducto = $(datostr).children('td[id="td_datos_105"]').html();
	
	extproducto=""
	 
	$("div[id=imgFotoProducto]").css({"background-image":"url("+fotoproducto+")"})

	contadoprecio= $(datostr).children('td[id="td_datos_4"]').html();
	 
	idAbmProducto = $(datostr).children('td[id="td_id"]').html();
	cod_productoDetallePrecio=idAbmProducto
	idFkProductoCategoria = $(datostr).children('td[id="td_datos_14"]').html();
	idFkProductoMarca = $(datostr).children('td[id="td_datos_15"]').html();
	idFkProductoTipoImpuesto = $(datostr).children('td[id="td_datos_16"]').html();
	codProveedorAbmProducto = $(datostr).children('td[id="td_datos_23"]').html();
		document.getElementById('btnAbmProducto').value ="Editar Datos";
			document.getElementById("tdAnhaMasPrecios").style.display=""
				document.getElementById("btnVerConfigPrecios").style.backgroundColor=""
				document.getElementById("btnEditarProductos").style.backgroundColor=""
				// document.getElementById("btnPreciosCategoriaProductos").style.backgroundColor=""
				document.getElementById("btnEnviarProductos").style.backgroundColor=""
				document.getElementById('btnBajaDatosProductos').style.backgroundColor="#f53b3b";
				document.getElementById('btnAuditoriaProducto').style.backgroundColor="#673ab7";
				document.getElementById('btnPuntosProductos').style.backgroundColor="#4caf50";
				document.getElementById('btnGarantiaProducto').style.backgroundColor="#2196f3";
				
				document.getElementById('btnEliminarProducto').style.backgroundColor="#f53b3b";
		
				buscarEspecificacionesVistaCliente(idAbmProducto);
		
				buscardetallesprecioenbuscarproductos()			
}

function agregarEspecificacionVistaCliente() {
    const lista = document.getElementById('listaEspecificacionesVistaCliente');

    const divHTML = `
        <div class='divMenuf' style='display: flex;'>
            <input class='inptIdEspecificacionVistaCliente' type='hidden'>
            <div style='width: 80%;'>
                <table style='width:100%'><tr>
                    <td>
                        <p class='pTituloC'>Titulo:</p>
                        <input class='inputText inptTituloEspecificacionVistaCliente' style='width:150px;'>
                    </td>
                </tr></table>

                <table style='width:100%'><tr>
                    <td>
                        <p class='pTituloC'>Descripcion:</p>
                        <input class='inputText inptDescripcionEspecificacionVistaCliente' style='width:150px;'>
                    </td>
                </tr></table>
            </div>
        </div>
    `;

    // Solo agrega una vez
    lista.insertAdjacentHTML('beforeend', divHTML);
}

function eliminarEspecificacionCliente(elemento) {
    const divContenedor = elemento.closest('.divMenuf');
	divContenedor.remove();
}

function buscarEspecificacionesVistaCliente(cod_producto) {
	if (!cod_producto) {
		ver_vetana_informativa("FALTO SELECCIONAR EL PRODUCTO")
		return false;
	}
	document.getElementById("listaEspecificacionesVistaCliente").innerHTML= "";

	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "buscarEspecificacionVistaCliente");
	datos.append("cod_producto", cod_producto);

	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmEspecificaciones.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			return false;
		},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					document.getElementById("listaEspecificacionesVistaCliente").innerHTML= datos[2];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function guardarEspecificaciones(cod_producto){
	const especificaciones = [];
	const contenedor = document.getElementById("listaEspecificacionesVistaCliente");

	// Recorremos todos los bloques que contienen inputs
	const bloques = contenedor.querySelectorAll(".divMenuf");

	bloques.forEach(bloque => {
		const idInput = bloque.querySelector(".inptIdEspecificacionVistaCliente");
		const tituloInput = bloque.querySelector(".inptTituloEspecificacionVistaCliente");
		const descripcionInput = bloque.querySelector(".inptDescripcionEspecificacionVistaCliente");

		if (tituloInput && descripcionInput) {
			especificaciones.push({
				id: idInput.value.trim(),
				titulo: tituloInput.value.trim(),
				caracteristica: descripcionInput.value.trim()
			});
		}
	});

	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "nuevoEditarABM");
	datos.append("cod_productoFK", cod_producto);
	datos.append("especificaciones", JSON.stringify(especificaciones));

	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmEspecificaciones.php",
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
					// ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					// document.getElementById("listaEspecificacionesVistaCliente").innerHTML= "";
					buscarEspecificacionesVistaCliente(cod_producto)
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function calcularGananciaDesdePorcentaje(d){
	var montocompra=document.getElementById("inptPrecioCompraProducto").value
	var porcentaje=document.getElementById("inptPorcVentaProducto").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	porcentaje=QuitarSeparadorMilValor(porcentaje)
	if (isNaN(montocompra)) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO DE COMPRA")
        return false;
	}
	if (isNaN(porcentaje)) {
		ver_vetana_informativa("FALTO INGRESAR EL PORCENTAJE DE GANANCIA")
		return false;
	}
	var total=Math.round((Number(porcentaje)*Number(montocompra))/100)
	total=Number(total)+Number(montocompra)
	document.getElementById("inptPrecioVentaProducto").value=separadordemilesnumero(total)	
}
function calcularPorcentajeDesdeGanancia(d){
	var montocompra=document.getElementById("inptPrecioCompraProducto").value
	var precioventa=document.getElementById("inptPrecioVentaProducto").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	precioventa=QuitarSeparadorMilValor(precioventa)
	if (isNaN(montocompra)) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO DE COMPRA")
        return false;
	}
	if (isNaN(precioventa)) {
		ver_vetana_informativa("FALTO INGRESAR EL PRECIO VENTA")
		return false;
	}
	var ganancias=Math.round(Number(precioventa)-Number(montocompra))
	var porcentaje=((Number(ganancias)*100)/ Number(montocompra)).toFixed(1)
	porcentaje=porcentaje.replace('.',',')
	document.getElementById("inptPrecioVentaProducto").value=separadordemilesnumero(precioventa)
	document.getElementById("inptPorcVentaProducto").value=porcentaje
}
function CalcularTotalInversion(){
	var montocompra=document.getElementById("inptPrecioCompraProducto").value
	var stock=document.getElementById("inptStockProducto").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	stock=QuitarSeparadorMilValor(stock)
	if (isNaN(montocompra)) {
        montocompra=0;
	}
	if (isNaN(stock)) {
		stock=0;
	}
	var total=Math.round(Number(stock)*Number(montocompra))
	document.getElementById("inptTotalInversionProducto").value=separadordemilesnumero(total)
	document.getElementById("inptPrecioCompraProducto").value=separadordemilesnumero(montocompra)
}

// CARGAR FOTO PRODUCTO
function ExploradorImagenProducto(File){	
$("input[name=file_6]").click();
}
var fotoproducto="";
var extproducto="";
function readFileProducto(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension=="jpeg") || (file_extension=="jpg") || (file_extension=="png") ){
}else{
ver_vetana_informativa("LA FOTO SELECCIONADO NO ES JPEG")
return false;
}
var reader = new FileReader();
reader.onload = function(e){
	extproducto=file_extension;
fotoproducto=e.target.result;
 $("div[id=imgFotoProducto]").css({"background-image":"url("+fotoproducto+")"})
}
reader.readAsDataURL(input.files[0]);
}

function verificarcamposProducto() {
	var inptCodProducto = document.getElementById('inptCodProducto').value
	
	var inptCodFabricaProducto = document.getElementById('inptCodFabricaProducto').value
	
	var inptlinkProducto = document.getElementById('inptlinkProducto').value
	var inptPromoProducto = document.getElementById('inptPromoProducto').value
	
	var inptCodBarraProducto = document.getElementById('inptCodBarraProducto').value
	var inptNombreProducto = document.getElementById('inptNombreProducto').value
	var inptDescripProducto = document.getElementById('inptDescripProducto').value
	var inptPrecioCompraProducto = document.getElementById('inptPrecioCompraProducto').value
	var inptPrecioVentaProducto = document.getElementById('inptPrecioVentaProducto').value
	var inptStockProducto = document.getElementById('inptStockProducto').value
	var inptComisionProducto = document.getElementById('inptComisionProducto').value
	var inptlocalProducto = document.getElementById('inptlocalProducto').value
	var inptUnidadProducto = document.getElementById('inptUnidadProducto').value
	var inptEstadoProducto = document.getElementById('inptEstadoProducto').value
	var inptTipoProducto = document.getElementById('inptTipoProducto').value
    var porcentaje=document.getElementById("inptPorcVentaProducto").value 	
    var inptTipoComboProducto=document.getElementById("inptTipoComboProducto").value
    var inptPrecioEditableProducto=document.getElementById("inptPrecioEditableProducto").value
	
	
    var inptMarcaProducto=document.getElementById("inptMarcaProducto").value
    var inptCategoriaProducto=document.getElementById("inptCategoriaProducto").value
    var inptProveesorProducto=document.getElementById("inptProveesorProducto").value

	
    var inptStockMinimoProducto=document.getElementById("inptStockMinimoProducto").value	
	if (inptCodBarraProducto == "") {
		inptCodBarraProducto="0000"
		return false;
	}	
	if (inptNombreProducto == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL PRODUCTO")
		return false;
	}
	if (inptCategoriaProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA CATEGORIA DEL PRODUCTO")
		return false;
	}
	if (inptMarcaProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA MARCAR DEL PRODUCTO")
		return false;
	}
	if (idFkProductoTipoImpuesto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL TIPO DEL PRODUCTO")
		return false;
	}
	if (inptEstadoProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}
	var accion = "";
	if (idAbmProducto != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADOPRODUCTOS","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADOPRODUCTOS","accion")==false){return;}
	}

	abmproducto(inptPrecioEditableProducto,inptTipoComboProducto,inptStockMinimoProducto,inptPromoProducto,inptlinkProducto,inptCodFabricaProducto,inptProveesorProducto,inptTipoProducto,inptCodBarraProducto,porcentaje,inptCategoriaProducto,inptMarcaProducto,idFkProductoTipoImpuesto,inptCodProducto, inptNombreProducto, inptDescripProducto, inptPrecioCompraProducto, inptPrecioVentaProducto, inptStockProducto, inptComisionProducto, inptlocalProducto, inptUnidadProducto, inptEstadoProducto, idAbmProducto, accion);
}


function abmproducto(precioEditable,tipo_combo,stockminimo,promo,linkproducto,codFabricaFK,CodProveedorFK,tipoproducto,codBarras,porcentaje,cod_categoriaFK,cod_marcasFK,cod_ImpuestoFK,cod_producto, nombre_producto, descripcion_producto, precio_compra, precio_producto, stock_producto, comision, cod_localFK, unidad_producto, estado, idProducto, accion) {
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_producto", cod_producto)
	datos.append("nombre_producto", nombre_producto)
	datos.append("descripcion_producto", descripcion_producto)
	datos.append("unidad_producto", unidad_producto)
	datos.append("precio_producto", precio_producto)
	datos.append("precio_compra", precio_compra)
	datos.append("cod_localFK", cod_localFK)
	datos.append("comision", comision)
	datos.append("estado", estado)
	datos.append("stock_producto", stock_producto)
	datos.append("cod_categoriaFK", cod_categoriaFK)
	datos.append("cod_marcasFK", cod_marcasFK)
	datos.append("cod_ImpuestoFK", cod_ImpuestoFK)
	datos.append("porcentaje", porcentaje)
	datos.append("codBarras", codBarras)
	datos.append("tipoproducto", tipoproducto)
	datos.append("CodProveedorFK", CodProveedorFK)
	datos.append("cod_local", cod_localFKUSer)
	datos.append("codFabricaFK", codFabricaFK)
	datos.append("linkproducto", linkproducto)
	datos.append("nombredescripcionAnt", nombredescripcionAnt)
	datos.append("precio_compraAnt", precio_compraAnt)
	datos.append("precio_ventaAnt", precio_ventaAnt)
	datos.append("stockAnt", stockAnt)
	datos.append("cod_barraAnt", cod_barraAnt)
	datos.append("promo", promo)
	datos.append("ext", extproducto)
	datos.append("foto", fotoproducto)
	datos.append("stockminimo", stockminimo)
	datos.append("tipo_combo", tipo_combo)
	datos.append("precioEditable", precioEditable)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					idAbmProducto =  datos["2"]
					// verCerrarAbmDetallesPrecioTabla("1")
					document.getElementById('inptCodProducto').value=idAbmProducto;
					document.getElementById("btnAbmProducto").value='Editar Datos'
					document.getElementById("tdAnhaMasPrecios").style.display=""
					
					guardarEspecificaciones(idAbmProducto)
					
		// document.getElementById("tdTotalStockProducto").style.display=""
		// document.getElementById("tdTotalInversion").style.display=""
		//document.getElementById("tdLocalProducto").style.display=""
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function checkestadoproductos(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarProducto1').checked=true
		document.getElementById('inptSeleccEstadoBuscarProducto2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarProducto1').checked=false
		document.getElementById('inptSeleccEstadoBuscarProducto2').checked=true
	}
}
var registrocargadoproductos="";
var totalregistroproductos="";
var controldebusquedadProductos=false
function cancelarCargaProducto(){
	controldebusquedadProductos=false
	document.getElementById("divProgressProducto").style.backgroundColor='#ff5722'
}
function buscarabmproducto() {
if(controlacceso("BUSCARLISTADOPRODUCTOS","accion")==false){return;}
	var codigo = document.getElementById('inptBuscarProducto1').value
	var producto = document.getElementById('inptBuscarProducto2').value
	var marca = document.getElementById('inptBuscarProducto3').value
	var categoria = document.getElementById('inptBuscarProducto4').value
	var stock = document.getElementById('inptBuscarProducto5').value
	var proveedor = document.getElementById('inptBuscarProducto6').value
	var estado = ""
	var local = document.getElementById('inptBuscarProducto7').value
	var ConStock = document.getElementById('inptBuscarProducto8').value
	var promo = document.getElementById('inptBuscarProducto9').value
	var EditarPrecio = document.getElementById('inptBuscarProducto10').value
	var puntaje = document.getElementById('inptBuscarProducto11').value
	
	if(document.getElementById('inptSeleccEstadoBuscarProducto1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	if(controldebusquedadProductos==true){
	ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
    }
	controldebusquedadProductos=true
	document.getElementById("inptRegistoCargadoProducto").value = "";
	document.getElementById("table_abm_producto").innerHTML = paginacargando
    document.getElementById("tbProcessProducto").style.display="grid"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"ConStock": ConStock,
		"producto": producto,
		"marca": marca,
		"categoria": categoria,
		"stock": stock,
		"proveedor": proveedor,
		"estado": estado,
		"local": local,
		"promo": promo,
		"EditarPrecio": EditarPrecio,
		"puntaje": puntaje,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_producto").innerHTML = ''
			controldebusquedadProductos=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_producto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var listado = iniciarListadoAbmProducto();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_abm_producto").innerHTML = datos_buscados || "";
					document.getElementById("inptRegistoCargadoProducto").value = datos[3];
						registrocargadoproductos=Number(datos[99]);
					totalregistroproductos=Number(datos[100]);
			
					
						 if(totalregistroproductos>registrocargadoproductos){
						 	var porce=((registrocargadoproductos*100)/totalregistroproductos).toFixed(0)
	document.getElementById("divProgressProducto").style.width=porce+"%"
						  buscarabmmasproducto();
					 }else{
						 controldebusquedadProductos=false
					 }
					
				}
			} catch (error) {
				controldebusquedadProductos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
	var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarabmmasproducto(c) {
if(controlacceso("BUSCARLISTADOPRODUCTOS","accion")==false){return;}
	var codigo = document.getElementById('inptBuscarProducto1').value
	var producto = document.getElementById('inptBuscarProducto2').value
	var marca = document.getElementById('inptBuscarProducto3').value
	var categoria = document.getElementById('inptBuscarProducto4').value
	var stock = document.getElementById('inptBuscarProducto5').value
	var proveedor = document.getElementById('inptBuscarProducto6').value
	var estado = ""
	var local = document.getElementById('inptBuscarProducto7').value
	var ConStock = document.getElementById('inptBuscarProducto8').value
	var promo = document.getElementById('inptBuscarProducto9').value
	var EditarPrecio = document.getElementById('inptBuscarProducto10').value
	var puntaje = document.getElementById('inptBuscarProducto11').value
	
	if(document.getElementById('inptSeleccEstadoBuscarProducto1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	if(c=="1"){
		controldebusquedadProductos=true
	}
	if(controldebusquedadProductos==false){
	
	return
    }
	controldebusquedadProductos=true
	
	var contenedorMasProducto = document.getElementById("table_abm_mas_producto");
	if (contenedorMasProducto) contenedorMasProducto.innerHTML = paginacargando;
    document.getElementById("tbProcessProducto").style.display=""
	document.getElementById("divProgressProducto").style.backgroundColor=''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"ConStock": ConStock,
		"producto": producto,
		"marca": marca,
		"categoria": categoria,
		"stock": stock,
		"proveedor": proveedor,
		"estado": estado,
		"local": local,
		"promo": promo,
		"EditarPrecio": EditarPrecio,
		"puntaje": puntaje,
		"registrocargado": registrocargadoproductos,
		"formato": "json",
		"funt": "buscarmas"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			var contenedorMasProducto = document.getElementById("table_abm_mas_producto");
			if (contenedorMasProducto) contenedorMasProducto.innerHTML = '';
			controldebusquedadProductos=false
			document.getElementById("divProgressProducto").style.backgroundColor='#ff5722'
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			var contenedorMasProducto = document.getElementById("table_abm_mas_producto");
			if (contenedorMasProducto) contenedorMasProducto.innerHTML = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var listado = iniciarListadoAbmProducto();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, true);
				else if (contenedorMasProducto) contenedorMasProducto.innerHTML = datos_buscados || "";
					document.getElementById("inptRegistoCargadoProducto").value = datos[3];
						registrocargadoproductos=Number(datos[99]);
					
			
					
						 if(totalregistroproductos>registrocargadoproductos){
						 	var porce=((registrocargadoproductos*100)/totalregistroproductos).toFixed(0)
	document.getElementById("divProgressProducto").style.width=porce+"%"
						  buscarabmmasproducto();
					 }else{
						  document.getElementById("tbProcessProducto").style.display="grid"
						 controldebusquedadProductos=false
					 }
					
				}
			} catch (error) {
				document.getElementById("divProgressProducto").style.backgroundColor='#ff5722'
				controldebusquedadProductos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
	var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function limpiarcamposproducto() {   

	document.getElementById('inptCodProducto').value = "";
	document.getElementById('inptRegistroSeleccProducto').value = "";
	document.getElementById('inptNombreProducto').value = "";
	document.getElementById('inptPrecioCompraProducto').value = "";
	document.getElementById('inptPrecioVentaProducto').value = "";
	document.getElementById('inptTotalInversionProducto').value = "";
	document.getElementById('inptStockProducto').value = "";
	document.getElementById('inptComisionProducto').value = "";
	document.getElementById('inptDescripProducto').value = "";
	document.getElementById('inptTipoImpuestoProducto').value = "GRAVADAS 10%";
	document.getElementById('inptMarcaProducto').value = "";
	document.getElementById('inptPorcVentaProducto').value = "";
	document.getElementById('inptCategoriaProducto').value = "";
	document.getElementById('inptCodBarraProducto').value = "";
	document.getElementById('inptProveesorProducto').value = "";
	document.getElementById('inptStockMinimoProducto').value = "";
	document.getElementById('inptPromoProducto').value = "NO";
	document.getElementById('listaEspecificacionesVistaCliente').innerHTML = "";
	
	document.getElementById('inptCodFabricaProducto').value= "";
	document.getElementById('inptTipoComboProducto').value= "NORMAL";
	
	document.getElementById('inptlinkProducto').value= "";
	
	$("div[id=imgFotoProducto]").css({"background-image":"url()"})

	
	nombredescripcionAnt = ""
precio_compraAnt= ""
precio_ventaAnt = ""
stockAnt = ""
cod_barraAnt = ""
	
	
	fotoproducto="";
	extproducto="";
	
	if(document.getElementById("inptBuscarProducto7").value==""){
		document.getElementById('inptlocalProducto').value=cod_localFKUSer
	}else{
		
		document.getElementById('inptlocalProducto').value=document.getElementById("inptBuscarProducto7").value
		
	}
	 
	document.getElementById('table_abm_producto_detalles_precios').innerHTML = "";
	document.getElementById('inptEstadoProducto').value = "Activo";
	document.getElementById('btnAbmProducto').value ="Guardar Datos";
		document.getElementById("tdAnhaMasPrecios").style.display="none"
		// document.getElementById("tdTotalStockProducto").style.display="none"
		// document.getElementById("tdTotalInversion").style.display="none"
		// document.getElementById("tdLocalProducto").style.display="none"
		document.getElementById("btnVerConfigPrecios").style.backgroundColor="#b7b7b7"
		document.getElementById("btnEditarProductos").style.backgroundColor="#b7b7b7"
		// document.getElementById("btnPreciosCategoriaProductos").style.backgroundColor="#b7b7b7"
		document.getElementById("btnEnviarProductos").style.backgroundColor="#b7b7b7"
		document.getElementById("btnAuditoriaProducto").style.backgroundColor="#b7b7b7"
		document.getElementById("btnBajaDatosProductos").style.backgroundColor="#b7b7b7"
		document.getElementById("btnPuntosProductos").style.backgroundColor="#b7b7b7"
		document.getElementById("btnGarantiaProducto").style.backgroundColor="#b7b7b7"
		document.getElementById('btnEliminarProducto').style.backgroundColor="#b7b7b7"
		linkPagina=""
	idAbmProducto = "";
	 idFkProductoCategoria= ""
 idFkProductoMarca = ""
 idFkProductoTipoImpuesto = "3"
 codProveedorAbmProducto = ""
seleccionarLocalUSer()
limpiarcamposDetallePrecio() 
buscardetallesprecio()

BuscarCodigoProducto()

}


function BuscarCodigoProducto() {
	
	document.getElementById("inptCodBarraProducto").value = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "ContadorProducto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptCodBarraProducto").value = ""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptCodBarraProducto").value = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("inptCodBarraProducto").value = datos_buscados
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function limpiarcamposbuscarproductos(){
		if(controldebusquedadProductos==true){
	
	return
    }
	document.getElementById('inptBuscarProducto1').value=""
	 document.getElementById('inptBuscarProducto2').value=""
	 document.getElementById('inptBuscarProducto3').value=""
	document.getElementById('inptBuscarProducto4').value=""
	document.getElementById('inptBuscarProducto5').value=""
	document.getElementById('inptBuscarProducto6').value=""
	
	document.getElementById('inptRegistoCargadoProducto').value=""
	document.getElementById('inptRegistroSeleccProducto').value=""
	document.getElementById('tbProcessProducto').style.display="grid"
	
	document.getElementById('table_abm_producto').innerHTML=""
	document.getElementById('table_abm_producto_detalles_precios').innerHTML=""

}
var idFkProducto = ""
var idFkProductocompra = ""
function vercerrarvistaproducto(d, ventana) {
	if (d == "1") {
		document.getElementById("divVistaProducto").style.display=""
 //  
		controlseleccvistaproducto = ventana
		
	} else {
//  
		$("div[id=divVistaProducto]").fadeOut(500)
	}
}
function buscarvistaproducto() {
	var buscador = document.getElementById('inptBuscarVistaProducto').value
	var local = document.getElementById('inptlocalProductoBuscarVista').value
	var Categoria = document.getElementById('inptCategoriaProductoBuscarVista').value
	var Marca = document.getElementById('inptMarcaProductoBuscarVista').value
	var codProveedor="";
	if (controlseleccvistaproducto == "compra"){
		codProveedor=codProveedorCompra
	}
	
	document.getElementById("table_abm_vista_producto").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"local": local,
		"Categoria": Categoria,
		"Marca": Marca,
		"codProveedor": codProveedor,
		"formato": "json",
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_vista_producto").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_vista_producto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var listado = iniciarListadoVistaProductoGeneral();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_abm_vista_producto").innerHTML = datos_buscados || "";
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function buscarvistaproductodesdeventa() {
	var buscador = document.getElementById('inptProductoVenta').value
	var local = document.getElementById("inptlocalVenta").value;
	const conDescuento= document.getElementById("checkDescuentoBuscarProducto").checked;
	document.getElementById("table_vista_producto_venta").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"local": local,
		"conDescuento": conDescuento,
		"formato": "json",
		"funt": "buscarvistaventa"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_producto_venta").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_producto_venta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
				if(hayRegistros){
				var listado = iniciarListadoVistaProductoVenta();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_producto_venta").innerHTML = datos_buscados || "";
				ajustarColumnasPrecioVistaVenta();
	
				
					var focoProducto = document.getElementById('btnfocusProducto');
					if (focoProducto) focoProducto.focus();
				}else{
					ver_vetana_informativa("PRODUCTO NO ECONTRADO")
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


function buscarvistaproductodesdecompra() {
	var buscador = document.getElementById('inptProductoCompra').value
	var local = document.getElementById('inptlocalCompra').value
	
	document.getElementById("table_vista_producto_compra").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"local": local,
		"formato": "json",
		"funt": "buscarvistacompras"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_producto_compra").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_producto_compra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				
				
				var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
				if(hayRegistros){
					var listado = iniciarListadoVistaProductoCompra();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_vista_producto_compra").innerHTML = datos_buscados || "";
					var focoCompra = document.getElementById('btnfocusProductocompra');
					if (focoCompra) focoCompra.focus();
				
					}else{
					ver_vetana_informativa("REGISTRO NO ENCONTRADO")	
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
function buscarvistaproductodesdelistadospacho() {
	var buscador = document.getElementById('inptProductoListadoDespachar').value
	var local = document.getElementById("inptLocalProductoListadoDespachar1").value;
	
	document.getElementById("table_vista_producto_despacho").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"local": local,
		"formato": "json",
		"funt": "buscarvistalistadodespacho"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_producto_despacho").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_producto_despacho").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById('inptCantProductoListadoDespachar').value = '';
				var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
				if(hayRegistros){
				var listado = iniciarListadoVistaProductoDespacho();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_producto_despacho").innerHTML = datos_buscados || "";
				}else{
					ver_vetana_informativa("PRODUCTO NO ECONTRADO")
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

function buscarvistaproductodesdesalidadeposito() {
	var buscador = document.getElementById('inptProductoSalidadDeposito').value
	var local = document.getElementById("inptLocalProductoSalidadDeposito1").value;
	var stock = document.getElementById("inptLocalProductoSalidadDeposito2").value;
	
	document.getElementById("table_abm_listado_salida_deposito").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"local": local,
		"stock": stock,
		"formato": "json",
		"funt": "buscarvistasalidadeposito"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_listado_salida_deposito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_listado_salida_deposito").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
				if(hayRegistros){
				var listado = iniciarListadoVistaProductoSalidaDeposito();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_abm_listado_salida_deposito").innerHTML = datos_buscados || "";
				}else{
					ver_vetana_informativa("PRODUCTO NO ECONTRADO")
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
var codProductoFkSalidaDeposito="";
var codigoProductoSalidadDeposito="";
function obtenerdatosvistaproductodesdeSalidadDeposito(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	codProductoFkSalidaDeposito = $(datostr).children('td[id="td_id"]').html();
	codigoProductoSalidadDeposito = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptProductoSalidadDeposito').value = $(datostr).children('td[id="td_datos_1"]').html();
		stockAnteriorSalidaDeposito= $(datostr).children('td[id="td_datos_6"]').html();
		document.getElementById('inptCantProductoListadoDespachar').value = "";
		document.getElementById('btnGuardarSalidaDeposito').style = "";
		
}


function recorrerFocusTableProductoCompra(datos){

	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	var id=$(datos).attr("name")
	var total=$(datos).attr("class")
	var control=$(datos).attr("value")
	$("tr[name=trVistaProducto_"+id+"]").attr("class","tableRegistroSelec")
	
	
}
function obtenerdatosvistaproductodesdecompra(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
ElementoProductoVista=datostr	
idFkProductocompra = $(datostr).children('td[id="td_id"]').html();
cod_productoDetallePrecio=idFkProductocompra 
	
		document.getElementById('inptCodProductoCompra').value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptProductoCompra').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCantProductoCompra').value = "0";
		document.getElementById('inptCostoProductoCompra').value = $(datostr).children('td[id="td_datos_5"]').html();
		document.getElementById('inptprecioListaProductoCompra').value = $(datostr).children('td[id="td_datos_5"]').html();
		document.getElementById('inptPorcVentaProductoContadoCompra').value = $(datostr).children('td[id="td_datos_14"]').html();
		document.getElementById('inptPrecioVentaProductoContadoCompra').value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inptCantProductoCompra').focus();
		document.getElementById("btneditarproductocompras").style.backgroundColor="#FF5722";
		document.getElementById("btneditarprecioscompras").style.backgroundColor="rgb(14 14 14)";
		document.getElementById("btnAddDetalleCompra").style.backgroundColor="#2196F3";
		
		
}
function recorrerFocusTableProductoVenta(datos){

	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	var id=$(datos).attr("name")
	var total=$(datos).attr("class")
	var control=$(datos).attr("value")
	$("tr[name=trVistaProducto_"+id+"]").attr("class","tableRegistroSelec")
	
	
}
var preciocostocontado="";
var preciocostocredito="";
var StockVenta="";
var preciocostoProducto="";
var promoproducto = "";
var precioMinimoProducto = "";
function obtenerdatosvistaproductodesdeventa(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	ElementoProductoVista=datostr	
	var controlstock = $(datostr).children('td[id="td_datos_15"]').html();
	StockVenta = $(datostr).children('td[id="td_datos_15"]').html();
		
		if( accesosuser["STOCK0"]["accion"]!="SI")
	{
			if(controlstock<=0){
				ver_vetana_informativa("NO PUEDES VENDER PRODUCTOS CON STOCK MENOR A 0")
				return
			}
	}
		preciocostoProducto=$(datostr).children('td[id="td_datos_5"]').html();
		idFkProducto = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCodProductoVenta').value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptProductoVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inpTSeleccCosto').innerHTML = $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById('inptCantProductoVenta').value = "1";
		document.getElementById('inptCostoProductoVenta').value = $(datostr).children('td[id="td_datos_4"]').html();
		preciocostocontado= $(datostr).children('td[id="td_datos_4"]').html();
		// promoproducto= $(datostr).children('td[id="td_datos_16"]').html();
		preciocostocontado=QuitarSeparadorMilValor(preciocostocontado)
		preciocostocredito=QuitarSeparadorMilValor(preciocostocontado)
		document.getElementById('inptDescuentoProductoVenta').value = "0";
		document.getElementById('inptComisionVenta').value = "0";
		document.getElementById('inptObservacionDetalleVenta').value = "Contado";
		if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){ 
		document.getElementById('inptObservacionDetalleVenta').value = "Credito";
		document.getElementById("inptCostoProductoVenta").value= $("#inpTSeleccCosto option:first").val();
		preciocostocredito=QuitarSeparadorMilValor(document.getElementById("inptCostoProductoVenta").value)
		}
		precioMinimoProducto= $(datostr).children('td[id="td_datos_17"]').html();
		document.getElementById('btnAddDetallesaVenta').style.backgroundColor = "#2196F3";
		document.getElementById('btnSolicitarDescuento').style.backgroundColor = "#4caf50";
		document.getElementById('inptCantProductoVenta').focus();
		calcularTotalVentasCosto(document.getElementById('inptCostoProductoVenta'))
		// buscardetallespreciodesdevista("vistaventa");
}



var controlseleccvistaproducto = ""
var ElementoProductoVista = ""
function obtenerdatosvistaproducto(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
ElementoProductoVista=datostr	
		idFkProducto = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptProductoNombreVista').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptProductoCategoriaVista').value = $(datostr).children('td[id="td_datos_12"]').html();
		document.getElementById('inptProductoStockVista').value = $(datostr).children('td[id="td_datos_6"]').html();
		document.getElementById('inptProductoPrecioContadoVista').value = $(datostr).children('td[id="td_datos_4"]').html();
		buscardetallespreciodesdevista("vista") 
}
function EnviarProductoDesde() {    
	if(ElementoProductoVista==""){
	ver_vetana_informativa("FALTO SELECCIONAR EL PRODUCTO")
	return false;
	}
    datostr=ElementoProductoVista
	if (controlseleccvistaproducto == "venta") {
		
		
		var controlstock = $(datostr).children('td[id="td_datos_15"]').html();
		
		if( accesosuser["STOCK0"]["accion"]!="SI")
	{
	if(controlstock<=0){
			ver_vetana_informativa("NO PUEDES VENDER PRODUCTOS CON STOCK MENOR A 0")
		return
	}
	}
		idFkProducto = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCodProductoVenta').value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptProductoVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCostoProductoVenta').value = $(datostr).children('td[id="td_datos_4"]').html();
		preciocostocontado= $(datostr).children('td[id="td_datos_4"]').html();
		preciocostocontado=QuitarSeparadorMilValor(preciocostocontado)
		preciocostocredito=QuitarSeparadorMilValor(preciocostocontado)
		document.getElementById('inpTSeleccCosto').innerHTML = $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById('inpTotalCostoVenta').value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inptCantProductoVenta').value = "1";
		document.getElementById('inptDescuentoProductoVenta').value = "0";
		document.getElementById('inptObservacionDetalleVenta').value = "Contado";
		document.getElementById('inptDetallesVentaProductos').value = "";
		document.getElementById('btnAddDetallesaVenta').style.backgroundColor = "#2196F3";
		document.getElementById('btnSolicitarDescuento').style.backgroundColor = "#4caf50";
		document.getElementById("inptComisionVenta").value = $(datostr).children('td[id="td_datos_8"]').html();
		if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
		document.getElementById('inptObservacionDetalleVenta').value = "";
		document.getElementById("inptCostoProductoVenta").value= $("#inpTSeleccCosto option:first").val();
		preciocostocredito=QuitarSeparadorMilValor(document.getElementById("inptCostoProductoVenta").value)
		}
	}
	
	if (controlseleccvistaproducto == "compra") {
		idFkProductocompra = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptProductoCompra').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCostoProductoCompra').value = $(datostr).children('td[id="td_datos_5"]').html();
		document.getElementById('inptPorcVentaProductoContadoCompra').value = $(datostr).children('td[id="td_datos_14"]').html();
		document.getElementById('inptPrecioVentaProductoContadoCompra').value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inptCantProductoVenta').value = "";
		document.getElementById("btneditarproductocompras").style.backgroundColor="#FF5722";
		document.getElementById("btneditarprecioscompras").style.backgroundColor="rgb(14 14 14)";
		document.getElementById("btnAddDetalleCompra").style.backgroundColor="#2196F3";
	}
	if (controlseleccvistaproducto == "cambiodevolucion") {
		limpiarCamposProductosCambios()
		idFkProductocompraCambio = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptProductoSeleccCambio').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCostoCambio').value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inpTotalCostoCambio').value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inpTSeleccCostoCambio').innerHTML = $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById('inptCantCambio').value = "1";
		document.getElementById('inptDescuentoCambio').value = "0";
       document.getElementById('inptObservacionCambio').value = "Contado";
	}
	
	if (controlseleccvistaproducto == "solicitud1") {
		codProductoSolicitud1 = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptSeleccProductoSolicitud1').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById("inptlocalSolicitud1").value= $(datostr).children('td[id="td_datos_7"]').html();
	}
	if (controlseleccvistaproducto == "solicitud2") {
		codProductoSolicitud2 = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptSeleccProductoSolicitud2').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById("inptlocalSolicitud2").value= $(datostr).children('td[id="td_datos_7"]').html();
	}
	document.getElementById("divVistaProducto").style.display = "none"
	document.getElementById("table_abm_vista_producto").innerHTML = ""
	document.getElementById("table_abm_vista_precios_producto").innerHTML = ""
	document.getElementById("inptProductoNombreVista").value = ""
	document.getElementById("inptProductoCategoriaVista").value = ""
	document.getElementById("inptProductoPrecioContadoVista").value = ""
	document.getElementById("inptProductoStockVista").value = ""
	document.getElementById("inptBuscarVistaProducto").value = ""
}
var codProveedorFkCompra="";
function EditarProductodesdecompra() {
	if(idFkProductocompra==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO ")
		return
	}
	
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkProductocompra,
		"formato": "json",
		"funt": "buscarporcodigoeditar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					var datos_buscados = datos[2];
					var filaEdicion = null;
					if (Array.isArray(datos_buscados) && datos_buscados.length) filaEdicion = renderizarProductoEdicionEstructurado(datos_buscados[0]);
					else {
						document.getElementById("table_abm_vista_producto").innerHTML = datos_buscados || "";
						filaEdicion = document.getElementById("tbRegistroCodProducto");
					}
					if (!filaEdicion) { ver_vetana_informativa("PRODUCTO NO ENCONTRADO"); return; }
					obtenerdatosabmProducto($(filaEdicion))
					document.getElementById("divAbmProducto").style.display=""
					document.getElementById("imgCerrarProducto").style.display=""
					document.getElementById("imgMinimizaeProducto").style.display="none"
					document.getElementById('divAbmProducto1').classList.add("productos-listado-oculto")
	document.getElementById('divAbmProducto2').style.display = ""
	//  
	document.getElementById('inptlocalProducto').value =document.getElementById("inptlocalCompra").value
	cod_productoDetallePrecio=idAbmProducto
	buscardetallesprecio()
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarproductoporcodigo(d) {
	if(d=="venta"){
		var buscador = document.getElementById('inptCodProductoVenta').value
		var local = document.getElementById("inptlocalVenta").value;
		document.getElementById('btnAddDetallesaVenta').style.backgroundColor = "#b7b7b7";
		document.getElementById('btnSolicitarDescuento').style.backgroundColor = "#b7b7b7";
	}
	if(d=="compra"){
		var buscador = document.getElementById('inptCodProductoCompra').value
		var local = document.getElementById("inptlocalCompra").value;
	}	
	if(buscador==""){
		return
	}
	buscarProductoPorCodigo2(buscador,d);
}

function buscarProductoPorCodigo2(codigo,d) {
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": codigo,
		"local": cod_localFKUSer,
		"formato": "json",
		"funt": "buscarporcodigo"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					var datos_buscados = datos["2"];
					var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
					if(!hayRegistros){
						ver_vetana_informativa("PRODUCTO NO ENCONTRADO")
						return false;
					}
					var listado = iniciarListadoVistaProductoGeneral();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_vista_producto").innerHTML = datos_buscados || "";
					var filaProducto = document.getElementById("table_abm_vista_producto").querySelector("tr[id=tbSelecRegistro]");
					if(d=="venta"){
	            	controlseleccvistaproducto="venta"
					if (filaProducto) obtenerdatosvistaproducto(filaProducto)
					EnviarProductoDesde()
					
					document.getElementById('inptCantProductoVenta').focus();
	                }
					if(d=="compra"){
	            	controlseleccvistaproducto="compra"
					if (filaProducto) obtenerdatosvistaproducto(filaProducto)
					EnviarProductoDesde()
					
					document.getElementById('inptCantProductoCompra').focus();
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

var codProductoFkListadoDespacho="";
var codigoProductolistadoDespacho="";
var CantidadProductolistadoDespacho="";
function obtenerdatosvistaproductodesdelistadodespacho(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	codProductoFkListadoDespacho = $(datostr).children('td[id="td_id"]').html();
	codigoProductolistadoDespacho = $(datostr).children('td[id="td_datos_13"]').html();
	CantidadProductolistadoDespacho = $(datostr).children('td[id="td_datos_6"]').html();
		document.getElementById('inptProductoListadoDespachar').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCantProductoListadoDespachar').value = "";
		document.getElementById('inptCantProductoListadoDespachar').focus();
		document.getElementById('btnGuardarListadoDespacho').style = "";
		
}
