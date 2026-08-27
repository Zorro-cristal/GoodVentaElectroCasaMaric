/*
ABM CHEQUE
*/
var listadoAbmCheque = null
function iniciarListadoAbmCheque() {
	if (listadoAbmCheque || !window.AbmListadoCore) return listadoAbmCheque
	var cuerpo = document.getElementById('table_abm_Cheque')
	var cabecera = document.querySelector('#tablacabeceraCheque tr')
	if (!cuerpo || !cabecera) return null
	cabecera.id = 'cabeceraAbmCheque'
	listadoAbmCheque = window.AbmListadoCore.crear({
		nombre: 'cheque',
		idCabecera: 'cabeceraAbmCheque',
		idCuerpo: 'table_abm_Cheque',
		ordenInicial: 'fecha_vencimiento',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '5%' },
			{ campo: 'fecha_emision', titulo: 'FECHA EMISION.', ancho: '10%' },
			{ campo: 'numero_cheque', titulo: 'NRO CHEQUE.', ancho: '10%' },
			{ campo: 'fecha_vencimiento', titulo: 'FECHA VENCIMIENTO.', ancho: '10%' },
			{ campo: 'orden', titulo: 'ORDEN', ancho: '5%' },
			{ campo: 'concepto', titulo: 'CONCEPTO.', ancho: '10%' },
			{ campo: 'importe_valor', titulo: 'IMPORTE.', ancho: '10%' },
			{ campo: 'pagado', titulo: 'PAGADO.', ancho: '10%' },
			{ campo: 'banco', titulo: 'BANCO.', ancho: '10%' },
			{ campo: 'tipo', titulo: 'TIPO', ancho: '10%' },
			{ campo: 'url', titulo: 'ACCION', ancho: '5%' }
		],
		fila: {
			funcionSeleccion: 'ObtenerdatosAbmCheque',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo', render: function (valor, registro, celda) {
					celda.style.backgroundColor = '#efeded'
					celda.style.color = 'red'
					return valor
				} },
				{ id: 'td_datos_1', campo: 'fecha_emision', tecnica: true },
				{ columna: 'fecha_emision', valor: function (registro) { return registro.fecha_emision_formateada } },
				{ id: 'td_datos_2', campo: 'numero_cheque', columna: 'numero_cheque' },
				{ id: 'td_datos_3', campo: 'fecha_vencimiento', tecnica: true },
				{ columna: 'fecha_vencimiento', valor: function (registro) { return registro.fecha_vencimiento_formateada } },
				{ id: 'td_datos_4', campo: 'orden', columna: 'orden' },
				{ id: 'td_datos_5', campo: 'concepto', columna: 'concepto' },
				{ id: 'td_datos_6', columna: 'importe_valor', valor: function (registro) { return registro.importe_formateado } },
				{ id: 'td_datos_7', campo: 'pagado', columna: 'pagado' },
				{ id: 'td_datos_8', campo: 'banco', columna: 'banco' },
				{ id: 'td_datos_11', campo: 'tipo', columna: 'tipo' },
				{ columna: 'url', render: function (url, registro) {
					var acciones = document.createElement('div')
					acciones.className = 'cheque-acciones'
					var agrupado = document.getElementById('inptChequeAgrupado')
					if (!agrupado || agrupado.value === '') {
						var check = document.createElement('input')
						check.type = 'checkbox'
						check.className = 'cheque-check-pagado'
						check.checked = registro.pagado === 'PAGADO'
						check.title = check.checked ? 'Pagado. Clic para marcar pendiente' : 'Pendiente. Clic para marcar pagado'
						check.setAttribute('aria-label', check.title)
						check.addEventListener('click', function (event) {
							event.stopPropagation()
							var nuevoEstado = check.checked ? 'PAGADO' : 'PENDIENTE'
							actualizarPagadoChequeDesdeListado(registro.codigo, nuevoEstado, check)
						})
						acciones.appendChild(check)
					}
					if (url) {
						var boton = document.createElement('input')
						boton.type = 'button'
						boton.value = 'VER'
						boton.className = 'btn4'
						boton.style.width = '50px'
						boton.addEventListener('click', function (event) {
							event.stopPropagation()
							if (typeof verdocumentoClienteSolicitud === 'function') verdocumentoClienteSolicitud(url)
						})
						acciones.appendChild(boton)
					}
					return acciones
				} },
				{ id: 'td_datos_9', campo: 'codigo_banco', tecnica: true },
				{ id: 'td_datos_10', campo: 'estado', tecnica: true }
			]
		}
	})
	listadoAbmCheque.iniciar()
	return listadoAbmCheque
}

function actualizarPagadoChequeDesdeListado(codigoCheque, nuevoEstado, control) {
	control.disabled = true
	obtener_datos_user()
	$.ajax({
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		data: {
			useru: userid, passu: passuser, navegador: navegador,
			funt: "actualizarPagadoListado", idAbmCheque: codigoCheque, pagado: nuevoEstado
		},
		error: function (jqXHR, textstatus) {
			control.checked = !control.checked
			control.disabled = false
			manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana")
		},
		success: function (responseText) {
			try {
				var datos = $.parseJSON(responseText)
				if (respuestaJqueryAjax(datos["1"]) === true) {
					control.disabled = false
					control.title = datos["2"] === "PAGADO" ? "Pagado. Clic para marcar pendiente" : "Pendiente. Clic para marcar pagado"
					control.setAttribute("aria-label", control.title)
					return
				}
				control.checked = !control.checked
				control.disabled = false
			} catch (error) {
				control.checked = !control.checked
				control.disabled = false
				ver_vetana_informativa("NO SE PUDO ACTUALIZAR EL ESTADO")
				GuardarArchivosLog("Error al actualizar pagado del cheque: " + error + " Consola: " + responseText)
			}
		}
	})
}
function verCerrarAbmCheque()
{
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCheque").style.display==""){
		document.getElementById("divMinimizadoCheque").style.display="none"
		limpiarcamposCheque()
		limpiarcamposbuscarCheque()
//  
	$("div[id=divAbmCheque]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADOCHEQUE","accion")==false){return;}
		mostrarSoloUno("divAbmCheque")	
		document.getElementById("divAbmCheque").style.display=""
//  
	}
}

function verCerrarVentanaAbmCheque(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			limpiarcamposCheque()
		}
		$("div[id=divAbmCheque2]").fadeIn(250)
		document.getElementById('divAbmCheque1').style.display = "none"
	} else {
		$("div[id=divAbmCheque1]").fadeIn(250)
		document.getElementById('divAbmCheque2').style.display = "none"
	}
}


function limpiarcamposbuscarCheque(){
	    document.getElementById('inptBuscarAbmCheque1').value=""
		document.getElementById('inptBuscarAbmCheque2').value=""
		document.getElementById('inptBuscarAbmCheque3').value=""
		document.getElementById('inptBuscarAbmCheque4').value=""
		document.getElementById('inptBuscarAbmCheque5').value=""
		document.getElementById('inptBuscarAbmCheque6').value=""
		document.getElementById('inptBuscarAbmCheque7').value=""
		document.getElementById('inptBuscarAbmCheque8').value=""
		document.getElementById('inptBuscarAbmCheque9').value=""
		document.getElementById("table_abm_Cheque").innerHTML = ""
		document.getElementById("inptTotalRegistoCheque").value = "";
		document.getElementById("inptChequeAgrupado").value = "";
		document.getElementById("inptTotalMontoRegistoCheque").value = "";
}
function minimizarabmCheque(){
	$("div[id=divAbmCheque]").fadeOut(500);	
	document.getElementById("divMinimizadoCheque").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCheque"));
}

function verVentanaEditarCheque() {
	if (idAbmCheque == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	verCerrarVentanaAbmCheque("1", "2")
}
var idAbmCheque = ""
function ObtenerdatosAbmCheque(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	document.getElementById('inptFechEmiCheque').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptFechaVenCheque').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptNroCheque').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptOrdenCheque').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptConceptoCheque').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptImporteCheque').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptNombreBancoCheque').value = $(datostr).children('td[id="td_datos_9"]').html();
	document.getElementById('inptEstadoCheque').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptPagadoCheque').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptRegistroSeleccCheque').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptTipoCheque').value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById('btnEditarDatosCheque').style.backgroundColor="";
	document.getElementById('btnAbmCheque').value =  "Editar datos";
		
	idAbmCheque = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposCheque() {
	var inptFechEmiCheque = document.getElementById('inptFechEmiCheque').value
	var inptFechaVenCheque = document.getElementById('inptFechaVenCheque').value
	var inptNroCheque = document.getElementById('inptNroCheque').value
	var inptOrdenCheque = document.getElementById('inptOrdenCheque').value
	var inptConceptoCheque = document.getElementById('inptConceptoCheque').value
	// Obtener la opción seleccionada
	// var selectedOption = inptConceptoCheque.options[inptConceptoCheque.selectedIndex];

	// Obtener el texto de la opción seleccionada
	// var inptConceptoCheque = selectedOption.textContent || selectedOption.innerText;


	var inptImporteCheque = document.getElementById('inptImporteCheque').value
	var inptNombreBancoCheque = document.getElementById('inptNombreBancoCheque').value
	var inptEstadoCheque = document.getElementById('inptEstadoCheque').value
	var inptPagadoCheque = document.getElementById('inptPagadoCheque').value
	var inptTipoCheque = document.getElementById('inptTipoCheque').value
	
	if (inptFechEmiCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE EMISION")
		return false;
	}
	
	if (inptFechaVenCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE VENCIMIENTO")
		return false;
	}
	
	if (inptNroCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NUMERO DE CHEQUE")
		return false;
	}
	
	if (inptOrdenCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE ")
		return false;
	}
	if (inptConceptoCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR EL CONCEPTO")
		return false;
	}
	if (inptImporteCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR EL IMPORTE")
		return false;
	}
	if (inptNombreBancoCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL BANCO")
		return false;
	}
	if (inptTipoCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR TIPO CHEQUE")
		return false;
	}
	if (inptEstadoCheque == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}
	
	var accion = "";
	if (idAbmCheque != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
	}
	abmCheque(inptPagadoCheque,inptFechEmiCheque ,inptFechaVenCheque , inptNroCheque ,inptOrdenCheque , inptConceptoCheque ,inptImporteCheque , inptNombreBancoCheque, inptTipoCheque ,inptEstadoCheque , idAbmCheque, accion);
}
function abmCheque(pagado,fechaemi,fechaven ,nroCheque,orden ,concepto,importe ,banco,tipo,estado , idAbmCheque, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idAbmCheque", idAbmCheque)
	datos.append("fechaemi", fechaemi)
	datos.append("fechaven", fechaven)
	datos.append("nroCheque", nroCheque)
	datos.append("orden", orden)
	datos.append("concepto", concepto)
	datos.append("importe", importe)
	datos.append("banco", banco)
	datos.append("pagado", pagado)
	datos.append("tipo", tipo)
	datos.append("estado", estado)
	datos.append("imagencheque", imagencheque)
	datos.append("ext", extimagencheque)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
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
					limpiarcamposCheque()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmCheque = ""
					buscarabmCheque();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function checkestadoCheque(d){	
	if(d=="1"){
		document.getElementById('inptSeleccEstadoBuscarCheque1').checked=true
		document.getElementById('inptSeleccEstadoBuscarCheque2').checked=false
		document.getElementById('inptFechaCheque1').value = "";
	    document.getElementById('inptFechaCheque2').value = "";	
	}else{		
		document.getElementById('inptSeleccEstadoBuscarCheque1').checked=false
		document.getElementById('inptSeleccEstadoBuscarCheque2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaCheque1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptFechaCheque2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarabmCheque() {
	// if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var listado = iniciarListadoAbmCheque()
	var fechaEmi = document.getElementById('inptBuscarAbmCheque1').value
	var NroCheque = document.getElementById('inptBuscarAbmCheque2').value
	var fechaven = document.getElementById('inptBuscarAbmCheque3').value
	var orden = document.getElementById('inptBuscarAbmCheque4').value
	var concepto = document.getElementById('inptBuscarAbmCheque5').value
	var pago = document.getElementById('inptBuscarAbmCheque6').value
	var banco = document.getElementById('inptBuscarAbmCheque7').value
	var tipo = document.getElementById('inptBuscarAbmCheque8').value
	var monto = document.getElementById('inptBuscarAbmCheque9').value
	var cod_cheque = document.getElementById('inptBuscarAbmCheque10').value
	var agrupado = document.getElementById('inptChequeAgrupado').value
	 
	var Fecha1 = ""
	var Fecha2 = ""
	
	if(document.getElementById('inptSeleccEstadoBuscarCheque1').checked!=true){
		Fecha1 = document.getElementById('inptFechaCheque1').value
		Fecha2 = document.getElementById('inptFechaCheque2').value
	}
	
	document.getElementById("table_abm_Cheque").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fechaEmi": fechaEmi,
		"NroCheque": NroCheque,
		"fechaven": fechaven,
		"orden": orden,
		"concepto": concepto,
		"pago": pago,
		"banco": banco,
		"tipo": tipo,
		"Fecha1": Fecha1,
		"Fecha2": Fecha2,
		"monto": monto,
		"cod_cheque": cod_cheque,
		"agrupado": agrupado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Cheque").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Cheque").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listadoAbmCheque) listadoAbmCheque.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoCheque").value = datos[3];
					document.getElementById("inptTotalMontoRegistoCheque").value =  datos[4];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmCheque)
else iniciarListadoAbmCheque()
function limpiarcamposCheque() {
	document.getElementById('inptFechEmiCheque').value = "";
	document.getElementById('inptFechaVenCheque').value = "";
	document.getElementById('inptNroCheque').value = "";
	document.getElementById('inptOrdenCheque').value = "";
	document.getElementById('inptConceptoCheque').value = "";
	document.getElementById('inptImporteCheque').value = "";
	document.getElementById('inptNombreBancoCheque').value = "";
	document.getElementById('inptEstadoCheque').value = "Activo";
	document.getElementById('inptPagadoCheque').value = "PENDIENTE";
	document.getElementById('inptRegistroSeleccCheque').value = "";
	document.getElementById('btnEditarDatosCheque').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmCheque').value = "Guardar datos";
	document.getElementById('inptTipoCheque').value = "";
	idAbmCheque= "";
	
	imagencheque="";
	extimagencheque = "";
}


// CARGAR ARCHIVO CHEQUE
function ExploradorPDFCheque(File){	
$("input[name="+File+"]").click();
}
var imagencheque="";
var extimagencheque = "";
function readFileCheque(input){
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
extimagencheque = file_extension;

if ((file_extension != "png") && (file_extension != "jpg") && (file_extension != "jpeg")){
ver_vetana_informativa("EL ARCHIVO SELECCIONADO NO ES UNA IMAGEN");
return false;
}
// console.log('segmento carga archivo')
imagencheque = input.files[0];
}

