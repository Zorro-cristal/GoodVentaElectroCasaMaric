/* ABM MOTIVO EN EGRESO/INGRESO JUAN */
var listadoAbmMotivoEgresoIngresoJuan = null;
function iniciarListadoAbmMotivoEgresoIngresoJuan() {
	if (listadoAbmMotivoEgresoIngresoJuan || !window.AbmListadoCore) return listadoAbmMotivoEgresoIngresoJuan;
	var cuerpo = document.getElementById("divBuscadorMotivoEgresoIngresoJuan");
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && cabecera.tagName !== "TABLE") cabecera = cabecera.previousElementSibling;
	if (!cabecera) return null;
	cabecera.id = "cabeceraAbmMotivoEgresoIngresoJuan";
	listadoAbmMotivoEgresoIngresoJuan = window.AbmListadoCore.crear({
		nombre: "motivo_egreso_ingreso_juan",
		idCabecera: "cabeceraAbmMotivoEgresoIngresoJuan",
		idCuerpo: "divBuscadorMotivoEgresoIngresoJuan",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmMotivoEgresoIngresoJuan",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmMotivoEgresoIngresoJuan.iniciar();
	return listadoAbmMotivoEgresoIngresoJuan;
}

function renderizarCatalogoMotivoEgresoIngresoJuan(idContenedor, registros) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	if (!Array.isArray(registros)) return;
	registros.forEach(function (registro) {
		var opcion = document.createElement("option");
		opcion.value = registro.descripcion || "";
		opcion.textContent = registro.descripcion || "";
		opcion.setAttribute("data-codigo", registro.codigo || "");
		opcion.id = registro.codigo || "";
		contenedor.appendChild(opcion);
	});
}
function
verCerrarAbmNuevoMotivoEgresoIngresoJuan(){
	if(controlacceso("CREARNUEVOMOTIVOEGRESOINGRESOJUAN","accion")==false){return;}
	if(document.getElementById("divAbmNuevoMotivoEgresoIngresoJuan").style.display==""){
		
		$("div[id=divAbmNuevoMotivoEgresoIngresoJuan]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divAbmNuevoMotivoEgresoIngresoJuan").style.display=""
BuscarAbmMotivoEgresoIngresoJuan()
	}
}
function VerificarDatosMotivoEgresoIngresoJuan() {
	var inptNuevoMotivo = document.getElementById('inptNuevoMotivoEgresoIngresoJuan').value
	var inptEstadoMotivoEgresoIngresoJuan = document.getElementById('inptEstadoMotivoEgresoIngresoJuan').value
	
	if (inptNuevoMotivo == "") {
		ver_vetana_informativa("FALTO AGREGAR NUEVO MOTIVO")
		return false;
	}	


	if(idAbmMotivoEgresoIngresoJuan != ''){
		accion = "editarMotivo";
	}else{
		accion = "NuevoMotivo";
	}
		
	
	abmNuevoMotivoEgresoIngresoJuan(inptNuevoMotivo,inptEstadoMotivoEgresoIngresoJuan, accion);
}
function abmNuevoMotivoEgresoIngresoJuan(motivo, estado , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("motivo", motivo)
	datos.append("estado", estado)
	datos.append("idabm", idAbmMotivoEgresoIngresoJuan)


	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresojuan.php",
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
					
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscaroptionMotivoEgresoIngresoJuan()
					// verCerrarAbmNuevoMotivo()
					BuscarAbmMotivoEgresoIngresoJuan()
					limpiarcamposmotivoegresoingresojuan()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscaroptionMotivoEgresoIngresoJuan() {

	document.getElementById("ListMotivoMisEgresoIngresoJuan").innerHTML = ""
	document.getElementById("listBuscarEgresoIngresoJuan3").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresojuan.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("ListMotivoMisEgresoIngresoJuan").innerHTML = ''
			document.getElementById("listBuscarEgresoIngresoJuan3").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("ListMotivoMisEgresoIngresoJuan").innerHTML = ''
			document.getElementById("listBuscarEgresoIngresoJuan3").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = Array.isArray(datos[2]) ? datos[2] : [];
					renderizarCatalogoMotivoEgresoIngresoJuan("ListMotivoMisEgresoIngresoJuan", datos_buscados)
					renderizarCatalogoMotivoEgresoIngresoJuan("listBuscarEgresoIngresoJuan3", datos_buscados)

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function BuscarAbmMotivoEgresoIngresoJuan() {
	var listado = iniciarListadoAbmMotivoEgresoIngresoJuan()
	var buscador = document.getElementById("inptBuscarAbmMotivoEgresoIngresoJuan").value
	var estado = "Activo"
	document.getElementById("divBuscadorMotivoEgresoIngresoJuan").innerHTML = paginacargando
    document.getElementById("lblNroRegistroMotivoEgresoIngresoJuan").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "buscarabmmotivoingresoegreso"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresojuan.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorMotivoEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroMotivoEgresoIngresoJuan").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorMotivoEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroMotivoEgresoIngresoJuan").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
                   document.getElementById("lblNroRegistroMotivoEgresoIngresoJuan").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   buscaroptionMotivoEgresoIngresoJuan()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
		});
	}
	if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmMotivoEgresoIngresoJuan);
	else iniciarListadoAbmMotivoEgresoIngresoJuan();

var idAbmMotivoEgresoIngresoJuan = "";
function ObtenerdatosAbmMotivoEgresoIngresoJuan(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	ElementoSeleccMarca=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNuevoMotivoEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoMotivoEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_2"]').html();
	idAbmMotivoEgresoIngresoJuan= $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnMotivoIngresoEgresoJuan").value="Editar Datos"
}

function limpiarcamposmotivoegresoingresojuan(){
	  document.getElementById("inptNuevoMotivoEgresoIngresoJuan").value = ''
    document.getElementById("inptEstadoMotivoEgresoIngresoJuan").value = 'Activo'
	idAbmMotivoEgresoIngresoJuan=''
     document.getElementById("btnMotivoIngresoEgresoJuan").value="Guardar"
}

