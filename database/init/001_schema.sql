CREATE DATABASE IF NOT EXISTS company_organization
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE company_organization;

-- ==========================================
-- 1. CONFIGURACIÓN Y USUARIOS
-- ==========================================

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. MÓDULO DE ENCIERROS Y LOTES
-- ==========================================

-- Tabla encierros
CREATE TABLE IF NOT EXISTS encierros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_encierro VARCHAR(50) NOT NULL UNIQUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla lotes
CREATE TABLE IF NOT EXISTS lotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    encierro_id INT NOT NULL,
    fecha DATE NOT NULL,
    tipo ENUM('Gallina', 'Pollo') NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    finalizado TINYINT(1) DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (encierro_id) REFERENCES encierros(id) ON DELETE RESTRICT
);

-- ==========================================
-- 3. MÓDULO DE INVENTARIO Y OPERACIONES
-- ==========================================

-- Tabla inventario
CREATE TABLE IF NOT EXISTS inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla alimentaciones
CREATE TABLE IF NOT EXISTS alimentaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    encierro_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (encierro_id) REFERENCES encierros(id) ON DELETE RESTRICT
);

-- Tabla mantenimientos
CREATE TABLE IF NOT EXISTS mantenimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    encierro_id INT NOT NULL,
    cantidad_sacos INT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (encierro_id) REFERENCES encierros(id) ON DELETE RESTRICT
);

-- ==========================================
-- 4. MÓDULO DE VENTAS Y FLETES
-- ==========================================

-- Tabla ventas
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    tipo ENUM('Huevos', 'Pollo') NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    precio_total DECIMAL(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla fletes
CREATE TABLE IF NOT EXISTS fletes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 5. ÍNDICES DE OPTIMIZACIÓN (INDEXES)
-- ==========================================

-- Índices para búsquedas frecuentes y consultas relacionales
CREATE INDEX idx_lotes_encierro_finalizado ON lotes(encierro_id, finalizado);
CREATE INDEX idx_alimentaciones_encierro_fecha ON alimentaciones(encierro_id, fecha);
CREATE INDEX idx_mantenimientos_encierro_fecha ON mantenimientos(encierro_id, fecha);

-- Índices de rango (Fechas para reportes)
CREATE INDEX idx_inventario_fecha ON inventario(fecha);
CREATE INDEX idx_ventas_fecha ON ventas(fecha);
CREATE INDEX idx_fletes_fecha ON fletes(fecha);