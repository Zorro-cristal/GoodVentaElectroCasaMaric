(function (global) {
    'use strict';

    var camposFiltro = [
        ['inptBuscarInfHistorialCompraF1', 'Fecha inicio'],
        ['inptBuscarInfHistorialCompraF2', 'Fecha fin'],
        ['inptBuscarInfHistorialCompraAgrupado', 'Agrupado por'],
        ['inptBuscarHistorialCompra2', 'Fecha exacta'],
        ['inptBuscarHistorialCompra3', 'Proveedor'],
        ['inptBuscarHistorialCompra6', 'Tipo de compra'],
        ['inptBuscarHistorialCompra4', 'Estado de pago'],
        ['inptBuscarHistorialCompra5', 'Local']
    ];

    function porId(id) {
        return document.getElementById(id);
    }

    function crear(etiqueta, clase, texto) {
        var nodo = document.createElement(etiqueta);
        if (clase) nodo.className = clase;
        if (typeof texto !== 'undefined') nodo.textContent = texto;
        return nodo;
    }

    function crearBoton(texto, clase, accion) {
        var boton = crear('button', 'hc-btn ' + (clase || ''), texto);
        boton.type = 'button';
        boton.addEventListener('click', accion);
        return boton;
    }

    function ejecutarBusqueda() {
        actualizarChips();
        if (typeof global.buscarhistorialcompra === 'function') {
            global.buscarhistorialcompra();
        }
    }

    function abrirFiltros() {
        var modal = porId('modalFiltrosHistorialComprasModerno');
        if (modal) {
            modal.classList.add('activo');
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    function cerrarFiltros() {
        var modal = porId('modalFiltrosHistorialComprasModerno');
        if (modal) {
            modal.classList.remove('activo');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    function limpiar() {
        if (typeof global.limpiarcamposHistorialCompra === 'function') {
            global.limpiarcamposHistorialCompra();
        }
        var agrupado = porId('inptBuscarInfHistorialCompraAgrupado');
        var tipo = porId('inptBuscarHistorialCompra6');
        if (agrupado) agrupado.value = '';
        if (tipo) tipo.value = '';
        if (typeof global.checkfiltroshistorialcompra === 'function') {
            global.checkfiltroshistorialcompra(2);
        }
        actualizarChips();
    }

    function textoCampo(campo) {
        if (!campo || campo.value === '') return '';
        if (campo.options && campo.selectedIndex >= 0) {
            return campo.options[campo.selectedIndex].text;
        }
        return campo.value;
    }

    function actualizarChips() {
        var contenedor = porId('hcChipsHistorialCompra');
        if (!contenedor) return;
        contenedor.innerHTML = '';
        var activos = [];
        var busqueda = porId('inptBuscarHistorialCompra1');
        if (busqueda && busqueda.value.trim() !== '') {
            activos.push('Nro. factura: ' + busqueda.value.trim());
        }
        camposFiltro.forEach(function (configuracion) {
            var campo = porId(configuracion[0]);
            var valor = textoCampo(campo);
            if (valor !== '') activos.push(configuracion[1] + ': ' + valor);
        });
        if (porId('inptCheckHistorialCompra2') && porId('inptCheckHistorialCompra2').checked) {
            activos.unshift('Todos: Si');
        }
        if (!activos.length) activos.push('Sin filtros aplicados');
        activos.forEach(function (texto) {
            contenedor.appendChild(crear('span', 'hc-chip' + (texto === 'Sin filtros aplicados' ? ' hc-chip-vacio' : ''), texto));
        });
    }

    function montarModal() {
        var modal = crear('div');
        modal.id = 'modalFiltrosHistorialComprasModerno';
        modal.setAttribute('aria-hidden', 'true');

        var fondo = crear('div', 'hc-modal-fondo');
        fondo.addEventListener('click', cerrarFiltros);

        var caja = crear('section', 'hc-modal-caja');
        caja.setAttribute('role', 'dialog');
        caja.setAttribute('aria-modal', 'true');
        caja.setAttribute('aria-labelledby', 'hcTituloModalFiltros');

        var cabecera = crear('header');
        var titulo = crear('h3', '', 'Filtros de Historial de Compras');
        titulo.id = 'hcTituloModalFiltros';
        var cerrar = crear('button', '', '\u00d7');
        cerrar.type = 'button';
        cerrar.setAttribute('aria-label', 'Cerrar filtros');
        cerrar.addEventListener('click', cerrarFiltros);
        cabecera.appendChild(titulo);
        cabecera.appendChild(cerrar);

        var grilla = crear('div', 'hc-modal-grilla');
        var checks = crear('div', 'hc-checks');
        [
            ['inptCheckHistorialCompra2', 'Todos', 2],
            ['inptCheckHistorialCompra1', 'Rango de fecha', 1]
        ].forEach(function (configuracion) {
            var campo = porId(configuracion[0]);
            if (!campo) return;
            campo.onclick = null;
            campo.addEventListener('change', function () {
                if (typeof global.checkfiltroshistorialcompra === 'function') {
                    global.checkfiltroshistorialcompra(configuracion[2]);
                }
                actualizarChips();
            });
            var etiqueta = crear('label');
            etiqueta.appendChild(campo);
            etiqueta.appendChild(document.createTextNode(configuracion[1]));
            checks.appendChild(etiqueta);
        });
        grilla.appendChild(checks);

        camposFiltro.forEach(function (configuracion) {
            var campo = porId(configuracion[0]);
            if (!campo) return;
            campo.removeAttribute('style');
            var etiqueta = crear('label', 'hc-campo');
            etiqueta.appendChild(crear('span', '', configuracion[1]));
            etiqueta.appendChild(campo);
            grilla.appendChild(etiqueta);
        });

        var pie = crear('footer');
        pie.appendChild(crearBoton('Limpiar', 'hc-btn-claro', limpiar));
        pie.appendChild(crearBoton('Aplicar filtros', 'hc-btn-principal', function () {
            cerrarFiltros();
            ejecutarBusqueda();
        }));

        caja.appendChild(cabecera);
        caja.appendChild(grilla);
        caja.appendChild(pie);
        modal.appendChild(fondo);
        modal.appendChild(caja);
        document.body.appendChild(modal);

        var abrirOriginal = porId('divFiltrosHistorialCompras');
        if (abrirOriginal) abrirOriginal.classList.add('hc-modal-antiguo');
    }

    function montarColumnas(root) {
        var panel = crear('div', 'hc-columnas selector-columnas-panel');
        panel.id = 'hcColumnasHistorialCompra';
        root.appendChild(panel);
        document.addEventListener('click', function (evento) {
            if (!panel.classList.contains('activo')) return;
            if (panel.contains(evento.target) || evento.target.closest('[aria-controls="' + panel.id + '"]')) return;
            panel.classList.remove('activo');
        });
        return panel;
    }

    function prepararPestanas(panel) {
        var botonPrincipal = porId('btnHistorialCompra1');
        var tabla = botonPrincipal ? botonPrincipal.closest('table') : null;
        if (!tabla) return;
        tabla.classList.add('hc-pestanas');
        Array.prototype.forEach.call(panel.querySelectorAll(':scope > table'), function (tablaPanel) {
            var contenido = String(tablaPanel.textContent || '').replace(/\s+/g, ' ').trim();
            if (contenido.indexOf('Rango de Fecha') !== -1 && contenido.indexOf('Todos') !== -1) {
                tablaPanel.classList.add('hc-opciones-antiguas');
            }
        });
        var checkTodos = porId('inptCheckHistorialCompra2');
        var tablaOpciones = checkTodos ? checkTodos.closest('table') : null;
        if (tablaOpciones) tablaOpciones.classList.add('hc-opciones-antiguas');
        var imprimirAntiguo = tabla.querySelector('input[onclick*="imprimirReporte"]');
        if (imprimirAntiguo) imprimirAntiguo.classList.add('hc-imprimir-antiguo');
        var celdaImprimir = imprimirAntiguo ? imprimirAntiguo.closest('td') : null;
        if (celdaImprimir) celdaImprimir.classList.add('hc-celda-imprimir-antigua');
    }

    function eliminarControlesAuxiliares(root) {
        Array.prototype.forEach.call(
            root.querySelectorAll('.abm-auxiliar-toolbar, .abm-auxiliar-chips, .abm-auxiliar-modal'),
            function (nodo) {
                if (nodo.parentNode) nodo.parentNode.removeChild(nodo);
            }
        );
    }

    function normalizarPieResumen(pie) {
        var metricas = [
            ['inptRegistroNroHistorialCompra', 'Registros'],
            ['inptTotalHistorialCompra', 'Total compra'],
            ['inptDescHistorialCompra', 'Total descuento'],
            ['inptlTotalConDescuentoHistorialCompra', 'Total con descuento'],
            ['inptlTotalPagadoHistorialCompra', 'Total pagado'],
            ['inptTotalPendienteHistorialCompra', 'Total pendiente']
        ];

        pie.classList.add('hc-pie-resumen');

        metricas.forEach(function (configuracion) {
            var campo = porId(configuracion[0]);
            var celda = campo ? campo.closest('td') : null;
            var titulo = celda ? celda.querySelector('.pTituloC') : null;
            if (!celda) return;
            celda.classList.add('hc-pie-metrica');
            campo.removeAttribute('style');
            if (titulo) titulo.textContent = configuracion[1];
        });

        Array.prototype.forEach.call(pie.querySelectorAll('td'), function (celda) {
            if (!celda.querySelector('input, button') && String(celda.textContent || '').trim() === '') {
                celda.parentNode.removeChild(celda);
            }
        });

        var seleccionado = porId('inptRegistroSeleccHistorialCompra');
        var celdaSeleccion = seleccionado ? seleccionado.closest('td') : null;
        if (!celdaSeleccion) return;

        celdaSeleccion.classList.add('hc-pie-seleccion');
        seleccionado.removeAttribute('style');

        var tituloSeleccion = celdaSeleccion.querySelector('.pTituloC');
        if (tituloSeleccion) tituloSeleccion.textContent = 'Registro seleccionado';

        var controles = celdaSeleccion.querySelector('.hc-pie-seleccion-controles');
        if (!controles) {
            controles = crear('div', 'hc-pie-seleccion-controles');
            if (tituloSeleccion && tituloSeleccion.nextSibling) {
                celdaSeleccion.insertBefore(controles, tituloSeleccion.nextSibling);
            } else {
                celdaSeleccion.appendChild(controles);
            }
        }

        controles.appendChild(seleccionado);
        Array.prototype.forEach.call(celdaSeleccion.querySelectorAll(':scope > input[type="button"]'), function (boton) {
            boton.removeAttribute('style');
            controles.appendChild(boton);
        });
    }

    global.actualizarPieHistorialCompra = function () {
        var seleccionado = porId('inptRegistroSeleccHistorialCompra');
        var pie = seleccionado ? seleccionado.closest('table') : null;
        if (!pie) return;
        pie.classList.add('hc-pie');
        normalizarPieResumen(pie);
    };

    function prepararTabla() {
        var principal = porId('divHistorialCompra1');
        var cabeceraScroll = porId('TableScroollHistorialCompra1');
        var cuerpoScroll = porId('TableScroollHistorialCompra2');
        var cuerpo = porId('table_historial_compra');
        if (!principal || !cabeceraScroll || !cuerpoScroll || !cuerpo) return;

        principal.classList.add('hc-listado');
        var tablas = cabeceraScroll.querySelectorAll('table');
        var cabecera = tablas.length ? tablas[0] : null;
        var filtrosAntiguos = tablas.length > 1 ? tablas[1] : null;
        if (filtrosAntiguos) filtrosAntiguos.classList.add('hc-filtros-antiguos');
        if (cabecera) {
            cabecera.classList.add('hc-cabecera-tabla');
            cuerpoScroll.insertBefore(cabecera, cuerpo);
        }

        var seleccionado = porId('inptRegistroSeleccHistorialCompra');
        var pie = seleccionado ? seleccionado.closest('table') : null;
        if (pie) global.actualizarPieHistorialCompra();
        var progreso = porId('tbProcessHistorialCompra');
        if (progreso) progreso.classList.add('hc-progreso');
    }

    function prepararPestanasSecundarias() {
        var detalles = porId('divHistorialCompra2');
        var pagos = porId('divHistorialCompra3');
        if (detalles) detalles.classList.add('hc-pestana-secundaria');
        if (pagos) pagos.classList.add('hc-pestana-secundaria', 'hc-pestana-pagos');
    }

    function iniciar() {
        var root = porId('divHistorialCompra');
        if (!root || root.dataset.hcModerno === '1') return;
        root.dataset.hcModerno = '1';
        root.classList.add('hc-moderno');
        root.removeAttribute('style');
        root.style.display = 'none';

        var cabecera = root.querySelector(':scope > .tableMenuZ');
        if (cabecera) cabecera.classList.add('hc-header');
        var shell = cabecera ? cabecera.nextElementSibling : null;
        if (!shell) return;
        shell.classList.add('hc-shell');

        var filtroSuperior = shell.querySelector(':scope > table.divMenuf');
        if (filtroSuperior) filtroSuperior.classList.add('hc-filtro-superior-antiguo');
        var panel = shell.querySelector(':scope > div.divMenuf');
        if (!panel) return;
        panel.classList.add('hc-panel');
        panel.removeAttribute('style');

        var barra = crear('div', 'hc-barra');
        var busqueda = crear('div', 'hc-busqueda');
        var input = porId('inptBuscarHistorialCompra1');
        if (input) {
            input.removeAttribute('style');
            input.removeAttribute('onkeyup');
            input.className = 'hc-busqueda-input';
            input.placeholder = 'Buscar por nro. de factura...';
            input.setAttribute('aria-label', 'Buscar por número de factura');
            input.addEventListener('keyup', function (evento) {
                if (evento.key === 'Enter' || evento.keyCode === 13) ejecutarBusqueda();
            });
            busqueda.appendChild(input);
        }
        busqueda.appendChild(crearBoton('Buscar', 'hc-btn-principal', ejecutarBusqueda));

        var acciones = crear('div', 'hc-acciones');
        acciones.appendChild(crearBoton('Imprimir', '', function () {
            if (typeof global.imprimirReporte === 'function') global.imprimirReporte('HistorialCompra');
        }));
        acciones.appendChild(crearBoton('Filtros', 'hc-btn-filtro', abrirFiltros));
        var columnas = montarColumnas(root);
        var botonColumnas = crearBoton('Columnas', 'hc-btn-columnas selector-columnas-trigger', function () {
            var abierto = columnas.classList.toggle('activo');
            botonColumnas.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });
        botonColumnas.setAttribute('aria-controls', columnas.id);
        botonColumnas.setAttribute('aria-expanded', 'false');
        acciones.appendChild(botonColumnas);
        acciones.appendChild(crearBoton('Limpiar', 'hc-btn-claro', limpiar));

        barra.appendChild(busqueda);
        barra.appendChild(acciones);
        panel.insertBefore(barra, panel.firstChild);

        var chips = crear('div', 'hc-chips');
        chips.id = 'hcChipsHistorialCompra';
        barra.insertAdjacentElement('afterend', chips);

        prepararPestanas(panel);
        prepararTabla();
        prepararPestanasSecundarias();
        montarModal();
        eliminarControlesAuxiliares(root);
        actualizarChips();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})(window);
