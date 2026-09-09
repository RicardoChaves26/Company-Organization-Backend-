import pool from "../config/database.js";

export const getInventario = async () => {
    const [rows] = await pool.query(
        `SELECT 
            id,
            fecha, 
            tipo, 
            unidad, 
            cantidad,
            precio
        FROM inventario
        ORDER BY id DESC`
    );

    return rows;
};

export const getInventarioById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            fecha, 
            tipo, 
            unidad, 
            cantidad,
            precio
        FROM inventario
        WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const createInventario = async (inventario) => {
    const [result] = await pool.query(
        `INSERT INTO inventario (
            fecha, 
            tipo, 
            unidad,
            cantidad,
            precio
        ) VALUES (?, ?, ?, ?, ?)`,
        [
            inventario.fecha,
            inventario.tipo,
            inventario.unidad,
            inventario.cantidad,
            inventario.precio
        ]
    );

    return result;
};

export const updateInventario = async (id, inventario) => {
    const [result] = await pool.query(
        `UPDATE inventario SET
            fecha = ?,
            tipo = ?,
            unidad = ?,
            cantidad = ?,
            precio = ?
        WHERE id = ?`,
        [
            inventario.fecha,
            inventario.tipo,
            inventario.unidad,
            inventario.cantidad,
            inventario.precio,
            id
        ]
    );

    return result;
};

export const deleteInventario = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM inventario WHERE id = ?`,
        [id]
    );

    return result;
};