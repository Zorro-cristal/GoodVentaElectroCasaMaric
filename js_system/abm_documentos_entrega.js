/*
ABM DOCUMENTOS ENTREGA
*/
var listadoAbmDocumentos = null;
function iniciarListadoAbmDocumentos() {
	if (listadoAbmDocumentos || !window.AbmListadoCore) { return listadoAbmDocumentos; }
	var formulario = document.getElementById("divAbmDocumentos1");
	var cuerpo = document.getElementById("table_abm_Documentos");
	var cabecera = formulario ? formulario.querySelector("table.tableCabeceraRegistro tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraAbmDocumentos";
	var opciones = formulario.querySelector(".abm-estandar-menu-columnas");
	if (opciones) { opciones.id = "opcionesColumnasDocumentos"; }
	listadoAbmDocumentos = window.AbmListadoCore.crear({
		nombre: "documentos",
		idCabecera: "cabeceraAbmDocumentos",
		idCuerpo: "table_abm_Documentos",
		idOpcionesColumnas: "opcionesColumnasDocumentos",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmDocumentos",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmDocumentos.iniciar();
	return listadoAbmDocumentos;
}
function programarListadoAbmDocumentos() {
	setTimeout(iniciarListadoAbmDocumentos, 0);
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", programarListadoAbmDocumentos);
} else {
	programarListadoAbmDocumentos();
}
function verCerrarAbmDocumentos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmDocumentos").style.display==""){
		document.getElementById("divMinimizadoDocumentos").style.display="none"
		limpiarcamposDocumentos()
		limpiarcamposbuscarDocumentos()
 
	$("div[id=divAbmDocumentos]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADODEDOCUMENTOS","accion")==false){return;}
		mostrarSoloUno("divAbmDocumentos")	
		document.getElementById("divAbmDocumentos").style.display=""
 
	}
}
function verCerrarVentanaAbmDocumentos(d, l) {
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADODEDOCUMENTOS","accion")==false){return;}
			limpiarcamposDocumentos()
		}
		$("div[id=divAbmDocumentos2]").fadeIn(250)
		document.getElementById('divAbmDocumentos1').style.display = "none"
	} else {
		$("div[id=divAbmDocumentos1]").fadeIn(250)
		document.getElementById('divAbmDocumentos2').style.display = "none"
	}
}
function limpiarcamposbuscarDocumentos(){
	    document.getElementById('inptBuscarAbmDocumentos1').value=""
		document.getElementById("table_abm_Documentos").innerHTML = ""
		document.getElementById("inptTotalRegistoDocumentos").value = "";
}
function minimizarabmDocumentos(){
 
	$("div[id=divAbmDocumentos]").fadeOut(500);	
	document.getElementById("divMinimizadoDocumentos").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmDocumentos"));
}
function verVentanaEditarDocumentos() {
	if (idAbmDocumentos == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADODEDOCUMENTOS","accion")==false){return;}
	verCerrarVentanaAbmDocumentos("1", "2")
}
var idAbmDocumentos = ""
function ObtenerdatosAbmDocumentos(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptDescripcionDocumentos').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccDocumentos').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoDocumentos').value = $(datostr).children('td[id="td_datos_2"]').html();
	
	document.getElementById('btnAbmDocumentos').value = "Editar datos";
	document.getElementById('btnEditarDatosDocumentos').style.backgroundColor="";
	idAbmDocumentos = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposDocumentos() {
	var inptDescripcionDocumentos = document.getElementById('inptDescripcionDocumentos').value
	var inptEstadoDocumentos = document.getElementById('inptEstadoDocumentos').value
	
	if (inptDescripcionDocumentos == "") {
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return false;
	}
	
	var accion = "";
	if (idAbmDocumentos != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADODEDOCUMENTOS","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADODEDOCUMENTOS","accion")==false){return;}
	}
	abmDocumentos(inptDescripcionDocumentos,inptEstadoDocumentos , idAbmDocumentos, accion);
}
function abmDocumentos(descripcion,estado,idDocumentos, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idDocumentos)
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
					limpiarcamposDocumentos()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmDocumentos = ""
					buscarabmDocumentos();
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
function buscarabmDocumentos() {
	if(controlacceso("BUSCARLISTADODEDOCUMENTOS","accion")==false){return;}
	var listado = iniciarListadoAbmDocumentos();
	var descripcion = document.getElementById('inptBuscarAbmDocumentos1').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarDocumentos1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_Documentos").innerHTML = paginacargando
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
		url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Documentos").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Documentos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptTotalRegistoDocumentos").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposDocumentos() {
	document.getElementById('inptDescripcionDocumentos').value = "";
	document.getElementById('inptRegistroSeleccDocumentos').value = "";
	document.getElementById('inptEstadoDocumentos').value = "Activo";
	document.getElementById('btnEditarDatosDocumentos').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmDocumentos').value = "Guardar datos";
	idAbmDocumentos= "";
}


/* INFORME CAJA DE COBRADOR */
function verCerrarInformeCajaCobrador(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeCajaCobrador").style.display==""){
		document.getElementById("divMinimizadoInformeCajaCobrador").style.display="none"

	$("div[id=divInformeCajaCobrador]").fadeOut(500);	
limpiarInformeCajaCobrador()	
	}else{	
if(controlacceso("VERINFORMECAJACOBRADOR","accion")==false){return;}
mostrarSoloUno("divInformeCajaCobrador")	
		document.getElementById("divInformeCajaCobrador").style.display=""
		  
	}
}
function minimizarInformeCajaCobrador(){
	$("div[id=divInformeCajaCobrador]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeCajaCobrador").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuInformeCajaCobrador"));
}
function limpiarInformeCajaCobrador(){
	document.getElementById('inptBuscarInformeCajaCobrador1').value = ''
	document.getElementById('inptBuscarInformeCajaCobrador3').value = ''
	document.getElementById('inptBuscarInformeCajaCobrador4').value = ''
	document.getElementById('inptBuscarInformeCajaCobrador2').value = ''
	document.getElementById('inptTotalRegistoInformeCajaCobrador').value = ''
	document.getElementById('inptTotalRecaudadoInformeCajaCobrador').value = ''
	
	document.getElementById('inptTotalEgresoInformeCajaCobrador').value = ''
	document.getElementById('inptTotalADepositarInformeCajaCobrador').value = ''
	
	
	document.getElementById('table_informe_caja_cobrador').innerHTML = ''
	checkHistorialInformeCajaCobrador(1)
}

function checkHistorialInformeCajaCobrador(d){	
	if(d=="1"){
		document.getElementById('checkHistorialInformeCajaCobrador1').checked=true
		document.getElementById('checkHistorialInformeCajaCobrador2').checked=false
		document.getElementById('inptBuscarInformeCajaCobradorF1').value = "";
	    document.getElementById('inptBuscarInformeCajaCobradorF2').value = "";	
	}else{		
		document.getElementById('checkHistorialInformeCajaCobrador1').checked=false
		document.getElementById('checkHistorialInformeCajaCobrador2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeCajaCobradorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeCajaCobradorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
var listadoInformeCajaCobrador = null;
function iniciarListadoInformeCajaCobrador() {
	if (listadoInformeCajaCobrador || !window.AbmListadoCore) return listadoInformeCajaCobrador;
	var cuerpo = document.getElementById('table_informe_caja_cobrador');
	if (!cuerpo) return null;
	var anterior = cuerpo.previousElementSibling;
	var cabecera = null;
	while (anterior) {
		if (anterior.tagName === 'TABLE' && anterior.classList.contains('tableCabeceraRegistro') && !anterior.querySelector('input, select, textarea')) {
			cabecera = anterior.querySelector('tr');
			break;
		}
		anterior = anterior.previousElementSibling;
	}
	if (!cabecera) return null;
	cabecera.id = 'cabeceraInformeCajaCobrador';
	listadoInformeCajaCobrador = window.AbmListadoCore.crear({
		nombre: 'informeCajaCobrador', idCabecera: 'cabeceraInformeCajaCobrador', idCuerpo: 'table_informe_caja_cobrador', ordenInicial: 'fecha_apertura',
		columnas: [
			{ campo: 'cobrador', titulo: 'COBRADOR', ancho: '10%' },
			{ campo: 'fecha_apertura', titulo: 'FECHA APERTURA', ancho: '10%' },
			{ campo: 'fecha_cierre', titulo: 'FECHA CIERRE', ancho: '10%' },
			{ campo: 'monto_recaudado', titulo: 'MONTO RECAUDADO', ancho: '10%' },
			{ campo: 'estado', titulo: 'ESTADO', ancho: '10%' },
			{ campo: 'detalle_ingreso', titulo: 'DETALLES', ancho: '30%' },
			{ campo: 'a_depositar', titulo: 'A DEPOSITAR', ancho: '10%' }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento('table', { className: indice % 2 ? 'tableRegistroSearch' : 'tableRegistroSearch2' });
			tabla.setAttribute('border', '1'); tabla.setAttribute('cellspacing', '1'); tabla.setAttribute('cellpadding', '5');
			var fila = utilidades.crearElemento('tr', { id: 'tbSelecRegistro' });
			fila.addEventListener('click', function () { if (typeof obtenerdatosaperturacierrecajaapp === 'function') obtenerdatosaperturacierrecajaapp(this); });
			var tecnico = utilidades.crearElemento('td', { id: 'td_id_1' });
			tecnico.style.display = 'none'; tecnico.textContent = registro.codigo == null ? '' : registro.codigo; fila.appendChild(tecnico);
			var ids = { cobrador:'td_datos_1', fecha_apertura:'td_datos_9', fecha_cierre:'td_datos_3', monto_recaudado:'td_datos_7', estado:'td_datos_5', detalle_ingreso:'td_datos_6', a_depositar:'td_datos_8' };
			columnas.forEach(function (columna) {
				var celda = utilidades.crearElemento('td', { id: ids[columna.campo], dataset: { columna: columna.campo } });
				celda.style.width = columna.ancho;
				if (columna.campo === 'detalle_ingreso') {
					var detalle = document.createElement('table'); detalle.style.width = '100%';
					var filaDetalle = document.createElement('tr');
					var ingreso = document.createElement('td'); ingreso.style.width = '50%'; ingreso.style.textAlign = 'center'; ingreso.textContent = registro.detalle_ingreso_formateado || '0';
					var egreso = document.createElement('td'); egreso.style.width = '50%'; egreso.style.textAlign = 'center'; egreso.textContent = registro.detalle_egreso_formateado || '0';
					filaDetalle.appendChild(ingreso); filaDetalle.appendChild(egreso); detalle.appendChild(filaDetalle); celda.appendChild(detalle);
				} else {
					var campoMostrar = columna.campo === 'monto_recaudado' ? 'monto_recaudado_formateado' : (columna.campo === 'a_depositar' ? 'a_depositar_formateado' : columna.campo);
					celda.textContent = registro[campoMostrar] == null ? '' : registro[campoMostrar];
				}
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoInformeCajaCobrador.iniciar();
	return listadoInformeCajaCobrador;
}

function buscarInformeCajaCobrador() {
	var fecha1 = document.getElementById('inptBuscarInformeCajaCobradorF1').value
	var fecha2 = document.getElementById('inptBuscarInformeCajaCobradorF2').value
	var cobrador = document.getElementById('inptBuscarInformeCajaCobrador1').value
	var estado = document.getElementById('inptBuscarInformeCajaCobrador2').value
	var fecha_apertura = document.getElementById('inptBuscarInformeCajaCobrador3').value
	var fecha_cierre = document.getElementById('inptBuscarInformeCajaCobrador4').value
	document.getElementById("table_informe_caja_cobrador").innerHTML = paginacargando;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrador": cobrador,
		"estado": estado,
		"fecha_apertura": fecha_apertura,
		"fecha_cierre": fecha_cierre,
		"formato": "json",
		"funt": "buscarinformecajacobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_caja_cobrador").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_informe_caja_cobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					var listado = iniciarListadoInformeCajaCobrador();
					if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_informe_caja_cobrador").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistoInformeCajaCobrador").value = datos[3];
					document.getElementById('inptTotalRecaudadoInformeCajaCobrador').value = datos[4];
					document.getElementById('inptTotalEgresoInformeCajaCobrador').value = datos[5];
					document.getElementById('inptTotalADepositarInformeCajaCobrador').value = datos[6];
				}
				
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoInformeCajaCobrador);
else iniciarListadoInformeCajaCobrador();

