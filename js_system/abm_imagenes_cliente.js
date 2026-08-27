//ABM Imagenes Cliente
var listadoFotosCliente=null;
var codigoImagenClienteSeleccionada="";

function obtenerCabeceraAnteriorImagenCliente(idCuerpo,idCabecera){
	var cuerpo=document.getElementById(idCuerpo);
	if(!cuerpo){return null;}
	var cabecera=cuerpo.previousElementSibling;
	while(cabecera && cabecera.tagName!=="TABLE"){cabecera=cabecera.previousElementSibling;}
	if(!cabecera){return null;}
	cabecera.id=idCabecera;
	return cuerpo;
}

function crearCeldaImagenCliente(fila,id,valor,ancho,oculta){
	var celda=document.createElement("td");
	if(id){celda.id=id;}
	if(oculta){celda.style.display="none";}
	else if(ancho){celda.style.width=ancho;}
	celda.textContent=valor==null ? "" : String(valor);
	fila.appendChild(celda);
	return celda;
}

function crearFilaImagenCliente(registro,columnas,utilidades,indice){
	var tabla=document.createElement("table");
	tabla.id=registro.codigo_fila || stringGenerador(5);
	tabla.className=indice%2 ? "tableRegistroSearch2" : "tableRegistroSearch";
	tabla.setAttribute("border","1");
	tabla.setAttribute("cellspacing","1");
	tabla.setAttribute("cellpadding","5");
	var fila=document.createElement("tr");
	fila.id="tbSelecRegistroImagen";
	fila.setAttribute("name","tdDetalleItemImagen");
	fila.addEventListener("click",function(){SeleccionarItemImagen(fila);});
	crearCeldaImagenCliente(fila,"td_id_1",registro.codigo_fila,"",true);
	crearCeldaImagenCliente(fila,"td_id_2",registro.id_documento,"",true);
	crearCeldaImagenCliente(fila,"td_id_3",registro.id_cliente,"",true);
	crearCeldaImagenCliente(fila,"td_datos_1",registro.es_temporal ? registro.archivo_base64 : registro.url,"",true);
	crearCeldaImagenCliente(fila,"td_datos_2",registro.extension || "","",true);
	crearCeldaImagenCliente(fila,"td_datos_3",registro.url_temporal || "","",true);
	crearCeldaImagenCliente(fila,"","IMAGEN","20%",false);
	crearCeldaImagenCliente(fila,"td_datos_4",registro.descripcion,"60%",false);
	crearCeldaImagenCliente(fila,"td_datos_5",registro.fecha,"20%",false);
	tabla.appendChild(fila);
	return tabla;
}

function restaurarSeleccionImagenCliente(cuerpo){
	elementoimagenseleccionado="";
	if(!codigoImagenClienteSeleccionada){return;}
	var filas=cuerpo.querySelectorAll('tr[id="tbSelecRegistroImagen"]');
	Array.prototype.forEach.call(filas,function(fila){
		var celda=fila.querySelector('td[id="td_id_1"]');
		if(celda && celda.textContent===codigoImagenClienteSeleccionada){
			fila.className="tableRegistroSelec";
			elementoimagenseleccionado=fila;
		}
	});
}

function iniciarListadoFotosCliente(){
	if(listadoFotosCliente || !window.AbmListadoCore){return listadoFotosCliente;}
	if(!obtenerCabeceraAnteriorImagenCliente("table_abm_imagen_clientes","cabeceraFotosCliente")){return null;}
	listadoFotosCliente=window.AbmListadoCore.crear({
		nombre:"fotos_cliente",
		idCabecera:"cabeceraFotosCliente",
		idCuerpo:"table_abm_imagen_clientes",
		columnas:[
			{campo:"archivo",titulo:"ARCHIVO",ancho:"20%"},
			{campo:"descripcion",titulo:"DESCRIPCION",ancho:"60%"},
			{campo:"fecha",titulo:"FECHA",ancho:"20%"}
		],
		crearFila:crearFilaImagenCliente,
		despuesRender:restaurarSeleccionImagenCliente
	});
	listadoFotosCliente.iniciar();
	return listadoFotosCliente;
}

function verCerrarAbmCargarFotosCliente(d){
	if(d=="1"){
		document.getElementById("divAbmCargarFotosCliente").style.display = "";
		/* buscarAbmContratoDocumentos() */
		
	}else{
		document.getElementById("divAbmCargarFotosCliente").style.display="none"
	}
}
function ExploradorArchivoClientes(File){	
$("input[id="+File+"]").click();
}
var archivo="";
var extension="";	
var urlarchivopdf="";
function readFileDoc(input){
var file=$("input[name="+input.name+"]")[0].files[0];
urlarchivopdf = URL.createObjectURL(file);
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
var reader = new FileReader();
reader.onload = function(e){
	extension = file_extension;
	archivo = e.target.result;
	document.getElementById("text-carga-2").style.display=""
	document.getElementById("text-carga").style.display="none"
	
	
	document.getElementById("btnAddImagen").style.backgroundColor = "";
	document.getElementById("btnEliminarImagen").style.backgroundColor = "#d5d3d3";
	document.getElementById("btnVerImagenCliente").style.backgroundColor = "#d5d3d3";
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});
	
	elementoimagenseleccionado="";
	codigoImagenClienteSeleccionada="";
	
	
document.getElementById("file_2").value="";
}
reader.readAsDataURL(input.files[0]);
}
function AddCargarFotosCliente(){
  	var codigo=stringGenerador(5);
	if(archivo ==""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UN ARCHIVO")
		return;
	}
	
	let descripcion = document.getElementById('inptDescripcionCargarFotosClientes').value
	let fecha = document.getElementById('inptFechaCargarFotosCliente').value
	
	if(fecha == ""){
		ver_vetana_informativa("FALTÓ SELECCIONAR UNA FECHA")
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
		extension:extension,
		url_temporal:urlarchivopdf,
		archivo_base64:archivo,
		es_temporal:true
	};
	var listado=iniciarListadoFotosCliente();
	if(listado){
		listado.establecerRegistros([registro],true);
	}else{
		document.getElementById("table_abm_imagen_clientes").appendChild(crearFilaImagenCliente(registro,[],null,0));
	}
document.getElementById("btnAddImagen").style.backgroundColor = "#d5d3d3";

document.getElementById('inptDescripcionCargarFotosClientes').value=""
document.getElementById('inptFechaCargarFotosCliente').value=""
document.getElementById('text-carga').style.display=""
document.getElementById('text-carga-2').style.display="none"

archivo = "";
extension = "";
$("tr[id=tbSelecRegistroImagen]").each(function(i, td){
	td.className=''
});

}
var elementoimagenseleccionado="";
function SeleccionarItemImagen(datostr) {
	elementoimagenseleccionado = datostr
	codigoImagenClienteSeleccionada=$(datostr).children('td[id="td_id_1"]').text();
	$("tr[id=tbSelecRegistroImagen]").each(function(i, td){		
		 td.className=''
		
	   });
	datostr.className='tableRegistroSelec'	
	
	document.getElementById("btnEliminarImagen").style.backgroundColor = "#f32121d1";
	document.getElementById("btnVerImagenCliente").style.backgroundColor = "#2196F3";
	

	document.getElementById("btnAddImagen").style.backgroundColor = "#d5d3d3";
	archivo = "";
	extension = "";
}
function VerificarCargarFotosCliente(idabm){
	var control=0;
	$("tr[name=tdDetalleItemImagen]").each(function(i, elementohtml){
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
	AbmCargarFotosCliente(accion,idabm);
}
function AbmCargarFotosCliente(accion,idAbmCliente){
	
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	
	var control=1
	$("tr[name=tdDetalleItemImagen]").each(function(i, elementohtml){
			
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
					
					buscarFotosCliente()
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
function VerCargarFotosCliente(d){
	
	if(d == "2"){
		document.getElementById('divVistaDocumento').style.display = "none"
		document.getElementById("docVisor").setAttribute('src',"");
		return;
	}
	
	if(elementoimagenseleccionado == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN DOCUMENTO PARA VISUALIZAR")
		return;
	}
	
	if(d == "1"){
	document.getElementById('divVistaDocumento').style.display = ""
	if($(elementoimagenseleccionado).children('td[id="td_id_2"]').text()==""){
		document.getElementById("docVisor").setAttribute('src',$(elementoimagenseleccionado).children('td[id="td_datos_3"]').text());
	}else{
		document.getElementById("docVisor").setAttribute('src',$(elementoimagenseleccionado).children('td[id="td_datos_1"]').text());
	}
	
	}else{
		document.getElementById('divVistaDocumento').style.display = "none"
		document.getElementById("docVisor").setAttribute('src',"");
	}
	
}
function EliminarCargarFotosCliente() {
//Comprobar si hay algun elemento cargado en el div o de otra forma si exiten registros
	var control=0;
$("tr[name=tdDetalleItemImagen]").each(function(i, elementohtml){
control++;
});

//Si no exiten registros vaciar elementodetalleseleccionado
if(control == 0){
	elementoimagenseleccionado = ""
}
	
	//Comprobar si existen algun elemento seleccionado
	if(elementoimagenseleccionado == ""){
		ver_vetana_informativa("FALTO SELECCIONAR UN ARCHIVO PARA ELIMINAR")
		return;
	}
	
	var urlarchivo = $(elementoimagenseleccionado).children('td[id="td_datos_1"]').text()
	var iddocumento = $(elementoimagenseleccionado).children('td[id="td_id_2"]').text()
	var idcontrato = $(elementoimagenseleccionado).children('td[id="td_id_3"]').text()
	
	if(iddocumento != ""){
		EliminarArchivo(iddocumento,urlarchivo,idcontrato)
	}
	
	//Obtener la ID del registro
		var cod_table=$(elementoimagenseleccionado).children('td[id="td_id_1"]').text()
		if(listadoFotosCliente){
			listadoFotosCliente.estado.registros=listadoFotosCliente.estado.registros.filter(function(registro){return String(registro.codigo_fila)!==String(cod_table);});
			listadoFotosCliente.dibujar();
		}else{
			var tablaEliminar=document.getElementById(cod_table);
			if(tablaEliminar && tablaEliminar.parentNode){tablaEliminar.parentNode.removeChild(tablaEliminar);}
		}
		
		
		//Restaurar los botones y vaciar elementodetalleseleccionado
		document.getElementById("btnEliminarImagen").style.backgroundColor = "#d5d3d3";
		document.getElementById("btnVerImagenCliente").style.backgroundColor = "#d5d3d3";
		elementoimagenseleccionado="";
		codigoImagenClienteSeleccionada="";
		/* control = 0;
$("tr[name=tdDetalleItemDoc]").each(function(i, elementohtml){
if($(elementohtml).children('td[id="td_id_2"]').html()==""){
	control++;
}
});

if(control > 0){
	document.getElementById("btnGuardarDocumento").style="background-color:#d5d3d3"
} */
}
function EliminarArchivo(iddocumento,urldocumento,idcliente){
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
function LimpiarCamposCargarFotosCliente(){
	document.getElementById("btnAddImagen").style.backgroundColor="#d5d3d3";
	document.getElementById("btnEliminarImagen").style.backgroundColor="#d5d3d3";
	document.getElementById("btnVerImagenCliente").style.backgroundColor="#d5d3d3";
	document.getElementById("inptDescripcionCargarFotosClientes").value=""
	document.getElementById("inptFechaCargarFotosCliente").value=""
	document.getElementById("text-carga").style.display=""
	document.getElementById("text-carga-2").style.display="none"
	elementoimagenseleccionado =""
	codigoImagenClienteSeleccionada=""
	archivo="";
	extension = "";
	urlarchivopdf="";
}
function buscarFotosCliente(){
	var listado=iniciarListadoFotosCliente();
	codigoImagenClienteSeleccionada="";
	elementoimagenseleccionado="";
	if(listado){listado.establecerRegistros([]);}
	document.getElementById("table_abm_imagen_clientes").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcliente": idAbmCliente,
		"formato": listado ? "json" : "html",
		"funt": "buscarDocumentos"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_abm_imagen_clientes").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_abm_imagen_clientes").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_abm_imagen_clientes").innerHTML = datos[2] || "";
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

/* GEOLOCALIZACION */
var latitudGeo="";
var longitudGeo="";

let latitud="";
let longitud="";

 function ver_cerrar_GeolocalizacionAnterior(d){
	 if(idAbmCliente == ""){
		 ver_vetana_informativa('FALTÓ SELECCIONAR UN REGISTRO')
		 return;
	 }
	document.getElementById('divGeoLocalizacion').style.display='none'
	limpiarGeoLocalizacion()
	if(d=="1"){
		
		buscarGeolocalizacion()
		document.getElementById('divGeoLocalizacion').style.display=''
			

	}
}

function ver_cerrar_Geolocalizacion(d){
	var ventanaGeolocalizacion = document.getElementById('divGeoLocalizacion');
	if (!ventanaGeolocalizacion) {
		ver_vetana_informativa('NO SE ENCONTRO EL FORMULARIO DE UBICACION');
		return;
	}

	if (String(d) !== "1") {
		ventanaGeolocalizacion.style.display = 'none';
		return;
	}

	if(idAbmCliente == ""){
		ver_vetana_informativa('FALTO SELECCIONAR UN REGISTRO');
		return;
	}

	limpiarGeoLocalizacion();

	/*
	 * El formulario principal crea su propio nivel visual. Al montar esta
	 * ventana en body se evita que la geolocalizacion quede detras del ABM.
	 */
	if (ventanaGeolocalizacion.parentNode !== document.body) {
		document.body.appendChild(ventanaGeolocalizacion);
	}
	ventanaGeolocalizacion.style.position = 'fixed';
	ventanaGeolocalizacion.style.inset = '0';
	ventanaGeolocalizacion.style.width = '100vw';
	ventanaGeolocalizacion.style.height = '100vh';
	ventanaGeolocalizacion.style.zIndex = '13000';
	ventanaGeolocalizacion.style.display = 'block';

	buscarGeolocalizacion();

	window.setTimeout(function () {
		if (typeof map !== 'undefined' && map && typeof map.resize === 'function') {
			map.resize();
		}
	}, 100);
}

var latitudCliente="";
var longitudCliente="";
function seleccionarGeolocalizacion(){
	if(placenames==""){
	    
		ver_vetana_informativa("FALTO SELECCIONAR LA UBICACION","abmubicacion")
		return;
	}else{
		
			latitudCliente=latitud
		longitudCliente=longitud
		document.getElementById('inptLocalozacionCliente').value=placenames;
		
		var f = new Date();
	var dia =f.getDate()
	if(dia<10){
		dia="0"+dia;
	}
	var mes =f.getMonth()
	if(mes<10){
		mes="0"+mes;
	}
	var hora =f.getHours()
	if(hora<10){
		hora="0"+hora;
	}
	var min =f.getMinutes()
	if(min<10){
		min="0"+min;
	}
		
	
	document.getElementById('inptFechaLocalizacion').value=f.getFullYear()+"-"+mes+"-"+dia
		
		
	}
}

function buscarGeolocalizacion(){
	
	document.getElementById("divTabGeolocalizacion").innerHTML = ''
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"idcliente": idAbmCliente,
		"funt": "buscarGeolocalizacion"
	};
	$.ajax({
		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
		type: "post",
		beforeSend: function () {
		},
		error: function (jqXHR, textstatus, errorThrowm) {
		manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divTabGeolocalizacion ").innerHTML = ''
		},
		success: function (responseText) {
			
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divTabGeolocalizacion").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
				if (Respuesta == true) {
					var datos_buscados = datos[2];
					document.getElementById("divTabGeolocalizacion").innerHTML = datos_buscados
				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});
}

function VerificarCampoGeoLocalizacion(){
	var inptFechaLocalizacion = document.getElementById('inptFechaLocalizacion').value
	var inptdesclocalizacion = document.getElementById('inptdesclocalizacion').value 
	
	
	var inptLocalozacionCliente = document.getElementById('inptLocalozacionCliente').value
	
	if(inptLocalozacionCliente==""){
		ver_vetana_informativa("FALTO INGRESAR LA UBICACION","abmCliente")
		return
	}
	if(inptdesclocalizacion==""){
		ver_vetana_informativa("FALTO INGRESAR UNA DESCRIPCION","abmCliente")
		return
	}
	
	
	let arr = inptLocalozacionCliente.split(',');
	
	latitudGeo = arr[0]
	longitudGeo =arr[1]

	AbmGeoLocalizacion(inptFechaLocalizacion,inptdesclocalizacion,idAbmCliente)
	
}
function AbmGeoLocalizacion(fecha,descripcion,cod_persona){

	
	
	obtener_datos_user()
	  var datos = new FormData();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "InsertarGeo")
			 datos.append("cod_persona" , cod_persona)
			 datos.append("fecha" , fecha)
			  datos.append("descripcion" , descripcion)
			  datos.append("latitudGeo" , latitudGeo)
			  datos.append("longitudGeo" , longitudGeo)
			 
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					 ver_vetana_informativa("ERROR DE CONEXIÓN","error")

					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
	
	
	try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
		  if (Respuesta=="usuarioincorrecto")
			{
				window.location="/GoodVentaElectroCasaMaric/system/login.html";
				ver_vetana_informativa("USUARIO INCORRECTO VUELVA A INICIAR SESION...","alert")
						return false;
				} 
			if (Respuesta=="bajonivel")
			{
		
				ver_vetana_informativa("NO PUEDES REALIZAR ESTA ACCIÓN...","alert")
						return false;
					} 
			
			if (Respuesta=="camposvacio")
			{
		
				ver_vetana_informativa("FALTO INGRESAR ALGUNOS CAMPOS...","alert")
						return false;
				}
			if (Respuesta=="duplicado")
			{
						ver_vetana_informativa("YA EXISTE UN REGISTRO SIMILAR...","alert")
						return false;
			}
		
		if (Respuesta=="exito")
			{					 
			ver_vetana_informativa("DATOS GUARDADOS...","alert")
			limpiarGeoLocalizacion()
			buscarGeolocalizacion()
			}
			else
			{
			
					 ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR","alert")

			}
			
		
          }catch(error){
					
					alert("Error Fatal: "+error)
					
				}
	
	
					
			}
			});
			
	
}
let CodGeoLocalizacion="";
function obtenerdatosGeoLocalizcion(datostr) {
	$("tr[id=tbSelecRegistro]").each(function (i, td) {
		td.className = ''
	});
	datostr.className = 'tableRegistroSelec'
	CodGeoLocalizacion = $(datostr).children('td[id="td_id_1"]').html();
	LatGeo = $(datostr).children('td[id="td_id_2"]').html();
	LonGeo = $(datostr).children('td[id="td_id_3"]').html();
	
	document.getElementById('btnVerMapaGeo').style.backgroundColor=""
	document.getElementById('btnEliminarMapaGeo').style.backgroundColor="#f96f1e"
   
   
   // VerUbicacionCliente()
   
}

let LatGeo="";
let LonGeo="";
function VerUbicacionCliente(){
	if(LatGeo=="" || LonGeo=="" || LatGeo=="0" || LonGeo == "0"){
		ver_vetana_informativa("ESTE CLIENTE NO CUENTA CON LATITUD Y LONGITUD")
	  return false;

	}
	window.open("https://www.google.com.py/maps/place/"+LatGeo+","+LonGeo)
}



function limpiarGeoLocalizacion(){
	document.getElementById('inptLocalozacionCliente').value=""
	document.getElementById('inptFechaLocalizacion').value=""
	document.getElementById('inptdesclocalizacion').value=""
	
	document.getElementById('btnVerMapaGeo').style.backgroundColor="#9c9e9f"
	document.getElementById('btnEliminarMapaGeo').style.backgroundColor="#9c9e9f"
	
	CodGeoLocalizacion = ""
	LatGeo =  ""
	LonGeo =  ""   
  
}



function EliminarGeoLocalizacion(){

	if(CodGeoLocalizacion==""){
		ver_vetana_informativa("FALTO SELECCIONAR UN REGISTRO")
		return false;
	}
	
	
	obtener_datos_user()
	  var datos = new FormData();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "EliminarGeo")
			 datos.append("CodGeoLocalizacion" , CodGeoLocalizacion)
			 
			var OpAjax= $.ajax({
			
			data: datos,
			url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					 ver_vetana_informativa("ERROR DE CONEXIÓN","error")

					 return false;
			},
			success: function(responseText)
			{
			  
			Respuesta=responseText;			
				console.log(Respuesta)
	
	
	try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		
		  if (Respuesta=="usuarioincorrecto")
			{
				window.location="/GoodVentaElectroCasaMaric/system/login.html";
				ver_vetana_informativa("USUARIO INCORRECTO VUELVA A INICIAR SESION...","alert")
						return false;
				} 
			if (Respuesta=="bajonivel")
			{
		
				ver_vetana_informativa("NO PUEDES REALIZAR ESTA ACCIÓN...","alert")
						return false;
					} 
			
			if (Respuesta=="camposvacio")
			{
		
				ver_vetana_informativa("FALTO INGRESAR ALGUNOS CAMPOS...","alert")
						return false;
				}
			if (Respuesta=="duplicado")
			{
						ver_vetana_informativa("YA EXISTE UN REGISTRO SIMILAR...","alert")
						return false;
			}
		
		if (Respuesta=="exito")
			{					 
			ver_vetana_informativa("DATO ELIMINADO CON EXITO...","alert")
			limpiarGeoLocalizacion()
			buscarGeolocalizacion()
			}
			else
			{
			
					 ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR","alert")

			}
			
		
          }catch(error){
					
					alert("Error Fatal: "+error)
					
				}
	
	
					
			}
			});
			
	
}

function modificarTipoCliente(datos){
	if(controlacceso("CAMBIARTIPOCLIENTE","accion")==false){
		datos.value='FIJO';
		return;	
	}
}

/*
COMPRAS DE CLIENTES
*/
var listadoProductosCompradosCliente=null;
var listadoCuotasCobradasCliente=null;
var listadoCuotasPendientesCliente=null;

function iniciarListadoProductosCompradosCliente(){
	if(listadoProductosCompradosCliente || !window.AbmListadoCore){return listadoProductosCompradosCliente;}
	if(!obtenerCabeceraAnteriorImagenCliente("table_vista_cliente_productos_comprados","cabeceraProductosCompradosCliente")){return null;}
	listadoProductosCompradosCliente=window.AbmListadoCore.crear({
		nombre:"productos_comprados_cliente",
		idCabecera:"cabeceraProductosCompradosCliente",
		idCuerpo:"table_vista_cliente_productos_comprados",
		columnas:[
			{campo:"producto_mostrado",titulo:"NOMBRE",ancho:"20%"},
			{campo:"cantidad",titulo:"CANT.",ancho:"5%"},
			{campo:"precio",titulo:"COSTO",ancho:"10%"},
			{campo:"subtotal",titulo:"TOTAL",ancho:"10%"}
		],
		fila:{atributosFila:{name:"tdDetalleVenta"},celdas:[
			{id:"td_id_1",campo:"cod_producto",tecnica:true},
			{id:"td_id_2",campo:"cod_detalle",tecnica:true},
			{id:"td_datos_1",campo:"producto_mostrado",columna:"producto_mostrado"},
			{id:"td_datos_4",campo:"cantidad_formateada",columna:"cantidad"},
			{id:"td_datos_3",campo:"precio_formateado",columna:"precio"},
			{id:"td_datos_5",campo:"subtotal_formateado",columna:"subtotal"}
		]}
	});
	listadoProductosCompradosCliente.iniciar();
	return listadoProductosCompradosCliente;
}

function iniciarListadoCuotasCobradasCliente(){
	if(listadoCuotasCobradasCliente || !window.AbmListadoCore){return listadoCuotasCobradasCliente;}
	if(!obtenerCabeceraAnteriorImagenCliente("table_clientes_cuotas1","cabeceraCuotasCobradasCliente")){return null;}
	listadoCuotasCobradasCliente=window.AbmListadoCore.crear({
		nombre:"cuotas_cobradas_cliente",
		idCabecera:"cabeceraCuotasCobradasCliente",
		idCuerpo:"table_clientes_cuotas1",
		columnas:[
			{campo:"plazo",titulo:"#",ancho:"5%"},
			{campo:"fecha_vencimiento",titulo:"F. VENC.",ancho:"20%"},
			{campo:"fecha_pago",titulo:"F. PAGO",ancho:"20%"},
			{campo:"dias_atraso",titulo:"D/A",ancho:"5%"},
			{campo:"monto",titulo:"MONTO",ancho:"12%"},
			{campo:"total_interes",titulo:"T. INTERES",ancho:"13%"},
			{campo:"descuento",titulo:"DESCUENTO",ancho:"12%"}
		],
		fila:{
			atributosFila:function(registro){return registro.cancelado ? {style:{textDecoration:"line-through"}} : {};},
			celdas:[
				{campo:"plazo",columna:"plazo"},
				{campo:"fecha_vencimiento",columna:"fecha_vencimiento"},
				{campo:"fecha_pago",columna:"fecha_pago"},
				{campo:"dias_atraso",columna:"dias_atraso"},
				{campo:"monto_formateado",columna:"monto"},
				{campo:"total_interes_formateado",columna:"total_interes"},
				{campo:"descuento_formateado",columna:"descuento"}
			]
		}
	});
	listadoCuotasCobradasCliente.iniciar();
	return listadoCuotasCobradasCliente;
}

function estiloCuotaPendienteCliente(registro){
	if(registro.estilo_fila==="atrasada"){return {style:{backgroundColor:"#313030",color:"#FFEB3B"}};}
	if(registro.estilo_fila==="cancelada"){return {style:{textDecoration:"line-through"}};}
	if(registro.estilo_fila==="pagada"){return {style:{backgroundColor:"#ccc",color:"#000"}};}
	return {};
}

function iniciarListadoCuotasPendientesCliente(){
	if(listadoCuotasPendientesCliente || !window.AbmListadoCore){return listadoCuotasPendientesCliente;}
	if(!obtenerCabeceraAnteriorImagenCliente("table_clientes_cuotas2","cabeceraCuotasPendientesCliente")){return null;}
	listadoCuotasPendientesCliente=window.AbmListadoCore.crear({
		nombre:"cuotas_pendientes_cliente",
		idCabecera:"cabeceraCuotasPendientesCliente",
		idCuerpo:"table_clientes_cuotas2",
		columnas:[
			{campo:"plazo",titulo:"#",ancho:"10%"},
			{campo:"fecha_vencimiento",titulo:"F. VENC.",ancho:"12%"},
			{campo:"dias_atraso",titulo:"D/A",ancho:"10%"},
			{campo:"monto",titulo:"MONTO",ancho:"10%"},
			{campo:"total_interes",titulo:"T. INTERES",ancho:"10%"},
			{campo:"total_pagado",titulo:"PAGADO",ancho:"10%"},
			{campo:"deuda",titulo:"DEUDA",ancho:"10%"}
		],
		fila:{atributosFila:estiloCuotaPendienteCliente,celdas:[
			{campo:"plazo",columna:"plazo"},
			{campo:"fecha_vencimiento",columna:"fecha_vencimiento"},
			{campo:"dias_atraso",columna:"dias_atraso"},
			{campo:"monto_formateado",columna:"monto"},
			{campo:"total_interes_formateado",columna:"total_interes"},
			{campo:"total_pagado_formateado",columna:"total_pagado"},
			{campo:"deuda_formateada",columna:"deuda"}
		]}
	});
	listadoCuotasPendientesCliente.iniciar();
	return listadoCuotasPendientesCliente;
}

var idVentaCuentaCliente="";
function ObtenerdatosCuentaCliente(datostr) {
	idVentaCuentaCliente = $(datostr).children('td[id="td_id"]').text();
	vercerrarvistacuentacliente("1")
	buscarproductoshistorialcliente()
	buscarcreditospagadocliente()
	buscarcreditospendientescliente()	
}
function buscarproductoshistorialcliente() {
	var listado=iniciarListadoProductosCompradosCliente();
	if(listado){listado.establecerRegistros([]);}
	document.getElementById("table_vista_cliente_productos_comprados").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idVentaCuentaCliente,
		"formato": listado ? "json" : "html",
		"funt": "productosCompradoscliente"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmdetalleventa.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_vista_cliente_productos_comprados").innerHTML = ''
		},
		success: function (responseText) {
			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_vista_cliente_productos_comprados").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
			Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {
				
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_vista_cliente_productos_comprados").innerHTML = datos[2] || "";
					}
					document.getElementById("inptNroFacturaCuentaCliente").value = datos[6]
					document.getElementById("inptTotalVentaCuentaCliente").value = datos[3]
					document.getElementById("inptTotalPagadoCuentaCliente").value = datos[4]
					document.getElementById("inptDeudaCuentaCliente").value = datos[5]



				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}
function buscarcreditospagadocliente() {
	var listado=iniciarListadoCuotasCobradasCliente();
	if(listado){listado.establecerRegistros([]);}
	document.getElementById("table_clientes_cuotas1").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idVentaCuentaCliente,
		"formato": listado ? "json" : "html",
		"funt": "cuentasClientesCobrados"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_clientes_cuotas1").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_clientes_cuotas1").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			if (Respuesta == true) {

					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_clientes_cuotas1").innerHTML = datos[2] || "";
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
function buscarcreditospendientescliente() {
	var listado=iniciarListadoCuotasPendientesCliente();
	if(listado){listado.establecerRegistros([]);}
	document.getElementById("table_clientes_cuotas2").innerHTML = paginacargando
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": idVentaCuentaCliente,
		"formato": listado ? "json" : "html",
		"funt": "cuentasClientesPendientes"
	};
	$.ajax({

		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmcreditos.php",
		type: "post",
		
		 
		
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("table_clientes_cuotas2").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("table_clientes_cuotas2").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {

					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("table_clientes_cuotas2").innerHTML = datos[2] || "";
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
function vercerrarvistacuentacliente(d) {
	if (d == "1") {
		document.getElementById("divHistorialCuentaCliente").style.display=""
		 
	} else {
		  
		$("div[id=divHistorialCuentaCliente]").fadeOut(500)
	}
}
/*
NRO FACTURA
*/
var idAbmNroFactura="";
var ElementoSeleccNroFactura="";
var listadoAbmNroFactura = null;
function iniciarListadoAbmNroFactura() {
	if (listadoAbmNroFactura || !window.AbmListadoCore) return listadoAbmNroFactura;
	var cuerpo = document.getElementById('divBuscadorNroFactura');
	if (!cuerpo) return null;
	var cabecera = cuerpo.previousElementSibling;
	while (cabecera && cabecera.tagName !== 'TABLE') cabecera = cabecera.previousElementSibling;
	if (!cabecera) return null;
	cabecera.id = 'cabeceraAbmNroFactura';
	listadoAbmNroFactura = window.AbmListadoCore.crear({
		nombre: 'nro_factura',
		idCabecera: 'cabeceraAbmNroFactura',
		idCuerpo: 'divBuscadorNroFactura',
		ordenInicial: 'punto_expedicion',
		columnas: [
			{ campo: 'punto_expedicion', titulo: 'PUNTO DE EXP.', ancho: '25%' },
			{ campo: 'numero_valor', titulo: 'NRO FACTURA', ancho: '25%' },
			{ campo: 'fecha', titulo: 'FECHA MODIFICACION', ancho: '25%' },
			{ campo: 'local', titulo: 'LOCAL', ancho: '25%' }
		],
		fila: {
			celdas: [
				{ id: 'td_id', campo: 'codigo', tecnica: true },
				{ id: 'td_datos_4', campo: 'punto_expedicion', columna: 'punto_expedicion', className: 'tdRegistroSearch' },
				{ id: 'td_datos_1', campo: 'numero', columna: 'numero_valor', className: 'tdRegistroSearch' },
				{ id: 'td_datos_2', campo: 'fecha', columna: 'fecha', className: 'tdRegistroSearch' },
				{ id: 'td_datos_3', campo: 'local', columna: 'local', className: 'tdRegistroSearch' }
			]
		}
	});
	listadoAbmNroFactura.iniciar();
	return listadoAbmNroFactura;
}
function verCerrarFrmNroFactura(d){
	document.getElementById("divSegundoPlano").style.display="none";
	if(document.getElementById("divAbmNroFactura").style.display==""){
		document.getElementById("divMinimizadoNroFactura").style.display="none"
 
	$("div[id=divAbmNroFactura]").fadeOut(500);	
		LimpiarCamposNroFactura()
	}else{		
	if(controlacceso("VERFACTURASHABILITADAS","accion")==false){return;	}
	mostrarSoloUno("divAbmNroFactura")	
		document.getElementById("divAbmNroFactura").style.display=""
		BuscarAbmNroFactura()
	}
}
function minimizarventafacturanro(){ 
	$("div[id=divAbmNroFactura]").fadeOut(500);	
		document.getElementById("divMinimizadoNroFactura").style.display=""
		copiarBotonEnContenedor(document.getElementById("divMenuAbmFacturas"));
}
function LimpiarCamposNroFactura(){
	document.getElementById("inptNroFactura").value="";		 
var f = new Date();
	var dia =f.getDate()
	if(dia<10){
		dia="0"+dia;
	}
	var mes =f.getMonth()+1
	if(mes<10){
		mes="0"+mes;
	}
	var hora =f.getHours()
	if(hora<10){
		hora="0"+hora;
	}
	var min =f.getMinutes()
	if(min<10){
		min="0"+min;
	}
	 	document.getElementById('inptFechaNroFactura').value=f.getFullYear()+"-"+mes+"-"+dia;
	

	idAbmNroFactura="";

}
function ObtenerdatosAbmNroFactura(datostr) {
	// $("tr[id=tbSelecRegistro]").each(function (i, td) {
		// td.className = ''

	// });
		
	// datostr.className = 'tableRegistroSelec'
    // document.getElementById("inptNroFactura").value = $(datostr).children('td[id="td_datos_1"]').html();
    // document.getElementById("inptFechaNroFactura").value = $(datostr).children('td[id="td_datos_2"]').html();
	// idAbmNroFactura = $(datostr).children('td[id="td_id"]').html();
}
function VerificarDatosNroFactura(){
	var inptNroFactura = document.getElementById("inptNroFactura").value
	var inptFechaNroFactura = document.getElementById("inptFechaNroFactura").value
	var inptlocalNroFactura = document.getElementById("inptlocalNroFactura").value
	var inptCajalNroFactura =$("select[id=inptCajalNroFactura]").children(":selected").text() 

	
	if(inptNroFactura==""){
		document.getElementById("inptNroFactura").focus()
		ver_vetana_informativa("Falto Ingresar el nro de orden")
		return
	}
	if(inptFechaNroFactura==""){
		document.getElementById("inptFechaNroFactura").focus()
		ver_vetana_informativa("Falto seleccionar la fecha")
		return
	}
	
	if(inptlocalNroFactura==""){
		document.getElementById("inptlocalNroFactura").focus()
		ver_vetana_informativa("Falto seleccionar el local")
		return
	}
	
	var accion = "";
	if (idAbmNroFactura != "") {
		
		accion = "editar";
		if(controlacceso("INSERTARFACTURASHABILITADAS","accion")==false){ return;}
	} else {
		if(controlacceso("INSERTARFACTURASHABILITADAS","accion")==false){return;}
		accion = "nuevo";
	}
	AbmNroFactura(inptNroFactura,inptFechaNroFactura,inptlocalNroFactura,inptCajalNroFactura,idAbmNroFactura,accion)
}
function AbmNroFactura(nro,fecha,cod_localfk,nrocaja,idabm,accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("idabm", idabm)
	datos.append("nro", nro)
	datos.append("fecha", fecha)
	datos.append("nrocaja", nrocaja)
	datos.append("cod_localfk", cod_localfk)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/ABMNroFactura.php",
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

					LimpiarCamposNroFactura()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")				
					BuscarAbmNroFactura()


				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
				var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}


		}
	});

}
function BuscarAbmNroFactura() {
	if(controlacceso("BUSCARFACTURASHABILITADAS","accion")==false){ return;}
	var listado = iniciarListadoAbmNroFactura();
	if(listado){listado.establecerRegistros([]);}
	var buscador = ""
	var estado = "Activo"
	document.getElementById("divBuscadorNroFactura").innerHTML = paginacargando
    document.getElementById("lblNroRegistroNroFactura").innerHTML="";
	obtener_datos_user();
	var datos = {
		"useru": userid,
		"passu": passuser,
		"navegador": navegador,
		"buscar": buscador,
		"estado": estado,
		"formato": listado ? "json" : "html",
		"funt": "buscar"
	};
	$.ajax({

		data: datos,
        url: "/GoodVentaElectroCasaMaric/php_system/ABMNroFactura.php",
		type: "post",
		 
		
		beforeSend: function () {


		},
		error: function (jqXHR, textstatus, errorThrowm) {
manejadordeerroresjquery(jqXHR.status,textstatus,"abmventana")
			document.getElementById("divBuscadorNroFactura").innerHTML = ''
			document.getElementById("lblNroRegistroNroFactura").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("divBuscadorNroFactura").innerHTML = ''
			document.getElementById("lblNroRegistroNroFactura").innerHTML = ''
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				 Respuesta=respuestaJqueryAjax(Respuesta)
			   if (Respuesta == true) {
				   
					if(listado && Array.isArray(datos[2])){
						listado.establecerRegistros(datos[2]);
					}else{
						document.getElementById("divBuscadorNroFactura").innerHTML=datos[2] || "";
					}
                   document.getElementById("lblNroRegistroNroFactura").innerHTML="Se encontraron "+datos[3]+" registro(s)";
				   

				}
			} catch (error) {
ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText
				GuardarArchivosLog(titulo)
			}
		}
	});


}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarListadoAbmNroFactura);
else iniciarListadoAbmNroFactura();

function iniciarListadosImagenCliente(){
	iniciarListadoFotosCliente();
	iniciarListadoProductosCompradosCliente();
	iniciarListadoCuotasCobradasCliente();
	iniciarListadoCuotasPendientesCliente();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciarListadosImagenCliente);
else iniciarListadosImagenCliente();


