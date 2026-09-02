/*
ABM ADMINISTRACION LOCALES
*/
var listadoAbmAdminLocales = null;
function iniciarListadoAbmAdminLocales() {
	if (listadoAbmAdminLocales || !window.AbmListadoCore) { return listadoAbmAdminLocales; }
	var cuerpo = document.getElementById("table_abm_adminlocales");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmAdminLocales";
	listadoAbmAdminLocales = window.AbmListadoCore.crear({
		nombre: "admin_locales",
		idCabecera: "cabeceraAbmAdminLocales",
		idCuerpo: "table_abm_adminlocales",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "10%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "90%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmAdminLocales",
			claseTabla: "tableRegistroSearch",
			border: "0",
			cellspacing: "0",
			cellpadding: "0",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_3", campo: "estado", tecnica: true },
				{ id: "td_datos_4", campo: "telefono", tecnica: true },
				{ id: "td_datos_5", campo: "direccion", tecnica: true },
				{ id: "td_datos_6", campo: "ciudad", tecnica: true }
			]
		}
	});
	listadoAbmAdminLocales.iniciar();
	return listadoAbmAdminLocales;
}
function verCerrarAbmAdminLocales(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmAdminLocales").style.display==""){
		document.getElementById("divMinimizadoAdminLocales").style.display="none"
		limpiarcamposbuscaradminlocales()
		limpiarcamposAdminLocales()
 
	$("div[id=divAbmAdminLocales]").fadeOut(500);	
	}else{
if(controlacceso("VERLISTADOADMINLOCALES","accion")==false){return;}	
mostrarSoloUno("divAbmAdminLocales")		
		document.getElementById("divAbmAdminLocales").style.display=""
		mostrarVistaAbmAdminLocales("lista")
		
	}
}
function limpiarcamposbuscaradminlocales(){
	document.getElementById('inptBuscarAbmAdminLocales1').value=""
	document.getElementById('inptBuscarAbmAdminLocales2').value=""
	document.getElementById("table_abm_adminlocales").innerHTML = ""
	document.getElementById("inptRegistroNroAdminLocales").value = ""
}
function minimizarabmadminlocales(){ 
	$("div[id=divAbmAdminLocales]").fadeOut(500);
	document.getElementById("divMinimizadoAdminLocales").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAdminLocales"));
}

function verCerrarVentanaAbmAdminLocales(d, l) {
	
	
	if (d == "1") {
		
		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOVENDEDORES","accion")==false){return;}	
			limpiarcamposAdminLocales()
		}
		mostrarVistaAbmAdminLocales("editor")
		$("div[id=divAbmAdminLocales2]").fadeIn(250)
		
	} else {
		mostrarVistaAbmAdminLocales("lista")
		$("div[id=divAbmAdminLocales1]").fadeIn(250)
	}
}
function verVentanaEditarAdminLocales() {
	if(controlacceso("EDITARLISTADOADMINLOCALES","accion")==false){return;}	
	if (idAbmAdminLocales == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmAdminLocales("1", "2")
}
var idAbmAdminLocales = ""
function obtenerdatosabmAdminLocales(datostr) {


	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});

	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptDescripcionAdminLocales').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptTelefonoAdminLocales').value = $(datostr).children('td[id="td_datos_4"]').html() || "";
	document.getElementById('inptDireccionAdminLocales').value = $(datostr).children('td[id="td_datos_5"]').html() || "";
	document.getElementById('inptCiudadAdminLocales').value = $(datostr).children('td[id="td_datos_6"]').html() || "";
	document.getElementById('inptEstadoAdminLocales').value = $(datostr).children('td[id="td_datos_3"]').html();
	idAbmAdminLocales = $(datostr).children('td[id="td_id"]').html();
document.getElementById('btnAbmAdminLocales').value = "Editar datos";
document.getElementById('btnEditarAdminLocales').style.backgroundColor="";
document.getElementById('btnLocalAdminLocales').style.backgroundColor="";
if (document.getElementById('btnEmpresaAdminLocales')) {
	document.getElementById('btnEmpresaAdminLocales').style.backgroundColor="";
}
cod_adminlocalesLocal=$(datostr).children('td[id="td_id"]').html();


}


function abmAdminLocalesLocales(d) {
	
	var idDV=d.id
	var accion=d.name
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("idAbmUsuario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "EditarDetalleAdminLocales")
	datos.append("idDV", idDV)	
	datos.append("accion", accion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
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
					
					if(accion=="SI"){
						d.name="NO"
					}else{
						d.name="SI"
					}
					
					buscarAdminLocalesSelec()
					
					}			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}



function verificarcamposAdminLocales() {

	var inptDescripcionAdminLocales = document.getElementById('inptDescripcionAdminLocales').value
	var inptTelefonoAdminLocales = document.getElementById('inptTelefonoAdminLocales').value
	var inptDireccionAdminLocales = document.getElementById('inptDireccionAdminLocales').value
	var inptCiudadAdminLocales = document.getElementById('inptCiudadAdminLocales').value
	
	var inptEstadoAdminLocales = document.getElementById('inptEstadoAdminLocales').value


	if (inptDescripcionAdminLocales == "") {
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return false;
	}


if (inptEstadoAdminLocales == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}

	var accion = "";
	if (idAbmAdminLocales != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADOADMINLOCALES","accion")==false){return;}	
	} else {
		if(controlacceso("INSERTARLISTADOADMINLOCALES","accion")==false){return;}	
		accion = "nuevo";
	}
	abmadminlocales(inptDescripcionAdminLocales, inptEstadoAdminLocales, idAbmAdminLocales, accion, inptTelefonoAdminLocales, inptDireccionAdminLocales, inptCiudadAdminLocales);
}
function abmadminlocales(descripcion, estado, idadminlocales, accion, telefono, direccion, ciudad) {

	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idadminlocales", idadminlocales)
	datos.append("estado", estado)
	datos.append("descripcion", descripcion)
	datos.append("telefono", telefono)
	datos.append("direccion", direccion)
	datos.append("ciudad", ciudad)
	var OpAjax = $.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
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
					limpiarcamposAdminLocales()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmAdminLocales = ""
					buscarabmAdminLocales()
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoAdminLocales(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarAdminLocales1').checked=true
		document.getElementById('inptSeleccEstadoBuscarAdminLocales2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarAdminLocales1').checked=false
		document.getElementById('inptSeleccEstadoBuscarAdminLocales2').checked=true
	}
}
function buscarabmAdminLocales() {
if(controlacceso("BUSCARLISTADOADMINLOCALES","accion")==false){return;}
	var listado = iniciarListadoAbmAdminLocales();
	var codigo = document.getElementById('inptBuscarAbmAdminLocales1').value
	var descripcion = document.getElementById('inptBuscarAbmAdminLocales2').value
	var estado = ""
	if(	document.getElementById('inptSeleccEstadoBuscarAdminLocales1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_adminlocales").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"descripcion": descripcion,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_adminlocales").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_adminlocales").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptRegistroNroAdminLocales").value = datos[3]
					
					document.getElementById("btnEditarAdminLocales").style.backgroundColor="#b7b7b7";
					document.getElementById("btnLocalAdminLocales").style.backgroundColor="#b7b7b7";
					if (document.getElementById("btnEmpresaAdminLocales")) {
						document.getElementById("btnEmpresaAdminLocales").style.backgroundColor="#b7b7b7";
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
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmAdminLocales);
} else {
	iniciarListadoAbmAdminLocales();
}



function buscarAdminLocalesSelec() {
	
	
	document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML = ""
	document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML = ""
	
	
	

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarselect"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
			document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML = ""
			document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			
			document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML = ""
			document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML =datos_buscados
					document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML =datos_buscados

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



function limpiarcamposAdminLocales() {
	document.getElementById('inptRegistroSeleccAdminLocales').value = "";
	document.getElementById('inptDescripcionAdminLocales').value = "";
	document.getElementById('inptTelefonoAdminLocales').value = "";
	document.getElementById('inptDireccionAdminLocales').value = "";
	document.getElementById('inptCiudadAdminLocales').value = "";

	document.getElementById('inptEstadoAdminLocales').value = "Activo";
	document.getElementById('btnAbmAdminLocales').value = "Guardar datos";
	document.getElementById('btnEditarAdminLocales').style.backgroundColor="#b7b7b7"
	document.getElementById('btnLocalAdminLocales').style.backgroundColor="#b7b7b7"
	if (document.getElementById('btnEmpresaAdminLocales')) {
		document.getElementById('btnEmpresaAdminLocales').style.backgroundColor="#b7b7b7"
	}
	idAbmAdminLocales = "";
}

function mostrarVistaAbmAdminLocales(vista) {
	var contenedor = document.getElementById("divAbmAdminLocales");
	var lista = document.getElementById("divAbmAdminLocales1");
	var editor = document.getElementById("divAbmAdminLocales2");
	var empresa = document.getElementById("divAbmInforEmpresa");

	if (contenedor) {
		contenedor.classList.remove("inform-empresa-activa");
		if (vista === "empresa") {
			contenedor.classList.add("inform-empresa-activa");
		}
	}

	if (lista) {
		lista.style.display = vista === "lista" ? "" : "none";
	}
	if (editor) {
		editor.style.display = vista === "editor" ? "" : "none";
	}
	if (empresa) {
		empresa.style.display = vista === "empresa" ? "" : "none";
	}
}

var logoColorInformEmpresa = "";
var logoImpresoInformEmpresa = "";
var rucOriginalInformEmpresa = "";
var rutaLogoColorInformEmpresa = "/GoodVentaElectroCasaMaric/iconos/logo.png";
var rutaLogoImpresoInformEmpresa = "/GoodVentaElectroCasaMaric/iconos/logo_impreso.png";

function setValueSiExiste(id, valor) {
	var elemento = document.getElementById(id);

	if (elemento) {
		elemento.value = valor;
	}
}

function verCerrarAbmInformEmpresa(mostrar) {
	var panel = document.getElementById("divAbmInforEmpresa");

	if (!panel) {
		return;
	}

	if (mostrar) {
		mostrarVistaAbmAdminLocales("empresa");
		logoColorInformEmpresa = "";
		logoImpresoInformEmpresa = "";
		rucOriginalInformEmpresa = "";
		limpiarInputsLogoInformEmpresa();
		cargarPreviewLogosInformEmpresa();
		setValueSiExiste("inptNombreInformEmpresa", "");
		setValueSiExiste("inptRucInformEmpresa", "");
		setValueSiExiste("inptTelefonoInformEmpresa", "");
		buscarDatosInformEmpresa();
		if (document.getElementById("btnEmpresaAdminLocales")) {
			document.getElementById("btnEmpresaAdminLocales").style.backgroundColor = "";
		}
	} else {
		mostrarVistaAbmAdminLocales("lista");
		$("div[id=divAbmAdminLocales1]").fadeIn(250);
	}
}

function limpiarInputsLogoInformEmpresa() {
	var inputColor = document.getElementById("inptLogoColorInformEmpresa");
	var inputImpreso = document.getElementById("inptLogoImpresoInformEmpresa");

	if (inputColor) {
		inputColor.value = "";
	}

	if (inputImpreso) {
		inputImpreso.value = "";
	}
}

function obtenerContenedorPreviewLogoInformEmpresa(imagen) {
	if (!imagen) {
		return null;
	}

	if (imagen.closest) {
		return imagen.closest(".inform-empresa-preview");
	}

	return imagen.parentNode;
}

function ocultarPreviewLogoInformEmpresa(imagen) {
	if (!imagen) {
		return;
	}

	var contenedor = obtenerContenedorPreviewLogoInformEmpresa(imagen);

	if (contenedor) {
		contenedor.classList.add("is-empty");
	}

	imagen.style.display = "none";
}

function actualizarPreviewLogoInformEmpresa(idImagen, origen) {
	var imagen = document.getElementById(idImagen);

	if (!imagen || origen === "") {
		return;
	}

	var contenedor = obtenerContenedorPreviewLogoInformEmpresa(imagen);

	if (contenedor) {
		contenedor.classList.remove("is-empty");
	}

	imagen.style.filter = "";
	imagen.style.display = "";
	imagen.src = origen;
}

function cargarPreviewLogosInformEmpresa() {
	var cache = new Date().getTime();
	actualizarPreviewLogoInformEmpresa("imgPreviewLogoColorInformEmpresa", rutaLogoColorInformEmpresa + "?x=" + cache);
	actualizarPreviewLogoInformEmpresa("imgPreviewLogoImpresoInformEmpresa", rutaLogoImpresoInformEmpresa + "?x=" + cache);
}

function obtenerRucBusquedaInformEmpresa(rucBuscado) {
	if (rucBuscado) {
		return rucBuscado;
	}

	if (rucOriginalInformEmpresa) {
		return rucOriginalInformEmpresa;
	}

	if (typeof ruc !== "undefined" && ruc) {
		return ruc;
	}

	return "";
}

function cargarDatosRecuperadosInformEmpresa(datos) {
	var nombreEmpresa = datos[2] || datos.nombre || "";
	var rucEmpresa = datos[3] || datos.ruc || "";
	var telefonoEmpresa = datos[4] || datos.telefono || "";
	var direccionEmpresaRecuperada = datos[5] || datos.direccion || "";
	var localEmpresaRecuperada = datos[6] || datos.local || "";
	var codLocalEmpresaRecuperada = datos[7] || datos.cod_local || "";
	var ciudadEmpresaRecuperada = datos[8] || datos.ciudad || "";

	setValueSiExiste("inptNombreInformEmpresa", nombreEmpresa);
	setValueSiExiste("inptRucInformEmpresa", rucEmpresa);
	setValueSiExiste("inptTelefonoInformEmpresa", telefonoEmpresa);
	rucOriginalInformEmpresa = rucEmpresa;

	if (typeof tituloRecibo !== "undefined") {
		tituloRecibo = nombreEmpresa;
	}
	if (typeof ruc !== "undefined") {
		ruc = rucEmpresa;
	}
	if (typeof telefono !== "undefined") {
		telefono = telefonoEmpresa;
	}
	if (typeof direccionEmpresa !== "undefined") {
		direccionEmpresa = direccionEmpresaRecuperada;
	}
	if (typeof localEmpresa !== "undefined") {
		localEmpresa = localEmpresaRecuperada;
	}
	if (typeof codLocalEmpresa !== "undefined") {
		codLocalEmpresa = codLocalEmpresaRecuperada;
	}
	if (typeof ciudadEmpresa !== "undefined") {
		ciudadEmpresa = ciudadEmpresaRecuperada;
	}
	if (typeof actualizarTextosEmpresaSistema === "function") {
		actualizarTextosEmpresaSistema();
	}

	cargarPreviewLogosInformEmpresa();
}

function buscarDatosInformEmpresa(rucBuscado) {
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarDatosEmpresa",
		"ruc": obtenerRucBusquedaInformEmpresa(rucBuscado)
	};

	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/empresa.php",
		type: "post",

		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status, textstatus, "buscarDatosInformEmpresa");
		},
		success: function (responseText) {
			try {
				var datos = $.parseJSON(responseText);
				var respuesta = respuestaJqueryAjax(datos["1"]);

				if (respuesta == true) {
					cargarDatosRecuperadosInformEmpresa(datos);
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ");
				var titulo = "Error: " + error + " \r\n Consola: " + responseText;
				GuardarArchivosLog(titulo);
			}
		}
	});
}

function leerLogoInformEmpresa(input, tipo) {
	var file = input && input.files && input.files.length > 0 ? input.files[0] : null;
	var esLogoImpreso = tipo == "impreso" || tipo == "bn";

	if (!file) {
		return false;
	}

	if (file.size > 5000000) {
		ver_vetana_informativa("LA IMAGEN NO PUEDE EXCEDER LOS 5Mb");
		input.value = "";
		return false;
	}

	var nombre = file.name || "";
	var extension = nombre.substring(nombre.lastIndexOf(".") + 1).toLowerCase();

	if (extension != "jpeg" && extension != "jpg" && extension != "png" && extension != "webp") {
		ver_vetana_informativa("LA IMAGEN SELECCIONADA DEBE SER JPG, PNG O WEBP");
		input.value = "";
		return false;
	}

	var reader = new FileReader();
	reader.onload = function (e) {
		generarLogoPngInformEmpresa(e.target.result, esLogoImpreso, function (dataUrl) {
			if (esLogoImpreso) {
				logoImpresoInformEmpresa = dataUrl;
				actualizarPreviewLogoInformEmpresa("imgPreviewLogoImpresoInformEmpresa", dataUrl);
				return;
			}

			logoColorInformEmpresa = dataUrl;
			actualizarPreviewLogoInformEmpresa("imgPreviewLogoColorInformEmpresa", dataUrl);

			var inputImpreso = document.getElementById("inptLogoImpresoInformEmpresa");
			var sinLogoImpresoSeleccionado = !inputImpreso || !inputImpreso.files || inputImpreso.files.length === 0;

			if (sinLogoImpresoSeleccionado) {
				generarLogoPngInformEmpresa(e.target.result, true, function (dataUrlImpreso) {
					logoImpresoInformEmpresa = dataUrlImpreso;
					actualizarPreviewLogoInformEmpresa("imgPreviewLogoImpresoInformEmpresa", dataUrlImpreso);
				});
			}
		});
	};

	reader.readAsDataURL(file);
}

function generarLogoPngInformEmpresa(origen, blancoNegro, callback) {
	var imagen = new Image();

	imagen.onload = function () {
		var maximo = 1600;
		var ancho = imagen.naturalWidth || imagen.width;
		var alto = imagen.naturalHeight || imagen.height;
		var escala = Math.min(1, maximo / Math.max(ancho, alto));
		var canvas = document.createElement("canvas");
		var contexto = canvas.getContext("2d");

		canvas.width = Math.max(1, Math.round(ancho * escala));
		canvas.height = Math.max(1, Math.round(alto * escala));
		contexto.clearRect(0, 0, canvas.width, canvas.height);
		contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height);

		if (blancoNegro) {
			var datosImagen = contexto.getImageData(0, 0, canvas.width, canvas.height);
			var datos = datosImagen.data;

			for (var i = 0; i < datos.length; i += 4) {
				var gris = Math.round((datos[i] * 0.299) + (datos[i + 1] * 0.587) + (datos[i + 2] * 0.114));
				datos[i] = gris;
				datos[i + 1] = gris;
				datos[i + 2] = gris;
			}

			contexto.putImageData(datosImagen, 0, 0);
		}

		callback(canvas.toDataURL("image/png"));
	};

	imagen.onerror = function () {
		ver_vetana_informativa("NO SE PUDO LEER LA IMAGEN SELECCIONADA");
	};

	imagen.src = origen;
}

function verificarcamposInformEmpresa() {
	var inptNombreEmpresa = document.getElementById('inptNombreInformEmpresa').value;
	var inptRucEmpresa = document.getElementById('inptRucInformEmpresa').value;
	var inptTelefonoEmpresa = document.getElementById('inptTelefonoInformEmpresa').value;

	if (inptNombreEmpresa === "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE LA EMPRESA", "#");
		return false;
	}
	if (inptRucEmpresa === "") {
		ver_vetana_informativa("FALTO INGRESAR EL RUC DE LA EMPRESA", "#");
		return false;
	}

	verCerrarEfectoCargando("1");
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid);
	datos.append("passu", passuser);
	datos.append("navegador", navegador);
	datos.append("funt", "actualizarDatosEmpresa");
	datos.append("nombre", inptNombreEmpresa);
	datos.append("ruc", inptRucEmpresa);
	datos.append("telefono", inptTelefonoEmpresa);
	datos.append("ruc_original", rucOriginalInformEmpresa);
	datos.append("logo_color", logoColorInformEmpresa);
	datos.append("logo_impreso", logoImpresoInformEmpresa);

	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,

		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("");
			manejadordeerroresjquery(jqXHR.status, textstatus, "actualizarDatosEmpresa");
			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("");
			try {
				var datos = $.parseJSON(responseText);
				var respuesta = datos["1"];

				if (respuesta == "IMG") {
					ver_vetana_informativa("NO SE PUDO GUARDAR EL LOGO. VERIFIQUE LA IMAGEN.");
					return false;
				}
				if (respuesta == "EX") {
					ver_vetana_informativa("EL RUC INGRESADO YA EXISTE.");
					return false;
				}
				if (respuesta == "RUCPK") {
					ver_vetana_informativa("NO SE PUDO DEJAR EL RUC COMO LLAVE PRIMARIA. REVISE RUC VACIOS O DUPLICADOS EN DATOS_EMPRESA.");
					return false;
				}

				respuesta = respuestaJqueryAjax(respuesta);

				if (respuesta == true) {
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...");
					tituloRecibo = inptNombreEmpresa;
					ruc = inptRucEmpresa;
					telefono = inptTelefonoEmpresa;
					rucOriginalInformEmpresa = inptRucEmpresa;
					logoColorInformEmpresa = "";
					logoImpresoInformEmpresa = "";
					limpiarInputsLogoInformEmpresa();
					cargarPreviewLogosInformEmpresa();
					if (typeof actualizarTextosEmpresaSistema === "function") {
						actualizarTextosEmpresaSistema();
					}
					buscarDatosInformEmpresa(inptRucEmpresa);
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ");
				var titulo = "Error: " + error + " \r\n Consola: " + responseText;
				GuardarArchivosLog(titulo);
			}
		}
	});
}

/* ADMIN LOCAL CON LOCALES */
function verCerrarAdminLocalesLocales(){
	
	if(idAbmAdminLocales==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN ITEM")
		return false;
	}
	
	
	if(document.getElementById("divAdminLocalLocales").style.display==""){
	 
	$("div[id=divAdminLocalLocales]").fadeOut(500);	
	}else{
				
	 document.getElementById("divAdminLocalLocales").style.display=""
      
	 buscarLocalAdminLocales();
	
		
	}
}

function renderizarLocalesAdminLocal(registros) {
	var contenedor = document.getElementById("table_abm_locales_admin_local");
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(registros || []).forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = "tableRegistroSearch";
		tabla.setAttribute("border", "0");
		tabla.setAttribute("cellspacing", "0");
		tabla.setAttribute("cellpadding", "0");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		var codigo = document.createElement("td");
		codigo.style.width = "5%";
		codigo.textContent = registro.codigo == null ? "" : registro.codigo;
		var local = document.createElement("td");
		local.id = "td_datos_1";
		local.style.width = "70%";
		local.textContent = registro.local || "";
		var accion = document.createElement("td");
		accion.style.width = "25%";
		var control = document.createElement("input");
		control.type = "checkbox";
		control.id = String(registro.codigo == null ? "" : registro.codigo);
		control.checked = !!registro.asignado;
		control.addEventListener("click", function () {
			if (this.checked) AbmVerificarRelacionAdminLocales(this);
			else EliminarRelacionAdminLocales(this);
		});
		accion.appendChild(control);
		fila.appendChild(codigo);
		fila.appendChild(local);
		fila.appendChild(accion);
		tabla.appendChild(fila);
		contenedor.appendChild(tabla);
	});
}

function buscarLocalAdminLocales() {


	document.getElementById("table_abm_locales_admin_local").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbmAdminLocales": idAbmAdminLocales,		
		"formato": "json",
		"funt": "buscarAdminLocalLocales"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_locales_admin_local").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_locales_admin_local").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) renderizarLocalesAdminLocal(datos_buscados);
					else document.getElementById("table_abm_locales_admin_local").innerHTML = datos_buscados;
					
					}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}

/* ADMIN LOCAL RELACION */
function  AbmVerificarRelacionAdminLocales(dt){
	
			var idlocal = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "checkearAdminLocalLocales")
			 datos.append("idAbmAdminLocales" , idAbmAdminLocales)
			 datos.append("idlocalFK" , idlocal)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarabmAdminLocales()
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
function  EliminarRelacionAdminLocales(dt){
	
			var idlocal = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "eliminarRelacionAdminLocales")
			 datos.append("idAbmAdminLocales" , idAbmAdminLocales)
			 datos.append("idlocalFK" , idlocal)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarabmAdminLocales()
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
