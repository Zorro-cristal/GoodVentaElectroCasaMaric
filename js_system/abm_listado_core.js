(function (global) {
    'use strict';

    function escapar(valor) {
        var div = document.createElement('div');
        div.textContent = valor == null ? '' : String(valor);
        return div.innerHTML;
    }

    function obtenerValor(id) {
        var campo = document.getElementById(id);
        return campo ? campo.value : '';
    }

    function limpiarNodo(nodo) {
        while (nodo && nodo.firstChild) nodo.removeChild(nodo.firstChild);
    }

    function claveOrdenable(valor) {
        if (typeof valor === 'number' && isFinite(valor)) return { vacio: false, tipo: 'numero', valor: valor };
        var texto = String(valor == null ? '' : valor).replace(/\s+/g, ' ').trim();
        if (texto === '') return { vacio: true, tipo: 'texto', valor: '' };

        var fecha = texto.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})(?:\s|$)/);
        if (fecha) {
            return { vacio: false, tipo: 'fecha', valor: Date.UTC(Number(fecha[3]), Number(fecha[2]) - 1, Number(fecha[1])) };
        }
        fecha = texto.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})(?:\s|$)/);
        if (fecha) {
            return { vacio: false, tipo: 'fecha', valor: Date.UTC(Number(fecha[1]), Number(fecha[2]) - 1, Number(fecha[3])) };
        }

        var numero = texto.replace(/\u00a0/g, '').replace(/\s/g, '').replace(/^(?:Gs\.?|₲|\$)/i, '').replace(/%$/, '');
        var negativo = /^\(.*\)$/.test(numero);
        if (negativo) numero = numero.slice(1, -1);
        if (/^[+-]?\d{1,3}(?:\.\d{3})*(?:,\d+)?$/.test(numero) || /^[+-]?\d+(?:,\d+)?$/.test(numero)) {
            numero = Number(numero.replace(/\./g, '').replace(',', '.')) * (negativo ? -1 : 1);
            if (!isNaN(numero)) return { vacio: false, tipo: 'numero', valor: numero };
        }
        return { vacio: false, tipo: 'texto', valor: texto };
    }

    function compararValores(valorA, valorB, direccion) {
        var claveA = claveOrdenable(valorA);
        var claveB = claveOrdenable(valorB);
        if (claveA.vacio || claveB.vacio) {
            if (claveA.vacio && claveB.vacio) return 0;
            return claveA.vacio ? 1 : -1;
        }
        if (claveA.tipo === claveB.tipo && claveA.tipo !== 'texto') {
            return (claveA.valor - claveB.valor) * direccion;
        }
        return String(claveA.valor).localeCompare(String(claveB.valor), 'es', { numeric: true, sensitivity: 'base' }) * direccion;
    }

    function aplicarAtributos(elemento, atributos) {
        Object.keys(atributos || {}).forEach(function (nombre) {
            var valor = atributos[nombre];
            if (valor === false || valor == null) return;
            if (nombre === 'className') elemento.className = String(valor);
            else if (nombre === 'textContent') elemento.textContent = String(valor);
            else if (nombre === 'dataset') {
                Object.keys(valor || {}).forEach(function (clave) { elemento.dataset[clave] = String(valor[clave]); });
            } else if (nombre === 'style' && typeof valor === 'object') {
                Object.keys(valor).forEach(function (propiedad) { elemento.style[propiedad] = valor[propiedad]; });
            } else elemento.setAttribute(nombre, String(valor));
        });
        return elemento;
    }

    function crearElemento(etiqueta, atributos, contenido) {
        var elemento = aplicarAtributos(document.createElement(etiqueta), atributos);
        if (contenido instanceof Node) elemento.appendChild(contenido);
        else if (contenido != null) elemento.textContent = String(contenido);
        return elemento;
    }

    function valorCelda(registro, celda) {
        if (typeof celda.valor === 'function') return celda.valor(registro);
        if (typeof celda.campo === 'undefined') return '';
        return registro && registro[celda.campo] != null ? registro[celda.campo] : '';
    }

    function crearFilaDesdeEsquema(registro, columnas, esquema, indice) {
        var columnasVisibles = {};
        columnas.forEach(function (columna) { columnasVisibles[columna.campo] = columna; });
        var claseTabla = typeof esquema.claseTabla === 'function'
            ? esquema.claseTabla(registro, indice)
            : (esquema.claseTabla || (indice % 2 ? 'tableRegistroSearch2' : 'tableRegistroSearch'));
        var tabla = crearElemento('table', {
            className: claseTabla,
            border: esquema.border == null ? '1' : esquema.border,
            cellspacing: esquema.cellspacing == null ? '1' : esquema.cellspacing,
            cellpadding: esquema.cellpadding == null ? '5' : esquema.cellpadding
        });
        aplicarAtributos(tabla, typeof esquema.atributosTabla === 'function' ? esquema.atributosTabla(registro, indice) : esquema.atributosTabla);
        var fila = crearElemento('tr', { id: esquema.idFila || 'tbSelecRegistro' });
        aplicarAtributos(fila, typeof esquema.atributosFila === 'function' ? esquema.atributosFila(registro, indice) : esquema.atributosFila);
        (esquema.celdas || []).forEach(function (configCelda) {
            var columna = configCelda.columna ? columnasVisibles[configCelda.columna] : null;
            var visible = configCelda.tecnica !== true && (!configCelda.columna || !!columna);
            var ancho = columna && columna.ancho ? columna.ancho : configCelda.ancho;
            var celda = crearElemento(configCelda.etiqueta || 'td', configCelda.id ? { id: configCelda.id } : {});
            if (configCelda.tecnica === true) celda.dataset.abmCeldaTecnica = '1';
            if (configCelda.columna) celda.dataset.abmColumna = String(configCelda.columna);
            if (!visible || configCelda.visible === false) celda.style.display = 'none';
            else if (ancho) celda.style.width = ancho;
            if (configCelda.className) celda.className = configCelda.className;
            if (configCelda.dataset) aplicarAtributos(celda, { dataset: configCelda.dataset });
            var valor = valorCelda(registro, configCelda);
            if (typeof configCelda.render === 'function') {
                var contenido = configCelda.render(valor, registro, celda);
                if (contenido instanceof Node) celda.appendChild(contenido);
                else if (contenido != null) celda.textContent = String(contenido);
            } else celda.textContent = valor == null ? '' : String(valor);
            fila.appendChild(celda);
        });
        if (typeof esquema.seleccionar === 'function') {
            fila.addEventListener('click', function () { esquema.seleccionar(fila, registro); });
        } else if (esquema.funcionSeleccion && typeof global[esquema.funcionSeleccion] === 'function') {
            fila.addEventListener('click', function () { global[esquema.funcionSeleccion](fila); });
        }
        tabla.appendChild(fila);
        return tabla;
    }

    function crearDestinoCabecera(cabecera) {
        limpiarNodo(cabecera);
        if (cabecera.tagName === 'TABLE') {
            var cuerpo = document.createElement('tbody');
            var fila = document.createElement('tr');
            cuerpo.appendChild(fila);
            cabecera.appendChild(cuerpo);
            return fila;
        }
        if (cabecera.tagName === 'TBODY' || cabecera.tagName === 'THEAD') {
            var filaCabecera = document.createElement('tr');
            cabecera.appendChild(filaCabecera);
            return filaCabecera;
        }
        return cabecera;
    }

    function crear(configuracion) {
        var config = configuracion || {};
        var estado = { registros: [], orden: { campo: config.ordenInicial || '', direccion: 1 }, columnas: {} };
        var claveColumnas = 'columnasAbm_' + config.nombre;

        function cargarColumnas() {
            try { estado.columnas = JSON.parse(localStorage.getItem(claveColumnas) || '{}'); }
            catch (e) { estado.columnas = {}; }
            (config.columnas || []).forEach(function (columna) {
                if (typeof estado.columnas[columna.campo] === 'undefined') estado.columnas[columna.campo] = columna.visible !== false;
            });
        }

        function guardarColumnas() { localStorage.setItem(claveColumnas, JSON.stringify(estado.columnas)); }
        function columnasActivas() { return (config.columnas || []).filter(function (columna) { return estado.columnas[columna.campo]; }); }

        function ordenarRegistros() {
            var campo = estado.orden.campo;
            if (!campo) return estado.registros.slice();
            return estado.registros.slice().sort(function (a, b) {
                var av = a[campo] == null ? '' : a[campo];
                var bv = b[campo] == null ? '' : b[campo];
                return compararValores(av, bv, estado.orden.direccion);
            });
        }

        function dibujarCabecera() {
            var cabecera = document.getElementById(config.idCabecera);
            if (!cabecera) return;
            var destinoCabecera = crearDestinoCabecera(cabecera);
            columnasActivas().forEach(function (columna) {
                var esOrdenable = config.ordenable !== false && columna.ordenable !== false;
                var celda = crearElemento('td', {
                    className: 'td_registro' + (esOrdenable ? ' abm-core-ordenable' : ''),
                    dataset: { campo: columna.campo },
                    tabindex: esOrdenable ? '0' : null,
                    title: esOrdenable ? 'Ordenar por ' + String(columna.titulo || columna.campo || '') : null,
                    'aria-sort': esOrdenable ? (estado.orden.campo === columna.campo ? (estado.orden.direccion === 1 ? 'ascending' : 'descending') : 'none') : null
                });
                celda.style.width = columna.ancho || 'auto';
                celda.appendChild(document.createTextNode(columna.titulo == null ? '' : String(columna.titulo)));
                var indicador = crearElemento('span', { className: 'abm-core-indicador', 'aria-hidden': 'true' });
                if (estado.orden.campo === columna.campo) indicador.textContent = estado.orden.direccion === 1 ? ' \u25B2' : ' \u25BC';
                celda.appendChild(indicador);
                if (esOrdenable) {
                    celda.addEventListener('click', function () { ordenar(columna.campo); });
                    celda.addEventListener('keydown', function (evento) {
                        if (evento.key === 'Enter' || evento.key === ' ') {
                            evento.preventDefault();
                            ordenar(columna.campo);
                        }
                    });
                }
                destinoCabecera.appendChild(celda);
            });
        }

        function dibujarFilas() {
            var cuerpo = document.getElementById(config.idCuerpo);
            if (!cuerpo) return;
            var ordenados = ordenarRegistros();
            var activas = columnasActivas();
            if (typeof config.crearFila === 'function' || config.fila) {
                limpiarNodo(cuerpo);
                var fragmento = document.createDocumentFragment();
                ordenados.forEach(function (registro, indice) {
                    var fila = typeof config.crearFila === 'function'
                        ? config.crearFila(registro, activas, {
                            crearElemento: crearElemento,
                            aplicarAtributos: aplicarAtributos,
                            crearFilaDesdeEsquema: crearFilaDesdeEsquema
                        }, indice)
                        : crearFilaDesdeEsquema(registro, activas, config.fila, indice);
                    if (fila instanceof Node) fragmento.appendChild(fila);
                });
                cuerpo.appendChild(fragmento);
            } else {
                cuerpo.innerHTML = ordenados.map(function (registro) {
                    return config.renderFila(registro, activas, escapar);
                }).join('');
            }
            if (typeof config.despuesRender === 'function') config.despuesRender(cuerpo, estado.registros);
        }

        function ordenar(campo) {
            if (estado.orden.campo === campo) estado.orden.direccion *= -1;
            else estado.orden = { campo: campo, direccion: 1 };
            dibujarCabecera();
            dibujarFilas();
        }

        function cambiarColumna(campo, visible) {
            estado.columnas[campo] = !!visible;
            guardarColumnas();
            dibujarCabecera();
            dibujarFilas();
            dibujarSelectorColumnas();
        }

        function dibujarSelectorColumnas() {
            var contenedor = document.getElementById(config.idOpcionesColumnas);
            if (!contenedor) return;
            contenedor.innerHTML = (config.columnas || []).map(function (columna) {
                return '<label><input type="checkbox" data-columna="' + escapar(columna.campo) + '" ' + (estado.columnas[columna.campo] ? 'checked' : '') + '> ' + escapar(columna.titulo) + '</label>';
            }).join('');
            Array.prototype.forEach.call(contenedor.querySelectorAll('[data-columna]'), function (check) {
                check.addEventListener('change', function () { cambiarColumna(check.getAttribute('data-columna'), check.checked); });
            });
        }

        cargarColumnas();
        return {
            estado: estado,
            escapar: escapar,
            obtenerValor: obtenerValor,
            iniciar: function () { dibujarCabecera(); dibujarSelectorColumnas(); },
            establecerRegistros: function (registros, anexar) {
                var nuevos = Array.isArray(registros) ? registros : [];
                estado.registros = anexar ? estado.registros.concat(nuevos) : nuevos;
                dibujarFilas();
            },
            dibujar: dibujarFilas,
            ordenar: ordenar,
            cambiarColumna: cambiarColumna,
            restablecerColumnas: function () {
                (config.columnas || []).forEach(function (columna) { estado.columnas[columna.campo] = columna.visible !== false; });
                guardarColumnas(); dibujarCabecera(); dibujarFilas(); dibujarSelectorColumnas();
            },
            columnasActivas: columnasActivas
        };
    }

    function crearNodoCompat(descripcion) {
        if (!descripcion || typeof descripcion !== 'object') return null;
        if (descripcion.tipo === 'texto') return document.createTextNode(descripcion.texto == null ? '' : String(descripcion.texto));
        if (descripcion.tipo === 'comentario') return document.createComment(descripcion.texto == null ? '' : String(descripcion.texto));
        if (descripcion.tipo !== 'elemento' || !/^[a-z][a-z0-9-]*$/i.test(descripcion.etiqueta || '')) return null;

        var elemento = document.createElement(descripcion.etiqueta);
        Object.keys(descripcion.atributos || {}).forEach(function (nombre) {
            var valor = descripcion.atributos[nombre];
            try { elemento.setAttribute(nombre, valor == null ? '' : String(valor)); }
            catch (e) { /* Un atributo heredado invalido no debe romper todo el listado. */ }
        });
        (descripcion.hijos || []).forEach(function (hijo) {
            var nodo = crearNodoCompat(hijo);
            if (nodo) elemento.appendChild(nodo);
        });
        if (elemento.hasAttribute('checked')) elemento.checked = true;
        if (elemento.hasAttribute('selected')) elemento.selected = true;
        return elemento;
    }

    function filasDirectasCompat(tabla) {
        var filas = [];
        Array.prototype.forEach.call(tabla.children || [], function (hijo) {
            if (hijo.tagName === 'TR') filas.push(hijo);
            if (hijo.tagName === 'TBODY') {
                Array.prototype.forEach.call(hijo.children || [], function (fila) {
                    if (fila.tagName === 'TR') filas.push(fila);
                });
            }
        });
        return filas;
    }

    function filasCompatibles(destino) {
        if (destino.tagName === 'TBODY' || destino.tagName === 'TABLE') {
            return filasDirectasCompat(destino);
        }

        var todasLasTablas = Array.prototype.slice.call(destino.querySelectorAll ? destino.querySelectorAll('table') : []);
        var tablasMarcadas = todasLasTablas.filter(function (tabla) {
            var filas = filasDirectasCompat(tabla);
            return filas.length === 1 && (/tableRegistro/i.test(tabla.className || '') || filas[0].id === 'tbSelecRegistro');
        });
        if (tablasMarcadas.length) return tablasMarcadas;

        var tablas = todasLasTablas.filter(function (tabla) {
            return !tabla.querySelector('table') && celdasCompatibles(tabla).length > 0;
        });
        if (tablas.length > 1) return tablas;
        if (tablas.length === 1) {
            var filasTabla = filasDirectasCompat(tablas[0]);
            return filasTabla.length > 1 ? filasTabla : tablas;
        }
        return Array.prototype.slice.call(destino.children || []).filter(function (nodo) { return nodo.tagName === 'TR'; });
    }

    function celdasCompatibles(fila) {
        var tr = fila.tagName === 'TR' ? fila : fila.querySelector('tr');
        if (!tr) return [];
        return Array.prototype.slice.call(tr.children || []).filter(function (celda) {
            return /^(TD|TH)$/.test(celda.tagName) && !celda.hidden && celda.style.display !== 'none' && celda.dataset.abmCeldaTecnica !== '1';
        });
    }

    function filaCabeceraCompat(elemento) {
        if (!elemento) return null;
        var fila = elemento.tagName === 'TR' ? elemento : elemento.querySelector('thead tr, tbody tr, tr');
        if (!fila) return null;
        var celdas = Array.prototype.slice.call(fila.children || []).filter(function (celda) { return /^(TD|TH)$/.test(celda.tagName); });
        if (!celdas.length || fila.querySelector('input, select, textarea')) return null;
        var tieneTitulo = celdas.some(function (celda) { return String(celda.textContent || celda.title || '').trim() !== ''; });
        return tieneTitulo ? fila : null;
    }

    function buscarCabeceraCompat(destino) {
        var tablaPropia = destino.closest ? destino.closest('table') : null;
        if (tablaPropia) {
            var propia = filaCabeceraCompat(tablaPropia.querySelector('thead'));
            if (propia) return propia;
        }

        if (destino.id && /2$/.test(destino.id)) {
            var pareja = document.getElementById(destino.id.slice(0, -1) + '1');
            var filaPareja = filaCabeceraCompat(pareja);
            if (filaPareja) return filaPareja;
        }

        var nivel = destino;
        var profundidad = 0;
        while (nivel && profundidad < 5) {
            var actual = nivel.previousElementSibling;
            var intentos = 0;
            while (actual && intentos < 12) {
                var fila = filaCabeceraCompat(actual);
                if (fila) return fila;
                actual = actual.previousElementSibling;
                intentos += 1;
            }
            nivel = nivel.parentElement;
            profundidad += 1;
        }
        return null;
    }

    function actualizarIndicadorCompat(columnas, activa, direccion) {
        columnas.forEach(function (columna) {
            delete columna.dataset.gvOrdenDireccion;
            columna.setAttribute('aria-sort', 'none');
            var anterior = columna.querySelector('.abm-core-indicador');
            if (anterior) anterior.parentNode.removeChild(anterior);
        });
        activa.dataset.gvOrdenDireccion = direccion === 1 ? 'asc' : 'desc';
        activa.setAttribute('aria-sort', direccion === 1 ? 'ascending' : 'descending');
        var indicador = document.createElement('span');
        indicador.className = 'abm-core-indicador';
        indicador.setAttribute('aria-hidden', 'true');
        indicador.textContent = direccion === 1 ? ' \u25B2' : ' \u25BC';
        activa.appendChild(indicador);
    }

    function ordenarCompat(destino, columnas, columna, indice) {
        var direccion = columna.dataset.gvOrdenDireccion === 'asc' ? -1 : 1;
        var filas = filasCompatibles(destino);
        if (!filas.length) return;
        var destinoOrden = filas[0].tagName === 'TABLE' ? destino : filas[0].parentNode;
        filas.map(function (fila, posicion) { return { fila: fila, posicion: posicion }; }).sort(function (a, b) {
            var celdasA = celdasCompatibles(a.fila);
            var celdasB = celdasCompatibles(b.fila);
            var valorA = celdasA[indice] ? celdasA[indice].textContent.trim() : '';
            var valorB = celdasB[indice] ? celdasB[indice].textContent.trim() : '';
            var resultado = compararValores(valorA, valorB, direccion);
            return resultado === 0 ? a.posicion - b.posicion : resultado;
        }).forEach(function (registro) { destinoOrden.appendChild(registro.fila); });
        actualizarIndicadorCompat(columnas, columna, direccion);
    }

    function habilitarOrdenamientoCompat(destino) {
        destino = typeof destino === 'string' ? document.getElementById(destino) : destino;
        if (!destino) return;
        var cabecera = buscarCabeceraCompat(destino);
        if (!cabecera) return;
        var columnas = Array.prototype.slice.call(cabecera.children || []).filter(function (celda) { return /^(TD|TH)$/.test(celda.tagName); });
        columnas.forEach(function (columna, indice) {
            var ordenPropio = columna.classList.contains('abm-core-ordenable') ||
                columna.classList.contains('abm-estandar-ordenable') ||
                columna.classList.contains('columna-ordenable') ||
                columna.classList.contains('producto-columna-orden') ||
                /\b(?:ordenar|sort)\w*\s*\(/i.test(columna.getAttribute('onclick') || '');
            if (columna.dataset.gvOrdenCompat === '1' || ordenPropio) return;
            if (columna.dataset.ordenable === 'false' || String(columna.textContent || columna.title || '').trim() === '') return;
            columna.dataset.gvOrdenCompat = '1';
            columna.classList.add('abm-core-ordenable');
            columna.tabIndex = columna.tabIndex < 0 ? 0 : columna.tabIndex;
            columna.setAttribute('aria-sort', 'none');
            columna.setAttribute('title', 'Ordenar por ' + String(columna.textContent || columna.title || '').trim());
            columna.addEventListener('click', function () { ordenarCompat(destino, columnas, columna, indice); });
            columna.addEventListener('keydown', function (evento) {
                if (evento.key === 'Enter' || evento.key === ' ') {
                    evento.preventDefault();
                    ordenarCompat(destino, columnas, columna, indice);
                }
            });
        });
    }

    function habilitarTodosCompat(raiz) {
        var contexto = raiz && raiz.querySelectorAll ? raiz : document;
        var selector = '.abm-estandar-tabla-cuerpo, .div_cuerpo_table, .divTablesScrool, [id^="table_"], [id^="tbody_"], [id^="TableScrooll"], [id^="divBuscador"]';
        var destinos = Array.prototype.slice.call(contexto.querySelectorAll(selector));
        if (contexto !== document && contexto.matches && contexto.matches(selector)) destinos.unshift(contexto);
        destinos.forEach(function (destino) {
            if (destino.tagName === 'TABLE' && destino.classList.contains('tableCabeceraRegistro')) return;
            habilitarOrdenamientoCompat(destino);
        });
    }

    function establecerCompat(destinoOId, contenido, anexar) {
        var destino = typeof destinoOId === 'string' ? document.getElementById(destinoOId) : destinoOId;
        if (!destino) return false;
        if (!Array.isArray(contenido)) {
            if (!anexar) destino.innerHTML = '';
            if (typeof contenido === 'string') destino.insertAdjacentHTML('beforeend', contenido);
            return false;
        }

        if (!anexar) limpiarNodo(destino);
        var fragmento = document.createDocumentFragment();
        contenido.forEach(function (descripcion) {
            var nodo = crearNodoCompat(descripcion);
            if (nodo) fragmento.appendChild(nodo);
        });
        destino.appendChild(fragmento);
        habilitarOrdenamientoCompat(destino);
        return true;
    }

    function serializarCompat(contenido) {
        if (!Array.isArray(contenido)) return contenido == null ? '' : String(contenido);
        var contenedor = document.createElement('div');
        contenido.forEach(function (descripcion) {
            var nodo = crearNodoCompat(descripcion);
            if (nodo) contenedor.appendChild(nodo);
        });
        return contenedor.innerHTML;
    }

    global.AbmListadoCore = {
        crear: crear,
        escapar: escapar,
        valor: obtenerValor,
        crearElemento: crearElemento,
        aplicarAtributos: aplicarAtributos,
        crearFilaDesdeEsquema: crearFilaDesdeEsquema,
        compararValores: compararValores
    };
    global.AbmListadoCompat = {
        establecer: establecerCompat,
        crearNodo: crearNodoCompat,
        habilitarOrdenamiento: habilitarOrdenamientoCompat,
        habilitarTodos: habilitarTodosCompat,
        serializar: serializarCompat
    };
}(window));
