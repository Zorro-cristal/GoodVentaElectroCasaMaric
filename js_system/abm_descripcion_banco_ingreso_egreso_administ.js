/*
ABM DESCRIPCION BANCO INGRESO EGRESO ADMINIST
RATIVO
*/
var idAbmDescripcionBancoEgresoIngresoAdministrativo="";
var ElementoSeleccDescripcionBancoEgresoIngresoAdministrativo="";
var listadoAbmDescripcionBancoEgresoIngresoAdministrativo=null;
function iniciarListadoAbmDescripcionBancoEgresoIngresoAdministrativo(){
	if(listadoAbmDescripcionBancoEgresoIngresoAdministrativo || !window.AbmListadoCore) return listadoAbmDescripcionBancoEgresoIngresoAdministrativo;
	var cuerpo=document.getElementById("divBuscadorDescripcionBancoEgresoIngresoAdministrativo");
	if(!cuerpo) return null;
	var tablaCabecera=cuerpo.previousElementSibling;
	while(tablaCabecera && tablaCabecera.tagName!=="TABLE") tablaCabecera=tablaCabecera.previousElementSibling;
	var cabecera=tablaCabecera ? tablaCabecera.querySelector("tr") : null;
	if(!cabecera) return null;
	cabecera.id="cabeceraAbmDescripcionBancoEgresoIngresoAdministrativo";
	listadoAbmDescripcionBancoEgresoIngresoAdministrativo=window.AbmListadoCore.crear({
		nombre:"descripcion_banco_egreso_ingreso_administrativo",
		idCabecera:"cabeceraAbmDescripcionBancoEgresoIngresoAdministrativo",
		idCuerpo:"divBuscadorDescripcionBancoEgresoIngresoAdministrativo",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{funcionSeleccion:"ObtenerdatosAbmDescripcionBancoEgresoIngresoAdministrativo",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
			{id:"td_datos_2",campo:"estado",tecnica:true}
		]}
	});
	listadoAbmDescripcionBancoEgresoIngresoAdministrativo.iniciar();
	return listadoAbmDescripcionBancoEgresoIngresoAdministrativo;
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmDescripcionBancoEgresoIngresoAdministrativo);
else iniciarListadoAbmDescripcionBancoEgresoIngresoAdministrativo();
function verCerrarFrmDescripcionBancoEgresoIngresoAdministrativo(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVADESCRIPCIONBANCOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
		$("div[id=divAbmDescripcionBancoEgresoIngresoAdministrativo]").fadeIn(500);
		BuscarAbmDescripcionBancoEgresoIngresoAdministrativo()
	}else{
		$("div[id=divAbmDescripcionBancoEgresoIngresoAdministrativo]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionBancoEgresoIngresoAdministrativo(){
	document.getElementById("inptNombreDescripcionBancoEgresoIngresoAdministrativo").value="";
	document.getElementById("inptEstadoDescripcionBancoEgresoIngresoAdministrativo").value="";
	document.getElementById("btnDescripcionBancoEgresoIngresoAdministrativo1").value="Guardar Datos"
	idAbmDescripcionBancoEgresoIngresoAdministrativo="";
	ElementoSeleccDescripcionBancoEgresoIngresoAdministrativo="";
}
function ObtenerdatosAbmDescripcionBancoEgresoIngresoAdministrativo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionBancoEgresoIngresoAdministrativo=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionBancoEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionBancoEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionBancoEgresoIngresoAdministrativo = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionBancoEgresoIngresoAdministrativo1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionBancoEgresoIngresoAdministrativo(){
	if(ElementoSeleccDescripcionBancoEgresoIngresoAdministrativo==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionBancoEgresoIngresoAdministrativo").style.display="none";
	 document.getElementById("inptBancoEgresoIngresoAdministrativo").value = idAbmDescripcionBancoEgresoIngresoAdministrativo
	 LimpiarCamposDescripcionBancoEgresoIngresoAdministrativo()
}
function VerificarDatosDescripcionBancoEgresoIngresoAdministrativo(){
	var inptNombreDescripcionBancoEgresoIngresoAdministrativo = document.getElementById("inptNombreDescripcionBancoEgresoIngresoAdministrativo").value
	var inptEstadoDescripcionBancoEgresoIngresoAdministrativo = document.getElementById("inptEstadoDescripcionBancoEgresoIngresoAdministrativo").value	
	if(inptNombreDescripcionBancoEgresoIngresoAdministrativo==""){
		document.getElementById("inptNombreDescripcionBancoEgresoIngresoAdministrativo").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionBancoEgresoIngresoAdministrativo==""){
		document.getElementById("inptEstadoDescripcionBancoEgresoIngresoAdministrativo").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionBancoEgresoIngresoAdministrativo != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionBancoEgresoIngresoAdministrativo(inptNombreDescripcionBancoEgresoIngresoAdministrativo,inptEstadoDescripcionBancoEgresoIngresoAdministrativo,idAbmDescripcionBancoEgresoIngresoAdministrativo,accion)
}
function AbmDescripcionBancoEgresoIngresoAdministrativo(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoEgresoIngresoAdministrativo.php",
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
				LimpiarCamposDescripcionBancoEgresoIngresoAdministrativo()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionBancoEgresoIngresoAdministrativo()
				BuscarSelecDescripcionBancoEgresoIngresoAdministrativo()
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
function BuscarAbmDescripcionBancoEgresoIngresoAdministrativo() {
	var listado=iniciarListadoAbmDescripcionBancoEgresoIngresoAdministrativo();
	var buscador = document.getElementById("inptBuscarAbmDescripcionBancoEgresoIngresoAdministrativo").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionBancoEgresoIngresoAdministrativo").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionBancoEgresoIngresoAdministrativo").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoAdministrativo").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoEgresoIngresoAdministrativo.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionBancoEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoAdministrativo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionBancoEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoAdministrativo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
                   document.getElementById("lblNroRegistroDescripcionBancoEgresoIngresoAdministrativo").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionBancoEgresoIngresoAdministrativo() {
	document.getElementById("inptBancoEgresoIngresoAdministrativo").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoEgresoIngresoAdministrativo.php",
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
					document.getElementById("inptBancoEgresoIngresoAdministrativo").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


