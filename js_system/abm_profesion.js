/*
ABM PROFESION
*/
function verCerrarAbmProfesion(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmProfesion").style.display==""){
		document.getElementById("divMinimizadoListadoProfesion").style.display="none"
	limpiarCamposBuscarProfesion()
		limpiarcamposProfesion()
 
	$("div[id=divAbmProfesion]").fadeOut(500);	
	
	}else{			
		// if(controlacceso("VERLISTADODELOCALES","accion")==false){return;}
		mostrarSoloUno("divAbmProfesion")	
		document.getElementById("divAbmProfesion").style.display=""
 
	
	}
}
function limpiarCamposBuscarProfesion(){
	document.getElementById("inptBuscarAbmProfesion1").value=""
	document.getElementById("inptBuscarAbmProfesion2").value=""
	document.getElementById("inptTotalRegistoProfesion").value=""
	document.getElementById("inptRegistroSeleccProfesion").value=""
	if (listadoAbmProfesion) listadoAbmProfesion.establecerRegistros([])
	else document.getElementById("table_abm_Profesion").innerHTML=""
}
function minimizarProfesion(){
		document.getElementById("divMinimizadoListadoProfesion").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmLocales"));
	$("div[id=divAbmProfesion]").fadeOut(500);	
}
function verCerrarVentanaAbmProfesion(d, l) {
	if (d == "1") {
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODELOCALES","accion")==false){return;}
			limpiarcamposProfesion()
		}
		$("div[id=divAbmProfesion2]").fadeIn(250)
		document.getElementById('divAbmProfesion1').style.display = "none"
	} else {
		$("div[id=divAbmProfesion1]").fadeIn(250)
			document.getElementById('divAbmProfesion2').style.display = "none"
	}
}
function verVentanaEditarProfesion() {
	// if(controlacceso("EDITARLISTADODELOCALES","accion")==false){return;}
	if (idAbmProfesion == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmProfesion("1", "2")
}
var idAbmProfesion = ""
function obtenerdatosabmProfesion(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreProfesion').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccProfesion').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoProfesion').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptTipoProfesion').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('btnEditarProfesion').style.backgroundColor="";
	document.getElementById('btnAbmProfesion').value = "Editar datos";
	idAbmProfesion = $(datostr).children('td[id="td_id"]').html();
}

function verificarcamposProfesion() {
	var inptNombreProfesion = document.getElementById('inptNombreProfesion').value
	var inptTipoProfesion = document.getElementById('inptTipoProfesion').value
	var inptEstadoProfesion = document.getElementById('inptEstadoProfesion').value
	if (inptNombreProfesion == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE LA PROFESION")
		return false;
	}
	
	if (inptTipoProfesion == "") {
		ver_vetana_informativa("FALTO SELLECIONAR EL TIPO DE LA PROFESION")
		return false;
	}
	
	var accion = "";
	if (idAbmProfesion != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADODELOCALES","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADODELOCALES","accion")==false){return;}
	}
	abmProfesion(inptNombreProfesion, inptTipoProfesion,inptEstadoProfesion, idAbmProfesion, accion);
}


function abmProfesion(nombre,tipo, estado, idprofesion, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idprofesion", idprofesion)
	datos.append("nombre", nombre)
	datos.append("estado", estado)
	datos.append("tipo", tipo)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmProfesion.php",
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
					limpiarcamposProfesion()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmProfesion = ""
					buscarabmProfesion()
					buscarabmProfesionOption(); 
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function checkestadoProfesions(d){
	if(d=="1"){
		document.getElementById('inptSeleccEstadoBuscarProfesion1').checked=true
		document.getElementById('inptSeleccEstadoBuscarProfesion2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarProfesion1').checked=false
		document.getElementById('inptSeleccEstadoBuscarProfesion2').checked=true
	}
}

var listadoAbmProfesion = null;
function inicializarListadoAbmProfesion() {
	if (!window.AbmListadoCore) return;
	var formulario = document.getElementById('divAbmProfesion1');
	var cuerpo = document.getElementById('table_abm_Profesion');
	var cabecera = formulario ? formulario.querySelector('.tableCabeceraRegistro tr') : null;
	if (!cuerpo || !cabecera) return;
	cabecera.id = 'cabeceraAbmProfesion';
	var opciones = formulario.querySelector('.abm-estandar-menu-columnas');
	if (opciones) opciones.id = 'opcionesColumnasProfesion';
	if (!listadoAbmProfesion) {
		listadoAbmProfesion = window.AbmListadoCore.crear({
			nombre: 'profesion',
			idCabecera: 'cabeceraAbmProfesion',
			idCuerpo: 'table_abm_Profesion',
			idOpcionesColumnas: 'opcionesColumnasProfesion',
			ordenable: true,
			ordenInicial: 'profesion',
			columnas: [
				{ campo: 'codigo', titulo: '#', ancho: '15%' },
				{ campo: 'profesion', titulo: 'PROFESION', ancho: '65%' },
				{ campo: 'tipo', titulo: 'TIPO', ancho: '20%' }
			],
			fila: {
				funcionSeleccion: 'obtenerdatosabmProfesion',
				celdas: [
					{ id: 'td_id', columna: 'codigo', campo: 'codigo' },
					{ id: 'td_datos_1', columna: 'profesion', campo: 'profesion' },
					{ id: 'td_datos_3', columna: 'tipo', campo: 'tipo' },
					{ id: 'td_datos_2', tecnica: true, campo: 'estado' }
				]
			}
		});
	}
	listadoAbmProfesion.iniciar();
}

function programarListadoAbmProfesion() {
	setTimeout(inicializarListadoAbmProfesion, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmProfesion);
else programarListadoAbmProfesion();


function buscarabmProfesion() {
// if(controlacceso("BUSCARLISTADODELOCALES","accion")==false){return;}
	var codigo = document.getElementById('inptBuscarAbmProfesion1').value
	var nombre = document.getElementById('inptBuscarAbmProfesion2').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarProfesion1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_Profesion").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"nombre": nombre,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmProfesion.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Profesion").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Profesion").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					inicializarListadoAbmProfesion()
					listadoAbmProfesion.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoProfesion").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function limpiarcamposProfesion() {
	document.getElementById('inptNombreProfesion').value = "";
	document.getElementById('inptRegistroSeleccProfesion').value = "";
	document.getElementById('inptTipoProfesion').value = "";
	document.getElementById('btnEditarProfesion').style.backgroundColor="#b7b7b7";
	document.getElementById('inptEstadoProfesion').value = "Activo";
	document.getElementById('btnAbmProfesion').value = "Guardar datos";
	idAbmProfesion = "";
}


function buscarabmProfesionOption() {
	document.getElementById("inptProfesionCliente").innerHTML = "";	
	document.getElementById("inptBuscarAbmCliente9").innerHTML = "";	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmProfesion.php",
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
					document.getElementById("inptProfesionCliente").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					document.getElementById("inptBuscarAbmCliente9").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
