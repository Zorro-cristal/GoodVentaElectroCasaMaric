// ABM DESCRIPCION ARCHIVOS CALIFICACION ENTREGA
var listadoDescripcionFotosCalificacionEntrega = null;

function iniciarListadoDescripcionFotosCalificacionEntrega() {
	if (listadoDescripcionFotosCalificacionEntrega || !window.AbmListadoCore) { return listadoDescripcionFotosCalificacionEntrega; }
	var cuerpo = document.getElementById("divBuscadorDescripcionFotosCalificacionEntrega");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraDescripcionFotosCalificacionEntrega";
	listadoDescripcionFotosCalificacionEntrega = window.AbmListadoCore.crear({
		nombre: "descripcion_fotos_calificacion_entrega",
		idCabecera: "cabeceraDescripcionFotosCalificacionEntrega",
		idCuerpo: "divBuscadorDescripcionFotosCalificacionEntrega",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmDescripcionFotosCalificacionEntrega",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoDescripcionFotosCalificacionEntrega.iniciar();
	return listadoDescripcionFotosCalificacionEntrega;
}

function verCerrarAbmNuevoDescripcionFotosCalificacionEntrega(){
	
	if(document.getElementById("divAbmNuevoDescripcionFotosCalificacionEntrega").style.display==""){
		$("div[id=divAbmNuevoDescripcionFotosCalificacionEntrega]").fadeOut(500);	
	}else{		
	if(controlacceso("CREARNUEVADESCRIPCIONFOTOCALIFICACIONENTREGA","accion")==false){return;}
		document.getElementById("divAbmNuevoDescripcionFotosCalificacionEntrega").style.display=""
		BuscarAbmDescripcionFotosCalificacionEntrega()
	}
}
function buscarSelectDescripcionFotosCalificacionEntrega() {

	document.getElementById("inptDescripcionFotosCalificacionEntrega").innerHTML = ""
	document.getElementById("inptDescripcionFotosCalificacionEntregaContado").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionDescripcionFotosCalificacionEntrega"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptDescripcionFotosCalificacionEntrega").innerHTML = ''
			document.getElementById("inptDescripcionFotosCalificacionEntregaContado").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptDescripcionFotosCalificacionEntrega").innerHTML = ''
			document.getElementById("inptDescripcionFotosCalificacionEntregaContado").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptDescripcionFotosCalificacionEntrega").innerHTML = datos_buscados
					document.getElementById("inptDescripcionFotosCalificacionEntregaContado").innerHTML = datos_buscados


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
var idAbmDescripcionFotosCalificacionEntrega="";
var ElementoSeleccDescripcionFotosCalificacionEntrega="";
function LimpiarCamposDescripcionFotosCalificacionEntrega(){
	document.getElementById("inptNombreDescripcionFotosCalificacionEntrega").value="";
	document.getElementById("inptEstadoDescripcionFotosCalificacionEntrega").value="";
	document.getElementById("btnDescripcionFotosCalificacionEntrega1").value="Guardar Datos"
	idAbmDescripcionFotosCalificacionEntrega="";
	ElementoSeleccDescripcionFotosCalificacionEntrega="";
}
function ObtenerdatosAbmDescripcionFotosCalificacionEntrega(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionFotosCalificacionEntrega=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionFotosCalificacionEntrega").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionFotosCalificacionEntrega").value = $(datostr).children('td[id="td_datos_2"]').html();
	
	
	idAbmDescripcionFotosCalificacionEntrega = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionFotosCalificacionEntrega1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionFotosCalificacionEntrega(){
	if(ElementoSeleccDescripcionFotosCalificacionEntrega==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
	
	document.getElementById('inptDescripcionFotosCalificacionEntrega').value = $(ElementoSeleccDescripcionFotosCalificacionEntrega).children('td[id="td_id"]').html();
	
	 document.getElementById("divAbmNuevoDescripcionFotosCalificacionEntrega").style.display="none";
	 LimpiarCamposDescripcionFotosCalificacionEntrega()
}
function VerificarDatosDescripcionFotosCalificacionEntrega(){
	var inptNombreDescripcionFotosCalificacionEntrega = document.getElementById("inptNombreDescripcionFotosCalificacionEntrega").value
	var inptEstadoDescripcionFotosCalificacionEntrega = document.getElementById("inptEstadoDescripcionFotosCalificacionEntrega").value	
	if(inptNombreDescripcionFotosCalificacionEntrega==""){
		document.getElementById("inptNombreDescripcionFotosCalificacionEntrega").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionFotosCalificacionEntrega==""){
		document.getElementById("inptEstadoDescripcionFotosCalificacionEntrega").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionFotosCalificacionEntrega != "") {		
		accion = "editarDescripcionFotosCalificacionEntrega";
	} else {		
		accion = "nuevaDescripcionFotosCalificacionEntrega";
	}
	AbmDescripcionFotosCalificacionEntrega(inptNombreDescripcionFotosCalificacionEntrega,inptEstadoDescripcionFotosCalificacionEntrega,idAbmDescripcionFotosCalificacionEntrega,accion)
}
function AbmDescripcionFotosCalificacionEntrega(descripcion,Estado,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("Estado", Estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
				LimpiarCamposDescripcionFotosCalificacionEntrega()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionFotosCalificacionEntrega()
				buscarSelectDescripcionFotosCalificacionEntrega()
				}
				else {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmDescripcionFotosCalificacionEntrega() {
	var listado = iniciarListadoDescripcionFotosCalificacionEntrega();
	var buscador = document.getElementById("inptBuscarAbmDescripcionFotosCalificacionEntregas").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionFotosCalificacionEntrega").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionFotosCalificacionEntrega").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionFotosCalificacionEntrega").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "BuscarAbmDescripcionFotosCalificacionEntrega"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionFotosCalificacionEntrega").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionFotosCalificacionEntrega").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionFotosCalificacionEntrega").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionFotosCalificacionEntrega").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
                   document.getElementById("lblNroRegistroDescripcionFotosCalificacionEntrega").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/* CALIFICACION CONTADO */
var listadoAbmCalificacionEntregaContado = null;
function iniciarListadoAbmCalificacionEntregaContado() {
	if (listadoAbmCalificacionEntregaContado || !window.AbmListadoCore) { return listadoAbmCalificacionEntregaContado; }
	var cuerpo = document.getElementById("table_abm_CalificacionEntregaContado");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmCalificacionEntregaContado";
	listadoAbmCalificacionEntregaContado = window.AbmListadoCore.crear({
		nombre: "calificacion_entrega_contado",
		idCabecera: "cabeceraAbmCalificacionEntregaContado",
		idCuerpo: "table_abm_CalificacionEntregaContado",
		ordenInicial: "fecha_entrega",
		columnas: [
			{ campo: "id_venta", titulo: "#", ancho: "5%" },
			{ campo: "fecha_entrega", titulo: "FECHA ENTREGA", ancho: "5%" },
			{ campo: "cliente", titulo: "CLIENTE", ancho: "20%" },
			{ campo: "telefono", titulo: "TELEFONO", ancho: "5%" },
			{ campo: "whatsapp", titulo: "WHATSAPP", ancho: "5%" },
			{ campo: "cobrador", titulo: "COBRADOR", ancho: "10%" },
			{ campo: "calificacion", titulo: "CALIFICACION", ancho: "10%" },
			{ campo: "observacion", titulo: "OBSERVACION", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "10%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmCalificacionEntregaContado",
			celdas: [
				{ id: "td_id", campo: "id_venta", columna: "id_venta", render: function (valor, registro, celda) {
					celda.style.backgroundColor = "#efeded";
					celda.style.color = "red";
					return valor;
				} },
				{ id: "td_datos_1", campo: "fecha_entrega", columna: "fecha_entrega" },
				{ id: "td_datos_2", campo: "cliente", columna: "cliente" },
				{ id: "td_datos_3", campo: "telefono", columna: "telefono" },
				{ campo: "whatsapp", columna: "whatsapp" },
				{ id: "td_datos_4", campo: "cobrador", columna: "cobrador" },
				{ id: "td_datos_5", campo: "calificacion", columna: "calificacion" },
				{ id: "td_datos_6", campo: "observacion", columna: "observacion" },
				{ id: "td_datos_8", campo: "estado", columna: "estado" },
				{ campo: "producto", columna: "producto" },
				{ id: "td_datos_7", campo: "id_calificacion", tecnica: true }
			]
		}
	});
	listadoAbmCalificacionEntregaContado.iniciar();
	return listadoAbmCalificacionEntregaContado;
}
let idAbmCalificacionEntregaContado = '';
let idAbmSolicitudCalificacionEntregaContado = '';
function obtenerdatosabmCalificacionEntregaContado(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idAbmSolicitudCalificacionEntregaContado = $(datostr).children('td[id="td_id"]').html();
	idAbmCalificacionEntregaContado = $(datostr).children('td[id="td_datos_7"]').html();
	
	document.getElementById('inptCalificacionCargarCalificacionEntrega').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptObservacionCargarCalificacionEntrega').value = $(datostr).children('td[id="td_datos_6"]').html();
	
	 document.getElementById("inptRegistroSeleccCalificacionEntrega").value = $(datostr).children('td[id="td_datos_2"]').html();
}
function abmCalificacionEntregaContado(observacion, calificacion, estado, accion) {
	var datos = new FormData();
	verCerrarEfectoCargando("1")
	
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idCalificacionEntrega", idAbmCalificacionEntregaContado)
	datos.append("idAbmSolicitudCalificacionEntrega", idAbmSolicitudCalificacionEntregaContado)
	datos.append("observacion", observacion)
	datos.append("calificacion", calificacion)
	datos.append("estado", estado)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
					limpiarcamposCalificacionEntrega()
					buscarabmCalificacionEntregaContado()
					document.getElementById("divCargarCalificacionEntrega").style.display="none";
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function buscarabmCalificacionEntregaContado() {
	// if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var listado = iniciarListadoAbmCalificacionEntregaContado();
	var fecha_entrega = document.getElementById('inptBuscarAbmCalificacionEntregaContado1').value
	var cliente = document.getElementById('inptBuscarAbmCalificacionEntregaContado2').value
	var cod_cobrador = document.getElementById('inptBuscarAbmCalificacionEntregaContado3').value;
	
	let fechadesde = document.getElementById('inptBuscarAbmCalificacionEntregaF1').value;
	let fechahasta = document.getElementById('inptBuscarAbmCalificacionEntregaF2').value;
	let calificacion = document.getElementById('inptBuscarAbmCalificacionEntregaContado4').value;
	let estado = document.getElementById('inptBuscarAbmCalificacionEntregaContado5').value;
	
	if(document.getElementById('checkfiltrosCalificacionEntrega2').checked == true){
		if(fechadesde =='' || fechahasta == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR EL RANGO DE FECHAS');
			return;
		}
	}
	
	document.getElementById("table_abm_CalificacionEntregaContado").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cliente": cliente,
		"fecha_entrega": fecha_entrega,
		"cod_cobrador": cod_cobrador,
		"fechadesde": fechadesde,
		"fechahasta": fechahasta,
		"calificacion": calificacion,
		"estado": estado,
		"formato": "json",
		"funt": "buscar_abm_calificacion_entrega_contado"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CalificacionEntregaContado").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CalificacionEntregaContado").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					document.getElementById("inptTotalRegistoCalificacionEntregaContado").value = datos[3];
					document.getElementById("inptPromedioCobradorCalificacionEntregaContado").value = datos[4];
					document.getElementById("inptMaximoCobradorCalificacionEntregaContado").value = datos[5];
					document.getElementById("inptMinCobradorCalificacionEntregaContado").value = datos[6];
					idAbmSolicitudCalificacionEntregaContado = '';
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmCalificacionEntregaContado);
} else {
	iniciarListadoAbmCalificacionEntregaContado();
}
function verVentanaCargarCalificacionEntregaContado() {
	if (idAbmSolicitudCalificacionEntregaContado == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
	if(document.getElementById("divCargarCalificacionEntrega").style.display==""){
		document.getElementById("divCargarCalificacionEntrega").style.display="none"
	}else{		
		document.getElementById("divCargarCalificacionEntrega").style.display=""
	}
}


//ARCHIVOS CALIFICACION ENTREGA CONTADO
function verCerrarCargarFotosCalificacionEntregaContado(d){
	if(d=="1"){
		if (idAbmSolicitudCalificacionEntregaContado == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
	buscarFotosCalificacionEntregaContado()
		document.getElementById("divAbmCargarCargarFotosCalificacionEntregaContado").style.display = "";
		LimpiarCamposCargarFotosCalificacionEntregaContado()
	}else{
		document.getElementById("divAbmCargarCargarFotosCalificacionEntregaContado").style.display="none"
	}
}
function ExploradorFotosCalificacionEntregaContado(File){	
$("input[id="+File+"]").click();
}
var fotocalificacionentregacontadocontado="";
var extensionfotocalificacionentregacontado="";	
var urlfotocalificacionentregacontado="";
function readFileFotosCalificacionEntregaContado(input){
var file=$("input[name="+input.name+"]")[0].files[0];
urlfotocalificacionentregacontado = URL.createObjectURL(file);
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension.toLowerCase()=="jpg") || (file_extension.toLowerCase()=="jpeg") || (file_extension.toLowerCase()=="png")){
}else{
ver_vetana_informativa("DEBE SER UN ARCHIVO DE IMAGEN")
return false;
}
var readerPrincipal = new FileReader();
readerPrincipal.onload = function(e){
	extensionfotocalificacionentregacontado = file_extension;
	fotocalificacionentregacontado = e.target.result;
	document.getElementById("text-carga-2-fotoscalificacionentregacontado").style.display=""
	document.getElementById("text-carga-fotoscalificacionentregacontado").style.display="none"
	
	
	document.getElementById("btnAddFotosCalificacionEntregaContado").style.backgroundColor = "";
	document.getElementById("btnEliminarFotosCalificacionEntregaContado").style.backgroundColor = "#d5d3d3";
	document.getElementById("btnVerFotosCalificacionEntregaContado").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroFotoCalificacionEntregaContado]").each(function(i, td){
	td.className=''
});
	
	elementofotoseleccionadocalificacionentregacontado="";
	
	
document.getElementById("file_FotosCalificacionEntregaContado").value="";
}
readerPrincipal.readAsDataURL(input.files[0]);
}
function AddCargarFotosCalificacionEntregaContado(){

	if(fotocalificacionentregacontado ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
	if(document.getElementById('inptDescripcionFotosCalificacionEntregaContado').value == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA DESCRIPCION")
		return;
	}
	
	var descripcion = document.getElementById("inptDescripcionFotosCalificacionEntregaContado");
    descripcion = descripcion.options[descripcion.selectedIndex].text;

$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});

var accion = "insertar_foto_calificacion_entrega";
	AbmCargarFotosCalificacionEntregaContado(accion,descripcion,fotocalificacionentregacontado,extensionfotocalificacionentregacontado);
}
var elementofotoseleccionadocalificacionentregacontado="";
function SeleccionarItemFotosCalificacionEntregaContado(datostr) {
	elementofotoseleccionadocalificacionentregacontado = datostr
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
	});
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarFotosCalificacionEntregaContado").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerFotosCalificacionEntregaContado").style.backgroundColor = "#2196F3";
	

	document.getElementById("btnAddFotosCalificacionEntregaContado").style.backgroundColor = "#d5d3d3";
	fotocalificacionentregacontado = "";
	extensionfotocalificacionentregacontado = "";
}
function LimpiarCamposCargarFotosCalificacionEntregaContado(){
	document.getElementById("btnAddFotosCalificacionEntregaContado").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarFotosCalificacionEntregaContado").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerFotosCalificacionEntregaContado").style.backgroundColor="#d5d3d3";
	document.getElementById("inptDescripcionFotosCalificacionEntregaContado").value=""
	document.getElementById("text-carga-fotoscalificacionentregacontado").style.display=""
	document.getElementById("text-carga-2-fotoscalificacionentregacontado").style.display="none"
	elementofotoseleccionadocalificacionentregacontado =""
	fotocalificacionentregacontado="";
	extensionfotocalificacionentregacontado = "";
	urlfotocalificacionentregacontado="";
}

function renderFotosCalificacionEntregaContado(filas) {
	var contenedor = document.getElementById("table_foto_calificacion_entregacontado");
	if (!contenedor || !Array.isArray(filas)) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.id = registro.codigo_fila == null ? "" : String(registro.codigo_fila);
		tabla.className = "tableRegistroSearch";
		tabla.setAttribute("border", "0");
		tabla.setAttribute("cellspacing", "0");
		tabla.setAttribute("cellpadding", "0");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistroImagen";
		fila.setAttribute("name", "tableRegistroSelec");
		fila.onclick = function () { SeleccionarItemFotosCalificacionEntregaContado(fila); };
		[
			["td_id_1", registro.codigo_fila, null, true],
			["td_id_2", registro.id_documento, null, true],
			["td_id_3", registro.id_venta, null, true],
			["td_datos_1", registro.url, null, true],
			["", "FOTO", "20%", false],
			["td_datos_2", registro.descripcion, "30%", false],
			["", registro.cobrador, "30%", false],
			["td_datos_3", registro.fecha, "20%", false]
		].forEach(function (dato) {
			var celda = document.createElement("td");
			if (dato[0]) celda.id = dato[0];
			if (dato[2]) celda.style.width = dato[2];
			if (dato[3]) celda.style.display = "none";
			celda.textContent = dato[1] == null ? "" : String(dato[1]);
			fila.appendChild(celda);
		});
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}
function AbmCargarFotosCalificacionEntregaContado(accion,descripcion,archivo,ext){
	var datos = new FormData();
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_ventaFK", idAbmSolicitudCalificacionEntregaContado)
	datos.append("descripcion", descripcion)
	datos.append("archivo", archivo)
	datos.append("ext", ext)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			return false;
		},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					ver_vetana_informativa("SE HA CARGADO CORRECTAMENTE");
					LimpiarCamposCargarFotosCalificacionEntregaContado()
					buscarFotosCalificacionEntregaContado()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function VerCargarFotosCalificacionEntregaContado(){
	
	if(elementofotoseleccionadocalificacionentregacontado == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
		
	window.open(`${$(elementofotoseleccionadocalificacionentregacontado).children('td[id="td_datos_1"]').html()}`, '_blank');
}
function EliminarFotosCalificacionEntregaContado(){
	
	// if(controlacceso("ELIMINAREXCELPEDIDOSPROVEEDOR","accion")==false){return;}
	if(elementofotoseleccionadocalificacionentregacontado == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
	
	if(!confirm("Realmente desea eliminar el archivo?")){
		return;
	}
	
	obtener_datos_user();
	
	var iddocumento = $(elementofotoseleccionadocalificacionentregacontado).children('td[id="td_id_2"]').html()
	var urldocumento = $(elementofotoseleccionadocalificacionentregacontado).children('td[id="td_datos_1"]').html()
	var isolicitudcredito = $(elementofotoseleccionadocalificacionentregacontado).children('td[id="td_id_3"]').html()
	
	let pos=urldocumento.indexOf("/");
	urldocumento = urldocumento.slice(pos+1)
	pos= urldocumento.indexOf("/")
	urldocumento = urldocumento.slice(pos)
	
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"isolicitudcredito": isolicitudcredito,
		"iddocumento": iddocumento,
		"urldocumento": urldocumento,
		"funt": "eliminardocumentoFotosCalificacionEntrega"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
					buscarFotosCalificacionEntregaContado()
					ver_vetana_informativa("SE HA ELIMINADO CORRECTAMENTE")
					LimpiarCamposCargarFotosCalificacionEntregaContado()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarFotosCalificacionEntregaContado(){
	
	document.getElementById("table_foto_calificacion_entregacontado").innerHTML = ''
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_credito_solicitudFK": idAbmSolicitudCalificacionEntregaContado,
		"funt": "buscarDocumentosCargaFotoCalificacionEntrega",
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
			document.getElementById("table_foto_calificacion_entregacontado").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_foto_calificacion_entregacontado").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderFotosCalificacionEntregaContado(datos_buscados);
					} else {
						document.getElementById("table_foto_calificacion_entregacontado").innerHTML = datos_buscados;
					}
					LimpiarCamposCargarFotosCalificacionEntregaContado()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



