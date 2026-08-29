// Ocultar splash y mostrar modal
function ocultarIntro() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('modalBienvenida').style.display = 'flex';
}

// Cerrar modal de bienvenida
function cerrarModal() {
  const modal = document.getElementById('modalBienvenida');
  modal.style.display = 'none';
}

// Lanzar ocultarIntro tras 8 segundos (para que la frase alcance a escribirse)
window.addEventListener('load', () => {
  setTimeout(() => {
    ocultarIntro();
  }, 8000); // 8 segundos
});

// Frase motivadora con animación de tipeo
document.addEventListener("DOMContentLoaded", function() {
  const fraseElemento = document.getElementById('frase-motivadora');
  const frases = [
  "Hoy es un gran día para dar lo mejor de ti 💪",
  "Confía en ti. Cada paso te acerca a tu meta 🚀",
  "Cree en el proceso, los frutos llegarán 🌱",
  "Tú puedes con esto y con mucho más 💥",
  "No hay límites para una mente decidida 🧠",
  "El éxito es la suma de pequeños esfuerzos diarios 📈",
  "Tu actitud determina tu altitud 🌄",
  "Levántate con propósito, trabaja con pasión 💼",
  "El único límite eres tú mismo 🌟",
  "Persiste, insiste y nunca te rindas ⚡",
  "La disciplina supera al talento cuando el talento no se disciplina 🏋️",
  "Haz que cada día cuente 📆",
  "Actitud positiva = resultados positivos ☀️",
  "Sé más fuerte que tu excusa 🚫",
  "No esperes por la oportunidad, créala 🛠️",
  "Cada esfuerzo suma 💡",
  "Tu constancia vale más que mil ideas 💬",
  "Todo gran logro comienza con la decisión de intentarlo ✅",
  "Hazlo aunque te dé miedo 😨➡️💪",
  "Cuanto más trabajas, más suerte tenés 🍀",
  "Todo esfuerzo tiene su recompensa 🏆",
  "La acción vence a la preocupación 🧘",
  "Si no puedes volar, corre. Pero avanza 🏃‍♂️",
  "Confía en el proceso, incluso si no ves resultados inmediatos ⏳",
  "No importa cuán lento vayas, nunca te detengas 🐢",
  "Una mentalidad positiva lo cambia todo 🧠✨",
  "Haz que suceda 🔥",
  "Donde hay voluntad, hay camino 🛤️",
  "Tu esfuerzo de hoy es tu orgullo de mañana 🪞",
  "Mantente enfocado y sigue adelante 🎯",
  "Pequeños pasos, grandes logros 👣",
  "Empieza ahora, no esperes el momento perfecto ⏱️",
  "Cada día es una nueva oportunidad de crecer 🌿",
  "La excelencia no es un acto, es un hábito 🛠️",
  "Aprende algo nuevo cada día 📚",
  "Haz de tu esfuerzo tu mejor carta de presentación 🪪",
  "El compromiso diario marca la diferencia ✍️",
  "Cada reto es una oportunidad de mejorar 🔎",
  "Superar dificultades te hace más fuerte 🧗",
  "Confía en tu potencial, y supérate 💡",
  "El cambio empieza contigo mismo 🔄",
  "La pasión impulsa al talento 🚀",
  "Avanzar un paso cada día te lleva lejos 👣",
  "Los errores enseñan más que los éxitos 📘",
  "Trabaja duro en silencio, que los resultados hablen 💬",
  "La constancia te hace imparable 🏃‍♀️",
  "La meta no es el final, es el comienzo de un nuevo nivel 🌟",
  "El compromiso es la llave del progreso 🗝️",
  "Construye confianza con tus acciones, no con tus palabras 🛠️",
  "Hoy puedes ser mejor que ayer ⏳" 
];


  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

  function escribirTexto(texto, elemento, velocidad = 45) {
    let i = 0;
    function escribir() {
      if (i < texto.length) {
        elemento.textContent += texto.charAt(i);
        i++;
        setTimeout(escribir, velocidad);
      }
    }
    escribir();
  }

  escribirTexto(fraseAleatoria, fraseElemento, 45);
});

// (opcional) función para progreso, solo si la necesitás

function setProgress(porcentaje) {
  const progressBar = document.getElementById("progressBar");
  if(progressBar){
    progressBar.style.width = porcentaje + "%";
  }
}

function pintarBadgeContadorPendiente(ids, total) {
	total = parseInt(total, 10);
	if (isNaN(total)) {
		total = 0;
	}

	for (var i = 0; i < ids.length; i++) {
		var badge = document.getElementById(ids[i]);
		if (!badge) {
			continue;
		}

		badge.innerHTML = total;
		badge.style.display = total > 0 ? "" : "none";

		if (total > 0) {
			badge.classList.add("vibrate");
		} else {
			badge.classList.remove("vibrate");
		}
	}
}

function actualizarContadoresPendientesSolicitudCreditoMenu() {
	if (typeof $ === "undefined") {
		return;
	}

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarContadoresPendientesSolicitudCreditoMenu"
	};

	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		error: function () {
			pintarBadgeContadorPendiente(["badgePendientesReferenciasDirecto", "badgePendientesReferenciasAdministrativo"], 0);
			pintarBadgeContadorPendiente(["badgePendientesEquifaxDirecto", "badgePendientesEquifaxAdministrativo"], 0);
			pintarBadgeContadorPendiente(["badgePendientesCreditoAprobarDirecto"], 0);
		},
		success: function (responseText) {
			try {
				var respuestaJson = $.parseJSON(responseText);
				var respuesta = respuestaJqueryAjax(respuestaJson["1"]);

				if (respuesta == true) {
					var contadores = respuestaJson[2] || {};
					pintarBadgeContadorPendiente(["badgePendientesReferenciasDirecto", "badgePendientesReferenciasAdministrativo"], contadores.referencias);
					pintarBadgeContadorPendiente(["badgePendientesEquifaxDirecto", "badgePendientesEquifaxAdministrativo"], contadores.equifax);
					pintarBadgeContadorPendiente(["badgePendientesCreditoAprobarDirecto"], contadores.creditos);
				}
			} catch (error) {
				if (typeof GuardarArchivosLog === "function") {
					GuardarArchivosLog("Error contador pendientes solicitud credito: " + error + " \r\n Consola: " + responseText);
				}
			}
		}
	});
}

document.addEventListener("DOMContentLoaded", function() {
	setTimeout(function() {
		actualizarContadoresPendientesSolicitudCreditoMenu();
	}, 1000);
});





function vercerrarventanamenu(nro){
	if(nro=="10"){
		nro="1";
	}

	    document.getElementById("ContenedorAccesoDirecto").style.display="none";
		document.getElementById("ContenedorListado").style.display="none";
		document.getElementById("ContenedorAdministrativo").style.display="none";
		document.getElementById("ContenedorInforme").style.display="none";
		document.getElementById("ContenedorSistema").style.display="none";
		document.getElementById("ContenedorGraficos").style.display="none";
		document.getElementById("ContenedorTesoreria").style.display="none";
		document.getElementById("ContenedorCobranza").style.display="none";
		document.getElementById("ContenedorVentas").style.display="none";
	
	if(nro=="1"){
		document.getElementById("ContenedorAccesoDirecto").style.display=""; 
	}	
	
	if(nro=="2"){ 
		document.getElementById("ContenedorListado").style.display=""; 
	}	
	
	if(nro=="3"){ 
		document.getElementById("ContenedorAdministrativo").style.display=""; 
	}
		
	if(nro=="4"){ 
		document.getElementById("ContenedorInforme").style.display=""; 
	}
		
	if(nro=="5"){ 
		document.getElementById("ContenedorSistema").style.display="";
	}
	
	if(nro=="6"){ 
		document.getElementById("ContenedorTesoreria").style.display=""; 
	}
	
	if(nro=="7"){
		buscarDatosDash() 
		document.getElementById("ContenedorGraficos").style.display=""; 
	}
	if(nro=="8"){
		document.getElementById("ContenedorCobranza").style.display=""; 
	}
	if(nro=="9"){
		document.getElementById("ContenedorVentas").style.display=""; 
	}
}





//ARRIBA ES PARTE DE DISEÑO
//////////////////////////////////////////////////////////////////////////////////
//ABAJO ES PARTE DE FUNCIONAMIENTOS 



/*
INFORME DE CALLCENTER
*/
function elementoBalanceGeneral(id){
	return document.getElementById(id);
}

var BALANCE_GENERAL_ACCESO_OCULTO = false;

function tieneAccesoBalanceGeneral(){
	if(typeof tieneAccesoUsuario=="function"){
		return tieneAccesoUsuario("VERBALANCEGENERAL","accion");
	}
	if(typeof accesosuser=="undefined" || !accesosuser){
		return true;
	}
	if(!accesosuser["VERBALANCEGENERAL"]){
		return false;
	}
	return accesosuser["VERBALANCEGENERAL"]["accion"]=="SI";
}

function informarSinAccesoBalanceGeneral(){
	if(typeof controlacceso=="function" && typeof accesosuser!="undefined" && accesosuser && accesosuser["VERBALANCEGENERAL"]){
		controlacceso("VERBALANCEGENERAL","accion");
		return;
	}
	ver_vetana_informativa("NO TIENES PERMISO PARA ACCEDER");
}

function cerrarBalanceGeneralOculto(){
	var segundoPlano=elementoBalanceGeneral("divSegundoPlano");
	var ids=[
		"divAbmInformeBalanceGeneral",
		"divMinimizadoBalanceGeneral",
		"resumenModalGastoBalanceGeneral",
		"modalDetalleGrupoBalanceGeneral"
	];
	if(segundoPlano){
		segundoPlano.style.display="none";
	}
	for(var i=0;i<ids.length;i++){
		var el=elementoBalanceGeneral(ids[i]);
		if(el){
			el.style.display="none";
		}
	}
}

function htmlModuloBalanceGeneral(modoMain){
	var accionesBalanceGeneral = [
		"<button type='button' class='balance-general-icon-btn' onclick='window.print()' title='Imprimir'><img src='/GoodVentaElectroCasaMaric/iconos/imprimir.png' alt='Imprimir'></button>"
	];
	if(modoMain!==true){
		accionesBalanceGeneral.push("<button type='button' class='balance-general-icon-btn' onclick='minimizarBalanceGeneral()' title='Minimizar'><img src='/GoodVentaElectroCasaMaric/iconos/minimizar2.png' alt='Minimizar'></button>");
		accionesBalanceGeneral.push("<button type='button' class='balance-general-icon-btn balance-general-icon-btn--danger' onclick='verCerrarBalanceGeneral()' title='Cerrar'><img src='/GoodVentaElectroCasaMaric/iconos/botonCerrar.png' alt='Cerrar'></button>");
	}
	return [
		"<section class='balance-general-shell'>",
			"<header class='balance-general-header'>",
				"<div class='balance-general-brand'>",
					"<span class='balance-general-brand__icon'><i class='bx bx-bar-chart-alt-2'></i></span>",
					"<div>",
						"<span class='balance-general-brand__eyebrow'>Good-Venta Intelligence</span>",
						"<h2>Balance General</h2>",
						"<p>Activos, pasivos y patrimonio neto acumulados hasta la fecha de corte.</p>",
					"</div>",
				"</div>",
				"<div class='balance-general-window-actions'>",
					accionesBalanceGeneral.join(""),
				"</div>",
			"</header>",
			"<div class='balance-general-toolbar'>",
				"<div class='balance-general-filter-card'>",
					"<label for='inptBuscarBalanceGeneralF2'>Fecha de corte</label>",
					"<input type='date' id='inptBuscarBalanceGeneralF2' class='balance-general-input'>",
				"</div>",
				"<div class='balance-general-filter-card'>",
					"<label for='inptEstadoBalanceGeneral'>Estado</label>",
					"<select class='inputSelect balance-general-input' id='inptEstadoBalanceGeneral'>",
						"<option value='Activo'>ACTIVO</option>",
						"<option value='Inactivo'>INACTIVO</option>",
						"<option value=''>TODOS</option>",
					"</select>",
				"</div>",
				"<button type='button' class='balance-general-primary-btn' onclick='BuscarBalanceGeneral()'><i class='bx bx-search'></i><span>Buscar</span></button>",
			"</div>",
			"<div class='balance-general-fast-stats'>",
				"<div class='balance-general-fast-stat'><span>Registros</span><input type='text' id='inptTotalRegistroBalanceGeneralEmpresa' disabled></div>",
				"<div class='balance-general-fast-stat balance-general-fast-stat--activo'><span>Total activos</span><input type='text' id='inptTotalActivoBalanceGeneral' disabled></div>",
				"<div class='balance-general-fast-stat balance-general-fast-stat--pasivo'><span>Total pasivos</span><input type='text' id='inptTotalPasivoBalanceGeneral' disabled></div>",
				"<div class='balance-general-fast-stat balance-general-fast-stat--patrimonio'><span>Patrimonio neto</span><input type='text' id='inptTotalPatrimonioBalanceGeneral' disabled></div>",
			"</div>",
			"<main class='balance-general-main'>",
				"<section class='balance-general-panel'>",
					"<div class='balance-general-panel-head'>",
						"<div>",
							"<span>Estado de situacion</span>",
							"<h3>Detalle financiero de la empresa</h3>",
						"</div>",
						"<strong>Patrimonio = Activos - Pasivos</strong>",
					"</div>",
					"<div class='balance-general-contenedor' id='table_abm_BalanceGeneral'>",
						"<div class='balance-general-empty'><strong>Esperando consulta</strong><span>Seleccione una fecha de corte y presione Buscar.</span></div>",
					"</div>",
				"</section>",
			"</main>",
			"<div class='balance-general-legacy-totales' aria-hidden='true'>",
				"<input type='date' id='inptBuscarBalanceGeneralF1'>",
				"<select id='inptLocalBalanceGeneral'></select>",
				"<input type='text' id='inptUsuarioBalanceGeneral'>",
				"<input type='text' id='inptTotalRegistroBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalEntregaBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalCargoAdministrivoBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalInteresBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalCreditoBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalContadoBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalCobranzaBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalGastoBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalDepositarBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalTransferenciaBalanceGeneral' disabled>",
				"<input type='text' id='inptTotalDiferenciaBalanceGeneral' disabled>",
			"</div>",
		"</section>"
	].join("");
}

function asegurarEstructuraBalanceGeneral(){
	var contenedorMain=elementoBalanceGeneral("ContenedorBalanceGeneral");
	var ventana=contenedorMain || elementoBalanceGeneral("divAbmInformeBalanceGeneral");
	if(!ventana){
		return null;
	}
	var esMain=ventana.id=="ContenedorBalanceGeneral";
	if(ventana.getAttribute("data-balance-reestructurado")!="1"){
		ventana.className=esMain ? "contenedorAccesoDirecto balance-general-modulo balance-general-modulo--main" : "principal2 balance-general-modulo";
		ventana.innerHTML=htmlModuloBalanceGeneral(esMain);
		ventana.setAttribute("data-balance-reestructurado","1");
	}
	var formularioViejo=elementoBalanceGeneral("divAbmInformeBalanceGeneral");
	if(formularioViejo && formularioViejo!==ventana){
		formularioViejo.innerHTML="";
		formularioViejo.style.display="none";
		formularioViejo.setAttribute("aria-hidden","true");
	}
	return ventana;
}

function prepararModuloBalanceGeneralAlCargar(){
	if(document.readyState=="loading"){
		document.addEventListener("DOMContentLoaded", function(){
			asegurarEstructuraBalanceGeneral();
		});
	}else{
		asegurarEstructuraBalanceGeneral();
	}
}

prepararModuloBalanceGeneralAlCargar();

var ZINDEX_BALANCE_GENERAL = 2147483646;

function ocultarCapasSuperpuestasBalanceGeneral(ventana){
	var ids = [
		"divSegundoPlano",
		"splash",
		"modalBienvenida",
		"contenedorModal",
		"modalConfirmacion",
		"panelControlDashFondo",
		"panelControlDash",
		"divActualizarSistema",
		"divSaludoGoodSystem"
	];
	for(var i=0;i<ids.length;i++){
		var capa=document.getElementById(ids[i]);
		if(capa && capa!==ventana && !(ventana && ventana.contains(capa))){
			capa.style.display="none";
		}
	}
	var fondos=document.querySelectorAll(".modal-backdrop, .modal-overlay");
	for(var f=0;f<fondos.length;f++){
		if(fondos[f] && !(ventana && ventana.contains(fondos[f]))){
			fondos[f].style.display="none";
		}
	}
}

function aplicarEstiloFrontalBalanceGeneral(ventana){
	if(!ventana){
		return;
	}
	if(ventana.classList){
		ventana.classList.add("balance-general-modulo--visible");
	}
	ventana.style.setProperty("display","block","important");
	ventana.style.setProperty("position","fixed","important");
	ventana.style.setProperty("left","0","important");
	ventana.style.setProperty("top","0","important");
	ventana.style.setProperty("right","0","important");
	ventana.style.setProperty("bottom","0","important");
	ventana.style.setProperty("width","100vw","important");
	ventana.style.setProperty("height","100vh","important");
	ventana.style.setProperty("min-width","100vw","important");
	ventana.style.setProperty("min-height","100vh","important");
	ventana.style.setProperty("z-index",String(ZINDEX_BALANCE_GENERAL),"important");
	ventana.style.setProperty("visibility","visible","important");
	ventana.style.setProperty("opacity","1","important");
	ventana.style.setProperty("pointer-events","auto","important");
	ventana.style.setProperty("overflow","auto","important");
	ventana.style.setProperty("background","#f8fafc","important");
	ventana.style.setProperty("transform","none","important");
	ventana.style.setProperty("filter","none","important");
}

function traerBalanceGeneralAlFrente(ventana){
	if(!ventana){
		return;
	}
	if(document.body){
		document.body.appendChild(ventana);
	}
	ocultarCapasSuperpuestasBalanceGeneral(ventana);
	aplicarEstiloFrontalBalanceGeneral(ventana);
	if(document.body && document.body.classList){
		document.body.classList.add("balance-general-abierto");
	}
}

function ventanaVisibleBalanceGeneral(ventana){
	if(!ventana){
		return false;
	}
	if(ventana.style.display=="none"){
		return false;
	}
	if(typeof window!="undefined" && typeof window.getComputedStyle=="function"){
		return window.getComputedStyle(ventana).display!="none";
	}
	return ventana.style.display!="none";
}

function mostrarElementoBalanceGeneral(elemento){
	if(elemento){
		if(elemento.classList){
			elemento.classList.add("balance-general-modulo--visible");
		}
		elemento.style.display="block";
	}
}

function ocultarElementoBalanceGeneral(elemento){
	if(!elemento){
		return;
	}
	if(elemento.classList){
		elemento.classList.remove("balance-general-modulo--visible");
	}
	if(document.body && document.body.classList){
		document.body.classList.remove("balance-general-abierto");
	}
	if(elemento.id=="divAbmInformeBalanceGeneral"){
		elemento.style.setProperty("display","none","important");
		elemento.style.setProperty("visibility","hidden","important");
		elemento.style.setProperty("pointer-events","none","important");
		return;
	}
	if(typeof $ == "function"){
		$(elemento).fadeOut(250);
	}else{
		elemento.style.display="none";
	}
}

function mostrarVentanaBalanceGeneral(ventana,minimizado){
	if(elementoBalanceGeneral("ContenedorBalanceGeneral")){
		if(typeof vercerrarventanamenu=="function"){
			vercerrarventanamenu("11");
		}else{
			mostrarBalanceGeneralEnMain();
		}
		return;
	}
	if(BALANCE_GENERAL_ACCESO_OCULTO){
		cerrarBalanceGeneralOculto();
		return false;
	}
	ventana=asegurarEstructuraBalanceGeneral();
	if(!ventana){
		ver_vetana_informativa("NO SE ENCONTRO LA VENTANA DE BALANCE GENERAL");
		return;
	}
	if(typeof mostrarSoloUno=="function"){
		mostrarSoloUno("divAbmInformeBalanceGeneral");
	}
	traerBalanceGeneralAlFrente(ventana);
	mostrarElementoBalanceGeneral(ventana);
	if(minimizado){
		minimizado.style.display="none";
	}
	prepararFechaCorteBalanceGeneral();
	BuscarBalanceGeneral();
}

function mostrarBalanceGeneralEnMain(){
	var contenedor=asegurarEstructuraBalanceGeneral();
	if(!contenedor){
		ver_vetana_informativa("NO SE ENCONTRO EL MODULO DE BALANCE GENERAL");
		return false;
	}
	if(contenedor.classList){
		contenedor.classList.add("balance-general-modulo--visible");
	}
	contenedor.style.display="";
	contenedor.style.visibility="visible";
	contenedor.style.pointerEvents="auto";
	prepararFechaCorteBalanceGeneral();
	BuscarBalanceGeneral();
	return true;
}

function verCerrarBalanceGeneral(){
	if(elementoBalanceGeneral("ContenedorBalanceGeneral")){
		if(typeof vercerrarventanamenu=="function"){
			vercerrarventanamenu("11");
		}else{
			mostrarBalanceGeneralEnMain();
		}
		return false;
	}
	if(BALANCE_GENERAL_ACCESO_OCULTO){
		cerrarBalanceGeneralOculto();
		return false;
	}
	var segundoPlano=elementoBalanceGeneral("divSegundoPlano");
	if(segundoPlano){
		segundoPlano.style.display="none";
	}

	var ventana=asegurarEstructuraBalanceGeneral();
	if(!ventana){
		ver_vetana_informativa("NO SE ENCONTRO LA VENTANA DE BALANCE GENERAL");
		return;
	}

	var minimizado=elementoBalanceGeneral("divMinimizadoBalanceGeneral");
	if(ventanaVisibleBalanceGeneral(ventana)){
		if(minimizado){
			minimizado.style.display="none";
		}
		ocultarElementoBalanceGeneral(ventana);
		return;
	}

	if(tieneAccesoBalanceGeneral()==true){
		mostrarVentanaBalanceGeneral(ventana,minimizado);
		return;
	}

	if(typeof refrescarAccesosUsuarioActualServidor=="function"){
		refrescarAccesosUsuarioActualServidor(function(refrescado){
			if(refrescado && tieneAccesoBalanceGeneral()==true){
				mostrarVentanaBalanceGeneral(ventana,minimizado);
				return;
			}
			informarSinAccesoBalanceGeneral();
		});
		return;
	}

	informarSinAccesoBalanceGeneral();
}

function verCerrarFrmReportBalanceGeneral(){
	verCerrarBalanceGeneral();
}
 
 
 function minimizarBalanceGeneral(){ 
	if(BALANCE_GENERAL_ACCESO_OCULTO){
		cerrarBalanceGeneralOculto();
		return false;
	}
	var ventana=elementoBalanceGeneral("divAbmInformeBalanceGeneral");
	var minimizado=elementoBalanceGeneral("divMinimizadoBalanceGeneral");
	ocultarElementoBalanceGeneral(ventana);
	if(minimizado){
		minimizado.style.display="";
	}
	var menu=elementoBalanceGeneral("divMenuBalanceGeneral");
	if(menu && typeof copiarBotonEnContenedor=="function"){
		copiarBotonEnContenedor(menu);
	}
}
function verCerrarInformeBalanceGeneral(){ 
	var modal=elementoBalanceGeneral("resumenModal");
	if(!modal){
		return;
	}
	if(modal.style.display==""){
		modal.style.display="none"
	}else{	
		modal.style.display=""
	}
}

function fechaActualBalanceGeneral(){
	var f = new Date();
	var dia = f.getDate();
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1;
	if (mes < 10) {
		mes = "0" + mes;
	}
	return f.getFullYear() + "-" + mes + "-" + dia;
}

function prepararFechaCorteBalanceGeneral(){
	if(document.getElementById('inptBuscarBalanceGeneralF1')){
		document.getElementById('inptBuscarBalanceGeneralF1').value = "";
	}
	if(document.getElementById('inptBuscarBalanceGeneralF2') && document.getElementById('inptBuscarBalanceGeneralF2').value==""){
		document.getElementById('inptBuscarBalanceGeneralF2').value = fechaActualBalanceGeneral();
	}
}
 
function checkInformeRangoFechaBalanceGeneral(d){	
	if(document.getElementById('checkInformeRangoFechaBalanceGeneral1')){
		document.getElementById('checkInformeRangoFechaBalanceGeneral1').checked=false
	}
	if(document.getElementById('checkInformeRangoFechaBalanceGeneral2')){
		document.getElementById('checkInformeRangoFechaBalanceGeneral2').checked=true
	}
	prepararFechaCorteBalanceGeneral()
}
 
 
function limpiarTotalesBalanceGeneralEmpresa(){
	if(document.getElementById("inptTotalRegistroBalanceGeneralEmpresa")){
		document.getElementById("inptTotalRegistroBalanceGeneralEmpresa").value = "";
	}
	if(document.getElementById("inptTotalActivoBalanceGeneral")){
		document.getElementById("inptTotalActivoBalanceGeneral").value = "";
	}
	if(document.getElementById("inptTotalPasivoBalanceGeneral")){
		document.getElementById("inptTotalPasivoBalanceGeneral").value = "";
	}
	if(document.getElementById("inptTotalPatrimonioBalanceGeneral")){
		document.getElementById("inptTotalPatrimonioBalanceGeneral").value = "";
	}
}

function estadoModuloBalanceGeneral(tipo,titulo,mensaje){
	var clase="balance-general-empty";
	if(tipo=="cargando"){
		clase+=" balance-general-empty--loading";
	}
	if(tipo=="error"){
		clase+=" balance-general-empty--error";
	}
	return "<div class='"+clase+"'><strong>"+titulo+"</strong><span>"+mensaje+"</span></div>";
}

function parsearRespuestaJsonEmpresa(responseText){
	if(typeof responseText=="object" && responseText!==null){
		return responseText;
	}
	return $.parseJSON(responseText);
}

function textoRespuestaJsonEmpresa(responseText){
	if(typeof responseText=="string"){
		return responseText;
	}
	try{
		return JSON.stringify(responseText);
	}catch(error){
		return String(responseText);
	}
}

function BuscarBalanceGeneral() { 
	if(BALANCE_GENERAL_ACCESO_OCULTO){
		cerrarBalanceGeneralOculto();
		return false;
	}
	asegurarEstructuraBalanceGeneral();
	prepararFechaCorteBalanceGeneral()
	var tabla=elementoBalanceGeneral("table_abm_BalanceGeneral");
	var inputFecha=elementoBalanceGeneral("inptBuscarBalanceGeneralF2");
	var inputEstado=elementoBalanceGeneral("inptEstadoBalanceGeneral");
	if(!tabla || !inputFecha || !inputEstado){
		ver_vetana_informativa("FALTAN CAMPOS PARA CARGAR EL BALANCE GENERAL");
		return;
	}
	var fecha1=""
	var fecha2=inputFecha.value
	var estado=inputEstado.value
	
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE CORTE")
		return
	}
    
	tabla.innerHTML = estadoModuloBalanceGeneral("cargando","Cargando balance","Consultando activos, pasivos y patrimonio de la empresa.")
	limpiarTotalesBalanceGeneralEmpresa()
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"fecha_corte": fecha2,
		"estado": estado, 	 
		"funt": "balance"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmPatrimonioEmpresa.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			tabla.innerHTML = estadoModuloBalanceGeneral("error","No se pudo cargar","El servidor no respondio correctamente. Intente buscar nuevamente.")
			limpiarTotalesBalanceGeneralEmpresa()
			 
		},
		success: function (responseText) {
			var Respuesta = responseText;
			try {
				var datos = parsearRespuestaJsonEmpresa(Respuesta);
					Respuesta = datos["1"];
					Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if(Array.isArray(datos[2])){
						AbmListadoCompat.establecer(tabla, datos[2], false)
					}else{
						tabla.innerHTML = datos[2] ? datos[2] : estadoModuloBalanceGeneral("error","Sin datos","No se encontraron registros para la fecha seleccionada.")
					}
					if(elementoBalanceGeneral("inptTotalActivoBalanceGeneral")) elementoBalanceGeneral("inptTotalActivoBalanceGeneral").value = datos[3];
					if(elementoBalanceGeneral("inptTotalPasivoBalanceGeneral")) elementoBalanceGeneral("inptTotalPasivoBalanceGeneral").value = datos[4];
					if(elementoBalanceGeneral("inptTotalPatrimonioBalanceGeneral")) elementoBalanceGeneral("inptTotalPatrimonioBalanceGeneral").value = datos[5];
					if(elementoBalanceGeneral("inptTotalRegistroBalanceGeneralEmpresa")) elementoBalanceGeneral("inptTotalRegistroBalanceGeneralEmpresa").value = datos[6];
				}else{
					tabla.innerHTML = estadoModuloBalanceGeneral("error","Consulta rechazada","No se pudo obtener el Balance General con los filtros actuales.")
				}
			} catch (error) { 
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+textoRespuestaJsonEmpresa(responseText)
				GuardarArchivosLog(titulo)
				tabla.innerHTML = estadoModuloBalanceGeneral("error","Error de lectura","El balance respondio con un formato no valido. Revise el log generado.")
				limpiarTotalesBalanceGeneralEmpresa()
			}
		}
	});
}

function limpiarSeleccionBalanceGeneral(){
	var filas=document.querySelectorAll(".balance-general-grupo");
	for(var i=0;i<filas.length;i++){
		filas[i].classList.remove("balance-general-grupo--seleccionado");
	}
}

function abrirDetalleGrupoBalanceGeneralConTecla(evento, idDetalle, fila){
	if(!evento){
		return;
	}
	if(evento.key=="Enter" || evento.key==" " || evento.key=="Spacebar"){
		if(typeof evento.preventDefault=="function"){
			evento.preventDefault();
		}
		abrirDetalleGrupoBalanceGeneral(idDetalle, fila);
	}
}

function abrirDetalleGrupoBalanceGeneral(idDetalle, fila){
	var origen=document.getElementById(idDetalle);
	var modal=document.getElementById("modalDetalleGrupoBalanceGeneral");
	var contenido=document.getElementById("contenidoDetalleGrupoBalanceGeneral");
	var titulo=document.getElementById("tituloDetalleGrupoBalanceGeneral");
	if(!origen || !modal || !contenido){
		return;
	}
	limpiarSeleccionBalanceGeneral();
	if(fila && fila.classList){
		fila.classList.add("balance-general-grupo--seleccionado");
	}
	if(titulo){
		var tituloOrigen=origen.getElementsByTagName("h3")[0];
		titulo.innerHTML=tituloOrigen ? tituloOrigen.innerHTML : "Detalle del balance";
	}
	contenido.innerHTML=origen.innerHTML;
	modal.style.display="flex";
	var filtro=document.getElementById("inptFiltroDetalleGrupoBalanceGeneral");
	if(filtro){
		filtro.value="";
	}
	actualizarCantidadFiltroDetalleGrupoBalanceGeneral();
	setTimeout(function(){
		if(filtro){
			filtro.focus();
		}
	},80);
}

function cerrarDetalleGrupoBalanceGeneral(evento){
	if(evento && evento.target && evento.target.id!="modalDetalleGrupoBalanceGeneral"){
		return;
	}
	var modal=document.getElementById("modalDetalleGrupoBalanceGeneral");
	if(modal){
		modal.style.display="none";
	}
	limpiarSeleccionBalanceGeneral();
	var contenido=document.getElementById("contenidoDetalleGrupoBalanceGeneral");
	if(contenido){
		contenido.innerHTML="";
	}
	var filtro=document.getElementById("inptFiltroDetalleGrupoBalanceGeneral");
	if(filtro){
		filtro.value="";
	}
	actualizarCantidadFiltroDetalleGrupoBalanceGeneral();
}

function textoFiltroBalanceGeneral(texto){
	if(texto==null || typeof texto=="undefined"){
		return "";
	}
	texto=String(texto).toUpperCase();
	if(typeof texto.normalize=="function"){
		texto=texto.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
	}
	return texto;
}

function obtenerFilasDetalleGrupoBalanceGeneral(){
	var contenido=document.getElementById("contenidoDetalleGrupoBalanceGeneral");
	if(!contenido){
		return [];
	}
	var tabla=contenido.getElementsByTagName("table")[0];
	if(!tabla){
		return [];
	}
	var tbody=tabla.getElementsByTagName("tbody")[0];
	if(!tbody){
		return [];
	}
	return tbody.getElementsByTagName("tr");
}

function actualizarCantidadFiltroDetalleGrupoBalanceGeneral(){
	var filas=obtenerFilasDetalleGrupoBalanceGeneral();
	var etiqueta=document.getElementById("lblFiltroDetalleGrupoBalanceGeneral");
	if(!etiqueta){
		return;
	}
	var total=filas.length;
	var visibles=0;
	for(var i=0;i<filas.length;i++){
		if(filas[i].style.display!="none"){
			visibles++;
		}
	}
	if(total==0){
		etiqueta.innerHTML="";
	}else{
		etiqueta.innerHTML=visibles+" de "+total;
	}
}

function filtrarDetalleGrupoBalanceGeneral(){
	var filtro=document.getElementById("inptFiltroDetalleGrupoBalanceGeneral");
	var filas=obtenerFilasDetalleGrupoBalanceGeneral();
	var texto=textoFiltroBalanceGeneral(filtro ? filtro.value : "");
	var palabras=texto.split(" ");
	for(var i=0;i<filas.length;i++){
		var contenido=textoFiltroBalanceGeneral(filas[i].textContent || filas[i].innerText || "");
		var visible=true;
		for(var p=0;p<palabras.length;p++){
			if(palabras[p]!="" && contenido.indexOf(palabras[p])<0){
				visible=false;
				break;
			}
		}
		filas[i].style.display=visible ? "" : "none";
	}
	actualizarCantidadFiltroDetalleGrupoBalanceGeneral();
}

document.addEventListener("keydown", function(evento){
	if(evento.key=="Escape"){
		cerrarDetalleGrupoBalanceGeneral();
	}
});


function verCerrarTablaGastoBalanceGeneral(){ 
	var modal=elementoBalanceGeneral("resumenModalGastoBalanceGeneral");
	if(!modal){
		return;
	}
	if(modal.style.display==""){
		modal.style.display="none"
	}else{
		BuscarverDetallegastosBalanceGeneral()
		modal.style.display=""
	}
}

 
// Esperamos que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Escuchar los clics en cualquier checkbox dentro del contenedor
  var modalGastoBalance=elementoBalanceGeneral('resumenModalGastoBalanceGeneral');
  if(!modalGastoBalance){
    return;
  }
  modalGastoBalance.addEventListener('change', function (e) {
      if (e.target.classList.contains('check-accion')) {
        const chk = e.target;
        const fila = chk.closest('tr');
 
        const tipo = fila.cells[5].textContent;
        const id = fila.cells[6].textContent;
		const estado = chk.checked ? "SI" : "NO";
        // Ahora hacés lo que quieras con los datos:
		
		ActualizarEstadoGastos(tipo,id,estado);
 
      }
    });
});

 
function ActualizarEstadoGastos(tipo,id,estado) { 
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"tipo": tipo, 
		"id": id,
		"estado": estado, 	 
		"funt": "ActualizarEstadoGastos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
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
				}
			} catch (error) { 
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



 
 var fechaBalanceGeneral="";
 var localBalanceGeneral="";
 var usuarioBalanceGeneral="";
 
 
function abrirResumenModal(datos) {
    // Desestructurar el array en variables
    const [
        totalEntrega,
        totalCargoA,
        totalInteres,
        totalCredito,
        totalContado,
        totalCobranza,
        totalGasto,
        paraDepositar,
        totalDeposito,
        diferencia,
        fecha,
        local,
        usuario
    ] = datos;

    document.getElementById("resumenModal").style.display = "block";
    document.getElementById("modalFecha").textContent = `Fecha: ${fecha}`;
    
    fechaBalanceGeneral = fecha;
    localBalanceGeneral = local;
    usuarioBalanceGeneral = usuario;

    document.querySelector("#BLGTE strong").textContent = numberFormat(totalEntrega);
    document.querySelector("#BLGTCA strong").textContent = numberFormat(totalCargoA);
    document.querySelector("#BLGTI strong").textContent = numberFormat(totalInteres);
    document.querySelector("#BLGTCR strong").textContent = numberFormat(totalCredito);
    document.querySelector("#BLGTCO strong").textContent = numberFormat(totalContado);
    document.querySelector("#BLGTCBR strong").textContent = numberFormat(totalCobranza);
    document.querySelector("#BLGTG strong").textContent = numberFormat(totalGasto);
    document.querySelector("#BLGTD strong").textContent = numberFormat(paraDepositar);
    document.querySelector("#BLGTT strong").textContent = numberFormat(totalDeposito);
    document.querySelector("#BLGTDF strong").textContent = numberFormat(diferencia);
}


function numberFormat(valor) {
    return parseInt(valor).toLocaleString('es-ES');
}
 
 
function BuscarverDetallegastosBalanceGeneral() { 
 
	document.getElementById("divDetalleGastoBalanceGeneral").innerHTML = paginacargando
  
 var inputUsuario = document.getElementById("inptUsuarioDetalleGastoBalanceGeneral").value.trim();
var usuarioFinal = inputUsuario !== "" ? inputUsuario : usuarioBalanceGeneral;

 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fechaBalanceGeneral, 
		"local": localBalanceGeneral,
		"usuario": usuarioFinal, 	 
		"funt": "BuscarverDetallegastosBalanceGeneral"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divDetalleGastoBalanceGeneral").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divDetalleGastoBalanceGeneral").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
					Respuesta = datos["1"];
					Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					document.getElementById("divDetalleGastoBalanceGeneral").innerHTML = datos_buscados
				}
			} catch (error) { 
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
 
function AbmEstadoBalance( dato ,estado ) { 

if (estado !== "PENDIENTE" && estado !== "CONFIRMADO") {
    ver_vetana_informativa("Estado inválido.");
    return;
}

   const [
        Fecha,
		local,
		usuario,
		Diferencia 
		] = dato;
 
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": Fecha, 
		"local": local,
		"usuario": usuario, 	 
		"Diferencia": Diferencia, 	 
		"estado": estado, 	 
		"funt": "AbmEstadoBalance"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
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
						ver_vetana_informativa("DATOS GUARDADOS CON EXITO")
				}
			} catch (error) { 
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
 
//////////////////////////////////////////////////////////////calculo para ver si aprueba su credito 

    const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Ocultar todos los contenidos
      contents.forEach(c => c.classList.add('hidden'));

      // Resetear todos los tabs
      tabs.forEach(t => {
        t.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
        t.classList.add('bg-gray-100', 'text-gray-700');
      });

      // Activar el tab seleccionado
      document.getElementById(target).classList.remove('hidden');
      tab.classList.remove('bg-gray-100', 'text-gray-700');
      tab.classList.add('bg-blue-600', 'text-white', 'shadow-lg');
    });
  });
 
	
	let cod_clienteAprobarpublic = '';
	let cod_solicitudCreditoPublic = '';
	let idgaranteCreditoPublic = '';
function AprobarSolicitudCredito(cod_clienteAprobar,idSolicitudCredito,idgarante){ 
	
	cod_solicitudCreditoPublic =idSolicitudCredito
	
	if(document.getElementById("divAbmAprobarSolicitudCredito").style.display==""){
		document.getElementById("divAbmAprobarSolicitudCredito").style.display="none"
	}else{
		buscarDatosClienteAprobarSolictudCredito(cod_clienteAprobar,idSolicitudCredito)
		buscarVentasClienteAprobarSolicitudCredito(cod_clienteAprobar)
		buscarDetallesPagosClienteAprobarSolicitudCredito(cod_clienteAprobar)
		buscarGraficaPromedioPagosClienteAprobarSolicitudCredito(cod_clienteAprobar)
		buscarGraficaVentaTotalPagadoClienteAprobarSolicitudCredito(cod_clienteAprobar)
		buscarReferenciasComercialesAprobarSolicitudCredito(cod_clienteAprobar)
		
		buscarFotosGaleria(cod_clienteAprobar)
		buscarDocumentosClienteSolicitud(cod_clienteAprobar)
		buscarmasreferenciasSolicitudCreditoVista(cod_clienteAprobar)
		buscarProductoSolicitudVista(idSolicitudCredito)
		buscarInfoClienteReferencia(cod_clienteAprobar)
		
		idgaranteCreditoPublic = idgarante
		cod_clienteAprobarpublic = cod_clienteAprobar
		/* GARANTE */
		if(idgaranteCreditoPublic != '6'){
			buscarDatosGaranteAprobarSolictudCredito(idSolicitudCredito)
			buscarVentasGaranteAprobarSolicitudCredito()
		buscarDetallesPagosGaranteAprobarSolicitudCredito()
		// buscarGraficaPromedioPagosGaranteAprobarSolicitudCredito()
		buscarGraficaVentaTotalPagadoGaranteAprobarSolicitudCredito()
		buscarReferenciasComercialesAprobarSolicitudCreditoGarante()
		}
		
		
		document.getElementById("divAbmAprobarSolicitudCredito").style.display=""
	}
}

 
function abrirModalComentario() {
    document.getElementById('comentarioCredito').value = "";
    document.getElementById('modalComentario').classList.remove('d-none');
}

function cerrarModalComentario() {
    document.getElementById('modalComentario').classList.add('d-none');
}


function abrirModalUbicacionesClienteCredito() {
    var modal = document.getElementById('modalUbicacionesClienteCredito');
    var tabla = document.getElementById('table_ubicaciones_credito_cliente');
    var total = document.getElementById('lblTotalUbicacionesCreditoCliente');

    if (!modal || !tabla || !total) {
        return false;
    }

    if (cod_clienteAprobarpublic == "") {
        ver_vetana_informativa("FALTO SELECCIONAR EL CLIENTE");
        return false;
    }

    limpiarSeleccionUbicacionCreditoCliente();
    tabla.innerHTML = "<div class='text-center text-secondary p-4'>Cargando ubicaciones...</div>";
    total.innerHTML = "Cargando...";
    modal.classList.remove('d-none');
    buscarUbicacionesClienteCredito(cod_clienteAprobarpublic);
}

function cerrarModalUbicacionesClienteCredito() {
    document.getElementById('modalUbicacionesClienteCredito').classList.add('d-none');
}

function limpiarSeleccionUbicacionCreditoCliente() {
    try {
        CodGeoLocalizacion = "";
        LatGeo = "";
        LonGeo = "";
    } catch (error) {
    }
}

function buscarUbicacionesClienteCredito(cod_cliente) {
    obtener_datos_user();

    var datos = {
        "useru": userid,
        "passu": passuser,
        "navegador": navegador,
        "idcliente": cod_cliente,
        "funt": "buscarGeolocalizacion"
    };

    $.ajax({
        data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
        type: "post",
        error: function (jqXHR, textstatus, errorThrowm) {
            manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");
            document.getElementById("table_ubicaciones_credito_cliente").innerHTML = "<div class='text-center text-danger p-4'>No se pudo cargar el listado.</div>";
            document.getElementById("lblTotalUbicacionesCreditoCliente").innerHTML = "0 registros";
        },
        success: function (responseText) {
            var Respuesta = responseText;
            console.log(Respuesta);
            try {
                var datos = $.parseJSON(Respuesta);
                Respuesta = datos["1"];
                Respuesta = respuestaJqueryAjax(Respuesta);

                if (Respuesta == true) {
                    var datos_buscados = datos[2] || "";
                    var nroRegistro = Number(datos[3]) || 0;
                    document.getElementById("lblTotalUbicacionesCreditoCliente").innerHTML = nroRegistro + (nroRegistro == 1 ? " registro" : " registros");

                    if (String(datos_buscados).trim() == "") {
                        document.getElementById("table_ubicaciones_credito_cliente").innerHTML = "<div class='text-center text-secondary p-4'>No hay ubicaciones registradas para este cliente.</div>";
                        return false;
                    }

                    document.getElementById("table_ubicaciones_credito_cliente").innerHTML = datos_buscados;
                }
            } catch (error) {
                ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ");
                var titulo = "Error: " + error + " \r\n Consola: " + responseText;
                GuardarArchivosLog(titulo);
                document.getElementById("table_ubicaciones_credito_cliente").innerHTML = "<div class='text-center text-danger p-4'>No se pudo leer la respuesta del servidor.</div>";
                document.getElementById("lblTotalUbicacionesCreditoCliente").innerHTML = "0 registros";
            }
        }
    });
}


function guardarComentarioCredito() {
    const comentario = document.getElementById("comentarioCredito").value.trim();
    const Observacion = document.getElementById("ObservacionCredito").value.trim();

    if (comentario === "") {
		ver_vetana_informativa("DEBES INGRESAR UN COMENTARIO");
        return;
    }
 	EditarEstadoSolicitudCredito(comentario,Observacion)
  
} 



function EditarEstadoSolicitudCredito(comentario,Observacion){
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,  	 
		"idAbm": cod_solicitudCreditoPublic,
		"comentario": comentario, 	  	 
		"Observacion": Observacion, 	  	 
		"funt": "EditarEstadoSolicitudCredito"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
						ver_vetana_informativa("DATOS GUARDADO CORRECTAMENTE")
						buscarProductoSolicitudVista(cod_solicitudCreditoPublic)
						cerrarModalComentario()				 
				}
			} catch (error) { 
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

 



function buscarDatosClienteAprobarSolictudCredito(cod_clienteAprobar,Cod_solicitudCreditoAprobar) {
	
	document.getElementById("divdatosClienteAprobarSolicitud").innerHTML = "" 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_clienteAprobar": cod_clienteAprobar,
		"Cod_solicitudCreditoAprobar": Cod_solicitudCreditoAprobar,
		"funt": "buscarDatosClienteAprobarSolictudCredito"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		  
		beforeSend: function () {
 
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divdatosClienteAprobarSolicitud").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("divdatosClienteAprobarSolicitud").innerHTML = datos_buscados 
					let DatosClientes=datos[3];  
					document.getElementById("edad").value = DatosClientes["fecha_nacimiento"] 
					document.getElementById("antiguedad").value = DatosClientes["antiguedad"] 
					document.getElementById("vivienda").value = DatosClientes["tipo_vivienda"] 
					document.getElementById("cuota").value = separadordemilesnumero(DatosClientes["MontosolicitudCredito"])
					document.getElementById("inptDeudaMensual").value = (DatosClientes["deuda_mensual"])
					document.getElementById("inptDiasAtraso").value = (DatosClientes["dias_atraso"])
					document.getElementById("deudaActual").value = (DatosClientes["porcentaje_deuda_actual"])
					document.getElementById("referencia").value = (DatosClientes["MontoDeudaActivaReferencia"])
					document.getElementById("historial").value = (DatosClientes["calificacion_cliente"])
					document.getElementById("inptSalarioAPC").value = (DatosClientes["salario"])					
					document.getElementById("deudaUltimaVenta").value = (DatosClientes["DeudaUltimaVenta"])
					document.getElementById("historialInforconf").value = (DatosClientes["historial_inforconf"])
					document.getElementById("inpMontoReferenciaComercial").value = (DatosClientes["montoreferencia"])
					document.getElementById("inpCntidadCuotasPagadas").value = (DatosClientes["CantidadCuotasPagadas"])


var deuda_mensual = Number(DatosClientes["deuda_mensual"]) || 0;
var MontosolicitudCredito = Number(DatosClientes["MontosolicitudCredito"]) || 0;
var salario = Number(DatosClientes["salario"]) || 0;

// Suma de obligaciones mensuales
var total_cuotas = deuda_mensual + MontosolicitudCredito;
 
// Porcentaje de deuda general sobre el salario
var PorcentajeDEudaGeneral = 0;

if (salario > 0) {
    PorcentajeDEudaGeneral = Math.round((total_cuotas / salario) * 100);
}

document.getElementById("deudaGeneralPropuesta").value =PorcentajeDEudaGeneral+"%"

	
				}
		  	} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	}); 
}


function evaluarCredito(datosClienteObj,Cod_solicitudCreditoAprobar) {

    // Convertir el objeto JS a JSON
	
	mostrarModalCargando(); // ⏳ MOSTRAR
	
    let datosClienteJSON = JSON.stringify(datosClienteObj);

    $.ajax({
        url: "/GoodVentaElectroCasaMaric/php_system/openai_key.php",
        type: "POST",
        data: {
            datosCliente: datosClienteJSON
        },

        success: function (response) {
            console.log("Respuesta openai_key.php:", response);

            try {
                // Asegurar que la respuesta sea JSON
                let data = (typeof response === "string") 
                          ? JSON.parse(response) 
                          : response;
				EditarSolicitudCredito(data.estado,data.observacion,Cod_solicitudCreditoAprobar,"800902439","")
				cerrarModalCargando()
				mostrarModalCredito(data.estado, data.observacion)
	 

            } catch (err) {
				cerrarModalCargando()
                console.error("JSON inválido:", response);
                alert("Error al procesar la respuesta del servidor."+err);
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error AJAX:", jqXHR.responseText);
            manejadordeerroresjquery(jqXHR.status, textStatus, "evaluarCredito");
        }
    });
}


function mostrarModalCargando() {
  document.getElementById("modalCargando").style.display = "flex";
}

function cerrarModalCargando() {
  document.getElementById("modalCargando").style.display = "none";
}




function mostrarModalCredito(estado, observacion) {
  const modal = document.getElementById("modalCredito");
  const titulo = document.getElementById("modalEstado");
  const texto  = document.getElementById("modalObservacion");

  titulo.innerText = "Estado: " + estado;
  titulo.className = "modal-title " + estado; // APROBADO | REVISION | RECHAZADO
  texto.innerHTML  = observacion;

  modal.style.display = "flex";
}

function cerrarModalCredito() {
  document.getElementById("modalCredito").style.display = "none";
}

 
function EditarSolicitudCreditoAnalisis(estado){
	if(estado=="APROBADO" && Array.isArray(productosProvisionalesSolicitudCreditoActual) && productosProvisionalesSolicitudCreditoActual.length>0){
		abrirModalReemplazoProductoSolicitudCredito()
		return false
	}
	if(estado=="APROBADO"){
		abrirModalVistaPreviaAprobacionSolicitudCredito()
		return false
	}
	EditarSolicitudCredito(estado,"",cod_solicitudCreditoPublic,userid,"BOTON")
}

var productosSolicitudCreditoActual = [];
var productosProvisionalesSolicitudCreditoActual = [];
var detalleProvisionalSolicitudCreditoActual = null;
var nombreClienteSolicitudCreditoActual = "";
var nombreVendedorSolicitudCreditoActual = "";

function formatearMontoVistaPreviaSolicitud(valor){
	var numero=Number(String(valor == null ? 0 : valor).replace(/\./g,"").replace(",","."));
	if(!isFinite(numero)) numero=0;
	return numero.toLocaleString("es-PY");
}

function abrirModalVistaPreviaAprobacionSolicitudCredito(){
	var modal=document.getElementById("modalVistaPreviaAprobacionSolicitudCredito");
	if(!modal){
		modal=document.createElement("div");
		modal.id="modalVistaPreviaAprobacionSolicitudCredito";
		modal.style.cssText="display:none;position:fixed;inset:0;z-index:10040;background:rgba(15,23,42,.72);align-items:center;justify-content:center;padding:16px;";
		modal.innerHTML=
			'<div role="dialog" aria-modal="true" aria-labelledby="tituloVistaPreviaAprobacion" style="background:#fff;width:min(900px,100%);max-height:90vh;overflow:auto;border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.35);">'+
				'<div style="background:#0d6efd;color:#fff;padding:17px 20px;border-radius:14px 14px 0 0;">'+
					'<h4 id="tituloVistaPreviaAprobacion" style="margin:0;font-weight:800;">Vista previa de la compra</h4>'+
					'<div style="font-size:13px;margin-top:5px;">Revise los productos solicitados antes de confirmar la aprobación.</div>'+
				'</div>'+
				'<div style="padding:20px;">'+
					'<div class="alert alert-success py-2"><strong>Todos los productos están registrados en la base de datos.</strong></div>'+
					'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-bottom:16px;">'+
						'<div style="padding:11px 13px;border:1px solid #bfdbfe;border-radius:8px;background:#eff6ff;">'+
							'<div style="font-size:11px;font-weight:800;color:#1d4ed8;margin-bottom:3px;">CLIENTE</div>'+
							'<div id="clienteVistaPreviaSolicitudCredito" style="font-weight:800;color:#1e293b;"></div>'+
						'</div>'+
						'<div style="padding:11px 13px;border:1px solid #cbd5e1;border-radius:8px;background:#f8fafc;">'+
							'<div style="font-size:11px;font-weight:800;color:#475569;margin-bottom:3px;">VENDEDOR</div>'+
							'<div id="vendedorVistaPreviaSolicitudCredito" style="font-weight:800;color:#1e293b;"></div>'+
						'</div>'+
					'</div>'+
					'<div class="table-responsive"><table class="table table-bordered table-striped align-middle">'+
						'<thead class="table-light"><tr><th>Producto</th><th>Código</th><th class="text-end">Cantidad</th><th class="text-end">Precio</th><th class="text-end">Cuotas</th><th class="text-end">Subtotal</th></tr></thead>'+
						'<tbody id="tbodyVistaPreviaProductosSolicitud"></tbody>'+
						'<tfoot><tr><th colspan="5" class="text-end">TOTAL SOLICITADO</th><th id="totalVistaPreviaProductosSolicitud" class="text-end"></th></tr></tfoot>'+
					'</table></div>'+
					'<div id="mensajeSinProductosVistaPrevia" class="alert alert-warning" style="display:none;">La solicitud no contiene productos. No se puede aprobar.</div>'+
					'<div class="d-flex justify-content-end gap-2 mt-3">'+
						'<button type="button" class="btn btn-outline-secondary" onclick="cerrarModalVistaPreviaAprobacionSolicitudCredito()">Volver</button>'+
						'<button id="btnConfirmarVistaPreviaAprobacion" type="button" class="btn btn-success px-4" onclick="confirmarVistaPreviaAprobacionSolicitudCredito()">Confirmar aprobación</button>'+
					'</div>'+
				'</div>'+
			'</div>';
		document.body.appendChild(modal);
	}
	document.getElementById("clienteVistaPreviaSolicitudCredito").textContent=nombreClienteSolicitudCreditoActual || "SIN REGISTRO";
	document.getElementById("vendedorVistaPreviaSolicitudCredito").textContent=nombreVendedorSolicitudCreditoActual || "SIN REGISTRO";
	var cuerpo=document.getElementById("tbodyVistaPreviaProductosSolicitud");
	cuerpo.innerHTML="";
	var total=0;
	(Array.isArray(productosSolicitudCreditoActual) ? productosSolicitudCreditoActual : []).forEach(function(producto){
		var cantidad=Number(producto.cantidad)||0;
		var precio=Number(producto.precio)||0;
		var subtotal=cantidad*precio;
		total+=subtotal;
		var fila=document.createElement("tr");
		[
			producto.producto || "",
			producto.codigo_barra || producto.codigo_producto || "",
			cantidad,
			"Gs. "+formatearMontoVistaPreviaSolicitud(precio),
			producto.cuotas || "",
			"Gs. "+formatearMontoVistaPreviaSolicitud(subtotal)
		].forEach(function(valor,indice){
			var celda=document.createElement("td");
			celda.textContent=valor;
			if(indice>=2) celda.className="text-end";
			fila.appendChild(celda);
		});
		cuerpo.appendChild(fila);
	});
	document.getElementById("totalVistaPreviaProductosSolicitud").textContent="Gs. "+formatearMontoVistaPreviaSolicitud(total);
	var sinProductos=productosSolicitudCreditoActual.length===0;
	document.getElementById("mensajeSinProductosVistaPrevia").style.display=sinProductos ? "" : "none";
	document.getElementById("btnConfirmarVistaPreviaAprobacion").disabled=sinProductos;
	modal.style.display="flex";
}

function cerrarModalVistaPreviaAprobacionSolicitudCredito(){
	var modal=document.getElementById("modalVistaPreviaAprobacionSolicitudCredito");
	if(modal) modal.style.display="none";
}

function confirmarVistaPreviaAprobacionSolicitudCredito(){
	cerrarModalVistaPreviaAprobacionSolicitudCredito();
	EditarSolicitudCredito("APROBADO","",cod_solicitudCreditoPublic,userid,"BOTON");
}

function asegurarModalReemplazoProductoSolicitudCredito(){
	var modal=document.getElementById("modalReemplazoProductoSolicitudCredito");
	if(modal) return modal;
	modal=document.createElement("div");
	modal.id="modalReemplazoProductoSolicitudCredito";
	modal.className="modal";
	modal.style.cssText="display:none;position:fixed;inset:0;z-index:10050;background:rgba(15,23,42,.72);align-items:center;justify-content:center;padding:16px;";
	modal.innerHTML=
		'<div role="dialog" aria-modal="true" aria-labelledby="tituloReemplazoProductoSolicitud" style="background:#fff;width:min(720px,100%);max-height:90vh;overflow:auto;border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.35);">'+
			'<div style="background:#b91c1c;color:#fff;padding:16px 20px;border-radius:14px 14px 0 0;">'+
				'<h4 id="tituloReemplazoProductoSolicitud" style="margin:0;font-weight:800;">⚠ Producto no registrado</h4>'+
				'<div style="font-size:13px;margin-top:5px;">Debe reemplazarlo por un producto de la base antes de aprobar.</div>'+
			'</div>'+
			'<div style="padding:20px;">'+
				'<div id="detalleProductoProvisionalSolicitud" class="alert alert-warning fw-bold"></div>'+
				'<label class="form-label fw-bold" for="buscarProductoReemplazoSolicitud">Buscar producto existente</label>'+
				'<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:stretch;margin-bottom:16px;">'+
					'<input id="buscarProductoReemplazoSolicitud" type="text" autocomplete="off" placeholder="Código, código de barras o nombre" onkeyup="if(event.keyCode==13){buscarProductoParaReemplazoSolicitud()}" style="display:block!important;width:100%!important;min-width:0!important;height:44px!important;padding:8px 12px!important;border:1px solid #94a3b8!important;border-radius:7px!important;background:#fff!important;color:#111827!important;box-sizing:border-box!important;">'+
					'<button type="button" onclick="buscarProductoParaReemplazoSolicitud()" style="display:inline-flex!important;width:auto!important;min-width:110px!important;height:44px!important;align-items:center;justify-content:center;padding:0 20px!important;border:0;border-radius:7px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer;">Buscar</button>'+
				'</div>'+
				'<div id="resultadoProductoReemplazoSolicitud" style="min-height:80px;"></div>'+
				'<div class="d-flex justify-content-between gap-2 mt-3">'+
					'<button type="button" class="btn btn-outline-secondary" onclick="cerrarModalReemplazoProductoSolicitudCredito()">Cancelar</button>'+
					'<button id="btnFinalizarAprobacionProductoSolicitud" type="button" class="btn btn-success" style="display:none;" onclick="finalizarAprobacionProductoSolicitudCredito()">Finalizar y aprobar</button>'+
				'</div>'+
			'</div>'+
		'</div>';
	document.body.appendChild(modal);
	return modal;
}

function abrirModalReemplazoProductoSolicitudCredito(){
	var modal=asegurarModalReemplazoProductoSolicitudCredito();
	detalleProvisionalSolicitudCreditoActual=productosProvisionalesSolicitudCreditoActual[0] || null;
	if(!detalleProvisionalSolicitudCreditoActual){
		document.getElementById("detalleProductoProvisionalSolicitud").textContent="Todos los productos fueron actualizados.";
		document.getElementById("btnFinalizarAprobacionProductoSolicitud").style.display="";
		document.getElementById("resultadoProductoReemplazoSolicitud").innerHTML="";
	}else{
		document.getElementById("detalleProductoProvisionalSolicitud").textContent=
			"Producto solicitado: "+detalleProvisionalSolicitudCreditoActual.producto+
			" | Precio aproximado: Gs. "+detalleProvisionalSolicitudCreditoActual.precio_formateado;
		document.getElementById("btnFinalizarAprobacionProductoSolicitud").style.display="none";
		document.getElementById("resultadoProductoReemplazoSolicitud").innerHTML=
			"<div class='text-secondary'>Busque y seleccione el producto correcto de la base de datos.</div>";
		document.getElementById("buscarProductoReemplazoSolicitud").value="";
	}
	modal.style.display="flex";
	setTimeout(function(){document.getElementById("buscarProductoReemplazoSolicitud").focus();},50);
}

function cerrarModalReemplazoProductoSolicitudCredito(){
	var modal=document.getElementById("modalReemplazoProductoSolicitudCredito");
	if(modal) modal.style.display="none";
}

function buscarProductoParaReemplazoSolicitud(){
	var buscar=document.getElementById("buscarProductoReemplazoSolicitud").value.trim();
	var resultado=document.getElementById("resultadoProductoReemplazoSolicitud");
	if(buscar.length<2){resultado.innerHTML="<div class='alert alert-info'>Escriba al menos 2 caracteres.</div>";return;}
	resultado.innerHTML="<div class='text-center p-3'>Buscando productos...</div>";
	obtener_datos_user();
	$.ajax({
		data:{useru:userid,passu:passuser,navegador:navegador,funt:"buscarProductoReemplazoSolicitud",buscar:buscar,idDetalle:detalleProvisionalSolicitudCreditoActual.codigo_detalle},
		url:"/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type:"post",
		success:function(responseText){
			try{
				var datos=$.parseJSON(responseText);
				var productos=Array.isArray(datos["2"])?datos["2"]:[];
				resultado.innerHTML="";
				if(productos.length===0){resultado.innerHTML="<div class='alert alert-warning'>No se encontraron productos.</div>";return;}
				productos.forEach(function(producto){
					var boton=document.createElement("button");
					boton.type="button";
					boton.className="btn btn-light border w-100 text-start mb-2 p-3";
					boton.innerHTML="<strong></strong><br><small></small>";
					boton.querySelector("strong").textContent=producto.nombre;
					var detallePrecio=producto.precio===null
						? "SIN PRECIO PARA "+producto.cuotas+" CUOTAS"
						: producto.cuotas+" cuotas | Precio total: Gs. "+producto.precio_formateado+" | Gs. "+formatearMontoVistaPreviaSolicitud(producto.precio/producto.cuotas)+" por cuota";
					boton.querySelector("small").textContent="Código: "+producto.codigo+" | Barra: "+(producto.barra || "SIN CÓDIGO")+" | "+detallePrecio;
					if(producto.precio===null){
						boton.disabled=true;
						boton.className+=" opacity-50";
					}
					boton.onclick=function(){confirmarReemplazoProductoSolicitud(producto);};
					resultado.appendChild(boton);
				});
			}catch(error){resultado.innerHTML="<div class='alert alert-danger'>No se pudo leer la búsqueda.</div>";}
		}
	});
}

var productoReemplazoSolicitudSeleccionado = null;

function confirmarReemplazoProductoSolicitud(producto){
	if(!detalleProvisionalSolicitudCreditoActual) return;
	productoReemplazoSolicitudSeleccionado=producto;
	var modal=document.getElementById("modalConfirmarReemplazoProductoSolicitud");
	if(!modal){
		modal=document.createElement("div");
		modal.id="modalConfirmarReemplazoProductoSolicitud";
		modal.style.cssText="display:none;position:fixed;inset:0;z-index:10070;background:rgba(15,23,42,.78);align-items:center;justify-content:center;padding:16px;";
		modal.innerHTML=
			'<div role="dialog" aria-modal="true" aria-labelledby="tituloConfirmarReemplazoProducto" style="width:min(560px,100%);background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 28px 80px rgba(0,0,0,.4);">'+
				'<div style="padding:16px 20px;background:#1d4ed8;color:#fff;"><h4 id="tituloConfirmarReemplazoProducto" style="margin:0;font-weight:800;">Confirmar cambio de producto</h4></div>'+
				'<div style="padding:20px;">'+
					'<p style="margin:0 0 8px;color:#64748b;font-size:13px;font-weight:700;">PRODUCTO SOLICITADO</p>'+
					'<div id="productoProvisionalConfirmacionSolicitud" style="padding:10px 12px;border:1px solid #f59e0b;border-radius:8px;background:#fffbeb;color:#92400e;font-weight:700;"></div>'+
					'<div style="text-align:center;font-size:24px;color:#2563eb;margin:10px 0;">↓</div>'+
					'<p style="margin:0 0 8px;color:#64748b;font-size:13px;font-weight:700;">SE REEMPLAZARÁ POR</p>'+
					'<div id="productoRealConfirmacionSolicitud" style="padding:12px;border:2px solid #16a34a;border-radius:8px;background:#f0fdf4;color:#14532d;"></div>'+
					'<div class="d-flex justify-content-end gap-2 mt-4">'+
						'<button type="button" class="btn btn-outline-secondary" onclick="cerrarConfirmacionReemplazoProductoSolicitud()">Cancelar</button>'+
						'<button id="btnEjecutarReemplazoProductoSolicitud" type="button" class="btn btn-success px-4" onclick="ejecutarReemplazoProductoSolicitud()">Confirmar cambio</button>'+
					'</div>'+
				'</div>'+
			'</div>';
		document.body.appendChild(modal);
	}
	document.getElementById("productoProvisionalConfirmacionSolicitud").textContent=
		detalleProvisionalSolicitudCreditoActual.producto+" | Precio aproximado: Gs. "+detalleProvisionalSolicitudCreditoActual.precio_formateado;
	document.getElementById("productoRealConfirmacionSolicitud").textContent=
		producto.nombre+" | "+producto.cuotas+" cuotas | Precio total: Gs. "+producto.precio_formateado;
	var botonConfirmar=document.getElementById("btnEjecutarReemplazoProductoSolicitud");
	botonConfirmar.disabled=false;
	botonConfirmar.textContent="Confirmar cambio";
	modal.style.display="flex";
}

function cerrarConfirmacionReemplazoProductoSolicitud(){
	var modal=document.getElementById("modalConfirmarReemplazoProductoSolicitud");
	if(modal) modal.style.display="none";
	productoReemplazoSolicitudSeleccionado=null;
}

function ejecutarReemplazoProductoSolicitud(){
	var producto=productoReemplazoSolicitudSeleccionado;
	if(!producto || !detalleProvisionalSolicitudCreditoActual) return;
	var boton=document.getElementById("btnEjecutarReemplazoProductoSolicitud");
	boton.disabled=true;
	boton.textContent="Actualizando...";
	obtener_datos_user();
	$.ajax({
		data:{useru:userid,passu:passuser,navegador:navegador,funt:"reemplazarProductoProvisional",idDetalle:detalleProvisionalSolicitudCreditoActual.codigo_detalle,producto:producto.codigo},
		url:"/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type:"post",
		success:function(responseText){
			try{
				var datos=$.parseJSON(responseText);
				if(datos["1"]!="exito"){
					boton.disabled=false;
					boton.textContent="Confirmar cambio";
					ver_vetana_informativa(datos["2"] || "NO SE PUDO CAMBIAR EL PRODUCTO");
					return;
				}
				cerrarConfirmacionReemplazoProductoSolicitud();
				productosProvisionalesSolicitudCreditoActual.shift();
				buscarProductoSolicitudVista(cod_solicitudCreditoPublic);
				abrirModalReemplazoProductoSolicitudCredito();
			}catch(error){
				boton.disabled=false;
				boton.textContent="Confirmar cambio";
				ver_vetana_informativa("NO SE PUDO CAMBIAR EL PRODUCTO");
			}
		}
	});
}

function finalizarAprobacionProductoSolicitudCredito(){
	cerrarModalReemplazoProductoSolicitudCredito();
	buscarProductoSolicitudVista(cod_solicitudCreditoPublic,function(){
		abrirModalVistaPreviaAprobacionSolicitudCredito();
	});
}




function VerificarAprobarClienteSolicitudCredito(cod_clienteAprobar,Cod_solicitudCreditoAprobar) {
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_clienteAprobar": cod_clienteAprobar,
		"Cod_solicitudCreditoAprobar": Cod_solicitudCreditoAprobar,
		"funt": "DatosClienteParaEvaluar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
				    
					let DatosClientes=datos[3];  
					document.getElementById("edad").value = DatosClientes["edad"] 
					document.getElementById("antiguedad").value = DatosClientes["antiguedad"] 
					document.getElementById("vivienda").value = DatosClientes["tipo_vivienda"]  
					document.getElementById("cuota").value = separadordemilesnumero(DatosClientes["MontosolicitudCredito"])
					document.getElementById("inptDeudaMensual").value = (DatosClientes["deuda_mensual"])
					document.getElementById("inptDiasAtraso").value = (DatosClientes["dias_atraso"])
					document.getElementById("deudaActual").value = (DatosClientes["porcentaje_deuda_actual"])
					document.getElementById("referencia").value = (DatosClientes["MontoDeudaActivaReferencia"])
					document.getElementById("historial").value = (DatosClientes["calificacion_cliente"])
					document.getElementById("inptSalarioAPC").value = (DatosClientes["salario"])
					document.getElementById("deudaUltimaVenta").value = (DatosClientes["DeudaUltimaVenta"])
					document.getElementById("historialInforconf").value = (DatosClientes["historial_inforconf"])
 
var deuda_mensual = Number(DatosClientes["deuda_mensual"]) || 0;
var MontosolicitudCredito = Number(DatosClientes["MontosolicitudCredito"]) || 0;
var salario = Number(DatosClientes["salario"]) || 0;
 
// Suma de obligaciones mensuales
var total_cuotas = deuda_mensual + MontosolicitudCredito;

// Porcentaje de deuda general sobre el salario
var PorcentajeDEudaGeneral = 0;

if (salario > 0) {
    PorcentajeDEudaGeneral = Math.round((total_cuotas / salario) * 100);
}

document.getElementById("deudaGeneralPropuesta").value = PorcentajeDEudaGeneral+"%"

 
	let cliente = {
    nombre_cliente: DatosClientes["nombre_persona"],	
    edad: DatosClientes["edad"],
    antiguedad_laboral_meses: DatosClientes["antiguedad"] ,
    tipo_vivienda: DatosClientes["tipo_vivienda"],
    tiene_documento_identidad: DatosClientes["fotos_total"],
    salario_mensual: DatosClientes["salario"],
    porcentaje_deuda_total_venta_activa: DatosClientes["porcentaje_deuda_actual"],
    promedio_dias_atraso: DatosClientes["dias_atraso"],
    monto_deuda_activa_total_otro_local: DatosClientes["MontoDeudaActivaReferencia"],
    historial_inforconf: DatosClientes["historial_inforconf"],
    deuda_mensual_actual: DatosClientes["deuda_mensual"],
    calificacion_interna_cliente: DatosClientes["calificacion_cliente"],
    es_cliente_recurrente: DatosClientes["ClienteNueo_0_recurrente"],
    porcentaje_deuda_ultima_venta: DatosClientes["DeudaUltimaVenta"],
    CantidadCuotasPagadas: DatosClientes["CantidadCuotasPagadas"],
    porcentaje_deuda_relacion_salario_deuda: DatosClientes["PorcentajeDEudaGeneral"],
    cuota_mensual_propuesta: DatosClientes["MontosolicitudCredito"]
};


					evaluarCredito(cliente,Cod_solicitudCreditoAprobar)
  
				}
		 } catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	}); 
}

 

function EvaluarSolicitudCreditoAnalisis(){

VerificarAprobarClienteSolicitudCredito(cod_clienteAprobarpublic,cod_solicitudCreditoPublic) 
}

function EditarSolicitudCredito(estado,observacion,Cod_solicitudCreditoAprobar,cod_usuarioFK,desde){
 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,  	 
		"idAbm": Cod_solicitudCreditoAprobar, 	 
		"estado": estado, 	 
		"observacion": observacion, 	 
		"cod_usuarioFK": cod_usuarioFK, 	 
		"funt": "EditarSolicitudCredito"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
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
					if(datos["1"]=="producto_provisional"){
						ver_vetana_informativa(datos["2"])
						buscarProductoSolicitudVista(Cod_solicitudCreditoAprobar)
						return false
					}
					Respuesta = datos["1"];
					Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					if(desde=="BOTON"){
						ver_vetana_informativa("LA SOLICITUD DE CREDITO A CAMBIADO DE ESTADO A: "+estado)
					}		    
						actualizarContadoresPendientesSolicitudCreditoMenu()
						buscarSolicitudCreditoAprobar()
				}
			} catch (error) { 
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


function limpiarResultadoSolicitudCredito(idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return null;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	return contenedor;
}

function renderVentasAprobarSolicitudCredito(filas, idContenedor) {
	var contenedor = limpiarResultadoSolicitudCredito(idContenedor);
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var fila = document.createElement("tr");
		var fecha = document.createElement("td");
		fecha.textContent = registro.fecha === null ? "" : String(registro.fecha);
		fila.appendChild(fecha);
		var celdaProductos = document.createElement("td");
		(Array.isArray(registro.productos) ? registro.productos : []).forEach(function (producto) {
			var tabla = document.createElement("table");
			tabla.className = "tableTicket";
			var cuerpo = document.createElement("tbody");
			var filaProducto = document.createElement("tr");
			var celdaProducto = document.createElement("td");
			celdaProducto.style.width = "100%";
			celdaProducto.textContent = producto && producto.producto != null ? String(producto.producto) : "";
			filaProducto.appendChild(celdaProducto);
			cuerpo.appendChild(filaProducto);
			tabla.appendChild(cuerpo);
			celdaProductos.appendChild(tabla);
		});
		fila.appendChild(celdaProductos);
		var total = document.createElement("td");
		total.textContent = registro.total_venta === null ? "" : String(registro.total_venta);
		fila.appendChild(total);
		fragmento.appendChild(fila);
	});
	contenedor.appendChild(fragmento);
}

function renderReferenciasComercialesAprobarSolicitud(filas, idContenedor) {
	var contenedor = limpiarResultadoSolicitudCredito(idContenedor);
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var fila = document.createElement("tr");
		[registro.cliente, registro.telefono, registro.direccion, registro.referencia, registro.observacion, registro.tipo].forEach(function (valor) {
			var celda = document.createElement("td");
			celda.textContent = valor === null || typeof valor === "undefined" ? "" : String(valor);
			fila.appendChild(celda);
		});
		fragmento.appendChild(fila);
	});
	contenedor.appendChild(fragmento);
}

function agregarLineaTarjetaSolicitud(contenedor, etiqueta, valor, claseValor) {
	var linea = document.createElement("p");
	linea.className = "mb-1 small text-secondary";
	linea.appendChild(document.createTextNode(etiqueta + ": "));
	var dato = document.createElement("span");
	dato.className = claseValor || "fw-semibold text-dark";
	dato.textContent = valor === null || typeof valor === "undefined" ? "" : String(valor);
	linea.appendChild(dato);
	contenedor.appendChild(linea);
	return dato;
}

function renderSolicitudesCreditoAprobar(filas, opciones) {
	opciones = opciones || {};
	var contenedor = limpiarResultadoSolicitudCredito(opciones.idContenedor || "table_frm_HistorialCompletoClientes");
	if (!contenedor || !Array.isArray(filas)) return;
	var coloresFaja = {
		"CAT A": "#00FF00", "CAT B": "#66FF33", "CAT C": "#CCFF33", "CAT D": "#FFFF00",
		"CAT E": "#FFCC33", "CAT F": "#FF9900", "CAT G": "#FF6600", "CAT H": "#FF3300",
		"CAT I": "#FF0000", "CAT J": "#CC0000", "CAT K": "#990000"
	};
	var coloresEstado = {
		"PENDIENTE": "#f0ad4e", "APROBADO": "#28a745", "FINALIZADO": "#0d6efd",
		"RECHAZADO": "#dc3545", "REVISION": "#6f42c1"
	};
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var productosRegistro = Array.isArray(registro.productos) ? registro.productos : [];
		var tieneProductoProvisional = productosRegistro.some(function (producto) {
			return Number(producto.es_provisional) === 1 || producto.tipo === "PROVISIONAL";
		});
		var columna = document.createElement("div");
		columna.className = "col-12 col-sm-6 col-md-4 col-lg-3";
		var tarjeta = document.createElement("div");
		tarjeta.className = tieneProductoProvisional
			? "card shadow border border-danger border-3 mb-3"
			: "card shadow-sm border border-light mb-3";
		var cuerpo = document.createElement("div");
		cuerpo.className = "card-body text-center";
		var titulo = document.createElement("p");
		titulo.className = "fw-bold mb-3";
		titulo.style.fontSize = "15px";
		titulo.style.borderBottom = "double";
		titulo.textContent = "DATOS CLIENTE";
		cuerpo.appendChild(titulo);
		if (tieneProductoProvisional) {
			var alertaProvisional = document.createElement("div");
			alertaProvisional.className = "alert alert-danger fw-bold py-2 px-2 mb-3";
			alertaProvisional.setAttribute("role", "alert");
			alertaProvisional.style.fontSize = "13px";
			alertaProvisional.style.border = "2px solid #dc3545";
			alertaProvisional.textContent = "⚠ PRODUCTO NO REGISTRADO EN LA BASE DE DATOS";
			cuerpo.appendChild(alertaProvisional);
		}
		var detalle = document.createElement("div");
		detalle.className = "text-start";
		var lineaFaja = document.createElement("p");
		lineaFaja.className = "mb-2";
		var faja = document.createElement("span");
		faja.className = "fw-bold px-2 py-1 rounded";
		faja.textContent = registro.calificacion == null ? "" : String(registro.calificacion);
		faja.style.backgroundColor = coloresFaja[faja.textContent] || "#010036";
		faja.style.color = coloresFaja[faja.textContent] ? "#000" : "#fcfcfc";
		lineaFaja.appendChild(faja);
		detalle.appendChild(lineaFaja);
		agregarLineaTarjetaSolicitud(detalle, "CLIENTE", registro.cliente);
		agregarLineaTarjetaSolicitud(detalle, "NRO CI", registro.documento);
		var idGarante = registro.id_garante == null ? "" : String(registro.id_garante).trim();
		if (idGarante && idGarante !== "0" && idGarante !== "6" && registro.garante) {
			var bloqueGarante = document.createElement("div");
			bloqueGarante.className = "solicitud-garante-resumen";
			var tituloGarante = document.createElement("div");
			tituloGarante.className = "solicitud-garante-titulo";
			tituloGarante.textContent = "DATOS GARANTE";
			bloqueGarante.appendChild(tituloGarante);
			agregarLineaTarjetaSolicitud(bloqueGarante, "GARANTE", registro.garante);
			agregarLineaTarjetaSolicitud(bloqueGarante, "NRO CI", registro.documento_garante || "SIN REGISTRO");
			detalle.appendChild(bloqueGarante);
		}
		agregarLineaTarjetaSolicitud(detalle, "LOCAL", registro.local);
		var estado = agregarLineaTarjetaSolicitud(detalle, opciones.etiquetaEstado || "ESTADO", registro.estado, "fw-semibold");
		estado.style.color = coloresEstado[estado.textContent] || "#6c757d";
		agregarLineaTarjetaSolicitud(detalle, "VENDEDOR", registro.vendedor);
		agregarLineaTarjetaSolicitud(detalle, "FECHA", registro.fecha);
		var montoEntrega = Number(registro.entrega_inicial) || 0;
		if (montoEntrega > 0) {
			var lineaEntrega = document.createElement("p");
			lineaEntrega.className = "mb-2";
			var etiquetaEntrega = document.createElement("span");
			etiquetaEntrega.className = "badge rounded-pill";
			etiquetaEntrega.style.backgroundColor = "#dcfce7";
			etiquetaEntrega.style.color = "#166534";
			etiquetaEntrega.style.fontSize = "12px";
			etiquetaEntrega.style.fontWeight = "800";
			etiquetaEntrega.style.padding = "6px 10px";
			etiquetaEntrega.textContent = "CON ENTREGA - " + (registro.entrega_formateada || montoEntrega.toLocaleString("es-PY")) + " Gs.";
			lineaEntrega.appendChild(etiquetaEntrega);
			detalle.appendChild(lineaEntrega);
		}
		var lineaProductos = document.createElement("p");
		lineaProductos.className = "mb-1 small text-secondary";
		lineaProductos.appendChild(document.createTextNode("PRODUCTO: "));
		var listaProductos = document.createElement("span");
		listaProductos.className = "fw-semibold text-dark";
		productosRegistro.forEach(function (producto, indice) {
			if (indice > 0) listaProductos.appendChild(document.createElement("br"));
			if (Number(producto.es_provisional) === 1 || producto.tipo === "PROVISIONAL") {
				var avisoProducto = document.createElement("span");
				avisoProducto.className = "badge bg-danger text-white me-1 mb-1";
				avisoProducto.textContent = "NO REGISTRADO";
				listaProductos.appendChild(avisoProducto);
				listaProductos.appendChild(document.createTextNode(" "));
			}
			var texto = (producto.numero || (indice + 1)) + ") " + (producto.cantidad || "") + "/" + (producto.producto || "") + "   " + (producto.cuotas || "") + " * " + (producto.cuota_formateada || "") + " = " + (producto.total_formateado || "") + "Gs. ";
			listaProductos.appendChild(document.createTextNode(texto));
			if (producto.tipo === "COMBO") {
				var botonCombo = document.createElement("input");
				botonCombo.type = "button";
				botonCombo.value = "VER";
				botonCombo.style.width = "50px";
				botonCombo.className = "btn4";
				botonCombo.onclick = function () { buscarvistacomboproductosolicitud(producto.cod_producto, "vista_solicitud", producto.local); };
				listaProductos.appendChild(botonCombo);
			}
		});
		lineaProductos.appendChild(listaProductos);
		detalle.appendChild(lineaProductos);
		cuerpo.appendChild(detalle);
		var seleccionar = document.createElement("button");
		seleccionar.type = "button";
		seleccionar.className = "btn btn-sm btn-primary mt-3";
		seleccionar.textContent = "Seleccionar";
		seleccionar.onclick = function () {
			nombreClienteSolicitudCreditoActual = registro.cliente == null ? "" : String(registro.cliente);
			nombreVendedorSolicitudCreditoActual = registro.vendedor == null ? "" : String(registro.vendedor);
			if (typeof opciones.alSeleccionar === "function") {
				opciones.alSeleccionar(registro);
			} else {
				AprobarSolicitudCredito(registro.id_cliente, registro.id_solicitud, registro.id_garante);
			}
		};
		cuerpo.appendChild(seleccionar);
		tarjeta.appendChild(cuerpo);
		columna.appendChild(tarjeta);
		fragmento.appendChild(columna);
	});
	contenedor.appendChild(fragmento);
}

function buscarVentasClienteAprobarSolicitudCredito(cod_clienteAprobar){ 


 document.getElementById("tbody_buscar_ventas_aprobar_solicitud").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			"navegador": navegador,
			"cod_cliente": cod_clienteAprobar,
			"funt": "buscar_ventas_aprobar_solicitud",
			"formato": "json"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("tbody_buscar_ventas_aprobar_solicitud").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("tbody_buscar_ventas_aprobar_solicitud").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];
			if (Array.isArray(datos_buscados)) {
				renderVentasAprobarSolicitudCredito(datos_buscados, "tbody_buscar_ventas_aprobar_solicitud");
			} else {
				document.getElementById("tbody_buscar_ventas_aprobar_solicitud").innerHTML=datos_buscados;
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
function buscarDetallesPagosClienteAprobarSolicitudCredito(cod_clienteAprobar){ 


 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=paginacargando	 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"cod_cliente": cod_clienteAprobar,
			"funt": "buscarDetallesPagosClienteAprobarSolicitudCredito"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=""	
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=""	
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {	
			 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=datos[2]		
			
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
function buscarDetallesPagosClienteAprobarSolicitudCreditoBoton(){ 


	let inptselectTipoCuentaCreditoCliente =document.getElementById('inptselectTipoCuentaCreditoCliente').value
	let inptselectTipoVentaCreditoCliente =document.getElementById('inptselectTipoVentaCreditoCliente').value

 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=paginacargando	 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"cod_cliente": cod_clienteAprobarpublic,
			"tipo_cuenta": inptselectTipoCuentaCreditoCliente,
			"tipo_venta": inptselectTipoVentaCreditoCliente,
			"funt": "buscarDetallesPagosClienteAprobarSolicitudCredito"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=""	
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=""	
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {	
			 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud").innerHTML=datos[2]		
			
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

function buscarGraficaPromedioPagosClienteAprobarSolicitudCredito(cod_clienteAprobar){
	 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_cliente": cod_clienteAprobar,
		"funt": "buscar_dias_grafica_promedio_pago_solicitud_aprobar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
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
					
					if(obj_chart_promedio_pagos){
						obj_chart_promedio_pagos.destroy()
					}
					
					const data = {
					  labels: datos[3],
					  datasets: [{
						label: 'Promedio',
						data: datos[2],
						fill: false,
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					  }]
					};

					generar_graficos_promedio_atraso_pagos_cliente(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

let obj_chart_promedio_pagos = '';
function generar_graficos_promedio_atraso_pagos_cliente(data){
	const graph = document.querySelector("#line_chart_dias_atraso_aprobar_solicitud");


	const config = {
		type: 'line',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_promedio_pagos = new Chart(graph, config);
}

function buscarGraficaVentaTotalPagadoClienteAprobarSolicitudCredito(cod_clienteAprobar){
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_cliente": cod_clienteAprobar,
		"funt": "buscar_grafica_venta_total_pagado_solicitud_aprobar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
					
					if(obj_chart_venta_pagado){
						obj_chart_venta_pagado.destroy()
					}
					
					
					const labels = datos[2]
					let data = {
					labels: labels,
					datasets: [{
						label: ["T-VENTA"],
						data: datos[4],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  ["T-PAGADO"],
						data: datos[3],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_venta_total_cliente(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

let obj_chart_venta_pagado = '';
function generar_graficos_venta_total_cliente(data){
	const graph = document.querySelector("#bar_chart_estado_pagos");

	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_venta_pagado = new Chart(graph, config);
}


function buscarReferenciasComercialesAprobarSolicitudCredito(cod_clienteAprobar){ 


 document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			"navegador": navegador,
			"cod_cliente": cod_clienteAprobar,
			"funt": "buscar_referencias_comerciales_aprobar_solicitud",
			"formato": "json"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];
			if (Array.isArray(datos_buscados)) {
				renderReferenciasComercialesAprobarSolicitud(datos_buscados, "tbody_buscar_referencias_comerciales_aprobar_solicitud");
			} else {
				document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud").innerHTML=datos_buscados;
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




function buscarDetallesGaranteAprobarSolicitudCreditoBoton(){ 

	if(idgaranteCreditoPublic =='6'){
		return;
	}
	
	let inptselectTipoCuentaCreditoGarante =document.getElementById('inptselectTipoCuentaCreditoGarante').value
	let inptselectTipoVentaCreditoGarante =document.getElementById('inptselectTipoVentaCreditoGarante').value

 document.getElementById("ul_detalle_garante_aprobar_solicitud").innerHTML=paginacargando	 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"cod_cliente": idgaranteCreditoPublic,
			"tipo_cuenta": inptselectTipoCuentaCreditoGarante,
			"tipo_venta": inptselectTipoVentaCreditoGarante,
			"funt": "buscarDetallesGaranteAprobarSolicitudCredito"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	 document.getElementById("ul_detalle_garante_aprobar_solicitud").innerHTML=""	
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  	 document.getElementById("ul_detalle_garante_aprobar_solicitud").innerHTML=""	
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {	
			 document.getElementById("ul_detalle_garante_aprobar_solicitud").innerHTML=datos[2]		
			
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



function buscarSolicitudCreditoAprobar() {
	var Cliente = document.getElementById("inptBuscarHistorialCompletoCreditoAprobar").value.trim();
	var Local = document.getElementById("inptselectLocalHistorialCompleto").value.trim();
	var estado = document.getElementById("inptselectBuscarEstadoCreditoAprobar").value;
	var fecha1 = document.getElementById("fechaDesdeHistorialCompleto").value;
	var fecha2 = document.getElementById("fechaHastaHistorialCompleto").value;

	document.getElementById("table_frm_HistorialCompletoClientes").innerHTML = "" 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"Cliente": Cliente,
		"Local": Local,
		"estado": estado,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"funt": "buscarSolicitudCreditoAprobar",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_frm_HistorialCompletoClientes").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderSolicitudesCreditoAprobar(datos_buscados);
					} else {
						document.getElementById("table_frm_HistorialCompletoClientes").innerHTML = datos_buscados;
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




function ExporarInformeGeneralCredito() {
	$("#table_Informe_Credito").table2excel({
       exclude: ".noExl",
       name: "Excel Document Name"
       }); 
}
 
 
function toggleCredito(cod_venta, btn) {
    const $boton = $(btn);
    const $creditos = $(`div[name='Credito_${cod_venta}']`);

    // Verificamos si algún div está visible
    const algunoVisible = $creditos.is(':visible');

    if (algunoVisible) {
        // Ocultar todos
        $creditos.hide();
        $boton.text('+ Ver cuotas');
    } else {
        // Mostrar todos
        $creditos.show();
        $boton.text('- Ocultar cuotas');
    }
}

function imprimir_expediente(cod_ventFK) {	
	

document.getElementById('table_creditos_venta_expediente').innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_ventaFK": cod_ventFK,
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

 
 /* INFORME GENERAL DE CUENTAS CLIENTES */
 function vercerrarInformeGeneralCuentasCliente() {
	if(controlacceso("VERINFORMEGENERALCUENTASCLIENTE","accion")==false){return;}
	if (document.getElementById("divFrmInformeGeneralCuentasCliente").style.display == "") {		 
		document.getElementById("divFrmInformeGeneralCuentasCliente").style.display = "none"		
	} else {
		document.getElementById("divFrmInformeGeneralCuentasCliente").style.display = ""
	}
}
function buscarFrmInformeGeneralCuentasCliente() {
	var Cliente = document.getElementById("inptfiltroInformeGeneralCuentasCliente").value.trim();

	document.getElementById("table_frm_InformeGeneralCuentasCliente").innerHTML = "" 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"Cliente": Cliente,
		"funt": "buscarFrmInformeGeneralCuentasCliente"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_frm_InformeGeneralCuentasCliente").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("table_frm_InformeGeneralCuentasCliente").innerHTML = datos_buscados 
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

function buscarDetallesInformeGeneralCuentasCliente(cod_cliente){ 


	let inptselectTipoCuentaCreditoCuentaGeneralCliente =document.getElementById('inptselectTipoCuentaCreditoCuentaGeneralCliente').value
	let inptselectTipoVentaCreditoCuentaGeneralCliente =document.getElementById('inptselectTipoVentaCreditoCuentaGeneralCliente').value

 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=paginacargando	 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"cod_cliente": cod_cliente,
			"tipo_cuenta": inptselectTipoCuentaCreditoCuentaGeneralCliente,
			"tipo_venta": inptselectTipoVentaCreditoCuentaGeneralCliente,
			"funt": "buscarDetallesInformeGeneralCuentasCliente"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=""	
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  	 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=""	
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {	
			 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=datos[2]		
			
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

let cod_clienteInformeGeneralCuentasCliente = '';
function verCerrarDetalleCuentaCliente(cod_cliente){
	document.getElementById('divFrmInformeGeneralCuentasCliente1').style.display='none'
	document.getElementById('btn_informeg1').style.display='none'
	document.getElementById('btn_informeg2').style.display=''
	document.getElementById('divFrmInformeGeneralCuentasCliente2').style.display=''
	buscarDetallesInformeGeneralCuentasCliente(cod_cliente)
	cod_clienteInformeGeneralCuentasCliente = cod_cliente
}

function buscarDetallesInformeGeneralCuentasClienteBoton(){ 


	let inptselectTipoCuentaCreditoCuentaGeneralCliente =document.getElementById('inptselectTipoCuentaCreditoCuentaGeneralCliente').value
	let inptselectTipoVentaCreditoCuentaGeneralCliente =document.getElementById('inptselectTipoVentaCreditoCuentaGeneralCliente').value

 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=paginacargando	 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"cod_cliente": cod_clienteInformeGeneralCuentasCliente,
			"tipo_cuenta": inptselectTipoCuentaCreditoCuentaGeneralCliente,
			"tipo_venta": inptselectTipoVentaCreditoCuentaGeneralCliente,
			"funt": "buscarDetallesInformeGeneralCuentasCliente"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=""	
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  	 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=""	
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {	
			 document.getElementById("ul_creditos_cuenta_general_cliente").innerHTML=datos[2]		
			
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



/* INFORMACION APROBAR SOLICTUD GARANTE */
function buscarDatosGaranteAprobarSolictudCredito(Cod_solicitudCreditoAprobar) {
	

	document.getElementById("divdatosGaranteAprobarSolicitudGarante").innerHTML = "" 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_clienteAprobar": idgaranteCreditoPublic,		
		"Cod_solicitudCreditoAprobar": Cod_solicitudCreditoAprobar,
		"funt": "buscarDatosClienteAprobarSolictudCredito"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		  
		beforeSend: function () {
 
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divdatosGaranteAprobarSolicitudGarante").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("divdatosGaranteAprobarSolicitudGarante").innerHTML = datos_buscados 


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarVentasGaranteAprobarSolicitudCredito(){ 


 document.getElementById("tbody_buscar_ventas_aprobar_solicitud_garante").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			"navegador": navegador,
			"cod_cliente": idgaranteCreditoPublic,
			"funt": "buscar_ventas_aprobar_solicitud",
			"formato": "json"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("tbody_buscar_ventas_aprobar_solicitud_garante").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("tbody_buscar_ventas_aprobar_solicitud_garante").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];
			if (Array.isArray(datos_buscados)) {
				renderVentasAprobarSolicitudCredito(datos_buscados, "tbody_buscar_ventas_aprobar_solicitud_garante");
			} else {
				document.getElementById("tbody_buscar_ventas_aprobar_solicitud_garante").innerHTML=datos_buscados;
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
function buscarDetallesPagosGaranteAprobarSolicitudCredito(){ 


 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=paginacargando	 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"cod_cliente": idgaranteCreditoPublic,
			"funt": "buscarDetallesPagosClienteAprobarSolicitudCredito"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=""	
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=""	
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {	
			 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=datos[2]		
			
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
function buscarDetallesPagosGaranteAprobarSolicitudCreditoBoton(){ 


	let inptselectTipoCuentaCreditoGarante =document.getElementById('inptselectTipoCuentaCreditoGarante').value
	let inptselectTipoVentaCreditoGarante =document.getElementById('inptselectTipoVentaCreditoGarante').value

 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=paginacargando	 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"cod_garante": idgaranteCreditoPublic,
			"tipo_cuenta": inptselectTipoCuentaCreditoGarante,
			"tipo_venta": inptselectTipoVentaCreditoGarante,
			"funt": "buscarDetallesPagosClienteAprobarSolicitudCredito"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=""	
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  	 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=""	
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {	
			 document.getElementById("ul_pagos_creditos_vencidos_aprobar_solicitud_garante").innerHTML=datos[2]		
			
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
function buscarReferenciasComercialesAprobarSolicitudCreditoGarante(){ 


 document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud_garante").innerHTML=paginacargando		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			"navegador": navegador,
			"cod_cliente": idgaranteCreditoPublic,
			"funt": "buscar_referencias_comerciales_aprobar_solicitud",
			"formato": "json"
			};
	 $.ajax({			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
			 
		
			beforeSend: function(){					
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud_garante").innerHTML=''
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud_garante").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
            Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {						
		  var datos_buscados=datos[2];
			if (Array.isArray(datos_buscados)) {
				renderReferenciasComercialesAprobarSolicitud(datos_buscados, "tbody_buscar_referencias_comerciales_aprobar_solicitud_garante");
			} else {
				document.getElementById("tbody_buscar_referencias_comerciales_aprobar_solicitud_garante").innerHTML=datos_buscados;
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


/* GRAFICOS */
function buscarGraficaPromedioPagosGaranteAprobarSolicitudCredito(){
	 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_cliente": idgaranteCreditoPublic,
		"funt": "buscar_grafica_venta_total_pagado_solicitud_aprobar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
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
					
					if(obj_chart_promedio_pagos_garante){
						obj_chart_promedio_pagos_garante.destroy()
					}
					
					const data = {
					  labels: datos[3],
					  datasets: [{
						label: 'Promedio',
						data: datos[2],
						fill: false,
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					  }]
					};

					generar_graficos_promedio_atraso_pagos_garante(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

let obj_chart_promedio_pagos_garante = '';
function generar_graficos_promedio_atraso_pagos_garante(data){
	const graph = document.querySelector("#line_chart_dias_atraso_aprobar_solicitud_garante");


	const config = {
		type: 'line',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_promedio_pagos_garante = new Chart(graph, config);
}

function buscarGraficaVentaTotalPagadoGaranteAprobarSolicitudCredito(){
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_cliente": idgaranteCreditoPublic,
		"funt": "buscar_grafica_venta_total_pagado_solicitud_aprobar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
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
					
					if(obj_chart_venta_pagado_garante){
						obj_chart_venta_pagado_garante.destroy()
					}
					
					
					const labels = datos[2]
					let data = {
					labels: labels,
					datasets: [{
						label: ["T-VENTA"],
						data: datos[4],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  ["T-PAGADO"],
						data: datos[3],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_venta_total_garante(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}


let obj_chart_venta_pagado_garante = '';
function generar_graficos_venta_total_garante(data){
	const graph = document.querySelector("#bar_chart_estado_pagos_garante");

	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_venta_pagado_garante = new Chart(graph, config);
}


function verCerrarAsignarCallCenter() {
	if(document.getElementById("divAbmAsignarCallCenter").style.display==""){		
		$("div[id=divAbmAsignarCallCenter]").fadeOut(250)
	} else {
		if(cod_TareasCobrador==""){
			ver_vetana_informativa("FALTÓ SELECCIONAR UN REGISTRO")
			return false;
		}
		document.getElementById('inptAsignarCallCenter').value=""
		$("div[id=divAbmAsignarCallCenter]").fadeIn(250)
	}
}

function verificarcamposAsignarCallCenter(){
	var inptAsignarCallCenter = document.getElementById('inptAsignarCallCenter').value 
	
	if(inptAsignarCallCenter == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN USUARIO');
		return;
	}
	 
	abmAsignarCallCenter(inptAsignarCallCenter, cod_TareasCobrador );
}
 
 
 function abmAsignarCallCenter(cod_usuarioCalllCenter, cod_TareasCobrador ) {
	verCerrarEfectoCargando("1")
	
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "abmAsignarCallCenter")
	datos.append("cod_usuarioCalllCenter", cod_usuarioCalllCenter)
	datos.append("cod_TareasCobrador", cod_TareasCobrador) 
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
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
					 buscarTareasCobrador()
					verCerrarAsignarCallCenter()
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
VENTAS COMPLETADAS
*/
function verCerrarInformeVentasCompletadas(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divVentasCompletadas").style.display==""){
		if(controldebusquedadVentasCompletadas==true){
			ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
			return
		}
		limpiarcamposbuscadorVentasCompletadas()
		document.getElementById("divMinimizadoInformeVentasCompletadas").style.display="none" 
	$("div[id=divVentasCompletadas]").fadeOut(500);			
	}else{			
	// if(controlacceso("VERINFORMEDEGANANCIAPORVENTA","accion")==false){return;}
	mostrarSoloUno("divVentasCompletadas")
		document.getElementById("divVentasCompletadas").style.display=""
	}
}
function limpiarcamposbuscadorVentasCompletadas(){
	if(controldebusquedadVentasCompletadas==true){
	return
}
	document.getElementById("inptBuscarInfVentasCompletadasF1").value=""
	document.getElementById("inptBuscarInfVentasCompletadasF2").value=""
	document.getElementById("inptBuscarInfVentasCompletadas1").value=""
	document.getElementById("inptBuscarInfVentasCompletadas2").value=""
	document.getElementById("inptBuscarInfVentasCompletadas3").value=""
	document.getElementById("inptBuscarInfVentasCompletadas4").value=""
	document.getElementById("inptBuscarInfVentasCompletadas5").value=""
	document.getElementById("inptlocalInformeVentasCompletadas").value=""
	document.getElementById("inptBuscarInfVentasCompletadas6").value=""

	document.getElementById("inptTotalRegstroVentasCompletadas").value="" 
	document.getElementById("inptTotalVentaVentasCompletadas").value="" 
	document.getElementById("inptTotalPagadoVentasCompletadas").value="" 
	document.getElementById("table_historial_Ventas_Completadas").innerHTML=""
	document.getElementById("tbProcessVentasCompletadas").style.display="none"
}
function minimizarVentasCompletadas(){
	document.getElementById("divMinimizadoInformeVentasCompletadas").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuVentasCompletas"));
	$("div[id=divVentasCompletadas]").fadeOut(500);	
}
 
var TotalRegistroCargadoGanancias=0;

function checkHistorialVentasCompletadas(d){	
	if(d=="1"){
		document.getElementById('checkHistorialVentasCompletadas1').checked=true
		document.getElementById('checkHistorialVentasCompletadas2').checked=false
		document.getElementById('inptBuscarInfVentasCompletadasF1').value = "";
	    document.getElementById('inptBuscarInfVentasCompletadasF2').value = "";	
	}else{		
		document.getElementById('checkHistorialVentasCompletadas1').checked=false
		document.getElementById('checkHistorialVentasCompletadas2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInfVentasCompletadasF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInfVentasCompletadasF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


var registrocargadoVentasCompletadas="";
var totalregistroVentasCompletadas="";
var controldebusquedadVentasCompletadas=false
let nroRegistroControlDA;
function cancelarVentasCompletadas(){
	controldebusquedadVentasCompletadas=false
	document.getElementById("divProgressVentasCompletadas").style.backgroundColor='#ff5722'
}


function valorSeguroVentasCompletadas(valor) {
	return valor === null || typeof valor === "undefined" ? "" : String(valor);
}

function renderVentasCompletadas(filas, idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor || !Array.isArray(filas)) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.setAttribute("name", "tbregistroventacompletada");
		var celdas = [
			["td_id", registro.id_cliente, "", true],
			["td_id_2", registro.id_venta, "", true],
			["", registro.factura, "5%", false],
			["td_datos_1", registro.cliente, "20%", false],
			["", registro.documento, "10%", false],
			["td_datos_2", registro.telefono, "10%", false],
			["td_datos_3", registro.fecha_venta, "10%", false],
			["", registro.plazo, "5%", false],
			["", registro.total_pagado, "5%", false],
			["td_datos_4", registro.total_venta, "5%", false],
			["", registro.dias_atraso, "5%", false],
			["", registro.tipo_venta, "5%", false],
			["", registro.local, "5%", false],
			["", registro.estado_callcenter, "10%", false]
		];
		celdas.forEach(function (datoCelda) {
			var celda = document.createElement("td");
			if (datoCelda[0]) celda.id = datoCelda[0];
			if (datoCelda[2]) celda.style.width = datoCelda[2];
			if (datoCelda[3]) celda.style.display = "none";
			celda.textContent = valorSeguroVentasCompletadas(datoCelda[1]);
			fila.appendChild(celda);
		});
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function agregarContenedorMasVentasCompletadas(idPadre) {
	var padre = document.getElementById(idPadre);
	if (!padre) return;
	var siguiente = document.createElement("div");
	siguiente.id = "table_historial_Ventas_Completadas_mas";
	padre.appendChild(siguiente);
}

function buscarVentasCompletadas() {
	// if(controlacceso("VERINFORMEDEGANANCIAPORVENTA","accion")==false){return;}
	
	var fecha1 = document.getElementById('inptBuscarInfVentasCompletadasF1').value
	var fecha2 = document.getElementById('inptBuscarInfVentasCompletadasF2').value
	var nroventa = document.getElementById('inptBuscarInfVentasCompletadas1').value
	var cliente = document.getElementById('inptBuscarInfVentasCompletadas2').value
	var nrodocumento = document.getElementById('inptBuscarInfVentasCompletadas3').value
	var fechafiltro = document.getElementById('inptBuscarInfVentasCompletadas4').value
	var tipoventa = document.getElementById('inptBuscarInfVentasCompletadas5').value
	var cod_local = document.getElementById('inptlocalInformeVentasCompletadas').value
	var da = document.getElementById('inptBuscarInfVentasCompletadas6').value
	var estado_callcenter = document.getElementById('inptEstadoCallCenterVentaInformeVentasCompletadas').value
	
	if (document.getElementById('checkHistorialVentasCompletadas2').checked==true) {
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
	
if(controldebusquedadVentasCompletadas==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadVentasCompletadas=true
	document.getElementById("table_historial_Ventas_Completadas").innerHTML = paginacargando
	document.getElementById("tbProcessGananciaPorVenta").style.display="none" 
	document.getElementById("inptTotalVentaVentasCompletadas").value = ""; 
	document.getElementById("inptTotalPagadoVentasCompletadas").value = ""; 
	document.getElementById("inptTotalRegstroVentasCompletadas").value = "";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nroventa": nroventa,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cliente": cliente,
		"nrodocumento": nrodocumento,
		"fechafiltro": fechafiltro,
		"cod_local": cod_local,
		"tipoventa": tipoventa,
		"da": da,
		"estado_callcenter": estado_callcenter,
		"funt": "VentasCompletadas",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
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
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_Ventas_Completadas").innerHTML = ''
			controldebusquedadVentasCompletadas=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_Ventas_Completadas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
				var datos_buscados = datos[2];
				document.getElementById("inptTotalVentaVentasCompletadas").value = datos[8]; 
					document.getElementById("inptTotalPagadoVentasCompletadas").value = datos[5]; 
					document.getElementById("inptTotalRegstroVentasCompletadas").value = datos[7];
				if (Array.isArray(datos_buscados)) {
					renderVentasCompletadas(datos_buscados, "table_historial_Ventas_Completadas");
				} else {
					document.getElementById("table_historial_Ventas_Completadas").innerHTML = datos_buscados;
				}
				document.getElementById("inptTotalVentaGananciasVenta").value = datos[8];
				 nroRegistroControlDA = datos[110]
				 
				  
				 	registrocargadoVentasCompletadas=datos[99];
					totalregistroVentasCompletadas=datos[100];
				
						 if(totalregistroVentasCompletadas>registrocargadoVentasCompletadas){
						 	var porce=((registrocargadoVentasCompletadas*100)/totalregistroVentasCompletadas).toFixed(0)
						document.getElementById("divProgressVentasCompletadas").style.width=porce+"%"
						 agregarContenedorMasVentasCompletadas("table_historial_Ventas_Completadas");
						  buscarmasVentasCompletadas();
					 }else{
						 controldebusquedadVentasCompletadas=false
						 
						 if(da !=''){
							document.getElementById('inptTotalRegstroVentasCompletadas').value = nroRegistroControlDA;
						}
					 
					 }
					 
					 
				}
			} catch (error) {
				controldebusquedadVentasCompletadas=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
 
 
	
function buscarmasVentasCompletadas(c) {
	// if(controlacceso("VERINFORMEDEGANANCIAPORVENTA","accion")==false){return;}
	var fecha1 = document.getElementById('inptBuscarInfVentasCompletadasF1').value
	var fecha2 = document.getElementById('inptBuscarInfVentasCompletadasF2').value
	var nroventa = document.getElementById('inptBuscarInfVentasCompletadas1').value
	var cliente = document.getElementById('inptBuscarInfVentasCompletadas2').value
	var nrodocumento = document.getElementById('inptBuscarInfVentasCompletadas3').value
	var fechafiltro = document.getElementById('inptBuscarInfVentasCompletadas4').value
	var tipoventa = document.getElementById('inptBuscarInfVentasCompletadas5').value
	var cod_local = document.getElementById('inptlocalInformeVentasCompletadas').value
	var da = document.getElementById('inptBuscarInfVentasCompletadas6').value
	var estado_callcenter = document.getElementById('inptEstadoCallCenterVentaInformeVentasCompletadas').value
	if (document.getElementById('checkHistorialVentasCompletadas2').checked==true) {
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
	
	if(c=="1"){
		controldebusquedadVentasCompletadas=true
	}
if(controldebusquedadVentasCompletadas==false){
	return
}


controldebusquedadVentasCompletadas=true
	document.getElementById("table_historial_Ventas_Completadas_mas").innerHTML = paginacargando
	document.getElementById("tbProcessVentasCompletadas").style.display=""
	document.getElementById("divProgressVentasCompletadas").style.backgroundColor=''  
	var totalpagado=document.getElementById("inptTotalPagadoVentasCompletadas").value 
	var totalVenta=document.getElementById("inptTotalVentaVentasCompletadas").value 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nroventa": nroventa,
		"fecha1": fecha1,
		"fecha2": fecha2,  
		"cliente": cliente,
		"nrodocumento": nrodocumento,
		"fechafiltro": fechafiltro,
		"cod_local": cod_local,
		"tipoventa": tipoventa, 
		"totalpagado": totalpagado,
		"totalVenta": totalVenta,
		"da": da,
		"registrocargado": registrocargadoVentasCompletadas,
		"nroRegistroControlDA": nroRegistroControlDA,
		"estado_callcenter": estado_callcenter,
		"funt": "masVentasCompletadas",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
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
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_Ventas_Completadas_mas").innerHTML = ''
			document.getElementById("divProgressVentasCompletadas").style.backgroundColor='#ff5722'
			controldebusquedadVentasCompletadas=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_Ventas_Completadas_mas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
				var datos_buscados = datos[2]; 
					document.getElementById("inptTotalPagadoVentasCompletadas").value = datos[5]; 
					document.getElementById("inptTotalRegstroVentasCompletadas").value = datos[7];
					document.getElementById("inptTotalVentaVentasCompletadas").value = datos[8];
				if (Array.isArray(datos_buscados)) {
					renderVentasCompletadas(datos_buscados, "table_historial_Ventas_Completadas_mas");
				} else {
					document.getElementById("table_historial_Ventas_Completadas_mas").innerHTML = datos_buscados;
				}
				
 
				 	registrocargadoVentasCompletadas=datos[99];
				 	nroRegistroControlDA=datos[110];
					
					
						 if(totalregistroVentasCompletadas>registrocargadoVentasCompletadas){
						 	var porce=((registrocargadoVentasCompletadas*100)/totalregistroVentasCompletadas).toFixed(0)
							document.getElementById("divProgressVentasCompletadas").style.width=porce+"%"
							agregarContenedorMasVentasCompletadas("table_historial_Ventas_Completadas_mas");
							document.getElementById("table_historial_Ventas_Completadas_mas").id=""
							buscarmasVentasCompletadas();
					 }else{
						 document.getElementById("tbProcessVentasCompletadas").style.display="none"
						 controldebusquedadVentasCompletadas=false
					 }
					 
					 
					 if(da !='' && controldebusquedadVentasCompletadas==false){
						document.getElementById('inptTotalRegstroVentasCompletadas').value = nroRegistroControlDA;
					}
				}
			} catch (error) {
				document.getElementById("divProgressVentasCompletadas").style.backgroundColor='#ff5722'
				controldebusquedadVentasCompletadas=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}



/* GENERAR LISTA CALLCENTER VENTAS DESDE VENTAS CANCELADAS */
function VerCerrarVentanaListaCallCenterVentasCanceladas(d){
if(d == '1'){
	if(document.getElementById('table_historial_Ventas_Completadas').innerHTML == ''){
		ver_vetana_informativa("FALTÓ REALIZAR UNA BUSQUEDA PARA GENERAR LA LISTA")
		return;
	}
	
	var control=0;
	$("tr[name=tbregistroventacompletada]").each(function(i, elementohtml){
	
		
			control++;	
		
	
	});
	
	
	if(control == 0){
		ver_vetana_informativa('FALTÓ BUSCAR LOS CLIENTES NO ASIGNADOS');
		return;
	}
	
	buscar_agentes_CallCenterVentas()
		document.getElementById("divGenerarListaCallCenterVentas").style.display=""
		document.getElementById('inptCantidadClientesCallCenterVentas').value = document.getElementById('inptTotalRegstroVentasCompletadas').value
		
		
		document.getElementById('btnAbmListaCallCenterVentas').style.display= "none";
		document.getElementById('btnAbmListaCallCenterVentasNuevoCliente').style.display= "none";
		document.getElementById('btnAbmListaCallCenterVentasFinalizadas').style.display= "";
	}else{
		document.getElementById("divGenerarListaCallCenterVentas").style.display="none"
		document.getElementById("buscar_agente_CallCenterVentas").innerHTML = ""
		
}

}
function verificarGenerarListaCallCenterVentasFinalizadas(){
	var inptNombreCallCenterVentas = document.getElementById('inptNombreCallCenterVentas').value;
	var inptlocalClienteFiel = document.getElementById('inptlocalInformeVentasCompletadas').value;
	var condicion = '0';
	var inptZonaClienteFiel = '0';
	var inptBuscarClienteFielF1 ='';
	var inptBuscaClienteFielF2 = '';

	if(inptNombreCallCenterVentas ==''){
		ver_vetana_informativa('FALTO INGRESAR EL NOMBRE DEL LISTADO');
		return;
	}
	
	if(array_agentes_ventas == ''){
		ver_vetana_informativa('FALTO SELECCIONAR EL/LOS AGENTES ENCARGADOS');
		return;
	}
	
	generarListaCallCenterVentasFinalizadas(inptNombreCallCenterVentas,inptlocalClienteFiel,inptZonaClienteFiel,condicion,inptBuscarClienteFielF1,inptBuscaClienteFielF2);
}
function generarListaCallCenterVentasFinalizadas(nombre,cod_local,cod_zona,condicion,fecha_inicio,fecha_fin){
	
	verCerrarEfectoCargando("1")
		var datos = new FormData();
	var control=1;
	$("tr[name=tbregistroventacompletada]").each(function(i, elementohtml){	
	
	var cliente=$(elementohtml).children('td[id="td_datos_1"]').html();
    datos.append("cliente"+control, cliente)
	
	var fecha=$(elementohtml).children('td[id="td_datos_3"]').html();
    datos.append("fecha"+control, fecha)	
	
	var total_venta=$(elementohtml).children('td[id="td_datos_4"]').html();
    datos.append("total_venta"+control, total_venta)
	
	var cod_clienteFK=$(elementohtml).children('td[id="td_id"]').html();
    datos.append("cod_clienteFK"+control, cod_clienteFK)
	
	var cod_venta=$(elementohtml).children('td[id="td_id_2"]').html();
    datos.append("cod_venta"+control, cod_venta)
	
	var telefono=$(elementohtml).children('td[id="td_datos_2"]').html();
    datos.append("telefono"+control, telefono)
	
	control=control+1;	
	});
	   
	   
	control=control-1;	
	if(control<=0){
	ver_vetana_informativa("FALTO DATOS DE CLIENTE")
	return false ;
	}
	
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("nombre", nombre)
	datos.append("cod_local", cod_local)
	datos.append("cod_zona", cod_zona)
	datos.append("condicion", condicion)
	datos.append("fecha_inicio", fecha_inicio)
	datos.append("fecha_fin", fecha_fin)
	datos.append("totalRegistro", control)
	datos.append("desde", 'RECIEN-CANCELADOS')
	datos.append("funt", "generarListaCallCenterVentas")
	datos.append("array_agentes_ventas", JSON.stringify(array_agentes_ventas))
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCallCenterVenta.php",
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
					limpiarventanaGenerarCallCenterVentas()
					VerCerrarVentanaListaCallCenterVentas('2')
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
ABM PARAMETRO SOLICITUD
*/
function verCerrarAbmParametroSolicitud(){
		document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmParametroSolicitud").style.display==""){
		document.getElementById("divMinimizadoParametroSolicitud").style.display="none"
		 
		$("div[id=divAbmParametroSolicitud]").fadeOut(500);	
	}else{
		mostrarSoloUno("divAbmParametroSolicitud")	
		cargarParametros();
		cargarParametros_regla();
		document.getElementById("divAbmParametroSolicitud").style.display=""
		 
	}
}


function minimizarabmParametroSolicitud(){ 
	$("div[id=divAbmParametroSolicitud]").fadeOut(500);	
	document.getElementById("divMinimizadoParametroSolicitud").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmParametroSolicitud"));
}


// 🟢 Función para abrir modal y llenar campos
  function editarParametro(data) {
    document.getElementById('edit_id').value = data.id;
    document.getElementById('edit_categoria').value = data.categoria;
    document.getElementById('edit_descripcion').value = data.descripcion;
    document.getElementById('edit_minimo').value = data.minimo;
    document.getElementById('edit_maximo').value = data.maximo;
    document.getElementById('edit_valor_texto').value = data.valor_texto;
    document.getElementById('edit_puntaje').value = data.puntaje;
    document.getElementById('edit_tipo').value = data.tipo;
    new bootstrap.Modal(document.getElementById('modalEditar')).show();
  }

// 🟢 Cargar tabla desde PHP (Ajax estilo jQuery)
function cargarParametros() {
    $("#tablaParametros tbody").html('<tr><td colspan="8">Cargando...</td></tr>');
    
    var datos = { accion: "listar" };

    $.ajax({
        url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
        type: "POST",
        data: datos,
        beforeSend: function() {
            // opcional: mostrar spinner
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al cargar parámetros:", textStatus);
            $("#tablaParametros tbody").html('<tr><td colspan="8">Error al cargar datos</td></tr>');
        },
        success: function(responseText) {
            try {
                var res = $.parseJSON(responseText);
                if(res.success) {
                    var tbodyHtml = "";
                    res.data.forEach(function(row){
                        tbodyHtml += `
                            <tr>
                                <td>${row.categoria}</td>
                                <td>${row.descripcion}</td>
                                <td>${row.minimo}</td>
                                <td>${row.maximo}</td>
                                <td>${row.valor_texto}</td>
                                <td>${row.puntaje}</td>
                                <td>${row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1)}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm" onclick='editarParametro(${JSON.stringify(row)})'>Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick='eliminarParametro(${row.id})'>Eliminar</button>
                                </td>
                            </tr>
                        `;
                    });
                    $("#tablaParametros tbody").html(tbodyHtml);
                } else {
                    $("#tablaParametros tbody").html('<tr><td colspan="8">No hay datos</td></tr>');
                    alert("Error: " + res.message);
                }
            } catch (error) {
                console.error("Error parseando respuesta:", error, responseText);
                $("#tablaParametros tbody").html('<tr><td colspan="8">Error al procesar datos</td></tr>');
            }
        }
    });
}
 
// 🟢 Eliminar parámetro (Ajax estilo jQuery)
function eliminarParametro(id){
    if(confirm("¿Eliminar este parámetro?")){
        var datos = { accion: "eliminar", id: id };

        $.ajax({
            url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
            type: "POST",
            data: datos,
            beforeSend: function(){},
            error: function(jqXHR, textStatus, errorThrown){
                alert("Error al eliminar parámetro: " + textStatus);
            },
            success: function(responseText){
                try {
                    var res = $.parseJSON(responseText);
                    if(res.success){
                        alert("Parámetro eliminado!");
                        cargarParametros();
                    } else {
                        alert("Error: " + res.message);
                    }
                } catch(error){
                    console.error("Error parseando respuesta:", error, responseText);
                }
            }
        });
    }
}

// Cargar tabla al inicio
function mostrarToast(mensaje, tipo="success") {
    const tipos = {
        success: { color: "bg-success", icon: "✔️" },
        warning: { color: "bg-warning text-dark", icon: "⚠️" },
        danger: { color: "bg-danger", icon: "❌" },
        info: { color: "bg-info text-dark", icon: "ℹ️" }
    };

    const { color, icon } = tipos[tipo] || tipos.info;
    const toastId = "toast" + Date.now();

   const toastHtml = 
  '<div id="' + toastId + '" class="toast align-items-center ' + color + ' border-0 shadow-lg mb-3" role="alert" aria-live="assertive" aria-atomic="true">' +
    '<div class="d-flex">' +
      '<div class="toast-body d-flex align-items-center">' +
        '<span class="me-2" style="font-size:1.2rem;">' + icon + '</span>' +
        '<span>' + mensaje + '</span>' +
      '</div>' +
      '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>' +
    '</div>' +
  '</div>';


    $("#toastContainer").append(toastHtml);

    const toastEl = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000, animation: true });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', function () {
        toastEl.remove();
    });
}

// 🟢 Editar parámetro al hacer click
$(document).ready(function(){
  $("#btnEditarParametro").on("click", function(e){
    e.preventDefault(); 
    e.stopPropagation();

    var form = document.getElementById("formEditar");
    var formData = new FormData(form);
    formData.append("accion", "editar");

    $.ajax({
      url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function(){
        // opcional: mostrar loader
      },
      error: function(jqXHR, textStatus){
        mostrarToast("Error al editar parámetro: " + textStatus, "danger");
      },
      success: function(responseText){
        try {
          var res = $.parseJSON(responseText);
          if(res.success){
            mostrarToast("Parámetro actualizado!", "success");

            bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();

            if(typeof cargarParametros === "function"){
              cargarParametros();
            }
          } else {
            mostrarToast("Error: " + res.message, "warning");
          }
        } catch (error) {
          console.error("Error parseando respuesta:", error, responseText);
          mostrarToast("Error procesando la respuesta del servidor", "danger");
        }
      }
    });
  }); 
}); 

$(document).ready(function(){
    $("#btnAgregarParametro").on("click", function(e){
        e.preventDefault(); 
        e.stopPropagation();
 
        var form = document.getElementById("formAgregar");
        var formData = new FormData(form);
        formData.append("accion", "agregar");

        $.ajax({
            url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(responseText){
                try {
                    var res = $.parseJSON(responseText);
                    if(res.success){
                        mostrarToast("Parámetro agregado!", "success");
                        bootstrap.Modal.getInstance(document.getElementById('modalAgregar')).hide();
                        if(typeof cargarParametros === "function") cargarParametros();
                        form.reset();
                    } else {
                        mostrarToast("Error: " + res.message, "warning");
                    }
                } catch(e) {
                    mostrarToast("Error procesando la respuesta", "danger");
                    console.error(e, responseText);
                }
            },
            error: function(jqXHR, textStatus){
                mostrarToast("Error al agregar parámetro: " + textStatus, "danger");
            }
        });
    });
});

function NuevoParametro() { 
    new bootstrap.Modal(document.getElementById('modalAgregar')).show();
  }





// 🟢 Función para abrir modal y llenar campos
  function editarParametro_regla(data) {
    document.getElementById('edit_id_regla').value = data.id;
    document.getElementById('edit_nombre_regla').value = data.nombre_regla; 
    document.getElementById('edit_minimo_regla').value = data.puntaje_minimo;
    document.getElementById('edit_maximo_regla').value = data.puntaje_maximo; 
    document.getElementById('edit_tipo_regla').value = data.resultado;
    new bootstrap.Modal(document.getElementById('modalEditar_regla')).show();
  }

// 🟢 Cargar tabla desde PHP (Ajax estilo jQuery)
function cargarParametros_regla() {
    $("#tablaEvaluacion tbody").html('<tr><td colspan="8">Cargando...</td></tr>');
    
    var datos = { accion: "listar_reglas" };

    $.ajax({
        url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
        type: "POST",
        data: datos,
        beforeSend: function() {
            // opcional: mostrar spinner
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al cargar parámetros:", textStatus);
            $("#tablaEvaluacion tbody").html('<tr><td colspan="8">Error al cargar datos</td></tr>');
        },
        success: function(responseText) {
            try {
                var res = $.parseJSON(responseText);
                if(res.success) {
                    var tbodyHtml = "";
                    res.data.forEach(function(row){
                        tbodyHtml += `
                            <tr>
                                <td>${row.nombre_regla}</td> 
                                <td>${row.puntaje_minimo}</td>
                                <td>${row.puntaje_maximo}</td>
                                <td>${row.resultado}</td> 
                                <td>
                                    <button class="btn btn-warning btn-sm" onclick='editarParametro_regla(${JSON.stringify(row)})'>Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick='eliminarParametro_regla(${row.id})'>Eliminar</button>
                                </td>
                            </tr>
                        `;
                    });
                    $("#tablaEvaluacion tbody").html(tbodyHtml);
                } else {
                    $("#tablaEvaluacion tbody").html('<tr><td colspan="8">No hay datos</td></tr>');
                    alert("Error: " + res.message);
                }
            } catch (error) {
                console.error("Error parseando respuesta:", error, responseText);
                $("#tablaEvaluacion tbody").html('<tr><td colspan="8">Error al procesar datos</td></tr>');
            }
        }
    });
}
 
// 🟢 Eliminar parámetro (Ajax estilo jQuery)
function eliminarParametro_regla(id){
    if(confirm("¿Eliminar este parámetro?")){
        var datos = { accion: "eliminar_reglas", id: id };

        $.ajax({
            url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
            type: "POST",
            data: datos,
            beforeSend: function(){},
            error: function(jqXHR, textStatus, errorThrown){
                alert("Error al eliminar parámetro: " + textStatus);
            },
            success: function(responseText){
                try {
                    var res = $.parseJSON(responseText);
                    if(res.success){
                        alert("Parámetro eliminado!");
                        cargarParametros_regla();
                    } else {
                        alert("Error: " + res.message);
                    }
                } catch(error){
                    console.error("Error parseando respuesta:", error, responseText);
                }
            }
        });
    }
}


// 🟢 Editar parámetro al hacer click
$(document).ready(function(){
  $("#btnEditarParametro_regla").on("click", function(e){
    e.preventDefault(); 
    e.stopPropagation();

    var form = document.getElementById("formEditar_regla");
    var formData = new FormData(form);
    formData.append("accion", "editar_reglas");

    $.ajax({
      url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function(){
        // opcional: mostrar loader
      },
      error: function(jqXHR, textStatus){
        mostrarToast("Error al editar parámetro: " + textStatus, "danger");
      },
      success: function(responseText){
        try {
          var res = $.parseJSON(responseText);
          if(res.success){
            mostrarToast("Reglamento actualizado!", "success");

            bootstrap.Modal.getInstance(document.getElementById('modalEditar_regla')).hide();

            if(typeof cargarParametros === "function"){
              cargarParametros_regla();
            }
          } else {
            mostrarToast("Error: " + res.message, "warning");
          }
        } catch (error) {
          console.error("Error parseando respuesta:", error, responseText);
          mostrarToast("Error procesando la respuesta del servidor", "danger");
        }
      }
    });
  }); 
}); 

$(document).ready(function(){
    $("#btnAgregarParametro_regla").on("click", function(e){
        e.preventDefault(); 
        e.stopPropagation();
 
        var form = document.getElementById("formAgregar_regla");
        var formData = new FormData(form);
        formData.append("accion", "agregar_reglas");

        $.ajax({
            url: "/GoodVentaElectroCasaMaric/php_system/abmParametroSolicitud.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(responseText){
                try {
                    var res = $.parseJSON(responseText);
                    if(res.success){
                        mostrarToast("Parámetro agregado!", "success");
                        bootstrap.Modal.getInstance(document.getElementById('modalAgregar_regla')).hide();
                        if(typeof cargarParametros_regla === "function") cargarParametros_regla();
                        form.reset();
                    } else {
                        mostrarToast("Error: " + res.message, "warning");
                    }
                } catch(e) {
                    mostrarToast("Error procesando la respuesta", "danger");
                    console.error(e, responseText);
                }
            },
            error: function(jqXHR, textStatus){
                mostrarToast("Error al agregar parámetro: " + textStatus, "danger");
            }
        });
    });
});

function NuevoParametro_reglas() { 
    new bootstrap.Modal(document.getElementById('modalAgregar_regla')).show();
  }



/*
INFORME CLIENTES NUEVOS
*/
function verCerrarInformeClientesNuevos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divClientesNuevos").style.display==""){
		if(controldebusquedadClientesNuevos==true){
			ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
			return
		}
		limpiarcamposbuscadorClientesNuevos()
		document.getElementById("divMinimizadoInformeClientesNuevos").style.display="none" 
	$("div[id=divClientesNuevos]").fadeOut(500);			
	}else{			
if(controlacceso("VERINFORMECLIENTESNUEVOS","accion")==false){return;}	
	
	mostrarSoloUno("divClientesNuevos")
		document.getElementById("divClientesNuevos").style.display=""
	}
}
function limpiarcamposbuscadorClientesNuevos(){
	if(controldebusquedadClientesNuevos==true){
	return
}
	document.getElementById("inptBuscarInfClientesNuevosF1").value=""
	document.getElementById("inptBuscarInfClientesNuevosF2").value=""
	document.getElementById("inptBuscarInfClientesNuevos2").value=""
	document.getElementById("inptBuscarInfClientesNuevos3").value=""
	document.getElementById("inptlocalInformeClientesNuevos").value=""
	document.getElementById("inptBuscarInfClientesNuevos5").value=""
	

	document.getElementById("inptTotalRegstroClientesNuevos").value="" 
	
	document.getElementById("table_historial_Clientes_Nuevos").innerHTML=""
	document.getElementById("tbProcessClientesNuevos").style.display="none"
}
function minimizarClientesNuevos(){
	document.getElementById("divMinimizadoInformeClientesNuevos").style.display=""
 copiarBotonEnContenedor(document.getElementById("divMenuClientesNuevos"));
	$("div[id=divClientesNuevos]").fadeOut(500);	
}
 
var TotalRegistroCargadoGanancias=0;

function checkHistorialClientesNuevos(d){	
	if(d=="1"){
		document.getElementById('checkHistorialClientesNuevos1').checked=true
		document.getElementById('checkHistorialClientesNuevos2').checked=false
		document.getElementById('inptBuscarInfClientesNuevosF1').value = "";
	    document.getElementById('inptBuscarInfClientesNuevosF2').value = "";	
	}else{		
		document.getElementById('checkHistorialClientesNuevos1').checked=false
		document.getElementById('checkHistorialClientesNuevos2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInfClientesNuevosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInfClientesNuevosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


var registrocargadoClientesNuevos="";
var totalregistroClientesNuevos="";
var controldebusquedadClientesNuevos=false
function cancelarClientesNuevos(){
	controldebusquedadClientesNuevos=false
	document.getElementById("divProgressClientesNuevos").style.backgroundColor='#ff5722'
}

let controlagrupacionclientesnuevos = '1'
function verCerrarVentanasClientesNuevos(d){
	document.getElementById("btnInformeClientesNuevos1").style=''
	document.getElementById("btnInformeClientesNuevos2").style=''
	
	if(d=="1"){
		document.getElementById("btnInformeClientesNuevos1").style='background-color:#FF9800;color:#fff'
		controlagrupacionclientesnuevos = '1'
		}
	if(d=="2"){
		document.getElementById("btnInformeClientesNuevos2").style='background-color:#FF9800;color:#fff'
			controlagrupacionclientesnuevos = '2'
	}	
	
}

function renderClientesNuevos(filas, idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor || !Array.isArray(filas)) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		var datosCeldas = [
			[registro.cliente, "20%"],
			[registro.documento, "10%"],
			[registro.telefono, "10%"]
		];
		datosCeldas.forEach(function (dato) {
			var celda = document.createElement("td");
			celda.style.width = dato[1];
			celda.textContent = dato[0] === null || typeof dato[0] === "undefined" ? "" : String(dato[0]);
			fila.appendChild(celda);
		});
		var celdaTipos = document.createElement("td");
		celdaTipos.style.width = "10%";
		var tiposVenta = Array.isArray(registro.tipos_venta) ? registro.tipos_venta : [];
		tiposVenta.forEach(function (tipoVenta) {
			var tablaTipo = document.createElement("table");
			tablaTipo.setAttribute("border", "1");
			tablaTipo.setAttribute("cellspacing", "1");
			tablaTipo.setAttribute("cellpadding", "5");
			var cuerpoTipo = document.createElement("tbody");
			var filaTipo = document.createElement("tr");
			filaTipo.id = "tbSelecRegistro";
			var celdaTipo = document.createElement("td");
			celdaTipo.style.width = "100%";
			celdaTipo.textContent = tipoVenta === null ? "" : String(tipoVenta);
			filaTipo.appendChild(celdaTipo);
			cuerpoTipo.appendChild(filaTipo);
			tablaTipo.appendChild(cuerpoTipo);
			celdaTipos.appendChild(tablaTipo);
		});
		fila.appendChild(celdaTipos);
		[registro.local, registro.cantidad_ventas].forEach(function (valor) {
			var celda = document.createElement("td");
			celda.style.width = "10%";
			celda.textContent = valor === null || typeof valor === "undefined" ? "" : String(valor);
			fila.appendChild(celda);
		});
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function agregarContenedorMasClientesNuevos(idPadre) {
	var padre = document.getElementById(idPadre);
	if (!padre) return;
	var siguiente = document.createElement("div");
	siguiente.id = "table_historial_Clientes_Nuevos_mas";
	padre.appendChild(siguiente);
}

function buscarClientesNuevos() {
	// if(controlacceso("VERINFORMEDEGANANCIAPORVENTA","accion")==false){return;}
	
	var fecha1 = document.getElementById('inptBuscarInfClientesNuevosF1').value
	var fecha2 = document.getElementById('inptBuscarInfClientesNuevosF2').value
	
	var cliente = document.getElementById('inptBuscarInfClientesNuevos2').value
	var nrodocumento = document.getElementById('inptBuscarInfClientesNuevos3').value
	var cod_local = document.getElementById('inptlocalInformeClientesNuevos').value
	var cantidad_ventas = document.getElementById('inptBuscarInfClientesNuevos4').value
	var tipo_venta = document.getElementById('inptBuscarInfClientesNuevos5').value
	
	if (document.getElementById('checkHistorialClientesNuevos2').checked==true) {
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
	
if(controldebusquedadClientesNuevos==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadClientesNuevos=true
	document.getElementById("table_historial_Clientes_Nuevos").innerHTML = paginacargando
	document.getElementById("tbProcessClientesNuevos").style.display="none"  
	document.getElementById("inptTotalRegstroClientesNuevos").value = "";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cliente": cliente,
		"cod_local": cod_local,
		"nrodocumento": nrodocumento,
		"cantidad_ventas": cantidad_ventas,
		"controlagrupacionclientesnuevos": controlagrupacionclientesnuevos,
		"tipo_venta": tipo_venta,
		"funt": "ClientesNuevos",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
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
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_Clientes_Nuevos").innerHTML = ''
			controldebusquedadClientesNuevos=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_Clientes_Nuevos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
				var datos_buscados = datos[2];
					document.getElementById("inptTotalRegstroClientesNuevos").value = datos[3];
				if (Array.isArray(datos_buscados)) {
					renderClientesNuevos(datos_buscados, "table_historial_Clientes_Nuevos");
				} else {
					document.getElementById("table_historial_Clientes_Nuevos").innerHTML = datos_buscados;
				}
				
				 
				  
				 	registrocargadoClientesNuevos=datos[99];
					totalregistroClientesNuevos=datos[100];
				
						 if(totalregistroClientesNuevos>registrocargadoClientesNuevos){
						 	var porce=((registrocargadoClientesNuevos*100)/totalregistroClientesNuevos).toFixed(0)
						document.getElementById("divProgressClientesNuevos").style.width=porce+"%"
						 agregarContenedorMasClientesNuevos("table_historial_Clientes_Nuevos");
						  buscarmasClientesNuevos();
					 }else{
						 controldebusquedadClientesNuevos=false
						 
						
					 }
					 
					 
				}
			} catch (error) {
				controldebusquedadClientesNuevos=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
 
 
	
function buscarmasClientesNuevos(c) {
	var fecha1 = document.getElementById('inptBuscarInfClientesNuevosF1').value
	var fecha2 = document.getElementById('inptBuscarInfClientesNuevosF2').value
	var cliente = document.getElementById('inptBuscarInfClientesNuevos2').value
	var nrodocumento = document.getElementById('inptBuscarInfClientesNuevos3').value
	var cod_local = document.getElementById('inptlocalInformeClientesNuevos').value
	var cantidad_ventas = document.getElementById('inptBuscarInfClientesNuevos4').value
	var tipo_venta = document.getElementById('inptBuscarInfClientesNuevos5').value
	if (document.getElementById('checkHistorialClientesNuevos2').checked==true) {
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
	
	if(c=="1"){
		controldebusquedadClientesNuevos=true
	}
if(controldebusquedadClientesNuevos==false){
	return
}


controldebusquedadClientesNuevos=true
	document.getElementById("table_historial_Clientes_Nuevos_mas").innerHTML = paginacargando
	document.getElementById("tbProcessClientesNuevos").style.display=""
	document.getElementById("divProgressClientesNuevos").style.backgroundColor=''  
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,  
		"cliente": cliente,
		"nrodocumento": nrodocumento,
		"cod_local": cod_local,
		"registrocargado": registrocargadoClientesNuevos,
		"cantidad_ventas": cantidad_ventas,
		"controlagrupacionclientesnuevos": controlagrupacionclientesnuevos,
		"tipo_venta": tipo_venta,
		"funt": "masClientesNuevos",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
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
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_Clientes_Nuevos_mas").innerHTML = ''
			document.getElementById("divProgressClientesNuevos").style.backgroundColor='#ff5722'
			controldebusquedadClientesNuevos=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_historial_Clientes_Nuevos_mas").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
               Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				
				var datos_buscados = datos[2]; 
					
					document.getElementById("inptTotalRegstroClientesNuevos").value = datos[7];
				if (Array.isArray(datos_buscados)) {
					renderClientesNuevos(datos_buscados, "table_historial_Clientes_Nuevos_mas");
				} else {
					document.getElementById("table_historial_Clientes_Nuevos_mas").innerHTML = datos_buscados;
				}
				
 
				 	registrocargadoClientesNuevos=datos[99];
					
					
						 if(totalregistroClientesNuevos>registrocargadoClientesNuevos){
						 	var porce=((registrocargadoClientesNuevos*100)/totalregistroClientesNuevos).toFixed(0)
							document.getElementById("divProgressClientesNuevos").style.width=porce+"%"
							agregarContenedorMasClientesNuevos("table_historial_Clientes_Nuevos_mas");
							document.getElementById("table_historial_Clientes_Nuevos_mas").id=""
							buscarmasClientesNuevos();
					 }else{
						 document.getElementById("tbProcessClientesNuevos").style.display="none"
						 controldebusquedadClientesNuevos=false
					 }
				}
			} catch (error) {
				document.getElementById("divProgressClientesNuevos").style.backgroundColor='#ff5722'
				controldebusquedadClientesNuevos=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
 
/*
APROBAR SOLICITUD CREDITO 
*/
function vercerrarDashboardSocio(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divFrmHistorialCompletoSocio").style.display==""){ 
		document.getElementById("divMinimizadoCreditoAprobar").style.display="none"
		 
		$("div[id=divFrmHistorialCompletoSocio]").fadeOut(500);	 
	}else{	 
		mostrarSoloUno("divFrmHistorialCompletoSocio")
		limpiarDashboardSoci()
		document.getElementById("divFrmHistorialCompletoSocio").style.display=""
		 
	}
}
  
 function limpiarDashboardSoci(){
	document.getElementById('inptBuscarHistorialCompletoCreditoAprobar').value=""
	
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('fechaDesdeHistorialCompleto').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('fechaHastaHistorialCompleto').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
 }
 
 function vermodalfaja(){
	if(document.getElementById("DivmodalFaja").style.display==""){  
		document.getElementById("DivmodalFaja").style.display="none" 
	}else{	  
		document.getElementById("DivmodalFaja").style.display="" 
	 
	} 
 }



 
/*
APROBAR SOLICITUD CREDITO 
*/
function vercerrarVerificarEquifax(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divFrmVerificarEquifax").style.display==""){ 
		document.getElementById("divMinimizadoVerificarEquifax").style.display="none"
		document.getElementById("divMinimizadoVerificarEquifax2").style.display="none"
		 
		$("div[id=divFrmVerificarEquifax]").fadeOut(500);	 
	}else{	 
		mostrarSoloUno("divFrmVerificarEquifax")
		limpiarVerificarEquifaxSolicitudCredito()
		document.getElementById("divFrmVerificarEquifax").style.display=""
		 
	}
}
 
 function limpiarVerificarEquifaxSolicitudCredito(){
	document.getElementById('inptBuscarVerificarEquifax').value=""
	
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('fechaDesdeVerificarEquifax').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('fechaHastaVerificarEquifax').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
 }
 

function buscarSolicitudCreditoVerificarEquifax() {
	var Cliente = document.getElementById("inptBuscarVerificarEquifax").value.trim();
	var Local = document.getElementById("inptBuscarLocalVerificarEquifax").value.trim();
	var estado = document.getElementById("inptselectBuscarEstadoVerificarEquifax").value;
	var fecha1 = document.getElementById("fechaDesdeVerificarEquifax").value;
	var fecha2 = document.getElementById("fechaHastaVerificarEquifax").value;

	document.getElementById("table_frm_VerificarEquifax").innerHTML = "" 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"Cliente": Cliente,
		"Local": Local,
		"estado": estado,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"funt": "buscarSolicitudCreditoVerificarEquifax",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_frm_VerificarEquifax").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderSolicitudesCreditoAprobar(datos_buscados, {
							idContenedor: "table_frm_VerificarEquifax",
							etiquetaEstado: "EQUIFAX",
							alSeleccionar: function (registro) {
								vercerrarcontenedorInforconf({
									idSolicitud: registro.id_solicitud,
									cod_cliente: registro.id_cliente,
									cod_codeudorFK: registro.id_garante,
									nombre_persona: registro.nombre_accion || registro.cliente,
									garante: registro.garante || ""
								});
							}
						});
					} else {
						document.getElementById("table_frm_VerificarEquifax").innerHTML = datos_buscados;
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
 
/*
APROBAR SOLICITUD CREDITO 
*/ 
function vercerrarcontenedorInforconf(datos){ 
	if(document.getElementById("contenedorInforconf").style.display==""){  		 
		$("div[id=contenedorInforconf]").fadeOut(500);	 
	}else{ 

		cod_solicitudCredito=datos.idSolicitud
		cod_ClienteEquifaxFK=datos.cod_cliente
		cod_GaranteEquifaxFK=datos.cod_codeudorFK
		limpiarEquifax()
		limpiarEquifaxGarante()
		document.getElementById("lblEquifaxCliente").innerHTML="Inforconf: "+datos.nombre_persona
		document.getElementById("lblEquifaxGarente").innerHTML="Inforconf: "+datos.garante

		if(cod_GaranteEquifaxFK=="6"){
			document.getElementById("divContenedorGaranteEquifax").style.display="none"	
		}else{
			document.getElementById("divContenedorGaranteEquifax").style.display=""	
		}

		document.getElementById("contenedorInforconf").style.display=""		 
	}
}


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnSeleccionar')) {
        var datos = JSON.parse(e.target.dataset.datos);
        vercerrarcontenedorInforconf(datos);
    }
});





  
function VerificarAbmCargaPdfEquifax(){
 
	let fecha = new Date();	

	if(!validarArchivoInforconfSeleccionado("file_PDF_cliente", archivoPDF, extensionPDF)){
		return false;
	}
	
	accion = "addEquifax";
	AbmCargarAbmCargaPdfEquifax(accion,fecha,cod_ClienteEquifaxFK);

}


var cod_solicitudCredito="";
var cod_ClienteEquifaxFK="";
var cod_GaranteEquifaxFK="";

function AbmCargarAbmCargaPdfEquifax(accion,fecha,cod_clienteFK){
	
var estado = document.getElementById("inputhistorialInforconf_cliente").value.trim();

if(estado==""){
	ver_vetana_informativa("FAÑTO SELECCIONAR EL ESTADO DEL INFORCONF");
	return false;
}

	verCerrarEfectoCargando("1")
	var datos = new FormData();	
	obtener_datos_user();	 
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idclientefk", cod_clienteFK)
	datos.append("fecha", fecha)
	datos.append("archivo", archivoPDF)
	datos.append("ext", extensionPDF)
	datos.append("estado", estado)
	datos.append("descripcion", "5") 
	datos.append("cod_solicitud_credito", cod_solicitudCredito) 
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					ver_vetana_informativa("DATOS GUARDADOS CON EXITO")
					limpiarEquifax()
				}
				else if (datos[2]) {
					ver_vetana_informativa(datos[2])
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


function limpiarEquifax(){

	document.getElementById("inputhistorialInforconf_cliente").value="";
	document.getElementById("file_PDF_cliente").value="";
	archivoPDF = "";
	extensionPDF = "";

	  document.getElementById("text-cargaPDF_cliente").style.display = "";
      document.getElementById("text-carga-PDF_cliente").style.display = "none";
      document.getElementById("nombreArchivo_cliente").textContent = "" ;
 
      document.getElementById("progressBar_cliente").style.display = "none";
      document.getElementById("progressBarInner_cliente").style.width = "0%";
 
}



let extensionPDF = "";
let archivoPDF = "";

function validarArchivoInforconfSeleccionado(inputId, archivoBase64, extensionArchivo){
	var inputArchivo = document.getElementById(inputId);

	if(!inputArchivo || !inputArchivo.files || inputArchivo.files.length == 0 || archivoBase64 == "" || extensionArchivo == ""){
		ver_vetana_informativa("FALTO SELECCIONAR EL ARCHIVO PDF DEL INFORCONF");
		return false;
	}

	return true;
}

function readFileDocPDF(input) {

    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    const filename = file.name;
    const tamanho = file.size;
    const allowedTypes = ['application/pdf'];

    if (tamanho > 5000000) {
        ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb");
        input.value = "";
		archivoPDF = "";
		extensionPDF = "";
        return;
    }

    if (!allowedTypes.includes(file.type)) {
        alert("Formato de archivo no permitido. Solo archivos PDF.");
        input.value = "";
		archivoPDF = "";
		extensionPDF = "";
        return;
    }

    const file_extension = filename.split('.').pop().toLowerCase();

    document.getElementById("text-cargaPDF_cliente").style.display = "none";
    document.getElementById("text-carga-PDF_cliente").style.display = "block";
    document.getElementById("nombreArchivo_cliente").textContent = "Archivo seleccionado: " + filename;

    document.getElementById("progressBar_cliente").style.display = "block";
    document.getElementById("progressBarInner_cliente").style.width = "0%";

    setTimeout(() => {
        document.getElementById("progressBarInner_cliente").style.width = "100%";
    }, 100);

    const readerPrincipal = new FileReader();
    readerPrincipal.onload = function (e) {
        extensionPDF = file_extension;
        archivoPDF = e.target.result;
    };

    readerPrincipal.readAsDataURL(file);
}


   
/*
VERIFICAR RQUIFAX GARANTE
*/
 
function VerificarAbmCargaPdfEquifaxGarante(){
 
	let fecha = new Date();

	if(!validarArchivoInforconfSeleccionado("file_PDF_garante", archivoPDFgarante, extensionPDFgarante)){
		return false;
	}
	
	accion = "addEquifax";
	AbmCargarAbmCargaPdfEquifaxGarante(accion,fecha,cod_GaranteEquifaxFK);

}
 
var cod_GaranteEquifaxFK="";
function AbmCargarAbmCargaPdfEquifaxGarante(accion,fecha,cod_GaranteFK){
	
var estado = document.getElementById("inputhistorialInforconf_garante").value.trim();

if(estado==""){
	ver_vetana_informativa("FAÑTO SELECCIONAR EL ESTADO DEL INFORCONF");
	return false;
}

	verCerrarEfectoCargando("1")
	var datos = new FormData();	
	obtener_datos_user();	 
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idclientefk", cod_GaranteFK)
	datos.append("fecha", fecha)
	datos.append("archivo", archivoPDFgarante)
	datos.append("ext", extensionPDFgarante)
	datos.append("estado", estado)
	datos.append("descripcion", "5") 
	datos.append("cod_solicitud_credito", cod_solicitudCredito) 
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					ver_vetana_informativa("DATOS GUARDADOS CON EXITO")
					limpiarEquifaxGarante()
				}
				else if (datos[2]) {
					ver_vetana_informativa(datos[2])
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


function limpiarEquifaxGarante(){

	document.getElementById("inputhistorialInforconf_garante").value="";
	document.getElementById("file_PDF_garante").value="";
	archivoPDFgarante = "";
	extensionPDFgarante = "";

	  document.getElementById("text-cargaPDF_garante").style.display = "";
      document.getElementById("text-carga-PDF_garante").style.display = "none";
      document.getElementById("nombreArchivo_garante").textContent = "" ;
 
      document.getElementById("progressBar_garante").style.display = "none";
      document.getElementById("progressBarInner_garante").style.width = "0%";
 
}

let extensionPDFgarante = "";
let archivoPDFgarante = "";

function readFileDocPDFgarante(input) {

    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    const filename = file.name;
    const tamanho = file.size;
    const allowedTypes = ['application/pdf'];

    if (tamanho > 5000000) {
        ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb");
        input.value = "";
		archivoPDFgarante = "";
		extensionPDFgarante = "";
        return;
    }

    if (!allowedTypes.includes(file.type)) {
        alert("Formato de archivo no permitido. Solo archivos PDF.");
        input.value = "";
		archivoPDFgarante = "";
		extensionPDFgarante = "";
        return;
    }

    const file_extension = filename.split('.').pop().toLowerCase();

    document.getElementById("text-cargaPDF_garante").style.display = "none";
    document.getElementById("text-carga-PDF_garante").style.display = "block";
    document.getElementById("nombreArchivo_garante").textContent = "Archivo seleccionado: " + filename;

    document.getElementById("progressBar_garante").style.display = "block";
    document.getElementById("progressBarInner_garante").style.width = "0%";

    setTimeout(() => {
        document.getElementById("progressBarInner_garante").style.width = "100%";
    }, 100);

    const readerPrincipal = new FileReader();
    readerPrincipal.onload = function (e) {
        extensionPDFgarante = file_extension;
        archivoPDFgarante = e.target.result;
    };

    readerPrincipal.readAsDataURL(file);
}




function AbmFinalizarCargaPdfEquifax(){
 
	verCerrarEfectoCargando("1")
	var datos = new FormData();	
	obtener_datos_user();	 
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "FinalizarSolicitudEquifax") 
	datos.append("cod_solicitud_credito", cod_solicitudCredito) 
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					actualizarContadoresPendientesSolicitudCreditoMenu()
					buscarSolicitudCreditoVerificarEquifax()
					ver_vetana_informativa("DATOS GUARDADOS CON EXITO")
					vercerrarcontenedorInforconf()
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








/*
VERIFICAR REFERENCIA PERSONAL
*/
function vercerrarVerificarGestionarReferencia(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divFrmVerificarGestionarReferencia").style.display==""){ 
		document.getElementById("divMinimizadoVerificarGestionarReferencia").style.display="none"
		document.getElementById("divMinimizadoVerificarGestionarReferencia2").style.display="none"
		 
		$("div[id=divFrmVerificarGestionarReferencia]").fadeOut(500);	 
	}else{	 
		mostrarSoloUno("divFrmVerificarGestionarReferencia")
		limpiarVerificarGestionarReferenciaSolicitudCredito()
		document.getElementById("divFrmVerificarGestionarReferencia").style.display=""
		 
	}
}

 
 function limpiarVerificarGestionarReferenciaSolicitudCredito(){
	document.getElementById('inptBuscarVerificarGestionarReferencia').value=""
	
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('fechaDesdeVerificarGestionarReferencia').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('fechaHastaVerificarGestionarReferencia').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
 }
 

function buscarSolicitudCreditoVerificarGestionarReferencia() {
	var Cliente = document.getElementById("inptBuscarVerificarGestionarReferencia").value.trim();
	var Local = document.getElementById("inptBuscarLocalVerificarGestionarReferencia").value.trim();
	var estado = document.getElementById("inptselectBuscarEstadoVerificarGestionarReferencia").value;
	var fecha1 = document.getElementById("fechaDesdeVerificarGestionarReferencia").value;
	var fecha2 = document.getElementById("fechaHastaVerificarGestionarReferencia").value;

	document.getElementById("table_frm_VerificarGestionarReferencia").innerHTML = "" 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"Cliente": Cliente,
		"Local": Local,
		"estado": estado,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"funt": "buscarSolicitudCreditoVerificarGestionarReferencia",
		"formato": "json"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		  
		beforeSend: function () {
 
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_frm_VerificarGestionarReferencia").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderSolicitudesCreditoAprobar(datos_buscados, {
							idContenedor: "table_frm_VerificarGestionarReferencia",
							etiquetaEstado: "REFERENCIA",
							alSeleccionar: function (registro) {
								vercerrarcontenedorReferenciaComercia({
									idSolicitud: registro.id_solicitud,
									cod_cliente: registro.id_cliente,
									cod_codeudorFK: registro.id_garante,
									nombre_persona: registro.nombre_accion || registro.cliente,
									garante: registro.garante || ""
								});
							}
						});
					} else {
						document.getElementById("table_frm_VerificarGestionarReferencia").innerHTML = datos_buscados;
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


/* INFORME GENERAL DE COMPRAS */
function verCerrarInformeComprasGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeComprasGeneral").style.display==""){
		limpiarventanainformeComprasGeneral()
		
		$("div[id=divInformeComprasGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeComprasGeneral").style.display=""
	}
}
function renderInformeMatrizMensual(filas, idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor || !Array.isArray(filas)) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		var valores = [registro.dia].concat(Array.isArray(registro.meses) ? registro.meses : []);
		valores.forEach(function (valor) {
			var celda = document.createElement("td");
			celda.style.width = "5%";
			celda.textContent = valor === null || typeof valor === "undefined" ? "" : String(valor);
			fila.appendChild(celda);
		});
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function buscarinformeComprasGeneral() {
	var anho = document.getElementById("inptBuscarInformeComprasGeneralFecha").value
	var local = document.getElementById("inptBuscarInformeComprasGeneralLocal").value
	var cod_proveedor = document.getElementById("inptBuscarInformeComprasGeneralProveedor").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_ComprasGeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"local": local,
		"cod_proveedor": cod_proveedor,
		"funt": "buscar_informe_compras_general",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_ComprasGeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_ComprasGeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) {
						renderInformeMatrizMensual(pagina, "table_informe_ComprasGeneral");
					} else {
						document.getElementById("table_informe_ComprasGeneral").innerHTML = pagina;
					}
					agregarFilaTotalesInformeComprasGeneral();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformeComprasGeneralGrafica() {
	var anho = document.getElementById("inptBuscarInformeComprasGeneralFecha").value
	var local = document.getElementById("inptBuscarInformeComprasGeneralLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"local": local,
		"funt": "buscar_informe_compras_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcompra.php",
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
					
					
					if(obj_chart_compras_general){
						obj_chart_compras_general.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
					let data = {
					labels: labels,
					datasets: [{
						label: datos[5],
						data: datos[3],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  datos[6],
						data: datos[4],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_informe_compras_general(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
let obj_chart_compras_general = '';
function generar_graficos_informe_compras_general(data){
	const graph = document.querySelector("#graph_informe_compras_general");


	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_compras_general = new Chart(graph, config);
}
function limpiarventanainformeComprasGeneral(){ 
	document.getElementById("table_informe_ComprasGeneral").innerHTML="" 
	
	if(obj_chart_compras_general){
		obj_chart_compras_general.destroy()
	}
	
	document.getElementById('inptBuscarInformeComprasGeneralFecha').value = ''
	document.getElementById('inptBuscarInformeComprasGeneralLocal').value = ''
	document.getElementById("btnInformeComprasGeneral1").style='background-color:#ff9800;color:#fff';
	document.getElementById("btnInformeComprasGeneral2").style='';
	document.getElementById("divVentanaInformeComprasGeneral1").style.display=''
	document.getElementById("divVentanaInformeComprasGeneral2").style.display='none'
	
	
}
function verCerrarInformeVentanasComprasGeneral(d){
	var selectAnho = document.getElementById('inptBuscarInformeComprasGeneralFecha').value;
	if(selectAnho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
		return;
	}
	
	document.getElementById("btnInformeComprasGeneral1").style=''
	document.getElementById("btnInformeComprasGeneral2").style=''
	
	document.getElementById("divVentanaInformeComprasGeneral1").style.display='none'
	document.getElementById("divVentanaInformeComprasGeneral2").style.display='none'


	if(d=="1"){
		
		buscarinformeComprasGeneral()
		document.getElementById("btnInformeComprasGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeComprasGeneral1").style.display=''
			
	}
	if(d=="2"){
		
		buscarinformeComprasGeneralGrafica()
		document.getElementById("btnInformeComprasGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeComprasGeneral2").style.display=''
			
		
		
	}
}

function agregarFilaTotalesInformeComprasGeneral() {
    const contenedor = document.getElementById('table_informe_ComprasGeneral');
    const totales = sumarColumnasComprasGeneral();

    const tablaTotal = document.createElement('table');
    tablaTotal.className = 'tableRegistroSearch'; // misma clase
    tablaTotal.border = 1;
    tablaTotal.cellSpacing = 1;
    tablaTotal.cellPadding = 5;

    const tr = document.createElement('tr');
    tr.style.fontWeight = 'bold';
    tr.style.background = '#e9ecef';

    totales.forEach((total, index) => {
        const td = document.createElement('td');
        td.style.width = '5%';

        if (index === 0) {
            td.innerText = 'TOTAL';
        } else {
            td.innerText = total.toLocaleString('es-ES');
        }

        tr.appendChild(td);
    });

    tablaTotal.appendChild(tr);
    contenedor.appendChild(tablaTotal);
}
function sumarColumnasComprasGeneral() {
    const contenedor = document.getElementById('table_informe_ComprasGeneral');
    const tablas = contenedor.querySelectorAll('table');
    
    let totales = [];

    tablas.forEach(tabla => {
        const celdas = tabla.querySelectorAll('td');

        celdas.forEach((td, index) => {
            const valor = textoANumero(td.innerText.trim());
            totales[index] = (totales[index] || 0) + valor;
        });
    });

    return totales;
}


/* INFORME GENERAL DE STOCK */
var listadoInformeStockGeneral = null;
function iniciarListadoInformeStockGeneral() {
	if (listadoInformeStockGeneral || typeof AbmListadoCore === "undefined") return listadoInformeStockGeneral;
	var cuerpo = document.getElementById("table_informe_StockGeneral");
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && (cabecera.tagName !== "TABLE" || cabecera.querySelector("input, select, textarea"))) {
		cabecera = cabecera.previousElementSibling;
	}
	if (!cabecera) return null;
	cabecera.id = "cabeceraInformeStockGeneral";
	var meses = [
		["enero", "ENERO"], ["febrero", "FEBRERO"], ["marzo", "MARZO"],
		["abril", "ABRIL"], ["mayo", "MAYO"], ["junio", "JUNIO"],
		["julio", "JULIO"], ["agosto", "AGOSTO"], ["septiembre", "SEPTIEMBRE"],
		["octubre", "OCTUBRE"], ["noviembre", "NOVIEMBRE"], ["diciembre", "DICIEMBRE"]
	];
	var columnas = [{ campo: "dia", titulo: "#", ancho: "5%" }];
	var celdas = [{ campo: "dia", columna: "dia" }];
	meses.forEach(function (mes) {
		columnas.push({ campo: mes[0], titulo: mes[1], ancho: "5%" });
		celdas.push({ campo: mes[0] + "_formateado", columna: mes[0] });
	});
	listadoInformeStockGeneral = AbmListadoCore.crear({
		nombre: "informe_stock_general",
		idCabecera: cabecera.id,
		idCuerpo: cuerpo.id,
		ordenInicial: "dia",
		columnas: columnas,
		fila: { celdas: celdas }
	});
	listadoInformeStockGeneral.iniciar();
	return listadoInformeStockGeneral;
}

function verCerrarInformeStockGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeStockGeneral").style.display==""){
		limpiarventanainformeStockGeneral()
		
		$("div[id=divInformeStockGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeStockGeneral").style.display=""
	}
}
function buscarinformeStockGeneral() {
	var anho = document.getElementById("inptBuscarInformeStockGeneralFecha").value 
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_StockGeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"formato": "json",
		"funt": "buscar_informe_stock_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
		type: "post",
		  
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_StockGeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_StockGeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					var listado = iniciarListadoInformeStockGeneral();
					if (listado && Array.isArray(pagina)) listado.establecerRegistros(pagina);
					else document.getElementById("table_informe_StockGeneral").innerHTML = pagina || "";
					// agregarFilaTotalesInformeStockGeneral();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}


function buscarinformeStockGeneralGrafica() {
	var anho = document.getElementById("inptBuscarInformeStockGeneralFecha").value
	// var local = document.getElementById("inptBuscarInformeStockGeneralLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		// "local": local,
		"funt": "buscar_informe_stock_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					
					
					if(obj_chart_stock_general){
						obj_chart_stock_general.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
					let data = {
					labels: labels,
					datasets: [{
						label: datos[5],
						data: datos[3],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  datos[6],
						data: datos[4],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_informe_stock_general(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
let obj_chart_stock_general = '';
function generar_graficos_informe_stock_general(data){
	const graph = document.querySelector("#graph_informe_stock_general");
 
	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_stock_general = new Chart(graph, config);
}
function limpiarventanainformeStockGeneral(){ 
	document.getElementById("table_informe_StockGeneral").innerHTML="" 
	
	if(obj_chart_stock_general){
		obj_chart_stock_general.destroy()
	}
	
	document.getElementById('inptBuscarInformeStockGeneralFecha').value = ''
	// document.getElementById('inptBuscarInformeStockGeneralLocal').value = ''
	document.getElementById("btnInformeStockGeneral1").style='background-color:#ff9800;color:#fff';
	document.getElementById("btnInformeStockGeneral2").style='';
	document.getElementById("divVentanaInformeStockGeneral1").style.display=''
	document.getElementById("divVentanaInformeStockGeneral2").style.display='none'
}

function verCerrarInformeVentanasStockGeneral(d){
	var selectAnho = document.getElementById('inptBuscarInformeStockGeneralFecha').value;
	if(selectAnho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
		return;
	}
	
	document.getElementById("btnInformeStockGeneral1").style=''
	document.getElementById("btnInformeStockGeneral2").style=''
	
	document.getElementById("divVentanaInformeStockGeneral1").style.display='none'
	document.getElementById("divVentanaInformeStockGeneral2").style.display='none'


	if(d=="1"){
		
		buscarinformeStockGeneral()
		document.getElementById("btnInformeStockGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeStockGeneral1").style.display=''
			
	}
	if(d=="2"){
		
		buscarinformeStockGeneralGrafica()
		document.getElementById("btnInformeStockGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeStockGeneral2").style.display=''
			 
	}
}


function agregarFilaTotalesInformeStockGeneral() {
    const contenedor = document.getElementById('table_informe_StockGeneral');
    const totales = sumarColumnasStockGeneral();

    const tablaTotal = document.createElement('table');
    tablaTotal.className = 'tableRegistroSearch'; // misma clase
    tablaTotal.border = 1;
    tablaTotal.cellSpacing = 1;
    tablaTotal.cellPadding = 5;

    const tr = document.createElement('tr');
    tr.style.fontWeight = 'bold';
    tr.style.background = '#e9ecef';

    totales.forEach((total, index) => {
        const td = document.createElement('td');
        td.style.width = '5%';

        if (index === 0) {
            td.innerText = 'TOTAL';
        } else {
            td.innerText = total.toLocaleString('es-ES');
        }

        tr.appendChild(td);
    });

    tablaTotal.appendChild(tr);
    contenedor.appendChild(tablaTotal);
}
function sumarColumnasStockGeneral() {
    const contenedor = document.getElementById('table_informe_StockGeneral');
    const tablas = contenedor.querySelectorAll('table');
    
    let totales = [];

    tablas.forEach(tabla => {
        const celdas = tabla.querySelectorAll('td');

        celdas.forEach((td, index) => {
            const valor = textoANumero(td.innerText.trim());
            totales[index] = (totales[index] || 0) + valor;
        });
    });

    return totales;
}


/*
APROBAR SOLICITUD CREDITO 
*/ 
let cod_clienteRefComercial = '';
let cod_RefComercial = '';
function vercerrarcontenedorReferenciaComercia(datos){ 
	if(document.getElementById("divcontenedorReferenciaComercia").style.display==""){  		 
		$("div[id=divcontenedorReferenciaComercia]").fadeOut(500);
document.getElementById("btnAddRefComercialCliente1").style.display=""
		document.getElementById("btnAddRefComercialCliente2").style.display="none"
		document.getElementById("btnAddRefComercialCliente3").style.display="none"
		document.getElementById("btnAddRefComercialCliente4").style.display="none"
		
		
		LimpiarRefComercialCliente()
		
	}else{
		buscarReferenciasComercialCliente(datos.cod_cliente);
		cod_clienteRefComercial = datos.cod_cliente;
		cod_RefComercial = datos.idSolicitud;
		
		document.getElementById("lblReferenciaComerciaCliente").innerHTML=datos.nombre_persona
		
		document.getElementById("divcontenedorReferenciaComercia").style.display=""		 
	}
}


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnSeleccionarReferencia')) {
        var datos = JSON.parse(e.target.dataset.datos);
        vercerrarcontenedorReferenciaComercia(datos);
    }
});
 

function obtenerUrlReferenciaComercialSegura(valor) {
	var url = valor == null ? "" : String(valor).trim();
	if (!url) return "";
	try {
		var resuelta = new URL(url, window.location.origin);
		return resuelta.protocol === "http:" || resuelta.protocol === "https:" ? resuelta.href : "";
	} catch (error) {
		return "";
	}
}

function renderReferenciasComercialCliente(filas) {
	var contenedor = document.getElementById("div_referenciasComercialCliente");
	if (!contenedor || !Array.isArray(filas)) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = "referencia-registro " + (registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch") + (registro.incompleta ? " referencia-registro-alerta" : "");
		tabla.setAttribute("border", "0");
		tabla.setAttribute("cellspacing", "0");
		tabla.setAttribute("cellpadding", "0");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.setAttribute("name", "tdMasReferenciasComercialCliente");
		fila.onclick = function () { obtenerdatosRefComercialCliente(fila); };

		var celdaImagen = document.createElement("td");
		celdaImagen.id = "td_imagen";
		var urlImagen = obtenerUrlReferenciaComercialSegura(registro.imagen);
		if (urlImagen) {
			var enlace = document.createElement("a");
			enlace.href = urlImagen;
			enlace.target = "_blank";
			enlace.rel = "noopener noreferrer";
			var imagen = document.createElement("img");
			imagen.src = urlImagen;
			imagen.className = "referencia-imagen-thumb";
			imagen.alt = "Imagen referencia";
			enlace.appendChild(imagen);
			celdaImagen.appendChild(enlace);
		} else {
			var sinImagen = document.createElement("span");
			sinImagen.className = "referencia-imagen-vacia";
			sinImagen.textContent = "Sin imagen";
			celdaImagen.appendChild(sinImagen);
		}
		fila.appendChild(celdaImagen);
		[
			["td_datos_1", registro.observacion_corta, false],
			["td_datos_2", registro.telefono, false],
			["td_datos_3", registro.direccion, false],
			["td_datos_4", registro.referencia, false],
			["td_datos_5", registro.tipo, false],
			["td_datos_7", registro.calificacion, false],
			["td_datos_8", registro.monto_formateado, false],
			["td_datos_6", registro.observacion, false],
			["td_id", registro.codigo, true],
			["td_datos_9", registro.imagen, true]
		].forEach(function (dato) {
			var celda = document.createElement("td");
			celda.id = dato[0];
			if (dato[2]) celda.style.display = "none";
			celda.textContent = dato[1] == null ? "" : String(dato[1]);
			fila.appendChild(celda);
		});
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}


function buscarReferenciasComercialCliente(idcliente){
		 document.getElementById("div_referenciasComercialCliente").innerHTML=paginacargando
			obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"buscar": idcliente,
			"funt": "buscarmasreferenciascomercialcliente",
			"formato": "json"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
			type:"post",
		
			beforeSend: function(){			 
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("div_referenciasComercialCliente").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("div_referenciasComercialCliente").innerHTML=''
			if (Respuesta == null || String(Respuesta).trim() == "") {
				ver_vetana_informativa("NO SE RECIBIO RESPUESTA DEL SERVIDOR")
				document.getElementById("div_referenciasComercialCliente").innerHTML="<div class='text-center text-danger p-3'>No se pudo cargar el listado de referencias.</div>"
				GuardarArchivosLog("Respuesta vacia al buscar referencias comerciales del cliente")
				return
			}
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		   var datos_buscados=datos[2];
			if (Array.isArray(datos_buscados)) {
				renderReferenciasComercialCliente(datos_buscados);
			} else {
				document.getElementById("div_referenciasComercialCliente").innerHTML=datos_buscados;
			}
			
			}else{
				var mensajeErrorReferencia = datos[2] || "No se pudo cargar el listado de referencias."
				ver_vetana_informativa(mensajeErrorReferencia)
				document.getElementById("div_referenciasComercialCliente").innerHTML="<div class='text-center text-danger p-3'>"+mensajeErrorReferencia+"</div>"
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

function mostrarPreviewImagenReferenciaComercialCliente(url) {
	var preview = document.getElementById("previewImagenReferenciaComercialCliente");
	if (!preview) {
		return;
	}

	if (url && String(url).trim() != "") {
		preview.innerHTML = "<img src='" + url + "' alt='Imagen referencia'>";
	} else {
		preview.innerHTML = "Sin imagen";
	}
}

function previsualizarImagenReferenciaComercialCliente(input) {
	if (!input || !input.files || input.files.length == 0) {
		mostrarPreviewImagenReferenciaComercialCliente(document.getElementById("inptImagenActualReferenciaComercialCliente").value);
		return;
	}

	var archivo = input.files[0];
	if (archivo.type.indexOf("image/") !== 0) {
		ver_vetana_informativa("SOLO SE PERMITEN ARCHIVOS DE IMAGEN");
		limpiarImagenReferenciaComercialCliente();
		return;
	}

	if (archivo.size > (6 * 1024 * 1024)) {
		ver_vetana_informativa("LA IMAGEN NO PUEDE SUPERAR 6 MB");
		limpiarImagenReferenciaComercialCliente();
		return;
	}

	var lector = new FileReader();
	lector.onload = function(e) {
		mostrarPreviewImagenReferenciaComercialCliente(e.target.result);
	};
	lector.readAsDataURL(archivo);
}

function limpiarImagenReferenciaComercialCliente() {
	var input = document.getElementById("inptImagenReferenciaComercialCliente");
	if (input) {
		input.value = "";
	}
	mostrarPreviewImagenReferenciaComercialCliente(document.getElementById("inptImagenActualReferenciaComercialCliente").value);
}

function agregarImagenReferenciaComercialClienteFormData(datos) {
	var input = document.getElementById("inptImagenReferenciaComercialCliente");
	if (!input || !input.files || input.files.length == 0) {
		return true;
	}

	var archivo = input.files[0];
	if (archivo.type.indexOf("image/") !== 0) {
		ver_vetana_informativa("SOLO SE PERMITEN ARCHIVOS DE IMAGEN");
		return false;
	}

	if (archivo.size > (6 * 1024 * 1024)) {
		ver_vetana_informativa("LA IMAGEN NO PUEDE SUPERAR 6 MB");
		return false;
	}

	datos.append("imagenReferencia", archivo);
	return true;
}

function AnhadirReferenciasComercialCliente(){
	var inptMasRefTelefComercialCliente=document.getElementById("inptMasRefTelefComercialCliente").value
	var inptMasRefDireccionComercialCliente=document.getElementById("inptMasRefDireccionComercialCliente").value
	var inptMasRefReferenciaComercialCliente=document.getElementById("inptMasRefReferenciaComercialCliente").value
	var inptMasRefObservacionComercialCliente=document.getElementById("inptMasRefObservacionComercialCliente").value
	var inptTipoRefComercialCliente=document.getElementById("inptTipoRefComercialCliente").value
	var inptObsRefComercialCliente=document.getElementById("inptObsRefComercialCliente").value
	var inptRefCalifComercialCliente=document.getElementById("inptRefCalifComercialCliente").value
	var inptMontoReferenciaComercialCliente=document.getElementById("inptMontoReferenciaComercialCliente").value
	
	if(inptRefCalifComercialCliente==""){
		ver_vetana_informativa("FALTO SELECCIONAR CALIFICACION")
		return false;
	}
	
	if(inptTipoRefComercialCliente==""){
		ver_vetana_informativa("FALTO SELECCIONAR TIPOS DE REFERENCIA")
		return false;
	}
	
verCerrarEfectoCargando("1")
obtener_datos_user();
	var datos = new FormData();
	datos.append("useru", userid);
	datos.append("passu", passuser);
	datos.append("navegador", navegador);
	datos.append("telefono", inptMasRefTelefComercialCliente);
	datos.append("direccion", inptMasRefDireccionComercialCliente);
	datos.append("referencia", inptMasRefReferenciaComercialCliente);
	datos.append("obs", inptMasRefObservacionComercialCliente);
	datos.append("tipo", inptTipoRefComercialCliente);
	datos.append("observacion", inptObsRefComercialCliente);
	datos.append("idcliente", cod_clienteRefComercial);
	datos.append("calificacion", inptRefCalifComercialCliente);
	datos.append("monto", inptMontoReferenciaComercialCliente);
	datos.append("funt", "addmasreferenciascomercialcliente");

	if (!agregarImagenReferenciaComercialClienteFormData(datos)) {
		verCerrarEfectoCargando("");
		return false;
	}
	
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")


		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				ver_vetana_informativa('CARGADO CORRECTAMENTE');
					LimpiarRefComercialCliente()
					buscarReferenciasComercialCliente(cod_clienteRefComercial)
				} else if (datos[2]) {
					ver_vetana_informativa(datos[2]);
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


		
}

 
function FinalizarRefComercialCliente(){
 
verCerrarEfectoCargando("1")
obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbm": cod_RefComercial, 	
		"funt": "FinalizarRefComercialCliente"
	};
	
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
					ver_vetana_informativa('CARGADO CORRECTAMENTE');
					vercerrarcontenedorReferenciaComercia()
					LimpiarRefComercialCliente()
					actualizarContadoresPendientesSolicitudCreditoMenu()
					 buscarSolicitudCreditoVerificarGestionarReferencia()
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
		
}






var elementoAddRefComercialCliente="";
function obtenerValorRefComercialCliente(datostr, idCelda) {
	return $.trim($(datostr).children('[id="' + idCelda + '"]').text());
}
function obtenerdatosRefComercialCliente(datostr){
	 $("[name=tdMasReferenciasComercialCliente]").each(function(i, td){		
		 td.className=''
	   });
    datostr.className='tableRegistroSelec'
	document.getElementById('inptMasRefDireccionComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_3");
	document.getElementById('inptMasRefReferenciaComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_4");
	document.getElementById('inptMasRefTelefComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_2");
	document.getElementById('inptMasRefObservacionComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_1");
	document.getElementById('inptTipoRefComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_5");
	document.getElementById('inptObsRefComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_6");
	document.getElementById('inptRefCalifComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_7");
	document.getElementById('inptMontoReferenciaComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_8");
	document.getElementById('inptImagenActualReferenciaComercialCliente').value=obtenerValorRefComercialCliente(datostr, "td_datos_9");
	document.getElementById('inptImagenReferenciaComercialCliente').value="";
	mostrarPreviewImagenReferenciaComercialCliente(document.getElementById('inptImagenActualReferenciaComercialCliente').value);
	
	elementoAddRefComercialCliente=datostr;
		document.getElementById("btnAddRefComercialCliente1").style.display="none"
		document.getElementById("btnAddRefComercialCliente2").style.display=""
		document.getElementById("btnAddRefComercialCliente3").style.display=""
		document.getElementById("btnAddRefComercialCliente4").style.display=""
}

function editarRefComercialCliente(){
	
	if(elementoAddRefComercialCliente == ""){
		ver_vetana_informativa("NINGUN REGISTRO HA SIDO SELECCIONADO");
		return;
	}
	var inptMasRefTelefComercialCliente=document.getElementById("inptMasRefTelefComercialCliente").value
	var inptMasRefDireccionComercialCliente=document.getElementById("inptMasRefDireccionComercialCliente").value
	var inptMasRefReferenciaComercialCliente=document.getElementById("inptMasRefReferenciaComercialCliente").value
	var inptMasRefObservacionComercialCliente=document.getElementById("inptMasRefObservacionComercialCliente").value
	var inptTipoRefComercialCliente=document.getElementById("inptTipoRefComercialCliente").value
	var inptObsRefComercialCliente=document.getElementById("inptObsRefComercialCliente").value
	var inptRefCalifComercialCliente=document.getElementById("inptRefCalifComercialCliente").value
	var inptMontoReferenciaComercialCliente=document.getElementById("inptMontoReferenciaComercialCliente").value
	
	if(inptRefCalifComercialCliente==""){
		ver_vetana_informativa("FALTO SELECCIONAR CALIFICACION")
		return false;
	}
	
	if(inptTipoRefComercialCliente==""){
		ver_vetana_informativa("FALTO SELECCIONAR TIPOS DE REFERENCIA")
		return false;
	}
	
verCerrarEfectoCargando("1")
obtener_datos_user();
	var datos = new FormData();
	datos.append("useru", userid);
	datos.append("passu", passuser);
	datos.append("navegador", navegador);
	datos.append("telefono", inptMasRefTelefComercialCliente);
	datos.append("direccion", inptMasRefDireccionComercialCliente);
	datos.append("referencia", inptMasRefReferenciaComercialCliente);
	datos.append("obs", inptMasRefObservacionComercialCliente);
	datos.append("tipo", inptTipoRefComercialCliente);
	datos.append("observacion", inptObsRefComercialCliente);
	datos.append("calificacion", inptRefCalifComercialCliente);
	datos.append("monto", inptMontoReferenciaComercialCliente);
	datos.append("idreferenciacliente", obtenerValorRefComercialCliente(elementoAddRefComercialCliente, "td_id"));
	datos.append("funt", "editarmasreferenciascomercialcliente");

	if (!agregarImagenReferenciaComercialClienteFormData(datos)) {
		verCerrarEfectoCargando("");
		return false;
	}
	
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("")
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")


		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				ver_vetana_informativa('CARGADO CORRECTAMENTE');
					LimpiarRefComercialCliente()
					buscarReferenciasComercialCliente(cod_clienteRefComercial)
					document.getElementById("btnAddRefComercialCliente1").style.display=""
		document.getElementById("btnAddRefComercialCliente2").style.display="none"
		document.getElementById("btnAddRefComercialCliente3").style.display="none"
		document.getElementById("btnAddRefComercialCliente4").style.display="none"
				} else if (datos[2]) {
					ver_vetana_informativa(datos[2]);
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});

	
	
	
}


function EliminarRefComercialCliente(){
	
	// $(elementoAddRefComercialCliente).remove()
		if(elementoAddRefComercialCliente == ""){
		ver_vetana_informativa("NINGUNA REFERENCIA HA SIDO SELECCIONADA");
		return;
	}
	
	let idreferenciacliente  = obtenerValorRefComercialCliente(elementoAddRefComercialCliente, "td_id");
	
verCerrarEfectoCargando("1")
obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idreferenciacliente": idreferenciacliente,	
		"funt": "eliminarmasreferencia"
	};
	
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmSolicitudCredito.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")


		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				ver_vetana_informativa('CARGADO CORRECTAMENTE');
					buscarReferenciasComercialCliente(cod_clienteRefComercial)
					LimpiarRefComercialCliente()
					document.getElementById("btnAddRefComercialCliente1").style.display=""
		document.getElementById("btnAddRefComercialCliente2").style.display="none"
		document.getElementById("btnAddRefComercialCliente3").style.display="none"
		document.getElementById("btnAddRefComercialCliente4").style.display="none"
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function CancelarRefComercialCliente(){
		document.getElementById("btnAddRefComercialCliente1").style.display=""
		document.getElementById("btnAddRefComercialCliente2").style.display="none"
		document.getElementById("btnAddRefComercialCliente3").style.display="none"
		document.getElementById("btnAddRefComercialCliente4").style.display="none"
		
		buscarReferenciasComercialCliente(cod_clienteRefComercial)
    elementoAddRefComercialCliente = '';
		LimpiarRefComercialCliente()
}
function LimpiarRefComercialCliente(){
	document.getElementById('inptTipoRefComercialCliente').value = '';
	document.getElementById('inptMasRefReferenciaComercialCliente').value = '';
	document.getElementById('inptMasRefDireccionComercialCliente').value = '';
	document.getElementById('inptRefCalifComercialCliente').value = '';
	document.getElementById('inptMasRefObservacionComercialCliente').value = '';
	document.getElementById('inptObsRefComercialCliente').value = '';
	document.getElementById('inptMasRefTelefComercialCliente').value = '';
	document.getElementById('inptMontoReferenciaComercialCliente').value = '';
	document.getElementById('inptImagenReferenciaComercialCliente').value = '';
	document.getElementById('inptImagenActualReferenciaComercialCliente').value = '';
	mostrarPreviewImagenReferenciaComercialCliente("");
}


/*
ABM LIQUIDEZ
*/
var listadoAbmLiquidez = null;
function obtenerListadoAbmLiquidez(){
	if(listadoAbmLiquidez){
		return listadoAbmLiquidez;
	}
	if(typeof AbmListadoCore === "undefined"){
		return null;
	}
	var cabecera = document.querySelector("#tdTituloImpreLiquidez tr");
	if(!cabecera){
		return null;
	}
	cabecera.id = "cabeceraAbmLiquidez";
	listadoAbmLiquidez = AbmListadoCore.crear({
		nombre: "liquidez",
		idCabecera: "cabeceraAbmLiquidez",
		idCuerpo: "table_abm_Liquidez",
		columnas: [
			{ campo: "monto", titulo: "MONTO", ancho: "30%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "30%" },
			{ campo: "banco", titulo: "BANCO", ancho: "30%" }
		],
		fila: {
			claseTabla: function(registro, indice){
				return indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
			},
			funcionSeleccion: "obtenerdatosabmLiquidez",
			celdas: [
				{ id: "td_id", campo: "idliquidez", tecnica: true },
				{ id: "td_datos_1", columna: "monto", valor: function(registro){ return registro.monto_formateado; } },
				{ id: "td_datos_2", columna: "fecha", campo: "fecha" },
				{ id: "td_datos_3", columna: "banco", campo: "banco" },
				{ id: "td_datos_4", campo: "estado", tecnica: true },
				{ id: "td_datos_5", campo: "idbanco_liquidez", tecnica: true }
			]
		}
	});
	listadoAbmLiquidez.iniciar();
	return listadoAbmLiquidez;
}
function verCerrarAbmLiquidez(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmLiquidez").style.display==""){
		limpiarcamposCargaLiquidez()
		limpiarcamposbuscarliquidez()
		document.getElementById("divMinimizadoAbmLiquidez").style.display="none"
	$("div[id=divAbmLiquidez]").fadeOut(500);			
	}else{		
	if(controlacceso("VERCARGARLIQUIDEZ","accion")==false){return;}
	
	checkRangoFechaLiquidez("2")
	mostrarSoloUno("divAbmLiquidez")	
		document.getElementById("divAbmLiquidez").style.display=""

	}
}
function limpiarcamposbuscarliquidez(){
	document.getElementById("inptBuscarLiquidezF1").value=""
	document.getElementById("inptBuscarLiquidezF2").value=""	
	document.getElementById("inptTotalTotalLiquidez").value=""
	document.getElementById("inptBuscarBancoLiquidez").value=""
	document.getElementById("inptTotalRegistroLiquidez").value=""
	if(listadoAbmLiquidez){
		listadoAbmLiquidez.establecerRegistros([], false)
	}else{
		document.getElementById("table_abm_Liquidez").innerHTML=""
	}
}
function minimizarliquidez(){
	$("div[id=divAbmLiquidez]").fadeOut(500);	
	document.getElementById("divMinimizadoCargarLiquidez").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmCargarLiquidez"));
}
function verCerrarVentanaAbmLiquidez(d, l) {
	if (d == "1") {
		if (l == "1") {
			// if(controlacceso("INSERTARCARGARLIQUIDEZ","accion")==false){return;}
			limpiarcamposCargaLiquidez()
		}
		$("div[id=divAbmLiquidez2]").fadeIn(250)
		document.getElementById('divAbmLiquidez1').style.display = "none"
	} else {
		$("div[id=divAbmLiquidez1]").fadeIn(250)
		document.getElementById('divAbmLiquidez2').style.display = "none"
	}
}
function verVentanaEditarLiquidez() {
	// if(controlacceso("EDITARCARGARLIQUIDEZ","accion")==false){return;}
	if (idAbmLiquidez == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmLiquidez("1", "2")
}
var idAbmLiquidez = ""
function obtenerdatosabmLiquidez(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptMontoLiquidez').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptFechaLiquidez').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptEstadoLiquidez').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptSeleccBancoLiquidez').value = $(datostr).children('td[id="td_datos_5"]').html();
	
	
	idAbmLiquidez = $(datostr).children('td[id="td_id"]').html();

		
	document.getElementById('btnAbmLiquidez').value = "Editar datos";
	document.getElementById('btnEditarLiquidez').style.backgroundColor="";
}
function verificarcamposLiquidez() {
	var inptMontoLiquidez = document.getElementById('inptMontoLiquidez').value
	var inptFechaLiquidez = document.getElementById('inptFechaLiquidez').value
	var inptEstadoLiquidez = document.getElementById('inptEstadoLiquidez').value
	var inptSeleccBancoLiquidez = document.getElementById('inptSeleccBancoLiquidez').value
	
	if (inptSeleccBancoLiquidez == "") {
		ver_vetana_informativa("FALTO SELECCIONAR BANCO")
		return false;
	}
	
	if (inptMontoLiquidez == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DEL SUELDO")
		return false;
	}
	if (inptFechaLiquidez == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DEL SUELDO")
		return false;
	}
	
	
	
	var accion = "";
	if (idAbmLiquidez != "") {
		accion = "editar";
		// if(controlacceso("EDITARCARGARLIQUIDEZ","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARCARGARLIQUIDEZ","accion")==false){return;}
	}
	
	
	
	abmliquidez( inptMontoLiquidez, inptFechaLiquidez, inptEstadoLiquidez, inptSeleccBancoLiquidez, idAbmLiquidez, accion);
}
function abmliquidez(monto, fecha, estado, cod_banco, idliquidez, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idliquidez", idliquidez)
	datos.append("monto", monto)
	datos.append("fecha", fecha)
	datos.append("estado", estado)
	datos.append("cod_banco", cod_banco)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmLiquidez.php",
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
					limpiarcamposCargaLiquidez()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmLiquidez = ""
					buscarabmLiquidez()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadoLiquidez(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarLiquidez1').checked=true
		document.getElementById('inptSeleccEstadoBuscarLiquidez2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarLiquidez1').checked=false
		document.getElementById('inptSeleccEstadoBuscarLiquidez2').checked=true
	}
}
function checkRangoFechaLiquidez(d){	
	if(d=="1"){
		document.getElementById('checkRangoFechaLiquidez1').checked=true
		document.getElementById('checkRangoFechaLiquidez2').checked=false
			var f = new Date();
		var dia = f.getDate()
		if (dia < 10) {
			dia = "0" + dia;
		}
		var mes = f.getMonth() + 1
		if (mes < 10) {
			mes = "0" + mes;
		}
		document.getElementById('inptBuscarLiquidezF1').value = f.getFullYear() + "-" + mes + "-" + "01";
		document.getElementById('inptBuscarLiquidezF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	}else{
		document.getElementById('checkRangoFechaLiquidez1').checked=false
		document.getElementById('checkRangoFechaLiquidez2').checked=true
		
		document.getElementById('inptBuscarLiquidezF1').value = "";
	    document.getElementById('inptBuscarLiquidezF2').value = "";
	
		
	}
}
function buscarabmLiquidez() {
// if(controlacceso("BUSCARCARGARSUELDO","accion")==false){return;}
	var listado = obtenerListadoAbmLiquidez()
	var fecha1 = document.getElementById('inptBuscarLiquidezF1').value
	var fecha2 = document.getElementById('inptBuscarLiquidezF2').value
	var banco = document.getElementById('inptBuscarBancoLiquidez').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarLiquidez1').checked==true){
		 estado = "Activo"
	}else{
		 estado = "Inactivo"
	}
	if(listado){
		listado.establecerRegistros([], false)
	}
	document.getElementById("table_abm_Liquidez").innerHTML = paginacargando
	document.getElementById("inptTotalTotalLiquidez").value=""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"cod_banco": banco,
		"formato": listado ? "json" : "html",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmLiquidez.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("table_abm_Liquidez").innerHTML = ''
			}
			document.getElementById("inptTotalRegistroLiquidez").value=""
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			if(!listado){
				document.getElementById("table_abm_Liquidez").innerHTML = ''
			}
			document.getElementById("inptTotalRegistroLiquidez").value=""
			try {
				var datos = $.parseJSON(Respuesta);
				if(listado){
					listado.establecerRegistros([], false)
				}
				Respuesta = datos["1"];
				   Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)){
						listado.establecerRegistros(datos_buscados, false)
					}else{
						document.getElementById("table_abm_Liquidez").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
					document.getElementById("inptTotalRegistroLiquidez").value = datos[3];
					document.getElementById("inptTotalTotalLiquidez").value = datos[4];
					
				
					
					
				}
			} catch (error) {
				if(listado){
					listado.establecerRegistros([], false)
				}
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposCargaLiquidez() {
	document.getElementById('inptMontoLiquidez').value = "";
	document.getElementById('inptFechaLiquidez').value = "";
	document.getElementById('inptEstadoLiquidez').value = "Activo";
	document.getElementById('btnAbmLiquidez').value = "Guardar datos";
	document.getElementById('btnEditarLiquidez').style.backgroundColor="#b7b7b7";
	idAbmLiquidez = "";
}


/*
ABM PATRIMONIO DE LA EMPRESA
*/
var listadoAbmPatrimonioEmpresa = null;
function obtenerListadoAbmPatrimonioEmpresa(){
	if(listadoAbmPatrimonioEmpresa){
		return listadoAbmPatrimonioEmpresa;
	}
	if(typeof AbmListadoCore === "undefined"){
		return null;
	}
	var cabecera = document.querySelector("#tdTituloImprePatrimonioEmpresa tr");
	if(!cabecera){
		return null;
	}
	cabecera.id = "cabeceraAbmPatrimonioEmpresa";
	listadoAbmPatrimonioEmpresa = AbmListadoCore.crear({
		nombre: "patrimonio_empresa",
		idCabecera: "cabeceraAbmPatrimonioEmpresa",
		idCuerpo: "table_abm_PatrimonioEmpresa",
		columnas: [
			{ campo: "tipo", titulo: "TIPO", ancho: "18%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "32%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "15%" },
			{ campo: "valor", titulo: "VALOR", ancho: "15%" },
			{ campo: "observacion", titulo: "OBSERVACION", ancho: "20%" }
		],
		fila: {
			claseTabla: function(registro, indice){
				return indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
			},
			funcionSeleccion: "obtenerdatosabmPatrimonioEmpresa",
			celdas: [
				{ id: "td_id", campo: "idpatrimonio_empresa", tecnica: true },
				{ id: "td_datos_1", columna: "tipo", campo: "tipo" },
				{ id: "td_datos_2", columna: "descripcion", campo: "descripcion" },
				{ id: "td_datos_3", columna: "fecha", campo: "fecha" },
				{ id: "td_datos_4", columna: "valor", valor: function(registro){ return registro.valor_formateado; } },
				{ id: "td_datos_5", columna: "observacion", campo: "observacion" },
				{ id: "td_datos_6", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmPatrimonioEmpresa.iniciar();
	return listadoAbmPatrimonioEmpresa;
}
function tieneAccesoPatrimonioEmpresa(){
	if(typeof accesosuser === "undefined" || !accesosuser){
		return true;
	}
	if(accesosuser["VERPATRIMONIOEMPRESA"]){
		return accesosuser["VERPATRIMONIOEMPRESA"]["accion"] == "SI";
	}
	if(accesosuser["VERCARGARLIQUIDEZ"]){
		return accesosuser["VERCARGARLIQUIDEZ"]["accion"] == "SI";
	}
	return true;
}
function fechaActualPatrimonioEmpresa(){
	var f = new Date();
	var dia = f.getDate();
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1;
	if (mes < 10) {
		mes = "0" + mes;
	}
	return f.getFullYear() + "-" + mes + "-" + dia;
}
function verCerrarAbmPatrimonioEmpresa(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmPatrimonioEmpresa").style.display==""){
		limpiarcamposCargaPatrimonioEmpresa();
		limpiarcamposbuscarpatrimonioempresa();
		document.getElementById("divMinimizadoAbmPatrimonioEmpresa").style.display="none";
		$("div[id=divAbmPatrimonioEmpresa]").fadeOut(500);
	}else{
		if(tieneAccesoPatrimonioEmpresa() == false){
			ver_vetana_informativa("NO TIENES PERMISO PARA ACCEDER");
			return;
		}
		checkRangoFechaPatrimonioEmpresa("2");
		mostrarSoloUno("divAbmPatrimonioEmpresa");
		document.getElementById("divAbmPatrimonioEmpresa").style.display="";
	}
}
function limpiarcamposbuscarpatrimonioempresa(){
	document.getElementById("inptBuscarPatrimonioEmpresaF1").value="";
	document.getElementById("inptBuscarPatrimonioEmpresaF2").value="";
	document.getElementById("inptBuscarTipoPatrimonioEmpresa").value="";
	document.getElementById("inptBuscarDescripcionPatrimonioEmpresa").value="";
	document.getElementById("inptTotalRegistroPatrimonioEmpresa").value="";
	document.getElementById("inptTotalActivoPatrimonioEmpresa").value="";
	document.getElementById("inptTotalPasivoPatrimonioEmpresa").value="";
	document.getElementById("inptTotalPatrimonioEmpresa").value="";
	if(listadoAbmPatrimonioEmpresa){
		listadoAbmPatrimonioEmpresa.establecerRegistros([], false);
	}else{
		document.getElementById("table_abm_PatrimonioEmpresa").innerHTML="";
	}
}
function minimizarPatrimonioEmpresa(){
	$("div[id=divAbmPatrimonioEmpresa]").fadeOut(500);
	document.getElementById("divMinimizadoAbmPatrimonioEmpresa").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuAbmPatrimonioEmpresa"));
}
function verCerrarVentanaAbmPatrimonioEmpresa(d, l) {
	if (d == "1") {
		if (l == "1") {
			limpiarcamposCargaPatrimonioEmpresa();
		}
		$("div[id=divAbmPatrimonioEmpresa2]").fadeIn(250);
		document.getElementById('divAbmPatrimonioEmpresa1').style.display = "none";
	} else {
		$("div[id=divAbmPatrimonioEmpresa1]").fadeIn(250);
		document.getElementById('divAbmPatrimonioEmpresa2').style.display = "none";
	}
}
function verVentanaEditarPatrimonioEmpresa() {
	if (idAbmPatrimonioEmpresa == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO");
		return;
	}
	verCerrarVentanaAbmPatrimonioEmpresa("1", "2");
}
var idAbmPatrimonioEmpresa = "";
function obtenerdatosabmPatrimonioEmpresa(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = "";
	});
	datostr.className = "tableRegistroSelec";
	document.getElementById("inptTipoPatrimonioEmpresa").value = $(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById("inptDescripcionPatrimonioEmpresa").value = $(datostr).children('td[id="td_datos_2"]').text();
	document.getElementById("inptFechaPatrimonioEmpresa").value = $(datostr).children('td[id="td_datos_3"]').text();
	document.getElementById("inptValorPatrimonioEmpresa").value = $(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById("inptObservacionPatrimonioEmpresa").value = $(datostr).children('td[id="td_datos_5"]').text();
	document.getElementById("inptEstadoPatrimonioEmpresa").value = $(datostr).children('td[id="td_datos_6"]').text();
	idAbmPatrimonioEmpresa = $(datostr).children('td[id="td_id"]').text();
	document.getElementById("btnAbmPatrimonioEmpresa").value = "Editar datos";
	document.getElementById("btnEditarPatrimonioEmpresa").style.backgroundColor="";
}
function verificarcamposPatrimonioEmpresa() {
	var descripcion = document.getElementById("inptDescripcionPatrimonioEmpresa").value;
	var tipo = document.getElementById("inptTipoPatrimonioEmpresa").value;
	var valor = document.getElementById("inptValorPatrimonioEmpresa").value;
	var fecha = document.getElementById("inptFechaPatrimonioEmpresa").value;
	var estado = document.getElementById("inptEstadoPatrimonioEmpresa").value;
	var observacion = document.getElementById("inptObservacionPatrimonioEmpresa").value;
	
	if (tipo == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL TIPO");
		return false;
	}
	if (descripcion == "") {
		document.getElementById("inptDescripcionPatrimonioEmpresa").focus();
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION");
		return false;
	}
	if (valor == "") {
		document.getElementById("inptValorPatrimonioEmpresa").focus();
		ver_vetana_informativa("FALTO INGRESAR EL VALOR ACTUAL");
		return false;
	}
	if (fecha == "") {
		document.getElementById("inptFechaPatrimonioEmpresa").focus();
		ver_vetana_informativa("FALTO INGRESAR LA FECHA");
		return false;
	}
	if (estado == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO");
		return false;
	}
	
	var accion = "";
	if (idAbmPatrimonioEmpresa != "") {
		accion = "editar";
	} else {
		accion = "nuevo";
	}
	
	abmPatrimonioEmpresa(descripcion, tipo, valor, fecha, estado, observacion, idAbmPatrimonioEmpresa, accion);
}
function abmPatrimonioEmpresa(descripcion, tipo, valor, fecha, estado, observacion, idpatrimonio_empresa, accion) {
	verCerrarEfectoCargando("1");
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid);
	datos.append("passu", passuser);
	datos.append("navegador", navegador);
	datos.append("funt", accion);
	datos.append("idpatrimonio_empresa", idpatrimonio_empresa);
	datos.append("descripcion", descripcion);
	datos.append("tipo", tipo);
	datos.append("valor", valor);
	datos.append("fecha", fecha);
	datos.append("estado", estado);
	datos.append("observacion", observacion);
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmPatrimonioEmpresa.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("");
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana");
			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("");
			Respuesta = responseText;
			console.log(Respuesta);
			try {
				var datos = parsearRespuestaJsonEmpresa(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta);
				if (Respuesta == true) {
					limpiarcamposCargaPatrimonioEmpresa();
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...");
					idAbmPatrimonioEmpresa = "";
					buscarabmPatrimonioEmpresa();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ");
				var titulo="Error: "+error+" \r\n Consola: "+textoRespuestaJsonEmpresa(responseText);
				GuardarArchivosLog(titulo);
			}
		}
	});
}
function checkestadoPatrimonioEmpresa(d){
	if(d=="1"){
		document.getElementById("inptSeleccEstadoBuscarPatrimonioEmpresa1").checked=true;
		document.getElementById("inptSeleccEstadoBuscarPatrimonioEmpresa2").checked=false;
	}else{
		document.getElementById("inptSeleccEstadoBuscarPatrimonioEmpresa1").checked=false;
		document.getElementById("inptSeleccEstadoBuscarPatrimonioEmpresa2").checked=true;
	}
}
function checkRangoFechaPatrimonioEmpresa(d){
	if(d=="1"){
		document.getElementById("checkRangoFechaPatrimonioEmpresa1").checked=true;
		document.getElementById("checkRangoFechaPatrimonioEmpresa2").checked=false;
		var f = new Date();
		var dia = f.getDate();
		if (dia < 10) {
			dia = "0" + dia;
		}
		var mes = f.getMonth() + 1;
		if (mes < 10) {
			mes = "0" + mes;
		}
		document.getElementById("inptBuscarPatrimonioEmpresaF1").value = f.getFullYear() + "-" + mes + "-" + "01";
		document.getElementById("inptBuscarPatrimonioEmpresaF2").value = f.getFullYear() + "-" + mes + "-" + dia;
	}else{
		document.getElementById("checkRangoFechaPatrimonioEmpresa1").checked=false;
		document.getElementById("checkRangoFechaPatrimonioEmpresa2").checked=true;
		document.getElementById("inptBuscarPatrimonioEmpresaF1").value = "";
		document.getElementById("inptBuscarPatrimonioEmpresaF2").value = "";
	}
}
function buscarabmPatrimonioEmpresa() {
	var listado = obtenerListadoAbmPatrimonioEmpresa();
	var fecha1 = document.getElementById("inptBuscarPatrimonioEmpresaF1").value;
	var fecha2 = document.getElementById("inptBuscarPatrimonioEmpresaF2").value;
	var tipo = document.getElementById("inptBuscarTipoPatrimonioEmpresa").value;
	var buscar = document.getElementById("inptBuscarDescripcionPatrimonioEmpresa").value;
	var estado = "";
	if(document.getElementById("inptSeleccEstadoBuscarPatrimonioEmpresa1").checked==true){
		estado = "Activo";
	}else{
		estado = "Inactivo";
	}
	if(listado){
		listado.establecerRegistros([], false);
	}
	document.getElementById("table_abm_PatrimonioEmpresa").innerHTML = paginacargando;
	document.getElementById("inptTotalRegistroPatrimonioEmpresa").value="";
	document.getElementById("inptTotalActivoPatrimonioEmpresa").value="";
	document.getElementById("inptTotalPasivoPatrimonioEmpresa").value="";
	document.getElementById("inptTotalPatrimonioEmpresa").value="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscar,
		"tipo": tipo,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"formato": listado ? "json" : "html",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmPatrimonioEmpresa.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana");
			if(listado){
				listado.establecerRegistros([], false);
			}else{
				document.getElementById("table_abm_PatrimonioEmpresa").innerHTML = "";
			}
			document.getElementById("inptTotalRegistroPatrimonioEmpresa").value="";
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta);
			if(!listado){
				document.getElementById("table_abm_PatrimonioEmpresa").innerHTML = "";
			}
			document.getElementById("inptTotalRegistroPatrimonioEmpresa").value="";
			try {
				var datos = parsearRespuestaJsonEmpresa(Respuesta);
				if(listado){
					listado.establecerRegistros([], false);
				}
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta);
				if (Respuesta == true) {
					if (listado && Array.isArray(datos[2])) {
						listado.establecerRegistros(datos[2], false);
					} else {
						document.getElementById("table_abm_PatrimonioEmpresa").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					}
					document.getElementById("inptTotalRegistroPatrimonioEmpresa").value = datos[3];
					document.getElementById("inptTotalActivoPatrimonioEmpresa").value = datos[4];
					document.getElementById("inptTotalPasivoPatrimonioEmpresa").value = datos[5];
					document.getElementById("inptTotalPatrimonioEmpresa").value = datos[6];
				}
			} catch (error) {
				if(listado){
					listado.establecerRegistros([], false);
				}
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ");
				var titulo="Error: "+error+" \r\n Consola: "+textoRespuestaJsonEmpresa(responseText);
				GuardarArchivosLog(titulo);
			}
		}
	});
}
function limpiarcamposCargaPatrimonioEmpresa() {
	document.getElementById("inptTipoPatrimonioEmpresa").value = "Activo";
	document.getElementById("inptDescripcionPatrimonioEmpresa").value = "";
	document.getElementById("inptValorPatrimonioEmpresa").value = "0";
	document.getElementById("inptFechaPatrimonioEmpresa").value = fechaActualPatrimonioEmpresa();
	document.getElementById("inptEstadoPatrimonioEmpresa").value = "Activo";
	document.getElementById("inptObservacionPatrimonioEmpresa").value = "";
	document.getElementById("btnAbmPatrimonioEmpresa").value = "Guardar datos";
	document.getElementById("btnEditarPatrimonioEmpresa").style.backgroundColor="#b7b7b7";
	idAbmPatrimonioEmpresa = "";
}


/*
ABM GASTOS FIJOS DE LA EMPRESA
*/
var listadoAbmGastosFijosEmpresa = null;
function obtenerListadoAbmGastosFijosEmpresa(){
	if(listadoAbmGastosFijosEmpresa){
		return listadoAbmGastosFijosEmpresa;
	}
	if(typeof AbmListadoCore === "undefined"){
		return null;
	}
	var cabecera = document.querySelector("#tdTituloImpreGastosFijosEmpresa tr");
	if(!cabecera){
		return null;
	}
	cabecera.id = "cabeceraAbmGastosFijosEmpresa";
	listadoAbmGastosFijosEmpresa = AbmListadoCore.crear({
		nombre: "gastos_fijos_empresa",
		idCabecera: "cabeceraAbmGastosFijosEmpresa",
		idCuerpo: "table_abm_GastosFijosEmpresa",
		columnas: [
			{ campo: "categoria", titulo: "CATEGORIA", ancho: "18%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "25%" },
			{ campo: "monto", titulo: "MONTO", ancho: "12%" },
			{ campo: "frecuencia", titulo: "FRECUENCIA", ancho: "12%" },
			{ campo: "dia_vencimiento", titulo: "VENCE DIA", ancho: "10%" },
			{ campo: "fecha_inicio", titulo: "INICIO", ancho: "12%" },
			{ campo: "observacion", titulo: "OBSERVACION", ancho: "11%" }
		],
		fila: {
			claseTabla: function(registro, indice){
				return indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch";
			},
			funcionSeleccion: "obtenerdatosabmGastosFijosEmpresa",
			celdas: [
				{ id: "td_id", campo: "idgasto_fijo_empresa", tecnica: true },
				{ id: "td_datos_1", columna: "categoria", campo: "categoria" },
				{ id: "td_datos_2", columna: "descripcion", campo: "descripcion" },
				{ id: "td_datos_3", columna: "monto", valor: function(registro){ return registro.monto_formateado; }, render: function(valor, registro, celda){ celda.style.textAlign = "right"; return valor; } },
				{ id: "td_datos_4", columna: "frecuencia", campo: "frecuencia", render: function(valor, registro, celda){ celda.style.textAlign = "center"; return valor; } },
				{ id: "td_datos_5", columna: "dia_vencimiento", campo: "dia_vencimiento", render: function(valor, registro, celda){ celda.style.textAlign = "center"; return valor; } },
				{ id: "td_datos_6", columna: "fecha_inicio", campo: "fecha_inicio", render: function(valor, registro, celda){ celda.style.textAlign = "center"; return valor; } },
				{ id: "td_datos_7", columna: "observacion", campo: "observacion" },
				{ id: "td_datos_8", campo: "fecha_fin", tecnica: true },
				{ id: "td_datos_9", campo: "estado", tecnica: true },
				{ id: "td_datos_10", campo: "genera_cuenta_pagar", tecnica: true }
			]
		}
	});
	listadoAbmGastosFijosEmpresa.iniciar();
	return listadoAbmGastosFijosEmpresa;
}
function tieneAccesoGastosFijosEmpresa(){
	if(typeof accesosuser === "undefined" || !accesosuser){
		return true;
	}
	if(accesosuser["VERGASTOSFIJOSEMPRESA"]){
		return accesosuser["VERGASTOSFIJOSEMPRESA"]["accion"] == "SI";
	}
	if(accesosuser["VERCARGARLIQUIDEZ"]){
		return accesosuser["VERCARGARLIQUIDEZ"]["accion"] == "SI";
	}
	return true;
}
function fechaActualGastosFijosEmpresa(){
	var f = new Date();
	var dia = f.getDate();
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1;
	if (mes < 10) {
		mes = "0" + mes;
	}
	return f.getFullYear() + "-" + mes + "-" + dia;
}
function verCerrarAbmGastosFijosEmpresa(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmGastosFijosEmpresa").style.display==""){
		limpiarcamposCargaGastosFijosEmpresa();
		limpiarcamposbuscarGastosFijosEmpresa();
		document.getElementById("divMinimizadoAbmGastosFijosEmpresa").style.display="none";
		$("div[id=divAbmGastosFijosEmpresa]").fadeOut(500);
	}else{
		if(tieneAccesoGastosFijosEmpresa() == false){
			ver_vetana_informativa("NO TIENES PERMISO PARA ACCEDER");
			return;
		}
		checkRangoFechaGastosFijosEmpresa("2");
		mostrarSoloUno("divAbmGastosFijosEmpresa");
		document.getElementById("divAbmGastosFijosEmpresa").style.display="";
		buscarabmGastosFijosEmpresa();
	}
}
function limpiarcamposbuscarGastosFijosEmpresa(){
	document.getElementById("inptBuscarGastosFijosEmpresaF1").value="";
	document.getElementById("inptBuscarGastosFijosEmpresaF2").value="";
	document.getElementById("inptBuscarCategoriaGastosFijosEmpresa").value="";
	document.getElementById("inptBuscarFrecuenciaGastosFijosEmpresa").value="";
	document.getElementById("inptBuscarDescripcionGastosFijosEmpresa").value="";
	document.getElementById("inptTotalRegistroGastosFijosEmpresa").value="";
	document.getElementById("inptTotalMontoGastosFijosEmpresa").value="";
	document.getElementById("inptTotalMensualGastosFijosEmpresa").value="";
	if(listadoAbmGastosFijosEmpresa){
		listadoAbmGastosFijosEmpresa.establecerRegistros([], false);
	}else{
		document.getElementById("table_abm_GastosFijosEmpresa").innerHTML="";
	}
}
function minimizarGastosFijosEmpresa(){
	$("div[id=divAbmGastosFijosEmpresa]").fadeOut(500);
	document.getElementById("divMinimizadoAbmGastosFijosEmpresa").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuAbmGastosFijosEmpresa"));
}
function verCerrarVentanaAbmGastosFijosEmpresa(d, l) {
	if (d == "1") {
		if (l == "1") {
			limpiarcamposCargaGastosFijosEmpresa();
		}
		$("div[id=divAbmGastosFijosEmpresa2]").fadeIn(250);
		document.getElementById('divAbmGastosFijosEmpresa1').style.display = "none";
	} else {
		$("div[id=divAbmGastosFijosEmpresa1]").fadeIn(250);
		document.getElementById('divAbmGastosFijosEmpresa2').style.display = "none";
	}
}
function verVentanaEditarGastosFijosEmpresa() {
	if (idAbmGastosFijosEmpresa == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO");
		return;
	}
	verCerrarVentanaAbmGastosFijosEmpresa("1", "2");
}
var idAbmGastosFijosEmpresa = "";
function obtenerdatosabmGastosFijosEmpresa(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = "";
	});
	datostr.className = "tableRegistroSelec";
	document.getElementById("inptCategoriaGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_1"]').text();
	document.getElementById("inptDescripcionGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_2"]').text();
	document.getElementById("inptMontoGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_3"]').text();
	document.getElementById("inptFrecuenciaGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_4"]').text();
	document.getElementById("inptDiaVencimientoGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_5"]').text();
	document.getElementById("inptFechaInicioGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_6"]').text();
	document.getElementById("inptObservacionGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_7"]').text();
	document.getElementById("inptFechaFinGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_8"]').text();
	document.getElementById("inptEstadoGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_9"]').text();
	document.getElementById("inptGeneraCuentaPagarGastosFijosEmpresa").value = $(datostr).children('td[id="td_datos_10"]').text();
	idAbmGastosFijosEmpresa = $(datostr).children('td[id="td_id"]').text();
	document.getElementById("btnAbmGastosFijosEmpresa").value = "Editar datos";
	document.getElementById("btnEditarGastosFijosEmpresa").style.backgroundColor="";
}
function verificarcamposGastosFijosEmpresa() {
	var descripcion = document.getElementById("inptDescripcionGastosFijosEmpresa").value;
	var categoria = document.getElementById("inptCategoriaGastosFijosEmpresa").value;
	var monto = document.getElementById("inptMontoGastosFijosEmpresa").value;
	var frecuencia = document.getElementById("inptFrecuenciaGastosFijosEmpresa").value;
	var dia_vencimiento = document.getElementById("inptDiaVencimientoGastosFijosEmpresa").value;
	var fecha_inicio = document.getElementById("inptFechaInicioGastosFijosEmpresa").value;
	var fecha_fin = document.getElementById("inptFechaFinGastosFijosEmpresa").value;
	var estado = document.getElementById("inptEstadoGastosFijosEmpresa").value;
	var genera_cuenta_pagar = document.getElementById("inptGeneraCuentaPagarGastosFijosEmpresa").value;
	var observacion = document.getElementById("inptObservacionGastosFijosEmpresa").value;
	
	if (categoria == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA CATEGORIA");
		return false;
	}
	if (descripcion == "") {
		document.getElementById("inptDescripcionGastosFijosEmpresa").focus();
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION");
		return false;
	}
	if (monto == "") {
		document.getElementById("inptMontoGastosFijosEmpresa").focus();
		ver_vetana_informativa("FALTO INGRESAR EL MONTO");
		return false;
	}
	if (frecuencia == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FRECUENCIA");
		return false;
	}
	if (dia_vencimiento == "" || parseInt(dia_vencimiento,10) < 1 || parseInt(dia_vencimiento,10) > 31) {
		document.getElementById("inptDiaVencimientoGastosFijosEmpresa").focus();
		ver_vetana_informativa("EL DIA DE VENCIMIENTO DEBE SER ENTRE 1 Y 31");
		return false;
	}
	if (fecha_inicio == "") {
		document.getElementById("inptFechaInicioGastosFijosEmpresa").focus();
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DE INICIO");
		return false;
	}
	if (estado == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO");
		return false;
	}
	if (genera_cuenta_pagar == "") {
		ver_vetana_informativa("FALTO SELECCIONAR SI GENERA CUENTA A PAGAR");
		return false;
	}
	
	var accion = "";
	if (idAbmGastosFijosEmpresa != "") {
		accion = "editar";
	} else {
		accion = "nuevo";
	}
	
	abmGastosFijosEmpresa(descripcion, categoria, monto, frecuencia, dia_vencimiento, fecha_inicio, fecha_fin, estado, genera_cuenta_pagar, observacion, idAbmGastosFijosEmpresa, accion);
}
function abmGastosFijosEmpresa(descripcion, categoria, monto, frecuencia, dia_vencimiento, fecha_inicio, fecha_fin, estado, genera_cuenta_pagar, observacion, idgasto_fijo_empresa, accion) {
	verCerrarEfectoCargando("1");
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid);
	datos.append("passu", passuser);
	datos.append("navegador", navegador);
	datos.append("funt", accion);
	datos.append("idgasto_fijo_empresa", idgasto_fijo_empresa);
	datos.append("descripcion", descripcion);
	datos.append("categoria", categoria);
	datos.append("monto", monto);
	datos.append("frecuencia", frecuencia);
	datos.append("dia_vencimiento", dia_vencimiento);
	datos.append("fecha_inicio", fecha_inicio);
	datos.append("fecha_fin", fecha_fin);
	datos.append("estado", estado);
	datos.append("genera_cuenta_pagar", genera_cuenta_pagar);
	datos.append("observacion", observacion);
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmGastosFijosEmpresa.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			verCerrarEfectoCargando("");
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana");
			return false;
		},
		success: function (responseText) {
			verCerrarEfectoCargando("");
			Respuesta = responseText;
			console.log(Respuesta);
			try {
				var datos = parsearRespuestaJsonEmpresa(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta);
				if (Respuesta == true) {
					limpiarcamposCargaGastosFijosEmpresa();
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...");
					idAbmGastosFijosEmpresa = "";
					buscarabmGastosFijosEmpresa();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ");
				var titulo="Error: "+error+" \r\n Consola: "+textoRespuestaJsonEmpresa(responseText);
				GuardarArchivosLog(titulo);
			}
		}
	});
}
function checkestadoGastosFijosEmpresa(d){
	if(d=="1"){
		document.getElementById("inptSeleccEstadoBuscarGastosFijosEmpresa1").checked=true;
		document.getElementById("inptSeleccEstadoBuscarGastosFijosEmpresa2").checked=false;
	}else{
		document.getElementById("inptSeleccEstadoBuscarGastosFijosEmpresa1").checked=false;
		document.getElementById("inptSeleccEstadoBuscarGastosFijosEmpresa2").checked=true;
	}
}
function checkRangoFechaGastosFijosEmpresa(d){
	if(d=="1"){
		document.getElementById("checkRangoFechaGastosFijosEmpresa1").checked=true;
		document.getElementById("checkRangoFechaGastosFijosEmpresa2").checked=false;
		var f = new Date();
		var dia = f.getDate();
		if (dia < 10) {
			dia = "0" + dia;
		}
		var mes = f.getMonth() + 1;
		if (mes < 10) {
			mes = "0" + mes;
		}
		document.getElementById("inptBuscarGastosFijosEmpresaF1").value = f.getFullYear() + "-" + mes + "-" + "01";
		document.getElementById("inptBuscarGastosFijosEmpresaF2").value = f.getFullYear() + "-" + mes + "-" + dia;
	}else{
		document.getElementById("checkRangoFechaGastosFijosEmpresa1").checked=false;
		document.getElementById("checkRangoFechaGastosFijosEmpresa2").checked=true;
		document.getElementById("inptBuscarGastosFijosEmpresaF1").value = "";
		document.getElementById("inptBuscarGastosFijosEmpresaF2").value = "";
	}
}
function buscarabmGastosFijosEmpresa() {
	var listado = obtenerListadoAbmGastosFijosEmpresa();
	var fecha1 = document.getElementById("inptBuscarGastosFijosEmpresaF1").value;
	var fecha2 = document.getElementById("inptBuscarGastosFijosEmpresaF2").value;
	var categoria = document.getElementById("inptBuscarCategoriaGastosFijosEmpresa").value;
	var frecuencia = document.getElementById("inptBuscarFrecuenciaGastosFijosEmpresa").value;
	var buscar = document.getElementById("inptBuscarDescripcionGastosFijosEmpresa").value;
	var estado = "";
	if(document.getElementById("inptSeleccEstadoBuscarGastosFijosEmpresa1").checked==true){
		estado = "Activo";
	}else{
		estado = "Inactivo";
	}
	if(listado){
		listado.establecerRegistros([], false);
	}
	document.getElementById("table_abm_GastosFijosEmpresa").innerHTML = paginacargando;
	document.getElementById("inptTotalRegistroGastosFijosEmpresa").value="";
	document.getElementById("inptTotalMontoGastosFijosEmpresa").value="";
	document.getElementById("inptTotalMensualGastosFijosEmpresa").value="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscar,
		"categoria": categoria,
		"frecuencia": frecuencia,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"estado": estado,
		"formato": listado ? "json" : "html",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmGastosFijosEmpresa.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana");
			if(listado){
				listado.establecerRegistros([], false);
			}else{
				document.getElementById("table_abm_GastosFijosEmpresa").innerHTML = "";
			}
			document.getElementById("inptTotalRegistroGastosFijosEmpresa").value="";
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta);
			if(!listado){
				document.getElementById("table_abm_GastosFijosEmpresa").innerHTML = "";
			}
			document.getElementById("inptTotalRegistroGastosFijosEmpresa").value="";
			try {
				var datos = parsearRespuestaJsonEmpresa(Respuesta);
				if(listado){
					listado.establecerRegistros([], false);
				}
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta);
				if (Respuesta == true) {
					if (listado && Array.isArray(datos[2])) {
						listado.establecerRegistros(datos[2], false);
					} else {
						document.getElementById("table_abm_GastosFijosEmpresa").innerHTML = typeof datos[2] === "string" ? datos[2] : "";
					}
					document.getElementById("inptTotalRegistroGastosFijosEmpresa").value = datos[3];
					document.getElementById("inptTotalMontoGastosFijosEmpresa").value = datos[4];
					document.getElementById("inptTotalMensualGastosFijosEmpresa").value = datos[5];
				}
			} catch (error) {
				if(listado){
					listado.establecerRegistros([], false);
				}
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ");
				var titulo="Error: "+error+" \r\n Consola: "+textoRespuestaJsonEmpresa(responseText);
				GuardarArchivosLog(titulo);
			}
		}
	});
}
function limpiarcamposCargaGastosFijosEmpresa() {
	document.getElementById("inptCategoriaGastosFijosEmpresa").value = "Alquiler";
	document.getElementById("inptDescripcionGastosFijosEmpresa").value = "";
	document.getElementById("inptMontoGastosFijosEmpresa").value = "0";
	document.getElementById("inptFrecuenciaGastosFijosEmpresa").value = "Mensual";
	document.getElementById("inptDiaVencimientoGastosFijosEmpresa").value = "1";
	document.getElementById("inptFechaInicioGastosFijosEmpresa").value = fechaActualGastosFijosEmpresa();
	document.getElementById("inptFechaFinGastosFijosEmpresa").value = "";
	document.getElementById("inptEstadoGastosFijosEmpresa").value = "Activo";
	document.getElementById("inptGeneraCuentaPagarGastosFijosEmpresa").value = "NO";
	document.getElementById("inptObservacionGastosFijosEmpresa").value = "";
	document.getElementById("btnAbmGastosFijosEmpresa").value = "Guardar datos";
	document.getElementById("btnEditarGastosFijosEmpresa").style.backgroundColor="#b7b7b7";
	idAbmGastosFijosEmpresa = "";
}


/*
ABM DESCRIPCION BANCO LIQUIDEZ
*/
var listadoAbmDescripcionBancoLiquidez = null;
function obtenerListadoAbmDescripcionBancoLiquidez(){
	if(listadoAbmDescripcionBancoLiquidez){ return listadoAbmDescripcionBancoLiquidez; }
	if(typeof AbmListadoCore === "undefined"){ return null; }
	var cuerpo = document.getElementById("divBuscadorDescripcionBancoLiquidez");
	if(!cuerpo || !cuerpo.parentNode){ return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if(!cabecera){ return null; }
	cabecera.id = "cabeceraAbmDescripcionBancoLiquidez";
	listadoAbmDescripcionBancoLiquidez = AbmListadoCore.crear({
		nombre: "descripcion_banco_liquidez",
		idCabecera: "cabeceraAbmDescripcionBancoLiquidez",
		idCuerpo: "divBuscadorDescripcionBancoLiquidez",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmDescripcionBancoLiquidez",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmDescripcionBancoLiquidez.iniciar();
	return listadoAbmDescripcionBancoLiquidez;
}
var idAbmDescripcionBancoLiquidez="";
var ElementoSeleccDescripcionBancoLiquidez="";
function verCerrarFrmDescripcionBancoLiquidez(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVADESCRIPCIONBANCOLIQUIDEZ,"accion")==false){return;}	
		$("div[id=divAbmDescripcionBancoLiquidez]").fadeIn(500);
		BuscarAbmDescripcionBancoLiquidez()
	}else{
		$("div[id=divAbmDescripcionBancoLiquidez]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionBancoLiquidez(){
	document.getElementById("inptNombreDescripcionBancoLiquidez").value="";
	document.getElementById("inptEstadoDescripcionBancoLiquidez").value="";
	document.getElementById("btnDescripcionBancoLiquidez1").value="Guardar Datos"
	idAbmDescripcionBancoLiquidez="";
	ElementoSeleccDescripcionBancoLiquidez="";
}
function ObtenerdatosAbmDescripcionBancoLiquidez(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionBancoLiquidez=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionBancoLiquidez").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionBancoLiquidez").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionBancoLiquidez = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionBancoLiquidez1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionBancoLiquidez(){
	if(ElementoSeleccDescripcionBancoLiquidez==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionBancoLiquidez").style.display="none";
	 document.getElementById("inptBancoLiquidez").value = idAbmDescripcionBancoLiquidez
	 LimpiarCamposDescripcionBancoLiquidez()
}
function VerificarDatosDescripcionBancoLiquidez(){
	var inptNombreDescripcionBancoLiquidez = document.getElementById("inptNombreDescripcionBancoLiquidez").value
	var inptEstadoDescripcionBancoLiquidez = document.getElementById("inptEstadoDescripcionBancoLiquidez").value	
	if(inptNombreDescripcionBancoLiquidez==""){
		document.getElementById("inptNombreDescripcionBancoLiquidez").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionBancoLiquidez==""){
		document.getElementById("inptEstadoDescripcionBancoLiquidez").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionBancoLiquidez != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionBancoLiquidez(inptNombreDescripcionBancoLiquidez,inptEstadoDescripcionBancoLiquidez,idAbmDescripcionBancoLiquidez,accion)
}
function AbmDescripcionBancoLiquidez(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoLiquidez.php",
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
				LimpiarCamposDescripcionBancoLiquidez()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionBancoLiquidez()
				BuscarSelecDescripcionBancoLiquidez()
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
function BuscarAbmDescripcionBancoLiquidez() {
	var listado = obtenerListadoAbmDescripcionBancoLiquidez();
	var buscador = document.getElementById("inptBuscarAbmDescripcionBancoLiquidez").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionBancoLiquidez").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionBancoLiquidez").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionBancoLiquidez").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoLiquidez.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionBancoLiquidez").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionBancoLiquidez").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionBancoLiquidez").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionBancoLiquidez").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
                   document.getElementById("lblNroRegistroDescripcionBancoLiquidez").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionBancoLiquidez() {
	document.getElementById("inptSeleccBancoLiquidez").innerHTML = ""
	document.getElementById("inptBuscarBancoLiquidez").innerHTML = ""
	document.getElementById("inptBuscarInformeLiquidezGeneralBanco").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionBancoLiquidez.php",
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
					document.getElementById("inptSeleccBancoLiquidez").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptBuscarBancoLiquidez").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptBuscarInformeLiquidezGeneralBanco").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/* INFORME GENERAL LIQUIDEZ */
function verCerrarInformeLiquidezGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeLiquidezGeneral").style.display==""){
		limpiarventanainformeLiquidezGeneral()
		
		$("div[id=divInformeLiquidezGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeLiquidezGeneral").style.display=""
	}
}
function buscarinformeLiquidezGeneral() {
	var anho = document.getElementById("inptBuscarInformeLiquidezGeneralFecha").value
	var cod_banco = document.getElementById("inptBuscarInformeLiquidezGeneralBanco").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_LiquidezGeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"cod_banco": cod_banco,
		"funt": "buscar_informe_liquidez_general",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmLiquidez.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_LiquidezGeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_LiquidezGeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) {
						renderInformeMatrizMensual(pagina, "table_informe_LiquidezGeneral");
					} else {
						document.getElementById("table_informe_LiquidezGeneral").innerHTML = pagina;
					}
					// agregarFilaTotalesInformeLiquidezGeneral();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformeLiquidezGeneralGrafica() {
	var anho = document.getElementById("inptBuscarInformeLiquidezGeneralFecha").value
	var cod_banco = document.getElementById("inptBuscarInformeLiquidezGeneralBanco").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"anho": anho,
		"cod_banco": cod_banco,
		"funt": "buscar_informe_liquidez_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmLiquidez.php",
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
					
					
					if(obj_chart_liquidez_general){
						obj_chart_liquidez_general.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
					let data = {
					labels: labels,
					datasets: [{
						label: datos[5],
						data: datos[3],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  datos[6],
						data: datos[4],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_informe_liquidez_general(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
let obj_chart_liquidez_general = '';
function generar_graficos_informe_liquidez_general(data){
	const graph = document.querySelector("#graph_informe_liquidez_general");


	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_liquidez_general = new Chart(graph, config);
}
function limpiarventanainformeLiquidezGeneral(){ 
	document.getElementById("table_informe_LiquidezGeneral").innerHTML="" 
	
	if(obj_chart_liquidez_general){
		obj_chart_liquidez_general.destroy()
	}
	
	document.getElementById('inptBuscarInformeLiquidezGeneralFecha').value = ''
	document.getElementById('inptBuscarInformeLiquidezGeneralBanco').value = ''
	document.getElementById("btnInformeLiquidezGeneral1").style='background-color:#ff9800;color:#fff';
	document.getElementById("btnInformeLiquidezGeneral2").style='';
	document.getElementById("divVentanaInformeLiquidezGeneral1").style.display=''
	document.getElementById("divVentanaInformeLiquidezGeneral2").style.display='none'
	
	
}
function verCerrarInformeVentanasLiquidezGeneral(d){
	var selectAnho = document.getElementById('inptBuscarInformeLiquidezGeneralFecha').value;
	if(selectAnho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
		return;
	}
	
	document.getElementById("btnInformeLiquidezGeneral1").style=''
	document.getElementById("btnInformeLiquidezGeneral2").style=''
	
	document.getElementById("divVentanaInformeLiquidezGeneral1").style.display='none'
	document.getElementById("divVentanaInformeLiquidezGeneral2").style.display='none'


	if(d=="1"){
		
		buscarinformeLiquidezGeneral()
		document.getElementById("btnInformeLiquidezGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeLiquidezGeneral1").style.display=''
			
	}
	if(d=="2"){
		
		buscarinformeLiquidezGeneralGrafica()
		document.getElementById("btnInformeLiquidezGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeLiquidezGeneral2").style.display=''
			
		
		
	}
}

function agregarFilaTotalesInformeLiquidezGeneral() {
    const contenedor = document.getElementById('table_informe_LiquidezGeneral');
    const totales = sumarColumnasLiquidezGeneral();

    const tablaTotal = document.createElement('table');
    tablaTotal.className = 'tableRegistroSearch'; // misma clase
    tablaTotal.border = 1;
    tablaTotal.cellSpacing = 1;
    tablaTotal.cellPadding = 5;

    const tr = document.createElement('tr');
    tr.style.fontWeight = 'bold';
    tr.style.background = '#e9ecef';

    totales.forEach((total, index) => {
        const td = document.createElement('td');
        td.style.width = '5%';

        if (index === 0) {
            td.innerText = 'TOTAL';
        } else {
            td.innerText = total.toLocaleString('es-ES');
        }

        tr.appendChild(td);
    });

    tablaTotal.appendChild(tr);
    contenedor.appendChild(tablaTotal);
}
function sumarColumnasLiquidezGeneral() {
    const contenedor = document.getElementById('table_informe_LiquidezGeneral');
    const tablas = contenedor.querySelectorAll('table');
    
    let totales = [];

    tablas.forEach(tabla => {
        const celdas = tabla.querySelectorAll('td');

        celdas.forEach((td, index) => {
            const valor = textoANumero(td.innerText.trim());
            totales[index] = (totales[index] || 0) + valor;
        });
    });

    return totales;
}

/*
AGENDA PERSONAL
*/
var listadoAbmAgendaPersonal = null;
function obtenerListadoAbmAgendaPersonal(){
	if(listadoAbmAgendaPersonal){ return listadoAbmAgendaPersonal; }
	if(typeof AbmListadoCore === "undefined"){ return null; }
	var cuerpo = document.getElementById("table_abm_AgendaPersonal");
	if(!cuerpo || !cuerpo.parentNode){ return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if(!cabecera){ return null; }
	cabecera.id = "cabeceraAbmAgendaPersonal";
	listadoAbmAgendaPersonal = AbmListadoCore.crear({
		nombre: "agenda_personal",
		idCabecera: "cabeceraAbmAgendaPersonal",
		idCuerpo: "table_abm_AgendaPersonal",
		ordenInicial: "fecha",
		columnas: [
			{ campo: "fecha", titulo: "FECHA", ancho: "10%" },
			{ campo: "motivo", titulo: "DESCRIPCION", ancho: "80%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "10%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmAgendaPersonal",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "fecha", columna: "fecha" },
				{ id: "td_datos_2", campo: "motivo", columna: "motivo" },
				{ campo: "tipo", columna: "tipo" },
				{ id: "td_datos_3", campo: "cod_tipo_agenda", tecnica: true },
				{ id: "td_datos_4", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmAgendaPersonal.iniciar();
	return listadoAbmAgendaPersonal;
}
function verCerrarAbmAgendaPersonal(){
		document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmAgendaPersonal").style.display==""){
		document.getElementById("divMinimizadoAgendaPersonal").style.display="none"
		limpiarcamposAgendaPersonal()
		limpiarcamposbuscarAgendaPersonal()
		$("div[id=divAbmAgendaPersonal]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERAGENDAPERSONAL","accion")==false){return;}
		mostrarSoloUno("divAbmAgendaPersonal")	
		document.getElementById("divAbmAgendaPersonal").style.display=""
		 
	}
}
function verCerrarVentanaAbmAgendaPersonal(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
			limpiarcamposAgendaPersonal()
		}
		$("div[id=divAbmAgendaPersonal2]").fadeIn(250)
		document.getElementById('divAbmAgendaPersonal1').style.display = "none"
	} else {
		$("div[id=divAbmAgendaPersonal1]").fadeIn(250)
		document.getElementById('divAbmAgendaPersonal2').style.display = "none"
	}
}
function limpiarcamposbuscarAgendaPersonal(){
		document.getElementById("table_abm_AgendaPersonal").innerHTML = ""
		document.getElementById("inptBuscarAgendaPersonal1").value = ""
		document.getElementById("inptTotalRegistoAgendaPersonal").value = "";
		document.getElementById("inptRegistroSeleccAgendaPersonal").value = "";
		checkHistorialFechaAgendaPersonal(1)
}
function minimizarabmAgendaPersonal(){ 
	$("div[id=divAbmAgendaPersonal]").fadeOut(500);	
	document.getElementById("divMinimizadoAgendaPersonal").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAgendaPersonal"));
}
function verVentanaEditarAgendaPersonal() {
	if (idAbmAgendaPersonal == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	verCerrarVentanaAbmAgendaPersonal("1", "2")
}
var idAbmAgendaPersonal = ""
function obtenerdatosabmAgendaPersonal(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptRegistroSeleccAgendaPersonal').value = $(datostr).children('td[id="td_id"]').html();
	document.getElementById('inptMotivoAgendaPersonal').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptCompromisoAgendaPersonal').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptTipoAgendaPersonal').value = $(datostr).children('td[id="td_datos_3"]').html();
	
	document.getElementById('btnAbmAgendaPersonal').value = "Editar datos";
	document.getElementById('btnEditarDatosAgendaPersonal').style.backgroundColor="";
	idAbmAgendaPersonal = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposAgendaPersonal() {
	var inptMotivoAgendaPersonal = document.getElementById('inptMotivoAgendaPersonal').value
	var inptCompromisoAgendaPersonal = document.getElementById('inptCompromisoAgendaPersonal').value
	var inptTipoAgendaPersonal = document.getElementById('inptTipoAgendaPersonal').value
	
	if (inptMotivoAgendaPersonal == "") {
		ver_vetana_informativa("FALTO INGRESAR UN MOTIVO")
		return false;
	}
	
	
	var estado = 'Activo';
	
	var accion = "";
	if (idAbmAgendaPersonal != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADODECAJA","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADODECAJA","accion")==false){return;}
	}
	abmAgendaPersonal(inptTipoAgendaPersonal,inptMotivoAgendaPersonal, inptCompromisoAgendaPersonal,estado , idAbmAgendaPersonal, accion);
}
function abmAgendaPersonal(cod_tipo_agendaFK,motivo, fecha,estado , idAgendaPersonal, accion) {
	verCerrarEfectoCargando("1")
	
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idAgendaPersonal", idAgendaPersonal)
	datos.append("motivo", motivo)
	datos.append("estado", estado)
	datos.append("fecha", fecha)
	datos.append("cod_tipo_agendaFK", cod_tipo_agendaFK)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmAgendaPersonal.php",
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
						limpiarcamposAgendaPersonal()
						idAbmAgendaPersonal = ""
						buscarabmAgendaPersonal();
					
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscarabmAgendaPersonal() {
	// if(controlacceso("BUSCARLISTADODECAJA","accion")==false){return;}
	var listado = obtenerListadoAbmAgendaPersonal();
	var fecha1 = document.getElementById('inptBuscarAgendaPersonalF1').value
	var fecha2 = document.getElementById('inptBuscarAgendaPersonalF2').value
	var inptBuscarAgendaPersonal1 = document.getElementById('inptBuscarAgendaPersonal1').value

	if(document.getElementById('checkHistorialFechaAgendaPersonal2').checked==true){
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
	document.getElementById("table_abm_AgendaPersonal").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cod_tipo_agendaFK": inptBuscarAgendaPersonal1,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmAgendaPersonal.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_AgendaPersonal").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_AgendaPersonal").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					document.getElementById("inptTotalRegistoAgendaPersonal").value = datos[3];
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposAgendaPersonal() {
	document.getElementById('inptMotivoAgendaPersonal').value = "";	
	document.getElementById('inptTipoAgendaPersonal').value = "";	
	document.getElementById('inptCompromisoAgendaPersonal').value = "";	
	document.getElementById('btnEditarDatosAgendaPersonal').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmAgendaPersonal').value = "Guardar datos";
	idAbmAgendaPersonal= "";
}
function checkHistorialFechaAgendaPersonal(d){	
	if(d=="1"){
		document.getElementById('checkHistorialFechaAgendaPersonal1').checked=true
		document.getElementById('checkHistorialFechaAgendaPersonal2').checked=false
		document.getElementById('inptBuscarAgendaPersonalF1').value = "";
	    document.getElementById('inptBuscarAgendaPersonalF2').value = "";	
	}else{		
		document.getElementById('checkHistorialFechaAgendaPersonal1').checked=false
		document.getElementById('checkHistorialFechaAgendaPersonal2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarAgendaPersonalF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarAgendaPersonalF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}


/*
ABM DESCRIPCION TIPO AGENDA PERSONAL
*/
var listadoAbmDescripcionTipoAgendaPersonal = null;
function obtenerListadoAbmDescripcionTipoAgendaPersonal(){
	if(listadoAbmDescripcionTipoAgendaPersonal){ return listadoAbmDescripcionTipoAgendaPersonal; }
	if(typeof AbmListadoCore === "undefined"){ return null; }
	var cuerpo = document.getElementById("divBuscadorDescripcionTipoAgendaPersonal");
	if(!cuerpo || !cuerpo.parentNode){ return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if(!cabecera){ return null; }
	cabecera.id = "cabeceraAbmDescripcionTipoAgendaPersonal";
	listadoAbmDescripcionTipoAgendaPersonal = AbmListadoCore.crear({
		nombre: "descripcion_tipo_agenda_personal",
		idCabecera: "cabeceraAbmDescripcionTipoAgendaPersonal",
		idCuerpo: "divBuscadorDescripcionTipoAgendaPersonal",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmDescripcionTipoAgendaPersonal",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmDescripcionTipoAgendaPersonal.iniciar();
	return listadoAbmDescripcionTipoAgendaPersonal;
}
var idAbmDescripcionTipoAgendaPersonal="";
var ElementoSeleccDescripcionTipoAgendaPersonal="";
function verCerrarFrmDescripcionTipoAgendaPersonal(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVADESCRIPCIONBANCOLIQUIDEZ,"accion")==false){return;}	
		$("div[id=divAbmDescripcionTipoAgendaPersonal]").fadeIn(500);
		BuscarAbmDescripcionTipoAgendaPersonal()
	}else{
		$("div[id=divAbmDescripcionTipoAgendaPersonal]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionTipoAgendaPersonal(){
	document.getElementById("inptNombreDescripcionTipoAgendaPersonal").value="";
	document.getElementById("inptEstadoDescripcionTipoAgendaPersonal").value="";
	document.getElementById("btnDescripcionTipoAgendaPersonal1").value="Guardar Datos"
	idAbmDescripcionTipoAgendaPersonal="";
	ElementoSeleccDescripcionTipoAgendaPersonal="";
}
function ObtenerdatosAbmDescripcionTipoAgendaPersonal(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionTipoAgendaPersonal=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionTipoAgendaPersonal").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionTipoAgendaPersonal").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionTipoAgendaPersonal = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionTipoAgendaPersonal1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionTipoAgendaPersonal(){
	if(ElementoSeleccDescripcionTipoAgendaPersonal==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionTipoAgendaPersonal").style.display="none";
	 document.getElementById("inptTipoAgendaPersonal").value = idAbmDescripcionTipoAgendaPersonal
	 LimpiarCamposDescripcionTipoAgendaPersonal()
}
function VerificarDatosDescripcionTipoAgendaPersonal(){
	var inptNombreDescripcionTipoAgendaPersonal = document.getElementById("inptNombreDescripcionTipoAgendaPersonal").value
	var inptEstadoDescripcionTipoAgendaPersonal = document.getElementById("inptEstadoDescripcionTipoAgendaPersonal").value	
	if(inptNombreDescripcionTipoAgendaPersonal==""){
		document.getElementById("inptNombreDescripcionTipoAgendaPersonal").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionTipoAgendaPersonal==""){
		document.getElementById("inptEstadoDescripcionTipoAgendaPersonal").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionTipoAgendaPersonal != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionTipoAgendaPersonal(inptNombreDescripcionTipoAgendaPersonal,inptEstadoDescripcionTipoAgendaPersonal,idAbmDescripcionTipoAgendaPersonal,accion)
}
function AbmDescripcionTipoAgendaPersonal(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionTipoAgendaPersonal.php",
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
				LimpiarCamposDescripcionTipoAgendaPersonal()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionTipoAgendaPersonal()
				BuscarSelecDescripcionTipoAgendaPersonal()
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
function BuscarAbmDescripcionTipoAgendaPersonal() {
	var listado = obtenerListadoAbmDescripcionTipoAgendaPersonal();
	var buscador = document.getElementById("inptBuscarAbmDescripcionTipoAgendaPersonal").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionTipoAgendaPersonal").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionTipoAgendaPersonal").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionTipoAgendaPersonal").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionTipoAgendaPersonal.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionTipoAgendaPersonal").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionTipoAgendaPersonal").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionTipoAgendaPersonal").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionTipoAgendaPersonal").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
                   document.getElementById("lblNroRegistroDescripcionTipoAgendaPersonal").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionTipoAgendaPersonal() {
	document.getElementById("inptTipoAgendaPersonal").innerHTML = ""
	document.getElementById("inptBuscarAgendaPersonal1").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionTipoAgendaPersonal.php",
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
					document.getElementById("inptTipoAgendaPersonal").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptBuscarAgendaPersonal1").innerHTML = "<option value=''>TODOS</option>"+datos_buscados
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
ABM CARGA ARCHIVO GENERAL
*/
var listadoAbmCargaArchivoGeneral = null;
function obtenerListadoAbmCargaArchivoGeneral(){
	if(listadoAbmCargaArchivoGeneral){ return listadoAbmCargaArchivoGeneral; }
	if(typeof AbmListadoCore === "undefined"){ return null; }
	var cuerpo = document.getElementById("table_abm_CargaArchivoGeneral");
	if(!cuerpo || !cuerpo.parentNode){ return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if(!cabecera){ return null; }
	cabecera.id = "cabeceraAbmCargaArchivoGeneral";
	listadoAbmCargaArchivoGeneral = AbmListadoCore.crear({
		nombre: "carga_archivo_general",
		idCabecera: "cabeceraAbmCargaArchivoGeneral",
		idCuerpo: "table_abm_CargaArchivoGeneral",
		ordenInicial: "fecha_carga",
		columnas: [
			{ campo: "fecha_carga", titulo: "FECHA CARGA", ancho: "10%" },
			{ campo: "mes", titulo: "MES", ancho: "10%" },
			{ campo: "anho", titulo: "AÑO", ancho: "10%" },
			{ campo: "tipo_movimiento", titulo: "TIPO MOVIMIENTO", ancho: "30%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "30%" }
		],
		fila: {
			funcionSeleccion: "SeleccionarItemCargaArchivoGeneral",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_2", campo: "url", tecnica: true },
				{ id: "td_datos_4", campo: "tipo_archivo", tecnica: true },
				{ campo: "fecha_carga", columna: "fecha_carga" },
				{ id: "td_datos_1", columna: "mes", valor: function(registro){ return registro.mes_descripcion; } },
				{ id: "td_datos_3", campo: "anho", columna: "anho" },
				{ campo: "tipo_movimiento", columna: "tipo_movimiento" },
				{ campo: "descripcion", columna: "descripcion" }
			]
		}
	});
	listadoAbmCargaArchivoGeneral.iniciar();
	return listadoAbmCargaArchivoGeneral;
}
function verCerrarAbmCargaArchivoGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCargaArchivoGeneral").style.display==""){
		document.getElementById("divMinimizadoCargaArchivoGeneral").style.display="none"
		LimpiarCamposCargaArchivoGeneral()
		limpiarcamposbuscarCargaArchivoGeneral()
	$("div[id=divAbmCargaArchivoGeneral]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERCARGAARCHIVOGENERAL","accion")==false){return;}
		mostrarSoloUno("divAbmCargaArchivoGeneral")	
		document.getElementById("divAbmCargaArchivoGeneral").style.display=""
	}
}

function verCerrarVentanaAbmCargaArchivoGeneral(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODEBANCOS","accion")==false){return;}
			LimpiarCamposCargaArchivoGeneral()
		}
		$("div[id=divAbmCargaArchivoGeneral2]").fadeIn(250)
		document.getElementById('divAbmCargaArchivoGeneral1').style.display = "none"
	} else {
		$("div[id=divAbmCargaArchivoGeneral1]").fadeIn(250)
		document.getElementById('divAbmCargaArchivoGeneral2').style.display = "none"
	}
}

function limpiarcamposbuscarCargaArchivoGeneral(){
	    document.getElementById('inptbuscarMesArchivoCargaArchivoGeneral').value=""
	    document.getElementById('inptbuscarAnhoArchivoCargaArchivoGeneral').value=""
	    document.getElementById('inptbuscarDescripcionTipoMovimiento').value=""
	    document.getElementById('inptbuscarDescripcionCargaArchivoGeneral').value=""
		document.getElementById("table_abm_CargaArchivoGeneral").innerHTML = ""
		document.getElementById("inptTotalRegistoCargaArchivoGeneral").value = "";
		checkfiltroscargaarchivogeneral(2)
}
function minimizarabmCargaArchivoGeneral(){ 
	$("div[id=divAbmCargaArchivoGeneral]").fadeOut(500);	
	document.getElementById("divMinimizadoCargaArchivoGeneral").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmCargaArchivoGeneral"));
}

function verVentanaEditarCargaArchivoGeneral() {
	if (idAbmCargaArchivoGeneral == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	// if(controlacceso("EDITARLISTADODEBANCO","accion")==false){return;}
	verCerrarVentanaAbmCargaArchivoGeneral("1", "2")
}
/* var idAbmCargaArchivoGeneral = ""
function ObtenerdatosAbmCargaArchivoGeneral(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreCargaArchivoGeneral').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccCargaArchivoGeneral').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoCargaArchivoGeneral').value = $(datostr).children('td[id="td_datos_2"]').html();
	
	document.getElementById('btnAbmCargaArchivoGeneral').value = "Editar datos";
	document.getElementById('btnEditarDatosCargaArchivoGeneral').style.backgroundColor="";
	idAbmCargaArchivoGeneral = $(datostr).children('td[id="td_id"]').html();
} */
function verificarcamposCargaArchivoGeneral() {
	var inptNombreCargaArchivoGeneral = document.getElementById('inptNombreCargaArchivoGeneral').value
	var inptEstadoCargaArchivoGeneral = document.getElementById('inptEstadoCargaArchivoGeneral').value
	if (inptNombreCargaArchivoGeneral == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL BANCO")
		return false;
	}
	
	var accion = "";
	if (idAbmCargaArchivoGeneral != "") {
		accion = "editar";
		// if(controlacceso("INSERTARLISTADODEBANCOS","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("EDITARLISTADODEBANCO","accion")==false){return;}
	}
	abmCargaArchivoGeneral(inptNombreCargaArchivoGeneral ,inptEstadoCargaArchivoGeneral , idAbmCargaArchivoGeneral, accion);
}

function checkestadoCargaArchivoGeneral(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarCargaArchivoGeneral1').checked=true
	document.getElementById('inptSeleccEstadoBuscarCargaArchivoGeneral2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarCargaArchivoGeneral1').checked=false
	document.getElementById('inptSeleccEstadoBuscarCargaArchivoGeneral2').checked=true
	}
}
function buscarabmCargaArchivoGeneral() {
	// if(controlacceso("BUSCARLISTADODEBANCOS","accion")==false){return;}
	var listado = obtenerListadoAbmCargaArchivoGeneral();
	let mes = document.getElementById('inptbuscarMesArchivoCargaArchivoGeneral').value;
	let anho = document.getElementById('inptbuscarAnhoArchivoCargaArchivoGeneral').value;
	let tipo_movimiento = document.getElementById('inptbuscarDescripcionTipoMovimiento').value;
	let descripcion = document.getElementById('inptbuscarDescripcionCargaArchivoGeneral').value;
	let fecha1 = document.getElementById('inptBuscarCargaArchivoGeneralF1').value;
	let fecha2 = document.getElementById('inptBuscarCargaArchivoGeneralF2').value;
	document.getElementById("table_abm_CargaArchivoGeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"mes": mes,
		"anho": anho,
		"tipo_movimiento": tipo_movimiento,
		"descripcion": descripcion,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCargaArchivoGeneral.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CargaArchivoGeneral").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CargaArchivoGeneral").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
					document.getElementById("inptTotalRegistoCargaArchivoGeneral").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function checkfiltroscargaarchivogeneral(d){
	if(d=="1"){
	document.getElementById('inptCheckcargaarchivogeneral1').checked=true
	document.getElementById('inptCheckcargaarchivogeneral2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarCargaArchivoGeneralF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarCargaArchivoGeneralF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
		document.getElementById('inptCheckcargaarchivogeneral1').checked=false
		document.getElementById('inptCheckcargaarchivogeneral2').checked=true
		document.getElementById('inptBuscarCargaArchivoGeneralF1').value="";
		document.getElementById('inptBuscarCargaArchivoGeneralF2').value="";
	}
}

/* PARTE DE CARGA DIRECTA */

function ExploradorCargaArchivoGeneral(File){
let tipo_archivo = document.getElementById('inptTipoArchivoCargaArchivoGeneral').value;	
	if(tipo_archivo ==''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL TIPO DE ARCHIVO');
		return;
	}


$("input[id="+File+"]").click();
}
var archivocargaarchivogeneral="";
var extensioncargaarchivogeneral="";	
var urlcargaarchivogeneral="";
function readFileDocCargaArchivoGeneral(input){
	let tipo_archivo = document.getElementById('inptTipoArchivoCargaArchivoGeneral').value;
var file=$("input[name="+input.name+"]")[0].files[0];
urlcargaarchivogeneral = URL.createObjectURL(file);
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();

if ((file_extension.toLowerCase() != tipo_archivo)){
ver_vetana_informativa("EL TIPO DE ARCHIVO ELEGIDO AL SUBIDO ES DIFERENTE")
return;
}
var readerPrincipal = new FileReader();
readerPrincipal.onload = function(e){
	extensioncargaarchivogeneral = file_extension;
	archivocargaarchivogeneral = e.target.result;
	document.getElementById("text-carga-2-archivoscargaarchivogeneral").style.display=""
	document.getElementById("text-carga-archivoscargaarchivogeneral").style.display="none"
	
	
	// document.getElementById("btnAddCargaArchivoGeneral").style.backgroundColor = "";
	// document.getElementById("btnEliminarCargaArchivoGeneral").style.backgroundColor = "#d5d3d3";
	// document.getElementById("btnVerCargaArchivoGeneral").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroCargaArchivoGeneral]").each(function(i, td){
	td.className=''
});
	
elementoarchivoseleccionadocargaarchivogeneral="";
document.getElementById("file_CargaArchivoGeneral").value="";
}
readerPrincipal.readAsDataURL(input.files[0]);
}

function verificarCargaArchivoGeneral(){

	if(archivocargaarchivogeneral ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
	let mes = document.getElementById('inptMesArchivoCargaArchivoGeneral').value
	let anho = document.getElementById('inptAnhoArchivoCargaArchivoGeneral').value
	let cod_tipoMovimiento = document.getElementById('inptDescripcionTipoMovimiento').value
	let cod_descripcion = document.getElementById('inptDescripcionCargaArchivoGeneral').value
	let tipo = document.getElementById('inptTipoArchivoCargaArchivoGeneral').value
	
	if ((file_extension.toLowerCase() != tipo)){
		ver_vetana_informativa("EL TIPO DE ARCHIVO ELEGIDO AL SUBIDO ES DIFERENTE")
		return;
	}
	
	if(mes == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR EL MES")
		return;
	}
	
	if(anho == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR EL AÑO")
		return;
	}
	
	if(cod_tipoMovimiento == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR EL TIPO DE MOVIMIENTO")
		return;
	}
	
	if(cod_descripcion == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR LA DESCRIPCIÓN")
		return;
	}

	var accion = "insertarArchivo";
	AbmCargaArchivoGeneral(accion,mes,anho,cod_tipoMovimiento,cod_descripcion,tipo);
}
var elementoarchivoseleccionadocargaarchivogeneral="";
function SeleccionarItemCargaArchivoGeneral(datostr) {
	elementoarchivoseleccionadocargaarchivogeneral = datostr
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarCargaArchivoGeneral").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerCargaArchivoGeneral").style.backgroundColor = "#2196F3";
	

	// document.getElementById("btnAddCargaArchivoGeneral").style.backgroundColor = "#d5d3d3";
	archivoexcelpedidosproveedor = "";
	extensionexcelpedidosproveedor = "";
}
function LimpiarCamposCargaArchivoGeneral(){
	// document.getElementById("btnAddCargaArchivoGeneral").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarCargaArchivoGeneral").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerCargaArchivoGeneral").style.backgroundColor="#d5d3d3";
	document.getElementById("inptTipoArchivoCargaArchivoGeneral").value = ""
	document.getElementById("inptMesArchivoCargaArchivoGeneral").value = ""
	document.getElementById("inptAnhoArchivoCargaArchivoGeneral").value = ""
	document.getElementById("inptDescripcionTipoMovimiento").value = ""
	document.getElementById("inptDescripcionCargaArchivoGeneral").value = ""
	document.getElementById("text-carga-archivoscargaarchivogeneral").style.display=""
	document.getElementById("text-carga-2-archivoscargaarchivogeneral").style.display="none"
	elementoarchivoseleccionadocargaarchivogeneral =""
	archivocargaarchivogeneral="";
	extensioncargaarchivogeneral = "";
	urlcargaarchivogeneral="";
}
function AbmCargaArchivoGeneral(accion,mes,anho,cod_descripcion_tipo_movimientoFK,cod_descripcion_carga_archivo,tipo){
	var datos = new FormData();
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("mes", mes)
	datos.append("anho", anho)
	datos.append("tipo", tipo)
	datos.append("cod_descripcion_tipo_movimientoFK", cod_descripcion_tipo_movimientoFK)
	datos.append("cod_descripcion_carga_archivo", cod_descripcion_carga_archivo)
	datos.append("archivo", archivocargaarchivogeneral)
	datos.append("ext", extensioncargaarchivogeneral)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCargaArchivoGeneral.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			return false;
		},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					ver_vetana_informativa("SE HA CARGADO CORRECTAMENTE");
					LimpiarCamposCargaArchivoGeneral()
					// buscarCargaArchivoGeneral()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function VerCargaArchivoGeneral(){
	
	if(elementoarchivoseleccionadocargaarchivogeneral == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
		
	window.open(`${$(elementoarchivoseleccionadocargaarchivogeneral).children('td[id="td_datos_2"]').html()}`, '_blank');
	
	document.getElementById("abrirExcel").addEventListener("click", () => {
    fetch(`http://localhost/${$(elementoarchivoseleccionadocargaarchivogeneral).children('td[id="td_datos_2"]').html()}`) // URL de tu servidor
        .then(response => response.blob())
        .then(blob => {
            // Crear un enlace temporal
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `archivoelectroguai_${obtenerFechaActual()}.${$(elementoarchivoseleccionadocargaarchivogeneral).children('td[id="td_datos_4"]').html()}`; // si quieres que lo descargue
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => console.error("Error al abrir Excel:", err));
});
	

}
function EliminarCargaArchivoGeneral(){
	
	// if(controlacceso("ELIMINAREXCELPEDIDOSPROVEEDOR","accion")==false){return;}
	
	if(!confirm("Realmente desea eliminar el archivo?")){
		return;
	}
	
	obtener_datos_user();
	
	var urldocumento = $(elementoarchivoseleccionadocargaarchivogeneral).children('td[id="td_datos_2"]').html()
	var idarchivo = $(elementoarchivoseleccionadocargaarchivogeneral).children('td[id="td_id"]').html()
	
	// let pos=urldocumento.indexOf("/");
	// urldocumento = urldocumento.slice(pos+1)
	// pos= urldocumento.indexOf("/")
	// urldocumento = urldocumento.slice(pos)
	
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idarchivo": idarchivo,
		"urldocumento": urldocumento,
		"funt": "eliminardocumentoCargaArchivoGeneral"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMCargaArchivoGeneral.php",
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
					buscarabmCargaArchivoGeneral()
					ver_vetana_informativa("SE HA ELIMINADO CORRECTAMENTE")
					
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
ABM DESCRIPCION TIPO MOVIMIENTO
*/
var idAbmDescripcionTipoMovimiento="";
var ElementoSeleccDescripcionTipoMovimiento="";
var listadoAbmDescripcionTipoMovimiento=null;
function obtenerListadoAbmDescripcionTipoMovimiento(){
	if(listadoAbmDescripcionTipoMovimiento){return listadoAbmDescripcionTipoMovimiento;}
	if(typeof AbmListadoCore==="undefined"){return null;}
	var cuerpo=document.getElementById("divBuscadorDescripcionTipoMovimiento");
	if(!cuerpo || !cuerpo.parentNode){return null;}
	var tablas=cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera=tablas.length ? tablas[0].querySelector("tr") : null;
	if(!cabecera){return null;}
	cabecera.id="cabeceraAbmDescripcionTipoMovimiento";
	listadoAbmDescripcionTipoMovimiento=AbmListadoCore.crear({
		nombre:"descripcion_tipo_movimiento",
		idCabecera:"cabeceraAbmDescripcionTipoMovimiento",
		idCuerpo:"divBuscadorDescripcionTipoMovimiento",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{
			funcionSeleccion:"ObtenerdatosAbmDescripcionTipoMovimiento",
			celdas:[
				{id:"td_id",campo:"codigo",tecnica:true},
				{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
				{id:"td_datos_2",campo:"estado",tecnica:true}
			]
		}
	});
	listadoAbmDescripcionTipoMovimiento.iniciar();
	return listadoAbmDescripcionTipoMovimiento;
}
function verCerrarFrmDescripcionTipoMovimiento(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
		$("div[id=divAbmDescripcionTipoMovimiento]").fadeIn(500);
		// BuscarAbmDescripcionArregloGastoEgresoIngresoAdministrativo()
	}else{
		$("div[id=divAbmDescripcionTipoMovimiento]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionTipoMovimiento(){
	document.getElementById("inptNombreDescripcionTipoMovimiento").value="";
	document.getElementById("inptEstadoDescripcionTipoMovimiento").value="";
	document.getElementById("btnDescripcionTipoMovimiento1").value="Guardar Datos"
	idAbmDescripcionTipoMovimiento="";
	ElementoSeleccDescripcionTipoMovimiento="";
}
function ObtenerdatosAbmDescripcionTipoMovimiento(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionTipoMovimiento=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionTipoMovimiento").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionTipoMovimiento").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionTipoMovimiento = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionTipoMovimiento1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionTipoMovimiento(){
	if(ElementoSeleccDescripcionTipoMovimiento==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionTipoMovimiento").style.display="none";
	 document.getElementById("inptArregloEgresoIngresoAdministrativo").value = $(ElementoSeleccDescripcionTipoMovimiento).children('td[id="td_datos_1"]').html();
	 LimpiarCamposDescripcionTipoMovimiento()
}
function VerificarDatosDescripcionTipoMovimiento(){
	var inptNombreDescripcionTipoMovimiento = document.getElementById("inptNombreDescripcionTipoMovimiento").value
	var inptEstadoDescripcionTipoMovimiento = document.getElementById("inptEstadoDescripcionTipoMovimiento").value	
	if(inptNombreDescripcionTipoMovimiento==""){
		document.getElementById("inptNombreDescripcionTipoMovimiento").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionTipoMovimiento==""){
		document.getElementById("inptEstadoDescripcionTipoMovimiento").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionTipoMovimiento != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionTipoMovimiento(inptNombreDescripcionTipoMovimiento,inptEstadoDescripcionTipoMovimiento,idAbmDescripcionTipoMovimiento,accion)
}
function AbmDescripcionTipoMovimiento(descripcion,Estado,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("estado", Estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionTipoMovimiento.php",
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
				LimpiarCamposDescripcionTipoMovimiento()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionTipoMovimiento()
				BuscarSelecDescripcionTipoMovimiento()
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
function BuscarAbmDescripcionTipoMovimiento() {
	var listado=obtenerListadoAbmDescripcionTipoMovimiento();
	var buscador = document.getElementById("inptBuscarAbmDescripcionTipoMovimiento").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionTipoMovimiento").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionTipoMovimiento").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionTipoMovimiento").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionTipoMovimiento.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionTipoMovimiento").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionTipoMovimiento").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionTipoMovimiento").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionTipoMovimiento").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
                   document.getElementById("lblNroRegistroDescripcionTipoMovimiento").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionTipoMovimiento() {
	document.getElementById("inptDescripcionTipoMovimiento").innerHTML = ""
	document.getElementById("inptbuscarDescripcionTipoMovimiento").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionTipoMovimiento.php",
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
					document.getElementById("inptDescripcionTipoMovimiento").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					document.getElementById("inptbuscarDescripcionTipoMovimiento").innerHTML = "<option value=''>TODOS</option>"+datos_buscados
				
					
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
ABM DESCRIPCION CARGA ARCHIVO GENERAL
*/
var idAbmDescripcionCargaArchivoGeneral="";
var ElementoSeleccDescripcionCargaArchivoGeneral="";
var listadoAbmDescripcionCargaArchivoGeneral=null;
function obtenerListadoAbmDescripcionCargaArchivoGeneral(){
	if(listadoAbmDescripcionCargaArchivoGeneral){return listadoAbmDescripcionCargaArchivoGeneral;}
	if(typeof AbmListadoCore==="undefined"){return null;}
	var cuerpo=document.getElementById("divBuscadorDescripcionCargaArchivoGeneral");
	if(!cuerpo || !cuerpo.parentNode){return null;}
	var tablas=cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera=tablas.length ? tablas[0].querySelector("tr") : null;
	if(!cabecera){return null;}
	cabecera.id="cabeceraAbmDescripcionCargaArchivoGeneral";
	listadoAbmDescripcionCargaArchivoGeneral=AbmListadoCore.crear({
		nombre:"descripcion_carga_archivo_general",
		idCabecera:"cabeceraAbmDescripcionCargaArchivoGeneral",
		idCuerpo:"divBuscadorDescripcionCargaArchivoGeneral",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{
			funcionSeleccion:"ObtenerdatosAbmDescripcionCargaArchivoGeneral",
			celdas:[
				{id:"td_id",campo:"codigo",tecnica:true},
				{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
				{id:"td_datos_2",campo:"estado",tecnica:true}
			]
		}
	});
	listadoAbmDescripcionCargaArchivoGeneral.iniciar();
	return listadoAbmDescripcionCargaArchivoGeneral;
}
function verCerrarFrmDescripcionCargaArchivoGeneral(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVADESCRIPCIONARREGLOEGRESOINGRESOADMINISTRATIVO","accion")==false){return;}	
		$("div[id=divAbmDescripcionCargaArchivoGeneral]").fadeIn(500);
		// BuscarAbmDescripcionArregloGastoEgresoIngresoAdministrativo()
	}else{
		$("div[id=divAbmDescripcionCargaArchivoGeneral]").fadeOut(500);
	}
}
function LimpiarCamposDescripcionCargaArchivoGeneral(){
	document.getElementById("inptNombreDescripcionCargaArchivoGeneral").value="";
	document.getElementById("inptEstadoDescripcionCargaArchivoGeneral").value="";
	document.getElementById("btnDescripcionCargaArchivoGeneral1").value="Guardar Datos"
	idAbmDescripcionCargaArchivoGeneral="";
	ElementoSeleccDescripcionCargaArchivoGeneral="";
}
function ObtenerdatosAbmDescripcionCargaArchivoGeneral(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccDescripcionCargaArchivoGeneral=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreDescripcionCargaArchivoGeneral").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoDescripcionCargaArchivoGeneral").value = $(datostr).children('td[id="td_datos_2"]').html();
	

	
	idAbmDescripcionCargaArchivoGeneral = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnDescripcionCargaArchivoGeneral1").value="Editar Datos"
}
function SeleccionarRegistroDescripcionCargaArchivoGeneral(){
	if(ElementoSeleccDescripcionCargaArchivoGeneral==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmDescripcionCargaArchivoGeneral").style.display="none";
	 document.getElementById("inptArregloEgresoIngresoAdministrativo").value = $(ElementoSeleccDescripcionCargaArchivoGeneral).children('td[id="td_datos_1"]').html();
	 LimpiarCamposDescripcionCargaArchivoGeneral()
}
function VerificarDatosDescripcionCargaArchivoGeneral(){
	var inptNombreDescripcionCargaArchivoGeneral = document.getElementById("inptNombreDescripcionCargaArchivoGeneral").value
	var inptEstadoDescripcionCargaArchivoGeneral = document.getElementById("inptEstadoDescripcionCargaArchivoGeneral").value	
	if(inptNombreDescripcionCargaArchivoGeneral==""){
		document.getElementById("inptNombreDescripcionCargaArchivoGeneral").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoDescripcionCargaArchivoGeneral==""){
		document.getElementById("inptEstadoDescripcionCargaArchivoGeneral").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmDescripcionCargaArchivoGeneral != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmDescripcionCargaArchivoGeneral(inptNombreDescripcionCargaArchivoGeneral,inptEstadoDescripcionCargaArchivoGeneral,idAbmDescripcionCargaArchivoGeneral,accion)
}
function AbmDescripcionCargaArchivoGeneral(descripcion,Estado,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("estado", Estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionCargaArchivoGeneral.php",
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
				LimpiarCamposDescripcionCargaArchivoGeneral()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmDescripcionCargaArchivoGeneral()
				BuscarSelecDescripcionCargaArchivoGeneral()
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
function BuscarAbmDescripcionCargaArchivoGeneral() {
	var listado=obtenerListadoAbmDescripcionCargaArchivoGeneral();
	var buscador = document.getElementById("inptBuscarAbmDescripcionCargaArchivoGeneral").value
	var estado = document.getElementById("inptBuscarEstadoDescripcionCargaArchivoGeneral").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorDescripcionCargaArchivoGeneral").innerHTML = paginacargando
    document.getElementById("lblNroRegistroDescripcionCargaArchivoGeneral").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionCargaArchivoGeneral.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorDescripcionCargaArchivoGeneral").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionCargaArchivoGeneral").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorDescripcionCargaArchivoGeneral").innerHTML = ''
			document.getElementById("lblNroRegistroDescripcionCargaArchivoGeneral").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
                   document.getElementById("lblNroRegistroDescripcionCargaArchivoGeneral").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecDescripcionCargaArchivoGeneral() {
	document.getElementById("inptDescripcionCargaArchivoGeneral").innerHTML = ""
	document.getElementById("inptbuscarDescripcionCargaArchivoGeneral").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmDescripcionCargaArchivoGeneral.php",
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
					document.getElementById("inptDescripcionCargaArchivoGeneral").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
				document.getElementById("inptbuscarDescripcionCargaArchivoGeneral").innerHTML ="<option value=''>TODOS</option>"+ datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/* BUSCAR RESUMEN COBRADOR */
function verCerrarAbmResumenCobrador() {
	if(controlacceso("VERRESUMENCOBRADOR","accion")==false){return;}	
	document.getElementById('inptBuscarResumenCobradorFecha').value = obtenerFechaActual();
	if (document.getElementById("divAbmResumenCobrador").style.display=="") {	
		$("div[id=divAbmResumenCobrador]").fadeOut(500)
		document.getElementById("divMinimizadoListadoResumenCobrador").style.display="none"
		limpiarventanaResumenCobrador()
	} else {
		mostrarSoloUno("divAbmResumenCobrador")	
		document.getElementById("divAbmResumenCobrador").style.display=""
	}
}

function minimizarResumenCobrador(){ 
	$("div[id=divAbmResumenCobrador]").fadeOut(500);
	document.getElementById("divMinimizadoListadoResumenCobrador").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuResumenCobrador"));
}

function limpiarContenedorResumenCobrador(idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return null;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	return contenedor;
}

function urlImagenResumenCobradorSegura(valor) {
	var url = valor == null ? "" : String(valor);
	return encodeURI(url).replace(/["'()]/g, function (caracter) {
		return encodeURIComponent(caracter);
	});
}

function renderResumenCobrador(filas) {
	var contenedor = limpiarContenedorResumenCobrador("table_abm_ResumenCobrador");
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tarjeta = document.createElement("div");
		tarjeta.className = "sales";
		tarjeta.id = registro.cod_cobrador == null ? "" : String(registro.cod_cobrador);
		tarjeta.onclick = function () { obtenerdatosvistaventaResumenCobradores(tarjeta); };

		var titulo = document.createElement("h3");
		titulo.textContent = registro.cobrador == null ? "" : String(registro.cobrador);
		tarjeta.appendChild(titulo);

		var estado = document.createElement("div");
		estado.className = "status";
		var marcoFoto = document.createElement("div");
		marcoFoto.style.width = "140px";
		var foto = document.createElement("div");
		foto.className = "imgFotoCi";
		foto.style.width = "140px";
		foto.style.backgroundImage = 'url("' + urlImagenResumenCobradorSegura(registro.url_img) + '")';
		marcoFoto.appendChild(foto);
		estado.appendChild(marcoFoto);

		var resumen = document.createElement("div");
		resumen.style.display = "flex";
		resumen.style.alignItems = "center";
		resumen.style.justifyContent = "center";
		resumen.style.flexDirection = "column";
		resumen.style.gap = "5px";
		var info = document.createElement("div");
		info.className = "info";
		var total = document.createElement("h1");
		total.textContent = (registro.total_formateado == null ? "" : String(registro.total_formateado)) + " Gs.";
		info.appendChild(total);
		resumen.appendChild(info);

		var progreso = document.createElement("div");
		progreso.className = "progresss";
		progreso.style.display = "flex";
		progreso.style.justifyContent = "center";
		progreso.style.color = "white";
		progreso.style.backgroundColor = "#374654fa";
		progreso.style.alignItems = "center";
		progreso.style.flexDirection = "column";
		progreso.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 30px 90px";
		var cantidad = document.createElement("h2");
		var cantidadNegrita = document.createElement("b");
		cantidadNegrita.textContent = registro.cantidad_clientes == null ? "" : String(registro.cantidad_clientes);
		cantidad.appendChild(cantidadNegrita);
		var etiqueta = document.createElement("h3");
		etiqueta.textContent = "Clientes";
		progreso.appendChild(cantidad);
		progreso.appendChild(etiqueta);
		resumen.appendChild(progreso);
		estado.appendChild(resumen);
		tarjeta.appendChild(estado);
		fragmento.appendChild(tarjeta);
	});
	contenedor.appendChild(fragmento);
}

function renderDetalleResumenCobrador(filas) {
	var contenedor = limpiarContenedorResumenCobrador("table_abm_DetalleResumenCobrador");
	if (!contenedor || !Array.isArray(filas)) return;
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		[
			[registro.cantidad_clientes, "30%"],
			[registro.total_pagado_formateado, "30%"],
			[registro.mora, "30%"]
		].forEach(function (dato) {
			var celda = document.createElement("td");
			celda.style.width = dato[1];
			celda.textContent = dato[0] == null ? "" : String(dato[0]);
			fila.appendChild(celda);
		});
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function buscarResumenCobrador() {
	 
	var fecha = document.getElementById('inptBuscarResumenCobradorFecha').value
	var cobrador = document.getElementById('inptBuscarAbmCobradorResumenCobrador').value
	var local = document.getElementById('inptBuscarAbmLocalResumenCobrador').value
	var tipo = document.getElementById('inptBuscarAbmTipoResumenCobrador').value
	var tipoPago = document.getElementById('inptBuscarAbmTipoPagoResumenCobrador').value
	var tipoCuota = document.getElementById('inptBuscarAbmTipoCuotaResumenCobrador').value
	var control_pago_asignado = document.getElementById('inptBuscarResumenCobradorPagoAsignado').value
	var metodo = document.getElementById('inptBuscarResumenCobradorPagoMetodo').value
	
	var fecha1 = document.getElementById('inptBuscarResumenCobradorF1').value;
	var fecha2 = document.getElementById('inptBuscarResumenCobradorF2').value;
	 
	
	document.getElementById("table_abm_ResumenCobrador").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoResumenCobrador").value = ''
	 document.getElementById("inptTotalCobroResumenCobrador").value = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"cobrador": cobrador,
		"local": local,
		"tipo": tipo,
		"tipoPago": tipoPago,
		"tipoCuota": tipoCuota,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"control": control_pago_asignado,
		"metodo": metodo,
		"funt": "buscarResumenCobrador",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_ResumenCobrador").innerHTML = ''
			document.getElementById("inptTotalRegistoResumenCobrador").value = ''
					document.getElementById("inptTotalCobroResumenCobrador").value = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_ResumenCobrador").innerHTML = ''
			document.getElementById("inptTotalRegistoResumenCobrador").value = ''
					document.getElementById("inptTotalCobroResumenCobrador").value = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderResumenCobrador(datos_buscados);
					} else {
						document.getElementById("table_abm_ResumenCobrador").innerHTML = datos_buscados
					}
					document.getElementById("inptTotalRegistoResumenCobrador").value = datos[3];
					document.getElementById("inptTotalCobroResumenCobrador").value = datos[4];
				
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

let codCobradorResumen = '';
function obtenerdatosvistaventaResumenCobradores(datos) {
	verCerrarVentanaAbmResumenCobrador(1)
	codCobradorResumen = datos.id;
	buscarDetalleResumenCobrador()
}

function limpiarventanaResumenCobrador(){
	document.getElementById('inptBuscarAbmCobradorResumenCobrador').value = '';
	document.getElementById('inptBuscarAbmCobradorResumenCobrador').value = '';
	document.getElementById('inptBuscarAbmLocalResumenCobrador').value = '';
	document.getElementById('inptBuscarAbmTipoPagoResumenCobrador').value = '';
	document.getElementById('inptBuscarAbmTipoCuotaResumenCobrador').value = 'Cuota';
	document.getElementById('inptBuscarAbmTipoResumenCobrador').value = 'CREDITO';
	document.getElementById('inptTotalRegistoResumenCobrador').value = '';
	document.getElementById('inptTotalCobroResumenCobrador').value = '';
	document.getElementById('inptBuscarResumenCobradorPagoAsignado').value = '1';
	document.getElementById('inptBuscarResumenCobradorPagoMetodo').value = '';
	
	document.getElementById('table_abm_ResumenCobrador').innerHTML =''
}

function verCerrarVentanaAbmResumenCobrador(d) {
	if (d == "1") {
		$("div[id=divAbmResumenCobrador2]").fadeIn(250)
		document.getElementById('divAbmResumenCobrador1').style.display = "none"
	} else {
		$("div[id=divAbmResumenCobrador1]").fadeIn(250)
		document.getElementById('divAbmResumenCobrador2').style.display = "none"
	}
}

function buscarDetalleResumenCobrador() {
	var fecha = document.getElementById('inptBuscarResumenCobradorFecha').value
	var fecha1 = document.getElementById('inptBuscarResumenCobradorF1').value
	var fecha2 = document.getElementById('inptBuscarResumenCobradorF2').value
	var local = document.getElementById('inptBuscarAbmLocalResumenCobrador').value
	var tipo = document.getElementById('inptBuscarAbmTipoResumenCobrador').value
	var tipoPago = document.getElementById('inptBuscarAbmTipoPagoResumenCobrador').value
	var tipoCuota = document.getElementById('inptBuscarAbmTipoCuotaResumenCobrador').value
	var control_pago_asignado = document.getElementById('inptBuscarResumenCobradorPagoAsignado').value
	var metodo = document.getElementById('inptBuscarResumenCobradorPagoMetodo').value
	
	
document.getElementById('inptTotalCobroDetalleResumenCobrador').value = '';
	obtener_datos_user();
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"control": control_pago_asignado,
		"metodo": metodo,
		"local": local,
		"tipo": tipo,
		"tipoPago": tipoPago,
		"tipoCuota": tipoCuota,
		"cod_cobradorFK": codCobradorResumen,
		"funt": "buscarDetalleResumenCobrador",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById('table_abm_DetalleResumenCobrador').innerHTML = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById('table_abm_DetalleResumenCobrador').innerHTML = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) {
						renderDetalleResumenCobrador(datos_buscados);
					} else {
						document.getElementById('table_abm_DetalleResumenCobrador').innerHTML = datos_buscados;
					}
					
		document.getElementById('inptTotalCobroDetalleResumenCobrador').value = datos[3];
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/* INFORME GENERAL DE EGRESOS LOCAL */
function verCerrarInformeEgresosLocalGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeEgresosLocalGeneral").style.display==""){
		limpiarventanainformeegresoslocalgeneral()
		
		$("div[id=divInformeEgresosLocalGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeEgresosLocalGeneral").style.display=""
	}
}
function buscarinformeEgresosLocalGeneral() {
	var anho = document.getElementById("inptBuscarInformeGeneralEgresosLocalFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralEgresosLocalLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	if(controlventanainformeegresoslocalnageneral=="2"){
		buscarinformeEgresosLocalGeneralIncremental()
		return;
	}
	
	if(controlventanainformeegresoslocalnageneral=="3"){
		buscarinformeEgresosLocalGeneralGrafica()
		return;
	}
	
	
	
	document.getElementById("table_informe_egresosgeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"array_cod_seleccionar_busqueda_egresos_total_local": JSON.stringify(array_cod_seleccionar_busqueda_egresos_total_local),
		"funt": "buscar_total_egresos_local_general",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_egresosgeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_egresosgeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) {
						renderInformeMatrizMensual(pagina, "table_informe_egresosgeneral");
					} else {
						document.getElementById("table_informe_egresosgeneral").innerHTML = pagina;
					}
					agregarFilaTotalesEgresosLocalGeneral();
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function agregarFilaTotalesEgresosLocalGeneral() {
    const contenedor = document.getElementById('table_informe_egresosgeneral');
    const totales = sumarColumnasEgresosLocalGeneral();

    const tablaTotal = document.createElement('table');
    tablaTotal.className = 'tableRegistroSearch'; // misma clase
    tablaTotal.border = 1;
    tablaTotal.cellSpacing = 1;
    tablaTotal.cellPadding = 5;

    const tr = document.createElement('tr');
    tr.style.fontWeight = 'bold';
    tr.style.background = '#e9ecef';

    totales.forEach((total, index) => {
        const td = document.createElement('td');
        td.style.width = '5%';

        if (index === 0) {
            td.innerText = 'TOTAL';
        } else {
            td.innerText = total.toLocaleString('es-ES');
        }

        tr.appendChild(td);
    });

    tablaTotal.appendChild(tr);
    contenedor.appendChild(tablaTotal);
}
function sumarColumnasEgresosLocalGeneral() {
    const contenedor = document.getElementById('table_informe_egresosgeneral');
    const tablas = contenedor.querySelectorAll('table');
    
    let totales = [];

    tablas.forEach(tabla => {
        const celdas = tabla.querySelectorAll('td');

        celdas.forEach((td, index) => {
            const valor = textoANumero(td.innerText.trim());
            totales[index] = (totales[index] || 0) + valor;
        });
    });

    return totales;
}

function buscarinformeEgresosLocalGeneralIncremental() {
	var anho = document.getElementById("inptBuscarInformeGeneralEgresosLocalFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralEgresosLocalLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_egresosgeneral_incremental").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"array_cod_seleccionar_busqueda_egresos_total_local": JSON.stringify(array_cod_seleccionar_busqueda_egresos_total_local),
		"funt": "buscar_total_egresos_local_general_incremental",
		"formato": "json"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_egresosgeneral_incremental").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_egresosgeneral_incremental").innerHTML = paginacargando;	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) {
						renderInformeMatrizMensual(pagina, "table_informe_egresosgeneral_incremental");
					} else {
						document.getElementById("table_informe_egresosgeneral_incremental").innerHTML = pagina;
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

function buscarinformeEgresosLocalGeneralGrafica() {
	var anho = document.getElementById("inptBuscarInformeGeneralEgresosLocalFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralEgresosLocalLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"array_cod_seleccionar_busqueda_egresos_total_local": JSON.stringify(array_cod_seleccionar_busqueda_egresos_total_local),
		"funt": "buscar_total_egresos_local_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
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
					
					
					if(obj_chart_egresos_local){
						obj_chart_egresos_local.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
					let data = {
					labels: labels,
					datasets: [{
						label: datos[5],
						data: datos[3],
						backgroundColor: 'rgba(54, 162, 235, 0.7)', // Color azul de las barras
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						barThickness: 10,
						},
						{
						label:  datos[6],
						data: datos[4],
						backgroundColor: 'rgba(201, 203, 207, 0.7)', // Color gris de las barras
						borderColor: 'rgba(201, 203, 207, 1)',
						borderWidth: 1,
						barThickness: 10,
						}],
					};

					generar_graficos_total_egresos_local(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

let obj_chart_egresos_local = '';
function generar_graficos_total_egresos_local(data){
	const graph = document.querySelector("#graph_informe_egresos_local_general");


	const config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true, // Desactivar el ajuste automático
			maintainAspectRatio: false, // Permitir cambiar la relación de aspecto
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	};

	obj_chart_egresos_local = new Chart(graph, config);
}

function limpiarventanainformeegresoslocalgeneral(){ 
	document.getElementById("table_informe_egresosgeneral").innerHTML=""
	document.getElementById("table_informe_egresosgeneral_incremental").innerHTML=""
	document.getElementById("table_informe_egresosgeneral_grafica").innerHTML=""
	
	if(obj_chart_egresos_local){
		obj_chart_egresos_local.destroy()
	}
	
	document.getElementById('inptBuscarInformeGeneralEgresosLocalFecha').value = ''
	document.getElementById('inptBuscarInformeGeneralEgresosLocalLocal').value = ''
	// document.getElementById('inptBuscarInformeGeneralEgresosLocalTipo').value = ''
	
	// verCerrarInformeEgresosLocalnasEgresosLocalGeneral(4)
	
	document.getElementById("btnInformeEgresosLocalGeneral1").style='background-color:#ff9800;color:#fff'
	document.getElementById("btnInformeEgresosLocalGeneral2").style=''
	document.getElementById("btnInformeEgresosLocalGeneral3").style=''
	document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral1").style.display=''
	document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral2").style.display='none'
	document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral3").style.display='none'
	array_cod_seleccionar_busqueda_egresos_total_local = []
	BuscarAbmSeleccionarBusquedaEgresosTotalLocal()
}


let controlventanainformeegresoslocalnageneral = '';
function verCerrarInformeEgresosLocalnasEgresosLocalGeneral(d){
	
	document.getElementById("btnInformeEgresosLocalGeneral1").style=''
	document.getElementById("btnInformeEgresosLocalGeneral2").style=''
	document.getElementById("btnInformeEgresosLocalGeneral3").style=''
	
	document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral1").style.display='none'
	document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral2").style.display='none'
	document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral3").style.display='none'

	// var selectAnho = document.getElementById('inptBuscarInformeGeneralEgresosLocalFecha').value;
	controlventanainformeegresoslocalnageneral = d;
	
	
	if(d=="1"){
		buscarinformeEgresosLocalGeneral()
		document.getElementById("btnInformeEgresosLocalGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral1").style.display=''
	}
	if(d=="2"){
		buscarinformeEgresosLocalGeneralIncremental()
		document.getElementById("btnInformeEgresosLocalGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral2").style.display=''
	}
	
	if(d=="3"){
		
		buscarinformeEgresosLocalGeneralGrafica()
		document.getElementById("btnInformeEgresosLocalGeneral3").style='background-color:#ff9800;color:#fff'
		document.getElementById("divEgresosLocalnaInformeEgresosLocalGeneral3").style.display=''
	}
	
}


/*
BUSCAR CHECKEAR EGRESOS TOTAL LOCAL
*/
function verCerrarFrmSeleccionarBusquedaEgresosTotalLocal(d){
	
	if(d=="1"){
		document.getElementById("divAbmSeleccionarBusquedaEgresosTotalLocal").style.display ="";
	}else{
		$("div[id=divAbmSeleccionarBusquedaEgresosTotalLocal]").fadeOut(500);
	}
}
var array_cod_seleccionar_busqueda_egresos_total_local = [];

function renderSeleccionBusquedaEgresosTotalLocal(filas) {
	var contenedor = document.getElementById("divBuscadorSeleccionarBusquedaEgresosTotalLocal");
	if (!contenedor || !Array.isArray(filas)) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	var fragmento = document.createDocumentFragment();
	filas.forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var cuerpo = document.createElement("tbody");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		var descripcion = document.createElement("td");
		descripcion.style.width = "50%";
		descripcion.textContent = registro.descripcion == null ? "" : String(registro.descripcion);
		var celdaCheck = document.createElement("td");
		celdaCheck.style.width = "50%";
		var check = document.createElement("input");
		check.type = "checkbox";
		check.id = registro.id == null ? "" : String(registro.id);
		check.checked = array_cod_seleccionar_busqueda_egresos_total_local.indexOf(check.id) !== -1;
		check.onclick = function () { obteneridtipobusquedacuentasacobrar(check); };
		celdaCheck.appendChild(check);
		fila.appendChild(descripcion);
		fila.appendChild(celdaCheck);
		cuerpo.appendChild(fila);
		tabla.appendChild(cuerpo);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function BuscarAbmSeleccionarBusquedaEgresosTotalLocal() {
	document.getElementById("divBuscadorSeleccionarBusquedaEgresosTotalLocal").innerHTML = paginacargando
    document.getElementById("lblNroRegistroSeleccionarBusquedaEgresosTotalLocal").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarSeleccionarBusquedaEgresosTotalLocal",
		"formato": "json"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmgasto.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorSeleccionarBusquedaEgresosTotalLocal").innerHTML = ''
			document.getElementById("lblNroRegistroSeleccionarBusquedaEgresosTotalLocal").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorSeleccionarBusquedaEgresosTotalLocal").innerHTML = ''
			document.getElementById("lblNroRegistroSeleccionarBusquedaEgresosTotalLocal").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				if (Array.isArray(datos_buscados)) {
					renderSeleccionBusquedaEgresosTotalLocal(datos_buscados);
				} else {
					document.getElementById("divBuscadorSeleccionarBusquedaEgresosTotalLocal").innerHTML = datos_buscados;
				}
				document.getElementById("lblNroRegistroSeleccionarBusquedaEgresosTotalLocal").innerHTML="Se encontraron "+datos[3]+" registro(s)";

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function obteneridtipobusquedacuentasacobrar(datos){
	var id = datos.id;
	let index = array_cod_seleccionar_busqueda_egresos_total_local.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_seleccionar_busqueda_egresos_total_local.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_seleccionar_busqueda_egresos_total_local.push(id);
    }
}

function crearElementoTablaCalificacion(etiqueta, atributos, texto) {
	var elemento = document.createElement(etiqueta);
	Object.keys(atributos || {}).forEach(function (nombre) {
		var valor = atributos[nombre];
		if (valor == null || valor === false) return;
		if (nombre === "className") elemento.className = String(valor);
		else if (nombre === "style" && typeof valor === "object") {
			Object.keys(valor).forEach(function (propiedad) {
				elemento.style[propiedad] = valor[propiedad];
			});
		} else elemento.setAttribute(nombre, String(valor));
	});
	if (texto != null) elemento.textContent = String(texto);
	return elemento;
}

function vaciarTablaCalificacion(idContenedor) {
	var contenedor = document.getElementById(idContenedor);
	if (!contenedor) return null;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	return contenedor;
}

function crearTablaFilaCalificacion(claseTabla, celdas, funcionSeleccion) {
	var tabla = crearElementoTablaCalificacion("table", {
		className: claseTabla,
		border: "1",
		cellspacing: "1",
		cellpadding: "5"
	});
	var fila = crearElementoTablaCalificacion("tr", { id: "tbSelecRegistro" });
	(celdas || []).forEach(function (configuracion) {
		var estilos = {};
		if (configuracion.ancho) estilos.width = configuracion.ancho;
		if (configuracion.centro) estilos.textAlign = "center";
		if (configuracion.oculta) estilos.display = "none";
		var celda = crearElementoTablaCalificacion("td", {
			id: configuracion.id,
			className: configuracion.className || "",
			style: estilos
		}, configuracion.valor);
		fila.appendChild(celda);
	});
	if (typeof funcionSeleccion === "function") {
		fila.addEventListener("click", function () { funcionSeleccion(fila); });
	}
	tabla.appendChild(fila);
	return tabla;
}

function crearTituloFechaCalificacion(fecha) {
	var tabla = crearElementoTablaCalificacion("table", {
		border: "1",
		cellspacing: "1",
		cellpadding: "5",
		style: { backgroundColor: "#2196f3", color: "white", width: "100%" }
	});
	var fila = crearElementoTablaCalificacion("tr", { id: "tbSelecRegistro" });
	fila.appendChild(crearElementoTablaCalificacion("td", {
		style: { width: "10%", textAlign: "center" }
	}, fecha));
	tabla.appendChild(fila);
	return tabla;
}

function renderizarCalificacionCobradorParcial(registros) {
	var contenedor = vaciarTablaCalificacion("table_parcial_calificacion_cobrador");
	if (!contenedor) return;
	var fragmento = document.createDocumentFragment();
	var fechaActual = null;
	(registros || []).forEach(function (registro, indice) {
		if (registro.fecha !== fechaActual) {
			fechaActual = registro.fecha;
			fragmento.appendChild(crearTituloFechaCalificacion(registro.fecha_formateada || registro.fecha));
		}
		var seleccionable = registro.seleccionable === true || registro.seleccionable === 1 || registro.seleccionable === "1";
		fragmento.appendChild(crearTablaFilaCalificacion(
			indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch",
			[
				{ id: "td_datos_1", valor: registro.cobrador, ancho: "10%" },
				{ id: "td_datos_2", valor: registro.visitado, ancho: "10%" },
				{ id: "td_datos_3", valor: registro.agendado, ancho: "10%" },
				{ id: "td_datos_4", valor: registro.cobrado, ancho: "10%" },
				{ id: "td_datos_5", valor: registro.puntaje_tramo, ancho: "10%" },
				{ id: "td_datos_6", valor: registro.puntaje_total, ancho: "10%" },
				{ id: "td_datos_7", valor: registro.calificacion, ancho: "10%" },
				{ id: "td_datos_8", valor: registro.estado_revision, ancho: "10%" },
				{ id: "td_datos_9", valor: registro.observacion, ancho: "10%" },
				{ id: "td_datos_10", valor: registro.id_calificacion, oculta: true }
			],
			seleccionable ? Obtenerdatoscalificacioncobrador : null
		));
	});
	contenedor.appendChild(fragmento);
}

function renderizarCalificacionVendedorParcial(registros) {
	var contenedor = vaciarTablaCalificacion("table_parcial_calificacion_vendedor");
	if (!contenedor) return;
	var fragmento = document.createDocumentFragment();
	var fechaActual = null;
	(registros || []).forEach(function (registro, indice) {
		if (registro.fecha !== fechaActual) {
			fechaActual = registro.fecha;
			fragmento.appendChild(crearTituloFechaCalificacion(registro.fecha_formateada || registro.fecha));
		}
		var seleccionable = registro.seleccionable === true || registro.seleccionable === 1 || registro.seleccionable === "1";
		fragmento.appendChild(crearTablaFilaCalificacion(
			indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch",
			[
				{ id: "td_datos_1", valor: registro.vendedor, ancho: "10%", centro: true },
				{ id: "td_datos_2", valor: registro.contactados, ancho: "10%", centro: true },
				{ id: "td_datos_3", valor: registro.agendados, ancho: "10%", centro: true },
				{ id: "td_datos_4", valor: registro.ventas_credito, ancho: "10%", centro: true },
				{ id: "td_datos_5", valor: registro.ventas_contado, ancho: "10%", centro: true },
				{ id: "td_datos_6", valor: registro.puntaje_total, ancho: "10%", centro: true },
				{ id: "td_datos_11", valor: registro.total_ventas_formateado, ancho: "10%", centro: true },
				{ id: "td_datos_7", valor: registro.calificacion, ancho: "10%", centro: true },
				{ id: "td_datos_8", valor: registro.estado_revision, ancho: "10%", centro: true },
				{ id: "td_datos_9", valor: registro.observacion, ancho: "10%", centro: true },
				{ id: "td_datos_10", valor: registro.id_calificacion, oculta: true }
			],
			seleccionable ? Obtenerdatoscalificacionvendedor : null
		));
	});
	contenedor.appendChild(fragmento);
}

function renderizarCalificacionGeneral(idContenedor, registros, columnas, tituloEntidad) {
	var contenedor = vaciarTablaCalificacion(idContenedor);
	if (!contenedor || !Array.isArray(registros) || registros.length === 0) return;
	var nombresColumnas = Array.isArray(columnas) ? columnas.slice() : [];
	if (nombresColumnas.length === 0 && Array.isArray(registros[0].conteos)) {
		nombresColumnas = registros[0].conteos.map(function (conteo) { return conteo.descripcion; });
	}
	var tabla = crearElementoTablaCalificacion("table", {
		className: "tableRegistroSearch2",
		border: "1",
		cellspacing: "1",
		cellpadding: "5",
		style: { width: "100%" }
	});
	var cabecera = crearElementoTablaCalificacion("tr", { id: "tbSelecRegistro" });
	cabecera.appendChild(crearElementoTablaCalificacion("td", {
		style: { width: "20%", textAlign: "left", fontWeight: "bold" }
	}, tituloEntidad));
	nombresColumnas.forEach(function (nombre) {
		cabecera.appendChild(crearElementoTablaCalificacion("td", {
			style: { width: "10%", textAlign: "center", fontWeight: "bold" }
		}, nombre));
	});
	cabecera.appendChild(crearElementoTablaCalificacion("td", {
		style: { width: "10%", textAlign: "center", fontWeight: "bold" }
	}, "PUNTOS TOTALES"));
	tabla.appendChild(cabecera);
	registros.forEach(function (registro) {
		var fila = crearElementoTablaCalificacion("tr", { id: "tbSelecRegistro" });
		fila.appendChild(crearElementoTablaCalificacion("td", { style: { width: "20%" } }, registro.nombre));
		var valores = Object.create(null);
		(registro.conteos || []).forEach(function (conteo) {
			valores[conteo.descripcion] = conteo.cantidad;
		});
		nombresColumnas.forEach(function (nombre) {
			fila.appendChild(crearElementoTablaCalificacion("td", {
				style: { width: "10%", textAlign: "center" }
			}, valores[nombre] == null ? 0 : valores[nombre]));
		});
		fila.appendChild(crearElementoTablaCalificacion("td", {
			style: { width: "10%", textAlign: "center" }
		}, registro.total));
		tabla.appendChild(fila);
	});
	contenedor.appendChild(tabla);
}

function prepararCabeceraListadoCalificacion(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo);
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var filaCabecera = tablaCabecera ? tablaCabecera.querySelector("tr") : null;
	if (!filaCabecera) return null;
	filaCabecera.id = idCabecera;
	return filaCabecera;
}

var listadoRangoCalificacionCobrador = null;
function obtenerListadoRangoCalificacionCobrador() {
	if (listadoRangoCalificacionCobrador || typeof AbmListadoCore === "undefined") return listadoRangoCalificacionCobrador;
	if (!prepararCabeceraListadoCalificacion("divBuscadorRangoCalificacionCobrador", "cabeceraRangoCalificacionCobrador")) return null;
	listadoRangoCalificacionCobrador = AbmListadoCore.crear({
		nombre: "rango_calificacion_cobrador",
		idCabecera: "cabeceraRangoCalificacionCobrador",
		idCuerpo: "divBuscadorRangoCalificacionCobrador",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "25%" },
			{ campo: "rangoinicio", titulo: "INICIO", ancho: "25%" },
			{ campo: "rangofin", titulo: "FIN", ancho: "25%" },
			{ campo: "puntaje", titulo: "PUNTAJE", ancho: "25%" }
		],
		fila: {
			claseTabla: function (registro, indice) { return indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch"; },
			funcionSeleccion: "ObtenerdatosAbmRangoCalificacionCobrador",
			celdas: [
				{ id: "td_id", campo: "cod_calificacion_cobrador", tecnica: true },
				{ id: "td_datos_1", columna: "descripcion", campo: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true },
				{ id: "td_datos_3", columna: "rangoinicio", campo: "rangoinicio", className: "tdRegistroSearch" },
				{ id: "td_datos_4", columna: "rangofin", campo: "rangofin", className: "tdRegistroSearch" },
				{ id: "td_datos_5", columna: "puntaje", campo: "puntaje", className: "tdRegistroSearch" }
			]
		}
	});
	listadoRangoCalificacionCobrador.iniciar();
	return listadoRangoCalificacionCobrador;
}

var listadoCargarCalificacionCobrador = null;
function obtenerListadoCargarCalificacionCobrador() {
	if (listadoCargarCalificacionCobrador || typeof AbmListadoCore === "undefined") return listadoCargarCalificacionCobrador;
	if (!prepararCabeceraListadoCalificacion("divBuscadorCargarCalificacionCobrador", "cabeceraCargarCalificacionCobrador")) return null;
	listadoCargarCalificacionCobrador = AbmListadoCore.crear({
		nombre: "cargar_calificacion_cobrador",
		idCabecera: "cabeceraCargarCalificacionCobrador",
		idCuerpo: "divBuscadorCargarCalificacionCobrador",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "70%" },
			{ campo: "puntos", titulo: "PUNTOS", ancho: "30%" }
		],
		fila: {
			claseTabla: function (registro, indice) { return indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch"; },
			funcionSeleccion: "ObtenerdatosAbmCargarCalificacionCobrador",
			celdas: [
				{ id: "td_id", campo: "cod_cargar_calificacion_cobrador", tecnica: true },
				{ id: "td_datos_1", columna: "descripcion", campo: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_3", columna: "puntos", campo: "puntos", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoCargarCalificacionCobrador.iniciar();
	return listadoCargarCalificacionCobrador;
}

function iniciarListadosCalificacionCobrador() {
	obtenerListadoRangoCalificacionCobrador();
	obtenerListadoCargarCalificacionCobrador();
}

let controlventacalificacioncobrador = '1';
//CALIFICACION COBRADOR
function verCerrarCalificacionCobrador(){

	if(document.getElementById("divCalificacionCobrador").style.display==""){
		document.getElementById("divCalificacionCobrador").style.display="none"
		document.getElementById("divMinimizadoCalificacionCobrador").style.display="none"
		limpiarCalificacionCobrador()
	}else{	
if(controlacceso("VERCALIFICACIONCOBRADOR","accion")==false){return;}
		mostrarSoloUno("divCalificacionCobrador")		 
		document.getElementById("divCalificacionCobrador").style.display=""
		checkCalificacionCobrador(2)
	}
}
function limpiarCalificacionCobrador(){
	// document.getElementById("inptFiltroCalificacionCobrador1").value=""
	document.getElementById("inptFiltroCalificacionCobrador2").value=""
	document.getElementById("inptFiltroCalificacionCobrador3").value=""
	document.getElementById("inptFiltroCalificacionCobrador4").value=""
	document.getElementById("inptFiltroCalificacionCobrador5").value=""
	document.getElementById("table_parcial_calificacion_cobrador").innerHTML=""
	document.getElementById("table_general_calificacion_cobrador").innerHTML=""
	id_califacion_cobrador = '';
	controlventacalificacioncobrador = '1'
	checkCalificacionCobrador(2)
}
function minimizarCalificacionCobrador(){
	$("div[id=divCalificacionCobrador]").fadeOut(500);
	document.getElementById("divMinimizadoCalificacionCobrador").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCalificacionCobrador"));
}
function buscarCalificacionCobrador() {	
	if(controlventacalificacioncobrador == '2'){
		buscarCalificacionCobradorGeneral();
		return;
	}
	/* if(controlacceso("VERCATALOGO","accion")==false){return;}	 */
	// var fecha_filtro = document.getElementById('inptFiltroCalificacionCobrador1').value
	var fecha1 = document.getElementById('inptBuscarCalificacionCobradorF1').value
	var fecha2 = document.getElementById('inptBuscaCalificacionCobradorF2').value
	var local = document.getElementById('inptFiltroCalificacionCobrador2').value
	var cobrador = document.getElementById('inptFiltroCalificacionCobrador3').value
	var calificacion = document.getElementById('inptFiltroCalificacionCobrador4').value
	var estado = document.getElementById('inptFiltroCalificacionCobrador5').value
	
	if(document.getElementById('checkCalificacionCobrador2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO", "#")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN", "#")
		return false;
	}
	}
	
	document.getElementById("table_parcial_calificacion_cobrador").innerHTML = paginacargando
	document.getElementById('inptTotalRegistoCalificacionCobrador').value = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"cobrador": cobrador,
		"calificacion": calificacion,
		"estado": estado,
		"formato": "json",
		"funt": "buscarCalificacionCobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_parcial_calificacion_cobrador").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionCobrador').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_parcial_calificacion_cobrador").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionCobrador').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(Array.isArray(datos_buscados)){
						renderizarCalificacionCobradorParcial(datos_buscados)
					}else{
						document.getElementById("table_parcial_calificacion_cobrador").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
					document.getElementById("inptTotalRegistoCalificacionCobrador").value = datos[3]
					id_califacion_cobrador = '';
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function checkCalificacionCobrador(d){	
	if(d=="1"){
		document.getElementById('checkCalificacionCobrador1').checked=true
		document.getElementById('checkCalificacionCobrador2').checked=false
		document.getElementById('inptBuscarCalificacionCobradorF1').value = "";
	    document.getElementById('inptBuscaCalificacionCobradorF2').value = "";	
	}else{		
		document.getElementById('checkCalificacionCobrador1').checked=false
		document.getElementById('checkCalificacionCobrador2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarCalificacionCobradorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaCalificacionCobradorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
let id_califacion_cobrador = '';
function Obtenerdatoscalificacioncobrador(datostr){
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	id_califacion_cobrador = $(datostr).children('td[id="td_datos_10"]').html();
	
	
	
}

function verCerrarVentanasCalificacionCobrador(d){
	document.getElementById("btnCalificacionCobrador1").style=''
	document.getElementById("btnCalificacionCobrador2").style=''
	document.getElementById("ventanaCalificacionCobrador1").style.display='none'
	document.getElementById("ventanaCalificacionCobrador2").style.display='none'
	
	if(d=="1"){
		document.getElementById("btnCalificacionCobrador1").style='background-color:#FF9800;color:#fff'
		document.getElementById("ventanaCalificacionCobrador1").style.display='';
		controlventacalificacioncobrador = '1'
	}
	if(d=="2"){
		document.getElementById("btnCalificacionCobrador2").style='background-color:#FF9800;color:#fff'
		document.getElementById("ventanaCalificacionCobrador2").style.display='';
		controlventacalificacioncobrador = '2'
	}
}


/* CALIFICACION GENERAL */
function buscarCalificacionCobradorGeneral() {	
	var fecha1 = document.getElementById('inptBuscarCalificacionCobradorF1').value
	var fecha2 = document.getElementById('inptBuscaCalificacionCobradorF2').value
	var local = document.getElementById('inptFiltroCalificacionCobrador2').value
	
	
	if(document.getElementById('checkCalificacionCobrador2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO", "#")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN", "#")
		return false;
	}
	}
	
	document.getElementById("table_general_calificacion_cobrador").innerHTML = paginacargando
	document.getElementById('inptTotalRegistoCalificacionCobrador').value = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"formato": "json",
		"funt": "buscarCalificacionCobradorGeneral"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_general_calificacion_cobrador").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionCobrador').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_general_calificacion_cobrador").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionCobrador').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(Array.isArray(datos_buscados)){
						renderizarCalificacionGeneral("table_general_calificacion_cobrador", datos_buscados, datos[4], "COBRADOR")
					}else{
						document.getElementById("table_general_calificacion_cobrador").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
					document.getElementById("inptTotalRegistoCalificacionCobrador").value = datos[3]
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/* CARGAR OBSERVACION EN CALIFICACION COBRADOR */
function verCerrarFrmCargarObservacionCalificacionCobrador(d){
	if(document.getElementById("divCargarObservacionCalificacionCobrador").style.display==""){
		document.getElementById("divCargarObservacionCalificacionCobrador").style.display="none";
	}else{
		if(id_califacion_cobrador==''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN COBRADOR');
		return;
	}
		document.getElementById("divCargarObservacionCalificacionCobrador").style.display="";
	}
}

function verificarcamposCargarObservacionCalificacionCobrador(){
	if(id_califacion_cobrador==''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN COBRADOR');
		return;
	}
	
	let inptCargarObsCalificacionCobrador = document.getElementById('inptCargarObsCalificacionCobrador').value;
	if(inptCargarObsCalificacionCobrador==''){
		ver_vetana_informativa('FALTÓ INGRESAR UNA OBSERVACION');
		return;
	}
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"id_califacion_cobrador": id_califacion_cobrador,
		"inptCargarObsCalificacionCobrador": inptCargarObsCalificacionCobrador,
		"funt": "cargar_obs_calificacion_cobrador"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
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
				ver_vetana_informativa('DATOS GUARDADOS CORRECTAMENTE');
				document.getElementById('inptCargarObsCalificacionCobrador').value = '';
				id_califacion_cobrador = ''
				verCerrarFrmCargarObservacionCalificacionCobrador(2)
				buscarCalificacionCobrador()
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
ABM RANGO CALIFICACION COBRADOR
*/
var idAbmRangoCalificacionCobrador="";
var ElementoSeleccRangoCalificacionCobrador="";
function verCerrarFrmRangoCalificacionCobrador(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVARANGOCALIFICACIONCOBRADOR","accion")==false){return;}
		$("div[id=divAbmRangoCalificacionCobrador]").fadeIn(500);
		BuscarAbmRangoCalificacionCobrador()
	}else{
		$("div[id=divAbmRangoCalificacionCobrador]").fadeOut(500);
	}
}
function LimpiarCamposRangoCalificacionCobrador(){
	document.getElementById("inptNombreRangoCalificacionCobrador").value="";
	document.getElementById("inptEstadoRangoCalificacionCobrador").value="";
	document.getElementById("inptPuntosRangoCalificacionCobradorInicio").value="";
	document.getElementById("inptPuntosRangoCalificacionCobradorFin").value="";
	document.getElementById("inptPuntajeRangoCalificacionCobrador").value="";
	document.getElementById("btnRangoCalificacionCobrador1").value="Guardar Datos"
	idAbmRangoCalificacionCobrador="";
	ElementoSeleccRangoCalificacionCobrador="";
}
function ObtenerdatosAbmRangoCalificacionCobrador(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccRangoCalificacionCobrador=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreRangoCalificacionCobrador").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoRangoCalificacionCobrador").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptPuntosRangoCalificacionCobradorInicio").value = $(datostr).children('td[id="td_datos_3"]').html();
    document.getElementById("inptPuntosRangoCalificacionCobradorFin").value = $(datostr).children('td[id="td_datos_4"]').html();
    document.getElementById("inptPuntajeRangoCalificacionCobrador").value = $(datostr).children('td[id="td_datos_5"]').html();
	

	
	idAbmRangoCalificacionCobrador = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnRangoCalificacionCobrador1").value="Editar Datos"
}
function SeleccionarRegistroRangoCalificacionCobrador(){
	if(ElementoSeleccRangoCalificacionCobrador==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmRangoCalificacionCobrador").style.display="none";
	 document.getElementById("inptRangoCalificacionCobrador").value = idAbmRangoCalificacionCobrador
	 LimpiarCamposRangoCalificacionCobrador()
}
function VerificarDatosRangoCalificacionCobrador(){
	var inptNombreRangoCalificacionCobrador = document.getElementById("inptNombreRangoCalificacionCobrador").value
	var inptEstadoRangoCalificacionCobrador = document.getElementById("inptEstadoRangoCalificacionCobrador").value	
	var inptPuntosRangoCalificacionCobradorInicio = document.getElementById("inptPuntosRangoCalificacionCobradorInicio").value	
	var inptPuntosRangoCalificacionCobradorFin = document.getElementById("inptPuntosRangoCalificacionCobradorFin").value
	var inptPuntajeRangoCalificacionCobrador = document.getElementById("inptPuntajeRangoCalificacionCobrador").value



	
	if(inptNombreRangoCalificacionCobrador==""){
		document.getElementById("inptNombreRangoCalificacionCobrador").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptPuntosRangoCalificacionCobradorInicio==""){
		document.getElementById("inptPuntosRangoCalificacionCobradorInicio").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptPuntosRangoCalificacionCobradorFin==""){
		document.getElementById("inptPuntosRangoCalificacionCobradorFin").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptPuntajeRangoCalificacionCobrador==""){
		document.getElementById("inptPuntajeRangoCalificacionCobrador").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptEstadoRangoCalificacionCobrador==""){
		document.getElementById("inptEstadoRangoCalificacionCobrador").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmRangoCalificacionCobrador != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmRangoCalificacionCobrador(inptPuntosRangoCalificacionCobradorFin,inptPuntosRangoCalificacionCobradorInicio,inptNombreRangoCalificacionCobrador,inptEstadoRangoCalificacionCobrador,inptPuntajeRangoCalificacionCobrador,idAbmRangoCalificacionCobrador,accion)
}
function AbmRangoCalificacionCobrador(rangofin,rangoinicio,descripcion,Estado,puntaje,idabm,accion) {
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
	datos.append("rangoinicio", rangoinicio)
	datos.append("rangofin", rangofin)
	datos.append("puntaje", puntaje)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
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
				LimpiarCamposRangoCalificacionCobrador()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmRangoCalificacionCobrador()
				BuscarSelecRangoCalificacionCobrador()
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
function BuscarAbmRangoCalificacionCobrador() {
	var listado = obtenerListadoRangoCalificacionCobrador()
	var buscador = document.getElementById("inptBuscarAbmRangoCalificacionCobrador").value
	var estado = document.getElementById("inptBuscarEstadoRangoCalificacionCobrador").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorRangoCalificacionCobrador").innerHTML = paginacargando
    document.getElementById("lblNroRegistroRangoCalificacionCobrador").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("divBuscadorRangoCalificacionCobrador").innerHTML = ''
			}
			document.getElementById("lblNroRegistroRangoCalificacionCobrador").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorRangoCalificacionCobrador").innerHTML = ''
			document.getElementById("lblNroRegistroRangoCalificacionCobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)){
						listado.establecerRegistros(datos_buscados, false)
					}else{
						document.getElementById("divBuscadorRangoCalificacionCobrador").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
                   document.getElementById("lblNroRegistroRangoCalificacionCobrador").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecRangoCalificacionCobrador() {
	document.getElementById("inptFiltroCalificacionCobrador4").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
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
					document.getElementById("inptFiltroCalificacionCobrador4").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					
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
ABM CARGAR CALIFICACION COBRADOR
*/
var idAbmCargarCalificacionCobrador="";
var ElementoSeleccCargarCalificacionCobrador="";
function verCerrarFrmCargarCalificacionCobrador(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVARANGOCALIFICACIONCOBRADOR","accion")==false){return;}
		$("div[id=divAbmCargarCalificacionCobrador]").fadeIn(500);
		BuscarAbmCargarCalificacionCobrador()
	}else{
		$("div[id=divAbmCargarCalificacionCobrador]").fadeOut(500);
	}
}
function LimpiarCamposCargarCalificacionCobrador(){
	document.getElementById("inptNombreCargarCalificacionCobrador").value="";
	document.getElementById("inptEstadoCargarCalificacionCobrador").value="";
	document.getElementById("inptPuntosCargarCalificacionCobrador").value="";
	document.getElementById("btnCargarCalificacionCobrador1").value="Guardar Datos"
	idAbmCargarCalificacionCobrador="";
	ElementoSeleccCargarCalificacionCobrador="";
}
function ObtenerdatosAbmCargarCalificacionCobrador(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccCargarCalificacionCobrador=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreCargarCalificacionCobrador").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoCargarCalificacionCobrador").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptPuntosCargarCalificacionCobrador").value = $(datostr).children('td[id="td_datos_3"]').html();
	

	
	idAbmCargarCalificacionCobrador = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnCargarCalificacionCobrador1").value="Editar Datos"
}
function SeleccionarRegistroCargarCalificacionCobrador(){
	if(ElementoSeleccCargarCalificacionCobrador==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmCargarCalificacionCobrador").style.display="none";
	 document.getElementById("inptCargarCalificacionCobrador").value = idAbmCargarCalificacionCobrador
	 LimpiarCamposCargarCalificacionCobrador()
}
function VerificarDatosCargarCalificacionCobrador(){
	var inptNombreCargarCalificacionCobrador = document.getElementById("inptNombreCargarCalificacionCobrador").value
	var inptEstadoCargarCalificacionCobrador = document.getElementById("inptEstadoCargarCalificacionCobrador").value	
	var inptPuntosCargarCalificacionCobrador = document.getElementById("inptPuntosCargarCalificacionCobrador").value	
	if(inptNombreCargarCalificacionCobrador==""){
		document.getElementById("inptNombreCargarCalificacionCobrador").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptPuntosCargarCalificacionCobrador==""){
		document.getElementById("inptPuntosCargarCalificacionCobrador").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptEstadoCargarCalificacionCobrador==""){
		document.getElementById("inptEstadoCargarCalificacionCobrador").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmCargarCalificacionCobrador != "") {		
		accion = "editar_cal";
	} else {		
		accion = "nuevo_cal";
	}
	AbmCargarCalificacionCobrador(inptPuntosCargarCalificacionCobrador,inptNombreCargarCalificacionCobrador,inptEstadoCargarCalificacionCobrador,idAbmCargarCalificacionCobrador,accion)
}
function AbmCargarCalificacionCobrador(puntos,descripcion,Estado,idabm,accion) {
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
	datos.append("puntos", puntos)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
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
				LimpiarCamposCargarCalificacionCobrador()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmCargarCalificacionCobrador()
				// BuscarSelecCargarCalificacionCobrador()
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
function BuscarAbmCargarCalificacionCobrador() {
	var listado = obtenerListadoCargarCalificacionCobrador()
	var buscador = document.getElementById("inptBuscarAbmCargarCalificacionCobrador").value
	var estado = document.getElementById("inptBuscarEstadoCargarCalificacionCobrador").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorCargarCalificacionCobrador").innerHTML = paginacargando
    document.getElementById("lblNroRegistroCargarCalificacionCobrador").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "buscar_cal"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("divBuscadorCargarCalificacionCobrador").innerHTML = ''
			}
			document.getElementById("lblNroRegistroCargarCalificacionCobrador").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorCargarCalificacionCobrador").innerHTML = ''
			document.getElementById("lblNroRegistroCargarCalificacionCobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)){
						listado.establecerRegistros(datos_buscados, false)
					}else{
						document.getElementById("divBuscadorCargarCalificacionCobrador").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
                   document.getElementById("lblNroRegistroCargarCalificacionCobrador").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecCargarCalificacionCobrador() {
	document.getElementById("inptFiltroCargarCalificacionCobrador4").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption_cal"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionCobrador.php",
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
					document.getElementById("inptFiltroCargarCalificacionCobrador4").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}





var listadoRangoCalificacionVendedor = null;
function obtenerListadoRangoCalificacionVendedor() {
	if (listadoRangoCalificacionVendedor || typeof AbmListadoCore === "undefined") return listadoRangoCalificacionVendedor;
	if (!prepararCabeceraListadoCalificacion("divBuscadorRangoCalificacionVendedor", "cabeceraRangoCalificacionVendedor")) return null;
	listadoRangoCalificacionVendedor = AbmListadoCore.crear({
		nombre: "rango_calificacion_vendedor",
		idCabecera: "cabeceraRangoCalificacionVendedor",
		idCuerpo: "divBuscadorRangoCalificacionVendedor",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "25%" },
			{ campo: "rangoinicio", titulo: "INICIO", ancho: "25%" },
			{ campo: "rangofin", titulo: "FIN", ancho: "25%" },
			{ campo: "puntaje", titulo: "PUNTAJE", ancho: "25%" }
		],
		fila: {
			claseTabla: function (registro, indice) { return indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch"; },
			funcionSeleccion: "ObtenerdatosAbmRangoCalificacionVendedor",
			celdas: [
				{ id: "td_id", campo: "cod_calificacion_vendedor", tecnica: true },
				{ id: "td_datos_1", columna: "descripcion", campo: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true },
				{ id: "td_datos_3", columna: "rangoinicio", campo: "rangoinicio", className: "tdRegistroSearch" },
				{ id: "td_datos_4", columna: "rangofin", campo: "rangofin", className: "tdRegistroSearch" },
				{ id: "td_datos_5", columna: "puntaje", campo: "puntaje", className: "tdRegistroSearch" }
			]
		}
	});
	listadoRangoCalificacionVendedor.iniciar();
	return listadoRangoCalificacionVendedor;
}

var listadoCargarCalificacionVendedor = null;
function obtenerListadoCargarCalificacionVendedor() {
	if (listadoCargarCalificacionVendedor || typeof AbmListadoCore === "undefined") return listadoCargarCalificacionVendedor;
	if (!prepararCabeceraListadoCalificacion("divBuscadorCargarCalificacionVendedor", "cabeceraCargarCalificacionVendedor")) return null;
	listadoCargarCalificacionVendedor = AbmListadoCore.crear({
		nombre: "cargar_calificacion_vendedor",
		idCabecera: "cabeceraCargarCalificacionVendedor",
		idCuerpo: "divBuscadorCargarCalificacionVendedor",
		columnas: [
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "70%" },
			{ campo: "puntos", titulo: "PUNTOS", ancho: "30%" }
		],
		fila: {
			claseTabla: function (registro, indice) { return indice % 2 === 0 ? "tableRegistroSearch2" : "tableRegistroSearch"; },
			funcionSeleccion: "ObtenerdatosAbmCargarCalificacionVendedor",
			celdas: [
				{ id: "td_id", campo: "cod_cargar_calificacion_vendedor", tecnica: true },
				{ id: "td_datos_1", columna: "descripcion", campo: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_3", columna: "puntos", campo: "puntos", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoCargarCalificacionVendedor.iniciar();
	return listadoCargarCalificacionVendedor;
}

function iniciarListadosCalificacionVendedor() {
	obtenerListadoRangoCalificacionVendedor();
	obtenerListadoCargarCalificacionVendedor();
}

let controlventacalificacionvendedor = '1';
//CALIFICACION VENDEDOR
function verCerrarCalificacionVendedor(){

	if(document.getElementById("divCalificacionVendedor").style.display==""){
		document.getElementById("divCalificacionVendedor").style.display="none"
		document.getElementById("divMinimizadoCalificacionVendedor").style.display="none"
		limpiarCalificacionVendedor()
	}else{	
if(controlacceso("VERCALIFICACIONVENDEDOR","accion")==false){return;}
		mostrarSoloUno("divCalificacionVendedor")		 
		document.getElementById("divCalificacionVendedor").style.display=""
		checkCalificacionVendedor(2)
	}
}
function limpiarCalificacionVendedor(){
	// document.getElementById("inptFiltroCalificacionVendedor1").value=""
	document.getElementById("inptFiltroCalificacionVendedor2").value=""
	document.getElementById("inptFiltroCalificacionVendedor3").value=""
	document.getElementById("inptFiltroCalificacionVendedor4").value=""
	document.getElementById("inptFiltroCalificacionVendedor5").value=""
	document.getElementById("table_parcial_calificacion_vendedor").innerHTML=""
	document.getElementById("table_general_calificacion_vendedor").innerHTML=""
	id_califacion_vendedor = '';
	controlventacalificacionvendedor = '1'
	checkCalificacionVendedor(2)
}
function minimizarCalificacionVendedor(){
	$("div[id=divCalificacionVendedor]").fadeOut(500);
	document.getElementById("divMinimizadoCalificacionVendedor").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuCalificacionVendedor"));
}
function buscarCalificacionVendedor() {	
	if(controlventacalificacionvendedor == '2'){
		buscarCalificacionVendedorGeneral();
		return;
	}
	/* if(controlacceso("VERCATALOGO","accion")==false){return;}	 */
	// var fecha_filtro = document.getElementById('inptFiltroCalificacionVendedor1').value
	var fecha1 = document.getElementById('inptBuscarCalificacionVendedorF1').value
	var fecha2 = document.getElementById('inptBuscaCalificacionVendedorF2').value
	var local = document.getElementById('inptFiltroCalificacionVendedor2').value
	var vendedor = document.getElementById('inptFiltroCalificacionVendedor3').value
	var calificacion = document.getElementById('inptFiltroCalificacionVendedor4').value
	var estado = document.getElementById('inptFiltroCalificacionVendedor5').value
	
	if(document.getElementById('checkCalificacionVendedor2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO", "#")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN", "#")
		return false;
	}
	}
	
	document.getElementById("table_parcial_calificacion_vendedor").innerHTML = paginacargando
	document.getElementById('inptTotalRegistoCalificacionVendedor').value = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"vendedor": vendedor,
		"calificacion": calificacion,
		"estado": estado,
		"formato": "json",
		"funt": "buscarCalificacionVendedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_parcial_calificacion_vendedor").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionVendedor').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_parcial_calificacion_vendedor").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionVendedor').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(Array.isArray(datos_buscados)){
						renderizarCalificacionVendedorParcial(datos_buscados)
					}else{
						document.getElementById("table_parcial_calificacion_vendedor").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
					document.getElementById("inptTotalRegistoCalificacionVendedor").value = datos[3]
					id_califacion_vendedor = '';
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function checkCalificacionVendedor(d){	
	if(d=="1"){
		document.getElementById('checkCalificacionVendedor1').checked=true
		document.getElementById('checkCalificacionVendedor2').checked=false
		document.getElementById('inptBuscarCalificacionVendedorF1').value = "";
	    document.getElementById('inptBuscaCalificacionVendedorF2').value = "";	
	}else{		
		document.getElementById('checkCalificacionVendedor1').checked=false
		document.getElementById('checkCalificacionVendedor2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarCalificacionVendedorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscaCalificacionVendedorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
let id_califacion_vendedor = '';
function Obtenerdatoscalificacionvendedor(datostr){
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	
	id_califacion_vendedor = $(datostr).children('td[id="td_datos_10"]').html();
	
	
	
}

function verCerrarVentanasCalificacionVendedor(d){
	document.getElementById("btnCalificacionVendedor1").style=''
	document.getElementById("btnCalificacionVendedor2").style=''
	document.getElementById("ventanaCalificacionVendedor1").style.display='none'
	document.getElementById("ventanaCalificacionVendedor2").style.display='none'
	
	if(d=="1"){
		document.getElementById("btnCalificacionVendedor1").style='background-color:#FF9800;color:#fff'
		document.getElementById("ventanaCalificacionVendedor1").style.display='';
		controlventacalificacionvendedor = '1'
	}
	if(d=="2"){
		document.getElementById("btnCalificacionVendedor2").style='background-color:#FF9800;color:#fff'
		document.getElementById("ventanaCalificacionVendedor2").style.display='';
		controlventacalificacionvendedor = '2'
	}
}

function buscarVendedorControlCalificacionSelec() {

	
	document.getElementById("inptFiltroCalificacionVendedor3").innerHTML = ""
	
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarselectcontrolcalificacion"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptFiltroCalificacionVendedor3").innerHTML = ''
			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptFiltroCalificacionVendedor3").innerHTML = ''
			
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptFiltroCalificacionVendedor3").innerHTML = datos_buscados
					

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


/* CALIFICACION GENERAL */
function buscarCalificacionVendedorGeneral() {	
	var fecha1 = document.getElementById('inptBuscarCalificacionVendedorF1').value
	var fecha2 = document.getElementById('inptBuscaCalificacionVendedorF2').value
	var local = document.getElementById('inptFiltroCalificacionVendedor2').value
	
	
	if(document.getElementById('checkCalificacionVendedor2').checked==true){
		 if (fecha1 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO", "#")
		return false;
	}
	if (fecha2 == "") {
		ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE FIN", "#")
		return false;
	}
	}
	
	document.getElementById("table_general_calificacion_vendedor").innerHTML = paginacargando
	document.getElementById('inptTotalRegistoCalificacionVendedor').value = '';
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"local": local,
		"formato": "json",
		"funt": "buscarCalificacionVendedorGeneral"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_general_calificacion_vendedor").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionVendedor').value = '';
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_general_calificacion_vendedor").innerHTML = ''
			document.getElementById('inptTotalRegistoCalificacionVendedor').value = '';
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(Array.isArray(datos_buscados)){
						renderizarCalificacionGeneral("table_general_calificacion_vendedor", datos_buscados, datos[4], "VENDEDOR")
					}else{
						document.getElementById("table_general_calificacion_vendedor").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
					document.getElementById("inptTotalRegistoCalificacionVendedor").value = datos[3]
				}
			} catch (error) {
				controldebusquedadCatalogo=false
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/* CARGAR OBSERVACION EN CALIFICACION VENDEDOR */
function verCerrarFrmCargarObservacionCalificacionVendedor(d){
	if(document.getElementById("divCargarObservacionCalificacionVendedor").style.display==""){
		document.getElementById("divCargarObservacionCalificacionVendedor").style.display="none";
	}else{
		if(id_califacion_vendedor==''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN VENDEDOR');
		return;
	}
		document.getElementById("divCargarObservacionCalificacionVendedor").style.display="";
	}
}

function verificarcamposCargarObservacionCalificacionVendedor(){
	if(id_califacion_vendedor==''){
		ver_vetana_informativa('FALTÓ SELECCIONAR UN VENDEDOR');
		return;
	}
	
	let inptCargarObsCalificacionVendedor = document.getElementById('inptCargarObsCalificacionVendedor').value;
	if(inptCargarObsCalificacionVendedor==''){
		ver_vetana_informativa('FALTÓ INGRESAR UNA OBSERVACION');
		return;
	}
	
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"id_califacion_vendedor": id_califacion_vendedor,
		"inptCargarObsCalificacionVendedor": inptCargarObsCalificacionVendedor,
		"funt": "cargar_obs_calificacion_vendedor"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
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
				ver_vetana_informativa('DATOS GUARDADOS CORRECTAMENTE');
				document.getElementById('inptCargarObsCalificacionVendedor').value = '';
				id_califacion_vendedor = ''
				verCerrarFrmCargarObservacionCalificacionVendedor(2)
				buscarCalificacionVendedor()
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
ABM RANGO CALIFICACION VENDEDOR
*/
var idAbmRangoCalificacionVendedor="";
var ElementoSeleccRangoCalificacionVendedor="";
function verCerrarFrmRangoCalificacionVendedor(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVARANGOCALIFICACIONVENDEDOR","accion")==false){return;}
		$("div[id=divAbmRangoCalificacionVendedor]").fadeIn(500);
		BuscarAbmRangoCalificacionVendedor()
	}else{
		$("div[id=divAbmRangoCalificacionVendedor]").fadeOut(500);
	}
}
function LimpiarCamposRangoCalificacionVendedor(){
	document.getElementById("inptNombreRangoCalificacionVendedor").value="";
	document.getElementById("inptEstadoRangoCalificacionVendedor").value="";
	document.getElementById("inptPuntosRangoCalificacionVendedorInicio").value="";
	document.getElementById("inptPuntosRangoCalificacionVendedorFin").value="";
	document.getElementById("inptPuntajeRangoCalificacionVendedor").value="";
	document.getElementById("btnRangoCalificacionVendedor1").value="Guardar Datos"
	idAbmRangoCalificacionVendedor="";
	ElementoSeleccRangoCalificacionVendedor="";
}
function ObtenerdatosAbmRangoCalificacionVendedor(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccRangoCalificacionVendedor=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreRangoCalificacionVendedor").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoRangoCalificacionVendedor").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptPuntosRangoCalificacionVendedorInicio").value = $(datostr).children('td[id="td_datos_3"]').html();
    document.getElementById("inptPuntosRangoCalificacionVendedorFin").value = $(datostr).children('td[id="td_datos_4"]').html();
    document.getElementById("inptPuntajeRangoCalificacionVendedor").value = $(datostr).children('td[id="td_datos_5"]').html();
	

	
	idAbmRangoCalificacionVendedor = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnRangoCalificacionVendedor1").value="Editar Datos"
}
function SeleccionarRegistroRangoCalificacionVendedor(){
	if(ElementoSeleccRangoCalificacionVendedor==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmRangoCalificacionVendedor").style.display="none";
	 document.getElementById("inptRangoCalificacionVendedor").value = idAbmRangoCalificacionVendedor
	 LimpiarCamposRangoCalificacionVendedor()
}
function VerificarDatosRangoCalificacionVendedor(){
	var inptNombreRangoCalificacionVendedor = document.getElementById("inptNombreRangoCalificacionVendedor").value
	var inptEstadoRangoCalificacionVendedor = document.getElementById("inptEstadoRangoCalificacionVendedor").value	
	var inptPuntosRangoCalificacionVendedorInicio = document.getElementById("inptPuntosRangoCalificacionVendedorInicio").value	
	var inptPuntosRangoCalificacionVendedorFin = document.getElementById("inptPuntosRangoCalificacionVendedorFin").value
	var inptPuntajeRangoCalificacionVendedor = document.getElementById("inptPuntajeRangoCalificacionVendedor").value



	
	if(inptNombreRangoCalificacionVendedor==""){
		document.getElementById("inptNombreRangoCalificacionVendedor").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptPuntosRangoCalificacionVendedorInicio==""){
		document.getElementById("inptPuntosRangoCalificacionVendedorInicio").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptPuntosRangoCalificacionVendedorFin==""){
		document.getElementById("inptPuntosRangoCalificacionVendedorFin").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptPuntajeRangoCalificacionVendedor==""){
		document.getElementById("inptPuntajeRangoCalificacionVendedor").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptEstadoRangoCalificacionVendedor==""){
		document.getElementById("inptEstadoRangoCalificacionVendedor").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmRangoCalificacionVendedor != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmRangoCalificacionVendedor(inptPuntosRangoCalificacionVendedorFin,inptPuntosRangoCalificacionVendedorInicio,inptNombreRangoCalificacionVendedor,inptEstadoRangoCalificacionVendedor,inptPuntajeRangoCalificacionVendedor,idAbmRangoCalificacionVendedor,accion)
}
function AbmRangoCalificacionVendedor(rangofin,rangoinicio,descripcion,Estado,puntaje,idabm,accion) {
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
	datos.append("rangoinicio", rangoinicio)
	datos.append("rangofin", rangofin)
	datos.append("puntaje", puntaje)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
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
				LimpiarCamposRangoCalificacionVendedor()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmRangoCalificacionVendedor()
				BuscarSelecRangoCalificacionVendedor()
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
function BuscarAbmRangoCalificacionVendedor() {
	var listado = obtenerListadoRangoCalificacionVendedor()
	var buscador = document.getElementById("inptBuscarAbmRangoCalificacionVendedor").value
	var estado = document.getElementById("inptBuscarEstadoRangoCalificacionVendedor").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorRangoCalificacionVendedor").innerHTML = paginacargando
    document.getElementById("lblNroRegistroRangoCalificacionVendedor").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("divBuscadorRangoCalificacionVendedor").innerHTML = ''
			}
			document.getElementById("lblNroRegistroRangoCalificacionVendedor").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorRangoCalificacionVendedor").innerHTML = ''
			document.getElementById("lblNroRegistroRangoCalificacionVendedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)){
						listado.establecerRegistros(datos_buscados, false)
					}else{
						document.getElementById("divBuscadorRangoCalificacionVendedor").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
                   document.getElementById("lblNroRegistroRangoCalificacionVendedor").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecRangoCalificacionVendedor() {
	document.getElementById("inptFiltroCalificacionVendedor4").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
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
					document.getElementById("inptFiltroCalificacionVendedor4").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					
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
ABM CARGAR CALIFICACION VENDEDOR
*/
var idAbmCargarCalificacionVendedor="";
var ElementoSeleccCargarCalificacionVendedor="";
function verCerrarFrmCargarCalificacionVendedor(d){
	if(d=="1"){
		// if(controlacceso("CREARNUEVARANGOCALIFICACIONVENDEDOR","accion")==false){return;}
		$("div[id=divAbmCargarCalificacionVendedor]").fadeIn(500);
		BuscarAbmCargarCalificacionVendedor()
	}else{
		$("div[id=divAbmCargarCalificacionVendedor]").fadeOut(500);
	}
}
function LimpiarCamposCargarCalificacionVendedor(){
	document.getElementById("inptNombreCargarCalificacionVendedor").value="";
	document.getElementById("inptEstadoCargarCalificacionVendedor").value="";
	document.getElementById("inptPuntosCargarCalificacionVendedor").value="";
	document.getElementById("btnCargarCalificacionVendedor1").value="Guardar Datos"
	idAbmCargarCalificacionVendedor="";
	ElementoSeleccCargarCalificacionVendedor="";
}
function ObtenerdatosAbmCargarCalificacionVendedor(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccCargarCalificacionVendedor=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreCargarCalificacionVendedor").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoCargarCalificacionVendedor").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptPuntosCargarCalificacionVendedor").value = $(datostr).children('td[id="td_datos_3"]').html();
	

	
	idAbmCargarCalificacionVendedor = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnCargarCalificacionVendedor1").value="Editar Datos"
}
function SeleccionarRegistroCargarCalificacionVendedor(){
	if(ElementoSeleccCargarCalificacionVendedor==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    
	 document.getElementById("divAbmCargarCalificacionVendedor").style.display="none";
	 document.getElementById("inptCargarCalificacionVendedor").value = idAbmCargarCalificacionVendedor
	 LimpiarCamposCargarCalificacionVendedor()
}
function VerificarDatosCargarCalificacionVendedor(){
	var inptNombreCargarCalificacionVendedor = document.getElementById("inptNombreCargarCalificacionVendedor").value
	var inptEstadoCargarCalificacionVendedor = document.getElementById("inptEstadoCargarCalificacionVendedor").value	
	var inptPuntosCargarCalificacionVendedor = document.getElementById("inptPuntosCargarCalificacionVendedor").value	
	if(inptNombreCargarCalificacionVendedor==""){
		document.getElementById("inptNombreCargarCalificacionVendedor").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptPuntosCargarCalificacionVendedor==""){
		document.getElementById("inptPuntosCargarCalificacionVendedor").focus()
		ver_vetana_informativa("Falto Ingresar los puntos")
		return
	}
	if(inptEstadoCargarCalificacionVendedor==""){
		document.getElementById("inptEstadoCargarCalificacionVendedor").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmCargarCalificacionVendedor != "") {		
		accion = "editar_cal";
	} else {		
		accion = "nuevo_cal";
	}
	AbmCargarCalificacionVendedor(inptPuntosCargarCalificacionVendedor,inptNombreCargarCalificacionVendedor,inptEstadoCargarCalificacionVendedor,idAbmCargarCalificacionVendedor,accion)
}
function AbmCargarCalificacionVendedor(puntos,descripcion,Estado,idabm,accion) {
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
	datos.append("puntos", puntos)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
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
				LimpiarCamposCargarCalificacionVendedor()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmCargarCalificacionVendedor()
				// BuscarSelecCargarCalificacionVendedor()
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
function BuscarAbmCargarCalificacionVendedor() {
	var listado = obtenerListadoCargarCalificacionVendedor()
	var buscador = document.getElementById("inptBuscarAbmCargarCalificacionVendedor").value
	var estado = document.getElementById("inptBuscarEstadoCargarCalificacionVendedor").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorCargarCalificacionVendedor").innerHTML = paginacargando
    document.getElementById("lblNroRegistroCargarCalificacionVendedor").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": "json",
		"funt": "buscar_cal"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			if(listado){
				listado.establecerRegistros([], false)
			}else{
				document.getElementById("divBuscadorCargarCalificacionVendedor").innerHTML = ''
			}
			document.getElementById("lblNroRegistroCargarCalificacionVendedor").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorCargarCalificacionVendedor").innerHTML = ''
			document.getElementById("lblNroRegistroCargarCalificacionVendedor").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if(listado && Array.isArray(datos_buscados)){
						listado.establecerRegistros(datos_buscados, false)
					}else{
						document.getElementById("divBuscadorCargarCalificacionVendedor").innerHTML = typeof datos_buscados === "string" ? datos_buscados : ""
					}
                   document.getElementById("lblNroRegistroCargarCalificacionVendedor").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarSelecCargarCalificacionVendedor() {
	document.getElementById("inptFiltroCargarCalificacionVendedor4").innerHTML = ""
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption_cal"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmCalificacionVendedor.php",
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
					document.getElementById("inptFiltroCargarCalificacionVendedor4").innerHTML = "<option value=''>SELECCIONAR</option>"+datos_buscados
					
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
VENTA POR TRAMOS
*/
function verCerrarVentasPorTramo(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divVentasPorTramo").style.display==""){
		document.getElementById("divMinimizadoVentasPorTramo").style.display="none"
	$("div[id=divVentasPorTramo]").fadeOut(500);	
	}else{

		// if(controlacceso("VERVENTAPORTRAMO","accion")==false){return;}
		mostrarSoloUno("divVentasPorTramo")	
		document.getElementById("divVentasPorTramo").style.display=""
	}
}

function minimizarVentasPorTramo(){ 
	$("div[id=divVentasPorTramo]").fadeOut(500);	
	document.getElementById("divMinimizadoVentasPorTramo").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuVentasPorTramo"));
}

function checkestadoVentasPorTramo(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarVentasPorTramo1').checked=true
	document.getElementById('inptSeleccEstadoBuscarVentasPorTramo2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarVentasPorTramo1').checked=false
	document.getElementById('inptSeleccEstadoBuscarVentasPorTramo2').checked=true
	}
}
function buscarVentasPorTramo() {
	// if(controlacceso("BUSCARLISTADODEBANCOS","accion")==false){return;}
	let fecha1 = document.getElementById('inptBuscarVentasPorTramoF1').value;
	let fecha2 = document.getElementById('inptBuscarVentasPorTramoF2').value;
	
	
	document.getElementById("table_abm_VentasPorTramo").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"funt": "buscarVentasPorTramoVendedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_VentasPorTramo").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_VentasPorTramo").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("table_abm_VentasPorTramo").innerHTML = datos_buscados
					document.getElementById("inptTotalRegistoVentasPorTramo").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function checkfiltrosVentasPorTramo(d){
	if(d=="1"){
	document.getElementById('inptCheckVentasPorTramo1').checked=true
	document.getElementById('inptCheckVentasPorTramo2').checked=false	
     
	 	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarVentasPorTramoF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarVentasPorTramoF2').value = f.getFullYear() + "-" + mes + "-" + dia;
	 
	}else{		
		document.getElementById('inptCheckVentasPorTramo1').checked=false
		document.getElementById('inptCheckVentasPorTramo2').checked=true
		document.getElementById('inptBuscarVentasPorTramoF1').value="";
		document.getElementById('inptBuscarVentasPorTramoF2').value="";
	}
}
