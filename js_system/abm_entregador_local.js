/* ABM ENTREGADOR LOCAL */
var listadoEntregadorLocales = null;
var listadoVistaCobrador = null;

function iniciarListadoEntregadorLocales() {
	if (listadoEntregadorLocales || !window.AbmListadoCore) return listadoEntregadorLocales;
	var cuerpo = document.getElementById('table_abm_entregador_locales');
	var cabecera = cuerpo && cuerpo.previousElementSibling ? cuerpo.previousElementSibling.querySelector('tr') : null;
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraEntregadorLocales';
	listadoEntregadorLocales = window.AbmListadoCore.crear({
		nombre: 'entregadorLocales',
		idCabecera: 'cabeceraEntregadorLocales',
		idCuerpo: 'table_abm_entregador_locales',
		ordenInicial: 'local',
		columnas: [
			{ campo: 'codigo_local', titulo: '#', ancho: '5%' },
			{ campo: 'local', titulo: 'LOCAL', ancho: '70%' },
			{ campo: 'asignado', titulo: 'ACCION', ancho: '25%' }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento('table', { className: indice % 2 ? 'tableRegistroSearch' : 'tableRegistroSearch2' });
			tabla.setAttribute('border', '1');
			tabla.setAttribute('cellspacing', '1');
			tabla.setAttribute('cellpadding', '5');
			var fila = utilidades.crearElemento('tr', { id: 'tbSelecRegistro' });
			columnas.forEach(function (columna) {
				var celda = utilidades.crearElemento('td', { dataset: { columna: columna.campo } });
				celda.style.width = columna.ancho;
				if (columna.campo === 'codigo_local') {
					celda.id = 'td_id';
					celda.textContent = registro.codigo_local == null ? '' : registro.codigo_local;
				} else if (columna.campo === 'local') {
					celda.id = 'td_datos_1';
					celda.textContent = registro.local || '';
				} else {
					celda.id = 'td_datos_2';
					celda.style.textAlign = 'center';
					var control = document.createElement('input');
					control.type = 'checkbox';
					control.checked = !!registro.asignado;
					control.id = String(registro.asignado ? registro.codigo_relacion : registro.codigo_local);
					control.addEventListener('click', function () {
						if (registro.asignado) eliminarEntregaCobrador(this);
						else abmentregadorlocal(this);
					});
					celda.appendChild(control);
				}
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoEntregadorLocales.iniciar();
	return listadoEntregadorLocales;
}

function verCerrarEntregadorLocales(){
	
	if(idAbmCobrador==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN COBRADOR")
		return false;
	}
	
	
	if(document.getElementById("divEntregadorLocales").style.display==""){
	 
	$("div[id=divEntregadorLocales]").fadeOut(500);	
		}else{
	 document.getElementById("divEntregadorLocales").style.display=""
      
	 buscarEntregadorLocales()
	}
}
function buscarEntregadorLocales() {
	document.getElementById("table_abm_entregador_locales").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_Entregador": idAbmCobrador,		
		"formato": "json",
		"funt": "buscarEntregadorLocales"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_entregador_locales").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_entregador_locales").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					
					var listado = iniciarListadoEntregadorLocales();
					if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_entregador_locales").innerHTML = datos_buscados;
					
					}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}
function abmentregadorlocal(datos) {
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_Entregador": idAbmCobrador,		
		"cod_localFK": datos.id,		
		"funt": "abmentregadorlocal"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
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
					
					ver_vetana_informativa('DATOS CARGADOS CORRECTAMENTE');					
					buscarEntregadorLocales()
					}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}
function eliminarEntregaCobrador(datos) {
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,	
		"iddetalleentregador_local": datos.id,
		"funt": "eliminarEntregaCobrador"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
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
					
					ver_vetana_informativa('DATOS CARGADOS CORRECTAMENTE');					
					buscarEntregadorLocales()
					}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}


////



function ExploradorImagenperfilCobrador(){	
$("input[name=file_perfilcobrador]").click();
// controlperfilcobador=File;
}
var fotoperfilcobador="";
var extperfilcobador="";
var file_extensionperfilcobrador="";
function readFilePerfilcobrador(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extensionperfilcobrador=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extensionperfilcobrador=="jpeg") || (file_extensionperfilcobrador=="jpg") || (file_extensionperfilcobrador=="png") ){
}else{
ver_vetana_informativa("LA FOTO SELECCIONADO NO ES JPEG")
return false;
}



	extperfilcobador=file_extensionperfilcobrador;
	fotoperfilcobador=input.files[0];
	
	var imageUrl = URL.createObjectURL(fotoperfilcobador);
	
 $("div[id=imgFotoPerfil1cobrador]").css({"background-image":"url("+imageUrl+")"})





}



//////




function checkaccesocobrador(d){
	if(document.getElementById(d).checked==true){
		document.getElementById(d).checked=false
	}else{
		document.getElementById(d).checked=true
	}
}
function verificarcamposCobrador() {
	var inptNombreApellidoCobrador = document.getElementById('inptNombreApellidoCobrador').value
	var inptUsuarioCobrador = document.getElementById('inptUsuarioCobrador').value
	var inptPassCobrador = document.getElementById('inptPassCobrador').value
	var inptNroTelefCobrador = document.getElementById('inptNroTelefCobrador').value
	var inptZonaCobrador = document.getElementById('inptZonaCobrador').value
	var inptEstadoCobrador = document.getElementById('inptEstadoCobrador').value
	var inptlocalCobrador = document.getElementById('inptlocalCobrador').value
	var inptSeleccAccesoCliente="no"
	var inptSeleccAccesoConsulta="no"
	var inptSeleccAccesoCuentas="no"
	var inptSeleccAccesoOffline="no"
	var inptSeleccAccesoRealizarCobranzas="no"
	var inptSeleccAccesoRealizarEntregas="no"
	var inptSeleccAccesoVerificarSolicitud="no"
	
	
	var inptSeleccCrearSolicitudCredito="no"
	var inptSeleccAgendaCliente="no"
	var inptSeleccCargarFotosCliente="no"
	var inptSeleccCargarPDFCliente="no"
	var inptSeleccEngresoIngresoCobrador="no"
	var inptSeleccUbicacionCliente="no"
	var inptSeleccMetasCobrador="no"
	
	var inptSeleccSolicDescuentoCredito="no"
	
	
	
	if(document.getElementById("inptSeleccAccesoCliente").checked==true){
	inptSeleccAccesoCliente="si"
	}
	if(document.getElementById("inptSeleccAccesoConsulta").checked==true){
	inptSeleccAccesoConsulta="si"
	}
	if(document.getElementById("inptSeleccAccesoCuentas").checked==true){
	inptSeleccAccesoCuentas="si"
	}
	if(document.getElementById("inptSeleccAccesoOffline").checked==true){
	inptSeleccAccesoOffline="si"
	}
	if(document.getElementById("inptSeleccAccesoRealizarCobranzas").checked==true){
	inptSeleccAccesoRealizarCobranzas="si"
	}
	if(document.getElementById("inptSeleccAccesoRealizarEntregas").checked==true){
	inptSeleccAccesoRealizarEntregas="si"
	}
	if(document.getElementById("inptSeleccAccesoVerificarSolicitud").checked==true){
	inptSeleccAccesoVerificarSolicitud="si"
	}
	
	
	if(document.getElementById("inptSeleccCrearSolicitudCredito").checked==true){
	inptSeleccCrearSolicitudCredito="si"
	}
	if(document.getElementById("inptSeleccAgendaCliente").checked==true){
	inptSeleccAgendaCliente="si"
	}
	
	if(document.getElementById("inptSeleccCargarFotosCliente").checked==true){
	inptSeleccCargarFotosCliente="si"
	}
	
	if(document.getElementById("inptSeleccCargarPDFCliente").checked==true){
	inptSeleccCargarPDFCliente="si"
	}
	
	if(document.getElementById("inptSeleccEngresoIngresoCobrador").checked==true){
	inptSeleccEngresoIngresoCobrador="si"
	}
	
	if(document.getElementById("inptSeleccUbicacionCliente").checked==true){
	inptSeleccUbicacionCliente="si"
	}
	
	if(document.getElementById("inptSeleccMetasCobrador").checked==true){
	inptSeleccMetasCobrador="si"
	}
	
	if(document.getElementById("inptSeleccSolicDescuentoCredito").checked==true){
	inptSeleccSolicDescuentoCredito="si"
	}
	
	
	
	
	if (inptNombreApellidoCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE COBRADOR")
		return false;
	}
	if (inptUsuarioCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR EL USUARIO DE ACCESO")
		return false;
	}
	if (inptPassCobrador == "") {
		ver_vetana_informativa("FALTO INGRESAR LA CONTRASEÑA DEL COBRADOR")
		return false;
	}
	if (idFKZona == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UNA ZONA")
		return false;
	}
	if (inptlocalCobrador == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN LOCAL")
		return false;
	}
	var accion = "";
	if (idAbmCobrador != "") {
		accion = "editar";
	if(controlacceso("EDITARLISTADOCOBRADORES","accion")==false){return;}
	} else {		
		accion = "nuevo";
		if(controlacceso("INSERTARLISTADOCOBRADORES","accion")==false){return;}
	}
	abmcobrador(inptSeleccAccesoCliente,inptSeleccAccesoConsulta,inptSeleccAccesoCuentas,inptSeleccAccesoOffline,inptSeleccAccesoRealizarCobranzas,inptSeleccAccesoRealizarEntregas,inptSeleccAccesoVerificarSolicitud,inptNombreApellidoCobrador, inptUsuarioCobrador, inptPassCobrador, inptNroTelefCobrador, idFKZona, inptlocalCobrador,inptEstadoCobrador, idAbmCobrador, accion,inptSeleccCrearSolicitudCredito,inptSeleccAgendaCliente,inptSeleccCargarFotosCliente,inptSeleccCargarPDFCliente,inptSeleccEngresoIngresoCobrador,inptSeleccUbicacionCliente,inptSeleccMetasCobrador,inptSeleccSolicDescuentoCredito);
}
function abmcobrador(accesocliente,accesoproducto,accesocuentas,modosinconexion,realizarcobranzas,realizarentregas,verificarsolicitudcredito,nombre_persona, usu, con, telefono, idzona, cod_localFK,estado, cod_persona, accion,accesocrearsoliticudcredito,accesoagendacliente,accesocargarfotoscliente,accesocargarpdfcliente,accesoegresoingreso,accesoubicacioncliente,accesometascobrador,accesosolicituddescuentocredito) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_persona", cod_persona)
	datos.append("nombre_persona", nombre_persona)
	datos.append("telefono", telefono)
	datos.append("idzona", idzona)
	datos.append("usu", usu)
	datos.append("con", con)
	datos.append("estado", estado)
	datos.append("accesocliente", accesocliente)
	datos.append("accesoproducto", accesoproducto)
	datos.append("accesocuentas", accesocuentas)
	datos.append("modosinconexion", modosinconexion)
	datos.append("realizarcobranzas", realizarcobranzas)
	datos.append("realizarentregas", realizarentregas)
	datos.append("verificarsolicitudcredito", verificarsolicitudcredito)
	
	datos.append("accesocrearsoliticudcredito", accesocrearsoliticudcredito)
	datos.append("accesoagendacliente", accesoagendacliente)
	datos.append("accesocargarfotoscliente", accesocargarfotoscliente)
	datos.append("accesocargarpdfcliente", accesocargarpdfcliente)
	datos.append("accesoegresoingreso", accesoegresoingreso)
	datos.append("accesoubicacioncliente", accesoubicacioncliente)
	datos.append("accesometascobrador", accesometascobrador)
	datos.append("accesosolicituddescuentocredito", accesosolicituddescuentocredito)
	
	
	datos.append("cod_localFK", cod_localFK)
	datos.append("fotoperfilcobador", fotoperfilcobador)
	datos.append("extperfilcobador", extperfilcobador)
	
	
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
					limpiarcamposCobrador()
				verCerrarVentanaAbmVistaCobrador("2")
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmCobrador = ""
					buscarabmCobrador()
					buscarCobradorSelec()
					buscarCobradorSelecZona()
					buscarvistacobrador()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadocobrador(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarCobrador1').checked=true
		document.getElementById('inptSeleccEstadoBuscarCobrador2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarCobrador1').checked=false
		document.getElementById('inptSeleccEstadoBuscarCobrador2').checked=true
	}
}
function buscarabmCobrador() {
if(controlacceso("BUSCARLISTADOCOBRADORES","accion")==false){return;}
	var listado = iniciarListadoAbmCobrador();
	var codigo = document.getElementById('inptBuscarAbmCobrador1').value
	var cobrador = document.getElementById('inptBuscarAbmCobrador2').value
	var estado = "";
	if(document.getElementById('inptSeleccEstadoBuscarCobrador1').checked==true){
		 estado = "Activo";
	}else{
		estado = "Inactivo";
	}
	document.getElementById("table_abm_cobrador").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"cobrador": cobrador,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
          manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_cobrador").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_cobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptRegistroNroCobrador").value = datos[3]
					idAbmCobrador = '';
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposCobrador() {
	document.getElementById('inptNombreApellidoCobrador').value = "";
	document.getElementById('inptRegistroSeleccCobrador').value = "";
	document.getElementById('inptUsuarioCobrador').value = "";
	document.getElementById('inptPassCobrador').value = "";
	document.getElementById('inptNroTelefCobrador').value = "";
	document.getElementById('inptZonaCobrador').value = "1";
	document.getElementById('inptEstadoCobrador').value = "Activo";
	document.getElementById('btnAbmCobrador').value = "Guardar datos";
	document.getElementById('btnEditarCobradores').style.backgroundColor="#b7b7b7";
	document.getElementById('btnLocalEntregador').style.backgroundColor="#b7b7b7";
	document.getElementById('inptSeleccAccesoCliente').checked=false
	document.getElementById('inptSeleccAccesoConsulta').checked=false
	document.getElementById('inptSeleccAccesoCuentas').checked=false
	document.getElementById('inptSeleccAccesoOffline').checked=false
	document.getElementById('inptSeleccAccesoRealizarCobranzas').checked=false
	document.getElementById('inptSeleccAccesoRealizarEntregas').checked=false
	document.getElementById('inptSeleccAccesoVerificarSolicitud').checked=false
	document.getElementById('inptSeleccCrearSolicitudCredito').checked=false
	document.getElementById('inptSeleccAgendaCliente').checked=false
	document.getElementById('inptSeleccCargarFotosCliente').checked=false
	document.getElementById('inptSeleccCargarPDFCliente').checked=false
	document.getElementById('inptSeleccEngresoIngresoCobrador').checked=false
	document.getElementById('inptSeleccUbicacionCliente').checked=false
	document.getElementById('inptSeleccMetasCobrador').checked=false
	
	
	
	idAbmCobrador = "";
	idFKZona="1"
	$("div[id=imgFotoPerfil1cobrador]").css({ "background-image": "url(/GoodVentaElectroCasaMaric/iconos/sinperfil.png)" })
	fotoperfilcobador=""
	extperfilcobador=""
}
var idFkCobrador = ""
var idFkVendedor = ""
var controlseleccvistaCobrador = ""
function iniciarListadoVistaCobrador() {
	if (listadoVistaCobrador || !window.AbmListadoCore) return listadoVistaCobrador;
	var cuerpo = document.getElementById('table_vista_cobrador');
	var cabecera = cuerpo && cuerpo.previousElementSibling ? cuerpo.previousElementSibling.querySelector('tr') : null;
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraVistaCobrador';
	listadoVistaCobrador = window.AbmListadoCore.crear({
		nombre: 'vistaCobrador', idCabecera: 'cabeceraVistaCobrador', idCuerpo: 'table_vista_cobrador', ordenInicial: 'cobrador',
		columnas: [
			{ campo: 'cobrador', titulo: 'COBRADOR', ancho: '30%' },
			{ campo: 'telefono', titulo: 'NRO. TELEF.', ancho: '30%' }
		],
		fila: { funcionSeleccion: 'obtenerdatosvistacobrador', celdas: [
			{ id: 'td_id', campo: 'codigo', tecnica: true },
			{ id: 'td_datos_1', campo: 'cobrador', columna: 'cobrador' },
			{ id: 'td_datos_2', campo: 'telefono', columna: 'telefono' },
			{ id: 'td_datos_3', campo: 'zona', tecnica: true },
			{ id: 'td_datos_4', campo: 'usuario', tecnica: true },
			{ id: 'td_datos_5', campo: 'contrasena', tecnica: true },
			{ id: 'td_datos_6', campo: 'codigo_zona', tecnica: true },
			{ id: 'td_datos_7', campo: 'estado', tecnica: true }
		] }
	});
	listadoVistaCobrador.iniciar();
	return listadoVistaCobrador;
}
function vercerrarvistacobrador(d, ventana) {
	if (d == "1") {
			document.getElementById("divVistaCobrador").style.display = ""
			  
		controlseleccvistaCobrador = ventana
		buscarvistacobrador();
	} else {
		 
		$("div[id=divVistaCobrador]").fadeOut(500)
	}
}
function buscarvistacobrador() {
	var buscador = document.getElementById('inptBuscarVistaCobrador').value
	document.getElementById("table_vista_cobrador").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"formato": "json",
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcobrador.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_cobrador").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_cobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					var listado = iniciarListadoVistaCobrador();
					if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_vista_cobrador").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function iniciarListadosAuxiliaresCobrador() {
	iniciarListadoEntregadorLocales();
	iniciarListadoVistaCobrador();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadosAuxiliaresCobrador);
else iniciarListadosAuxiliaresCobrador();
function obtenerdatosvistacobrador(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	if (controlseleccvistaCobrador == "ventacobrador") {
		idFkCobrador = $(datostr).children('td[id="td_id"]').html();
		cobradorcredito = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCobradorVenta').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCobradorCargarPago').value = $(datostr).children('td[id="td_datos_1"]').html();
		document.getElementById('inptCobradorConfirmar').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	if (controlseleccvistaCobrador == "confimarpago") {
		cobradorcredito = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCobradorConfirmar').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	if (controlseleccvistaCobrador == "cargarpago") {
		cobradorcargarpagos = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCobradorCargarPago').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	if (controlseleccvistaCobrador == "arqueo") {
		cobradorarqueo = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCobradorArqueo').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	if (controlseleccvistaCobrador == "comision") {
		codCobradorComision = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCobradorComision').value = $(datostr).children('td[id="td_datos_1"]').html();

	}
	
	document.getElementById("divVistaCobrador").style.display = "none"
}
