(function () {
    'use strict';

    var bpEndpoint = '/GoodVentaElectroCasaMaric/php_system/abmEquifaxBasePositiva.php';

    function bpAuth(data) {
        obtener_datos_user();
        data.useru = userid;
        data.passu = passuser;
        data.navegador = navegador;
        return data;
    }

    function bpMensaje(texto, tipo) {
        var caja = document.getElementById('equifaxBpEstado');
        if (!caja) { return; }
        caja.className = 'equifax-bp-status ' + (tipo || 'ok');
        caja.textContent = texto;
    }

    function bpPeticion(data, boton) {
        if (boton) { boton.disabled = true; }
        return $.ajax({url: bpEndpoint, type: 'POST', data: bpAuth(data), dataType: 'json', cache: false})
            .always(function () { if (boton) { boton.disabled = false; } });
    }

    window.verCerrarEquifaxBasePositiva = function () {
        var ventana = document.getElementById('divEquifaxBasePositiva');
        if (!ventana) { return; }
        if (ventana.style.display === '') {
            ventana.style.display = 'none';
            return;
        }
        if (typeof controlacceso === 'function' && controlacceso('VERBASEPOSITIVAEQUIFAX', 'accion') === false) { return; }
        if (typeof mostrarSoloUno === 'function') { mostrarSoloUno('divEquifaxBasePositiva'); }
        ventana.style.display = '';
        window.cargarEquifaxBasePositiva();
    };

    window.cargarEquifaxBasePositiva = function () {
        bpMensaje('Cargando configuracion e historial...', 'ok');
        bpPeticion({accion: 'estado'}).done(function (r) {
            if (!r.ok) { bpMensaje(r.mensaje, 'error'); return; }
            bpCompletarConfig(r.datos.config || {});
            bpDibujarCargas(r.datos.cargas || []);
            bpMensaje('Modulo actualizado.', 'ok');
        }).fail(function (xhr) {
            bpMensaje('No se pudo cargar el modulo. ' + (xhr.responseText || ''), 'error');
        });
    };

    function bpCompletarConfig(c) {
        var campos = ['ambiente','base_url','token_url','scope','client_id','supplier_id','user_id','contribution_name','codigo_cliente','sucursal','tipo_prestamo','periodicidad','moneda','activo'];
        campos.forEach(function (nombre) {
            var input = document.getElementById('bp_' + nombre);
            if (input && typeof c[nombre] !== 'undefined') { input.value = c[nombre] || ''; }
        });
        var secreto = document.getElementById('bp_client_secret');
        if (secreto) {
            secreto.value = '';
            secreto.placeholder = c.secret_configurado ? 'Configurado; deje vacio para conservar' : 'Ingrese el secreto';
        }
    }

    window.guardarConfigEquifaxBp = function (boton) {
        var data = {accion: 'guardar_config'};
        ['ambiente','base_url','token_url','scope','client_id','client_secret','supplier_id','user_id','contribution_name','codigo_cliente','sucursal','tipo_prestamo','periodicidad','moneda','activo'].forEach(function (nombre) {
            data[nombre] = document.getElementById('bp_' + nombre).value.trim();
        });
        bpPeticion(data, boton).done(function (r) {
            bpMensaje(r.mensaje, r.ok ? 'ok' : 'error');
            if (r.ok) { window.cargarEquifaxBasePositiva(); }
        }).fail(function () { bpMensaje('Error al guardar la configuracion.', 'error'); });
    };

    window.probarConexionEquifaxBp = function (boton) {
        bpMensaje('Solicitando token a Equifax...', 'ok');
        bpPeticion({accion: 'probar_conexion'}, boton).done(function (r) {
            bpMensaje(r.mensaje, r.ok ? 'ok' : 'error');
        }).fail(function () { bpMensaje('No fue posible probar la conexion.', 'error'); });
    };

    window.generarArchivosEquifaxBp = function (boton) {
        var periodo = document.getElementById('bp_periodo').value.replace('-', '');
        var frecuencia = document.getElementById('bp_frecuencia').value;
        if (!periodo) { bpMensaje('Seleccione el periodo a generar.', 'error'); return; }
        if (!confirm('Se generaran cuatro archivos Equifax para el periodo ' + periodo + '. Desea continuar?')) { return; }
        bpPeticion({accion: 'generar', periodo: periodo, frecuencia: frecuencia}, boton).done(function (r) {
            bpMensaje(r.mensaje, r.ok ? 'ok' : 'error');
            if (r.ok) { window.cargarEquifaxBasePositiva(); }
        }).fail(function () { bpMensaje('No fue posible generar los archivos.', 'error'); });
    };

    window.enviarEquifaxBp = function (id, boton) {
        if (!confirm('Enviar este archivo a Equifax?')) { return; }
        bpPeticion({accion: 'enviar', id: id}, boton).done(function (r) {
            bpMensaje(r.mensaje, r.ok ? 'ok' : 'error');
            if (r.ok) { window.cargarEquifaxBasePositiva(); }
        }).fail(function () { bpMensaje('No fue posible enviar el archivo.', 'error'); });
    };

    window.actualizarEquifaxBp = function (id, boton) {
        bpPeticion({accion: 'actualizar', id: id}, boton).done(function (r) {
            bpMensaje(r.mensaje, r.ok ? 'ok' : 'error');
            if (r.ok) { window.cargarEquifaxBasePositiva(); }
        }).fail(function () { bpMensaje('No fue posible consultar el estado.', 'error'); });
    };

    window.descargarEquifaxBp = function (id) {
        obtener_datos_user();
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = '/GoodVentaElectroCasaMaric/php_system/descargarEquifaxBasePositiva.php';
        form.style.display = 'none';
        [['id',id],['useru',userid],['passu',passuser],['navegador',navegador]].forEach(function (par) {
            var input = document.createElement('input'); input.name = par[0]; input.value = par[1]; form.appendChild(input);
        });
        document.body.appendChild(form); form.submit(); document.body.removeChild(form);
    };

    function bpEscape(valor) {
        return $('<div>').text(valor == null ? '' : valor).html();
    }

    function bpDibujarCargas(cargas) {
        var body = document.getElementById('equifaxBpCargas');
        if (!body) { return; }
        if (!cargas.length) { body.innerHTML = '<tr><td colspan="11" class="equifax-bp-empty">Todavia no hay archivos generados.</td></tr>'; return; }
        body.innerHTML = cargas.map(function (c) {
            var enviar = c.estado === 'GENERADO' ? '<button class="equifax-bp-btn success" onclick="enviarEquifaxBp(' + c.id + ',this)">Enviar</button>' : '';
            var actualizar = c.equifax_id ? '<button class="equifax-bp-btn secondary" onclick="actualizarEquifaxBp(' + c.id + ',this)">Actualizar</button>' : '';
            return '<tr><td>' + c.id + '</td><td>' + bpEscape(c.periodo) + '</td><td>' + bpEscape(c.tipo_persona) + ' / ' + bpEscape(c.tipo_archivo) + '</td><td>' + bpEscape(c.nombre_archivo) + '</td><td>' + c.cantidad_registros + '</td><td><span class="equifax-bp-badge">' + bpEscape(c.estado) + '</span></td><td>' + bpEscape(c.equifax_id) + '</td><td>' + bpEscape(c.phase) + '</td><td>' + bpEscape(c.valid_count) + ' / ' + bpEscape(c.error_count) + '</td><td>' + bpEscape(c.percent) + '</td><td><div class="equifax-bp-actions"><button class="equifax-bp-btn secondary" onclick="descargarEquifaxBp(' + c.id + ')">ZIP</button>' + enviar + actualizar + '</div></td></tr>';
        }).join('');
    }
}());
