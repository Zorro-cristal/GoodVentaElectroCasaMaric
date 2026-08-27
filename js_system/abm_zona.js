/*
ABM ZONA
*/
function verCerrarAbmZona(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmZona").style.display==""){
		document.getElementById("divMinimizadoListadoZona").style.display="none"
		limpiarcamposbuscarzona();
		limpiarcamposZona();
 
	$("div[id=divAbmZona]").fadeOut(500);	
	}else{		
	if(controlacceso("VERLISTADODEZONAS","accion")==false){return;}
	mostrarSoloUno("divAbmZona")	
		document.getElementById("divAbmZona").style.display=""
		
	}
}
function limpiarcamposbuscarzona(){
		 document.getElementById('inptBuscarAbmZona1').value=""
	    document.getElementById('inptBuscarAbmZona2').value=""
		if (listadoAbmZona) listadoAbmZona.establecerRegistros([])
		else document.getElementById("table_abm_zona").innerHTML = ""
		document.getElementById("inptTotalRegistoZano").value = "";
}
function minimizarzonas(){
 
	$("div[id=divAbmZona]").fadeOut(500);
			document.getElementById("divMinimizadoListadoZona").style.display=""
			copiarBotonEnContenedor(document.getElementById("divMenuAbmZona"));
}
function verCerrarVentanaAbmZona(d, l) {
	if (d == "1") {	
		if (l == "1") {
			if(controlacceso("INSERTARLISTADODEZONAS","accion")==false){return;}
			limpiarcamposZona()
		}
		$("div[id=divAbmZona2]").fadeIn(250)
		document.getElementById('divAbmZona1').style.display = "none"
	} else {
		$("div[id=divAbmZona1]").fadeIn(250)
		document.getElementById('divAbmZona2').style.display = "none"
	}
}
function verVentanaEditarZona() {
	if(controlacceso("EDITARLISTADODEZONAS","accion")==false){return;}
	if (idAbmZona == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmZona("1", "2")
}
var idAbmZona = ""
function obtenerdatosabmZona(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});

	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreZona').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccZona').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoZona').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptCobradorZona').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('btnAbmZona').value ="Editar datos";
	document.getElementById('btnEditarZonas').style.backgroundColor="";
	idAbmZona = $(datostr).children('td[id="td_id"]').html();




}
function verificarcamposZona() {
	var inptNombreZona = document.getElementById('inptNombreZona').value
	var inptCobradorZona = document.getElementById('inptCobradorZona').value
	var inptEstadoZona = document.getElementById('inptEstadoZona').value
	
	if (inptNombreZona == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE LA ZONA")
		return false;
	}
	if (inptCobradorZona == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL COBRADOR PARA LA ZONA")
		return false;
	}
	var accion = "";
	if (idAbmZona != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADODEZONAS","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADODEZONAS","accion")==false){return;}
	}
	abmzonas(inptNombreZona, inptEstadoZona, idAbmZona, inptCobradorZona, accion);
}
function verificarcamposZonaVista() {
	var inptNombreZona = document.getElementById('inptNombreZonaVista').value
	var inptEncargadoZona= document.getElementById('inptEncargadoZonaVista').value
	var inptEstadoZona = "Activo"
	if (inptEncargadoZona == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL ENCARGADO")
		return false;
	}
	if (inptNombreZona == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE LA ZONA")
		return false;
	}
	var accion = "nuevo";
	if(controlacceso("ZONA","insertar")==false){
		
	//SIN PERMISO
	  return;
		}
	abmzonas(inptNombreZona, inptEstadoZona, idAbmZona, inptEncargadoZona , accion);
}
function abmzonas(nombre, estado, idzona, idcobradorFK , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idzona", idzona)
	datos.append("nombre", nombre)
	datos.append("estado", estado)
	datos.append("idcobradorFK", idcobradorFK)

	var OpAjax = $.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmzona.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		 
		
		success: function (responseText) {
			verCerrarEfectoCargando("")
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					limpiarcamposZona()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmZona = ""
					buscarabmZona()
					buscarabmZonaOption();
					buscarCobradorSelecZona()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoZonas(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarZona1').checked=true
		document.getElementById('inptSeleccEstadoBuscarZona2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarZona1').checked=false
		document.getElementById('inptSeleccEstadoBuscarZona2').checked=true
	}
}

var listadoAbmZona = null;
function inicializarListadoAbmZona() {
	if (!window.AbmListadoCore) return;
	var formulario = document.getElementById('divAbmZona1');
	var cuerpo = document.getElementById('table_abm_zona');
	var cabecera = formulario ? formulario.querySelector('.tableCabeceraRegistro tr') : null;
	if (!cuerpo || !cabecera) return;
	cabecera.id = 'cabeceraAbmZona';
	var opciones = formulario.querySelector('.abm-estandar-menu-columnas');
	if (opciones) opciones.id = 'opcionesColumnasZona';
	if (!listadoAbmZona) {
		listadoAbmZona = window.AbmListadoCore.crear({
			nombre: 'zona',
			idCabecera: 'cabeceraAbmZona',
			idCuerpo: 'table_abm_zona',
			idOpcionesColumnas: 'opcionesColumnasZona',
			ordenable: true,
			ordenInicial: 'nombre',
			columnas: [
				{ campo: 'codigo', titulo: '#', ancho: '10%' },
				{ campo: 'nombre', titulo: 'ZONA', ancho: '50%' },
				{ campo: 'encargado', titulo: 'ENCARGADO', ancho: '30%' },
				{ campo: 'nro_clientes', titulo: 'NRO CLIENTES', ancho: '10%' }
			],
			fila: {
				funcionSeleccion: 'obtenerdatosabmZona',
				celdas: [
					{ id: 'td_id', columna: 'codigo', campo: 'codigo' },
					{ id: 'td_datos_1', columna: 'nombre', campo: 'nombre' },
					{ id: 'td_datos_3', columna: 'encargado', campo: 'encargado' },
					{
						columna: 'nro_clientes', campo: 'nro_clientes',
						render: function (valor) {
							var numero = Number(valor);
							return isNaN(numero) ? valor : numero.toLocaleString('es-PY');
						}
					},
					{ id: 'td_datos_2', tecnica: true, campo: 'estado' },
					{ id: 'td_datos_4', tecnica: true, campo: 'cod_cobrador' }
				]
			}
		});
	}
	listadoAbmZona.iniciar();
}

function programarListadoAbmZona() {
	setTimeout(inicializarListadoAbmZona, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmZona);
else programarListadoAbmZona();

function buscarabmZona() {
if(controlacceso("BUSCARLISTADODEZONAS","accion")==false){return;}
	var codigo = document.getElementById('inptBuscarAbmZona1').value
	var nombre = document.getElementById('inptBuscarAbmZona2').value
	var encargado = document.getElementById('inptBuscarAbmZona3').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarZona1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_zona").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"nombre": nombre,
		"estado": estado,
		"encargado": encargado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmzona.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_zona").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_zona").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					inicializarListadoAbmZona()
					listadoAbmZona.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoZano").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function limpiarcamposZona() {
	document.getElementById('inptRegistroSeleccZona').value = "";
	document.getElementById('inptCobradorZona').value = "";
	document.getElementById('inptNombreZona').value = "";
	document.getElementById('inptEstadoZona').value = "Activo";
	document.getElementById('btnAbmZona').value ="Guardar datos";
	document.getElementById('btnEditarZonas').style.backgroundColor="#b7b7b7";
	idAbmZona = "";
}
var controlVistaZona = "";
var listadoVistaZona = null;
function iniciarListadoVistaZona() {
	if (listadoVistaZona || !window.AbmListadoCore) return listadoVistaZona;
	var cuerpo = document.getElementById('table_vista_zona');
	var cabecera = cuerpo && cuerpo.previousElementSibling ? cuerpo.previousElementSibling.querySelector('tr') : null;
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraVistaZona';
	listadoVistaZona = window.AbmListadoCore.crear({
		nombre: 'vistaZona',
		idCabecera: 'cabeceraVistaZona',
		idCuerpo: 'table_vista_zona',
		ordenInicial: 'zona',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '5%' },
			{ campo: 'zona', titulo: 'ZONA', ancho: '50%' }
		],
		fila: {
			funcionSeleccion: 'obtenerdatosVistaZona',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo' },
				{ id: 'td_datos_1', campo: 'zona', columna: 'zona' },
				{ id: 'td_datos_2', campo: 'estado', tecnica: true }
			]
		}
	});
	listadoVistaZona.iniciar();
	return listadoVistaZona;
}
function verCerrarVistaZona(d, ventana) {
	if (d == "1") {
		$("div[id=divVistaZona]").fadeIn(250)
		controlVistaZona = ventana
		buscarVistaZona()
	} else {
		$("div[id=divVistaZona]").fadeOut(250)
	}
}
function verCerrarNuevoRegistroZona(d, ventana) {
	if (d == "1") {
		$("div[id=divAbmZonaVista]").fadeIn(250)
	} else {
		$("div[id=divAbmZonaVista]").fadeOut(250)
	}
}
function buscarVistaZona() {
	var buscador = document.getElementById('inptBuscarVistaZona').value
	document.getElementById("table_vista_zona").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"formato": "json",
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmzona.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_zona").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_zona").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
                 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var listado = iniciarListadoVistaZona();
				if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_zona").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoVistaZona);
else iniciarListadoVistaZona();
var idFKZona = "";
function obtenerdatosVistaZona(datostr) {
	idFKZona = $(datostr).children('td[id="td_id"]').html();
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	if (controlVistaZona == "cobradorabm") {
		document.getElementById('inptZonaCobrador').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	if (controlVistaZona == "clienteabm") {
		document.getElementById('inptZonaCliente').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	if (controlVistaZona == "clienteabmvista") {
		document.getElementById('inptZonaClienteVista').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	if (controlVistaZona == "cobradorabmvista") {
		document.getElementById('inptZonaCobradorVista').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	if (controlVistaZona == "SolocitudCredito") {
		document.getElementById('inptZonaSolicitudCredito').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	document.getElementById("divVistaZona").style.display = "none"
}



function buscarabmZonaOption() {
	document.getElementById("inputSelectZonaInfHistorialVenta").innerHTML = "";
	document.getElementById("inptBuscarAbmCliente4").innerHTML = "";
	document.getElementById("inputSelectZonaInfCuentasAcobrar").innerHTML = "";
	document.getElementById("inputSelectZonaArqueo").innerHTML = "";
	document.getElementById("inputSelectZonaComisionCobrador").innerHTML = "";
	document.getElementById("inputSelectZonaComisionClientesInactivos").innerHTML = "";
	document.getElementById("inptZonaMoroso").innerHTML = "";
	document.getElementById("inptZonaImpago").innerHTML = "";
	document.getElementById("inptZonaClienteFiel").innerHTML = "";
	document.getElementById("inptZonaCumpleCliente").innerHTML = "";
	document.getElementById("inptBuscarAbmsolicitudCredito4").innerHTML = "";
	document.getElementById("inptZonaCuentasAcobrainforme").innerHTML = "";
	document.getElementById("inptZonaInformeCredito").innerHTML = "";
	document.getElementById("inptZonaTareasCobrador").innerHTML = "";
	document.getElementById("inptBuscarSolicitudRevision4").innerHTML = "";
	document.getElementById("inptBuscarSolicitudRevisionPagare4").innerHTML = "";
	document.getElementById("buscarInformeVentasDocumentosEntregadas3").innerHTML = "";
	document.getElementById("buscarInformeVentasDocumentosEntregadasCliente3").innerHTML = "";
	document.getElementById("inputSelectZonaInfClienteParaInforconf").innerHTML = "";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmzona.php",
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
					document.getElementById("inputSelectZonaInfHistorialVenta").innerHTML = datos_buscados
					document.getElementById("inptBuscarAbmCliente4").innerHTML = datos_buscados
					document.getElementById("inputSelectZonaInfCuentasAcobrar").innerHTML = datos_buscados
					document.getElementById("inputSelectZonaArqueo").innerHTML = datos_buscados
					document.getElementById("inputSelectZonaComisionCobrador").innerHTML = datos_buscados
					document.getElementById("inputSelectZonaComisionClientesInactivos").innerHTML = datos_buscados
					document.getElementById("inptZonaMoroso").innerHTML = datos_buscados;
					document.getElementById("inptZonaImpago").innerHTML = datos_buscados;
					document.getElementById("inptZonaClienteFiel").innerHTML = datos_buscados;
					document.getElementById("inptZonaCumpleCliente").innerHTML = datos_buscados;
					document.getElementById("inptBuscarAbmsolicitudCredito4").innerHTML = datos_buscados;
					document.getElementById("inptZonaCuentasAcobrainforme").innerHTML = datos_buscados;
					document.getElementById("inptZonaInformeCredito").innerHTML = datos_buscados;
					document.getElementById("inptZonaTareasCobrador").innerHTML = datos_buscados;
					document.getElementById("inptBuscarSolicitudRevision4").innerHTML = datos_buscados;
					document.getElementById("inptBuscarSolicitudRevisionPagare4").innerHTML = datos_buscados;
					document.getElementById("buscarInformeVentasDocumentosEntregadas3").innerHTML = datos_buscados;
					document.getElementById("buscarInformeVentasDocumentosEntregadasCliente3").innerHTML = datos_buscados;
					document.getElementById("inputSelectZonaInfClienteParaInforconf").innerHTML = datos_buscados;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
