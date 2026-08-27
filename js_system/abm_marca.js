/*
ABM MARCA
*/
var idAbmMarca="";
var ElementoSeleccMarca="";
var VentanaMarca="";
function verCerrarFrmMarca(d,v){
	if(d=="1"){
		$("div[id=divAbmMarca]").fadeIn(500);
		VentanaMarca=v;
		BuscarAbmMarca()
	}else{
		$("div[id=divAbmMarca]").fadeOut(500);
	}
}
function LimpiarCamposMarca(){
	document.getElementById("inptNombreMarca").value="";
	document.getElementById("inptEstadoMarca").value="";
	document.getElementById("btnMarca1").value="Guardar Datos"
	idAbmMarca="";
	ElementoSeleccMarca="";
}
function ObtenerdatosAbmMarca(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccMarca=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreMarca").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoMarca").value = $(datostr).children('td[id="td_datos_2"]').html();
	idAbmMarca = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnMarca1").value="Editar Datos"
}
function SeleccionarRegistroMarca(){
	if(ElementoSeleccMarca==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    if(VentanaMarca=="abmproducto"){
	 document.getElementById("inptMarcaProducto").value = $(ElementoSeleccMarca).children('td[id="td_id"]').html();
	 idFkProductoMarca = $(ElementoSeleccMarca).children('td[id="td_id"]').html();
	}	
	 document.getElementById("divAbmMarca").style.display="none";
	 LimpiarCamposMarca()
}
function VerificarDatosMarca(){
	var inptNombreMarca = document.getElementById("inptNombreMarca").value
	var inptEstadoMarca = document.getElementById("inptEstadoMarca").value	
	if(inptNombreMarca==""){
		document.getElementById("inptNombreMarca").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoMarca==""){
		document.getElementById("inptEstadoMarca").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmMarca != "") {		
		accion = "editar";
	} else {
		accion = "nuevo";
	}
	AbmMarca(inptNombreMarca,inptEstadoMarca,idAbmMarca,accion)
}
function AbmMarca(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMarca.php",
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
					LimpiarCamposMarca()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmMarca()
					BuscarSelectMarca() 
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

var listadoAbmMarca = null;
function inicializarListadoAbmMarca() {
	if (!window.AbmListadoCore) return;
	var formulario = document.getElementById('divAbmMarca');
	var cuerpo = document.getElementById('divBuscadorMarca');
	var cabecera = formulario ? formulario.querySelector('.tableCabeceraRegistro tr') : null;
	if (!cuerpo || !cabecera) return;
	cabecera.id = 'cabeceraAbmMarca';
	if (!listadoAbmMarca) {
		listadoAbmMarca = window.AbmListadoCore.crear({
			nombre: 'marca',
			idCabecera: 'cabeceraAbmMarca',
			idCuerpo: 'divBuscadorMarca',
			ordenable: true,
			ordenInicial: 'descripcion',
			columnas: [
				{ campo: 'descripcion', titulo: 'DESCRIPCION', ancho: '100%' }
			],
			fila: {
				funcionSeleccion: 'ObtenerdatosAbmMarca',
				celdas: [
					{ id: 'td_id', tecnica: true, campo: 'codigo' },
					{ id: 'td_datos_1', columna: 'descripcion', campo: 'descripcion', className: 'tdRegistroSearch' },
					{ id: 'td_datos_2', tecnica: true, campo: 'estado' }
				]
			}
		});
	}
	listadoAbmMarca.iniciar();
}

function programarListadoAbmMarca() {
	setTimeout(inicializarListadoAbmMarca, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmMarca);
else programarListadoAbmMarca();

function BuscarAbmMarca() {
	var buscador = document.getElementById("inptBuscarAbmMarcas").value
	var estado = "Activo"
	document.getElementById("divBuscadorMarca").innerHTML = paginacargando
    document.getElementById("lblNroRegistroMarca").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/ABMMarca.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorMarca").innerHTML = ''
			document.getElementById("lblNroRegistroMarca").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorMarca").innerHTML = ''
			document.getElementById("lblNroRegistroMarca").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					inicializarListadoAbmMarca()
					listadoAbmMarca.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
                   document.getElementById("lblNroRegistroMarca").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function BuscarSelectMarca() {
	document.getElementById("inptMarcasProductoBuscarInventario").innerHTML = ""
	document.getElementById("inptMarcaProductoBuscarVista").innerHTML = ""
	document.getElementById("inptMarcaInformeProductosVendidos").innerHTML = ""
	document.getElementById("inptBuscarProducto3").innerHTML = ""
	document.getElementById("inptMarcaInformeProductosComprados").innerHTML = ""
	document.getElementById("inptMarcaInformeProductosNoVendidos").innerHTML = ""
	document.getElementById("inptMarcasProductoBuscarStock").innerHTML = ""
	document.getElementById("inptMarcaProductoCatalogo3").innerHTML = ""
	document.getElementById("inptMarcasProductoBuscarinformegralproductos").innerHTML = ""
	document.getElementById("inptBuscarProductoMovimientoStock3").innerHTML = ""
	document.getElementById("inptMarcaProducto").innerHTML = ""
	document.getElementById("inptBuscarProductoStockMinimoProducto3").innerHTML = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMMarca.php",
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
					document.getElementById("inptMarcasProductoBuscarInventario").innerHTML = datos_buscados
					document.getElementById("inptMarcaProductoBuscarVista").innerHTML = datos_buscados
					document.getElementById("inptMarcaInformeProductosVendidos").innerHTML = datos_buscados
					document.getElementById("inptBuscarProducto3").innerHTML = datos_buscados
					document.getElementById("inptMarcaInformeProductosComprados").innerHTML = datos_buscados
					document.getElementById("inptMarcaInformeProductosNoVendidos").innerHTML = datos_buscados
					document.getElementById("inptMarcasProductoBuscarStock").innerHTML = datos_buscados
					document.getElementById("inptMarcaProductoCatalogo3").innerHTML = datos_buscados
					document.getElementById("inptMarcasProductoBuscarinformegralproductos").innerHTML = datos_buscados
					document.getElementById("inptBuscarProductoMovimientoStock3").innerHTML = datos_buscados
					document.getElementById("inptMarcaProducto").innerHTML = datos_buscados
					document.getElementById("inptBuscarProductoStockMinimoProducto3").innerHTML = datos_buscados

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
SALIDA DE PRODUCTOS DEPOSITO
*/
function verCerrarAbmSalidadDeposito(d){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmSalidadDeposito").style.display==""){
			
 
	$("div[id=divAbmSalidadDeposito]").fadeOut(500);	
		document.getElementById("divMinimizadoSalidadDeposito").style.display="none"
		 limpiarTodoListadoSalidaDeposito()
	}else{	
if(controlacceso("VERCONTROLDEPOSITO","accion")==false){return;}
mostrarSoloUno("divAbmSalidadDeposito")	
document.getElementById("divAbmSalidadDeposito").style.display=""
 
document.getElementById("inptFechaSalidadDeposito").value = obtenerFechaActual();
		
	}
}
function minimizarabmsalidaddeposito(){ 
$("div[id=divAbmSalidadDeposito]").fadeOut(500);
document.getElementById("divMinimizadoSalidadDeposito").style.display=""	
copiarBotonEnContenedor(document.getElementById("divMenuControlDeposito"));	
}
function VerificarDatosSalidaDeposito(){
	var inptFechaSalidadDeposito = document.getElementById("inptFechaSalidadDeposito").value
	var inptCantProductoSalidadDeposito = document.getElementById("inptCantProductoSalidadDeposito").value
	var inptLocalProductoSalidadDeposito1=document.getElementById('inptLocalProductoSalidadDeposito1').value
	var inptNombreListaSalidadDeposito="CONTROL DEPOSITO - " + $("#inptLocalProductoSalidadDeposito1 option:selected").text() + " - " + inptFechaSalidadDeposito;
	
	document.getElementById('inptNombreListaSalidadDeposito').value = inptNombreListaSalidadDeposito
	
	if(codProductoFkSalidaDeposito==""){
		ver_vetana_informativa("Falto seleccionar el producto")
		return
	}
	if(inptFechaSalidadDeposito==""){
		ver_vetana_informativa("Falto seleccionar la fecha")
		return
	}
	if(inptCantProductoSalidadDeposito==""){
		document.getElementById("inptCantProductoSalidadDeposito").focus()
		ver_vetana_informativa("Falto ingresar el stock")
		return
	}
	
	if(inptLocalProductoSalidadDeposito1==""){
		document.getElementById("inptLocalProductoSalidadDeposito1").focus()
		ver_vetana_informativa("Falto seleccionar el local deposito")
		return
	}	
		
	AbmEnviarSalidaDeposito(inptFechaSalidadDeposito,inptCantProductoSalidadDeposito,inptLocalProductoSalidadDeposito1,inptNombreListaSalidadDeposito,"SalidaDeposito")
}
var idnombrelistacontroldeposito ='';
function AbmEnviarSalidaDeposito(fecha,stock,cod_local_deposito,nombre_lista,accion) {
	verCerrarEfectoCargando("1")
	var codigo=stringGenerador(5)

	var codigo_table=codigo+"_"+codProductoFkSalidaDeposito
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fecha", fecha)
	datos.append("stock", stock)
	datos.append("cod_local_deposito", cod_local_deposito)
	datos.append("cod_ext", codigo_table)
	datos.append("cod_producto_fk", codProductoFkSalidaDeposito)
	datos.append("stock_ant", stockAnteriorSalidaDeposito)
	datos.append("nombre_lista", nombre_lista)
	datos.append("idnombrelistacontroldeposito", idnombrelistacontroldeposito)
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
										ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")

	
                     var pagina="<table id='tdDetalleSalidaDeposito_"+codigo_table+"' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>"
+"<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmSalidad(this)'  name='tdDetalleSalidaDepositoOffline'>"
+"<td id='td_id_1' style='display:none'>"+codigo_table+"</td>"
+"<td id='td_id_2' style='display:none'>"+codProductoFkSalidaDeposito+"</td>"
+"<td  id='td_datos_1' style='width:10%;'>"+codigoProductoSalidadDeposito+"</td>"
+"<td  id='td_datos_3' style='width:10%'>"+document.getElementById("inptProductoSalidadDeposito").value+"</td>"
+"<td  id='td_datos_4' style='width:5%'>"+stock+"</td>"
+"<td  id='td_datos_7' style='width:10%'>"+$("select[id=inptLocalProductoSalidadDeposito1]").children(":selected").text()+"</td>"
+"</tr>"
+"</table>"
document.getElementById("table_abm_SalidaDeposito").innerHTML+=pagina;

var control=0;
$("tr[name=tdDetalleSalidaDepositoOffline]").each(function(i, elementohtml){
control=control+1;
	   })	
	   document.getElementById("btnImprimirSalidaDeposito").style.display=""
	   document.getElementById("btnLimpiarCamposSalidaDepostio").style.display=""
document.getElementById("inptRegistroNroSalidadDeposito").value=control
	   idnombrelistacontroldeposito = datos[2];
	  
	  limpiarCamposListadoSalidaDeposito()
document.getElementById('inptNombreListaSalidadDeposito').disabled = true
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarCamposListadoSalidaDeposito(){
codProductoFkSalidaDeposito=""	
codigoProductoSalidadDeposito=""	
document.getElementById("inptFechaSalidadDeposito").value=obtenerFechaActual();
document.getElementById("inptCantProductoSalidadDeposito").value=""
document.getElementById("inptProductoSalidadDeposito").value=""
document.getElementById("inptRegistroSeleccSalidaDeposito").value=""
document.getElementById("btnGuardarSalidaDeposito").style.backgroundColor="#b7b7b7"
document.getElementById("btnAnularSalidadDeposito").style.backgroundColor="#b7b7b7"

}
function limpiarTodoListadoSalidaDeposito(){
codProductoFkSalidaDeposito=""	
codigoProductoSalidadDeposito=""	
document.getElementById("inptFechaSalidadDeposito").value=""
document.getElementById("inptProductoSalidadDeposito").value=""
document.getElementById("inptCantProductoSalidadDeposito").value=""
document.getElementById("btnGuardarSalidaDeposito").style.backgroundColor="#b7b7b7"
document.getElementById("btnAnularSalidadDeposito").style.backgroundColor="#b7b7b7"

document.getElementById("table_abm_SalidaDeposito").innerHTML=""
document.getElementById("table_abm_listado_salida_deposito").innerHTML=""
document.getElementById("inptRegistroSeleccSalidaDeposito").value=""
document.getElementById("inptRegistroNroSalidadDeposito").value=""
document.getElementById("btnImprimirSalidaDeposito").style.display="none"
document.getElementById("btnLimpiarCamposSalidaDepostio").style.display="none"
idnombrelistacontroldeposito ='';
document.getElementById('inptNombreListaSalidadDeposito').disabled = false
document.getElementById('inptNombreListaSalidadDeposito').value = ''
document.getElementById("inptFechaSalidadDeposito").value=obtenerFechaActual();
}
var elementoSalidadDeposito="";
var stockAnteriorSalidaDeposito = "";
function ObtenerdatosAbmSalidad(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	elementoSalidadDeposito=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptRegistroSeleccSalidaDeposito").value = $(datostr).children('td[id="td_datos_3"]').html();
     document.getElementById("btnAnularSalidadDeposito").style=""
}
function AbmAnularSalidaDeposito() {
	verCerrarEfectoCargando("1")
	var cod_ext=$(elementoSalidadDeposito).children('td[id="td_id_1"]').html();
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "anularsalidaProducto")
	datos.append("cod_ext", cod_ext)
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
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				   Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
										ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
           $("table[id=tdDetalleSalidaDeposito_"+cod_ext+"]").remove()    
var control=0;
$("tr[name=tdDetalleSalidaDepositoOffline]").each(function(i, elementohtml){
control=control+1;
	   })	

document.getElementById("inptRegistroNroSalidadDeposito").value=control
	   
					limpiarCamposListadoSalidaDeposito()
					
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
function ImprimirTicketSalidaDeposito(){
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
	
	var paginadetalle="";
	$("tr[name=tdDetalleSalidaDepositoOffline]").each(function(i, elementohtml){
      var codigo=$(elementohtml).children('td[id="td_datos_1"]').html();
      var producto=$(elementohtml).children('td[id="td_datos_3"]').html();
      var cantidad=$(elementohtml).children('td[id="td_datos_4"]').html();
      var deposito=$(elementohtml).children('td[id="td_datos_7"]').html();
	 paginadetalle+="<table class='tableTicket'><tr>"
    +"<td style='width:100%'>"+codigo+" * "+producto+", CANT. "+cantidad+"</td>"
    +"</tr></table>"
    +"<table class='tableTicket'><tr>"
   +"<td style='width:33%'>"+deposito+"</td></tr></table>"
	  
	   })	
	
pagina="<div  style='background-color:#fff;'>"
+"<center>"
+"<div class='divTicket' >"
+"<p class='pTituloTicket1' >CONTROL DE DEPOSITO</p>"
+"<div class='divSeparadorTicket' style='margin-bottom:5px'></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Imp.:</b></td>"
+"<td style=''>"+f.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+"</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100%'><b>Producto</b></td>"
+"</tr>"
+"</table>"
+paginadetalle
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Cajero :</b></td>"
+"<td style=''>"+document.getElementById("lblUser").innerHTML+"</td>"
+"</tr>"
+"</table>"
+"</div>"
+"</center>"
+"</div>"


var ficha=pagina;
document.getElementById("DivImprimir").innerHTML=ficha;
   var documento= document.getElementById("DivImprimir").innerHTML;
     localStorage.setItem("reporte", documento);
	   localStorage.setItem("tipo", "ticket");
	 window.open("/GoodVentaElectroCasaMaric/system/reportTicket.html");
	 document.getElementById("DivImprimir").innerHTML = "";
}
