/*
ABM DOCUMENTOS CLIENTE ENTREGA
*/
var listadoAbmDocumentosCliente = null;
function iniciarListadoAbmDocumentosCliente() {
	if (listadoAbmDocumentosCliente || !window.AbmListadoCore) { return listadoAbmDocumentosCliente; }
	var formulario = document.getElementById("divAbmDocumentosCliente1");
	var cuerpo = document.getElementById("table_abm_documentos_cliente");
	var cabecera = formulario ? formulario.querySelector("table.tableCabeceraRegistro tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraAbmDocumentosCliente";
	var opciones = formulario.querySelector(".abm-estandar-menu-columnas");
	if (opciones) { opciones.id = "opcionesColumnasDocumentosCliente"; }
	listadoAbmDocumentosCliente = window.AbmListadoCore.crear({
		nombre: "documentos_cliente",
		idCabecera: "cabeceraAbmDocumentosCliente",
		idCuerpo: "table_abm_documentos_cliente",
		idOpcionesColumnas: "opcionesColumnasDocumentosCliente",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmDocumentosCliente",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmDocumentosCliente.iniciar();
	return listadoAbmDocumentosCliente;
}
function programarListadoAbmDocumentosCliente() {
	setTimeout(iniciarListadoAbmDocumentosCliente, 0);
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", programarListadoAbmDocumentosCliente);
} else {
	programarListadoAbmDocumentosCliente();
}
function
verCerrarAbmDocumentosCliente(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmDocumentosCliente").style.display==""){
		document.getElementById("divMinimizadoDocumentosCliente").style.display="none"
		limpiarcamposDocumentosCliente()
		limpiarcamposbuscarDocumentosCliente()
 
	$("div[id=divAbmDocumentosCliente]").fadeOut(500);	
	}else{		
		if(controlacceso("VERLISTADODEDOCUMENTOSCLIENTE","accion")==false){return;}
		mostrarSoloUno("divAbmDocumentosCliente")	
		document.getElementById("divAbmDocumentosCliente").style.display=""
	}
}
function verCerrarVentanaAbmDocumentosCliente(d, l) {
	if (d == "1") {		
		if (l == "1") {
			 if(controlacceso("INSERTARLISTADODEDOCUMENTOSCLIENTE","accion")==false){return;}
			limpiarcamposDocumentosCliente()
		}
		$("div[id=divAbmDocumentosCliente2]").fadeIn(250)
		document.getElementById('divAbmDocumentosCliente1').style.display = "none"
	} else {
		$("div[id=divAbmDocumentosCliente1]").fadeIn(250)
		document.getElementById('divAbmDocumentosCliente2').style.display = "none"
	}
}
function limpiarcamposbuscarDocumentosCliente(){
	    document.getElementById('inptBuscarAbmDocumentosCliente1').value=""
		document.getElementById("table_abm_documentos_cliente").innerHTML = ""
		document.getElementById("inptTotalRegistoDocumentosCliente").value = "";
}
function minimizarabmDocumentosCliente(){
 
	$("div[id=divAbmDocumentosCliente]").fadeOut(500);	
	document.getElementById("divMinimizadoDocumentosCliente").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmDocumentosCliente"));
}
function verVentanaEditarDocumentosCliente() {
	if (idAbmDocumentosCliente == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADODEDOCUMENTOSCLIENTE","accion")==false){return;}
	verCerrarVentanaAbmDocumentosCliente("1", "2")
}
var idAbmDocumentosCliente = ""
function ObtenerdatosAbmDocumentosCliente(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptDescripcionDocumentosCliente').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccDocumentosCliente').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoDocumentosCliente').value = $(datostr).children('td[id="td_datos_2"]').html();
	
	document.getElementById('btnAbmDocumentosCliente').value = "Editar datos";
	document.getElementById('btnEditarDatosDocumentosCliente').style.backgroundColor="";
	idAbmDocumentosCliente = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposDocumentosCliente() {
	var inptDescripcionDocumentosCliente = document.getElementById('inptDescripcionDocumentosCliente').value
	var inptEstadoDocumentosCliente = document.getElementById('inptEstadoDocumentosCliente').value
	
	if (inptDescripcionDocumentosCliente == "") {
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return false;
	}
	
	var accion = "";
	if (idAbmDocumentosCliente != "") {
		accion = "editardocumentocliente";
		if(controlacceso("EDITARLISTADODEDOCUMENTOSCLIENTE","accion")==false){return;}
	} else {
		accion = "nuevodocumentocliente";
		if(controlacceso("INSERTARLISTADODEDOCUMENTOSCLIENTE","accion")==false){return;}
	}
	abmDocumentosCliente(inptDescripcionDocumentosCliente,inptEstadoDocumentosCliente , idAbmDocumentosCliente, accion);
}
function abmDocumentosCliente(descripcion,estado,idDocumentosCliente, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idDocumentosCliente)
	datos.append("descripcion", descripcion)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
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
					limpiarcamposDocumentosCliente()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmDocumentosCliente = ""
					buscarabmDocumentosCliente();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoDocumentosCliente(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarDocumentosCliente1').checked=true
	document.getElementById('inptSeleccEstadoBuscarDocumentosCliente2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarDocumentosCliente1').checked=false
	document.getElementById('inptSeleccEstadoBuscarDocumentosCliente2').checked=true
	}
}
function buscarabmDocumentosCliente() {
	if(controlacceso("BUSCARLISTADODEDOCUMENTOSCLIENTE","accion")==false){return;}
	var listado = iniciarListadoAbmDocumentosCliente();
	var descripcion = document.getElementById('inptBuscarAbmDocumentosCliente1').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarDocumentosCliente1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_documentos_cliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"descripcion": descripcion,
		"estado": estado,
		"formato": "json",
		"funt": "buscar_documento_cliente"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_documentos_cliente").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_documentos_cliente").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptTotalRegistoDocumentosCliente").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposDocumentosCliente() {
	document.getElementById('inptDescripcionDocumentosCliente').value = "";
	document.getElementById('inptRegistroSeleccDocumentosCliente').value = "";
	document.getElementById('inptEstadoDocumentosCliente').value = "Activo";
	document.getElementById('btnEditarDatosDocumentosCliente').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmDocumentosCliente').value = "Guardar datos";
	idAbmDocumentosCliente= "";
}



