/*
ABM BANCO
*/
var listadoAbmBanco = null;
function iniciarListadoAbmBanco() {
	if (listadoAbmBanco || !window.AbmListadoCore) { return listadoAbmBanco; }
	var cuerpo = document.getElementById("table_abm_Banco");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmBanco";
	listadoAbmBanco = window.AbmListadoCore.crear({
		nombre: "banco",
		idCabecera: "cabeceraAbmBanco",
		idCuerpo: "table_abm_Banco",
		ordenInicial: "nombre",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "20%" },
			{ campo: "nombre", titulo: "NOMBRE", ancho: "80%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmBanco",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "nombre", columna: "nombre", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmBanco.iniciar();
	return listadoAbmBanco;
}
function verCerrarAbmBanco(){
document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmBanco").style.display==""){
		document.getElementById("divMinimizadoBanco").style.display="none"
		limpiarcamposBanco()
		limpiarcamposbuscarBanco()
//  
	$("div[id=divAbmBanco]").fadeOut(500);	
	}else{		
		
		if(controlacceso("VERLISTADODEBANCOS","accion")==false){return;}
		mostrarSoloUno("divAbmBanco")	
		document.getElementById("divAbmBanco").style.display=""
//  
	}
}

function verCerrarVentanaAbmBanco(d, l) {
	if (d == "1") {		
		if (l == "1") {
			if(controlacceso("INSERTARLISTADODEBANCOS","accion")==false){return;}
			limpiarcamposBanco()
		}
		$("div[id=divAbmBanco2]").fadeIn(250)
		document.getElementById('divAbmBanco1').style.display = "none"
	} else {
		$("div[id=divAbmBanco1]").fadeIn(250)
		document.getElementById('divAbmBanco2').style.display = "none"
	}
}

function limpiarcamposbuscarBanco(){
	    document.getElementById('inptBuscarAbmBanco2').value=""
		document.getElementById("table_abm_Banco").innerHTML = ""
		document.getElementById("inptTotalRegistoBanco").value = "";
}
function minimizarabmBanco(){ 
	$("div[id=divAbmBanco]").fadeOut(500);	
	document.getElementById("divMinimizadoBanco").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmBanco"));
}

function verVentanaEditarBanco() {
	if (idAbmBanco == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	if(controlacceso("EDITARLISTADODEBANCO","accion")==false){return;}
	verCerrarVentanaAbmBanco("1", "2")
}
var idAbmBanco = ""
function ObtenerdatosAbmBanco(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreBanco').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccBanco').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoBanco').value = $(datostr).children('td[id="td_datos_2"]').html();
	
	document.getElementById('btnAbmBanco').value = "Editar datos";
	document.getElementById('btnEditarDatosBanco').style.backgroundColor="";
	idAbmBanco = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposBanco() {
	var inptNombreBanco = document.getElementById('inptNombreBanco').value
	var inptEstadoBanco = document.getElementById('inptEstadoBanco').value
	if (inptNombreBanco == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL BANCO")
		return false;
	}
	
	var accion = "";
	if (idAbmBanco != "") {
		accion = "editar";
		if(controlacceso("INSERTARLISTADODEBANCOS","accion")==false){return;}
	} else {
		accion = "nuevo";
		if(controlacceso("EDITARLISTADODEBANCO","accion")==false){return;}
	}
	abmBanco(inptNombreBanco ,inptEstadoBanco , idAbmBanco, accion);
}
function abmBanco(nombre,estado , idBanco, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_Banco", idBanco)
	datos.append("nombre", nombre)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMBanco.php",
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
					limpiarcamposBanco()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmBanco = ""
					buscarabmBanco();
					buscaroptionBanco()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function checkestadoBanco(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarBanco1').checked=true
	document.getElementById('inptSeleccEstadoBuscarBanco2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarBanco1').checked=false
	document.getElementById('inptSeleccEstadoBuscarBanco2').checked=true
	}
}
function buscarabmBanco() {
	if(controlacceso("BUSCARLISTADODEBANCOS","accion")==false){return;}
	var listado = iniciarListadoAbmBanco();
	var nombre = document.getElementById('inptBuscarAbmBanco2').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarBanco1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_Banco").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"nombre": nombre,
		"estado": estado,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMBanco.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Banco").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Banco").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptTotalRegistoBanco").value = datos[3];
					
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmBanco);
} else {
	iniciarListadoAbmBanco();
}
function limpiarcamposBanco() {
	document.getElementById('inptNombreBanco').value = "";
	document.getElementById('inptRegistroSeleccBanco').value = "";
	document.getElementById('inptEstadoBanco').value = "Activo";
	document.getElementById('btnEditarDatosBanco').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmBanco').value = "Guardar datos";
	idAbmBanco= "";
}


