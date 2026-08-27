/*
ABM DETALLES PRECIOS
*/

var listadosDetallePrecio = {};

function obtenerCabeceraDetallePrecio(cuerpo) {
	if (!cuerpo) { return null; }
	var candidato = cuerpo.previousElementSibling;
	while (candidato) {
		if (candidato.classList && candidato.classList.contains("tableCabeceraRegistro")) {
			return candidato.tagName === "TABLE" ? (candidato.querySelector("tr") || candidato) : candidato;
		}
		candidato = candidato.previousElementSibling;
	}
	return null;
}

function crearListadoDetallePrecio(configuracion) {
	var idCuerpo = configuracion.idCuerpo;
	if (listadosDetallePrecio[idCuerpo]) { return listadosDetallePrecio[idCuerpo]; }
	if (!window.AbmListadoCore) { return null; }
	var cuerpo = document.getElementById(idCuerpo);
	var cabecera = obtenerCabeceraDetallePrecio(cuerpo);
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraDetallePrecio_" + idCuerpo.replace(/[^a-zA-Z0-9_-]/g, "_");
	var listado = window.AbmListadoCore.crear({
		nombre: configuracion.nombre,
		idCabecera: cabecera.id,
		idCuerpo: idCuerpo,
		ordenInicial: configuracion.ordenInicial || "",
		columnas: configuracion.columnas,
		fila: configuracion.fila
	});
	listado.iniciar();
	listadosDetallePrecio[idCuerpo] = listado;
	return listado;
}

function crearInputFilaDetallePrecio(prefijo, codigo, valor) {
	var input = document.createElement("input");
	input.id = prefijo + codigo;
	input.type = "text";
	input.value = valor == null ? "" : String(valor);
	input.className = "inputText";
	return input;
}

function mostrarRegistrosDetallePrecio(listado, cuerpo, registros) {
	if (listado && Array.isArray(registros)) {
		listado.establecerRegistros(registros);
		return;
	}
	cuerpo.innerHTML = typeof registros === "string" ? registros : "";
}

function iniciarListadoDetallePrecioPrincipal() {
	return crearListadoDetallePrecio({
		nombre: "detalle_precio_principal",
		idCuerpo: "table_vista_detalles_precio",
		ordenInicial: "cuota",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "20%" },
			{ campo: "precio_cuota", titulo: "PRECIO", ancho: "20%" },
			{ campo: "precio", titulo: "TOTAL", ancho: "20%" },
			{ campo: "descuento", titulo: "DESCUENTO", ancho: "20%" },
			{ campo: "local", titulo: "LOCAL", ancho: "20%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmdetallesprecio",
			celdas: [
				{ id: "td_datos_2", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_7", columna: "precio_cuota", valor: function (registro) { return registro.precio_cuota_formateado; } },
				{ id: "td_datos_1", columna: "precio", valor: function (registro) { return registro.precio_formateado; } },
				{ id: "td_datos_9", columna: "descuento", valor: function (registro) { return registro.descuento_formateado; } },
				{ id: "td_datos_8", campo: "local", columna: "local" },
				{ id: "td_datos_3", campo: "codigo", tecnica: true },
				{ id: "td_datos_4", campo: "comision", tecnica: true },
				{ id: "td_datos_5", campo: "porcentaje_formateado", tecnica: true },
				{ id: "td_datos_6", campo: "cuota", tecnica: true }
			]
		}
	});
}

function iniciarListadoDetallePrecioTabla() {
	return crearListadoDetallePrecio({
		nombre: "detalle_precio_edicion_masiva",
		idCuerpo: "table_vista_detalles_precioTabla",
		ordenInicial: "codigo",
		columnas: [
			{ campo: "porcentaje", titulo: "PORCENTAJE", ancho: "10%" },
			{ campo: "cuota", titulo: "CUOTAS", ancho: "10%" },
			{ campo: "precio_cuota", titulo: "PRECIO", ancho: "20%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "20%" },
			{ campo: "precio_total", titulo: "TOTAL", ancho: "20%" },
			{ campo: "codigo", titulo: "ACCION", ancho: "20%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmdetallesprecio",
			celdas: [
				{ id: "td_datos_1", columna: "porcentaje", render: function (valor, registro) {
					return crearInputFilaDetallePrecio("inptPor_", registro.codigo, registro.porcentaje);
				} },
				{ id: "td_datos_2", campo: "cuota", columna: "cuota" },
				{ id: "td_datos_3", columna: "precio_cuota", valor: function (registro) { return registro.precio_cuota_formateado; } },
				{ id: "td_datos_6", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_4", columna: "precio_total", valor: function (registro) { return registro.precio_total_formateado; } },
				{ id: "td_datos_7", columna: "codigo", render: function (valor, registro) {
					var boton = document.createElement("input");
					boton.type = "button";
					boton.value = "Guardar";
					boton.className = "btn4";
					boton.id = String(registro.codigo);
					boton.name = registro.precio_compra == null ? "" : String(registro.precio_compra);
					boton.style.backgroundColor = "#2196F3";
					boton.addEventListener("click", function () { EditarEstePrecioDetalleTabla(boton); });
					return boton;
				} },
				{ id: "td_datos_8", tecnica: true, render: function (valor, registro) {
					return crearInputFilaDetallePrecio("inptCuotas_", registro.codigo, registro.cuota);
				} },
				{ id: "td_datos_9", tecnica: true, render: function (valor, registro) {
					return crearInputFilaDetallePrecio("inptPrecioContado_", registro.codigo, registro.precio_contado);
				} },
				{ id: "td_datos_10", tecnica: true, render: function (valor, registro) {
					return crearInputFilaDetallePrecio("inptPorcenContado_", registro.codigo, registro.porcentaje_contado);
				} },
				{ id: "td_datos_10", tecnica: true, render: function (valor, registro) {
					return crearInputFilaDetallePrecio("ImputPrecioAntes_", registro.codigo, registro.precio_total);
				} },
				{ id: "td_datos_10", tecnica: true, render: function (valor, registro) {
					return crearInputFilaDetallePrecio("ImputCod_producto_", registro.codigo, registro.cod_producto);
				} }
			]
		}
	});
}

function iniciarListadoResumenDetallePrecio(idCuerpo) {
	return crearListadoDetallePrecio({
		nombre: "resumen_detalle_precio_" + idCuerpo,
		idCuerpo: idCuerpo,
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "50%" },
			{ campo: "precio_cuota", titulo: "PRECIO", ancho: "50%" }
		],
		fila: {
			celdas: [
				{ campo: "descripcion", columna: "descripcion" },
				{ columna: "precio_cuota", valor: function (registro) { return registro.precio_cuota_formateado; } }
			]
		}
	});
}

function iniciarListadoVistaDetallePrecio(idCuerpo) {
	return crearListadoDetallePrecio({
		nombre: "vista_detalle_precio_" + idCuerpo,
		idCuerpo: idCuerpo,
		ordenInicial: "precio",
		columnas: [
			{ campo: "precio", titulo: "PRECIOS", ancho: "50%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "50%" }
		],
		fila: {
			celdas: [
				{ id: "td_datos_1", columna: "precio", valor: function (registro) { return registro.precio_formateado; } },
				{ id: "td_datos_2", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_3", campo: "codigo", tecnica: true },
				{ id: "td_datos_4", campo: "comision", tecnica: true },
				{ id: "td_datos_5", campo: "porcentaje_formateado", tecnica: true }
			]
		}
	});
}

function iniciarListadoCompraDetallePrecio() {
	return crearListadoDetallePrecio({
		nombre: "detalle_precio_compra",
		idCuerpo: "table_vista_detalles_precioCompra",
		ordenInicial: "precio",
		columnas: [
			{ campo: "precio", titulo: "PRECIO", ancho: "50%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "50%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmdetallespreciocompra",
			celdas: [
				{ id: "td_datos_1", columna: "precio", valor: function (registro) { return registro.precio_formateado; } },
				{ id: "td_datos_2", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_3", campo: "codigo", tecnica: true },
				{ id: "td_datos_4", campo: "comision", tecnica: true },
				{ id: "td_datos_5", campo: "porcentaje_formateado", tecnica: true },
				{ id: "td_datos_6", campo: "cuota", tecnica: true },
				{ id: "td_datos_7", campo: "precio_cuota_formateado", tecnica: true }
			]
		}
	});
}

function iniciarListadosDetallePrecioDisponibles() {
	iniciarListadoDetallePrecioPrincipal();
	iniciarListadoDetallePrecioTabla();
	iniciarListadoResumenDetallePrecio("table_abm_producto_detalles_precios");
	iniciarListadoResumenDetallePrecio("divBuscadorPrecioCatalogo");
	iniciarListadoVistaDetallePrecio("table_abm_vista_precios_producto");
	iniciarListadoVistaDetallePrecio("table_vista_producto_venta_costos");
	iniciarListadoCompraDetallePrecio();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", iniciarListadosDetallePrecioDisponibles);
} else {
	iniciarListadosDetallePrecioDisponibles();
}

function verCerrarAbmDetallesPrecioTabla(d){
	if(d=="2"){
		//document.getElementById("divAbmDetallesPreciosTabla").style.display="none"
		 
        $("div[id=divAbmDetallesPreciosTabla]").fadeOut(500);
		// document.getElementById("inptPrecioCompraDetallesPrecio").value ="";
		
		
	}else{		
if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
		document.getElementById("divAbmDetallesPreciosTabla").style.display=""
		  
		var inptPrecioCompraProducto = document.getElementById("inptPrecioCompraProducto").value
		// document.getElementById("inptPrecioCompraDetallesPrecio").value = inptPrecioCompraProducto;
		
		buscardetallesprecioTabla()
		
	}
}
function verCerrarAbmDetallesPresupuesto(d){
	if(d=="2"){
		 
        $("div[id=divAbmDetallesPresupuesto]").fadeOut(500);		
	}else{
		if(controlacceso("VERGENERARPRESUPUESTO","accion")==false){return;}
		
		renderizarTablaPresupuesto();
		actualizarTotalGeneralPresupuesto();
		
		mostrarSoloUno("divAbmDetallesPresupuesto")	
		document.getElementById("divAbmDetallesPresupuesto").style.display=""
		  
				
		document.getElementById("inptEntregaPresupuesto").value=0
		document.getElementById("inptProductoPresupuesto").value=document.getElementById('inptNombreProducto').value				
	}
}

function minimizarabmDetallesPresupuesto(){ 
$("div[id=divAbmDetallesPresupuesto]").fadeOut(500);
document.getElementById("divMinimizadoPresupuestoProducto").style.display=""	
copiarBotonEnContenedor(document.getElementById("divMenuPresupuestoProducto"));	
}

function EditarEstePrecioDetalleTabla(datos) {	
	var codDetalle=datos.id
	var precioCompra=datos.name
	var porcentaje=document.getElementById("inptPor_"+codDetalle).value
	var cuotas = document.getElementById("inptCuotas_"+codDetalle).value 
	var PrecioContado = document.getElementById("inptPrecioContado_"+codDetalle).value 
	var PorcenContado = document.getElementById("inptPorcenContado_"+codDetalle).value 
	precio_ventaDetalle= document.getElementById("ImputPrecioAntes_"+codDetalle).value
	var Cod_producto = document.getElementById("ImputCod_producto_"+codDetalle).value 
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editarestePrecio")
	datos.append("codDetalle", codDetalle)
	datos.append("porcentaje", porcentaje)
	datos.append("precioCompra", precioCompra)
	datos.append("PrecioContado", PrecioContado)
	datos.append("PorcenContado", PorcenContado)
	datos.append("precio_ventaDetalle", precio_ventaDetalle)
	datos.append("cod_local", cod_localFKUSer)
	datos.append("userid", userid)
	datos.append("cuotas", cuotas)
	datos.append("Cod_producto", Cod_producto)
		var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
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
					buscardetallesprecioTabla()
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function verCerrarAbmDetallesPrecio(d){
	if(d=="2"){
		//document.getElementById("divAbmDetallesPrecios").style.display="none"
		 
        $("div[id=divAbmDetallesPrecios]").fadeOut(500);
		document.getElementById("inptPrecioCompraDetallesPrecio").value ="";
		
		
	}else{		
if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
		document.getElementById("divAbmDetallesPrecios").style.display=""
		  
		var inptPrecioCompraProducto = document.getElementById("inptPrecioCompraProducto").value
		document.getElementById("inptPrecioCompraDetallesPrecio").value = inptPrecioCompraProducto;
		 
		buscardetallesprecio()
	}
}
function verCerrarAbmDetallesPrecio2(){

if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
		document.getElementById("divAbmDetallesPrecios").style.display=""
		  
		buscardetallesprecio()
	
}
var idAbmDetallePrecio = "";
function obtenerdatosabmdetallesprecio(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	
	precio_ventaDetalle = $(datostr).children('td[id="td_datos_1"]').html();
	
	document.getElementById('inptDetallePrecio').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptDetalleDescrip').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptComisionDetallesPrecio').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptPorcDetallesPrecio').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptDetalleCuotaPrecio').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptNroCuotaDetallesPrecio').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptDetalleDescuento').value = $(datostr).children('td[id="td_datos_9"]').html();
	idAbmDetallePrecio = $(datostr).children('td[id="td_datos_3"]').html();
document.getElementById('btnAddPreciosProductos1').value = "Editar";
	document.getElementById('btnAddPreciosProductos1').style.display = "";
	document.getElementById('btnAddPreciosProductos2').style.display = "";
	document.getElementById('btnAddPreciosProductos3').style.display = "";
}
function calcularPorcentajeDesdeMontoCuota(d){
	var montocompra=document.getElementById("inptPrecioCompraProducto").value
	var montocuota=document.getElementById("inptDetalleCuotaPrecio").value
	var nrocuota=document.getElementById("inptNroCuotaDetallesPrecio").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	montocuota=QuitarSeparadorMilValor(montocuota)
	if (isNaN(nrocuota)) {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE COUTA")
        return false;
	}
	if (isNaN(montocompra)) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO DE COMPRA")
        return false;
	}
	if (isNaN(montocuota)) {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DE LA CUOTA")
		return false;
	}
	var totalcuotax=Number(montocuota)*Number(nrocuota)
	var totalcuota=Number(totalcuotax)-Number(montocompra)
	var porcentaje=((Number(totalcuota)*100)/ Number(montocompra)).toFixed(1)
	porcentaje=porcentaje.replace('.',',')
	document.getElementById("inptDetallePrecio").value=separadordemilesnumero(totalcuotax)
	document.getElementById("inptPorcDetallesPrecio").value=porcentaje
	document.getElementById("inptDetalleCuotaPrecio").value=separadordemilesnumero(montocuota)
	CargarTituloCredito()
}
function calcularGananciaDesdePorcentajeDetallesPrecio(d){
	var montocompra=document.getElementById("inptPrecioCompraProducto").value
	var porcentaje=document.getElementById("inptPorcDetallesPrecio").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	porcentaje=QuitarSeparadorMilValor(porcentaje)
	if (isNaN(montocompra)) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO DE COMPRA")
        return false;
	}
	if (isNaN(porcentaje)) {
		ver_vetana_informativa("FALTO INGRESAR EL PORCENTAJE DE GANANCIA")
		return false;
	}
	var total=Math.round((Number(porcentaje)*Number(montocompra))/100)
	total=Number(total)+Number(montocompra)
	total = Math.ceil(total / 1000) * 1000;
	document.getElementById("inptDetallePrecio").value=separadordemilesnumero(total)
	CalcularMontoCuota();
	CargarTituloCredito()
}
function CalcularMontoCuota(){
	var precioventafinal=document.getElementById("inptDetallePrecio").value
	var cuota=document.getElementById("inptNroCuotaDetallesPrecio").value
	precioventafinal=QuitarSeparadorMilValor(precioventafinal)
	cuota=QuitarSeparadorMilValor(cuota)
	if (isNaN(precioventafinal)) {
        precioventafinal=0;
	}
	if (isNaN(cuota)) {
		cuota=0;
	}
	var total=Math.round(Number(precioventafinal)/Number(cuota))
	total = Math.ceil(total / 1000) * 1000;
	document.getElementById("inptDetalleCuotaPrecio").value=separadordemilesnumero(total)
}
function CargarTituloCredito(){
	var costo=document.getElementById("inptDetalleCuotaPrecio").value
	var cuotanro=document.getElementById("inptNroCuotaDetallesPrecio").value
	
	
	if(cuotanro==1){
		document.getElementById('inptDetalleDescrip').value= "CONTADO" 
	}else{
		document.getElementById('inptDetalleDescrip').value= "CUOTA "+cuotanro
	} 
 
}
function verificarcamposdetallesprecio() {
	var inptDetallePrecio = document.getElementById('inptDetallePrecio').value
	var inptDetalleDescrip = document.getElementById('inptDetalleDescrip').value
	var inptComisionDetallesPrecio = document.getElementById('inptComisionDetallesPrecio').value
	var inptPorcDetallesPrecio = document.getElementById('inptPorcDetallesPrecio').value
	var inptDetalleCuotaPrecio = document.getElementById('inptDetalleCuotaPrecio').value
	var inptNroCuotaDetallesPrecio = document.getElementById('inptNroCuotaDetallesPrecio').value
	var inptDetalleDescuento = document.getElementById('inptDetalleDescuento').value
	if (idAbmProducto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO O GUARDAR EL PRODUCTO QUE QUIERES AÑADIR")
		return false;
	}
	if (inptDetalleDescuento == "") {
		ver_vetana_informativa("FALTO INGRESAR EL DESCUENTO")
		return false;
	}
	if (inptNroCuotaDetallesPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE COUTA")
		return false;
	}
	if (inptDetallePrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL PRECIO")
		return false;
	}
	if (inptDetalleDescrip == "") {
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return false;
	}
	if (inptComisionDetallesPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR LA COMISIÓN")
		return false;
	}
	var accion = "";
	if (idAbmDetallePrecio != "") {
		accion = "editar";
		if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
	}
	abmdetallesprecio(inptDetalleDescuento,inptDetallePrecio, inptDetalleDescrip, inptComisionDetallesPrecio,inptPorcDetallesPrecio,inptDetalleCuotaPrecio,inptNroCuotaDetallesPrecio, idAbmDetallePrecio, accion);
}
function eliminardetallesprecio() {
	var inptDetallePrecio = "XX"
	var inptDetalleDescrip = "XX"
	var inptComisionDetallesPrecio = "XX"
	if (idAbmDetallePrecio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR REGISTRO")
		return false;
	}
	var accion = "eliminar";
if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
	abmdetallesprecio(0,0, 0, 0,0,0,0, idAbmDetallePrecio, accion);
}
function abmdetallesprecio(descuento,precio, descripcion, comision,Porcentaje,preciocuota ,Cuota,iddetallesprecio, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("precio", precio)
	datos.append("descripcion", descripcion)
	datos.append("iddetallesprecio", iddetallesprecio)
	datos.append("comision", comision)
	datos.append("Porcentaje", Porcentaje)
	datos.append("cod_producto", idAbmProducto)
	datos.append("Cuota", Cuota)
	datos.append("preciocuota", preciocuota)
	datos.append("precio_ventaDetalle", precio_ventaDetalle)
	datos.append("cod_local", cod_localFKUSer)
	datos.append("userid", userid)
	datos.append("descuento", descuento)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
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
				limpiarcamposDetallePrecio()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				idAbmDetallePrecio = ""
				cod_productoDetallePrecio=idAbmProducto
				buscardetallesprecio()
				buscardetallesprecioenbuscarproductos()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

var cod_productoDetallePrecio="";
function buscardetallesprecio() {
	var cuerpo = document.getElementById("table_vista_detalles_precio");
	var listado = iniciarListadoDetallePrecioPrincipal();
	if (!cuerpo) { return; }
	if (listado) { listado.establecerRegistros([]); }
	var Cod_localFK=document.getElementById("inptlocalDetallePrecioProducto").value
	cuerpo.innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": cod_productoDetallePrecio,
		"Cod_localFK": Cod_localFK,
		"formato": listado ? "json" : "",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			cuerpo.innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			cuerpo.innerHTML = ''
			try {
				var datosRespuesta = $.parseJSON(Respuesta);
				Respuesta = datosRespuesta["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					mostrarRegistrosDetallePrecio(listado, cuerpo, datosRespuesta[2]);
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}
function buscardetallesprecioTabla() {
	if(idAbmProducto==""){
		ver_vetana_informativa("LO SENTIMOS FALTO SELECCIONAR UN PRODUCTO")
		return false;
	}
	var cuerpo = document.getElementById("table_vista_detalles_precioTabla");
	var listado = iniciarListadoDetallePrecioTabla();
	if (!cuerpo) { return; }
	if (listado) { listado.establecerRegistros([]); }
	cuerpo.innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idAbmProducto,
		"formato": listado ? "json" : "",
		"funt": "buscarTabla"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			cuerpo.innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			cuerpo.innerHTML = ''
			try {
				var datosRespuesta = $.parseJSON(Respuesta);
				Respuesta = datosRespuesta["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					mostrarRegistrosDetallePrecio(listado, cuerpo, datosRespuesta[2]);
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}
function buscardetallesprecioenbuscarproductos() {
	var cuerpo = document.getElementById("table_abm_producto_detalles_precios");
	var listado = iniciarListadoResumenDetallePrecio("table_abm_producto_detalles_precios");
	if (!cuerpo) { return; }
	if (listado) { listado.establecerRegistros([]); }
	cuerpo.innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idAbmProducto,
		"cod_LocalFK": cod_localFKUSer,
		"formato": listado ? "json" : "",
		"funt": "buscarabmproductos"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			cuerpo.innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			cuerpo.innerHTML = ''
			try {
				var datosRespuesta = $.parseJSON(Respuesta);
				Respuesta = datosRespuesta["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					mostrarRegistrosDetallePrecio(listado, cuerpo, datosRespuesta[2]);
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}
function buscardetallespreciodesdevista(donde) {
	var destinos = {
		"vista": "table_abm_vista_precios_producto",
		"precios": "table_precios_productos_consultar_precios",
		"vistaventa": "table_vista_producto_venta_costos"
	};
	var idCuerpo = destinos[donde];
	var cuerpo = idCuerpo ? document.getElementById(idCuerpo) : null;
	var listado = cuerpo ? iniciarListadoVistaDetallePrecio(idCuerpo) : null;
	if (!cuerpo) { return; }
	if (listado) { listado.establecerRegistros([]); }
	cuerpo.innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkProducto,
		"formato": listado ? "json" : "",
		"funt": "buscarvista"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
		cuerpo.innerHTML = ""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			cuerpo.innerHTML = ""
			try {
				var datosRespuesta = $.parseJSON(Respuesta);
				Respuesta = datosRespuesta["1"];
                Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					mostrarRegistrosDetallePrecio(listado, cuerpo, datosRespuesta[2]);
					}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposDetallePrecio() {
document.getElementById('btnAddPreciosProductos1').value = "Añadir";

precio_ventaDetalle ="";

	document.getElementById('btnAddPreciosProductos1').style.display = "none";
	document.getElementById('btnAddPreciosProductos2').style.display = "none";
	document.getElementById('btnAddPreciosProductos3').style.display = "none";
	document.getElementById('inptDetallePrecio').value = "";
	document.getElementById('inptDetalleDescrip').value = "";
	document.getElementById('inptPorcDetallesPrecio').value = "";
	document.getElementById('inptComisionDetallesPrecio').value = "";
	document.getElementById('inptDetalleCuotaPrecio').value=""
	document.getElementById('inptNroCuotaDetallesPrecio').value=""
	idAbmDetallePrecio = "";
}

/*DETALLES PRECIOS COMPRA*/
var idAbmDetallePrecioCompra="";
function verCerrarAbmDetallesPrecioCompra(d){
	if(d=="2"){
		//document.getElementById("divAbmDetallesPrecios").style.display="none"
		 
        $("div[id=divAbmDetallesPreciosCompras]").fadeOut(500);
		document.getElementById("inptPrecioCompraDetallesPrecioCompra").value ="";
		
		
	}else{		
if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
		document.getElementById("divAbmDetallesPreciosCompras").style.display=""
		  
		var inptPrecioCompraProducto = document.getElementById("inptCostoProductoCompra").value
		document.getElementById("inptPrecioCompraDetallesPrecioCompra").value = inptPrecioCompraProducto;
		 buscardetallespreciocmpras()
		
	}
}
function obtenerdatosabmdetallespreciocompra(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptDetallePrecioCompra').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptDetalleDescripCompra').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptComisionDetallesPrecioCompra').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptPorcDetallesPrecioCompra').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptDetalleCuotaPrecioCompra').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptNroCuotaDetallesPrecioCompra').value = $(datostr).children('td[id="td_datos_6"]').html();
	idAbmDetallePrecioCompra = $(datostr).children('td[id="td_datos_3"]').html();
document.getElementById('btnAddPreciosProductosCompra1').value = "Editar";
	document.getElementById('btnAddPreciosProductosCompra1').style.display = "";
	document.getElementById('btnAddPreciosProductosCompra2').style.display = "";
}
function verificarcamposdetallesprecioCompra() {
	var inptDetallePrecio = document.getElementById('inptDetallePrecioCompra').value
	var inptDetalleDescrip = document.getElementById('inptDetalleDescripCompra').value
	var inptComisionDetallesPrecio = document.getElementById('inptComisionDetallesPrecioCompra').value
	var inptPorcDetallesPrecio = document.getElementById('inptPorcDetallesPrecioCompra').value
	var inptDetalleCuotaPrecio = document.getElementById('inptDetalleCuotaPrecioCompra').value
	var inptNroCuotaDetallesPrecio = document.getElementById('inptNroCuotaDetallesPrecioCompra').value
	if (idFkProductocompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO O GUARDAR EL PRODUCTO QUE QUIERES AÑADIR")
		return false;
	}
	if (inptNroCuotaDetallesPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE COUTA")
		return false;
	}
	if (inptDetallePrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL PRECIO")
		return false;
	}
	if (inptDetalleDescrip == "") {
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return false;
	}
	if (inptComisionDetallesPrecio == "") {
		ver_vetana_informativa("FALTO INGRESAR LA COMISIÓN")
		return false;
	}
	var accion = "";
	if (idAbmDetallePrecioCompra != "") {
		accion = "editar";
		if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
	}
	abmdetallesprecioCompra(inptDetallePrecio, inptDetalleDescrip, inptComisionDetallesPrecio,inptPorcDetallesPrecio,inptDetalleCuotaPrecio,inptNroCuotaDetallesPrecio, idAbmDetallePrecioCompra, accion);
}
function eliminardetallesprecioCompra() {
	var inptDetallePrecio = "XX"
	var inptDetalleDescrip = "XX"
	var inptComisionDetallesPrecio = "XX"
	if (idAbmDetallePrecioCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR REGISTRO")
		return false;
	}
	var accion = "eliminar";
if(controlacceso("EDITARPRECIOSLISTADOPRODUCTOS","accion")==false){return;}
	abmdetallesprecioCompra(0, 0, 0,0,0,0, idAbmDetallePrecioCompra, accion);
}

var precio_ventaDetalle=""


function abmdetallesprecioCompra(precio, descripcion, comision,Porcentaje,preciocuota ,Cuota,iddetallesprecio, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("precio", precio)
	datos.append("descripcion", descripcion)
	datos.append("iddetallesprecio", iddetallesprecio)
	datos.append("comision", comision)
	datos.append("Porcentaje", Porcentaje)
	datos.append("cod_producto", idFkProductocompra)
	datos.append("Cuota", Cuota)
	datos.append("preciocuota", preciocuota)
	datos.append("precio_ventaDetalle", precio_ventaDetalle)
	datos.append("cod_local", cod_localFKUSer)
	datos.append("userid", userid)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
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
				limpiarcamposDetallePrecioCompra()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				idAbmDetallePrecioCompra = ""
				buscardetallespreciocmpras()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function abmeditarprecioproductodesdecompra() {
	var porcentaje=document.getElementById("inptPorcVentaProductoContadoCompra").value
	var precioventa=document.getElementById("inptPrecioVentaProductoContadoCompra").value
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editarpreciocontado")
	datos.append("precioventa", precioventa)
	datos.append("Porcentaje", porcentaje)
	datos.append("cod_producto", idFkProductocompra)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
				limpiarcamposDetallePrecioCompra()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				
				buscarvistaproductodesdecompra()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function limpiarcamposDetallePrecioCompra() {
document.getElementById('btnAddPreciosProductosCompra1').value = "Añadir";
	document.getElementById('btnAddPreciosProductosCompra1').style.display = "";
	document.getElementById('btnAddPreciosProductosCompra2').style.display = "none";
	document.getElementById('inptNroCuotaDetallesPrecioCompra').value = "";
	document.getElementById('inptPorcDetallesPrecioCompra').value = "";
	document.getElementById('inptDetallePrecioCompra').value = "";
	document.getElementById('inptDetalleCuotaPrecioCompra').value=""
	document.getElementById('inptDetalleDescripCompra').value=""
	document.getElementById('inptComisionDetallesPrecioCompra').value=""
	idAbmDetallePrecioCompra = "";
}

function buscardetallespreciocmpras() {
	var cuerpo = document.getElementById("table_vista_detalles_precioCompra");
	var listado = iniciarListadoCompraDetallePrecio();
	if (!cuerpo) { return; }
	if (listado) { listado.establecerRegistros([]); }
	cuerpo.innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkProductocompra,
		"formato": listado ? "json" : "",
		"funt": "buscarvistacompra"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallesprecio.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
		cuerpo.innerHTML = ""

		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			cuerpo.innerHTML = ""

			try {
				var datosRespuesta = $.parseJSON(Respuesta);
				Respuesta = datosRespuesta["1"];
                Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					mostrarRegistrosDetallePrecio(listado, cuerpo, datosRespuesta[2]);
					}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function CalcularMontoCuotaDesdeCompra(){
	var precioventafinal=document.getElementById("inptDetalleCuotaPrecioCompra").value
	var cuota=document.getElementById("inptNroCuotaDetallesPrecioCompra").value
	precioventafinal=QuitarSeparadorMilValor(precioventafinal)
	cuota=QuitarSeparadorMilValor(cuota)
	if (isNaN(precioventafinal)) {
        precioventafinal=0;
	}
	if (isNaN(cuota)) {
		cuota=0;
	}
	var total=Math.round(Number(precioventafinal)/Number(cuota))
	document.getElementById("inptDetalleCuotaPrecioCompra").value=separadordemilesnumero(total)
}
function calcularGananciaDesdePorcentajeDetallesPrecioDesdeCompra(d){
	var montocompra=document.getElementById("inptPrecioCompraDetallesPrecioCompra").value
	var porcentaje=document.getElementById("inptPorcDetallesPrecioCompra").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	porcentaje=QuitarSeparadorMilValor(porcentaje)
	if (isNaN(montocompra)) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO DE COMPRA")
        return false;
	}
	if (isNaN(porcentaje)) {
		ver_vetana_informativa("FALTO INGRESAR EL PORCENTAJE DE GANANCIA")
		return false;
	}
	var total=Math.round((Number(porcentaje)*Number(montocompra))/100)
	total=Number(total)+Number(montocompra)
	document.getElementById("inptDetallePrecioCompra").value=separadordemilesnumero(total)
	CalcularMontoCuotaCompra();
	CargarTituloCreditoCompra()
}
function CalcularMontoCuotaCompra(){
	var precioventafinal=document.getElementById("inptDetallePrecioCompra").value
	var cuota=document.getElementById("inptNroCuotaDetallesPrecioCompra").value
	precioventafinal=QuitarSeparadorMilValor(precioventafinal)
	cuota=QuitarSeparadorMilValor(cuota)
	if (isNaN(precioventafinal)) {
        precioventafinal=0;
	}
	if (isNaN(cuota)) {
		cuota=0;
	}
	var total=Math.round(Number(precioventafinal)/Number(cuota))
	document.getElementById("inptDetalleCuotaPrecioCompra").value=separadordemilesnumero(total)
}
function CargarTituloCreditoCompra(){
	var costo=document.getElementById("inptDetalleCuotaPrecioCompra").value
	var cuotanro=document.getElementById("inptNroCuotaDetallesPrecioCompra").value
	document.getElementById("inptDetalleDescripCompra").value=cuotanro+" x "+costo
}
function calcularPorcentajeDesdeGananciaCompra(d){
	var montocompra=document.getElementById("inptPrecioCompraDetallesPrecioCompra").value
	var precioventa=document.getElementById("inptPrecioVentaProductoContadoCompra").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	precioventa=QuitarSeparadorMilValor(precioventa)
	if (isNaN(montocompra)) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO DE COMPRA")
        return false;
	}
	if (isNaN(precioventa)) {
		ver_vetana_informativa("FALTO INGRESAR EL PRECIO VENTA")
		return false;
	}
	var ganancias=Math.round(Number(precioventa)-Number(montocompra))
	var porcentaje=((Number(ganancias)*100)/ Number(montocompra)).toFixed(1)
	porcentaje=porcentaje.replace('.',',')
	document.getElementById("inptPrecioVentaProductoContadoCompra").value=separadordemilesnumero(precioventa)
	document.getElementById("inptPorcVentaProductoContadoCompra").value=porcentaje
}
function calcularGananciaDesdePorcentajeCompra(d){
	var montocompra=document.getElementById("inptPrecioCompraDetallesPrecioCompra").value
	var porcentaje=document.getElementById("inptPorcVentaProductoContadoCompra").value
	montocompra=QuitarSeparadorMilValor(montocompra)
	porcentaje=QuitarSeparadorMilValor(porcentaje)
	if (isNaN(montocompra)) {
		ver_vetana_informativa("FALTO INGRESAR UN MONTO DE COMPRA")
        return false;
	}
	if (isNaN(porcentaje)) {
		ver_vetana_informativa("FALTO INGRESAR EL PORCENTAJE DE GANANCIA")
		return false;
	}
	var total=Math.round((Number(porcentaje)*Number(montocompra))/100)
	total=Number(total)+Number(montocompra)
	document.getElementById("inptPrecioVentaProductoContadoCompra").value=separadordemilesnumero(total)	
}
