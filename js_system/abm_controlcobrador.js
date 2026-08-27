/*
ABM ControlCobrador
*/
var listadoTareasCobrador=null;
var resumenTareasCobrador=null;
function agregarResumenTareasCobrador(cuerpo){
	if(!cuerpo || !resumenTareasCobrador){return;}
	var tabla=document.createElement("table");
	tabla.className="tableRegistroSearch";
	tabla.setAttribute("border","1");
	tabla.setAttribute("cellspacing","1");
	tabla.setAttribute("cellpadding","5");
	var fila=document.createElement("tr");
	fila.id="tbSelecRegistro";
	[
		{ancho:"40%",texto:"TOTALES A COBRAR: "+(resumenTareasCobrador.total_neto_formateado || "0"),centrado:true},
		{ancho:"15%",texto:"COBRADOR: "+(resumenTareasCobrador.total_cobrado_cobrador_formateado || "0")},
		{ancho:"15%",texto:"TOTAL: "+(resumenTareasCobrador.total_cobrado_formateado || "0")},
		{ancho:"15%",texto:"FALTANTE: "+(resumenTareasCobrador.total_faltante_formateado || "0")},
		{ancho:"15%",texto:resumenTareasCobrador.porcentajes_formateados || "CC:0% - CT:0%"}
	].forEach(function(item){
		var celda=document.createElement("td");
		celda.id="td_datos_7";
		celda.style.width=item.ancho;
		if(item.centrado){celda.style.textAlign="center";}
		celda.textContent=item.texto;
		fila.appendChild(celda);
	});
	tabla.appendChild(fila);
	cuerpo.appendChild(tabla);
}
function iniciarListadoTareasCobrador(){
	if(listadoTareasCobrador || !window.AbmListadoCore){return listadoTareasCobrador;}
	if(!document.getElementById("table_TareasCobrador") || !document.getElementById("tdTituloTareasCobrador")){return null;}
	listadoTareasCobrador=window.AbmListadoCore.crear({
		nombre:"tareas_cobrador",
		idCabecera:"tdTituloTareasCobrador",
		idCuerpo:"table_TareasCobrador",
		ordenInicial:"fecha_creacion",
		columnas:[
			{campo:"fecha_creacion",titulo:"F-CREACION",ancho:"7%"},
			{campo:"cobrador",titulo:"COBRADOR",ancho:"7%"},
			{campo:"cantidad_clientes",titulo:"CANT. CL.",ancho:"7%"},
			{campo:"rango_fechas",titulo:"RANGO DE FECHAS",ancho:"10%"},
			{campo:"zona",titulo:"ZONA",ancho:"8%"},
			{campo:"monto_neto",titulo:"TOTAL SIN INT.",ancho:"8%"},
			{campo:"descripcion",titulo:"DESCRIPCION",ancho:"13%"},
			{campo:"cobrado_cobrador",titulo:"COBRADO COBRADOR",ancho:"8%"},
			{campo:"cobrado_total",titulo:"COBRADO TOTAL",ancho:"8%"},
			{campo:"faltante",titulo:"FALTANTE",ancho:"8%"},
			{campo:"porcentaje_total",titulo:"%",ancho:"8%"},
			{campo:"callcenter",titulo:"CALLCENTER",ancho:"8%"}
		],
		fila:{
			funcionSeleccion:"obtenerdatosvistaTareasCobrador",
			celdas:[
				{id:"td_id",campo:"codigo",tecnica:true},
				{campo:"fecha_creacion",columna:"fecha_creacion"},
				{id:"td_datos_1",campo:"cobrador",columna:"cobrador"},
				{campo:"cantidad_clientes",columna:"cantidad_clientes"},
				{id:"td_datos_2",campo:"rango_fechas",columna:"rango_fechas"},
				{id:"td_datos_3",campo:"zona",columna:"zona"},
				{id:"td_datos_4",campo:"monto_total_formateado",tecnica:true},
				{id:"td_datos_5",campo:"monto_neto_formateado",columna:"monto_neto"},
				{id:"td_datos_6",campo:"descripcion",columna:"descripcion"},
				{id:"td_datos_7",campo:"cobrado_cobrador_formateado",columna:"cobrado_cobrador"},
				{id:"td_datos_10",campo:"cobrado_total_formateado",columna:"cobrado_total"},
				{id:"td_datos_8",campo:"faltante_formateado",columna:"faltante"},
				{id:"td_datos_9",campo:"porcentajes_formateados",columna:"porcentaje_total"},
				{campo:"callcenter",columna:"callcenter"}
			]
		},
		despuesRender:function(cuerpo){agregarResumenTareasCobrador(cuerpo);}
	});
	listadoTareasCobrador.iniciar();
	return listadoTareasCobrador;
}
var listadoClientesTareaCobrador=null;
function crearClienteListadoTareaCobrador(registro){
	var fragmento=document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.cliente || ""));
	fragmento.appendChild(document.createElement("br"));
	var garante=document.createElement("strong");
	garante.textContent="Garante:"+(registro.garante_documento || "")+"/"+(registro.garante_nombre || "")+"/"+(registro.garante_telefono || "");
	fragmento.appendChild(garante);
	return fragmento;
}
function crearCuotaListadoTareaCobrador(registro){
	var fragmento=document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode("Cuota:"+(registro.cuota == null ? "" : registro.cuota)));
	fragmento.appendChild(document.createElement("br"));
	fragmento.appendChild(document.createTextNode("Venc.:"+(registro.fecha_vencimiento || "")));
	return fragmento;
}
function crearProductosListadoTareaCobrador(registro){
	var fragmento=document.createDocumentFragment();
	(registro.productos || []).forEach(function(producto,indice){
		if(indice>0){fragmento.appendChild(document.createElement("br"));}
		var detalle=document.createElement("strong");
		detalle.className="pTituloB";
		detalle.style.fontSize="9px";
		detalle.style.color="#000";
		detalle.textContent=(producto.orden || (indice+1))+" )-"+(producto.nombre || "");
		fragmento.appendChild(detalle);
	});
	return fragmento;
}
function crearTotalDeudaListadoTareaCobrador(registro){
	var fragmento=document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode("D/T:"));
	fragmento.appendChild(document.createElement("br"));
	fragmento.appendChild(document.createTextNode(registro.total_deuda_formateado || "0"));
	if(Number(registro.descuento)!==0){
		fragmento.appendChild(document.createElement("br"));
		fragmento.appendChild(document.createTextNode("Desc:"+(registro.descuento_formateado || "0")));
	}
	fragmento.appendChild(document.createElement("br"));
	fragmento.appendChild(document.createTextNode("INT.:"+(registro.interes_formateado || "0")));
	return fragmento;
}
function crearDeudaActualListadoTareaCobrador(registro){
	var fragmento=document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode("D/A:"+(registro.deuda_actual_formateada || "0")));
	fragmento.appendChild(document.createElement("br"));
	fragmento.appendChild(document.createTextNode("Pagado:"+(registro.pagado_formateado || "0")));
	return fragmento;
}
function iniciarListadoClientesTareaCobrador(){
	if(listadoClientesTareaCobrador || !window.AbmListadoCore){return listadoClientesTareaCobrador;}
	if(!document.getElementById("table_ListaClienteTareaCobrador") || !document.getElementById("tdTituloListaClienteTareaCobrador")){return null;}
	listadoClientesTareaCobrador=window.AbmListadoCore.crear({
		nombre:"clientes_tarea_cobrador",
		idCabecera:"tdTituloListaClienteTareaCobrador",
		idCuerpo:"table_ListaClienteTareaCobrador",
		columnas:[
			{campo:"documento",titulo:"DOCUMENTO",ancho:"5%"},
			{campo:"cliente",titulo:"CLIENTE",ancho:"20%"},
			{campo:"telefono",titulo:"TELEFONO",ancho:"5%"},
			{campo:"nro_factura",titulo:"NRO. FAC.",ancho:"10%"},
			{campo:"cuota",titulo:"CUOTA",ancho:"10%"},
			{campo:"zona",titulo:"ZONA",ancho:"5%"},
			{campo:"producto_orden",titulo:"PRODUCTO",ancho:"20%"},
			{campo:"pago_anterior",titulo:"PAGO ANTERIOR",ancho:"5%"},
			{campo:"total_deuda",titulo:"TOTAL DEUDA",ancho:"10%"},
			{campo:"deuda_actual",titulo:"DEUDAS ACTUAL",ancho:"10%"}
		],
		fila:{
			funcionSeleccion:"obtenerdatosabmAgendaDesdeTC",
			celdas:[
				{campo:"documento",columna:"documento"},
				{id:"td_datos_1",campo:"cod_cliente",tecnica:true},
				{id:"td_datos_2",campo:"cliente",tecnica:true},
				{campo:"cliente",columna:"cliente",render:function(valor,registro){return crearClienteListadoTareaCobrador(registro);}},
				{campo:"telefono",columna:"telefono"},
				{campo:"nro_factura",columna:"nro_factura"},
				{campo:"cuota",columna:"cuota",render:function(valor,registro){return crearCuotaListadoTareaCobrador(registro);}},
				{campo:"zona",columna:"zona"},
				{campo:"producto_orden",columna:"producto_orden",render:function(valor,registro){return crearProductosListadoTareaCobrador(registro);}},
				{campo:"pago_anterior_formateado",columna:"pago_anterior"},
				{campo:"total_deuda_formateado",columna:"total_deuda",render:function(valor,registro){return crearTotalDeudaListadoTareaCobrador(registro);}},
				{campo:"deuda_actual_formateada",columna:"deuda_actual",render:function(valor,registro){return crearDeudaActualListadoTareaCobrador(registro);}}
			]
		}
	});
	listadoClientesTareaCobrador.iniciar();
	return listadoClientesTareaCobrador;
}
function verCerrarAbmControlCobrador(){
	if(controlacceso("CREARTAREACOBRADOR","accion")==false){return;}
	
	
	
	var contenidotable = document.getElementById('table_Informe_Credito').innerHTML;
	
	if(contenidotable==""){
		ver_vetana_informativa("NO SE PUEDE CREAR UN REGISTRO A COBRADOR SIN DATOS ")
			return false;
	}
	
	if(tipoBusquedaIformeGeneralCredito=="1"){
		ver_vetana_informativa("NO SE PUEDE GUARDAR UNA VISTA SIMPLE")
			return false;
	}
	
	
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmControlCobrador").style.display==""){
		limpiarcamposControlCobrador()
		
		 
	$("div[id=divAbmControlCobrador]").fadeOut(500);	
	}else{		
		
document.getElementById('inptControlCobradorFechaInicio').value = document.getElementById('inptBuscarInformeCreditoF1informe').value;
document.getElementById('inptControlCobradorFechaFin').value = document.getElementById('inptBuscarInformeCreditoF2informe').value;
		
document.getElementById('inptControlCobradorMontoTotal').value = document.getElementById('inptRegistroNroHistorialTotalCredito').value;
document.getElementById('inptControlCobradorMontoSInteres').value = document.getElementById('inptRegistroTotalNetoInformeCredito').value;
document.getElementById('inptControlCobradorNombre').value = document.getElementById('inputCobradorInformeCredito').value;
		
		Cod_zonaCobrador = document.getElementById('inptZonaCuentasAcobrainforme').value;
		
		
		
		if(document.getElementById('inptControlCobradorFechaInicio').value==""){
			ver_vetana_informativa("NO SE PUEDE AGENDAR UN HISTORIAL SIN FECHA DE INICIO")
			return false;
		}
		if(document.getElementById('inptControlCobradorFechaFin').value==""){
			ver_vetana_informativa("NO SE PUEDE AGENDAR UN HISTORIAL SIN FECHA FIN")
			return false;
		}
		
		document.getElementById("divAbmControlCobrador").style.display=""
		 
	}
}

var idControlCobrador = ""

function verificarcamposControlCobrador() {
	var inptControlCobradorFechaInicio = document.getElementById('inptControlCobradorFechaInicio').value
	var inptControlCobradorFechaFin = document.getElementById('inptControlCobradorFechaFin').value
	var inptControlCobradorNombre = document.getElementById('inptControlCobradorNombre').value
	var inptControlCobradorMontoTotal = document.getElementById('inptControlCobradorMontoTotal').value
	var inptControlCobradorMontoSInteres = document.getElementById('inptControlCobradorMontoSInteres').value
	var inptControlCobradorDescripcion = document.getElementById('inptControlCobradorDescripcion').value
	var inptZonaCuentasAcobrainforme = document.getElementById('inptZonaCuentasAcobrainforme').value

	
	if (inptControlCobradorNombre == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL COBRADOR")
		return false;
	}
	
	if (inptControlCobradorMontoTotal == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO TOTAL")
		return false;
	}
	
	if (inptControlCobradorMontoSInteres == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE MONTO SIN INTERES")
		return false;
	}


		accion = "nuevaTarea";
	
	abmControlCobrador(inptControlCobradorFechaInicio, inptControlCobradorFechaFin ,inptControlCobradorNombre ,inptControlCobradorMontoTotal ,inptControlCobradorMontoSInteres,inptControlCobradorDescripcion,inptZonaCuentasAcobrainforme, accion);
}
function abmControlCobrador(fechainicio, fechafin ,nombre ,montoTotal ,MontosinInteres ,descripcion ,zona , accion) {
	verCerrarEfectoCargando("1")
	
	
	var creditos = $("tr[name=TablaCuentaGeneralCredito]").map((i, el) => 
    $(el).find('td[id="td_id"]').html()
	).get();

// Convertir el array a una cadena JSON
var creditosJSON = JSON.stringify(creditos);

if(creditosJSON==""){
	ver_vetana_informativa("FALTO DATOS DEL CREDITO")
	return false ;
	}

// Crear un objeto FormData y agregar la cadena JSON
var datos = new FormData();
	obtener_datos_user();
datos.append("creditos", creditosJSON);
	
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fechainicio", fechainicio)
	datos.append("fechafin", fechafin)
	datos.append("nombre", nombre)
	datos.append("montoTotal", montoTotal)
	datos.append("MontosinInteres", MontosinInteres)
	datos.append("descripcion", descripcion)
	datos.append("zona", zona) 
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmTareaCobrador.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
        var porce= ~~((evt.loaded / evt.total) * 100); 
		if(porce>90){
		porce=Number(porce)-7				
		}
		document.getElementById("lbltitulomensaje_b").innerHTML="Cargando<br>("+porce+"%)";
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
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
					limpiarcamposControlCobrador()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					verCerrarAbmControlCobrador()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

var Cod_zonaCobrador="";

function limpiarcamposControlCobrador() {
	document.getElementById('inptControlCobradorFechaInicio').value = "";
	document.getElementById('inptControlCobradorFechaFin').value = "";
	document.getElementById('inptControlCobradorNombre').value = "";
	document.getElementById('inptControlCobradorMontoTotal').value = "";
	document.getElementById('inptControlCobradorMontoSInteres').value = "";
	document.getElementById('btnAbmControlCobrador').value = "Guardar datos";
	idControlCobrador = "";
}





/* INFORME TAREAS COBRADOR */
function verCerrarTareasCobrador(){
	
	if(document.getElementById("divTareasCobrador").style.display==""){
	 
	$("div[id=divTareasCobrador]").fadeOut(500);	
		document.getElementById("divMinimizadoTareasCobrador").style.display="none";
		}else{		
		if(controlacceso("VERINFORMETAREASCOBRADOR","accion")==false){return;	}
		mostrarSoloUno("divTareasCobrador")	
	 document.getElementById("divTareasCobrador").style.display=""
      

	}
}

function minimizarventanaTareasCobrador(){
 
	$("div[id=divTareasCobrador]").fadeOut(500);	
	document.getElementById("divMinimizadoTareasCobrador").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuTareasCobrador"));
}

function checkTareasCobrador(d){	
	if(d=="1"){
		document.getElementById('checkHistorialTareasCobrador1').checked=true
		document.getElementById('checkHistorialTareasCobrador2').checked=false
		document.getElementById('inptBuscarTareasCobradorF1').value = "";
	    document.getElementById('inptBuscarTareasCobradorF2').value = "";	
	}else{		
		document.getElementById('checkHistorialTareasCobrador1').checked=false
		document.getElementById('checkHistorialTareasCobrador2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarTareasCobradorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarTareasCobradorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function checkEstadoTareaCobrador(d){	
	if(d=="1"){
		document.getElementById('checkEstadoTareaC1').checked=false
		document.getElementById('checkEstadoTareaC2').checked=true
	}else{		
		document.getElementById('checkEstadoTareaC1').checked=true
		document.getElementById('checkEstadoTareaC2').checked=false
		
	}
}

function buscarTareasCobrador() {
	var fecha1 = document.getElementById('inptBuscarTareasCobradorF1').value
	var fecha2 = document.getElementById('inptBuscarTareasCobradorF2').value
	var cobrador = document.getElementById('inptInformeTareasCobrador').value
	var descripcion = document.getElementById('inptbuscarTareasCobrador1').value

	if(document.getElementById('checkHistorialTareasCobrador2').checked==true){
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

		
	let estado = "Activo";
	if(document.getElementById('checkEstadoTareaC2').checked==true){
		estado = "Finalizado";
	}


	document.getElementById("table_TareasCobrador").innerHTML = paginacargando
	document.getElementById("inptTotalRecaudarTareasCobrador").value =""
	document.getElementById("inptTotalSinInteres").value =""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrador": cobrador,
		"estado": estado,
		"descripcion": descripcion,
		"formato": "json",
		"funt": "buscarTareasCobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_TareasCobrador").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_TareasCobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					resumenTareasCobrador=datos[5] || null;
					var listado=iniciarListadoTareasCobrador();
					if(Array.isArray(datos_buscados) && listado){listado.establecerRegistros(datos_buscados);}
					else{document.getElementById("table_TareasCobrador").innerHTML = datos_buscados || "";}
					document.getElementById("inptTotalRecaudarTareasCobrador").value = datos[3];
					document.getElementById("inptTotalSinInteres").value = datos[4];				
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function iniciarListadosControlCobrador(){
	iniciarListadoTareasCobrador();
	iniciarListadoClientesTareaCobrador();
}
if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciarListadosControlCobrador);
else iniciarListadosControlCobrador();

function verCerrarListaClienteTareaCobrador(){
	
	if(document.getElementById("divListaClienteTareaCobrador").style.display==""){
	 
	$("div[id=divListaClienteTareaCobrador]").fadeOut(500);	
		
		}else{		
				
				if(cod_TareasCobrador==""){
					ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
					return false;
				}
				
				buscarListaCLientes()
		document.getElementById("divListaClienteTareaCobrador").style.display=""
		 

	}
}

let cod_TareasCobrador="";
let cobradoCobrador=0;
let descripcionTarea="";
let CobradorTarea="";
let fechasTarea="";
function obtenerdatosvistaTareasCobrador(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	
	cod_TareasCobrador=$(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptCobrarCargarCobro').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptCobradoCargarCobro').value = $(datostr).children('td[id="td_datos_7"]').html();
	descripcionTarea= $(datostr).children('td[id="td_datos_6"]').html();
	CobradorTarea= $(datostr).children('td[id="td_datos_1"]').html();
	fechasTarea= $(datostr).children('td[id="td_datos_2"]').html();
	
	}
function buscarListaCLientes() {
	var listado=iniciarListadoClientesTareaCobrador();
	var concicion ="Sin Pago"
	if(document.getElementById('checkClientesDeuda1').checked==true){
		concicion ="todo"
	}

	var Zona= document.getElementById("inptZonaTareasCobrador").value
	var fecha1= document.getElementById("inptTareasCobradorFechaInicio").value
	var fecha2= document.getElementById("inptTareasCobradorFechaFin").value
	
	document.getElementById("table_ListaClienteTareaCobrador").innerHTML = paginacargando
	document.getElementById("table_ListaClienteTareaCobradorExcel").innerHTML = ''
	document.getElementById("inptTotalClienteTC").value =  "";
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"cod_TareasCobrador": cod_TareasCobrador,
			"concicion": concicion,
			"Zona": Zona,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"formato": "json",
			"funt": "buscarListaCLientes"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
				
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_ListaClienteTareaCobrador").innerHTML = ''		
			document.getElementById("table_ListaClienteTareaCobradorExcel").innerHTML = ''		
			},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_ListaClienteTareaCobrador").innerHTML = ''			
			document.getElementById("table_ListaClienteTareaCobradorExcel").innerHTML = ''			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
					document.getElementById("table_ListaClienteTareaCobradorExcel").innerHTML =  datos[5]	
					document.getElementById("inptTotalClienteTC").value =  datos[3];
					document.getElementById("inptTotalDeudaTC").value =  datos[4];					
// alert (datos[4])					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function ExcelTareasCobrador_Clientes() {

	$("#table_ListaClienteTareaCobradorExcel").table2excel({
       // exclude CSS class
       exclude: ".noExl",
       name: "vendedores_meta"
       }); 
	 
}

function verCerrarCargarCobro(d){
	if(d=="1"){
		if(controlacceso("TAREACOBRADORFINALIZAR","accion")==false){return;}
		if(cod_TareasCobrador==""){
			ver_vetana_informativa("FALTÓ SELECCIONAR UN REGISTRO")
			return false;
		}
		$("div[id=divAbmCargarCobro]").fadeIn(500);

	}else{
		cod_TareasCobrador="";
		$("div[id=divAbmCargarCobro]").fadeOut(500);
	}
}

function VerificarDatosCargarCobro() {
	var inptCobradoCargarCobro = document.getElementById('inptCobradoCargarCobro').value
	
	if (cod_TareasCobrador == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	
	if (inptCobradoCargarCobro == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO")
		return false;
	}


		accion = "EditarTarea";
	
	abmCargarCobro(inptCobradoCargarCobro,cod_TareasCobrador, accion);
}
function abmCargarCobro(monto ,cod_tarea , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_tarea", cod_tarea)
	datos.append("monto", monto)


	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
        var porce= ~~((evt.loaded / evt.total) * 100); 
		if(porce>90){
		porce=Number(porce)-7				
		}
		document.getElementById("lbltitulomensaje_b").innerHTML="Cargando<br>("+porce+"%)";
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
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
					document.getElementById('inptCobradoCargarCobro').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarTareasCobrador()
					verCerrarCargarCobro("2")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function EliminarCargarCobro(){
	
	if(controlacceso("TAREACOBRADORELIMINAR","accion")==false){return;}
	if (cod_TareasCobrador == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	
if(confirm("Estas seguro que quieres eliminar el registro seleccionado")){
		 
}else{
	cod_TareasCobrador = ""
	return false;
}

verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "EliminarCargarCobro")
	datos.append("cod_TareasCobrador", cod_TareasCobrador)

	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
        var porce= ~~((evt.loaded / evt.total) * 100); 
		if(porce>90){
		porce=Number(porce)-7				
		}
		document.getElementById("lbltitulomensaje_b").innerHTML="Cargando<br>("+porce+"%)";
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
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
					ver_vetana_informativa("DATOS ELIMINADOS CORRECTAMENTE...")
					buscarTareasCobrador()
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

}

