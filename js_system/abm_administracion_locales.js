/*
ABM ADMINISTRACION LOCALES
*/
var listadoAbmAdminLocales = null;
function iniciarListadoAbmAdminLocales() {
	if (listadoAbmAdminLocales || !window.AbmListadoCore) { return listadoAbmAdminLocales; }
	var cuerpo = document.getElementById("table_abm_adminlocales");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmAdminLocales";
	listadoAbmAdminLocales = window.AbmListadoCore.crear({
		nombre: "admin_locales",
		idCabecera: "cabeceraAbmAdminLocales",
		idCuerpo: "table_abm_adminlocales",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "10%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "90%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosabmAdminLocales",
			claseTabla: "tableRegistroSearch",
			border: "0",
			cellspacing: "0",
			cellpadding: "0",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_3", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmAdminLocales.iniciar();
	return listadoAbmAdminLocales;
}
function verCerrarAbmAdminLocales(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmAdminLocales").style.display==""){
		document.getElementById("divMinimizadoAdminLocales").style.display="none"
		limpiarcamposbuscaradminlocales()
		limpiarcamposAdminLocales()
 
	$("div[id=divAbmAdminLocales]").fadeOut(500);	
	}else{
if(controlacceso("VERLISTADOADMINLOCALES","accion")==false){return;}	
mostrarSoloUno("divAbmAdminLocales")		
		document.getElementById("divAbmAdminLocales").style.display=""
		
	}
}
function limpiarcamposbuscaradminlocales(){
	document.getElementById('inptBuscarAbmAdminLocales1').value=""
	document.getElementById('inptBuscarAbmAdminLocales2').value=""
	document.getElementById("table_abm_adminlocales").innerHTML = ""
	document.getElementById("inptRegistroNroAdminLocales").value = ""
}
function minimizarabmadminlocales(){ 
	$("div[id=divAbmAdminLocales]").fadeOut(500);
	document.getElementById("divMinimizadoAdminLocales").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAdminLocales"));
}

function verCerrarVentanaAbmAdminLocales(d, l) {
	
	
	if (d == "1") {
		
		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADOVENDEDORES","accion")==false){return;}	
			limpiarcamposAdminLocales()
		}
		$("div[id=divAbmAdminLocales2]").fadeIn(250)
		document.getElementById('divAbmAdminLocales1').style.display = "none"
		
	} else {
		$("div[id=divAbmAdminLocales1]").fadeIn(250)
		document.getElementById('divAbmAdminLocales2').style.display = "none"
	}
}
function verVentanaEditarAdminLocales() {
	if(controlacceso("EDITARLISTADOADMINLOCALES","accion")==false){return;}	
	if (idAbmAdminLocales == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmAdminLocales("1", "2")
}
var idAbmAdminLocales = ""
function obtenerdatosabmAdminLocales(datostr) {


	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});

	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptDescripcionAdminLocales').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptDescripcionAdminLocales').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoAdminLocales').value = $(datostr).children('td[id="td_datos_3"]').html();
	idAbmAdminLocales = $(datostr).children('td[id="td_id"]').html();
document.getElementById('btnAbmAdminLocales').value = "Editar datos";
document.getElementById('btnEditarAdminLocales').style.backgroundColor="";
document.getElementById('btnLocalAdminLocales').style.backgroundColor="";
cod_adminlocalesLocal=$(datostr).children('td[id="td_id"]').html();


}


function abmAdminLocalesLocales(d) {
	
	var idDV=d.id
	var accion=d.name
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("idAbmUsuario", userid)
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "EditarDetalleAdminLocales")
	datos.append("idDV", idDV)	
	datos.append("accion", accion)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
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
					
					if(accion=="SI"){
						d.name="NO"
					}else{
						d.name="SI"
					}
					
					buscarAdminLocalesSelec()
					
					}			
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}



function verificarcamposAdminLocales() {

	var inptDescripcionAdminLocales = document.getElementById('inptDescripcionAdminLocales').value
	
	var inptEstadoAdminLocales = document.getElementById('inptEstadoAdminLocales').value


	if (inptDescripcionAdminLocales == "") {
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return false;
	}


if (inptEstadoAdminLocales == "") {
		ver_vetana_informativa("FALTO SELECCIONAR EL ESTADO")
		return false;
	}

	var accion = "";
	if (idAbmAdminLocales != "") {
		accion = "editar";
		if(controlacceso("EDITARLISTADOADMINLOCALES","accion")==false){return;}	
	} else {
		if(controlacceso("INSERTARLISTADOADMINLOCALES","accion")==false){return;}	
		accion = "nuevo";
	}
	abmadminlocales(inptDescripcionAdminLocales, inptEstadoAdminLocales, idAbmAdminLocales, accion);
}
function abmadminlocales(descripcion, estado, idadminlocales, accion) {

	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idadminlocales", idadminlocales)
	datos.append("estado", estado)
	datos.append("descripcion", descripcion)
	var OpAjax = $.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
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
					limpiarcamposAdminLocales()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmAdminLocales = ""
					buscarabmAdminLocales()
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function checkestadoAdminLocales(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarAdminLocales1').checked=true
		document.getElementById('inptSeleccEstadoBuscarAdminLocales2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarAdminLocales1').checked=false
		document.getElementById('inptSeleccEstadoBuscarAdminLocales2').checked=true
	}
}
function buscarabmAdminLocales() {
if(controlacceso("BUSCARLISTADOADMINLOCALES","accion")==false){return;}
	var listado = iniciarListadoAbmAdminLocales();
	var codigo = document.getElementById('inptBuscarAbmAdminLocales1').value
	var descripcion = document.getElementById('inptBuscarAbmAdminLocales2').value
	var estado = ""
	if(	document.getElementById('inptSeleccEstadoBuscarAdminLocales1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_adminlocales").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"codigo": codigo,
		"descripcion": descripcion,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_adminlocales").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_adminlocales").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptRegistroNroAdminLocales").value = datos[3]
					
					document.getElementById("btnEditarAdminLocales").style.backgroundColor="#b7b7b7";
					document.getElementById("btnLocalAdminLocales").style.backgroundColor="#b7b7b7";

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmAdminLocales);
} else {
	iniciarListadoAbmAdminLocales();
}



function buscarAdminLocalesSelec() {
	
	
	document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML = ""
	document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML = ""
	
	
	

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarselect"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			
			document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML = ""
			document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML = ""
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			
			document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML = ""
			document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML = ""
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptlocalAdminLocalesBuscarInventario").innerHTML =datos_buscados
					document.getElementById("inptlocalAdminLocalesBuscarStock").innerHTML =datos_buscados

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



function limpiarcamposAdminLocales() {
	document.getElementById('inptRegistroSeleccAdminLocales').value = "";
	document.getElementById('inptDescripcionAdminLocales').value = "";

	document.getElementById('inptEstadoAdminLocales').value = "Activo";
	document.getElementById('btnAbmAdminLocales').value = "Guardar datos";
	document.getElementById('btnEditarAdminLocales').style.backgroundColor="#b7b7b7"
	document.getElementById('btnLocalAdminLocales').style.backgroundColor="#b7b7b7"
	idAbmAdminLocales = "";
}

/* ADMIN LOCAL CON LOCALES */
function verCerrarAdminLocalesLocales(){
	
	if(idAbmAdminLocales==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN ITEM")
		return false;
	}
	
	
	if(document.getElementById("divAdminLocalLocales").style.display==""){
	 
	$("div[id=divAdminLocalLocales]").fadeOut(500);	
	}else{
				
	 document.getElementById("divAdminLocalLocales").style.display=""
      
	 buscarLocalAdminLocales();
	
		
	}
}

function renderizarLocalesAdminLocal(registros) {
	var contenedor = document.getElementById("table_abm_locales_admin_local");
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(registros || []).forEach(function (registro) {
		var tabla = document.createElement("table");
		tabla.className = "tableRegistroSearch";
		tabla.setAttribute("border", "0");
		tabla.setAttribute("cellspacing", "0");
		tabla.setAttribute("cellpadding", "0");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		var codigo = document.createElement("td");
		codigo.style.width = "5%";
		codigo.textContent = registro.codigo == null ? "" : registro.codigo;
		var local = document.createElement("td");
		local.id = "td_datos_1";
		local.style.width = "70%";
		local.textContent = registro.local || "";
		var accion = document.createElement("td");
		accion.style.width = "25%";
		var control = document.createElement("input");
		control.type = "checkbox";
		control.id = String(registro.codigo == null ? "" : registro.codigo);
		control.checked = !!registro.asignado;
		control.addEventListener("click", function () {
			if (this.checked) AbmVerificarRelacionAdminLocales(this);
			else EliminarRelacionAdminLocales(this);
		});
		accion.appendChild(control);
		fila.appendChild(codigo);
		fila.appendChild(local);
		fila.appendChild(accion);
		tabla.appendChild(fila);
		contenedor.appendChild(tabla);
	});
}

function buscarLocalAdminLocales() {


	document.getElementById("table_abm_locales_admin_local").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idAbmAdminLocales": idAbmAdminLocales,		
		"formato": "json",
		"funt": "buscarAdminLocalLocales"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_locales_admin_local").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_locales_admin_local").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (Array.isArray(datos_buscados)) renderizarLocalesAdminLocal(datos_buscados);
					else document.getElementById("table_abm_locales_admin_local").innerHTML = datos_buscados;
					
					}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				
			}
		}
	});
}

/* ADMIN LOCAL RELACION */
function  AbmVerificarRelacionAdminLocales(dt){
	
			var idlocal = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "checkearAdminLocalLocales")
			 datos.append("idAbmAdminLocales" , idAbmAdminLocales)
			 datos.append("idlocalFK" , idlocal)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
		success: function (responseText) {
			Respuesta = responseText;
			console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarabmAdminLocales()
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
function  EliminarRelacionAdminLocales(dt){
	
			var idlocal = dt.id;
			
			var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "eliminarRelacionAdminLocales")
			 datos.append("idAbmAdminLocales" , idAbmAdminLocales)
			 datos.append("idlocalFK" , idlocal)		
				
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmadminlocales.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
		
				error: function(jqXHR, textstatus, errorThrowm){
					
					manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		   Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarabmAdminLocales()
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
