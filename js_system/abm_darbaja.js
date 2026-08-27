//Abm DarBaja
var listadoProductosDeBaja = null;
function iniciarListadoProductosDeBaja() {
	if (listadoProductosDeBaja || !window.AbmListadoCore) return listadoProductosDeBaja;
	var cuerpo = document.getElementById('table_Vista_productoBaja');
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && (cabecera.tagName !== 'TABLE' || cabecera.querySelector('input,select,textarea'))) cabecera = cabecera.previousElementSibling;
	if (!cabecera) return null;
	cabecera.id = 'cabeceraProductosDeBaja';
	listadoProductosDeBaja = window.AbmListadoCore.crear({
		nombre: 'productos_de_baja',
		idCabecera: 'cabeceraProductosDeBaja',
		idCuerpo: 'table_Vista_productoBaja',
		ordenInicial: 'producto',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '10%' },
			{ campo: 'producto', titulo: 'PRODUCTO', ancho: '25%' },
			{ campo: 'cantidad', titulo: 'CANTIDAD', ancho: '10%' },
			{ campo: 'motivo', titulo: 'MOTIVO', ancho: '25%' },
			{ campo: 'fecha', titulo: 'FECHA', ancho: '10%' },
			{ campo: 'usuario', titulo: 'USUARIO', ancho: '20%' }
		],
		fila: {
			funcionSeleccion: 'obtenerdatosabmCasa',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo', render: function (valor, registro, celda) {
					celda.style.backgroundColor = '#efeded';
					celda.style.color = 'red';
					return valor;
				} },
				{ id: 'td_datos_1', campo: 'producto', columna: 'producto' },
				{ id: 'td_datos_2', campo: 'cantidad', columna: 'cantidad' },
				{ id: 'td_datos_3', campo: 'motivo', columna: 'motivo' },
				{ id: 'td_datos_4', campo: 'fecha', columna: 'fecha' },
				{ id: 'td_datos_5', campo: 'usuario', columna: 'usuario' }
			]
		}
	});
	listadoProductosDeBaja.iniciar();
	return listadoProductosDeBaja;
}
function MinimizardarDeBaja(){ 
	$("div[id=divAbmdebaja]").fadeOut(500);	
	$("div[id=divAbmbajaproducto1]").fadeOut(500);	

	document.getElementById("divMinimizadoDarBaja").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuProductosBaja"));
}
function vercerrardarDeBaja(d) {
	document.getElementById('divSegundoPlano').style.display = "none"
	
	
	document.getElementById("divMinimizadoDarBaja").style.display="none"
	if (d == "1") {
		if(controlacceso("VERPRODUCTOSBAJA","accion")==false){return;}	
		mostrarSoloUno("divAbmdebaja")	
		document.getElementById('divAbmdebaja').style.display = ""
		document.getElementById("divAbmbajaproducto1").style.display=""
 //  
	}else{
			if(controldebusquedadProductosdeBaja==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
				//  
$("div[id=divAbmdebaja]").fadeOut(500);	
$("div[id=divAbmbajaproducto1]").fadeOut(500);	
	}
}
function verCerrarVentanaAbmdarDeBaja(d) {
	
	if (d == "2") {
	//	document.getElementById('divAbmdebaja').style.display = "none"
		//  
$("div[id=divAbmdebaja]").fadeOut(500);	
$("div[id=divAbmbajaproducto2]").fadeOut(500);	
	
	} else {
		if (idAbmProducto != "") {
		document.getElementById('divAbmdebaja').style.display = ""
		 //  
		document.getElementById("divAbmbajaproducto2").style.display=""	
		var nombreProducto = document.getElementById('inptRegistroSeleccProducto').value
		
		document.getElementById('inptNombreProductobaja').value =nombreProducto;
		document.getElementById('inptLocalProductobaja').value =localProductoBaja;
		}else{
			ver_vetana_informativa("DEBES SELECCIONAR UN REGISTRO")
		}
	}
}
function verificarcamposProductobaja() {
	var inptcantidadProductobaja = document.getElementById('inptcantidadProductobaja').value
	var inptMotivoProductobaja = document.getElementById('inptMotivoProductobaja').value
	var inptNombreProductobaja = document.getElementById('inptNombreProductobaja').value
	var inptLocalProductobaja = document.getElementById('inptLocalProductobaja').value

	if (inptNombreProductobaja == "") {
		ver_vetana_informativa("DEBES SELECCIONAR UN PRODUCTO")
		return false;
	}

	if (inptcantidadProductobaja == "") {
		ver_vetana_informativa("FALTO INGRESAR UNA CANTIDAD")
		return false;
	}

	if (inptMotivoProductobaja == "") {
		ver_vetana_informativa("FALTO INGRESAR UN MOTIVO")
		return false;
	}

	var accion = "";
	if (idAbmProducto != "") {
		
		accion = "nuevo";
		abmProductobaja(inptcantidadProductobaja, inptMotivoProductobaja , idAbmProducto, accion);
		
	} else {
		ver_vetana_informativa("DEBES SELECCIONAR UN PRODUCTO")
		
	}
	
}
function abmProductobaja(cantidad, motivo , idAbmProducto, accion) {
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("Cantidad", cantidad)
	datos.append("Motivo", motivo)
	datos.append("Cod_usuarioFK", userid)
	datos.append("Cod_productoFK", idAbmProducto)
	datos.append("cod_localFK", codLocalProductoBaja)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmDebaja.php",
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
					limpiarcamposProductobaja()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					idAbmProducto = ""
					buscarabmproducto()
					verCerrarVentanaAbmdarDeBaja("2");
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

}
function limpiarcamposProductobaja() {
	document.getElementById('inptcantidadProductobaja').value = "";
	document.getElementById('inptMotivoProductobaja').value = "";
	document.getElementById('inptRegistroSeleccCaja').value = "";
	document.getElementById('btnBajaDatosProductos').style.backgroundColor="#2196F3";
	document.getElementById('btnAbmProductobaja').value = "Guardar datos";
	idAbmProducto = "";
	document.getElementById('btnBajaDatosProductos').disabled=false;
}
function checkproductoBaja(d){
	if(d=="1"){
	document.getElementById('inptSelecproductoBaja2').checked=false
	document.getElementById('inptSelecproductoBaja1').checked=true
	document.getElementById('inptFechaproductoBaja1').value="";
      document.getElementById('inptFechaproductoBaja2').value="";
	}else{
		
		var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptSelecproductoBaja2').checked= true
	document.getElementById('inptSelecproductoBaja1').checked=false
	
	document.getElementById('inptFechaproductoBaja1').value = f.getFullYear() + "-" + mes + "-" + "01";
	document.getElementById('inptFechaproductoBaja2').value = f.getFullYear() + "-" + mes + "-" + dia;
	}
}
var registrocargadoproductosdebaja="";
var totalregistroproductosdebaja="";
var controldebusquedadProductosdeBaja=false
function cancelarProductosDeBaja(){
	controldebusquedadProductosdeBaja=false
	document.getElementById("divProgressProductosDeBaja").style.backgroundColor='#ff5722'
}
function buscarProductoBaja() {
	var usuario = document.getElementById('inptBuscarproductoBaja4').value
	var fecha1 = document.getElementById('inptFechaproductoBaja1').value
	var fecha2 = document.getElementById('inptFechaproductoBaja2').value
	var fechaFija = document.getElementById('inptBuscarproductoBaja3').value
	var Codigo = document.getElementById('inptBuscarproductoBaja1').value
	var Producto = document.getElementById('inptBuscarproductoBaja2').value
	if(controldebusquedadProductosdeBaja==true){
		ver_vetana_informativa("CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR")
	return
}
controldebusquedadProductosdeBaja=true
	document.getElementById("table_Vista_productoBaja").innerHTML = paginacargando
	document.getElementById("tbProcessProductosDeBaja").style.display = "none"
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"Fecha1": fecha1,
		"Fecha2": fecha2,
		"Nombre": Producto,
		"Fechafijo": fechaFija,
		"Cod_productoFK": Codigo,
		"Usuario": usuario,
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmDebaja.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_Vista_productoBaja").innerHTML = ''
			controldebusquedadProductosdeBaja=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_Vista_productoBaja").innerHTML = ''
				try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var Total_Registros = datos[3];
					var Total_Efectivo = datos[4];
					
					var listado = iniciarListadoProductosDeBaja();
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);
					document.getElementById('inptTotalRegistoproductoBaja').value = Total_Registros;
					
						registrocargadoproductosdebaja=datos[99];
					totalregistroproductosdebaja=datos[100];
			
						 if(totalregistroproductosdebaja>registrocargadoproductosdebaja){
						 	var porce=((registrocargadoproductosdebaja*100)/totalregistroproductosdebaja).toFixed(0)
	document.getElementById("divProgressProductosDeBaja").style.width=porce+"%"
						  buscarMasProductoBaja();
					 }else{
						 controldebusquedadProductosdeBaja=false
					 }
					
				}
			
			} catch (error) {
				controldebusquedadProductosdeBaja=false
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});
	}
function buscarMasProductoBaja(c) {
	var usuario = document.getElementById('inptBuscarproductoBaja4').value
	var fecha1 = document.getElementById('inptFechaproductoBaja1').value
	var fecha2 = document.getElementById('inptFechaproductoBaja2').value
	var fechaFija = document.getElementById('inptBuscarproductoBaja3').value
	var Codigo = document.getElementById('inptBuscarproductoBaja1').value
	var Producto = document.getElementById('inptBuscarproductoBaja2').value
	if(c=="1"){
		controldebusquedadProductosdeBaja=true
	}
if(controldebusquedadProductosdeBaja==false){
	return
}
controldebusquedadProductosdeBaja=true
	document.getElementById("tbProcessProductosDeBaja").style.display = ""
	document.getElementById("divProgressProductosDeBaja").style.backgroundColor=''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"Fecha1": fecha1,
		"Fecha2": fecha2,
		"Nombre": Producto,
		"Fechafijo": fechaFija,
		"Cod_productoFK": Codigo,
		"Usuario": usuario,
		"registrocargado": registrocargadoproductosdebaja,
		"formato": "json",
		"funt": "buscarmas"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmDebaja.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divProgressProductosDeBaja").style.backgroundColor='#ff5722'
			controldebusquedadProductosdeBaja=false
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
				try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {				   
					var Total_Registros = datos[3];
					var Total_Efectivo = datos[4];
					
					var listado = iniciarListadoProductosDeBaja();
					if (listado) listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : [], true);
					document.getElementById('inptTotalRegistoproductoBaja').value = Total_Registros;
					
						registrocargadoproductosdebaja=datos[99];
					
						 if(totalregistroproductosdebaja>registrocargadoproductosdebaja){
						 	var porce=((registrocargadoproductosdebaja*100)/totalregistroproductosdebaja).toFixed(0)
	document.getElementById("divProgressProductosDeBaja").style.width=porce+"%"
						  buscarMasProductoBaja();
					 }else{
						 document.getElementById("tbProcessProductosDeBaja").style.display = "none"
						 controldebusquedadProductosdeBaja=false
					 }
					
				}
			
			} catch (error) {
				document.getElementById("divProgressProductosDeBaja").style.backgroundColor='#ff5722'
				controldebusquedadProductosdeBaja=false
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});
	}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoProductosDeBaja);
else iniciarListadoProductosDeBaja();
/*
INFO
*/

function ver_vetana_informativa(titulo) {

    const errores = [
        "FALTO INGRESAR",
        "LO SENTIMOS HA OCURRIDO UN ERROR",
        "FALTO SELECCIONAR",
        "CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR",
        "ERROR",
        "INVALIDO",
        "NO SE PUDO"
    ];

 
    const texto = titulo.toUpperCase(); 
    const esError = errores.some(patron => texto.includes(patron));

 
    if (!esError) { 
        showToast.success(titulo, {
            duration: 5000,
            progress: true,
            position: "top-left",
            transition: "bounceInDown",
            icon: "",
            sound: true,
        });
    } else { 
        showToast.error(titulo, {
            duration: 5000,
            progress: true,
            position: "top-left",
            transition: "slideInUp",
            icon: "",
            sound: true,
        });
    }
}










var idFkCobrador = ""
var idFkVendedor = ""
var controlseleccvistaCobrador = ""
function vercerrarvistacobrador(d, ventana) {
	if (d == "1") {
		document.getElementById("divVistaCobrador").style.display=""
		controlseleccvistaCobrador = ventana
		buscarvistacobrador();
	} else {
		document.getElementById("divVistaCobrador").style.display="none"
	}
}
function buscarvistacobrador() {
	var buscador = document.getElementById('inptBuscarVistaCobrador').value
	document.getElementById("table_vista_cobrador").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"funt": "buscarvista"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmusuarios.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_cobrador").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_cobrador").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("table_vista_cobrador").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function obtenerdatosvistacobrador(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''

	});
	datostr.className = 'tableRegistroSelec'
	if (controlseleccvistaCobrador == "arqueo") {
		cobradorarqueo = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptCobradorArqueo').value = $(datostr).children('td[id="td_datos_2"]').html();
	}
	if (controlseleccvistaCobrador == "aperturacierre") {
		codCajeroapertura = $(datostr).children('td[id="td_id"]').html();
		document.getElementById('inptcajeroAperturaCierreCaja').value = $(datostr).children('td[id="td_datos_2"]').html();
	}
	document.getElementById("divVistaCobrador").style.display = "none"
}
