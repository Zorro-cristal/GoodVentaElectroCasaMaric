/* ABM CONCEPTO EN CHEQUE */
function verCerrarAbmNuevoConceptoCheque(){
	// if(controlacceso("CREARNUEVOMOTIVO","accion")==false){return;}
	if(document.getElementById("divAbmNuevoConcepto").style.display==""){
		
		$("div[id=divAbmNuevoConcepto]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divAbmNuevoConcepto").style.display=""

	}
}


function VerificarDatosNuevoConcepto() {
	var inptNuevoConcepto = document.getElementById('inptNuevoConcepto').value
	
	if (inptNuevoConcepto == "") {
		ver_vetana_informativa("FALTO AGREGAR NUEVO MOTIVO")
		return false;
	}	

		accion = "NuevoConcepto";
	
	abmNuevoConcepto(inptNuevoConcepto, accion);
}
function abmNuevoConcepto(concepto , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("concepto", concepto)


	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
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
					document.getElementById('inptNuevoConcepto').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarConcepto()
					verCerrarAbmNuevoConceptoCheque()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function renderizarOpcionesConceptoCheque(idContenedor, registros) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) {
		return;
	}

	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}

	var opcionInicial = document.createElement("option");
	opcionInicial.value = "";
	opcionInicial.textContent = "SELECCIONAR";
	contenedor.appendChild(opcionInicial);

	if (!Array.isArray(registros)) {
		return;
	}

	registros.forEach(function (registro) {
		var opcion = document.createElement("option");
		opcion.value = registro.descripcion || "";
		opcion.textContent = registro.descripcion || "";
		opcion.setAttribute("data-codigo", registro.codigo || "");
		contenedor.appendChild(opcion);
	});
}

function buscarConcepto() {

	document.getElementById("ListConcepto").innerHTML = ""
	document.getElementById("ListChequeCargarPagoConcepto").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscaroptionConcepto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("ListConcepto").innerHTML = ''
			document.getElementById("ListChequeCargarPagoConcepto").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("ListConcepto").innerHTML = ''
			document.getElementById("ListChequeCargarPagoConcepto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderizarOpcionesConceptoCheque("ListConcepto", datos_buscados)
					renderizarOpcionesConceptoCheque("ListChequeCargarPagoConcepto", datos_buscados)
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}




function buscaroptionBanco() {

	document.getElementById("inptBuscarAbmCheque7").innerHTML = ""
	document.getElementById("inptBuscarAbmChequeACobrar7").innerHTML = ""
	document.getElementById("inptNombreBancoCheque").innerHTML = ""
	document.getElementById("inptNombreBancoChequeCargarPago").innerHTML = ""
	document.getElementById("inptBancoGasto").innerHTML = ""
	document.getElementById("inptNombreBancoChequeACobrar").innerHTML = ""
	// document.getElementById("inptBancoEgresoIngresoJuan").innerHTML = ""
	// document.getElementById("inptBancoEgresoIngresoAdministrativo").innerHTML = ""
	// document.getElementById("inptBuscarIngresoEgreso4").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMBanco.php",
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
					document.getElementById("inptBuscarAbmCheque7").innerHTML = datos_buscados
					document.getElementById("inptBuscarAbmChequeACobrar7").innerHTML = datos_buscados
					document.getElementById("inptNombreBancoCheque").innerHTML = datos_buscados
					document.getElementById("inptNombreBancoChequeCargarPago").innerHTML = datos_buscados
					document.getElementById("inptBancoGasto").innerHTML = datos_buscados
					document.getElementById("inptNombreBancoChequeACobrar").innerHTML = datos_buscados
					// document.getElementById("inptBancoEgresoIngresoJuan").innerHTML = datos_buscados
					// document.getElementById("inptBancoEgresoIngresoAdministrativo").innerHTML = datos_buscados
					// document.getElementById("inptBuscarIngresoEgreso4").innerHTML = datos_buscados

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function buscarImprimirTicketVentaContado() {

	document.getElementById("inptBuscarAbmCheque7").innerHTML = ""
	document.getElementById("inptNombreBancoCheque").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_venta": idabmVenta,
		"funt": "buscarImprimirTicketVentaContado"
	};
	return $.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptBuscarAbmCheque7").innerHTML = ''
			document.getElementById("inptNombreBancoCheque").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptBuscarAbmCheque7").innerHTML = datos_buscados
					document.getElementById("inptNombreBancoCheque").innerHTML = datos_buscados


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



function calcular_total_Pago() {
	var GA = QuitarSeparadorMilValor(document.getElementById('inptMontoCargoAdministrativo').value);
	TotalPagarEsteCredito = QuitarSeparadorMilValor(TotalPagarEsteCredito);
	if (isNaN(GA) || GA=="" ) {
		GA = 0;
	}
	GA = parseFloat(GA);
	
	// console.log(GA)
	// console.log(TotalPagarEsteCredito)
	
	TotalPagarEsteCredito = parseFloat(TotalPagarEsteCredito);
	document.getElementById('inptMontoClienteAPagar').value = (Number(GA) + Number(TotalPagarEsteCredito));
	document.getElementById('inptTotalaPagarCredito').value = (Number(GA) + Number(TotalPagarEsteCredito));
	
	separadordemiles(document.getElementById('inptMontoClienteAPagar'))
	separadordemiles(document.getElementById('inptMontoCargoAdministrativo'))
}


/*
INFORME CLASIFICACIÓN MOROSOS
*/
var cod_busqueda_morosidad = "";
var array_cod_cliente = "";
var array_cod_venta = "";
function verCerrarCuentasClienteMoroso(d){
	document.getElementById("divSegundoPlano").style.display="none";
if(document.getElementById("divCuentasClienteMoroso").style.display==""){
		document.getElementById("divMinimizadoCuentasClienteMoroso").style.display="none"
 
	$("div[id=divCuentasClienteMoroso]").fadeOut(500);	
		limpiarCamposCuentasClienteMoroso()
	}else{	
	if(controlacceso("VERINFORMECUENTASCLIENTEMOROSO","accion")==false){return;}	
mostrarSoloUno("divCuentasClienteMoroso")		
		document.getElementById("divCuentasClienteMoroso").style.display=""
  
	document.getElementById('inptBuscarFechaCuentasClienteMoroso').value = obtenerFechaActual();
	
	}	
}
function minimizarCuentasClienteMoroso(){
	document.getElementById("divMinimizadoCuentasClienteMoroso").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuCuentasClienteMoroso"));
	$("div[id=divCuentasClienteMoroso]").fadeOut(500);	
}
function limpiarCamposCuentasClienteMoroso(){
	document.getElementById("table_cuentas_cliente_moroso").innerHTML = "";
	document.getElementById("inptBuscarFechaCuentasClienteMoroso").value = obtenerFechaActual();
	array_cod_cliente = "";
	array_cod_venta = "";
}
function agregarCeldaClienteMoroso(fila, valor, ancho, oculto){
	var celda = document.createElement("td");
	if(ancho){ celda.style.width = ancho; }
	if(oculto){ celda.style.display = "none"; }
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderReferenciasClienteMoroso(celda, referencias){
	(referencias || []).forEach(function(referencia){
		var tabla = document.createElement("table");
		tabla.style.fontFamily = "arial";
		tabla.style.fontSize = "11px";
		var fila = document.createElement("tr");
		var detalle = document.createElement("td");
		detalle.style.width = "10%";
		detalle.textContent = referencia == null ? "" : String(referencia);
		fila.appendChild(detalle);
		tabla.appendChild(fila);
		celda.appendChild(tabla);
	});
}

function renderCuentasClienteMoroso(registros, destino){
	var fragmento = document.createDocumentFragment();
	(registros || []).forEach(function(registro){
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila || "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		agregarCeldaClienteMoroso(fila, registro.documento, "10%", false);
		agregarCeldaClienteMoroso(fila, registro.cliente, "20%", false);
		agregarCeldaClienteMoroso(fila, registro.direccion, "20%", false);
		var celdaReferencias = agregarCeldaClienteMoroso(fila, "", "10%", false);
		renderReferenciasClienteMoroso(celdaReferencias, registro.referencias);
		agregarCeldaClienteMoroso(fila, registro.zona, "10%", false);
		agregarCeldaClienteMoroso(fila, registro.telefono, "10%", false);
		agregarCeldaClienteMoroso(fila, registro.atraso, "10%", false);
		agregarCeldaClienteMoroso(fila, registro.fecha_pago, "10%", false);
		agregarCeldaClienteMoroso(fila, registro.id_venta, "", true);
		tabla.appendChild(fila);
		fragmento.appendChild(tabla);
	});
	destino.textContent = "";
	destino.appendChild(fragmento);
}

function buscarcuentasclientemoroso() {
		if(controlacceso("VERINFORMECUENTASCLIENTEMOROSO","accion")==false){return;}
	var fecha = document.getElementById("inptBuscarFechaCuentasClienteMoroso").value
	var tipo = document.getElementById("inptTipoCuentasClienteMoroso")
	cod_busqueda_morosidad = document.getElementById("inptTipoCuentasClienteMoroso").value


// Obtén el índice de la opción seleccionada
var selectedIndex = tipo.selectedIndex;

// Obtén la opción seleccionada usando el índice
var selectedOption = tipo.options[selectedIndex];

// Obtén el valor del atributo "name" de la opción seleccionada
var name = selectedOption.getAttribute("name");
	
	
	
	var cliente = "";

		if (fecha == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
	
		
	document.getElementById("table_cuentas_cliente_moroso").innerHTML = paginacargando
	document.getElementById("inptRegistroNroTotalCuentasClienteMoroso").value = "..."
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"tipo": name,
		"cliente": cliente,
		"formato": "json",
		"funt": "cuentasclientemoroso"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_cuentas_cliente_moroso").innerHTML = ''
	document.getElementById("inptRegistroNroTotalCuentasClienteMoroso").value = ""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_cuentas_cliente_moroso").innerHTML = ''
	document.getElementById("inptRegistroNroTotalCuentasClienteMoroso").value = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("inptRegistroNroTotalCuentasClienteMoroso").value = datos[3]
					array_cod_cliente = datos[4];
					array_cod_venta = datos[5];
					renderCuentasClienteMoroso(datos_buscados, document.getElementById("table_cuentas_cliente_moroso"))
					}
			} catch (error) {
				controldebusquedadCuentasClienteMoroso=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function GenerarListadoMorosidad() {
	if(array_cod_cliente.length === 0){
		ver_vetana_informativa("PRIMERO DEBE REALIZAR UNA BUSQUEDA CON UN TIPO ESPECIFICO")
		return;
	}

	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "GenerarMorosidad")
	datos.append("array_cod_cliente", JSON.stringify(array_cod_cliente))
	datos.append("array_cod_venta", JSON.stringify(array_cod_venta))
	datos.append("cod_tipomoroso", cod_busqueda_morosidad)

	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
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



