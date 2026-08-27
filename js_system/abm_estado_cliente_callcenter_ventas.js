/*
ABM ESTADO CLIENTE CALLCENTER VENTAS
*/
var listadoAbmEstadoClienteCallCenterVenta = null;
function iniciarListadoAbmEstadoClienteCallCenterVenta() {
	if (listadoAbmEstadoClienteCallCenterVenta || !window.AbmListadoCore) { return listadoAbmEstadoClienteCallCenterVenta; }
	var cuerpo = document.getElementById("divBuscadorEstadoClienteCallCenterVenta");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmEstadoClienteCallCenterVenta";
	listadoAbmEstadoClienteCallCenterVenta = window.AbmListadoCore.crear({
		nombre: "estado_cliente_callcenter_venta",
		idCabecera: "cabeceraAbmEstadoClienteCallCenterVenta",
		idCuerpo: "divBuscadorEstadoClienteCallCenterVenta",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmEstadoCallCenterVenta",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmEstadoClienteCallCenterVenta.iniciar();
	return listadoAbmEstadoClienteCallCenterVenta;
}
var idAbmEstadoClienteCallCenterVenta="";
function verVentanaAbmEstadosClienteCallCenterVenta(d){
	if(d=='1'){
		BuscarAbmEstadoClienteCallCenterVenta()
		document.getElementById('divAbmEstadoClienteCallCenterVenta').style.display = '';
	}else{
		document.getElementById('divAbmEstadoClienteCallCenterVenta').style.display = 'none';
		LimpiarCamposEstadoClienteCallCenterVenta()
		document.getElementById('divBuscadorEstadoClienteCallCenterVenta').innerHTML = ''
	}
}
function LimpiarCamposEstadoClienteCallCenterVenta(){
	document.getElementById("inptDescripcionEstadoClienteCallCenterVenta").value="";
	document.getElementById("inptEstadoEstadoClienteCallCenterVenta").value="Activo";
	document.getElementById("btnEstadoClienteCallCenterVenta1").value="Guardar Datos"
	idAbmEstadoClienteCallCenterVenta="";
}
function ObtenerdatosAbmEstadoCallCenterVenta(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		

	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptDescripcionEstadoClienteCallCenterVenta").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoEstadoClienteCallCenterVenta").value = $(datostr).children('td[id="td_datos_2"]').html();
	idAbmEstadoClienteCallCenterVenta = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnEstadoClienteCallCenterVenta1").value="Editar Datos"
}
function VerificarDatosEstadoClienteCallCenterVenta(){
	var inptDescripcionEstadoClienteCallCenterVenta = document.getElementById("inptDescripcionEstadoClienteCallCenterVenta").value
	var inptEstadoEstadoClienteCallCenterVenta = document.getElementById("inptEstadoEstadoClienteCallCenterVenta").value	
	if(inptDescripcionEstadoClienteCallCenterVenta==""){
		document.getElementById("inptDescripcionEstadoClienteCallCenterVenta").focus()
		ver_vetana_informativa("FALTÓ INGRESAR LA DESCRIPCION DEL ESTADO")
		return
	}
	
	var accion = "";
	if (idAbmEstadoClienteCallCenterVenta != "") {		
		accion = "editar_estado_venta";
	} else {
		accion = "nuevo_estado_venta";
	}
	AbmEstadoClienteCallCenterVenta(inptDescripcionEstadoClienteCallCenterVenta,inptEstadoEstadoClienteCallCenterVenta,idAbmEstadoClienteCallCenterVenta,accion)
}
function AbmEstadoClienteCallCenterVenta(descripcion,Estado,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("estado", Estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMEstadoClienteCallCenter.php",
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
					LimpiarCamposEstadoClienteCallCenterVenta()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmEstadoClienteCallCenterVenta()
					BuscarSelectEstadoClienteCallCenterVenta() 
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmEstadoClienteCallCenterVenta() {
	var listado = iniciarListadoAbmEstadoClienteCallCenterVenta();
	var buscador = document.getElementById("inptBuscarAbmEstadoClienteCallCenterVentas").value
	var estado = "Activo"
	document.getElementById("divBuscadorEstadoClienteCallCenterVenta").innerHTML = paginacargando
    document.getElementById("lblNroRegistroEstadoClienteCallCenterVenta").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "buscar_venta"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMEstadoClienteCallCenter.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorEstadoClienteCallCenterVenta").innerHTML = ''
			document.getElementById("lblNroRegistroEstadoClienteCallCenterVenta").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorEstadoClienteCallCenterVenta").innerHTML = ''
			document.getElementById("lblNroRegistroEstadoClienteCallCenterVenta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
                   document.getElementById("lblNroRegistroEstadoClienteCallCenterVenta").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmEstadoClienteCallCenterVenta);
} else {
	iniciarListadoAbmEstadoClienteCallCenterVenta();
}
function BuscarSelectEstadoClienteCallCenterVenta() {
	document.getElementById("inptSelecActualizarEstadoClienteVentas").innerHTML = ""
	document.getElementById("inptBuscarAbmCallCenterVenta3").innerHTML = ""
	document.getElementById("inptBuscarInformeActividadCallCenterVenta2").innerHTML = ""
	document.getElementById("inptBuscarInformeDetalleCallCenterVenta1").innerHTML = ""
	document.getElementById("inptBuscarInformeAgendaCallCenterVenta2").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOptionVenta"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMEstadoClienteCallCenter.php",
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
					document.getElementById("inptSelecActualizarEstadoClienteVentas").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeDetalleCallCenterVenta1").innerHTML = datos_buscados
					document.getElementById("inptBuscarAbmCallCenterVenta3").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeActividadCallCenterVenta2").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeAgendaCallCenterVenta2").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



