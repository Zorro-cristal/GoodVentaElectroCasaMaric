(function (window, document, $) {
  "use strict";

  var estado = {
    iniciadas: 0,
    finalizadas: 0,
    activas: 0,
    porcentaje: 4,
    paginaCargada: false,
    completada: false,
    temporizadorEstable: null,
    inicio: Date.now()
  };

  function elemento(id) {
    return document.getElementById(id);
  }

  function descripcionSolicitud(url) {
    var ruta = String(url || "").toLowerCase();

    if (ruta.indexOf("buscar_datos_usuario") !== -1 || ruta.indexOf("abmusuarios") !== -1) {
      return "Validando usuario y permisos";
    }
    if (ruta.indexOf("notific") !== -1 || ruta.indexOf("mensajes") !== -1) {
      return "Sincronizando notificaciones";
    }
    if (ruta.indexOf("producto") !== -1 || ruta.indexOf("marca") !== -1 || ruta.indexOf("categoria") !== -1) {
      return "Preparando productos y catálogos";
    }
    if (ruta.indexOf("casa") !== -1 || ruta.indexOf("caja") !== -1 || ruta.indexOf("local") !== -1) {
      return "Cargando locales y cajas";
    }
    if (ruta.indexOf("cobrador") !== -1 || ruta.indexOf("vendedor") !== -1 || ruta.indexOf("funcionario") !== -1) {
      return "Preparando usuarios y responsables";
    }
    if (ruta.indexOf("empresa") !== -1 || ruta.indexOf("banco") !== -1) {
      return "Cargando configuración de la empresa";
    }

    return "Inicializando datos del sistema";
  }

  function actualizar(porcentaje, titulo, detalle) {
    var nuevoPorcentaje = Math.max(estado.porcentaje, Math.min(100, Math.round(porcentaje)));
    var barra = elemento("splashProgreso");
    var contenedor = elemento("splashBarra");
    var porcentajeTexto = elemento("splashPorcentaje");
    var tituloTexto = elemento("splashEstado");
    var detalleTexto = elemento("splashDetalle");

    estado.porcentaje = nuevoPorcentaje;

    if (barra) {
      barra.style.width = nuevoPorcentaje + "%";
    }
    if (contenedor) {
      contenedor.setAttribute("aria-label", "Progreso de inicialización: " + nuevoPorcentaje + " por ciento");
    }
    if (porcentajeTexto) {
      porcentajeTexto.textContent = nuevoPorcentaje + "%";
    }
    if (tituloTexto && titulo) {
      tituloTexto.textContent = titulo;
    }
    if (detalleTexto && detalle) {
      detalleTexto.textContent = detalle;
    }
  }

  function cerrarPantalla() {
    var splash = elemento("splash");

    if (!splash || splash.getAttribute("data-cerrado") === "1") {
      return;
    }

    splash.setAttribute("data-cerrado", "1");
    splash.classList.add("splash-screen--closing");

    setTimeout(function () {
      var modal;
      splash.style.display = "none";
      modal = elemento("modalBienvenida");
      if (modal) {
        modal.style.display = "flex";
      }
    }, 430);
  }

  function completar() {
    if (estado.completada) {
      return;
    }

    estado.completada = true;
    actualizar(100, "Inicialización completa", "Datos listos. Iniciando Good Venta...");
    setTimeout(cerrarPantalla, 520);
  }

  function programarFinalizacion() {
    if (!estado.paginaCargada || estado.activas > 0 || estado.completada) {
      return;
    }

    clearTimeout(estado.temporizadorEstable);
    estado.temporizadorEstable = setTimeout(function () {
      var tiempoVisible;
      var demoraMinima;

      if (estado.activas !== 0) {
        return;
      }

      tiempoVisible = Date.now() - estado.inicio;
      demoraMinima = Math.max(0, 1250 - tiempoVisible);
      setTimeout(completar, demoraMinima);
    }, 700);
  }

  /* Sustituye el cierre fijo anterior: solo permite cerrar cuando la carga terminó. */
  window.ocultarIntro = function () {
    if (estado.completada) {
      cerrarPantalla();
    }
  };

  window.setProgress = function (porcentaje) {
    actualizar(porcentaje, "Inicializando datos del sistema", "Procesando información necesaria");
  };

  if ($) {
    $(document).ajaxSend(function (evento, xhr, opciones) {
      var avanceInicio;

      if (estado.completada) {
        return;
      }

      clearTimeout(estado.temporizadorEstable);
      estado.iniciadas++;
      estado.activas++;
      avanceInicio = Math.min(78, 10 + (estado.iniciadas * 2));

      actualizar(
        avanceInicio,
        descripcionSolicitud(opciones && opciones.url),
        estado.finalizadas + " de " + estado.iniciadas + " procesos completados"
      );
    });

    $(document).ajaxComplete(function () {
      var total;
      var proporcion;
      var avanceReal;

      if (estado.completada) {
        return;
      }

      estado.finalizadas++;
      estado.activas = Math.max(0, estado.activas - 1);
      total = Math.max(estado.iniciadas, 1);
      proporcion = estado.finalizadas / total;
      avanceReal = 22 + (proporcion * 70);

      actualizar(
        Math.min(94, avanceReal),
        estado.activas > 0 ? "Cargando información necesaria" : "Verificando datos cargados",
        estado.finalizadas + " de " + total + " procesos completados"
      );
      programarFinalizacion();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    actualizar(7, "Preparando componentes", "Comprobando sesión y configuración inicial");
  });

  window.addEventListener("load", function () {
    estado.paginaCargada = true;
    actualizar(12, "Interfaz preparada", "Inicializando datos necesarios del sistema");
    programarFinalizacion();
  });

  /* Respaldo ante una petición externa que nunca responda. */
  setTimeout(function () {
    if (!estado.completada && estado.paginaCargada) {
      completar();
    }
  }, 30000);
}(window, document, window.jQuery));
