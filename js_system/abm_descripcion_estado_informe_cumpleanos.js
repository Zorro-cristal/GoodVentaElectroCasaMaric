/*
ABM DESCRIPCION ESTADO INFORME CUMPLEAÑOS
*/
var listadoAbmDescripcionEstadoInformeCumple = null;
function iniciarListadoAbmDescripcionEstadoInformeCumple() {
	if (listadoAbmDescripcionEstadoInformeCumple || !window.AbmListadoCore) { return listadoAbmDescripcionEstadoInformeCumple; }
	var cuerpo = document.getElementById("divBuscadorDescripcionEstadoInformeCumple");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmDescripcionEstadoInformeCumple";
	listadoAbmDescripcionEstadoInformeCumple = window.AbmListadoCore.crear({
		nombre: "descripcion_estado_informe_cumple",
		idCabecera: "cabeceraAbmDescripcionEstadoInformeCumple",
		idCuerpo: "divBuscadorDescripcionEstadoInformeCumple",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmDescripcionEstadoInformeCumple",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmDescripcionEstadoInformeCumple.iniciar();
	return listadoAbmDescripcionEstadoInformeCumple;
}
var idAbmDescripcionEstadoInformeCumple="";
var ElementoSeleccDescripcionEstadoInformeCumple="";
function verCerrarFrmDescripcionEstadoInformeCumple(d){
	if(d=="1"){
		if(controlacceso("CREARNUEVADESCRIPCIONESTADOINFORMECUMPLE","accion")==false){return;}	
		$("div[id=divAbmDescripcionEstadoInformeCumple]").fadeIn(500);
		BuscarAbmDescripcionEstadoInformeCumple()
	}else{
		$("div[id=divAbmDescripcionEstadoInformeCumple]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionEstadoInformeCumple(){
	document.getElementById("inptNombreDescripcionEstadoInformeCumple").value="";
	document.getElementById("inptEstadoDescripcionEstadoInformeCumple").value="";
	document.getElementById("btnDescripcionEstadoInformeCumple1").value="Guardar Datos"
	idAbmDescripcionEstadoInformeCumple="";
	ElementoSeleccDescripcionEstadoInformeCumple="";
}
function ObtenerdatosAbmDescripcionEstadoInformeCumple(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionEstadoInformeCumple=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionEstadoInformeCumple").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionEstadoInformeCumple").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionEstadoInformeCumple = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionEstadoInformeCumple1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionEstadoInformeCumple(){
	if(ElementoSeleccDescripcionEstadoInformeCumple==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionEstadoInformeCumple").style.display="none";
	 LimpiarCamposDescripcionEstadoInformeCumple()
}
function VerificarDatosDescripcionEstadoInformeCumple(){
	var inptNombreDescripcionEstadoInformeCumple = document.getElementById("inptNombreDescripcionEstadoInformeCumple").value
	var inptEstadoDescripcionEstadoInformeCumple = document.getElementById("inptEstadoDescripcionEstadoInformeCumple").value	
	if(inptNombreDescripcionEstadoInformeCumple==""){
		document.getElementById("inptNombreDescripcionEstadoInformeCumple").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionEstadoInformeCumple==""){
		document.getElementById("inptEstadoDescripcionEstadoInformeCumple").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionEstadoInformeCumple != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionEstadoInformeCumple(inptNombreDescripcionEstadoInformeCumple,inptEstadoDescripcionEstadoInformeCumple,idAbmDescripcionEstadoInformeCumple,accion)
}
function AbmDescripcionEstadoInformeCumple(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionEstadoInformeCumple.php",
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
				LimpiarCamposDescripcionEstadoInformeCumple()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionEstadoInformeCumple()
				BuscarSelecDescripcionEstadoInformeCumple()
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
function BuscarAbmDescripcionEstadoInformeCumple() {
	var listado = iniciarListadoAbmDescripcionEstadoInformeCumple();
	var buscador = document.getElementById("inptBuscarAbmDescripcionEstadoInformeCumples").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionEstadoInformeCumple").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionEstadoInformeCumple").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionEstadoInformeCumple").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionEstadoInformeCumple.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionEstadoInformeCumple").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionEstadoInformeCumple").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionEstadoInformeCumple").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionEstadoInformeCumple").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
                   document.getElementById("lblNroRegistroDescripcionEstadoInformeCumple").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmDescripcionEstadoInformeCumple);
} else {
	iniciarListadoAbmDescripcionEstadoInformeCumple();
}
function BuscarSelecDescripcionEstadoInformeCumple() {
	document.getElementById("inptEstadoCargarDetalleClienteCumple").innerHTML = ""
	document.getElementById("inptEstadoCumpleCliente").innerHTML = ""
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionEstadoInformeCumple.php",
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
					document.getElementById("inptEstadoCargarDetalleClienteCumple").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptEstadoCumpleCliente").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
				
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}




//OPCIONES DE PAGO
var controlPago = 0;
function verCerrarVentanaAnhadirPagoVenta(d){
	if(d=="1"){
		var controlventa = 0;
		$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
		controlventa=controlventa+1;
		});
		
	
		if(controlventa <= 0){
		ver_vetana_informativa("NO HAY NINGUNA VENTA EN PROCESO");
		return;
		}
		document.getElementById("divOpcionesPago").style.display="";
		document.getElementById("divFinalizarVentaAContado").style.display="none";
		document.getElementById('inptTotalaPagar').value = document.getElementById('inptTotalVentaTerminar').value;
		prepararGrillaPagoVenta(true);
		}else{
			document.getElementById("divOpcionesPago").style.display="none";
			document.getElementById("divFinalizarVentaAContado").style.display="";
	}
}
 



function QuitarSeparadorMilValor(inputs) {
	try {
			var i = inputs.toString();
	i = i.replace(/\./g, '')
	i = i.replace(',', '.')
	return i;
			} catch (error) {
				return "0";
			}

}
var elementopagoseleccionado="";
function SeleccionarPagoOffline(datostr) {
	elementopagoseleccionado = datostr
	document.getElementById('elementoEliminarPago').innerHTML = $(datostr).children('td[id="td_datos_1"]').html() +" - <b>"+ $(datostr).children('td[id="td_datos_3"]').html() + "</b>";
	document.getElementById('divOpcionPago').style.display="" ;
}
function EliminarPago() {
	if(confirm("ELIMINAR ESTE PAGO?")){
		var codigotable=$(elementopagoseleccionado).children('td[id="td_id_1"]').html()
		$("table[id="+codigotable+"]").remove()

var totalPago=0;
controlPago = 0;
$("tr[name=tdDetallePagoOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_3"]').html();
 total = QuitarSeparadorMilValor(total);
totalPago=Number(totalPago)+Number(total);
totalPago = totalPago.toString()
controlPago=controlPago+1;
});
document.getElementById("inpTotalPagadoVenta").value=separadordemilesnumero(totalPago);

verCerrarOpcionPago()
	}
}
function verCerrarOpcionPago() {
	document.getElementById('divOpcionPago').style.display="none";
	 elementopagoseleccionado="";
}

 

function limpiarCamposAnhadirPagos(){
	document.getElementById('inptTotalaPagar').value = "0"
	document.getElementById('inpTotalPagadoVenta').value = ""
	prepararGrillaPagoVenta(true);
	limpiarDatosDepositoPagoGrilla("div_opciones_pago");
	elementopagoseleccionado = "";
}
function buscarTipoPagoOption() {
	document.getElementById("inptTipoPagoVenta").innerHTML ="";
	document.getElementById("inptTipoPagoCredito").innerHTML ="";
	document.getElementById("inptTipoPagoCreditoParcial").innerHTML ="";
	document.getElementById("inptBuscarCobrosRealizados5").innerHTML ="";
	// document.getElementById("inptSelectBuscarDetalleResumenCobrador2").innerHTML ="";
	document.getElementById("inptBuscarResumenCobradorPagoMetodo").innerHTML ="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmTipoVenta.php",
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
					document.getElementById("inptTipoPagoVenta").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					document.getElementById("inptTipoPagoCredito").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					document.getElementById("inptTipoPagoCreditoParcial").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					document.getElementById("inptBuscarCobrosRealizados5").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					// document.getElementById("inptSelectBuscarDetalleResumenCobrador2").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					document.getElementById("inptBuscarResumenCobradorPagoMetodo").innerHTML ="<option value=''>SELECCIONAR</option>" + datos_buscados
					renderizarTiposPagoVenta(datos_buscados);
					renderizarTiposPagoCredito(datos_buscados);
					renderizarTiposPagoCreditoParcial(datos_buscados);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}








//OPCIONES DE PAGO CREDITO
var controlPagoCredito = 0;
function verCerrarVentanaAnhadirPagoCredito(d){
	if(d=="1"){
		
		document.getElementById("divOpcionesPagoCredito").style.display="";
		document.getElementById('inptTotalaPagarCredito').value = document.getElementById('inptMontoClienteAPagar').value;
		prepararGrillaPagoCredito(true);
		
		document.getElementById('divConfirmarPago').style.display="none";
		}else{
			document.getElementById("divOpcionesPagoCredito").style.display="none";
			document.getElementById('divConfirmarPago').style.display="";
	}
}
	
function anhadirPagpEgreso(){
	var valor = $("select[id=inptTipoPagoCredito]").children(":selected").attr("id")
	let monto = document.getElementById('inptMontoPagosCredito').value
	let idtipopago = document.getElementById("inptTipoPagoCredito").value;
	if(monto == ""){
		ver_vetana_informativa("NO INGRESÓ NINGÚN PAGO");
		return;
	}
		if(idtipopago == ""){
		ver_vetana_informativa("NO SELECCIONÓ MÉTODO DE PAGO");
		return;
	}
	document.getElementById('inptMontoEgreso').value = monto
	if(valor=="SI"){
		verCerrarVentanaConfirmarEgreso("1")
	}else{
		anhadirPagoCredito()
	}
}


function limpiarEgresoPago(){
	document.getElementById('inptMontoEgreso').value =""
	document.getElementById('inptMotivoEgreso').value=""
	document.getElementById('inptNroCuentaEgreso').value=""
	document.getElementById('inptBancoEgreso').value=""
	document.getElementById('inptTransaccionEgreso').value=""
	document.getElementById('inptTipoPagoCredito').value=""
}

function anhadirPagoCredito(){
	let tipopago = $('select[id="inptTipoPagoCredito"] option:selected').text();	
	let idtipopago = document.getElementById("inptTipoPagoCredito").value;
	let monto = document.getElementById('inptMontoPagosCredito').value
	
	let MontoDeposito = document.getElementById('inptMontoEgreso').value
	let MotivoDeposito = document.getElementById('inptMotivoEgreso').value
	let nroCuentaDeposito = document.getElementById('inptNroCuentaEgreso').value
	let BancoDeposito = document.getElementById('inptBancoEgreso').value
	let NroBoletaDeposito = document.getElementById('inptTransaccionEgreso').value
	var valor = $("select[id=inptTipoPagoCredito]").children(":selected").attr("id")
	let totalaPagar = document.getElementById('inptTotalaPagarCredito').value;
	let totalPagado = document.getElementById('inpTotalPagadoCredito').value;
	totalaPagar = QuitarSeparadorMilValor(totalaPagar);
	totalPagado = QuitarSeparadorMilValor(totalPagado);
	
	
	
	let total = Number(totalPagado) + Number(QuitarSeparadorMilValor(monto));
	
	if(total > Number(totalaPagar)){
		ver_vetana_informativa("LA TOTALIDAD HA SUPERADO EL LÍMITE DE PAGO");
		document.getElementById('inptMontoPagosCredito').value = ""
		return;
	}
	
	
	
	var f = new Date();	
	var anho = f.getFullYear()

	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	let fechapago =  anho+"-" + mes + "-" +dia;
	
  	var codigo=stringGenerador(5);
	var pagina="<table id='"+codigo+"' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>"
+"<tr id='tbSelecRegistro' onclick='SeleccionarPagoCreditoOffline(this)'  name='tdDetallePagoCreditoOffline' >"
+"<td  id='td_id_1' style='display:none'>"+codigo+"</td>"
+"<td  id='td_id_2' style='display:none'>"+idtipopago+"</td>"
+"<td  id='td_datos_1' style='width:33%;'>"+tipopago+"</td>"
+"<td  id='td_datos_3' style='width:33%'>"+monto+"</td>"
+"<td  id='td_datos_2' style='width:33%'>"+fechapago+"</td>"
+"<td  id='td_datos_4' style='display:none'>"+MontoDeposito+"</td>"
+"<td  id='td_datos_5' style='display:none'>"+MotivoDeposito+"</td>"
+"<td  id='td_datos_6' style='display:none'>"+nroCuentaDeposito+"</td>"
+"<td  id='td_datos_7' style='display:none'>"+BancoDeposito+"</td>"
+"<td  id='td_datos_8' style='display:none'>"+NroBoletaDeposito+"</td>"
+"<td  id='td_datos_9' style='display:none'>"+valor+"</td>"
+"</tr>"
+"</table>"

document.getElementById("div_opciones_pago_credito").innerHTML+=pagina;


var totalPago=0;
controlPago = 0;
$("tr[name=tdDetallePagoCreditoOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_3"]').html();
 total = QuitarSeparadorMilValor(total);
totalPago=Number(totalPago)+Number(total);
totalPago = totalPago.toString()
controlPago=controlPago+1;
});
limpiarEgresoPago();
document.getElementById('inptMontoPagosCredito').value = "";
document.getElementById("inpTotalPagadoCredito").value=separadordemilesnumero(totalPago);
}
function QuitarSeparadorMilValor(inputs) {
	try {
			var i = inputs.toString();
	i = i.replace(/\./g, '')
	i = i.replace(',', '.')
	return i;
			} catch (error) {
				return "0";
			}

}
var elementopagocreditoseleccionado="";
function SeleccionarPagoCreditoOffline(datostr) {
	elementopagocreditoseleccionado = datostr
	document.getElementById('elementoEliminarPagoCredito').innerHTML = $(datostr).children('td[id="td_datos_1"]').html() +" - <b>"+ $(datostr).children('td[id="td_datos_3"]').html() + "</b>";
	document.getElementById('divOpcionPagoCredito').style.display="" ;
}
function EliminarPagoCredito() {
	if(confirm("ELIMINAR ESTE PAGO?")){
		var codigotable=$(elementopagocreditoseleccionado).children('td[id="td_id_1"]').html()
		$("table[id="+codigotable+"]").remove()

var totalPago=0;
controlPago = 0;
$("tr[name=tdDetallePagoCreditoOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_3"]').html();
 total = QuitarSeparadorMilValor(total);
totalPago=Number(totalPago)+Number(total);
totalPago = totalPago.toString()
controlPago=controlPago+1;
});
document.getElementById("inpTotalPagadoCredito").value=separadordemilesnumero(totalPago);

verCerrarOpcionPagoCredito()
	}
}
function verCerrarOpcionPagoCredito() {
	document.getElementById('divOpcionPagoCredito').style.display="none";
	 elementopagocreditoseleccionado="";
}
function abmcargaropcionespago(CargoAdministrativo,MontoTarjeta,totalDeudaCuota, descuento,Fecha, cod_cobradorFK, cod_creditoFK, totalInteres,nrofactura,imprimirOpcion){
	
	
	var datos = new FormData();
	var control=1;
	$("tr[name=tdDetallePagoCreditoOffline]").each(function(i, elementohtml){
       var idtipopago=$(elementohtml).children('td[id="td_id_2"]').html();
	   datos.append("idtipopago"+control, idtipopago)
	   
	   var monto=$(elementohtml).children('td[id="td_datos_3"]').html();
	   datos.append("monto"+control, monto)
	   
	   //////Datos Egreso
	   var valor=$(elementohtml).children('td[id="td_datos_9"]').html();
	   datos.append("valor"+control, valor)
	   
	   if(valor=="SI"){
		
		var MontoDeposito=$(elementohtml).children('td[id="td_datos_4"]').html();
	   datos.append("MontoDeposito"+control, MontoDeposito)
	   
	   var MotivoDeposito=$(elementohtml).children('td[id="td_datos_5"]').html();
	   datos.append("MotivoDeposito"+control, MotivoDeposito)
	   
	   var nroCuentaDeposito=$(elementohtml).children('td[id="td_datos_6"]').html();
	   datos.append("nroCuentaDeposito"+control, nroCuentaDeposito)
	   
	   var BancoDeposito=$(elementohtml).children('td[id="td_datos_7"]').html();
	   datos.append("BancoDeposito"+control, BancoDeposito)
	   
	   var NroBoletaDeposito=$(elementohtml).children('td[id="td_datos_8"]').html();
	   datos.append("NroBoletaDeposito"+control, NroBoletaDeposito)	
	   }
	      
	   control=control+1;
	   });
	 control=control-1;
	
	
	verCerrarEfectoCargando("")
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "cargartipospagoscredito")
	datos.append("Fecha", Fecha)
	datos.append("totalDeudaCuota", totalDeudaCuota)
	datos.append("cod_creditoFK", cod_creditoFK)
	datos.append("cod_cobradorFK", cod_cobradorFK)
	datos.append("cod_venta", idFkVenta)
	datos.append("totalInteres", totalInteres)
	datos.append("nrofactura", nrofactura)
	datos.append("descuento", descuento)
	datos.append("MontoTarjeta", MontoTarjeta)
	datos.append("codcaja", cajapredeterminada)
    datos.append("codApertura", idabmAperturacierrecaja)
	datos.append("CargoAdministrativo", CargoAdministrativo)
	datos.append("cod_local", cod_localFKUSer)	
	datos.append("totalregistro", control)
	datos.append("cod_ClienteFKMora", cod_ClienteFKMora)
	datos.append("imprimirOpcion", imprimirOpcion)
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
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
				   
				   limpiarCamposAnhadirPagosCredito()
				   verCerrarVentanaAnhadirPagoCredito("")
					ver_vetana_informativa('Pagos cargados correctamente')
					
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
	
	
	var Fecha_Venta=datos["20"];
	var Nro_FacturaVenta=datos["19"];
	
	var FechaPago=datos["18"];
	
	pagado=totalDeudaCuota;
	
       document.getElementById("table_cuentas_a_cobrar").innerHTML=""; 
		document.getElementById("inptMontoCargoAdministrativo").value=""; 	   
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
			
			ReImprimirDivTickeFacturaPagoTicket(FechaPago,Cajero,plazoRecibo,pagado,diaatrazado,NombreCliente,CiCliente,nrofactura,tipoventa,totalInteres,deudaActual,totalpagado,totalDescuento,totalventa,0,deudaActualsininteres,paginaticket);
		}
		 
		 
		 
		// ImprimirReciboDinero(plazoRecibo,pagado,NombreCliente,CiCliente,nrofactura) 
		 controlInsercionPagos=false
				
				
				
				}

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	
	});


}
function limpiarCamposAnhadirPagosCredito(){
	document.getElementById('inptTotalaPagarCredito').value = "0"
	document.getElementById('inpTotalPagadoCredito').value = ""
	prepararGrillaPagoCredito(true);
	limpiarDatosDepositoPagoGrilla("div_opciones_pago_credito");
	elementopagocreditoseleccionado = "";
}







//OPCIONES DE PAGO CREDITO PARCIAL
var controlPagoCreditoParcial = 0;
function escaparHtmlPagoCreditoParcial(valor){
	return $("<div>").text(valor == null ? "" : valor).html();
}

function fechaActualPagoCreditoParcial(){
	var f = new Date();	
	var anho = f.getFullYear()

	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	return anho+"-" + mes + "-" +dia;
}

function obtenerMontoPagoCreditoParcial(elementohtml){
	var celdaMonto = $(elementohtml).children('td[id="td_datos_3"]');
	var inputMonto = celdaMonto.find("input.pago-parcial-monto");
	if(inputMonto.length > 0){
		return inputMonto.val();
	}
	return celdaMonto.html();
}

function obtenerMontoNumericoPagoCreditoParcial(elementohtml){
	var monto = obtenerMontoPagoCreditoParcial(elementohtml);
	var montoNumero = Number(QuitarSeparadorMilValor(monto));
	if(isNaN(montoNumero) || montoNumero < 0){
		return 0;
	}
	return montoNumero;
}

function contarPagosConMontoPorNombre(nombreFila){
	var control = 0;
	$("tr[name="+nombreFila+"]").each(function(i, elementohtml){
		if(obtenerMontoNumericoPagoCreditoParcial(elementohtml) > 0){
			control=control+1;
		}
	});
	return control;
}

function contarPagosCreditoParcialConMonto(){
	return contarPagosConMontoPorNombre("tdDetallePagoCreditoParcialOffline");
}

var pagoDepositoGrillaPendiente = null;

function obtenerConfigDepositoPagoGrilla(cuerpoId){
	var config = {
		div_opciones_pago: {
			nombreFila: "tdDetallePagoOffline",
			modalId: "divConfirmarEgresoContado",
			montoId: "inptMontoEgresoContado",
			motivoId: "inptMotivoEgresoContado",
			cuentaId: "inptNroCuentaEgresoContado",
			bancoId: "inptBancoEgresoContado",
			transaccionId: "inptTransaccionEgresoContado"
		},
		div_opciones_pago_credito: {
			nombreFila: "tdDetallePagoCreditoOffline",
			modalId: "divConfirmarEgreso",
			montoId: "inptMontoEgreso",
			motivoId: "inptMotivoEgreso",
			cuentaId: "inptNroCuentaEgreso",
			bancoId: "inptBancoEgreso",
			transaccionId: "inptTransaccionEgreso"
		},
		div_opciones_pago_credito_parcial: {
			nombreFila: "tdDetallePagoCreditoParcialOffline",
			modalId: "divConfirmarEgresoParcial",
			montoId: "inptMontoEgresoParcial",
			motivoId: "inptMotivoEgresoParcial",
			cuentaId: "inptNroCuentaEgresoParcial",
			bancoId: "inptBancoEgresoParcial",
			transaccionId: "inptTransaccionEgresoParcial"
		}
	};
	return config[cuerpoId] || null;
}

function obtenerCeldaOcultaPagoGrilla(fila, idCelda){
	var celda = $(fila).children('td[id="'+idCelda+'"]');
	if(celda.length <= 0){
		$(fila).append("<td id='"+idCelda+"' style='display:none'></td>");
		celda = $(fila).children('td[id="'+idCelda+'"]');
	}
	return celda;
}

function valorInputPagoDeposito(idCampo){
	var campo = document.getElementById(idCampo);
	return campo ? campo.value : "";
}

function setValorInputPagoDeposito(idCampo, valor){
	var campo = document.getElementById(idCampo);
	if(campo){
		campo.value = valor || "";
	}
}

function abrirDatosDepositoPagoGrilla(cuerpoId, fila, callback){
	var config = obtenerConfigDepositoPagoGrilla(cuerpoId);
	if(!config){
		return false;
	}
	var monto = obtenerMontoPagoCreditoParcial(fila);
	pagoDepositoGrillaPendiente = {
		cuerpoId: cuerpoId,
		fila: fila,
		callback: callback,
		config: config
	};
	setValorInputPagoDeposito(config.montoId, monto);
	setValorInputPagoDeposito(config.motivoId, obtenerCeldaOcultaPagoGrilla(fila, "td_datos_5").html());
	setValorInputPagoDeposito(config.cuentaId, obtenerCeldaOcultaPagoGrilla(fila, "td_datos_6").html());
	setValorInputPagoDeposito(config.bancoId, obtenerCeldaOcultaPagoGrilla(fila, "td_datos_7").html());
	setValorInputPagoDeposito(config.transaccionId, obtenerCeldaOcultaPagoGrilla(fila, "td_datos_8").html());
	document.getElementById(config.modalId).style.display = "";
	ver_vetana_informativa("COMPLETE LOS DATOS DEL DEPOSITO PARA CONTINUAR");
	return true;
}

function verificarDepositosPagoGrilla(cuerpoId, callback){
	var config = obtenerConfigDepositoPagoGrilla(cuerpoId);
	if(!config){
		return true;
	}
	var filaPendiente = null;
	$("#"+cuerpoId+" tr[name="+config.nombreFila+"]").each(function(i, fila){
		var montoNumero = obtenerMontoNumericoPagoCreditoParcial(fila);
		var valor = $.trim($(fila).children('td[id="td_datos_9"]').html());
		var depositoConfirmado = $.trim(obtenerCeldaOcultaPagoGrilla(fila, "td_datos_10").html());
		if(montoNumero > 0 && valor == "SI" && depositoConfirmado != "SI"){
			filaPendiente = fila;
			return false;
		}
	});
	if(!filaPendiente){
		return true;
	}
	abrirDatosDepositoPagoGrilla(cuerpoId, filaPendiente, callback);
	return false;
}

function confirmarDatosDepositoPagoGrilla(){
	if(!pagoDepositoGrillaPendiente){
		return false;
	}
	var contexto = pagoDepositoGrillaPendiente;
	var config = contexto.config;
	obtenerCeldaOcultaPagoGrilla(contexto.fila, "td_datos_4").html(valorInputPagoDeposito(config.montoId));
	obtenerCeldaOcultaPagoGrilla(contexto.fila, "td_datos_5").html(valorInputPagoDeposito(config.motivoId));
	obtenerCeldaOcultaPagoGrilla(contexto.fila, "td_datos_6").html(valorInputPagoDeposito(config.cuentaId));
	obtenerCeldaOcultaPagoGrilla(contexto.fila, "td_datos_7").html(valorInputPagoDeposito(config.bancoId));
	obtenerCeldaOcultaPagoGrilla(contexto.fila, "td_datos_8").html(valorInputPagoDeposito(config.transaccionId));
	obtenerCeldaOcultaPagoGrilla(contexto.fila, "td_datos_10").html("SI");
	actualizarBotonDatosDepositoPago(contexto.fila);
	document.getElementById(config.modalId).style.display = "none";
	pagoDepositoGrillaPendiente = null;
	if(verificarDepositosPagoGrilla(contexto.cuerpoId, contexto.callback) && typeof contexto.callback === "function"){
		contexto.callback();
	}
	return true;
}

/*
 * Solicita el respaldo bancario en cuanto se termina de cargar el importe.
 * De esta manera la venta todavia no existe cuando el usuario completa los
 * datos de la transferencia. La validacion de Terminar venta se mantiene como
 * segunda barrera ante cualquier cambio posterior en la grilla.
 */
function solicitarDatosDepositoAlCargarMonto(inputActual){
	if(!inputActual){
		return false;
	}
	var fila = $(inputActual).closest("tr");
	var cuerpo = $(inputActual).closest(".pago-metodos-cuerpo");
	if(fila.length <= 0 || cuerpo.length <= 0){
		return false;
	}
	var config = obtenerConfigDepositoPagoGrilla(cuerpo[0].id);
	if(!config || obtenerMontoNumericoPagoCreditoParcial(fila[0]) <= 0){
		return false;
	}
	var requiereDatos = $.trim(fila.children('td[id="td_datos_9"]').html()) == "SI";
	if(!requiereDatos){
		return false;
	}
	if(pagoDepositoGrillaPendiente && pagoDepositoGrillaPendiente.fila === fila[0]){
		return true;
	}
	abrirDatosDepositoPagoGrilla(cuerpo[0].id, fila[0], null);
	return true;
}

function abrirDatosDepositoDesdeBoton(boton){
	var fila = $(boton).closest("tr");
	var inputMonto = fila.find("input.pago-parcial-monto")[0];
	if(!inputMonto || obtenerMontoNumericoPagoCreditoParcial(fila[0]) <= 0){
		ver_vetana_informativa("INGRESE EL MONTO DE LA TRANSFERENCIA");
		return false;
	}
	return solicitarDatosDepositoAlCargarMonto(inputMonto);
}

/*
 * Algunos accesos de Cuentas a Cobrar conservan las filas de pago que ya
 * estaban renderizadas antes de abrir el modal. Esta funcion las adapta al
 * mismo contrato visual y funcional de Nueva venta sin volver a crearlas ni
 * perder los importes cargados.
 */
function asegurarBotonesDatosDepositoPago(cuerpoId){
	var cuerpo = document.getElementById(cuerpoId);
	var config = obtenerConfigDepositoPagoGrilla(cuerpoId);
	if(!cuerpo || !config){
		return;
	}
	$(cuerpo).find("tr[name="+config.nombreFila+"]").each(function(i, fila){
		var celdaMonto = $(fila).children('td[id="td_datos_3"]');
		var inputMonto = celdaMonto.find("input").first();
		if(inputMonto.length <= 0){
			return;
		}
		inputMonto.addClass("pago-parcial-monto");
		var contenedor = inputMonto.closest(".pago-monto-acciones");
		if(contenedor.length <= 0){
			inputMonto.wrap("<div class='pago-monto-acciones'></div>");
			contenedor = inputMonto.closest(".pago-monto-acciones");
		}
		var boton = contenedor.find("button.pago-datos-transferencia");
		if(boton.length <= 0){
			boton = $("<button type='button' class='pago-datos-transferencia' style='display:none'>Cargar datos</button>");
			boton.attr("onclick", "abrirDatosDepositoDesdeBoton(this)");
			contenedor.append(boton);
		}
		obtenerCeldaOcultaPagoGrilla(fila, "td_datos_10");
		actualizarBotonDatosDepositoPago(fila);
	});
}

function actualizarBotonDatosDepositoPago(fila){
	var filaJquery = $(fila);
	var boton = filaJquery.find("button.pago-datos-transferencia");
	if(boton.length <= 0){
		return;
	}
	var requiereDatos = $.trim(filaJquery.children('td[id="td_datos_9"]').html()) == "SI";
	var tieneMonto = obtenerMontoNumericoPagoCreditoParcial(fila) > 0;
	var confirmado = $.trim(obtenerCeldaOcultaPagoGrilla(fila, "td_datos_10").html()) == "SI";
	boton.toggle(requiereDatos && tieneMonto);
	boton.toggleClass("completo", confirmado);
	boton.text(confirmado ? "Datos cargados" : "Cargar datos");
	boton.attr("aria-label", confirmado ? "Editar datos de la transferencia" : "Cargar datos de la transferencia");
}

function cancelarDatosDepositoPagoGrilla(modalId){
	if(pagoDepositoGrillaPendiente && pagoDepositoGrillaPendiente.config.modalId == modalId){
		pagoDepositoGrillaPendiente = null;
		document.getElementById(modalId).style.display = "none";
		return true;
	}
	return false;
}

function limpiarDatosDepositoPagoGrilla(cuerpoId){
	var config = obtenerConfigDepositoPagoGrilla(cuerpoId);
	if(!config){
		return;
	}
	setValorInputPagoDeposito(config.montoId, "");
	setValorInputPagoDeposito(config.motivoId, "");
	setValorInputPagoDeposito(config.cuentaId, "");
	setValorInputPagoDeposito(config.bancoId, "");
	setValorInputPagoDeposito(config.transaccionId, "");
	if(document.getElementById(config.modalId)){
		document.getElementById(config.modalId).style.display = "none";
	}
	$("#"+cuerpoId+" tr[name="+config.nombreFila+"]").each(function(i, fila){
		obtenerCeldaOcultaPagoGrilla(fila, "td_datos_4").html("");
		obtenerCeldaOcultaPagoGrilla(fila, "td_datos_5").html("");
		obtenerCeldaOcultaPagoGrilla(fila, "td_datos_6").html("");
		obtenerCeldaOcultaPagoGrilla(fila, "td_datos_7").html("");
		obtenerCeldaOcultaPagoGrilla(fila, "td_datos_8").html("");
		obtenerCeldaOcultaPagoGrilla(fila, "td_datos_10").html("");
	});
	if(pagoDepositoGrillaPendiente && pagoDepositoGrillaPendiente.cuerpoId == cuerpoId){
		pagoDepositoGrillaPendiente = null;
	}
}

function limpiarDatosDepositosPagoGrilla(){
	limpiarDatosDepositoPagoGrilla("div_opciones_pago");
	limpiarDatosDepositoPagoGrilla("div_opciones_pago_credito");
	limpiarDatosDepositoPagoGrilla("div_opciones_pago_credito_parcial");
}

function obtenerConfigGrillaPago(cuerpoId){
	var config = {
		div_opciones_pago: {
			totalId: "inpTotalPagadoVenta",
			totalPagarId: "inptTotalaPagar",
			cargoAdministrativoId: "",
			selectId: "inptTipoPagoVenta",
			nombreFila: "tdDetallePagoOffline"
		},
		div_opciones_pago_credito: {
			totalId: "inpTotalPagadoCredito",
			totalPagarId: "inptTotalaPagarCredito",
			cargoAdministrativoId: "inptMontoCargoAdministrativo",
			selectId: "inptTipoPagoCredito",
			nombreFila: "tdDetallePagoCreditoOffline"
		},
		div_opciones_pago_credito_parcial: {
			totalId: "inpTotalPagadoCreditoParcial",
			totalPagarId: "inptTotalaPagarCreditoParcial",
			cargoAdministrativoId: "inptMontoCargoAdministrativoCuotaPago",
			selectId: "inptTipoPagoCreditoParcial",
			nombreFila: "tdDetallePagoCreditoParcialOffline"
		}
	};
	return config[cuerpoId] || config.div_opciones_pago_credito_parcial;
}

function obtenerCuerpoGrillaPago(inputActual, cuerpoId){
	if(cuerpoId){
		return document.getElementById(cuerpoId);
	}
	if(inputActual){
		var cuerpo = $(inputActual).closest(".pago-metodos-cuerpo");
		if(cuerpo.length > 0){
			return cuerpo[0];
		}
	}
	return document.getElementById("div_opciones_pago_credito_parcial");
}

function actualizarTotalPagoDesdeGrilla(inputActual, cuerpoId){
	if(inputActual && typeof separadordemiles === "function"){
		separadordemiles(inputActual);
		var filaActual = $(inputActual).closest("tr");
		if(filaActual.length > 0 && $.trim(filaActual.children('td[id="td_datos_9"]').html()) == "SI"){
			obtenerCeldaOcultaPagoGrilla(filaActual[0], "td_datos_10").html("");
			actualizarBotonDatosDepositoPago(filaActual[0]);
		}
	}
	var cuerpo = obtenerCuerpoGrillaPago(inputActual, cuerpoId);
	if(!cuerpo){
		return;
	}
	var config = obtenerConfigGrillaPago(cuerpo.id);
	var totalPago=0;
	$(cuerpo).find("tr[name="+config.nombreFila+"]").each(function(i, elementohtml){
		totalPago=totalPago+obtenerMontoNumericoPagoCreditoParcial(elementohtml);
		actualizarBotonDatosDepositoPago(elementohtml);
	});
	var totalPagarElemento = document.getElementById(config.totalPagarId);
	var totalPermitido = totalPagarElemento ? Number(QuitarSeparadorMilValor(totalPagarElemento.value)) : 0;
	var cargoElemento = config.cargoAdministrativoId ? document.getElementById(config.cargoAdministrativoId) : null;
	var cargoAdministrativo = cargoElemento ? cargoElemento.value : "0";
	if(cargoAdministrativo==""){
		cargoAdministrativo="0";
	}
	totalPermitido = totalPermitido + Number(QuitarSeparadorMilValor(cargoAdministrativo));
	if(inputActual && totalPermitido > 0 && totalPago > totalPermitido){
		ver_vetana_informativa("LA TOTALIDAD HA SUPERADO EL LIMITE DE PAGO");
		inputActual.value = "0";
		actualizarTotalPagoDesdeGrilla(null, cuerpo.id);
		return;
	}
	document.getElementById(config.totalId).value= totalPago > 0 ? separadordemilesnumero(totalPago.toString()) : "";
}

function actualizarTotalPagoCreditoParcialDesdeGrilla(inputActual){
	actualizarTotalPagoDesdeGrilla(inputActual, "div_opciones_pago_credito_parcial");
}

function normalizarMontoPagoCreditoParcial(inputActual){
	if(inputActual.value == ""){
		inputActual.value = "0";
	}
	actualizarTotalPagoDesdeGrilla(inputActual);
}

function obtenerTotalAPagarCreditoParcial(){
	var campos = [
		"inptDeudaActualCargaPago",
		"inptTotalSeleccAPagar",
		"inptMontoCargaPago"
	];
	for(var i=0; i<campos.length; i++){
		var campo = document.getElementById(campos[i]);
		if(campo && campo.value != "" && campo.value != "0"){
			return campo.value;
		}
	}
	return "0";
}

function renderizarTiposPagoGrilla(datos_buscados, cuerpoId, nombreFila){
	var cuerpo = document.getElementById(cuerpoId);
	if(!cuerpo){
		return;
	}
	var selectorTemporal = document.createElement("select");
	selectorTemporal.innerHTML = datos_buscados;
	var html = "";
	var fecha = fechaActualPagoCreditoParcial();
	for(var i=0; i<selectorTemporal.options.length; i++){
		var option = selectorTemporal.options[i];
		var idtipopago = option.value;
		if(idtipopago == ""){
			continue;
		}
		var tipopago = option.text;
		var valor = option.getAttribute("id") || "";
		var codigo = cuerpoId + "_tipo_" + i;
		html += "<table id='"+codigo+"' class='tableRegistroSearch pago-parcial-metodo' border='0' cellspacing='0' cellpadding='0'>"
		+"<tr name='"+nombreFila+"' >"
		+"<td  id='td_id_1' style='display:none'>"+codigo+"</td>"
		+"<td  id='td_id_2' style='display:none'>"+escaparHtmlPagoCreditoParcial(idtipopago)+"</td>"
		+"<td  id='td_datos_1' class='pago-parcial-metodo-tipo' style='width:50%;'>"+escaparHtmlPagoCreditoParcial(tipopago)+"</td>"
		+"<td  id='td_datos_3' class='pago-parcial-metodo-monto' style='width:50%;'><div class='pago-monto-acciones'><input type='text' class='inputText pago-parcial-monto' value='0' onkeyup='actualizarTotalPagoDesdeGrilla(this)' onblur='normalizarMontoPagoCreditoParcial(this)' /><button type='button' class='pago-datos-transferencia' style='display:none' onclick='abrirDatosDepositoDesdeBoton(this)'>Cargar datos</button></div></td>"
		+"<td  id='td_datos_2' style='display:none'>"+fecha+"</td>"
		+"<td  id='td_datos_4' style='display:none'></td>"
		+"<td  id='td_datos_5' style='display:none'></td>"
		+"<td  id='td_datos_6' style='display:none'></td>"
		+"<td  id='td_datos_7' style='display:none'></td>"
		+"<td  id='td_datos_8' style='display:none'></td>"
		+"<td  id='td_datos_9' style='display:none'>"+escaparHtmlPagoCreditoParcial(valor)+"</td>"
		+"<td  id='td_datos_10' style='display:none'></td>"
		+"</tr>"
		+"</table>";
	}
	cuerpo.innerHTML = html;
	asegurarBotonesDatosDepositoPago(cuerpoId);
	actualizarTotalPagoDesdeGrilla(null, cuerpoId);
}

function renderizarTiposPagoVenta(datos_buscados){
	renderizarTiposPagoGrilla(datos_buscados, "div_opciones_pago", "tdDetallePagoOffline");
}

function renderizarTiposPagoCredito(datos_buscados){
	renderizarTiposPagoGrilla(datos_buscados, "div_opciones_pago_credito", "tdDetallePagoCreditoOffline");
}

function renderizarTiposPagoCreditoParcial(datos_buscados){
	renderizarTiposPagoGrilla(datos_buscados, "div_opciones_pago_credito_parcial", "tdDetallePagoCreditoParcialOffline");
}

function prepararGrillaPago(cuerpoId, resetearMontos){
	var cuerpo = document.getElementById(cuerpoId);
	var config = obtenerConfigGrillaPago(cuerpoId);
	var selector = document.getElementById(config.selectId);
	if(cuerpo && cuerpo.innerHTML == "" && selector && selector.innerHTML != ""){
		renderizarTiposPagoGrilla(selector.innerHTML, cuerpoId, config.nombreFila);
	}
	if(resetearMontos !== false){
		$("#"+cuerpoId+" input.pago-parcial-monto").val("0");
	}
	asegurarBotonesDatosDepositoPago(cuerpoId);
	actualizarTotalPagoDesdeGrilla(null, cuerpoId);
}

function prepararGrillaPagoVenta(resetearMontos){
	prepararGrillaPago("div_opciones_pago", resetearMontos);
}

function prepararGrillaPagoCredito(resetearMontos){
	prepararGrillaPago("div_opciones_pago_credito", resetearMontos);
}

function prepararGrillaPagoCreditoParcial(resetearMontos){
	prepararGrillaPago("div_opciones_pago_credito_parcial", resetearMontos);
}

function verCerrarVentanaAnhadirPagoCreditoParcial(d){
	if(d=="1"){
		
		document.getElementById("divOpcionesPagoCreditoParcial").style.display="";
		document.getElementById('inptTotalaPagarCreditoParcial').value = obtenerTotalAPagarCreditoParcial();
		prepararGrillaPagoCreditoParcial(true);
		
		document.getElementById('divCargaPagos').style.display="none";
		}else{
			document.getElementById("divOpcionesPagoCreditoParcial").style.display="none";
			document.getElementById('divCargaPagos').style.display="";
	}
}

function anhadirPagoEgresoParcial(){
	var valor = $("select[id=inptTipoPagoCreditoParcial]").children(":selected").attr("id")
	let monto = document.getElementById('inptMontoPagosCreditoParcial').value
	let idtipopago = document.getElementById("inptTipoPagoCreditoParcial").value;
	if(monto == ""){
		ver_vetana_informativa("NO INGRESÓ NINGÚN PAGO");
		return;
	}
		if(idtipopago == ""){
		ver_vetana_informativa("NO SELECCIONÓ MÉTODO DE PAGO");
		return;
	}
	document.getElementById('inptMontoEgresoParcial').value = monto
	if(valor=="SI"){
		verCerrarVentanaConfirmarEgresoParcial("1")
	}else{
		anhadirPagoCreditoParcial()
	}
}

function limpiarEgresoPagoParcial(){
	document.getElementById('inptMontoEgresoParcial').value =""
	document.getElementById('inptMotivoEgresoParcial').value=""
	document.getElementById('inptNroCuentaEgresoParcial').value=""
	document.getElementById('inptBancoEgresoParcial').value=""
	document.getElementById('inptTransaccionEgresoParcial').value=""
	document.getElementById('inptTipoPagoCreditoParcial').value=""
}



function anhadirPagoCreditoParcial(){
	let tipopago = $('select[id="inptTipoPagoCreditoParcial"] option:selected').text();
	let idtipopago = document.getElementById("inptTipoPagoCreditoParcial").value;
	let monto = document.getElementById('inptMontoPagosCreditoParcial').value
	if(monto == ""){
		ver_vetana_informativa("NO INGRESÓ NINGÚN PAGO");
		return;
	}
	
	if(idtipopago == ""){
		ver_vetana_informativa("NO SELECCIONÓ MÉTODO DE PAGO");
		return;
	}
	
	
	let MontoDeposito = document.getElementById('inptMontoEgresoParcial').value
	let MotivoDeposito = document.getElementById('inptMotivoEgresoParcial').value
	let nroCuentaDeposito = document.getElementById('inptNroCuentaEgresoParcial').value
	let BancoDeposito = document.getElementById('inptBancoEgresoParcial').value
	let NroBoletaDeposito = document.getElementById('inptTransaccionEgresoParcial').value
	var valor = $("select[id=inptTipoPagoCreditoParcial]").children(":selected").attr("id")
	
	
	let inptMontoCargoAdministrativoCuotaPago = document.getElementById('inptMontoCargoAdministrativoCuotaPago').value
	
	let totalaPagar = document.getElementById('inptTotalaPagarCreditoParcial').value;
	let totalPagado = document.getElementById('inpTotalPagadoCreditoParcial').value;
	totalaPagar = QuitarSeparadorMilValor(totalaPagar);
	totalPagado = QuitarSeparadorMilValor(totalPagado);
	
	if(inptMontoCargoAdministrativoCuotaPago==""){
		inptMontoCargoAdministrativoCuotaPago=0;
	}
	
	inptMontoCargoAdministrativoCuotaPago = QuitarSeparadorMilValor(inptMontoCargoAdministrativoCuotaPago);
	
	let total = Number(totalPagado) + Number(QuitarSeparadorMilValor(monto));
	
	if((total ) > (Number(totalaPagar)  + Number(inptMontoCargoAdministrativoCuotaPago) ) ){
		ver_vetana_informativa("LA TOTALIDAD HA SUPERADO EL LÍMITE DE PAGO");
		document.getElementById('inptMontoPagosCreditoParcial').value = ""
		return;
	}
	
	
	
	var f = new Date();	
	var anho = f.getFullYear()

	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	let fechapago =  anho+"-" + mes + "-" +dia;
	
  	var codigo=stringGenerador(5);
	var pagina="<table id='"+codigo+"' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>"
+"<tr id='tbSelecRegistro' onclick='SeleccionarPagoCreditoParcialOffline(this)'  name='tdDetallePagoCreditoParcialOffline' >"
+"<td  id='td_id_1' style='display:none'>"+codigo+"</td>"
+"<td  id='td_id_2' style='display:none'>"+idtipopago+"</td>"
+"<td  id='td_datos_1' style='width:33%;'>"+tipopago+"</td>"
+"<td  id='td_datos_3' style='width:33%'>"+monto+"</td>"
+"<td  id='td_datos_2' style='width:33%'>"+fechapago+"</td>"
+"<td  id='td_datos_4' style='display:none'>"+MontoDeposito+"</td>"
+"<td  id='td_datos_5' style='display:none'>"+MotivoDeposito+"</td>"
+"<td  id='td_datos_6' style='display:none'>"+nroCuentaDeposito+"</td>"
+"<td  id='td_datos_7' style='display:none'>"+BancoDeposito+"</td>"
+"<td  id='td_datos_8' style='display:none'>"+NroBoletaDeposito+"</td>"
+"<td  id='td_datos_9' style='display:none'>"+valor+"</td>"
+"</tr>"
+"</table>"

document.getElementById("div_opciones_pago_credito_parcial").innerHTML+=pagina;


var totalPago=0;
controlPago = 0;
$("tr[name=tdDetallePagoCreditoParcialOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_3"]').html();
 total = QuitarSeparadorMilValor(total);
totalPago=Number(totalPago)+Number(total);
totalPago = totalPago.toString()
controlPago=controlPago+1;
});
limpiarEgresoPagoParcial();
document.getElementById('inptMontoPagosCreditoParcial').value = "";
document.getElementById("inpTotalPagadoCreditoParcial").value=separadordemilesnumero(totalPago);
}
var elementopagocreditoparcialseleccionado="";
function SeleccionarPagoCreditoParcialOffline(datostr) {
	elementopagocreditoparcialseleccionado = datostr
	document.getElementById('elementoEliminarPagoCreditoParcial').innerHTML = $(datostr).children('td[id="td_datos_1"]').html() +" - <b>"+ $(datostr).children('td[id="td_datos_3"]').html() + "</b>";
	document.getElementById('divOpcionPagoCreditoParcial').style.display="" ;
}
function EliminarPagoCreditoParcial() {
	if(confirm("ELIMINAR ESTE PAGO?")){
		var codigotable=$(elementopagocreditoparcialseleccionado).children('td[id="td_id_1"]').html()
		$("table[id="+codigotable+"]").remove()

var totalPago=0;
controlPago = 0;
$("tr[name=tdDetallePagoCreditoParcialOffline]").each(function(i, elementohtml){
var total=$(elementohtml).children('td[id="td_datos_3"]').html();
 total = QuitarSeparadorMilValor(total);
totalPago=Number(totalPago)+Number(total);
totalPago = totalPago.toString()
controlPago=controlPago+1;
});
document.getElementById("inpTotalPagadoCreditoParcial").value=separadordemilesnumero(totalPago);

verCerrarOpcionPagoCreditoParcial()
	}
}
function verCerrarOpcionPagoCreditoParcial() {
	document.getElementById('divOpcionPagoCreditoParcial').style.display="none";
	 elementopagocreditoparcialseleccionado="";
}
function abmcargaropcionespagoparcial(CargoAdministrativo,MontoTarjeta,Descuento, Fecha, cod_cobradorFK, controlfecha,nrofactura,imprimirOpcion, desde){
	
	verCerrarEfectoCargando("")
	var datos = new FormData();
	var control=1;
	var total = 0;
	
	let name = 'tr[name=tdDetallePagoCreditoParcialOffline]';
	if(desde){
		name = 'tr[name=tdDetallePagoCreditoOffline]';
	}
	
	$(name).each(function(i, elementohtml){
	   var monto=obtenerMontoPagoCreditoParcial(elementohtml);
	   var montoNumero = Number(QuitarSeparadorMilValor(monto));
	   if(isNaN(montoNumero) || montoNumero <= 0){
		return;
	   }
       var idtipopago=$(elementohtml).children('td[id="td_id_2"]').html();
	   datos.append("idtipopago"+control, idtipopago)
	   
	   datos.append("monto"+control, monto)
	   
	   
	     //////Datos Egreso
	   var valor=$(elementohtml).children('td[id="td_datos_9"]').html();
	   datos.append("valor"+control, valor)
	   
	   if(valor=="SI"){
		
		var MontoDeposito=$(elementohtml).children('td[id="td_datos_4"]').html();
	   datos.append("MontoDeposito"+control, MontoDeposito)
	   
	   var MotivoDeposito=$(elementohtml).children('td[id="td_datos_5"]').html();
	   datos.append("MotivoDeposito"+control, MotivoDeposito)
	   
	   var nroCuentaDeposito=$(elementohtml).children('td[id="td_datos_6"]').html();
	   datos.append("nroCuentaDeposito"+control, nroCuentaDeposito)
	   
	   var BancoDeposito=$(elementohtml).children('td[id="td_datos_7"]').html();
	   datos.append("BancoDeposito"+control, BancoDeposito)
	   
	   var NroBoletaDeposito=$(elementohtml).children('td[id="td_datos_8"]').html();
	   datos.append("NroBoletaDeposito"+control, NroBoletaDeposito)	
	   }
	   
	   
	   
	   total += montoNumero
	   control=control+1;
	   });
	 control=control-1;
	if(control <= 0){
		controldePagosParciales=false
		ver_vetana_informativa("FALTO INGRESAR LOS PAGOS")
		return;
	}
	
	
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "cargaropcionpagoparcial")
	datos.append("Fecha", Fecha)
	datos.append("cod_cobradorFK", cod_cobradorFK)
	datos.append("cod_venta", idFkVenta)
	datos.append("controlfecha", controlfecha)
	datos.append("nrofactura", nrofactura)
	datos.append("Descuento", Descuento)
	datos.append("MontoTarjeta", MontoTarjeta)
	 datos.append("codcaja", cajapredeterminada)
    datos.append("codApertura", idabmAperturacierrecaja)
	datos.append("cod_local", cod_localFKUSer)	
	datos.append("totalregistro", control)
	datos.append("CargoAdministrativo", CargoAdministrativo)
	datos.append("cod_ClienteFKMora", cod_ClienteFKMora)
	datos.append("imprimirOpcion", imprimirOpcion)
	
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
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
				   controldePagosParciales=false
				   if(desde){
						 limpiarCamposAnhadirPagosCredito()
						 limpiarDatosDepositoPagoGrilla("div_opciones_pago_credito")
						verCerrarVentanaAnhadirPagoCredito("")
						ver_vetana_informativa('Pagos cargados correctamente')
					
						vercerrarconfirmarpagos("2")
					}else{
					
						
					   limpiarCamposAnhadirPagosCreditoParcial()
					   limpiarDatosDepositoPagoGrilla("div_opciones_pago_credito_parcial")
					   verCerrarVentanaAnhadirPagoCreditoParcial("")
						ver_vetana_informativa('Pagos cargados correctamente')
						
						verCerrarCargarPago("2")
						
					}
				   
				  
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
	  total = separadordemilesnumero(total.toString());
	pagado=total;
	console.log(pagado);
	diaatrazado=document.getElementById('inptDiasAtrazadoCargarPago').value;
	
	var Cajero=document.getElementById("inptCobradorCargarPago").value
	var subtotal=document.getElementById("inptTotalVenta").value;
	var descuento=document.getElementById("inptDescuentoCargaPago").value;
							 var totalinteres =(Number(QuitarSeparadorMilValor(TotalInteresActual))+Number(QuitarSeparadorMilValor(interespagado)))

		totalinteres=separadordemilesnumero(totalinteres)
    
			totalCobroCuota=datos["22"];
			totalCobroInteres=datos["23"];			
			totalCobroCargoAdministrativo=datos["24"];
			totalCobroPagado=datos["25"];
			
			
			if(imprimirOpcion){
			ReImprimirDivTickeFacturaPago(FechaPago,Cajero,plazoRecibo,pagado,diaatrazado,nombrecliente,cicliente,nrofactura,tipoventa,
	totalinteres,deudaActual,totalpagado,TotalDescuento,totalventa,0,deudaActualsininteres,Nro_facturaRecibo,Fecha_ventaRecibo);
	}else{
			
			ReImprimirDivTickeFacturaPagoTicket(FechaPago,Cajero,plazoRecibo,pagado,diaatrazado,nombrecliente,cicliente,nrofactura,tipoventa,totalinteres,deudaActual,totalpagado,TotalDescuento,totalventa,0,deudaActualsininteres,paginaticket);
		}
			
 
	document.getElementById('inptMontoCargoAdministrativoCuotaPago').value = "" ;

// ImprimirReciboDinero(plazoRecibo,pagado,nombrecliente,cicliente,nrofactura) 

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
function limpiarCamposAnhadirPagosCreditoParcial(){
	document.getElementById('inptTotalaPagarCreditoParcial').value = "0"
	document.getElementById('inpTotalPagadoCreditoParcial').value = ""
	prepararGrillaPagoCreditoParcial(true);
	limpiarDatosDepositoPagoGrilla("div_opciones_pago_credito_parcial");
	elementopagocreditoparcialseleccionado = "";
}

