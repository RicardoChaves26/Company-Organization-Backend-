import pool from "../config/database.js";

export const getMantenimiento = async () => {
    const [rows] = await pool.query(
        `SELECT
            id,
            fecha, 
            encierro_id,
            tipo,
            cantidad,
            creado_en
        FROM mantenimientos
        ORDER BY id DESC`
    );

    return rows;
};

export const getMantenimientoById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            fecha, 
            encierro_id,
            tipo,
            cantidad,
            creado_en
        FROM mantenimientos
        WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const createMantenimiento = async (mantenimiento) => {
    const [result] = await pool.query(
        `INSERT INTO mantenimientos (
            fecha, 
            encierro_id,
            tipo,
            cantidad
        ) VALUES (?, ?, ?, ?)`,
        [
            mantenimiento.fecha,
            mantenimiento.encierro_id,
            mantenimiento.tipo,
            mantenimiento.cantidad
        ]
    );

    return result;
};

export const updateMantenimiento = async (id, mantenimiento) => {
    const [result] = await pool.query(
        `UPDATE mantenimientos SET
            fecha = ?, 
            encierro_id = ?,
            tipo = ?,
            cantidad = ?
        WHERE id = ?`,
        [
            mantenimiento.fecha,
            mantenimiento.encierro_id,
            mantenimiento.tipo,
            mantenimiento.cantidad,
            id
        ]
    );

    return result;
};

export const restarStock = async (inventarioId, cantidad, connection = pool) => {
    const [result] = await connection.query(
        `UPDATE inventario
        SET cantidad = cantidad - ?
        WHERE id = ? AND cantidad >= ?`,
        [cantidad, inventarioId, cantidad]
    );

    return result.affectedRows > 0;
}

export const deleteMantenimiento = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM mantenimientos WHERE id = ?`,
        [id]
    );

    return result;
};