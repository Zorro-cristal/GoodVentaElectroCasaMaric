(function (global) {
    'use strict';

    var vistaActiva = 'fotos';

    function porId(id) {
        return document.getElementById(id);
    }

    function escapar(valor) {
        var nodo = document.createElement('div');
        nodo.textContent = valor == null ? '' : String(valor);
        return nodo.innerHTML;
    }

    function configuracionActiva() {
        return vistaActiva === 'ubicaciones' ? {
            buscar: global.buscarInformeUbicacionesCliente,
            cliente: 'inptBuscarInfUbicacionesCliente1',
            fecha: 'inptBuscarInfUbicacionesCliente2',
            usuario: 'inptBuscarInfUbicacionesCliente3',
            local: 'inptBuscarInfUbicacionesCliente4',
            total: 'inptTotalRegistoInformeUbicacionesCliente',
            panelColumnas: 'panelColumnasInformeUbicacionesCliente'
        } : {
            buscar: global.buscarInformeFotosCliente,
            cliente: 'inptBuscarInfFotosCliente1',
            fecha: 'inptBuscarInfFotosCliente2',
            usuario: 'inptBuscarInfFotosCliente3',
            local: 'inptBuscarInfFotosCliente4',
            total: 'inptTotalRegistoInformeFotosCliente',
            panelColumnas: 'panelColumnasInformeFotosCliente'
        };
    }

    function cerrarColumnas() {
        ['panelColumnasInformeFotosCliente', 'panelColumnasInformeUbicacionesCliente'].forEach(function (id) {
            var panel = porId(id);
            if (panel) panel.classList.remove('activo');
        });
        var boton = porId('btnColumnasInformeUbicaciones');
        if (boton) boton.setAttribute('aria-expanded', 'false');
    }

    function actualizarPestanas() {
        var fotos = porId('btnInformeFotosCliente1');
        var ubicaciones = porId('btnInformeFotosCliente2');
        var esFotos = vistaActiva === 'fotos';
        if (fotos) {
            fotos.classList.toggle('activo', esFotos);
            fotos.setAttribute('aria-selected', esFotos ? 'true' : 'false');
        }
        if (ubicaciones) {
            ubicaciones.classList.toggle('activo', !esFotos);
            ubicaciones.setAttribute('aria-selected', esFotos ? 'false' : 'true');
        }
        var panelFotos = porId('divInformeUbicacionFotosCliente');
        var panelUbicaciones = porId('divInformeUbicacionesCliente');
        if (panelFotos) panelFotos.classList.toggle('activo', esFotos);
        if (panelUbicaciones) panelUbicaciones.classList.toggle('activo', !esFotos);
        var totalFotos = porId('inptTotalRegistoInformeFotosCliente');
        var totalUbicaciones = porId('inptTotalRegistoInformeUbicacionesCliente');
        if (totalFotos) {
            totalFotos.hidden = !esFotos;
            totalFotos.style.display = esFotos ? '' : 'none';
        }
        if (totalUbicaciones) {
            totalUbicaciones.hidden = esFotos;
            totalUbicaciones.style.display = esFotos ? 'none' : '';
        }
        var general = porId('inptBusquedaGeneralInformeUbicaciones');
        var campoCliente = porId(configuracionActiva().cliente);
        if (general && campoCliente) general.value = campoCliente.value || '';
        cerrarColumnas();
        actualizarResumenFiltros();
    }

    function ejecutarBusqueda() {
        var config = configuracionActiva();
        var general = porId('inptBusquedaGeneralInformeUbicaciones');
        var cliente = porId(config.cliente);
        if (general && cliente) cliente.value = general.value.trim();
        actualizarResumenFiltros();
        if (typeof config.buscar === 'function') config.buscar();
    }

    function camposDeVista(config) {
        return [
            ['Cliente', config.cliente],
            ['Fecha exacta', config.fecha],
            ['Subido por', config.usuario],
            ['Local', config.local]
        ];
    }

    function actualizarResumenFiltros() {
        var contenedor = porId('filtrosActivosInformeUbicaciones');
        if (!contenedor) return;
        var config = configuracionActiva();
        var filtros = [];
        var rango = porId('checkHistorialInformeFotosCliente2');
        var todos = porId('checkHistorialInformeFotosCliente1');
        var fechaInicio = porId('inptbuscarInformeFotosClienteF1');
        var fechaFin = porId('inptbuscarInformeFotosClienteF2');

        if (rango && rango.checked) {
            filtros.push('Rango: ' + (fechaInicio.value || 'sin inicio') + ' a ' + (fechaFin.value || 'sin fin'));
        } else if (todos && todos.checked) {
            filtros.push('Todos: Si');
        }

        camposDeVista(config).forEach(function (item) {
            var campo = porId(item[1]);
            if (!campo || String(campo.value || '').trim() === '') return;
            var valor = campo.tagName === 'SELECT' && campo.selectedIndex >= 0
                ? campo.options[campo.selectedIndex].text
                : campo.value;
            filtros.push(item[0] + ': ' + valor);
        });

        contenedor.innerHTML = filtros.length
            ? filtros.map(function (texto) { return '<span class="iuc-chip">' + escapar(texto) + '</span>'; }).join('')
            : '<span class="iuc-chip vacio">Sin filtros aplicados</span>';
    }

    function abrirFiltros(valor) {
        var modal = porId('modalFiltrosInformeUbicaciones');
        if (!modal) return;
        if (valor && vistaActiva === 'ubicaciones') {
            var config = configuracionActiva();
            [
                [config.cliente, 'inptBuscarInfFotosCliente1'],
                [config.fecha, 'inptBuscarInfFotosCliente2'],
                [config.usuario, 'inptBuscarInfFotosCliente3'],
                [config.local, 'inptBuscarInfFotosCliente4']
            ].forEach(function (par) {
                var origen = porId(par[0]);
                var destino = porId(par[1]);
                if (origen && destino) destino.value = origen.value;
            });
        }
        modal.classList.toggle('activo', valor);
        modal.setAttribute('aria-hidden', valor ? 'false' : 'true');
    }

    function limpiarCampos(buscar) {
        ['inptBuscarInfFotosCliente1', 'inptBuscarInfFotosCliente2', 'inptBuscarInfFotosCliente3',
            'inptBuscarInfFotosCliente4', 'inptBuscarInfUbicacionesCliente1',
            'inptBuscarInfUbicacionesCliente2', 'inptBuscarInfUbicacionesCliente3',
            'inptBuscarInfUbicacionesCliente4', 'inptbuscarInformeFotosClienteF1',
            'inptbuscarInformeFotosClienteF2'].forEach(function (id) {
            var campo = porId(id);
            if (campo) campo.value = '';
        });
        if (typeof global.checkHistorialInformeFotosCliente === 'function') {
            global.checkHistorialInformeFotosCliente(1);
        }
        var general = porId('inptBusquedaGeneralInformeUbicaciones');
        if (general) general.value = '';
        actualizarResumenFiltros();
        if (buscar !== false) ejecutarBusqueda();
    }

    function montar() {
        var formulario = porId('divInformeFotosCliente');
        if (!formulario || formulario.dataset.informeUbicacionesModerno === 'SI') return;
        formulario.dataset.informeUbicacionesModerno = 'SI';
        formulario.classList.add('iuc-ventana');
        formulario.innerHTML = [
            '<div id="tdEfectoInformeFotosCliente" class="iuc-contenedor">',
                '<header class="iuc-header">',
                    '<div class="iuc-titulo"><span class="iuc-menu" aria-hidden="true">&#9776;</span>',
                        '<div><p class="pTituloB">Informe de <b>Ubicaciones Cliente</b></p>',
                        '<small>Consulta, filtros y seleccion de registros</small></div></div>',
                    '<div class="iuc-header-acciones">',
                        '<button type="button" class="iuc-icono" title="Imprimir" aria-label="Imprimir" onclick="ordenimpresion(\'\')"><img src="/GoodVentaElectroCasaMaric/iconos/imprimir.png" alt=""></button>',
                        '<button type="button" class="iuc-icono" title="Minimizar" aria-label="Minimizar" onclick="minimizarInformeFotosCliente()"><img src="/GoodVentaElectroCasaMaric/iconos/minimizar2.png" alt=""></button>',
                        '<button type="button" class="iuc-icono" title="Cerrar" aria-label="Cerrar" onclick="verCerrarInformeFotosCliente()"><img src="/GoodVentaElectroCasaMaric/iconos/botonCerrar.png" alt=""></button>',
                    '</div>',
                '</header>',
                '<section class="iuc-toolbar" aria-label="Busqueda del informe">',
                    '<div class="iuc-busqueda"><input type="search" id="inptBusquedaGeneralInformeUbicaciones" placeholder="Buscar por cliente..." aria-label="Buscar por cliente">',
                    '<button type="button" class="iuc-btn primario" data-iuc-accion="buscar">Buscar</button></div>',
                    '<div class="iuc-toolbar-acciones">',
                        '<button type="button" class="iuc-btn advertencia" data-iuc-accion="filtros">Filtros</button>',
                        '<button type="button" id="btnColumnasInformeUbicaciones" class="iuc-btn columnas" data-iuc-accion="columnas" aria-expanded="false">Columnas</button>',
                        '<button type="button" class="iuc-btn claro" data-iuc-accion="limpiar">Limpiar</button>',
                    '</div>',
                '</section>',
                '<div id="filtrosActivosInformeUbicaciones" class="iuc-chips"><span class="iuc-chip vacio">Sin filtros aplicados</span></div>',
                '<nav class="iuc-pestanas" role="tablist" aria-label="Tipo de informe">',
                    '<button type="button" id="btnInformeFotosCliente1" class="iuc-pestana activo" role="tab" aria-selected="true" data-iuc-vista="fotos">Fotos Cliente</button>',
                    '<button type="button" id="btnInformeFotosCliente2" class="iuc-pestana" role="tab" aria-selected="false" data-iuc-vista="ubicaciones">Ubicaciones</button>',
                '</nav>',
                '<main class="iuc-tablas">',
                    '<section id="divInformeUbicacionFotosCliente" class="iuc-panel activo" role="tabpanel">',
                        '<table id="cabeceraInformeFotosCliente" class="tableCabeceraRegistro iuc-tabla-cabecera"></table>',
                        '<div id="table_informe_fotoscliente" class="div_cuerpo_table iuc-tabla-cuerpo"></div>',
                    '</section>',
                    '<section id="divInformeUbicacionesCliente" class="iuc-panel" role="tabpanel">',
                        '<table id="cabeceraInformeUbicacionesCliente" class="tableCabeceraRegistro iuc-tabla-cabecera"></table>',
                        '<div id="table_informe_ubicacionescliente" class="div_cuerpo_table iuc-tabla-cuerpo"></div>',
                    '</section>',
                '</main>',
                '<footer class="iuc-footer">',
                    '<label><span>Total de registros</span><input class="inputTextDisable" type="text" disabled id="inptTotalRegistoInformeFotosCliente">',
                    '<input class="inputTextDisable" type="text" disabled id="inptTotalRegistoInformeUbicacionesCliente" hidden></label>',
                    '<button type="button" id="btnVerMapaGeoInforme" class="iuc-btn columnas" onclick="VerUbicacionCliente()">Ver ubicacion</button>',
                '</footer>',
                '<div class="iuc-compatibilidad" aria-hidden="true">',
                    '<button type="button" id="btnBuscarInformeFotosCliente" onclick="buscarInformeFotosCliente()"></button>',
                    '<button type="button" id="btnBuscarInformeUbicacionesCliente" onclick="buscarInformeUbicacionesCliente()"></button>',
                '</div>',
                '<div id="panelColumnasInformeFotosCliente" class="iuc-columnas">',
                    '<header><strong>Columnas visibles</strong><button type="button" data-iuc-accion="cerrar-columnas">&times;</button></header>',
                    '<div id="opcionesColumnasInformeFotosCliente"></div>',
                '</div>',
                '<div id="panelColumnasInformeUbicacionesCliente" class="iuc-columnas">',
                    '<header><strong>Columnas visibles</strong><button type="button" data-iuc-accion="cerrar-columnas">&times;</button></header>',
                    '<div id="opcionesColumnasInformeUbicacionesCliente"></div>',
                '</div>',
                '<div id="modalFiltrosInformeUbicaciones" class="iuc-modal" aria-hidden="true">',
                    '<div class="iuc-modal-fondo" data-iuc-accion="cerrar-filtros"></div>',
                    '<section class="iuc-modal-caja" role="dialog" aria-modal="true" aria-labelledby="tituloFiltrosInformeUbicaciones">',
                        '<header><h3 id="tituloFiltrosInformeUbicaciones">Filtros de Ubicaciones Cliente</h3><button type="button" data-iuc-accion="cerrar-filtros" aria-label="Cerrar">&times;</button></header>',
                        '<div class="iuc-modal-cuerpo">',
                            '<div class="iuc-opciones-principales">',
                                '<label><input type="checkbox" id="checkHistorialInformeFotosCliente1" checked> Todos</label>',
                                '<label><input type="checkbox" id="checkHistorialInformeFotosCliente2"> Rango de fecha</label>',
                            '</div>',
                            '<label>Fecha inicio<input type="date" id="inptbuscarInformeFotosClienteF1"></label>',
                            '<label>Fecha fin<input type="date" id="inptbuscarInformeFotosClienteF2"></label>',
                            '<label>Cliente<input type="text" id="inptBuscarInfFotosCliente1" placeholder="Parecido a"></label>',
                            '<label>Fecha exacta<input type="date" id="inptBuscarInfFotosCliente2"></label>',
                            '<label>Subido por<input type="text" id="inptBuscarInfFotosCliente3" placeholder="Parecido a"></label>',
                            '<label>Local<select id="inptBuscarInfFotosCliente4"></select></label>',
                            '<div class="iuc-filtros-ubicaciones" hidden>',
                                '<input type="text" id="inptBuscarInfUbicacionesCliente1"><input type="date" id="inptBuscarInfUbicacionesCliente2">',
                                '<input type="text" id="inptBuscarInfUbicacionesCliente3"><select id="inptBuscarInfUbicacionesCliente4"></select>',
                            '</div>',
                        '</div>',
                        '<footer><button type="button" class="iuc-btn claro" data-iuc-accion="limpiar-modal">Limpiar</button>',
                        '<button type="button" class="iuc-btn primario" data-iuc-accion="aplicar">Aplicar filtros</button></footer>',
                    '</section>',
                '</div>',
            '</div>'
        ].join('');

        global.listadoInformeFotosCliente = null;
        global.listadoInformeUbicacionesCliente = null;
        if (typeof global.iniciarListadoInformeFotosCliente === 'function') global.iniciarListadoInformeFotosCliente();
        if (typeof global.iniciarListadoInformeUbicacionesCliente === 'function') global.iniciarListadoInformeUbicacionesCliente();

        formulario.addEventListener('click', function (evento) {
            var vista = evento.target.getAttribute('data-iuc-vista');
            var accion = evento.target.getAttribute('data-iuc-accion');
            if (vista) {
                vistaActiva = vista;
                if (typeof global.verCerrarVentanasInformeFotosCliente === 'function') {
                    global.verCerrarVentanasInformeFotosCliente(vista === 'fotos' ? 1 : 2);
                }
                actualizarPestanas();
            }
            if (accion === 'buscar') ejecutarBusqueda();
            if (accion === 'filtros') abrirFiltros(true);
            if (accion === 'cerrar-filtros') abrirFiltros(false);
            if (accion === 'limpiar') limpiarCampos(true);
            if (accion === 'limpiar-modal') limpiarCampos(false);
            if (accion === 'aplicar') {
                var fotos = configuracionActiva();
                if (vistaActiva === 'ubicaciones') {
                    porId(fotos.cliente).value = porId('inptBuscarInfFotosCliente1').value;
                    porId(fotos.fecha).value = porId('inptBuscarInfFotosCliente2').value;
                    porId(fotos.usuario).value = porId('inptBuscarInfFotosCliente3').value;
                    porId(fotos.local).value = porId('inptBuscarInfFotosCliente4').value;
                }
                abrirFiltros(false);
                ejecutarBusqueda();
            }
            if (accion === 'columnas') {
                var panel = porId(configuracionActiva().panelColumnas);
                var abierto = panel && !panel.classList.contains('activo');
                cerrarColumnas();
                if (panel && abierto) panel.classList.add('activo');
                evento.target.setAttribute('aria-expanded', abierto ? 'true' : 'false');
            }
            if (accion === 'cerrar-columnas') cerrarColumnas();
        });

        porId('inptBusquedaGeneralInformeUbicaciones').addEventListener('keydown', function (evento) {
            if (evento.key === 'Enter') ejecutarBusqueda();
        });
        porId('checkHistorialInformeFotosCliente1').addEventListener('change', function () {
            if (this.checked && typeof global.checkHistorialInformeFotosCliente === 'function') global.checkHistorialInformeFotosCliente(1);
            actualizarResumenFiltros();
        });
        porId('checkHistorialInformeFotosCliente2').addEventListener('change', function () {
            if (this.checked && typeof global.checkHistorialInformeFotosCliente === 'function') global.checkHistorialInformeFotosCliente(2);
            actualizarResumenFiltros();
        });
        document.addEventListener('click', function (evento) {
            if (!evento.target.closest('.iuc-columnas') && !evento.target.closest('#btnColumnasInformeUbicaciones')) {
                cerrarColumnas();
            }
        });
        document.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape') {
                cerrarColumnas();
                abrirFiltros(false);
            }
        });
        actualizarPestanas();
    }

    document.addEventListener('DOMContentLoaded', montar);
}(window));
