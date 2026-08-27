// ABM DESCRIPCION FOTO
function verCerrarAbmNuevoDescripcionFoto(){
	
	if(document.getElementById("divAbmNuevoDescripcionFoto").style.display==""){
		
		$("div[id=divAbmNuevoDescripcionFoto]").fadeOut(500);	
		
	}else{		
		if (typeof traerModalAuxiliarClienteAlFrente === "function") {
			traerModalAuxiliarClienteAlFrente("divAbmNuevoDescripcionFoto")
		} else {
			document.getElementById("divAbmNuevoDescripcionFoto").style.display=""
		}

	}
}
function VerificarDatosNuevoDescripcionFoto() {
	var inptNuevoDescripcionFoto = document.getElementById('inptNuevoDescripcionFoto').value
	
	if (inptNuevoDescripcionFoto == "") {
		ver_vetana_informativa("FALTO AGREGAR DESCRIPCION")
		return false;
	}	

		accion = "NuevoDescripcionFoto";
	
	abmNuevoDescripcionFoto(inptNuevoDescripcionFoto, accion);
}
function abmNuevoDescripcionFoto(descripcion , accion) {
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
					document.getElementById('inptNuevoDescripcionFoto').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarDescripcionFoto()
					verCerrarAbmNuevoDescripcionFoto()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}
function buscarDescripcionFoto() {

	document.getElementById("inptDescripcionCargarFotosClientesPrincipal").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscaroptionDescripcionFoto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("inptDescripcionCargarFotosClientesPrincipal").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("inptDescripcionCargarFotosClientesPrincipal").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
				   var datos_buscados = datos[2];
					document.getElementById("inptDescripcionCargarFotosClientesPrincipal").innerHTML = datos_buscados


				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}


