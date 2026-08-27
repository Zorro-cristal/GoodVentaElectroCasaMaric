(function () {
    'use strict';

    var registrosListadoClientes = [];
    var ordenListadoClientes = {campo: 'nombre_completo', direccion: 1};
    var columnasListadoClientes = [
        {campo:'cod_persona', titulo:'#', ancho:'5%'}, {campo:'ci_cliente', titulo:'NRO DOC.', ancho:'10%'},
        {campo:'nombre_completo', titulo:'CLIENTE', ancho:'16%'}, {campo:'zona', titulo:'ZONA', ancho:'9%'},
        {campo:'telefono', titulo:'TELEF.', ancho:'9%'}, {campo:'accesocredito', titulo:'CREDITO', ancho:'8%'},
        {campo:'tipoMora', titulo:'CALIFICACION', ancho:'8%'}, {campo:'tipo_cliente', titulo:'TIPO', ancho:'7%'},
        {campo:'tipo_persona_equifax', titulo:'PERS. EQUIFAX', ancho:'9%'}, {campo:'profesion', titulo:'PROFESION', ancho:'11%'},
        {campo:'faja', titulo:'CAT.', ancho:'8%'}
    ];
    var columnasVisiblesClientes = {};

    function valorCliente(id) {
        var elemento = document.getElementById(id);
        return elemento ? elemento.value : '';
    }

    function estadoClienteListado() {
        var activo = document.getElementById('inptSeleccEstadoBuscarCliente1');
        return activo && activo.checked ? 'Activo' : 'Inactivo';
    }

    function datosFiltrosCliente(registroCargado) {
        obtener_datos_user();
        var datos = {
            useru: userid,
            passu: passuser,
            navegador: navegador,
            codigo: valorCliente('inptBuscarAbmCliente1'),
            documento: valorCliente('inptBuscarAbmCliente2'),
            cliente: valorCliente('inptBuscarAbmCliente3'),
            zona: valorCliente('inptBuscarAbmCliente4'),
            estado: estadoClienteListado(),
            calificacion: valorCliente('inptBuscarAbmCliente6'),
            accesocredito: valorCliente('inptBuscarAbmCliente5'),
            tipo_cliente: valorCliente('inptBuscarAbmCliente7'),
            tipo_persona_equifax: valorCliente('inptBuscarTipoPersonaEquifaxCliente'),
            faja: valorCliente('inptBuscarAbmCliente8'),
            profesion: valorCliente('inptBuscarAbmCliente9')
        };
        datos.formato = 'json';
        if (typeof registroCargado !== 'undefined') {
            datos.registrocargado = registroCargado;
        }
        return datos;
    }

    function renderizarListadoClientes() {
        var contenedor = document.getElementById('divAbmCliente1');
        if (!contenedor || contenedor.getAttribute('data-listado-electroguai') === 'SI') return;

        contenedor.className = 'catalogo-ventana divAbms clientes-container';
        contenedor.removeAttribute('style');
        contenedor.setAttribute('data-listado-electroguai', 'SI');
        contenedor.innerHTML = [
            '<div class="catalogo-header clientes-header">',
              '<div class="catalogo-header-left"><p class="pTituloB titulo-abm-cliente">Buscar <b>Cliente</b></p></div>',
              '<div class="catalogo-header-right">',
                '<button type="button" class="btn-icon" title="Nuevo cliente" onclick="verCerrarVentanaAbmCliente(\'1\',\'1\')"><img src="/GoodVentaElectroCasaMaric/iconos/add.png" alt="Nuevo"></button>',
                '<button type="button" class="btn-icon" title="Filtros" onclick="abrirPopupFiltrosCliente()"><img src="/GoodVentaElectroCasaMaric/iconos/etiquetafiltrar.png" alt="Filtros"></button>',
                '<button type="button" class="btn-icon" title="Imprimir listado" onclick="ordenimpresion(\'ListaCliente\')"><img src="/GoodVentaElectroCasaMaric/iconos/imprimir.png" alt="Imprimir"></button>',
                '<button type="button" class="btn-icon" title="Minimizar ventana" onclick="minimizarabmcliente()"><img src="/GoodVentaElectroCasaMaric/iconos/minimizar2.png" alt="Minimizar"></button>',
                '<button type="button" class="btn-icon btn-icon-close" title="Cerrar ventana" onclick="verCerrarAbmClientes()"><img src="/GoodVentaElectroCasaMaric/iconos/botonCerrar.png" alt="Cerrar"></button>',
              '</div>',
            '</div>',
            '<div class="catalogo-toolbar clientes-toolbar">',
              '<div class="catalogo-toolbar-left"><div class="catalogo-buscador">',
                '<input type="text" id="inptBuscarAbmCliente3" class="catalogo-selectBuscador clientes-buscador-input" placeholder="Buscar cliente por nombre, CI o codigo..." onkeyup="if(event.keyCode===13){buscarabmCliente()}">',
                '<button type="button" class="btn-catalogo btn-buscar" onclick="buscarabmCliente()">Buscar</button>',
              '</div></div>',
              '<div class="catalogo-toolbar-right">',
                '<button type="button" id="btnFiltrosCliente" class="btn-catalogo btn-secundario" onclick="abrirPopupFiltrosCliente()">Filtros</button>',
                '<button type="button" class="btn-catalogo btn-columnas selector-columnas-trigger" aria-controls="panelColumnasClientes" aria-expanded="false" onclick="abrirColumnasCliente()">Columnas</button>',
                '<button type="button" class="btn-catalogo btn-light" onclick="limpiarFiltrosCliente()">Limpiar</button>',
              '</div>',
            '</div>',
            '<div class="catalogo-filtros-activos" id="clienteFiltrosActivos"><span class="chip-filtro chip-filtro-vacio">Sin filtros aplicados</span></div>',
            '<div class="table-head-wrapper divresponsive">',
              '<table class="tableCabeceraRegistro table-catalogo-clientes clientes-table divresponsivecontenido"><tbody><tr id="cabeceraListadoClientes"></tr></tbody></table>',
              '<div class="cuerpo-tabla-Listado clientes-table-body divresponsivecontenido" id="table_abm_clientes"></div>',
            '</div>',
            '<div class="catalogo-proceso" id="tbProcessClientes" style="display:none">',
              '<div class="catalogo-progreso-wrap"><div class="catalogo-progreso-barra"><div class="catalogo-progreso-valor" id="divProgressClientes"></div></div></div>',
              '<button type="button" class="btn-catalogo btn-oscuro" onclick="cancelarCargaClientes()">Cancelar</button>',
            '</div>',
            '<div class="clientes-footer-moderno"><div class="clientes-footer-grid">',
              '<div class="clientes-footer-card clientes-footer-small"><label class="clientes-footer-label" for="inptRegistroNroClientes">Registros</label><input type="text" id="inptRegistroNroClientes" class="clientes-footer-input text-center" disabled></div>',
              '<div class="clientes-footer-card clientes-footer-large"><label class="clientes-footer-label" for="inptRegistroSeleccCliente">Registro seleccionado</label><div class="clientes-footer-actions">',
                '<input type="text" id="inptRegistroSeleccCliente" class="clientes-footer-input clientes-footer-main" disabled>',
                '<button type="button" id="btnEditarClientes" class="btn-catalogo btn-buscar" onclick="verVentanaEditarCliente(1)">Editar</button>',
                '<button type="button" id="btnAuditoriaClientes" class="btn-catalogo btn-secundario" onclick="verCerrarAuditoria(1)" style="display:none">Auditoria</button>',
                '<button type="button" id="btnUbiClientes" class="btn-catalogo btn-oscuro" onclick="ver_cerrar_Geolocalizacion(1)">Ubicacion</button>',
                '<button type="button" id="btnFotosClientes" class="btn-catalogo btn-light" onclick="abrirFotosClienteDesdeAbm()" disabled>Cargar fotos</button>',
                '<button type="button" id="btnArchivosClientes" class="btn-catalogo btn-light" onclick="abrirArchivosClienteDesdeAbm()" disabled>Cargar archivos</button>',
              '</div></div>',
            '</div></div>',
            '<div class="panel-columnas-clientes selector-columnas-panel" id="panelColumnasClientes"><div class="panel-columnas-header"><b>Columnas visibles</b><button type="button" onclick="cerrarColumnasCliente()">&times;</button></div><div id="opcionesColumnasClientes" class="panel-columnas-body"></div><div class="panel-columnas-footer"><button type="button" class="btn-catalogo btn-light" onclick="restablecerColumnasCliente()">Restablecer</button></div></div>',
            '<div class="modal-filtros-catalogo" id="modalFiltrosCliente">',
              '<div class="modal-filtros-overlay" onclick="cerrarPopupFiltrosCliente()"></div>',
              '<div class="modal-filtros-box"><div class="modal-filtros-header"><h3>Filtros de clientes</h3><button type="button" class="btn-cerrar-modal" onclick="cerrarPopupFiltrosCliente()">&times;</button></div>',
              '<div class="modal-filtros-body">',
                '<div class="filtro-grupo filtro-estado-cliente"><label>Estado</label><div><label><input type="radio" name="estadoListadoCliente" id="inptSeleccEstadoBuscarCliente1" checked> Activo</label><label><input type="radio" name="estadoListadoCliente" id="inptSeleccEstadoBuscarCliente2"> Inactivo</label></div></div>',
                '<div class="filtro-grupo"><label>Codigo</label><input class="catalogo-input" id="inptBuscarAbmCliente1" type="text" placeholder="Igual a..."></div>',
                '<div class="filtro-grupo"><label>Documento</label><input class="catalogo-input" id="inptBuscarAbmCliente2" type="text" placeholder="Igual a..."></div>',
                '<div class="filtro-grupo"><label>Zona</label><select class="catalogo-select" id="inptBuscarAbmCliente4"></select></div>',
                '<div class="filtro-grupo"><label>Credito</label><select class="catalogo-select" id="inptBuscarAbmCliente5"><option value="">TODOS</option><option value="Confirmado">Confirmado</option><option value="Denegado">Denegado</option></select></div>',
                '<div class="filtro-grupo"><label>Calificacion</label><select class="catalogo-select" id="inptBuscarAbmCliente6"></select></div>',
                '<div class="filtro-grupo"><label>Tipo</label><select class="catalogo-select" id="inptBuscarAbmCliente7"><option value="">TODOS</option><option value="FIJO">FIJO</option><option value="NO FIJO">NO FIJO</option></select></div>',
                '<div class="filtro-grupo"><label>Persona / empresa</label><select class="catalogo-select" id="inptBuscarTipoPersonaEquifaxCliente"><option value="">TODOS</option><option value="SIN_CLASIFICAR">SIN CLASIFICAR</option><option value="PERSONA">PERSONA</option><option value="EMPRESA">EMPRESA</option></select></div>',
                '<div class="filtro-grupo"><label>Profesion</label><select class="catalogo-select" id="inptBuscarAbmCliente9"></select></div>',
                '<div class="filtro-grupo"><label>Categoria</label><select class="catalogo-select" id="inptBuscarAbmCliente8"><option value="">TODAS</option><option value="CAT A">CAT A</option><option value="CAT B">CAT B</option><option value="CAT C">CAT C</option><option value="CAT D">CAT D</option><option value="CAT E">CAT E</option><option value="CAT F">CAT F</option><option value="CAT G">CAT G</option><option value="CAT H">CAT H</option><option value="CAT I">CAT I</option><option value="CAT J">CAT J</option><option value="CAT K">CAT K</option><option value="SIN REGISTRO">SIN REGISTRO</option></select></div>',
              '</div>',
              '<div class="modal-filtros-footer"><button type="button" class="btn-catalogo btn-light" onclick="limpiarFiltrosCliente(false)">Limpiar</button><button type="button" class="btn-catalogo btn-buscar" onclick="aplicarFiltrosCliente()">Aplicar filtros</button></div>',
              '</div>',
            '</div>'
        ].join('');
        cargarColumnasClientes();
        dibujarCabeceraClientes();
        restaurarFiltrosCliente();
    }

    function escaparCliente(valor) {
        return $('<div>').text(valor == null ? '' : String(valor)).html();
    }

    function claseFajaCliente(valor) {
        var faja = String(valor == null || valor === '' ? 'SIN REGISTRO' : valor).trim().toUpperCase();
        var clases = {
            'CAT A': 'cat-a', 'CAT B': 'cat-b', 'CAT C': 'cat-c', 'CAT D': 'cat-d',
            'CAT E': 'cat-e', 'CAT F': 'cat-f', 'CAT G': 'cat-g', 'CAT H': 'cat-h',
            'CAT I': 'cat-i', 'CAT J': 'cat-j', 'CAT K': 'cat-k'
        };
        return 'cliente-faja cliente-faja--' + (clases[faja] || 'sin-registro');
    }

    function cargarColumnasClientes() {
        try { columnasVisiblesClientes = JSON.parse(localStorage.getItem('columnasListadoClientes') || '{}'); } catch (e) { columnasVisiblesClientes = {}; }
        columnasListadoClientes.forEach(function (columna) {
            if (typeof columnasVisiblesClientes[columna.campo] === 'undefined') columnasVisiblesClientes[columna.campo] = true;
        });
        dibujarOpcionesColumnasClientes();
    }

    function dibujarOpcionesColumnasClientes() {
        var contenedor = document.getElementById('opcionesColumnasClientes');
        if (!contenedor) return;
        contenedor.innerHTML = columnasListadoClientes.map(function (columna) {
            return '<label><input type="checkbox" ' + (columnasVisiblesClientes[columna.campo] ? 'checked' : '') + ' onchange="cambiarColumnaCliente(\'' + columna.campo + '\',this.checked)"> ' + columna.titulo + '</label>';
        }).join('');
    }

    function actualizarEstadoPanelColumnasCliente(abierto) {
        var boton = document.querySelector('[aria-controls="panelColumnasClientes"]');
        if (boton) boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    }
    window.abrirColumnasCliente = function () {
        var panel = document.getElementById('panelColumnasClientes');
        if (!panel) return;
        var abierto = panel.classList.toggle('activo');
        actualizarEstadoPanelColumnasCliente(abierto);
    };
    window.cerrarColumnasCliente = function () {
        var panel = document.getElementById('panelColumnasClientes');
        if (!panel) return;
        panel.classList.remove('activo');
        actualizarEstadoPanelColumnasCliente(false);
    };
    window.cambiarColumnaCliente = function (campo, visible) {
        columnasVisiblesClientes[campo] = visible;
        localStorage.setItem('columnasListadoClientes', JSON.stringify(columnasVisiblesClientes));
        dibujarCabeceraClientes(); dibujarFilasClientes();
    };
    window.restablecerColumnasCliente = function () {
        columnasListadoClientes.forEach(function (columna) { columnasVisiblesClientes[columna.campo] = true; });
        localStorage.setItem('columnasListadoClientes', JSON.stringify(columnasVisiblesClientes));
        dibujarOpcionesColumnasClientes(); dibujarCabeceraClientes(); dibujarFilasClientes();
    };

    window.ordenarListadoClientes = function (campo) {
        if (ordenListadoClientes.campo === campo) ordenListadoClientes.direccion *= -1;
        else ordenListadoClientes = {campo: campo, direccion: 1};
        dibujarCabeceraClientes(); dibujarFilasClientes();
    };

    function dibujarCabeceraClientes() {
        var cabecera = document.getElementById('cabeceraListadoClientes');
        if (!cabecera) return;
        cabecera.innerHTML = columnasListadoClientes.filter(function (columna) { return columnasVisiblesClientes[columna.campo]; }).map(function (columna) {
            var indicador = ordenListadoClientes.campo === columna.campo ? (ordenListadoClientes.direccion === 1 ? ' &#9650;' : ' &#9660;') : '';
            return '<td class="td_registro columna-ordenable" style="width:' + columna.ancho + '" onclick="ordenarListadoClientes(\'' + columna.campo + '\')">' + columna.titulo + '<span>' + indicador + '</span></td>';
        }).join('');
    }

    function datosOcultosFilaCliente(registro) {
        var datos = {
            td_id:'cod_persona',td_datos_13:'ci_cliente',td_datos_2:'rut_cliente',td_datos_1:'nombre_persona',td_datos_109:'apellido_persona',
            td_datos_10:'zona',td_datos_4:'telefono',td_datos_21:'accesocredito',td_datos_22:'tipoMora',td_datos_23:'tipo_cliente',
            td_datos_111:'tipo_persona_equifax',td_datos_24:'cod_profesion',td_datos_112:'tipo_empleado',td_datos_113:'cargo',
            td_datos_6:'cod_tipomora',td_datos_3:'direccion',td_datos_5:'email',td_datos_7:'whapp',td_datos_8:'estado',
            td_datos_9:'idzonaFk',td_datos_11:'foto1',td_datos_12:'foto2',td_datos_15:'lugardetrabajo',td_datos_16:'salario',
            td_datos_17:'antiguedad',td_datos_18:'teleftrab1',td_datos_19:'teleftrab2',td_datos_20:'direcciontrab',
            td_datos_100:'insertadopor',td_datos_101:'editadopor',td_datos_102:'fecha_insert',td_datos_103:'fecha_edit',
            td_datos_104:'sms',td_datos_105:'fechanac',td_datos_106:'nombremadre',td_datos_107:'nombrepadre',
            td_datos_108:'tipo_vivienda',td_datos_110:'informacion_extra'
        };
        var html = '';
        Object.keys(datos).forEach(function (id) { html += '<td id="' + id + '" style="display:none">' + escaparCliente(registro[datos[id]]) + '</td>'; });
        return html;
    }

    function dibujarFilasClientes() {
        var cuerpo = document.getElementById('table_abm_clientes');
        if (!cuerpo) return;
        var filas = registrosListadoClientes.slice().sort(function (a, b) {
            var av = String(a[ordenListadoClientes.campo] == null ? '' : a[ordenListadoClientes.campo]).toLocaleUpperCase();
            var bv = String(b[ordenListadoClientes.campo] == null ? '' : b[ordenListadoClientes.campo]).toLocaleUpperCase();
            return av.localeCompare(bv, 'es', {numeric:true}) * ordenListadoClientes.direccion;
        });
        cuerpo.innerHTML = filas.map(function (registro) {
            var visibles = columnasListadoClientes.filter(function (columna) { return columnasVisiblesClientes[columna.campo]; }).map(function (columna) {
                var valorOriginal = registro[columna.campo];
                var valor = escaparCliente(valorOriginal);
                if (columna.campo === 'faja') {
                    valor = valor || 'SIN REGISTRO';
                    valor = '<span class="' + claseFajaCliente(valorOriginal) + '">' + valor + '</span>';
                }
                return '<td data-columna="' + columna.campo + '" style="width:' + columna.ancho + '">' + valor + '</td>';
            }).join('');
            return '<table class="tableRegistroSearch listado-cliente-fila"><tr id="tbSelecRegistro" onclick="obtenerdatosabmCliente(this)">' + visibles + datosOcultosFilaCliente(registro) + '</tr></table>';
        }).join('');
    }

    window.buscarabmCliente = function () {
        if (controlacceso('BUSCARLISTADODECLIENTES', 'accion') === false) return;
        if (controldebusquedadClientes === true) {
            ver_vetana_informativa('CANCELE LA BUSQUEDA ACTUAL PARA CONTINUAR');
            return;
        }
        controldebusquedadClientes = true;
        document.getElementById('table_abm_clientes').innerHTML = paginacargando;
        document.getElementById('tbProcessClientes').style.display = 'none';
        var datos = datosFiltrosCliente();
        datos.funt = 'buscar';
        $.ajax({
            data: datos,
            url: '/GoodVentaElectroCasaMaric/php_system/abmclientes.php',
            type: 'post',
            error: function (xhr, estado, error) {
                manejadordeerroresjquery(xhr.status, estado, 'abmventana');
                document.getElementById('table_abm_clientes').innerHTML = '';
                controldebusquedadClientes = false;
            },
            success: function (respuesta) {
                document.getElementById('table_abm_clientes').innerHTML = '';
                try {
                    var resultado = $.parseJSON(respuesta);
                    if (respuestaJqueryAjax(resultado['1']) === true) {
                        registrosListadoClientes = Array.isArray(resultado[2]) ? resultado[2] : [];
                        dibujarFilasClientes();
                        document.getElementById('inptRegistroNroClientes').value = resultado[3];
                        registrocargadoclientes = Number(resultado[99]);
                        totalregistroclientes = Number(resultado[100]);
                        if (totalregistroclientes > registrocargadoclientes) {
                            document.getElementById('divProgressClientes').style.width = ((registrocargadoclientes * 100) / totalregistroclientes).toFixed(0) + '%';
                            document.getElementById('table_abm_clientes').insertAdjacentHTML('beforeend', '<div id="table_abm_mas_clientes"></div>');
                            buscarabmMasCliente();
                        } else {
                            controldebusquedadClientes = false;
                        }
                    }
                } catch (e) {
                    controldebusquedadClientes = false;
                    ver_vetana_informativa('LO SENTIMOS HA OCURRIDO UN ERROR');
                    GuardarArchivosLog('Error: ' + e + ' \r\n Consola: ' + respuesta);
                }
            }
        });
    };

    window.buscarabmMasCliente = function (forzar) {
        if (controlacceso('BUSCARLISTADODECLIENTES', 'accion') === false) return;
        if (forzar === '1') controldebusquedadClientes = true;
        if (controldebusquedadClientes === false) return;
        var destino = document.getElementById('table_abm_mas_clientes');
        if (!destino) return;
        destino.innerHTML = paginacargando;
        document.getElementById('tbProcessClientes').style.display = '';
        var datos = datosFiltrosCliente(registrocargadoclientes);
        datos.funt = 'buscarmas';
        $.ajax({
            data: datos,
            url: '/GoodVentaElectroCasaMaric/php_system/abmclientes.php',
            type: 'post',
            error: function (xhr, estado) {
                manejadordeerroresjquery(xhr.status, estado, 'abmventana');
                destino.innerHTML = '';
                controldebusquedadClientes = false;
            },
            success: function (respuesta) {
                destino.innerHTML = '';
                try {
                    var resultado = $.parseJSON(respuesta);
                    if (respuestaJqueryAjax(resultado['1']) === true) {
                        registrosListadoClientes = registrosListadoClientes.concat(Array.isArray(resultado[2]) ? resultado[2] : []);
                        dibujarFilasClientes();
                        document.getElementById('inptRegistroNroClientes').value = resultado[3];
                        registrocargadoclientes = Number(resultado[99]);
                        if (totalregistroclientes > registrocargadoclientes) {
                            document.getElementById('divProgressClientes').style.width = ((registrocargadoclientes * 100) / totalregistroclientes).toFixed(0) + '%';
                            document.getElementById('table_abm_clientes').insertAdjacentHTML('beforeend', '<div id="table_abm_mas_clientes"></div>');
                            buscarabmMasCliente();
                        } else {
                            document.getElementById('tbProcessClientes').style.display = 'none';
                            controldebusquedadClientes = false;
                        }
                    }
                } catch (e) {
                    controldebusquedadClientes = false;
                    ver_vetana_informativa('LO SENTIMOS HA OCURRIDO UN ERROR');
                    GuardarArchivosLog('Error: ' + e + ' \r\n Consola: ' + respuesta);
                }
            }
        });
    };

    window.abrirPopupFiltrosCliente = function () { document.getElementById('modalFiltrosCliente').classList.add('activo'); };
    window.cerrarPopupFiltrosCliente = function () { document.getElementById('modalFiltrosCliente').classList.remove('activo'); };
    window.aplicarFiltrosCliente = function () { actualizarResumenFiltrosCliente(); guardarFiltrosCliente(); cerrarPopupFiltrosCliente(); buscarabmCliente(); };

    window.limpiarFiltrosCliente = function (buscar) {
        ['inptBuscarAbmCliente1','inptBuscarAbmCliente2','inptBuscarAbmCliente3','inptBuscarAbmCliente4','inptBuscarAbmCliente5','inptBuscarAbmCliente6','inptBuscarAbmCliente7','inptBuscarTipoPersonaEquifaxCliente','inptBuscarAbmCliente8','inptBuscarAbmCliente9'].forEach(function (id) {
            var campo = document.getElementById(id); if (campo) campo.value = '';
        });
        document.getElementById('inptSeleccEstadoBuscarCliente1').checked = true;
        document.getElementById('inptSeleccEstadoBuscarCliente2').checked = false;
        actualizarResumenFiltrosCliente();
        guardarFiltrosCliente();
        if (buscar !== false) buscarabmCliente();
    };

    window.quitarFiltroCliente = function (id) {
        var campo = document.getElementById(id); if (campo) campo.value = '';
        actualizarResumenFiltrosCliente(); guardarFiltrosCliente(); buscarabmCliente();
    };

    window.actualizarResumenFiltrosCliente = function () {
        var contenedor = document.getElementById('clienteFiltrosActivos');
        if (!contenedor) return;
        var filtros = [
            ['inptBuscarAbmCliente1','Codigo'],['inptBuscarAbmCliente2','Documento'],['inptBuscarAbmCliente4','Zona'],
            ['inptBuscarAbmCliente5','Credito'],['inptBuscarAbmCliente6','Calificacion'],['inptBuscarAbmCliente7','Tipo'],
            ['inptBuscarTipoPersonaEquifaxCliente','Persona'],['inptBuscarAbmCliente9','Profesion'],['inptBuscarAbmCliente8','Categoria']
        ];
        var html = [], total = 0;
        filtros.forEach(function (filtro) {
            var campo = document.getElementById(filtro[0]);
            if (campo && campo.value !== '') {
                var texto = campo.tagName === 'SELECT' && campo.selectedIndex >= 0 ? campo.options[campo.selectedIndex].text : campo.value;
                html.push('<span class="chip-filtro">' + filtro[1] + ': ' + $('<div>').text(texto).html() + ' <button type="button" class="chip-close" onclick="quitarFiltroCliente(\'' + filtro[0] + '\')">&times;</button></span>');
                total++;
            }
        });
        contenedor.innerHTML = html.length ? html.join('') : '<span class="chip-filtro chip-filtro-vacio">Sin filtros aplicados</span>';
        document.getElementById('btnFiltrosCliente').innerHTML = total ? 'Filtros (' + total + ')' : 'Filtros';
    };

    window.guardarFiltrosCliente = function () {
        var datos = datosFiltrosCliente();
        delete datos.useru; delete datos.passu; delete datos.navegador;
        localStorage.setItem('filtrosClienteListado', JSON.stringify(datos));
    };

    window.restaurarFiltrosCliente = function () {
        try {
            var datos = JSON.parse(localStorage.getItem('filtrosClienteListado') || '{}');
            var mapa = {codigo:'inptBuscarAbmCliente1',documento:'inptBuscarAbmCliente2',cliente:'inptBuscarAbmCliente3',zona:'inptBuscarAbmCliente4',accesocredito:'inptBuscarAbmCliente5',calificacion:'inptBuscarAbmCliente6',tipo_cliente:'inptBuscarAbmCliente7',tipo_persona_equifax:'inptBuscarTipoPersonaEquifaxCliente',faja:'inptBuscarAbmCliente8',profesion:'inptBuscarAbmCliente9'};
            Object.keys(mapa).forEach(function (clave) { var campo = document.getElementById(mapa[clave]); if (campo && typeof datos[clave] !== 'undefined') campo.value = datos[clave]; });
            if (datos.estado === 'Inactivo') { document.getElementById('inptSeleccEstadoBuscarCliente1').checked = false; document.getElementById('inptSeleccEstadoBuscarCliente2').checked = true; }
        } catch (e) { localStorage.removeItem('filtrosClienteListado'); }
        actualizarResumenFiltrosCliente();
    };

    window.limpiarcamposbucarabmcliente = function () {
        if (controldebusquedadClientes === true) return;
        limpiarFiltrosCliente(false);
        document.getElementById('table_abm_clientes').innerHTML = '';
        document.getElementById('inptRegistroNroClientes').value = '';
        document.getElementById('tbProcessClientes').style.display = 'none';
    };

    document.addEventListener('DOMContentLoaded', renderizarListadoClientes);
    document.addEventListener('keydown', function (evento) { if (evento.key === 'Escape') cerrarPopupFiltrosCliente(); });
}());
