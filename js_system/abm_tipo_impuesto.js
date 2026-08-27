/*
ABM TIPO IMPUESTO
*/
var idAbmTipoImpuesto="";
var ElementoSeleccTipoImpuesto="";
var VentanaTipoImpuesto="";
var listadoAbmTipoImpuesto=null;
function iniciarListadoAbmTipoImpuesto(){
	if(listadoAbmTipoImpuesto || !window.AbmListadoCore){return listadoAbmTipoImpuesto;}
	var cuerpo=document.getElementById("divBuscadorTipoImpuesto");
	if(!cuerpo){return null;}
	var tabla=cuerpo.previousElementSibling;
	var cabecera=tabla && tabla.tagName==="TABLE" ? tabla.querySelector("tr") : null;
	if(!cabecera){return null;}
	cabecera.id="cabeceraAbmTipoImpuesto";
	listadoAbmTipoImpuesto=window.AbmListadoCore.crear({
		nombre:"tipo_impuesto",
		idCabecera:"cabeceraAbmTipoImpuesto",
		idCuerpo:"divBuscadorTipoImpuesto",
		ordenInicial:"descripcion",
		columnas:[
			{campo:"descripcion",titulo:"DESCRIPCION",ancho:"50%"},
			{campo:"porcentaje",titulo:"PORCENTAJE",ancho:"50%"}
		],
		fila:{
			funcionSeleccion:"ObtenerdatosAbmTipoImpuesto",
			celdas:[
				{id:"td_id",campo:"codigo",tecnica:true},
				{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
				{id:"td_datos_3",campo:"porcentaje",columna:"porcentaje",className:"tdRegistroSearch"},
				{id:"td_datos_2",campo:"estado",tecnica:true}
			]
		}
	});
	listadoAbmTipoImpuesto.iniciar();
	return listadoAbmTipoImpuesto;
}
function verCerrarFrmTipoImpuesto(d,v){
	if(d=="1"){
		$("div[id=divAbmTipoImpuesto]").fadeIn(500);
		VentanaTipoImpuesto=v;
		BuscarAbmTipoImpuesto()
	}else{
		$("div[id=divAbmTipoImpuesto]").fadeOut(500);
	}
}
function LimpiarCamposTipoImpuesto(){
	document.getElementById("inptNombreTipoImpuesto").value="";
	document.getElementById("inptEstadoTipoImpuesto").value="";
	document.getElementById("inptPorcentajeTipoImpuesto").value="";
	document.getElementById("btnTipoImpuesto1").value="Guardar Datos"
	idAbmTipoImpuesto="";
	ElementoSeleccTipoImpuesto="";
}
function ObtenerdatosAbmTipoImpuesto(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccTipoImpuesto=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreTipoImpuesto").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoTipoImpuesto").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptPorcentajeTipoImpuesto").value = $(datostr).children('td[id="td_datos_3"]').html();
	idAbmTipoImpuesto = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnTipoImpuesto1").value="Editar Datos"
}
function SeleccionarRegistroTipoImpuesto(){
	if(ElementoSeleccTipoImpuesto==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    if(VentanaTipoImpuesto=="abmproducto"){
	 document.getElementById("inptTipoImpuestoProducto").value = $(ElementoSeleccTipoImpuesto).children('td[id="td_datos_1"]').html();
	 idFkProductoTipoImpuesto = $(ElementoSeleccTipoImpuesto).children('td[id="td_id"]').html();
	}	
	 document.getElementById("divAbmTipoImpuesto").style.display="none";
		 LimpiarCamposTipoImpuesto()
}
function VerificarDatosTipoImpuesto(){
	var inptNombreTipoImpuesto = document.getElementById("inptNombreTipoImpuesto").value
	var inptEstadoTipoImpuesto = document.getElementById("inptEstadoTipoImpuesto").value
	var inptPorcentajeTipoImpuesto = document.getElementById("inptPorcentajeTipoImpuesto").value
	if(inptNombreTipoImpuesto==""){
		document.getElementById("inptNombreTipoImpuesto").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptPorcentajeTipoImpuesto==""){
		document.getElementById("inptPorcentajeTipoImpuesto").focus()
		ver_vetana_informativa("Falto ingresar el porcentaje")
		return
	}
	if(inptEstadoTipoImpuesto==""){
		document.getElementById("inptEstadoTipoImpuesto").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmTipoImpuesto != "") {
		
		accion = "editar";
	} else {
		
		accion = "nuevo";
	}
	AbmTipoImpuesto(inptNombreTipoImpuesto,inptEstadoTipoImpuesto,inptPorcentajeTipoImpuesto,idAbmTipoImpuesto,accion)
}
function AbmTipoImpuesto(descripcion,Estado,monto_impuesto,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("monto_impuesto", monto_impuesto)
	datos.append("Estado", Estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMTipoImpuesto.php",
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
					LimpiarCamposTipoImpuesto()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmTipoImpuesto()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmTipoImpuesto() {
	var listado=iniciarListadoAbmTipoImpuesto();
	var buscador = ""
	var estado = "Activo"
	document.getElementById("divBuscadorTipoImpuesto").innerHTML = paginacargando
    document.getElementById("lblNroRegistroTipoImpuesto").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/ABMTipoImpuesto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorTipoImpuesto").innerHTML = ''
			document.getElementById("lblNroRegistroTipoImpuesto").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorTipoImpuesto").innerHTML = ''
			document.getElementById("lblNroRegistroTipoImpuesto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
				document.getElementById("lblNroRegistroTipoImpuesto").innerHTML="Se encontraron "+datos[3]+" registro(s)";

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if(document.readyState==="loading"){
	document.addEventListener("DOMContentLoaded",iniciarListadoAbmTipoImpuesto);
}else{
	iniciarListadoAbmTipoImpuesto();
}
