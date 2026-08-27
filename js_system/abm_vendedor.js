/*
ABM VENDEDOR
*/
var listadoAbmVendedor = null;
function iniciarListadoAbmVendedor() {
	if (listadoAbmVendedor || !window.AbmListadoCore) { return listadoAbmVendedor; }
	var cuerpo = document.getElementById("table_abm_vendedor");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmVendedor";
	listadoAbmVendedor = window.AbmListadoCore.crear({
		nombre: "vendedor",
		idCabecera: "cabeceraAbmVendedor",
		idCuerpo: "table_abm_vendedor",
		ordenInicial: "vendedor",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "10%" },
			{ campo: "vendedor", titulo: "VENDEDOR", ancho: "25%" },
			{ campo: "telefono", titulo: "NRO TELEF.", ancho: "20%" },
			{ campo: "sector", titulo: "SECTOR", ancho: "20%" },
			{ campo: "local", titulo: "LOCAL", ancho: "25%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmVendedor",
			claseTabla: "tableRegistroSearch",
			border: "0",
			cellspacing: "0",
			cellpadding: "0",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "vendedor", columna: "vendedor" },
				{ id: "td_datos_2", campo: "telefono", columna: "telefono" },
				{ id: "td_datos_5", campo: "sector", columna: "sector" },
				{ id: "td_datos_4", campo: "local", columna: "local" },
				{ id: "td_datos_3", campo: "estado", tecnica: true },
				{ id: "td_datos_6", campo: "url_imagen", tecnica: true },
				{ id: "td_datos_7", campo: "codigo_local", tecnica: true },
				{ id: "td_datos_8", campo: "control_vendedor", tecnica: true },
				{ id: "td_datos_9", campo: "codigo_usuario", tecnica: true }
			]
		}
	});
	listadoAbmVendedor.iniciar();
	return listadoAbmVendedor;
}
function verCerrarAbmVendedor(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmVendedor").style.display==""){
		document.getElementById("divMinimizadoListadoVendedor").style.display="none"
		limpiarcamposbuscarvendedor()
		limpiarcamposVendedor()
 
	$("div[id=divAbmVendedor]").fadeOut(500);	
	}else{
if(controlacceso("VERLISTADOVENDEDORES","accion")==false){return;}	
mostrarSoloUno("divAbmVendedor")		
		document.getElementById("divAbmVendedor").style.display=""
 
	}
}
function limpiarcamposbuscarvendedor(){
	document.getElementById('inptBuscarAbmVendedor1').value=""
	document.getElementById('inptBuscarAbmVendedor2').value=""
	document.getElementById("table_abm_vendedor").innerHTML = ""
	document.getElementById("inptRegistroNroVendedor").value = ""
}
function minimizarabmvendedor(){
 
	$("div[id=divAbmVendedor]").fadeOut(500);
	document.getElementById("divMinimizadoListadoVendedor").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmVendedores"));
}
function verCerrarVentanaAbmVendedorVista(d) {
	if (d == "1") {
	   if(controlacceso("INSERTARLISTADOVENDEDORES","accion")==false){return;}		
		$("div[id=divAbmVendedorVista]").fadeIn(250)
		document.getElementById("inptNombreApellidoVendedorVista").value = ""
		document.getElementById("inptNroTelefVendedorVista").value = ""

	} else {
		$("div[id=divAbmVendedorVista]").fadeOut(250)
	}
}
function verificarcamposVendedorVista() {

	var inptNombreApellidoVendedor = document.getElementById('inptNombreApellidoVendedorVista').value
	var inptNroTelefVendedor = document.getElementById('inptNroTelefVendedorVista').value
	var inptEstadoVendedor = "Activo"


	if (inptNombreApellidoVendedor == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL VENDEDOR")
		return false;
	}



	var accion = "nuevo";

if(controlacceso("INSERTARVENDEDOR","accion")==false){
		
	//SIN PERMISO
	  return;
		}	
	abmvendedor(inptNombreApellidoVendedor, inptNroTelefVendedor, inptEstadoVendedor, idAbmVendedor, accion);
}
function verCerrarVentanaAbmVendedor(d, l) {
	
	
	if (d == "1") {
		
		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOVENDEDORES","accion")==false){return;}	
			limpiarcamposVendedor()
		}
		$("div[id=divAbmVendedor2]").fadeIn(250)
		document.getElementById('divAbmVendedor1').style.display = "none"
		
	} else {
		$("div[id=divAbmVendedor1]").fadeIn(250)
		document.getElementById('divAbmVendedor2').style.display = "none"
	}
}
function verVentanaEditarVendedor() {
	if(controlacceso("EDITARLISTADOVENDEDORES","accion")==false){return;}	
	if (idAbmVendedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmVendedor("1", "2")
}
var idAbmVendedor = ""
function obtenerdatosabmVendedor(datostr) {


	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});

	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreApellidoVendedor').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccVendedor').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNroTelefVendedor').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptAbmLocalVendedor').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptEstadoVendedor').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptSectorVendedor').value = $(datostr).children('td[id="td_datos_5"]').html();
	
	
	let control = $(datostr).children('td[id="td_datos_8"]').html();
	control = parseInt(control);
	if(control){
		document.getElementById('inptAbmControlVendedor').checked = true;
	}else{
		document.getElementById('inptAbmControlVendedor').checked = false;
	}
	
	
	document.getElementById('inptAbmUsuarioVendedor').value = $(datostr).children('td[id="td_datos_9"]').html();
	
	
	idAbmVendedor = $(datostr).children('td[id="td_id"]').html();
document.getElementById('btnAbmVendedor').value = "Editar datos";
document.getElementById('btnEditarVendedor').style.backgroundColor="";
document.getElementById('btnLocalVendedor').style.backgroundColor="";
cod_vendedorLocal=$(datostr).children('td[id="td_id"]').html();

	fotoperfilVendedor = $(datostr).children('td[id="td_datos_6"]').html();
	$("div[id=imgFotoPerfil1Vendedor]").css({ "background-image": "url(" + fotoperfilVendedor + ")" })
	


}


function abmVendedorLocales(d) {
	
	var idDV=d.id
	var accion=d.name
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("idAbmUsuario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "EditarDetalleVendedor")
	datos.append("idDV", idDV)	
	datos.append("accion", accion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
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
					
					if(accion=="SI"){
						d.name="NO"
					}else{
						d.name="SI"
					}
					
					buscarVendedorSelec()
					buscarVendedorSelecSolo()
					
					}			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}

///



function ExploradorImagenperfilVendedor(File){	
$("input[name=file_perfilVendedor]").click();
controlperfilVendedor=File;
}
var fotoperfilVendedor="";
var extperfilVendedor="";
var file_extensionperfilVendedor="";
function readFilePerfilVendedor(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extensionperfilVendedor=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extensionperfilVendedor=="jpeg") || (file_extensionperfilVendedor=="jpg") || (file_extensionperfilVendedor=="png") ){
}else{
ver_vetana_informativa("LA FOTO SELECCIONADO NO ES JPEG")
return false;
}
var reader = new FileReader();
reader.onload = function(e){
if(controlperfilVendedor=="perfilVendedor"){
	extperfilVendedor=file_extensionperfilVendedor;
	fotoperfilVendedor=e.target.result;
 $("div[id=imgFotoPerfil1Vendedor]").css({"background-image":"url("+fotoperfilVendedor+")"})

}

}
reader.readAsDataURL(input.files[0]);
}



//////


function verificarcamposVendedor() {

	var inptNombreApellidoVendedor = document.getElementById('inptNombreApellidoVendedor').value
	var inptNroTelefVendedor = document.getElementById('inptNroTelefVendedor').value
	var inptEstadoVendedor = document.getElementById('inptEstadoVendedor').value
	var inptAbmLocalVendedor = document.getElementById('inptAbmLocalVendedor').value
	var inptSectorVendedor = document.getElementById('inptSectorVendedor').value
	var inptAbmUsuarioVendedor = document.getElementById('inptAbmUsuarioVendedor').value
	var inptAbmControlVendedor = document.getElementById('inptAbmControlVendedor').checked
	
	let control = 0;
	if(inptAbmControlVendedor){
		control = 1;
	}


	if (inptNombreApellidoVendedor == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL VENDEDOR")
		return false;
	}

if (inptAbmLocalVendedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL LOCAL")
		return false;
	}
	
	if (inptAbmUsuarioVendedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN USUARIO")
		return false;
	}
	
	if(inptSectorVendedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL SECTOR")
		return false;
	}

if (inptEstadoVendedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}

	var accion = "";
	if (idAbmVendedor != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADOVENDEDORES","accion")==false){return;}	
	} else {
		if(controlacceso("INSERTARLISTADOVENDEDORES","accion")==false){return;}	
		accion = "nuevo";
	}
	abmvendedor(control,inptAbmUsuarioVendedor,inptSectorVendedor,inptAbmLocalVendedor,inptNombreApellidoVendedor, inptNroTelefVendedor, inptEstadoVendedor, idAbmVendedor, accion);
}
function abmvendedor(control,cod_usuarioFK,sector,cod_localfk,nombre, nrotelef, estado, idvendedor, accion) {

	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idvendedor", idvendedor)
	datos.append("nombre", nombre)
	datos.append("nrotelef", nrotelef)
	datos.append("estado", estado)
	datos.append("cod_localfk", cod_localfk)
	datos.append("sector", sector)
	datos.append("fotoperfilVendedor", fotoperfilVendedor)
	datos.append("extperfilVendedor", extperfilVendedor)
	datos.append("cod_usuarioFK", cod_usuarioFK)
	datos.append("control", control)
	var OpAjax = $.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
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
					limpiarcamposVendedor()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmVendedor = ""
					buscarabmVendedor()
					 buscarVendedorSelec() 
					verCerrarVentanaAbmVendedorVista("2")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoVendedor(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarVendedor1').checked=true
		document.getElementById('inptSeleccEstadoBuscarVendedor2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarVendedor1').checked=false
		document.getElementById('inptSeleccEstadoBuscarVendedor2').checked=true
	}
}
function buscarabmVendedor() {
if(controlacceso("EDITARLISTADOVENDEDORES","accion")==false){return;}
	var listado = iniciarListadoAbmVendedor();
	var codigo = document.getElementById('inptBuscarAbmVendedor1').value
	var vendedor = document.getElementById('inptBuscarAbmVendedor2').value
	var cod_local = document.getElementById('inptBuscarAbmCobrador3').value
	var sector = document.getElementById('inptBuscarAbmCobrador4').value
	var estado = ""
	if(	document.getElementById('inptSeleccEstadoBuscarVendedor1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_vendedor").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"vendedor": vendedor,
		"estado": estado,
		"cod_local": cod_local,
		"sector": sector,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_vendedor").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_vendedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptRegistroNroVendedor").value = datos[3]


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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmVendedor);
} else {
	iniciarListadoAbmVendedor();
}



function buscarVendedorSelec() {

	
	document.getElementById("inptBuscarComisionVendedor1").innerHTML = ""
	document.getElementById("inputSelectVendedorClientesInactivos").innerHTML = ""
	document.getElementById("inptBuscarHistorialVenta9").innerHTML = ""
	document.getElementById("inptBuscarCuentasCobrar7").innerHTML = ""
	document.getElementById("inptAbmVendedorMetasVendedor").innerHTML = ""
	document.getElementById("inptBuscarInformeSolicitudAnulacion10").innerHTML = ""
	document.getElementById("inptfiltroVendedorInformeCredito").innerHTML = ""
	// document.getElementById("inptBuscarComisionVendedorAgrupado4").innerHTML = ""
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarselect"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptBuscarComisionVendedor1").innerHTML = ''
			document.getElementById("inputSelectVendedorClientesInactivos").innerHTML = ""
			document.getElementById("inptAbmVendedorMetasVendedor").innerHTML = ""
			document.getElementById("inptBuscarInformeSolicitudAnulacion10").innerHTML = ""
			document.getElementById("inptfiltroVendedorInformeCredito").innerHTML = ""
			// document.getElementById("inptBuscarComisionVendedorAgrupado4").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptBuscarComisionVendedor1").innerHTML = ''
			document.getElementById("inputSelectVendedorClientesInactivos").innerHTML = ""
			document.getElementById("inptAbmVendedorMetasVendedor").innerHTML = ""
			document.getElementById("inptBuscarInformeSolicitudAnulacion10").innerHTML = ""
			document.getElementById("inptfiltroVendedorInformeCredito").innerHTML = ""
			// document.getElementById("inptBuscarComisionVendedorAgrupado4").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptBuscarComisionVendedor1").innerHTML = datos_buscados
					document.getElementById("inputSelectVendedorClientesInactivos").innerHTML = datos_buscados
					document.getElementById("inptBuscarHistorialVenta9").innerHTML = datos_buscados
					document.getElementById("inptBuscarCuentasCobrar7").innerHTML =datos_buscados
					document.getElementById("inptAbmVendedorMetasVendedor").innerHTML =datos_buscados
					document.getElementById("inptBuscarInformeSolicitudAnulacion10").innerHTML =datos_buscados
					document.getElementById("inptfiltroVendedorInformeCredito").innerHTML =datos_buscados
					// document.getElementById("inptBuscarComisionVendedorAgrupado4").innerHTML =datos_buscados

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function buscarVendedorSelecSolo() {
	document.getElementById("inptBuscarHistorialVenta9").innerHTML = ""
	

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarselectsolovendedor"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
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

					document.getElementById("inptBuscarHistorialVenta9").innerHTML = datos_buscados

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


function limpiarcamposVendedor() {
	document.getElementById('inptRegistroSeleccVendedor').value = "";
	document.getElementById('inptNombreApellidoVendedor').value = "";
	document.getElementById('inptNroTelefVendedor').value = "";
	document.getElementById('inptAbmLocalVendedor').value = "";
	document.getElementById('inptSectorVendedor').value = ""
	document.getElementById('inptAbmUsuarioVendedor').value = ""
	document.getElementById('inptAbmControlVendedor').checked = false
	document.getElementById('inptEstadoVendedor').value = "Activo";
	document.getElementById('btnAbmVendedor').value = "Guardar datos";
	document.getElementById('btnEditarVendedor').style.backgroundColor="#b7b7b7"
	document.getElementById('btnLocalVendedor').style.backgroundColor="#b7b7b7"
	idAbmVendedor = "";
	$("div[id=imgFotoPerfil1Vendedor]").css({ "background-image": "url(/GoodVentaElectroCasaMaric/iconos/sinperfil.png)" })
	fotoperfilVendedor=""
	extperfilVendedor=""
	
}
var idFkVendedor1 = ""
var idFkVendedor2 = ""
var controlseleccvistavendedor = ""
var listadoVistaVendedor = null;
function iniciarListadoVistaVendedor() {
	if (listadoVistaVendedor || !window.AbmListadoCore) return listadoVistaVendedor;
	var cuerpo = document.getElementById('table_vista_vendedor');
	var cabecera = cuerpo && cuerpo.previousElementSibling ? cuerpo.previousElementSibling.querySelector('tr') : null;
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraVistaVendedor';
	listadoVistaVendedor = window.AbmListadoCore.crear({
		nombre: 'vistaVendedor', idCabecera: 'cabeceraVistaVendedor', idCuerpo: 'table_vista_vendedor', ordenInicial: 'vendedor',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '10%' },
			{ campo: 'vendedor', titulo: 'VENDEDOR', ancho: '45%' },
			{ campo: 'telefono', titulo: 'NRO. TELEF.', ancho: '45%' }
		],
		fila: { funcionSeleccion: 'obtenerdatosvistavendedor', celdas: [
			{ id: 'td_id', campo: 'codigo', columna: 'codigo' },
			{ id: 'td_datos_1', campo: 'vendedor', columna: 'vendedor' },
			{ id: 'td_datos_2', campo: 'telefono', columna: 'telefono' },
			{ id: 'td_datos_3', campo: 'estado', tecnica: true }
		] }
	});
	listadoVistaVendedor.iniciar();
	return listadoVistaVendedor;
}
function vercerrarvistavendedor(d, ventana) {

	if (d == "1") {
		document.getElementById("divVistaVendedor").style.display = ""
		  
		controlseleccvistavendedor = ventana
		buscarvistavendedor();
	} else {
		 
		$("div[id=divVistaVendedor]").fadeOut(500)
	}

}
function buscarvistavendedor() {
	var buscador = document.getElementById('inptBuscarVistaVendedor').value
	var codlocal = document.getElementById('inptBuscarVistaVendedor1').value
	document.getElementById("table_vista_vendedor").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"codlocal": codlocal,
		"formato": "json",
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		beforeSend: function () {


		},
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_vendedor").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_vendedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];

				if (Respuesta == "UI") {

					ir_a_login()
					ver_vetana_informativa("USUARIO INCORRECTO VUELVA A INICIAR SESION...")
					return false;



				}
				if (Respuesta == "NI") {
					ver_vetana_informativa("NO TIENES PERMISO PARA CONTINUA")
					return false;
                  }
				if (Respuesta == "exito") {



					var datos_buscados = datos[2];

					var listado = iniciarListadoVistaVendedor();
					if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_vista_vendedor").innerHTML = datos_buscados


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoVistaVendedor);
else iniciarListadoVistaVendedor();
function obtenerdatosvistavendedor(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});

	datostr.className = 'tableRegistroSelec'

	if (controlseleccvistavendedor == "venta1") {
		idFkVendedor1 = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptVendedorVenta1').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	if (controlseleccvistavendedor == "venta2") {
		idFkVendedor2 = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptVendedorVenta2').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	if (controlseleccvistavendedor == "comision") {
		codvendedorComision = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptVendedorComision').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	document.getElementById("divVistaVendedor").style.display = "none"



}
