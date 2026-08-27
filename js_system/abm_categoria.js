/*
ABM CATEGORIA
*/
var idAbmCategoria="";
var ElementoSeleccCategoria="";
var VentanaCategoria="";
var listadoAbmCategoria=null;
function iniciarListadoAbmCategoria(){
	if(listadoAbmCategoria || !window.AbmListadoCore){return listadoAbmCategoria;}
	var cuerpo=document.getElementById("divBuscadorCategoria");
	if(!cuerpo){return null;}
	var cabecera=cuerpo.previousElementSibling;
	if(!cabecera || cabecera.tagName!=="TABLE"){return null;}
	cabecera.id="cabeceraAbmCategoria";
	listadoAbmCategoria=window.AbmListadoCore.crear({
		nombre:"categoria",
		idCabecera:"cabeceraAbmCategoria",
		idCuerpo:"divBuscadorCategoria",
		ordenInicial:"descripcion",
		columnas:[{campo:"descripcion",titulo:"DESCRIPCION",ancho:"100%"}],
		fila:{
			funcionSeleccion:"ObtenerdatosAbmCategoria",
			celdas:[
				{id:"td_id",campo:"codigo",tecnica:true},
				{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
				{id:"td_datos_2",campo:"estado",tecnica:true}
			]
		}
	});
	listadoAbmCategoria.iniciar();
	return listadoAbmCategoria;
}
function verCerrarFrmCategoria(d,v){
	if(d=="1"){
		$("div[id=divAbmCategoria]").fadeIn(500);
		VentanaCategoria=v;
		BuscarAbmCategoria()
	}else{
		$("div[id=divAbmCategoria]").fadeOut(500);
	}
}
function LimpiarCamposCategoria(){
	document.getElementById("inptNombreCategoria").value="";
	document.getElementById("inptEstadoCategoria").value="";
	document.getElementById("btnCategoria1").value="Guardar Datos"
	idAbmCategoria="";
	ElementoSeleccCategoria="";
}
function ObtenerdatosAbmCategoria(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccCategoria=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptNombreCategoria").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoCategoria").value = $(datostr).children('td[id="td_datos_2"]').html();
	
	nombreCategoriaPrecioCategoria  = $(datostr).children('td[id="td_datos_1"]').html();
	
	idAbmCategoria = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnCategoria1").value="Editar Datos"
}
function SeleccionarRegistroCategoria(){
	if(ElementoSeleccCategoria==""){
		ver_vetana_informativa("Falto Seleccionar un registro")
		return;
	}
    if(VentanaCategoria=="abmproducto"){
	 document.getElementById("inptCategoriaProducto").value = $(ElementoSeleccCategoria).children('td[id="td_id"]').html();
	 idFkProductoCategoria = $(ElementoSeleccCategoria).children('td[id="td_id"]').html();
	}	
	 document.getElementById("divAbmCategoria").style.display="none";
	 LimpiarCamposCategoria()
}
function VerificarDatosCategoria(){
	var inptNombreCategoria = document.getElementById("inptNombreCategoria").value
	var inptEstadoCategoria = document.getElementById("inptEstadoCategoria").value	
	if(inptNombreCategoria==""){
		document.getElementById("inptNombreCategoria").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	if(inptEstadoCategoria==""){
		document.getElementById("inptEstadoCategoria").focus()
		ver_vetana_informativa("Falto seleccionar el estado del registro")
		return
	}	
	var accion = "";
	if (idAbmCategoria != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmCategoria(inptNombreCategoria,inptEstadoCategoria,idAbmCategoria,accion)
}
function AbmCategoria(descripcion,Estado,idabm,accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/ABMCategoria.php",
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
				LimpiarCamposCategoria()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmCategoria()
				BuscarSelecCategoria()
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
function BuscarAbmCategoria() {
	var listado=iniciarListadoAbmCategoria();
	var buscador = document.getElementById("inptBuscarAbmCategorias").value
	var estado = document.getElementById("inptBuscarEstadoCategoria").value
	if(estado == ''){
		estado = 'Activo';
	}
	document.getElementById("divBuscadorCategoria").innerHTML = paginacargando
    document.getElementById("lblNroRegistroCategoria").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/ABMCategoria.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorCategoria").innerHTML = ''
			document.getElementById("lblNroRegistroCategoria").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorCategoria").innerHTML = ''
			document.getElementById("lblNroRegistroCategoria").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
                   document.getElementById("lblNroRegistroCategoria").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
if(document.readyState==="loading"){
	document.addEventListener("DOMContentLoaded",iniciarListadoAbmCategoria);
}else{
	iniciarListadoAbmCategoria();
}
function BuscarSelecCategoria() {
	document.getElementById("inptCategoriaProductoBuscarInventario").innerHTML = ""
	// document.getElementById("inptCategoriaProductoInformeProductosVendidos").innerHTML = ""
	document.getElementById("inptCategoriaProductoBuscarVista").innerHTML = ""
	document.getElementById("inptBuscarProducto4").innerHTML = ""
	document.getElementById("inptCategoriaProductoInformeProductosNoVendidos").innerHTML = ""
	document.getElementById("inptCategoriaProductoBuscarStock").innerHTML = ""
	document.getElementById("inptCategoriaProductoCatalogo").innerHTML = ""
	document.getElementById("inptCategoriaProductoBuscarinformegralproductos").innerHTML = ""
	document.getElementById("inptBuscarProductoMovimientoStock4").innerHTML = ""
	document.getElementById("inptCategoriaProducto").innerHTML = ""
	document.getElementById("inptBuscarProductoStockMinimoProducto4").innerHTML = ""
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMCategoria.php",
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
					document.getElementById("inptCategoriaProductoBuscarInventario").innerHTML = datos_buscados
					// document.getElementById("inptCategoriaProductoInformeProductosVendidos").innerHTML = datos_buscados
					document.getElementById("inptCategoriaInformeProductosComprados").innerHTML = datos_buscados
					document.getElementById("inptCategoriaProductoBuscarVista").innerHTML = datos_buscados
					document.getElementById("inptBuscarProducto4").innerHTML = datos_buscados
					document.getElementById("inptCategoriaProductoInformeProductosNoVendidos").innerHTML = datos_buscados
					document.getElementById("inptCategoriaProductoBuscarStock").innerHTML = datos_buscados
					document.getElementById("inptCategoriaProductoCatalogo").innerHTML = datos_buscados
					document.getElementById("inptCategoriaProductoBuscarinformegralproductos").innerHTML = datos_buscados
					document.getElementById("inptBuscarProductoMovimientoStock4").innerHTML = datos_buscados
					document.getElementById("inptCategoriaProducto").innerHTML = datos_buscados
					document.getElementById("inptBuscarProductoStockMinimoProducto4").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
