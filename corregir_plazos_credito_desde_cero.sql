-- Seleccionar la base de datos de la aplicacion e importar este archivo completo.
-- Compatible con MySQL 5.6+ y MariaDB 10.1+; no requiere funciones de ventana.
-- Ejecutar por separado, sin otra transaccion abierta ni edicion simultanea de cuotas.
--
-- Solo corrige ventas cuyo menor plazo numerico es 0 (tambien acepta 0/N).
-- Renumera TODAS sus filas numericas, incluidas las de importe cero, desde 1.
-- Orden: numero anterior, vencimiento e idcredito como desempate.
-- Ejemplos: 0,1,2 -> 1,2,3; 0/3,1/3,2/3 -> 1/3,2/3,3/3.
-- Si hay fracciones, usa N = cantidad real de filas numericas de esa venta.
-- Textos como Entrega, Contado y PAGO PENDIENTE quedan fuera de la numeracion.
-- Guarda los cambios en _respaldo_plazos_credito_desde_cero.
-- Solo actualiza credito.plazo. Puede repetirse: las ventas corregidas ya no tienen 0.

CREATE TABLE IF NOT EXISTS `_respaldo_plazos_credito_desde_cero` (
    `ejecucion` CHAR(36) NOT NULL,
    `idcredito` INT NOT NULL,
    `cod_venta` INT NOT NULL,
    `plazo_anterior` VARCHAR(45) NOT NULL,
    `plazo_nuevo` VARCHAR(45) NOT NULL,
    `fecha_correccion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ejecucion`, `idcredito`),
    KEY `venta_corregida` (`cod_venta`, `idcredito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DELIMITER $$

DROP PROCEDURE IF EXISTS `_corregir_plazos_credito_desde_cero`$$
CREATE PROCEDURE `_corregir_plazos_credito_desde_cero`()
BEGIN
    DECLARE v_ejecucion CHAR(36);
    DECLARE v_lock_nombre VARCHAR(64);
    DECLARE v_lock INT DEFAULT 0;
    DECLARE v_ventas BIGINT DEFAULT 0;
    DECLARE v_cuotas BIGINT DEFAULT 0;
    DECLARE v_cambios BIGINT DEFAULT 0;
    DECLARE v_actualizadas BIGINT DEFAULT 0;
    DECLARE v_errores BIGINT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        DROP TEMPORARY TABLE IF EXISTS tmp_plazos_cero_plan;
        DROP TEMPORARY TABLE IF EXISTS tmp_plazos_cero_ventas;
        IF v_lock = 1 THEN
            DO RELEASE_LOCK(v_lock_nombre);
        END IF;
        RESIGNAL;
    END;

    SET v_ejecucion = UUID();
    SET v_lock_nombre = CONCAT(LEFT(DATABASE(), 40), ':plazos_desde_cero');
    SELECT GET_LOCK(v_lock_nombre, 0) INTO v_lock;
    IF COALESCE(v_lock, 0) <> 1 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Ya hay otra correccion de plazos en curso';
    END IF;

    SELECT COUNT(*) INTO v_errores
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME IN ('credito', '_respaldo_plazos_credito_desde_cero')
      AND ENGINE = 'InnoDB';
    IF v_errores <> 2 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'credito y su respaldo deben existir y usar InnoDB';
    END IF;

    START TRANSACTION;

    DROP TEMPORARY TABLE IF EXISTS tmp_plazos_cero_plan;
    DROP TEMPORARY TABLE IF EXISTS tmp_plazos_cero_ventas;

    CREATE TEMPORARY TABLE tmp_plazos_cero_ventas (
        cod_venta INT NOT NULL PRIMARY KEY,
        total_cuotas BIGINT NOT NULL,
        usa_fraccion TINYINT NOT NULL
    ) ENGINE=InnoDB;

    CREATE TEMPORARY TABLE tmp_plazos_cero_plan (
        idcredito INT NOT NULL PRIMARY KEY,
        cod_venta INT NOT NULL,
        plazo_anterior VARCHAR(45) NOT NULL,
        plazo_nuevo VARCHAR(45) NOT NULL,
        numero_nuevo BIGINT NOT NULL,
        UNIQUE KEY numero_por_venta (cod_venta, numero_nuevo)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    -- Se reconoce el numero completo; Entrega y otros textos no se convierten a 0.
    INSERT INTO tmp_plazos_cero_ventas (cod_venta, total_cuotas, usa_fraccion)
    SELECT c.cod_venta, COUNT(*), MAX(LOCATE('/', c.plazo) > 0)
    FROM credito AS c
    WHERE TRIM(c.plazo) REGEXP '^[0-9]+(/[0-9]+)?$'
    GROUP BY c.cod_venta
    HAVING MIN(CAST(SUBSTRING_INDEX(TRIM(c.plazo), '/', 1) AS DECIMAL(45,0))) = 0;

    SELECT COUNT(*), COALESCE(SUM(total_cuotas), 0)
    INTO v_ventas, v_cuotas
    FROM tmp_plazos_cero_ventas;

    -- El cursor evita depender del orden de evaluacion de variables @ en SELECT.
    -- FOR UPDATE conserva bloqueadas las filas hasta finalizar la transaccion.
    BEGIN
        DECLARE v_fin INT DEFAULT 0;
        DECLARE v_idcredito INT;
        DECLARE v_venta INT;
        DECLARE v_venta_anterior INT DEFAULT NULL;
        DECLARE v_plazo VARCHAR(45);
        DECLARE v_total BIGINT;
        DECLARE v_fraccion TINYINT;
        DECLARE v_numero BIGINT DEFAULT 0;
        DECLARE cuotas CURSOR FOR
            SELECT c.idcredito, c.cod_venta, c.plazo, v.total_cuotas, v.usa_fraccion
            FROM credito AS c
            INNER JOIN tmp_plazos_cero_ventas AS v ON v.cod_venta = c.cod_venta
            WHERE TRIM(c.plazo) REGEXP '^[0-9]+(/[0-9]+)?$'
            ORDER BY c.cod_venta,
                CAST(SUBSTRING_INDEX(TRIM(c.plazo), '/', 1) AS DECIMAL(45,0)),
                c.fechapago, c.idcredito
            FOR UPDATE;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_fin = 1;

        OPEN cuotas;
        recorrer_cuotas: LOOP
            FETCH cuotas INTO v_idcredito, v_venta, v_plazo, v_total, v_fraccion;
            IF v_fin = 1 THEN
                LEAVE recorrer_cuotas;
            END IF;
            IF v_venta_anterior IS NULL OR v_venta_anterior <> v_venta THEN
                SET v_numero = 1;
            ELSE
                SET v_numero = v_numero + 1;
            END IF;
            SET v_venta_anterior = v_venta;

            INSERT INTO tmp_plazos_cero_plan
                (idcredito, cod_venta, plazo_anterior, plazo_nuevo, numero_nuevo)
            VALUES (v_idcredito, v_venta, v_plazo,
                IF(v_fraccion = 1, CONCAT(v_numero, '/', v_total), CAST(v_numero AS CHAR)),
                v_numero);
        END LOOP;
        CLOSE cuotas;
    END;

    SELECT COUNT(*) INTO v_errores FROM tmp_plazos_cero_plan;
    IF v_errores <> v_cuotas THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cambio la cantidad de cuotas durante la preparacion; se revierte';
    END IF;

    INSERT INTO `_respaldo_plazos_credito_desde_cero`
        (ejecucion, idcredito, cod_venta, plazo_anterior, plazo_nuevo)
    SELECT v_ejecucion, p.idcredito, p.cod_venta, p.plazo_anterior, p.plazo_nuevo
    FROM tmp_plazos_cero_plan AS p
    WHERE BINARY p.plazo_anterior <> BINARY p.plazo_nuevo;
    SET v_cambios = ROW_COUNT();

    UPDATE credito AS c
    INNER JOIN tmp_plazos_cero_plan AS p ON p.idcredito = c.idcredito
    SET c.plazo = p.plazo_nuevo
    WHERE c.cod_venta = p.cod_venta
      AND BINARY c.plazo = BINARY p.plazo_anterior
      AND BINARY c.plazo <> BINARY p.plazo_nuevo;
    SET v_actualizadas = ROW_COUNT();

    IF v_actualizadas <> v_cambios THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Las cuotas actualizadas no coinciden con el respaldo; se revierte';
    END IF;

    SELECT COUNT(*) INTO v_errores
    FROM credito AS c
    INNER JOIN tmp_plazos_cero_plan AS p ON p.idcredito = c.idcredito
    WHERE c.cod_venta <> p.cod_venta OR BINARY c.plazo <> BINARY p.plazo_nuevo;
    IF v_errores <> 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Hay plazos distintos a los previstos; se revierte';
    END IF;

    -- Verifica la secuencia real guardada: empieza en 1, sin huecos ni repetidos.
    SELECT COUNT(*) INTO v_errores
    FROM (
        SELECT c.cod_venta
        FROM credito AS c
        INNER JOIN tmp_plazos_cero_ventas AS v ON v.cod_venta = c.cod_venta
        WHERE TRIM(c.plazo) REGEXP '^[0-9]+(/[0-9]+)?$'
        GROUP BY c.cod_venta
        HAVING MIN(CAST(SUBSTRING_INDEX(TRIM(c.plazo), '/', 1) AS DECIMAL(45,0))) <> 1
            OR MAX(CAST(SUBSTRING_INDEX(TRIM(c.plazo), '/', 1) AS DECIMAL(45,0))) <> COUNT(*)
            OR COUNT(DISTINCT CAST(SUBSTRING_INDEX(TRIM(c.plazo), '/', 1) AS DECIMAL(45,0))) <> COUNT(*)
            OR COUNT(*) <> MAX(v.total_cuotas)
    ) AS ventas_invalidas;
    IF v_errores <> 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Quedaron cuotas repetidas o una secuencia incompleta; se revierte';
    END IF;

    DROP TEMPORARY TABLE tmp_plazos_cero_plan;
    DROP TEMPORARY TABLE tmp_plazos_cero_ventas;
    COMMIT;
    DO RELEASE_LOCK(v_lock_nombre);

    SELECT 'CORRECCION_COMPLETADA' AS resultado,
        v_ejecucion AS ejecucion_respaldo,
        v_ventas AS ventas_corregidas,
        v_cuotas AS cuotas_evaluadas,
        v_actualizadas AS plazos_actualizados;
END$$

DELIMITER ;

CALL `_corregir_plazos_credito_desde_cero`();
DROP PROCEDURE IF EXISTS `_corregir_plazos_credito_desde_cero`;

-- Consultar el detalle usando el UUID mostrado en ejecucion_respaldo:
-- SELECT * FROM _respaldo_plazos_credito_desde_cero
-- WHERE ejecucion = 'UUID_DEVUELTO' ORDER BY cod_venta, idcredito;
