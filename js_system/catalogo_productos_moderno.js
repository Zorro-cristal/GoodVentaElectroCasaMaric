(function () {
    "use strict";

    var solicitudCatalogoActiva = null;

    function elemento(id) {
        return document.getElementById(id);
    }

    function valor(id) {
        var control = elemento(id);
        return control ? control.value : "";
    }

    function textoSelect(id, vacio) {
        var control = elemento(id);
        if (!control || control.value === "") return vacio;
        return control.options && control.selectedIndex >= 0
            ? control.options[control.selectedIndex].text
            : control.value;
    }

    function estadoCatalogo(mensaje, error) {
        var contenedor = elemento("table_comision_productos_catalago");
        if (!contenedor) return;
        contenedor.className = "catalogo-contenedor catalogo-contenedor--estado";
        contenedor.innerHTML = "";
        var estado = document.createElement("div");
        estado.className = error ? "catalogo-estado catalogo-estado--error" : "catalogo-estado";
        estado.textContent = mensaje;
        contenedor.appendChild(estado);
    }

    function mostrarProcesoCatalogo() {
        var proceso = elemento("tbProcessCatalogo");
        var barra = elemento("divProgressCatalogo");
        if (proceso) proceso.classList.add("activo");
        if (barra) barra.classList.add("indeterminado");
    }

    function ocultarProcesoCatalogo() {
        var proceso = elemento("tbProcessCatalogo");
        var barra = elemento("divProgressCatalogo");
        if (barra) {
            barra.classList.remove("indeterminado");
            barra.style.width = "100%";
        }
        window.setTimeout(function () {
            if (proceso) proceso.classList.remove("activo");
            if (barra) barra.style.width = "";
        }, 180);
    }

    function abrirDetalleCatalogo(codigo) {
        if (typeof window.obtenerdatoscatalogo !== "function") return;
        window.obtenerdatoscatalogo({ id: codigo });
    }

    function formatearNumero(numero) {
        var valorNumero = Number(numero);
        if (!isFinite(valorNumero)) valorNumero = 0;
        return valorNumero.toLocaleString("es-PY", { maximumFractionDigits: 2 });
    }

    function crearTexto(etiqueta, contenido) {
        var parrafo = document.createElement("p");
        var fuerte = document.createElement("strong");
        fuerte.textContent = etiqueta;
        parrafo.appendChild(fuerte);
        parrafo.appendChild(document.createTextNode(contenido || ""));
        return parrafo;
    }

    window.renderizarCatalogoProductos = function (registros) {
        var contenedor = elemento("table_comision_productos_catalago");
        if (!contenedor) return;
        contenedor.className = "catalogo-contenedor";
        contenedor.innerHTML = "";
        if (!Array.isArray(registros) || registros.length === 0) {
            estadoCatalogo("No se encontraron productos con los filtros seleccionados.", false);
            return;
        }

        var fragmento = document.createDocumentFragment();
        registros.forEach(function (registro) {
            var codigo = registro.codigo || "";
            var stock = Number(registro.stock) || 0;
            var tarjeta = document.createElement("article");
            tarjeta.className = "catalogo-card";
            tarjeta.tabIndex = 0;
            tarjeta.setAttribute("role", "button");
            tarjeta.setAttribute("aria-label", "Ver detalle de " + (registro.producto || "producto"));
            tarjeta.addEventListener("click", function () { abrirDetalleCatalogo(codigo); });
            tarjeta.addEventListener("keydown", function (evento) {
                if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    abrirDetalleCatalogo(codigo);
                }
            });

            var interior = document.createElement("div");
            interior.className = "catalogo-card-inner";
            var imagenWrap = document.createElement("div");
            imagenWrap.className = "catalogo-imagen-wrap";

            if (Number(registro.puntos) > 0) {
                var puntos = document.createElement("span");
                puntos.className = "catalogo-badge-puntos";
                puntos.textContent = formatearNumero(registro.puntos) + " pts";
                imagenWrap.appendChild(puntos);
            }

            var stockBadge = document.createElement("span");
            stockBadge.className = "catalogo-stock";
            if (stock <= 0) stockBadge.className += " catalogo-stock-cero";
            else if (stock < 5) stockBadge.className += " catalogo-stock-bajo";
            stockBadge.textContent = "Stock " + formatearNumero(stock);
            imagenWrap.appendChild(stockBadge);

            var imagen = document.createElement("img");
            imagen.className = "catalogo-imagen";
            imagen.src = registro.imagen_url || "/GoodVentaElectroCasaMaric/iconos/imagen.png";
            imagen.alt = registro.producto || "Producto";
            imagen.loading = "lazy";
            imagen.addEventListener("error", function () {
                imagen.src = "/GoodVentaElectroCasaMaric/iconos/imagen.png";
            }, { once: true });
            imagenWrap.appendChild(imagen);

            var info = document.createElement("div");
            info.className = "catalogo-info";
            var titulo = document.createElement("h3");
            titulo.className = "catalogo-producto";
            titulo.textContent = registro.producto || "Producto sin nombre";
            info.appendChild(titulo);

            var meta = document.createElement("div");
            meta.className = "catalogo-meta";
            meta.appendChild(crearTexto("Marca: ", registro.marca || "Sin marca"));
            meta.appendChild(crearTexto("Código: ", registro.codigo_barra || codigo));
            meta.appendChild(crearTexto("Existencia total: ", formatearNumero(stock)));
            info.appendChild(meta);

            var precio = document.createElement("div");
            precio.className = "catalogo-precio-normal";
            precio.textContent = Number(registro.precio_contado) > 0
                ? (registro.precio_contado_formateado || formatearNumero(registro.precio_contado)) + " Gs."
                : "Sin precio cargado";
            info.appendChild(precio);

            var acciones = document.createElement("div");
            acciones.className = "catalogo-acciones";
            var ver = document.createElement("button");
            ver.type = "button";
            ver.className = "catalogo-btn-ver-producto";
            ver.textContent = "Ver producto";
            ver.addEventListener("click", function (evento) {
                evento.stopPropagation();
                abrirDetalleCatalogo(codigo);
            });
            acciones.appendChild(ver);
            info.appendChild(acciones);

            interior.appendChild(imagenWrap);
            interior.appendChild(info);
            tarjeta.appendChild(interior);
            fragmento.appendChild(tarjeta);
        });
        contenedor.appendChild(fragmento);
    };

    window.actualizarResumenFiltrosCatalogo = function () {
        var resumen = elemento("catalogoFiltrosActivos");
        if (!resumen) return;
        var filtros = [];
        var buscador = valor("inptProveedorProductoCatalogo").trim();
        var promo = textoSelect("inptPromoProductoCatalogo", "");
        var categoria = textoSelect("inptCategoriaProductoCatalogo", "");
        var marca = textoSelect("inptMarcaProductoCatalogo3", "");
        var existencia = textoSelect("inptStockProductoCatalogo", "");
        if (buscador) filtros.push(["Búsqueda", buscador, "busqueda"]);
        if (promo && promo !== "TODOS") filtros.push(["Promo", promo, "promo"]);
        if (categoria && categoria !== "SELECCIONAR" && categoria !== "TODAS") filtros.push(["Categoría", categoria, "categoria"]);
        if (marca && marca !== "SELECCIONAR" && marca !== "TODAS") filtros.push(["Marca", marca, "marca"]);
        if (existencia && existencia !== "TODOS") filtros.push(["Existencia", existencia, "stock"]);
        resumen.innerHTML = "";
        if (!filtros.length) {
            var vacio = document.createElement("span");
            vacio.className = "chip-filtro";
            vacio.textContent = "Sin filtros aplicados";
            resumen.appendChild(vacio);
            return;
        }
        filtros.forEach(function (filtro) {
            var chip = document.createElement("span");
            chip.className = "chip-filtro";
            chip.appendChild(document.createTextNode(filtro[0] + ": " + filtro[1] + " "));
            var cerrar = document.createElement("button");
            cerrar.type = "button";
            cerrar.className = "chip-close";
            cerrar.textContent = "×";
            cerrar.setAttribute("aria-label", "Quitar filtro " + filtro[0]);
            cerrar.addEventListener("click", function () { window.quitarFiltroCatalogo(filtro[2]); });
            chip.appendChild(cerrar);
            resumen.appendChild(chip);
        });
    };

    window.abrirPopupFiltrosCatalogo = function () {
        var modal = elemento("modalFiltrosCatalogo");
        if (modal) modal.classList.add("activo");
    };

    window.cerrarPopupFiltrosCatalogo = function () {
        var modal = elemento("modalFiltrosCatalogo");
        if (modal) modal.classList.remove("activo");
    };

    window.aplicarFiltrosCatalogo = function () {
        window.cerrarPopupFiltrosCatalogo();
        window.buscarproductoscatalago();
    };

    window.limpiarFiltrosCatalogo = function () {
        ["inptProveedorProductoCatalogo", "inptPromoProductoCatalogo",
            "inptCategoriaProductoCatalogo", "inptMarcaProductoCatalogo3"].forEach(function (id) {
            var control = elemento(id);
            if (control) control.value = "";
        });
        var stock = elemento("inptStockProductoCatalogo");
        if (stock) stock.value = "2";
        window.actualizarResumenFiltrosCatalogo();
        window.buscarproductoscatalago();
    };

    window.quitarFiltroCatalogo = function (tipo) {
        var mapa = {
            busqueda: "inptProveedorProductoCatalogo",
            promo: "inptPromoProductoCatalogo",
            categoria: "inptCategoriaProductoCatalogo",
            marca: "inptMarcaProductoCatalogo3"
        };
        if (tipo === "stock") {
            var stock = elemento("inptStockProductoCatalogo");
            if (stock) stock.value = "2";
        } else if (mapa[tipo] && elemento(mapa[tipo])) {
            elemento(mapa[tipo]).value = "";
        }
        window.actualizarResumenFiltrosCatalogo();
        window.buscarproductoscatalago();
    };

    window.cancelarCatalogo = function () {
        if (solicitudCatalogoActiva && solicitudCatalogoActiva.readyState !== 4) {
            solicitudCatalogoActiva.abort();
        }
        solicitudCatalogoActiva = null;
        ocultarProcesoCatalogo();
        estadoCatalogo("La búsqueda fue cancelada.", false);
    };

    window.buscarproductoscatalago = function () {
        if (typeof controlacceso === "function" && controlacceso("VERCATALOGO", "accion") === false) return;
        if (solicitudCatalogoActiva && solicitudCatalogoActiva.readyState !== 4) {
            solicitudCatalogoActiva.abort();
        }
        window.actualizarResumenFiltrosCatalogo();
        estadoCatalogo("Buscando productos y verificando existencias...", false);
        mostrarProcesoCatalogo();
        if (typeof obtener_datos_user === "function") obtener_datos_user();
        solicitudCatalogoActiva = $.ajax({
            data: {
                useru: window.userid,
                passu: window.passuser,
                navegador: window.navegador,
                descripcion: valor("inptProveedorProductoCatalogo"),
                categoria: valor("inptCategoriaProductoCatalogo"),
                marca: valor("inptMarcaProductoCatalogo3"),
                control: valor("inptStockProductoCatalogo"),
                // El catálogo es una vista consolidada: no debe heredar el local
                // asignado por el cargador global a controles ocultos.
                local: "",
                promo: valor("inptPromoProductoCatalogo"),
                formato: "json",
                funt: "buscarCatalogo"
            },
            url: "/GoodVentaElectroCasaMaric/php_system/abmproductos.php",
            type: "post",
            timeout: 45000,
            error: function (xhr, estado) {
                if (estado === "abort") return;
                solicitudCatalogoActiva = null;
                ocultarProcesoCatalogo();
                estadoCatalogo("No se pudo cargar el catálogo. Intente nuevamente.", true);
                if (typeof manejadordeerroresjquery === "function") {
                    manejadordeerroresjquery(xhr.status, estado, "abmventana");
                }
            },
            success: function (respuesta) {
                solicitudCatalogoActiva = null;
                ocultarProcesoCatalogo();
                try {
                    var datos = typeof respuesta === "string" ? $.parseJSON(respuesta) : respuesta;
                    var correcto = typeof respuestaJqueryAjax === "function"
                        ? respuestaJqueryAjax(datos["1"]) === true
                        : datos["1"] === "exito";
                    if (!correcto) {
                        estadoCatalogo("No se pudo cargar el catálogo.", true);
                        return;
                    }
                    window.renderizarCatalogoProductos(Array.isArray(datos[2]) ? datos[2] : []);
                } catch (error) {
                    estadoCatalogo("La respuesta del catálogo no pudo procesarse.", true);
                    if (typeof GuardarArchivosLog === "function") {
                        GuardarArchivosLog("Error catálogo: " + error + "\r\nConsola: " + respuesta);
                    }
                }
            }
        });
    };

    function montarCatalogo() {
        var raiz = elemento("divInformeCatalago");
        if (!raiz || raiz.getAttribute("data-catalogo-moderno") === "SI") return;
        raiz.setAttribute("data-catalogo-moderno", "SI");
        raiz.className = "principal2 catalogo-panel";
        raiz.innerHTML = [
            '<div class="catalogo-ventana divAbms">',
            '<header class="catalogo-header"><div class="catalogo-header-left">',
            '<p class="catalogo-titulo">Imprimir <b>Catálogo</b></p>',
            '<p class="catalogo-subtitulo">Productos, precios y existencias disponibles</p>',
            '</div><div class="catalogo-header-right">',
            '<button type="button" class="btn-icon" title="Filtros" aria-label="Abrir filtros" onclick="abrirPopupFiltrosCatalogo()"><img src="/GoodVentaElectroCasaMaric/iconos/etiquetafiltrar.png" alt=""></button>',
            '<button type="button" class="btn-icon" title="Minimizar" aria-label="Minimizar catálogo" onclick="minimizarcatalogo()"><img src="/GoodVentaElectroCasaMaric/iconos/minimizar2.png" alt=""></button>',
            '<button type="button" class="btn-icon" title="Cerrar" aria-label="Cerrar catálogo" onclick="verCerrarInformeCatalogo()"><img src="/GoodVentaElectroCasaMaric/iconos/botonCerrar.png" alt=""></button>',
            '</div></header>',
            '<div class="catalogo-toolbar"><div class="catalogo-toolbar-left"><div class="catalogo-buscador">',
            '<input type="search" id="inptProveedorProductoCatalogo" class="catalogo-selectBuscador" placeholder="Buscar por producto, código o código de barras..." aria-label="Buscar producto" onkeyup="if(event.keyCode===13){buscarproductoscatalago()}">',
            '<button type="button" class="btn-catalogo btn-buscar" onclick="buscarproductoscatalago()">Buscar</button>',
            '</div></div><div class="catalogo-toolbar-right">',
            '<button type="button" class="btn-catalogo btn-oscuro" onclick="ordenimpresion(\'catalago\')">Imprimir</button>',
            '<button type="button" class="btn-catalogo btn-secundario" onclick="abrirPopupFiltrosCatalogo()">Filtros</button>',
            '</div></div>',
            '<div class="catalogo-filtros-activos" id="catalogoFiltrosActivos"></div>',
            '<div class="catalogo-contenedor catalogo-contenedor--estado" id="table_comision_productos_catalago"></div>',
            '<div class="catalogo-proceso" id="tbProcessCatalogo" aria-live="polite"><div class="catalogo-progreso-wrap"><div class="catalogo-progreso-barra" role="progressbar" aria-label="Cargando catálogo"><div class="catalogo-progreso-valor" id="divProgressCatalogo"></div></div></div><button type="button" class="btn-catalogo btn-oscuro" onclick="cancelarCatalogo()">Cancelar</button></div>',
            '</div>',
            '<div class="modal-filtros-catalogo" id="modalFiltrosCatalogo"><div class="modal-filtros-overlay" onclick="cerrarPopupFiltrosCatalogo()"></div><section class="modal-filtros-box" role="dialog" aria-modal="true" aria-labelledby="tituloFiltrosCatalogo">',
            '<header class="modal-filtros-header"><h3 id="tituloFiltrosCatalogo">Filtros del catálogo</h3><button type="button" class="btn-cerrar-modal" aria-label="Cerrar filtros" onclick="cerrarPopupFiltrosCatalogo()">×</button></header>',
            '<div class="modal-filtros-body">',
            '<div class="filtro-grupo"><label for="inptStockProductoCatalogo">Existencia</label><select id="inptStockProductoCatalogo" class="catalogo-select"><option value="">TODOS</option><option value="2" selected>CON EXISTENCIA</option><option value="3">SIN EXISTENCIA</option></select></div>',
            '<div class="filtro-grupo"><label for="inptPromoProductoCatalogo">Promoción</label><select id="inptPromoProductoCatalogo" class="catalogo-select"><option value="">TODOS</option><option value="SI">SI</option><option value="NO">NO</option><option value="BLACK FRIDAY">BLACK FRIDAY</option><option value="REMATE">REMATE</option><option value="RECUPERADO">RECUPERADO</option><option value="DÍA DE LA MADRE">DÍA DE LA MADRE</option><option value="DÍA DEL PADRE">DÍA DEL PADRE</option></select></div>',
            '<div class="filtro-grupo"><label for="inptCategoriaProductoCatalogo">Categoría</label><select id="inptCategoriaProductoCatalogo" class="catalogo-select"><option value="">TODAS</option></select></div>',
            '<div class="filtro-grupo"><label for="inptMarcaProductoCatalogo3">Marca</label><select id="inptMarcaProductoCatalogo3" class="catalogo-select"><option value="">TODAS</option></select></div>',
            '<div class="filtro-grupo" hidden aria-hidden="true"><label for="inptlocalProductoBuscarCatalago">Local</label><select id="inptlocalProductoBuscarCatalago" class="catalogo-select" tabindex="-1"><option value="">TODOS LOS LOCALES ACTIVOS</option></select></div>',
            '</div><footer class="modal-filtros-footer"><button type="button" class="btn-catalogo btn-light" onclick="limpiarFiltrosCatalogo()">Limpiar</button><button type="button" class="btn-catalogo btn-buscar" onclick="aplicarFiltrosCatalogo()">Aplicar filtros</button></footer>',
            '</section></div>'
        ].join("");
        window.actualizarResumenFiltrosCatalogo();
        estadoCatalogo("Use el buscador o los filtros para cargar el catálogo.", false);
        window.setTimeout(function () {
            if (typeof BuscarSelecCategoria === "function") BuscarSelecCategoria();
            if (typeof BuscarSelectMarca === "function") BuscarSelectMarca();
        }, 0);
    }

    document.addEventListener("DOMContentLoaded", montarCatalogo);
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") window.cerrarPopupFiltrosCatalogo();
    });
}());
