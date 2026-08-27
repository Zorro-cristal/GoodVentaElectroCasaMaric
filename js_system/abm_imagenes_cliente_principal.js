//ABM IMAGENES CLIENTE PRINCIPAL
var listadoFotosClientePrincipal=null;
var codigoImagenClientePrincipalSeleccionada="";

function obtenerCabeceraFotosClientePrincipal(){
	var cuerpo=document.getElementById("table_abm_imagen_clientesPrincipal");
	if(!cuerpo){return null;}
	var cabecera=cuerpo.previousElementSibling;
	while(cabecera && cabecera.tagName!=="TABLE"){cabecera=cabecera.previousElementSibling;}
	if(!cabecera){return null;}
	cabecera.id="cabeceraFotosClientePrincipal";
	return cuerpo;
}

function crearCeldaFotoClientePrincipal(fila,id,valor,ancho,oculta){
	var celda=document.createElement("td");
	if(id){celda.id=id;}
	if(oculta){celda.style.display="none";}
	else if(ancho){celda.style.width=ancho;}
	celda.textContent=valor==null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function crearFilaFotoClientePrincipal(registro,columnas,utilidades,indice){
	var tabla=document.createElement("table");
	tabla.id=registro.codigo_fila || stringGenerador(5);
	tabla.className=indice%2 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border","1");
	tabla.setAttribute("cellspacing","1");
	tabla.setAttribute("cellpadding","5");
	var fila=document.createElement("tr");
	fila.id="tbSelecRegistroImagen";
	fila.setAttribute("name",registro.es_temporal ? "tdDetalleItemImagenPrincipal" : "tdBDClienteFoto");
	fila.addEventListener("click",function(){SeleccionarItemImagenPrincipal(fila);});
	crearCeldaFotoClientePrincipal(fila,"td_id_1",registro.codigo_fila,"",true);
	crearCeldaFotoClientePrincipal(fila,"td_id_2",registro.id_documento,"",true);
	crearCeldaFotoClientePrincipal(fila,"td_id_3",registro.id_cliente,"",true);
	crearCeldaFotoClientePrincipal(fila,"td_datos_1",registro.es_temporal ? registro.archivo_base64 : registro.url,"",true);
	crearCeldaFotoClientePrincipal(fila,"td_datos_2",registro.extension || "","",true);
	crearCeldaFotoClientePrincipal(fila,"td_datos_3",registro.url_temporal || "","",true);
	crearCeldaFotoClientePrincipal(fila,"","IMAGEN","20%",false);
	crearCeldaFotoClientePrincipal(fila,"td_datos_4",registro.descripcion,"60%",false);
	crearCeldaFotoClientePrincipal(fila,"td_datos_5",registro.fecha,"20%",false);
	tabla.appendChild(fila);
	return tabla;
}

function restaurarSeleccionFotoClientePrincipal(cuerpo){
	elementoimagenseleccionadoPrincipal="";
	if(!codigoImagenClientePrincipalSeleccionada){return;}
	var filas=cuerpo.querySelectorAll('tr[id="tbSelecRegistroImagen"]');
	Array.prototype.forEach.call(filas,function(fila){
		var celda=fila.querySelector('td[id="td_id_1"]');
		if(celda && celda.textContent===codigoImagenClientePrincipalSeleccionada){
			fila.className="tableRegistroSelec";
			elementoimagenseleccionadoPrincipal=fila;
		}
	});
}

function iniciarListadoFotosClientePrincipal(){
	if(listadoFotosClientePrincipal || !window.AbmListadoCore){return listadoFotosClientePrincipal;}
	if(!obtenerCabeceraFotosClientePrincipal()){return null;}
	listadoFotosClientePrincipal=window.AbmListadoCore.crear({
		nombre:"fotos_cliente_principal",
		idCabecera:"cabeceraFotosClientePrincipal",
		idCuerpo:"table_abm_imagen_clientesPrincipal",
		columnas:[
			{campo:"archivo",titulo:"ARCHIVO",ancho:"20%"},
			{campo:"descripcion",titulo:"DESCRIPCION",ancho:"60%"},
			{campo:"fecha",titulo:"FECHA",ancho:"20%"}
		],
		crearFila:crearFilaFotoClientePrincipal,
		despuesRender:restaurarSeleccionFotoClientePrincipal
	});
	listadoFotosClientePrincipal.iniciar();
	return listadoFotosClientePrincipal;
}

function verCerrarAbmCargarFotosClientePrincipal(d){
	if(d=="1"){
		if(controlacceso("VERCARGARFOTOSCLIENTE","accion")==false){return;}
		document.getElementById("divAbmCargarFotosClientePrincipal").style.display = "";
		mostrarSoloUno("divAbmCargarFotosClientePrincipal")	
		LimpiarCamposCargarFotosClientePrincipal()
	}else{
		
		document.getElementById("divAbmCargarFotosClientePrincipal").style.display="none"
	}
}


function minimizarFotosCliente(){
 	$("div[id=divAbmCargarFotosClientePrincipal]").fadeOut(500);	
	document.getElementById("divMinimizadoImagenesCliente").style.display=""
	copiarBotonEnContenedor(document.getElementById("divMenuImagenesCliente"));
}


function ExploradorArchivoClientesPrincipal(File){	
$("input[id="+File+"]").click();
}
var archivoPrincipal="";
var extensionPrincipal="";	
var urlarchivopdfPrincipal="";


function readFileDocPrincipal(input){
var file=$("input[name="+input.name+"]")[0].files[0];
if (!file) {
	return false;
}
urlarchivopdfPrincipal = URL.createObjectURL(file);
var filename= file.name;
var tamanho = file.size;
if (tamanho > 5000000){
ver_vetana_informativa("EL DOCUMENTO NO PUEDE EXCEDER LOS 5Mb")
return false
}
file_extension=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
if ((file_extension.toLowerCase()=="jpeg") || (file_extension.toLowerCase()=="jpg") || (file_extension.toLowerCase()=="png")){
}else{
ver_vetana_informativa("LA IMAGEN SELECCIONADO DEBE TENER UNA EXTENSIÓN JPEG, JPG O PNG")
return false;
}
var readerPrincipal = new FileReader();
readerPrincipal.onload = function(e){
	extensionPrincipal = file_extension;
	archivoPrincipal = e.target.result;
	document.getElementById("text-carga-2Principal").style.display=""
	document.getElementById("text-cargaPrincipal").style.display="none"
	var nombreArchivo = document.getElementById("nombre-archivo-imagenprincipal");
	if (nombreArchivo) {
		nombreArchivo.textContent = filename;
		nombreArchivo.title = filename;
	}
		
	document.getElementById("btnAddImagenPrincipal").style.backgroundColor = "";
	document.getElementById("btnEliminarImagenPrincipal").style.backgroundColor = "#d5d3d3";
	document.getElementById("btnVerImagenClientePrincipal").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroImagenPrincipal]").each(function(i, td){
	td.className=''
});	
	elementoimagenseleccionadoPrincipal="";
	codigoImagenClientePrincipalSeleccionada="";
	
	document.getElementById("file_2Principal").value="";
}
readerPrincipal.readAsDataURL(input.files[0]);
}





var Cod_clienteFotoFK = '';
function AddCargarFotosClientePrincipal(){
  	var codigo=stringGenerador(5);
	if(archivoPrincipal ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
 
	
	if(Cod_clienteFotoFK == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN CLIENTE")
		return;
	}
	
	var descripcion = document.getElementById("inptDescripcionCargarFotosClientesPrincipal").value
	
	let fecha = document.getElementById('inptFechaCargarFotosClientePrincipal').value
	
	if(fecha == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA FECHA")
		return;
	}
	
	if(descripcion == ""){
		ver_vetana_informativa("FALTÓ INGRESAR UNA DESCRIPCION")
		return;
	}
	
	var registro={
		codigo_fila:codigo,
		id_documento:"",
		id_cliente:"",
		url:"",
		archivo:"IMAGEN",
		descripcion:descripcion,
		fecha:fecha,
		extension:extensionPrincipal,
		url_temporal:urlarchivopdfPrincipal,
		archivo_base64:archivoPrincipal,
		es_temporal:true
	};
	var listado=iniciarListadoFotosClientePrincipal();
	if(listado){
		listado.establecerRegistros([registro],true);
	}else{
		document.getElementById("table_abm_imagen_clientesPrincipal").appendChild(crearFilaFotoClientePrincipal(registro,[],null,0));
	}
document.getElementById("btnAddImagenPrincipal").style.backgroundColor = "#d5d3d3";

document.getElementById('inptDescripcionCargarFotosClientesPrincipal').value=""
document.getElementById('inptFechaCargarFotosClientePrincipal').value=""
document.getElementById('text-cargaPrincipal').style.display=""
document.getElementById('text-carga-2Principal').style.display="none"
var nombreArchivo = document.getElementById("nombre-archivo-imagenprincipal");
if (nombreArchivo) {
	nombreArchivo.textContent = "Archivo seleccionado correctamente";
	nombreArchivo.removeAttribute("title");
}

archivoPrincipal = "";
extensionPrincipal = "";
$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});

VerificarCargarFotosClientePrincipal(Cod_clienteFotoFK);


}





var elementoimagenseleccionadoPrincipal="";
function actualizarVistaPreviaImagenCliente(url) {
	var imagen = document.getElementById("vistaPreviaImagenClienteImg");
	var vacia = document.getElementById("vistaPreviaImagenClienteVacia");
	if (!imagen || !vacia) { return; }
	if (url) {
		imagen.src = url;
		imagen.style.display = "block";
		vacia.style.display = "none";
	} else {
		imagen.removeAttribute("src");
		imagen.style.display = "none";
		vacia.style.display = "";
	}
}
function SeleccionarItemImagenPrincipal(datostr) {
	elementoimagenseleccionadoPrincipal = datostr
	codigoImagenClientePrincipalSeleccionada=$(datostr).children('td[id="td_id_1"]').text();
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
		
	   });
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarImagenPrincipal").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerImagenClientePrincipal").style.backgroundColor = "#2196F3";
	

	document.getElementById("btnAddImagenPrincipal").style.backgroundColor = "#d5d3d3";
	archivoPrincipal = "";
	extensionPrincipal = "";
	var urlVistaPrevia = $(datostr).children('td[id="td_id_2"]').text() == ""
		? $(datostr).children('td[id="td_datos_3"]').text()
		: $(datostr).children('td[id="td_datos_1"]').text();
	actualizarVistaPreviaImagenCliente(urlVistaPrevia);
}

function VerificarCargarFotosClientePrincipal(idabm){
	var control=0;
	$("tr[name=tdDetalleItemImagenPrincipal]").each(function(i, elementohtml){
	if($(elementohtml).children('td[id="td_id_2"]').text()==""){
		control++;
	}
	});
	   
	   if(control==0){
		/* ver_vetana_informativa("FALTA AGREGAR DOCUMENTO(S) PARA GUARDAR") */
		return
	   }
	   
	   var accion = "";
	   /* if(controlacceso("INSERTARLICITACION","accion")==false){return;} */
		accion = "addImagenes";
	AbmCargarFotosClientePrincipal(accion,idabm);
}
function AbmCargarFotosClientePrincipal(accion,idAbmCliente){
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	
	var control=1
	$("tr[name=tdDetalleItemImagenPrincipal]").each(function(i, elementohtml){
			
			if($(elementohtml).children('td[id="td_id_2"]').text()==""){
			var archivo=$(elementohtml).children('td[id="td_datos_1"]').text();
			datos.append("archivo"+control, archivo)
			
			var extension=$(elementohtml).children('td[id="td_datos_2"]').text();
			datos.append("ext"+control, extension)
			
			var descripcion=$(elementohtml).children('td[id="td_datos_4"]').text();
			datos.append("descripcion"+control, descripcion)
	   
			var fecha=$(elementohtml).children('td[id="td_datos_5"]').text();
			datos.append("fecha"+control, fecha)

			control=control+1;
			}
	   });
	
	
	 control=control-1;
	 console.log("Cantidad registro:"+control);
	 
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idclientefk", idAbmCliente)
	datos.append("totalregistro", control)
	
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
					
					buscarFotosClientePrincipal(idAbmCliente)
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

function VerCargarFotosClientePrincipal(d){
	
	if(elementoimagenseleccionadoPrincipal == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
	
	if(d == "1"){
	document.getElementById('divVistaDocumento').style.display = ""
	if($(elementoimagenseleccionadoPrincipal).children('td[id="td_id_2"]').text()==""){
		document.getElementById("docVisor").setAttribute('src',$(elementoimagenseleccionadoPrincipal).children('td[id="td_datos_3"]').text());
	}else{
		document.getElementById("docVisor").setAttribute('src',$(elementoimagenseleccionadoPrincipal).children('td[id="td_datos_1"]').text());
	}
	
	}else{
		document.getElementById('divVistaDocumento').style.display = "none"
		document.getElementById("docVisor").setAttribute('src',"");
	}
	
}

function EliminarCargarFotosClientePrincipal() {
//Comprobar si hay algun elemento cargado en el div o de otra forma si exiten registros
	var control=0;
$("tr[name=tdBDClienteFoto]").each(function(i, elementohtml){
control++;
});


//Si no exiten registros vaciar elementodetalleseleccionado
if(control == 0){
	elementoimagenseleccionadoPrincipal = ""
}
	
	//Comprobar si existen algun elemento seleccionado
	if(elementoimagenseleccionadoPrincipal == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN ARCHIVO PARA ELIMINAR")
		return;
	}
	
	var urlarchivo = $(elementoimagenseleccionadoPrincipal).children('td[id="td_datos_1"]').text()
	var iddocumento = $(elementoimagenseleccionadoPrincipal).children('td[id="td_id_2"]').text()
	var idcontrato = $(elementoimagenseleccionadoPrincipal).children('td[id="td_id_3"]').text()
	
	if(iddocumento != ""){
		EliminarArchivoPrincipal(iddocumento,urlarchivo,idcontrato)
	}
	
	//Obtener la ID del registro
		var cod_table=$(elementoimagenseleccionadoPrincipal).children('td[id="td_id_1"]').text()
		if(listadoFotosClientePrincipal){
			listadoFotosClientePrincipal.estado.registros=listadoFotosClientePrincipal.estado.registros.filter(function(registro){return String(registro.codigo_fila)!==String(cod_table);});
			listadoFotosClientePrincipal.dibujar();
		}else{
			var tablaEliminar=document.getElementById(cod_table);
			if(tablaEliminar && tablaEliminar.parentNode){tablaEliminar.parentNode.removeChild(tablaEliminar);}
		}
		
		
		//Restaurar los botones y vaciar elementodetalleseleccionado
		document.getElementById("btnEliminarImagenPrincipal").style.backgroundColor = "#d5d3d3";
		document.getElementById("btnVerImagenClientePrincipal").style.backgroundColor = "#d5d3d3";
		elementoimagenseleccionadoPrincipal="";
		codigoImagenClientePrincipalSeleccionada="";

}
function EliminarArchivoPrincipal(iddocumento,urldocumento,idcliente){
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	
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
		"funt": "eliminardocumento"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
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
function LimpiarCamposCargarFotosClientePrincipal(){
	document.getElementById("btnAddImagenPrincipal").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarImagenPrincipal").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerImagenClientePrincipal").style.backgroundColor="#d5d3d3";
	document.getElementById("inptDescripcionCargarFotosClientesPrincipal").value=""
	document.getElementById("inptNombreClientesFotoPrincipal").value = ""
	document.getElementById("text-cargaPrincipal").style.display=""
	document.getElementById("text-carga-2Principal").style.display="none"
	var nombreArchivo = document.getElementById("nombre-archivo-imagenprincipal");
	if (nombreArchivo) {
		nombreArchivo.textContent = "Archivo seleccionado correctamente";
		nombreArchivo.removeAttribute("title");
	}
	elementoimagenseleccionadoPrincipal =""
	codigoImagenClientePrincipalSeleccionada=""
	archivoPrincipal="";
	extensionPrincipal = "";
	urlarchivopdfPrincipal="";
	actualizarVistaPreviaImagenCliente("");
	Cod_clienteFotoFK =""
	var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
	document.getElementById('inptFechaCargarFotosClientePrincipal').value = f.getFullYear() + "-" + mes + "-" + dia;
}
function buscarFotosClientePrincipal(cod_CLienteFOtoFK){
	var listado=iniciarListadoFotosClientePrincipal();
	codigoImagenClientePrincipalSeleccionada="";
	elementoimagenseleccionadoPrincipal="";
	if(listado){listado.establecerRegistros([]);}
	document.getElementById("table_abm_imagen_clientesPrincipal").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcliente": cod_CLienteFOtoFK,
		"formato": listado ? "json" : "html",
		"funt": "buscarDocumentosPrincipal"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_imagen_clientesPrincipal").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_imagen_clientesPrincipal").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_abm_imagen_clientesPrincipal").innerHTML = datos[2] || "";
					}
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
 
function ControlFotosCliente(inp){
	
	let cod = ""
	$("input[id=inptNombreClientesFotoPrincipal]").each(function (i, Elemento) {
      var $input = $(this),
          val = $input.val();
		 
          list = $input.attr('list'),
          match = $('#'+list + ' option').filter(function() {
              return ($(this).val() === val);			 
          });

       if(match.length > 0) {
         cod=$(match).attr("id")
       } else {
           // value is not in list
       }
});
	
	if(cod!=""){
		buscarFotosClientePrincipal(cod)
		
	}
	
	
	
	}
 
function buscarDataListCliente() {
	
	// document.getElementById("ListCliente").innerHTML = ""
	// document.getElementById("ListClienteVistaGaleria").innerHTML = ""
	// document.getElementById("ListArchivosCliente").innerHTML = ""
	
	
	verCerrarEfectoCargando("1")
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"funt": "buscarDatalis"
	};
	$.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		
		
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			verCerrarEfectoCargando("2")
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			verCerrarEfectoCargando("2")
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				
					 Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					datos_buscados = datos["2"];
					 
					// document.getElementById("ListCliente").innerHTML  = datos["2"];		 
					// document.getElementById("ListClienteVistaGaleria").innerHTML  = datos["2"];		 
					// document.getElementById("ListArchivosCliente").innerHTML  = datos["2"];		 
					
				}
				
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
 
 var cod_cliente_galeria = '';
function agregarCeldaOcultaGaleriaFoto(fila,id,valor){
	var celda=document.createElement("td");
	celda.id=id;
	celda.style.display="none";
	celda.textContent=valor==null ? "" : String(valor);
	fila.appendChild(celda);
}

function renderizarGaleriaFotosCliente(registros){
	var destino=document.getElementById("table_frm_VistaGaleria");
	if(!destino){return;}
	destino.textContent="";
	var fragmento=document.createDocumentFragment();
	(registros || []).forEach(function(registro){
		var tarjeta=document.createElement("div");
		tarjeta.className="divFloat2";
		tarjeta.style.width="24%";
		tarjeta.style.margin="4px";
		var centro=document.createElement("center");
		var tabla=document.createElement("table");
		tabla.className="divMenub2";
		tabla.id=registro.codigo_fila;
		tabla.style.width="100%";
		tabla.style.height="230px";
		tabla.style.border="1px solid #aba6a6";
		var fila=document.createElement("tr");
		fila.id="tbSelecRegistroImagen";
		fila.addEventListener("click",function(){SeleccionarItemImagenGaleriaFoto(fila);});
		var contenido=document.createElement("td");
		var imagen=document.createElement("div");
		imagen.className="imgFotoCi";
		imagen.style.backgroundImage='url("'+String(registro.url || "").replace(/["\\\n\r]/g,"")+'")';
		contenido.appendChild(imagen);
		var textos=document.createElement("center");
		var descripcion=document.createElement("p");
		descripcion.className="pTituloC";
		descripcion.textContent=registro.descripcion || "";
		var fecha=document.createElement("p");
		fecha.className="pTituloC";
		fecha.textContent=registro.fecha || "";
		textos.appendChild(descripcion);
		textos.appendChild(fecha);
		contenido.appendChild(textos);
		fila.appendChild(contenido);
		agregarCeldaOcultaGaleriaFoto(fila,"td_id_1",registro.codigo_fila);
		agregarCeldaOcultaGaleriaFoto(fila,"td_id_2",registro.id_documento);
		agregarCeldaOcultaGaleriaFoto(fila,"td_id_3",registro.id_cliente);
		agregarCeldaOcultaGaleriaFoto(fila,"td_datos_1",registro.url);
		agregarCeldaOcultaGaleriaFoto(fila,"td_datos_2",registro.descripcion);
		agregarCeldaOcultaGaleriaFoto(fila,"td_datos_3",registro.fecha);
		tabla.appendChild(fila);
		centro.appendChild(tabla);
		tarjeta.appendChild(centro);
		fragmento.appendChild(tarjeta);
	});
	destino.appendChild(fragmento);
}

function buscarVistaGaleriaFoto(){



if(cod_cliente_galeria == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN CLIENTE")
		return;
	}

	var descripcion = document.getElementById("inptBuscarFotoGaleriaDescripcion").value
	
	document.getElementById("table_frm_VistaGaleria").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcliente": cod_cliente_galeria,
		"descripcion": descripcion,
		"formato": "json",
		"funt": "buscarDocumentosGaleriaFoto"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_frm_VistaGaleria").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_frm_VistaGaleria").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(Array.isArray(datos[2])){
						renderizarGaleriaFotosCliente(datos[2]);
					}else{
						document.getElementById("table_frm_VistaGaleria").innerHTML = datos[2] || "";
					}
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}
 
function verCerrarAbmVistaGaleria(){
if(document.getElementById("divFrmVistaGaleria").style.display==""){
 
	$("div[id=divFrmVistaGaleria]").fadeOut(500);	

}else{	
 
	document.getElementById("divFrmVistaGaleria").style.display=""
     
}
}


function SeleccionarItemImagenGaleriaFoto(datostr) {
	var elementoimagenseleccionadoGaleriaFoto = datostr
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
		
	   });
	datostr.className='tableRegistroSelec'	
	
	
	if(elementoimagenseleccionadoGaleriaFoto == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
	 
	document.getElementById('divVistaDocumento').style.display = ""
	if($(elementoimagenseleccionadoGaleriaFoto).children('td[id="td_id_2"]').text()==""){
		document.getElementById("docVisor").setAttribute('src',$(elementoimagenseleccionadoGaleriaFoto).children('td[id="td_datos_3"]').text());
	}else{
		document.getElementById("docVisor").setAttribute('src',$(elementoimagenseleccionadoGaleriaFoto).children('td[id="td_datos_1"]').text());
	}
	
	 
	
	
	
	
	 
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciarListadoFotosClientePrincipal);
else iniciarListadoFotosClientePrincipal();



