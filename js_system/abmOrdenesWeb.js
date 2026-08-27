var listadoOrdenesWeb = null;
var listadoDetallesOrdenesWeb = null;
function buscarCabeceraOrdenesWeb(cuerpo) {
	var cabecera = cuerpo ? cuerpo.previousElementSibling : null;
	while (cabecera && (cabecera.tagName !== 'TABLE' || cabecera.querySelector('input,select,textarea'))) cabecera = cabecera.previousElementSibling;
	return cabecera;
}
function iniciarListadoOrdenesWeb() {
	if (listadoOrdenesWeb || !window.AbmListadoCore) return listadoOrdenesWeb;
	var cuerpo = document.getElementById('table_listado_ordenes_web');
	var cabecera = buscarCabeceraOrdenesWeb(cuerpo);
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraListadoOrdenesWeb';
	listadoOrdenesWeb = window.AbmListadoCore.crear({
		nombre: 'ordenes_web',
		idCabecera: 'cabeceraListadoOrdenesWeb',
		idCuerpo: 'table_listado_ordenes_web',
		ordenInicial: 'fecha',
		columnas: [
			{ campo: 'codigo', titulo: '#', ancho: '10%' },
			{ campo: 'documento', titulo: 'CI/RUC', ancho: '10%' },
			{ campo: 'cliente', titulo: 'CLIENTE', ancho: '30%' },
			{ campo: 'estado', titulo: 'ESTADO', ancho: '10%' },
			{ campo: 'fecha', titulo: 'FECHA', ancho: '20%' },
			{ campo: 'cantidad', titulo: 'CANTIDAD', ancho: '10%' },
			{ campo: 'total', titulo: 'TOTAL', ancho: '10%' }
		],
		fila: {
			border: '0',
			cellspacing: '0',
			cellpadding: '0',
			funcionSeleccion: 'obtenerDatosOrdenesWeb',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo' },
				{ campo: 'documento', columna: 'documento' },
				{ id: 'td_datos_1', campo: 'cedula', tecnica: true },
				{ id: 'td_datos_2', campo: 'ruc', tecnica: true },
				{ id: 'td_datos_3', campo: 'nombres', tecnica: true },
				{ id: 'td_datos_4', campo: 'apellidos', tecnica: true },
				{ campo: 'cliente', columna: 'cliente' },
				{ id: 'td_datos_5', campo: 'estado', columna: 'estado' },
				{ id: 'td_datos_6', campo: 'fecha', columna: 'fecha' },
				{ id: 'td_datos_9', campo: 'cantidad', columna: 'cantidad' },
				{ id: 'td_datos_10', campo: 'total', columna: 'total' },
				{ id: 'td_datos_11', campo: 'telefono', tecnica: true },
				{ id: 'td_datos_12', campo: 'direccion', tecnica: true },
				{ id: 'td_datos_13', campo: 'cantidad_cuotas', tecnica: true },
				{ id: 'td_datos_14', campo: 'fecha_nacimiento', tecnica: true }
			]
		}
	});
	listadoOrdenesWeb.iniciar();
	return listadoOrdenesWeb;
}
function iniciarListadoDetallesOrdenesWeb() {
	if (listadoDetallesOrdenesWeb || !window.AbmListadoCore) return listadoDetallesOrdenesWeb;
	var cuerpo = document.getElementById('divProductosOrdenesWeb');
	var cabecera = buscarCabeceraOrdenesWeb(cuerpo);
	if (!cuerpo || !cabecera) return null;
	cabecera.id = 'cabeceraDetallesOrdenesWeb';
	listadoDetallesOrdenesWeb = window.AbmListadoCore.crear({
		nombre: 'detalles_ordenes_web',
		idCabecera: 'cabeceraDetallesOrdenesWeb',
		idCuerpo: 'divProductosOrdenesWeb',
		ordenInicial: 'producto',
		columnas: [
			{ campo: 'codigo', titulo: 'COD.', ancho: '10%' },
			{ campo: 'codigo_barra', titulo: 'COD. BARRA', ancho: '15%' },
			{ campo: 'producto', titulo: 'NOMBRE', ancho: '30%' },
			{ campo: 'marca', titulo: 'MARCA', ancho: '20%' },
			{ campo: 'cantidad', titulo: 'CANTIDAD', ancho: '10%' },
			{ campo: 'precio', titulo: 'PRECIO', ancho: '15%' }
		],
		fila: {
			border: '0',
			cellspacing: '0',
			cellpadding: '0',
			celdas: [
				{ id: 'td_id', campo: 'codigo', columna: 'codigo' },
				{ id: 'td_datos_1', campo: 'producto_codigo', tecnica: true },
				{ id: 'td_datos_2', campo: 'codigo_barra', columna: 'codigo_barra' },
				{ id: 'td_datos_3', campo: 'producto', columna: 'producto' },
				{ id: 'td_datos_4', campo: 'marca', columna: 'marca' },
				{ id: 'td_datos_5', campo: 'cantidad', columna: 'cantidad' },
				{ id: 'td_datos_6', campo: 'precio', columna: 'precio' }
			]
		}
	});
	listadoDetallesOrdenesWeb.iniciar();
	return listadoDetallesOrdenesWeb;
}
function iniciarListadosOrdenesWeb() {
	iniciarListadoOrdenesWeb();
	iniciarListadoDetallesOrdenesWeb();
}

function minimizarVentanaOrdenesWeb() {
	document.getElementById("divSegundoPlano").style.display="none";
	document.getElementById("divOrdenesWeb").style.display= "none";
	document.getElementById('divMinimizadoOrdenesWeb').style.display= "";
}

function verCerrarVentanaOrdenesWeb(ventana, mostrar= false){
	document.getElementById("divSegundoPlano").style.display="none";
	if (mostrar) {
		document.getElementById("divSegundoPlano").style.display="";
		document.getElementById("divOrdenesWeb").style.display= "";

		// No hace nada mas porque estaba minimizado
		if (document.getElementById('divMinimizadoOrdenesWeb').style.display= "") {
			return;
		}

		switch (ventana) {
			case 'divDetalleOrdenesWeb':
				document.getElementById('divListadoOrdenesWeb').style.display= "none";
				$("div[id=divDetalleOrdenesWeb]").fadeIn(250);
				break;
			case 'divListadoOrdenesWeb':
				$("div[id=divListadoOrdenesWeb]").fadeIn(250);
				break;
		}
	} else {
		switch (ventana) {
			case 'divDetalleOrdenesWeb':
				document.getElementById('divListadoOrdenesWeb').style.display= "";
				$("div[id=divDetalleOrdenesWeb]").fadeOut(250);
				break;
			case 'divListadoOrdenesWeb':
				$("div[id=divListadoOrdenesWeb]").fadeOut(250);
				document.getElementById('divMinimizadoOrdenesWeb').style.display= "none";
				break;
		}
		if (!(ventana == "divDetalleOrdenesWeb")) {
			document.getElementById("divOrdenesWeb").style.display= "none";
		}
	}
}

function buscarListadoOrdenesWeb() {
	// if(controlacceso("VERLISTADOORDENESWEB","accion")==false){return;ver_vetana_informativa("Permisos insuficientes.");}

	const inptListadoOrdenesWebCod= document.getElementById('inptListadoOrdenesWebCod').value;
	const inptListadoOrdenesWebRUC= document.getElementById('inptListadoOrdenesWebRUC').value;
	const inptListadoOrdenesWebEstado= document.getElementById('inptListadoOrdenesWebEstado').value;
	const inptListadoOrdenesWebCliente= document.getElementById('inptListadoOrdenesWebCliente').value;
	
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"id_orden": inptListadoOrdenesWebCod,
		"ci_cliente": inptListadoOrdenesWebRUC.split('-')[0],
		"orden_estado": inptListadoOrdenesWebEstado,
		"nombre_cliente": inptListadoOrdenesWebCliente,
		"formato": "json",
		"funt": "vistaOrdenesWeb"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmOrdenesWeb.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			verCerrarEfectoCargando("")
		},
		success: function (responseText) {
			document.getElementById('table_listado_ordenes_web').innerHTML= "";
			verCerrarEfectoCargando("")
			var Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var listado = iniciarListadoOrdenesWeb();
					if (listado) listado.establecerRegistros(Array.isArray(datos["2"]) ? datos["2"] : []);
				}
			} catch (error) {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});
}
var elemento;
var id_orden_web= '';
function obtenerDatosOrdenesWeb(datostr) {elemento= datostr;
	id_orden_web= $(datostr).find('td#td_id').text();
	obtenerDetallesOrdenesWeb(id_orden_web);
	// Genera el ruc
	let ruc= $(datostr).find('td#td_datos_2').text();
	if (ruc) {
		ruc= $(datostr).find('td#td_datos_1').text() + "-" + ruc;
	} else {
		ruc= $(datostr).find('td#td_datos_1').text();
	}

	// Carga los detalles de la orden en los campos
	document.getElementById('inptOrdenesWebClienteRuc').value= ruc;
	document.getElementById('inptOrdenesWebClienteNombres').value= $(datostr).find('td#td_datos_3').text();
	document.getElementById('inptOrdenesWebClienteApellidos').value= $(datostr).find('td#td_datos_4').text();
	document.getElementById('inptOrdenesWebClienteFecha').value= $(datostr).find('td#td_datos_6').text();
	document.getElementById('inptOrdenesWebClienteFechaNacimiento').value= $(datostr).find('td#td_datos_14').text();
	document.getElementById('inptOrdenesWebClienteTelefono').value= $(datostr).find('td#td_datos_11').text();
	document.getElementById('inptOrdenesWebClienteDireccion').value= $(datostr).find('td#td_datos_12').text();
	document.getElementById('inptRegistroNroOrdenesPendiente').value= $(datostr).find('td#td_datos_13').text();

	verCerrarVentanaOrdenesWeb('divDetalleOrdenesWeb', true);
}

function obtenerDetallesOrdenesWeb(id_orden) {
	// if(controlacceso("VERLISTADODETALLESORDENESWEB","accion")==false){return;ver_vetana_informativa("Permisos insuficientes.");}

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"id_orden": id_orden,
		"formato": "json",
		"funt": "vistaDetallesOrdenesWeb"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmOrdenesWeb.php",
		type: "post",
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
			console.error(jqXHR, textstatus, errorThrowm);
			manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			verCerrarEfectoCargando("")
		},
		success: function (responseText) {
			verCerrarEfectoCargando("")
			var Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var listado = iniciarListadoDetallesOrdenesWeb();
					if (listado) listado.establecerRegistros(Array.isArray(datos["2"]) ? datos["2"] : []);
					document.getElementById('inptRegistroNroOrdenes').value= datos["4"];
					document.getElementById('inptRegistroNroOrdenesTotalPrecio').value= datos["5"];
				}
			} catch (error) {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
					GuardarArchivosLog(titulo)
			}
		}
	});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadosOrdenesWeb);
else iniciarListadosOrdenesWeb();
/* function buscarSiExisteCliente(documento){


				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"codigo": codigo,
			"documento": documento,
			"funt": "buscarSiExisteCliente"
			};
			
			
	 $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
			 
		
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			controldebusquedadClientes=false
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
		try{	
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
		  var datos_buscados=datos[2];		 
		 	 
			 if(datos_buscados == 0){
				 ver_vetana_informativa('ESTE CLIENTE TODAVIA NO ESTÁ CREADO EN EL SISTEMA')
			 }
	  
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
 */
 
 async function buscarSiExisteCliente(documento) {
  try {
    obtener_datos_user();

    const datos = {
      "useru": userid,
      "passu": passuser,
      "navegador": navegador,
      "documento": documento,
      "funt": "buscarSiExisteCliente"
    };

    // Simula beforeSend (puedes poner aquí un loader o similar)
    // ejemplo: mostrarLoader(true);

    const response = await fetch("/GoodVentaElectroCasaMaric/php_system/abmclientes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(datos).toString()
    });

    if (!response.ok) {
      // Error HTTP (404, 500, etc.)
      manejadordeerroresjquery(response.status, response.statusText, "abmventana");
      return;
    }

    const responseText = await response.text();
    console.log(responseText);

    let Respuesta = responseText;

    try {
      const datosJSON = JSON.parse(Respuesta);
      Respuesta = datosJSON["1"];
      Respuesta = respuestaJqueryAjax(Respuesta);

       if (Respuesta === true) {
        const datos_buscados = datosJSON[2];

        return datos_buscados;

      }

    } catch (error) {
      ver_vetana_informativa("LO SENTIMOS, HA OCURRIDO UN ERROR");
      const titulo = "Error: " + error + " \r\n Consola: " + responseText;
      GuardarArchivosLog(titulo);
    }

  } catch (error) {
    console.error("Error en fetch:", error);
    manejadordeerroresjquery(0, error.message, "abmventana");
  } finally {
    // Aquí puedes ocultar el loader si usaste uno
    // ejemplo: mostrarLoader(false);
  }
}

 
async function pasarOrdenAVenta() {

	// Primero se revisa si existe el cliente
	const ruc_cliente= document.getElementById('inptOrdenesWebClienteRuc').value;
	
	const cliente = await buscarSiExisteCliente(ruc_cliente);
	/* if (cliente) {
	  console.log("Cliente encontrado");
	} else {
	  console.log("Cliente no existe o error.");
	} */
	
	if (cliente == 0) {
		// Crea el cliente en caso de no existir
		const fechaNac_cliente= document.getElementById('inptOrdenesWebClienteFechaNac').value;
		const nombres_cliente= document.getElementById('inptOrdenesWebClienteNombres').value;
		const apellidos_cliente= document.getElementById('inptOrdenesWebClienteApellidos').value;
		const telefono_cliente= document.getElementById('inptOrdenesWebClienteTelefono').value;
		const direccion_cliente= document.getElementById('inptOrdenesWebClienteDireccion').value;
		
		abmcliente('NO FIJO','','','',fechaNac_cliente,'NO','Confirmado','','','','','','',idFKZona,nombres_cliente,apellidos_cliente,ruc_cliente,ruc_cliente.split('-')[0],telefono_cliente,telefono_cliente,direccion_cliente,'','','Activo','','nuevo');
		cliente= buscarAbmCliente('', ruc_cliente.split('-')[0], '', '', '', '', '', 'activo');
	}
	cliente= $(cliente["2"]).find('tr').html();
	
	controlseleccvistacliente= 'venta';
	obtenerdatosabmCliente(cliente);
	EnviarClienteDesde();

	// Se evalua si la venta es a credito o al contado
	const cant_cuotas= parseInt(document.getElementById('inptRegistroNroOrdenesPendiente').value);
	const tipoVenta= document.getElementById('inptSeleccTipoVenta');
	if (cant_cuotas > 0) {
		tipoVenta.value= 'CREDITO';
	} else {
		tipoVenta.value= 'CONTADO';
	}
	OpcionesTipoVenta(tipoVenta);

	// Se cargan los productos
	const productosOrdenes= obtenerDetallesOrdenesWeb(id_orden_web);
	productosOrdenes.forEach((i, pr) => {
		buscarproductoporcodigo2(pr.cod_barra);
	});
}
 async function  crear_cliente(tipo_cliente,nombremadre,nombrepadre,tipo_vivienda,FechaNac,sms,accesocredito,lugardetrabajo,direcciontrab,salario,antiguedad,teleftrab1,teleftrab2,idzonaFk,nombre_persona,apellido_persona,rut_cliente,ci_cliente,telefono,whapp,direccion,email,Calificacion,estado,cod_persona,accion) {
  try {
	  
	   var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "nuevo")
			 datos.append("cod_persona" , cod_persona)
			  datos.append("nombre_persona" , nombre_persona)
			  datos.append("apellido_persona" , apellido_persona)
			 datos.append("direccion" , direccion)
			 datos.append("FechaNac" , FechaNac)
			 datos.append("telefono" , telefono)
			 datos.append("email" , email)//Sirve para la referencia
			 datos.append("rut_cliente" , rut_cliente)
			 datos.append("ci_cliente" , ci_cliente)
			 datos.append("Calificacion" , Calificacion)
			 datos.append("whapp" , whapp)
			 datos.append("estado" , estado)
			 datos.append("idzonaFk" , idzonaFk)
			datos.append("foto1", fotocliente1)
			datos.append("sms", sms)
			datos.append("ext1", extcliente1)
			datos.append("foto2", fotocliente2)
			datos.append("ext2", extcliente2)		
			datos.append("lugardetrabajo", lugardetrabajo)		
			datos.append("direcciontrab", direcciontrab)		
			datos.append("salario", salario)		
			datos.append("antiguedad", antiguedad)		
			datos.append("teleftrab1", teleftrab1)		
			datos.append("teleftrab2", teleftrab2)		
			datos.append("accesocredito", accesocredito)			
			datos.append("nombremadre", nombremadre)			
			datos.append("nombrepadre", nombrepadre)			
			datos.append("tipo_vivienda", tipo_vivienda)			
			datos.append("tipo_cliente", tipo_cliente)		

    // Simula beforeSend (puedes poner aquí un loader o similar)
    // ejemplo: mostrarLoader(true);

    const response = await fetch("/GoodVentaElectroCasaMaric/php_system/abmclientes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(datos).toString()
    });

    if (!response.ok) {
      // Error HTTP (404, 500, etc.)
      manejadordeerroresjquery(response.status, response.statusText, "abmventana");
      return;
    }

    const responseText = await response.text();
    console.log(responseText);

    let Respuesta = responseText;

    try {
      const datosJSON = JSON.parse(Respuesta);
      Respuesta = datosJSON["1"];
      Respuesta = respuestaJqueryAjax(Respuesta);

       if (Respuesta === true) {
        const datos_buscados = datosJSON[2];

        return datos_buscados;

      }

    } catch (error) {
      ver_vetana_informativa("LO SENTIMOS, HA OCURRIDO UN ERROR");
      const titulo = "Error: " + error + " \r\n Consola: " + responseText;
      GuardarArchivosLog(titulo);
    }

  } catch (error) {
    console.error("Error en fetch:", error);
    manejadordeerroresjquery(0, error.message, "abmventana");
  } finally {
    // Aquí puedes ocultar el loader si usaste uno
    // ejemplo: mostrarLoader(false);
  }
}
