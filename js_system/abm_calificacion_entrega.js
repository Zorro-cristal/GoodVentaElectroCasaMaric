/*
ABM CALIFICACION ENTREGA
*/
var listadoAbmCalificacionEntrega = null;
function iniciarListadoAbmCalificacionEntrega() {
	if (listadoAbmCalificacionEntrega || !window.AbmListadoCore) { return listadoAbmCalificacionEntrega; }
	var cuerpo = document.getElementById("table_abm_CalificacionEntrega");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmCalificacionEntrega";
	listadoAbmCalificacionEntrega = window.AbmListadoCore.crear({
		nombre: "calificacion_entrega_credito",
		idCabecera: "cabeceraAbmCalificacionEntrega",
		idCuerpo: "table_abm_CalificacionEntrega",
		ordenInicial: "fecha_entrega",
		columnas: [
			{ campo: "id_solicitud", titulo: "#", ancho: "5%" },
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
			funcionSeleccion: "obtenerdatosabmCalificacionEntrega",
			celdas: [
				{ id: "td_id", campo: "id_solicitud", columna: "id_solicitud", render: function (valor, registro, celda) {
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
	listadoAbmCalificacionEntrega.iniciar();
	return listadoAbmCalificacionEntrega;
}
function verCerrarAbmCalificacionEntrega(){
		document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCalificacionEntrega").style.display==""){
		document.getElementById("divMinimizadoCalificacionEntrega").style.display="none"
		 limpiarcamposbuscarCalificacionEntrega()
		$("div[id=divAbmCalificacionEntrega]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERCALIFICACIONENTREGA","accion")==false){return;}
		mostrarSoloUno("divAbmCalificacionEntrega")	
		document.getElementById("divAbmCalificacionEntrega").style.display=""
		 
	}
}
function limpiarcamposbuscarCalificacionEntrega(){
	    document.getElementById('inptBuscarAbmCalificacionEntrega2').value=""
	    document.getElementById('inptBuscarAbmCalificacionEntrega1').value=""
	    document.getElementById('inptRegistroSeleccCalificacionEntrega').value=""
		document.getElementById("table_abm_CalificacionEntrega").innerHTML = ""
		document.getElementById("inptTotalRegistoCalificacionEntrega").value = "";
}
function minimizarabmCalificacionEntrega(){ 
	$("div[id=divAbmCalificacionEntrega]").fadeOut(500);	
	document.getElementById("divMinimizadoCalificacionEntrega").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCalificacionEntrega"));
}
function verVentanaCargarCalificacionEntrega() {
	
	
	if(document.getElementById("divCargarCalificacionEntrega").style.display==""){
		document.getElementById("divCargarCalificacionEntrega").style.display="none"
	}else{		
	
	if (idAbmSolicitudCalificacionEntrega == "" && idAbmSolicitudCalificacionEntregaContado == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
		document.getElementById("divCargarCalificacionEntrega").style.display=""
	}
}
let idAbmCalificacionEntrega = '';
let idAbmSolicitudCalificacionEntrega = '';
function obtenerdatosabmCalificacionEntrega(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idAbmSolicitudCalificacionEntrega = $(datostr).children('td[id="td_id"]').html();
	idAbmCalificacionEntrega = $(datostr).children('td[id="td_datos_7"]').html();
	
	document.getElementById('inptCalificacionCargarCalificacionEntrega').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptObservacionCargarCalificacionEntrega').value = $(datostr).children('td[id="td_datos_6"]').html();
	
	 document.getElementById("inptRegistroSeleccCalificacionEntrega").value = $(datostr).children('td[id="td_datos_2"]').html();
}
function verificarcamposCalificacionEntrega() {
	var inptObservacionCargarCalificacionEntrega = document.getElementById('inptObservacionCargarCalificacionEntrega').value
	var inptCalificacionCargarCalificacionEntrega = document.getElementById('inptCalificacionCargarCalificacionEntrega').value
	var inptEstadoEntregaCargarCalificacionEntrega = document.getElementById('inptEstadoEntregaCargarCalificacionEntrega').value
	
	if (inptObservacionCargarCalificacionEntrega == "") {
		ver_vetana_informativa("FALTO INGRESAR UNA OBSERVACION")
		return false;
	}
	
	if (inptCalificacionCargarCalificacionEntrega == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA CALIFICACION PARA EL COBRADOR")
		return false;
	}
	
	if(controlventanacalificacionentrega=="1"){
		var accion = "";
		if (idAbmCalificacionEntrega != "") {
			accion = "editarCalificacionEntrega";
		} else {
			accion = "nuevoCalificacionEntrega";
		}
		abmCalificacionEntrega(inptObservacionCargarCalificacionEntrega, inptCalificacionCargarCalificacionEntrega, inptEstadoEntregaCargarCalificacionEntrega, accion);
	}
	
	if(controlventanacalificacionentrega=="2"){
		var accion = "";
		if (idAbmCalificacionEntregaContado != "") {
			accion = "editarCalificacionEntrega";
		} else {
			accion = "nuevoCalificacionEntrega";
		}
		abmCalificacionEntregaContado(inptObservacionCargarCalificacionEntrega, inptCalificacionCargarCalificacionEntrega, inptEstadoEntregaCargarCalificacionEntrega, accion)
	}
	
	
	
}
function abmCalificacionEntrega(observacion, calificacion, estado, accion) {
	var datos = new FormData();
	verCerrarEfectoCargando("1")
	
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idCalificacionEntrega", idAbmCalificacionEntrega)
	datos.append("idAbmSolicitudCalificacionEntrega", idAbmSolicitudCalificacionEntrega)
	datos.append("observacion", observacion)
	datos.append("calificacion", calificacion)
	datos.append("estado", estado)
	
	
	
	
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					limpiarcamposCalificacionEntrega()
					buscarabmCalificacionEntrega()
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
function buscarabmCalificacionEntrega() {
	if(controlventanacalificacionentrega=="2"){
		buscarabmCalificacionEntregaContado()
		return;
	}
	// if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var listado = iniciarListadoAbmCalificacionEntrega();
	var fecha_entrega = document.getElementById('inptBuscarAbmCalificacionEntrega1').value
	var cliente = document.getElementById('inptBuscarAbmCalificacionEntrega2').value
	var cod_cobrador = document.getElementById('inptBuscarAbmCalificacionEntrega3').value;
	
	let fechadesde = document.getElementById('inptBuscarAbmCalificacionEntregaF1').value;
	let fechahasta = document.getElementById('inptBuscarAbmCalificacionEntregaF2').value;
	let calificacion = document.getElementById('inptBuscarAbmCalificacionEntrega4').value;
	let estado = document.getElementById('inptBuscarAbmCalificacionEntrega5').value;
	
	if(document.getElementById('checkfiltrosCalificacionEntrega2').checked == true){
		if(fechadesde =='' || fechahasta == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR EL RANGO DE FECHAS');
			return;
		}
	}
	
	document.getElementById("table_abm_CalificacionEntrega").innerHTML = paginacargando
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
		"funt": "buscar_abm_calificacion_entrega"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CalificacionEntrega").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CalificacionEntrega").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					document.getElementById("inptTotalRegistoCalificacionEntrega").value = datos[3];
					document.getElementById("inptPromedioCobradorCalificacionEntrega").value = datos[4];
					document.getElementById("inptMaximoCobradorCalificacionEntrega").value = datos[5];
					document.getElementById("inptMinCobradorCalificacionEntrega").value = datos[6];
					idAbmSolicitudCalificacionEntrega = '';
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmCalificacionEntrega);
} else {
	iniciarListadoAbmCalificacionEntrega();
}
function limpiarcamposCalificacionEntrega() {
	document.getElementById('inptObservacionCargarCalificacionEntrega').value = '';
	document.getElementById('inptCalificacionCargarCalificacionEntrega').value = '';
	document.getElementById('inptEstadoEntregaCargarCalificacionEntrega').value = '';
}
function checkfiltrosCalificacionEntrega(d){	
	if(d=="1"){
		document.getElementById('checkfiltrosCalificacionEntrega1').checked=true
		document.getElementById('checkfiltrosCalificacionEntrega2').checked=false
		document.getElementById('inptBuscarAbmCalificacionEntregaF1').value = "";
	    document.getElementById('inptBuscarAbmCalificacionEntregaF2').value = "";	
	}else{		
		document.getElementById('checkfiltrosCalificacionEntrega1').checked=false
		document.getElementById('checkfiltrosCalificacionEntrega2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarAbmCalificacionEntregaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarAbmCalificacionEntregaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarCobradorSelecCalificacionEntrega() {

    // Limpiamos el select antes de cargar los nuevos datos
    document.getElementById("inptBuscarAbmCalificacionEntrega3").innerHTML = "";
    document.getElementById("inptBuscarAbmCalificacionEntregaContado3").innerHTML = "";

    // Obtenemos datos del usuario (según tu sistema)
    obtener_datos_user();

    var datos = {
        "useru": userid,
        "passu": passuser,
        "navegador": navegador,
        "funt": "buscaroptioncalificacionentrega"
    };

    $.ajax({
        data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
        type: "post",
        dataType: "json", // 👈 muy importante para que jQuery ya parsee el JSON

        beforeSend: function () {
            // Aquí podés poner un loader si querés
            document.getElementById("inptBuscarAbmCalificacionEntregaContado3").innerHTML =
                "<option>Cargando...</option>";
        },

        success: function (datos) {
            console.log("Respuesta del servidor:", datos);

            // Limpiamos el select
            document.getElementById("inptBuscarAbmCalificacionEntregaContado3").innerHTML = "";

            var Respuesta = datos["1"];
            Respuesta = respuestaJqueryAjax(Respuesta); // tu función de validación

            if (Respuesta === true) {
                var datos_buscados = datos["2"];
				 document.getElementById("inptBuscarAbmCalificacionEntrega3").innerHTML = datos_buscados
                document.getElementById("inptBuscarAbmCalificacionEntregaContado3").innerHTML = datos["3"];
            }
        },

        error: function (jqXHR, textstatus, errorThrowm) {
            // Manejo de errores
            manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");

            document.getElementById("inptBuscarAbmCalificacionEntregaContado3").innerHTML = "";
            ver_vetana_informativa("LO SENTIMOS, HA OCURRIDO UN ERROR");

            var titulo = "Error: " + errorThrowm + " \r\nConsola: " + jqXHR.responseText;
            GuardarArchivosLog(titulo);
        }
    });

}
let controlventanacalificacionentrega = '1';
function verCerrarVentanasCalificacionEntrega(d){
	document.getElementById("btnCalificacionEntrega1").style=''
	document.getElementById("btnCalificacionEntrega2").style=''
	document.getElementById("divVentanaCalificacionEntrega1").style.display='none'
	document.getElementById("divVentanaCalificacionEntrega2").style.display='none'
	
	if(d=="1"){
		document.getElementById("btnCalificacionEntrega1").style='background-color:#FF9800;color:#fff'
		controlventanacalificacionentrega = '1';
		document.getElementById("divVentanaCalificacionEntrega1").style.display=''
		}
	if(d=="2"){
		document.getElementById("btnCalificacionEntrega2").style='background-color:#FF9800;color:#fff'
			controlventanacalificacionentrega = '2';
			document.getElementById("divVentanaCalificacionEntrega2").style.display=''
	}	
	
}

//ARCHIVOS CALIFICACION ENTREGA
function verCerrarCargarFotosCalificacionEntrega(d){
	if(d=="1"){
		if (idAbmSolicitudCalificacionEntrega == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
	buscarFotosCalificacionEntrega()
		document.getElementById("divAbmCargarCargarFotosCalificacionEntrega").style.display = "";
		LimpiarCamposCargarFotosCalificacionEntrega()
	}else{
		document.getElementById("divAbmCargarCargarFotosCalificacionEntrega").style.display="none"
	}
}
function ExploradorFotosCalificacionEntrega(File){	
$("input[id="+File+"]").click();
}
var fotocalificacionentrega="";
var extensionfotocalificacionentrega="";	
var urlfotocalificacionentrega="";
function readFileFotosCalificacionEntrega(input){
var file=$("input[name="+input.name+"]")[0].files[0];
urlfotocalificacionentrega = URL.createObjectURL(file);
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
	extensionfotocalificacionentrega = file_extension;
	fotocalificacionentrega = e.target.result;
	document.getElementById("text-carga-2-fotoscalificacionentrega").style.display=""
	document.getElementById("text-carga-fotoscalificacionentrega").style.display="none"
	
	
	document.getElementById("btnAddFotosCalificacionEntrega").style.backgroundColor = "";
	document.getElementById("btnEliminarFotosCalificacionEntrega").style.backgroundColor = "#d5d3d3";
	document.getElementById("btnVerFotosCalificacionEntrega").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroFotoCalificacionEntrega]").each(function(i, td){
	td.className=''
});
	
	elementofotoseleccionadocalificacionentrega="";
	
	
document.getElementById("file_FotosCalificacionEntrega").value="";
}
readerPrincipal.readAsDataURL(input.files[0]);
}
function AddCargarFotosCalificacionEntrega(){

	if(fotocalificacionentrega ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
	if(document.getElementById('inptDescripcionFotosCalificacionEntrega').value == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA DESCRIPCION")
		return;
	}
	
	var descripcion = document.getElementById("inptDescripcionFotosCalificacionEntrega");
    descripcion = descripcion.options[descripcion.selectedIndex].text;

$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});

var accion = "insertar_foto_calificacion_entrega";
	AbmCargarFotosCalificacionEntrega(accion,descripcion,fotocalificacionentrega,extensionfotocalificacionentrega);
}
var elementofotoseleccionadocalificacionentrega="";
function SeleccionarItemFotosCalificacionEntrega(datostr) {
	elementofotoseleccionadocalificacionentrega = datostr
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
	});
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarFotosCalificacionEntrega").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerFotosCalificacionEntrega").style.backgroundColor = "#2196F3";
	

	document.getElementById("btnAddFotosCalificacionEntrega").style.backgroundColor = "#d5d3d3";
	fotocalificacionentrega = "";
	extensionfotocalificacionentrega = "";
}
function LimpiarCamposCargarFotosCalificacionEntrega(){
	document.getElementById("btnAddFotosCalificacionEntrega").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarFotosCalificacionEntrega").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerFotosCalificacionEntrega").style.backgroundColor="#d5d3d3";
	document.getElementById("inptDescripcionFotosCalificacionEntrega").value=""
	document.getElementById("text-carga-fotoscalificacionentrega").style.display=""
	document.getElementById("text-carga-2-fotoscalificacionentrega").style.display="none"
	elementofotoseleccionadocalificacionentrega =""
	fotocalificacionentrega="";
	extensionfotocalificacionentrega = "";
	urlfotocalificacionentrega="";
}

function renderFotosCalificacionEntrega(filas) {
	var contenedor = document.getElementById("table_foto_calificacion_entrega");
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
		fila.onclick = function () { SeleccionarItemFotosCalificacionEntrega(fila); };
		[
			["td_id_1", registro.codigo_fila, null, true],
			["td_id_2", registro.id_documento, null, true],
			["td_id_3", registro.id_solicitud_credito, null, true],
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
function AbmCargarFotosCalificacionEntrega(accion,descripcion,archivo,ext){
	var datos = new FormData();
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idSolicitudCreditoFK", idAbmSolicitudCalificacionEntrega)
	datos.append("descripcion", descripcion)
	datos.append("archivo", archivo)
	datos.append("ext", ext)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
					LimpiarCamposCargarFotosCalificacionEntrega()
					buscarFotosCalificacionEntrega()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function VerCargarFotosCalificacionEntrega(){
	
	if(elementofotoseleccionadocalificacionentrega == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
		
	window.open(`${$(elementofotoseleccionadocalificacionentrega).children('td[id="td_datos_1"]').html()}`, '_blank');
}
function EliminarFotosCalificacionEntrega(){
	
	// if(controlacceso("ELIMINAREXCELPEDIDOSPROVEEDOR","accion")==false){return;}
	if(elementofotoseleccionadocalificacionentrega == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
	
	if(!confirm("Realmente desea eliminar el archivo?")){
		return;
	}
	
	obtener_datos_user();
	
	var iddocumento = $(elementofotoseleccionadocalificacionentrega).children('td[id="td_id_2"]').html()
	var urldocumento = $(elementofotoseleccionadocalificacionentrega).children('td[id="td_datos_1"]').html()
	var isolicitudcredito = $(elementofotoseleccionadocalificacionentrega).children('td[id="td_id_3"]').html()
	
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
					buscarFotosCalificacionEntrega()
					ver_vetana_informativa("SE HA ELIMINADO CORRECTAMENTE")
					LimpiarCamposCargarFotosCalificacionEntrega()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarFotosCalificacionEntrega(){
	
	document.getElementById("table_foto_calificacion_entrega").innerHTML = ''
	
	/* let fecha1 = document.getElementById("inptBuscarFiltroFechaPedidoProveedorF1").value;
	let fecha2 = document.getElementById("inptBuscarFiltroFechaPedidoProveedorF2").value;
	
	if(document.getElementById('checkCargarArhivosProveedorPedidoFecha2').checked == true){
		if(fecha1 == "" || fecha2 ==""){
			ver_vetana_informativa("FALTO SELECCIONAR ALGUNAS DE LAS FECHAS");
			return;
		}
	} */
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		/* "fecha1": fecha1,
		"fecha2": fecha2, */
		"cod_credito_solicitudFK": idAbmSolicitudCalificacionEntrega,
		"funt": "buscarDocumentosCargaFotoCalificacionEntrega",
		"formato": "json"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_foto_calificacion_entrega").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_foto_calificacion_entrega").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderFotosCalificacionEntrega(datos_buscados);
					} else {
						document.getElementById("table_foto_calificacion_entrega").innerHTML = datos_buscados;
					}
					LimpiarCamposCargarFotosCalificacionEntrega()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


