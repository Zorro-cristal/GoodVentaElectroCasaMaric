/*
ABM VEHICULOS
*/

function verCerrarAbmVehivulos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmVehivulos").style.display==""){
		document.getElementById("divMinimizadoListadoVehivulos").style.display="none"	
		limpiarcamposbuscarVehivulos()
		limpiarcamposVehivulos()
//  
	$("div[id=divAbmVehivulos]").fadeOut(500);	
	}else{		
	if(controlacceso("VERLISTADOVEHICULOS","accion")==false){return;}
	mostrarSoloUno("divAbmVehivulos")	
		document.getElementById("divAbmVehivulos").style.display=""
//  
		
	}
}


function limpiarcamposbuscarVehivulos(){
	document.getElementById('inptBuscarVehivulos1').value=""
	document.getElementById('inptBuscarVehivulos2').value=""
	document.getElementById('inptBuscarVehivulos3').value=""
	document.getElementById('inptBuscarVehivulos4').value=""
	if (listadoAbmVehivulos) listadoAbmVehivulos.establecerRegistros([])
	else document.getElementById("table_abm_Vehivulos").innerHTML=""
	document.getElementById("inptRegistroNroVehivulos").value="";
}

function minimizarabmVehivulos(){
//  
	$("div[id=divAbmVehivulos]").fadeOut(500);
	document.getElementById("divMinimizadoListadoVehivulos").style.display=""	
	copiarBotonEnContenedor(document.getElementById("divMenuAbmVehiculos"));
}

function verCerrarVentanaAbmVehivulos(d, l) {
	if (d == "1") {
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADOVehivulosES","accion")==false){return;}
			limpiarcamposVehivulos()
		}
		$("div[id=divAbmVehivulos2]").fadeIn(250)
		document.getElementById('divAbmVehivulos1').style.display = "none"
	} else {
		$("div[id=divAbmVehivulos1]").fadeIn(250)
		document.getElementById('divAbmVehivulos2').style.display = "none"
	}
}
function verVentanaEditarVehivulos() {
	// if(controlacceso("EDITARLISTADOVehivulosES","accion")==false){return;}
	if (idAbmVehivulos == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmVehivulos("1", "2")
}
var idAbmVehivulos = ""
function obtenerdatosabmVehivulos(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreVehivulos').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccVehivulos').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptDescripcionVehivulos').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptChapaVehivulos').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptLocalVehivulos').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptEstadoVehivulos').value = $(datostr).children('td[id="td_datos_5"]').html();
	idAbmVehivulos = $(datostr).children('td[id="td_id"]').html();
	
	 $("div[id=imgFotoPerfil1Vehivulos]").css({"background-image":"url("+$(datostr).children('td[id="td_datos_6"]').html()+")"})
	
	document.getElementById('btnAbmVehivulos').value = "Editar Datos"; 
	document.getElementById('btnEditarVehivulos').style.backgroundColor="#673ab7";
}
function verificarcamposVehivulos() {
	var inptNombreVehivulos = document.getElementById('inptNombreVehivulos').value
	var inptDescripcionVehivulos = document.getElementById('inptDescripcionVehivulos').value
	var inptChapaVehivulos = document.getElementById('inptChapaVehivulos').value
	var inptLocalVehivulos = document.getElementById('inptLocalVehivulos').value
	var inptEstadoVehivulos = document.getElementById('inptEstadoVehivulos').value
	if (inptNombreVehivulos == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL VEHICULO")
		return false;
	}
	if (inptChapaVehivulos == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE CHAPA")
		return false;
	}

	var accion = "";
	if (idAbmVehivulos != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADOVehivulosES","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADOVehivulosES","accion")==false){return;}
	}
	
	abmVehivulos(inptLocalVehivulos,inptNombreVehivulos, inptDescripcionVehivulos, inptChapaVehivulos, inptEstadoVehivulos, idAbmVehivulos, accion);
}

 
function abmVehivulos(local,nombre, descripcion,  chapa , estado, idAbmVehivulos, accion) {
		
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("nombre", nombre)
	datos.append("descripcion", descripcion)
	datos.append("chapa", chapa)
	datos.append("estado", estado)
	datos.append("idAbmVehivulos", idAbmVehivulos)
	datos.append("fotovehiculo", fotoperfilVehivulos)
	datos.append("lafoto", fotoperfilVehivulos)
	datos.append("extperfilVehivulos", extperfilVehivulos)
	datos.append("local", local)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
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
					limpiarcamposVehivulos()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmVehivulos = ""
					buscarabmVehivulos()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function checkestadoVehivulos(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarVehivulos1').checked=true
		document.getElementById('inptSeleccEstadoBuscarVehivulos2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarVehivulos1').checked=false
		document.getElementById('inptSeleccEstadoBuscarVehivulos2').checked=true
	}
}

var listadoAbmVehivulos = null;
function inicializarListadoAbmVehivulos() {
	if (!window.AbmListadoCore) return;
	var formulario = document.getElementById('divAbmVehivulos1');
	var cuerpo = document.getElementById('table_abm_Vehivulos');
	var cabecera = formulario ? formulario.querySelector('.tableCabeceraRegistro tr') : null;
	if (!cuerpo || !cabecera) return;
	if (cuerpo.dataset.abmCoreAislado !== '1' && cuerpo.parentNode) {
		var cuerpoAislado = cuerpo.cloneNode(true);
		cuerpoAislado.dataset.abmCoreAislado = '1';
		cuerpo.parentNode.replaceChild(cuerpoAislado, cuerpo);
		cuerpo = cuerpoAislado;
	}
	cabecera.id = 'cabeceraAbmVehivulos';
	var opciones = formulario.querySelector('.abm-estandar-menu-columnas');
	if (opciones) opciones.id = 'opcionesColumnasVehivulos';
	if (!listadoAbmVehivulos) {
		listadoAbmVehivulos = window.AbmListadoCore.crear({
			nombre: 'vehivulos',
			idCabecera: 'cabeceraAbmVehivulos',
			idCuerpo: 'table_abm_Vehivulos',
			idOpcionesColumnas: 'opcionesColumnasVehivulos',
			ordenable: true,
			ordenInicial: 'nombre',
			columnas: [
				{ campo: 'codigo', titulo: '#', ancho: '10%' },
				{ campo: 'nombre', titulo: 'NOMBRE', ancho: '20%' },
				{ campo: 'descripcion', titulo: 'DESCRIPCION', ancho: '30%' },
				{ campo: 'chapa', titulo: 'CHAPA', ancho: '20%' },
				{ campo: 'local', titulo: 'LOCAL', ancho: '20%' }
			],
			fila: {
				funcionSeleccion: 'obtenerdatosabmVehivulos',
				celdas: [
					{ id: 'td_id', columna: 'codigo', campo: 'codigo' },
					{ id: 'td_datos_1', columna: 'nombre', campo: 'nombre' },
					{ id: 'td_datos_2', columna: 'descripcion', campo: 'descripcion' },
					{ id: 'td_datos_3', columna: 'chapa', campo: 'chapa' },
					{ id: 'td_datos_4', columna: 'local', campo: 'local' },
					{ id: 'td_datos_5', tecnica: true, campo: 'estado' },
					{ id: 'td_datos_6', tecnica: true, campo: 'url' },
					{ id: 'td_datos_7', tecnica: true, campo: 'codigo_local' }
				]
			}
		});
	}
	listadoAbmVehivulos.iniciar();
}

function programarListadoAbmVehivulos() {
	setTimeout(inicializarListadoAbmVehivulos, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmVehivulos);
else programarListadoAbmVehivulos();


function buscarabmVehivulos() {
// if(controlacceso("BUSCARLISTADOVehivulosES","accion")==false){return;}
	var nombre = document.getElementById('inptBuscarVehivulos1').value
	var descripcion = document.getElementById('inptBuscarVehivulos2').value
	var chapa = document.getElementById('inptBuscarVehivulos3').value
	var local = document.getElementById('inptBuscarVehivulos4').value 
	var estado =""
	if(document.getElementById('inptSeleccEstadoBuscarVehivulos1').checked==true){
		estado ="Activo"
	}else{
		estado ="Inactivo"
	}
	document.getElementById("table_abm_Vehivulos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nombre": nombre,
		"descripcion": descripcion,
		"chapa": chapa,
		"estado": estado,
		"local": local, 
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Vehivulos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Vehivulos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
					inicializarListadoAbmVehivulos()
					listadoAbmVehivulos.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptRegistroNroVehivulos").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function limpiarcamposVehivulos() {
	document.getElementById('inptNombreVehivulos').value=""
	document.getElementById('inptDescripcionVehivulos').value=""
	document.getElementById('inptChapaVehivulos').value=""
	document.getElementById('inptLocalVehivulos').value=""
 
	document.getElementById('btnAbmVehivulos').value = "Guardar Datos";
	document.getElementById('inptEstadoVehivulos').value = "Activo";
	document.getElementById('btnEditarVehivulos').style.backgroundColor = "#b7b7b7"; 
	idAbmVehivulos = ""; 
	$("div[id=imgFotoPerfil1Vehivulos]").css({ "background-image": "url(/GoodVentaElectroCasaMaric/iconos/sinperfil.png)" })
	fotoperfilVehivulos=""
	extperfilVehivulos=""
}


function ExploradorImagenperfilVehivulos(){	
$("input[name=file_perfilVehivulos]").click();
}


var fotoperfilVehivulos="";
var extperfilVehivulos="";
var file_extensionperfilVehivulos="";

function readFilePerfilVehivulos(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extensionperfilVehivulos=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extensionperfilVehivulos=="jpeg") || (file_extensionperfilVehivulos=="jpg") || (file_extensionperfilVehivulos=="png") ){
}else{
ver_vetana_informativa("LA FOTO SELECCIONADO NO ES JPEG")
return false;
}
var reader = new FileReader();
reader.onload = function(e){ 

	extperfilVehivulos=file_extensionperfilVehivulos;
fotoperfilVehivulos=e.target.result;
 $("div[id=imgFotoPerfil1Vehivulos]").css({"background-image":"url("+fotoperfilVehivulos+")"})
  
}
reader.readAsDataURL(input.files[0]);
}




// DATOS VEHICULOS 
var listadoDetalleVehiculos = null;
var listadoKilometrajeVehiculos = null;

function obtenerCabeceraVehiculos(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo);
	if (!cuerpo) return null;
	var anterior = cuerpo.previousElementSibling;
	while (anterior) {
		if (anterior.tagName === 'TABLE' && anterior.classList.contains('tableCabeceraRegistro') && !anterior.querySelector('input, select, textarea')) {
			var fila = anterior.querySelector('tr');
			if (fila) fila.id = idCabecera;
			return fila;
		}
		anterior = anterior.previousElementSibling;
	}
	return null;
}

function iniciarListadoDetalleVehiculos() {
	if (listadoDetalleVehiculos || !window.AbmListadoCore) return listadoDetalleVehiculos;
	if (!obtenerCabeceraVehiculos('table_abm_DetalleVehivulos', 'cabeceraDetalleVehiculos')) return null;
	listadoDetalleVehiculos = window.AbmListadoCore.crear({
		nombre: 'detalleVehiculos',
		idCabecera: 'cabeceraDetalleVehiculos',
		idCuerpo: 'table_abm_DetalleVehivulos',
		ordenInicial: 'fecha',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '5%' },
			{ campo: 'detalle', titulo: 'DETALLE', ancho: '15%' },
			{ campo: 'observacion', titulo: 'OBSERVACION', ancho: '15%' },
			{ campo: 'fecha', titulo: 'FECHA', ancho: '10%' },
			{ campo: 'precio', titulo: 'COSTO', ancho: '10%' },
			{ campo: 'kilometro_inicio', titulo: 'KM. INICIO', ancho: '10%' },
			{ campo: 'kilometro_fin', titulo: 'KM. FIN', ancho: '10%' },
			{ campo: 'encargado', titulo: 'ENCARGADO', ancho: '15%' },
			{ campo: 'estado_registro', titulo: 'ESTADO', ancho: '10%' }
		],
		fila: {
			funcionSeleccion: 'ObtenerdatosAbmDetalleVehivulos',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo' },
				{ id: 'td_datos_1', campo: 'detalle', columna: 'detalle' },
				{ id: 'td_datos_2', campo: 'observacion', columna: 'observacion' },
				{ id: 'td_datos_3', campo: 'fecha', columna: 'fecha' },
				{ id: 'td_datos_4', campo: 'precio_formateado', columna: 'precio' },
				{ id: 'td_datos_5', campo: 'kilometro_inicio_formateado', columna: 'kilometro_inicio' },
				{ id: 'td_datos_6', campo: 'kilometro_fin_formateado', columna: 'kilometro_fin' },
				{ id: 'td_datos_7', campo: 'encargado', columna: 'encargado' },
				{ id: 'td_datos_8', campo: 'estado_registro', columna: 'estado_registro' },
				{ id: 'td_datos_9', campo: 'estado', tecnica: true },
				{ id: 'td_datos_10', campo: 'codigo_tipo_detalle', tecnica: true },
				{ id: 'td_datos_11', campo: 'codigo_encargado', tecnica: true }
			]
		}
	});
	listadoDetalleVehiculos.iniciar();
	return listadoDetalleVehiculos;
}

function iniciarListadoKilometrajeVehiculos() {
	if (listadoKilometrajeVehiculos || !window.AbmListadoCore) return listadoKilometrajeVehiculos;
	if (!obtenerCabeceraVehiculos('table_abm_Kilometraje', 'cabeceraKilometrajeVehiculos')) return null;
	listadoKilometrajeVehiculos = window.AbmListadoCore.crear({
		nombre: 'kilometrajeVehiculos',
		idCabecera: 'cabeceraKilometrajeVehiculos',
		idCuerpo: 'table_abm_Kilometraje',
		ordenInicial: 'fecha',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '10%' },
			{ campo: 'kilometraje', titulo: 'KILOMETRAJE', ancho: '25%' },
			{ campo: 'fecha', titulo: 'FECHA', ancho: '25%' },
			{ campo: 'encargado', titulo: 'ENCARGADO', ancho: '40%' }
		],
		fila: {
			funcionSeleccion: 'ObtenerdatosAbmkilometraje',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo' },
				{ id: 'td_datos_1', campo: 'kilometraje_formateado', columna: 'kilometraje' },
				{ id: 'td_datos_2', campo: 'fecha', columna: 'fecha' },
				{ id: 'td_datos_3', campo: 'encargado', columna: 'encargado' },
				{ campo: 'codigo_encargado', tecnica: true },
				{ campo: 'codigo_vehiculo', tecnica: true }
			]
		}
	});
	listadoKilometrajeVehiculos.iniciar();
	return listadoKilometrajeVehiculos;
}

function renderizarTarjetasDatosVehiculos(registros) {
	var contenedor = document.getElementById('table_DatosVehiculos');
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(registros || []).forEach(function (registro) {
		var tarjeta = document.createElement('div');
		tarjeta.className = 'sales';
		var titulo = document.createElement('h3');
		titulo.textContent = (registro.nombre || '') + ' - ' + (registro.chapa || '');
		tarjeta.appendChild(titulo);
		var imagenContenedor = document.createElement('div');
		var imagen = document.createElement('div');
		imagen.className = 'imgFotoCi';
		if (registro.imagen) imagen.style.backgroundImage = 'url("' + String(registro.imagen).replace(/"/g, '%22') + '")';
		imagenContenedor.appendChild(imagen);
		tarjeta.appendChild(imagenContenedor);
		var info = document.createElement('div');
		info.className = 'info';
		var kilometraje = document.createElement('h1');
		kilometraje.style.fontSize = '1.2rem';
		kilometraje.textContent = 'Kilometraje: ' + (registro.kilometraje_formateado || '0');
		info.appendChild(kilometraje);
		var acciones = document.createElement('div');
		acciones.className = 'info';
		[['Mantenimiento', '#4caf50', verCerrarDetalleVehivulos], ['Kilometraje', '#dc3545', verCerrarkilometraje]].forEach(function (config) {
			var boton = document.createElement('input');
			boton.type = 'button';
			boton.value = config[0];
			boton.className = 'btn5';
			boton.id = String(registro.codigo == null ? '' : registro.codigo);
			boton.setAttribute('data-url', (registro.nombre || '') + ' ' + (registro.chapa || ''));
			boton.setAttribute('data-email', registro.codigo == null ? '' : registro.codigo);
			boton.style.backgroundColor = config[1];
			boton.style.margin = '2%';
			boton.addEventListener('click', function () { config[2](this); });
			acciones.appendChild(boton);
		});
		info.appendChild(acciones);
		tarjeta.appendChild(info);
		contenedor.appendChild(tarjeta);
	});
}

function verCerrarDatosVehiculos(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divDatosVehiculos").style.display==""){
		document.getElementById("divMinimizadoDatosVehiculos1").style.display="none"
		document.getElementById("divMinimizadoDatosVehiculos2").style.display="none"
  
	$("div[id=divDatosVehiculos]").fadeOut(500);			
	}else{	
if(controlacceso("VERDETALLEDATOSVEHICULOS","accion")==false){return;}	
mostrarSoloUno("divDatosVehiculos")	
		document.getElementById("divDatosVehiculos").style.display=""
 
	}
}

function minimizarDatosVehiculos(){
//  
	$("div[id=divDatosVehiculos]").fadeOut(500);
	document.getElementById("divMinimizadoDatosVehiculos1").style.display=""	
	document.getElementById("divMinimizadoDatosVehiculos2").style.display=""	
	copiarBotonEnContenedor(document.getElementById("divMenuDatosVehiculos"));
}

function buscarDatosVehiculos() {
	// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
	var local = document.getElementById('inptlocalDatosVehiculos').value 
	var vehiculo = document.getElementById('inptDatosVehiculos').value
	 
	 
	
	document.getElementById("table_DatosVehiculos").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoDatosVehiculos").value =""
	 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"local": local, 
		"vehiculo": vehiculo,
		"cod_localFKUSer": cod_localFKUSer,
		"formato": "json",
		"funt": "buscarDatosVehiculos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

			document.getElementById("table_DatosVehiculos").innerHTML = ""	
 

		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_DatosVehiculos").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) renderizarTarjetasDatosVehiculos(pagina);
					else document.getElementById("table_DatosVehiculos").innerHTML = pagina;
					document.getElementById("inptTotalRegistoDatosVehiculos").value =datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
 
var cod_Vehiculodetalle="";
var NombredetalleVehiculo="";
function verCerrarDetalleVehivulos(datos){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmDetalleVehivulos").style.display==""){
		
	limpiarcamposbuscarDetalleVehivulos()	
	
	$("div[id=divAbmDetalleVehivulos]").fadeOut(500);			
	}else{	
// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
		document.getElementById("divAbmDetalleVehivulos").style.display=""		
		
		cod_Vehiculodetalle=datos.id;
		NombredetalleVehiculo=datos.getAttribute('data-url');
		
		var f = new Date();
		var dia =f.getDate()
		if(dia<10){
			dia="0"+dia;
		}
		var mes =f.getMonth()+1
		if(mes<10){
			mes="0"+mes;
		}
		buscarabmDetalleVehivulos();
		document.getElementById("inptFechaDetalleVehivulos").value= f.getFullYear()+"-"+mes+"-"+dia;
	}
}

function checkestadoDetalleVehivulos(d){
	if(d=="1"){
		document.getElementById('inptSeleccEstadoDetalleBuscarVehivulos1').checked=true
		document.getElementById('inptSeleccEstadoBuscarDetalleVehivulos2').checked=false	
	}else{		
		document.getElementById('inptSeleccEstadoDetalleBuscarVehivulos1').checked=false
		document.getElementById('inptSeleccEstadoBuscarDetalleVehivulos2').checked=true
	}
}

function limpiarcamposbuscarDetalleVehivulos(){
	document.getElementById('inptBuscarDetalleVehivulos1').value=""
	document.getElementById('inptBuscarDetalleVehivulos2').value=""
	document.getElementById('inptBuscarDetalleVehivulos3').value=""
	document.getElementById('inptBuscarDetalleVehivulos4').value=""
	document.getElementById("table_abm_DetalleVehivulos").innerHTML=""
	document.getElementById("inptRegistroNroDetalleVehivulos").value="";
}

function limpiarcamposDetalleVehivulos() {
	document.getElementById('inptKilometrajeInicioDetalleVehivulos').value=""
	document.getElementById('inptKilometrajeFinDetalleVehivulos').value=""
	document.getElementById('inptCostoDetalleVehivulos').value=""
	document.getElementById('inptdescripcionDetalleVehivulos').value=""
	document.getElementById('inpObservacionDetalleVehivulos').value=""
	document.getElementById('inptEstadodetalleDetalleVehivulos').value=""
 
	document.getElementById('btnAbmDetalleVehivulos').value = "Guardar Datos";
	document.getElementById('inptEstadoDetalleVehivulos').value = "Activo";
	document.getElementById('btnEditarDetalleVehivulos').style.backgroundColor = "#b7b7b7"; 
	idAbmDetalleVehivulos = ""; 

}
 
function verCerrarVentanaAbmDetalleVehivulos(d, l) {
	if (d == "1") {
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADOVehivulosES","accion")==false){return;}
			limpiarcamposDetalleVehivulos()
		}
		$("div[id=divAbmDetalleVehivulos2]").fadeIn(250)
		document.getElementById('divAbmDetalleVehivulos1').style.display = "none"
	} else {
		$("div[id=divAbmDetalleVehivulos1]").fadeIn(250)
		document.getElementById('divAbmDetalleVehivulos2').style.display = "none"
	}
}
function verVentanaEditarDetalleVehivulos() {
	// if(controlacceso("EDITARLISTADOVehivulosES","accion")==false){return;}
	if (idAbmDetalleVehivulos == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmDetalleVehivulos("1", "2")
}



var idAbmDetalleVehivulos=""
var cod_EncargadoVehiculoFK=""
function ObtenerdatosAbmDetalleVehivulos(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	datostr.className = 'tableRegistroSelec'
	
	
	idAbmDetalleVehivulos = $(datostr).children('td[id="td_id"]').html();
    cod_EncargadoVehiculoFK = $(datostr).children('td[id="td_datos_11"]').html();
    document.getElementById("inptFechaDetalleVehivulos").value = $(datostr).children('td[id="td_datos_3"]').html();  
    document.getElementById("inptKilometrajeInicioDetalleVehivulos").value = $(datostr).children('td[id="td_datos_5"]').html();  
    document.getElementById("inptKilometrajeFinDetalleVehivulos").value = $(datostr).children('td[id="td_datos_6"]').html();
    document.getElementById("inptCostoDetalleVehivulos").value = $(datostr).children('td[id="td_datos_4"]').html();  
    document.getElementById("inptdescripcionDetalleVehivulos").value = $(datostr).children('td[id="td_datos_10"]').html(); 
    document.getElementById("inpObservacionDetalleVehivulos").value = $(datostr).children('td[id="td_datos_2"]').html(); 
    document.getElementById("inptRegistroSeleccDetalleVehivulos").value = $(datostr).children('td[id="td_datos_1"]').html(); 
    document.getElementById("inptEstadodetalleDetalleVehivulos").value = $(datostr).children('td[id="td_datos_8"]').html();  
    document.getElementById("inptEstadoDetalleVehivulos").value = $(datostr).children('td[id="td_datos_9"]').html(); 
	
	
	document.getElementById('btnAbmDetalleVehivulos').value = "Editar Datos"; 
	document.getElementById('btnEditarDetalleVehivulos').style.backgroundColor="#2196f3";
	  

}


function verificarcamposDetalleVehivulos() {
	
	var inptFechaDetalleVehivulos = document.getElementById('inptFechaDetalleVehivulos').value
	var inptKilometrajeInicioDetalleVehivulos = document.getElementById('inptKilometrajeInicioDetalleVehivulos').value
	var inptKilometrajeFinDetalleVehivulos = document.getElementById('inptKilometrajeFinDetalleVehivulos').value
	var inptCostoDetalleVehivulos = document.getElementById('inptCostoDetalleVehivulos').value
	var inptdescripcionDetalleVehivulos = document.getElementById('inptdescripcionDetalleVehivulos').value
	var inpObservacionDetalleVehivulos = document.getElementById('inpObservacionDetalleVehivulos').value
	var inptEstadodetalleDetalleVehivulos = document.getElementById('inptEstadodetalleDetalleVehivulos').value
	var inptEstadoDetalleVehivulos = document.getElementById('inptEstadoDetalleVehivulos').value
	if (inptFechaDetalleVehivulos == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA")
		return false;
	}
	if (inptKilometrajeInicioDetalleVehivulos == "") {
		ver_vetana_informativa("FALTO INGRESAR EL KILIMETRJE INICIAL")
		return false;
	}
	
	if (inptKilometrajeFinDetalleVehivulos == "") {
		ver_vetana_informativa("FALTO INGRESAR EL KILIMETRJE FINAL")
		return false;
	}

	var accion = "";
	if (idAbmDetalleVehivulos != "") {
		accion = "editarDetalleVehiculo";
		// if(controlacceso("EDITARLISTADOVehivulosES","accion")==false){return;}
	} else {
		accion = "nuevoDetalleVehiculo";
		// if(controlacceso("INSERTARLISTADOVehivulosES","accion")==false){return;}
	}
	
	abmDetalleVehivulos(inptFechaDetalleVehivulos,inptKilometrajeInicioDetalleVehivulos, inptKilometrajeFinDetalleVehivulos, inptCostoDetalleVehivulos, inptdescripcionDetalleVehivulos, inpObservacionDetalleVehivulos,  inptEstadodetalleDetalleVehivulos,  inptEstadoDetalleVehivulos, idAbmDetalleVehivulos, accion);
}

 
function abmDetalleVehivulos(fecha,kilometroInicio,kilometroFin,costo,Cod_descripcion,observacion,estadoDetalle,estado,idAbm,accion) {
		
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fecha", fecha)
	datos.append("kilometroInicio", kilometroInicio)
	datos.append("kilometroFin", kilometroFin)
	datos.append("costo", costo)
	datos.append("Cod_descripcion", Cod_descripcion)
	datos.append("observacion", observacion)
	datos.append("estadoDetalle", estadoDetalle)
	datos.append("estado", estado)
	datos.append("idAbm", idAbm)
	datos.append("cod_Vehiculodetalle", cod_Vehiculodetalle)
	datos.append("idFkCobrador", idFkCobrador)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
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
					limpiarcamposDetalleVehivulos()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmDetalleVehivulos = ""
					buscarabmDetalleVehivulos()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


function buscarabmDetalleVehivulos() {
// if(controlacceso("BUSCARLISTADOVehivulosES","accion")==false){return;}
	var detalle = document.getElementById('inptBuscarDetalleVehivulos1').value
	var observacion = document.getElementById('inptBuscarDetalleVehivulos2').value
	var fecha = document.getElementById('inptBuscarDetalleVehivulos3').value
	var encargado = document.getElementById('inptBuscarDetalleVehivulos4').value 
	var estadoDetalle = document.getElementById('inptBuscarDetalleVehivulos5').value 
	var estado =""
	
	// alert(observacion)
	if(document.getElementById('inptSeleccEstadoDetalleBuscarVehivulos1').checked==true){
		estado ="Activo"
	}else{
		estado ="Inactivo"
	}	 
	document.getElementById("table_abm_DetalleVehivulos").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"detalle": detalle,
		"observacion": observacion,
		"fecha": fecha,
		"encargado": encargado,
		"estadoDetalle": estadoDetalle, 
		"estado": estado, 
		"cod_Vehiculodetalle": cod_Vehiculodetalle, 
		"formato": "json",
		"funt": "buscarDetalleVehivulos"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_DetalleVehivulos").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_DetalleVehivulos").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
				var datos_buscados = datos[2];
					var listadoDetalle = iniciarListadoDetalleVehiculos();
					if (Array.isArray(datos_buscados) && listadoDetalle) listadoDetalle.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_DetalleVehivulos").innerHTML = datos_buscados
					document.getElementById("inptRegistroNroDetalleVehivulos").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}


/// kilometraje 

var cod_kilometraje=""; 
function verCerrarkilometraje(datos){ 
	if(document.getElementById("divAbmKilometraje").style.display==""){
		
	limpiarcamposkilometraje()	
	
	$("div[id=divAbmKilometraje]").fadeOut(500);			
	}else{	
// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
		document.getElementById("divAbmKilometraje").style.display=""		

		cod_Vehiculodetalle=datos.id;
		 var f = new Date();
		var dia =f.getDate()
		if(dia<10){
			dia="0"+dia;
		}
		var mes =f.getMonth()+1
		if(mes<10){
			mes="0"+mes;
		}
		buscarabmkilometraje();
		document.getElementById("inptFechaKilometraje").value= f.getFullYear()+"-"+mes+"-"+dia;
	}
}
 
function limpiarcamposkilometraje() {
	var f = new Date();
		var dia =f.getDate()
		if(dia<10){
			dia="0"+dia;
		}
		var mes =f.getMonth()+1
		if(mes<10){
			mes="0"+mes;
		} 
		document.getElementById("inptFechaKilometraje").value= f.getFullYear()+"-"+mes+"-"+dia;
	document.getElementById('inptNroKilometraje').value="" 
 
	document.getElementById('btnAbmKilometraje').value = "Guardar Datos"; 
	document.getElementById('btnEditarKilometraje').style.backgroundColor = "#b7b7b7"; 
	cod_kilometraje = ""; 

}
 
function verificarcamposkilometraje() {
	
	var inptFechaKilometraje = document.getElementById('inptFechaKilometraje').value
	var inptNroKilometraje = document.getElementById('inptNroKilometraje').value
	 
	if (inptFechaKilometraje == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA")
		return false;
	}
	if (inptNroKilometraje == "") {
		ver_vetana_informativa("FALTO INGRESAR EL KILIMETRJE")
		return false;
	}
	
	 
	var accion = "";
	if (cod_kilometraje != "") {
		accion = "editarkilometraje";
		// if(controlacceso("EDITARLISTADOVehivulosES","accion")==false){return;}
	} else {
		accion = "nuevokilometraje";
		// if(controlacceso("INSERTARLISTADOVehivulosES","accion")==false){return;}
	}
	
	abmkilometraje(inptFechaKilometraje,inptNroKilometraje, cod_kilometraje, accion);
}

function abmkilometraje(fecha,kilometro,idAbm,accion) {
		
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fecha", fecha)
	datos.append("kilometro", kilometro)
	datos.append("idAbm", idAbm) 
	datos.append("cod_Vehiculodetalle", cod_Vehiculodetalle)
	datos.append("idFkCobrador", idFkCobrador)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
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
					limpiarcamposkilometraje()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					cod_kilometraje = ""
					buscarabmkilometraje()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function ObtenerdatosAbmkilometraje(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	datostr.className = 'tableRegistroSelec'
	
	cod_kilometraje = $(datostr).children('td[id="td_id"]').html(); 
    document.getElementById("inptNroKilometraje").value = $(datostr).children('td[id="td_datos_1"]').html();  
    document.getElementById("inptRegistroSeleccKilometraje").value = $(datostr).children('td[id="td_datos_1"]').html();
 	document.getElementById("inptFechaKilometraje").value = $(datostr).children('td[id="td_datos_2"]').html();  
	document.getElementById('btnAbmKilometraje').value = "Editar Datos"; 
	document.getElementById('btnEditarKilometraje').style.backgroundColor="#2196f3";
	  

}


function buscarabmkilometraje() {
// if(controlacceso("BUSCARLISTADOVehivulosES","accion")==false){return;}
	 
	document.getElementById("table_abm_Kilometraje").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_Vehiculodetalle": cod_Vehiculodetalle, 
		"formato": "json",
		"funt": "buscarabmkilometraje"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmVehivulos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Kilometraje").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Kilometraje").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
					var datos_buscados = datos[2];
					var listadoKilometraje = iniciarListadoKilometrajeVehiculos();
					if (Array.isArray(datos_buscados) && listadoKilometraje) listadoKilometraje.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_Kilometraje").innerHTML = datos_buscados
					document.getElementById("inptRegistroNroKilometraje").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function iniciarListadosSecundariosVehiculos() {
	iniciarListadoDetalleVehiculos();
	iniciarListadoKilometrajeVehiculos();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadosSecundariosVehiculos);
else iniciarListadosSecundariosVehiculos();


