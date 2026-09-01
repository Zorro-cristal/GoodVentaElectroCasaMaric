//AbmSolicitud Descuento
function verificarcamposSolicitudDescuento(){
	var inptCodDetalleDescuento=document.getElementById('inptCodDetalleDescuento').value
	var inptCantidadDetalleDescuento=document.getElementById('inptCantidadDetalleDescuento').value
	var inptPrecioDetalleDescuento=document.getElementById('inptPrecioDetalleDescuento').value
	
	var inptPrecioproductoDetalleDescuento=document.getElementById('inptPrecioproductoDetalleDescuento').value
	
	  if(inptPrecioDetalleDescuento==""){
	ver_vetana_informativa("FALTO INGRESAR EL PRECIO")
	  return false;
  }
  
	

  if(inptCodDetalleDescuento==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
	  return false;
  }

  if(inptCantidadDetalleDescuento==""){
	ver_vetana_informativa("FALTO INGRESAR CANTIDAD")
	  return false;
  }
  
   if(cod_ProductoFKDesc==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
	  return false;
  }
 
 
  AbmSolicitudDescuento(inptPrecioproductoDetalleDescuento,inptCantidadDetalleDescuento,inptPrecioDetalleDescuento,"nuevo");
}
var cod_ProductoFKDesc=""
function  AbmSolicitudDescuento(precioproducto,cantidad,precio,accion){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			  datos.append("CodUsu" , userid)
			 datos.append("cod_ProductoFK" , cod_ProductoFKDesc)
			 datos.append("cantidad" , cantidad)
			 datos.append("precio" , precio)
			 datos.append("precioproducto" , precioproducto)
			 datos.append("cod_clienteFK" , idFkCliente)
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
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
				verCerrarDescuento()
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
function limpiarcampossolicituddescuento(){
	document.getElementById('inptPrecioDetalleDescuento').value = ""
		document.getElementById('inptCantidadDetalleDescuento').value = ""
		document.getElementById('inptNombreProductoDetalleDescuento').value = ""
		document.getElementById('inptCodDetalleDescuento').value = ""
		document.getElementById('inptPrecioproductoDetalleDescuento').value = ""
}

function obtenerdatosvistaSolicitudDescuento() {
		
		document.getElementById('inptPrecioDetalleDescuento').value = document.getElementById('inptCostoProductoVenta').value
		document.getElementById('inptCantidadDetalleDescuento').value = document.getElementById('inptCantProductoVenta').value
		document.getElementById('inptNombreProductoDetalleDescuento').value = document.getElementById('inptProductoVenta').value
		document.getElementById('inptCodDetalleDescuento').value = document.getElementById('inptCodProductoVenta').value
		
		cod_ProductoFKDesc = idFkProducto

}
var cod_producto_descuento = "";

var elementotablasolicitudventa="";
function obtenerdatosdetalleventasolicitudcredito(datostr){
	// promoproducto = $(datostr).children('td[id="td_datos_11"]').html()
	// if(promoproducto !== "SI"){
		// ver_vetana_informativa("ESTE PRODUCTO NO SE ENCUENTRA EN PROMO")
		// return;
	// }
	
	
	$("tr[id=tbSelecRegistro]").each(function(i, td){	
		 td.className=''
	});
	datostr.className='tableRegistroSelec'
	elementotablasolicitudventa=datostr;
	
	document.getElementById('inptPrecioDetalleDescuento').value = $(datostr).children('td[id="td_datos_3"]').html()
	document.getElementById('inptPrecioproductoDetalleDescuento').value = $(datostr).children('td[id="td_datos_3"]').html()
	document.getElementById('inptCantidadDetalleDescuento').value = $(datostr).children('td[id="td_datos_4"]').html()
	document.getElementById('inptNombreProductoDetalleDescuento').value = $(datostr).children('td[id="td_datos_1"]').html()
	document.getElementById('inptCodDetalleDescuento').value = $(datostr).children('td[id="td_datos_8"]').html()
	cod_producto_descuento = $(datostr).children('td[id="td_datos_8"]').html()
	cod_ProductoFKDesc = $(datostr).children('td[id="td_id_1"]').html()
	
	document.getElementById('btnSolicitarDescuento').disabled =false;
	document.getElementById('btnSolicitarDescuento').style.backgroundColor = '';
	
	verCerraropcionesdescuento()
}

function solicitardescuentoDesdeOpciones(){
	
	verCerraropcionesdescuento()
	verCerrarDescuento()
}

function aplicardescuentoDesdeOpciones(){
	
	verCerraropcionesdescuento()
	buscarSolicitudDesccuentoporProducto()
}

function buscarSolicitudDesccuentoporProducto() {
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_productoFK": cod_ProductoFKDesc,
		"cod_usuarioFK": userid,
		"funt": "buscarSolicitudDesccuentoporProducto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
		type: "post",
		beforeSend: function () {


		},
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_Descuento").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_Descuento").innerHTML = ''
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
					
					if(datos_buscados==""){
						
						ver_vetana_informativa("LO SENTIMOS ESTE PRODUCTO NO POSEE DESCUENTO APROBADO ");				
						
					}else{
						
						var cantidadDetalleEditar = $(elementotablasolicitudventa).children('td[id="td_datos_4"]').html()

						var totalVentaSoli = $(elementotablasolicitudventa).children('td[id="td_datos_5"]').html()						
						
						
												
						var totalVentaEditado= cantidadDetalleEditar * QuitarSeparadorMilValor(datos[3]);
						
						var resultadoDescuento= Number(QuitarSeparadorMilValor(totalVentaSoli)) - Number(totalVentaEditado)
						if(resultadoDescuento<0){
							ver_vetana_informativa("LO SENTIMOS DESCUENTO NO VALIDO");				
						}
						
						$(elementotablasolicitudventa).children('td[id="td_datos_3"]').text(separadordemilesnumero(datos[3])); 
						$(elementotablasolicitudventa).children('td[id="td_datos_5"]').text(separadordemilesnumero(totalVentaEditado));
						$(elementotablasolicitudventa).children('td[id="td_datos_9"]').text(separadordemilesnumero(resultadoDescuento));
												
						codSolicitudDescuentoFK=datos[2];
						AbmEditarDescuento()

						var totaldescuentos=0;
						var totalVenta = 0;
						$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
							var total=$(elementohtml).children('td[id="td_datos_5"]').html();
							total=QuitarSeparadorMilValor(total)
							totalVenta=Number(totalVenta)+Number(total)
							var descuento = $(elementohtml).children('td[id="td_datos_9"]').html();
							descuento=QuitarSeparadorMilValor(descuento)
							totaldescuentos=Number(totaldescuentos)+Number(descuento)
							SubtotalVenta=Number(totalVenta)+Number(totaldescuentos)
							
						});
						
						var nroCuotas = parseInt(document.getElementById('inptNroCuotasConfCredito').value)
						var montoCuota = totalVenta / Number(nroCuotas);
						
						DatosAutoCompleteCredito.push(nroCuotas)
						
						montoCuota= montoCuota/1000;
						
						montoCuota = Math.ceil(montoCuota);
						
						montoCuota= montoCuota*1000;					
				
						
						document.getElementById("inptSubTotalVenta").value=separadordemilesnumero(SubtotalVenta);
						document.getElementById("inptTotalVenta").value=separadordemilesnumero(totalVenta);
						document.getElementById("inptTotalVenta2").innerHTML=separadordemilesnumero(totalVenta);
						document.getElementById("inptTotalDescuento").value=separadordemilesnumero(totaldescuentos);

						document.getElementById('inptSaldoConfCredito').value = document.getElementById("inptTotalVenta2").innerHTML;
						document.getElementById('inptMontoPagoConfCredito').value = separadordemilesnumero(montoCuota);
				
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



function solicitardescuentoDesdeOpcionesContado(){
	
	if(controlacceso("SOLICITARDESCUENTODEPRODUCTOS","accion")==false){return;}
	
	var datos= elemSeleccDetalleProdVentaOff;
	
	document.getElementById('inptPrecioDetalleDescuento').value = $(datos).children('td[id="td_datos_3"]').html()
	document.getElementById('inptPrecioproductoDetalleDescuento').value = $(datos).children('td[id="td_datos_3"]').html()
	document.getElementById('inptCantidadDetalleDescuento').value = $(datos).children('td[id="td_datos_4"]').html()
	document.getElementById('inptNombreProductoDetalleDescuento').value = $(datos).children('td[id="td_datos_1"]').html()
	document.getElementById('inptCodDetalleDescuento').value = $(datos).children('td[id="td_datos_8"]').html()
	
	cod_producto_descuento = $(datos).children('td[id="td_datos_8"]').html()
	cod_ProductoFKDesc = $(datos).children('td[id="td_id_1"]').html()
	
	document.getElementById('btnSolicitarDescuento').disabled =false;
	document.getElementById('btnSolicitarDescuento').style.backgroundColor = '';
	

	verCerrarDescuento()
	verCerraOpcionDetalleProducto()
}

function aplicardescuentoDesdeOpcionesContado(){
	
	var datos= elemSeleccDetalleProdVentaOff;
	cod_ProductoFKDesc = $(datos).children('td[id="td_id_1"]').html()
	

	
	buscarSolicitudDesccuentoporProductoContado()
	verCerraOpcionDetalleProducto()
}



function buscarSolicitudDesccuentoporProductoContado() {
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_productoFK": cod_ProductoFKDesc,
		"cod_usuarioFK": userid,
		"funt": "buscarSolicitudDesccuentoporProducto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
		type: "post",
		beforeSend: function () {


		},
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_Descuento").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_Descuento").innerHTML = ''
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
					
					if(datos_buscados==""){
						
						ver_vetana_informativa("LO SENTIMOS ESTE PRODUCTO NO POSEE DESCUENTO APROBADO ");				
						
					}else{
						
						var cantidadDetalleEditar = $(elemSeleccDetalleProdVentaOff).children('td[id="td_datos_4"]').html()

						var totalVentaSoli = $(elemSeleccDetalleProdVentaOff).children('td[id="td_datos_5"]').html()						
						
						
												
						var totalVentaEditado= cantidadDetalleEditar * QuitarSeparadorMilValor(datos[3]);
						
						var resultadoDescuento= Number(QuitarSeparadorMilValor(totalVentaSoli)) - Number(totalVentaEditado)
						
						if(resultadoDescuento<0){
							ver_vetana_informativa("LO SENTIMOS DESCUENTO NO VALIDO");				
						}
						
						$(elemSeleccDetalleProdVentaOff).children('td[id="td_datos_3"]').text(separadordemilesnumero(datos[3])); 
						$(elemSeleccDetalleProdVentaOff).children('td[id="td_datos_5"]').text(separadordemilesnumero(totalVentaEditado));
						$(elemSeleccDetalleProdVentaOff).children('td[id="td_datos_9"]').text(separadordemilesnumero(resultadoDescuento));
												
						codSolicitudDescuentoFK=datos[2];
						AbmEditarDescuento()

						var totaldescuentos=0;
						var totalVenta = 0;
						$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
							var total=$(elementohtml).children('td[id="td_datos_5"]').html();
							total=QuitarSeparadorMilValor(total)
							totalVenta=Number(totalVenta)+Number(total)
							var descuento = $(elementohtml).children('td[id="td_datos_9"]').html();
							descuento=QuitarSeparadorMilValor(descuento)
							totaldescuentos=Number(totaldescuentos)+Number(descuento)
							SubtotalVenta=Number(totalVenta)+Number(totaldescuentos)
							
						});
						
						var nroCuotas = parseInt(document.getElementById('inptNroCuotasConfCredito').value)
						var montoCuota = totalVenta / Number(nroCuotas);
						
						DatosAutoCompleteCredito.push(nroCuotas)
						
						montoCuota= montoCuota/1000;
						
						montoCuota = Math.ceil(montoCuota);
						
						montoCuota= montoCuota*1000;					
				
						
						document.getElementById("inptSubTotalVenta").value=separadordemilesnumero(SubtotalVenta);
						document.getElementById("inptTotalVenta").value=separadordemilesnumero(totalVenta);
						document.getElementById("inptTotalVenta2").innerHTML=separadordemilesnumero(totalVenta);
						document.getElementById("inptTotalDescuento").value=separadordemilesnumero(totaldescuentos);

						document.getElementById('inptSaldoConfCredito').value = document.getElementById("inptTotalVenta2").innerHTML;
						document.getElementById('inptMontoPagoConfCredito').value = separadordemilesnumero(montoCuota);
				
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





function verCerrarMensajeDescuento(){
	
	if(document.getElementById("divMensajeDescuento").style.display==""){
		document.getElementById("divMensajeDescuento").style.display="none"
	$("div[id=divDescuentoDetalle]").fadeOut(500);			
	}else{	
/* if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	 */

		document.getElementById("divMensajeDescuento").style.display=""
		
	}
}


function controlaccesoDescuento(frm,accion){
	
	if(accesosuser[frm][accion]!= "SI"){
		  return false;
	}else{
		  return true;
	}
}

function crearFilaTablaSolicitudDescuento(indice) {
	var tabla = document.createElement("table");
	tabla.className = indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	var cuerpo = document.createElement("tbody");
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	cuerpo.appendChild(fila);
	tabla.appendChild(cuerpo);
	return { tabla: tabla, fila: fila };
}

function agregarCeldaSolicitudDescuento(fila, id, valor, ancho, oculto) {
	var celda = document.createElement("td");
	if (id) { celda.id = id; }
	if (ancho) { celda.style.width = ancho; }
	if (oculto) { celda.style.display = "none"; }
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderMensajesSolicitudDescuento(filas) {
	var contenedor = document.getElementById("divMensajeDescuento");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato) {
		var bloque = document.createElement("div");
		bloque.id = "DivMensaje_" + dato.id_solicitud;
		var tabla = document.createElement("table");
		tabla.style.width = "100%";
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.addEventListener("click", function () { obtenerdatosMensajeDetalle(fila); });

		var principal = agregarCeldaSolicitudDescuento(fila, "", "", "100%", false);
		var lista = document.createElement("ul");
		lista.className = "task-list";
		var item = document.createElement("li");
		item.className = "completed";
		var titulo = document.createElement("div");
		titulo.className = "task-title";
		var icono = document.createElement("i");
		icono.className = "bx bx-check-circle";
		var texto = document.createElement("p");
		texto.textContent = "'" + (dato.producto || "") + "'";
		titulo.appendChild(icono);
		titulo.appendChild(texto);
		var accion = document.createElement("i");
		accion.className = "bx bx-dots-vertical-rounded";
		accion.setAttribute("role", "button");
		accion.setAttribute("tabindex", "0");
		accion.setAttribute("aria-label", "Ver detalle de descuento");
		accion.addEventListener("click", function () { verCerrarMensajeDescuentoDetalle(dato.id_solicitud); });
		accion.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") { verCerrarMensajeDescuentoDetalle(dato.id_solicitud); }
		});
		item.appendChild(titulo);
		item.appendChild(accion);
		lista.appendChild(item);
		principal.appendChild(lista);

		agregarCeldaSolicitudDescuento(fila, "td_datos_1", dato.producto, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_2", dato.cantidad, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_3", dato.precio_descuento_formateado, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_4", dato.fecha, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_5", dato.usuario, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_6", dato.id_solicitud, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_7", dato.estado, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_8", dato.codigo_barra, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_9", dato.cod_producto, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_10", dato.local, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_11", dato.precio_compra_formateado, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_12", dato.precio_producto_formateado, "", true);
		agregarCeldaSolicitudDescuento(fila, "td_datos_13", dato.cliente, "", true);

		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		bloque.appendChild(tabla);
		contenedor.appendChild(bloque);
	});
}

function renderVistaSolicitudDescuento(filas) {
	var contenedor = document.getElementById("table_vista_Descuento");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato, indice) {
		var estructura = crearFilaTablaSolicitudDescuento(indice);
		estructura.fila.setAttribute("name", "trVistaProductoDescuento_" + dato.codigo_barra);
		estructura.fila.addEventListener("click", function () { obtenerdatosvistaproductodesdeventaDescuento(estructura.fila); });
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_13", dato.codigo_barra, "", true);
		var codigo = agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_15", dato.codigo_barra, "7%", false);
		codigo.style.backgroundColor = "#efeded";
		codigo.style.color = "red";
		agregarCeldaSolicitudDescuento(estructura.fila, "td_id", dato.cod_producto, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_1", (dato.producto || "") + "*" + (dato.marca || ""), "28%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_10", dato.cantidad, "5%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_2", dato.descripcion, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_12", dato.categoria, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_3", dato.unidad, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_precio_contado", dato.precio_descuento_formateado, "10%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "", dato.aprobado_por, "20%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_11", dato.fecha, "15%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "", dato.estado_solicitud, "15%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_4", dato.precio_descuento_formateado, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_5", dato.precio_compra_formateado, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_8", dato.comision, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_9", dato.estado_producto, "", true);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_20", dato.id_solicitud, "", true);
		contenedor.appendChild(estructura.tabla);
	});
}

function renderInformeSolicitudDescuento(filas) {
	var contenedor = document.getElementById("table_lista_Silocitud_Aprobado");
	contenedor.textContent = "";
	(filas || []).forEach(function (dato, indice) {
		var estructura = crearFilaTablaSolicitudDescuento(indice);
		estructura.fila.addEventListener("click", function () { obtenerdatosSolicitudDescuento(estructura.fila); });
		var codigo = agregarCeldaSolicitudDescuento(estructura.fila, "td_id", dato.codigo_barra, "10%", false);
		codigo.style.backgroundColor = "#efeded";
		codigo.style.color = "red";
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_1", dato.cliente, "15%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_1", dato.producto, "15%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_2", dato.cantidad, "10%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_3", dato.precio_descuento_formateado, "5%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "", dato.precio_producto_formateado, "5%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_4", dato.usuario_solicitud, "12%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_5", dato.fecha, "8%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_6", dato.estado, "8%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_7", dato.usuario_aprobado, "12%", false);
		agregarCeldaSolicitudDescuento(estructura.fila, "td_datos_8", dato.id_solicitud, "", true);
		contenedor.appendChild(estructura.tabla);
	});
}

function obtenerCabeceraListadoSolicitudDescuento(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo);
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && (cabecera.tagName !== "TABLE" || cabecera.querySelector("input, select, textarea"))) {
		cabecera = cabecera.previousElementSibling;
	}
	if (!cabecera) return null;
	cabecera.id = idCabecera;
	return cabecera;
}

function crearEstadoAprobacionInformeSolicitudCredito(registro) {
	var fragmento = document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.estado || ""));
	if (registro.usuario_aprueba && registro.estado !== "PENDIENTE") {
		fragmento.appendChild(document.createElement("br"));
		fragmento.appendChild(document.createTextNode(registro.usuario_aprueba));
	}
	return fragmento;
}

var listadoInformeSolicitudCredito = null;
function iniciarListadoInformeSolicitudCredito() {
	if (listadoInformeSolicitudCredito || !window.AbmListadoCore) return listadoInformeSolicitudCredito;
	var cabecera = obtenerCabeceraListadoSolicitudDescuento("table_Silocitud_Credito", "cabeceraInformeSolicitudCredito");
	if (!cabecera) return null;
	listadoInformeSolicitudCredito = window.AbmListadoCore.crear({
		nombre: "informe_solicitud_credito",
		idCabecera: cabecera.id,
		idCuerpo: "table_Silocitud_Credito",
		ordenable: true,
		columnas: [
			{ campo: "cliente", titulo: "CLIENTE", ancho: "10%" },
			{ campo: "producto_resumen", titulo: "DETALLE", ancho: "20%" },
			{ campo: "usuario_ingresa", titulo: "USUARIO SOLICITUD", ancho: "5%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "5%" },
			{ campo: "observacion", titulo: "OBS.", ancho: "10%" },
			{ campo: "estado", titulo: "ESTADO", ancho: "5%" },
			{ campo: "usuario_aprueba", titulo: "USUARIO APROBADO", ancho: "5%" },
			{ campo: "usuario_entrega", titulo: "USUARIO ENTREGA", ancho: "10%" },
			{ campo: "estado_entrega", titulo: "ENTREGADO", ancho: "10%" },
			{ campo: "fecha_entrega", titulo: "F-ENTREGA", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosSolicitudCredito",
			celdas: [
				{ id: "td_id", campo: "id_solicitud", tecnica: true },
				{ id: "td_datos_1", campo: "documento", tecnica: true },
				{ id: "td_datos_2", campo: "rut", tecnica: true },
				{ id: "td_datos_3", columna: "cliente", campo: "cliente" },
				{ id: "td_datos_20", columna: "producto_resumen", campo: "producto_resumen", render: function (valor, registro) {
					if (typeof crearProductosListadoSolicitudCredito === "function") return crearProductosListadoSolicitudCredito(registro);
					return valor;
				} },
				{ id: "td_datos_10", columna: "usuario_ingresa", campo: "usuario_ingresa" },
				{ columna: "fecha", campo: "fecha" },
				{ id: "td_datos_23", columna: "observacion", campo: "observacion" },
				{ id: "td_datos_9", columna: "estado", campo: "estado" },
				{ columna: "usuario_aprueba", campo: "usuario_aprueba", render: function (valor, registro) { return crearEstadoAprobacionInformeSolicitudCredito(registro); } },
				{ id: "td_datos_32", columna: "usuario_entrega", campo: "usuario_entrega" },
				{ id: "td_datos_33", columna: "estado_entrega", campo: "estado_entrega" },
				{ id: "td_datos_34", columna: "fecha_entrega", campo: "fecha_entrega" },
				{ id: "td_datos_30", columna: "local", campo: "local" },
				{ id: "td_datos_4", campo: "zona", tecnica: true },
				{ id: "td_datos_31", campo: "cod_local", tecnica: true },
				{ id: "td_datos_5", campo: "telefono", tecnica: true },
				{ id: "td_datos_6", campo: "direccion", tecnica: true },
				{ id: "td_datos_7", campo: "email", tecnica: true },
				{ id: "td_datos_8", campo: "whatsapp", tecnica: true },
				{ id: "td_datos_25", campo: "idzona", tecnica: true },
				{ id: "td_datos_11", campo: "lugar_trabajo", tecnica: true },
				{ id: "td_datos_12", campo: "salario_formateado", tecnica: true },
				{ id: "td_datos_13", campo: "antiguedad", tecnica: true },
				{ id: "td_datos_14", campo: "telefono_trabajo_1", tecnica: true },
				{ id: "td_datos_15", campo: "telefono_trabajo_2", tecnica: true },
				{ id: "td_datos_16", campo: "direccion_trabajo", tecnica: true },
				{ id: "td_datos_17", campo: "fecha_nacimiento", tecnica: true },
				{ id: "td_datos_18", campo: "garante", tecnica: true },
				{ id: "td_datos_19", campo: "cod_garante", tecnica: true },
				{ id: "td_datos_21", campo: "cod_cliente", tecnica: true },
				{ id: "td_datos_22", campo: "detalle_venta", tecnica: true },
				{ id: "td_datos_24", campo: "observacion_trabajo", tecnica: true },
				{ id: "td_datos_26", campo: "dato_26", tecnica: true },
				{ id: "td_datos_27", campo: "cuotas", tecnica: true },
				{ id: "td_datos_28", campo: "total_venta", tecnica: true },
				{ id: "td_datos_29", campo: "documento_garante", tecnica: true }
			]
		}
	});
	listadoInformeSolicitudCredito.iniciar();
	return listadoInformeSolicitudCredito;
}

function crearListadoInformeGeolocalizacion(nombre, idCuerpo, idCabecera, campoId, funcionSeleccion) {
	if (!window.AbmListadoCore) return null;
	var cabecera = obtenerCabeceraListadoSolicitudDescuento(idCuerpo, idCabecera);
	if (!cabecera) return null;
	var listado = window.AbmListadoCore.crear({
		nombre: nombre,
		idCabecera: cabecera.id,
		idCuerpo: idCuerpo,
		idOpcionesColumnas: nombre === "informe_fotos_cliente"
			? "opcionesColumnasInformeFotosCliente"
			: "opcionesColumnasInformeUbicacionesCliente",
		ordenable: true,
		columnas: [
			{ campo: "cliente", titulo: "CLIENTE", ancho: "40%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "15%" },
			{ campo: "descripcion", titulo: nombre === "informe_fotos_cliente" ? "DESCRIPCION" : "UBICACION", ancho: "15%" },
			{ campo: "usuario", titulo: "SUBIDO POR", ancho: "15%" },
			{ campo: "local", titulo: "LOCAL", ancho: "15%" }
		],
		fila: {
			funcionSeleccion: funcionSeleccion,
			celdas: [
				{ id: "td_id", campo: campoId, tecnica: true },
				{ id: "td_datos_1", campo: "latitud", tecnica: true },
				{ id: "td_datos_2", campo: "longitud", tecnica: true },
				{ columna: "cliente", campo: "cliente" },
				{ columna: "fecha", campo: "fecha" },
				{ columna: "descripcion", campo: "descripcion" },
				{ columna: "usuario", campo: "usuario" },
				{ id: "td_datos_4", columna: "local", campo: "local" },
				{ campo: "cod_cliente", tecnica: true },
				{ campo: "cod_usuario", tecnica: true }
			]
		}
	});
	listado.iniciar();
	return listado;
}

var listadoInformeFotosCliente = null;
function iniciarListadoInformeFotosCliente() {
	if (!listadoInformeFotosCliente) {
		listadoInformeFotosCliente = crearListadoInformeGeolocalizacion("informe_fotos_cliente", "table_informe_fotoscliente", "cabeceraInformeFotosCliente", "id_foto", "obtenerdatosinformeubicacionesfotocliente");
	}
	return listadoInformeFotosCliente;
}

var listadoInformeUbicacionesCliente = null;
function iniciarListadoInformeUbicacionesCliente() {
	if (!listadoInformeUbicacionesCliente) {
		listadoInformeUbicacionesCliente = crearListadoInformeGeolocalizacion("informe_ubicaciones_cliente", "table_informe_ubicacionescliente", "cabeceraInformeUbicacionesCliente", "id_ubicacion", "obtenerdatosinformeubicacionescliente");
	}
	return listadoInformeUbicacionesCliente;
}

function programarListadosInformeSolicitudDescuento() {
	setTimeout(function () {
		iniciarListadoInformeSolicitudCredito();
		iniciarListadoInformeMovimientoStock();
		iniciarListadoInformeFotosCliente();
		iniciarListadoInformeUbicacionesCliente();
	}, 0);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", programarListadosInformeSolicitudDescuento);
} else {
	programarListadosInformeSolicitudDescuento();
}



function buscarproductosDescuento() {

			
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divMensajeDescuento").innerHTML = ''
			controldebusquedadInventario=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divMensajeDescuento").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   			   							   
					var datos_buscados = datos[2];
					
			var datos_buscados4 = Array.isArray(datos[4]) ? datos[4] : [];
					

					
			renderMensajesSolicitudDescuento(datos_buscados4)
			if(Array.isArray(datos_buscados) && datos_buscados.length > 0){
				document.getElementById("divMensajeDescuento").style.display=""
			}else{
				document.getElementById("divMensajeDescuento").style.display="none"
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



function verCerrarMensajeDescuentoDetalle(datos){
	
	if(document.getElementById("DivMensaje_"+datos).style.display==""){
		document.getElementById("DivMensaje_"+datos).style.display="none"
	$("div[id=DivMensaje_"+datos+"]").fadeOut(500);			
	}else{	
		document.getElementById("DivMensaje_"+datos).style.display=""
		
	}
}

var idsolicituddescuendo="";
var idProductoMensajeFK="";
function obtenerdatosMensajeDetalle(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	// datostr.className = 'tableRegistroSelec'

		idsolicituddescuendo = $(datostr).children('td[id="td_datos_6"]').html();
		idProductoMensajeFK = $(datostr).children('td[id="td_datos_9"]').html();
		document.getElementById('inptCodDetalleDescuentoConfi').value = $(datostr).children('td[id="td_datos_8"]').html();
		document.getElementById('inptNombreProductoDetalleDescuentoConfi').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCantidadDetalleDescuentoConfi').value = $(datostr).children('td[id="td_datos_2"]').html();
		document.getElementById('inptPrecioDetalleDescuentoConfiSoli').value = $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptPrecioDetalleDescuentoConfiApro').value = $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptEstadoMensajeConfi').value = $(datostr).children('td[id="td_datos_7"]').html();
		document.getElementById('inptUsuarioDesocuentoConfi').value = $(datostr).children('td[id="td_datos_5"]').html();
		document.getElementById('inptLocalDesocuentoConfi').value = $(datostr).children('td[id="td_datos_10"]').html();
		document.getElementById('inptPCompraDesocuentoConfi').value = $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById('inptPcontadoDesocuentoConfi').value = $(datostr).children('td[id="td_datos_12"]').html();
		document.getElementById('inptClienteDesocuentoConfi').value = $(datostr).children('td[id="td_datos_13"]').html();

		document.getElementById("divDescuentoDetalle").style.display=""
}

function verCerraropcionesdescuento(){
	
	if(document.getElementById("divOpcionesDescuento").style.display==""){
		document.getElementById("divOpcionesDescuento").style.display="none"		
	}else{	
		document.getElementById("divOpcionesDescuento").style.display=""
	}
}


function verCerrarDescuentoDetalle(){
	
	if(document.getElementById("divDescuentoDetalle").style.display==""){
		document.getElementById("divDescuentoDetalle").style.display="none"		
	}else{	
		document.getElementById("divDescuentoDetalle").style.display=""
	}
}



function verificarcamposSolicitudDescuentoConfi(){
	var inptCodDetalleDescuentoConfi=document.getElementById('inptCodDetalleDescuentoConfi').value
	var inptCantidadDetalleDescuentoConfi=document.getElementById('inptCantidadDetalleDescuentoConfi').value
	var inptPrecioDetalleDescuentoConfiApro=document.getElementById('inptPrecioDetalleDescuentoConfiApro').value
	var inptEstadoMensajeConfi=document.getElementById('inptEstadoMensajeConfi').value
	

  if(inptCodDetalleDescuentoConfi==""){
	ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
	  return false;
  }

  if(inptCantidadDetalleDescuentoConfi==""){
	ver_vetana_informativa("FALTO INGRESAR CANTIDAD")
	  return false;
  }
  
  if(inptPrecioDetalleDescuentoConfiApro==""){
	ver_vetana_informativa("FALTO INGRESAR EL PRECIO")
	  return false;
  }
  
 
 
  AbmSolicitudDescuentoDetalle(inptCantidadDetalleDescuentoConfi,inptPrecioDetalleDescuentoConfiApro,inptEstadoMensajeConfi,"Editar");
}
function  AbmSolicitudDescuentoDetalle(cantidad,precio,estado,accion){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", accion)
			  datos.append("CodUsu" , userid)
			 datos.append("cod_ProductoFK" , idProductoMensajeFK)
			 datos.append("cantidad" , cantidad)
			 datos.append("precio" , precio)
			 datos.append("idABM" , idsolicituddescuendo)
			 datos.append("estado" , estado)
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
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
				buscarproductosDescuento()
				verCerrarDescuentoDetalle()
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




function vercerrarvistaSolicitudDescuento(d, ventana) {

	if (d == "1") {
		document.getElementById("divVistaSolicitudDescuento").style.display = ""
		  
		buscarvistaSolicitudDesccuento();
	} else {
		 
		$("div[id=divVistaSolicitudDescuento]").fadeOut(500)
	}

}


function buscarvistaSolicitudDesccuento() {
	var buscador = document.getElementById('inptBuscarVistaDescuento').value
	document.getElementById("table_vista_Descuento").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"UsuarioFK": userid,
		"funt": "buscarDescuentovista",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
		type: "post",
		beforeSend: function () {


		},
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_Descuento").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_Descuento").innerHTML = ''
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

					renderVistaSolicitudDescuento(Array.isArray(datos_buscados) ? datos_buscados : [])

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

var codSolicitudDescuentoFK="";
function obtenerdatosvistaproductodesdeventaDescuento(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	
	
	
	if(cod_producto_descuento === "" && controlProductoSolicitud === false){
		ElementoProductoVista=datostr	
		codSolicitudDescuentoFK =  $(datostr).children('td[id="td_datos_20"]').html();
		idFkProducto = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCodProductoVenta').value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptProductoVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inpTSeleccCosto').innerHTML = ""
		document.getElementById('inptCantProductoVenta').value = $(datostr).children('td[id="td_datos_10"]').html();
		document.getElementById('inptCostoProductoVenta').value = $(datostr).children('td[id="td_datos_precio_contado"]').html();
		preciocostocontado= $(datostr).children('td[id="td_datos_precio_contado"]').html();
		preciocostocontado=QuitarSeparadorMilValor(preciocostocontado)
		preciocostocredito=QuitarSeparadorMilValor(preciocostocontado)
		document.getElementById('inptDescuentoProductoVenta').value = "0";
		document.getElementById('inptComisionVenta').value = "0";
		document.getElementById('inptObservacionDetalleVenta').value = "Contado";
		if(document.getElementById("inptSeleccTipoVenta").value=="CREDITO"){
		document.getElementById('inptObservacionDetalleVenta').value = "Credito";
		preciocostocredito=QuitarSeparadorMilValor(document.getElementById("inptCostoProductoVenta").value)
		}
		document.getElementById('btnAddDetallesaVenta').style.backgroundColor = "#2196F3";
		document.getElementById('btnSolicitarDescuento').style.backgroundColor = "#4caf50";
		document.getElementById('inptCantProductoVenta').focus();
		calcularTotalVentasCosto(document.getElementById('inptCostoProductoVenta'))
		AbmEditarDescuento();
		vercerrarvistaSolicitudDescuento(2,"")
	}else{
		actualizarproductodetallesolicitud(datostr)
	}
		
		
}

function actualizarproductodetallesolicitud(datostr){
	var cantidad = $(datostr).children('td[id="td_datos_10"]').html();
	var costo = $(datostr).children('td[id="td_datos_precio_contado"]').html();
	codSolicitudDescuentoFK =  $(datostr).children('td[id="td_datos_20"]').html();
	costo = QuitarSeparadorMilValor(costo);
	var total_costo = parseInt(cantidad) * parseInt(costo);
	
	costo = separadordemilesnumero(costo);
	total_costo = separadordemilesnumero(total_costo);
	
	var elementoTabla = document.querySelectorAll('#table_abm_detalle_venta > .tableRegistroSearch')
	var costoAnt = "";
	
	
	for (var i = 0; i < elementoTabla.length; i++) {
		if($(elementoTabla[i].children[0].children[0]).children('td[id="td_datos_15"]').html() === cod_producto_descuento){
			costoAnt= $(elementoTabla[i].children[0].children[0]).children('td[id="td_datos_3"]').html();
			$(elementoTabla[i].children[0].children[0]).children('td[id="td_datos_3"]').html(costo);
			$(elementoTabla[i].children[0].children[0]).children('td[id="td_datos_5"]').html(total_costo)
		}else{
			ver_vetana_informativa('NO SE ENCUENTRA EL PRODUCTO CORRESPONDIENTE')
			return;
		}
	}
	
	AbmEditarDescuento();
	costoAnt = parseInt(QuitarSeparadorMilValor(costoAnt));
	costoNuevo = parseInt(QuitarSeparadorMilValor(costo));
	var descuento = costoAnt - costoNuevo;
	recalcularcuotas(descuento)
	vercerrarvistaSolicitudDescuento(2,"")
}
function recalcularcuotas(descuento){
	var control=0;
	var totaldescuentos=0;
	var totalVenta = 0;
	$("tr[name=tdDetalleVentaOffline]").each(function(i, elementohtml){
		var total=$(elementohtml).children('td[id="td_datos_5"]').html();
		total=QuitarSeparadorMilValor(total)
		totalVenta=Number(totalVenta)+Number(total)
		totaldescuentos=Number(totaldescuentos)+Number(descuento)
		SubtotalVenta=Number(totalVenta)+Number(totaldescuentos)
		control=control+1;
	});
	
	var nroCuotas = parseInt(document.getElementById('inptNroCuotasConfCredito').value)
	var montoCuota = totalVenta / Number(nroCuotas);
	document.getElementById("inptSubTotalVenta").value=separadordemilesnumero(SubtotalVenta);
	document.getElementById("inptTotalVenta").value=separadordemilesnumero(totalVenta);
	document.getElementById("inptTotalVenta2").innerHTML=separadordemilesnumero(totalVenta);
	document.getElementById("inptTotalDescuento").value=separadordemilesnumero(totaldescuentos);

	document.getElementById('inptSaldoConfCredito').value = document.getElementById("inptTotalVenta2").innerHTML;
	document.getElementById('inptMontoPagoConfCredito').value = separadordemilesnumero(montoCuota);
	
}
function  AbmEditarDescuento(){
	verCerrarEfectoCargando("1")
	
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "EditarAprobado")
			 datos.append("idABM" , codSolicitudDescuentoFK)
			 
					
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
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


function verCerrarInformeSoliDescuento(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divSoliDescuento").style.display==""){
		document.getElementById("divMinimizadoInformeSoliDescuento").style.display="none"
		limpiarInformeSolicitudDescuento()
 
	$("div[id=divSoliDescuento]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMESOLICITUDESCUENTO","accion")==false){return;}
mostrarSoloUno("divSoliDescuento")	
		document.getElementById("divSoliDescuento").style.display=""
		  
	}
}


function minimizarInformeSoliDescuento(){
 
	$("div[id=divSoliDescuento]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeSoliDescuento").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuSoliDescuento"));
}

function limpiarInformeSolicitudDescuento(){
	checkHistorialSoliDescuento(1)
	document.getElementById('inptBuscarInfSoliDescuento4').value = ''
	document.getElementById('inptBuscarInfSoliDescuento3').value = ''
	document.getElementById('inptBuscarInfSoliDescuento2').value = ''
	document.getElementById('inptBuscarInfSoliDescuento1').value = ''
	document.getElementById('inptTotalRegistoSoliDescuento').value = ''
	document.getElementById('inptTotalDescuentosSoliDescuento').value = ''
	document.getElementById('table_lista_Silocitud_Aprobado').innerHTML = ''
}

function checkHistorialSoliDescuento(d){	
	if(d=="1"){
		document.getElementById('checkHistorialSoliDescuento1').checked=true
		document.getElementById('checkHistorialSoliDescuento2').checked=false
		document.getElementById('inptBuscarSoliDescuentoF1').value = "";
	    document.getElementById('inptBuscaSoliDescuentoF2').value = "";	
	}else{		
		document.getElementById('checkHistorialSoliDescuento1').checked=false
		document.getElementById('checkHistorialSoliDescuento2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarSoliDescuentoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaSoliDescuentoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function buscarSoliDescuento() {
if(controlacceso("VERINFORMESOLICITUDESCUENTO","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarSoliDescuentoF1').value
	var fecha2 = document.getElementById('inptBuscaSoliDescuentoF2').value
	var producto= document.getElementById("inptBuscarInfSoliDescuento1").value
	var UsuSoli= document.getElementById("inptBuscarInfSoliDescuento2").value
	var UsuApro= document.getElementById("inptBuscarInfSoliDescuento3").value
	var cliente= document.getElementById("inptBuscarInfSoliDescuento4").value
	var estadosol= document.getElementById("inptBuscarInfSoliDescuento5").value

	if(document.getElementById('checkHistorialSoliDescuento2').checked==true){
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

	document.getElementById("table_lista_Silocitud_Aprobado").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoSoliDescuento").value =""
	document.getElementById("inptTotalDescuentosSoliDescuento").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"UsuSoli": UsuSoli,
			"UsuApro": UsuApro,
			"producto": producto,
			"cliente": cliente,
			"estado": estadosol,
			"funt": "buscarSoliDescuento",
			"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudDescuento.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_lista_Silocitud_Aprobado").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_lista_Silocitud_Aprobado").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					renderInformeSolicitudDescuento(Array.isArray(datos_buscados) ? datos_buscados : [])
					document.getElementById("inptTotalRegistoSoliDescuento").value = datos[3];
					document.getElementById("inptTotalDescuentosSoliDescuento").value = datos[4];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function obtenerdatosSolicitudDescuento(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'

		idsolicituddescuendo = $(datostr).children('td[id="td_datos_8"]').html();
		document.getElementById('inptCodDetalleDescuentoConfi').value = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptNombreProductoDetalleDescuentoConfi').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCantidadDetalleDescuentoConfi').value = $(datostr).children('td[id="td_datos_2"]').html();
		document.getElementById('inptPrecioDetalleDescuentoConfiSoli').value = $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptPrecioDetalleDescuentoConfiApro').value = $(datostr).children('td[id="td_datos_3"]').html();
		document.getElementById('inptEstadoMensajeConfi').value = $(datostr).children('td[id="td_datos_6"]').html();

		document.getElementById("divDescuentoDetalle").style.display=""
}


function comprobar_cod_barra() {
	let codigo = document.getElementById('inptCodBarraProducto').value
	if(codigo==""){
		document.getElementById('indicador_cod_barra').style.backgroundColor=''
	}
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("codigo", codigo)
	datos.append("funt", 'comprobar_codigo')

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
					var contador = datos["2"]
		
					if(contador!="0"){
						
						document.getElementById('indicador_cod_barra').style.backgroundColor='red';
					}else{
						document.getElementById('indicador_cod_barra').style.backgroundColor='green';
					}
					
					if(document.getElementById('inptCodBarraProducto').value == ""){
						document.getElementById('indicador_cod_barra').style.backgroundColor=''
					}
				}
				
		try {	} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


var listadoContabilidadVenta = null;
var listadoContabilidadCompra = null;

function crearListadoContabilidad(nombre, idCuerpo, esCompra) {
	if (!window.AbmListadoCore) return null;
	var cuerpo = document.getElementById(idCuerpo);
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && (cabecera.tagName !== "TABLE" || cabecera.querySelector("input, select, textarea"))) {
		cabecera = cabecera.previousElementSibling;
	}
	if (!cabecera) return null;
	cabecera.id = "cabecera_" + nombre;
	var columnas = [
		{ campo: "codigo_tipo_registro", titulo: "C.T.R.", ancho: "4%" },
		{ campo: "codigo_tipo_identificacion", titulo: "C.T.I.C.", ancho: "5%" },
		{ campo: "numero_identificacion", titulo: "N.I.C.", ancho: "5%" },
		{ campo: "nombre_razon_social", titulo: "N.R.S.C.", ancho: "20%" },
		{ campo: "codigo_tipo_comprobante", titulo: "C.T.C.", ancho: "5%" },
		{ campo: "fecha_emision", titulo: "F.E.C.", ancho: "5%" },
		{ campo: "numero_timbrado", titulo: "N.T.", ancho: "5%" },
		{ campo: "numero_comprobante", titulo: "N.C.", ancho: "10%" },
		{ campo: "iva_10", titulo: "IVA 10%", ancho: "5%" },
		{ campo: "iva_5", titulo: "IVA 5%", ancho: "5%" },
		{ campo: "exentas", titulo: "EXENTAS", ancho: "5%" },
		{ campo: "monto_total", titulo: "M.T.C.", ancho: "5%" },
		{ campo: "condicion", titulo: "C.C.V.", ancho: "5%" },
		{ campo: "moneda_extranjera", titulo: "O.M.E.", ancho: "3%" },
		{ campo: "imputa_iva", titulo: "I.IVA", ancho: "3%" },
		{ campo: "imputa_ire", titulo: "I.IRE", ancho: "3%" },
		{ campo: "imputa_irp", titulo: "I. IRP", ancho: "3%" }
	];
	if (esCompra) columnas.push({ campo: "documento_asociado", titulo: "", ancho: "3%" });
	columnas.push({ campo: esCompra ? "campo_19" : "campo_18", titulo: "", ancho: "2%" });
	columnas.push({ campo: esCompra ? "campo_20" : "campo_19", titulo: "", ancho: "2%" });

	var celdas = [
		{ campo: "codigo_tipo_registro", columna: "codigo_tipo_registro" },
		{ campo: "codigo_tipo_identificacion", columna: "codigo_tipo_identificacion" },
		{ campo: "numero_identificacion", columna: "numero_identificacion" },
		{ campo: "nombre_razon_social", columna: "nombre_razon_social" },
		{ campo: "codigo_tipo_comprobante", columna: "codigo_tipo_comprobante" },
		{ campo: "fecha_emision", columna: "fecha_emision" },
		{ campo: "numero_timbrado", columna: "numero_timbrado" },
		{ campo: "numero_comprobante", columna: "numero_comprobante" },
		{ campo: "iva_10_formateado", columna: "iva_10" },
		{ campo: "iva_5_formateado", columna: "iva_5" },
		{ campo: "exentas_formateado", columna: "exentas" },
		{ campo: "monto_total_formateado", columna: "monto_total" },
		{ campo: "condicion", columna: "condicion" },
		{ campo: "moneda_extranjera", columna: "moneda_extranjera" },
		{ campo: "imputa_iva", columna: "imputa_iva" },
		{ campo: "imputa_ire", columna: "imputa_ire" },
		{ campo: "imputa_irp", columna: "imputa_irp" }
	];
	if (esCompra) celdas.push({ campo: "documento_asociado", columna: "documento_asociado" });
	celdas.push({ campo: esCompra ? "campo_19" : "campo_18", columna: esCompra ? "campo_19" : "campo_18" });
	celdas.push({ campo: esCompra ? "campo_20" : "campo_19", columna: esCompra ? "campo_20" : "campo_19" });

	var listado = window.AbmListadoCore.crear({
		nombre: nombre,
		idCabecera: cabecera.id,
		idCuerpo: idCuerpo,
		ordenInicial: "fecha_emision",
		columnas: columnas,
		fila: { celdas: celdas }
	});
	listado.iniciar();
	return listado;
}

function iniciarListadoContabilidadVenta() {
	if (!listadoContabilidadVenta) listadoContabilidadVenta = crearListadoContabilidad("contabilidad_venta", "table_listaContabilidad", false);
	return listadoContabilidadVenta;
}

function iniciarListadoContabilidadCompra() {
	if (!listadoContabilidadCompra) listadoContabilidadCompra = crearListadoContabilidad("contabilidad_compra", "table_listaContabilidadCompra", true);
	return listadoContabilidadCompra;
}

function verCerrarInformeContabilidad(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divContabilidad").style.display==""){
		document.getElementById("divMinimizadoInformeContabilidad").style.display="none"
		
 
	$("div[id=divContabilidad]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMECONTABILIDAD","accion")==false){return;}
mostrarSoloUno("divContabilidad")	
		document.getElementById("divContabilidad").style.display=""
		  
	}
}




function minimizarInformeContabilidad(){
 
	$("div[id=divContabilidad]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeContabilidad").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuContabilidad"));
}



function checkHistorialContabilidad(d){	
	if(d=="1"){
		document.getElementById('checkHistorialContabilidad1').checked=true
		document.getElementById('checkHistorialContabilidad2').checked=false
		document.getElementById('inptBuscarContabilidadF1').value = "";
	    document.getElementById('inptBuscaContabilidadF2').value = "";	
	}else{		
		document.getElementById('checkHistorialContabilidad1').checked=false
		document.getElementById('checkHistorialContabilidad2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarContabilidadF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaContabilidadF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function buscarContabilidad() {
if(controlacceso("VERINFORMECONTABILIDAD","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarContabilidadF1').value
	var fecha2 = document.getElementById('inptBuscaContabilidadF2').value
	var local= document.getElementById('inptlocalContabilidad').value 
	var estado= document.getElementById('inptEstadoContabilidad').value 

	if(document.getElementById('checkHistorialContabilidad2').checked==true){
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

	document.getElementById("table_listaContabilidad").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoContabilidad").value =""
	document.getElementById("inptTotalVentaContabilidad").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"local": local,
			"estado": estado,
			"formato": "json",
			"funt": "ContabilidadVenta"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_listaContabilidad").innerHTML = ''
			document.getElementById("inptTotalVentaContabilidad").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_listaContabilidad").innerHTML = ''
			document.getElementById("inptTotalVentaContabilidad").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					var listado = iniciarListadoContabilidadVenta();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_listaContabilidad").innerHTML = datos_buscados || "";
					document.getElementById("inptTotalRegistoContabilidad").value = datos[3];
					document.getElementById("inptTotalVentaContabilidad").value = datos[4];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}



/* INFORME SOLICITUD DE CREDITO */
function verCerrarInformeSoliCredito(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeSoliCredito").style.display==""){
		document.getElementById("divMinimizadoInformeSoliCredito").style.display="none"
		
 
	$("div[id=divInformeSoliCredito]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMESOLICITUDCREDITO","accion")==false){return;}
mostrarSoloUno("divInformeSoliCredito")	
		document.getElementById("divInformeSoliCredito").style.display=""
		  
	}
}
function minimizarInformeSoliCredito(){
 
	$("div[id=divInformeSoliCredito]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeSoliCredito").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuSoliCredito"));
}
function checkHistorialSoliCredito(d){	
	if(d=="1"){
		document.getElementById('checkHistorialSoliCredito1').checked=true
		document.getElementById('checkHistorialSoliCredito2').checked=false
		document.getElementById('inptBuscarSoliCreditoF1').value = "";
	    document.getElementById('inptBuscaSoliCreditoF2').value = "";	
	}else{		
		document.getElementById('checkHistorialSoliCredito1').checked=false
		document.getElementById('checkHistorialSoliCredito2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarSoliCreditoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaSoliCreditoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}

}
function checkHistorialInformeSoliCredito(d){	
	if(d=="1"){
		document.getElementById('checkHistorialInformeSoliCredito1').checked=true
		document.getElementById('checkHistorialInformeSoliCredito2').checked=false
		document.getElementById('inptBuscarInformeSoliCreditoF1').value = "";
	    document.getElementById('inptBuscarInformeSoliCreditoF2').value = "";	
	}else{		
		document.getElementById('checkHistorialInformeSoliCredito1').checked=false
		document.getElementById('checkHistorialInformeSoliCredito2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInformeSoliCreditoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInformeSoliCreditoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarInformeSoliCredito() {
	var listadoInforme = iniciarListadoInformeSolicitudCredito();
	var fecha1 = document.getElementById('inptBuscarInformeSoliCreditoF1').value
	var fecha2 = document.getElementById('inptBuscarInformeSoliCreditoF2').value
	var cliente = document.getElementById('inptBuscarInfSoliCredito1').value
	var entregador = document.getElementById('inptBuscarInfSoliCredito2').value
	var estado_entrega = document.getElementById('inptBuscarInfSoliCredito3').value
	var fecha_entrega = document.getElementById('inptBuscarInfSoliCredito4').value
	var cod_localFK = document.getElementById('inptBuscarInfSoliCredito5').value
	

	if(document.getElementById('checkHistorialInformeSoliCredito2').checked==true){
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

	if (listadoInforme) listadoInforme.establecerRegistros([])
	document.getElementById("table_Silocitud_Credito").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeSoliCredito").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"cliente": cliente,
			"entregador": entregador,
			"estado_entrega": estado_entrega,
			"fecha_entrega": fecha_entrega,
			"cod_localFK": cod_localFK,
			"formato": listadoInforme ? "json" : "html",
			"funt": "buscar_informe_solicitud_credito"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listadoInforme) listadoInforme.establecerRegistros([])
			else document.getElementById("table_Silocitud_Credito").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_Silocitud_Credito").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listadoInforme && Array.isArray(datos_buscados)) listadoInforme.establecerRegistros(datos_buscados)
					else document.getElementById("table_Silocitud_Credito").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoInformeSoliCredito").value = datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


/* INFORME MOVIMIENTO STOCK */
var listadoInformeMovimientoStock = null;
function iniciarListadoInformeMovimientoStock() {
	if (listadoInformeMovimientoStock || !window.AbmListadoCore) return listadoInformeMovimientoStock;
	var cuerpo = document.getElementById("table_informe_movimientostock");
	if (!cuerpo) return null;
	var cabecera = document.getElementById("tdTituloInformeMovimientoStock");
	if (!cabecera) {
		cabecera = cuerpo.previousElementSibling;
		while (cabecera && (cabecera.tagName !== "TABLE" || cabecera.querySelector("input, select, textarea"))) {
			cabecera = cabecera.previousElementSibling;
		}
		if (cabecera) cabecera.id = "tdTituloInformeMovimientoStock";
	}
	if (!cabecera) return null;
	listadoInformeMovimientoStock = window.AbmListadoCore.crear({
		nombre: "informe_movimiento_stock",
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: "fecha",
		columnas: [
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%" },
			{ campo: "motivo", titulo: "MOTIVO", ancho: "15%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "10%" },
			{ campo: "usuario", titulo: "USUARIO", ancho: "10%" },
			{ campo: "cantidad", titulo: "CANTIDAD", ancho: "10%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "10%" },
			{ campo: "local", titulo: "LOCAL", ancho: "15%" }
		],
		fila: { celdas: [
			{ campo: "producto", columna: "producto", className: "tdRegistroSearch" },
			{ campo: "motivo", columna: "motivo", className: "tdRegistroSearch" },
			{ campo: "fecha", columna: "fecha", className: "tdRegistroSearch" },
			{ campo: "usuario", columna: "usuario", className: "tdRegistroSearch" },
			{ campo: "cantidad_formateada", columna: "cantidad", className: "tdRegistroSearch" },
			{ campo: "tipo", columna: "tipo", className: "tdRegistroSearch" },
			{ campo: "local", columna: "local", className: "tdRegistroSearch" },
			{ campo: "codigo_producto", tecnica: true },
			{ campo: "codigo_motivo", tecnica: true },
			{ campo: "codigo_usuario", tecnica: true },
			{ campo: "codigo_local", tecnica: true },
			{ campo: "estado", tecnica: true }
		] }
	});
	if (listadoInformeMovimientoStock.columnasActivas && listadoInformeMovimientoStock.columnasActivas().length === 0 && listadoInformeMovimientoStock.restablecerColumnas) {
		listadoInformeMovimientoStock.restablecerColumnas();
	} else {
		listadoInformeMovimientoStock.iniciar();
	}
	return listadoInformeMovimientoStock;
}
function verCerrarInformeMovimientoStock(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeMovimientoStock").style.display==""){
		document.getElementById("divMinimizadoInformeMovimientoStock").style.display="none"
		limpiarcamposbuscarInformeMovimientoStock()
 
	$("div[id=divInformeMovimientoStock]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMEMOVIMIENTOSTOCK","accion")==false){return;}
mostrarSoloUno("divInformeMovimientoStock")	
		document.getElementById("divInformeMovimientoStock").style.display=""
		  
	}
}
function minimizarInformeMovimientoStock(){
 
	$("div[id=divInformeMovimientoStock]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeMovimientoStock").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuInformeMovimientoStock"));
}
function checkHistorialInformeMovimientoStock(d){	
	if(d=="1"){
		document.getElementById('checkHistorialInformeMovimientoStock1').checked=true
		document.getElementById('checkHistorialInformeMovimientoStock2').checked=false
		document.getElementById('inptbuscarInformeMovimientoStockF1').value = "";
	    document.getElementById('inptbuscarInformeMovimientoStockF2').value = "";	
	}else{		
		document.getElementById('checkHistorialInformeMovimientoStock1').checked=false
		document.getElementById('checkHistorialInformeMovimientoStock2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptbuscarInformeMovimientoStockF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptbuscarInformeMovimientoStockF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarInformeMovimientoStock() {
	var listado = iniciarListadoInformeMovimientoStock();
	var fecha1 = document.getElementById('inptbuscarInformeMovimientoStockF1').value
	var fecha2 = document.getElementById('inptbuscarInformeMovimientoStockF2').value
	var producto = document.getElementById('inptBuscarInfMovimientoStock1').value
	var motivo = document.getElementById('inptBuscarInfMovimientoStock2').value
	var fecha = document.getElementById('inptBuscarInfMovimientoStock3').value
	var cod_localFK = document.getElementById('inptBuscarInfMovimientoStock4').value
	
	if(document.getElementById('checkHistorialInformeMovimientoStock2').checked==true){
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

	if (listado) listado.establecerRegistros([])
	document.getElementById("table_informe_movimientostock").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeMovimientoStock").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"cod_localFK": cod_localFK,
			"producto": producto,
			"motivo": motivo,
			"fecha": fecha,
			"formato": listado ? "json" : "html",
			"funt": "buscar_informe_movimiento_stock"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_informe_movimientostock").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_informe_movimientostock").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_informe_movimientostock").innerHTML = typeof datos_buscados === "string" ? datos_buscados : "";
					document.getElementById("inptTotalRegistoInformeMovimientoStock").value = datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function limpiarcamposbuscarInformeMovimientoStock(){
	checkHistorialInformeMovimientoStock(1)
	document.getElementById('inptBuscarInfMovimientoStock1').value = ''
	document.getElementById('inptBuscarInfMovimientoStock2').value = ''
	document.getElementById('inptBuscarInfMovimientoStock3').value = ''
	document.getElementById('inptBuscarInfMovimientoStock4').value = ''
	document.getElementById('inptTotalRegistoInformeMovimientoStock').value = ''
	var listado = iniciarListadoInformeMovimientoStock()
	if (listado) listado.establecerRegistros([])
	else document.getElementById('table_informe_movimientostock').innerHTML = ''
}

/* INFORME FOTOS CLIENTE */
function verCerrarInformeFotosCliente(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeFotosCliente").style.display==""){
		document.getElementById("divMinimizadoInformeFotosCliente").style.display="none"
		limpiarcamposbuscarInformeFotosCliente()
 
	$("div[id=divInformeFotosCliente]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMEUBICACIONESCLIENTE","accion")==false){return;}
mostrarSoloUno("divInformeFotosCliente")	
		document.getElementById("divInformeFotosCliente").style.display=""
		  
	}
}
function minimizarInformeFotosCliente(){
 
	$("div[id=divInformeFotosCliente]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeFotosCliente").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuInformeFotosCliente"));
}
function checkHistorialInformeFotosCliente(d){	
	if(d=="1"){
		document.getElementById('checkHistorialInformeFotosCliente1').checked=true
		document.getElementById('checkHistorialInformeFotosCliente2').checked=false
		document.getElementById('inptbuscarInformeFotosClienteF1').value = "";
	    document.getElementById('inptbuscarInformeFotosClienteF2').value = "";	
	}else{		
		document.getElementById('checkHistorialInformeFotosCliente1').checked=false
		document.getElementById('checkHistorialInformeFotosCliente2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptbuscarInformeFotosClienteF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptbuscarInformeFotosClienteF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function buscarInformeFotosCliente() {
	var listado = iniciarListadoInformeFotosCliente();
	var fecha1 = document.getElementById('inptbuscarInformeFotosClienteF1').value
	var fecha2 = document.getElementById('inptbuscarInformeFotosClienteF2').value
	var cliente = document.getElementById('inptBuscarInfFotosCliente1').value
	var fecha = document.getElementById('inptBuscarInfFotosCliente2').value
	var usuario = document.getElementById('inptBuscarInfFotosCliente3').value
	var cod_localFK = document.getElementById('inptBuscarInfFotosCliente4').value

	
	if(document.getElementById('checkHistorialInformeFotosCliente2').checked==true){
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

	if (listado) listado.establecerRegistros([])
	document.getElementById("table_informe_fotoscliente").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeFotosCliente").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"cod_localFK": cod_localFK,
			"cliente": cliente,
			"usuario": usuario,
			"fecha": fecha,
			"formato": listado ? "json" : "html",
			"funt": "buscar_informe_ubicacion_fotos_cliente"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_informe_fotoscliente").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_informe_fotoscliente").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_informe_fotoscliente").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoInformeFotosCliente").value = datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}
function buscarInformeUbicacionesCliente() {
	var listado = iniciarListadoInformeUbicacionesCliente();
	var fecha1 = document.getElementById('inptbuscarInformeFotosClienteF1').value
	var fecha2 = document.getElementById('inptbuscarInformeFotosClienteF2').value
	var cliente = document.getElementById('inptBuscarInfUbicacionesCliente1').value
	var fecha = document.getElementById('inptBuscarInfUbicacionesCliente2').value
	var usuario = document.getElementById('inptBuscarInfUbicacionesCliente3').value
	var cod_localFK = document.getElementById('inptBuscarInfUbicacionesCliente4').value

	
	if(document.getElementById('checkHistorialInformeFotosCliente2').checked==true){
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

	if (listado) listado.establecerRegistros([])
	document.getElementById("table_informe_ubicacionescliente").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoInformeUbicacionesCliente").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"cod_localFK": cod_localFK,
			"cliente": cliente,
			"usuario": usuario,
			"fecha": fecha,
			"formato": listado ? "json" : "html",
			"funt": "buscar_informe_ubicaciones_cliente"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if (listado) listado.establecerRegistros([])
			else document.getElementById("table_informe_ubicacionescliente").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_informe_ubicacionescliente").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados)
					else document.getElementById("table_informe_ubicacionescliente").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					document.getElementById("inptTotalRegistoInformeUbicacionesCliente").value = datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function limpiarcamposbuscarInformeFotosCliente(){
	checkHistorialInformeFotosCliente(1)
	document.getElementById('inptBuscarInfFotosCliente1').value = ''
	document.getElementById('inptBuscarInfFotosCliente2').value = ''
	document.getElementById('inptBuscarInfFotosCliente3').value = ''
	document.getElementById('inptBuscarInfFotosCliente4').value = ''
	document.getElementById('inptTotalRegistoInformeFotosCliente').value = ''
	var listadoFotos = iniciarListadoInformeFotosCliente()
	var listadoUbicaciones = iniciarListadoInformeUbicacionesCliente()
	if (listadoFotos) listadoFotos.establecerRegistros([])
	else document.getElementById('table_informe_fotoscliente').innerHTML = ''
	if (listadoUbicaciones) listadoUbicaciones.establecerRegistros([])
	else document.getElementById('table_informe_ubicacionescliente').innerHTML = ''
	
	verCerrarVentanasInformeFotosCliente(1)
}
function verCerrarVentanasInformeFotosCliente(d){
	
	document.getElementById("btnInformeFotosCliente1").style=''
	document.getElementById("btnInformeFotosCliente2").style=''
	document.getElementById("inptTotalRegistoInformeFotosCliente").style.display=''
	document.getElementById("btnBuscarInformeFotosCliente").style.display=''
	
	document.getElementById("divInformeUbicacionFotosCliente").style.display='none'
	document.getElementById("divInformeUbicacionesCliente").style.display='none'
	document.getElementById("inptTotalRegistoInformeUbicacionesCliente").style.display='none'
	document.getElementById("btnBuscarInformeUbicacionesCliente").style.display='none'

	if(d=="1"){
		document.getElementById("btnInformeFotosCliente1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeUbicacionFotosCliente").style.display=''
		document.getElementById("inptTotalRegistoInformeFotosCliente").style.display=''
		document.getElementById("btnBuscarInformeFotosCliente").style.display=''
	}
	if(d=="2"){
		 document.getElementById("btnInformeFotosCliente2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divInformeUbicacionesCliente").style.display=''
		document.getElementById("inptTotalRegistoInformeUbicacionesCliente").style.display=''
		document.getElementById("btnBuscarInformeUbicacionesCliente").style.display=''
		document.getElementById("inptTotalRegistoInformeFotosCliente").style.display='none'
		document.getElementById("btnBuscarInformeFotosCliente").style.display='none'
	}
}
function obtenerdatosinformeubicacionesfotocliente(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'

	LatGeo = $(datostr).children('td[id="td_datos_1"]').html();
	LonGeo = $(datostr).children('td[id="td_datos_2"]').html();
		
}
function obtenerdatosinformeubicacionescliente(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'

	LatGeo = $(datostr).children('td[id="td_datos_1"]').html();
	LonGeo = $(datostr).children('td[id="td_datos_2"]').html();
		
}



/* CONTABILIDAD COMPRA */

function verCerrarInformeContabilidadCompra(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divContabilidadCompra").style.display==""){
		document.getElementById("divMinimizadoInformeContabilidadCompra").style.display="none"
		
 
	$("div[id=divContabilidadCompra]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFOMRECONTABILIDADCOMPRA","accion")==false){return;}
mostrarSoloUno("divContabilidadCompra")	
		document.getElementById("divContabilidadCompra").style.display=""
		  
	}
}




function minimizarInformeContabilidadCmpra(){
 
	$("div[id=divContabilidadCompra]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeContabilidadCompra").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuContabilidadCompra"));
}



function checkHistorialContabilidadCompra(d){	
	if(d=="1"){
		document.getElementById('checkHistorialContabilidadCompra1').checked=true
		document.getElementById('checkHistorialContabilidadCompra2').checked=false
		document.getElementById('inptBuscarContabilidadFCompra1').value = "";
	    document.getElementById('inptBuscaContabilidadFCompra2').value = "";	
	}else{		
		document.getElementById('checkHistorialContabilidadCompra1').checked=false
		document.getElementById('checkHistorialContabilidadCompra2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarContabilidadFCompra1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaContabilidadFCompra2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}

function buscarContabilidadCompra() {
if(controlacceso("VERINFOMRECONTABILIDADCOMPRA","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarContabilidadFCompra1').value
	var fecha2 = document.getElementById('inptBuscaContabilidadFCompra2').value
	var local= document.getElementById('inptlocalContabilidadCompra').value 

	if(document.getElementById('checkHistorialContabilidadCompra2').checked==true){
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

	document.getElementById("table_listaContabilidadCompra").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoContabilidadCompra").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"local": local,
			"formato": "json",
			"funt": "ContabilidadCompra"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_listaContabilidadCompra").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_listaContabilidadCompra").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					var listado = iniciarListadoContabilidadCompra();
					if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_listaContabilidadCompra").innerHTML = datos_buscados || "";
					document.getElementById("inptTotalRegistoContabilidadCompra").value = datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


function ExporarVenta() {
	$("#table_listaContabilidad").table2excel({
       exclude: ".noExl",
       name: "Excel Document Name"
       }); 
}



function ExporarCompra() {
	$("#table_listaContabilidadCompra").table2excel({
       exclude: ".noExl",
       name: "Excel Document Name"
       }); 
}



var controlPagoCredito = 0;
function verCerrarVentanaConfirmarEgreso(d){
	if(d=="1"){
		
		document.getElementById("divConfirmarEgreso").style.display="";
		document.getElementById('inptTotalaPagarCredito').value = document.getElementById('inptMontoClienteAPagar').value;
	}
	if(d=="2"){
			if(cancelarDatosDepositoPagoGrilla("divConfirmarEgreso")){
				return;
			}
			document.getElementById("divConfirmarEgreso").style.display="none";
	}
	
	if(d=="3"){
			if(confirmarDatosDepositoPagoGrilla()){
				return;
			}
			document.getElementById("divConfirmarEgreso").style.display="none";
			anhadirPagoCredito()
	}
}


function verCerrarVentanaConfirmarEgresoParcial(d){
	if(d=="1"){
		
		document.getElementById("divConfirmarEgresoParcial").style.display="";
		// document.getElementById('inptTotalaPagarCreditoParcial').value = document.getElementById('inptMontoPagosCreditoParcial').value;
	}
	if(d=="2"){
			if(cancelarDatosDepositoPagoGrilla("divConfirmarEgresoParcial")){
				return;
			}
			document.getElementById("divConfirmarEgresoParcial").style.display="none";
	}
	
	if(d=="3"){
			if(confirmarDatosDepositoPagoGrilla()){
				return;
			}
			document.getElementById("divConfirmarEgresoParcial").style.display="none";
			anhadirPagoCreditoParcial()
	}
}


function obtenerdatosvistaproductodesdeSolicitudCredito(datostr) {
	if (typeof seleccionarProductoVistaSolicitudCredito === "function") {
		seleccionarProductoVistaSolicitudCredito(datostr);
		return;
	}
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
		// ElementoProductoVista=datostr	
		idFkProducto = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptRefCodProducto').value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptRefNombreProducto').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inpTPrecioSolicitud').innerHTML = $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById('inptRefproductoPrecio').value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inptRefCantidadProducto').value = "1";
		
		buscardetallespreciossolicitud()
		
		// document.getElementById('inptRefproductoPrecio').value = $(datostr).children('td[id="td_datos_precios_creditos"]').html();
		// document.getElementById('inptCostoProductoVenta').value = $(datostr).children('td[id="td_datos_4"]').html();

		document.getElementById('btnADDProductoSolicitudCredito').style.backgroundColor = "#2196F3";
		document.getElementById('inptRefCantidadProducto').focus();
}



function buscarCobradorSelec() {

	// document.getElementById("inptBuscarAbmsolicitudCredito6").innerHTML = ""
	document.getElementById("inptCobradorZona").innerHTML = ""
	document.getElementById("inptControlCobradorNombre").innerHTML = ""
	document.getElementById("inptBuscarDetalleVehivulos4").innerHTML = ""
	document.getElementById("inptBuscarInfMantenimientoVehivulos3").innerHTML = ""
	document.getElementById("inptBuscarComisionCobrador1").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			// document.getElementById("inptBuscarAbmsolicitudCredito6").innerHTML = ''
			document.getElementById("inptCobradorZona").innerHTML = ''
			document.getElementById("inptBuscarDetalleVehivulos4").innerHTML = ''
			document.getElementById("inptBuscarInfMantenimientoVehivulos3").innerHTML = ''
			document.getElementById("inptBuscarComisionCobrador1").innerHTML = ''
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			// document.getElementById("inptBuscarAbmsolicitudCredito6").innerHTML = ''
			document.getElementById("inptCobradorZona").innerHTML = ''
			document.getElementById("inptControlCobradorNombre").innerHTML = ''
			document.getElementById("inptBuscarDetalleVehivulos4").innerHTML = ''
			document.getElementById("inptBuscarInfMantenimientoVehivulos3").innerHTML = ''
			document.getElementById("inptBuscarComisionCobrador1").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					/* document.getElementById("inptBuscarAbmsolicitudCredito6").innerHTML = datos_buscados */
					document.getElementById("inptCobradorZona").innerHTML = datos_buscados
					document.getElementById("inptControlCobradorNombre").innerHTML = datos_buscados
					document.getElementById("inptBuscarDetalleVehivulos4").innerHTML = datos_buscados
					document.getElementById("inptBuscarInfMantenimientoVehivulos3").innerHTML = datos_buscados
					document.getElementById("inptBuscarComisionCobrador1").innerHTML = datos_buscados
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function buscarCobradorSelecEntregadoRevisionDocumentos() {

	document.getElementById("inptBuscarSolicitudRevision6").innerHTML = ""
	document.getElementById("buscarInformeVentasDocumentosEntregadas7").innerHTML = ""
	document.getElementById("buscarInformeVentasDocumentosEntregadasCliente7").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarCobradorSelecEntregadoRevisionDocumentos"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

			document.getElementById("inptBuscarSolicitudRevision6").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadas7").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadasCliente7").innerHTML = ''
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)

			document.getElementById("inptBuscarSolicitudRevision6").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadas7").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadasCliente7").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptBuscarSolicitudRevision6").innerHTML = datos_buscados
					document.getElementById("buscarInformeVentasDocumentosEntregadas7").innerHTML = datos_buscados
					document.getElementById("buscarInformeVentasDocumentosEntregadasCliente7").innerHTML = datos_buscados
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarCobradorSelecEntregadoRevisionDocumentosPagare() {

	document.getElementById("inptBuscarSolicitudRevisionPagare6").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarCobradorSelecEntregadoRevisionDocumentosPagare"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

			document.getElementById("inptBuscarSolicitudRevisionPagare6").innerHTML = ''
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)

			document.getElementById("inptBuscarSolicitudRevisionPagare6").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptBuscarSolicitudRevisionPagare6").innerHTML = datos_buscados
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function buscarCobradorSelecVendedorRevisionDocumentos() {

	document.getElementById("inptBuscarSolicitudRevision8").innerHTML = ""
	document.getElementById("buscarInformeVentasDocumentosEntregadas6").innerHTML = ""
	document.getElementById("buscarInformeVentasDocumentosEntregadasCliente6").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarCobradorSelecVendedorRevisionDocumentos"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

			document.getElementById("inptBuscarSolicitudRevision8").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadas6").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadasCliente6").innerHTML = ''
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)

			document.getElementById("inptBuscarSolicitudRevision8").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadas6").innerHTML = ''
			document.getElementById("buscarInformeVentasDocumentosEntregadasCliente6").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptBuscarSolicitudRevision8").innerHTML = datos_buscados
					document.getElementById("buscarInformeVentasDocumentosEntregadas6").innerHTML = datos_buscados
					document.getElementById("buscarInformeVentasDocumentosEntregadasCliente6").innerHTML = datos_buscados
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarCobradorSelecVendedorRevisionDocumentosPagare() {

	document.getElementById("inptBuscarSolicitudRevisionPagare5").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarCobradorSelecVendedorRevisionDocumentos"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

			document.getElementById("inptBuscarSolicitudRevisionPagare5").innerHTML = ''
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)

			document.getElementById("inptBuscarSolicitudRevisionPagare5").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptBuscarSolicitudRevisionPagare5").innerHTML = datos_buscados
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


function buscarCobradorSelecZona() {

	
	document.getElementById("inputSelectCobradorInfCuentasAcobrarinforme").innerHTML = ""
	document.getElementById("inputCobradorInformeCredito").innerHTML = ""
	document.getElementById("inptInformeTareasCobrador").innerHTML = ""
	document.getElementById("inptBuscarAbmCobradorMetasCobrador").innerHTML = ""
	document.getElementById("inptAbmCobradorMetasCobrador").innerHTML = ""
	document.getElementById("inptBuscarInformeACobrarCobrador").innerHTML = ""
	document.getElementById("inptBuscarListaCallCenter4").innerHTML = ""
	document.getElementById("inptBuscarAbmCobradorResumenCobrador").innerHTML = ""
	document.getElementById("inptFiltroCalificacionCobrador3").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionzona"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
			document.getElementById("inputSelectCobradorInfCuentasAcobrarinforme").innerHTML = ''
			document.getElementById("inputCobradorInformeCredito").innerHTML = ""
			document.getElementById("inptInformeTareasCobrador").innerHTML = ""
			document.getElementById("inptBuscarAbmCobradorMetasCobrador").innerHTML = ""
			document.getElementById("inptAbmCobradorMetasCobrador").innerHTML = ""
			document.getElementById("inptBuscarInformeACobrarCobrador").innerHTML = ""
			document.getElementById("inptBuscarListaCallCenter4").innerHTML = ""
			document.getElementById("inptBuscarAbmCobradorResumenCobrador").innerHTML = ""
			document.getElementById("inptFiltroCalificacionCobrador3").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			
			document.getElementById("inputSelectCobradorInfCuentasAcobrarinforme").innerHTML = ''
			document.getElementById("inputCobradorInformeCredito").innerHTML = ""
			document.getElementById("inptInformeTareasCobrador").innerHTML = ""
			document.getElementById("inptBuscarAbmCobradorMetasCobrador").innerHTML = ""
			document.getElementById("inptAbmCobradorMetasCobrador").innerHTML = ""
			document.getElementById("inptBuscarInformeACobrarCobrador").innerHTML = ""
			document.getElementById("inptBuscarListaCallCenter4").innerHTML = ""
			document.getElementById("inptBuscarAbmCobradorResumenCobrador").innerHTML = ""
			document.getElementById("inptFiltroCalificacionCobrador3").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					
					document.getElementById("inputSelectCobradorInfCuentasAcobrarinforme").innerHTML = datos_buscados
					document.getElementById("inputCobradorInformeCredito").innerHTML = datos_buscados
					document.getElementById("inptInformeTareasCobrador").innerHTML = datos_buscados
					document.getElementById("inptBuscarAbmCobradorMetasCobrador").innerHTML = datos_buscados
					document.getElementById("inptAbmCobradorMetasCobrador").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeACobrarCobrador").innerHTML = datos_buscados
					document.getElementById("inptBuscarListaCallCenter4").innerHTML = datos_buscados
					document.getElementById("inptBuscarAbmCobradorResumenCobrador").innerHTML = datos_buscados
					document.getElementById("inptFiltroCalificacionCobrador3").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function verCerrarVentanaAbmAgendaDesdeTC(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			limpiarcamposAgenda()
		}
		
		document.getElementById("divAbmAgenda").style.display=""
		 
		
		$("div[id=divAbmAgenda2]").fadeIn(250)
		document.getElementById('divAbmAgenda1').style.display = "none"
	} else {
		
		 
		$("div[id=divAbmAgenda]").fadeOut(500);	
		
		$("div[id=divAbmAgenda2]").fadeOut(250)
		document.getElementById('divAbmAgenda2').style.display = "none"
		
		cod_clienteAgenda = ""
		document.getElementById('inptClienteAgenda').value = ""
	}
}


function obtenerdatosabmAgendaDesdeTC(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	limpiarcamposAgenda()
	cod_clienteAgenda = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptClienteAgenda').value = $(datostr).children('td[id="td_datos_2"]').html();

	/* verCerrarVentanaAbmAgendaDesdeTC("1","2"); */
}


function checkClientesDeudaTareasCobrador(d){	
	if(d=="1"){
		document.getElementById('checkClientesDeuda1').checked=true
		document.getElementById('checkClientesDeuda2').checked=false
		
	}else{		
		document.getElementById('checkClientesDeuda1').checked=false
		document.getElementById('checkClientesDeuda2').checked=true
	
	}
	
	buscarListaCLientes()
}


function abmeliminarSolicitudCredito() {	
	 if(controlacceso("ELIMINARCREDITO","accion")==false){return;}		
	 
	 if(idSolicitudCredito==""){
		ver_vetana_informativa("FALTO SELECCIONAR LA SOLICITUD DE CREDITO")
		return
	}
	
if(confirm("Estas Seguro que quieres eliminar este solicitud")){

	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "eliminar")
	datos.append("idSolicitudCredito", idSolicitudCredito)
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
					ver_vetana_informativa("ELIMINADO CORRECTAMENTE...")
					buscarSolicitudCredito()
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
function abmaprobarSolicitudCredito() {	
	if(controlacceso("AprobarCredito","accion")==false){return;}		
	if(confirm("Estas Seguro que quieres aprobar esta solicitud")){

	if(idSolicitudCredito==""){
		ver_vetana_informativa("FALTO SELECCIONAR LA SOLICITUD DE CREDITO")
		return
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "aprobar")
	datos.append("idSolicitudCredito", idSolicitudCredito)
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
				if(datos["1"]=="producto_provisional"){
					ver_vetana_informativa(datos["2"])
					buscarProductoSolicitudVista(idSolicitudCredito)
					return false
				}
				Respuesta = datos["1"];				
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					ver_vetana_informativa("CARGADO CORRECTAMENTE...")
					buscarSolicitudCredito()
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
Vista Solicitud
*/
function verCerrarVistasolicotud(){
	// if(controlacceso("ABRIRVISTASOLICITUDCREDITO","accion")==false){return;}
	if(document.getElementById("divVistaSolicitudCreditoDetalle").style.display==""){
	
	$("div[id=divVistaSolicitudCreditoDetalle]").fadeOut(500);	
		}else{		
	
	var clienteVista = document.getElementById('inptNombreSolicitudCreditoVista').value
	var clienteCredito = document.getElementById('inptNombreSolicitudCredito').value
	
	if(clienteVista!=clienteCredito || clienteVista==""){
		ver_vetana_informativa("FAVOR SELECCIONE UNA SOLICITUD DE CREDITO")
		return false;
	}
	buscarFotosGaleria(cod_clienteFKSolicitud)
	buscarDocumentosClienteSolicitud(cod_clienteFKSolicitud)
	buscarmasreferenciasSolicitudCreditoVista(cod_clienteFKSolicitud)
	buscarProductoSolicitudVista(idSolicitudCredito)
		document.getElementById("divVistaSolicitudCreditoDetalle").style.display=""
	
		
	}

}



function limpiarNodoSolicitudCredito(nodo) {
	while (nodo && nodo.firstChild) nodo.removeChild(nodo.firstChild);
}

function crearTablaVistaSolicitudCredito(indice) {
	if (typeof crearTablaSecundariaSolicitud === "function") return crearTablaSecundariaSolicitud(indice);
	var tabla = document.createElement("table");
	tabla.className = indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border", "1");
	tabla.setAttribute("cellspacing", "1");
	tabla.setAttribute("cellpadding", "5");
	return tabla;
}

function agregarCeldaVistaSolicitudCredito(fila, id, valor, ancho, oculta) {
	var celda = document.createElement("td");
	if (id) celda.id = id;
	if (ancho) celda.style.width = ancho;
	if (oculta) celda.style.display = "none";
	celda.textContent = valor == null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderGaleriaSolicitudCredito(filas, idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return;
	limpiarNodoSolicitudCredito(contenedor);
	(filas || []).forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = "tableabm";
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		var celda = document.createElement("td");
		celda.style.width = "100%";
		var bloque = document.createElement("div");
		bloque.className = "imgFotoCi";
		bloque.style.width = "90%";
		bloque.style.height = "90%";
		bloque.style.margin = "0 auto";
		var titulo = document.createElement("p");
		titulo.className = "pTituloRepor";
		titulo.style.width = "97%";
		titulo.textContent = registro.descripcion || "";
		var imagen = document.createElement("img");
		imagen.style.width = "100%";
		imagen.alt = registro.descripcion || "Imagen del cliente";
		if (registro.url) imagen.src = registro.url;
		bloque.appendChild(titulo);
		bloque.appendChild(imagen);
		celda.appendChild(bloque);
		fila.appendChild(celda);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		contenedor.appendChild(tabla);
	});
}

function renderDocumentosSolicitudCredito(filas, idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return;
	limpiarNodoSolicitudCredito(contenedor);
	(filas || []).forEach(function (registro, indice) {
		var tabla = crearTablaVistaSolicitudCredito(indice);
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		agregarCeldaVistaSolicitudCredito(fila, "td_datos_2", registro.descripcion, "80%", false);
		agregarCeldaVistaSolicitudCredito(fila, "td_datos_3", registro.fecha, "10%", false);
		var acciones = agregarCeldaVistaSolicitudCredito(fila, "td_datos_4", "", "10%", false);
		acciones.style.textAlign = "center";
		var boton = document.createElement("input");
		boton.type = "button";
		boton.value = "VER";
		boton.className = "btn4";
		boton.style.width = "50px";
		boton.setAttribute("aria-label", "Ver documento " + (registro.descripcion || ""));
		boton.addEventListener("click", function () { verdocumentoClienteSolicitud(registro.url || ""); });
		acciones.appendChild(boton);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		contenedor.appendChild(tabla);
	});
}

function crearFilaReferenciaVistaSolicitud(registro) {
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	fila.addEventListener("click", function () { obtenerdatosRefSolicitudCredito(fila); });
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_1", registro.observacion, "10%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_2", registro.telefono, "10%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_3", registro.direccion, "10%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_4", registro.referencia, "10%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_5", registro.tipo, "10%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_id", registro.codigo, "", true);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_6", registro.observacion_corta, "", true);
	return fila;
}

function renderReferenciasVistaSolicitudCredito(filas, idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return;
	limpiarNodoSolicitudCredito(contenedor);
	var esCuerpoTabla = contenedor.tagName === "TBODY" || contenedor.tagName === "THEAD";
	(filas || []).forEach(function (registro, indice) {
		var fila = crearFilaReferenciaVistaSolicitud(registro);
		if (registro.incompleta) fila.style.backgroundColor = "#ff9090";
		if (esCuerpoTabla) {
			fila.className = indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch";
			contenedor.appendChild(fila);
			return;
		}
		var tabla = crearTablaVistaSolicitudCredito(indice);
		if (registro.incompleta) tabla.style.backgroundColor = "#ff9090";
		var cuerpo = document.createElement("tbody");
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		contenedor.appendChild(tabla);
	});
}

function crearFilaProductoVistaSolicitud(registro) {
	var fila = document.createElement("tr");
	fila.id = "tbSelecRegistro";
	if (Number(registro.es_provisional) === 1) fila.className = "table-warning";
	agregarCeldaVistaSolicitudCredito(fila, "td_id_1", registro.codigo_producto, "", true);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_1", Number(registro.es_provisional) === 1 ? "NO EXISTE" : registro.codigo_barra, "20%", false);
	var nombre = Number(registro.es_provisional) === 1 ? registro.producto + " (PRODUCTO NO REGISTRADO)" : registro.producto;
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_2", nombre, "40%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_3", registro.cantidad, "10%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_4", registro.precio_formateado, "20%", false);
	agregarCeldaVistaSolicitudCredito(fila, "td_id_2", registro.codigo_detalle, "", true);
	agregarCeldaVistaSolicitudCredito(fila, "td_datos_5", registro.cuotas, "10%", false);
	if (Number(registro.es_provisional) === 1) {
		var accion = document.createElement("td");
		var boton = document.createElement("button");
		boton.type = "button";
		boton.className = "btn btn-sm btn-warning";
		boton.textContent = "Cambiar producto";
		boton.onclick = function () { reemplazarProductoProvisionalSolicitudCredito(registro.codigo_detalle); };
		accion.appendChild(boton);
		fila.appendChild(accion);
	}
	return fila;
}

function reemplazarProductoProvisionalSolicitudCredito(idDetalle) {
	var provisional = productosProvisionalesSolicitudCreditoActual.filter(function (producto) {
		return String(producto.codigo_detalle) === String(idDetalle);
	})[0];
	if (provisional && typeof abrirModalReemplazoProductoSolicitudCredito === "function") {
		productosProvisionalesSolicitudCreditoActual = [provisional].concat(
			productosProvisionalesSolicitudCreditoActual.filter(function (producto) {
				return String(producto.codigo_detalle) !== String(idDetalle);
			})
		);
		abrirModalReemplazoProductoSolicitudCredito();
		return;
	}
	var producto = window.prompt("Ingrese el codigo, codigo de barras o nombre exacto del producto existente:");
	if (producto === null || String(producto).trim() === "") return;
	obtener_datos_user();
	$.ajax({
		data: {
			useru: userid, passu: passuser, navegador: navegador,
			funt: "reemplazarProductoProvisional",
			idDetalle: idDetalle,
			producto: String(producto).trim()
		},
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		success: function (responseText) {
			try {
				var datos = $.parseJSON(responseText);
				if (datos["1"] === "exito") {
					ver_vetana_informativa("PRODUCTO CAMBIADO CORRECTAMENTE");
					buscarProductoSolicitudVista(cod_solicitudCreditoPublic);
				} else {
					ver_vetana_informativa(datos["2"] || "NO SE ENCONTRO UN PRODUCTO EXISTENTE CON ESE DATO");
				}
			} catch (error) {
				ver_vetana_informativa("NO SE PUDO CAMBIAR EL PRODUCTO");
			}
		}
	});
}

function renderProductosVistaSolicitudCredito(filas, idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return;
	limpiarNodoSolicitudCredito(contenedor);
	var esCuerpoTabla = contenedor.tagName === "TBODY" || contenedor.tagName === "THEAD";
	(filas || []).forEach(function (registro, indice) {
		var fila = crearFilaProductoVistaSolicitud(registro);
		if (esCuerpoTabla) {
			fila.className = indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch";
			contenedor.appendChild(fila);
			return;
		}
		var tabla = crearTablaVistaSolicitudCredito(indice);
		var cuerpo = document.createElement("tbody");
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		contenedor.appendChild(tabla);
	});
}

function aplicarFondoFotoSolicitudCredito(idElemento, url) {
	Array.prototype.forEach.call(document.querySelectorAll('[id="' + idElemento + '"]'), function (elemento) {
		elemento.style.backgroundImage = url ? "url(" + JSON.stringify(String(url)) + ")" : "none";
		elemento.style.backgroundSize = "contain";
		elemento.style.backgroundRepeat = "no-repeat";
		elemento.style.backgroundPosition = "center";
	});
}

function buscarFotosGaleria(CodClienteFK){
		 var usarArray = typeof renderGaleriaSolicitudCredito === "function";
		 document.getElementById("divContenedorGaleria").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": CodClienteFK,
			"formato": usarArray ? "json" : "html",
			"funt": "buscarFotosGaleria"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divContenedorGaleria").innerHTML=''
			document.getElementById("divContenedorGaleriaAprobarSoli").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("divContenedorGaleria").innerHTML=''
			  document.getElementById("divContenedorGaleriaAprobarSoli").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		    var datos_buscados=datos[2];		 
			if (usarArray && Array.isArray(datos_buscados)) {
				renderGaleriaSolicitudCredito(datos_buscados, "divContenedorGaleria")
				renderGaleriaSolicitudCredito(datos_buscados, "divContenedorGaleriaAprobarSoli")
			} else {
				var galeriaHtml = typeof datos_buscados === "string" ? datos_buscados : ""
				document.getElementById("divContenedorGaleria").innerHTML=galeriaHtml
				document.getElementById("divContenedorGaleriaAprobarSoli").innerHTML=galeriaHtml
			}
			
			
			 var divFoto1=datos[3];
			 var divFoto2=datos[4];
			aplicarFondoFotoSolicitudCredito("divFoto1", divFoto1)
			aplicarFondoFotoSolicitudCredito("divFoto2", divFoto2)
			aplicarFondoFotoSolicitudCredito("divFoto1AprobarSoli", divFoto1)
			aplicarFondoFotoSolicitudCredito("divFoto2AprobarSoli", divFoto2)
			
			
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
function buscarDocumentosClienteSolicitud(CodClienteFK){
		 var usarArray = typeof renderDocumentosSolicitudCredito === "function";
		 document.getElementById("divContenedorDocumentos").innerHTML=paginacargando
		 document.getElementById("divContenedorDocumentosAprobarSoli").innerHTML=paginacargando
		 document.getElementById("divContenedorHistorialInforconf").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": CodClienteFK,
			"formato": usarArray ? "json" : "html",
			"funt": "buscarDocumentosClienteSolicitud"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divContenedorDocumentos").innerHTML=''
			document.getElementById("divContenedorDocumentosAprobarSoli").innerHTML=''
			document.getElementById("divContenedorHistorialInforconf").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("divContenedorDocumentos").innerHTML=''
			  document.getElementById("divContenedorDocumentosAprobarSoli").innerHTML=''
			  document.getElementById("divContenedorHistorialInforconf").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		    var datos_buscados=datos[2];		 
			if (usarArray && Array.isArray(datos_buscados)) {
				renderDocumentosSolicitudCredito(datos_buscados, "divContenedorDocumentos")
				renderDocumentosSolicitudCredito(datos_buscados, "divContenedorDocumentosAprobarSoli")
				renderDocumentosSolicitudCredito(datos_buscados, "divContenedorHistorialInforconf")
			} else {
				var documentosHtml = typeof datos_buscados === "string" ? datos_buscados : ""
				document.getElementById("divContenedorDocumentos").innerHTML=documentosHtml
				document.getElementById("divContenedorDocumentosAprobarSoli").innerHTML=documentosHtml
				document.getElementById("divContenedorHistorialInforconf").innerHTML=documentosHtml
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

function verdocumentoClienteSolicitud(url){
	if(url != ''){
		window.open(url, '_blank');
	}
}


function buscarmasreferenciasSolicitudCreditoVista(idcliente){
		 var usarArray = typeof renderReferenciasVistaSolicitudCredito === "function";
		 document.getElementById("table_mas_referenciasSolicitudCreditoVista").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idcliente,
			"formato": usarArray ? "json" : "html",
			"funt": usarArray ? "buscarmasreferencias" : "buscarmasreferenciasVista"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_mas_referenciasSolicitudCreditoVista").innerHTML=''
			document.getElementById("table_mas_referenciasSolicitudCreditoVistaAprobarSoli").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_mas_referenciasSolicitudCreditoVista").innerHTML=''
			  document.getElementById("table_mas_referenciasSolicitudCreditoVistaAprobarSoli").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		   var datos_buscados=datos[2];		 
			if (usarArray && Array.isArray(datos_buscados)) {
				renderReferenciasVistaSolicitudCredito(datos_buscados, "table_mas_referenciasSolicitudCreditoVista")
				renderReferenciasVistaSolicitudCredito(datos_buscados, "table_mas_referenciasSolicitudCreditoVistaAprobarSoli")
			} else {
				var referenciasHtml = typeof datos_buscados === "string" ? datos_buscados : ""
				document.getElementById("table_mas_referenciasSolicitudCreditoVista").innerHTML=referenciasHtml
				document.getElementById("table_mas_referenciasSolicitudCreditoVistaAprobarSoli").innerHTML=referenciasHtml
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


function buscarProductoSolicitudVista(idSolicitudCredito, alFinalizar){
		 var usarArray = typeof renderProductosVistaSolicitudCredito === "function";
		 document.getElementById("table_Solicitud_Credito_ProductoVista").innerHTML=paginacargando
		 document.getElementById("inptObservacionGeneralSolicitudCreditoVistaAprobarSoli").value=""
			document.getElementById("inptObservacionSolicitudCreditoVistaAprobarSoli").value=""
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idSolicitudCredito,
			"formato": usarArray ? "json" : "html",
			"funt": usarArray ? "buscarProductoSolicitud" : "buscarProductoSolicitudVista"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Solicitud_Credito_ProductoVista").innerHTML=""
			document.getElementById("table_Solicitud_Credito_ProductoVistaAprobarSoli").innerHTML=""
			document.getElementById("inptObservacionGeneralSolicitudCreditoVistaAprobarSoli").value=""
			document.getElementById("inptObservacionSolicitudCreditoVistaAprobarSoli").value=""
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_Solicitud_Credito_ProductoVista").innerHTML=""
			  document.getElementById("table_Solicitud_Credito_ProductoVistaAprobarSoli").innerHTML=""
			  document.getElementById("inptObservacionGeneralSolicitudCreditoVistaAprobarSoli").value=""
			document.getElementById("inptObservacionSolicitudCreditoVistaAprobarSoli").value=""
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		   var datos_buscados=datos[2];		 
			if (usarArray && Array.isArray(datos_buscados)) {
				productosSolicitudCreditoActual = datos_buscados.slice();
				productosProvisionalesSolicitudCreditoActual = datos_buscados.filter(function (producto) {
					return Number(producto.es_provisional) === 1 || producto.tipo === "PROVISIONAL";
				});
				renderProductosVistaSolicitudCredito(datos_buscados, "table_Solicitud_Credito_ProductoVista")
				renderProductosVistaSolicitudCredito(datos_buscados, "table_Solicitud_Credito_ProductoVistaAprobarSoli")
				document.getElementById("inptObservacionGeneralSolicitudCreditoVistaAprobarSoli").value=datos[6] || ""
				document.getElementById("inptObservacionSolicitudCreditoVistaAprobarSoli").value=datos[7] || ""
			} else {
				var productosHtml = typeof datos_buscados === "string" ? datos_buscados : ""
				document.getElementById("table_Solicitud_Credito_ProductoVista").innerHTML=productosHtml
				document.getElementById("table_Solicitud_Credito_ProductoVistaAprobarSoli").innerHTML=productosHtml
				document.getElementById("inptObservacionGeneralSolicitudCreditoVistaAprobarSoli").value=datos[4] || ""
				document.getElementById("inptObservacionSolicitudCreditoVistaAprobarSoli").value=datos[5] || ""
			}
			if(typeof alFinalizar === "function") alFinalizar();
			
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

