/*
ABM ESTADO CLIENTE CALLCENTER
*/
var listadoAbmEstadoClienteCallCenter = null;
function iniciarListadoAbmEstadoClienteCallCenter() {
	if (listadoAbmEstadoClienteCallCenter || !window.AbmListadoCore) { return listadoAbmEstadoClienteCallCenter; }
	var cuerpo = document.getElementById("divBuscadorEstadoClienteCallCenter");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmEstadoClienteCallCenter";
	listadoAbmEstadoClienteCallCenter = window.AbmListadoCore.crear({
		nombre: "estado_cliente_callcenter",
		idCabecera: "cabeceraAbmEstadoClienteCallCenter",
		idCuerpo: "divBuscadorEstadoClienteCallCenter",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmEstadoCallCenter",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmEstadoClienteCallCenter.iniciar();
	return listadoAbmEstadoClienteCallCenter;
}
var idAbmEstadoClienteCallCenter="";
function verVentanaAbmEstadosClienteCallCenter(d){
	if(d=='1'){
		BuscarAbmEstadoClienteCallCenter()
		document.getElementById('divAbmEstadoClienteCallCenter').style.display = '';
	}else{
		document.getElementById('divAbmEstadoClienteCallCenter').style.display = 'none';
		LimpiarCamposEstadoClienteCallCenter()
		document.getElementById('divBuscadorEstadoClienteCallCenter').innerHTML = ''
	}
}
function LimpiarCamposEstadoClienteCallCenter(){
	document.getElementById("inptDescripcionEstadoClienteCallCenter").value="";
	document.getElementById("inptEstadoEstadoClienteCallCenter").value="Activo";
	document.getElementById("btnEstadoClienteCallCenter1").value="Guardar Datos"
	idAbmEstadoClienteCallCenter="";
}
function ObtenerdatosAbmEstadoCallCenter(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		

	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptDescripcionEstadoClienteCallCenter").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoEstadoClienteCallCenter").value = $(datostr).children('td[id="td_datos_2"]').html();
	idAbmEstadoClienteCallCenter = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnEstadoClienteCallCenter1").value="Editar Datos"
}
function VerificarDatosEstadoClienteCallCenter(){
	var inptDescripcionEstadoClienteCallCenter = document.getElementById("inptDescripcionEstadoClienteCallCenter").value
	var inptEstadoEstadoClienteCallCenter = document.getElementById("inptEstadoEstadoClienteCallCenter").value	
	if(inptDescripcionEstadoClienteCallCenter==""){
		document.getElementById("inptDescripcionEstadoClienteCallCenter").focus()
		ver_vetana_informativa("FALTÓ INGRESAR LA DESCRIPCION DEL ESTADO")
		return
	}
	
	var accion = "";
	if (idAbmEstadoClienteCallCenter != "") {		
		accion = "editar";
	} else {
		accion = "nuevo";
	}
	AbmEstadoClienteCallCenter(inptDescripcionEstadoClienteCallCenter,inptEstadoEstadoClienteCallCenter,idAbmEstadoClienteCallCenter,accion)
}
function AbmEstadoClienteCallCenter(descripcion,Estado,idabm,accion) {
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
					LimpiarCamposEstadoClienteCallCenter()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmEstadoClienteCallCenter()
					BuscarSelectEstadoClienteCallCenter() 
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmEstadoClienteCallCenter() {
	var listado = iniciarListadoAbmEstadoClienteCallCenter();
	var buscador = document.getElementById("inptBuscarAbmEstadoClienteCallCenters").value
	var estado = "Activo"
	document.getElementById("divBuscadorEstadoClienteCallCenter").innerHTML = paginacargando
    document.getElementById("lblNroRegistroEstadoClienteCallCenter").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/ABMEstadoClienteCallCenter.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorEstadoClienteCallCenter").innerHTML = ''
			document.getElementById("lblNroRegistroEstadoClienteCallCenter").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorEstadoClienteCallCenter").innerHTML = ''
			document.getElementById("lblNroRegistroEstadoClienteCallCenter").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
                   document.getElementById("lblNroRegistroEstadoClienteCallCenter").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmEstadoClienteCallCenter);
} else {
	iniciarListadoAbmEstadoClienteCallCenter();
}
function BuscarSelectEstadoClienteCallCenter() {
	document.getElementById("inptSelecActualizarEstadoCliente").innerHTML = ""
	document.getElementById("inptBuscarInformeDetalleCallCenter1").innerHTML = ""
	document.getElementById("inptBuscarListaCallCenter2").innerHTML = ""
	document.getElementById("inptBuscarInformeActividadCallCenter2").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
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
					document.getElementById("inptSelecActualizarEstadoCliente").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeDetalleCallCenter1").innerHTML = datos_buscados
					document.getElementById("inptBuscarListaCallCenter2").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeActividadCallCenter2").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


