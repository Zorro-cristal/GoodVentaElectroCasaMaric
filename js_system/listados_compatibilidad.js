(function (global, $) {
    'use strict';

    if (!$ || !$.ajaxPrefilter || global.GVListadosCompatibilidad) return;

    /*
     * Puente temporal para listados heredados: solicita nodos JSON al PHP y
     * los reconstruye en JavaScript antes de ejecutar el callback existente.
     * Esto conserva paginacion, impresion, eventos y contratos AJAX actuales.
     */
    var contextoActual = null;
    function campoDesdeExpresion(expresion, codigo) {
        var directo = expresion.match(/datos\s*\[\s*["']?(\d+)["']?\s*\]/);
        if (directo) return directo[1];
        var variable = expresion.match(/\b(datos_buscados|pagina(?:ExtractoCuota|Compras)?|Respuesta)\b/);
        if (!variable) return '';
        var nombre = variable[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var asignacion = new RegExp('(?:var\\s+)?' + nombre + '\\s*=\\s*datos\\s*\\[\\s*["\\\']?(\\d+)["\\\']?\\s*\\]', 'i');
        var hallado = codigo.match(asignacion);
        return hallado ? hallado[1] : '';
    }

    function extraerDestinos(funcion) {
        var codigo;
        try { codigo = Function.prototype.toString.call(funcion); }
        catch (e) { return []; }
        if (codigo.indexOf('$.ajax') < 0 || /AbmListadoCompat/.test(codigo) || /establecerRegistros\s*\(/.test(codigo)) return [];
        if (/(?:["']?formato["']?\s*:|\.append\s*\(\s*["']formato["'])/i.test(codigo)) return [];

        var destinos = [];
        function agregarDestino(id, operador, expresion) {
            if (!id || !/(?:datos|pagina|Respuesta)/.test(expresion) || /paginacargando/.test(expresion)) return;
            var campo = campoDesdeExpresion(expresion, codigo);
            if (!campo) return;
            if (!destinos.some(function (destino) { return destino.id === id && destino.campo === campo; })) {
                destinos.push({
                    id: id,
                    campo: campo,
                    anexar: operador === '+=' || /^\s*paginas?\s*\+/.test(expresion)
                });
            }
        }

        var patron = /document\.getElementById\(\s*(["'])([^"']+)\1\s*\)\.innerHTML\s*(\+?=)\s*([^;\n]+)/g;
        var coincidencia;
        while ((coincidencia = patron.exec(codigo))) {
            agregarDestino(coincidencia[2], coincidencia[3], coincidencia[4]);
        }

        var variables = {};
        var patronVariable = /(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*document\.getElementById\(\s*(["'])([^"']+)\2\s*\)/g;
        while ((coincidencia = patronVariable.exec(codigo))) variables[coincidencia[1]] = coincidencia[3];
        Object.keys(variables).forEach(function (nombre) {
            var nombreSeguro = nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            var patronAsignacion = new RegExp('\\b' + nombreSeguro + '\\.innerHTML\\s*(\\+?=)\\s*([^;\\n]+)', 'g');
            var asignacion;
            while ((asignacion = patronAsignacion.exec(codigo))) {
                agregarDestino(variables[nombre], asignacion[1], asignacion[2]);
            }
        });
        return destinos;
    }

    function agregarDatoAjax(opciones, nombre, valor) {
        var datos = opciones.data;
        if (global.FormData && datos instanceof global.FormData) {
            if (typeof datos.set === 'function') datos.set(nombre, valor);
            else datos.append(nombre, valor);
            return;
        }
        if (typeof datos === 'string') {
            var separador = datos === '' ? '' : '&';
            opciones.data = datos + separador + encodeURIComponent(nombre) + '=' + encodeURIComponent(valor);
            return;
        }
        if (!datos || typeof datos !== 'object') datos = {};
        datos[nombre] = valor;
        opciones.data = datos;
    }

    function esListaNodos(valor) {
        return Array.isArray(valor) && (valor.length === 0 || valor.every(function (nodo) {
            return nodo && typeof nodo === 'object' && /^(?:texto|comentario|elemento)$/.test(nodo.tipo || '');
        }));
    }

    function prepararRespuesta(respuesta, destinos) {
        var eraTexto = typeof respuesta === 'string';
        var datos;
        try { datos = eraTexto ? $.parseJSON(respuesta) : respuesta; }
        catch (e) { return null; }
        if (!datos || datos._formato !== 'nodos') return null;

        var convertidos = {};
        destinos.forEach(function (destino) {
            if (convertidos[destino.campo]) return;
            var contenido = datos[destino.campo];
            if (!esListaNodos(contenido)) return;
            datos[destino.campo] = global.AbmListadoCompat.serializar(contenido);
            convertidos[destino.campo] = true;
        });
        if (!Object.keys(convertidos).length) return null;
        return eraTexto ? JSON.stringify(datos) : datos;
    }

    $.ajaxPrefilter(function (opciones) {
        var contexto = contextoActual;
        if (!contexto || !contexto.destinos.length) return;

        var campos = [];
        contexto.destinos.forEach(function (destino) {
            if (campos.indexOf(destino.campo) < 0) campos.push(destino.campo);
        });
        agregarDatoAjax(opciones, 'formato_salida', 'nodos');
        agregarDatoAjax(opciones, 'formato_nodos_campos', campos.join(','));

        var exitoOriginal = opciones.success;
        if (typeof exitoOriginal !== 'function') return;
        opciones.success = function (respuesta) {
            var argumentos = Array.prototype.slice.call(arguments);
            var preparada = prepararRespuesta(respuesta, contexto.destinos);
            if (preparada) argumentos[0] = preparada;
            try {
                return exitoOriginal.apply(this, argumentos);
            } finally {
                contexto.destinos.forEach(function (destino) {
                    global.AbmListadoCompat.habilitarOrdenamiento(destino.id);
                });
            }
        };
    });

    function envolver(nombre, funcion, destinos) {
        if (!destinos.length || funcion.__gvListadoCompat === true) return;
        var envuelta = function () {
            var anterior = contextoActual;
            contextoActual = { nombre: nombre, destinos: destinos };
            try { return funcion.apply(this, arguments); }
            finally { contextoActual = anterior; }
        };
        envuelta.__gvListadoCompat = true;
        envuelta.__gvListadoOriginal = funcion;
        global[nombre] = envuelta;
    }

    function instalar() {
        Object.keys(global).forEach(function (nombre) {
            var funcion;
            try { funcion = global[nombre]; }
            catch (e) { return; }
            if (typeof funcion !== 'function') return;
            var destinos = extraerDestinos(funcion);
            if (destinos.length) envolver(nombre, funcion, destinos);
        });
    }

    global.GVListadosCompatibilidad = {
        instalar: instalar,
        extraerDestinos: extraerDestinos
    };

    instalar();
    function iniciar() {
        instalar();
        global.AbmListadoCompat.habilitarTodos(document);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
}(window, window.jQuery));
