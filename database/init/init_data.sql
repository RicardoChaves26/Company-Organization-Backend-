USE company_organization;

-- ==========================================
-- USUARIOS
-- Contraseña por defecto: admin123 (reemplazar por el hash real de bcrypt)
-- ==========================================
INSERT INTO usuarios (nombre, telefono, correo, usuario, password) VALUES 
('Administrador Granja', '88888888', 'admin@granja.com', 'admin', '$2b$10$e8.J5zV/5O3yA3Q/3Z0Z5O8.3G5Z5O8.3G5Z5O8.3G');

-- ==========================================
-- ENCIERROS
-- ==========================================
INSERT INTO encierros (codigo_encierro) VALUES 
('Galpón Principal 01'),
('Galpón Secundario 02');

-- ==========================================
-- LOTES (Prueba)
-- ==========================================
INSERT INTO lotes (encierro_id, fecha, tipo, cantidad, precio, finalizado) VALUES 
(1, CURDATE(), 'Gallina', 500, 250000.00, 0),
(2, CURDATE(), 'Pollo', 300, 150000.00, 0);

-- ==========================================
-- INVENTARIO (Prueba)
-- ==========================================
INSERT INTO inventario (fecha, tipo, unidad, cantidad, precio) VALUES 
(CURDATE(), 'Alimento', 'Kg', 1000.00, 45000.00),
(CURDATE(), 'sacos (Burrucha)', 'sacos', 50.00, 15000.00);

-- ==========================================
-- ALIMENTACIONES (Prueba)
-- ==========================================
INSERT INTO alimentaciones (fecha, hora, encierro_id, tipo, cantidad) VALUES 
(CURDATE(), '07:30:00', 1, 'Alimento', 50.00);

-- ==========================================
-- MANTENIMIENTOS (Prueba)
-- ==========================================
INSERT INTO mantenimientos (fecha, encierro_id, cantidad_sacos) VALUES 
(CURDATE(), 1, 5);

-- ==========================================
-- VENTAS (Prueba)
-- ==========================================
INSERT INTO ventas (fecha, tipo, cantidad, precio_unitario, precio_total) VALUES 
(CURDATE(), 'Huevos', 10, 1500.00, 15000.00);

-- ==========================================
-- FLETES (Prueba)
-- ==========================================
INSERT INTO fletes (fecha, precio) VALUES 
(CURDATE(), 25000.00);