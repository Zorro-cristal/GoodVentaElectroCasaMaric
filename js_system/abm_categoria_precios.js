/*
ABM Categoria Precios
*/

var listadoAbmCategoriaPrecio = null;
var listadoDetallePrecioCategoria = null;
var listadoLocalesDetallePrecio = null;
var listadoCategoriasDetallePrecio = null;
var listadoCreditosDetallePrecio = null;

function obtenerCabeceraRelacionDetallePrecio(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo);
	var tabla = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tabla && tabla.tagName === "TABLE" ? tabla.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = idCabecera;
	return cabecera;
}

function iniciarListadoLocalesDetallePrecio() {
	if (listadoLocalesDetallePrecio || !window.AbmListadoCore) { return listadoLocalesDetallePrecio; }
	if (!obtenerCabeceraRelacionDetallePrecio("table_abm_LocalesDetallePrecio", "cabeceraLocalesDetallePrecio")) { return null; }
	listadoLocalesDetallePrecio = window.AbmListadoCore.crear({
		nombre: "locales_detalle_precio",
		idCabecera: "cabeceraLocalesDetallePrecio",
		idCuerpo: "table_abm_LocalesDetallePrecio",
		ordenInicial: "local",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" },
			{ campo: "local", titulo: "LOCAL", ancho: "70%" },
			{ campo: "asignado", titulo: "ACCION", ancho: "25%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento("table", { className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch" });
			tabla.setAttribute("border", "1");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "5");
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
			columnas.forEach(function (columna) {
				var celda = utilidades.crearElemento("td", { dataset: { columna: columna.campo } });
				celda.style.width = columna.ancho;
				if (columna.campo === "codigo") {
					celda.id = "td_id";
					celda.textContent = registro.codigo == null ? "" : registro.codigo;
				} else if (columna.campo === "local") {
					celda.id = "td_datos_1";
					celda.className = "tdRegistroSearch";
					celda.textContent = registro.local || "";
				} else {
					celda.id = "td_datos_2";
					var check = document.createElement("input");
					check.type = "checkbox";
					check.id = String(registro.codigo_relacion == null ? "" : registro.codigo_relacion);
					check.name = registro.asignado ? "NO" : "SI";
					check.checked = !!registro.asignado;
					check.addEventListener("click", function () { abmLocalesDetallePrecio(this); });
					celda.appendChild(check);
				}
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoLocalesDetallePrecio.iniciar();
	return listadoLocalesDetallePrecio;
}

function iniciarListadoCategoriasDetallePrecio() {
	if (listadoCategoriasDetallePrecio || !window.AbmListadoCore) { return listadoCategoriasDetallePrecio; }
	if (!obtenerCabeceraRelacionDetallePrecio("table_abm_CategoriasDetallePrecio", "cabeceraCategoriasDetallePrecio")) { return null; }
	listadoCategoriasDetallePrecio = window.AbmListadoCore.crear({
		nombre: "categorias_detalle_precio",
		idCabecera: "cabeceraCategoriasDetallePrecio",
		idCuerpo: "table_abm_CategoriasDetallePrecio",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" },
			{ campo: "descripcion", titulo: "CATEGORIAS", ancho: "70%" },
			{ campo: "asignado", titulo: "ACCION", ancho: "25%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento("table", { className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch" });
			tabla.setAttribute("border", "1");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "5");
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
			columnas.forEach(function (columna) {
				var celda = utilidades.crearElemento("td", { dataset: { columna: columna.campo } });
				celda.style.width = columna.ancho;
				if (columna.campo === "codigo") {
					celda.id = "td_id";
					celda.textContent = registro.codigo == null ? "" : registro.codigo;
				} else if (columna.campo === "descripcion") {
					celda.id = "td_datos_1";
					celda.className = "tdRegistroSearch";
					celda.textContent = (registro.descripcion || "") + " -" + (registro.contador == null ? "0" : registro.contador) + "-";
				} else {
					celda.id = "td_datos_2";
					var check = document.createElement("input");
					check.type = "checkbox";
					check.id = String(registro.codigo_relacion == null ? "" : registro.codigo_relacion);
					check.name = registro.asignado ? "NO" : "SI";
					check.checked = !!registro.asignado;
					check.addEventListener("click", function () { abmCategoriasDetallePrecio(this); });
					celda.appendChild(check);
				}
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoCategoriasDetallePrecio.iniciar();
	return listadoCategoriasDetallePrecio;
}

function iniciarListadoCreditosDetallePrecio() {
	if (listadoCreditosDetallePrecio || !window.AbmListadoCore) { return listadoCreditosDetallePrecio; }
	if (!obtenerCabeceraRelacionDetallePrecio("table_vista_DetalleListaPrecio", "cabeceraCreditosDetallePrecio")) { return null; }
	listadoCreditosDetallePrecio = window.AbmListadoCore.crear({
		nombre: "creditos_detalle_precio",
		idCabecera: "cabeceraCreditosDetallePrecio",
		idCuerpo: "table_vista_DetalleListaPrecio",
		ordenInicial: "cuota",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIP.", ancho: "40%" },
			{ campo: "porcentaje", titulo: "GANANCIA", ancho: "30%" },
			{ campo: "descuento", titulo: "CON DESCUENTO", ancho: "30%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmListaDetalleCategoriaPrecio",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_3", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_1", columna: "porcentaje", valor: function (registro) { return registro.porcentaje_formateado; } },
				{ id: "td_datos_2", columna: "descuento", valor: function (registro) { return registro.descuento_formateado; } },
				{ id: "td_datos_4", campo: "porcentaje", tecnica: true },
				{ id: "td_datos_5", campo: "descuento", tecnica: true },
				{ id: "td_datos_6", campo: "cuota", tecnica: true }
			]
		}
	});
	listadoCreditosDetallePrecio.iniciar();
	return listadoCreditosDetallePrecio;
}

function iniciarListadoDetallePrecioCategoria() {
	if (listadoDetallePrecioCategoria || !window.AbmListadoCore) { return listadoDetallePrecioCategoria; }
	var cuerpo = document.getElementById("divBuscadorPrecioCatalogoPrecioNuevo");
	if (!cuerpo) { return null; }
	var cabeceraTabla = cuerpo.previousElementSibling;
	while (cabeceraTabla && (!cabeceraTabla.classList || !cabeceraTabla.classList.contains("tableCabeceraRegistro"))) {
		cabeceraTabla = cabeceraTabla.previousElementSibling;
	}
	var cabecera = cabeceraTabla && cabeceraTabla.tagName === "TABLE"
		? cabeceraTabla.querySelector("tr")
		: cabeceraTabla;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraDetallePrecioCategoria";
	listadoDetallePrecioCategoria = window.AbmListadoCore.crear({
		nombre: "detalle_precio_categoria",
		idCabecera: "cabeceraDetallePrecioCategoria",
		idCuerpo: "divBuscadorPrecioCatalogoPrecioNuevo",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "descripcion", titulo: "CANTIDAD CUOTA", ancho: "50%" },
			{ campo: "precio_cuota", titulo: "CUOTA", ancho: "25%" },
			{ campo: "descuento", titulo: "CON DESCUENTO", ancho: "25%" }
		],
		fila: {
			celdas: [
				{ id: "td_datos_2", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_8", columna: "precio_cuota", valor: function (registro) { return registro.precio_cuota_formateado; } },
				{ id: "td_datos_7", campo: "precio_formateado", tecnica: true },
				{ id: "td_datos_7", columna: "descuento", valor: function (registro) { return registro.descuento_formateado; } }
			]
		}
	});
	listadoDetallePrecioCategoria.iniciar();
	return listadoDetallePrecioCategoria;
}

function iniciarListadoAbmCategoriaPrecio() {
	if (listadoAbmCategoriaPrecio || !window.AbmListadoCore) { return listadoAbmCategoriaPrecio; }
	var cuerpo = document.getElementById("table_abm_CategoriaPrecio");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmCategoriaPrecio";
	listadoAbmCategoriaPrecio = window.AbmListadoCore.crear({
		nombre: "categoria_precio",
		idCabecera: "cabeceraAbmCategoriaPrecio",
		idCuerpo: "table_abm_CategoriaPrecio",
		ordenInicial: "codigo",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "40%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "15%" },
			{ campo: "precio_desde", titulo: "DESDE", ancho: "10%" },
			{ campo: "precio_hasta", titulo: "HASTA", ancho: "10%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "10%" },
			{ campo: "fecha_hasta", titulo: "FECHA HASTA", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmCategoriaPrecio",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo", render: function (valor, registro, celda) {
					celda.style.backgroundColor = "#efeded";
					celda.style.color = "red";
					return valor;
				} },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_2", campo: "fecha", columna: "fecha" },
				{ id: "td_datos_3", columna: "precio_desde", valor: function (registro) { return registro.precio_desde_formateado; } },
				{ id: "td_datos_4", columna: "precio_hasta", valor: function (registro) { return registro.precio_hasta_formateado; } },
				{ id: "td_datos_5", campo: "tipo", columna: "tipo" },
				{ id: "td_datos_7", campo: "fecha_hasta", columna: "fecha_hasta" },
				{ id: "td_datos_6", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmCategoriaPrecio.iniciar();
	return listadoAbmCategoriaPrecio;
}

function verCerrarAbmCategoriaPrecio(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCategoriaPrecio").style.display==""){
		document.getElementById("divMinimizadoListadoCategoriaPrecio").style.display="none"	
		limpiarcamposbuscarCategoriaPrecio()
		limpiarcamposCategoriaPrecio()

	$("div[id=divAbmCategoriaPrecio]").fadeOut(500);	
	}else{		
	if(controlacceso("VERLISTADOCATEGORIAPRECIOS","accion")==false){return;}
	mostrarSoloUno("divAbmCategoriaPrecio")	
		document.getElementById("divAbmCategoriaPrecio").style.display=""

	}
}

function limpiarcamposbuscarCategoriaPrecio(){
	document.getElementById('inptBuscarCategoriaPrecio1').value="" 
	
	document.getElementById("table_abm_CategoriaPrecio").innerHTML = ""
	document.getElementById("inptRegistroNroCategoriaPrecio").value ="";
}
function minimizarabmCategoriaPrecio(){
//  
	$("div[id=divAbmCategoriaPrecio]").fadeOut(500);
	document.getElementById("divMinimizadoListadoCategoriaPrecio").style.display=""	
	copiarBotonEnContenedor(document.getElementById("divMenuAbmCategoriaPrecio"));
}
function verCerrarVentanaAbmCategoriaPrecio(d, l) {
	if (d == "1") {
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADOCategoriaPrecioES","accion")==false){return;}
			limpiarcamposCategoriaPrecio()
		}
		$("div[id=divAbmCategoriaPrecio2]").fadeIn(250)
		document.getElementById('divAbmCategoriaPrecio1').style.display = "none"
	} else {
		$("div[id=divAbmCategoriaPrecio1]").fadeIn(250)
		document.getElementById('divAbmCategoriaPrecio2').style.display = "none"
	}
}
function verVentanaEditarCategoriaPrecio() {
	// if(controlacceso("EDITARLISTADOCategoriaPrecioES","accion")==false){return;}
	if (idAbmCategoriaPrecio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmCategoriaPrecio("1", "2")
}



var idAbmCategoriaPrecio = ""
function obtenerdatosabmCategoriaPrecio(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptDescripcionCategoriaPrecio').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccCategoriaPrecio').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptTipoCategoriaPrecio').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptPrecioDesdeCategoriaPrecio').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptPrecioHastaCategoriaPrecio').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptEstadoCategoriaPrecio').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptFechaHastaCategoriaPrecio').value = $(datostr).children('td[id="td_datos_7"]').html();
	
	var tipo=$(datostr).children('td[id="td_datos_5"]').html();
	if(tipo=="PORCENTAJE"){
		document.getElementById('pTituloGanancia').innerHTML ="Ganancia en Porcentaje"
	}else{
		document.getElementById('pTituloGanancia').innerHTML ="Ganancia en Numero"
	}
	
	idAbmCategoriaPrecio = $(datostr).children('td[id="td_id"]').html();
	 
	
	document.getElementById('btnAbmCategoriaPrecio').value = "Editar Datos"; 
	document.getElementById('btnEditarCategoriaPrecioes').style.backgroundColor="#673ab7";
	document.getElementById('btnLocalesDetallePrecio').style.backgroundColor="#4caf50"; 
	document.getElementById('btnGenerarDetallePrecio').style.backgroundColor="#38759f"; 
	document.getElementById('btnGenerarDescuentoPrecio').style.backgroundColor="#38759f"; 
}


function verificarcamposCategoriaPrecio() {
	var inptDescripcionCategoriaPrecio = document.getElementById('inptDescripcionCategoriaPrecio').value
	var inptTipoCategoriaPrecio = document.getElementById('inptTipoCategoriaPrecio').value
	var inptPrecioDesdeCategoriaPrecio = document.getElementById('inptPrecioDesdeCategoriaPrecio').value
	var inptPrecioHastaCategoriaPrecio = document.getElementById('inptPrecioHastaCategoriaPrecio').value 
	var inptEstadoCategoriaPrecio = document.getElementById('inptEstadoCategoriaPrecio').value 
	var inptFechaHastaCategoriaPrecio = document.getElementById('inptFechaHastaCategoriaPrecio').value 
	 
	
	if (inptDescripcionCategoriaPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return false;
	}
	if (inptFechaHastaCategoriaPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA")
		return false;
	}
	if (inptTipoCategoriaPrecio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL TIPO")
		return false;
	}
	
	if (inptPrecioDesdeCategoriaPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL PRECIO MINIMO")
		return false;
	}
	
	if (inptPrecioHastaCategoriaPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL PRECIO MAXIMO")
		return false;
	}
	
	if (inptEstadoCategoriaPrecio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}
	
	var accion = "";
	if (idAbmCategoriaPrecio != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADOCategoriaPrecioES","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADOCategoriaPrecioES","accion")==false){return;}
	}
	
	abmCategoriaPrecio(inptFechaHastaCategoriaPrecio,inptDescripcionCategoriaPrecio,inptTipoCategoriaPrecio, inptPrecioDesdeCategoriaPrecio, inptPrecioHastaCategoriaPrecio, inptEstadoCategoriaPrecio, idAbmCategoriaPrecio, accion);
}
 
function abmCategoriaPrecio(fecha,descripcion,tipo, preciodesde, preciohasta, estado, idAbmCategoriaPrecio, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("descripcion", descripcion)
	datos.append("tipo", tipo)
	datos.append("preciodesde", preciodesde)
	datos.append("preciohasta", preciohasta) 
	datos.append("estado", estado) 
	datos.append("idAbmCategoriaPrecio", idAbmCategoriaPrecio)
	datos.append("fecha", fecha)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
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
					limpiarcamposCategoriaPrecio()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmCategoriaPrecio = ""
					buscarabmCategoriaPrecio()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function checkestadoCategoriaPrecio(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarCategoriaPrecio1').checked=true
		document.getElementById('inptSeleccEstadoBuscarCategoriaPrecio2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarCategoriaPrecio1').checked=false
		document.getElementById('inptSeleccEstadoBuscarCategoriaPrecio2').checked=true
	}
}


function buscarabmCategoriaPrecio() {
// if(controlacceso("BUSCARLISTADOCategoriaPrecioES","accion")==false){return;}
	var listado = iniciarListadoAbmCategoriaPrecio();
	var descripcion = document.getElementById('inptBuscarCategoriaPrecio1').value
	 
	var estado =""
	if(document.getElementById('inptSeleccEstadoBuscarCategoriaPrecio1').checked==true){
		estado ="Activo"
	}else{
		estado ="Inactivo"
	}
	document.getElementById("table_abm_CategoriaPrecio").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"descripcion": descripcion, 
		"estado": estado, 
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CategoriaPrecio").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CategoriaPrecio").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
				var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					document.getElementById("inptRegistroNroCategoriaPrecio").value = datos[3];
					
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmCategoriaPrecio);
} else {
	iniciarListadoAbmCategoriaPrecio();
}


function limpiarcamposCategoriaPrecio() {
	document.getElementById('inptDescripcionCategoriaPrecio').value=""
	document.getElementById('inptTipoCategoriaPrecio').value=""
	document.getElementById('inptPrecioDesdeCategoriaPrecio').value=""
	document.getElementById('inptPrecioHastaCategoriaPrecio').value="" 
	document.getElementById('inptFechaHastaCategoriaPrecio').value="" 
	document.getElementById('btnAbmCategoriaPrecio').value = "Guardar Datos";
	document.getElementById('inptEstadoCategoriaPrecio').value = "Activo";
	document.getElementById('btnEditarCategoriaPrecioes').style.backgroundColor = "#b7b7b7";
	document.getElementById('btnLocalesDetallePrecio').style.backgroundColor = "#b7b7b7"; 
	document.getElementById('btnGenerarDetallePrecio').style.backgroundColor = "#b7b7b7"; 
	document.getElementById('btnGenerarDescuentoPrecio').style.backgroundColor = "#b7b7b7"; 
 
	idAbmCategoriaPrecio = "";

}
 

function verCerrarLocalesDetallePrecio(){
	
	if(idAbmCategoriaPrecio==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;		
	}
	
	
	if(document.getElementById("divLocalesDetallePrecio").style.display==""){
	 
	$("div[id=divLocalesDetallePrecio]").fadeOut(500);	
		idAbmCategoriaPrecio=""
		}else{		
				
	 document.getElementById("divLocalesDetallePrecio").style.display=""
      
	buscarLocalesDetallePrecio();
	buscarCategoriasDetallePrecio();
	buscarListaDetallePrecioDetallePrecio()
	
	buscarCheckCategoriasDetallePrecio()
		
	}
} 

function buscarLocalesDetallePrecio() {

	var listado = iniciarListadoLocalesDetallePrecio();
	document.getElementById("table_abm_LocalesDetallePrecio").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbmCategoriaPrecio": idAbmCategoriaPrecio,		
		"formato": "json",
		"funt": "buscarLocalesDetallePrecio"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_LocalesDetallePrecio").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_LocalesDetallePrecio").innerHTML = ''
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
				
			}
		}
	});
}


function abmLocalesDetallePrecio(d) {
	
	var idDV=d.id
	var accion=d.name
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("idAbmUsuario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "EditarLocalesDetallePrecio")
	datos.append("idDV", idDV)	
	datos.append("accion", accion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
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
					d.name = d.checked ? "NO" : "SI";
				}			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}


function descripcionCuotaDetalleListaPrecio(){
	var cuotaCreditoListadoPrecio=document.getElementById('inptNroCuotaListaPrecio').value
	
	if(cuotaCreditoListadoPrecio==1){
		document.getElementById('inptDescripcionListaPrecio').value= "CONTADO" 
	}else{
		document.getElementById('inptDescripcionListaPrecio').value= "CUOTA "+cuotaCreditoListadoPrecio
	} 
	
}


function verificarcamposDescripcionListaPrecio() {
	var inptNroCuotaListaPrecio = document.getElementById('inptNroCuotaListaPrecio').value
	var inptGananciaListaPrecio = document.getElementById('inptGananciaListaPrecio').value
	var inptDescripcionListaPrecio = document.getElementById('inptDescripcionListaPrecio').value
	var inptPrecioConDescuentoListaPrecio = document.getElementById('inptPrecioConDescuentoListaPrecio').value
	  
	if (inptNroCuotaListaPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NUMERO DE CUOTAS")
		return false;
	}
	if (inptGananciaListaPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR LA GANANCIA")
		return false;
	}
	if (inptPrecioConDescuentoListaPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR LA GANANCIA")
		return false;
	}
	 
	var accion = "";
	if (idAbmListaPrecioCategoriaPrecio != "") {
		accion = "editarPrecio";
		// if(controlacceso("EDITARLISTADOCategoriaPrecioES","accion")==false){return;}
	} else {
		accion = "nuevoPrecio";
		// if(controlacceso("INSERTARLISTADOCategoriaPrecioES","accion")==false){return;}
	}
	
	abmDescripcionPrecioCategoriaPrecio(inptPrecioConDescuentoListaPrecio,inptNroCuotaListaPrecio,inptGananciaListaPrecio,inptDescripcionListaPrecio,idAbmListaPrecioCategoriaPrecio, accion);
}
 var idAbmListaPrecioCategoriaPrecio="";
function abmDescripcionPrecioCategoriaPrecio(precioDescuento,cuota,ganancia, descripcion,  idAbmListaPrecioCategoriaPrecio, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cuota", cuota)
	datos.append("ganancia", ganancia)
	datos.append("descripcion", descripcion) 
	datos.append("precioDescuento", precioDescuento) 
	datos.append("idAbm", idAbmListaPrecioCategoriaPrecio)
	datos.append("idAbmCategoriaPrecio", idAbmCategoriaPrecio)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
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
					limpiarcamposListaDetallePrecioCategoriaPrecio()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmListaPrecioCategoriaPrecio = ""
					buscarListaDetallePrecioDetallePrecio()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function limpiarcamposListaDetallePrecioCategoriaPrecio() {
	document.getElementById('inptNroCuotaListaPrecio').value=""
	document.getElementById('inptGananciaListaPrecio').value=""
	document.getElementById('inptDescripcionListaPrecio').value="" 
	document.getElementById('inptPrecioConDescuentoListaPrecio').value="" 
	document.getElementById('btnAddPreciosListaPrecio1').value = "Guardar Datos";  
	document.getElementById('btnAddPreciosListaPrecio2').style.display = "none";
	document.getElementById('btnAddPreciosListaPrecio3').style.display = "none"; 
 
	idAbmListaPrecioCategoriaPrecio = "";

}

function obtenerdatosabmListaDetalleCategoriaPrecio(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	idAbmListaPrecioCategoriaPrecio = $(datostr).children('td[id="td_id"]').html();
	 
	document.getElementById('inptNroCuotaListaPrecio').value=$(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptGananciaListaPrecio').value=$(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptDescripcionListaPrecio').value=$(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptPrecioConDescuentoListaPrecio').value=$(datostr).children('td[id="td_datos_5"]').html();
	
	document.getElementById('btnAddPreciosListaPrecio1').value = "Editar Datos";  
	document.getElementById('btnAddPreciosListaPrecio2').style.display = "";
	document.getElementById('btnAddPreciosListaPrecio3').style.display = ""; 
}

function EliminarRegistroDescripcionListaPrecio() {
	 
	var  accion = "EliminarPrecio";	
	
	abmDescripcionPrecioCategoriaPrecio("0","0","0","0",idAbmListaPrecioCategoriaPrecio, accion);
}



function buscarListaDetallePrecioDetallePrecio() {

	var listado = iniciarListadoCreditosDetallePrecio();
	document.getElementById("table_vista_DetalleListaPrecio").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbmCategoriaPrecio": idAbmCategoriaPrecio,		
		"formato": "json",
		"funt": "buscarListaPrecioDetallePrecio"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_DetalleListaPrecio").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_DetalleListaPrecio").innerHTML = ''
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
				
			}
		}
	});
}




function buscarCategoriasDetallePrecio() {
	
	var listado = iniciarListadoCategoriasDetallePrecio();
	var buscar = document.getElementById('inptDescripcionCategoriaListaPrecio').value

	document.getElementById("table_abm_CategoriasDetallePrecio").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbmCategoriaPrecio": idAbmCategoriaPrecio,		
		"buscar": buscar,		
		"formato": "json",
		"funt": "buscarCategoriasDetallePrecio"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CategoriasDetallePrecio").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CategoriasDetallePrecio").innerHTML = ''
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
				
			}
		}
	});
}



function abmCategoriasDetallePrecio(d) {
	
	var idDV=d.id
	var accion=d.name
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("idAbmUsuario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "EditarCategoriasDetallePrecio")
	datos.append("idDV", idDV)	
	datos.append("accion", accion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
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
					d.name = d.checked ? "NO" : "SI";
					buscarCheckCategoriasDetallePrecio()					
				}			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}



function buscarCheckCategoriasDetallePrecio() {
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbmCategoriaPrecio": idAbmCategoriaPrecio,		
		"funt": "buscarCheckCategoriasDetallePrecio"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
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
					
					if(datos_buscados=="0"){
						document.getElementById("inptbuscarCheckCategoriasDetallePrecio").checked = true
					}else{
						document.getElementById("inptbuscarCheckCategoriasDetallePrecio").checked = false
					}
										
					}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}


function abmCheckCategoriasDetallePrecio() {
	
	if(document.getElementById('inptbuscarCheckCategoriasDetallePrecio').checked==false){
		return false;
	} 
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "abmCheckCategoriasDetallePrecio") 
	datos.append("idAbmCategoriaPrecio", idAbmCategoriaPrecio)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
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
				 
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE")
					 buscarCategoriasDetallePrecio()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

 
function buscardetalles_lista_precio(cod_producto) {
	var cuerpo = document.getElementById("divBuscadorPrecioCatalogoPrecioNuevo");
	var listado = iniciarListadoDetallePrecioCategoria();
	if (!cuerpo) { return; }
	if (listado) { listado.establecerRegistros([]); }
	cuerpo.innerHTML = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_producto": cod_producto,
		"cod_localFK": cod_localFKUSer,
		"formato": listado ? "json" : "",
		"funt": "buscarListaDetallePrecioProductos"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmGenerarPrecio.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			cuerpo.innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			cuerpo.innerHTML = ''
			try {
				var datosRespuesta = $.parseJSON(Respuesta);
				Respuesta = datosRespuesta["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado && Array.isArray(datosRespuesta[2])) {
						listado.establecerRegistros(datosRespuesta[2]);
					} else {
						cuerpo.innerHTML = typeof datosRespuesta[2] === "string" ? datosRespuesta[2] : "";
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

 

function BuscarActualizarPrecioProductoCategoriaDesdeDetallePrecioLista() {
	
	if(idAbmCategoriaPrecio==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
		
	}
	
	var desde= document.getElementById('inptPrecioDesdeCategoriaPrecio').value;
	var hasta= document.getElementById('inptPrecioHastaCategoriaPrecio').value;
	var tipo= document.getElementById('inptTipoCategoriaPrecio').value;
	
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbmCategoriaPrecio": idAbmCategoriaPrecio ,
		"desde": desde ,
		"hasta": hasta ,
		"tipo": tipo ,
		"funt": "ActualizarPrecioProductoDetalleCategoria"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmGenerarPrecio.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			verCerrarEfectoCargando("")
		},
		success: function (responseText) {
			verCerrarEfectoCargando("")
			var Respuesta = responseText;
			console.log(Respuesta)
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					ver_vetana_informativa("PRECIOS ACTUALIZADOS CON EXITO")
				}
			} catch (error) {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});
}

//////////////////////// Cancelacion

function limpiarContenedorListaCategoriaPrecios(idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return null;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	return contenedor;
}

function crearTablaFilaCategoriaPrecios(claseFila) {
	var tabla = document.createElement("table");
	tabla.className = claseFila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
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

function agregarCeldaCategoriaPrecios(fila, valor, ancho, id, ocultar) {
	var celda = document.createElement("td");
	if (id) celda.id = id;
	if (ancho) celda.style.width = ancho;
	if (ocultar) celda.style.display = "none";
	celda.textContent = valor === null || typeof valor === "undefined" ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderSolicitarAnulacion(filas) {
	var contenedor = limpiarContenedorListaCategoriaPrecios("table_vista_SolicitarAnulacion");
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var estructura = crearTablaFilaCategoriaPrecios(registro.clase_fila);
		var fila = estructura.fila;
		fila.setAttribute("data-name", registro.cod_venta == null ? "" : String(registro.cod_venta));
		fila.onclick = function () { verCerrarDetalleSolicitudAnulacion(fila); };
		agregarCeldaCategoriaPrecios(fila, registro.factura, "12%", "td_datos_35");
		agregarCeldaCategoriaPrecios(fila, registro.fecha_venta, "8%", "td_datos_1");
		agregarCeldaCategoriaPrecios(fila, registro.numero_factura, null, "td_datos_13", true);
		agregarCeldaCategoriaPrecios(fila, registro.tipo_venta, "8%", "td_datos_12");
		agregarCeldaCategoriaPrecios(fila, registro.cliente, "22%", "td_datos_2");
		agregarCeldaCategoriaPrecios(fila, registro.documento, "8%", "td_datos_38");
		agregarCeldaCategoriaPrecios(fila, registro.total_venta_formateado, "8%", "td_datos_39");
		agregarCeldaCategoriaPrecios(fila, registro.descuento_formateado, "8%");
		agregarCeldaCategoriaPrecios(fila, registro.subtotal_formateado, "8%");
		agregarCeldaCategoriaPrecios(fila, registro.pagado_formateado, "8%");
		var celdaAccion = agregarCeldaCategoriaPrecios(fila, "", "10%");
		var accion = document.createElement("input");
		accion.type = "button";
		accion.value = "Solicitar Anulación";
		accion.className = "btn4";
		accion.id = registro.cod_venta == null ? "" : String(registro.cod_venta);
		accion.style.backgroundColor = "#f44336";
		accion.style.width = "100%";
		celdaAccion.appendChild(accion);
		agregarCeldaCategoriaPrecios(fila, registro.local, null, "td_datos_36", true);
		agregarCeldaCategoriaPrecios(fila, registro.usuario, null, "td_datos_37", true);
		fragmento.appendChild(estructura.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderSolicitudesAnulacionPendientes(filas) {
	var contenedor = limpiarContenedorListaCategoriaPrecios("divSolicitudAnulacionVenta");
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var bloque = document.createElement("div");
		bloque.id = "divSolicitudAnulacionVenta_" + (registro.id_solicitud == null ? "" : String(registro.id_solicitud));
		var tabla = document.createElement("table");
		tabla.style.width = "100%";
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.onclick = function () { obtenerdatosSolicitudAnulacionVenta(fila); };
		agregarCeldaCategoriaPrecios(fila, registro.cliente, "50%", "td_datos_1");
		agregarCeldaCategoriaPrecios(fila, registro.usuario_venta, "25%", "td_datos_2");
		agregarCeldaCategoriaPrecios(fila, registro.tipo, "20%", "td_datos_2");
		agregarCeldaCategoriaPrecios(fila, registro.factura, null, "td_datos_3", true);
		agregarCeldaCategoriaPrecios(fila, registro.total_venta_formateado, null, "td_datos_4", true);
		agregarCeldaCategoriaPrecios(fila, registro.fecha_venta, null, "td_datos_5", true);
		agregarCeldaCategoriaPrecios(fila, registro.cod_venta, null, "td_datos_6", true);
		agregarCeldaCategoriaPrecios(fila, registro.local, null, "td_datos_7", true);
		agregarCeldaCategoriaPrecios(fila, registro.documento, null, "td_datos_8", true);
		agregarCeldaCategoriaPrecios(fila, registro.id_solicitud, null, "td_datos_9", true);
		agregarCeldaCategoriaPrecios(fila, registro.usuario_solicitud, null, "td_datos_10", true);
		agregarCeldaCategoriaPrecios(fila, registro.motivo, null, "td_datos_11", true);
		agregarCeldaCategoriaPrecios(fila, registro.tipo, null, "td_datos_12", true);
		var celdaVer = agregarCeldaCategoriaPrecios(fila, "", "5%");
		var ver = document.createElement("span");
		ver.className = "status completed";
		ver.textContent = "VER";
		celdaVer.appendChild(ver);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		bloque.appendChild(tabla);
		fragmento.appendChild(bloque);
	});
	contenedor.appendChild(fragmento);
}

function renderInformeSolicitudAnulacion(filas, idContenedor) {
	var contenedor = limpiarContenedorListaCategoriaPrecios(idContenedor);
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var estructura = crearTablaFilaCategoriaPrecios(registro.clase_fila);
		var fila = estructura.fila;
		if (registro.estado_confirmado === "CONFIRMADO") {
			fila.style.backgroundColor = "green";
			fila.style.color = "white";
		}
		fila.onclick = function () { obtenerdatosinformeventasanuladas(fila); };
		agregarCeldaCategoriaPrecios(fila, registro.documento, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.cliente, "15%");
		agregarCeldaCategoriaPrecios(fila, registro.factura, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.fecha_venta, "10%");
		agregarCeldaCategoriaPrecios(fila, registro.total_venta_formateado, "10%");
		var celdaObs = agregarCeldaCategoriaPrecios(fila, "", "5%");
		if (registro.motivo != null && String(registro.motivo) !== "") {
			var botonObs = document.createElement("input");
			botonObs.type = "button";
			botonObs.value = "OBS";
			botonObs.className = "btn4";
			botonObs.style.width = "50px";
			botonObs.style.backgroundColor = "#ff5733";
			botonObs.onclick = function () { verObservacionIngresoEgresoCobrador(String(registro.motivo), registro.cod_venta || ""); };
			celdaObs.appendChild(botonObs);
		}
		agregarCeldaCategoriaPrecios(fila, registro.tipo, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.estado, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.fecha_solicitud, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.usuario_solicitud, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.usuario_acepta, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.vendedor, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.usuario_confirma, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.estado_confirmado, "5%", "td_datos_1");
		agregarCeldaCategoriaPrecios(fila, registro.id_solicitud, null, "td_id", true);
		fragmento.appendChild(estructura.tabla);
	});
	contenedor.appendChild(fragmento);
}

function agregarContenedorMasInformeSolicitudAnulacion(idPadre) {
	var padre = document.getElementById(idPadre);
	if (!padre) return null;
	var siguiente = document.createElement("div");
	siguiente.id = "table_mas_informe_SolicitudAnulacion";
	padre.appendChild(siguiente);
	return siguiente;
}

function renderClientesTrabajados(filas) {
	var contenedor = limpiarContenedorListaCategoriaPrecios("table_vista_ClientesTrabajados");
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var estructura = crearTablaFilaCategoriaPrecios(registro.clase_fila);
		var fila = estructura.fila;
		agregarCeldaCategoriaPrecios(fila, registro.factura, "10%");
		agregarCeldaCategoriaPrecios(fila, registro.fecha_venta, "10%");
		agregarCeldaCategoriaPrecios(fila, registro.tipo_venta, "5%");
		var celdaCliente = agregarCeldaCategoriaPrecios(fila, "", "20%");
		if (registro.tipo_estado_cliente) {
			var estadoCliente = document.createElement("p");
			estadoCliente.style.color = "#d10000";
			estadoCliente.style.margin = "0";
			estadoCliente.textContent = String(registro.tipo_estado_cliente);
			celdaCliente.appendChild(estadoCliente);
		}
		celdaCliente.appendChild(document.createTextNode(registro.cliente == null ? "" : String(registro.cliente)));
		agregarCeldaCategoriaPrecios(fila, registro.documento, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.subtotal_formateado, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.descuento_formateado, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.total_venta_formateado, "5%");
		agregarCeldaCategoriaPrecios(fila, registro.total_pagado_formateado, "5%");
		var celdaAccion = agregarCeldaCategoriaPrecios(fila, "", "5%");
		var accion = document.createElement("input");
		accion.type = "button";
		accion.className = "btn4";
		accion.id = registro.cod_venta == null ? "" : String(registro.cod_venta);
		accion.value = "Nuevo (" + (registro.cantidad_gestiones == null ? "0" : String(registro.cantidad_gestiones)) + ")";
		accion.style.backgroundColor = Number(registro.cantidad_gestiones) > 0 ? "#3b7ddd" : "#4caf50";
		accion.style.width = "100%";
		accion.onclick = function (evento) {
			if (evento) evento.stopPropagation();
			verCerrarCargarDetalleClientesTrabajados(accion);
		};
		celdaAccion.appendChild(accion);
		fragmento.appendChild(estructura.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderInformeClientesTrabajados(filas) {
	var contenedor = limpiarContenedorListaCategoriaPrecios("table_informe_ClientesTrabajados");
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var estructura = crearTablaFilaCategoriaPrecios(registro.clase_fila);
		agregarCeldaCategoriaPrecios(estructura.fila, registro.factura, "5%");
		agregarCeldaCategoriaPrecios(estructura.fila, registro.usuario, "10%");
		agregarCeldaCategoriaPrecios(estructura.fila, registro.cliente, "10%");
		agregarCeldaCategoriaPrecios(estructura.fila, registro.descripcion, "15%");
		agregarCeldaCategoriaPrecios(estructura.fila, registro.estado_cliente, "10%");
		agregarCeldaCategoriaPrecios(estructura.fila, registro.fecha, "5%");
		agregarCeldaCategoriaPrecios(estructura.fila, registro.estado, "5%");
		fragmento.appendChild(estructura.tabla);
	});
	contenedor.appendChild(fragmento);
}



function vercerrarSolicitarAnulacion(){
 
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divSolicitarAnulacion").style.display==""){ 
	$("div[id=divSolicitarAnulacion]").fadeOut(500);			
	}else{	  
	mostrarSoloUno("divSolicitarAnulacion")	
		document.getElementById("divSolicitarAnulacion").style.display="" 
	}
}


function minimizarSolicitarAnulacion(){
	$("div[id=divSolicitarAnulacion]").fadeOut(500);
	document.getElementById("divMinimizadoSolicitudAnulacion").style.display=""	 
	copiarBotonEnContenedor(document.getElementById("divMenuCancelacion"));
}

var cod_solicitudAnulacionVenta="";
function verCerrarDetalleSolicitudAnulacion(datos){
	
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divDetalleSolicitudAnulacion").style.display==""){ 
	$("div[id=divDetalleSolicitudAnulacion]").fadeOut(500);			
	}else{
		
		$("tr[id=tbSelecRegistro]").each(function (i, td) {
			td.className = ''
		});
		
		datos.className = 'tableRegistroSelec'
  	 
		cod_solicitudAnulacionVenta =  datos.getAttribute('data-name');
		document.getElementById('inptUsuarioDetalleSolicitudAnulacion').value = document.getElementById("spNombreLogin").innerHTML
		document.getElementById('inptClienteDetalleSolicitudAnulacion').value = $(datos).children('td[id="td_datos_2"]').html();
		document.getElementById('inptLocalDetalleSolicitudAnulacion').value = $(datos).children('td[id="td_datos_36"]').html();
		document.getElementById('inptFacturaDetalleSolicitudAnulacion').value = $(datos).children('td[id="td_datos_35"]').html();
		document.getElementById('inptusuCajaDetalleSolicitudAnulacion').value = $(datos).children('td[id="td_datos_37"]').html();
		document.getElementById('inptDocumentoDetalleSolicitudAnulacion').value = $(datos).children('td[id="td_datos_38"]').html();
		document.getElementById('inptTotalVentaDetalleSolicitudAnulacion').value = $(datos).children('td[id="td_datos_39"]').html();
		document.getElementById('inptFechaDetalleSolicitudAnulacion').value = $(datos).children('td[id="td_datos_1"]').html();
		
		document.getElementById("divDetalleSolicitudAnulacion").style.display="" 
	}
}



function buscarSolicitarAnulacion() {
	var buscar = document.getElementById('inptBuscarSolicitarAnulacion').value 	
	var local = document.getElementById('inptLocalSolicitarAnulacion').value	
	document.getElementById("table_vista_SolicitarAnulacion").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscar, 
		"local": local,
		"funt": "solicitudAnulacionVenta",
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
			document.getElementById("table_vista_SolicitarAnulacion").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_SolicitarAnulacion").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderSolicitarAnulacion(datos_buscados);
					} else {
						document.getElementById("table_vista_SolicitarAnulacion").innerHTML = datos_buscados;
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
 
function verificarcamposDetalleSolicitudAnulacion(){
	var inptMotivoDetalleSolicitudAnulacion=document.getElementById('inptMotivoDetalleSolicitudAnulacion').value 
	var inptTipoSolicitudAnulacion=document.getElementById('inptTipoSolicitudAnulacion').value 
	

  if(inptMotivoDetalleSolicitudAnulacion==""){
	ver_vetana_informativa("FALTO INGRESAR EL MOTIVO")
	  return false;
  }

  if(inptTipoSolicitudAnulacion==""){
	ver_vetana_informativa("FALTO SELECCIONAR EL TIPO")
	  return false;
  }
 
  AbmSolicitudDetalleSolicitudAnulacion(inptMotivoDetalleSolicitudAnulacion,inptTipoSolicitudAnulacion);
}

function  AbmSolicitudDetalleSolicitudAnulacion(motivo,Tipo){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "abmSolicitudAnulacionVenta")
			 datos.append("Cod_UsuFK" , userid)
			 datos.append("motivo" , motivo)
			 datos.append("Tipo" , Tipo)
			 datos.append("cod_ventaFK" , cod_solicitudAnulacionVenta)
 
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
				verCerrarDetalleSolicitudAnulacion()
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
 
function buscarSolicitudAnulacionVenta() {			
	if(controlaccesoDescuento("VERSOLICITUDANULARVENTA","accion")==false){return;}	
	document.getElementById("divBuscadorDescuento").style.display = ''

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarSolicitudAnulacionVenta",
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
			document.getElementById("divSolicitudAnulacionVenta").innerHTML = ''
			controldebusquedadInventario=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divSolicitudAnulacionVenta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   							   
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderSolicitudesAnulacionPendientes(datos_buscados);
					} else {
						document.getElementById("divSolicitudAnulacionVenta").innerHTML = datos_buscados;
					}
			 
				}
			} catch (error) {
				controldebusquedadInventario=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
 
 
 
 
var cod_aprobarSolicitudAnulacion = "";
var cod_aprobarVentaAnulacion = "";
function obtenerdatosSolicitudAnulacionVenta(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
		
		cod_aprobarSolicitudAnulacion = $(datostr).children('td[id="td_datos_9"]').html();
		cod_aprobarVentaAnulacion = $(datostr).children('td[id="td_datos_6"]').html();
		document.getElementById("inptUsuarioSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_10"]').html();
		document.getElementById("inptClienteSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById("inptLocalSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_7"]').html();
		document.getElementById("inptFacturaSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById("inptusuCajaSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_2"]').html();
		document.getElementById("inptDocumentoSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_8"]').html();
		document.getElementById("inptTotalVentaSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById("inptFechaSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_5"]').html();
		document.getElementById("inptMotivoSolicitudAnulacion").value = $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById("inptTipoSolicitudAnulacionDetalle").value = $(datostr).children('td[id="td_datos_12"]').html();
		
		document.getElementById("divSolicitudAnulacion").style.display=""
}


function verCerrarSolicitudAnulacion(){
	
	document.getElementById("divSegundoPlano").style.display="none";
	
	if(document.getElementById("divSolicitudAnulacion").style.display==""){ 
		$("div[id=divSolicitudAnulacion]").fadeOut(500);			
	}else{			
		document.getElementById("divSolicitudAnulacion").style.display="" 
	}
}



function verificarcamposAprobarSolicitudAnulacion(){
	var inptEstadoSolicitudAnulacion=document.getElementById('inptEstadoSolicitudAnulacion').value 
	var inptMotivoSolicitudAnulacion=document.getElementById('inptMotivoSolicitudAnulacion').value 
	var inptTipoSolicitudAnulacionDetalle=document.getElementById('inptTipoSolicitudAnulacionDetalle').value 
 
  AprobarSolicitudAnulacion(inptEstadoSolicitudAnulacion,inptMotivoSolicitudAnulacion,inptTipoSolicitudAnulacionDetalle);
}

function  AprobarSolicitudAnulacion(estado,motivo,tipo){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "AprobarSolicitudAnulacionVenta")
			 datos.append("cod_aprobacion" , cod_aprobarSolicitudAnulacion)
			 datos.append("estado" , estado)
			 datos.append("motivo" , motivo)
			 datos.append("tipo" , tipo)
			 datos.append("cod_venta" , cod_aprobarVentaAnulacion)
			 datos.append("cod_UsuarioFK" , userid)
 
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
				buscarSolicitudAnulacionVenta()
				verCerrarSolicitudAnulacion()
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
 
 
 
 
 /*
INFORME DE ANULACION VENTA
*/
function verCerrarInformeSolicitudAnulacion(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeSolicitudAnulacion").style.display==""){
		
		if(controldebusquedadInformeSolicitudAnulacion==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		
		limpiarcamposinformeSolicitudAnulacion()
		document.getElementById("divMinimizadoInformeSolicitudAnulacion").style.display="none"
		 
		$("div[id=divInformeSolicitudAnulacion]").fadeOut(500);	
	}else{	
		if(controlacceso("VERINFORMESOLICITUDANULACION","accion")==false){return;}
		mostrarSoloUno("divInformeSolicitudAnulacion")	
		document.getElementById("divInformeSolicitudAnulacion").style.display=""
		 
	}
}
function minimizarinformeSolicitudAnulacion(){
	 document.getElementById("divMinimizadoInformeSolicitudAnulacion").style.display = "";
	 copiarBotonEnContenedor(document.getElementById("divMenuSolicitudAnulacionVenta"));
	$("div[id=divInformeSolicitudAnulacion]").fadeOut(500);	
}
function limpiarcamposinformeSolicitudAnulacion(){
	document.getElementById("inptBuscarInformeSolicitudAnulacion1").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion2").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion3").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion4").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion5").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion6").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion7").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion8").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion10").value=""
	document.getElementById("inptBuscarInformeSolicitudAnulacion9").value=""
	
	
	
	
	document.getElementById("inptRegistroInformeSolicitudAnulacion").value=""
	document.getElementById("inptRegistroTotalVentaInformeSolicitudAnulacion").value=""
	document.getElementById("table_informe_SolicitudAnulacion").innerHTML=""
	document.getElementById('btnInformeVentaAnulada').style.backgroundColor='#b7b7b7';
	checkInformeSolicitudAnulacion('1');
	informe_cod_SolicitudAnulacion = "";
	idVentaAnulada = '';
}
var registrocargadoinformeSolicitudAnulacion="";
var totalregistroinformeSolicitudAnulacion="";
var controldebusquedadInformeSolicitudAnulacion=false
function cancelarInformeSolicitudAnulacion(){
	controldebusquedadInformeSolicitudAnulacion=false
	document.getElementById("divProgressInformeSolicitudAnulacion").style.backgroundColor='#ff5722'
}
function buscarinformeSolicitudAnulacion() {
	var fecha1 = document.getElementById("inptBuscarInformeSolicitudAnulacionF1").value
	var fecha2 = document.getElementById("inptBuscarInformeSolicitudAnulacionF2").value
	var nrodoc = document.getElementById("inptBuscarInformeSolicitudAnulacion1").value
	var cliente = document.getElementById("inptBuscarInformeSolicitudAnulacion2").value
	var nroventa = document.getElementById("inptBuscarInformeSolicitudAnulacion3").value
	var fecha = document.getElementById("inptBuscarInformeSolicitudAnulacion4").value
	var tipo = document.getElementById("inptBuscarInformeSolicitudAnulacion5").value
	var estado = document.getElementById("inptBuscarInformeSolicitudAnulacion6").value
	var usuenvia = document.getElementById("inptBuscarInformeSolicitudAnulacion7").value
	var usuacepta = document.getElementById("inptBuscarInformeSolicitudAnulacion8").value
	var local = document.getElementById("inptLocalInformeSolicitudAnulacion").value
	var estado_confirmado = document.getElementById("inptBuscarInformeSolicitudAnulacion9").value
	var cod_vendedor = document.getElementById("inptBuscarInformeSolicitudAnulacion10").value
	if(document.getElementById('checkInformeSolicitudAnulacion2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	if(controldebusquedadInformeSolicitudAnulacion==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
	controldebusquedadInformeSolicitudAnulacion=true
	document.getElementById("tbProcessInformeSolicitudAnulacion").style.display="none"
	document.getElementById("table_informe_SolicitudAnulacion").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"nroventa": nroventa,
		"nrodoc": nrodoc,
		"cliente": cliente,
		"fecha": fecha,
		"tipo": tipo,
		"estado": estado,
		"usuenvia": usuenvia,
		"usuacepta": usuacepta,
		"local": local,
		"estado_confirmado": estado_confirmado,
		"cod_vendedor": cod_vendedor,
		"funt": "informeSolicitudAnulacion",
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
			document.getElementById("table_informe_SolicitudAnulacion").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_SolicitudAnulacion").innerHTML = "";controldebusquedadInformeSolicitudAnulacion = true;
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) {
						renderInformeSolicitudAnulacion(pagina, "table_informe_SolicitudAnulacion");
					} else {
						document.getElementById("table_informe_SolicitudAnulacion").innerHTML = pagina;
					}
					document.getElementById("inptRegistroInformeSolicitudAnulacion").value = datos[3]
					document.getElementById("inptRegistroTotalVentaInformeSolicitudAnulacion").value = datos[5]
					document.getElementById('btnInformeVentaAnulada').style.backgroundColor = '#b7b7b7';
					idVentaAnulada = '';
					registrocargadoinformeSolicitudAnulacion=datos[99];
					totalregistroinformeSolicitudAnulacion=datos[100];					
						 if(totalregistroinformeSolicitudAnulacion>registrocargadoinformeSolicitudAnulacion){
						 	var porce=((registrocargadoinformeSolicitudAnulacion*100)/totalregistroinformeSolicitudAnulacion).toFixed(0)
	document.getElementById("divProgressInformeSolicitudAnulacion").style.width=porce+"%"
						 agregarContenedorMasInformeSolicitudAnulacion("table_informe_SolicitudAnulacion");
						 buscarmasinformeSolicitudAnulacion()
					 }else{
						 controldebusquedadInformeSolicitudAnulacion=false
					 } 
				}
			} catch (error) {
				controldebusquedadInformeSolicitudAnulacion=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
	
function buscarmasinformeSolicitudAnulacion() {
	var fecha1 = document.getElementById("inptBuscarInformeSolicitudAnulacionF1").value
	var fecha2 = document.getElementById("inptBuscarInformeSolicitudAnulacionF2").value
	var nrodoc = document.getElementById("inptBuscarInformeSolicitudAnulacion1").value
	var cliente = document.getElementById("inptBuscarInformeSolicitudAnulacion2").value
	var nroventa = document.getElementById("inptBuscarInformeSolicitudAnulacion3").value
	var fecha = document.getElementById("inptBuscarInformeSolicitudAnulacion4").value
	var tipo = document.getElementById("inptBuscarInformeSolicitudAnulacion5").value
	var estado = document.getElementById("inptBuscarInformeSolicitudAnulacion6").value
	var usuenvia = document.getElementById("inptBuscarInformeSolicitudAnulacion7").value
	var usuacepta = document.getElementById("inptBuscarInformeSolicitudAnulacion8").value
	var local = document.getElementById("inptLocalInformeSolicitudAnulacion").value
	var estado_confirmado = document.getElementById("inptBuscarInformeSolicitudAnulacion9").value
	var cod_vendedor = document.getElementById("inptBuscarInformeSolicitudAnulacion10").value
	
	if(document.getElementById('checkInformeSolicitudAnulacion2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	

	if(controldebusquedadInformeSolicitudAnulacion==false){
		return
	}
	controldebusquedadInformeSolicitudAnulacion=true
	document.getElementById("tbProcessInformeSolicitudAnulacion").style.display=""
document.getElementById("divProgressInformeSolicitudAnulacion").style.backgroundColor=''
	document.getElementById("table_mas_informe_SolicitudAnulacion").innerHTML = paginacargando
	let total_venta = document.getElementById("inptRegistroTotalVentaInformeSolicitudAnulacion").value;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"nroventa": nroventa,
		"nrodoc": nrodoc,
		"cliente": cliente,
		"fecha": fecha,
		"tipo": tipo,
		"estado": estado,
		"usuenvia": usuenvia,
		"usuacepta": usuacepta,
		"local": local,
		"registrocargado": registrocargadoinformeSolicitudAnulacion,
		"estado_confirmado": estado_confirmado,
		"cod_vendedor": cod_vendedor,
		"total_venta": total_venta,
		"funt": "masinformeSolicitudAnulacion",
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
			document.getElementById("table_mas_informe_SolicitudAnulacion").innerHTML = ""	
			document.getElementById("divProgressInformeSolicitudAnulacion").style.backgroundColor='#ff5722'
			controldebusquedadInformeSolicitudAnulacion=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_mas_informe_SolicitudAnulacion").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) {
						renderInformeSolicitudAnulacion(pagina, "table_mas_informe_SolicitudAnulacion");
					} else {
						document.getElementById("table_mas_informe_SolicitudAnulacion").innerHTML = pagina;
					}
					document.getElementById("inptRegistroInformeSolicitudAnulacion").value = datos[3]
					document.getElementById("inptRegistroTotalVentaInformeSolicitudAnulacion").value = datos[5]
					/* informe_cod_SolicitudAnulacion = "" */
					
					
					registrocargadoinformeSolicitudAnulacion=datos[99];
					
						 if(totalregistroinformeSolicitudAnulacion>registrocargadoinformeSolicitudAnulacion){
						 	var porce=((registrocargadoinformeSolicitudAnulacion*100)/totalregistroinformeSolicitudAnulacion).toFixed(0)
	document.getElementById("divProgressInformeSolicitudAnulacion").style.width=porce+"%"
						 var contenedorActual = document.getElementById("table_mas_informe_SolicitudAnulacion");
						 agregarContenedorMasInformeSolicitudAnulacion("table_mas_informe_SolicitudAnulacion");
						 if (contenedorActual) contenedorActual.id=""
						  buscarmasinformeSolicitudAnulacion();
					 }else{
						 document.getElementById("tbProcessInformeSolicitudAnulacion").style.display="none"
						 controldebusquedadInformeSolicitudAnulacion=false
					 }
				}
			} catch (error) {
				document.getElementById("divProgressInformeSolicitudAnulacion").style.backgroundColor='#ff5722'
				controldebusquedadInformeSolicitudAnulacion=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

function buscarabmUsuarioOption() {
	document.getElementById("inptBuscarInformeSolicitudAnulacion7").innerHTML = "";
	document.getElementById("inptBuscarInformeSolicitudAnulacion8").innerHTML = "";

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
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
					document.getElementById("inptBuscarInformeSolicitudAnulacion7").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeSolicitudAnulacion8").innerHTML = datos_buscados
 
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

let idVentaAnulada = '';
 function obtenerdatosinformeventasanuladas(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idVentaAnulada = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('btnInformeVentaAnulada').style.backgroundColor = 'green';
	// console.log(idVentaAnulada);
}

function confirmar_venta_anulada(){
	if(idVentaAnulada==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO");
		return;
	}
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "confirmar_venta_anulada")
			 datos.append("idVentaAnulada" , idVentaAnulada)
 
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
				buscarinformeSolicitudAnulacion()
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
 
 
function checkInformeSolicitudAnulacion(d){	
	if(d=="1"){
		document.getElementById('checkInformeSolicitudAnulacion1').checked=true
		document.getElementById('checkInformeSolicitudAnulacion2').checked=false
		document.getElementById('inptBuscarInformeSolicitudAnulacionF1').value = "";
	    document.getElementById('inptBuscarInformeSolicitudAnulacionF2').value = "";	
	}else{		
		document.getElementById('checkInformeSolicitudAnulacion1').checked=false
		document.getElementById('checkInformeSolicitudAnulacion2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeSolicitudAnulacionF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeSolicitudAnulacionF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

/* CLIENTES TRABAJADOS */
function vercerrarClientesTrabajados(){
	if(controlacceso("VERCLIENTESTRABAJADOS","accion")==false){return;}
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divClientesTrabajados").style.display==""){ 
	$("div[id=divClientesTrabajados]").fadeOut(500)
	limpiarcamposbuscarClientesTrabajados();
	}else{	  
	mostrarSoloUno("divClientesTrabajados")	
		document.getElementById("divClientesTrabajados").style.display="" 
		document.getElementById("divMinimizadoClientesTrabajados").style.display="none";
	}
}
function limpiarcamposbuscarClientesTrabajados(){
	document.getElementById('inptLocalClientesTrabajados').value = '';
	document.getElementById('inptEstadoCuentaClientesTrabajados').value = '';
	document.getElementById('inptBuscarClientesTrabajados2').value = '';
	document.getElementById('inptBuscarClientesTrabajados1').value = '';
	document.getElementById('inptBuscarClientesTrabajados4').value = '';
	document.getElementById('inptBuscarClientesTrabajados5').value = '';
	document.getElementById('inptTipoClienteClientesTrabajados').value = '';
	document.getElementById('table_vista_ClientesTrabajados').innerHTML = '';
}
function buscarClientesTrabajados() {
	var estadocuenta = document.getElementById('inptEstadoCuentaClientesTrabajados').value 	
	var local = document.getElementById('inptLocalClientesTrabajados').value
	var nroventa = document.getElementById('inptBuscarClientesTrabajados2').value
	var fechafiltro = document.getElementById('inptBuscarClientesTrabajados1').value
	var cliente = document.getElementById('inptBuscarClientesTrabajados4').value
	var tipoventa = document.getElementById('inptBuscarClientesTrabajados5').value
	var tipo_cliente = document.getElementById('inptTipoClienteClientesTrabajados').value
	
	
	document.getElementById("table_vista_ClientesTrabajados").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"estadocuenta": estadocuenta,
		"cod_local": local,
		"nroventa": nroventa,
		"fechafiltro": fechafiltro,
		"cliente": cliente,
		"tipoventa": tipoventa,
		"tipo_cliente": tipo_cliente,
		"funt": "buscar_ventas_clientes_trabajados",
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
			document.getElementById("table_vista_ClientesTrabajados").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_ClientesTrabajados").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderClientesTrabajados(datos_buscados);
					} else {
						document.getElementById("table_vista_ClientesTrabajados").innerHTML = datos_buscados;
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

function minimizarabmClientesTrabajados(){
	$("div[id=divClientesTrabajados]").fadeOut(500);
	document.getElementById("divMinimizadoClientesTrabajados").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuClientesTrabajados"));
}

let cod_venta_detalle_trabajados = '';
function verCerrarCargarDetalleClientesTrabajados(datos){
	if(document.getElementById("divCargarDetalleClientesTrabajados").style.display==""){ 
		document.getElementById("divCargarDetalleClientesTrabajados").style.display="none" 
		document.getElementById("divClientesTrabajados").style.display="" 
		cod_venta_detalle_trabajados = '';
		document.getElementById('inptDescripcionCargarDetalleClientesTrabajados').value = '';
		document.getElementById('inptEstadoCargarDetalleClientesTrabajados').value = '';
	}else{
		document.getElementById("divCargarDetalleClientesTrabajados").style.display="" 
		document.getElementById("divClientesTrabajados").style.display="none" 
		cod_venta_detalle_trabajados = datos.id;
	}
}
function verificar_cargar_detalle_clientes_trabajados(){
	let descripcion = document.getElementById('inptDescripcionCargarDetalleClientesTrabajados').value;
	let estado_cliente = document.getElementById('inptEstadoCargarDetalleClientesTrabajados').value;
	
	if(estado_cliente==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN ESTADO");
		return;
	}
	
	if(descripcion==""){
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION");
		return;
	}
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "cargar_detalle_clientes_trabajados")
			 datos.append("cod_venta" , cod_venta_detalle_trabajados)
			 datos.append("descripcion" , descripcion)
			 datos.append("estado_cliente" , estado_cliente)
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
				
				
				document.getElementById('inptDescripcionCargarDetalleClientesTrabajados').value=''
				document.getElementById('inptEstadoCargarDetalleClientesTrabajados').value=''
				buscarClientesTrabajados()
				ver_vetana_informativa("DATOS GUARDADOS CORRECTAMENTE")
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
 
 
 
 /* INFORME CLIENTES TRABAJADOS */
function buscarinformeClientesTrabajados() {
	var fecha1 = document.getElementById("inptBuscarInformeClientesTrabajadosF1").value
	var fecha2 = document.getElementById("inptBuscarInformeClientesTrabajadosF2").value
	// var nroventa = document.getElementById("inptBuscarInformeClientesTrabajados3").value
	var fecha = document.getElementById("inptBuscarInformeClientesTrabajados1").value
	var local = document.getElementById("inptLocalInformeClientesTrabajados").value
	var tipo_cliente = document.getElementById("inptTipoClienteInformeClientesTrabajados").value
	var cliente = document.getElementById("inptBuscarInformeClientesTrabajados2").value
	var estado_cliente = document.getElementById("inptBuscarInformeClientesTrabajados3").value
	var cod_usuario = document.getElementById("inptBuscarInformeClientesTrabajados4").value
	
	if(document.getElementById('checkInformeClientesTrabajados2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	
	document.getElementById("table_informe_ClientesTrabajados").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		// "nroventa": nroventa,
		"fecha": fecha,
		"local": local,
		"tipo_cliente": tipo_cliente,
		"cliente": cliente,
		"estado_cliente": estado_cliente,
		"cod_usuario": cod_usuario,
		"funt": "informeClientesTrabajados",
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
			document.getElementById("table_informe_ClientesTrabajados").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_ClientesTrabajados").innerHTML = "";
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) {
						renderInformeClientesTrabajados(pagina);
					} else {
						document.getElementById("table_informe_ClientesTrabajados").innerHTML = pagina;
					}
					document.getElementById("inptRegistroInformeClientesTrabajados").value = datos[3];
					
					
					if(cod_usuario != ''){
						document.getElementById("inptBuscarInformeClientesTrabajados4").value = cod_usuario;
					}else{
						document.getElementById("inptBuscarInformeClientesTrabajados4").innerHTML = datos[4];
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
function limpiarcamposinformeClientesTrabajados(){
	document.getElementById("inptBuscarInformeClientesTrabajados1").value=""
	document.getElementById("inptLocalInformeClientesTrabajados").value=""
	document.getElementById("inptTipoClienteInformeClientesTrabajados").value=""
	document.getElementById("inptRegistroInformeClientesTrabajados").value=""
	document.getElementById("table_informe_ClientesTrabajados").innerHTML=""
	checkInformeClientesTrabajados('1');

}
function checkInformeClientesTrabajados(d){	
	if(d=="1"){
		document.getElementById('checkInformeClientesTrabajados1').checked=true
		document.getElementById('checkInformeClientesTrabajados2').checked=false
		document.getElementById('inptBuscarInformeClientesTrabajadosF1').value = "";
	    document.getElementById('inptBuscarInformeClientesTrabajadosF2').value = "";	
	}else{		
		document.getElementById('checkInformeClientesTrabajados1').checked=false
		document.getElementById('checkInformeClientesTrabajados2').checked=true
		var f = new Date();
		var dia = f.getDate()
		if (dia < 10) {
			dia = "0" + dia;
		}
		var mes = f.getMonth() + 1
		if (mes < 10) {
			mes = "0" + mes;
		}
		document.getElementById('inptBuscarInformeClientesTrabajadosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
		document.getElementById('inptBuscarInformeClientesTrabajadosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
			
	}
}




function verCerrarInformeClientesTrabajados(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeClientesTrabajados").style.display==""){
		document.getElementById("divMinimizadoInformeClientesTrabajados").style.display="none"
		 
		$("div[id=divInformeClientesTrabajados]").fadeOut(500);	
	}else{	
		if(controlacceso("VERINFORMECLIENTESTRABAJADOS","accion")==false){return;}
		mostrarSoloUno("divInformeClientesTrabajados")	
		document.getElementById("divInformeClientesTrabajados").style.display=""
	}
}

function minimizarinformeClientesTrabajados(){
	$("div[id=divInformeClientesTrabajados]").fadeOut(500);
	document.getElementById("divMinimizadoInformeClientesTrabajados").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuInformeClientesTrabajados"));
}

