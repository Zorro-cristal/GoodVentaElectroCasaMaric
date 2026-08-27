// ABM DESCRIPCION FOTO
function verCerrarAbmNuevoDescripcionArchivoFuncionario(){
	
	if(document.getElementById("divAbmNuevoDescripcionArchivoFuncionario").style.display==""){
		
		$("div[id=divAbmNuevoDescripcionArchivoFuncionario]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divAbmNuevoDescripcionArchivoFuncionario").style.display=""

	}
}
function VerificarDatosNuevoDescripcionArchivoFuncionario() {
	var inptNuevoDescripcionArchivoFuncionario = document.getElementById('inptNuevoDescripcionArchivoFuncionario').value
	
	if (inptNuevoDescripcionArchivoFuncionario == "") {
		ver_vetana_informativa("FALTO AGREGAR DESCRIPCION")
		return false;
	}	

		accion = "NuevoDescripcionArchivoFuncionario";
	
	abmNuevoDescripcionArchivoFuncionario(inptNuevoDescripcionArchivoFuncionario, accion);
}
function abmNuevoDescripcionArchivoFuncionario(descripcion , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("descripcion", descripcion)


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
					document.getElementById('inptNuevoDescripcionArchivoFuncionario').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarDescripcionArchivoFuncionario()
					verCerrarAbmNuevoDescripcionArchivoFuncionario()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscarDescripcionArchivoFuncionario() {

	document.getElementById("inptDescripcionCargarArchivosFuncionario").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionDescripcionArchivoFuncionario"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptDescripcionCargarArchivosFuncionario").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptDescripcionCargarArchivosFuncionario").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptDescripcionCargarArchivosFuncionario").innerHTML = datos_buscados


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
Listado funcionario
*/
var idAbmFuncionariosCargo=""; 
var listadoSeleccionFuncionarios = null;

function iniciarListadoSeleccionFuncionarios() {
	if (listadoSeleccionFuncionarios || !window.AbmListadoCore) return listadoSeleccionFuncionarios;
	var cuerpo = document.getElementById("divBuscadorListaFuncionarios");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) return null;
	cabecera.id = "cabeceraSeleccionFuncionarios";
	listadoSeleccionFuncionarios = window.AbmListadoCore.crear({
		nombre: "seleccion_funcionarios",
		idCabecera: "cabeceraSeleccionFuncionarios",
		idCuerpo: "divBuscadorListaFuncionarios",
		ordenInicial: "funcionario",
		columnas: [
			{ campo: "funcionario", titulo: "FUNCIONARIO", ancho: "40%" },
			{ campo: "tipo", titulo: "TIPO", ancho: "20%" },
			{ campo: "local", titulo: "LOCAL", ancho: "40%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento("table", { className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch" });
			tabla.setAttribute("border", "1");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "5");
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
			fila.addEventListener("click", function () { ObtenerdatosAbmListaFincionario(this); });
			var codigo = utilidades.crearElemento("td", { id: "td_id" }, registro.codigo == null ? "" : registro.codigo);
			codigo.style.display = "none";
			fila.appendChild(codigo);
			columnas.forEach(function (columna, posicion) {
				var celda = utilidades.crearElemento("td", {
					id: "td_datos_" + (posicion + 1),
					dataset: { columna: columna.campo }
				}, registro[columna.campo] == null ? "" : registro[columna.campo]);
				celda.style.width = columna.ancho;
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoSeleccionFuncionarios.iniciar();
	return listadoSeleccionFuncionarios;
}

function verCerrarFrmListadoFuncionarios(){
 
	if(document.getElementById("divAbmListaFuncionarios").style.display==""){ 
	 
	$("div[id=divAbmListaFuncionarios]").fadeOut(500);	
	}else{	
	// if(controlacceso("VERFACTURASHABILITADAS","accion")==false){return;	}
		
		if(document.getElementById("inptTipoFuncionariosCargo").value==""){
			ver_vetana_informativa("FALTO SELECCIONAR UN TIPO")
			return false;
		}
	
		document.getElementById("divAbmListaFuncionarios").style.display=""
		 
		BuscarAbmListaFuncionarios()
	}
}



function BuscarAbmListaFuncionarios() {
		
	var tipo =  document.getElementById("inptTipoFuncionariosCargo").value
	document.getElementById("divBuscadorListaFuncionarios").innerHTML = paginacargando
    
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"tipo": tipo,
		"formato": "json",
		"funt": "ListadoFuncioarios"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",		 
		
		beforeSend: function () {

		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorListaFuncionarios").innerHTML = ''
			 
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorListaFuncionarios").innerHTML = ''
			 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
					var datos_buscados = datos[2];
					var listado = iniciarListadoSeleccionFuncionarios();
					if (listado && Array.isArray(datos_buscados)) {
						listado.establecerRegistros(datos_buscados);
					} else {
						document.getElementById("divBuscadorListaFuncionarios").innerHTML = typeof datos_buscados === "string" ? datos_buscados : "";
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

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciarListadoSeleccionFuncionarios);
else iniciarListadoSeleccionFuncionarios();

var IdAbmListaFuncionarios="";
var TipoListaFuncionarios="";
function ObtenerdatosAbmListaFincionario(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
		
	datostr.className = 'tableRegistroSelec'
	
	IdAbmListaFuncionarios = $(datostr).children('td[id="td_id"]').html();
    TipoListaFuncionarios = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptFuncionarioSeleccionado").value = $(datostr).children('td[id="td_datos_1"]').html() +" - "+TipoListaFuncionarios;
    verCerrarFrmListadoFuncionarios()

}




function verCerrarCalcularSalarioFuncionarios(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divCalcularSalarioFuncionarios").style.display==""){
		document.getElementById("divMinimizadoCalculoSalarioFuncionarios").style.display="none"
//  
	$("div[id=divCalcularSalarioFuncionarios]").fadeOut(500);			
	}else{	
// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
mostrarSoloUno("divCalcularSalarioFuncionarios")	
		document.getElementById("divCalcularSalarioFuncionarios").style.display=""
		 //  
	}
}

function minimizarCalcularSalarioFuncionarios(){ 
	$("div[id=divCalcularSalarioFuncionarios]").fadeOut(500);
	document.getElementById("divMinimizadoCalculoSalarioFuncionarios").style.display=""	
	copiarBotonEnContenedor(document.getElementById("divMenuCalculoSalarioFuncionario"));
}

function renderizarCalculoSalarioFuncionarios(registros) {
	var contenedor = document.getElementById("table_CalcularSalarioFuncionarios");
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(registros || []).forEach(function (registro) {
		var tarjeta = document.createElement("div");
		tarjeta.className = "sales";
		tarjeta.id = String(registro.codigo_cargo == null ? "" : registro.codigo_cargo);
		tarjeta.setAttribute("data-url", registro.funcionario == null ? "" : registro.funcionario);
		tarjeta.setAttribute("data-email", registro.codigo_funcionario == null ? "" : registro.codigo_funcionario);
		tarjeta.setAttribute("data-name", registro.cargo == null ? "" : registro.cargo);
		tarjeta.addEventListener("click", function () { verCerrarSalarioFuncionarios(this); });

		var nombre = document.createElement("h3");
		nombre.textContent = (registro.nombre == null ? "" : registro.nombre) + " - " + (registro.apellido == null ? "" : registro.apellido);
		tarjeta.appendChild(nombre);

		var marcoFoto = document.createElement("div");
		var foto = document.createElement("div");
		foto.className = "imgFotoCi";
		foto.style.backgroundImage = "url(" + (registro.imagen == null ? "" : registro.imagen) + ")";
		marcoFoto.appendChild(foto);
		tarjeta.appendChild(marcoFoto);

		var informacion = document.createElement("div");
		informacion.className = "info";
		var cargo = document.createElement("h1");
		cargo.style.fontSize = "1.2rem";
		cargo.textContent = registro.cargo == null ? "" : registro.cargo;
		informacion.appendChild(cargo);
		tarjeta.appendChild(informacion);
		contenedor.appendChild(tarjeta);
	});
}


function buscarCalcularSalarioFuncionarios() {
	// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
	var local = document.getElementById('inptlocalCalcularSalarioFuncionarios').value
	var cargo = document.getElementById('inptCargoCalcularSalarioFuncionarios').value
	var funcionario = document.getElementById('inptFuncionarioSalario').value
	 
	 
	
	document.getElementById("table_CalcularSalarioFuncionarios").innerHTML = paginacargando
	document.getElementById("inptTotalRegistoCalcularSalarioFuncionarios").value =""
	 

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"local": local,
		"cargo": cargo,
		"funcionario": funcionario,
		"formato": "json",
		"funt": "buscarSalarioFuncionario"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")

			document.getElementById("table_CalcularSalarioFuncionarios").innerHTML = ""	

			document.getElementById("table_vendedor_metas").innerHTML = ''

		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_CalcularSalarioFuncionarios").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) renderizarCalculoSalarioFuncionarios(pagina);
					else document.getElementById("table_CalcularSalarioFuncionarios").innerHTML = pagina;
					document.getElementById("inptTotalRegistoCalcularSalarioFuncionarios").value =datos[3];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}


/* INFORME GENERAL DE VENTAS */
function verCerrarInformeVentaGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeVentaGeneral").style.display==""){
		limpiarventanainformeventageneral()
		
		$("div[id=divInformeVentaGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeVentaGeneral").style.display=""
	}
}
function buscarinformeVentaGeneral() {
	var anho = document.getElementById("inptBuscarInformeGeneralVentaFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralVentaLocal").value
	var tipo_venta = document.getElementById("inptBuscarInformeGeneralVentaTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	if(controlventanainformeventanageneral=="2"){
		buscarinformeVentaGeneralIncremental()
		return;
	}
	
	if(controlventanainformeventanageneral=="3"){
		buscarinformeVentaGeneralGrafica()
		return;
	}
	
	if(controlventanainformeventanageneral=="4"){
		buscarinformeGananciaGeneral()
		return;
	}
	
	if(controlventanainformeventanageneral=="5"){
		buscarinformeCostoGeneral()
		return;
	}
	
	if(controlventanainformeventanageneral=="6"){
		buscarinformePagadoGeneral()
		return;
	}
	
	if(controlventanainformeventanageneral=="7"){
		buscarinformeEvaluacionGeneral()
		return;
	}
	
	document.getElementById("table_informe_ventageneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo_venta": tipo_venta,
		"funt": "buscar_total_ventas_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_ventageneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_ventageneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_ventageneral").innerHTML = pagina;
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

function buscarinformeVentaGeneralIncremental() {
	var anho = document.getElementById("inptBuscarInformeGeneralVentaFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralVentaLocal").value
	var tipo = document.getElementById("inptBuscarInformeGeneralVentaTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_ventageneral_incremental").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo_venta": tipo,
		"funt": "buscar_total_ventas_general_incremental"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_ventageneral_incremental").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_ventageneral_incremental").innerHTML = paginacargando;	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_ventageneral_incremental").innerHTML = pagina;
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

function buscarinformeVentaGeneralGrafica() {
	var anho = document.getElementById("inptBuscarInformeGeneralVentaFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralVentaLocal").value
	var tipo = document.getElementById("inptBuscarInformeGeneralVentaTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	// document.getElementById("graph_informe_venta_general").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo_venta": tipo,
		"funt": "buscar_total_ventas_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			// document.getElementById("graph_informe_venta_general").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				// document.getElementById("table_informe_ventageneral_grafica").innerHTML = paginacargando;	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					// var pagina = datos[2];
					// document.getElementById("table_informe_ventageneral_grafica").innerHTML = '';
					
					
					if(obj_chart_ventas){
						obj_chart_ventas.destroy()
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

					generar_graficos_total_ventas(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

let obj_chart_ventas = '';
function generar_graficos_total_ventas(data){
	const graph = document.querySelector("#graph_informe_venta_general");


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

	obj_chart_ventas = new Chart(graph, config);
}

function limpiarventanainformeventageneral(){ 
	document.getElementById("table_informe_ventageneral").innerHTML="" 
	document.getElementById("table_informe_ventageneral_incremental").innerHTML="" 
	document.getElementById("table_informe_gananciageneral").innerHTML="" 
	document.getElementById("table_informe_costogeneral").innerHTML="" 
	document.getElementById("table_informe_pagadogeneral").innerHTML="" 
	document.getElementById("table_informe_evaluaciongeneral").innerHTML="" 
	
	if(obj_chart_ventas){
		obj_chart_ventas.destroy()
	}
	
	document.getElementById('inptBuscarInformeGeneralVentaFecha').value = ''
	document.getElementById('inptBuscarInformeGeneralVentaLocal').value = ''
	document.getElementById('inptBuscarInformeGeneralVentaTipo').value = ''
	
	// verCerrarInformeVentanasVentaGeneral(4)
	
	document.getElementById("btnInformeVentaGeneral1").style='background-color:#ff9800;color:#fff'
	document.getElementById("btnInformeVentaGeneral2").style=''
	document.getElementById("btnInformeVentaGeneral3").style=''
	document.getElementById("btnInformeVentaGeneral4").style=''
	document.getElementById("btnInformeVentaGeneral5").style=''
	document.getElementById("btnInformeVentaGeneral6").style=''
	document.getElementById("btnInformeVentaGeneral7").style=''
	document.getElementById("divVentanaInformeVentaGeneral1").style.display=''
	document.getElementById("divVentanaInformeVentaGeneral2").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral3").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral4").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral5").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral6").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral7").style.display='none'
	
	
}
let controlventanainformeventanageneral = '';
function verCerrarInformeVentanasVentaGeneral(d){
	
	document.getElementById("btnInformeVentaGeneral1").style=''
	document.getElementById("btnInformeVentaGeneral2").style=''
	document.getElementById("btnInformeVentaGeneral3").style=''
	document.getElementById("btnInformeVentaGeneral4").style=''
	document.getElementById("btnInformeVentaGeneral5").style=''
	document.getElementById("btnInformeVentaGeneral6").style=''
	document.getElementById("btnInformeVentaGeneral7").style=''
	
	document.getElementById("divVentanaInformeVentaGeneral1").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral2").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral3").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral4").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral5").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral6").style.display='none'
	document.getElementById("divVentanaInformeVentaGeneral7").style.display='none'

	// var selectAnho = document.getElementById('inptBuscarInformeGeneralVentaFecha').value;
	controlventanainformeventanageneral = d;
	
	
	if(d=="1"){
		buscarinformeVentaGeneral()
		document.getElementById("btnInformeVentaGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeVentaGeneral1").style.display=''
	}
	if(d=="2"){
		
		
		buscarinformeVentaGeneralIncremental()
		document.getElementById("btnInformeVentaGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeVentaGeneral2").style.display=''
	}
	if(d=="3"){
		
		buscarinformeVentaGeneralGrafica()
		document.getElementById("btnInformeVentaGeneral3").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeVentaGeneral3").style.display=''
	}
	if(d=="4"){
		
		buscarinformeGananciaGeneral()
		document.getElementById("btnInformeVentaGeneral4").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeVentaGeneral4").style.display=''
	}
	
	if(d=="5"){
		
		buscarinformeCostoGeneral()
		document.getElementById("btnInformeVentaGeneral5").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeVentaGeneral5").style.display=''
	}
	
	if(d=="6"){
		
		buscarinformePagadoGeneral()
		document.getElementById("btnInformeVentaGeneral6").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeVentaGeneral6").style.display=''
	}
	
	if(d=="7"){
		
		buscarinformeEvaluacionGeneral()
		document.getElementById("btnInformeVentaGeneral7").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeVentaGeneral7").style.display=''
	}
}

function buscarinformeGananciaGeneral() {
	var anho = document.getElementById("inptBuscarInformeGeneralVentaFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralVentaLocal").value
	var tipo_venta = document.getElementById("inptBuscarInformeGeneralVentaTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_gananciageneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo_venta": tipo_venta,
		"funt": "buscar_total_ganancias_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_gananciageneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_gananciageneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_gananciageneral").innerHTML = pagina;
					
					agregarFilaTotalesGanaciaGeneral()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

function agregarFilaTotalesGanaciaGeneral() {
    const contenedor = document.getElementById('table_informe_gananciageneral');
    const totales = sumarColumnasGananciasGeneral();

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
function sumarColumnasGananciasGeneral() {
    const contenedor = document.getElementById('table_informe_gananciageneral');
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

function buscarinformeCostoGeneral() {
	var anho = document.getElementById("inptBuscarInformeGeneralVentaFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralVentaLocal").value
	var tipo_venta = document.getElementById("inptBuscarInformeGeneralVentaTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_costogeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo_venta": tipo_venta,
		"funt": "buscar_total_costo_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_costogeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_costogeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_costogeneral").innerHTML = pagina;
					
					agregarFilaTotalCostoGeneral()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function agregarFilaTotalCostoGeneral() {
    const contenedor = document.getElementById('table_informe_costogeneral');
    const totales = sumarColumnasCostoGeneral();

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
function sumarColumnasCostoGeneral() {
    const contenedor = document.getElementById('table_informe_costogeneral');
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


function buscarinformePagadoGeneral() {
	var anho = document.getElementById("inptBuscarInformeGeneralVentaFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralVentaLocal").value
	var tipo_venta = document.getElementById("inptBuscarInformeGeneralVentaTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_pagadogeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo_venta": tipo_venta,
		"funt": "buscar_total_pagado_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_pagadogeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_pagadogeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_pagadogeneral").innerHTML = pagina;
					
					agregarFilaTotalPagadoGeneral()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function agregarFilaTotalPagadoGeneral() {
    const contenedor = document.getElementById('table_informe_pagadogeneral');
    const totales = sumarColumnasPagadoGeneral();

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
function sumarColumnasPagadoGeneral() {
    const contenedor = document.getElementById('table_informe_pagadogeneral');
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

function buscarinformeEvaluacionGeneral() {
	var anho = document.getElementById("inptBuscarInformeGeneralVentaFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralVentaLocal").value
	var tipo_venta = document.getElementById("inptBuscarInformeGeneralVentaTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_evaluaciongeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo_venta": tipo_venta,
		"funt": "buscar_total_evaluacion_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_evaluaciongeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_evaluaciongeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_evaluaciongeneral").innerHTML = pagina;
					
					agregarFilaTotalEvaluacionGeneral()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function agregarFilaTotalEvaluacionGeneral() {
    const contenedor = document.getElementById('table_informe_evaluaciongeneral');
    const totales = sumarColumnasEvaluacionGeneral();

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
function sumarColumnasEvaluacionGeneral() {
    const contenedor = document.getElementById('table_informe_evaluaciongeneral');
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
BUSCAR CHECKEAR INFORME CUENTAS A COBRAR
*/
function verCerrarFrmTipoBusquedaInformeCuentasACobrar(d){
	
	if(d=="1"){
		document.getElementById("divAbmTipoBusquedaInformeCuentasACobrar").style.display ="";
	}else{
		$("div[id=divAbmTipoBusquedaInformeCuentasACobrar]").fadeOut(500);
	}
}
var array_cod_tipo_cliente_cuentas_a_cobrar = [];

function BuscarAbmTipoBusquedaInformeCuentasACobrar() {
	document.getElementById("divBuscadorTipoBusquedaInformeCuentasACobrar").innerHTML = paginacargando
    document.getElementById("lblNroRegistroTipoBusquedaInformeCuentasACobrar").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscartipobusquedainformecuentasacobrar"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMMoraCliente.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorTipoBusquedaInformeCuentasACobrar").innerHTML = ''
			document.getElementById("lblNroRegistroTipoBusquedaInformeCuentasACobrar").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorTipoBusquedaInformeCuentasACobrar").innerHTML = ''
			document.getElementById("lblNroRegistroTipoBusquedaInformeCuentasACobrar").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				var datos_buscados = datos[2];
				document.getElementById("divBuscadorTipoBusquedaInformeCuentasACobrar").innerHTML = datos_buscados
				document.getElementById("lblNroRegistroTipoBusquedaInformeCuentasACobrar").innerHTML="Se encontraron "+datos[3]+" registro(s)";

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
	let index = array_cod_tipo_cliente_cuentas_a_cobrar.indexOf(id);
    if (index !== -1) {
        // Si la ID ya existe, eliminarla
        array_cod_tipo_cliente_cuentas_a_cobrar.splice(index, 1);
    } else {
        // Si la ID no existe, insertarla
        array_cod_tipo_cliente_cuentas_a_cobrar.push(id);
    }
}

/* INFORME A COBRAR*/
function verCerrarInformeACobrar(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeACobrar").style.display==""){
		limpiarventanainformeACobrar()
		$("div[id=divInformeACobrar]").fadeOut(500);	
		
		document.getElementById('inptBuscarInformeACobrarCobrador').value = '';
		document.getElementById('inptBuscarInformeACobrarLocal').value = '';
		document.getElementById('inptBuscarInformeACobrarFecha').value = '';
		
	}else{	
		document.getElementById("divInformeACobrar").style.display=""
	}
}
function buscarinformeACobrar() {
	
	var anho = document.getElementById("inptBuscarInformeACobrarFecha").value
	var local = document.getElementById("inptBuscarInformeACobrarLocal").value
	var cobradorFK = document.getElementById("inptBuscarInformeACobrarCobrador").value;
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_a_cobrar").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"cobradorFK": cobradorFK,
		"array_cod_tipo_cliente_cuentas_a_cobrar": JSON.stringify(array_cod_tipo_cliente_cuentas_a_cobrar),
		"funt": "buscar_total_a_cobrar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_a_cobrar").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_a_cobrar").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_a_cobrar").innerHTML = pagina
					sumarColumnasTablaCuentasACobrarGeneral()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function datos_cuentas_a_cobrar(datos){
	verCerrarDetallesCuentaACobrarInformeGral()
	buscarcuentaacobrarinformegeneral(datos.dataset.id,document.getElementById('inptBuscarInformeACobrarLocal').value);
}
function verCerrarDetallesCuentaACobrarInformeGral(){
	if(document.getElementById('divCuentasAcobrarInformeGral').style.display == ''){
		document.getElementById('divCuentasAcobrarInformeGral').style.display = 'none'
		document.getElementById('inptTotalRegistroCargadoInfomeCuentaACobrarGral').value = '';
		document.getElementById('table_cuentas_a_cobrar_informe_gral').innerHTML = '';
		array_codcliente_callcenter = [];
	}else{
	document.getElementById('divCuentasAcobrarInformeGral').style.display = ''
	}
}

function agregarCeldaCuentaInformeGeneral(fila, id, valor, ancho, oculta){
	var celda = document.createElement("td");
	if(id){ celda.id = id; }
	if(ancho){ celda.style.width = ancho; }
	if(oculta){ celda.style.display = "none"; }
	celda.textContent = valor === null || typeof valor === "undefined" ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderProductosCuentaInformeGeneral(celda, productos){
	(Array.isArray(productos) ? productos : []).forEach(function(producto, indice){
		if(indice > 0){ celda.appendChild(document.createElement("br")); }
		celda.appendChild(document.createTextNode((indice + 1) + ") " + (producto == null ? "" : String(producto))));
	});
}

function renderCuentaCobrarInformeGeneral(registros){
	var contenedor = document.getElementById("table_cuentas_a_cobrar_informe_gral");
	if(!contenedor || !Array.isArray(registros)){ return; }
	contenedor.textContent = "";
	var fragmento = document.createDocumentFragment();
	registros.forEach(function(registro){
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila === "tableRegistroSearch2" ? "tableRegistroSearch2" : "tableRegistroSearch";
		tabla.setAttribute("border", "1");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "5");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		agregarCeldaCuentaInformeGeneral(fila, "td_id_1", registro.id_cliente, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_1", registro.id_venta, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_2", registro.numero_factura, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "", registro.plazo, "", true);
		var celdaCliente = agregarCeldaCuentaInformeGeneral(fila, "td_datos_26", "", "10%", false);
		if(registro.tipo_estado_cliente){
			var estado = document.createElement("p");
			estado.style.color = "#d10000";
			estado.style.margin = "0";
			estado.textContent = String(registro.tipo_estado_cliente);
			celdaCliente.appendChild(estado);
		}
		celdaCliente.appendChild(document.createTextNode(registro.cliente == null ? "" : String(registro.cliente)));
		agregarCeldaCuentaInformeGeneral(fila, "", registro.documento, "5%", false);
		agregarCeldaCuentaInformeGeneral(fila, "", registro.telefono, "5%", false);
		agregarCeldaCuentaInformeGeneral(fila, "", registro.factura, "5%", false);
		var celdaProductos = agregarCeldaCuentaInformeGeneral(fila, "", "", "10%", false);
		renderProductosCuentaInformeGeneral(celdaProductos, registro.productos);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_5", registro.cobrador, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_12", registro.total_venta, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "", registro.fecha_vencimiento, "5%", false);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_3", registro.fecha_pago, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_19", registro.cuotas, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_6", registro.monto_cuota, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_18", registro.descuento, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "", registro.interes_pagado, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "", registro.pagado_sin_interes, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_13", registro.total_pagado, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_17", registro.total_interes, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_20", registro.cuotas_atrasadas, "3%", false);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_10", registro.dias_atrasados, "3%", false);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_22", registro.deuda_pendiente, "5%", false);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_11", registro.total_deuda, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_14", registro.total_a_pagar, "5%", false);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_8", registro.total_venta_oculto, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_9", registro.id_cobrador, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "", registro.local, "5%", false);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_15", registro.tipo_comprobante, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_16", registro.punto_expedicion, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_21", registro.total_sin_interes, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_23", registro.vendedor, "5%", false);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_24", registro.latitud, "", true);
		agregarCeldaCuentaInformeGeneral(fila, "td_datos_25", registro.longitud, "", true);
		tabla.appendChild(fila);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function buscarcuentaacobrarinformegeneral(fecha,cod_local) {
	document.getElementById("table_cuentas_a_cobrar_informe_gral").innerHTML = paginacargando

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha": fecha,
		"cod_local": cod_local,
		"formato": "json",
		"funt": "cuentasacobrarinformegeneral"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_cuentas_a_cobrar_informe_gral").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_cuentas_a_cobrar_informe_gral").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var datos_buscados = datos[2];
					
					renderCuentaCobrarInformeGeneral(datos_buscados)
					document.getElementById('inptTotalRegistroCargadoInfomeCuentaACobrarGral').value = datos[3]
					document.getElementById('inptCantidadClientesCallCenter').value = datos[3]
					
					array_codcliente_callcenter = datos[4];
					
					}
					
			} catch (error) {
				
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function buscarinformeACobrarIncremental() {
	
	var anho = document.getElementById("inptBuscarInformeACobrarFecha").value
	var local = document.getElementById("inptBuscarInformeACobrarLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_a_cobrar_incremental").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"funt": "buscar_total_a_cobrar_incremental"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_a_cobrar_incremental").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_a_cobrar_incremental").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_a_cobrar_incremental").innerHTML = pagina
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformeACobrarGrafica() {
	
	var anho = document.getElementById("inptBuscarInformeACobrarFecha").value
	var local = document.getElementById("inptBuscarInformeACobrarLocal").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	// document.getElementById("table_informe_a_cobrar_incremental").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"funt": "buscar_total_a_cobrar_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			// document.getElementById("table_informe_a_cobrar_incremental").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				// document.getElementById("table_informe_a_cobrar_incremental").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					// document.getElementById("table_informe_a_cobrar_incremental").innerHTML = pagina
					
					if(obj_chart_a_cobrar){
						obj_chart_a_cobrar.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
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

					generar_graficos_a_cobrar(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

let obj_chart_a_cobrar = '';
function generar_graficos_a_cobrar(data){
	const graph = document.querySelector("#graph_informe_a_cobrar");


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

	obj_chart_a_cobrar = new Chart(graph, config);
}

function limpiarventanainformeACobrar(){
	document.getElementById("table_informe_a_cobrar").innerHTML="" 
	// document.getElementById("table_informe_a_cobrar_incremental").innerHTML="" 
	// document.getElementById("graph_informe_cobro_general").innerHTML="" 
	
	if(obj_chart_a_cobrar){
		obj_chart_a_cobrar.destroy()
	}
	
	
	document.getElementById("btnInformeACobrar1").style='background-color:#ff9800;color:#fff'
	document.getElementById("divVentanaInformeACobrar1").style.display=''
	
	// verCerrarInformeVentanasACobrar(4)
}
function verCerrarInformeVentanasACobrar(d){
	
	document.getElementById("btnInformeACobrar1").style=''
	document.getElementById("btnInformeACobrar2").style=''
	document.getElementById("btnInformeACobrar3").style=''
	
	document.getElementById("divVentanaInformeACobrar1").style.display='none'
	document.getElementById("divVentanaInformeACobrar2").style.display='none'
	document.getElementById("divVentanaInformeACobrar3").style.display='none'
	
	var selectAnho = document.getElementById('inptBuscarInformeACobrarFecha').value;

	if(d=="1"){
		
		if(selectAnho == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
			return;
		}
		
		buscarinformeACobrar()
		document.getElementById("btnInformeACobrar1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeACobrar1").style.display=''
	}
	if(d=="2"){
		
		if(selectAnho == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
			return;
		}
		
		buscarinformeACobrarIncremental()
		document.getElementById("btnInformeACobrar2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeACobrar2").style.display=''
	}
	if(d=="3"){
		
		if(selectAnho == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
			return;
		}
		
		buscarinformeACobrarGrafica()
		document.getElementById("btnInformeACobrar3").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeACobrar3").style.display=''
	}
}
function sumarColumnasTablaCuentasACobrarGeneral() {
    let array_suma_mensual = [];
	
    for (let y = 1; y <= 12; y++) {
        let acumuladorMensual = 0; 
		
        for (let x = 1; x <= 31; x++) {
			let celda = document.getElementById(`td_datos_cuenta_${y}_${x}`).innerHTML;
			celda = Number(QuitarSeparadorMilValor(celda)) || 0;
			acumuladorMensual += celda;
        }


        array_suma_mensual.push(acumuladorMensual);
    }


    console.table(array_suma_mensual);

    // (Opcional) Si deseas agregar los totales en la tabla de HTML descomenta las líneas de abajo
    
    let tableCuentasACobrar = document.getElementById('table_informe_a_cobrar').innerHTML;
    let pagina = "<table class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'><tr><td style='width:%5'>TOTAL</td>";
    for (let t = 0; t < array_suma_mensual.length; t++) {
        pagina += "<td style='width:%5'>" + separadordemilesnumero(array_suma_mensual[t]) + "</td>";
    }
    pagina += "</tr></table>";
    tableCuentasACobrar += pagina;
    document.getElementById('table_informe_a_cobrar').innerHTML = tableCuentasACobrar;
    
}



/* INFORME GENERAL DE COBROS*/
function verCerrarInformeCobroGeneral(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divInformeCobroGeneral").style.display==""){
		limpiarventanainformecobrogeneral()
		
		$("div[id=divInformeCobroGeneral]").fadeOut(500);	
	}else{	
		
		document.getElementById("divInformeCobroGeneral").style.display=""
	}
}
function buscarinformeCobroGeneral() {
	
	var anho = document.getElementById("inptBuscarInformeGeneralCobroFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralCobroLocal").value
	var tipo = document.getElementById("inptBuscarInformeGeneralCobroTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_cobrogeneral").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo": tipo,
		"funt": "buscar_total_cobros_general"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_cobrogeneral").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_cobrogeneral").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_cobrogeneral").innerHTML = pagina
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformeCobroGeneralIncremental() {
	
	var anho = document.getElementById("inptBuscarInformeGeneralCobroFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralCobroLocal").value
	var tipo = document.getElementById("inptBuscarInformeGeneralCobroTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo": tipo,
		"funt": "buscar_total_cobros_general_incremental"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = pagina
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarinformeCobroGeneralGrafica() {
	
	var anho = document.getElementById("inptBuscarInformeGeneralCobroFecha").value
	var local = document.getElementById("inptBuscarInformeGeneralCobroLocal").value
	var tipo = document.getElementById("inptBuscarInformeGeneralCobroTipo").value
	
	if(anho == ''){
		ver_vetana_informativa('FALTÓ SELECCIONAR EL AÑO');
		return;
	}
	
	// document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localFK": local,
		"anho": anho,
		"tipo": tipo,
		"funt": "buscar_total_cobros_general_grafica"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			// document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				// document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					// document.getElementById("table_informe_cobrogeneral_incremental").innerHTML = pagina
					
					if(obj_chart_cobros){
						obj_chart_cobros.destroy()
					}
					
					const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
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

					generar_graficos_total_cobros(data);
					
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}

let obj_chart_cobros = '';
function generar_graficos_total_cobros(data){
	const graph = document.querySelector("#graph_informe_cobro_general");


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

	obj_chart_cobros = new Chart(graph, config);
}

function limpiarventanainformecobrogeneral(){
	document.getElementById("table_informe_cobrogeneral").innerHTML="" 
	document.getElementById("table_informe_cobrogeneral_incremental").innerHTML="" 
	// document.getElementById("graph_informe_cobro_general").innerHTML="" 
	
	if(obj_chart_cobros){
		obj_chart_cobros.destroy()
	}
	
	
	document.getElementById("btnInformeCobroGeneral1").style='background-color:#ff9800;color:#fff'
	document.getElementById("divVentanaInformeCobroGeneral1").style.display=''
	
	verCerrarInformeVentanasCobroGeneral(4)
}
function verCerrarInformeVentanasCobroGeneral(d){
	
	document.getElementById("btnInformeCobroGeneral1").style=''
	document.getElementById("btnInformeCobroGeneral2").style=''
	document.getElementById("btnInformeCobroGeneral3").style=''
	
	document.getElementById("divVentanaInformeCobroGeneral1").style.display='none'
	document.getElementById("divVentanaInformeCobroGeneral2").style.display='none'
	document.getElementById("divVentanaInformeCobroGeneral3").style.display='none'
	
	var selectAnho = document.getElementById('inptBuscarInformeGeneralCobroFecha').value;

	if(d=="1"){
		
		if(selectAnho == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
			return;
		}
		
		buscarinformeCobroGeneral()
		document.getElementById("btnInformeCobroGeneral1").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeCobroGeneral1").style.display=''
	}
	if(d=="2"){
		
		if(selectAnho == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
			return;
		}
		
		buscarinformeCobroGeneralIncremental()
		document.getElementById("btnInformeCobroGeneral2").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeCobroGeneral2").style.display=''
	}
	if(d=="3"){
		
		if(selectAnho == ''){
			ver_vetana_informativa('FALTÓ SELECCIONAR UN AÑO');
			return;
		}
		
		buscarinformeCobroGeneralGrafica()
		document.getElementById("btnInformeCobroGeneral3").style='background-color:#ff9800;color:#fff'
		document.getElementById("divVentanaInformeCobroGeneral3").style.display=''
	}
}



/* SALARIO FUNCIONARIO */

var cod_funcionarioSalario="";
var NombrefuncionarioSalario="";
var CargofuncionarioSalario="";
var idFuncionarioSalario="";
function verCerrarSalarioFuncionarios(datos){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divSalarioFuncionarios").style.display==""){
		document.getElementById("tabla_salarios").innerHTML =""
	$("div[id=divSalarioFuncionarios]").fadeOut(500);			
	}else{	
// if(controlacceso("VERINFORMEDEMETAS","accion")==false){return;}	
		document.getElementById("divSalarioFuncionarios").style.display=""
		cod_funcionarioSalario=datos.id;
		NombrefuncionarioSalario=datos.getAttribute('data-url');
		CargofuncionarioSalario=datos.getAttribute('data-name');
		idFuncionarioSalario=datos.getAttribute('data-email');
		
		var f = new Date();
	 
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	} 
		document.getElementById("inptMesSalario").value= mes
		document.getElementById("inptahnoSalario").value= f.getFullYear()
 
	}
}

function minimizarInformeCalculoSalacio(){
 
	$("div[id=divSalarioFuncionarios]").fadeOut(500);	
	document.getElementById("divMinimizadoCalculoSalario").style.display="";
	copiarBotonEnContenedor(document.getElementById("divMenuCalculoSalarioFun"));
}

function crearCabeceraDetalleSalarios(esMeta) {
	var tabla = document.createElement("table");
	tabla.className = "tableCabeceraRegistro";
	tabla.style.width = "100%";
	var cuerpo = document.createElement("tbody");
	var fila = document.createElement("tr");
	var columnas = esMeta
		? [["META", "10%"], ["DESCRIPCION", "45%"], ["DESDE", "15%"], ["HASTA", "15%"], ["COMISION", "15%"]]
		: [["", "10%"], ["DESCRIPCION", "60%"], ["MONTO", "30%"]];
	columnas.forEach(function (columna) {
		var celda = document.createElement("td");
		celda.className = "td_registro";
		celda.style.width = columna[1];
		celda.textContent = columna[0];
		fila.appendChild(celda);
	});
	cuerpo.appendChild(fila);
	tabla.appendChild(cuerpo);
	return tabla;
}

function crearDetalleTarjetaSalarios(detalle, esMeta) {
	var recordatorio = document.createElement("div");
	recordatorio.className = "reminders";
	if (detalle.imprimible) {
		var montoImpresion = esMeta ? detalle.comision : detalle.monto;
		var tipoImpresion = esMeta ? detalle.tipo_impresion : detalle.tipo;
		recordatorio.id = String(montoImpresion == null ? "" : montoImpresion);
		recordatorio.setAttribute("data-url", tipoImpresion == null ? "" : tipoImpresion);
		recordatorio.setAttribute("data-name", "imprimirSalario");
	}

	var lista = document.createElement("ul");
	lista.className = "task-list";
	var item = document.createElement("li");
	item.className = detalle.tema == null ? "" : detalle.tema;
	var titulo = document.createElement("div");
	titulo.className = "task-title";
	var icono = document.createElement("i");
	icono.className = detalle.icono == null ? "" : detalle.icono;
	var descripcion = document.createElement("p");
	descripcion.textContent = esMeta
		? (detalle.descripcion == null ? "" : detalle.descripcion)
		: (detalle.tipo == null ? "" : detalle.tipo) + "-" + (detalle.fecha == null ? "" : detalle.fecha);
	titulo.appendChild(icono);
	titulo.appendChild(descripcion);
	item.appendChild(titulo);

	var valores = esMeta
		? [detalle.desde, detalle.hasta, detalle.comision_mostrar]
		: [detalle.monto_mostrar];
	valores.forEach(function (valor) {
		var grupo = document.createElement("div");
		grupo.className = "task-title";
		var texto = document.createElement("p");
		texto.textContent = valor == null ? "" : valor;
		grupo.appendChild(texto);
		item.appendChild(grupo);
	});
	lista.appendChild(item);
	recordatorio.appendChild(lista);
	return recordatorio;
}

function crearTarjetaSalarios(tarjeta) {
	var esMeta = tarjeta.tipo === "meta";
	var columna = document.createElement("div");
	columna.className = "col-md-6 col-xl-4";
	var contenido = document.createElement("div");
	contenido.className = "cardtb";

	var cabecera = document.createElement("div");
	cabecera.className = "card-header";
	var titulo = document.createElement("h3");
	titulo.className = "card-title";
	titulo.appendChild(document.createTextNode((tarjeta.titulo == null ? "" : tarjeta.titulo) + (esMeta ? " SOBRE :" : " :")));
	var monto = document.createElement("b");
	monto.textContent = " " + (tarjeta.monto_titulo == null ? "" : tarjeta.monto_titulo) + " Gs.";
	titulo.appendChild(monto);
	cabecera.appendChild(titulo);
	contenido.appendChild(cabecera);

	var cuerpo = document.createElement("div");
	cuerpo.className = "card-body";
	cuerpo.style.overflow = "auto";
	cuerpo.style.height = "200px";
	cuerpo.appendChild(crearCabeceraDetalleSalarios(esMeta));
	(tarjeta.detalles || []).forEach(function (detalle) {
		cuerpo.appendChild(crearDetalleTarjetaSalarios(detalle, esMeta));
	});
	contenido.appendChild(cuerpo);

	var pie = document.createElement("div");
	pie.className = "card-footer";
	if (esMeta) {
		var totalMeta = document.createElement("p");
		totalMeta.className = "pTituloC";
		totalMeta.appendChild(document.createTextNode("Total Meta:"));
		var valorMeta = document.createElement("b");
		valorMeta.textContent = " " + (tarjeta.total_meta == null ? "" : tarjeta.total_meta) + " ";
		totalMeta.appendChild(valorMeta);
		totalMeta.appendChild(document.createTextNode(" ==> Efectividad= "));
		var efectividad = document.createElement("b");
		efectividad.textContent = (tarjeta.efectividad == null ? "" : tarjeta.efectividad) + "%";
		totalMeta.appendChild(efectividad);
		pie.appendChild(totalMeta);

		var totalCobrar = document.createElement("p");
		totalCobrar.className = "pTituloC";
		totalCobrar.appendChild(document.createTextNode("Total a Cobrar:"));
		var valorCobrar = document.createElement("b");
		valorCobrar.textContent = " " + (tarjeta.total_cobrar == null ? "" : tarjeta.total_cobrar) + " ";
		totalCobrar.appendChild(valorCobrar);
		pie.appendChild(totalCobrar);
	} else {
		var total = document.createElement("p");
		total.className = "pTituloC";
		total.appendChild(document.createTextNode(tarjeta.etiqueta_total == null ? "" : tarjeta.etiqueta_total));
		var valor = document.createElement("b");
		valor.textContent = " " + (tarjeta.total == null ? "" : tarjeta.total) + " ";
		total.appendChild(valor);
		pie.appendChild(total);
	}
	contenido.appendChild(pie);
	columna.appendChild(contenido);
	return columna;
}

function renderizarTarjetasSalarios(tarjetas) {
	var contenedor = document.getElementById("tabla_salarios");
	if (!contenedor) return;
	while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild);
	(tarjetas || []).forEach(function (tarjeta) {
		contenedor.appendChild(crearTarjetaSalarios(tarjeta));
	});
}


function Buscarsalario() {
		
	var mes =  document.getElementById("inptMesSalario").value
	var ahno =  document.getElementById("inptahnoSalario").value
	document.getElementById("tabla_salarios").innerHTML = paginacargando
	document.getElementById("inptTotalRegistroSalarios").value = ""
	document.getElementById("inptTotalaCobrarSalarios").value = ""
	document.getElementById("inptTotalaCobradoSalarios").value = ""
	document.getElementById("inptTotalaPendienteSalarios").value = ""
	document.getElementById("inptTotalAdelantosSalarios").value = ""
	document.getElementById("inptTotalExtraSalarios").value = ""
	document.getElementById("inptTotalIPSSalarios").value = ""    

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"mes": mes,
		"ahno": ahno,
		"cod_funcionarioSalario": cod_funcionarioSalario,
		"idFuncionarioSalario": idFuncionarioSalario,
		"formato": "json",
		"funt": "salarios"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("tabla_salarios").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("tabla_salarios").innerHTML = ""	
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					if (Array.isArray(pagina)) renderizarTarjetasSalarios(pagina);
					else document.getElementById("tabla_salarios").innerHTML = pagina
                    document.getElementById("inptTotalRegistroSalarios").value = datos[3];
                    document.getElementById("inptTotalaCobrarSalarios").value = datos[4];
					document.getElementById("inptTotalaCobradoSalarios").value =datos[5];
					document.getElementById("inptTotalaPendienteSalarios").value = datos[7];
					document.getElementById("inptTotalExtraSalarios").value = datos[6];
					document.getElementById("inptTotalAdelantosSalarios").value = datos[8];
					document.getElementById("inptTotalIPSSalarios").value = datos[9];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
	
 

