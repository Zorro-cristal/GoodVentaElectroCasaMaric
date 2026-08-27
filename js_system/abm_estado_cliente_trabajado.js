/*
ABM ESTADO CLIENTE TRABAJADO
*/
var listadoAbmEstadosClientesTrabajados = null;
var listadoCalculadoraCategoriaPrecio = null;
var listadoArchivosPedidosProveedor = null;

function iniciarListadoArchivosPedidosProveedor() {
	if (listadoArchivosPedidosProveedor || !window.AbmListadoCore) { return listadoArchivosPedidosProveedor; }
	var cuerpo = document.getElementById("table_archivo_excel_pedidos_proveedor");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraArchivosPedidosProveedor";
	listadoArchivosPedidosProveedor = window.AbmListadoCore.crear({
		nombre: "archivos_pedidos_proveedor",
		idCabecera: "cabeceraArchivosPedidosProveedor",
		idCuerpo: "table_archivo_excel_pedidos_proveedor",
		ordenInicial: "fecha",
		columnas: [
			{ campo: "tipo", titulo: "ARCHIVO", ancho: "20%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "30%" },
			{ campo: "proveedor", titulo: "PROVEEDOR", ancho: "30%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "20%" }
		],
		fila: {
			idFila: "tbSelecRegistroArchivo",
			funcionSeleccion: "SeleccionarItemArchivosExcelPedidosProveedor",
			atributosTabla: function (registro) { return { id: registro.codigo_fila || "" }; },
			atributosFila: { name: "tableRegistroSelec" },
			celdas: [
				{ id: "td_id_1", campo: "codigo_fila", tecnica: true },
				{ id: "td_id_2", campo: "id_archivo", tecnica: true },
				{ id: "td_id_3", campo: "id_proveedor", tecnica: true },
				{ id: "td_datos_1", campo: "url", tecnica: true },
				{ campo: "tipo", columna: "tipo" },
				{ id: "td_datos_2", campo: "descripcion", columna: "descripcion" },
				{ campo: "proveedor", columna: "proveedor" },
				{ id: "td_datos_3", campo: "fecha", columna: "fecha" }
			]
		}
	});
	listadoArchivosPedidosProveedor.iniciar();
	return listadoArchivosPedidosProveedor;
}

function iniciarListadoCalculadoraCategoriaPrecio() {
	if (listadoCalculadoraCategoriaPrecio || !window.AbmListadoCore) { return listadoCalculadoraCategoriaPrecio; }
	var cuerpo = document.getElementById("table_abm_CalculadoraCategoriaPrecio");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraCalculadoraCategoriaPrecio";
	listadoCalculadoraCategoriaPrecio = window.AbmListadoCore.crear({
		nombre: "calculadora_categoria_precio",
		idCabecera: "cabeceraCalculadoraCategoriaPrecio",
		idCuerpo: "table_abm_CalculadoraCategoriaPrecio",
		ordenInicial: "descripcion",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "20%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "80%" }
		],
		fila: {
			funcionSeleccion: "obtenerdatosCalculadoraCategoraiPrecio",
			atributosFila: function (registro) {
				return { dataset: { detalle: JSON.stringify(registro.detalle || {}) } };
			},
			celdas: [
				{ id: "td_id", campo: "codigo", columna: "codigo", render: function (valor, registro, celda) {
					celda.style.backgroundColor = "#efeded";
					celda.style.color = "red";
					return valor;
				} },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_2", campo: "precio_desde", tecnica: true },
				{ id: "td_datos_3", campo: "precio_hasta", tecnica: true }
			]
		}
	});
	listadoCalculadoraCategoriaPrecio.iniciar();
	return listadoCalculadoraCategoriaPrecio;
}

function iniciarListadoAbmEstadosClientesTrabajados() {
	if (listadoAbmEstadosClientesTrabajados || !window.AbmListadoCore) { return listadoAbmEstadosClientesTrabajados; }
	var cuerpo = document.getElementById("divBuscadorAbmEstadosClientesTrabajados");
	if (!cuerpo || !cuerpo.parentNode) { return null; }
	var tablas = cuerpo.parentNode.querySelectorAll("table.tableCabeceraRegistro");
	var cabecera = tablas.length ? tablas[0].querySelector("tr") : null;
	if (!cabecera) { return null; }
	cabecera.id = "cabeceraAbmEstadosClientesTrabajados";
	listadoAbmEstadosClientesTrabajados = window.AbmListadoCore.crear({
		nombre: "estados_clientes_trabajados",
		idCabecera: "cabeceraAbmEstadosClientesTrabajados",
		idCuerpo: "divBuscadorAbmEstadosClientesTrabajados",
		ordenInicial: "descripcion",
		columnas: [{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "100%" }],
		fila: {
			funcionSeleccion: "ObtenerdatosAbmEstadosClientesTrabajados",
			celdas: [
				{ id: "td_id", campo: "codigo", tecnica: true },
				{ id: "td_datos_1", campo: "descripcion", columna: "descripcion", className: "tdRegistroSearch" },
				{ id: "td_datos_2", campo: "estado", tecnica: true }
			]
		}
	});
	listadoAbmEstadosClientesTrabajados.iniciar();
	return listadoAbmEstadosClientesTrabajados;
}
var idAbmEstadosClientesTrabajados="";
function verVentanaAbmEstadosClientesTrabajados(d){
	if(d=='1'){
		BuscarAbmEstadosClientesTrabajados()
		document.getElementById('divAbmEstadosClientesTrabajados').style.display = '';
	}else{
		document.getElementById('divAbmEstadosClientesTrabajados').style.display = 'none';
		LimpiarCamposAbmEstadosClientesTrabajados()
		document.getElementById('divBuscadorAbmEstadosClientesTrabajados').innerHTML = ''
	}
}
function LimpiarCamposAbmEstadosClientesTrabajados(){
	document.getElementById("inptDescripcionAbmEstadosClientesTrabajados").value="";
	document.getElementById("inptEstadoAbmEstadosClientesTrabajados").value="Activo";
	document.getElementById("btnAbmEstadosClientesTrabajados1").value="Guardar Datos"
	idAbmEstadosClientesTrabajados="";
}
function ObtenerdatosAbmEstadosClientesTrabajados(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		

	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptDescripcionAbmEstadosClientesTrabajados").value = $(datostr).children('td[id="td_datos_1"]').html();
    document.getElementById("inptEstadoAbmEstadosClientesTrabajados").value = $(datostr).children('td[id="td_datos_2"]').html();
	idAbmEstadosClientesTrabajados = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnAbmEstadosClientesTrabajados1").value="Editar Datos"
}
function VerificarDatosAbmEstadosClientesTrabajados(){
	var inptDescripcionAbmEstadosClientesTrabajados = document.getElementById("inptDescripcionAbmEstadosClientesTrabajados").value
	var inptEstadoAbmEstadosClientesTrabajados = document.getElementById("inptEstadoAbmEstadosClientesTrabajados").value	
	if(inptDescripcionAbmEstadosClientesTrabajados==""){
		document.getElementById("inptDescripcionAbmEstadosClientesTrabajados").focus()
		ver_vetana_informativa("FALTÓ INGRESAR LA DESCRIPCION DEL ESTADO")
		return
	}
	
	var accion = "";
	if (idAbmEstadosClientesTrabajados != "") {		
		accion = "editar";
	} else {
		accion = "nuevo";
	}
	AbmEstadosEstadosClientesTrabajados(inptDescripcionAbmEstadosClientesTrabajados,inptEstadoAbmEstadosClientesTrabajados,idAbmEstadosClientesTrabajados,accion)
}
function AbmEstadosEstadosClientesTrabajados(descripcion,Estado,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("descripcion", descripcion)
	datos.append("estado", Estado)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMEstadoClientesTrabajados.php",
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
					LimpiarCamposAbmEstadosClientesTrabajados()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmEstadosClientesTrabajados()
					BuscarSelectEstadosClientesTrabajados() 
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmEstadosClientesTrabajados() {
	var listado = iniciarListadoAbmEstadosClientesTrabajados();
	var buscador = document.getElementById("inptBuscarAbmEstadosClientesTrabajados").value
	var estado = "Activo"
	document.getElementById("divBuscadorAbmEstadosClientesTrabajados").innerHTML = paginacargando
    document.getElementById("lblNroRegistroAbmEstadosClientesTrabajados").innerHTML="";
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
        url: "/GoodVentaElectroCasaMaric/php_system/ABMEstadoClientesTrabajados.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorAbmEstadosClientesTrabajados").innerHTML = ''
			document.getElementById("lblNroRegistroAbmEstadosClientesTrabajados").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorAbmEstadosClientesTrabajados").innerHTML = ''
			document.getElementById("lblNroRegistroAbmEstadosClientesTrabajados").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					if (listado) { listado.establecerRegistros(Array.isArray(datos_buscados) ? datos_buscados : []); }
                   document.getElementById("lblNroRegistroAbmEstadosClientesTrabajados").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   
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
	document.addEventListener("DOMContentLoaded", iniciarListadoAbmEstadosClientesTrabajados);
} else {
	iniciarListadoAbmEstadosClientesTrabajados();
}
function BuscarSelectEstadosClientesTrabajados() {
	document.getElementById("inptEstadoCargarDetalleClientesTrabajados").innerHTML = ""
	document.getElementById("inptBuscarInformeClientesTrabajados3").innerHTML = ""
	

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarOption"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMEstadoClientesTrabajados.php",
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
					document.getElementById("inptEstadoCargarDetalleClientesTrabajados").innerHTML = datos_buscados
					document.getElementById("inptBuscarInformeClientesTrabajados3").innerHTML = datos_buscados
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}



/* CLIENTES PARA INFORMCONF */

function verCerrarClienteParaInforconf(){
	 document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divClienteParaInforconf").style.display==""){
	 
		// $("div[id=divClienteParaInforconf]").fadeOut(500);	
		document.getElementById("divMinimizadoClienteParaInforconf").style.display="none"
		document.getElementById("divClienteParaInforconf").style.display="none"
		 
	}else{		
		 if(controlacceso("VERCLIENTEINFORMCONF","accion")==false){return;}
		 mostrarSoloUno("divClienteParaInforconf")	
		document.getElementById("divClienteParaInforconf").style.display="";
	}
}

function minimizarAbmClienteParaInforconf(){
	$("div[id=divClienteParaInforconf]").fadeOut(500);
	document.getElementById("divMinimizadoClienteParaInforconf").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuClienteParaInforconf"));
}

function agregarCeldaClienteParaInformconf(fila, valor, ancho, id){
	var celda = document.createElement("td");
	if(id){ celda.id = id; }
	if(ancho){ celda.style.width = ancho; }
	celda.textContent = valor === null || typeof valor === "undefined" ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function renderClientesParaInformconf(registros){
	var contenedor = document.getElementById("table_abm_ClienteParaInforconf");
	if(!contenedor || !Array.isArray(registros)){ return; }
	contenedor.textContent = "";
	var fragmento = document.createDocumentFragment();
	registros.forEach(function(registro){
		var tabla = document.createElement("table");
		tabla.className = registro.clase_fila || "tableRegistroSearch";
		tabla.setAttribute("border", "0");
		tabla.setAttribute("cellspacing", "0");
		tabla.setAttribute("cellpadding", "0");
		var fila = document.createElement("tr");
		fila.id = "tbSelecRegistro";
		fila.setAttribute("name", "tbClienteParaInforconf");
		agregarCeldaClienteParaInformconf(fila, registro.documento, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.primer_nombre, "10%", "");
		agregarCeldaClienteParaInformconf(fila, registro.primer_apellido, "10%", "");
		agregarCeldaClienteParaInformconf(fila, registro.codigo_tipo, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.fecha_venta, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.total_venta, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.tipo, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.cuotas, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.fecha_ultimo_pago, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.fecha_pago_deuda, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.deuda_pendiente, "8%", "");
		agregarCeldaClienteParaInformconf(fila, registro.id_venta, "8%", "td_cod");
		if(registro.seleccionable){
			var celdaSeleccion = agregarCeldaClienteParaInformconf(fila, "", "5%", "");
			var check = document.createElement("input");
			check.type = "checkbox";
			check.checked = true;
			check.name = registro.id_cliente == null ? "" : String(registro.id_cliente);
			check.id = "checkcod_" + String(registro.id_venta == null ? "" : registro.id_venta);
			celdaSeleccion.appendChild(check);
		}
		tabla.appendChild(fila);
		fragmento.appendChild(tabla);
	});
	contenedor.appendChild(fragmento);
}

function buscarcuentaClienteParaInforconf(){

	 var filtro= document.getElementById("inputSelectTipoBuscarClienteParaInforconf").value
	 var buscar= document.getElementById("inptBuscarClienteParaInforconf").value
	 var zona= document.getElementById("inputSelectZonaInfClienteParaInforconf").value
	 var vista= document.getElementById("inputSelectVistaClienteParaInforconf").value
	 var fecha= document.getElementById("inptFechaClienteParaInforconf").value
   
	 document.getElementById("table_abm_ClienteParaInforconf").innerHTML=paginacargando
	 document.getElementById("inptTotalRegistoClienteParaInforconf").value=""
	 document.getElementById("inptTotalDeudaRegistoClienteParaInforconf").value=""
		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			 "buscar": buscar,
			 "filtro": filtro,
			 "zona": zona,
			 "vista": vista,
			 "fecha": fecha,
			 "formato": "json",
			 "funt": "ClienteParaInforconf"
			};
	 $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmventa.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_ClienteParaInforconf").innerHTML = ""	
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				document.getElementById("table_abm_ClienteParaInforconf").innerHTML = "";
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];				
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
					var pagina = datos[2];
					renderClientesParaInformconf(pagina)
					document.getElementById("inptTotalRegistoClienteParaInforconf").value = datos[3];
					document.getElementById("inptTotalDeudaRegistoClienteParaInforconf").value=datos[6];
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	
	
}


function ExporarClienteParaInforconf() {
	
	/* var vista= document.getElementById("inputSelectVistaClienteParaInforconf").value
	
	if(vista==2){
		ver_vetana_informativa("NO SE PUEDE GENERAR EL ARCHIVO EXCEL CON ESTA OPCION DE VISTA")
						return false;
	} */

	$("#table_abm_ClienteParaInforconf").table2excel({
       // exclude CSS class
       exclude: ".noExl",
       name: "CLINETES_INFORMCONF"
       }); 
	 
}



function verCerrarCalculadoraPrecio(){
if(controlacceso("VERCALCULADORADEPRECIOS","accion")==false){return;}
	
	if(document.getElementById("modalCalculo").style.display==""){
		$("div[id=modalCalculo]").fadeOut(500);	
	}else{
		limpiarcampoCalculadora()
		document.getElementById("modalCalculo").style.display=""
	}
}

 
function verCerrarCategoriaPrecio(){ 
	if(document.getElementById("modalTabla").style.display==""){
		$("div[id=modalTabla]").fadeOut(500);	
	}else{	
		buscarabmCategoriaPrecioCalculadora()
		
		document.getElementById("modalTabla").style.display=""
	}
}

function limpiarcampoCalculadora(){
	document.getElementById('precioContado').innerText = "0";
    document.getElementById('precioCredito').innerText = "0";
    document.getElementById('precioCuota').innerText = "0";
    document.getElementById('precioContadoDescuento').innerText = "0";
    document.getElementById('precioCuotaDescuento').innerText = "0";
    document.getElementById('tidpCategoriaCalcularPrecio').value = "";
    document.getElementById('precioBase').innerText = "";
}

function calcular() {
    let precioBase = QuitarSeparadorMil(document.getElementById('precioBase').value);
    let cuotas = QuitarSeparadorMil(document.getElementById('cuotas').value);
	
	let TipoCategorias =  document.getElementById('tidpCategoriaCalcularPrecio').value;
	
	if(TipoCategorias==""){
		return false;
	}
	
	// alert(PrecioDesde)
	// alert(precioBase)
	// alert(PrecioHasta)
	if (precioBase >= PrecioDesde && precioBase <= PrecioHasta){	 

    const datos = detalle[cuotas]; // cuotas debe estar definida antes
    const contado = detalle[1];

    let porcentajeContado = contado.porcentaje;
    console.log("Porcentaje contado:", porcentajeContado);

    let descuento = contado.descuento;
    console.log("Descuento contado:", descuento);

    let interes = datos.porcentaje;
    console.log("Interés crédito:", interes);

    let descuentoCredito = datos.descuento;
    console.log("Descuento crédito:", descuentoCredito);

    // Cálculos
    let precioContado = precioBase + (precioBase * porcentajeContado / 100);
    let precioContadoDescuento = precioContado - (precioContado * descuento / 100);
    let precioCredito = precioBase + (precioBase * interes / 100);
    let precioCuota = precioCredito / cuotas;
	
	let precioCreditoDescuento = precioCredito - (precioBase * descuentoCredito / 100);
    let precioCuotaDescuento = precioCreditoDescuento / cuotas;

    // Redondeo a múltiplos de 1000
    precioContado = Math.round(precioContado / 1000) * 1000;
    precioContadoDescuento = Math.round(precioContadoDescuento / 1000) * 1000;
    precioCredito = Math.round(precioCredito / 1000) * 1000;
    precioCuota = Math.round(precioCuota / 1000) * 1000;
    precioCuotaDescuento = Math.round(precioCuotaDescuento / 1000) * 1000;

    // Mostrar con separador de miles
    document.getElementById('precioContado').innerText = separadordemilesnumero(precioContado);
    document.getElementById('precioCredito').innerText = separadordemilesnumero(precioCredito);
    document.getElementById('precioCuota').innerText = separadordemilesnumero(precioCuota);
    document.getElementById('precioContadoDescuento').innerText = separadordemilesnumero(precioContadoDescuento);
    document.getElementById('precioCuotaDescuento').innerText = separadordemilesnumero(precioCuotaDescuento);
		
	}else{
		document.getElementById('precioContado').innerText = "0";
    document.getElementById('precioCredito').innerText = "0";
    document.getElementById('precioCuota').innerText = "0";
    document.getElementById('precioContadoDescuento').innerText = "0";
    document.getElementById('precioCuotaDescuento').innerText = "0";
	}
	

}



function QuitarSeparadorMil(valor) {
  if (typeof valor === 'string') {
    valor = valor.replace(/\./g, ''); // Quita puntos
    valor = valor.replace(/,/g, '.'); // Usa el punto como separador decimal si venía con coma
    valor = valor.replace(/\s/g, ''); // Quita espacios
  }
  return parseFloat(valor) || 0;
}



function checkfiltrosPrecioConDescuento(){
	if(document.getElementById('inptCheckfiltrosPrecioConDescuento').checked==true){
		document.getElementById('lblPrecioCuotaDescuento').style.display=""
	}else{		
		document.getElementById('lblPrecioCuotaDescuento').style.display="none"
	}
}


var DetallePrecioCalculadora="" 
var detalle = "";
var PrecioDesde = 0;
var PrecioHasta = 0;
function obtenerdatosCalculadoraCategoraiPrecio(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'	
 	
	 document.getElementById('tidpCategoriaCalcularPrecio').value = $(datostr).children('td[id="td_datos_1"]').html();
		PrecioDesde = $(datostr).children('td[id="td_datos_2"]').html();
		PrecioHasta = $(datostr).children('td[id="td_datos_3"]').html();
	 
	const detalleJSON = datostr.dataset.detalle;
	detalle = JSON.parse(detalleJSON);
 
	console.log("Detalle:", detalle);
	
	var Opction="";
	
	 for (const cuota in detalle) {
    if (detalle.hasOwnProperty(cuota)) {
      const datos = detalle[cuota];
      console.log(`array: ${cuota}`);
      console.log(`Cuota: ${datos.cuota}`);
      console.log(`  Descuento: ${datos.descuento}`);
      console.log(`  Porcentaje: ${datos.porcentaje}`);
	  if(datos.cuota!="1"){
		  Opction= Opction + "<option value="+datos.cuota+"> Cuota:"+datos.cuota+"</option>";
	  }
	  
 
    }
  }
	document.getElementById('cuotas').innerHTML=Opction
 
 
	verCerrarCategoriaPrecio()
	
	document.getElementById('precioBase').focus();
 
}

 




function buscarabmCategoriaPrecioCalculadora() {
	var listado = iniciarListadoCalculadoraCategoriaPrecio();
	document.getElementById("table_abm_CalculadoraCategoriaPrecio").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscarCalculadora"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmCategoriaPrecio.php",
		type: "post",	 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_CalculadoraCategoriaPrecio").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_CalculadoraCategoriaPrecio").innerHTML = ''
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


//ARCHIVOS EXCEL PEDIDOS PROVEEDOR
var CodPedidoProveedorArchivo = ""
function verCerrarCargarArchivosExcelPedidosProveedor(d){
	if(d=="1"){
		if(controlacceso("CARGARARCHIVOSEXCELPEDIDOPROVEEDOR","accion")==false){return;}
		document.getElementById("divAbmCargarArchivosExcelPedidosProveedor").style.display = "";
		LimpiarCamposCargarArchivosExcelPedidosProveedor()
	}else{
		mostrarSoloUno("divAbmCargarArchivosExcelPedidosProveedor")	
		document.getElementById("divAbmCargarArchivosExcelPedidosProveedor").style.display="none"
	}
}
function minimizarPedidosProveedor(){ 
	$("div[id=divAbmCargarArchivosExcelPedidosProveedor]").fadeOut(500);	
	document.getElementById("divMinimizadoArchivosExcel").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuArchivosExcel"));
}
function ExploradorArchivosExcelPedidosProveedor(File){	
$("input[id="+File+"]").click();
}
var archivoexcelpedidosproveedor="";
var extensionexcelpedidosproveedor="";	
var urlexcelpedidosproveedor="";
function readFileDocArchivosExcelPedidosProveedor(input){
var file=$("input[name="+input.name+"]")[0].files[0];
urlexcelpedidosproveedor = URL.createObjectURL(file);
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension.toLowerCase()=="xlsx")){
}else{
ver_vetana_informativa("DEBE SER UN ARCHIVO EXCEL")
return false;
}
var readerPrincipal = new FileReader();
readerPrincipal.onload = function(e){
	extensionexcelpedidosproveedor = file_extension;
	archivoexcelpedidosproveedor = e.target.result;
	document.getElementById("text-carga-2-archivosexcelpedidosproveedor").style.display=""
	document.getElementById("text-carga-archivosexcelpedidosproveedor").style.display="none"
	
	
	document.getElementById("btnAddArchivosExcelPedidosProveedor").style.backgroundColor = "";
	document.getElementById("btnEliminarArchivosExcelPedidosProveedor").style.backgroundColor = "#d5d3d3";
	document.getElementById("btnVerArchivosExcelPedidosProveedor").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroArchivosExcelPedidosProveedor]").each(function(i, td){
	td.className=''
});
	
	elementoarchivoseleccionadoexcelproveedor="";
	
	
document.getElementById("file_ArchivosExcelPedidosProveedor").value="";
}
readerPrincipal.readAsDataURL(input.files[0]);
}
function AddCargarArchivosExcelPedidosProveedor(){

	if(archivoexcelpedidosproveedor ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
	if(document.getElementById('inptNombreClientesArchivosExcelPedidosProveedor').value == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN PROVEEDOR")
		return;
	}
	

	
	var descripcion = document.getElementById("inptDescripcionCargarArchivosExcelPedidosProveedor");
    descripcion = descripcion.options[descripcion.selectedIndex].text;
	
	let fecha = document.getElementById('inptFechaCargarArchivosExcelPedidosProveedor').value
	
	if(fecha == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA FECHA")
		return;
	}
	
	if(document.getElementById('inptDescripcionCargarArchivosExcelPedidosProveedor').value == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA DESCRIPCION")
		return;
	}
	

$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});

var accion = "insertarArchivo";
	AbmCargarArchivosExcelPedidosProveedor(accion,document.getElementById('inptNombreClientesArchivosExcelPedidosProveedor').value,descripcion,fecha,archivoexcelpedidosproveedor,extensionexcelpedidosproveedor);
}
var elementoarchivoseleccionadoexcelproveedor="";
function SeleccionarItemArchivosExcelPedidosProveedor(datostr) {
	elementoarchivoseleccionadoexcelproveedor = datostr
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
	});
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarArchivosExcelPedidosProveedor").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerArchivosExcelPedidosProveedor").style.backgroundColor = "#2196F3";
	

	document.getElementById("btnAddArchivosExcelPedidosProveedor").style.backgroundColor = "#d5d3d3";
	archivoexcelpedidosproveedor = "";
	extensionexcelpedidosproveedor = "";
}
function LimpiarCamposCargarArchivosExcelPedidosProveedor(){
	document.getElementById("btnAddArchivosExcelPedidosProveedor").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarArchivosExcelPedidosProveedor").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerArchivosExcelPedidosProveedor").style.backgroundColor="#d5d3d3";
	document.getElementById("inptDescripcionCargarArchivosExcelPedidosProveedor").value=""
	document.getElementById("inptFechaCargarArchivosExcelPedidosProveedor").value = ""
	document.getElementById("text-carga-archivosexcelpedidosproveedor").style.display=""
	document.getElementById("text-carga-2-archivosexcelpedidosproveedor").style.display="none"
	elementoarchivoseleccionadoexcelproveedor =""
	archivoexcelpedidosproveedor="";
	extensionexcelpedidosproveedor = "";
	urlexcelpedidosproveedor="";
	document.getElementById('inptFechaCargarArchivosExcelPedidosProveedor').value = obtenerFechaActual();
}
function AbmCargarArchivosExcelPedidosProveedor(accion,CodPedidoProveedorArchivo,descripcion,fecha,archivo,ext){
	var datos = new FormData();
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("cod_proveedorFK", CodPedidoProveedorArchivo)
	datos.append("descripcion", descripcion)
	datos.append("fecha", fecha)
	datos.append("archivo", archivo)
	datos.append("ext", ext)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmproveedor.php",
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
					LimpiarCamposCargarArchivosExcelPedidosProveedor()
					buscarArchivosExcelPedidosProveedor()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function VerCargarArchivosExcelPedidosProveedor(d){
	
	if(elementoarchivoseleccionadoexcelproveedor == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
		
	window.open(`${$(elementoarchivoseleccionadoexcelproveedor).children('td[id="td_datos_1"]').html()}`, '_blank');
	
	// console.log(`${$(elementoarchivoseleccionadoexcelproveedor).children('td[id="td_datos_1"]').html()}`)
	
	document.getElementById("abrirExcel").addEventListener("click", () => {
    fetch(`http://localhost/${$(elementoarchivoseleccionadoexcelproveedor).children('td[id="td_datos_1"]').html()}`) // URL de tu servidor
        .then(response => response.blob())
        .then(blob => {
            // Crear un enlace temporal
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "miExcel.xlsx"; // si quieres que lo descargue
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => console.error("Error al abrir Excel:", err));
});
	

}
function checkCargarArhivosProveedorPedidoFecha(d){
	if(d=="1"){
		document.getElementById('checkCargarArhivosProveedorPedidoFecha1').checked=true
		document.getElementById('checkCargarArhivosProveedorPedidoFecha2').checked=false
		document.getElementById('inptBuscarFiltroFechaPedidoProveedorF1').value = "";
	    document.getElementById('inptBuscarFiltroFechaPedidoProveedorF2').value = "";	
		
		document.getElementById('inptBuscarFiltroFechaPedidoProveedorF1').disabled = true;
		document.getElementById('inptBuscarFiltroFechaPedidoProveedorF2').disabled = true;
	}else{		
		document.getElementById('checkCargarArhivosProveedorPedidoFecha1').checked=false
		document.getElementById('checkCargarArhivosProveedorPedidoFecha2').checked=true
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptBuscarFiltroFechaPedidoProveedorF1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptBuscarFiltroFechaPedidoProveedorF2').value = f.getFullYear() + "-" + mes + "-" + dia;
		document.getElementById('inptBuscarFiltroFechaPedidoProveedorF1').disabled = false;
		document.getElementById('inptBuscarFiltroFechaPedidoProveedorF2').disabled = false;
	}
	
	buscarArchivosExcelPedidosProveedor()
}
function EliminarArchivosExcelPedidosProveedor(){
	
	if(controlacceso("ELIMINAREXCELPEDIDOSPROVEEDOR","accion")==false){return;}
	
	if(!confirm("Realmente desea eliminar el archivo?")){
		return;
	}
	
	obtener_datos_user();
	
	var iddocumento = $(elementoarchivoseleccionadoexcelproveedor).children('td[id="td_id_2"]').html()
	var urldocumento = $(elementoarchivoseleccionadoexcelproveedor).children('td[id="td_datos_1"]').html()
	var idproveedor = $(elementoarchivoseleccionadoexcelproveedor).children('td[id="td_id_3"]').html()
	
	let pos=urldocumento.indexOf("/");
	urldocumento = urldocumento.slice(pos+1)
	pos= urldocumento.indexOf("/")
	urldocumento = urldocumento.slice(pos)
	
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idproveedor": idproveedor,
		"iddocumento": iddocumento,
		"urldocumento": urldocumento,
		"funt": "eliminardocumentoArchivosExcelPedidosProveedor"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmproveedor.php",
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
					buscarArchivosExcelPedidosProveedor()
					ver_vetana_informativa("SE HA ELIMINADO CORRECTAMENTE")
					
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function buscarArchivosExcelPedidosProveedor(){
	var listado = iniciarListadoArchivosPedidosProveedor();
	document.getElementById("table_archivo_excel_pedidos_proveedor").innerHTML = ''
	let codproveedorFK = document.getElementById("inptNombreClientesArchivosExcelPedidosProveedor").value
	
	/* if(codproveedorFK==''){
		return;
	} */
	
	let fecha1 = document.getElementById("inptBuscarFiltroFechaPedidoProveedorF1").value;
	let fecha2 = document.getElementById("inptBuscarFiltroFechaPedidoProveedorF2").value;
	
	if(document.getElementById('checkCargarArhivosProveedorPedidoFecha2').checked == true){
		if(fecha1 == "" || fecha2 ==""){
			ver_vetana_informativa("FALTO SELECCIONAR ALGUNAS DE LAS FECHAS");
			return;
		}
	}
	
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"fecha1": fecha1,
		"fecha2": fecha2,
		"cod_proveedorFK": codproveedorFK,
		"formato": "json",
		"funt": "buscarDocumentosCargaArchivoProveedorPedido"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmproveedor.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_archivo_excel_pedidos_proveedor").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_archivo_excel_pedidos_proveedor").innerHTML = ''
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







 function abrirModalAccesoDirecto() {
    document.getElementById("miModal").style.display = "block";
  }

  function cerrarModalAccesoDirecto() {
    document.getElementById("miModal").style.display = "none";
  }
  
function copiarBotonEnContenedor(elementoOriginal) {
  const contenedor = document.getElementById("contenedorModal");

  // Generar un ID único para la copia
  let idCopia = elementoOriginal.id + "_clon";

  // Verificar si ya existe un clon con ese ID
  if (document.getElementById(idCopia)) {
    console.log("Ya existe una copia de este botón. No se creará otra.");
    return; // Salir sin hacer nada
  }

  // Clonar el nodo
  const copia = elementoOriginal.cloneNode(true);

  // Asignar el nuevo ID
  copia.id = idCopia;

  // Agregar listener nuevo
  copia.addEventListener("click", function () {
    cerrarModalAccesoDirecto();
  });

  // Agregar al contenedor
  contenedor.appendChild(copia);
}
 
function mostrarSoloUno(idMostrar) {
  // Ocultar todos los divs con la clase 'principal2'
  const todos = document.querySelectorAll('.principal2');
  todos.forEach(div => {
    div.style.display = 'none';
  });

  // Mostrar solo el que se quiere
  const seleccionado = document.getElementById(idMostrar);
  if (seleccionado) {
    seleccionado.style.display = 'block';
  } else {
    console.warn('No se encontró el div con ID:', idMostrar);
  }
}
 
  function limpiarContenedorModal() {
    document.getElementById("contenedorModal").innerHTML = "";
  }
  
  
