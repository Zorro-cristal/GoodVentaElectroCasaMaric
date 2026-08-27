var mapaClientesInstancia = null;
var mapaClientesCargado = false;
var mapaClientesPeticion = null;
var mapaClientesDatos = [];
var mapaClientesLocalesCargados = false;
var mapaClientesUbicacionResuelta = false;
var mapaClientesUbicacionDisponible = false;
var mapaClientesTipo = "";

function escaparHtmlMapaClientes(valor) {
    return String(valor === null || typeof valor === "undefined" ? "" : valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatearMontoMapaClientes(valor) {
    var numero = Number(valor) || 0;
    return numero.toLocaleString("es-PY") + " Gs.";
}

function abrirMapaClientes() {
    var formulario = document.getElementById("divMapaClientes");
    if (!formulario) {
        ver_vetana_informativa("NO SE ENCONTRO EL FORMULARIO DEL MAPA DE CLIENTES");
        return;
    }

    if (formulario.parentNode !== document.body) {
        document.body.appendChild(formulario);
    }
    formulario.style.display = "block";
    formulario.setAttribute("aria-hidden", "false");
    volverSelectorMapaClientes();
}

function seleccionarTipoMapaClientes(tipo) {
    if (tipo !== "ventas" && tipo !== "morosos" && tipo !== "cobros") {
        return;
    }

    mapaClientesTipo = tipo;
    cerrarFiltrosMapaClientes();
    limpiarCamposFiltrosMapaClientes();
    if (tipo === "cobros") {
        aplicarMesActualCobrosMapaClientes();
    }

    var selector = document.getElementById("selectorMapaClientes");
    var vista = document.getElementById("vistaMapaClientes");
    if (selector) selector.style.display = "none";
    if (vista) vista.style.display = "grid";
    actualizarPresentacionTipoMapaClientes();
    mapaClientesDatos = [];

    window.setTimeout(function () {
        if (!mapaClientesInstancia) {
            inicializarMapaClientes();
        } else {
            var fuente = mapaClientesInstancia.getSource("clientes-ubicados");
            if (fuente) {
                fuente.setData({ type: "FeatureCollection", features: [] });
            }
            mapaClientesInstancia.resize();
            actualizarAparienciaMapaClientes();
            ubicarPosicionActualMapaClientes(false);
            buscarMapaClientes();
        }
    }, 80);
}

function volverSelectorMapaClientes() {
    cerrarFiltrosMapaClientes();
    if (mapaClientesPeticion && mapaClientesPeticion.readyState !== 4) {
        mapaClientesPeticion.abort();
    }
    var selector = document.getElementById("selectorMapaClientes");
    var vista = document.getElementById("vistaMapaClientes");
    if (vista) vista.style.display = "none";
    if (selector) selector.style.display = "grid";
    mapaClientesTipo = "";
}

function actualizarPresentacionTipoMapaClientes() {
    var esMorosos = mapaClientesTipo === "morosos";
    var esCobros = mapaClientesTipo === "cobros";
    var titulo = document.getElementById("tituloVistaMapaClientes");
    var descripcion = document.getElementById("descripcionVistaMapaClientes");
    var formulario = document.getElementById("divMapaClientes");
    var avisoVacio = document.getElementById("mensajeMapaClientesVacio");
    var tituloFiltros = document.getElementById("tituloFiltrosMapaClientes");
    var campoVendedor = document.getElementById("campoFiltroMapaClienteVendedor");
    var campoCobrador = document.getElementById("campoFiltroMapaClienteCobrador");
    var labelLocal = document.getElementById("labelLocalMapaClientes");
    var labelDesde = document.getElementById("labelFechaDesdeMapaClientes");
    var labelHasta = document.getElementById("labelFechaHastaMapaClientes");

    if (titulo) {
        titulo.innerHTML = esMorosos ? 'Mapa de <span>Morosos</span>' :
            (esCobros ? 'Mapa de <span>Cobros realizados</span>' : 'Mapa de <span>Ventas</span>');
    }
    if (descripcion) {
        descripcion.textContent = esMorosos ?
            "Clientes ubicados con cuotas vencidas y saldo pendiente" :
            (esCobros ? "Cobros realizados según la ubicación registrada de cada cliente" :
                "Ubicaciones registradas y última compra de cada cliente");
    }
    if (avisoVacio) {
        avisoVacio.textContent = esMorosos ?
            "No hay clientes morosos con ubicación para los filtros seleccionados." :
            (esCobros ? "No hay cobros con ubicación para los filtros seleccionados." :
                "No hay clientes con ubicación para los filtros seleccionados.");
    }
    if (tituloFiltros) {
        tituloFiltros.textContent = esCobros ? "Filtros de Cobros Realizados" :
            (esMorosos ? "Filtros del Mapa de Morosos" : "Filtros del Mapa de Ventas");
    }
    if (campoVendedor) {
        campoVendedor.style.display = mapaClientesTipo === "ventas" ? "grid" : "none";
    }
    if (campoCobrador) {
        campoCobrador.style.display = esCobros ? "grid" : "none";
    }
    if (labelLocal) {
        labelLocal.textContent = esCobros ? "Local de la venta relacionada" : "Local de la última compra";
    }
    if (labelDesde) {
        labelDesde.textContent = esCobros ? "Cobrado desde" : "Última compra desde";
    }
    if (labelHasta) {
        labelHasta.textContent = esCobros ? "Cobrado hasta" : "Última compra hasta";
    }
    if (formulario) {
        formulario.classList.toggle("mapa-clientes--morosos", esMorosos);
        formulario.classList.toggle("mapa-clientes--cobros", esCobros);
    }
}

function cerrarMapaClientes() {
    var formulario = document.getElementById("divMapaClientes");
    if (formulario) {
        formulario.style.display = "none";
        formulario.setAttribute("aria-hidden", "true");
    }
    cerrarFiltrosMapaClientes();
    if (mapaClientesPeticion && mapaClientesPeticion.readyState !== 4) {
        mapaClientesPeticion.abort();
    }
}

function inicializarMapaClientes() {
    if (typeof mapboxgl === "undefined") {
        ver_vetana_informativa("NO SE PUDO INICIAR EL MAPA");
        volverSelectorMapaClientes();
        return;
    }

    mapaClientesInstancia = new mapboxgl.Map({
        container: "mapaClientesGeneral",
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [-56.448, -25.44],
        zoom: 13
    });

    mapaClientesInstancia.addControl(new mapboxgl.NavigationControl(), "top-right");
    var controlUbicacion = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserLocation: true
    });
    mapaClientesInstancia.addControl(controlUbicacion, "top-right");

    mapaClientesInstancia.on("load", function () {
        mapaClientesCargado = true;
        prepararCapasMapaClientes();
        actualizarAparienciaMapaClientes();
        if (!mapaClientesTipo) {
            return;
        }
        ubicarPosicionActualMapaClientes(false);
        buscarMapaClientes();
    });
}

function prepararCapasMapaClientes() {
    if (!mapaClientesInstancia.getSource("clientes-ubicados")) {
        mapaClientesInstancia.addSource("clientes-ubicados", {
            type: "geojson",
            data: { type: "FeatureCollection", features: [] },
            cluster: true,
            clusterMaxZoom: 15,
            clusterRadius: 48
        });
    }

    mapaClientesInstancia.addLayer({
        id: "grupos-clientes",
        type: "circle",
        source: "clientes-ubicados",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": [
                "step", ["get", "point_count"],
                "#18a6d9", 25, "#2978f0", 100, "#6b4ee6"
            ],
            "circle-radius": [
                "step", ["get", "point_count"],
                19, 25, 24, 100, 31
            ],
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff"
        }
    });

    mapaClientesInstancia.addLayer({
        id: "cantidad-grupo-clientes",
        type: "symbol",
        source: "clientes-ubicados",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        },
        paint: { "text-color": "#ffffff" }
    });

    mapaClientesInstancia.addLayer({
        id: "cliente-individual",
        type: "circle",
        source: "clientes-ubicados",
        filter: ["!", ["has", "point_count"]],
        paint: {
            "circle-color": "#16c7d9",
            "circle-radius": 8,
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff"
        }
    });

    mapaClientesInstancia.on("click", "grupos-clientes", function (evento) {
        var elementos = mapaClientesInstancia.queryRenderedFeatures(evento.point, {
            layers: ["grupos-clientes"]
        });
        if (!elementos.length) {
            return;
        }
        var idGrupo = elementos[0].properties.cluster_id;
        mapaClientesInstancia.getSource("clientes-ubicados").getClusterExpansionZoom(idGrupo, function (error, zoom) {
            if (error) {
                return;
            }
            mapaClientesInstancia.easeTo({
                center: elementos[0].geometry.coordinates,
                zoom: zoom
            });
        });
    });

    mapaClientesInstancia.on("click", "cliente-individual", function (evento) {
        if (!evento.features || !evento.features.length) {
            return;
        }
        var propiedades = evento.features[0].properties;
        var contenido = '<div class="mapa-clientes-popup">' +
            "<h3>" + escaparHtmlMapaClientes(propiedades.cliente) + "</h3>" +
            "<p><strong>Documento:</strong> " + escaparHtmlMapaClientes(propiedades.documento || "Sin registro") + "</p>" +
            "<p><strong>Telefono:</strong> " + escaparHtmlMapaClientes(propiedades.telefono || "Sin registro") + "</p>" +
            "<p><strong>Local:</strong> " + escaparHtmlMapaClientes(propiedades.local) + "</p>";

        if (mapaClientesTipo !== "cobros") {
            contenido += "<p><strong>Ultima compra:</strong> " +
                escaparHtmlMapaClientes(propiedades.ultima_compra || "Sin compra registrada") + "</p>";
        }
        if (mapaClientesTipo === "ventas") {
            contenido += "<p><strong>Vendedor:</strong> " +
                escaparHtmlMapaClientes(propiedades.vendedor || "Sin vendedor") + "</p>";
        }

        if (mapaClientesTipo === "morosos") {
            contenido += '<div class="mapa-clientes-popup-mora">' +
                "<p><strong>Cuotas vencidas:</strong> " + escaparHtmlMapaClientes(propiedades.cuotas_vencidas || 0) + "</p>" +
                "<p><strong>Saldo vencido:</strong> " + escaparHtmlMapaClientes(formatearMontoMapaClientes(propiedades.total_vencido)) + "</p>" +
                "<p><strong>Atraso maximo:</strong> " + escaparHtmlMapaClientes(propiedades.dias_atraso || 0) + " dias</p>" +
                "<p><strong>Vencimiento mas antiguo:</strong> " +
                    escaparHtmlMapaClientes(propiedades.primer_vencimiento || "Sin registro") + "</p>" +
                "</div>";
        }

        if (mapaClientesTipo === "cobros") {
            contenido += '<div class="mapa-clientes-popup-cobro">' +
                "<p><strong>Cobros registrados:</strong> " + escaparHtmlMapaClientes(propiedades.cantidad_cobros || 0) + "</p>" +
                "<p><strong>Ultimo cobro:</strong> " + escaparHtmlMapaClientes(propiedades.fecha_cobro || "Sin registro") + "</p>" +
                "<p><strong>Total cobrado:</strong> " + escaparHtmlMapaClientes(formatearMontoMapaClientes(propiedades.monto_cobro)) + "</p>" +
                "<p><strong>Cobradores:</strong> " + escaparHtmlMapaClientes(propiedades.cobrador || "Sin identificar") + "</p>" +
                "<p><strong>Conceptos:</strong> " + escaparHtmlMapaClientes(propiedades.tipo_cobro || "Sin registro") + "</p>" +
                "<p><strong>Metodos:</strong> " + escaparHtmlMapaClientes(propiedades.metodo_cobro || "Sin registro") + "</p>" +
                "</div>";
        }

        contenido +=
            "<p><strong>" + (mapaClientesTipo === "cobros" ? "Referencia de ubicacion:" : "Referencia:") +
            "</strong> " + escaparHtmlMapaClientes(propiedades.descripcion || "Sin descripcion") + "</p>" +
            "</div>";

        new mapboxgl.Popup({ offset: 14, maxWidth: "310px" })
            .setLngLat(evento.features[0].geometry.coordinates.slice())
            .setHTML(contenido)
            .addTo(mapaClientesInstancia);
    });

    ["grupos-clientes", "cliente-individual"].forEach(function (capa) {
        mapaClientesInstancia.on("mouseenter", capa, function () {
            mapaClientesInstancia.getCanvas().style.cursor = "pointer";
        });
        mapaClientesInstancia.on("mouseleave", capa, function () {
            mapaClientesInstancia.getCanvas().style.cursor = "";
        });
    });
}

function actualizarAparienciaMapaClientes() {
    if (!mapaClientesInstancia || !mapaClientesCargado) {
        return;
    }
    var esMorosos = mapaClientesTipo === "morosos";
    var esCobros = mapaClientesTipo === "cobros";
    if (mapaClientesInstancia.getLayer("grupos-clientes")) {
        mapaClientesInstancia.setPaintProperty("grupos-clientes", "circle-color", esMorosos ? [
            "step", ["get", "point_count"],
            "#ef4444", 25, "#dc2626", 100, "#991b1b"
        ] : (esCobros ? [
            "step", ["get", "point_count"],
            "#22b573", 25, "#16a063", 100, "#0f6845"
        ] : [
            "step", ["get", "point_count"],
            "#18a6d9", 25, "#2978f0", 100, "#6b4ee6"
        ]));
    }
    if (mapaClientesInstancia.getLayer("cliente-individual")) {
        mapaClientesInstancia.setPaintProperty(
            "cliente-individual",
            "circle-color",
            esMorosos ? "#dc2626" : (esCobros ? "#16a063" : "#16c7d9")
        );
    }
}

function ubicarPosicionActualMapaClientes(notificarError) {
    if (!navigator.geolocation || !mapaClientesInstancia) {
        if (notificarError) {
            ver_vetana_informativa("EL NAVEGADOR NO PERMITE OBTENER LA UBICACION ACTUAL");
        }
        return;
    }

    mapaClientesUbicacionResuelta = false;
    navigator.geolocation.getCurrentPosition(function (posicion) {
        mapaClientesUbicacionResuelta = true;
        mapaClientesUbicacionDisponible = true;
        mapaClientesInstancia.flyTo({
            center: [posicion.coords.longitude, posicion.coords.latitude],
            zoom: 16,
            essential: true
        });
    }, function () {
        mapaClientesUbicacionResuelta = true;
        mapaClientesUbicacionDisponible = false;
        encuadrarClientesMapa(mapaClientesDatos);
        if (notificarError) {
            ver_vetana_informativa("HABILITE EL PERMISO DE UBICACION DEL NAVEGADOR");
        }
    }, {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 60000
    });
}

function obtenerFiltrosMapaClientes() {
    return {
        nombre: document.getElementById("filtroMapaClienteNombre").value.trim(),
        documento: document.getElementById("filtroMapaClienteDocumento").value.trim(),
        cod_local: document.getElementById("filtroMapaClienteLocal").value,
        cod_vendedor: document.getElementById("filtroMapaClienteVendedor").value,
        cod_cobrador: document.getElementById("filtroMapaClienteCobrador").value,
        fecha_desde: document.getElementById("filtroMapaClienteFechaDesde").value,
        fecha_hasta: document.getElementById("filtroMapaClienteFechaHasta").value
    };
}

function buscarMapaClientes() {
    if (!mapaClientesCargado || !mapaClientesInstancia) {
        return;
    }

    var filtros = obtenerFiltrosMapaClientes();
    obtener_datos_user();
    if (mapaClientesPeticion && mapaClientesPeticion.readyState !== 4) {
        mapaClientesPeticion.abort();
    }

    actualizarEstadoMapaClientes("Cargando ubicaciones...");
    mapaClientesPeticion = $.ajax({
        url: "/GoodVentaElectroCasaMaric/php_system/abmclientes.php",
        type: "post",
        data: {
            useru: userid,
            passu: passuser,
            navegador: navegador,
            funt: "buscarMapaClientes",
            modo_mapa: mapaClientesTipo || "ventas",
            nombre: filtros.nombre,
            documento: filtros.documento,
            cod_local: filtros.cod_local,
            cod_vendedor: filtros.cod_vendedor,
            cod_cobrador: filtros.cod_cobrador,
            fecha_desde: filtros.fecha_desde,
            fecha_hasta: filtros.fecha_hasta
        },
        success: function (respuesta) {
            try {
                var datos = typeof respuesta === "string" ? $.parseJSON(respuesta) : respuesta;
                if (datos["1"] !== "exito") {
                    throw new Error(datos["2"] || "Respuesta invalida");
                }
                mapaClientesDatos = Array.isArray(datos["2"]) ? datos["2"] : [];
                cargarCatalogosMapaClientes(datos["3"], datos["5"], datos["6"]);
                dibujarClientesEnMapa(mapaClientesDatos, hayFiltrosMapaClientes(filtros));
                actualizarResumenMapaClientes(mapaClientesDatos.length, filtros);
                actualizarEstadoMapaClientes(mapaClientesDatos.length ? "Mapa actualizado" : "Sin resultados");
            } catch (error) {
                actualizarEstadoMapaClientes("Error al cargar");
                ver_vetana_informativa("NO SE PUDIERON CARGAR LAS UBICACIONES");
                GuardarArchivosLog("Mapa clientes: " + error + " Respuesta: " + respuesta);
            }
        },
        error: function (jqXHR, estado) {
            if (estado === "abort") {
                return;
            }
            actualizarEstadoMapaClientes("Error de conexion");
            manejadordeerroresjquery(jqXHR.status, estado, "mapaclientes");
        }
    });
}

function cargarCatalogosMapaClientes(locales, vendedores, cobradores) {
    if (mapaClientesLocalesCargados || !Array.isArray(locales)) {
        return;
    }
    var selectLocal = document.getElementById("filtroMapaClienteLocal");
    selectLocal.innerHTML = '<option value="">TODOS LOS LOCALES</option>';
    locales.forEach(function (local) {
        var opcion = document.createElement("option");
        opcion.value = local.codigo;
        opcion.textContent = local.nombre;
        selectLocal.appendChild(opcion);
    });

    var selectVendedor = document.getElementById("filtroMapaClienteVendedor");
    selectVendedor.innerHTML = '<option value="">TODOS LOS VENDEDORES</option>';
    (Array.isArray(vendedores) ? vendedores : []).forEach(function (vendedor) {
        var opcion = document.createElement("option");
        opcion.value = vendedor.codigo;
        opcion.textContent = vendedor.nombre;
        selectVendedor.appendChild(opcion);
    });

    var selectCobrador = document.getElementById("filtroMapaClienteCobrador");
    selectCobrador.innerHTML = '<option value="">TODOS LOS COBRADORES</option>';
    (Array.isArray(cobradores) ? cobradores : []).forEach(function (cobrador) {
        var opcion = document.createElement("option");
        opcion.value = cobrador.codigo;
        opcion.textContent = cobrador.nombre;
        selectCobrador.appendChild(opcion);
    });
    mapaClientesLocalesCargados = true;
}

function hayFiltrosMapaClientes(filtros) {
    return !!(filtros.nombre || filtros.documento || filtros.cod_local ||
        filtros.cod_vendedor || filtros.cod_cobrador || filtros.fecha_desde || filtros.fecha_hasta);
}

function dibujarClientesEnMapa(clientes, ajustarResultados) {
    var caracteristicas = clientes.map(function (cliente) {
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [Number(cliente.longitud), Number(cliente.latitud)]
            },
            properties: {
                id_cliente: cliente.id_cliente,
                cliente: cliente.cliente,
                documento: cliente.documento,
                telefono: cliente.telefono,
                descripcion: cliente.descripcion,
                ultima_compra: cliente.ultima_compra,
                local: cliente.local,
                vendedor: cliente.vendedor || "",
                cuotas_vencidas: Number(cliente.cuotas_vencidas) || 0,
                total_vencido: Number(cliente.total_vencido) || 0,
                dias_atraso: Number(cliente.dias_atraso) || 0,
                primer_vencimiento: cliente.primer_vencimiento || "",
                id_pago: Number(cliente.id_pago) || 0,
                cantidad_cobros: Number(cliente.cantidad_cobros) || 0,
                fecha_cobro: cliente.fecha_cobro || "",
                monto_cobro: Number(cliente.monto_cobro) || 0,
                tipo_cobro: cliente.tipo_cobro || "",
                metodo_cobro: cliente.metodo_cobro || "",
                cobrador: cliente.cobrador || "",
                venta_codigo: Number(cliente.venta_codigo) || 0,
                factura: cliente.factura || ""
            }
        };
    });

    mapaClientesInstancia.getSource("clientes-ubicados").setData({
        type: "FeatureCollection",
        features: caracteristicas
    });

    var avisoVacio = document.getElementById("mensajeMapaClientesVacio");
    avisoVacio.style.display = caracteristicas.length ? "none" : "block";

    if (!caracteristicas.length) {
        return;
    }

    if (ajustarResultados || (mapaClientesUbicacionResuelta && !mapaClientesUbicacionDisponible)) {
        encuadrarClientesMapa(clientes);
    }
}

function encuadrarClientesMapa(clientes) {
    if (!mapaClientesInstancia || !clientes || !clientes.length) {
        return;
    }
    var limites = new mapboxgl.LngLatBounds();
    clientes.forEach(function (cliente) {
        limites.extend([Number(cliente.longitud), Number(cliente.latitud)]);
    });
    if (!limites.isEmpty()) {
        mapaClientesInstancia.fitBounds(limites, {
            padding: 70,
            maxZoom: 15,
            duration: 750
        });
    }
}

function actualizarResumenMapaClientes(cantidad, filtros) {
    var textoCantidad = mapaClientesTipo === "morosos" ? " clientes morosos ubicados" :
        (mapaClientesTipo === "cobros" ? " clientes con cobros" : " clientes ubicados");
    document.getElementById("cantidadMapaClientes").textContent = cantidad + textoCantidad;
    var activos = [];
    if (filtros.nombre) activos.push("Nombre: " + filtros.nombre);
    if (filtros.documento) activos.push("Documento: " + filtros.documento);
    if (filtros.cod_local) {
        var select = document.getElementById("filtroMapaClienteLocal");
        activos.push("Local: " + select.options[select.selectedIndex].text);
    }
    if (filtros.cod_vendedor && mapaClientesTipo === "ventas") {
        var selectVendedor = document.getElementById("filtroMapaClienteVendedor");
        activos.push("Vendedor: " + selectVendedor.options[selectVendedor.selectedIndex].text);
    }
    if (filtros.cod_cobrador && mapaClientesTipo === "cobros") {
        var selectCobrador = document.getElementById("filtroMapaClienteCobrador");
        activos.push("Cobrador: " + selectCobrador.options[selectCobrador.selectedIndex].text);
    }
    if (filtros.fecha_desde || filtros.fecha_hasta) {
        activos.push((mapaClientesTipo === "cobros" ? "Cobrado: " : "Ultima compra: ") +
            (filtros.fecha_desde || "...") + " a " + (filtros.fecha_hasta || "..."));
    }
    document.getElementById("filtrosMapaClientesActivos").textContent =
        activos.length ? activos.join(" | ") :
        (mapaClientesTipo === "morosos" ? "Solo cuotas vencidas con saldo pendiente" :
            (mapaClientesTipo === "cobros" ? "Todos los cobros con ubicación" : "Sin filtros aplicados"));
}

function actualizarEstadoMapaClientes(texto) {
    document.getElementById("estadoMapaClientes").textContent = texto;
}

function abrirFiltrosMapaClientes() {
    document.getElementById("modalFiltrosMapaClientes").style.display = "grid";
    window.setTimeout(function () {
        document.getElementById("filtroMapaClienteNombre").focus();
    }, 50);
}

function cerrarFiltrosMapaClientes() {
    var modal = document.getElementById("modalFiltrosMapaClientes");
    if (modal) {
        modal.style.display = "none";
    }
}

function aplicarFiltrosMapaClientes() {
    var desde = document.getElementById("filtroMapaClienteFechaDesde").value;
    var hasta = document.getElementById("filtroMapaClienteFechaHasta").value;
    if (desde && hasta && desde > hasta) {
        ver_vetana_informativa("LA FECHA DESDE NO PUEDE SER MAYOR A LA FECHA HASTA");
        return;
    }
    cerrarFiltrosMapaClientes();
    buscarMapaClientes();
}

function limpiarCamposFiltrosMapaClientes() {
    document.getElementById("filtroMapaClienteNombre").value = "";
    document.getElementById("filtroMapaClienteDocumento").value = "";
    document.getElementById("filtroMapaClienteLocal").value = "";
    document.getElementById("filtroMapaClienteVendedor").value = "";
    document.getElementById("filtroMapaClienteCobrador").value = "";
    document.getElementById("filtroMapaClienteFechaDesde").value = "";
    document.getElementById("filtroMapaClienteFechaHasta").value = "";
}

function formatearFechaInputMapaClientes(fecha) {
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();

    return fecha.getFullYear() + "-"
        + (mes < 10 ? "0" : "") + mes + "-"
        + (dia < 10 ? "0" : "") + dia;
}

function aplicarMesActualCobrosMapaClientes() {
    var fechaActual = new Date();
    var primerDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    var ultimoDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    document.getElementById("filtroMapaClienteFechaDesde").value = formatearFechaInputMapaClientes(primerDia);
    document.getElementById("filtroMapaClienteFechaHasta").value = formatearFechaInputMapaClientes(ultimoDia);
}

function limpiarFiltrosMapaClientes() {
    limpiarCamposFiltrosMapaClientes();
    if (mapaClientesTipo === "cobros") {
        aplicarMesActualCobrosMapaClientes();
    }
    cerrarFiltrosMapaClientes();
    buscarMapaClientes();
}

document.addEventListener("click", function (evento) {
    var fondo = document.getElementById("modalFiltrosMapaClientes");
    if (fondo && fondo.style.display !== "none" && evento.target === fondo) {
        cerrarFiltrosMapaClientes();
    }
});

document.addEventListener("keydown", function (evento) {
    var formulario = document.getElementById("divMapaClientes");
    if (evento.key === "Escape" && formulario && formulario.style.display !== "none") {
        var modal = document.getElementById("modalFiltrosMapaClientes");
        if (modal && modal.style.display !== "none") {
            cerrarFiltrosMapaClientes();
        } else {
            cerrarMapaClientes();
        }
    }
});
