/*
ABM PRECIOS CATEGORIA
*/
var idAbmPrecioCategoria="";
var ElementoSeleccPrecioCategoria="";
var ApertudaFrmCategoriaDesde="";
var listadoAbmPrecioCategoria=null;
function iniciarListadoAbmPrecioCategoria(){
	if(listadoAbmPrecioCategoria || !window.AbmListadoCore){return listadoAbmPrecioCategoria;}
	var cuerpo=document.getElementById("divBuscadorPrecioCategoria");
	if(!cuerpo){return null;}
	var cabecera=cuerpo.previousElementSibling;
	if(!cabecera || cabecera.tagName!=="TABLE"){return null;}
	cabecera.id="cabeceraAbmPrecioCategoria";
	listadoAbmPrecioCategoria=window.AbmListadoCore.crear({
		nombre:"precio_categoria",
		idCabecera:"cabeceraAbmPrecioCategoria",
		idCuerpo:"divBuscadorPrecioCategoria",
		ordenInicial:"cuota",
		columnas:[
			{campo:"descripcion",titulo:"DESCRIPCION",ancho:"25%"},
			{campo:"cuota",titulo:"CUOTA",ancho:"25%"},
			{campo:"descuento",titulo:"DESCUENTO",ancho:"25%"},
			{campo:"porcentaje",titulo:"PORCENTAJE",ancho:"25%"}
		],
		fila:{
			funcionSeleccion:"ObtenerdatosAbmPrecioCategoria",
			celdas:[
				{id:"td_id_1",campo:"codigo",tecnica:true},
				{id:"td_id_2",campo:"categoria",tecnica:true},
				{id:"td_datos_1",campo:"descripcion",columna:"descripcion",className:"tdRegistroSearch"},
				{id:"td_datos_2",campo:"cuota",columna:"cuota",className:"tdRegistroSearch"},
				{id:"td_datos_3",campo:"descuento",columna:"descuento",className:"tdRegistroSearch"},
				{id:"td_datos_4",campo:"porcentaje",columna:"porcentaje",className:"tdRegistroSearch"},
				{id:"td_datos_5",campo:"estado",tecnica:true}
			]
		}
	});
	listadoAbmPrecioCategoria.iniciar();
	return listadoAbmPrecioCategoria;
}

var listadoHistorialProductosDespachados=null;
function iniciarListadoHistorialProductosDespachados(){
	if(listadoHistorialProductosDespachados || !window.AbmListadoCore){return listadoHistorialProductosDespachados;}
	var cuerpo=document.getElementById("table_historial_producto_despachado");
	var cabecera=document.getElementById("tdImpresionDespachado");
	if(!cuerpo || !cabecera){return null;}
	listadoHistorialProductosDespachados=window.AbmListadoCore.crear({
		nombre:"historial_productos_despachados",
		idCabecera:"tdImpresionDespachado",
		idCuerpo:"table_historial_producto_despachado",
		ordenInicial:"fecha",
		columnas:[
			{campo:"fecha",titulo:"FECHA",ancho:"10%"},{campo:"local_origen",titulo:"ENVIADO DE",ancho:"10%"},
			{campo:"local_destino",titulo:"ENVIADO A",ancho:"10%"},{campo:"codigo_barra",titulo:"COD. PRODUCTO",ancho:"10%"},
			{campo:"producto",titulo:"PRODUCTO",ancho:"10%"},{campo:"cantidad",titulo:"CANTIDAD",ancho:"10%"},
			{campo:"responsable",titulo:"RESPONSABLE",ancho:"10%"},{campo:"aceptado_por",titulo:"ACEPTADO POR",ancho:"10%"},
			{campo:"estado",titulo:"ESTADO SOLICITUD",ancho:"10%"}
		],
		fila:{celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},{campo:"fecha",columna:"fecha",className:"tdRegistroSearch"},
			{campo:"local_origen",columna:"local_origen",className:"tdRegistroSearch"},{campo:"local_destino",columna:"local_destino",className:"tdRegistroSearch"},
			{campo:"codigo_barra",columna:"codigo_barra",className:"tdRegistroSearch"},{campo:"producto",columna:"producto",className:"tdRegistroSearch"},
			{campo:"cantidad_formateada",columna:"cantidad",className:"tdRegistroSearch"},{campo:"responsable",columna:"responsable",className:"tdRegistroSearch"},
			{campo:"aceptado_por",columna:"aceptado_por",className:"tdRegistroSearch"},{campo:"estado",columna:"estado",className:"tdRegistroSearch"}
		]}
	});
	listadoHistorialProductosDespachados.iniciar();
	return listadoHistorialProductosDespachados;
}

function crearMarcadorHistorialDespachado(){
	var anterior=document.getElementById("table_historial_mas_producto_despachado");
	if(anterior && anterior.parentNode){anterior.parentNode.removeChild(anterior);}
	var cuerpo=document.getElementById("table_historial_producto_despachado");
	if(!cuerpo){return;}
	var marcador=document.createElement("div");
	marcador.id="table_historial_mas_producto_despachado";
	cuerpo.appendChild(marcador);
}

function limpiarMarcadorHistorialDespachado(){
	var marcador=document.getElementById("table_historial_mas_producto_despachado");
	if(marcador && marcador.parentNode){marcador.parentNode.removeChild(marcador);}
}
function verCerrarFrmPrecioCategoria(d,desde){
	
	if(d=="1"){
		if(idAbmCategoria == ""){
			ver_vetana_informativa("FALTO SELECCIONAR UNA CATEGORIA")
			return
		}
		ApertudaFrmCategoriaDesde= desde;
		document.getElementById("inptNombreCategoriaPrecioCategoria").value=nombreCategoriaPrecioCategoria;
		BuscarAbmPrecioCategoria("vistaCategoria")
		document.getElementById('divAbmPrecioCategoria').style.display = ''
		
	}else if(d=="2"){
		if(idFkProductoCategoria == ""){
			ver_vetana_informativa("FALTO SELECCIONAR UN PRODUCTO")
			return
		}
		document.getElementById("inptNombreCategoriaPrecioCategoria").value=nombreCategoriaPrecioCategoria;
		ApertudaFrmCategoriaDesde= desde;
		BuscarAbmPrecioCategoria("vistaProducto")
		document.getElementById('divAbmPrecioCategoria').style.display = ''
	}else{
		document.getElementById('divAbmPrecioCategoria').style.display = 'none'
		idAbmCategoria = "";
	}
}
function LimpiarCamposPrecioCategoria(){
	document.getElementById("inptDescripcionPrecioCategoria").value="";
	document.getElementById("inptCuotaPrecioCategoria").value="";
	document.getElementById("inptPorcentajePrecioCategoria").value="";
	document.getElementById("inptDescuentoPrecioCategoria").value="";
	document.getElementById("btnPrecioCategoria1").value="Guardar Datos"
	idAbmPrecioCategoria="";
	ElementoSeleccPrecioCategoria="";
}
function ObtenerdatosAbmPrecioCategoria(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	ElementoSeleccPrecioCategoria=datostr
	datostr.className = 'tableRegistroSelec'
	
	
    document.getElementById("inptDescripcionPrecioCategoria").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptCuotaPrecioCategoria").value = $(datostr).children('td[id="td_datos_2"]').html();
    document.getElementById("inptPorcentajePrecioCategoria").value = $(datostr).children('td[id="td_datos_4"]').html();
    document.getElementById("inptDescuentoPrecioCategoria").value = $(datostr).children('td[id="td_datos_3"]').html();
    document.getElementById("inptEstadoPrecioCategoria").value = $(datostr).children('td[id="td_datos_5"]').html();
	idAbmPrecioCategoria = $(datostr).children('td[id="td_id_1"]').html();
     document.getElementById("btnPrecioCategoria1").value="Editar Datos"
}
function SeleccionarRegistroPrecioCategoria(){
	if(ElementoSeleccPrecioCategoria==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return;
	}
	 document.getElementById("divAbmPrecioCategoria").style.display="none";
	 LimpiarCamposPrecioCategoria()
}
function VerificarDatosPrecioCategoria(){
	var inptDescripcionPrecioCategoria = document.getElementById("inptDescripcionPrecioCategoria").value
	var inptCuotaPrecioCategoria = document.getElementById("inptCuotaPrecioCategoria").value
	var inptPorcentajePrecioCategoria = document.getElementById("inptPorcentajePrecioCategoria").value
	var inptDescuentoPrecioCategoria = document.getElementById("inptDescuentoPrecioCategoria").value
	var inptEstadoPrecioCategoria = document.getElementById("inptEstadoPrecioCategoria").value	
	
	
	if(inptDescripcionPrecioCategoria==""){
		document.getElementById("inptDescripcionPrecioCategoria").focus()
		ver_vetana_informativa("FALTO INGRESAR LA DESCRIPCION")
		return
	}
	if(inptCuotaPrecioCategoria==""){
		document.getElementById("inptCuotaPrecioCategoria").focus()
		ver_vetana_informativa("FALTO INGRESAR EL NRO DE CUOTA")
		return
	}
	if(inptPorcentajePrecioCategoria==""){
		document.getElementById("inptPorcentajePrecioCategoria").focus()
		ver_vetana_informativa("FALTO INGRESAR EL PORCENTAJE DE GANANCIA")
		return
	}
	if(inptDescuentoPrecioCategoria==""){
		document.getElementById("inptDescuentoPrecioCategoria").focus()
		ver_vetana_informativa("FALTO INGRESAR EL DESCUENTO")
		return
	}
	
	var accion = "";
	if (idAbmPrecioCategoria != "") {		
		accion = "editar";
	} else {		
		accion = "nuevo";
	}
	AbmPrecioCategoria(inptDescripcionPrecioCategoria,inptCuotaPrecioCategoria,inptPorcentajePrecioCategoria,inptDescuentoPrecioCategoria,inptEstadoPrecioCategoria,idAbmPrecioCategoria,accion)
}
function AbmPrecioCategoria(descripcion,cuota,porcentaje,descuento,estado,idabm,accion) {
	
	var cod_Categoria="";
	if(ApertudaFrmCategoriaDesde=="vistaCategoria"){
		cod_Categoria=idAbmCategoria
	}else{
		cod_Categoria=idFkProductoCategoria
	}
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("cuota", cuota)
	datos.append("porcentaje", porcentaje)
	datos.append("descuento", descuento)
	datos.append("estado", estado)
	datos.append("cod_categoriaFK", cod_Categoria )
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMPrecioCategoria.php",
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
				LimpiarCamposPrecioCategoria()
				ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				BuscarAbmPrecioCategoria(ApertudaFrmCategoriaDesde)
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


function BuscarAbmPrecioCategoria(desde) {
	var listado=iniciarListadoAbmPrecioCategoria();
	var buscador = document.getElementById("inptBuscarAbmPrecioCategorias").value
	document.getElementById("divBuscadorPrecioCategoria").innerHTML = paginacargando
    document.getElementById("lblNroRegistroPrecioCategoria").innerHTML="";
	
	var cod_Categoria="";
	if(desde=="vistaCategoria"){
		cod_Categoria=idAbmCategoria
	}else{
		cod_Categoria=idFkProductoCategoria
	}

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"cod_categoriaFK": cod_Categoria,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMPrecioCategoria.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorPrecioCategoria").innerHTML = ''
			document.getElementById("lblNroRegistroPrecioCategoria").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorPrecioCategoria").innerHTML = ''
			document.getElementById("lblNroRegistroPrecioCategoria").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
                   document.getElementById("lblNroRegistroPrecioCategoria").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
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
	document.addEventListener("DOMContentLoaded",iniciarListadoAbmPrecioCategoria);
}else{
	iniciarListadoAbmPrecioCategoria();
}



function BuscarActualizarPrecioProductoCategoria() {
	
	// return false;
	
	var cod_Categoria="";
	if(ApertudaFrmCategoriaDesde=="vistaCategoria"){
		cod_Categoria=idAbmCategoria
	}else{
		cod_Categoria=idFkProductoCategoria
	}
	
	console.log(idAbmCategoria);
	console.log(idFkProductoCategoria);
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_categoriaFK": cod_Categoria ,
		"funt": "ActualizarPrecioProducto"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMPrecioCategoria.php",
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
					ver_vetana_informativa("PRECIOS ACTUALIZADOS CON EXITO")
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
DESPACHAR PRODUCTOS
*/
function verCerrarDespacharProducto(d){
	if(d=="1"){
		$("div[id=divAbmDespacharProducto]").fadeIn(500);
		limpiarCamposDespacharProductos()
	}else{
		$("div[id=divAbmDespacharProducto]").fadeOut(500);
	}
}
function limpiarCamposDespacharProductos(){
	
	document.getElementById("inptStockProductoEnviarA").value=""
	var f = new Date();
	var dia =f.getDate()
	if(dia<10){
		dia="0"+dia;
	}
	var mes =f.getMonth()+1
	if(mes<10){
		mes="0"+mes;
	}
	document.getElementById('inptFechaProductoEnviarA').value=f.getFullYear()+"-"+mes+"-"+dia;
	
	
}
function VerificarDatosProductosEnviarA(){
	var inptFechaProductoEnviarA = document.getElementById("inptFechaProductoEnviarA").value
	var inptStockProductoEnviarA = document.getElementById("inptStockProductoEnviarA").value
	var inptLocalProductoEnviarA = document.getElementById("inptLocalProductoEnviarA").value
	var inptlocalProducto=document.getElementById('inptlocalProducto').value
	if(inptFechaProductoEnviarA==""){
		ver_vetana_informativa("Falto seleccionar la fecha")
		return
	}
	if(inptStockProductoEnviarA==""){
		document.getElementById("inptStockProductoEnviarA").focus()
		ver_vetana_informativa("Falto ingresar el stock")
		return
	}
	if(inptLocalProductoEnviarA==""){
		document.getElementById("inptLocalProductoEnviarA").focus()
		ver_vetana_informativa("Falto seleccionar el local")
		return
	}	
	AbmEnviarProductoA(inptlocalProducto,inptFechaProductoEnviarA,inptStockProductoEnviarA,inptLocalProductoEnviarA,"EnviarProductoA")
}


function AbmEnviarProductoA(cod_local_de,fecha,stock,cod_local_a,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fecha", fecha)
	datos.append("stock", stock)
	datos.append("cod_local_a", cod_local_a)
	datos.append("cod_local_de", cod_local_de)
	datos.append("cod_producto_fk", idAbmProducto)
	datos.append("cod_ext", "Undefined")
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					ImprimirTicketDespacho()
					limpiarCamposDespacharProductos()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function verCerrarAbmListadoDespacho(d){
	document.getElementById("divSegundoPlano").style.display="none";
	limpiarTodoListadoDespacharProductos()
	if(document.getElementById("divAbmListadoDespacho").style.display==""){
			
 
	$("div[id=divAbmListadoDespacho]").fadeOut(500);	
		document.getElementById("divMinimizadoListadoDespachado").style.display="none"
		
	}else{	
		if(controlacceso("CARGARDESPACHOPRODUCTO","accion")==false){return;}
		mostrarSoloUno("divAbmListadoDespacho")	
			document.getElementById("divAbmListadoDespacho").style.display=""
			 
	}
}
function minimizarabmlistadodespacho(){ 
$("div[id=divAbmListadoDespacho]").fadeOut(500);
document.getElementById("divMinimizadoListadoDespachado").style.display=""	
copiarBotonEnContenedor(document.getElementById("divMenuListadoDespachado"));
}

var controlDespachoProducto="1";
function VerificarDatosListadoDespacho(){
	
	var inptFechaListadoDespacho = document.getElementById("inptFechaListadoDespacho").value
	var inptCantProductoListadoDespachar = document.getElementById("inptCantProductoListadoDespachar").value
	var inptLocalProductoListadoDespachar2 = document.getElementById("inptLocalProductoListadoDespachar2").value
	var inptLocalProductoListadoDespachar1=document.getElementById('inptLocalProductoListadoDespachar1').value
	
	
	
	if(parseInt(inptCantProductoListadoDespachar) <= 0){
		ver_vetana_informativa("LA CANTIDAD A TRANSFERIR DEBER SER MAYOR A 0")
		return
	}
	
	if(parseInt(CantidadProductolistadoDespacho) < parseInt(inptCantProductoListadoDespachar)){
		ver_vetana_informativa("LA CANTIDAD A TRANSFERIR SUPERA EL STOCK")
		return
	}
	
	
	if(codProductoFkListadoDespacho==""){
		ver_vetana_informativa("Falto seleccionar el producto")
		return
	}
	if(inptFechaListadoDespacho==""){
		ver_vetana_informativa("Falto seleccionar la fecha")
		return
	}
	if(inptCantProductoListadoDespachar==""){
		document.getElementById("inptCantProductoListadoDespachar").focus()
		ver_vetana_informativa("Falto ingresar el stock")
		return
	}
	if(inptLocalProductoListadoDespachar2==""){
		document.getElementById("inptLocalProductoListadoDespachar2").focus()
		ver_vetana_informativa("Falto seleccionar el local destino")
		return
	}	
	if(inptLocalProductoListadoDespachar1==""){
		document.getElementById("inptLocalProductoListadoDespachar1").focus()
		ver_vetana_informativa("Falto seleccionar el local Origen")
		return
	}	
	
	if(inptLocalProductoListadoDespachar2 == inptLocalProductoListadoDespachar1){
		ver_vetana_informativa('LOS LOCALES DEBE SER DIFERENTES');
		return;
	}
	
	if(controlDespachoProducto=="2"){
		ver_vetana_informativa("TRANSACCION EN CURSO FAVOR ESPERE")
		return;
	}
	controlDespachoProducto="2";
	
	AbmEnviarListadoDespacho(inptLocalProductoListadoDespachar1,inptLocalProductoListadoDespachar2,inptFechaListadoDespacho,inptCantProductoListadoDespachar,"EnviarProductoA")
}
function AbmEnviarListadoDespacho(cod_local_de,cod_local_a,fecha,stock,accion) {
	verCerrarEfectoCargando("1")
	var codigo=stringGenerador(5)
	var codigo_table=codigo+"_"+codProductoFkListadoDespacho
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("fecha", fecha)
	datos.append("stock", stock)
	datos.append("cod_local_a", cod_local_a)
	datos.append("cod_local_de", cod_local_de)
	datos.append("cod_producto_fk", codProductoFkListadoDespacho)
	datos.append("cod_ext", codigo_table)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
					
					controlDespachoProducto="1";
										ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
				buscarvistaproductodesdelistadospacho();

	
                     var pagina="<table id='tdDetalleListadoDespacho_"+codigo_table+"' class='tableRegistroSearch' border='1' cellspacing='1' cellpadding='5'>"
+"<tr id='tbSelecRegistro' onclick='ObtenerdatosAbmDespacho(this)'  name='tdDetalleListadoDespachoOffline'>"
+"<td id='td_id_1' style='display:none'>"+codigo_table+"</td>"
+"<td id='td_id_2' style='display:none'>"+codProductoFkListadoDespacho+"</td>"
+"<td  id='td_datos_1' style='width:10%;'>"+codigoProductolistadoDespacho+"</td>"
+"<td  id='td_datos_3' style='width:10%'>"+document.getElementById("inptProductoListadoDespachar").value+"</td>"
+"<td  id='td_datos_4' style='width:5%'>"+stock+"</td>"
+"<td  id='td_datos_5' style='width:10%'>"+$("select[id=inptLocalProductoListadoDespachar1]").children(":selected").text()+"</td>"
+"<td  id='td_datos_7' style='width:10%'>"+$("select[id=inptLocalProductoListadoDespachar2]").children(":selected").text()+"</td>"
+"</tr>"
+"</table>"
document.getElementById("table_abm_listado_despacho").innerHTML+=pagina;

var control=0;
$("tr[name=tdDetalleListadoDespachoOffline]").each(function(i, elementohtml){
control=control+1;
	   })	
	   document.getElementById("btnImprimirListadoDespacho").style.display=""
	   // document.getElementById("btnLimpiarCamposListadoDespacho").style.display=""
document.getElementById("inptRegistroNroListadoDespacho").value=control

	   
					limpiarCamposListadoDespacharProductos()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function limpiarCamposListadoDespacharProductos(){
codProductoFkListadoDespacho=""	
codigoProductolistadoDespacho=""	
document.getElementById("inptRegistroSeleccListadoDepacho").value=""
document.getElementById("inptCantProductoListadoDespachar").value=""
document.getElementById("inptProductoListadoDespachar").value=""
document.getElementById("btnGuardarListadoDespacho").style.backgroundColor="#b7b7b7"
// document.getElementById("btnAnularListadoDepachoProducto").style.backgroundColor="#b7b7b7"
}
function limpiarTodoListadoDespacharProductos(){
codProductoFkListadoDespacho=""	
codigoProductolistadoDespacho=""	
document.getElementById("table_abm_listado_despacho").innerHTML=""
document.getElementById("inptCantProductoListadoDespachar").value=""
document.getElementById("inptRegistroSeleccListadoDepacho").value=""
document.getElementById("inptProductoListadoDespachar").value=""
document.getElementById("inptRegistroNroListadoDespacho").value=""
// document.getElementById("btnAnularListadoDepachoProducto").style.backgroundColor="#b7b7b7"
document.getElementById("btnGuardarListadoDespacho").style.backgroundColor="#b7b7b7"
document.getElementById("btnImprimirListadoDespacho").style.display="none"
// document.getElementById("btnLimpiarCamposListadoDespacho").style.display="none"
var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaListadoDespacho').value = f.getFullYear() + "-" + mes + "-" + dia;
}
var elementoDespachado="";
function ObtenerdatosAbmDespacho(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		
	elementoDespachado=datostr
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptRegistroSeleccListadoDepacho").value = $(datostr).children('td[id="td_datos_3"]').html();
     // document.getElementById("btnAnularListadoDepachoProducto").style=""
}
function AbmAnularListadoDespacho() {
	verCerrarEfectoCargando("1")
	var cod_ext=$(elementoDespachado).children('td[id="td_id_1"]').html();
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", "anulardespacho")
	datos.append("cod_ext", cod_ext)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
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
			
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				   Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
										ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
           $("table[id=tdDetalleListadoDespacho_"+cod_ext+"]").remove()    
var control=0;
$("tr[name=tdDetalleListadoDespachoOffline]").each(function(i, elementohtml){
control=control+1;
	   })	

document.getElementById("inptRegistroNroListadoDespacho").value=control
	   limpiarCamposListadoDespacharProductos()
					
				}
				try {
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



/*
REPORTE DESPACHO
*/
function verCerrarInformeProductosDespachados(){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divinfoProductosDespachados").style.display==""){
		document.getElementById("divMinimizadoProductosDespachados").style.display="none"
// document.getElementById("tdInfoProductosDespachados").className="magictime vanishOut"
	$("div[id=divinfoProductosDespachados]").fadeOut(500);	
	}else{		
	if(controlacceso("VERDESPACHADOS","accion")==false){return;}
		if(controldebusquedadDespachado==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
limpiarcamposbuscardespachados()
		document.getElementById("divinfoProductosDespachados").style.display=""
// document.getElementById("tdInfoProductosDespachados").className="magictime slideDownReturn"

		
	}
}

function minimizarventanaproductosdespachados(){	 
	$("div[id=divinfoProductosDespachados]").fadeOut(500);	
	document.getElementById("divMinimizadoProductosDespachados").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuProductoDespachado"));
}

function checkHistorialProductosDespachados(d){	
	if(d=="1"){
		document.getElementById('checkHistorialProductosDespachados1').checked=true
		document.getElementById('checkHistorialProductosDespachados2').checked=false
		document.getElementById('inptBuscarInfProdutosDespachadosF1').value = "";
	    document.getElementById('inptBuscarInfProdutosDespachadosF2').value = "";	
	}else{		
		document.getElementById('checkHistorialProductosDespachados1').checked=false
		document.getElementById('checkHistorialProductosDespachados2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarInfProdutosDespachadosF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarInfProdutosDespachadosF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		
	}
}
function limpiarcamposbuscardespachados(){
		if(controldebusquedadDespachado==true){
		
	return
}
 document.getElementById('inptlocal1InformeProductoDespachado').value=""
 document.getElementById('inptlocal2InformeProductoDespachado').value=""
 document.getElementById('inptBuscarInfProductoDespachado1').value=""
 document.getElementById('inptBuscarInfProductoDespachado2').value=""
 document.getElementById('inptBuscarInfProdutosDespachadosF1').value=""
 document.getElementById('inptBuscarInfProdutosDespachadosF2').value=""
  document.getElementById("table_historial_producto_despachado").innerHTML=""
	if(listadoHistorialProductosDespachados){listadoHistorialProductosDespachados.establecerRegistros([]);}
		 document.getElementById("inptRegistroNroHistorialProductoDespachado").value=""
document.getElementById("tbProcessDespachado").style.display="none"
}
var registrocargadodespachado="";
var totalregistrodespachado="";
var controldebusquedadDespachado=false
function cancelarCargaDespachado(){
	controldebusquedadDespachado=false
	document.getElementById("divProgressDespachado").style.backgroundColor='#ff5722'
}
function buscarhistorialProductosDespachados(){
	if(controlacceso("VERDESPACHADOS","accion")==false){return;}
	var listado=iniciarListadoHistorialProductosDespachados();
  var codlocal1=document.getElementById('inptlocal1InformeProductoDespachado').value
 var codlocal2=document.getElementById('inptlocal2InformeProductoDespachado').value
 var cod_producto=document.getElementById('inptBuscarInfProductoDespachado1').value
 var producto=document.getElementById('inptBuscarInfProductoDespachado2').value
 var fecha1=document.getElementById('inptBuscarInfProdutosDespachadosF1').value
 var fecha2=document.getElementById('inptBuscarInfProdutosDespachadosF2').value
 var estado_solic=document.getElementById('inptBuscarInfProductoDespachado3').value
 
 if(document.getElementById('checkHistorialProductosDespachados2').checked==true){
	 if(fecha1==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		 return
	 }
	 if(fecha2==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		 return
	 }
 }else{
 fecha1=""
 fecha2=""
 }
 	if(controldebusquedadDespachado==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadDespachado=true
		 document.getElementById("table_historial_producto_despachado").innerHTML=paginacargando
		 document.getElementById("inptRegistroNroHistorialProductoDespachado").value=""
		 document.getElementById("tbProcessDespachado").style.display="none"
		 	obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"codlocal1": codlocal1,
			"codlocal2": codlocal2,
			"cod_producto": cod_producto,
			"producto": producto,
			"estado_solic": estado_solic,
			"formato": listado ? "json" : "",
			"funt": "historialdespachado"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
			type:"post",
			 
		
			beforeSend: function(){		
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_historial_producto_despachado").innerHTML=''
			controldebusquedadDespachado=false
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("table_historial_producto_despachado").innerHTML=''
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  Respuesta=respuestaJqueryAjax(Respuesta)
		if (Respuesta == true) {					
			if(listado && Array.isArray(datos[2])){listado.establecerRegistros(datos[2]);}
			else{document.getElementById("table_historial_producto_despachado").innerHTML=typeof datos[2]==="string" ? datos[2] : "";}
			document.getElementById("inptRegistroNroHistorialProductoDespachado").value=datos[3];	
			
					    	registrocargadodespachado=datos[99];
					totalregistrodespachado=datos[100];
			
					
						 if(totalregistrodespachado>registrocargadodespachado){
						 	var porce=((registrocargadodespachado*100)/totalregistrodespachado).toFixed(0)
	document.getElementById("divProgressDespachado").style.width=porce+"%"
						 if(listado){crearMarcadorHistorialDespachado();}
						 else{document.getElementById("table_historial_producto_despachado").innerHTML += "<div id='table_historial_mas_producto_despachado'></div>";}
						  buscarmashistorialProductosDespachados();
					 }else{
						 controldebusquedadDespachado=false
					 }
			}
			}catch(error)
				{
					controldebusquedadDespachado=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});		
}
function buscarmashistorialProductosDespachados(c){
	if(controlacceso("VERDESPACHADOS","accion")==false){return;}
	var listado=iniciarListadoHistorialProductosDespachados();
  var codlocal1=document.getElementById('inptlocal1InformeProductoDespachado').value
 var codlocal2=document.getElementById('inptlocal2InformeProductoDespachado').value
 var cod_producto=document.getElementById('inptBuscarInfProductoDespachado1').value
 var producto=document.getElementById('inptBuscarInfProductoDespachado2').value
 var fecha1=document.getElementById('inptBuscarInfProdutosDespachadosF1').value
 var fecha2=document.getElementById('inptBuscarInfProdutosDespachadosF2').value
 var estado_solic=document.getElementById('inptBuscarInfProductoDespachado3').value
 
 if(document.getElementById('checkHistorialProductosDespachados2').checked==true){
	 if(fecha1==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA DE INICIO")
		 return
	 }
	 if(fecha2==""){
		 	ver_vetana_informativa("FALTO SELECCIONAR LA FECHA FIN")
		 return
	 }
 }else{
 fecha1=""
 fecha2=""
 }
 if(c=="1"){
	 controldebusquedadDespachado=true
 }
 	if(controldebusquedadDespachado==false){
	return
}
controldebusquedadDespachado=true
		 var marcadorDespachado=document.getElementById("table_historial_mas_producto_despachado");
		 if(marcadorDespachado){marcadorDespachado.innerHTML=paginacargando;}
		 document.getElementById("tbProcessDespachado").style.display=""
		 document.getElementById("divProgressDespachado").style.backgroundColor=''
		 	obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"fecha1": fecha1,
			"fecha2": fecha2,
			"codlocal1": codlocal1,
			"codlocal2": codlocal2,
			"cod_producto": cod_producto,
			"producto": producto,
			"estado_solic": estado_solic,
			"registrocargado": registrocargadodespachado,
			"formato": listado ? "json" : "",
			"funt": "historialmasdespachado"
			};
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
			type:"post",
			 
		
			beforeSend: function(){		
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			limpiarMarcadorHistorialDespachado();
			document.getElementById("divProgressDespachado").style.backgroundColor='#ff5722'
			controldebusquedadDespachado=false
			},
			success: function(responseText)
			{	
			var Respuesta=responseText;
     console.log(Respuesta)
			  limpiarMarcadorHistorialDespachado();
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  Respuesta=respuestaJqueryAjax(Respuesta)
		if (Respuesta == true) {					
			if(listado && Array.isArray(datos[2])){listado.establecerRegistros(datos[2],true);}
			else{
				var cuerpoDespachado=document.getElementById("table_historial_producto_despachado");
				if(cuerpoDespachado && typeof datos[2]==="string"){cuerpoDespachado.insertAdjacentHTML("beforeend",datos[2]);}
			}
			document.getElementById("inptRegistroNroHistorialProductoDespachado").value=datos[3];	
			
					    	registrocargadodespachado=datos[99];
		
					
						 if(totalregistrodespachado>registrocargadodespachado){
						 	var porce=((registrocargadodespachado*100)/totalregistrodespachado).toFixed(0)
	document.getElementById("divProgressDespachado").style.width=porce+"%"
						 crearMarcadorHistorialDespachado();
						  buscarmashistorialProductosDespachados();
					 }else{
						  document.getElementById("tbProcessDespachado").style.display="none"
						 controldebusquedadDespachado=false
					 }
			}
			}catch(error)
				{
					document.getElementById("divProgressDespachado").style.backgroundColor='#ff5722'
					controldebusquedadDespachado=false
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
				}
			}
			});		
}
