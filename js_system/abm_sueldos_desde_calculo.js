/* 
ABM SUELDOS DESDE CALCULO
*/

function verCerrarAbmSueldoDesdeCalculo(){ 
	if(document.getElementById("divAbmSueldoDesdeCalculo").style.display==""){
		$("div[id=divAbmSueldoDesdeCalculo]").fadeOut(500);
		limpiarcamposSueldoDesdeCalculo()		
	}else{
		
	

var totalacobrar=QuitarSeparadorMilValor(document.getElementById("inptTotalaCobrarSalarios").value)	
var motoCobrado=QuitarSeparadorMilValor(document.getElementById("inptTotalaCobradoSalarios").value)	
var montoextra=QuitarSeparadorMilValor(document.getElementById("inptTotalExtraSalarios").value)	

 
var Resultado= Number(totalacobrar) - Number(motoCobrado)
document.getElementById("inptMontoSueldoDesdeCalculo").value= separadordemilesnumero(Resultado)
document.getElementById("inptMontoExtraDesdeCalculo").value= separadordemilesnumero(montoextra)
document.getElementById("inptSeleccFuncionariosueldoDesdeCalculo").value= NombrefuncionarioSalario
	
if(Resultado==0 || Resultado==""){
	ver_vetana_informativa("MONTO NO VALIDO ")
	return false;
}
		
		var f = new Date();
	var dia = f.getDate()
	if (dia < 10) {
		dia = "0" + dia;
	}
	var mes = f.getMonth() + 1
	if (mes < 10) {
		mes = "0" + mes;
	}
		document.getElementById("inptFechaSueldoDesdeCalculo").value= f.getFullYear() + "-" + mes + "-" + dia;
				
		document.getElementById("divAbmSueldoDesdeCalculo").style.display=""
	}
}
function verificarcamposSueldoDesdeCalculo() {
	 
	var inptMontoSueldo = document.getElementById('inptMontoSueldoDesdeCalculo').value
	var inptFechaSueldo = document.getElementById('inptFechaSueldoDesdeCalculo').value
	 
	
	if (inptMontoSueldo == "") {
		ver_vetana_informativa("FALTO INGRESAR EL MONTO DEL SUELDO")
		return false;
	}
	if (inptFechaSueldo == "") {
		ver_vetana_informativa("FALTO INGRESAR LA FECHA DEL SUELDO")
		return false;
	}
	if (idFuncionarioSalario == "") {
		ver_vetana_informativa("FALTO INGRESAR SELECCIONAR EL FUNCIONARIO")
		return false;
	}
	var accion = "nuevoSueldoCalculo";
	
	if(controlacceso("INSERTARCARGARSUELDO","accion")==false){return;}
		
	abmsueldoDesdeCalculo(inptMontoSueldo, inptFechaSueldo, idFuncionarioSalario, accion);
}
function abmsueldoDesdeCalculo( sueldo, fecha, idFuncionarioSalario, accion) {
	verCerrarEfectoCargando("1")
	var datos = new FormData();
	obtener_datos_user();
	datos.append("useru", userid)
	datos.append("passu", passuser)
	datos.append("navegador", navegador)
	datos.append("funt", accion)
	datos.append("sueldo", sueldo)
	datos.append("fecha", fecha)
	datos.append("cod_persona", idFuncionarioSalario)
	var OpAjax = $.ajax({
		data: datos,
		url: "/GoodVentaElectroCasaMaric/php_system/abmFuncionarios.php",
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
					limpiarcamposSueldoDesdeCalculo()
					ver_vetana_informativa("DATOS CARGADO CORRECTAMENTE...")
					verCerrarAbmSueldoDesdeCalculo()
				}
			} catch (error) {
				ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR ")
					var titulo="Error: "+error+" \r\n Consola: "+responseText

				GuardarArchivosLog(titulo)
			}
		}
	});

	}

 function limpiarcamposSueldoDesdeCalculo() { 
	document.getElementById('inptMontoSueldoDesdeCalculo').value = "";
	document.getElementById('inptFechaSueldoDesdeCalculo').value = "";

}
 

function imprimirsalario(){
	var detallePaginaSalario="";
	var sumRes="(+)"
	var totalLiquidacion=0;
	var Tipo="";
	 $("div[data-name='imprimirSalario']").each(function (i, elementohtml) {
	  console.log($(elementohtml).attr('id'));   
      console.log($(elementohtml).data('url'));
	
			Tipo=$(elementohtml).data('url');
			sumRes="(+)"
			
	if(Tipo=="ADELANTO" || Tipo=="UNIFORME" || Tipo=="MULTA" || Tipo=="VENTA ANULADO" || Tipo=="VENTA ANULADO" || Tipo=="I.P.S."){
			sumRes="(-)"
			totalLiquidacion= (totalLiquidacion) - Number(Math.round(($(elementohtml).attr('id'))))
		}else{
			totalLiquidacion= (totalLiquidacion) + Number(Math.round(($(elementohtml).attr('id'))))
		}
	  if($(elementohtml).attr('id')!=0){
		detallePaginaSalario+="<div class='reminders' >"
                      +"<ul class='task-list'>"
                         +"<li class='completed'>"
                            +"<div class='task-title'>"
                               +"<i class='bx bx-check-circle'></i>"
                               +"<p>"+sumRes+" "+$(elementohtml).data('url')+"</p>"
                            +"</div>"
							+"<div class='task-title'>"
                                +"<p>"+separadordemilesnumero(Math.round(($(elementohtml).attr('id'))))+" Gs.</p>"
                            +"</div>"
                        +"</li>  	"		
                    +"</ul>"
                +"</div>"
				}
	  });
	 
		ImprimirDetalleSalario(detallePaginaSalario,totalLiquidacion)
	
}


function ImprimirDetalleSalario(detallePaginaSalario,totalLiquidacion){
 
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
  var fechaimpresion=f.getFullYear()+"-"+mes+"-"+dia;
 document.getElementById("divCabeceraImpresiones").innerHTML=""
document.getElementById("divPieImpresiones").innerHTML=""
document.getElementById("tbTitulosImpresiones").innerHTML=""
document.getElementById("tbDatosImpresiones").innerHTML=""

var totalACobrar=document.getElementById('inptTotalaCobrarSalarios').value;
var t=QuitarSeparadorMilValor(totalACobrar);
   totalACobrar=numeroALetras(t, {
  plural: 'GUARANIES',
  singular: 'GUARANIES',
  centPlural: 'GUARANIES',
  centSingular: 'GUARANIES'
});	

var mes=$("select[id=inptMesSalario]").children(":selected").text();
var anho=$("select[id=inptahnoSalario]").children(":selected").text();

 
var pagina = "<center><h1 class='pTituloD' > LIQUIDACION DE SALARIOS "+mes+"/"+anho+"</h1><br></center>"
+"<div class='TableRepor1'>"
+"<table class='' style='width:100%'>"
+"<tr>"
+"<td style='width:33%;text-align:left'>"
+"<p class='pTituloC'><b>Nombre: </b></p>"
+"<p class='pTituloC' >"+NombrefuncionarioSalario+"</p>"
+"</td>"
+"<td style='width:33%;text-align:left'>"
+"<p class='pTituloC'><b>Cargo:</b></p>"
+"<p class='pTituloC' >"+CargofuncionarioSalario+"</p>"
+"</td>"
+"<td style='width:33%;text-align:left'>"
+"<p class='pTituloC'><b>Fecha de impresión</b></p>"
+"<p class='pTituloC' >"+fechaimpresion+"</p>"
+"</td>"
+"</tr>"
+"</table>"
 +"</div><br>"


var paginaPie =" <h1 class='pTituloD' > TOTAL A COBRAR: <b>"+separadordemilesnumero(totalLiquidacion)+" Gs. </b> </h1> "
+"<table class='TableRepor1' style='width:100%'>"
+"<tr>"
+"<td style='width:20%;text-align:left'>"
+"<p class='pTituloC'><b>Total Salario : </b></p>"
+"<p class='pTituloC' >"+ document.getElementById("inptTotalaCobrarSalarios").value+"</p>"
+"</td>"
+"<td style='width:80%;text-align:left'>"
+"<p class='pTituloC'><b>Total en Letras : </b></p>"
+"<p class='pTituloC' >"+totalACobrar +"</p>"
+"</td>"
+"</tr>"
+"</table>"


document.getElementById("divCabeceraImpresiones").innerHTML=pagina
document.getElementById("divPieImpresiones").innerHTML=paginaPie
// document.getElementById("tbTitulosImpresiones").innerHTML=document.getElementById("tdTituloImpreInventario").innerHTML
document.getElementById("tbDatosImpresiones").innerHTML=detallePaginaSalario
 

	
	var documento=document.getElementById("DivImpresiones").innerHTML;

	 localStorage.setItem("reporte", documento);
	   localStorage.setItem("tipo", "reporte");
	 window.open("/GoodVentaElectroCasaMaric/system/reportSalarios.html");

}








