// ABM DESCRIPCION ARCHIVOS CLIENTE
function verCerrarAbmNuevoDescripcionArchivoCliente(){
	
	if(document.getElementById("divAbmNuevoDescripcionArchivoCliente").style.display==""){
		
		$("div[id=divAbmNuevoDescripcionArchivoCliente]").fadeOut(500);	
		
	}else{		
	if(controlacceso("CREARNUEVADESCRIPCIONARCHIVOCLIENTE","accion")==false){return;}
		if (typeof traerModalAuxiliarClienteAlFrente === "function") {
			traerModalAuxiliarClienteAlFrente("divAbmNuevoDescripcionArchivoCliente")
		} else {
			document.getElementById("divAbmNuevoDescripcionArchivoCliente").style.display=""
		}

	}
}
function VerificarDatosNuevoDescripcionArchivoCliente() {
	var inptNuevoDescripcionArchivoCliente = document.getElementById('inptNuevoDescripcionArchivoCliente').value
	
	if (inptNuevoDescripcionArchivoCliente == "") {
		ver_vetana_informativa("FALTO AGREGAR DESCRIPCION")
		return false;
	}	

		accion = "NuevoDescripcionArchivoCliente";
	
	abmNuevoDescripcionArchivoCliente(inptNuevoDescripcionArchivoCliente, accion);
}
function abmNuevoDescripcionArchivoCliente(descripcion , accion) {
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
					document.getElementById('inptNuevoDescripcionArchivoCliente').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarDescripcionArchivoCliente()
					verCerrarAbmNuevoDescripcionArchivoCliente()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscarDescripcionArchivoCliente() {

	document.getElementById("inptDescripcionCargarArchivosCliente").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionDescripcionArchivoCliente"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptDescripcionCargarArchivosCliente").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptDescripcionCargarArchivosCliente").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptDescripcionCargarArchivosCliente").innerHTML = datos_buscados


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


