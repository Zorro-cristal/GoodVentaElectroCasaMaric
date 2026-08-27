(function () {
    'use strict';

    function estaExcluido(tabla) {
        return !!tabla.closest('nav, aside, #divMenuLateral, .menu-lateral, .sidebar, ' +
            '#divAbmInformeBalanceGeneral, .pago-modal-unificado, .equifax-bp-shell, ' +
            '.abm-estandar-modal, .productos-modal, .modal-filtros');
    }

    function subtituloPara(texto) {
        var titulo = String(texto || '').replace(/\s+/g, ' ').trim();
        if (/\b(informe|reporte|historial|balance|resumen|auditoria)\b/i.test(titulo)) {
            return 'Consulta y analisis de informacion';
        }
        if (/\b(seleccionar|buscar)\b/i.test(titulo)) {
            return 'Consulta, filtros y seleccion de registros';
        }
        if (/\b(datos|nuevo|nueva|crear|editar|cargar|agregar|registrar)\b/i.test(titulo)) {
            return 'Carga y edicion de datos';
        }
        if (/\b(visor|vista|detalle)\b/i.test(titulo)) {
            return 'Vista detallada de informacion';
        }
        return 'Gestion de registros';
    }

    function decorar(tabla) {
        if (!tabla || tabla.dataset.gvTituloProcesado === '1' || estaExcluido(tabla)) return;
        var titulo = tabla.querySelector('.pTituloB');
        if (!titulo) return;
        tabla.dataset.gvTituloProcesado = '1';
        tabla.classList.add('gv-form-title-modern');
        titulo.setAttribute('data-gv-subtitle', subtituloPara(titulo.textContent));

        var contenedorCompacto = tabla.closest('.divAbms_b');
        if (contenedorCompacto) tabla.classList.add('gv-form-title-compact');
    }

    function decorarPersonalizado(encabezado) {
        if (!encabezado || encabezado.dataset.gvTituloProcesado === '1') return;
        var titulo = encabezado.querySelector('.pTituloB');
        if (!titulo) return;
        encabezado.dataset.gvTituloProcesado = '1';
        encabezado.classList.add('gv-custom-form-title-modern');
        titulo.setAttribute('data-gv-subtitle', subtituloPara(titulo.textContent));
    }

    function decorarCabeceraTabla(cabecera) {
        if (!cabecera || cabecera.dataset.gvColorCabecera === '1') return;
        if (cabecera.querySelector('input, select, textarea, button')) return;
        if (cabecera.closest('.abm-estandar-modal, .productos-modal, .modal-filtros')) return;
        cabecera.dataset.gvColorCabecera = '1';
        cabecera.classList.add('gv-table-title-color');
    }

    function buscarCabecerasTablas(contenedor) {
        var raiz = contenedor && contenedor.querySelectorAll ? contenedor : document;
        Array.prototype.forEach.call(raiz.querySelectorAll('.tableCabeceraRegistro, .tableCabeceraRegistro2, table > thead'), decorarCabeceraTabla);
    }

    function iniciar() {
        Array.prototype.forEach.call(document.querySelectorAll('table.tableMenuZ'), decorar);
        Array.prototype.forEach.call(document.querySelectorAll('.catalogo-header, .productos-header'), decorarPersonalizado);
        buscarCabecerasTablas(document);
        if (!document.body.dataset.gvObservadorTitulos) {
            document.body.dataset.gvObservadorTitulos = '1';
            new MutationObserver(function (cambios) {
                cambios.forEach(function (cambio) {
                    Array.prototype.forEach.call(cambio.addedNodes || [], function (nodo) {
                        if (!nodo || nodo.nodeType !== 1) return;
                        if (nodo.matches && nodo.matches('table.tableMenuZ')) decorar(nodo);
                        if (nodo.matches && nodo.matches('.catalogo-header, .productos-header')) decorarPersonalizado(nodo);
                        Array.prototype.forEach.call(nodo.querySelectorAll ? nodo.querySelectorAll('table.tableMenuZ') : [], decorar);
                        Array.prototype.forEach.call(nodo.querySelectorAll ? nodo.querySelectorAll('.catalogo-header, .productos-header') : [], decorarPersonalizado);
                        if (nodo.matches && nodo.matches('.tableCabeceraRegistro, .tableCabeceraRegistro2, table > thead')) decorarCabeceraTabla(nodo);
                        buscarCabecerasTablas(nodo);
                    });
                });
            }).observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
}());
