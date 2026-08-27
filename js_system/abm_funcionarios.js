/*
ABM FUNCIONARIOS
*/


function verCerrarAbmFuncionarios(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmFuncionarios").style.display==""){
		document.getElementById("divMinimizadoListadoFuncionarios").style.display="none"	
		limpiarcamposbuscarFuncionarios()
		limpiarcamposFuncionarios()
//  
	$("div[id=divAbmFuncionarios]").fadeOut(500);	
	}else{		
	// if(controlacceso("VERLISTADOFuncionariosES","accion")==false){return;}
	mostrarSoloUno("divAbmFuncionarios")	
		document.getElementById("divAbmFuncionarios").style.display=""
//  
		
	}
}
function limpiarcamposbuscarFuncionarios(){
	document.getElementById('inptBuscarFuncionarios1').value=""
	document.getElementById('inptBuscarFuncionarios2').value=""
	document.getElementById('inptBuscarFuncionarios3').value=""
	document.getElementById("table_abm_Funcionarios").innerHTML = ""
	document.getElementById("inptRegistroNroFuncionarios").value ="";
}
function minimizarabmFuncionarios(){ 
	$("div[id=divAbmFuncionarios]").fadeOut(500);
	document.getElementById("divMinimizadoListadoFuncionarios").style.display=""	
	copiarBotonEnContenedor(document.getElementById("divMenuAbmFuncionarios"));
}
function verCerrarVentanaAbmFuncionarios(d, l) {
	if (d == "1") {
		if (l == "1") {
			// if(controlacceso("INSERTARLISTADOFuncionariosES","accion")==false){return;}
			limpiarcamposFuncionarios()
		}
		$("div[id=divAbmFuncionarios2]").fadeIn(250)
		document.getElementById('divAbmFuncionarios1').style.display = "none"
	} else {
		$("div[id=divAbmFuncionarios1]").fadeIn(250)
		document.getElementById('divAbmFuncionarios2').style.display = "none"
	}
}
function verVentanaEditarFuncionarios() {
	// if(controlacceso("EDITARLISTADOFuncionariosES","accion")==false){return;}
	if (idAbmFuncionarios == "") {
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	verCerrarVentanaAbmFuncionarios("1", "2")
}
var idAbmFuncionarios = ""
var listadoAbmFuncionarios = null
var listadoFuncionariosCargo = null;

function iniciarListadoFuncionariosCargo() {
	if (listadoFuncionariosCargo || !window.AbmListadoCore) { return listadoFuncionariosCargo; }
	var cuerpo = document.getElementById("divBuscadorFuncionariosCargo");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraFuncionariosCargo";
	listadoFuncionariosCargo = window.AbmListadoCore.crear({
		nombre: "funcionarios_cargo",
		idCabecera: "cabeceraFuncionariosCargo",
		idCuerpo: "divBuscadorFuncionariosCargo",
		ordenInicial: "funcionario",
		columnas: [
			{ campo: "funcionario", titulo: "FUNCIONARIO", ancho: "60%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "20%" },
			{ campo: "accion", titulo: "ACCION", ancho: "20%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento("table", { className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch" });
			tabla.setAttribute("border", "1");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "5");
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
			var codigo = utilidades.crearElemento("td", { id: "td_id" }, registro.codigo == null ? "" : registro.codigo);
			codigo.style.display = "none";
			fila.appendChild(codigo);
			columnas.forEach(function (columna) {
				var celda = utilidades.crearElemento("td", { dataset: { columna: columna.campo } });
				celda.style.width = columna.ancho;
				if (columna.campo === "funcionario") {
					celda.id = "td_datos_1";
					celda.textContent = registro.funcionario || "";
				} else if (columna.campo === "tipo") {
					celda.id = "td_datos_2";
					celda.textContent = registro.tipo || "";
				} else {
					celda.id = "td_datos_3";
					var boton = document.createElement("input");
					boton.type = "button";
					boton.id = String(registro.codigo == null ? "" : registro.codigo);
					boton.value = "Eliminar";
					boton.className = "btn4";
					boton.addEventListener("click", function () { EliminarFuncionariosCargo(this); });
					celda.appendChild(boton);
				}
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoFuncionariosCargo.iniciar();
	return listadoFuncionariosCargo;
}

function iniciarListadoAbmFuncionarios() {
	if (listadoAbmFuncionarios || !window.AbmListadoCore) return listadoAbmFuncionarios
	var cuerpo = document.getElementById('table_abm_Funcionarios')
	if (!cuerpo || !cuerpo.parentNode) return null
	var cabeceras = cuerpo.parentNode.querySelectorAll('table.tableCabeceraRegistro')
	var cabecera = cabeceras.length ? cabeceras[0].querySelector('tr') : null
	if (!cabecera) return null
	cabecera.id = 'cabeceraAbmFuncionarios'
	listadoAbmFuncionarios = window.AbmListadoCore.crear({
		nombre: 'funcionarios',
		idCabecera: 'cabeceraAbmFuncionarios',
		idCuerpo: 'table_abm_Funcionarios',
		ordenInicial: 'funcionario',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '5%' },
			{ campo: 'documento', titulo: 'CI', ancho: '10%' },
			{ campo: 'funcionario', titulo: 'FUNCIONARIO', ancho: '15%' },
			{ campo: 'cargo', titulo: 'CARGO', ancho: '10%' },
			{ campo: 'antiguedad', titulo: 'ANTIGÜEDAD', ancho: '10%' },
			{ campo: 'tipo_contrato', titulo: 'TIPO CONTRATO', ancho: '10%' },
			{ campo: 'local', titulo: 'LOCAL', ancho: '10%' }
		],
		fila: {
			funcionSeleccion: 'obtenerdatosabmFuncionarios',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo', render: function (valor, registro, celda) {
					celda.style.backgroundColor = '#efeded'
					celda.style.color = 'red'
					return valor
				} },
				{ id: 'td_datos_1', campo: 'documento', columna: 'documento' },
				{ id: 'td_datos_10', campo: 'funcionario', columna: 'funcionario' },
				{ id: 'td_datos_2', campo: 'cargo', columna: 'cargo' },
				{ campo: 'antiguedad', columna: 'antiguedad' },
				{ id: 'td_datos_3', campo: 'tipo_contrato', columna: 'tipo_contrato' },
				{ id: 'td_datos_4', campo: 'tipo', tecnica: true },
				{ id: 'td_datos_5', campo: 'fecha_ingreso', tecnica: true },
				{ id: 'td_datos_6', campo: 'codigo_cargo', tecnica: true },
				{ id: 'td_datos_7', campo: 'nombre', tecnica: true },
				{ id: 'td_datos_8', campo: 'apellido', tecnica: true },
				{ id: 'td_datos_9', campo: 'estado', tecnica: true },
				{ id: 'td_datos_11', campo: 'foto', tecnica: true },
				{ id: 'td_datos_12', campo: 'codigo_local', tecnica: true },
				{ id: 'td_datos_13', campo: 'local', columna: 'local' }
			]
		}
	})
	listadoAbmFuncionarios.iniciar()
	return listadoAbmFuncionarios
}
function obtenerdatosabmFuncionarios(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	document.getElementById('inptNombreFuncionarios').value = $(datostr).children('td[id="td_datos_7"]').html();
	document.getElementById('inptRegistroSeleccFuncionarios').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptFuncionariosResponsable').value = $(datostr).children('td[id="td_datos_10"]').html();
	document.getElementById('inptApellidoFuncionarios').value = $(datostr).children('td[id="td_datos_8"]').html();
	document.getElementById('inptCIFuncionarios').value = $(datostr).children('td[id="td_datos_1"]').html();
	document.getElementById('inptFechaIngresoFuncionarios').value = $(datostr).children('td[id="td_datos_5"]').html();
	document.getElementById('inptDescripcioContratoFuncionarios').value = $(datostr).children('td[id="td_datos_3"]').html();
	document.getElementById('inptCargoFuncionarios').value = $(datostr).children('td[id="td_datos_6"]').html();
	document.getElementById('inptEstadoFuncionarios').value = $(datostr).children('td[id="td_datos_9"]').html();
	document.getElementById('inptLocalFuncionarios').value = $(datostr).children('td[id="td_datos_12"]').html();
	tipofuncionario= $(datostr).children('td[id="td_datos_4"]').html();
	idAbmFuncionarios = $(datostr).children('td[id="td_id"]').html();
	
	 $("div[id=imgFotoPerfil1Funcionario]").css({"background-image":"url("+$(datostr).children('td[id="td_datos_11"]').html()+")"})
	
	document.getElementById('btnAbmFuncionarios').value = "Editar Datos";
	document.getElementById('btnFuncionariosCargo').style.backgroundColor="";
	document.getElementById('btnFuncionariosArchivo').style.backgroundColor="#dc3545";
	document.getElementById('btnEditarFuncionarioses').style.backgroundColor="#673ab7";
}
function verificarcamposFuncionarios() {
	var inptNombreFuncionarios = document.getElementById('inptNombreFuncionarios').value
	var inptApellidoFuncionarios = document.getElementById('inptApellidoFuncionarios').value
	var inptCIFuncionarios = document.getElementById('inptCIFuncionarios').value
	var inptFechaIngresoFuncionarios = document.getElementById('inptFechaIngresoFuncionarios').value
	var inptDescripcioContratoFuncionarios = document.getElementById('inptDescripcioContratoFuncionarios').value
	var inptCargoFuncionarios = document.getElementById('inptCargoFuncionarios').value
	var inptEstadoFuncionarios = document.getElementById('inptEstadoFuncionarios').value
	var inptLocalFuncionarios = document.getElementById('inptLocalFuncionarios').value
	if (inptNombreFuncionarios == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NOMBRE DEL FUNCIONARIO")
		return false;
	}
	if (inptApellidoFuncionarios == "") {
		ver_vetana_informativa("FALTO INGRESAR EL APELLIDO DEL FUNCIONARIO")
		return false;
	}
	
	if (inptCIFuncionarios == "") {
		ver_vetana_informativa("FALTO INGRESAR EL NUMERO DE DOCUMENTOS DEL FUNCIONARIO")
		return false;
	}
	var accion = "";
	if (idAbmFuncionarios != "") {
		accion = "editar";
		// if(controlacceso("EDITARLISTADOFuncionariosES","accion")==false){return;}
	} else {
		accion = "nuevo";
		// if(controlacceso("INSERTARLISTADOFuncionariosES","accion")==false){return;}
	}
	
	abmFuncionarios(inptLocalFuncionarios,inptNombreFuncionarios, inptApellidoFuncionarios, inptCIFuncionarios, inptFechaIngresoFuncionarios, inptDescripcioContratoFuncionarios, inptCargoFuncionarios ,inptEstadoFuncionarios, idAbmFuncionarios, accion);
}

var tipofuncionario="";
function abmFuncionarios(local,nombre, apellido, doc, fecha, descripcion, cargo , estado, idAbmFuncionarios, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("nombre", nombre)
	datos.append("apellido", apellido)
	datos.append("doc", doc)
	datos.append("fecha", fecha)
	datos.append("descripcion", descripcion)
	datos.append("cargo", cargo)
	datos.append("estado", estado)
	datos.append("tipofuncionario", tipofuncionario)
	datos.append("idAbmFuncionarios", idAbmFuncionarios)
	datos.append("fotoperfilFuncionario", fotoperfilFuncionario)
	datos.append("extperfilFuncionario", extperfilFuncionario)
	datos.append("local", local)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
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
					limpiarcamposFuncionarios()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmFuncionarios = ""
					buscarabmFuncionarios()
					buscarabmOptionCargoFuncionario()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function checkestadoFuncionarios(d){
	if(d=="1"){
	document.getElementById('inptSeleccEstadoBuscarFuncionarios1').checked=true
		document.getElementById('inptSeleccEstadoBuscarFuncionarios2').checked=false	
	}else{
		
		document.getElementById('inptSeleccEstadoBuscarFuncionarios1').checked=false
		document.getElementById('inptSeleccEstadoBuscarFuncionarios2').checked=true
	}
}
function buscarabmFuncionarios() {
// if(controlacceso("BUSCARLISTADOFuncionariosES","accion")==false){return;}
	var listado = iniciarListadoAbmFuncionarios()
	var doc = document.getElementById('inptBuscarFuncionarios1').value
	var Funcionarios = document.getElementById('inptBuscarFuncionarios2').value
	var cargo = document.getElementById('inptBuscarFuncionarios3').value
	var local = document.getElementById('inptBuscarFuncionarios4').value
	var contrato = document.getElementById('inptBuscarFuncionarios5').value
	var estado =""
	if(document.getElementById('inptSeleccEstadoBuscarFuncionarios1').checked==true){
		estado ="Activo"
	}else{
		estado ="Inactivo"
	}
	document.getElementById("table_abm_Funcionarios").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"doc": doc,
		"Funcionarios": Funcionarios,
		"cargo": cargo,
		"estado": estado,
		"local": local,
		"contrato": contrato,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Funcionarios").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Funcionarios").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				  Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {	
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [])
					document.getElementById("inptRegistroNroFuncionarios").value = datos[3];
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
			var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmFuncionarios)
else iniciarListadoAbmFuncionarios()


function limpiarcamposFuncionarios() {
	document.getElementById('inptLocalFuncionarios').value=""
	document.getElementById('inptNombreFuncionarios').value=""
	document.getElementById('inptApellidoFuncionarios').value=""
	document.getElementById('inptCIFuncionarios').value=""
	document.getElementById('inptFechaIngresoFuncionarios').value=""
	document.getElementById('inptDescripcioContratoFuncionarios').value=""
	document.getElementById('inptCargoFuncionarios').value="" 
	document.getElementById('btnAbmFuncionarios').value = "Guardar Datos";
	document.getElementById('inptEstadoFuncionarios').value = "Activo";
	document.getElementById('btnEditarFuncionarioses').style.backgroundColor = "#b7b7b7";
	document.getElementById('btnFuncionariosCargo').style.backgroundColor = "#b7b7b7";
	document.getElementById('btnFuncionariosArchivo').style.backgroundColor = "#b7b7b7";
	idAbmFuncionarios = "";
	tipofuncionario="";
	$("div[id=imgFotoPerfil1Funcionario]").css({ "background-image": "url(/GoodVentaElectroCasaMaric/iconos/sinperfil.png)" })
	fotoperfilFuncionario=""
	extperfilFuncionario=""
}


function ExploradorImagenperfilFuncionario(){	
$("input[name=file_perfilFuncionario]").click();
// controlperfilcobador=File;
}
var fotoperfilFuncionario="";
var extperfilFuncionario="";
var file_extensionperfilFuncionario="";
function readFilePerfilFuncionario(input){		
var file=$("input[name="+input.name+"]")[0].files[0];
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extensionperfilFuncionario=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extensionperfilFuncionario=="jpeg") || (file_extensionperfilFuncionario=="jpg") || (file_extensionperfilFuncionario=="png") ){
}else{
ver_vetana_informativa("LA FOTO SELECCIONADO NO ES JPEG")
return false;
}

 
	extperfilFuncionario=file_extensionperfilFuncionario;
	fotoperfilFuncionario=input.files[0];
	
	var imageUrl = URL.createObjectURL(fotoperfilFuncionario);
	
 $("div[id=imgFotoPerfil1Funcionario]").css({"background-image":"url("+imageUrl+")"})

 
}


/*
cargo funcionario
*/
var idAbmFuncionariosCargo="";
var ElementoSeleccFuncionariosCargo="";
function verCerrarFrmFuncionariosCargo(){
 
	if(document.getElementById("divAbmFuncionariosCargo").style.display==""){ 
	 
	$("div[id=divAbmFuncionariosCargo]").fadeOut(500);	
		LimpiarCamposFuncionariosCargo()
	}else{	
	// if(controlacceso("VERFACTURASHABILITADAS","accion")==false){return;	}
		if(idAbmFuncionarios==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
			return false;
		}
	
		document.getElementById("divAbmFuncionariosCargo").style.display=""
		 
		BuscarAbmFuncionariosCargo()
	}
}
 
function LimpiarCamposFuncionariosCargo(){
	document.getElementById("inptFuncionariosResponsable").value="";		 
	document.getElementById("inptTipoFuncionariosCargo").value="";		 
	document.getElementById("inptFuncionarioSeleccionado").value="";		 
	 
	TipoListaFuncionarios="";
	IdAbmListaFuncionarios="";

}


function VerificarDatosFuncionariosCargo(){
	 
	
	if(IdAbmListaFuncionarios==""){ 
		ver_vetana_informativa("FALTO SELECCIONAR UN FUNCIONARIO")
		return
	}
	
	var accion  = "nuevoFuncionarioCargo";
 
	AbmFuncionariosCargo(IdAbmListaFuncionarios,accion)
}
function AbmFuncionariosCargo(idabm, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("TipoListaFuncionarios", TipoListaFuncionarios)
	datos.append("idAbmFuncionarios", idAbmFuncionarios)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
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

					LimpiarCamposFuncionariosCargo()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")				
					BuscarAbmFuncionariosCargo()


				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}

		}
	});

}

function EliminarFuncionariosCargo(datos) {
 
	var IdAbm=datos.id
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador, 
		"buscar": IdAbm,
		"funt": "EliminarFuncionariosCargo"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFuncionariosCargo").innerHTML = '' 
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFuncionariosCargo").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					ver_vetana_informativa("DATOS ELIMANADOS CORRECTAMENTE...")	
					 BuscarAbmFuncionariosCargo()

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



function BuscarAbmFuncionariosCargo() {
	// if(controlacceso("BUSCARFACTURASHABILITADAS","accion")==false){ return;}
 var listado = iniciarListadoFuncionariosCargo();
 document.getElementById("divBuscadorFuncionariosCargo").innerHTML = '' 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador, 
		"buscar": idAbmFuncionarios,
		"formato": "json",
		"funt": "buscarFuncionariosCargo"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorFuncionariosCargo").innerHTML = '' 
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorFuncionariosCargo").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

/* ARCHIVOS FUNCIONARIO */
function verCerrarAbmCargarArchivosFuncionario(d){
	if(d=="1"){
		// if(controlacceso("CARGARArchivosFuncionario","accion")==false){return;}
		if(idAbmFuncionarios==''){
			ver_vetana_informativa('FALTÓ SELECCIONAR UN REGISTRO');
			return;
		}
		document.getElementById("divAbmCargarArchivosFuncionario").style.display = "";
		// mostrarSoloUno("divAbmCargarArchivosFuncionario")	
		LimpiarCamposCargarArchivosFuncionario()
		buscarArchivosFuncionario()
	}else{
		document.getElementById("divAbmCargarArchivosFuncionario").style.display="none"
	}
}



function minimizarArchivosFuncionario(){
 	$("div[id=divAbmCargarArchivosFuncionario]").fadeOut(500);	
	document.getElementById("divMinimizadoArchivosFuncionario").style.display=""
	// copiarBotonEnContenedor(document.getElementById("divMenuArchivosFuncionario"));
}

function ExploradorArchivoFuncionario(File){	
$("input[id="+File+"]").click();
}
var archivopdffuncionario="";
var extensionpdffuncionario="";	
var urlarchivopdffuncionario="";
function readFileDocArchivoFuncionario(input){
var file=$("input[name="+input.name+"]")[0].files[0];
urlarchivopdffuncionario = URL.createObjectURL(file);
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension.toLowerCase()=="pdf")){
}else{
ver_vetana_informativa("DEBE SER UN ARCHIVO PDF")
return false;
}
var readerPrincipal = new FileReader();
readerPrincipal.onload = function(e){
	extensionpdffuncionario = file_extension;
	archivopdffuncionario = e.target.result;
	document.getElementById("text-carga-2-ArchivosFuncionario").style.display=""
	document.getElementById("text-carga-ArchivosFuncionario").style.display="none"
	
	
	document.getElementById("btnAddArchivosFuncionario").style.backgroundColor = "";
	document.getElementById("btnEliminarArchivosFuncionario").style.backgroundColor = "#d5d3d3";
	document.getElementById("btnVerArchivosFuncionario").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroArchivosFuncionario]").each(function(i, td){
	td.className=''
});
	
	elementoarchivoseleccionadofuncionario="";
	
	
document.getElementById("file_ArchivosFuncionario").value="";
}
readerPrincipal.readAsDataURL(input.files[0]);
}
function AddCargarArchivosFuncionario(){

	if(archivopdffuncionario ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
	
	
	
	
	var descripcion = document.getElementById("inptDescripcionCargarArchivosFuncionario");
    descripcion = descripcion.options[descripcion.selectedIndex].text;
	
	let fecha = document.getElementById('inptFechaCargarArchivosFuncionario').value
	
	if(fecha == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA FECHA")
		return;
	}
	
	if(descripcion == "SELECCIONAR"){
		ver_vetana_informativa("FALTÓ INGRESAR UNA DESCRIPCION")
		return;
	}
	

$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});

var accion = "insertarArchivo";
	AbmCargarArchivosFuncionario(accion,idAbmFuncionarios,descripcion,fecha,archivopdffuncionario,extensionpdffuncionario);
}
var elementoarchivoseleccionadofuncionario="";
function SeleccionarItemArchivosFuncionario(datostr) {
	elementoarchivoseleccionadofuncionario = datostr
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
	});
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarArchivosFuncionario").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerArchivosFuncionario").style.backgroundColor = "#2196F3";
	

	document.getElementById("btnAddArchivosFuncionario").style.backgroundColor = "#d5d3d3";
	archivopdffuncionario = "";
	extensionpdffuncionario = "";
}
function LimpiarCamposCargarArchivosFuncionario(){
	document.getElementById("btnAddArchivosFuncionario").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarArchivosFuncionario").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerArchivosFuncionario").style.backgroundColor="#d5d3d3";
	document.getElementById("inptDescripcionCargarArchivosFuncionario").value=""
	document.getElementById("inptFechaCargarArchivosFuncionario").value = ""
	document.getElementById("text-carga-ArchivosFuncionario").style.display=""
	document.getElementById("text-carga-2-ArchivosFuncionario").style.display="none"
	elementoarchivoseleccionadofuncionario =""
	archivopdffuncionario="";
	extensionpdffuncionario = "";
	urlarchivopdffuncionario="";
	document.getElementById('inptFechaCargarArchivosFuncionario').value = obtenerFechaActual();
}
function AbmCargarArchivosFuncionario(accion,cod_funcionario,descripcion,fecha,archivo,ext){
	var datos = new FormData();
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_funcionario", cod_funcionario)
	datos.append("descripcion", descripcion)
	datos.append("fecha", fecha)
	datos.append("archivo", archivo)
	datos.append("ext", ext)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
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
					LimpiarCamposCargarArchivosFuncionario()
					buscarArchivosFuncionario()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function VerCargarArchivoFuncionario(d){

		
	
	if(elementoarchivoseleccionadofuncionario == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
		
	window.open(`${$(elementoarchivoseleccionadofuncionario).children('td[id="td_datos_1"]').html()}`, '_blank');
	
}
function EliminarArchivoFuncionario(){
	
	obtener_datos_user();
	
	var iddocumento = $(elementoarchivoseleccionadofuncionario).children('td[id="td_id_2"]').html()
	var urldocumento = $(elementoarchivoseleccionadofuncionario).children('td[id="td_datos_1"]').html()
	var cod_funcionario = $(elementoarchivoseleccionadofuncionario).children('td[id="td_id_3"]').html()
	
	let pos=urldocumento.indexOf("/");
	urldocumento = urldocumento.slice(pos+1)
	pos= urldocumento.indexOf("/")
	urldocumento = urldocumento.slice(pos)
	
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_funcionario": cod_funcionario,
		"iddocumento": iddocumento,
		"urldocumento": urldocumento,
		"funt": "eliminardocumentoArchivoFuncionario"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
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
					buscarArchivosFuncionario()
					ver_vetana_informativa("SE HA ELIMINADO CORRECTAMENTE")
					document.getElementById("btnEliminarArchivosFuncionario").style.backgroundColor="#d5d3d3";
					document.getElementById("btnVerArchivosFuncionario").style.backgroundColor="#d5d3d3";
					elementoarchivoseleccionadofuncionario = '';
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
var listadoArchivosFuncionario = null;
function iniciarListadoArchivosFuncionario() {
	if (listadoArchivosFuncionario || !window.AbmListadoCore) return listadoArchivosFuncionario;
	var cuerpo = document.getElementById('table_abm_archivo_funcionario');
	var cabecera = cuerpo && cuerpo.previousElementSibling ? cuerpo.previousElementSibling.querySelector('tr') : null;
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraArchivosFuncionario';
	listadoArchivosFuncionario = window.AbmListadoCore.crear({
		nombre: 'archivosFuncionario', idCabecera: 'cabeceraArchivosFuncionario', idCuerpo: 'table_abm_archivo_funcionario', ordenInicial: 'fecha',
		columnas: [
			{ campo: 'tipo', titulo: 'TIPO', ancho: '20%' },
			{ campo: 'descripcion', titulo: 'DESCRIPCION', ancho: '60%' },
			{ campo: 'fecha', titulo: 'FECHA', ancho: '20%' }
		],
		fila: { funcionSeleccion: 'SeleccionarItemArchivosFuncionario', idFila: 'tbSelecRegistroArchivo', celdas: [
			{ id: 'td_id_1', campo: 'codigo_interno', tecnica: true },
			{ id: 'td_id_2', campo: 'codigo_archivo', tecnica: true },
			{ id: 'td_id_3', campo: 'codigo_funcionario', tecnica: true },
			{ id: 'td_datos_1', campo: 'url', tecnica: true },
			{ campo: 'tipo', columna: 'tipo' },
			{ id: 'td_datos_2', campo: 'descripcion', columna: 'descripcion' },
			{ id: 'td_datos_3', campo: 'fecha', columna: 'fecha' }
		] }
	});
	listadoArchivosFuncionario.iniciar();
	return listadoArchivosFuncionario;
}
function buscarArchivosFuncionario(){
	document.getElementById("table_abm_archivo_funcionario").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_funcionario": idAbmFuncionarios,
		"formato": "json",
		"funt": "buscarDocumentosCargaArchivo"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_archivo_funcionario").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_archivo_funcionario").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					var listado = iniciarListadoArchivosFuncionario();
					if (Array.isArray(datos_buscados) && listado) listado.establecerRegistros(datos_buscados);
					else document.getElementById("table_abm_archivo_funcionario").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoArchivosFuncionario);
else iniciarListadoArchivosFuncionario();
