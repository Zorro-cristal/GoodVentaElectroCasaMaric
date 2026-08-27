/*
ABM MIGRAR CAJA
*/
var listadoAbmMigrarCaja = null;
var listadoCajaEscritorio = null;
var listadoCajaApp = null;

function iniciarListadoCajaEscritorio() {
	if (listadoCajaEscritorio || !window.AbmListadoCore) { return listadoCajaEscritorio; }
	var cuerpo = document.getElementById("divBuscadorCajaEscritorio");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraCajaEscritorio";
	listadoCajaEscritorio = window.AbmListadoCore.crear({
		nombre: "caja_escritorio_pendiente",
		idCabecera: "cabeceraCajaEscritorio",
		idCuerpo: "divBuscadorCajaEscritorio",
		ordenInicial: "fecha",
		columnas: [
			{ campo: "fecha", titulo: "FECHA", ancho: "20%" },
			{ campo: "envia", titulo: "ENVIA", ancho: "25%" },
			{ campo: "observacion", titulo: "OBSERVACION", ancho: "25%" },
			{ campo: "monto", titulo: "MONTO", ancho: "20%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmCajaEscritorio",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "fecha", columna: "fecha" },
				{ id: "td_datos_2", campo: "envia", columna: "envia" },
				{ id: "td_datos_3", campo: "observacion", columna: "observacion" },
				{ id: "td_datos_4", columna: "monto", valor: function (registro) { return registro.monto_formateado; } }
			]
		}
	});
	listadoCajaEscritorio.iniciar();
	return listadoCajaEscritorio;
}

function iniciarListadoCajaApp() {
	if (listadoCajaApp || !window.AbmListadoCore) { return listadoCajaApp; }
	var cuerpo = document.getElementById("divBuscadorCajaApp");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraCajaApp";
	listadoCajaApp = window.AbmListadoCore.crear({
		nombre: "caja_app_pendiente",
		idCabecera: "cabeceraCajaApp",
		idCuerpo: "divBuscadorCajaApp",
		ordenInicial: "fecha_apertura",
		columnas: [
			{ campo: "fecha_apertura", titulo: "FECHA APERTURA", ancho: "16.5%" },
			{ campo: "fecha_cierre", titulo: "FECHA CIERRE", ancho: "16.5%" },
			{ campo: "usuario", titulo: "COBRADOR", ancho: "16.5%" },
			{ campo: "monto_cierre", titulo: "MONTO RECAUDADO", ancho: "16.5%" },
			{ campo: "monto_gasto", titulo: "MONTO GASTO", ancho: "16.5%" },
			{ campo: "total_caja", titulo: "MONTO TOTAL", ancho: "16.5%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmCajaApp",
			celdas: [
				{ id: "td_id_1", campo: "codigo", tecnica: true },
				{ id: "td_datos_9", campo: "fecha_apertura", columna: "fecha_apertura" },
				{ id: "td_datos_3", campo: "fecha_cierre", columna: "fecha_cierre" },
				{ id: "td_datos_1", campo: "usuario", columna: "usuario" },
				{ id: "td_datos_7", columna: "monto_cierre", valor: function (registro) { return registro.monto_cierre_formateado; } },
				{ id: "td_datos_8", columna: "monto_gasto", valor: function (registro) { return registro.monto_gasto_formateado; } },
				{ id: "td_datos_9", columna: "total_caja", valor: function (registro) { return registro.total_caja_formateado; } }
			]
		}
	});
	listadoCajaApp.iniciar();
	return listadoCajaApp;
}

function iniciarListadoAbmMigrarCaja() {
	if (listadoAbmMigrarCaja || !window.AbmListadoCore) { return listadoAbmMigrarCaja; }
	var cuerpo = document.getElementById("table_abm_MigrarCaja");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmMigrarCaja";
	listadoAbmMigrarCaja = window.AbmListadoCore.crear({
		nombre: "migrar_caja",
		idCabecera: "cabeceraAbmMigrarCaja",
		idCuerpo: "table_abm_MigrarCaja",
		ordenInicial: "codigo",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "10%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "20%" },
			{ campo: "monto", titulo: "MONTO", ancho: "20%" },
			{ campo: "observacion", titulo: "OBSERVACION", ancho: "30%" },
			{ campo: "usuario_recibe", titulo: "ENVIADO A", ancho: "20%" }
		],
		fila: {
			seleccionar: function (fila, registro) {
				if (registro.seleccionable === "SI") { obtenerdatosabmMigrarCaja(fila); }
			},
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo", render: function (valor, registro, celda) {
					celda.style.backgroundColor = "#efeded";
					celda.style.color = "red";
					return valor;
				} },
				{ id: "td_datos_1", campo: "fecha", columna: "fecha" },
				{ id: "td_datos_2", campo: "monto_formateado", columna: "monto" },
				{ id: "td_datos_3", campo: "observacion", columna: "observacion" },
				{ id: "td_datos_4", campo: "usuario_recibe", columna: "usuario_recibe" },
				{ id: "td_datos_5", campo: "cod_usuario_recibe", tecnica: true },
				{ id: "td_datos_6", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmMigrarCaja.iniciar();
	return listadoAbmMigrarCaja;
}
function verCerrarAbmMigrarCaja(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmMigrarCaja").style.display==""){
		document.getElementById("divMinimizadoMigrarCaja").style.display="none"
	limpiarCamposBuscarMigrarCaja()
		limpiarcamposMigrarCaja()
 
	$("div[id=divAbmMigrarCaja]").fadeOut(500);	
	
	}else{			
		if(controlacceso("VERMIGRARCAJA","accion")==false){return;}
		
		mostrarSoloUno("divAbmMigrarCaja")	
		document.getElementById("divAbmMigrarCaja").style.display=""
 
	
	}
}
function limpiarCamposBuscarMigrarCaja(){
	document.getElementById("inptBuscarAbmMigrarCaja1").value=""
	document.getElementById("inptBuscarAbmMigrarCaja2").value=""
	document.getElementById("inptTotalRegistoMigrarCaja").value=""
	document.getElementById("inptRegistroSeleccMigrarCaja").value=""
	document.getElementById("table_abm_MigrarCaja").innerHTML=""
}
function minimizarMigrarCaja(){
		document.getElementById("divMinimizadoMigrarCaja").style.display=""
		copiarBotonEnContenedor(document.getElementById("divMenuMigrarCaja"));
 
	$("div[id=divAbmMigrarCaja]").fadeOut(500);	
}
function verCerrarVentanaAbmMigrarCaja(d, l) {
	if (d == "1") {
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODELOCALES","accion")==false){return;}
			limpiarcamposMigrarCaja()
		}
		$("div[id=divAbmMigrarCaja2]").fadeIn(250)
		document.getElementById('divAbmMigrarCaja1').style.display = "none"
	} else {
		$("div[id=divAbmMigrarCaja1]").fadeIn(250)
			document.getElementById('divAbmMigrarCaja2').style.display = "none"
	}
}
function verVentanaEditarMigrarCaja() {
	// if(controlacceso("EDITARLISTADODELOCALES","accion")==false){return;}
	if (idAbmMigrarCaja == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmMigrarCaja("1", "2")
}
var idAbmMigrarCaja = ""
function obtenerdatosabmMigrarCaja(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptMontoMigrarCaja').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptObsMigrarCaja').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptEnviarMigrarCaja').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptRegistroSeleccMigrarCaja').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptEstadoMigrarCaja').value = $(datostr).children('td[id="td_datos_6"]').html();
	
	document.getElementById('btnEditarMigrarCajas').style.backgroundColor="";
	document.getElementById('btnAbmMigrarCaja').value = "Editar datos";
	idAbmMigrarCaja = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposMigrarCaja() {
	var inptMontoMigrarCaja = document.getElementById('inptMontoMigrarCaja').value
	var inptObsMigrarCaja = document.getElementById('inptObsMigrarCaja').value
	var inptEnviarMigrarCaja = document.getElementById('inptEnviarMigrarCaja').value
	var inptEstadoMigrarCaja = document.getElementById('inptEstadoMigrarCaja').value
	
	if (inptMontoMigrarCaja == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO A MIGRAR")
		return false;
	}
	
	if (inptEnviarMigrarCaja == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL USUARIO A ENVIAR")
		return false;
	}
	
	
	if (inptEnviarMigrarCaja == userid) {
		ver_vetana_informativa("NO SE PUEDE MIGRAR CAJA A MISMO USUARIO, FAVOR SELECCIONE OTRO")
		return false;
	}
	
	
	
	if (idabmAperturacierrecaja == "") {
		ver_vetana_informativa("PARA COMPLETAR ESTA ACCION DEBE TENER UNA CAJA ABIERTA")
		return false;
	}
	
	var accion = "";
	if (idAbmMigrarCaja != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADODELOCALES","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADODELOCALES","accion")==false){return;}
	}
	abmMigrarCaja(inptMontoMigrarCaja, inptObsMigrarCaja,inptEnviarMigrarCaja, inptEstadoMigrarCaja, idAbmMigrarCaja, accion);
}
function abmMigrarCaja(monto, obs, usu_RecibirFK , estado, cod_MigrarCaja, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_MigrarCaja", cod_MigrarCaja)
	datos.append("monto", monto)
	datos.append("obs", obs)
	datos.append("usu_RecibirFK", usu_RecibirFK)
	datos.append("estado", estado)
	datos.append("cod_cajaApertura", idabmAperturacierrecaja)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMigrarCaja.php",
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
					limpiarcamposMigrarCaja()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmMigrarCaja = ""
					buscarabmMigrarCaja()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoMigrarCajas(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarMigrarCaja1').checked=true
		document.getElementById('inptSeleccEstadoBuscarMigrarCaja2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarMigrarCaja1').checked=false
		document.getElementById('inptSeleccEstadoBuscarMigrarCaja2').checked=true
	}
}
function buscarabmMigrarCaja() {
// if(controlacceso("BUSCARLISTADODELOCALES","accion")==false){return;}
	var listado = iniciarListadoAbmMigrarCaja();
	var fecha = document.getElementById('inptBuscarAbmMigrarCaja1').value
	var recibe = document.getElementById('inptBuscarAbmMigrarCaja2').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarMigrarCaja1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_MigrarCaja").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"recibe": recibe,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMigrarCaja.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_MigrarCaja").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_MigrarCaja").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					document.getElementById("inptTotalRegistoMigrarCaja").value = datos[3];
					
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmMigrarCaja);
} else {
	iniciarListadoAbmMigrarCaja();
}
function limpiarcamposMigrarCaja() {
	document.getElementById('inptMontoMigrarCaja').value = "";
	document.getElementById('inptObsMigrarCaja').value = "";
	document.getElementById('inptEnviarMigrarCaja').value = "";
	document.getElementById('inptRegistroSeleccMigrarCaja').value = "";
	document.getElementById('btnEditarMigrarCajas').style.backgroundColor ="#b7b7b7";
	document.getElementById('inptEstadoMigrarCaja').value = "Activo";
	document.getElementById('btnAbmMigrarCaja').value = "Guardar datos";
	idAbmMigrarCaja = "";
}
function BuscarOptionUsuario() {
	document.getElementById("inptEnviarMigrarCaja").innerHTML = ""
	document.getElementById("inptAbmUsuarioVendedor").innerHTML = ""
	// document.getElementById("inptBuscarInfAudiProducto3").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionUsu"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmMigrarCaja.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptEnviarMigrarCaja").innerHTML = ''
			document.getElementById("inptAbmUsuarioVendedor").innerHTML = ''
			// document.getElementById("inptBuscarInfAudiProducto3").innerHTML = ''

						},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptEnviarMigrarCaja").innerHTML = ''
			document.getElementById("inptAbmUsuarioVendedor").innerHTML = ''
			// document.getElementById("inptBuscarInfAudiProducto3").innerHTML = ''

			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("inptEnviarMigrarCaja").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptAbmUsuarioVendedor").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					// document.getElementById("inptBuscarInfAudiProducto3").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					
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
Migrar Caja
*/
var idAbmCajaEscritorio="";
var ElementoSeleccCajaEscritorio="";
function verCerrarFrmCajaEscritorio(d){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCajaEscritorio").style.display==""){ 
		 
		$("div[id=divAbmCajaEscritorio]").fadeOut(500);	
		LimpiarCamposCajaEscritorio()
	}else{		
	if(controlacceso("VERRECIBIRCAJA","accion")==false){return;	}
	
	mostrarSoloUno("divAbmCajaEscritorio")	
		document.getElementById("divAbmCajaEscritorio").style.display=""
		 
		BuscarAbmCajaEscritorio()
	}
}



function minimizarCajaEscritorio(){
 	$("div[id=divAbmCajaEscritorio]").fadeOut(500);	
	document.getElementById("divMinimizadoRecibirCaja").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuRecibirCaja"));
}

 
function LimpiarCamposCajaEscritorio(){
	 
	 document.getElementById('btnCajaEscritorio').style.backgroundColor="#b1b2b3"
	idAbmCajaEscritorio="";

}
function ObtenerdatosAbmCajaEscritorio(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	idAbmCajaEscritorio = $(datostr).children('td[id="td_id"]').html();
	
	document.getElementById('btnCajaEscritorio').style.backgroundColor=""
	
	
	
}
function VerificarDatosCajaEscritorio(){
	
	
	
	
	if(idabmAperturacierrecaja=="" || idabmAperturacierrecaja=="0" ){ 
		ver_vetana_informativa("Falto Seleccionar una caja")
		return
	}
 
	if(idAbmCajaEscritorio==""){ 
		ver_vetana_informativa("Falto Seleccionar un registro")
		return
	}
	 
	 accion = "nuevoCajaEscritorio";
	 
	AbmCajaEscritorio( idAbmCajaEscritorio,accion)
}
function AbmCajaEscritorio( idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm) 
	datos.append("codApertura", idabmAperturacierrecaja)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMigrarCaja.php",
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

					LimpiarCamposCajaEscritorio()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")				
					BuscarAbmCajaEscritorio()


				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

}
function BuscarAbmCajaEscritorio() {
	var listado = iniciarListadoCajaEscritorio();
	document.getElementById("divBuscadorCajaEscritorio").innerHTML = paginacargando;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "BuscarAbmCajaEscritorio"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMigrarCaja.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorCajaEscritorio").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorCajaEscritorio").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					
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
Caja App
*/
var idAbmCajaApp="";
var ElementoSeleccCajaApp="";
function verCerrarFrmCajaApp(d){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCajaApp").style.display==""){ 
		 
		$("div[id=divAbmCajaApp]").fadeOut(500);	
		LimpiarCamposCajaApp()
	}else{		
	if(controlacceso("VERCAJAAPP","accion")==false){return;	}
		document.getElementById("divAbmCajaApp").style.display=""
		 
		BuscarAbmCajaApp()
	}
}
 
function LimpiarCamposCajaApp(){
	 
	 document.getElementById('btnCajaApp').style.backgroundColor="#b1b2b3"
	idAbmCajaApp="";

}
function ObtenerdatosAbmCajaApp(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	idAbmCajaApp = $(datostr).children('td[id="td_id_1"]').html();
	
	document.getElementById('btnCajaApp').style.backgroundColor=""
	
	
	
}
function VerificarDatosCajaApp(){
 
	if(idAbmCajaApp==""){ 
		ver_vetana_informativa("Falto Seleccionar un registro")
		return
	}
	 
	 accion = "nuevoCajaApp";
	 
	AbmCajaApp( idAbmCajaApp,accion)
}
function AbmCajaApp( idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm) 
	datos.append("codApertura", idabmAperturacierrecaja)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
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

					LimpiarCamposCajaApp()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")				
					BuscarAbmCajaApp()


				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

}
function BuscarAbmCajaApp() {
	var listado = iniciarListadoCajaApp();
	document.getElementById("divBuscadorCajaApp").innerHTML = paginacargando;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "BuscarAbmCajaApp"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
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
			document.getElementById("divBuscadorCajaApp").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorCajaApp").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					
				}
				
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}





