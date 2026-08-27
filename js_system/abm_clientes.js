/*
ABM CLIENTES
*/
function valorSeguroTablaCliente(valor) {
	return valor === null || typeof valor === "undefined" ? "" : String(valor);
}

function limpiarTablaCliente(idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) {
		return null;
	}
	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}
	return contenedor;
}

function claseTablaCliente(clase) {
	return clase === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
}

function crearTablaFilaCliente(clase, idFila, nombreFila, claseFila, alSeleccionar) {
	var tabla = document.createElement("table");
	tabla.className = claseTablaCliente(clase);
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");

	var cuerpo = document.createElement("tbody");
	var fila = document.createElement("tr");
	if (idFila) {
		fila.id = idFila;
	}
	if (nombreFila) {
		fila.setAttribute("name", nombreFila);
	}
	if (claseFila) {
		fila.className = claseFila;
	}
	if (typeof alSeleccionar === "function") {
		fila.onclick = function () {
			alSeleccionar(this);
		};
	}
	cuerpo.appendChild(fila);
	tabla.appendChild(cuerpo);
	return { tabla: tabla, fila: fila };
}

function agregarCeldaTablaCliente(fila, id, valor, ancho, oculta) {
	var celda = document.createElement("td");
	if (id) {
		celda.id = id;
	}
	if (ancho) {
		celda.style.width = ancho;
	}
	if (oculta) {
		celda.style.display = "none";
	}
	celda.textContent = valorSeguroTablaCliente(valor);
	fila.appendChild(celda);
	return celda;
}

function renderReferenciasCliente(filas, comercial) {
	var idContenedor = comercial ? "table_mas_referencias_comercialClientes" : "table_mas_referenciasClientes";
	var contenedor = limpiarTablaCliente(idContenedor);
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearTablaFilaCliente(
			registro.clase_fila,
			"tbSelecRegistro",
			comercial ? "tdMasReferenciasCom" : "tdMasReferencias",
			"",
			comercial ? obtenerdatosmasreferenciascom : obtenerdatosmasreferencias
		);
		var ancho = comercial ? "10%" : "20%";
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_1", registro.observacion, ancho, false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_2", registro.telefono, ancho, false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_3", registro.direccion, ancho, false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_4", registro.referencia, ancho, false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_5", registro.tipo, ancho, false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderVistaCliente(filas, busquedaPorDocumento) {
	var contenedor = limpiarTablaCliente("table_vista_cliente");
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearTablaFilaCliente(
			registro.clase_fila,
			busquedaPorDocumento ? "trdatoClienteCi" : "tbSelecRegistro",
			"",
			busquedaPorDocumento ? "tableRegistroSelec" : "",
			obtenerdatosvistacliente
		);
		if (!busquedaPorDocumento && registro.acceso_credito === "Denegado") {
			tablaFila.fila.style.backgroundColor = "#ff5722";
			tablaFila.fila.style.color = "#fff";
		}
		agregarCeldaTablaCliente(tablaFila.fila, "td_id", registro.id_cliente, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_2", registro.documento, "10%", false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_13", registro.ruc, "10%", false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_1", registro.cliente, "10%", false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_10", registro.zona, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_3", registro.direccion, "10%", false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_4", registro.telefono, "10%", false);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_5", registro.email, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_6", registro.calificacion, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_7", registro.whatsapp, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_8", registro.estado, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_9", registro.id_zona, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_11", registro.foto_1, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_12", registro.foto_2, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "td_datos_14", registro.acceso_credito, "", true);
		if (busquedaPorDocumento) {
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_15", registro.total_dias, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_16", registro.lugar_trabajo, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_17", registro.salario, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_18", registro.antiguedad, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_19", registro.telefono_trabajo_1, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_20", registro.telefono_trabajo_2, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_21", registro.direccion_trabajo, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_22", registro.fecha_nacimiento, "", true);
		} else {
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_22", registro.fecha_nacimiento, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_15", registro.lugar_trabajo, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_16", registro.salario, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_17", registro.antiguedad, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_18", registro.telefono_trabajo_1, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_19", registro.telefono_trabajo_2, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_20", registro.direccion_trabajo, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_21", registro.codigo_tipo_mora, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_23", registro.tipo_estado, "", true);
			agregarCeldaTablaCliente(tablaFila.fila, "td_datos_24", registro.tipo_vivienda, "", true);
		}
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderCuentasCliente(filas, idContenedor) {
	var contenedor = limpiarTablaCliente(idContenedor);
	if (!contenedor || !Array.isArray(filas)) {
		return;
	}
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tablaFila = crearTablaFilaCliente(
			registro.clase_fila,
			"tbSelecRegistro",
			"",
			"",
			ObtenerdatosCuentaCliente
		);
		agregarCeldaTablaCliente(tablaFila.fila, "td_id", registro.id_venta, "", true);
		agregarCeldaTablaCliente(tablaFila.fila, "", registro.numero_factura, "40%", false);
		agregarCeldaTablaCliente(tablaFila.fila, "", registro.fecha, "30%", false);
		agregarCeldaTablaCliente(tablaFila.fila, "", registro.dias_atraso_formateado, "10%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function verCerrarAbmClientes(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCliente").style.display==""){
		if(controldebusquedadClientes==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoListadoCliente").style.display="none"
		limpiarcamposbucarabmcliente()
		limpiarcamposCliente()
	//  
	$("div[id=divAbmCliente]").fadeOut(500);	
		}else{		
	if(controlacceso("VERLISTADODECLIENTES","accion")==false){return;}
	mostrarSoloUno("divAbmCliente")	
		document.getElementById("divAbmCliente").style.display=""
	//  
		
		controlventananuevocliente="";
		
	}

}


function limpiarcamposbucarabmcliente(){
	if(controldebusquedadClientes==true){
		
	return
}
	document.getElementById('inptBuscarAbmCliente1').value=""
    document.getElementById('inptBuscarAbmCliente2').value=""
   document.getElementById('inptBuscarAbmCliente3').value=""
 document.getElementById('inptBuscarAbmCliente4').value=""
 document.getElementById('inptBuscarAbmCliente8').value=""
 document.getElementById("table_abm_clientes").innerHTML=""
			document.getElementById("inptRegistroNroClientes").value=""
			document.getElementById("tbProcessClientes").style.display="none"
			
}
function minimizarabmcliente(){
//  
	$("div[id=divAbmCliente]").fadeOut(500);	
	document.getElementById("divMinimizadoListadoCliente").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmClientes"));
}
var borradorNuevoClienteSolicitudCredito=false;
function clienteNuevoTieneDatosSinGuardar(){
	var formulario=document.getElementById("divAbmCliente2");
	if(!formulario){return false;}
	var iniciales=["","SELECCIONAR","SIN CLASIFICAR","SIN_CLASIFICAR","ACTIVO","FIJO","CONFIRMADO"];
	var controles=formulario.querySelectorAll("input, select, textarea");
	for(var i=0;i<controles.length;i++){
		var tipo=String(controles[i].type || "").toLowerCase();
		if(["button","submit","checkbox","file","hidden"].indexOf(tipo)!==-1){continue;}
		if(iniciales.indexOf(String(controles[i].value || "").trim().toUpperCase())===-1){return true;}
	}
	var personales=document.getElementById('table_mas_referenciasClientes');
	var comerciales=document.getElementById('table_mas_referencias_comercialClientes');
	return Boolean(fotocliente1 || fotocliente2 || (personales && personales.innerText.trim()) || (comerciales && comerciales.innerText.trim()));
}
function cerrarModalBorradorClienteSolicitudCredito(){
	var modal=document.getElementById("modalBorradorClienteSolicitudCredito");
	if(modal && modal.parentNode){modal.parentNode.removeChild(modal);}
}
function abrirFormularioNuevoClienteDesdeVista(restaurar){
	cambiarCapaFormularioCliente(true);
	document.getElementById("divAbmCliente").style.display="";
	document.getElementById("divAbmCliente1").style.display="none";
	document.getElementById("divAbmCliente2").style.display="";
	document.getElementById("btnVolverAtrasCliente").style.display="none";
	document.getElementById("btnCerrarAtrasCliente").style.display="";
	['inptNombreCliente','inptApellidoCliente','inptNroTelefCliente','inptNrowhatsappCliente','inptNroDocCliente','inptNroRucCliente'].forEach(function(id){document.getElementById(id).disabled=false;});
	if(!restaurar){limpiarcamposCliente();}
}
function mostrarModalBorradorClienteSolicitudCredito(){
	cerrarModalBorradorClienteSolicitudCredito();
	var modal=document.createElement("div");
	modal.id="modalBorradorClienteSolicitudCredito";
	modal.setAttribute("role","dialog");
	modal.setAttribute("aria-modal","true");
	modal.setAttribute("aria-labelledby","tituloModalBorradorClienteSolicitudCredito");
	modal.style.cssText="position:fixed;inset:0;z-index:2147483600;background:rgba(15,23,42,.62);display:flex;align-items:center;justify-content:center;padding:16px;";
	var contenido=document.createElement("div");
	contenido.style.cssText="width:min(670px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:18px;padding:24px;box-shadow:0 24px 70px rgba(15,23,42,.35);color:#1e293b;";
	var titulo=document.createElement("h2");
	titulo.id="tituloModalBorradorClienteSolicitudCredito";
	titulo.textContent="Hay datos de un cliente sin guardar";
	titulo.style.cssText="margin:0 0 8px;font-size:22px;font-weight:800;";
	var mensaje=document.createElement("p");
	mensaje.textContent="Encontramos un registro pendiente. ¿Querés recuperar estos datos o vaciar el formulario para cargar un cliente nuevo?";
	mensaje.style.cssText="margin:0 0 18px;color:#64748b;line-height:1.45;";
	var resumen=document.createElement("div");
	resumen.style.cssText="display:grid;grid-template-columns:minmax(155px,auto) 1fr;gap:9px 14px;background:#f1f5f9;border:1px solid #dbe4ee;border-radius:12px;padding:16px;margin-bottom:20px;";
	function valor(id){var c=document.getElementById(id);return c ? String(c.value || "").trim() : "";}
	var campos=[
		["Nombre",valor('inptNombreCliente')],["Apellido",valor('inptApellidoCliente')],["Documento",valor('inptNroDocCliente')],["RUC",valor('inptNroRucCliente')],
		["Tipo de persona",valor('inptTipoPersonaEquifaxCliente')],["Teléfono",valor('inptNroTelefCliente')],["WhatsApp",valor('inptNrowhatsappCliente')],["Fecha de nacimiento",valor('inptFechaNacCliente')],
		["Estado",valor('inptEstadoCliente')],["Tipo de cliente",valor('inptTipoCliente')],["Dirección particular",valor('inptDireccionCliente')],["Referencia",valor('inptReferenciaCliente')],
		["Zona",valor('inptZonaCliente')],["Estado de crédito",valor('inptAccesoCreditoCliente')],["Calificación",valor('inptCalificaCliente')],["SMS",document.getElementById('inptSeleccSMS1').checked ? "Habilitado" : "Deshabilitado"],
		["Profesión",valor('inptProfesionCliente')],["Tipo de empleado",valor('inptTipoEmpleadoCliente')],["Cargo",valor('inptCargoCliente')],["Lugar de trabajo",valor('inptLugrarTrabajoCliente')],
		["Dirección laboral",valor('inptDireccionTrabajoCliente')],["Salario",valor('inptSalarioCliente')],["Antigüedad",valor('inptAntiguedadCliente')],["Teléfono empresa",valor('inptNroTelefTrabajoCliente1')],
		["Nombre encargado",valor('inptNroTelefTrabajoCliente2')],["Información extra",valor('inptInformacionExtraCliente')],["Hogar",valor('inpttipo_viviendaCliente')],
		["Referencia personal - dirección",valor('inptMasRefDireccionCliente')],["Referencia personal - tipo",valor('inptMasRefTipoCliente')],["Referencia personal - referencia",valor('inptMasRefReferenciaCliente')],
		["Referencia personal - teléfono",valor('inptMasRefTelefCliente')],["Referencia personal - observación",valor('inptMasRefObservacionCliente')],
		["Referencia comercial - dirección",valor('inptMasRefComDireccionCliente')],["Referencia comercial - tipo",valor('inptMasRefComTipoCliente')],["Referencia comercial - referencia",valor('inptMasRefComReferenciaCliente')],
		["Referencia comercial - teléfono",valor('inptMasRefComTelefCliente')],["Referencia comercial - observación",valor('inptMasRefComObservacionCliente')],
		["Referencias personales cargadas",(document.getElementById('table_mas_referenciasClientes').innerText || "").replace(/\s+/g," ").trim()],
		["Referencias comerciales cargadas",(document.getElementById('table_mas_referencias_comercialClientes').innerText || "").replace(/\s+/g," ").trim()],
		["Foto C.I. frente",fotocliente1 ? "Adjunta" : ""],["Foto C.I. dorso",fotocliente2 ? "Adjunta" : ""]
	];
	var sinRegistro=["SELECCIONAR","SIN CLASIFICAR","SIN_CLASIFICAR"];
	campos.filter(function(c){return c[1]!=="" && sinRegistro.indexOf(String(c[1]).toUpperCase())===-1;}).forEach(function(c){
		var etiqueta=document.createElement("strong"); etiqueta.textContent=c[0]+":";
		var dato=document.createElement("span"); dato.textContent=c[1]; dato.style.overflowWrap="anywhere";
		resumen.appendChild(etiqueta); resumen.appendChild(dato);
	});
	var acciones=document.createElement("div");
	acciones.style.cssText="display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px;";
	function boton(texto,clase,accion){var b=document.createElement("button");b.type="button";b.className=clase;b.textContent=texto;b.onclick=accion;return b;}
	var btnSalir=boton("Salir","btn btn-secondary",cerrarModalBorradorClienteSolicitudCredito);
	var btnVaciar=boton("Vaciar y cargar nuevo","btn btn-outline-danger",function(){cerrarModalBorradorClienteSolicitudCredito();borradorNuevoClienteSolicitudCredito=false;abrirFormularioNuevoClienteDesdeVista(false);});
	var btnRecuperar=boton("Recuperar datos","btn btn-primary",function(){cerrarModalBorradorClienteSolicitudCredito();abrirFormularioNuevoClienteDesdeVista(true);});
	acciones.appendChild(btnSalir); acciones.appendChild(btnVaciar); acciones.appendChild(btnRecuperar);
	contenido.appendChild(titulo); contenido.appendChild(mensaje); contenido.appendChild(resumen); contenido.appendChild(acciones); modal.appendChild(contenido); document.body.appendChild(modal);
	modal.addEventListener("keydown",function(e){if(e.key==="Escape"){cerrarModalBorradorClienteSolicitudCredito();}});
	btnRecuperar.focus();
}
function verCerrarAbmClientes2(){
	if(controlseleccvistacliente==="Credito" && idAbmCliente===""){
		borradorNuevoClienteSolicitudCredito=clienteNuevoTieneDatosSinGuardar();
	}
document.getElementById("divAbmCliente").style.display="none"
	cambiarCapaFormularioCliente(false)
document.getElementById("btnVolverAtrasCliente").style.display=""
		document.getElementById("btnCerrarAtrasCliente").style.display="none"
		document.getElementById("divAbmCliente1").style.display=""
		document.getElementById("divAbmCliente2").style.display="none"
}
var controlventananuevocliente="";
function cambiarCapaFormularioCliente(abrir) {
	var formularioCliente = document.getElementById("divAbmCliente")
	if (!formularioCliente) return
	var vistaCliente = document.getElementById("divVistaCliente")
	var vistaClienteActiva = vistaCliente && window.getComputedStyle(vistaCliente).display !== "none"
	if (abrir && vistaClienteActiva) {
		formularioCliente.style.setProperty("position", "fixed", "important")
		formularioCliente.style.setProperty("z-index", "2147483100", "important")
		return
	}
	formularioCliente.style.removeProperty("position")
	formularioCliente.style.removeProperty("z-index")
}
function vernuevoclientevista(d) {
	if (d == "1") {
		if(controlacceso("INSERTARLISTADODECLIENTES","accion")==false){return;}
		if(controlseleccvistacliente==="Credito" && borradorNuevoClienteSolicitudCredito===true && idAbmCliente===""){
			mostrarModalBorradorClienteSolicitudCredito();
			return;
		}
		abrirFormularioNuevoClienteDesdeVista(false);
	} else {
		cambiarCapaFormularioCliente(false)
		document.getElementById("btnVolverAtrasCliente").style.display=""
		document.getElementById("btnCerrarAtrasCliente").style.display="none"
		document.getElementById("divAbmCliente1").style.display=""
		document.getElementById("divAbmCliente2").style.display="none"
		 //  
		$("div[id=divAbmCliente]").fadeOut(500)
		
	}
}
function verificarcamposClienteVista() {
	var inptNombreClienteVista = document.getElementById('inptNombreClienteVista').value
	var inptApellidoClienteVista = document.getElementById('inptApellidoClienteVista').value
	var inptNroDocCliente = document.getElementById('inptNroDocClienteVista').value
	var inptNroTelefCliente = document.getElementById('inptNroTelefClienteVista').value
	var inptNrowhatsappCliente = document.getElementById('inptNrowhatsappClienteVista').value
	var inptDireccionCliente = document.getElementById('inptDireccionClienteVista').value
	var inptReferenciaCliente = document.getElementById('inptReferenciaClienteVista').value
	var inptCalificaCliente = document.getElementById('inptCalificaClienteVista').value
	var inptAccesoCreditoCliente = document.getElementById('inptAccesoCreditoCliente').value
	var inptEstadoCliente = "Activo"
	if (inptNombreClienteVista == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL CLIENTE")
		return false;
	}
	if (inptApellidoClienteVista == "") {
		ver_vetana_informativa("FALTO INGRESAR EL APELLIDO DEL CLIENTE")
		return false;
	}
	if (inptNroDocCliente == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE DOCUMENTO")
		return false;
	}
	if (idFKZona == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
		return false;
	}
	var accion = "nuevo";
if(controlacceso("INSERTARLISTADODECLIENTES","accion")==false){return;}
	abmcliente(inptAccesoCreditoCliente,idFKZona, inptNombreClienteVista,inptApellidoClienteVista, inptNroDocCliente, inptNroTelefCliente, inptNrowhatsappCliente, inptDireccionCliente, inptReferenciaCliente, inptCalificaCliente, inptEstadoCliente, idAbmCliente, accion);
}
function verCerrarVentanaAbmCliente(d, l) {	
	if (d == "1") {
		cambiarCapaFormularioCliente(true)
		if (l == "1") {
			if(controlacceso("INSERTARLISTADODECLIENTES","accion")==false){
				return;
			}
			document.getElementById('inptNombreCliente').disabled=false
			document.getElementById('inptApellidoCliente').disabled=false
			document.getElementById('inptNroTelefCliente').disabled=false
	         document.getElementById('inptNrowhatsappCliente').disabled=false
			  document.getElementById('inptNroDocCliente').disabled=false
	         document.getElementById('inptNroRucCliente').disabled=false
			 
			 
			limpiarcamposCliente()
		}
		$("div[id=divAbmCliente2]").fadeIn(250)
		document.getElementById('divAbmCliente1').style.display = "none"
	} else {
		cambiarCapaFormularioCliente(false)
		$("div[id=divAbmCliente1]").fadeIn(250)
		document.getElementById('divAbmCliente2').style.display = "none"
	}
}
function verVentanaEditarCliente() {
	if(controlacceso("EDITARLISTADODECLIENTES","accion")==false){return;}
	if (idAbmCliente == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
	if(accesosuser["MODIFICARNOMBREAPELLIDOCLIENTE"]["accion"]=="NO"){
	document.getElementById('inptNombreCliente').disabled=true
	document.getElementById('inptApellidoCliente').disabled=true
	}
			 
			 if(accesosuser["MODIFICARNROTELEFONOCLIENTE"]["accion"]=="NO"){
	         document.getElementById('inptNroTelefCliente').disabled=true
	         document.getElementById('inptNrowhatsappCliente').disabled=true
	         }
			 
		if(accesosuser["MODIFICARNRODOCUMENTOCLIENTE"]["accion"]=="NO"){
	         document.getElementById('inptNroDocCliente').disabled=true
	         document.getElementById('inptNroRucCliente').disabled=true
	         }
			 
			 if(accesosuser["CAMBIARTIPOCLIENTE"]["accion"]=="NO"){
	         document.getElementById('inptTipoCliente').disabled=true
	         }else{
				 document.getElementById('inptTipoCliente').disabled=false
			 }
	
	verCerrarVentanaAbmCliente("1", "2")
}
var controlfotocliente="";
function ExploradorImagenCliente(File){	
$("input[name=file_1]").click();
controlfotocliente=File;
}
var fotocliente1="";
var extcliente1="";
var fotocliente2="";
var extcliente2="";

function readFileCliente2(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension=="jpeg") || (file_extension=="jpg") || (file_extension=="png") ){
}else{
ver_vetana_informativa("LA FOTO SELECCIONADO NO ES JPEG")
return false;
}
var reader = new FileReader();
reader.onload = function(e){
if(controlfotocliente=="foto1"){
	extcliente1=file_extension;
fotocliente1=e.target.result;
 $("div[id=imgFotoCliente1]").css({"background-image":"url("+fotocliente1+")"})

}
if(controlfotocliente=="foto2"){
	extcliente2=file_extension;
fotocliente2=e.target.result;
 $("div[id=imgFotoCliente2]").css({"background-image":"url("+fotocliente2+")"})

}


}
reader.readAsDataURL(input.files[0]);
}


function verCerrarVisorImagen(d,img){
	var visorFoto = document.getElementById('divVistaFoto')
	var imagenVisor = document.getElementById("imgVisor")
	if (!visorFoto || !imagenVisor) {
		return false
	}
	if (d == "1") {		
		var urlsrc="";
		if(img=="cliente1"){
		urlsrc=	fotocliente1
		}
		if(img=="cliente2"){
		urlsrc=	fotocliente2
		}
		if(img=="producto"){
		urlsrc=	fotoproducto
		}
		if(img=="perfilcobrador"){
		urlsrc=	fotoperfilcobador
		}		
		if(img=="perfilVendedor"){
		urlsrc=	fotoperfilVendedor
		}
		if(img=="abmgastos"){
		urlsrc=	fotogasto
		}		
		
		if(img=="Funcionario"){
		urlsrc=	fotoperfilFuncionario
		}
		
		if(img=="Vehivulos"){
		urlsrc=	fotoperfilVehivulos
		}
		
		if(urlsrc==""){
			ver_vetana_informativa("NO SE ENCONTRO NINGUNA IMAGEN PARA VIZUALIZAR")
			return false;
		}
		imagenVisor.src=urlsrc
		visorFoto.classList.add("visor-ci-activo")
		visorFoto.setAttribute("aria-hidden", "false")
		$(visorFoto).stop(true, true).fadeIn(180)
		var botonCerrar = document.getElementById("btnCerrarVisorCi")
		if (botonCerrar) {
			setTimeout(function(){ botonCerrar.focus() }, 190)
		}
	} else {
		visorFoto.setAttribute("aria-hidden", "true")
		$(visorFoto).stop(true, true).fadeOut(160, function(){
			visorFoto.classList.remove("visor-ci-activo")
			imagenVisor.removeAttribute("src")
		})
	}
}

document.addEventListener("keydown", function(evento){
	if (evento.key !== "Escape") {
		return
	}
	var visorFoto = document.getElementById("divVistaFoto")
	if (visorFoto && visorFoto.getAttribute("aria-hidden") === "false") {
		verCerrarVisorImagen("")
	}
})



function imprimirFotoCI(){
$("div[id=imgPrint1]").css({"background-image":"url("+fotocliente1+")"})
$("div[id=imgPrint2]").css({"background-image":"url("+fotocliente2+")"})
var documento=document.getElementById("DivImprimirCi").innerHTML;
localStorage.setItem("reporte", documento);
localStorage.setItem("tipo", "reporte");
window.open("/GoodVentaElectroCasaMaric/system/report.html");
}
var idAbmCliente=""
var nombreClienteAdjunto = "";
function actualizarBotonesAdjuntosCliente(activo) {
	var botones = ["btnFotosClientes", "btnArchivosClientes"];
	for (var i = 0; i < botones.length; i++) {
		var boton = document.getElementById(botones[i]);
		if (!boton) {
			continue;
		}
		boton.disabled = !activo;
		boton.style.backgroundColor = activo ? "#2196F3" : "#b7b7b7";
		boton.style.cursor = activo ? "pointer" : "not-allowed";
	}
}

function traerAdjuntoClienteAlFrente(idVentana) {
	var ventanasAdjuntas = ["divAbmCargarFotosClientePrincipal", "divAbmCargarArchivosCliente"];
	for (var i = 0; i < ventanasAdjuntas.length; i++) {
		var ventana = document.getElementById(ventanasAdjuntas[i]);
		if (!ventana) {
			continue;
		}
		if (ventanasAdjuntas[i] == idVentana) {
			ventana.style.display = "";
			ventana.style.zIndex = "7000";
		} else {
			ventana.style.display = "none";
			ventana.style.zIndex = "6000";
		}
	}
	var ventanaCliente = document.getElementById("divAbmCliente");
	if (ventanaCliente) {
		ventanaCliente.style.zIndex = "6000";
	}
}

function abrirFotosClienteDesdeAbm() {
	if (idAbmCliente == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
		return false;
	}
	if(controlacceso("VERCARGARFOTOSCLIENTE","accion")==false){return;}
	document.getElementById("divMinimizadoImagenesCliente").style.display = "none";
	traerAdjuntoClienteAlFrente("divAbmCargarFotosClientePrincipal");
	LimpiarCamposCargarFotosClientePrincipal();
	Cod_clienteFotoFK = idAbmCliente;
	document.getElementById("inptNombreClientesFotoPrincipal").value = nombreClienteAdjunto;
	buscarFotosClientePrincipal(Cod_clienteFotoFK);
}

function abrirArchivosClienteDesdeAbm() {
	if (idAbmCliente == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
		return false;
	}
	if(controlacceso("CARGARARCHIVOSCLIENTE","accion")==false){return;}
	document.getElementById("divMinimizadoArchivosCliente").style.display = "none";
	traerAdjuntoClienteAlFrente("divAbmCargarArchivosCliente");
	LimpiarCamposCargarArchivosCliente();
	CodClienteArchivo = idAbmCliente;
	document.getElementById("inptNombreClientesArchivosCliente").value = nombreClienteAdjunto;
	buscarDescripcionArchivoCliente();
	buscarArchivosCliente();
}

function obtenerdatosabmCliente(datostr){	
		 $("tr[id=tbSelecRegistro]").each(function(i, td){		
		 td.className=''
		
	   });
    datostr.className='tableRegistroSelec'
	document.getElementById('inptNombreCliente').value=$(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptApellidoCliente').value=$(datostr).children('td[id="td_datos_109"]').html();
	document.getElementById('inptFechaNacCliente').value=$(datostr).children('td[id="td_datos_105"]').html();
	document.getElementById('inptRegistroSeleccCliente').value=$(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNroDocCliente').value=$(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptNroTelefCliente').value=$(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptNrowhatsappCliente').value=$(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptDireccionCliente').value=$(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptReferenciaCliente').value=$(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptCalificaCliente').value=$(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptEstadoCliente').value=$(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptZonaCliente').value=$(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptNroRucCliente').value=$(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptLugrarTrabajoCliente').value=$(datostr).children('td[id="td_datos_15"]').html()
	document.getElementById('inptSalarioCliente').value=$(datostr).children('td[id="td_datos_16"]').html()
	document.getElementById('inptAntiguedadCliente').value=$(datostr).children('td[id="td_datos_17"]').html()
	document.getElementById('inptNroTelefTrabajoCliente1').value=$(datostr).children('td[id="td_datos_18"]').html()
	document.getElementById('inptNroTelefTrabajoCliente2').value=$(datostr).children('td[id="td_datos_19"]').html()
	document.getElementById('inptDireccionTrabajoCliente').value=$(datostr).children('td[id="td_datos_20"]').html()
	document.getElementById('inptAccesoCreditoCliente').value=$(datostr).children('td[id="td_datos_21"]').html()
	document.getElementById('inptUsuarioInsertadoPor').value=$(datostr).children('td[id="td_datos_100"]').html()
	document.getElementById('inptFechaInsertadoPor').value=$(datostr).children('td[id="td_datos_102"]').html()
	document.getElementById('inptUsuarioEditadoPor').value=$(datostr).children('td[id="td_datos_101"]').html()
	document.getElementById('inptFechaEditadoPor').value=$(datostr).children('td[id="td_datos_103"]').html()
	document.getElementById('inptInformacionExtraCliente').value=$(datostr).children('td[id="td_datos_110"]').text()
	document.getElementById('inpttipo_viviendaCliente').value=$(datostr).children('td[id="td_datos_108"]').html()
	document.getElementById('inptTipoCliente').value=$(datostr).children('td[id="td_datos_23"]').html()
	document.getElementById('inptTipoPersonaEquifaxCliente').value=$(datostr).children('td[id="td_datos_111"]').html() || 'SIN_CLASIFICAR'
	document.getElementById('inptProfesionCliente').value=$(datostr).children('td[id="td_datos_24"]').html()
	document.getElementById('inptTipoEmpleadoCliente').value=$(datostr).children('td[id="td_datos_112"]').html() || ''
	document.getElementById('inptCargoCliente').value=$(datostr).children('td[id="td_datos_113"]').html() || ''
	var sms =$(datostr).children('td[id="td_datos_104"]').html()

	if(sms=="SI"){
		document.getElementById('inptSeleccSMS1').checked=true
		document.getElementById('inptSeleccSMS2').checked=false	
	}else{
		document.getElementById('inptSeleccSMS1').checked=false
		document.getElementById('inptSeleccSMS2').checked=true	
	}

	
	
	fotocliente1= $(datostr).children('td[id="td_datos_11"]').html();
	fotocliente2= $(datostr).children('td[id="td_datos_12"]').html();
	 $("div[id=imgFotoCliente1]").css({"background-image":"url("+fotocliente1+")"})
	  $("div[id=imgFotoCliente2]").css({"background-image":"url("+fotocliente2+")"})
	idAbmCliente= $(datostr).children('td[id="td_id"]').html();
	nombreClienteAdjunto = (document.getElementById('inptNombreCliente').value + " " + document.getElementById('inptApellidoCliente').value).trim();
	idFKZona= $(datostr).children('td[id="td_datos_9"]').html();
    extcliente1="";
    extcliente2="";
	buscarmasreferenciasclientes();
	buscarmasreferenciascomclientes();
	buscarFotosCliente()
  document.getElementById('btnAbmCliente').value="Editar datos";
  document.getElementById('btnEditarClientes').style.backgroundColor="";
  document.getElementById('btnAuditoriaClientes').style.backgroundColor="#673ab7";
  document.getElementById('btnUbiClientes').style.backgroundColor="";
  actualizarBotonesAdjuntosCliente(true);
  
	
}

/* REFERENCIAS PERSONAL */
function AnhadirMasReferencias(){
	var inptMasRefDireccionCliente=document.getElementById("inptMasRefDireccionCliente").value
	var inptMasRefReferenciaCliente=document.getElementById("inptMasRefReferenciaCliente").value
	var inptMasRefTelefCliente=document.getElementById("inptMasRefTelefCliente").value
	var inptMasRefObservacionCliente=document.getElementById("inptMasRefObservacionCliente").value
	var inptMasRefTipoCliente=document.getElementById("inptMasRefTipoCliente").value
	var tablaFila = crearTablaFilaCliente("tableRegistroSearch", "tbSelecRegistro", "tdMasReferencias", "", obtenerdatosmasreferencias);
	tablaFila.tabla.setAttribute("border", "0");
	tablaFila.tabla.setAttribute("cellspacing", "0");
	tablaFila.tabla.setAttribute("cellpadding", "0");
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_1", inptMasRefObservacionCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_2", inptMasRefTelefCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_3", inptMasRefDireccionCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_4", inptMasRefReferenciaCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_5", inptMasRefTipoCliente, "20%", false);
	document.getElementById("table_mas_referenciasClientes").appendChild(tablaFila.tabla);
		LimpiarMasReferencia()
}

function traerModalAuxiliarClienteAlFrente(idVentana) {
	var ventana = document.getElementById(idVentana);
	if (!ventana) return null;
	/* Un hijo no puede superar el z-index de la ventana padre. Al abrirlo se
	 * lleva al body para que quede sobre Fotos/Archivos y conserve sus IDs. */
	if (ventana.parentNode !== document.body) document.body.appendChild(ventana);
	ventana.style.position = "fixed";
	ventana.style.setProperty("z-index", "2147483400", "important");
	ventana.style.display = "";
	return ventana;
}
var elementoAddMasReferencias="";
function obtenerdatosmasreferencias(datostr){
	 $("tr[id=tbSelecRegistro]").each(function(i, td){		
		 td.className=''
		
	   });

    datostr.className='tableRegistroSelec'
	document.getElementById('inptMasRefDireccionCliente').value=$(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptMasRefReferenciaCliente').value=$(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptMasRefTelefCliente').value=$(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptMasRefObservacionCliente').value=$(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptMasRefTipoCliente').value=$(datostr).children('td[id="td_datos_5"]').html();
	elementoAddMasReferencias=datostr;
		document.getElementById("btnAddMasReferencias1").style.display="none"
		document.getElementById("btnAddMasReferencias2").style.display=""
		document.getElementById("btnAddMasReferencias3").style.display=""
		document.getElementById("btnAddMasReferencias4").style.display=""
}
function editarMasRefencia(){
	$(elementoAddMasReferencias).children('td[id="td_datos_3"]').text(document.getElementById('inptMasRefDireccionCliente').value)
	$(elementoAddMasReferencias).children('td[id="td_datos_4"]').text(document.getElementById('inptMasRefReferenciaCliente').value)
	$(elementoAddMasReferencias).children('td[id="td_datos_2"]').text(document.getElementById('inptMasRefTelefCliente').value)
	$(elementoAddMasReferencias).children('td[id="td_datos_1"]').text(document.getElementById('inptMasRefObservacionCliente').value)
	document.getElementById("btnAddMasReferencias1").style.display=""
		document.getElementById("btnAddMasReferencias2").style.display="none"
		document.getElementById("btnAddMasReferencias3").style.display="none"
		document.getElementById("btnAddMasReferencias4").style.display="none"
		LimpiarMasReferencia()
}
function EliminarMasReferencia(){
	$(elementoAddMasReferencias).remove()
	document.getElementById("btnAddMasReferencias1").style.display=""
		document.getElementById("btnAddMasReferencias2").style.display="none"
		document.getElementById("btnAddMasReferencias3").style.display="none"
		document.getElementById("btnAddMasReferencias4").style.display="none"
		LimpiarMasReferencia()
}
function CancelarMasReferencia(){
	document.getElementById("btnAddMasReferencias1").style.display=""
		document.getElementById("btnAddMasReferencias2").style.display="none"
		document.getElementById("btnAddMasReferencias3").style.display="none"
		document.getElementById("btnAddMasReferencias4").style.display="none"
		LimpiarMasReferencia()
}
function LimpiarMasReferencia(){
	document.getElementById('inptMasRefDireccionCliente').value="";
	document.getElementById('inptMasRefReferenciaCliente').value="";
	document.getElementById('inptMasRefTelefCliente').value="";
	document.getElementById('inptMasRefObservacionCliente').value="";
	document.getElementById('inptMasRefObservacionCliente').value="";
	elementoAddMasReferencias="";
}
function  abmmasreferenciascliente(idcliente){
	  var datos = new FormData();
	var control=1;
	$("tr[name=tdMasReferencias]").each(function(i, elementohtml){
	
	var observacion=$(elementohtml).children('td[id="td_datos_1"]').html();
    datos.append("observacion"+control, observacion)
	
	var telefono=$(elementohtml).children('td[id="td_datos_2"]').html();
    datos.append("telefono"+control, telefono)

	var direccion=$(elementohtml).children('td[id="td_datos_3"]').html();
    datos.append("direccion"+control, direccion)
	
	var referencia=$(elementohtml).children('td[id="td_datos_4"]').html();
    datos.append("referencia"+control, referencia)
	
	var Tipo=$(elementohtml).children('td[id="td_datos_5"]').html();
    datos.append("Tipo"+control, Tipo)
	
	control=control+1;	
	
	   });
	control=control-1;
	

	
	verCerrarEfectoCargando("1")
	
			obtener_datos_user();
			
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "addmasreferencias")
			 datos.append("idcliente" , idcliente)
			  datos.append("totalCargado" , control)
	
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
						verCerrarEfectoCargando("")
					 manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

					 return false;
			},
			success: function(responseText)
			{
			  	 verCerrarEfectoCargando("")
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {		
			
				
			}			
			}catch(error)
				{
					 ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				} 
					
			}
			});
			
	
}
function buscarmasreferenciasclientes(){
		 document.getElementById("table_mas_referenciasClientes").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idAbmCliente,
			"funt": "buscarmasreferencias",
			"formato": "json"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_referenciasClientes").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_mas_referenciasClientes").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		   var datos_buscados=datos[2];		 
			renderReferenciasCliente(datos_buscados, false);
			
			}
			}catch(error)
				{
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});
	
	
}


/* REFERENCIAS COMERCIALES */
function AnhadirMasReferenciasCom(){
	var inptMasRefComDireccionCliente=document.getElementById("inptMasRefComDireccionCliente").value
	var inptMasRefComReferenciaCliente=document.getElementById("inptMasRefComReferenciaCliente").value
	var inptMasRefComTelefCliente=document.getElementById("inptMasRefComTelefCliente").value
	var inptMasRefComObservacionCliente=document.getElementById("inptMasRefComObservacionCliente").value
	var inptMasRefComTipoCliente=document.getElementById("inptMasRefComTipoCliente").value
	
	
	var nroid=Math.floor((Math.random() * 1000) + 1);
	var tablaFila = crearTablaFilaCliente("tableRegistroSearch", "tbSelecRegistro", "tdMasReferenciasCom", "", obtenerdatosmasreferenciascom);
	tablaFila.tabla.id = "tdDetalleReferencia_" + nroid;
	tablaFila.tabla.setAttribute("border", "0");
	tablaFila.tabla.setAttribute("cellspacing", "0");
	tablaFila.tabla.setAttribute("cellpadding", "0");
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_1", inptMasRefComObservacionCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_2", inptMasRefComTelefCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_3", inptMasRefComDireccionCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_4", inptMasRefComReferenciaCliente, "20%", false);
	agregarCeldaTablaCliente(tablaFila.fila, "td_datos_5", inptMasRefComTipoCliente, "20%", false);
	document.getElementById("table_mas_referencias_comercialClientes").appendChild(tablaFila.tabla);
		LimpiarMasReferenciaCom()
}
var elementoAddMasReferenciasCom="";
function obtenerdatosmasreferenciascom(datostr){
	 $("tr[id=tbSelecRegistro]").each(function(i, td){		
		 td.className=''
		
	   });


    datostr.className='tableRegistroSelec'
	document.getElementById('inptMasRefComDireccionCliente').value=$(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptMasRefComReferenciaCliente').value=$(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptMasRefComTelefCliente').value=$(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptMasRefComObservacionCliente').value=$(datostr).children('td[id="td_datos_1"]').html();
	elementoAddMasReferenciasCom=datostr;
		document.getElementById("btnAddMasReferenciasCom1").style.display="none"
		document.getElementById("btnAddMasReferenciasCom2").style.display=""
		document.getElementById("btnAddMasReferenciasCom3").style.display=""
		document.getElementById("btnAddMasReferenciasCom4").style.display=""
		
}
function editarMasRefenciaCom(){
	$(elementoAddMasReferenciasCom).children('td[id="td_datos_3"]').text(document.getElementById('inptMasRefComDireccionCliente').value)
	$(elementoAddMasReferenciasCom).children('td[id="td_datos_4"]').text(document.getElementById('inptMasRefComReferenciaCliente').value)
	$(elementoAddMasReferenciasCom).children('td[id="td_datos_2"]').text(document.getElementById('inptMasRefComTelefCliente').value)
	$(elementoAddMasReferenciasCom).children('td[id="td_datos_1"]').text(document.getElementById('inptMasRefComObservacionCliente').value)
	document.getElementById("btnAddMasReferenciasCom1").style.display=""
		document.getElementById("btnAddMasReferenciasCom2").style.display="none"
		document.getElementById("btnAddMasReferenciasCom3").style.display="none"
		document.getElementById("btnAddMasReferenciasCom4").style.display="none"
		LimpiarMasReferenciaCom()
}
function EliminarMasReferenciaCom(){
	var id = elementoAddMasReferenciasCom.parentNode.parentNode.id;
	$("table[id="+id+"]").remove()	
	$(elementoAddMasReferenciasCom).remove()
	document.getElementById("btnAddMasReferenciasCom1").style.display=""
		document.getElementById("btnAddMasReferenciasCom2").style.display="none"
		document.getElementById("btnAddMasReferenciasCom3").style.display="none"
		document.getElementById("btnAddMasReferenciasCom4").style.display="none"
		LimpiarMasReferenciaCom()
}
function CancelarMasReferenciaCom(){
	document.getElementById("btnAddMasReferenciasCom1").style.display=""
		document.getElementById("btnAddMasReferenciasCom2").style.display="none"
		document.getElementById("btnAddMasReferenciasCom3").style.display="none"
		document.getElementById("btnAddMasReferenciasCom4").style.display="none"
		LimpiarMasReferenciaCom()
}
function LimpiarMasReferenciaCom(){
	document.getElementById('inptMasRefComDireccionCliente').value="";
	document.getElementById('inptMasRefComReferenciaCliente').value="";
	document.getElementById('inptMasRefComTelefCliente').value="";
	document.getElementById('inptMasRefComObservacionCliente').value="";
	elementoAddMasReferenciasCom="";
}
function  abmmasreferenciascomcliente(idcliente){
	  var datos = new FormData();
	var control=1;
	$("tr[name=tdMasReferenciasCom]").each(function(i, elementohtml){
	
	var observacion=$(elementohtml).children('td[id="td_datos_1"]').html();
    datos.append("observacioncom"+control, observacion)
	
	var telefono=$(elementohtml).children('td[id="td_datos_2"]').html();
    datos.append("telefonocom"+control, telefono)

	var direccion=$(elementohtml).children('td[id="td_datos_3"]').html();
    datos.append("direccioncom"+control, direccion)
	
	var referencia=$(elementohtml).children('td[id="td_datos_4"]').html();
    datos.append("referenciacom"+control, referencia)
	
	var Tipo=$(elementohtml).children('td[id="td_datos_5"]').html();
    datos.append("Tipocom"+control, Tipo)
	
	control=control+1;	
	
	   });
	control=control-1;
	

	
	console.log(control)
	
	verCerrarEfectoCargando("1")
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "addmasreferenciascom")
			 datos.append("idcliente" , idcliente)
			  datos.append("totalCargado" , control)
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
						verCerrarEfectoCargando("")
					 manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

					 return false;
			},
			success: function(responseText)
			{
			  	 verCerrarEfectoCargando("")
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {		
			
				
			}			
			}catch(error)
				{
					 ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				} 
					
			}
			});
			
	
}
function buscarmasreferenciascomclientes(){
		 document.getElementById("table_mas_referencias_comercialClientes").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idAbmCliente,
			"funt": "buscarmasreferenciascom",
			"formato": "json"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
			
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_referencias_comercialClientes").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_mas_referencias_comercialClientes").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		   var datos_buscados=datos[2];		 
			renderReferenciasCliente(datos_buscados, true);
			
			}
			}catch(error)
				{
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});
	
	
}




function verificarcamposCliente(){
	var inptFechaNacCliente=document.getElementById('inptFechaNacCliente').value
	var inptNombreCliente=document.getElementById('inptNombreCliente').value
	var inptApellidoCliente=document.getElementById('inptApellidoCliente').value
	var inptNroDocCliente=document.getElementById('inptNroDocCliente').value
	var inptNroRucCliente=document.getElementById('inptNroRucCliente').value
	var inptNroTelefCliente=document.getElementById('inptNroTelefCliente').value
	var inptNrowhatsappCliente=document.getElementById('inptNrowhatsappCliente').value
	var inptDireccionCliente=document.getElementById('inptDireccionCliente').value
	var inptReferenciaCliente=document.getElementById('inptReferenciaCliente').value
	var inptCalificaCliente=document.getElementById('inptCalificaCliente').value
	var inptEstadoCliente=document.getElementById('inptEstadoCliente').value
	var inptLugrarTrabajoCliente=document.getElementById('inptLugrarTrabajoCliente').value
	var inptDireccionTrabajoCliente=document.getElementById('inptDireccionTrabajoCliente').value
	var inptSalarioCliente=document.getElementById('inptSalarioCliente').value
	var inptAntiguedadCliente=document.getElementById('inptAntiguedadCliente').value
	var inptNroTelefTrabajoCliente1=document.getElementById('inptNroTelefTrabajoCliente1').value
	var inptNroTelefTrabajoCliente2=document.getElementById('inptNroTelefTrabajoCliente2').value
	var inptAccesoCreditoCliente = document.getElementById('inptAccesoCreditoCliente').value
	var inptInformacionExtraCliente = document.getElementById('inptInformacionExtraCliente').value
	var inpttipo_viviendaCliente = document.getElementById('inpttipo_viviendaCliente').value
	var inptTipoCliente = document.getElementById('inptTipoCliente').value
	var inptTipoPersonaEquifaxCliente = document.getElementById('inptTipoPersonaEquifaxCliente').value
	var inptProfesionCliente = document.getElementById('inptProfesionCliente').value
	var inptTipoEmpleadoCliente = document.getElementById('inptTipoEmpleadoCliente').value
	var inptCargoCliente = document.getElementById('inptCargoCliente').value
	
	
	
	var sms="";
		if(document.getElementById('inptSeleccSMS1').checked==true){
			sms="SI";
		}else{
			sms="NO";	
		}
		


  if(inptTipoPersonaEquifaxCliente=="PERSONA" && inptProfesionCliente==""){
	ver_vetana_informativa("FALTO SELECCIONAR LA PROFESION DEL CLIENTE")
	  return false;
  }
  
 
   if(inptNombreCliente==""){
	ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL CLIENTE")
	  return false;
  }
   
   
   if(inptTipoPersonaEquifaxCliente=="PERSONA" && inptApellidoCliente==""){
	ver_vetana_informativa("FALTO INGRESAR EL APELLIDO DEL CLIENTE")
	  return false;
  }
  
  
  if(inptTipoPersonaEquifaxCliente=="PERSONA" && inptNroDocCliente==""){
	ver_vetana_informativa("FALTO INGRESAR EL NRO DE DOCUMENTO")
	  return false;
  }

  if(inptTipoPersonaEquifaxCliente=="EMPRESA" && inptNroRucCliente==""){
	ver_vetana_informativa("FALTO INGRESAR EL RUC DE LA EMPRESA")
	  return false;
  }
  
  
  if(idFKZona==""){
	ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
	  return false;
  }
  
 
 
  var accion="";
  if(idAbmCliente!=""){
	  accion="editar";
	 	if(controlacceso("EDITARLISTADODECLIENTES","accion")==false){return;}
  }else{
	 if(controlacceso("INSERTARLISTADODECLIENTES","accion")==false){return;}
	  accion="nuevo";
  }
  
  abmcliente(inptTipoPersonaEquifaxCliente,inptProfesionCliente,inptTipoEmpleadoCliente,inptCargoCliente,inptTipoCliente,inptInformacionExtraCliente,inpttipo_viviendaCliente,inptFechaNacCliente,sms,inptAccesoCreditoCliente,inptLugrarTrabajoCliente,inptDireccionTrabajoCliente,inptSalarioCliente,inptAntiguedadCliente,inptNroTelefTrabajoCliente1,inptNroTelefTrabajoCliente2,idFKZona,inptNombreCliente,inptApellidoCliente,inptNroRucCliente,inptNroDocCliente,inptNroTelefCliente,inptNrowhatsappCliente,inptDireccionCliente,inptReferenciaCliente,inptCalificaCliente,inptEstadoCliente,idAbmCliente,accion);
}
function  abmcliente(tipo_persona_equifax,profesion,tipo_empleado,cargo,tipo_cliente,informacion_extra,tipo_vivienda,FechaNac,sms,accesocredito,lugardetrabajo,direcciontrab,salario,antiguedad,teleftrab1,teleftrab2,idzonaFk,nombre_persona,apellido_persona,rut_cliente,ci_cliente,telefono,whapp,direccion,email,Calificacion,estado,cod_persona,accion){
	verCerrarEfectoCargando("1")
	

	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			 datos.append("cod_persona" , cod_persona)
			  datos.append("nombre_persona" , nombre_persona)
			  datos.append("apellido_persona" , apellido_persona)
			 datos.append("direccion" , direccion)
			 datos.append("FechaNac" , FechaNac)
			 datos.append("telefono" , telefono)
			 datos.append("email" , email)//Sirve para la referencia
			 datos.append("rut_cliente" , rut_cliente)
			 datos.append("ci_cliente" , ci_cliente)
			 datos.append("Calificacion" , Calificacion)
			 datos.append("whapp" , whapp)
			 datos.append("estado" , estado)
			 datos.append("idzonaFk" , idzonaFk)
			datos.append("foto1", fotocliente1)
			datos.append("sms", sms)
	datos.append("ext1", extcliente1)
	datos.append("foto2", fotocliente2)
	datos.append("ext2", extcliente2)		
	datos.append("lugardetrabajo", lugardetrabajo)		
	datos.append("direcciontrab", direcciontrab)		
	datos.append("salario", salario)		
	datos.append("antiguedad", antiguedad)		
	datos.append("teleftrab1", teleftrab1)		
	datos.append("teleftrab2", teleftrab2)		
	datos.append("accesocredito", accesocredito)			
	datos.append("nombremadre", "")			
	datos.append("nombrepadre", "")			
	datos.append("informacion_extra", informacion_extra)			
	datos.append("tipo_vivienda", tipo_vivienda)			
	datos.append("tipo_cliente", tipo_cliente)			
	datos.append("tipo_persona_equifax", tipo_persona_equifax)
	datos.append("profesion", profesion)
	datos.append("tipo_empleado", tipo_empleado)
	datos.append("cargo", cargo)
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
			 
		
				error: function(jqXHR, textstatus, errorThrowm){
						verCerrarEfectoCargando("")
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  	 verCerrarEfectoCargando("")
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				borradorNuevoClienteSolicitudCredito=false;
				
				idAbmCliente = datos["2"];
				
				var control=0;
				$("tr[name=tdDetalleItemImagen]").each(function(i, elementohtml){
					if($(elementohtml).children('td[id="td_id_2"]').html()==""){
						control++;
					}
				});
				
				if(control > 0){
					VerificarCargarFotosCliente(idAbmCliente)
				}
				
				
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				abmmasreferenciascliente(idAbmCliente)
				abmmasreferenciascomcliente(idAbmCliente)
				
				
				if(controlseleccvistacliente=="garante"){
					document.getElementById("divAbmCliente").style.display="none"
					buscarvistacliente()
				return
				}
				
				if(controlseleccvistacliente=="Credito"){
					document.getElementById("divAbmCliente").style.display="none"
					buscarvistacliente()
				return
				}
				
				if(controlseleccvistacliente=="Solicitud_garante"){
					document.getElementById("divAbmCliente").style.display="none"
					buscarvistacliente()
				return
				}
				
				if(controlseleccvistacliente=="venta"){
					document.getElementById("divAbmCliente").style.display="none"
					
		document.getElementById('inptClienteVenta').value = nombre_persona + " " + apellido_persona;
		document.getElementById('inptClienteVenta2').value = nombre_persona + " " + apellido_persona;
		document.getElementById('inptDocClienteVenta').value = ci_cliente
		document.getElementById('inptDocClienteVenta2').value = ci_cliente
		document.getElementById('inptDireccionVenta').value = direccion
		document.getElementById('inptTelefVenta').value = telefono
		idFkCliente = idAbmCliente
			    vercerrarvistacliente("","")
				}else{
					idAbmCliente="";
					
			 
					buscarabmCliente( )
				
				}

limpiarcamposCliente()
			}
			
			}catch(error)
				{
					 ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
		 
					
			}
			});
			
	
}
function checkestadoClientes(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarCliente1').checked=true
		document.getElementById('inptSeleccEstadoBuscarCliente2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarCliente1').checked=false
		document.getElementById('inptSeleccEstadoBuscarCliente2').checked=true
	}
}
var registrocargadoclientes="";
var totalregistroclientes="";
var controldebusquedadClientes=false
function cancelarCargaClientes(){
	controldebusquedadClientes=false
	document.getElementById("divProgressClientes").style.backgroundColor='#ff5722'
}

 

function buscarabmCliente(){
if(controlacceso("BUSCARLISTADODECLIENTES","accion")==false){return;}


var codigo=document.getElementById('inptBuscarAbmCliente1').value
					var documento=document.getElementById('inptBuscarAbmCliente2').value
					var cliente=document.getElementById('inptBuscarAbmCliente3').value
					var zona=document.getElementById('inptBuscarAbmCliente4').value
					var accesocredito=document.getElementById('inptBuscarAbmCliente5').value
					var calificacion=document.getElementById('inptBuscarAbmCliente6').value
					var tipo_cliente=document.getElementById('inptBuscarAbmCliente7').value
					var tipo_persona_equifax=document.getElementById('inptBuscarTipoPersonaEquifaxCliente').value
					var faja=document.getElementById('inptBuscarAbmCliente8').value
					var profesion=document.getElementById('inptBuscarAbmCliente9').value
					var estado="";
					if(document.getElementById('inptSeleccEstadoBuscarCliente1').checked==true){
					estado="Activo"
					}else{
					estado="Inactivo"	
					}

 

if(controldebusquedadClientes==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadClientes=true
		 document.getElementById("table_abm_clientes").innerHTML=paginacargando
		 	document.getElementById("tbProcessClientes").style.display="none"
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"codigo": codigo,
			"documento": documento,
			"cliente": cliente,
			"zona": zona,
			"estado": estado,
			"calificacion": calificacion,
			"accesocredito": accesocredito,
			"tipo_cliente": tipo_cliente,
			"tipo_persona_equifax": tipo_persona_equifax,
			"faja": faja,
			"profesion": profesion,
			"funt": "buscar"
			};
			
			
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_clientes").innerHTML=''
			controldebusquedadClientes=false
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_abm_clientes").innerHTML=''
		try{	
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		  var datos_buscados=datos[2];		 
		 	 
			document.getElementById("table_abm_clientes").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroClientes").value=datos[3]
	
registrocargadoclientes=Number(datos[99]);
			totalregistroclientes=Number(datos[100]);
			 if(totalregistroclientes>registrocargadoclientes){
						 	var porce=((registrocargadoclientes*100)/totalregistroclientes).toFixed(0)
	document.getElementById("divProgressClientes").style.width=porce+"%"
						 document.getElementById("table_abm_clientes").innerHTML += "<div id='table_abm_mas_clientes'></div>"
						  buscarabmMasCliente();
					 }else{
						 controldebusquedadClientes=false
					 }
	  
			}
			}catch(error)
				{
					controldebusquedadClientes=false
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});
	
	
}
function buscarabmMasCliente(c){
if(controlacceso("BUSCARLISTADODECLIENTES","accion")==false){return;}
var codigo=document.getElementById('inptBuscarAbmCliente1').value
var documento=document.getElementById('inptBuscarAbmCliente2').value
var cliente=document.getElementById('inptBuscarAbmCliente3').value
var zona=document.getElementById('inptBuscarAbmCliente4').value
var accesocredito=document.getElementById('inptBuscarAbmCliente5').value
var calificacion=document.getElementById('inptBuscarAbmCliente6').value
var tipo_cliente=document.getElementById('inptBuscarAbmCliente7').value
var tipo_persona_equifax=document.getElementById('inptBuscarTipoPersonaEquifaxCliente').value
var faja=document.getElementById('inptBuscarAbmCliente8').value
var profesion=document.getElementById('inptBuscarAbmCliente9').value
var estado="";
if(document.getElementById('inptSeleccEstadoBuscarCliente1').checked==true){
estado="Activo"
}else{
estado="Inactivo"	
}
if(c=="1"){
	controldebusquedadClientes=true
}
if(controldebusquedadClientes==false){
return
}
controldebusquedadClientes=true
		 document.getElementById("table_abm_mas_clientes").innerHTML=paginacargando
		 	document.getElementById("tbProcessClientes").style.display=""
			document.getElementById("divProgressClientes").style.backgroundColor=''
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"codigo": codigo,
			"documento": documento,
			"cliente": cliente,
			"zona": zona,
			"estado": estado,
			"calificacion": calificacion,
			"registrocargado": registrocargadoclientes,
			"accesocredito": accesocredito,
			"tipo_cliente": tipo_cliente,
			"tipo_persona_equifax": tipo_persona_equifax,
			"faja": faja,
			"profesion": profesion,
			"funt": "buscarmas"
			};
			
			
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_mas_clientes").innerHTML=''
			document.getElementById("divProgressClientes").style.backgroundColor='#ff5722'
			controldebusquedadClientes=false
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_abm_mas_clientes").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		  var datos_buscados=datos[2];		 
		 	 
			document.getElementById("table_abm_mas_clientes").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroClientes").value=datos[3]
			
registrocargadoclientes=Number(datos[99]);
					
						 if(totalregistroclientes>registrocargadoclientes){
						 	var porce=((registrocargadoclientes*100)/totalregistroclientes).toFixed(0)
	document.getElementById("divProgressClientes").style.width=porce+"%"
						 document.getElementById("table_abm_mas_clientes").innerHTML += "<div id='table_abm_mas_clientes'></div>"
						 document.getElementById("table_abm_mas_clientes").id=""
						  buscarabmMasCliente();
					 }else{
						 document.getElementById("tbProcessClientes").style.display="none"
						 controldebusquedadClientes=false
					 }
	  
			}
			}catch(error)
				{
					document.getElementById("divProgressClientes").style.backgroundColor='#ff5722'
					controldebusquedadClientes=false
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});
	
	
}


function limpiarcamposCliente(){
	
	borradorNuevoClienteSolicitudCredito=false;
	document.getElementById('inptLugrarTrabajoCliente').value="";
	document.getElementById('inptSalarioCliente').value="";
	document.getElementById('inptAntiguedadCliente').value="";
	document.getElementById('inptNroTelefTrabajoCliente1').value="";
	document.getElementById('inptNroTelefTrabajoCliente2').value="";
	document.getElementById('inptNombreCliente').value="";
	document.getElementById('inptApellidoCliente').value="";
	document.getElementById('inptFechaNacCliente').value="";
	document.getElementById('inptRegistroSeleccCliente').value="";
	document.getElementById('inptNroDocCliente').value="";
	document.getElementById('inptNroRucCliente').value="";
	document.getElementById('inptNroTelefCliente').value="";
	document.getElementById('inptNrowhatsappCliente').value="";
	document.getElementById('inptDireccionCliente').value="";
	document.getElementById('inptReferenciaCliente').value="";
	document.getElementById('inptMasRefDireccionCliente').value="";
	document.getElementById('inptMasRefReferenciaCliente').value="";
	document.getElementById('inptMasRefTelefCliente').value="";
	document.getElementById('inptMasRefObservacionCliente').value="";
	document.getElementById('inptInformacionExtraCliente').value="";
	document.getElementById('inpttipo_viviendaCliente').value="";
	document.getElementById('inptTipoEmpleadoCliente').value="";
	document.getElementById('inptCargoCliente').value="";
	LimpiarMasReferencia()
	LimpiarMasReferenciaCom()
	document.getElementById('table_mas_referenciasClientes').innerHTML="";
	document.getElementById('table_mas_referencias_comercialClientes').innerHTML="";
	document.getElementById('inptCalificaCliente').value="";
	document.getElementById('inptEstadoCliente').value="Activo";
	document.getElementById('inptTipoCliente').value="FIJO";
	document.getElementById('inptTipoPersonaEquifaxCliente').value="SIN_CLASIFICAR";
	document.getElementById('inptDireccionTrabajoCliente').value="";
	document.getElementById('inptZonaCliente').value="";
	document.getElementById('inptSeleccSMS1').checked=true;
	document.getElementById('inptSeleccSMS2').checked=false;
	
	document.getElementById('btnAbmCliente').value="Guardar datos";
	 $("div[id=imgFotoCliente1]").css({"background-image":"url()"})
	  $("div[id=imgFotoCliente2]").css({"background-image":"url()"})
	idAbmCliente="";
	nombreClienteAdjunto="";
	Cod_clienteFotoFK="";
	CodClienteArchivo="";
	 fotocliente1="";
  extcliente1="";
  fotocliente2="";
  extcliente2="";
   document.getElementById('btnEditarClientes').style.backgroundColor="#b7b7b7";
   document.getElementById('btnAuditoriaClientes').style.backgroundColor="#b7b7b7";
   document.getElementById('btnUbiClientes').style.backgroundColor="#b7b7b7";
   actualizarBotonesAdjuntosCliente(false);
   
   LimpiarCamposCargarFotosCliente()
   document.getElementById('table_abm_imagen_clientes').innerHTML = "";
}


var idFkCliente = ""
var controlseleccvistacliente = ""
function cambiarCapaVistaCliente(abrir) {
	var vistaCliente = document.getElementById("divVistaCliente")
	if (!vistaCliente) {
		return
	}
	if (abrir) {
		vistaCliente.style.setProperty("z-index", "2147483000", "important")
	} else {
		vistaCliente.style.removeProperty("z-index")
	}
}
function vercerrarvistacliente(d, ventana) {
	if (d == "1") {
		
		cambiarCapaVistaCliente(true)
		document.getElementById("divVistaCliente").style.display=""
		 
		controlseleccvistacliente = ventana
	} else {
		 
		$("div[id=divVistaCliente]").fadeOut(500)
		cambiarCapaVistaCliente(false)
	}
}
function buscarvistacliente() {
	var documento = document.getElementById('inptBuscarVistaCliente1').value
	var ruc = document.getElementById('inptBuscarVistaCliente2').value
	var cliente = document.getElementById('inptBuscarVistaCliente3').value
	var telef = document.getElementById('inptBuscarVistaCliente4').value
	var campoBusquedaGeneral = document.getElementById('inptBuscarGeneralVistaCliente')
	var buscarGeneral = campoBusquedaGeneral ? campoBusquedaGeneral.value.trim() : ""
	document.getElementById("table_vista_cliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"ruc": ruc,
		"documento": documento,
		"cliente": cliente,
		"telef": telef,
		"buscar_general": buscarGeneral,
		"funt": "buscarvista",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_cliente").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_cliente").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
				var datos_buscados = datos[2];
					renderVistaCliente(datos_buscados, false);


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


var elementoCliente="";
function obtenerdatosvistacliente(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	IdClienteFKCuentas = $(datostr).children('td[id="td_id"]').html();
	var cod_tipo_mora_cliente = $(datostr).children('td[id="td_datos_22"]').html();
	if(cod_tipo_mora_cliente == "14"){
		ver_vetana_informativa("EL CLIENTE SELECCIONADO ESTÁ JUDICIALIZADO")
	}
	if(cod_tipo_mora_cliente == "13"){
		ver_vetana_informativa("EL CLIENTE SELECCIONADO ENTRO EN PROCESO DE RECUPERADOS")
	}
	if(cod_tipo_mora_cliente == "12"){
		ver_vetana_informativa("EL CLIENTE ESTA EN LA LISTA DE FALLECIDOS")
	}
    elementoCliente=datostr;
	buscarcuentasClienteCancelados()
	buscarcuentasClientePendientes()	
}
function EnviarClienteDesde() {
	if(elementoCliente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
	return;
	}
	var datostr=elementoCliente
	if (controlseleccvistacliente == "venta") {
		idFkCliente = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptClienteVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptClienteVenta2').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptDocClienteVenta').value = $(datostr).children('td[id="td_datos_2"]').html();
		document.getElementById('inptDocClienteVenta2').value = $(datostr).children('td[id="td_datos_2"]').html();	
		document.getElementById('inptDireccionVenta').value =  $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptTelefVenta').value =  $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inptAccesoCreditoVentaCliente').value =  $(datostr).children('td[id="td_datos_14"]').html();
		document.getElementById('inptLugrarTrabajoCliente').value =  $(datostr).children('td[id="td_datos_16"]').html();
		document.getElementById('inptDireccionTrabajoCliente').value =  $(datostr).children('td[id="td_datos_21"]').html();
		document.getElementById('inptSalarioCliente').value =  $(datostr).children('td[id="td_datos_17"]').html();
		document.getElementById('inptAntiguedadCliente').value =  $(datostr).children('td[id="td_datos_18"]').html();
		document.getElementById('inptNroTelefTrabajoCliente1').value =  $(datostr).children('td[id="td_datos_19"]').html();
		document.getElementById('inptNroTelefTrabajoCliente2').value =  $(datostr).children('td[id="td_datos_20"]').html();
		// document.getElementById('inptTelefVenta').value =  $(datostr).children('td[id="td_datos_4"]').html(); 
		document.getElementById("btnMasInfoClienteVenta").style.display=''
		document.getElementById("btnNuevoClienteVenta").style.display='none'
	}
	if (controlseleccvistacliente == "garante") {
		idGaranteFk = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptGaranteVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptDocGaranteVenta').value = $(datostr).children('td[id="td_datos_2"]').html();
	
	}
	
	if (controlseleccvistacliente == "Agenda") {
		cod_clienteAgenda = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptClienteAgenda').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	
	if (controlseleccvistacliente == "Presupuesto") { 
		telefonoPresupuesto= $(datostr).children('td[id="td_datos_4"]').html();
		rucPresupuesto= $(datostr).children('td[id="td_datos_2"]').html();
		document.getElementById('inptClientePresupuesto').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	
	
	if(controlseleccvistacliente=="expediente"){
		codClienteFkExpediente= $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptBuscarInfExpedientefiltro').value=$(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptBuscarInfExpedienteNroDocumento').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptBuscarInfExpedienteNroTelef').value = $(datostr).children('td[id="td_datos_4"]').html();
	
	}
	if (controlseleccvistacliente == "Credito") {
		cod_clienteFKSolicitud = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptNombreSolicitudCredito').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptNroDocSolicitudCredito').value = $(datostr).children('td[id="td_datos_2"]').html();
		document.getElementById('inptDireccionSolicitudCredito').value =  $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptNroTelefSolicitudCredito').value =  $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inptLugrarTrabajoSolicitudCredito').value =  $(datostr).children('td[id="td_datos_15"]').html();
		document.getElementById('inptDireccionTrabajoSolicitudCredito').value =  $(datostr).children('td[id="td_datos_20"]').html();
		document.getElementById('inptSalarioSolicitudCredito').value =  $(datostr).children('td[id="td_datos_16"]').html();
		document.getElementById('inptAntiguedadSolicitudCredito').value =  $(datostr).children('td[id="td_datos_17"]').html();
		document.getElementById('inptNroTelefTrabajoSolicitudCredito1').value =  $(datostr).children('td[id="td_datos_18"]').html();
		document.getElementById('inptNroTelefTrabajoSolicitudCredito2').value =  $(datostr).children('td[id="td_datos_19"]').html();
		document.getElementById('inptNrowhatsappSolicitudCredito').value =  $(datostr).children('td[id="td_datos_7"]').html();
		document.getElementById('inptFechaNacSolicitudCredito').value =  $(datostr).children('td[id="td_datos_22"]').html();
		document.getElementById('inptNroRucSolicitudCredito').value =  $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptReferenciaSolicitudCredito').value =  $(datostr).children('td[id="td_datos_5"]').html();
		
		document.getElementById('inptZonaSolicitudCredito').value =  $(datostr).children('td[id="td_datos_10"]').html();
		document.getElementById('inptTipoViviendaSolicitudCredito').value =  $(datostr).children('td[id="td_datos_24"]').html();
		idFKZona =  $(datostr).children('td[id="td_datos_9"]').html();
		
		buscarmasreferenciasSolicitudCredito(cod_clienteFKSolicitud)

	}
	
	if (controlseleccvistacliente == "Solicitud_garante") {
		idGaranteFk = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptGaranteSolicitudCredito').value = $(datostr).children('td[id="td_datos_1"]').html();
		buscar_archivos_garante()
	}
	
	if (controlseleccvistacliente == "informconf") {
		cod_clienteInformconf = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptClienteInformconf').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	
	if (controlseleccvistacliente == "clientes_foto_principal") {
		Cod_clienteFotoFK = $(datostr).children('td[id="td_id"]').html();
		buscarFotosClientePrincipal(Cod_clienteFotoFK)
		document.getElementById('inptNombreClientesFotoPrincipal').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	
	if (controlseleccvistacliente == "clientes_pdf_principal") {
		CodClienteArchivo = $(datostr).children('td[id="td_id"]').html();
		buscarArchivosCliente()
		document.getElementById('inptNombreClientesArchivosCliente').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	
	
	if (controlseleccvistacliente == "clientes_galeria") {
		cod_cliente_galeria = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptBuscarFotoGaleriaCliente').value = $(datostr).children('td[id="td_datos_1"]').html();
	}
	
	
	document.getElementById("divVistaCliente").style.display = "none"
	cambiarCapaVistaCliente(false)
	document.getElementById("table_vista_cliente").innerHTML = ""
	document.getElementById("table_clientes_cuentas1").innerHTML = ""
	document.getElementById("table_clientes_cuentas2").innerHTML = ""

}




var IdClienteFKCuentas="";
function buscarcuentasClienteCancelados() {
	document.getElementById("table_clientes_cuentas1").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": IdClienteFKCuentas,
		"funt": "buscarCuentasCanceladas",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_clientes_cuentas1").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_clientes_cuentas1").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {

				var datos_buscados = datos[2];
				renderCuentasCliente(datos_buscados, "table_clientes_cuentas1");


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarcuentasClientePendientes() {
	document.getElementById("table_clientes_cuentas2").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": IdClienteFKCuentas,
		"funt": "buscarCuentasPendientes",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_clientes_cuentas2").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_clientes_cuentas2").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];

			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
					var datos_buscados = datos[2];
					renderCuentasCliente(datos_buscados, "table_clientes_cuentas2");


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarclienteporci() {
	var buscador = document.getElementById('inptDocClienteVenta').value
	if(buscador==""){
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE DOCUMENTO ")
		return;
	}
	document.getElementById('inptDocClienteVenta').value='....'
	document.getElementById('inptClienteVenta').value='Buscandoo....'
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"funt": "buscarporci",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById('inptDocClienteVenta').value=""
	document.getElementById('inptClienteVenta').value=''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_cliente").innerHTML = ''
				document.getElementById('inptDocClienteVenta').value=""
	document.getElementById('inptClienteVenta').value=''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
				var datos_buscados = datos[2];
				if(Array.isArray(datos_buscados) && datos_buscados.length > 0){
					renderVistaCliente(datos_buscados, true);
                    obtenerdatosvistacliente(document.getElementById("trdatoClienteCi"))
					controlseleccvistacliente ="venta"
					EnviarClienteDesde()
				}else{
					ver_vetana_informativa("REGISTRO NO ENCONTRADO")
					
				}
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

