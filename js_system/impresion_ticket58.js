// Un solo formato: logo para impresion termica y texto con saltos reales.
function dividirLineasTicket58(texto){
    var columnas = 30;
    var resultado = [];
    String(texto).split(/\r?\n/).forEach(function(parrafo){
        var linea = "";
        parrafo.trim().split(/\s+/).forEach(function(palabra){
            if(!palabra){ return; }
            var letras = Array.from(palabra);
            if(linea && Array.from(linea).length + 1 + letras.length > columnas){
                resultado.push(linea);
                linea = "";
            }
            while(letras.length > columnas){
                resultado.push(letras.splice(0, columnas).join(""));
            }
            if(letras.length){ linea += (linea ? " " : "") + letras.join(""); }
        });
        if(linea){ resultado.push(linea); }
    });
    return resultado.join("\n");
}

function obtenerTextoTicket58(recibo){
    var lineas = [];
    var selector = ".pTituloTicket1, .pTituloTicket2, .divSeparadorTicket, "
        +".ticket-titulo, .ticket-dato, .ticket-pago > p:not(.ticket-dato), "
        +".ticket-producto > p:not(.ticket-dato)";
    Array.prototype.forEach.call(recibo.querySelectorAll(selector), function(elemento){
        if(elemento.classList.contains("divSeparadorTicket")){
            lineas.push("------------------------------");
            return;
        }
        var imagen = elemento.querySelector("img");
        if(imagen){
            lineas.push(dividirLineasTicket58(imagen.alt || ""));
            return;
        }
        var etiqueta = elemento.querySelector("b");
        var valor = elemento.querySelector("span");
        if(elemento.classList.contains("ticket-dato") && etiqueta && valor){
            lineas.push(dividirLineasTicket58(etiqueta.textContent.trim()+" "+valor.textContent.trim()));
            return;
        }
        var copia = elemento.cloneNode(true);
        Array.prototype.forEach.call(copia.querySelectorAll("br"), function(salto){
            salto.replaceWith(document.createTextNode("\n"));
        });
        lineas.push(dividirLineasTicket58(copia.textContent));
    });
    return lineas.filter(function(linea){ return linea !== ""; }).join("\n");
}

function configurarFormatoTicket58(){
    var recibo = document.querySelector("#divimpr .recibo-ticket-58");
    if(!recibo || recibo.querySelector(".ticket-texto-58")){ return; }
    var texto = obtenerTextoTicket58(recibo);
    var imagen = recibo.querySelector(".pTituloTicket1 img");
    var logo = imagen ? imagen.cloneNode(true) : null;
    recibo.textContent = "";
    if(logo){
        var cabecera = document.createElement("div");
        cabecera.className = "ticket-logo-58";
        cabecera.appendChild(logo);
        recibo.appendChild(cabecera);
    }
    var pre = document.createElement("pre");
    pre.className = "ticket-texto-58";
    pre.textContent = texto;
    recibo.appendChild(pre);
    localStorage.removeItem("ticket58-formato");
}

function esperarImagenTicket58(imagen){
    return new Promise(function(resolve){
        function terminar(){
            imagen.removeEventListener("load", terminar);
            imagen.removeEventListener("error", terminar);
            resolve(imagen.complete && imagen.naturalWidth > 0);
        }
        imagen.addEventListener("load", terminar);
        imagen.addEventListener("error", terminar);
        if(imagen.complete){ terminar(); }
    });
}

function prepararLogoTicket58(){
    var imagen = document.querySelector(".recibo-ticket-58 .ticket-logo-58 img");
    if(!imagen || !imagen.naturalWidth){ return; }
    var original = imagen.src;
    try{
        // 384 puntos en 48 mm corresponden a una imagen de aproximadamente 203 dpi.
        // La copia se usa solo en este ticket; el logo original permanece intacto.
        var canvas = document.createElement("canvas");
        canvas.width = 384;
        canvas.height = Math.max(1, Math.round(384 * imagen.naturalHeight / imagen.naturalWidth));
        var contexto = canvas.getContext("2d");
        if(!contexto){ return; }
        contexto.fillStyle = "#fff";
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height);
        var datos = contexto.getImageData(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < datos.data.length; i += 4){
            var gris = 0.299 * datos.data[i] + 0.587 * datos.data[i+1] + 0.114 * datos.data[i+2];
            var color = gris < 180 ? 0 : 255;
            datos.data[i] = datos.data[i+1] = datos.data[i+2] = color;
            datos.data[i+3] = 255;
        }
        contexto.putImageData(datos, 0, 0);
        imagen.src = canvas.toDataURL("image/png");
        if(imagen.decode){
            return imagen.decode().catch(function(){
                imagen.src = original;
                return esperarImagenTicket58(imagen);
            });
        }
        return esperarImagenTicket58(imagen);
    }catch(error){
        // Si el navegador no permite leer la imagen, conservar el logo existente.
        if(imagen.src !== original){ imagen.src = original; }
        return esperarImagenTicket58(imagen);
    }
}
