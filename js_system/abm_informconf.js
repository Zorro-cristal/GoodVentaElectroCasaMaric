/*
ABM INFORMCONF
*/
function crearNodoMetaCobrador(etiqueta,clase,texto){
	var nodo=document.createElement(etiqueta);
	if(clase){nodo.className=clase;}
	if(texto!==undefined && texto!==null){nodo.textContent=String(texto);}
	return nodo;
}
function renderMetasCobrador(registros){
	var cuerpo=document.getElementById("table_abm_MetaCobrador");
	if(!cuerpo){return;}
	while(cuerpo.firstChild){cuerpo.removeChild(cuerpo.firstChild);}
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro){
		var tarjeta=crearNodoMetaCobrador("div","sales"); tarjeta.id=registro.fecha || "";
		tarjeta.addEventListener("click",function(){obtenerdatosvistaventaMetasCobradores(tarjeta,registro.monto || 0,registro.fecha || "",registro.codigo_cobrador || "",registro.codigo_meta || "");});
		tarjeta.appendChild(crearNodoMetaCobrador("h3",null,registro.cobrador || ""));
		var estado=crearNodoMetaCobrador("div","status");
		var fotoCaja=crearNodoMetaCobrador("div"); fotoCaja.style.width="140px";
		var foto=document.createElement("img"); foto.src=registro.imagen || "/GoodVentaElectroCasaMaric/iconos/sinperfil.png"; foto.alt="Cobrador "+(registro.cobrador || ""); foto.className="imgFotoCi"; foto.style.width="140px"; foto.style.height="140px"; foto.style.objectFit="cover"; fotoCaja.appendChild(foto); estado.appendChild(fotoCaja);
		var info=crearNodoMetaCobrador("div","info"); info.appendChild(crearNodoMetaCobrador("h3",null,(registro.mes || "")+"-"+(registro.anio || ""))); info.appendChild(crearNodoMetaCobrador("h1",null,(registro.total_cobrado_formateado || "0")+" Gs.")); info.appendChild(crearNodoMetaCobrador("h4",null,"Meta:")); info.appendChild(crearNodoMetaCobrador("h4",null,(registro.monto_formateado || "0")+" Gs.")); estado.appendChild(info);
		var progresoCaja=crearNodoMetaCobrador("div","progresss"); var progreso=crearNodoMetaCobrador("div"); progreso.setAttribute("role","progressbar"); progreso.setAttribute("aria-valuenow",registro.resultado_porcentaje || 0); progreso.setAttribute("aria-valuemin","0"); progreso.setAttribute("aria-valuemax","100"); progreso.style.setProperty("--value",registro.resultado_porcentaje || 0); progreso.style.width="100%"; progresoCaja.appendChild(progreso); estado.appendChild(progresoCaja);
		tarjeta.appendChild(estado); fragmento.appendChild(tarjeta);
	});
	cuerpo.appendChild(fragmento);
}
var listadoAbmInformconf = null;
function iniciarListadoAbmInformconf() {
	if (listadoAbmInformconf || !window.AbmListadoCore) { return listadoAbmInformconf; }
	var formulario = document.getElementById("divAbmInformconf1");
	var cuerpo = document.getElementById("table_abm_Informconf");
	var cabecera = formulario ? formulario.querySelector("table.tableCabeceraRegistro tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraAbmInformconf";
	var opciones = formulario.querySelector(".abm-estandar-menu-columnas");
	if (opciones) { opciones.id = "opcionesColumnasInformconf"; }
	listadoAbmInformconf = window.AbmListadoCore.crear({
		nombre: "informconf",
		idCabecera: "cabeceraAbmInformconf",
		idCuerpo: "table_abm_Informconf",
		idOpcionesColumnas: "opcionesColumnasInformconf",
		columnas: [
			{ campo: "cliente", titulo: "CLIENTE", ancho: "30%" },
			{ campo: "documento", titulo: "CI", ancho: "10%" },
			{ campo: "fecha_entrada", titulo: "FECHA ENTRADA", ancho: "10%" },
			{ campo: "fecha_salida", titulo: "FECHA SALIDA", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "10%" },
			{ campo: "usuario_ingreso", titulo: "USUARIO INGRESO", ancho: "10%" },
			{ campo: "usuario_limpio", titulo: "USUARIO LIMPIO", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosAbmInformconf",
			atributosFila: function (registro) {
				return registro.estado === "LIMPIO" ? { style: { backgroundColor: "green", color: "white" } } : {};
			},
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "cliente", columna: "cliente" },
				{ id: "td_datos_1", campo: "documento", columna: "documento" },
				{ id: "td_datos_2", campo: "fecha_entrada", columna: "fecha_entrada" },
				{ id: "td_datos_3", campo: "fecha_salida", columna: "fecha_salida" },
				{ id: "td_datos_4", campo: "estado", columna: "estado" },
				{ id: "td_datos_7", campo: "usuario_ingreso", columna: "usuario_ingreso" },
				{ id: "td_datos_8", campo: "usuario_limpio", columna: "usuario_limpio" },
				{ id: "td_datos_5", campo: "cod_cliente", tecnica: true },
				{ id: "td_datos_6", campo: "cod_venta", tecnica: true }
			]
		}
	});
	listadoAbmInformconf.iniciar();
	return listadoAbmInformconf;
}
function programarListadoAbmInformconf() {
	setTimeout(iniciarListadoAbmInformconf, 0);
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", programarListadoAbmInformconf);
} else {
	programarListadoAbmInformconf();
}
function verCerrarAbmInformconf(){
		document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmInformconf").style.display==""){
		document.getElementById("divMinimizadoInformconf").style.display="none"
		limpiarcamposInformconf()
limpiarcamposbuscarInformconf()
		 
		$("div[id=divAbmInformconf]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERINFORMCONF","accion")==false){return;}
		mostrarSoloUno("divAbmInformconf")	
		document.getElementById("divAbmInformconf").style.display=""
		 
	}
}
function verCerrarVentanaAbmInformconf(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			limpiarcamposInformconf()
		}
		$("div[id=divAbmInformconf2]").fadeIn(250)
		document.getElementById('divAbmInformconf1').style.display = "none"
	} else {
		$("div[id=divAbmInformconf1]").fadeIn(250)
		document.getElementById('divAbmInformconf2').style.display = "none"
	}
}
function limpiarcamposbuscarInformconf(){
	    document.getElementById('inptBuscarAbmInformconf1').value="";
	    document.getElementById('inptBuscarAbmInformconf2').value="";
		document.getElementById("table_abm_Informconf").innerHTML = "";
		document.getElementById("inptTotalRegistoInformconf").value = "";
		document.getElementById("inptRegistroSeleccInformconf").value = "";
		document.getElementById("btnCambiarEstadoInformconf").style.backgroundColor = "#b7b7b7";
}
function minimizarAbmInformconf(){ 
	$("div[id=divAbmInformconf]").fadeOut(500);	
	document.getElementById("divMinimizadoInformconf").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuInformconf"));
}

var cod_clienteInformconf = ""
var cod_ventaInformconf = ""
function obtenerdatosAbmInformconf(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	document.getElementById('btnCambiarEstadoInformconf').style.backgroundColor="";
	cod_clienteInformconf = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptRegistroSeleccInformconf').value = $(datostr).children('td[id="td_datos_1"]').html();
}
function verificarcamposAbmInformconf() {
	var inptClienteInformconf = document.getElementById('inptClienteInformconf').value
	var inptCodVentaInformconf = document.getElementById('inptCodVentaInformconf').value
	var inptFechaEntradaInformconf = document.getElementById('inptFechaEntradaInformconf').value
	
	if (inptClienteInformconf == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
		return false;
	}
	
	if (inptCodVentaInformconf == "") {
		ver_vetana_informativa("FALTO SELECCIONA UNA VENTA")
		return false;
	}
	
	
	var accion = "";
	accion = "nuevo";
		
	ABMInformconf(inptFechaEntradaInformconf,accion);
}
function ABMInformconf(fecha_entrada,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_clienteFK", cod_clienteInformconf)
	datos.append("cod_ventaFK", cod_ventaInformconf)
	datos.append("fecha_entrada", fecha_entrada)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMInformconf.php",
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
					limpiarcamposInformconf()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					/* buscarAbmInformconf(); */
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function LimpiarClienteInformconf() {
	

	if (cod_clienteInformconf == "") {
		ver_vetana_informativa("FALTÓ SELECCIONAR UN CLIENTE");
		return;
	}
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'limpiarclienteinformconf')
	datos.append("cod_clienteFK", cod_clienteInformconf)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMInformconf.php",
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
					buscarAbmInformconf();
					cod_clienteInformconf = '';
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadoInformconf(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarInformconf1').checked=true
	document.getElementById('inptSeleccEstadoBuscarInformconf2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarInformconf1').checked=false
	document.getElementById('inptSeleccEstadoBuscarInformconf2').checked=true
	}
}


function buscarAbmInformconf() {
	var listado = iniciarListadoAbmInformconf();
	var fecha1 = document.getElementById('inptBuscarInformconfF1').value
	var fecha2 = document.getElementById('inptBuscarInformconfF2').value
	var cliente= document.getElementById("inptBuscarAbmInformconf1").value
	var estado= document.getElementById("inptBuscarAbmInformconf2").value
	var documento= document.getElementById("inptBuscarAbmInformconf3").value
	
	var usuarioingreso = document.getElementById('inptBuscarAbmInformconf4').value;
	var usuariosalida = document.getElementById('inptBuscarAbmInformconf5').value;
	
	var tipo=""
	if(document.getElementById('checkHistorialFechaInformconf2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	
	if(document.getElementById('checkBuscarInformconfFE').checked==true){
		tipo="entrada";
	}else{
		tipo="salida";
	}
	
	}else{
	fecha1 = ""
	fecha2 = ""
	}
	
	

	
	document.getElementById("table_abm_Informconf").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cliente": cliente,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"tipo": tipo,
		"documento": documento,
		"usuarioingreso": usuarioingreso,
		"usuariosalida": usuariosalida,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMInformconf.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Informconf").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Informconf").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptTotalRegistoInformconf").value = datos[3];
					document.getElementById("inptRegistroSeleccInformconf").value = '';
					document.getElementById('btnCambiarEstadoInformconf').style.backgroundColor = '#b7b7b7';
					cod_clienteInformconf = ''
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposInformconf() {
	document.getElementById('inptClienteInformconf').value = "";
	document.getElementById('inptCodVentaInformconf').value = "";	
	document.getElementById('inptDetalleVentaInformconf').value = "";
	document.getElementById('inptFechaEntradaInformconf').value = obtenerFechaActual();
	cod_clienteInformconf = "";
	cod_ventaInformconf = "";
}

function checkbuscarInformconf(d){	
	if(d=="1"){
		document.getElementById('checkBuscarInformconfFS').checked=true
		document.getElementById('checkBuscarInformconfFE').checked=false
	}else{		
		document.getElementById('checkBuscarInformconfFS').checked=false
		document.getElementById('checkBuscarInformconfFE').checked=true
	
	}
}

function checkHistorialFechaInformconf(d){	
	if(d=="1"){
		document.getElementById('checkHistorialFechaInformconf1').checked=true
		document.getElementById('checkHistorialFechaInformconf2').checked=false
		document.getElementById('inptBuscarInformconfF1').value = "";
	    document.getElementById('inptBuscarInformconfF2').value = "";	
	}else{		
		document.getElementById('checkHistorialFechaInformconf1').checked=false
		document.getElementById('checkHistorialFechaInformconf2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformconfF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformconfF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

/* BUSCAR VISTA VENTA INFORMCONF */
function vercerrarvistabuscarventainformconf(d) {
	if (d == "1") {
		document.getElementById("divVistaVentasInforcomconf").style.display=""
  
	} else {

document.getElementById("table_vista_ventas_informconf").innerHTML = ""
 
		$("div[id=divVistaVentasInforcomconf]").fadeOut(500)
	}
}
function renderVistaVentaInformconf(filas) {
	var contenedor = document.getElementById("table_vista_ventas_informconf");
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
		fila.onclick = function () { obtenerdatosvistaventainformconf(this); };
		var datosCeldas = [
			["", registro.factura, "15%", false],
			["td_datos_1", registro.fecha_original, "", true],
			["", registro.fecha, "10%", false],
			["td_datos_13", registro.numero_factura, "", true],
			["td_datos_12", registro.tipo_venta, "5%", false],
			["td_datos_2", registro.cliente, "20%", false],
			["td_datos_2", registro.documento, "10%", false],
			["", registro.total_venta, "10%", false],
			["", registro.descuento, "10%", false],
			["", registro.total_pagado, "", true],
			["td_datos_8", registro.id_venta, "", true],
			["td_datos_9", registro.id_usuario, "", true]
		];
		datosCeldas.forEach(function (dato) {
			var celda = document.createElement("td");
			if (dato[0]) celda.id = dato[0];
			if (dato[2]) celda.style.width = dato[2];
			if (dato[3]) celda.style.display = "none";
			celda.textContent = dato[1] === null || typeof dato[1] === "undefined" ? "" : String(dato[1]);
			fila.appendChild(celda);
		});
		var celdaProductos = document.createElement("td");
		celdaProductos.id = "td_datos_10";
		celdaProductos.style.width = "10%";
		var productos = Array.isArray(registro.productos) ? registro.productos : [];
		celdaProductos.textContent = productos.map(function (producto) {
			return "*" + (producto === null ? "" : String(producto)) + "*";
		}).join(" ");
		fila.appendChild(celdaProductos);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function buscarvistaventainformconf() {
	if(cod_clienteInformconf ==''){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN CLIENTE PARA BUSCAR VENTA")
		return;
	}
	var filtro_codventa = document.getElementById('inptBuscarVistaVentasInformconf').value
	document.getElementById("table_vista_ventas_informconf").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_clienteFK": cod_clienteInformconf,
		"cod_venta": filtro_codventa,
		"funt": "vistaventainformconf",
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
			document.getElementById("table_vista_ventas_informconf").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_ventas_informconf").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderVistaVentaInformconf(datos_buscados);
					} else {
						document.getElementById("table_vista_ventas_informconf").innerHTML = datos_buscados;
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
function obtenerdatosvistaventainformconf(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	cod_ventaInformconf = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptCodVentaInformconf').value = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptDetalleVentaInformconf').value = $(datostr).children('td[id="td_datos_10"]').html();
	vercerrarvistabuscarventainformconf("2")
}






/* BUSCAR METAS COBRADOR */
function verCerrarAbmMetasCobrador(d) {
	if (d == "1") {		
		mostrarSoloUno("divAbmMetasCobrador")	
		document.getElementById("divAbmMetasCobrador").style.display=""
		checkHistorialMetasCobrador()		 
	} else {
		document.getElementById("table_abm_MetaCobrador").innerHTML = ""		
		$("div[id=divAbmMetasCobrador]").fadeOut(500)
	}
}

function minimizarMetasCobrador(){ 
	$("div[id=divAbmMetasCobrador]").fadeOut(500);
	document.getElementById("divMinimizadoListadoMetasCobrador").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuListadoMetasCobrador"));
}

function buscarMetasCobrador() {
	 
	var fecha1 = document.getElementById('inptBuscarMetasCobradorF1').value
	var fecha2 = document.getElementById('inptBuscarMetasCobradorF2').value
	var cobrador = document.getElementById('inptBuscarAbmCobradorMetasCobrador').value
	var local = document.getElementById('inptBuscarAbmLocalMetasCobrador').value
	var tipo = document.getElementById('inptBuscarAbmTipoMetasCobrador').value
	var tipoPago = document.getElementById('inptBuscarAbmTipoPagoMetasCobrador').value
	var tipoCuota = document.getElementById('inptBuscarAbmTipoCuotaMetasCobrador').value
	 
	if(fecha1=="" || fecha2==""){
		ver_vetana_informativa("FALTO SELECCIONAR EL RANGO DE FECHAS ")
		return false;
	}
	
	document.getElementById("table_abm_MetaCobrador").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoMetasCobrador").value = ''
	 document.getElementById("inptTotalCobroMetasCobrador").value = ''
	 document.getElementById("inptTotalMetasCobroCobrador").value = ''
	 document.getElementById("inptPorcentajeLogradoMetasCobrador").value = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrador": cobrador,
		"local": local,
		"tipo": tipo,
		"tipoPago": tipoPago,
		"tipoCuota": tipoCuota,
		"formato": "json",
		"funt": "buscarMetasCobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMetasCobrador.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_MetaCobrador").innerHTML = ''
			document.getElementById("inptTotalRegistoMetasCobrador").value = ''
					document.getElementById("inptTotalCobroMetasCobrador").value = ''
					document.getElementById("inptTotalMetasCobroCobrador").value = ''
	 document.getElementById("inptPorcentajeLogradoMetasCobrador").value = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_MetaCobrador").innerHTML = ''
			document.getElementById("inptTotalRegistoMetasCobrador").value = ''
					document.getElementById("inptTotalCobroMetasCobrador").value = ''
					document.getElementById("inptTotalMetasCobroCobrador").value = ''
	 document.getElementById("inptPorcentajeLogradoMetasCobrador").value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(Array.isArray(datos_buscados)){renderMetasCobrador(datos_buscados);}
					else{document.getElementById("table_abm_MetaCobrador").innerHTML = datos_buscados || "";}
					document.getElementById("inptTotalRegistoMetasCobrador").value = datos[3];
					document.getElementById("inptTotalCobroMetasCobrador").value = datos[4];
					document.getElementById("inptTotalMetasCobroCobrador").value = datos[5];
					document.getElementById("inptPorcentajeLogradoMetasCobrador").value = datos[6]+" %";
				
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function obtenerdatosvistaventaMetasCobradores(datos,monto , fecha , cobrador , idAbm ) {
	 verCerrarVentanaAbmMetasCobrador("1","1")
	idAbmMetaCobrador = idAbm
	document.getElementById('inptAbmMontoMetasCobrador').value = separadordemilesnumero(monto);
	document.getElementById('inptAbmFechaMetasCobrador').value = datos.id;	
	document.getElementById('inptAbmCobradorMetasCobrador').value = cobrador;
	document.getElementById('btnAbmMetasCobrador').value = "Editar";
	
}


function checkHistorialMetasCobrador(){	
 
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarMetasCobradorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarMetasCobradorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
 
}


function verCerrarVentanaAbmMetasCobrador(d, l) {
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOMETASCOBRADORES","accion")==false){return;}
			limpiarcamposMetasCobradores()
		}
		$("div[id=divAbmMetasCobrador2]").fadeIn(250)
		document.getElementById('divAbmMetasCobrador1').style.display = "none"
	} else {
		$("div[id=divAbmMetasCobrador1]").fadeIn(250)
		document.getElementById('divAbmMetasCobrador2').style.display = "none"
	}
}


function limpiarcamposMetasCobradores() {
	document.getElementById('inptAbmMontoMetasCobrador').value = "";
	document.getElementById('inptAbmFechaMetasCobrador').value = "";	
	document.getElementById('inptAbmCobradorMetasCobrador').value = "";
	document.getElementById('btnAbmMetasCobrador').value = "Guardar";
	idAbmMetaCobrador="";
}

var idAbmMetaCobrador ="";
function verificarcamposAbmMetasCobradores() {
	var inptAbmMontoMetasCobrador = document.getElementById('inptAbmMontoMetasCobrador').value
	var inptAbmFechaMetasCobrador = document.getElementById('inptAbmFechaMetasCobrador').value
	var inptAbmCobradorMetasCobrador = document.getElementById('inptAbmCobradorMetasCobrador').value
	
	if (inptAbmMontoMetasCobrador == "") {
		ver_vetana_informativa("FALTO INGESAR EL MONTO")
		return false;
	}
	
	if (inptAbmCobradorMetasCobrador == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL COBRADOR")
		return false;
	}
	
	
 
	var accion = "";
	if (idAbmMetaCobrador != "") {
		accion = "editar";
		 
	} else {
		accion = "nuevo";
		 
	}
		
	AbmMetasCobradores(inptAbmMontoMetasCobrador,inptAbmFechaMetasCobrador,inptAbmCobradorMetasCobrador,idAbmMetaCobrador,accion);
}

function AbmMetasCobradores(monto,fecha,cobrador,idAbmMetaCobrador,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("monto", monto)
	datos.append("fecha", fecha)
	datos.append("cobrador", cobrador)
	datos.append("idAbmMetaCobrador", idAbmMetaCobrador)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMetasCobrador.php",
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
					limpiarcamposMetasCobradores()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarMetasCobrador()
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
GARANTIAS DESDE PRODUCTOS
*/

var elementoProductoGarantia = '';
function verCerrarGarantiasDesdeProducto(d) {
	if (d == "1") {
		if (idAbmProducto == "") {
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return false;
		}

		document.getElementById("inptProductoDevolucionGarantiaDesdeProducto").value = $(elementoProductoGarantia).children('td[id="td_datos_1"]').html();
		
			var f = new Date();
	var dia =f.getDate()
	if(dia<10){
		dia="0"+dia;
	}
	var mes =f.getMonth()+1
	if(mes<10){
		mes="0"+mes;
	}
	var hora =f.getHours()
	if(hora<10){
		hora="0"+hora;
	}
	var min =f.getMinutes()
	if(min<10){
		min="0"+min;
	}
  document.getElementById('inptFechaRecibidoGarantiaDesdeProducto').value =f.getFullYear()+"-"+mes+"-"+dia;
 document.getElementById('inptObservacionGarantiaDesdeProducto').value =''
  
  
  $("div[id=divGarantiaProductoDevolucionDesdeProducto]").fadeIn(500)

 
	} else {

		$("div[id=divGarantiaProductoDevolucionDesdeProducto]").fadeOut(500)
	}
}
function verificargarantiaproductodesdeproducto() {
     var inptObservacionGarantiaDesdeProducto=document.getElementById("inptObservacionGarantiaDesdeProducto").value
     var inptFechaRecibidoGarantiaDesdeProducto=document.getElementById("inptFechaRecibidoGarantiaDesdeProducto").value
     var inptCantidadGarantiaDesdeProducto=document.getElementById("inptCantidadGarantiaDesdeProducto").value

	if (idAbmProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	if (inptFechaRecibidoGarantiaDesdeProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN FECHA ")
		return false;
	}
	if (inptCantidadGarantiaDesdeProducto == "") {
		ver_vetana_informativa("FALTO INGRESAR LA CANTIDAD ")
		return false;
	}
	if (inptObservacionGarantiaDesdeProducto == "") {
		ver_vetana_informativa("FALTO INGRESAR UNA OBSERVACIÓN ")
		return false;
	}
	
	
	abmgarantiadesdeproducto(inptObservacionGarantiaDesdeProducto,inptFechaRecibidoGarantiaDesdeProducto, idAbmProducto, inptCantidadGarantiaDesdeProducto,"NuevoGarantiaProducto")
}
function abmgarantiadesdeproducto(observacion,fecharecibido, cod_productoFK,cantidad, operacion) {
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", operacion)
	datos.append("cod_productoFK", cod_productoFK)
	datos.append("observacion", observacion)
	datos.append("fecharecibido", fecharecibido)
	datos.append("producto_cod_localFK", cod_localProductoGarantia)
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
					verCerrarGarantiasDesdeProducto("")
                   document.getElementById("inptProductoDevolucionGarantiaDesdeProducto").value = "";
                   document.getElementById("inptObservacionGarantiaDesdeProducto").value = "";
				   elementoProductoGarantia=""
				   buscarabmproducto()
				}
				

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

