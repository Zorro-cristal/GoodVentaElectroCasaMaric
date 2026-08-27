/*
ABM CAJA
*/
var listadoAbmCaja = null;
function iniciarListadoAbmCaja() {
	if (listadoAbmCaja || !window.AbmListadoCore) { return listadoAbmCaja; }
	var cuerpo = document.getElementById("table_abm_Caja");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmCaja";
	listadoAbmCaja = window.AbmListadoCore.crear({
		nombre: "caja",
		idCabecera: "cabeceraAbmCaja",
		idCuerpo: "table_abm_Caja",
		ordenInicial: "caja",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" },
			{ campo: "caja", titulo: "DESCRIP.", ancho: "20%" },
			{ campo: "punto_expedicion", titulo: "PUNTO EXPEDICION", ancho: "20%" },
			{ campo: "local", titulo: "LOCAL", ancho: "20%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmCaja",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "caja", columna: "caja" },
				{ id: "td_datos_2", campo: "punto_expedicion", columna: "punto_expedicion" },
				{ campo: "local", columna: "local" },
				{ id: "td_datos_3", campo: "cod_local", tecnica: true },
				{ id: "td_datos_4", campo: "estado", tecnica: true },
				{ id: "td_datos_100", campo: "insertadopor", tecnica: true },
				{ id: "td_datos_101", campo: "editadopor", tecnica: true },
				{ id: "td_datos_102", campo: "fecha_insert", tecnica: true },
				{ id: "td_datos_103", campo: "fecha_edit", tecnica: true }
			]
		}
	});
	listadoAbmCaja.iniciar();
	return listadoAbmCaja;
}
function verCerrarAbmCaja(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCaja").style.display==""){
		document.getElementById("divMinimizadoListadoCaja").style.display="none"
		limpiarcamposCaja()
		limpiarcamposbuscarcajas()
 
	$("div[id=divAbmCaja]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADODECAJA","accion")==false){return;}
		mostrarSoloUno("divAbmCaja")	
		document.getElementById("divAbmCaja").style.display=""
 
	}
}
function limpiarcamposbuscarcajas(){
		 document.getElementById('inptBuscarAbmCaja1').value=""
	    document.getElementById('inptBuscarAbmCaja2').value=""
		document.getElementById("table_abm_Caja").innerHTML = ""
		document.getElementById("inptTotalRegistoCaja").value = "";
}
function minimizarabmcaja(){ 
	$("div[id=divAbmCaja]").fadeOut(500);	
	document.getElementById("divMinimizadoListadoCaja").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmCajas"));
}
function verCerrarVentanaAbmCaja(d, l) {
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			limpiarcamposCaja()
		}
		$("div[id=divAbmCaja2]").fadeIn(250)
		document.getElementById('divAbmCaja1').style.display = "none"
	} else {
		document.getElementById('divAbmCaja2').style.display = "none"
		$("div[id=divAbmCaja1]").fadeIn(250)
	}
}
function verVentanaEditarCaja() {
	if (idAbmCaja == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	verCerrarVentanaAbmCaja("1", "2")
}
var idAbmCaja = ""
function obtenerdatosabmCaja(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreCaja').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccCaja').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptExpedicionCaja').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptlocalCaja').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptEstadoCaja').value = $(datostr).children('td[id="td_datos_4"]').html();
				document.getElementById('inptUsuarioInsertadoPor').value=$(datostr).children('td[id="td_datos_100"]').html()
	document.getElementById('inptFechaInsertadoPor').value=$(datostr).children('td[id="td_datos_102"]').html()
	document.getElementById('inptUsuarioEditadoPor').value=$(datostr).children('td[id="td_datos_101"]').html()
	document.getElementById('inptFechaEditadoPor').value=$(datostr).children('td[id="td_datos_103"]').html()
	
	document.getElementById('btnAbmCaja').value = "Editar datos";
	document.getElementById('btnEditarDatosCaja').style.backgroundColor="";
	document.getElementById('btnAuditoriaCajas').style.backgroundColor="#673ab7";
	idAbmCaja = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposCaja() {
	var inptNombreCaja = document.getElementById('inptNombreCaja').value
	var inptExpedicionCaja = document.getElementById('inptExpedicionCaja').value
	var inptlocalCaja = document.getElementById('inptlocalCaja').value
	var inptEstadoCaja = document.getElementById('inptEstadoCaja').value
	if (inptNombreCaja == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE LA CAJA")
		return false;
	}

	var accion = "";
	if (idAbmCaja != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
	}
	abmCaja(inptNombreCaja, inptExpedicionCaja ,inptlocalCaja ,inptEstadoCaja , idAbmCaja, accion);
}
function abmCaja(cajanro, puntoexpedicion ,cod_localFK ,estado , idcaja, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idcaja", idcaja)
	datos.append("cajanro", cajanro)
	datos.append("puntoexpedicion", puntoexpedicion)
	datos.append("estado", estado)
	datos.append("cod_localFK", cod_localFK)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCaja.php",
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
					limpiarcamposCaja()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmCaja = ""
					buscarabmCaja();
					buscarOptionCaja();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoCaja(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarCaja1').checked=true
	document.getElementById('inptSeleccEstadoBuscarCaja2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarCaja1').checked=false
	document.getElementById('inptSeleccEstadoBuscarCaja2').checked=true
	}
}
function buscarabmCaja() {
if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var listado = iniciarListadoAbmCaja();
	var codigo = document.getElementById('inptBuscarAbmCaja1').value
	var descrip = document.getElementById('inptBuscarAbmCaja2').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarCaja1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_Caja").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"descrip": descrip,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCaja.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Caja").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Caja").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptTotalRegistoCaja").value = datos[3];
					
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmCaja);
} else {
	iniciarListadoAbmCaja();
}

function buscarOptionCaja() {
	document.getElementById("inptcajaAperturaCierreCaja").innerHTML = ""
	document.getElementById("inptSeleccPuntoExpedicionVenta").innerHTML = ""
	//document.getElementById("inptCajalNroFactura").innerHTML = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_local": cod_localFKUSer,
		"funt": "buscaroption"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCaja.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptcajaAperturaCierreCaja").innerHTML = ''
			document.getElementById("inptSeleccPuntoExpedicionVenta").innerHTML = ''
			//document.getElementById("inptCajalNroFactura").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptcajaAperturaCierreCaja").innerHTML = ''
			document.getElementById("inptSeleccPuntoExpedicionVenta").innerHTML = ''
			//document.getElementById("inptCajalNroFactura").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					var datos_expedicion = datos[4];
					document.getElementById("inptcajaAperturaCierreCaja").innerHTML = datos_buscados
					document.getElementById("inptSeleccPuntoExpedicionVenta").innerHTML = datos_expedicion
					//document.getElementById("inptCajalNroFactura").innerHTML = datos_expedicion
					document.getElementById("inptSeleccPuntoExpedicionVenta").value="";
					
					
					controldecaja()
					
					seleccionarcaja()
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


function seleccionarcaja(){
	document.getElementById("inptcajaAperturaCierreCaja").value=cajapredeterminada

	document.getElementById("pCaja").innerHTML = $("select[id=inptcajaAperturaCierreCaja]").children(":selected").text()
	
}
function buscarOptionCaja2(d) {

	var codLocal="";
	if(d=="1"){
		var codLocal=document.getElementById("inptlocalAperturaCierre").value;
		document.getElementById("inptcajaAperturaCierreCaja").innerHTML = ""
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_local": codLocal,
		"funt": "buscaroption"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCaja.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
				if(d=="1"){
		document.getElementById("inptcajaAperturaCierreCaja").innerHTML = ""
	}
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
						if(d=="1"){
		document.getElementById("inptcajaAperturaCierreCaja").innerHTML = ""
	}
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
				
							if(d=="1"){
			document.getElementById("inptcajaAperturaCierreCaja").innerHTML = datos_buscados
			controldecaja()
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



function limpiarcamposCaja() {
	document.getElementById('inptNombreCaja').value = "";
	document.getElementById('inptExpedicionCaja').value = "";
	document.getElementById('inptRegistroSeleccCaja').value = "";
	document.getElementById('inptEstadoCaja').value = "Activo";
	document.getElementById('btnEditarDatosCaja').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAuditoriaCajas').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmCaja').value = "Guardar datos";
	idAbmCaja = "";
}
