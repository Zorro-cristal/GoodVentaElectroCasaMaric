/*
ABM USUARIOS
*/
function verCerrarAbmUsuarios(){
	document.getElementById("divSegundoPlano").style.display="none";
if(document.getElementById("divAbmUsuario").style.display==""){
	document.getElementById("divMinimizadoUsuarios").style.display="none"
//  
	$("div[id=divAbmUsuario]").fadeOut(500);	
	limpiarcamposbuscarusuarios()
	limpiarcamposusuarios()
}else{		
if(controlacceso("VERLISTADOUSUARIO","accion")==false){return;}
mostrarSoloUno("divAbmUsuario")	
document.getElementById("divAbmUsuario").style.display="" 
}
}
function verCerrarMisDatos(d){
	
	
	if(d=="1"){
	prepararFormularioMiPerfil();
	document.getElementById("divCambiarMisDatosPersonales").style.display="";	
	  //  
	}else{
	//  
	$("div[id=divCambiarMisDatosPersonales]").fadeOut(500);	
	
	}
}
function limpiarcamposbuscarusuarios(){
		document.getElementById('inptBuscarUsuario1').value=""
	   document.getElementById('inptBuscarUsuario2').value=""
	   document.getElementById('inptBuscarUsuario3').value=""
	   if (listadoAbmUsuarios) listadoAbmUsuarios.establecerRegistros([])
	   else document.getElementById('table_abm_usuarios').innerHTML=""
}
function minimizarusuarios(){ 
	$("div[id=divAbmUsuario]").fadeOut(500);
	document.getElementById("divMinimizadoUsuarios").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmUsuarios"));
}
function verCerrarVentanaAbmUsuarios(d, l) {
	
	
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOUSUARIO","accion")==false){return;}
			limpiarcamposusuarios()
		}
		document.getElementById('divAbmUsuario1').style.display = "none"
		$("div[id=divAbmUsuario2]").fadeIn(250)
	} else {
		$("div[id=divAbmUsuario1]").fadeIn(250)
		document.getElementById('divAbmUsuario2').style.display = "none"
	}
}
function verVentanaEditarUsuario() {
	if (idAbmUsuario == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADOUSUARIO","accion")==false){return;}
	verCerrarVentanaAbmUsuarios("1", "2")
}
var idAbmUsuario = ""
var fotoPerfilUsuarioObjectUrl = "";
var fotoPerfilUsuarioSinFoto = "/GoodVentaElectroCasaMaric/iconos/sinperfil.png";

function liberarVistaPreviaFotoPerfilUsuario() {
	if (fotoPerfilUsuarioObjectUrl && window.URL && window.URL.revokeObjectURL) {
		window.URL.revokeObjectURL(fotoPerfilUsuarioObjectUrl);
	}
	fotoPerfilUsuarioObjectUrl = "";
}

function actualizarVistaFotoPerfilUsuario(ruta) {
	var imagen = document.getElementById("imgFotoPerfilUsuario");
	var botonQuitar = document.getElementById("btnQuitarFotoPerfilUsuario");
	if (!imagen) return;
	imagen.src = ruta ? "/GoodVentaElectroCasaMaric/" + ruta.replace(/^\/+/, "") : fotoPerfilUsuarioSinFoto;
	if (botonQuitar) botonQuitar.style.display = ruta ? "" : "none";
}

function previsualizarFotoPerfilUsuario(input) {
	if (!input || !input.files || !input.files[0]) return;
	var archivo = input.files[0];
	var tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
	if (tiposPermitidos.indexOf(archivo.type) === -1) {
		ver_vetana_informativa("LA FOTO DEBE SER JPG, PNG O WEBP");
		input.value = "";
		return;
	}
	if (archivo.size > 2 * 1024 * 1024) {
		ver_vetana_informativa("LA FOTO NO PUEDE SUPERAR 2 MB");
		input.value = "";
		return;
	}
	liberarVistaPreviaFotoPerfilUsuario();
	fotoPerfilUsuarioObjectUrl = window.URL.createObjectURL(archivo);
	document.getElementById("imgFotoPerfilUsuario").src = fotoPerfilUsuarioObjectUrl;
	document.getElementById("inptQuitarFotoPerfilUsuario").value = "NO";
	document.getElementById("btnQuitarFotoPerfilUsuario").style.display = "";
}

function quitarFotoPerfilUsuario() {
	liberarVistaPreviaFotoPerfilUsuario();
	document.getElementById("inptFotoPerfilUsuario").value = "";
	document.getElementById("inptQuitarFotoPerfilUsuario").value = "SI";
	document.getElementById("imgFotoPerfilUsuario").src = fotoPerfilUsuarioSinFoto;
	document.getElementById("btnQuitarFotoPerfilUsuario").style.display = "none";
}

function obtenerdatosabmusuario(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreApellidoUsuario').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccUser').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inpt_user_selecc').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptNroDocUsuario').value = $(datostr).children('td[id="td_datos_2"]').html();
	document.getElementById('inptNroTelefUsuario').value = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptClaveAcceso').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptContrasenhaUser').value = $(datostr).children('td[id="td_datos_4"]').html();
	document.getElementById('inptTipoUser').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptEstadoUser').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptlocaluser').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptTipoUsuario').value = $(datostr).children('td[id="td_datos_10"]').html();
	var fotoPerfil = $(datostr).children('td[id="td_datos_11"]').html() || "";
	liberarVistaPreviaFotoPerfilUsuario();
	document.getElementById('inptFotoPerfilActualUsuario').value = fotoPerfil;
	document.getElementById('inptQuitarFotoPerfilUsuario').value = "NO";
	document.getElementById('inptFotoPerfilUsuario').value = "";
	actualizarVistaFotoPerfilUsuario(fotoPerfil);
	idAbmUsuario = $(datostr).children('td[id="td_id"]').html();
    document.getElementById('btnEditarUsuario').style.backgroundColor="";
    document.getElementById('btnAbmUsuario').value = "Editar datos";
}
function abrirModalConfirmarEdicionUsuario() {
	var modal = document.getElementById("modalConfirmarEdicionUsuario");
	if (!modal) return;
	var tipoAcceso = document.getElementById("inptTipoUser");
	var textoTipoAcceso = tipoAcceso && tipoAcceso.selectedIndex >= 0
		? tipoAcceso.options[tipoAcceso.selectedIndex].text
		: "";
	document.getElementById("textoNivelPermisosUsuario").textContent = textoTipoAcceso || "sin seleccionar";
	modal.classList.add("activo");
	modal.setAttribute("aria-hidden", "false");
	setTimeout(function () {
		var botonPrincipal = document.getElementById("btnGuardarActualizarPermisosUsuario");
		if (botonPrincipal) botonPrincipal.focus();
	}, 50);
}

function cerrarModalConfirmarEdicionUsuario() {
	var modal = document.getElementById("modalConfirmarEdicionUsuario");
	if (!modal) return;
	modal.classList.remove("activo");
	modal.setAttribute("aria-hidden", "true");
}

function confirmarEdicionUsuario(actualizarPermisos) {
	cerrarModalConfirmarEdicionUsuario();
	verificarcamposusuario(actualizarPermisos);
}

document.addEventListener("keydown", function (evento) {
	if (evento.key === "Escape") cerrarModalConfirmarEdicionUsuario();
});

function verificarcamposusuario(actualizarPermisos) {
	var inptNombreApellidoUsuario = document.getElementById('inptNombreApellidoUsuario').value
	var inptNroDocUsuario = document.getElementById('inptNroDocUsuario').value
	var inptNroTelefUsuario = document.getElementById('inptNroTelefUsuario').value
	var inptClaveAcceso = document.getElementById('inptClaveAcceso').value
	var inptContrasenhaUser = document.getElementById('inptContrasenhaUser').value
	var inptTipoUser = document.getElementById('inptTipoUser').value
	var inptTipoUsuario = document.getElementById('inptTipoUsuario').value
	var inptEstadoUser = document.getElementById('inptEstadoUser').value
	var inptlocaluser = document.getElementById('inptlocaluser').value
	if (inptNombreApellidoUsuario == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DE USUARIO")
		return false;
	}
	if (inptNroDocUsuario == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE DOCUMENTO")
		return false;
	}
	if (inptClaveAcceso == "") {
		ver_vetana_informativa("FALTO INGRESAR LA CLAVE DE ACCESO")
		return false;
	}
	if (inptContrasenhaUser == "") {
		ver_vetana_informativa("FALTO INGRESAR LA CONTRASEÑA")
		return false;
	}
	var accion = "";
	if (idAbmUsuario != "") {
		accion = "editar";
		if(controlacceso("INSERTARLISTADOUSUARIO","accion")==false){return;}
		if (actualizarPermisos !== "SI" && actualizarPermisos !== "NO") {
			abrirModalConfirmarEdicionUsuario();
			return;
		}
	} else {
		accion = "nuevo";
		if(controlacceso("EDITARLISTADOUSUARIO","accion")==false){return;}
		actualizarPermisos = "SI";
	}
	abmusuario(inptNombreApellidoUsuario, inptNroDocUsuario, inptNroTelefUsuario, inptClaveAcceso, inptContrasenhaUser, inptTipoUser, inptEstadoUser, inptlocaluser, inptTipoUsuario, idAbmUsuario, accion, actualizarPermisos);
}
function abmusuario(nombre_persona, rut_usuario, telefono, login, pass, acceso, estado, cod_localFK, tipo_usuario,cod_persona, accion, actualizarPermisos) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_persona", cod_persona)
	datos.append("nombre_persona", nombre_persona)
	datos.append("rut_usuario", rut_usuario)
	datos.append("telefono", telefono)
	datos.append("login", login)
	datos.append("password", pass)
	datos.append("estado", estado)
	datos.append("cod_localFK", cod_localFK)
	datos.append("acceso", acceso)
	datos.append("tipo_usuario", tipo_usuario)
	datos.append("actualizar_permisos", actualizarPermisos === "NO" ? "NO" : "SI")
	var inputFoto = document.getElementById("inptFotoPerfilUsuario");
	if (inputFoto && inputFoto.files && inputFoto.files[0]) {
		datos.append("foto_perfil", inputFoto.files[0]);
	}
	datos.append("foto_perfil_actual", document.getElementById("inptFotoPerfilActualUsuario").value)
	datos.append("quitar_foto_perfil", document.getElementById("inptQuitarFotoPerfilUsuario").value)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
		type: "post",
		 cache:false,
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
				if (Respuesta === "FOTO_INVALIDA") {
					ver_vetana_informativa("LA FOTO DEBE SER JPG, PNG O WEBP Y NO SUPERAR 2 MB");
					return;
				}
				if (Respuesta === "ERROR_FOTO_PERFIL") {
					ver_vetana_informativa("NO SE PUDO GUARDAR LA FOTO DE PERFIL");
					return;
				}
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					limpiarcamposusuarios()
					if (accion === "editar" && actualizarPermisos === "NO") {
						ver_vetana_informativa("USUARIO GUARDADO. LOS PERMISOS ACTUALES FUERON CONSERVADOS")
					} else if (accion === "editar") {
						ver_vetana_informativa("USUARIO Y PERMISOS ACTUALIZADOS CORRECTAMENTE")
					} else {
						ver_vetana_informativa("USUARIO GUARDADO CORRECTAMENTE")
					}
					idAbmUsuario = ""
					buscarabmusuario()
					buscarabmUsuarioOption()
				}
					
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function AbmEditarMisDatos() {
	var nombre=document.getElementById("inptNombreMisDatos").value.trim();
	if(nombre==""){
		ver_vetana_informativa("EL NOMBRE NO PUEDE QUEDAR VACÍO")
		return;
	}
	var user=document.getElementById("inptUserMisDatos").value.trim();
	if(user==""){
		ver_vetana_informativa("EL USUARIO DE ACCESO NO PUEDE QUEDAR VACÍO")
		return;
	}
	var pass=document.getElementById("inptPassMisDatos").value;
	if(pass !== "" && pass.length < 4){
		ver_vetana_informativa("LA NUEVA CONTRASEÑA DEBE TENER AL MENOS 4 CARACTERES")
		return;
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editarMisDatos")
	datos.append("user", user)
	datos.append("pass", pass)
	datos.append("nombre", nombre)
	datos.append("local", cod_localFKUSer)
	var inputFoto = document.getElementById("inptFotoMiPerfil");
	if (inputFoto.files && inputFoto.files[0]) datos.append("foto_perfil", inputFoto.files[0]);
	datos.append("quitar_foto_perfil", document.getElementById("inptQuitarFotoMiPerfil").value)
	var OpAjax = $.ajax({
		
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
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
				if (Respuesta === "FOTO_INVALIDA") {
					ver_vetana_informativa("LA FOTO DEBE SER JPG, PNG O WEBP Y NO SUPERAR 2 MB");
					return;
				}
				if (Respuesta === "ERROR_FOTO_PERFIL") {
					ver_vetana_informativa("NO SE PUDO GUARDAR LA FOTO DE PERFIL");
					return;
				}
			   Respuesta=respuestaJqueryAjax(Respuesta)
		if (Respuesta == true) {	
					var rutaFoto = datos["2"] || "";
					fotoPerfilSesionActual = rutaFoto;
					perfilRequiereActualizacion = rutaFoto === "";
					usuarioAccesoSesion = user;
					document.getElementById("spNombreLogin").textContent = nombre;
					var destinosNombre = ["ptituloUser2", "lblUser", "pUsuarioCabecera", "bNombreUser"];
					for (var i = 0; i < destinosNombre.length; i++) {
						var destinoNombre = document.getElementById(destinosNombre[i]);
						if (destinoNombre) destinoNombre.textContent = nombre;
					}
					var cajeraVenta = document.getElementById("pCajeraVenta");
					if (cajeraVenta) cajeraVenta.textContent = "(" + nombre + ")";
					document.getElementById("inptPassMisDatos").value = "";
					var imagenSesion = document.getElementById("imgFotoPerfilSesion");
					if (imagenSesion) {
						imagenSesion.src = rutaFoto
							? "/GoodVentaElectroCasaMaric/" + String(rutaFoto).replace(/^\/+/, "")
							: fotoPerfilUsuarioSinFoto;
						imagenSesion.alt = "Foto de perfil de " + nombre;
					}
					liberarVistaPreviaMiPerfil();
					verCerrarMisDatos("2");
					ver_vetana_informativa("PERFIL ACTUALIZADO CORRECTAMENTE")					
					}

			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadouser(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarUser1').checked=true
		document.getElementById('inptSeleccEstadoBuscarUser2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarUser1').checked=false
		document.getElementById('inptSeleccEstadoBuscarUser2').checked=true
	}
}

var fotoMiPerfilObjectUrl = "";

function liberarVistaPreviaMiPerfil() {
	if (fotoMiPerfilObjectUrl && window.URL && window.URL.revokeObjectURL) {
		window.URL.revokeObjectURL(fotoMiPerfilObjectUrl);
	}
	fotoMiPerfilObjectUrl = "";
}

function prepararFormularioMiPerfil() {
	liberarVistaPreviaMiPerfil();
	var nombre = document.getElementById("spNombreLogin");
	document.getElementById("inptNombreMisDatos").value = nombre ? nombre.textContent.trim() : "";
	document.getElementById("inptUserMisDatos").value = typeof usuarioAccesoSesion !== "undefined" ? usuarioAccesoSesion : "";
	document.getElementById("inptPassMisDatos").value = "";
	document.getElementById("inptFotoMiPerfil").value = "";
	document.getElementById("inptQuitarFotoMiPerfil").value = "NO";
	var ruta = typeof fotoPerfilSesionActual !== "undefined" ? fotoPerfilSesionActual : "";
	document.getElementById("imgFotoMiPerfil").src = ruta
		? "/GoodVentaElectroCasaMaric/" + String(ruta).replace(/^\/+/, "")
		: fotoPerfilUsuarioSinFoto;
	document.getElementById("btnQuitarFotoMiPerfil").style.display = ruta ? "" : "none";
	var aviso = document.getElementById("avisoCompletarMiPerfil");
	if (aviso) {
		aviso.style.display = typeof perfilRequiereActualizacion !== "undefined" && perfilRequiereActualizacion
			? "flex"
			: "none";
	}
}

function previsualizarFotoMiPerfil(input) {
	if (!input || !input.files || !input.files[0]) return;
	var archivo = input.files[0];
	if (["image/jpeg", "image/png", "image/webp"].indexOf(archivo.type) === -1) {
		ver_vetana_informativa("LA FOTO DEBE SER JPG, PNG O WEBP");
		input.value = "";
		return;
	}
	if (archivo.size > 2 * 1024 * 1024) {
		ver_vetana_informativa("LA FOTO NO PUEDE SUPERAR 2 MB");
		input.value = "";
		return;
	}
	liberarVistaPreviaMiPerfil();
	fotoMiPerfilObjectUrl = window.URL.createObjectURL(archivo);
	document.getElementById("imgFotoMiPerfil").src = fotoMiPerfilObjectUrl;
	document.getElementById("inptQuitarFotoMiPerfil").value = "NO";
	document.getElementById("btnQuitarFotoMiPerfil").style.display = "";
}

function quitarFotoMiPerfil() {
	liberarVistaPreviaMiPerfil();
	document.getElementById("inptFotoMiPerfil").value = "";
	document.getElementById("inptQuitarFotoMiPerfil").value = "SI";
	document.getElementById("imgFotoMiPerfil").src = fotoPerfilUsuarioSinFoto;
	document.getElementById("btnQuitarFotoMiPerfil").style.display = "none";
}

function alternarVisibilidadClaveMiPerfil(boton) {
	var campo = document.getElementById("inptPassMisDatos");
	var mostrar = campo.type === "password";
	campo.type = mostrar ? "text" : "password";
	var icono = boton.querySelector("i");
	if (icono) icono.className = mostrar ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
	boton.setAttribute("aria-label", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
}

var listadoAbmUsuarios = null;
function inicializarListadoAbmUsuarios() {
	if (!window.AbmListadoCore) return;
	var formulario = document.getElementById('divAbmUsuario1');
	var cuerpo = document.getElementById('table_abm_usuarios');
	var cabecera = formulario ? formulario.querySelector('.tableCabeceraRegistro tr') : null;
	if (!cuerpo || !cabecera) return;
	if (cuerpo.dataset.abmCoreAislado !== '1' && cuerpo.parentNode) {
		var cuerpoAislado = cuerpo.cloneNode(true);
		cuerpoAislado.dataset.abmCoreAislado = '1';
		cuerpo.parentNode.replaceChild(cuerpoAislado, cuerpo);
		cuerpo = cuerpoAislado;
	}
	cabecera.id = 'cabeceraAbmUsuarios';
	var opciones = formulario.querySelector('.abm-estandar-menu-columnas');
	if (opciones) opciones.id = 'opcionesColumnasUsuarios';
	if (!listadoAbmUsuarios) {
		listadoAbmUsuarios = window.AbmListadoCore.crear({
			nombre: 'usuarios',
			idCabecera: 'cabeceraAbmUsuarios',
			idCuerpo: 'table_abm_usuarios',
			idOpcionesColumnas: 'opcionesColumnasUsuarios',
			ordenable: true,
			ordenInicial: 'usuario',
			columnas: [
				{ campo: 'codigo', titulo: '#', ancho: '5%' },
				{ campo: 'foto_perfil', titulo: 'FOTO', ancho: '7%', ordenable: false },
				{ campo: 'documento', titulo: 'NRO DOC.', ancho: '10%' },
				{ campo: 'usuario', titulo: 'USUARIO', ancho: '10%' },
				{ campo: 'local', titulo: 'LOCAL', ancho: '10%' }
			],
			fila: {
				funcionSeleccion: 'obtenerdatosabmusuario',
				celdas: [
					{ id: 'td_id', columna: 'codigo', campo: 'codigo' },
					{
						id: 'td_foto_perfil',
						columna: 'foto_perfil',
						campo: 'foto_perfil',
						className: 'usuario-listado-foto-celda',
						render: function (ruta, registro) {
							var imagen = document.createElement('img');
							imagen.className = 'usuario-listado-avatar';
							imagen.src = ruta
								? '/GoodVentaElectroCasaMaric/' + String(ruta).replace(/^\/+/, '')
								: fotoPerfilUsuarioSinFoto;
							imagen.alt = registro && registro.usuario
								? 'Foto de perfil de ' + registro.usuario
								: 'Usuario sin foto de perfil';
							imagen.loading = 'lazy';
							imagen.onerror = function () {
								this.onerror = null;
								this.src = fotoPerfilUsuarioSinFoto;
							};
							return imagen;
						}
					},
					{ id: 'td_datos_2', columna: 'documento', campo: 'documento' },
					{ id: 'td_datos_1', columna: 'usuario', campo: 'usuario' },
					{ id: 'td_datos_9', columna: 'local', campo: 'local' },
					{ id: 'td_datos_3', tecnica: true, campo: 'login' },
					{ id: 'td_datos_4', tecnica: true, campo: 'password' },
					{ id: 'td_datos_5', tecnica: true, campo: 'estado' },
					{ id: 'td_datos_6', tecnica: true, campo: 'acceso' },
					{ id: 'td_datos_7', tecnica: true, campo: 'codigo_local' },
					{ id: 'td_datos_8', tecnica: true, campo: 'telefono' },
					{ id: 'td_datos_10', tecnica: true, campo: 'tipo_usuario' },
					{ id: 'td_datos_11', tecnica: true, campo: 'foto_perfil' }
				]
			}
		});
	}
	listadoAbmUsuarios.iniciar();
}

function programarListadoAbmUsuarios() {
	setTimeout(inicializarListadoAbmUsuarios, 0);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', programarListadoAbmUsuarios);
else programarListadoAbmUsuarios();

function buscarabmusuario() {
if(controlacceso("BUSCARLISTADOUSUARIO","accion")==false){return;}
	var codigo = document.getElementById('inptBuscarUsuario1').value
	var documento = document.getElementById('inptBuscarUsuario2').value
	var usuario = document.getElementById('inptBuscarUsuario3').value
	var local = document.getElementById('inptBuscarUsuario4').value
	if(document.getElementById('inptSeleccEstadoBuscarUser1').checked==true){
		estado='Activo'
	}else{
		estado='Inactivo'
	}
	document.getElementById("table_abm_usuarios").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"documento": documento,
		"usuario": usuario,
		"estado": estado,
		"local": local,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
		type: "post",
		  
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_usuarios").innerHTML = ''
		},
		success: function (responseText) {
		var Respuesta = responseText;
		console.log(Respuesta)
		document.getElementById("table_abm_usuarios").innerHTML = ''
		try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					inicializarListadoAbmUsuarios()
					listadoAbmUsuarios.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
				
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposusuarios() {
	document.getElementById('inptNombreApellidoUsuario').value = ""
	document.getElementById('inptNroDocUsuario').value = ""
	document.getElementById('inptNroTelefUsuario').value = ""
	document.getElementById('inptClaveAcceso').value = ""
	document.getElementById('inptContrasenhaUser').value = ""
	document.getElementById('inptTipoUsuario').value = ""
	liberarVistaPreviaFotoPerfilUsuario()
	document.getElementById('inptFotoPerfilUsuario').value = ""
	document.getElementById('inptFotoPerfilActualUsuario').value = ""
	document.getElementById('inptQuitarFotoPerfilUsuario').value = "NO"
	actualizarVistaFotoPerfilUsuario("")
	document.getElementById('inptRegistroSeleccUser').value = ""
	document.getElementById('inptEstadoUser').value = "Activo";
	document.getElementById('btnAbmUsuario').value = "Guardar datos";
	document.getElementById('btnEditarUsuario').style.backgroundColor="#b7b7b7";
	idAbmUsuario = "";
	seleccionarLocalUSer()
}
function verCerrarAccesoUsuario(d) {
   
    if (d == "1") {
	if(controlacceso("VERACCESOSUARIOS","accion")==false){return;}
	if(idAbmUsuario==""){
	ver_vetana_informativa("FALTO SELCCIONAR UN REGISTRO")
	return false;
	}
		 document.getElementById("divVistaAcceso").style.display = ""
 //  

		 idAbmAccesoUser="";
		asegurarResumenVisualAccesosUsuario()
		actualizarResumenVisualAccesosUsuario("Cargando permisos...")
		buscarAccesosUser()
    }else{
//  
$("div[id=divVistaAcceso]").fadeOut(500);
 
}
}
function actualizarEstadoVisualAccesoUsuario(control) {
	if (!control) return;
	var fila = control.closest ? control.closest(".accesos-item-row") : null;
	if (fila) {
		fila.className = "accesos-item-row " + (control.checked ? "is-enabled" : "is-disabled");
	}
	var etiqueta = control.parentNode ? control.parentNode.querySelector(".accesos-switch-text") : null;
	if (etiqueta) etiqueta.textContent = control.checked ? "Habilitado" : "Bloqueado";
}

function actualizarResumenVisualAccesosUsuario(mensaje) {
	var contenedor = document.getElementById("table_abm_accesos_Abm");
	var checks = contenedor ? contenedor.querySelectorAll("input[type='checkbox']") : [];
	var seleccionados = 0;
	for (var i = 0; i < checks.length; i++) {
		if (checks[i].checked) seleccionados++;
	}
	var estado = document.getElementById("lblEstadoAccesosVisibles");
	if (estado && mensaje !== undefined) estado.textContent = mensaje;
	var contador = document.getElementById("lblContadorAccesosVisibles");
	if (contador) contador.textContent = "Seleccionados: " + seleccionados + " de " + checks.length + " visibles";
}

function asegurarResumenVisualAccesosUsuario() {
	var cuerpo = document.querySelector("#divVistaAcceso .accesos-body > center");
	var cabecera = cuerpo ? cuerpo.querySelector(".tableCabeceraRegistro") : null;
	if (!cuerpo || !cabecera || document.getElementById("resumenVisualAccesosUsuario")) return;
	var resumen = document.createElement("div");
	resumen.id = "resumenVisualAccesosUsuario";
	resumen.className = "accesos-toolbar-meta";
	var contador = document.createElement("p");
	contador.id = "lblContadorAccesosVisibles";
	contador.className = "accesos-counter";
	contador.textContent = "Seleccionados: 0 de 0 visibles";
	var estado = document.createElement("p");
	estado.id = "lblEstadoAccesosVisibles";
	estado.className = "accesos-status";
	var ayuda = document.createElement("p");
	ayuda.className = "accesos-autosave-info";
	ayuda.textContent = "Los cambios se guardan automaticamente al marcar o desmarcar un permiso.";
	resumen.appendChild(contador);
	resumen.appendChild(estado);
	resumen.appendChild(ayuda);
	cuerpo.insertBefore(resumen, cabecera);
}

function renderizarAccesosUsuario(registros) {
	var contenedor = document.getElementById("table_abm_accesos_Abm");
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	asegurarResumenVisualAccesosUsuario();
	if (!Array.isArray(registros) || registros.length === 0) {
		var vacio = document.createElement("div");
		vacio.className = "accesos-empty";
		vacio.textContent = "No se encontraron permisos con el criterio ingresado.";
		contenedor.appendChild(vacio);
		actualizarResumenVisualAccesosUsuario("");
		return;
	}
	var tabla = document.createElement("table");
	tabla.className = "accesos-list-table";
	var cuerpo = document.createElement("tbody");
	registros.forEach(function (registro) {
		if (registro.nuevo_grupo) {
			var filaGrupo = document.createElement("tr");
			filaGrupo.className = "accesos-group";
			var tituloGrupo = document.createElement("th");
			tituloGrupo.colSpan = 2;
			tituloGrupo.textContent = registro.formulario || "SIN FORMULARIO";
			filaGrupo.appendChild(tituloGrupo);
			cuerpo.appendChild(filaGrupo);
		}
		var fila = document.createElement("tr");
		fila.className = "accesos-item-row " + (registro.accion === "SI" ? "is-enabled" : "is-disabled");
		var informacion = document.createElement("td");
		informacion.className = "accesos-item-info";
		var nombre = document.createElement("span");
		nombre.className = "accesos-item-title";
		nombre.textContent = registro.nombre || "";
		informacion.appendChild(nombre);
		if (registro.codigo) {
			var meta = document.createElement("span");
			meta.className = "accesos-item-meta";
			var codigo = document.createElement("span");
			codigo.className = "accesos-item-code";
			codigo.textContent = "Codigo: " + registro.codigo;
			meta.appendChild(codigo);
			informacion.appendChild(meta);
		}
		var accion = document.createElement("td");
		accion.className = "accesos-item-action";
		var etiqueta = document.createElement("label");
		etiqueta.className = "accesos-switch";
		var control = document.createElement("input");
		control.type = "checkbox";
		control.id = String(registro.id_acceso == null ? "" : registro.id_acceso);
		control.checked = registro.accion === "SI";
		control.setAttribute("data-estado-guardado", control.checked ? "SI" : "NO");
		control.setAttribute("aria-label", "Cambiar permiso " + (registro.nombre || ""));
		control.addEventListener("click", function () {
			actualizarEstadoVisualAccesoUsuario(this);
			actualizarResumenVisualAccesosUsuario("");
			abmacceso(this);
		});
		var deslizador = document.createElement("span");
		deslizador.className = "accesos-switch-track";
		var textoEstado = document.createElement("span");
		textoEstado.className = "accesos-switch-text";
		textoEstado.textContent = control.checked ? "Habilitado" : "Bloqueado";
		etiqueta.appendChild(control);
		etiqueta.appendChild(deslizador);
		etiqueta.appendChild(textoEstado);
		accion.appendChild(etiqueta);
		fila.appendChild(informacion);
		fila.appendChild(accion);
		cuerpo.appendChild(fila);
	});
	tabla.appendChild(cuerpo);
	contenedor.appendChild(tabla);
	actualizarResumenVisualAccesosUsuario("");
}
function buscarAccesosUser() {
	if(controlacceso("VERACCESOSUARIOS","accion")==false){return;}
	document.getElementById("table_abm_accesos_Abm").innerHTML = paginacargando
	asegurarResumenVisualAccesosUsuario()
	actualizarResumenVisualAccesosUsuario("Cargando permisos...")
	var buscador=document.getElementById("inptBuscarAccesos").value
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscador": buscador,
		"buscar": idAbmUsuario,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmAccesos.php",
		type: "post",
		
		 
		
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_accesos_Abm").innerHTML = ""
			actualizarResumenVisualAccesosUsuario("No se pudieron cargar los permisos.")
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_abm_accesos_Abm").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados1 = datos[2];
					if (Array.isArray(datos_buscados1)) renderizarAccesosUsuario(datos_buscados1);
					else document.getElementById("table_abm_accesos_Abm").innerHTML = datos_buscados1;
              	   document.getElementById("inpt_nivel_selecc").value = datos[3]
					actualizarResumenVisualAccesosUsuario("")
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				actualizarResumenVisualAccesosUsuario("No se pudieron cargar los permisos.")
			}
		}
	});
}
function abmacceso(d) {
	if(controlacceso("VERACCESOSUARIOS","accion")==false){return;}	
	var intpu=$(d)
	var idabm=d.id
	var accion="NO"
	if ($(intpu).is(':checked') ){
	accion="SI"
	}
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("usuarios_idusario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "editar")
	datos.append("idabm", idabm)
	datos.append("idAbmUsuario", idAbmUsuario)
	datos.append("acciones", accion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmAccesos.php",
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
					document.getElementById("inpt_nivel_selecc").value=datos["2"];
					d.setAttribute("data-estado-guardado", d.checked ? "SI" : "NO")
					actualizarEstadoVisualAccesoUsuario(d)
					actualizarResumenVisualAccesosUsuario("Permiso actualizado.")
					}			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
