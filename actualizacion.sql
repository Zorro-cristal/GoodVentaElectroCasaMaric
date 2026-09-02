update cliente set accesocredito = 'Confirmado' where estado like '%';

ALTER TABLE local ADD COLUMN direccion VARCHAR(255), ADD COLUMN ciudad VARCHAR(100), ADD COLUMN telefono VARCHAR(100);
INSERT INTO datos_empresa (nombre, ruc, telefono) VALUES ('Casa Maric', '4193548-9', '(0985 712 481)');
UPDATE local SET direccion= '14 de Mayo y Joaquín Estigarribia', ciudad= 'Villarrica - Guaira', telefono= '(0985 712 481)' WHERE cod_local = 1;