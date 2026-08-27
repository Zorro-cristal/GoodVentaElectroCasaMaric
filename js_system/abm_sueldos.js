/*
ABM SUELDOS
*/
function verCerrarAbmSueldo(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmSueldo").style.display==""){
		limpiarcamposSueldo()
		limpiarcamposbuscarsueldo()
		document.getElementById("divMinimizadoCargarSueldo").style.display="none"
		//  
	$("div[id=divAbmSueldo]").fadeOut(500);			
	}else{		
	if(controlacceso("VERCARGARSUELDO","accion")==false){return;}
	
	checkInformeRangoFechaSalario("1")
	mostrarSoloUno("divAbmSueldo")	
		document.getElementById("divAbmSueldo").style.display=""
		 //  

	}
}
function limpiarcamposbuscarsueldo(){
	document.getElementById("inptBuscarSueldo").value=""
	document.getElementById("inptBuscarSueldoF1").value=""
	document.getElementById("inptBuscarSueldoF2").value=""	
	document.getElementById("inptTotalTotalSueldo").value=""
	document.getElementById("inptRegistroSeleccSueldo").value=""
	document.getElementById("table_abm_Sueldo").innerHTML=""
}
function minimizarsueldos(){
	//  
	$("div[id=divAbmSueldo]").fadeOut(500);	
	document.getElementById("divMinimizadoCargarSueldo").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmCargarSueldo"));
}
function verCerrarVentanaAbmSueldo(d, l) {
	if (d == "1") {
		if (l == "1") {
			if(controlacceso("INSERTARCARGARSUELDO","accion")==false){return;}
			limpiarcamposSueldo()
		}
		$("div[id=divAbmSueldo2]").fadeIn(250)
		document.getElementById('divAbmSueldo1').style.display = "none"
	} else {
		$("div[id=divAbmSueldo1]").fadeIn(250)
		document.getElementById('divAbmSueldo2').style.display = "none"
	}
}
function verVentanaEditarSueldo() {
	if(controlacceso("EDITARCARGARSUELDO","accion")==false){return;}
	if (idAbmSueldo == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmSueldo("1", "2")
}
var idAbmSueldo = ""
var CodPersonaSueldo = "";
var TipoUserSueldo="";
var listadoAbmSueldo = null;
function iniciarListadoAbmSueldo() {
	if (listadoAbmSueldo || !window.AbmListadoCore) return listadoAbmSueldo;
	var cuerpo = document.getElementById('table_abm_Sueldo');
	if (!cuerpo || !cuerpo.parentNode) return null;
	var cabeceras = cuerpo.parentNode.querySelectorAll('table.tableCabeceraRegistro');
	var cabecera = cabeceras.length ? cabeceras[0].querySelector('tr') : null;
	if (!cabecera) return null;
	cabecera.id = 'cabeceraAbmSueldo';
	listadoAbmSueldo = window.AbmListadoCore.crear({
		nombre: 'sueldo',
		idCabecera: 'cabeceraAbmSueldo',
		idCuerpo: 'table_abm_Sueldo',
		ordenInicial: '',
		columnas: [
			{ campo: 'funcionario', titulo: 'FUNCIONARIO', ancho: '20%' },
			{ campo: 'monto', titulo: 'MONTO', ancho: '20%' },
			{ campo: 'fecha', titulo: 'FECHA', ancho: '20%' },
			{ campo: 'sector', titulo: 'CARGO', ancho: '20%' },
			{ campo: 'tipo', titulo: 'TIPO', ancho: '20%' }
		],
		fila: {
			seleccionar: function (fila, registro) {
				if (registro.seleccionable) obtenerdatosabmSueldo(fila);
			},
			celdas: [
				{ id: 'td_id', campo: 'codigo', tecnica: true },
				{ id: 'td_datos_1', campo: 'funcionario', columna: 'funcionario' },
				{ id: 'td_datos_2', campo: 'total_recaudado_formateado', tecnica: true },
				{ id: 'td_datos_3', campo: 'comision_formateada', tecnica: true },
				{ id: 'td_datos_4', campo: 'monto_formateado', columna: 'monto' },
				{ id: 'td_datos_5', campo: 'fecha', columna: 'fecha' },
				{ campo: 'sector', columna: 'sector' },
				{ id: 'td_datos_12', campo: 'tipo', columna: 'tipo' },
				{ id: 'td_datos_6', campo: 'tipo', tecnica: true },
				{ id: 'td_datos_7', campo: 'estado', tecnica: true },
				{ id: 'td_datos_8', campo: 'codigo_persona', tecnica: true },
				{ id: 'td_datos_9', campo: 'tipo_usuario', tecnica: true },
				{ id: 'td_datos_10', campo: 'estado_registro', tecnica: true },
				{ id: 'td_datos_11', campo: 'desde', tecnica: true }
			]
		}
	});
	listadoAbmSueldo.iniciar();
	return listadoAbmSueldo;
}
function obtenerdatosabmSueldo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptSeleccFuncionariosueldo').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccSueldo').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inpttotalrecaudadoSueldo').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptcomisonporc').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptMontoSueldo').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptFechaSueldo').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptSeleccTipoSueldo').value = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptEstadoSueldo').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptEstadoPagoSueldo').value = $(datostr).children('td[id="td_datos_10"]').html();
	idAbmSueldo = $(datostr).children('td[id="td_id"]').html();
	CodPersonaSueldo = $(datostr).children('td[id="td_datos_8"]').html(); 
document.getElementById('btnAbmSueldo').value = "Editar datos";
document.getElementById('btnEditarSueldos').style.backgroundColor="";
}
function verificarcamposSueldo() {
	var inpttotalrecaudadoSueldo = document.getElementById('inpttotalrecaudadoSueldo').value
	var inptcomisonporc = document.getElementById('inptcomisonporc').value
	var inptMontoSueldo = document.getElementById('inptMontoSueldo').value
	var inptFechaSueldo = document.getElementById('inptFechaSueldo').value
	var inptEstadoSueldo = document.getElementById('inptEstadoSueldo').value
	var inptEstadoPagoSueldo = document.getElementById('inptEstadoPagoSueldo').value
	var inptSeleccTipoSueldo = document.getElementById('inptSeleccTipoSueldo').value
	
	if (inptMontoSueldo == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DEL SUELDO")
		return false;
	}
	if (inptFechaSueldo == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DEL SUELDO")
		return false;
	}
	if (CodPersonaSueldo == "") {
		ver_vetana_informativa("FALTO INGRESAR SELECCIONAR EL FUNCIONARIO")
		return false;
	}
	var accion = "";
	if (idAbmSueldo != "") {
		accion = "editar";
		if(controlacceso("EDITARCARGARSUELDO","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARCARGARSUELDO","accion")==false){return;}
	}
	
	
	
	abmsueldo(inptEstadoPagoSueldo,inpttotalrecaudadoSueldo, inptcomisonporc, inptMontoSueldo, inptFechaSueldo, inptEstadoSueldo, CodPersonaSueldo,TipoUserSueldo, inptSeleccTipoSueldo, idAbmSueldo, accion);
}
function abmsueldo(estadoRegistro,totalrecaudado, comision, sueldo, fecha, estado, cod_persona, tipouser, tipo, idsueldo, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idsueldo", idsueldo)
	datos.append("comision", comision)
	datos.append("totalrecaudado", totalrecaudado)
	datos.append("sueldo", sueldo)
	datos.append("fecha", fecha)
	datos.append("cod_persona", cod_persona)
	datos.append("estado", estado)
	datos.append("tipo", tipo)
	datos.append("tipouser", tipouser)
	datos.append("estadoRegistro", estadoRegistro)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmsueldo.php",
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
					limpiarcamposSueldo()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmSueldo = ""
					buscarabmSueldo()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadoSueldos(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarSueldo1').checked=true
		document.getElementById('inptSeleccEstadoBuscarSueldo2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarSueldo1').checked=false
		document.getElementById('inptSeleccEstadoBuscarSueldo2').checked=true
	}
}



var tipoPagoSalario="Simple"; 
function verTipoPagoSalario(d){
	document.getElementById("btnSueldo1").style=''
	document.getElementById("btnSueldo2").style=''  
	if(d=="1"){
		document.getElementById("btnSueldo1").style='background-color:#ff9800;color:#fff'
		tipoPagoSalario="Simple"; 
	}
	
	if(d=="2"){ 
		document.getElementById("btnSueldo2").style='background-color:#ff9800;color:#fff'
		tipoPagoSalario="Detallado"; 
	}	
}


function checkInformeRangoFechaSalario(d){
	if(d=="1"){
		document.getElementById('checkInformeRangoFechaSalario1').checked=true
		document.getElementById('checkInformeRangoFechaSalario2').checked=false
			var f = new Date();
		var dia = f.getDate()
		if (dia < 10) {
			dia = "0" + dia;
		}
		var mes = f.getMonth() + 1
		if (mes < 10) {
			mes = "0" + mes;
		}
		document.getElementById('inptBuscarSueldoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
		document.getElementById('inptBuscarSueldoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	}else{		
		document.getElementById('checkInformeRangoFechaSalario1').checked=false
		document.getElementById('checkInformeRangoFechaSalario2').checked=true
		
		document.getElementById('inptBuscarSueldoF1').value = "";
	    document.getElementById('inptBuscarSueldoF2').value = "";
	
		
	}
}

function crearCeldaSueldo(fila, id, valor, ancho, oculto) {
	var celda = document.createElement('td');
	if (id) celda.id = id;
	if (ancho) celda.style.width = ancho;
	if (oculto) celda.style.display = 'none';
	celda.textContent = valor == null ? '' : String(valor);
	fila.appendChild(celda);
	return celda;
}

function crearTablaSueldo(clase, fila) {
	var tabla = document.createElement('table');
	tabla.className = clase;
	tabla.setAttribute('border', '1');
	tabla.setAttribute('cellspacing', '1');
	tabla.setAttribute('cellpadding', '5');
	tabla.appendChild(fila);
	return tabla;
}

function formatearMontoSueldo(valor) {
	var numero = Number(valor || 0);
	if (!isFinite(numero)) numero = 0;
	return String(Math.round(numero)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function agregarResumenSueldoDetallado(contenedor, grupo) {
	var tabla = document.createElement('table');
	tabla.style.width = '100%';
	var fila = document.createElement('tr');
	crearCeldaSueldo(fila, '', '', '60%', false);
	[
		['Total Adelanto :', grupo.total_adelanto, '150px'],
		['Total Extra :', grupo.total_extra, '150px'],
		['Total I.P.S :', grupo.total_ips, '150px'],
		['Total a Cobrar :', grupo.total_cobrar, '200px'],
		['Total Salario :', grupo.total_salario, '150px']
	].forEach(function (dato) {
		var celda = crearCeldaSueldo(fila, '', '', '10%', false);
		var titulo = document.createElement('p');
		titulo.className = 'pTituloC';
		titulo.textContent = dato[0];
		var campo = document.createElement('input');
		campo.type = 'text';
		campo.disabled = true;
		campo.className = 'inputTextDisable';
		campo.value = formatearMontoSueldo(dato[1]);
		campo.style.width = dato[2];
		campo.style.textAlign = 'center';
		celda.appendChild(titulo);
		celda.appendChild(campo);
	});
	tabla.appendChild(fila);
	contenedor.appendChild(tabla);
}

function renderizarSueldoDetallado(grupos) {
	var contenedor = document.getElementById('table_abm_Sueldo');
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(grupos || []).forEach(function (grupo, indiceGrupo) {
		var filaGrupo = document.createElement('tr');
		filaGrupo.id = 'tbSelecRegistro';
		crearCeldaSueldo(filaGrupo, 'td_id', grupo.codigo, '', true);
		crearCeldaSueldo(filaGrupo, '', '', '5%', false);
		crearCeldaSueldo(filaGrupo, '', (grupo.funcionario || '') + ' - ' + (grupo.sector || ''), '35%', false).style.fontSize = '15px';
		crearCeldaSueldo(filaGrupo, '', grupo.total_recaudado_formateado, '', true);
		crearCeldaSueldo(filaGrupo, '', grupo.comision_formateada, '', true);
		crearCeldaSueldo(filaGrupo, '', 'TIPO', '20%', false);
		crearCeldaSueldo(filaGrupo, '', 'MONTO', '20%', false);
		crearCeldaSueldo(filaGrupo, '', 'FECHA', '20%', false);
		crearCeldaSueldo(filaGrupo, '', grupo.tipo, '', true);
		crearCeldaSueldo(filaGrupo, '', grupo.estado, '', true);
		crearCeldaSueldo(filaGrupo, '', grupo.codigo_persona, '', true);
		crearCeldaSueldo(filaGrupo, '', grupo.tipo_usuario, '', true);
		crearCeldaSueldo(filaGrupo, '', grupo.estado_registro, '', true);
		crearCeldaSueldo(filaGrupo, '', grupo.desde, '', true);
		var tablaGrupo = crearTablaSueldo(indiceGrupo % 2 ? 'tableRegistroSearch' : 'tableRegistroSearch2', filaGrupo);
		tablaGrupo.style.backgroundColor = '#2e5a8b';
		tablaGrupo.style.color = '#fff';
		contenedor.appendChild(tablaGrupo);

		(grupo.detalles || []).forEach(function (detalle, indiceDetalle) {
			var fila = document.createElement('tr');
			fila.id = 'tbSelecRegistro';
			if (detalle.seleccionable) fila.addEventListener('click', function () { obtenerdatosabmSueldo(this); });
			crearCeldaSueldo(fila, 'td_id', detalle.codigo, '', true);
			crearCeldaSueldo(fila, '', '', '40%', false);
			crearCeldaSueldo(fila, 'td_datos_1', detalle.funcionario, '', true);
			crearCeldaSueldo(fila, 'td_datos_2', detalle.total_recaudado_formateado, '', true);
			crearCeldaSueldo(fila, 'td_datos_3', detalle.comision_formateada, '', true);
			crearCeldaSueldo(fila, 'td_datos_12', detalle.tipo, '20%', false);
			crearCeldaSueldo(fila, 'td_datos_4', detalle.monto_formateado, '20%', false);
			crearCeldaSueldo(fila, 'td_datos_5', detalle.fecha, '20%', false);
			crearCeldaSueldo(fila, '', detalle.sector, '', true);
			crearCeldaSueldo(fila, 'td_datos_6', detalle.tipo, '', true);
			crearCeldaSueldo(fila, 'td_datos_7', detalle.estado, '', true);
			crearCeldaSueldo(fila, 'td_datos_8', detalle.codigo_persona, '', true);
			crearCeldaSueldo(fila, 'td_datos_9', detalle.tipo_usuario, '', true);
			crearCeldaSueldo(fila, 'td_datos_10', detalle.estado_registro, '', true);
			crearCeldaSueldo(fila, 'td_datos_11', detalle.desde, '', true);
			contenedor.appendChild(crearTablaSueldo(indiceDetalle % 2 ? 'tableRegistroSearch' : 'tableRegistroSearch2', fila));
		});
		agregarResumenSueldoDetallado(contenedor, grupo);
	});
}


function buscarabmSueldo() {
if(controlacceso("BUSCARCARGARSUELDO","accion")==false){return;}
	var modoPagoSalario = tipoPagoSalario
	var listado = modoPagoSalario == "Simple" ? iniciarListadoAbmSueldo() : null
	var fecha1 = document.getElementById('inptBuscarSueldoF1').value
	var fecha2 = document.getElementById('inptBuscarSueldoF2').value
	var buscar = document.getElementById('inptBuscarSueldo').value
	var local = document.getElementById('inptLocalFuncionariosSueldos').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarSueldo1').checked==true){
		 estado = "Activo"
	}else{
		 estado = "Inactivo"
	}
	var tipo = document.getElementById('inptSeleccTipoBuscarSueldo').value
	var sector = document.getElementById('inptSectorSueldos').value
	document.getElementById("table_abm_Sueldo").innerHTML = paginacargando
	document.getElementById("inptTotalRegistroSueldo").value=""
	document.getElementById("inptTotalaCobrarSueldo").value=""
	document.getElementById("inptTotalTotalSueldo").value=""
	document.getElementById("inptTotalAdelantoSueldo").value=""
	document.getElementById("inptTotalExtraSueldo").value=""
	document.getElementById("inptTotalIPSSueldo").value=""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"buscar": buscar,
		"tipo": tipo,
		"sector": sector,
		"local": local,
		"tipoPagoSalario": modoPagoSalario,
		"funt": "buscar"
	};
	datos.formato = "json";
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmsueldo.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Sueldo").innerHTML = ''
			document.getElementById("inptTotalRegistroSueldo").value=""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Sueldo").innerHTML = ''
			document.getElementById("inptTotalRegistroSueldo").value=""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				   Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if (modoPagoSalario == "Simple") {
						if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
					} else {
						if (Array.isArray(datos[2])) renderizarSueldoDetallado(datos[2]);
						else document.getElementById("table_abm_Sueldo").innerHTML = datos[2];
					}
					document.getElementById("inptTotalRegistroSueldo").value = datos[3];
					document.getElementById("inptTotalTotalSueldo").value = datos[4];
					
					if(modoPagoSalario=="Detallado"){
						document.getElementById("inptTotalaCobrarSueldo").value = datos[5];
						document.getElementById("inptTotalAdelantoSueldo").value = datos[6];
						document.getElementById("inptTotalExtraSueldo").value = datos[7];
						document.getElementById("inptTotalIPSSueldo").value = datos[8];
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
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmSueldo)
else iniciarListadoAbmSueldo()
function limpiarcamposSueldo() {
	document.getElementById('inptSeleccFuncionariosueldo').value = "";
	document.getElementById('inptRegistroSeleccSueldo').value = "";
	document.getElementById('inpttotalrecaudadoSueldo').value = "";
	document.getElementById('inptcomisonporc').value = "";
	document.getElementById('inptMontoSueldo').value = "";
	document.getElementById('inptFechaSueldo').value = "";
	document.getElementById('inptSeleccTipoSueldo').value = "SUELDO";
	document.getElementById('inptEstadoSueldo').value = "Activo";
	document.getElementById('inptEstadoPagoSueldo').value = "PAGADO";
	document.getElementById('btnAbmSueldo').value = "Guardar datos";
	document.getElementById('btnEditarSueldos').style.backgroundColor="#b7b7b7";
	idAbmSueldo = "";
	CodPersonaSueldo = "";

}
var controlseleccvistaFuncionario = ""
function vercerrarvistafuncionarios(d, ventana) {
	if (d == "1") {
		$("div[id=divVistaFuncinario]").fadeIn(250)
		controlseleccvistaFuncionario = ventana
		buscarvistafuncionario();
	} else {
		$("div[id=divVistaFuncinario]").fadeOut(250)
	}
}
function buscarvistafuncionario() {
	var buscador = document.getElementById('inptBuscarVistaFuncionario').value
	// var tipo = document.getElementById('inptSeleccTipoFuncionario').value
	document.getElementById("table_vista_funcionario").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"formato": "json",
		// "tipo": tipo,
		"funt": "buscarfuncionario"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_funcionario").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_funcionario").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				    	var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) renderizarVistaFuncionariosSueldo(datos_buscados);
					else document.getElementById("table_vista_funcionario").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function renderizarVistaFuncionariosSueldo(registros) {
	var contenedor = document.getElementById('table_vista_funcionario');
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(registros || []).forEach(function (registro, indice) {
		var fila = document.createElement('tr');
		fila.id = 'tbSelecRegistro';
		fila.addEventListener('click', function () { obtenerdatosvistafuncionario(this); });
		crearCeldaSueldo(fila, 'td_id', registro.codigo, '5%', false).style.color = 'red';
		crearCeldaSueldo(fila, 'td_datos_1', registro.funcionario, '90%', false);
		contenedor.appendChild(crearTablaSueldo(indice % 2 ? 'tableRegistroSearch' : 'tableRegistroSearch2', fila));
	});
}
function obtenerdatosvistafuncionario(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	if (controlseleccvistaFuncionario == "sueldo") {
		CodPersonaSueldo = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptSeleccFuncionariosueldo').value = $(datostr).children('td[id="td_datos_1"]').html();
		 
	}
	document.getElementById("divVistaFuncinario").style.display = "none"
}


