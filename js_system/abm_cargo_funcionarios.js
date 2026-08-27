/*
ABM CARGO FUNCIONARIOS
*/
var listadoAbmCargoFuncionarios = null;
function iniciarListadoAbmCargoFuncionarios() {
	if (listadoAbmCargoFuncionarios || !window.AbmListadoCore) { return listadoAbmCargoFuncionarios; }
	var formulario = document.getElementById("divAbmCargoFuncionarios1");
	var cuerpo = document.getElementById("table_abm_CargoFuncionarios");
	var cabecera = formulario ? formulario.querySelector("table.tableCabeceraRegistro tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraAbmCargoFuncionarios";
	var opciones = formulario.querySelector(".abm-estandar-menu-columnas");
	if (opciones) { opciones.id = "opcionesColumnasCargoFuncionarios"; }
	listadoAbmCargoFuncionarios = window.AbmListadoCore.crear({
		nombre: "cargo_funcionarios",
		idCabecera: "cabeceraAbmCargoFuncionarios",
		idCuerpo: "table_abm_CargoFuncionarios",
		idOpcionesColumnas: "opcionesColumnasCargoFuncionarios",
		ordenInicial: "nombre",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "20%" },
			{ campo: "nombre", titulo: "NOMBRE", ancho: "80%" }
		],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmCargoFuncionarios",
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo" },
				{ id: "td_datos_1", campo: "nombre", columna: "nombre", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmCargoFuncionarios.iniciar();
	return listadoAbmCargoFuncionarios;
}
function programarListadoAbmCargoFuncionarios() {
	setTimeout(iniciarListadoAbmCargoFuncionarios, 0);
}
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", programarListadoAbmCargoFuncionarios);
} else {
	programarListadoAbmCargoFuncionarios();
}
function verCerrarAbmCargoFuncionarios(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmCargoFuncionarios").style.display==""){
		document.getElementById("divMinimizadoCargoFuncionarios").style.display="none"
		limpiarcamposCargoFuncionarios()
		limpiarcamposbuscarCargoFuncionarios()
//  
	$("div[id=divAbmCargoFuncionarios]").fadeOut(500);	
	}else{		
		
		// if(controlacceso("VERLISTADODECargoFuncionariosS","accion")==false){return;}
		mostrarSoloUno("divAbmCargoFuncionarios")	
		document.getElementById("divAbmCargoFuncionarios").style.display=""
//  
	}
}

function verCerrarVentanaAbmCargoFuncionarios(d, l) {
	if (d == "1") {		
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADODECargoFuncionariosS","accion")==false){return;}
			limpiarcamposCargoFuncionarios()
		}
		$("div[id=divAbmCargoFuncionarios2]").fadeIn(250)
		document.getElementById('divAbmCargoFuncionarios1').style.display = "none"
	} else {
		$("div[id=divAbmCargoFuncionarios1]").fadeIn(250)
		document.getElementById('divAbmCargoFuncionarios2').style.display = "none"
	}
}

function limpiarcamposbuscarCargoFuncionarios(){
	    document.getElementById('inptBuscarAbmCargoFuncionarios2').value=""
		document.getElementById("table_abm_CargoFuncionarios").innerHTML = ""
		document.getElementById("inptTotalRegistoCargoFuncionarios").value = "";
}
function minimizarabmCargoFuncionarios(){
//  
	$("div[id=divAbmCargoFuncionarios]").fadeOut(500);	
	document.getElementById("divMinimizadoCargoFuncionarios").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuAbmCargoFuncionarios"));
}

function verVentanaEditarCargoFuncionarios() {
	if (idAbmCargoFuncionarios == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	// if(controlacceso("EDITARLISTADODECargoFuncionarios","accion")==false){return;}
	verCerrarVentanaAbmCargoFuncionarios("1", "2")
}
var idAbmCargoFuncionarios = ""
function ObtenerdatosAbmCargoFuncionarios(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreCargoFuncionarios').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptRegistroSeleccCargoFuncionarios').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptEstadoCargoFuncionarios').value = $(datostr).children('td[id="td_datos_2"]').html();
	
	document.getElementById('btnAbmCargoFuncionarios').value = "Editar datos";
	document.getElementById('btnEditarDatosCargoFuncionarios').style.backgroundColor="";
	document.getElementById('btnMetasSalarioCargoFuncionarios').style.backgroundColor="";
	idAbmCargoFuncionarios = $(datostr).children('td[id="td_id"]').html();
}
function verificarcamposCargoFuncionarios() {
	var inptNombreCargoFuncionarios = document.getElementById('inptNombreCargoFuncionarios').value
	var inptEstadoCargoFuncionarios = document.getElementById('inptEstadoCargoFuncionarios').value
	if (inptNombreCargoFuncionarios == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL CARGO")
		return false;
	}
	
	var accion = "";
	if (idAbmCargoFuncionarios != "") {
		accion = "editar";
		// if(controlacceso("INSERTARLISTADODECargoFuncionariosS","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("EDITARLISTADODECargoFuncionarios","accion")==false){return;}
	}
	abmCargoFuncionarios(inptNombreCargoFuncionarios ,inptEstadoCargoFuncionarios , idAbmCargoFuncionarios, accion);
}
function abmCargoFuncionarios(nombre,estado , idCargoFuncionarios, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_CargoFuncionarios", idCargoFuncionarios)
	datos.append("nombre", nombre)
	datos.append("estado", estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCargoFuncionarios.php",
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
					limpiarcamposCargoFuncionarios()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmCargoFuncionarios = ""
					buscarabmCargoFuncionarios();
					// buscaroptionCargoFuncionarios()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function checkestadoCargoFuncionarios(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarCargoFuncionarios1').checked=true
	document.getElementById('inptSeleccEstadoBuscarCargoFuncionarios2').checked=false	
	}else{
	document.getElementById('inptSeleccEstadoBuscarCargoFuncionarios1').checked=false
	document.getElementById('inptSeleccEstadoBuscarCargoFuncionarios2').checked=true
	}
}
function buscarabmCargoFuncionarios() {
	// if(controlacceso("BUSCARLISTADODECargoFuncionariosS","accion")==false){return;}
	var listado = iniciarListadoAbmCargoFuncionarios();
	var nombre = document.getElementById('inptBuscarAbmCargoFuncionarios2').value
	var estado = ""
	if(document.getElementById('inptSeleccEstadoBuscarCargoFuncionarios1').checked==true){
		estado = "Activo"
	}else{
		estado = "Inactivo"
	}
	document.getElementById("table_abm_CargoFuncionarios").innerHTML = paginacargando
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmCargoFuncionarios.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CargoFuncionarios").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CargoFuncionarios").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if (listado) { listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []); }
					document.getElementById("inptTotalRegistoCargoFuncionarios").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarcamposCargoFuncionarios() {
	document.getElementById('inptNombreCargoFuncionarios').value = "";
	document.getElementById('inptRegistroSeleccCargoFuncionarios').value = "";
	document.getElementById('inptEstadoCargoFuncionarios').value = "Activo";
	document.getElementById('btnEditarDatosCargoFuncionarios').style.backgroundColor="#d5d3d3";
	document.getElementById('btnMetasSalarioCargoFuncionarios').style.backgroundColor="#d5d3d3";
	document.getElementById('btnAbmCargoFuncionarios').value = "Guardar datos";
	idAbmCargoFuncionarios= "";
}
 
function buscarabmOptionCargoFuncionario() {
	document.getElementById("inptCargoFuncionarios").innerHTML = "";
	document.getElementById("inptCargoCalcularSalarioFuncionarios").innerHTML = "";
	document.getElementById("inptSectorSueldos").innerHTML = ''
	 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCargoFuncionarios.php",
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
					document.getElementById("inptCargoFuncionarios").innerHTML = datos_buscados
					document.getElementById("inptCargoCalcularSalarioFuncionarios").innerHTML = datos_buscados
					document.getElementById("inptSectorSueldos").innerHTML = datos_buscados
					 
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
METAS SALARIO
*/
var idAbmMetasSalario="";
var ElementoSeleccMetasSalario="";
var listadoAbmMetasSalario = null;
function iniciarListadoAbmMetasSalario() {
	if (listadoAbmMetasSalario || !window.AbmListadoCore) return listadoAbmMetasSalario;
	var cuerpo = document.getElementById('divBuscadorMetasSalario');
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && cabecera.tagName !== 'TABLE') cabecera = cabecera.previousElementSibling;
	if (!cabecera) return null;
	cabecera.id = 'cabeceraAbmMetasSalario';
	listadoAbmMetasSalario = window.AbmListadoCore.crear({
		nombre: 'metas_salario',
		idCabecera: 'cabeceraAbmMetasSalario',
		idCuerpo: 'divBuscadorMetasSalario',
		ordenInicial: 'grupo',
		columnas: [
			{ campo: 'descripcion', titulo: 'DESCRIPCION', ancho: '25%' },
			{ campo: 'tipo_venta', titulo: 'TIPO', ancho: '10%' },
			{ campo: 'comision_desde', titulo: 'COMISION DESDE', ancho: '10%' },
			{ campo: 'tipo', titulo: 'TIPO', ancho: '10%' },
			{ campo: 'grupo', titulo: 'GRUPO', ancho: '15%' },
			{ campo: 'salario_valor', titulo: 'SALARIO', ancho: '10%' },
			{ campo: 'desde_valor', titulo: 'DESDE', ancho: '10%' },
			{ campo: 'hasta_valor', titulo: 'HASTA', ancho: '10%' }
		],
		fila: {
			funcionSeleccion: 'ObtenerdatosAbmMetasSalario',
			celdas: [
				{ id: 'td_id', campo: 'codigo', tecnica: true },
				{ id: 'td_datos_1', campo: 'descripcion', columna: 'descripcion', className: 'tdRegistroSearch' },
				{ id: 'td_datos_11', campo: 'tipo_venta', columna: 'tipo_venta' },
				{ id: 'td_datos_2', campo: 'comision_desde', columna: 'comision_desde' },
				{ id: 'td_datos_3', campo: 'tipo', columna: 'tipo' },
				{ id: 'td_datos_8', campo: 'grupo', columna: 'grupo' },
				{ campo: 'salario', columna: 'salario_valor' },
				{ id: 'td_datos_4', campo: 'salario_valor', tecnica: true },
				{ campo: 'desde', columna: 'desde_valor' },
				{ campo: 'hasta', columna: 'hasta_valor' },
				{ id: 'td_datos_5', campo: 'desde_valor', tecnica: true },
				{ id: 'td_datos_6', campo: 'hasta_valor', tecnica: true },
				{ id: 'td_datos_7', campo: 'estado', tecnica: true },
				{ id: 'td_datos_9', campo: 'metodo', tecnica: true },
				{ id: 'td_datos_10', campo: 'cargo_codigo', tecnica: true }
			]
		}
	});
	listadoAbmMetasSalario.iniciar();
	return listadoAbmMetasSalario;
}
function verCerrarFrmMetasSalario(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmMetasSalario").style.display==""){
 
	 
	$("div[id=divAbmMetasSalario]").fadeOut(500);	
		LimpiarCamposMetasSalario()
	}else{	
	// if(controlacceso("VERFACTURASHABILITADAS","accion")==false){return;	}
		if(idAbmCargoFuncionarios==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return false;
		}
	
		document.getElementById("divAbmMetasSalario").style.display=""
		 
		BuscarAbmMetasSalario()
	}
}
 
function LimpiarCamposMetasSalario(){
	document.getElementById("inptDescripcionMetasSalario").value="";		 
	document.getElementById("inptComisionDesdeMetasSalario").value="";		 
	document.getElementById("inptTipoMetasSalario").value="";		 
	document.getElementById("inptmetasMetasSalario").value="";		 
	document.getElementById("inptDesdeMetasSalario").value="";		 
	document.getElementById("inptHastaMetasSalario").value="";		 
	document.getElementById("inptEstadoMetasSalario").value="";		 
	document.getElementById("inptGrupoMetasSalario").value="";		 
	document.getElementById("inptMetodoMetasSalario").value="";		 
	document.getElementById("inptTipoVentaMetasSalario").value="";		 
 
	idAbmMetasSalario="";

}
function ObtenerdatosAbmMetasSalario(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
		
	datostr.className = 'tableRegistroSelec'
	
	idAbmMetasSalario = $(datostr).children('td[id="td_id"]').html();
    document.getElementById("inptDescripcionMetasSalario").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptComisionDesdeMetasSalario").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptTipoMetasSalario").value = $(datostr).children('td[id="td_datos_3"]').html();
    document.getElementById("inptmetasMetasSalario").value = $(datostr).children('td[id="td_datos_4"]').html();
    document.getElementById("inptDesdeMetasSalario").value = $(datostr).children('td[id="td_datos_5"]').html();
    document.getElementById("inptHastaMetasSalario").value = $(datostr).children('td[id="td_datos_6"]').html();
    document.getElementById("inptEstadoMetasSalario").value = $(datostr).children('td[id="td_datos_7"]').html();
    document.getElementById("inptGrupoMetasSalario").value = $(datostr).children('td[id="td_datos_8"]').html();
    document.getElementById("inptMetodoMetasSalario").value = $(datostr).children('td[id="td_datos_9"]').html();
    document.getElementById("inptTipoVentaMetasSalario").value = $(datostr).children('td[id="td_datos_11"]').html();

}
function VerificarDatosMetasSalario(){
	var inptDescripcionMetasSalario = document.getElementById("inptDescripcionMetasSalario").value
	var inptComisionDesdeMetasSalario = document.getElementById("inptComisionDesdeMetasSalario").value
	var inptTipoMetasSalario = document.getElementById("inptTipoMetasSalario").value
	var inptmetasMetasSalario = document.getElementById("inptmetasMetasSalario").value
	var inptDesdeMetasSalario = document.getElementById("inptDesdeMetasSalario").value
	var inptHastaMetasSalario = document.getElementById("inptHastaMetasSalario").value
	var inptEstadoMetasSalario =document.getElementById("inptEstadoMetasSalario").value
	var inptGrupoMetasSalario =document.getElementById("inptGrupoMetasSalario").value
	var inptMetodoMetasSalario =document.getElementById("inptMetodoMetasSalario").value
	var inptTipoVentaMetasSalario =document.getElementById("inptTipoVentaMetasSalario").value

	
	if(inptDescripcionMetasSalario==""){
		document.getElementById("inptDescripcionMetasSalario").focus()
		ver_vetana_informativa("Falto Ingresar la Descripcion")
		return
	}
	
	if(inptMetodoMetasSalario==""){
		document.getElementById("inptMetodoMetasSalario").focus()
		ver_vetana_informativa("Falto Seleccionar el Metodo")
		return
	}
	
	if(inptGrupoMetasSalario==""){
		document.getElementById("inptGrupoMetasSalario").focus()
		ver_vetana_informativa("Falto Ingresar el Grupo")
		return
	}
	if(inptComisionDesdeMetasSalario==""){
		document.getElementById("inptComisionDesdeMetasSalario").focus()
		ver_vetana_informativa("Falto la comision Venta o cobranza")
		return
	}
	
	if(inptTipoMetasSalario==""){
		document.getElementById("inptTipoMetasSalario").focus()
		ver_vetana_informativa("Falto seleccionar el Tipo")
		return
	}
	
	if(inptmetasMetasSalario==""){
		document.getElementById("inptmetasMetasSalario").focus()
		ver_vetana_informativa("Falto Ingresar la meta")
		return
	}
	
	if(inptDesdeMetasSalario==""){
		document.getElementById("inptDesdeMetasSalario").focus()
		ver_vetana_informativa("Falto Ingresar el desde")
		return
	}
	
	if(inptHastaMetasSalario==""){
		document.getElementById("inptHastaMetasSalario").focus()
		ver_vetana_informativa("Falto Ingresar el hasta")
		return
	}
	
	var accion = "";
	if (idAbmMetasSalario != "") {
		
		accion = "editar";
		// if(controlacceso("INSERTARFACTURASHABILITADAS","accion")==false){ return;}
	} else {
		// if(controlacceso("INSERTARFACTURASHABILITADAS","accion")==false){return;}
		accion = "nuevo";
	}
	AbmMetasSalario(inptTipoVentaMetasSalario,inptMetodoMetasSalario,inptGrupoMetasSalario,inptDescripcionMetasSalario,inptComisionDesdeMetasSalario,inptTipoMetasSalario,inptmetasMetasSalario,inptDesdeMetasSalario,inptHastaMetasSalario,inptEstadoMetasSalario,idAbmMetasSalario,accion)
}
function AbmMetasSalario(tipoventa,metodo,grupo,descripcion,comisiondesde,tipo,metas,desde,hasta,estado,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("comisiondesde", comisiondesde)
	datos.append("tipo", tipo)
	datos.append("metas", metas)
	datos.append("desde", desde)
	datos.append("hasta", hasta)
	datos.append("estado", estado)
	datos.append("cod_CargoFuncionariosFK", idAbmCargoFuncionarios)
	datos.append("grupo", grupo)
	datos.append("metodo", metodo)
	datos.append("tipoventa", tipoventa)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMMetasSalario.php",
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

					LimpiarCamposMetasSalario()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")				
					BuscarAbmMetasSalario()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}

		}
	});

}
function BuscarAbmMetasSalario() {
	// if(controlacceso("BUSCARFACTURASHABILITADAS","accion")==false){ return;}
	var buscador = ""
	var estado = "Activo"
	document.getElementById("divBuscadorMetasSalario").innerHTML = paginacargando
    document.getElementById("lblNroRegistroMetasSalario").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"idAbmCargoFuncionarios": idAbmCargoFuncionarios,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMMetasSalario.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorMetasSalario").innerHTML = ''
			document.getElementById("lblNroRegistroMetasSalario").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorMetasSalario").innerHTML = ''
			document.getElementById("lblNroRegistroMetasSalario").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
					var listado = iniciarListadoAbmMetasSalario();
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
                   document.getElementById("lblNroRegistroMetasSalario").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmMetasSalario);
else iniciarListadoAbmMetasSalario();

function contadorlength(datos){
	
	let longitudCadena = datos.value.length;


	if(longitudCadena>=4){
		separadordemiles(datos)
	}
	
}



