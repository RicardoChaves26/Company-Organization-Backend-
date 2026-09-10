import pool from "../config/database.js";

export const getVentas = async () => {
    const [rows] = await pool.query(
        `SELECT 
            id,
            fecha, 
            tipo,
            cantidad,
            precio_unitario,
            precio_total,
            creado_en
        FROM ventas
        ORDER BY id DESC`
    );
    
    return rows;
};

export const getVentaById = async (id) => {
    const [rows] = await pool.query(
        `SELECT 
            id,
            fecha, 
            tipo,
            cantidad,
            precio_unitario,
            precio_total,
            creado_en
        FROM ventas
        WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const createVenta = async (venta) => {
    const [result] = await pool.query(
        `INSERT INTO ventas (
            fecha, 
            tipo,
            cantidad,
            precio_unitario,
            precio_total
        ) VALUES (?, ?, ?, ?, ?)`,
        [
            venta.fecha,
            venta.tipo,
            venta.cantidad,
            venta.precio_unitario,
            venta.precio_total

        ]
    );

    return result;
};

export const updateVenta = async (id, venta) => {
    const [result] = await pool.query(
        `UPDATE ventas SET
            fecha = ?, 
            tipo = ?,
            cantidad = ?,
            precio_unitario = ?,
            precio_total = ?
        WHERE id = ?`,
        [
            venta.fecha,
            venta.tipo,
            venta.cantidad,
            venta.precio_unitario,
            venta.precio_total,
            id
        ]
    );

    return result;
};

export const deleteVenta = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM ventas WHERE id = ?`,
        [id]
    );

    return result;
};