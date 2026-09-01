/*
ABM DESCRIPCION BANCO INGRESO EGRESO JUAN
*/
var idAbmDescripcionBancoEgresoIngresoJuan="";
var ElementoSeleccDescripcionBancoEgresoIngresoJuan="";
var listadoAbmDescripcionBancoEgresoIngresoJuan=null;
function iniciarListadoAbmDescripcionBancoEgresoIngresoJuan(){
	if(listadoAbmDescripcionBancoEgresoIngresoJuan || !window.AbmListadoCore) return listadoAbmDescripcionBancoEgresoIngresoJuan;
	var cuerpo=document.getElementById("divBuscadorDescripcionBancoEgresoIngresoJuan");
	if(!cuerpo) return null;
	var tablaCabecera=cuerpo.previousElementSibling;
	while(tablaCabecera && tablaCabecera.tagName!=="TABLE") tablaCabecera=tablaCabecera.previousElementSibling;
	var cabecera=tablaCabecera ? tablaCabecera.querySelector("tr") : null;
	if(!cabecera) return null;
	cabecera.id="cabeceraAbmDescripcionBancoEgresoIngresoJuan";
	listadoAbmDescripcionBancoEgresoIngresoJuan=window.AbmListadoCore.crear({
		nombre:"descripcion_banco_egreso_ingreso_juan",
		idCabecera:"cabeceraAbmDescripcionBancoEgresoIngresoJuan",
		idCuerpo:"divBuscadorDescripcionBancoEgresoIngresoJuan",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{funcionSeleccion:"ObtenerdatosAbmDescripcionBancoEgresoIngresoJuan",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
			{id:"td_datos_2",campo:"estado",tecnica:true}
		]}
	});
	listadoAbmDescripcionBancoEgresoIngresoJuan.iniciar();
	return listadoAbmDescripcionBancoEgresoIngresoJuan;
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmDescripcionBancoEgresoIngresoJuan);
else iniciarListadoAbmDescripcionBancoEgresoIngresoJuan();
function verCerrarFrmDescripcionBancoEgresoIngresoJuan(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVADESCRIPCIONBANCOEGRESOINGRESOJUAN","accion")==false){return;}	
		$("div[id=divAbmDescripcionBancoEgresoIngresoJuan]").fadeIn(500);
		BuscarAbmDescripcionBancoEgresoIngresoJuan()
	}else{
		$("div[id=divAbmDescripcionBancoEgresoIngresoJuan]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionBancoEgresoIngresoJuan(){
	document.getElementById("inptNombreDescripcionBancoEgresoIngresoJuan").value="";
	document.getElementById("inptEstadoDescripcionBancoEgresoIngresoJuan").value="";
	document.getElementById("btnDescripcionBancoEgresoIngresoJuan1").value="Guardar Datos"
	idAbmDescripcionBancoEgresoIngresoJuan="";
	ElementoSeleccDescripcionBancoEgresoIngresoJuan="";
}
function ObtenerdatosAbmDescripcionBancoEgresoIngresoJuan(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionBancoEgresoIngresoJuan=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionBancoEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionBancoEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionBancoEgresoIngresoJuan = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionBancoEgresoIngresoJuan1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionBancoEgresoIngresoJuan(){
	if(ElementoSeleccDescripcionBancoEgresoIngresoJuan==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionBancoEgresoIngresoJuan").style.display="none";
	 document.getElementById("inptBancoEgresoIngresoJuan").value = idAbmDescripcionBancoEgresoIngresoJuan
	 LimpiarCamposDescripcionBancoEgresoIngresoJuan()
}
function VerificarDatosDescripcionBancoEgresoIngresoJuan(){
	var inptNombreDescripcionBancoEgresoIngresoJuan = document.getElementById("inptNombreDescripcionBancoEgresoIngresoJuan").value
	var inptEstadoDescripcionBancoEgresoIngresoJuan = document.getElementById("inptEstadoDescripcionBancoEgresoIngresoJuan").value	
	if(inptNombreDescripcionBancoEgresoIngresoJuan==""){
		document.getElementById("inptNombreDescripcionBancoEgresoIngresoJuan").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionBancoEgresoIngresoJuan==""){
		document.getElementById("inptEstadoDescripcionBancoEgresoIngresoJuan").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionBancoEgresoIngresoJuan != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionBancoEgresoIngresoJuan(inptNombreDescripcionBancoEgresoIngresoJuan,inptEstadoDescripcionBancoEgresoIngresoJuan,idAbmDescripcionBancoEgresoIngresoJuan,accion)
}
function AbmDescripcionBancoEgresoIngresoJuan(descripcion,Estado,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("Estado", Estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoEgresoIngresoJuan.php",
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
				LimpiarCamposDescripcionBancoEgresoIngresoJuan()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionBancoEgresoIngresoJuan()
				BuscarSelecDescripcionBancoEgresoIngresoJuan()
				}
				else {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmDescripcionBancoEgresoIngresoJuan() {
	var listado=iniciarListadoAbmDescripcionBancoEgresoIngresoJuan();
	var buscador = document.getElementById("inptBuscarAbmDescripcionBancoEgresoIngresoJuan").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionBancoEgresoIngresoJuan").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionBancoEgresoIngresoJuan").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoJuan").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoEgresoIngresoJuan.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionBancoEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoJuan").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionBancoEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoJuan").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
                   document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoJuan").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionBancoEgresoIngresoJuan() {
	document.getElementById("inptBancoEgresoIngresoJuan").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoEgresoIngresoJuan.php",
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
					document.getElementById("inptBancoEgresoIngresoJuan").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function verCerrarVentaMetasListado(){
	
	if(document.getElementById("divVentaMetasLista").style.display==""){
	 
	$("div[id=divVentaMetasLista]").fadeOut(500);	
		
		}else{		
				
	 document.getElementById("divVentaMetasLista").style.display=""
      
	 buscarMetasVenta()	
	
		
	}
}




function verCerrarAbmVentaMetasListado(){
	
	if(document.getElementById("divAbmMetasVentaLista").style.display==""){	 
			$("div[id=divAbmMetasVentaLista]").fadeOut(500);
	}else{
		limpiarcamposMetasVenta()
		document.getElementById("divAbmMetasVentaLista").style.display=""
	}
}




var idAbmMetaVenta ="";
function verificarcamposAbmMetasVenta() {
	var inptAbmMontoCreditoMetasVenta = document.getElementById('inptAbmMontoCreditoMetasVenta').value
	var inptAbmMontoContadoMetasVenta = 0
	var inptAbmFechaMetasVenta = document.getElementById('inptAbmFechaMetasVenta').value 
	
	if (inptAbmMontoCreditoMetasVenta == "") {
		ver_vetana_informativa("FALTO INGESAR EL MONTO CREDITO", "#")
		return false;
	}
 
	if (inptAbmFechaMetasVenta == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA", "#")
		return false;
	}
	
	

	var accion = "";
	if (idAbmMetaVenta != "") {
		accion = "editar_metaVenta";
		 
	} else {
		accion = "nuevo_metaVenta";
	}
		
	AbmMetasVenta(inptAbmMontoCreditoMetasVenta,inptAbmMontoContadoMetasVenta,inptAbmFechaMetasVenta,idAbmMetaVenta,accion);
}

function AbmMetasVenta(credito,contado,fecha,idAbmMetaVenta,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("credito", credito)
	datos.append("contado", contado)
	datos.append("fecha", fecha)
	datos.append("idAbmMetaVenta", idAbmMetaVenta) 
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
					limpiarcamposMetasVenta()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarMetasVenta()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});
 
}

var listadoInformeChequeGeneral = null;
var listadoInformeSalarioFuncionarioGeneral = null;

function iniciarListadoInformeMensual(nombre, idCuerpo, idCabecera, despuesRender) {
	if (!window.AbmListadoCore) { return null; }
	var cuerpo = document.getElementById(idCuerpo);
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = idCabecera;
	var titulos = ["DIA", "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var columnas = [{ campo: "dia", titulo: titulos[0], ancho: "5%" }];
	var celdas = [{ campo: "dia", columna: "dia" }];
	for (var mes = 1; mes <= 12; mes++) {
		(function (numeroMes) {
			columnas.push({ campo: "mes_" + numeroMes, titulo: titulos[numeroMes], ancho: "5%" });
			celdas.push({
				columna: "mes_" + numeroMes,
				valor: function (registro) { return registro["mes_" + numeroMes + "_formateado"]; }
			});
		}(mes));
	}
	var listado = window.AbmListadoCore.crear({
		nombre: nombre,
		idCabecera: idCabecera,
		idCuerpo: idCuerpo,
		ordenInicial: "dia",
		columnas: columnas,
		fila: { celdas: celdas },
		despuesRender: despuesRender
	});
	listado.iniciar();
	return listado;
}

function iniciarListadoInformeChequeGeneral() {
	if (!listadoInformeChequeGeneral) {
		listadoInformeChequeGeneral = iniciarListadoInformeMensual(
			"informe_cheque_general",
			"table_informe_chequegeneral",
			"cabeceraInformeChequeGeneral",
			function () { agregarFilaTotalesInformeChequeGeneral(); }
		);
	}
	return listadoInformeChequeGeneral;
}

function iniciarListadoInformeSalarioFuncionarioGeneral() {
	if (!listadoInformeSalarioFuncionarioGeneral) {
		listadoInformeSalarioFuncionarioGeneral = iniciarListadoInformeMensual(
			"informe_salario_funcionario_general",
			"table_informe_SalarioFuncionarioGeneral",
			"cabeceraInformeSalarioFuncionarioGeneral",
			function () { agregarFilaTotalesInformeSalarioFuncionarioGeneral(); }
		);
	}
	return listadoInformeSalarioFuncionarioGeneral;
}

/* INFORME GENERAL DE CHEQUES */
function verCerrarInformeChequeGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeChequeGeneral").style.display==""){
		limpiarventanainformechequegeneral()
		
		$("div[id=divInformeChequeGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeChequeGeneral").style.display=""
	}
}
function buscarinformeChequeGeneral() {
	var listado = iniciarListadoInformeChequeGeneral();
	var anho = document.getElementById("inptBuscarInformeChequeGeneralFecha").value
	var pagado = document.getElementById("inptBuscarInformeChequeGeneralPagado").value
	var tipoDeuda = document.getElementById("inptBuscarInformeChequeGeneralTipoDeuda").value
	
	
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_chequegeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"pagado": pagado,
		"tipoDeuda": tipoDeuda,
		"formato": "json",
		"funt": "buscar_informe_cheque_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_chequegeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_chequegeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(pagina) ? pagina : []); }
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformeChequeGeneralGrafica() {
	var anho = document.getElementById("inptBuscarInformeChequeGeneralFecha").value
	var pagado = document.getElementById("inptBuscarInformeChequeGeneralPagado").value
	var tipoDeuda = document.getElementById("inptBuscarInformeChequeGeneralTipoDeuda").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"pagado": pagado,
		"tipoDeuda": tipoDeuda,
		"funt": "buscar_informe_cheque_general_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
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
					
					
					if(obj_chart_cheque_general){
						obj_chart_cheque_general.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
					let data = {
					labels: labels,
					datasets: [{
						label: datos[5],
						data: datos[3],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  datos[6],
						data: datos[4],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_informe_cheque_general(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
let obj_chart_cheque_general = '';
function generar_graficos_informe_cheque_general(data){
	const graph = document.querySelector("#graph_informe_cheque_general");


	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_cheque_general = new Chart(graph, config);
}
function limpiarventanainformechequegeneral(){ 
	document.getElementById("table_informe_chequegeneral").innerHTML="" 
	
	if(obj_chart_cheque_general){
		obj_chart_cheque_general.destroy()
	}
	
	document.getElementById('inptBuscarInformeChequeGeneralFecha').value = ''
	document.getElementById('inptBuscarInformeChequeGeneralPagado').value = ''
	document.getElementById('inptBuscarInformeChequeGeneralTipoDeuda').value = ''
	document.getElementById("btnInformeChequeGeneral1").style='background-color:#ff9800;color:#fff';
	document.getElementById("btnInformeChequeGeneral2").style='';
	document.getElementById("divVentanaInformeChequeGeneral1").style.display=''
	document.getElementById("divVentanaInformeChequeGeneral2").style.display='none'
	
	
}
function verCerrarInformeVentanasChequeGeneral(d){
	var selectAnho = document.getElementById('inptBuscarInformeChequeGeneralFecha').value;
	if(selectAnho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
		return;
	}
	
	document.getElementById("btnInformeChequeGeneral1").style=''
	document.getElementById("btnInformeChequeGeneral2").style=''
	
	document.getElementById("divVentanaInformeChequeGeneral1").style.display='none'
	document.getElementById("divVentanaInformeChequeGeneral2").style.display='none'


	if(d=="1"){
		
		buscarinformeChequeGeneral()
		document.getElementById("btnInformeChequeGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeChequeGeneral1").style.display=''
			
	}
	if(d=="2"){
		
		buscarinformeChequeGeneralGrafica()
		document.getElementById("btnInformeChequeGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeChequeGeneral2").style.display=''
			
		
		
	}
}

function textoANumero(texto) {
    if (!texto) return 0;
    return parseFloat(texto.replace(/\./g, '').replace(',', '.')) || 0;
}
function sumarColumnas() {
    const contenedor = document.getElementById('table_informe_chequegeneral');
    const tablas = contenedor.querySelectorAll('table');
    
    let totales = [];

    tablas.forEach(tabla => {
        const celdas = tabla.querySelectorAll('td');

        celdas.forEach((td, index) => {
            const valor = textoANumero(td.innerText.trim());
            totales[index] = (totales[index] || 0) + valor;
        });
    });

    return totales;
}
function agregarFilaTotalesInformeChequeGeneral() {
    const contenedor = document.getElementById('table_informe_chequegeneral');
    const totales = sumarColumnas();

    const tablaTotal = document.createElement('table');
    tablaTotal.className = 'tableRegistroSearch'; // misma clase
    tablaTotal.border = 1;
    tablaTotal.cellSpacing = 1;
    tablaTotal.cellPadding = 5;

    const tr = document.createElement('tr');
    tr.style.fontWeight = 'bold';
    tr.style.background = '#e9ecef';

    totales.forEach((total, index) => {
        const td = document.createElement('td');
        td.style.width = '5%';

        if (index === 0) {
            td.innerText = 'TOTAL';
        } else {
            td.innerText = total.toLocaleString('es-ES');
        }

        tr.appendChild(td);
    });

    tablaTotal.appendChild(tr);
    contenedor.appendChild(tablaTotal);
}


/* INFORME GENERAL DE SALARIO FUNCIONARIO */
function verCerrarInformeSalarioFuncionarioGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeSalarioFuncionarioGeneral").style.display==""){
		limpiarventanainformeSalarioFuncionarioGeneral()
		
		$("div[id=divInformeSalarioFuncionarioGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeSalarioFuncionarioGeneral").style.display=""
	}
}
function buscarinformeSalarioFuncionarioGeneral() {
	var listado = iniciarListadoInformeSalarioFuncionarioGeneral();
	var anho = document.getElementById("inptBuscarInformeSalarioFuncionarioGeneralFecha").value
	var local = document.getElementById("inptBuscarInformeSalarioFuncionarioGeneralLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_SalarioFuncionarioGeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"local": local,
		"formato": "json",
		"funt": "buscar_informe_salariofuncionario_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_SalarioFuncionarioGeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_SalarioFuncionarioGeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(pagina) ? pagina : []); }
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformeSalarioFuncionarioGeneralGrafica() {
	var anho = document.getElementById("inptBuscarInformeSalarioFuncionarioGeneralFecha").value
	var local = document.getElementById("inptBuscarInformeSalarioFuncionarioGeneralLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"local": local,
		"funt": "buscar_informe_salariofuncionario_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
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
					
					
					if(obj_chart_salariofuncionario_general){
						obj_chart_salariofuncionario_general.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
					let data = {
					labels: labels,
					datasets: [{
						label: datos[5],
						data: datos[3],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  datos[6],
						data: datos[4],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_informe_cheque_general(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
let obj_chart_salariofuncionario_general = '';
function generar_graficos_informe_cheque_general(data){
	const graph = document.querySelector("#graph_informe_salariofuncionario_general");


	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_salariofuncionario_general = new Chart(graph, config);
}
function limpiarventanainformeSalarioFuncionarioGeneral(){ 
	document.getElementById("table_informe_SalarioFuncionarioGeneral").innerHTML="" 
	
	if(obj_chart_salariofuncionario_general){
		obj_chart_salariofuncionario_general.destroy()
	}
	
	document.getElementById('inptBuscarInformeSalarioFuncionarioGeneralFecha').value = ''
	document.getElementById('inptBuscarInformeSalarioFuncionarioGeneralLocal').value = ''
	document.getElementById("btnInformeSalarioFuncionarioGeneral1").style='background-color:#ff9800;color:#fff';
	document.getElementById("btnInformeSalarioFuncionarioGeneral2").style='';
	document.getElementById("divVentanaInformeSalarioFuncionarioGeneral1").style.display=''
	document.getElementById("divVentanaInformeSalarioFuncionarioGeneral2").style.display='none'
	
	
}
function verCerrarInformeVentanasSalarioFuncionarioGeneral(d){
	var selectAnho = document.getElementById('inptBuscarInformeSalarioFuncionarioGeneralFecha').value;
	if(selectAnho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
		return;
	}
	
	document.getElementById("btnInformeSalarioFuncionarioGeneral1").style=''
	document.getElementById("btnInformeSalarioFuncionarioGeneral2").style=''
	
	document.getElementById("divVentanaInformeSalarioFuncionarioGeneral1").style.display='none'
	document.getElementById("divVentanaInformeSalarioFuncionarioGeneral2").style.display='none'


	if(d=="1"){
		
		buscarinformeSalarioFuncionarioGeneral()
		document.getElementById("btnInformeSalarioFuncionarioGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeSalarioFuncionarioGeneral1").style.display=''
			
	}
	if(d=="2"){
		
		buscarinformeSalarioFuncionarioGeneralGrafica()
		document.getElementById("btnInformeSalarioFuncionarioGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeSalarioFuncionarioGeneral2").style.display=''
			
		
		
	}
}

function agregarFilaTotalesInformeSalarioFuncionarioGeneral() {
    const contenedor = document.getElementById('table_informe_SalarioFuncionarioGeneral');
    const totales = sumarColumnasSalarioFuncionarioGeneral();

    const tablaTotal = document.createElement('table');
    tablaTotal.className = 'tableRegistroSearch'; // misma clase
    tablaTotal.border = 1;
    tablaTotal.cellSpacing = 1;
    tablaTotal.cellPadding = 5;

    const tr = document.createElement('tr');
    tr.style.fontWeight = 'bold';
    tr.style.background = '#e9ecef';

    totales.forEach((total, index) => {
        const td = document.createElement('td');
        td.style.width = '5%';

        if (index === 0) {
            td.innerText = 'TOTAL';
        } else {
            td.innerText = total.toLocaleString('es-ES');
        }

        tr.appendChild(td);
    });

    tablaTotal.appendChild(tr);
    contenedor.appendChild(tablaTotal);
}
function sumarColumnasSalarioFuncionarioGeneral() {
    const contenedor = document.getElementById('table_informe_SalarioFuncionarioGeneral');
    const tablas = contenedor.querySelectorAll('table');
    
    let totales = [];

    tablas.forEach(tabla => {
        const celdas = tabla.querySelectorAll('td');

        celdas.forEach((td, index) => {
            const valor = textoANumero(td.innerText.trim());
            totales[index] = (totales[index] || 0) + valor;
        });
    });

    return totales;
}

function limpiarcamposMetasVenta() {
	document.getElementById('inptAbmMontoCreditoMetasVenta').value=""
	document.getElementById('inptAbmMontoContadoMetasVenta').value=""
	document.getElementById('inptAbmFechaMetasVenta').value =""
	document.getElementById('btnAbmMetasVenta').value = "Guardar";
	idAbmMetaVenta="";
}

function checkfiltrosMetasLocal(d){
	if(d=="1"){
	document.getElementById('inptCheckMetasLocal1').checked=true
	document.getElementById('inptCheckMetasLocal2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarFechaFiltroMetaVentas1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarFechaFiltroMetaVentas2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
		document.getElementById('inptCheckMetasLocal1').checked=false
		document.getElementById('inptCheckMetasLocal2').checked=true
		document.getElementById('inptBuscarFechaFiltroMetaVentas1').value="";
		document.getElementById('inptBuscarFechaFiltroMetaVentas2').value="";
	}
}

function valorSeguroMetaVenta(valor) {
	return valor === null || typeof valor === "undefined" ? "" : String(valor);
}

function porcentajeSeguroMetaVenta(valor) {
	var porcentaje = parseInt(valor, 10);
	if (isNaN(porcentaje)) {
		return 0;
	}
	return Math.max(0, Math.min(100, porcentaje));
}

function crearBloqueMetaVenta(etiqueta, porcentaje, meta, actual, oculto) {
	var bloque = document.createElement("div");
	bloque.className = "bloque-dato";
	if (oculto) {
		bloque.style.display = "none";
	}

	var cabecera = document.createElement("div");
	cabecera.className = "bloque-header";
	var label = document.createElement("span");
	label.className = "label";
	label.textContent = etiqueta;
	var porcentajeTexto = document.createElement("span");
	porcentajeTexto.className = "porcentaje texto-secundario";
	porcentajeTexto.textContent = porcentaje + "%";
	cabecera.appendChild(label);
	cabecera.appendChild(porcentajeTexto);
	bloque.appendChild(cabecera);

	var valores = document.createElement("div");
	valores.className = "valores";
	var valorMeta = document.createElement("span");
	valorMeta.className = "valor-meta";
	valorMeta.appendChild(document.createTextNode("Meta: "));
	var metaNegrita = document.createElement("b");
	metaNegrita.textContent = "Gs. " + valorSeguroMetaVenta(meta);
	valorMeta.appendChild(metaNegrita);
	var valorReal = document.createElement("span");
	valorReal.className = "valor-real";
	valorReal.appendChild(document.createTextNode("Actual: "));
	var actualNegrita = document.createElement("b");
	actualNegrita.textContent = "Gs. " + valorSeguroMetaVenta(actual);
	valorReal.appendChild(actualNegrita);
	valores.appendChild(valorMeta);
	valores.appendChild(valorReal);
	bloque.appendChild(valores);

	var barra = document.createElement("div");
	barra.className = "barra-progreso";
	var progreso = document.createElement("div");
	progreso.className = "progreso";
	progreso.style.width = porcentaje + "%";
	barra.appendChild(progreso);
	bloque.appendChild(barra);
	return bloque;
}

function renderMetasVenta(filas) {
	var contenedor = document.getElementById("table_abm_Metas_venta");
	if (!contenedor) {
		return;
	}
	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}
	if (!Array.isArray(filas) || filas.length === 0) {
		var sinResultados = document.createElement("div");
		sinResultados.className = "sin-resultados";
		sinResultados.textContent = "No hay registros disponibles.";
		contenedor.appendChild(sinResultados);
		return;
	}

	var tarjetas = document.createElement("div");
	tarjetas.className = "contenedor-tarjetas";
	filas.forEach(function (registro) {
		var porcentajeContado = porcentajeSeguroMetaVenta(registro.porcentaje_contado);
		var porcentajeCredito = porcentajeSeguroMetaVenta(registro.porcentaje_credito);
		var tarjeta = document.createElement("div");
		tarjeta.className = "tarjeta-meta";
		tarjeta.onclick = function () {
			obtenerdatosMetasVenta(this);
		};

		var cabecera = document.createElement("div");
		cabecera.className = "tarjeta-header";
		var titulo = document.createElement("div");
		titulo.className = "tarjeta-titulo";
		var h3 = document.createElement("h3");
		h3.textContent = "META #" + valorSeguroMetaVenta(registro.id_meta);
		var fechaMes = document.createElement("span");
		fechaMes.className = "fecha-meta";
		fechaMes.textContent = valorSeguroMetaVenta(registro.fecha_mes);
		titulo.appendChild(h3);
		titulo.appendChild(fechaMes);
		var badge = document.createElement("div");
		badge.className = "badge-meta";
		var porcentajeTotal = document.createElement("span");
		porcentajeTotal.className = "porcentaje-total";
		porcentajeTotal.textContent = porcentajeCredito + "%";
		badge.appendChild(porcentajeTotal);
		cabecera.appendChild(titulo);
		cabecera.appendChild(badge);
		tarjeta.appendChild(cabecera);

		[
			["contado-meta", registro.meta_contado],
			["credito-meta", registro.meta_credito],
			["fecha2-meta", registro.fecha]
		].forEach(function (dato) {
			var oculto = document.createElement("div");
			oculto.style.display = "none";
			var span = document.createElement("span");
			span.className = dato[0];
			span.textContent = valorSeguroMetaVenta(dato[1]);
			oculto.appendChild(span);
			tarjeta.appendChild(oculto);
		});

		var cuerpo = document.createElement("div");
		cuerpo.className = "tarjeta-body";
		cuerpo.appendChild(crearBloqueMetaVenta("Contado", porcentajeContado, registro.meta_contado_formateado, registro.actual_contado_formateado, true));
		cuerpo.appendChild(crearBloqueMetaVenta("Metas", porcentajeCredito, registro.meta_credito_formateado, registro.actual_credito_formateado, false));
		tarjeta.appendChild(cuerpo);
		tarjetas.appendChild(tarjeta);
	});
	contenedor.appendChild(tarjetas);
}

function buscarMetasVenta() {
	// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
	 	
	document.getElementById("table_abm_Metas_venta").innerHTML = paginacargando
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,  
		"funt": "buscarMetasVenta",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Metas_venta").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Metas_venta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					renderMetasVenta(datos_buscados);
 
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}





function ordenarTarjetasPorPorcentaje() {
    const contenedor = document.querySelector(".contenedor-tarjetas");

    // Obtener todas las tarjetas como array
    const tarjetas = Array.from(contenedor.querySelectorAll(".tarjeta-meta"));

    // Ordenar por el texto numérico del span .porcentaje-total
    tarjetas.sort((a, b) => {
        const porcA = parseInt(a.querySelector(".porcentaje-total").innerText.replace('%', ''));
        const porcB = parseInt(b.querySelector(".porcentaje-total").innerText.replace('%', ''));
        return porcB - porcA; // DESCENDENTE
    });

    // Vaciar contenedor
    contenedor.innerHTML = "";

    // Insertar tarjetas ordenadas
    tarjetas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

// Ejecutar al cargar la página
// ordenarTarjetasPorPorcentaje();

 
function obtenerdatosMetasVenta(card) {
    // Extraer el código de la meta y la fecha desde el HTML
	const metaId = card.querySelector('h3').textContent.replace('META #', '').trim();
	const fecha = card.querySelector('.fecha2-meta').textContent.trim();
	const contado = card.querySelector('.contado-meta').textContent.trim();
	const credito = card.querySelector('.credito-meta').textContent.trim();
	
	document.getElementById('inptAbmMontoCreditoMetasVenta').value=separadordemilesnumero(credito)
	document.getElementById('inptAbmMontoContadoMetasVenta').value=separadordemilesnumero(contado)
	document.getElementById('inptAbmFechaMetasVenta').value =fecha
	document.getElementById('btnAbmMetasVenta').value = "Editar";
	idAbmMetaVenta= metaId;
	document.getElementById("divAbmMetasVentaLista").style.display=""
}
 


    async function clearAllCacheAndStorage() {
      // 1) localStorage y sessionStorage
      try {
        localStorage.clear();
      } catch (e) { console.warn("No se pudo limpiar localStorage:", e); }
      try {
        sessionStorage.clear();
      } catch (e) { console.warn("No se pudo limpiar sessionStorage:", e); }

      // 2) Cookies del dominio (intenta borrar las cookies visibles)
      try {
        const cookies = document.cookie.split("; ");
        for (const c of cookies) {
          const eqPos = c.indexOf("=");
          const name = eqPos > -1 ? c.substr(0, eqPos) : c;
          // para borrar: caducidad en pasado, path=/ (ajusta domain si lo necesitas)
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      } catch (e) { console.warn("No se pudieron borrar cookies:", e); }

      // 3) Cache Storage (API de cache usada por service workers / fetch)
      if ('caches' in window) {
        try {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        } catch (e) {
          console.warn("Error borrando Cache Storage:", e);
        }
      }

     

      // 5) Desregistrar Service Workers
      // if ('serviceWorker' in navigator) {
        // try {
          // const regs = await navigator.serviceWorker.getRegistrations();
          // await Promise.all(regs.map(reg => reg.unregister()));
        // } catch (e) {
          // console.warn("Error desregistrando service workers:", e);
        // }
      // }

      // 6) Forzar recarga (no existe location.reload(true) estándar actual;
      // usamos reload + cabeceras cache-control en el servidor o un trick con fetch)
      try {
        // Intento de evitar cache: hago fetch a la página con no-cache y luego recargo.
        await fetch(window.location.href, { cache: "reload", method: "GET", credentials: "same-origin" });
      } catch (e) {
        // no crítico si falla
      }

      // Recarga de la página
      window.location.reload();
    }




let totalAPagar_cuenta_cobrar = 0;
function obtenerTotalCheckBox(datos){
	event.stopPropagation();
	// document.getElementById('inptMontoCargaPago').value = '0';
	if(datos.checked){
		totalAPagar_cuenta_cobrar += parseInt(datos.id);
	}else{
		totalAPagar_cuenta_cobrar -= parseInt(datos.id);
	}

	document.getElementById('inptMontoCargaPago').value = separadordemilesnumero(totalAPagar_cuenta_cobrar);
	document.getElementById('inptTotalSeleccAPagar').value = separadordemilesnumero(totalAPagar_cuenta_cobrar);
}





/////////////////////////////////////////	Presupuesto

 
/* =========================================
   FUNCIONES AUXILIARES
========================================= */
 

function gs(numero) {
    return "Gs. " + formatearMiles(numero);
}

  
function generarNumeroPresupuesto() {
    var numero = localStorage.getItem("ultimoNumeroPresupuesto");
    if (!numero) {
        numero = 1;
    } else {
        numero = parseInt(numero, 10) + 1;
    }

    localStorage.setItem("ultimoNumeroPresupuesto", numero);

    return "PV-" + String(numero).padStart(6, "0");
}

function obtenerTextoSeguro(id) {
    var el = document.getElementById(id);
    if (!el) return "";
    return (el.value || el.innerText || el.textContent || "").trim();
}

function obtenerTextoSelect(id) {
    var select = document.getElementById(id);
    if (!select || select.selectedIndex < 0) return "";
    return select.options[select.selectedIndex].text;
}

/* =========================================
   RELLENAR DATOS DEL CLIENTE
   Ajustá estos datos si tenés otros inputs
========================================= */

// telefonoPresupuesto= $(datostr).children('td[id="td_datos_4"]').html();
		// rucPresupuesto

function obtenerDatosClientePresupuesto() {
    return {
        cliente: obtenerTextoSeguro("inptClientePresupuesto") || "CLIENTE NO SELECCIONADO",
        ruc: rucPresupuesto || "-",
        telefono: telefonoPresupuesto || "-",
        vendedor: obtenerTextoSeguro("lblUsuarioActual") || "Departamento de Ventas"
    };
}

/* =========================================
   CARGAR DETALLE DE PRODUCTOS
========================================= */
function cargarDetalleHojaPresupuesto() {
    var tbody = document.getElementById("pvDetalleBody");
    var subtotalGeneral = 0;
    var descuentoGeneral = 0;
    var totalGeneral = 0;
    var html = "";

    if (typeof detallesPresupuesto === "undefined" || !detallesPresupuesto || detallesPresupuesto.length === 0) {
        html += "<tr>";
        html += "<td colspan='8' style='text-align:center;padding:20px;'>No hay productos en el presupuesto</td>";
        html += "</tr>";

        tbody.innerHTML = html;

        document.getElementById("pvSubtotal").innerHTML = gs(0);
        document.getElementById("pvDescuentoTotal").innerHTML = gs(0);
        document.getElementById("pvTotal").innerHTML = gs(0);
        return;
    }

    for (var i = 0; i < detallesPresupuesto.length; i++) {
        var item = detallesPresupuesto[i];

        var codigo = item.codigo || "";
        var producto = item.producto || "";
        var marca = item.marca || "";
        var modelo = item.modelo || "";
        var cantidad = limpiarNumero(item.cantidad);
        var precio = limpiarNumero(item.precio);
        var descuento = limpiarNumero(item.descuento);
        var subtotal = limpiarNumero(item.subtotal);

        var subtotalSinDescuento = precio * cantidad;

        subtotalGeneral += subtotalSinDescuento;
        descuentoGeneral += descuento;
        totalGeneral += subtotal;

        html += "<tr>";
        html += "<td>" + codigo + "</td>";
        html += "<td class='text-left'>" + producto + "</td>"; 
        html += "<td>" + formatearMiles(cantidad) + "</td>";
        html += "<td>" + gs(precio) + "</td>";
        html += "<td>" + gs(descuento) + "</td>";
        html += "<td>" + gs(subtotal) + "</td>";
        html += "</tr>";
    }

    tbody.innerHTML = html;

    document.getElementById("pvSubtotal").innerHTML = gs(subtotalGeneral);
    document.getElementById("pvDescuentoTotal").innerHTML = gs(descuentoGeneral);
    document.getElementById("pvTotal").innerHTML = gs(totalGeneral);
}

/* =========================================
   RELLENAR TODA LA HOJA
========================================= */
function rellenarHojaPresupuesto() {
    var datosCliente = obtenerDatosClientePresupuesto();
    var condicion = obtenerTextoSelect("inptCondicionPresupuesto") || "CONTADO";
    var entrega = obtenerTextoSeguro("inptEntregaPresupuesto");
    var totalFormulario = limpiarNumero(obtenerTextoSeguro("inptTOTALPresupuesto"));

    document.getElementById("pvNumero").innerHTML = generarNumeroPresupuesto();
    document.getElementById("pvFecha").innerHTML = obtenerFechaActual();
    document.getElementById("pvValidez").innerHTML = "15 días";

    document.getElementById("pvCliente").innerHTML = datosCliente.cliente;
    document.getElementById("pvRuc").innerHTML = datosCliente.ruc;
    document.getElementById("pvTelefono").innerHTML = datosCliente.telefono;
    document.getElementById("pvVendedor").innerHTML = datosCliente.vendedor;

    document.getElementById("pvCondicionPago").innerHTML = "Forma de pago: " + condicion + ".";

    var obs = "Agradecemos la oportunidad de presentar esta propuesta comercial. ";
    obs += "Quedamos a disposición para realizar ajustes en cantidades, marcas, modelos o condiciones de pago según la necesidad del cliente.";

    if (entrega !== "" && limpiarNumero(entrega) > 0) {
        obs += " Entrega inicial acordada: " + gs(limpiarNumero(entrega)) + ".";
    }

    document.getElementById("pvObservaciones").innerHTML = obs;

    cargarDetalleHojaPresupuesto();

    if (totalFormulario > 0) {
        document.getElementById("pvTotal").innerHTML = gs(totalFormulario);
    }
}

/* =========================================
   IMPRIMIR SOLO LA HOJA
========================================= */



function imprimirPresupuesto() {
    rellenarHojaPresupuesto();

    var contenido = document.getElementById("hojaPresupuestoImprimir").innerHTML;
	 
	 localStorage.setItem("reporte", contenido);
	   localStorage.setItem("tipo", "reporte");
	 window.open("/GoodVentaElectroCasaMaric/system/reportePresupuesto.html");
} 

 

 
function calcular_total_Presupuesto() {
    var precio = limpiarNumero(document.getElementById("inptPrecioPresupuesto").value);
    var descuento = limpiarNumero(document.getElementById("inptDescuentoPresupuesto").value);
    var cantidad = limpiarNumero(document.getElementById("inptCantidadPresupuesto").value);

    var precioFinal = precio - descuento;
    if (precioFinal < 0) {
        precioFinal = 0;
    }

    var total = precioFinal * cantidad;

    document.getElementById("inptTotalPresupuesto").value = formatearMiles(total);
}



cod_ventaReciboFK="";

function buscarImprimirTicket() {
	document.getElementById("table_abm_detalle_venta").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": cod_ventaReciboFK,
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		  
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_detalle_venta").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_detalle_venta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];

				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					var datos_buscados = datos[2];
					 detallesRecibo = datos[5];
					 paginaDetalleTicket = datos[14];
					 paginaticket = datos[14];
					 CuotasNro=datos[41];
					 totalCobroCuota=datos[42];
					 totalCobroInteres=datos[43];
						
					 totalCobroCargoAdministrativo=datos[44];
					 totalCobroPagado=datos[45];
					 SubtotalRecibovaiva5 = datos[6];
					 SubtotalRecibovaiva10 = datos[7];
					 totalesReciboDetalleiva10 = datos[8];
					 totalesReciboDetalleiva15 = datos[9];
					 totalInteresRecibo = datos[36]; 
					totalesRecibo = datos[3]
					ImportePagare = datos[3] 
				    NombreRecibo=datos[10]
				    DireccionRecibo=datos[11]
                    telefonoRecino=datos[12]
                    DocumentoRecibo=datos[13] 
                    PlazoRecibo=datos[41]
                    facturanroPagare=datos[25]
					NroFacturaLegal=datos[25]
                    vencimientopagare=datos[26]
                    ZonaRecibo=datos[27]
                    telefonoRecinoGarante=datos[28]
                    ZonaReciboGarante=datos[29]
                    InteresRecibo=datos[30]
                    DeudaActualRecibo=datos[31]
                    DiasAtrasado=datos[32]
                    RucRecibo=datos[33]
					CiRecibo=datos[13]
                    TotalDescuentoRecibo=datos[34]
                    CuotasRestante=datos[35]
					TipoFactura=datos[40]
                    nroPagare=idabmVenta			
					
					zonagarante=datos[29]
					var fecha_venta=zonagarante=datos[46]
					
 var cajera = document.getElementById("lblUser").innerHTML;	
 var TotalDescuentoRecibo =0
 
ReImprimirDivTickeFacturaPago( fecha_venta, cajera, CuotasNro, totalesRecibo,"0",  NombreRecibo, DocumentoRecibo, facturanroPagare, "CONTADO",  "0", "", totalesRecibo, TotalDescuentoRecibo,  totalesRecibo, "0", "0")

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}




//OPCIONES DE PAGO
var controlPago = 0;
function verCerrarVentanaAnhadirPagoVenta(d){
	if(d=="1"){
		var controlventa = 0;
		$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
		controlventa=controlventa+1;
		});
		
	
		if(controlventa <= 0){
		ver_vetana_informativa("NO HAY NINGUNA VENTA EN PROCESO");
		return;
		}
		document.getElementById("divOpcionesPago").style.display="";
		document.getElementById("divFinalizarVentaAContado").style.display="none";
		document.getElementById('inptTotalaPagar').value = document.getElementById('inptTotalVentaTerminar').value;
		prepararGrillaPagoVenta(true);
		}else{
			document.getElementById("divOpcionesPago").style.display="none";
			document.getElementById("divFinalizarVentaAContado").style.display="";
	}
}

 

function anhadirPagoEgresoContado(){   
 
	let tipopago = $('select[id="inptTipoPagoVenta"] option:selected').text();
	let idtipopago = document.getElementById("inptTipoPagoVenta").value;
	let monto = document.getElementById('inptMontoPagosVentas').value
	
	var valor = $("select[id=inptTipoPagoVenta]").children(":selected").attr("id")
	
	if(monto == ""){
		ver_vetana_informativa("NO INGRESÓ NINGÚN PAGO");
		return;
	}
	
	if(idtipopago == ""){
		ver_vetana_informativa("NO SELECCIONÓ MÉTODO DE PAGO");
		return;
	}
	
	 document.getElementById('inptMontoEgreso').value = monto
	if(valor=="SI"){
		verCerrarVentanaConfirmarEgresoContado("1")
	}else{
		anhadirPago();
	}
	
	
}



function anhadirPago(){
	
	let tipopago = $('select[id="inptTipoPagoVenta"] option:selected').text();
	let idtipopago = document.getElementById("inptTipoPagoVenta").value;
	let monto = document.getElementById('inptMontoPagosVentas').value
	
	var valor = $("select[id=inptTipoPagoVenta]").children(":selected").attr("id")
	 
	let MontoDeposito = document.getElementById('inptMontoEgresoContado').value
	let MotivoDeposito = document.getElementById('inptMotivoEgresoContado').value
	let nroCuentaDeposito = document.getElementById('inptNroCuentaEgresoContado').value
	let BancoDeposito = document.getElementById('inptBancoEgresoContado').value
	let NroBoletaDeposito = document.getElementById('inptTransaccionEgresoContado').value 
  
	let totalaPagar = document.getElementById('inptTotalaPagar').value;
	let totalPagado = document.getElementById('inpTotalPagadoVenta').value;
	totalaPagar = QuitarSeparadorMilValor(totalaPagar);
	totalPagado = QuitarSeparadorMilValor(totalPagado);
	

	let total = Number(totalPagado) + Number(QuitarSeparadorMilValor(monto));
	
	if(total > Number(totalaPagar)){
		ver_vetana_informativa("LA TOTALIDAD HA SUPERADO EL LÍMITE DE PAGO");
		document.getElementById('inptMontoPagosVentas').value = ""
		return;
	}
	

	
	
	var f = new Date();	
	var anho = f.getFullYear()

	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	let fechapago =  anho+"-" + mes + "-" +dia;
	
  	var codigo=stringGenerador(5);
	var pagina="<table id='"+codigo+"' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>"
+"<tr id='tbSelecRegistro' onclick='SeleccionarPagoOffline(this)'  name='tdDetallePagoOffline' >"
+"<td  id='td_id_1' style='display:none'>"+codigo+"</td>"
+"<td  id='td_id_2' style='display:none'>"+idtipopago+"</td>"
+"<td  id='td_datos_1' style='width:33%;'>"+tipopago+"</td>"
+"<td  id='td_datos_3' style='width:33%'>"+monto+"</td>"
+"<td  id='td_datos_2' style='width:33%'>"+fechapago+"</td>"

+"<td  id='td_datos_4' style='display:none'>"+MontoDeposito+"</td>"
+"<td  id='td_datos_5' style='display:none'>"+MotivoDeposito+"</td>"
+"<td  id='td_datos_6' style='display:none'>"+nroCuentaDeposito+"</td>"
+"<td  id='td_datos_7' style='display:none'>"+BancoDeposito+"</td>"
+"<td  id='td_datos_8' style='display:none'>"+NroBoletaDeposito+"</td>"
+"<td  id='td_datos_9' style='display:none'>"+valor+"</td>"

+"</tr>"
+"</table>"

document.getElementById("div_opciones_pago").innerHTML+=pagina;


var totalPago=0;
controlPago = 0;
$("tr[name=tdDetallePagoOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_3"]').html();
 total = QuitarSeparadorMilValor(total);
totalPago=Number(totalPago)+Number(total);
totalPago = totalPago.toString()
controlPago=controlPago+1;
});
limpiarEgresoPagoContado()
document.getElementById('inptMontoPagosVentas').value = "";
document.getElementById("inpTotalPagadoVenta").value=separadordemilesnumero(totalPago);
}


function limpiarEgresoPagoContado(){
	document.getElementById('inptMontoEgresoContado').value =""
	document.getElementById('inptMotivoEgresoContado').value=""
	document.getElementById('inptNroCuentaEgresoContado').value=""
	document.getElementById('inptBancoEgresoContado').value=""
	document.getElementById('inptTransaccionEgresoContado').value=""
	document.getElementById('inptTipoPagoVenta').value=""
}



function verCerrarVentanaConfirmarEgresoContado(d){
	if(d=="1"){		
		document.getElementById("divConfirmarEgresoContado").style.display="";
		document.getElementById('inptMontoEgresoContado').value = document.getElementById('inptMontoPagosVentas').value;
	}
	if(d=="2"){
			if(cancelarDatosDepositoPagoGrilla("divConfirmarEgresoContado")){
				return;
			}
			document.getElementById("divConfirmarEgresoContado").style.display="none";
	}
	
	if(d=="3"){
			if(confirmarDatosDepositoPagoGrilla()){
				return;
			}
		
			document.getElementById("divConfirmarEgresoContado").style.display="none";
			anhadirPago()
	}
}




var elementopagoseleccionado="";
function SeleccionarPagoOffline(datostr) {
	elementopagoseleccionado = datostr
	document.getElementById('elementoEliminarPago').innerHTML = $(datostr).children('td[id="td_datos_1"]').html() +" - <b>"+ $(datostr).children('td[id="td_datos_3"]').html() + "</b>";
	document.getElementById('divOpcionPago').style.display="" ;
}
function EliminarPago() {
	if(confirm("ELIMINAR ESTE PAGO?")){
		var codigotable=$(elementopagoseleccionado).children('td[id="td_id_1"]').html()
		$("table[id="+codigotable+"]").remove()

var totalPago=0;
controlPago = 0;
$("tr[name=tdDetallePagoOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_3"]').html();
 total = QuitarSeparadorMilValor(total);
totalPago=Number(totalPago)+Number(total);
totalPago = totalPago.toString()
controlPago=controlPago+1;
});
document.getElementById("inpTotalPagadoVenta").value=separadordemilesnumero(totalPago);

verCerrarOpcionPago()
	}
}


function verCerrarOpcionPago() {
	document.getElementById('divOpcionPago').style.display="none";
	 elementopagoseleccionado="";
}


function abmTipoPagosVentaContado(idVentaFK) {
	
	
	
	let totalaPagar = document.getElementById('inptTotalaPagar').value;
	let totalPagado = document.getElementById('inpTotalPagadoVenta').value;
	totalaPagar = QuitarSeparadorMilValor(totalaPagar);
	totalPagado = QuitarSeparadorMilValor(totalPagado);
	 
	if(Number(totalaPagar)!= Number(totalPagado)){
		ver_vetana_informativa("LA TOTALIDAD DEL PAGO NO COINCIDE");
		 
		return;
	}
	
	
	if (idabmVenta == "") {
		ver_vetana_informativa("FALTO INICIAR LA VENTA")
		return
	}
	if (document.getElementById("inptSeleccTipoVenta").value != "CONTADO") {
		ver_vetana_informativa("SOLO LAS VENTAS A CONTADO PUEDEN REALIZAR ESTA ACCION")
		return false;
	}
	if (document.getElementById("inptTotalPagado").value != "0") {
		if (document.getElementById("inptTotalPagado").value != "") {
			ver_vetana_informativa("ESTA VENTA YA CUENTA CON UN PAGO")
			return false;
		}
	} 
	
	
	var datos = new FormData();
	var control=1;
	$("tr[name=tdDetallePagoOffline]").each(function(i, elementohtml){
	   var monto=obtenerMontoPagoCreditoParcial(elementohtml);
	   var montoNumero = Number(QuitarSeparadorMilValor(monto));
	   if(isNaN(montoNumero) || montoNumero <= 0){
		return;
	   }
       var idtipopago=$(elementohtml).children('td[id="td_id_2"]').html();
	   datos.append("idtipopago"+control, idtipopago)
	   
	   datos.append("monto"+control, monto)
	   
	   var MontoDeposito=$(elementohtml).children('td[id="td_datos_4"]').html();
	   datos.append("MontoDeposito"+control, MontoDeposito)
	   
	   var MotivoDeposito=$(elementohtml).children('td[id="td_datos_5"]').html();
	   datos.append("MotivoDeposito"+control, MotivoDeposito)
	   
	   var nroCuentaDeposito=$(elementohtml).children('td[id="td_datos_6"]').html();
	   datos.append("nroCuentaDeposito"+control, nroCuentaDeposito)
	   
	   var BancoDeposito=$(elementohtml).children('td[id="td_datos_7"]').html();
	   datos.append("BancoDeposito"+control, BancoDeposito)
	   
	   var NroBoletaDeposito=$(elementohtml).children('td[id="td_datos_8"]').html();
	   datos.append("NroBoletaDeposito"+control, NroBoletaDeposito)
	   
	   var valor=$(elementohtml).children('td[id="td_datos_9"]').html();
	   datos.append("valor"+control, valor)
	    
	   
	   control=control+1;
	   });
	 control=control-1;
	if(control <= 0){
		ver_vetana_informativa("FALTO CARGAR LOS PAGOS");
		return;
	}
	
	
	verCerrarEfectoCargando("")
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "cargartipospagosventas")
	datos.append("idventa_fk", idVentaFK)
    datos.append("codcaja", cajapredeterminada)
    datos.append("codApertura", idabmAperturacierrecaja)
	datos.append("totalregistro", control)
	datos.append("cod_local", cod_localFKUSer)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
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
				   
				   limpiarCamposAnhadirPagos()
				   limpiarDatosDepositoPagoGrilla("div_opciones_pago")
				   verCerrarVentanaAnhadirPagoVenta("")
					ver_vetana_informativa('Pagos cargados correctamente')
					document.getElementById('inptTotalPagado').value = datos["2"];
	paginaticket=datos["3"];
		PlazoRecibo="1"
		document.getElementById("divFinalizarVentaAContado").style.display="none"
		document.getElementById("btnFinalizarVenta").value="Añadir Pago (No Disponible)"
		   
		    var tipo=document.getElementById("inptSeleccTipoComprobanteVenta").value
						 var caja=document.getElementById("pCaja").innerHTML
						 var subtotal=document.getElementById("inptTotalVenta2").innerHTML
						 var descuento=document.getElementById("inptTotalDescuento").value
						 // var totalpagado=document.getElementById("inptMontoVentaTerminarEfectivo").value
						 var interespagado="0"
						 var totalInteres="0"
						 var saldointeres="0"
						 var DeudaActualRecibo="0"
						 var monto=datos["2"]
						 DiasAtrasado="0"
						 var PuntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
var NroVentas=document.getElementById("inptNroVenta").value;
if(PuntoExpedicion!=""){
NroVentas=PuntoExpedicion+"-"+NroVentas
}

 			
		   
		   var finalizarImpresionContado = function () {
					if(document.getElementById("inptSeleccTipoComprobanteVenta").value=="FACTURA"){
						document.getElementById("inptSeleccPuntoExpedicionConfirmarNro").value=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text()
						document.getElementById("inptConfirmarNroFactura").value=document.getElementById("inptNroVenta").value
						document.getElementById("divOpcionesImpresion").style.display="none"
						document.getElementById("divConfirmarNroDeFactura").style.display=""
						ImprimirFacrtura1()
					}
					limpiarcamposventa()
					document.getElementById("divVueltoVentaAContado").style.display="";
		   };

		   if(document.getElementById("inptSeleccTipoVenta").value=="CONTADO"){
						document.getElementById("divOpcionesImpresion").style.display=""
						esperarDatosVentaParaImpresion(finalizarImpresionContado);
					}else{
						finalizarImpresionContado();
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
function limpiarCamposAnhadirPagos(){
	document.getElementById('inptTotalaPagar').value = "0"
	document.getElementById('inpTotalPagadoVenta').value = ""
	prepararGrillaPagoVenta(true);
	limpiarDatosDepositoPagoGrilla("div_opciones_pago");
	elementopagoseleccionado = "";
}





