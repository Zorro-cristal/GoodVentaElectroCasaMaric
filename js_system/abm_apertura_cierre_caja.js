/*
ABM APERTURA CIERRE CAJA
*/
var listadoVistaAperturaCierreCaja=null;
function iniciarListadoVistaAperturaCierreCaja(){
	if(listadoVistaAperturaCierreCaja || !window.AbmListadoCore){return listadoVistaAperturaCierreCaja;}
	var cuerpo=document.getElementById("table_vista_ap_cie");
	if(!cuerpo){return null;}
	var tablaFiltros=cuerpo.previousElementSibling;
	var cabecera=tablaFiltros ? tablaFiltros.previousElementSibling : null;
	if(!cabecera || cabecera.tagName!=="TABLE"){return null;}
	cabecera.id="cabeceraVistaAperturaCierreCaja";
	listadoVistaAperturaCierreCaja=window.AbmListadoCore.crear({
		nombre:"vista_apertura_cierre_caja",
		idCabecera:"cabeceraVistaAperturaCierreCaja",
		idCuerpo:"table_vista_ap_cie",
		columnas:[
			{campo:"caja",titulo:"CAJA",ancho:"5%"},
			{campo:"estado",titulo:"ESTADO",ancho:"10%"},
			{campo:"fecha_apertura",titulo:"FECHA APERT.",ancho:"10%"},
			{campo:"fecha_cierre",titulo:"FECHA CIERRE",ancho:"10%"},
			{campo:"monto_apertura",titulo:"MONTO APERT.",ancho:"10%"},
			{campo:"monto_cierre",titulo:"MONTO CIERRE",ancho:"10%"},
			{campo:"egresos",titulo:"EGRESOS.",ancho:"10%"},
			{campo:"diferencia",titulo:"DIF.",ancho:"10%"},
			{campo:"usuario_apertura",titulo:"USUARIO",ancho:"15%"},
			{campo:"local",titulo:"LOCAL",ancho:"10%"}
		],
		fila:{
			funcionSeleccion:"obtenerdatosaperturacierrecaja",
			celdas:[
				{id:"td_id_1",campo:"id_arqueo",tecnica:true},
				{id:"td_id_2",campo:"id_caja",tecnica:true},
				{id:"td_id_3",campo:"cod_usuario_apertura",tecnica:true},
				{id:"td_id_4",campo:"cod_usuario_cierre",tecnica:true},
				{id:"td_id_5",campo:"cod_local",tecnica:true},
				{id:"td_datos_2",campo:"local",tecnica:true},
				{id:"td_datos_1",campo:"caja",columna:"caja"},
				{id:"td_datos_9",campo:"estado",columna:"estado"},
				{id:"td_datos_3",campo:"fecha_apertura_formateada",tecnica:true},
				{id:"td_datos_4",campo:"fecha_cierre_formateada",tecnica:true},
				{campo:"fecha_apertura_formateada",columna:"fecha_apertura"},
				{campo:"fecha_cierre_formateada",columna:"fecha_cierre"},
				{id:"td_datos_7",campo:"monto_apertura_formateado",columna:"monto_apertura"},
				{id:"td_datos_8",campo:"monto_cierre_formateado",columna:"monto_cierre"},
				{campo:"egresos_formateado",columna:"egresos"},
				{campo:"diferencia_formateada",columna:"diferencia"},
				{id:"td_datos_5",campo:"usuario_apertura",columna:"usuario_apertura"},
				{id:"td_datos_2",campo:"local",columna:"local"},
				{id:"td_datos_6",campo:"usuario_cierre",tecnica:true}
			]
		}
	});
	listadoVistaAperturaCierreCaja.iniciar();
	return listadoVistaAperturaCierreCaja;
}
function verCerrarVentanaAbmAperturaCierreCaja(){
	if(document.getElementById("divAbmAperturaCierreCaja").style.display==""){
		 
	$("div[id=divAbmAperturaCierreCaja]").fadeOut(500);	
		
	}else{	
      if(controlacceso(controlaperturacierrecaja,"accion")==false){
			//SIN PERMISO
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
	var hora = f.getHours()
	if (hora < 10) {
		hora = "0" + hora;
	}
    var minuto = f.getMinutes()
	if (minuto < 10) {
		minuto = "0" + minuto;
	}
    var segundo = f.getSeconds()
	if (segundo < 10) {
		segundo = "0" + segundo;
	}
     
	  if(controlaperturacierrecaja!="ABRIRCERRARCAJA"){
	  document.getElementById('inptFechaCierreAperturaCierreCaja').value =  anho+"-" + mes + "-" +dia +"T"+hora+":"+minuto;
	  }else{
		  document.getElementById('inptFechaAperturaCierreCaja').value =  anho+"-" + mes + "-" +dia +"T"+hora+":"+minuto;
	  }		
		document.getElementById("divAbmAperturaCierreCaja").style.display=""
		  
		document.getElementById("imgVolverCerrarApCieCaja").style.display=""
		document.getElementById("imgVolverAtrasApCieCaja").style.display="none"
		 buscartotalmovimientos()
		
		
	}
}
function verCerrarVentanaAbmAperturaCierreCaja1(){
	if(document.getElementById("divAbmAperturaCierreCaja").style.display==""){
		//document.getElementById("divAbmAperturaCierreCaja").style.display="none"
		 
	$("div[id=divAbmAperturaCierreCaja]").fadeOut(500);	
	}else{		
	if(controlacceso(controlaperturacierrecaja,"accion")==false){
			//SIN PERMISO
	  return;
		}
		document.getElementById("divAbmAperturaCierreCaja").style.display=""
		  
		document.getElementById("imgVolverCerrarApCieCaja").style.display="none"
		document.getElementById("imgVolverAtrasApCieCaja").style.display=""
	
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
	var hora = f.getHours()
	if (hora < 10) {
		hora = "0" + hora;
	}
    var minuto = f.getMinutes()
	if (minuto < 10) {
		minuto = "0" + minuto;
	}
    var segundo = f.getSeconds()
	if (segundo < 10) {
		segundo = "0" + segundo;
	}
     
	  if(controlaperturacierrecaja!="ABRIRCERRARCAJA"){
	  document.getElementById('inptFechaCierreAperturaCierreCaja').value =  anho+"-" + mes + "-" +dia +"T"+hora+":"+minuto;
		  
	  }else{
		  document.getElementById('inptFechaAperturaCierreCaja').value =  anho+"-" + mes + "-" +dia +"T"+hora+":"+minuto;
		  
	  }		
		
	}
}
var controlaperturacierrecaja="ABRIRCERRARCAJA";
var codCajeroapertura="";
function controldecaja() {
	var caja = document.getElementById('inptcajaAperturaCierreCaja').value
	var codlocal = document.getElementById('inptlocalAperturaCierre').value
	document.getElementById('PTituloApCieCaja').innerHTML="Cargando datos de caja...";
	document.getElementById('btnAbmAperturaCierreCaja').value="Cargando...";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_local": codlocal,
		"buscar": caja,
		"Usuario": userid,
		"funt": "controldecaja"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
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
					if(datos[2]=="1"){
						document.getElementById("inptEstadoAperturaCierreCaja").value="Cerrado"
						document.getElementById('inptMontoCierreCierreCaja').disabled=false
						document.getElementById('inptFechaCierreAperturaCierreCaja').disabled=true
						document.getElementById('inptFechaAperturaCierreCaja').disabled=true
						document.getElementById('inptMontoAperturaCierreCaja').disabled=true						
						idabmAperturacierrecaja=datos[3];
						$("input[id=inptFechaAperturaCierreCaja]").attr("type","text")
						document.getElementById('inptFechaAperturaCierreCaja').value=datos[7];
						document.getElementById('inptMontoAperturaCierreCaja').value=datos[5];
						document.getElementById('inptMontoRecaudadoCierreCaja').value=datos[10];
						document.getElementById('inptcajeroAperturaCierreCaja').value=datos[12];
						codCajeroapertura=datos[11];
						document.getElementById('btnAbmAperturaCierreCaja').value="Cerrar caja";
						document.getElementById('PTituloApCieCaja').innerHTML="Cerrar caja";
                        controlaperturacierrecaja="CERRARCERRARCAJA"						
					}else{
						document.getElementById("inptEstadoAperturaCierreCaja").value="Activo"
						document.getElementById('inptMontoCierreCierreCaja').disabled=true
						document.getElementById('inptFechaCierreAperturaCierreCaja').disabled=true
						document.getElementById('inptFechaAperturaCierreCaja').disabled=true
						document.getElementById('inptMontoAperturaCierreCaja').disabled=false
						if(accesosuser["CAMBIARMONTOAPERTURA"]["accion"]=="NO"){
						document.getElementById('inptMontoAperturaCierreCaja').disabled=true
						}
						document.getElementById('inptMontoAperturaCierreCaja').value=datos[3];
						document.getElementById('inptFechaCierreAperturaCierreCaja').value="";
						$("input[id=inptFechaAperturaCierreCaja]").attr("type","datetime-local")
						document.getElementById('inptMontoCierreCierreCaja').value="0";
						document.getElementById('inptMontoRecaudadoCierreCaja').value="0";
						document.getElementById('inptcajeroAperturaCierreCaja').value=document.getElementById("lblUser").innerHTML;
						 controlaperturacierrecaja="ABRIRCERRARCAJA"	
						 codCajeroapertura=userid
						 document.getElementById('btnAbmAperturaCierreCaja').value="Iniciar caja";
						 document.getElementById('PTituloApCieCaja').innerHTML="Apertura de caja";
						 idabmAperturacierrecaja="";
						 
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
						var hora = f.getHours()
						if (hora < 10) {
							hora = "0" + hora;
						}
						var minuto = f.getMinutes()
						if (minuto < 10) {
							minuto = "0" + minuto;
						}
						var segundo = f.getSeconds()
						if (segundo < 10) {
							segundo = "0" + segundo;
						}
     

						document.getElementById('inptFechaAperturaCierreCaja').value =  anho+"-" + mes + "-" +dia +"T"+hora+":"+minuto;
						
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
function buscartotalmovimientos() {
	if(idabmAperturacierrecaja==""){
		return
	}
	document.getElementById('inptMontoRecaudadoCierreCaja').value="...."
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idArqeoFk": idabmAperturacierrecaja,
		"funt": "buscarmoviemientocaja"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
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
				
				  document.getElementById('inptMontoRecaudadoCierreCaja').value=datos[2];
				  DetalleticketCaja=datos[3];
						
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var idabmAperturacierrecaja="";
function verificarcamposaperturacierredecaja() {
	
	var movimiento = document.getElementById("inptMontoRecaudadoCierreCaja").value
	if(movimiento=="...." || movimiento==""){
		return;
	}
	
	//var inptlocalAperturaCierre = document.getElementById('inptlocalAperturaCierre').value
	var inptlocalAperturaCierre = cod_localFKUSer
	var inptcajaAperturaCierreCaja = document.getElementById('inptcajaAperturaCierreCaja').value
	var inptMontoAperturaCierreCaja = document.getElementById('inptMontoAperturaCierreCaja').value
	var inptFechaAperturaCierreCaja = document.getElementById('inptFechaAperturaCierreCaja').value
	var inptFechaCierreAperturaCierreCaja = document.getElementById('inptFechaCierreAperturaCierreCaja').value
	var inptMontoCierreCierreCaja = document.getElementById('inptMontoCierreCierreCaja').value
	var inptEstadoAperturaCierreCaja = document.getElementById('inptEstadoAperturaCierreCaja').value
	if (inptlocalAperturaCierre == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN LOCAL")
		return false;
	}
	if (codCajeroapertura == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN COBRADOR")
		return false;
	}

  if(controlacceso(controlaperturacierrecaja,"accion")==false){
			//SIN PERMISO
	  return;
		}
  
	var accion = "";
	if (idabmAperturacierrecaja != "") {
		accion = "editar";
		if(inptMontoCierreCierreCaja==""){
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DE CIERRE")
		return false;
		}
		if(inptFechaCierreAperturaCierreCaja==""){
			
			ver_vetana_informativa("FALTO INGRESAR EL MONTO APERTURA")
		return false;
		}
		
		
			
	} else {
		accion = "nuevo";
		if(inptMontoAperturaCierreCaja==""){
			ver_vetana_informativa("FALTO INGRESAR EL MONTO APERTURA")
		return false;
		}
		
		if(inptFechaAperturaCierreCaja==""){
			ver_vetana_informativa("FALTO SELECCIONAR LA APERTURA")
		return false;
		}
	}
	abmaperturacierrecaja(codCajeroapertura,inptlocalAperturaCierre, inptcajaAperturaCierreCaja, inptMontoAperturaCierreCaja,inptFechaAperturaCierreCaja,inptMontoCierreCierreCaja,inptFechaCierreAperturaCierreCaja,inptEstadoAperturaCierreCaja,idabmAperturacierrecaja, accion);
}
function abmaperturacierrecaja(codusuarioap,cod_local, caja_idcaja, montoapertura,fechaapertura,montocierre,fechacierre,estado,idarqueocaja, accion){
verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idarqueocaja", idarqueocaja)
	datos.append("cod_local", cod_local)
	datos.append("caja_idcaja", caja_idcaja)
	datos.append("montoapertura", montoapertura)
	datos.append("montocierre", montocierre)
	datos.append("fechaapertura", fechaapertura)
	datos.append("fechacierre", fechacierre)
	datos.append("estado", estado)
	datos.append("codusuarioap", codusuarioap)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
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
					if(estado=="Activo"){
					 ImprimirTicketReportCaja()
					}else{
						ImprimirTicketReportCierreCaja()
					}
					controldecaja()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

}
function vercerraropcioneimpresionapcie(d,v){
	if(d=="1"){
		document.getElementById("divOpcionesImpresionArpeturacierre").style.display=""
	}else{
		document.getElementById("divOpcionesImpresionArpeturacierre").style.display="none"
	}
}
function vercerrarvistaapcie(d,v){
	if(d=="1"){
		document.getElementById("divVistaArqueocierrecaja").style.display=""
		//  
	}else{
		//document.getElementById("divVistaArqueocierrecaja").style.display="none"
		//  
$("div[id=divVistaArqueocierrecaja]").fadeOut(500);	
	}
}

function vercerrarfiltrosBuscarVistaAperturaCierre(d,v){
	if(d=="1"){
		document.getElementById("divFiltrosAperturaCierreCaja").style.display=""
	
		if(v=="1"){
			bloquearBuscarVistaAperturaCaja("1")
		}
		if(v=="2"){
			bloquearBuscarVistaAperturaCaja("2")
		}
	}else{
		document.getElementById("divFiltrosAperturaCierreCaja").style.display="none"
	}
}

function buscarvistaaperturacierrecaja() {
	var listado=iniciarListadoVistaAperturaCierreCaja();
	var caja = document.getElementById('inptBuscarVistaCaja1').value
	var estado = document.getElementById('inptBuscarVistaCajaSistema2').value
	var local = document.getElementById('inptlocalVistaApCie').value
	var fechaapertura = document.getElementById('inptBuscarVistaCaja3').value
	var fechafin = document.getElementById('inptBuscarVistaCaja4').value
	var usuario = document.getElementById('inptBuscarVistaCaja5').value
	
	
	document.getElementById("inptTotalAperturaArqueocierrecaja").value = ""
	document.getElementById("inptTotalCierreArqueocierrecaja").value = ""
	document.getElementById("inptCobradoArqueocierrecaja").value = ''
	document.getElementById("inptTotalIngresoArqueocierrecaja").value = ''
	document.getElementById("inptTotalEgresoArqueocierrecaja").value = ''
	document.getElementById("inptTotalDiferenciaArqueocierrecaja").value = ''
	
	vercerrarfiltrosBuscarVistaAperturaCierre("2","2")
	document.getElementById("table_vista_ap_cie").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"caja": caja,
		"estado": estado,
		"local": local,
		"fechaapertura": fechaapertura,
		"fechafin": fechafin,
		"usuario": usuario,
		"formato": "json",
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmaperturacierrecaja.php",
		type: "post",
		 
		
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_ap_cie").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_ap_cie").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
                Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
					document.getElementById("inptTotalAperturaArqueocierrecaja").value = datos[5];
					document.getElementById("inptTotalCierreArqueocierrecaja").value = datos[6];
					
					document.getElementById("inptCobradoArqueocierrecaja").value = datos[9];
					document.getElementById("inptTotalIngresoArqueocierrecaja").value = datos[7];
					document.getElementById("inptTotalEgresoArqueocierrecaja").value = datos[8];
					document.getElementById("inptTotalDiferenciaArqueocierrecaja").value = datos[4];
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if(document.readyState==="loading"){
	document.addEventListener("DOMContentLoaded",iniciarListadoVistaAperturaCierreCaja);
}else{
	iniciarListadoVistaAperturaCierreCaja();
}
var idArqeoFk="";
function obtenerdatosaperturacierrecaja(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptBuscarVistaApCie1').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptBuscarVistaApCie2').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptBuscarVistaApCie3').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptBuscarVistaApCie4').value = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptBuscarVistaApCie5').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptBuscarVistaApCie6').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptBuscarVistaApCie7').value = $(datostr).children('td[id="td_datos_9"]').html();
	idArqeoFk = $(datostr).children('td[id="td_id_1"]').html();
	buscarinformecaja()
	document.getElementById("divVistaArqueocierrecaja").style.display="none"
}
function ImprimirTicketDeCaja(){
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
if(idabmAperturacierrecaja==""){
	ver_vetana_informativa("NO TIENES UNA CAJA ABIERTA")
		return
	}
pagina="<div  style='background-color:#fff;'>"
+"<center>"
+"<div class='divTicket' >"
+"<p class='pTituloTicket1' >REPORTE DE CAJA</p>"
+"<div class='divSeparadorTicket' style='margin-bottom:5px'></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Imp.:</b></td>"
+"<td style=''>"+f.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Local:</b></td>"
+"<td style=''>"+ $("select[id=inptlocalAperturaCierre]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Caja:</b></td>"
+"<td style=''>"+ $("select[id=inptcajaAperturaCierreCaja]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Inicio :</b></td>"
+"<td style=''>"+ document.getElementById("inptFechaAperturaCierreCaja").value+"</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto Inicio:</b></td>"
+"<td style=''>"+document.getElementById("inptMontoAperturaCierreCaja").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Total en caja:</b></td>"
+"<td style=''>"+document.getElementById("inptMontoRecaudadoCierreCaja").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:75%'><b>Descripción</b></td>"
+"<td style='width:25%'><b>Monto</b></td>"
+"</tr>"
+"</table>"
+DetalleticketCaja
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
//buscarDatosVentaticket(idabmVenta)
     
}

function ImprimirTicketReportCaja(){
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
pagina="<div  style='background-color:#fff;'>"
+"<center>"
+"<div class='divTicket' >"
+"<p class='pTituloTicket1' >REPORTE DE CAJA</p>"
+"<div class='divSeparadorTicket' style='margin-bottom:5px'></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Imp.:</b></td>"
+"<td style=''>"+f.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Local:</b></td>"
+"<td style=''>"+ $("select[id=inptlocalAperturaCierre]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Caja:</b></td>"
+"<td style=''>"+ $("select[id=inptcajaAperturaCierreCaja]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Inicio :</b></td>"
+"<td style=''>"+ document.getElementById("inptFechaAperturaCierreCaja").value+"</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto Inicio:</b></td>"
+"<td style=''>"+document.getElementById("inptMontoAperturaCierreCaja").value+" Gs.</td>"
+"</tr>"
+"</table>"
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
//buscarDatosVentaticket(idabmVenta)
     
}

function ImprimirTicketDespacho(){
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
pagina="<div  style='background-color:#fff;'>"
+"<div class='divTicket' >"
+"<p class='pTituloTicket1' >DESPACHO DE PRODUCTO</p>"
+"<div class='divSeparadorTicket' style='margin-bottom:5px'></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Imp.:</b></td>"
+"<td style=''>"+f.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Producto :</b></td>"
+"<td style=''>"+ document.getElementById("inptNombreProducto").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:150px'><b>Enviado de (Local):</b></td>"
+"<td style=''>"+ $("select[id=inptlocalProducto]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:150px'><b>Enviado a (Local):</b></td>"
+"<td style=''>"+ $("select[id=inptLocalProductoEnviarA]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Stock :</b></td>"
+"<td style=''>"+ document.getElementById("inptStockProductoEnviarA").value+"</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Usuario Responsable :</b></td>"
+"<td style=''>"+document.getElementById("lblUser").innerHTML+"</td>"
+"</tr>"
+"</table>"
+"</div>"
+"</div>"


var ficha=pagina;
document.getElementById("DivImprimir").innerHTML=ficha;
   var documento= document.getElementById("DivImprimir").innerHTML;
     localStorage.setItem("reporte", documento);
	   localStorage.setItem("tipo", "ticket");
	 window.open("/GoodVentaElectroCasaMaric/system/reportTicket.html");
	 document.getElementById("DivImprimir").innerHTML = "";
//buscarDatosVentaticket(idabmVenta)
     
}

function ImprimirListadoDespacho(){
	
var pagina=""
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
  document.getElementById("divCabeceraImpresiones").innerHTML=""
document.getElementById("divPieImpresiones").innerHTML=""
document.getElementById("tbTitulosImpresiones").innerHTML=""
document.getElementById("tbDatosImpresiones").innerHTML=""
	pagina =
"<table class='TableRepor0' style='width:100%'>"
+"<tr>"
+"<td style='width:20%;text-align:left'>"
+"<p class='pTituloC'><b>Encargado</b></p>"
+"<p class='pTituloC' >"+document.getElementById("ptituloUser2").innerHTML+"</p>"
+"</td>"
+"<td style='width:20%;text-align:left'>"
+"<p class='pTituloC'><b>Local de Carga</b></p>"
+"<p class='pTituloC' >"+ $("select[id=inptlocaluser]").children(":selected").text()+"</p>"
+"</td>"
+"<td style='width:20%;text-align:left'>"
+"<p class='pTituloC'><b>Fecha de impresión</b></p>"
+"<p class='pTituloC' >"+fechaimpresion+"</p>"
+"</td>"
+"</tr>"
+"</table>"
+"<br><br><center><h1 class='pTituloD' >LISTADO DE PRODUCTOS DESPACHADOS</h1><br></center>"
+"<br><br><br><table style='width:100%'>"
+"<tr>"
+"<td style='width:40%;text-align:center'>"
+"<p class='pTituloC'><b>Firma del Responsable</b></p>"
+"</td>"
+"<td style='width:40%;text-align:center'>"
+"<p class='pTituloC'><b>Firma del Repositor</b></p>"
+"</td>"
+"</tr>"
+"</table><br><br><br>"
paginaPie =
"<br><br><table class='TableRepor0' style='width:100%'>"
+"<tr>"
+"<td style='width:20%;text-align:left'>"
+"<p class='pTituloC'><b>Total Registro</b></p>"
+"<p class='pTituloC' >"+ document.getElementById("inptRegistroNroListadoDespacho").value+"</p>"
+"</td>"
+"</tr>"
+"</table>"

document.getElementById("divCabeceraImpresiones").innerHTML=pagina
document.getElementById("divPieImpresiones").innerHTML=paginaPie
document.getElementById("tbTitulosImpresiones").innerHTML=document.getElementById("tdImpresionDespachadoZ").innerHTML
document.getElementById("tbDatosImpresiones").innerHTML=document.getElementById("table_abm_listado_despacho").innerHTML

	var documento=document.getElementById("DivImpresiones").innerHTML;

	 localStorage.setItem("reporte", documento);
	   localStorage.setItem("tipo", "reporte");
	 window.open("/GoodVentaElectroCasaMaric/system/reportInformes.html");

     
}

function ImprimirTicketReportCierreCaja(){
	

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
pagina="<div  style='background-color:#fff;'>"
+"<center>"
+"<div class='divTicket' >"
+"<p class='pTituloTicket1' >REPORTE DE CAJA</p>"
+"<div class='divSeparadorTicket' style='margin-bottom:5px'></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Imp.:</b></td>"
+"<td style=''>"+f.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Local:</b></td>"
+"<td style=''>"+ $("select[id=inptlocalAperturaCierre]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Caja:</b></td>"
+"<td style=''>"+ $("select[id=inptcajaAperturaCierreCaja]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Inicio :</b></td>"
+"<td style=''>"+ document.getElementById("inptFechaAperturaCierreCaja").value+"</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto Inicio:</b></td>"
+"<td style=''>"+document.getElementById("inptMontoAperturaCierreCaja").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto Cierre:</b></td>"
+"<td style=''>"+document.getElementById("inptMontoCierreCierreCaja").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Total en caja:</b></td>"
+"<td style=''>"+document.getElementById("inptMontoRecaudadoCierreCaja").value+" Gs.</td>"
+"</tr>"
+"</table>"
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
//buscarDatosVentaticket(idabmVenta)
     
}

function ImprimirTicketReportCaja2(){
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
pagina="<div  style='background-color:#fff;'>"
+"<center>"
+"<div class='divTicket' >"
+"<p class='pTituloTicket1' > RE-IMPRESION CAJA</p>"
+"<div class='divSeparadorTicket' style='margin-bottom:5px'></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Imp.:</b></td>"
+"<td style=''>"+f.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Local:</b></td>"
+"<td style=''>"+ $("select[id=inptlocalVistaApCie]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Caja:</b></td>"
+"<td style=''>"+ document.getElementById("inptBuscarVistaApCie1").value +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Apertura :</b></td>"
+"<td style=''>"+ document.getElementById("inptBuscarVistaApCie5").value+"</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto Apertura:</b></td>"
+"<td style=''>"+document.getElementById("inptBuscarVistaApCie3").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto Cierre:</b></td>"
+"<td style=''>"+document.getElementById("inptBuscarVistaApCie4").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Total en caja:</b></td>"
+"<td style=''>"+document.getElementById("inptTotalConsularCaja").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<div class='divSeparadorTicket' style='margin-top:5px;margin-bottom:5px' ></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Cajero :</b></td>"
+"<td style=''>"+document.getElementById("inptBuscarVistaApCie2").value+"</td>"
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
//buscarDatosVentaticket(idabmVenta)
     
}
