(function () {
    "use strict";

    function obtenerPorcentaje(relleno) {
        var valor = relleno && relleno.style ? parseFloat(relleno.style.width) : 0;
        if (!isFinite(valor)) {
            valor = 0;
        }
        return Math.max(0, Math.min(100, Math.round(valor)));
    }

    function actualizarBarra(pista, relleno, porcentaje) {
        var valor = pista.parentNode ? pista.parentNode.querySelector(".gv-progress-percent") : null;
        var color = relleno && relleno.style ? String(relleno.style.backgroundColor || "").toLowerCase() : "";
        pista.setAttribute("aria-valuenow", String(porcentaje));
        pista.classList.toggle(
            "gv-progress-cancelled",
            color.indexOf("255, 87, 34") !== -1 || color.indexOf("ff5722") !== -1
        );
        if (valor) {
            valor.textContent = porcentaje + "%";
        }
    }

    function prepararBarra(pista) {
        var relleno;
        var tabla;
        var celda;
        var meta;
        var porcentaje;
        var observador;

        if (!pista || pista.getAttribute("data-gv-progress-ready") === "si") {
            return;
        }

        relleno = pista.querySelector(".divprogreso2");
        if (!relleno) {
            return;
        }

        pista.setAttribute("data-gv-progress-ready", "si");
        pista.classList.add("gv-progress-track");
        pista.setAttribute("role", "progressbar");
        pista.setAttribute("aria-label", "Avance de carga de registros");
        pista.setAttribute("aria-valuemin", "0");
        pista.setAttribute("aria-valuemax", "100");

        tabla = pista.closest ? pista.closest("table") : null;
        if (tabla) {
            tabla.classList.add("gv-progress-shell");
        }

        celda = pista.parentNode;
        meta = document.createElement("div");
        meta.className = "gv-progress-meta";
        meta.innerHTML = "<span>Procesando registros</span><strong class=\"gv-progress-percent\">0%</strong>";
        celda.insertBefore(meta, pista);

        porcentaje = obtenerPorcentaje(relleno);
        actualizarBarra(pista, relleno, porcentaje);

        observador = new MutationObserver(function () {
            actualizarBarra(pista, relleno, obtenerPorcentaje(relleno));
        });
        observador.observe(relleno, {
            attributes: true,
            attributeFilter: ["style", "class"]
        });
    }

    function inicializarBarras() {
        var barras = document.querySelectorAll(".divprogreso1");
        var i;
        for (i = 0; i < barras.length; i += 1) {
            prepararBarra(barras[i]);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializarBarras);
    } else {
        inicializarBarras();
    }

    window.inicializarBarrasProgresoModernas = inicializarBarras;
}());
