/*
ABM Puntos
*/
var idAbmPuntos=""; 
var listadoAbmPuntos=null;
function iniciarListadoAbmPuntos(){
	if(listadoAbmPuntos || !window.AbmListadoCore){return listadoAbmPuntos;}
	var cuerpo=document.getElementById("divBuscadorPuntos");
	if(!cuerpo){return null;}
	var cabecera=cuerpo.previousElementSibling;
	if(!cabecera || cabecera.tagName!=="TABLE"){return null;}
	cabecera.id="cabeceraAbmPuntos";
	listadoAbmPuntos=window.AbmListadoCore.crear({
		nombre:"puntos",idCabecera:"cabeceraAbmPuntos",idCuerpo:"divBuscadorPuntos",ordenInicial:"punto",
		columnas:[{campo:"punto",titulo:"PUNTOS",ancho:"100%"}],
		fila:{funcionSeleccion:"ObtenerdatosAbmPuntos",celdas:[
			{id:"td_id",campo:"codigo",tecnica:true},
			{id:"td_datos_1",campo:"punto",columna:"punto",className:"tdRegistroSearch"}
		]}
	});
	listadoAbmPuntos.iniciar();
	return listadoAbmPuntos;
}
function verCerrarFrmPuntos(d,v){
	if(d=="1"){
		
		 if(controlacceso("INGRESARPUNTOSPRODUCTO","accion")==false){return;}
		$("div[id=divAbmPuntos]").fadeIn(500);
		 
		BuscarAbmPuntos()
	}else{
		$("div[id=divAbmPuntos]").fadeOut(500);
	}
}
function LimpiarCamposPuntos(){
	document.getElementById("inptdetallePuntos").value=""; 
	document.getElementById("btnPuntos1").value="Guardar Datos"
	 document.getElementById("btnElPuntos1").style.display="mome"
	idAbmPuntos=""; 
}
function ObtenerdatosAbmPuntos(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});		 
	datostr.className = 'tableRegistroSelec'
    document.getElementById("inptdetallePuntos").value = $(datostr).children('td[id="td_datos_1"]').html(); 
	idAbmPuntos = $(datostr).children('td[id="td_id"]').html();
     document.getElementById("btnPuntos1").value="Editar Datos"
     document.getElementById("btnElPuntos1").style.display=""
}
 
function VerificarDatosPuntos(){
	var inptdetallePuntos = document.getElementById("inptdetallePuntos").value 
	if(inptdetallePuntos==""){
		document.getElementById("inptdetallePuntos").focus()
		ver_vetana_informativa("Falto Ingresar el nombre")
		return
	}
	 	
	var accion = "";
	if (idAbmPuntos != "") {		
		accion = "editar";
	} else {
		accion = "nuevo";
	}
	AbmPuntos(inptdetallePuntos, idAbmPuntos,accion)
}
function AbmPuntos(puntos, idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("puntos", puntos) 
	datos.append("cod_productoFK", idAbmProducto) 
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMPuntos.php",
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
					LimpiarCamposPuntos()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					BuscarAbmPuntos()
					 
				}
			try {} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function BuscarAbmPuntos() {
	var listado=iniciarListadoAbmPuntos();
	document.getElementById("divBuscadorPuntos").innerHTML = paginacargando 
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idAbmProducto, 
		"formato": "json",
		"funt": "buscar"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMPuntos.php",
		type: "post",
		 
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorPuntos").innerHTML = '' 
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorPuntos").innerHTML = '' 
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado){listado.establecerRegistros(Array.isArray(datos[2]) ? datos[2] : []);}
				   
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
	}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciarListadoAbmPuntos);
else iniciarListadoAbmPuntos();
 
 
 
function EliminarDatosPuntos(){
	 
	 accion = "eliminar";
 
	AbmPuntos("0", idAbmPuntos,accion)
}






