(function (global) {
    "use strict";

    var clienteFlujoSeleccionado = 0;
    var offsetFlujoDatos = 0;
    var temporizadorBusquedaFlujo = null;
    var resultadosBusquedaFlujo = [];
    var indiceResultadoFlujo = -1;
    var solicitudBusquedaFlujo = 0;
    var overflowBodyAnteriorFlujo = null;
    var overflowHtmlAnteriorFlujo = null;
    var pagoDetalleFlujoSeleccionado = null;
    var filaReciboReimpresionFlujo = null;

    function abrirFlujoDatosCliente() {
        if (controlacceso("VERFLUJODATOSCLIENTE", "accion") == false) return;
        var ventana = document.getElementById("divFlujoDatosCliente");
        if (!ventana) return;
        if (overflowBodyAnteriorFlujo === null) {
            overflowBodyAnteriorFlujo = document.body.style.overflow;
            overflowHtmlAnteriorFlujo = document.documentElement.style.overflow;
        }
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        ventana.style.display = "";
        var buscador = document.getElementById("buscarClienteFlujoDatos");
        setTimeout(function () {
            if (buscador) buscador.focus();
        }, 80);
    }

    function cerrarFlujoDatosCliente() {
        var ventana = document.getElementById("divFlujoDatosCliente");
        if (ventana) ventana.style.display = "none";
        if (overflowBodyAnteriorFlujo !== null) {
            document.body.style.overflow = overflowBodyAnteriorFlujo;
            document.documentElement.style.overflow = overflowHtmlAnteriorFlujo || "";
            overflowBodyAnteriorFlujo = null;
            overflowHtmlAnteriorFlujo = null;
        }
        ocultarResultadosClienteFlujo();
    }

    function programarBusquedaClienteFlujoDatos(valor) {
        clearTimeout(temporizadorBusquedaFlujo);
        clienteFlujoSeleccionado = 0;
        indiceResultadoFlujo = -1;
        if (String(valor || "").trim() === "") {
            ocultarResultadosClienteFlujo();
            return;
        }
        temporizadorBusquedaFlujo = setTimeout(function () {
            buscarClientesFlujoDatos(valor);
        }, 280);
    }

    function buscarClientesFlujoDatos(valor) {
        var numeroSolicitud = ++solicitudBusquedaFlujo;
        obtener_datos_user();
        $.ajax({
            data: {
                useru: userid,
                passu: passuser,
                navegador: navegador,
                funt: "buscar_clientes",
                buscar: String(valor || "").trim()
            },
            url: "/GoodVentaElectroCasaMaric/php_system/flujo_datos_cliente.php",
            type: "post",
            error: function (jqXHR, textstatus) {
                if (numeroSolicitud !== solicitudBusquedaFlujo) return;
                ocultarResultadosClienteFlujo();
                manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");
            },
            success: function (responseText) {
                if (numeroSolicitud !== solicitudBusquedaFlujo) return;
                try {
                    var respuesta = $.parseJSON(responseText);
                    if (respuestaJqueryAjax(respuesta["1"]) == true) {
                        resultadosBusquedaFlujo = Array.isArray(respuesta["2"]) ? respuesta["2"] : [];
                        renderizarResultadosClienteFlujo();
                    }
                } catch (error) {
                    ocultarResultadosClienteFlujo();
                    GuardarArchivosLog("Error al buscar clientes en Flujo de Datos: " + error + " \r\n Consola: " + responseText);
                }
            }
        });
    }

    function inicialesClienteFlujo(nombre) {
        var partes = String(nombre || "").trim().split(/\s+/).filter(Boolean);
        if (!partes.length) return "CL";
        return (partes[0].charAt(0) + (partes.length > 1 ? partes[partes.length - 1].charAt(0) : "")).toUpperCase();
    }

    function renderizarResultadosClienteFlujo() {
        var contenedor = document.getElementById("resultadosClienteFlujoDatos");
        if (!contenedor) return;
        contenedor.innerHTML = "";
        indiceResultadoFlujo = -1;
        if (!resultadosBusquedaFlujo.length) {
            var vacio = document.createElement("div");
            vacio.className = "flujo-datos-vacio-busqueda";
            vacio.textContent = "No se encontraron clientes.";
            contenedor.appendChild(vacio);
            contenedor.style.display = "";
            return;
        }
        resultadosBusquedaFlujo.forEach(function (cliente, indice) {
            var boton = document.createElement("button");
            boton.type = "button";
            boton.className = "flujo-datos-resultado";
            boton.setAttribute("role", "option");
            boton.setAttribute("aria-selected", "false");
            boton.setAttribute("data-indice", indice);

            var avatar = document.createElement("span");
            avatar.className = "flujo-datos-resultado-avatar";
            avatar.textContent = inicialesClienteFlujo(cliente.nombre);

            var texto = document.createElement("span");
            var nombre = document.createElement("strong");
            nombre.textContent = cliente.nombre || "Cliente sin nombre";
            var detalle = document.createElement("small");
            detalle.textContent = "Documento: " + (cliente.documento || "—") + " · Tel.: " + (cliente.telefono || "—");
            texto.appendChild(nombre);
            texto.appendChild(detalle);

            var etiquetas = document.createElement("span");
            etiquetas.className = "flujo-datos-resultado-etiquetas";

            var calificacion = document.createElement("span");
            calificacion.className = "flujo-datos-resultado-calificacion";
            calificacion.textContent = cliente.calificacion && cliente.calificacion !== "SIN REGISTRO"
                ? cliente.calificacion
                : "Sin calificar";

            var estado = document.createElement("span");
            estado.className = "flujo-datos-resultado-estado";
            estado.textContent = cliente.estado || "SIN ESTADO";
            etiquetas.appendChild(calificacion);
            etiquetas.appendChild(estado);

            boton.appendChild(avatar);
            boton.appendChild(texto);
            boton.appendChild(etiquetas);
            boton.addEventListener("click", function () {
                seleccionarClienteFlujoDatos(cliente);
            });
            contenedor.appendChild(boton);
        });
        contenedor.style.display = "";
    }

    function navegarResultadosClienteFlujoDatos(evento) {
        var contenedor = document.getElementById("resultadosClienteFlujoDatos");
        if (!contenedor || contenedor.style.display === "none" || !resultadosBusquedaFlujo.length) return;
        if (evento.key === "ArrowDown") {
            evento.preventDefault();
            indiceResultadoFlujo = Math.min(resultadosBusquedaFlujo.length - 1, indiceResultadoFlujo + 1);
        } else if (evento.key === "ArrowUp") {
            evento.preventDefault();
            indiceResultadoFlujo = Math.max(0, indiceResultadoFlujo - 1);
        } else if (evento.key === "Enter" && indiceResultadoFlujo >= 0) {
            evento.preventDefault();
            seleccionarClienteFlujoDatos(resultadosBusquedaFlujo[indiceResultadoFlujo]);
            return;
        } else if (evento.key === "Escape") {
            ocultarResultadosClienteFlujo();
            return;
        } else {
            return;
        }
        var botones = contenedor.querySelectorAll(".flujo-datos-resultado");
        Array.prototype.forEach.call(botones, function (boton, indice) {
            boton.classList.toggle("activo", indice === indiceResultadoFlujo);
            boton.setAttribute("aria-selected", indice === indiceResultadoFlujo ? "true" : "false");
            if (indice === indiceResultadoFlujo) boton.scrollIntoView({ block: "nearest" });
        });
    }

    function ocultarResultadosClienteFlujo() {
        var contenedor = document.getElementById("resultadosClienteFlujoDatos");
        if (contenedor) contenedor.style.display = "none";
    }

    function seleccionarClienteFlujoDatos(cliente) {
        clienteFlujoSeleccionado = parseInt(cliente.codigo, 10) || 0;
        var buscador = document.getElementById("buscarClienteFlujoDatos");
        if (buscador) buscador.value = cliente.nombre || "";
        ocultarResultadosClienteFlujo();
        document.getElementById("tipoFlujoDatosCliente").value = "";
        document.getElementById("fechaDesdeFlujoDatosCliente").value = "";
        document.getElementById("fechaHastaFlujoDatosCliente").value = "";
        buscarFlujoDatosCliente(true);
    }

    function recargarFlujoDatosCliente() {
        if (!clienteFlujoSeleccionado) {
            var buscador = document.getElementById("buscarClienteFlujoDatos");
            if (buscador) buscador.focus();
            return;
        }
        buscarFlujoDatosCliente(true);
    }

    function buscarFlujoDatosCliente(reiniciar) {
        if (!clienteFlujoSeleccionado) return;
        if (reiniciar !== false) {
            offsetFlujoDatos = 0;
            document.getElementById("listaFlujoDatosCliente").innerHTML = "";
        }
        var botonMas = document.getElementById("btnMasFlujoDatosCliente");
        if (botonMas) {
            botonMas.disabled = true;
            botonMas.textContent = "Cargando...";
        }
        if (offsetFlujoDatos === 0) mostrarCargaFlujoDatos();
        obtener_datos_user();
        $.ajax({
            data: {
                useru: userid,
                passu: passuser,
                navegador: navegador,
                funt: "buscar_flujo",
                cod_cliente: clienteFlujoSeleccionado,
                tipo: document.getElementById("tipoFlujoDatosCliente").value,
                fecha_desde: document.getElementById("fechaDesdeFlujoDatosCliente").value,
                fecha_hasta: document.getElementById("fechaHastaFlujoDatosCliente").value,
                offset: offsetFlujoDatos,
                limite: 80
            },
            url: "/GoodVentaElectroCasaMaric/php_system/flujo_datos_cliente.php",
            type: "post",
            error: function (jqXHR, textstatus) {
                quitarCargaFlujoDatos();
                manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");
            },
            success: function (responseText) {
                quitarCargaFlujoDatos();
                try {
                    var respuesta = $.parseJSON(responseText);
                    if (respuestaJqueryAjax(respuesta["1"]) == true) {
                        actualizarClienteFlujo(respuesta["2"] || {});
                        actualizarResumenFlujo(respuesta["3"] || {});
                        var eventos = Array.isArray(respuesta["4"]) ? respuesta["4"] : [];
                        renderizarEventosFlujo(eventos, offsetFlujoDatos > 0);
                        offsetFlujoDatos = parseInt(respuesta["6"], 10) || (offsetFlujoDatos + eventos.length);
                        actualizarPaginacionFlujo(!!respuesta["5"]);
                    }
                } catch (error) {
                    ver_vetana_informativa("NO SE PUDO CARGAR EL FLUJO DE DATOS");
                    GuardarArchivosLog("Error en Flujo de Datos: " + error + " \r\n Consola: " + responseText);
                }
            }
        });
    }

    function mostrarCargaFlujoDatos() {
        var inicial = document.getElementById("flujoDatosEstadoInicial");
        var contenido = document.getElementById("flujoDatosContenido");
        if (inicial) {
            inicial.style.display = "flex";
            inicial.querySelector("h3").textContent = "Cargando movimientos...";
            inicial.querySelector("p").textContent = "Estamos reuniendo la actividad del cliente.";
        }
        if (contenido) contenido.style.display = "none";
    }

    function quitarCargaFlujoDatos() {
        var inicial = document.getElementById("flujoDatosEstadoInicial");
        var contenido = document.getElementById("flujoDatosContenido");
        if (inicial) inicial.style.display = "none";
        if (contenido) contenido.style.display = "grid";
    }

    function actualizarClienteFlujo(cliente) {
        document.getElementById("flujoDatosNombreCliente").textContent = cliente.nombre || "Cliente";
        document.getElementById("flujoDatosDocumentoCliente").textContent = "Documento: " + (cliente.documento || "—");
        document.getElementById("flujoDatosTelefonoCliente").textContent = cliente.telefono || "—";
        document.getElementById("flujoDatosZonaCliente").textContent = cliente.zona || "Sin zona";
        document.getElementById("flujoDatosEstadoCliente").textContent = cliente.estado || "Sin estado";
        document.getElementById("flujoDatosAvatar").textContent = inicialesClienteFlujo(cliente.nombre);
    }

    function formatearMontoFlujo(valor) {
        var numero = Number(valor || 0);
        return numero.toLocaleString("es-PY", { maximumFractionDigits: 0 }) + " Gs.";
    }

    function actualizarResumenFlujo(resumen) {
        document.getElementById("flujoResumenVentas").textContent = resumen.ventas || 0;
        document.getElementById("flujoResumenTotalVentas").textContent = formatearMontoFlujo(resumen.total_ventas);
        document.getElementById("flujoResumenPagos").textContent = resumen.pagos || 0;
        document.getElementById("flujoResumenTotalPagos").textContent = formatearMontoFlujo(resumen.total_pagos);
        document.getElementById("flujoResumenAgendas").textContent = resumen.agendas || 0;
        document.getElementById("flujoResumenSolicitudes").textContent = resumen.solicitudes || 0;
    }

    function datosVisualesEvento(tipo) {
        var datos = {
            REGISTRO: ["fa-user-plus", "Registro"],
            ACTUALIZACION: ["fa-pen-to-square", "Actualización"],
            VENTA: ["fa-cart-shopping", "Venta"],
            CREDITO_PENDIENTE: ["fa-clock-rotate-left", "Crédito pendiente"],
            PAGO: ["fa-money-bill-wave", "Pago"],
            AGENDA: ["fa-calendar-check", "Agenda"],
            AGENDA_CALLCENTER: ["fa-headset", "Agenda call center"],
            ACTIVIDAD_CALLCENTER: ["fa-phone-volume", "Actividad call center"],
            SOLICITUD_CREDITO: ["fa-file-signature", "Solicitud de crédito"],
            FOTO: ["fa-camera", "Foto"],
            ARCHIVO: ["fa-file-arrow-up", "Archivo"]
        };
        return datos[tipo] || ["fa-circle-info", tipo || "Movimiento"];
    }

    function formatearFechaFlujo(fecha) {
        if (!fecha || /^0000-00-00/.test(fecha)) return "Sin fecha registrada";
        var partes = String(fecha).replace("T", " ").split(" ");
        var fechaPartes = partes[0].split("-");
        if (fechaPartes.length !== 3) return fecha;
        var texto = fechaPartes[2] + "/" + fechaPartes[1] + "/" + fechaPartes[0];
        if (partes[1] && partes[1] !== "00:00:00") texto += " " + partes[1].substring(0, 5);
        return texto;
    }

    function completarDescripcionEventoFlujo(elemento, evento) {
        var texto = evento.descripcion || "Sin descripción adicional.";
        if (evento.tipo !== "PAGO") {
            elemento.textContent = texto;
            return;
        }
        var coincidencia = texto.match(/Pago\s+(?:de\s+)?(?:Cuotas?|Inter[eé]s(?:es)?)/i);
        if (!coincidencia) {
            elemento.textContent = texto;
            return;
        }
        var posicion = coincidencia.index;
        elemento.appendChild(document.createTextNode(texto.substring(0, posicion)));
        var etiqueta = document.createElement("strong");
        etiqueta.className = "flujo-datos-tipo-pago " +
            (/interes/i.test(coincidencia[0]) ? "es-interes" : "es-cuota");
        etiqueta.textContent = coincidencia[0];
        elemento.appendChild(etiqueta);
        elemento.appendChild(document.createTextNode(texto.substring(posicion + coincidencia[0].length)));
    }

    function codigoMovimientoFlujo(evento) {
        var coincidencia = String(evento.referencia || "").match(/#(\d+)/);
        return coincidencia ? parseInt(coincidencia[1], 10) : 0;
    }

    function cerrarDetalleMovimientoFlujo() {
        var modal = document.getElementById("modalDetalleMovimientoFlujo");
        if (modal) modal.style.display = "none";
        pagoDetalleFlujoSeleccionado = null;
        filaReciboReimpresionFlujo = null;
    }

    function abrirDetalleMovimientoFlujo(evento) {
        if (["VENTA", "PAGO", "AGENDA", "AGENDA_CALLCENTER"].indexOf(evento.tipo) === -1) return;
        var codigo = codigoMovimientoFlujo(evento);
        if (!codigo || !clienteFlujoSeleccionado) return;
        var modal = document.getElementById("modalDetalleMovimientoFlujo");
        var cuerpo = document.getElementById("cuerpoDetalleMovimientoFlujo");
        var visual = datosVisualesEvento(evento.tipo);
        if (!modal || !cuerpo) return;

        document.getElementById("tituloDetalleMovimientoFlujo").textContent = evento.titulo || visual[1];
        document.getElementById("subtituloDetalleMovimientoFlujo").textContent = "Consultando información registrada...";
        var icono = document.getElementById("iconoDetalleMovimientoFlujo");
        icono.className = "flujo-detalle-icono tipo-" + evento.tipo;
        icono.innerHTML = '<i class="fa-solid ' + visual[0] + '" aria-hidden="true"></i>';
        cuerpo.innerHTML = '<div class="flujo-detalle-cargando"><i class="fa-solid fa-spinner fa-spin"></i><span>Cargando detalle...</span></div>';
        var botonReimprimir = document.getElementById("btnReimprimirReciboFlujo");
        botonReimprimir.style.display = "none";
        botonReimprimir.disabled = true;
        modal.style.display = "flex";

        obtener_datos_user();
        $.ajax({
            data: {
                useru: userid,
                passu: passuser,
                navegador: navegador,
                funt: "detalle_movimiento",
                cod_cliente: clienteFlujoSeleccionado,
                tipo: evento.tipo,
                codigo: codigo
            },
            url: "/GoodVentaElectroCasaMaric/php_system/flujo_datos_cliente.php",
            type: "post",
            error: function (jqXHR, textstatus) {
                mostrarErrorDetalleFlujo("No se pudo cargar el detalle.");
                manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");
            },
            success: function (responseText) {
                try {
                    var respuesta = $.parseJSON(responseText);
                    if (respuestaJqueryAjax(respuesta["1"]) === true) {
                        renderizarDetalleMovimientoFlujo(respuesta["2"] || {});
                    }
                } catch (error) {
                    mostrarErrorDetalleFlujo("No se pudo interpretar la información del movimiento.");
                    GuardarArchivosLog("Error en detalle de Flujo de Datos: " + error + " \r\n Consola: " + responseText);
                }
            }
        });
    }

    function mostrarErrorDetalleFlujo(mensaje) {
        var cuerpo = document.getElementById("cuerpoDetalleMovimientoFlujo");
        if (!cuerpo) return;
        cuerpo.innerHTML = "";
        var estado = document.createElement("div");
        estado.className = "flujo-detalle-error";
        estado.innerHTML = '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>';
        var texto = document.createElement("span");
        texto.textContent = mensaje;
        estado.appendChild(texto);
        cuerpo.appendChild(estado);
    }

    function crearCampoDetalleFlujo(etiqueta, valor, destacado) {
        var campo = document.createElement("div");
        campo.className = "flujo-detalle-campo" + (destacado ? " destacado" : "");
        var titulo = document.createElement("span");
        titulo.textContent = etiqueta;
        var contenido = document.createElement("strong");
        contenido.textContent = valor === null || typeof valor === "undefined" || valor === "" ? "—" : valor;
        campo.appendChild(titulo);
        campo.appendChild(contenido);
        return campo;
    }

    function crearSeccionDetalleFlujo(titulo) {
        var seccion = document.createElement("section");
        seccion.className = "flujo-detalle-seccion";
        var encabezado = document.createElement("h4");
        encabezado.textContent = titulo;
        seccion.appendChild(encabezado);
        return seccion;
    }

    function agregarCamposDetalleFlujo(seccion, campos) {
        var grilla = document.createElement("div");
        grilla.className = "flujo-detalle-grid";
        campos.forEach(function (campo) {
            grilla.appendChild(crearCampoDetalleFlujo(campo[0], campo[1], !!campo[2]));
        });
        seccion.appendChild(grilla);
    }

    function renderizarDetalleMovimientoFlujo(datos) {
        var cuerpo = document.getElementById("cuerpoDetalleMovimientoFlujo");
        if (!cuerpo) return;
        cuerpo.innerHTML = "";
        document.getElementById("subtituloDetalleMovimientoFlujo").textContent =
            datos.tipo === "VENTA" ? "Información completa de la venta" :
            datos.tipo === "PAGO" ? "Datos registrados en el recibo" :
            "Información de la agenda del cliente";

        if (datos.tipo === "VENTA") {
            renderizarDetalleVentaFlujo(cuerpo, datos);
        } else if (datos.tipo === "PAGO") {
            renderizarDetallePagoFlujo(cuerpo, datos);
        } else {
            renderizarDetalleAgendaFlujo(cuerpo, datos);
        }
    }

    function renderizarDetalleVentaFlujo(cuerpo, datos) {
        var general = crearSeccionDetalleFlujo("Datos de la venta");
        agregarCamposDetalleFlujo(general, [
            ["Venta", "#" + datos.codigo], ["Fecha", formatearFechaFlujo(datos.fecha)],
            ["Cliente", datos.cliente], ["Documento", datos.documento],
            ["Tipo de venta", datos.tipo_venta], ["Forma de pago", datos.tipo_pago],
            ["Factura", datos.factura], ["Local", datos.local],
            ["Registrado por", datos.responsable], ["Estado", datos.estado]
        ]);
        cuerpo.appendChild(general);

        var resumen = crearSeccionDetalleFlujo("Resumen económico");
        agregarCamposDetalleFlujo(resumen, [
            ["Total", formatearMontoFlujo(datos.total), true],
            ["Descuento", formatearMontoFlujo(datos.descuento)],
            ["Entrega inicial", formatearMontoFlujo(datos.entrega)],
            ["Total pagado", formatearMontoFlujo(datos.total_pagado)],
            ["Saldo", formatearMontoFlujo(datos.saldo), true]
        ]);
        cuerpo.appendChild(resumen);

        var productos = crearSeccionDetalleFlujo("Productos");
        var tablaContenedor = document.createElement("div");
        tablaContenedor.className = "flujo-detalle-tabla-wrap";
        var tabla = document.createElement("table");
        tabla.className = "flujo-detalle-tabla";
        tabla.innerHTML = "<thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th><th>Estado</th></tr></thead>";
        var tbody = document.createElement("tbody");
        (datos.productos || []).forEach(function (producto) {
            var fila = document.createElement("tr");
            [
                producto.producto + (producto.detalle ? " · " + producto.detalle : ""),
                producto.cantidad,
                formatearMontoFlujo(producto.precio),
                formatearMontoFlujo(producto.subtotal),
                producto.estado || "—"
            ].forEach(function (valor) {
                var celda = document.createElement("td");
                celda.textContent = valor;
                fila.appendChild(celda);
            });
            tbody.appendChild(fila);
        });
        if (!(datos.productos || []).length) {
            var vacio = document.createElement("tr");
            var celdaVacia = document.createElement("td");
            celdaVacia.colSpan = 5;
            celdaVacia.textContent = "No hay productos registrados.";
            vacio.appendChild(celdaVacia);
            tbody.appendChild(vacio);
        }
        tabla.appendChild(tbody);
        tablaContenedor.appendChild(tabla);
        productos.appendChild(tablaContenedor);
        cuerpo.appendChild(productos);
    }

    function renderizarDetallePagoFlujo(cuerpo, datos) {
        var recibo = crearSeccionDetalleFlujo("Datos del recibo");
        agregarCamposDetalleFlujo(recibo, [
            ["Recibo", datos.recibo || "#" + datos.codigo],
            ["Fecha", formatearFechaFlujo(datos.fecha)],
            ["Cliente", datos.cliente], ["Documento", datos.documento],
            ["Concepto", datos.concepto], ["Método", datos.metodo],
            ["Monto", formatearMontoFlujo(datos.monto), true],
            ["Cuota", datos.cuota], ["Vencimiento", formatearFechaFlujo(datos.vencimiento)],
            ["Días de atraso", datos.dias_atraso || 0],
            ["Venta relacionada", "#" + datos.venta_codigo],
            ["Factura de venta", datos.factura_venta],
            ["Cobrado por", datos.responsable], ["Estado", datos.estado]
        ]);
        cuerpo.appendChild(recibo);
        if (datos.descripcion) {
            var observacion = crearSeccionDetalleFlujo("Descripción");
            var texto = document.createElement("p");
            texto.className = "flujo-detalle-observacion";
            texto.textContent = datos.descripcion;
            observacion.appendChild(texto);
            cuerpo.appendChild(observacion);
        }
        pagoDetalleFlujoSeleccionado = datos;
        prepararReimpresionPagoFlujo(datos.venta_codigo, datos.codigo);
    }

    function renderizarDetalleAgendaFlujo(cuerpo, datos) {
        var agenda = crearSeccionDetalleFlujo(datos.tipo === "AGENDA_CALLCENTER" ? "Agenda de call center" : "Datos de la agenda");
        agregarCamposDetalleFlujo(agenda, [
            ["Agenda", "#" + datos.codigo], ["Registrada", formatearFechaFlujo(datos.fecha)],
            ["Fecha de compromiso", formatearFechaFlujo(datos.fecha_compromiso)],
            ["Cliente", datos.cliente], ["Documento", datos.documento],
            ["Teléfono", datos.telefono], ["Zona / origen", datos.zona],
            ["Responsable", datos.responsable], ["Estado", datos.estado]
        ]);
        cuerpo.appendChild(agenda);
        var motivo = crearSeccionDetalleFlujo("Motivo u observación");
        var texto = document.createElement("p");
        texto.className = "flujo-detalle-observacion";
        texto.textContent = datos.motivo || "Sin observación registrada.";
        motivo.appendChild(texto);
        cuerpo.appendChild(motivo);
    }

    function prepararReimpresionPagoFlujo(codVenta, codPago) {
        var boton = document.getElementById("btnReimprimirReciboFlujo");
        filaReciboReimpresionFlujo = null;
        boton.style.display = "inline-flex";
        boton.disabled = true;
        boton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparando recibo';
        obtener_datos_user();
        $.ajax({
            data: {
                useru: userid, passu: passuser, navegador: navegador,
                funt: "buscarHistorialPagosAReimprimir", buscar: codVenta
            },
            url: "/GoodVentaElectroCasaMaric/php_system/abmpagos.php",
            type: "post",
            success: function (responseText) {
                try {
                    var respuesta = $.parseJSON(responseText);
                    if (respuestaJqueryAjax(respuesta["1"]) !== true) return;
                    var temporal = document.createElement("div");
                    temporal.innerHTML = respuesta["2"] || "";
                    var filas = temporal.querySelectorAll("tr#tbSelecRegistro");
                    Array.prototype.some.call(filas, function (fila) {
                        var primeraCelda = fila.querySelector("td");
                        if (primeraCelda && parseInt(primeraCelda.textContent, 10) === parseInt(codPago, 10)) {
                            filaReciboReimpresionFlujo = fila;
                            return true;
                        }
                        return false;
                    });
                    boton.disabled = !filaReciboReimpresionFlujo;
                    boton.innerHTML = '<i class="fa-solid fa-print"></i> ' +
                        (filaReciboReimpresionFlujo ? "Reimprimir recibo" : "Recibo no disponible");
                } catch (error) {
                    boton.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Recibo no disponible';
                }
            },
            error: function () {
                boton.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Recibo no disponible';
            }
        });
    }

    function reimprimirReciboFlujoDatos() {
        if (!pagoDetalleFlujoSeleccionado || !filaReciboReimpresionFlujo) {
            ver_vetana_informativa("EL RECIBO TODAVÍA NO ESTÁ DISPONIBLE");
            return;
        }
        if (typeof window.ReImprimirTicketPagos !== "function") {
            ver_vetana_informativa("NO SE ENCONTRÓ EL FORMATO DE REIMPRESIÓN");
            return;
        }
        window.elementoPagoReimprimir = filaReciboReimpresionFlujo;
        window.ReImprimirTicketPagos();
    }

    function crearEventoFlujo(evento) {
        var visual = datosVisualesEvento(evento.tipo);
        var articulo = document.createElement("article");
        articulo.className = "flujo-datos-evento flujo-evento-" + String(evento.tipo || "").replace(/[^A-Z_]/g, "");

        var icono = document.createElement("span");
        icono.className = "flujo-datos-evento-icono";
        icono.innerHTML = '<i class="fa-solid ' + visual[0] + '" aria-hidden="true"></i>';

        var cuerpo = document.createElement("div");
        var titulo = document.createElement("h4");
        titulo.textContent = evento.titulo || visual[1];
        var descripcion = document.createElement("p");
        completarDescripcionEventoFlujo(descripcion, evento);
        var meta = document.createElement("div");
        meta.className = "flujo-datos-evento-meta";
        var tipo = document.createElement("span");
        tipo.textContent = visual[1];
        var referencia = document.createElement("span");
        referencia.textContent = evento.referencia || "";
        var responsable = document.createElement("span");
        responsable.className = "flujo-datos-responsable";
        responsable.title = "Responsable: " + (evento.responsable || "Sin identificar");
        var avatarResponsable = document.createElement("span");
        avatarResponsable.className = "flujo-datos-responsable-avatar";
        avatarResponsable.textContent = inicialesClienteFlujo(evento.responsable || "SI");
        if (evento.responsable_foto) {
            var fotoResponsable = document.createElement("img");
            fotoResponsable.src = "/GoodVentaElectroCasaMaric/" + String(evento.responsable_foto).replace(/^\/+/, "");
            fotoResponsable.alt = "";
            fotoResponsable.loading = "lazy";
            fotoResponsable.decoding = "async";
            fotoResponsable.onerror = function () {
                this.remove();
            };
            avatarResponsable.appendChild(fotoResponsable);
        }
        var nombreResponsable = document.createElement("span");
        nombreResponsable.textContent = evento.responsable || "Sin identificar";
        responsable.appendChild(avatarResponsable);
        responsable.appendChild(nombreResponsable);
        meta.appendChild(tipo);
        meta.appendChild(referencia);
        if (evento.tipo !== "CREDITO_PENDIENTE") {
            meta.appendChild(responsable);
        }
        cuerpo.appendChild(titulo);
        cuerpo.appendChild(descripcion);
        cuerpo.appendChild(meta);

        var lateral = document.createElement("div");
        lateral.className = "flujo-datos-evento-lateral";
        var fecha = document.createElement("span");
        fecha.className = "flujo-datos-evento-fecha";
        fecha.textContent = formatearFechaFlujo(evento.fecha);
        lateral.appendChild(fecha);
        if (evento.monto !== null && typeof evento.monto !== "undefined") {
            var monto = document.createElement("span");
            monto.className = "flujo-datos-evento-monto";
            monto.textContent = formatearMontoFlujo(evento.monto);
            lateral.appendChild(monto);
        }
        if ((evento.tipo === "PAGO" || evento.tipo === "CREDITO_PENDIENTE") && Number(evento.dias_atraso) > 0) {
            var atraso = document.createElement("span");
            atraso.className = "flujo-datos-evento-atraso";
            atraso.textContent = evento.dias_atraso + (Number(evento.dias_atraso) === 1 ? " día de atraso" : " días de atraso");
            lateral.appendChild(atraso);
        }
        var estado = document.createElement("span");
        estado.className = "flujo-datos-evento-estado";
        estado.textContent = evento.estado || "REGISTRADO";
        lateral.appendChild(estado);

        articulo.appendChild(icono);
        articulo.appendChild(cuerpo);
        articulo.appendChild(lateral);
        if (["VENTA", "PAGO", "AGENDA", "AGENDA_CALLCENTER"].indexOf(evento.tipo) !== -1) {
            articulo.classList.add("es-seleccionable");
            articulo.tabIndex = 0;
            articulo.setAttribute("role", "button");
            articulo.setAttribute("aria-label", "Ver detalle de " + (evento.titulo || visual[1]));
            articulo.addEventListener("click", function () {
                abrirDetalleMovimientoFlujo(evento);
            });
            articulo.addEventListener("keydown", function (eventoTeclado) {
                if (eventoTeclado.key === "Enter" || eventoTeclado.key === " ") {
                    eventoTeclado.preventDefault();
                    abrirDetalleMovimientoFlujo(evento);
                }
            });
        }
        return articulo;
    }

    function renderizarEventosFlujo(eventos, anexar) {
        var lista = document.getElementById("listaFlujoDatosCliente");
        var vacio = document.getElementById("vacioFlujoDatosCliente");
        if (!lista || !vacio) return;
        if (!anexar) lista.innerHTML = "";
        eventos.forEach(function (evento) {
            lista.appendChild(crearEventoFlujo(evento));
        });
        var cantidad = lista.querySelectorAll(".flujo-datos-evento").length;
        vacio.style.display = cantidad ? "none" : "";
        lista.style.display = cantidad ? "grid" : "none";
        document.getElementById("contadorFlujoDatosCliente").textContent =
            cantidad + (cantidad === 1 ? " movimiento" : " movimientos");
    }

    function actualizarPaginacionFlujo(hayMas) {
        var boton = document.getElementById("btnMasFlujoDatosCliente");
        if (!boton) return;
        boton.disabled = false;
        boton.textContent = "Cargar más movimientos";
        boton.style.display = hayMas ? "flex" : "none";
    }

    global.abrirFlujoDatosCliente = abrirFlujoDatosCliente;
    global.cerrarFlujoDatosCliente = cerrarFlujoDatosCliente;
    global.programarBusquedaClienteFlujoDatos = programarBusquedaClienteFlujoDatos;
    global.navegarResultadosClienteFlujoDatos = navegarResultadosClienteFlujoDatos;
    global.buscarFlujoDatosCliente = buscarFlujoDatosCliente;
    global.recargarFlujoDatosCliente = recargarFlujoDatosCliente;
    global.cerrarDetalleMovimientoFlujo = cerrarDetalleMovimientoFlujo;
    global.reimprimirReciboFlujoDatos = reimprimirReciboFlujoDatos;

    document.addEventListener("keydown", function (evento) {
        var ventana = document.getElementById("divFlujoDatosCliente");
        var modalDetalle = document.getElementById("modalDetalleMovimientoFlujo");
        if (evento.key === "Escape" && modalDetalle && modalDetalle.style.display !== "none") {
            cerrarDetalleMovimientoFlujo();
        } else if (evento.key === "Escape" && ventana && ventana.style.display !== "none") {
            cerrarFlujoDatosCliente();
        }
    });
}(window));
