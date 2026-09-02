/*
ABM PAGO PROVEEDOR
*/
var listadoAbmPagoProveedor=null;
var listadoAbmPagoProveedorDetalle=null;
var listadoDetalleCompraProveedor=null;
var listadoPagosProveedor=null;
var listadoHistorialPagosProveedor=null;
var listadoChequesFaltantesProveedor=null;
var listadoNotasCreditoProveedor=null;
var listadoRevisionDocumentos=null;
var listadoVistaRevisionDocumentos=null;
var listadoRevisionDocumentosCliente=null;
var listadoVistaRevisionDocumentosPagare=null;

function obtenerCabeceraAnteriorPagoProveedor(cuerpo){
	var nodo=cuerpo ? cuerpo.previousElementSibling : null;
	while(nodo){
		if(nodo.tagName==="TABLE" && nodo.style.display!=="none" && !nodo.querySelector("input,select,textarea")){return nodo;}
		nodo=nodo.previousElementSibling;
	}
	return null;
}

function prepararCabeceraPagoProveedor(idCuerpo,idCabecera){
	var cuerpo=document.getElementById(idCuerpo);
	if(!cuerpo){return null;}
	var cabecera=obtenerCabeceraAnteriorPagoProveedor(cuerpo);
	if(!cabecera){return null;}
	cabecera.id=idCabecera;
	return cuerpo;
}

function restaurarSeleccionPagoProveedor(cuerpo,idCelda,valor){
	if(!cuerpo || valor===undefined || valor===null || String(valor)===""){return;}
	var filas=cuerpo.querySelectorAll('tr[id="tbSelecRegistro"]');
	Array.prototype.forEach.call(filas,function(fila){
		var celda=fila.querySelector('td[id="'+idCelda+'"]');
		if(celda && celda.textContent===String(valor)){fila.className="tableRegistroSelec";}
	});
}

function crearInputSeleccionPagoProveedor(registro){
	if(!registro.seleccionable){return document.createTextNode("");}
	var input=document.createElement("input");
	input.type="checkbox";
	input.id="check"+registro.cod_compra;
	input.value=registro.cod_compra;
	input.name=registro.monto_pendiente;
	input.checked=array_cod_compras.indexOf(String(registro.cod_compra))!==-1 || array_cod_compras.indexOf(registro.cod_compra)!==-1;
	input.addEventListener("click",function(evento){
		evento.stopPropagation();
		verificarConfirmarPagoProveedor(input);
	});
	return input;
}

function crearMontoPagoProveedor(registro){
	var input=document.createElement("input");
	input.type="text";
	input.id="input"+registro.cod_compra;
	input.value=registro.monto_pendiente_formateado;
	input.disabled=true;
	input.style.width="135px";
	input.style.border="none";
	input.style.opacity="0.5";
	return input;
}

function crearBotonPagoProveedor(texto,funcion,codigo){
	var contenedor=document.createElement("center");
	var boton=document.createElement("input");
	boton.type="button";
	boton.value=texto;
	boton.id=codigo;
	boton.className="btn4";
	boton.style.width="50px";
	boton.addEventListener("click",function(evento){
		evento.stopPropagation();
		funcion(codigo);
	});
	contenedor.appendChild(boton);
	return contenedor;
}

function crearCheckRevisionDocumento(registro,esCliente){
	var input=document.createElement("input");
	input.type="checkbox";
	input.id=registro.codigo;
	input.checked=String(registro.entregado)==="1";
	input.setAttribute("aria-label",(input.checked ? "Desmarcar " : "Marcar ")+(registro.descripcion || "documento"));
	input.addEventListener("click",function(evento){
		evento.stopPropagation();
		if(esCliente){
			if(input.checked){AbmRevisionDocumentosCliente(input);}else{EliminarRevisionDocumentosCliente(input);}
		}else{
			if(input.checked){AbmRevisionDocumentos(input);}else{EliminarRevisionDocumentos(input);}
		}
	});
	return input;
}

function crearEstadoRevisionSolicitud(valor,registro){
	var contenido=document.createElement("span");
	contenido.appendChild(document.createTextNode(valor || ""));
	if(String(registro.mostrar_aprobador)==="1" && registro.usuario_aprueba){
		contenido.appendChild(document.createElement("br"));
		contenido.appendChild(document.createTextNode(registro.usuario_aprueba));
	}
	return contenido;
}

function crearProductosRevisionSolicitud(valor,registro){
	var contenido=document.createElement("div");
	var productos=Array.isArray(registro.productos) ? registro.productos : [];
	if(!productos.length){
		contenido.textContent=valor || "";
		return contenido;
	}
	productos.forEach(function(producto,indice){
		var linea=document.createElement("div");
		var numero=producto.numero || (indice+1);
		linea.appendChild(document.createTextNode(numero+") "+(producto.cantidad || "")+"/"+(producto.producto || "")+" "+(producto.cuotas || "")+" * "+(producto.cuota_formateada || "")+" = "+(producto.total_formateado || "")+"Gs. "));
		if(producto.tipo==="COMBO"){
			var boton=document.createElement("input");
			boton.type="button";
			boton.value="VER";
			boton.className="btn4";
			boton.style.width="50px";
			boton.addEventListener("click",function(){
				buscarvistacomboproductosolicitud(producto.cod_producto,"vista_solicitud",producto.local);
			});
			linea.appendChild(boton);
		}
		contenido.appendChild(linea);
	});
	return contenido;
}

function celdasVistaRevisionDocumento(fechaPrincipal,incluirFechaSolicitud){
	var celdas=[
		{id:"td_id",campo:"id_solicitud",columna:"id_solicitud",render:function(valor,registro,celda){celda.style.backgroundColor="#efeded";celda.style.color="red";return valor;}},
		{id:"td_datos_1",campo:"documento",columna:"documento"},
		{id:"td_datos_2",campo:"rut",tecnica:true},
		{id:"td_datos_3",campo:"cliente",columna:"cliente"},
		{id:"td_datos_4",campo:"zona",columna:"zona"},
		{id:"td_datos_30",campo:"local",columna:"local"},
		{id:"td_datos_31",campo:"cod_local",tecnica:true},
		{campo:fechaPrincipal,columna:fechaPrincipal},
		{campo:"estado_entrega",columna:"estado_entrega"},
		{id:"td_datos_5",campo:"telefono",tecnica:true},
		{id:"td_datos_6",campo:"direccion",tecnica:true},
		{id:"td_datos_7",campo:"email",tecnica:true},
		{id:"td_datos_8",campo:"whatsapp",tecnica:true},
		{campo:"estado",columna:"estado",render:crearEstadoRevisionSolicitud},
		{id:"td_datos_9",campo:"estado",tecnica:true},
		{id:"td_datos_10",campo:"entregador",columna:"entregador"},
		{id:"td_datos_25",campo:"id_zona",tecnica:true},
		{id:"td_datos_11",campo:"lugar_trabajo",tecnica:true},
		{id:"td_datos_12",campo:"salario_formateado",tecnica:true},
		{id:"td_datos_13",campo:"antiguedad",tecnica:true},
		{id:"td_datos_14",campo:"telefono_trabajo_1",tecnica:true},
		{id:"td_datos_15",campo:"telefono_trabajo_2",tecnica:true},
		{id:"td_datos_16",campo:"direccion_trabajo",tecnica:true},
		{id:"td_datos_17",campo:"fecha_nacimiento",tecnica:true},
		{id:"td_datos_18",campo:"garante",tecnica:true},
		{id:"td_datos_19",campo:"cod_codeudor",tecnica:true},
		{id:"td_datos_20",campo:"producto_resumen",columna:"producto_resumen",render:crearProductosRevisionSolicitud},
		{id:"td_datos_21",campo:"cod_cliente",tecnica:true},
		{id:"td_datos_22",campo:"detalle_venta",tecnica:true},
		{id:"td_datos_23",campo:"observacion",tecnica:true},
		{id:"td_datos_24",campo:"observacion_trabajo",tecnica:true},
		{id:"td_datos_26",campo:"espacio",tecnica:true},
		{id:"td_datos_27",campo:"cuotas_producto",tecnica:true},
		{id:"td_datos_28",campo:"total_producto",tecnica:true},
		{id:"td_datos_29",campo:"documento_garante",tecnica:true},
		{id:"td_datos_32",campo:"cod_venta",tecnica:true},
		{id:"td_datos_33",campo:"usuario_ingresa",columna:"usuario_ingresa"}
	];
	if(incluirFechaSolicitud){celdas.push({id:"td_datos_34",campo:"fecha_solicitud",columna:"fecha_solicitud"});}
	return celdas;
}

function iniciarListadoRevisionDocumentos(){
	if(listadoRevisionDocumentos || !window.AbmListadoCore){return listadoRevisionDocumentos;}
	if(!prepararCabeceraPagoProveedor("table_revision_documentos","cabeceraRevisionDocumentos")){return null;}
	listadoRevisionDocumentos=window.AbmListadoCore.crear({
		nombre:"revision_documentos_venta",idCabecera:"cabeceraRevisionDocumentos",idCuerpo:"table_revision_documentos",ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DOCUMENTO",ancho:"50%"},{campo:"entregado",titulo:"ENTREGADO",ancho:"50%"}],
		fila:{border:"0",cellspacing:"0",cellpadding:"0",celdas:[
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion"},
			{id:"td_datos_2",campo:"estado",tecnica:true},
			{campo:"entregado",columna:"entregado",render:function(valor,registro){return crearCheckRevisionDocumento(registro,false);}}
		]}
	});
	listadoRevisionDocumentos.iniciar();
	return listadoRevisionDocumentos;
}

function iniciarListadoRevisionDocumentosCliente(){
	if(listadoRevisionDocumentosCliente || !window.AbmListadoCore){return listadoRevisionDocumentosCliente;}
	if(!prepararCabeceraPagoProveedor("table_revision_documentos_cliente","cabeceraRevisionDocumentosCliente")){return null;}
	listadoRevisionDocumentosCliente=window.AbmListadoCore.crear({
		nombre:"revision_documentos_cliente",idCabecera:"cabeceraRevisionDocumentosCliente",idCuerpo:"table_revision_documentos_cliente",ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DOCUMENTO",ancho:"50%"},{campo:"entregado",titulo:"ENTREGADO",ancho:"50%"}],
		fila:{border:"0",cellspacing:"0",cellpadding:"0",celdas:[
			{id:"td_datos_1",campo:"descripcion",columna:"descripcion"},
			{id:"td_datos_2",campo:"estado",tecnica:true},
			{campo:"entregado",columna:"entregado",render:function(valor,registro){return crearCheckRevisionDocumento(registro,true);}}
		]}
	});
	listadoRevisionDocumentosCliente.iniciar();
	return listadoRevisionDocumentosCliente;
}

function iniciarListadoVistaRevisionDocumentos(){
	if(listadoVistaRevisionDocumentos || !window.AbmListadoCore){return listadoVistaRevisionDocumentos;}
	if(!prepararCabeceraPagoProveedor("table_vista_ventas_documentos","cabeceraVistaRevisionDocumentos")){return null;}
	listadoVistaRevisionDocumentos=window.AbmListadoCore.crear({
		nombre:"vista_revision_documentos",idCabecera:"cabeceraVistaRevisionDocumentos",idCuerpo:"table_vista_ventas_documentos",ordenInicial:"id_solicitud",
		columnas:[
			{campo:"id_solicitud",titulo:"#",ancho:"7%"},{campo:"documento",titulo:"NRO DOC.",ancho:"7%"},{campo:"cliente",titulo:"CLIENTE",ancho:"15%"},
			{campo:"zona",titulo:"ZONA",ancho:"7%"},{campo:"local",titulo:"LOCAL",ancho:"7%"},{campo:"fecha_venta",titulo:"FECHA VENTA",ancho:"7%"},
			{campo:"estado_entrega",titulo:"ENTREGADO",ancho:"7%"},{campo:"estado",titulo:"ESTADO",ancho:"7%"},{campo:"entregador",titulo:"ENTREGADO POR",ancho:"7%"},
			{campo:"producto_resumen",titulo:"PRODUCTO",ancho:"15%"},{campo:"usuario_ingresa",titulo:"VENDEDOR",ancho:"7%"},{campo:"fecha_solicitud",titulo:"FECHA SOLICITUD",ancho:"7%"}
		],
		fila:{funcionSeleccion:"obtenerdatosvistaventadocumentos",celdas:celdasVistaRevisionDocumento("fecha_venta",true)},
		despuesRender:function(cuerpo){restaurarSeleccionPagoProveedor(cuerpo,"td_id",idabmSolicitudDocumento);}
	});
	listadoVistaRevisionDocumentos.iniciar();
	return listadoVistaRevisionDocumentos;
}

function iniciarListadoVistaRevisionDocumentosPagare(){
	if(listadoVistaRevisionDocumentosPagare || !window.AbmListadoCore){return listadoVistaRevisionDocumentosPagare;}
	if(!prepararCabeceraPagoProveedor("table_vista_ventas_documentos_cliente_pagare","cabeceraVistaRevisionDocumentosPagare")){return null;}
	listadoVistaRevisionDocumentosPagare=window.AbmListadoCore.crear({
		nombre:"vista_revision_documentos_pagare",idCabecera:"cabeceraVistaRevisionDocumentosPagare",idCuerpo:"table_vista_ventas_documentos_cliente_pagare",ordenInicial:"id_solicitud",
		columnas:[
			{campo:"id_solicitud",titulo:"#",ancho:"5%"},{campo:"documento",titulo:"NRO DOC.",ancho:"5%"},{campo:"cliente",titulo:"CLIENTE",ancho:"10%"},
			{campo:"zona",titulo:"ZONA",ancho:"10%"},{campo:"local",titulo:"LOCAL",ancho:"10%"},{campo:"fecha_solicitud",titulo:"FECHA",ancho:"10%"},
			{campo:"estado_entrega",titulo:"ENTREGADO",ancho:"10%"},{campo:"estado",titulo:"ESTADO",ancho:"5%"},{campo:"entregador",titulo:"ENTREGADO POR",ancho:"5%"},
			{campo:"producto_resumen",titulo:"PRODUCTO",ancho:"10%"},{campo:"usuario_ingresa",titulo:"VENDEDOR",ancho:"10%"}
		],
		fila:{funcionSeleccion:"obtenerdatosvistaventadocumentosclientepagare",celdas:celdasVistaRevisionDocumento("fecha_solicitud",false)},
		despuesRender:function(cuerpo){restaurarSeleccionPagoProveedor(cuerpo,"td_id",idabmSolicitudDocumentoCliente);}
	});
	listadoVistaRevisionDocumentosPagare.iniciar();
	return listadoVistaRevisionDocumentosPagare;
}

function iniciarListadoAbmPagoProveedorDetalle(){
	if(listadoAbmPagoProveedorDetalle || !window.AbmListadoCore){return listadoAbmPagoProveedorDetalle;}
	if(!prepararCabeceraPagoProveedor("table_abm_PagoProveedorDetalle","cabeceraAbmPagoProveedorDetalle")){return null;}
	listadoAbmPagoProveedorDetalle=window.AbmListadoCore.crear({
		nombre:"pago_proveedor_detalle",
		idCabecera:"cabeceraAbmPagoProveedorDetalle",
		idCuerpo:"table_abm_PagoProveedorDetalle",
		columnas:[
			{campo:"seleccionable",titulo:"ACCION",ancho:"5%"},
			{campo:"monto_pendiente",titulo:"MONTO",ancho:"15%"},
			{campo:"tipo_compra",titulo:"TIPO",ancho:"10%"},
			{campo:"proveedor",titulo:"PROVEEDOR",ancho:"20%"},
			{campo:"nro_factura",titulo:"NRO FACTURA",ancho:"10%"},
			{campo:"fecha_compra",titulo:"FECHA",ancho:"10%"},
			{campo:"total_pendiente",titulo:"TOTAL",ancho:"10%"},
			{campo:"total_pagado",titulo:"PAGADO",ancho:"10%"},
			{campo:"detalle",titulo:"BOTON",ancho:"5%",ordenable:false},
			{campo:"nota_credito",titulo:"BOTON",ancho:"5%",ordenable:false}
		],
		fila:{
			atributosFila:{name:"tbPagoProveedor"},
			celdas:[
				{id:"td_datos_1",campo:"seleccionable",columna:"seleccionable",render:function(valor,registro){return crearInputSeleccionPagoProveedor(registro);}},
				{id:"td_datos_2",campo:"monto_pendiente_formateado",columna:"monto_pendiente",render:function(valor,registro){return crearMontoPagoProveedor(registro);}},
				{id:"td_datos_2",campo:"tipo_compra",columna:"tipo_compra"},
				{id:"td_datos_3",campo:"proveedor",columna:"proveedor"},
				{id:"td_datos_4",campo:"nro_factura",columna:"nro_factura"},
				{id:"td_datos_5",campo:"fecha_compra",columna:"fecha_compra"},
				{id:"td_datos_6",campo:"monto_pendiente_formateado",columna:"total_pendiente"},
				{campo:"total_pagado_formateado",columna:"total_pagado"},
				{id:"td_datos_11",campo:"cod_compra",columna:"detalle",render:function(valor){return crearBotonPagoProveedor("VER",verCerrarAbmPagoProveedorDetalleCompra,valor);}},
				{id:"td_datos_11",campo:"cod_compra",columna:"nota_credito",render:function(valor){return crearBotonPagoProveedor("CARGA",verCerrarAbmCargarNotaCredito,valor);}},
				{id:"td_datos_9",campo:"cod_proveedor",tecnica:true},
				{id:"td_datos_10",campo:"cod_compra",tecnica:true}
			]
		}
	});
	listadoAbmPagoProveedorDetalle.iniciar();
	return listadoAbmPagoProveedorDetalle;
}

function iniciarListadoDetalleCompraProveedor(){
	if(listadoDetalleCompraProveedor || !window.AbmListadoCore){return listadoDetalleCompraProveedor;}
	if(!prepararCabeceraPagoProveedor("table_abm_PagoProveedorDetalleCompra","cabeceraDetalleCompraProveedor")){return null;}
	listadoDetalleCompraProveedor=window.AbmListadoCore.crear({
		nombre:"detalle_compra_proveedor",
		idCabecera:"cabeceraDetalleCompraProveedor",
		idCuerpo:"table_abm_PagoProveedorDetalleCompra",
		columnas:[
			{campo:"cod_producto",titulo:"CODIGO",ancho:"10%"},
			{campo:"producto",titulo:"PRODUCTO",ancho:"50%"},
			{campo:"cantidad",titulo:"CANTIDAD",ancho:"5%"},
			{campo:"precio",titulo:"PRECIO",ancho:"10%"},
			{campo:"subtotal",titulo:"TOTAL",ancho:"15%"}
		],
		fila:{funcionSeleccion:"obtenerdatosabmdetallecompra",celdas:[
			{id:"td_datos_1",campo:"cod_producto",columna:"cod_producto"},
			{id:"td_datos_1",campo:"producto",columna:"producto"},
			{id:"td_datos_3",campo:"cantidad_formateada",columna:"cantidad"},
			{id:"td_datos_2",campo:"precio_formateado",columna:"precio"},
			{id:"td_datos_4",campo:"subtotal_formateado",columna:"subtotal"},
			{id:"td_id_1",campo:"cod_producto_fk",tecnica:true},
			{id:"td_id_2",campo:"cod_detalle_compra",tecnica:true}
		]},
		despuesRender:function(cuerpo){restaurarSeleccionPagoProveedor(cuerpo,"td_id_2",window.idDetalleCompra);}
	});
	listadoDetalleCompraProveedor.iniciar();
	return listadoDetalleCompraProveedor;
}

function iniciarListadoPagosProveedor(){
	if(listadoPagosProveedor || !window.AbmListadoCore){return listadoPagosProveedor;}
	if(!prepararCabeceraPagoProveedor("table_abm_ListadoPago","cabeceraListadoPagosProveedor")){return null;}
	listadoPagosProveedor=window.AbmListadoCore.crear({
		nombre:"listado_pagos_proveedor",
		idCabecera:"cabeceraListadoPagosProveedor",
		idCuerpo:"table_abm_ListadoPago",
		columnas:[
			{campo:"fecha_pago",titulo:"FECHA PAGO",ancho:"10%"},
			{campo:"proveedor",titulo:"PROVEEDOR",ancho:"50%"},
			{campo:"importe",titulo:"TOTAL PAGO",ancho:"10%"},
			{campo:"usuario",titulo:"USUARIO",ancho:"30%"}
		],
		fila:{funcionSeleccion:"obtenerdatosabmlistadoPago",celdas:[
			{campo:"fecha_pago",columna:"fecha_pago"},
			{id:"td_datos_1",campo:"proveedor",columna:"proveedor"},
			{campo:"importe_formateado",columna:"importe"},
			{campo:"usuario",columna:"usuario"},
			{id:"td_datos_2",campo:"id_cheque",tecnica:true}
		]},
		despuesRender:function(cuerpo){restaurarSeleccionPagoProveedor(cuerpo,"td_datos_2",cod_chequeListadoPago);}
	});
	listadoPagosProveedor.iniciar();
	return listadoPagosProveedor;
}

function iniciarListadoHistorialPagosProveedor(){
	if(listadoHistorialPagosProveedor || !window.AbmListadoCore){return listadoHistorialPagosProveedor;}
	if(!prepararCabeceraPagoProveedor("table_historial_pago_proveedor","cabeceraHistorialPagosProveedor")){return null;}
	listadoHistorialPagosProveedor=window.AbmListadoCore.crear({
		nombre:"historial_pagos_proveedor",
		idCabecera:"cabeceraHistorialPagosProveedor",
		idCuerpo:"table_historial_pago_proveedor",
		columnas:[
			{campo:"id_cheque",titulo:"NRO CHEQUE",ancho:"10%"},
			{campo:"fecha_pago",titulo:"FECHA PAGO",ancho:"10%"},
			{campo:"proveedor",titulo:"PROVEEDOR",ancho:"50%"},
			{campo:"importe",titulo:"TOTAL PAGO",ancho:"10%"},
			{campo:"usuario",titulo:"USUARIO",ancho:"20%"}
		],
		fila:{funcionSeleccion:"obtenerdatosHistorialPagoProveedor",celdas:[
			{id:"td_datos_2",campo:"id_cheque",columna:"id_cheque"},
			{campo:"fecha_pago",columna:"fecha_pago"},
			{id:"td_datos_1",campo:"proveedor",columna:"proveedor"},
			{campo:"importe_formateado",columna:"importe"},
			{campo:"usuario",columna:"usuario"},
			{id:"td_datos_3",campo:"id_pago_total_compra",tecnica:true}
		]},
		despuesRender:function(cuerpo){restaurarSeleccionPagoProveedor(cuerpo,"td_datos_2",cod_chequeListadoPago);}
	});
	listadoHistorialPagosProveedor.iniciar();
	return listadoHistorialPagosProveedor;
}

function iniciarListadoChequesFaltantesProveedor(){
	if(listadoChequesFaltantesProveedor || !window.AbmListadoCore){return listadoChequesFaltantesProveedor;}
	if(!prepararCabeceraPagoProveedor("table_pagos_fatantes_compras","cabeceraChequesFaltantesProveedor")){return null;}
	listadoChequesFaltantesProveedor=window.AbmListadoCore.crear({
		nombre:"cheques_faltantes_proveedor",
		idCabecera:"cabeceraChequesFaltantesProveedor",
		idCuerpo:"table_pagos_fatantes_compras",
		columnas:[
			{campo:"faltante",titulo:"FALTANTE",ancho:"10%"},
			{campo:"proveedor",titulo:"PROVEEDOR",ancho:"70%"},
			{campo:"total_pagado",titulo:"PAGADO",ancho:"10%"},
			{campo:"total_a_pagar",titulo:"TOTAL A PAGAR",ancho:"10%"}
		],
		fila:{funcionSeleccion:"obtenerdatosChequeFaltantes",celdas:[
			{id:"td_datos_8",campo:"faltante_formateado",columna:"faltante"},
			{id:"td_datos_7",campo:"proveedor",columna:"proveedor"},
			{id:"td_datos_4",campo:"total_pagado_formateado",columna:"total_pagado"},
			{id:"td_datos_9",campo:"total_a_pagar_formateado",columna:"total_a_pagar"},
			{id:"td_datos_1",campo:"cod_proveedor",tecnica:true},
			{id:"td_datos_2",campo:"compras_json",tecnica:true},
			{id:"td_datos_3",campo:"id_pago_total_compra",tecnica:true}
		]}
	});
	listadoChequesFaltantesProveedor.iniciar();
	return listadoChequesFaltantesProveedor;
}

function iniciarListadoNotasCreditoProveedor(){
	if(listadoNotasCreditoProveedor || !window.AbmListadoCore){return listadoNotasCreditoProveedor;}
	if(!prepararCabeceraPagoProveedor("divBuscadorRegistrosNotaCredito","cabeceraNotasCreditoProveedor")){return null;}
	listadoNotasCreditoProveedor=window.AbmListadoCore.crear({
		nombre:"notas_credito_proveedor",
		idCabecera:"cabeceraNotasCreditoProveedor",
		idCuerpo:"divBuscadorRegistrosNotaCredito",
		columnas:[
			{campo:"fecha",titulo:"FECHA",ancho:"33%"},
			{campo:"nro_nota_credito",titulo:"NUMERO",ancho:"33%"},
			{campo:"monto",titulo:"MONTO",ancho:"33%"}
		],
		fila:{funcionSeleccion:"obtenerdatosCargarNotaCredito",celdas:[
			{id:"td_datos_1",campo:"fecha",columna:"fecha"},
			{id:"td_datos_2",campo:"nro_nota_credito",columna:"nro_nota_credito"},
			{id:"td_datos_3",campo:"monto_formateado",columna:"monto"},
			{id:"td_datos_4",campo:"id_nota_credito",tecnica:true}
		]},
		despuesRender:function(cuerpo){restaurarSeleccionPagoProveedor(cuerpo,"td_datos_4",idNotaCredito);}
	});
	listadoNotasCreditoProveedor.iniciar();
	return listadoNotasCreditoProveedor;
}

function iniciarListadoAbmPagoProveedor(){
	if(listadoAbmPagoProveedor || !window.AbmListadoCore){return listadoAbmPagoProveedor;}
	var cuerpo=document.getElementById("table_abm_PagoProveedor");
	if(!cuerpo){return null;}
	var tablaFiltros=cuerpo.previousElementSibling;
	var cabecera=tablaFiltros ? tablaFiltros.previousElementSibling : null;
	if(!cabecera || cabecera.tagName!=="TABLE"){return null;}
	cabecera.id="cabeceraAbmPagoProveedor";
	listadoAbmPagoProveedor=window.AbmListadoCore.crear({
		nombre:"pago_proveedor",
		idCabecera:"cabeceraAbmPagoProveedor",
		idCuerpo:"table_abm_PagoProveedor",
		columnas:[
			{campo:"proveedor",titulo:"PROVEEDOR",ancho:"50%"},
			{campo:"total_deuda",titulo:"TOTAL DEUDA",ancho:"25%"},
			{campo:"usuario",titulo:"USUARIO",ancho:"25%"}
		],
		fila:{
			funcionSeleccion:"obtenerdatosabmPagoProveedor",
			celdas:[
				{id:"td_id",campo:"cod_compra",tecnica:true},
				{id:"td_datos_1",campo:"proveedor",columna:"proveedor"},
				{id:"td_datos_2",campo:"total_deuda_formateado",columna:"total_deuda"},
				{id:"td_datos_4",campo:"fecha_compra",tecnica:true},
				{id:"td_datos_5",campo:"usuario",columna:"usuario"},
				{id:"td_datos_6",campo:"cod_proveedor",tecnica:true},
				{id:"td_datos_7",campo:"fecha_desde",tecnica:true},
				{id:"td_datos_8",campo:"fecha_hasta",tecnica:true}
			]
		},
		despuesRender:function(cuerpo){restaurarSeleccionPagoProveedor(cuerpo,"td_datos_6",idAbmPagoProveedor);}
	});
	listadoAbmPagoProveedor.iniciar();
	return listadoAbmPagoProveedor;
}
function verCerrarAbmPagoProveedor(){
		document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmPagoProveedor").style.display==""){
		document.getElementById("divMinimizadoPagoProveedor").style.display="none"
		limpiarcamposPagoProveedor()
		// limpiarcamposbuscarTipoPago()
		 
		$("div[id=divAbmPagoProveedor]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERPAGOPROVEEDOR","accion")==false){return;}
		mostrarSoloUno("divAbmPagoProveedor")	
		document.getElementById("divAbmPagoProveedor").style.display=""
		 
	}
}

function verCerrarVentanaAbmPagoProveedor(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			
		}
		// $("div[id=divAbmPagoProveedor2]").fadeIn(250)
		document.getElementById('divAbmPagoProveedor1').style.display = "none"
		document.getElementById('divAbmPagoProveedor2').style.display = ""
	} else {
		// $("div[id=divAbmPagoProveedor1]").fadeIn(250)
		document.getElementById('divAbmPagoProveedor2').style.display = "none"
		document.getElementById('divAbmPagoProveedor1').style.display = ""
		
		buscarabmPagoProveedor()
		
	}
}

function limpiarcamposPagoProveedor(){
	    document.getElementById('inptBuscarAbmPagoProveedor2').value=""
		document.getElementById("table_abm_PagoProveedor").innerHTML = ""
		document.getElementById("inptTotalRegistoPagoProveedor").value = "";
		document.getElementById("inptRegistroSeleccPagoProveedor").value = "";
		document.getElementById("inptTotalRegistoPagoProveedor").value = "";
		document.getElementById("inptTotalDeudaPagoProveedor").value = "";
		document.getElementById("btnEditarDatosPagoProveedor").style = "background-color:#d5d3d3";
		document.getElementById("btnListaPagoProveedor").style = "background-color:#d5d3d3";
		// document.getElementById("btnPendientesPagoProveedor").style = "background-color:#d5d3d3";
		idAbmPagoProveedor = "";
}

function minimizarabmProveedor(){ 
	$("div[id=divAbmPagoProveedor]").fadeOut(500);	
	document.getElementById("divMinimizadoPagoProveedor").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuPagoProveedor"));
}

function verVentanaEditarPagoProveedor() {
	if (idAbmPagoProveedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	buscarCompraProveedorDetalle()
	verCerrarVentanaAbmPagoProveedor("1", "2")
}
var idAbmPagoProveedor = ""
var fecha1PagoProveedor = ""
var fecha2PagoProveedor = ""
var totalDeudaaProveedor = "";
function obtenerdatosabmPagoProveedor(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	document.getElementById('inptRegistroSeleccPagoProveedor').value = $(datostr).children('td[id="td_datos_1"]').text();
	
	fecha1PagoProveedor = $(datostr).children('td[id="td_datos_7"]').text();
	fecha2PagoProveedor = $(datostr).children('td[id="td_datos_8"]').text();
	totalDeudaaProveedor = $(datostr).children('td[id="td_datos_2"]').text();

	document.getElementById('btnEditarDatosPagoProveedor').style.backgroundColor="";
	document.getElementById('btnListaPagoProveedor').style.backgroundColor="";
	// document.getElementById('btnPendientesPagoProveedor').style.backgroundColor="";
	idAbmPagoProveedor = $(datostr).children('td[id="td_datos_6"]').text();
}
var idpagocompraproveedor = "";
function obtenerdatoschequeapagar(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	idpagocompraproveedor = $(datostr).children('td[id="td_datos_10"]').text();
	
}

function verificarcamposPagarProveedor() {
	var inputTotalPagarProveedor = document.getElementById('inputTotalPagarProveedor').value
	
	if (inputTotalPagarProveedor == "" || inputTotalPagarProveedor=="0" ) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO")
		return false;
	}
	
	 
		accion = "nuevoPagoProveedor";
	 
	abmPagarProveedor(inputTotalPagarProveedor, idAbmPagoProveedor, accion);
}
function abmPagarProveedor(monto , idPagoProveedor, accion) {
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	
	var control=0;
$("tr[name=tbPagoProveedor]").each(function(i, elementohtml){



	var id=$(elementohtml).children('td[id="td_datos_10"]').text();
	
	
	if(document.getElementById('check'+id).checked==true){
		control=control+1;
		datos.append("cod_compra"+control, id)
   
   var MontoPagar=document.getElementById("input"+id).value ; 
		datos.append("MontoPagar"+control, MontoPagar)
 
	}
 
   });
   
   // control=control-1;	
	if(control<=0){
	ver_vetana_informativa("FALTO DATOS DEL PAGO")
	return false ;
	}
   
	datos.append("control", control)
	 
	
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idPagoProveedor", idpagocompraproveedor)
	datos.append("monto", monto)

	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
        var porce= ~~((evt.loaded / evt.total) * 100); 
		if(porce>90){
		porce=Number(porce)-7				
		}
		document.getElementById("lbltitulomensaje_b").innerHTML="Cargando<br>("+porce+"%)";
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					/* buscarabmPagoProveedor();
					buscarCompraProveedorDetalle() */
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function buscarabmPagoProveedor() {
	// if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var listado=iniciarListadoAbmPagoProveedor();
	var fecha1 = document.getElementById('inptBuscarPagoProveedorF1').value
	var fecha2 = document.getElementById('inptBuscarPagoProveedorF2').value
	var proveedor= document.getElementById("inptBuscarAbmPagoProveedor2").value
	var control= document.getElementById("inptBuscarAbmPagoProveedor3").value


	if(document.getElementById('checkHistorialFechaPagoProveedor2').checked==true){
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
	
	document.getElementById("table_abm_PagoProveedor").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"proveedor": proveedor,
		"fecha1": fecha1,
		"fecha2": fecha2,	
		"control": control,	
		"formato": listado ? "json" : "html",
		"funt": "buscarCompraProveedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",

		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_PagoProveedor").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_PagoProveedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_abm_PagoProveedor").innerHTML=datos[2] || "";
					}
					document.getElementById("inptTotalRegistoPagoProveedor").value = datos[3];
					document.getElementById("inptTotalDeudaPagoProveedor").value = datos[6];
					document.getElementById("btnEditarDatosPagoProveedor").style = "background-color:#d5d3d3";
		document.getElementById("btnListaPagoProveedor").style = "background-color:#d5d3d3";
		// document.getElementById("btnPendientesPagoProveedor").style = "background-color:#d5d3d3";
		document.getElementById("inptRegistroSeleccPagoProveedor").value = "";
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function iniciarListadosPagoProveedor(){
	iniciarListadoAbmPagoProveedor();
	iniciarListadoAbmPagoProveedorDetalle();
	iniciarListadoDetalleCompraProveedor();
	iniciarListadoPagosProveedor();
	iniciarListadoHistorialPagosProveedor();
	iniciarListadoChequesFaltantesProveedor();
	iniciarListadoNotasCreditoProveedor();
	iniciarListadoRevisionDocumentos();
	iniciarListadoRevisionDocumentosCliente();
	iniciarListadoVistaRevisionDocumentos();
	iniciarListadoVistaRevisionDocumentosPagare();
}
if(document.readyState==="loading"){
	document.addEventListener("DOMContentLoaded",iniciarListadosPagoProveedor);
}else{
	iniciarListadosPagoProveedor();
}


var array_cod_compras = [];
function buscarCompraProveedorDetalle() {

	array_cod_compras = [];
	var listado=iniciarListadoAbmPagoProveedorDetalle();
	document.getElementById("table_abm_PagoProveedorDetalle").innerHTML = paginacargando
	document.getElementById("table_abm_PagoProveedorDetalle_imprimir").innerHTML = ''
	
	var control = document.getElementById('buscarCompraProveedorDetalle1').value;
	var nro_factura = document.getElementById('buscarCompraProveedorDetalle2').value;
	var fecha = document.getElementById('buscarCompraProveedorDetalle3').value;
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"proveedor": idAbmPagoProveedor,
		"fecha1": fecha1PagoProveedor,
		"fecha2": fecha2PagoProveedor,	
		"control": control,	
		"cod_factura": nro_factura,	
		"fecha_compra": fecha,	
		"formato": listado ? "json" : "html",
		"funt": "buscarCompraProveedorDetalle"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_PagoProveedorDetalle").innerHTML = ''
			document.getElementById("table_abm_PagoProveedorDetalle_imprimir").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_PagoProveedorDetalle").innerHTML = ''
			document.getElementById("table_abm_PagoProveedorDetalle_imprimir").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_abm_PagoProveedorDetalle").innerHTML = datos[2] || "";
					}
					document.getElementById("table_abm_PagoProveedorDetalle_imprimir").innerHTML =  datos[6];
					
					document.getElementById("inputTotalPagarProveedor").value = 0;
					document.getElementById("inputTotalPendienteProveedor").value = datos[7];
					document.getElementById("inputTotalPagadoProveedor").value = datos[8];
					
					document.getElementById("inputTotalComprasProveedor").value = datos[4];
					document.getElementById("inputTotalDescuentoProveedor").value = datos[5];
					document.getElementById("inputTotalNotaCreditoProveedor").value = datos[9];
					/* array_cod_compras = []
					let cod = "";
					$("tr[name=tbPagoProveedor]").each(function (i, tr) {
						cod = ($(tr).children('td[id="td_datos_10"]').html());
						array_cod_compras.push(cod);
					}); */
					
idpagocompraproveedor = "";
					TotalProveedor = 0;
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

	let TotalProveedor = 0 ;
function verificarConfirmarPagoProveedor(datos){
	var checkid= datos.value;
control_ventana_pago_proveedor = 0;
	let index = array_cod_compras.indexOf(checkid);
	if(document.getElementById('check'+checkid).checked==false){
		TotalProveedor = Number(TotalProveedor) - Number(QuitarSeparadorMilValor(datos.name))
		document.getElementById('input'+checkid).value = separadordemilesnumero(datos.name)
		if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_compras.splice(index, 1);
		console.log(array_cod_compras)
    }
		document.getElementById("input"+checkid).value= 0
	}else{
		document.getElementById("input"+checkid).value= datos.name
		// Si la ID no existe, insertarla
        array_cod_compras.push(checkid);
		console.log(array_cod_compras)
		TotalProveedor = Number(TotalProveedor) + Number(QuitarSeparadorMilValor(datos.name))
		document.getElementById('input'+checkid).value = separadordemilesnumero(datos.name)
		
	}
	
	
	
	document.getElementById("inputTotalPagarProveedor").value = separadordemilesnumero(TotalProveedor)
	
	
	
}

function buscarDetalleCompraProveedor(cod_compraFKDetalle){

	var listado=iniciarListadoDetalleCompraProveedor();
	document.getElementById("table_abm_PagoProveedorDetalleCompra").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": cod_compraFKDetalle,
		"formato": listado ? "json" : "html",
		"funt": "buscarDetalle"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_PagoProveedorDetalleCompra").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_PagoProveedorDetalleCompra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_abm_PagoProveedorDetalleCompra").innerHTML = datos[2] || "";
					}
					
					document.getElementById("inptTotalRegistoPagoProveedorDetalleCompra").value = datos[3];

					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}

function checkHistorialFechaPagoProveedor(d){	
	if(d=="1"){
		document.getElementById('checkHistorialFechaPagoProveedor1').checked=true
		document.getElementById('checkHistorialFechaPagoProveedor2').checked=false
		document.getElementById('inptBuscarPagoProveedorF1').value = "";
	    document.getElementById('inptBuscarPagoProveedorF2').value = "";	
	}else{		
		document.getElementById('checkHistorialFechaPagoProveedor1').checked=false
		document.getElementById('checkHistorialFechaPagoProveedor2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarPagoProveedorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarPagoProveedorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function verCerrarAbmPagoProveedorDetalleCompra(Cod_compra){
	if(document.getElementById("divAbmPagoProveedorDetalleCompra").style.display==""){
	
		 
		$("div[id=divAbmPagoProveedorDetalleCompra]").fadeOut(500);	
	}else{		
		
		buscarDetalleCompraProveedor(Cod_compra)
		document.getElementById("divAbmPagoProveedorDetalleCompra").style.display=""
		 
	}
}

function verCerrarListadoPago(){
	if (idAbmPagoProveedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	
	if(document.getElementById("divAbmListadoPago").style.display==""){
		
		//comprobar si ya cargo cubrio la totalidad a pagar
	let inptTotalPagarListadoPago = QuitarSeparadorMilValor(document.getElementById('inptTotalPagarListadoPago').value)
	let inptTotalPagadoListadoPago = QuitarSeparadorMilValor(document.getElementById('inptTotalPagadoListadoPago').value)
	
	inptTotalPagarListadoPago = parseInt(inptTotalPagarListadoPago)
	inptTotalPagadoListadoPago = parseInt(inptTotalPagadoListadoPago)
	
	if(inptTotalPagarListadoPago > inptTotalPagadoListadoPago){
		if(confirm('FALTA CUBRIR LA TOTALIDAD DE LOS PAGOS REALMENTE DESEA SALIR?')){
			//Si cargó todo cerrar y limpiar
			//  
			document.getElementById("divAbmListadoPago").style.display=""
			array_cod_compras = []
			LimpiarCamposListaPagoproveedor()
			buscarCompraProveedorDetalle()
		}else{
			return;
		}
	}
	
	//  
	// $("div[id=divAbmListadoPago]").fadeOut(500);
	document.getElementById("divAbmListadoPago").style.display="none"
	array_cod_compras = []
	LimpiarCamposListaPagoproveedor()
	buscarCompraProveedorDetalle()
	
	}else{	
		// if(controlacceso("VERINFORMEPAGOPROVEEDOR","accion")==false){return;}
		document.getElementById("divAbmListadoPago").style.display=""
		 //  
	}
}

function buscarDetalleCompraInforme(){
	var listado=iniciarListadoPagosProveedor();
	document.getElementById("table_abm_ListadoPago").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codProveedorPago": idAbmPagoProveedor,
		"array_cod_compras": JSON.stringify(array_cod_compras),
		"id_carga_pago_total_a_compra": id_carga_pago_total_a_compra,
		"formato": listado ? "json" : "html",
		"funt": "buscarListaPagos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_ListadoPago").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_ListadoPago").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_abm_ListadoPago").innerHTML = datos[2] || "";
					}
					document.getElementById("inptTotalPagadoListadoPago").value = datos[3];
					
					/* CALCULAR FALTANTE */
					document.getElementById('inptTotalPagarListadoPago').value = separadordemilesnumero(datos[4]);
					document.getElementById('inptTotalFaltanteListadoPago').value = separadordemilesnumero(datos[5]);
					
					
					LimpiarCamposListaPagoproveedor()
					

					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}

let cod_chequeListadoPago="";
function obtenerdatosabmlistadoPago(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'

	document.getElementById('inptSeleccionadoListadoPago').value = $(datostr).children('td[id="td_datos_1"]').text();
	
	document.getElementById('btnEliminarPagoProveedor').style.backgroundColor="#fb774f";
	cod_chequeListadoPago = $(datostr).children('td[id="td_datos_2"]').text();
	
}

function LimpiarCamposListaPagoproveedor(){
	
	document.getElementById('inptSeleccionadoListadoPago').value = ""
	document.getElementById('btnEliminarPagoProveedor').style.backgroundColor="#d5d3d3";
	cod_chequeListadoPago = ""
	
}
function EliminarListadoPagoCargando(){
	
	if(cod_chequeListadoPago==""){
		return false;
	}
	
	if(confirm("Estas Seguro que quieres eliminar este pago")){

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_chequeListadoPago": cod_chequeListadoPago,
		"funt": "EliminarListadoPagoCargando"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
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
					
					ver_vetana_informativa("ELIMINADO CON EXITO")
						cod_chequeListadoPago=""
						buscarDetalleCompraInforme()
						document.getElementById('btnEliminarPagoProveedor').style.backgroundColor="#d5d3d3";
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	
	}

}

function EliminarListadoPagoHistorial(){
	
	if(cod_chequeListadoPago==""){
		return false;
	}
	
	if(confirm("Estas Seguro que quieres eliminar este pago")){

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_chequeListadoPago": cod_chequeListadoPago,
		"id_carga_pago_total_a_compra": cod_chequeListadoPagoTotalCompra,
		"funt": "EliminarListadoPago"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
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
					
						ver_vetana_informativa("ELIMINADO CON EXITO")
						cod_chequeListadoPago=""
						buscarHistorialPagosProveedor()
						document.getElementById('btnEliminarHistorialPagoProveedor').style.backgroundColor="#d5d3d3";
						
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	
	}

}

/*
CARGAR CHEQUES EN PAGOS PROVEEDOR
*/
var control_ventana_pago_proveedor = 0;
function verCerrarAbmCargarCheque(){
	
	if(array_cod_compras.length== 0){
		ver_vetana_informativa('FALTO SELECCIONAR UNA COMPRA O VARIAS COMPRAS A PAGAR');
		return;
	}
	
	
	
	if(document.getElementById("divAbmListadoPago").style.display==""){
		

		document.getElementById("divAbmListadoPago").style.display="none"
	}else{		
		
		
		
		
		
		if(control_ventana_pago_proveedor == 0){
			
			
		var totalPagar = document.getElementById('inputTotalPagarProveedor').value;
		totalPagar = QuitarSeparadorMilValor(totalPagar);
		if(parseInt(totalPagar) <= 0){
			ver_vetana_informativa("EL TOTAL A PAGAR DEBE SER MAYOR A 0")
			return;
		}
			
			VerCerrarVentanaPagoTotalCompra('1')
			// document.getElementById("divAbmCargarCheque").style.display=""
			
			document.getElementById('inptConfirmarPagoTotalAPagar').value = document.getElementById('inputTotalPagarProveedor').value
		}else{
			
			document.getElementById("divAbmListadoPago").style.display=""
		}
		
		
		
		
	
		
		
	}
}

/* PAGO TOTAL COMPRA */
function VerCerrarVentanaPagoTotalCompra(d){
if(d == '1'){
		document.getElementById("divConfirmarpagototalcompra").style.display=""
		document.getElementById('inptConfirmarPagoTotalCompra').value = document.getElementById('inputTotalPagarProveedor').value
	}else{
		document.getElementById("divConfirmarpagototalcompra").style.display="none"
}
}

function verificarConfirmarPagoTotalCompra(){
	let inptConfirmarPagoTotalCompra = document.getElementById('inptConfirmarPagoTotalCompra').value;
	inptConfirmarPagoTotalCompra = Number(QuitarSeparadorMilValor(inptConfirmarPagoTotalCompra));
	
	let inptConfirmarPagoTotalAPagar = document.getElementById('inptConfirmarPagoTotalAPagar').value;
	
	if(inptConfirmarPagoTotalAPagar == ''){
		ver_vetana_informativa('FALTÓ INGRESAR UN MONTO');
		return;
	}
	
	inptConfirmarPagoTotalAPagar = Number(QuitarSeparadorMilValor(inptConfirmarPagoTotalAPagar));
	
	if(inptConfirmarPagoTotalAPagar <= 0){
		ver_vetana_informativa('EL MONTO INGRESADO ES MENOR O IGUAL A CERO');
		return;
	}
	
	if(inptConfirmarPagoTotalAPagar > inptConfirmarPagoTotalCompra){
		ver_vetana_informativa('EL MONTO ES MAYOR QUE EL TOTAL A PAGAR');
		return;
	}

if(inptConfirmarPagoTotalAPagar < inptConfirmarPagoTotalCompra){
		if(!confirm('EL PAGO ES MENOR A LA TOTALIDAD A PAGAR. DESEA CONTINUAR?')){
			return;
		}
	}
	
	
	document.getElementById("divConfirmarpagototalcompra").style.display="none"
	cargar_pago_total_a_compra(inptConfirmarPagoTotalAPagar)
	document.getElementById("divAbmListadoPago").style.display=""
		
		
		
		
}
var id_carga_pago_total_a_compra = '';
function cargar_pago_total_a_compra(totalpagar) {
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'cargar_total_pago_compra')
	datos.append("totalpagar", totalpagar)
	datos.append("array_cod_compras", JSON.stringify(array_cod_compras))
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					id_carga_pago_total_a_compra = datos[2];
					
					
					if(imagenPagoProveedor != ''){
						cargarImagenPagoProveedor(id_carga_pago_total_a_compra);
					}
					buscarDetalleCompraInforme()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

// CARGAR ARCHIVO PAGO A PROVEEDOR
function ExploradorImagenPagoProveedor(File,d){	
if(d == '1' && informe_pago_total_compra == ''){
	ver_vetana_informativa('FALTÓ SELECCIONAR UN REGISTRO PARA CARGAR LA IMAGEN');
	return;
}
$("input[name="+File+"]").click();
}

var imagenPagoProveedor="";
let ExtImgPagoProveedor = "";
function readFileImagenPagoProveedor(input){
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();

if (file_extension != "jpg" && file_extension != "jpeg" && file_extension != "png"){
ver_vetana_informativa("EL ARCHIVO SELECCIONADO NO ES UNA IMAGEN")
return false;
}
ExtImgPagoProveedor = file_extension;
imagenPagoProveedor = input.files[0];

if(informe_pago_total_compra != ''){
	cargarImagenPagoProveedor(informe_pago_total_compra);
	buscarInformePagosAProveedor();
}

}
function cargarImagenPagoProveedor(id_carga_pago_total_a_compra) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'cargarImagenPagoProveedor')
	datos.append("id_carga_pago_total_a_compra", id_carga_pago_total_a_compra)
	datos.append("imagen", imagenPagoProveedor)
	datos.append("ext", ExtImgPagoProveedor)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
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
					
					imagenPagoProveedor="";
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function cargar_pago_total_a_compra_temporal() {
	
	if(!confirm('Desea continuar?')){
		return;
	}
	
	var totalpagar =  document.getElementById('inputTotalPagarProveedor').value;
	
	
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'cargar_total_pago_compra_temporal')
	datos.append("totalpagar", totalpagar)
	datos.append("array_cod_compras", JSON.stringify(array_cod_compras))
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					array_cod_compras = []
					buscarCompraProveedorDetalle()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function verCerrarVentanaAbmCargarCheque(d) {
	
	if (d == "1") {	
	if (array_cod_compras.length === 0) {
		ver_vetana_informativa("FALTO SELECCIONAR LAS COMPRAS")
		return;
	}	
	
	let faltante = Number(QuitarSeparadorMilValor(document.getElementById('inptTotalFaltanteListadoPago').value));
	if(faltante <= 0){
		ver_vetana_informativa('LA SUMA FALTANTE ES MENOR O IGUAL A CERO');
		return;
	}
	
		document.getElementById('divAbmCargarCheque').style.display = ""
		document.getElementById('inptImporteChequeCargarPago').value = document.getElementById('inptTotalFaltanteListadoPago').value
	} else {
		document.getElementById('divAbmCargarCheque').style.display = "none"
	}
}
function limpiarcamposChequeCargarPago(){
	    document.getElementById('inptImporteChequeCargarPago').value = ""
	    document.getElementById('inptTipoChequeCargarPago').value = ""
	    document.getElementById('inptFechEmiChequeCargarPago').value = ""
	    document.getElementById('inptFechaVenChequeCargarPago').value = ""
	    document.getElementById('inptNroChequeCargarPago').value = ""
	    document.getElementById('inptOrdenChequeCargarPago').value = ""
	    document.getElementById('inptNombreBancoChequeCargarPago').value = ""
	    document.getElementById('inptConceptoChequeCargarPago').value = ""
		imagenchequepagosaproveedor="";
		extimagenchequepagosaproveedor = "";
}
function verificarcamposCargarCheque() {
	var inptFechEmiChequeCargarPago = document.getElementById('inptFechEmiChequeCargarPago').value
	var inptFechaVenChequeCargarPago = document.getElementById('inptFechaVenChequeCargarPago').value
	var inptNroChequeCargarPago = document.getElementById('inptNroChequeCargarPago').value
	var inptOrdenChequeCargarPago = document.getElementById('inptOrdenChequeCargarPago').value
	
	var inptConceptoCheque = document.getElementById('inptConceptoChequeCargarPago').value
	
	
	var inptImporteChequeCargarPago = document.getElementById('inptImporteChequeCargarPago').value
	var inptNombreBancoChequeCargarPago = document.getElementById('inptNombreBancoChequeCargarPago').value
	var inptEstadoChequeCargarPago = "Activo"
	var inptPagadoChequeCargarPago = document.getElementById('inptPagadoChequeCargarPago').value
	var inptTipoChequeCargarPago = document.getElementById('inptTipoChequeCargarPago').value
	
	if (inptFechEmiChequeCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE EMISION")
		return false;
	}
	
	if (inptFechaVenChequeCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE VENCIMIENTO")
		return false;
	}
	
	if (inptNroChequeCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NUMERO DE CHEQUE")
		return false;
	}
	
	if (inptOrdenChequeCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE ")
		return false;
	}
	if (inptConceptoCheque == "") {
		ver_vetana_informativa("FALTO INGRESAR EL CONCEPTO")
		return false;
	}
	if (inptImporteChequeCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR EL IMPORTE")
		return false;
	}
	if (inptNombreBancoChequeCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL BANCO")
		return false;
	}
	if (inptTipoChequeCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR TIPO CHEQUE")
		return false;
	}
	
	//COMPROBAR SI CARGA MAS o MENOS DE LO DEBIDO
	var inputTotalPagarProveedorCargarCheques = document.getElementById('inptTotalPagarListadoPago').value
	var inptTotalPagadoListadoPago = document.getElementById('inptTotalPagadoListadoPago').value
	
	
	var totalapagar = parseInt(QuitarSeparadorMilValor(inputTotalPagarProveedorCargarCheques));
	var importe = parseInt(QuitarSeparadorMilValor(inptImporteChequeCargarPago));
	var pagado = parseInt(QuitarSeparadorMilValor(inptTotalPagadoListadoPago));
	var total = parseInt(importe) + parseInt(pagado);
	
	var faltante = totalapagar - pagado;
	document.getElementById('inptTotalFaltanteListadoPago').value = separadordemilesnumero(faltante);
	

	if (total > totalapagar ) {
		ver_vetana_informativa("EL IMPORTE YA SUPERA LA TOTALIDAD DEL PAGO")
		return;
	}
	

	
	var accion = "nuevochequecargarpago";
	abmChequeCargarPago(inptPagadoChequeCargarPago,inptFechEmiChequeCargarPago ,inptFechaVenChequeCargarPago , inptNroChequeCargarPago ,inptOrdenChequeCargarPago , inptConceptoCheque ,inptImporteChequeCargarPago , inptNombreBancoChequeCargarPago, inptTipoChequeCargarPago ,inptEstadoChequeCargarPago , accion);
}
function abmChequeCargarPago(pagado,fechaemi,fechaven ,nroCheque,orden ,concepto,importe ,banco,tipo,estado , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fechaemi", fechaemi)
	datos.append("fechaven", fechaven)
	datos.append("nroCheque", nroCheque)
	datos.append("orden", orden)
	datos.append("concepto", concepto)
	datos.append("importe", importe)
	datos.append("banco", banco)
	datos.append("pagado", pagado)
	datos.append("tipo", tipo)
	datos.append("estado", estado)
	datos.append("array_cod_compras", JSON.stringify(array_cod_compras))
	datos.append("codProveedorPago", idAbmPagoProveedor)
	datos.append("id_pago_total_compra", id_carga_pago_total_a_compra)
	datos.append("imagencheque", imagenchequepagosaproveedor)
	datos.append("ext", extimagenchequepagosaproveedor)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
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
					limpiarcamposChequeCargarPago()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					document.getElementById('divAbmCargarCheque').style.display = "none"
					buscarDetalleCompraInforme()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscarabmChequeCargarPago() {
	document.getElementById("table_abm_CargarChequePagosProveedor").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"array_cod_compras": JSON.stringify(array_cod_compras),
		"buscar": idpagocompraproveedor,
		"funt": "buscarpagadoproveedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCheque.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CargarChequePagosProveedor").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CargarChequePagosProveedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("table_abm_CargarChequePagosProveedor").innerHTML = datos_buscados
					document.getElementById("inputTotalPagadoProveedorCargarCheques").value = datos[4];
					
					
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

// CARGAR ARCHIVO CHEQUE PAGOS A PROVEEDOR
function ExploradorPDFChequePagosAProveedor(File){	
$("input[name="+File+"]").click();
}
var imagenchequepagosaproveedor="";
var extimagenchequepagosaproveedor = "";
function readFileChequePagosAProveedor(input){
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
extimagenchequepagosaproveedor = file_extension;

if ((file_extension != "png") && (file_extension != "jpg") && (file_extension != "jpeg")){
ver_vetana_informativa("EL ARCHIVO SELECCIONADO NO ES UNA IMAGEN");
return false;
}
// console.log('segmento carga archivo')
imagenchequepagosaproveedor = input.files[0];
}

//HISTORIAL DE PAGOS A PROVEEDOR
function verCerrarHistorialPagoProveedor(){
	if(document.getElementById("divHistorialPagoProveedor").style.display==""){
		 
		$("div[id=divHistorialPagoProveedor]").fadeOut(500);	
		
		buscarabmPagoProveedor()
	}else{		
		
		document.getElementById("divHistorialPagoProveedor").style.display=""
		 
		
		buscarHistorialPagosProveedor()
	}
}
function buscarHistorialPagosProveedor(){
	var listado=iniciarListadoHistorialPagosProveedor();
	document.getElementById("table_historial_pago_proveedor").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codProveedorPago": idAbmPagoProveedor,
		"formato": listado ? "json" : "html",
		"funt": "buscarHistorialPagos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_pago_proveedor").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_pago_proveedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_historial_pago_proveedor").innerHTML = datos[2] || "";
					}
					document.getElementById('inptTotalHistorialPagoProveedor').value = datos[3]
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}
var cod_chequeListadoPagoTotalCompra = '';
function obtenerdatosHistorialPagoProveedor(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	cod_chequeListadoPago = $(datostr).children('td[id="td_datos_2"]').text();
	cod_chequeListadoPagoTotalCompra = $(datostr).children('td[id="td_datos_3"]').text();
	document.getElementById('inptSeleccionadoHistorialPagoProveedor').value = $(datostr).children('td[id="td_datos_1"]').text()
	document.getElementById('btnEliminarHistorialPagoProveedor').style.backgroundColor = '#fb774f'
}
function limpiarhistorialpagoproveedor(){
	cod_chequeListadoPago = "";
	cod_chequeListadoPagoTotalCompra = "";
	document.getElementById('inptSeleccionadoHistorialPagoProveedor').value = ""
	document.getElementById('btnEliminarHistorialPagoProveedor').style.backgroundColor = '#d5d3d3'
}


//CHEQUES FALTANTES
function verCerrarChequeFaltantes(){
	if(document.getElementById("divChequeFaltantes").style.display==""){
		 
		$("div[id=divChequeFaltantes]").fadeOut(500);	
		
		buscarabmPagoProveedor()
		limpiarChequeFaltantes()
	}else{		
		
		document.getElementById("divChequeFaltantes").style.display=""
		 
		
		buscarChequesFaltantes()
		
	}
}
function buscarChequesFaltantes(){
	var listado=iniciarListadoChequesFaltantesProveedor();
	document.getElementById("table_pagos_fatantes_compras").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": listado ? "json" : "html",
		"funt": "buscar_compras_con_cheque_faltante"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_pagos_fatantes_compras").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_pagos_fatantes_compras").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_pagos_fatantes_compras").innerHTML = datos[2] || "";
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
function obtenerdatosChequeFaltantes(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	id_carga_pago_total_a_compra = $(datostr).children('td[id="td_datos_3"]').text();
	array_cod_compras = JSON.parse($(datostr).children('td[id="td_datos_2"]').text());
	idAbmPagoProveedor = $(datostr).children('td[id="td_datos_1"]').text();
	control_ventana_pago_proveedor = 1;
	

	
	buscarDetalleCompraInforme()
	document.getElementById('inptTotalPagadoListadoPago').value = $(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById('inptTotalPagarListadoPago').value = $(datostr).children('td[id="td_datos_9"]').text();
	document.getElementById('inptTotalFaltanteListadoPago').value = $(datostr).children('td[id="td_datos_8"]').text();
}
function limpiarChequeFaltantes(){
	array_cod_compras = []
}




//CARGAR NOTA CREDITO
var idCompraNotaCredito ='';
function verCerrarAbmCargarNotaCredito(datos){
	if(document.getElementById("divAbmCargarNotaCredito").style.display==""){
		document.getElementById("divAbmCargarNotaCredito").style.display="none"
		limpiarcamposCargarNotaCredito()
	}else{		
		document.getElementById("divAbmCargarNotaCredito").style.display=""
	idCompraNotaCredito = datos;
	document.getElementById('inptFechaCargarNotaCredito').value = obtenerFechaActual();
	buscarabmCargarNotaCredito()
	}
}
function limpiarcamposCargarNotaCredito(){
	document.getElementById('inptFechaCargarNotaCredito').value = ""
	document.getElementById('inptMontoCargarNotaCredito').value = ""
	document.getElementById('inptNroCargarNotaCredito').value = ""
	document.getElementById('intpEstadoCargarNotaCredito').value = "Activo"
	document.getElementById('btnAbmCargarNotaCredito').value = 'Guardar Datos'
	idNotaCredito = ''
}
function verificarcamposCargarNotaCredito() {
	var inptFechaCargarNotaCredito = document.getElementById('inptFechaCargarNotaCredito').value
	var inptMontoCargarNotaCredito = document.getElementById('inptMontoCargarNotaCredito').value
	var inptNroCargarNotaCredito = document.getElementById('inptNroCargarNotaCredito').value
	var intpEstadoCargarNotaCredito = document.getElementById('intpEstadoCargarNotaCredito').value

	
	if (inptFechaCargarNotaCredito == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA")
		return false;
	}
	if (inptMontoCargarNotaCredito == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO")
		return false;
	}
	if (inptNroCargarNotaCredito == "") {
		ver_vetana_informativa("FALTO INGRESAR NUMERO DE NOTA DE CREDITO")
		return false;
	}
	
	var accion = "nuevonotacredito";
	
	if(idNotaCredito != ""){
		accion = "editarnotacredito"
	}
	
	
	
	AbmCargarNotaCredito(inptFechaCargarNotaCredito, inptMontoCargarNotaCredito,inptNroCargarNotaCredito,intpEstadoCargarNotaCredito,accion);
}
function AbmCargarNotaCredito(fecha,monto,nronotacredito,estado, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fecha", fecha)
	datos.append("monto", monto)
	datos.append("nronotacredito", nronotacredito)
	datos.append("cod_proveedorFK", idAbmPagoProveedor)
	datos.append("cod_compraFK", idCompraNotaCredito)
	datos.append("idabm", idNotaCredito)
	datos.append("estado", estado)

	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
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
					limpiarcamposCargarNotaCredito()
					buscarabmCargarNotaCredito()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarCompraProveedorDetalle()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscarabmCargarNotaCredito() {
	var listado=iniciarListadoNotasCreditoProveedor();
	document.getElementById("divBuscadorRegistrosNotaCredito").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_proveedorFK": idAbmPagoProveedor,
		"cod_compraFK": idCompraNotaCredito,
		"formato": listado ? "json" : "html",
		"funt": "buscarnotacreditos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
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
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("divBuscadorRegistrosNotaCredito").innerHTML = datos[2] || "";
					}
					document.getElementById("lblNroRegistroNotaCredito").textContent = datos[4] || 0;
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var idNotaCredito = '';
function obtenerdatosCargarNotaCredito(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	document.getElementById('inptFechaCargarNotaCredito').value = $(datostr).children('td[id="td_datos_1"]').text()
	document.getElementById('inptMontoCargarNotaCredito').value = $(datostr).children('td[id="td_datos_3"]').text()
	document.getElementById('inptNroCargarNotaCredito').value = $(datostr).children('td[id="td_datos_2"]').text()
	
	idNotaCredito = $(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById('btnAbmCargarNotaCredito').value = 'Editar'
}


//UBICACIONES CLIENTE
function verCerrarUbicacionesCliente(){
	if(cod_clienteBuscarUbicacion == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN REGISTRO")
		return;
	}
	if(document.getElementById("divUbicacionesCliente").style.display==""){
		document.getElementById("divUbicacionesCliente").style.display="none"
		
	}else{		
		document.getElementById("divUbicacionesCliente").style.display=""
	buscarUbicacionesCliente()
	}
}
function buscarUbicacionesCliente() {
	document.getElementById("divBuscadorUbicacionesCliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcliente": cod_clienteBuscarUbicacion,
		"funt": "buscarGeolocalizacion"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					document.getElementById("divBuscadorUbicacionesCliente").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}






















//HISTORIAL DE DESCARGA DE BASE DATOS
var listadoHistorialDescargaBD = null;
function iniciarListadoHistorialDescargaBD() {
	if (listadoHistorialDescargaBD || !window.AbmListadoCore) return listadoHistorialDescargaBD;
	var cuerpo = document.getElementById('divBuscadorHistorialDescargaBD');
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && cabecera.tagName !== 'TABLE') cabecera = cabecera.previousElementSibling;
	if (!cabecera) return null;
	cabecera.id = 'cabeceraHistorialDescargaBD';
	listadoHistorialDescargaBD = window.AbmListadoCore.crear({
		nombre: 'historial_descarga_bd',
		idCabecera: 'cabeceraHistorialDescargaBD',
		idCuerpo: 'divBuscadorHistorialDescargaBD',
		ordenInicial: 'fecha',
		columnas: [
			{ campo: 'fecha', titulo: 'FECHA', ancho: '33%' },
			{ campo: 'usuario', titulo: 'USUARIO', ancho: '33%' },
			{ campo: 'local', titulo: 'LOCAL', ancho: '33%' }
		],
		fila: {
			border: '0',
			cellspacing: '0',
			cellpadding: '0',
			celdas: [
				{ campo: 'fecha', columna: 'fecha' },
				{ campo: 'usuario', columna: 'usuario' },
				{ campo: 'local', columna: 'local' }
			]
		}
	});
	listadoHistorialDescargaBD.iniciar();
	return listadoHistorialDescargaBD;
}
function verCerrarHistorialDescargaBD(){
	
if(document.getElementById("divHistorialDescargaBD").style.display==""){
		
 
	$("div[id=divHistorialDescargaBD]").fadeOut(500);	
		limpiarCamposHistorialDescargaBD()
	}else{	
	if(controlacceso("VERHISTORIALDB","accion")==false){return;}		
		document.getElementById("divHistorialDescargaBD").style.display=""
  
	buscarHistorialDescargaBD()
	}	
}
function limpiarCamposHistorialDescargaBD(){
	document.getElementById("divBuscadorHistorialDescargaBD").innerHTML = "";
}
function buscarHistorialDescargaBD() {
	document.getElementById("divBuscadorHistorialDescargaBD").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmbackup.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorHistorialDescargaBD").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorHistorialDescargaBD").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					document.getElementById("inptTotalRegistrosHistorialDescargaBD").value = datos[3]
					var listado = iniciarListadoHistorialDescargaBD();
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
					}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoHistorialDescargaBD);
else iniciarListadoHistorialDescargaBD();
function DescargarBaseDatos() {
	// if(controlacceso("VERHISTORIALDB","accion")==false){return;}
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"cod_local": cod_localFKUSer,
			"funt": "descargarBD"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmbackup.php",
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
					var ruta = datos[2];
					var nombre_archivo = datos[3];
					
					var link = document.createElement('a');
					link.href = ruta;
					link.download = nombre_archivo; // Nombre del archivo que se descargará
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					buscarHistorialDescargaBD()
					eliminarArchivoBD(nombre_archivo)
					}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function eliminarArchivoBD(nombre_archivo) {
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"nombre_archivo": nombre_archivo,
			"funt": "eliminarBD"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmbackup.php",
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
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}




//MODIFICAR FECHA DE PAGOS


function vercerrarOpcionesFechapago(d){
	if(controlacceso("ACTUALIZARFECHAPAGO","accion")==false){ return;}	
	
	if(d=="1"){
		$("div[id=divModificarFechapagocuota]").fadeIn(250)
       
	}else{
		$("div[id=divModificarFechapagocuota]").fadeOut(250)
	}
}




function verificarModificarFechaCambio(){	 
	
	var inputSelectMetodoFechacambio=document.getElementById('inputSelectMetodoFechacambio').value
	var inptFechaVentaCambioFechacambio=document.getElementById('inptFechaVentaCambioFechacambio').value
	
  if(codVentaVentanas==""){
	ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
	  return false;
  }
  if(inputSelectMetodoFechacambio==""){
	ver_vetana_informativa("FALTO INGRESAR EL METODO DE PAGO")
	  return false;
  }
  
  if(inptFechaVentaCambioFechacambio==""){
	ver_vetana_informativa("FALTO INGRESAR LA FECHA DE INICIO")
	  return false;
  }
  
  
 abmModofocarfechapago(inputSelectMetodoFechacambio,inptFechaVentaCambioFechacambio,codVentaVentanas)
}
function abmModofocarfechapago(metodopago,iniciopago,cod_venta) {
	// if(controlacceso("REFINANCIARVENTA","accion")==false){	return;		}		
	verCerrarEfectoCargando("1")
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "modificarfechapago")
			 datos.append("cod_venta" , cod_venta)
			 datos.append("metodopago" , metodopago)
			 datos.append("iniciopago" , iniciopago)		
			var OpAjax= $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
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


/*
INFORME CREDITO
*/
function verCerrarInformedeCreditos(d){
	document.getElementById("divSegundoPlano").style.display="none";
if(document.getElementById("divInformeCredito").style.display==""){
	
	if(controldebusquedadCredito==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoInformeCredito").style.display="none"
	$("div[id=divInformeCredito]").fadeOut(500);	
		limpiarCamposInformeCredito()
	}else{		
	if(controlacceso("VERINFORMEGENERALCREDITOS","accion")==false){return;}	
	mostrarSoloUno("divInformeCredito")	
		document.getElementById("divInformeCredito").style.display=""
	
		var f = new Date();
		var dia = f.getDate()
		if (dia < 10) {
			dia = "0" + dia;
		}
		var mes = f.getMonth() + 1
		if (mes < 10) {
			mes = "0" + mes;
		}
		document.getElementById('inptBuscarInformeCreditoF1informe').value = f.getFullYear() + "-" + mes + "-" + "01";
		document.getElementById('inptBuscarInformeCreditoF2informe').value = f.getFullYear() + "-" + mes + "-" + dia;
}
}


function minimizarInformeCredito(){
	document.getElementById("divMinimizadoInformeCredito").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuInformeCredito"));
	$("div[id=divInformeCredito]").fadeOut(500);	
}

function limpiarCamposInformeCredito(){
	if(controldebusquedadCredito==true){
	return
}
	document.getElementById("table_Informe_Credito").innerHTML = "";
	document.getElementById("inptBuscarInformeCreditoF1informe").value = "";
	document.getElementById("inptBuscarInformeCreditoF2informe").value = "";
	document.getElementById("inputCobradorInformeCredito").value = "";
	document.getElementById("inptlocalInformeCredito").value = "";
	document.getElementById("inptTipoInformeCredito").value = "";
	document.getElementById("inptNombreClienteInformeCredito").value = "";
	document.getElementById("inptRegistroNroHistorialInformeCredito").value = "";
	document.getElementById("inptRegistroNroHistorialTotalCredito").value = "";
	document.getElementById("inptRegistroTotalNetoInformeCredito").value = "";
	document.getElementById("inptfiltroVendedorInformeCredito").value = "";
	document.getElementById("inptRegistroTotalInteresInformeCredito").value = "";
	document.getElementById("tbProcessInformeCredito").style.display = "none";
}

var registrocargadoInformeCredito="";
var totalregistroInformeCredito="";
var controldebusquedadCredito =false ;
function cancelarInformeCredito(){
	controldebusquedadCredito=false
	document.getElementById("divProgressInformeCredito").style.backgroundColor='#ff5722'
}

var array_codcliente_callcenter = [];

var tipoBusquedaIformeGeneralCredito="";
function buscarcuentaaInformeCredito() {
		// if(controlacceso("VERINFORMECUENTAGENERAL","accion")==false){return;}
 
	var fecha1 = document.getElementById("inptBuscarInformeCreditoF1informe").value
	var fecha2 = document.getElementById("inptBuscarInformeCreditoF2informe").value
	var cobrador = document.getElementById("inputCobradorInformeCredito").value
	var cod_local = document.getElementById("inptlocalInformeCredito").value
	var tipo = document.getElementById("inptTipoInformeCredito").value
	var imprimirdesde = document.getElementById("inptVistaInformeCredito").value
	var datosimprimir = document.getElementById("inptDatosInformeCredito").value
	var tipoDeuda = document.getElementById("inptTipoDeudaInformeCredito").value
	var tipo_cliente = document.getElementById("inptTipoClienteInformeCredito").value
	var vendedor = document.getElementById("inptfiltroVendedorInformeCredito").value
	
	var zona = document.getElementById("inptZonaInformeCredito").value
		
	var cliente = document.getElementById("inptNombreClienteInformeCredito").value
	
	if(tipo==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN TIPO DE BUSQUEDA")
			return 
	}

		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
		if (fecha2 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA DE FIN")
			return
		}
	
			if(controldebusquedadCredito==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}

tipoBusquedaIformeGeneralCredito= imprimirdesde  ;
controldebusquedadCredito=true
	document.getElementById("table_Informe_Credito").innerHTML = paginacargando
	document.getElementById("inptRegistroNroHistorialInformeCredito").value = "..."
	document.getElementById("inptRegistroNroHistorialTotalCredito").value = "..."
	document.getElementById("inptRegistroTotalNetoInformeCredito").value = "..."
	document.getElementById("inptRegistroTotalInteresInformeCredito").value = "..."
	document.getElementById("tbProcessInformeCredito").style.display="none"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrador": cobrador,
		"cod_local": cod_local,
		"tipo": tipo,
		"cliente": cliente,
		"zona": zona,
		"tipoDeuda": tipoDeuda,
		"imprimirdesde": imprimirdesde,
		"datosimprimir": datosimprimir,
		"tipo_cliente": tipo_cliente,
		"vendedor": vendedor,
		"array_cod_tipo_cliente": JSON.stringify(array_cod_tipo_cliente_credito),
		"funt": "buscarInformeCredito"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Informe_Credito").innerHTML = ''
			document.getElementById("inptRegistroNroHistorialInformeCredito").value = ""
			document.getElementById("inptRegistroNroHistorialTotalCredito").value = ""
			document.getElementById("inptRegistroTotalNetoInformeCredito").value = ""
			document.getElementById("inptRegistroTotalInteresInformeCredito").value = ""
			controldebusquedadCredito=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_Informe_Credito").innerHTML = ''
			document.getElementById("inptRegistroNroHistorialInformeCredito").value = ""
			document.getElementById("inptRegistroNroHistorialTotalCredito").value = ""
			document.getElementById("inptRegistroTotalNetoInformeCredito").value = ""
			document.getElementById("inptRegistroTotalInteresInformeCredito").value = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("inptRegistroNroHistorialInformeCredito").value = datos[3]
					document.getElementById("inptRegistroNroHistorialTotalCredito").value = datos[4]
					document.getElementById("inptRegistroTotalNetoInformeCredito").value = datos[5]
					document.getElementById("inptRegistroTotalInteresInformeCredito").value = datos[6]
					document.getElementById("table_Informe_Credito").innerHTML = datos_buscados
					
					ContenidomensajeInformeCredito=datos[7];
					array_codcliente_callcenter=datos[8];
					
					/* console.log('Array clientes:');
					console.table(array_codcliente_callcenter);*/
					
					
					registrocargadoInformeCredito=datos[99];
					totalregistroInformeCredito=datos[100];

						 if(totalregistroInformeCredito>registrocargadoInformeCredito){
						 	var porce=((registrocargadoInformeCredito*100)/totalregistroInformeCredito).toFixed(0)
							document.getElementById("divProgressInformeCredito").style.width=porce+"%"
						 document.getElementById("table_Informe_Credito").innerHTML += "<div id='table_mas_Informe_Credito'></div>"
						  buscarmascuentaaInformeCredito();
					 }else{
						 controldebusquedadCredito=false
						 document.getElementById('inptCantidadClientesCallCenter').value  =array_codcliente_callcenter.length;
					 }
					}
			} catch (error) {
				controldebusquedadCredito=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarmascuentaaInformeCredito(c) {
		// if(controlacceso("VERINFORMECUENTAGENERAL","accion")==false){return;}
	
	var fecha1 = document.getElementById("inptBuscarInformeCreditoF1informe").value
	var fecha2 = document.getElementById("inptBuscarInformeCreditoF2informe").value
	var cobrador = document.getElementById("inputCobradorInformeCredito").value
	var cod_local = document.getElementById("inptlocalInformeCredito").value
	var tipo = document.getElementById("inptTipoInformeCredito").value
	var imprimirdesde = document.getElementById("inptVistaInformeCredito").value
	var datosimprimir = document.getElementById("inptDatosInformeCredito").value
	var cliente = document.getElementById("inptNombreClienteInformeCredito").value
	var tipoDeuda = document.getElementById("inptTipoDeudaInformeCredito").value
	var tipo_cliente = document.getElementById("inptTipoClienteInformeCredito").value
	var vendedor = document.getElementById("inptfiltroVendedorInformeCredito").value
	
	var zona = document.getElementById("inptZonaInformeCredito").value
	
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
		if (fecha2 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA DE FIN")
			return
		}
	if(c=="1"){
		controldebusquedadCredito=true
	}
	if(controldebusquedadCredito==false){
	
	return
}
controldebusquedadCredito=true
	document.getElementById("table_mas_Informe_Credito").innerHTML = paginacargando
	var totalACobrar=document.getElementById("inptRegistroNroHistorialTotalCredito").value
	var totalNeto=document.getElementById("inptRegistroTotalNetoInformeCredito").value
	var totalInteres=document.getElementById("inptRegistroTotalInteresInformeCredito").value
	document.getElementById("tbProcessInformeCredito").style.display=""
	document.getElementById("divProgressInformeCredito").style.backgroundColor=''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cobrador": cobrador,
		"cod_local": cod_local,
		"tipo": tipo,
		"zona": zona,
		"cliente": cliente,
		"imprimirdesde": imprimirdesde,
		"datosimprimir": datosimprimir,
		"registrocargado": registrocargadoInformeCredito,
		"totalACobrar": totalACobrar,
		"totalNeto": totalNeto,
		"tipoDeuda": tipoDeuda,
		"totalInteres": totalInteres,
		"tipo_cliente": tipo_cliente,
		"vendedor": vendedor,
		"array_cod_tipo_cliente": JSON.stringify(array_cod_tipo_cliente_credito),
		"funt": "masbuscarInformeCredito"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
         cargarConectividad("enviado",kb,"0")           
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        cargarConectividad("recibido","0",kb)  
        }, false);
        return xhr;
    },
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_Informe_Credito").innerHTML = ''


	document.getElementById("divProgressInformeCredito").style.backgroundColor='#ff5722'
	controldebusquedadCredito=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_mas_Informe_Credito").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("inptRegistroNroHistorialInformeCredito").value = datos[3]
					document.getElementById("inptRegistroNroHistorialTotalCredito").value = datos[4]
					document.getElementById("inptRegistroTotalNetoInformeCredito").value = datos[5]
					document.getElementById("inptRegistroTotalInteresInformeCredito").value = datos[6]
					document.getElementById("table_mas_Informe_Credito").innerHTML = datos_buscados
					
					 ContenidomensajeInformeCredito= ContenidomensajeInformeCredito + datos[7];
					 array_codcliente_callcenter.push(...datos[8]);
					 
					registrocargadoInformeCredito=datos[99]; 

						 if(totalregistroInformeCredito>registrocargadoInformeCredito){
						 	var porce=((registrocargadoInformeCredito*100)/totalregistroInformeCredito).toFixed(0)
						 document.getElementById("divProgressInformeCredito").style.width=porce+"%"
						 document.getElementById("table_mas_Informe_Credito").innerHTML += "<div id='table_mas_Informe_Credito'></div>"
						 document.getElementById("table_mas_Informe_Credito").id=""
						  buscarmascuentaaInformeCredito();
					 }else{
						 document.getElementById("tbProcessInformeCredito").style.display="none"
						 controldebusquedadCredito=false
						 
						 document.getElementById('inptCantidadClientesCallCenter').value  =array_codcliente_callcenter.length;
					 }
					}
			} catch (error) {
				document.getElementById("divProgressInformeCredito").style.backgroundColor='#ff5722'
				controldebusquedadCredito=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

	var ContenidomensajeInformeCredito="";
function copiarAlPortapapelesInformeGeneralCredito() {

	
  var aux = document.createElement("input");
  aux.setAttribute("value", ContenidomensajeInformeCredito );
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ContenidomensajeInformeCredito = "";
  ver_vetana_informativa("MENSAJE GENERADO CON EXITO FAVOR PEGAR EN EL ARCHIVO EXCEL")
}

function obtenerMensajeParaEnviar(nrosms,clienteNombre){
	

	
	
	var nombreEmpresaMensaje = typeof obtenerNombreEmpresaParaUrl === "function" ? obtenerNombreEmpresaParaUrl() : (typeof tituloRecibo !== "undefined" && tituloRecibo ? tituloRecibo : "la empresa");
	var mensaje = "Estimado/a " + clienteNombre + ", Escribimos para recordarte sobre Su cuota que se encuentra vencida, Aguardamos la confirmación de su pago por este medio. Quedamos a su disposición para cualquier consulta adicional. Le deseamos un excelente resto de la jornada. Saludos desde " + nombreEmpresaMensaje + ".";
	window.open("https://api.whatsapp.com/send?phone="+nrosms+"&text="+encodeURIComponent(mensaje));
	
	// var aux = document.createElement("input");
  // aux.setAttribute("value", mensaje );
  // document.body.appendChild(aux);
  // aux.select();
  // document.execCommand("copy");
  // document.body.removeChild(aux);
  // mensaje = "";
  // ver_vetana_informativa("MENSAJE GENERADO CON EXITO")
	
}


function obtenerdatoscreditodetalle(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	

	cod_clienteInformconf = $(datostr).children('td[id="td_id_2"]').html();
	codVentaInformconf = $(datostr).children('td[id="td_id_1"]').html();

}

function ingresarClienteInformconf() {
	if(controlacceso("INGRESARCLIENTEAINFORMCONF","accion")==false){return;}
	if (cod_clienteInformconf == "") {
		ver_vetana_informativa("FALTÓ SELECCIONAR UN CLIENTE");
		return;
	}
	
	if(!confirm('Enviar a Informconf?')){
		return;
	}
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'nuevo')
	datos.append("cod_clienteFK", cod_clienteInformconf)
	datos.append("cod_ventaFK", codVentaInformconf)
	datos.append("fecha_entrada", obtenerFechaActual())
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMInformconf.php",
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					cod_clienteInformconf = '';
					codVentaInformconf = '';
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/*
REVISION DE DOCUMENTOS
*/
function verCerrarRevisionDocumentos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divRevisionDocumentos").style.display==""){
		document.getElementById("divMinimizadoRevisionDocumentos").style.display="none"
		limpiarcamposRevisionDocumentos()
 
	$("div[id=divRevisionDocumentos]").fadeOut(500);			
	}else{
if(controlacceso("VERREVISIONDOCUMENTOS","accion")==false){return;}	
mostrarSoloUno("divRevisionDocumentos")	
		document.getElementById("divRevisionDocumentos").style.display=""
		  
	}
}
function minimizarRevisionDocumentos(){
	$("div[id=divRevisionDocumentos]").fadeOut(500);	
	document.getElementById("divMinimizadoRevisionDocumentos").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuRevisionDocumentos"));
}
function limpiarcamposRevisionDocumentos(){
	 document.getElementById("table_revision_documentos").innerHTML = ""
}
function  AbmRevisionDocumentos(dt){
	
			var iddocumento = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "checkearDocumentoEntregado")
			 datos.append("cod_venta" , idabmVentaDocumento)		
			 datos.append("iddocumento" , iddocumento)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarRevisionDocumentos()
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
function  EliminarRevisionDocumentos(dt){
	
			var iddocumento = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "EliminarDocumentoEntregado")
			 datos.append("cod_venta" , idabmVentaDocumento)		
			 datos.append("iddocumento" , iddocumento)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarRevisionDocumentos()
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
function buscarRevisionDocumentos(){
	var listado=iniciarListadoRevisionDocumentos();
	document.getElementById("table_revision_documentos").innerHTML=''
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			 "codVenta": idabmVentaDocumento,
			"formato": "json",
			"funt": "buscar_documento_revisados"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
			type:"post",
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_revision_documentos").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_revision_documentos").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				if(listado && Array.isArray(datos[2])){
					listado.establecerRegistros(datos[2]);
				}else if(typeof datos[2]==="string"){
					document.getElementById("table_revision_documentos").innerHTML=datos[2];
				}
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
function vercerrarvistaventasdocumentos(d) {
	if (d == "1") {
		document.getElementById("divVistaVentasDocumentos").style.display=""
  
 buscarCobradorSelecEntregadoRevisionDocumentos()
 buscarCobradorSelecVendedorRevisionDocumentos()
	} else {

document.getElementById("table_vista_ventas_documentos").innerHTML = ""
 
		$("div[id=divVistaVentasDocumentos]").fadeOut(500)
		
	}
}
function buscar_soliticud_credito_revision_documento() {
	var listado=iniciarListadoVistaRevisionDocumentos();
	var fecha1 = document.getElementById('inptBuscarsolicitudCreditoRevision1').value
	var fecha2 = document.getElementById('inptBuscarsolicitudCreditoRevision2').value
	var local = document.getElementById('inptlocalsolicitudCreditoRevision').value
	var zona= document.getElementById("inptBuscarSolicitudRevision4").value	
	var cliente= document.getElementById("inptBuscarSolicitudRevision3").value
	var documento= document.getElementById("inptBuscarSolicitudRevision2").value
	var vendedor= document.getElementById("inptBuscarSolicitudRevision6").value
	var vendedor2= document.getElementById("inptBuscarSolicitudRevision8").value
	var estado_entregado= document.getElementById("inptBuscarSolicitudRevision7").value

	if(document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumento1').checked==true){
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
	

	   document.getElementById("table_vista_ventas_documentos").innerHTML=paginacargando
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
			"estado": "",
			"vendedor": vendedor,
			"estado_entregado": estado_entregado,
			"vendedor2": vendedor2,
			"formato": "json",
			"funt": "buscar_soliticud_credito_revision_documento"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_ventas_documentos").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_vista_ventas_documentos").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
			if(listado && Array.isArray(datos[2])){
				listado.establecerRegistros(datos[2]);
			}else if(typeof datos[2]==="string"){
				document.getElementById("table_vista_ventas_documentos").innerHTML=datos[2];
			}
			document.getElementById("inptTotalRegistrosVistaRevisionDocumentos").value=datos[3]	
			document.getElementById("inptTotalEntregadoVistaRevisionDocumentos").value=datos[4]	
			document.getElementById("inptTotalFaltanteVistaRevisionDocumentos").value=datos[5]	

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
var idabmVentaDocumento = "";
var idabmClienteDocumento = "";
var idabmSolicitudDocumento = "";
function obtenerdatosvistaventadocumentos(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idabmVentaDocumento = $(datostr).children('td[id="td_datos_32"]').html();
	idabmClienteDocumento = $(datostr).children('td[id="td_datos_21"]').html();
	idabmSolicitudDocumento = $(datostr).children('td[id="td_id"]').html();
	buscarRevisionDocumentos()
	vercerrarvistaventasdocumentos("2")
}
function checkSolicitudCreditoVistaRevisionDocumento(d){	
	if(d=="2"){
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumento1').checked=false
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumento2').checked=true
		document.getElementById('inptBuscarsolicitudCreditoRevision1').value = "";
	    document.getElementById('inptBuscarsolicitudCreditoRevision2').value = "";	
	}else{		
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumento1').checked=true
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumento2').checked=false
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarsolicitudCreditoRevision1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarsolicitudCreditoRevision2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

/* TERMINAR REVISION DOCUMENTO */
function  marcarrevisiondocumentocomoterminado(){
	
			if(idabmSolicitudDocumento == ''){
				ver_vetana_informativa("FALTÓ SELECCIONAR UNA SOLICITUD")
				return;
			}
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "marcarrevisiondocumentocomoterminado")
			 datos.append("idsolicitudcredito" , idabmSolicitudDocumento)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
				ver_vetana_informativa("REVISION DE DOCUMENTOS TERMINADO")
				idabmVentaDocumento = "";
				idabmClienteDocumento = "";
				idabmSolicitudDocumento = "";
				document.getElementById('table_revision_documentos').innerHTML = ''
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


/*
REVISION DE DOCUMENTOS CLIENTE
*/
function verCerrarRevisionDocumentosCliente(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divRevisionDocumentosCliente").style.display==""){
		document.getElementById("divMinimizadoRevisionDocumentosCliente").style.display="none"
		limpiarcamposRevisionDocumentosCliente ()
 
	$("div[id=divRevisionDocumentosCliente]").fadeOut(500);			
	}else{
if(controlacceso("VERREVISIONDOCUMENTOSCLIENTE","accion")==false){return;}	
mostrarSoloUno("divRevisionDocumentosCliente")	
		document.getElementById("divRevisionDocumentosCliente").style.display=""		  
	}
}
function minimizarRevisionDocumentosCliente(){	 
	$("div[id=divRevisionDocumentosCliente]").fadeOut(500);	
	document.getElementById("divMinimizadoRevisionDocumentosCliente").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuRevisionDocumentosCliente"));
}
function limpiarcamposRevisionDocumentosCliente (){
	 document.getElementById("table_revision_documentos_cliente").innerHTML = ""
}
function buscarRevisionDocumentosCliente(){
	var listado=iniciarListadoRevisionDocumentosCliente();
	document.getElementById("table_revision_documentos_cliente").innerHTML=''
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			 "codVenta": idabmVentaDocumentoCliente,
			"formato": "json",
			"funt": "buscar_documento_revisados_cliente"
			};
	 $.ajax({
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
			type:"post",
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_revision_documentos_cliente").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_revision_documentos_cliente").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				if(listado && Array.isArray(datos[2])){
					listado.establecerRegistros(datos[2]);
				}else if(typeof datos[2]==="string"){
					document.getElementById("table_revision_documentos_cliente").innerHTML=datos[2];
				}
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
function  AbmRevisionDocumentosCliente(dt){
	
			var iddocumento = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "checkearDocumentoEntregadoCliente")
			 datos.append("cod_venta" , idabmVentaDocumentoCliente)
			 datos.append("iddocumento" , iddocumento)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarRevisionDocumentosCliente()
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
function  EliminarRevisionDocumentosCliente(dt){
	
			var iddocumento = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "EliminarDocumentoEntregadoCliente")
			 datos.append("cod_venta" , idabmVentaDocumentoCliente)		
			 datos.append("iddocumento" , iddocumento)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/ABMDocumentos.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarRevisionDocumentosCliente()
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
function buscar_soliticud_credito_revision_documento_pagare() {
	var listado=iniciarListadoVistaRevisionDocumentosPagare();
	var fecha1 = document.getElementById('inptBuscarsolicitudCreditoRevisionPagare1').value
	var fecha2 = document.getElementById('inptBuscarsolicitudCreditoRevisionPagare2').value
	var local = document.getElementById('inptlocalsolicitudCreditoRevisionPagare').value
	var zona= document.getElementById("inptBuscarSolicitudRevisionPagare4").value	
	var cliente= document.getElementById("inptBuscarSolicitudRevisionPagare3").value
	var documento= document.getElementById("inptBuscarSolicitudRevisionPagare2").value
	var vendedor= document.getElementById("inptBuscarSolicitudRevisionPagare6").value
	var entregado= document.getElementById("inptBuscarSolicitudRevisionPagare7").value
	var vendedor2= document.getElementById("inptBuscarSolicitudRevisionPagare5").value

	if(document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumentoPagare1').checked==true){
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
	

	   document.getElementById("table_vista_ventas_documentos_cliente_pagare").innerHTML=''
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
			"estado": "",
			"vendedor": vendedor,
			"entregado": entregado,
			"vendedor2": vendedor2,
			"formato": "json",
			"funt": "buscar_soliticud_credito_revision_documento_pagare"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
			if(listado && Array.isArray(datos[2])){
				listado.establecerRegistros(datos[2]);
			}else if(typeof datos[2]==="string"){
				document.getElementById("table_vista_ventas_documentos_cliente_pagare").innerHTML=datos[2];
			}
			document.getElementById("inptTotalRegistrosVistaRevisionDocumentosPagare").value=datos[3]	
			document.getElementById("inptTotalEntregadoVistaRevisionDocumentosPagare").value=datos[4]	
			document.getElementById("inptTotalFaltanteVistaRevisionDocumentosPagare").value=datos[5]
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
function vercerrarvistaventasdocumentoscliente(d) {
	if (d == "1") {
		document.getElementById("divVistaVentasDocumentosCliente").style.display=""
		 
		buscarCobradorSelecEntregadoRevisionDocumentosPagare()
		buscarCobradorSelecVendedorRevisionDocumentosPagare()
	} else {
		document.getElementById("table_vista_ventas_documentos_cliente_pagare").innerHTML = ""
		 
		$("div[id=divVistaVentasDocumentosCliente]").fadeOut(500)
	}
}
function buscarvistaventadocumentoscliente() {
	var buscar = document.getElementById('inptBuscarVistaVentasDocumentosCliente').value
	var filtro = document.getElementById('inptOpcionesdeBusquedaVentaDocumentosCliente').value	
	document.getElementById("table_vista_ventas_documentos_cliente").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscar,
		"filtro": filtro,
		"funt": "historialvistaventadocumentoscliente"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_ventas_documentos_cliente").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_ventas_documentos_cliente").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("table_vista_ventas_documentos_cliente").innerHTML = datos_buscados
				
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
var idabmVentaDocumentoCliente = "";
var idabmClienteDocumentoCliente = "";
var idabmSolicitudDocumentoCliente = "";
function obtenerdatosvistaventadocumentosclientepagare(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idabmVentaDocumentoCliente = $(datostr).children('td[id="td_datos_32"]').html();
	idabmClienteDocumentoCliente = $(datostr).children('td[id="td_datos_21"]').html();
	idabmSolicitudDocumentoCliente = $(datostr).children('td[id="td_id"]').html();
	buscarRevisionDocumentosCliente()
	vercerrarvistaventasdocumentoscliente("2")
}
function checkSolicitudCreditoVistaRevisionDocumentoPagare(d){	
	if(d=="2"){
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumentoPagare1').checked=false
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumentoPagare2').checked=true
		document.getElementById('inptBuscarsolicitudCreditoRevisionPagare1').value = "";
	    document.getElementById('inptBuscarsolicitudCreditoRevisionPagare2').value = "";	
	}else{		
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumentoPagare1').checked=true
		document.getElementById('inptSeleccSolicitudCreditoVistaRevisionDocumentoPagare2').checked=false
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarsolicitudCreditoRevisionPagare1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarsolicitudCreditoRevisionPagare2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


/* TERMINAR REVISION DOCUMENTO PAGARE */
function  marcarrevisiondocumentopagarecomoterminado(){
	
			if(idabmSolicitudDocumentoCliente == ''){
				ver_vetana_informativa("FALTÓ SELECCIONAR UNA SOLICITUD")
				return;
			}
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "marcarrevisiondocumentopagarecomoterminado")
			 datos.append("idsolicitudcredito" , idabmSolicitudDocumentoCliente)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
				ver_vetana_informativa("REVISION DE DOCUMENTOS TERMINADO")
				idabmVentaDocumentoCliente = "";
				idabmClienteDocumentoCliente = "";
				idabmSolicitudDocumentoCliente = "";
				document.getElementById('table_revision_documentos_cliente').innerHTML = ''
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


//Buscar datos de empresa para imprimir
var tituloRecibo = "";
var ruc = "";
var telefono = "";
var direccionEmpresa = "";
var ciudadEmpresa = "";
var localEmpresa = "";
var codLocalEmpresa = "";
function buscarDatosEmpresa() {

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarDatosEmpresa"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/empresa.php",
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
				   tituloRecibo = datos[2];
				   ruc = datos[3];
				   telefono = datos[4];
				   direccionEmpresa = datos[5] || datos.direccion || "";
				   localEmpresa = datos[6] || datos.local || "";
				   codLocalEmpresa = datos[7] || datos.cod_local || "";
				   ciudadEmpresa = datos[8] || datos.ciudad || "";
				   if (typeof actualizarTextosEmpresaSistema === "function") {
					   actualizarTextosEmpresaSistema();
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

