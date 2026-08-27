/*
ABM COBRADOR
*/
var listadoAbmCobrador = null;
function iniciarListadoAbmCobrador() {
	if (listadoAbmCobrador || !window.AbmListadoCore) { return listadoAbmCobrador; }
	var cuerpo = document.getElementById("table_abm_cobrador");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmCobrador";
	listadoAbmCobrador = window.AbmListadoCore.crear({
		nombre: "cobrador",
		idCabecera: "cabeceraAbmCobrador",
		idCuerpo: "table_abm_cobrador",
		ordenInicial: "cobrador",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "10%" },
			{ campo: "cobrador", titulo: "COBRADOR", ancho: "35%" },
			{ campo: "telefono", titulo: "NRO TELEF.", ancho: "25%" },
			{ campo: "local", titulo: "LOCAL", ancho: "30%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmCobrador",
			claseTabla: function (registro, indice) {
				return indice % 2 ? "tableRegistroSearch" : "tableRegistroSearch2";
			},
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "cobrador", columna: "cobrador" },
				{ id: "td_datos_2", campo: "telefono", columna: "telefono" },
				{ id: "td_datos_13", campo: "local", columna: "local" },
				{ id: "td_datos_3", campo: "zona", tecnica: true },
				{ id: "td_datos_4", campo: "usuario", tecnica: true },
				{ id: "td_datos_5", campo: "contrasena", tecnica: true },
				{ id: "td_datos_6", campo: "codigo_zona", tecnica: true },
				{ id: "td_datos_7", campo: "estado", tecnica: true },
				{ id: "td_datos_8", campo: "acceso_cliente", tecnica: true },
				{ id: "td_datos_9", campo: "acceso_producto", tecnica: true },
				{ id: "td_datos_10", campo: "acceso_cuentas", tecnica: true },
				{ id: "td_datos_11", campo: "modo_sin_conexion", tecnica: true },
				{ id: "td_datos_12", campo: "realizar_cobranzas", tecnica: true },
				{ id: "td_datos_15", campo: "realizar_entregas", tecnica: true },
				{ id: "td_datos_17", campo: "verificar_solicitud_credito", tecnica: true },
				{ id: "td_datos_14", campo: "codigo_local", tecnica: true },
				{ id: "td_datos_16", campo: "url_imagen", tecnica: true },
				{ id: "td_datos_18", campo: "acceso_crear_solicitud_credito", tecnica: true },
				{ id: "td_datos_19", campo: "acceso_agenda_cliente", tecnica: true },
				{ id: "td_datos_20", campo: "acceso_cargar_fotos_cliente", tecnica: true },
				{ id: "td_datos_21", campo: "acceso_cargar_pdf_cliente", tecnica: true },
				{ id: "td_datos_22", campo: "acceso_egreso_ingreso", tecnica: true },
				{ id: "td_datos_23", campo: "acceso_ubicacion_cliente", tecnica: true },
				{ id: "td_datos_24", campo: "acceso_metas_cobrador", tecnica: true },
				{ id: "td_datos_25", campo: "acceso_solicitud_descuento_credito", tecnica: true }
			]
		}
	});
	listadoAbmCobrador.iniciar();
	return listadoAbmCobrador;
}
function verCerrarAbmCobrador(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCobrador").style.display==""){
		document.getElementById("divMinimizadoListadoCobradores").style.display="none"
		limpiarcamposbuscarCobrador()
		limpiarcamposCobrador()
 
	$("div[id=divAbmCobrador]").fadeOut(500);	
	}else{		
	if(controlacceso("VERLISTADOCOBRADORES","accion")==false){return;}
	mostrarSoloUno("divAbmCobrador")	
		document.getElementById("divAbmCobrador").style.display=""
 
		
	}
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmCobrador);
} else {
	iniciarListadoAbmCobrador();
}
function limpiarcamposbuscarCobrador(){
	document.getElementById('inptBuscarAbmCobrador1').value=""
	document.getElementById('inptBuscarAbmCobrador2').value=""
	document.getElementById("table_abm_cobrador").innerHTML = ""
	document.getElementById("inptRegistroNroCobrador").value = ""
}
function minimizarabmcobrador(){
 
	$("div[id=divAbmCobrador]").fadeOut(500);	
	document.getElementById("divMinimizadoListadoCobradores").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmCobradores"));
}
function verCerrarVentanaAbmVistaCobrador(d) {
	if (d == "1") {
		if(controlacceso("INSERTARLISTADOCOBRADORES","accion")==false){return;}
		 
		$("div[id=divVistaCobrador]").fadeOut(500)
		document.getElementById("divAbmCobradorVista").style.display=""
		   
		document.getElementById("inptNombreApellidoCobradorVista").value = ""
		document.getElementById("inptUsuarioCobradorVista").value = ""
		document.getElementById("inptPassCobradorVista").value = ""
		document.getElementById("inptNroTelefCobradorVista").value = ""
		document.getElementById("inptZonaCobradorVista").value = ""
		idFKZona = "1";
		idAbmCobrador = "";
	} else {
		 
	$("div[id=divAbmCobradorVista]").fadeOut(500);	
	}
}
function verificarcamposCobradorvista() {
	var inptNombreApellidoCobrador = document.getElementById('inptNombreApellidoCobradorVista').value
	var inptUsuarioCobrador = document.getElementById('inptUsuarioCobradorVista').value
	var inptPassCobrador = document.getElementById('inptPassCobradorVista').value
	var inptNroTelefCobrador = document.getElementById('inptNroTelefCobradorVista').value
	var inptZonaCobrador = document.getElementById('inptZonaCobradorVista').value
	var inptEstadoCobrador = "Activo"
	if (inptNombreApellidoCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE COBRADOR")
		return false;
	}
	if (inptUsuarioCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR EL USUARIO DE ACCESO")
		return false;
	}
	if (inptPassCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR LA CONTRASEÑA DEL COBRADOR")
		return false;
	}
	if (idFKZona == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
		return false;
	}
	var accion = "nuevo";
	if(controlacceso("INSERTARLISTADOCOBRADORES","accion")==false){return;}
	abmcobrador(inptNombreApellidoCobrador, inptUsuarioCobrador, inptPassCobrador, inptNroTelefCobrador, idFKZona, inptEstadoCobrador, idAbmCobrador, accion);
}
function verCerrarVentanaAbmCobrador(d, l) {
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOCOBRADORES","accion")==false){return;}
			limpiarcamposCobrador()
		}
		$("div[id=divAbmCobrador2]").fadeIn(250)
		document.getElementById('divAbmCobrador1').style.display = "none"
	} else {
		$("div[id=divAbmCobrador1]").fadeIn(250)
		document.getElementById('divAbmCobrador2').style.display = "none"
	}
}
function verVentanaEditarCobrador() {
	if(controlacceso("EDITARLISTADOCOBRADORES","accion")==false){return;}
	if (idAbmCobrador == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmCobrador("1", "2")
}
var idAbmCobrador = ""
function obtenerdatosabmCobrador(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreApellidoCobrador').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccCobrador').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptUsuarioCobrador').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptPassCobrador').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptNroTelefCobrador').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptZonaCobrador').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptEstadoCobrador').value = $(datostr).children('td[id="td_datos_7"]').html();
	inptSeleccAccesoCliente = $(datostr).children('td[id="td_datos_8"]').html();
	inptSeleccAccesoConsulta = $(datostr).children('td[id="td_datos_9"]').html();
	inptSeleccAccesoCuentas = $(datostr).children('td[id="td_datos_10"]').html();
	inptSeleccAccesoOffline = $(datostr).children('td[id="td_datos_11"]').html();
	inptSeleccAccesoRealizarCobranzas= $(datostr).children('td[id="td_datos_12"]').html();
	inptSeleccAccesoRealizarEntregas= $(datostr).children('td[id="td_datos_15"]').html();
	document.getElementById('inptlocalCobrador').value= $(datostr).children('td[id="td_datos_14"]').html();
	
	if(inptSeleccAccesoCliente=="si"){
	document.getElementById("inptSeleccAccesoCliente").checked=true
	}else{
	document.getElementById("inptSeleccAccesoCliente").checked=false
	}
	if(inptSeleccAccesoConsulta=="si"){
	document.getElementById("inptSeleccAccesoConsulta").checked=true
	}else{
	document.getElementById("inptSeleccAccesoConsulta").checked=false
	}
	if(inptSeleccAccesoCuentas=="si"){
	document.getElementById("inptSeleccAccesoCuentas").checked=true
	}else{
	document.getElementById("inptSeleccAccesoCuentas").checked=false
	}
	if(inptSeleccAccesoOffline=="si"){
	document.getElementById("inptSeleccAccesoOffline").checked=true
	}else{
	document.getElementById("inptSeleccAccesoOffline").checked=false
	}
	if(inptSeleccAccesoRealizarCobranzas=="si"){
	document.getElementById("inptSeleccAccesoRealizarCobranzas").checked=true
	}else{
	document.getElementById("inptSeleccAccesoRealizarCobranzas").checked=false
	}
	
	if(inptSeleccAccesoRealizarEntregas=="si"){
	document.getElementById("inptSeleccAccesoRealizarEntregas").checked=true
	}else{
	document.getElementById("inptSeleccAccesoRealizarEntregas").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_17"]').html()=="si"){
	document.getElementById("inptSeleccAccesoVerificarSolicitud").checked=true
	}else{
	document.getElementById("inptSeleccAccesoVerificarSolicitud").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_18"]').html()=="si"){
	document.getElementById("inptSeleccCrearSolicitudCredito").checked=true
	}else{
	document.getElementById("inptSeleccCrearSolicitudCredito").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_19"]').html()=="si"){
	document.getElementById("inptSeleccAgendaCliente").checked=true
	}else{
	document.getElementById("inptSeleccAgendaCliente").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_20"]').html()=="si"){
	document.getElementById("inptSeleccCargarFotosCliente").checked=true
	}else{
	document.getElementById("inptSeleccCargarFotosCliente").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_21"]').html()=="si"){
	document.getElementById("inptSeleccCargarPDFCliente").checked=true
	}else{
	document.getElementById("inptSeleccCargarPDFCliente").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_22"]').html()=="si"){
	document.getElementById("inptSeleccEngresoIngresoCobrador").checked=true
	}else{
	document.getElementById("inptSeleccEngresoIngresoCobrador").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_23"]').html()=="si"){
	document.getElementById("inptSeleccUbicacionCliente").checked=true
	}else{
	document.getElementById("inptSeleccUbicacionCliente").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_24"]').html()=="si"){
	document.getElementById("inptSeleccMetasCobrador").checked=true
	}else{
	document.getElementById("inptSeleccMetasCobrador").checked=false
	}
	
	if($(datostr).children('td[id="td_datos_25"]').html()=="si"){
	document.getElementById("inptSeleccSolicDescuentoCredito").checked=true
	}else{
	document.getElementById("inptSeleccSolicDescuentoCredito").checked=false
	}
	
	
	document.getElementById('btnAbmCobrador').value ="Editar datos";
	document.getElementById('btnEditarCobradores').style.backgroundColor="";
	document.getElementById('btnLocalEntregador').style.backgroundColor="";
	idAbmCobrador = $(datostr).children('td[id="td_id"]').html();
	idFKZona = $(datostr).children('td[id="td_datos_6"]').html();
	
	fotoperfilcobador = $(datostr).children('td[id="td_datos_16"]').html();
	$("div[id=imgFotoPerfil1cobrador]").css({ "background-image": "url(" + fotoperfilcobador + ")" })

}
