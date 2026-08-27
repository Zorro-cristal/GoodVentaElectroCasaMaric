/*
ABM CALLCENTER VENTA
*/
var listadoAbmCallCenterVenta = null;

function valorSeguroCallCenterVenta(valor) {
	return valor === null || typeof valor === "undefined" ? "" : String(valor);
}

function limpiarContenedorCallCenterVenta(idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return null;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	return contenedor;
}

function crearTablaFilaCallCenterVenta(clase, alSeleccionar) {
	var tabla = document.createElement("table");
	tabla.className = clase === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	var cuerpo = document.createElement("tbody");
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	if (typeof alSeleccionar === "function") {
		fila.onclick = function () { alSeleccionar(this); };
	}
	cuerpo.appendChild(fila);
	tabla.appendChild(cuerpo);
	return { tabla: tabla, fila: fila };
}

function agregarCeldaCallCenterVenta(fila, id, valor, ancho, oculta) {
	var celda = document.createElement("td");
	if (id) celda.id = id;
	if (ancho) celda.style.width = ancho;
	if (oculta) celda.style.display = "none";
	celda.textContent = valorSeguroCallCenterVenta(valor);
	fila.appendChild(celda);
	return celda;
}

function renderCuentasCobrarCallCenterVenta(filas) {
	var contenedor = limpiarContenedorCallCenterVenta("table_vista_cuenta_cliente_call_center_venta");
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearTablaFilaCallCenterVenta(registro.clase_fila, obtenerdatoscuentaacobrarcallcenterventa);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_id_1", registro.id_cliente, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_1", registro.id_venta, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_2", registro.numero_factura, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.plazo, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_26", registro.cliente, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.documento, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.telefono, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.factura, "", true);
		var celdaProductos = agregarCeldaCallCenterVenta(tablaFila.fila, "", "", "20%", false);
		var productos = Array.isArray(registro.productos) ? registro.productos : [];
		productos.forEach(function (producto) {
			var tablaProducto = crearTablaFilaCallCenterVenta("tableRegistroSearch", obtenerdatoscreditodetalle);
			agregarCeldaCallCenterVenta(tablaProducto.fila, "td_id_1", registro.id_venta, "", true);
			agregarCeldaCallCenterVenta(tablaProducto.fila, "td_id_2", "", "", true);
			agregarCeldaCallCenterVenta(tablaProducto.fila, "", producto, "100%", false);
			celdaProductos.appendChild(tablaProducto.tabla);
		});
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_5", registro.cobrador, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_12", registro.total_venta, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.fecha_vencimiento, "5%", false);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_3", registro.fecha_pago, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_19", registro.cuotas, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_6", registro.monto_cuota, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_18", registro.descuento, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.interes_pagado, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.pagado_sin_interes, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_13", registro.total_pagado, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_17", registro.total_interes, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_20", registro.cuotas_atrasadas, "5%", false);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_10", registro.dias_atrasados, "5%", false);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_22", registro.deuda_pendiente, "5%", false);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_11", registro.total_deuda, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_14", registro.total_a_pagar, "5%", false);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_7", registro.pago_acumulado, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_8", registro.total_venta_oculto, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_9", registro.id_cobrador, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.local, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_15", registro.tipo_comprobante, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_16", registro.punto_expedicion, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_21", registro.total_sin_interes, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_23", registro.vendedor, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_24", registro.latitud, "", true);
		agregarCeldaCallCenterVenta(tablaFila.fila, "td_datos_25", registro.longitud, "", true);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderAgendaClienteCallCenterVenta(filas, agendaGeneral) {
	var idContenedor = agendaGeneral ? "table_abm_CallCenterVenta_agenda" : "buscar_agenda_cliente_call_center_ventas";
	var contenedor = limpiarContenedorCallCenterVenta(idContenedor);
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearTablaFilaCallCenterVenta(
			registro.clase_fila,
			agendaGeneral ? obtenerdatosabmagendacallcenterventa : null
		);
		if (agendaGeneral) {
			agregarCeldaCallCenterVenta(tablaFila.fila, "td_id", registro.id_agenda, "", true);
			agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.cliente, "30%", false);
			agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.observacion, "10%", false);
			agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.fecha, "10%", false);
			agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.telefono, "10%", false);
			agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.estado, "10%", false);
		} else {
			agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.observacion, "50%", false);
			agregarCeldaCallCenterVenta(tablaFila.fila, "", registro.fecha, "50%", false);
		}
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function iniciarListadoAbmCallCenterVenta() {
	if (listadoAbmCallCenterVenta || !window.AbmListadoCore) return listadoAbmCallCenterVenta;
	var cuerpo = document.getElementById("table_abm_CallCenterVenta");
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && (cabecera.tagName !== "TABLE" || cabecera.querySelector("input,select,textarea"))) {
		cabecera = cabecera.previousElementSibling;
	}
	if (!cabecera) return null;
	cabecera.id = "cabeceraAbmCallCenterVenta";
	listadoAbmCallCenterVenta = window.AbmListadoCore.crear({
		nombre: "callcenter_venta",
		idCabecera: "cabeceraAbmCallCenterVenta",
		idCuerpo: "table_abm_CallCenterVenta",
		ordenInicial: "cliente",
		columnas: [
			{ campo: "cliente", titulo: "CLIENTE", ancho: "30%" },
			{ campo: "total_venta", titulo: "TOTAL VENTA", ancho: "10%" },
			{ campo: "fecha_venta", titulo: "FECHA VENTA", ancho: "10%" },
			{ campo: "origen", titulo: "ORIGEN", ancho: "20%" },
			{ campo: "telefono", titulo: "TELEFONO", ancho: "10%" },
			{ campo: "fecha_ingreso", titulo: "FECHA ENTRADA", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmcallcenterventa",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ campo: "cliente", columna: "cliente" },
				{ campo: "total_venta", columna: "total_venta" },
				{ campo: "fecha_venta", columna: "fecha_venta" },
				{ campo: "origen", columna: "origen" },
				{ campo: "telefono", columna: "telefono" },
				{ campo: "fecha_ingreso", columna: "fecha_ingreso" },
				{ campo: "estado", columna: "estado" },
				{ id: "td_datos_1", campo: "codigo_cliente", tecnica: true }
			]
		}
	});
	listadoAbmCallCenterVenta.iniciar();
	return listadoAbmCallCenterVenta;
}

function verCerrarAbmCallCenterVenta(){
		document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCallCenterVenta").style.display==""){
		document.getElementById("divMinimizadoListadoCallCenterVentas").style.display="none"
		limpiarcamposCallCenterVenta()
limpiarcamposbuscarCallCenterVenta()
		//  
		$("div[id=divAbmCallCenterVenta]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERCALLCENTERVENTAS","accion")==false){return;}
		mostrarSoloUno("divAbmCallCenterVenta")	
		document.getElementById("divAbmCallCenterVenta").style.display=""
		//  
	}
}
function verCerrarVentanaAbmCallCenterVenta(d, l) {
	if (d == "1") {		
		if (l == "1") {
			limpiarcamposCallCenterVenta()
		}
		$("div[id=divAbmCallCenterVenta2]").fadeIn(250)
		document.getElementById('divAbmCallCenterVenta1').style.display = "none"
	} else {
		$("div[id=divAbmCallCenterVenta1]").fadeIn(250)
		document.getElementById('divAbmCallCenterVenta2').style.display = "none"
	}
}
function limpiarcamposbuscarCallCenterVenta(){
	document.getElementById('inptBuscarAbmCallCenterVenta1').value="";
	document.getElementById('inptBuscarAbmCallCenterVenta2').value="";
	document.getElementById('inptBuscarAbmCallCenterVentaAgenda1').value="";
	document.getElementById('inptBuscarAbmCallCenterVentaAgenda2').value="";
	document.getElementById('inptBuscarAbmCallCenterVentaAgenda3').value="";
	document.getElementById("table_abm_CallCenterVenta").innerHTML = "";
	document.getElementById("table_abm_CallCenterVenta_agenda").innerHTML = "";
	document.getElementById("inptTotalRegistoCallCenterVenta").value = "";
	verCerrarVentanasCallCenterVentas(1)
	checkHistorialFechaCallCenterVenta(1)
	controlbusquedaventanascallcenterventas = 1;
}
function minimizarAbmCallCenterVenta(){	 
	$("div[id=divAbmCallCenterVenta]").fadeOut(500);	
	document.getElementById("divMinimizadoListadoCallCenterVentas").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuListadoCallCenterVentas"));
}
function verificarcamposAbmCallCenterVenta() {
	var inptNombreClienteCallCenterVenta = document.getElementById('inptNombreClienteCallCenterVenta').value
	var inptTelefonoCallCenterVenta = document.getElementById('inptTelefonoCallCenterVenta').value
	var inptOrigenClienteCallCenterVenta = $('#inptOrigenClienteCallCenterVenta').find('option:selected').text();
	
	if (inptNombreClienteCallCenterVenta == "") {
		ver_vetana_informativa("FALTO INGESAR EL NOMBRE DEL CLIENTE")
		return false;
	}
	
	if (inptOrigenClienteCallCenterVenta == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ORIGEN DEL CLIENTE")
		return false;
	}
	
	
	var accion = "nuevo";
		
	AbmCallCenterVenta(inptNombreClienteCallCenterVenta,inptTelefonoCallCenterVenta,inptOrigenClienteCallCenterVenta,accion);
}
function AbmCallCenterVenta(nombre_cliente,telefono,origen,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("nombre_cliente", nombre_cliente)
	datos.append("telefono", telefono)
	datos.append("origen", origen)
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
					limpiarcamposCallCenterVenta()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarAbmCallCenterVenta()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function buscarAbmCallCenterVenta() {
	var listado = iniciarListadoAbmCallCenterVenta()
	
		if(controlbusquedaventanascallcenterventas==2){
			buscar_agenda_cliente_callcenter_ventas_agenda()
			return;
		}
	
	var fecha1 = document.getElementById('inptBuscarCallCenterVentaF1').value
	var fecha2 = document.getElementById('inptBuscarCallCenterVentaF2').value
	var cliente= document.getElementById("inptBuscarAbmCallCenterVenta1").value
	var origen= document.getElementById("inptBuscarAbmCallCenterVenta2").value
	var estado= document.getElementById("inptBuscarAbmCallCenterVenta3").value
	
	if(document.getElementById('checkHistorialFechaCallCenterVenta2').checked==true){
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
	
	
	document.getElementById("table_abm_CallCenterVenta").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cliente": cliente,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"origen": origen,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CallCenterVenta").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CallCenterVenta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoCallCenterVenta").value = datos[3];
					iddetalle_callcenterventas = ''
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmCallCenterVenta);
else iniciarListadoAbmCallCenterVenta();
function limpiarcamposCallCenterVenta() {
	document.getElementById('inptNombreClienteCallCenterVenta').value = "";
	document.getElementById('inptTelefonoCallCenterVenta').value = "";	
	document.getElementById('inptOrigenClienteCallCenterVenta').value = "";
}
function checkHistorialFechaCallCenterVenta(d){	
	if(d=="1"){
		document.getElementById('checkHistorialFechaCallCenterVenta1').checked=true
		document.getElementById('checkHistorialFechaCallCenterVenta2').checked=false
		document.getElementById('inptBuscarCallCenterVentaF1').value = "";
	    document.getElementById('inptBuscarCallCenterVentaF2').value = "";	
	}else{		
		document.getElementById('checkHistorialFechaCallCenterVenta1').checked=false
		document.getElementById('checkHistorialFechaCallCenterVenta2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarCallCenterVentaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarCallCenterVentaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

var iddetalle_callcenterventas = '';
function obtenerdatosabmcallcenterventa(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	iddetalle_callcenterventas = $(datostr).children('td[id="td_id"]').html();
	cod_clientecallcenterventa = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptSelecActualizarEstadoClienteVentas').value = '';
}
function actualizarEstadoClienteCallCenterVenta(datos) {
	if(iddetalle_callcenterventas == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
		return;
	}
	
	var estado = $(datos).find('option:selected').text();
	
	if(estado =='SELECCIONAR'){
		document.getElementById('inptSelecActualizarEstadoClienteVentas').value = '';
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"iddetalle_callcenterventas": iddetalle_callcenterventas,
		"estado": estado,
		"funt": "actualizarEstadoClienteCallCenterVenta"
	};
	
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					buscarAbmCallCenterVenta()
					document.getElementById('inptSelecActualizarEstadoClienteVentas').value = '';
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function terminarEstadoClienteCallCenterVenta() {
	
	if(iddetalle_callcenterventas == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"iddetalle_callcenterventas": iddetalle_callcenterventas,
		"estado": 'TERMINADO',
		"funt": "actualizarEstadoClienteCallCenterVenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					buscarAbmCallCenterVenta()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
let controlbusquedaventanascallcenterventas = 1;
function verCerrarVentanasCallCenterVentas(d){
	document.getElementById("btnAgendarCallCenterVentas").style=''
	document.getElementById("btnAgendadosCallCenterVentas").style=''
	
	document.getElementById("subventana_callcenterventa1").style.display='none'
	document.getElementById("subventana_callcenterventa2").style.display='none'
	
	if(d=="1"){
		document.getElementById("btnAgendarCallCenterVentas").style='background-color:#FF9800;color:#fff'
		document.getElementById("subventana_callcenterventa1").style.display=''	}
		controlbusquedaventanascallcenterventas = 1;
	if(d=="2"){
		document.getElementById("btnAgendadosCallCenterVentas").style='background-color:#FF9800;color:#fff'
			document.getElementById("subventana_callcenterventa2").style.display=''
			controlbusquedaventanascallcenterventas = 2;
	}	
}

var idagendacallcenterventas = '';
function obtenerdatosabmagendacallcenterventa(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idagendacallcenterventas = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptActualizarAbmCallCenterVentaAgendado').value = '';
}

function actualizarEstadoClienteAgendadoCallCenterVenta(datos) {
	if(idagendacallcenterventas == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
		return;
	}
	
	var estado = $(datos).find('option:selected').text();
	
	if(estado =='SELECCIONAR'){
		document.getElementById('inptActualizarAbmCallCenterVentaAgendado').value = '';
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idagendacallcenterventas": idagendacallcenterventas,
		"estado": estado,
		"funt": "actualizarEstadoClienteAgendadoCallCenterVenta"
	};
	
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					buscarAbmCallCenterVenta()
					document.getElementById('inptActualizarAbmCallCenterVentaAgendado').value = '';
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/* BUSCAR CUENTA CLIENTE EN CALLCENTER VENTAS*/
var cod_clientecallcenterventa  ='';
function vercerrarvistacuentasclientecallcenterventa(d){
	if(d == '1'){
		if(cod_clientecallcenterventa == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
		return;
	}
		document.getElementById('divVistaCuentasClienteCallCenterVenta').style.display = ''
		buscarcuentaacobrarcallcenterventa()
	}else{
		document.getElementById('divVistaCuentasClienteCallCenterVenta').style.display = 'none'
	}
}
function buscarcuentaacobrarcallcenterventa() {	
if(cod_clientecallcenterventa == ''){
	ver_vetana_informativa('FALTÓ SELECCIONAR UN CLIENTE');
	return;
}
    document.getElementById("inptRegistroRegistrocargadoCuentaAcobrarCallCenterVenta").value = ""
	document.getElementById("inptRegistroHistorialTotalACobraCuentaCallCenterVenta").value =  ""
	document.getElementById("inptRegistroNroHistorialTotalADeudadCuentaCallCenterVenta").value =  ""
	document.getElementById("table_vista_cuenta_cliente_call_center_venta").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_clienteFK": cod_clientecallcenterventa,
		"funt": "cuentasacobrarcallcenterventa",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_cuenta_cliente_call_center_venta").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_cuenta_cliente_call_center_venta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderCuentasCobrarCallCenterVenta(datos_buscados);
					} else {
						document.getElementById("table_vista_cuenta_cliente_call_center_venta").innerHTML = datos_buscados;
					}
					 document.getElementById("inptRegistroRegistrocargadoCuentaAcobrarCallCenterVenta").value =datos[3]
	                document.getElementById("inptRegistroHistorialTotalACobraCuentaCallCenterVenta").value =  datos[4]
	                document.getElementById("inptRegistroNroHistorialTotalADeudadCuentaCallCenterVenta").value =  datos[5]
					}
					
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function obtenerdatoscuentaacobrarcallcenterventa(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	idFkVenta = $(datostr).children('td[id="td_datos_1"]').html();
	buscarcreditos_imprimir()
}


/* AGENDA CLIENTE CALLCENTER */
function VerCerrarVentanaAgendaClienteCallCenterVentas(d){
	
if(d == '1'){
	if(iddetalle_callcenterventas == '' && informe_cod_detallecallcenterventa == ''){
		ver_vetana_informativa('FALTO SELECCIONAR UN CLIENTE PARA AGENDAR');
		return;
	}
		buscar_agenda_cliente_callcenter_ventas()
		document.getElementById("divAgendaClienteCallCenterVentas").style.display=""
	}else{
		document.getElementById("divAgendaClienteCallCenterVentas").style.display="none"
		limpiarventanaabmagendaclientecallcenter();
}
}
function buscar_agenda_cliente_callcenter_ventas() {
	document.getElementById("buscar_agenda_cliente_call_center_ventas").innerHTML = paginacargando
	obtener_datos_user();
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"iddetalle_callcenterventas": iddetalle_callcenterventas==''?informe_cod_detallecallcenterventa:iddetalle_callcenterventas,
		"funt": "buscar_agenda_cliente_callcenter_ventas",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("buscar_agenda_cliente_call_center_ventas").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("buscar_agenda_cliente_call_center_ventas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderAgendaClienteCallCenterVenta(datos_buscados, false);
					} else {
						document.getElementById("buscar_agenda_cliente_call_center_ventas").innerHTML = datos_buscados;
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
function buscar_agenda_cliente_callcenter_ventas_agenda() {
	document.getElementById("table_abm_CallCenterVenta_agenda").innerHTML = paginacargando
	
	let cliente = document.getElementById('inptBuscarAbmCallCenterVentaAgenda1').value;
	let observacion = document.getElementById('inptBuscarAbmCallCenterVentaAgenda2').value;
	let fecha_agenda = document.getElementById('inptBuscarAbmCallCenterVentaAgenda3').value;
	var fecha1 = document.getElementById('inptBuscarCallCenterVentaF1').value
	var fecha2 = document.getElementById('inptBuscarCallCenterVentaF2').value
	
	
	var estado = document.getElementById('inptBuscarAbmCallCenterVentaAgenda4').value
	
	obtener_datos_user();
	if(document.getElementById('checkHistorialFechaCallCenterVenta2').checked==true){
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
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_agente": userid,
		"cliente": cliente,
		"observacion": observacion,
		"fecha_agenda": fecha_agenda,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"funt": "buscar_agenda_cliente_callcenter_ventas_agenda",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CallCenterVenta_agenda").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CallCenterVenta_agenda").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderAgendaClienteCallCenterVenta(datos_buscados, true);
					} else {
						document.getElementById("table_abm_CallCenterVenta_agenda").innerHTML = datos_buscados;
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
function verificarAgendaClienteCallCenterVentas(){
	var inptDescripcionAgendaClienteCallCenterVentas = document.getElementById('inptDescripcionAgendaClienteCallCenterVentas').value;
	var inptFechaAgendaClienteCallCenterVentas = document.getElementById('inptFechaAgendaClienteCallCenterVentas').value;

	if(inptDescripcionAgendaClienteCallCenterVentas ==''){
		ver_vetana_informativa('FALTO INGRESAR LA OBSERVACIÓN');
		return;
	}
	
	if(inptFechaAgendaClienteCallCenterVentas ==''){
		ver_vetana_informativa('FALTO INGRESAR LA OBSERVACIÓN');
		return;
	}
	
	abmAgendaClienteCallCenterVentas(inptDescripcionAgendaClienteCallCenterVentas,inptFechaAgendaClienteCallCenterVentas);
}
function abmAgendaClienteCallCenterVentas(descripcion,fecha){
	
	verCerrarEfectoCargando("1")
		var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("descripcion", descripcion)
	datos.append("fecha", fecha)
	datos.append("funt", 'nuevo_agenda')
	datos.append("iddetalle_callcenterventas", iddetalle_callcenterventas)
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
					buscar_agenda_cliente_callcenter_ventas()
					document.getElementById('inptDescripcionAgendaClienteCallCenterVentas').value = ''
					document.getElementById('inptFechaAgendaClienteCallCenterVentas').value = ''
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});	
}
function limpiarventanaabmagendaclientecallcenter(){
	document.getElementById('inptDescripcionAgendaClienteCallCenterVentas').value = ''
	document.getElementById('buscar_agenda_cliente_call_center_ventas').innerHTML = ''
	iddetalle_callcenterventas = '';
	informe_cod_detallecallcenterventa = '';
}



/* GENERAR LISTA CALLCENTER VENTAS */
function VerCerrarVentanaListaCallCenterVentas(d){
	if(controlacceso("VERGENERARLISTACALLCENTERVENTAS","accion")==false){return;}
if(d == '1'){
	if(document.getElementById('table_Cliente_Fiel').innerHTML == ''){
		ver_vetana_informativa("FALTÓ REALIZAR UNA BUSQUEDA PARA GENERAR LA LISTA")
		return;
	}
	buscar_agentes_CallCenterVentas()
		document.getElementById("divGenerarListaCallCenterVentas").style.display=""
		document.getElementById('inptCantidadClientesCallCenterVentas').value = document.getElementById('inptTotalRegistoCliente_Fiel').value
		
		document.getElementById('btnAbmListaCallCenterVentas').style.display= "";
		document.getElementById('btnAbmListaCallCenterVentasNuevoCliente').style.display= "none";
		
	}else{
		document.getElementById("divGenerarListaCallCenterVentas").style.display="none"
		document.getElementById("buscar_agente_CallCenterVentas").innerHTML = ""
		limpiarventanaGenerarCallCenterVentas()
}
}

function renderAgentesCallCenterVentas(filas) {
	var contenedor = document.getElementById("buscar_agente_CallCenterVentas");
	if (!contenedor || !Array.isArray(filas)) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		var celdaCheck = document.createElement("td");
		celdaCheck.style.width = "10%";
		var check = document.createElement("input");
		check.type = "checkbox";
		check.id = registro.id == null ? "" : String(registro.id);
		check.onclick = function () { obteneridarrayagenteventas(check); };
		celdaCheck.appendChild(check);
		var nombre = document.createElement("td");
		nombre.id = "td_datos_1";
		nombre.style.width = "90%";
		nombre.textContent = registro.nombre == null ? "" : String(registro.nombre);
		fila.appendChild(celdaCheck);
		fila.appendChild(nombre);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function buscar_agentes_CallCenterVentas() {
	document.getElementById("buscar_agente_CallCenterVentas").innerHTML = paginacargando
	obtener_datos_user();
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscar_agentes_CallCenterVentas",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("buscar_agente_CallCenterVentas").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("buscar_agente_CallCenterVentas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderAgentesCallCenterVentas(datos_buscados);
					} else {
						document.getElementById("buscar_agente_CallCenterVentas").innerHTML = datos_buscados;
					}
					array_agentes_ventas = []
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var array_agentes_ventas = []
function obteneridarrayagenteventas(datos){
	var id = datos.id;
	let index = array_agentes_ventas.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_agentes_ventas.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_agentes_ventas.push(id);
    }
}
function verificarGenerarListaCallCenterVentas(){
	var inptNombreCallCenterVentas = document.getElementById('inptNombreCallCenterVentas').value;
	var inptlocalClienteFiel = document.getElementById('inptlocalClienteFiel').value;
	var condicion = document.getElementById('inptCondicionClienteFiel').value;
	var inptZonaClienteFiel = document.getElementById('inptZonaClienteFiel').value;
	var inptBuscarClienteFielF1 = document.getElementById('inptBuscarClienteFielF1').value;
	var inptBuscaClienteFielF2 = document.getElementById('inptBuscaClienteFielF2').value;

	if(inptNombreCallCenterVentas ==''){
		ver_vetana_informativa('FALTO INGRESAR EL NOMBRE DEL LISTADO');
		return;
	}
	
	if(array_agentes_ventas == ''){
		ver_vetana_informativa('FALTO SELECCIONAR EL/LOS AGENTES ENCARGADOS');
		return;
	}
	
	generarListaCallCenterVentas(inptNombreCallCenterVentas,inptlocalClienteFiel,inptZonaClienteFiel,condicion,inptBuscarClienteFielF1,inptBuscaClienteFielF2);
}
function generarListaCallCenterVentas(nombre,cod_local,cod_zona,condicion,fecha_inicio,fecha_fin){
	
	verCerrarEfectoCargando("1")
		var datos = new FormData();
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
	
	var cod_cliente=$(elementohtml).children('td[id="td_datos_5"]').html();
    datos.append("cod_cliente"+control, cod_cliente)
	
	control=control+1;	
	});
	   
	   
	control=control-1;	
	if(control<=0){
	ver_vetana_informativa("FALTO DATOS DE CLIENTE")
	return false ;
	}
	
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("nombre", nombre)
	datos.append("cod_local", cod_local)
	datos.append("cod_zona", cod_zona)
	datos.append("condicion", condicion)
	datos.append("fecha_inicio", fecha_inicio)
	datos.append("fecha_fin", fecha_fin)
	datos.append("totalRegistro", control)
	datos.append("desde", 'SISTEMA')
	datos.append("funt", "generarListaCallCenterVentas")
	datos.append("array_agentes_ventas", JSON.stringify(array_agentes_ventas))
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
					limpiarventanaGenerarCallCenterVentas()
					VerCerrarVentanaListaCallCenterVentas("2")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});	
}
function limpiarventanaGenerarCallCenterVentas(){
	document.getElementById('inptNombreCallCenterVentas').value = ''
	document.getElementById('buscar_agente_CallCenterVentas').innerHTML = ''
	array_agentes_ventas = [];
	document.getElementById('btnAbmListaCallCenterVentasNuevoCliente').style.display = 'none'
	document.getElementById('btnAbmListaCallCenterVentasFinalizadas').style.display = 'none'
	document.getElementById('btnAbmListaCallCenterVentas').style.display = ''
}


/* GENERAR LISTA CALLCENTER VENTAS DESDE NUEVOS CLIENTES*/
function VerCerrarVentanaListaCallCenterVentasNuevosClientes(d){
if(d == '1'){
	if(document.getElementById('table_abm_ClientesACallCenter').innerHTML == ''){
		ver_vetana_informativa("FALTÓ REALIZAR UNA BUSQUEDA PARA GENERAR LA LISTA")
		return;
	}
	
	var control=0;
	$("tr[name=TablaNuevosClientes]").each(function(i, elementohtml){
	
		if($(elementohtml).children('td[id="td_datos_5"]').html()=='NO ASIGNADO'){
			control++;	
		}
	
	});
	
	
	if(control == 0){
		ver_vetana_informativa('FALTÓ BUSCAR LOS CLIENTES NO ASIGNADOS');
		return;
	}
	
	buscar_agentes_CallCenterVentas()
		document.getElementById("divGenerarListaCallCenterVentas").style.display=""
		document.getElementById('inptCantidadClientesCallCenterVentas').value = document.getElementById('inptTotalRegistoClientesACallCenter').value
		
		
		document.getElementById('btnAbmListaCallCenterVentas').style.display= "none";
		document.getElementById('btnAbmListaCallCenterVentasNuevoCliente').style.display= "";
	}else{
		document.getElementById("divGenerarListaCallCenterVentas").style.display="none"
		document.getElementById("buscar_agente_CallCenterVentas").innerHTML = ""
}
}
function verificarGenerarListaCallCenterVentasNuevosClientes(){
	var inptNombreCallCenterVentas = document.getElementById('inptNombreCallCenterVentas').value;
	var inptlocalClienteFiel = '0';
	var condicion = '0';
	var inptZonaClienteFiel = '0';
	var inptBuscarClienteFielF1 ='';
	var inptBuscaClienteFielF2 = '';

	if(inptNombreCallCenterVentas ==''){
		ver_vetana_informativa('FALTO INGRESAR EL NOMBRE DEL LISTADO');
		return;
	}
	
	if(array_agentes_ventas == ''){
		ver_vetana_informativa('FALTO SELECCIONAR EL/LOS AGENTES ENCARGADOS');
		return;
	}
	
	generarListaCallCenterVentasNuevosClientes(inptNombreCallCenterVentas,inptlocalClienteFiel,inptZonaClienteFiel,condicion,inptBuscarClienteFielF1,inptBuscaClienteFielF2);
}
function generarListaCallCenterVentasNuevosClientes(nombre,cod_local,cod_zona,condicion,fecha_inicio,fecha_fin){
	
	verCerrarEfectoCargando("1")
		var datos = new FormData();
	var control=1;
	$("tr[name=TablaNuevosClientes]").each(function(i, elementohtml){	

	
	
	var cliente=$(elementohtml).children('td[id="td_datos_1"]').html();
    datos.append("cliente"+control, cliente)
	
	
	var idcliente=$(elementohtml).children('td[id="td_id"]').html();
    datos.append("cod_cliente"+control, idcliente)
	
	var telefono=$(elementohtml).children('td[id="td_datos_2"]').html();
    datos.append("telefono"+control, telefono)
	
	control=control+1;	
	});
	   
	   
	control=control-1;	
	if(control<=0){
	ver_vetana_informativa("FALTO DATOS DE CLIENTE")
	return false ;
	}
	
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("nombre", nombre)
	datos.append("cod_local", cod_local)
	datos.append("cod_zona", cod_zona)
	datos.append("condicion", condicion)
	datos.append("fecha_inicio", fecha_inicio)
	datos.append("fecha_fin", fecha_fin)
	datos.append("totalRegistro", control)
	datos.append("desde", 'EXCEL')
	datos.append("funt", "generarListaCallCenterVentas")
	datos.append("array_agentes_ventas", JSON.stringify(array_agentes_ventas))
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
					limpiarventanaGenerarCallCenterVentas()
					VerCerrarVentanaListaCallCenterVentasNuevosClientes("2")
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


