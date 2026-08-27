/*
ABM DESCRIPCION ARREGLO INGRESO EGRESO ADMINI
STRATIVO
*/
var idAbmDescripcionArregloEgresoIngresoAdministrativo="";
var ElementoSeleccDescripcionArregloEgresoIngresoAdministrativo="";
var listadoAbmDescripcionArregloEgresoIngresoAdministrativo=null;
function iniciarListadoAbmDescripcionArregloEgresoIngresoAdministrativo(){
	if(listadoAbmDescripcionArregloEgresoIngresoAdministrativo || !window.AbmListadoCore) return listadoAbmDescripcionArregloEgresoIngresoAdministrativo;
	var cuerpo=document.getElementById("divBuscadorDescripcionArregloEgresoIngresoAdministrativo");
	if(!cuerpo) return null;
	var tablaCabecera=cuerpo.previousElementSibling;
	while(tablaCabecera && tablaCabecera.tagName!=="TABLE") tablaCabecera=tablaCabecera.previousElementSibling;
	var cabecera=tablaCabecera ? tablaCabecera.querySelector("tr") : null;
	if(!cabecera) return null;
	cabecera.id="cabeceraAbmDescripcionArregloEgresoIngresoAdministrativo";
	listadoAbmDescripcionArregloEgresoIngresoAdministrativo=window.AbmListadoCore.crear({
		nombre:"descripcion_arreglo_egreso_ingreso_administrativo",
		idCabecera:"cabeceraAbmDescripcionArregloEgresoIngresoAdministrativo",
		idCuerpo:"divBuscadorDescripcionArregloEgresoIngresoAdministrativo",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{funcionSeleccion:"ObtenerdatosAbmDescripcionArregloEgresoIngresoAdministrativo",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
			{id:"td_datos_2",campo:"estado",tecnica:true}
		]}
	});
	listadoAbmDescripcionArregloEgresoIngresoAdministrativo.iniciar();
	return listadoAbmDescripcionArregloEgresoIngresoAdministrativo;
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmDescripcionArregloEgresoIngresoAdministrativo);
else iniciarListadoAbmDescripcionArregloEgresoIngresoAdministrativo();
function verCerrarFrmDescripcionArregloEgresoIngresoAdministrativo(d){
	if(d=="1"){
		if(controlacceso("CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
		$("div[id=divAbmDescripcionArregloEgresoIngresoAdministrativo]").fadeIn(500);
		// BuscarAbmDescripcionArregloGastoEgresoIngresoAdministrativo()
	}else{
		$("div[id=divAbmDescripcionArregloEgresoIngresoAdministrativo]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionArregloEgresoIngresoAdministrativo(){
	document.getElementById("inptNombreDescripcionArregloEgresoIngresoAdministrativo").value="";
	document.getElementById("inptEstadoDescripcionArregloEgresoIngresoAdministrativo").value="";
	document.getElementById("btnDescripcionArregloEgresoIngresoAdministrativo1").value="Guardar Datos"
	idAbmDescripcionArregloEgresoIngresoAdministrativo="";
	ElementoSeleccDescripcionArregloEgresoIngresoAdministrativo="";
}
function ObtenerdatosAbmDescripcionArregloEgresoIngresoAdministrativo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionArregloEgresoIngresoAdministrativo=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionArregloEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionArregloEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionArregloEgresoIngresoAdministrativo = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionArregloEgresoIngresoAdministrativo1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionArregloEgresoIngresoAdministrativo(){
	if(ElementoSeleccDescripcionArregloEgresoIngresoAdministrativo==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionArregloEgresoIngresoAdministrativo").style.display="none";
	 document.getElementById("inptArregloEgresoIngresoAdministrativo").value = $(ElementoSeleccDescripcionArregloEgresoIngresoAdministrativo).children('td[id="td_datos_1"]').html();
	 LimpiarCamposDescripcionArregloEgresoIngresoAdministrativo()
}
function VerificarDatosDescripcionArregloEgresoIngresoAdministrativo(){
	var inptNombreDescripcionArregloEgresoIngresoAdministrativo = document.getElementById("inptNombreDescripcionArregloEgresoIngresoAdministrativo").value
	var inptEstadoDescripcionArregloEgresoIngresoAdministrativo = document.getElementById("inptEstadoDescripcionArregloEgresoIngresoAdministrativo").value	
	if(inptNombreDescripcionArregloEgresoIngresoAdministrativo==""){
		document.getElementById("inptNombreDescripcionArregloEgresoIngresoAdministrativo").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionArregloEgresoIngresoAdministrativo==""){
		document.getElementById("inptEstadoDescripcionArregloEgresoIngresoAdministrativo").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionArregloEgresoIngresoAdministrativo != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionArregloEgresoIngresoAdministrativo(inptNombreDescripcionArregloEgresoIngresoAdministrativo,inptEstadoDescripcionArregloEgresoIngresoAdministrativo,idAbmDescripcionArregloEgresoIngresoAdministrativo,accion)
}
function AbmDescripcionArregloEgresoIngresoAdministrativo(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloEgresoIngresoAdministrativo.php",
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
				LimpiarCamposDescripcionArregloEgresoIngresoAdministrativo()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionArregloEgresoIngresoAdministrativo()
				BuscarSelecDescripcionArregloEgresoIngresoAdministrativo()
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
function BuscarAbmDescripcionArregloEgresoIngresoAdministrativo() {
	var listado=iniciarListadoAbmDescripcionArregloEgresoIngresoAdministrativo();
	var buscador = document.getElementById("inptBuscarAbmDescripcionArregloEgresoIngresoAdministrativo").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionArregloEgresoIngresoAdministrativo").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionArregloEgresoIngresoAdministrativo").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoAdministrativo").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloEgresoIngresoAdministrativo.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionArregloEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoAdministrativo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionArregloEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoAdministrativo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
                   document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoAdministrativo").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionArregloEgresoIngresoAdministrativo() {
	document.getElementById("inptArregloEgresoIngresoAdministrativo").innerHTML = ""
	document.getElementById("inptSeleccArregloBuscarEgresoIngresoAdministrativo").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloEgresoIngresoAdministrativo.php",
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
					document.getElementById("inptArregloEgresoIngresoAdministrativo").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
				document.getElementById("inptSeleccArregloBuscarEgresoIngresoAdministrativo").innerHTML ="<option value=''>TODOS</option>"+ datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

