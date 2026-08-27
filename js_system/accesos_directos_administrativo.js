(function (global) {
    "use strict";

    var catalogoAccesos = [];
    var accionesGuardadas = [];
    var seleccionTemporal = {};
    var distribucionAccesosAdministrativos = {
        ContenedorVentas: [
            "divMenuVerificarGestionarReferenciaCliente2",
            "divMenuVerificarEquifax1",
            "divMenuHistorialVenta2",
            "divMenuProductosGarantia",
            "divMenuListadoDespachado",
            "divMenuPresupuestoProducto",
            "divMenuRevisionDocumentos",
            "divMenuListadoSoliicitudDespacho",
            "divMenuListadoCallCenterVentas",
            "divMenuClientesTrabajados"
        ],
        ContenedorCobranza: [
            "divMenuCuentasCobar2",
            "divMenuExpedienteCliente2",
            "divMenuAgenda",
            "divMenuCuentasClienteMoroso",
            "divMenuRevisionDocumentosCliente",
            "divMenuInformconf",
            "divMenuListadoCallCenter",
            "divMenuClienteParaInforconf",
            "divMenuCalificacionEntrega",
            "divMenuInformeGeneralCuentasCliente"
        ],
        ContenedorTesoreria: [
            "divMenuCompra2",
            "divMenuCuentasPagar",
            "divMenuHistorialCompra",
            "divMenuApp",
            "divMenuPagoProveedor"
        ]
    };
    var destinoAccesosAdministrativosGenerados = {
        divMenuCreditoAprobar: "ContenedorVentas",
        divMenuVenta: "ContenedorVentas",
        divMenuSolicitudCredito: "ContenedorVentas",
        divMenuCancelacion: "ContenedorVentas",
        divMenuCalculadoraPrecio: "ContenedorVentas",
        divMenuArqueo: "ContenedorTesoreria",
        divMenuMigrarCaja: "ContenedorTesoreria",
        divMenuRecibirCaja: "ContenedorTesoreria"
    };

    function accionNormalizada(elemento) {
        return String(elemento.getAttribute("onclick") || "")
            .replace(/\s+/g, "")
            .replace(/;+$/, "");
    }

    function existeOtroAcceso(origen, accion) {
        var botones = document.querySelectorAll(".contenedorAccesoDirecto .divMenub");
        for (var i = 0; i < botones.length; i++) {
            if (botones[i] === origen || botones[i].hasAttribute("data-acceso-administrativo-generado")) continue;
            if (accionNormalizada(botones[i]) === accion) return true;
        }
        return false;
    }

    function limpiarIdsInternos(clon) {
        var elementosConId = clon.querySelectorAll("[id]");
        for (var i = 0; i < elementosConId.length; i++) {
            elementosConId[i].removeAttribute("id");
        }
        var minimizados = clon.querySelectorAll(".divMinimizado");
        for (var j = 0; j < minimizados.length; j++) {
            if (minimizados[j].parentNode) minimizados[j].parentNode.removeChild(minimizados[j]);
        }
    }

    function distribuirBotonesAdministrativos() {
        Object.keys(distribucionAccesosAdministrativos).forEach(function (idContenedor) {
            var contenedor = document.getElementById(idContenedor);
            var destino = contenedor ? contenedor.querySelector(".insights") : null;
            if (!destino) return;

            distribucionAccesosAdministrativos[idContenedor].forEach(function (idBoton) {
                var boton = document.getElementById(idBoton);
                if (!boton) return;
                boton.setAttribute("data-seccion-reubicada", idContenedor);
                destino.appendChild(boton);
            });
        });
    }

    function agruparAccesosCreditoVentas() {
        var contenedorVentas = document.getElementById("ContenedorVentas");
        var destino = contenedorVentas ? contenedorVentas.querySelector(".insights") : null;
        if (!destino) return;

        var grupo = document.createDocumentFragment();
        [
            "divMenuVerificarGestionarReferenciaCliente2",
            "divMenuVerificarEquifax1",
            "divMenuCreditoAprobarAdministrativoDirecto"
        ].forEach(function (idBoton) {
            var boton = document.getElementById(idBoton);
            if (boton) grupo.appendChild(boton);
        });

        destino.insertBefore(grupo, destino.firstElementChild || null);
    }

    function generarAccesosDirectosAdministrativo() {
        distribuirBotonesAdministrativos();

        var administrativo = document.getElementById("ContenedorAdministrativo");
        var destino = administrativo ? administrativo.querySelector(".insights") : null;
        if (!destino) return;

        var anteriores = document.querySelectorAll("[data-acceso-administrativo-generado]");
        for (var i = 0; i < anteriores.length; i++) {
            if (anteriores[i].parentNode) anteriores[i].parentNode.removeChild(anteriores[i]);
        }

        var botonesMenu = document.querySelectorAll("#menuDirectOrigen > .divMenub");
        for (var j = 0; j < botonesMenu.length; j++) {
            var origen = botonesMenu[j];
            var accion = accionNormalizada(origen);
            if (!accion || existeOtroAcceso(origen, accion)) continue;

            var clon = origen.cloneNode(true);
            limpiarIdsInternos(clon);
            clon.id = (origen.id || "accesoFormulario" + j) + "AdministrativoDirecto";
            clon.setAttribute("data-acceso-administrativo-generado", origen.id || accion);
            clon.setAttribute("title", "Acceso directo a " + obtenerTitulo(origen));
            var idContenedorDestino = destinoAccesosAdministrativosGenerados[origen.id];
            var contenedorDestino = idContenedorDestino ? document.getElementById(idContenedorDestino) : null;
            var listaDestino = contenedorDestino ? contenedorDestino.querySelector(".insights") : destino;
            listaDestino.appendChild(clon);
        }

        agruparAccesosCreditoVentas();
        catalogoAccesos = obtenerCatalogoPermitido();
        prepararModalConfiguracion();
        cargarConfiguracionAccesoDirecto();
    }

    function obtenerTitulo(elemento) {
        var titulo = elemento.querySelector(".pTitulo4");
        return String(titulo ? titulo.textContent : "Formulario").replace(/\s+/g, " ").trim();
    }

    function obtenerSeccion(elemento) {
        var contenedor = elemento.closest ? elemento.closest(".contenedorAccesoDirecto") : null;
        var nombres = {
            ContenedorAccesoDirecto: "Acceso directo",
            ContenedorListado: "Listados",
            ContenedorAdministrativo: "Administrativo",
            ContenedorTesoreria: "Tesorería",
            ContenedorInforme: "Informes",
            ContenedorCobranza: "Cobranzas",
            ContenedorVentas: "Ventas",
            ContenedorSistema: "Sistema"
        };
        return contenedor && nombres[contenedor.id] ? nombres[contenedor.id] : "Otros";
    }

    function obtenerCategoria(elemento) {
        var categoria = elemento.getAttribute("data-menu-category");
        if (categoria) return categoria;
        var contenedor = elemento.closest ? elemento.closest(".contenedorAccesoDirecto") : null;
        if (contenedor && contenedor.id === "ContenedorVentas") return "ventas";
        if (contenedor && contenedor.id === "ContenedorCobranza") return "cobranzas";
        return "administracion";
    }

    function tarjetaHabilitada(elemento) {
        return !elemento.hidden &&
            elemento.style.display !== "none" &&
            !elemento.hasAttribute("data-acceso-directo-seleccionado");
    }

    function obtenerCatalogoPermitido() {
        var botones = document.querySelectorAll(".contenedorAccesoDirecto .insights > .divMenub");
        var accionesVistas = {};
        var catalogo = [];
        for (var i = 0; i < botones.length; i++) {
            var boton = botones[i];
            var accion = accionNormalizada(boton);
            if (!accion || !tarjetaHabilitada(boton) || accionesVistas[accion]) continue;
            accionesVistas[accion] = true;
            var imagen = boton.querySelector(".imgIconoMenu");
            catalogo.push({
                accion: accion,
                titulo: obtenerTitulo(boton),
                seccion: obtenerSeccion(boton),
                categoria: obtenerCategoria(boton),
                imagen: imagen ? imagen.getAttribute("src") : "",
                origen: boton
            });
        }
        catalogo.sort(function (a, b) {
            return a.titulo.localeCompare(b.titulo);
        });
        return catalogo;
    }

    function prepararModalConfiguracion() {
        var modal = document.getElementById("modalConfigurarAccesoDirecto");
        if (modal && modal.parentNode !== document.body) document.body.appendChild(modal);
        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") cerrarConfiguracionAccesoDirecto();
        });
    }

    function cargarConfiguracionAccesoDirecto() {
        obtener_datos_user();
        $.ajax({
            data: {
                useru: userid,
                passu: passuser,
                navegador: navegador,
                funt: "cargar"
            },
            url: "/GoodVentaElectroCasaMaric/php_system/accesos_directos_usuario.php",
            type: "post",
            error: function () {
                accionesGuardadas = [];
                renderizarAccesosSeleccionados();
            },
            success: function (responseText) {
                try {
                    var respuesta = $.parseJSON(responseText);
                    accionesGuardadas = respuesta["1"] === "exito" && Array.isArray(respuesta["2"])
                        ? respuesta["2"]
                        : [];
                } catch (error) {
                    accionesGuardadas = [];
                    GuardarArchivosLog("Error al cargar accesos directos: " + error);
                }
                renderizarAccesosSeleccionados();
            }
        });
    }

    function clonarTarjetaSeleccionada(item, indice) {
        var clon = item.origen.cloneNode(true);
        limpiarIdsInternos(clon);
        clon.id = "accesoDirectoUsuario" + indice;
        clon.style.display = "";
        clon.setAttribute("data-acceso-directo-seleccionado", item.accion);
        clon.setAttribute("data-menu-category", item.categoria);
        clon.setAttribute("title", "Abrir " + item.titulo);
        return clon;
    }

    function renderizarAccesosSeleccionados() {
        var destino = document.getElementById("menuDirectSeleccionados");
        var contenedor = document.getElementById("ContenedorAccesoDirecto");
        if (!destino || !contenedor) return;
        destino.innerHTML = "";
        var mapa = {};
        catalogoAccesos.forEach(function (item) {
            mapa[item.accion] = item;
        });
        var visibles = [];
        accionesGuardadas.forEach(function (accion) {
            if (mapa[accion]) visibles.push(mapa[accion]);
        });
        visibles.forEach(function (item, indice) {
            destino.appendChild(clonarTarjetaSeleccionada(item, indice));
        });
        contenedor.classList.toggle("menu-directo-vacio", visibles.length === 0);
        document.dispatchEvent(new CustomEvent("accesosDirectosActualizados"));
    }

    function abrirConfiguracionAccesoDirecto() {
        catalogoAccesos = obtenerCatalogoPermitido();
        seleccionTemporal = {};
        accionesGuardadas.forEach(function (accion) {
            seleccionTemporal[accion] = true;
        });
        var buscador = document.getElementById("buscarConfiguracionAccesoDirecto");
        if (buscador) buscador.value = "";
        renderizarOpcionesConfiguracion("");
        var modal = document.getElementById("modalConfigurarAccesoDirecto");
        if (!modal) return;
        modal.classList.add("activo");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("menu-config-abierto");
        setTimeout(function () {
            if (buscador) buscador.focus();
        }, 50);
    }

    function cerrarConfiguracionAccesoDirecto() {
        var modal = document.getElementById("modalConfigurarAccesoDirecto");
        if (!modal) return;
        modal.classList.remove("activo");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-config-abierto");
    }

    function normalizarTexto(valor) {
        var texto = String(valor || "").toLowerCase();
        return typeof texto.normalize === "function"
            ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            : texto;
    }

    function crearOpcionConfiguracion(item) {
        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "menu-config-tarjeta";
        boton.setAttribute("data-accion", item.accion);
        boton.setAttribute("aria-pressed", seleccionTemporal[item.accion] ? "true" : "false");
        if (seleccionTemporal[item.accion]) boton.classList.add("seleccionado");

        var marco = document.createElement("span");
        marco.className = "menu-config-tarjeta-icono";
        if (item.imagen) {
            var imagen = document.createElement("img");
            imagen.src = item.imagen;
            imagen.alt = "";
            marco.appendChild(imagen);
        } else {
            marco.innerHTML = '<i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>';
        }

        var textos = document.createElement("span");
        textos.className = "menu-config-tarjeta-textos";
        var titulo = document.createElement("strong");
        titulo.textContent = item.titulo;
        var seccion = document.createElement("small");
        seccion.textContent = item.seccion;
        textos.appendChild(titulo);
        textos.appendChild(seccion);

        var marca = document.createElement("span");
        marca.className = "menu-config-tarjeta-marca";
        marca.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';

        boton.appendChild(marco);
        boton.appendChild(textos);
        boton.appendChild(marca);
        boton.addEventListener("click", function () {
            seleccionTemporal[item.accion] = !seleccionTemporal[item.accion];
            boton.classList.toggle("seleccionado", seleccionTemporal[item.accion]);
            boton.setAttribute("aria-pressed", seleccionTemporal[item.accion] ? "true" : "false");
            actualizarContadorConfiguracion();
        });
        return boton;
    }

    function renderizarOpcionesConfiguracion(filtro) {
        var lista = document.getElementById("listaConfiguracionAccesoDirecto");
        var vacio = document.getElementById("vacioConfiguracionAccesoDirecto");
        if (!lista || !vacio) return;
        lista.innerHTML = "";
        var consulta = normalizarTexto(filtro).trim();
        var coincidencias = catalogoAccesos.filter(function (item) {
            return !consulta || normalizarTexto(item.titulo + " " + item.seccion).indexOf(consulta) !== -1;
        });
        coincidencias.forEach(function (item) {
            lista.appendChild(crearOpcionConfiguracion(item));
        });
        vacio.style.display = coincidencias.length ? "none" : "";
        actualizarContadorConfiguracion();
    }

    function filtrarConfiguracionAccesoDirecto(valor) {
        renderizarOpcionesConfiguracion(valor);
    }

    function seleccionarTodosAccesosDirectos(seleccionar) {
        catalogoAccesos.forEach(function (item) {
            seleccionTemporal[item.accion] = !!seleccionar;
        });
        var buscador = document.getElementById("buscarConfiguracionAccesoDirecto");
        renderizarOpcionesConfiguracion(buscador ? buscador.value : "");
    }

    function actualizarContadorConfiguracion() {
        var contador = document.getElementById("contadorConfiguracionAccesoDirecto");
        if (!contador) return;
        var cantidad = catalogoAccesos.filter(function (item) {
            return seleccionTemporal[item.accion];
        }).length;
        contador.textContent = cantidad + (cantidad === 1 ? " seleccionado" : " seleccionados");
    }

    function guardarConfiguracionAccesoDirecto() {
        var acciones = catalogoAccesos.filter(function (item) {
            return seleccionTemporal[item.accion];
        }).map(function (item) {
            return item.accion;
        });
        verCerrarEfectoCargando("1");
        obtener_datos_user();
        $.ajax({
            data: {
                useru: userid,
                passu: passuser,
                navegador: navegador,
                funt: "guardar",
                acciones: JSON.stringify(acciones)
            },
            url: "/GoodVentaElectroCasaMaric/php_system/accesos_directos_usuario.php",
            type: "post",
            error: function (jqXHR, textstatus) {
                verCerrarEfectoCargando("");
                manejadordeerroresjquery(jqXHR.status, textstatus, "abmventana");
            },
            success: function (responseText) {
                verCerrarEfectoCargando("");
                try {
                    var respuesta = $.parseJSON(responseText);
                    if (respuestaJqueryAjax(respuesta["1"]) == true) {
                        accionesGuardadas = acciones;
                        renderizarAccesosSeleccionados();
                        cerrarConfiguracionAccesoDirecto();
                        ver_vetana_informativa("ACCESOS DIRECTOS GUARDADOS CORRECTAMENTE");
                        return;
                    }
                } catch (error) {
                    GuardarArchivosLog("Error al guardar accesos directos: " + error + " \r\n Consola: " + responseText);
                }
                ver_vetana_informativa("NO SE PUDO GUARDAR LA CONFIGURACION");
            }
        });
    }

    global.generarAccesosDirectosAdministrativo = generarAccesosDirectosAdministrativo;
    global.abrirConfiguracionAccesoDirecto = abrirConfiguracionAccesoDirecto;
    global.cerrarConfiguracionAccesoDirecto = cerrarConfiguracionAccesoDirecto;
    global.filtrarConfiguracionAccesoDirecto = filtrarConfiguracionAccesoDirecto;
    global.seleccionarTodosAccesosDirectos = seleccionarTodosAccesosDirectos;
    global.guardarConfiguracionAccesoDirecto = guardarConfiguracionAccesoDirecto;
}(window));
