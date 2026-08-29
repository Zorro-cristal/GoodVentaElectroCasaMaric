/*ABM NUEVA VENTA*/
var idabmVenta
= ""
var idGaranteFk="";
function verCerrarAbmVenta(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmVenta").style.display==""){
limpiarcamposventa()
		 
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
	   SeleccTipoComprobanteVenta()
	   
	   mostrarSoloUno("divAbmVenta")	
		document.getElementById("divAbmVenta").style.display=""
 
	}
}
function minimizarventa(){
 
	$("div[id=divAbmVenta]").fadeOut(500);	
	// document.getElementById("divMinimizadoNuevaVenta2").style.display=""
	document.getElementById("divMinimizadoNuevaVenta1").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuVenta"));
}
function verOpcionesDeConfigVenta(datos){
	if(document.getElementById("divMasConfigVenta").style.display==""){
 
$("div[id=divMasConfigVenta]").fadeOut(500);
	}else{
		document.getElementById("divMasConfigVenta").style.display=""
  
		if(datos=="nro"){
			document.getElementById("inptNroVenta").focus;
			$("#inptNroVenta").select();
		}
	}
}
var ControlVentanaVenta="0";
function limpiarcamposventa(ctrl) {
	idDetalleVenta = "";
	idabmVenta = ""
	idFkProducto = ""
	codSolcirudFK = "";
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	controlVenta="1";
	document.getElementById('inptSeleccTipoComprobanteVenta').value="NOTA DE VENTA"
	
	//ACTIVAR BOTONES AL OBTENER DATOS DESDE SOLIC. CREDITO
	document.getElementById('inptNroCuotasConfCredito').disabled =false;
	document.getElementById('inptMontoPagoConfCredito').disabled =false;
	document.getElementById('inptProductoVenta').disabled =false;
	document.getElementById('inptCodProductoVenta').disabled =false;
	document.getElementById('inptCantProductoVenta').disabled =false;
	document.getElementById('btnAddDetallesaVenta').disabled =false;
	document.getElementById('btnSolicitarDescuento').disabled =false;
	document.getElementById('inptSeleccTipoVenta').disabled =false;
	document.getElementById('vercerrarVistaCliente').disabled =false;
	
	
	document.getElementById('inptFechaVenta').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById('inptClienteVenta').value = "CLIENTE OCASIONAL";
	document.getElementById('inptClienteVenta2').value = "CLIENTE OCASIONAL";
	document.getElementById('inptSolicitudCredito').value = "";
		document.getElementById('inptEntregaVenta').value = "0";
		document.getElementById('inptDocClienteVenta').value = "";
		document.getElementById('inptDocClienteVenta2').value = "";
	document.getElementById('inptSeleccTipoVenta').value = "CONTADO"
	document.getElementById('inptSeleccTipoVenta').disabled=false
	document.getElementById('inptSeleccTipoVenta').style.backgroundColor = ""
	controltipoventa = "CONTADO"
	document.getElementById('table_vista_producto_venta').innerHTML = ""
	document.getElementById('table_vista_producto_venta_costos').innerHTML = ""
	document.getElementById('inptDocGaranteVenta').value = ""
	document.getElementById('inptGaranteVenta').value = ""
	document.getElementById('inpCodVenta').value = ""
	document.getElementById('inptTotalVenta').value = ""
	document.getElementById('inptSubTotalVenta').value = ""
	document.getElementById('inptTotalDescuento').value = ""
	document.getElementById('inptTotalVenta2').innerHTML = "0"
	document.getElementById('inptTotalPagado').value = ""
	document.getElementById('inptDeudaActual').value = ""
	document.getElementById('inpCodVentaPagos').value = ""
	document.getElementById('inptTotalVentaPagos').value = ""
	document.getElementById('inptNroCuotasPagos').value = ""
	document.getElementById('inptMontoPagoOpciones').value = ""
	document.getElementById('inptFechaInicioPapo').value = ""
	document.getElementById('inptProductoVenta').value = ""
	document.getElementById('inptCantProductoVenta').value = ""
	document.getElementById('inptCostoProductoVenta').value = ""
	preciocostocontado="";
	preciocostocredito="";
	document.getElementById('inpTotalCostoVenta').value = ""
	document.getElementById('inptVendedorVenta1').value = ""
	document.getElementById('inptVendedorVenta2').value = ""
	document.getElementById('inptGaranteVenta').value = ""
	document.getElementById('inptDetallesVentaProductos').value = ""
	document.getElementById('inptNroVenta').value = ""
	document.getElementById('pNroFactuaCaja').innerHTML = ""
	if(document.getElementById('inptSeleccTipoComprobanteVenta').value=="FACTURA"){
	document.getElementById('inptSeleccPuntoExpedicionVenta').value = cajapredeterminada
	}else{
		document.getElementById('inptSeleccPuntoExpedicionVenta').value = ""
	}
	if(ControlCobradorUser==0){
		
	document.getElementById('inptCobradorVenta').value = "SIN COBRADOR";
	document.getElementById('inptCobradorCargarPago').value = "SIN COBRADOR";
	document.getElementById('inptCobradorConfirmar').value = "SIN COBRADOR";
	
	idFkCobrador = "9";
	cobradorcredito = "9";
	
	}else{
		
		document.getElementById('inptCobradorVenta').value = document.getElementById("lblUser").innerHTML;
	document.getElementById('inptCobradorCargarPago').value = document.getElementById("lblUser").innerHTML;
	document.getElementById('inptCobradorConfirmar').value = document.getElementById("lblUser").innerHTML;

	idFkCobrador = CodCobradorUser;
	cobradorcredito = CodCobradorUser;
		
	}
	
	document.getElementById('btnAbmVenta').style.display = "none"
	document.getElementById('btnAbmVenta').value = "Guardar datos"
	document.getElementById('inptComisionVentaCobrador').value = "0"
	document.getElementById('inptGaranteVenta').value = "SIN GARANTE";
	document.getElementById("inptEntregaConfCredito").value ="0"
	document.getElementById("inptConfirmarPagoEntrega").value ="SI"
	document.getElementById("btnFinalizarVenta").style.display="none"
	document.getElementById("btnCancelarVenta").style.display="none"
	document.getElementById("btnVerCreditos").style.display="none"
	DatosAutoCompleteCredito=new Array();
					document.getElementById("inptNroCuotasConfCredito").value ="0"
					document.getElementById("inptMontoPagoConfCredito").value = "0"
					document.getElementById("inptFechaInicioConfCredito").value = ""
					document.getElementById("inptInteresConfCredito").value = "4"
					document.getElementById("inptDiasConfCredito").value = "5"
					document.getElementById("inputSelectMetodoConfCredito").value = ""
					document.getElementById("lblInfoConfCredito").innerHTML = ""
					document.getElementById("lblInfoMotoCredito").innerHTML = ""
document.getElementById("inptEntregaConfCredito").disabled=false
					document.getElementById("inptNroCuotasConfCredito").disabled=false
					document.getElementById("inptMontoPagoConfCredito").disabled=false
					document.getElementById("inptFechaInicioConfCredito").disabled=false
					document.getElementById("inptInteresConfCredito").disabled=false
					document.getElementById("inptDiasConfCredito").disabled=false
					document.getElementById("inputSelectMetodoConfCredito").disabled=false
					document.getElementById("inpTSeleccCosto").disabled=false
	idFkVendedor1 = ""
	idFkVendedor2 = ""
	idGaranteFk = ""
	document.getElementById('table_abm_detalle_venta').innerHTML = ""
	idFkCliente = "10";
	
	idGaranteFk = "6";
	document.getElementById('inpCodVenta').disabled = false
	document.getElementById('inpCodVenta').className = "inputText"
	document.getElementById("btnMasInfoClienteVenta").style.display='none'
	document.getElementById("btnNuevoClienteVenta").style.display=''
	document.getElementById("tdImprimirVenta").style.display='none'
	
	controlProductoSolicitud = false;
	cod_producto_descuento = "";
	if(ctrl!="1"){
	seleccionarLocalUSer()
	buscarnrodeventas();
	}
	
	limpiarCamposAnhadirPagos()

}
function buscarnrodeventas() {
	

	if(idabmVenta!=""){
		return false;
	}
	
	document.getElementById("inptNroVenta").value = "..."
	document.getElementById("pNroFactuaCaja").innerHTML = "..."
	var puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	
	if(puntoExpedicion==""){
		cajapredeterminada=buscar_datos_url_usuario('c');
		cajapredeterminada = cajapredeterminada.replace(/\D/g, '');
		
		
		if(document.getElementById('inptSeleccTipoComprobanteVenta').value=="FACTURA"){
			document.getElementById('inptSeleccPuntoExpedicionVenta').value=cajapredeterminada
			puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
			
			seleccionarcaja()
			
		}		
	}
	
	var tipo_comprobante=document.getElementById("inptSeleccTipoComprobanteVenta").value
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"puntoExpedicion": puntoExpedicion,
		"cod_local": cod_localFKUSer,
		"tipo_comprobante": tipo_comprobante,
		"funt": "buscarnroventa"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptNroVenta").value = ''
			document.getElementById("pNroFactuaCaja").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("pNroFactuaCaja").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {		
					document.getElementById("inptNroVenta").value = datos[2]
					
					if(puntoExpedicion==""){						
					document.getElementById("pNroFactuaCaja").innerHTML = "*"+datos[2]+"*"
					}else{
						document.getElementById("pNroFactuaCaja").innerHTML ="*"+puntoExpedicion+"-"+datos[2]+"*"
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

function SeleccTipoComprobanteVenta(){
	if(document.getElementById('inptSeleccTipoComprobanteVenta').value=="FACTURA"){
		document.getElementById('inptSeleccPuntoExpedicionVenta').disabled=false
		document.getElementById('inptSeleccPuntoExpedicionVenta').value=cajapredeterminada
		document.getElementById('inptSeleccTipoComprobanteVenta').style.backgroundColor=""
		 // document.getElementById("btnImprimirticket").style.display=""
					 document.getElementById("btnImprimirFactura").style.display=""
					 document.getElementById("btnImprimirPagare").style.display=""
	}else{
		document.getElementById('inptSeleccPuntoExpedicionVenta').disabled=true
		document.getElementById('inptSeleccPuntoExpedicionVenta').value=""
		document.getElementById('inptSeleccTipoComprobanteVenta').style.backgroundColor="#c0e2fd"
		 // document.getElementById("btnImprimirticket").style.display=""
					 // document.getElementById("btnImprimirFactura").style.display="none"
					 document.getElementById("btnImprimirPagare").style.display=""
	}
	buscarnrodeventas()
}
function CambiarNroVenta1(datos) {
	document.getElementById('inpCodVenta').value = document.getElementById("inptNroVenta").value
	var puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	if(puntoExpedicion==""){						
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+ document.getElementById("inptNroVenta").value+"*";
	}else{
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+puntoExpedicion+"-"+ document.getElementById("inptNroVenta").value+"*";
	}
}
function CambiarNroVenta2(datos) {
	document.getElementById('inptNroVenta').value = document.getElementById("inpCodVenta").value
	var puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	if(puntoExpedicion==""){						
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+ document.getElementById("inpCodVenta").value+"*";
	}else{
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+puntoExpedicion+"-"+ document.getElementById("inpCodVenta").value+"*";
	}
}
function OpcionesTipoVenta(datos){
	
	
	if( document.getElementById("inptTotalPagado").value!="" ){
	if(document.getElementById("inptTotalPagado").value!="0" ){
		document.getElementById("inptSeleccTipoVenta").value=controltipoventa		
	}
	}	
	controltipoventa=document.getElementById("inptSeleccTipoVenta").value;
	var controlDetalle=0;
	$("tr[name=tdDetalleVenta]").each(function(i, elementohtml){
controlDetalle=1;
	   });
	   
	   if(tipoDesdeVenta=="Solicitud"){
		   $("tr[name=tdDetalleVentaOffline], tr[name=tdDetalleVentaOfflineSolicitud]").each(function(i, elementohtml){
				controlDetalle=0;
			});
		   
	   }else{
		   $("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
				controlDetalle=0;
			});
	   }
	   
	 
	if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
		if(controlDetalle=="0"){
		document.getElementById("btnFinalizarVenta").value="Guardar y Config. Credito";	
		}else{
		document.getElementById("btnFinalizarVenta").value="Datos del credito";
		}
		document.getElementById("inpTSeleccCosto").disabled=false
		document.getElementById('inptSeleccTipoVenta').style.backgroundColor=""
		document.getElementById("inptCostoProductoVenta").value= $("#inpTSeleccCosto option:first").val();
		preciocostocredito= QuitarSeparadorMilValor($("#inpTSeleccCosto option:first").val());	
		  $("td[id=td_datos_precio_contado]").each(function(i, elementohtml){  
	   elementohtml.style.display="none"
	   });
	$("td[id=td_datos_precios_creditos]").each(function(i, elementohtml){
elementohtml.style.display=""
	   });
	   
	   
	}else{
		if(controlDetalle=="0"){
		document.getElementById("btnFinalizarVenta").value="Añadir Pago";	
		}else{
		var inptTotalPagado = document.getElementById('inptTotalPagado').value
		if (inptTotalPagado!="0" && inptTotalPagado!="") {
		document.getElementById("btnFinalizarVenta").value="Añadir pago (No Disponible)";
		}else{
		document.getElementById("btnFinalizarVenta").value="Añadir Pago";	
		}
		}
		document.getElementById("inpTSeleccCosto").disabled=true		
		$("#inpTSeleccCosto option[id='contado'").attr("selected",true);
		seleccionarprecios(document.getElementById("inpTSeleccCosto"))
		document.getElementById('inptSeleccTipoVenta').style.backgroundColor="#c0e2fd"
	  $("td[id=td_datos_precio_contado]").each(function(i, elementohtml){  
	   elementohtml.style.display=""
	   });
	$("td[id=td_datos_precios_creditos]").each(function(i, elementohtml){
elementohtml.style.display="none"
	   });
	}
	calcular_total_venta()
	
}
function EditarDatosClienteDesdeVenta(){
	if(elementoCliente==""){
		ver_vetana_informativa("FALTO SELCCIONAR UN REGISTRO")
		return;
	}
	var datostr=elementoCliente
	
	
	document.getElementById('inptLugrarTrabajoCliente').value=$(datostr).children('td[id="td_datos_15"]').html()
	document.getElementById('inptSalarioCliente').value=$(datostr).children('td[id="td_datos_16"]').html()
	document.getElementById('inptAntiguedadCliente').value=$(datostr).children('td[id="td_datos_17"]').html()
	document.getElementById('inptNroTelefTrabajoCliente1').value=$(datostr).children('td[id="td_datos_18"]').html()
	document.getElementById('inptNroTelefTrabajoCliente2').value=$(datostr).children('td[id="td_datos_19"]').html()
	document.getElementById('inptDireccionTrabajoCliente').value=$(datostr).children('td[id="td_datos_20"]').html()
	
	
	
	document.getElementById('inptNombreCliente').value=$(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptApellidoCliente').value='';
	document.getElementById('inptRegistroSeleccCliente').value=$(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNroDocCliente').value=$(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptNroTelefCliente').value=$(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptNrowhatsappCliente').value=$(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptDireccionCliente').value=$(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptReferenciaCliente').value=$(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptCalificaCliente').value=$(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptEstadoCliente').value=$(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptZonaCliente').value=$(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptNroRucCliente').value=$(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptFechaNacCliente').value=$(datostr).children('td[id="td_datos_22"]').html();
	fotocliente1= $(datostr).children('td[id="td_datos_11"]').html();
	fotocliente2= $(datostr).children('td[id="td_datos_12"]').html();
	 $("div[id=imgFotoCliente1]").css({"background-image":"url("+fotocliente1+")"})
	  $("div[id=imgFotoCliente2]").css({"background-image":"url("+fotocliente2+")"})
	idAbmCliente= $(datostr).children('td[id="td_id"]').html();
	idFKZona= $(datostr).children('td[id="td_datos_9"]').html();
    extcliente1="";
    extcliente2="";
  document.getElementById('btnAbmCliente').value="Editar datos";
  document.getElementById('divAbmCliente').style.display="";
  document.getElementById("btnVolverAtrasCliente").style.display="none"
		document.getElementById("btnCerrarAtrasCliente").style.display=""
		controlventananuevocliente="ventavista"
		buscarmasreferenciasclientes()
		buscarmasreferenciascomclientes()
   verCerrarVentanaAbmCliente("1", "2")
  
}
function calcular_total_venta() {
	var c = QuitarSeparadorMilValor(document.getElementById('inptCantProductoVenta').value);
	var t = QuitarSeparadorMilValor(document.getElementById('inptCostoProductoVenta').value);
	var d = QuitarSeparadorMilValor(document.getElementById('inptDescuentoProductoVenta').value);
	if(t>0){
	if (isNaN(c)) {
		document.getElementById('inptCantProductoVenta').value = 0;
		c = 0;
	}
	if (isNaN(d)) {
		document.getElementById('inptDescuentoProductoVenta').value = 0;
		d = 0;
	}
	var c = parseFloat(c);
	var t = parseFloat(t);
	document.getElementById('inpTotalCostoVenta').value = (t * c)-d;
	//separadordemiles(document.getElementById('inpt_interes_pago_venta'))
	separadordemiles(document.getElementById('inpTotalCostoVenta'))
	separadordemiles(document.getElementById('inptDescuentoProductoVenta'))
	separadordemiles(document.getElementById('inptCostoProductoVenta'))
	
	if(d>0){
		var obs=$("select[id=inpTSeleccCosto]").children(":selected").text() 
		document.getElementById("inptObservacionDetalleVenta").value=obs+", Descuento: "+d
	}
	}else{
	  document.getElementById('inpTotalCostoVenta').value=t*c
	}

}
function calcularTotalVentasCosto(datos) {
	calcular_total_venta()
}
function seleccionarprecios(datos) {
	if($("select[id=inpTSeleccCosto]").children(":selected").attr("name")!=undefined){
	document.getElementById("inptCostoProductoVenta").value = datos.value
	preciocostocredito = datos.value
	document.getElementById("inptObservacionDetalleVenta").value =  $("select[id=inpTSeleccCosto]").children(":selected").text() 
	document.getElementById("inptComisionVenta").value = $("select[id=inpTSeleccCosto]").children(":selected").attr("name")
	calcular_total_venta();
	}
}
let permisoModificarCredito=""
function controldecostoventa(datos){
    // if(permisoModificarCredito=="SI"){
        
    // }else{
	var precionuevo=document.getElementById("inptCostoProductoVenta").value
	
	if(Number(preciocostocontado)>0){		
		precionuevo=QuitarSeparadorMilValor(precionuevo);
		if(document.getElementById("inptSeleccTipoVenta").value=="CONTADO"){
		if(Number(precionuevo)<Number(preciocostocontado)){	
		
			if(controlacceso2("HACERDESCUENTO","accion")==false){
				ver_vetana_informativa("EL PRECIO ESTA FUERA DE RANGO")
				document.getElementById("inptCostoProductoVenta").value=separadordemilesnumero(preciocostocontado)
				document.getElementById("inpTotalCostoVenta").value=separadordemilesnumero(preciocostocontado)
				calcular_total_venta()		
				return false;
			}
		
		}else{
		document.getElementById("inptCostoProductoVenta").value=separadordemilesnumero(precionuevo)
		}
		}
		if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
			
		if(Number(precionuevo)<Number(preciocostocredito)){

			if(controlacceso2("HACERDESCUENTO","accion")==false){
			ver_vetana_informativa("EL PRECIO ESTA FUERA DE RANGO")
			document.getElementById("inptCostoProductoVenta").value=separadordemilesnumero(preciocostocredito)
			document.getElementById("inpTotalCostoVenta").value=separadordemilesnumero(preciocostocredito)
			calcular_total_venta()		
			return false;
			}
		
		}else{
		document.getElementById("inptCostoProductoVenta").value=separadordemilesnumero(precionuevo)
		}
		}
	}
  
}
var masdetallesVenta="";
function verCerrarAbmMasDetallesVenta(){
	if(document.getElementById("divAddMasDetallesVenta").style.display==""){
		  
$("div[id=divAddMasDetallesVenta]").fadeOut(500);	
		document.getElementById("inptDetallesVentaProductos").value=masdetallesVenta;
	}else{	
		document.getElementById("divAddMasDetallesVenta").style.display=""
  
	}
}
function confirmarCambios(){
	document.getElementById("divAddMasDetallesVenta").style.display="none"
	masdetallesVenta=document.getElementById("inptDetallesVentaProductos").value
}



let DatosAutoCompleteCredito = [];
let filaAEliminar = null;

function mostrarMensajeError(msg) {
    ver_vetana_informativa(msg);
}

function limpiarCamposDetalleProducto() {
    const camposTexto = [
        'inptCantProductoVenta', 'inpTotalCostoVenta', 'inptCostoProductoVenta',
        'inptDescuentoProductoVenta', 'inptObservacionDetalleVenta',
        'inptComisionVenta', 'inptProductoVenta', 'inptDetallesVentaProductos'
    ];
    camposTexto.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    const select = document.getElementById('inpTSeleccCosto');
    if (select) select.innerHTML = "";

    document.getElementById('btnAbmVenta').style.display = "none";
    document.getElementById('btnAddDetallesaVenta').style.backgroundColor = "#b7b7b7";
    document.getElementById('btnSolicitarDescuento').style.backgroundColor = "#b7b7b7";

    idFkProducto = "";
}

function obtenerAtributoSelectCosto(attr) {
    const opcion = document.querySelector("select#inpTSeleccCosto option:checked");
    return opcion ? opcion.getAttribute(attr) : "";
}

function mostrarModalEliminar(button) {
    filaAEliminar = button.closest("table");
    document.getElementById('modalConfirmacion').style.display = "block";
}

function cerrarModalEliminar() {
    document.getElementById('modalConfirmacion').style.display = "none";
    filaAEliminar = null;
}

function confirmarEliminacionFila() {
    if (filaAEliminar) {
        filaAEliminar.remove();
        calcularTotalesDetalleVenta();
    }
    cerrarModalEliminar();
}

function generarFilaDetalleVenta(data) {
    return `
    <table id='tdDetalleVenta_${data.nroid}' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>
        <tr onclick='SeleccionarProductoVentaOffline(this)' name='tdDetalleVentaOffline'>
            <td id='td_id_1' style='display:none'>${data.idFkProducto}</td>
            <td id='td_id_2' style='display:none'>${data.nroid}</td>
            <td id='td_datos_8' style='width:10%'>${data.codProducto}</td>
            <td id='td_datos_1' style='width:45%'>${data.nombreProducto}</td>
            <td id='td_datos_6' style='display:none'>${data.detallesProducto}</td>
            <td id='td_datos_3' style='width:15%'>${data.precioUnitario}</td>
            <td id='td_datos_4' style='width:10%'>${data.cantidad}</td>
            <td id='td_datos_9' style='display:none'>${data.descuento}</td>
            <td id='td_datos_5' style='width:18%'>${data.total}</td>
            <td id='td_datos_7' style='display:none'>${data.comision}</td>
            <td id='td_datos_10' style='display:none'>${data.cuotaNro}</td>
            <td id='td_datos_11' style='display:none'>${data.entrega}</td>
            <td id='td_datos_15' style='display:none'>${data.total}</td>
            <td id='td_datos_16' style='display:none'></td>
            <td					 style='width:2%; text-align:center'>
                <button onclick='mostrarModalEliminar(this); event.stopPropagation();' 
                    style='background-color:red;color:white;border:none;padding:2px 6px;border-radius:4px;cursor:pointer;'>X</button>
            </td>
        </tr>
    </table>`;
}

 




function calcularTotalesDetalleVenta() {
    let totalVenta = 0;
    let totalDescuento = 0;
    let control = 0;

    document.querySelectorAll("tr[name='tdDetalleVentaOffline']").forEach(row => {
        const total = QuitarSeparadorMilValor(row.querySelector('td[id="td_datos_5"]')?.innerHTML || "0");
        const descuento = QuitarSeparadorMilValor(row.querySelector('td[id="td_datos_9"]')?.innerHTML || "0");
        totalVenta += Number(total);
        totalDescuento += Number(descuento);
        control++;
    });

    const subTotal = totalVenta + totalDescuento;

    document.getElementById("inptSubTotalVenta").value = separadordemilesnumero(subTotal);
    document.getElementById("inptTotalVenta").value = separadordemilesnumero(totalVenta);
    document.getElementById("inptTotalVenta2").innerHTML = separadordemilesnumero(totalVenta);
    document.getElementById("inptTotalDescuento").value = separadordemilesnumero(totalDescuento);

    return control;
}

function anhadirProductoEnDetalleVenta() {
    const entrega = document.getElementById('inptEntregaVenta').value;
    if (!entrega) return mostrarMensajeError("FALTO AGREGAR ENTREGA");

    const tieneDetalles = document.querySelectorAll("tr[name='tdDetalleVenta']").length > 0;
    if (tieneDetalles) return mostrarMensajeError("NO ES POSIBLE AGREGAR UN PRODUCTO A UNA VENTA FINALIZADO");

    if (idabmAperturacierrecaja === "") {
        mostrarMensajeError("FALTO INICIAR UNA CAJA");
        verCerrarVentanaAbmAperturaCierreCaja1();
        return;
    }

    DatosAutoCompleteCredito = [];

    const totalPagado = parseFloat(document.getElementById('inptTotalPagado').value);
    if (totalPagado > 0) return mostrarMensajeError("NO SE PUEDE AÑADIR DETALLE A LA VENTA PORQUE YA TIENE UN PAGO");

    const acceso = document.getElementById('inptAccesoCreditoVentaCliente').value;
    const tipoVenta = document.getElementById("inptSeleccTipoVenta").value;
    if (acceso === "Denegado" && tipoVenta === "CREDITO") {
        return mostrarMensajeError("EL CLIENTE NO ESTÁ AUTORIZADO PARA VENTAS A CRÉDITO");
    }

    document.getElementById('inptSeleccTipoVenta').disabled = true;

    const codProducto = document.getElementById('inptCodProductoVenta').value;
    const nombreProducto = document.getElementById('inptProductoVenta').value;
    const cantidad = parseFloat(document.getElementById('inptCantProductoVenta').value);
    const total = document.getElementById('inpTotalCostoVenta').value;
    const precioUnitario = document.getElementById('inptCostoProductoVenta').value;
    const comision = document.getElementById('inptComisionVenta').value;
    const descuento = document.getElementById('inptDescuentoProductoVenta').value;
    let detallesProducto = document.getElementById('inptDetallesVentaProductos').value;

    const cuotaNro = obtenerAtributoSelectCosto("id");
	
	validarPrecioProducto(precioUnitario, precioMinimoProducto, tipoVenta);
	
	
    if (!cantidad || cantidad <= 0) return mostrarMensajeError("FAVOR AGREGAR CANTIDAD");
    if (idFkProducto === "") return mostrarMensajeError("FALTO SELECCIONAR UN PRODUCTO");

    const resultadoStock = Number(StockVenta) - cantidad;
    if (accesosuser?.["STOCK0"]?.["accion"] !== "SI" && resultadoStock < 0) {
        return mostrarMensajeError("NO PUEDES VENDER PRODUCTOS CON STOCK MENOR A 0");
    }

    detallesProducto = detallesProducto.replace(/\n/g, "<br>");

    const nroid = Math.floor(Math.random() * 1000) + 1;

    const dataFila = {
        idFkProducto, nroid, codProducto, nombreProducto, detallesProducto,
        precioUnitario, cantidad, descuento, total, comision, cuotaNro, entrega
    };

    const filaHTML = generarFilaDetalleVenta(dataFila);
    document.getElementById("table_abm_detalle_venta").insertAdjacentHTML("beforeend", filaHTML);

    const cantidadFilas = calcularTotalesDetalleVenta();

    if (cantidadFilas === 1) {
        DatosAutoCompleteCredito.push(cuotaNro);
    }

    OpcionesTipoVenta();

    document.getElementById("btnFinalizarVenta").style.display = "";
    document.getElementById("btnCancelarVenta").style.display = "";

    limpiarCamposDetalleProducto();
}




function validarPrecioProducto(precioUnitario, precioMinimoProducto, tipoVenta) {
    // Convertir a número después de limpiar
    const precioMinimo = Number(QuitarSeparadorMilValor(precioMinimoProducto));
    const precioUnitarioControl = Number(QuitarSeparadorMilValor(precioUnitario));

    // Validar conversiones
    // if (isNaN(precioMinimo) || isNaN(precioUnitarioControl)) {
        // mostrarMensajeError("Error: precios inválidos");
        // return false;
    // }

    // Verificación solo para CONTADO
    // if (tipoVenta === "CONTADO") {
        // if (precioUnitarioControl < precioMinimo) {
            // mostrarMensajeError("FAVOR AGREGAR UN PRECIO VÁLIDO");
            // document.getElementById("inpPrecioProductoVenta").focus();
            // return false;
        // }
    // }

    return true; // si pasó todo
}








// Listeners del modal
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnConfirmarEliminar").addEventListener("click", confirmarEliminacionFila);
    document.getElementById("btnCancelarEliminar").addEventListener("click", cerrarModalEliminar);
});


function formatearMiles(input) {
    // Elimina todo lo que no sea número ni coma o punto decimal
    let rawValue = input.value.replace(/[^0-9.,]/g, '').replace(/\./g, '');

    // Verifica si hay coma o punto decimal
    let partes = rawValue.split(/[.,]/);
    let entero = partes[0];
    let decimal = partes[1] || '';

    // Aplica separador de miles al entero
    let formateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Si hay decimales, los volvemos a unir
    if (decimal.length > 0) {
        formateado += ',' + decimal;
    }

    input.value = formateado;
}

function controldecostoventa(input) {
    // Limpiar y convertir valor del input a número
    const valorLimpio = input.value.replace(/\./g, '').replace(',', '.');
    const precioUnitario = parseFloat(valorLimpio);

    if (isNaN(precioUnitario)){
        return;
    }
	
	 if ( precioUnitario <= 0) {
        mostrarMensajeError("Ingrese un precio válido mayor a 0.");
        input.focus();
        return;
    }

    const cantidadInput = document.getElementById("inptCantProductoVenta");
    const cantidadLimpia = cantidadInput.value.replace(/\./g, '').replace(',', '.');
    const cantidad = parseFloat(cantidadLimpia);

    if (isNaN(cantidad) ) { 
        return;
    }
    if ( cantidad <= 0 ) {
        mostrarMensajeError("Ingrese una cantidad válida mayor a 0.");
        cantidadInput.focus();
        return;
    }

    const totalVentaCalculo = precioUnitario * cantidad;

    // Mostrar el total con separador de miles
    const totalFormateado = separadordemilesnumero(totalVentaCalculo);
    document.getElementById("inpTotalCostoVenta").value = totalFormateado;
}


var elemSeleccDetalleProdVentaOff="";
var idfkTableDetalle="";
function SeleccionarProductoVentaOffline(datos){
	elemSeleccDetalleProdVentaOff=datos;
	idfkTableDetalle=$(datos).children('td[id="td_id_2"]').html();
	document.getElementById("inptCodDetalleOff").value=$(datos).children('td[id="td_datos_8"]').html();
	document.getElementById("inptNombreProductoDetalleOpcionOff").value=$(datos).children('td[id="td_datos_1"]').html();
	verCerraOpcionDetalleProducto()
}
function verCerraOpcionDetalleProducto(){
	if(document.getElementById("divEliminarProductoDetalle").style.display=="none"){
		document.getElementById("divEliminarProductoDetalle").style.display=""
	}else{
		document.getElementById("divEliminarProductoDetalle").style.display="none"
	}
}
function quitarEsteProductoDelDetalleVenta(){
	elemSeleccDetalleProdVentaOff.remove()
	$("table[id=tdDetalleVenta_"+idfkTableDetalle+"]").remove()	
	var totalVenta=0;
	var totalDescuento=0;
	var SubtotalVenta=0;
$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_5"]').html();
var totaldescuentos=$(elementohtml).children('td[id="td_datos_9"]').html();
total=QuitarSeparadorMilValor(total)
totaldescuentos=QuitarSeparadorMilValor(totaldescuentos)
totalVenta=Number(totalVenta)+Number(total)
totalDescuento=Number(totalDescuento)+Number(totaldescuentos)
SubtotalVenta=Number(totalVenta)+Number(totalDescuento)
	   });
document.getElementById("inptSubTotalVenta").value=separadordemilesnumero(SubtotalVenta);
document.getElementById("inptTotalVenta").value=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalVenta2").innerHTML=separadordemilesnumero(totalVenta);
document.getElementById("inptTotalDescuento").value=separadordemilesnumero(totalDescuento);
if(totalVenta==0){
	document.getElementById("btnFinalizarVenta").style.display="none"
	document.getElementById("btnVerCreditos").style.display="none"
	document.getElementById("btnCancelarVenta").style.display="none"
	document.getElementById('inptSeleccTipoVenta').disabled=false
}
	
	document.getElementById("divEliminarProductoDetalle").style.display="none"
}
function guardaryfinalizarventa(){
	
	if(idabmAperturacierrecaja==""){
		   ver_vetana_informativa("FALTO INICIAR UNA CAJA")
		   verCerrarVentanaAbmAperturaCierreCaja1()
		   return
	   }
	   
	   var TipoVentaCtrl = document.getElementById("inptSeleccTipoVenta").value
	   var clienteCtrl = document.getElementById("inptClienteVenta").value
	   var SolicirudCtrl = document.getElementById("inptSolicitudCredito").value
		

	   // if(TipoVentaCtrl=="CREDITO"){
		   
		   // if(controlacceso2("VENDERSINSOLICITUDCREDITO","accion")==false){
				// if(SolicirudCtrl==""){
					// ver_vetana_informativa("FALTO SELECCIONAR SOLICITUD DE CREDITO")		 
					// return
				// }
		   
				// if(clienteCtrl!=SolicirudCtrl){
					// ver_vetana_informativa("SOLICITUD DE CREDITO Y NOMBRE DE CLIENTE NO COINCIDEN")		 
					// return
				// }
			// }
	   // }
	
	var controlDetalle=0;
	$("tr[name=tdDetalleVenta]").each(function(i, elementohtml){
controlDetalle=2;
	   });
	$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
controlDetalle=1;
	   });
	   
	   if(controlDetalle=="0"){
		ver_vetana_informativa("FALTA DETALLES A LA VENTA")
		return false;
	}
	if(controlDetalle=="1"){
		
		document.getElementById("inptEntregaConfCredito").value = document.getElementById("inptEntregaVenta").value
		var Entrega = document.getElementById("inptEntregaVenta").value
		Entrega=QuitarSeparadorMilValor(Entrega)
		var TotalVenta = document.getElementById("inptSubTotalVenta").value
		TotalVenta=QuitarSeparadorMilValor(TotalVenta)
		var totalDescuento = document.getElementById("inptTotalDescuento").value;
		totalDescuento = QuitarSeparadorMilValor(totalDescuento)
		var resultado = TotalVenta - Entrega - totalDescuento;
		AutoCompletarCamposCuotas()
		 
	
		if(Number(Entrega)>=Number(TotalVenta)){
			ver_vetana_informativa("LO SIENTO LA ENTREGA TIENE UN VALOR SUPERIOR A LA VENTA")
			return false;
		}
		document.getElementById("inptSaldoConfCredito").value = separadordemilesnumero(resultado)
		verificarcamposdetallesventa()
		
	}
	if(controlDetalle=="2"){
		 
		document.getElementById("inptEntregaConfCredito").value = document.getElementById("inptEntregaVenta").value
		var Entrega = document.getElementById("inptEntregaVenta").value
		Entrega=QuitarSeparadorMilValor(Entrega)
		var TotalVenta = document.getElementById("inptSubTotalVenta").value
		var TotalVenta = document.getElementById("inptSubTotalVenta").value
		TotalVenta=QuitarSeparadorMilValor(TotalVenta)
		var resultado = TotalVenta - Entrega
		 AutoCompletarCamposCuotas()
		 document.getElementById("inptSaldoConfCredito").value = separadordemilesnumero(resultado)
		 verCerrarConfigCredito("1")
	}
}
var idDetalleVenta = "";
/*SI SE MODIFICA LA FUNCION VERIFICAR DETALLE VENTA TAMBIEN HAY QUE CAMBIAR VERIFICAR DETALLE VENTA CREDITO*/
function verificarcamposdetallesventa() {
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	if (inptTotalPagado > 0) {
		ver_vetana_informativa("NO SE PUEDE AÑADIR DETALLE A LA VENTA POR QUE ESTE YA CUENTA CON UN PAGO")
		return false;
	}
	var controldetalle=0;
	$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
controldetalle=controldetalle+1;
	   });
	if(controldetalle=="0"){
		ver_vetana_informativa("FALTO AÑADIR DETALLES")
		return false;
	}
	var vendedor1 = document.getElementById('inptVendedorVenta1').value
	var inptFechaVenta = document.getElementById('inptFechaVenta').value
	var inptClienteVenta = document.getElementById('inptClienteVenta').value
	var inptSeleccTipoVenta = document.getElementById('inptSeleccTipoVenta').value
	var inptComisionVentaCobrador = document.getElementById('inptComisionVentaCobrador').value
	var inptCobradorVenta = document.getElementById('inptCobradorVenta').value
	var inpCodVenta = document.getElementById('inpCodVenta').value
	var inptlocalVenta = document.getElementById('inptlocalVenta').value
	var inptGaranteVenta = document.getElementById('inptGaranteVenta').value
	var inptSeleccTipoComprobanteVenta = document.getElementById('inptSeleccTipoComprobanteVenta').value
	var inptSeleccPuntoExpedicionVenta = $("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	var nrocaja = document.getElementById('pCaja').innerHTML
	if (inpCodVenta == "") {
		document.getElementById('inpCodVenta').value = "";
		document.getElementById('inptNroVenta').value = "";
		inpCodVenta = "";
	}

	if (idFkVendedor1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN VENDEDOR")
		return false;
	}
	if (inptFechaVenta == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA FECHA")
		return false;
	}

	if (inptComisionVentaCobrador == "") {
		inptComisionVentaCobrador="0"
	}

	if (idFkCliente == "") {
		document.getElementById('inptClienteVenta').value = "CLIENTE OCASIONAL";
		document.getElementById('inptClienteVenta2').value = "CLIENTE OCASIONAL";
		document.getElementById('inptDocClienteVenta').value = "";
		document.getElementById('inptDocClienteVenta2').value = "";
		idFkCliente = "7";
	}
	

	if (inptCobradorVenta == "") {
		idFkCobrador = "9";
		cobradorcredito = "9";
		document.getElementById('inptCobradorVenta').value = "SIN COBRADOR";
		document.getElementById('inptCobradorCargarPago').value = "SIN COBRADOR";
		document.getElementById('inptCobradorConfirmar').value = "SIN COBRADOR";
	}
	if (inptGaranteVenta == "") {
		idGaranteFk = "6";
		document.getElementById('inptGaranteVenta').value = "SIN GARANTE";
	}
	if(inptSeleccTipoVenta=="CREDITO"){
	 if((document.getElementById('inptClienteVenta').value == "CLIENTE OCASIONAL")|| (document.getElementById('inptClienteVenta').value == "")){
		ver_vetana_informativa("EL CLIENTE NO ES VÁLIDO")
		return
	}
	verCerrarConfigCredito("1")
	return
	}else{
		
		verCerrarConfigCredito("1")
		return;
	}
 
}

var controlVenta="1";

function VerificarCamposVentaContago(desde, omitirControlDeposito){
	if(desde=="2" && !verificarDepositosPagoGrilla("div_opciones_pago", function(){ VerificarCamposVentaContago(desde); })){
		return;
	}
	
	let control = contarPagosConMontoPorNombre("tdDetallePagoOffline"); 
	
	if(control <= 0 && desde=="2"){
		ver_vetana_informativa("FALTO CARGAR LOS PAGOS");
		return;
	}

	if(control > 0){

	let totalaPagar = document.getElementById('inptTotalaPagar').value;
	let totalPagado = document.getElementById('inpTotalPagadoVenta').value;
			
	totalaPagar = QuitarSeparadorMilValor(totalaPagar)
	totalPagado = QuitarSeparadorMilValor(totalPagado)
			
			
		if(Number(totalaPagar) > Number(totalPagado)){
		ver_vetana_informativa("FAVOR COMPLETAR LA TOTALIDAD DE LA VENTA EN OPCIONES DE PAGO");
		control = 0;
		return;
		}
	}
	 
	if(controlVenta=="2"){
		return;
	}
	controlVenta="2";
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	if (inptTotalPagado > 0) {
		ver_vetana_informativa("NO SE PUEDE AÑADIR DETALLE A LA VENTA POR QUE ESTE YA CUENTA CON UN PAGO")
		return false;
	}
	var controldetalle=0;
	$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
			controldetalle=controldetalle+1;
	   });
	if(controldetalle=="0"){
		ver_vetana_informativa("FALTO AÑADIR DETALLES")
		return false;
	}
	var vendedor1 = document.getElementById('inptVendedorVenta1').value
	var inptFechaVenta = document.getElementById('inptFechaVenta').value
	var inptClienteVenta = document.getElementById('inptClienteVenta').value
	var inptSeleccTipoVenta = document.getElementById('inptSeleccTipoVenta').value
	var inptComisionVentaCobrador = document.getElementById('inptComisionVentaCobrador').value
	var inptCobradorVenta = document.getElementById('inptCobradorVenta').value
	var inpCodVenta = document.getElementById('inpCodVenta').value
	var inptlocalVenta = document.getElementById('inptlocalVenta').value
	var inptGaranteVenta = document.getElementById('inptGaranteVenta').value
	var inptSeleccTipoComprobanteVenta = document.getElementById('inptSeleccTipoComprobanteVenta').value
	var inptSeleccPuntoExpedicionVenta = $("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	var nrocaja = document.getElementById('pCaja').innerHTML
	if (inpCodVenta == "") {
		document.getElementById('inpCodVenta').value = "";
		document.getElementById('inptNroVenta').value = "";
		inpCodVenta = "";
	}

	if (idFkVendedor1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN VENDEDOR")
		return false;
	}
	if (inptFechaVenta == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA FECHA")
		return false;
	}

	if (inptComisionVentaCobrador == "") {
		inptComisionVentaCobrador="0"
	}

	if (idFkCliente == "") {
		document.getElementById('inptClienteVenta').value = "CLIENTE OCASIONAL";
		document.getElementById('inptClienteVenta2').value = "CLIENTE OCASIONAL";
		document.getElementById('inptDocClienteVenta').value = "";
		document.getElementById('inptDocClienteVenta2').value = "";
		idFkCliente = "7";
	}
	 
	if (inptCobradorVenta == "") {
		idFkCobrador = "9";
		cobradorcredito = "9";
		document.getElementById('inptCobradorVenta').value = "SIN COBRADOR";
		document.getElementById('inptCobradorCargarPago').value = "SIN COBRADOR";
		document.getElementById('inptCobradorConfirmar').value = "SIN COBRADOR";
	}
	if (inptGaranteVenta == "") {
		idGaranteFk = "6";
		document.getElementById('inptGaranteVenta').value = "SIN GARANTE";
	}
	if(inptSeleccTipoVenta=="CREDITO"){
	 if((document.getElementById('inptClienteVenta').value == "CLIENTE OCASIONAL")|| (document.getElementById('inptClienteVenta').value == "")){
		ver_vetana_informativa("EL CLIENTE NO ES VÁLIDO")
		return
	}
	verCerrarConfigCredito("1")
	return
	}
 
    var accion = "nuevo";
	var tipo="1"
 
    abmdetalleventa(nrocaja,inptSeleccPuntoExpedicionVenta,inptSeleccTipoComprobanteVenta,inptFechaVenta,inptComisionVentaCobrador,idFkCliente,idGaranteFk,inptSeleccTipoVenta,idFkCobrador,idFkVendedor1, idFkVendedor2, idabmVenta, inpCodVenta, inptlocalVenta, accion,tipo);
	
}


function verificarcamposdetallesventacredito() {
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	if (inptTotalPagado > 0) {
		ver_vetana_informativa("NO SE PUEDE AÑADIR DETALLE A LA VENTA POR QUE ESTE YA CUENTA CON UN PAGO")
		return false;
	}
	var controldetalle=0;
	$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
controldetalle=controldetalle+1;
	   });
	if(controldetalle=="0"){
		ver_vetana_informativa("FALTO AÑADIR DETALLES")
		return false;
	}
	var inptFechaVenta = document.getElementById('inptFechaVenta').value
	var inptClienteVenta = document.getElementById('inptClienteVenta').value
	var inptSeleccTipoVenta = document.getElementById('inptSeleccTipoVenta').value
	var inptComisionVentaCobrador = document.getElementById('inptComisionVentaCobrador').value
	var inptCobradorVenta = document.getElementById('inptCobradorVenta').value
	var inpCodVenta = document.getElementById('inpCodVenta').value
	var inptlocalVenta = document.getElementById('inptlocalVenta').value
	var inptGaranteVenta = document.getElementById('inptGaranteVenta').value
	var inptGaranteVenta = document.getElementById('inptGaranteVenta').value
	var inptSeleccTipoComprobanteVenta = document.getElementById('inptSeleccTipoComprobanteVenta').value
	var inptSeleccPuntoExpedicionVenta = $("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	var nrocaja = document.getElementById('pCaja').innerHTML
	if (inpCodVenta == "") {
		document.getElementById('inpCodVenta').value = "";
		document.getElementById('inptNroVenta').value = "";
		inpCodVenta = "";
	}

	if (inptFechaVenta == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA FECHA")
		return false;
	}

	if (inptComisionVentaCobrador == "") {
		inptComisionVentaCobrador="0"
	}

	if (idFkCliente == "") {
		document.getElementById('inptClienteVenta').value = "CLIENTE OCASIONAL";
		document.getElementById('inptClienteVenta2').value = "CLIENTE OCASIONAL";
		document.getElementById('inptDocClienteVenta').value = "";
		document.getElementById('inptDocClienteVenta2').value = "";
		idFkCliente = "7";
	}
	

	if (inptCobradorVenta == "") {
		idFkCobrador = "9";
		cobradorcredito = "9";
		document.getElementById('inptCobradorVenta').value = "SIN COBRADOR";
		document.getElementById('inptCobradorCargarPago').value = "SIN COBRADOR";
		document.getElementById('inptCobradorConfirmar').value = "SIN COBRADOR";
	}
	if (inptGaranteVenta == "") {
		idGaranteFk = "6";
		document.getElementById('inptGaranteVenta').value = "SIN GARANTE";
	}
	if(inptSeleccTipoVenta=="CREDITO"){
	 if((document.getElementById('inptClienteVenta').value == "CLIENTE OCASIONAL")|| (document.getElementById('inptClienteVenta').value == "")){
		ver_vetana_informativa("EL CLIENTE NO ES VÁLIDO")
		return
	}
	
	}

    var accion = "nuevo";
	var tipo="2"
    abmdetalleventa(nrocaja,inptSeleccPuntoExpedicionVenta,inptSeleccTipoComprobanteVenta,inptFechaVenta,inptComisionVentaCobrador,idFkCliente,idGaranteFk,inptSeleccTipoVenta,idFkCobrador,idFkVendedor1, idFkVendedor2, idabmVenta, inpCodVenta, inptlocalVenta, accion,tipo);
}



function abmdetalleventa(caja,puntoexpedicion,tipo_comprobante,fecha_venta,comisioncobrador,cod_clienteFK,idGaranteFk,TipoVenta,cod_cobradorFK,idFkVendedor1, idFkVendedor2,cod_ventaFK, num_factura, cod_local, accion,tipo) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	var control=1;
	$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){	
	var idproducto=$(elementohtml).children('td[id="td_id_1"]').html();
    datos.append("cod_productoFK"+control, idproducto)	
	var cantidad=$(elementohtml).children('td[id="td_datos_4"]').html();
    datos.append("cantidad_detalle"+control, cantidad)
	var precio=$(elementohtml).children('td[id="td_datos_3"]').html();
    datos.append("precio_producto"+control, precio)	
	var subotal=$(elementohtml).children('td[id="td_datos_5"]').html();
    datos.append("subtotal"+control, subotal)	
	var comision=$(elementohtml).children('td[id="td_datos_7"]').html();
    datos.append("comision"+control, comision)	
	var descuento=$(elementohtml).children('td[id="td_datos_9"]').html();
    datos.append("descuento"+control, descuento)	
	var detalleproducto=$(elementohtml).children('td[id="td_datos_6"]').html();
    datos.append("detalleproducto"+control, detalleproducto)
	
	var cod_combo=$(elementohtml).children('td[id="td_datos_16"]').html();
    datos.append("cod_combo"+control, cod_combo)
	control=control+1;	
	   });
	control=control-1;	
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_ventaFK", cod_ventaFK)
	datos.append("num_factura", num_factura)
	datos.append("comisioncobrador", comisioncobrador)
	datos.append("cod_local", cod_local)
	datos.append("TipoPago", "Corrido")
	datos.append("fecha_venta", fecha_venta)
	datos.append("cod_clienteFK", cod_clienteFK)
	datos.append("idGaranteFk", idGaranteFk)
	datos.append("cod_cobradorFK", cod_cobradorFK)
	datos.append("vendedor1", idFkVendedor1)
	datos.append("vendedor2", idFkVendedor2)
	datos.append("TipoVenta", TipoVenta)
	datos.append("tipo_comprobante", tipo_comprobante)
	datos.append("puntoexpedicion", puntoexpedicion)
	datos.append("codSolicitudCreditoFK", codSolcirudFK)
	datos.append("totalRegistro", control)
	datos.append("caja", caja)
	datos.append("tipo", tipo)
	var OpAjax = $.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
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
				   controlVenta="1"
				   codSolcirudFK=""
									
					idabmVenta = datos["3"]
					idFkVenta = datos["3"]
					cod_ventaReciboFK= datos["3"]
					
					var nrofactura = datos["4"]
                    var contador=0;            
					document.getElementById('inpCodVenta').disabled = true
					document.getElementById('inpCodVenta').className = "inputTextDisable"
					// buscardetallesventa()
					if(document.getElementById('inptNroVenta').value==""){
					document.getElementById('inptNroVenta').value = nrofactura
					document.getElementById('inpCodVenta').value = nrofactura
					var puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
					if(puntoExpedicion==""){						
					document.getElementById("pNroFactuaCaja").innerHTML = "*"+nrofactura+"*"
					}else{
						document.getElementById("pNroFactuaCaja").innerHTML ="*"+puntoExpedicion+"-"+nrofactura+"*"
					}
					}
					document.getElementById('tdImprimirVenta').style.display = ""
					document.getElementById('btnAbmVenta').style.display = ""
					document.getElementById('btnAbmVenta').value = "Editar Datos"
					if(tipo=="1"){
						let control = contarPagosConMontoPorNombre("tdDetallePagoOffline"); 
					
					if(control > 0){
						abmTipoPagosVentaContado(idabmVenta)
						
					}else{
						abmconfirmarPagoContado(idabmVenta)
					}
					
					}
					if(tipo=="2"){
						crearcreditodesdeventa()
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



var totalCobroInteres="";
var totalCobroCuota="";
var totalCobroCargoAdministrativo="";
var totalCobroPagado="";



function buscardetallesventa() {
	document.getElementById("table_abm_detalle_venta").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idabmVenta,
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		  
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_detalle_venta").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_detalle_venta").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];

				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					var datos_buscados = datos[2];
					 detallesRecibo = datos[5];
					 paginaDetalleTicket = datos[14];
					 paginaticket = datos[14];
					 CuotasNro=datos[41];
					 totalCobroCuota=datos[42];
					 totalCobroInteres=datos[43];
						
					 totalCobroCargoAdministrativo=datos[44];
					 totalCobroPagado=datos[45];
					 SubtotalRecibovaiva5 = datos[6];
					 SubtotalRecibovaiva10 = datos[7];
					 totalesReciboDetalleiva10 = datos[8];
					 totalesReciboDetalleiva15 = datos[9];
					 totalInteresRecibo = datos[36];
					document.getElementById("table_abm_detalle_venta").innerHTML = datos_buscados
					document.getElementById("inptTotalVenta").value = datos[3]
					document.getElementById("inptTotalDescuento").value = datos[37]
					document.getElementById("inptSubTotalVenta").value = datos[38]
					document.getElementById("inptTotalVenta2").innerHTML = datos[3]
					totalesRecibo = datos[3]
					ImportePagare = datos[3]
					document.getElementById("inptTotalPagado").value = datos[4]
					document.getElementById("inptTotalPagadoOpcionesPago").value = datos[4]
				    NombreRecibo=datos[10]
				    DireccionRecibo=datos[11]
                    telefonoRecino=datos[12]
                    DocumentoRecibo=datos[13]
                    document.getElementById('inptDocClienteVenta').value=datos[13]
                    document.getElementById('inptDocClienteVenta2').value=datos[13]
                    PlazoRecibo=datos[41]
                    facturanroPagare=datos[25]
					NroFacturaLegal=datos[25]
                    vencimientopagare=datos[26]
                    ZonaRecibo=datos[27]
                    telefonoRecinoGarante=datos[28]
                    ZonaReciboGarante=datos[29]
                    InteresRecibo=datos[30]
                    DeudaActualRecibo=datos[31]
                    DiasAtrasado=datos[32]
                    RucRecibo=datos[33]
					CiRecibo=datos[13]
                    TotalDescuentoRecibo=datos[34]
                    CuotasRestante=datos[35]
					TipoFactura=datos[40]
                    nroPagare=idabmVenta
cod_ventaReciboFK=idabmVenta					
					
					zonagarante=datos[29]
					
					 var plazoContrato=datos[48]
					var CoutaContrato=datos[49]
					var EntregaContrato=datos[50]
					
					datosContrato = {
						fecha: datos[46],
						cliente: datos[10],
						ruc: datos[13],
						condicion: datos[40],
						telefono: datos[12],
						cod_venta:datos[25],
						totalVenta:datos[3], 
						entrega: EntregaContrato,
						saldo: datos[31],
						plazo: plazoContrato,
						mensual: CoutaContrato, 
						detalle: datos[47], 
					  };
					
 	
					document.getElementById("inptEntregaConfCredito").value = datos[17]
					document.getElementById("inptNroCuotasConfCredito").value = datos[19]
					document.getElementById("inptMontoPagoConfCredito").value = datos[23]
					document.getElementById("inptFechaInicioConfCredito").value = datos[16]
					document.getElementById("inptInteresConfCredito").value = datos[21]
					document.getElementById("inptDiasConfCredito").value = datos[20]
					document.getElementById("inputSelectMetodoConfCredito").value = datos[22]
					document.getElementById("inptDocGaranteVenta").value = datos[39]
					if(datos[4]!="0"){
						document.getElementById("lblInfoConfCredito").innerHTML = "Estos datos ya no pueden ser editados por que la venta ya cuenta con un pago"
					document.getElementById("inptEntregaConfCredito").disabled=true
					document.getElementById("inptNroCuotasConfCredito").disabled=true
					document.getElementById("inptMontoPagoConfCredito").disabled=true
					document.getElementById("inptFechaInicioConfCredito").disabled=true
					document.getElementById("inptInteresConfCredito").disabled=true
					document.getElementById("inptDiasConfCredito").disabled=true
					document.getElementById("inputSelectMetodoConfCredito").disabled=true
					}else{
					document.getElementById("lblInfoConfCredito").innerHTML = ""					
					document.getElementById("inptEntregaConfCredito").disabled=false
					document.getElementById("inptNroCuotasConfCredito").disabled=false
					document.getElementById("inptMontoPagoConfCredito").disabled=false
					document.getElementById("inptFechaInicioConfCredito").disabled=false
					document.getElementById("inptInteresConfCredito").disabled=false
					document.getElementById("inptDiasConfCredito").disabled=false
					document.getElementById("inputSelectMetodoConfCredito").disabled=false
					}
					
					if(datos[24]>1){
						document.getElementById("lblInfoMotoCredito").innerHTML = "Este credito tiene diferentes montos"
					}else{
						document.getElementById("lblInfoMotoCredito").innerHTML = ""
					}
					if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
						 document.getElementById("btnVerCreditos").style.display=""
		                 AutoCompletarCamposCuotas()
					}else{
						 document.getElementById("btnVerCreditos").style.display="none"
					}
             		  
				  document.getElementById("btnFinalizarVenta").style.display=""
				  document.getElementById("btnCancelarVenta").style.display=""
					OpcionesTipoVenta();
					
					
					
					


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



function verCerrarConfigCredito(d){
	controlVenta="1";
	if(d=="1"){		
	if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
	
    if((document.getElementById('inptClienteVenta').value == "CLIENTE OCASIONAL")|| (document.getElementById('inptClienteVenta').value == "")){
		ver_vetana_informativa("EL CLIENTE NO ES VÁLIDO")
		return
	}	
		 
	document.getElementById("divFinalizarVentaAcredito").style.display="";
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	if (inptTotalPagado!="0" && inptTotalPagado!="") {
	document.getElementById("btnConfCredito").style.display='none'
	}else{	
	AutoCompletarCamposCuotas()
	document.getElementById("btnConfCredito").style.display=''
	}	
		}else{
			var inptTotalPagado = document.getElementById('inptTotalPagado').value	
	if (inptTotalPagado!="0" && inptTotalPagado!="") {
	return
	}
	document.getElementById('inptTotalVentaTerminar').value=document.getElementById('inptTotalVenta').value
	document.getElementById('inptDescuentoVentaTerminar').value="0"
	document.getElementById('inptMontoVentaTerminarEfectivo').value=document.getElementById('inptTotalVenta').value;
	document.getElementById('inptVueltoVentaTerminar').value="0"
	document.getElementById('inptMontoVentaTerminarTarjeta').value="0"
	 
		document.getElementById("divFinalizarVentaAContado").style.display="";	
			document.getElementById('inptMontoVentaTerminarEfectivo').focus()			
			$("#inptMontoVentaTerminarEfectivo").select();
		}
	}else{
		if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
		//document.getElementById("divFinalizarVentaAcredito").style.display="none";
		 
	$("div[id=divFinalizarVentaAcredito]").fadeOut(500);	
		}else{
		//document.getElementById("divFinalizarVentaAContado").style.display="none";
		 
	$("div[id=divFinalizarVentaAContado]").fadeOut(500);	
		}
		
	}
}
function AutoCompletarCamposCuotas(){
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	if(DatosAutoCompleteCredito[0]!=undefined && (inptTotalPagado=="0" || inptTotalPagado=="")){
	document.getElementById("inptEntregaConfCredito").value= document.getElementById("inptEntregaVenta").value;
	document.getElementById("inptConfirmarPagoEntrega").value="SI";
	document.getElementById("inputSelectMetodoConfCredito").value="Mensual";
	document.getElementById("inptNroCuotasConfCredito").value=DatosAutoCompleteCredito[0];
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaInicioConfCredito').value = f.getFullYear() + "-" + mes + "-" + dia;
	// SeleccEntregaInicial(document.getElementById("inptConfirmarPagoEntrega"))
	
	var saldo =  QuitarSeparadorMilValor(document.getElementById('inptSaldoConfCredito').value);
		var t=Number(saldo)
		var c = document.getElementById('inptNroCuotasConfCredito').value
		
		//AAAAAA
		var montoCuota = Math.round(t / c);
		
			montoCuota= montoCuota/1000;
						
			montoCuota = Math.ceil(montoCuota);
						
			montoCuota= montoCuota*1000;
		
		document.getElementById('inptMontoPagoConfCredito').value = montoCuota
		separadordemiles(document.getElementById('inptMontoPagoConfCredito'))
	
	
	}
}
function VerCerrarConfCredito(d){
		try {
	var inptTotalPagado = QuitarSeparadorMilValor(document.getElementById('inptTotalPagado').value)	
	if (inptTotalPagado > 0) {
		document.getElementById("inptSeleccTipoVenta").value=controltipoventa				
	if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
		document.getElementById("divConfCreditoVenta").style.display="";
		document.getElementById("btnVerCreditos").style.display="";
		document.getElementById("btnPagoAlContado").style.display="none";
	}else{
		var inptTotalVenta = QuitarSeparadorMilValor(document.getElementById('inptTotalVenta').value)
		document.getElementById("divConfCreditoVenta").style.display="none";
		if(inptTotalVenta==inptTotalPagado){
		document.getElementById("btnVerCreditos").style.display="none";
		document.getElementById("btnPagoAlContado").style.display="none";
		}else{
				document.getElementById("btnVerCreditos").style.display="none";
		document.getElementById("btnPagoAlContado").style.display="";
		}
	}
	
	}else{
		
		var inptTotalVenta = QuitarSeparadorMilValor(document.getElementById('inptTotalVenta').value)
		if (inptTotalVenta > 0) {
			if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
		document.getElementById("divConfCreditoVenta").style.display="";
		document.getElementById("btnVerCreditos").style.display="";
		document.getElementById("btnPagoAlContado").style.display="none";
	}else{
		document.getElementById("divConfCreditoVenta").style.display="none";
		document.getElementById("btnVerCreditos").style.display="none";
		document.getElementById("btnPagoAlContado").style.display="";
	}
		}else {
				document.getElementById("btnVerCreditos").style.display="none";
				document.getElementById("btnPagoAlContado").style.display="none";
		}
		
		}
		} catch (error) {
				document.getElementById("btnVerCreditos").style.display="none";
				document.getElementById("btnPagoAlContado").style.display="none";
		
			}
			
				if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
		document.getElementById("divConfCreditoVenta").style.display="";
	}else{
		document.getElementById("divConfCreditoVenta").style.display="none";
		
	}
}
function SeleccEntregaInicial(datos){	
	if(datos.value=="NO"){
	document.getElementById("inptEntregaConfCredito").value="0";
	document.getElementById("inptEntregaConfCredito").disabled=true
	calcular_cuota_desde_venta()
	}else{
	document.getElementById("inptEntregaConfCredito").value="0";
	calcular_cuota_desde_venta()
	document.getElementById("inptEntregaConfCredito").value=document.getElementById("inptMontoPagoConfCredito").value
	calcular_cuota_desde_venta()
	document.getElementById("inptEntregaConfCredito").disabled=false
	}
}
function calcular_cuota_desde_venta(datos) {
	
	if(parseInt(datos.value) > 100){
		ver_vetana_informativa("HA SOBREPASADO CANTIDAD MAXIMA DE CUOTAS")
		return;
	}
	
	var PrecioListaTotal=0
	var PorcentajeProducto=0
	
	var t = QuitarSeparadorMilValor(document.getElementById('inptTotalVenta').value);
	var c = QuitarSeparadorMilValor(document.getElementById('inptNroCuotasConfCredito').value);
	var e = QuitarSeparadorMilValor(document.getElementById('inptEntregaConfCredito').value);
	if (isNaN(t) || t=="" ) {
	 t = QuitarSeparadorMilValor(document.getElementById('inpTotalCostoVenta').value);
	}
	if (isNaN(e)) {
		document.getElementById('inptEntregaConfCredito').value = 0;	
		e = 0;
	}
	if (isNaN(c)) {
		document.getElementById('inptNroCuotasConfCredito').value = 1;
		document.getElementById('inptMontoPagoConfCredito').value = document.getElementById('inptTotalVenta').value;
		c = 0;
	}else{
		if(e>0){
		c=c;	
		}		
		if(c<0){
		c=1;
		}
	}
	var saldo =  QuitarSeparadorMilValor(document.getElementById('inptSaldoConfCredito').value);
	t=Number(saldo)
	var c = parseFloat(c);
	var t = parseFloat(t);
	document.getElementById('inptMontoPagoConfCredito').value = Math.round(t / c);
	separadordemiles(document.getElementById('inptMontoPagoConfCredito'))
	separadordemiles(document.getElementById('inptEntregaConfCredito'))
}

// let saldoGen = "";
function calcular_saldo_cuota(datos){
	let saldoGen = parseInt(QuitarSeparadorMilValor(document.getElementById('inptTotalVenta2').innerHTML))
	if(parseInt(QuitarSeparadorMilValor(datos.value)) > saldoGen){
		ver_vetana_informativa('LA ENTREGA NO PUEDE SER MAYOR AL SALDO');
		document.getElementById('inptEntregaConfCredito').value = 0;
		calcular_saldo_cuota(document.getElementById('inptEntregaConfCredito'));
		return;
	}
	
	document.getElementById('inptEntregaConfCredito').value = separadordemilesnumero(datos.value);
	if(datos.value ===''){
		return;
	}
	let entregaInicial = parseInt(QuitarSeparadorMilValor(datos.value));
	let nroCuotas = parseInt(document.getElementById('inptNroCuotasConfCredito').value)
	let montoCuota = 0;
	
	let saldo = saldoGen;
	saldo = saldo - entregaInicial;
	montoCuota = saldo / nroCuotas;
	
	document.getElementById('inptSaldoConfCredito').value = separadordemilesnumero(saldo);
	document.getElementById('inptMontoPagoConfCredito').value = separadordemilesnumero(redondearMiles(montoCuota));
}
function redondearMiles(numero) {
    // Redondear el número a miles
    let redondeado = Math.ceil(numero / 1000) * 1000;

    // Devolver el número con tres decimales
    return redondeado;
}
function crearcreditodesdeventa() {
	
	
	var inptNroCuotasConfCredito = document.getElementById('inptNroCuotasConfCredito').value
	var inptMontoPagoConfCredito = document.getElementById('inptMontoPagoConfCredito').value
	var inptFechaInicioConfCredito = document.getElementById('inptFechaInicioConfCredito').value
	var inputSelectMetodoConfCredito = document.getElementById('inputSelectMetodoConfCredito').value
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	var inptInteresConfCredito = document.getElementById('inptInteresConfCredito').value
	var inptDiasConfCredito = document.getElementById('inptDiasConfCredito').value
	var inptEntregaConfCredito = document.getElementById('inptEntregaConfCredito').value
	var inptConfirmarPagoEntrega = document.getElementById('inptConfirmarPagoEntrega').value
	if (inptTotalPagado > 0) {
	return false;
	}
	if (inptNroCuotasConfCredito <=0 || inptNroCuotasConfCredito>=150 || inptNroCuotasConfCredito=="Contado") {
		ver_vetana_informativa("FAVOR VERIFICAR EL NUMERO DE CUOTAS")
		return false;
	}
	if (inptNroCuotasConfCredito == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE CUOTA")
		return false;
	}
	if (inptMontoPagoConfCredito == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DE PAGO")
		return false;
	}
	if (inptFechaInicioConfCredito == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO DE PAGO")
		return false;
	}
	if (inputSelectMetodoConfCredito == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL METODO DE PAGO")
		return false;
	}
	if (inptInteresConfCredito == "") {
		ver_vetana_informativa("FALTO INGRESAR EL INTERES DE PAGO")
		return false;
	}
	if (inptDiasConfCredito == "") {
		ver_vetana_informativa("FALTO INGRESAR LOS DIAS DE GRACIA")
		return false;
	}
	if(idabmVenta==""){
		verificarcamposdetallesventacredito()
		return
	}
    abmcreditosVenta(inptConfirmarPagoEntrega,inptNroCuotasConfCredito, inptMontoPagoConfCredito, inptFechaInicioConfCredito, inputSelectMetodoConfCredito, inptInteresConfCredito, inptDiasConfCredito, inptEntregaConfCredito, idabmVenta);
}

function obtenerFechaActual() {

	
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	return f.getFullYear() + "-" + mes + "-" + dia;
}

function validarFechaPago() {
    const fechaPagoInput = document.getElementById("inptFechaInicioConfCredito").value;

    // Parseo manual para evitar la conversión horaria
    const [year, month, day] = fechaPagoInput.split('-');
    const fechaPago = new Date(year, month - 1, day);

    // Fecha actual con hora de Paraguay
    const hoy = new Date(
        new Intl.DateTimeFormat('es-PY', {
            timeZone: 'America/Asuncion',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date())
        .split('/')
        .reverse()
        .join('-')
    );

    hoy.setHours(0, 0, 0, 0);
    fechaPago.setHours(0, 0, 0, 0);

    // alert("Fecha ingresada: " + fechaPago.toISOString().split('T')[0]);

    if (fechaPago < hoy) {
        ver_vetana_informativa("NO SE PERMITE INGRESAR UNA FECHA MENOR A HOY");
        document.getElementById("inptFechaInicioConfCredito").value = obtenerFechaActual();
        return false;
    }

    const fechaMaxima = new Date(hoy);
    fechaMaxima.setDate(fechaMaxima.getDate() + 90);

    if (fechaPago > fechaMaxima) {
        ver_vetana_informativa("NO SE PERMITE INGRESAR UNA FECHA MAYOR A 60 DÍAS DESDE HOY");
        document.getElementById("inptFechaInicioConfCredito").value = obtenerFechaActual();
        return false;
    }

    const diaDelMes = fechaPago.getDate();
    if (diaDelMes > 16) {
        ver_vetana_informativa("DEBE INGRESAR UNA FECHA QUE NO SUPERE EL DÍA 15 DEL MES");
        document.getElementById("inptFechaInicioConfCredito").value = obtenerFechaActual();
        return false;
    }
}

function abmcreditosVenta(pagoentrega,nroCuota, Monto, iniciopago, metodopago, interes, dias, entrega, cod_venta) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "nuevodesdeventa")
	datos.append("cod_venta", cod_venta)
	datos.append("Monto", Monto)
	datos.append("metodopago", metodopago)
	datos.append("iniciopago", iniciopago)
	datos.append("nroCuota", nroCuota)
	datos.append("dias", dias)
	datos.append("interes", interes)
	datos.append("entrega", entrega)
	datos.append("pagoentrega", pagoentrega)
	datos.append("idGaranteFk", idGaranteFk)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
								
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
				   DatosAutoCompleteCredito=new Array();
					document.getElementById("inptEntregaConfCredito").value = datos[17]
					document.getElementById("inptNroCuotasConfCredito").value = datos[19]
					PlazoRecibo = datos[19]
					document.getElementById("inptMontoPagoConfCredito").value = datos[23]
					document.getElementById("inptFechaInicioConfCredito").value = datos[16]
					document.getElementById("inptInteresConfCredito").value = datos[21]
					document.getElementById("inptDiasConfCredito").value = datos[20]
					document.getElementById("inputSelectMetodoConfCredito").value = datos[22]
					document.getElementById("inptTotalPagado").value = datos[27]
					document.getElementById("inptConfirmarNroFactura").value = document.getElementById("inptNroVenta").value	
					//totalesRecibo = datos[23]
					InteresRecibo = datos[24]
					DeudaActualRecibo = datos[25]
					DiasAtrasado = datos[26]
					CuotasRestante = datos[28]
					if(datos[27]!="0"){
						document.getElementById("btnConfCredito").style.display="none"
					}
					 if(document.getElementById("inptSeleccTipoComprobanteVenta").value=="FACTURA"){  
					 document.getElementById("inptSeleccPuntoExpedicionConfirmarNro").value=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
					 document.getElementById("inptConfirmarNroFactura").value=document.getElementById("inptNroVenta").value
					 document.getElementById("divOpcionesImpresion").style.display=""
					 document.getElementById("divConfirmarNroDeFactura").style.display=""
					 // document.getElementById("btnImprimirticket").style.display=""
					 document.getElementById("btnImprimirFactura").style.display=""
					 document.getElementById("btnImprimirPagare").style.display=""
					 var tipo=document.getElementById("inptSeleccTipoComprobanteVenta").value
					 var caja=document.getElementById("pCaja").innerHTML
					 var subtotal=document.getElementById("inptSubTotalVenta").value
					 var descuento=document.getElementById("inptTotalDescuento").value
					 var totalpagado=document.getElementById("inptTotalPagado").value
					 var interespagado="0"
					 var totalInteres="0"
					 var saldointeres="0"
					 EntregaPagare=document.getElementById("inptEntregaVenta").value;
					 guardarendriverimpresion(cod_venta, tipo,"pendiente", caja, cod_localFKUSer, DiasAtrasado, subtotal,descuento,totalpagado,interespagado,totalInteres,saldointeres,DeudaActualRecibo,CuotasRestante,Monto,"0",userid) 
     					verCerrarConfigCredito("")
					 }else{ 
					 EntregaPagare=document.getElementById("inptEntregaVenta").value;
					 document.getElementById("divOpcionesImpresion").style.display=""
					 // document.getElementById("btnImprimirticket").style.display=""
					 // document.getElementById("btnImprimirFactura").style.display="none"
					 document.getElementById("btnImprimirPagare").style.display=""
					 var tipo=document.getElementById("inptSeleccTipoComprobanteVenta").value
					 var caja=document.getElementById("pCaja").innerHTML
					 var subtotal=document.getElementById("inptSubTotalVenta").value
					 var descuento=document.getElementById("inptTotalDescuento").value
					 var totalpagado=document.getElementById("inptTotalPagado").value
					 var interespagado="0"
					 var totalInteres="0"
					 var saldointeres="0"
					 guardarendriverimpresion(cod_venta, tipo,"pendiente", caja, cod_localFKUSer, DiasAtrasado, subtotal,descuento,totalpagado,interespagado,totalInteres,saldointeres,DeudaActualRecibo,CuotasRestante,Monto,"0",userid) 
					 verCerrarConfigCredito("")
					 }
					 buscardetallesventa()
					 if(document.getElementById("inptConfirmarPagoEntrega").value=="SI"){
						 vercerrarpagos("1")
					 }					 
					 return false;

				}
				try {
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function vercerrarOpcionesImpresion(d) {
	
	var tipoventa=document.getElementById("inptSeleccTipoComprobanteVenta").value
	
	if(tipoventa=="FACTURA"){
		// document.getElementById('btnTicket').style.display = "none"
		// document.getElementById("btnfactura").style.display=""
	}else{
		// document.getElementById('btnTicket').style.display = ""
		// document.getElementById('btnfactura').style.display = "none"
	}
	if (d == "1") {
		if(idabmVenta==""){
			return;
		}
		$("div[id=divOpcionesImpresion]").fadeIn(250)
	} else {
		$("div[id=divOpcionesImpresion]").fadeOut(250)		
	}
}
function vercerrarConfirmarNroFactura(d) {
	if (d == "1") {
		$("div[id=divConfirmarNroDeFactura]").fadeIn(250)
	} else {
		$("div[id=divConfirmarNroDeFactura]").fadeOut(250)
	}
}
function ActualizarNroFacturaVenta() {
    var puntoexpedicion=document.getElementById("inptSeleccPuntoExpedicionConfirmarNro").value
    var nrofactura=document.getElementById("inptConfirmarNroFactura").value	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "actualizarnrofactura")
	datos.append("cod_venta", idFkVenta)
	datos.append("puntoexpedicion", puntoexpedicion)
	datos.append("nrofactura", nrofactura)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		  
		
		success: function (responseText) {
			verCerrarEfectoCargando("")
			Respuesta = responseText;
			console.log(Respuesta)
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
try {

					 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					
					
					 document.getElementById("divConfirmarNroDeFactura").style.display="none"
					 
ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE")
		return false;

				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function verificarcamposventa() {
	var inptFechaVenta = document.getElementById('inptFechaVenta').value
	var inptClienteVenta = document.getElementById('inptClienteVenta').value
	var inptSeleccTipoVenta = document.getElementById('inptSeleccTipoVenta').value
	var inptComisionVentaCobrador = document.getElementById('inptComisionVentaCobrador').value
	var inptCobradorVenta = document.getElementById('inptCobradorVenta').value
	var inpCodVenta = document.getElementById('inpCodVenta').value
	var inptlocalVenta = document.getElementById('inptlocalVenta').value
var inptSeleccTipoComprobanteVenta = document.getElementById('inptSeleccTipoComprobanteVenta').value
	var inptSeleccPuntoExpedicionVenta = $("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	var nrocaja = document.getElementById('pCaja').innerHTML
	if (inpCodVenta == "") {
		document.getElementById('inpCodVenta').value = "";
		document.getElementById('inptNroVenta').value = "";
		inpCodVenta = "";
	}
	if (nrocaja == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA CAJA")
		return false;
	}
	if (inptFechaVenta == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA FECHA")
		return false;
	}
	if (inptComisionVentaCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR LA COMISIÓN DEL COBRADOR")
		return false;
	}
	if (idFkCliente == "") {
		idFkCliente = "7";
	}
	if (inptCobradorVenta == "") {
		idFkCobrador = "9";
		cobradorcredito = "9";
	}
	var accion = "";
	if (idabmVenta != "") {
		accion = "editar";
		if(controlacceso("INSERTARVENTA","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARVENTA","accion")==false){return;}
	}
	abmventa(nrocaja,inptSeleccPuntoExpedicionVenta,inptSeleccTipoComprobanteVenta,idGaranteFk,inptFechaVenta, inptSeleccTipoVenta, inpCodVenta, idFkCliente, idFkCobrador, idabmVenta, "Corrido", idFkVendedor1, idFkVendedor2, inptComisionVentaCobrador, inptlocalVenta, accion);
}
function abmventa(caja,puntoexpedicion,tipo_comprobante,idGaranteFk,fecha_venta, TipoVenta, num_factura, cod_clienteFK, cod_cobradorFK, cod_venta, TipoPago, idFkVendedor1, idFkVendedor2, comision, cod_local, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_venta", cod_venta)
	datos.append("fecha_venta", fecha_venta)
	datos.append("cod_usuarioFK", userid)
	datos.append("cod_clienteFK", cod_clienteFK)
	datos.append("num_factura", num_factura)
	datos.append("cod_cobradorFK", cod_cobradorFK)
	datos.append("TipoVenta", TipoVenta)
	datos.append("TipoPago", TipoPago)
	datos.append("vendedor1", idFkVendedor1)
	datos.append("vendedor2", idFkVendedor2)
	datos.append("comision", comision)
	datos.append("cod_local", cod_local)
	datos.append("idGaranteFk", idGaranteFk)
	datos.append("tipo_comprobante", tipo_comprobante)
	datos.append("puntoexpedicion", puntoexpedicion)
	datos.append("caja", caja)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		 
		
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
					idabmVenta = datos["2"]
					idFkVenta = datos["2"]
					document.getElementById('inpCodVenta').disabled = true
					document.getElementById('inpCodVenta').className = "inputTextDisable"
					buscardetallesventa()
					document.getElementById('btnAbmVenta').style.display = ""
					document.getElementById('btnAbmVenta').value = "Editar datos"
					if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
						//crearcreditodesdeventa()
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
function vercerrarvistaventas(d) {
	if (d == "1") {
		var vistaVentas = document.getElementById("divVistaVentas")
		if (!vistaVentas) {
			ver_vetana_informativa("NO SE PUDO ABRIR EL BUSCADOR DE VENTAS")
			return
		}
		vistaVentas.style.display=""
		setTimeout(function () {
			var campoBuscarVenta = document.getElementById('inptBuscarVistaVentas')
			if (campoBuscarVenta) campoBuscarVenta.focus()
		}, 0)
  
	} else {
 document.getElementById('inptBuscarVistaVentas').value=""
document.getElementById("table_vista_ventas").innerHTML = ""
 
		$("div[id=divVistaVentas]").fadeOut(500)
	}
}
function buscarvistaventa() {
	var buscar = document.getElementById('inptBuscarVistaVentas').value
	var filtro = document.getElementById('inptOpcionesdeBusquedaVenta').value	
	document.getElementById("table_vista_ventas").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscar,
		"filtro": filtro,
		"funt": "historialvistaventa"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_ventas").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_ventas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
					var datos_buscados = datos[2];
					document.getElementById("table_vista_ventas").innerHTML = datos_buscados
				
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function obtenerdatosvistaventa(datostr) {
	limpiarcamposventa("1")
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idabmVenta = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptFechaVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptClienteVenta').value = $(datostr).children('td[id="td_datos_2"]').html();
	controltipoventa = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptSeleccTipoVenta').value = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptVendedorVenta1').value = $(datostr).children('td[id="td_datos_15"]').html();
	document.getElementById('inptVendedorVenta2').value = $(datostr).children('td[id="td_datos_16"]').html();
	document.getElementById('inptCobradorVenta').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptCobradorCargarPago').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inpCodVenta').value = $(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptNroVenta').value = $(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptSeleccPuntoExpedicionVenta').value = $(datostr).children('td[id="td_datos_33"]').html();
	document.getElementById('inptAccesoCreditoVentaCliente').value =  $(datostr).children('td[id="td_datos_34"]').html();
	document.getElementById('inptEntregaVenta').value =  $(datostr).children('td[id="td_datos_35"]').html();
	
	EntregaPagare =  $(datostr).children('td[id="td_datos_35"]').html();
	var puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	if(puntoExpedicion==""){						
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+$(datostr).children('td[id="td_datos_13"]').html()+"*";
	}else{
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+puntoExpedicion+"-"+$(datostr).children('td[id="td_datos_13"]').html()+"*";
	}

	document.getElementById('inptComisionVentaCobrador').value = $(datostr).children('td[id="td_datos_22"]').html();
	document.getElementById('inptlocalVenta').value = $(datostr).children('td[id="td_datos_23"]').html();
	document.getElementById('inptGaranteVenta').value = $(datostr).children('td[id="td_datos_31"]').html();
	document.getElementById('inptSeleccTipoComprobanteVenta').value = $(datostr).children('td[id="td_datos_32"]').html();
	
	if(document.getElementById('inptSeleccTipoComprobanteVenta').value=="FACTURA"){
					// document.getElementById("btnImprimirticket").style.display=""
					 document.getElementById("btnImprimirFactura").style.display=""
					 document.getElementById("btnImprimirPagare").style.display=""
	}else{
		// document.getElementById("btnImprimirticket").style.display=""
					 // document.getElementById("btnImprimirFactura").style.display="none"
					 document.getElementById("btnImprimirPagare").style.display=""
	}
	
	if(document.getElementById("inptSeleccTipoVenta").value=="CONTADO"){
	buscarImprimirTicketVentaContado();
	}
	idGaranteFk = $(datostr).children('td[id="td_datos_30"]').html();
	idFkVendedor1 = $(datostr).children('td[id="td_datos_3"]').html();
	idFkVendedor2 = $(datostr).children('td[id="td_datos_14"]').html();
	idFkCliente = $(datostr).children('td[id="td_datos_10"]').html();
	idFkCobrador = $(datostr).children('td[id="td_datos_11"]').html();
	cobradorcargarpagos = $(datostr).children('td[id="td_datos_11"]').html();
	
	idFkVenta = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inpCodVenta').disabled = true
	document.getElementById('inpCodVenta').className = "inputTextDisable"
	document.getElementById('btnAbmVenta').style.display = ""
	document.getElementById('btnAbmVenta').value = "Editar datos"
	buscardetallesventa()
   document.getElementById("divVistaVentas").style.display='none'
   document.getElementById("btnMasInfoClienteVenta").style.display='none'
document.getElementById("btnNuevoClienteVenta").style.display=''
document.getElementById("tdImprimirVenta").style.display=''
SeleccTipoComprobanteVenta()
}

var cantidaDetalleSelec = "";
var codproductodetalleSelect = "";
function obtenerdatosabmdetalleventa(datostr) {


	// $("tr[id=tbSelecRegistro]").each(function (i, td) {
		// td.className = ''

	// });

	// datostr.className = 'tableRegistroSelec'
	// document.getElementById('inptCodDetalle').value = $(datostr).children('td[id="td_id_2"]').html();
	// document.getElementById('inptNombreProductoDetalleOpcion').value = $(datostr).children('td[id="td_datos_1"]').html();
	// idDetalleVenta = $(datostr).children('td[id="td_id_2"]').html();
	// cantidaDetalleSelec = $(datostr).children('td[id="td_datos_4"]').html();
	// codproductodetalleSelect = $(datostr).children('td[id="td_id_1"]').html();
	// vercerrarOpcionesDetalles("1")



}
function vercerrarOpcionesDetalles(d) {


	if (d == "1") {
		$("div[id=divOpcionesDetalles]").fadeIn(250)

	} else {
		$("div[id=divOpcionesDetalles]").fadeOut(250)
	}


}
function eliminardetalleventa() {
	var inptTotalPagado = document.getElementById('inptTotalPagado').value
	if (inptTotalPagado > 0) {
		ver_vetana_informativa("NO SE PUEDE EDITAR EL DETALLE A LA VENTA POR QUE ESTE YA CUENTA CON UN PAGO")
		return false;
	}
	if (idDetalleVenta == "") {
		ver_vetana_informativa("FALTO SELCCIONAR UN REGITRO")
		return false;
	}
	var operacion=document.getElementById("inptOpcionesDetallesVentaEliminar").value;
	var motivo=document.getElementById("inptMotivoDetallesVentaEliminar").value;
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "eliminar")
	datos.append("cod_detalle", idDetalleVenta)
	datos.append("cod_ventaFK", idabmVenta)
	datos.append("cantida", cantidaDetalleSelec)
	datos.append("codProducto", codproductodetalleSelect)
	datos.append("operacion_stock", operacion)
	datos.append("motivo", motivo)
	datos.append("Local_FK", cod_localFKUSer)
	var OpAjax = $.ajax({

		data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
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

					document.getElementById("divOpcionesDetalles").style.display = "none"
					buscardetallesventa()


				}
				else {


					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")


				}

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
			}


		}
	});


}


/*ENTREGA COBRADOR*/
function verCerrarEntregaCobrador(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divEntregaCobrador").style.display==""){
		//document.getElementById("divEntregaCobrador").style.display="none"
		document.getElementById("divMinimizadoEntregaCobrador").style.display='none'
 
	$("div[id=divEntregaCobrador]").fadeOut(500);	
		limpiarcamposhistorialventa()
	}else{
       if(controlacceso("ENTREGACOBRADOR","accion")==false){	   
	   //SIN PERMISO
	   return;
		}
		document.getElementById("divEntregaCobrador").style.display=""
			 
	}
}
function minimizarEntregaCobrador(){
	//document.getElementById("divEntregaCobrador").style.display='none'
	document.getElementById("divMinimizadoEntregaCobrador").style.display=''
 
	$("div[id=divEntregaCobrador]").fadeOut(500);
}
/*PAGOS AL CONTADO*/
function calcularVuelto(){
	var totalventa = QuitarSeparadorMilValor(document.getElementById('inptTotalVentaTerminar').value);
	var totaldescuento = QuitarSeparadorMilValor(document.getElementById('inptDescuentoVentaTerminar').value);
	var inptMontoVentaTerminarEfectivo = QuitarSeparadorMilValor(document.getElementById('inptMontoVentaTerminarEfectivo').value);
	console.log(inptMontoVentaTerminarEfectivo)
	if (isNaN(totalventa)) {
       ver_vetana_informativa("ERROR, TOTAL INVALIDO")
		return 
	}
	if (isNaN(totaldescuento)) {
		document.getElementById('inptDescuentoVentaTerminar').value = 0;
		totaldescuento = 0;
	}
	if (isNaN(inptMontoVentaTerminarEfectivo)) {
		document.getElementById('inptMontoVentaTerminarEfectivo').value = 0;
		inptMontoVentaTerminarEfectivo = 0;
	}
	var m = parseFloat(inptMontoVentaTerminarEfectivo);
	var d = parseFloat(totaldescuento);
	var t = parseFloat(totalventa);
	if(m<=0){
		ver_vetana_informativa("ERROR, MONTO INVALIDO")
		return 
	}
	var v=(m+d)-t
	if(v<0){
		v=0;
	}
	document.getElementById('inptMontoVentaTerminarEfectivo').value=separadordemilesnumero(m);
	document.getElementById('inptDescuentoVentaTerminar').value=separadordemilesnumero(d);
	document.getElementById('inptVueltoVentaTerminar').value=separadordemilesnumero(v);
}
function abmconfirmarPagoContado() {
	if (idabmVenta == "") {
		ver_vetana_informativa("FALTO INICIAR LA VENTA")
		return
	}
	if (document.getElementById("inptSeleccTipoVenta").value != "CONTADO") {
		ver_vetana_informativa("SOLO LAS VENTAS A CONTADO PUEDEN REALIZAR ESTA ACCION")
		return false;
	}
	if (document.getElementById("inptTotalPagado").value != "0") {
		if (document.getElementById("inptTotalPagado").value != "") {
			ver_vetana_informativa("ESTA VENTA YA CUENTA CON UN PAGO")
			return false;
		}
	} 
    var monto=QuitarSeparadorMilValor(document.getElementById("inptMontoVentaTerminarEfectivo").value)
	var montotarjerta=QuitarSeparadorMilValor(document.getElementById("inptMontoVentaTerminarTarjeta").value)
	var descuento=QuitarSeparadorMilValor(document.getElementById("inptDescuentoVentaTerminar").value)
	var total=QuitarSeparadorMilValor(document.getElementById("inptTotalVentaTerminar").value)
    
	if(Number(montotarjerta)>0){
		if(Number(monto)>Number(total)){
			ver_vetana_informativa("EL MONTO EN TARJETA ES INCORRECTO")
			return false;				
		}
		if((Number(monto)+Number(montotarjerta))>Number(total)-Number(descuento)){
			ver_vetana_informativa("EL MONTO EN TARJETA O EN EFECTIVO ES INCORRECTO")
			return false;				
		}
	}
	
	
	var monto=document.getElementById("inptMontoVentaTerminarEfectivo").value
	var montotarjerta=document.getElementById("inptMontoVentaTerminarTarjeta").value
	var descuento=document.getElementById("inptDescuentoVentaTerminar").value
		var vuelto=document.getElementById("inptVueltoVentaTerminar").value
   var m=QuitarSeparadorMilValor(monto);
	 var d=QuitarSeparadorMilValor(descuento);
	 var t=QuitarSeparadorMilValor(total);
	 var v=QuitarSeparadorMilValor(vuelto);
	 if(Number(v)>0){
		 t=Number(m)-Number(v);
		monto=separadordemilesnumero(t)
	 }
   
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "pagocontado")
	datos.append("cod_venta", idabmVenta)
	datos.append("descuento", descuento)
	datos.append("monto", monto)
	datos.append("montotarjerta", montotarjerta)
    datos.append("codcaja", cajapredeterminada)
    datos.append("codApertura", idabmAperturacierrecaja)



	var OpAjax = $.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
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
				   
					
					document.getElementById('inptTotalPagado').value = datos["2"];
	paginaticket=datos["3"];
	CuotasNro= datos["4"];
		PlazoRecibo="1"
		document.getElementById("divFinalizarVentaAContado").style.display="none"
		document.getElementById("btnFinalizarVenta").value="Añadir Pago (No Disponible)"
		   
		    var tipo=document.getElementById("inptSeleccTipoComprobanteVenta").value
						 var caja=document.getElementById("pCaja").innerHTML
						 var subtotal=document.getElementById("inptTotalVenta2").innerHTML
						 var descuento=document.getElementById("inptTotalDescuento").value
						 var totalpagado=document.getElementById("inptMontoVentaTerminarEfectivo").value
						 var interespagado="0"
						 var totalInteres="0"
						 var saldointeres="0"
						 var DeudaActualRecibo="0"
						 DiasAtrasado="0"
						 var PuntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
var NroVentas=document.getElementById("inptNroVenta").value;
if(PuntoExpedicion!=""){
NroVentas=PuntoExpedicion+"-"+NroVentas
}
 

					if(document.getElementById("inptSeleccTipoVenta").value=="CONTADO"){
						buscarImprimirTicketVentaContado();
						document.getElementById("divOpcionesImpresion").style.display=""
					}
		   
		   
		     if(document.getElementById("inptSeleccTipoComprobanteVenta").value=="FACTURA"){  
					document.getElementById("inptSeleccPuntoExpedicionConfirmarNro").value=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
					document.getElementById("inptConfirmarNroFactura").value=document.getElementById("inptNroVenta").value
					// document.getElementById("divOpcionesImpresion").style.display="none"
					document.getElementById("divConfirmarNroDeFactura").style.display=""
					ImprimirFacrtura1()
					limpiarcamposventa()
					 }else{
					 limpiarcamposventa()
					 }
					
					 
					 document.getElementById("divVueltoVentaAContado").style.display="";
                      
				}

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function verCerrarUltimoVuelto(d){
	if(d=="1"){
			 document.getElementById("divVueltoVentaAContado").style.display="";
  
	}else{
		  
$("div[id=divVueltoVentaAContado]").fadeOut(500);	
	}
}
/*PAGOS A CREDITO*/
function vercerrarpagos(d,c) {
	if (d == "1") {		
    if(controlacceso("VERPAGOSCREDITO","accion")==false){return;}
		if (idabmVenta == "") {
			ver_vetana_informativa("FALTO INICIAR UNA VENTA")
			return false;
		}		
		if (document.getElementById("inptSeleccTipoVenta").value == "CONTADO") {
		ver_vetana_informativa("SOLO LAS VENTAS A CREDITO PUEDEN REALIZAR ESTA ACCION")
		return false;
	}
	
		
		document.getElementById("divAbmOpcionesPagos").style.display=""
		  
		document.getElementById("tdOpcionesVolverAtrasPagos").style.display=""
		document.getElementById("inpCodVentaPagos").value = document.getElementById("inpCodVenta").value
		document.getElementById("inptTotalVentaPagos").value = document.getElementById("inptTotalVenta").value
		document.getElementById("inptTotalVentaPagosb").value = ""
		buscarDatosOpcionesPagos()
		buscarcreditos()
	} else {		
if(c=="0"){	
totalAPagar_cuenta_cobrar = 0;
document.getElementById('inptTotalSeleccAPagar').value = 0			
			limpiarcamposventa()
		}		
		 
		$("div[id=divAbmOpcionesPagos]").fadeOut(500)
	}
	}
function buscarDatosOpcionesPagos() {

	verCerrarEfectoCargando("1")
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkVenta,
		"funt": "buscardatoscuenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			verCerrarEfectoCargando("2")
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("2")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					cuotaNro = datos[5];
					montoapagarcuota = datos[3];
					iniciopagocuota = datos[2];
					MetodoPago = datos[4];
					document.getElementById("inptNroCuotasPagos").value = cuotaNro
					document.getElementById("inptMontoPagoOpciones").value = montoapagarcuota
					document.getElementById("inptFechaInicioPapo").value = iniciopagocuota
					document.getElementById("inputSelectMetodo").value = MetodoPago
					document.getElementById("inptDiasGraciaPapo").value = datos[6]
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



let nombreClienteImprimir="";
let NroVentaClienteImprimir="";
let DetalleVentaClienteImprimir="";
let TipoVentaClienteImprimir="";
let FechaClienteImprimir="";

function valorSeguroTablaCredito(valor){
	return valor === null || typeof valor === "undefined" ? "" : String(valor);
}

function crearTablaFilaCredito(clase){
	var tabla = document.createElement("table");
	tabla.className = clase === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	tabla.appendChild(fila);
	return { tabla: tabla, fila: fila };
}

function agregarCeldaTablaCredito(fila, id, valor, ancho, oculta){
	var celda = document.createElement("td");
	if(id){ celda.id = id; }
	if(ancho){ celda.style.width = ancho; }
	if(oculta){ celda.style.display = "none"; }
	celda.textContent = valorSeguroTablaCredito(valor);
	fila.appendChild(celda);
	return celda;
}

function crearInputTablaCredito(tipo, id, nombre, valor, clase, deshabilitado){
	var input = document.createElement("input");
	input.type = tipo;
	if(id){ input.id = id; }
	if(nombre){ input.name = nombre; }
	input.value = valorSeguroTablaCredito(valor);
	input.className = clase || "inputText";
	input.disabled = !!deshabilitado;
	return input;
}

function aplicarEstadoFilaCredito(fila, estadoVisual, estiloFila){
	if(estadoVisual === "cancelado" || (estiloFila || "").indexOf("line-through") !== -1){
		fila.style.textDecoration = "line-through";
	}else if(estadoVisual === "pagado" || (estiloFila || "").indexOf("#4caf50") !== -1){
		fila.style.backgroundColor = "#4caf50";
		fila.style.color = "#fff";
	}else if(estadoVisual === "vencido" || (estiloFila || "").indexOf("#df4444") !== -1){
		fila.style.backgroundColor = "#df4444";
		fila.style.color = "#fff";
	}else if(estadoVisual === "resaltado" || (estiloFila || "").indexOf("background-color") !== -1){
		fila.style.backgroundColor = "#ccc";
		fila.style.color = "#000";
	}
}

function renderCreditosEditar(registros){
	var contenedor = document.getElementById("table_abm_opciones_creditareditados");
	if(!contenedor || !Array.isArray(registros)){ return; }
	contenedor.textContent = "";
	var fragmento = document.createDocumentFragment();
	registros.forEach(function(registro){
		var tablaFila = crearTablaFilaCredito(registro.clase_fila);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.plazo, "10%", false);
		var fecha = crearInputTablaCredito("date", "inptDate_" + registro.id_credito, "", registro.fecha_pago, "inputText", registro.deshabilitado);
		agregarCeldaTablaCredito(tablaFila.fila, "", "", "20%", false).appendChild(fecha);
		var monto = crearInputTablaCredito("text", "inptMonto_" + registro.id_credito, "inptMontoCreditoEditar", registro.monto, "inputText", registro.deshabilitado);
		monto.onkeyup = function(){ separadordemiles(this); };
		agregarCeldaTablaCredito(tablaFila.fila, "", "", "20%", false).appendChild(monto);
		var descuento = crearInputTablaCredito("text", "inptDescuento_" + registro.id_credito, "inptDescuentoCreditoEditar", registro.descuento, "inputText", false);
		descuento.onkeyup = function(){ separadordemiles(this); };
		agregarCeldaTablaCredito(tablaFila.fila, "", "", "20%", false).appendChild(descuento);
		agregarCeldaTablaCredito(tablaFila.fila, "", "", "10%", false).appendChild(crearInputTablaCredito("text", "inptDias_" + registro.id_credito, "", registro.dias, "inputText", false));
		agregarCeldaTablaCredito(tablaFila.fila, "", "", "10%", false).appendChild(crearInputTablaCredito("text", "inptInteres_" + registro.id_credito, "", registro.interes, "inputText", false));
		var guardar = crearInputTablaCredito("button", valorSeguroTablaCredito(registro.id_credito), "", "Guardar", "btn4", false);
		guardar.style.backgroundColor = "#2196F3";
		guardar.onclick = function(){ EditarEsteCredito(this); };
		agregarCeldaTablaCredito(tablaFila.fila, "", "", "10%", false).appendChild(guardar);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderCreditosHistorialVenta(registros){
	var contenedor = document.getElementById("table_historial_venta_pagos");
	if(!contenedor || !Array.isArray(registros)){ return; }
	contenedor.textContent = "";
	var fragmento = document.createDocumentFragment();
	registros.forEach(function(registro){
		var tablaFila = crearTablaFilaCredito(registro.clase_fila);
		aplicarEstadoFilaCredito(tablaFila.fila, registro.estado_visual, "");
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.plazo, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.fecha_vencimiento, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.fecha_pago, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.monto, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.descuento, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.id_venta, "", true);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.total_pagado, "", true);
		agregarCeldaTablaCredito(tablaFila.fila, "td_datos_1", registro.total_interes, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.total_pagado, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.total, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.deuda_actual, "10%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}

function renderExpedienteCreditos(registros, pendientes){
	var idContenedor = pendientes ? "table_historial_expediente_pagos_pendientes" : "table_historial_expediente_pagos";
	var contenedor = document.getElementById(idContenedor);
	if(!contenedor || !Array.isArray(registros)){ return; }
	contenedor.textContent = "";
	var fragmento = document.createDocumentFragment();
	registros.forEach(function(registro){
		if(registro.mostrar_titulo_factura){
			var titulo = document.createElement("p");
			titulo.className = "ptituloZ";
			titulo.textContent = "Nro de Factura: " + valorSeguroTablaCredito(registro.numero_factura);
			fragmento.appendChild(titulo);
		}
		var tablaFila = crearTablaFilaCredito(registro.clase_fila);
		aplicarEstadoFilaCredito(tablaFila.fila, registro.cancelado ? "cancelado" : "", registro.estilo_fila || "");
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.plazo, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.fecha_vencimiento || registro.fecha_pago, "10%", false);
		if(!pendientes){ agregarCeldaTablaCredito(tablaFila.fila, "", registro.fecha_pago, "10%", false); }
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.monto_formateado || registro.monto, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.descuento_formateado || registro.descuento, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.total_interes_formateado || registro.total_interes, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.total_formateado || registro.total, "10%", false);
		if(pendientes){
			agregarCeldaTablaCredito(tablaFila.fila, "", registro.total_pagado_formateado || registro.total_pagado, "10%", false);
			agregarCeldaTablaCredito(tablaFila.fila, "", registro.deuda_actual_formateada || registro.deuda_actual, "10%", false);
		}
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.dias_atraso, "10%", false);
		agregarCeldaTablaCredito(tablaFila.fila, "", registro.cantidad_pagos, "10%", false);
		fragmento.appendChild(tablaFila.tabla);
	});
	contenedor.appendChild(fragmento);
}


function buscarcreditos() {
  if(controlacceso("VERPAGOSCREDITO","accion")==false){return;}
	document.getElementById("table_abm_opciones_pago").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkVenta,
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_opciones_pago").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_opciones_pago").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					paginaExtractoCuota = datos[12];
					document.getElementById("table_abm_opciones_pago").innerHTML = datos_buscados
					document.getElementById("inptTotalPagado").value = datos[3]
					document.getElementById("inptTotalPagadoOpcionesPago").value = datos[3]
					document.getElementById("inptDeudaActual").value = datos[4]
					document.getElementById('inptInteresPagoOpciones').value = datos[5]
					document.getElementById('inptTotalInteres').value = datos[7]
					document.getElementById('inptDiasAtrazadoCargarPago').value = datos[8]
					document.getElementById('inptEntregaPapo').value = datos[9]
					document.getElementById('inptTotalDescuentoOpcionesPago').value = datos[11]					
					document.getElementById('inptMontoCuotaPago').value = datos[15]
					document.getElementById('inptCuotasAtrazadoCargarPago').value = datos[14]
					document.getElementById('inptTotalinteresPago').value = datos[18]
					document.getElementById('inptSubtotalPago').value = datos[13]
					document.getElementById('inptTotalDeudaPago').value = datos[17]
					document.getElementById('inptDescuentoCargaPago').value = 0
					document.getElementById('inptMontoCargaPago').value = 0
					
					ImportePagare = datos[3]
					InteresRecibo=datos[19]
					DeudaActualRecibo=datos[17]
					TotalDescuentoRecibo=datos[11]	
					
					
					nombreClienteImprimir=datos[20]
					NroVentaClienteImprimir=datos[21]
					DetalleVentaClienteImprimir=datos[22]
					TipoVentaClienteImprimir=datos[23]
					FechaClienteImprimir=datos[24]
					
					
					
					if(datos[3]>0){
					document.getElementById("btnAbmGenerarCuotas").style.display='none'
					}else{
					document.getElementById("btnAbmGenerarCuotas").style.display=''
					}
					if(datos_buscados==""){
						document.getElementById("btnAbmGenerarCuotas").value='Generar Cuotas'
					}else{
						document.getElementById("btnAbmGenerarCuotas").value='Volver a generar Cuotas'
					}
					
					calcular_total_con_entrega()

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function verCerrarEditarCredito(d){
	if(d=="2"){
				var totalMonto=0;
    $("input[name=inptMontoCreditoEditar]").each(function (i, elemento) {
		var m=QuitarSeparadorMilValor(elemento.value)
		totalMonto=Number(totalMonto)+Number(m)
	});	
	var totalDescuento=0;

	var totalventa=document.getElementById("inptTotalVenta").value;
	totalventa=QuitarSeparadorMilValor(totalventa);
	var total =totalMonto-totalDescuento;	
    if(totalventa!=total){
	if(confirm("El total #"+total+"# no coincide con el total ventas #"+totalventa+"#, Continuar de todas formas")){
		
	}else{		
	return 	
	}
	} 
		  
		$("div[id=divEditarCredistos]").fadeOut(500);
		
	}else{		
	 if(controlacceso("EDITARCREDITO","accion")==false){return;}	
		document.getElementById("divEditarCredistos").style.display=""
		  
		buscarcreditosaeditar()
		
	}
}
function buscarcreditosaeditar() {
 if(controlacceso("EDITARCREDITO","accion")==false){return;}	
	document.getElementById("table_abm_opciones_creditareditados").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkVenta,
		"formato": "json",
		"funt": "buscarcreditoseditar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_opciones_creditareditados").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_opciones_creditareditados").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					var datos_buscados = datos[2];
                    renderCreditosEditar(datos_buscados)
					

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function EditarEsteCredito(datos) {	
	  if(controlacceso("EDITARCREDITO","accion")==false){return;}	
	var codCredito=datos.id
	var date=document.getElementById("inptDate_"+codCredito).value
	var monto=document.getElementById("inptMonto_"+codCredito).value
	var descuento=document.getElementById("inptDescuento_"+codCredito).value
	var dias=document.getElementById("inptDias_"+codCredito).value
	var interes=document.getElementById("inptInteres_"+codCredito).value
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editarestecredito")
	datos.append("codCredito", codCredito)
	datos.append("date", date)
	datos.append("monto", monto)
	datos.append("descuento", descuento)
	datos.append("dias", dias)
	datos.append("interes", interes)
		var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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
					buscarcreditos()
				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}



function vercerraropcionespagoCobrosRealizados(d) {
	if (d == "1") {
		
		document.getElementById("divOpcionesPagosCobrosRealizados").style.display=""
		  
	} else {
		 
		$("div[id=divOpcionesPagosCobrosRealizados]").fadeOut(250)
	}
}
function vercerraropcionespago(d) {
	if (d == "1") {
		
		document.getElementById("divOpcionesPagos").style.display=""
		  
	} else {
		 
		$("div[id=divOpcionesPagos]").fadeOut(250)
	}
}
var idAbmPago = "";
function obtenerdatosabmpagosopciones(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptCuotaNroOpcionespagos').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptMontoOpcionpagos').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptMotivoOpcionpagos').value = "";	
	codCredito = $(datostr).children('td[id="td_datos_1"]').html();
	// vercerraropcionespago("1")
}
function obtenerdatosabmpagosSinPermiso(datos){
	ver_vetana_informativa("ACCION NO PERMITIDO, FAVOR SELECCIONES UNA CUOTA ANTERIOR")
	
}
var nrofacturaaeliminar=""
function abmeliminarestepagocredito() {	
	 if(controlacceso("ELIMINARPAGOCREDITO","accion")==false){return;}		
	var motivo=document.getElementById("inptMotivoOpcionpagosCobrosRealizados").value
	var monto=document.getElementById("inptMontoOpcionpagosCobrosRealizados").value
	var cuota=document.getElementById("inptCuotaNroOpcionespagosCobrosRealizados").value
	if(motivo==""){
		ver_vetana_informativa("FALTO INGRESAR EL MOTIVO")
		return
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "eliminar")
	datos.append("motivo", motivo)
	datos.append("monto", monto)
	datos.append("cuota", cuota)
	datos.append("cod_creditoFK", codCreditoPagos)
	datos.append("idFkVenta", cod_ventaFKPago)
	datos.append("nrofactura", nrofacturaaeliminar)
	datos.append("cod_pago", idHistorialPago)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
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
					vercerraropcionespagoCobrosRealizados("2")
					buscararqueo2()
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}


function vercerrarhistorialdepago(d) {
	if (d == "1") {
		document.getElementById("divHistorialPagos").style.display=""
		  
		buscarhistorialdepagos();
	} else {
		  
		$("div[id=divHistorialPagos]").fadeOut(500)
	}
}
function buscarhistorialdepagos() {
	document.getElementById("table_historial_pagos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": codCredito,
		"funt": "buscarHistorial"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_pagos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_pagos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("table_historial_pagos").innerHTML = datos_buscados
					document.getElementById("intTotalPagado").value = datos[3]
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function abmeliminarestepagohistorial() {
	 if(controlacceso("ELIMINARPAGOCREDITO","accion")==false){		
	//SIN PERMISO
	  return;
		}
if(confirm("Estas Seguro que quieres eliminar este pago")){
	if (idHistorialPago == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "eliminarhistorialpago")
	datos.append("codPago", idHistorialPago)
	datos.append("codVenta", cod_ventaFKPago)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
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
					ver_vetana_informativa("PAGO ELIMINADO CORRECTAMENTE...")
					if(codCreditoRefin!=""){
					buscarcreditosRefin()
				   }
					idHistorialPago = "";
					buscarhistorialdepagos()
					buscarcreditos()
					vercerrarconfirmarpagos("")
					
					buscararqueo2();
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
var totalPagadoCuota=0;

var TotalPagarEsteCredito ="";
var montoCuotaSolicInteres = "";
function obtenerdatosabmpagos(datostr) {
	
	 if(idabmAperturacierrecaja==""){
		   ver_vetana_informativa("FALTO INICIAR UNA CAJA")
		   verCerrarVentanaAbmAperturaCierreCaja1()
		   return
	   }
	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	cuotasNro=$(datostr).children('td[id="td_datos_2"]').html();
		
	deudaActual = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptInteresAPagar').value = $(datostr).children('td[id="td_datos_20"]').html();
	document.getElementById('inptCuotaAPagar').value = $(datostr).children('td[id="td_datos_5"]').html();
	montoCuotaSolicInteres = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptMontoAPagar').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptMontoClienteAPagar').value = $(datostr).children('td[id="td_datos_6"]').html();
	TotalPagarEsteCredito = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptMontoTarjetaClienteAPagar').value = "0";
	document.getElementById('inptDescuentoAPagar').value = "0";
	totalPagadoCuota= $(datostr).children('td[id="td_datos_22"]').html();
	document.getElementById('inptDiasAtrazadoAPagar').value = $(datostr).children('td[id="td_datos_9"]').html();
	document.getElementById('inptFechaCuotaModificar').value = $(datostr).children('td[id="td_datos_3"]').html();//FRM EDITAR CUOTA
	document.getElementById('inptMontoMaximoAPagar').value = $(datostr).children('td[id="td_datos_6"]').html();
	
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaPagoConfirmar').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById('inptCobradorConfirmar').value = document.getElementById('inptCobradorVenta').value
	codCredito = $(datostr).children('td[id="td_datos_1"]').html();
	cobradorcredito = idFkCobrador;
	vercerrarconfirmarpagos("1")
	document.getElementById('inptMontoClienteAPagar').focus;
	comprobarSolicitudDescuentoInteres()
	document.getElementById('btnsolicdescuentointeres').disabled = false;
	
	}
function vercerrarconfirmarpagos(d) {
	
	document.getElementById('inptMontoCargoAdministrativo').value =""
	if (d == "1") {
			 if(controlacceso("INSERTARPAGOSCREDITO","accion")==false){return;}		
		cambiarCobradorCodEnPagos()
		document.getElementById("divConfirmarPago").style.display=""

	} else {
		document.getElementById("divConfirmarPago").style.display="none"
		 estadosolicituddescuentointeres = "";
		 document.getElementById('inptSeleccImprimirTicket1').checked = true; 
		 document.getElementById('inptSeleccImprimirTicket2').checked = false;
	}
}
var cobradorcargarpagos = "";
function cambiarCobradorCodEnPagos(){
	if(ControlCobradorUser!=0){		
	document.getElementById('inptCobradorCargarPago').value = document.getElementById("lblUser").innerHTML;
	document.getElementById('inptCobradorConfirmar').value = document.getElementById("lblUser").innerHTML;
	cobradorcargarpagos = CodCobradorUser;		
	cobradorcredito = CodCobradorUser;		
	}
}
var codCredito = "";
var cobradorcredito = "";
var controlInsercionPagos=false
function verificarConfirmaciondepago(omitirControlDeposito) {
	if(!verificarDepositosPagoGrilla("div_opciones_pago_credito", function(){ verificarConfirmaciondepago(); })){
		return;
	}
	let controlVerificarPagosCredito = contarPagosConMontoPorNombre("tdDetallePagoCreditoOffline"); 
	
	

	if(controlVerificarPagosCredito > 0){
	let totalaPagar = document.getElementById('inptTotalaPagarCredito').value;
	let totalPagado = document.getElementById('inpTotalPagadoCredito').value;
			totalaPagar = QuitarSeparadorMilValor(totalaPagar)
			totalPagado = QuitarSeparadorMilValor(totalPagado)
			
			
		if(Number(totalaPagar) > Number(totalPagado)){
		ver_vetana_informativa("FAVOR COMPLETAR LA TOTALIDAD DE LA VENTA EN OPCIONES DE PAGO");
		controlVerificarPagosCredito = 0;
		return;
		}
	}
	
   if(controlInsercionPagos==true){
	   ver_vetana_informativa("TIENES UN PAGO EN PROCESO AGUARDE UN MOMENTO")
	   return 
   }
   
    var inptMontoMaximoAPagar = document.getElementById('inptMontoMaximoAPagar').value
   
	var inptFechaPagoConfirmar = document.getElementById('inptFechaPagoConfirmar').value
	var inptInteresAPagar = document.getElementById('inptInteresAPagar').value
	var inptMontoAPagar = document.getElementById('inptMontoAPagar').value
	var MontoCobrado = document.getElementById('inptMontoClienteAPagar').value
	var inptSeleccNroRecibo = document.getElementById('inptSeleccNroRecibo').value
	var inptNroReciboAPagar = document.getElementById('inptNroReciboAPagar').value
	var inptDescuentoAPagar = document.getElementById('inptDescuentoAPagar').value
	var MontoTarjeta = document.getElementById('inptMontoTarjetaClienteAPagar').value
	
	var inptMontoCargoAdministrativo = document.getElementById('inptMontoCargoAdministrativo').value
	
	var montoc1 = QuitarSeparadorMilValor(MontoCobrado);
	var montoc2 = QuitarSeparadorMilValor(MontoTarjeta);
	var montoc3 = QuitarSeparadorMilValor(inptMontoMaximoAPagar);
	
	if(Number(montoc3)<(Number(montoc1)+Number(montoc2))){
		
	}
 
	
	if (MontoCobrado == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO A COBRAR")
		return false;
	}
	if (inptMontoAPagar == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO")
		return false;
	}
	if (inptFechaPagoConfirmar == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE PAGO")
		return false;
	}
	if (cobradorcredito == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	
	var imprimirOpcion = true;
	if(document.getElementById('inptSeleccImprimirTicket2').checked){
		imprimirOpcion = false;
	}
	
	let control = contarPagosConMontoPorNombre("tdDetallePagoCreditoOffline"); 

	 controlInsercionPagos=true
	if(control > 0){
		
		if(controlVerificarPagosCredito <= 0){
		ver_vetana_informativa("FALTA INGRESAR PAGOS");
		return;
		}
 
		
		abmcargaropcionespagoparcial(inptMontoCargoAdministrativo,MontoTarjeta,inptDescuentoAPagar, inptFechaPagoConfirmar, cobradorcredito, 1,inptNroReciboAPagar,imprimirOpcion, 1);
		 
		return;
	}
	
	
	
	abmconfirmarpago(inptMontoCargoAdministrativo,MontoTarjeta,inptMontoAPagar,inptDescuentoAPagar, inptFechaPagoConfirmar, cobradorcredito, codCredito, inptInteresAPagar, MontoCobrado,inptNroReciboAPagar,imprimirOpcion);
}

function checkImprimirTicket(d){
	document.getElementById('inptSeleccImprimirTicket1').checked = false;
	document.getElementById('inptSeleccImprimirTicket2').checked = false;
	
	if(d== "1"){
		document.getElementById('inptSeleccImprimirTicket1').checked = true;
	}else{
		document.getElementById('inptSeleccImprimirTicket2').checked = true;
	}
}

function abmconfirmarpago(CargoAdministrativo,MontoTarjeta,totalDeudaCuota, descuento,Fecha, cod_cobradorFK, cod_creditoFK, totalInteres, MontoCobrado,nrofactura,imprimirOpcion) {
 if(controlacceso("INSERTARPAGOSCREDITO","accion")==false){return;}	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "nuevo")
	datos.append("Fecha", Fecha)
	datos.append("totalDeudaCuota", totalDeudaCuota)
	datos.append("cod_creditoFK", cod_creditoFK)
	datos.append("cod_cobradorFK", cod_cobradorFK)
	datos.append("cod_venta", idFkVenta)
	datos.append("totalInteres", totalInteres)
	datos.append("MontoCobrado", MontoCobrado)
	datos.append("nrofactura", nrofactura)
	datos.append("descuento", descuento)
	datos.append("MontoTarjeta", MontoTarjeta)
	  datos.append("codcaja", cajapredeterminada)
    datos.append("codApertura", idabmAperturacierrecaja)
	datos.append("CargoAdministrativo", CargoAdministrativo)
	datos.append("cod_ClienteFKMora", cod_ClienteFKMora)
	datos.append("imprimirOpcion", imprimirOpcion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
			
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmconfirmarpago")
            controlInsercionPagos=false
			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("")
			Respuesta = responseText;
			console.log(Respuesta)
			controlInsercionPagos=false
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
try {
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					vercerrarconfirmarpagos("2")
					buscarcreditos()
deudaActual=datos["4"];
	
	
	paginaticket=datos["5"];
	
	NombreCliente=datos["6"];
	CiCliente=datos["7"];
	var nrofactura=datos["8"];
    var tipoventa=datos["9"];
    var interespagado=datos["11"];
    var deuda=datos["12"];
    var totalpagado=datos["13"];
    var totalDescuento=datos["14"];
    var totalventa=datos["3"];
    var TotalInteresActual=datos["15"];
    var deudaActualsininteres=datos["16"];
	var plazoRecibo=datos["17"];
	var plazoReciboTicket = datos["25"]
	
	var FechaPago=datos["18"];
	
	var Fecha_Venta=datos["20"];
	var Nro_FacturaVenta=datos["19"];
     
	pagado=MontoCobrado;
	
    document.getElementById("table_cuentas_a_cobrar").innerHTML="";
	document.getElementById('inptMontoCargoAdministrativo').value="";	   
	diaatrazado=document.getElementById('inptDiasAtrazadoAPagar').value;

		 var Cajero=document.getElementById("inptCobradorConfirmar").value				 
					
		  var totalinteres =(Number(QuitarSeparadorMilValor(TotalInteresActual))+Number(QuitarSeparadorMilValor(interespagado)))
		totalinteres=separadordemilesnumero(totalinteres)
		
			totalCobroCuota=datos["21"];
			totalCobroInteres=datos["22"];			
			totalCobroCargoAdministrativo=datos["23"];
			totalCobroPagado=datos["24"];
			
			
		
		if(imprimirOpcion){
			ReImprimirDivTickeFacturaPago(FechaPago,Cajero,plazoRecibo,pagado,diaatrazado,NombreCliente,CiCliente,nrofactura,tipoventa,totalInteres,deudaActual,totalpagado,totalDescuento,totalventa,0,deudaActualsininteres,Nro_FacturaVenta,Fecha_Venta);
	}else{
			
			ReImprimirDivTickeFacturaPagoTicket(FechaPago,Cajero,plazoReciboTicket,pagado,diaatrazado,NombreCliente,CiCliente,nrofactura,tipoventa,totalInteres,deudaActual,totalpagado,totalDescuento,totalventa,0,deudaActualsininteres,paginaticket);
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
var idCreditoEditarCuota = "";
var idVentaEditarCuota = "";
function vercerrareditarPagos(d) {
	if (d == "1") {
		if(controlacceso("EDITARCREDITO","accion")==false){return;}
		$("div[id=divOpcionesCuota]").fadeIn(250)
		document.getElementById("inptMontoCuotaModificar").value = document.getElementById("inptMontoAPagar").value
		document.getElementById("inptDescuentoCuotaModificar").value = ""
		document.getElementById("inptOpcionesCuotaModificar").value = "1"
		idCreditoEditarCuota = codCredito
		idVentaEditarCuota = idFkVenta
	} else {
		$("div[id=divOpcionesCuota]").fadeOut(250)
	}

}
function verificareditarpago() {
	var inptMontoCargaPago = document.getElementById('inptMontoCargaPago').value
	var inptFechaCuotaModificar = document.getElementById('inptFechaCuotaModificar').value
	var inptDescuentoCuotaModificar = document.getElementById('inptDescuentoCuotaModificar').value
	var inptOpcionesCuotaModificar = document.getElementById('inptOpcionesCuotaModificar').value
	if (idCreditoEditarCuota == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	if (inptFechaCuotaModificar == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE PAGO")
		return false;
	}
	abmeditarcuota(idCreditoEditarCuota,inptDescuentoCuotaModificar, idVentaEditarCuota, inptFechaCuotaModificar, inptOpcionesCuotaModificar);
}
function abmeditarcuota(idcredito,descuento, cod_venta, fecha, tipo) {
if(controlacceso("EDITARCREDITO","accion")==false){return;}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editarcuenta")
	datos.append("fecha", fecha)
	datos.append("cod_venta", cod_venta)
	datos.append("idcredito", idcredito)
	datos.append("tipo", tipo)
	datos.append("descuento", descuento)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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
					vercerrareditarPagos("2")
					buscarcreditos()
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function verCerrarCargarPago(d) {
	
	document.getElementById('inptMontoCargoAdministrativoCuotaPago').value =""
	if (d == "1") {		
		  if(controlacceso("INSERTARPAGOSCREDITO","accion")==false){return;}
		 if(idabmAperturacierrecaja==""){
		   ver_vetana_informativa("FALTO INICIAR UNA CAJA")
		   verCerrarVentanaAbmAperturaCierreCaja1()
		   return
	   }
		var ventanaCargaPagos = document.getElementById("divCargaPagos");
		if(!ventanaCargaPagos){
			ver_vetana_informativa("NO SE ENCONTRO EL FORMULARIO DE PAGOS PARCIALES");
			return;
		}
		ventanaCargaPagos.style.display="";
		ventanaCargaPagos.style.zIndex="12300";
		ventanaCargaPagos.scrollTop=0;
		  
		var f = new Date();
		var dia = f.getDate()
		if (dia < 10) {
			dia = "0" + dia;
		}
		var mes = f.getMonth() + 1
		if (mes < 10) {
			mes = "0" + mes;
		}
		document.getElementById('inptFechaPagoCargarPago').value = f.getFullYear() + "-" + mes + "-" + dia;
	cambiarCobradorCodEnPagos()	
	
	var DeudaActualAPagar = document.getElementById('inptDeudaActual').value
	
	document.getElementById('inptDeudaActualCargaPago').value= DeudaActualAPagar;
	
	document.getElementById('inptMontoCargaPago').value="0"
	document.getElementById('inptDescuentoCargaPago').value="0"
	document.getElementById('inptMontoTarjetaCargaPago').value="0"
	document.getElementById('inptMontoCargaPago').focus;
	document.getElementById('inptTotalinteresPago').value = document.getElementById('inptTotalInteres').value
	
	comprobarSolicitudDescuentoInteresTipoParcial()
	} else {
		 
		$("div[id=divCargaPagos]").fadeOut(250)
		checkImprimirTicketPagoParcial(1)
	}
}
var controldePagosParciales=false

function checkImprimirTicketPagoParcial(d){
	document.getElementById('inptSeleccImprimirTicketParcial1').checked = false;
	document.getElementById('inptSeleccImprimirTicketParcial2').checked = false;
	
	if(d== "1"){
		document.getElementById('inptSeleccImprimirTicketParcial1').checked = true;
	}else{
		document.getElementById('inptSeleccImprimirTicketParcial2').checked = true;
	}
}

function verificarcargarpago() {
    if(controldePagosParciales==true){
		ver_vetana_informativa("PAGO EN PROCESO,NO PUEDE REALIZAR ESTA ACCIÓN")
		return
	}
	
	var inptDeudaActualCargaPago = document.getElementById('inptDeudaActualCargaPago').value
	var inptMontoCargaPago = document.getElementById('inptMontoCargaPago').value
	var inptFechaPagoCargarPago = document.getElementById('inptFechaPagoCargarPago').value
	var inputSelectFechaPago = document.getElementById('inputSelectFechaPago').value
	var inptNroReciboCargaPago = document.getElementById('inptNroReciboCargaPago').value
	var inptSeleccNroReciboPagoParcial = document.getElementById('inptSeleccNroReciboPagoParcial').value
	var inptDescuentoCargaPago = document.getElementById('inptDescuentoCargaPago').value
	var inptMontoTarjetaCargaPago = document.getElementById('inptMontoTarjetaCargaPago').value
	
	
	var inptMontoCargoAdministrativoCuotaPago = document.getElementById('inptMontoCargoAdministrativoCuotaPago').value
   
	
	// if (inptNroReciboCargaPago == "") {
		// ver_vetana_informativa("FALTO INGRESAR EL NRO DE BOLETA")
		// return false;
	// }
	// inptNroReciboCargaPago= inptSeleccNroReciboPagoParcial  + inptNroReciboCargaPago
	if(inptMontoCargoAdministrativoCuotaPago==""){
		inptMontoCargoAdministrativoCuotaPago=0;
	}
	
	var montop4 = QuitarSeparadorMilValor(inptMontoCargoAdministrativoCuotaPago);
	
	var montop1 = QuitarSeparadorMilValor(inptMontoCargaPago);
	var montop2 = QuitarSeparadorMilValor(inptMontoTarjetaCargaPago);
	var montop3 = QuitarSeparadorMilValor(inptDeudaActualCargaPago);
	
	
	if( (Number(montop1)+Number(montop2))  - 1  >= (Number(montop3) + Number(montop4)) ){
		ver_vetana_informativa("LO SIENTO EL MONTO A PAGAR ES SUPERIOR A LA DEUDA.")
		document.getElementById('inptMontoCargaPago').value= inptDeudaActualCargaPago;
		inptMontoCargaPago=inptDeudaActualCargaPago;
		return;
	}
	
	if (inptMontoCargaPago == "" || inptMontoCargaPago == "0" ) {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO")
		return false;
	}
	if (inptFechaPagoCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE PAGO")
		return false;
	}
	if (cobradorcargarpagos == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN COBRADOR")
		return false;
	}
	
	let control = 0; 
	$("tr[name=tdDetallePagoCreditoParcialOffline]").each(function(i, elementohtml){
	control=control+1;
	});
	 controldePagosParciales=true
	
	var imprimirOpcion = true;
	if(document.getElementById('inptSeleccImprimirTicketParcial2').checked){
		imprimirOpcion = false;
	}
	
	
	
	
	abmcargarpago(inptMontoCargoAdministrativoCuotaPago,inptMontoTarjetaCargaPago,inptDescuentoCargaPago,inptMontoCargaPago, inptFechaPagoCargarPago, cobradorcargarpagos, inputSelectFechaPago,inptNroReciboCargaPago,imprimirOpcion);
}





function verificarcargarpagoTipoPago(omitirControlDeposito) {
	if(!verificarDepositosPagoGrilla("div_opciones_pago_credito_parcial", function(){ verificarcargarpagoTipoPago(); })){
		return;
	}
    if(controldePagosParciales==true){
		ver_vetana_informativa("PAGO EN PROCESO,NO PUEDE REALIZAR ESTA ACCIÓN")
		return
	}
	
	var inptDeudaActualCargaPago = document.getElementById('inptDeudaActualCargaPago').value
	var inpTotalPagadoCreditoParcial = document.getElementById('inpTotalPagadoCreditoParcial').value
	var inptFechaPagoCargarPago = document.getElementById('inptFechaPagoCargarPago').value
	var inputSelectFechaPago = document.getElementById('inputSelectFechaPago').value
	var inptNroReciboCargaPago = document.getElementById('inptNroReciboCargaPago').value
	var inptSeleccNroReciboPagoParcial = document.getElementById('inptSeleccNroReciboPagoParcial').value
	var inptDescuentoCargaPago = document.getElementById('inptDescuentoCargaPago').value
	var inptMontoTarjetaCargaPago = document.getElementById('inptMontoTarjetaCargaPago').value
	
	
	var inptMontoCargoAdministrativoCuotaPago = document.getElementById('inptMontoCargoAdministrativoCuotaPago').value
   
	
	// if (inptNroReciboCargaPago == "") {
		// ver_vetana_informativa("FALTO INGRESAR EL NRO DE BOLETA")
		// return false;
	// }
	// inptNroReciboCargaPago= inptSeleccNroReciboPagoParcial  + inptNroReciboCargaPago
	if(inptMontoCargoAdministrativoCuotaPago==""){
		inptMontoCargoAdministrativoCuotaPago=0;
	}
	
	var montop4 = QuitarSeparadorMilValor(inptMontoCargoAdministrativoCuotaPago);
	
	var montop1 = QuitarSeparadorMilValor(inpTotalPagadoCreditoParcial);
	var montop2 = QuitarSeparadorMilValor(inptMontoTarjetaCargaPago);
	var montop3 = QuitarSeparadorMilValor(inptDeudaActualCargaPago);
	
	
	if( (Number(montop1)+Number(montop2))  - 1  >= (Number(montop3) + Number(montop4)) ){
		ver_vetana_informativa("LO SIENTO EL MONTO A PAGAR ES SUPERIOR A LA DEUDA.")
		document.getElementById('inpTotalPagadoCreditoParcial').value= inptDeudaActualCargaPago;
		inpTotalPagadoCreditoParcial=inptDeudaActualCargaPago;
		return;
	}
	
	if (inpTotalPagadoCreditoParcial == "" || inpTotalPagadoCreditoParcial == "0" ) {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO")
		return false;
	}
	if (inptFechaPagoCargarPago == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE PAGO")
		return false;
	}
	if (cobradorcargarpagos == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN COBRADOR")
		return false;
	}
	
	var imprimirOpcion = true;
	if(document.getElementById('inptSeleccImprimirTicketParcial2').checked){
		imprimirOpcion = false;
	}
	
	
	let control = contarPagosCreditoParcialConMonto(); 
	
	if(control <= 0){
		ver_vetana_informativa("FALTO INGRESAR LOS PAGOS")
		return;
	}
	
	 controldePagosParciales=true
	if(control > 0){
		abmcargaropcionespagoparcial(inptMontoCargoAdministrativoCuotaPago,inptMontoTarjetaCargaPago,inptDescuentoCargaPago, inptFechaPagoCargarPago, cobradorcargarpagos, inputSelectFechaPago,inptNroReciboCargaPago,imprimirOpcion, 0);
		return;
	}
	
	
}






function abmcargarpago(CargoAdministrativo,MontoTarjeta,Descuento,Monto, Fecha, cod_cobradorFK, controlfecha,nrofactura,imprimirOpcion) {
if(controlacceso("INSERTARPAGOSCREDITO","accion")==false){return;}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "cargarpago")
	datos.append("Fecha", Fecha)
	datos.append("Monto", Monto)
	datos.append("cod_cobradorFK", cod_cobradorFK)
	datos.append("cod_venta", idFkVenta)
	datos.append("controlfecha", controlfecha)
	datos.append("nrofactura", nrofactura)
	datos.append("Descuento", Descuento)
	datos.append("MontoTarjeta", MontoTarjeta)
	 datos.append("codcaja", cajapredeterminada)
    datos.append("codApertura", idabmAperturacierrecaja)
	datos.append("CargoAdministrativo", CargoAdministrativo)
	datos.append("cod_ClienteFKMora", cod_ClienteFKMora)
	datos.append("imprimirOpcion", imprimirOpcion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmcargarpago")
			controldePagosParciales=false
			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("")
			Respuesta = responseText;
			console.log(Respuesta)
			controldePagosParciales=false
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
 	try {
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					verCerrarCargarPago("2")
					buscarcreditos()
					deudaActual=datos["4"];
	paginaticket=datos["5"];
	cuotasNro=datos["6"];
	var nrofactura=datos["9"];
	var nombrecliente=datos["7"];
	var cicliente=datos["8"];
	var tipoventa=datos["10"];
	var interespagado=datos["11"];
    var deuda=datos["12"];
    var totalpagado=datos["13"];
    var TotalDescuento=datos["14"];
	var totalventa=datos["3"];
	var TotalInteresActual=datos["15"];
	var deudaActualsininteres=datos["16"];
	var plazoRecibo=datos["19"];
	
	
	var Fecha_ventaRecibo=datos["20"];
	var Nro_facturaRecibo=datos["21"];
	  
	  var FechaPago=datos["18"];
	pagado=Monto;
	diaatrazado=document.getElementById('inptDiasAtrazadoCargarPago').value;
	
	document.getElementById('inptMontoCargoAdministrativoCuotaPago').value = "" ;
	 
	var Cajero=document.getElementById("inptCobradorCargarPago").value
	var subtotal=document.getElementById("inptTotalVenta").value;
	var descuento=document.getElementById("inptDescuentoCargaPago").value;
							 var totalinteres =(Number(QuitarSeparadorMilValor(TotalInteresActual))+Number(QuitarSeparadorMilValor(interespagado)))

	totalinteres=separadordemilesnumero(totalinteres)
	
	
			totalCobroCuota=datos["22"];
			totalCobroInteres=datos["23"];			
			totalCobroCargoAdministrativo=datos["24"];
			totalCobroPagado=datos["25"];
 
	
	totalAPagar_cuenta_cobrar = 0;
		document.getElementById('inptMontoCargaPago').value=separadordemilesnumero(totalAPagar_cuenta_cobrar);
		document.getElementById('inptTotalSeleccAPagar').value = separadordemilesnumero(totalAPagar_cuenta_cobrar);
	
	
	if(imprimirOpcion){
			ReImprimirDivTickeFacturaPago(FechaPago,Cajero,plazoRecibo,pagado,diaatrazado,nombrecliente,cicliente,nrofactura,tipoventa,
	totalinteres,deudaActual,totalpagado,TotalDescuento,totalventa,0,deudaActualsininteres,Nro_facturaRecibo,Fecha_ventaRecibo)
		}else{
			
			ReImprimirDivTickeFacturaPagoTicket(FechaPago,Cajero,plazoRecibo,pagado,diaatrazado,nombrecliente,cicliente,nrofactura,tipoventa,totalinteres,deudaActual,totalpagado,TotalDescuento,totalventa,0,deudaActualsininteres,paginaticket);
		
		}
	
	

 
		controlInsercionPagos=false
				
					document.getElementById("inptDiasAtrazadoCargarPago").value = "";
					document.getElementById("inptMontoCargaPago").value = "";
					verCerrarCargarPago("2")
					buscarcreditos()

				}
			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
/*RE-IMPRIMIR TICKET*/
function vercerrarhistorialdepagorimprimir(d) {
	if (d == "1") {
		var ventanaHistorialPagos = document.getElementById("divHistorialPagosReimpresion");
		if(!ventanaHistorialPagos){
			ver_vetana_informativa("NO SE ENCONTRO EL FORMULARIO DE HISTORIAL DE PAGOS");
			return;
		}
		ventanaHistorialPagos.style.display="";
		ventanaHistorialPagos.style.zIndex="12300";
		ventanaHistorialPagos.scrollTop=0;
		elementoPagoReimprimir="";
		  

		buscarhistorialdepagosreimpresion();
	} else {
		  
		$("div[id=divHistorialPagosReimpresion]").fadeOut(500)
	}
}
function buscarhistorialdepagosreimpresion() {
	document.getElementById("table_historial_pagos_reimpresion").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkVenta,
		"funt": "buscarHistorialPagosAReimprimir"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_pagos_reimpresion").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_pagos_reimpresion").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"]; 
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("table_historial_pagos_reimpresion").innerHTML = datos_buscados	
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var elementoPagoReimprimir="";
function obtenerPagosReImprimir(datostr){	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	elementoPagoReimprimir=datostr;
}



function ReImprimirTicketPagos(){	
	if(elementoPagoReimprimir==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return
	}
	datostr=elementoPagoReimprimir
	var Fecha=$(datostr).children('td[id="td_datos_3"]').html();
	var Cajero=$(datostr).children('td[id="td_datos_4"]').html();
	var Pagado=$(datostr).children('td[id="td_datos_15"]').html();
	var DiasAtrazado=$(datostr).children('td[id="td_datos_5"]').html();
	var NombreCliente=$(datostr).children('td[id="td_datos_7"]').html();
	var CiCliente=$(datostr).children('td[id="td_datos_6"]').html();
	var NroRecibo=$(datostr).children('td[id="td_datos_1"]').html();
	var tipoventa=$(datostr).children('td[id="td_datos_8"]').html();
	var totalInteres=$(datostr).children('td[id="td_datos_10"]').html();
	var deudaActual=$(datostr).children('td[id="td_datos_11"]').html();
	var totalpagado=$(datostr).children('td[id="td_datos_15"]').html();
	var totaldescuento=$(datostr).children('td[id="td_datos_9"]').html();
	var TotalVenta=$(datostr).children('td[id="td_datos_16"]').html();
	var InteresActual=$(datostr).children('td[id="td_datos_20"]').html();
	var deudaActualsininteres=$(datostr).children('td[id="td_datos_18"]').html();
	var CuotasNro=$(datostr).children('td[id="td_datos_24"]').html();
	
	var Fecha_venta=$(datostr).children('td[id="td_datos_26"]').html();	
	var NroFactura_Venta=$(datostr).children('td[id="td_datos_23"]').html();	
	
	paginaticket=$(datostr).children('td[id="td_datos_25"]').html();	
	
	
			totalCobroCuota=$(datostr).children('td[id="td_datos_27"]').html();
			totalCobroInteres=$(datostr).children('td[id="td_datos_28"]').html();	
			totalCobroCargoAdministrativo=$(datostr).children('td[id="td_datos_29"]').html();
			totalCobroPagado=$(datostr).children('td[id="td_datos_30"]').html();
	
	 
	ReImprimirDivTickeFacturaPago(Fecha,Cajero,CuotasNro,Pagado,DiasAtrazado,NombreCliente,CiCliente,NroRecibo,tipoventa,totalInteres,separadordemilesnumero(deudaActual),totalpagado,totaldescuento,TotalVenta,InteresActual,deudaActualsininteres,NroFactura_Venta,Fecha_venta);
	
	
	
}


let plazoRecibo=""
let PagadoRecibo=""
let NombreClienteRecibo=""
let CiClienteRecibo=""
let NroFacturaRecibo=""

function imprimirTicketRecibo(){
	
	ImprimirReciboDinero(plazoRecibo,PagadoRecibo,NombreCliente,CiCliente,NroFacturaRecibo)
	
}

/*HISTORIAL VENTA*/
function verCerrarHistorialVenta(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divHistorialVenta").style.display==""){
	
	if(controldebusquedadHistorialVenta==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
//  
	$("div[id=divHistorialVenta]").fadeOut(500);
		document.getElementById("divMinimizadoHistorialVenta2").style.display='none'
		document.getElementById("divMinimizadoHistorialVenta1").style.display='none'
		limpiarcamposhistorialventa()
	}else{
       if(controlacceso("VERHISTORIALVENTA","accion")==false){ return; }
	   mostrarSoloUno("divHistorialVenta")	
		document.getElementById("divHistorialVenta").style.display=""
 
	}
}
function minimizarHistorialVenta(){
 
	$("div[id=divHistorialVenta]").fadeOut(500);	
	document.getElementById("divMinimizadoHistorialVenta2").style.display=''
	document.getElementById("divMinimizadoHistorialVenta1").style.display=''
	copiarBotonEnContenedor(document.getElementById("divMenuHistorialVenta1"));
}

function checkfiltroshistorialventa(d){
	if(d=="1"){
	document.getElementById('inptCheckHistorialVenta1').checked=true
	document.getElementById('inptCheckHistorialVenta2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInfHistorialVentaF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInfHistorialVentaF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
	document.getElementById('inptCheckHistorialVenta1').checked=false
	document.getElementById('inptCheckHistorialVenta2').checked=true
	document.getElementById('inptBuscarInfHistorialVentaF1').value="";
      document.getElementById('inptBuscarInfHistorialVentaF2').value="";
	
	}
}
var registrocargadohistorialventa="";
var totalregistrohistorialventa="";
var controldebusquedadHistorialVenta=false
function obtenerListadoCoreHistorialVentas(){
	if(typeof window.inicializarListadoHistorialVentas !== "function"){
		return null
	}
	return window.inicializarListadoHistorialVentas()
}
function cancelarHistorialVenta(){
	controldebusquedadHistorialVenta=false
	document.getElementById("divProgressHistorialVenta").style.backgroundColor='#ff5722'
}
function buscarhistorialventa() {    
	var listado = obtenerListadoCoreHistorialVentas()
	
	var tipoComprobante = document.getElementById("inptBuscarHistorialcomprobante").value
	var fechafiltro = document.getElementById('inptBuscarHistorialVenta1').value
	var nroventa = document.getElementById('inptBuscarHistorialVenta2').value
	var documento = document.getElementById('inptBuscarHistorialVenta3').value
	var cliente = document.getElementById('inptBuscarHistorialVenta4').value
	var telefono = document.getElementById('inptBuscarHistorialVenta5').value
	var tipoventa = document.getElementById('inptBuscarHistorialVenta6').value
	var estadocuenta = document.getElementById('inptBuscarHistorialVenta7').value
	var local = document.getElementById('inptBuscarHistorialVenta8').value
	var fecha1 = document.getElementById('inptBuscarInfHistorialVentaF1').value
	var fecha2 = document.getElementById('inptBuscarInfHistorialVentaF2').value
	var vendedor = document.getElementById('inptBuscarHistorialVenta9').value 
	var estadoventamoracliente = document.getElementById('inptBuscarHistorialVenta10').value 
	var garante = document.getElementById('inptBuscarHistorialVenta11').value
	var refinanciado = document.getElementById('inptBuscarHistorialVenta12').value
	var producto = document.getElementById('inptBuscarHistorialVenta13').value
	var montoMinimo = document.getElementById('inptBuscarHistorialVenta14').value
	
	
	if(document.getElementById('inptCheckHistorialVenta1').checked==true){
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
			return
		}
		if (fecha2 == "") {
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
			return
		}
	}
	if(document.getElementById('inptCheckHistorialVenta2').checked==true){
		
	var fecha1 = ""
	var fecha2 = ""
	}	
	
	if(controldebusquedadHistorialVenta==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadHistorialVenta=true
document.getElementById("tbProcessHistorialVenta").style.display="none"
	if(listado){
		listado.establecerRegistros([], false)
	}
	document.getElementById("table_historial_venta").innerHTML = paginacargando
	document.getElementById("inptRegistroNroHistorialVenta").value = "";
    document.getElementById("inptTotalVentaHistorialVenta").value = "";
    document.getElementById("inptTotalPagosHistorialVenta").value = "";
    document.getElementById("inptTotalPendienteHistorialVenta").value = "";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,	
		"fecha1": fecha1,
		"fecha2": fecha2,
		"fechafiltro": fechafiltro,
		"nroventa": nroventa,
		"documento": documento,
		"cliente": cliente,
		"telefono": telefono,
		"tipoventa": tipoventa,
		"estadocuenta": estadocuenta,
		"local": local,
		"tipoComprobante": tipoComprobante,
		"vendedor": vendedor,
		"garante": garante,
		"estadoventamoracliente": estadoventamoracliente,
		"refinanciado": refinanciado,
		"producto": producto,
		"monto_minimo": montoMinimo,
		"formato": listado ? "json" : "html",
		"funt": "historialventa"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("table_historial_venta").innerHTML = ''
			}
			controldebusquedadHistorialVenta=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("table_historial_venta").innerHTML = ''
			}
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];              
			  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("inptRegistroNroHistorialVenta").value = datos[3];
					document.getElementById("inptTotalVentaHistorialVenta").value = datos[4];
					document.getElementById("inptTotalPagosHistorialVenta").value = datos[5];
					document.getElementById("inptTotalPendienteHistorialVenta").value = datos[6];
					if(listado && Array.isArray(datos_buscados)){
						listado.establecerRegistros(datos_buscados, false)
					}else{
						document.getElementById("table_historial_venta").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
						registrocargadohistorialventa=datos[99];
					totalregistrohistorialventa=datos[100];					
						 if(totalregistrohistorialventa>registrocargadohistorialventa){
						 	var porce=((registrocargadohistorialventa*100)/totalregistrohistorialventa).toFixed(0)
	document.getElementById("divProgressHistorialVenta").style.width=porce+"%"
						 if(!listado){
						 	document.getElementById("table_historial_venta").insertAdjacentHTML("beforeend", "<div id='table_mas_historial_venta'></div>")
						 }
						  buscarMashistorialventa();
					 }else{
						 controldebusquedadHistorialVenta=false
					 }
					
					}
			} catch (error) {
				if(listado){
					listado.establecerRegistros([], false)
				}
				controldebusquedadHistorialVenta=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function buscarMashistorialventa(c) {    
	var listado = obtenerListadoCoreHistorialVentas()
	var tipoComprobante = document.getElementById("inptBuscarHistorialcomprobante").value
	var fechafiltro = document.getElementById('inptBuscarHistorialVenta1').value
	var nroventa = document.getElementById('inptBuscarHistorialVenta2').value
	var documento = document.getElementById('inptBuscarHistorialVenta3').value
	var cliente = document.getElementById('inptBuscarHistorialVenta4').value
	var telefono = document.getElementById('inptBuscarHistorialVenta5').value
	var tipoventa = document.getElementById('inptBuscarHistorialVenta6').value
	var estadocuenta = document.getElementById('inptBuscarHistorialVenta7').value
	var local = document.getElementById('inptBuscarHistorialVenta8').value
	var fecha1 = document.getElementById('inptBuscarInfHistorialVentaF1').value
	var fecha2 = document.getElementById('inptBuscarInfHistorialVentaF2').value
	var garante = document.getElementById('inptBuscarHistorialVenta11').value 
		var vendedor = document.getElementById('inptBuscarHistorialVenta9').value 
		
		var estadoventamoracliente = document.getElementById('inptBuscarHistorialVenta10').value 
		var refinanciado = document.getElementById('inptBuscarHistorialVenta12').value
		
		var producto = document.getElementById('inptBuscarHistorialVenta13').value
		var montoMinimo = document.getElementById('inptBuscarHistorialVenta14').value
	
	if(document.getElementById('inptCheckHistorialVenta1').checked==true){
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
			return
		}
		if (fecha2 == "") {
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
			return
		}
	}
	if(document.getElementById('inptCheckHistorialVenta2').checked==true){
		
	var fecha1 = ""
	var fecha2 = ""
	}	
	
	if(c=="1"){
		controldebusquedadHistorialVenta=true
	}
	if(controldebusquedadHistorialVenta==false){
		
	return
}
controldebusquedadHistorialVenta=true
document.getElementById("tbProcessHistorialVenta").style.display=""
document.getElementById("divProgressHistorialVenta").style.backgroundColor=''
	var destinoMasHistorial = document.getElementById("table_mas_historial_venta")
	if(!listado && !destinoMasHistorial){
		controldebusquedadHistorialVenta=false
		return
	}
	if(destinoMasHistorial){
		destinoMasHistorial.innerHTML = paginacargando
	}
    var totalventa=document.getElementById("inptTotalVentaHistorialVenta").value;
    var totalpagado=document.getElementById("inptTotalPagosHistorialVenta").value;
    var totalpendiente=document.getElementById("inptTotalPendienteHistorialVenta").value;
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,	
		"fecha1": fecha1,
		"fecha2": fecha2,
		"fechafiltro": fechafiltro,
		"nroventa": nroventa,
		"documento": documento,
		"cliente": cliente,
		"telefono": telefono,
		"tipoventa": tipoventa,
		"estadocuenta": estadocuenta,
		"garante": garante,
		"local": local,
		"totalventa": totalventa,
		"totalpagado": totalpagado,
		"totalpendiente": totalpendiente,
		"registrocargado": registrocargadohistorialventa,
		"tipoComprobante": tipoComprobante,
		"vendedor": vendedor,
		"estadoventamoracliente": estadoventamoracliente,
		"refinanciado": refinanciado,
		"producto": producto,
		"monto_minimo": montoMinimo,
		"formato": listado ? "json" : "html",
		"funt": "mashistorialventa"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(destinoMasHistorial){
				destinoMasHistorial.innerHTML = ''
			}
			document.getElementById("divProgressHistorialVenta").style.backgroundColor='#ff5722'
			controldebusquedadHistorialVenta=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(destinoMasHistorial){
				destinoMasHistorial.innerHTML = ''
			}
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];              
			  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("inptRegistroNroHistorialVenta").value = datos[3];
					document.getElementById("inptTotalVentaHistorialVenta").value = datos[4];
					document.getElementById("inptTotalPagosHistorialVenta").value = datos[5];
					document.getElementById("inptTotalPendienteHistorialVenta").value = datos[6];
					if(listado && Array.isArray(datos_buscados)){
						listado.establecerRegistros(datos_buscados, true)
					}else if(destinoMasHistorial){
						destinoMasHistorial.innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
					
					
					
						registrocargadohistorialventa=datos[99];
					
						 if(totalregistrohistorialventa>registrocargadohistorialventa){
						 	var porce=((registrocargadohistorialventa*100)/totalregistrohistorialventa).toFixed(0)
	document.getElementById("divProgressHistorialVenta").style.width=porce+"%"
						 if(!listado && destinoMasHistorial){
						 	destinoMasHistorial.insertAdjacentHTML("beforeend", "<div id='table_mas_historial_venta'></div>")
						 	destinoMasHistorial.id=""
						 }
						  buscarMashistorialventa();
					 }else{
						 document.getElementById("tbProcessHistorialVenta").style.display="none"
						 controldebusquedadHistorialVenta=false
					 }
					
					}
			} catch (error) {
				document.getElementById("divProgressHistorialVenta").style.backgroundColor='#ff5722'
				controldebusquedadHistorialVenta=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

/*
OPCIONES DE HISTORIAL VENTA
*/
function verCerrarVentanasHistorialVenta(d){
	document.getElementById("btnHistoriaVenta1").style=''
	document.getElementById("btnHistoriaVenta2").style=''
	document.getElementById("btnHistoriaVenta4").style=''
	document.getElementById("btnHistoriaVenta6").style=''
	document.getElementById("cntHistVenta").style.display='none'
	document.getElementById("cntHistVentaPago").style.display='none'
	document.getElementById("cntHistDetalleVenta").style.display='none'
	if(d=="1"){
		document.getElementById("btnHistoriaVenta1").style='background-color:#ff9800;color:#fff'
		document.getElementById("cntHistVenta").style.display=''
	}
	if(d=="2"){
		if (codVentaVentanas == "") {
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			verCerrarVentanasHistorialVenta("1")
			return
		}
		 buscarcreditosHistorialVenta()
		 	document.getElementById("btnHistoriaVenta2").style='background-color:#ff9800;color:#fff'
		document.getElementById("cntHistVentaPago").style.display=''
	}		
		if(d=="6"){
		if (codVentaVentanas == "") {
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			verCerrarVentanasHistorialVenta("1")
			return
		}
		 buscarDetallesHistorialVenta()
		 	document.getElementById("btnHistoriaVenta6").style='background-color:#ff9800;color:#fff'
		document.getElementById("cntHistDetalleVenta").style.display=''
	}	
}


var codVentaVentanas="";
var codVentaClienteVentanas="";
function buscarcreditosHistorialVenta() {	
		if (codVentaVentanas == "") {
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			return
		}
	document.getElementById("table_historial_venta_pagos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": codVentaVentanas,
		"formato": "json",
		"funt": "creditoshistorialventa"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_venta_pagos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_venta_pagos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					renderCreditosHistorialVenta(datos_buscados)
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarDetallesHistorialVenta() {	
		if (codVentaVentanas == "") {
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			return
		}
	document.getElementById("table_historial_venta_detalle").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": codVentaVentanas,
		"funt": "detalleenhistorial"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_venta_detalle").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_venta_detalle").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_historial_venta_detalle").innerHTML = datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function editarventaselecc() {
	if (document.getElementById("inptRegistroSeleccHistorialVenta").value == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return
	}	
   document.getElementById("divHistorialVenta").style.display='none'
	ControlVentanaVenta="1"
	obtenerdatoshistorialventa(elementoventa)
	limpiarcamposhistorialventa()
	vercerrarOpcionesHistorialVenta("2")
	
	}
var elementoventa = ""
var controltipoventa="";
function obtenerdatoshistorialventa(datostr) {


	
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});

	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptFechaVenta').value = $(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById('inptClienteVenta').value = $(datostr).children('td[id="td_datos_2"]').text();
	controltipoventa = $(datostr).children('td[id="td_datos_12"]').text();
	document.getElementById('inptSeleccTipoVenta').value = $(datostr).children('td[id="td_datos_12"]').text();
	document.getElementById('inptVendedorVenta1').value = $(datostr).children('td[id="td_datos_15"]').text();
	document.getElementById('inptVendedorVenta2').value = $(datostr).children('td[id="td_datos_16"]').text();
	document.getElementById('inptCobradorVenta').value = $(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById('inptCobradorCargarPago').value = $(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById('inpCodVenta').value = $(datostr).children('td[id="td_datos_13"]').text();
	document.getElementById('inptNroVenta').value = $(datostr).children('td[id="td_datos_13"]').text();
	document.getElementById('inptSeleccPuntoExpedicionVenta').value = $(datostr).children('td[id="td_datos_36"]').text();
	document.getElementById('inptAccesoCreditoVentaCliente').value =  $(datostr).children('td[id="td_datos_39"]').text();
	var puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	if(puntoExpedicion==""){						
	document.getElementById("pNroFactuaCaja").textContent ="*"+$(datostr).children('td[id="td_datos_13"]').text()+"*";
	}else{
	document.getElementById("pNroFactuaCaja").textContent = "*"+puntoExpedicion+"-"+$(datostr).children('td[id="td_datos_13"]').text()+"*";
	}
	document.getElementById('inptComisionVentaCobrador').value = $(datostr).children('td[id="td_datos_22"]').text();
	document.getElementById('inptlocalVenta').value = $(datostr).children('td[id="td_datos_23"]').text();
	document.getElementById('inptGaranteVenta').value = $(datostr).children('td[id="td_datos_31"]').text();
	document.getElementById('inptDocClienteVenta').value = $(datostr).children('td[id="td_datos_32"]').text();
	document.getElementById('inptDocClienteVenta2').value = $(datostr).children('td[id="td_datos_32"]').text();
	document.getElementById('inptDocGaranteVenta').value = $(datostr).children('td[id="td_datos_33"]').text();
	document.getElementById('inptSeleccTipoComprobanteVenta').value = $(datostr).children('td[id="td_datos_35"]').text();
		if(document.getElementById('inptSeleccTipoComprobanteVenta').value=="FACTURA"){
					// document.getElementById("btnImprimirticket").style.display=""
					 document.getElementById("btnImprimirFactura").style.display=""
					 document.getElementById("btnImprimirPagare").style.display=""
	}else{
		// document.getElementById("btnImprimirticket").style.display=""
					 // document.getElementById("btnImprimirFactura").style.display="none"
					 document.getElementById("btnImprimirPagare").style.display=""
	}
	
	idGaranteFk = $(datostr).children('td[id="td_datos_30"]').text();
	idFkVendedor1 = $(datostr).children('td[id="td_datos_3"]').text();
	idFkVendedor2 = $(datostr).children('td[id="td_datos_14"]').text();
	idFkCliente = $(datostr).children('td[id="td_datos_10"]').text();
	idFkCobrador = $(datostr).children('td[id="td_datos_11"]').text();
	cobradorcargarpagos = $(datostr).children('td[id="td_datos_11"]').text();
	idabmVenta = $(datostr).children('td[id="td_datos_8"]').text();
	idFkVenta = $(datostr).children('td[id="td_datos_8"]').text();
	document.getElementById('inpCodVenta').disabled = true
	document.getElementById('inpCodVenta').className = "inputTextDisable"
	document.getElementById('btnAbmVenta').style.display = ""
	document.getElementById('btnAbmVenta').value = "Editar datos"
	
	document.getElementById('tdImprimirVenta').style.display = ''
	
	buscardetallesventa()
document.getElementById("divAbmVenta").style.display=""
 

   document.getElementById("btnMasInfoClienteVenta").style.display='none'
SeleccTipoComprobanteVenta()

}
function obtenerelementohistroialventa(datos) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datos.className = 'tableRegistroSelec'
	elementoventa = datos;
	codVentaVentanas = $(datos).children('td[id="td_datos_8"]').text();
	codVentaClienteVentanas = $(datos).children('td[id="td_datos_10"]').text();
	cod_clienteBuscarUbicacion = $(datos).children('td[id="td_datos_10"]').text();
	document.getElementById('inptRegistroSeleccHistorialVenta').value = $(datos).children('td[id="td_datos_13"]').text();
		document.getElementById('inptUsuarioInsertadoPor').value=$(datos).children('td[id="td_datos_100"]').text()
	document.getElementById('inptFechaInsertadoPor').value=$(datos).children('td[id="td_datos_102"]').text()
	document.getElementById('inptUsuarioEditadoPor').value=$(datos).children('td[id="td_datos_101"]').text()
	document.getElementById('inptFechaEditadoPor').value=$(datos).children('td[id="td_datos_103"]').text()
		document.getElementById("btnOpcionesHistorialVenta").style.backgroundColor="#4CAF50";
		document.getElementById("btnAuditoriaVentas").style.backgroundColor="#673ab7";
		document.getElementById("btnUbicacionClienteVenta").style.backgroundColor="";
		
		LatGeo = $(datos).children('td[id="td_datos_104"]').text();
		LonGeo = $(datos).children('td[id="td_datos_105"]').text();
	
}
function limpiarcamposhistorialventa(){
	
	if(controldebusquedadHistorialVenta==true){
	return
}
	document.getElementById("inptBuscarInfHistorialVentaF1").value="";
	document.getElementById("inptBuscarInfHistorialVentaF2").value="";
	document.getElementById("inptBuscarHistorialVenta1").value="";
	document.getElementById("inptBuscarHistorialVenta2").value="";
	document.getElementById("inptBuscarHistorialVenta3").value="";
	document.getElementById("inptBuscarHistorialVenta4").value="";
	document.getElementById("inptBuscarHistorialVenta5").value="";
	document.getElementById("inptBuscarHistorialVenta6").value="";
	document.getElementById("inptBuscarHistorialVenta7").value="";
	document.getElementById("inptBuscarHistorialVenta8").value="";
	document.getElementById("inptBuscarHistorialcomprobante").value="";
	var montoMinimoHistorial = document.getElementById("inptBuscarHistorialVenta14");
	if(montoMinimoHistorial){montoMinimoHistorial.value="";}
	

	document.getElementById("inptRegistroNroHistorialVenta").value="";
	document.getElementById("inptTotalVentaHistorialVenta").value="";
	document.getElementById("inptTotalPagosHistorialVenta").value="";
	document.getElementById("inptTotalPendienteHistorialVenta").value="";
	document.getElementById("inptRegistroSeleccHistorialVenta").value="";
	document.getElementById("btnOpcionesHistorialVenta").style.backgroundColor="#ccc";
	document.getElementById("btnAuditoriaVentas").style.backgroundColor="#ccc";
	document.getElementById("btnUbicacionClienteVenta").style.backgroundColor="#ccc";
	var listado = obtenerListadoCoreHistorialVentas()
	if(listado){
		listado.establecerRegistros([], false)
	}else{
		document.getElementById("table_historial_venta").innerHTML=""
	}
	document.getElementById("table_historial_venta_pagos").innerHTML=""
	document.getElementById("table_historial_venta_detalle").innerHTML=""
	document.getElementById("table_historial_venta_detalle").innerHTML=""
	document.getElementById("tbProcessHistorialVenta").style.display="none"
	verCerrarVentanasHistorialVenta("1")
}
function vercerrarOpcionesHistorialVenta(d){
		
	if(d=="1"){
		if(document.getElementById("inptRegistroSeleccHistorialVenta").value==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return false
		}
		document.getElementById("divOpcionesHistorialVenta").style.display=""
		 
	}else{
		 
		$("div[id=divOpcionesHistorialVenta]").fadeOut(500);	
    }
}
function obtenerdatosabmdetalleventaDevoluciones(datos) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datos.className = 'tableRegistroSelec'
	elementoDevolucion = datos;
	document.getElementById('inptRegistroSeleccionadoDetalleVentaHistorial').value = $(datos).children('td[id="td_datos_2"]').html();
	
}
/* MARCAR CLIENTE/VENTA COMO RECUPERADO FALLECIDO O EN DEMANDA */

function marcaMoraVentaEstado(datos){
	
	if(controlacceso("CAMBIARCLIENTEVENTAESTADO","accion")==false){return;}
	
	var codMoraCliente = datos.value;	
	
	if(codMoraCliente == ""){
		return;
	}
	
	verCerrarEfectoCargando("1")
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "marcarmoraventaestado")
			 datos.append("cod_venta" , codVentaVentanas)				
			 datos.append("cod_clienteFK" , codVentaClienteVentanas)				
			 datos.append("codMoraCliente" , codMoraCliente)
			 
			var OpAjax= $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
				 vercerrarOpcionesHistorialVenta("2")
	document.getElementById('marcarcodMoraVenta').value=""
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
ELIMINAR VENTA
*/
function vercerrareliminaregistroventa(d) {
	if (d == "1") {
		document.getElementById("divEliminarVenta").style.display=""
		  
	} else {
		  
		$("div[id=divEliminarVenta]").fadeOut(500)
	}
}
function eliminarRegistroVenta(){
	if(controlacceso("ELIMINARVENTA","accion")==false){	   
	   //SIN PERMISO
	   return;
		}
		var codventa=$(elementoventa).children('td[id="td_datos_8"]').text();
	var nro=$(elementoventa).children('td[id="td_datos_27"]').text();
	var nroFactura=$(elementoventa).children('td[id="td_datos_13"]').text();
vercerrarOpcionesHistorialVenta("2")		
limpiarcamposhistorialventa()
	if(confirm("Estas Seguro que quieres eliminar esta venta")){	
	if(codventa==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return
	}
	
	if(nro>0){
		ver_vetana_informativa("NO PUEDES ELEMINAR ESTA VENTA POR QUE CUENTA CON UNO O VARIOS DETALLES")
			return
	}
	var motivo=document.getElementById("inptSeleccMotivoEliminarVenta").value
	if(motivo==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN MOTIVO")
		return
	}
	verCerrarEfectoCargando("1")
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "eliminarVenta")
			 datos.append("codventa" , codventa)			
			 datos.append("motivo" , motivo)			
			 datos.append("nroFactura" , nroFactura)			
			var OpAjax= $.ajax({
						data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
					document.getElementById("inptRegistroSeleccHistorialVenta").value="";
					document.getElementById("btnOpcionesHistorialVenta").style.backgroundColor="#ccc";
					
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
}
/*
ANULAR VENTA
*/
function verCerrarCancelarVenta(d){
	if(d=="1"){
	if(elementoventa==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
	  return false;	
	}		
		if(controlacceso("ANULARVENTAS","accion")==false){	   
	   //SIN PERMISO
	   return;
		}	
		vercerrarOpcionesHistorialVenta("2")
	var datos=elementoventa;
	document.getElementById("inptPagadoCancelacion").value=$(datos).children('td[id="td_datos_6"]').text();
	document.getElementById("inptTotalVentaCancelacion").value=$(datos).children('td[id="td_datos_5"]').text();
	document.getElementById('inptMontoDevueltoCancelacion').value=""
	document.getElementById('inptMotivoCancelacion').value=""
	document.getElementById('inptFechaVentaCancelacion').value=""
	codVentaCambio=$(datos).children('td[id="td_datos_8"]').text();;
    vercerrarOpcionesDeCancelacion("1")
	limpiarcamposhistorialventa()
	}
}
function vercerrarOpcionesDeCancelacion(d){
	if(d=="1"){
		$("div[id=divCancelarCuenta]").fadeIn(250)		
	}else{
		$("div[id=divCancelarCuenta]").fadeOut(250)
	}
}
/*
REFINANCIAR COUTA RESTANTE
*/
function verificarcancelacionventa(){	 
	var inptMontoDevueltoCancelacion=document.getElementById('inptMontoDevueltoCancelacion').value
	var inptMotivoCancelacion=document.getElementById('inptMotivoCancelacion').value
	var inptFechaVentaCancelacion=document.getElementById('inptFechaVentaCancelacion').value	
	var inptStockCancelacion=document.getElementById('inptStockCancelacion').value	
  if(codVentaCambio==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN VENTA")
	  return false;
  }
  if(inptMontoDevueltoCancelacion==""){
	ver_vetana_informativa("EL MONTO DE DEVOLUCION NO PUEDE QUEDAR VACIO")
	  return false;
  }
  if(inptFechaVentaCancelacion==""){
	ver_vetana_informativa("FALTO INGRESAR UNA FECHA")
	  return false;
  }
  if(inptMotivoCancelacion==""){
	ver_vetana_informativa("FALTO INGRESAR EL MOTIVO")
	  return false;
  }
 abmcancelarventa(inptStockCancelacion,inptMontoDevueltoCancelacion,inptMotivoCancelacion,inptFechaVentaCancelacion,codVentaCambio)	
}
function abmcancelarventa(stock,montodevuelto,motivo,fecha,cod_venta){	
	
	verCerrarEfectoCargando("1")
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "cancelarventa")
			 datos.append("montodevuelto" , montodevuelto)
			  datos.append("motivo" , motivo)
			 datos.append("fecha" , fecha)
			 datos.append("cod_venta" , cod_venta)					
			 datos.append("stock" , stock)					
			var OpAjax= $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
				 vercerrarOpcionesDeCancelacion("2")
	document.getElementById('inptMontoDevueltoCancelacion').value=""
	document.getElementById('inptMotivoCancelacion').value=""
	document.getElementById('inptFechaVentaCancelacion').value=""
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
function verCerrarquitardevolucionrefinanciamiento2(d){
	if(d=="1"){
		
		if(controlacceso("REFINANCIARVENTA","accion")==false){	   
	   //SIN PERMISO
	   return;
		}
	if(elementoventa==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
	  return false;	
	}	
	var datos=elementoventa;
	document.getElementById("inptTotalCuotaRefinanciamiento2").value=$(datos).children('td[id="td_datos_37"]').text();
	document.getElementById("inptCuotaNroCambioRefinanciamiento2").value=""
	document.getElementById("inptMonotCambioRefinanciamiento2").value=""
	document.getElementById("inptFechaVentaCambioRefinanciamiento2").value=""
	document.getElementById("inptDescuentoCambioRefinanciamiento2").value="0"
	document.getElementById("inputSelectMetodoCambioRefinanciamiento2").value=$(datos).children('td[id="td_datos_18"]').text();	
	codVentaCambio=$(datos).children('td[id="td_datos_8"]').text();;
    vercerrarOpcionesDeRefinanciamiento2("1")
	vercerrarOpcionesHistorialVenta("2")
	limpiarcamposhistorialventa()
	}
}
function vercerrarOpcionesDeRefinanciamiento2(d){
	if(controlacceso("REFINANCIARVENTA","accion")==false){	   
	   //SIN PERMISO
	   return;
		}			
	if(d=="1"){
		$("div[id=divRefinanciarcuota]").fadeIn(250)
        document.getElementById("inptInteresRefinanciamiento2").value="0,10"
        document.getElementById("inptDiasGraciaRefinanciamiento2").value="5"
	}else{
		$("div[id=divRefinanciarcuota]").fadeOut(250)
	}
}
function calcular_cuota_refinanciamiento() {
	var t = QuitarSeparadorMilValor(document.getElementById('inptTotalCuotaRefinanciamiento2').value); // Total
	var c = QuitarSeparadorMilValor(document.getElementById('inptCuotaNroCambioRefinanciamiento2').value); // Cantidad de cuotas
	var e = QuitarSeparadorMilValor(document.getElementById('inptEntregaRefinanciamiento2').value); // Entrega

	if (isNaN(c) || c <= 0) {
		// document.getElementById('inptCuotaNroCambioRefinanciamiento2').value = 1;
	    document.getElementById('inptMonotCambioRefinanciamiento2').value = document.getElementById('inptTotalCuotaRefinanciamiento2').value;
		separadordemiles(document.getElementById('inptMonotCambioRefinanciamiento2'));
		return false;
	}

	t = parseFloat(t);
	c = parseFloat(c);
	e = parseFloat(e);

	if (isNaN(e)) e = 0; // Si no hay entrega, que sea 0

	var monto_final = t - e;

	if (monto_final < 0) monto_final = 0; // Evitar negativos

	var resultado = parseInt(monto_final / c);
	resultado = Math.ceil(resultado / 1000) * 1000;

	document.getElementById('inptMonotCambioRefinanciamiento2').value = resultado;
	separadordemiles(document.getElementById('inptMonotCambioRefinanciamiento2'));
	separadordemiles(document.getElementById('inptTotalCuotaRefinanciamiento2'));
	separadordemiles(document.getElementById('inptEntregaRefinanciamiento2'));
}



function verificarrefinanciamientoenCuota(){	 
	var inptTotalCuotaRefinanciamiento2=document.getElementById('inptTotalCuotaRefinanciamiento2').value
	var inputSelectMetodoCambioRefinanciamiento2=document.getElementById('inputSelectMetodoCambioRefinanciamiento2').value
	var inptCuotaNroCambioRefinanciamiento2=document.getElementById('inptCuotaNroCambioRefinanciamiento2').value
	var inptMonotCambioRefinanciamiento2=document.getElementById('inptMonotCambioRefinanciamiento2').value
	var inptFechaVentaCambioRefinanciamiento2=document.getElementById('inptFechaVentaCambioRefinanciamiento2').value
	var inptDescuentoCambioRefinanciamiento2=document.getElementById('inptDescuentoCambioRefinanciamiento2').value
	var inptDiasGraciaRefinanciamiento2=document.getElementById('inptDiasGraciaRefinanciamiento2').value
	var inptInteresRefinanciamiento2=document.getElementById('inptInteresRefinanciamiento2').value	
	var inptEntregaRefinanciamiento2=document.getElementById('inptEntregaRefinanciamiento2').value	
  if(codVentaCambio==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO","#")
	  return false;
  }
  if(inptTotalCuotaRefinanciamiento2==""){
	ver_vetana_informativa("FALTO INGRESAR EL TOTAL FINANCIADO","#")
	  return false;
  }
   if(inptCuotaNroCambioRefinanciamiento2==""){
	ver_vetana_informativa("FALTO INGRESAR EL NRO DE CUOTA","#")
	  return false;
  }
  if(inptMonotCambioRefinanciamiento2==""){
	ver_vetana_informativa("FALTO INGRESAR EL MONTO A PAGAR","#")
	  return false;
  }
  if(inptFechaVentaCambioRefinanciamiento2==""){
	ver_vetana_informativa("FALTO INGRESAR LA FECHA DE PAGO","#")
	  return false;
  }
 abmrefinacimientoCuota(inptEntregaRefinanciamiento2,inptInteresRefinanciamiento2,inptDescuentoCambioRefinanciamiento2,inptTotalCuotaRefinanciamiento2,inputSelectMetodoCambioRefinanciamiento2,inptCuotaNroCambioRefinanciamiento2,inptMonotCambioRefinanciamiento2,inptFechaVentaCambioRefinanciamiento2,inptDiasGraciaRefinanciamiento2,codVentaCambio)
}
function abmrefinacimientoCuota(entrega,interes,descuento,total,metodopago,nroCuota,Monto,iniciopago,dias,cod_venta) {
	if(controlacceso("REFINANCIARVENTA","accion")==false){	   
	   //SIN PERMISO
	   return;
		}		
	verCerrarEfectoCargando("1")
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "refinanciarcuotas")
			 datos.append("cod_venta" , cod_venta)
			  datos.append("Monto" , Monto)
			 datos.append("metodopago" , metodopago)
			 datos.append("iniciopago" , iniciopago)
			 datos.append("nroCuota" , nroCuota)
			 datos.append("total" , total)
			 datos.append("dias" , dias)
			 datos.append("interes" , interes)
			 datos.append("descuento" , descuento)			
			 datos.append("entrega" , entrega)			
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
EXPEDIENTE
*/
function verCerrarInformeExpedientes(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInfExpediente").style.display==""){
	//  
	$("div[id=divInfExpediente]").fadeOut(500);	
	document.getElementById("divMinimizadoExpedienteCliente1").style.display="none"
	document.getElementById("divMinimizadoExpedienteCliente2").style.display="none"
	limpiarcamposexpedientesclientes()
	}else{		
	if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}	
mostrarSoloUno("divInfExpediente")		
		document.getElementById("divInfExpediente").style.display=""
 
	}
}
function limpiarcamposexpedientesclientes(){
	document.getElementById("inptBuscarInfExpedientefiltro").value=""
	document.getElementById("inptBuscarInfExpedienteNroDocumento").value=""
	document.getElementById("inptBuscarInfExpedienteNroTelef").value=""
	document.getElementById("inptRegistroNroExpVenta").value=""
	document.getElementById("inptTotalExpVenta").value=""
	document.getElementById("inptTotalPagExpVenta").value=""
	document.getElementById("inptTotalDeudaExpVenta").value=""
	document.getElementById("inptTotalDeudaExpVenta").value=""
	document.getElementById("inptRegistroNroExpVentaCancelado").value=""
	document.getElementById("inptTotalExpVentaCancelado").value=""
	document.getElementById("inptTotalPagExpVentaCancelado").value=""
	document.getElementById("inptRegistroNroExpProductosComprados").value=""
	document.getElementById("inptRegistroNroExpCambios").value=""
	document.getElementById("inptRegistroNroExpPagos").value=""
	document.getElementById("inptTotalDescExpPa").value=""
	document.getElementById("inptTotalInteresExpPa").value=""
	document.getElementById("inptTotalPagosExpPa").value=""
	document.getElementById("inptRegistroNroExpPagosPend").value=""
	document.getElementById("inptTotalDeudaExpPe").value=""
	document.getElementById("table_historial_expediente_ventas").innerHTML=""
	document.getElementById("table_historial_expediente_ventas_canceladas").innerHTML=""
	document.getElementById("table_historial_expediente_productos_comprados").innerHTML=""
	document.getElementById("table_historial_expediente_cambios").innerHTML=""
	document.getElementById("table_historial_expediente_pagos").innerHTML=""
	document.getElementById("table_historial_expediente_pagos_pendientes").innerHTML=""
	
	cod_ventaFK_expediente = '';
}
function minimizarexpedientecliente(){
	//  
	$("div[id=divInfExpediente]").fadeOut(500);	
	document.getElementById("divMinimizadoExpedienteCliente1").style.display=""
	document.getElementById("divMinimizadoExpedienteCliente2").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuExpedienteCliente1"));
}
function irAExtractodesdeVenta() {
	if (document.getElementById("inptRegistroSeleccHistorialVenta").value == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return
	}
	if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
		 document.getElementById("divHistorialVenta").style.display='none'
	verCerrarInformeExpedientes()
	document.getElementById('inptBuscarInfExpedientefiltro').value = $(elementoventa).children('td[id="td_datos_2"]').text();
	document.getElementById('inptBuscarInfExpedienteNroDocumento').value = $(elementoventa).children('td[id="td_datos_32"]').text();
	document.getElementById('inptBuscarInfExpedienteNroTelef').value = $(elementoventa).children('td[id="td_datos_34"]').text();
	codClienteFkExpediente = $(elementoventa).children('td[id="td_datos_10"]').text();	
	buscarexpediente()
}
function verCerrarVentanasExpedientes(d){
	document.getElementById("btnEspedientes1").style=''
	document.getElementById("btnEspedientes2").style=''
	document.getElementById("btnEspedientes3").style=''
	document.getElementById("btnEspedientes4").style='display:none'
	document.getElementById("btnEspedientes6").style=''
	document.getElementById("btnEspedientes7").style=''
	document.getElementById("btnEspedientes5").style=''
	document.getElementById("btnEspedientes8").style=''
	document.getElementById("btnEspedientes9").style=''
	document.getElementById("cntExpHistVenta").style.display='none'
	document.getElementById("cntExpHistPagos").style.display='none'
	document.getElementById("cntExpHistPagosPend").style.display='none'
	document.getElementById("cntExpHistCambios").style.display='none'
	document.getElementById("cntExpHistExtr").style.display='none'
	document.getElementById("cntExpHistVentaCancelada").style.display='none'
	document.getElementById("cntExpProductosComprados").style.display='none'
	document.getElementById("cntExpCreditoVenta").style.display='none'
	document.getElementById("cntVentaFinalizadas").style.display='none'
	document.getElementById("cntVentaPendientes").style.display='none'
	if(d=="1"){
		document.getElementById("btnEspedientes1").style='background-color:#FF9800;color:#fff'
		document.getElementById("cntExpHistVenta").style.display=''	}
	if(d=="2"){
		document.getElementById("btnEspedientes2").style='background-color:#FF9800;color:#fff'
			document.getElementById("cntExpHistPagos").style.display=''
	}	
	if(d=="3"){
		document.getElementById("btnEspedientes3").style='background-color:#FF9800;color:#fff'
			document.getElementById("cntExpHistPagosPend").style.display=''
	}
	if(d=="4"){
		document.getElementById("btnEspedientes4").style='background-color:#FF9800;color:#fff'
		document.getElementById("cntExpHistCambios").style.display=''
	}

	if(d=="6"){
		document.getElementById("btnEspedientes6").style='background-color:#FF9800;color:#fff'
		document.getElementById("cntExpHistVentaCancelada").style.display=''
	}
	if(d=="7"){
		document.getElementById("btnEspedientes7").style='background-color:#FF9800;color:#fff'
		document.getElementById("cntExpProductosComprados").style.display=''
	}
	
	if(d=="8"){
		document.getElementById("btnEspedientes8").style='background-color:#FF9800;color:#fff'
		document.getElementById("cntVentaFinalizadas").style.display=''
	}
	if(d=="9"){
		document.getElementById("btnEspedientes9").style='background-color:#FF9800;color:#fff'
		document.getElementById("cntVentaPendientes").style.display=''
	}
	
	if(d=="5"){
		if(cod_ventaFK_expediente ==''){
			verCerrarVentanasExpedientes('1')
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			return
		}
		buscarcreditosventaexpediente()
		document.getElementById("btnEspedientes5").style='background-color:#FF9800;color:#fff'
		document.getElementById("cntExpCreditoVenta").style.display=''
	}	
}
var codClienteFkExpediente="";
function buscarexpediente(){
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
 
	buscarexpedienteventa()
	buscarexpedienteventasfinalizadas()
	buscarexpedienteventaspendientes()
	buscarexpedienteCambios("Cambio")
	buscarexpedientepagos()
	buscarexpedientependientes()
	buscarexpedienteventascanceladas()
	buscarexpedienteproductosComprados()
	cod_ventaFK_expediente = '';
}
function buscarexpedienteventa(){ 
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 var zona=""
 document.getElementById("table_historial_expediente_ventas").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"zona": zona,
			"cliente": codClienteFkExpediente,
			"funt": "buscarexpedientes"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_expediente_ventas").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_expediente_ventas").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];		 
			document.getElementById("table_historial_expediente_ventas").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroExpVenta").value=datos[3];
			document.getElementById("inptTotalExpVenta").value=datos[4];
			document.getElementById("inptTotalPagExpVenta").value=datos[5];
			document.getElementById("inptTotalDeudaExpVenta").value=datos[6];	  
			
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
function buscarexpedienteventasfinalizadas(){ 
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 var zona=""
 document.getElementById("table_historial_expediente_ventas_finalizadas").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"zona": zona,
			"cliente": codClienteFkExpediente,
			"funt": "buscarexpedientesventasfinalizadas"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_expediente_ventas_finalizadas").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_expediente_ventas_finalizadas").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];		 
			document.getElementById("table_historial_expediente_ventas_finalizadas").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroExpVentaFinalizadas").value=datos[3];
			document.getElementById("inptTotalExpVentaFinalizadas").value=datos[4];
			document.getElementById("inptTotalPagExpVentaFinalizadas").value=datos[5];
			document.getElementById("inptTotalDeudaExpVentaFinalizadas").value=datos[6];	  
			
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
function buscarexpedienteventaspendientes(){ 
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 var zona=""
 document.getElementById("table_historial_expediente_ventas_finalizadas").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"zona": zona,
			"cliente": codClienteFkExpediente,
			"funt": "buscarexpedientesventaspendientes"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_expediente_ventas_finalizadas").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_expediente_ventas_finalizadas").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];		 
			document.getElementById("table_historial_expediente_ventas_pendientes").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroExpVentaPendientes").value=datos[3];
			document.getElementById("inptTotalExpVentaPendientes").value=datos[4];
			document.getElementById("inptTotalPagExpVentaPendientes").value=datos[5];
			document.getElementById("inptTotalDeudaExpVentaPendientes").value=datos[6];	  
			
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

function buscarexpedienteproductosComprados(){ 
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 var zona=""
 document.getElementById("table_historial_expediente_productos_comprados").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"zona": zona,
			"cliente": codClienteFkExpediente,
			"funt": "buscarexpedientes"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
			type:"post",
		
			beforeSend: function(){			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_expediente_productos_comprados").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_expediente_productos_comprados").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  		  
			 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {					
		  var datos_buscados=datos[2];		 
			document.getElementById("table_historial_expediente_productos_comprados").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroExpProductosComprados").value=datos[3];		
			
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
function buscarexpedienteventascanceladas(){
	if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 var zona=""
 document.getElementById("table_historial_expediente_ventas_canceladas").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"zona": zona,
			"cliente": codClienteFkExpediente,
			"funt": "buscarexpedientescancelados"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_expediente_ventas_canceladas").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_expediente_ventas_canceladas").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];		 
			document.getElementById("table_historial_expediente_ventas_canceladas").innerHTML=datos_buscados
			document.getElementById("inptRegistroNroExpVentaCancelado").value=datos[3];		
			document.getElementById("inptTotalExpVentaCancelado").value=datos[4];
			document.getElementById("inptTotalPagExpVentaCancelado").value=datos[5];	
			
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
function buscarexpedienteCambios(motivo){ 
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}

	document.getElementById("table_historial_expediente_cambios").innerHTML=paginacargando

 		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"motivo": motivo,
			"cliente": codClienteFkExpediente,
			"funt": "buscarexpedientescambios"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	
	document.getElementById("table_historial_expediente_cambios").innerHTML=""


			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
				
	document.getElementById("table_historial_expediente_cambios").innerHTML=""


			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"]; 			
 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
		  var datos_buscados=datos[2];
		 	
	document.getElementById("table_historial_expediente_cambios").innerHTML=datos_buscados
		document.getElementById("inptRegistroNroExpCambios").value=datos[3];



  
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
function buscarexpedientepagos(){ 
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 document.getElementById("table_historial_expediente_pagos").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": codClienteFkExpediente,
			"formato": "json",
			"funt": "buscarcuentasExpCobrados"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
			type:"post",
			 
		
			beforeSend: function(){			
						
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_expediente_pagos").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_expediente_pagos").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  		  
		 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {					
		  var datos_buscados=datos[2];		 
			renderExpedienteCreditos(datos_buscados, false)
			document.getElementById("inptRegistroNroExpPagos").value=datos[3];
			document.getElementById("inptTotalPagosExpPa").value=datos[4];
			document.getElementById("inptTotalDescExpPa").value=datos[5];
			document.getElementById("inptTotalInteresExpPa").value=datos[6];	
			
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
function buscarexpedientependientes(){ 
if(controlacceso("VEREXPEDIENTEDELCLIENTE","accion")==false){return;}		
if(codClienteFkExpediente==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
						return false;
}
 document.getElementById("table_historial_expediente_pagos_pendientes").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": codClienteFkExpediente,
			"formato": "json",
			"funt": "buscarccuentasExpPendientes"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
			type:"post",
			 
		
			beforeSend: function(){				
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_expediente_pagos_pendientes").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_expediente_pagos_pendientes").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  			
			 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
		  var datos_buscados=datos[2];		 
			renderExpedienteCreditos(datos_buscados, true)
			document.getElementById("inptRegistroNroExpPagosPend").value=datos[3];
			document.getElementById("inptTotalDeudaExpPe").value=datos[4];  
			
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
function buscarcreditosventaexpediente() {	
		if (cod_ventaFK_expediente== "") {
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			return
		}

document.getElementById('table_creditos_venta_expediente').innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_ventaFK": cod_ventaFK_expediente,
		"funt": "buscarcreditosexpediente_imprimir"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
document.getElementById('table_creditos_venta_expediente').innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				 document.getElementById('table_creditos_venta_expediente').innerHTML = ''
			   if (Respuesta == true) {				   
					paginaExtractoCuota = datos[2];

document.getElementById('table_creditos_venta_expediente').innerHTML = paginaExtractoCuota;

					document.getElementById("inptTotalPagadoCreditoVentaExp").value = datos[3];
					
					document.getElementById("inptTotalDeudaActualCreditoVentaExp").value= datos[4];
					document.getElementById("inptTotalInteresCreditoVentaExp").value = datos[7];
					
					
					DeudaActualRecibo=datos[4]
					ImportePagare = datos[3]
					InteresRecibo=datos[5]
					TotalDescuentoRecibo=datos[10]
		
					
					nombreClienteImprimir=datos[20]
					NroVentaClienteImprimir=datos[21]
					DetalleVentaClienteImprimir=datos[22]
					TipoVentaClienteImprimir=datos[23]
					FechaClienteImprimir=datos[24]
				
					
					ImprimirExtractoExpedienteCliente(datos[25],datos[26],datos[27],datos[28],datos[29],datos[30],paginaExtractoCuota,datos[31])
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var elementoVentaExpedienteCliente = '';
var cod_ventaFK_expediente = '';
function obtenerdatosexpendientecliente(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	cod_ventaFK_expediente = $(datostr).children('td[id="td_id_1"]').html();
	idFkVenta = cod_ventaFK_expediente;
	/* elementoVentaExpedienteCliente = datostr; */
	/* buscarcreditosexpediente_imprimir() */
	
}
function buscarcreditosexpediente_imprimir() {	
		if (idFkVenta== "") {
			ver_vetana_informativa("FALTO SELECCIONAR UNA VENTA")
			return
		}

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_ventaFK": idFkVenta,
		"funt": "buscarcreditosexpediente_imprimir"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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
					paginaExtractoCuota = datos[2];


					document.getElementById("inptTotalPagadoOpcionesPago").value = datos[3];
					document.getElementById("inptTotalDescuentoOpcionesPago").value = datos[10];
					document.getElementById("inptDeudaActual").value= datos[4];
					document.getElementById("inptTotalInteres").value = datos[7];
					
					
					DeudaActualRecibo=datos[4]
					ImportePagare = datos[3]
					InteresRecibo=datos[5]
					TotalDescuentoRecibo=datos[10]
		
					
					nombreClienteImprimir=datos[20]
					NroVentaClienteImprimir=datos[21]
					DetalleVentaClienteImprimir=datos[22]
					TipoVentaClienteImprimir=datos[23]
					FechaClienteImprimir=datos[24]
					
					ImprimirExtractoExpedienteCliente(datos[25],datos[26],datos[27],datos[28],datos[29],datos[30],paginaExtractoCuota,datos[31],datos[32]);
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function ImprimirExtractoExpedienteCliente(ZonaCliente,DireccionCliente,DocumentoCliente,GaranteCliente,TelefonGarante,CobradorCliente,paginaExtractoCuota,TelefonoCliente,deudaSinInteres) {
	var f = new Date();
	var dia =f.getDate()
	if(dia<10){
		dia="0"+dia;
	}
	var mes =f.getMonth()+1
	if(mes<10){
		mes="0"+mes;
	}
	var hora =f.getHours()
	if(hora<10){
		hora="0"+hora;
	}
	var min =f.getMinutes()
	if(min<10){
		min="0"+min;
	}
	if(document.getElementById("inptSeleccPuntoExpedicionVenta").value!=""){
		var nroF=document.getElementById("inptSeleccPuntoExpedicionVenta").value+"-"+document.getElementById("inptNroVenta").value
		}else{
		var nroF=document.getElementById("inptNroVenta").value
		}
    document.getElementById('pExtFechaImpresion').innerHTML=f.getFullYear()+"-"+mes+"-"+dia;
	
	document.getElementById("pExTotalPagado").innerHTML=document.getElementById("inptTotalPagadoOpcionesPago").value
	document.getElementById("pExTotalDesc").innerHTML=document.getElementById("inptTotalDescuentoOpcionesPago").value
	document.getElementById("pExDeudaAct").innerHTML=document.getElementById("inptDeudaActual").value
	document.getElementById("pExTotalInter").innerHTML=document.getElementById("inptTotalInteres").value
	document.getElementById("pExTotalDeudaSinInteres").innerHTML=deudaSinInteres
	
	
	document.getElementById("tbExtCuotas").innerHTML= paginaExtractoCuota 
	
	document.getElementById("pExtCliente").innerHTML=nombreClienteImprimir
	document.getElementById("pExtTipoVenta").innerHTML=TipoVentaClienteImprimir
	document.getElementById("pExtNroVenta").innerHTML=NroVentaClienteImprimir
	document.getElementById("pExtFecha").innerHTML=FechaClienteImprimir
	
	document.getElementById("pExtZona").innerHTML=ZonaCliente;
	document.getElementById("pExtDireccion").innerHTML= DireccionCliente;
	document.getElementById("pExtDocumento").innerHTML=DocumentoCliente;
	document.getElementById("pExtGarante").innerHTML=GaranteCliente;
	document.getElementById("pExtTelefonoGarante").innerHTML=TelefonGarante;
	document.getElementById("pExtCobrador").innerHTML=CobradorCliente;
	document.getElementById("pExtTelfCliente").innerHTML=TelefonoCliente;
	
	



		document.getElementById("tbExtProducto").innerHTML=DetalleVentaClienteImprimir
	var documento=document.getElementById("DivImprimirExtr").innerHTML;

	 localStorage.setItem("reporte", documento);
	   localStorage.setItem("tipo", "ticket");
	 window.open("/GoodVentaElectroCasaMaric/system/reportInformes.html");
	 document.getElementById("DivImprimir").innerHTML = "";
	/* document.getElementById("DivImprimir").innerHTML = cabecera + pagina;
	imprimirDiv() */
}


/*
COMPRAS
*/
var idAbmCompra = "";
function verCerrarAbmCompra(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCompra").style.display==""){
 
	$("div[id=divAbmCompra]").fadeOut(500);	
		document.getElementById("divMinimizadoCargarCompras1").style.display="none"
		document.getElementById("divMinimizadoCargarCompras2").style.display="none"
	}else{		
	if(controlacceso("VERCARGADECOMPRAS","accion")==false){return;} 
	mostrarSoloUno("divAbmCompra")	
		document.getElementById("divAbmCompra").style.display="" 
		limpiarCompras()
	}
}
function verCerrarAbmCompra2(){
	if(document.getElementById("divAbmCompra").style.display==""){
		 
	$("div[id=divAbmCompra]").fadeOut(500);	
		
			document.getElementById("divMinimizadoCargarCompras1").style.display="none"
		document.getElementById("divMinimizadoCargarCompras2").style.display="none"
		limpiarCompras()
	}else{		
		
	if(controlacceso("VERCARGADECOMPRAS","accion")==false){return;}
	
	mostrarSoloUno("divAbmCompra")	
			document.getElementById("divAbmCompra").style.display=""
		 
		// document.getElementById("TdCerrarCompras2").style.display=""
		// document.getElementById("TdCerrarCompras1").style.display="none"
	
	}

}
function minizarventaCompras(d){
	 
	$("div[id=divAbmCompra]").fadeOut(500);
	document.getElementById("divMinimizadoCargarCompras1").style.display=""
	document.getElementById("divMinimizadoCargarCompras2").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCompra1"));
}
function verCerrarOpcionCompra(d) {
	if (d == "1") {
		$("div[id=divOpcionesCompra]").fadeIn(250)
	} else {
		$("div[id=divOpcionesCompra]").fadeOut(250)
	}
}
function verificarcamposCompra() {
	var inptNrocompra = document.getElementById('inptNrocompra').value
	document.getElementById('inpCodCompra').value = document.getElementById('inptNrocompra').value;
	var inptFechaCompra = document.getElementById('inptFechaCompra').value
	var inptProveedorCompra = document.getElementById('inptProveedorCompra').value
	var inptlocalCompra = document.getElementById('inptlocalCompra').value
	var inptPagadocompra1 = document.getElementById('inptPagadocompra1').value
	var inptPagadocompra2 = document.getElementById('inptPagadocompra2').value
	var inptDescuentocompra = document.getElementById('inptDescuentocompra').value
	if (inptNrocompra == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE COMPRA")
		return false;
	}
	if (inptProveedorCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL PROVEEDOR")
		return false;
	}
	if (inptFechaCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE COMPRA")
		return false;
	}
	var accion = "";
	if (idAbmCompra != "") {
		accion = "editar";
		if(controlacceso("EDITARCARGADECOMPRAS","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("INSERTARCARGADECOMPRAS","accion")==false){return;}
	}
	abmcompra(inptNrocompra, inptFechaCompra, idAbmCompra, codProveedorCompra, inptlocalCompra,inptPagadocompra1,inptPagadocompra2,inptDescuentocompra, accion);
}
function abmcompra(num_comprobante, fecha_compra, cod_compra, cod_proveedorFK, cod_local,pagado1,pagado2,descuento ,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_compra", cod_compra)
	datos.append("fecha_compra", fecha_compra)
	datos.append("cod_proveedorFK", cod_proveedorFK)
	datos.append("num_comprobante", num_comprobante)
	datos.append("cod_local", cod_local)
	datos.append("pagado1", pagado1)
	datos.append("pagado2", pagado2)
	datos.append("descuento", descuento)
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
					idAbmCompra = datos["2"];
					verCerrarOpcionCompra("2")
					buscardetallescompra()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



function verificarcamposDetallesCompra() {
	var inptProductoCompra = document.getElementById('inptProductoCompra').value
	var inptCantProductoCompra = document.getElementById('inptCantProductoCompra').value
	var inptCostoProductoCompra = document.getElementById('inptCostoProductoCompra').value
	if (idFkProductocompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
		return false;
	}	
	var inptprecioListaProductoCompra = document.getElementById('inptprecioListaProductoCompra').value
	var inptNrocompra = document.getElementById('inptNrocompra').value
	var inptFechaCompra = document.getElementById('inptFechaCompra').value
	var inptProveedorCompra = document.getElementById('inptProveedorCompra').value
	var inptlocalCompra = document.getElementById('inptlocalCompra').value
	var inptPagadocompra1 = document.getElementById('inptPagadocompra1').value
	var inptPagadocompra2 = document.getElementById('inptPagadocompra2').value
	var inptDescuentocompra = document.getElementById('inptDescuentocompra').value
	if(inptDescuentocompra==''){inptDescuentocompra=0}
	
	
	var inptTipoCompra = document.getElementById('inptTipoCompra').value
	var inptTimbradocompra = document.getElementById('inptTimbradocompra').value
	var inptTipoFacturaCompra = document.getElementById('inptTipoFacturaCompra').value
	
	var editPrecioLista = ""
	
	if(document.getElementById('inptSeleccCambiarPrecio').checked==true){
		editPrecioLista="si"
	}else{
		editPrecioLista="no"
	}
	
	if (inptCantProductoCompra == "" || inptCantProductoCompra == "0") {
		ver_vetana_informativa("FALTO INGRESAR LA CANTIDAD")
		return false;
	}
	
	if (inptprecioListaProductoCompra == "") {
		ver_vetana_informativa("FALTO INGRESAR EL PRECIO DE LISTA")
		return false;
	}
	
	if (inptNrocompra == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE COMPRA")
		return false;
	}
	if (inptProveedorCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL PROVEEDOR")
		return false;
	}
	if (inptFechaCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE COMPRA")
		return false;
	}
	
    document.getElementById('inptlocalCompra').disabled=true
	if(controlacceso("INSERTARCARGADECOMPRAS","accion")==false){return;}
	var accion = "nuevo";
	abmDetalleCompra(inptTipoCompra,inptTimbradocompra,inptTipoFacturaCompra,editPrecioLista,inptprecioListaProductoCompra,inptNrocompra,inptFechaCompra,codProveedorCompra,inptlocalCompra,inptPagadocompra1,inptPagadocompra2,inptDescuentocompra,idAbmCompra, idFkProductocompra, inptCantProductoCompra, inptCostoProductoCompra, idDetalleCompra, accion);
}
function abmDetalleCompra(tipocompra,timbrado,tipofactura,editPrecioLista,precioLista,num_comprobante,fecha_compra,cod_proveedorFK,cod_local,pagado1,pagado2,descuento,cod_compraFK, cod_productoFK, cantidad_detalle_compra, precio_producto, cod_detalle_compra, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cantidad_detalle_compra", cantidad_detalle_compra)
	datos.append("precio_producto", precio_producto)
	datos.append("subTotal", 0)
	datos.append("cod_productoFK", cod_productoFK)
	datos.append("cod_compraFK", cod_compraFK)
	datos.append("cod_detalle_compra", cod_detalle_compra)
	datos.append("num_comprobante", num_comprobante)
	datos.append("fecha_compra", fecha_compra)
	datos.append("cod_proveedorFK", cod_proveedorFK)
	datos.append("cod_local", cod_local)
	datos.append("pagado1", pagado1)
	datos.append("pagado2", pagado2)
	datos.append("descuento", descuento)
	datos.append("precioLista", precioLista)
	datos.append("editPrecioLista", editPrecioLista)
	datos.append("tipocompra", tipocompra)
	datos.append("timbrado", timbrado)
	datos.append("tipofactura", tipofactura)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallecompra.php",
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
					idAbmCompra=datos["2"]
					verCerrarOpcionDetalleCompra("2")
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					document.getElementById("inptProductoCompra").value = ""
					document.getElementById("inptCantProductoCompra").value = ""
					document.getElementById("inptCostoProductoCompra").value = ""
					document.getElementById("btnAbmCompra").value = "Editar Datos"
					document.getElementById("btnAbmCompra").style.display = ""
					document.getElementById("btneditarproductocompras").style.backgroundColor="#ccc";
					document.getElementById("btneditarprecioscompras").style.backgroundColor="#ccc";
					document.getElementById("btnAddDetalleCompra").style.backgroundColor="#ccc";
					idFkProductocompra = ""
					buscardetallescompra();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}










function verificarcamposEditarCompra() {
	 	
	var inptNrocompra = document.getElementById('inptNrocompra').value
	var inptFechaCompra = document.getElementById('inptFechaCompra').value
	var inptProveedorCompra = document.getElementById('inptProveedorCompra').value
	var inptlocalCompra = document.getElementById('inptlocalCompra').value
	var inptDescuentocompra = document.getElementById('inptDescuentocompra').value
	
	var inptTipoCompra = document.getElementById('inptTipoCompra').value
	var inptTimbradocompra = document.getElementById('inptTimbradocompra').value
	var inptTipoFacturaCompra = document.getElementById('inptTipoFacturaCompra').value
 
	if (inptNrocompra == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE COMPRA")
		return false;
	}
	if (inptProveedorCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL PROVEEDOR")
		return false;
	}
	if (inptFechaCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE COMPRA")
		return false;
	}
    document.getElementById('inptlocalCompra').disabled=true
	if(controlacceso("EDITARCARGADECOMPRAS","accion")==false){return;}
	var accion = "EditarCompra";
	abmEditarCompra(inptTipoCompra,inptTimbradocompra,inptTipoFacturaCompra,inptNrocompra,inptFechaCompra,codProveedorCompra,inptlocalCompra,inptDescuentocompra,idAbmCompra,accion);
}
function abmEditarCompra(tipocompra,timbrado,tipofactura,num_comprobante,fecha_compra,cod_proveedorFK,cod_local,descuento,cod_compraFK,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_compraFK", cod_compraFK)
	datos.append("num_comprobante", num_comprobante)
	datos.append("fecha_compra", fecha_compra)
	datos.append("cod_proveedorFK", cod_proveedorFK)
	datos.append("cod_local", cod_local) 
	datos.append("descuento", descuento)
	datos.append("tipocompra", tipocompra)
	datos.append("timbrado", timbrado)
	datos.append("tipofactura", tipofactura)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallecompra.php",
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
					idAbmCompra=datos["2"]
					verCerrarOpcionDetalleCompra("2")
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
 
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}













var listadoDetalleCompra = null;
var listadoDetalleHistorialCompra = null;

function obtenerFilaCabeceraDetalleCompra(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo)
	if (!cuerpo) return null
	var tabla = cuerpo.previousElementSibling
	while (tabla && (tabla.tagName !== "TABLE" || tabla.querySelector("input,select,textarea"))) {
		tabla = tabla.previousElementSibling
	}
	if (!tabla || !tabla.rows || !tabla.rows[0]) return null
	tabla.rows[0].id = idCabecera
	return tabla.rows[0]
}

function iniciarListadoDetalleCompra() {
	if (listadoDetalleCompra || !window.AbmListadoCore) return listadoDetalleCompra
	if (!obtenerFilaCabeceraDetalleCompra("table_abm_detalle_compra", "cabeceraDetalleCompra")) return null
	listadoDetalleCompra = window.AbmListadoCore.crear({
		nombre: "detalle_compra",
		idCabecera: "cabeceraDetalleCompra",
		idCuerpo: "table_abm_detalle_compra",
		columnas: [
			{ campo: "nombre_producto", titulo: "PRODUCTO", ancho: "10%" },
			{ campo: "precio_producto", titulo: "COSTO", ancho: "10%" },
			{ campo: "cantidad", titulo: "CANT.", ancho: "10%" },
			{ campo: "subtotal", titulo: "TOTAL", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmdetallecompra",
			atributosFila: function (registro) {
				return { dataset: { detalleCompra: registro.cod_detalle_compra || "" } }
			},
			celdas: [
				{ id: "td_datos_1", campo: "nombre_producto", columna: "nombre_producto" },
				{ id: "td_datos_2", campo: "precio_producto_formateado", columna: "precio_producto" },
				{ id: "td_datos_3", campo: "cantidad_formateada", columna: "cantidad" },
				{ id: "td_datos_4", campo: "subtotal_formateado", columna: "subtotal" },
				{ id: "td_id_1", campo: "cod_producto", tecnica: true },
				{ id: "td_id_2", campo: "cod_detalle_compra", tecnica: true }
			]
		},
		despuesRender: function (contenedor) {
			if (!idDetalleCompra) return
			Array.prototype.some.call(contenedor.querySelectorAll("tr[data-detalle-compra]"), function (fila) {
				if (String(fila.getAttribute("data-detalle-compra") || "") !== String(idDetalleCompra)) return false
				fila.className = "tableRegistroSelec"
				return true
			})
		}
	})
	listadoDetalleCompra.iniciar()
	return listadoDetalleCompra
}

function iniciarListadoDetalleHistorialCompra() {
	if (listadoDetalleHistorialCompra || !window.AbmListadoCore) return listadoDetalleHistorialCompra
	if (!obtenerFilaCabeceraDetalleCompra("table_detalles_historial_compra", "cabeceraDetalleHistorialCompra")) return null
	listadoDetalleHistorialCompra = window.AbmListadoCore.crear({
		nombre: "detalle_historial_compra",
		idCabecera: "cabeceraDetalleHistorialCompra",
		idCuerpo: "table_detalles_historial_compra",
		columnas: [
			{ campo: "cod_producto", titulo: "COD. PRODUCTO", ancho: "10%" },
			{ campo: "nombre_producto", titulo: "PRODUCTO", ancho: "20%" },
			{ campo: "precio_producto", titulo: "COSTO UNT.", ancho: "10%" },
			{ campo: "cantidad", titulo: "CANT.", ancho: "10%" },
			{ campo: "subtotal", titulo: "SUBTOTAL", ancho: "10%" }
		],
		fila: {
			celdas: [
				{ id: "td_datos_1", campo: "cod_producto", columna: "cod_producto" },
				{ id: "td_datos_1", campo: "nombre_producto", columna: "nombre_producto" },
				{ id: "td_datos_2", campo: "precio_producto_formateado", columna: "precio_producto" },
				{ id: "td_datos_3", campo: "cantidad_formateada", columna: "cantidad" },
				{ id: "td_datos_4", campo: "subtotal_formateado", columna: "subtotal" }
			]
		}
	})
	listadoDetalleHistorialCompra.iniciar()
	return listadoDetalleHistorialCompra
}

function buscardetallescompra() {
	
	var listado = iniciarListadoDetalleCompra()
	if (listado) listado.establecerRegistros([], false)
	document.getElementById("table_abm_detalle_compra").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idAbmCompra,
		"formato": listado ? "json" : "html",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallecompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([], false)
			else document.getElementById("table_abm_detalle_compra").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (listado) listado.establecerRegistros([], false)
			else document.getElementById("table_abm_detalle_compra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {		
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_abm_detalle_compra").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalCompra").value=datos[3]
					document.getElementById("inptTotalRegistro").value=datos[4]
					document.getElementById('inptDescuentocompra').value=datos[6];
					document.getElementById('inptDescuenCompra').value=datos[6];
	        	    document.getElementById('inptSubTotalCompra').value=datos[5];
	        	    document.getElementById('btnAddPagosCompas').style.backgroundColor='#4CAF50';
	        	    document.getElementById('btnEditarCompas').style.backgroundColor='#4CAF50';
	        	    document.getElementById('btnEliminarCompas').style.backgroundColor='#FF5722';
	        	    document.getElementById('btnAgregarArchivoCompra').style.backgroundColor='green';
					
					}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}
function verCerrarOpcionEliminarCompra(d) {
	if (d == "1") {
			if(controlacceso("ELIMINARCOMPRA","accion")==false){return;}
		if(idAbmCompra==""){
			ver_vetana_informativa("FALTO SELECCIONAR UNA COMPRA O INICIALIZAR UNA NUEVA COMPRA")
					return false;
		}		
		document.getElementById('inptNroCompraEliminar').value=document.getElementById('inptNrocompra').value
		document.getElementById("divOpcionesEliminarCompra").style.display=""
		  
	
	} else {
		 
		$("div[id=divOpcionesEliminarCompra]").fadeOut(250)
	}
}
function EliminarEstaCompra() {
	var motivo=document.getElementById('inptMotivoEliminarCompra').value
	if(motivo==""){
		ver_vetana_informativa("FALTO INGRESAR EL MOTIVO")
		return
	}
if(idAbmCompra==""){
			ver_vetana_informativa("FALTO SELECCIONAR UNA COMPRA O INICIALIZAR UNA NUEVA COMPRA")
					return false;
		}	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "eliminarcompra")
	datos.append("idAbmCompra", idAbmCompra)
	datos.append("motivo", motivo)
	
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
					limpiarCompras()
					verCerrarOpcionEliminarCompra("2")

				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}




var listadoPagosCompra = null;
var listadoVistaCompras = null;
var listadoHistorialCompras = null;
var listadoPagosHistorialCompra = null;
var codCompraSeleccionadaListado = "";

function obtenerTablaCabeceraEnNodoCompra(nodo) {
	if (!nodo) return null
	var tablas = nodo.tagName === "TABLE" ? [nodo] : nodo.querySelectorAll ? nodo.querySelectorAll("table") : []
	for (var i = 0; i < tablas.length; i++) {
		if (!tablas[i].querySelector("input,select,textarea") && tablas[i].rows && tablas[i].rows[0]) return tablas[i]
	}
	return null
}

function obtenerFilaCabeceraListadoCompra(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo)
	if (!cuerpo) return null
	var nodo = cuerpo.previousElementSibling
	while (nodo) {
		var tabla = obtenerTablaCabeceraEnNodoCompra(nodo)
		if (tabla) {
			tabla.rows[0].id = idCabecera
			return tabla.rows[0]
		}
		nodo = nodo.previousElementSibling
	}
	var contenedor = cuerpo.parentElement
	if (contenedor) nodo = contenedor.previousElementSibling
	while (nodo) {
		var tablaAnterior = obtenerTablaCabeceraEnNodoCompra(nodo)
		if (tablaAnterior) {
			tablaAnterior.rows[0].id = idCabecera
			return tablaAnterior.rows[0]
		}
		nodo = nodo.previousElementSibling
	}
	return null
}

function crearBotonArchivoCompra(url) {
	if (!url) return ""
	var boton = document.createElement("input")
	boton.type = "button"
	boton.value = "VER"
	boton.className = "btn4"
	boton.style.width = "50px"
	boton.addEventListener("click", function () {
		verdocumentoClienteSolicitud(url)
	})
	return boton
}

function iniciarListadoPagosCompra() {
	if (listadoPagosCompra || !window.AbmListadoCore) return listadoPagosCompra
	if (!obtenerFilaCabeceraListadoCompra("table_vista_pagos_compra", "cabeceraPagosCompra")) return null
	listadoPagosCompra = window.AbmListadoCore.crear({
		nombre: "pagos_compra",
		idCabecera: "cabeceraPagosCompra",
		idCuerpo: "table_vista_pagos_compra",
		columnas: [
			{ campo: "nro_cheque", titulo: "NRO CHEQUE", ancho: "15%" },
			{ campo: "monto", titulo: "MONTO", ancho: "15%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "15%" },
			{ campo: "fecha_a_pagar", titulo: "FECHA A PAGAR", ancho: "15%" },
			{ campo: "fecha_pago", titulo: "FECHA DEL PAGO", ancho: "15%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "15%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatoshistorialpago",
			atributosFila: function (registro) { return { dataset: { pagoCompra: registro.cod_pago || "" } } },
			celdas: [
				{ id: "td_datos_1", campo: "cod_pago", tecnica: true },
				{ id: "td_datos_7", campo: "nro_cheque", columna: "nro_cheque" },
				{ id: "td_datos_2", campo: "monto_formateado", columna: "monto" },
				{ id: "td_datos_3", campo: "tipo", columna: "tipo" },
				{ id: "td_datos_4", campo: "fecha_a_pagar", columna: "fecha_a_pagar" },
				{ id: "td_datos_5", campo: "fecha_pago", columna: "fecha_pago" },
				{ id: "td_datos_6", campo: "estado", columna: "estado" },
				{ id: "td_datos_100", campo: "insertado_por", tecnica: true },
				{ id: "td_datos_101", campo: "editado_por", tecnica: true },
				{ id: "td_datos_102", campo: "fecha_insert", tecnica: true },
				{ id: "td_datos_103", campo: "fecha_edit", tecnica: true }
			]
		},
		despuesRender: function (contenedor) {
			if (!idAbmPagoCompra) return
			Array.prototype.some.call(contenedor.querySelectorAll("tr[data-pago-compra]"), function (fila) {
				if (String(fila.getAttribute("data-pago-compra") || "") !== String(idAbmPagoCompra)) return false
				fila.className = "tableRegistroSelec"
				return true
			})
		}
	})
	listadoPagosCompra.iniciar()
	return listadoPagosCompra
}

function iniciarListadoVistaCompras() {
	if (listadoVistaCompras || !window.AbmListadoCore) return listadoVistaCompras
	if (!obtenerFilaCabeceraListadoCompra("table_vista_compras", "cabeceraVistaCompras")) return null
	listadoVistaCompras = window.AbmListadoCore.crear({
		nombre: "vista_compras",
		idCabecera: "cabeceraVistaCompras",
		idCuerpo: "table_vista_compras",
		columnas: [
			{ campo: "num_comprobante", titulo: "NRO COMPRAS", ancho: "10%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "30%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" },
			{ campo: "fecha_compra", titulo: "FECHA", ancho: "10%" },
			{ campo: "total", titulo: "TOTAL", ancho: "10%" },
			{ campo: "tipo_compra", titulo: "TIPO COMPRA", ancho: "10%" },
			{ campo: "timbrado", titulo: "TIMBRADO", ancho: "10%" },
			{ campo: "tipo_factura", titulo: "TIPO FACTURA", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosacompravista",
			celdas: [
				{ id: "td_datos_1", campo: "num_comprobante", columna: "num_comprobante" },
				{ id: "td_datos_3", campo: "proveedor", columna: "proveedor" },
				{ campo: "local", columna: "local" },
				{ id: "td_datos_2", campo: "fecha_compra", columna: "fecha_compra" },
				{ id: "td_datos_7", campo: "subtotal_formateado", tecnica: true },
				{ id: "td_datos_8", campo: "descuento_formateado", tecnica: true },
				{ id: "td_datos_4", campo: "total_formateado", columna: "total" },
				{ id: "td_datos_9", campo: "pagado_efectivo_formateado", tecnica: true },
				{ id: "td_datos_10", campo: "pagado_cheque_formateado", tecnica: true },
				{ id: "td_datos_12", campo: "total_pagados_formateado", tecnica: true },
				{ id: "td_datos_5", campo: "cod_compra", tecnica: true },
				{ id: "td_datos_6", campo: "cod_proveedor", tecnica: true },
				{ id: "td_datos_11", campo: "cod_local", tecnica: true },
				{ id: "td_datos_13", campo: "tipo_compra", columna: "tipo_compra" },
				{ id: "td_datos_14", campo: "timbrado", columna: "timbrado" },
				{ id: "td_datos_15", campo: "tipo_factura", columna: "tipo_factura" }
			]
		}
	})
	listadoVistaCompras.iniciar()
	return listadoVistaCompras
}

function iniciarListadoHistorialCompras() {
	if (listadoHistorialCompras || !window.AbmListadoCore) return listadoHistorialCompras
	if (!obtenerFilaCabeceraListadoCompra("table_historial_compra", "cabeceraHistorialCompras")) return null
	listadoHistorialCompras = window.AbmListadoCore.crear({
		nombre: "historial_compras",
		idCabecera: "cabeceraHistorialCompras",
		idCuerpo: "table_historial_compra",
		idOpcionesColumnas: "hcColumnasHistorialCompra",
		ordenable: true,
		columnas: [
			{ campo: "num_comprobante", titulo: "NRO. FACT", ancho: "5%" },
			{ campo: "fecha_compra", titulo: "FECHA COMPRA", ancho: "10%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "10%" },
			{ campo: "tipo_compra", titulo: "TIPO", ancho: "5%" },
			{ campo: "subtotal", titulo: "SUBTOTAL", ancho: "10%" },
			{ campo: "descuento", titulo: "DESCUENTO", ancho: "10%" },
			{ campo: "total", titulo: "TOTAL", ancho: "10%" },
			{ campo: "total_pagado", titulo: "T. PAGADO", ancho: "10%" },
			{ campo: "total_pendiente", titulo: "P. PENDIENTE", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" },
			{ campo: "url", titulo: "ARCHIVO", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosacompra",
			atributosFila: function (registro) { return { dataset: { compra: registro.cod_compra || "" } } },
			celdas: [
				{ id: "td_datos_1", campo: "num_comprobante", columna: "num_comprobante" },
				{ id: "td_datos_2", campo: "fecha_compra", columna: "fecha_compra" },
				{ id: "td_datos_3", campo: "proveedor", columna: "proveedor" },
				{ id: "td_datos_15", campo: "tipo_compra", columna: "tipo_compra" },
				{ id: "td_datos_7", campo: "subtotal_formateado", columna: "subtotal" },
				{ id: "td_datos_8", campo: "descuento_formateado", columna: "descuento" },
				{ id: "td_datos_4", campo: "total_formateado", columna: "total" },
				{ id: "td_datos_9", campo: "total_pagado_formateado", columna: "total_pagado" },
				{ id: "td_datos_10", campo: "total_pendiente_formateado", columna: "total_pendiente" },
				{ campo: "local", columna: "local" },
				{ campo: "url", columna: "url", render: function (valor) { return crearBotonArchivoCompra(valor) } },
				{ id: "td_datos_5", campo: "cod_compra", tecnica: true },
				{ id: "td_datos_6", campo: "cod_proveedor", tecnica: true },
				{ id: "td_datos_11", campo: "cod_local", tecnica: true },
				{ id: "td_datos_12", campo: "total_pagos_formateado", tecnica: true },
				{ id: "td_datos_100", campo: "insertado_por", tecnica: true },
				{ id: "td_datos_101", campo: "editado_por", tecnica: true },
				{ id: "td_datos_102", campo: "fecha_insert", tecnica: true },
				{ id: "td_datos_103", campo: "fecha_edit", tecnica: true }
			]
		},
		despuesRender: function (contenedor) {
			if (!codCompraSeleccionadaListado) return
			Array.prototype.some.call(contenedor.querySelectorAll("tr[data-compra]"), function (fila) {
				if (String(fila.getAttribute("data-compra") || "") !== String(codCompraSeleccionadaListado)) return false
				fila.className = "tableRegistroSelec"
				elementocompra = fila
				return true
			})
		}
	})
	listadoHistorialCompras.iniciar()
	return listadoHistorialCompras
}

function iniciarListadoPagosHistorialCompra() {
	if (listadoPagosHistorialCompra || !window.AbmListadoCore) return listadoPagosHistorialCompra
	if (!obtenerFilaCabeceraListadoCompra("table_pagos_historial_compra", "cabeceraPagosHistorialCompra")) return null
	listadoPagosHistorialCompra = window.AbmListadoCore.crear({
		nombre: "pagos_historial_compra",
		idCabecera: "cabeceraPagosHistorialCompra",
		idCuerpo: "table_pagos_historial_compra",
		columnas: [
			{ campo: "monto", titulo: "MONTO", ancho: "15%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "15%" },
			{ campo: "fecha_a_pagar", titulo: "FECHA A PAGAR", ancho: "15%" },
			{ campo: "fecha_pago", titulo: "FECHA DEL PAGO", ancho: "15%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "15%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatospagohistorial",
			celdas: [
				{ id: "td_datos_1", campo: "cod_pago", tecnica: true },
				{ id: "td_datos_2", campo: "monto_formateado", columna: "monto" },
				{ id: "td_datos_3", campo: "tipo", columna: "tipo" },
				{ id: "td_datos_4", campo: "fecha_a_pagar", columna: "fecha_a_pagar" },
				{ id: "td_datos_5", campo: "fecha_pago", columna: "fecha_pago" },
				{ id: "td_datos_6", campo: "estado", columna: "estado" },
				{ id: "td_datos_100", campo: "insertado_por", tecnica: true },
				{ id: "td_datos_101", campo: "editado_por", tecnica: true },
				{ id: "td_datos_102", campo: "fecha_insert", tecnica: true },
				{ id: "td_datos_103", campo: "fecha_edit", tecnica: true }
			]
		}
	})
	listadoPagosHistorialCompra.iniciar()
	return listadoPagosHistorialCompra
}

function verCerrarOpcionPagosCompra(d) {
	if (d == "1") {
			if(controlacceso("CARGARPAGOS","accion")==false){return;}
		if(idAbmCompra==""){
			ver_vetana_informativa("FALTO SELECCIONAR UNA COMPRA O INICIALIZAR UNA NUEVA COMPRA")
					return false;
		}		
		limpiarCamposPagosCompra()
		document.getElementById("divCargarPagosCompra").style.display=""
		  
		buscarhistorialdepagocompra()
	} else {
		 
		$("div[id=divCargarPagosCompra]").fadeOut(250)
	}
}
var idAbmPagoCompra="";
function limpiarCamposPagosCompra(){
	document.getElementById("inptMontoPagoCompra").value=""
	document.getElementById("inptNroChequePagoCompra").value=""
	document.getElementById("inptEstadoPagoCompra").value="Pagado"
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaPagoCompra').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById('inptFechadelPagoCompra').value = f.getFullYear() + "-" + mes + "-" + dia;
	idAbmPagoCompra="";
		document.getElementById("btnEliminarHistorialPago").style.display="none";
	document.getElementById("btnAddPagoCompra").value="Guardar"
	document.getElementById("inptMontoPagoCompra").style.width="295px";
}
function checkTipoPagoCompra(d){
	if(d=="1"){
	document.getElementById('inptSeleccTipoPagoCompra1').checked=true
		document.getElementById('inptSeleccTipoPagoCompra2').checked=false	
			document.getElementById("tbNroCheque").style.display="none";
	}else{
		
		document.getElementById('inptSeleccTipoPagoCompra1').checked=false
		document.getElementById('inptSeleccTipoPagoCompra2').checked=true
			document.getElementById("tbNroCheque").style.display="";
	}
}
function verificarpagoscompras() {
	var inptMontoPagoCompra = document.getElementById('inptMontoPagoCompra').value
	var inptEstadoPagoCompra = document.getElementById('inptEstadoPagoCompra').value
	var inptFechaPagoCompra = document.getElementById('inptFechaPagoCompra').value
	var inptFechadelPagoCompra = document.getElementById('inptFechadelPagoCompra').value
	var inptNroChequePagoCompra = document.getElementById('inptNroChequePagoCompra').value
   if(inptMontoPagoCompra==""){
	   ver_vetana_informativa("FALTO INGRESAR UN MONTO")
		return false;
   }
   
   if(document.getElementById('inptSeleccTipoPagoCompra1').checked==true){
	   var inptTipoPagoCompra="Efectivo";
   }else{
	    var inptTipoPagoCompra="Cheque";
   }
   if(inptTipoPagoCompra==""){
	   ver_vetana_informativa("FALTO SELECCIONAR EL TIPO DE PAGO")
		return false;
   }
   if(inptFechadelPagoCompra==""){
	   ver_vetana_informativa("FALTO SELECCIONAR LA FECHA A PAGO")
		return false;
   }
   if(inptFechadelPagoCompra==""){
	   ver_vetana_informativa("FALTO SELECCIONAR EL TIPO DE PAGO")
		return false;
   }
	var accion = "";
	if (idAbmPagoCompra != "") {
		accion = "editarpago";
	if(controlacceso("EDITARPAGOS","accion")==false){return;}
	} else {
		accion = "nuevopago";
		if(controlacceso("CARGARPAGOS","accion")==false){return;}
	}
	abmPagoDeCompra(inptNroChequePagoCompra,inptMontoPagoCompra,inptTipoPagoCompra,inptEstadoPagoCompra,inptFechaPagoCompra,inptFechadelPagoCompra,idAbmPagoCompra,idAbmCompra, accion);
}
function eliminarEstePagoVenta(){
	if(controlacceso("ELIMINARPAGOS","accion")==false){return;}
		abmPagoDeCompra("10","x","x","x","x","x",idAbmPagoCompra,"x", "eliminarpago");
}
function abmPagoDeCompra(nrocheque,monto,tipo,estado,fechaapagar,fechadelpago,codpago,cod_compraFk, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("monto", monto)
	datos.append("tipo", tipo)
	datos.append("estado", estado)
	datos.append("fechaapagar", fechaapagar)
	datos.append("fechadelpago", fechadelpago)
	datos.append("codpago", codpago)
	datos.append("cod_compraFk", cod_compraFk)
	datos.append("nrocheque", nrocheque)
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
					limpiarCamposPagosCompra()
					buscarhistorialdepagocompra()

				}
				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscarhistorialdepagocompra() { 
		 var listado = iniciarListadoPagosCompra()
		 if(listado) listado.establecerRegistros([], false)
		 document.getElementById("table_vista_pagos_compra").innerHTML=paginacargando
		 	document.getElementById("inptTotalRegistroPagoCompra").value =""
		 	document.getElementById("inptTotalPagoCompra").value =""
		 	document.getElementById("inptTotalPagodoPagoCompra").value =""
		 	document.getElementById("inptTotalPendientePagoCompra").value =""
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idAbmCompra,
			"formato": listado ? "json" : "html",
			"funt": "buscarpagoscompra"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_vista_pagos_compra").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_vista_pagos_compra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_vista_pagos_compra").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistroPagoCompra").value =datos[3];
		 	        document.getElementById("inptTotalPagoCompra").value  =datos[4];
		 	        document.getElementById("inptPagosRealizadoscompra").value  =datos[4];
		 	        document.getElementById("inptTotalPagodoPagoCompra").value =datos[5];
		 	         document.getElementById("inptTotalPendientePagoCompra").value =datos[6];
					 
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function obtenerdatoshistorialpago(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	idAbmPagoCompra = $(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById("inptMontoPagoCompra").value = $(datostr).children('td[id="td_datos_2"]').text();
	inptTipoPagoCompra = $(datostr).children('td[id="td_datos_3"]').text();
	if(inptTipoPagoCompra=="Efectivo"){
		checkTipoPagoCompra("1")
	}else{
		checkTipoPagoCompra("2")
	}
	
	document.getElementById("inptFechaPagoCompra").value = $(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById("inptFechadelPagoCompra").value = $(datostr).children('td[id="td_datos_5"]').text();
	document.getElementById("inptEstadoPagoCompra").value = $(datostr).children('td[id="td_datos_6"]').text();
	document.getElementById("inptNroChequePagoCompra").value = $(datostr).children('td[id="td_datos_7"]').text();
	document.getElementById("btnEliminarHistorialPago").style.display="";
	document.getElementById("inptMontoPagoCompra").style.width="150px";
document.getElementById("btnAddPagoCompra").value="Editar"
}
function verCerrarOpcionDetalleCompra(d) {
	if (d == "1") {
				if(controlacceso("EDITARCARGADECOMPRAS","accion")==false){return;}
		$("div[id=divOpcionesDetallesCmpra]").fadeIn(250)

	} else {
		$("div[id=divOpcionesDetallesCmpra]").fadeOut(250)
	}
}
var cantidaDetalleSelecCompra = "";
var codproductodetalleSelectCompra = "";
var idDetalleCompra = "";
function obtenerdatosabmdetallecompra(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptCodDetalleCompra').value = $(datostr).children('td[id="td_id_2"]').text();
	document.getElementById('inptNombreProductoDetalleCompra').value = $(datostr).children('td[id="td_datos_1"]').text();
	idDetalleCompra = $(datostr).children('td[id="td_id_2"]').text();
	cantidaDetalleSelecCompra = $(datostr).children('td[id="td_datos_3"]').text();
	codproductodetalleSelectCompra = $(datostr).children('td[id="td_id_1"]').text();
	verCerrarOpcionDetalleCompra("1")
}
function eliminarDetalleCompra() {
	if (idDetalleCompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
		if(controlacceso("EDITARCARGADECOMPRAS","accion")==false){return;}
		var inptlocalCompra = document.getElementById('inptlocalCompra').value
			
	abmDetalleCompra("0","0","0","0","0","0","0","0",inptlocalCompra,"0","0","0",idAbmCompra, codproductodetalleSelectCompra, cantidaDetalleSelecCompra, "0", idDetalleCompra, "quitar");
}
function limpiarCompras() {
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaCompra').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById('inptNrocompra').value = ""
	document.getElementById('inpCodCompra').value = "";
	document.getElementById('inptProveedorCompra').value = ""
	document.getElementById('inptPagadocompra1').value = ""
	document.getElementById('inptDescuentocompra').value = ""
	document.getElementById('inptPagosRealizadoscompra').value = ""
	document.getElementById('inptPagadocompra2').value = ""
	
	document.getElementById('inptTimbradocompra').value = ""
	document.getElementById('inptTipoCompra').value = "CONTADO"
	document.getElementById('inptTipoFacturaCompra').value = "FACTURA LEGAL"
	
	document.getElementById('inptprecioListaProductoCompra').value = ""
	document.getElementById("table_vista_producto_compra").innerHTML=""
	if (listadoDetalleCompra) listadoDetalleCompra.establecerRegistros([], false)
	else document.getElementById("table_abm_detalle_compra").innerHTML=""
	 document.getElementById('inptlocalCompra').disabled=false
	idAbmCompra = "";
	document.getElementById("inptProductoCompra").value = ""
	document.getElementById("inptCantProductoCompra").value = ""
	document.getElementById("inptCostoProductoCompra").value = ""
	document.getElementById("inptTotalRegistro").value = ""
	document.getElementById("inptTotalCompra").value = "0"
	document.getElementById("inptDescuenCompra").value = "0"
	document.getElementById("inptSubTotalCompra").value = "0"
	document.getElementById("inptTotalRegistro").value = "0"
	document.getElementById("btneditarproductocompras").style.backgroundColor="#ccc";
		document.getElementById("btneditarprecioscompras").style.backgroundColor="#ccc";
		document.getElementById("btnAddDetalleCompra").style.backgroundColor="#ccc";
		document.getElementById("btnAddPagosCompas").style.backgroundColor="#ccc";
		document.getElementById("btnEditarCompas").style.backgroundColor="#ccc";
		document.getElementById("btnEliminarCompas").style.backgroundColor="#ccc";
		document.getElementById("btnAgregarArchivoCompra").style.backgroundColor="#ccc";
	document.getElementById("btnAbmCompra").value = "Guardar Datos"
					document.getElementById("btnAbmCompra").style.display = "none"
	idFkProductocompra = ""
	seleccionarLocalUSer()
	buscarnrodecompras()
}
function buscarnrodecompras() {
	document.getElementById("inptNrocompra").value = "..."
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarnro"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptNrocompra").value = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptNrocompra").value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {		
					document.getElementById("inptNrocompra").value = datos[2]
					
					}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

}

// CARGAR ARCHIVO COMPRA
function ExploradorPDFCompra(File){	
if(idAbmCompra == ''){
	ver_vetana_informativa('FALTÓ INICIAR UNA COMPRA');
	return;
}
$("input[name="+File+"]").click();
}
var pdfcompra="";
function readFileCompra(input){
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();

if (file_extension != "pdf"){
ver_vetana_informativa("EL ARCHIVO SELECCIONADO NO ES PDF")
return false;
}
// console.log('segmento carga archivo')
pdfcompra = input.files[0];
cargararchivocompra();
}
function cargararchivocompra() {
	// console.log('segmento carga archivo funcion')
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", 'cargarpdf')
	datos.append("pdf", pdfcompra)
	datos.append("cod_compra", idAbmCompra)
	
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
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...");
					
					pdfcompra="";
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
VISTA COMPRA
*/
function vercerrarvistacompras(d){
		

	if (d == "1") {
			
		$("div[id=divVistaCompras]").fadeIn(250)	
		 
	
	} else {
		//$("div[id=divVistaCompras]").fadeOut(250)
		 
$("div[id=divVistaCompras]").fadeOut(500);	
	}
}
function buscarvistacompras() {
var listado = iniciarListadoVistaCompras()
var buscar = document.getElementById('inptBuscarVistaCompras').value
var local = document.getElementById('inputSelectLocalVistaCompra').value
		 if(listado) listado.establecerRegistros([], false)
		 document.getElementById("table_vista_compras").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": buscar,
			"local": local,
			"formato": listado ? "json" : "html",
			"funt": "buscarvista"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_vista_compras").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_vista_compras").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_vista_compras").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
				}				
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function obtenerdatosacompravista(datostr) {
	document.getElementById('inptNrocompra').value = $(datostr).children('td[id="td_datos_1"]').text()
	document.getElementById('inpCodCompra').value = $(datostr).children('td[id="td_datos_1"]').text()
	document.getElementById('inptFechaCompra').value = $(datostr).children('td[id="td_datos_2"]').text()
	document.getElementById('inptProveedorCompra').value = $(datostr).children('td[id="td_datos_3"]').text()
	document.getElementById('inptlocalCompra').value = $(datostr).children('td[id="td_datos_11"]').text()
	  document.getElementById('inptlocalCompra').disabled=true
	document.getElementById('inptDescuentocompra').value = $(datostr).children('td[id="td_datos_8"]').text()
	document.getElementById('inptPagadocompra1').value = $(datostr).children('td[id="td_datos_9"]').text()
	document.getElementById('inptPagadocompra2').value = $(datostr).children('td[id="td_datos_10"]').text()	
	document.getElementById('inptPagosRealizadoscompra').value = $(datostr).children('td[id="td_datos_12"]').text()	
	document.getElementById('inptTipoCompra').value = $(datostr).children('td[id="td_datos_13"]').text()	
	document.getElementById('inptTimbradocompra').value = $(datostr).children('td[id="td_datos_14"]').text()	
	document.getElementById('inptTipoFacturaCompra').value = $(datostr).children('td[id="td_datos_15"]').text()	
	codProveedorCompra = $(datostr).children('td[id="td_datos_6"]').text()
	idAbmCompra = $(datostr).children('td[id="td_datos_5"]').text();
	document.getElementById("btnAbmCompra").value = "Editar Datos"
	document.getElementById("btnAbmCompra").style.display = ""
	buscardetallescompra()
	document.getElementById("divVistaCompras").style.display = "none";
	}
/*
CUENTAS A COBRAR 
*/
var cuotaNro = "";
var montoapagarcuota = "";
var iniciopagocuota = "";
var MetodoPago = "";
var deudaActual = "";
var idFkVenta = "";
function verCerrarCuentasACobrar(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divCuentasAcobrar").style.display==""){
		if(controldebusquedadInformeCuentaCobrar==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		//  
	$("div[id=divCuentasAcobrar]").fadeOut(500);	
		document.getElementById("divMinimizadoCuentasCobrar1").style.display="none"	
		document.getElementById("divMinimizadoCuentasCobrar2").style.display="none"
		limpiarCamposCuentasAcobrar()
	}else{		
	if(controlacceso("VERCUENTASACOBRAR","accion")==false){return;}		
	mostrarSoloUno("divCuentasAcobrar")	
		document.getElementById("divCuentasAcobrar").style.display=""
 
	}
}
function minimizarcuentascobrar(){
//  
	$("div[id=divCuentasAcobrar]").fadeOut(500);	
document.getElementById("divMinimizadoCuentasCobrar1").style.display=""	
document.getElementById("divMinimizadoCuentasCobrar2").style.display=""	
copiarBotonEnContenedor(document.getElementById("divMenuCuentasCobar1"));
}
function vercerrarfiltroscuentasacobrar(d){
	if(d=="1"){
		document.getElementById("divFiltrosCuentasACobrar").style.display=""
	}else{
		document.getElementById("divFiltrosCuentasACobrar").style.display="none"
	}
}
function checkfiltrosCuentasACobrar(d){
	if(d=="1"){
	document.getElementById('checkfiltrosCuentasACobrar1').checked=true
	document.getElementById('checkfiltrosCuentasACobrar2').checked=false
	document.getElementById('checkfiltrosCuentasACobrar3').checked=false
	document.getElementById('checkfiltrosCuentasACobrar4').checked=false	
	document.getElementById("inptBuscarCuentasAcobrarF1").value="";
	document.getElementById("inptBuscarCuentasAcobrarF2").value="";

	}
	if(d=="2"){		
	document.getElementById('checkfiltrosCuentasACobrar1').checked=false
	document.getElementById('checkfiltrosCuentasACobrar2').checked=true
	document.getElementById('checkfiltrosCuentasACobrar3').checked=false
	document.getElementById('checkfiltrosCuentasACobrar4').checked=false
    	
		var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarCuentasAcobrarF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarCuentasAcobrarF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	}
	if(d=="3"){		
	document.getElementById('checkfiltrosCuentasACobrar1').checked=false
	document.getElementById('checkfiltrosCuentasACobrar2').checked=false
	document.getElementById('checkfiltrosCuentasACobrar3').checked=true
	document.getElementById('checkfiltrosCuentasACobrar4').checked=false
		var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}

	document.getElementById('inptBuscarCuentasAcobrarF1').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById("inptBuscarCuentasAcobrarF2").value="";
	}
	if(d=="4"){		
	document.getElementById('checkfiltrosCuentasACobrar1').checked=false
	document.getElementById('checkfiltrosCuentasACobrar2').checked=false
	document.getElementById('checkfiltrosCuentasACobrar3').checked=false
	document.getElementById('checkfiltrosCuentasACobrar4').checked=true
			var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}

	document.getElementById('inptBuscarCuentasAcobrarF1').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById("inptBuscarCuentasAcobrarF2").value="";
	}
}
function limpiarCamposCuentasAcobrar(){
	if(controldebusquedadInformeCuentaCobrar==true){return}
	document.getElementById("inptRegistroSeleccCuentasAcobrar").value = "";
	document.getElementById("inptRegistroRegistrocargadoCuentaAcobrar").value = "";
	document.getElementById("inptRegistroNroHistorialTotalADeudad").value = "";
	document.getElementById("inptRegistroHistorialTotalACobrar").value = "";
	document.getElementById("inptBuscarCuentasAcobrarF1").value = "";
	document.getElementById("inptBuscarCuentasAcobrarF2").value = "";
	// document.getElementById("inptBuscarCuentasCobrar1").value = "";
	// document.getElementById("inptBuscarCuentasCobrar2").value = "";
	document.getElementById("inptBuscarCuentasCobrar3").value = "";
	document.getElementById("inptBuscarCuentasCobrar5").value = "";
	document.getElementById("inptBuscarCuentasCobrar6").value = "";
	document.getElementById("btnCuentasCobrar1").style.backgroundColor = "#ccc";
	document.getElementById("btnCuentasCobrar2").style.backgroundColor = "#ccc";
	document.getElementById("btnCalcularDeudaClienteCuentasCobras").style.backgroundColor = "#ccc";
	document.getElementById("btnUbicacionClienteCuentasCobras").style.backgroundColor = "#ccc";
	clienteCuentaACobrarAgenda = "";
	nroVentaCuentaACobrarAgenda = "";
	actualizarBotonAgendarCuentaACobrar(false);
	// document.getElementById("table_cuentas_a_cobrar").innerHTML=""
	  document.getElementById("tbProcessInformeCuentaACobrar").style.display='none'
	  
}
function verCerrarVentanasHistorialCuenta(d){
	document.getElementById("btnCuentasCobrar1").style=""
	document.getElementById("btnCuentasCobrar2").style=""
	document.getElementById("btnUbicacionClienteCuentasCobras").style=""
	document.getElementById("btnCalcularDeudaClienteCuentasCobras").style = "";
	document.getElementById("divCuentaACobrar1").style.display="none"
	document.getElementById("divCuentaACobrar2").style.display="none"
	if(d=="1"){
		document.getElementById("btnCuentasCobrar1").style="background-color: rgb(255, 152, 0); color: rgb(255, 255, 255);"
		document.getElementById("divCuentaACobrar1").style.display=""
		if(document.getElementById("table_cuentas_a_cobrar").innerHTML==""){
			buscarcuentaacobrar()
		}
	}
	if(d=="2"){
		document.getElementById("btnCuentasCobrar2").style="background-color: rgb(255, 152, 0); color: rgb(255, 255, 255);"
		document.getElementById("btnUbicacionClienteCuentasCobras").style="background-color: rgb(255, 152, 0); color: rgb(255, 255, 255);"
		document.getElementById("btnCalcularDeudaClienteCuentasCobras").style="background-color: rgb(255, 152, 0); color: rgb(255, 255, 255);"
		
		document.getElementById("divCuentaACobrar2").style.display=""
		if(document.getElementById("table_cuentas_a_cobrar_detallada").innerHTML==""){
			buscarcuentaacobrardetallada()
		}
	}
}
var registrocargadoinformecuentasacobrar="";
var totalregistroinformecuentacobrar="";
var controldebusquedadInformeCuentaCobrar=false
function cancelarInformeCuentaACobrar(){
	controldebusquedadInformeCuentaCobrar=false
	document.getElementById("divProgressInformeCuentaACobrar").style.backgroundColor='#ff5722'
}

function limpiarContenidoCuentasACobrar(nodo) {
	while (nodo && nodo.firstChild) {
		nodo.removeChild(nodo.firstChild);
	}
}

function crearCeldaCuentaACobrar(valor, id, ancho, oculta) {
	var celda = document.createElement("td");
	if (id) {
		celda.id = id;
	}
	if (oculta === true) {
		celda.style.display = "none";
	} else if (ancho) {
		celda.style.width = ancho;
	}
	if (valor !== null && typeof valor !== "undefined") {
		celda.textContent = String(valor);
	}
	return celda;
}

function agregarProductosCuentaACobrar(celda, productos) {
	var lista = Array.isArray(productos) ? productos : [];
	lista.forEach(function (producto, indice) {
		if (indice > 0) {
			celda.appendChild(document.createElement("br"));
		}
		celda.appendChild(document.createTextNode((indice + 1) + ") \u00a0" + (producto == null ? "" : String(producto))));
	});
}

function crearCalificacionClienteCuentaACobrar(calificacion) {
	var valor = calificacion == null ? "" : String(calificacion).trim().toUpperCase();
	if (!valor) valor = "SIN REGISTRO";

	var etiqueta = document.createElement("span");
	etiqueta.className = "cuenta-cliente-calificacion";
	etiqueta.setAttribute("data-calificacion", valor);
	etiqueta.setAttribute("title", "Calificacion del cliente: " + valor);
	etiqueta.setAttribute("aria-label", "Calificacion del cliente: " + valor);
	etiqueta.textContent = valor;
	return etiqueta;
}

function agregarProgresoCreditoCuentaACobrar(celda, porcentaje) {
	var avance = Number(porcentaje);
	if (!isFinite(avance)) avance = 0;
	avance = Math.max(0, Math.min(100, Math.round(avance)));

	var contenedor = document.createElement("div");
	contenedor.className = "cuenta-cliente-progreso";
	contenedor.title = avance + "% del credito pagado";

	var filaProgreso = document.createElement("div");
	filaProgreso.className = "cuenta-cliente-progreso__fila";

	var pista = document.createElement("div");
	pista.className = "cuenta-cliente-progreso__pista";
	/* Es un valor financiero conocido, no el avance de una tarea. El rol meter
	 * evita ademas las reglas circulares globales de [role=progressbar]. */
	pista.setAttribute("role", "meter");
	pista.setAttribute("aria-label", "Porcentaje del credito pagado");
	pista.setAttribute("aria-valuemin", "0");
	pista.setAttribute("aria-valuemax", "100");
	pista.setAttribute("aria-valuenow", String(avance));
	pista.setAttribute("aria-valuetext", avance + "% del credito pagado");

	var barra = document.createElement("span");
	barra.className = "cuenta-cliente-progreso__barra";
	barra.style.width = avance + "%";
	pista.appendChild(barra);

	var valorVisible = document.createElement("span");
	valorVisible.className = "cuenta-cliente-progreso__porcentaje";
	valorVisible.textContent = avance + "%";
	valorVisible.setAttribute("aria-hidden", "true");

	filaProgreso.appendChild(pista);
	filaProgreso.appendChild(valorVisible);
	contenedor.appendChild(filaProgreso);
	celda.appendChild(contenedor);
}

function crearFilaCuentaACobrar(registro, indice) {
	var tabla = document.createElement("table");
	tabla.className = indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");

	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	fila.addEventListener("click", function () {
		obtenerdatoscuentaacobrar(fila);
	});

	fila.appendChild(crearCeldaCuentaACobrar(registro.cod_cliente, "td_id_1", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.cod_venta, "td_datos_1", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.num_factura, "td_datos_2", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.plazo, "", "", true));

	var celdaCliente = crearCeldaCuentaACobrar("", "td_datos_26", "10%", false);
	if (registro.estado_cliente) {
		var estadoCliente = document.createElement("p");
		estadoCliente.style.color = "#d10000";
		estadoCliente.style.margin = "0";
		estadoCliente.textContent = String(registro.estado_cliente);
		celdaCliente.appendChild(estadoCliente);
	}
	var identidadCliente = document.createElement("div");
	identidadCliente.className = "cuenta-cliente-identidad";
	var nombreCliente = document.createElement("span");
	nombreCliente.className = "cuenta-cliente-identidad__nombre";
	nombreCliente.textContent = registro.cliente == null ? "" : String(registro.cliente);
	identidadCliente.appendChild(nombreCliente);
	identidadCliente.appendChild(crearCalificacionClienteCuentaACobrar(registro.calificacion_cliente));
	celdaCliente.appendChild(identidadCliente);
	agregarProgresoCreditoCuentaACobrar(celdaCliente, registro.porcentaje_pagado_credito);
	fila.appendChild(celdaCliente);

	fila.appendChild(crearCeldaCuentaACobrar(registro.documento, "", "5%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.telefono, "", "5%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.nro_factura, "", "5%", false));

	var celdaProductos = crearCeldaCuentaACobrar("", "", "10%", false);
	agregarProductosCuentaACobrar(celdaProductos, registro.productos);
	fila.appendChild(celdaProductos);

	fila.appendChild(crearCeldaCuentaACobrar(registro.cobrador, "td_datos_5", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_venta, "td_datos_12", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.fecha_mostrada, "", "5%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.fecha_pago, "td_datos_3", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.cuotas, "td_datos_19", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.monto_cuota, "td_datos_6", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_descuento, "td_datos_18", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.interes_pagado, "", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.pagado_sin_interes, "", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_pagado, "td_datos_13", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_interes, "td_datos_17", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.cuotas_atrasadas, "td_datos_20", "3%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.dias_atrasados, "td_datos_10", "3%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.deuda_pendiente, "td_datos_22", "5%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_deuda, "td_datos_11", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_a_pagar, "td_datos_14", "5%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_pagado_venta, "td_datos_7", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.total_venta, "td_datos_8", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.cod_cobrador, "td_datos_9", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.local, "", "5%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.tipo_comprobante, "td_datos_15", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.punto_expedicion, "td_datos_16", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.subtotal_pago, "td_datos_21", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.vendedor, "td_datos_23", "5%", false));
	fila.appendChild(crearCeldaCuentaACobrar(registro.lat, "td_datos_24", "", true));
	fila.appendChild(crearCeldaCuentaACobrar(registro.lot, "td_datos_25", "", true));

	tabla.appendChild(fila);
	return tabla;
}

function renderizarCuentasACobrar(registros, anexar) {
	var cuerpo = document.getElementById("table_cuentas_a_cobrar");
	if (!cuerpo) {
		return;
	}
	if (anexar !== true) {
		limpiarContenidoCuentasACobrar(cuerpo);
	}
	var lista = Array.isArray(registros) ? registros : [];
	var indiceInicial = cuerpo.children.length;
	var fragmento = document.createDocumentFragment();
	lista.forEach(function (registro, indice) {
		fragmento.appendChild(crearFilaCuentaACobrar(registro || {}, indiceInicial + indice));
	});
	cuerpo.appendChild(fragmento);
}

function buscarcuentaacobrar() {
if(controlacceso("VERCUENTASACOBRAR","accion")==false){return;}		
	
	var fecha1 = document.getElementById("inptBuscarCuentasAcobrarF1").value
	var fecha2 = document.getElementById("inptBuscarCuentasAcobrarF2").value
	var filtro=""
	if(document.getElementById('checkfiltrosCuentasACobrar2').checked==true){
		var filtro="1"
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
		if (fecha2 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA DE FIN")
			return
		}
	}
	if(document.getElementById('checkfiltrosCuentasACobrar1').checked==true){
	var fecha1 =""
	var fecha2 = ""
		
	}
	if(document.getElementById('checkfiltrosCuentasACobrar3').checked==true){
		var filtro="3"
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
	}
	if(document.getElementById('checkfiltrosCuentasACobrar4').checked==true){
		var filtro="4"
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
	}
	
	var cliente = document.getElementById("inptBuscarCuentasCobrar1").value
	var documento = document.getElementById("inptBuscarCuentasCobrar2").value
	var telefono = document.getElementById("inptBuscarCuentasCobrar3").value
	var campoBusquedaGeneral = document.getElementById("inptBuscarGeneralCuentasCobrar")
	var buscarGeneral = campoBusquedaGeneral ? campoBusquedaGeneral.value.trim() : ""
	var filtrofecha = document.getElementById("inptBuscarCuentasCobrar5").value
	var codlocal = document.getElementById("inptBuscarCuentasCobrar6").value
	var vendedor = document.getElementById("inptBuscarCuentasCobrar7").value
	
	
	if(controldebusquedadInformeCuentaCobrar==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
	document.getElementById("inptRegistroSeleccCuentasAcobrar").value = "";
	idFkVenta = "";
	obtenerCod_ventaFK = "";
	cod_ClienteFKMora = "";
	cod_clienteBuscarUbicacion = "";
	clienteCuentaACobrarAgenda = "";
	nroVentaCuentaACobrarAgenda = "";
	actualizarBotonAgendarCuentaACobrar(false);
	controldebusquedadInformeCuentaCobrar=true
    document.getElementById("tbProcessInformeCuentaACobrar").style.display='none'
	document.getElementById("divProgressInformeCuentaACobrar").style.width='0%'
	document.getElementById("divProgressInformeCuentaACobrar").style.backgroundColor=''
     document.getElementById("inptRegistroRegistrocargadoCuentaAcobrar").value = ""
	document.getElementById("inptRegistroNroHistorialTotalADeudad").value =  ""
	document.getElementById("inptRegistroHistorialTotalACobrar").value =  ""
	document.getElementById("table_cuentas_a_cobrar").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cliente": cliente,
		"documento": documento,
		"telefono": telefono,
		"buscar_general": buscarGeneral,
		"producto": "",
		"filtrofecha": filtrofecha,
		"codlocal": codlocal,
		"filtro": filtro,
		"vendedor": vendedor,
		"formato": "json",
		"funt": "cuentasacobrar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarContenidoCuentasACobrar(document.getElementById("table_cuentas_a_cobrar"))
			controldebusquedadInformeCuentaCobrar=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			limpiarContenidoCuentasACobrar(document.getElementById("table_cuentas_a_cobrar"))
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (!Array.isArray(datos_buscados)) {
						throw new Error("La respuesta de Cuentas a Cobrar no contiene un array de registros");
					}
					renderizarCuentasACobrar(datos_buscados, false)
					 document.getElementById("inptRegistroRegistrocargadoCuentaAcobrar").value =datos[3]
	                document.getElementById("inptRegistroNroHistorialTotalADeudad").value =  datos[4]
	                document.getElementById("inptRegistroHistorialTotalACobrar").value =  datos[5]
					idFkVenta = ''
						registrocargadoinformecuentasacobrar=datos[99];
					totalregistroinformecuentacobrar=datos[100];			
					
						 if(totalregistroinformecuentacobrar>registrocargadoinformecuentasacobrar){
						 	var porce=((registrocargadoinformecuentasacobrar*100)/totalregistroinformecuentacobrar).toFixed(0)
	                      document.getElementById("divProgressInformeCuentaACobrar").style.width=porce+"%"
						  buscarmascuentaacobrar();
						 }else{
							 document.getElementById("tbProcessInformeCuentaACobrar").style.display='none'
							 document.getElementById("divProgressInformeCuentaACobrar").style.width='0%'
							 controldebusquedadInformeCuentaCobrar=false
						 }
					}
					
			} catch (error) {
				controldebusquedadInformeCuentaCobrar=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function buscarmascuentaacobrar(c) {
if(controlacceso("VERCUENTASACOBRAR","accion")==false){return;}		
	
	var fecha1 = document.getElementById("inptBuscarCuentasAcobrarF1").value
	var fecha2 = document.getElementById("inptBuscarCuentasAcobrarF2").value
	var filtro=""
	if(document.getElementById('checkfiltrosCuentasACobrar2').checked==true){
		var filtro="1"
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
		if (fecha2 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA DE FIN")
			return
		}
	}
	if(document.getElementById('checkfiltrosCuentasACobrar1').checked==true){
	var fecha1 =""
	var fecha2 = ""
		
	}
	if(document.getElementById('checkfiltrosCuentasACobrar3').checked==true){
		var filtro="3"
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
	}
	if(document.getElementById('checkfiltrosCuentasACobrar4').checked==true){
		var filtro="4"
		if (fecha1 == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
	}
	
	var cliente = document.getElementById("inptBuscarCuentasCobrar1").value
	var documento = document.getElementById("inptBuscarCuentasCobrar2").value
	var telefono = document.getElementById("inptBuscarCuentasCobrar3").value
	var campoBusquedaGeneral = document.getElementById("inptBuscarGeneralCuentasCobrar")
	var buscarGeneral = campoBusquedaGeneral ? campoBusquedaGeneral.value.trim() : ""
	var filtrofecha = document.getElementById("inptBuscarCuentasCobrar5").value
	var codlocal = document.getElementById("inptBuscarCuentasCobrar6").value
	var vendedor = document.getElementById("inptBuscarCuentasCobrar7").value
	if(c=="1"){
		controldebusquedadInformeCuentaCobrar=true
	}
	if(controldebusquedadInformeCuentaCobrar==false){
	return
}
	controldebusquedadInformeCuentaCobrar=true
    document.getElementById("tbProcessInformeCuentaACobrar").style.display=''
	document.getElementById("divProgressInformeCuentaACobrar").style.backgroundColor=''
	var totaldeuda=document.getElementById("inptRegistroNroHistorialTotalADeudad").value
	var totalcobrar=document.getElementById("inptRegistroHistorialTotalACobrar").value
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cliente": cliente,
		"documento": documento,
		"telefono": telefono,
		"buscar_general": buscarGeneral,
		"producto": "",
		"filtrofecha": filtrofecha,
		"codlocal": codlocal,
		"filtro": filtro,
		"vendedor": vendedor,
		"totaldeuda": totaldeuda,
		"totalcobrar": totalcobrar,
		"registrocargado": registrocargadoinformecuentasacobrar,
		"formato": "json",
		"funt": "mascuentasacobrar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divProgressInformeCuentaACobrar").style.backgroundColor='#ff5722'
			controldebusquedadInformeCuentaCobrar=false
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
					if (!Array.isArray(datos_buscados)) {
						throw new Error("La respuesta incremental de Cuentas a Cobrar no contiene un array de registros");
					}
					if (datos_buscados.length === 0) {
						document.getElementById("tbProcessInformeCuentaACobrar").style.display='none'
						document.getElementById("divProgressInformeCuentaACobrar").style.width='0%'
						controldebusquedadInformeCuentaCobrar=false
						return
					}
					renderizarCuentasACobrar(datos_buscados, true)
					 document.getElementById("inptRegistroRegistrocargadoCuentaAcobrar").value =datos[3]
	                document.getElementById("inptRegistroNroHistorialTotalADeudad").value =  datos[4]
	                document.getElementById("inptRegistroHistorialTotalACobrar").value =  datos[5]
						registrocargadoinformecuentasacobrar=datos[99];
									
									idFkVenta = ''
									
						 if(totalregistroinformecuentacobrar>registrocargadoinformecuentasacobrar){
						 	var porce=((registrocargadoinformecuentasacobrar*100)/totalregistroinformecuentacobrar).toFixed(0)
	                      document.getElementById("divProgressInformeCuentaACobrar").style.width=porce+"%"
						  buscarmascuentaacobrar();
						 }else{
							 document.getElementById("tbProcessInformeCuentaACobrar").style.display='none'
							 document.getElementById("divProgressInformeCuentaACobrar").style.width='0%'
							 controldebusquedadInformeCuentaCobrar=false
					 }
					}
			} catch (error) {
				document.getElementById("divProgressInformeCuentaACobrar").style.backgroundColor='#ff5722'
				controldebusquedadInformeCuentaCobrar=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var cod_ClienteFKMora = "";
var cod_clienteBuscarUbicacion = "";
var nombreClienteDescuentoInteres = "";
var obtenerCod_ventaFK = "";
var clienteCuentaACobrarAgenda = "";
var nroVentaCuentaACobrarAgenda = "";
function obtenerdatoscuentaacobrar(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	var celdaClienteAgenda = $(datostr).children('td[id="td_datos_26"]').clone();
	celdaClienteAgenda.children().remove();
	clienteCuentaACobrarAgenda = $.trim(celdaClienteAgenda.text());
	if (clienteCuentaACobrarAgenda == "") {
		clienteCuentaACobrarAgenda = $.trim($(datostr).children('td[id="td_datos_26"]').text());
	}
	cobradorcargarpagos = $(datostr).children('td[id="td_datos_9"]').html();
	nrofacturaaeliminar = $(datostr).children('td[id="td_datos_2"]').html();
	idFkVenta = $(datostr).children('td[id="td_datos_1"]').html();
	obtenerCod_ventaFK = $(datostr).children('td[id="td_datos_1"]').html();
	cod_ClienteFKMora = $(datostr).children('td[id="td_id_1"]').html();
	cod_clienteBuscarUbicacion = $(datostr).children('td[id="td_id_1"]').html();
	nroVentaCuentaACobrarAgenda = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById("inptCobradorCargarPago").value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById("inptDiasAtrazadoCargarPago").value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById("inptRegistroSeleccCuentasAcobrar").value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById("inptTotalVenta").value = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById("inptTotalVenta2").innerHTML = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById("inptMontoCargaPago").value = $(datostr).children('td[id="td_datos_22"]').html();
	document.getElementById("inptSubtotalPago").value = $(datostr).children('td[id="td_datos_21"]').html();
	document.getElementById("inptTotalDeudaPago").value = $(datostr).children('td[id="td_datos_22"]').html();
	document.getElementById("inptTotalinteresPago").value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById("inptCuotasAtrazadoCargarPago").value = $(datostr).children('td[id="td_datos_20"]').html();
	document.getElementById("inptMontoCuotaPago").value = $(datostr).children('td[id="td_datos_6"]').html();
	nombreClienteDescuentoInteres = $(datostr).children('td[id="td_datos_26"]').html();
	document.getElementById("inptDescuentoCargaPago").value = "0";
	document.getElementById("btnCuentasCobrar1").style.backgroundColor = "#2196F3";
	document.getElementById("btnCuentasCobrar2").style.backgroundColor = "#4CAF50";
	document.getElementById("btnCalcularDeudaClienteCuentasCobras").style.backgroundColor = "#2196F3";
	document.getElementById("btnUbicacionClienteCuentasCobras").style.backgroundColor = "#2196F3";
	actualizarBotonAgendarCuentaACobrar(true);
	
	LatGeo = $(datostr).children('td[id="td_datos_24"]').html();
	LonGeo = $(datostr).children('td[id="td_datos_25"]').html();
}

function actualizarBotonAgendarCuentaACobrar(activo) {
	var boton = document.getElementById("btnAgendarClienteCuentasCobras");
	if (!boton) {
		return;
	}
	boton.disabled = !activo;
	boton.style.backgroundColor = activo ? "#16a34a" : "#ccc";
	boton.style.color = "#fff";
	boton.style.cursor = activo ? "pointer" : "not-allowed";
	boton.style.opacity = activo ? "1" : "0.75";
}

function irAgendaDesdeCuentasCobrar() {
	if (cod_ClienteFKMora == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	if(controlacceso("VERAGENDA","accion")==false){return;}
	document.getElementById("divMinimizadoAgenda").style.display = "none";
	document.getElementById("divAbmAgenda").style.display = "";
	limpiarcamposAgenda()
	verCerrarVentanaAbmAgenda("1", "2")
	cod_clienteAgenda = cod_ClienteFKMora;
	document.getElementById("inptClienteAgenda").value = clienteCuentaACobrarAgenda;
	var motivo = "Seguimiento cuenta a cobrar";
	if (nroVentaCuentaACobrarAgenda != "") {
		motivo += " - Venta " + nroVentaCuentaACobrarAgenda;
	}
	if (obtenerCod_ventaFK != "") {
		motivo += " (cod. " + obtenerCod_ventaFK + ")";
	}
	document.getElementById("inptMotivoAgenda").value = motivo;
	setTimeout(function() {
		document.getElementById("inptCompromisoAgenda").focus();
	}, 300);
}



function vercerrarCalcularPagos() {
	if (document.getElementById("divAbmCalcularPagos").style.display == "") {	 	
			document.getElementById("divAbmCalcularPagos").style.display="none"
			limpiarCamposCalcularCredito();
			// buscarcreditosCalcularPago()
	} else {
		if (idFkVenta == "") {
			ver_vetana_informativa("FALTO INICIAR UNA VENTA", "#")
			return false;
		}
		
		document.getElementById("divAbmCalcularPagos").style.display=""
	}
	
}

function limpiarCamposCalcularCredito(){
	document.getElementById("table_abm_opciones_CalcularPagos").innerHTML=""
	document.getElementById("inptFechaCreditoCalcularPagos").value=""
	document.getElementById("inptTotalPagadoCalcularPagos").value=""
	document.getElementById("inptTotalInteresCalcularPagos").value=""
	document.getElementById("inptTotalDescuentoCalcularPagos").value=""
	document.getElementById("inptDeudaActualCalcularPagos").value=""
	
}


function buscarcreditosCalcularPago() { 

	var fechacalculo = document.getElementById("inptFechaCalcularPagos").value
	var fechaCredito = document.getElementById("inptFechaCreditoCalcularPagos").value
	
	
	if(fechacalculo==""){
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE CALCULO", "#")
		return false;
	}
	 
	
	document.getElementById("table_abm_opciones_CalcularPagos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idFkVenta,
		"fechacalculo": fechacalculo,
		"fechaCredito": fechaCredito,
		"funt": "buscarcreditosCalcularPago"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_opciones_CalcularPagos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_opciones_CalcularPagos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					paginaExtractoCuota = datos[12];
					document.getElementById("table_abm_opciones_CalcularPagos").innerHTML = datos_buscados
					document.getElementById("inptTotalPagadoCalcularPagos").value = datos[3] 
					document.getElementById("inptDeudaActualCalcularPagos").value = datos[4] 
					document.getElementById('inptTotalInteresCalcularPagos').value = datos[7] 
					document.getElementById('inptTotalDescuentoCalcularPagos').value = datos[11]			 

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}




function verCerrarCargarPagoDesdeCuentas(d) {
	if (d == "1") {		
			if (idFkVenta == "") {
			ver_vetana_informativa("FALTO INICIAR UNA VENTA")
			return false;
		}
		if(controlacceso("VERPAGOSCREDITO","accion")==false){	   
	   //SIN PERMISO
	   return;
		}		
		
		document.getElementById("divAbmOpcionesPagos").style.display=""
		 
		document.getElementById("tdOpcionesVolverAtrasPagos").style.display="none"
		document.getElementById("inpCodVentaPagos").value = document.getElementById("inpCodVenta").value
		document.getElementById("inptTotalVentaPagos").value = document.getElementById("inptTotalVenta").value
		document.getElementById("inptTotalVentaPagosb").value = ""
		buscarDatosOpcionesPagos()
		buscarcreditos()
		limpiarCamposCuentasAcobrar()
	} else {
	
	 
$("div[id=divAbmOpcionesPagos]").fadeOut(500);	
	}
}
function irACargarPagodesdeCuentasACobrar() {
	if (document.getElementById("inptRegistroSeleccCuentasAcobrar").value == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	verCerrarCargarPago("1")
}
function irAventaDesdeCuentas()
{
	if(controlacceso("VERVENTA","accion")==false){return;}		
if(idFkVenta==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	return
}
var buscador=idFkVenta;
document.getElementById("DivDatosVenta").innerHTML="";
   verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "buscardatosVenta")
	datos.append("buscar", buscador)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
try {
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {					
					
					var datosVenta=datos["2"];
	                if(datosVenta==""){
						ver_vetana_informativa("NO SE HA ENCONTRADO DATOS")
						return 
					}
					document.getElementById("DivDatosVenta").innerHTML=datosVenta
					var datostr=document.getElementById("datos_venta_"+buscador)
					document.getElementById('inptFechaVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptClienteVenta').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptSeleccTipoVenta').value = $(datostr).children('td[id="td_datos_12"]').html();
	controltipoventa= $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptVendedorVenta1').value = $(datostr).children('td[id="td_datos_15"]').html();
	document.getElementById('inptVendedorVenta2').value = $(datostr).children('td[id="td_datos_16"]').html();
	document.getElementById('inptCobradorVenta').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptCobradorCargarPago').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inpCodVenta').value = $(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptNroVenta').value = $(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('pNroFactuaCaja').innerHTML = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptSeleccPuntoExpedicionVenta').value = $(datostr).children('td[id="td_datos_33"]').html();	
	var puntoExpedicion=$("select[id=inptSeleccPuntoExpedicionVenta]").children(":selected").text() 
	if(puntoExpedicion==""){						
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+$(datostr).children('td[id="td_datos_13"]').html()+"*";
	}else{
	document.getElementById("pNroFactuaCaja").innerHTML = "*"+puntoExpedicion+"-"+$(datostr).children('td[id="td_datos_13"]').html()+"*";
	}
	document.getElementById('inptComisionVentaCobrador').value = $(datostr).children('td[id="td_datos_22"]').html();
	document.getElementById('inptlocalVenta').value = $(datostr).children('td[id="td_datos_23"]').html();
	document.getElementById('inptGaranteVenta').value = $(datostr).children('td[id="td_datos_31"]').html();
	document.getElementById('inptSeleccTipoComprobanteVenta').value = $(datostr).children('td[id="td_datos_32"]').html();
		if(document.getElementById('inptSeleccTipoComprobanteVenta').value=="FACTURA"){
		// document.getElementById("btnImprimirticket").style.display=""
					 document.getElementById("btnImprimirFactura").style.display=""
					 document.getElementById("btnImprimirPagare").style.display=""
	}else{
		// document.getElementById("btnImprimirticket").style.display=""
					 // document.getElementById("btnImprimirFactura").style.display="none"
					 document.getElementById("btnImprimirPagare").style.display=""
	}

	idGaranteFk = $(datostr).children('td[id="td_datos_30"]').html();
	idFkVendedor1 = $(datostr).children('td[id="td_datos_3"]').html();
	idFkVendedor2 = $(datostr).children('td[id="td_datos_14"]').html();
	idFkCliente = $(datostr).children('td[id="td_datos_10"]').html();
	idFkCobrador = $(datostr).children('td[id="td_datos_11"]').html();
	cobradorcargarpagos = $(datostr).children('td[id="td_datos_11"]').html();
	idabmVenta = $(datostr).children('td[id="td_datos_8"]').html();
	idFkVenta = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inpCodVenta').disabled = true
	document.getElementById('inpCodVenta').className = "inputTextDisable"
	document.getElementById('btnAbmVenta').style.display = ""
	document.getElementById('btnAbmVenta').value = "Editar datos"
	 document.getElementById("divAbmVenta").style.display="";
   buscardetallesventa()
   SeleccTipoComprobanteVenta();
  document.getElementById("btnMasInfoClienteVenta").style.display='none'
  document.getElementById("btnNuevoClienteVenta").style.display=''
  document.getElementById("tdImprimirVenta").style.display=''
   document.getElementById("divAbmVenta").style.display=""
	limpiarCamposCuentasAcobrar()
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
INFORME CUENTAS A COBRAR
*/
function verCerrarCuentasACobrarInforme(d){
	document.getElementById("divSegundoPlano").style.display="none";
if(document.getElementById("divCuentasACobrarDetalles").style.display==""){
	if(controldebusquedadCuentaCobrar==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
		document.getElementById("divMinimizadoInformeGeneralCuentas").style.display="none"
	
	$("div[id=divCuentasACobrarDetalles]").fadeOut(500);	
		limpiarCamposCuentasAcobrarinforme()
	}else{		
	if(controlacceso("VERINFORMECUENTAGENERAL","accion")==false){return;}	
mostrarSoloUno("divCuentasACobrarDetalles")		
		document.getElementById("divCuentasACobrarDetalles").style.display=""
 //  
	document.getElementById('inptBuscarCuentasAcobrarinforme').value = obtenerFechaActual();
}
}
function minimizarCuestasCobrarDetalles(){
	document.getElementById("divMinimizadoInformeGeneralCuentas").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCuentasGeneral"));
	$("div[id=divCuentasACobrarDetalles]").fadeOut(500);	
}
function limpiarCamposCuentasAcobrarinforme(){
	if(controldebusquedadCuentaCobrar==true){
	return
}
	document.getElementById("table_cuentas_a_cobrar_informe").innerHTML = "";
	document.getElementById("inptBuscarCuentasAcobrarinforme").value = "";
	document.getElementById("inputSelectCobradorInfCuentasAcobrarinforme").value = "";
	document.getElementById("inptlocalCuentasAcobrainforme").value = "";
	document.getElementById("inptRegistroNroHistorialCuentaAcobrarinforme").value = "";
	document.getElementById("inptRegistroNroHistorialTotalACobrarinforme").value = "";
	document.getElementById("tbProcessCuentasCobrar").style.display = "none";
}
var registrocargadocuentascobrar="";
var totalregistrocuentacobrar="";
var controldebusquedadCuentaCobrar=false
function cancelarCuentaCobrar(){
	controldebusquedadCuentaCobrar=false
	document.getElementById("divProgressCuentaCobra").style.backgroundColor='#ff5722'
}
let MiCondicion="";
function buscarcuentaacobrarinforme() {
		if(controlacceso("VERINFORMECUENTAGENERAL","accion")==false){return;}
	var fecha = document.getElementById("inptBuscarCuentasAcobrarinforme").value
	var cod_cobrador = document.getElementById("inputSelectCobradorInfCuentasAcobrarinforme").value
	var cod_local = document.getElementById("inptlocalCuentasAcobrainforme").value
	var cliente = document.getElementById("inptNombreClienteCuentasAcobrainforme").value
	var zona = document.getElementById("inptZonaCuentasAcobrainforme").value
	var tipo_cliente = document.getElementById("inptTipoClienteCuentasAcobrainforme").value

var datos_busqueda = document.getElementById("inptDatosCuentasAcobrarInforme").value

		// if (array_cod_tipo_cliente.length === 0) {
			// ver_vetana_informativa("FALTO SELECCIONAR UN TIPO DE BUSQUEDA")
			// return
		// }
		
		if (fecha == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
		
	
			if(controldebusquedadCuentaCobrar==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadCuentaCobrar=true
	document.getElementById("table_cuentas_a_cobrar_informe").innerHTML = paginacargando
	document.getElementById("inptRegistroNroHistorialCuentaAcobrarinforme").value = "..."
	document.getElementById("inptRegistroNroHistorialTotalACobrarinforme").value = "..."
	document.getElementById("inptRegistroTotalNetoCuentasCobrar").value = "..."
	document.getElementById("tbProcessCuentasCobrar").style.display="none"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"cod_cobrador": cod_cobrador,
		"cod_local": cod_local,
		"cliente": cliente,
		"zona": zona,
		"datos": datos_busqueda,
		"tipo_cliente": tipo_cliente,
		"array_cod_tipo_cliente": JSON.stringify(array_cod_tipo_cliente),
		"funt": "cuentasacobrardetallado"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_cuentas_a_cobrar_informe").innerHTML = ''
			document.getElementById("inptRegistroNroHistorialCuentaAcobrarinforme").value = ""
	document.getElementById("inptRegistroNroHistorialTotalACobrarinforme").value = ""
	document.getElementById("inptRegistroTotalNetoCuentasCobrar").value = ""
	controldebusquedadCuentaCobrar=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_cuentas_a_cobrar_informe").innerHTML = ''
			document.getElementById("inptRegistroNroHistorialCuentaAcobrarinforme").value = ""
	document.getElementById("inptRegistroNroHistorialTotalACobrarinforme").value = ""
	document.getElementById("inptRegistroTotalNetoCuentasCobrar").value = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("inptRegistroNroHistorialCuentaAcobrarinforme").value = datos[3]
	document.getElementById("inptRegistroNroHistorialTotalACobrarinforme").value = datos[4]
	document.getElementById("inptRegistroTotalNetoCuentasCobrar").value = datos[5]
					document.getElementById("table_cuentas_a_cobrar_informe").innerHTML = datos_buscados
					
					MiCondicion= datos[101];
					    	registrocargadocuentascobrar=datos[99];
					totalregistrocuentacobrar=datos[100];
					


						 if(totalregistrocuentacobrar>registrocargadocuentascobrar){
						 	var porce=((registrocargadocuentascobrar*100)/totalregistrocuentacobrar).toFixed(0)
							document.getElementById("divProgressCuentaCobra").style.width=porce+"%"
						 document.getElementById("table_cuentas_a_cobrar_informe").innerHTML += "<div id='table_mas_cuentas_a_cobrar_informe'></div>"
						  buscarmascuentaacobrarinforme();
					 }else{
						 controldebusquedadCuentaCobrar=false
					 }
					}
			} catch (error) {
				controldebusquedadCuentaCobrar=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var cod_clienteFKAgendar = "";
function obtenerdatosagendarcliente(datos){
	cod_clienteFKAgendar = datos.id;
	document.getElementById('inptAgendarClienteMotivo').value = ''
	document.getElementById('inptAgendarClienteFechaCompromiso').value = ''
	vercerraropcionagendarcliente("1")
}
function buscarmascuentaacobrarinforme(c) {
		if(controlacceso("VERINFORMECUENTAGENERAL","accion")==false){return;}
	var fecha = document.getElementById("inptBuscarCuentasAcobrarinforme").value
	var cod_cobrador = document.getElementById("inputSelectCobradorInfCuentasAcobrarinforme").value
	var cod_local = document.getElementById("inptlocalCuentasAcobrainforme").value
	var cliente = document.getElementById("inptNombreClienteCuentasAcobrainforme").value
	var datos_busqueda = document.getElementById("inptDatosCuentasAcobrarInforme").value
	var tipo_cliente = document.getElementById("inptTipoClienteCuentasAcobrainforme").value
	var zona = document.getElementById("inptZonaCuentasAcobrainforme").value

		if (fecha == "") {
			ver_vetana_informativa("FALTO INGRESAR LA FECHA")
			return
		}
	if(c=="1"){
		controldebusquedadCuentaCobrar=true
	}
			if(controldebusquedadCuentaCobrar==false){
	
	return
}
controldebusquedadCuentaCobrar=true
	document.getElementById("table_mas_cuentas_a_cobrar_informe").innerHTML = paginacargando
	var totalACobrar=document.getElementById("inptRegistroNroHistorialTotalACobrarinforme").value
	var totalNeto=document.getElementById("inptRegistroTotalNetoCuentasCobrar").value 
	document.getElementById("tbProcessCuentasCobrar").style.display=""
	document.getElementById("divProgressCuentaCobra").style.backgroundColor=''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_cobrador": cod_cobrador,
		"cod_local": cod_local,
		"fecha": fecha,
		"cliente": cliente,
		"totalNeto": totalNeto,
		"zona": zona,
		"registrocargado": registrocargadocuentascobrar,
		"totalACobrar": totalACobrar,
		"datos": datos_busqueda,
		"tipo_cliente": tipo_cliente,
		"array_cod_tipo_cliente": JSON.stringify(array_cod_tipo_cliente),
		"funt": "mascuentasacobrardetallado"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_cuentas_a_cobrar_informe").innerHTML = ''


	document.getElementById("divProgressCuentaCobra").style.backgroundColor='#ff5722'
	controldebusquedadCuentaCobrar=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_mas_cuentas_a_cobrar_informe").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("inptRegistroNroHistorialCuentaAcobrarinforme").value = datos[3]
					document.getElementById("inptRegistroNroHistorialTotalACobrarinforme").value = datos[4]
					document.getElementById("inptRegistroTotalNetoCuentasCobrar").value = datos[5]
					document.getElementById("table_mas_cuentas_a_cobrar_informe").innerHTML = datos_buscados
					
					    	registrocargadocuentascobrar=datos[99];
				

						 if(totalregistrocuentacobrar>registrocargadocuentascobrar){
						 	var porce=((registrocargadocuentascobrar*100)/totalregistrocuentacobrar).toFixed(0)
	document.getElementById("divProgressCuentaCobra").style.width=porce+"%"
						 document.getElementById("table_mas_cuentas_a_cobrar_informe").innerHTML += "<div id='table_mas_cuentas_a_cobrar_informe'></div>"
						 document.getElementById("table_mas_cuentas_a_cobrar_informe").id=""
						  buscarmascuentaacobrarinforme();
					 }else{
						 document.getElementById("tbProcessCuentasCobrar").style.display="none"
						 controldebusquedadCuentaCobrar=false
					 }
					}
			} catch (error) {
				document.getElementById("divProgressCuentaCobra").style.backgroundColor='#ff5722'
				controldebusquedadCuentaCobrar=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function vercerraropcionagendarcliente(d) {
	if (d == "1") {
		$("div[id=divOpcionAgendarCliente]").fadeIn(250)

	} else {
		$("div[id=divOpcionAgendarCliente]").fadeOut(250)
	}
}
function verificarcamposAgendarCliente() {
	var inptMotivoAgenda = document.getElementById('inptAgendarClienteMotivo').value;
	var inptCompromisoAgenda = document.getElementById('inptAgendarClienteFechaCompromiso').value;
	var inptEstadoAgenda = 'Activo';
	
	if (inptMotivoAgenda == "") {
		ver_vetana_informativa("FALTO INGRESAR UN MOTIVO")
		return false;
	}
	
	if (cod_clienteFKAgendar == "") {
		ver_vetana_informativa("FALTO SELECCIONAR CLIENTE")
		return false;
	}
	
	

	var idAbmAgenda = ""
	var accion = "nuevo";
	abmAgendarCliente(inptMotivoAgenda, inptCompromisoAgenda  ,inptEstadoAgenda ,cod_clienteFKAgendar , idAbmAgenda, accion);
}
function abmAgendarCliente(motivo, fechaCompromiso  ,estado , cod_clienteAgenda , idAgenda, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idAgenda", idAgenda)
	datos.append("motivo", motivo)
	datos.append("fechaCompromiso", fechaCompromiso)
	datos.append("estado", estado)
	datos.append("Cod_cobrador", idFkCobrador)
	datos.append("cod_clienteAgenda", cod_clienteAgenda)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmAgenda.php",
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
					document.getElementById('inptAgendarClienteMotivo').value = ""
					document.getElementById('inptAgendarClienteFechaCompromiso').value = ""
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					cod_clienteAgenda = ""
					vercerraropcionagendarcliente("2")
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function buscarCobradorPorZona(datos,idelementselectZona){
	document.getElementById(idelementselectZona).innerHTML = "";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_cobrador": datos.value,
		"funt": "buscaroptioncobradorzona"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
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
				
				document.getElementById(idelementselectZona).innerHTML= datos[2];

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
BUSCAR CHECKEAR BUSQUEDA CUENTA PENDIENTE
*/
function verCerrarFrmTipoBusqueda(d){
	
	if(d=="1"){
		document.getElementById("divAbmTipoBusqueda").style.display ="";
	}else{
		$("div[id=divAbmTipoBusqueda]").fadeOut(500);
	}
}
var array_cod_tipo_cliente = [];
function BuscarAbmTipoBusqueda() {
	document.getElementById("divBuscadorTipoBusqueda").innerHTML = paginacargando
    document.getElementById("lblNroRegistroTipoBusqueda").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscartipobusqueda"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorTipoBusqueda").innerHTML = ''
			document.getElementById("lblNroRegistroTipoBusqueda").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorTipoBusqueda").innerHTML = ''
			document.getElementById("lblNroRegistroTipoBusqueda").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorTipoBusqueda").innerHTML = datos_buscados
				document.getElementById("lblNroRegistroTipoBusqueda").innerHTML="Se encontraron "+datos[3]+" registro(s)";

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function obteneridtipobusqueda(datos){
	var id = datos.id;
	let index = array_cod_tipo_cliente.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_tipo_cliente.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_tipo_cliente.push(id);
    }
}


/*
BUSCAR CHECKEAR BUSQUEDA CUENTA PENDIENTE CREDITO
*/
function verCerrarFrmTipoBusquedaCredito(d){
	if(d=="1"){
		document.getElementById("divAbmTipoBusquedaCredito").style.display ="";
	}else{
		$("div[id=divAbmTipoBusquedaCredito]").fadeOut(500);
	}
}
var array_cod_tipo_cliente_credito = [];
function BuscarAbmTipoBusquedaCredito() {
	
	
	document.getElementById("divBuscadorTipoBusquedaCredito").innerHTML = paginacargando
    document.getElementById("lblNroRegistroTipoBusquedaCredito").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscartipobusquedacredito"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorTipoBusquedaCredito").innerHTML = ''
			document.getElementById("lblNroRegistroTipoBusquedaCredito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorTipoBusquedaCredito").innerHTML = ''
			document.getElementById("lblNroRegistroTipoBusquedaCredito").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorTipoBusquedaCredito").innerHTML = datos_buscados
				document.getElementById("lblNroRegistroTipoBusquedaCredito").innerHTML="Se encontraron "+datos[3]+" registro(s)";

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function obteneridtipobusquedacredito(datos){
	var id = datos.id;
	let index = array_cod_tipo_cliente_credito.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_tipo_cliente_credito.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_tipo_cliente_credito.push(id);
    }
}



/*
HISTORIAL COMPRAS
*/
function verCerrarHistorialCompra(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divHistorialCompra").style.display==""){
		if(controldebusquedadHistorialCompra==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
limpiarcamposHistorialCompra()
		document.getElementById("divMinimizadoHistorialCompra").style.display="none"; 
	$("div[id=divHistorialCompra]").fadeOut(500);
	}else{		
	if(controlacceso("VERHISTORIALCOMPRA","accion")==false){ return;}		
	mostrarSoloUno("divHistorialCompra")	
		document.getElementById("divHistorialCompra").style.display=""
		if(typeof actualizarPieHistorialCompra === "function"){
			actualizarPieHistorialCompra()
		}
	}
}
function minimizarHistorialCompra(){
	//document.getElementById("divHistorialCompra").style.display="none";
	document.getElementById("divMinimizadoHistorialCompra").style.display="";
  copiarBotonEnContenedor(document.getElementById("divMenuHistorialCompra"));
	$("div[id=divHistorialCompra]").fadeOut(500);	
}
function vercerrarfiltroshistorialcompra(d){
	if(d=="1"){
		document.getElementById("divFiltrosHistorialCompras").style.display=""
	}else{
		document.getElementById("divFiltrosHistorialCompras").style.display="none"
	}
}
function limpiarcamposHistorialCompra(){
	if(controldebusquedadHistorialCompra==true){
	return
}
document.getElementById('inptBuscarInfHistorialCompraF1').value=""
document.getElementById('inptBuscarInfHistorialCompraF2').value=""
document.getElementById('inptBuscarHistorialCompra1').value=""
document.getElementById('inptBuscarHistorialCompra2').value=""
document.getElementById('inptBuscarHistorialCompra3').value=""
document.getElementById('inptBuscarHistorialCompra4').value=""
document.getElementById('inptBuscarHistorialCompra5').value=""
if(listadoHistorialCompras) listadoHistorialCompras.establecerRegistros([], false)
else document.getElementById("table_historial_compra").innerHTML = ""
document.getElementById("inptRegistroNroHistorialCompra").value = "";
document.getElementById("inptTotalHistorialCompra").value = "";
document.getElementById("inptDescHistorialCompra").value = "";
document.getElementById("inptTotalPendienteHistorialCompra").value = "";
document.getElementById("inptlTotalPagadoHistorialCompra").value = "";
document.getElementById("inptlTotalConDescuentoHistorialCompra").value = "";
document.getElementById("tbProcessHistorialCompra").style.display = "none";
elementocompra=""
codCompraSeleccionadaListado=""

}
function checkfiltroshistorialcompra(d){
	if(d=="1"){
	document.getElementById('inptCheckHistorialCompra1').checked=true
	document.getElementById('inptCheckHistorialCompra2').checked=false
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInfHistorialCompraF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInfHistorialCompraF2').value = f.getFullYear() + "-" + mes + "-" + dia;		
	}else{		
	document.getElementById('inptCheckHistorialCompra1').checked=false
	document.getElementById('inptCheckHistorialCompra2').checked=true
	document.getElementById('inptBuscarInfHistorialCompraF1').value=""
    document.getElementById('inptBuscarInfHistorialCompraF2').value=""
	}
}
var registrocargadohistorialcompra="";
var totalregistrohistorialcompra="";
var controldebusquedadHistorialCompra=false
function cancelarHistorialCompra(){
	controldebusquedadHistorialCompra=false
	document.getElementById("divProgressHistorialCompra").style.backgroundColor='#ff5722'
}
function buscarhistorialcompra() {
var listado = iniciarListadoHistorialCompras()
var fecha1=document.getElementById('inptBuscarInfHistorialCompraF1').value
var fecha2=document.getElementById('inptBuscarInfHistorialCompraF2').value
var nrocompra=document.getElementById('inptBuscarHistorialCompra1').value
var filtrofecha=document.getElementById('inptBuscarHistorialCompra2').value
var proveedor = document.getElementById('inptBuscarHistorialCompra3').value
var estadopago = document.getElementById('inptBuscarHistorialCompra4').value
var cod_local = document.getElementById('inptBuscarHistorialCompra5').value
var agrupado = document.getElementById('inptBuscarInfHistorialCompraAgrupado').value
var tipo_compra = document.getElementById('inptBuscarHistorialCompra6').value

if(document.getElementById('inptCheckHistorialCompra1').checked==true){
	
	if(fecha1==""){
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
	  return false;
		}
		if(fecha2==""){
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
	  return false;
		}
}
if(document.getElementById('inptCheckHistorialCompra1').checked!=true){
	
    fecha1=""
	fecha2=""
		
}

if(controldebusquedadHistorialCompra==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadHistorialCompra=true

		 document.getElementById("tbProcessHistorialCompra").style.display="none"
		 if(listado) listado.establecerRegistros([], false)
		 document.getElementById("table_historial_compra").innerHTML=paginacargando
		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"nrocompra": nrocompra,
			"filtrofecha": filtrofecha,
			"proveedor": proveedor,
			"estadopago": estadopago,
			"cod_local": cod_local,
			"agrupado": agrupado,
			"tipo_compra": tipo_compra,
			"formato": listado ? "json" : "html",
			"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_historial_compra").innerHTML = ''
			controldebusquedadHistorialCompra=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_historial_compra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
					Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_historial_compra").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptRegistroNroHistorialCompra").value = datos[3];
					document.getElementById("inptTotalHistorialCompra").value = datos[4];
					document.getElementById("inptDescHistorialCompra").value = datos[5];
					document.getElementById("inptTotalPendienteHistorialCompra").value = datos[6];
					document.getElementById("inptlTotalPagadoHistorialCompra").value = datos[7];
					document.getElementById("inptlTotalConDescuentoHistorialCompra").value = datos[8];
					
						registrocargadohistorialcompra=datos[99];
					totalregistrohistorialcompra=datos[100];
				
						 if(totalregistrohistorialcompra>registrocargadohistorialcompra){
						 	var porce=((registrocargadohistorialcompra*100)/totalregistrohistorialcompra).toFixed(0)
	document.getElementById("divProgressHistorialCompra").style.width=porce+"%"
						 if(!listado) document.getElementById("table_historial_compra").insertAdjacentHTML("beforeend", "<div id='table_historial_mas_compra'></div>")
						  buscarMashistorialcompra();
					 }else{
						 controldebusquedadHistorialCompra=false
					 }
				}
			} catch (error) {
				controldebusquedadHistorialCompra=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarMashistorialcompra(c) {
var listado = iniciarListadoHistorialCompras()
var fecha1=document.getElementById('inptBuscarInfHistorialCompraF1').value
var fecha2=document.getElementById('inptBuscarInfHistorialCompraF2').value
var nrocompra=document.getElementById('inptBuscarHistorialCompra1').value
var filtrofecha=document.getElementById('inptBuscarHistorialCompra2').value
var proveedor = document.getElementById('inptBuscarHistorialCompra3').value
var estadopago = document.getElementById('inptBuscarHistorialCompra4').value
var cod_local = document.getElementById('inptBuscarHistorialCompra5').value
var agrupado = document.getElementById('inptBuscarInfHistorialCompraAgrupado').value
var tipo_compra = document.getElementById('inptBuscarHistorialCompra6').value

if(document.getElementById('inptCheckHistorialCompra1').checked==true){
	
	if(fecha1==""){
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
	  return false;
		}
		if(fecha2==""){
			ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN")
	  return false;
		}
}



if(c=="1"){
	controldebusquedadHistorialCompra=true
}
if(controldebusquedadHistorialCompra==false){
	return
}
controldebusquedadHistorialCompra=true

		 document.getElementById("tbProcessHistorialCompra").style.display=""
		 var destinoMasHistorialCompra = document.getElementById("table_historial_mas_compra")
		 if(!listado && !destinoMasHistorialCompra){
			 controldebusquedadHistorialCompra=false
			 return
		 }
		 if(destinoMasHistorialCompra) destinoMasHistorialCompra.innerHTML=paginacargando
		 	document.getElementById("divProgressHistorialCompra").style.backgroundColor=''
			var totalCompra=document.getElementById("inptTotalHistorialCompra").value;
			var totalDescuento=document.getElementById("inptDescHistorialCompra").value;
			var totalPendiente=document.getElementById("inptTotalPendienteHistorialCompra").value
			var totalPagado=document.getElementById("inptlTotalPagadoHistorialCompra").value
			var totalConDescuento=document.getElementById("inptlTotalConDescuentoHistorialCompra").value
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"nrocompra": nrocompra,
			"filtrofecha": filtrofecha,
			"proveedor": proveedor,
			"estadopago": estadopago,
			"cod_local": cod_local,
			"registrocargado": registrocargadohistorialcompra,
			"totalCompra": totalCompra,
			"totalDescuento": totalDescuento,
			"totalPendiente": totalPendiente,
			"totalPagado": totalPagado,
			"agrupado": agrupado,
			"tipo_compra": tipo_compra,
			"totalConDescuento": totalConDescuento,
			"formato": listado ? "json" : "html",
			"funt": "buscarmas"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(destinoMasHistorialCompra) destinoMasHistorialCompra.innerHTML = ''
			document.getElementById("divProgressHistorialCompra").style.backgroundColor='#ff5722'
			controldebusquedadHistorialCompra=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(destinoMasHistorialCompra) destinoMasHistorialCompra.innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
					Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, true)
					else if(destinoMasHistorialCompra) destinoMasHistorialCompra.innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptRegistroNroHistorialCompra").value = datos[3];
					document.getElementById("inptTotalHistorialCompra").value = datos[4];
					document.getElementById("inptDescHistorialCompra").value = datos[5];
					document.getElementById("inptTotalPendienteHistorialCompra").value = datos[6];
					document.getElementById("inptlTotalPagadoHistorialCompra").value = datos[7];
					document.getElementById("inptlTotalConDescuentoHistorialCompra").value = datos[8];
					
						registrocargadohistorialcompra=datos[99];
					
				
						 if(totalregistrohistorialcompra>registrocargadohistorialcompra){
						 	var porce=((registrocargadohistorialcompra*100)/totalregistrohistorialcompra).toFixed(0)
	document.getElementById("divProgressHistorialCompra").style.width=porce+"%"
						 if(!listado && destinoMasHistorialCompra){
						 	destinoMasHistorialCompra.insertAdjacentHTML("beforeend", "<div id='table_historial_mas_compra'></div>")
						 	destinoMasHistorialCompra.id=""
						 }
						  buscarMashistorialcompra();
					 }else{
						 document.getElementById("tbProcessHistorialCompra").style.display="none"
						 controldebusquedadHistorialCompra=false
					 }
					
				}
			} catch (error) {
				document.getElementById("divProgressHistorialCompra").style.backgroundColor='#ff5722'
				controldebusquedadHistorialCompra=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function verCerrarVentanasHistorialCompra(d){
	document.getElementById("btnHistorialCompra1").style=''
	document.getElementById("btnHistorialCompra2").style=''
	document.getElementById("btnHistorialCompra3").style=''
	document.getElementById("divHistorialCompra1").style.display='none'
	document.getElementById("divHistorialCompra2").style.display='none'
	document.getElementById("divHistorialCompra3").style.display='none'	
	if(d=="1"){
		document.getElementById("btnHistorialCompra1").style='background-color:#FF9800;color:#fff'
		document.getElementById("divHistorialCompra1").style.display=''
	}	
	if(d=="2"){
			if (elementocompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		verCerrarVentanasHistorialCompra("1")
		return false;
	}	
		 buscarDetallesHistorialCompra()
		 	document.getElementById("btnHistorialCompra2").style='background-color:#FF9800;color:#fff'
		document.getElementById("divHistorialCompra2").style.display=''
	}
	if(d=="3"){
			if (elementocompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		verCerrarVentanasHistorialCompra("1")
		return false;
	}	
		 buscarPagosHistorialCompra()
		 	document.getElementById("btnHistorialCompra3").style='background-color:#FF9800;color:#fff'
		document.getElementById("divHistorialCompra3").style.display=''
	}	
}
function buscarDetallesHistorialCompra() {	
			if (elementocompra == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	var listado = iniciarListadoDetalleHistorialCompra()
	var codCompra = $(elementocompra).children('td[id="td_datos_5"]').html();
	if (listado) listado.establecerRegistros([], false)
	document.getElementById("table_detalles_historial_compra").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": codCompra,
		"formato": listado ? "json" : "html",
		"funt": "detalleenhistorial"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetallecompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([], false)
			else document.getElementById("table_detalles_historial_compra").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if (listado) listado.establecerRegistros([], false)
			else document.getElementById("table_detalles_historial_compra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_detalles_historial_compra").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarPagosHistorialCompra() { 
	var listado = iniciarListadoPagosHistorialCompra()
	var codCompra = $(elementocompra).children('td[id="td_datos_5"]').html();
		 if(listado) listado.establecerRegistros([], false)
		 document.getElementById("table_pagos_historial_compra").innerHTML=paginacargando
		 	document.getElementById("inptTotalRegistroPagoCompraHist").value =""
		 	document.getElementById("inptTotalPagoCompraHist").value =""
		 	document.getElementById("inptTotalPagodoPagoCompraHist").value =""
		 	document.getElementById("inptTotalPendientePagoCompraHist").value =""
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": codCompra,
			"formato": listado ? "json" : "html",
			"funt": "buscarpagoscomprahistorial"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_pagos_historial_compra").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(listado) listado.establecerRegistros([], false)
			else document.getElementById("table_pagos_historial_compra").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados, false)
					else document.getElementById("table_pagos_historial_compra").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
						document.getElementById("inptTotalRegistroPagoCompraHist").value =datos[3];
		 	        document.getElementById("inptTotalPagoCompraHist").value  =datos[4];
		 	        document.getElementById("inptTotalPagodoPagoCompraHist").value =datos[5];
		 	         document.getElementById("inptTotalPendientePagoCompraHist").value =datos[6];
					 document.getElementById('btnAuditoriaPagosCompras').style.backgroundColor="#d5d3d3";
					 
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var elementocompra = ""
function obtenerdatosacompra(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	elementocompra = datostr;
	codCompraSeleccionadaListado = $(datostr).children('td[id="td_datos_5"]').text();
	document.getElementById('inptRegistroSeleccHistorialCompra').value = $(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById('inptRegistroSeleccionadoCuentaApagar').value = $(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById('inptUsuarioInsertadoPor').value=$(datostr).children('td[id="td_datos_100"]').text()
	document.getElementById('inptFechaInsertadoPor').value=$(datostr).children('td[id="td_datos_102"]').text()
	document.getElementById('inptUsuarioEditadoPor').value=$(datostr).children('td[id="td_datos_101"]').text()
	document.getElementById('inptFechaEditadoPor').value=$(datostr).children('td[id="td_datos_103"]').text()
	document.getElementById('btnAuditoriaCompras').style.backgroundColor="#673ab7";
}
function obtenerdatospagohistorial(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});

	document.getElementById('inptUsuarioInsertadoPor').value=$(datostr).children('td[id="td_datos_100"]').text()
	document.getElementById('inptFechaInsertadoPor').value=$(datostr).children('td[id="td_datos_102"]').text()
	document.getElementById('inptUsuarioEditadoPor').value=$(datostr).children('td[id="td_datos_101"]').text()
	document.getElementById('inptFechaEditadoPor').value=$(datostr).children('td[id="td_datos_103"]').text()
	document.getElementById('btnAuditoriaPagosCompras').style.backgroundColor="#673ab7";
}
var codProveedorComprainf = "";
/*
GARANTIAS Y CAMBIOS
*/

var elementoDevolucion = ""
var comisioncambio = ""
var codVentaCambio = ""
var codDetalleCambiio = ""
var idFkProductocompraCambio = ""//el selecc Para cambiar
var CodProductocompraCambio = ""//cod del producto
var cantidaCambio = ""
var MetodoPagoCambio = ""
function verCerrarGarantias(d) {
	if (d == "1") {
		if (elementoDevolucion == "") {
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return false;
		}
		
		var datos = elementoDevolucion;
		document.getElementById("inptProductoDevolucionGarantia").value = $(datos).children('td[id="td_datos_2"]').html();
		document.getElementById("inptCostoDevolucionGarantia").value = $(datos).children('td[id="td_datos_4"]').html();
		document.getElementById("inptNroVentaGarantia").value = $(datos).children('td[id="td_datos_12"]').html();
		document.getElementById("inptFechaGarantia").value = $(datos).children('td[id="td_datos_13"]').html();
		document.getElementById("inptTelefonoAvisoGarantia").value = $(datos).children('td[id="td_datos_14"]').html();
			var f = new Date();
	var dia =f.getDate()
	if(dia<10){
		dia="0"+dia;
	}
	var mes =f.getMonth()+1
	if(mes<10){
		mes="0"+mes;
	}
	var hora =f.getHours()
	if(hora<10){
		hora="0"+hora;
	}
	var min =f.getMinutes()
	if(min<10){
		min="0"+min;
	}
  var fechaimpresion=f.getFullYear()+"-"+mes+"-"+dia;
  document.getElementById("inptFechaRecibidoGarantia").value =fechaimpresion
		codDetalleCambiio = $(datos).children('td[id="td_datos_9"]').html();
		CodProductocompraCambio = $(datos).children('td[id="td_datos_1"]').html();
		codVentaCambio = $(datos).children('td[id="td_datos_10"]').html();
		cantidaCambio = $(datos).children('td[id="td_datos_5"]').html();
		
		document.getElementById("divGarantiaProductoDevolucion").style.display=""
  
	} else {
 
		$("div[id=divGarantiaProductoDevolucion]").fadeOut(500)
	}
}
function verificargarantiaproducto() {
     var inptObservacionGarantia=document.getElementById("inptObservacionGarantia").value
     var inptFechaRecibidoGarantia=document.getElementById("inptFechaRecibidoGarantia").value
     var inptTelefonoAvisoGarantia=document.getElementById("inptTelefonoAvisoGarantia").value
	if (codDetalleCambiio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	if (CodProductocompraCambio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	if (inptObservacionGarantia == "") {
		ver_vetana_informativa("FALTO INGRESAR UNA OBSERVACIÓN ")
		return false;
	}
	if (inptFechaRecibidoGarantia == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN FECHA ")
		return false;
	}
	abmgarantia(inptTelefonoAvisoGarantia,inptObservacionGarantia,inptFechaRecibidoGarantia,codDetalleCambiio, CodProductocompraCambio, codVentaCambio, cantidaCambio, "NuevoGarantia")
}
function abmgarantia(telefonoaviso,observacion,fecharecibido,cod_detalle, cod_productoFK, cod_ventaFK, cantidaCambio, operacion) {
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", operacion)
	datos.append("cod_detalle", cod_detalle)
	datos.append("cod_productoFK", cod_productoFK)
	datos.append("cod_ventaFK", cod_ventaFK)
	datos.append("cantidaCambio", cantidaCambio)
	datos.append("observacion", observacion)
	datos.append("fecharecibido", fecharecibido)
	datos.append("telefonoaviso", telefonoaviso)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
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
					ImprimirDivTicketGarantia()
					verCerrarGarantias("")
                   document.getElementById("inptProductoDevolucionGarantia").value = "";
	         	   document.getElementById("inptCostoDevolucionGarantia").value = "";
		           document.getElementById("inptNroVentaGarantia").value = "";
		           document.getElementById("inptFechaGarantia").value = ""; 
		           document.getElementById("inptObservacionGarantia").value = ""; 
		           document.getElementById("inptRegistroSeleccionadoDetalleVentaHistorial").value = ""; 
				   elementoDevolucion=""
				    buscarDetallesHistorialVenta()
				}
				

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function verCerrarCambio(d) {
	if (d == "1") {
		if (elementoDevolucion == "") {
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return false;
		}
			
		var datos = elementoDevolucion;
		document.getElementById("inptProductoSeleccionadoCambio").value = $(datos).children('td[id="td_datos_2"]').html();		
		comisioncambio = $(datos).children('td[id="td_datos_8"]').html();
		codDetalleCambiio = $(datos).children('td[id="td_datos_9"]').html();
		codVentaCambio = $(datos).children('td[id="td_datos_10"]').html();
		cantidaCambio = $(datos).children('td[id="td_datos_5"]').html();
		CodProductocompraCambio = $(datos).children('td[id="td_datos_1"]').html();
		MetodoPagoCambio = $(datos).children('td[id="td_datos_11"]').html();
        limpiarCamposProductosCambios()
		document.getElementById("table_abm_detalle_Cambio").innerHTML="";
		document.getElementById("divCambiarProducto").style.display=""
  
	} else {
 
 
		$("div[id=divCambiarProducto]").fadeOut(500)
	}
}
function seleccionarprecioscambio(datos) {
	document.getElementById("inptCostoCambio").value = datos.value
	calcular_total_venta_cambios();
}
function calcularTotalVentasCostoCambios(datos) {
	separadordemiles(datos)
	calcular_total_venta_cambios()
}
function calcular_total_venta_cambios() {
	var c = QuitarSeparadorMilValor(document.getElementById('inptCantCambio').value);
	var t = QuitarSeparadorMilValor(document.getElementById('inptCostoCambio').value);
	var d = QuitarSeparadorMilValor(document.getElementById('inptDescuentoCambio').value);
	if (isNaN(c)) {
		document.getElementById('inptCantCambio').value = 0;
		c = 0;
	}
	if (isNaN(d)) {
		document.getElementById('inptDescuentoCambio').value = 0;
		d = 0;
	}
	var c = parseFloat(c);
	var t = parseFloat(t);
	document.getElementById('inpTotalCostoCambio').value = (t * c)-d;
	//separadordemiles(document.getElementById('inpt_interes_pago_venta'))
	separadordemiles(document.getElementById('inptCostoCambio'))
	separadordemiles(document.getElementById('inpTotalCostoCambio'))	
	if(d>0){
		var obs=$("select[id=inpTSeleccCostoCambio]").children(":selected").text() 
		document.getElementById("inptObservacionCambio").value=obs+", Descuento: "+d
	}else{
		var obs=$("select[id=inpTSeleccCostoCambio]").children(":selected").text() 
		document.getElementById("inptObservacionCambio").value=obs
	}
}



function anhadirProductoEnDetalleCambio(){	
	var inptProductoVenta = document.getElementById('inptProductoSeleccCambio').value
	var inptCantProductoVenta = document.getElementById('inptCantCambio').value
	var inpTotalCostoVenta = document.getElementById('inpTotalCostoCambio').value
	var inptCostoProductoVenta = document.getElementById('inptCostoCambio').value
	var inptObservacionDetalleVenta = document.getElementById('inptObservacionCambio').value
	var inptDescuentoProductoVenta = document.getElementById('inptDescuentoCambio').value
	if (idFkProductocompraCambio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
		return false;
	}	
	var pagina="<table class='tableRegistroSearch' border='0' cellspacing='0' cellpadding='0'>"
+"<tr id='tbSelecRegistro' onclick='SeleccionarProductoCambioOffline(this)'  name='tdDetalleCambioOffline'>"
+"<td id='td_id_1' style='display:none'>"+idFkProductocompraCambio+"</td>"
+"<td  id='td_datos_1' style='width:20%;'>"+inptProductoVenta+"</td>"
+"<td  id='td_datos_6' style='display:none'>"+inptObservacionDetalleVenta+"</td>"
+"<td  id='td_datos_3' style='width:10%'>"+inptCostoProductoVenta+"</td>"
+"<td  id='td_datos_9' style='display:none'>"+inptDescuentoProductoVenta+"</td>"
+"<td  id='td_datos_4' style='width:5%'>"+inptCantProductoVenta+"</td>"
+"<td  id='td_datos_5' style='width:10%'>"+inpTotalCostoVenta+"</td>"
+"</tr>"
+"</table>"
document.getElementById("table_abm_detalle_Cambio").innerHTML+=pagina;
// var totalProductoCambios=0;
// $("tr[name=tdDetalleCambioOffline]").each(function(i, elementohtml){
// var total=$(elementohtml).children('td[id="td_datos_5"]').html();
// total=QuitarSeparadorMilValor(total)
// totalProductoCambios=Number(totalProductoCambios)+Number(total)
	   // });
	   // var totalVentaAnterio=document.getElementById("inptTotalVentaCambioAnterior").value
// totalVentaAnterio=QuitarSeparadorMilValor(totalVentaAnterio);
// var totalProducto=document.getElementById("inptCostoCambio1").value
// totalProducto=QuitarSeparadorMilValor(totalProducto);
// var TotalVentaActual=Number(totalVentaAnterio)-Number(totalProducto)
// var TotalVentaActual=Number(TotalVentaActual)+Number(totalProductoCambios)
// document.getElementById("inptTotalVentaCambioActual").value=separadordemilesnumero(TotalVentaActual);
limpiarCamposProductosCambios()
}
var elementoDetalleCambio="";
function SeleccionarProductoCambioOffline(datos) {	
		elementoDetalleCambio= datos;
		document.getElementById("inptNombreProductoDetalleOpcionCambio").value = $(datos).children('td[id="td_datos_1"]').html();
		document.getElementById("inptObsProductoDetalleOpcionCambio").value = $(datos).children('td[id="td_datos_6"]').html();
		vercerrarOpcionesDetallesCambios("1")	
}
function vercerrarOpcionesDetallesCambios(d){
	if(d=="1"){
		document.getElementById('divOpcionesDetallesCambios').style.display=""
	}else{
		document.getElementById('divOpcionesDetallesCambios').style.display="none"
	}
}
function eleminarDetallesCambios(d){
	$(elementoDetalleCambio).remove()
	vercerrarOpcionesDetallesCambios("2")
	// var totalProductoCambios=0;
// $("tr[name=tdDetalleCambioOffline]").each(function(i, elementohtml){
// var total=$(elementohtml).children('td[id="td_datos_5"]').html();
// total=QuitarSeparadorMilValor(total)
// totalProductoCambios=Number(totalProductoCambios)+Number(total)
	   // });	   
// var totalVentaAnterio=document.getElementById("inptTotalVentaCambioAnterior").value
// totalVentaAnterio=QuitarSeparadorMilValor(totalVentaAnterio);
// var totalProducto=document.getElementById("inptCostoCambio1").value
// totalProducto=QuitarSeparadorMilValor(totalProducto);
// var TotalVentaActual=Number(totalVentaAnterio)-Number(totalProducto)
// var TotalVentaActual=Number(TotalVentaActual)+Number(totalProductoCambios)	   
// document.getElementById("inptTotalVentaCambioActual").value=separadordemilesnumero(TotalVentaActual);
limpiarCamposProductosCambios()
	ver_vetana_informativa("DETALLE ELIMINADO")	
}
function limpiarCamposProductosCambios(){
	document.getElementById('inptProductoSeleccCambio').value = ""
document.getElementById('inptCantCambio').value = ""
document.getElementById('inpTotalCostoCambio').value = ""
document.getElementById('inptCostoCambio').value = ""
document.getElementById('inptObservacionCambio').value = ""
document.getElementById('inptDescuentoCambio').value = ""
idFkProductocompraCambio = ""
}
function verificarcambioproducto() {
var controlDetalle=0;
$("tr[name=tdDetalleCambioOffline]").each(function(i, elementohtml){
controlDetalle=Number(controlDetalle)+Number(1)
	   });
if(controlDetalle==0){
	ver_vetana_informativa("FALTO AÑADIR PRODUCTOS")
	return
}
	if (codDetalleCambiio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}   
   if (codVentaCambio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	if(controlacceso("INSERTARCAMBIOSYGARANTIAS","accion")==false){	   
	   //SIN PERMISO
	   return;
		}
   abmcambio(codDetalleCambiio, codVentaCambio,MetodoPagoCambio)
}



function abmcambio(cod_detalle, cod_ventaFK,MetodoPagoCambio) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();	
		var control=1;
	$("tr[name=tdDetalleCambioOffline]").each(function(i, elementohtml){	
	var idproducto=$(elementohtml).children('td[id="td_id_1"]').html();
    datos.append("cod_productoFK"+control, idproducto)	
	var cantidad=$(elementohtml).children('td[id="td_datos_4"]').html();
    datos.append("cantidad_detalle"+control, cantidad)
	var precio=$(elementohtml).children('td[id="td_datos_3"]').html();
    datos.append("precio_producto"+control, precio)	
	var subotal=$(elementohtml).children('td[id="td_datos_5"]').html();
    datos.append("subtotal"+control, subotal)	
	//var comision=$(elementohtml).children('td[id="td_datos_7"]').html();
    datos.append("comision"+control, 0)	
	var descuento=$(elementohtml).children('td[id="td_datos_8"]').html();
    datos.append("descuento"+control, descuento)	
	var detalleproducto=$(elementohtml).children('td[id="td_datos_6"]').html();
    datos.append("detalleproducto"+control, detalleproducto)
	control=control+1;	
	   });
	control=control-1;	
	if(control<0){
	ver_vetana_informativa("FALTO AÑADIR PRODUCTOS")
	return
}	
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "cambio")
	datos.append("cod_detalle", cod_detalle)
	datos.append("cod_ventaFK", cod_ventaFK)
	datos.append("cantidaCambio", cantidaCambio)
	datos.append("CodProductocompraCambio", CodProductocompraCambio)
	datos.append("MetodoPagoCambio", MetodoPagoCambio)
	datos.append("TotalRegistro", control)
	datos.append("Local_FK", cod_localFKUSer)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
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
			document.getElementById("divCambiarProducto").style.display="none"
			document.getElementById("inptTotalVentaRefinanciadoCambio").value=datos["2"];
			
	        document.getElementById("divRefinanciar").style.display=""
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}



function verificarrefinanciamiento() {
if(controlacceso("REFINANCIARCUOTARESTANTE","accion")==false){	   
	   //SIN PERMISO
	   return;
		}
	var inptPendienteVentaRefinanciadoCambio = document.getElementById('inptPendienteVentaRefinanciadoCambio').value
	var inputSelectMetodoCambio = document.getElementById('inputSelectMetodoCambio').value
	var inptCuotaNroCambio = document.getElementById('inptCuotaNroCambio').value
	var inptFechaVentaCambio = document.getElementById('inptFechaVentaCambio').value
	var inptMonotCambio = document.getElementById('inptMonotCambio').value
	var inptInteresVentaCambio = document.getElementById('inptInteresVentaCambio').value
	var inptDiasVentaCambio = document.getElementById('inptDiasVentaCambio').value
	if (codVentaCambio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
		return false;
	}
	if (inptPendienteVentaRefinanciadoCambio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL TOTAL FINANCIADO")
		return false;
	}
	if (inputSelectMetodoCambio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL METODO DEL PAGO")
		return false;
	}
	if (inptCuotaNroCambio == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE CUOTA")
		return false;
	}
	if (inptFechaVentaCambio == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO PAGO")
		return false;
	}
	if (inptInteresVentaCambio == "") {
		inptInteresVentaCambio=0
	}
	if (inptDiasVentaCambio == "") {
		inptDiasVentaCambio=0
	}
	abmrefinacimiento(inptInteresVentaCambio,inptDiasVentaCambio,inptMonotCambio,inptPendienteVentaRefinanciadoCambio, inputSelectMetodoCambio, inptCuotaNroCambio, inptFechaVentaCambio, codVentaCambio)
}
function abmrefinacimiento(dias,interes,Monto,total,  metodopago, nroCuota,  iniciopago, cod_venta) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "refinanciarencambio")
	datos.append("cod_venta", cod_venta)
	datos.append("metodopago", metodopago)
	datos.append("iniciopago", iniciopago)
	datos.append("nroCuota", nroCuota)
	datos.append("total", total)
	datos.append("Monto", Monto)
	datos.append("dias", dias)
	datos.append("interes", interes)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
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


				}

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
