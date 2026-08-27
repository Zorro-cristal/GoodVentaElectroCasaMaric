// ABM MOTIVO MOVIMIENTO STOCK
function verCerrarAbmNuevoMotivoMovimientoStock(){
	
	if(document.getElementById("divAbmNuevoMotivoMovimientoStock").style.display==""){
		
		$("div[id=divAbmNuevoMotivoMovimientoStock]").fadeOut(500);	
		
	}else{		
	if(controlacceso("CREARNUEVAMOTIVOMOVIMIENTOSTOCK","accion")==false){return;}	
		document.getElementById("divAbmNuevoMotivoMovimientoStock").style.display=""

	}
}
function VerificarDatosNuevoMotivoMovimientoStock() {
	var inptNuevoMotivoMovimientoStock = document.getElementById('inptNuevoMotivoMovimientoStock').value
	
	if (inptNuevoMotivoMovimientoStock == "") {
		ver_vetana_informativa("FALTO AGREGAR DESCRIPCION")
		return false;
	}	

		accion = "NuevoMotivoMovimientoStock";
	
	AbmNuevoMotivoMovimientoStock(inptNuevoMotivoMovimientoStock, accion);
}
function AbmNuevoMotivoMovimientoStock(descripcion , accion) {
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
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					document.getElementById('inptMotivoMovimientoStock').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarMotivoMovimientoStock()
					verCerrarAbmNuevoMotivoMovimientoStock()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function renderizarOpcionesMotivoMovimientoStock(registros) {
	var contenedor = document.getElementById("inptMotivoMovimientoStock");
	if (!contenedor) {
		return;
	}

	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}

	var opcionInicial = document.createElement("option");
	opcionInicial.value = "";
	opcionInicial.textContent = "SELECCIONAR";
	contenedor.appendChild(opcionInicial);

	if (!Array.isArray(registros)) {
		return;
	}

	registros.forEach(function (registro) {
		var opcion = document.createElement("option");
		opcion.value = registro.codigo || "";
		opcion.textContent = registro.descripcion || "";
		contenedor.appendChild(opcion);
	});
}

function buscarMotivoMovimientoStock() {

	document.getElementById("inptMotivoMovimientoStock").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscaroptionMotivoMovimiento"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptMotivoMovimientoStock").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptMotivoMovimientoStock").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderizarOpcionesMotivoMovimientoStock(datos_buscados)
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}



function tieneAccesoMenuEmpresa(codigoPrincipal){
	if(typeof accesosuser=="undefined" || !accesosuser){
		return true;
	}
	if(accesosuser[codigoPrincipal]){
		return accesosuser[codigoPrincipal]["accion"]=="SI";
	}
	if(accesosuser["VERCARGARLIQUIDEZ"]){
		return accesosuser["VERCARGARLIQUIDEZ"]["accion"]=="SI";
	}
	return true;
}

function removeToMenu(){
	resultados='';
	cantidad= 0;

	if(!accesosuser["VERFLUJODATOSCLIENTE"] || accesosuser["VERFLUJODATOSCLIENTE"]["accion"]!="SI"){
		$("table[id=divMenuFlujoDatosCliente]").remove();
	}
	 

		resultados += '<a class="list-group-item"  onclick="vercerrarSolicitarAnulacion()"><div class="row g-0 align-items-center">		<div class="col-2">			<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cancelacion.png" />		</div>		<div class="col-10">			<div class="text-dark">Solicitar Anulación de Venta</div>			<div class="text-muted small mt-1">Listado de Ventas para Anulacion, o Recuperados.</div>		</div>	</div></a>';
		cantidad++

	if( !accesosuser["VERBALANCEGENERAL"] || accesosuser["VERBALANCEGENERAL"]["accion"]!="SI") {
		$("table[id=divMenuBalanceGeneral]").remove();
		$("table[id=divMenuBalanceGeneralDirecto]").remove();
	} else {
		resultados += '<a class="list-group-item"   onclick="verCerrarBalanceGeneral()"><div class="row g-0 align-items-center">		<div class="col-2">			<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/BalanceGeneral.png" />		</div>		<div class="col-10">			<div class="text-dark">Balance general de gastos y cobranzas</div>			<div class="text-muted small mt-1"> infotme de los movimientos generales de gastos, depositos y cobranza</div>		</div>	</div></a>';
		cantidad++
	}
	
	if( !accesosuser["VERSECCIONPRINCIPALCOBRADOR"] || accesosuser["VERSECCIONPRINCIPALCOBRADOR"]["accion"]!="SI") {
		$("li[id=btncontenedorPrincipalCobranza]").remove();
	}
	
	if( !accesosuser["VERSECCIONPRINCIPALVENTAS"] || accesosuser["VERSECCIONPRINCIPALVENTAS"]["accion"]!="SI") {
		$("li[id=btncontenedorPrincipalVentas]").remove();
	}
	
		if( !accesosuser["VERCREDITOSAPROBAR"] || accesosuser["VERCREDITOSAPROBAR"]["accion"]!="SI") {
		$("table[id=divMenuCreditoAprobar]").remove();
	} else {
		resultados += '<a class="list-group-item"   onclick="vercerrarDashboardSocio()"><div class="row g-0 align-items-center">		<div class="col-2">	<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/informacion.png" />		</div><div class="col-10"><div class="text-dark">Creditos para aprobar</div>	<div class="text-muted small mt-1">lista de Solicitudes de credito para analizar </div>	</div>	</div></a>';
		cantidad++
	}
	
	if( !accesosuser["VERCALIFICACIONCOBRADOR"] || accesosuser["VERCALIFICACIONCOBRADOR"]["accion"]!="SI") {
		$("table[id=divMenuCalificacionCobrador]").remove();
	} else {
		resultados += '<a class="list-group-item"   onclick="verCerrarCalificacionCobrador()"><div class="row g-0 align-items-center">		<div class="col-2">	<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cal_cobrador.png" />		</div><div class="col-10"><div class="text-dark">Calificacion Cobrador</div>	<div class="text-muted small mt-1">Clasificar y analizar rendimiento de cobradores </div>	</div>	</div></a>';
		cantidad++
	}
	
	if( !accesosuser["VERRESUMENCOBRADOR"] || accesosuser["VERRESUMENCOBRADOR"]["accion"]!="SI") {
		$("table[id=divMenuResumenCobrador]").remove();
	} else {
		resultados += '<a class="list-group-item"   onclick="verCerrarAbmResumenCobrador()"><div class="row g-0 align-items-center">		<div class="col-2">	<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/pago-en-efectivo.png" />		</div><div class="col-10"><div class="text-dark">Cobranza</div>	<div class="text-muted small mt-1">Ver detalle recaudo de cada cobrador </div>	</div>	</div></a>';
		cantidad++
	}
		

	
	if( !accesosuser["VERGESTIONAREQUIFAX"] || accesosuser["VERGESTIONAREQUIFAX"]["accion"]!="SI") {
		$("table[id=divMenuVerificarEquifax1]").remove();
		$("table[id=divMenuVerificarEquifax2]").remove();
	} else {
		resultados += '<a class="list-group-item"   onclick="vercerrarVerificarEquifax()"><div class="row g-0 align-items-center"><div class="col-2">	<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/Equifax.png" />		</div><div class="col-10"><div class="text-dark">Gestionar Equifax</div>	<div class="text-muted small mt-1">Verificar informconf a solicitud de credito </div>	</div>	</div></a>';
		cantidad++
	}

	if (!accesosuser["VERBASEPOSITIVAEQUIFAX"] || accesosuser["VERBASEPOSITIVAEQUIFAX"]["accion"]!="SI") {
		$("table[id=divMenuEquifaxBasePositiva]").remove();
	} else {
		resultados += '<a class="list-group-item" onclick="verCerrarEquifaxBasePositiva()">'+
			'<div class="row g-0 align-items-center"><div class="col-2">'+
			'<img class="imgIconoMenu" style="width:40px" src="/GoodVentaElectroCasaMaric/iconos/Equifax.png" alt="Base Positiva" />'+
			'</div><div class="col-10"><div class="text-dark">Base Positiva Equifax</div>'+
			'<div class="text-muted small mt-1">Generar, enviar y controlar aportes de prestamos.</div></div></div></a>';
		cantidad++;
	}
	
	
		
	
	if( !accesosuser["VERLISTADOPARAMETROSOLICITUD"] || accesosuser["VERLISTADOPARAMETROSOLICITUD"]["accion"]!="SI") {
		$("table[id=divMenuAbmParametroSolicitud]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListaParametroSolicitud" onclick="verCerrarAbmParametroSolicitud()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/investigacion.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Parametro de Solicitud</div>'+
					'<div class="text-muted small mt-1">Agregar, editar y ver todos los parametros de aprobacion de credito.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
 

 

	if( !accesosuser["VERLISTADOREFERENCIACOMERCIAL"] || accesosuser["VERLISTADOREFERENCIACOMERCIAL"]["accion"]!="SI") {
		$("table[id=divMenuVerificarGestionarReferenciaCliente]").remove();
		$("table[id=divMenuVerificarGestionarReferenciaCliente2]").remove();
	} else {
		resultados += '<a class="list-group-item"  onclick="vercerrarVerificarGestionarReferencia()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/GestionarReferencia.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Gestionar Referencias</div>'+
					'<div class="text-muted small mt-1">Agregar y verificar Referencias personales.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERCARGAARCHIVOGENERAL"] || accesosuser["VERCARGAARCHIVOGENERAL"]["accion"]!="SI") {
		$("table[id=divMenuCargaArchivoGeneral]").remove();
	} else {
		resultados += '<a class="list-group-item"  onclick="verCerrarAbmCargaArchivoGeneral()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/adjunto-archivo.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Carga Archivo</div>'+
					'<div class="text-muted small mt-1">Sin descripcion</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERAGENDAPERSONAL"] || accesosuser["VERAGENDAPERSONAL"]["accion"]!="SI") {
		$("table[id=divMenuAgendaPersonal]").remove();
	} else {
		resultados += '<a class="list-group-item"  onclick="verCerrarAbmAgendaPersonal()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/computadora-portatil.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Agenda Personal</div>'+
					'<div class="text-muted small mt-1">Sin descripción</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	




	

	if( !accesosuser["VERLISTADODELOCALES"] || accesosuser["VERLISTADODELOCALES"]["accion"]!="SI") {
		$("table[id=divMenuAbmLocales]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListadolocales" onclick="verCerrarAbmCasa()"><div class="row g-0 align-items-center">		<div class="col-2">			<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/casa.png" />		</div>		<div class="col-10">			<div class="text-dark">Listado de locales</div>			<div class="text-muted small mt-1">Agregar, editar y listar todos los locales.</div>		</div>	</div></a>';
		cantidad++
	}
	if( !accesosuser["VERLISTADODEZONAS"] || accesosuser["VERLISTADODEZONAS"]["accion"]!="SI") {
		$("table[id=divMenuAbmZona]").remove();
		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListadozonas" onclick="verCerrarAbmZona()"><div class="row g-0 align-items-center">		<div class="col-2">			<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/zona.png" />		</div>		<div class="col-10">			<div class="text-dark">Listado de zonas</div>			<div class="text-muted small mt-1">Agregar, editar y listar todos los lugares cubiertos.</div>		</div>	</div></a>';
		cantidad++
	}
	if( !accesosuser["VERLISTADOCOBRADORES"] || accesosuser["VERLISTADOCOBRADORES"]["accion"]!="SI") {
		$("table[id=divMenuAbmCobradores]").remove();
		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListadocobradores" onclick="verCerrarAbmCobrador()">	<div class="row g-0 align-items-center">		<div class="col-2">			<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cobrador.png" />		</div>		<div class="col-10">			<div class="text-dark">Listado de cobradores</div>			<div class="text-muted small mt-1">Agregar, editar y listar todos los cobradores registrados.</div>		</div>	</div></a>';
		cantidad++
	}
	if( !accesosuser["VERLISTADODECLIENTES"] || accesosuser["VERLISTADODECLIENTES"]["accion"]!="SI") {
		$("table[id=divMenuAbmClientes]").remove();
		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListaclientes" onclick="verCerrarAbmClientes()">	<div class="row g-0 align-items-center">		<div class="col-2">			<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cliente.png" />		</div>		<div class="col-10">			<div class="text-dark">Lista de clientes</div>			<div class="text-muted small mt-1">Agregar, editar y listar todos los clientes registrados.</div>		</div>	</div></a>';
		cantidad++
	}
	if( !accesosuser["VERLISTADOPRODUCTOS"] || accesosuser["VERLISTADOPRODUCTOS"]["accion"]!="SI") {
		$("table[id=divMenuAbmProductos1]").remove();
		$("table[id=divMenuAbmProductos2]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListadoproductos" onclick="verCerrarAbmProducto()">	<div class="row g-0 align-items-center">		<div class="col-2">			<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/producto.png" />		</div>		<div class="col-10">			<div class="text-dark">Listado de productos</div>			<div class="text-muted small mt-1">Agregar, editar y listar todos los productos registrados.</div>		</div>	</div></a>';
		cantidad++
	}
	if( !accesosuser["VERLISTADOPROVEEDORES"] || accesosuser["VERLISTADOPROVEEDORES"]["accion"]!="SI") {
		$("table[id=divMenuAbmProveedores]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListaproveedores" onclick="verCerrarAbmProveedor()">'
		+	'<div class="row g-0 align-items-center">'
		+		'<div class="col-2">'
		+			'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/proveedores.png" />'
		+		'</div>'
		+		'<div class="col-10">'
		+			'<div class="text-dark">Lista de proveedores</div>'
		+			'<div class="text-muted small mt-1">Agregar, editar y listar todos los proveedores registrados.</div>'
		+		'</div>'
		+	'</div>'
		+'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOVENDEDORES"] || accesosuser["VERLISTADOVENDEDORES"]["accion"]!="SI") {
		$("table[id=divMenuAbmVendedores]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListavendedores" onclick="verCerrarAbmVendedor()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/vendedor.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Lista de vendedores</div>'+
					'<div class="text-muted small mt-1">Agregar, editar y ver todos los vendedores registrados.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}

	
	
	
	
	if( !accesosuser["VERLISTADODECAJA"] || accesosuser["VERLISTADODECAJA"]["accion"]!="SI") {
		$("table[id=divMenuAbmCajas]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListadocajas" onclick="verCerrarAbmCaja()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/caja.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Listado de cajas</div>'+
					'<div class="text-muted small mt-1">Listar, agregar y editar todas las cajas registradas en el sistema.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}	
	if( !accesosuser["VERFACTURASHABILITADAS"] || accesosuser["VERFACTURASHABILITADAS"]["accion"]!="SI") {
		$("table[id=divMenuAbmFacturas]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuFacturashabilitadas" onclick="verCerrarFrmNroFactura()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/numero.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Facturas habilitadas</div>'+
					'<div class="text-muted small mt-1">Listar, agregar y editar los numeros de facturas actuales.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOTIPOPAGO"] || accesosuser["VERLISTADOTIPOPAGO"]["accion"]!="SI") {
		$("table[id=divMenuAbmTipoVenta]").remove()
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListatipospago" onclick="verCerrarAbmTipoPago()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/tipocambio.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Lista de tipos de pago</div>'+
					'<div class="text-muted small mt-1">Agregar, editar y listar todos los tipos de pago habilitados.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADODEBANCOS"] || accesosuser["VERLISTADODEBANCOS"]["accion"]!="SI") {
		$("table[id=divMenuAbmBanco]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListabancos" onclick="verCerrarAbmBanco()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/banco.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Lista de bancos</div>'+
					'<div class="text-muted small mt-1">Agregar, editar y listar todos los bgancos registrados.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADODEMORACLIENTE"] || accesosuser["VERLISTADODEMORACLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuAbmMoraCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListatipomora" onclick="verCerrarAbmMoraCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/servicio-al-cliente.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Agregar, editar y listar los tipo de mora</div>'+
					'<div class="text-muted small mt-1">Lista de todos los tipos de mora que pueden haber.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADODEDOCUMENTOSCLIENTE"] || accesosuser["VERLISTADODEDOCUMENTOSCLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuAbmDocumentos]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuEntregapagare" onclick="verCerrarAbmDocumentosCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/documentos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Entrega de pagare</div>'+
					'<div class="text-muted small mt-1">Listar y editar todos los documentos a entregarle al cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if ( !accesosuser["VERLISTADODEDOCUMENTOSCLIENTE"] || accesosuser["VERLISTADODEDOCUMENTOSCLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuAbmDocumentosCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuEntregapagare" onclick="verCerrarAbmDocumentosCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/documentos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Entrega de pagare</div>'+
					'<div class="text-muted small mt-1">Lista de los tipos de documentos asociados al cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOCHEQUE"] || accesosuser["VERLISTADOCHEQUE"]["accion"]!="SI") {
		$("table[id=divMenuCheque]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCheques" onclick="verCerrarAbmCheque()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cheque.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cheques</div>'+
					'<div class="text-muted small mt-1">Agregar, editar y listar todos los cheques dados a los proveedores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	/* El acceso "Nuevos clientes" fue retirado del menu y del buscador global.
	 * Se conserva el formulario interno para mantener compatibilidad con
	 * procesos antiguos que pudieran invocarlo directamente. */

	if( !accesosuser["VERLISTADONUEVOSCARGO"] || accesosuser["VERLISTADONUEVOSCARGO"]["accion"]!="SI")
	{
		$("table[id=divMenuAbmCargoFuncionarios]").remove()
		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListacargos" onclick="verCerrarAbmCargoFuncionarios()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cargos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Lista de cargos</div>'+
					'<div class="text-muted small mt-1">Ver, agregar o editar todos los cargos en el sistema.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADONUEVOSFUNCIONARIO"] || accesosuser["VERLISTADONUEVOSFUNCIONARIO"]["accion"]!="SI")
	{
		$("table[id=divMenuAbmFuncionarios]").remove()
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListafuncionarios" onclick="verCerrarAbmFuncionarios()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/empleado.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Lista de funcionarios</div>'+
					'<div class="text-muted small mt-1">Ver y administrar todos los funcionarios y sus puestos respectivos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOVEHICULOS"] || accesosuser["VERLISTADOVEHICULOS"]["accion"]!="SI")
	{
		$("table[id=divMenuAbmVehiculos]").remove()		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuVeiculos" onclick="verCerrarAbmVehivulos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/camion.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Veiculos</div>'+
					'<div class="text-muted small mt-1">Ver y administrar todos los vehiculos de la empresa.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERDETALLEDATOSVEHICULOS"] || accesosuser["VERDETALLEDATOSVEHICULOS"]["accion"]!="SI")
	{
		$("table[id=divMenuDatosVehiculos]").remove()
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuDatosvehiculos" onclick="verCerrarDatosVehiculos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/Datoscamion.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Datos vehiculos</div>'+
					'<div class="text-muted small mt-1">Ver informacion resumida de todos los veiculos de la empresa.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOCATEGORIAPRECIOS"] || accesosuser["VERLISTADOCATEGORIAPRECIOS"]["accion"]!="SI")
	{
		$("table[id=divMenuAbmCategoriaPrecio]").remove()	
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCategoriaprecios" onclick="verCerrarAbmCategoriaPrecio()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/Listaprecios.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Categoria precios</div>'+
					'<div class="text-muted small mt-1">Lista de todas las categorias con un precio en comn asociados.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	/*MENU ADMINISTRATIVO*/
	if( !accesosuser["VERCARGADECOMPRAS"] || accesosuser["VERCARGADECOMPRAS"]["accion"]!="SI") {
		$("table[id=divMenuCompra1]").remove();
		$("table[id=divMenuCompra2]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCargarcompras" onclick="verCerrarAbmCompra()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/compra.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cargar compras</div>'+
					'<div class="text-muted small mt-1">Permite cargar las compras de mercaderia realizadas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCARGARSUELDO"] || accesosuser["VERCARGARSUELDO"]["accion"]!="SI") {
		$("table[id=divMenuAbmCargarSueldo]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCargarsueldo" onclick="verCerrarAbmSueldo()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/sueldo.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cargar sueldo</div>'+
					'<div class="text-muted small mt-1">Listar y editar los sueldos de los funcionarios.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCOBROSREALIZADOS"] || accesosuser["VERCOBROSREALIZADOS"]["accion"]!="SI") {
		$("table[id=divMenuCobrosRealizado1]").remove();
		$("table[id=divMenuCobrosRealizado2]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCobrosrealizados" onclick="verCerrarInformeArqueo()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/arqueo.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cobros realizados</div>'+
					'<div class="text-muted small mt-1">Lista de todos los cobros hechos a los clientes.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCUENTASACOBRAR"] || accesosuser["VERCUENTASACOBRAR"]["accion"]!="SI") {
		$("table[id=divMenuCuentasCobar1]").remove();
		$("table[id=divMenuCuentasCobar2]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCuentasacobrar" onclick="verCerrarCuentasACobrar()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cuantasacobra.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cuentas a cobrar</div>'+
					'<div class="text-muted small mt-1">Registrar pagos y ver lista de todas las cuentas pendientes a cobrar.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCUENTASAPAGAR"] || accesosuser["VERCUENTASAPAGAR"]["accion"]!="SI")
	{
		$("table[id=divMenuCuentasPagar]").remove()
		// controladministrativo=controladministrativo+1;		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCuentasapagar" onclick="verCerrarInformeCuentasAPagar(1)">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cuentasApagar.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cuentas a pagar</div>'+
					'<div class="text-muted small mt-1">Ver todas las cuentas a pagar y cargar pagos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCONSULTADECAJA"] || accesosuser["VERCONSULTADECAJA"]["accion"]!="SI") {
		$("table[id=divMenuConsultadeCaja]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuConsultacajas" onclick="verCerrarInformeConsultaCaja()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/informedecaja.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Consulta de cajas</div>'+
					'<div class="text-muted small mt-1">Registro de todas las cajas abiertas y cerradas con sus movimientos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOEGRESOINGRESO"] || accesosuser["VERLISTADOEGRESOINGRESO"]["accion"]!="SI") {
		$("table[id=divMenuEgreso_Ingreso]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuEgreso/ingreso" onclick="verCerrarAbmGasto()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/gastos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Egreso/ingreso</div>'+
					'<div class="text-muted small mt-1">Registrar, editar y listar de entradas y salidas de dinero.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOEGRESOINGRESOJUAN"] || accesosuser["VERLISTADOEGRESOINGRESOJUAN"]["accion"]!="SI") {
		$("table[id=divMenuEgreso_IngresoJuan]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuEgreso/ingreso" onclick="verCerrarAbmEgresoIngresoJuan()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/gastos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Egreso/ingreso Juan</div>'+
					'<div class="text-muted small mt-1">Registrar, editar y listar de entradas y salidas de dinero.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOEGRESOINGRESOADMINISTRATIVO"] || accesosuser["VERLISTADOEGRESOINGRESOADMINISTRATIVO"]["accion"]!="SI") {
		$("table[id=divMenuEgreso_IngresoAdministrativo]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuEgreso/ingreso" onclick="verCerrarAbmEgresoIngresoAdministrativo()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/gastos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Egreso/ingreso Administrativo</div>'+
					'<div class="text-muted small mt-1">Registrar, editar y listar de entradas y salidas de dinero.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VEREXPEDIENTEDELCLIENTE"] || accesosuser["VEREXPEDIENTEDELCLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuExpedienteCliente1]").remove();
		$("table[id=divMenuExpedienteCliente2]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuExpedientecliente" onclick="verCerrarInformeExpedientes()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/expedientes.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Expediente del cliente</div>'+
					'<div class="text-muted small mt-1">Historial de movimiento del cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERHISTORIALCOMPRA"] || accesosuser["VERHISTORIALCOMPRA"]["accion"]!="SI") {
		$("table[id=divMenuHistorialCompra]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuHistorialcompras" onclick="verCerrarHistorialCompra()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/historialcompra.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Historial de compras</div>'+
					'<div class="text-muted small mt-1">Historial de todas las compras realizadas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERHISTORIALVENTA"] || accesosuser["VERHISTORIALVENTA"]["accion"]!="SI") {
		$("table[id=divMenuHistorialVenta1]").remove();
		$("table[id=divMenuHistorialVenta2]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuHistorialventa" onclick="verCerrarHistorialVenta()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/dinero.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Historial de venta</div>'+
					'<div class="text-muted small mt-1">Lista de todas las ventas realizadas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEGARANTIA"] || accesosuser["VERINFORMEGARANTIA"]["accion"]!="SI") {
		$("table[id=divMenuProductosGarantia]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuProductosengarantia" onclick="verCerrarInformeProductoEnGarantia(1)">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/garantia.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Productos en garantia</div>'+
					'<div class="text-muted small mt-1">Lista de todos los servicios de garantia reclamados.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["HACERDESPACHO"] || accesosuser["HACERDESPACHO"]["accion"]!="SI") {
		$("table[id=divMenuListadoDespachado]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuDespacharproductos" onclick="verCerrarAbmListadoDespacho(1)">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/paquete.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Despachar productos</div>'+
					'<div class="text-muted small mt-1">Despachar Productos a otro local.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCONTROLDEPOSITO"] || accesosuser["VERCONTROLDEPOSITO"]["accion"]!="SI") {
		$("table[id=divMenuControlDeposito]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuControldeposito" onclick="verCerrarAbmSalidadDeposito(\'1\')">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/deposito.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Control de deposito</div>'+
					'<div class="text-muted small mt-1">Ver y modificar cantidades de productos registrados en el deposito.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECLIENTESNUEVOS"] || accesosuser["VERINFORMECLIENTESNUEVOS"]["accion"]!="SI") {
		$("table[id=divMenuClientesNuevos]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuControldeposito" onclick="verCerrarInformeClientesNuevos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe clientes nuevos</div>'+
					'<div class="text-muted small mt-1">Buscar clinetes nuevos o ver cantidad de ventas por cliente y fecha</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERICONOCHEQUE"] || accesosuser["VERICONOCHEQUE"]["accion"]!="SI")
	{
		$("table[id=divMenuCheque]").remove()
		// controladministrativo=controladministrativo+1;		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCheque" onclick="verCerrarAbmCheque()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cheque.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cheque</div>'+
					'<div class="text-muted small mt-1">Listado de todos los cheques a pagar.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERSOLICITUCREDITO"] || accesosuser["VERSOLICITUCREDITO"]["accion"]!="SI") {
		$("table[id=divMenuSolicitudCredito]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuSolicitudcredito" onclick="verCerrarAbmsolicotud()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/solicitudCredito.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Solicitud de credito</div>'+
					'<div class="text-muted small mt-1">Ver, agregar, editar y eliminar las solicitudes de credito.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERGENERARPRESUPUESTO"] || accesosuser["VERGENERARPRESUPUESTO"]["accion"]!="SI") {
		$("table[id=divMenuPresupuestoProducto]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuGenerarpresupuestos" onclick="verCerrarAbmDetallesPresupuesto(\'1\')">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/presupuesto.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Generar presupuestos</div>'+
					'<div class="text-muted small mt-1">Generar e imprimir presupuestos con los productos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERAGENDA"] || accesosuser["VERAGENDA"]["accion"]!="SI") {
		$("table[id=divMenuAgenda]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuAgenda" onclick="verCerrarAbmAgenda()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/agenda.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Agenda</div>'+
					'<div class="text-muted small mt-1">Agregar, editar y ver fechas agendadas con clientes.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCARGARFOTOSCLIENTE"] || accesosuser["VERCARGARFOTOSCLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuImagenesCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCargarimagenes" onclick="verCerrarAbmCargarFotosClientePrincipal(\'1\')">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/imagenes.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cargar imagenes</div>'+
					'<div class="text-muted small mt-1">Ver y cargar imagenes del cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCAJAAPP"] || accesosuser["VERCAJAAPP"]["accion"]!="SI") {
		$("table[id=divMenuApp]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCajaapp" onclick="verCerrarFrmCajaApp()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/app.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Caja app</div>'+
					'<div class="text-muted small mt-1">Ver y reclamar las cajas de la aplicacion de cobradores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERPAGOPROVEEDOR"] || accesosuser["VERPAGOPROVEEDOR"]["accion"]!="SI") {
		$("table[id=divMenuPagoProveedor]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuPagoproveedor" onclick="verCerrarAbmPagoProveedor()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cheque.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Pago proveedor</div>'+
					'<div class="text-muted small mt-1">Listar, gestionar y ver todos los pagos a los proveedores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERREVISIONDOCUMENTOS"] || accesosuser["VERREVISIONDOCUMENTOS"]["accion"]!="SI") {
		$("table[id=divMenuRevisionDocumentos]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuRevisiondocumentos" onclick="verCerrarRevisionDocumentos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/documentos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Revision de documentos</div>'+
					'<div class="text-muted small mt-1">Ver y revisar todos los documentos asociados a una venta.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERREVISIONDOCUMENTOSCLIENTE"] || accesosuser["VERREVISIONDOCUMENTOSCLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuRevisionDocumentosCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuRevisionentregapagare" onclick="verCerrarRevisionDocumentosCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/documentos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Revision de entrega pagare</div>'+
					'<div class="text-muted small mt-1">Lista de todos los pagares y sus movimientos asociados a un cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERCALCULADORADEPRECIOS"] || accesosuser["VERCALCULADORADEPRECIOS"]["accion"]!="SI") {
		$("table[id=divMenuCalculadoraPrecio]").remove();
	} else {
		resultados += '<a class="list-group-item" onclick="verCerrarCalculadoraPrecio()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/calculadora.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Calculadora de Precios</div>'+
					'<div class="text-muted small mt-1">Calcular los precios segun la categoria</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERINFORMEDEEGRESOINGRESOCOBRADORES"] || accesosuser["VERINFORMEDEEGRESOINGRESOCOBRADORES"]["accion"]!="SI") {
		$("table[id=divMenuInformeEgresoIngresoCobradores]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuIngreso/egresocobradores" onclick="verCerrarInformeEgresoIngresoCobradores()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cobradores.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Ingreso/egreso cobradores</div>'+
					'<div class="text-muted small mt-1">Buscar e imprimir todos los movimientos de los cobradores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["CARGARARCHIVOSCLIENTE"] || accesosuser["CARGARARCHIVOSCLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuArchivosCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCargarpdf" onclick="verCerrarAbmCargarArchivosCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/pdf.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cargar pdf</div>'+
					'<div class="text-muted small mt-1">Cargar documentos asociados a un cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERMIGRARCAJA"] || accesosuser["VERMIGRARCAJA"]["accion"]!="SI") {
		$("table[id=divMenuMigrarCaja]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuMigrarcaja" onclick="verCerrarAbmMigrarCaja()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/transferir.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Migrar caja</div>'+
					'<div class="text-muted small mt-1">Listado de solicitudes para intercambios entre cajas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERRECIBIRCAJA"] || accesosuser["VERRECIBIRCAJA"]["accion"]!="SI") {
		$("table[id=divMenuRecibirCaja]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuRecibircaja" onclick="verCerrarFrmCajaEscritorio()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/recibirdinero.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Recibir caja</div>'+
					'<div class="text-muted small mt-1">Ver y aceptar el recibimiento de transacciones de otras cajas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERMOVIMIENTOSTOCK"] || accesosuser["VERMOVIMIENTOSTOCK"]["accion"]!="SI") {
		$("table[id=divMenuMovimientoStock]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuMovimientostock" onclick="verCerrarMovimientoStock()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/valores.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Movimiento stock</div>'+
					'<div class="text-muted small mt-1">Historial de movimientos de los productos, ya sea de entrada o salida, compra o venta.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMCONF"] || accesosuser["VERINFORMCONF"]["accion"]!="SI") {
		$("table[id=divMenuInformconf]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformconf" onclick="verCerrarAbmInformconf()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/deuda.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informconf</div>'+
					'<div class="text-muted small mt-1">Listae, agrear o editar clientes que estan en informconf.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;		
	}
	
	if( !accesosuser["VERCALLCENTER"] || accesosuser["VERCALLCENTER"]["accion"]!="SI") {
		$("table[id=divMenuListadoCallCenter]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCallcenter" onclick="verCerrarListadoCallCenter()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/telefono.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Callcenter</div>'+
					'<div class="text-muted small mt-1">Registros, agendamientos y funciones de callCenter generales.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERCARGARLIQUIDEZ"] || accesosuser["VERCARGARLIQUIDEZ"]["accion"]!="SI") {
		$("table[id=divMenuAbmLiquidez]").remove();
	} else {
		resultados += '<a class="list-group-item" onclick="verCerrarAbmLiquidez()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/liquidez.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Liquidez</div>'+
					'<div class="text-muted small mt-1">Cargar liquidez de la empresa.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}

	if(!tieneAccesoMenuEmpresa("VERPATRIMONIOEMPRESA")) {
		$("table[id=divMenuAbmPatrimonioEmpresa]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuPatrimonioEmpresa" onclick="verCerrarAbmPatrimonioEmpresa()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/valores.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Patrimonio Empresa</div>'+
					'<div class="text-muted small mt-1">Registrar activos, pasivos y patrimonio de la empresa.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}

	if(!tieneAccesoMenuEmpresa("VERGASTOSFIJOSEMPRESA")) {
		$("table[id=divMenuAbmGastosFijosEmpresa]").remove();
		$("table[id=divMenuAbmGastosFijosEmpresaDirecto]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuGastosFijosEmpresa" onclick="verCerrarAbmGastosFijosEmpresa()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/gastos.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Gastos Fijos Empresa</div>'+
					'<div class="text-muted small mt-1">Registrar gastos fijos para calcular obligaciones de la empresa.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERSOLICITUDDESPACHO"] || accesosuser["VERSOLICITUDDESPACHO"]["accion"]!="SI") {
		$("table[id=divMenuListadoSoliicitudDespacho]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuSolicituddespacho" onclick="verCerrarListadoSolicitudDespacho()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/despacho.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Solicitud despacho</div>'+
					'<div class="text-muted small mt-1">Listar y aceptar solicitudes de despacho.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;	
	}
	
	if( !accesosuser["VERCALLCENTERVENTAS"] || accesosuser["VERCALLCENTERVENTAS"]["accion"]!="SI") {
		$("table[id=divMenuListadoCallCenterVentas]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCallcenterventas" onclick="verCerrarAbmCallCenterVenta()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/carrito-de-compras.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Callcenter ventas</div>'+
					'<div class="text-muted small mt-1">Ver, agendar y editar registros de llamadas para ventas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOMETASCOBRADORES"] || accesosuser["VERLISTADOMETASCOBRADORES"]["accion"]!="SI") {
		$("table[id=divMenuListadoMetasCobrador]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuMetascobradores" onclick="verCerrarAbmMetasCobrador(\'1\')">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/ganador.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Metas cobradores</div>'+
					'<div class="text-muted small mt-1">Ver, editar y/o asignar metas a los cobradores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADONUEVOSFUNCIONARIO"] || accesosuser["VERLISTADONUEVOSFUNCIONARIO"]["accion"]!="SI")
	{
		$("table[id=divMenuAbmFuncionarios]").remove()
		// controladministrativo=controladministrativo+1;		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListafuncionarios" onclick="verCerrarAbmFuncionarios()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/empleado.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Lista de funcionarios</div>'+
					'<div class="text-muted small mt-1">Administrar, agregar y asignar a los funcionarios a sus puestos correspondientes.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["CALCULOSALARIOFUNCIONARIO"] || accesosuser["CALCULOSALARIOFUNCIONARIO"]["accion"]!="SI")
	{
		$("table[id=divMenuCalculoSalarioFuncionario]").remove()
		// controladministrativo=controladministrativo+1;		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCalculosalariofuncionarios" onclick="verCerrarCalcularSalarioFuncionarios()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/pagosalario.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Calculo salario funcionarios</div>'+
					'<div class="text-muted small mt-1">Informe de todos los salarios de cada funcionario.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADODEMENSAJES"] || accesosuser["VERLISTADODEMENSAJES"]["accion"]!="SI") {
		$("table[id=divMenuAbmMensajes]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListamensajes" onclick="verCerrarAbmMensajes()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/enviando.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Lista de mensajes</div>'+
					'<div class="text-muted small mt-1">Listado de todos los mensajes enviados y pendientes.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADOADMINLOCALES"] || accesosuser["VERLISTADOADMINLOCALES"]["accion"]!="SI") {
		$("table[id=divMenuAdminLocales]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuAdministracionlocales" onclick="verCerrarAbmAdminLocales()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/red.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Administracion locales</div>'+
					'<div class="text-muted small mt-1">Agrupar o separar varios locales como uno solo.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERCLIENTESTRABAJADOS"] || accesosuser["VERCLIENTESTRABAJADOS"]["accion"]!="SI") {
		$("table[id=divMenuClientesTrabajados]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuClientesTrabajados" onclick="vercerrarClientesTrabajados()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/audiencia.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Clientes Trabajados</div>'+
					'<div class="text-muted small mt-1">Sin descripción</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERCLIENTEINFORMCONF"] || accesosuser["VERCLIENTEINFORMCONF"]["accion"]!="SI") {
		$("table[id=divMenuClienteParaInforconf]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuClientesTrabajados" onclick="verCerrarClienteParaInforconf()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/inforconf.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Clientes para Informconf</div>'+
					'<div class="text-muted small mt-1">Generar excel para inforconf</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERSTOCKMINIMOPRODUCTO"] || accesosuser["VERSTOCKMINIMOPRODUCTO"]["accion"]!="SI") {
		$("table[id=divMenuStockMinimoProducto]").remove();
	} else {
		resultados += '<a class="list-group-item"  onclick="verCerrarStockMinimoProducto()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/stock_minimo.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Clientes para Informconf</div>'+
					'<div class="text-muted small mt-1">Modificar Stock minimo de productos por local</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERCALIFICACIONENTREGA"] || accesosuser["VERCALIFICACIONENTREGA"]["accion"]!="SI") {
		$("table[id=divMenuCalificacionEntrega]").remove();
	} else {
		resultados += '<a class="list-group-item"  onclick="verCerrarAbmCalificacionEntrega()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/clasificacion.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Calificacion de Entrega</div>'+
					'<div class="text-muted small mt-1">Calificar la entrega de los cobradores</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERLISTADOCHEQUEACOBRAR"] || accesosuser["VERLISTADOCHEQUEACOBRAR"]["accion"]!="SI") {
		$("table[id=divMenuChequeACobrar]").remove();
	} else {
		resultados += '<a class="list-group-item"  onclick="verCerrarAbmChequeACobrar()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/libro-de-cheques.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cheque a Cobrar</div>'+
					'<div class="text-muted small mt-1">Formularios para cargar cheques a cobrar</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERINFORMEGENERALCUENTASCLIENTE"] || accesosuser["VERINFORMEGENERALCUENTASCLIENTE"]["accion"]!="SI") {
		$("table[id=divMenuInformeGeneralCuentasCliente]").remove();
	} else {
		resultados += '<a class="list-group-item"  onclick="vercerrarInformeGeneralCuentasCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/impuesto.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cuentas General Cliente</div>'+
					'<div class="text-muted small mt-1">Informe para consultar cuentas del cliente</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}

	/*MENU INFORME*/
	if (!accesosuser["VERINFORMEMANTENIMIENTOVEHICULOS"] || accesosuser["VERINFORMEMANTENIMIENTOVEHICULOS"]["accion"]!="SI") {
		$("table[id=divMenuInformeMantenimientoVehivulos]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformemantenimientovehiculo" onclick="verCerrarInformeMantenimientoVehivulos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe mantenimiento vehiculo</div>'+
					'<div class="text-muted small mt-1">Historial de todos los mantenimientos realizados al vehiculo.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMECODIGOBARRA"] || accesosuser["VERINFORMECODIGOBARRA"]["accion"]!="SI") {
		$("table[id=divMenuCodigoBarra]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeImprimirprecios" onclick="verCerrarInformeCodBarra()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Imprimir precios</div>'+
					'<div class="text-muted small mt-1">Imprimir el listado de todos los productos y sus precios.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMECUENTAGENERAL"] || accesosuser["VERINFORMECUENTAGENERAL"]["accion"]!="SI") {
		$("table[id=divMenuCuentasGeneral]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeGeneralcuentas" onclick="verCerrarCuentasACobrarInforme()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe General de cuentas</div>'+
					'<div class="text-muted small mt-1">Historial de todas las cuentas pendientes divididos por productos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEEVALUACION"] || accesosuser["VERINFORMEEVALUACION"]["accion"]!="SI") {
		$("table[id=divMenuInformeEvaluacion]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeEvaluacion" onclick="verCerrarInformeDeEvaluacion()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe Evaluacion</div>'+
					'<div class="text-muted small mt-1">Historial de todas las transferencias y depositos hecha.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDEINVENTARIO"] || accesosuser["VERINFORMEDEINVENTARIO"]["accion"]!="SI") {
		$("table[id=divMenuInformeInventario]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDeinventario" onclick="verCerrarInformeInventario()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De inventario</div>'+
					'<div class="text-muted small mt-1">Listado de todos los productos cargados en el sistema y su cantidad en inventario.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDESTOCK"] || accesosuser["VERINFORMEDESTOCK"]["accion"]!="SI") {
		$("table[id=divMenuInformeStock]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDestock" onclick="verCerrarInformeStock()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De stock</div>'+
					'<div class="text-muted small mt-1">Listado de todos los productos asociados a una sucursal especifica.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDEGANANCIAPORVENTA"] || accesosuser["VERINFORMEDEGANANCIAPORVENTA"]["accion"]!="SI") {
		$("table[id=divMenuInformeGanPorVenta]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDegananciaporventa" onclick="verCerrarInformeGananciasVentas()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De ganancia por venta</div>'+
					'<div class="text-muted small mt-1">Historial de todas las ventas, sus costos totales y ganancias totales.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDEPRODUCTOSCOMPRADOS"] || accesosuser["VERINFORMEDEPRODUCTOSCOMPRADOS"]["accion"]!="SI") {
		$("table[id=divMenuProductosComprados]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDeproductoscomprados" onclick="verCerrarInformeProductosComprados()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De productos comprados</div>'+
					'<div class="text-muted small mt-1">Historial de todas las compras de productos y sus costos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDEPRODUCTOSVENDIDOS"] || accesosuser["VERINFORMEDEPRODUCTOSVENDIDOS"]["accion"]!="SI") {
		$("table[id=divMenuProductosVendidos]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDeproductosvendidos" onclick="verCerrarInformeProductosVendidos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De productos vendidos</div>'+
					'<div class="text-muted small mt-1">Historial de todos los productos vendididos y sus cantidades.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDEPRODUCTOSNOVENDIDOS"] || accesosuser["VERINFORMEDEPRODUCTOSNOVENDIDOS"]["accion"]!="SI") {
		$("table[id=divMenuProductosNoVendidos]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDeproductosnovendidos" onclick="verCerrarInformeProductosNoVendidos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De productos no vendidos</div>'+
					'<div class="text-muted small mt-1">Historial de todos los productos no vendidos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDEVENTASCANCELADAS"] || accesosuser["VERINFORMEDEVENTASCANCELADAS"]["accion"]!="SI") {
		$("table[id=divMenuVentasCanceladas]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDeventascanceladas" onclick="verCerrarInformeVentasCanceladas()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De ventas anuladas</div>'+
					'<div class="text-muted small mt-1">Historial de todas las ventas anuladas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDECOMISIONCOBRADOR"] || accesosuser["VERINFORMEDECOMISIONCOBRADOR"]["accion"]!="SI") {
		$("table[id=divMenuComisionCobrador]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDecomisioncobrador" onclick="verCerrarInformeComisionCobrador()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De comision cobrador</div>'+
					'<div class="text-muted small mt-1">Historial de todas las comisiones de cobradores asociados a cada venta.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDECOMISIONVENDEDOR"] || accesosuser["VERINFORMEDECOMISIONVENDEDOR"]["accion"]!="SI") {
		$("table[id=divMenuComisionVendedor]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDevendedores" onclick="verCerrarInformeComisionVendedor()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De vendedores</div>'+
					'<div class="text-muted small mt-1">Historial de todas las comisiones de los vendedores asociadas a una venta.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERINFORMEDEPAGOSELIMINADOS"] || accesosuser["VERINFORMEDEPAGOSELIMINADOS"]["accion"]!="SI") {
		$("table[id=divMenuPagosEliminados]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDepagoseliminados" onclick="verCerrarInformePagosEliminados()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De pagos eliminados</div>'+
					'<div class="text-muted small mt-1">Historial de todos los pagos eliminados.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if (!accesosuser["VERCATALOGO"] || accesosuser["VERCATALOGO"]["accion"]!="SI") {
		$("table[id=divMenuCatalogo]").remove();
		$("table[id=divMenuCatalogo2]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDecatalogo" onclick="verCerrarInformeCatalogo()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De catalogo</div>'+
					'<div class="text-muted small mt-1">Lista de todos los productos disponible en formato de catalogo.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERCLIENTESINACTIVOS"] || accesosuser["VERCLIENTESINACTIVOS"]["accion"]!="SI")
	{
		$("table[id=divMenuClientesInactivo]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeDeclientesinactivos" onclick="vercerrarclientesinactivos(1)">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe De clientes inactivos</div>'+
					'<div class="text-muted small mt-1">Listado de todos los clientes que dejaron de comprar.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERDESPACHADOS"] || accesosuser["VERDESPACHADOS"]["accion"]!="SI")
	{
		$("table[id=divMenuProductoDespachado]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuProductosdespachados" onclick="verCerrarInformeProductosDespachados(1)">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Productos despachados</div>'+
					'<div class="text-muted small mt-1">Historial de transporte o movimientos de productos entre locales.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDECOMPRASELIMINADO"] || accesosuser["VERINFORMEDECOMPRASELIMINADO"]["accion"]!="SI")
	{
		$("table[id=divMenuComprasEliminados]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformecompraseliminadas" onclick="verCerrarInformeComprasEliminados()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de compras eliminadas</div>'+
					'<div class="text-muted small mt-1">Historial de todas las compras eliminadas y sus motivos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEMOROSO"] || accesosuser["VERINFORMEMOROSO"]["accion"]!="SI")
	{
		$("table[id=divMenuClienteMoroso]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuClientesmorosos" onclick="verCerrarInformeClieteMorosos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Clientes morosos</div>'+
					'<div class="text-muted small mt-1">Historial de todos los clientes con retraso en sus pagos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDEMETAS"] || accesosuser["VERINFORMEDEMETAS"]["accion"]!="SI")
	{
		$("table[id=divMenuMetasVendedores]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformemetasvendedores" onclick="verCerrarInformeMetasVendedores()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe metas vendedores</div>'+
					'<div class="text-muted small mt-1">Ver y gestionar las metas de los vendedores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERAUDITORIAPRODUCTO"] || accesosuser["VERAUDITORIAPRODUCTO"]["accion"]!="SI")
	{
		$("table[id=divMenuAuditoriaProducto]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuAuditoriaproducto" onclick="verCerrarInformeAudiProducto()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Auditoria producto</div>'+
					'<div class="text-muted small mt-1">Listado para ver la auditoria de los productos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECUMPLECLIENTE"] || accesosuser["VERINFORMECUMPLECLIENTE"]["accion"]!="SI")
	{
		$("table[id=divMenuCumpleCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCumpleañosclientes" onclick="verCerrarInformeCumpleCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cumpleaños clientes</div>'+
					'<div class="text-muted small mt-1">Ver los cumpleaños de los clientes, enviar mensajes por cumpleaños o programar combos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECLIENTEIMPAGO"] || accesosuser["VERINFORMECLIENTEIMPAGO"]["accion"]!="SI")
	{
		$("table[id=divMenuClieteImpago]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuAgendaclientes" onclick="verCerrarInformeClieteImpago()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Agenda clientes</div>'+
					'<div class="text-muted small mt-1">Ver visitas reagendadas y sus motivos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECLIENTEFIEL"] || accesosuser["VERINFORMECLIENTEFIEL"]["accion"]!="SI")
	{
		$("table[id=divMenuClienteFiel]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuClientesfieles" onclick="verCerrarInformeClienteFiel()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Clientes fieles</div>'+
					'<div class="text-muted small mt-1">Listado de todos los clientes con un buen historial de pago.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMESOLICITUDESCUENTO"] || accesosuser["VERINFORMESOLICITUDESCUENTO"]["accion"]!="SI")
	{
		$("table[id=divMenuSoliDescuento]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformesolicituddescuento" onclick="verCerrarInformeSoliDescuento()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de solicitud de descuento</div>'+
					'<div class="text-muted small mt-1">Historial de todas las solicitudes de descuento.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERINFORMECONTABILIDAD"] || accesosuser["VERINFORMECONTABILIDAD"]["accion"]!="SI")
	{
		$("table[id=divMenuContabilidad]").remove()
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuContabilidad-venta" onclick="verCerrarInformeContabilidad()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Contabilidad - venta</div>'+
					'<div class="text-muted small mt-1">Informe contable de cada vendedor.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERINFOMRECONTABILIDADCOMPRA"] || accesosuser["VERINFOMRECONTABILIDADCOMPRA"]["accion"]!="SI")
	{
		$("table[id=divMenuContabilidadCompra]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuContabilidad-compra" onclick="verCerrarInformeContabilidadCompra()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Contabilidad - compra</div>'+
					'<div class="text-muted small mt-1">Historial contable de todas las compras de productos a proveedores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECUENTASCLIENTEMOROSO"] || accesosuser["VERINFORMECUENTASCLIENTEMOROSO"]["accion"]!="SI")
	{
		$("table[id=divMenuCuentasClienteMoroso]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuClasificacionmorosos" onclick="verCerrarCuentasClienteMoroso()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Clasificacion morosos</div>'+
					'<div class="text-muted small mt-1">Listado de morosos de acuerdo a su clasificacion.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDOCUMENTOSENTREGADOS"] || accesosuser["VERINFORMEDOCUMENTOSENTREGADOS"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeDocumentosEntregados]").remove()
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformedocumentosentregados" onclick="verCerrarInformeDocumentosEntregados()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de documentos entregados</div>'+
					'<div class="text-muted small mt-1">Historial de todos los documentos entregados al cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEGENERALCREDITOS"] || accesosuser["VERINFORMEGENERALCREDITOS"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeCredito]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformegeneralcreditos" onclick="verCerrarInformedeCreditos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe general de creditos</div>'+
					'<div class="text-muted small mt-1">Historial de todos los creditos otorgados y sus respectivos estados.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEGRALPRODUCTOS"] || accesosuser["VERINFORMEGRALPRODUCTOS"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeGralProductos]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformegral.productos" onclick="verCerrarInformeGralProductos()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe gral. productos</div>'+
					'<div class="text-muted small mt-1">Informe resumido de todos los productos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDEPOSITO"] || accesosuser["VERINFORMEDEPOSITO"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeDeposito]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformedeposito" onclick="verCerrarInformeDeposito()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de deposito</div>'+
					'<div class="text-muted small mt-1">Historial de todos los informes de productos en el deposito hechos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDOCUMENTOSENTREGADOSCLIENTE"] || accesosuser["VERINFORMEDOCUMENTOSENTREGADOSCLIENTE"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeDocumentosEntregadosCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeentregapagare" onclick="verCerrarInformeDocumentosEntregadosCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de entrega de pagare</div>'+
					'<div class="text-muted small mt-1">Historial de todos los pagares entregados a los clientes.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERINFORMEDEINFORMCONF"] || accesosuser["VERINFORMEDEINFORMCONF"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeInformconf]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeinformconf" onclick="verCerrarInformeInformconf()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de informconf</div>'+
					'<div class="text-muted small mt-1">Listado de todos los clientes con deudas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDESCUENTOINTERES"] || accesosuser["VERINFORMEDESCUENTOINTERES"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeSoliDescuentoInteres]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformesolicituddescuentointeres" onclick="verCerrarInformeSolicitudDescuentoInteres()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe solicitud de descuento interes</div>'+
					'<div class="text-muted small mt-1">Historial de todas las solicitudes de descuentos de interes en cuotas especificas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMESOLICITUDCREDITO"] || accesosuser["VERINFORMESOLICITUDCREDITO"]["accion"]!="SI")
	{
		$("table[id=divMenuSoliCredito]").remove()
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformesolicitudescredito" onclick="verCerrarInformeSoliCredito()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de solicitudes de credito</div>'+
					'<div class="text-muted small mt-1">Historial de todas las solicitudes de credito realizadas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEMOVIMIENTOSTOCK"] || accesosuser["VERINFORMEMOVIMIENTOSTOCK"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeMovimientoStock]").remove()
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformemovimientostock" onclick="verCerrarInformeMovimientoStock()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe movimiento stock</div>'+
					'<div class="text-muted small mt-1">Historial de todos los movimientos de cada producto.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEUBICACIONESCLIENTE"] || accesosuser["VERINFORMEUBICACIONESCLIENTE"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeFotosCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformeubicacionescliente" onclick="verCerrarInformeFotosCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe ubicaciones cliente</div>'+
					'<div class="text-muted small mt-1">Historial de todos los documentos y las ubicaciones del cliente.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMETAREASCOBRADOR"] || accesosuser["VERINFORMETAREASCOBRADOR"]["accion"]!="SI")
	{
		$("table[id=divMenuTareasCobrador]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformetareascobrador" onclick="verCerrarTareasCobrador()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe tareas de cobrador</div>'+
					'<div class="text-muted small mt-1">Listado de todas las tareas asignadas a cada cobrador.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECALLCENTER"] || accesosuser["VERINFORMECALLCENTER"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeCallCenter]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformecallcenter" onclick="verCerrarInformeCallCenter()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe callcenter</div>'+
					'<div class="text-muted small mt-1">Historial de comunicaciones con el cliente para cobros.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECALLCENTERVENTA"] || accesosuser["VERINFORMECALLCENTERVENTA"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeCallCenterVenta]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformecallcenterventas" onclick="verCerrarInformeCallCenterVenta()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe callcenter ventas</div>'+
					'<div class="text-muted small mt-1">Historial de todas las comunicaciones con el cliente para las ventas.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDEUDACLIENTE"] || accesosuser["VERINFORMEDEUDACLIENTE"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeDeudaCliente]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformedeudasclientes" onclick="verCerrarInformeDeudaCliente()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe deudas clientes</div>'+
					'<div class="text-muted small mt-1">Historial de todas las deudas de los clientes.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEDESCUENTOCREDITO"] || accesosuser["VERINFORMEDESCUENTOCREDITO"]["accion"]!="SI")
	{
		$("table[id=divMenuSolicitudDescuentoCredito]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformesolicituddescuentocredito" onclick="verCerrarInformeSolicitudDescuentoCredito()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe solicitud de descuento credito</div>'+
					'<div class="text-muted small mt-1">Historial de todas las solicitudes de descuento de ventas a credito.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMECAJACOBRADOR"] || accesosuser["VERINFORMECAJACOBRADOR"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeCajaCobrador]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuInformecajacobrador" onclick="verCerrarInformeCajaCobrador()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe caja cobrador</div>'+
					'<div class="text-muted small mt-1">Listado de todas las cajas de los cobradores y sus montos respectivos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERINFORMEPAGOSAPROVEEDOR"] || accesosuser["VERINFORMEPAGOSAPROVEEDOR"]["accion"]!="SI")
	{
		$("table[id=divMenuInformePagosAProveedor]").remove();
	} else {
		resultados += '<a class="list-group-item" onclick="verCerrarInformePagosAProveedor()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe Pagos a Proveedor</div>'+
					'<div class="text-muted small mt-1">Listado de pagos a proveedores</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	if( !accesosuser["VERINFORMECLIENTESTRABAJADOS"] || accesosuser["VERINFORMECLIENTESTRABAJADOS"]["accion"]!="SI")
	{
		$("table[id=divMenuInformeClientesTrabajados]").remove();
	} else {
		resultados += '<a class="list-group-item" onclick="verCerrarInformeClientesTrabajados()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Informe de Clientes Trabajados</div>'+
					'<div class="text-muted small mt-1"></div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}

	/*SISTEMA*/
	if( !accesosuser["VERLISTADOUSUARIO"] || accesosuser["VERLISTADOUSUARIO"]["accion"]!="SI") {
		$("table[id=divMenuAbmUsuarios]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuUsuarios" onclick="verCerrarAbmUsuarios()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/usuariosacceso.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Usuarios</div>'+
					'<div class="text-muted small mt-1">Ver, agregar y administrar usuarios, asignar permisos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADODEACCESO"] || accesosuser["VERLISTADODEACCESO"]["accion"]!="SI") {
		$("table[id=divMenuListadoAcceso]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListadoacceso" onclick="verCerrarFrmListaAccesos(1)">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/desbloquear.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Listado de acceso</div>'+
					'<div class="text-muted small mt-1">Ver, agregar y administrar los permisos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERLISTADODENIVELES"] || accesosuser["VERLISTADODENIVELES"]["accion"]!="SI") {
		$("table[id=divMenuListadoNiveles]").remove();
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuListadoniveles" onclick="verCerrarFrmListaNiveles(1)">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/nivelesacceso.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Listado de niveles</div>'+
					'<div class="text-muted small mt-1">Ver, agregar y administrar los distintos roles y sus permisos.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERCERRARCAJA"] || accesosuser["VERCERRARCAJA"]["accion"]!="SI")
	{
		document.getElementById("divMenuArqueo").style.display='none'		
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuCerrarcaja" onclick="verCerrarVentanaAbmAperturaCierreCaja()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/cierredecaja.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Cerrar caja</div>'+
					'<div class="text-muted small mt-1">Indicar la aertura y cierre de caja.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERVENTA"] || accesosuser["VERVENTA"]["accion"]!="SI") {
		document.getElementById("divMenuVenta").style.display='none';
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuNuevaventa" onclick="verCerrarAbmVenta()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/venta.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Nueva venta</div>'+
					'<div class="text-muted small mt-1">Realizar una nueva venta, ver ventas anteriores.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	if( !accesosuser["VERHISTORIALDB"] || accesosuser["VERHISTORIALDB"]["accion"]!="SI") {
		document.getElementById("divMenuHistorialDescargaBD").style.display='none';
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuRespaldo" onclick="verCerrarHistorialDescargaBD()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/respaldo.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Respaldo</div>'+
					'<div class="text-muted small mt-1">Ver registros y realizar copias de seguridad.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	
	if( !accesosuser["VERHISTORIALDB"] || accesosuser["VERHISTORIALDB"]["accion"]!="SI") {
		document.getElementById("divMenuHistorialDescargaBD").style.display='none';
	} else {
		resultados += '<a class="list-group-item" id="buscadorMenuRespaldo" onclick="verCerrarHistorialDescargaBD()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/respaldo.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Respaldo</div>'+
					'<div class="text-muted small mt-1">Ver registros y realizar copias de seguridad.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
	
		if( !accesosuser["VERINFORMEVENTACOMPLETADA"] || accesosuser["VERINFORMEVENTACOMPLETADA"]["accion"]!="SI") {
		document.getElementById("divMenuVentasCompletas").style.display='none';
	} else {
		resultados += '<a class="list-group-item" id="divMenuVentasCompletas" onclick="verCerrarInformeVentasCompletadas()">'+
			'<div class="row g-0 align-items-center">'+
				'<div class="col-2">'+
					'<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/report.png" />'+
				'</div>'+
				'<div class="col-10">'+
					'<div class="text-dark">Ventas completadas</div>'+
					'<div class="text-muted small mt-1">Ver Ventas que ya se pagaron todo.</div>'+
				'</div>'+
			'</div>'+
		'</a>';
		cantidad++;
	}
	
 
	
	// if( !accesosuser["VERLISTADOORDENESWEB"] || accesosuser["VERLISTADOORDENESWEB"]["accion"]!="SI") {
		// document.getElementById("divMenuListadoOrdenesWeb").style.display='none';
	// } else {
		// resultados += '<a class="list-group-item" id="buscadorMenuRespaldo" onclick="verCerrarHistorialDescargaBD()">'+
			// '<div class="row g-0 align-items-center">'+
				// '<div class="col-2">'+
					// '<img class="imgIconoMenu" style="width:40px;"src="/GoodVentaElectroCasaMaric/iconos/tipocambio.png" />'+
				// '</div>'+
				// '<div class="col-10">'+
					// '<div class="text-dark">Lista de Ordenes WEB</div>'+
					// '<div class="text-muted small mt-1">Ver ordenes de la pagina web.</div>'+
				// '</div>'+
			// '</div>'+
		// '</a>';
		// cantidad++;
	// }

	document.getElementById("MenuBuscadorDetalle").innerHTML= resultados;
	document.getElementById("BuscadorResultado").innerHTML= (cantidad == 1) ? '1 Resultado' : cantidad + ' Resultados';
}

var listadoVendedorLocales = null;
var listadoVendedorMetas = null;

function cabeceraListadoVendedor(idCuerpo, idCabecera) {
	var cuerpo = document.getElementById(idCuerpo);
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = idCabecera;
	return cabecera;
}

function iniciarListadoVendedorLocales() {
	if (listadoVendedorLocales || !window.AbmListadoCore) { return listadoVendedorLocales; }
	if (!cabeceraListadoVendedor("table_abm_Locales", "cabeceraVendedorLocales")) { return null; }
	listadoVendedorLocales = window.AbmListadoCore.crear({
		nombre: "vendedor_locales",
		idCabecera: "cabeceraVendedorLocales",
		idCuerpo: "table_abm_Locales",
		ordenInicial: "local",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" },
			{ campo: "local", titulo: "LOCAL", ancho: "70%" },
			{ campo: "asignado", titulo: "ACCION", ancho: "25%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento("table", { className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch" });
			tabla.setAttribute("border", "1");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "5");
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
			columnas.forEach(function (columna) {
				var celda = utilidades.crearElemento("td", { dataset: { columna: columna.campo } });
				celda.style.width = columna.ancho;
				if (columna.campo === "codigo") {
					celda.id = "td_id";
					celda.textContent = registro.codigo == null ? "" : registro.codigo;
				} else if (columna.campo === "local") {
					celda.id = "td_datos_1";
					celda.className = "tdRegistroSearch";
					celda.textContent = registro.local || "";
				} else {
					celda.id = "td_datos_2";
					var check = document.createElement("input");
					check.type = "checkbox";
					check.id = String(registro.codigo_relacion == null ? "" : registro.codigo_relacion);
					check.name = registro.asignado ? "NO" : "SI";
					check.checked = !!registro.asignado;
					check.addEventListener("click", function () { abmVendedorLocales(this); });
					celda.appendChild(check);
				}
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoVendedorLocales.iniciar();
	return listadoVendedorLocales;
}

function iniciarListadoVendedorMetas() {
	if (listadoVendedorMetas || !window.AbmListadoCore) { return listadoVendedorMetas; }
	if (!cabeceraListadoVendedor("table_abm_Metas", "cabeceraVendedorMetas")) { return null; }
	listadoVendedorMetas = window.AbmListadoCore.crear({
		nombre: "vendedor_metas_edicion",
		idCabecera: "cabeceraVendedorMetas",
		idCuerpo: "table_abm_Metas",
		ordenInicial: "vendedor",
		columnas: [
			{ campo: "codigo", titulo: "#", ancho: "5%" },
			{ campo: "vendedor", titulo: "VENDEDOR", ancho: "70%" },
			{ campo: "meta", titulo: "META", ancho: "25%" }
		],
		crearFila: function (registro, columnas, utilidades, indice) {
			var tabla = utilidades.crearElemento("table", { className: indice % 2 ? "tableRegistroSearch2" : "tableRegistroSearch" });
			tabla.setAttribute("border", "1");
			tabla.setAttribute("cellspacing", "1");
			tabla.setAttribute("cellpadding", "5");
			var fila = utilidades.crearElemento("tr", { id: "tbSelecRegistro" });
			columnas.forEach(function (columna) {
				var celda = utilidades.crearElemento("td", { dataset: { columna: columna.campo } });
				celda.style.width = columna.ancho;
				if (columna.campo === "codigo") {
					celda.id = "td_id";
					celda.textContent = registro.codigo == null ? "" : registro.codigo;
				} else if (columna.campo === "vendedor") {
					celda.id = "td_datos_1";
					celda.className = "tdRegistroSearch";
					celda.textContent = registro.vendedor || "";
				} else {
					celda.id = "td_datos_2";
					var input = document.createElement("input");
					input.type = "text";
					input.className = "inputText";
					input.name = String(registro.id_meta_control == null ? "" : registro.id_meta_control);
					input.value = registro.meta_formateada == null ? "0" : registro.meta_formateada;
					input.style.textAlign = "center";
					input.style.backgroundColor = "cadetblue";
					input.style.color = "white";
					input.addEventListener("keyup", function (evento) {
						separadordemiles(this);
						if (evento.keyCode === 13) { abmaccesoMetas(this); }
					});
					celda.appendChild(input);
				}
				fila.appendChild(celda);
			});
			tabla.appendChild(fila);
			return tabla;
		}
	});
	listadoVendedorMetas.iniciar();
	return listadoVendedorMetas;
}

function verCerrarVendedorLocales(){
	
	if(cod_vendedorLocal==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN VENDEDOR")
		return false;
	}
	
	
	if(document.getElementById("divVendedorLocales").style.display==""){
	 
	$("div[id=divVendedorLocales]").fadeOut(500);	
		cod_vendedorLocal="";
		}else{		
				
	 document.getElementById("divVendedorLocales").style.display=""
      
	 buscarVendedorLocales();
	
		
	}
}
var cod_vendedorLocal="";

function buscarVendedorLocales() {

	var listado = iniciarListadoVendedorLocales();
	document.getElementById("table_abm_Locales").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_localvendedor": cod_vendedorLocal,		
		"formato": "json",
		"funt": "buscarVendedorLocales"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Locales").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Locales").innerHTML = ''
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
				
			}
		}
	});
}






function verCerrarVendedorMetas(){
	
	if(document.getElementById("divVendedorMetasLista").style.display==""){
	 
	$("div[id=divVendedorMetasLista]").fadeOut(500);	
		
		}else{		
				
	 document.getElementById("divVendedorMetasLista").style.display=""
      
	 buscarVendedorMetas();
	
		
	}
}



function buscarVendedorMetas() {

	var listado = iniciarListadoVendedorMetas();
	document.getElementById("table_abm_Metas").innerHTML = paginacargando
   var cod_local = document.getElementById("inptBuscarAbmCobrador3").value;  
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"cod_local": cod_local,		
		"formato": "json",
		"funt": "buscarVendedor"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmvendedor.php",
		type: "post",
		xhr: function () {
        var xhr = new window.XMLHttpRequest();
        //Uload progress
        xhr.upload.addEventListener("progress" ,function (evt) {
		var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
               
        }, false);
 //Download progress
		xhr.addEventListener("progress", function (evt) {
        var kb=((evt.loaded*1)/1000).toFixed(1)
		if(kb=="0.0"){
		kb=0.1;
		}
        
        }, false);
        return xhr;
    },
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_Metas").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_Metas").innerHTML = ''
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
				
			}
		}
	});
}

