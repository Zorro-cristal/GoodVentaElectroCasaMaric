/*
ABM EGRESO/INGRESO ADMINISTRATIVO
*/
var listadoAbmEgresoIngresoAdministrativo=null;
function crearMotivoListadoEgresoIngresoAdministrativo(registro){
	var fragmento=document.createDocumentFragment();
	if(registro.agrupado==="SI"){
		fragmento.appendChild(document.createTextNode(registro.descripcion || ""));
		return fragmento;
	}
	fragmento.appendChild(document.createTextNode(registro.motivo || ""));
	fragmento.appendChild(document.createElement("br"));
	var detalle=document.createElement("strong");
	detalle.textContent=registro.descripcion || "";
	fragmento.appendChild(detalle);
	return fragmento;
}
function crearTipoListadoEgresoIngresoAdministrativo(registro){
	var fragmento=document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.tipo || ""));
	if(registro.fecha_deposito){
		fragmento.appendChild(document.createElement("br"));
		fragmento.appendChild(document.createTextNode(registro.fecha_deposito));
	}
	return fragmento;
}
function crearBotonFotoListadoEgresoIngresoAdministrativo(registro){
	if(!registro.url){return "";}
	var boton=document.createElement("input");
	boton.type="button";
	boton.value="Ver";
	boton.className="btn4";
	boton.style.width="50px";
	boton.addEventListener("click",function(){verdocumentoClienteSolicitud(registro.url);});
	return boton;
}
function iniciarListadoAbmEgresoIngresoAdministrativo(){
	if(listadoAbmEgresoIngresoAdministrativo || !window.AbmListadoCore){return listadoAbmEgresoIngresoAdministrativo;}
	if(!document.getElementById("table_abm_egresoingresoadministrativo") || !document.getElementById("tdTituloImpreEgresoIngresoAdministrativo")){return null;}
	listadoAbmEgresoIngresoAdministrativo=window.AbmListadoCore.crear({
		nombre:"egreso_ingreso_administrativo",
		idCabecera:"tdTituloImpreEgresoIngresoAdministrativo",
		idCuerpo:"table_abm_egresoingresoadministrativo",
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
			funcionSeleccion:"obtenerdatosabmEgresoIngresoAdministrativo",
			atributosTabla:function(registro){return registro.confirmado==="SI" ? {style:{backgroundColor:"#09b26d",color:"#fff"}} : {};},
			celdas:[
				{id:"td_id",campo:"id",columna:"id",render:function(valor,registro,celda){celda.style.backgroundColor="#efeded";celda.style.color="red";return valor;}},
				{id:"td_datos_2",campo:"motivo_orden",columna:"motivo_orden",render:function(valor,registro){return crearMotivoListadoEgresoIngresoAdministrativo(registro);}},
				{id:"td_datos_1",campo:"monto_formateado",columna:"monto"},
				{campo:"tipo",columna:"tipo",render:function(valor,registro){return crearTipoListadoEgresoIngresoAdministrativo(registro);}},
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
				{campo:"url",columna:"url",render:function(valor,registro){return crearBotonFotoListadoEgresoIngresoAdministrativo(registro);}},
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
	listadoAbmEgresoIngresoAdministrativo.iniciar();
	return listadoAbmEgresoIngresoAdministrativo;
}
function verCerrarAbmEgresoIngresoAdministrativo(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmEgresoIngresoAdministrativo").style.display==""){
	document.getElementById("divMinimizadoEgresoIngresoAdministrativo").style.display="none"
     //  
	$("div[id=divAbmEgresoIngresoAdministrativo]").fadeOut(500);	
	limpiarcamposEgresoIngresoAdministrativo()
	limpiarcamposbuscadoregresoingresoadministrativo()
	}else{	
if(controlacceso("VERLISTADOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
// mostrarSoloUno("divAbmEgresoIngresoAdministrativo")			
		document.getElementById("divAbmEgresoIngresoAdministrativo").style.display=""
       //  
	
	}
}
function limpiarcamposbuscadoregresoingresoadministrativo(){
	document.getElementById("inptBuscarEgresoIngresoAdministrativo1").value=""
	document.getElementById("inptBuscarEgresoIngresoAdministrativo2").value=""
	document.getElementById("inptBuscarEgresoIngresoAdministrativoF1").value=""
	document.getElementById("inptBuscarEgresoIngresoAdministrativoF2").value=""
	document.getElementById("inptRegistroNroEgresoIngresoAdministrativo").value=""
	document.getElementById("inptTotalEgresoIngresoAdministrativo").value=""
	document.getElementById("inptRegistroSeleccEgresoIngresoAdministrativo").value=""
	document.getElementById("table_abm_egresoingresoadministrativo").innerHTML=""
}
function minimizarventanaegresoingresoadministrativo(){
	document.getElementById("divMinimizadoEgresoIngresoAdministrativo").style.display=""
// copiarBotonEnContenedor(document.getElementById("divMenuEgreso_Ingreso"));
	$("div[id=divAbmEgresoIngresoAdministrativo]").fadeOut(500);
}
function verCerrarVentanaAbmEgresoIngresoAdministrativo(d, l) {
	if (d == "1") {
		if (l == "1") {
			limpiarcamposEgresoIngresoAdministrativo()
			// if(controlacceso("INSERTARLISTADOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
		}
		$("div[id=divAbmEgresoIngresoAdministrativo2]").fadeIn(250)
		document.getElementById('divAbmEgresoIngresoAdministrativo1').style.display = "none"
	} else {
		$("div[id=divAbmEgresoIngresoAdministrativo1]").fadeIn(250)
		document.getElementById('divAbmEgresoIngresoAdministrativo2').style.display = "none"
	}
}
function verVentanaEditarEgresoIngresoAdministrativo() {	
		
	if (idAbmEgresoIngresoAdministrativo == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmEgresoIngresoAdministrativo("1", "2")
}
var idAbmEgresoIngresoAdministrativo = ""
function obtenerdatosabmEgresoIngresoAdministrativo(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptMontoEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptMotivoEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptFechaEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptEstadoEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptlocalMisEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptNroBoletaEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_14"]').html();
	document.getElementById('inptBancoEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_9"]').html();
	
	
	document.getElementById('inptCuentaEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptTipoEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptArregloEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById('inptMotivoMisEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptFechaDepositoEgresoIngresoAdministrativo').value = $(datostr).children('td[id="td_datos_18"]').html();
	document.getElementById('btnAbmEgresoIngresoAdministrativo').value = "Editar datos";
	document.getElementById('btnEditarEgresoIngresoAdministrativo').style.backgroundColor="";
	document.getElementById('btnConfirmarEgresoIngresoAdministrativo').style.backgroundColor="#4caf50";
	idAbmEgresoIngresoAdministrativo = $(datostr).children('td[id="td_id"]').html();
	$("div[id=imgFotoEgresoIngresoAdministrativo]").css({"background-image":"url("+$(datostr).children('td[id="td_datos_15"]').html()+")"});
	fotoegresoingresoadministrativo = $(datostr).children('td[id="td_datos_16"]').html() + "."+ $(datostr).children('td[id="td_datos_17"]').html()
	extegresoingresoadministrativo = $(datostr).children('td[id="td_datos_17"]').html()
	
}
function verificarcamposEgresoIngresoAdministrativo() {
	var inptMotivoMisEgresoIngresoAdministrativo = '';
	
	$("input[id=inptMotivoMisEgresoIngresoAdministrativo]").each(function (i, Elemento) {
      var $input = $(this),
          val = $input.val();
		 
          list = $input.attr('list'),
          match = $('#'+list + ' option').filter(function() {
              return ($(this).val() === val);			 
          });

       if(match.length > 0) {
         inptMotivoMisEgresoIngresoAdministrativo=$(match).attr("id")
       } else {
           // value is not in list
       }
});
	
	var inptMontoEgresoIngresoAdministrativo = document.getElementById('inptMontoEgresoIngresoAdministrativo').value
	var inptMotivoEgresoIngresoAdministrativo = document.getElementById('inptMotivoEgresoIngresoAdministrativo').value
	var inptFechaEgresoIngresoAdministrativo = document.getElementById('inptFechaEgresoIngresoAdministrativo').value
	var inptEstadoEgresoIngresoAdministrativo = document.getElementById('inptEstadoEgresoIngresoAdministrativo').value
	var inptArregloEgresoIngresoAdministrativo = document.getElementById('inptArregloEgresoIngresoAdministrativo').value
	var inptlocalMisEgresoIngresoAdministrativo = document.getElementById('inptlocalMisEgresoIngresoAdministrativo').value
	var inptTipoEgresoIngresoAdministrativo = document.getElementById('inptTipoEgresoIngresoAdministrativo').value
	var inptNroBoletaEgresoIngresoAdministrativo = document.getElementById('inptNroBoletaEgresoIngresoAdministrativo').value
	var inptBancoEgresoIngresoAdministrativo = document.getElementById('inptBancoEgresoIngresoAdministrativo') 
	var inptFechaDepositoEgresoIngresoAdministrativo = document.getElementById('inptFechaDepositoEgresoIngresoAdministrativo').value
    inptBancoEgresoIngresoAdministrativo = inptBancoEgresoIngresoAdministrativo.options[inptBancoEgresoIngresoAdministrativo.selectedIndex].text;
	if(inptBancoEgresoIngresoAdministrativo == 'SELECCIONAR'){
		inptBancoEgresoIngresoAdministrativo = '';
	}
	
	
	if (inptArregloEgresoIngresoAdministrativo == "" && inptTipoEgresoIngresoAdministrativo=="Egreso") {
		ver_vetana_informativa("FALTO SELECCIONAR UN ARREGLO")
		return false;
	}
	
	
	var inptCuentaEgresoIngresoAdministrativo = document.getElementById('inptCuentaEgresoIngresoAdministrativo').value
	if (inptFechaDepositoEgresoIngresoAdministrativo == "" && inptTipoEgresoIngresoAdministrativo=="Deposito") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA FECHA DE DEPOSITO")
		return false;
	}
	
	
	if (inptMontoEgresoIngresoAdministrativo == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DEL GASTO")
		return false;
	}
	if (inptMotivoMisEgresoIngresoAdministrativo == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL MOTIVO")
		return false;
	}
	if (inptMotivoEgresoIngresoAdministrativo == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MOTIVO DEL GASTO")
		return false;
	}
	if (inptFechaEgresoIngresoAdministrativo == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DEL GASTO")
		return false;
	}
	
	
	var accion = "";
	if (idAbmEgresoIngresoAdministrativo != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
	} else {
		// if(controlacceso("INSERTARLISTADOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
		accion = "nuevo";
	}
	
	abmegresoingresoadministrativo(inptFechaDepositoEgresoIngresoAdministrativo,inptMotivoMisEgresoIngresoAdministrativo,inptArregloEgresoIngresoAdministrativo,inptNroBoletaEgresoIngresoAdministrativo, inptBancoEgresoIngresoAdministrativo , inptCuentaEgresoIngresoAdministrativo ,inptMontoEgresoIngresoAdministrativo, inptMotivoEgresoIngresoAdministrativo, inptFechaEgresoIngresoAdministrativo, inptEstadoEgresoIngresoAdministrativo, idAbmEgresoIngresoAdministrativo, inptTipoEgresoIngresoAdministrativo, inptlocalMisEgresoIngresoAdministrativo, accion);
}
function abmegresoingresoadministrativo(fechaDeposito,cod_motivo,Arreglo,nroboleta ,banco ,nrocuenta,monto, motivo, fecha, estado, idegresoingreso, tipo, cod_local, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idegresoingreso", idegresoingreso)
	datos.append("monto", monto)
	datos.append("motivo", motivo)
	datos.append("fecha", fecha)
	datos.append("estado", estado)
	datos.append("tipo", tipo)
	datos.append("cod_local", cod_local)
	datos.append("nroboleta", nroboleta)
	datos.append("banco", banco)
	datos.append("Arreglo", Arreglo)
	datos.append("nrocuenta", nrocuenta)
	datos.append("cod_motivo", cod_motivo)
	datos.append("foto", fotoegresoingresoadministrativo)
	datos.append("ext", extegresoingresoadministrativo)
	datos.append("fechaDeposito", fechaDeposito)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresoadministrativo.php",
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
				   /* if(accion=="nuevo"){
						ImprimirTicketEgresoIngresoAdministrativo()
					} */
					limpiarcamposEgresoIngresoAdministrativo()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmEgresoIngresoAdministrativo = ""
					buscarabmEgresoIngresoAdministrativo()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function confirmarEgresoIngresoAdministrativo() {
	if(controlacceso("CONFIRMAREGRESOINGRESOADMINISTRATIVO","accion")==false){return;}
	if(idAbmEgresoIngresoAdministrativo == ""){
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
	datos.append("idegresoingresoadministrativo", idAbmEgresoIngresoAdministrativo)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresoadministrativo.php",
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
					idAbmEgresoIngresoAdministrativo = ""
					buscarabmEgresoIngresoAdministrativo()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function ImprimirTicketEgresoIngresoAdministrativo(){
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
+"<td style=''>"+ $("select[id=inptlocalMisEgresoIngresoAdministrativo]").children(":selected").text() +"</td>"
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
+"<td style=''>"+ document.getElementById("inptTipoEgresoIngresoAdministrativo").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto :</b></td>"
+"<td style=''>"+document.getElementById("inptMontoEgresoIngresoAdministrativo").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<br>"
+"<br>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Motivo :</b></td>"
+"<td style=''>"+document.getElementById("inptMotivoEgresoIngresoAdministrativo").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Boleta Nro :</b></td>"
+"<td style=''>"+document.getElementById("inptNroBoletaEgresoIngresoAdministrativo").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Banco :</b></td>"
+"<td style=''>"+document.getElementById("inptBancoEgresoIngresoAdministrativo").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Cuenta :</b></td>"
+"<td style=''>"+document.getElementById("inptCuentaEgresoIngresoAdministrativo").value+"</td>"
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

function checkestadoEgresoIngresoAdministrativo(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarEgresoIngresoAdministrativo1').checked=true
		document.getElementById('inptSeleccEstadoBuscarEgresoIngresoAdministrativo2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarEgresoIngresoAdministrativo1').checked=false
		document.getElementById('inptSeleccEstadoBuscarEgresoIngresoAdministrativo2').checked=true
	}
}
function checkfiltroshistorialegresoingresoadministrativo(d){
	if(d=="1"){
	document.getElementById('inptCheckegresoingresoadministrativo1').checked=true
	document.getElementById('inptCheckegresoingresoadministrativo2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarEgresoIngresoAdministrativoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarEgresoIngresoAdministrativoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
		document.getElementById('inptCheckegresoingresoadministrativo1').checked=false
		document.getElementById('inptCheckegresoingresoadministrativo2').checked=true
		document.getElementById('inptBuscarEgresoIngresoAdministrativoF1').value="";
		document.getElementById('inptBuscarEgresoIngresoAdministrativoF2').value="";
	}
}
function buscarabmEgresoIngresoAdministrativo() {	
	var listado=iniciarListadoAbmEgresoIngresoAdministrativo();
	var fecha1 = document.getElementById('inptBuscarEgresoIngresoAdministrativoF1').value
	var fecha2 = document.getElementById('inptBuscarEgresoIngresoAdministrativoF2').value
	var estado =""
	if(document.getElementById('inptSeleccEstadoBuscarEgresoIngresoAdministrativo1').checked==true){
		estado="Activo"
	}else{
		estado="Inactivo"
	}
	var tipo = document.getElementById('inptSeleccTipoBuscarEgresoIngresoAdministrativo').value
	var arreglo = document.getElementById('inptSeleccArregloBuscarEgresoIngresoAdministrativo').value
	var cod_local = document.getElementById('inptlocalMisEgresoIngresoAdministrativoBusca').value
	var fecha = document.getElementById('inptBuscarEgresoIngresoAdministrativo2').value
	var usuario = document.getElementById('inptBuscarEgresoIngresoAdministrativo1').value
	var motivo = '';
	
	$("input[id=inptBuscarEgresoIngresoAdministrativo3]").each(function (i, Elemento) {
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
	
	var nroboleta = document.getElementById('inptBuscarEgresoIngresoAdministrativo5').value
	var monto = document.getElementById('inptBuscarEgresoIngresoAdministrativo8').value
	var confirmado = document.getElementById('inptConfirmadoMisEgresoIngresoAdministrativoBusca').value
	var banco = document.getElementById('inptBuscarEgresoIngresoAdministrativo4').value
	// var banco = $('#inptBuscarEgresoIngresoAdministrativo4').find('option:selected').text();
	// if(banco == 'SELECCIONAR'){
		// banco = '';
	// }
	
	var permisover="SI";
	// if(controlacceso2("VERTODOSEGRESOINGRESO","accion")!=false){permisover="SI"}
	
	
	
	
	document.getElementById("table_abm_egresoingresoadministrativo").innerHTML = paginacargando
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
		"agrupacionformularioegresoingreso": agrupacionformularioegresoingresoadministrativo,
		"permisover": permisover,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresoadministrativo.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_egresoingresoadministrativo").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_egresoingresoadministrativo").innerHTML = ''
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
					document.getElementById("inptTotalEgresoIngresoAdministrativo").value = datos[4];
					document.getElementById("inptRegistroNroEgresoIngresoAdministrativo").value = datos[3];
					document.getElementById('btnEditarEgresoIngresoAdministrativo').style.backgroundColor="#b7b7b7";
					document.getElementById('btnConfirmarEgresoIngresoAdministrativo').style.backgroundColor="#b7b7b7";
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
	document.addEventListener("DOMContentLoaded",iniciarListadoAbmEgresoIngresoAdministrativo);
}else{
	iniciarListadoAbmEgresoIngresoAdministrativo();
}
function limpiarcamposEgresoIngresoAdministrativo() {
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaEgresoIngresoAdministrativo').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById('inptFechaDepositoEgresoIngresoAdministrativo').value ="";
	document.getElementById('inptMotivoMisEgresoIngresoAdministrativo').value ="";
	document.getElementById('inptMontoEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptRegistroSeleccEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptMotivoEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptPersonalEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptNroBoletaEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptBancoEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptCuentaEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptArregloEgresoIngresoAdministrativo').value = "";
	document.getElementById('inptlocalMisEgresoIngresoAdministrativo').value = "";
	document.getElementById('btnEditarEgresoIngresoAdministrativo').style.backgroundColor="#b7b7b7";
	document.getElementById('btnConfirmarEgresoIngresoAdministrativo').style.backgroundColor="#b7b7b7";
	document.getElementById('inptEstadoEgresoIngresoAdministrativo').value = "Activo";
	document.getElementById('btnAbmEgresoIngresoAdministrativo').value = "Guardar datos";
	idAbmEgresoIngresoAdministrativo = "";
	seleccionarLocalUSer()
	
	$("div[id=imgFotoEgresoIngresoAdministrativo]").css({"background-image":"url()"});
	fotoegresoingresoadministrativo="";
	extegresoingresoadministrativo="";
}
var agrupacionformularioegresoingresoadministrativo = "1"
function cambiarTipoEgresoIngresoAdministrativo(d){
document.getElementById("btnEgresoIngresoAdministrativo1").style=""
document.getElementById("btnEgresoIngresoAdministrativo2").style=""
if(d=="1"){
	document.getElementById("btnEgresoIngresoAdministrativo1").style="background-color:#ff9800;color:#fff"
	agrupacionformularioegresoingresoadministrativo="1";
}else{
	document.getElementById("btnEgresoIngresoAdministrativo2").style="background-color:#ff9800;color:#fff"
	agrupacionformularioegresoingresoadministrativo="2";
}
}
// CARGAR FOTO GASTO ADMINISTRATIVO
function ExploradorImagenEgresoIngresoAdministrativo(File){	
$("input[name="+File+"]").click();
}
var fotoegresoingresoadministrativo="";
var extegresoingresoadministrativo="";
function readFileEgresoIngresoAdministrativo(input){		
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
	extegresoingresoadministrativo=file_extension;
fotoegresoingresoadministrativo=e.target.result;
 $("div[id=imgFotoEgresoIngresoAdministrativo]").css({"background-image":"url("+fotoegresoingresoadministrativo+")"})
}
reader.readAsDataURL(input.files[0]);
}

