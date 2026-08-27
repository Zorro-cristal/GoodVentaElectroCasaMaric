/*
ABM AGENDA
*/
function verCerrarAbmAgenda()
{
		document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmAgenda").style.display==""){
		document.getElementById("divMinimizadoAgenda").style.display="none"
		limpiarcamposAgenda()
		// limpiarcamposbuscarTipoPago()
		 
		$("div[id=divAbmAgenda]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERAGENDA","accion")==false){return;}
		mostrarSoloUno("divAbmAgenda")	
		document.getElementById("divAbmAgenda").style.display=""
		 
	}
}
function verCerrarVentanaAbmAgenda(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			limpiarcamposAgenda()
		}
		$("div[id=divAbmAgenda2]").fadeIn(250)
		document.getElementById('divAbmAgenda1').style.display = "none"
	} else {
		$("div[id=divAbmAgenda1]").fadeIn(250)
		document.getElementById('divAbmAgenda2').style.display = "none"
	}
}
function limpiarcamposbuscarAgenda(){
	    document.getElementById('inptBuscarAbmAgenda2').value=""
		if (listadoAbmAgenda) listadoAbmAgenda.establecerRegistros([])
		else document.getElementById("table_abm_Agenda").innerHTML = ""
		document.getElementById("inptTotalRegistoAgenda").value = "";
}
function minimizarabmAgenda(){ 
	$("div[id=divAbmAgenda]").fadeOut(500);	
	document.getElementById("divMinimizadoAgenda").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAgenda"));
}
function verVentanaEditarAgenda() {
	if (idAbmAgenda == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	verCerrarVentanaAbmAgenda("1", "2")
}
var idAbmAgenda = ""
var cod_clienteAgenda = ""
function obtenerdatosabmAgenda(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptClienteAgenda').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptRegistroSeleccAgenda').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptMotivoAgenda').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptCompromisoAgenda').value = $(datostr).children('td[id="td_datos_5"]').html();
	
	document.getElementById('btnAbmAgenda').value = "Editar datos";
	document.getElementById('btnEditarDatosAgenda').style.backgroundColor="";
	document.getElementById('btnActualizarDatosAgenda').style.backgroundColor="#4CAF50";
	document.getElementById('btnActualizarDatosAgendaEstadoNoConcretado').style.backgroundColor="#2e48a7";
	document.getElementById('btnActualizarDatosAgendaEstadoReAgendado').style.backgroundColor="#fcb92c";
	idAbmAgenda = $(datostr).children('td[id="td_id"]').html();
	cod_clienteAgenda = $(datostr).children('td[id="td_datos_7"]').html();
}

function escaparHtmlAgenda(valor) {
	return String(valor == null ? "" : valor)
		.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function cerrarCuotasPendientesAgenda() {
	document.getElementById("modalCuotasPendientesAgenda").style.display = "none";
}

function abrirCuotasPendientesAgenda(codigoCliente, nombreCliente) {
	if (!codigoCliente) return;
	var modal = document.getElementById("modalCuotasPendientesAgenda");
	var cuerpo = document.getElementById("tablaCuotasPendientesAgenda");
	document.getElementById("clienteCuotasPendientesAgenda").textContent = nombreCliente || "";
	document.getElementById("resumenCuotasPendientesAgenda").textContent = "";
	cuerpo.innerHTML = "<div class='agenda-cuotas-estado'>Consultando cuotas pendientes...</div>";
	modal.style.display = "flex";

	obtener_datos_user();
	$.ajax({
		url: "/GoodVentaElectroCasaMaric/php_system/abmAgenda.php",
		type: "post",
		data: {
			useru: userid,
			passu: passuser,
			navegador: navegador,
			funt: "cuotasPendientesCliente",
			codigo_cliente: codigoCliente
		},
		error: function (jqXHR, textstatus) {
			cuerpo.innerHTML = "<div class='agenda-cuotas-estado agenda-cuotas-error'>No se pudieron consultar las cuotas pendientes.</div>";
			manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");
		},
		success: function (responseText) {
			try {
				var respuesta = $.parseJSON(responseText);
				if (respuestaJqueryAjax(respuesta["1"]) !== true) return;
				var cuotas = Array.isArray(respuesta["2"]) ? respuesta["2"] : [];
				if (!cuotas.length) {
					cuerpo.innerHTML = "<div class='agenda-cuotas-estado'>El cliente no tiene cuotas pendientes.</div>";
					return;
				}
				var filas = "";
				for (var i = 0; i < cuotas.length; i++) {
					var cuota = cuotas[i];
					filas += "<tr><td>" + escaparHtmlAgenda(cuota.cuota) + "</td>"
						+ "<td>" + escaparHtmlAgenda(cuota.venta) + "</td>"
						+ "<td>" + escaparHtmlAgenda(cuota.vencimiento) + "</td>"
						+ "<td>" + escaparHtmlAgenda(cuota.ultimo_pago) + "</td>"
						+ "<td class='agenda-cuotas-numero'>" + escaparHtmlAgenda(cuota.monto) + "</td>"
						+ "<td class='agenda-cuotas-numero'>" + escaparHtmlAgenda(cuota.pagado) + "</td>"
						+ "<td class='agenda-cuotas-numero agenda-cuotas-interes'>" + escaparHtmlAgenda(cuota.interes) + "</td>"
						+ "<td class='agenda-cuotas-numero agenda-cuotas-saldo'>" + escaparHtmlAgenda(cuota.saldo) + "</td>"
						+ "<td><span class='agenda-cuotas-badge " + (cuota.vencida ? "vencida" : "") + "'>"
						+ escaparHtmlAgenda(cuota.estado) + "</span></td></tr>";
				}
				cuerpo.innerHTML = "<div class='agenda-cuotas-tabla-wrap'><table class='agenda-cuotas-tabla'>"
					+ "<thead><tr><th>CUOTA</th><th>VENTA</th><th>VENCIMIENTO</th><th>&Uacute;LTIMO PAGO</th><th>MONTO</th><th>PAGADO</th><th>INTER&Eacute;S</th><th>SALDO</th><th>ESTADO</th></tr></thead>"
					+ "<tbody>" + filas + "</tbody></table></div>";
				document.getElementById("resumenCuotasPendientesAgenda").textContent =
					cuotas.length + (cuotas.length === 1 ? " cuota pendiente" : " cuotas pendientes") + " · Saldo total con inter\u00e9s: " + respuesta["3"];
			} catch (error) {
				cuerpo.innerHTML = "<div class='agenda-cuotas-estado agenda-cuotas-error'>La respuesta de cuotas pendientes no es válida.</div>";
				GuardarArchivosLog("Error cuotas pendientes Agenda: " + error + " Consola: " + responseText);
			}
		}
	});
}
function verificarcamposAgenda() {
	var inptMotivoAgenda = document.getElementById('inptMotivoAgenda').value
	var inptCompromisoAgenda = document.getElementById('inptCompromisoAgenda').value
	
	if (inptMotivoAgenda == "") {
		ver_vetana_informativa("FALTO INGRESAR UN MOTIVO")
		return false;
	}
	
	if (cod_clienteAgenda == "") {
		ver_vetana_informativa("FALTO SELECCIONAR CLIENTE")
		return false;
	}
	var estado = 'Activo';
	
	var accion = "";
	if (idAbmAgenda != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
	}
	abmAgenda(inptMotivoAgenda, inptCompromisoAgenda,estado ,cod_clienteAgenda , idAbmAgenda, accion,"1");
}
function abmAgenda(motivo, fechaCompromiso,estado  , cod_clienteAgenda , idAgenda, accion,desde) {
	verCerrarEfectoCargando("1")
	
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idAgenda", idAgenda)
	datos.append("motivo", motivo)
	datos.append("estado", estado)
	datos.append("fechaCompromiso", fechaCompromiso)
	datos.append("Cod_cobrador", idFkCobrador)
	datos.append("cod_clienteAgenda", cod_clienteAgenda)
	datos.append("cod_DetalleCallCenter", cod_DetalleCallCenter)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmAgenda.php",
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
					if(desde == '1'){
						limpiarcamposAgenda()
						idAbmAgenda = ""
						buscarabmAgenda();
					}
					if(desde == '2'){
						var estado = document.getElementById('inptSelecActualizarEstadoCliente')
						estado = estado.options[estado.selectedIndex].text;
						actualizarEstadoClienteCallCenter(estado)
						limpiarcamposAgendaCallCenter()
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
function actualizarRegistroAgenda(estado) {
	if (idAbmAgenda == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
		return false;
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'actualizarEstadoClienteAgenda')
	datos.append("estado", estado)
	datos.append("cod_agenda", idAbmAgenda)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmAgenda.php",
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
					buscarabmAgenda()
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadoAgenda(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarAgenda1').checked=true
	document.getElementById('inptSeleccEstadoBuscarAgenda2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarAgenda1').checked=false
	document.getElementById('inptSeleccEstadoBuscarAgenda2').checked=true
	}
}

var listadoAbmAgenda = null;
function inicializarListadoAbmAgenda() {
	if (!window.AbmListadoCore) return;
	var formulario = document.getElementById('divAbmAgenda1');
	var cuerpo = document.getElementById('table_abm_Agenda');
	var cabecera = formulario ? formulario.querySelector('.tableCabeceraRegistro tr') : null;
	if (!cuerpo || !cabecera) return;
	if (cuerpo.dataset.abmCoreAislado !== '1' && cuerpo.parentNode) {
		var cuerpoAislado = cuerpo.cloneNode(true);
		cuerpoAislado.dataset.abmCoreAislado = '1';
		cuerpo.parentNode.replaceChild(cuerpoAislado, cuerpo);
		cuerpo = cuerpoAislado;
	}
	cabecera.id = 'cabeceraAbmAgenda';
	var opciones = formulario.querySelector('.abm-estandar-menu-columnas');
	if (opciones) opciones.id = 'opcionesColumnasAgenda';
	if (!listadoAbmAgenda) {
		listadoAbmAgenda = window.AbmListadoCore.crear({
			nombre: 'agenda',
			idCabecera: 'cabeceraAbmAgenda',
			idCuerpo: 'table_abm_Agenda',
			idOpcionesColumnas: 'opcionesColumnasAgenda',
			ordenable: true,
			ordenInicial: 'fecha',
			columnas: [
				{ campo: 'fecha', titulo: 'FECHA VISITA', ancho: '10%' },
				{ campo: 'cliente', titulo: 'CLIENTE', ancho: '25%' },
				{ campo: 'motivo', titulo: 'MOTIVO', ancho: '25%' },
				{ campo: 'cobrador', titulo: 'COBRADOR', ancho: '10%' },
				{ campo: 'fecha_compromiso', titulo: 'FECHA COMPROMISO', ancho: '10%' },
				{ campo: 'fecha_ultimo_pago', titulo: 'FECHA ULT. PAGO', ancho: '10%' },
				{ campo: 'estado', titulo: 'ESTADO', ancho: '5%' },
				{ campo: 'accion', titulo: 'ACCION', ancho: '5%', ordenable: false }
			],
			fila: {
				funcionSeleccion: 'obtenerdatosabmAgenda',
				celdas: [
					{ columna: 'fecha', campo: 'fecha_visita' },
					{ id: 'td_datos_2', columna: 'cliente', campo: 'cliente' },
					{ id: 'td_datos_3', columna: 'motivo', campo: 'motivo' },
					{ id: 'td_datos_4', columna: 'cobrador', campo: 'cobrador' },
					{ columna: 'fecha_compromiso', campo: 'fecha_compromiso_mostrar' },
					{ columna: 'fecha_ultimo_pago', campo: 'fecha_ultimo_pago' },
					{ id: 'td_datos_6', columna: 'estado', campo: 'estado' },
					{ columna: 'accion', render: function (valor, registro) {
						var boton = document.createElement('button');
						boton.type = 'button';
						boton.className = 'agenda-btn-cuotas';
						boton.textContent = 'CUOTAS';
						boton.title = 'Ver cuotas pendientes de ' + (registro.cliente || 'este cliente');
						boton.setAttribute('aria-label', boton.title);
						boton.addEventListener('click', function (evento) {
							evento.stopPropagation();
							abrirCuotasPendientesAgenda(registro.codigo_cliente, registro.cliente);
						});
						return boton;
					} },
					{ id: 'td_datos_1', tecnica: true, campo: 'fecha' },
					{ id: 'td_datos_5', tecnica: true, campo: 'fecha_compromiso' },
					{ id: 'td_id', tecnica: true, campo: 'codigo' },
					{ id: 'td_datos_7', tecnica: true, campo: 'codigo_cliente' }
				]
			}
		});
	}
	listadoAbmAgenda.iniciar();
	sincronizarAnchoCabeceraAgenda();
}

function sincronizarAnchoCabeceraAgenda() {
	var cuerpo = document.getElementById('table_abm_Agenda');
	var cabecera = document.getElementById('cabeceraAbmAgenda');
	var tablaCabecera = cabecera ? cabecera.closest('table') : null;
	if (!cuerpo || !tablaCabecera || !cuerpo.clientWidth) return;
	tablaCabecera.style.width = cuerpo.clientWidth + 'px';
}

window.addEventListener('resize', sincronizarAnchoCabeceraAgenda);

function programarListadoAbmAgenda() {
	setTimeout(inicializarListadoAbmAgenda, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmAgenda);
else programarListadoAbmAgenda();

function buscarabmAgenda() {
	// if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarAgendaF1').value
	var fecha2 = document.getElementById('inptBuscarAgendaF2').value
	var local = ""
	var cliente= document.getElementById("inptBuscarAbmAgenda2").value
	var cobrador= document.getElementById("inptBuscarAbmAgenda3").value
	var campoBusquedaGeneral = document.getElementById("inptBuscarGeneralAgenda")
	var buscarGeneral = campoBusquedaGeneral ? campoBusquedaGeneral.value.trim() : ""
	var tipo_cliente= document.getElementById("inptTipoClienteAgenda").value
	
	var tipo=""
	if(document.getElementById('checkHistorialAgendaFC').checked==true){
		tipo="compromiso"
	}
	if(document.getElementById('checkHistorialAgendaFV').checked==true){
		tipo="visita"
	}
	if(document.getElementById('checkHistorialAgendaFVI').checked==true){
		tipo="visitado"
	}

	if(document.getElementById('checkHistorialFechaAgenda2').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	}else{
	fecha1 = ""
	fecha2 = ""
	}
	
	var estado = document.getElementById('inptBuscarAbmAgenda4').value;
	document.getElementById("table_abm_Agenda").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cliente": cliente,
		"cobrador": cobrador,
		"buscar_general": buscarGeneral,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"tipo": tipo,
		"tipo_cliente": tipo_cliente,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmAgenda.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Agenda").innerHTML = ''
		},
			success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Agenda").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					inicializarListadoAbmAgenda()
					listadoAbmAgenda.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					sincronizarAnchoCabeceraAgenda()
					document.getElementById("inptTotalRegistoAgenda").value = datos[3];
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposAgenda() {
	document.getElementById('inptClienteAgenda').value = "";
	document.getElementById('inptMotivoAgenda').value = "";	
	document.getElementById('inptCompromisoAgenda').value = "";
	document.getElementById('btnEditarDatosAgenda').style.backgroundColor="#d5d3d3";
	document.getElementById('btnActualizarDatosAgenda').style.backgroundColor="#d5d3d3";
	document.getElementById('btnActualizarDatosAgendaEstadoNoConcretado').style.backgroundColor="#d5d3d3";
	document.getElementById('btnActualizarDatosAgendaEstadoReAgendado').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmAgenda').value = "Guardar datos";
	idAbmAgenda= "";
	cod_clienteAgenda = "";
}
function checkHistorialAgenda(d){	
	if(d=="1"){
		document.getElementById('checkHistorialAgendaFC').checked=true
		document.getElementById('checkHistorialAgendaFV').checked=false
		document.getElementById('checkHistorialAgendaFVI').checked=false
	}
	
	if(d=="2"){		
		document.getElementById('checkHistorialAgendaFV').checked=true
		document.getElementById('checkHistorialAgendaFC').checked=false
		document.getElementById('checkHistorialAgendaFVI').checked=false
	
	}
	
	if(d=="3"){		
		document.getElementById('checkHistorialAgendaFVI').checked=true
		document.getElementById('checkHistorialAgendaFV').checked=false
		document.getElementById('checkHistorialAgendaFC').checked=false
	
	}
}
function checkHistorialFechaAgenda(d){	
	if(d=="1"){
		document.getElementById('checkHistorialFechaAgenda1').checked=true
		document.getElementById('checkHistorialFechaAgenda2').checked=false
		document.getElementById('inptBuscarAgendaF1').value = "";
	    document.getElementById('inptBuscarAgendaF2').value = "";	
	}else{		
		document.getElementById('checkHistorialFechaAgenda1').checked=false
		document.getElementById('checkHistorialFechaAgenda2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarAgendaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarAgendaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function verificarcamposEliminarproducto() {

	var accion = "";
	if (idAbmProducto != "") {
		accion = "EliminarProducto";
		abmEliminarproducto(idAbmProducto, accion);
	}
	
}
function abmEliminarproducto(idAbmProducto, accion) {
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_producto", idAbmProducto)
	
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmProducto =  datos["2"]
					buscarabmproducto()
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}






