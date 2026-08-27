//ABM SOLICITUD DESCUENTO INTERES
function verCerrarSolicitudDescuentoInteres(){

	if(document.getElementById("divDescuentoInteresDetalle").style.display==""){
		document.getElementById("divDescuentoInteresDetalle").style.display="none"
	}else{	
/* if(controlacceso("VERDESCUENTOINTERES","accion")==false){return;}
	 */
	 
	 let inptInteresAPagar = parseInt(QuitarSeparadorMilValor(document.getElementById('inptInteresAPagar').value));
	 
	 if(inptInteresAPagar <= 0){
		 ver_vetana_informativa("INVALIDO PARA CREAR UN DESCUENTO")
	  return;
	 }
	 
	 
	 

		if(estadosolicituddescuentointeres === "" || estadosolicituddescuentointeres== 2){
			obtenerDatosSolicitud()
			document.getElementById("divDescuentoInteresDetalle").style.display=""
			
		}
	}
}
function obtenerDatosSolicitud(){
	document.getElementById("inptCodCreditoDetalleDescuentoInteres").value=codCredito
	document.getElementById("inptClienteDetalleDescuentoInteres").value=nombreClienteDescuentoInteres
	document.getElementById("inptInteresTotalDetalleDescuentoInteres").value=document.getElementById("inptInteresAPagar").value
	document.getElementById("inptCuotaNroDetalleDescuentoInteres").value=cuotasNro
	document.getElementById("inptMontoCuotaDetalleDescuentoInteres").value=montoCuotaSolicInteres
}
function comprobarDescuentoInteresFinalizar(){
	

	
	if(estadosolicituddescuentointeres === 0){
			ver_vetana_informativa("SOLICITUD SIGUE PENDIENTE PARA ESTE CREDITO")
			return;
		}
		
		if(estadosolicituddescuentointeres === 1){
			ver_vetana_informativa("SOLICITUD APROBADA")
			totalaprobadosolicituddescuentointeres = parseInt(totalaprobadosolicituddescuentointeres);
			var total_interes = parseInt(QuitarSeparadorMilValor(document.getElementById('inptInteresAPagar').value))
			
			var total_final = total_interes - totalaprobadosolicituddescuentointeres;
			document.getElementById("inptInteresAPagar").value= separadordemilesnumero(total_final);
			document.getElementById("btnsolicdescuentointeres").disabled = true;
			
			var inptMontoAPagar = parseInt(QuitarSeparadorMilValor(document.getElementById('inptMontoAPagar').value));
			
			inptMontoAPagar = inptMontoAPagar - totalaprobadosolicituddescuentointeres;
			document.getElementById('inptMontoAPagar').value = separadordemilesnumero(inptMontoAPagar);
			document.getElementById('inptMontoClienteAPagar').value = separadordemilesnumero(inptMontoAPagar);
			
			return;
		}
		
		if(estadosolicituddescuentointeres === 2){
			ver_vetana_informativa("SOLICITUD RECHAZADO")
			// document.getElementById("btnsolicdescuentointeres").disabled = false;
			return;
		}
		
		
}
function verificarcamposSolicitudDescuentoInteres(){
	var inptCodCreditoDetalleDescuentoInteres=document.getElementById('inptCodCreditoDetalleDescuentoInteres').value
	var inptMontoDetalleDescuentoInteres=document.getElementById('inptMontoDetalleDescuentoInteres').value
	var inptInteresTotalDetalleDescuentoInteres=document.getElementById('inptInteresTotalDetalleDescuentoInteres').value
	var inptDiasAtrazadoAPagar=document.getElementById('inptDiasAtrazadoAPagar').value
	var inptCuotaNroDetalleDescuentoInteres=document.getElementById('inptCuotaNroDetalleDescuentoInteres').value
	var inptMotivoDetalleDescuentoInteres=document.getElementById('inptMotivoDetalleDescuentoInteres').value
	
	inptMontoDetalleDescuentoInteres = parseInt(QuitarSeparadorMilValor(inptMontoDetalleDescuentoInteres));inptInteresTotalDetalleDescuentoInteres = parseInt(QuitarSeparadorMilValor(inptInteresTotalDetalleDescuentoInteres));
	
	if(inptMontoDetalleDescuentoInteres > inptInteresTotalDetalleDescuentoInteres){
		ver_vetana_informativa("EL MONTO SOLICITADO NO PUEDE SER MAYOR QUE EL INTERES")
	  return;
	}
	
	 if(inptMontoDetalleDescuentoInteres==""){
		ver_vetana_informativa("FALTO INGRESAR EL MONTO SOLICITADO")
	  return;
  }
 
 
  AbmSolicitudDescuentoInteres(inptCodCreditoDetalleDescuentoInteres,inptMontoDetalleDescuentoInteres,inptInteresTotalDetalleDescuentoInteres,inptCuotaNroDetalleDescuentoInteres,inptMotivoDetalleDescuentoInteres,inptDiasAtrazadoAPagar,"nuevo");
}
function  AbmSolicitudDescuentoInteres(codcredito,monto,totalInteres,cuota_nro,motivo,diasatraso,accion){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			  datos.append("CodUsu" , userid)
			 datos.append("cod_creditoFK" , codcredito)
			 datos.append("monto" , monto)
			 datos.append("totalInteres" , totalInteres)
			 datos.append("cod_localFK" , cod_localFKUSer)
			 datos.append("cuota_nro" , cuota_nro)
			 datos.append("cod_clienteFK" , cod_ClienteFKMora)
			 datos.append("motivo" , motivo)
			 datos.append("diasatraso" , diasatraso)
			 datos.append("montocuota" , montoCuotaSolicInteres)
			 datos.append("cod_ventaFK" , obtenerCod_ventaFK)
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoInteres.php",
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
				
				var datos_buscados = datos[2]
				if(datos_buscados === "EXISTEDESCUENTO"){
					ver_vetana_informativa("YA EXISTE DESCUENTO PARA ESTE CLIENTE")
					return;
				}
				
				ver_vetana_informativa("DATOS GUARDADOS CORRECTAMENTE")
				verCerrarSolicitudDescuentoInteres()
				limpiarcampossolicituddescuentointeres()
				document.getElementById('btnsolicdescuentointeres').disabled = true;
				montoCuotaSolicInteres = '';
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
function limpiarcampossolicituddescuentointeres(){
	document.getElementById('inptCodCreditoDetalleDescuentoInteres').value = ""
	document.getElementById('inptCuotaNroDetalleDescuentoInteres').value = ""
	document.getElementById('inptClienteDetalleDescuentoInteres').value = ""
	document.getElementById('inptInteresTotalDetalleDescuentoInteres').value = ""
	document.getElementById('inptMotivoDetalleDescuentoInteres').value = "";
	document.getElementById('inptMontoDetalleDescuentoInteres').value = "";
}
var estadosolicituddescuentointeres = "";
var totalaprobadosolicituddescuentointeres = ""
function comprobarSolicitudDescuentoInteres() {

 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codCredito": codCredito,
		"funt": "comprobarSolicitudDescuentoInteres"
		
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoInteres.php",
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
					
					
					estadosolicituddescuentointeres = datos_buscados;
					totalaprobadosolicituddescuentointeres = datos[3];
					
					comprobarDescuentoInteresFinalizar()
				}
			} catch (error) {
				controldebusquedadInventario=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

function agregarCeldaSolicitudDescuentoInteres(fila, id, valor, ancho, oculto) {
	var celda = document.createElement("td");
	if (id) { celda.id = id; }
	if (ancho) { celda.style.width = ancho; }
	if (oculto) { celda.style.display = "none"; }
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderMensajesSolicitudDescuentoInteres(filas) {
	var contenedor = document.getElementById("divMensajeDescuentoInteres");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato) {
		var bloque = document.createElement("div");
		bloque.id = "divMensajeDescuentoInteres_" + dato.id_solicitud;
		var tabla = document.createElement("table");
		tabla.style.width = "100%";
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.addEventListener("click", function () { obtenerdatosMensajeDetalleDescuentoInteres(fila); });

		agregarCeldaSolicitudDescuentoInteres(fila, "", dato.cliente, "65%", false);
		agregarCeldaSolicitudDescuentoInteres(fila, "", dato.usuario, "30%", false);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_6", dato.total_solicitado_formateado, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_7", dato.total_interes_formateado, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_8", dato.fecha_solicitud, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_9", dato.usuario, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_10", dato.id_solicitud, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_11", dato.estado, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_12", dato.local, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_13", dato.cod_credito, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_14", dato.motivo, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_15", dato.cliente, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_16", dato.dias_atraso, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_17", dato.detalle_cuota, "", true);
		agregarCeldaSolicitudDescuentoInteres(fila, "td_datos_18", dato.monto_cuota_formateado, "", true);
		var celdaAccion = agregarCeldaSolicitudDescuentoInteres(fila, "", "", "5%", false);
		var accion = document.createElement("span");
		accion.className = "status completed";
		accion.textContent = "VER";
		accion.setAttribute("role", "button");
		accion.setAttribute("tabindex", "0");
		accion.addEventListener("click", function () { verCerrarMensajeDescuentoInteresDetalle(dato.id_solicitud); });
		accion.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") { verCerrarMensajeDescuentoInteresDetalle(dato.id_solicitud); }
		});
		celdaAccion.appendChild(accion);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		bloque.appendChild(tabla);
		contenedor.appendChild(bloque);
	});
}
	
function buscarDescuentoInteres() {

			
	if(controlaccesoDescuento("VERAPLICARDESCUENTO","accion")==false){return;}	
	
	document.getElementById("divBuscadorDescuento").style.display = ''

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarDescuento",
		"formato": "json"
		
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoInteres.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divMensajeDescuentoInteres").innerHTML = ''
			controldebusquedadInventario=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divMensajeDescuentoInteres").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   							   
					var datos_buscados = datos[2];
					
			var datos_buscados4 = Array.isArray(datos[4]) ? datos[4] : [];
					

					
			renderMensajesSolicitudDescuentoInteres(datos_buscados4)
			if(Array.isArray(datos_buscados) && datos_buscados.length > 0){
				document.getElementById("divMensajeDescuentoInteres").style.display=""
			}else{
				document.getElementById("divMensajeDescuentoInteres").style.display="none"
			}
					
				}
			} catch (error) {
				controldebusquedadInventario=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function verCerrarMensajeDescuentoInteresDetalle(datos){
	if(document.getElementById("divMensajeDescuentoInteres").style.display==""){
		document.getElementById("divMensajeDescuentoInteres").style.display="none"
		$("div[id=divMensajeDescuentoInteres]").fadeOut(500);			
	}else{	
		document.getElementById("divMensajeDescuentoInteres").style.display=""
		
	}
}

var idsolicituddescuentointeres = "";
function obtenerdatosMensajeDetalleDescuentoInteres(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	// datostr.className = 'tableRegistroSelec'

		idsolicituddescuentointeres = $(datostr).children('td[id="td_datos_10"]').html();
		document.getElementById("inptUsuarioDesocuentoInteresConfi").value = $(datostr).children('td[id="td_datos_9"]').html();
		document.getElementById("inptLocalDesocuentoInteresConfi").value = $(datostr).children('td[id="td_datos_12"]').html();
		document.getElementById("inptCodDetalleDescuentoInteresConfi").value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById("inptTotalDetalleDescuentoInteresConfiSoli").value = $(datostr).children('td[id="td_datos_7"]').html();
		document.getElementById("inptTotalSolicDescuentoInteresConfiSoli").value = $(datostr).children('td[id="td_datos_6"]').html();
		document.getElementById("inptTotalAproDetalleDescuentoInteresConfiApro").value = document.getElementById("inptTotalSolicDescuentoInteresConfiSoli").value
		document.getElementById("inptMotivoAproDescuentoInteresConfi").value = $(datostr).children('td[id="td_datos_14"]').html();
		document.getElementById("inptDiasAtrasoDescuentoInteresConfi").value = $(datostr).children('td[id="td_datos_16"]').html();
		document.getElementById("inptDetalleCuotaDescuentoInteresConfi").value = $(datostr).children('td[id="td_datos_17"]').html();
		document.getElementById("inptClienteDesocuentoInteresConfi").value = $(datostr).children('td[id="td_datos_15"]').html();
		document.getElementById("inptMontoCuotaDetalleDescuentoInteresConfiSoli").value = $(datostr).children('td[id="td_datos_18"]').html();
		
		

		document.getElementById("divDescuentoInteresAprobacion").style.display=""
		document.getElementById('inptFechaAproDescuentoInteresConfi').value = obtenerFechaActual();
}
function mensajeDescuentoInteresFinalizado(){
	ver_vetana_informativa('ESTE DESCUENTO YA NO ES POSIBLE EDITAR');
	return;
}
function verCerrarDescuentoInteresAprobacion(){
	
	if(document.getElementById("divDescuentoInteresAprobacion").style.display==""){
		document.getElementById("divDescuentoInteresAprobacion").style.display="none"		
	}else{	
		document.getElementById("divDescuentoInteresAprobacion").style.display=""
		
	}
}
function verificarcamposSolicitudDescuentoInteresConfi(){
	var inptCodDetalleDescuentoInteresConfi=document.getElementById('inptCodDetalleDescuentoInteresConfi').value
	var inptTotalAproDetalleDescuentoInteresConfiApro=document.getElementById('inptTotalAproDetalleDescuentoInteresConfiApro').value
	var inptEstadoDescuentoInteresConfi=document.getElementById('inptEstadoDescuentoInteresConfi').value
	var inptFechaAproDescuentoInteresConfi=document.getElementById('inptFechaAproDescuentoInteresConfi').value
	var inptTotalSolicDescuentoInteresConfiSoli=document.getElementById('inptTotalSolicDescuentoInteresConfiSoli').value
	inptTotalSolicDescuentoInteresConfiSoli = parseInt(QuitarSeparadorMilValor(inptTotalSolicDescuentoInteresConfiSoli));
	inptTotalAproDetalleDescuentoInteresConfiApro = parseInt(QuitarSeparadorMilValor(inptTotalAproDetalleDescuentoInteresConfiApro));
	
	if(inptTotalAproDetalleDescuentoInteresConfiApro > inptTotalSolicDescuentoInteresConfiSoli){
		ver_vetana_informativa("EL MONTO NO PUEDE SER MAYOR AL SOLICITADO")
	  return false;
	}
	

  if(inptTotalAproDetalleDescuentoInteresConfiApro==""){
	ver_vetana_informativa("FALTO INGRESAR UN MONTO DE TOTAL INGRESADO")
	  return false;
  }

  if(inptEstadoDescuentoInteresConfi==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN ESTADO DE AL SOLICITUD")
	  return false;
  }
 
  
 
 
  AbmSolicitudDescuentoInteresDetalle(inptCodDetalleDescuentoInteresConfi,inptTotalAproDetalleDescuentoInteresConfiApro,inptEstadoDescuentoInteresConfi,inptFechaAproDescuentoInteresConfi,"Editar");
}
function  AbmSolicitudDescuentoInteresDetalle(cod_creditoFK,totalApro,estado,fecha_apro,accion){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			  datos.append("CodUsu" , userid)
			 datos.append("totalApro" , totalApro)
			 datos.append("idABM" , idsolicituddescuentointeres)
			 datos.append("fecha_apro" , fecha_apro)
			 datos.append("estado" , estado)
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoInteres.php",
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
				
				ver_vetana_informativa("DATOS GUARDADOS CORRECTAMENTE")
				verCerrarDescuentoInteresAprobacion()
				buscarDescuentoInteres()
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



//SOLICITUD DESCUENTO INTERES TIPO PARCIAL
function verCerrarVentanaSolicitudDescuentoInteresTipoParcial(){
	if(document.getElementById("divSolicitudDescuentoInteresTipoParcial").style.display==""){
	$("div[id=divSolicitudDescuentoInteresTipoParcial]").fadeOut(500);	
		}else{
			let inptTotalinteresPago = parseInt(QuitarSeparadorMilValor(document.getElementById('inptTotalinteresPago').value));
			if(inptTotalinteresPago <= 0){
		 ver_vetana_informativa("INVALIDO PARA CREAR UN DESCUENTO")
	  return;
	 }
			
			document.getElementById("divSolicitudDescuentoInteresTipoParcial").style.display=""
		
	 
	 
		if(estadoSolicitudDescuentoInteresTipoParcial === "" || estadoSolicitudDescuentoInteresTipoParcial == 2){
			obtenerDatosSolicitudTipoParcial()
		}
		
	}
}
function obtenerDatosSolicitudTipoParcial(){
	document.getElementById("inptClienteDescuentoInteresParcial").value=nombreClienteDescuentoInteres
	document.getElementById("inptInteresTotalDescuentoInteresParcial").value=document.getElementById("inptTotalinteresPago").value
}
function verificarcamposSolicitudDescuentoInteresTipoParcial(){

	var inptMontoDescuentoInteresParcial=document.getElementById('inptMontoDescuentoInteresParcial').value
	var inptInteresTotalDescuentoInteresParcial=document.getElementById('inptInteresTotalDescuentoInteresParcial').value
	var inptMotivoDescuentoInteresParcial=document.getElementById('inptMotivoDescuentoInteresParcial').value
	
	inptMontoDescuentoInteresParcial = parseInt(QuitarSeparadorMilValor(inptMontoDescuentoInteresParcial));inptInteresTotalDescuentoInteresParcial = parseInt(QuitarSeparadorMilValor(inptInteresTotalDescuentoInteresParcial));
	
	if(inptMontoDescuentoInteresParcial > inptInteresTotalDescuentoInteresParcial){
		ver_vetana_informativa("EL MONTO SOLICITADO NO PUEDE SER MAYOR QUE EL INTERES")
	  return;
	}
	
	 if(inptMotivoDescuentoInteresParcial==""){
		ver_vetana_informativa("FALTO INGRESAR EL MOTIVO")
	  return;
  }
	
	 if(inptMontoDescuentoInteresParcial==""){
		ver_vetana_informativa("FALTO INGRESAR EL MONTO SOLICITADO")
	  return;
  }
  
 
 
 
  AbmSolicitudDescuentoInteresTipoParcial(inptMontoDescuentoInteresParcial,inptInteresTotalDescuentoInteresParcial,inptMotivoDescuentoInteresParcial,"nuevo_tipo_parcial");
}
function  AbmSolicitudDescuentoInteresTipoParcial(monto,totalInteres,motivo,accion){

	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			  datos.append("CodUsu" , userid)
			 datos.append("monto" , monto)
			 datos.append("totalInteres" , totalInteres)
			 datos.append("cod_localFK" , '1')
			 datos.append("motivo" , motivo)
			 datos.append("cod_clienteFK" , cod_ClienteFKMora)
			 datos.append("cod_ventaFK" , obtenerCod_ventaFK)
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoInteres.php",
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

			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
				
				var datos_buscados = datos[2]
				if(datos_buscados === "EXISTEDESCUENTO"){
					ver_vetana_informativa("YA EXISTE SOLICITUD DE DESCUENTO PARA ESTE CLIENTE")
					return;
				}
				
				
				ver_vetana_informativa("DATOS GUARDADOS CORRECTAMENTE")
				verCerrarVentanaSolicitudDescuentoInteresTipoParcial()
				limpiarcamposSolicitudDescuentoInteresTipoParcial()
				document.getElementById('btnsolicdescuentointeres').disabled = true;
				document.getElementById('btnsolicdescuentointeresparcial').disabled = true;
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
function limpiarcamposSolicitudDescuentoInteresTipoParcial(){
	document.getElementById('inptClienteDescuentoInteresParcial').value = ""
	document.getElementById('inptInteresTotalDescuentoInteresParcial').value = ""
	document.getElementById('inptMotivoDescuentoInteresParcial').value = ""
	document.getElementById('inptMontoDescuentoInteresParcial').value = ""
}
var estadoSolicitudDescuentoInteresTipoParcial = "";
var totalaprobadoSolicitudDescuentoInteresTipoParcial = ""
function comprobarSolicitudDescuentoInteresTipoParcial() {


	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_ventaFK": obtenerCod_ventaFK,
		"funt": "comprobarSolicitudDescuentoInteresTipoParcial"
		
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuentoInteres.php",
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
					
					
					estadoSolicitudDescuentoInteresTipoParcial = datos_buscados;
					totalaprobadoSolicitudDescuentoInteresTipoParcial = datos[3];
					
					comprobarDescuentoInteresFinalizarTipoParcial()
				}
			} catch (error) {
				controldebusquedadInventario=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function comprobarDescuentoInteresFinalizarTipoParcial(){
	
	if(estadoSolicitudDescuentoInteresTipoParcial === 0){
			ver_vetana_informativa("SOLICITUD SIGUE PENDIENTE PARA ESTE CREDITO")
			document.getElementById("btnsolicdescuentointeresparcial").disabled = true;
			return;
		}
		
		if(estadoSolicitudDescuentoInteresTipoParcial === 1){
			ver_vetana_informativa("SOLICITUD APROBADA")
			totalaprobadoSolicitudDescuentoInteresTipoParcial = parseInt(totalaprobadoSolicitudDescuentoInteresTipoParcial);
			var total_interes = parseInt(QuitarSeparadorMilValor(document.getElementById('inptTotalinteresPago').value))
			
			var total_final = total_interes - totalaprobadoSolicitudDescuentoInteresTipoParcial;
			document.getElementById("inptTotalinteresPago").value= separadordemilesnumero(total_final);

			document.getElementById("btnsolicdescuentointeres").disabled = true;
			document.getElementById("btnsolicdescuentointeresparcial").disabled = true;
			
			var inptDeudaActualCargaPago = parseInt(QuitarSeparadorMilValor(document.getElementById('inptDeudaActualCargaPago').value));
			
			inptDeudaActualCargaPago = inptDeudaActualCargaPago - totalaprobadoSolicitudDescuentoInteresTipoParcial;
			document.getElementById('inptDeudaActualCargaPago').value = separadordemilesnumero(inptDeudaActualCargaPago);

			
			return;
		}
		
		if(estadoSolicitudDescuentoInteresTipoParcial === '' || estadoSolicitudDescuentoInteresTipoParcial === 2 ){
			document.getElementById("btnsolicdescuentointeres").disabled = false;
			document.getElementById("btnsolicdescuentointeresparcial").disabled = false;
		}
		
		
}

