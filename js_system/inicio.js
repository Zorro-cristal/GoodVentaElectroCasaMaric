

var controlMenuWd=1;
function MeniWindows(){
	if(controlMenuWd==0){
		document.getElementById("divMenuWindowsB").style.display="none";
	document.getElementById("divCerrarSesion").style.display="none";
		document.getElementById("divAcercade").style.display="none";
		document.getElementById("divComodin1").style.display="none";
		document.getElementById("divComodin2").style.display="none";
		 $("div[id=divMenuWindowsB]").show(300);				
		 $("div[id=divMantenimiento]").fadeIn(500);
		 $("div[id=divAdministrativo]").fadeIn(500);
		 $("div[id=divConsultar]").fadeIn(500);
		 $("div[id=divReportes]").fadeIn(500);
		document.getElementById("lblTituloInicio").innerHTML="Inicio";
		 controlMenuWd=1
		 }else{
		document.getElementById("divMantenimiento").style.display="none";
		document.getElementById("divAdministrativo").style.display="none";
		document.getElementById("divConsultar").style.display="none";
		document.getElementById("divReportes").style.display="none";
		document.getElementById("divMenuWindowsB").style.display="none";
		$("div[id=divMenuWindowsB]").show(300);	
		$("div[id=divComodin1]").fadeIn(500);		 
		 $("div[id=divCerrarSesion]").fadeIn(500);
		 $("div[id=divAcercade]").fadeIn(500);		
		 $("div[id=divComodin2]").fadeIn(500);		
		controlMenuWd=0
		document.getElementById("lblTituloInicio").innerHTML="Menú";
	}
}


function separadordemilesnumero(input) {
    // Convertir a cadena y eliminar puntos existentes
    var num = input.toString().replace(/\./g, '');

    // Verificar si es un número válido
    if (!isNaN(num)) {
        // Verificar si es negativo
        var isNegative = num[0] === '-';
        if (isNegative) {
            num = num.substring(1); // Remover el signo negativo temporalmente
        }

        // Separar la parte entera de la decimal
        var num2 = num.toString().split('.');
        // Formatear la parte entera con separador de miles
        var thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g).join('.');
        // Formatear la parte decimal si existe
        var decimals = (num2[1]) ? ',' + num2[1] : '';

        // Revertir la parte entera y combinar con decimales
        var answer = thousands.split('').reverse().join('') + decimals;
        
        // Agregar el signo negativo si es necesario
        input = isNegative ? '-' + answer : answer;
    } else {
        // Manejo de entrada no numérica 
        //input.value=input.value.replace(/[^\d\.]*g,'');
        // así va antes de la /g */
    }
    return input;
}

 
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = now.getDate();
    day = day < 10 ? '0' + day : day;
    return year + '-' + month + '-' + day;
}




function ocultarMenusWindows(elemento){
document.getElementById(elemento).style.fontSize="";
}
function verMenusWindows(elemento){
document.getElementById(elemento).style.fontSize="18px";
}
function obtenerFechaActual(){
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	return f.getFullYear() + "-" + mes + "-" + dia;
}
function vaciar(txt){
	document.getElementById(txt).value="";
}

function verCerrarMenub(d){
	if(d=="0"){
		document.getElementById("divEfectoMantenimiento").className="magictime slideDown"
		document.getElementById("divMenuAcercade").className="magictime slideDown"
		
	 $("div[id=principalMenub]").fadeOut(500);
$("div[id=divMenuMantenimiento]").animate({ scrollTop:(0) },500);	 
	}


	if(d=="1"){
		document.getElementById("divMenuAcercade").style.display="none"
		document.getElementById("divMenuMantenimiento").style.display=""
		document.getElementById("principalMenub").style.display=""
		document.getElementById("divEfectoMantenimiento").className="magictime slideDownReturn"	
	

	//	$("div[id=divMenuMantenimiento]").fadeIn(500);	
		
	}
	if(d=="2"){
		 document.getElementById("divMenuMantenimiento").style.display="none"
		document.getElementById("divMenuAcercade").style.display=""
		document.getElementById("principalMenub").style.display=""
		document.getElementById("divMenuAcercade").className="magictime slideDownReturn"	
		
	}
}

function vercerrarOpciones(){
	if(document.getElementById("divVentanaUser").style.display==""){
		document.getElementById("divVentanaUser").style.display="none"		
	}else{
		$("div[id=divVentanaUser]").fadeIn(500);		
	}
}
function mueveReloj(){
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes()
    segundo = momentoActual.getSeconds()
  if(hora<10){
	  hora="0"+hora
  } 
  if(segundo<10){
	  segundo="0"+segundo
  }
  if(minuto<10){
	  minuto="0"+minuto
  }
    horaImprimible = hora + " : " + minuto + " : " + segundo
   // document.getElementById("inptreloj").value = horaImprimible
    document.getElementById("inptreloj2").innerHTML = horaImprimible
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('pfechaactual').innerHTML =dia+"/"+mes+"/"+ f.getFullYear();
    setTimeout("mueveReloj()",1000)
}

function verCerrarTemas(d){
	
	if(d=="1"){
	document.getElementById("divCambiarTemas").style.display="";	
 
	}else{
	//document.getElementById("divCambiarTemas").style.display="none";
 
	$("div[id=divCambiarTemas]").fadeOut(500);	
	
	}
}

var modulosBuscadorGlobal = {
	"ContenedorListado": "Listados",
	"ContenedorAdministrativo": "Administración",
	"ContenedorTesoreria": "Tesorería",
	"ContenedorInforme": "Informes",
	"ContenedorCobranza": "Cobranzas",
	"ContenedorVentas": "Ventas",
	"ContenedorGraficos": "Centro de datos",
	"ContenedorSistema": "Sistema"
};
var buscadorGlobalInicializado = false;
var indiceActivoBuscadorGlobal = -1;

function normalizarTextoBuscadorGlobal(valor) {
	var texto = String(valor || "").toLowerCase();
	return typeof texto.normalize === "function"
		? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		: texto;
}

function normalizarAccionBuscadorGlobal(valor) {
	var accion = String(valor || "").trim();
	var coincidencia = accion.match(/^([a-zA-Z_$][\w$]*)\s*\(/);
	return normalizarTextoBuscadorGlobal(coincidencia ? coincidencia[1] : accion.replace(/\s+/g, ""));
}

function claveModuloBuscadorGlobal(modulo) {
	return normalizarTextoBuscadorGlobal(modulo)
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function obtenerIndiceModulosBuscadorGlobal() {
	var indice = {};
	Object.keys(modulosBuscadorGlobal).forEach(function (idContenedor) {
		var contenedor = document.getElementById(idContenedor);
		if (!contenedor) return;

		var tarjetas = contenedor.querySelectorAll(".divMenub[onclick]");
		Array.prototype.forEach.call(tarjetas, function (tarjeta) {
			var accion = normalizarAccionBuscadorGlobal(tarjeta.getAttribute("onclick"));
			if (accion) indice[accion] = modulosBuscadorGlobal[idContenedor];
		});
	});
	return indice;
}

function decorarResultadoBuscadorGlobal(item, modulo) {
	var titulo = item.querySelector(".text-dark");
	if (!titulo) return;

	var contenido = titulo.parentNode;
	var cabecera = contenido.classList && contenido.classList.contains("buscador-resultado-cabecera")
		? contenido
		: contenido.querySelector(".buscador-resultado-cabecera");
	var etiqueta;
	if (!cabecera) {
		cabecera = document.createElement("div");
		cabecera.className = "buscador-resultado-cabecera";
		contenido.insertBefore(cabecera, titulo);
		cabecera.appendChild(titulo);

		etiqueta = document.createElement("span");
		etiqueta.className = "buscador-modulo-etiqueta";
		cabecera.appendChild(etiqueta);
	} else {
		etiqueta = cabecera.querySelector(".buscador-modulo-etiqueta");
	}

	if (etiqueta) etiqueta.textContent = modulo;
	item.classList.add("buscador-global-resultado");
	item.setAttribute("data-modulo", modulo);
	item.setAttribute("data-modulo-clave", claveModuloBuscadorGlobal(modulo));
	item.setAttribute("role", "option");
	item.setAttribute("tabindex", "-1");
	item.setAttribute("title", "Abrir " + titulo.textContent.trim() + " en " + modulo);
}

function abrirPanelBuscadorGlobal() {
	var dropdown = document.getElementById("dropdownMenuBuscador");
	var input = document.getElementById("searchInput");
	if (!dropdown || !input) return;
	dropdown.style.display = "block";
	input.setAttribute("aria-expanded", "true");
}

function cerrarPanelBuscadorGlobal() {
	var dropdown = document.getElementById("dropdownMenuBuscador");
	var input = document.getElementById("searchInput");
	if (!dropdown || !input) return;
	dropdown.style.display = "";
	input.setAttribute("aria-expanded", "false");
	indiceActivoBuscadorGlobal = -1;
	Array.prototype.forEach.call(
		document.querySelectorAll("#MenuBuscadorDetalle .is-keyboard-active"),
		function (item) { item.classList.remove("is-keyboard-active"); }
	);
}

function resultadosVisiblesBuscadorGlobal() {
	return Array.prototype.filter.call(
		document.querySelectorAll("#MenuBuscadorDetalle .list-group-item"),
		function (item) { return !item.hidden; }
	);
}

function activarResultadoBuscadorGlobal(indice) {
	var items = resultadosVisiblesBuscadorGlobal();
	if (!items.length) {
		indiceActivoBuscadorGlobal = -1;
		return;
	}

	if (indice < 0) indice = items.length - 1;
	if (indice >= items.length) indice = 0;
	indiceActivoBuscadorGlobal = indice;
	items.forEach(function (item, posicion) {
		item.classList.toggle("is-keyboard-active", posicion === indice);
	});
	items[indice].scrollIntoView({ block: "nearest" });
}

function filtrarBuscadorGlobal() {
	var input = document.getElementById("searchInput");
	var contador = document.getElementById("BuscadorResultado");
	var vacio = document.getElementById("buscadorGlobalVacio");
	var limpiar = document.getElementById("limpiarBuscadorGlobal");
	var items = document.querySelectorAll("#MenuBuscadorDetalle .list-group-item");
	if (!input || !contador || !vacio) return;

	var consulta = normalizarTextoBuscadorGlobal(input.value).trim();
	var totalCoincidencias = 0;
	var visibles = 0;
	Array.prototype.forEach.call(items, function (item) {
		var titulo = item.querySelector(".text-dark");
		var descripcion = item.querySelector(".text-muted");
		var modulo = item.getAttribute("data-modulo") || "";
		var contenido = normalizarTextoBuscadorGlobal(
			(titulo ? titulo.textContent : "") + " " +
			(descripcion ? descripcion.textContent : "") + " " + modulo
		);
		var coincide = !consulta || contenido.indexOf(consulta) !== -1;
		if (coincide) totalCoincidencias++;

		var mostrar = coincide && visibles < 15;
		item.hidden = !mostrar;
		if (mostrar) visibles++;
		item.classList.remove("is-keyboard-active");
	});

	indiceActivoBuscadorGlobal = -1;
	vacio.hidden = totalCoincidencias !== 0;
	if (limpiar) limpiar.hidden = input.value.length === 0;

	if (totalCoincidencias === 0) {
		contador.textContent = "0 resultados";
	} else if (totalCoincidencias > visibles) {
		contador.textContent = visibles + " de " + totalCoincidencias + " resultados";
	} else {
		contador.textContent = totalCoincidencias +
			(totalCoincidencias === 1 ? " resultado" : " resultados");
	}
}

function actualizarCatalogoBuscadorGlobal() {
	var indiceModulos = obtenerIndiceModulosBuscadorGlobal();
	var items = document.querySelectorAll("#MenuBuscadorDetalle .list-group-item");
	Array.prototype.forEach.call(items, function (item) {
		var accion = normalizarAccionBuscadorGlobal(item.getAttribute("onclick"));
		var modulo = indiceModulos[accion] || "Acceso global";
		decorarResultadoBuscadorGlobal(item, modulo);
	});
	filtrarBuscadorGlobal();
}

function inicializarBuscadorGlobal() {
	if (buscadorGlobalInicializado) return;

	var input = document.getElementById("searchInput");
	var dropdown = document.getElementById("dropdownMenuBuscador");
	var contenedor = document.getElementById("buscadorGlobalContenedor");
	var limpiar = document.getElementById("limpiarBuscadorGlobal");
	var lista = document.getElementById("MenuBuscadorDetalle");
	if (!input || !dropdown || !contenedor || !lista) return;
	buscadorGlobalInicializado = true;

	input.addEventListener("focus", function () {
		abrirPanelBuscadorGlobal();
		filtrarBuscadorGlobal();
	});
	input.addEventListener("input", function () {
		abrirPanelBuscadorGlobal();
		filtrarBuscadorGlobal();
	});
	input.addEventListener("keydown", function (evento) {
		if (evento.key === "ArrowDown") {
			evento.preventDefault();
			abrirPanelBuscadorGlobal();
			activarResultadoBuscadorGlobal(indiceActivoBuscadorGlobal + 1);
		} else if (evento.key === "ArrowUp") {
			evento.preventDefault();
			abrirPanelBuscadorGlobal();
			activarResultadoBuscadorGlobal(indiceActivoBuscadorGlobal - 1);
		} else if (evento.key === "Enter" && indiceActivoBuscadorGlobal >= 0) {
			evento.preventDefault();
			var activos = resultadosVisiblesBuscadorGlobal();
			if (activos[indiceActivoBuscadorGlobal]) activos[indiceActivoBuscadorGlobal].click();
		} else if (evento.key === "Escape") {
			evento.preventDefault();
			cerrarPanelBuscadorGlobal();
		}
	});

	if (limpiar) {
		limpiar.addEventListener("click", function () {
			input.value = "";
			input.focus();
			filtrarBuscadorGlobal();
		});
	}

	lista.addEventListener("click", function (evento) {
		var resultado = evento.target.closest ? evento.target.closest(".list-group-item") : null;
		if (resultado) cerrarPanelBuscadorGlobal();
	});

	document.addEventListener("click", function (evento) {
		if (!contenedor.contains(evento.target) && !dropdown.contains(evento.target)) {
			cerrarPanelBuscadorGlobal();
		}
	});

	actualizarCatalogoBuscadorGlobal();
}


window.onload = function () {
obtener_datos_user();
 
const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});


if (typeof history.pushState === "function") {
		history.pushState("jibberish", null, null);
		window.onpopstate = function () {
			history.pushState('newjibberish', null, null);
			// evento_atras();
			//volver_atras_pagina()
			// Handle the back (or forward) buttons here
			// Will NOT handle refresh, use onbeforeunload for this.
		};
	} else {
		var ignoreHashChange = true;
		window.onhashchange = function () {
			if (!ignoreHashChange) {
				ignoreHashChange = true;
				window.location.hash = Math.random();
				//evento_atras();
				//volver_atras_pagina()
				// Detect and redirect change here
				// Works in older FF and IE9
				// * it does mess with your hash symbol (anchor?) pound sign
				// delimiter on the end of the URL
			}
			else {
				ignoreHashChange = false;
			}
		};
	}
 sideBar.classList.add('close');
mueveReloj()

localStorage.setItem("saludo"+userid, "si");		
	
	buscar_datos_del_usuario();
eventoScrollTable(document.getElementById('TableScroollProductos2'));
eventoScrollTable(document.getElementById('TableScroollGastos2'));
eventoScrollTable(document.getElementById('TableScroollHistorialVenta2'));
eventoScrollTable(document.getElementById('TableScroollInformeDeudaCliente2'));
eventoScrollTable(document.getElementById('TableScroollHistorialVentaExpediente2'));
eventoScrollTable(document.getElementById('TableScroollHistorialVentaCanceladasExpediente2'));
eventoScrollTable(document.getElementById('TableScroollHistorialCompra2'));
eventoScrollTable(document.getElementById('TableScroollCuentasACobrar2'));
eventoScrollTable(document.getElementById('TableScroollGananciaPorVenta2'));
eventoScrollTable(document.getElementById('TableScroollMasReferencias2'));
eventoScrollTable(document.getElementById('TableScroollHistorialGarantia2'));
eventoScrollTable(document.getElementById('TableScroollCredito2'));
eventoScrollTable(document.getElementById('TableScroollArqeo2'));
eventoScrollTable(document.getElementById('TableScroollAudiProducto2'));
eventoScrollTable(document.getElementById('TableScroollEgresoIngresoCobradore2'));
scrollevents(document.getElementById('divMenuMantenimiento'));
var controlactualizacion=0;
var controlMensaje=0;
var controlPermisos = 0;
 var counter=setInterval(timer,1000);
		function timer(){
				if(controlactualizacion==60){
			controlactualizacion=0;
			var codigopc=localStorage.getItem("codpc");

if (codigopc == "undefined" || codigopc == "" || codigopc == "Null" || codigopc == null ) {	
   resgistrardispositivo()
   vercerrarventanactualizacion("1")
}else{
	controldeactualizacion(codigopc)
}
				}
			controlactualizacion=controlactualizacion+1;
			
			
			if(controlMensaje==20){
				if(controlUsuario==false){
					ir_a_login();
				}
			}
				
				if(controlMensaje==60){				 
					controlMensaje=0
					// buscarproductosDescuento()
					// buscarDescuentoInteres()
					// buscarDescuentoCredito()
					// buscarSolicitudAnulacionVenta()
				}
				
				if(controlPermisos == 300){
					controlPermisos=0;
					// obtener_permisos()
					// buscarDatosDash()
					// BuscarNotificaciones()
				}
				
			controlMensaje=controlMensaje+1;	
			
			controlPermisos++;
			
			}

	inicializarBuscadorGlobal();
}
function scrollevents(elemento) {
			
			
			$(elemento).on("scroll", function(){		
		 var scrollelemento=document.getElementById("divMenuMantenimiento").scrollTop;
  if (scrollelemento > 120 ) {
	
	$("table[id=divEncabezadofixed]").fadeIn(100)
  } else {
	document.getElementById('divEncabezadofixed').style.display='none';

  }		

});
}
function eventoScrollTable(elemento){
	$(elemento).on("scroll", function(){		
		 var desplamiento = $(elemento).scrollLeft();		
		 	if($(elemento).attr("id")=="TableScroollProductos2"){
			document.getElementById("TableScroollProductos1").scrollLeft=desplamiento
			}
			
			if($(elemento).attr("id")=="TableScroollGastos2"){
			document.getElementById("TableScroollGastos1").scrollLeft=desplamiento
			}
			
			if($(elemento).attr("id")=="TableScroollAudiProducto2"){
			document.getElementById("TableScroollAudiProducto1").scrollLeft=desplamiento
			}
			
			if($(elemento).attr("id")=="TableScroollHistorialVenta2"){
			document.getElementById("TableScroollHistorialVenta1").scrollLeft=desplamiento
			}
			
			if($(elemento).attr("id")=="TableScroollEgresoIngresoCobradore2"){
			document.getElementById("TableScroollEgresoIngresoCobradore1").scrollLeft=desplamiento
			}
			
			if($(elemento).attr("id")=="TableScroollInformeDeudaCliente2"){
			document.getElementById("TableScroollInformeDeudaCliente1").scrollLeft=desplamiento
			}
			
			if($(elemento).attr("id")=="TableScroollHistorialVentaExpediente2"){
			document.getElementById("TableScroollHistorialVentaExpediente1").scrollLeft=desplamiento
			}	
			if($(elemento).attr("id")=="TableScroollHistorialVentaCanceladasExpediente2"){
			document.getElementById("TableScroollHistorialVentaCanceladasExpediente1").scrollLeft=desplamiento
			}	
			if($(elemento).attr("id")=="TableScroollHistorialCompra2"){
			document.getElementById("TableScroollHistorialCompra1").scrollLeft=desplamiento
			}	
			if($(elemento).attr("id")=="TableScroollCuentasACobrar2"){
			document.getElementById("TableScroollCuentasACobrar1").scrollLeft=desplamiento
			}	
			if($(elemento).attr("id")=="TableScroollGananciaPorVenta2"){
			document.getElementById("TableScroollGananciaPorVenta1").scrollLeft=desplamiento
			}	
			if($(elemento).attr("id")=="TableScroollMasReferencias2"){
			document.getElementById("TableScroollMasReferencias1").scrollLeft=desplamiento
			}	
			if($(elemento).attr("id")=="TableScroollHistorialGarantia2"){
			document.getElementById("TableScroollHistorialGarantia1").scrollLeft=desplamiento
			}			
			if($(elemento).attr("id")=="TableScroollCredito2"){
			document.getElementById("TableScroollCredito1").scrollLeft=desplamiento
			}
			if($(elemento).attr("id")=="TableScroollArqeo2"){
			document.getElementById("TableScroollArqeo1").scrollLeft=desplamiento
			}					
			}); 
}
//buscar datos del usuario
var cod_localFKUSer="";
var niveluser="";
var cajapredeterminada="";
var accesosuser;
var ControlCobradorUser="";
var CodCobradorUser="";

var controlUsuario="";
var fotoPerfilSesionActual="";
var usuarioAccesoSesion="";
var perfilRequiereActualizacion=false;

function cerrarMenuPerfilSesion() {
	var contenedor = document.getElementById("menuPerfilSesion");
	var menu = document.getElementById("menuDesplegablePerfilSesion");
	if (!contenedor || !menu) return;
	contenedor.classList.remove("is-open");
	menu.classList.remove("show");
	var activadores = contenedor.querySelectorAll(".perfil-sesion-activador");
	for (var i = 0; i < activadores.length; i++) activadores[i].setAttribute("aria-expanded", "false");
}

function alternarMenuPerfilSesion(evento, activador) {
	if (evento) {
		evento.preventDefault();
		evento.stopPropagation();
	}
	var contenedor = document.getElementById("menuPerfilSesion");
	var menu = document.getElementById("menuDesplegablePerfilSesion");
	if (!contenedor || !menu) return false;
	var abrir = !contenedor.classList.contains("is-open");
	cerrarMenuPerfilSesion();
	if (abrir) {
		contenedor.classList.add("is-open");
		menu.classList.add("show");
		var activadores = contenedor.querySelectorAll(".perfil-sesion-activador");
		for (var i = 0; i < activadores.length; i++) activadores[i].setAttribute("aria-expanded", "true");
	}
	return false;
}

function activarMenuPerfilSesionConTeclado(evento, activador) {
	if (evento.key === "Enter" || evento.key === " ") alternarMenuPerfilSesion(evento, activador);
	if (evento.key === "Escape") {
		cerrarMenuPerfilSesion();
		activador.focus();
	}
}

document.addEventListener("click", function (evento) {
	var contenedor = document.getElementById("menuPerfilSesion");
	if (!contenedor) return;
	if (!contenedor.contains(evento.target)) cerrarMenuPerfilSesion();
	else if (evento.target.closest && evento.target.closest(".dropdown-item")) cerrarMenuPerfilSesion();
});

document.addEventListener("keydown", function (evento) {
	if (evento.key === "Escape") cerrarMenuPerfilSesion();
});

function buscar_datos_del_usuario() {	
	verCerrarEfectoCargando("1")
	//document.getElementById("divPresentacion").style.display = "none"
	 controlUsuario=false;
	obtener_datos_user();
	document.cookie = "user=" + userid + ";max-age=86400;path=/";
	document.cookie = "pass=" + passuser + ";max-age=86400;path=/";
	var datos = new FormData();
	datos.append("user", userid)
	datos.append("pass", passuser)
	datos.append("navegador", navegador)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/buscar_datos_usuario.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			// $("div[id=divPresentacion]").fadeOut(500);	
			verCerrarEfectoCargando("2")
			return false;
		},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
			//console.log(new Blob([Respuesta]).size)
			 
				// $("div[id=divPresentacion]").fadeOut(500);	
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos[1]
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					controlUsuario=true;
						verCerrarEfectoCargando("2")
						niveluser = datos["3"];
					var nombre = datos["2"];
						cod_localFKUSer = datos["4"];
						ControlCobradorUser = datos["6"];
						codEncargadoSolicitud = userid;
						CodCobradorUser = datos["7"];
						var fotoPerfilSesion = datos["8"] || "";
						fotoPerfilSesionActual = fotoPerfilSesion;
						usuarioAccesoSesion = datos["9"] || "";
						perfilRequiereActualizacion = fotoPerfilSesion === "";
						var imagenPerfilSesion = document.getElementById("imgFotoPerfilSesion");
						if (imagenPerfilSesion) {
							imagenPerfilSesion.src = fotoPerfilSesion
								? "/GoodVentaElectroCasaMaric/" + String(fotoPerfilSesion).replace(/^\/+/, "")
								: "/GoodVentaElectroCasaMaric/iconos/sinperfil.png";
							imagenPerfilSesion.alt = "Foto de perfil de " + nombre;
							imagenPerfilSesion.onerror = function () {
								this.onerror = null;
								this.src = "/GoodVentaElectroCasaMaric/iconos/sinperfil.png";
							};
						}
		accesosuser=datos["5"];  
		cajapredeterminada=buscar_datos_url_usuario('c');
		cajapredeterminada = cajapredeterminada.replace(/\D/g, '');
		
			if(accesosuser["CAMBIARCAJA"]["accion"]!="SI"){
				document.getElementById('inptcajaAperturaCierreCaja').disabled=true
	         }
			 
			if(accesosuser["MODIFICARNOMBREAPELLIDOCLIENTE"]["accion"]=="NO"){
				document.getElementById('inptNombreCliente').disabled=true
				document.getElementById('inptApellidoCliente').disabled=true
	         }

			if(accesosuser["VERTODOSSOLICITUDESDESPACHO"]["accion"]=="NO"){
				document.getElementById('inptFiltroLocalSolicitudDespacho').disabled=true
				document.getElementById('inptFiltroLocalSolicitudDespacho2').disabled=true
				document.getElementById('inptFiltroProductoSolicitudDespacho').disabled=true
	         }
			 
			 if(accesosuser["MODIFICARNROTELEFONOCLIENTE"]["accion"]=="NO"){
				document.getElementById('inptNroTelefCliente').disabled=true
				document.getElementById('inptNrowhatsappCliente').disabled=true
	         }
			 
			if(accesosuser["MODIFICARNRODOCUMENTOCLIENTE"]["accion"]=="NO"){
				document.getElementById('inptNroDocCliente').disabled=true
				document.getElementById('inptNroRucCliente').disabled=true
	         }
			 
			 if(accesosuser["CAMBIARTIPOCLIENTE"]["accion"]=="NO"){
				document.getElementById('inptTipoCliente').disabled=true
	         }
			 
			  if(accesosuser["ACTIVARFECHAINFORCONF"]["accion"]=="NO"){
	         document.getElementById('inptFechaEntradaInformconf').disabled=true
	         } 
			 
			 if(accesosuser["CAMBIARFECHAINGRESOEGRESOADMINISTRATIVO"]["accion"]=="NO"){
	         document.getElementById('inptFechaEgresoIngresoAdministrativo').disabled=true
	         } 
			 
			 if(accesosuser["CAMBIARFECHAINGRESOEGRESOJUAN"]["accion"]=="NO"){
	         document.getElementById('inptFechaEgresoIngresoJuan').disabled=true
	         } 
			 
			 
			 
		 buscarVendedorSelec() 
		 buscarVendedorSelecSolo()

					document.getElementById('spNombreLogin').innerHTML = nombre
					document.getElementById('ptituloUser2').innerHTML = nombre
					document.getElementById('lblUser').innerHTML = nombre
					document.getElementById('pUsuarioCabecera').innerHTML = nombre
					document.getElementById('pCajeraVenta').innerHTML = "("+nombre+")"
						document.getElementById("bNombreUser").innerHTML=nombre	
						document.getElementById("inptNombreMisDatos").value=nombre	
        
			
			  document.cookie = "caja=" + cajapredeterminada  +";max-age=86400;path=/";		
// obtener_permisos()			  
	          limpiarcamposventa() 
					removeToMenu()
					if (typeof generarAccesosDirectosAdministrativo === "function") {
						generarAccesosDirectosAdministrativo();
					}
					actualizarCatalogoBuscadorGlobal();
					buscarabmProfesionOption()
					buscarabmCasaOption()
					buscarabmCasaOptionCuentas()
					BuscarOptionUsuario()
					BuscarOptionUsuarioTipoCallCenter()
					BuscarOptionUsuarioTipoCallCenterVenta()
					buscarCobradorSelec()
					BuscarSelecDescripcionArregloGastoEgresoIngreso()
					buscarCobradorSelecZona()
					buscarabmUsuarioOption()
					BuscarNotificaciones()
					BuscarSelectEstadosClientesTrabajados()
					buscarSelectAuditoriaProducto()
					buscarConceptoChequeACobrar()
					BuscarSelecDescripcionLocalEgresoIngresoJuan()
					BuscarSelecDescripcionLocalEgresoIngresoAdministrativo()
					BuscarSelecDescripcionBancoEgresoIngresoJuan()
					buscarDescripcionArchivoFuncionario()
					BuscarSelecDescripcionTipoMovimiento()
					BuscarSelecDescripcionCargaArchivoGeneral()
					BuscarAbmSeleccionarBusquedaEgresosTotalLocal()
					BuscarSelecRangoCalificacionCobrador()
					buscarVendedorControlCalificacionSelec()
					BuscarSelecRangoCalificacionVendedor()
buscarabmZonaOption()
BuscarSelecDescripcionTipoAgendaPersonal()
// buscarabmZonaOptionNuevoCliente()
BuscarSelecDescripcionArregloEgresoIngresoJuan()
BuscarSelecDescripcionArregloEgresoIngresoAdministrativo()
BuscarSelecDescripcionBancoEgresoIngresoAdministrativo()
BuscarSelecDescripcionEstadoInformeCumple()
BuscarSelectMarca()
BuscarSelecttipo_detalle_vehiculo()
BuscarSelecCategoria()
BuscarNivelesSelect()
buscarDescripcionArchivoPedidoProveedor();
buscarTipoPagoOption()
// Modulo gerencial retirado de la pantalla principal: no cargar paneles vacios al iniciar.
buscaroptionBanco()
buscaroptionMotivoEgresoIngreso()
buscarDescripcionFoto()
buscarDescripcionUbicacion()
buscarDescripcionArchivoCliente()
buscarMotivoMovimientoStock()
// buscarDataListCliente()
buscaroptionMoraCliente();
buscarOptionCliente()
buscarOptionMoraCobrosRealizados()
BuscarAbmTipoBusqueda()
BuscarAbmTipoBusquedaCredito()
BuscarAbmTipoBusquedaInformeCuentasACobrar()
buscarConcepto()
buscarDatosEmpresa()
buscarSectorVendedorOption()
buscaroptionMotivoEgresoIngresoJuan()
buscaroptionMotivoEgresoIngresoAdministrativo()
BuscarSelectEstadoClienteCallCenter()
BuscarSelectEstadoClienteCallCenterVenta()
buscarabmOptionCargoFuncionario()
buscarProveedorSelec()
buscarAdminLocalesSelec();
buscarSelectDescripcionFotosCalificacionEntrega()
buscar_opciones_filtro_local_info_vendedores()
buscar_opciones_filtro_seccion_info_vendedores()
buscar_opciones_filtro_vendedor_info_vendedores()
buscar_opciones_filtro_local_info_cobradores()
buscar_opciones_filtro_cobrador_info_cobradores()
 buscarCobradorSelecCalificacionEntrega()
 BuscarSelecDescripcionBancoLiquidez()
if (perfilRequiereActualizacion) {
	setTimeout(function () {
		if (perfilRequiereActualizacion && typeof verCerrarMisDatos === "function") {
			verCerrarMisDatos("1");
		}
	}, 1200);
}
var saludo=localStorage.getItem("saludo"+userid);
if(saludo=="si"){
	
verCerrarSaludo(nombre)
}

var codigopc=localStorage.getItem("codpc");

if (codigopc == "undefined" || codigopc == "" || codigopc == "Null" || codigopc == null ) {	
   resgistrardispositivo()
   vercerrarventanactualizacion("1")
}else{
	controldeactualizacion(codigopc)
}



				}else{
					ir_a_login()
				}
try {				
			}catch (error) {
					ir_a_login()
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


let hexToRgba = function(hex, opacity) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let rgb = result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;

  return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
};
/**
 *
 */
 
 
$(document).ready(function() {
  /** Constant div card */
  const DIV_CARD = 'div.cardtb';

  /** Initialize tooltips */
  $('[data-toggle="tooltip"]').tooltip();

  /** Initialize popovers */
  $('[data-toggle="popover"]').popover({
    html: true
  });

  /** Function for remove card */
  $('[data-toggle="card-remove"]').on('click', function(e) {
    let $card = $(this).closest(DIV_CARD);

    $card.remove();

    e.preventDefault();
    return false;
  });

  /** Function for collapse card */
  $('[data-toggle="card-collapse"]').on('click', function(e) {
    let $card = $(this).closest(DIV_CARD);

    $card.toggleClass('card-collapsed');

    e.preventDefault();
    return false;
  });

  /** Function for fullscreen card */
  $('[data-toggle="card-fullscreen"]').on('click', function(e) {
    let $card = $(this).closest(DIV_CARD);

    $card.toggleClass('card-fullscreen').removeClass('card-collapsed');

    e.preventDefault();
    return false;
  });

  /**  */
  if ($('[data-sparkline]').length) {
    let generateSparkline = function($elem, data, params) {
      $elem.sparkline(data, {
        type: $elem.attr('data-sparkline-type'),
        height: '100%',
        barColor: params.color,
        lineColor: params.color,
        fillColor: 'transparent',
        spotColor: params.color,
        spotRadius: 0,
        lineWidth: 2,
        highlightColor: hexToRgba(params.color, .6),
        highlightLineColor: '#666',
        defaultPixelsPerValue: 5
      });
    };

    require(['sparkline'], function() {
      $('[data-sparkline]').each(function() {
        let $chart = $(this);

        generateSparkline($chart, JSON.parse($chart.attr('data-sparkline')), {
          color: $chart.attr('data-sparkline-color')
        });
      });
    });
  }

  /**  */
  if ($('.chart-circle').length) {
    require(['circle-progress'], function() {
      $('.chart-circle').each(function() {
        let $this = $(this);

        $this.circleProgress({
          fill: {
            color: tabler.colors[$this.attr('data-color')] || tabler.colors.blue
          },
          size: $this.height(),
          startAngle: -Math.PI / 4 * 2,
          emptyFill: '#F4F4F4',
          lineCap: 'round'
        });
      });
    });
  }
});

	
function buscarDatosDash() {

			
	if(controlaccesoDescuento("VERCENTROINFORMACION","accion")==false){return;}	
	
	document.getElementById("divCentroInfoPrincipal").style.display="";
	document.getElementById("divCentroInfoPrincipalDash").style.display="";
	
	var local=document.getElementById("inptlocaluserDash").value;
	var tipo=document.getElementById("inptTipoVentauserDash").value;

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"local": local,
		"tipo": tipo,
		"funt": "buscarDatosDash"
		
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			 
			controldebusquedadInventario=false
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
					var datos_buscados3 = datos[3];
					var datos_buscados4 = datos[4];
					var datos_buscados5 = datos[5];
					var datos_buscados6 = datos[6];
					var datos_buscados7 = datos[7];
					var datos_buscados8 = datos[8];
					var datos_buscados9 = datos[9];
					var datos_buscados10 = datos[10];
					var datos_buscados11 = datos[11];
					var datos_buscados12 = datos[12];
 
					var elemento = document.getElementById('HtotalVentaTitulo');
						elemento.innerText = "TOTAL VENTA - "+ (datos_buscados9);
						
						 var elemento2 = document.getElementById('HtotalCobroTitulo');
						elemento2.innerText = "TOTAL COBRO - "+(datos_buscados9);
					
					
						var elemento = document.getElementById('HtotalVenta');
						elemento.innerText = separadordemilesnumero(datos_buscados);
						
						 var elemento2 = document.getElementById('HtotalCobro');
						elemento2.innerText = separadordemilesnumero(datos_buscados3);
						
						
						
						var elemento4 = document.getElementById('HtotalVenta2');
						elemento4.innerText = datos_buscados7+"-"+datos_buscados8+": "+separadordemilesnumero(datos_buscados5);
						
						 var elemento5 = document.getElementById('HtotalCobro2');
						elemento5.innerText =datos_buscados7+"-"+datos_buscados8+": "+ separadordemilesnumero(datos_buscados6);
						
						
						 var elemento3 = document.getElementById('HSolicitudPendiente');
						elemento3.innerText = datos_buscados4;
					
				var Resultado1= (datos_buscados * 100 ) / datos_buscados5
				var Resultado2= (datos_buscados3 * 100 ) / datos_buscados6
				
				
				var elemento6 = document.getElementById('MetastotalVenta2');
						elemento6.innerText = "Metas: "+ separadordemilesnumero(datos_buscados10);
						
						var elemento7 = document.getElementById('MetastotalVenta');
						elemento7.innerText ="Venta: "+ separadordemilesnumero(datos_buscados);
						
						var Resultado3= (datos_buscados * 100 ) / datos_buscados10
				

				/* CALCULO CHEQUES */
				let total_pagadoCheque = datos_buscados11[1];
				let total_pendienteCheque = datos_buscados11[0];
				document.getElementById('ChequestotalPagado').innerText = "Pagado: "+ separadordemilesnumero(total_pagadoCheque);
				document.getElementById('ChequestotalPendiente').innerText = "Pendiente: "+ separadordemilesnumero(total_pendienteCheque);
				
				let sumaTotalCheque = total_pendienteCheque + total_pagadoCheque
				var Resultado4= (total_pendienteCheque / sumaTotalCheque ) * 100;

				
				document.getElementById("divProgresbarVenta").style = '--value: '+Resultado1.toFixed(0); +';width: 100%;'	
				document.getElementById("divProgresbarcobros").style = '--value: '+Resultado2.toFixed(0); +';width: 100%;'	
				document.getElementById("divProgresbarpedido").style = '--value: '+datos_buscados4+';width: 100%;'	
					document.getElementById("divProgresbarMetasVenta").style = '--value: '+Resultado3.toFixed(0); +';width: 100%;'	
					document.getElementById("divProgresbarCheques").style = '--value: '+Resultado4.toFixed(0); +';width: 100%;'		
		
					
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


 

function verCerrarSaludo(Nombre){
	
	 
	
	var nombreUsuarioAcceso=document.getElementById("bNombreUser").innerHTML
	
	if(nombreUsuarioAcceso=="SIN USUARIO"){
		window.location="/GoodVentaElectroCasaMaric/system/login.html";
	}
	
	var control=0
	 var counter=setInterval(timer,1000);
			function timer(){
				if(control==1){
				var	 horafecha = new Date()
   var hora = horafecha.getHours()
   if(hora<12){
var saludo="Que tengas un lindo día";  
}
 if(hora>12 && hora<18){
var saludo="Que tengas una linda tarde";  

}
if(hora>18 && hora<24){
var saludo="Que tengas una linda noche";  

}
						document.getElementById("divSaludoGoodSystem").style.display=""	
	document.getElementById("spanSaludo").innerHTML=saludo	
	document.getElementById("spanMensaje").innerHTML="Un gusto volver a verte"	

	 document.getElementById("pEfectoSaludo").className="tbInfoSaludo magictime slideLeftReturn"
				}
				
					if(control==9){
						document.getElementById("pEfectoSaludo").className="tbInfoSaludo magictime slideLeft"
document.getElementById("divSaludoGoodSystem").style.display="none"	
				}
				if(control==10){
						clearTimeout(timer)
						localStorage.setItem("saludo"+userid, "");	 
				}
			control=control+1;
			}

}


function obtener_permisos() {	
	obtener_datos_user();
	
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "obtener_permisos")
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMListadoacceso.php",
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

				var datos = $.parseJSON(Respuesta);
				Respuesta = datos[1]
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					
 accesosuser=datos["2"];   
				}
try {				
			}catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

var codigodeactualizacion="X-GT-1-JMTG-V5.10";
function controldeactualizacion(codigopc) {	
	obtener_datos_user()
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("codigopc", codigopc)
	datos.append("codigodeactualizacion", codigodeactualizacion)
	datos.append("funt", "asistenciadeactualizacion")
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/system.php",
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
	
			return false;
		},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
		
				if (Respuesta == "exito") {
				var control = datos["2"];
				if(control=="no"){
					  vercerrarventanactualizacion("1")
				}
				}
			} catch (error) {
           console.log(error)
			}
		}
	});
}
function resgistrardispositivo(codigopc) {	
	obtener_datos_user()
	var codigopc=stringGenerador(20)	
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("codigopc", codigopc)
	datos.append("funt", "registrardispositivo")
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/system.php",
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
	
			return false;
		},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];			
				if (Respuesta == "exito") {
				localStorage.setItem("codpc",codigopc);
				vercerrarventanactualizacion("1")
				}
			} catch (error) {
           console.log(error)
			}
		}
	});
}
function resgistraractualizacion(datos) {	
	obtener_datos_user()
	datos.innerHTML="Comprobando datos...."
	var codigopc=localStorage.getItem("codpc");
	if (codigopc == "undefined" || codigopc == "" || codigopc == "Null" || codigopc == null ) {	
	location.reload(true)
	Cache.delete()
    return
    }
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("codigopc", codigopc)
	datos.append("funt", "registraractualizacion")
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/system.php",
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
	
			return false;
		},
		success: function (responseText) {
			Respuesta = responseText;
		
			location.reload(true)
			window.parent.caches.delete()
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];			
				if (Respuesta == "exito") {
				
				}
			} catch (error) {
           console.log(error)
			}
		}
	});
}
function stringGenerador(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

var temaActual="";
function CambiarTema(d){
	obtener_datos_user();
	 localStorage.setItem("tema"+userid, d);	 
	 if(d=="white"){
	$("link[id=cssTema]").attr("href","/GoodVentaElectroCasaMaric/css_system/inicio.css")
}
if(d=="black"){
	$("link[id=cssTema]").attr("href","/GoodVentaElectroCasaMaric/css_system/inicioblack.css")
}
if(d=="azul"){
	$("link[id=cssTema]").attr("href","/GoodVentaElectroCasaMaric/css_system/inicioazul.css?X-IOSV.03")
}
if(d=="crema"){
	$("link[id=cssTema]").attr("href","/GoodVentaElectroCasaMaric/css_system/inicioanaranjado.css?X-IOSV.03")
}
if(d=="rosado"){
	$("link[id=cssTema]").attr("href","/GoodVentaElectroCasaMaric/css_system/iniciorosado.css?X-IOSV.03")
}
if(d=="iniciogrisazul"){
	$("link[id=cssTema]").attr("href","/GoodVentaElectroCasaMaric/css_system/iniciogrisazul.css?X-IOSV.03")
}
ver_vetana_informativa("SE HA CAMBIADO EL TEMA")
}
var FondoActual="";
function CambiarFondo(d){
	obtener_datos_user();
	 localStorage.setItem("fondo"+userid, d);	 
	  localStorage.setItem("fondourl"+userid, "");	
	  document.getElementById("inptUrlFondo").value=""
if(d=="fondo"){
document.getElementById("imgFondoSytem1").src="/GoodVentaElectroCasaMaric/iconos/fondo.jpg"
document.getElementById("imgFondoSytem2").src="/GoodVentaElectroCasaMaric/iconos/fondo.jpg"
	
}
if(d=="fondo2"){
	
	document.getElementById("imgFondoSytem1").src="/GoodVentaElectroCasaMaric/iconos/fondo2.jpg"
document.getElementById("imgFondoSytem2").src="/GoodVentaElectroCasaMaric/iconos/fondo2.jpg"
}
if(d=="fondo3"){
	
document.getElementById("imgFondoSytem1").src="/GoodVentaElectroCasaMaric/iconos/fondo3.jpg"
document.getElementById("imgFondoSytem2").src="/GoodVentaElectroCasaMaric/iconos/fondo3.jpg"
}
ver_vetana_informativa("SE HA CAMBIADO EL FONDO")
}	
function guardarFondoPerzonalizado(){
	
	var fondo=document.getElementById("inptUrlFondo").value
	 localStorage.setItem("fondourl"+userid, fondo);	
	 document.getElementById("imgFondoSytem1").src=fondo
document.getElementById("imgFondoSytem2").src=fondo
ver_vetana_informativa("SE HA CAMBIADO EL FONDO")
}
		/*
CERRAR SESION 
*/

function cerrarSesion(){
	var control=0
	document.getElementById("btitulocargarinicio").innerHTML=" Cerrando..."
	// document.getElementById("divPresentacion").style.display=""
	 
	document.getElementById("spanSaludo").innerHTML=""	
	document.getElementById("spanMensaje").innerHTML="Hasta pronto "	
	document.getElementById("divSaludoGoodSystem").style.display=""		
	document.getElementById("pEfectoSaludo").className="tbInfoSaludo magictime slideLeftReturn"
	 var counter=setInterval(timer,1000);
			function timer(){
			if(control==3){
				cerrarSesion2()
			}
			control=control+1;
			}
	

		
	
	
}
function cerrarSesion2() {
	verCerrarEfectoCargando("1")	
	document.cookie = "user=;max-age=86400;path=/";
	document.cookie = "pass=;max-age=86400;path=/";
	obtener_datos_user()
	var datos = new FormData();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/cerrarsesion.php",
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
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			verCerrarEfectoCargando("2")
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
					
				ir_a_login()
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
MENU 
*/


/*
AUDITORIA
*/
function verCerrarAuditoria(d){
	
	
	if(d=="1"){
	document.getElementById("divAuditoria").style.display="";	
	  //  
	}else{
	//  
	$("div[id=divAuditoria]").fadeOut(500);	
	
	}
}
