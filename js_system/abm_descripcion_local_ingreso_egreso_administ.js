/*
ABM DESCRIPCION LOCAL INGRESO EGRESO ADMINIST
RATIVO
*/
var idAbmDescripcionLocalEgresoIngresoAdministrativo="";
var ElementoSeleccDescripcionLocalEgresoIngresoAdministrativo="";
var listadoAbmDescripcionLocalEgresoIngresoAdministrativo=null;
function iniciarListadoAbmDescripcionLocalEgresoIngresoAdministrativo(){
	if(listadoAbmDescripcionLocalEgresoIngresoAdministrativo || !window.AbmListadoCore) return listadoAbmDescripcionLocalEgresoIngresoAdministrativo;
	var cuerpo=document.getElementById("divBuscadorDescripcionLocalEgresoIngresoAdministrativo");
	if(!cuerpo) return null;
	var tablaCabecera=cuerpo.previousElementSibling;
	while(tablaCabecera && tablaCabecera.tagName!=="TABLE") tablaCabecera=tablaCabecera.previousElementSibling;
	var cabecera=tablaCabecera ? tablaCabecera.querySelector("tr") : null;
	if(!cabecera) return null;
	cabecera.id="cabeceraAbmDescripcionLocalEgresoIngresoAdministrativo";
	listadoAbmDescripcionLocalEgresoIngresoAdministrativo=window.AbmListadoCore.crear({
		nombre:"descripcion_local_egreso_ingreso_administrativo",
		idCabecera:"cabeceraAbmDescripcionLocalEgresoIngresoAdministrativo",
		idCuerpo:"divBuscadorDescripcionLocalEgresoIngresoAdministrativo",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{funcionSeleccion:"ObtenerdatosAbmDescripcionLocalEgresoIngresoAdministrativo",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
			{id:"td_datos_2",campo:"estado",tecnica:true}
		]}
	});
	listadoAbmDescripcionLocalEgresoIngresoAdministrativo.iniciar();
	return listadoAbmDescripcionLocalEgresoIngresoAdministrativo;
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmDescripcionLocalEgresoIngresoAdministrativo);
else iniciarListadoAbmDescripcionLocalEgresoIngresoAdministrativo();
function verCerrarFrmDescripcionLocalEgresoIngresoAdministrativo(d){
	if(d=="1"){
		if(controlacceso("CREARNUEVADESCRIPCIONLOCALEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
		$("div[id=divAbmDescripcionLocalEgresoIngresoAdministrativo]").fadeIn(500);
		BuscarAbmDescripcionLocalEgresoIngresoAdministrativo()
	}else{
		$("div[id=divAbmDescripcionLocalEgresoIngresoAdministrativo]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionLocalEgresoIngresoAdministrativo(){
	document.getElementById("inptNombreDescripcionLocalEgresoIngresoAdministrativo").value="";
	document.getElementById("inptEstadoDescripcionLocalEgresoIngresoAdministrativo").value="";
	document.getElementById("btnDescripcionLocalEgresoIngresoAdministrativo1").value="Guardar Datos"
	idAbmDescripcionLocalEgresoIngresoAdministrativo="";
	ElementoSeleccDescripcionLocalEgresoIngresoAdministrativo="";
}
function ObtenerdatosAbmDescripcionLocalEgresoIngresoAdministrativo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionLocalEgresoIngresoAdministrativo=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionLocalEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionLocalEgresoIngresoAdministrativo").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionLocalEgresoIngresoAdministrativo = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionLocalEgresoIngresoAdministrativo1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionLocalEgresoIngresoAdministrativo(){
	if(ElementoSeleccDescripcionLocalEgresoIngresoAdministrativo==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionLocalEgresoIngresoAdministrativo").style.display="none";
	 document.getElementById("inptlocalMisEgresoIngresoAdministrativo").value = idAbmDescripcionLocalEgresoIngresoAdministrativo
	 LimpiarCamposDescripcionLocalEgresoIngresoAdministrativo()
}
function VerificarDatosDescripcionLocalEgresoIngresoAdministrativo(){
	var inptNombreDescripcionLocalEgresoIngresoAdministrativo = document.getElementById("inptNombreDescripcionLocalEgresoIngresoAdministrativo").value
	var inptEstadoDescripcionLocalEgresoIngresoAdministrativo = document.getElementById("inptEstadoDescripcionLocalEgresoIngresoAdministrativo").value	
	if(inptNombreDescripcionLocalEgresoIngresoAdministrativo==""){
		document.getElementById("inptNombreDescripcionLocalEgresoIngresoAdministrativo").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionLocalEgresoIngresoAdministrativo==""){
		document.getElementById("inptEstadoDescripcionLocalEgresoIngresoAdministrativo").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionLocalEgresoIngresoAdministrativo != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionLocalEgresoIngresoAdministrativo(inptNombreDescripcionLocalEgresoIngresoAdministrativo,inptEstadoDescripcionLocalEgresoIngresoAdministrativo,idAbmDescripcionLocalEgresoIngresoAdministrativo,accion)
}
function AbmDescripcionLocalEgresoIngresoAdministrativo(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionLocalEgresoIngresoAdministrativo.php",
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
				LimpiarCamposDescripcionLocalEgresoIngresoAdministrativo()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionLocalEgresoIngresoAdministrativo()
				BuscarSelecDescripcionLocalEgresoIngresoAdministrativo()
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
function BuscarAbmDescripcionLocalEgresoIngresoAdministrativo() {
	var listado=iniciarListadoAbmDescripcionLocalEgresoIngresoAdministrativo();
	var buscador = document.getElementById("inptBuscarAbmDescripcionLocalEgresoIngresoAdministrativo").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionLocalEgresoIngresoAdministrativo").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionLocalEgresoIngresoAdministrativo").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoAdministrativo").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionLocalEgresoIngresoAdministrativo.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionLocalEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoAdministrativo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionLocalEgresoIngresoAdministrativo").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoAdministrativo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
                   document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoAdministrativo").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionLocalEgresoIngresoAdministrativo() {
	document.getElementById("inptlocalMisEgresoIngresoAdministrativo").innerHTML = ""
	document.getElementById("inptlocalMisEgresoIngresoAdministrativoBusca").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionLocalEgresoIngresoAdministrativo.php",
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
					document.getElementById("inptlocalMisEgresoIngresoAdministrativo").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
				document.getElementById("inptlocalMisEgresoIngresoAdministrativoBusca").innerHTML ="<option value=''>TODOS</option>"+ datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


