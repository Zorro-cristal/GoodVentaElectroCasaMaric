/*
ABM MORA CLIENTE
*/
function verCerrarAbmMoraCliente(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmMoraCliente").style.display==""){
		document.getElementById("divMinimizadoMoraCliente").style.display="none"
		limpiarcamposMoraCliente()
		limpiarcamposbuscarMoraCliente()
 
	$("div[id=divAbmMoraCliente]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADODEMORACLIENTE","accion")==false){return;}
		mostrarSoloUno("divAbmMoraCliente")	
		document.getElementById("divAbmMoraCliente").style.display=""
 
	}
}
function verCerrarVentanaAbmMoraCliente(d, l) {
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADODEMORACLIENTE","accion")==false){return;}
			limpiarcamposMoraCliente()
		}
		$("div[id=divAbmMoraCliente2]").fadeIn(250)
		document.getElementById('divAbmMoraCliente1').style.display = "none"
	} else {
		$("div[id=divAbmMoraCliente1]").fadeIn(250)
		document.getElementById('divAbmMoraCliente2').style.display = "none"
	}
}
function limpiarcamposbuscarMoraCliente(){
	    document.getElementById('inptBuscarAbmMoraCliente1').value=""
		document.getElementById("table_abm_MoraCliente").innerHTML = ""
		document.getElementById("inptTotalRegistoMoraCliente").value = "";
}
function minimizarabmMoraCliente(){ 
	$("div[id=divAbmMoraCliente]").fadeOut(500);	
	document.getElementById("divMinimizadoMoraCliente").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmMoraCliente"));
}
function verVentanaEditarMoraCliente() {
	if (idAbmMoraCliente == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADODEMORACLIENTE","accion")==false){return;}
	verCerrarVentanaAbmMoraCliente("1", "2")
}
var idAbmMoraCliente = ""
var listadoAbmMoraCliente = null
function iniciarListadoAbmMoraCliente() {
	if (listadoAbmMoraCliente || !window.AbmListadoCore) return listadoAbmMoraCliente
	var cuerpo = document.getElementById('table_abm_MoraCliente')
	if (!cuerpo) return null
	var cabecera = cuerpo.previousElementSibling
	while (cabecera && (cabecera.tagName !== 'TABLE' || cabecera.querySelector('input,select,textarea'))) cabecera = cabecera.previousElementSibling
	if (!cabecera) return null
	cabecera.id = 'cabeceraAbmMoraCliente'
	listadoAbmMoraCliente = window.AbmListadoCore.crear({
		nombre: 'mora_cliente',
		idCabecera: 'cabeceraAbmMoraCliente',
		idCuerpo: 'table_abm_MoraCliente',
		ordenInicial: 'nombre',
		columnas: [
			{ campo: 'nombre', titulo: 'DESCRIPCION', ancho: '34%' },
			{ campo: 'desde', titulo: 'DESDE', ancho: '33%' },
			{ campo: 'hasta', titulo: 'HASTA', ancho: '33%' }
		],
		fila: {
			funcionSeleccion: 'ObtenerdatosAbmMoraCliente',
			celdas: [
				{ id: 'td_id', campo: 'codigo', tecnica: true },
				{ id: 'td_datos_1', campo: 'nombre', columna: 'nombre', className: 'tdRegistroSearch' },
				{ id: 'td_datos_3', campo: 'desde', columna: 'desde', className: 'tdRegistroSearch' },
				{ id: 'td_datos_4', campo: 'hasta', columna: 'hasta', className: 'tdRegistroSearch' },
				{ id: 'td_datos_2', campo: 'estado', tecnica: true },
				{ id: 'td_datos_5', campo: 'puntaje', tecnica: true }
			]
		}
	})
	listadoAbmMoraCliente.iniciar()
	return listadoAbmMoraCliente
}
function ObtenerdatosAbmMoraCliente(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreMoraCliente').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptDiaDesdeMoraCliente').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptDiaHastaMoraCliente').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptPuntajeMoraCliente').value = $(datostr).children('td[id="td_datos_5"]').html();
	
	
	document.getElementById('inptRegistroSeleccMoraCliente').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoMoraCliente').value = $(datostr).children('td[id="td_datos_2"]').html();
	
	document.getElementById('btnAbmMoraCliente').value = "Editar datos";
	document.getElementById('btnEditarDatosMoraCliente').style.backgroundColor="";
	idAbmMoraCliente = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposMoraCliente() {
	var inptNombreMoraCliente = document.getElementById('inptNombreMoraCliente').value
	var inptDiaDesdeMoraCliente = document.getElementById('inptDiaDesdeMoraCliente').value
	var inptDiaHastaMoraCliente = document.getElementById('inptDiaHastaMoraCliente').value
	var inptEstadoMoraCliente = document.getElementById('inptEstadoMoraCliente').value
	var inptPuntajeMoraCliente = document.getElementById('inptPuntajeMoraCliente').value
	if (inptNombreMoraCliente == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL BANCO")
		return false;
	}
	if (inptDiaDesdeMoraCliente == "") {
		ver_vetana_informativa("FALTO INGRESAR DESDE CUANTOS DÍAS")
		return false;
	}
	if (inptDiaHastaMoraCliente == "") {
		ver_vetana_informativa("FALTO INGRESAR HASTA CUANTOS DÍAS")
		return false;
	}
	
	if (inptPuntajeMoraCliente == "") {
		ver_vetana_informativa("FALTO INGRESAR EL PUNTAJE PARA EL COBRADOR")
		return false;
	}
	
	var accion = "";
	if (idAbmMoraCliente != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADODEMORACLIENTE","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADODEMORACLIENTE","accion")==false){return;}
	}
	abmMoraCliente(inptPuntajeMoraCliente,inptNombreMoraCliente,inptDiaDesdeMoraCliente,inptDiaHastaMoraCliente,inptEstadoMoraCliente , idAbmMoraCliente, accion);
}
function abmMoraCliente(puntaje,nombre,diadesde,diahasta,estado,idMoraCliente, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idmora_cliente", idMoraCliente)
	datos.append("nombre", nombre)
	datos.append("diadesde", diadesde)
	datos.append("diahasta", diahasta)
	datos.append("estado", estado)
	datos.append("puntaje", puntaje)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
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
					limpiarcamposMoraCliente()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmMoraCliente = ""
					buscarabmMoraCliente();
					BuscarAbmTipoBusqueda()
					BuscarAbmTipoBusquedaCredito()
					buscaroptionMoraCliente();
					buscarOptionCliente()
					buscarOptionMoraCobrosRealizados()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoMoraCliente(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarMoraCliente1').checked=true
	document.getElementById('inptSeleccEstadoBuscarMoraCliente2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarMoraCliente1').checked=false
	document.getElementById('inptSeleccEstadoBuscarMoraCliente2').checked=true
	}
}
function buscarabmMoraCliente() {
	if(controlacceso("BUSCARLISTADODEMORACLIENTE","accion")==false){return;}
	var listado = iniciarListadoAbmMoraCliente()
	var nombre = document.getElementById('inptBuscarAbmMoraCliente1').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarMoraCliente1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_MoraCliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nombre": nombre,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_MoraCliente").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_MoraCliente").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoMoraCliente").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmMoraCliente)
else iniciarListadoAbmMoraCliente()
function limpiarcamposMoraCliente() {
	document.getElementById('inptNombreMoraCliente').value = "";
	document.getElementById('inptDiaDesdeMoraCliente').value = "";
	document.getElementById('inptDiaHastaMoraCliente').value = "";
	document.getElementById('inptPuntajeMoraCliente').value = "";
	document.getElementById('inptRegistroSeleccMoraCliente').value = "";
	document.getElementById('inptEstadoMoraCliente').value = "Activo";
	document.getElementById('btnEditarDatosMoraCliente').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmMoraCliente').value = "Guardar datos";
	idAbmMoraCliente= "";
}
function buscaroptionMoraCliente() {
	document.getElementById("inptTipoCuentasClienteMoroso").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptTipoCuentasClienteMoroso").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptTipoCuentasClienteMoroso").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptTipoCuentasClienteMoroso").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


function buscarOptionCliente() {
	document.getElementById("inptCalificaCliente").innerHTML = ""
	document.getElementById("inptBuscarAbmCliente6").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOptionCliente"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptCalificaCliente").innerHTML = ''
			document.getElementById("inptBuscarAbmCliente6").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptCalificaCliente").innerHTML = ''
			document.getElementById("inptBuscarAbmCliente6").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptCalificaCliente").innerHTML = datos_buscados
					document.getElementById("inptBuscarAbmCliente6").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


function buscarOptionMoraCobrosRealizados() {
	document.getElementById("inptMorosidadCobrosRealizado").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOptionMoraCobrosRealizados"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptMorosidadCobrosRealizado").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptMorosidadCobrosRealizado").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptMorosidadCobrosRealizado").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


/*
MOVIMIENTO STOCK
*/
function verCerrarMovimientoStock(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divMovimientoStock").style.display==""){
		document.getElementById("divMinimizadoMovimientoStock").style.display="none"
 
	$("div[id=divMovimientoStock]").fadeOut(500);	
	limpiarcamposbuscarMovimientoStock()
	limpiarcamposMovimientoStock()
	}else{		
		
		if(controlacceso("VERMOVIMIENTOSTOCK","accion")==false){return;}
		mostrarSoloUno("divMovimientoStock")	
		document.getElementById("divMovimientoStock").style.display=""
 
	}
}
function verCerrarVentanaMovimientoStock(d, l) {
	if (d == "1") {	
	if(idAbmProductoMovimientoStock == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN PRODUCTO")
		return;
	}
	
		$("div[id=divMovimientoStock2]").fadeIn(250)
		document.getElementById('divMovimientoStock1').style.display = "none"
	} else {
		$("div[id=divMovimientoStock1]").fadeIn(250)
		document.getElementById('divMovimientoStock2').style.display = "none"
	}
}
function limpiarcamposbuscarMovimientoStock(){
		document.getElementById("table_abm_MovimientoStock").innerHTML = ""
		document.getElementById("inptBuscarProductoMovimientoStock1").value = ""
		document.getElementById("inptBuscarProductoMovimientoStock2").value = ""
		document.getElementById("inptBuscarProductoMovimientoStock3").value = ""
		document.getElementById("inptBuscarProductoMovimientoStock4").value = ""
		document.getElementById("inptBuscarProductoMovimientoStock5").value = ""
		document.getElementById("inptRegistroSeleccMovimientoStock").value = ""
		document.getElementById("inptTotalRegistoMovimientoStock").value = ""
		document.getElementById('btnModificarMovimientoStock').backgroundColor = '#b7b7b7'
}
function minimizarMovimientoStock(){ 
	$("div[id=divMovimientoStock]").fadeOut(500);	
	document.getElementById("divMinimizadoMovimientoStock").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuMovimientoStock"));
}

function verificarcamposMovimientoStock() {
	var inptMotivoMovimientoStock = document.getElementById('inptMotivoMovimientoStock').value
	var inptCantidadMovimientoStock = document.getElementById('inptCantidadMovimientoStock').value
	var inptTipoMovimientoStock = document.getElementById('inptTipoMovimientoStock').value
	
	
	if (inptCantidadMovimientoStock == "") {
		ver_vetana_informativa("FALTO INGRESAR LA CANTIDAD")
		return false;
	}
	if (parseInt(inptCantidadMovimientoStock) <= 0) {
		ver_vetana_informativa("LA CANTIDAD DEBE SER MAYOR A 0")
		return false;
	}
	if (inptTipoMovimientoStock == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL TIPO")
		return false;
	}
	if (inptMotivoMovimientoStock == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL MOTIVO")
		return false;
	}
	
	
	var accion = "modificar_stock";
	abmMovimientoStock(inptCantidadMovimientoStock,inptTipoMovimientoStock , inptMotivoMovimientoStock, accion);
}
function abmMovimientoStock(cantidad,tipo,cod_motivo, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cantidad", cantidad)
	datos.append("tipo", tipo)
	datos.append("cod_motivo", cod_motivo)
	datos.append("cod_localFK", cod_localFKMovimientoStock)
	datos.append("cod_productoFK", idAbmProductoMovimientoStock)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					limpiarcamposMovimientoStock()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmProductoMovimientoStock = ""
					document.getElementById('inptRegistroSeleccMovimientoStock').value = ''
					document.getElementById('btnModificarMovimientoStock').backgroundColor = '#b7b7b7'
					buscarProductosMovimientoStock();
					verCerrarVentanaMovimientoStock('2','')
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function checkestadoDocumentos(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarDocumentos1').checked=true
	document.getElementById('inptSeleccEstadoBuscarDocumentos2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarDocumentos1').checked=false
	document.getElementById('inptSeleccEstadoBuscarDocumentos2').checked=true
	}
}

function buscarCabeceraListadoStock(cuerpo, idCabecera) {
	var cabecera = document.getElementById(idCabecera);
	if (cabecera) return cabecera;
	var actual = cuerpo ? cuerpo.previousElementSibling : null;
	while (actual) {
		if (actual.tagName === "TABLE" && actual.querySelector(".td_registro") && !actual.querySelector("input, select, textarea")) {
			actual.id = idCabecera;
			return actual;
		}
		actual = actual.previousElementSibling;
	}
	return null;
}

var listadoProductosMovimientoStock = null;
function iniciarListadoProductosMovimientoStock() {
	if (listadoProductosMovimientoStock || !window.AbmListadoCore) return listadoProductosMovimientoStock;
	var cuerpo = document.getElementById("table_abm_MovimientoStock");
	var cabecera = buscarCabeceraListadoStock(cuerpo, "cabeceraProductosMovimientoStock");
	if (!cuerpo || !cabecera) return null;
	listadoProductosMovimientoStock = window.AbmListadoCore.crear({
		nombre: "productos_movimiento_stock",
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: "producto",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "10%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "categoria", titulo: "CATEGORIA", ancho: "10%" },
			{ campo: "stock", titulo: "STOCK", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosMovimientoStock",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_19", campo: "codigo_barra", columna: "codigo_barra", className: "tdRegistroSearch" },
				{ id: "td_datos_1", campo: "producto", columna: "producto", className: "tdRegistroSearch" },
				{ id: "td_datos_12", campo: "impuesto", tecnica: true },
				{ id: "td_datos_13", campo: "marca", columna: "marca", className: "tdRegistroSearch" },
				{ id: "td_datos_11", campo: "categoria", columna: "categoria", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "descripcion", tecnica: true },
				{ id: "td_datos_3", campo: "unidad", tecnica: true },
				{ id: "td_datos_6", campo: "stock_formateado", columna: "stock", className: "tdRegistroSearch" },
				{ id: "td_datos_4", campo: "precio_formateado", tecnica: true },
				{ id: "td_datos_5", campo: "costo_formateado", tecnica: true },
				{ id: "td_datos_18", campo: "total_costo_formateado", tecnica: true },
				{ id: "td_datos_22", campo: "proveedor", tecnica: true },
				{ id: "td_datos_24", campo: "promo", tecnica: true },
				{ campo: "local", columna: "local", className: "tdRegistroSearch" },
				{ id: "td_datos_7", campo: "codigo_local", tecnica: true },
				{ id: "td_datos_8", campo: "comision", tecnica: true },
				{ id: "td_datos_9", campo: "estado", tecnica: true },
				{ id: "td_datos_10", campo: "codigo_local", tecnica: true },
				{ id: "td_datos_14", campo: "codigo_categoria", tecnica: true },
				{ id: "td_datos_15", campo: "codigo_marca", tecnica: true },
				{ id: "td_datos_16", campo: "codigo_impuesto", tecnica: true },
				{ id: "td_datos_17", campo: "porcentaje", tecnica: true },
				{ id: "td_datos_20", campo: "tipo", tecnica: true },
				{ id: "td_datos_23", campo: "codigo_proveedor", tecnica: true },
				{ id: "td_datos_100", campo: "usuario_alta", tecnica: true },
				{ id: "td_datos_101", campo: "usuario_edicion", tecnica: true },
				{ id: "td_datos_102", campo: "fecha_alta", tecnica: true },
				{ id: "td_datos_103", campo: "fecha_edicion", tecnica: true },
				{ id: "td_datos_104", campo: "link", tecnica: true },
				{ id: "td_datos_105", campo: "imagen_url", tecnica: true },
				{ id: "td_datos_106", campo: "stock_minimo", tecnica: true }
			]
		}
	});
	listadoProductosMovimientoStock.iniciar();
	return listadoProductosMovimientoStock;
}

var listadoProductosStockMinimo = null;
function iniciarListadoProductosStockMinimo() {
	if (listadoProductosStockMinimo || !window.AbmListadoCore) return listadoProductosStockMinimo;
	var cuerpo = document.getElementById("table_abm_StockMinimoProducto");
	var cabecera = buscarCabeceraListadoStock(cuerpo, "cabeceraProductosStockMinimo");
	if (!cuerpo || !cabecera) return null;
	listadoProductosStockMinimo = window.AbmListadoCore.crear({
		nombre: "productos_stock_minimo",
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: "producto",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "10%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "categoria", titulo: "CATEGORIA", ancho: "10%" },
			{ campo: "stock_minimo", titulo: "STOCK MINIMO", ancho: "10%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosStockMinimoProducto",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_19", campo: "codigo_barra", columna: "codigo_barra", className: "tdRegistroSearch" },
				{ id: "td_datos_1", campo: "producto", columna: "producto", className: "tdRegistroSearch" },
				{ id: "td_datos_13", campo: "marca", columna: "marca", className: "tdRegistroSearch" },
				{ id: "td_datos_11", campo: "categoria", columna: "categoria", className: "tdRegistroSearch" },
				{ id: "td_datos_6", campo: "stock_minimo_formateado", columna: "stock_minimo", className: "tdRegistroSearch" },
				{ campo: "proveedor", columna: "proveedor", className: "tdRegistroSearch" },
				{ campo: "local", columna: "local", className: "tdRegistroSearch" },
				{ id: "td_datos_7", campo: "codigo_local", tecnica: true }
			]
		}
	});
	listadoProductosStockMinimo.iniciar();
	return listadoProductosStockMinimo;
}
function buscarProductosMovimientoStock() {
	var codigo = document.getElementById('inptBuscarProductoMovimientoStock1').value
	var producto = document.getElementById('inptBuscarProductoMovimientoStock2').value
	var busquedaGeneral = String(window.busquedaGeneralMovimientoStock || "")
	var marca = document.getElementById('inptBuscarProductoMovimientoStock3').value
	var categoria = document.getElementById('inptBuscarProductoMovimientoStock4').value
	var local = document.getElementById('inptBuscarProductoMovimientoStock5').value
	var stock = document.getElementById('inptBuscarProductoMovimientoStock6').value
	
	document.getElementById("table_abm_MovimientoStock").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"producto": producto,
		"busqueda_general": busquedaGeneral,
		"marca": marca,
		"categoria": categoria,
		"local": local,
		"stock": stock,
		"formato": "json",
		"funt": "buscar_producto_movimiento_stock"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_MovimientoStock").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_MovimientoStock").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					var listado = iniciarListadoProductosMovimientoStock();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_MovimientoStock").innerHTML = datos_buscados || "";
					document.getElementById("inptTotalRegistoMovimientoStock").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposMovimientoStock() {
	document.getElementById('inptProductoMovimientoStock').value = ''
	document.getElementById('inptStockActualMovimientoStock').value = ''
	document.getElementById('inptCantidadMovimientoStock').value = ''
	document.getElementById('inptTipoMovimientoStock').value = ''
	document.getElementById('inptMotivoMovimientoStock').value = ''
}
var idAbmProductoMovimientoStock = ""
var cod_localFKMovimientoStock = "";
function ObtenerdatosMovimientoStock(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('btnModificarMovimientoStock').style.backgroundColor="";
	idAbmProductoMovimientoStock = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptRegistroSeleccMovimientoStock').value =  $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptProductoMovimientoStock').value =  $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptStockActualMovimientoStock').value =  $(datostr).children('td[id="td_datos_6"]').html();
	cod_localFKMovimientoStock = $(datostr).children('td[id="td_datos_7"]').html()
}


/*
STOCK MINIMO PRODUCTO
*/
function verCerrarStockMinimoProducto(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divStockMinimoProducto").style.display==""){
		document.getElementById("divMinimizadoStockMinimoProducto").style.display="none"
 
	$("div[id=divStockMinimoProducto]").fadeOut(500);	
	limpiarcamposbuscarStockMinimoProducto()
	limpiarcamposStockMinimoProducto()
	}else{		
		
		if(controlacceso("VERSTOCKMINIMOPRODUCTO","accion")==false){return;}
		mostrarSoloUno("divStockMinimoProducto")	
		document.getElementById("divStockMinimoProducto").style.display=""
 
	}
}
function verCerrarVentanaStockMinimoProducto(d, l) {
	if (d == "1") {	
	if(idAbmProductoStockMinimoProducto == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN PRODUCTO")
		return;
	}
	
		$("div[id=divStockMinimoProducto2]").fadeIn(250)
		document.getElementById('divStockMinimoProducto1').style.display = "none"
	} else {
		$("div[id=divStockMinimoProducto1]").fadeIn(250)
		document.getElementById('divStockMinimoProducto2').style.display = "none"
	}
}
function limpiarcamposbuscarStockMinimoProducto(){
		document.getElementById("table_abm_StockMinimoProducto").innerHTML = ""
		document.getElementById("inptBuscarProductoStockMinimoProducto1").value = ""
		document.getElementById("inptBuscarProductoStockMinimoProducto2").value = ""
		document.getElementById("inptBuscarProductoStockMinimoProducto3").value = ""
		document.getElementById("inptBuscarProductoStockMinimoProducto4").value = ""
		document.getElementById("inptBuscarProductoStockMinimoProducto5").value = ""
		document.getElementById("inptRegistroSeleccStockMinimoProducto").value = ""
		document.getElementById("inptTotalRegistoStockMinimoProducto").value = ""
		document.getElementById("inptProveedorStockMinimoProducto").value = ""
		document.getElementById('btnModificarStockMinimoProducto').backgroundColor = '#b7b7b7'
}
function minimizarStockMinimoProducto(){ 
	$("div[id=divStockMinimoProducto]").fadeOut(500);	
	document.getElementById("divMinimizadoStockMinimoProducto").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuStockMinimoProducto"));
}

function verificarcamposStockMinimoProducto() {
	var inptCantidadStockMinimoProducto = document.getElementById('inptCantidadStockMinimoProducto').value
	var inptLocalActualStockMinimoProducto = document.getElementById('inptLocalActualStockMinimoProducto').value
	
	
	if (inptCantidadStockMinimoProducto == "") {
		ver_vetana_informativa("FALTO INGRESAR LA CANTIDAD")
		return false;
	}
	if (parseInt(inptCantidadStockMinimoProducto) <= 0) {
		ver_vetana_informativa("LA CANTIDAD DEBE SER MAYOR A 0")
		return false;
	}
	
	
	
	
	

	abmStockMinimoProducto(inptCantidadStockMinimoProducto,inptLocalActualStockMinimoProducto);
}
function abmStockMinimoProducto(cantidad,cod_localFK) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "modificar_stock_minimo")
	datos.append("cantidad", cantidad)
	datos.append("cod_localFK", cod_localFK)
	datos.append("cod_productoFK", idAbmProductoStockMinimoProducto)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					limpiarcamposStockMinimoProducto()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmProductoStockMinimoProducto = ""
					document.getElementById('inptRegistroSeleccStockMinimoProducto').value = ''
					document.getElementById('btnModificarStockMinimoProducto').backgroundColor = '#b7b7b7'
					buscarProductosStockMinimoProducto();
					verCerrarVentanaStockMinimoProducto('2','')
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function buscarProductosStockMinimoProducto() {
	var codigo = document.getElementById('inptBuscarProductoStockMinimoProducto1').value
	var producto = document.getElementById('inptBuscarProductoStockMinimoProducto2').value
	var marca = document.getElementById('inptBuscarProductoStockMinimoProducto3').value
	var categoria = document.getElementById('inptBuscarProductoStockMinimoProducto4').value
	var local = document.getElementById('inptBuscarProductoStockMinimoProducto5').value
	var proveedor = document.getElementById('inptProveedorStockMinimoProducto').value
	
	
	document.getElementById("table_abm_StockMinimoProducto").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"producto": producto,
		"marca": marca,
		"categoria": categoria,
		"local": local,
		"proveedor": proveedor,
		"formato": "json",
		"funt": "buscar_producto_stock_minimo_producto"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_StockMinimoProducto").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_StockMinimoProducto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					var listado = iniciarListadoProductosStockMinimo();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_StockMinimoProducto").innerHTML = datos_buscados || "";
					document.getElementById("inptTotalRegistoStockMinimoProducto").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposStockMinimoProducto() {
	document.getElementById('inptProductoStockMinimoProducto').value = ''
	document.getElementById('inptStockActualStockMinimoProducto').value = ''
	document.getElementById('inptCantidadStockMinimoProducto').value = ''
	document.getElementById('inptLocalActualStockMinimoProducto').value = ''
}
var idAbmProductoStockMinimoProducto = ""
function ObtenerdatosStockMinimoProducto(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('btnModificarStockMinimoProducto').style.backgroundColor="";
	idAbmProductoStockMinimoProducto = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptRegistroSeleccStockMinimoProducto').value =  $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptProductoStockMinimoProducto').value =  $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptStockActualStockMinimoProducto').value =  $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptLocalActualStockMinimoProducto').value =  $(datostr).children('td[id="td_datos_7"]').html();
}




