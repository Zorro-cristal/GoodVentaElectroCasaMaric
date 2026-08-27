/*
ABM GASTO
*/
var listadoAbmGasto=null;
function crearMotivoListadoGasto(registro){
	var fragmento=document.createDocumentFragment();
	var motivo=registro.motivo || "";
	var descripcion=registro.descripcion || "";
	if(registro.agrupado==="SI"){
		fragmento.appendChild(document.createTextNode(descripcion));
		return fragmento;
	}
	var marca=" | COMP. PAGO:";
	var posicion=motivo.indexOf(marca);
	if(posicion!==-1){
		fragmento.appendChild(document.createTextNode(motivo.substring(0,posicion)));
		fragmento.appendChild(document.createElement("br"));
		var referencia=document.createElement("strong");
		referencia.textContent=motivo.substring(posicion+3);
		fragmento.appendChild(referencia);
	}else if(motivo.indexOf("COMP. PAGO:")===0){
		var motivoDestacado=document.createElement("strong");
		motivoDestacado.textContent=motivo;
		fragmento.appendChild(motivoDestacado);
	}else{
		fragmento.appendChild(document.createTextNode(motivo));
	}
	fragmento.appendChild(document.createElement("br"));
	var detalle=document.createElement("strong");
	detalle.textContent=descripcion;
	fragmento.appendChild(detalle);
	return fragmento;
}
function crearTipoListadoGasto(registro){
	var fragmento=document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.tipo || ""));
	if(registro.fecha_deposito){
		fragmento.appendChild(document.createElement("br"));
		fragmento.appendChild(document.createTextNode(registro.fecha_deposito));
	}
	return fragmento;
}
function crearBotonFotoListadoGasto(registro){
	if(!registro.url){return "";}
	var boton=document.createElement("input");
	boton.type="button";
	boton.value="Ver";
	boton.className="btn4";
	boton.style.width="50px";
	boton.addEventListener("click",function(){
		window.setTimeout(function(){verCerrarVisorImagen("1","abmgastos");},0);
	});
	return boton;
}
function iniciarListadoAbmGasto(){
	if(listadoAbmGasto || !window.AbmListadoCore){return listadoAbmGasto;}
	if(!document.getElementById("table_abm_gasto") || !document.getElementById("tdTituloImpreGastos")){return null;}
	listadoAbmGasto=window.AbmListadoCore.crear({
		nombre:"gastos",
		idCabecera:"tdTituloImpreGastos",
		idCuerpo:"table_abm_gasto",
		columnas:[
			{campo:"id",titulo:"#",ancho:"5%"},
			{campo:"motivo_orden",titulo:"MOTIVO",ancho:"10%"},
			{campo:"monto",titulo:"MONTO",ancho:"5%"},
			{campo:"tipo",titulo:"TIPO",ancho:"5%"},
			{campo:"fecha",titulo:"FECHA",ancho:"10%"},
			{campo:"nro_boleta",titulo:"NRO BOLETA",ancho:"10%"},
			{campo:"local",titulo:"LOCAL",ancho:"10%"},
			{campo:"banco",titulo:"BANCO",ancho:"5%"},
			{campo:"cuenta",titulo:"CUENTA",ancho:"10%"},
			{campo:"arreglo",titulo:"ARREGLO",ancho:"5%"},
			{campo:"usuario",titulo:"USUARIO",ancho:"10%"},
			{campo:"confirmado",titulo:"CONFIRMADO",ancho:"5%"},
			{campo:"url",titulo:"FOTO",ancho:"5%"}
		],
		fila:{
			funcionSeleccion:"obtenerdatosabmGasto",
			atributosTabla:function(registro){
				return registro.confirmado==="SI" ? {style:{backgroundColor:"#09b26d",color:"#fff"}} : {};
			},
			celdas:[
				{id:"td_id",campo:"id",columna:"id",render:function(valor,registro,celda){celda.style.backgroundColor="#efeded";celda.style.color="red";return valor;}},
				{id:"td_datos_2",campo:"motivo_orden",columna:"motivo_orden",render:function(valor,registro){return crearMotivoListadoGasto(registro);}},
				{id:"td_datos_1",campo:"monto_formateado",columna:"monto"},
				{campo:"tipo",columna:"tipo",render:function(valor,registro){return crearTipoListadoGasto(registro);}},
				{id:"td_datos_6",campo:"tipo",tecnica:true},
				{id:"td_datos_3",campo:"fecha",tecnica:true},
				{campo:"fecha_formateada",columna:"fecha"},
				{id:"td_datos_14",campo:"nro_boleta",columna:"nro_boleta"},
				{campo:"local",columna:"local"},
				{campo:"banco",columna:"banco"},
				{id:"td_datos_9",campo:"cod_banco",tecnica:true},
				{id:"td_datos_10",campo:"cuenta",columna:"cuenta"},
				{id:"td_datos_11",campo:"arreglo",columna:"arreglo"},
				{id:"td_datos_8",campo:"usuario",columna:"usuario"},
				{campo:"confirmado",columna:"confirmado"},
				{campo:"url",columna:"url",render:function(valor,registro){return crearBotonFotoListadoGasto(registro);}},
				{id:"td_datos_5",campo:"estado",tecnica:true},
				{id:"td_datos_7",campo:"cod_local",tecnica:true},
				{campo:"cod_motivo",tecnica:true},
				{id:"td_datos_13",campo:"motivo",tecnica:true},
				{id:"td_datos_15",campo:"url",tecnica:true},
				{id:"td_datos_16",campo:"foto_url",tecnica:true},
				{id:"td_datos_17",campo:"foto_ext",tecnica:true},
				{id:"td_datos_18",campo:"fecha_deposito",tecnica:true},
				{id:"td_datos_12",campo:"descripcion",tecnica:true}
			]
		}
	});
	listadoAbmGasto.iniciar();
	return listadoAbmGasto;
}
function verCerrarAbmGasto(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmGastos").style.display==""){
	document.getElementById("divMinimizadoEgresoIngreso").style.display="none"
     //  
	$("div[id=divAbmGastos]").fadeOut(500);	
	limpiarcamposGasto()
	limpiarcamposbuscadoregresoingreso()
	}else{	
if(controlacceso("VERLISTADOEGRESOINGRESO","accion")==false){return;}	
mostrarSoloUno("divAbmGastos")			
		document.getElementById("divAbmGastos").style.display=""
       //  
	
	}
}
function limpiarcamposbuscadoregresoingreso(){
	var buscadorGeneral = document.getElementById("inptBuscarGeneralGasto")
	if (buscadorGeneral) buscadorGeneral.value=""
	document.getElementById("inptBuscarIngresoEgreso1").value=""
	document.getElementById("inptBuscarIngresoEgreso2").value=""
	document.getElementById("inptBuscarGastoF1").value=""
	document.getElementById("inptBuscarGastoF2").value=""
	document.getElementById("inptRegistroNroGastos").value=""
	document.getElementById("inptTotalGasto").value=""
	if(document.getElementById("inptTotalDepositoIngresoGasto")) document.getElementById("inptTotalDepositoIngresoGasto").value=""
	if(document.getElementById("inptTotalEgresoGasto")) document.getElementById("inptTotalEgresoGasto").value=""
	if(document.getElementById("inptTotalNetoGasto")) document.getElementById("inptTotalNetoGasto").value=""
	document.getElementById("inptRegistroSeleccGasto").value=""
	document.getElementById("table_abm_gasto").innerHTML=""
}
function minimizarventanaingresoegreso(){
	document.getElementById("divMinimizadoEgresoIngreso").style.display=""
copiarBotonEnContenedor(document.getElementById("divMenuEgreso_Ingreso"));
	$("div[id=divAbmGastos]").fadeOut(500);
}
function verCerrarVentanaAbmGasto(d, l) {
	if (d == "1") {
		if(idabmAperturacierrecaja==""){
			document.getElementById("divAbmGastos").style.display="none"
		   ver_vetana_informativa("FALTO INICIAR UNA CAJA")
		   verCerrarVentanaAbmAperturaCierreCaja1()
		   return
	   }
		
		if (l == "1") {
			limpiarcamposGasto()
			if(controlacceso("INSERTARLISTADOEGRESOINGRESO","accion")==false){return;}	
		}
		$("div[id=divAbmGasto2]").fadeIn(250)
		document.getElementById('divAbmGasto1').style.display = "none"
	} else {
		$("div[id=divAbmGasto1]").fadeIn(250)
		document.getElementById('divAbmGasto2').style.display = "none"
	}
}
function verVentanaEditarGasto() {
		if(controlacceso("EDITARLISTADOEGRESOINGRESO","accion")==false){return;}	
		if(idabmAperturacierrecaja==""){
			document.getElementById("divAbmGastos").style.display="none"
		   ver_vetana_informativa("FALTO INICIAR UNA CAJA")
		   verCerrarVentanaAbmAperturaCierreCaja1()
		   return
	   }
	if (idAbmGasto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmGasto("1", "2")
}
var idAbmGasto = ""
function obtenerdatosabmGasto(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptMontoGasto').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccGasto').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptMotivoGasto').value = $(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptFechaGasto').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptEstadoGasto').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptlocalMisGastos').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptNroBoletaGasto').value = $(datostr).children('td[id="td_datos_14"]').html();
	document.getElementById('inptBancoGasto').value = $(datostr).children('td[id="td_datos_9"]').html();
	
	
	document.getElementById('inptCuentaGasto').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptTipoGasto').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptArregloGasto').value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById('inptMotivoMisGastos').value = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptFechaDepositoGasto').value = $(datostr).children('td[id="td_datos_18"]').html();
	document.getElementById('btnAbmGastos').value = "Editar datos";
	document.getElementById('btnEditarGastos').style.backgroundColor="";
	document.getElementById('btnConfirmarGasto').style.backgroundColor="#4caf50";
	idAbmGasto = $(datostr).children('td[id="td_id"]').html();
	$("div[id=imgFotoGastoIngresoEgreso]").css({"background-image":"url("+$(datostr).children('td[id="td_datos_15"]').html()+")"});
	fotogasto = $(datostr).children('td[id="td_datos_16"]').html() + "."+ $(datostr).children('td[id="td_datos_17"]').html()
	extgasto = $(datostr).children('td[id="td_datos_17"]').html()
	
}
function verificarcamposGasto() {
	var inptMotivoMisGastos = '';
	
	$("input[id=inptMotivoMisGastos]").each(function (i, Elemento) {
      var $input = $(this),
          val = $input.val();
		 
          list = $input.attr('list'),
          match = $('#'+list + ' option').filter(function() {
              return ($(this).val() === val);			 
          });

       if(match.length > 0) {
         inptMotivoMisGastos=$(match).attr("id")
       } else {
           // value is not in list
       }
});
	
	var inptMontoGasto = document.getElementById('inptMontoGasto').value
	var inptMotivoGasto = document.getElementById('inptMotivoGasto').value
	var inptFechaGasto = document.getElementById('inptFechaGasto').value
	var inptEstadoGasto = document.getElementById('inptEstadoGasto').value
	var inptArregloGasto = document.getElementById('inptArregloGasto').value
	var inptlocalMisGastos = document.getElementById('inptlocalMisGastos').value
	var inptTipoGasto = document.getElementById('inptTipoGasto').value
	var inptNroBoletaGasto = document.getElementById('inptNroBoletaGasto').value
	var inptBancoGasto = document.getElementById('inptBancoGasto') 
	var inptFechaDepositoGasto = document.getElementById('inptFechaDepositoGasto').value
    inptBancoGasto = inptBancoGasto.options[inptBancoGasto.selectedIndex].text;
	if(inptBancoGasto == 'SELECCIONAR'){
		inptBancoGasto = '';
	}
	
	
	if (inptArregloGasto == "" && inptTipoGasto=="Egreso") {
		ver_vetana_informativa("FALTO SELECCIONAR UN ARREGLO")
		return false;
	}
	
	
	var inptCuentaGasto = document.getElementById('inptCuentaGasto').value
	if (inptFechaDepositoGasto == "" && inptTipoGasto=="Deposito") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA FECHA DE DEPOSITO")
		return false;
	}
	
	
	if (inptMontoGasto == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DEL GASTO")
		return false;
	}
	if (inptMotivoMisGastos == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL MOTIVO")
		return false;
	}
	if (inptMotivoGasto == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MOTIVO DEL GASTO")
		return false;
	}
	if (inptFechaGasto == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DEL GASTO")
		return false;
	}
	
	if(inptTipoGasto == 'Deposito'){
		if(fotogasto == ''){
			ver_vetana_informativa("FALTO CARGAR UNA IMAGEN")
			return false;
		}
	}
	
	var accion = "";
	if (idAbmGasto != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADOEGRESOINGRESO","accion")==false){return;}	
	} else {
		if(controlacceso("INSERTARLISTADOEGRESOINGRESO","accion")==false){return;}	
		accion = "nuevo";
	}
	
	abmgastos(inptFechaDepositoGasto,inptMotivoMisGastos,inptArregloGasto,inptNroBoletaGasto, inptBancoGasto , inptCuentaGasto ,inptMontoGasto, inptMotivoGasto, inptFechaGasto, inptEstadoGasto, idAbmGasto, inptTipoGasto, inptlocalMisGastos, accion);
}
function abmgastos(fechaDeposito,cod_motivo,Arreglo,nroboleta ,banco ,nrocuenta,monto, motivo, fecha, estado, idgastos, tipo, cod_local, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idgastos", idgastos)
	datos.append("monto", monto)
	datos.append("motivo", motivo)
	datos.append("fecha", fecha)
	datos.append("estado", estado)
	datos.append("tipo", tipo)
	datos.append("cod_local", cod_local)
	datos.append("codcaja", cajapredeterminada)
	datos.append("idaperturacierrecaja", idabmAperturacierrecaja)
	datos.append("nroboleta", nroboleta)
	datos.append("banco", banco)
	datos.append("Arreglo", Arreglo)
	datos.append("nrocuenta", nrocuenta)
	datos.append("cod_motivo", cod_motivo)
	datos.append("foto", fotogasto)
	datos.append("ext", extgasto)
	datos.append("fechaDeposito", fechaDeposito)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
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
				   if(accion=="nuevo"){
						ImprimirTicketEgreso()
					}
					limpiarcamposGasto()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmGasto = ""
					buscarabmGasto()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function cambiarFechaIngresoEgreso(datos){
	let fecha = obtenerFechaActual();
	if(controlacceso("CAMBIARFECHAINGRESOEGRESO","accion")==false){
		datos.value = fecha;
	return;
	}	
}
function confirmarGasto() {
	if(controlacceso("CONFIRMAREGRESOINGRESO","accion")==false){return;}
	if(idAbmGasto == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR EL GASTO A CONFIRMAR")
		return;
	}
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "confirmarEgresoIngreso")
	datos.append("idgastos", idAbmGasto)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
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
					idAbmGasto = ""
					buscarabmGasto()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function ImprimirTicketEgreso(){
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
+"<p class='pTituloTicket1' >BOLETA DE CONTROL</p>"
+"<div class='divSeparadorTicket' style='margin-bottom:5px'></div>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Fecha Imp.:</b></td>"
+"<td style=''>"+f.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Usuario :</b></td>"
+"<td style=''>"+ document.getElementById("ptituloUser2").innerHTML+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Local:</b></td>"
+"<td style=''>"+ $("select[id=inptlocalMisGastos]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<br>"
+"<br>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:60px'><b>Caja:</b></td>"
+"<td style=''>"+ $("select[id=inptcajaAperturaCierreCaja]").children(":selected").text() +"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:100px'><b>Tipo :</b></td>"
+"<td style=''>"+ document.getElementById("inptTipoGasto").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto :</b></td>"
+"<td style=''>"+document.getElementById("inptMontoGasto").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<br>"
+"<br>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Motivo :</b></td>"
+"<td style=''>"+document.getElementById("inptMotivoGasto").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Boleta Nro :</b></td>"
+"<td style=''>"+document.getElementById("inptNroBoletaGasto").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Banco :</b></td>"
+"<td style=''>"+document.getElementById("inptBancoGasto").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Cuenta :</b></td>"
+"<td style=''>"+document.getElementById("inptCuentaGasto").value+"</td>"
+"</tr>"
+"</table>"
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

function checkestadoGastos(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarGasto1').checked=true
		document.getElementById('inptSeleccEstadoBuscarGasto2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarGasto1').checked=false
		document.getElementById('inptSeleccEstadoBuscarGasto2').checked=true
	}
}
function checkfiltroshistorialegresoingreso(d){
	if(d=="1"){
	document.getElementById('inptCheckingresoegreso1').checked=true
	document.getElementById('inptCheckingresoegreso2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarGastoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarGastoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
		document.getElementById('inptCheckingresoegreso1').checked=false
		document.getElementById('inptCheckingresoegreso2').checked=true
		document.getElementById('inptBuscarGastoF1').value="";
		document.getElementById('inptBuscarGastoF2').value="";
	}
}
function buscarabmGasto() {
if(controlacceso("BUSCARLISTADOEGRESOINGRESO","accion")==false){return;}	
	var listado=iniciarListadoAbmGasto();
	var fecha1 = document.getElementById('inptBuscarGastoF1').value
	var fecha2 = document.getElementById('inptBuscarGastoF2').value
	var estado =""
	if(document.getElementById('inptSeleccEstadoBuscarGasto1').checked==true){
		estado="Activo"
	}else{
		estado="Inactivo"
	}
	var tipo = document.getElementById('inptSeleccTipoBuscarGasto').value
	var arreglo = document.getElementById('inptSeleccArregloBuscarGasto').value
	var cod_local = document.getElementById('inptlocalMisGastosBusca').value
	var fecha = document.getElementById('inptBuscarIngresoEgreso2').value
	var usuario = document.getElementById('inptBuscarIngresoEgreso1').value
	var motivo = '';
	
	$("input[id=inptBuscarIngresoEgreso3]").each(function (i, Elemento) {
      var $input = $(this),
          val = $input.val();
		 
          list = $input.attr('list'),
          match = $('#'+list + ' option').filter(function() {
              return ($(this).val() === val);			 
          });

       if(match.length > 0) {
         motivo=$(match).attr("id")
       } else {
           // value is not in list
       }
});
	
	var nroboleta = document.getElementById('inptBuscarIngresoEgreso5').value
	var monto = document.getElementById('inptBuscarIngresoEgreso8').value
	var confirmado = document.getElementById('inptConfirmadoMisGastosBusca').value
	var banco = document.getElementById('inptBuscarIngresoEgreso4').value
	var buscadorGeneral = document.getElementById('inptBuscarGeneralGasto')
	var busqueda_general = buscadorGeneral ? buscadorGeneral.value : ''
	// var banco = $('#inptBuscarIngresoEgreso4').find('option:selected').text();
	// if(banco == 'SELECCIONAR'){
		// banco = '';
	// }
	
	var permisover="NO";
	if(controlacceso2("VERTODOSEGRESOINGRESO","accion")!=false){permisover="SI"}
	
	
	
	
	document.getElementById("table_abm_gasto").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"cod_local": cod_local,
		"tipo": tipo,
		"usuario": usuario,
		"fecha": fecha,
		"arreglo": arreglo,
		"motivo": motivo,
		"confirmado": confirmado,
		"banco": banco,
		"nroboleta": nroboleta,
		"monto": monto,
		"busqueda_general": busqueda_general,
		"agrupacionformulariogasto": agrupacionformulariogasto,
		"permisover": permisover,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_gasto").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_gasto").innerHTML = ''
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
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
					document.getElementById("inptTotalGasto").value = datos[4];
					if(document.getElementById("inptTotalDepositoIngresoGasto")) document.getElementById("inptTotalDepositoIngresoGasto").value = datos[5] ? datos[5] : "0";
					if(document.getElementById("inptTotalEgresoGasto")) document.getElementById("inptTotalEgresoGasto").value = datos[6] ? datos[6] : "0";
					if(document.getElementById("inptTotalNetoGasto")) document.getElementById("inptTotalNetoGasto").value = datos[7] ? datos[7] : "0";
					document.getElementById("inptRegistroNroGastos").value = datos[3];
					document.getElementById('btnEditarGastos').style.backgroundColor="#b7b7b7";
					document.getElementById('btnConfirmarGasto').style.backgroundColor="#b7b7b7";
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
	document.addEventListener("DOMContentLoaded",iniciarListadoAbmGasto);
}else{
	iniciarListadoAbmGasto();
}
function limpiarcamposGasto() {
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaGasto').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById('inptFechaDepositoGasto').value ="";
	document.getElementById('inptMotivoMisGastos').value ="";
	document.getElementById('inptMontoGasto').value = "";
	document.getElementById('inptRegistroSeleccGasto').value = "";
	document.getElementById('inptMotivoGasto').value = "";
	document.getElementById('inptPersonalGasto').value = "";
	document.getElementById('inptNroBoletaGasto').value = "";
	document.getElementById('inptBancoGasto').value = "";
	document.getElementById('inptCuentaGasto').value = "";
	document.getElementById('inptArregloGasto').value = "";
	document.getElementById('btnEditarGastos').style.backgroundColor="#b7b7b7";
	document.getElementById('btnConfirmarGasto').style.backgroundColor="#b7b7b7";
	document.getElementById('inptEstadoGasto').value = "Activo";
	document.getElementById('btnAbmGastos').value = "Guardar datos";
	idAbmGasto = "";
	seleccionarLocalUSer()
	
	$("div[id=imgFotoGastoIngresoEgreso]").css({"background-image":"url()"});
	fotogasto="";
	extgasto="";
}
var agrupacionformulariogasto = "1"
function cambiarTipoGasto(d){
document.getElementById("btnGasto1").style=""
document.getElementById("btnGasto2").style=""
if(d=="1"){
	document.getElementById("btnGasto1").style="background-color:#ff9800;color:#fff"
	agrupacionformulariogasto="1";
}else{
	document.getElementById("btnGasto2").style="background-color:#ff9800;color:#fff"
	agrupacionformulariogasto="2";
}
}
// CARGAR FOTO GASTO
function ExploradorImagenGasto(File){	
$("input[name="+File+"]").click();
}
var fotogasto="";
var extgasto="";
function readFileGasto(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension=="jpeg") || (file_extension=="jpg") || (file_extension=="png") ){
}else{
ver_vetana_informativa("LA FOTO SELECCIONADO NO ES JPEG")
return false;
}
var reader = new FileReader();
reader.onload = function(e){
	extgasto=file_extension;
fotogasto=e.target.result;
 $("div[id=imgFotoGastoIngresoEgreso]").css({"background-image":"url("+fotogasto+")"})
}
reader.readAsDataURL(input.files[0]);
}

