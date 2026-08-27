/*
ABM CASA
*/
function verCerrarAbmCasa(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCasa").style.display==""){
		document.getElementById("divMinimizadoListadoDeLocales").style.display="none"
	limpiarCamposBuscarCasa()
		limpiarcamposCasa()
 
	$("div[id=divAbmCasa]").fadeOut(500);	
	
	}else{			
		if(controlacceso("VERLISTADODELOCALES","accion")==false){return;}
		mostrarSoloUno("divAbmCasa")	
		document.getElementById("divAbmCasa").style.display=""
 
	
	}
}
function limpiarCamposBuscarCasa(){
	document.getElementById("inptBuscarAbmCasa1").value=""
	document.getElementById("inptBuscarAbmCasa2").value=""
	document.getElementById("inptTotalRegistoCasa").value=""
	document.getElementById("inptRegistroSeleccCasa").value=""
	if (listadoAbmCasa) listadoAbmCasa.establecerRegistros([])
	else document.getElementById("table_abm_casa").innerHTML=""
}
function minimizarcasa(){
		document.getElementById("divMinimizadoListadoDeLocales").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmLocales"));
	$("div[id=divAbmCasa]").fadeOut(500);	
}
function verCerrarVentanaAbmCasa(d, l) {
	if (d == "1") {
		if (l == "1") {
			if(controlacceso("INSERTARLISTADODELOCALES","accion")==false){return;}
			limpiarcamposCasa()
		}
		$("div[id=divAbmCasa2]").fadeIn(250)
		document.getElementById('divAbmCasa1').style.display = "none"
	} else {
		$("div[id=divAbmCasa1]").fadeIn(250)
			document.getElementById('divAbmCasa2').style.display = "none"
	}
}
function verVentanaEditarCasa() {
	if(controlacceso("EDITARLISTADODELOCALES","accion")==false){return;}
	if (idAbmCasa == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmCasa("1", "2")
}
var idAbmCasa = ""
function obtenerdatosabmCasa(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreCasa').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccCasa').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoCasa').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('btnEditarCasas').style.backgroundColor="";
	document.getElementById('btnAbmCasa').value = "Editar datos";
	idAbmCasa = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposCasa() {
	var inptNombreCasa = document.getElementById('inptNombreCasa').value
	var inptEstadoCasa = document.getElementById('inptEstadoCasa').value
	if (inptNombreCasa == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL LOCAL")
		return false;
	}
	var accion = "";
	if (idAbmCasa != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADODELOCALES","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADODELOCALES","accion")==false){return;}
	}
	abmcasa(inptNombreCasa, inptEstadoCasa, idAbmCasa, accion);
}
function abmcasa(nombre, estado, cod_local, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_local", cod_local)
	datos.append("nombre", nombre)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcasa.php",
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
					limpiarcamposCasa()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmCasa = ""
					buscarabmCasa()
					buscarabmCasaOption();
					buscarabmCasaOptionCuentas()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoCasas(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarCasa1').checked=true
		document.getElementById('inptSeleccEstadoBuscarCasa2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarCasa1').checked=false
		document.getElementById('inptSeleccEstadoBuscarCasa2').checked=true
	}
}

var listadoAbmCasa = null;
function inicializarListadoAbmCasa() {
	if (!window.AbmListadoCore) return;
	var formulario = document.getElementById('divAbmCasa1');
	var cuerpo = document.getElementById('table_abm_casa');
	var cabecera = formulario ? formulario.querySelector('.tableCabeceraRegistro tr') : null;
	if (!cuerpo || !cabecera) return;
	cabecera.id = 'cabeceraAbmCasa';
	var opciones = formulario.querySelector('.abm-estandar-menu-columnas');
	if (opciones) opciones.id = 'opcionesColumnasCasa';
	if (!listadoAbmCasa) {
		listadoAbmCasa = window.AbmListadoCore.crear({
			nombre: 'casa',
			idCabecera: 'cabeceraAbmCasa',
			idCuerpo: 'table_abm_casa',
			idOpcionesColumnas: 'opcionesColumnasCasa',
			ordenable: true,
			ordenInicial: 'nombre',
			columnas: [
				{ campo: 'codigo', titulo: '#', ancho: '15%' },
				{ campo: 'nombre', titulo: 'LOCAL', ancho: '85%' }
			],
			fila: {
				funcionSeleccion: 'obtenerdatosabmCasa',
				celdas: [
					{ id: 'td_id', columna: 'codigo', campo: 'codigo' },
					{ id: 'td_datos_1', columna: 'nombre', campo: 'nombre' },
					{ id: 'td_datos_2', tecnica: true, campo: 'estado' }
				]
			}
		});
	}
	listadoAbmCasa.iniciar();
}

function programarListadoAbmCasa() {
	setTimeout(inicializarListadoAbmCasa, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmCasa);
else programarListadoAbmCasa();

function buscarabmCasa() {
if(controlacceso("BUSCARLISTADODELOCALES","accion")==false){return;}
	var codigo = document.getElementById('inptBuscarAbmCasa1').value
	var nombre = document.getElementById('inptBuscarAbmCasa2').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarCasa1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_casa").innerHTML = paginacargando
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmcasa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_casa").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_casa").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					inicializarListadoAbmCasa()
					listadoAbmCasa.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoCasa").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function limpiarcamposCasa() {
	document.getElementById('inptNombreCasa').value = "";
	document.getElementById('inptRegistroSeleccCasa').value = "";
	document.getElementById('btnEditarCasas').style.backgroundColor="#b7b7b7";
	document.getElementById('inptEstadoCasa').value = "Activo";
	document.getElementById('btnAbmCasa').value = "Guardar datos";
	idAbmCasa = "";
}
function buscarabmCasaOption() {
	document.getElementById("inptlocaluser").innerHTML = "";
	document.getElementById("inptlocalProducto").innerHTML = "";
	document.getElementById("inptBuscarProducto7").innerHTML = "";
	document.getElementById("inptLocalProductoEnviarA").innerHTML = "";
	document.getElementById("inptlocalProductoBuscarVista").innerHTML = "";
	document.getElementById("inptlocalVenta").innerHTML = "";
	document.getElementById("inptlocalAperturaCierre").innerHTML = "";
	document.getElementById("inptlocalCaja").innerHTML = "";
	document.getElementById("inptlocalCompra").innerHTML = "";
	document.getElementById("inputSelectLocalVistaCompra").innerHTML = "";
	document.getElementById("inptBuscarUsuario4").innerHTML = "";
	document.getElementById("inptlocalProductoBuscarInventario").innerHTML = "";
	document.getElementById("inptBuscarHistorialVenta8").innerHTML = "";
	document.getElementById("inptBuscarHistorialLocal").innerHTML = "";
	document.getElementById("inputSelectLocalClientesInactivos").innerHTML = "";
	
	document.getElementById("inptBuscarCuentasCobrar6").innerHTML = "";
	document.getElementById("inptlocalCuentasAcobrainforme").innerHTML = "";
	document.getElementById("inptlocalMisGastos").innerHTML = "";
	document.getElementById("inptlocalMisGastosBusca").innerHTML = "";
	document.getElementById("inptBuscarHistorialCompra5").innerHTML = "";
	
	
	document.getElementById("inptlocalArqueo").innerHTML = "";
	document.getElementById("inptlocalMetas").innerHTML = "";
	document.getElementById("inptlocalInformeDevoluciones").innerHTML = "";
	document.getElementById("inptlocalInformeProductosComprados").innerHTML = "";
	document.getElementById("inptlocalInformeProductosVendidos").innerHTML = "";
	document.getElementById("inptlocalInformeGananciaporventa").innerHTML = "";
	document.getElementById("inptlocalInformeVentaCanceladas").innerHTML = "";
	document.getElementById("inptlocal2InformeProductoDespachado").innerHTML = "";
	document.getElementById("inptlocal1InformeProductoDespachado").innerHTML = "";
	document.getElementById("inptlocalProductoBuscarCatalago").innerHTML = "";

	document.getElementById("inptlocalInformeEvaluacion").innerHTML = ""
	document.getElementById("inptlocalProductoBuscarCodBarra").innerHTML = ""
	document.getElementById("inptlocalNroFactura").innerHTML = ""
	document.getElementById("inptlocalCuentaApagar").innerHTML = ""
	document.getElementById("inptlocalProductoGarantia").innerHTML = ""
	document.getElementById("inptlocalVistaApCie").innerHTML = ""
	document.getElementById("inptlocalCobrosRealizados3").innerHTML = ""
	document.getElementById("inptAbmLocalVendedor").innerHTML = ""
	document.getElementById("inptBuscarAbmCobrador3").innerHTML = ""
	document.getElementById("inptBuscarVistaVendedor1").innerHTML = ""
	document.getElementById("inptLocalProductoListadoDespachar1").innerHTML = ""
	document.getElementById("inptLocalProductoSalidadDeposito1").innerHTML = ""
	document.getElementById("inptLocalProductoListadoDespachar2").innerHTML = ""
	document.getElementById("inptlocalMoroso").innerHTML = ""
	document.getElementById("inptlocalClienteFiel").innerHTML = ""
	document.getElementById("inptlocalsolicitudCredito").innerHTML ="";
	document.getElementById("inptlocalContabilidad").innerHTML ="";
	document.getElementById("inptlocalContabilidadCompra").innerHTML =""	
	document.getElementById("inptlocalInformeProductosNoVendidos").innerHTML =""	
	document.getElementById("inptlocalProductoBuscarStock").innerHTML =""	

	document.getElementById("inptLocalVentaSolicitudCredito").innerHTML =""	
	document.getElementById("inptlocalProductoBuscarinformegralproductos").innerHTML =""	
	
	document.getElementById("inptLocalCumpleCliente").innerHTML =""	

	document.getElementById("inptlocalInformeCredito").innerHTML =""	
	document.getElementById("inptlocalCobrador").innerHTML =""	
	document.getElementById("inptBuscarInfSoliCredito5").innerHTML =""	
	document.getElementById("inptBuscarProductoMovimientoStock5").innerHTML =""	
	document.getElementById("inptBuscarInfMovimientoStock4").innerHTML =""	
	document.getElementById("inptLocalBuscarEgresoIngresoCobradores").innerHTML =""	
	document.getElementById("inptBuscarInfFotosCliente4").innerHTML =""	
	document.getElementById("inptBuscarInfUbicacionesCliente4").innerHTML =""	
	document.getElementById("inptlocalsolicitudCreditoRevision").innerHTML =""	
	document.getElementById("inptlocalsolicitudCreditoRevisionPagare").innerHTML =""	
	document.getElementById("inptBuscarInformeDeposito3").innerHTML =""	
	document.getElementById("inptlocaluserDash").innerHTML =""	
	document.getElementById("inptBuscarCampoInformeCallCenterVenta1").innerHTML =""	
	document.getElementById("inptBuscarAbmLocalMetasCobrador").innerHTML =""	
	document.getElementById("buscarInformeVentasDocumentosEntregadas8").innerHTML =""	
	document.getElementById("buscarInformeVentasDocumentosEntregadasCliente8").innerHTML =""	

	document.getElementById("inptBuscarInformeGeneralVentaLocal").innerHTML =""	
	document.getElementById("inptBuscarInformeGeneralCobroLocal").innerHTML =""	

	document.getElementById("inptLocalFuncionarios").innerHTML =""	
	document.getElementById("inptBuscarFuncionarios4").innerHTML =""	
	document.getElementById("inptlocalCalcularSalarioFuncionarios").innerHTML =""	
	document.getElementById("inptLocalFuncionariosSueldos").innerHTML =""	
	document.getElementById("inptBuscarVehivulos4").innerHTML =""	
	document.getElementById("inptLocalVehivulos").innerHTML =""	
	document.getElementById("inptlocalDatosVehiculos").innerHTML =""	
	document.getElementById("inptBuscarInformeACobrarLocal").innerHTML =""	
	document.getElementById("inptlocalDetallePrecioProducto").innerHTML =""	
	document.getElementById("inptLocalSolicitarAnulacion").innerHTML =""	
	document.getElementById("inptLocalInformeSolicitudAnulacion").innerHTML =""	
	document.getElementById("inptLocalClientesTrabajados").innerHTML =""	
	document.getElementById("inptLocalInformeClientesTrabajados").innerHTML =""	
	document.getElementById("inptBuscarProductoStockMinimoProducto5").innerHTML =""	
	document.getElementById("inptLocalActualStockMinimoProducto").innerHTML =""	
	document.getElementById("inptLocalBalanceGeneral").innerHTML =""	
	document.getElementById("inptFiltroLocalSolicitudDespacho").innerHTML =""	
	document.getElementById("inptFiltroLocalSolicitudDespacho2").innerHTML =""	
	document.getElementById("inptselectLocalHistorialCompleto").innerHTML =""	
	document.getElementById("inptlocalInformeVentasCompletadas").innerHTML =""	
	// document.getElementById("inptAbmLocalMetasVenta").innerHTML =""	
	document.getElementById("inptlocalFiltroLocalMetaVentas").innerHTML =""	
	document.getElementById("inptlocalInformeClientesNuevos").innerHTML =""	
	document.getElementById("inptBuscarComisionCobradorAgrupadoLocal").innerHTML =""	
	document.getElementById("inptBuscarLocalVerificarEquifax").innerHTML =""	
	document.getElementById("inptBuscarInformeSalarioFuncionarioGeneralLocal").innerHTML =""	
	document.getElementById("inptBuscarInformeComprasGeneralLocal").innerHTML =""	
	document.getElementById("inptBuscarLocalVerificarGestionarReferencia").innerHTML =""	
	document.getElementById("inptBuscarAbmLocalResumenCobrador").innerHTML =""	
	document.getElementById("inptBuscarInformeGeneralEgresosLocalLocal").innerHTML =""	
	document.getElementById("inptFiltroCalificacionCobrador2").innerHTML =""	
	document.getElementById("inptFiltroCalificacionVendedor2").innerHTML =""	
	

	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcasa.php",
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
			document.getElementById("inptBuscarLocalVerificarEquifax").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalDatosVehiculos").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalVehivulos").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarVehivulos4").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalFuncionariosSueldos").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalCalcularSalarioFuncionarios").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarFuncionarios4").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalFuncionarios").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocaluser").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalsolicitudCredito").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalProducto").innerHTML = datos_buscados
			document.getElementById("inptBuscarUsuario4").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalVenta").innerHTML = datos_buscados
			document.getElementById("inptlocalAperturaCierre").innerHTML = "<option value=''>SELECCIONAR</option>" +datos_buscados
			document.getElementById("inptlocalCaja").innerHTML = "<option value=''>SELECCIONAR</option>" +datos_buscados
			document.getElementById("inptlocalProductoBuscarInventario").innerHTML = "<option value=''>SELECCIONAR</option>" +datos_buscados
			document.getElementById("inptLocalProductoEnviarA").innerHTML = "<option value=''>SELECCIONAR</option>" +datos_buscados
			document.getElementById("inptBuscarProducto7").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalProductoBuscarVista").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalMisGastos").innerHTML = "<option value=''>SELECCIONAR</option>" +datos_buscados
			document.getElementById("inptlocalCompra").innerHTML = datos_buscados
			document.getElementById("inputSelectLocalVistaCompra").innerHTML = "<option value=''>SELECCIONAR</option>" +datos_buscados
			document.getElementById("inptlocalNroFactura").innerHTML = "<option value=''>SELECCIONAR</option>" +datos_buscados
			document.getElementById("inptBuscarHistorialVenta8").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarCuentasCobrar6").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalCuentasAcobrainforme").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalMisGastosBusca").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarHistorialCompra5").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalContabilidad").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalContabilidadCompra").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeProductosNoVendidos").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalArqueo").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalMetas").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalAudiProducto").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalImpago").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalClienteFiel").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeDevoluciones").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeProductosComprados").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeProductosVendidos").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeGananciaporventa").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeVentaCanceladas").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocal2InformeProductoDespachado").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocal1InformeProductoDespachado").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalProductoBuscarCatalago").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeEvaluacion").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptAbmLocalVendedor").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inputSelectLocalClientesInactivos").innerHTML =  "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalCuentaApagar").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalProductoBuscarCodBarra").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalProductoGarantia").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalVistaApCie").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalCobrosRealizados3").innerHTML = "<option value='' selected >SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarAbmCobrador3").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarVistaVendedor1").innerHTML = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalProductoListadoDespachar1").innerHTML =datos_buscados
			document.getElementById("inptLocalProductoSalidadDeposito1").innerHTML =datos_buscados
			document.getElementById("inptBuscarHistorialLocal").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalMoroso").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalVentaSolicitudCredito").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeCredito").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados	
	        document.getElementById("inptLocalProductoListadoDespachar2").innerHTML ="<option value=''>SELECCIONAR</option>" + datos[4];
	        document.getElementById("inptlocalProductoBuscarStock").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
	        document.getElementById("inptlocalProductoBuscarinformegralproductos").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalCumpleCliente").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalCobrador").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInfSoliCredito5").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarProductoMovimientoStock5").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInfMovimientoStock4").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalBuscarEgresoIngresoCobradores").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInfFotosCliente4").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInfUbicacionesCliente4").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalsolicitudCreditoRevision").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalsolicitudCreditoRevisionPagare").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInformeDeposito3").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocaluserDash").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarCampoInformeCallCenterVenta1").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarAbmLocalMetasCobrador").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("buscarInformeVentasDocumentosEntregadas8").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("buscarInformeVentasDocumentosEntregadasCliente8").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInformeGeneralVentaLocal").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptBuscarInformeGeneralCobroLocal").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptBuscarInformeACobrarLocal").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptlocalDetallePrecioProducto").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptLocalSolicitarAnulacion").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptLocalInformeSolicitudAnulacion").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptLocalClientesTrabajados").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptLocalInformeClientesTrabajados").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptBuscarProductoStockMinimoProducto5").innerHTML  = "<option value=''>TODOS</option>" + datos_buscados
			document.getElementById("inptLocalActualStockMinimoProducto").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptLocalBalanceGeneral").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptFiltroLocalSolicitudDespacho").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptFiltroLocalSolicitudDespacho2").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptselectLocalHistorialCompleto").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeVentasCompletadas").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			// document.getElementById("inptAbmLocalMetasVenta").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalFiltroLocalMetaVentas").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptlocalInformeClientesNuevos").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarComisionCobradorAgrupadoLocal").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInformeSalarioFuncionarioGeneralLocal").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInformeComprasGeneralLocal").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarLocalVerificarGestionarReferencia").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarAbmLocalResumenCobrador").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptBuscarInformeGeneralEgresosLocalLocal").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptFiltroCalificacionCobrador2").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			document.getElementById("inptFiltroCalificacionVendedor2").innerHTML  = "<option value=''>SELECCIONAR</option>" + datos_buscados
			
				   
				 seleccionarLocalUSer()
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

function buscarabmCasaOptionCuentas() {
	document.getElementById("inptBuscarCuentasCobrar6").innerHTML = "";	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionlogin"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcasa.php",
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
					document.getElementById("inptBuscarCuentasCobrar6").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
 
function seleccionarLocalUSer(){
	
	document.getElementById("inptBuscarLocalVerificarGestionarReferencia").value = cod_localFKUSer
	document.getElementById("inptBuscarLocalVerificarEquifax").value = cod_localFKUSer
	document.getElementById("inptlocalDetallePrecioProducto").value = cod_localFKUSer
	document.getElementById("inptlocalCalcularSalarioFuncionarios").value = cod_localFKUSer
	document.getElementById("inptlocalProducto").value = cod_localFKUSer
	document.getElementById("inptBuscarProducto7").value = cod_localFKUSer
	document.getElementById("inptlocalInformeProductosNoVendidos").value = cod_localFKUSer
	document.getElementById("inptlocalAudiProducto").value = cod_localFKUSer
	document.getElementById("inptAbmLocalVendedor").value = cod_localFKUSer
	document.getElementById("inptlocalProductoBuscarCodBarra").value = cod_localFKUSer
	document.getElementById("inptlocalProductoGarantia").value = cod_localFKUSer
	document.getElementById("inptBuscarAbmCobrador3").value = cod_localFKUSer
	document.getElementById("inptBuscarVistaVendedor1").value = cod_localFKUSer
	document.getElementById("inptLocalProductoListadoDespachar1").value = cod_localFKUSer
	document.getElementById("inptLocalProductoSalidadDeposito1").value = cod_localFKUSer
	document.getElementById("inptlocalProductoBuscarStock").value = cod_localFKUSer
	document.getElementById("inptlocalProductoBuscarinformegralproductos").value = cod_localFKUSer
	document.getElementById("inptBuscarAbmLocalMetasCobrador").value = cod_localFKUSer
	document.getElementById("inptLocalFuncionarios").value = cod_localFKUSer
	document.getElementById("inptBuscarFuncionarios4").value = cod_localFKUSer
	
		document.getElementById("inptlocaluser").value = cod_localFKUSer
		document.getElementById("inptlocalsolicitudCredito").value = cod_localFKUSer
		document.getElementById("inptLocalVentaSolicitudCredito").value = cod_localFKUSer		
		document.getElementById("inptLocalCumpleCliente").value = cod_localFKUSer		
		document.getElementById("inptBuscarUsuario4").value = cod_localFKUSer
		document.getElementById("inptlocalVenta").value = cod_localFKUSer
		document.getElementById("inptlocalAperturaCierre").value = cod_localFKUSer
		document.getElementById("inptlocalCaja").value = cod_localFKUSer
		document.getElementById("inptlocalProductoBuscarInventario").value = cod_localFKUSer
		document.getElementById("inputSelectLocalClientesInactivos").value = cod_localFKUSer
		document.getElementById("inptLocalProductoEnviarA").value = cod_localFKUSer
		document.getElementById("inptlocalProductoBuscarVista").value = cod_localFKUSer
		document.getElementById("inptlocalMisGastos").value = cod_localFKUSer
		document.getElementById("inptlocalCompra").value = cod_localFKUSer
		document.getElementById("inputSelectLocalVistaCompra").value = cod_localFKUSer
		document.getElementById("inptBuscarHistorialVenta8").value = cod_localFKUSer
		document.getElementById("inptlocalNroFactura").value = cod_localFKUSer
		document.getElementById("inptBuscarCuentasCobrar6").value = ""
		document.getElementById("inptlocalCuentasAcobrainforme").value = cod_localFKUSer
		document.getElementById("inptlocalMisGastosBusca").value = cod_localFKUSer
		document.getElementById("inptBuscarHistorialCompra5").value = cod_localFKUSer
		document.getElementById("inptBuscarHistorialLocal").value = cod_localFKUSer
		document.getElementById("inptlocalMetas").value = cod_localFKUSer
		document.getElementById("inptlocalArqueo").value = cod_localFKUSer
		document.getElementById("inptlocalInformeDevoluciones").value = cod_localFKUSer
		document.getElementById("inptlocalInformeProductosComprados").value = cod_localFKUSer
		document.getElementById("inptlocalInformeProductosVendidos").value = cod_localFKUSer
		document.getElementById("inptlocalInformeGananciaporventa").value = cod_localFKUSer
		document.getElementById("inptlocalInformeVentaCanceladas").value = cod_localFKUSer
		document.getElementById("inptlocalProductoBuscarCatalago").value = cod_localFKUSer
		document.getElementById("inptlocalInformeEvaluacion").value = cod_localFKUSer
		document.getElementById("inptlocalVistaApCie").value = cod_localFKUSer
		document.getElementById("inptlocalCuentaApagar").value = cod_localFKUSer
		document.getElementById("inptlocalEntregaCobrador3").value = cod_localFKUSer
		// document.getElementById("inptlocalCobrosRealizados3").value = cod_localFKUSer
		document.getElementById("inptlocalMoroso").value = cod_localFKUSer
		document.getElementById("inptlocalClienteFiel").value = cod_localFKUSer
		document.getElementById("inptlocalContabilidad").value = cod_localFKUSer
		document.getElementById("inptlocalContabilidadCompra").value = cod_localFKUSer
		document.getElementById("inptlocalInformeCredito").value = cod_localFKUSer
		document.getElementById("inptLocalSolicitarAnulacion").value = cod_localFKUSer
		document.getElementById("inptLocalInformeSolicitudAnulacion").value = cod_localFKUSer
		document.getElementById("inptselectLocalHistorialCompleto").value = cod_localFKUSer
		document.getElementById("inptlocalInformeVentasCompletadas").value = cod_localFKUSer

	
		var contrlLocal="SI";		
		
		if(controlacceso2("CAMBIARLOCAL","accion")==false){contrlLocal="NO";}
	
		if(contrlLocal=="NO"){
					
			document.getElementById("inptBuscarLocalVerificarGestionarReferencia").disabled=true
			document.getElementById("inptBuscarLocalVerificarEquifax").disabled=true
			document.getElementById("inptlocalInformeVentasCompletadas").disabled=true
			document.getElementById("inptselectLocalHistorialCompleto").disabled=true
			document.getElementById("inptLocalInformeSolicitudAnulacion").disabled=true
			document.getElementById("inptLocalSolicitarAnulacion").disabled=true
			document.getElementById("inptlocalCalcularSalarioFuncionarios").disabled=true
			document.getElementById("inptBuscarFuncionarios4").disabled=true
			document.getElementById("inptlocaluser").disabled=true
			document.getElementById("inptLocalFuncionarios").disabled=true
			document.getElementById("inptlocalsolicitudCredito").disabled=true
			document.getElementById("inptLocalVentaSolicitudCredito").disabled=true		
			document.getElementById("inptLocalCumpleCliente").disabled=true		
			document.getElementById("inptBuscarUsuario4").disabled=true
			document.getElementById("inptlocalVenta").disabled=true
			document.getElementById("inptlocalAperturaCierre").disabled=true
			document.getElementById("inptlocalCaja").disabled=true
			document.getElementById("inptlocalProductoBuscarInventario").disabled=true
			document.getElementById("inputSelectLocalClientesInactivos").disabled=true
			document.getElementById("inptLocalProductoEnviarA").disabled=true
			document.getElementById("inptlocalProductoBuscarVista").disabled=true
			document.getElementById("inptlocalMisGastos").disabled=true
			document.getElementById("inptlocalCompra").disabled=true
			document.getElementById("inputSelectLocalVistaCompra").disabled=true
			document.getElementById("inptBuscarHistorialVenta8").disabled=true
			document.getElementById("inptlocalNroFactura").disabled=true
			document.getElementById("inptBuscarCuentasCobrar6").value = ""
			document.getElementById("inptlocalCuentasAcobrainforme").disabled=true
			// document.getElementById("inptlocalMisGastosBusca").disabled=true
			document.getElementById("inptBuscarHistorialCompra5").disabled=true
			document.getElementById("inptBuscarHistorialLocal").disabled=true
			document.getElementById("inptlocalMetas").disabled=true
			document.getElementById("inptlocalArqueo").disabled=true
			document.getElementById("inptlocalInformeDevoluciones").disabled=true
			document.getElementById("inptlocalInformeProductosComprados").disabled=true
			document.getElementById("inptlocalInformeProductosVendidos").disabled=true
			document.getElementById("inptlocalInformeGananciaporventa").disabled=true
			document.getElementById("inptlocalInformeVentaCanceladas").disabled=true
			document.getElementById("inptlocalProductoBuscarCatalago").disabled=true
			document.getElementById("inptlocalInformeEvaluacion").disabled=true
			document.getElementById("inptlocalVistaApCie").disabled=true
			document.getElementById("inptlocalCuentaApagar").disabled=true
			document.getElementById("inptlocalEntregaCobrador3").disabled=true
			// document.getElementById("inptlocalCobrosRealizados3").disabled=true
			document.getElementById("inptlocalMoroso").disabled=true
			document.getElementById("inptlocalClienteFiel").disabled=true
			document.getElementById("inptlocalContabilidad").disabled=true
			document.getElementById("inptlocalContabilidadCompra").disabled=true
			document.getElementById("inptlocalInformeCredito").disabled=true
			
			document.getElementById("inptlocalProducto").disabled=true
			document.getElementById("inptBuscarProducto7").disabled=true
			document.getElementById("inptlocalInformeProductosNoVendidos").disabled=true
			document.getElementById("inptlocalAudiProducto").disabled=true
			document.getElementById("inptAbmLocalVendedor").disabled=true
			document.getElementById("inptlocalProductoBuscarCodBarra").disabled=true
			document.getElementById("inptlocalProductoGarantia").disabled=true
			document.getElementById("inptBuscarAbmCobrador3").disabled=true
			document.getElementById("inptBuscarVistaVendedor1").disabled=true
			document.getElementById("inptLocalProductoListadoDespachar1").disabled=true
			document.getElementById("inptLocalProductoSalidadDeposito1").disabled=true
			document.getElementById("inptlocalProductoBuscarStock").disabled=true
			document.getElementById("inptlocalProductoBuscarinformegralproductos").disabled=true
			
		
		}



		
}
