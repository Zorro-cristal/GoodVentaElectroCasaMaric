(function (global) {
    "use strict";

    var modal = null;
    var ultimoFoco = null;
    var observadorResumen = null;

    function textoLimpio(elemento) {
        return elemento ? String(elemento.textContent || "").replace(/\s+/g, " ").trim() : "";
    }

    function obtenerCeldaProducto(fila, idCelda) {
        return fila ? fila.querySelector('td[id="' + idCelda + '"]') : null;
    }

    function obtenerProductosSeleccionados() {
        var cuerpo = document.getElementById("table_Solicitud_Credito_Producto");
        var filas = cuerpo ? cuerpo.querySelectorAll('tr[name="tdDetalleSolicitudCredito"]') : [];

        return Array.prototype.map.call(filas, function (fila) {
            var celdaCuotas = obtenerCeldaProducto(fila, "td_datos_5");
            var cuotasOriginales = celdaCuotas ? celdaCuotas.getAttribute("data-cuotas-original") : "";

            return {
                codigo: textoLimpio(obtenerCeldaProducto(fila, "td_datos_1")),
                producto: textoLimpio(obtenerCeldaProducto(fila, "td_datos_2")),
                cantidad: textoLimpio(obtenerCeldaProducto(fila, "td_datos_3")) || "1",
                precio: textoLimpio(obtenerCeldaProducto(fila, "td_datos_4")) || "0",
                cuotas: cuotasOriginales || textoLimpio(celdaCuotas) || "1"
            };
        }).filter(function (producto) {
            return producto.producto !== "";
        });
    }

    function formatearGuaranies(valor) {
        var numero = parseInt(String(valor == null ? "" : valor).replace(/[^0-9-]/g, ""), 10);

        if (isNaN(numero)) {
            numero = 0;
        }

        return "Gs. " + String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function crearItemResumenProducto(producto) {
        var item = document.createElement("article");
        var informacion = document.createElement("div");
        var nombre = document.createElement("p");
        var metadatos = document.createElement("p");
        var precio = document.createElement("div");
        var etiquetaPrecio = document.createElement("span");
        var valorPrecio = document.createElement("strong");
        var plan = document.createElement("div");
        var etiquetaPlan = document.createElement("span");
        var valorPlan = document.createElement("strong");
        var cantidadCuotas = parseInt(producto.cuotas, 10);

        item.className = "solicitud-productos-resumen__item";
        item.setAttribute("role", "listitem");
        informacion.className = "solicitud-productos-resumen__producto";
        nombre.className = "solicitud-productos-resumen__nombre";
        metadatos.className = "solicitud-productos-resumen__meta";
        precio.className = "solicitud-productos-resumen__dato";
        plan.className = "solicitud-productos-resumen__dato solicitud-productos-resumen__dato--plan";

        nombre.textContent = producto.producto;
        metadatos.textContent = (producto.codigo ? "Cod. " + producto.codigo + " · " : "") + "Cantidad: " + producto.cantidad;
        etiquetaPrecio.textContent = "Precio unitario";
        valorPrecio.textContent = formatearGuaranies(producto.precio);
        etiquetaPlan.textContent = "Plan";
        valorPlan.textContent = !isNaN(cantidadCuotas) && cantidadCuotas > 1 ? cantidadCuotas + " cuotas" : "Contado";

        informacion.appendChild(nombre);
        informacion.appendChild(metadatos);
        precio.appendChild(etiquetaPrecio);
        precio.appendChild(valorPrecio);
        plan.appendChild(etiquetaPlan);
        plan.appendChild(valorPlan);
        item.appendChild(informacion);
        item.appendChild(precio);
        item.appendChild(plan);

        return item;
    }

    function actualizarResumenProductosSolicitudCredito() {
        var cuerpoProductos = document.getElementById("table_Solicitud_Credito_Producto");
        var lista = document.getElementById("listaResumenProductosSolicitudCredito");
        var estado = document.getElementById("estadoResumenProductosSolicitudCredito");
        var tituloEstado = document.getElementById("tituloEstadoResumenProductosSolicitudCredito");
        var detalleEstado = document.getElementById("detalleEstadoResumenProductosSolicitudCredito");
        var contador = document.getElementById("contadorResumenProductosSolicitudCredito");
        var total = document.getElementById("totalResumenProductosSolicitudCredito");
        var boton = document.getElementById("btnAbrirProductosSolicitudCredito");

        if (!cuerpoProductos || !lista || !estado || !contador || !total) {
            return;
        }

        var productos = obtenerProductosSeleccionados();
        var estaCargando = !!cuerpoProductos.querySelector(".loading-container");
        var totalSolicitud = document.getElementById("inptTotalSolicitud");

        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }

        productos.forEach(function (producto) {
            lista.appendChild(crearItemResumenProducto(producto));
        });

        contador.textContent = productos.length + (productos.length === 1 ? " producto" : " productos");
        total.textContent = formatearGuaranies(productos.length > 0 && totalSolicitud ? totalSolicitud.value : 0);
        lista.hidden = productos.length === 0;
        estado.hidden = productos.length > 0;

        if (tituloEstado && detalleEstado) {
            tituloEstado.textContent = estaCargando ? "Cargando productos..." : "Todavía no agregaste productos";
            detalleEstado.textContent = estaCargando
                ? "Estamos recuperando los artículos y sus planes."
                : "Abrí el panel para buscar productos, comparar precios y seleccionar el plan de cuotas.";
        }

        if (boton) {
            boton.textContent = productos.length > 0 ? "Administrar productos" : "Agregar productos";
        }
    }

    function estaVisible(elemento) {
        return elemento && global.getComputedStyle(elemento).display !== "none";
    }

    function obtenerElementosEnfocables() {
        if (!modal) {
            return [];
        }

        return Array.prototype.slice.call(modal.querySelectorAll(
            'button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(estaVisible);
    }

    function cerrarProductosSolicitudCredito(restaurarFoco) {
        if (!modal || !modal.classList.contains("solicitud-productos-modal--abierto")) {
            return;
        }

        modal.classList.remove("solicitud-productos-modal--abierto");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("solicitud-productos-modal-abierto");

        if (restaurarFoco !== false && ultimoFoco && document.documentElement.contains(ultimoFoco)) {
            ultimoFoco.focus();
        }
    }

    function abrirProductosSolicitudCredito() {
        if (!modal) {
            return;
        }

        actualizarResumenProductosSolicitudCredito();
        ultimoFoco = document.activeElement;
        modal.classList.add("solicitud-productos-modal--abierto");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("solicitud-productos-modal-abierto");

        global.setTimeout(function () {
            var buscador = document.getElementById("inptRefNombreProducto");
            var cerrar = modal.querySelector(".solicitud-productos-modal__cerrar");

            if (buscador && !buscador.disabled) {
                buscador.focus();
            } else if (cerrar) {
                cerrar.focus();
            }

            if (typeof global.Event === "function") {
                global.dispatchEvent(new Event("resize"));
            }
        }, 40);
    }

    function controlarTeclado(evento) {
        if (!modal || !modal.classList.contains("solicitud-productos-modal--abierto")) {
            return;
        }

        if (evento.key === "Escape" || evento.keyCode === 27) {
            evento.preventDefault();
            cerrarProductosSolicitudCredito(true);
            return;
        }

        if (evento.key !== "Tab" && evento.keyCode !== 9) {
            return;
        }

        var elementos = obtenerElementosEnfocables();
        if (!elementos.length) {
            evento.preventDefault();
            return;
        }

        var primero = elementos[0];
        var ultimo = elementos[elementos.length - 1];

        if (evento.shiftKey && document.activeElement === primero) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primero.focus();
        }
    }

    function crearLanzador() {
        var lanzador = document.createElement("div");
        lanzador.className = "solicitud-productos-lanzador";
        lanzador.innerHTML =
            '<header class="solicitud-productos-lanzador__cabecera">' +
                '<div class="solicitud-productos-lanzador__identidad">' +
                    '<div class="solicitud-productos-lanzador__icono" aria-hidden="true">' +
                        '<span></span><span></span><span></span>' +
                    '</div>' +
                    '<div class="solicitud-productos-lanzador__texto">' +
                        '<p class="solicitud-productos-lanzador__titulo">Productos de la solicitud</p>' +
                        '<p class="solicitud-productos-lanzador__detalle">Resumen de artículos, precios y planes seleccionados.</p>' +
                    '</div>' +
                '</div>' +
                '<span id="contadorResumenProductosSolicitudCredito" class="solicitud-productos-lanzador__contador" aria-live="polite">0 productos</span>' +
            '</header>' +
            '<div class="solicitud-productos-lanzador__contenido">' +
                '<div id="estadoResumenProductosSolicitudCredito" class="solicitud-productos-resumen__vacio">' +
                    '<span class="solicitud-productos-resumen__vacio-icono" aria-hidden="true">+</span>' +
                    '<p id="tituloEstadoResumenProductosSolicitudCredito" class="solicitud-productos-resumen__vacio-titulo">Todavía no agregaste productos</p>' +
                    '<p id="detalleEstadoResumenProductosSolicitudCredito" class="solicitud-productos-resumen__vacio-detalle">Abrí el panel para buscar productos, comparar precios y seleccionar el plan de cuotas.</p>' +
                '</div>' +
                '<div id="listaResumenProductosSolicitudCredito" class="solicitud-productos-resumen__lista" role="list" aria-label="Productos agregados" hidden></div>' +
            '</div>' +
            '<footer class="solicitud-productos-lanzador__pie">' +
                '<div class="solicitud-productos-lanzador__total">' +
                    '<span>Total de la solicitud</span>' +
                    '<strong id="totalResumenProductosSolicitudCredito">Gs. 0</strong>' +
                '</div>' +
                '<button id="btnAbrirProductosSolicitudCredito" type="button" class="solicitud-productos-lanzador__boton" aria-haspopup="dialog" aria-controls="modalProductosSolicitudCredito">' +
                    'Agregar productos' +
                '</button>' +
            '</footer>';

        lanzador.querySelector("button").addEventListener("click", abrirProductosSolicitudCredito);
        return lanzador;
    }

    function observarResumenProductosSolicitudCredito() {
        var cuerpoProductos = document.getElementById("table_Solicitud_Credito_Producto");
        var entrega = document.getElementById("inptEntregaSolicitudCredito");

        if (!cuerpoProductos) {
            return;
        }

        if (typeof global.MutationObserver === "function") {
            observadorResumen = new MutationObserver(actualizarResumenProductosSolicitudCredito);
            observadorResumen.observe(cuerpoProductos, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }

        if (entrega) {
            entrega.addEventListener("input", actualizarResumenProductosSolicitudCredito);
            entrega.addEventListener("change", actualizarResumenProductosSolicitudCredito);
        }

        actualizarResumenProductosSolicitudCredito();
    }

    function crearModal(contenedorProductos) {
        modal = document.createElement("div");
        modal.id = "modalProductosSolicitudCredito";
        modal.className = "solicitud-productos-modal";
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML =
            '<div class="solicitud-productos-modal__fondo" data-cerrar-productos="true"></div>' +
            '<section class="solicitud-productos-modal__dialogo" role="dialog" aria-modal="true" aria-labelledby="tituloModalProductosSolicitudCredito" aria-describedby="descripcionModalProductosSolicitudCredito">' +
                '<header class="solicitud-productos-modal__cabecera">' +
                    '<div class="solicitud-productos-modal__cabecera-texto">' +
                        '<span class="solicitud-productos-modal__indicador" aria-hidden="true"></span>' +
                        '<div>' +
                            '<h2 id="tituloModalProductosSolicitudCredito">Productos de la solicitud de crédito</h2>' +
                            '<p id="descripcionModalProductosSolicitudCredito">Buscá, seleccioná y configurá los productos con mayor comodidad.</p>' +
                        '</div>' +
                    '</div>' +
                    '<button type="button" class="solicitud-productos-modal__cerrar" data-cerrar-productos="true" aria-label="Cerrar productos">&times;</button>' +
                '</header>' +
                '<div class="solicitud-productos-modal__cuerpo"></div>' +
                '<footer class="solicitud-productos-modal__pie">' +
                    '<p>Los cambios realizados quedan aplicados a la solicitud actual.</p>' +
                    '<button type="button" class="solicitud-productos-modal__volver" data-cerrar-productos="true">Volver a la solicitud</button>' +
                '</footer>' +
            '</section>';

        contenedorProductos.classList.add("solicitud-productos-modal__contenido");
        modal.querySelector(".solicitud-productos-modal__cuerpo").appendChild(contenedorProductos);
        document.body.appendChild(modal);

        modal.addEventListener("click", function (evento) {
            if (evento.target && evento.target.getAttribute("data-cerrar-productos") === "true") {
                cerrarProductosSolicitudCredito(true);
            }
        });
    }

    function observarCierreDelFormulario() {
        var formulario = document.getElementById("divAbmSolicitudCredito2");
        if (!formulario || typeof global.MutationObserver !== "function") {
            return;
        }

        var observador = new MutationObserver(function () {
            if (modal && modal.classList.contains("solicitud-productos-modal--abierto") && !estaVisible(formulario)) {
                cerrarProductosSolicitudCredito(false);
            }
        });

        observador.observe(formulario, {
            attributes: true,
            attributeFilter: ["class", "style"]
        });
    }

    function iniciarModalProductosSolicitudCredito() {
        var cuerpoProductos = document.getElementById("table_vista_ProDuc_Solicitud_Credito");
        if (!cuerpoProductos) {
            return;
        }

        var contenedorProductos = cuerpoProductos.closest(".divMenuf");
        var celdaOrigen = contenedorProductos ? contenedorProductos.parentNode : null;

        if (!contenedorProductos || !celdaOrigen || contenedorProductos.getAttribute("data-modal-inicializado") === "si") {
            return;
        }

        contenedorProductos.setAttribute("data-modal-inicializado", "si");
        celdaOrigen.classList.add("solicitud-productos-celda");
        celdaOrigen.insertBefore(crearLanzador(), contenedorProductos);
        crearModal(contenedorProductos);
        observarResumenProductosSolicitudCredito();
        observarCierreDelFormulario();
        document.addEventListener("keydown", controlarTeclado);
    }

    global.abrirProductosSolicitudCredito = abrirProductosSolicitudCredito;
    global.cerrarProductosSolicitudCredito = cerrarProductosSolicitudCredito;
    global.actualizarResumenProductosSolicitudCredito = actualizarResumenProductosSolicitudCredito;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarModalProductosSolicitudCredito);
    } else {
        iniciarModalProductosSolicitudCredito();
    }
}(window));
