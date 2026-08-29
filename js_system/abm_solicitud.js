/*
ABM Solicitud
*/
let cod_clienteFKSolicitud
= '';

var listadoAbmSolicitudCredito = null;

function crearEstadoListadoSolicitudCredito(registro){
	var fragmento = document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.estado || ""));
	if(registro.usuario_aprueba){
		fragmento.appendChild(document.createElement("br"));
		fragmento.appendChild(document.createTextNode(registro.usuario_aprueba));
	}
	return fragmento;
}

function crearEntregaListadoSolicitudCredito(registro){
	var etiqueta = document.createElement("span");
	etiqueta.style.display = "inline-block";
	etiqueta.style.padding = "4px 8px";
	etiqueta.style.borderRadius = "999px";
	etiqueta.style.fontWeight = registro.entrega_inicial > 0 ? "800" : "700";
	etiqueta.style.fontSize = "11px";
	if(registro.entrega_inicial > 0){
		etiqueta.style.background = "#dcfce7";
		etiqueta.style.color = "#166534";
		etiqueta.appendChild(document.createTextNode("CON ENTREGA"));
		etiqueta.appendChild(document.createElement("br"));
		etiqueta.appendChild(document.createTextNode(registro.entrega_formateada || "0"));
	}else{
		etiqueta.style.background = "#f1f5f9";
		etiqueta.style.color = "#475569";
		etiqueta.textContent = "SIN ENTREGA";
	}
	return etiqueta;
}

function crearProductosListadoSolicitudCredito(registro){
	var contenedor = document.createElement("div");
	var productos = Array.isArray(registro.productos) ? registro.productos : [];
	productos.forEach(function(producto){
		contenedor.appendChild(document.createElement("br"));
		contenedor.appendChild(document.createTextNode(
			producto.numero + ") \u00a0" + producto.cantidad + "/" + (producto.producto || "") +
			"\u00a0\u00a0\u00a0" + producto.cuotas + " * " + producto.cuota_formateada +
			" = " + producto.total_formateado + "Gs.\u00a0\u00a0\u00a0"
		));
		if(producto.tipo === "COMBO"){
			var boton = document.createElement("input");
			boton.type = "button";
			boton.value = "VER";
			boton.className = "btn4";
			boton.style.width = "50px";
			boton.setAttribute("aria-label", "Ver productos del combo");
			boton.addEventListener("click", function(){
				if(typeof buscarvistacomboproductosolicitud === "function"){
					buscarvistacomboproductosolicitud(producto.cod_producto, "vista_solicitud", producto.local);
				}
			});
			contenedor.appendChild(boton);
		}
	});
	if(!productos.length){
		contenedor.textContent = registro.producto_resumen || "";
	}
	return contenedor;
}

function inicializarListadoAbmSolicitudCredito(){
	if(listadoAbmSolicitudCredito){
		return listadoAbmSolicitudCredito;
	}
	if(!window.AbmListadoCore){
		return null;
	}
	var formulario = document.getElementById("divAbmSolicitudCredito1");
	var cuerpo = document.getElementById("table_abm_solicitudCredito");
	var cabecera = document.querySelector("#tbSolicitudCredito tr");
	if(!formulario || !cuerpo || !cabecera){
		return null;
	}
	if(cuerpo.dataset.abmCoreAislado !== "1" && cuerpo.parentNode){
		var cuerpoAislado = cuerpo.cloneNode(true);
		cuerpoAislado.dataset.abmCoreAislado = "1";
		cuerpo.parentNode.replaceChild(cuerpoAislado, cuerpo);
		cuerpo = cuerpoAislado;
	}
	cabecera.id = "cabeceraAbmSolicitudCredito";
	var opciones = formulario.querySelector(".abm-estandar-menu-columnas");
	if(opciones){
		opciones.id = "opcionesColumnasSolicitudCredito";
	}
	listadoAbmSolicitudCredito = window.AbmListadoCore.crear({
		nombre: "solicitud_credito",
		idCabecera: "cabeceraAbmSolicitudCredito",
		idCuerpo: "table_abm_solicitudCredito",
		idOpcionesColumnas: "opcionesColumnasSolicitudCredito",
		ordenable: true,
		columnas: [
			{ campo: "id_solicitud", titulo: "#", ancho: "5%" },
			{ campo: "documento", titulo: "NRO DOC.", ancho: "7%" },
			{ campo: "cliente", titulo: "CLIENTE", ancho: "18%" },
			{ campo: "garante", titulo: "GARANTE", ancho: "10%" },
			{ campo: "zona", titulo: "ZONA", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "7%" },
			{ campo: "usuario_ingresa", titulo: "USUARIO", ancho: "7%" },
			{ campo: "entrega_inicial", titulo: "ENTREGA", ancho: "8%" },
			{ campo: "producto_resumen", titulo: "PRODUCTO", ancho: "18%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosSolicitudCredito",
			celdas: [
				{ id: "td_id", columna: "id_solicitud", campo: "id_solicitud", render: function(valor, registro, celda){ celda.style.backgroundColor = "#efeded"; celda.style.color = "red"; return valor; } },
				{ id: "td_datos_1", columna: "documento", campo: "documento" },
				{ id: "td_datos_2", campo: "rut", tecnica: true },
				{ id: "td_datos_3", columna: "cliente", campo: "cliente" },
				{ id: "td_datos_18", columna: "garante", campo: "garante" },
				{ id: "td_datos_4", columna: "zona", campo: "zona" },
				{ id: "td_datos_30", columna: "local", campo: "local" },
				{ id: "td_datos_31", campo: "cod_local", tecnica: true },
				{ columna: "fecha", campo: "fecha" },
				{ id: "td_datos_5", campo: "telefono", tecnica: true },
				{ id: "td_datos_6", campo: "direccion", tecnica: true },
				{ id: "td_datos_7", campo: "email", tecnica: true },
				{ id: "td_datos_8", campo: "whatsapp", tecnica: true },
				{ columna: "estado", campo: "estado", render: function(valor, registro){ return crearEstadoListadoSolicitudCredito(registro); } },
				{ id: "td_datos_9", campo: "estado", tecnica: true },
				{ id: "td_datos_10", columna: "usuario_ingresa", campo: "usuario_ingresa" },
				{ columna: "entrega_inicial", campo: "entrega_inicial", render: function(valor, registro, celda){ celda.style.textAlign = "center"; return crearEntregaListadoSolicitudCredito(registro); } },
				{ id: "td_datos_25", campo: "idzona", tecnica: true },
				{ id: "td_datos_11", campo: "lugar_trabajo", tecnica: true },
				{ id: "td_datos_12", campo: "salario_formateado", tecnica: true },
				{ id: "td_datos_13", campo: "antiguedad", tecnica: true },
				{ id: "td_datos_14", campo: "telefono_trabajo_1", tecnica: true },
				{ id: "td_datos_15", campo: "telefono_trabajo_2", tecnica: true },
				{ id: "td_datos_16", campo: "direccion_trabajo", tecnica: true },
				{ id: "td_datos_17", campo: "fecha_nacimiento", tecnica: true },
				{ id: "td_datos_19", campo: "cod_garante", tecnica: true },
				{ id: "td_datos_20", columna: "producto_resumen", campo: "producto_resumen", render: function(valor, registro){ return crearProductosListadoSolicitudCredito(registro); } },
				{ id: "td_datos_21", campo: "cod_cliente", tecnica: true },
				{ id: "td_datos_22", campo: "detalle_venta", tecnica: true },
				{ id: "td_datos_23", campo: "observacion", tecnica: true },
				{ id: "td_datos_24", campo: "observacion_trabajo", tecnica: true },
				{ id: "td_datos_26", campo: "dato_26", tecnica: true },
				{ id: "td_datos_27", campo: "cuotas", tecnica: true },
				{ id: "td_datos_28", campo: "total_venta", tecnica: true },
				{ id: "td_datos_29", campo: "documento_garante", tecnica: true },
				{ id: "td_datos_32", campo: "observacion_general", tecnica: true },
				{ id: "td_datos_33", campo: "tipo_vivienda", tecnica: true },
				{ id: "td_datos_34", campo: "monto_referencia_formateado", tecnica: true },
				{ id: "td_datos_35", campo: "entrega_formateada", tecnica: true }
			]
		}
	});
	listadoAbmSolicitudCredito.iniciar();
	return listadoAbmSolicitudCredito;
}

function programarListadoAbmSolicitudCredito(){
	setTimeout(inicializarListadoAbmSolicitudCredito, 0);
}
if(document.readyState === "loading"){
	document.addEventListener("DOMContentLoaded", programarListadoAbmSolicitudCredito);
}else{
	programarListadoAbmSolicitudCredito();
}

function crearTablaSecundariaSolicitud(indice){
	var tabla=document.createElement("table");
	tabla.className=indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border","1");
	tabla.setAttribute("cellspacing","1");
	tabla.setAttribute("cellpadding","5");
	return tabla;
}
function agregarCeldaSolicitud(fila,id,valor,ancho,oculta){
	var celda=document.createElement("td");
	if(id){celda.id=id;}
	if(ancho){celda.style.width=ancho;}
	if(oculta){celda.style.display="none";}
	celda.textContent=valor==null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}
function renderReferenciasSolicitudCredito(registros){
	var cuerpo=document.getElementById("table_mas_referenciasSolicitudCredito");
	if(!cuerpo){return;}
	while(cuerpo.firstChild){cuerpo.removeChild(cuerpo.firstChild);}
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro,indice){
		var tabla=crearTablaSecundariaSolicitud(indice);
		if(registro.incompleta){tabla.style.backgroundColor="#ff9090";}
		var fila=document.createElement("tr"); fila.id="tbSelecRegistro"; fila.setAttribute("name","tdMasReferenciasSolicitudCredito");
		fila.addEventListener("click",function(){obtenerdatosRefSolicitudCredito(fila);});
		agregarCeldaSolicitud(fila,"td_datos_1",registro.observacion_corta,"10%",false);
		agregarCeldaSolicitud(fila,"td_datos_2",registro.telefono,"10%",false);
		agregarCeldaSolicitud(fila,"td_datos_3",registro.direccion,"10%",false);
		agregarCeldaSolicitud(fila,"td_datos_4",registro.referencia,"10%",false);
		agregarCeldaSolicitud(fila,"td_datos_5",registro.tipo,"10%",false);
		agregarCeldaSolicitud(fila,"td_datos_7",registro.monto_formateado,"10%",false);
		agregarCeldaSolicitud(fila,"td_id",registro.codigo,null,true);
		agregarCeldaSolicitud(fila,"td_datos_6",registro.observacion,null,true);
		tabla.appendChild(fila); fragmento.appendChild(tabla);
	});
	cuerpo.appendChild(fragmento);
}
function renderProductosSolicitudCredito(registros,anexar){
	var cuerpo=document.getElementById("table_Solicitud_Credito_Producto");
	if(!cuerpo){return;}
	if(!anexar){while(cuerpo.firstChild){cuerpo.removeChild(cuerpo.firstChild);}}
	var indiceBase=anexar ? cuerpo.children.length : 0;
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro,indice){
		var tabla=crearTablaSecundariaSolicitud(indiceBase+indice);
		var fila=document.createElement("tr"); fila.id="tbSelecRegistro"; fila.setAttribute("name","tdDetalleSolicitudCredito");
		fila.addEventListener("click",function(){obtenerdatosProductoCredito(fila);});
		agregarCeldaSolicitud(fila,"td_id_1",registro.codigo_producto,null,true);
		agregarCeldaSolicitud(fila,"td_datos_1",registro.codigo_barra,"20%",false);
		agregarCeldaSolicitud(fila,"td_datos_2",registro.producto,"40%",false);
		agregarCeldaSolicitud(fila,"td_datos_3",registro.cantidad,"10%",false);
		agregarCeldaSolicitud(fila,"td_datos_4",registro.precio_formateado,"20%",false);
		agregarCeldaSolicitud(fila,"td_id_2",registro.codigo_detalle,null,true);
		var cuota=agregarCeldaSolicitud(fila,"td_datos_5",registro.cuotas,"10%",false); var cuotaOriginal=registro.cuotas_original == null ? registro.cuotas : registro.cuotas_original; cuota.setAttribute("data-cuotas-original",cuotaOriginal == null ? "" : cuotaOriginal);
		agregarCeldaSolicitud(fila,"td_datos_6",registro.tipo || "NORMAL",null,true);
		var accion=agregarCeldaSolicitud(fila,"",null,"10%",false);
		if(registro.tipo === "COMBO"){
			var boton=document.createElement("input"); boton.type="button"; boton.value="VER"; boton.className="btn4"; boton.style.width="50px"; boton.setAttribute("aria-label","Ver productos del combo");
			boton.addEventListener("click",function(event){event.stopPropagation(); buscarvistacomboproductosolicitud(registro.codigo_producto,"vista_solicitud",registro.codigo_local);}); accion.appendChild(boton);
		}
		tabla.appendChild(fila); fragmento.appendChild(tabla);
	});
	cuerpo.appendChild(fragmento);
	actualizarVistaProductosSolicitudCredito();
}
function actualizarVistaProductosSolicitudCredito(){
	if (typeof window.actualizarResumenProductosSolicitudCredito === "function") {
		window.actualizarResumenProductosSolicitudCredito();
	}
}
function mostrarListadoProductosSolicitudCredito(){
	var cuerpo=document.getElementById("table_Solicitud_Credito_Producto");
	if(!cuerpo){return;}
	var contenedor=cuerpo.parentNode;
	if(contenedor){
		contenedor.scrollTop=contenedor.scrollHeight;
		if(typeof contenedor.scrollIntoView === "function"){
			contenedor.scrollIntoView({block:"nearest",inline:"nearest"});
		}
	}
	var filas=cuerpo.querySelectorAll('tr[name="tdDetalleSolicitudCredito"]');
	var ultima=filas.length ? filas[filas.length-1] : null;
	if(ultima && typeof ultima.scrollIntoView === "function"){
		ultima.scrollIntoView({block:"nearest",inline:"nearest"});
	}
}
function renderVistaSolicitudCredito(registros){
	var cuerpo=document.getElementById("table_vista_SoliCredito");
	if(!cuerpo){return;}
	while(cuerpo.firstChild){cuerpo.removeChild(cuerpo.firstChild);}
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro,indice){
		var tabla=crearTablaSecundariaSolicitud(indice); var fila=document.createElement("tr"); fila.id="tbSelecRegistro";
		fila.addEventListener("click",function(){obtenerdatosvistaSolicitudCreditoVenta(fila);});
		var codigo=agregarCeldaSolicitud(fila,"td_id",registro.id_solicitud,"5%",false); codigo.style.backgroundColor="#efeded"; codigo.style.color="red";
		agregarCeldaSolicitud(fila,"td_datos_1",registro.documento,"10%",false);
		agregarCeldaSolicitud(fila,"td_datos_2",registro.rut,null,true);
		agregarCeldaSolicitud(fila,"td_datos_3",registro.cliente,"25%",false);
		agregarCeldaSolicitud(fila,"td_datos_4",registro.zona,null,true);
		agregarCeldaSolicitud(fila,"",registro.fecha,null,true);
		agregarCeldaSolicitud(fila,"td_datos_5",registro.telefono,null,true);
		agregarCeldaSolicitud(fila,"td_datos_6",registro.direccion,null,true);
		agregarCeldaSolicitud(fila,"td_datos_7",registro.email,null,true);
		agregarCeldaSolicitud(fila,"td_datos_8",registro.whatsapp,null,true);
		agregarCeldaSolicitud(fila,"",registro.estado+(registro.usuario_aprueba ? " "+registro.usuario_aprueba : ""),null,true);
		agregarCeldaSolicitud(fila,"td_datos_9",registro.estado,null,true);
		agregarCeldaSolicitud(fila,"td_datos_10",registro.usuario_ingresa,null,true);
		agregarCeldaSolicitud(fila,"td_datos_25",registro.idzona,null,true);
		agregarCeldaSolicitud(fila,"td_datos_11",registro.lugar_trabajo,null,true);
		agregarCeldaSolicitud(fila,"td_datos_12",registro.salario_formateado,null,true);
		agregarCeldaSolicitud(fila,"td_datos_13",registro.antiguedad,null,true);
		agregarCeldaSolicitud(fila,"td_datos_14",registro.telefono_trabajo_1,null,true);
		agregarCeldaSolicitud(fila,"td_datos_15",registro.telefono_trabajo_2,null,true);
		agregarCeldaSolicitud(fila,"td_datos_16",registro.direccion_trabajo,null,true);
		agregarCeldaSolicitud(fila,"td_datos_17",registro.fecha_nacimiento,null,true);
		agregarCeldaSolicitud(fila,"td_datos_18",registro.garante,"25%",false);
		agregarCeldaSolicitud(fila,"td_datos_19",registro.cod_garante,null,true);
		var productos=agregarCeldaSolicitud(fila,"td_datos_20",null,"35%",false); productos.appendChild(crearProductosListadoSolicitudCredito(registro));
		agregarCeldaSolicitud(fila,"td_datos_21",registro.cod_cliente,null,true);
		agregarCeldaSolicitud(fila,"td_datos_22",registro.detalle_venta,null,true);
		agregarCeldaSolicitud(fila,"td_datos_23",registro.observacion,null,true);
		agregarCeldaSolicitud(fila,"td_datos_24",registro.observacion_trabajo,null,true);
		agregarCeldaSolicitud(fila,"td_datos_26",registro.dato_26,null,true);
		agregarCeldaSolicitud(fila,"td_datos_27",registro.cuotas,null,true);
		agregarCeldaSolicitud(fila,"td_datos_28",registro.total_venta,null,true);
		agregarCeldaSolicitud(fila,"td_datos_29",registro.documento_garante,null,true);
		agregarCeldaSolicitud(fila,"td_datos_30",registro.cuotas_solicitadas,null,true);
		agregarCeldaSolicitud(fila,"td_datos_31",registro.entrega_formateada,null,true);
		tabla.appendChild(fila); fragmento.appendChild(tabla);
	});
	cuerpo.appendChild(fragmento);
}
function renderDetalleVentaDesdeSolicitud(registros){
	var cuerpo=document.getElementById("table_abm_detalle_venta");
	if(!cuerpo){return;}
	while(cuerpo.firstChild){cuerpo.removeChild(cuerpo.firstChild);}
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro,indice){
		var tabla=crearTablaSecundariaSolicitud(indice); tabla.id="tdDetalleVenta_"+(registro.id_fila || indice+1);
		var fila=document.createElement("tr"); fila.id="tbSelecRegistro"; fila.setAttribute("name","tdDetalleVentaOffline");
		fila.setAttribute("data-origen","solicitud");
		fila.addEventListener("click",function(){obtenerdatosdetalleventasolicitudcredito(fila);});
		agregarCeldaSolicitud(fila,"td_id_1",registro.codigo_producto,null,true);
		agregarCeldaSolicitud(fila,"td_id_2",registro.id_fila,null,true);
		agregarCeldaSolicitud(fila,"td_datos_8",registro.codigo_barra,"5%",false);
		agregarCeldaSolicitud(fila,"td_datos_1",registro.producto,"20%",false);
		agregarCeldaSolicitud(fila,"td_datos_6","",null,true);
		var esCombo=registro.codigo_combo!==undefined && registro.codigo_combo!==null && String(registro.codigo_combo)!=="";
		agregarCeldaSolicitud(fila,"td_datos_3",registro.precio_formateado,"10%",esCombo);
		if(esCombo){agregarCeldaSolicitud(fila,"",registro.precio_visible_formateado,"10%",false);}
		agregarCeldaSolicitud(fila,"td_datos_4",registro.cantidad,"5%",false);
		agregarCeldaSolicitud(fila,"td_datos_9",registro.descuento || 0,null,true);
		agregarCeldaSolicitud(fila,"td_datos_5",registro.total_formateado,"10%",esCombo);
		if(esCombo){agregarCeldaSolicitud(fila,"",registro.total_visible_formateado,"10%",false);}
		agregarCeldaSolicitud(fila,"td_datos_7",0,null,true);
		agregarCeldaSolicitud(fila,"td_datos_10",registro.cuotas,null,true);
		agregarCeldaSolicitud(fila,"td_datos_11",registro.promo,null,true);
		if(esCombo){agregarCeldaSolicitud(fila,"td_datos_16",registro.codigo_combo,null,true);}
		tabla.appendChild(fila); fragmento.appendChild(tabla);
	});
	cuerpo.appendChild(fragmento);
}
function renderArchivosGaranteSolicitud(registros,idContenedor){
	var cuerpo=document.getElementById(idContenedor);
	if(!cuerpo){return;}
	while(cuerpo.firstChild){cuerpo.removeChild(cuerpo.firstChild);}
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro,indice){
		var tabla=crearTablaSecundariaSolicitud(indice); var fila=document.createElement("tr"); fila.id="tbSelecRegistro";
		agregarCeldaSolicitud(fila,"",registro.descripcion,"70%",false);
		var accion=agregarCeldaSolicitud(fila,"",null,"30%",false);
		if(registro.url){var boton=document.createElement("input"); boton.type="button"; boton.value="VER"; boton.className="btn4"; boton.style.width="50px"; boton.setAttribute("aria-label","Ver "+(registro.descripcion || "archivo")); boton.addEventListener("click",function(){verdocumentoClienteSolicitud(registro.url);}); accion.appendChild(boton);}
		tabla.appendChild(fila); fragmento.appendChild(tabla);
	});
	cuerpo.appendChild(fragmento);
}

function verCerrarAbmsolicotud(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmSolicitudCredito").style.display==""){
	document.getElementById("divMinimizadoSolicitudCredito").style.display="none"
	//  
	$("div[id=divAbmSolicitudCredito]").fadeOut(500);	
	limpiarbuscarventanasolicitud();
		}else{		
	if(controlacceso("VERSOLICITUCREDITO","accion")==false){return;}
	mostrarSoloUno("divAbmSolicitudCredito")	
		document.getElementById("divAbmSolicitudCredito").style.display=""
 
	}

}
function limpiarbuscarventanasolicitud(){
	document.getElementById('inptRegistroSeleccsolicitudCredito').value = "";
	document.getElementById('inptRegistroNrosolicitudCredito').value = "";
	
	document.getElementById('btnEditarSolicitudCredito').style = "background-color:#b7b7b7";
	document.getElementById('btnEliminarSolicitudCredito').style = "background-color:#b7b7b7";
	// document.getElementById('btnAprobarSolicitudCredito').style = "background-color:#b7b7b7";
	document.getElementById('btnVenderSolicitudCredito').style = "background-color:#b7b7b7";
	
	if(listadoAbmSolicitudCredito){
		listadoAbmSolicitudCredito.establecerRegistros([], false);
	}else{
		document.getElementById('table_abm_solicitudCredito').innerHTML = "";
	}
}

function verCerrarVentanaAbmSolicitudCredito(d, l) {	
	if (d == "1") {
		if (l == "1") {
			
			limpiarcampossolicitudCredito()
		}
		
		
		$("div[id=divAbmSolicitudCredito2]").fadeIn(250)
		document.getElementById('divAbmSolicitudCredito1').style.display = "none"
	} else {
		$("div[id=divAbmSolicitudCredito1]").fadeIn(250)
		document.getElementById('divAbmSolicitudCredito2').style.display = "none"
	}
}

function checkSolicitudCredito(d){	
	if(d=="2"){
		document.getElementById('inptSeleccSolicitudCredito1').checked=false
		document.getElementById('inptSeleccSolicitudCredito2').checked=true
		document.getElementById('inptBuscarsolicitudCredito1').value = "";
	    document.getElementById('inptBuscarsolicitudCredito2').value = "";	
	}else{		
		document.getElementById('inptSeleccSolicitudCredito1').checked=true
		document.getElementById('inptSeleccSolicitudCredito2').checked=false
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarsolicitudCredito1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarsolicitudCredito2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function AnhadirMasReferenciasSolicitudCredito(){
	if(cod_clienteFKSolicitud == ""){
		ver_vetana_informativa("NINGUN CLIENTE HA SIDO SELECCIONADO");
		return;
	}
	var inptMasRefTelefSolicitudCredito=document.getElementById("inptMasRefTelefSolicitudCredito").value
	var inptMasRefDireccionSolicitudCredito=document.getElementById("inptMasRefDireccionSolicitudCredito").value
	var inptMasRefReferenciaSolicitudCredito=document.getElementById("inptMasRefReferenciaSolicitudCredito").value
	var inptMasRefObservacionSolicitudCredito=document.getElementById("inptMasRefObservacionSolicitudCredito").value
	var inptTipoRefSolicitudCredito=document.getElementById("inptTipoRefSolicitudCredito").value
	var inptObsRefSolicitudCredito=document.getElementById("inptObsRefSolicitudCredito").value
	var inptMasRefMontoSolicitudCredito=document.getElementById("inptMasRefMontoSolicitudCredito").value
	
	if(inptTipoRefSolicitudCredito==""){
		ver_vetana_informativa("FALTO SELECCIONAR TIPOS DE REFERENCIA")
		return false;
	}
	
verCerrarEfectoCargando("1")
obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"telefono": inptMasRefTelefSolicitudCredito,
		"direccion": inptMasRefDireccionSolicitudCredito,		
		"referencia": inptMasRefReferenciaSolicitudCredito,		
		"obs": inptMasRefObservacionSolicitudCredito,		
		"tipo": inptTipoRefSolicitudCredito,		
		"observacion": inptObsRefSolicitudCredito,		
		"idcliente": cod_clienteFKSolicitud,		
		"monto": inptMasRefMontoSolicitudCredito,		
		"funt": "addmasreferencias"
	};
	
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")


		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				ver_vetana_informativa('CARGADO CORRECTAMENTE');
					LimpiarSolicitudCredito()
					buscarmasreferenciasSolicitudCredito(cod_clienteFKSolicitud)
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}


function LimpiarSolicitudCredito(){
	document.getElementById('inptMasRefObservacionSolicitudCredito').value="";
	document.getElementById('inptMasRefReferenciaSolicitudCredito').value="";
	document.getElementById('inptMasRefDireccionSolicitudCredito').value="";
	document.getElementById('inptMasRefTelefSolicitudCredito').value="";
	document.getElementById('inptTipoRefSolicitudCredito').value="";
	document.getElementById('inptObsRefSolicitudCredito').value="";
	document.getElementById('inptMasRefMontoSolicitudCredito').value="";
	elementoAddRefSolicitudCredito="";
}

var elementoAddRefSolicitudCredito="";
function obtenerdatosRefSolicitudCredito(datostr){
	 $("tr[id=tbSelecRegistro]").each(function(i, td){		
		 td.className=''		
	   });
	   
    datostr.className='tableRegistroSelec'
	document.getElementById('inptMasRefDireccionSolicitudCredito').value=$(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptMasRefReferenciaSolicitudCredito').value=$(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptMasRefTelefSolicitudCredito').value=$(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptMasRefObservacionSolicitudCredito').value=$(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptTipoRefSolicitudCredito').value=$(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptObsRefSolicitudCredito').value=$(datostr).children('td[id="td_datos_6"]').html();
	
	document.getElementById('inptObsRefSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptMasRefMontoSolicitudCredito').value=$(datostr).children('td[id="td_datos_7"]').html();
	
	elementoAddRefSolicitudCredito=datostr;
		document.getElementById("btnAddRefSolicitudCredito1").style.display="none"
		document.getElementById("btnAddRefSolicitudCredito2").style.display=""
		document.getElementById("btnAddRefSolicitudCredito3").style.display=""
		document.getElementById("btnAddRefSolicitudCredito4").style.display=""
}



function editarRefSolicitudCredito(){
	
	/* $(elementoAddRefSolicitudCredito).children('td[id="td_datos_3"]').text(document.getElementById('inptMasRefDireccionSolicitudCredito').value)
	$(elementoAddRefSolicitudCredito).children('td[id="td_datos_4"]').text(document.getElementById('inptMasRefReferenciaSolicitudCredito').value)
	$(elementoAddRefSolicitudCredito).children('td[id="td_datos_2"]').text(document.getElementById('inptMasRefTelefSolicitudCredito').value)
	$(elementoAddRefSolicitudCredito).children('td[id="td_datos_1"]').text(document.getElementById('inptMasRefObservacionSolicitudCredito').value)
	$(elementoAddRefSolicitudCredito).children('td[id="td_datos_5"]').text(document.getElementById('inptTipoRefSolicitudCredito').value)
	
	$(elementoAddRefSolicitudCredito).children('td[id="td_datos_6"]').text(document.getElementById('inptObsRefSolicitudCredito').value) */
	
	if(elementoAddRefSolicitudCredito == ""){
		ver_vetana_informativa("NINGUN REGISTRO HA SIDO SELECCIONADO");
		return;
	}
	var inptMasRefTelefSolicitudCredito=document.getElementById("inptMasRefTelefSolicitudCredito").value
	var inptMasRefDireccionSolicitudCredito=document.getElementById("inptMasRefDireccionSolicitudCredito").value
	var inptMasRefReferenciaSolicitudCredito=document.getElementById("inptMasRefReferenciaSolicitudCredito").value
	var inptMasRefObservacionSolicitudCredito=document.getElementById("inptMasRefObservacionSolicitudCredito").value
	var inptTipoRefSolicitudCredito=document.getElementById("inptTipoRefSolicitudCredito").value
	var inptObsRefSolicitudCredito=document.getElementById("inptObsRefSolicitudCredito").value
	
	if(inptTipoRefSolicitudCredito==""){
		ver_vetana_informativa("FALTO SELECCIONAR TIPOS DE REFERENCIA")
		return false;
	}
	
verCerrarEfectoCargando("1")
obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"telefono": inptMasRefTelefSolicitudCredito,
		"direccion": inptMasRefDireccionSolicitudCredito,		
		"referencia": inptMasRefReferenciaSolicitudCredito,		
		"obs": inptMasRefObservacionSolicitudCredito,		
		"tipo": inptTipoRefSolicitudCredito,		
		"observacion": inptObsRefSolicitudCredito,
		"idreferenciacliente": $(elementoAddRefSolicitudCredito).children('td[id="td_id"]').html(),		
		"funt": "editarmasreferencias"
	};
	
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")


		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				ver_vetana_informativa('CARGADO CORRECTAMENTE');
					LimpiarSolicitudCredito()
					buscarmasreferenciasSolicitudCredito(cod_clienteFKSolicitud)
					document.getElementById("btnAddRefSolicitudCredito1").style.display=""
		document.getElementById("btnAddRefSolicitudCredito2").style.display="none"
		document.getElementById("btnAddRefSolicitudCredito3").style.display="none"
		document.getElementById("btnAddRefSolicitudCredito4").style.display="none"
		// LimpiarRefSolicitudCredito()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

	
	
	
}
function EliminarRefSolicitudCredito(){
	
	// $(elementoAddRefSolicitudCredito).remove()
		if(elementoAddRefSolicitudCredito == ""){
		ver_vetana_informativa("NINGUNA REFERENCIA HA SIDO SELECCIONADA");
		return;
	}
	
	let idreferenciacliente  = $(elementoAddRefSolicitudCredito).children('td[id="td_id"]').html();
	
verCerrarEfectoCargando("1")
obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idreferenciacliente": idreferenciacliente,	
		"funt": "eliminarmasreferencia"
	};
	
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")


		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				ver_vetana_informativa('CARGADO CORRECTAMENTE');
					LimpiarSolicitudCredito()
					buscarmasreferenciasSolicitudCredito(cod_clienteFKSolicitud)
					// elementoAddRefSolicitudCredito = '';
					
					document.getElementById("btnAddRefSolicitudCredito1").style.display=""
		document.getElementById("btnAddRefSolicitudCredito2").style.display="none"
		document.getElementById("btnAddRefSolicitudCredito3").style.display="none"
		document.getElementById("btnAddRefSolicitudCredito4").style.display="none"
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function CancelarRefSolicitudCredito(){
		document.getElementById("btnAddRefSolicitudCredito1").style.display=""
		document.getElementById("btnAddRefSolicitudCredito2").style.display="none"
		document.getElementById("btnAddRefSolicitudCredito3").style.display="none"
		document.getElementById("btnAddRefSolicitudCredito4").style.display="none"
		
		 $("tr[name=tdMasReferenciasSolicitudCredito]").each(function(i, td){		
		 td.className=''
	   });
    elementoAddRefSolicitudCredito.className='tableRegistroSelec'
		LimpiarRefSolicitudCredito()
}




function LimpiarRefSolicitudCredito(){
	document.getElementById('inptMasRefDireccionSolicitudCredito').value="";
	document.getElementById('inptMasRefReferenciaSolicitudCredito').value="";
	document.getElementById('inptMasRefTelefSolicitudCredito').value="";
	document.getElementById('inptMasRefObservacionSolicitudCredito').value="";
	document.getElementById('inptTipoRefSolicitudCredito').value="";
	document.getElementById('inptObsRefSolicitudCredito').value="";
	elementoAddRefSolicitudCredito="";
}


var cantidadCuotaSolicitud=""
var codLocalPrecioProductoSolicitud=""
var listadoVistaProductoSolicitudCredito = null;
function iniciarListadoVistaProductoSolicitudCredito() {
	if (listadoVistaProductoSolicitudCredito) return listadoVistaProductoSolicitudCredito;
	if (typeof window.crearListadoVistaProductos !== "function") return null;
	window.obtenerdatosvistaproductodesdeSolicitudCredito = seleccionarProductoVistaSolicitudCredito;
	listadoVistaProductoSolicitudCredito = window.crearListadoVistaProductos({
		nombre: "vista_producto_solicitud_credito",
		idCuerpo: "table_vista_ProDuc_Solicitud_Credito",
		idCabecera: "cabeceraVistaProductoSolicitudCredito",
		funcionSeleccion: "obtenerdatosvistaproductodesdeSolicitudCredito",
		campoPrecioTecnico: "precio_contado_formateado",
		abrirCombo: function (registro) { buscarvistacomboproductosolicitud(registro.codigo, "solicitud", registro.codigo_local); },
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "15%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "40%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "20%" },
			{ campo: "precio_contado", titulo: "PRECIO", ancho: "15%", id: "td_datos_4", valor: function (r) { return r.precio_contado_formateado; } },
			{ campo: "stock", titulo: "STOCK", ancho: "5%", id: "td_datos_6", valor: function (r) { return r.stock; } },
			{ campo: "combo", titulo: "COMBO", ancho: "5%", id: "td_datos_16", tipo: "combo" }
		]
	});
	return listadoVistaProductoSolicitudCredito;
}
function obtenerCeldaVistaProductoSolicitudCredito(datostr, idCelda) {
	var celda = $(datostr).children('td[id="' + idCelda + '"]');
	var valor = celda.length ? celda.html() : "";
	return valor == null || valor == undefined ? "" : valor;
}
function precioValidoSolicitudCredito(valor) {
	var precio = valor == null || valor == undefined ? "" : String(valor).replace(/\s+/g, "").trim();
	var numero = parseInt(precio.replace(/[^0-9-]/g, ""), 10);
	return precio !== "" && !isNaN(numero) && numero > 0;
}
function obtenerLocalPrecioSolicitudCredito() {
	var localSolicitud = document.getElementById("inptLocalVentaSolicitudCredito");
	if (codLocalPrecioProductoSolicitud != "") {
		return codLocalPrecioProductoSolicitud;
	}
	if (localSolicitud && localSolicitud.value != "") {
		return localSolicitud.value;
	}
	return typeof cod_localFKUSer !== "undefined" ? cod_localFKUSer : "";
}
function obtenerCuotasDisponiblesSolicitudCredito() {
	var selector = document.getElementById("inpTPrecioSolicitud");
	var cuotas = [];
	if (!selector) {
		return "";
	}
	for (var i = 0; i < selector.options.length; i++) {
		var cuota = selector.options[i].getAttribute("id");
		if (cuota != "" && cuota != null && cuotas.indexOf(cuota) === -1) {
			cuotas.push(cuota);
		}
	}
	return cuotas.join(", ");
}
function aplicarPrecioOpcionSolicitudCredito(cuota, permitirPrimeraOpcion) {
	var selector = document.getElementById("inpTPrecioSolicitud");
	if (!selector || selector.options.length === 0) {
		return false;
	}
	var cuotaTexto = cuota == null || cuota == undefined ? "" : String(cuota).trim();
	var opcion = null;
	if (cuotaTexto != "") {
		for (var i = 0; i < selector.options.length; i++) {
			if (String(selector.options[i].getAttribute("id")) === cuotaTexto) {
				opcion = selector.options[i];
				break;
			}
		}
	} else if (permitirPrimeraOpcion) {
		opcion = selector.options[selector.selectedIndex >= 0 ? selector.selectedIndex : 0];
	}
	if (!opcion || !precioValidoSolicitudCredito(opcion.value)) {
		return false;
	}
	selector.value = opcion.value;
	document.getElementById("inptRefproductoPrecio").value = opcion.value;
	if (opcion.getAttribute("id") != "" && opcion.getAttribute("id") != null) {
		document.getElementById("inptCantidadCuotaSolicitud").value = opcion.getAttribute("id");
	}
	return true;
}
function mostrarErrorPrecioSolicitudCredito(cuota) {
	var cuotasDisponibles = obtenerCuotasDisponiblesSolicitudCredito();
	var detalleCuota = cuota != "" && cuota != null && cuota != undefined ? " PARA " + cuota + " CUOTAS" : "";
	var detalleDisponibles = cuotasDisponibles != "" ? ". CUOTAS DISPONIBLES: " + cuotasDisponibles : "";
	ver_vetana_informativa("NO SE ENCONTRO PRECIO" + detalleCuota + " EN EL LOCAL SELECCIONADO" + detalleDisponibles);
}
function seleccionarProductoVistaSolicitudCredito(datostr) {
	$("tr[id=tbSelecRegistro]").each(function(i, td){
		td.className = "";
	});
	datostr.className = "tableRegistroSelec";
	idFkProducto = obtenerCeldaVistaProductoSolicitudCredito(datostr, "td_id");
	codLocalPrecioProductoSolicitud = obtenerCeldaVistaProductoSolicitudCredito(datostr, "td_datos_7");
	document.getElementById('inptRefCodProducto').value = obtenerCeldaVistaProductoSolicitudCredito(datostr, "td_datos_13");
	document.getElementById('inptRefNombreProducto').value = obtenerCeldaVistaProductoSolicitudCredito(datostr, "td_datos_1");
	document.getElementById('inpTPrecioSolicitud').innerHTML = obtenerCeldaVistaProductoSolicitudCredito(datostr, "td_datos_11");
	document.getElementById('inptRefproductoPrecio').value = obtenerCeldaVistaProductoSolicitudCredito(datostr, "td_datos_4");
	document.getElementById('inptRefCantidadProducto').value = "1";
	if (!aplicarPrecioOpcionSolicitudCredito(document.getElementById('inptCantidadCuotaSolicitud').value, true)) {
		document.getElementById('inptRefproductoPrecio').value = "";
	}
	buscardetallespreciossolicitud();
	document.getElementById('btnADDProductoSolicitudCredito').style.backgroundColor = "#2196F3";
	document.getElementById('inptRefCantidadProducto').focus();
}
function obtenerdatosvistaproductodesdeSolicitudCredito(datostr) {
	seleccionarProductoVistaSolicitudCredito(datostr);
}
function buscarvistaventaSolicitud() {
	var buscador = document.getElementById('inptRefNombreProducto').value
	var local = document.getElementById("inptLocalVentaSolicitudCredito").value;
	var ConDescuento="NO";
	if(document.getElementById("checkDescuentoSolicitudCredito").checked==true){
		ConDescuento="SI";
	} 
	cantidadCuotaSolicitud=document.getElementById('inptCantidadCuotaSolicitud').value;
	
	document.getElementById("table_vista_ProDuc_Solicitud_Credito").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"ConDescuento": ConDescuento,
		"cantidadCuotaSolicitud": cantidadCuotaSolicitud,		
		"local": local,
		"formato": "json",
		"funt": "buscarvistaventaSolicitud"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_ProDuc_Solicitud_Credito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_ProDuc_Solicitud_Credito").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
				if(hayRegistros){
				var listado = iniciarListadoVistaProductoSolicitudCredito();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_ProDuc_Solicitud_Credito").innerHTML = datos_buscados || "";
			 	document.getElementById('btnADDProductoSolicitudCredito').focus();
				}else{
					ver_vetana_informativa("PRODUCTO NO ECONTRADO")
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



function buscardetallespreciossolicitud() {

	// document.getElementById("inptRefproductoPrecio").innerHTML = ""
	if(idFkProducto==""){
		return;
	}
	
	var ConDescuento="NO";
	if(document.getElementById("checkDescuentoSolicitudCredito").checked==true){
		ConDescuento="SI";
	} 
	cantidadCuotaSolicitud = document.getElementById("inptCantidadCuotaSolicitud").value
	if(cantidadCuotaSolicitud == ""){
		if(!aplicarPrecioOpcionSolicitudCredito("", true)){
			document.getElementById("inptRefproductoPrecio").value = "";
			ver_vetana_informativa("FALTO INGRESAR CANTIDAD DE CUOTAS")
		}
		return;
	}
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_productoSolicitud": idFkProducto,
		"cantidadCuotaSolicitud": cantidadCuotaSolicitud,
		"cod_localFK": obtenerLocalPrecioSolicitudCredito(),
		"ConDescuento": ConDescuento,
		"funt": "buscardetallespreciossolicitud"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			// document.getElementById("inptRefproductoPrecio").innerHTML = ''
		
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			// document.getElementById("inptRefproductoPrecio").innerHTML = ''
			
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
				   
				  var producto= document.getElementById("inptRefNombreProducto").value
				   
				   if(!precioValidoSolicitudCredito(datos_buscados) ){
						if(!aplicarPrecioOpcionSolicitudCredito(cantidadCuotaSolicitud, false)){
					  	document.getElementById("inptRefproductoPrecio").value = ""
							mostrarErrorPrecioSolicitudCredito(cantidadCuotaSolicitud)
						}
				   }else{
						document.getElementById("inptRefproductoPrecio").value = datos_buscados
				   }
					
					
				}else{
					document.getElementById("inptRefproductoPrecio").value = ""
					ver_vetana_informativa("NO SE PUDO OBTENER EL PRECIO DEL PRODUCTO")
				}
			} catch (error) {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});


}



function obtenerMontoEntregaSolicitudCredito() {
	var campoEntrega = document.getElementById('inptEntregaSolicitudCredito');
	if (!campoEntrega) {
		return 0;
	}
	var entrega = QuitarSeparadorMilValor(campoEntrega.value);
	entrega = parseInt(entrega);
	if (isNaN(entrega) || entrega < 0) {
		return 0;
	}
	return entrega;
}

function obtenerNumeroSolicitudCredito(valor) {
	var numero = parseFloat(QuitarSeparadorMilValor(valor));
	if (isNaN(numero)) {
		return 0;
	}
	return numero;
}

function obtenerCuotasRestantesSolicitudCredito(cantidadCuota, entrega) {
	var cuotas = parseInt(cantidadCuota);
	if (isNaN(cuotas) || cuotas <= 0) {
		return 0;
	}
	if (entrega > 0 && cuotas > 1) {
		return cuotas - 1;
	}
	return cuotas;
}

function obtenerCuotaOriginalDetalleSolicitudCredito(elementohtml) {
	var celdaCuota = $(elementohtml).children('td[id="td_datos_5"]');
	var cuotaOriginal = celdaCuota.attr("data-cuotas-original");
	if (cuotaOriginal == "" || cuotaOriginal == undefined || cuotaOriginal == "undefined") {
		cuotaOriginal = celdaCuota.html();
		celdaCuota.attr("data-cuotas-original", cuotaOriginal);
	}
	return cuotaOriginal;
}

function actualizarResumenSolicitudCredito(totalVenta, cantidadCuota) {
	var total = parseInt(QuitarSeparadorMilValor(totalVenta));
	var cuotasOriginales = parseInt(cantidadCuota);
	var entrega = obtenerMontoEntregaSolicitudCredito();
	var resumen = document.getElementById("inptTotalSolicitudCredito");
	var campoEntrega = document.getElementById('inptEntregaSolicitudCredito');
	if (isNaN(total) || total < 0) {
		total = 0;
	}
	if (isNaN(cuotasOriginales) || cuotasOriginales <= 0) {
		cuotasOriginales = 0;
	}
	if (total > 0 && entrega > total) {
		ver_vetana_informativa("LA ENTREGA NO PUEDE SER MAYOR AL TOTAL DEL CREDITO");
		entrega = 0;
		if (campoEntrega) {
			campoEntrega.value = "0";
		}
	}
	var saldo = total - entrega;
	if (saldo < 0) {
		saldo = 0;
	}
	var cuotasParaCalculo = obtenerCuotasRestantesSolicitudCredito(cuotasOriginales, entrega);
	var textoCuota = "0 * 0";
	if (cuotasParaCalculo > 0) {
		textoCuota = cuotasParaCalculo + " * " + separadordemilesnumero(Math.round(saldo / cuotasParaCalculo));
	}
	var detalleEntrega = "<p style='font-size: 13px; margin-top: -12px; color: #c2410c; font-weight: 700;'>Entrega: " + separadordemilesnumero(entrega) + " | Saldo: " + separadordemilesnumero(saldo) + "</p>";
	resumen.innerHTML = "<p>" + separadordemilesnumero(total) + "</p>" + detalleEntrega + "<br> <p style='font-size: 17px; margin-top: -20px;' >" + textoCuota + "</p> ";
	if (typeof window.actualizarResumenProductosSolicitudCredito === "function") {
		window.actualizarResumenProductosSolicitudCredito();
	}
}

function recalcularTotalesSolicitudCredito() {
	var totalVenta = 0;
	var cuotasOriginales = document.getElementById('inptCantidadCuotaSolicitud').value;
	var entrega = obtenerMontoEntregaSolicitudCredito();
	var cantidadRegistros = 0;
	$("tr[name=tdDetalleSolicitudCredito]").each(function(i, elementohtml){
		var cantidad = obtenerNumeroSolicitudCredito($(elementohtml).children('td[id="td_datos_3"]').html());
		var precio = obtenerNumeroSolicitudCredito($(elementohtml).children('td[id="td_datos_4"]').html());
		var cuotaDetalle = obtenerCuotaOriginalDetalleSolicitudCredito(elementohtml);
		if(cuotaDetalle != "" && cuotaDetalle != undefined && cuotaDetalle != "undefined"){
			cuotasOriginales = cuotaDetalle;
		}
		totalVenta = totalVenta + (precio * cantidad);
		cantidadRegistros++;
	});
	document.getElementById('inptTotalSolicitud').value = totalVenta;
	if(cantidadRegistros == 0){
		document.getElementById('inptCantidadCuotaSolicitud').disabled = false;
		actualizarResumenSolicitudCredito(0, 0);
		return {
			total: 0,
			cuotas: 0,
			registros: 0
		};
	}
	document.getElementById('inptCantidadCuotaSolicitud').disabled = true;
	var cuotasParaCalculo = obtenerCuotasRestantesSolicitudCredito(cuotasOriginales, entrega);
	actualizarResumenSolicitudCredito(totalVenta, cuotasOriginales);
	return {
		total: totalVenta,
		cuotas: cuotasParaCalculo,
		cuotasOriginales: parseInt(cuotasOriginales) || 0,
		registros: cantidadRegistros
	};
}

function actualizarEntregaSolicitudCredito(campo) {
	separadordemiles(campo);
	recalcularTotalesSolicitudCredito();
}

function cambiarModoProductoProvisionalSolicitudCredito(esProvisional) {
	var codigo = document.getElementById('inptRefCodProducto');
	var nombre = document.getElementById('inptRefNombreProducto');
	var precio = document.getElementById('inptRefproductoPrecio');
	var selectorPrecio = document.getElementById('inpTPrecioSolicitud');
	idFkProducto = "";
	codLocalPrecioProductoSolicitud = "";
	codigo.value = "";
	nombre.value = "";
	precio.value = "";
	if (selectorPrecio) {
		selectorPrecio.innerHTML = "";
		selectorPrecio.disabled = esProvisional;
	}
	nombre.placeholder = esProvisional ? "Escriba el nombre del producto inexistente" : "Buscar producto...";
	precio.disabled = false;
	nombre.focus();
}

function anhadirProductoSolicitudCredito(){	
	if (!solicitudCreditoPermiteEditarProductos()) {
		ver_vetana_informativa("NO SE PUEDE MODIFICAR PRODUCTOS DE UNA SOLICITUD FINALIZADA")
		return false;
	}
	
	var inptRefCodProducto = document.getElementById('inptRefCodProducto').value
	var inptRefNombreProducto = document.getElementById('inptRefNombreProducto').value
	var inptRefCantidadProducto = document.getElementById('inptRefCantidadProducto').value
	var inptRefproductoPrecio = document.getElementById('inptRefproductoPrecio').value
	
	var selectorPrecioSolicitud = document.getElementById('inpTPrecioSolicitud')
	var checkProvisional = document.getElementById('checkProductoProvisionalSolicitudCredito')
	var esProvisional = checkProvisional && checkProvisional.checked
	if (!esProvisional && idFkProducto == "") {
		var filaSeleccionada = document.querySelector('#table_vista_ProDuc_Solicitud_Credito tr.tableRegistroSelec');
		if (filaSeleccionada) {
			seleccionarProductoVistaSolicitudCredito(filaSeleccionada);
			inptRefCodProducto = document.getElementById('inptRefCodProducto').value;
			inptRefNombreProducto = document.getElementById('inptRefNombreProducto').value;
			inptRefCantidadProducto = document.getElementById('inptRefCantidadProducto').value;
			inptRefproductoPrecio = document.getElementById('inptRefproductoPrecio').value;
		}
	}

	var valor = document.getElementById('inptCantidadCuotaSolicitud').value;

	if(!precioValidoSolicitudCredito(inptRefproductoPrecio)){
		if(!esProvisional && aplicarPrecioOpcionSolicitudCredito(valor, true)){
			inptRefproductoPrecio = document.getElementById('inptRefproductoPrecio').value
		}
	}
	if(!precioValidoSolicitudCredito(inptRefproductoPrecio)){
				ver_vetana_informativa("ESTE PRODUCTO NO TIENE PRECIO")
				return false;
		}

	if(inptRefCantidadProducto <= 0|| inptRefCantidadProducto==""){
				ver_vetana_informativa("FAVOR AGREGAR CANTIDAD")
				return false;
		}
	

	var CuotaNro = selectorPrecioSolicitud ? $(selectorPrecioSolicitud).children(":selected").attr("id") : ""
	if (!esProvisional && idFkProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
		return false;
	}
	if (esProvisional && String(inptRefNombreProducto).trim().length < 3) {
		ver_vetana_informativa("ESCRIBA EL NOMBRE DEL PRODUCTO NO REGISTRADO")
		return false;
	}
	
	var cuotaOriginal = CuotaNro;
	if (cuotaOriginal == "" || cuotaOriginal == undefined || cuotaOriginal == "undefined") {
		cuotaOriginal = valor;
	}
	renderProductosSolicitudCredito([{
		codigo_producto:esProvisional ? "" : idFkProducto,
		codigo_barra:esProvisional ? "NO REGISTRADO" : inptRefCodProducto,
		producto:inptRefNombreProducto,
		cantidad:inptRefCantidadProducto,
		precio_formateado:inptRefproductoPrecio,
		codigo_detalle:"",
		cuotas:cuotaOriginal,
		cuotas_original:cuotaOriginal,
		tipo:esProvisional ? "PROVISIONAL" : "NORMAL",
		es_provisional:esProvisional ? 1 : 0,
		nombre_provisional:esProvisional ? inptRefNombreProducto : "",
		codigo_local:cod_localFKUSer
	}],true);
productosSolicitudModificados = true;



recalcularTotalesSolicitudCredito();
mostrarListadoProductosSolicitudCredito();


document.getElementById('inptRefCodProducto').value = ""
document.getElementById('inptRefCantidadProducto').value = ""
document.getElementById('inptRefNombreProducto').value = ""
document.getElementById('inptRefproductoPrecio').value = ""
if(selectorPrecioSolicitud){selectorPrecioSolicitud.innerHTML = ""}
idFkProducto = ""
codLocalPrecioProductoSolicitud = ""
if (checkProvisional) {
	checkProvisional.checked = false
	cambiarModoProductoProvisionalSolicitudCredito(false)
}
}



var elementoAddProductoCredito="";
var productosSolicitudModificados=false;

function solicitudCreditoPermiteEditarProductos() {
	var estado = document.getElementById('inptEstadoSolicitudCredito').value;
	return estado != "FINALIZADO";
}

function actualizarEstadoBotonProductoSolicitud() {
	var botonAgregar = document.getElementById('btnADDProductoSolicitudCredito');
	if (!botonAgregar) {
		return;
	}
	var permiteEditar = solicitudCreditoPermiteEditarProductos();
	botonAgregar.disabled = !permiteEditar;
	botonAgregar.style.cursor = permiteEditar ? "pointer" : "not-allowed";
	botonAgregar.style.opacity = permiteEditar ? "1" : "0.65";
}

function limpiarSeleccionProductoSolicitud() {
	elementoAddProductoCredito = "";
	document.getElementById("btnAddCredito_Producto3").style.display="none";
	document.getElementById("btnAddCredito_Producto4").style.display="none";
}

function obtenerdatosProductoCredito(datostr){
	if (!solicitudCreditoPermiteEditarProductos()) {
		ver_vetana_informativa("NO SE PUEDE MODIFICAR PRODUCTOS DE UNA SOLICITUD FINALIZADA")
		return false;
	}
	 $("tr[id=tbSelecRegistro]").each(function(i, td){		
		 td.className=''
		
	   });

    datostr.className='tableRegistroSelec'
	elementoAddProductoCredito=datostr;
	
	// console.log(elementoAddProductoCredito.parentElement.parentElement);

		document.getElementById("btnAddCredito_Producto3").style.display=""
		document.getElementById("btnAddCredito_Producto4").style.display=""
}

function EliminarCredito_Producto(){
	if (!solicitudCreditoPermiteEditarProductos()) {
		ver_vetana_informativa("NO SE PUEDE MODIFICAR PRODUCTOS DE UNA SOLICITUD FINALIZADA")
		return false;
	}
	if(elementoAddProductoCredito==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
		return false;
	}
	
	var tablaProductoSeleccionado = elementoAddProductoCredito;
	while (tablaProductoSeleccionado && tablaProductoSeleccionado.tagName !== "TABLE") {
		tablaProductoSeleccionado = tablaProductoSeleccionado.parentElement;
	}
	if (tablaProductoSeleccionado && tablaProductoSeleccionado.parentElement) {
		tablaProductoSeleccionado.parentElement.removeChild(tablaProductoSeleccionado);
	}

		limpiarSeleccionProductoSolicitud()
		productosSolicitudModificados = true;
		
		calcularTotalSolicitudCredito()

	
		
}



function calcularTotalSolicitudCredito(){
	recalcularTotalesSolicitudCredito();
}
function CancelarCredito_Producto(){

		limpiarSeleccionProductoSolicitud()
	
}


function seleccionarsolicitudCredito(datos) {
    var optionSeleccionado = datos.options[datos.selectedIndex];

    if (!optionSeleccionado) {
        return;
    }
    if (precioValidoSolicitudCredito(datos.value)) {
        document.getElementById("inptRefproductoPrecio").value = datos.value;
        document.getElementById("inptCantidadCuotaSolicitud").value = optionSeleccionado.getAttribute("id") || "";
    } else {
        document.getElementById("inptRefproductoPrecio").value = "";
        mostrarErrorPrecioSolicitudCredito(optionSeleccionado.getAttribute("id") || "");
    }
}
function minimizarsolicitudCredito(){
 	$("div[id=divAbmSolicitudCredito]").fadeOut(500);	
	document.getElementById("divMinimizadoSolicitudCredito").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuSolicitudCredito"));
}


function limpiarcampossolicitudCredito(){
	document.getElementById('inpVentaSolicitudCredito').innerHTML=""
	document.getElementById('inptNombreSolicitudCredito').value="";
	document.getElementById('inptNroDocSolicitudCredito').value="";
	document.getElementById('inptNroRucSolicitudCredito').value="";
	document.getElementById('inptNroTelefSolicitudCredito').value="";
	document.getElementById('inptNrowhatsappSolicitudCredito').value="";
	document.getElementById('inptFechaNacSolicitudCredito').value="";
	document.getElementById('inptLugrarTrabajoSolicitudCredito').value="";
	document.getElementById('inptDireccionTrabajoSolicitudCredito').value="";
	document.getElementById('inptSalarioSolicitudCredito').value="";
	document.getElementById('inptAntiguedadSolicitudCredito').value="";
	document.getElementById('inptNroTelefTrabajoSolicitudCredito1').value="";
	document.getElementById('inptNroTelefTrabajoSolicitudCredito2').value="";
	document.getElementById('inptDireccionSolicitudCredito').value="";
	document.getElementById('inptReferenciaSolicitudCredito').value="";
	document.getElementById('inptZonaSolicitudCredito').value="";
	document.getElementById('inptMasRefTelefSolicitudCredito').value="";
	document.getElementById('inptMasRefDireccionSolicitudCredito').value="";
	document.getElementById('inptMasRefReferenciaSolicitudCredito').value="";
	document.getElementById('inptMasRefObservacionSolicitudCredito').value="";
	document.getElementById('inptObservacionSolicitudCredito').value="";
	document.getElementById('inptTipoRefSolicitudCredito').value="";
	document.getElementById('inptTipoViviendaSolicitudCredito').value="";
	document.getElementById('table_mas_referenciasSolicitudCredito').innerHTML="";
	document.getElementById('inptEstadoCliente').value="Activo";
	document.getElementById("btnAddRefSolicitudCredito1").style.display=""
	document.getElementById("btnAddRefSolicitudCredito2").style.display="none"
	document.getElementById("btnAddRefSolicitudCredito3").style.display="none"
	document.getElementById("btnAddRefSolicitudCredito4").style.display="none"
	document.getElementById('inptGaranteSolicitudCredito').value="SIN GARANTE";
	document.getElementById('inptObsRefSolicitudCredito').value="";
	document.getElementById('inptObserbacionTrabajoSolicitudCredito2').value="";
	document.getElementById('inptObservacionGeneralSolicitudCredito').value="";
	document.getElementById('inptTotalSolicitud').value ='0';
	document.getElementById('inptEntregaSolicitudCredito').value ='0';
	document.getElementById('btnADDProductoSolicitudCredito').disabled = false;
	document.getElementById('inptEstadoSolicitudCredito').value="PENDIENTE";
	
	document.getElementById('table_vista_ProDuc_Solicitud_Credito').innerHTML="";
	document.getElementById('inptTotalSolicitudCredito').innerHTML="";
	document.getElementById('inptRefCodProducto').value="";
	document.getElementById('inptRefNombreProducto').value="";
	document.getElementById('inptRefproductoPrecio').value="";
	document.getElementById('inpTPrecioSolicitud').innerHTML="";
	document.getElementById('inptRefCantidadProducto').value="";
	document.getElementById('table_Solicitud_Credito_Producto').innerHTML="";
	document.getElementById('btnGuardarSolicitudCredito').value="Guardar Datos"
	
	 document.getElementById('btnEditarSolicitudCredito').style.backgroundColor="#b7b7b7";
  document.getElementById('btnEliminarSolicitudCredito').style.backgroundColor="#b7b7b7";
  // document.getElementById('btnAprobarSolicitudCredito').style.backgroundColor="#b7b7b7";
	document.getElementById('btnVenderSolicitudCredito').style.backgroundColor="#b7b7b7";

	document.getElementById("table_vista_archivos_garante").innerHTML = '';
	
	cod_clienteFKSolicitud="";
	idGaranteFk="6"
	idFKZona="";
	idSolicitudCredito="";
	codLocalPrecioProductoSolicitud="";
	document.getElementById('btnEditarClientes').style.backgroundColor="#b7b7b7";
	document.getElementById('inptCantidadCuotaSolicitud').disabled=false;
    document.getElementById('checkDescuentoSolicitudCredito').checked= false;
	productosSolicitudModificados=false;
	actualizarEstadoBotonProductoSolicitud();
	actualizarResumenSolicitudCredito(0, 0);
	if (typeof window.cerrarProductosSolicitudCredito === "function") {
		window.cerrarProductosSolicitudCredito(false);
	}
	if (typeof window.actualizarResumenProductosSolicitudCredito === "function") {
		window.actualizarResumenProductosSolicitudCredito();
	}
}

var idSolicitudCredito ="";

function verificarcamposSolicitudCredito(){
	var cantidadProductosSolicitud = $("tr[name=tdDetalleSolicitudCredito]").length;
	if(cantidadProductosSolicitud < 1){
		ver_vetana_informativa("DEBE AGREGAR AL MENOS UN PRODUCTO PARA GUARDAR LA SOLICITUD")
		return false;
	}
	var inptEstadoSolicitudCredito=document.getElementById('inptEstadoSolicitudCredito').value
	var inptNombreSolicitudCredito=document.getElementById('inptNombreSolicitudCredito').value
	var inptObservacionSolicitudCredito=document.getElementById('inptObservacionSolicitudCredito').value
	var inptObservacionGeneral=document.getElementById('inptObservacionGeneralSolicitudCredito').value
	
	var inptLocalVentaSolicitudCredito=document.getElementById('inptLocalVentaSolicitudCredito').value
	var inptMontoRefComercialSolicitudCredito=document.getElementById('inptMontoRefComercialSolicitudCredito').value
	var inptEntregaSolicitudCredito=document.getElementById('inptEntregaSolicitudCredito').value
	
	
	var inptFechaNacSolicitudCredito=document.getElementById('inptFechaNacSolicitudCredito').value
	
 
	
  if(inptLocalVentaSolicitudCredito==""){
	ver_vetana_informativa("FALTO SELECCIONAR EL LOCAL")
	  return false;
  }
  
  

  if(inptNombreSolicitudCredito==""){
	ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL CLIENTE")
	  return false;
  }

  if(idFKZona==""){
	ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
	  return false;
  }
  
  if(cod_clienteFKSolicitud==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE.")
	  return false;
  }

  var entregaSolicitud = parseInt(QuitarSeparadorMilValor(inptEntregaSolicitudCredito));
  var totalSolicitud = parseInt(QuitarSeparadorMilValor(document.getElementById('inptTotalSolicitud').value));
  if (isNaN(entregaSolicitud)) {
	entregaSolicitud = 0;
  }
  if (isNaN(totalSolicitud)) {
	totalSolicitud = 0;
  }
  if(entregaSolicitud < 0){
	ver_vetana_informativa("LA ENTREGA NO PUEDE SER NEGATIVA")
	  return false;
  }
  if(totalSolicitud > 0 && entregaSolicitud > totalSolicitud){
	ver_vetana_informativa("LA ENTREGA NO PUEDE SER MAYOR AL TOTAL DEL CREDITO")
	  return false;
  }
  
  

  var accion="";
  if(idSolicitudCredito!=""){
	 if(controlacceso("EDITARSOLICITUDCREDITO","accion")==false){return;}
	 
	 // if(controlacceso2("EDITARSOLICITUDCREDITO","accion")==false){inptEstadoSolicitudCredito=""}
	 
	  accion="editar";	 	
  }else{
	   if(controlacceso("CREARNUEVOSOLICITUDCREDITO","accion")==false){return;}
	   accion="nuevo";
  }
  
  SolicitudCredito(inptMontoRefComercialSolicitudCredito,inptLocalVentaSolicitudCredito,inptEstadoSolicitudCredito,inptObservacionSolicitudCredito,inptObservacionGeneral,entregaSolicitud,cantidadProductosSolicitud,accion);
}
function  SolicitudCredito(MontoRefComercial,local,estado,observacion,observacion_general,entrega_inicial,cantidad_productos,accion){
	verCerrarEfectoCargando("1")
	

	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			 datos.append("idAbm" , idSolicitudCredito)
			 datos.append("estado" , estado)
			 datos.append("idAbmCliente" , cod_clienteFKSolicitud)
			 datos.append("cod_garanteFK" , idGaranteFk)
			 datos.append("cod_cobradorFK" , idFkCobrador)
			 datos.append("cod_localFK" , local)
			 datos.append("observacion" , observacion)
			 datos.append("observacion_general" , observacion_general)
			 datos.append("MontoRefComercial" , MontoRefComercial)
			 datos.append("entrega_inicial" , entrega_inicial)
			 datos.append("cantidad_productos" , cantidad_productos)
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
				
				idSolicitudCredito = datos["2"];
				document.getElementById('btnGuardarSolicitudCredito').value="Editar Datos"
			    verificarcamposClienteSolicitudCredito()	
				
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


function verificarcamposClienteSolicitudCredito(){
	var inptNroTelefSolicitudCredito=document.getElementById('inptNroTelefSolicitudCredito').value
	var inptNrowhatsappSolicitudCredito=document.getElementById('inptNrowhatsappSolicitudCredito').value
	var inptLugrarTrabajoSolicitudCredito=document.getElementById('inptLugrarTrabajoSolicitudCredito').value
	var inptDireccionTrabajoSolicitudCredito=document.getElementById('inptDireccionTrabajoSolicitudCredito').value
	var inptSalarioSolicitudCredito=document.getElementById('inptSalarioSolicitudCredito').value
	var inptAntiguedadSolicitudCredito=document.getElementById('inptAntiguedadSolicitudCredito').value
	var inptNroTelefTrabajoSolicitudCredito1=document.getElementById('inptNroTelefTrabajoSolicitudCredito1').value
	var inptNroTelefTrabajoSolicitudCredito2=document.getElementById('inptNroTelefTrabajoSolicitudCredito2').value
	var inptDireccionSolicitudCredito=document.getElementById('inptDireccionSolicitudCredito').value
	var inptReferenciaSolicitudCredito=document.getElementById('inptReferenciaSolicitudCredito').value
	var estado=document.getElementById('inptEstadoSolicitudCredito').value
	var obsTrabajo=document.getElementById('inptObserbacionTrabajoSolicitudCredito2').value
	var tipo_vivienda=document.getElementById('inptTipoViviendaSolicitudCredito').value
	


	if(cod_clienteFKSolicitud==""){
	ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL CLIENTE")
	  return false;
  }
  
  
	
  if(idFKZona==""){
	ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
	  return false;
  }
 
 
 
  var accion="";
  if(cod_clienteFKSolicitud!=""){
	  accion="EditarCliente";
	 	// if(controlacceso("EDITARLISTADODECLIENTES","accion")==false){return;}
  }
  
  AbmClienteSolicitudCredito(inptNroTelefSolicitudCredito,inptNrowhatsappSolicitudCredito,inptLugrarTrabajoSolicitudCredito,inptDireccionTrabajoSolicitudCredito,inptSalarioSolicitudCredito,inptAntiguedadSolicitudCredito,inptNroTelefTrabajoSolicitudCredito1,inptNroTelefTrabajoSolicitudCredito2,inptDireccionSolicitudCredito,inptReferenciaSolicitudCredito,idFKZona,cod_clienteFKSolicitud,estado,obsTrabajo,tipo_vivienda,accion);
}


function  AbmClienteSolicitudCredito(nroTelefono,nroWhatsapp,lugarTrabajo,dereccionTrabajo,salario,antiguedad,nrotelefonoTrabajo,nroTelefonoEncargado,direccionSolicitud,referencia,idzonaFk,cod_persona,estado,obsTrabajo,tipo_vivienda,accion){
	verCerrarEfectoCargando("1")
	

	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			 datos.append("cod_persona" , cod_persona)
			 datos.append("idzonaFk" , idzonaFk)
			 datos.append("direccion" , direccionSolicitud)
			 datos.append("telefono" , nroTelefono)
			 datos.append("email" , referencia)//Sirve para la referencia
			 datos.append("whapp" , nroWhatsapp)
				datos.append("lugardetrabajo", lugarTrabajo)		
				datos.append("direcciontrab", dereccionTrabajo)		
				datos.append("salario", salario)		
				datos.append("antiguedad", antiguedad)		
				datos.append("teleftrab1", nrotelefonoTrabajo)		
				datos.append("teleftrab2", nroTelefonoEncargado)
			datos.append("estado", estado)				
			datos.append("obsTrabajo", obsTrabajo)				
			datos.append("tipo_vivienda", tipo_vivienda)				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
				
				cod_clienteFKSolicitud = datos["2"];
				
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				// abmmasreferenciasSolicitudCliente(idFkCliente)
				abmProductoSolicitudCredito(idSolicitudCredito)				
				
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


function  abmmasreferenciasSolicitudCliente(idcliente){
	  var datos = new FormData();
	var control=1;
	$("tr[name=tdMasReferenciasSolicitudCredito]").each(function(i, elementohtml){
	
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
	
	var obs=$(elementohtml).children('td[id="td_datos_6"]').html();
    datos.append("obs"+control, obs)
	
	control=control+1;	
	
	   });
	control=control-1;
	
	if(control==0){
		return
	}
	
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
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
			
				buscarmasreferenciasSolicitudCredito(idcliente)
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



function buscarmasreferenciasSolicitudCredito(idcliente){
		 document.getElementById("table_mas_referenciasSolicitudCredito").innerHTML=paginacargando
		 document.getElementById("inptMontoRefComercialSolicitudCredito").value=""
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idcliente,
			"formato": "json",
			"funt": "buscarmasreferencias"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_referenciasSolicitudCredito").innerHTML=''
			document.getElementById("inptMontoRefComercialSolicitudCredito").value=""
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_mas_referenciasSolicitudCredito").innerHTML=''
			  document.getElementById("inptMontoRefComercialSolicitudCredito").value=""
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {				
		    var datos_buscados=datos[2];	

			document.getElementById("inptMontoRefComercialSolicitudCredito").value=datos[3]
			if(Array.isArray(datos_buscados)){renderReferenciasSolicitudCredito(datos_buscados);}
			else{document.getElementById("table_mas_referenciasSolicitudCredito").innerHTML=datos_buscados || "";}
			
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

//////////////////////////////////////////////////////////////////////////

function  abmProductoSolicitudCredito(idSolicitudCredito){
	  var datos = new FormData();
	var control=1;
	$("tr[name=tdDetalleSolicitudCredito]").each(function(i, elementohtml){
	
	var cod_Producto=$(elementohtml).children('td[id="td_id_1"]').html();
    datos.append("cod_Producto"+control, cod_Producto)
	
	var cantidad=$(elementohtml).children('td[id="td_datos_3"]').html();
    datos.append("cantidad"+control, cantidad)

	
	var precio=$(elementohtml).children('td[id="td_datos_4"]').html();
    datos.append("precio"+control, precio)
	
	var cuotas=obtenerCuotaOriginalDetalleSolicitudCredito(elementohtml);
    datos.append("cuotas"+control, cuotas)
	
	var tipo=$(elementohtml).children('td[id="td_datos_6"]').html();
    datos.append("tipo"+control, tipo)
	var nombreProducto=$(elementohtml).children('td[id="td_datos_2"]').text();
	datos.append("nombreProducto"+control, nombreProducto)
	datos.append("esProvisional"+control, tipo == "PROVISIONAL" ? "1" : "0")
	
	
	control=control+1;	
	
	 
	
	   });
	control=control-1;
	
	if(control==0){
		ver_vetana_informativa("DEBE AGREGAR AL MENOS UN PRODUCTO PARA GUARDAR LA SOLICITUD")
		return
	}
	
	verCerrarEfectoCargando("1")
	
			obtener_datos_user();
			
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "addProductoCredito")
			 datos.append("idSolicitudCredito" , idSolicitudCredito)
			  datos.append("totalCargado" , control)
	
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
			productosSolicitudModificados=false;
			buscarProductoSolicitudCredito(idSolicitudCredito)
				buscarSolicitudCredito()
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
function buscarProductoSolicitudCredito(idSolicitudCredito){
		 document.getElementById("table_Solicitud_Credito_Producto").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idSolicitudCredito,
			"formato": "json",
			"funt": "buscarProductoSolicitud"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Solicitud_Credito_Producto").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_Solicitud_Credito_Producto").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
			var datos_buscados=datos[2];		 
			if(Array.isArray(datos_buscados)){renderProductosSolicitudCredito(datos_buscados);}
			else{document.getElementById("table_Solicitud_Credito_Producto").innerHTML=datos_buscados || "";}
			productosSolicitudModificados=false;
			limpiarSeleccionProductoSolicitud();
			recalcularTotalesSolicitudCredito();
			
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



function buscarSolicitudCredito(){
	var listado = inicializarListadoAbmSolicitudCredito();
	var fecha1 = document.getElementById('inptBuscarsolicitudCredito1').value
	var fecha2 = document.getElementById('inptBuscarsolicitudCredito2').value
	var local = document.getElementById('inptlocalsolicitudCredito').value
	var zona= document.getElementById("inptBuscarAbmsolicitudCredito4").value	
	var cliente= document.getElementById("inptBuscarAbmsolicitudCredito3").value
	var documento= document.getElementById("inptBuscarAbmsolicitudCredito2").value
	var estado= document.getElementById("inptBuscarAbmsolicitudCredito5").value
	var vendedor= document.getElementById("inptBuscarAbmsolicitudCredito6").value
	var garante= document.getElementById("inptBuscarAbmsolicitudCredito7").value
	var producto= document.getElementById("inptBuscarAbmsolicitudCredito8").value

	if(document.getElementById('inptSeleccSolicitudCredito1').checked==true){
	if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		return
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		return
	}
	}else{
	fecha1 = ""
	fecha2 = ""
	}
	
	   document.getElementById("inptRegistroNrosolicitudCredito").value =""
	   if(listado){
		   listado.establecerRegistros([], false)
	   }
	   document.getElementById("table_abm_solicitudCredito").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"local": local,
			"zona": zona,
			"cliente": cliente,
			"documento": documento,
			"estado": estado,
			"vendedor": vendedor,
			"garante": garante,
			"producto": producto,
			"formato": listado ? "json" : "html",
			"funt": "buscarSolicitudCredito"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("table_abm_solicitudCredito").innerHTML=''
			}
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  if(!listado){
				document.getElementById("table_abm_solicitudCredito").innerHTML=''
			  }
			try{
				var datos = $.parseJSON(Respuesta); 
				if(listado){
					listado.establecerRegistros([], false)
				}
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		   var datos_buscados=datos[2];		 
			if(listado && Array.isArray(datos_buscados)){
				listado.establecerRegistros(datos_buscados, false)
			}else{
				document.getElementById("table_abm_solicitudCredito").innerHTML=typeof datos_buscados === "string" ? datos_buscados : ""
			}
			 document.getElementById("inptRegistroNrosolicitudCredito").value =datos[3];	
			 
			 document.getElementById('inptRegistroSeleccsolicitudCredito').value = "";
	// document.getElementById('inptRegistroNrosolicitudCredito').value = "";
	
	document.getElementById('btnEditarSolicitudCredito').style = "background-color:#b7b7b7";
	document.getElementById('btnEliminarSolicitudCredito').style = "background-color:#b7b7b7";
	// document.getElementById('btnAprobarSolicitudCredito').style = "background-color:#b7b7b7";
	document.getElementById('btnVenderSolicitudCredito').style = "background-color:#b7b7b7";
			}
			}catch(error)
				{
					if(listado){
						listado.establecerRegistros([], false)
					}
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});
	
	
}
let elementoVentaDetalle="";

var EstadoCredito="";

var cod_localFKSolicitudCredito="";


function obtenerdatosSolicitudCredito(datostr){	
		 $("tr[id=tbSelecRegistro]").each(function(i, td){		
		 td.className=''
		
	   });
	   
	   
	   limpiarcampossolicitudCredito()
	   
	   elementoVentaDetalle=datostr
    datostr.className='tableRegistroSelec'
	document.getElementById('inptNombreSolicitudCredito').value=$(datostr).children('td[id="td_datos_3"]').text();
	document.getElementById('inptNroDocSolicitudCredito').value=$(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById('inptNroRucSolicitudCredito').value=$(datostr).children('td[id="td_datos_2"]').text();
	document.getElementById('inptNroTelefSolicitudCredito').value=$(datostr).children('td[id="td_datos_5"]').text();
	document.getElementById('inptNrowhatsappSolicitudCredito').value=$(datostr).children('td[id="td_datos_8"]').text();
	document.getElementById('inptFechaNacSolicitudCredito').value=$(datostr).children('td[id="td_datos_17"]').text();
	document.getElementById('inptDireccionSolicitudCredito').value=$(datostr).children('td[id="td_datos_6"]').text();
	document.getElementById('inptReferenciaSolicitudCredito').value=$(datostr).children('td[id="td_datos_7"]').text();
	document.getElementById('inptZonaSolicitudCredito').value=$(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById('inptGaranteSolicitudCredito').value=$(datostr).children('td[id="td_datos_18"]').text();
	document.getElementById('inptLugrarTrabajoSolicitudCredito').value=$(datostr).children('td[id="td_datos_11"]').text();
	document.getElementById('inptDireccionTrabajoSolicitudCredito').value=$(datostr).children('td[id="td_datos_16"]').text()
	document.getElementById('inptSalarioSolicitudCredito').value=$(datostr).children('td[id="td_datos_12"]').text()
	document.getElementById('inptAntiguedadSolicitudCredito').value=$(datostr).children('td[id="td_datos_13"]').text()
	document.getElementById('inptNroTelefTrabajoSolicitudCredito1').value=$(datostr).children('td[id="td_datos_14"]').text()
	document.getElementById('inptNroTelefTrabajoSolicitudCredito2').value=$(datostr).children('td[id="td_datos_15"]').text()
	document.getElementById('inptObservacionSolicitudCredito').value=$(datostr).children('td[id="td_datos_23"]').text()
	document.getElementById('inptRegistroSeleccsolicitudCredito').value=$(datostr).children('td[id="td_datos_3"]').text()
	document.getElementById('inptEstadoSolicitudCredito').value=$(datostr).children('td[id="td_datos_9"]').text();
	document.getElementById('inptTipoViviendaSolicitudCredito').value=$(datostr).children('td[id="td_datos_33"]').text();
	document.getElementById('inptMontoRefComercialSolicitudCredito').value=$(datostr).children('td[id="td_datos_34"]').text();
	document.getElementById('inptEntregaSolicitudCredito').value=$(datostr).children('td[id="td_datos_35"]').text() || "0";
	document.getElementById('inptCantidadCuotaSolicitud').value=$(datostr).children('td[id="td_datos_27"]').text();
	actualizarEstadoBotonProductoSolicitud();
	
	document.getElementById('inptObserbacionTrabajoSolicitudCredito2').value=$(datostr).children('td[id="td_datos_24"]').text();
	document.getElementById('inptObservacionGeneralSolicitudCredito').value=$(datostr).children('td[id="td_datos_32"]').text();
	
	document.getElementById('inptLocalVentaSolicitudCredito').value=$(datostr).children('td[id="td_datos_31"]').text();
	cod_localFKSolicitudCredito=$(datostr).children('td[id="td_datos_31"]').text();
	
	var estadoSolicitud=$(datostr).children('td[id="td_datos_9"]').text()

	if(estadoSolicitud=="FINALIZADO"){
		document.getElementById('inpVentaSolicitudCredito').textContent=$(datostr).children('td[id="td_datos_3"]').text()+"/"+$(datostr).children('td[id="td_datos_22"]').text()
	}else{
		document.getElementById('inpVentaSolicitudCredito').innerHTML=""
	}
	

	cod_clienteFKSolicitud= $(datostr).children('td[id="td_datos_21"]').text();
	idFKZona= $(datostr).children('td[id="td_datos_25"]').text();
	idGaranteFk= $(datostr).children('td[id="td_datos_19"]').text();
   idSolicitudCredito= $(datostr).children('td[id="td_id"]').text();
   
buscar_archivos_garante()
   
	buscarmasreferenciasSolicitudCredito(cod_clienteFKSolicitud);
	buscarProductoSolicitudCredito(idSolicitudCredito)
	actualizarResumenSolicitudCredito(document.getElementById('inptTotalSolicitud').value, document.getElementById('inptCantidadCuotaSolicitud').value);
  document.getElementById('btnGuardarSolicitudCredito').value="Editar datos";
  document.getElementById('btnEditarSolicitudCredito').style.backgroundColor="";
  document.getElementById('btnEliminarSolicitudCredito').style.backgroundColor="#f4473a";
  // document.getElementById('btnAprobarSolicitudCredito').style.backgroundColor="#4caf50";
  document.getElementById('btnVenderSolicitudCredito').style.backgroundColor="#4caf50";
  
  
  
  	document.getElementById('inptNombreSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_3"]').text();
	document.getElementById('inptNroDocSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById('inptNroRucSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_2"]').text();
	document.getElementById('inptNroTelefSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_5"]').text();
	document.getElementById('inptNrowhatsappSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_8"]').text();
	document.getElementById('inptFechaNacSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_17"]').text();
	document.getElementById('inptDireccionSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_6"]').text();
	document.getElementById('inptReferenciaSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_7"]').text();
	document.getElementById('inptZonaSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById('inptGaranteSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_18"]').text();
	document.getElementById('inptLugrarTrabajoSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_11"]').text();
	document.getElementById('inptDireccionTrabajoSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_16"]').text()
	document.getElementById('inptSalarioSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_12"]').text()
	document.getElementById('inptAntiguedadSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_13"]').text()
	document.getElementById('inptNroTelefTrabajoSolicitudCredito1Vista').value=$(datostr).children('td[id="td_datos_14"]').text()
	document.getElementById('inptNroTelefTrabajoSolicitudCredito2Vista').value=$(datostr).children('td[id="td_datos_15"]').text()
	document.getElementById('inptObservacionSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_23"]').text()
	document.getElementById('inptEstadoSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_9"]').text();
	document.getElementById('inptObserbacionTrabajoSolicitudCredito2Vista').value=$(datostr).children('td[id="td_datos_24"]').text();
	document.getElementById('inptObservacionGeneralSolicitudCreditoVista').value=$(datostr).children('td[id="td_datos_32"]').text();
  
  
  
  
  
	
}

function verVentanaEditarsolicitudCredito() {
	if(controlacceso("EDITARSOLICITUDCREDITO","accion")==false){return;}
	if (cod_clienteFKSolicitud == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
	verCerrarVentanaAbmSolicitudCredito("1", "2")
}


function vercerrarvistaSolicitudCredito(d, ventana) {

	if (d == "1") {
		document.getElementById("divVistaSolicitudCredito").style.display = ""
		  
		buscarvistaSolicitudCredito();
	} else {
		 
		$("div[id=divVistaSolicitudCredito]").fadeOut(500)
	}

}


function buscarvistaSolicitudCredito() {
	var buscador = document.getElementById('inptVistaBuscadorClienteSolicitudCredito').value
	document.getElementById("table_vista_SoliCredito").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"codlocal": cod_localFKUSer,
		"formato": "json",
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		beforeSend: function () {


		},
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_SoliCredito").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_SoliCredito").innerHTML = ''
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

					if(Array.isArray(datos_buscados)){renderVistaSolicitudCredito(datos_buscados);}
					else{document.getElementById("table_vista_SoliCredito").innerHTML = datos_buscados || "";}

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

var codSolcirudFK=""
var controlProductoSolicitud = false;

function formatearEntregaSolicitudCredito(valor) {
	var entrega = parseInt(QuitarSeparadorMilValor(valor));
	if (isNaN(entrega) || entrega < 0) {
		entrega = 0;
	}
	return entrega;
}

function precargarEntregaSolicitudEnVenta(entregaSolicitud, totalVenta, nroCuotas) {
	var entrega = formatearEntregaSolicitudCredito(entregaSolicitud);
	var total = parseInt(QuitarSeparadorMilValor(totalVenta));
	var cuotas = parseInt(nroCuotas);
	if (isNaN(total) || total < 0) {
		total = 0;
	}
	if (isNaN(cuotas) || cuotas <= 0) {
		cuotas = 1;
	}
	if (entrega >= total) {
		entrega = 0;
	}
	var cuotasRestantes = cuotas;
	if (entrega > 0 && cuotas > 1) {
		cuotasRestantes = cuotas - 1;
	}
	var saldo = total - entrega;
	if (saldo < 0) {
		saldo = 0;
	}
	var montoCuota = 0;
	if (cuotasRestantes > 0) {
		montoCuota = redondearMiles(saldo / cuotasRestantes);
	}
	document.getElementById("inptEntregaVenta").value = separadordemilesnumero(entrega);
	document.getElementById("inptEntregaConfCredito").value = separadordemilesnumero(entrega);
	document.getElementById("inptConfirmarPagoEntrega").value = "SI";
	document.getElementById("inptNroCuotasConfCredito").value = cuotasRestantes;
	document.getElementById("inptSaldoConfCredito").value = separadordemilesnumero(saldo);
	document.getElementById("inptMontoPagoConfCredito").value = separadordemilesnumero(montoCuota);
	DatosAutoCompleteCredito = [cuotasRestantes];
}

function obtenerdatosvistaSolicitudCreditoVenta(datostr) {
	
	//programoaqui
	
	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});

	datostr.className = 'tableRegistroSelec'
 
		var idSolicitudSeleccionada = $(datostr).children('td[id="td_id"]').html();
		limpiarcamposventa()
		
 
		codSolcirudFK = idSolicitudSeleccionada;
		idSolicitudCredito = idSolicitudSeleccionada;
		document.getElementById('inptSolicitudCredito').value = $(datostr).children('td[id="td_datos_3"]').html();
		
		buscarDetalleProductoSolicitudParaVentaVistaSolicitud(idSolicitudSeleccionada)
		
		idFkCliente = $(datostr).children('td[id="td_datos_21"]').html();
		document.getElementById('inptClienteVenta').value = $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptClienteVenta2').value = $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptDocClienteVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptDocClienteVenta2').value = $(datostr).children('td[id="td_datos_1"]').html();	
		document.getElementById('inptDireccionVenta').value =  $(datostr).children('td[id="td_datos_6"]').html();
		document.getElementById('inptTelefVenta').value =  $(datostr).children('td[id="td_datos_5"]').html();
		document.getElementById('inptAccesoCreditoVentaCliente').value =  $(datostr).children('td[id="td_datos_22"]').html();
		document.getElementById('inptLugrarTrabajoCliente').value =  $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById('inptDireccionTrabajoCliente').value =  $(datostr).children('td[id="td_datos_16"]').html();
		document.getElementById('inptSalarioCliente').value =  $(datostr).children('td[id="td_datos_12"]').html();
		document.getElementById('inptAntiguedadCliente').value =  $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptNroTelefTrabajoCliente1').value =  $(datostr).children('td[id="td_datos_14"]').html();
		document.getElementById('inptNroTelefTrabajoCliente2').value =  $(datostr).children('td[id="td_datos_15"]').html();
		document.getElementById('inptDocGaranteVenta').value=$(datostr).children('td[id="td_datos_29"]').html();
		document.getElementById('inptGaranteVenta').value=$(datostr).children('td[id="td_datos_18"]').html();
		
		document.getElementById('inptNroCuotasConfCredito').value=$(datostr).children('td[id="td_datos_30"]').html();
		
		// document.getElementById('inptTelefVenta').value =  $(datostr).children('td[id="td_datos_4"]').html(); 
		// idFkCliente=$(datostr).children('td[id="td_datos_21"]').html();
		idGaranteFk=$(datostr).children('td[id="td_datos_19"]').html();
		
		var CuotaNro = $(datostr).children('td[id="td_datos_27"]').html();
	
	var totalVenta = $(datostr).children('td[id="td_datos_28"]').html();
	var entregaSolicitud = $(datostr).children('td[id="td_datos_31"]').html() || "0";
		
		DatosAutoCompleteCredito.push(CuotaNro)
		
		document.getElementById("btnMasInfoClienteVenta").style.display=''
		document.getElementById("btnNuevoClienteVenta").style.display='none'
		
		document.getElementById("inptSubTotalVenta").value=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalVenta").value=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalVenta2").innerHTML=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalDescuento").value="0";

tipoDesdeVenta="Solicitud"
document.getElementById('inptSeleccTipoVenta').value = 'CREDITO';
OpcionesTipoVenta();
precargarEntregaSolicitudEnVenta(entregaSolicitud, totalVenta, CuotaNro);
document.getElementById("btnFinalizarVenta").style.display=""
document.getElementById("btnCancelarVenta").style.display=""
		
		
		//DESACTIVAR BOTONES AL OBTENER DATOS DESDE SOLIC. CREDITO
	document.getElementById('inptNroCuotasConfCredito').disabled =true;
	document.getElementById('inptMontoPagoConfCredito').disabled =true;
	document.getElementById('inptProductoVenta').disabled =true;
	document.getElementById('inptCodProductoVenta').disabled =true;
	document.getElementById('inptCantProductoVenta').disabled =true;
	document.getElementById('btnAddDetallesaVenta').disabled =true;
	document.getElementById('btnSolicitarDescuento').disabled =true;
	document.getElementById('inptSeleccTipoVenta').disabled =true;
	document.getElementById('vercerrarVistaCliente').disabled =true;
	
	// saldoGen = parseInt(QuitarSeparadorMilValor(totalVenta))
 
		document.getElementById("divVistaSolicitudCredito").style.display = "none"

controlProductoSolicitud = true;
}

var tipoDesdeVenta="";
function verCerrarAbmAbrirVentaSoli(){
	let datostr =elementoVentaDetalle
	
	if(elementoVentaDetalle === ""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA SOLICITUD")
		return;
	}
	
	
		
	let estado=$(datostr).children('td[id="td_datos_9"]').text();
	if(estado!="APROBADO"){
		ver_vetana_informativa("ESTA SOLICITUD NO SE ENCUENTRA APROBADA")
		return false;
	}
	
	var idSolicitudSeleccionada=$(datostr).children('td[id="td_id"]').text();
	if(idSolicitudSeleccionada==""){
		ver_vetana_informativa("FALTO SELECCIONAR UNA SOLICITUD")
		return false;
	}
	limpiarcamposventa()
	idSolicitudCredito=idSolicitudSeleccionada
	codSolcirudFK=idSolicitudSeleccionada
	tipoDesdeVenta="Solicitud"
	
	buscarDetalleProductoSolicitudParaVenta(idSolicitudSeleccionada)
	
	document.getElementById('inptClienteVenta').value=$(datostr).children('td[id="td_datos_3"]').text();
	document.getElementById('inptDocClienteVenta').value=$(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById('inptDocGaranteVenta').value=$(datostr).children('td[id="td_datos_29"]').text();
	document.getElementById('inptGaranteVenta').value=$(datostr).children('td[id="td_datos_18"]').text();
	
	document.getElementById('inptSolicitudCredito').value = $(datostr).children('td[id="td_datos_3"]').text();
	
	idFkCliente=$(datostr).children('td[id="td_datos_21"]').text();
	idGaranteFk=$(datostr).children('td[id="td_datos_19"]').text();
	
	
var CuotaNro = $(datostr).children('td[id="td_datos_27"]').text();
	
var totalVenta = $(datostr).children('td[id="td_datos_28"]').text();
var entregaSolicitud = $(datostr).children('td[id="td_datos_35"]').text() || "0";

	 
		   DatosAutoCompleteCredito.push(CuotaNro)
	 
	
	   tipoDesdeVenta="Solicitud"
	   
document.getElementById("inptSubTotalVenta").value=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalVenta").value=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalVenta2").innerHTML=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalDescuento").value="0";

document.getElementById('inptSeleccTipoVenta').value = 'CREDITO';
OpcionesTipoVenta();
precargarEntregaSolicitudEnVenta(entregaSolicitud, totalVenta, CuotaNro);
document.getElementById("btnFinalizarVenta").style.display=""
document.getElementById("btnCancelarVenta").style.display=""


//DESACTIVAR BOTONES AL OBTENER DATOS DESDE SOLIC. CREDITO
	document.getElementById('inptNroCuotasConfCredito').disabled =true;
	document.getElementById('inptMontoPagoConfCredito').disabled =true;
	document.getElementById('inptProductoVenta').disabled =true;
	document.getElementById('inptCodProductoVenta').disabled =true;
	document.getElementById('inptCantProductoVenta').disabled =true;
	document.getElementById('btnAddDetallesaVenta').disabled =true;
	document.getElementById('btnSolicitarDescuento').disabled =true;
	document.getElementById('inptSeleccTipoVenta').disabled =true;
	document.getElementById('vercerrarVistaCliente').disabled =true;
	
	// saldoGen = parseInt(QuitarSeparadorMilValor(totalVenta))
	
	
	
	controlProductoSolicitud = true;
}
function comprobarCantidadCuota(){
	
}
function buscarDetalleProductoSolicitudParaVenta(idSolicitudSeleccionada) {

	document.getElementById("table_abm_detalle_venta").innerHTML = paginacargando;
	obtener_datos_user();
	var solicitudBuscar = idSolicitudSeleccionada || codSolcirudFK || idSolicitudCredito;
	if(solicitudBuscar==""){
		document.getElementById("table_abm_detalle_venta").innerHTML = "";
		ver_vetana_informativa("FALTO SELECCIONAR UNA SOLICITUD")
		return false;
	}
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "buscarDetalleProductoSolicitudParaVenta")
	datos.append("buscar", solicitudBuscar)
	datos.append("cod_localFK", cod_localFKUSer) 
	datos.append("formato", "json")
		var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
				var	datos_buscados = datos["2"];
				
				let controlStockSolicitud=datos["3"];
				

				if(controlStockSolicitud=="NO"){
					ver_vetana_informativa("STOCK INSUFICIENTE PARA COMPLETAR LA VENTA")
					limpiarcamposventa()
					return false
				}
				verCerrarAbmVentaDesdeSolicitud()
								
				if(Array.isArray(datos_buscados)){renderDetalleVentaDesdeSolicitud(datos_buscados);}
				else{document.getElementById("table_abm_detalle_venta").innerHTML = datos_buscados || "";}
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

	}
function buscarDetalleProductoSolicitudParaVentaVistaSolicitud(idSolicitudSeleccionada) {
	document.getElementById("table_abm_detalle_venta").innerHTML = paginacargando;
	obtener_datos_user();
	var solicitudBuscar = idSolicitudSeleccionada || codSolcirudFK || idSolicitudCredito;
	if(solicitudBuscar==""){
		document.getElementById("table_abm_detalle_venta").innerHTML = "";
		ver_vetana_informativa("FALTO SELECCIONAR UNA SOLICITUD")
		return false;
	}
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "buscarDetalleProductoSolicitudParaVentaVistaSolicitud")
	datos.append("buscar", solicitudBuscar)
	datos.append("cod_localFK", cod_localFKUSer) 
	datos.append("formato", "json")
		var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
				var	datos_buscados = datos["2"];
				
				let controlStockSolicitud=datos["3"];
				
				
				if(controlStockSolicitud=="NO"){
					ver_vetana_informativa("STOCK INSUFICIENTE PARA COMPLETAR LA VENTA")
					limpiarcamposventa()
					return false
				}
								
				if(Array.isArray(datos_buscados)){renderDetalleVentaDesdeSolicitud(datos_buscados);}
				else{document.getElementById("table_abm_detalle_venta").innerHTML = datos_buscados || "";}
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

	}
	
	function verCerrarAbmVentaDesdeSolicitud(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmVenta").style.display==""){

		 
	$("div[id=divAbmVenta]").fadeOut(500);	
		// document.getElementById("divMinimizadoNuevaVenta2").style.display="none"
	    document.getElementById("divMinimizadoNuevaVenta1").style.display="none"		
	}else{	
		if(controlacceso("VERVENTA","accion")==false){return;}
		if(idabmAperturacierrecaja==""){
		   ver_vetana_informativa("FALTO INICIAR UNA CAJA")
		   verCerrarVentanaAbmAperturaCierreCaja1()
		   return
	   }
		document.getElementById("divAbmVenta").style.display=""
		 
	
	
	}
}


function BuscarImprimirSolicitudCredito(){
	
 NombreClienteSC =""
 DereccionClienteSC =""
 ReferenciaClienteSC =""
 ZonaClienteSC =""
 FechaNacCLienteSC =""
 EdadClienteSC =""
 NroTelClienteSC =""
 NroWharsappSC =""
 ViviendaClienteSC =""
 EstadoCivilClienteSC =""
 ciClienteSC=""
/////////////////////
 LucarTrabajoClienteSC =""
 DireccionTrabajoClienteSC =""
 TelefonoTrabajoClienteSC =""
 CargoClienteSC =""
 SalarioClienteSC =""
 AntiguedadClienteSC =""
////////////////////
 NombreGaranteSC =""
 CIGaranteSC =""
 DireccionGaranteSC =""
 ReferenciaGaranteSC =""
 NroTelGaranteSC =""
 LugarTrabajoGranteSC =""
 AntiguegagGatanteSC =""
 SalarioGaranteSC =""
 DivProductoSC =""
 DivReferenciaSC =""
 
 if(idSolicitudCredito==""){
	 ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
 }


			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idSolicitudCredito,
			"funt": "BuscarImprimirSolicitudCredito"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_referenciasSolicitudCredito").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_mas_referenciasSolicitudCredito").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		   var datos_buscados=datos[2];		 
		 NombreClienteSC =datos[3]
		 ciClienteSC=datos[4]
 DereccionClienteSC =datos[5]
 ReferenciaClienteSC =datos[6]
 ZonaClienteSC =datos[8]
 FechaNacCLienteSC =datos[7]
 EdadClienteSC =datos[11]
 NroTelClienteSC =datos[9]
 NroWharsappSC =datos[10]
 ViviendaClienteSC =datos[13]
 EstadoCivilClienteSC =datos[12]
/////////////////////
 LucarTrabajoClienteSC =datos[14]
 DireccionTrabajoClienteSC =datos[15]
 TelefonoTrabajoClienteSC =datos[16]
 CargoClienteSC =datos[17]
 SalarioClienteSC =datos[18]
 AntiguedadClienteSC =datos[19]
////////////////////
 NombreGaranteSC =datos[20]
 CIGaranteSC =datos[21]
 DireccionGaranteSC =datos[22]
 ReferenciaGaranteSC =datos[23]
 NroTelGaranteSC =datos[24]
 LugarTrabajoGranteSC =datos[25]
 AntiguegagGatanteSC =datos[26]
 SalarioGaranteSC =datos[27]
 DivProductoSC =datos[2]
 
 
 DivReferenciaSC =datos[28]+datos[29];
 
 
 imprimirSolicitudCredito()
			
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


function verCerrarDescuento(){
	// if(promoproducto !== "NO"){
		// ver_vetana_informativa('ESTE PRODUCTO NO ESTÁ EN PROMO');
		// return;
	// }
	if(document.getElementById("divDescuentoProductoDetalle").style.display==""){
		document.getElementById("divDescuentoProductoDetalle").style.display="none"
		
	}else{	
/* if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	 */

		document.getElementById("divDescuentoProductoDetalle").style.display=""
		
		if(document.getElementById('inptProductoVenta').value !== ""){
			limpiarcampossolicituddescuento()
			obtenerdatosvistaSolicitudDescuento()
		}
		
	}
}

// CARGAR ARCHIVO CLIENTE GARANTE
function ExploradorArchivoClienteGaranteSolicitud(File){	
if(idGaranteFk == '6'){
	ver_vetana_informativa('FALTÓ SELECCIONAR UNA GARANTE PARA CARGAR ARCHIVOS');
	return;
}
$("input[name="+File+"]").click();
}
var archivogarantesolicitud="";
var file_extensionarchivogarantesolicitud="";
function readFileArchivoGaranteSolicitud(input){
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extensionarchivogarantesolicitud=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();

if (file_extensionarchivogarantesolicitud != "pdf" && file_extensionarchivogarantesolicitud != "jpeg" && file_extensionarchivogarantesolicitud != "png"){
ver_vetana_informativa("EL ARCHIVO SELECCIONADO NO ES UN ARCHIVO PDF O UNA IMAGEN")
return false;
}
// console.log('segmento carga archivo')
archivogarantesolicitud = input.files[0];
cargararchivogarante();
}
function cargararchivogarante() {
	// console.log('segmento carga archivo funcion')
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'cargararchivogarante')
	datos.append("archivogarante", archivogarantesolicitud)
	datos.append("ext", file_extensionarchivogarantesolicitud)
	datos.append("cod_clienteFK", idGaranteFk)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...");
					buscar_archivos_garante()
					archivogarantesolicitud="";
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscar_archivos_garante() {
	
	document.getElementById("table_vista_archivos_garante").innerHTML = '';
	document.getElementById("table_vista_archivos_garante_vista").innerHTML = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idGaranteFk": idGaranteFk,
		"formato": "json",
		"funt": "buscar_archivos_garante"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			
			document.getElementById("table_vista_archivos_garante").innerHTML = "";
			document.getElementById("table_vista_archivos_garante_vista").innerHTML = "";
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
				   
				  if(Array.isArray(datos_buscados)){
					renderArchivosGaranteSolicitud(datos_buscados,"table_vista_archivos_garante");
					renderArchivosGaranteSolicitud(datos_buscados,"table_vista_archivos_garante_vista");
				  }else{
					document.getElementById("table_vista_archivos_garante").innerHTML = datos_buscados || "";
					document.getElementById("table_vista_archivos_garante_vista").innerHTML = datos_buscados || "";
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


