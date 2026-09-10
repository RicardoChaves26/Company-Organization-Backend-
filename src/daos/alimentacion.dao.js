import pool from '../config/database.js';

export const getAlimentaciones = async () => {
    const [rows] = await pool.query(
        `SELECT
            id,
            fecha, 
            hora, 
            encierro_id,
            tipo,
            cantidad,
            creado_en
        FROM alimentaciones
        ORDER BY id DESC`
    );

    return rows;

};

export const getAlimentacionById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            fecha, 
            hora,
            encierro_id,
            tipo,
            cantidad,
            creado_en
        FROM alimentaciones
        WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const createAlimentacion = async (alimentacion) => {
    const { fecha, hora, encierro_id, tipo, cantidad } = alimentacion;
    const [result] = await pool.query(
        `INSERT INTO alimentaciones (
            fecha, 
            hora, 
            encierro_id, 
            tipo, 
            cantidad
        ) VALUES (?, ?, ?, ?, ?)`,
        [
            alimentacion.fecha, 
            alimentacion.hora, 
            alimentacion.encierro_id, 
            alimentacion.tipo, 
            alimentacion.cantidad
        ]
    );

    return result;
};

export const updateAlimentacion = async (id, alimentacion) => {
    const [result] = await pool.query(
        `UPDATE alimentaciones SET
            fecha = ?,
            hora = ?,
            encierro_id = ?,
            tipo = ?,
            cantidad = ?
        WHERE id = ?`,
        [
            alimentacion.fecha,
            alimentacion.hora,
            alimentacion.encierro_id,
            alimentacion.tipo,
            alimentacion.cantidad,
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
};

export const deleteAlimentacion = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM alimentaciones WHERE id = ?`,
        [id]
    );

    return result;
};