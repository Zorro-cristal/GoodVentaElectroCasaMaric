/*
ABM tipo_detalle_vehiculo
*/
var idAbmtipo_detalle_vehiculo="";
var ElementoSelecctipo_detalle_vehiculo=""; 
var listadoAbmTipoDetalleVehiculo = null;
function iniciarListadoAbmTipoDetalleVehiculo() {
	if (listadoAbmTipoDetalleVehiculo || !window.AbmListadoCore) return listadoAbmTipoDetalleVehiculo;
	var cuerpo = document.getElementById('divBuscadortipo_detalle_vehiculo');
	if (!cuerpo) return null;
	var cabeceraTabla = cuerpo.previousElementSibling;
	var cabecera = cabeceraTabla && cabeceraTabla.querySelector('tr');
	if (!cabecera) return null;
	cabecera.id = 'cabeceraAbmTipoDetalleVehiculo';
	listadoAbmTipoDetalleVehiculo = window.AbmListadoCore.crear({
		nombre: 'tipo_detalle_vehiculo',
		idCabecera: 'cabeceraAbmTipoDetalleVehiculo',
		idCuerpo: 'divBuscadortipo_detalle_vehiculo',
		ordenInicial: 'nombre',
		columnas: [
			{ campo: 'nombre', titulo: 'DESCRIPCION', ancho: '70%' },
			{ campo: 'notificacion', titulo: 'NOTIFICACION', ancho: '30%' }
		],
		fila: {
			funcionSeleccion: 'ObtenerdatosAbmtipo_detalle_vehiculo',
			celdas: [
				{ id: 'td_id', campo: 'codigo', tecnica: true },
				{ id: 'td_datos_1', campo: 'nombre', columna: 'nombre', className: 'tdRegistroSearch' },
				{ id: 'td_datos_3', campo: 'notificacion', columna: 'notificacion', className: 'tdRegistroSearch' },
				{ id: 'td_datos_2', campo: 'estado', tecnica: true }
			]
		}
	});
	listadoAbmTipoDetalleVehiculo.iniciar();
	return listadoAbmTipoDetalleVehiculo;
}
function verCerrarFrmtipo_detalle_vehiculo(d,v){
	if(d=="1"){
		$("div[id=divAbmtipo_detalle_vehiculo]").fadeIn(500);
 
		BuscarAbmtipo_detalle_vehiculo()
	}else{
		$("div[id=divAbmtipo_detalle_vehiculo]").fadeOut(500);
	}
}
function LimpiarCampostipo_detalle_vehiculo(){
	document.getElementById("inptNombretipo_detalle_vehiculo").value="";
	document.getElementById("inptEstadotipo_detalle_vehiculo").value="";
	document.getElementById("inptNotificacionestipo_detalle_vehiculo").value="";
	document.getElementById("btntipo_detalle_vehiculo1").value="Guardar Datos"
	idAbmtipo_detalle_vehiculo="";
	ElementoSelecctipo_detalle_vehiculo="";
}
function ObtenerdatosAbmtipo_detalle_vehiculo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSelecctipo_detalle_vehiculo=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombretipo_detalle_vehiculo").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadotipo_detalle_vehiculo").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptNotificacionestipo_detalle_vehiculo").value = $(datostr).children('td[id="td_datos_3"]').html();
	idAbmtipo_detalle_vehiculo = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btntipo_detalle_vehiculo1").value="Editar Datos"
}
function SeleccionarRegistrotipo_detalle_vehiculo(){
	if(ElementoSelecctipo_detalle_vehiculo==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	document.getElementById("inptdescripcionDetalleVehivulos").value=$(ElementoSelecctipo_detalle_vehiculo).children('td[id="td_id"]').html();
	 idAbmtipo_detalle_vehiculo = $(ElementoSelecctipo_detalle_vehiculo).children('td[id="td_id"]').html();
	 	
	 document.getElementById("divAbmtipo_detalle_vehiculo").style.display="none";
	 LimpiarCampostipo_detalle_vehiculo()
}
function VerificarDatostipo_detalle_vehiculo(){
	var inptNombretipo_detalle_vehiculo = document.getElementById("inptNombretipo_detalle_vehiculo").value
	var inptEstadotipo_detalle_vehiculo = document.getElementById("inptEstadotipo_detalle_vehiculo").value	
	var inptNotificacionestipo_detalle_vehiculo = document.getElementById("inptNotificacionestipo_detalle_vehiculo").value	
	if(inptNombretipo_detalle_vehiculo==""){
		document.getElementById("inptNombretipo_detalle_vehiculo").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadotipo_detalle_vehiculo==""){
		document.getElementById("inptEstadotipo_detalle_vehiculo").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}
	if(inptNotificacionestipo_detalle_vehiculo==""){
		document.getElementById("inptNotificacionestipo_detalle_vehiculo").focus()
		ver_vetana_informativa("Falto seleccionar el de Notificacion")
		return
	}	
	var accion = "";
	if (idAbmtipo_detalle_vehiculo != "") {		
		accion = "editar";
	} else {
		accion = "nuevo";
	}
	Abmtipo_detalle_vehiculo(inptNotificacionestipo_detalle_vehiculo,inptNombretipo_detalle_vehiculo,inptEstadotipo_detalle_vehiculo,idAbmtipo_detalle_vehiculo,accion)
}
function Abmtipo_detalle_vehiculo(notificacion,descripcion,Estado,idabm,accion) {
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
	datos.append("notificacion", notificacion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMtipo_detalle_vehiculo.php",
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
					LimpiarCampostipo_detalle_vehiculo()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmtipo_detalle_vehiculo()
					BuscarSelecttipo_detalle_vehiculo() 
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmtipo_detalle_vehiculo() {
	var listado = iniciarListadoAbmTipoDetalleVehiculo()
	var buscador = document.getElementById("inptBuscarAbmtipo_detalle_vehiculos").value
	var estado = "Activo"
	document.getElementById("divBuscadortipo_detalle_vehiculo").innerHTML = paginacargando
    document.getElementById("lblNroRegistrotipo_detalle_vehiculo").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/ABMtipo_detalle_vehiculo.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadortipo_detalle_vehiculo").innerHTML = ''
			document.getElementById("lblNroRegistrotipo_detalle_vehiculo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadortipo_detalle_vehiculo").innerHTML = ''
			document.getElementById("lblNroRegistrotipo_detalle_vehiculo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
                   document.getElementById("lblNroRegistrotipo_detalle_vehiculo").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
	
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmTipoDetalleVehiculo)
else iniciarListadoAbmTipoDetalleVehiculo()
	
function BuscarSelecttipo_detalle_vehiculo() {
	document.getElementById("inptdescripcionDetalleVehivulos").innerHTML = ""
	document.getElementById("inptBuscarDetalleVehivulos1").innerHTML = ""
	document.getElementById("inptBuscarMantenimientoVehivulos2").innerHTML = ""
	 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMtipo_detalle_vehiculo.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptdescripcionDetalleVehivulos").innerHTML = ''
			document.getElementById("inptBuscarDetalleVehivulos1").innerHTML = ''
			 
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptdescripcionDetalleVehivulos").innerHTML = ''
			document.getElementById("inptBuscarDetalleVehivulos1").innerHTML = ''
			 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
                 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("inptdescripcionDetalleVehivulos").innerHTML = datos_buscados
					document.getElementById("inptBuscarDetalleVehivulos1").innerHTML = datos_buscados
					document.getElementById("inptBuscarMantenimientoVehivulos2").innerHTML = datos_buscados
				 }
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


///////////////NOTIFICACIONES

function renderizarNotificacionesVehiculos(registros) {
	var contenedor = document.getElementById('DetalleNotificaciones');
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(registros || []).forEach(function (registro) {
		var enlace = document.createElement('a');
		enlace.className = 'list-group-item';
		enlace.id = String(registro.codigo == null ? '' : registro.codigo);
		enlace.addEventListener('click', function () { ObtenerdatosAbmNotificaciones(this); });
		var fila = document.createElement('div');
		fila.className = 'row g-0 align-items-center';
		var columnaIcono = document.createElement('div');
		columnaIcono.className = 'col-2';
		var icono = document.createElement('i');
		icono.className = registro.urgente ? 'text-danger bx bx-error-circle' : 'text-warning bx bx-bell';
		icono.setAttribute('data-feather', registro.urgente ? 'alert-circle' : 'bell');
		columnaIcono.appendChild(icono);
		var contenido = document.createElement('div');
		contenido.className = 'col-10';
		var titulo = document.createElement('div');
		titulo.className = 'text-dark';
		titulo.textContent = (registro.urgente ? 'Urgente- ' : 'Advertencia- ') + (registro.vehiculo || '');
		var detalle = document.createElement('div');
		detalle.className = 'text-muted small mt-1';
		detalle.textContent = registro.detalle || '';
		var kilometros = document.createElement('div');
		kilometros.className = 'text-muted small mt-1';
		kilometros.textContent = 'Mantenimiento en: ' + (registro.kilometros_restantes_formateado || '0') + ' KM';
		contenido.appendChild(titulo);
		contenido.appendChild(detalle);
		contenido.appendChild(kilometros);
		fila.appendChild(columnaIcono);
		fila.appendChild(contenido);
		enlace.appendChild(fila);
		contenedor.appendChild(enlace);
	});
}


function BuscarNotificaciones() {
	
	
	if(controlacceso2("VERNOTIFICACIONESVEHICULOS","accion")==false){return;}
	
	document.getElementById("AlertaNotificaciones").style.display = ""
	
	
	document.getElementById("PcontadoNotificacionesN").innerHTML = ""
	document.getElementById("PcontadoNotificacionesL").innerHTML = ""
	document.getElementById("DetalleNotificaciones").innerHTML = paginacargando
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "BuscarNotificaciones"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("PcontadoNotificacionesN").innerHTML = ""
			document.getElementById("PcontadoNotificacionesL").innerHTML = ""
			document.getElementById("DetalleNotificaciones").innerHTML = ""
			 
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("PcontadoNotificacionesN").innerHTML = ""
			document.getElementById("PcontadoNotificacionesL").innerHTML = ""
			document.getElementById("DetalleNotificaciones").innerHTML = ""
			 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
                 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("PcontadoNotificacionesN").textContent = datos[3]
					if (Array.isArray(datos_buscados)) renderizarNotificacionesVehiculos(datos_buscados);
					else document.getElementById("DetalleNotificaciones").innerHTML = datos_buscados;
					document.getElementById("PcontadoNotificacionesL").textContent = datos[3] +" Nuevas Notificaciones"
				 }
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

var cod_notificacion="";
function ObtenerdatosAbmNotificaciones(datostr) {
	 cod_notificacion=datostr.id;
	 verCerrarNotificaciones()
}


function verCerrarNotificaciones(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmNotificaciones").style.display==""){
	limpiarcamposDetalleVehivulos()
	
	$("div[id=divAbmNotificaciones]").fadeOut(500);			
	}else{	
// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
		document.getElementById("divAbmNotificaciones").style.display=""		
		 
		buscarabmNotificaciones(cod_notificacion);
		 
	}
}

function limpiarcamposDetalleVehivulos() {
	document.getElementById('inptFechaNotificacioness').value=""
	document.getElementById('inptKilometrajeInicioNotificaciones').value=""
	document.getElementById('inptKilometrajeFinNotificaciones').value=""
	document.getElementById('inptCostoNotificaciones').value=""
	document.getElementById('inptdescripcionNotificaciones').value=""
	document.getElementById('inpObservacionNotificaciones').value=""
	document.getElementById('inptEstadodetalleNotificaciones').value=""
	BuscarNotificaciones()
	cod_notificacion = ""; 

}




function buscarabmNotificaciones(cod_notificacion) {
// if(controlacceso("BUSCARLISTADOVehivulosES","accion")==false){return;}
	document.getElementById('inptFechaNotificacioness').value=""
	document.getElementById('inptKilometrajeInicioNotificaciones').value=""
	document.getElementById('inptKilometrajeFinNotificaciones').value=""
	document.getElementById('inptCostoNotificaciones').value=""
	document.getElementById('inptdescripcionNotificaciones').value=""
	document.getElementById('inpObservacionNotificaciones').value=""
	document.getElementById('inptEstadodetalleNotificaciones').value=""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_notificacion": cod_notificacion,

		"funt": "buscarabmNotificaciones"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
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
					document.getElementById('inptFechaNotificacioness').value= datos[4]
					document.getElementById('inptKilometrajeInicioNotificaciones').value= datos[7]
					document.getElementById('inptKilometrajeFinNotificaciones').value= datos[8]
					document.getElementById('inptCostoNotificaciones').value= datos[6]
					document.getElementById('inptdescripcionNotificaciones').value= datos[2]
					document.getElementById('inpObservacionNotificaciones').value= datos[3]
					document.getElementById('inptEstadodetalleNotificaciones').value= datos[5]					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function verificarcamposFinalizarNotificaciones(){
	
	accion = "FinalizarDetalleVehiculo";
	
	var inptEstadodetalleNotificaciones = document.getElementById('inptEstadodetalleNotificaciones').value
	
	if(inptEstadodetalleNotificaciones==""){
		document.getElementById("inptEstadodetalleNotificaciones").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return;
	}
	
	abmDetalleVehivulos("","", "", "", "", "",  inptEstadodetalleNotificaciones,  "", cod_notificacion, accion);
	verCerrarNotificaciones()
}



/* INFORME MANTENIMIENTO VEHICULO */
var listadoInformeMantenimientoVehiculos = null;
function iniciarListadoInformeMantenimientoVehiculos() {
	if (listadoInformeMantenimientoVehiculos || !window.AbmListadoCore) return listadoInformeMantenimientoVehiculos;
	var cuerpo = document.getElementById('table_informe_MantenimientoVehivulos');
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
	cabecera.id = 'cabeceraInformeMantenimientoVehiculos';
	listadoInformeMantenimientoVehiculos = window.AbmListadoCore.crear({
		nombre: 'informeMantenimientoVehiculos',
		idCabecera: 'cabeceraInformeMantenimientoVehiculos',
		idCuerpo: 'table_informe_MantenimientoVehivulos',
		ordenInicial: 'fecha',
		columnas: [
			{ campo: 'vehiculo', titulo: 'VEHICULO', ancho: '15%' },
			{ campo: 'detalle', titulo: 'DETALLE', ancho: '20%' },
			{ campo: 'fecha', titulo: 'FECHA', ancho: '10%' },
			{ campo: 'precio', titulo: 'COSTO', ancho: '10%' },
			{ campo: 'encargado', titulo: 'ENCARGADO', ancho: '15%' },
			{ campo: 'kilometro_inicio', titulo: 'KM. INICIO', ancho: '10%' },
			{ campo: 'kilometro_fin', titulo: 'KM. FIN', ancho: '10%' },
			{ campo: 'estado_registro', titulo: 'ESTADO', ancho: '10%' }
		],
		fila: { celdas: [
			{ campo: 'vehiculo', columna: 'vehiculo' },
			{ campo: 'detalle', columna: 'detalle' },
			{ campo: 'fecha', columna: 'fecha' },
			{ campo: 'precio_formateado', columna: 'precio' },
			{ campo: 'encargado', columna: 'encargado' },
			{ campo: 'kilometro_inicio_formateado', columna: 'kilometro_inicio' },
			{ campo: 'kilometro_fin_formateado', columna: 'kilometro_fin' },
			{ campo: 'estado_registro', columna: 'estado_registro' }
		] }
	});
	listadoInformeMantenimientoVehiculos.iniciar();
	return listadoInformeMantenimientoVehiculos;
}

function verCerrarInformeMantenimientoVehivulos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeMantenimientoVehivulos").style.display==""){
		document.getElementById("divMinimizadoInformeMantenimientoVehivulos").style.display="none"
		limpiarcamposbuscarInfMantenimientoVehivulos() 
	$("div[id=divInformeMantenimientoVehivulos]").fadeOut(500);			
	}else{	
		if(controlacceso("VERINFORMEMANTENIMIENTOVEHICULOS","accion")==false){return;}
		mostrarSoloUno("divInformeMantenimientoVehivulos")	
		document.getElementById("divInformeMantenimientoVehivulos").style.display="" 
	}
}
function minimizarInformeMantenimientoVehivulos(){ 
	$("div[id=divInformeMantenimientoVehivulos]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeMantenimientoVehivulos").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuInformeMantenimientoVehivulos"));
}
function checkHistorialInformeMantenimientoVehivulos(d){	
	if(d=="1"){
		document.getElementById('checkHistorialMantenimientoVehivulos1').checked=true
		document.getElementById('checkHistorialMantenimientoVehivulos2').checked=false
		document.getElementById('inptbuscarInformeMantenimientoVehivulosF1').value = "";
	    document.getElementById('inptbuscarInformeMantenimientoVehivulosF2').value = "";	
	}else{		
		document.getElementById('checkHistorialMantenimientoVehivulos1').checked=false
		document.getElementById('checkHistorialMantenimientoVehivulos2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptbuscarInformeMantenimientoVehivulosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptbuscarInformeMantenimientoVehivulosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


function buscarInformeMantenimientoVehivulos() {
	var fecha1 = document.getElementById('inptbuscarInformeMantenimientoVehivulosF1').value
	var fecha2 = document.getElementById('inptbuscarInformeMantenimientoVehivulosF2').value
	var vehiculo = document.getElementById('inptBuscarMantenimientoVehivulos1').value
	var detalle = document.getElementById('inptBuscarMantenimientoVehivulos2').value
	var encargado = document.getElementById('inptBuscarInfMantenimientoVehivulos3').value
	var estado = document.getElementById('inptBuscarInfMantenimientoVehivulos4').value
	
	if(document.getElementById('checkHistorialMantenimientoVehivulos2').checked==true){
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

	document.getElementById("table_informe_MantenimientoVehivulos").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeMantenimientoVehivulos").value =""
	document.getElementById("inptTotalCostoInformeMantenimientoVehivulos").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"vehiculo": vehiculo,
			"detalle": detalle,
			"encargado": encargado, 
			"estado": estado, 
			"formato": "json",
			"funt": "buscarInformeMantenimientoVehivulos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_MantenimientoVehivulos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_informe_MantenimientoVehivulos").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					var listado = iniciarListadoInformeMantenimientoVehiculos();
					if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_informe_MantenimientoVehivulos").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistoInformeMantenimientoVehivulos").value = datos[3];
					document.getElementById("inptTotalCostoInformeMantenimientoVehivulos").value = datos[4];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoInformeMantenimientoVehiculos);
else iniciarListadoInformeMantenimientoVehiculos();
function limpiarcamposbuscarInfMantenimientoVehivulos(){
	checkHistorialInformeMantenimientoVehivulos(1)
	document.getElementById('inptBuscarMantenimientoVehivulos1').value = ''
	document.getElementById('inptBuscarMantenimientoVehivulos2').value = ''
	document.getElementById('inptBuscarInfMantenimientoVehivulos3').value = ''
	document.getElementById('inptBuscarInfMantenimientoVehivulos4').value = ''
	document.getElementById('inptTotalCostoInformeMantenimientoVehivulos').value = ''
	document.getElementById('inptTotalRegistoInformeMantenimientoVehivulos').value = ''
	document.getElementById('table_informe_MantenimientoVehivulos').innerHTML = ''
}



