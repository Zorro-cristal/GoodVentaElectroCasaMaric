/*
ABM DESCRIPCION LOCAL INGRESO EGRESO JUAN
*/
var idAbmDescripcionLocalEgresoIngresoJuan="";
var ElementoSeleccDescripcionLocalEgresoIngresoJuan="";
var listadoAbmDescripcionLocalEgresoIngresoJuan=null;
function iniciarListadoAbmDescripcionLocalEgresoIngresoJuan(){
	if(listadoAbmDescripcionLocalEgresoIngresoJuan || !window.AbmListadoCore) return listadoAbmDescripcionLocalEgresoIngresoJuan;
	var cuerpo=document.getElementById("divBuscadorDescripcionLocalEgresoIngresoJuan");
	if(!cuerpo) return null;
	var tablaCabecera=cuerpo.previousElementSibling;
	while(tablaCabecera && tablaCabecera.tagName!=="TABLE") tablaCabecera=tablaCabecera.previousElementSibling;
	var cabecera=tablaCabecera ? tablaCabecera.querySelector("tr") : null;
	if(!cabecera) return null;
	cabecera.id="cabeceraAbmDescripcionLocalEgresoIngresoJuan";
	listadoAbmDescripcionLocalEgresoIngresoJuan=window.AbmListadoCore.crear({
		nombre:"descripcion_local_egreso_ingreso_juan",
		idCabecera:"cabeceraAbmDescripcionLocalEgresoIngresoJuan",
		idCuerpo:"divBuscadorDescripcionLocalEgresoIngresoJuan",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{funcionSeleccion:"ObtenerdatosAbmDescripcionLocalEgresoIngresoJuan",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
			{id:"td_datos_2",campo:"estado",tecnica:true}
		]}
	});
	listadoAbmDescripcionLocalEgresoIngresoJuan.iniciar();
	return listadoAbmDescripcionLocalEgresoIngresoJuan;
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmDescripcionLocalEgresoIngresoJuan);
else iniciarListadoAbmDescripcionLocalEgresoIngresoJuan();
function verCerrarFrmDescripcionLocalEgresoIngresoJuan(d){
	if(d=="1"){
		if(controlacceso("CREARNUEVADESCRIPCIONLOCALEGRESOINGRESOJUAN","accion")==false){return;}	
		$("div[id=divAbmDescripcionLocalEgresoIngresoJuan]").fadeIn(500);
		BuscarAbmDescripcionLocalEgresoIngresoJuan()
	}else{
		$("div[id=divAbmDescripcionLocalEgresoIngresoJuan]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionLocalEgresoIngresoJuan(){
	document.getElementById("inptNombreDescripcionLocalEgresoIngresoJuan").value="";
	document.getElementById("inptEstadoDescripcionLocalEgresoIngresoJuan").value="";
	document.getElementById("btnDescripcionLocalEgresoIngresoJuan1").value="Guardar Datos"
	idAbmDescripcionLocalEgresoIngresoJuan="";
	ElementoSeleccDescripcionLocalEgresoIngresoJuan="";
}
function ObtenerdatosAbmDescripcionLocalEgresoIngresoJuan(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionLocalEgresoIngresoJuan=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionLocalEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionLocalEgresoIngresoJuan").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionLocalEgresoIngresoJuan = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionLocalEgresoIngresoJuan1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionLocalEgresoIngresoJuan(){
	if(ElementoSeleccDescripcionLocalEgresoIngresoJuan==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionLocalEgresoIngresoJuan").style.display="none";
	 document.getElementById("inptlocalMisEgresoIngresoJuan").value = idAbmDescripcionLocalEgresoIngresoJuan
	 LimpiarCamposDescripcionLocalEgresoIngresoJuan()
}
function VerificarDatosDescripcionLocalEgresoIngresoJuan(){
	var inptNombreDescripcionLocalEgresoIngresoJuan = document.getElementById("inptNombreDescripcionLocalEgresoIngresoJuan").value
	var inptEstadoDescripcionLocalEgresoIngresoJuan = document.getElementById("inptEstadoDescripcionLocalEgresoIngresoJuan").value	
	if(inptNombreDescripcionLocalEgresoIngresoJuan==""){
		document.getElementById("inptNombreDescripcionLocalEgresoIngresoJuan").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionLocalEgresoIngresoJuan==""){
		document.getElementById("inptEstadoDescripcionLocalEgresoIngresoJuan").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionLocalEgresoIngresoJuan != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionLocalEgresoIngresoJuan(inptNombreDescripcionLocalEgresoIngresoJuan,inptEstadoDescripcionLocalEgresoIngresoJuan,idAbmDescripcionLocalEgresoIngresoJuan,accion)
}
function AbmDescripcionLocalEgresoIngresoJuan(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionLocalEgresoIngresoJuan.php",
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
				LimpiarCamposDescripcionLocalEgresoIngresoJuan()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionLocalEgresoIngresoJuan()
				BuscarSelecDescripcionLocalEgresoIngresoJuan()
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
function BuscarAbmDescripcionLocalEgresoIngresoJuan() {
	var listado=iniciarListadoAbmDescripcionLocalEgresoIngresoJuan();
	var buscador = document.getElementById("inptBuscarAbmDescripcionLocalEgresoIngresoJuan").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionLocalEgresoIngresoJuan").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionLocalEgresoIngresoJuan").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoJuan").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionLocalEgresoIngresoJuan.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionLocalEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoJuan").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionLocalEgresoIngresoJuan").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoJuan").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
                   document.getElementById("lblNroRegistroDescripcionLocalEgresoIngresoJuan").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionLocalEgresoIngresoJuan() {
	document.getElementById("inptlocalMisEgresoIngresoJuan").innerHTML = ""
	document.getElementById("inptlocalMisEgresoIngresoJuanBusca").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionLocalEgresoIngresoJuan.php",
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
					document.getElementById("inptlocalMisEgresoIngresoJuan").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
				document.getElementById("inptlocalMisEgresoIngresoJuanBusca").innerHTML ="<option value=''>TODOS</option>"+ datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


