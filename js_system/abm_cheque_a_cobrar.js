  /*
ABM CHEQUE A COBRAR
*/
var listadoAbmChequeACobrar = null
function iniciarListadoAbmChequeACobrar() {
	if (listadoAbmChequeACobrar || !window.AbmListadoCore) return listadoAbmChequeACobrar
	var cuerpo = document.getElementById('table_abm_ChequeACobrar')
	var cabecera = document.querySelector('#tablacabeceraChequeACobrar tr')
	if (!cuerpo || !cabecera) return null
	cabecera.id = 'cabeceraAbmChequeACobrar'
	listadoAbmChequeACobrar = window.AbmListadoCore.crear({
		nombre: 'cheque_a_cobrar',
		idCabecera: 'cabeceraAbmChequeACobrar',
		idCuerpo: 'table_abm_ChequeACobrar',
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
			funcionSeleccion: 'ObtenerdatosAbmChequeACobrar',
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
				{ columna: 'url', render: function (url) {
					if (!url) return ''
					var boton = document.createElement('input')
					boton.type = 'button'
					boton.value = 'VER'
					boton.className = 'btn4'
					boton.style.width = '50px'
					boton.addEventListener('click', function () {
						if (typeof verdocumentoClienteSolicitud === 'function') verdocumentoClienteSolicitud(url)
					})
					return boton
				} },
				{ id: 'td_datos_9', campo: 'nombre_banco', tecnica: true },
				{ id: 'td_datos_10', campo: 'estado', tecnica: true }
			]
		}
	})
	listadoAbmChequeACobrar.iniciar()
	return listadoAbmChequeACobrar
}
function verCerrarAbmChequeACobrar(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmChequeACobrar").style.display==""){
		document.getElementById("divMinimizadoChequeACobrar").style.display="none"
		limpiarcamposChequeACobrar()
		limpiarcamposbuscarChequeACobrar()
//  
	$("div[id=divAbmChequeACobrar]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADOCHEQUEACOBRAR","accion")==false){return;}
		mostrarSoloUno("divAbmChequeACobrar")	
		document.getElementById("divAbmChequeACobrar").style.display=""
//  
	}
}

function verCerrarVentanaAbmChequeACobrar(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			limpiarcamposChequeACobrar()
		}
		$("div[id=divAbmChequeACobrar2]").fadeIn(250)
		document.getElementById('divAbmChequeACobrar1').style.display = "none"
	} else {
		$("div[id=divAbmChequeACobrar1]").fadeIn(250)
		document.getElementById('divAbmChequeACobrar2').style.display = "none"
	}
}


function limpiarcamposbuscarChequeACobrar(){
	    document.getElementById('inptBuscarAbmChequeACobrar1').value=""
		document.getElementById('inptBuscarAbmChequeACobrar2').value=""
		document.getElementById('inptBuscarAbmChequeACobrar3').value=""
		document.getElementById('inptBuscarAbmChequeACobrar4').value=""
		document.getElementById('inptBuscarAbmChequeACobrar5').value=""
		document.getElementById('inptBuscarAbmChequeACobrar6').value=""
		document.getElementById('inptBuscarAbmChequeACobrar7').value=""
		document.getElementById('inptBuscarAbmChequeACobrar8').value=""
		document.getElementById('inptBuscarAbmChequeACobrar9').value=""
		document.getElementById("table_abm_ChequeACobrar").innerHTML = ""
		document.getElementById("inptTotalRegistoChequeACobrar").value = "";
		document.getElementById("inptTotalMontoRegistoChequeACobrar").value = "";
}
function minimizarabmChequeACobrar(){
	$("div[id=divAbmChequeACobrar]").fadeOut(500);	
	document.getElementById("divMinimizadoChequeACobrar").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuChequeACobrar"));
}

function verVentanaEditarChequeACobrar() {
	if (idAbmChequeACobrar == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	verCerrarVentanaAbmChequeACobrar("1", "2")
}
var idAbmChequeACobrar = ""
function ObtenerdatosAbmChequeACobrar(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	document.getElementById('inptFechEmiChequeACobrar').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptFechaVenChequeACobrar').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptNroChequeACobrar').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptOrdenChequeACobrar').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptConceptoChequeACobrar').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptImporteChequeACobrar').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptNombreBancoChequeACobrar').value = $(datostr).children('td[id="td_datos_9"]').html();
	document.getElementById('inptEstadoChequeACobrar').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptPagadoChequeACobrar').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptRegistroSeleccChequeACobrar').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptTipoChequeACobrar').value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById('btnEditarDatosChequeACobrar').style.backgroundColor="";
	document.getElementById('btnAbmChequeACobrar').value =  "Editar datos";
		
	idAbmChequeACobrar = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposChequeACobrar() {
	var inptFechEmiChequeACobrar = document.getElementById('inptFechEmiChequeACobrar').value
	var inptFechaVenChequeACobrar = document.getElementById('inptFechaVenChequeACobrar').value
	var inptNroChequeACobrar = document.getElementById('inptNroChequeACobrar').value
	var inptOrdenChequeACobrar = document.getElementById('inptOrdenChequeACobrar').value
	var inptConceptoChequeACobrar = document.getElementById('inptConceptoChequeACobrar').value
	// Obtener la opción seleccionada
	// var selectedOption = inptConceptoChequeACobrar.options[inptConceptoChequeACobrar.selectedIndex];

	// Obtener el texto de la opción seleccionada
	// var inptConceptoChequeACobrar = selectedOption.textContent || selectedOption.innerText;


	var inptImporteChequeACobrar = document.getElementById('inptImporteChequeACobrar').value
	var inptNombreBancoChequeACobrar = document.getElementById('inptNombreBancoChequeACobrar').value
	var inptEstadoChequeACobrar = document.getElementById('inptEstadoChequeACobrar').value
	var inptPagadoChequeACobrar = document.getElementById('inptPagadoChequeACobrar').value
	var inptTipoChequeACobrar = document.getElementById('inptTipoChequeACobrar').value
	
	if (inptFechEmiChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE EMISION")
		return false;
	}
	
	if (inptFechaVenChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE VENCIMIENTO")
		return false;
	}
	
	if (inptNroChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NUMERO DE CHEQUE")
		return false;
	}
	
	if (inptOrdenChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE ")
		return false;
	}
	if (inptConceptoChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR EL CONCEPTO")
		return false;
	}
	if (inptImporteChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR EL IMPORTE")
		return false;
	}
	if (inptNombreBancoChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL BANCO")
		return false;
	}
	if (inptTipoChequeACobrar == "") {
		ver_vetana_informativa("FALTO INGRESAR TIPO CHEQUE")
		return false;
	}
	if (inptEstadoChequeACobrar == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}
	
	var accion = "";
	if (idAbmChequeACobrar != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
	}
	abmChequeACobrar(inptPagadoChequeACobrar,inptFechEmiChequeACobrar ,inptFechaVenChequeACobrar , inptNroChequeACobrar ,inptOrdenChequeACobrar , inptConceptoChequeACobrar ,inptImporteChequeACobrar , inptNombreBancoChequeACobrar, inptTipoChequeACobrar ,inptEstadoChequeACobrar , idAbmChequeACobrar, accion);
}
function abmChequeACobrar(pagado,fechaemi,fechaven ,nroChequeACobrar,orden ,concepto,importe ,banco,tipo,estado , idAbmChequeACobrar, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idAbmCheque", idAbmChequeACobrar)
	datos.append("fechaemi", fechaemi)
	datos.append("fechaven", fechaven)
	datos.append("nroCheque", nroChequeACobrar)
	datos.append("orden", orden)
	datos.append("concepto", concepto)
	datos.append("importe", importe)
	datos.append("banco", banco)
	datos.append("pagado", pagado)
	datos.append("tipo", tipo)
	datos.append("estado", estado)
	datos.append("imagencheque", imagenchequeacobrar)
	datos.append("ext", extimagenchequeacobrar)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmChequeACobrar.php",
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
					limpiarcamposChequeACobrar()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmChequeACobrar = ""
					buscarabmChequeACobrar();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function checkestadoChequeACobrar(d){	
	if(d=="1"){
		document.getElementById('inptSeleccEstadoBuscarChequeACobrar1').checked=true
		document.getElementById('inptSeleccEstadoBuscarChequeACobrar2').checked=false
		document.getElementById('inptFechaChequeACobrar1').value = "";
	    document.getElementById('inptFechaChequeACobrar2').value = "";	
	}else{		
		document.getElementById('inptSeleccEstadoBuscarChequeACobrar1').checked=false
		document.getElementById('inptSeleccEstadoBuscarChequeACobrar2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaChequeACobrar1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptFechaChequeACobrar2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarabmChequeACobrar() {
	// if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var listado = iniciarListadoAbmChequeACobrar()
	var fechaEmi = document.getElementById('inptBuscarAbmChequeACobrar1').value
	var NroChequeACobrar = document.getElementById('inptBuscarAbmChequeACobrar2').value
	var fechaven = document.getElementById('inptBuscarAbmChequeACobrar3').value
	var orden = document.getElementById('inptBuscarAbmChequeACobrar4').value
	var concepto = document.getElementById('inptBuscarAbmChequeACobrar5').value
	var pago = document.getElementById('inptBuscarAbmChequeACobrar6').value
	var banco = document.getElementById('inptBuscarAbmChequeACobrar7').value
	var tipo = document.getElementById('inptBuscarAbmChequeACobrar8').value
	var monto = document.getElementById('inptBuscarAbmChequeACobrar9').value
	var cod_cheque = document.getElementById('inptBuscarAbmChequeACobrar10').value
	 
	var Fecha1 = ""
	var Fecha2 = ""
	
	if(document.getElementById('inptSeleccEstadoBuscarChequeACobrar1').checked!=true){
		Fecha1 = document.getElementById('inptFechaChequeACobrar1').value
		Fecha2 = document.getElementById('inptFechaChequeACobrar2').value
	}
	
	document.getElementById("table_abm_ChequeACobrar").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fechaEmi": fechaEmi,
		"NroCheque": NroChequeACobrar,
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
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmChequeACobrar.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_ChequeACobrar").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_ChequeACobrar").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptTotalRegistoChequeACobrar").value = datos[3];
					document.getElementById("inptTotalMontoRegistoChequeACobrar").value =  datos[4];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmChequeACobrar)
else iniciarListadoAbmChequeACobrar()
function limpiarcamposChequeACobrar() {
	document.getElementById('inptFechEmiChequeACobrar').value = "";
	document.getElementById('inptFechaVenChequeACobrar').value = "";
	document.getElementById('inptNroChequeACobrar').value = "";
	document.getElementById('inptOrdenChequeACobrar').value = "";
	document.getElementById('inptConceptoChequeACobrar').value = "";
	document.getElementById('inptImporteChequeACobrar').value = "";
	document.getElementById('inptNombreBancoChequeACobrar').value = "";
	document.getElementById('inptEstadoChequeACobrar').value = "Activo";
	document.getElementById('inptPagadoChequeACobrar').value = "PENDIENTE";
	document.getElementById('inptRegistroSeleccChequeACobrar').value = "";
	document.getElementById('btnEditarDatosChequeACobrar').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmChequeACobrar').value = "Guardar datos";
	document.getElementById('inptTipoChequeACobrar').value = "";
	idAbmChequeACobrar= "";
	
	imagenchequeacobrar ="";
	extimagenchequeacobrar = "";
}


// CARGAR ARCHIVO CHEQUE A COBRAR
function ExploradorPDFChequeACobrar(File){	
$("input[name="+File+"]").click();
}
var imagenchequeacobrar="";
var extimagenchequeacobrar = "";
function readFileChequeACobrar(input){
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
extimagenchequeacobrar = file_extension;

if ((file_extension != "png") && (file_extension != "jpg") && (file_extension != "jpeg")){
ver_vetana_informativa("EL ARCHIVO SELECCIONADO NO ES UNA IMAGEN");
return false;
}
// console.log('segmento carga archivo')
imagenchequeacobrar = input.files[0];
}

