(function (global) {
    'use strict';

    var formulariosPropios = {
        divAbmCliente1: true,
        divAbmProducto1: true
    };

    /*
     * Los informes legacy no siguen el patron divAbm...1 y por eso quedaban
     * fuera del normalizador compartido. Se declaran de forma explicita para
     * no alcanzar ventanas auxiliares ni cambiar contratos de negocio.
     */
    var configuracionesInformes = {
        divInformeCodBarra: {
            tipo: 'simple',
            campoBusquedaGeneral: 'inptProveedorProductoCodBarra2',
            placeholderBusquedaGeneral: 'Buscar por producto o código...',
            etiquetaBusquedaGeneral: 'Buscar precios por nombre de producto o código',
            etiquetasFiltros: {
                inptlocalProductoBuscarCodBarra: 'Local',
                inptExistenciaProductoBuscarCodBarra: 'Existencia',
                inptProveedorProductoCodBarra2: 'Producto',
                inptProveedorProductoCodBarra1: 'Código'
            }
        },
        divCuentasAcobrarInformeGral: { tipo: 'simple' },
        divInformeCredito: { tipo: 'simple' },
        divInformeEvaluacion: { tipo: 'multiple' },
        divInformeGralProductos: { tipo: 'simple' },
        divInformeInventario: { tipo: 'simple' },
        divInformeDeposito: { tipo: 'multiple' },
        divInformeDocumentosEntregados: { tipo: 'multiple' },
        divInformeDocumentosEntregadosCliente: { tipo: 'multiple' },
        divInformeStock: { tipo: 'multiple' },
        divInformeInformconf: { tipo: 'simple' },
        divGananciasporventa: { tipo: 'simple' },
        divInformeProductosComprados: { tipo: 'simple' },
        divInformeProductosVentas: { tipo: 'multiple' },
        divInformeProductosNoVendidos: { tipo: 'simple' },
        divVentasCompletadas: {
            tipo: 'simple',
            campoBusquedaGeneral: 'inptBuscarInfVentasCompletadas2',
            placeholderBusquedaGeneral: 'Buscar en Ventas Completadas',
            etiquetaBusquedaGeneral: 'Buscar ventas completadas por cliente',
            etiquetasFiltros: {
                inptBuscarInfVentasCompletadasF1: 'Fecha inicio',
                inptBuscarInfVentasCompletadasF2: 'Fecha fin',
                checkHistorialVentasCompletadas2: 'Rango de fecha',
                checkHistorialVentasCompletadas1: 'Todos',
                inptBuscarInfVentasCompletadas1: 'Nro. factura',
                inptBuscarInfVentasCompletadas2: 'Cliente',
                inptBuscarInfVentasCompletadas3: 'Nro. documento',
                inptBuscarInfVentasCompletadas4: 'Fecha venta',
                inptBuscarInfVentasCompletadas6: 'D/A',
                inptBuscarInfVentasCompletadas5: 'Tipo de venta',
                inptlocalInformeVentasCompletadas: 'Local',
                inptEstadoCallCenterVentaInformeVentasCompletadas: 'Estado'
            }
        },
        divinfoVentasCanceladas: { tipo: 'simple' },
        divPagosEliminados: { tipo: 'simple' },
        divInformeCatalago: { tipo: 'especial' },
        divClientesInactivos: { tipo: 'multiple' },
        divinfoProductosDespachados: { tipo: 'simple' },
        divComprasEliminados: { tipo: 'simple' },
        divVendedorMetas: { tipo: 'especial' },
        divClienteMoroso: { tipo: 'simple' },
        divAudiProducto: {
            tipo: 'simple',
            busquedaGeneralIndependiente: true,
            idBusquedaGeneral: 'inptBuscarGeneralAudiProducto',
            placeholderBusquedaGeneral: 'Buscar por nombre o codigo de barra...',
            etiquetaBusquedaGeneral: 'Buscar auditoria por nombre de producto o codigo de barra'
        },
        divClienteImpago: { tipo: 'simple' },
        divSoliDescuento: { tipo: 'simple' },
        divInformeSoliDescuentoInteres: { tipo: 'simple' },
        divContabilidad: { tipo: 'simple' },
        divContabilidadCompra: { tipo: 'simple' },
        divInformeMovimientoStock: { tipo: 'simple' },
        divInformeDeudaCliente: { tipo: 'simple' },
        divInformeMantenimientoVehivulos: { tipo: 'simple' },
        divInformeSolicitudDescuentoCredito: { tipo: 'simple' },
        divInformeCajaCobrador: { tipo: 'simple' },
        divInformePagosAProveedor: { tipo: 'multiple' },
        divInformeSolicitudAnulacion: { tipo: 'simple' },
        divInformeClientesTrabajados: { tipo: 'simple' }
    };

    var configuracionesAbm = {
        divAbmUsuario1: 'buscarabmusuario',
        divAbmListaNiveles1: 'BuscarAbmListaNiveles',
        divAbmProveedor1: 'buscarabmProveedor',
        divAbmCategoriaPrecio1: 'buscarabmCategoriaPrecio',
        divAbmFuncionarios1: 'buscarabmFuncionarios',
        divAbmVehivulos1: 'buscarabmVehivulos',
        divAbmSolicitudCredito1: 'buscarSolicitudCredito',
        divAbmCobrador1: 'buscarabmCobrador',
        divAbmVendedor1: 'buscarabmVendedor',
        divAbmAdminLocales1: 'buscarabmAdminLocales',
        divAbmGasto1: 'buscarabmGasto',
        divAbmSueldo1: 'buscarabmSueldo',
        divAbmCasa1: 'buscarabmCasa',
        divAbmProfesion1: 'buscarabmProfesion',
        divAbmZona1: 'buscarabmZona',
        divAbmAgenda1: 'buscarabmAgenda',
        divAbmAgendaPersonal1: 'buscarabmAgendaPersonal',
        divAbmCalificacionEntrega1: 'buscarabmCalificacionEntrega',
        divAbmLiquidez1: 'buscarabmLiquidez',
        divAbmPatrimonioEmpresa1: 'buscarabmPatrimonioEmpresa',
        divAbmGastosFijosEmpresa1: 'buscarabmGastosFijosEmpresa',
        divAbmDetalleVehivulos1: 'buscarabmDetalleVehivulos',
        divAbmInformconf1: 'buscarAbmInformconf',
        divAbmCallCenterVenta1: 'buscarAbmCallCenterVenta',
        divAbmMigrarCaja1: 'buscarabmMigrarCaja',
        divAbmCaja1: 'buscarabmCaja',
        divAbmPagoProveedor1: 'buscarabmPagoProveedor',
        divAbmTipoPago1: 'buscarabmTipoPago',
        divAbmBanco1: 'buscarabmBanco',
        divAbmCargaArchivoGeneral1: 'buscarabmCargaArchivoGeneral',
        divAbmCargoFuncionarios1: 'buscarabmCargoFuncionarios',
        divAbmMoraCliente1: 'buscarabmMoraCliente',
        divAbmDocumentos1: 'buscarabmDocumentos',
        divAbmDocumentosCliente1: 'buscarabmDocumentosCliente',
        divAbmCheque1: 'buscarabmCheque',
        divAbmbajaproducto1: 'buscarProductoBaja',
        divAbmChequeACobrar1: 'buscarabmChequeACobrar',
        divAbmEgresoIngresoJuan1: 'buscarabmEgresoIngresoJuan',
        divAbmEgresoIngresoAdministrativo1: 'buscarabmEgresoIngresoAdministrativo'
    };

    var configuracionesFiltrosAbm = {
        divAbmGasto1: {
            inptCheckingresoegreso1: 'Rango de fechas',
            inptCheckingresoegreso2: 'Todos',
            inptBuscarGastoF1: 'Fecha inicio',
            inptBuscarGastoF2: 'Fecha fin',
            inptSeleccEstadoBuscarGasto1: 'Activo',
            inptSeleccEstadoBuscarGasto2: 'Inactivo',
            inptBuscarIngresoEgreso3: 'Motivo',
            inptBuscarIngresoEgreso8: 'Monto',
            inptSeleccTipoBuscarGasto: 'Tipo',
            inptBuscarIngresoEgreso2: 'Fecha',
            inptBuscarIngresoEgreso5: 'Nro. boleta',
            inptlocalMisGastosBusca: 'Local',
            inptBuscarIngresoEgreso4: 'Banco',
            inptSeleccArregloBuscarGasto: 'Arreglo',
            inptBuscarIngresoEgreso1: 'Usuario',
            inptConfirmadoMisGastosBusca: 'Confirmado'
        }
    };

    var configuracionesBusquedaAbm = {
        divAbmGasto1: {
            busquedaGeneralIndependiente: true,
            idBusquedaGeneral: 'inptBuscarGeneralGasto',
            placeholderBusquedaGeneral: 'Buscar egreso por motivo, boleta, banco, cuenta, usuario o local...',
            etiquetaBusquedaGeneral: 'Buscar egresos e ingresos sin modificar los filtros'
        }
    };

    function lista(nodos) { return Array.prototype.slice.call(nodos || []); }

    /*
     * Los controles de decision son los filtros de uso mas frecuente. Esta
     * particion es estable: solo los lleva al inicio y conserva el orden
     * original tanto entre opciones como entre los demas campos.
     */
    function opcionesFiltroPrimero(campos) {
        return campos.filter(function (campo) {
            return /^(checkbox|radio)$/i.test(campo.type || '');
        }).concat(campos.filter(function (campo) {
            return !/^(checkbox|radio)$/i.test(campo.type || '');
        }));
    }
    function texto(elemento) { return (elemento && elemento.textContent || '').replace(/\s+/g, ' ').trim(); }
    function compararTexto(valorA, valorB, direccion) {
        if (global.AbmListadoCore && typeof global.AbmListadoCore.compararValores === 'function') {
            return global.AbmListadoCore.compararValores(valorA, valorB, direccion);
        }
        return String(valorA || '').localeCompare(String(valorB || ''), 'es', { numeric: true, sensitivity: 'base' }) * direccion;
    }

    function nombreFormulario(formulario) {
        var titulo = formulario.querySelector('.pTituloB, .header-text');
        if (configuracionesInformes[formulario.id] && texto(titulo)) return texto(titulo);
        return formulario.id.replace(/^divAbm/i, '').replace(/1$/, '') || 'ABM';
    }

    function ancestroComunListado(formulario, cabecera, cuerpo) {
        var candidato = cabecera ? cabecera.parentElement : null;
        while (candidato && candidato !== formulario) {
            if (candidato.contains(cuerpo)) return candidato;
            candidato = candidato.parentElement;
        }
        return cabecera ? cabecera.parentElement : formulario;
    }

    function hijoDirecto(contenedor, elemento) {
        var referencia = elemento;
        while (referencia && referencia.parentElement && referencia.parentElement !== contenedor) {
            referencia = referencia.parentElement;
        }
        return referencia && referencia.parentElement === contenedor ? referencia : elemento;
    }

    function marcarRutaFlexible(formulario, elemento) {
        var actual = elemento;
        while (actual && actual !== formulario) {
            if (/^(DIV|CENTER|MAIN|SECTION)$/i.test(actual.tagName || '')) {
                actual.classList.add('abm-estandar-marco-flex');
            }
            actual = actual.parentElement;
        }
    }

    function actualizarAriaPanelColumnas(panel, abierto) {
        if (!panel || !panel.id) return;
        var botones = lista(document.querySelectorAll('[aria-controls="' + panel.id + '"]'));
        var contenedor = panel.closest ? panel.closest('.abm-estandar-columnas') : null;
        var botonLocal = contenedor ? contenedor.querySelector('.selector-columnas-trigger, [data-accion="columnas"]') : null;
        if (botonLocal && botones.indexOf(botonLocal) < 0) botones.push(botonLocal);
        botones.forEach(function (boton) {
            boton.setAttribute('aria-controls', panel.id);
            boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });
    }

    function obtenerPanelBotonColumnas(boton) {
        if (!boton) return null;
        var idPanel = boton.getAttribute('aria-controls');
        var panel = idPanel ? document.getElementById(idPanel) : null;
        if (!panel) {
            var contenedor = boton.closest ? boton.closest('.abm-estandar-columnas') : null;
            if (contenedor) panel = contenedor.querySelector('.selector-columnas-panel, .abm-estandar-menu-columnas');
        }
        if (!panel) {
            var formulario = boton.closest ? boton.closest('.divAbms, .divAbms_b, .informe-estandar, .gv-informe-listado') : null;
            if (formulario) panel = formulario.querySelector('.selector-columnas-panel, .abm-estandar-menu-columnas');
        }
        if (panel && panel.id) boton.setAttribute('aria-controls', panel.id);
        return panel;
    }

    function sincronizarCapaPanelColumnas(panel) {
        lista(document.querySelectorAll('.abm-columnas-capa-activa')).forEach(function (elemento) {
            elemento.classList.remove('abm-columnas-capa-activa');
        });
        if (!panel || !panel.classList.contains('activo')) return;

        var actual = panel;
        while (actual && actual !== document.body) {
            actual.classList.add('abm-columnas-capa-activa');
            actual = actual.parentElement;
        }
    }

    function cerrarPanelesColumnas(excepcion) {
        lista(document.querySelectorAll('.selector-columnas-panel.activo, .abm-estandar-menu-columnas.activo')).forEach(function (panel) {
            if (panel === excepcion) return;
            panel.classList.remove('activo');
            actualizarAriaPanelColumnas(panel, false);
        });
        sincronizarCapaPanelColumnas(excepcion && excepcion.classList.contains('activo') ? excepcion : null);
    }

    function registrarCierreExternoColumnas() {
        if (document.body.dataset.cierreExternoColumnas === '1') return;
        document.body.dataset.cierreExternoColumnas = '1';
        document.addEventListener('click', function (evento) {
            var objetivo = evento.target && evento.target.closest ? evento.target : null;
            if (!objetivo) return;
            var panel = objetivo.closest('.selector-columnas-panel, .abm-estandar-menu-columnas');
            if (panel) {
                cerrarPanelesColumnas(panel);
                actualizarAriaPanelColumnas(panel, panel.classList.contains('activo'));
                sincronizarCapaPanelColumnas(panel);
                return;
            }
            var boton = objetivo.closest('.selector-columnas-trigger, [data-accion="columnas"]');
            if (boton) {
                var panelBoton = obtenerPanelBotonColumnas(boton);
                cerrarPanelesColumnas(panelBoton);
                actualizarAriaPanelColumnas(panelBoton, !!(panelBoton && panelBoton.classList.contains('activo')));
                sincronizarCapaPanelColumnas(panelBoton);
                return;
            }
            cerrarPanelesColumnas(null);
        });
        document.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape') cerrarPanelesColumnas(null);
        });
    }

    function buscarFuncion(formulario) {
        if (configuracionesAbm[formulario.id]) return configuracionesAbm[formulario.id];
        var botones = lista(formulario.querySelectorAll('input[type="button"][onclick], input[type="Button"][onclick], button[onclick]'));
        var campos = lista(formulario.querySelectorAll('input[onkeyup], select[onchange]'));
        var patron = /\b(buscar[a-zA-Z0-9_$]*|Buscar[a-zA-Z0-9_$]*)\s*\(/;
        var nombre = '';
        botones.some(function (boton) {
            var hallado = String(boton.getAttribute('onclick') || '').match(patron);
            if (hallado && !/(vista|option|select)/i.test(hallado[1])) { nombre = hallado[1]; return true; }
            return false;
        });
        if (nombre) return nombre;
        campos.some(function (campo) {
            var codigo = campo.getAttribute('onkeyup') || campo.getAttribute('onchange') || '';
            var hallado = codigo.match(patron);
            if (hallado) { nombre = hallado[1]; return true; }
            return false;
        });
        return nombre;
    }

    function ejecutarBusqueda(nombre, campo) {
        if (nombre && typeof global[nombre] === 'function') {
            global[nombre]();
            return;
        }
        if (campo) {
            var evento = document.createEvent('Event');
            evento.initEvent('keyup', true, true);
            evento.keyCode = 13;
            campo.dispatchEvent(evento);
        }
    }

    function obtenerFilas(cuerpo) {
        if (!cuerpo) return [];
        if (cuerpo.tagName === 'TBODY') return lista(cuerpo.children).filter(function (hijo) { return hijo.tagName === 'TR'; });
        function filasDirectas(tabla) {
            var filas = [];
            lista(tabla.children).forEach(function (hijo) {
                if (hijo.tagName === 'TR') filas.push(hijo);
                if (hijo.tagName === 'TBODY') {
                    lista(hijo.children).forEach(function (fila) { if (fila.tagName === 'TR') filas.push(fila); });
                }
            });
            return filas;
        }
        var todasLasTablas = lista(cuerpo.querySelectorAll('table'));
        var tablasMarcadas = todasLasTablas.filter(function (tabla) {
            var filas = filasDirectas(tabla);
            return filas.length === 1 && (/tableRegistro/i.test(tabla.className || '') || filas[0].id === 'tbSelecRegistro');
        });
        if (tablasMarcadas.length) return tablasMarcadas;
        var tablas = todasLasTablas.filter(function (tabla) {
            return !tabla.querySelector('table') && obtenerCeldas(tabla).length > 0;
        });
        if (tablas.length > 1) return tablas;
        if (tablas.length === 1) {
            var filas = filasDirectas(tablas[0]);
            return filas.length > 1 ? filas : tablas;
        }
        return lista(cuerpo.children).filter(function (hijo) { return hijo.tagName === 'TR'; });
    }

    function obtenerCeldas(fila) {
        var tr = fila.tagName === 'TR' ? fila : fila.querySelector('tr');
        return tr ? lista(tr.children).filter(function (celda) { return /^(TD|TH)$/.test(celda.tagName); }) : [];
    }

    function camposFiltro(formulario, tablaEncabezado, cuerpo) {
        return lista(formulario.querySelectorAll('input[id], select[id], textarea[id]')).filter(function (campo) {
            var tipo = (campo.type || '').toLowerCase();
            var posicion = campo.compareDocumentPosition(cuerpo);
            return !tablaEncabezado.contains(campo) &&
                (posicion & Node.DOCUMENT_POSITION_FOLLOWING) !== 0 &&
                !/^(button|submit|hidden|file|image)$/.test(tipo) &&
                !estaOcultoEnOrigen(campo, formulario) &&
                !campo.disabled;
        });
    }

    function estaOcultoEnOrigen(campo, formulario) {
        var elemento = campo;
        while (elemento && elemento !== formulario) {
            var estilo = String(elemento.getAttribute && elemento.getAttribute('style') || '');
            if (elemento.hidden || elemento.getAttribute && elemento.getAttribute('aria-hidden') === 'true') return true;
            if (/(^|;)\s*display\s*:\s*none\s*(;|$)/i.test(estilo)) return true;
            elemento = elemento.parentElement;
        }
        return false;
    }

    function esCampoFiltro(elemento) {
        if (!elemento || !/^(INPUT|SELECT|TEXTAREA)$/.test(elemento.tagName)) return false;
        return !/^(button|submit|hidden|file|image)$/i.test(elemento.type || '');
    }

    function etiquetaDesdeCabecera(campo) {
        var tablaFiltro = campo.closest('table.tableCabeceraRegistro');
        if (!tablaFiltro) return '';
        var tablaCabecera = tablaFiltro.previousElementSibling;
        while (tablaCabecera && (!tablaCabecera.classList || !tablaCabecera.classList.contains('tableCabeceraRegistro'))) {
            tablaCabecera = tablaCabecera.previousElementSibling;
        }
        if (!tablaCabecera) return '';
        var camposTabla = lista(tablaFiltro.querySelectorAll('input, select, textarea')).filter(esCampoFiltro);
        var posicion = camposTabla.indexOf(campo);
        if (posicion < 0) return '';
        var titulos = lista(tablaCabecera.querySelectorAll('tr:first-child > td, tr:first-child > th')).map(function (celda) {
            return texto(celda).replace(/[▲▼]/g, '').trim();
        }).filter(function (titulo) { return titulo !== ''; });
        return titulos[posicion] || '';
    }

    function etiquetaDesdeCabeceraAlineada(campo) {
        var tablaFiltro = campo.closest('table.tableCabeceraRegistro');
        if (!tablaFiltro) return etiquetaDesdeCabecera(campo);
        var tablaCabecera = tablaFiltro.previousElementSibling;
        while (tablaCabecera && (!tablaCabecera.classList || !tablaCabecera.classList.contains('tableCabeceraRegistro'))) {
            tablaCabecera = tablaCabecera.previousElementSibling;
        }
        var filaFiltro = campo.closest('tr');
        var celdaFiltro = campo.closest('td, th');
        var filaCabecera = tablaCabecera && tablaCabecera.querySelector('tr');
        if (!filaFiltro || !celdaFiltro || !filaCabecera) return etiquetaDesdeCabecera(campo);
        var celdasFiltro = lista(filaFiltro.children).filter(function (celda) { return /^(TD|TH)$/.test(celda.tagName); });
        var celdasCabecera = lista(filaCabecera.children).filter(function (celda) { return /^(TD|TH)$/.test(celda.tagName); });
        var indiceFiltro = celdasFiltro.indexOf(celdaFiltro);
        if (indiceFiltro < 0 || !celdasCabecera.length) return etiquetaDesdeCabecera(campo);

        function anchoDeclarado(celda) {
            var estilo = String(celda.getAttribute('style') || '');
            var hallado = estilo.match(/(?:^|;)\s*width\s*:\s*([0-9.]+)%/i);
            return hallado ? parseFloat(hallado[1]) : 0;
        }

        var anchosFiltro = celdasFiltro.map(anchoDeclarado);
        var anchosCabecera = celdasCabecera.map(anchoDeclarado);
        var totalFiltro = anchosFiltro.reduce(function (total, ancho) { return total + ancho; }, 0);
        var totalCabecera = anchosCabecera.reduce(function (total, ancho) { return total + ancho; }, 0);
        var celdaCabecera = null;
        if (totalFiltro > 0 && totalCabecera > 0 && anchosFiltro[indiceFiltro] > 0) {
            var inicioFiltro = anchosFiltro.slice(0, indiceFiltro).reduce(function (total, ancho) { return total + ancho; }, 0);
            var centroRelativo = (inicioFiltro + (anchosFiltro[indiceFiltro] / 2)) / totalFiltro;
            var acumulado = 0;
            celdasCabecera.some(function (celda, indice) {
                acumulado += anchosCabecera[indice] / totalCabecera;
                if (centroRelativo <= acumulado + 0.0001) {
                    celdaCabecera = celda;
                    return true;
                }
                return false;
            });
        }
        if (!celdaCabecera) celdaCabecera = celdasCabecera[Math.min(indiceFiltro, celdasCabecera.length - 1)];
        return celdaCabecera ? texto(celdaCabecera).trim() : etiquetaDesdeCabecera(campo);
    }

    function normalizarEtiqueta(etiqueta, campo, indice) {
        var valor = String(etiqueta || '').replace(/\s*:\s*$/, '').replace(/\.+$/, '').trim();
        if (valor === '#') valor = 'Código';
        if (/^nro\s*doc$/i.test(valor)) valor = 'Nro. documento';
        if (/^telef$/i.test(valor)) valor = 'Teléfono';
        if (/^descripci[oó]n$/i.test(valor)) valor = 'Descripción';
        if (!valor) valor = campo.id.replace(/^inpt/i, '').replace(/Buscar/ig, ' ').replace(/Abm/ig, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\d+$/, '').trim();
        return valor || ('Filtro ' + (indice + 1));
    }

    function etiquetaCampo(campo, indice, columnas) {
        var celda = campo.closest('td');
        var formulario = campo.closest('.abm-estandar, .divAbms');
        var configuracionInforme = formulario && configuracionesInformes[formulario.id]
            ? configuracionesInformes[formulario.id]
            : null;
        var etiquetaConfigurada = configuracionInforme &&
            configuracionInforme.etiquetasFiltros &&
            configuracionInforme.etiquetasFiltros[campo.id]
            ? configuracionInforme.etiquetasFiltros[campo.id]
            : '';
        if (!etiquetaConfigurada && formulario && configuracionesFiltrosAbm[formulario.id]) {
            etiquetaConfigurada = configuracionesFiltrosAbm[formulario.id][campo.id] || '';
        }
        if (etiquetaConfigurada) return etiquetaConfigurada;
        var etiquetaAsociada = formulario && campo.id ? formulario.querySelector('label[for="' + campo.id + '"]') : null;
        var etiqueta = etiquetaAsociada || (celda && celda.querySelector('label, .pTituloC, .pTitulo8, h3, h4'));
        var valor = texto(etiqueta);
        if (!valor && campo.dataset && campo.dataset.filterLabel) valor = campo.dataset.filterLabel;
        if (!valor && campo.getAttribute('aria-label')) valor = campo.getAttribute('aria-label');
        if (!valor && campo.placeholder && !/^(igual|parecido|obligatorio)/i.test(campo.placeholder)) valor = campo.placeholder;
        if (!valor) valor = etiquetaDesdeCabeceraAlineada(campo);
        return normalizarEtiqueta(valor, campo, indice);
    }

    function guardarEstadoInicial(campo) {
        if (campo.dataset.abmEstadoInicial === '1') return;
        campo.dataset.abmEstadoInicial = '1';
        campo.dataset.abmValorInicial = campo.value == null ? '' : String(campo.value);
        if (/^(checkbox|radio)$/.test(campo.type)) campo.dataset.abmCheckedInicial = campo.checked ? '1' : '0';
    }

    function restaurarEstadoInicial(campo) {
        if (typeof campo.dataset.abmValorInicial !== 'undefined') campo.value = campo.dataset.abmValorInicial;
        if (/^(checkbox|radio)$/.test(campo.type) && typeof campo.dataset.abmCheckedInicial !== 'undefined') {
            campo.checked = campo.dataset.abmCheckedInicial === '1';
        }
    }

    function transferirControlContenedor(campo) {
        var contenedorControl = campo.closest('[onclick]');
        if (!contenedorControl || contenedorControl === campo) return;
        var codigo = String(contenedorControl.getAttribute('onclick') || '');
        var hallado = codigo.match(/\b([A-Za-z_$][A-Za-z0-9_$]*)\s*\(([^)]*)\)/);
        if (!hallado || typeof global[hallado[1]] !== 'function') return;
        var funcion = hallado[1];
        var argumentosTexto = hallado[2].trim();
        var argumentos = argumentosTexto === '' ? [] : argumentosTexto.split(',').map(function (argumento) {
            var limpio = argumento.trim();
            if (/^(['"]).*\1$/.test(limpio)) return limpio.slice(1, -1);
            if (/^-?\d+(\.\d+)?$/.test(limpio)) return Number(limpio);
            if (limpio === 'this') return campo;
            return typeof global[limpio] !== 'undefined' ? global[limpio] : limpio;
        });
        campo.addEventListener('change', function () { global[funcion].apply(global, argumentos); });
        campo.dataset.abmControlTransferido = funcion;
    }

    function construirModal(formulario, nombre, campos, columnas, tablaEncabezado) {
        var modal = document.createElement('div');
        modal.className = 'abm-estandar-modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = '<div class="abm-estandar-modal-overlay"></div><section class="abm-estandar-modal-box" role="dialog" aria-modal="true" aria-label="Filtros de ' + nombre + '"><header><h3>Filtros de ' + nombre + '</h3><button type="button" class="abm-estandar-cerrar" aria-label="Cerrar filtros">&times;</button></header><div class="abm-estandar-modal-body"></div><footer><button type="button" class="abm-estandar-btn secundario" data-accion="limpiar">Limpiar</button><button type="button" class="abm-estandar-btn primario" data-accion="aplicar">Aplicar filtros</button></footer></section>';
        var cuerpoModal = modal.querySelector('.abm-estandar-modal-body');
        var origenes = [];
        /*
         * Las etiquetas deben resolverse antes de mover los controles. Al sacar
         * un campo de su tabla cambia el indice de los que quedan y todos
         * terminaban heredando el primer encabezado (normalmente "Codigo").
         */
        var etiquetasCampos = campos.map(function (campo, indice) {
            return etiquetaCampo(campo, indice, columnas);
        });
        opcionesFiltroPrimero(campos).forEach(function (campo) {
            var indice = campos.indexOf(campo);
            guardarEstadoInicial(campo);
            transferirControlContenedor(campo);
            var origen = campo.closest('table');
            if (origen && origen !== tablaEncabezado && origenes.indexOf(origen) < 0) origenes.push(origen);
            var nombreCampo = etiquetasCampos[indice];
            campo.dataset.abmEtiqueta = nombreCampo;
            var grupo = document.createElement('div');
            grupo.className = 'abm-estandar-filtro-grupo';
            if (/^(checkbox|radio)$/.test(campo.type)) {
                grupo.classList.add('abm-estandar-filtro-opcion');
                var etiquetaOpcion = document.createElement('label');
                var textoOpcion = document.createElement('span');
                textoOpcion.textContent = nombreCampo;
                etiquetaOpcion.appendChild(campo);
                etiquetaOpcion.appendChild(textoOpcion);
                grupo.appendChild(etiquetaOpcion);
            } else {
                var label = document.createElement('label');
                label.setAttribute('for', campo.id);
                label.textContent = nombreCampo;
                grupo.appendChild(label);
                grupo.appendChild(campo);
            }
            cuerpoModal.appendChild(grupo);
        });
        origenes.forEach(function (origen) { origen.classList.add('abm-estandar-origen-filtro-oculto'); });
        formulario.appendChild(modal);
        return modal;
    }

    function ocultarContenedoresOrigenVacios(formulario) {
        lista(formulario.querySelectorAll('.divMenuf, .divMenuF')).reverse().forEach(function (bloque) {
            if (bloque.classList.contains('abm-estandar-footer') ||
                bloque.classList.contains('abm-estandar-contenido') ||
                bloque.querySelector('.abm-estandar-tabla-cabecera, .abm-estandar-tabla-cuerpo')) return;

            var fueOrigenLegacy = bloque.querySelector('.abm-estandar-origen-filtro-oculto, .abm-estandar-accion-original-oculta');
            if (!fueOrigenLegacy) return;

            var conservaContenido = lista(bloque.children).some(function (hijo) {
                if (hijo.tagName === 'BR' || hijo.hidden || hijo.style.display === 'none') return false;
                if (hijo.classList.contains('abm-estandar-origen-filtro-oculto') ||
                    hijo.classList.contains('abm-estandar-accion-original-oculta') ||
                    hijo.classList.contains('abm-estandar-origen-vacio')) return false;
                return true;
            });

            if (!conservaContenido) {
                bloque.classList.add('abm-estandar-origen-vacio');
                bloque.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function normalizar(formulario) {
        if (!formulario.id || formulariosPropios[formulario.id] || formulario.dataset.abmEstandar === '1') return;
        var cabeceras = lista(formulario.querySelectorAll('.tableCabeceraRegistro'));
        var cuerpo = formulario.querySelector('.div_cuerpo_table[id]');
        if (!cuerpo) return;
        var tablaEncabezado = cabeceras[0];
        var filaEncabezado = tablaEncabezado && tablaEncabezado.querySelector('tr');
        if (!filaEncabezado) return;
        var columnas = lista(filaEncabezado.children).filter(function (celda) {
            return /^(TD|TH)$/.test(celda.tagName) && texto(celda) !== '';
        });
        if (!columnas.length) return;

        formulario.dataset.abmEstandar = '1';
        formulario.classList.add('abm-estandar');
        var nombre = nombreFormulario(formulario);
        var menuTitulo = formulario.querySelector('.tableMenuZ');
        if (menuTitulo) menuTitulo.classList.add('abm-estandar-header');
        var contenedor = ancestroComunListado(formulario, tablaEncabezado, cuerpo);
        var referenciaCabecera = hijoDirecto(contenedor, tablaEncabezado);
        contenedor.classList.add('abm-estandar-contenido');
        tablaEncabezado.classList.add('abm-estandar-tabla-cabecera');
        cuerpo.classList.add('abm-estandar-tabla-cuerpo');

        var campos = camposFiltro(formulario, tablaEncabezado, cuerpo);
        var configuracionInforme = configuracionesInformes[formulario.id] || configuracionesBusquedaAbm[formulario.id] || {};
        var campoPrincipalConfigurado = configuracionInforme.campoBusquedaGeneral
            ? document.getElementById(configuracionInforme.campoBusquedaGeneral)
            : null;
        var busquedaGeneralIndependiente = configuracionInforme.busquedaGeneralIndependiente === true;
        var campoPrincipal = !busquedaGeneralIndependiente && campoPrincipalConfigurado && campos.indexOf(campoPrincipalConfigurado) >= 0
            ? campoPrincipalConfigurado
            : (!busquedaGeneralIndependiente ? campos.filter(function (campo) {
                return /^(text|search|tel|email)$/.test(campo.type || 'text');
            })[0] || null : null);
        var funcionBuscar = buscarFuncion(formulario);
        var etiquetasAcciones = {};
        var accionesUtilidad = lista(formulario.querySelectorAll('input[type="button"], button')).filter(function (boton) {
            var etiqueta = String(boton.value || texto(boton) || '').replace(/\s+/g, ' ').trim();
            if (!/^(imprimir|exportar|excel|pdf|descargar)$/i.test(etiqueta) || boton.disabled) return false;
            var claveAccion = etiqueta.toLowerCase();
            if (etiquetasAcciones[claveAccion]) return false;
            etiquetasAcciones[claveAccion] = true;
            return true;
        });
        var modal = construirModal(formulario, nombre, campos, columnas, tablaEncabezado);
        if (funcionBuscar) {
            lista(formulario.querySelectorAll('[onclick]')).forEach(function (control) {
                if (String(control.getAttribute('onclick') || '').indexOf(funcionBuscar + '(') < 0) return;
                var tablaAccion = control.closest('table');
                if (tablaAccion && tablaAccion !== tablaEncabezado) tablaAccion.classList.add('abm-estandar-origen-filtro-oculto');
            });
        }

        var barra = document.createElement('div');
        barra.className = 'abm-estandar-toolbar';
        barra.innerHTML = '<div class="abm-estandar-busqueda"><input type="search" class="abm-estandar-busqueda-general" placeholder="Buscar en ' + nombre + '" aria-label="Buscar en ' + nombre + '"><button type="button" class="abm-estandar-btn primario" data-accion="buscar">Buscar</button></div><div class="abm-estandar-acciones"><button type="button" class="abm-estandar-btn advertencia" data-accion="filtros">Filtros</button><div class="abm-estandar-columnas"><button type="button" class="abm-estandar-btn oscuro selector-columnas-trigger" data-accion="columnas" aria-expanded="false">Columnas</button><div class="abm-estandar-menu-columnas selector-columnas-panel"></div></div><button type="button" class="abm-estandar-btn claro" data-accion="limpiar">Limpiar</button></div>';
        var contenedorAcciones = barra.querySelector('.abm-estandar-acciones');
        var botonFiltros = barra.querySelector('[data-accion="filtros"]');
        accionesUtilidad.forEach(function (accionOriginal) {
            var accion = document.createElement('button');
            accion.type = 'button';
            accion.className = 'abm-estandar-btn oscuro abm-estandar-accion-utilidad';
            accion.textContent = String(accionOriginal.value || texto(accionOriginal)).trim();
            accion.addEventListener('click', function () { accionOriginal.click(); });
            accionOriginal.classList.add('abm-estandar-accion-original-oculta');
            contenedorAcciones.insertBefore(accion, botonFiltros);
        });
        ocultarContenedoresOrigenVacios(formulario);
        contenedor.insertBefore(barra, referenciaCabecera);

        var chips = document.createElement('div');
        chips.className = 'abm-estandar-chips';
        contenedor.insertBefore(chips, referenciaCabecera);
        var buscador = barra.querySelector('.abm-estandar-busqueda-general');
        if (configuracionInforme.idBusquedaGeneral) buscador.id = configuracionInforme.idBusquedaGeneral;
        var esInformeVisitaClientes = formulario.id === 'divClienteImpago';
        var esAgendaPrincipal = formulario.id === 'divAbmAgenda1';
        if (configuracionInforme.placeholderBusquedaGeneral) {
            buscador.placeholder = configuracionInforme.placeholderBusquedaGeneral;
        }
        if (configuracionInforme.etiquetaBusquedaGeneral) {
            buscador.setAttribute('aria-label', configuracionInforme.etiquetaBusquedaGeneral);
        }
        if (esInformeVisitaClientes) {
            buscador.id = 'inptBuscarGeneralVisitaClientes';
            buscador.placeholder = 'Buscar por cliente, documento o motivo...';
            buscador.setAttribute('aria-label', 'Buscar visitas por cliente, documento o motivo');
        }
        if (esAgendaPrincipal) {
            buscador.id = 'inptBuscarGeneralAgenda';
            buscador.placeholder = 'Buscar por nombre o documento del cliente...';
            buscador.setAttribute('aria-label', 'Buscar agenda por nombre o documento del cliente');
        }
        if (!campoPrincipal && !busquedaGeneralIndependiente) {
            buscador.disabled = true;
            buscador.placeholder = 'Utilice el botón Filtros';
        }
        var busquedaLocalInforme = !campoPrincipal && !!configuracionesInformes[formulario.id] && !campos.length;
        if (busquedaLocalInforme) {
            buscador.disabled = false;
            buscador.placeholder = 'Buscar en ' + nombre;
            botonFiltros.style.display = 'none';
        }
        var menuColumnas = barra.querySelector('.abm-estandar-menu-columnas');
        var botonColumnas = barra.querySelector('[data-accion="columnas"]');
        menuColumnas.id = 'panelColumnasEstandar_' + formulario.id;
        botonColumnas.setAttribute('aria-controls', menuColumnas.id);
        var clave = 'columnasAbmEstandar_' + nombre;
        var visibles;
        try { visibles = JSON.parse(localStorage.getItem(clave) || '{}'); } catch (e) { visibles = {}; }

        function actualizarChips() {
            var busquedaGeneralActiva = (esInformeVisitaClientes || esAgendaPrincipal || busquedaGeneralIndependiente) ? String(buscador.value || '').trim() : '';
            var activos = campos.filter(function (campo) {
                if (/^(checkbox|radio)$/.test(campo.type)) return campo.checked;
                return String(campo.value || '').trim() !== '';
            });
            chips.innerHTML = '';
            if (!activos.length && !busquedaGeneralActiva) {
                chips.innerHTML = '<span class="abm-estandar-chip vacio">Sin filtros aplicados</span>';
                return;
            }
            if (busquedaGeneralActiva) {
                var chipBusquedaGeneral = document.createElement('span');
                chipBusquedaGeneral.className = 'abm-estandar-chip';
                chipBusquedaGeneral.textContent = (esAgendaPrincipal ? 'Cliente' : 'Busqueda') + ': ' + busquedaGeneralActiva;
                chips.appendChild(chipBusquedaGeneral);
            }
            activos.forEach(function (campo) {
                var chip = document.createElement('span');
                var valorFiltro = campo.value;
                if (campo.tagName === 'SELECT' && campo.selectedIndex >= 0) {
                    valorFiltro = campo.options[campo.selectedIndex].text;
                } else if (/^(checkbox|radio)$/.test(campo.type)) {
                    valorFiltro = 'Si';
                }
                chip.className = 'abm-estandar-chip';
                chip.textContent = (campo.dataset.abmEtiqueta || campo.placeholder || campo.id.replace(/^inpt/i, '').replace(/Buscar/ig, ' ')) + ': ' + valorFiltro;
                chips.appendChild(chip);
            });
        }

        function limpiarFiltros() {
            campos.forEach(function (campo) {
                restaurarEstadoInicial(campo);
            });
            buscador.value = '';
            if (busquedaLocalInforme) filtrarListadoLocal('');
            actualizarChips();
        }

        function filtrarListadoLocal(consulta) {
            var termino = String(consulta || '').trim().toLocaleLowerCase('es');
            obtenerFilas(cuerpo).forEach(function (fila) {
                fila.style.display = !termino || texto(fila).toLocaleLowerCase('es').indexOf(termino) >= 0 ? '' : 'none';
            });
        }

        var focoAnterior = null;
        function abrirModal(abrir) {
            if (abrir) focoAnterior = document.activeElement;
            modal.classList.toggle('activo', abrir);
            modal.setAttribute('aria-hidden', abrir ? 'false' : 'true');
            document.body.classList.toggle('abm-modal-abierto', abrir);
            if (abrir) {
                var primerCampo = modal.querySelector('.abm-estandar-modal-body input:not([type="hidden"]), .abm-estandar-modal-body select, .abm-estandar-modal-body textarea');
                if (primerCampo) setTimeout(function () { primerCampo.focus(); }, 0);
            } else if (focoAnterior && typeof focoAnterior.focus === 'function') {
                focoAnterior.focus();
            }
        }

        function celdasVisualesFila(fila) {
            return obtenerCeldas(fila).filter(function (celda) {
                if (celda.dataset.abmCeldaTecnica === '1') {
                    celda.style.display = 'none';
                    return false;
                }
                if (celda.dataset.abmColumna) return true;
                if (celda.dataset.abmColumnaPreparada !== '1') {
                    celda.dataset.abmColumnaPreparada = '1';
                    if (celda.hidden || celda.style.display === 'none') {
                        celda.dataset.abmCeldaTecnica = '1';
                        return false;
                    }
                }
                return celda.dataset.abmCeldaTecnica !== '1';
            });
        }

        function celdaFilaParaColumna(fila, columna, indice) {
            var campo = columna && columna.dataset ? columna.dataset.campo : '';
            var porCampo = null;
            if (campo) {
                obtenerCeldas(fila).some(function (celda) {
                    if (celda.dataset.abmColumna !== campo) return false;
                    porCampo = celda;
                    return true;
                });
            }
            return porCampo || celdasVisualesFila(fila)[indice] || null;
        }

        function aplicarColumnas() {
            columnas.forEach(function (columna, indice) { columna.style.display = visibles[indice] === false ? 'none' : ''; });
            obtenerFilas(cuerpo).forEach(function (fila) {
                columnas.forEach(function (columna, indice) {
                    var celda = celdaFilaParaColumna(fila, columna, indice);
                    if (celda) celda.style.display = visibles[indice] === false ? 'none' : '';
                });
            });
        }

        columnas.forEach(function (columna, indice) {
            if (typeof visibles[indice] === 'undefined') visibles[indice] = !columna.hidden && columna.style.display !== 'none';
            columna.classList.add('abm-estandar-ordenable');
            columna.tabIndex = 0;
            var opcion = document.createElement('label');
            opcion.innerHTML = '<input type="checkbox" ' + (visibles[indice] ? 'checked' : '') + '> <span></span>';
            opcion.querySelector('span').textContent = texto(columna);
            opcion.querySelector('input').addEventListener('change', function (evento) {
                visibles[indice] = evento.target.checked;
                localStorage.setItem(clave, JSON.stringify(visibles));
                aplicarColumnas();
            });
            menuColumnas.appendChild(opcion);
        });

        var ordenIndice = -1;
        var ordenDireccion = 1;
        function ordenar(indice) {
            ordenDireccion = ordenIndice === indice ? -ordenDireccion : 1;
            ordenIndice = indice;
            lista(filaEncabezado.querySelectorAll('.abm-estandar-indicador')).forEach(function (nodo) { nodo.remove(); });
            var indicador = document.createElement('span');
            indicador.className = 'abm-estandar-indicador';
            indicador.innerHTML = ordenDireccion > 0 ? '&#9650;' : '&#9660;';
            columnas[indice].appendChild(indicador);
            var filasOrdenadas = obtenerFilas(cuerpo);
            var destinoOrden = filasOrdenadas.length && filasOrdenadas[0].tagName !== 'TABLE' ? filasOrdenadas[0].parentNode : cuerpo;
            filasOrdenadas.sort(function (a, b) {
                return compararTexto(
                    texto(celdaFilaParaColumna(a, columnas[indice], indice)),
                    texto(celdaFilaParaColumna(b, columnas[indice], indice)),
                    ordenDireccion
                );
            }).forEach(function (fila) { destinoOrden.appendChild(fila); });
        }
        columnas.forEach(function (columna, indice) {
            columna.addEventListener('click', function () { ordenar(indice); });
            columna.addEventListener('keydown', function (evento) {
                if (evento.key === 'Enter' || evento.key === ' ') { evento.preventDefault(); ordenar(indice); }
            });
        });

        barra.addEventListener('click', function (evento) {
            var accion = evento.target.getAttribute('data-accion');
            if (accion === 'buscar') {
                if (busquedaGeneralIndependiente) {
                    actualizarChips();
                    ejecutarBusqueda(funcionBuscar, null);
                } else if (campoPrincipal) {
                    if (!esInformeVisitaClientes && !esAgendaPrincipal && String(buscador.value || '').trim() !== '') {
                        var valorFiltroOriginal = campoPrincipal.value;
                        campoPrincipal.value = buscador.value;
                        try {
                            ejecutarBusqueda(funcionBuscar, campoPrincipal);
                        } finally {
                            campoPrincipal.value = valorFiltroOriginal;
                        }
                        actualizarChips();
                    } else {
                        actualizarChips();
                        ejecutarBusqueda(funcionBuscar, campoPrincipal);
                    }
                } else if (busquedaLocalInforme) {
                    filtrarListadoLocal(buscador.value);
                }
            }
            if (accion === 'filtros') abrirModal(true);
            if (accion === 'limpiar') limpiarFiltros();
            if (accion === 'columnas') {
                var abierto = menuColumnas.classList.toggle('activo');
                evento.target.setAttribute('aria-expanded', abierto ? 'true' : 'false');
            }
        });
        buscador.addEventListener('keydown', function (evento) {
            if (evento.key === 'Enter') barra.querySelector('[data-accion="buscar"]').click();
        });
        modal.addEventListener('click', function (evento) {
            if (evento.target.classList.contains('abm-estandar-modal-overlay') || evento.target.classList.contains('abm-estandar-cerrar')) abrirModal(false);
            if (evento.target.getAttribute('data-accion') === 'limpiar') limpiarFiltros();
            if (evento.target.getAttribute('data-accion') === 'aplicar') { actualizarChips(); abrirModal(false); ejecutarBusqueda(funcionBuscar, campoPrincipal); }
        });

        var pies = [];
        lista(formulario.querySelectorAll('.divMenuf')).forEach(function (pie) {
            if (pie === contenedor || !pie.querySelector('input[id*="Registro"], input[disabled][id]')) return;
            pie.classList.add('abm-estandar-footer');
            pies.push(pie);
        });
        marcarRutaFlexible(formulario, contenedor.parentElement);
        marcarRutaFlexible(formulario, cuerpo.parentElement);
        pies.forEach(function (pie) { marcarRutaFlexible(formulario, pie.parentElement); });
        new MutationObserver(aplicarColumnas).observe(cuerpo, { childList: true, subtree: true });
        actualizarChips(); aplicarColumnas();
    }

    function cabeceraInformeParaCuerpo(formulario, cuerpo) {
        var candidatas = lista(formulario.querySelectorAll('table.tableCabeceraRegistro')).filter(function (tabla) {
            if (tabla.querySelector('input, select, textarea')) return false;
            var tieneTitulos = lista(tabla.querySelectorAll('tr:first-child > td, tr:first-child > th')).some(function (celda) {
                return texto(celda) !== '';
            });
            return tieneTitulos && (tabla.compareDocumentPosition(cuerpo) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
        });
        return candidatas.length ? candidatas[candidatas.length - 1] : null;
    }

    function tituloTablaInforme(cuerpo, indice) {
        var vista = cuerpo.parentElement;
        while (vista && !vista.id && !vista.classList.contains('divMenuf') && !vista.classList.contains('divMenuF')) {
            vista = vista.parentElement;
        }
        if (vista && vista.id && vista !== cuerpo) {
            return vista.id.replace(/^div/i, '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').trim();
        }
        return indice === 0 ? 'Vista principal' : 'Vista ' + (indice + 1);
    }

    function prepararColumnasSecundariasInforme(formulario, cuerpos) {
        var menu = formulario.querySelector('.abm-estandar-menu-columnas');
        if (!menu) return;
        var cabeceraPrincipal = formulario.querySelector('.abm-estandar-tabla-cabecera');
        cuerpos.forEach(function (cuerpo, indiceCuerpo) {
            var cabecera = cabeceraInformeParaCuerpo(formulario, cuerpo);
            if (!cabecera) return;
            cabecera.classList.add('abm-estandar-tabla-cabecera', 'informe-estandar-tabla-cabecera');
            cuerpo.classList.add('abm-estandar-tabla-cuerpo', 'informe-estandar-tabla-cuerpo');
            if (cabecera === cabeceraPrincipal) return;

            var fila = cabecera.querySelector('tr');
            var columnas = fila ? lista(fila.children).filter(function (celda) {
                return /^(TD|TH)$/.test(celda.tagName) && texto(celda) !== '';
            }) : [];
            if (!columnas.length) return;

            var separador = document.createElement('strong');
            separador.className = 'abm-estandar-columnas-grupo';
            separador.textContent = tituloTablaInforme(cuerpo, indiceCuerpo);
            menu.appendChild(separador);
            var clave = 'columnasInforme_' + formulario.id + '_' + indiceCuerpo;
            var visibles = {};
            try { visibles = JSON.parse(localStorage.getItem(clave) || '{}'); } catch (e) { visibles = {}; }

            function aplicarColumnas() {
                columnas.forEach(function (columna, indice) {
                    columna.style.display = visibles[indice] === false ? 'none' : '';
                });
                obtenerFilas(cuerpo).forEach(function (registro) {
                    obtenerCeldas(registro).slice(0, columnas.length).forEach(function (celda, indice) {
                        celda.style.display = visibles[indice] === false ? 'none' : '';
                    });
                });
            }

            columnas.forEach(function (columna, indice) {
                if (typeof visibles[indice] === 'undefined') visibles[indice] = !columna.hidden && columna.style.display !== 'none';
                var opcion = document.createElement('label');
                var check = document.createElement('input');
                var etiqueta = document.createElement('span');
                check.type = 'checkbox';
                check.checked = visibles[indice] !== false;
                etiqueta.textContent = texto(columna);
                opcion.appendChild(check);
                opcion.appendChild(etiqueta);
                check.addEventListener('change', function () {
                    visibles[indice] = check.checked;
                    localStorage.setItem(clave, JSON.stringify(visibles));
                    aplicarColumnas();
                });
                menu.appendChild(opcion);
            });

            var orden = { indice: -1, direccion: 1 };
            function ordenar(indice) {
                var filas = obtenerFilas(cuerpo);
                if (!filas.length) return;
                orden.direccion = orden.indice === indice ? orden.direccion * -1 : 1;
                orden.indice = indice;
                var destino = filas[0].tagName === 'TABLE' ? cuerpo : filas[0].parentNode;
                filas.sort(function (a, b) {
                    return compararTexto(texto(obtenerCeldas(a)[indice]), texto(obtenerCeldas(b)[indice]), orden.direccion);
                }).forEach(function (filaOrdenada) { destino.appendChild(filaOrdenada); });
                columnas.forEach(function (columna) {
                    var anterior = columna.querySelector('.abm-estandar-indicador');
                    if (anterior) anterior.parentNode.removeChild(anterior);
                });
                var indicador = document.createElement('span');
                indicador.className = 'abm-estandar-indicador';
                indicador.innerHTML = orden.direccion === 1 ? '&#9650;' : '&#9660;';
                columnas[indice].appendChild(indicador);
            }
            columnas.forEach(function (columna, indice) {
                if (columna.dataset.informeOrdenable === '1') return;
                columna.dataset.informeOrdenable = '1';
                columna.classList.add('abm-estandar-ordenable');
                columna.tabIndex = 0;
                columna.setAttribute('title', 'Ordenar por ' + texto(columna));
                columna.addEventListener('click', function () { ordenar(indice); });
                columna.addEventListener('keydown', function (evento) {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                        evento.preventDefault();
                        ordenar(indice);
                    }
                });
            });
            new MutationObserver(aplicarColumnas).observe(cuerpo, { childList: true, subtree: true });
            aplicarColumnas();
        });
    }

    function prepararEstructuraInforme(formulario, configuracion) {
        formulario.classList.add('abm-estandar', 'informe-estandar', 'informe-estandar-' + configuracion.tipo);
        var cabecera = formulario.querySelector('.tableMenuZ');
        if (cabecera) cabecera.classList.add('abm-estandar-header');
        var shell = formulario.querySelector('.divPrincipalrepor, .divAbms') || formulario;
        shell.classList.add('informe-estandar-shell');
        var centro = null;
        lista(shell.children).some(function (hijo) {
            if (hijo.tagName === 'CENTER' || hijo.tagName === 'DIV') {
                if (hijo !== cabecera && (hijo.querySelector('.divMenuf, .divMenuF, .div_cuerpo_table, .ContenedorCatalogo'))) {
                    centro = hijo;
                    return true;
                }
            }
            return false;
        });
        if (!centro) centro = shell.querySelector('center, .divMenuf, .divMenuF');
        if (centro) centro.classList.add('informe-estandar-centro');

        var cuerpos = lista(formulario.querySelectorAll('.div_cuerpo_table[id], .ContenedorCatalogo[id]'));
        cuerpos.forEach(function (cuerpo) {
            cuerpo.classList.add('informe-estandar-tabla-cuerpo');
            var cabeceraTabla = cabeceraInformeParaCuerpo(formulario, cuerpo);
            if (cabeceraTabla) cabeceraTabla.classList.add('informe-estandar-tabla-cabecera');
            var listado = cuerpo.closest('.divMenuf, .divMenuF');
            if (listado) listado.classList.add('informe-estandar-listado');
            var vista = cuerpo.parentElement;
            if (vista && vista !== listado && vista.tagName === 'DIV') vista.classList.add('informe-estandar-vista');
        });

        lista(formulario.querySelectorAll('.divMenuf, .divMenuF')).forEach(function (bloque) {
            if (!bloque.querySelector('.div_cuerpo_table, .ContenedorCatalogo') && bloque.querySelector('input[disabled], .inputTextDisable')) {
                bloque.classList.add('abm-estandar-footer', 'informe-estandar-footer');
            }
            var hijosVisibles = lista(bloque.children).filter(function (hijo) {
                return !hijo.classList.contains('abm-estandar-origen-filtro-oculto') && hijo.tagName !== 'BR';
            });
            if (!hijosVisibles.length) bloque.classList.add('informe-estandar-origen-vacio');
        });
        prepararColumnasSecundariasInforme(formulario, cuerpos);
    }

    function normalizarInformes() {
        Object.keys(configuracionesInformes).forEach(function (id) {
            var formulario = document.getElementById(id);
            var configuracion = configuracionesInformes[id];
            if (!formulario) return;
            if (configuracion.tipo !== 'especial') normalizar(formulario);
            prepararEstructuraInforme(formulario, configuracion);
        });
    }

    function normalizarPanelTarjetas(config) {
        var formulario = document.getElementById(config.formulario);
        if (!formulario || formulario.dataset.abmEstandar === '1') return;
        var resultados = document.getElementById(config.resultados);
        var filtros = formulario.querySelector('.analyse2');
        if (!resultados || !filtros) return;
        var cuerpo = resultados.closest('.div_cuerpo_table, .ContenedorCatalogo');
        if (!cuerpo) return;
        var centro = formulario.querySelector('center');
        formulario.dataset.abmEstandar = '1';
        formulario.classList.add('abm-estandar', 'abm-estandar-panel-tarjetas');
        if (centro) centro.classList.add('abm-estandar-centro');
        var titulo = formulario.querySelector('.tableMenuZ');
        if (titulo) titulo.classList.add('abm-estandar-header');
        cuerpo.classList.add('abm-estandar-tabla-cuerpo', 'abm-estandar-resultados-tarjetas');

        var campos = lista(filtros.querySelectorAll('input, select, textarea')).filter(function (campo) { return campo.type !== 'button'; });
        campos.forEach(guardarEstadoInicial);
        var botonOriginal = filtros.querySelector('input[type="button"], button');
        var contenedor = cuerpo.parentNode;
        contenedor.classList.add('abm-estandar-contenido');
        var barra = document.createElement('div');
        barra.className = 'abm-estandar-toolbar';
        barra.innerHTML = '<div class="abm-estandar-busqueda"><span class="abm-estandar-resumen">' + config.resumen + '</span></div><div class="abm-estandar-acciones"><button type="button" class="abm-estandar-btn primario" data-accion="buscar">Buscar</button><button type="button" class="abm-estandar-btn advertencia" data-accion="filtros">Filtros</button><button type="button" class="abm-estandar-btn claro" data-accion="limpiar">Limpiar</button></div>';
        contenedor.insertBefore(barra, cuerpo);
        var chips = document.createElement('div');
        chips.className = 'abm-estandar-chips';
        contenedor.insertBefore(chips, cuerpo);

        var modal = document.createElement('div');
        modal.className = 'abm-estandar-modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = '<div class="abm-estandar-modal-overlay"></div><section class="abm-estandar-modal-box" role="dialog" aria-modal="true" aria-label="Filtros de ' + config.titulo + '"><header><h3>Filtros de ' + config.titulo + '</h3><button type="button" class="abm-estandar-cerrar" aria-label="Cerrar filtros">&times;</button></header><div class="abm-estandar-modal-body"></div><footer><button type="button" class="abm-estandar-btn secundario" data-accion="limpiar">Limpiar</button><button type="button" class="abm-estandar-btn primario" data-accion="aplicar">Aplicar filtros</button></footer></section>';
        var cuerpoModal = modal.querySelector('.abm-estandar-modal-body');
        opcionesFiltroPrimero(campos).forEach(function (campo) {
            var indice = campos.indexOf(campo);
            var grupo = document.createElement('div');
            grupo.className = 'abm-estandar-filtro-grupo';
            var label = document.createElement('label');
            label.setAttribute('for', campo.id);
            campo.dataset.abmEtiqueta = etiquetaCampo(campo, indice, []);
            label.textContent = campo.dataset.abmEtiqueta;
            grupo.appendChild(label);
            grupo.appendChild(campo);
            cuerpoModal.appendChild(grupo);
        });
        filtros.classList.add('abm-estandar-origen-filtro-oculto');
        formulario.appendChild(modal);

        function actualizar() {
            chips.innerHTML = '';
            var activos = campos.filter(function (campo) { return String(campo.value || '').trim() !== ''; });
            if (!activos.length) chips.innerHTML = '<span class="abm-estandar-chip vacio">Sin filtros aplicados</span>';
            activos.forEach(function (campo) {
                var chip = document.createElement('span');
                chip.className = 'abm-estandar-chip';
                chip.textContent = (campo.dataset.abmEtiqueta || campo.id.replace(/^inptBuscar/i, '').replace(/Abm/ig, ' ')) + ': ' + (campo.options && campo.selectedIndex >= 0 ? campo.options[campo.selectedIndex].text : campo.value);
                chips.appendChild(chip);
            });
        }
        function limpiar() {
            campos.forEach(restaurarEstadoInicial);
            actualizar();
        }
        function abrir(valor) {
            modal.classList.toggle('activo', valor);
            modal.setAttribute('aria-hidden', valor ? 'false' : 'true');
            document.body.classList.toggle('abm-modal-abierto', valor);
            if (valor && campos[0]) setTimeout(function () { campos[0].focus(); }, 0);
        }
        function buscar() {
            actualizar();
            if (typeof global[config.buscar] === 'function') global[config.buscar]();
            else if (botonOriginal) botonOriginal.click();
        }
        barra.addEventListener('click', function (evento) {
            var accion = evento.target.getAttribute('data-accion');
            if (accion === 'buscar') buscar();
            if (accion === 'filtros') abrir(true);
            if (accion === 'limpiar') limpiar();
        });
        modal.addEventListener('click', function (evento) {
            var accion = evento.target.getAttribute('data-accion');
            if (evento.target.classList.contains('abm-estandar-modal-overlay') || evento.target.classList.contains('abm-estandar-cerrar')) abrir(false);
            if (accion === 'limpiar') limpiar();
            if (accion === 'aplicar') { abrir(false); buscar(); }
        });
        lista(formulario.querySelectorAll('.divMenuf')).forEach(function (pie) {
            if (pie !== contenedor && pie.querySelector('input[disabled]')) pie.classList.add('abm-estandar-footer');
        });
        actualizar();
    }

    function normalizarMetas() {
        normalizarPanelTarjetas({ formulario: 'divAbmMetasCobrador1', resultados: 'table_abm_MetaCobrador', titulo: 'Metas Cobradores', resumen: 'Seguimiento de metas por cobrador', buscar: 'buscarMetasCobrador' });
    }

    function normalizarResumenCobrador() {
        normalizarPanelTarjetas({ formulario: 'divAbmResumenCobrador1', resultados: 'table_abm_ResumenCobrador', titulo: 'Resumen Cobrador', resumen: 'Resumen de cobros y asignaciones', buscar: 'buscarResumenCobrador' });
    }

    function normalizarMetasVendedores() {
        normalizarPanelTarjetas({ formulario: 'divVendedorMetas', resultados: 'table_vendedor_metas', titulo: 'Informe de Metas', resumen: 'Seguimiento de metas por vendedor', buscar: 'buscarMetasVendedores' });
    }

    function marcarFormularioPropio(id, selectores) {
        var formulario = document.getElementById(id);
        if (!formulario) return;
        formulario.classList.add('abm-estructura-unificada');
        Object.keys(selectores).forEach(function (clase) {
            var elemento = formulario.querySelector(selectores[clase]);
            if (elemento) elemento.classList.add(clase);
        });
    }

    function funcionBusquedaAuxiliar(campos, ambito) {
        var patron = /\b(buscar[A-Za-z0-9_$]*|Buscar[A-Za-z0-9_$]*)\s*\(/;
        var nombre = '';
        campos.some(function (campo) {
            var codigo = campo.getAttribute('onkeyup') || campo.getAttribute('onchange') || campo.getAttribute('onkeypress') || '';
            var hallado = codigo.match(patron);
            if (hallado) { nombre = hallado[1]; return true; }
            return false;
        });
        if (nombre) return nombre;
        lista(ambito.querySelectorAll('input[type="button"][onclick], button[onclick]')).some(function (boton) {
            var hallado = String(boton.getAttribute('onclick') || '').match(patron);
            if (hallado) { nombre = hallado[1]; return true; }
            return false;
        });
        return nombre;
    }

    function normalizarFiltroAuxiliar(tablaFiltro, indiceAuxiliar) {
        if (!tablaFiltro || tablaFiltro.dataset.abmAuxiliar === '1') return;
        var tablaCabecera = tablaFiltro.previousElementSibling;
        if (!tablaCabecera || !tablaCabecera.classList.contains('tableCabeceraRegistro')) return;
        var campos = lista(tablaFiltro.querySelectorAll('input[id], select[id], textarea[id]')).filter(esCampoFiltro).filter(function (campo) {
            return !estaOcultoEnOrigen(campo, tablaFiltro);
        });
        if (!campos.length) return;

        var ambito = tablaCabecera.closest('.principal2, .divAbms, .divAbms_b') || tablaCabecera.parentElement;
        /* Historial de Ventas y Compras poseen su propia estructura moderna.
         * El normalizador auxiliar no debe duplicar toolbar, filtros ni columnas. */
        if (tablaCabecera.closest('#divHistorialVenta, #divHistorialCompra')) {
            tablaFiltro.dataset.abmAuxiliar = '1';
            return;
        }
        var informePrincipal = tablaCabecera.closest('.principal2');
        var esCuentasCobrar = !!tablaCabecera.closest('#divCuentasAcobrar');
        var esCobrosRealizados = !!tablaCabecera.closest('#divArqueo');
		var esVistaCliente = !!tablaCabecera.closest('#divVistaCliente');
		var esAgenda = !!tablaCabecera.closest('#divAbmAgenda');
        var esMovimientoStock = !!tablaCabecera.closest('#divMovimientoStock');
        var esCatalogo = informePrincipal && informePrincipal.id === 'divInformeCatalago';
        var tablaFechasCuentas = null;
        var tablaOpcionesCuentas = null;
        var contenedorListadoCuentas = null;
        var filtrosCobrosRealizados = null;
        var tablaOpcionesCobrosRealizados = null;
        var contenedorListadoCobrosRealizados = null;
        if (esCuentasCobrar) {
            var fechaInicioCuentas = document.getElementById('inptBuscarCuentasAcobrarF1');
            var opcionTodosCuentas = document.getElementById('checkfiltrosCuentasACobrar1');
            tablaFechasCuentas = fechaInicioCuentas ? fechaInicioCuentas.closest('table.divMenuf') : null;
            tablaOpcionesCuentas = opcionTodosCuentas ? opcionTodosCuentas.closest('table') : null;
            contenedorListadoCuentas = tablaCabecera.closest('div.divMenuf');
            ['inptBuscarCuentasAcobrarF1', 'inptBuscarCuentasAcobrarF2', 'checkfiltrosCuentasACobrar1', 'checkfiltrosCuentasACobrar2', 'checkfiltrosCuentasACobrar3', 'checkfiltrosCuentasACobrar4'].forEach(function (id) {
                var adicional = document.getElementById(id);
                if (adicional && campos.indexOf(adicional) < 0) campos.push(adicional);
            });
            ambito.classList.add('gv-cuentas-cobrar-unificado');
            if (contenedorListadoCuentas) contenedorListadoCuentas.classList.add('gv-cuentas-cobrar-listado');
        }
        if (esCobrosRealizados) {
            filtrosCobrosRealizados = ambito.querySelector('.filtros-container');
            var opcionTodosCobros = document.getElementById('checkfiltrosCobrosRealizados1');
            tablaOpcionesCobrosRealizados = opcionTodosCobros ? opcionTodosCobros.closest('table') : null;
            contenedorListadoCobrosRealizados = tablaCabecera.closest('div.divMenuF');
            [
                'inptBuscarCobrosRealizadosF1', 'inptBuscarCobrosRealizadosF2',
                'inptCobrosRealizadosComprobante', 'inptlocalCobrosRealizados3',
                'inptMorosidadCobrosRealizado', 'inptTipoClienteCobrosRealizado',
                'inptBuscarCobrosRealizadoFechaVenc', 'inptPagoAdelantadoCobrosRealizados',
                'checkfiltrosCobrosRealizados1', 'checkfiltrosCobrosRealizados2',
                'checkfiltrosCobrosRealizadosEntrega'
            ].forEach(function (id) {
                var adicionalCobros = document.getElementById(id);
                if (adicionalCobros && campos.indexOf(adicionalCobros) < 0) campos.push(adicionalCobros);
            });

			/* El periodo y el momento del cobro deben quedar visibles al abrir el
			 * modal. A continuacion se muestran Cliente, las fechas y el Local;
			 * el resto de los filtros conserva su orden original. */
			var camposPrincipalesCobros = [];
			[
				'inptPagoAdelantadoCobrosRealizados',
				'checkfiltrosCobrosRealizados1',
				'checkfiltrosCobrosRealizados2',
				'checkfiltrosCobrosRealizadosEntrega',
				'inptBuscarCobrosRealizados1',
				'inptBuscarCobrosRealizadosF1',
				'inptBuscarCobrosRealizadosF2',
				'inptlocalCobrosRealizados3'
			].forEach(function (idPrincipal) {
				var posicionPrincipal = campos.map(function (campoPrincipal) { return campoPrincipal.id; }).indexOf(idPrincipal);
				if (posicionPrincipal < 0) return;
				camposPrincipalesCobros.push(campos.splice(posicionPrincipal, 1)[0]);
			});
            campos = camposPrincipalesCobros.concat(campos);

            ambito.classList.add('gv-cobros-realizados-unificado');
            if (contenedorListadoCobrosRealizados) contenedorListadoCobrosRealizados.classList.add('gv-cobros-realizados-listado');
        }
        tablaFiltro.dataset.abmAuxiliar = '1';
        tablaCabecera.dataset.abmAuxiliarCabecera = '1';
        var etiquetas = campos.map(function (campo, indice) { return etiquetaCampo(campo, indice, []); });
        if (esCuentasCobrar) {
            var etiquetasCuentasCobrar = {
                inptBuscarCuentasCobrar1: 'Cliente',
                inptBuscarCuentasCobrar2: 'Documento',
                inptBuscarCuentasCobrar3: 'Telefono',
                inptBuscarCuentasCobrar5: 'Fecha de vencimiento',
                inptBuscarCuentasCobrar6: 'Local',
                inptBuscarCuentasCobrar7: 'Vendedor',
                inptBuscarCuentasAcobrarF1: 'Fecha inicio',
                inptBuscarCuentasAcobrarF2: 'Fecha fin',
                checkfiltrosCuentasACobrar1: 'Todos',
                checkfiltrosCuentasACobrar2: 'Rango de fecha',
                checkfiltrosCuentasACobrar3: 'Menor a la fecha de inicio',
                checkfiltrosCuentasACobrar4: 'Mayor a la fecha de inicio'
            };
            etiquetas = campos.map(function (campo, indice) {
                return etiquetasCuentasCobrar[campo.id] || etiquetas[indice];
            });
        }
        if (esCobrosRealizados) {
            var etiquetasCobrosRealizados = {
                inptBuscarCobrosRealizados1: 'Cliente',
                inptBuscarCobrosRealizados8: 'Cobrador asignado',
                inptBuscarCobrosRealizados4: 'Cobrador',
                inptBuscarCobrosRealizados2: 'Numero de factura',
                inptBuscarCobrosRealizados3: 'Fecha de pago',
                inptBuscarCobrosRealizados5: 'Metodo de pago',
                inptBuscarCobrosRealizados7: 'Tipo de pago',
                inptBuscarCobrosRealizados9: 'Tipo de credito',
                inptBuscarCobrosRealizados6: 'Condicion',
                inptBuscarCobrosRealizadosF1: 'Fecha inicio',
                inptBuscarCobrosRealizadosF2: 'Fecha fin',
                inptCobrosRealizadosComprobante: 'Tipo de comprobante',
                inptlocalCobrosRealizados3: 'Local',
                inptMorosidadCobrosRealizado: 'Morosidad',
                inptTipoClienteCobrosRealizado: 'Tipo de cliente',
                inptBuscarCobrosRealizadoFechaVenc: 'Fecha de vencimiento',
                inptPagoAdelantadoCobrosRealizados: 'Momento del cobro',
                checkfiltrosCobrosRealizados1: 'Todos',
                checkfiltrosCobrosRealizados2: 'Rango de fecha',
                checkfiltrosCobrosRealizadosEntrega: 'Incluir entrega'
            };
            etiquetas = campos.map(function (campo, indice) {
                return etiquetasCobrosRealizados[campo.id] || etiquetas[indice];
            });
        }
        if (esVistaCliente) {
            var etiquetasVistaCliente = {
                inptBuscarVistaCliente1: 'Documento',
                inptBuscarVistaCliente2: 'RUC',
                inptBuscarVistaCliente3: 'Cliente',
                inptBuscarVistaCliente4: 'Telefono'
            };
            etiquetas = campos.map(function (campo, indice) {
                return etiquetasVistaCliente[campo.id] || etiquetas[indice];
            });
        }
        if (esAgenda) {
            var etiquetasAgenda = {
                inptBuscarAbmAgenda2: 'Cliente o documento',
                inptBuscarAbmAgenda3: 'Cobrador',
                inptBuscarAbmAgenda4: 'Estado',
                inptBuscarAgendaF1: 'Fecha inicio',
                inptBuscarAgendaF2: 'Fecha fin',
                inptTipoClienteAgenda: 'Tipo de cliente',
                checkHistorialAgendaFC: 'Fecha compromiso',
                checkHistorialAgendaFV: 'Fecha visita',
                checkHistorialAgendaFVI: 'Fecha visitado',
                checkHistorialFechaAgenda1: 'Todos',
                checkHistorialFechaAgenda2: 'Rango de fecha'
            };
            etiquetas = campos.map(function (campo, indice) {
                return etiquetasAgenda[campo.id] || etiquetas[indice];
            });
        }
        var tituloElemento = ambito && ambito.querySelector('.pTituloB, .header-text');
        var titulo = texto(tituloElemento) || 'Listado';
        var funcion = funcionBusquedaAuxiliar(campos, ambito);
        var principal = campos.filter(function (campo) { return /^(text|search|tel|email)$/i.test(campo.type || 'text'); })[0] || null;
        var columnas = lista(tablaCabecera.querySelectorAll('tr:first-child > td, tr:first-child > th'));
        var cuerpoResultados = tablaFiltro.nextElementSibling;
        if (!cuerpoResultados || !cuerpoResultados.matches('.div_cuerpo_table, .divTablesScrool, [id^="table_"]')) {
            cuerpoResultados = null;
        }
        if (!cuerpoResultados && tablaFiltro.parentElement) {
            var bloqueResultados = tablaFiltro.parentElement.nextElementSibling;
            if (bloqueResultados) {
                cuerpoResultados = bloqueResultados.matches('.div_cuerpo_table, .divTablesScrool, [id^="table_"]')
                    ? bloqueResultados
                    : bloqueResultados.querySelector('.div_cuerpo_table, .divTablesScrool, [id^="table_"]');
            }
        }
        campos.forEach(guardarEstadoInicial);

        var referencia = tablaCabecera.parentElement && tablaCabecera.parentElement.classList.contains('divScrollhideen') ? tablaCabecera.parentElement : tablaCabecera;
        var barra = document.createElement('div');
        barra.className = 'abm-estandar-toolbar abm-auxiliar-toolbar';
        barra.innerHTML = '<div class="abm-estandar-busqueda"><input type="search" class="abm-estandar-busqueda-general" aria-label="Buscar en el listado"><button type="button" class="abm-estandar-btn primario" data-accion="buscar">Buscar</button></div><div class="abm-estandar-acciones"><button type="button" class="abm-estandar-btn advertencia" data-accion="filtros">Filtros</button><div class="abm-estandar-columnas"><button type="button" class="abm-estandar-btn oscuro selector-columnas-trigger" data-accion="columnas" aria-expanded="false">Columnas</button><div class="abm-estandar-menu-columnas selector-columnas-panel"></div></div><button type="button" class="abm-estandar-btn claro" data-accion="limpiar">Limpiar</button></div>';
        referencia.parentNode.insertBefore(barra, referencia);
        var chips = document.createElement('div');
        chips.className = 'abm-estandar-chips abm-auxiliar-chips';
        referencia.parentNode.insertBefore(chips, referencia);
        var buscador = barra.querySelector('.abm-estandar-busqueda-general');
        buscador.placeholder = principal ? 'Buscar en ' + titulo : 'Utilice el boton Filtros';
        buscador.disabled = !principal;
        if (esMovimientoStock) {
            buscador.placeholder = 'Buscar por nombre o codigo...';
            buscador.setAttribute('aria-label', 'Buscar productos por nombre o codigo para movimiento de stock');
        }
		if (esCuentasCobrar) {
			buscador.id = 'inptBuscarGeneralCuentasCobrar';
			buscador.placeholder = 'Buscar por nombre, documento o telefono...';
			buscador.setAttribute('aria-label', 'Buscar cuentas a cobrar por nombre, documento o telefono');
		}
		if (esVistaCliente) {
			buscador.id = 'inptBuscarGeneralVistaCliente';
			buscador.placeholder = 'Buscar por nombre, documento, RUC o telefono...';
			buscador.setAttribute('aria-label', 'Buscar cliente por nombre, documento, RUC o telefono');
		}
		if (esAgenda) {
			buscador.id = 'inptBuscarGeneralAgenda';
			buscador.placeholder = 'Buscar por cliente, documento o motivo...';
			buscador.setAttribute('aria-label', 'Buscar agenda por cliente, documento o motivo');
		}
        if (esCatalogo) {
            var botonImprimirCatalogoOriginal = informePrincipal.querySelector('input[type="button"][value="Imprimir"], button[value="Imprimir"]');
            var accionesCatalogo = barra.querySelector('.abm-estandar-acciones');
            var filtroCatalogo = barra.querySelector('[data-accion="filtros"]');
            if (botonImprimirCatalogoOriginal) {
                var botonImprimirCatalogo = document.createElement('button');
                botonImprimirCatalogo.type = 'button';
                botonImprimirCatalogo.className = 'abm-estandar-btn oscuro';
                botonImprimirCatalogo.textContent = 'Imprimir';
                botonImprimirCatalogo.addEventListener('click', function () { botonImprimirCatalogoOriginal.click(); });
                accionesCatalogo.insertBefore(botonImprimirCatalogo, filtroCatalogo);
            }
            var tablaAccionesCatalogo = botonImprimirCatalogoOriginal ? botonImprimirCatalogoOriginal.closest('table') : null;
            if (tablaAccionesCatalogo) tablaAccionesCatalogo.classList.add('abm-estandar-origen-filtro-oculto');
        }
        if (esCuentasCobrar || esCobrosRealizados) {
            var accionesCuentas = barra.querySelector('.abm-estandar-acciones');
            var botonImprimir = document.createElement('button');
            botonImprimir.type = 'button';
            botonImprimir.className = 'abm-estandar-btn oscuro';
            botonImprimir.textContent = 'Imprimir';
            botonImprimir.addEventListener('click', function () {
                if (typeof global.ordenimpresion === 'function') {
                    global.ordenimpresion(esCobrosRealizados ? 'arqueo' : 'cuentasacobrar');
                }
            });
            accionesCuentas.insertBefore(botonImprimir, accionesCuentas.firstChild);
            var botonLimpiarCuentas = accionesCuentas.querySelector('[data-accion="limpiar"]');
            var columnasCuentas = accionesCuentas.querySelector('.abm-estandar-columnas');
            if (botonLimpiarCuentas && columnasCuentas) accionesCuentas.insertBefore(columnasCuentas, botonLimpiarCuentas);
            if (esCobrosRealizados) {
                var botonCajasCobradores = document.createElement('button');
                botonCajasCobradores.type = 'button';
                botonCajasCobradores.className = 'abm-estandar-btn secundario';
                botonCajasCobradores.textContent = 'Cajas de cobradores';
                botonCajasCobradores.addEventListener('click', function () {
                    if (typeof global.verCerrarVistaCajaApp === 'function') global.verCerrarVistaCajaApp();
                });
                accionesCuentas.insertBefore(botonCajasCobradores, botonImprimir);

                var botonFiltrosCobros = accionesCuentas.querySelector('[data-accion="filtros"]');
                [
                    { id: 'btnCobrosRealizadosUbicacion', clase: 'cobros-accion-ubicacion' },
                    { id: 'btnEliminarCobros1', clase: 'cobros-accion-eliminar' }
                ].forEach(function (configuracion) {
                    var botonOriginal = document.getElementById(configuracion.id);
                    if (!botonOriginal) return;
                    botonOriginal.className = 'abm-estandar-btn secundario ' + configuracion.clase;
                    accionesCuentas.insertBefore(botonOriginal, botonFiltrosCobros);
                });
            }
        }

        var modal = document.createElement('div');
        modal.className = 'abm-estandar-modal abm-auxiliar-modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = '<div class="abm-estandar-modal-overlay"></div><section class="abm-estandar-modal-box" role="dialog" aria-modal="true"><header><h3></h3><button type="button" class="abm-estandar-cerrar" aria-label="Cerrar filtros">&times;</button></header><div class="abm-estandar-modal-body"></div><footer><button type="button" class="abm-estandar-btn secundario" data-accion="limpiar">Limpiar</button><button type="button" class="abm-estandar-btn primario" data-accion="aplicar">Aplicar filtros</button></footer></section>';
        modal.querySelector('h3').textContent = 'Filtros de ' + titulo;
        var cuerpoModal = modal.querySelector('.abm-estandar-modal-body');
        opcionesFiltroPrimero(campos).forEach(function (campo) {
            var indice = campos.indexOf(campo);
            campo.dataset.abmEtiqueta = etiquetas[indice];
            transferirControlContenedor(campo);
            var grupo = document.createElement('div');
            grupo.className = 'abm-estandar-filtro-grupo';
            if (/^(checkbox|radio)$/.test(campo.type || '')) {
                grupo.classList.add('abm-estandar-filtro-opcion');
                var etiquetaOpcion = document.createElement('label');
                var textoOpcion = document.createElement('span');
                textoOpcion.textContent = etiquetas[indice];
                etiquetaOpcion.appendChild(campo);
                etiquetaOpcion.appendChild(textoOpcion);
                grupo.appendChild(etiquetaOpcion);
            } else {
                var label = document.createElement('label');
                label.setAttribute('for', campo.id);
                label.textContent = etiquetas[indice];
                grupo.appendChild(label);
                grupo.appendChild(campo);
            }
            cuerpoModal.appendChild(grupo);
        });
        tablaFiltro.classList.add('abm-estandar-origen-filtro-oculto');
        if (esCuentasCobrar) {
            if (tablaFechasCuentas) tablaFechasCuentas.classList.add('abm-estandar-origen-filtro-oculto');
            if (tablaOpcionesCuentas) tablaOpcionesCuentas.classList.add('abm-estandar-origen-filtro-oculto');
            [1, 2, 3, 4].forEach(function (numeroFiltro) {
                var opcionFecha = document.getElementById('checkfiltrosCuentasACobrar' + numeroFiltro);
                if (!opcionFecha) return;
                opcionFecha.addEventListener('change', function () {
                    if (typeof global.checkfiltrosCuentasACobrar === 'function') {
                        global.checkfiltrosCuentasACobrar(String(numeroFiltro));
                    }
                });
            });
        }
        if (esCobrosRealizados) {
            if (filtrosCobrosRealizados) filtrosCobrosRealizados.classList.add('abm-estandar-origen-filtro-oculto');
            if (tablaOpcionesCobrosRealizados) tablaOpcionesCobrosRealizados.classList.add('abm-estandar-origen-filtro-oculto');
            [1, 2].forEach(function (numeroFiltroCobro) {
                var opcionPeriodoCobro = document.getElementById('checkfiltrosCobrosRealizados' + numeroFiltroCobro);
                if (!opcionPeriodoCobro) return;
                opcionPeriodoCobro.addEventListener('change', function () {
                    if (typeof global.checkfiltrosCobrosRealizados === 'function') {
                        global.checkfiltrosCobrosRealizados(String(numeroFiltroCobro));
                    }
                });
            });
        }
        if (esCuentasCobrar || esCobrosRealizados) {
            document.body.appendChild(modal);
        } else {
            (ambito || document.body).appendChild(modal);
        }

        var menuColumnas = barra.querySelector('.abm-estandar-menu-columnas');
        var botonColumnasAuxiliar = barra.querySelector('[data-accion="columnas"]');
        menuColumnas.id = 'panelColumnasAuxiliar_' + indiceAuxiliar;
        botonColumnasAuxiliar.setAttribute('aria-controls', menuColumnas.id);
        var claveColumnas = 'columnasAuxiliares_' + ((ambito && ambito.id) || tablaCabecera.id || indiceAuxiliar);
        var visibles = {};
        try { visibles = JSON.parse(localStorage.getItem(claveColumnas) || '{}'); } catch (e) { visibles = {}; }
        columnas.forEach(function (columna, indice) {
            if (typeof visibles[indice] === 'undefined') visibles[indice] = !columna.hidden && columna.style.display !== 'none';
            columna.classList.add('abm-estandar-ordenable');
            columna.setAttribute('tabindex', '0');
            columna.setAttribute('title', 'Ordenar por ' + (texto(columna) || ('columna ' + (indice + 1))));
            var opcion = document.createElement('label');
            var check = document.createElement('input');
            check.type = 'checkbox';
            check.checked = visibles[indice] !== false;
            check.dataset.columna = indice;
            opcion.appendChild(check);
            opcion.appendChild(document.createTextNode(texto(columna) || ('Columna ' + (indice + 1))));
            menuColumnas.appendChild(opcion);
        });

        function filasResultado() {
            return obtenerFilas(cuerpoResultados);
        }

        function celdasFila(fila) {
            var tr = fila.tagName === 'TR' ? fila : fila.querySelector('tr');
            if (!tr) return [];
            return lista(tr.children).filter(function (celda) {
                if (!/^(TD|TH)$/.test(celda.tagName)) return false;
                if (celda.dataset.abmColumnaPreparada !== '1') {
                    celda.dataset.abmColumnaPreparada = '1';
                    if (celda.hidden || celda.style.display === 'none') {
                        celda.dataset.abmCeldaTecnica = '1';
                    }
                }
                if (celda.dataset.abmCeldaTecnica === '1') {
                    celda.style.display = 'none';
                    return false;
                }
                return true;
            });
        }

        function aplicarColumnasAuxiliares() {
            columnas.forEach(function (columna, indice) { columna.style.display = visibles[indice] === false ? 'none' : ''; });
            filasResultado().forEach(function (fila) {
                celdasFila(fila).slice(0, columnas.length).forEach(function (celda, indice) {
                    celda.style.display = visibles[indice] === false ? 'none' : '';
                });
            });
        }

        var ordenAuxiliar = { columna: -1, direccion: 1 };
        function ordenarAuxiliar(indice) {
            var filas = filasResultado();
            if (!filas.length || !cuerpoResultados) return;
            var destinoOrden = filas[0].tagName === 'TABLE' ? cuerpoResultados : filas[0].parentNode;
            ordenAuxiliar.direccion = ordenAuxiliar.columna === indice ? ordenAuxiliar.direccion * -1 : 1;
            ordenAuxiliar.columna = indice;
            filas.sort(function (a, b) {
                var valorA = texto(celdasFila(a)[indice]);
                var valorB = texto(celdasFila(b)[indice]);
                return compararTexto(valorA, valorB, ordenAuxiliar.direccion);
            });
            filas.forEach(function (fila) { destinoOrden.appendChild(fila); });
            columnas.forEach(function (columna, posicion) {
                var indicador = columna.querySelector('.abm-estandar-indicador');
                if (indicador) indicador.parentNode.removeChild(indicador);
                if (posicion === indice) {
                    indicador = document.createElement('span');
                    indicador.className = 'abm-estandar-indicador';
                    indicador.textContent = ordenAuxiliar.direccion === 1 ? '▲' : '▼';
                    columna.appendChild(indicador);
                }
            });
        }

        columnas.forEach(function (columna, indice) {
            columna.addEventListener('click', function () { ordenarAuxiliar(indice); });
            columna.addEventListener('keydown', function (evento) {
                if (evento.key === 'Enter' || evento.key === ' ') { evento.preventDefault(); ordenarAuxiliar(indice); }
            });
        });
        menuColumnas.addEventListener('change', function (evento) {
            if (!evento.target.matches('input[data-columna]')) return;
            visibles[evento.target.dataset.columna] = evento.target.checked;
            localStorage.setItem(claveColumnas, JSON.stringify(visibles));
            aplicarColumnasAuxiliares();
        });

        function actualizarChipsAuxiliares() {
            chips.innerHTML = '';
            var busquedaGeneralActiva = (esVistaCliente || esCuentasCobrar || esAgenda || esMovimientoStock) ? String(buscador.value || '').trim() : '';
            var activos = campos.filter(function (campo) {
                if (/^(checkbox|radio)$/.test(campo.type || '')) return campo.checked;
                return String(campo.value || '').trim() !== '';
            });
            if (!activos.length && !busquedaGeneralActiva) {
                chips.innerHTML = '<span class="abm-estandar-chip vacio">Sin filtros aplicados</span>';
                return;
            }
            if (busquedaGeneralActiva) {
                var chipBusquedaGeneral = document.createElement('span');
                chipBusquedaGeneral.className = 'abm-estandar-chip';
                chipBusquedaGeneral.textContent = (esAgenda ? 'Cliente o documento' : 'Busqueda') + ': ' + busquedaGeneralActiva;
                chips.appendChild(chipBusquedaGeneral);
            }
            activos.forEach(function (campo) {
                var valor = campo.options && campo.selectedIndex >= 0 ? campo.options[campo.selectedIndex].text : (/^(checkbox|radio)$/.test(campo.type || '') ? 'Si' : campo.value);
                var chip = document.createElement('span');
                chip.className = 'abm-estandar-chip';
                chip.textContent = (campo.dataset.abmEtiqueta || campo.id) + ': ' + valor;
                chips.appendChild(chip);
            });
        }

        function buscar() {
            if (esVistaCliente || esCuentasCobrar || esAgenda || esMovimientoStock) actualizarChipsAuxiliares();
            if (esMovimientoStock) global.busquedaGeneralMovimientoStock = String(buscador.value || '').trim();
            if (funcion && typeof global[funcion] === 'function') global[funcion]();
            else ejecutarBusqueda('', principal);
        }
        function abrir(valor) {
            modal.classList.toggle('activo', valor);
            modal.setAttribute('aria-hidden', valor ? 'false' : 'true');
            document.body.classList.toggle('abm-modal-abierto', valor);
        }
        function limpiar() {
            campos.forEach(restaurarEstadoInicial);
			if (esVistaCliente || esCuentasCobrar || esAgenda || esMovimientoStock) buscador.value = '';
			else if (principal) buscador.value = principal.value || '';
            if (esMovimientoStock) global.busquedaGeneralMovimientoStock = '';
            actualizarChipsAuxiliares();
        }
        if (principal) {
			if (!esVistaCliente && !esCuentasCobrar && !esAgenda && !esMovimientoStock) buscador.value = principal.value || '';
			buscador.addEventListener('input', function () {
				if (!esVistaCliente && !esCuentasCobrar && !esAgenda && !esMovimientoStock) principal.value = buscador.value;
			});
            buscador.addEventListener('keydown', function (evento) { if (evento.key === 'Enter') buscar(); });
        }
        barra.addEventListener('click', function (evento) {
            var accion = evento.target.getAttribute('data-accion');
            if (accion === 'buscar') buscar();
            if (accion === 'filtros') abrir(true);
            if (accion === 'limpiar') limpiar();
            if (accion === 'columnas') {
                var abierto = menuColumnas.classList.toggle('activo');
                evento.target.setAttribute('aria-expanded', abierto ? 'true' : 'false');
            }
        });
        modal.addEventListener('click', function (evento) {
            var accion = evento.target.getAttribute('data-accion');
            if (evento.target.classList.contains('abm-estandar-modal-overlay') || evento.target.classList.contains('abm-estandar-cerrar')) abrir(false);
            if (accion === 'limpiar') limpiar();
            if (accion === 'aplicar') { actualizarChipsAuxiliares(); abrir(false); buscar(); }
        });
        if (cuerpoResultados) new MutationObserver(aplicarColumnasAuxiliares).observe(cuerpoResultados, { childList: true, subtree: true });
        actualizarChipsAuxiliares();
        aplicarColumnasAuxiliares();
    }

    function normalizarFiltrosAuxiliares() {
        lista(document.querySelectorAll('table.tableCabeceraRegistro + table.tableCabeceraRegistro')).forEach(normalizarFiltroAuxiliar);
    }

    function iniciar() {
        registrarCierreExternoColumnas();
        [
            'obtenerListadoAbmLiquidez',
            'obtenerListadoAbmPatrimonioEmpresa',
            'obtenerListadoAbmGastosFijosEmpresa',
            'obtenerListadoAbmAgendaPersonal',
            'obtenerListadoAbmCargaArchivoGeneral',
            'obtenerListadoAbmDescripcionTipoAgendaPersonal',
            'obtenerListadoAbmDescripcionBancoLiquidez',
            'obtenerListadoAbmDescripcionTipoMovimiento',
            'obtenerListadoAbmDescripcionCargaArchivoGeneral',
            'iniciarListadosCalificacionCobrador',
            'iniciarListadosCalificacionVendedor',
            'iniciarListadosSecundariosVehiculos',
            'iniciarListadoInformeMantenimientoVehiculos',
            'iniciarListadoVistaProveedor',
            'iniciarListadoVistaZona',
            'iniciarListadosAuxiliaresCobrador',
            'iniciarListadoVistaVendedor',
            'iniciarListadoArchivosFuncionario',
            'inicializarListadoHistorialVentas',
            'iniciarListadosOrdenesWeb',
            'iniciarListadoInformeCajaCobrador',
            'iniciarListadosControlCobrador'
        ].forEach(function (nombre) {
            if (typeof global[nombre] === 'function') global[nombre]();
        });
        marcarFormularioPropio('divAbmCliente1', {
            'abm-estandar-header': '.catalogo-header',
            'abm-estandar-toolbar': '.catalogo-toolbar',
            'abm-estandar-chips': '.catalogo-filtros-activos',
            'abm-estandar-tabla-cuerpo': '.clientes-table-body',
            'abm-estandar-footer': '.clientes-footer-moderno'
        });
        marcarFormularioPropio('divAbmProducto1', {
            'abm-estandar-header': '.productos-header',
            'abm-estandar-toolbar': '.productos-toolbar',
            'abm-estandar-chips': '.productos-chips',
            'abm-estandar-tabla-cuerpo': '#table_abm_producto',
            'abm-estandar-footer': '.productos-footer'
        });
        normalizarMetas();
        normalizarResumenCobrador();
        normalizarMetasVendedores();
        lista(document.querySelectorAll('[id^="divAbm"][id$="1"]')).forEach(normalizar);
        normalizarInformes();
        normalizarFiltrosAuxiliares();
        if (!document.body.dataset.abmModalEventos) {
            document.body.dataset.abmModalEventos = '1';
            document.addEventListener('keydown', function (evento) {
                var activo = document.querySelector('.abm-estandar-modal.activo, #modalFiltrosCliente.activo, .productos-modal.activo');
                if (!activo) return;
                if (evento.key === 'Escape') {
                    var cerrar = activo.querySelector('.abm-estandar-cerrar, .btn-cerrar-modal, header button');
                    if (cerrar) cerrar.click();
                }
                if (evento.key === 'Tab') {
                    var focos = lista(activo.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(function (elemento) { return elemento.offsetParent !== null; });
                    if (!focos.length) return;
                    var primero = focos[0];
                    var ultimo = focos[focos.length - 1];
                    if (evento.shiftKey && document.activeElement === primero) { evento.preventDefault(); ultimo.focus(); }
                    else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primero.focus(); }
                }
            });
            var actualizarBloqueo = function () {
                var hayModal = !!document.querySelector('.abm-estandar-modal.activo, #modalFiltrosCliente.activo, .productos-modal.activo');
                document.body.classList.toggle('abm-modal-abierto', hayModal);
            };
            lista(document.querySelectorAll('.abm-estandar-modal, #modalFiltrosCliente, .productos-modal')).forEach(function (modalFiltro) {
                var caja = modalFiltro.querySelector('.abm-estandar-modal-box, .modal-filtros-box, .productos-modal-box');
                if (caja) { caja.setAttribute('role', 'dialog'); caja.setAttribute('aria-modal', 'true'); }
                modalFiltro.setAttribute('aria-hidden', modalFiltro.classList.contains('activo') ? 'false' : 'true');
                new MutationObserver(function () {
                    var abierto = modalFiltro.classList.contains('activo');
                    modalFiltro.setAttribute('aria-hidden', abierto ? 'false' : 'true');
                    actualizarBloqueo();
                    if (abierto) {
                        var campo = modalFiltro.querySelector('.abm-estandar-modal-body input, .modal-filtros-body input, .productos-modal-body input, .abm-estandar-modal-body select, .modal-filtros-body select, .productos-modal-body select');
                        if (campo) setTimeout(function () { campo.focus(); }, 0);
                    }
                }).observe(modalFiltro, { attributes: true, attributeFilter: ['class'] });
            });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
    global.inicializarAbmEstandar = iniciar;
}(window));
