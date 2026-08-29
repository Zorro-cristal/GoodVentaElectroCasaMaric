/* ABM COMBO PRODUCTOS */
var listadoVistaProductoCrearCombo = null;
var listadoDetalleComboProducto = null;
var listadoVistaComboProducto = null;

function buscarCabeceraCombo(cuerpo, idCabecera) {
	var existente = document.getElementById(idCabecera);
	if (existente) return existente;
	if (!cuerpo) return null;
	var tablas = cuerpo.parentNode ? cuerpo.parentNode.querySelectorAll("table") : [];
	for (var i = tablas.length - 1; i >= 0; i--) {
		var tabla = tablas[i];
		if (!(tabla.compareDocumentPosition(cuerpo) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
		if (!tabla.querySelector("input, select, textarea")) {
			tabla.id = idCabecera;
			return tabla;
		}
	}
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera) {
		var candidata = cabecera.tagName === "TABLE" ? cabecera : cabecera.querySelector("table");
		if (candidata && !candidata.querySelector("input, select, textarea")) {
			candidata.id = idCabecera;
			return candidata;
		}
		cabecera = cabecera.previousElementSibling;
	}
	return null;
}

function iniciarListadoDetalleComboProducto() {
	if (listadoDetalleComboProducto || !window.AbmListadoCore) return listadoDetalleComboProducto;
	var cuerpo = document.getElementById("table_abm_nuevo_combo");
	var cabecera = buscarCabeceraCombo(cuerpo, "cabeceraDetalleComboProducto");
	if (!cuerpo || !cabecera) return null;
	listadoDetalleComboProducto = window.AbmListadoCore.crear({
		nombre: "detalle_combo_producto",
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: "producto",
		columnas: [
			{ campo: "codigo_barra", titulo: "CODIGO", ancho: "10%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "75%" },
			{ campo: "precio", titulo: "PRECIO", ancho: "10%" },
			{ campo: "cantidad", titulo: "CANTIDAD", ancho: "5%" }
		],
		fila: {
			idFila: "tbSelecRegistroDetalleCombo",
			funcionSeleccion: "Obtenerdatosdetallecomboproducto",
			celdas: [
				{ campo: "codigo_detalle", tecnica: true, id: "td_id" },
				{ campo: "codigo_barra", columna: "codigo_barra" },
				{ campo: "producto", columna: "producto", id: "td_datos_1" },
				{ campo: "precio_formateado", columna: "precio" },
				{ campo: "cantidad_formateada", columna: "cantidad" },
				{ campo: "codigo_combo", tecnica: true },
				{ campo: "codigo_producto", tecnica: true }
			]
		}
	});
	listadoDetalleComboProducto.iniciar();
	return listadoDetalleComboProducto;
}

function agregarCeldaVistaCombo(fila, id, valor, ancho, visible) {
	var celda = document.createElement("td");
	if (id) celda.id = id;
	if (visible === false) celda.style.display = "none";
	else if (ancho) celda.style.width = ancho;
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function crearFilaVistaCombo(registro, columnasActivas, util, indice) {
	var activas = {};
	columnasActivas.forEach(function (columna) { activas[columna.campo] = columna; });
	var tabla = document.createElement("table");
	tabla.className = indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";

	if (registro.modo_solicitud && registro.es_resumen_combo) {
		tabla.style.display = "none";
		fila.setAttribute("name", "trListadoComboProductoVenta");
		agregarCeldaVistaCombo(fila, "td_datos_13", registro.codigo_barra, "", false);
		agregarCeldaVistaCombo(fila, "", registro.codigo_barra, "10%", true);
		agregarCeldaVistaCombo(fila, "td_id", registro.codigo, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_1", registro.producto, "30%", true);
		agregarCeldaVistaCombo(fila, "", registro.marca, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_2", registro.descripcion, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_12", registro.categoria, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_3", registro.unidad, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_5", registro.costo_formateado, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_7", registro.codigo_local, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_8", registro.comision, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_9", registro.estado, "", false);
		agregarCeldaVistaCombo(fila, "td_datos_10", "", "", false);
		agregarCeldaVistaCombo(fila, "td_datos_11", registro.precio_combo_total_formateado, "20%", true);
		agregarCeldaVistaCombo(fila, "td_datos_6", "", "20%", true);
		agregarCeldaVistaCombo(fila, "td_datos_16", registro.cantidad_formateada, "20%", true);
		agregarCeldaVistaCombo(fila, "td_datos_17", registro.precio_combo_total, "", false);
		tabla.appendChild(fila);
		return tabla;
	}

	fila.setAttribute("name", registro.modo_solicitud ? "trListadoComboProductoVenta2" : "trListadoComboProductoVenta");
	agregarCeldaVistaCombo(fila, "td_datos_13", registro.codigo_barra, "", false);
	if (activas.codigo_barra) agregarCeldaVistaCombo(fila, "", registro.codigo_barra, activas.codigo_barra.ancho, true);
	agregarCeldaVistaCombo(fila, "td_id", registro.codigo, "", false);
	if (activas.producto) agregarCeldaVistaCombo(fila, "td_datos_1", registro.producto, activas.producto.ancho, true);
	agregarCeldaVistaCombo(fila, "", registro.marca, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_2", registro.descripcion, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_12", registro.categoria, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_3", registro.unidad, "", false);
	if (activas.precio) agregarCeldaVistaCombo(fila, "td_datos_4", registro.precio_formateado, activas.precio.ancho, true);
	agregarCeldaVistaCombo(fila, "td_datos_5", registro.costo_formateado, "", false);
	if (activas.stock) agregarCeldaVistaCombo(fila, "td_datos_6", registro.stock, activas.stock.ancho, true);
	agregarCeldaVistaCombo(fila, "td_datos_7", registro.codigo_local, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_8", registro.comision, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_9", registro.estado, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_10", registro.local, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_11", registro.detalle_precios, "", false);
	agregarCeldaVistaCombo(fila, "td_datos_15", registro.stock, "", false);
	if (activas.cantidad) agregarCeldaVistaCombo(fila, "td_datos_16", registro.cantidad_formateada, activas.cantidad.ancho, true);
	agregarCeldaVistaCombo(fila, "td_datos_17", registro.codigo_combo || registro.precio_combo_total, "", false);
	tabla.appendChild(fila);
	return tabla;
}

function iniciarListadoVistaComboProducto() {
	if (listadoVistaComboProducto || !window.AbmListadoCore) return listadoVistaComboProducto;
	var cuerpo = document.getElementById("table_vista_combo_producto");
	var cabecera = buscarCabeceraCombo(cuerpo, "cabeceraVistaComboProducto");
	if (!cuerpo || !cabecera) return null;
	listadoVistaComboProducto = window.AbmListadoCore.crear({
		nombre: "vista_combo_producto",
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: "producto",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "10%" },
			{ campo: "producto", titulo: "DESCRIPCION", ancho: "30%" },
			{ campo: "precio", titulo: "PRECIO VENTA", ancho: "20%" },
			{ campo: "stock", titulo: "STOCK", ancho: "20%" },
			{ campo: "cantidad", titulo: "CANTIDAD", ancho: "20%" }
		],
		crearFila: crearFilaVistaCombo
	});
	listadoVistaComboProducto.iniciar();
	return listadoVistaComboProducto;
}

function iniciarListadoVistaProductoCrearCombo() {
	if (listadoVistaProductoCrearCombo) return listadoVistaProductoCrearCombo;
	if (typeof window.crearListadoVistaProductos !== "function") return null;
	listadoVistaProductoCrearCombo = window.crearListadoVistaProductos({
		nombre: "vista_producto_crear_combo",
		idCuerpo: "table_vista_buscar_producto_combo",
		idCabecera: "cabeceraVistaProductoCrearCombo",
		funcionSeleccion: "Obtenerdatosbuscarproductocombo",
		campoDato16: "precio",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "10%", id: "td_datos_13" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "stock", titulo: "STOCK", ancho: "10%", id: "td_datos_6", valor: function (r) { return r.stock; } },
			{ campo: "costo", titulo: "COSTO", ancho: "10%", id: "td_datos_17", valor: function (r) { return r.costo_formateado; } }
		]
	});
	return listadoVistaProductoCrearCombo;
}
function verCerrarAbmCombo(d){
	if(idAbmProducto == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN PRODUCTO');
		return;
	}
	
	if(!controlProductoTipoCombo){
		ver_vetana_informativa('ESTE PRODUCTO NO ES TIPO COMBO');
		return;
	}
	
	buscardetallescomboproducto()
	if(d=="1"){
		$("div[id=divAbmCombo]").fadeIn(500);
		/* limpiarCamposAbmCombo() */
	}else{
		$("div[id=divAbmCombo]").fadeOut(500);
		limpiarCamposAbmCombo()
	}
}
function buscarvistaproductocrearcomboproductos() {
	var buscador = document.getElementById('inptProductoBuscarProductoCombo').value
	var stock = document.getElementById("inptStockProductoCombo").value;
	document.getElementById("table_vista_buscar_producto_combo").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"stock": stock,
		"formato": "json",
		"funt": "buscarvistaproductocombo"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_buscar_producto_combo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_buscar_producto_combo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
				if(hayRegistros){
				var listado = iniciarListadoVistaProductoCrearCombo();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_buscar_producto_combo").innerHTML = datos_buscados || "";
				document.getElementById('btnAddProductoACombo').style.backgroundColor = '#b7b7b7';
				
				document.getElementById('inptMontoDescuentoComboProducto').disabled = true;
				$('#inptMontoDescuentoComboProducto').removeClass('inputText');
				$('#inptMontoDescuentoComboProducto').addClass('inputTextDisable');
				elementoComboProducto = '';
				}else{
					ver_vetana_informativa("PRODUCTO NO ENCONTRADO")
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
var cod_productoFKCombo = '';
var elementoComboProducto = '';
function Obtenerdatosbuscarproductocombo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	cod_productoFKCombo = $(datostr).children('td[id="td_id"]').html();
	elementoComboProducto = datostr;
	
	document.getElementById('btnAddProductoACombo').style.backgroundColor = ''
	document.getElementById('inptProductoBuscarProductoCombo').value= $(datostr).children('td[id="td_datos_1"]').html();
	
	document.getElementById('inptCantidadComboProducto').disabled = false;
	document.getElementById('inptCantidadComboProducto').focus();
	
	
	if($(datostr).children('td[id="td_datos_1"]').html() == 'DESCUENTO'){
		document.getElementById('inptMontoDescuentoComboProducto').disabled = false;
		$("#inptMontoDescuentoComboProducto").removeClass("inputTextDisable");
		$("#inptMontoDescuentoComboProducto").addClass("inputText");
		document.getElementById('inptMontoDescuentoComboProducto').focus();
		document.getElementById('inptCantidadComboProducto').disabled = true;
	}else if(document.getElementById('inptMontoDescuentoComboProducto').disabled == false){
		document.getElementById('inptMontoDescuentoComboProducto').disabled = true;
		$("#inptMontoDescuentoComboProducto").removeClass("inputText");
		$("#inptMontoDescuentoComboProducto").addClass("inputTextDisable");
		document.getElementById('inptCantidadComboProducto').disabled = false;
	}
	
}
function limpiarCamposAbmCombo(){
	document.getElementById('table_vista_buscar_producto_combo').innerHTML = '';
	document.getElementById('table_abm_nuevo_combo').innerHTML = '';
	
	document.getElementById('inptProductoBuscarProductoCombo').value = '';
	document.getElementById('inptRegistroNroCombo').value = '';
	document.getElementById('inptTotalPrecioCombo').value = '';
	document.getElementById('inptRegistroSeleccListadoDepacho').value = '';
}
function addProductoACombo(){
	var datos = new FormData();
	if(elementoComboProducto == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN PRODUCTO');
		return;
	}
	
	if($(elementoComboProducto).children('td[id="td_datos_1"]').html() == 'DESCUENTO'){
		if(document.getElementById('inptMontoDescuentoComboProducto').value == '' || document.getElementById('inptMontoDescuentoComboProducto').value == '0'){
			document.getElementById('inptMontoDescuentoComboProducto').value = 0;
			document.getElementById('inptMontoDescuentoComboProducto').focus();
			ver_vetana_informativa('FALTO INGRESAR EL MONTO A DESCONTAR DEL COMBO');
			return;
		}
	}
	
	let cantidad = document.getElementById('inptCantidadComboProducto').value;
	if(cantidad == '' && $(elementoComboProducto).children('td[id="td_datos_1"]').html() != 'DESCUENTO'){
		ver_vetana_informativa('FALTÓ INGRESAR LA CANTIDAD');
		return;
	}
	
	let monto_descuento = 0;
	if($(elementoComboProducto).children('td[id="td_datos_1"]').html() == 'DESCUENTO'){
		monto_descuento = document.getElementById('inptMontoDescuentoComboProducto').value;
		cantidad = 1;
	}
	
	
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'add_producto_combo')
	datos.append("idcombo_producto", idAbmProducto)
	datos.append("cod_productoFK", cod_productoFKCombo)
	datos.append("monto_descuento", monto_descuento)
	datos.append("cantidad", cantidad)
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
					buscardetallescomboproducto()
					document.getElementById('inptCantidadComboProducto').value = '';
					document.getElementById('inptMontoDescuentoComboProducto').value = '';
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	
}
var id_detalle_combo_producto = '';
function Obtenerdatosdetallecomboproducto(datostr) {
	$("tr[id=tbSelecRegistroDetalleCombo]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	
	id_detalle_combo_producto = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptRegistroSeleccProductoCombo').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('btnEliminarProductoCombo').style.backgroundColor = '#dd0000';
}
function EliminarProductoCombo() {
	if(id_detalle_combo_producto == ''){
		ver_vetana_informativa('FALTÓ SELECCCIONAR UN PRODUCTO DE LA LISTA DE PRODUCTOS COMBO');
		return;
	}
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'eliminar_producto_combo')
	datos.append("id_detalle_combo_producto", id_detalle_combo_producto)
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
					id_detalle_combo_producto = '';
					buscardetallescomboproducto()
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

function buscardetallescomboproducto() {
	document.getElementById("table_abm_nuevo_combo").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscardetallescomboproducto",
		"idcombo_producto": idAbmProducto,
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_nuevo_combo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_nuevo_combo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				id_detalle_combo_producto = '';
				var listado = iniciarListadoDetalleComboProducto();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_abm_nuevo_combo").innerHTML = datos_buscados || "";
				document.getElementById('btnAddProductoACombo').style.backgroundColor = '#b7b7b7';
				document.getElementById('inptTotalPrecioCombo').value = datos[4];
				document.getElementById('inptPrecioCompraProducto').value = datos[4];
				document.getElementById('inptRegistroNroCombo').value = datos[3];
				document.getElementById('inptRegistroSeleccProductoCombo').value = '';
				document.getElementById('btnEliminarProductoCombo').style.backgroundColor = '#b7b7b7';
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

var controlProductoTipoCombo = '';
function comprobarproductotipocombo() {
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "comprobarproductotipocombo",
		"idproducto": idAbmProducto,
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
				var datos_buscados = datos[2];
				controlProductoTipoCombo = datos_buscados;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

/* VISTA COMBO */
function vercerrarvistacombo(d,desde){
	if(d=="1"){
		$("div[id=divVistaCombo]").fadeIn(500);
	}else{
		$("div[id=divVistaCombo]").fadeOut(500);
	}
	
	document.getElementById('btnanhadirproductocomboventa').style.display = 'none';
	document.getElementById('btnanhadirproductocombosolicitud').style.display = 'none';
	
	if(desde == "venta"){
		document.getElementById('btnanhadirproductocomboventa').style.display = '';
	}
	if(desde == "solicitud"){
		document.getElementById('btnanhadirproductocombosolicitud').style.display = '';
	}
	if(desde == "vista_solicitud"){
		document.getElementById('btnanhadirproductocombosolicitud').style.display = 'none';
	}
}
function buscarvistacomboproducto(cod_comboFKproducto,desde) {
	document.getElementById("table_vista_combo_producto").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_comboFK": cod_comboFKproducto,
		"cod_localFK": cod_localFKUSer,
		"formato": "json",
		"funt": "buscar_vista_productos_combo"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_combo_producto").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_combo_producto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				if (Array.isArray(datos_buscados)) {
					datos_buscados.forEach(function (registro) { registro.modo_solicitud = false; });
				}
				var listado = iniciarListadoVistaComboProducto();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_combo_producto").innerHTML = datos_buscados || "";
				vercerrarvistacombo('1',desde)
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarvistacomboproductosolicitud(cod_comboFKproducto,desde,cod_local) {
	document.getElementById("table_vista_combo_producto").innerHTML = paginacargando
	var local = document.getElementById("inptlocalVenta").value;
	cantidadCuotaSolicitud=document.getElementById('inptCantidadCuotaSolicitud').value;
	
	// alert(cod_localFKSolicitudCredito)
	
	var ConDescuento="NO";
	if(document.getElementById("checkDescuentoSolicitudCredito").checked==true){
		ConDescuento="SI";
	} 
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_comboFK": cod_comboFKproducto,
		"local": cod_local,
		"cantidadCuotaSolicitud": cantidadCuotaSolicitud,
		"ConDescuento": ConDescuento,
		"formato": "json",
		"funt": "buscar_vista_productos_combo_solicitud"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_combo_producto").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_combo_producto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				if (Array.isArray(datos_buscados)) {
					datos_buscados.forEach(function (registro) { registro.modo_solicitud = true; });
				}
				var listado = iniciarListadoVistaComboProducto();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_combo_producto").innerHTML = datos_buscados || "";
				vercerrarvistacombo('1',desde)
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function anhadirProductoEnDetalleVentaDesdeCombos(){
	
	var entrega= document.getElementById('inptEntregaVenta').value
	if(entrega==""){
		ver_vetana_informativa("FALTO AGREGAR ENTREGA")
		return false;
	}
	
	
	var controlStock = false;

/* COMPROBAR STOCK */
	$("tr[name=trListadoComboProductoVenta]").each(function(i, elementohtml){

	var stock_producto = $(elementohtml).children('td[id="td_datos_6"]').html();
	stock_producto = parseInt(stock_producto);
	
	// console.log(stock_producto);
	
	if( accesosuser["STOCK0"]["accion"]!="SI")
	{
		if(stock_producto<=0){
			ver_vetana_informativa("NO PUEDES VENDER PRODUCTOS CON STOCK MENOR A 0")
			controlStock = true;
			return;
		}
	}
});

if(controlStock){
	return;
}
	
	var ContadoranhadirVenta=0;
	$("tr[name=tdDetalleVenta]").each(function(i, elementohtml){
ContadoranhadirVenta= ContadoranhadirVenta +1 ;
	   });
	 if(ContadoranhadirVenta!=0){
		   ver_vetana_informativa("NO ES POSIBLE AGREGAR UN PRODUCTO A UNA VENTA FINALIZADO")
		 
		   return false;
	   }
	
	if(idabmAperturacierrecaja==""){
		   ver_vetana_informativa("FALTO INICIAR UNA CAJA")
		   verCerrarVentanaAbmAperturaCierreCaja1()
		   return
	   }
	
	DatosAutoCompleteCredito=new Array ();
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	if (inptTotalPagado > 0) {
		ver_vetana_informativa("NO SE PUEDE AÑADIR DETALLE A LA VENTA POR QUE ESTE YA CUENTA CON UN PAGO")
		return false;
	}
	
	var acceso = document.getElementById('inptAccesoCreditoVentaCliente').value
	if(acceso=="Denegado"){
		var estado=document.getElementById("inptSeleccTipoVenta").value;
		if(estado=="CREDITO"){
			ver_vetana_informativa("EL CLIENTE NO ESTA AUTORIZADO PARA VENTAS A CREDITOS")
		return false;
		}
	}
	
	document.getElementById('inptSeleccTipoVenta').disabled=true
	
	$("tr[name=trListadoComboProductoVenta]").each(function(i, elementohtml){
	
	
	idFkProducto = $(elementohtml).children('td[id="td_id"]').html();
	var inptCodProductoVenta = $(elementohtml).children('td[id="td_datos_13"]').html();
	var inptProductoVenta = $(elementohtml).children('td[id="td_datos_1"]').html();
	var inptCostoProductoVenta = $(elementohtml).children('td[id="td_datos_4"]').html();
	var inptCantProductoVenta = $(elementohtml).children('td[id="td_datos_16"]').html();
	// var resultado = $(elementohtml).children('td[id="td_datos_6"]').html();
	// resultado = parseInt(resultado);
	var inptDescuentoProductoVenta = 0;
	var StockVenta = $(elementohtml).children('td[id="td_datos_15"]').html()
	var cod_combo = $(elementohtml).children('td[id="td_datos_17"]').html()
	
	var inptDetallesVentaProductos = document.getElementById('inptDetallesVentaProductos').value
	

	var inpTotalCostoVenta = Number(inptCantProductoVenta) * Number(QuitarSeparadorMilValor(inptCostoProductoVenta));
	var inptComisionVenta = $(elementohtml).children('td[id="td_datos_8"]').html();
	
	/* var inptlocalVenta = document.getElementById('inptlocalVenta').value 
	var inptObservacionDetalleVenta = document.getElementById('inptObservacionDetalleVenta').value */
	
	
	
	var porcentajealcontado =$("select[id=inpTSeleccCosto]").children(":selected").attr("style")
	var porcentajeCredito =$("select[id=inpTSeleccCosto]").children(":selected").attr("class")
	var PrecioContadoProducto =$("select[id=inpTSeleccCosto]").children(":selected").attr("url")
	
	
	if(inptCantProductoVenta<=0|| inptCantProductoVenta==""){
		ver_vetana_informativa("FAVOR AGREGAR CANTIDAD")
		return false;
	}
	
 
	
	
	inptDetallesVentaProductos =inptDetallesVentaProductos.replace(new RegExp("\n","g"), "<br>")
	var CuotaNro =$("select[id=inpTSeleccCosto]").children(":selected").attr("id")
	/* if (idFkProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
		return false;
	} */
	var nroid=Math.floor((Math.random() * 1000) + 1);
	var pagina="<table id='tdDetalleVenta_"+nroid+"' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>"
+"<tr id='tbSelecRegistro' onclick='SeleccionarProductoVentaOffline(this)'  name='tdDetalleVentaOffline'>"
+"<td id='td_id_1' style='display:none'>"+idFkProducto+"</td>"
+"<td id='td_id_2' style='display:none'>"+nroid+"</td>"
+"<td  id='td_datos_8' style='width:5%'>"+inptCodProductoVenta+"</td>"
+"<td  id='td_datos_1' style='width:20%;'>"+inptProductoVenta+"</td>"
+"<td  id='td_datos_6' style='display:none'>"+inptDetallesVentaProductos+"</td>"
+"<td  id='td_datos_3' style='width:10%'>"+inptCostoProductoVenta+"</td>"
+"<td  id='td_datos_4' style='width:5%'>"+inptCantProductoVenta+"</td>"
+"<td  id='td_datos_9' style='display:none'>"+inptDescuentoProductoVenta+"</td>"
+"<td  id='td_datos_5' style='width:10%'>"+separadordemilesnumero(inpTotalCostoVenta)+"</td>"
+"<td  id='td_datos_7' style='display:none'>"+inptComisionVenta+"</td>"



+"<td  id='td_datos_10' style='display:none'>"+CuotaNro+"</td>"
+"<td  id='td_datos_11' style='display:none'>"+entrega+"</td>" 
+"<td  id='td_datos_12' style='display:none'>"+porcentajealcontado+"</td>"
+"<td  id='td_datos_13' style='display:none'>"+porcentajeCredito+"</td>"
+"<td  id='td_datos_14' style='display:none'>"+PrecioContadoProducto+"</td>"   
+"<td  id='td_datos_16' style='display:none'>"+cod_combo+"</td>"   



+"<td  id='td_datos_15' style='display:none'>"+separadordemilesnumero(inpTotalCostoVenta)+"</td>"
+"</tr>"
+"</table>"
document.getElementById("table_abm_detalle_venta").innerHTML+=pagina;




});
	
	

	
	
	
	$("tr[name=tdDetalleVenta]").each(function(i, elementohtml){
ContadoranhadirVenta= ContadoranhadirVenta +1 ;
	   });

var totalVenta=0;
var SubtotalVenta=0;
var totaldescuento=0;
var control=0;
$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_15"]').html();
var totaldescuentos=$(elementohtml).children('td[id="td_datos_9"]').html();
totaldescuentos=QuitarSeparadorMilValor(totaldescuentos)
total=QuitarSeparadorMilValor(total)
totalVenta=Number(totalVenta)+Number(total)
totaldescuento=Number(totaldescuento)+Number(totaldescuentos)
SubtotalVenta=Number(totalVenta)+Number(totaldescuento)
control=control+1;
	   });
	   
	   if(control=="1"){
		   DatosAutoCompleteCredito.push(CuotaNro)
	   }
	   



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var totalPrecioPresupuesto =0
	   
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	   

	   
	
	   
document.getElementById("inptSubTotalVenta").value=separadordemilesnumero(SubtotalVenta);
document.getElementById("inptTotalVenta").value=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalVenta2").innerHTML=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalDescuento").value=separadordemilesnumero(totaldescuento);
OpcionesTipoVenta();
document.getElementById("btnFinalizarVenta").style.display=""
document.getElementById("btnCancelarVenta").style.display=""

document.getElementById('inptCantProductoVenta').value = ""
document.getElementById('inpTotalCostoVenta').value = ""
document.getElementById('inptCostoProductoVenta').value = ""
document.getElementById('inptDescuentoProductoVenta').value = "0"
document.getElementById('inptObservacionDetalleVenta').value = ""
document.getElementById('inptComisionVenta').value = ""
document.getElementById('inpTSeleccCosto').innerHTML = ""
document.getElementById('inptObservacionDetalleVenta').value = ""
document.getElementById('inptProductoVenta').value = ""
document.getElementById('inptDetallesVentaProductos').value = ""
document.getElementById('btnAbmVenta').style.display = "none"
document.getElementById('btnAddDetallesaVenta').style.backgroundColor = "#b7b7b7";
document.getElementById('btnSolicitarDescuento').style.backgroundColor = "#b7b7b7";
idFkProducto = ""
vercerrarvistacombo("2","")
}

function anhadirProductoEnDetalleSolicitudDesdeCombos(){	
if (!solicitudCreditoPermiteEditarProductos()) {
	ver_vetana_informativa("NO SE PUEDE MODIFICAR PRODUCTOS DE UNA SOLICITUD FINALIZADA")
	return false;
}
var control = false;
var totalCostoCombo = '';
var controlStock = false;
 

// return;
/* AGREGAR EN BUCLE */
	$("tr[name=trListadoComboProductoVenta]").each(function(i, elementohtml){
		
		
	var inptRefCodProducto = $(elementohtml).children('td[id="td_datos_13"]').html();
	var inptRefNombreProducto = $(elementohtml).children('td[id="td_datos_1"]').html();
	var inptRefproductoPrecio = $(elementohtml).children('td[id="td_datos_11"]').html();
	var inptRefCantidadProducto = $(elementohtml).children('td[id="td_datos_16"]').html();
	totalCostoCombo = $(elementohtml).children('td[id="td_datos_17"]').html();
	idFkProducto = $(elementohtml).children('td[id="td_id"]').html();
	/* var inpTPrecioSolicitud = document.getElementById('inpTPrecioSolicitud').value */


	var valor = document.getElementById('inptCantidadCuotaSolicitud').value;

	if( totalCostoCombo==="0"){
				ver_vetana_informativa("ESTE COMBO CONTIENE PRODUCTOS SIN PRECIO")
				control = true;
				return;
	}
	
	

	if(inptRefCantidadProducto <= 0|| inptRefCantidadProducto==""){
		ver_vetana_informativa("FAVOR AGREGAR CANTIDAD")
		control = true;
		return;
	}
	

	var selectorPrecioSolicitud = document.getElementById('inpTPrecioSolicitud');
	var CuotaNro = selectorPrecioSolicitud ? $(selectorPrecioSolicitud).children(":selected").attr("id") : "";
	/* if (idFkProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
		return false;
	} */
	
	// var cod_localCombo =document.getElementById('inptLocalVentaSolicitudCredito').value
	
	var btnVerComboVista = `<input type='button' value='VER' style='width:100%' class='btn4' onclick="buscarvistacomboproductosolicitud(${idFkProducto},'vista_solicitud','cod_localFKUSer')">`;
	
	var nroid=Math.floor((Math.random() * 1000) + 1);
	var cuotaOriginal = CuotaNro;
	if (cuotaOriginal == "" || cuotaOriginal == undefined || cuotaOriginal == "undefined") {
		cuotaOriginal = valor;
	}
	var cuotaVisible = obtenerCuotasRestantesSolicitudCredito(cuotaOriginal, obtenerMontoEntregaSolicitudCredito());
	var pagina="<table id='tdDetalleVenta_"+nroid+"' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>"
+"<tr id='tbSelecRegistro' onclick='obtenerdatosProductoCredito(this)'  name='tdDetalleSolicitudCredito'>"
+"<td id='td_id_1' style='display:none'>"+idFkProducto+"</td>"
+"<td  id='td_datos_1' style='width:20%'>"+inptRefCodProducto+"</td>"
+"<td  id='td_datos_2' style='width:30%;'>"+inptRefNombreProducto+"</td>"
+"<td  id='td_datos_3' style='width:10%'>"+inptRefCantidadProducto+"</td>"
+"<td  id='td_datos_4' style='width:20%'>"+inptRefproductoPrecio+"</td>"
+"<td  id='td_datos_5' data-cuotas-original='"+cuotaOriginal+"' style='width:10%'>"+cuotaVisible+"</td>"
+"<td  id='td_datos_6' style='display:none'>COMBO</td>"
+"<td  id='td_datos_7' style='width:10%'>"+btnVerComboVista+"</td>"
+"</tr>"
+"</table>"
document.getElementById("table_Solicitud_Credito_Producto").innerHTML+=pagina;
productosSolicitudModificados = true;
});


if(control){
	ver_vetana_informativa("EL PRODUCTO NO TIENE PRECIO O NO INGRESÓ LA CANTIDAD");
	return;
}	


recalcularTotalesSolicitudCredito();
if (typeof mostrarListadoProductosSolicitudCredito === "function") {
	mostrarListadoProductosSolicitudCredito();
}


document.getElementById('inptRefCodProducto').value = ""
document.getElementById('inptRefCantidadProducto').value = ""
document.getElementById('inptRefNombreProducto').value = ""
document.getElementById('inptRefproductoPrecio').value = ""
if(selectorPrecioSolicitud){selectorPrecioSolicitud.innerHTML = ""}
idFkProducto = ""

vercerrarvistacombo("2","")
}


/*
CLIENTES A CALLCENTER
*/
function verCerrarAbmClientesACallCenter(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmClientesACallCenter").style.display==""){
		document.getElementById("divMinimizadoClientesACallCenter").style.display="none";
		limpiarcamposbuscarClientesACallCenter();
		 ;
		$("div[id=divAbmClientesACallCenter]").fadeOut(500);	
	}else{
		if(controlacceso("VERLISTADONUEVOSCLIENTES","accion")==false){return;}
		mostrarSoloUno("divAbmClientesACallCenter")	
		document.getElementById("divAbmClientesACallCenter").style.display=""
		 
	}
}

function limpiarcamposbuscarClientesACallCenter(){
		document.getElementById("table_abm_ClientesACallCenter").innerHTML = ""
		document.getElementById("inptTotalRegistoClientesACallCenter").value = "";
}
function minimizarabmClientesACallCenter(){ 
	$("div[id=divAbmClientesACallCenter]").fadeOut(500);	
	document.getElementById("divMinimizadoClientesACallCenter").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmClientesACallCenter"));
}



function buscarabmClientesACallCenter() {
	// if(controlacceso("BUSCARLISTADODEClientesACallCenter","accion")==false){return;}
	var nombre = document.getElementById('inptBuscarAbmClientesACallCenter1').value;
	var estado_asignacion = document.getElementById('inptBuscarAbmClientesACallCenter2').value;
	var zona = document.getElementById('inptBuscarAbmClientesACallCenter3').value;
	document.getElementById("table_abm_ClientesACallCenter").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nombre": nombre,
		"estado_asignacion": estado_asignacion,
		"zona": zona,
		"funt": "buscar_nuevos_clientes"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_ClientesACallCenter").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_ClientesACallCenter").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("table_abm_ClientesACallCenter").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistoClientesACallCenter").value = datos[3]
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
// CARGAR ARCHIVO PARA ENVIAR MENSAJE
function ExploradorCSVMensaje(fileName) {
    // Seleccionamos el elemento <input> usando el valor de fileName
    var inputFile = $("input[name='" + fileName + "']");

    // Verificamos si el elemento existe antes de intentar activarlo
    if (inputFile.length > 0) {
        // Agregamos un listener para el evento change
        inputFile.off("change").on("change", function() {
            if (inputFile[0].files.length === 0) {
                console.log("No se seleccionó ningún archivo."); // Usuario presionó "Cancelar"
                ver_vetana_informativa("No se seleccionó ningún archivo."); // Mensaje opcional
            } else {
                console.log("Archivo seleccionado:", inputFile[0].files[0].name); // Archivo seleccionado
            }
        });

        // Abrimos el explorador de archivos
        inputFile.click();
    } else {
        console.error("El campo de entrada con nombre '" + fileName + "' no se encontró.");
        ver_vetana_informativa("No se encontró el campo de archivo especificado.");
    }
}

var csvMensaje="";
function readFileCSVMensaje(input){
var file=$("input[name="+input.name+"]")[0].files[0];


if (!file) {
    console.log("No se seleccionó ningún archivo.");
    return;
    }
	
	
var filename= file.name;
var tamanho = file.size;
if (tamanho > 128000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 128Mb");
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();

if (file_extension != "csv"){
ver_vetana_informativa("EL ARCHIVO SELECCIONADO NO ES CSV")
return false;
}



csvMensaje = input.files[0];
cargararchivocsv();
}
function cargararchivocsv() {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'cargarcsv')
	datos.append("csvMensaje", csvMensaje)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...");
					csvMensaje="";
					buscarabmClientesACallCenter()
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

// SOLICITAR DESCUENTO EN CREDITOS
function verCerrarSolicitarDescuentoCredito(d){
	if(d=="2"){
				
		  
		$("div[id=divSolicitarDescuentoCredito]").fadeOut(500);
		
	}else{		
	 if(controlacceso("CREARSOLICITUDDESCUENTOCREDITO","accion")==false){return;}	
		document.getElementById("divSolicitarDescuentoCredito").style.display=""
		  
		buscar_creditos_solicitar_descuento()
	}
}

function buscar_creditos_solicitar_descuento() {
 // if(controlacceso("EDITARCREDITO","accion")==false){return;}	
	document.getElementById("table_solicitar_descuento_credito").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkVenta,
		"funt": "buscar_solicitar_descuento_credito"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_solicitar_descuento_credito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_solicitar_descuento_credito").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					var datos_buscados = datos[2];
                    document.getElementById("table_solicitar_descuento_credito").innerHTML = datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function verCerrarVentanaSolicitarDescuentoCreditoDetalle(){
	if(document.getElementById('divSolicitarDescuentoCreditoDetalle').style.display ==''){
		document.getElementById('divSolicitarDescuentoCreditoDetalle').style.display = 'none';
		limpiar_campos_solicitud_descuento_credito()
	}else{
		document.getElementById('divSolicitarDescuentoCreditoDetalle').style.display = ''
	}
}
let idCreditoSolicitudDescuentoCredito = '';
function SolicitarDescuentoEsteCredito(datos) {	
	// if(controlacceso("EDITARCREDITO","accion")==false){return;}	
	verCerrarVentanaSolicitarDescuentoCreditoDetalle()
	idCreditoSolicitudDescuentoCredito=datos.id
	
	var detalle_cuota=document.getElementById("inptPlazoCuotaSolicDescuentoCredito_"+idCreditoSolicitudDescuentoCredito).innerHTML;
	var cuota_monto=document.getElementById("inptMontoCuotaSolicDescuentoCredito_"+idCreditoSolicitudDescuentoCredito).value
	var pagado=document.getElementById("inptMontoPagadoSolicDescuentoCredito_"+idCreditoSolicitudDescuentoCredito).value
	
	cuota_monto=QuitarSeparadorMilValor(cuota_monto)
	pagado=QuitarSeparadorMilValor(pagado)
	var monto_limite= (cuota_monto - pagado) 
	
	document.getElementById('inptDetalleCuotaSolicitarDescuentoCreditoDetalle').value= detalle_cuota;
	document.getElementById('inptMontoLimiteSolicitarDescuentoCreditoDetalle').value= separadordemilesnumero(monto_limite);
	document.getElementById('inptMontoPagadoSolicDescuentoCreditoDetalle').value= separadordemilesnumero(pagado);
	document.getElementById('inptcuotaMontoPagadoSolicDescuentoCreditoDetalle').value= separadordemilesnumero(cuota_monto);
}

function verificarcamposSolicitarDescuentoCreditoDetalle(){
	
	let detalle_cuota = document.getElementById('inptDetalleCuotaSolicitarDescuentoCreditoDetalle').value;
	let monto_limite = document.getElementById('inptMontoLimiteSolicitarDescuentoCreditoDetalle').value;
	monto_limite = QuitarSeparadorMilValor(monto_limite);
	let totalSolic = document.getElementById('inptMontoSolicitarDescuentoCreditoDetalle').value;
	let motivo = document.getElementById('inptMotivoSolicitarDescuentoCreditoDetalle').value;
	let tipo = document.getElementById('inptTipoSolicitarDescuentoCreditoDetalle').value;
	let pagado = document.getElementById('inptMontoPagadoSolicDescuentoCreditoDetalle').value;
	let cuota_monto = document.getElementById('inptcuotaMontoPagadoSolicDescuentoCreditoDetalle').value;
	
	if(tipo == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN TIPO');
		return;
	}
	

	totalSolic=QuitarSeparadorMilValor(totalSolic)

	
	if(totalSolic ==''){
		ver_vetana_informativa('FALTÓ INGRESAR UN MONTO');
		return;
	}
	
	if(parseInt(totalSolic) <= 0){
		ver_vetana_informativa('EL MONTO DEBE SER MAYOR A 0');
		return;
	}
	
	if(parseInt(monto_limite) < parseInt(totalSolic)){
		ver_vetana_informativa('EL DESCUENTO SOLICITADO NO PUEDE SER MAYOR AL CAPITAL');
		return;
	}
	
	if(motivo == "" ){
		ver_vetana_informativa("FALTO INGRESAR EL MOTIVO DEL DESCUENTO");
		return;
	}
	
	
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "nuevo")
	datos.append("cod_creditoFK", idCreditoSolicitudDescuentoCredito)
	datos.append("cod_clienteFK", cod_ClienteFKMora)
	datos.append("detalle_cuota", detalle_cuota)
	datos.append("cuota_monto", cuota_monto)
	datos.append("motivo", motivo)
	datos.append("totalSolic", totalSolic)
	datos.append("cod_localFK", cod_localFKUSer)
	datos.append("tipo", tipo)
		var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoCredito.php",
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
					buscar_creditos_solicitar_descuento()
					verCerrarVentanaSolicitarDescuentoCreditoDetalle()
					
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

}
function limpiar_campos_solicitud_descuento_credito(){
	document.getElementById('inptDetalleCuotaSolicitarDescuentoCreditoDetalle').value = ''
	document.getElementById('inptTipoSolicitarDescuentoCreditoDetalle').value = ''
	document.getElementById('inptMontoLimiteSolicitarDescuentoCreditoDetalle').value = ''
	document.getElementById('inptMotivoSolicitarDescuentoCreditoDetalle').value = ''
	document.getElementById('inptMontoSolicitarDescuentoCreditoDetalle').value = ''
}

function crearFilaTablaSolicitudDescuentoCredito(indice) {
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

function agregarCeldaSolicitudDescuentoCredito(fila, id, valor, ancho, oculto) {
	var celda = document.createElement("td");
	if (id) { celda.id = id; }
	if (ancho) { celda.style.width = ancho; }
	if (oculto) { celda.style.display = "none"; }
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderMensajesSolicitudDescuentoCredito(filas) {
	var contenedor = document.getElementById("divMensajeDescuentoCredito");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato) {
		var bloque = document.createElement("div");
		bloque.id = "divMensajeDescuentoInteres_" + dato.id_solicitud;
		var tabla = document.createElement("table");
		tabla.style.width = "100%";
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.addEventListener("click", function () { obtenerdatosMensajeDetalleDescuentoCredito(fila); });

		agregarCeldaSolicitudDescuentoCredito(fila, "", dato.cliente, "65%", false);
		agregarCeldaSolicitudDescuentoCredito(fila, "", dato.usuario, "30%", false);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_6", dato.total_solicitado_formateado, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_7", dato.monto_cuota_formateado, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_8", dato.fecha_solicitud, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_9", dato.usuario, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_10", dato.id_solicitud, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_11", dato.estado, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_12", dato.local, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_13", dato.cod_credito, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_14", dato.motivo, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_19", dato.tipo_solicitud, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_15", dato.cliente, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_17", dato.detalle_cuota, "", true);
		agregarCeldaSolicitudDescuentoCredito(fila, "td_datos_18", dato.monto_cuota_formateado, "", true);
		var celdaAccion = agregarCeldaSolicitudDescuentoCredito(fila, "", "", "5%", false);
		var accion = document.createElement("span");
		accion.className = "status completed";
		accion.textContent = "VER";
		accion.setAttribute("role", "button");
		accion.setAttribute("tabindex", "0");
		accion.addEventListener("click", function () { verCerrarMensajeDescuentoInteresDetalle(dato.id_solicitud); });
		accion.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") { verCerrarMensajeDescuentoInteresDetalle(dato.id_solicitud); }
		});
		celdaAccion.appendChild(accion);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		bloque.appendChild(tabla);
		contenedor.appendChild(bloque);
	});
}

function renderHistorialSolicitudDescuentoCredito(filas) {
	var contenedor = document.getElementById("table_historial_descuento_credito");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato, indice) {
		var estructura = crearFilaTablaSolicitudDescuentoCredito(indice);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_6", dato.total_solicitado_formateado, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "", dato.fecha_solicitud, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_14", dato.motivo, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "", dato.tipo_solicitud, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_9", dato.usuario_solicitud, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "", dato.estado, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "", dato.fecha_aprobacion, "10%", false);
		contenedor.appendChild(estructura.tabla);
	});
}

function renderInformeSolicitudDescuentoCredito(filas) {
	var contenedor = document.getElementById("table_informe_solicitud_descuento_credito");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato, indice) {
		var estructura = crearFilaTablaSolicitudDescuentoCredito(indice);
		if (dato.estilo_estado) { estructura.fila.style.cssText = dato.estilo_estado; }
		estructura.fila.addEventListener("click", function () {
			if (dato.accion === "editar") { obtenerdatosMensajeDetalleDescuentoCredito(estructura.fila); }
			else { mensajeDescuentoCreditoFinalizado(); }
		});
		var credito = agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_13", dato.cod_credito, "10%", false);
		credito.style.backgroundColor = "#efeded";
		credito.style.color = "red";
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_14", dato.motivo, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_15", dato.cliente, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_17", dato.detalle_cuota, "5%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_7", dato.monto_cuota_formateado, "5%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_6", dato.total_solicitado_formateado, "5%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_3", dato.total_aprobado_formateado, "5%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_9", dato.usuario_solicitud, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "", dato.fecha_solicitud, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "", dato.estado, "5%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "", dato.usuario_aprobado, "10%", false);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_10", dato.id_solicitud, "", true);
		agregarCeldaSolicitudDescuentoCredito(estructura.fila, "td_datos_12", dato.local, "", true);
		contenedor.appendChild(estructura.tabla);
	});
}

function buscarDescuentoCredito() {

			
	if(controlaccesoDescuento("VERAPLICARDESCUENTOCREDITO","accion")==false){return;}	
	
	document.getElementById("divBuscadorDescuento").style.display = ''

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarDescuento",
		"formato": "json"
		
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoCredito.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divMensajeDescuentoCredito").innerHTML = ''
			
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divMensajeDescuentoCredito").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   							   
					var datos_buscados = datos[2];
					
			var datos_buscados4 = Array.isArray(datos[4]) ? datos[4] : [];
					

					
			renderMensajesSolicitudDescuentoCredito(datos_buscados4)
			if(Array.isArray(datos_buscados) && datos_buscados.length > 0){
				document.getElementById("divMensajeDescuentoCredito").style.display=""
			}else{
				document.getElementById("divMensajeDescuentoCredito").style.display="none"
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

function verCerrarMensajeDescuentoCreditoDetalle(datos){
	if(document.getElementById("divMensajeDescuentoCredito_"+datos).style.display==""){
		document.getElementById("divMensajeDescuentoCredito_"+datos).style.display="none"
	$("div[id=divMensajeDescuentoCredito_"+datos+"]").fadeOut(500);			
	}else{	
		document.getElementById("divMensajeDescuentoCredito_"+datos).style.display=""
	}
}
var idsolicituddescuentocredito = "";
function obtenerdatosMensajeDetalleDescuentoCredito(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
		
		idsolicituddescuentocredito = $(datostr).children('td[id="td_datos_10"]').html();
		document.getElementById("inptUsuarioDescuentoCreditoConfi").value = $(datostr).children('td[id="td_datos_9"]').html();
		document.getElementById("inptLocalDescuentoCreditoConfi").value = $(datostr).children('td[id="td_datos_12"]').html();
		document.getElementById("inptCodDetalleDescuentoCreditoConfi").value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById("inptMontoCuotaDetalleDescuentoCreditoConfiSoli").value = $(datostr).children('td[id="td_datos_7"]').html();
		document.getElementById("inptTotalSolicDescuentoCreditoConfi").value = $(datostr).children('td[id="td_datos_6"]').html();
		document.getElementById("inptTotalAproDetalleDescuentoCreditoConfiApro").value = document.getElementById("inptTotalSolicDescuentoCreditoConfi").value
		document.getElementById("inptMotivoAproDescuentoCreditoConfi").value = $(datostr).children('td[id="td_datos_14"]').html();
		document.getElementById("inptClienteDescuentoCreditoConfi").value = $(datostr).children('td[id="td_datos_15"]').html();
		document.getElementById("inptTipoAproDescuentoCreditoConfi").value = $(datostr).children('td[id="td_datos_19"]').html();
		
		

		document.getElementById("divDescuentoCreditoAprobacion").style.display=""
		document.getElementById('inptFechaAproDescuentoCreditoConfi').value = obtenerFechaActual();
}
function mensajeDescuentoCreditoFinalizado(){
	ver_vetana_informativa('ESTE DESCUENTO YA NO ES POSIBLE EDITAR');
	return;
}
function verCerrarDescuentoCreditoAprobacion(){
	
	if(document.getElementById("divDescuentoCreditoAprobacion").style.display==""){
		document.getElementById("divDescuentoCreditoAprobacion").style.display="none"		
	}else{	
		document.getElementById("divDescuentoCreditoAprobacion").style.display=""
		
	}
}
function verificarcamposSolicitudDescuentoCreditoConfi(){
	var inptCodDetalleDescuentoCreditoConfi=document.getElementById('inptCodDetalleDescuentoCreditoConfi').value
	var inptTotalAproDetalleDescuentoCreditoConfiApro=document.getElementById('inptTotalAproDetalleDescuentoCreditoConfiApro').value
	var inptEstadoDescuentoCreditoConfi=document.getElementById('inptEstadoDescuentoCreditoConfi').value
	var inptFechaAproDescuentoCreditoConfi=document.getElementById('inptFechaAproDescuentoCreditoConfi').value
	var inptTotalSolicDescuentoCreditoConfi=document.getElementById('inptTotalSolicDescuentoCreditoConfi').value
	inptTotalSolicDescuentoCreditoConfi = parseInt(QuitarSeparadorMilValor(inptTotalSolicDescuentoCreditoConfi));
	inptTotalAproDetalleDescuentoCreditoConfiApro = parseInt(QuitarSeparadorMilValor(inptTotalAproDetalleDescuentoCreditoConfiApro));
	
	if(inptTotalAproDetalleDescuentoCreditoConfiApro > inptTotalSolicDescuentoCreditoConfi){
		ver_vetana_informativa("EL MONTO NO PUEDE SER MAYOR AL SOLICITADO")
	  return false;
	}
	

  if(inptTotalAproDetalleDescuentoCreditoConfiApro==""){
	ver_vetana_informativa("FALTO INGRESAR UN MONTO DE TOTAL INGRESADO")
	  return false;
  }

  if(inptEstadoDescuentoCreditoConfi==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN ESTADO DE AL SOLICITUD")
	  return false;
  }
 
  
 
 
  AbmSolicitudDescuentoCreditoDetalle(inptCodDetalleDescuentoCreditoConfi,inptTotalAproDetalleDescuentoCreditoConfiApro,inptEstadoDescuentoCreditoConfi,inptFechaAproDescuentoCreditoConfi,"Editar");
}
function AbmSolicitudDescuentoCreditoDetalle(cod_creditoFK,totalApro,estado,fecha_apro,accion){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			  datos.append("CodUsu" , userid)
			 datos.append("totalApro" , totalApro)
			 datos.append("idABM" , idsolicituddescuentocredito)
			 datos.append("fecha_apro" , fecha_apro)
			 datos.append("estado" , estado)
			 datos.append("cod_creditoFK" , cod_creditoFK)
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoCredito.php",
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
				
				ver_vetana_informativa("DATOS GUARDADOS CORRECTAMENTE")
				verCerrarDescuentoCreditoAprobacion()
				buscarDescuentoCredito()
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

/* HISTORIAL DE DESCUENTO DE CREDITO */
let idcreditobuscarhistorialdescuentocredito ='';
function verCerrarVentanaHistorialDescuentoCredito(datos){
	if(document.getElementById('divHistorialDescuentoCredito').style.display ==''){
		document.getElementById('divHistorialDescuentoCredito').style.display = 'none';
		idcreditobuscarhistorialdescuentocredito = '';
	}else{
		document.getElementById('divHistorialDescuentoCredito').style.display = ''
		idcreditobuscarhistorialdescuentocredito = datos.id;
		buscarHistorialSolicitudDescuentoCredito()
	}
}
function buscarHistorialSolicitudDescuentoCredito() {	
	
	
	document.getElementById("table_historial_descuento_credito").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_credito": idcreditobuscarhistorialdescuentocredito,
		"funt": "buscarHistorial",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoCredito.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_descuento_credito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_descuento_credito").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderHistorialSolicitudDescuentoCredito(Array.isArray(datos_buscados) ? datos_buscados : [])
					
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


//INFORME SOLICITUD DE DESCUENTO CREDITO
function verCerrarInformeSolicitudDescuentoCredito(){

	if(document.getElementById("divInformeSolicitudDescuentoCredito").style.display==""){
		document.getElementById("divInformeSolicitudDescuentoCredito").style.display="none"
		limpiarInformeSolicitudDescuentoCredito()
	}else{	
	if(controlacceso("VERINFORMEDESCUENTOCREDITO","accion")==false){return;}
mostrarSoloUno("divInformeSolicitudDescuentoCredito")		 
	document.getElementById("divInformeSolicitudDescuentoCredito").style.display=""
	}
}
function limpiarInformeSolicitudDescuentoCredito(){
	document.getElementById("inptBuscarSolicitudDescuentoCreditoF1").value=""
	document.getElementById("inptBuscaSolicitudDescuentoCreditoF2").value=""
	document.getElementById("inptBuscarInfSolicitudDescuentoCredito1").value=""
	document.getElementById("inptBuscarInfSolicitudDescuentoCredito4").value=""
	document.getElementById("inptBuscarInfSolicitudDescuentoCredito2").value=""
	document.getElementById("inptBuscarInfSolicitudDescuentoCredito3").value=""
	document.getElementById("inptTotalRegistoSolicitudDescuentoCredito").value=""
	document.getElementById("table_informe_solicitud_descuento_credito").innerHTML=""
	
}
function minimizarInformeSolicitudDescuentoCredito(){
	$("div[id=divInformeSolicitudDescuentoCredito]").fadeOut(500);
	document.getElementById("divMinimizadoInformeSolicitudDescuentoCredito").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuSolicitudDescuentoCredito"));
}
function buscarInformeSolicitudDescuentoCredito() {	
	/* if(controlacceso("VERCATALOGO","accion")==false){return;}	 */
	var cod_credito = document.getElementById('inptBuscarInfSolicitudDescuentoCredito1').value
	var motivo = document.getElementById('inptBuscarInfSolicitudDescuentoCredito2').value
	var usuario = document.getElementById('inptBuscarInfSolicitudDescuentoCredito3').value
	var fecha1 = document.getElementById('inptBuscarSolicitudDescuentoCreditoF1').value
	var fecha2 = document.getElementById('inptBuscaSolicitudDescuentoCreditoF2').value
	var estado = document.getElementById('inptBuscarInfSolicitudDescuentoCredito4').value
	var cliente = document.getElementById('inptBuscarInfSolicitudDescuentoCredito5').value
	
	if(document.getElementById('checkHistorialSolicitudDescuentoCredito2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}
	
	document.getElementById("table_informe_solicitud_descuento_credito").innerHTML = paginacargando

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
		"cliente": cliente,
		"funt": "buscarInforme",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoCredito.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_solicitud_descuento_credito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_informe_solicitud_descuento_credito").innerHTML = ''
			document.getElementById("inptTotalDescuentosSolicitudDescuentoCredito").value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderInformeSolicitudDescuentoCredito(Array.isArray(datos_buscados) ? datos_buscados : [])
					document.getElementById("inptTotalRegistoSolicitudDescuentoCredito").value = datos[3]
					document.getElementById("inptTotalDescuentosSolicitudDescuentoCredito").value = datos[4]
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
function checkHistorialSolicitudDescuentoCredito(d){	
	if(d=="1"){
		document.getElementById('checkHistorialSolicitudDescuentoCredito1').checked=true
		document.getElementById('checkHistorialSolicitudDescuentoCredito2').checked=false
		document.getElementById('inptBuscarSolicitudDescuentoCreditoF1').value = "";
	    document.getElementById('inptBuscaSolicitudDescuentoCreditoF2').value = "";	
	}else{		
		document.getElementById('checkHistorialSolicitudDescuentoCredito1').checked=false
		document.getElementById('checkHistorialSolicitudDescuentoCredito2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarSolicitudDescuentoCreditoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaSolicitudDescuentoCreditoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}





