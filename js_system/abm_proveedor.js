/*
ABM PROVEEDOR
*/
function verCerrarAbmProveedor(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmProveedor").style.display==""){
		document.getElementById("divMinimizadoListadoProveedor").style.display="none"	
		limpiarcamposbuscarproveedor()
		limpiarcamposProveedor()
//  
	$("div[id=divAbmProveedor]").fadeOut(500);	
	}else{		
	if(controlacceso("VERLISTADOPROVEEDORES","accion")==false){return;}
	
	mostrarSoloUno("divAbmProveedor")	
		document.getElementById("divAbmProveedor").style.display=""
 
	}
}
function limpiarcamposbuscarproveedor(){
	document.getElementById('inptBuscarProveedor1').value=""
	document.getElementById('inptBuscarProveedor2').value=""
	document.getElementById('inptBuscarProveedor3').value=""
	document.getElementById("table_abm_proveedor").innerHTML = ""
	document.getElementById("inptRegistroNroProveedor").value ="";
}
function minimizarabmproveedor(){
//  
	$("div[id=divAbmProveedor]").fadeOut(500);
	document.getElementById("divMinimizadoListadoProveedor").style.display=""	
	copiarBotonEnContenedor(document.getElementById("divMenuAbmProveedores"));
}
function verCerrarVentanaAbmVistaProveedor(d) {
	if (d == "1") {
		if(controlacceso("INSERTARLISTADOPROVEEDORES","accion")==false){return;}
		$("div[id=divAbmProveedorVista]").fadeIn(250)
		document.getElementById("inptNombreApellidoProveedorVista").value = ""
		document.getElementById("inptNroDocProveedorVista").value = ""
		document.getElementById("inptNroTelefProveedorVista").value = ""
		document.getElementById("inptDireccionProveedorVista").value = ""
		document.getElementById("inptCorreoProveedorVista").value = ""
	} else {
		$("div[id=divAbmProveedorVista]").fadeOut(250)
	}
}
function verificarcamposProveedorVista() {
	var inptNombreApellidoProveedor = document.getElementById('inptNombreApellidoProveedorVista').value
	var inptNroDocProveedor = document.getElementById('inptNroDocProveedorVista').value
	var inptNroTelefProveedor = document.getElementById('inptNroTelefProveedorVista').value
	var inptDireccionProveedor = document.getElementById('inptDireccionProveedorVista').value
	var inptCorreoProveedor = document.getElementById('inptCorreoProveedorVista').value
	var inptEstadoProveedor = "Activo"
	if (inptNombreApellidoProveedor == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL PROVEEDOR")
		return false;
	}
	if (inptNroDocProveedor == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE R.U.C")
		return false;
	}
	var accion = "nuevo";
	if(controlacceso("INSERTARLISTADOPROVEEDORES","accion")==false){return;}
	abmproveedor(inptNombreApellidoProveedor, inptNroDocProveedor, inptNroTelefProveedor, inptDireccionProveedor, inptCorreoProveedor, inptEstadoProveedor, idAbmProveedor, accion);
}
function verCerrarVentanaAbmProveedor(d, l) {
	if (d == "1") {
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOPROVEEDORES","accion")==false){return;}
			limpiarcamposProveedor()
		}
		$("div[id=divAbmProveedor2]").fadeIn(250)
		document.getElementById('divAbmProveedor1').style.display = "none"
	} else {
		$("div[id=divAbmProveedor1]").fadeIn(250)
		document.getElementById('divAbmProveedor2').style.display = "none"
	}
}
function verVentanaEditarProveedor() {
	if(controlacceso("EDITARLISTADOPROVEEDORES","accion")==false){return;}
	if (idAbmProveedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmProveedor("1", "2")
}
var idAbmProveedor = ""
var listadoAbmProveedor = null;

function iniciarListadoAbmProveedor() {
	if (listadoAbmProveedor || !window.AbmListadoCore) return listadoAbmProveedor;
	var formulario = document.getElementById("divAbmProveedor1");
	var cuerpo = document.getElementById("table_abm_proveedor");
	var cabecera = document.getElementById("cabeceraAbmProveedor");
	if (!cuerpo || !cabecera) return null;
	var opciones = formulario ? formulario.querySelector('.abm-estandar-menu-columnas') : null;
	if (opciones) opciones.id = 'opcionesColumnasProveedor';
	listadoAbmProveedor = window.AbmListadoCore.crear({
		nombre: "proveedores",
		idCabecera: "cabeceraAbmProveedor",
		idCuerpo: "table_abm_proveedor",
		idOpcionesColumnas: "opcionesColumnasProveedor",
		ordenInicial: "proveedor",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" },
			{ campo: "ruc", titulo: "R.U.C.", ancho: "10%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "10%" },
			{ campo: "telefono", titulo: "TELEF.", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmProveedor",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo", render: function (valor, registro, celda) {
					celda.style.backgroundColor = "#efeded";
					celda.style.color = "red";
					return valor;
				} },
				{ id: "td_datos_2", campo: "ruc", columna: "ruc" },
				{ id: "td_datos_1", campo: "proveedor", columna: "proveedor" },
				{ id: "td_datos_3", campo: "direccion", tecnica: true },
				{ id: "td_datos_4", campo: "telefono", columna: "telefono" },
				{ id: "td_datos_5", campo: "email", tecnica: true },
				{ id: "td_datos_6", campo: "estado", tecnica: true },
				{ id: "td_datos_100", campo: "insertadopor", tecnica: true },
				{ id: "td_datos_101", campo: "editadopor", tecnica: true },
				{ id: "td_datos_102", campo: "fecha_insert", tecnica: true },
				{ id: "td_datos_103", campo: "fecha_edit", tecnica: true }
			]
		}
	});
	listadoAbmProveedor.iniciar();
	return listadoAbmProveedor;
}

function programarListadoAbmProveedor() {
	setTimeout(iniciarListadoAbmProveedor, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmProveedor);
else programarListadoAbmProveedor();

function obtenerdatosabmProveedor(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreApellidoProveedor').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccProveedor').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNroDocProveedor').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptNroTelefProveedor').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptDireccionProveedor').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptCorreoProveedor').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptEstadoProveedor').value = $(datostr).children('td[id="td_datos_6"]').html();
			document.getElementById('inptUsuarioInsertadoPor').value=$(datostr).children('td[id="td_datos_100"]').html()
	document.getElementById('inptFechaInsertadoPor').value=$(datostr).children('td[id="td_datos_102"]').html()
	document.getElementById('inptUsuarioEditadoPor').value=$(datostr).children('td[id="td_datos_101"]').html()
	document.getElementById('inptFechaEditadoPor').value=$(datostr).children('td[id="td_datos_103"]').html()
	idAbmProveedor = $(datostr).children('td[id="td_id"]').html();
document.getElementById('btnAbmProveedor').value = "Editar Datos";
document.getElementById('btnEditarProveedores').style.backgroundColor="";
document.getElementById('btnAuditoriaProveedor').style.backgroundColor="#673ab7";
}
function verificarcamposProveedor() {
	var inptNombreApellidoProveedor = document.getElementById('inptNombreApellidoProveedor').value
	var inptNroDocProveedor = document.getElementById('inptNroDocProveedor').value
	var inptNroTelefProveedor = document.getElementById('inptNroTelefProveedor').value
	var inptDireccionProveedor = document.getElementById('inptDireccionProveedor').value
	var inptCorreoProveedor = document.getElementById('inptCorreoProveedor').value
	var inptEstadoProveedor = document.getElementById('inptEstadoProveedor').value
	if (inptNombreApellidoProveedor == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL PROVEEDOR")
		return false;
	}
	if (inptNroDocProveedor == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE R.U.C")
		return false;
	}
	var accion = "";
	if (idAbmProveedor != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADOPROVEEDORES","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADOPROVEEDORES","accion")==false){return;}
	}
	abmproveedor(inptNombreApellidoProveedor, inptNroDocProveedor, inptNroTelefProveedor, inptDireccionProveedor, inptCorreoProveedor, inptEstadoProveedor, idAbmProveedor, accion);
}
function abmproveedor(nombre_persona, rut_proveedor, telefono, direccion, email, estado, cod_persona, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_persona", cod_persona)
	datos.append("nombre_persona", nombre_persona)
	datos.append("direccion", direccion)
	datos.append("telefono", telefono)
	datos.append("email", email)
	datos.append("rut_proveedor", rut_proveedor)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproveedor.php",
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
					limpiarcamposProveedor()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmProveedor = ""
					buscarProveedorSelec()
					buscarvistaproveedor()
					buscarabmProveedor()
					verCerrarVentanaAbmVistaProveedor("2")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadoproveedor(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarProveedor1').checked=true
		document.getElementById('inptSeleccEstadoBuscarProveedor2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarProveedor1').checked=false
		document.getElementById('inptSeleccEstadoBuscarProveedor2').checked=true
	}
}
function buscarabmProveedor() {
if(controlacceso("BUSCARLISTADOPROVEEDORES","accion")==false){return;}
	var codigo = document.getElementById('inptBuscarProveedor1').value
	var ruc = document.getElementById('inptBuscarProveedor2').value
	var proveedor = document.getElementById('inptBuscarProveedor3').value
	var estado =""
	if(document.getElementById('inptSeleccEstadoBuscarProveedor1').checked==true){
		estado ="Activo"
	}else{
		estado ="Inactivo"
	}
	document.getElementById("table_abm_proveedor").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"ruc": ruc,
		"proveedor": proveedor,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproveedor.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_proveedor").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_proveedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
				var datos_buscados = datos[2];
					var listado = iniciarListadoAbmProveedor();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_proveedor").innerHTML = typeof datos_buscados === "string" ? datos_buscados : "";
					document.getElementById("inptRegistroNroProveedor").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposProveedor() {
	document.getElementById('inptNombreApellidoProveedor').value = "";
	document.getElementById('inptRegistroSeleccProveedor').value = "";
	document.getElementById('inptNroDocProveedor').value = "";
	document.getElementById('inptNroTelefProveedor').value = "";
	document.getElementById('inptDireccionProveedor').value = "";
	document.getElementById('inptCorreoProveedor').value = "";
	document.getElementById('btnAbmProveedor').value = "Guardar Datos";
	document.getElementById('inptEstadoProveedor').value = "Activo";
	document.getElementById('btnEditarProveedores').style.backgroundColor = "#b7b7b7";
	document.getElementById('btnAuditoriaProveedor').style.backgroundColor = "#b7b7b7";
	idAbmProveedor = "";
}
var controlseleccvistaProveedor = ""
var codProveedorCompra = ""
var listadoVistaProveedor = null;
function iniciarListadoVistaProveedor() {
	if (listadoVistaProveedor || !window.AbmListadoCore) return listadoVistaProveedor;
	var cuerpo = document.getElementById('table_vista_Proveedor');
	var tabla = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tabla ? tabla.querySelector('tr') : null;
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraVistaProveedor';
	listadoVistaProveedor = window.AbmListadoCore.crear({
		nombre: 'vistaProveedor',
		idCabecera: 'cabeceraVistaProveedor',
		idCuerpo: 'table_vista_Proveedor',
		ordenInicial: 'proveedor',
		columnas: [
			{ campo: 'ruc', titulo: 'R.U.C.', ancho: '10%' },
			{ campo: 'proveedor', titulo: 'PROVEEDOR', ancho: '10%' },
			{ campo: 'telefono', titulo: 'NRO. TELEF.', ancho: '10%' }
		],
		fila: {
			funcionSeleccion: 'obtenerdatosvistaProveedor',
			celdas: [
				{ id: 'td_id', campo: 'codigo', tecnica: true },
				{ id: 'td_datos_2', campo: 'ruc', columna: 'ruc' },
				{ id: 'td_datos_1', campo: 'proveedor', columna: 'proveedor' },
				{ id: 'td_datos_3', campo: 'direccion', tecnica: true },
				{ id: 'td_datos_4', campo: 'telefono', columna: 'telefono' },
				{ id: 'td_datos_5', campo: 'email', tecnica: true },
				{ id: 'td_datos_6', campo: 'estado', tecnica: true }
			]
		}
	});
	listadoVistaProveedor.iniciar();
	return listadoVistaProveedor;
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciarListadoAbmProveedor);
else iniciarListadoAbmProveedor();
function vercerrarvistaProveedor(d, ventana) {
	if (d == "1") {
	
		 document.getElementById("divVistaProveedor").style.display = ""
 //  
		controlseleccvistaProveedor = ventana
		buscarvistaproveedor();
	} else {
		
		//  
$("div[id=divVistaProveedor]").fadeOut(500);
	}
	
}
function buscarvistaproveedor() {
	var buscador = document.getElementById('inptBuscarVistaProveedor').value
	document.getElementById("table_vista_Proveedor").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"formato": "json",
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproveedor.php",
		type: "post",
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_Proveedor").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_Proveedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
                Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
					var datos_buscados = datos[2];
					var listado = iniciarListadoVistaProveedor();
					if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_vista_Proveedor").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoVistaProveedor);
else iniciarListadoVistaProveedor();
function obtenerdatosvistaProveedor(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	if (controlseleccvistaProveedor == "compra") {
		codProveedorCompra = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptProveedorCompra').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	if (controlseleccvistaProveedor == "abmproducto") {
		codProveedorAbmProducto = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptProveesorProducto').value = $(datostr).children('td[id="td_id"]').html();
	}
	if (controlseleccvistaProveedor == "productoComprado") {
		codProveedorComprainf = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptProveedorProductoComprado').value = $(datostr).children('td[id="td_datos_1"]').html();
	}

			//  
$("div[id=divVistaProveedor]").fadeOut(500);
}
function buscarProveedorSelec() {
	document.getElementById("inptBuscarHistorialCompra3").innerHTML = ""
	document.getElementById("inptProveesorProducto").innerHTML = ""
	document.getElementById("inptProveedorProductoBuscarinformegralproductos").innerHTML = ""
	document.getElementById("inptProveedorStockMinimoProducto").innerHTML = ""
	document.getElementById("inptNombreClientesArchivosExcelPedidosProveedor").innerHTML = ""
	document.getElementById("inptBuscarInformeComprasGeneralProveedor").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarselect"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproveedor.php",
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
					document.getElementById("inptBuscarHistorialCompra3").innerHTML = datos_buscados
					document.getElementById("inptProveesorProducto").innerHTML = datos_buscados
					document.getElementById("inptProveedorProductoBuscarinformegralproductos").innerHTML = datos_buscados
					document.getElementById("inptProveedorStockMinimoProducto").innerHTML = datos_buscados
					document.getElementById("inptNombreClientesArchivosExcelPedidosProveedor").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeComprasGeneralProveedor").innerHTML = datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
