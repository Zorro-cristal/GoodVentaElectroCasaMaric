(function () {
    "use strict";

    var categorias = {
        ventas: [
            "divMenuHistorialVenta1", "divMenuAbmProductos1", "divMenuVenta",
            "divMenuSolicitudCredito", "divMenuImagenesCliente", "divMenuArchivosCliente",
            "divMenuCatalogo2", "divMenuCancelacion", "divMenuCalculadoraPrecio"
        ],
        cobranzas: [
            "divMenuCuentasCobar1", "divMenuCobrosRealizado1", "divMenuExpedienteCliente1"
        ],
        administracion: [
            "divMenuBalanceGeneralDirecto", "divMenuAbmGastosFijosEmpresaDirecto",
            "divMenuVerificarGestionarReferenciaCliente", "divMenuVerificarEquifax2",
            "divMenuCreditoAprobar", "divMenuCompra1", "divMenuArqueo",
            "divMenuMigrarCaja", "divMenuRecibirCaja", "divMenuDatosVehiculos"
        ]
    };

    function normalizar(valor) {
        var texto = String(valor || "").toLowerCase();
        return typeof texto.normalize === "function"
            ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            : texto;
    }

    function iniciarMenuDirecto() {
        var contenedor = document.getElementById("ContenedorAccesoDirecto");
        var buscador = document.getElementById("menuDirectSearch");
        var entrada = document.getElementById("menuDirectSearchInput");
        var botonBuscar = document.getElementById("menuDirectSearchButton");
        var botonesFiltro = contenedor ? contenedor.querySelectorAll("[data-menu-filter]") : [];
        var filtroActivo = "todos";

        /*
         * El marco y el PNG deben ser elementos distintos. Si el border-radius se
         * aplica al propio IMG, los archivos cuadrados que llegan hasta el borde
         * quedan recortados. Se envuelven todos los iconos una sola vez.
         */
        Array.prototype.forEach.call(
            document.querySelectorAll(".contenedorAccesoDirecto .imgIconoMenu"),
            function (imagen) {
                var marco;

                if (imagen.parentNode && imagen.parentNode.classList.contains("menu-icon-frame")) {
                    return;
                }

                marco = document.createElement("span");
                marco.className = "menu-icon-frame";
                marco.setAttribute("aria-hidden", "true");
                imagen.parentNode.insertBefore(marco, imagen);
                marco.appendChild(imagen);
            }
        );

        if (!contenedor || !buscador || !entrada || !botonBuscar) {
            return;
        }

        Object.keys(categorias).forEach(function (categoria) {
            categorias[categoria].forEach(function (id) {
                var tarjeta = document.getElementById(id);
                if (tarjeta) {
                    tarjeta.setAttribute("data-menu-category", categoria);
                }
            });
        });

        function aplicarFiltro() {
            var consulta = normalizar(entrada.value).trim();
            var tarjetas = contenedor.querySelectorAll(".menu-direct-seleccionados > .divMenub");

            Array.prototype.forEach.call(tarjetas, function (tarjeta) {
                var categoria = tarjeta.getAttribute("data-menu-category") || "administracion";
                var titulo = tarjeta.querySelector(".pTitulo4");
                var coincideCategoria = filtroActivo === "todos" || categoria === filtroActivo;
                var coincideTexto = !consulta || normalizar(titulo ? titulo.textContent : "").indexOf(consulta) !== -1;

                tarjeta.classList.toggle("menu-card-filtered", !(coincideCategoria && coincideTexto));
            });
        }

        Array.prototype.forEach.call(botonesFiltro, function (boton) {
            boton.addEventListener("click", function () {
                filtroActivo = boton.getAttribute("data-menu-filter") || "todos";
                Array.prototype.forEach.call(botonesFiltro, function (otroBoton) {
                    var activo = otroBoton === boton;
                    otroBoton.classList.toggle("is-active", activo);
                    otroBoton.setAttribute("aria-pressed", activo ? "true" : "false");
                });
                aplicarFiltro();
            });
        });

        entrada.addEventListener("input", aplicarFiltro);

        botonBuscar.addEventListener("click", function () {
            entrada.focus();
            aplicarFiltro();
        });

        entrada.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                entrada.value = "";
                botonBuscar.focus();
                aplicarFiltro();
            }
        });

        document.addEventListener("accesosDirectosActualizados", aplicarFiltro);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarMenuDirecto);
    } else {
        iniciarMenuDirecto();
    }
}());
