// ABM SECTOR VENDEDOR
function crearNodoMetaVendedor(etiqueta, clase, texto){
	var nodo=document.createElement(etiqueta);
	if(clase){nodo.className=clase;}
	if(texto!==undefined && texto!==null){nodo.textContent=String(texto);}
	return nodo;
}
function renderMetasVendedor(registros){
	var contenedor=document.getElementById("table_vendedor_metas");
	if(!contenedor){return;}
	while(contenedor.firstChild){contenedor.removeChild(contenedor.firstChild);}
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro){
		var tarjeta=crearNodoMetaVendedor("div");
		tarjeta.style.height="470px";
		tarjeta.style.border="3px solid #dddddd";
		tarjeta.style.background="#dddddd";
		tarjeta.style.borderRadius="5px";
		tarjeta.style.display="flex";
		tarjeta.style.justifyContent="center";
		tarjeta.style.alignItems="center";
		tarjeta.id=registro.fecha || "";
		tarjeta.setAttribute("url",registro.estado || "");
		tarjeta.addEventListener("click",function(){
			obtenerdatosvistaventaMetasVendedor(tarjeta,registro.monto_contado || 0,registro.monto_credito || 0,registro.fecha || "",registro.codigo_vendedor || "",registro.codigo_meta || "");
		});

		var detalle=crearNodoMetaVendedor("div","ContenedorDetalleCatalogo");
		if(Number(registro.puntos)!==0){
			var puntos=crearNodoMetaVendedor("h2",null,(registro.puntos || 0)+" pts");
			puntos.style.position="absolute"; puntos.style.top="10px"; puntos.style.right="10px";
			puntos.style.backgroundColor="#f44336"; puntos.style.color="white"; puntos.style.margin="0";
			puntos.style.padding="5px 10px"; puntos.style.borderRadius="5px";
			detalle.appendChild(puntos);
		}
		var titulo=crearNodoMetaVendedor("h1",null,(registro.nombre || "")+" - "+(registro.mes || ""));
		titulo.style.fontSize="14px"; detalle.appendChild(titulo);
		var imagenCaja=crearNodoMetaVendedor("div");
		var imagen=document.createElement("img");
		imagen.src=registro.imagen || ""; imagen.alt="Vendedor "+(registro.nombre || "");
		imagen.style.width="70%"; imagen.style.marginTop="5px"; imagenCaja.appendChild(imagen); detalle.appendChild(imagenCaja);

		var contenido=crearNodoMetaVendedor("div","card_content");
		contenido.style.width="100%"; contenido.style.height="50%"; contenido.style.backgroundColor="#f5f5f5";
		contenido.style.padding="5px"; contenido.style.display="flex"; contenido.style.flexDirection="column"; contenido.style.justifyContent="space-between";
		var info=crearNodoMetaVendedor("div","info");
		var etiqueta=crearNodoMetaVendedor("h4",null,"Total Venta"); etiqueta.style.margin="0"; info.appendChild(etiqueta);
		info.appendChild(crearNodoMetaVendedor("h1",null,(registro.venta_total_formateada || "0")+" Gs.")); contenido.appendChild(info);
		var pie=crearNodoMetaVendedor("div","card_footer");
		pie.style.display="flex"; pie.style.justifyContent="space-around"; pie.style.marginTop="8px"; pie.style.borderTop="1px solid #ccc"; pie.style.paddingTop="5px";
		var bloque=crearNodoMetaVendedor("div"); bloque.style.textAlign="center"; bloque.style.width="100%";
		var metaTitulo=crearNodoMetaVendedor("h5",null,"Meta"); metaTitulo.style.margin="0"; metaTitulo.style.fontSize="13px"; metaTitulo.style.color="green"; bloque.appendChild(metaTitulo);
		var metaValor=crearNodoMetaVendedor("p",null,registro.meta_total_formateada || "0"); metaValor.style.margin="0"; metaValor.style.fontSize="12px"; bloque.appendChild(metaValor);
		var centro=crearNodoMetaVendedor("div"); centro.style.display="flex"; centro.style.justifyContent="center";
		var progresoCaja=crearNodoMetaVendedor("div","progresss"); progresoCaja.style.width="35%";
		var progreso=crearNodoMetaVendedor("div","circular-progres"); progreso.setAttribute("role","progressbar"); progreso.setAttribute("aria-valuenow",registro.resultado_porcentaje || 0); progreso.setAttribute("aria-valuemin","0"); progreso.setAttribute("aria-valuemax","100"); progreso.style.setProperty("--value",registro.resultado_porcentaje || 0); progreso.style.width="100%";
		progresoCaja.appendChild(progreso); centro.appendChild(progresoCaja); bloque.appendChild(centro); pie.appendChild(bloque); contenido.appendChild(pie); detalle.appendChild(contenido); tarjeta.appendChild(detalle); fragmento.appendChild(tarjeta);
	});
	contenedor.appendChild(fragmento);
}
function verCerrarAbmNuevoSectorVendedor(){
	
	if(document.getElementById("divAbmNuevoSectorVendedor").style.display==""){
		
		$("div[id=divAbmNuevoSectorVendedor]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divAbmNuevoSectorVendedor").style.display=""

	}
}
function VerificarDatosNuevoSectorVendedor() {
	var inptNuevoSectorVendedor = document.getElementById('inptNuevoSectorVendedor').value
	
	if (inptNuevoSectorVendedor == "") {
		ver_vetana_informativa("FALTO AGREGAR DESCRIPCION")
		return false;
	}	

		accion = "NuevoSectorVendedor";
	
	AbmNuevoSectorVendedor(inptNuevoSectorVendedor, accion);
}
function AbmNuevoSectorVendedor(descripcion , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("descripcion", descripcion)


	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
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
					document.getElementById('inptNuevoSectorVendedor').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarSectorVendedorOption()
					verCerrarAbmNuevoSectorVendedor()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function renderizarOpcionesSectorVendedor(idContenedor, registros) {
	var contenedores = document.querySelectorAll("#" + idContenedor);
	for (var indice = 0; indice < contenedores.length; indice++) {
		var contenedor = contenedores[indice];
		while (contenedor.firstChild) {
			contenedor.removeChild(contenedor.firstChild);
		}

		var opcionInicial = document.createElement("option");
		opcionInicial.value = "";
		opcionInicial.textContent = "SELECCIONAR";
		contenedor.appendChild(opcionInicial);

		if (!Array.isArray(registros)) {
			continue;
		}

		registros.forEach(function (registro) {
			var opcion = document.createElement("option");
			opcion.value = registro.descripcion || "";
			opcion.textContent = registro.descripcion || "";
			opcion.setAttribute("data-codigo", registro.codigo || "");
			contenedor.appendChild(opcion);
		});
	}
}

function buscarSectorVendedorOption() {

	document.getElementById("inptSectorVendedor").innerHTML = ""
	document.getElementById("inptBuscarAbmCobrador4").innerHTML = ""
	// document.getElementById("inptSectorSueldos").innerHTML = ""
	document.getElementById("inptSectorMetas").innerHTML = ""
	// document.getElementById("inptBuscarComisionVendedorAgrupado2").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscarSectorVendedorOption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptSectorVendedor").innerHTML = ''
			document.getElementById("inptBuscarAbmCobrador4").innerHTML = ''
			// document.getElementById("inptSectorSueldos").innerHTML = ''
			document.getElementById("inptSectorMetas").innerHTML = ''
			// document.getElementById("inptBuscarComisionVendedorAgrupado2").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptSectorVendedor").innerHTML = ''
			document.getElementById("inptBuscarAbmCobrador4").innerHTML = ''
			// document.getElementById("inptSectorSueldos").innerHTML = ''
			document.getElementById("inptSectorMetas").innerHTML = ''
			// document.getElementById("inptBuscarComisionVendedorAgrupado2").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderizarOpcionesSectorVendedor("inptSectorVendedor", datos_buscados)
					renderizarOpcionesSectorVendedor("inptBuscarAbmCobrador4", datos_buscados)
					// document.getElementById("inptSectorSueldos").innerHTML = datos_buscados
					renderizarOpcionesSectorVendedor("inptSectorMetas", datos_buscados)
					// document.getElementById("inptBuscarComisionVendedorAgrupado2").innerHTML = datos_buscados


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

//METAS VENDEDOR
function abmaccesoMetas(d) {
	
	var idMetas=d.name
	var nro=d.value
	nro=QuitarSeparadorMilValor(nro);
	var Funcion="editarAcceso"
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("idAbmUsuario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", Funcion)
	datos.append("idMetas", idMetas)	
	datos.append("nro", nro)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
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
        
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
       
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
					
					}			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}


function verCerrarInformeMetasVendedores(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divVendedorMetas").style.display==""){
		document.getElementById("divMinimizadoInformeMetasVendedores").style.display="none"
		limpiarcamposbuscadorInformePagosEliminados()
//  
	$("div[id=divVendedorMetas]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
mostrarSoloUno("divVendedorMetas")	
		document.getElementById("divVendedorMetas").style.display=""
		 //  
		 
		 var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarMetasF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarMetasF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	}
}


function minimizarMetasVendedores(){
	$("div[id=divVendedorMetas]").fadeOut(500);
	document.getElementById("divMinimizadoInformeMetasVendedores").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuMetasVendedores"));
}

function checkHistorialMetas(d){	
	if(d=="1"){
		document.getElementById('checkHistorialMetas1').checked=true
		document.getElementById('checkHistorialMetas2').checked=false
		document.getElementById('inptBuscarMetasF1').value = "";
	    document.getElementById('inptBuscarMetasF2').value = "";	
	}else{		
		document.getElementById('checkHistorialMetas1').checked=false
		document.getElementById('checkHistorialMetas2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarMetasF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarMetasF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


function buscarMetasVendedores() {
	if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
	var fecha1 = document.getElementById('inptBuscarMetasF1').value
	var fecha2 = document.getElementById('inptBuscarMetasF2').value
	var local = document.getElementById('inptlocalMetas').value
	var sector = document.getElementById('inptSectorMetas').value
	var tipo = document.getElementById('inptTipoMetas').value
	var nombre_vendedor = document.getElementById('inptBuscarMetasNombreVendedor').value

	if(document.getElementById('checkHistorialMetas2').checked==true){
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
	
	document.getElementById("table_vendedor_metas").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoMetas").value =""
	document.getElementById("inptTotalMetasMetas").value =""
	document.getElementById("inptTotalVentaMetas").value =""
	document.getElementById("inptPorcentajeMetas").value =""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"sector": sector,
		"tipo": tipo,
		"nombre_vendedor": nombre_vendedor,
		"formato": "json",
		"funt": "buscarMetas"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vendedor_metas").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vendedor_metas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if(Array.isArray(datos_buscados)){renderMetasVendedor(datos_buscados);}
					else{document.getElementById("table_vendedor_metas").innerHTML = datos_buscados || "";}
					
					document.getElementById("inptTotalRegistoMetas").value = datos[3];
					document.getElementById("inptTotalVentaMetas").value = datos[4];
					document.getElementById("inptTotalMetasMetas").value = datos[5];
					document.getElementById("inptPorcentajeMetas").value = datos[6]+" %";
					
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}

function obtenerdatosvistaventaMetasVendedor(datos, montoContado ,montoCredito , fecha , vendedor , idAbm ) {
	if(controlacceso("EDITARMETASVENDEDOR","accion")==false){return;}
	 verCerrarVentanaAbmMetasVendedor("1")
	idAbmMetaVendedor = idAbm
	
	var divElement = document.getElementById(datos.id);
	var urlValue = divElement.getAttribute('url');
	
	document.getElementById('inptAbmMontoCreditoMetasVendedor').value = separadordemilesnumero(montoCredito);
	document.getElementById('inptAbmMontoContadoMetasVendedor').value = separadordemilesnumero(montoContado);
	document.getElementById('inptAbmFechaMetasVendedor').value = datos.id;	
	document.getElementById('inptAbmVendedorMetasVendedor').value = vendedor;
	document.getElementById('inptEstadoMetasVendedores').value = urlValue;	
	document.getElementById('btnAbmMetasVendedor').value = "Editar";
	
}

function menu(d){
	if(d=="1"){
		
		$('#divMenuMantenimiento').stop().animate({scrollTop: 0}, 400);
	}
	if(d=="2"){
	
		$('#divMenuMantenimiento').stop().animate({scrollTop: 600}, 400);
		
	}
	if(d=="3"){
		
		$('#divMenuMantenimiento').stop().animate({scrollTop: 1300}, 400);
	}
	if(d=="4"){
		
		$('#divMenuMantenimiento').stop().animate({scrollTop: 1800}, 400);
	}
	
	
}

function verCerrarVentanaAbmMetasVendedor(d) {
	if (d == "1") {

		document.getElementById('divAbmMetasVendedor').style.display = ""
	} else {
limpiarcamposMetasVendedor() 
		document.getElementById('divAbmMetasVendedor').style.display = "none"
	}
}


function limpiarcamposMetasVendedor() {
	document.getElementById('inptAbmMontoCreditoMetasVendedor').value = "";
	document.getElementById('inptAbmMontoContadoMetasVendedor').value = "";
	document.getElementById('inptAbmFechaMetasVendedor').value = "";	
	document.getElementById('inptAbmVendedorMetasVendedor').value = "";
	document.getElementById('inptEstadoMetasVendedores').value = "";
	document.getElementById('btnAbmMetasVendedor').value = "Guardar";
	idAbmMetaVendedor="";
}

var idAbmMetaVendedor ="";
function verificarcamposAbmMetasVendedor() {
	var inptAbmMontoCreditoMetasVendedor = document.getElementById('inptAbmMontoCreditoMetasVendedor').value
	var inptAbmMontoContadoMetasVendedor = document.getElementById('inptAbmMontoContadoMetasVendedor').value
	var inptAbmFechaMetasVendedor = document.getElementById('inptAbmFechaMetasVendedor').value
	var inptAbmVendedorMetasVendedor = document.getElementById('inptAbmVendedorMetasVendedor').value
	var inptEstadoMetasVendedores = document.getElementById('inptEstadoMetasVendedores').value
	
	if (inptAbmMontoCreditoMetasVendedor == "") {
		ver_vetana_informativa("FALTO INGESAR EL MONTO")
		return false;
	}
	
	if (inptAbmMontoContadoMetasVendedor == "") {
		ver_vetana_informativa("FALTO INGESAR EL MONTO")
		return false;
	}
	
	if (inptAbmVendedorMetasVendedor == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL COBRADOR")
		return false;
	}
	
	if (inptEstadoMetasVendedores == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}
	
	
 
	var accion = "";
	if (idAbmMetaVendedor != "") {
		accion = "editar_meta";
		 
	} else {
		accion = "nuevo_meta";
		 
	}
		
	AbmMetasVendedor(inptEstadoMetasVendedores,inptAbmMontoCreditoMetasVendedor,inptAbmMontoContadoMetasVendedor,inptAbmFechaMetasVendedor,inptAbmVendedorMetasVendedor,idAbmMetaVendedor,accion);
}

function AbmMetasVendedor(estado,montoCredito,montoContado,fecha,vendedor,idAbmMetaVendedor,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("montoCredito", montoCredito)
	datos.append("montoContado", montoContado)
	datos.append("fecha", fecha)
	datos.append("vendedor", vendedor)
	datos.append("idAbmMetaVendedor", idAbmMetaVendedor)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
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
					limpiarcamposMetasVendedor()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarMetasVendedores()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function verCerrarInformeClieteMorosos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divClienteMoroso").style.display==""){
		document.getElementById("divMinimizadoInformeClienteMoroso").style.display="none"
		limpiarcamposbuscadorInformePagosEliminados()
 
	$("div[id=divClienteMoroso]").fadeOut(500);			
	}else{	
/* if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	 */
mostrarSoloUno("divClienteMoroso")	
		document.getElementById("divClienteMoroso").style.display=""
		
		  
	}
}


function minimizarInformeClieteMorosos(){
 
	$("div[id=divClienteMoroso]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeClienteMoroso").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuClienteMoroso"));
}



var Contenidomensaje ="";


function buscarcuentaMoroso() {

	 var filtro= document.getElementById("inputSelectTipoBuscarMoroso").value
	 var buscar= document.getElementById("inptBuscarInfClienteMoroso").value
	 var zona= document.getElementById("inptZonaMoroso").value
	 var Local= document.getElementById("inptlocalMoroso").value
   
	document.getElementById("table_Cliente_Moroso").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoCliente_orosos").value =""
	document.getElementById("inptTotalDeudaMorosos").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"buscar": buscar,
			"filtro": filtro,
			"zona": zona,
			"Local": Local,
			"funt": "cuentasMoroso"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Cliente_Moroso").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_Cliente_Moroso").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_Cliente_Moroso").innerHTML = datos_buscados
					
					document.getElementById("inptTotalRegistoCliente_orosos").value = datos[3];
					document.getElementById("inptTotalDeudaMorosos").value = datos[4];
					document.getElementById("inptDeudaMorosos").value = datos[6];
					
					Contenidomensaje=datos[7]
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


function copiarAlPortapapeles() {
  var aux = document.createElement("input");
  aux.setAttribute("value", Contenidomensaje);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ver_vetana_informativa("MENSAJE GENERADO CON EXITO FAVOR PEGAR EN EL ARCHIVO EXCEL")
}


var paginacargando = `
<div class="loading-container">
    <div class="loading-dots">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="loading-text">Cargando datos...</div>
</div>
`;





function ExploradorArchivo(){	
$("input[name=file_1]").click();

}
// var fotocliente1="";
// var extcliente1="";
// var fotocliente2="";
// var extcliente2="";
function readFileCliente(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 2000000){
ver_vetana_informativa("EL ARCHIVO NO PUEDE EXCEDER LOS 2Mb")
return false
}

var URL="C:\\Publicidad\\"+filename;
document.getElementById("inptRutaArchivoClientesInactivos").value=URL
document.getElementById("inptRutaArchivoClientesInactivos").style.background="#efe19e"

}


function EnviarSms(){
	var linkArchivo=document.getElementById("inptRutaArchivoClientesInactivos").value
	var SmsEnviar=document.getElementById("inptDescripcionLicitacion").value
	var nro="";
var pagina="";
var codigo="595";

	$("tr[name=trEnviosms]").each(function(i, elementohtml){
		codigo="595";
		 nro=$(elementohtml).children('td[id="td_nro"]').html();
		if(nro!="" && nro!="0" && nro!=undefined){
			
			nro=nro.replace(" ","");
			
			var condicion=nro.charAt(0);
			
			if(condicion=="+" || condicion=="3" || condicion=="5"){
				codigo="";
			}else {
				nro = nro.substring(1);
			}
			
			pagina+="<table ><tr >"
			+"<td  id='td_id'>"+codigo+nro+"</td>"
			+"<td  style='width:20%'>"+linkArchivo+"</td>"
			+"<td  style='width:20%'>"+SmsEnviar+"</td>"
			+"</tr></table>"
		}

	   });
	   
	  
	   
	   
	
  var aux = document.createElement("input");
  aux.setAttribute("value", pagina);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ver_vetana_informativa("MENSAJE GENERADO CON EXITO FAVOR PEGAR EN EL ARCHIVO EXCEL")
 	
}


function checkestadoClientesSms(d){
	if(d=="1"){
	document.getElementById('inptSeleccSMS1').checked=true
		document.getElementById('inptSeleccSMS2').checked=false	
	}else{
		
		document.getElementById('inptSeleccSMS1').checked=false
		document.getElementById('inptSeleccSMS2').checked=true
	}
}






function verCerrarInformeClieteImpago(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divClienteImpago").style.display==""){
		document.getElementById("divMinimizadoInformeClienteImpago").style.display="none"
		limpiarcamposbuscadorInformePagosEliminados()
 
	$("div[id=divClienteImpago]").fadeOut(500);			
	}else{	
if(controlacceso("VERINFORMECLIENTEIMPAGO","accion")==false){return;}
mostrarSoloUno("divClienteImpago")	
		document.getElementById("divClienteImpago").style.display=""
		  
	}
}


function minimizarInformeClieteImpago(){
 
	$("div[id=divClienteImpago]").fadeOut(500);	
	document.getElementById("divMinimizadoInformeClienteImpago").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuClieteImpago"));
}



var Contenidomensaje ="";


function buscarcuentaImpago2() {

	 var filtro= document.getElementById("inputSelectTipoBuscarMoroso").value
	 var buscar= document.getElementById("inptBuscarInfClienteMoroso").value
	 var zona= document.getElementById("inptZonaMoroso").value
	 var Local= document.getElementById("inptlocalMoroso").value
   
	document.getElementById("table_Cliente_Moroso").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoCliente_orosos").value =""
	document.getElementById("inptTotalDeudaMorosos").value =""
	obtener_datos_user();
	var datos = {
			"useru": userid,
			"passu": passuser,
			"navegador": navegador,
			"buscar": buscar,
			"filtro": filtro,
			"zona": zona,
			"Local": Local,
			"funt": "cuentasMoroso"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Cliente_Moroso").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
			console.log(Respuesta)
			document.getElementById("table_Cliente_Moroso").innerHTML = ''
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("table_Cliente_Moroso").innerHTML = datos_buscados
					
					document.getElementById("inptTotalRegistoCliente_orosos").value = datos[3];
					document.getElementById("inptTotalDeudaMorosos").value = datos[4];
					document.getElementById("inptDeudaMorosos").value = datos[6];
					
					Contenidomensaje=datos[7]
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
			}
	});
}


function copiarAlPortapapelesImpago() {
  var aux = document.createElement("input");
  aux.setAttribute("value", Contenidomensaje);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  ver_vetana_informativa("MENSAJE GENERADO CON EXITO FAVOR PEGAR EN EL ARCHIVO EXCEL")
}




var listadoVistaProductoPresupuesto = null;
function iniciarListadoVistaProductoPresupuesto() {
	if (listadoVistaProductoPresupuesto) return listadoVistaProductoPresupuesto;
	if (typeof window.crearListadoVistaProductos !== "function") return null;
	listadoVistaProductoPresupuesto = window.crearListadoVistaProductos({
		nombre: "vista_producto_presupuesto",
		idCuerpo: "table_vista_producto_Presupuesto",
		idCabecera: "cabeceraVistaProductoPresupuesto",
		funcionSeleccion: "obtenerdatosvistaproductodesdePresupuesto",
		campoPrecioTecnico: "precio_contado_formateado",
		columnas: [
			{ campo: "codigo_barra", titulo: "COD.", ancho: "12%" },
			{ campo: "producto", titulo: "PRODUCTO", ancho: "20%", id: "td_datos_1" },
			{ campo: "marca", titulo: "MARCA", ancho: "10%" },
			{ campo: "precio_contado", titulo: "PRECIO", ancho: "10%", id: "td_datos_precio_contado", valor: function (r) { return r.precio_contado_formateado; } },
			{ campo: "stock", titulo: "STOCK", ancho: "10%", id: "td_datos_6", valor: function (r) { return r.stock; } }
		]
	});
	return listadoVistaProductoPresupuesto;
}
function buscarvistaproductoPresupuesto() {
	var buscador = document.getElementById('inptProductoPresupuesto').value
	document.getElementById("table_vista_producto_Presupuesto").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"local": cod_localFKUSer,
		"formato": "json",
		"funt": "buscarpresupuesto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_producto_Presupuesto").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_producto_Presupuesto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				var hayRegistros = Array.isArray(datos_buscados) ? datos_buscados.length > 0 : datos_buscados != "";
				if(hayRegistros){
				var listado = iniciarListadoVistaProductoPresupuesto();
				if (listado && Array.isArray(datos_buscados)) listado.establecerRegistros(datos_buscados);
				else document.getElementById("table_vista_producto_Presupuesto").innerHTML = datos_buscados || "";
				
	
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






function obtenerdatosvistaproductodesdePresupuesto(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'

		idFkProducto = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCodigoPresupuesto').value = $(datostr).children('td[id="td_datos_13"]').html();
		document.getElementById('inptProductoPresupuesto').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inpTSeleccCostoPresupuesto').innerHTML = $(datostr).children('td[id="td_datos_11"]').html();
		document.getElementById('inptCantidadPresupuesto').value = "1";
		document.getElementById('inptPrecioPresupuesto').value = $(datostr).children('td[id="td_datos_4"]').html();
		document.getElementById('inptCantidadPresupuesto').focus();
		calcularTotalPresupuesto(document.getElementById('inptPrecioPresupuesto'))
		
}


function calcularTotalPresupuesto(datos) {
	separadordemiles(datos)
	calcular_total_Presupuesto()
}
function calcular_total_Presupuesto() {
	var c = QuitarSeparadorMilValor(document.getElementById('inptCantidadPresupuesto').value);
	var t = QuitarSeparadorMilValor(document.getElementById('inptPrecioPresupuesto').value);
	if (isNaN(c)) {
		document.getElementById('inptPrecioPresupuesto').value = 0;
		c = 0;
	}

	var c = parseFloat(c);
	var t = parseFloat(t);
	document.getElementById('inptTotalPresupuesto').value = (t * c);
	separadordemiles(document.getElementById('inptPrecioPresupuesto'))
	separadordemiles(document.getElementById('inptTotalPresupuesto'))
	separadordemiles(document.getElementById('inptTOTALPresupuesto'))	

	
}

function seleccionarpreciospresupuesto(datos) {
	document.getElementById("inptPrecioPresupuesto").value = datos.value
	calcular_total_Presupuesto();
}
 
 
/* ===========================
   ARRAY GLOBAL DEL PRESUPUESTO
=========================== */
var detallesPresupuesto = [];

/* ===========================
   FUNCIONES AUXILIARES
=========================== */
function limpiarNumero(valor) {
    if (valor == null || valor == undefined) return 0;

    valor = String(valor)
        .replace(/\./g, '')   // quita separador de miles
        .replace(/,/g, '')    // por si acaso
        .replace(/\s+/g, '')
        .trim();

    var numero = parseFloat(valor);
    return isNaN(numero) ? 0 : numero;
}

function formatearMiles(numero) {
    numero = parseInt(numero, 10);
    if (isNaN(numero)) numero = 0;
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function obtenerTextoSelect(idSelect) {
    var select = document.getElementById(idSelect);
    if (!select || select.selectedIndex < 0) return "";
    return select.options[select.selectedIndex].text;
}

/* ===========================
   CALCULAR TOTAL DEL ITEM
=========================== */
function calcular_total_Presupuesto() {
    var precio     = limpiarNumero(document.getElementById("inptPrecioPresupuesto").value);
    var descuento  = limpiarNumero(document.getElementById("inptDescuentoPresupuesto").value);
    var cantidad   = limpiarNumero(document.getElementById("inptCantidadPresupuesto").value);

    var subtotal = (precio * cantidad) - descuento;

    if (subtotal < 0) {
        subtotal = 0;
    }

    document.getElementById("inptTotalPresupuesto").value = formatearMiles(subtotal);
}

/* ===========================
   AGREGAR ITEM AL PRESUPUESTO
=========================== */
function anhadirPrPresupuesto() {
    var codigo      = document.getElementById("inptCodigoPresupuesto").value.trim();
    var producto    = document.getElementById("inptProductoPresupuesto").value.trim();
    var precioTxt   = document.getElementById("inptPrecioPresupuesto").value.trim();
    var descuentoTxt= document.getElementById("inptDescuentoPresupuesto").value.trim();
    var cantidadTxt = document.getElementById("inptCantidadPresupuesto").value.trim();
    var totalTxt    = document.getElementById("inptTotalPresupuesto").value.trim();

    var precio      = limpiarNumero(precioTxt);
    var descuento   = limpiarNumero(descuentoTxt);
    var cantidad    = limpiarNumero(cantidadTxt);
    var subtotal    = limpiarNumero(totalTxt);

    /* Si tenés marca/modelo cargados desde otro lado, acá podés reemplazar */
    var marca  = "";
    var modelo = "";

    if (codigo === "") {
        alert("Debe seleccionar o cargar un código.");
        return false;
    }

    if (producto === "") {
        alert("Debe ingresar un producto.");
        return false;
    }

    if (precio <= 0) {
        alert("El precio debe ser mayor a 0.");
        return false;
    }

    if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0.");
        return false;
    }

    if (subtotal <= 0) {
        subtotal = (precio * cantidad) - descuento;
        if (subtotal < 0) subtotal = 0;
    }

    /* Si el producto ya existe, suma cantidad */
    var encontrado = false;
    for (var i = 0; i < detallesPresupuesto.length; i++) {
        if (detallesPresupuesto[i].codigo === codigo) {
            detallesPresupuesto[i].cantidad   = parseInt(detallesPresupuesto[i].cantidad, 10) + parseInt(cantidad, 10);
            detallesPresupuesto[i].descuento  = limpiarNumero(detallesPresupuesto[i].descuento) + descuento;
            detallesPresupuesto[i].subtotal   = (limpiarNumero(detallesPresupuesto[i].precio) * limpiarNumero(detallesPresupuesto[i].cantidad)) - limpiarNumero(detallesPresupuesto[i].descuento);

            if (detallesPresupuesto[i].subtotal < 0) {
                detallesPresupuesto[i].subtotal = 0;
            }

            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        detallesPresupuesto.push({
            codigo: codigo,
            producto: producto,
            marca: marca,
            modelo: modelo,
            cantidad: cantidad,
            precio: precio,
            descuento: descuento,
            subtotal: subtotal
        });
    }

    renderizarTablaPresupuesto();
    actualizarTotalGeneralPresupuesto();
    limpiarCamposDetallePresupuesto();

    return true;
}

/* ===========================
   RENDER DE LA TABLA
=========================== */
function renderizarTablaPresupuesto() {
    var contenedor = document.getElementById("table_vista_producto_presupuesto");
    var html = "";

    html += "<table style='width:100%;border-collapse:collapse;' class='tableRegistroSearch'>";
    html += "<tbody>";

    if (detallesPresupuesto.length === 0) {
        html += "<tr>";
        html += "<td colspan='9' style='text-align:center;padding:20px;' class='td_registro'>No hay productos agregados</td>";
        html += "</tr>";
    } else {
        for (var i = 0; i < detallesPresupuesto.length; i++) {
            html += "<tr onclick='eliminarDetallePresupuesto(" + i + ")' >";
            html += "<td  style='width:10%;text-align:center;'>" + detallesPresupuesto[i].codigo + "</td>";
            html += "<td  style='width:40%;text-align:left;'>" + detallesPresupuesto[i].producto + "</td>";
            html += "<td  style='width:10%;text-align:center;'>" + formatearMiles(detallesPresupuesto[i].cantidad) + "</td>";
            html += "<td  style='width:15%;text-align:right;'>" + formatearMiles(detallesPresupuesto[i].precio) + "</td>";
            html += "<td  style='width:10%;text-align:right;'>" + formatearMiles(detallesPresupuesto[i].descuento) + "</td>";
            html += "<td  style='width:15%;text-align:right;'>" + formatearMiles(detallesPresupuesto[i].subtotal) + "</td>";
            html += "</tr>";
        }
    }

    html += "</tbody>";
    html += "</table>";

    contenedor.innerHTML = html;
}

/* ===========================
   ELIMINAR FILA
=========================== */
function eliminarDetallePresupuesto(indice) {
    if (indice < 0 || indice >= detallesPresupuesto.length) return;

    if (confirm("¿Desea eliminar este producto del presupuesto?")) {
        detallesPresupuesto.splice(indice, 1);
        renderizarTablaPresupuesto();
        actualizarTotalGeneralPresupuesto();
    }
}

/* ===========================
   TOTAL GENERAL
=========================== */
function actualizarTotalGeneralPresupuesto() {
    var total = 0;

    for (var i = 0; i < detallesPresupuesto.length; i++) {
        total += limpiarNumero(detallesPresupuesto[i].subtotal);
    }

    document.getElementById("inptTOTALPresupuesto").value = formatearMiles(total);
}

/* ===========================
   LIMPIAR CAMPOS DEL ITEM
=========================== */
function limpiarCamposDetallePresupuesto() {
    document.getElementById("inptCodigoPresupuesto").value = "";
    document.getElementById("inptProductoPresupuesto").value = "";
    document.getElementById("inptPrecioPresupuesto").value = "";
    document.getElementById("inptDescuentoPresupuesto").value = "";
    document.getElementById("inptCantidadPresupuesto").value = "";
    document.getElementById("inptTotalPresupuesto").value = "";
    document.getElementById("inptProductoPresupuesto").focus();
}

/* ===========================
   LIMPIAR TODO EL PRESUPUESTO
=========================== */
function limpirarPresupuesto() {
    if (confirm("¿Desea limpiar todo el presupuesto?")) {
        detallesPresupuesto = [];
        limpiarCamposDetallePresupuesto();
        renderizarTablaPresupuesto();
        actualizarTotalGeneralPresupuesto();

        document.getElementById("inptEntregaPresupuesto").value = "";
        document.getElementById("inptClientePresupuesto").value = "";
    }
}

/* ===========================
   INICIALIZAR TABLA VACÍA
=========================== */
 
    
 
var telefonoPresupuesto="";
var rucPresupuesto="";
 
var contadoprecio=""


function addprecio() {
	
	//Este toque el precio favor verificar si se va a tocar
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "nuevoTablaDetallePrecio")
	datos.append("cod_producto", idAbmProducto)
	datos.append("contado", contadoprecio)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
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
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}


function iraUrlProducto(){
	if(linkPagina!=""){
	 window.open(linkPagina)
	}
}



function EditarPrecioListaCompra(){
	if(document.getElementById('inptSeleccCambiarPrecio').checked==true){
		document.getElementById('inptprecioListaProductoCompra').style.background="#4caf50"
		document.getElementById('inptprecioListaProductoCompra').style.color="#ffffff"
		
		/* document.getElementById('inptprecioListaProductoCompra').readOnly='' */
		document.getElementById('inptprecioListaProductoCompra').disabled=''
	}else{
		document.getElementById('inptprecioListaProductoCompra').style.background="#eaeaea"
		document.getElementById('inptprecioListaProductoCompra').style.color=""
		/* document.getElementById('inptprecioListaProductoCompra').readOnly='false' */
		document.getElementById('inptprecioListaProductoCompra').disabled='true'
	}
	
}



