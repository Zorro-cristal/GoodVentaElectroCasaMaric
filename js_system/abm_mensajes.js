/*
ABM MENSAJES
*/
function verCerrarAbmMensajes(){
	// document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmMensajes").style.display==""){
		document.getElementById("divMinimizadoMensajes").style.display="none"
		limpiarcamposMensajes()
		limpiarcamposbuscarMensajes()
		 
	$("div[id=divAbmMensajes]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADODEMENSAJES","accion")==false){return;}
		mostrarSoloUno("divAbmMensajes")	
		document.getElementById("divAbmMensajes").style.display=""
		 
	}
}

function verCerrarVentanaAbmMensajes(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODEMENSAJES","accion")==false){return;}
			limpiarcamposMensajes()
		}
		$("div[id=divAbmMensajes2]").fadeIn(250)
		document.getElementById('divAbmMensajes1').style.display = "none"
	} else {
		$("div[id=divAbmMensajes1]").fadeIn(250)
		document.getElementById('divAbmMensajes2').style.display = "none"
	}
}


function limpiarcamposbuscarMensajes(){
	    document.getElementById('inptBuscarAbmMensajes2').value=""
		document.getElementById("table_abm_Mensajes").innerHTML = ""
		document.getElementById("inptTotalRegistoMensajes").value = "";
}
function minimizarabmMensajes(){
 
	$("div[id=divAbmMensajes]").fadeOut(500);	
	document.getElementById("divMinimizadoMensajes").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmMensajes"));
}

function verVentanaEditarMensajes() {
	if (idAbmMensajes == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADODEBANCO","accion")==false){return;}
	verCerrarVentanaAbmMensajes("1", "2")
}
var idAbmMensajes = ""
var listadoAbmMensajes = null
function iniciarListadoAbmMensajes() {
	if (listadoAbmMensajes || !window.AbmListadoCore) return listadoAbmMensajes
	var cuerpo = document.getElementById('table_abm_Mensajes')
	if (!cuerpo) return null
	var cabecera = cuerpo.previousElementSibling
	while (cabecera && (cabecera.tagName !== 'TABLE' || cabecera.querySelector('input,select,textarea'))) cabecera = cabecera.previousElementSibling
	if (!cabecera) return null
	cabecera.id = 'cabeceraAbmMensajes'
	var columnas = [
		{ campo: 'mensaje', titulo: 'MENSAJE', ancho: '24%' },
		{ campo: 'telefono', titulo: 'TELEFONO', ancho: '12%' },
		{ campo: 'fecha', titulo: 'FECHA', ancho: '11%' },
		{ campo: 'hora', titulo: 'HORA', ancho: '9%' },
		{ campo: 'tipo', titulo: 'TIPO', ancho: '10%' },
		{ campo: 'titulo', titulo: 'TITULO', ancho: '14%' },
		{ campo: 'estado_envio', titulo: 'ESTADO ENVIO', ancho: '12%' },
		{ campo: 'estado', titulo: 'ESTADO', ancho: '8%' }
	]
	listadoAbmMensajes = window.AbmListadoCore.crear({
		nombre: 'mensajes', idCabecera: 'cabeceraAbmMensajes', idCuerpo: 'table_abm_Mensajes',
		ordenInicial: 'fecha', columnas: columnas,
		fila: {
			funcionSeleccion: 'ObtenerdatosAbmMensajes',
			celdas: [
				{ id: 'td_id', campo: 'codigo', tecnica: true },
				{ id: 'td_datos_1', campo: 'mensaje', columna: 'mensaje', className: 'tdRegistroSearch' },
				{ id: 'td_datos_2', campo: 'telefono', columna: 'telefono' },
				{ id: 'td_datos_4', campo: 'fecha', columna: 'fecha' },
				{ id: 'td_datos_5', campo: 'hora', columna: 'hora' },
				{ id: 'td_datos_6', campo: 'tipo', columna: 'tipo' },
				{ id: 'td_datos_7', campo: 'titulo', columna: 'titulo' },
				{ id: 'td_datos_8', campo: 'estado_envio', columna: 'estado_envio' },
				{ id: 'td_datos_3', campo: 'estado', columna: 'estado' }
			]
		}
	})
	listadoAbmMensajes.iniciar()
	return listadoAbmMensajes
}
function ObtenerdatosAbmMensajes(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'

	document.getElementById('btnAnularMensajes').style.backgroundColor="#ff0000";
	idAbmMensajes = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposMensajes() {
	var inptNombreMensajes = document.getElementById('inptNombreMensajes').value
	var inptEstadoMensajes = document.getElementById('inptEstadoMensajes').value
	if (inptNombreMensajes == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL BANCO")
		return false;
	}
	
	var accion = "";
	if (idAbmMensajes != "") {
		accion = "editar";
		if(controlacceso("INSERTARLISTADODEMENSAJES","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("EDITARLISTADODEBANCO","accion")==false){return;}
	}
	abmMensajes(inptNombreMensajes ,inptEstadoMensajes , idAbmMensajes, accion);
}
function abmMensajes(nombre,estado , idMensajes, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_Mensajes", idMensajes)
	datos.append("nombre", nombre)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMensajes.php",
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
					limpiarcamposMensajes()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmMensajes = ""
					buscarabmMensajes();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function checkestadoMensajes(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarMensajes1').checked=true
	document.getElementById('inptSeleccEstadoBuscarMensajes2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarMensajes1').checked=false
	document.getElementById('inptSeleccEstadoBuscarMensajes2').checked=true
	}
}
function buscarabmMensajes() {
	// if(controlacceso("BUSCARLISTADODEMENSAJES","accion")==false){return;}
	var listado = iniciarListadoAbmMensajes()
	var mensaje = document.getElementById('inptBuscarAbmMensajes1').value
	var telefono = document.getElementById('inptBuscarAbmMensajes2').value
	var estado_mensaje = document.getElementById('inptBuscarAbmMensajes3').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarMensajes1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_Mensajes").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"mensaje": mensaje,
		"telefono": telefono,
		"estado": estado,
		"estado_mensaje": estado_mensaje,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMensajes.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Mensajes").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Mensajes").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoMensajes").value = datos[3];
					document.getElementById("inptTotalRegistoMensajesEnviados").value = datos[4];
					document.getElementById("inptTotalRegistoMensajesPendientes").value = datos[5];
					document.getElementById("inptTotalRegistoMensajesErrados").value = datos[6];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmMensajes)
else iniciarListadoAbmMensajes()
function limpiarcamposMensajes() {
	document.getElementById('inptBuscarAbmMensajes1').value = "";
	document.getElementById('inptBuscarAbmMensajes2').value = "";
	document.getElementById('inptBuscarAbmMensajes3').value = "";
	
	document.getElementById('inptTotalRegistoMensajes').value = "";
	document.getElementById('inptTotalRegistoMensajesEnviados').value = "";
	document.getElementById('inptTotalRegistoMensajesErrados').value = "";
	document.getElementById('inptTotalRegistoMensajesPendientes').value = "";
	
	
	// document.getElementById('inptEstadoMensajes').value = "Activo";
	document.getElementById('btnAnularMensajes').style.backgroundColor="#d5d3d3";
	// document.getElementById('btnAbmMensajes').value = "Guardar datos";
	idAbmMensajes= "";
	
	
	
}
function abmanularMensaje() {
	// if(controlacceso("BUSCARLISTADODEMENSAJES","accion")==false){return;}
	if(idAbmMensajes == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN MENSAJE PARA ANULAR');
		return;
	}
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_notificaciones": idAbmMensajes,
		"funt": "anular_mensaje"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmMensajes.php",
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
					ver_vetana_informativa('EL MENSAJE HA SIDO ANULADO');
					idAbmMensajes = '';
					buscarabmMensajes();
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



