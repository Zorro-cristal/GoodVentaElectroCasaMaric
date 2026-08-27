//ABM ARCHIVOS CLIENTE
var listadoArchivosCliente = null;

function iniciarListadoArchivosCliente() {
	if (listadoArchivosCliente || !window.AbmListadoCore) { return listadoArchivosCliente; }
	var cuerpo = document.getElementById("table_abm_archivo_cliente");
	var tablaCabecera = cuerpo ? cuerpo.previousElementSibling : null;
	var cabecera = tablaCabecera && tablaCabecera.tagName === "TABLE" ? tablaCabecera.querySelector("tr") : null;
	if (!cuerpo || !cabecera) { return null; }
	cabecera.id = "cabeceraArchivosCliente";
	listadoArchivosCliente = window.AbmListadoCore.crear({
		nombre: "archivos_cliente",
		idCabecera: "cabeceraArchivosCliente",
		idCuerpo: "table_abm_archivo_cliente",
		ordenInicial: "fecha",
		columnas: [
			{ campo: "tipo", titulo: "ARCHIVO", ancho: "20%" },
			{ campo: "descripcion", titulo: "DESCRIPCION", ancho: "60%" },
			{ campo: "fecha", titulo: "FECHA", ancho: "20%" }
		],
		fila: {
			idFila: "tbSelecRegistroArchivo",
			funcionSeleccion: "SeleccionarItemArchivosCliente",
			atributosTabla: function (registro) { return { id: registro.codigo_fila || "" }; },
			atributosFila: { name: "tableRegistroSelec" },
			celdas: [
				{ id: "td_id_1", campo: "codigo_fila", tecnica: true },
				{ id: "td_id_2", campo: "id_archivo", tecnica: true },
				{ id: "td_id_3", campo: "id_cliente", tecnica: true },
				{ id: "td_datos_1", campo: "url", tecnica: true },
				{ campo: "tipo", columna: "tipo" },
				{ id: "td_datos_2", campo: "descripcion", columna: "descripcion" },
				{ id: "td_datos_3", campo: "fecha", columna: "fecha" }
			]
		}
	});
	listadoArchivosCliente.iniciar();
	return listadoArchivosCliente;
}

var CodClien
teArchivo = ""
function verCerrarAbmCargarArchivosCliente(d){
	if(d=="1"){
		if(controlacceso("CARGARARCHIVOSCLIENTE","accion")==false){return;}
		document.getElementById("divAbmCargarArchivosCliente").style.display = "";
		mostrarSoloUno("divAbmCargarArchivosCliente")	
		LimpiarCamposCargarArchivosCliente()
	}else{
		document.getElementById("divAbmCargarArchivosCliente").style.display="none"
	}
}



function minimizarArchivosCliente(){
 	$("div[id=divAbmCargarArchivosCliente]").fadeOut(500);	
	document.getElementById("divMinimizadoArchivosCliente").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuArchivosCliente"));
}



function ExploradorArchivoCliente(File){	
$("input[id="+File+"]").click();
}
var archivopdf="";
var extensionpdf="";	
var urlarchivopdf="";
function readFileDocArchivoCliente(input){
var file=$("input[name="+input.name+"]")[0].files[0];
if (!file) {
	return false;
}
urlarchivopdf = URL.createObjectURL(file);
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension.toLowerCase()=="pdf")){
}else{
ver_vetana_informativa("DEBE SER UN ARCHIVO PDF")
return false;
}
var readerPrincipal = new FileReader();
readerPrincipal.onload = function(e){
	extensionpdf = file_extension;
	archivopdf = e.target.result;
	document.getElementById("text-carga-2-archivoscliente").style.display=""
	document.getElementById("text-carga-archivoscliente").style.display="none"
	var nombreArchivo = document.getElementById("nombre-archivo-archivoscliente");
	if (nombreArchivo) {
		nombreArchivo.textContent = filename;
		nombreArchivo.title = filename;
	}
	
	
	document.getElementById("btnAddArchivosCliente").style.backgroundColor = "";
	document.getElementById("btnEliminarArchivosCliente").style.backgroundColor = "#d5d3d3";
	document.getElementById("btnVerArchivosCliente").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroArchivosCliente]").each(function(i, td){
	td.className=''
});
	
	elementoarchivoseleccionado="";
	
	
document.getElementById("file_ArchivosCliente").value="";
}
readerPrincipal.readAsDataURL(input.files[0]);
}
function AddCargarArchivosCliente(){

	if(archivopdf ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
	
	

	
		// $("input[id=inptNombreClientesArchivosCliente]").each(function (i, Elemento) {
      // var $input = $(this),
          // val = $input.val();
		 
          // list = $input.attr('list'),
          // match = $('#'+list + ' option').filter(function() {
              // return ($(this).val() === val);			 
          // });

       // if(match.length > 0) {
         // CodClienteArchivo=$(match).attr("id")
       // } else {
           // value is not in list
       // }
// });
	
	
	if(CodClienteArchivo == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN CLIENTE")
		return;
	}
	

	
	var descripcion = document.getElementById("inptDescripcionCargarArchivosCliente");
    descripcion = descripcion.options[descripcion.selectedIndex].text;
	
	let fecha = document.getElementById('inptFechaCargarArchivosCliente').value
	
	if(fecha == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA FECHA")
		return;
	}
	
	if(descripcion == "SELECCIONAR"){
		ver_vetana_informativa("FALTÓ INGRESAR UNA DESCRIPCION")
		return;
	}
	

$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});

var accion = "insertarArchivo";
	AbmCargarArchivosCliente(accion,CodClienteArchivo,descripcion,fecha,archivopdf,extensionpdf);
}
var elementoarchivoseleccionado="";
function actualizarVistaPreviaArchivoCliente(url) {
	var frame = document.getElementById("vistaPreviaArchivoClienteFrame");
	var vacia = document.getElementById("vistaPreviaArchivoClienteVacia");
	if (!frame || !vacia) { return; }
	if (url) {
		frame.src = url;
		frame.style.display = "block";
		vacia.style.display = "none";
	} else {
		frame.removeAttribute("src");
		frame.style.display = "none";
		vacia.style.display = "";
	}
}
function SeleccionarItemArchivosCliente(datostr) {
	elementoarchivoseleccionado = datostr
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
	});
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarArchivosCliente").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerArchivosCliente").style.backgroundColor = "#2196F3";
	

	document.getElementById("btnAddArchivosCliente").style.backgroundColor = "#d5d3d3";
	archivopdf = "";
	extensionpdf = "";
	actualizarVistaPreviaArchivoCliente($(datostr).children('td[id="td_datos_1"]').text());
}
function LimpiarCamposCargarArchivosCliente(){
	document.getElementById("btnAddArchivosCliente").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarArchivosCliente").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerArchivosCliente").style.backgroundColor="#d5d3d3";
	document.getElementById("inptDescripcionCargarArchivosCliente").value=""
	document.getElementById("inptNombreClientesArchivosCliente").value=""
	document.getElementById("inptFechaCargarArchivosCliente").value = ""
	document.getElementById("text-carga-archivoscliente").style.display=""
	document.getElementById("text-carga-2-archivoscliente").style.display="none"
	var nombreArchivo = document.getElementById("nombre-archivo-archivoscliente");
	if (nombreArchivo) {
		nombreArchivo.textContent = "Archivo seleccionado correctamente";
		nombreArchivo.removeAttribute("title");
	}
	elementoarchivoseleccionado =""
	archivopdf="";
	extensionpdf = "";
	urlarchivopdf="";
	actualizarVistaPreviaArchivoCliente("");
	document.getElementById('inptFechaCargarArchivosCliente').value = obtenerFechaActual();
	document.getElementById('inptNombreClientesArchivosCliente').value ="";
}
function AbmCargarArchivosCliente(accion,CodClienteArchivo,descripcion,fecha,archivo,ext){
	var datos = new FormData();
	

	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idclientefk", CodClienteArchivo)
	datos.append("descripcion", descripcion)
	datos.append("fecha", fecha)
	datos.append("archivo", archivo)
	datos.append("ext", ext)
	
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					LimpiarCamposCargarArchivosCliente()
					buscarArchivosCliente()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
						var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
function VerCargarArchivoCliente(d){

		
	
	if(elementoarchivoseleccionado == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
		
	window.open(`${$(elementoarchivoseleccionado).children('td[id="td_datos_1"]').html()}`, '_blank');
	
}
function EliminarArchivoCliente(){
	
	obtener_datos_user();
	
	var iddocumento = $(elementoarchivoseleccionado).children('td[id="td_id_2"]').html()
	var urldocumento = $(elementoarchivoseleccionado).children('td[id="td_datos_1"]').html()
	var idcliente = $(elementoarchivoseleccionado).children('td[id="td_id_3"]').html()
	
	let pos=urldocumento.indexOf("/");
	urldocumento = urldocumento.slice(pos+1)
	pos= urldocumento.indexOf("/")
	urldocumento = urldocumento.slice(pos)
	
	
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcliente": idcliente,
		"iddocumento": iddocumento,
		"urldocumento": urldocumento,
		"funt": "eliminardocumentoarchivocliente"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
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
					buscarArchivosCliente()
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
function buscarArchivosCliente(){
	var listado = iniciarListadoArchivosCliente();
	document.getElementById("table_abm_archivo_cliente").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcliente": CodClienteArchivo,
		"formato": "json",
		"funt": "buscarDocumentosCargaArchivo"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_archivo_cliente").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_archivo_cliente").innerHTML = ''
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
function ControlArchivosCliente(inp){
	
	
	CodClienteArchivo = "";
	$("input[id=inptNombreClientesArchivosCliente]").each(function (i, Elemento) {
      var $input = $(this),
          val = $input.val();
		 
          list = $input.attr('list'),
          match = $('#'+list + ' option').filter(function() {
              return ($(this).val() === val);			 
          });

       if(match.length > 0) {
         CodClienteArchivo=$(match).attr("id")
       } else {
           // value is not in list
       }
});


buscarArchivosCliente()
	
	}

