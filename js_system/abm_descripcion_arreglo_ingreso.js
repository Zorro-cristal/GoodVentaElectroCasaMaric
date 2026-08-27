/*
ABM DESCRIPCION ARREGLO INGRESO
EGRESO
*/
var idAbmDescripcionArregloGastoEgresoIngreso="";
var ElementoSeleccDescripcionArregloGastoEgresoIngreso="";
var listadoAbmDescripcionArregloGastoEgresoIngreso=null;
function iniciarListadoAbmDescripcionArregloGastoEgresoIngreso(){
	if(listadoAbmDescripcionArregloGastoEgresoIngreso || !window.AbmListadoCore) return listadoAbmDescripcionArregloGastoEgresoIngreso;
	var cuerpo=document.getElementById("divBuscadorDescripcionArregloGastoEgresoIngreso");
	if(!cuerpo) return null;
	var cabecera=cuerpo.previousElementSibling;
	while(cabecera && cabecera.tagName!=="TABLE") cabecera=cabecera.previousElementSibling;
	if(!cabecera) return null;
	cabecera.id="cabeceraAbmDescripcionArregloGastoEgresoIngreso";
	listadoAbmDescripcionArregloGastoEgresoIngreso=window.AbmListadoCore.crear({
		nombre:"descripcion_arreglo_gasto_egreso_ingreso",
		idCabecera:"cabeceraAbmDescripcionArregloGastoEgresoIngreso",
		idCuerpo:"divBuscadorDescripcionArregloGastoEgresoIngreso",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{
			funcionSeleccion:"ObtenerdatosAbmDescripcionArregloGastoEgresoIngreso",
			celdas:[
				{id:"td_id",campo:"codigo",tecnica:true},
				{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
				{id:"td_datos_2",campo:"estado",tecnica:true}
			]
		}
	});
	listadoAbmDescripcionArregloGastoEgresoIngreso.iniciar();
	return listadoAbmDescripcionArregloGastoEgresoIngreso;
}

function renderizarOpcionesDescripcionArregloGasto(idContenedor,registros,textoInicial){
	var contenedor=document.getElementById(idContenedor);
	if(!contenedor) return;
	while(contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var inicial=document.createElement("option");
	inicial.value="";
	inicial.textContent=textoInicial;
	contenedor.appendChild(inicial);
	if(!Array.isArray(registros)) return;
	registros.forEach(function(registro){
		var opcion=document.createElement("option");
		opcion.value=registro.descripcion || "";
		opcion.textContent=registro.descripcion || "";
		opcion.setAttribute("data-codigo",registro.codigo || "");
		contenedor.appendChild(opcion);
	});
}
function verCerrarFrmDescripcionArregloGastoEgresoIngreso(d){
	if(d=="1"){
		if(controlacceso("CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESO","accion")==false){return;}	
		$("div[id=divAbmDescripcionArregloGastoEgresoIngreso]").fadeIn(500);
		BuscarAbmDescripcionArregloGastoEgresoIngreso()
	}else{
		$("div[id=divAbmDescripcionArregloGastoEgresoIngreso]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionArregloGastoEgresoIngreso(){
	document.getElementById("inptNombreDescripcionArregloGastoEgresoIngreso").value="";
	document.getElementById("inptEstadoDescripcionArregloGastoEgresoIngreso").value="";
	document.getElementById("btnDescripcionArregloGastoEgresoIngreso1").value="Guardar Datos"
	idAbmDescripcionArregloGastoEgresoIngreso="";
	ElementoSeleccDescripcionArregloGastoEgresoIngreso="";
}
function ObtenerdatosAbmDescripcionArregloGastoEgresoIngreso(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionArregloGastoEgresoIngreso=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionArregloGastoEgresoIngreso").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionArregloGastoEgresoIngreso").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionArregloGastoEgresoIngreso = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionArregloGastoEgresoIngreso1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionArregloGastoEgresoIngreso(){
	if(ElementoSeleccDescripcionArregloGastoEgresoIngreso==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionArregloGastoEgresoIngreso").style.display="none";
	 LimpiarCamposDescripcionArregloGastoEgresoIngreso()
}
function VerificarDatosDescripcionArregloGastoEgresoIngreso(){
	var inptNombreDescripcionArregloGastoEgresoIngreso = document.getElementById("inptNombreDescripcionArregloGastoEgresoIngreso").value
	var inptEstadoDescripcionArregloGastoEgresoIngreso = document.getElementById("inptEstadoDescripcionArregloGastoEgresoIngreso").value	
	if(inptNombreDescripcionArregloGastoEgresoIngreso==""){
		document.getElementById("inptNombreDescripcionArregloGastoEgresoIngreso").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionArregloGastoEgresoIngreso==""){
		document.getElementById("inptEstadoDescripcionArregloGastoEgresoIngreso").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionArregloGastoEgresoIngreso != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionArregloGastoEgresoIngreso(inptNombreDescripcionArregloGastoEgresoIngreso,inptEstadoDescripcionArregloGastoEgresoIngreso,idAbmDescripcionArregloGastoEgresoIngreso,accion)
}
function AbmDescripcionArregloGastoEgresoIngreso(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloGastoEgresoIngreso.php",
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
				LimpiarCamposDescripcionArregloGastoEgresoIngreso()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionArregloGastoEgresoIngreso()
				BuscarSelecDescripcionArregloGastoEgresoIngreso()
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
function BuscarAbmDescripcionArregloGastoEgresoIngreso() {
	var listado=iniciarListadoAbmDescripcionArregloGastoEgresoIngreso();
	var buscador = document.getElementById("inptBuscarAbmDescripcionArregloGastoEgresoIngresos").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionArregloGastoEgresoIngreso").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionArregloGastoEgresoIngreso").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionArregloGastoEgresoIngreso").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloGastoEgresoIngreso.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionArregloGastoEgresoIngreso").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionArregloGastoEgresoIngreso").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionArregloGastoEgresoIngreso").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionArregloGastoEgresoIngreso").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
                   document.getElementById("lblNroRegistroDescripcionArregloGastoEgresoIngreso").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionArregloGastoEgresoIngreso() {
	document.getElementById("inptArregloGasto").innerHTML = ""
	document.getElementById("inptSeleccArregloBuscarGasto").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloGastoEgresoIngreso.php",
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
					var datos_buscados = Array.isArray(datos[2]) ? datos[2] : [];
					renderizarOpcionesDescripcionArregloGasto("inptArregloGasto",datos_buscados,"SELECCIONAR")
					renderizarOpcionesDescripcionArregloGasto("inptSeleccArregloBuscarGasto",datos_buscados,"TODOS")
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmDescripcionArregloGastoEgresoIngreso);
else iniciarListadoAbmDescripcionArregloGastoEgresoIngreso();










/*
INFORME DE DEUDAS CLIENTE
*/
function verCerrarInformeDeudaCliente(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeDeudaCliente").style.display==""){
		
		if(controldebusquedadInformeDeudaCliente==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		
		limpiarcamposinformeDeudaCliente()
		document.getElementById("divMinimizadoInformeDeudaCliente").style.display="none"
		 
		$("div[id=divInformeDeudaCliente]").fadeOut(500);	
	}else{	
		if(controlacceso("VERINFORMEDEUDACLIENTE","accion")==false){return;}
		mostrarSoloUno("divInformeDeudaCliente")	
		document.getElementById("divInformeDeudaCliente").style.display=""
		 
	}
}
function minimizarinformeDeudaCliente(){
	 document.getElementById("divMinimizadoInformeDeudaCliente").style.display = "";
	 copiarBotonEnContenedor(document.getElementById("divMenuInformeDeudaCliente"));
	$("div[id=divInformeDeudaCliente]").fadeOut(500);	
}
function limpiarcamposinformeDeudaCliente(){
	document.getElementById("inptRegistroInformeDeudaCliente").value=""
	document.getElementById("table_informe_deuda_cliente").innerHTML=""
	checkInformeDeudaCliente('1');
	informe_cod_deudacliente = "";
}
var registrocargadoinformedeudacliente="";
var totalregistroinformedeudacliente="";
var controldebusquedadInformeDeudaCliente=false
function cancelarInformeDeudaCliente(){
	controldebusquedadInformeDeudaCliente=false
	document.getElementById("divProgressInformeDeudaCliente").style.backgroundColor='#ff5722'
}
function buscarinformeDeudaCliente() {
	var fecha1 = document.getElementById("inptBuscarInformeDeudaClienteF1").value
	var fecha2 = document.getElementById("inptBuscarInformeDeudaClienteF2").value
	var nroventa = document.getElementById("inptBuscarInformeDeudaCliente1").value
	var nrodoc = document.getElementById("inptBuscarInformeDeudaCliente2").value
	var cliente = document.getElementById("inptBuscarInformeDeudaCliente3").value
	var tipo_cliente = document.getElementById("selectClienteFijoDeudaCliente").value
	if(document.getElementById('checkInformeDeudaCliente2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	if(controldebusquedadInformeDeudaCliente==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
	controldebusquedadInformeDeudaCliente=true
	document.getElementById("tbProcessInformeDeudaCliente").style.display="none"
	document.getElementById("table_informe_deuda_cliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"nroventa": nroventa,
		"nrodoc": nrodoc,
		"cliente": cliente,
		"tipo_cliente": tipo_cliente,
		"funt": "informeDeudaCliente"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_deuda_cliente").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_deuda_cliente").innerHTML = "";controldebusquedadInformeDeudaCliente = true;
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_deuda_cliente").innerHTML = pagina
					document.getElementById("inptRegistroInformeDeudaCliente").value = datos[3]
					
					registrocargadoinformedeudacliente=datos[99];
					totalregistroinformedeudacliente=datos[100];					
						 if(totalregistroinformedeudacliente>registrocargadoinformedeudacliente){
						 	var porce=((registrocargadoinformedeudacliente*100)/totalregistroinformedeudacliente).toFixed(0)
	document.getElementById("divProgressInformeDeudaCliente").style.width=porce+"%"
						 document.getElementById("table_informe_deuda_cliente").innerHTML += "<div id='table_mas_informe_deuda_cliente'></div>"
						 buscarmasinformeDeudaCliente()
					 }else{
						 controldebusquedadInformeDeudaCliente=false
					 } 
				}
			} catch (error) {
				controldebusquedadInformeDeudaCliente=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
	
function buscarmasinformeDeudaCliente() {
	var fecha1 = document.getElementById("inptBuscarInformeDeudaClienteF1").value
	var fecha2 = document.getElementById("inptBuscarInformeDeudaClienteF2").value
	var nroventa = document.getElementById("inptBuscarInformeDeudaCliente1").value
	var nrodoc = document.getElementById("inptBuscarInformeDeudaCliente2").value
	var cliente = document.getElementById("inptBuscarInformeDeudaCliente3").value
	var tipo_cliente = document.getElementById("selectClienteFijoDeudaCliente").value
	if(document.getElementById('checkInformeDeudaCliente2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
/* 	if(c=="1"){
		controldebusquedadInformeDeudaCliente=true
	} */
	if(controldebusquedadInformeDeudaCliente==false){
		return
	}
	controldebusquedadInformeDeudaCliente=true
	document.getElementById("tbProcessInformeDeudaCliente").style.display=""
document.getElementById("divProgressInformeDeudaCliente").style.backgroundColor=''
	document.getElementById("table_mas_informe_deuda_cliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"nroventa": nroventa,
		"nrodoc": nrodoc,
		"cliente": cliente,
		"tipo_cliente": tipo_cliente,
		"registrocargado": registrocargadoinformedeudacliente,
		"funt": "masinformeDeudaCliente"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_informe_deuda_cliente").innerHTML = ""	
			document.getElementById("divProgressInformeDeudaCliente").style.backgroundColor='#ff5722'
			controldebusquedadInformeDeudaCliente=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_mas_informe_deuda_cliente").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_mas_informe_deuda_cliente").innerHTML = pagina
					document.getElementById("inptRegistroInformeDeudaCliente").value = datos[3]
					/* informe_cod_deudacliente = "" */
					
					
					registrocargadoinformedeudacliente=datos[99];
					
						 if(totalregistroinformedeudacliente>registrocargadoinformedeudacliente){
						 	var porce=((registrocargadoinformedeudacliente*100)/totalregistroinformedeudacliente).toFixed(0)
	document.getElementById("divProgressInformeDeudaCliente").style.width=porce+"%"
						 document.getElementById("table_mas_informe_deuda_cliente").innerHTML += "<div id='table_mas_informe_deuda_cliente'></div>"
						 document.getElementById("table_mas_informe_deuda_cliente").id=""
						  buscarmasinformeDeudaCliente();
					 }else{
						 document.getElementById("tbProcessInformeDeudaCliente").style.display="none"
						 controldebusquedadInformeDeudaCliente=false
					 }
					
					
					
				}
			} catch (error) {
				
				document.getElementById("divProgressInformeDeudaCliente").style.backgroundColor='#ff5722'
				controldebusquedadInformeDeudaCliente=false
				
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

 
function checkInformeDeudaCliente(d){	
	if(d=="1"){
		document.getElementById('checkInformeDeudaCliente1').checked=true
		document.getElementById('checkInformeDeudaCliente2').checked=false
		document.getElementById('inptBuscarInformeDeudaClienteF1').value = "";
	    document.getElementById('inptBuscarInformeDeudaClienteF2').value = "";	
	}else{		
		document.getElementById('checkInformeDeudaCliente1').checked=false
		document.getElementById('checkInformeDeudaCliente2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeDeudaClienteF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeDeudaClienteF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function generarPDF() {
	const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
		orientation: 'landscape',
		unit: 'mm',    // Unidad de medida (puede ser 'mm', 'pt', 'cm', 'in')
        format: 'ofice'   // Orientación horizontal
		});

            // Título del documento
            doc.text("Informe Deuda Clientes", 105, 10);

            // Crear la tabla
            doc.autoTable({
                head: [
				['Nro Venta', 'Nro Doc', 'Cliente', 'Moneda', 'Saldo','Interes','F-Inicio','F-Venc.','D/A','T-Cuotas','Cuotas P.','Estado','T-Venta','Producto','Tel.','Dir.','Ciudad','Nac.','Garan.']
				],
                body: [
                    ['Juan Pérez', '30', 'Madrid','Juan Pérez', '30', 'Madrid','Juan Pérez', '30', 'Madrid','Juan Pérez', '30', 'Madrid','Juan Pérez', '30', 'Madrid','Madrid','Madrid','Madrid','Madrid'],
                ],
                startY: 20, // Posición de inicio de la tabla
				styles: {
                    fontSize: 7, // Cambia el tamaño de todo el texto de la tabla
                },
				margin: { top: 10 },
				columnStyles: {
					0: { cellWidth: 20 }, 
					1: { cellWidth: 'auto' },    
					2: { cellWidth: 'auto' },
					3: { cellWidth: 'auto' }, 
					4: { cellWidth: 'auto' },    
					5: { cellWidth: 'auto' },
					6: { cellWidth: 'auto' }, 
					7: { cellWidth: 'auto' },    
					8: { cellWidth: 'auto' },
					9: { cellWidth: 'auto' }, 
					10: { cellWidth: 'auto' },    
					11: { cellWidth: 'auto' },
					12: { cellWidth: 'auto' }, 
					13: { cellWidth: 'auto' },    
					14: { cellWidth: 'auto' },
					15: { cellWidth: 'auto' },
					16: { cellWidth: 'auto' },
					17: { cellWidth: 'auto' },
					18: { cellWidth: 'auto' }
				}
				
            });

            // Guardar el PDF
            doc.save("tabla_ejemplo.pdf");
}
/*
INFORME DE CALLCENTER
*/
var listadoInformeCallCenter = null;
var listadoDetalleInformeCallCenter = null;
var listadoActividadInformeCallCenter = null;

function obtenerFilaCabeceraCallCenter(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo);
	if (!cuerpo) return null;
	var tabla = cuerpo.previousElementSibling;
	while (tabla && (tabla.tagName !== "TABLE" || tabla.querySelector("input,select,textarea"))) {
		tabla = tabla.previousElementSibling;
	}
	if (!tabla || !tabla.rows || !tabla.rows[0]) return null;
	tabla.rows[0].id = idCabecera;
	return tabla.rows[0];
}

function iniciarListadoInformeCallCenter() {
	if (listadoInformeCallCenter || !window.AbmListadoCore) return listadoInformeCallCenter;
	if (!obtenerFilaCabeceraCallCenter("table_informe_callcenter", "cabeceraInformeCallCenter")) return null;
	listadoInformeCallCenter = window.AbmListadoCore.crear({
		nombre: "informe_callcenter",
		idCabecera: "cabeceraInformeCallCenter",
		idCuerpo: "table_informe_callcenter",
		columnas: [
			{ campo: "usuario", titulo: "USUARIO", ancho: "20%" },
			{ campo: "nombre", titulo: "NOMBRE LISTA", ancho: "10%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "30%" },
			{ campo: "fecha_inicio", titulo: "FECHA CREDITO", ancho: "10%" },
			{ campo: "fecha_inicio_periodo", titulo: "FECHA PERIODO", ancho: "10%" },
			{ campo: "fecha_generado", titulo: "FECHA GENERADO", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosCallCenter",
			atributosFila: function (registro) {
				return { dataset: { idCallcenter: registro.idcall_center || "" } };
			},
			celdas: [
				{ id: "td_id", campo: "idcall_center", tecnica: true },
				{ campo: "cod_usuario", tecnica: true },
				{ campo: "usuario", columna: "usuario" },
				{ campo: "nombre", columna: "nombre" },
				{ campo: "descripcion", columna: "descripcion" },
				{ campo: "fecha_credito", columna: "fecha_inicio" },
				{ campo: "fecha_periodo", columna: "fecha_inicio_periodo" },
				{ campo: "fecha_generado", columna: "fecha_generado" },
				{ campo: "estado", columna: "estado" }
			]
		},
		despuesRender: function (contenedor) {
			if (!informe_cod_callcenter) return;
			Array.prototype.some.call(contenedor.querySelectorAll("tr[data-id-callcenter]"), function (fila) {
				if (String(fila.getAttribute("data-id-callcenter") || "") !== String(informe_cod_callcenter)) return false;
				fila.className = "tableRegistroSelec";
				return true;
			});
		}
	});
	listadoInformeCallCenter.iniciar();
	return listadoInformeCallCenter;
}

function iniciarListadoDetalleInformeCallCenter() {
	if (listadoDetalleInformeCallCenter || !window.AbmListadoCore) return listadoDetalleInformeCallCenter;
	if (!obtenerFilaCabeceraCallCenter("table_informe_detalles_callcenter", "cabeceraDetalleInformeCallCenter")) return null;
	listadoDetalleInformeCallCenter = window.AbmListadoCore.crear({
		nombre: "detalle_informe_callcenter",
		idCabecera: "cabeceraDetalleInformeCallCenter",
		idCuerpo: "table_informe_detalles_callcenter",
		columnas: [
			{ campo: "cliente", titulo: "CLIENTE", ancho: "60%" },
			{ campo: "telefono", titulo: "NRO TELEFONO", ancho: "20%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "20%" }
		],
		fila: {
			atributosFila: function (registro) {
				if (registro.estado === "TERMINADO") {
					return { style: { backgroundColor: "green", color: "white" } };
				}
				return {};
			},
			celdas: [
				{ campo: "cliente", columna: "cliente" },
				{ campo: "telefono", columna: "telefono" },
				{ campo: "estado", columna: "estado" }
			]
		}
	});
	listadoDetalleInformeCallCenter.iniciar();
	return listadoDetalleInformeCallCenter;
}

function iniciarListadoActividadInformeCallCenter() {
	if (listadoActividadInformeCallCenter || !window.AbmListadoCore) return listadoActividadInformeCallCenter;
	if (!obtenerFilaCabeceraCallCenter("table_informe_actividad_callcenter", "cabeceraActividadInformeCallCenter")) return null;
	listadoActividadInformeCallCenter = window.AbmListadoCore.crear({
		nombre: "actividad_informe_callcenter",
		idCabecera: "cabeceraActividadInformeCallCenter",
		idCuerpo: "table_informe_actividad_callcenter",
		columnas: [
			{ campo: "usuario", titulo: "USUARIO", ancho: "40%" },
			{ campo: "cliente", titulo: "CLIENTE", ancho: "20%" },
			{ campo: "actividad", titulo: "ESTADO", ancho: "20%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "20%" }
		],
		fila: {
			celdas: [
				{ campo: "usuario", columna: "usuario" },
				{ campo: "cliente", columna: "cliente" },
				{ campo: "actividad", columna: "actividad" },
				{ campo: "fecha", columna: "fecha" }
			]
		}
	});
	listadoActividadInformeCallCenter.iniciar();
	return listadoActividadInformeCallCenter;
}

function verCerrarInformeCallCenter(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeCallCenter").style.display==""){
		limpiarcamposinformeCallCenter()
		document.getElementById("divMinimizadoInformeCallCenter").style.display="none"
		 
		$("div[id=divInformeCallCenter]").fadeOut(500);	
		// verCerrarInformeVentanasCallCenter('1')
	}else{	
		if(controlacceso("VERINFORMECALLCENTER","accion")==false){return;}
		mostrarSoloUno("divInformeCallCenter")	
		document.getElementById("divInformeCallCenter").style.display=""
		 
	}
}
function minimizarinformeCallCenter(){
	 document.getElementById("divMinimizadoInformeCallCenter").style.display = "";
	 copiarBotonEnContenedor(document.getElementById("divMenuInformeCallCenter"));
	$("div[id=divInformeCallCenter]").fadeOut(500);	
}
function limpiarcamposinformeCallCenter(){
	document.getElementById("inptRegistroInformeCallCenter").value=""
	document.getElementById("inptRegistroDetalleCallCenter").value=""
	document.getElementById("inptRegistroActividadCallCenter").value=""
	var listadoInforme = iniciarListadoInformeCallCenter()
	var listadoDetalle = iniciarListadoDetalleInformeCallCenter()
	var listadoActividad = iniciarListadoActividadInformeCallCenter()
	if(listadoInforme){ listadoInforme.establecerRegistros([], false) }else{ document.getElementById("table_informe_callcenter").innerHTML="" }
	if(listadoDetalle){ listadoDetalle.establecerRegistros([], false) }else{ document.getElementById("table_informe_detalles_callcenter").innerHTML="" }
	if(listadoActividad){ listadoActividad.establecerRegistros([], false) }else{ document.getElementById("table_informe_actividad_callcenter").innerHTML="" }
	document.getElementById("btnInformeCallCenter1").style='background-color:#ff9800;color:#fff'
	document.getElementById("btnInformeCallCenter2").style=''
	document.getElementById("divInformeVentanaCallCenter").style.display=''
	document.getElementById("divInformeVentanaDetalleCallCenter").style.display='none'
	checkInformeCallCenter('1');
	document.getElementById("btnInformeCallCenter1").style='background-color:#ff9800;color:#fff'
	document.getElementById("divInformeVentanaCallCenter").style.display=''
	informe_cod_callcenter = "";
}
function verCerrarInformeVentanasCallCenter(d){
	
	document.getElementById("btnInformeCallCenter1").style=''
	document.getElementById("btnInformeCallCenter2").style=''
	document.getElementById("btnInformeCallCenter3").style=''
	document.getElementById("divInformeVentanaCallCenter").style.display='none'
	document.getElementById("divInformeVentanaDetalleCallCenter").style.display='none'
	document.getElementById("divInformeVentanaActividadCallCenter").style.display='none'

	if(d=="1"){
		document.getElementById("btnInformeCallCenter1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentanaCallCenter").style.display=''
	}
	if(d=="2"){
		
		if(informe_cod_callcenter == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA REGISTRO")
		verCerrarInformeVentanasCallCenter(1)
		return;
		}
		
		document.getElementById("btnInformeCallCenter2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentanaDetalleCallCenter").style.display=''
		buscarDetallesCallCenter()
	}
	
	if(d=="3"){
		
		if(informe_cod_callcenter == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA REGISTRO")
		verCerrarInformeVentanasCallCenter(1)
		return;
		}
		
		document.getElementById("btnInformeCallCenter3").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentanaActividadCallCenter").style.display=''
		buscarActividadCallCenter()
	}
}

function buscarinformeCallCenter() {
	// verCerrarInformeVentanasCallCenter('1')
	var listado = iniciarListadoInformeCallCenter()
	var fecha1 = document.getElementById("inptBuscarInformeCallCenterF1").value
	var fecha2 = document.getElementById("inptBuscarInformeCallCenterF2").value
	var usuario = document.getElementById('inptBuscarCampoInformeCallCenter1').value
	var estado = document.getElementById('inptBuscarCampoInformeCallCenter2').value
	if(document.getElementById('checkInformeCallCenter2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	informe_cod_callcenter = ""
	if(listado){ listado.establecerRegistros([], false) }
	document.getElementById("table_informe_callcenter").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"usuario": usuario,
		"estado": estado,
		"formato": listado ? "json" : "html",
		"funt": "informeCallCenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_informe_callcenter").innerHTML = "" }
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_informe_callcenter").innerHTML = "" }
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if(listado && Array.isArray(pagina)){ listado.establecerRegistros(pagina, false) }else{ document.getElementById("table_informe_callcenter").innerHTML = typeof pagina === "string" ? pagina : "" }
					var listadoDetalle = iniciarListadoDetalleInformeCallCenter()
					if(listadoDetalle){ listadoDetalle.establecerRegistros([], false) }else{ document.getElementById("table_informe_detalles_callcenter").innerHTML = '' }
					document.getElementById("inptRegistroInformeCallCenter").value = datos[3]
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarDetallesCallCenter() {
	var listado = iniciarListadoDetalleInformeCallCenter()
	 var estado = $('#inptBuscarInformeDetalleCallCenter1').find('option:selected').text();
	 var cliente = document.getElementById('inptBuscarCampoInformeDetalleCallCenter1').value;
	
	document.getElementById("inptRegistroDetalleCallCenter").value ="";
	if(listado){ listado.establecerRegistros([], false) }
	document.getElementById("table_informe_detalles_callcenter").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"id_callcenter": informe_cod_callcenter,
		"estado": estado,
		"cliente": cliente,
		"formato": listado ? "json" : "html",
		"funt": "buscarDetallesCallCenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_informe_detalles_callcenter").innerHTML = "" }
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_informe_detalles_callcenter").innerHTML = "" }
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if(listado && Array.isArray(pagina)){ listado.establecerRegistros(pagina, false) }else{ document.getElementById("table_informe_detalles_callcenter").innerHTML = typeof pagina === "string" ? pagina : "" }
		document.getElementById("inptRegistroDetalleCallCenter").value = datos[3]
		document.getElementById("inptRegistroTotalTerminadoDetalleCallCenter").value = datos[4]
		document.getElementById("inptRegistroTotalActivoDetalleCallCenter").value = datos[5]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
	
function buscarActividadCallCenter() {
	var listado = iniciarListadoActividadInformeCallCenter()
	var usuario = document.getElementById('inptBuscarInformeActividadCallCenter1').value
	var estado = document.getElementById('inptBuscarInformeActividadCallCenter2')
    estado = estado.options[estado.selectedIndex].text;
	
	var cliente = document.getElementById('inptBuscarInformeActividadCallCenter3').value
	
	var fecha1 = document.getElementById('inptBuscarInformeCallCenterF1').value
	var fecha2 = document.getElementById('inptBuscarInformeCallCenterF2').value
	
	if(document.getElementById('checkInformeCallCenter2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	
	document.getElementById("inptRegistroDetalleCallCenter").value ="";
	if(listado){ listado.establecerRegistros([], false) }
	document.getElementById("table_informe_actividad_callcenter").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"usuario": usuario,
		"estado": estado,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cliente": cliente,
		"cod_callcenter": informe_cod_callcenter,
		"formato": listado ? "json" : "html",
		"funt": "buscarActividadCallCenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_informe_actividad_callcenter").innerHTML = "" }
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado){ listado.establecerRegistros([], false) }else{ document.getElementById("table_informe_actividad_callcenter").innerHTML = "" }
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if(listado && Array.isArray(pagina)){ listado.establecerRegistros(pagina, false) }else{ document.getElementById("table_informe_actividad_callcenter").innerHTML = typeof pagina === "string" ? pagina : "" }
		document.getElementById("inptRegistroActividadCallCenter").value = datos[3]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var informe_cod_callcenter = "";
function obtenerdatosCallCenter(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	informe_cod_callcenter = $(datostr).children('td[id="td_id"]').text();
}
function checkInformeCallCenter(d){	
	if(d=="1"){
		document.getElementById('checkInformeCallCenter1').checked=true
		document.getElementById('checkInformeCallCenter2').checked=false
		document.getElementById('inptBuscarInformeCallCenterF1').value = "";
	    document.getElementById('inptBuscarInformeCallCenterF2').value = "";	
	}else{		
		document.getElementById('checkInformeCallCenter1').checked=false
		document.getElementById('checkInformeCallCenter2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeCallCenterF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeCallCenterF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function actualizarEstadoCallCenter() {
	if(informe_cod_callcenter == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN LISTADO');
		return;
	}
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcall_center": informe_cod_callcenter,
		"funt": "actualizarEstadoCallCenter"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
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
					ver_vetana_informativa('DATOS CARGADOS CORRECTAMENTE...');
					buscarinformeCallCenter()
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarOptionUsuarioTipoCallCenter() {
	document.getElementById("inptBuscarInformeActividadCallCenter1").innerHTML = ""
	document.getElementById("inptAsignarCallCenter").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionUsuTipoCallCenter"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenter.php",
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
					document.getElementById("inptBuscarInformeActividadCallCenter1").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptAsignarCallCenter").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					
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
INFORME DE CALLCENTER VENTA
*/
function verCerrarInformeCallCenterVenta(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeCallCenterVenta").style.display==""){
		limpiarcamposinformeCallCenterVenta()
		document.getElementById("divMinimizadoInformeCallCenterVenta").style.display="none"
		 
		$("div[id=divInformeCallCenterVenta]").fadeOut(500);	
	}else{	
		if(controlacceso("VERINFORMECALLCENTERVENTA","accion")==false){return;}
		mostrarSoloUno("divInformeCallCenterVenta")	
		document.getElementById("divInformeCallCenterVenta").style.display=""
		 
	}
}
function minimizarinformeCallCenterVenta(){
	 document.getElementById("divMinimizadoInformeCallCenterVenta").style.display = "";
	 copiarBotonEnContenedor(document.getElementById("divMenuInformeCallCenterVenta"));
	$("div[id=divInformeCallCenterVenta]").fadeOut(500);	
}
function limpiarcamposinformeCallCenterVenta(){
	document.getElementById("inptRegistroInformeCallCenterVenta").value=""
	document.getElementById("inptRegistroDetalleCallCenterVenta").value=""
	document.getElementById("inptRegistroActividadCallCenterVenta").value=""
	document.getElementById("inptRegistroAgendaCallCenterVenta").value=""
	document.getElementById("table_informe_callcenterventa").innerHTML=""
	document.getElementById("table_informe_detalles_callcenterventa").innerHTML="" 
	document.getElementById("table_informe_actividad_callcenterventa").innerHTML="" 
	document.getElementById("table_informe_agenda_callcenterventa").innerHTML="" 
	
	document.getElementById("inptBuscarCampoInformeCallCenterVenta1").value=""
	document.getElementById("inptBuscarCampoInformeCallCenterVenta2").value=""
	document.getElementById("inptBuscarInformeDetalleCallCenterVenta3").value=""
	document.getElementById("inptBuscarInformeDetalleCallCenterVenta2").value=""
	document.getElementById("inptBuscarInformeDetalleCallCenterVenta1").value=""
	document.getElementById("inptBuscarInformeActividadCallCenterVenta1").value=""
	document.getElementById("inptBuscarInformeActividadCallCenterVenta2").value=""
	document.getElementById("inptBuscarInformeAgendaCallCenterVenta1").value=""
	document.getElementById("inptBuscarInformeAgendaCallCenterVenta3").value=""
	document.getElementById("inptBuscarInformeAgendaCallCenterVenta2").value=""
	
	checkInformeCallCenterVenta('1');
	informe_cod_callcenterventa = "";
	
	verCerrarInformeVentanasCallCenterVenta("1")
}
function verCerrarInformeVentanasCallCenterVenta(d){
	
	document.getElementById("btnInformeCallCenterVenta1").style=''
	document.getElementById("btnInformeCallCenterVenta2").style=''
	document.getElementById("btnInformeCallCenterVenta3").style=''
	document.getElementById("btnInformeCallCenterVenta4").style=''
	document.getElementById("divInformeVentanaCallCenterVenta").style.display='none'
	document.getElementById("divInformeVentanaDetalleCallCenterVenta").style.display='none'
	document.getElementById("divInformeVentanaActividadCallCenterVenta").style.display='none'
	document.getElementById("divInformeVentanaAgendaCallCenterVenta").style.display='none'

	if(d=="1"){
		document.getElementById("btnInformeCallCenterVenta1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentanaCallCenterVenta").style.display=''
	}
	if(d=="2"){
		
		if(informe_cod_callcenterventa == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA REGISTRO")
		verCerrarInformeVentanasCallCenterVenta(1)
		
		return;
		}
		
		document.getElementById("btnInformeCallCenterVenta2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentanaDetalleCallCenterVenta").style.display=''
		
		buscarDetallesCallCenterVenta()
	}
	
	if(d=="3"){
		if(informe_cod_callcenterventa == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA REGISTRO")
		verCerrarInformeVentanasCallCenterVenta(1)
		return;
		}
		
		
		document.getElementById("btnInformeCallCenterVenta3").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentanaActividadCallCenterVenta").style.display=''
		
		buscarActividadCallCenterVenta()
	}
	
	if(d=="4"){
		document.getElementById("btnInformeCallCenterVenta4").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeVentanaAgendaCallCenterVenta").style.display=''
	}
}

function buscarinformeCallCenterVenta() {
	verCerrarInformeVentanasCallCenterVenta('1')
	var fecha1 = document.getElementById("inptBuscarInformeCallCenterVentaF1").value
	var fecha2 = document.getElementById("inptBuscarInformeCallCenterVentaF2").value
	var estado = document.getElementById('inptBuscarCampoInformeCallCenterVenta2').value
	var cod_localFK = document.getElementById('inptBuscarCampoInformeCallCenterVenta1').value
	if(document.getElementById('checkInformeCallCenterVenta2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	document.getElementById("table_informe_callcenterventa").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"cod_localFK": cod_localFK,
		"funt": "informeCallCenterVenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_callcenterventa").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_callcenterventa").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_callcenterventa").innerHTML = pagina
					document.getElementById("table_informe_detalles_callcenterventa").innerHTML = ''
					document.getElementById("inptRegistroInformeCallCenterVenta").value = datos[3]
					informe_cod_callcenterventa = ""
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarDetallesCallCenterVenta() {
	
	 var estado = $('#inptBuscarInformeDetalleCallCenterVenta1').find('option:selected').text();
	 var usuario = document.getElementById('inptBuscarInformeDetalleCallCenterVenta2').value;
	 var origen = document.getElementById('inptBuscarInformeDetalleCallCenterVenta3').value;
	var fecha1 = document.getElementById("inptBuscarInformeCallCenterVentaF1").value
	var fecha2 = document.getElementById("inptBuscarInformeCallCenterVentaF2").value

	if(document.getElementById('checkInformeCallCenterVenta2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	
	document.getElementById("inptRegistroDetalleCallCenterVenta").value ="";
	document.getElementById("table_informe_detalles_callcenterventa").innerHTML = paginacargando
	document.getElementById("inptBuscarInformeDetalleCallCenterVenta2").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcallcenter_ventasFK": informe_cod_callcenterventa,
		"estado": estado,
		"usuario": usuario,
		"origen": origen,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"funt": "buscarDetallesCallCenterVenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_detalles_callcenterventa").innerHTML = ""	
			document.getElementById("inptBuscarInformeDetalleCallCenterVenta2").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_detalles_callcenterventa").innerHTML = ""	
				document.getElementById("inptBuscarInformeDetalleCallCenterVenta2").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_detalles_callcenterventa").innerHTML = pagina
					document.getElementById("inptBuscarInformeDetalleCallCenterVenta2").innerHTML = datos[4]
		document.getElementById("inptRegistroDetalleCallCenterVenta").value = datos[3]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
	
function buscarActividadCallCenterVenta() {
	var usuario = document.getElementById('inptBuscarInformeActividadCallCenterVenta1').value
	var estado = document.getElementById('inptBuscarInformeActividadCallCenterVenta2')
    estado = estado.options[estado.selectedIndex].text;
	
	var fecha1 = document.getElementById('inptBuscarInformeCallCenterVentaF1').value
	var fecha2 = document.getElementById('inptBuscarInformeCallCenterVentaF2').value
	
	if(document.getElementById('checkInformeCallCenterVenta2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	
	document.getElementById("inptRegistroDetalleCallCenterVenta").value ="";
	document.getElementById("table_informe_actividad_callcenterventa").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"usuario": usuario,
		"estado": estado,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"idcallcenter_ventasFK": informe_cod_callcenterventa,
		"funt": "buscarActividadCallCenterVenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					var pagina = datos[2];
					document.getElementById("table_informe_actividad_callcenterventa").innerHTML = pagina
		document.getElementById("inptRegistroActividadCallCenterVenta").value = datos[3]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var informe_cod_callcenterventa = "";
function obtenerdatosCallCenterVenta(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	informe_cod_callcenterventa = $(datostr).children('td[id="td_id"]').html();
	// buscarDetallesCallCenterVenta()
}
var informe_cod_detallecallcenterventa = '';
function obtenerdatosdetalleInformeCallCenterVenta(datostr) {	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	informe_cod_detallecallcenterventa = $(datostr).children('td[id="td_id"]').html();
}
function checkInformeCallCenterVenta(d){	
	if(d=="1"){
		document.getElementById('checkInformeCallCenterVenta1').checked=true
		document.getElementById('checkInformeCallCenterVenta2').checked=false
		document.getElementById('inptBuscarInformeCallCenterVentaF1').value = "";
	    document.getElementById('inptBuscarInformeCallCenterVentaF2').value = "";	
	}else{		
		document.getElementById('checkInformeCallCenterVenta1').checked=false
		document.getElementById('checkInformeCallCenterVenta2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeCallCenterVentaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeCallCenterVentaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function actualizarEstadoCallCenterVenta() {
	if(informe_cod_callcenterventa == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN LISTADO');
		return;
	}
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcall_centerventa": informe_cod_callcenterventa,
		"funt": "actualizarEstadoCallCenterVenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					ver_vetana_informativa('DATOS CARGADOS CORRECTAMENTE...');
					buscarinformeCallCenterVenta()
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarOptionUsuarioTipoCallCenterVenta() {
	document.getElementById("inptBuscarInformeDetalleCallCenterVenta2").innerHTML = ""
	document.getElementById("inptBuscarInformeActividadCallCenterVenta1").innerHTML = ""
	document.getElementById("inptBuscarInformeAgendaCallCenterVenta3").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionUsuTipoCallCenterVenta"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					document.getElementById("inptBuscarInformeDetalleCallCenterVenta2").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptBuscarInformeActividadCallCenterVenta1").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptBuscarInformeAgendaCallCenterVenta3").innerHTML = "<option  value='' >SELECCIONAR</option>"+datos_buscados
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarAgendaCallCenterVenta() {
	var estado = document.getElementById('inptBuscarInformeAgendaCallCenterVenta2')
    estado = estado.options[estado.selectedIndex].text;
	var cliente = document.getElementById('inptBuscarInformeAgendaCallCenterVenta1').value;
	var cod_agente = document.getElementById('inptBuscarInformeAgendaCallCenterVenta3').value;
	var fecha1 = document.getElementById('inptBuscarInformeCallCenterVentaF1').value
	var fecha2 = document.getElementById('inptBuscarInformeCallCenterVentaF2').value
	
	if(document.getElementById('checkInformeCallCenterVenta2').checked == true){
		if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
		return false;
	}
	}else{
		fecha1 = '';
		fecha2 = '';
	}
	
	
	document.getElementById("inptRegistroAgendaCallCenterVenta").value ="";
	document.getElementById("table_informe_agenda_callcenterventa").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"estado": estado,
		"cliente": cliente,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cod_agente": cod_agente,
		"funt": "buscarAgendaCallCenterVenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					var pagina = datos[2];
					document.getElementById("table_informe_agenda_callcenterventa").innerHTML = pagina
		document.getElementById("inptRegistroAgendaCallCenterVenta").value = datos[3]
	
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}




