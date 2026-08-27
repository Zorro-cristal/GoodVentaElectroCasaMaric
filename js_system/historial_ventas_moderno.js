(function (global) {
    'use strict';

    var filtros = [
        ['inptBuscarInfHistorialVentaF1','Fecha inicio'],['inptBuscarInfHistorialVentaF2','Fecha fin'],['inptBuscarHistorialVenta8','Local'],['inptBuscarHistorialVenta10','Estado de venta'],
        ['inptBuscarHistorialVenta1','Fecha exacta'],['inptBuscarHistorialVenta2','Nro. de venta'],['inptBuscarHistorialcomprobante','Tipo de comprobante'],['inptBuscarHistorialVenta3','Documento'],
        ['inptBuscarHistorialVenta4','Cliente'],['inptBuscarHistorialVenta11','Garante'],['inptBuscarHistorialVenta5','Telefono'],['inptBuscarHistorialVenta6','Tipo de venta'],
        ['inptBuscarHistorialVenta7','Estado de cuenta'],['inptBuscarHistorialVenta9','Vendedor'],['inptBuscarHistorialVenta12','Refinanciado'],['inptBuscarHistorialVenta13','Producto'],
        ['inptBuscarHistorialVenta14','Monto mínimo']
    ];
    var listadoHistorialVentas = null;

    function el(id) { return document.getElementById(id); }
    function crear(etiqueta, clase, texto) {
        var nodo = document.createElement(etiqueta);
        if (clase) nodo.className = clase;
        if (texto !== undefined) nodo.textContent = texto;
        return nodo;
    }
    function boton(texto, clase, accion) {
        var nodo = crear('button', 'hv-btn ' + (clase || ''), texto);
        nodo.type = 'button';
        nodo.addEventListener('click', accion);
        return nodo;
    }
    function crearClienteListado(registro) {
        var fragmento = document.createDocumentFragment();
        if (registro.estado_cliente_nombre) {
            var estado = crear('p', '', registro.estado_cliente_nombre);
            estado.style.color = '#d10000';
            estado.style.margin = '0';
            fragmento.appendChild(estado);
        }
        fragmento.appendChild(document.createTextNode(registro.cliente || ''));
        return fragmento;
    }
    function crearProductosListado(registro) {
        var contenedor = crear('div', 'hv-productos');
        var productos = Array.isArray(registro.productos) ? registro.productos : [];
        productos.forEach(function (producto) {
            contenedor.appendChild(crear('div', 'hv-producto', producto));
        });
        if (!productos.length) contenedor.textContent = registro.producto_resumen || '';
        return contenedor;
    }
    function inicializarListadoHistorialVentas() {
        if (listadoHistorialVentas) return listadoHistorialVentas;
        if (!global.AbmListadoCore) return null;
        var tablaCabecera = el('tbTituloImpreHistorialVenta');
        var cuerpo = el('table_historial_venta');
        var opciones = el('hvColumnasHistorialVenta');
        if (!tablaCabecera || !tablaCabecera.rows[0] || !cuerpo || !opciones) return null;
        tablaCabecera.rows[0].id = 'cabeceraListadoHistorialVentas';
        listadoHistorialVentas = global.AbmListadoCore.crear({
            nombre: 'historial_ventas',
            idCabecera: 'cabeceraListadoHistorialVentas',
            idCuerpo: 'table_historial_venta',
            idOpcionesColumnas: 'hvColumnasHistorialVenta',
            ordenable: true,
            columnas: [
                { campo:'fecha_venta', titulo:'Fecha venta', ancho:'5%' },
                { campo:'numero_venta_formateado', titulo:'Nro. venta', ancho:'5%' },
                { campo:'tipo_comprobante', titulo:'Comprobante', ancho:'5%' },
                { campo:'documento_cliente', titulo:'Documento', ancho:'5%' },
                { campo:'cliente', titulo:'Cliente', ancho:'5%' },
                { campo:'garante', titulo:'Garante', ancho:'5%' },
                { campo:'telefono', titulo:'Telefono', ancho:'5%' },
                { campo:'tipo_venta', titulo:'Tipo', ancho:'3%' },
                { campo:'total_detalle', titulo:'Total', ancho:'5%' },
                { campo:'descuento', titulo:'Descuento', ancho:'5%' },
                { campo:'subtotal', titulo:'Subtotal', ancho:'5%' },
                { campo:'interes_pagado', titulo:'Interes pagado', ancho:'5%' },
                { campo:'cuotas_pagadas', titulo:'Cuotas pagadas', ancho:'5%' },
                { campo:'total_pagado', titulo:'Total pagado', ancho:'5%' },
                { campo:'interes_actual', titulo:'Interes actual', ancho:'3%' },
                { campo:'deuda', titulo:'Pendiente', ancho:'5%' },
                { campo:'cuotas', titulo:'Cuotas', ancho:'3%' },
                { campo:'local', titulo:'Local', ancho:'6%' },
                { campo:'vendedor1_nombre', titulo:'Vendedor', ancho:'5%' },
                { campo:'refinanciado', titulo:'Refinanciado', ancho:'5%' },
                { campo:'producto_resumen', titulo:'Producto', ancho:'5%' }
            ],
            fila: {
                funcionSeleccion: 'obtenerelementohistroialventa',
                atributosFila: function (registro) {
                    var estilo = {};
                    if (registro.cancelada === 'SI') {
                        estilo.backgroundColor = '#FFEB3B';
                        estilo.color = '#000';
                    }
                    if (registro.refinanciado === 'SI') {
                        estilo.backgroundColor = '#ff9f00';
                        estilo.color = '#fff';
                    }
                    return {
                        style: estilo,
                        dataset: { codVenta: registro.cod_venta || '' }
                    };
                },
                celdas: [
                    { columna:'fecha_venta', campo:'fecha_venta_formateada' },
                    { columna:'numero_venta_formateado', campo:'numero_venta_formateado' },
                    { id:'td_datos_40', columna:'tipo_comprobante', campo:'tipo_comprobante' },
                    { columna:'documento_cliente', campo:'documento_cliente' },
                    { columna:'cliente', campo:'cliente', render:function (valor, registro) { return crearClienteListado(registro); } },
                    { columna:'garante', campo:'garante' },
                    { id:'td_datos_34', columna:'telefono', campo:'telefono' },
                    { id:'td_datos_12', columna:'tipo_venta', campo:'tipo_venta' },
                    { id:'td_datos_5', columna:'total_detalle', campo:'total_detalle_formateado' },
                    { id:'td_datos_29', columna:'descuento', campo:'descuento_formateado' },
                    { id:'td_datos_38', columna:'subtotal', campo:'subtotal_formateado' },
                    { columna:'interes_pagado', campo:'interes_pagado_formateado' },
                    { columna:'cuotas_pagadas', campo:'cuotas_pagadas_formateado' },
                    { id:'td_datos_6', columna:'total_pagado', campo:'total_pagado_formateado' },
                    { id:'td_datos_24', columna:'interes_actual', campo:'interes_actual_formateado' },
                    { id:'td_datos_7', columna:'deuda', campo:'deuda_formateada' },
                    { columna:'cuotas', campo:'cuotas' },
                    { columna:'local', campo:'local' },
                    { id:'td_datos_15', columna:'vendedor1_nombre', campo:'vendedor1_nombre' },
                    { columna:'refinanciado', campo:'refinanciado' },
                    { columna:'producto_resumen', campo:'producto_resumen', render:function (valor, registro) { return crearProductosListado(registro); } },
                    { id:'td_datos_1', campo:'fecha_venta', tecnica:true },
                    { id:'td_datos_2', campo:'cliente', tecnica:true },
                    { id:'td_datos_3', campo:'vendedor1_id', tecnica:true },
                    { id:'td_datos_14', campo:'vendedor2_id', tecnica:true },
                    { id:'td_datos_16', campo:'vendedor2_nombre', tecnica:true },
                    { id:'td_datos_4', campo:'cobrador_nombre', tecnica:true },
                    { id:'td_datos_13', campo:'numero_venta', tecnica:true },
                    { id:'td_datos_8', campo:'cod_venta', tecnica:true },
                    { id:'td_datos_9', campo:'cod_usuario', tecnica:true },
                    { id:'td_datos_10', campo:'cod_cliente', tecnica:true },
                    { id:'td_datos_11', campo:'cod_cobrador', tecnica:true },
                    { id:'td_datos_18', campo:'tipo_pago', tecnica:true },
                    { id:'td_datos_19', campo:'cantidad_cuota', tecnica:true },
                    { id:'td_datos_20', campo:'monto_cuota_formateado', tecnica:true },
                    { id:'td_datos_21', campo:'fecha_primer_pago', tecnica:true },
                    { id:'td_datos_22', campo:'comision', tecnica:true },
                    { id:'td_datos_23', campo:'cod_local', tecnica:true },
                    { id:'td_datos_25', campo:'intereses_credito_formateado', tecnica:true },
                    { id:'td_datos_26', campo:'dias_gracia', tecnica:true },
                    { id:'td_datos_27', campo:'nro_detalle', tecnica:true },
                    { id:'td_datos_30', campo:'id_garante', tecnica:true },
                    { id:'td_datos_31', campo:'garante', tecnica:true },
                    { id:'td_datos_32', campo:'documento_cliente', tecnica:true },
                    { id:'td_datos_33', campo:'documento_garante', tecnica:true },
                    { id:'td_datos_35', campo:'tipo_comprobante', tecnica:true },
                    { id:'td_datos_36', campo:'punto_expedicion', tecnica:true },
                    { id:'td_datos_37', campo:'deuda_pendiente_formateada', tecnica:true },
                    { id:'td_datos_39', campo:'acceso_credito', tecnica:true },
                    { id:'td_datos_100', campo:'insertado_por', tecnica:true },
                    { id:'td_datos_101', campo:'editado_por', tecnica:true },
                    { id:'td_datos_102', campo:'fecha_insert', tecnica:true },
                    { id:'td_datos_103', campo:'fecha_edit', tecnica:true },
                    { id:'td_datos_104', campo:'latitud', tecnica:true },
                    { id:'td_datos_105', campo:'longitud', tecnica:true }
                ]
            },
            despuesRender: function (contenedor) {
                var seleccionAnterior = global.elementoventa;
                if (!seleccionAnterior || typeof seleccionAnterior.querySelector !== 'function') return;
                var celdaCodigo = seleccionAnterior.querySelector('td[id="td_datos_8"]');
                if (!celdaCodigo) return;
                var codigo = String(celdaCodigo.textContent || '');
                Array.prototype.some.call(contenedor.querySelectorAll('tr[data-cod-venta]'), function (fila) {
                    if (String(fila.getAttribute('data-cod-venta') || '') !== codigo) return false;
                    fila.className = 'tableRegistroSelec';
                    global.elementoventa = fila;
                    return true;
                });
            }
        });
        listadoHistorialVentas.iniciar();
        return listadoHistorialVentas;
    }
    global.inicializarListadoHistorialVentas = inicializarListadoHistorialVentas;
    function buscar() {
        var general = el('hvBusquedaGeneral');
        var cliente = el('inptBuscarHistorialVenta4');
        if (general && cliente && general.value.trim() !== '') cliente.value = general.value.trim();
        actualizarChips();
        if (typeof global.buscarhistorialventa === 'function') global.buscarhistorialventa();
    }
    function abrirFiltros() { el('modalFiltrosHistorialVentasModerno').classList.add('activo'); }
    function cerrarFiltros() { el('modalFiltrosHistorialVentasModerno').classList.remove('activo'); }
    function exportarExcel() {
        if (global.controldebusquedadHistorialVenta === true) {
            if (typeof global.ver_vetana_informativa === 'function') global.ver_vetana_informativa('ESPERE A QUE TERMINE DE CARGAR EL HISTORIAL');
            return;
        }
        var registros = listadoHistorialVentas && listadoHistorialVentas.estado
            ? listadoHistorialVentas.estado.registros
            : [];
        if (!registros.length) {
            if (typeof global.ver_vetana_informativa === 'function') global.ver_vetana_informativa('REALICE UNA BUSQUEDA ANTES DE EXPORTAR');
            return;
        }
        if (!global.jQuery || typeof global.jQuery.fn.table2excel !== 'function') {
            if (typeof global.ver_vetana_informativa === 'function') global.ver_vetana_informativa('NO SE PUDO INICIAR LA EXPORTACION A EXCEL');
            return;
        }
        var columnasVisibles = listadoHistorialVentas.estado.columnas || {};
        var columnasExcel = [
            ['Fecha venta','fecha_venta_formateada','fecha_venta'],['Nro. venta','numero_venta_formateado','numero_venta_formateado'],['Comprobante','tipo_comprobante','tipo_comprobante'],
            ['Documento','documento_cliente','documento_cliente'],['Cliente','cliente','cliente'],['Garante','garante','garante'],['Telefono','telefono','telefono'],['Tipo','tipo_venta','tipo_venta'],
            ['Total','total_detalle','total_detalle'],['Descuento','descuento','descuento'],['Subtotal','subtotal','subtotal'],['Interes pagado','interes_pagado','interes_pagado'],
            ['Cuotas pagadas','cuotas_pagadas','cuotas_pagadas'],['Total pagado','total_pagado','total_pagado'],['Interes actual','interes_actual','interes_actual'],
            ['Pendiente','deuda','deuda'],['Cuotas','cuotas','cuotas'],['Local','local','local'],['Vendedor','vendedor1_nombre','vendedor1_nombre'],
            ['Refinanciado','refinanciado','refinanciado'],['Productos','productos','producto_resumen']
        ].filter(function (columna) {
            return columnasVisibles[columna[2]] !== false;
        });
        if (!columnasExcel.length) {
            if (typeof global.ver_vetana_informativa === 'function') global.ver_vetana_informativa('SELECCIONE AL MENOS UNA COLUMNA PARA EXPORTAR');
            return;
        }
        var tabla = crear('table');
        tabla.style.display = 'none';
        var cabecera = crear('tr');
        columnasExcel.forEach(function (columna) { cabecera.appendChild(crear('th', '', columna[0])); });
        tabla.appendChild(cabecera);
        registros.forEach(function (registro) {
            var fila = crear('tr');
            columnasExcel.forEach(function (columna) {
                var valor = registro[columna[1]];
                if (columna[1] === 'productos') valor = Array.isArray(valor) ? valor.join(' | ') : (registro.producto_resumen || '');
                fila.appendChild(crear('td', '', valor == null ? '' : valor));
            });
            tabla.appendChild(fila);
        });
        document.body.appendChild(tabla);
        global.jQuery(tabla).table2excel({
            exclude: '.noExl',
            name: 'Historial de Ventas',
            filename: 'historial_ventas_' + new Date().toISOString().slice(0, 10),
            fileext: '.xls'
        });
        document.body.removeChild(tabla);
    }
    function limpiar() {
        filtros.forEach(function (item) { var campo = el(item[0]); if (campo) campo.value = ''; });
        var general = el('hvBusquedaGeneral'); if (general) general.value = '';
        if (typeof global.checkfiltroshistorialventa === 'function') global.checkfiltroshistorialventa(2);
        actualizarChips();
    }
    function actualizarChips() {
        var contenedor = el('hvChipsHistorialVenta');
        if (!contenedor) return;
        contenedor.innerHTML = '';
        var activos = [];
        filtros.forEach(function (item) {
            var campo = el(item[0]);
            if (!campo || campo.value === '') return;
            var valor = campo.options && campo.selectedIndex >= 0 ? campo.options[campo.selectedIndex].text : campo.value;
            activos.push(item[1] + ': ' + valor);
        });
        if (el('inptCheckHistorialVenta2') && el('inptCheckHistorialVenta2').checked) activos.unshift('Todos: Si');
        (activos.length ? activos : ['Sin filtros aplicados']).forEach(function (texto, indice) {
            contenedor.appendChild(crear('span', 'hv-chip ' + (!activos.length || (activos.length === 1 && texto === 'Sin filtros aplicados') ? 'hv-chip-empty' : ''), texto));
        });
    }
    function montarModal(root, tablaFiltros, tablaFiltrosAntigua) {
        var modal = crear('div'); modal.id = 'modalFiltrosHistorialVentasModerno';
        var overlay = crear('div', 'hv-modal-overlay'); overlay.addEventListener('click', cerrarFiltros);
        var box = crear('div', 'hv-modal-box');
        var header = crear('header'); header.appendChild(crear('h3', '', 'Filtros de Historial de Ventas'));
        var cerrar = crear('button', '', '\u00d7'); cerrar.type = 'button'; cerrar.setAttribute('aria-label', 'Cerrar filtros'); cerrar.addEventListener('click', cerrarFiltros); header.appendChild(cerrar);
        var grid = crear('div', 'hv-modal-grid');
        var checks = crear('div', 'hv-checks');
        [['inptCheckHistorialVenta2','Todos'],['inptCheckHistorialVenta1','Rango de fecha']].forEach(function (item) {
            var campo = el(item[0]); if (!campo) return;
            campo.addEventListener('change', function () {
                if (typeof global.checkfiltroshistorialventa === 'function') global.checkfiltroshistorialventa(item[0] === 'inptCheckHistorialVenta1' ? 1 : 2);
            });
            var label = crear('label'); label.appendChild(campo); label.appendChild(document.createTextNode(item[1])); checks.appendChild(label);
        });
        grid.appendChild(checks);
        filtros.forEach(function (item) {
            var campo = el(item[0]); if (!campo) return;
            var label = crear('label', 'hv-field', item[1]);
            campo.removeAttribute('style'); label.appendChild(campo); grid.appendChild(label);
        });
        var footer = crear('footer');
        footer.appendChild(boton('Limpiar', 'hv-btn-light', limpiar));
        footer.appendChild(boton('Aplicar filtros', 'hv-btn-primary', function () { cerrarFiltros(); buscar(); }));
        box.appendChild(header); box.appendChild(grid); box.appendChild(footer); modal.appendChild(overlay); modal.appendChild(box); document.body.appendChild(modal);
        if (tablaFiltros) tablaFiltros.style.display = 'none';
        if (tablaFiltrosAntigua) { tablaFiltrosAntigua.classList.add('hv-filtros-antiguos'); tablaFiltrosAntigua.style.display = 'none'; }
    }
    function montarColumnas(root) {
        var panel = crear('div', 'hv-columnas selector-columnas-panel'); panel.id = 'hvColumnasHistorialVenta';
        root.appendChild(panel);
        return panel;
    }
    function iniciar() {
        var root = el('divHistorialVenta'); if (!root || root.dataset.hvModerno === '1') return;
        root.dataset.hvModerno = '1'; root.classList.add('hv-moderno'); root.removeAttribute('style'); root.style.display = 'none';
        var header = root.querySelector('.tableMenuZ'); if (header) header.classList.add('hv-header');
        var shell = header ? header.nextElementSibling : null; if (!shell) return; shell.classList.add('hv-shell');
        var tablaFiltros = shell.querySelector('table.divMenuf');
        var panel = shell.querySelector('div.divMenuf'); if (!panel) return; panel.classList.add('hv-panel'); panel.removeAttribute('style');
        if (!el('inptBuscarHistorialVenta14')) {
            var montoMinimo = document.createElement('input');
            montoMinimo.type = 'text';
            montoMinimo.id = 'inptBuscarHistorialVenta14';
            montoMinimo.inputMode = 'numeric';
            montoMinimo.placeholder = 'Igual o mayor a';
            montoMinimo.addEventListener('keyup', function (evento) {
                if (typeof global.separadordemiles === 'function') global.separadordemiles(montoMinimo);
                if (evento.keyCode === 13) buscar();
            });
            panel.appendChild(montoMinimo);
        }
        Array.prototype.forEach.call(panel.querySelectorAll('table'), function (tabla) {
            var contenido = String(tabla.textContent || '').replace(/\s+/g, ' ').trim();
            if (contenido.indexOf('Rango de Fecha') !== -1 && contenido.indexOf('Todos') !== -1) tabla.classList.add('hv-opciones-antiguas');
        });
        var toolbar = crear('div', 'hv-toolbar'); var search = crear('div', 'hv-search');
        var input = document.createElement('input'); input.id = 'hvBusquedaGeneral'; input.placeholder = 'Buscar por cliente, documento o nro. de venta...'; input.addEventListener('keyup', function (evento) { if (evento.keyCode === 13) buscar(); });
        search.appendChild(input); search.appendChild(boton('Buscar', 'hv-btn-primary', buscar));
        var actions = crear('div', 'hv-actions');
        actions.appendChild(boton('Imprimir', '', function () { if (typeof global.ordenimpresion === 'function') global.ordenimpresion('historialventa'); }));
        actions.appendChild(boton('Exportar Excel', 'hv-btn-excel', exportarExcel));
        actions.appendChild(boton('Filtros', 'hv-btn-filter', abrirFiltros));
        var panelColumnas = montarColumnas(root);
        var botonColumnas = boton('Columnas', 'hv-btn-columnas selector-columnas-trigger', function () {
            var abierto = panelColumnas.classList.toggle('activo');
            botonColumnas.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });
        botonColumnas.setAttribute('aria-controls', panelColumnas.id);
        botonColumnas.setAttribute('aria-expanded', 'false');
        actions.appendChild(botonColumnas);
        actions.appendChild(boton('Limpiar', 'hv-btn-light', limpiar));
        toolbar.appendChild(search); toolbar.appendChild(actions); panel.insertBefore(toolbar, panel.firstChild);
        var chips = crear('div', 'hv-chips'); chips.id = 'hvChipsHistorialVenta'; toolbar.insertAdjacentElement('afterend', chips);
        var botonPrincipal = el('btnHistoriaVenta1'); var tablaTabs = botonPrincipal ? botonPrincipal.closest('table') : null;
        if (tablaTabs) { tablaTabs.classList.add('hv-tabs'); var imp = tablaTabs.querySelector('input[onclick*="ordenimpresion"]'); if (imp) imp.classList.add('hv-original-print'); }
        var listado = el('cntHistVenta'); if (listado) listado.classList.add('hv-listado');
        var cabeceraScroll = el('TableScroollHistorialVenta1'); var tablasCabecera = cabeceraScroll ? cabeceraScroll.querySelectorAll('table') : [];
        var tablaFiltrosAntigua = tablasCabecera.length > 1 ? tablasCabecera[1] : null;
        montarModal(root, tablaFiltros, tablaFiltrosAntigua);
        Array.prototype.forEach.call(root.querySelectorAll('.abm-auxiliar-toolbar, .abm-auxiliar-chips, .abm-auxiliar-modal'), function (nodo) {
            if (nodo.parentNode) nodo.parentNode.removeChild(nodo);
        });
        var desplazamiento = el('TableScroollHistorialVenta2');
        var cuerpoTabla = el('table_historial_venta');
        var tablaTitulos = el('tbTituloImpreHistorialVenta');
        if (desplazamiento && cuerpoTabla && tablaTitulos) desplazamiento.insertBefore(tablaTitulos, cuerpoTabla);
        var footer = listado ? listado.querySelector('table[style*="width:98%"]') : null; if (footer) footer.classList.add('hv-footer');
        var cabecera = el('tbTituloImpreHistorialVenta');
        if (cabecera && cabecera.rows[0]) cabecera.rows[0].id = 'cabeceraListadoHistorialVentas';
        inicializarListadoHistorialVentas();
        actualizarChips();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})(window);
