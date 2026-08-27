/* ABM CONCEPTO EN CHEQUE A COBRAR */
function verCerrarAbmNuevoConceptoChequeACobrar(){
	// if(controlacceso("CREARNUEVOMOTIVO","accion")==false){return;}
	if(document.getElementById("divAbmNuevoConceptoChequeACobrar").style.display==""){
		
		$("div[id=divAbmNuevoConceptoChequeACobrar]").fadeOut(500);	
		
	}else{		
	
		document.getElementById("divAbmNuevoConceptoChequeACobrar").style.display=""

	}
}
function VerificarDatosNuevoConceptoChequeACobrar() {
	var inptNuevoConceptoChequeACobrar = document.getElementById('inptNuevoConceptoChequeACobrar').value
	
	if (inptNuevoConceptoChequeACobrar == "") {
		ver_vetana_informativa("FALTO AGREGAR NUEVO MOTIVO")
		return false;
	}	

		accion = "NuevoConceptoChequeACobrar";
	
	abmNuevoConceptoChequeACobrar(inptNuevoConceptoChequeACobrar, accion);
}
function abmNuevoConceptoChequeACobrar(concepto , accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("concepto", concepto)


	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmChequeACobrar.php",
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
					document.getElementById('inptNuevoConceptoChequeACobrar').value="";
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					buscarConceptoChequeACobrar()
					verCerrarAbmNuevoConceptoChequeACobrar()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});


}

function renderizarOpcionesConceptoChequeACobrar(idContenedor, registros) {
	var contenedor = document.getElementById(idContenedor);
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
		opcion.value = registro.descripcion || "";
		opcion.textContent = registro.descripcion || "";
		opcion.setAttribute("data-codigo", registro.codigo || "");
		contenedor.appendChild(opcion);
	});
}

function buscarConceptoChequeACobrar() {

	document.getElementById("ListConceptoChequeACobrar").innerHTML = ""
	// document.getElementById("ListChequeACobrarCargarPagoConcepto").innerHTML = ""

	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"formato": "json",
		"funt": "buscaroptionConcepto"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmChequeACobrar.php",
		type: "post",
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("ListConceptoChequeACobrar").innerHTML = ''
			// document.getElementById("ListChequeACobrarCargarPagoConcepto").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("ListConceptoChequeACobrar").innerHTML = ''
			// document.getElementById("ListChequeACobrarCargarPagoConcepto").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					renderizarOpcionesConceptoChequeACobrar("ListConceptoChequeACobrar", datos_buscados)
					// document.getElementById("ListChequeACobrarCargarPagoConcepto").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
