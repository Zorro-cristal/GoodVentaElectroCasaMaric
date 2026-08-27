/*
ABM EGRESO/INGRESO JUAN
*/
var listadoAbmEgresoIngresoJuan=null;
function crearMotivoListadoEgresoIngresoJuan(registro){
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
function crearTipoListadoEgresoIngresoJuan(registro){
	var fragmento=document.createDocumentFragment();
	fragmento.appendChild(document.createTextNode(registro.tipo || ""));
	if(registro.fecha_deposito){
		fragmento.appendChild(document.createElement("br"));
		fragmento.appendChild(document.createTextNode(registro.fecha_deposito));
	}
	return fragmento;
}
function crearBotonFotoListadoEgresoIngresoJuan(registro){
	if(!registro.url){return "";}
	var boton=document.createElement("input");
	boton.type="button";
	boton.value="Ver";
	boton.className="btn4";
	boton.style.width="50px";
	boton.addEventListener("click",function(){verdocumentoClienteSolicitud(registro.url);});
	return boton;
}
function iniciarListadoAbmEgresoIngresoJuan(){
	if(listadoAbmEgresoIngresoJuan || !window.AbmListadoCore){return listadoAbmEgresoIngresoJuan;}
	if(!document.getElementById("table_abm_egresoingresojuan") || !document.getElementById("tdTituloImpreEgresoIngresoJuan")){return null;}
	listadoAbmEgresoIngresoJuan=window.AbmListadoCore.crear({
		nombre:"egreso_ingreso_juan",
		idCabecera:"tdTituloImpreEgresoIngresoJuan",
		idCuerpo:"table_abm_egresoingresojuan",
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
			funcionSeleccion:"obtenerdatosabmEgresoIngresoJuan",
			atributosTabla:function(registro){return registro.confirmado==="SI" ? {style:{backgroundColor:"#09b26d",color:"#fff"}} : {};},
			celdas:[
				{id:"td_id",campo:"id",columna:"id",render:function(valor,registro,celda){celda.style.backgroundColor="#efeded";celda.style.color="red";return valor;}},
				{id:"td_datos_2",campo:"motivo_orden",columna:"motivo_orden",render:function(valor,registro){return crearMotivoListadoEgresoIngresoJuan(registro);}},
				{id:"td_datos_1",campo:"monto_formateado",columna:"monto"},
				{campo:"tipo",columna:"tipo",render:function(valor,registro){return crearTipoListadoEgresoIngresoJuan(registro);}},
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
				{campo:"url",columna:"url",render:function(valor,registro){return crearBotonFotoListadoEgresoIngresoJuan(registro);}},
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
	listadoAbmEgresoIngresoJuan.iniciar();
	return listadoAbmEgresoIngresoJuan;
}
function verCerrarAbmEgresoIngresoJuan(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmEgresoIngresoJuan").style.display==""){
	document.getElementById("divMinimizadoEgresoIngresoJuan").style.display="none"
     //  
	$("div[id=divAbmEgresoIngresoJuan]").fadeOut(500);	
	limpiarcamposEgresoIngresoJuan()
	limpiarcamposbuscadoregresoingresojuan()
	}else{	
if(controlacceso("VERLISTADOEGRESOINGRESOJUAN","accion")==false){return;}	
// mostrarSoloUno("divAbmEgresoIngresoJuan")			
		document.getElementById("divAbmEgresoIngresoJuan").style.display=""
       //  
	
	}
}
function limpiarcamposbuscadoregresoingresojuan(){
	document.getElementById("inptBuscarEgresoIngresoJuan1").value=""
	document.getElementById("inptBuscarEgresoIngresoJuan2").value=""
	document.getElementById("inptBuscarEgresoIngresoJuanF1").value=""
	document.getElementById("inptBuscarEgresoIngresoJuanF2").value=""
	document.getElementById("inptRegistroNroEgresoIngresoJuan").value=""
	document.getElementById("inptTotalEgresoIngresoJuan").value=""
	document.getElementById("inptRegistroSeleccEgresoIngresoJuan").value=""
	document.getElementById("table_abm_egresoingresojuan").innerHTML=""
}
function minimizarventanaegresoingresojuan(){
	document.getElementById("divMinimizadoEgresoIngresoJuan").style.display=""
// copiarBotonEnContenedor(document.getElementById("divMenuEgreso_Ingreso"));
	$("div[id=divAbmEgresoIngresoJuan]").fadeOut(500);
}
function verCerrarVentanaAbmEgresoIngresoJuan(d, l) {
	if (d == "1") {
		if (l == "1") {
			limpiarcamposEgresoIngresoJuan()
			// if(controlacceso("INSERTARLISTADOEGRESOINGRESOJUAN","accion")==false){return;}	
		}
		$("div[id=divAbmEgresoIngresoJuan2]").fadeIn(250)
		document.getElementById('divAbmEgresoIngresoJuan1').style.display = "none"
	} else {
		$("div[id=divAbmEgresoIngresoJuan1]").fadeIn(250)
		document.getElementById('divAbmEgresoIngresoJuan2').style.display = "none"
	}
}
function verVentanaEditarEgresoIngresoJuan() {	
		
	if (idAbmEgresoIngresoJuan == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmEgresoIngresoJuan("1", "2")
}
var idAbmEgresoIngresoJuan = ""
function obtenerdatosabmEgresoIngresoJuan(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptMontoEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptMotivoEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_13"]').html();
	document.getElementById('inptFechaEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptEstadoEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptlocalMisEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptNroBoletaEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_14"]').html();
	document.getElementById('inptBancoEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_9"]').html();
	
	
	document.getElementById('inptCuentaEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptTipoEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptArregloEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_11"]').html();
	document.getElementById('inptMotivoMisEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_12"]').html();
	document.getElementById('inptFechaDepositoEgresoIngresoJuan').value = $(datostr).children('td[id="td_datos_18"]').html();
	document.getElementById('btnAbmEgresoIngresoJuan').value = "Editar datos";
	document.getElementById('btnEditarEgresoIngresoJuan').style.backgroundColor="";
	document.getElementById('btnConfirmarEgresoIngresoJuan').style.backgroundColor="#4caf50";
	idAbmEgresoIngresoJuan = $(datostr).children('td[id="td_id"]').html();
	$("div[id=imgFotoEgresoIngresoJuan]").css({"background-image":"url("+$(datostr).children('td[id="td_datos_15"]').html()+")"});
	fotoegresoingresojuan = $(datostr).children('td[id="td_datos_16"]').html() + "."+ $(datostr).children('td[id="td_datos_17"]').html()
	extegresoingresojuan = $(datostr).children('td[id="td_datos_17"]').html()
	
}
function verificarcamposEgresoIngresoJuan() {
	var inptMotivoMisEgresoIngresoJuan = '';
	
	$("input[id=inptMotivoMisEgresoIngresoJuan]").each(function (i, Elemento) {
      var $input = $(this),
          val = $input.val();
		 
          list = $input.attr('list'),
          match = $('#'+list + ' option').filter(function() {
              return ($(this).val() === val);			 
          });

       if(match.length > 0) {
         inptMotivoMisEgresoIngresoJuan=$(match).attr("id")
       } else {
           // value is not in list
       }
});
	
	var inptMontoEgresoIngresoJuan = document.getElementById('inptMontoEgresoIngresoJuan').value
	var inptMotivoEgresoIngresoJuan = document.getElementById('inptMotivoEgresoIngresoJuan').value
	var inptFechaEgresoIngresoJuan = document.getElementById('inptFechaEgresoIngresoJuan').value
	var inptEstadoEgresoIngresoJuan = document.getElementById('inptEstadoEgresoIngresoJuan').value
	var inptArregloEgresoIngresoJuan = document.getElementById('inptArregloEgresoIngresoJuan').value
	var inptlocalMisEgresoIngresoJuan = document.getElementById('inptlocalMisEgresoIngresoJuan').value
	var inptTipoEgresoIngresoJuan = document.getElementById('inptTipoEgresoIngresoJuan').value
	var inptNroBoletaEgresoIngresoJuan = document.getElementById('inptNroBoletaEgresoIngresoJuan').value
	var inptBancoEgresoIngresoJuan = document.getElementById('inptBancoEgresoIngresoJuan') 
	var inptFechaDepositoEgresoIngresoJuan = document.getElementById('inptFechaDepositoEgresoIngresoJuan').value
    inptBancoEgresoIngresoJuan = inptBancoEgresoIngresoJuan.options[inptBancoEgresoIngresoJuan.selectedIndex].text;
	if(inptBancoEgresoIngresoJuan == 'SELECCIONAR'){
		inptBancoEgresoIngresoJuan = '';
	}
	
	
	if (inptArregloEgresoIngresoJuan == "" && inptTipoEgresoIngresoJuan=="Egreso") {
		ver_vetana_informativa("FALTO SELECCIONAR UN ARREGLO")
		return false;
	}
	
	
	var inptCuentaEgresoIngresoJuan = document.getElementById('inptCuentaEgresoIngresoJuan').value
	if (inptFechaDepositoEgresoIngresoJuan == "" && inptTipoEgresoIngresoJuan=="Deposito") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA FECHA DE DEPOSITO")
		return false;
	}
	
	
	if (inptMontoEgresoIngresoJuan == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DEL GASTO")
		return false;
	}
	if (inptMotivoMisEgresoIngresoJuan == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL MOTIVO")
		return false;
	}
	if (inptMotivoEgresoIngresoJuan == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MOTIVO DEL GASTO")
		return false;
	}
	if (inptFechaEgresoIngresoJuan == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DEL GASTO")
		return false;
	}
	
	
	var accion = "";
	if (idAbmEgresoIngresoJuan != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADOEGRESOINGRESOJUAN","accion")==false){return;}	
	} else {
		// if(controlacceso("INSERTARLISTADOEGRESOINGRESOJUAN","accion")==false){return;}	
		accion = "nuevo";
	}
	
	abmegresoingresojuan(inptFechaDepositoEgresoIngresoJuan,inptMotivoMisEgresoIngresoJuan,inptArregloEgresoIngresoJuan,inptNroBoletaEgresoIngresoJuan, inptBancoEgresoIngresoJuan , inptCuentaEgresoIngresoJuan ,inptMontoEgresoIngresoJuan, inptMotivoEgresoIngresoJuan, inptFechaEgresoIngresoJuan, inptEstadoEgresoIngresoJuan, idAbmEgresoIngresoJuan, inptTipoEgresoIngresoJuan, inptlocalMisEgresoIngresoJuan, accion);
}
function abmegresoingresojuan(fechaDeposito,cod_motivo,Arreglo,nroboleta ,banco ,nrocuenta,monto, motivo, fecha, estado, idegresoingreso, tipo, cod_local, accion) {
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
	datos.append("foto", fotoegresoingresojuan)
	datos.append("ext", extegresoingresojuan)
	datos.append("fechaDeposito", fechaDeposito)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresojuan.php",
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
						ImprimirTicketEgresoIngresoJuan()
					} */
					limpiarcamposEgresoIngresoJuan()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmEgresoIngresoJuan = ""
					buscarabmEgresoIngresoJuan()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function confirmarEgresoIngresoJuan() {
	if(controlacceso("CONFIRMAREGRESOINGRESOJUAN","accion")==false){return;}
	if(idAbmEgresoIngresoJuan == ""){
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
	datos.append("idegresoingresojuan", idAbmEgresoIngresoJuan)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresojuan.php",
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
					idAbmEgresoIngresoJuan = ""
					buscarabmEgresoIngresoJuan()
					
				}				
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function ImprimirTicketEgresoIngresoJuan(){
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
+"<td style=''>"+ $("select[id=inptlocalMisEgresoIngresoJuan]").children(":selected").text() +"</td>"
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
+"<td style=''>"+ document.getElementById("inptTipoEgresoIngresoJuan").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Monto :</b></td>"
+"<td style=''>"+document.getElementById("inptMontoEgresoIngresoJuan").value+" Gs.</td>"
+"</tr>"
+"</table>"
+"<br>"
+"<br>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Motivo :</b></td>"
+"<td style=''>"+document.getElementById("inptMotivoEgresoIngresoJuan").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Boleta Nro :</b></td>"
+"<td style=''>"+document.getElementById("inptNroBoletaEgresoIngresoJuan").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Banco :</b></td>"
+"<td style=''>"+document.getElementById("inptBancoEgresoIngresoJuan").value+"</td>"
+"</tr>"
+"</table>"
+"<table class='tableTicket'>"
+"<tr>"
+"<td style='width:110px'><b>Cuenta :</b></td>"
+"<td style=''>"+document.getElementById("inptCuentaEgresoIngresoJuan").value+"</td>"
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

function checkestadoEgresoIngresoJuan(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarEgresoIngresoJuan1').checked=true
		document.getElementById('inptSeleccEstadoBuscarEgresoIngresoJuan2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarEgresoIngresoJuan1').checked=false
		document.getElementById('inptSeleccEstadoBuscarEgresoIngresoJuan2').checked=true
	}
}
function checkfiltroshistorialegresoingresojuan(d){
	if(d=="1"){
	document.getElementById('inptCheckegresoingresojuan1').checked=true
	document.getElementById('inptCheckegresoingresojuan2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarEgresoIngresoJuanF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarEgresoIngresoJuanF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
		document.getElementById('inptCheckegresoingresojuan1').checked=false
		document.getElementById('inptCheckegresoingresojuan2').checked=true
		document.getElementById('inptBuscarEgresoIngresoJuanF1').value="";
		document.getElementById('inptBuscarEgresoIngresoJuanF2').value="";
	}
}
function buscarabmEgresoIngresoJuan() {	
	var listado=iniciarListadoAbmEgresoIngresoJuan();
	var fecha1 = document.getElementById('inptBuscarEgresoIngresoJuanF1').value
	var fecha2 = document.getElementById('inptBuscarEgresoIngresoJuanF2').value
	var estado =""
	if(document.getElementById('inptSeleccEstadoBuscarEgresoIngresoJuan1').checked==true){
		estado="Activo"
	}else{
		estado="Inactivo"
	}
	var tipo = document.getElementById('inptSeleccTipoBuscarEgresoIngresoJuan').value
	var arreglo = document.getElementById('inptSeleccArregloBuscarEgresoIngresoJuan').value
	var cod_local = document.getElementById('inptlocalMisEgresoIngresoJuanBusca').value
	var fecha = document.getElementById('inptBuscarEgresoIngresoJuan2').value
	var usuario = document.getElementById('inptBuscarEgresoIngresoJuan1').value
	var motivo = '';
	
	$("input[id=inptBuscarEgresoIngresoJuan3]").each(function (i, Elemento) {
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
	
	var nroboleta = document.getElementById('inptBuscarEgresoIngresoJuan5').value
	var monto = document.getElementById('inptBuscarEgresoIngresoJuan8').value
	var confirmado = document.getElementById('inptConfirmadoMisEgresoIngresoJuanBusca').value
	var banco = document.getElementById('inptBuscarEgresoIngresoJuan4').value
	// var banco = $('#inptBuscarEgresoIngresoJuan4').find('option:selected').text();
	// if(banco == 'SELECCIONAR'){
		// banco = '';
	// }
	
	var permisover="SI";
	// if(controlacceso2("VERTODOSEGRESOINGRESO","accion")!=false){permisover="SI"}
	
	
	
	
	document.getElementById("table_abm_egresoingresojuan").innerHTML = paginacargando
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
		"agrupacionformularioegresoingreso": agrupacionformularioegresoingresojuan,
		"permisover": permisover,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmegresoingresojuan.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_egresoingresojuan").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_egresoingresojuan").innerHTML = ''
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
					document.getElementById("inptTotalEgresoIngresoJuan").value = datos[4];
					document.getElementById("inptRegistroNroEgresoIngresoJuan").value = datos[3];
					document.getElementById('btnEditarEgresoIngresoJuan').style.backgroundColor="#b7b7b7";
					document.getElementById('btnConfirmarEgresoIngresoJuan').style.backgroundColor="#b7b7b7";
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
	document.addEventListener("DOMContentLoaded",iniciarListadoAbmEgresoIngresoJuan);
}else{
	iniciarListadoAbmEgresoIngresoJuan();
}
function limpiarcamposEgresoIngresoJuan() {
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaEgresoIngresoJuan').value = f.getFullYear() + "-" + mes + "-" + dia;
	document.getElementById('inptFechaDepositoEgresoIngresoJuan').value ="";
	document.getElementById('inptMotivoMisEgresoIngresoJuan').value ="";
	document.getElementById('inptMontoEgresoIngresoJuan').value = "";
	document.getElementById('inptRegistroSeleccEgresoIngresoJuan').value = "";
	document.getElementById('inptMotivoEgresoIngresoJuan').value = "";
	document.getElementById('inptPersonalEgresoIngresoJuan').value = "";
	document.getElementById('inptNroBoletaEgresoIngresoJuan').value = "";
	document.getElementById('inptBancoEgresoIngresoJuan').value = "";
	document.getElementById('inptCuentaEgresoIngresoJuan').value = "";
	document.getElementById('inptArregloEgresoIngresoJuan').value = "";
	document.getElementById('inptlocalMisEgresoIngresoJuan').value = "";
	document.getElementById('btnEditarEgresoIngresoJuan').style.backgroundColor="#b7b7b7";
	document.getElementById('btnConfirmarEgresoIngresoJuan').style.backgroundColor="#b7b7b7";
	document.getElementById('inptEstadoEgresoIngresoJuan').value = "Activo";
	document.getElementById('btnAbmEgresoIngresoJuan').value = "Guardar datos";
	idAbmEgresoIngresoJuan = "";
	seleccionarLocalUSer()
	
	$("div[id=imgFotoEgresoIngresoJuan]").css({"background-image":"url()"});
	fotoegresoingresojuan="";
	extegresoingresojuan="";
}
var agrupacionformularioegresoingresojuan = "1"
function cambiarTipoEgresoIngresoJuan(d){
document.getElementById("btnEgresoIngresoJuan1").style=""
document.getElementById("btnEgresoIngresoJuan2").style=""
if(d=="1"){
	document.getElementById("btnEgresoIngresoJuan1").style="background-color:#ff9800;color:#fff"
	agrupacionformularioegresoingresojuan="1";
}else{
	document.getElementById("btnEgresoIngresoJuan2").style="background-color:#ff9800;color:#fff"
	agrupacionformularioegresoingresojuan="2";
}
}
// CARGAR FOTO GASTO JUAN
function ExploradorImagenEgresoIngresoJuan(File){	
$("input[name="+File+"]").click();
}
var fotoegresoingresojuan="";
var extegresoingresojuan="";
function readFileEgresoIngresoJuan(input){		
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
	extegresoingresojuan=file_extension;
fotoegresoingresojuan=e.target.result;
 $("div[id=imgFotoEgresoIngresoJuan]").css({"background-image":"url("+fotoegresoingresojuan+")"})
}
reader.readAsDataURL(input.files[0]);
}

