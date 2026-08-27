/* ABM MOTIVO EN EGRESO/INGRESO ADMINISTRATIVO */
var listadoAbmMotivoEgresoIngresoAdministrativo = null;
function iniciarListadoAbmMotivoEgresoIngresoAdministrativo() {
	if (listadoAbmMotivoEgresoIngresoAdministrativo || !window.AbmListadoCore) return listadoAbmMotivoEgresoIngresoAdministrativo;
	var cuerpo = document.getElementById("divBuscadorMotivoEgresoIngresoAdministrativo");
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && cabecera.tagName !== "TABLE") cabecera = cabecera.previousElementSibling;
	if (!cabecera) return null;
	cabecera.id = "cabeceraAbmMotivoEgresoIngresoAdministrativo";
	listadoAbmMotivoEgresoIngresoAdministrativo = window.AbmListadoCore.crear({
		nombre: "motivo_egreso_ingreso_administrativo",
		idCabecera: "cabeceraAbmMotivoEgresoIngresoAdministrativo",
		idCuerpo: "divBuscadorMotivoEgresoIngresoAdministrativo",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmMotivoEgresoIngresoAdministrativo",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmMotivoEgresoIngresoAdministrativo.iniciar();
	return listadoAbmMotivoEgresoIngresoAdministrativo;
}

function renderizarCatalogoMotivoEgresoIngresoAdministrativo(idContenedor, registros) {
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
function verCerrarAbmNuevoMotivoEgresoIngresoAdministrativo(){
	if(controlacceso("CREARNUEVOMOTIVOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}
	if(document.getElementById("divAbmNuevoMotivoEgresoIngresoAdministrativo").style.display==""){
		
		$("div[id=divAbmNuevoMotivoEgresoIngresoAdministrativo]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divAbmNuevoMotivoEgresoIngresoAdministrativo").style.display=""
BuscarAbmMotivoEgresoIngresoAdministrativo()
	}
}
function VerificarDatosMotivoEgresoIngresoAdministrativo() {
	var inptNuevoMotivo = document.getElementById('inptNuevoMotivoEgresoIngresoAdministrativo').value
	var inptEstadoMotivoEgresoIngresoAdministrativo = document.getElementById('inptEstadoMotivoEgresoIngresoAdministrativo').value
	
	if (inptNuevoMotivo == "") {
		ver_vetana_informativa("FALTO AGREGAR NUEVO MOTIVO")
		return false;
	}	


	if(idAbmMotivoEgresoIngresoAdministrativo != ''){
		accion = "editarMotivo";
	}else{
		accion = "NuevoMotivo";
	}
		
	
	abmNuevoMotivoEgresoIngresoAdministrativo(inptNuevoMotivo,inptEstadoMotivoEgresoIngresoAdministrativo, accion);
}
function abmNuevoMotivoEgresoIngresoAdministrativo(motivo, estado , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("motivo", motivo)
	datos.append("estado", estado)
	datos.append("idabm", idAbmMotivoEgresoIngresoAdministrativo)


	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresoadministrativo.php",
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
					buscaroptionMotivoEgresoIngresoAdministrativo()
					// verCerrarAbmNuevoMotivo()
					BuscarAbmMotivoEgresoIngresoAdministrativo()
					limpiarcamposmotivoegresoingresoadministrativo()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscaroptionMotivoEgresoIngresoAdministrativo() {

	document.getElementById("ListMotivoMisEgresoIngresoAdministrativo").innerHTML = ""
	document.getElementById("listBuscarEgresoIngresoAdministrativo3").innerHTML = ""

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
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresoadministrativo.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("ListMotivoMisEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("listBuscarEgresoIngresoAdministrativo3").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("ListMotivoMisEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("listBuscarEgresoIngresoAdministrativo3").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = Array.isArray(datos[2]) ? datos[2] : [];
					renderizarCatalogoMotivoEgresoIngresoAdministrativo("ListMotivoMisEgresoIngresoAdministrativo", datos_buscados)
					renderizarCatalogoMotivoEgresoIngresoAdministrativo("listBuscarEgresoIngresoAdministrativo3", datos_buscados)

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function BuscarAbmMotivoEgresoIngresoAdministrativo() {
	var listado = iniciarListadoAbmMotivoEgresoIngresoAdministrativo()
	var buscador = document.getElementById("inptBuscarAbmMotivoEgresoIngresoAdministrativo").value
	var estado = "Activo"
	document.getElementById("divBuscadorMotivoEgresoIngresoAdministrativo").innerHTML = paginacargando
    document.getElementById("lblNroRegistroMotivoEgresoIngresoAdministrativo").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresoadministrativo.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorMotivoEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroMotivoEgresoIngresoAdministrativo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorMotivoEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroMotivoEgresoIngresoAdministrativo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
                   document.getElementById("lblNroRegistroMotivoEgresoIngresoAdministrativo").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   buscaroptionMotivoEgresoIngresoAdministrativo()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
		});
	}
	if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmMotivoEgresoIngresoAdministrativo);
	else iniciarListadoAbmMotivoEgresoIngresoAdministrativo();

var idAbmMotivoEgresoIngresoAdministrativo = "";
function ObtenerdatosAbmMotivoEgresoIngresoAdministrativo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	ElementoSeleccMarca=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNuevoMotivoEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoMotivoEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_2"]').html();
	idAbmMotivoEgresoIngresoAdministrativo= $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnMotivoIngresoEgresoAdministrativo").value="Editar Datos"
}

function limpiarcamposmotivoegresoingresoadministrativo(){
	  document.getElementById("inptNuevoMotivoEgresoIngresoAdministrativo").value = ''
    document.getElementById("inptEstadoMotivoEgresoIngresoAdministrativo").value = 'Activo'
	idAbmMotivoEgresoIngresoAdministrativo=''
     document.getElementById("btnMotivoIngresoEgresoAdministrativo").value="Guardar"
}

