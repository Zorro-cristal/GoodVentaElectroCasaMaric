/*
ABM DESCRIPCION ARREGLO INGRESO EGRESO JUAN
*/
var idAbmDescripcionArregloEgresoIngresoJuan="";
var ElementoSeleccDescripcionArregloEgresoIngresoJuan="";
var listadoAbmDescripcionArregloEgresoIngresoJuan=null;
function iniciarListadoAbmDescripcionArregloEgresoIngresoJuan(){
	if(listadoAbmDescripcionArregloEgresoIngresoJuan || !window.AbmListadoCore) return listadoAbmDescripcionArregloEgresoIngresoJuan;
	var cuerpo=document.getElementById("divBuscadorDescripcionArregloEgresoIngresoJuan");
	if(!cuerpo) return null;
	var tablaCabecera=cuerpo.previousElementSibling;
	while(tablaCabecera && tablaCabecera.tagName!=="TABLE") tablaCabecera=tablaCabecera.previousElementSibling;
	var cabecera=tablaCabecera ? tablaCabecera.querySelector("tr") : null;
	if(!cabecera) return null;
	cabecera.id="cabeceraAbmDescripcionArregloEgresoIngresoJuan";
	listadoAbmDescripcionArregloEgresoIngresoJuan=window.AbmListadoCore.crear({
		nombre:"descripcion_arreglo_egreso_ingreso_juan",
		idCabecera:"cabeceraAbmDescripcionArregloEgresoIngresoJuan",
		idCuerpo:"divBuscadorDescripcionArregloEgresoIngresoJuan",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{funcionSeleccion:"ObtenerdatosAbmDescripcionArregloEgresoIngresoJuan",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
			{id:"td_datos_2",campo:"estado",tecnica:true}
		]}
	});
	listadoAbmDescripcionArregloEgresoIngresoJuan.iniciar();
	return listadoAbmDescripcionArregloEgresoIngresoJuan;
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmDescripcionArregloEgresoIngresoJuan);
else iniciarListadoAbmDescripcionArregloEgresoIngresoJuan();
function verCerrarFrmDescripcionArregloEgresoIngresoJuan(d){
	if(d=="1"){
		if(controlacceso("CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESOJUAN","accion")==false){return;}	
		$("div[id=divAbmDescripcionArregloEgresoIngresoJuan]").fadeIn(500);
		// BuscarAbmDescripcionArregloGastoEgresoIngresoJuan()
	}else{
		$("div[id=divAbmDescripcionArregloEgresoIngresoJuan]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionArregloEgresoIngresoJuan(){
	document.getElementById("inptNombreDescripcionArregloEgresoIngresoJuan").value="";
	document.getElementById("inptEstadoDescripcionArregloEgresoIngresoJuan").value="";
	document.getElementById("btnDescripcionArregloEgresoIngresoJuan1").value="Guardar Datos"
	idAbmDescripcionArregloEgresoIngresoJuan="";
	ElementoSeleccDescripcionArregloEgresoIngresoJuan="";
}
function ObtenerdatosAbmDescripcionArregloEgresoIngresoJuan(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionArregloEgresoIngresoJuan=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionArregloEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionArregloEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionArregloEgresoIngresoJuan = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionArregloEgresoIngresoJuan1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionArregloEgresoIngresoJuan(){
	if(ElementoSeleccDescripcionArregloEgresoIngresoJuan==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionArregloEgresoIngresoJuan").style.display="none";
	 LimpiarCamposDescripcionArregloEgresoIngresoJuan()
}
function VerificarDatosDescripcionArregloEgresoIngresoJuan(){
	var inptNombreDescripcionArregloEgresoIngresoJuan = document.getElementById("inptNombreDescripcionArregloEgresoIngresoJuan").value
	var inptEstadoDescripcionArregloEgresoIngresoJuan = document.getElementById("inptEstadoDescripcionArregloEgresoIngresoJuan").value	
	if(inptNombreDescripcionArregloEgresoIngresoJuan==""){
		document.getElementById("inptNombreDescripcionArregloEgresoIngresoJuan").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionArregloEgresoIngresoJuan==""){
		document.getElementById("inptEstadoDescripcionArregloEgresoIngresoJuan").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionArregloEgresoIngresoJuan != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionArregloEgresoIngresoJuan(inptNombreDescripcionArregloEgresoIngresoJuan,inptEstadoDescripcionArregloEgresoIngresoJuan,idAbmDescripcionArregloEgresoIngresoJuan,accion)
}
function AbmDescripcionArregloEgresoIngresoJuan(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloEgresoIngresoJuan.php",
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
				LimpiarCamposDescripcionArregloEgresoIngresoJuan()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionArregloEgresoIngresoJuan()
				BuscarSelecDescripcionArregloEgresoIngresoJuan()
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
function BuscarAbmDescripcionArregloEgresoIngresoJuan() {
	var listado=iniciarListadoAbmDescripcionArregloEgresoIngresoJuan();
	var buscador = document.getElementById("inptBuscarAbmDescripcionArregloEgresoIngresoJuan").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionArregloEgresoIngresoJuan").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionArregloEgresoIngresoJuan").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoJuan").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloEgresoIngresoJuan.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionArregloEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoJuan").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionArregloEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoJuan").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
                   document.getElementById("lblNroRegistroDescripcionArregloEgresoIngresoJuan").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionArregloEgresoIngresoJuan() {
	document.getElementById("inptArregloEgresoIngresoJuan").innerHTML = ""
	document.getElementById("inptSeleccArregloBuscarEgresoIngresoJuan").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionArregloEgresoIngresoJuan.php",
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
					document.getElementById("inptArregloEgresoIngresoJuan").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
				document.getElementById("inptSeleccArregloBuscarEgresoIngresoJuan").innerHTML ="<option value=''>TODOS</option>"+ datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

