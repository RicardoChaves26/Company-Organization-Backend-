import pool from '../config/database.js';

export const getLotes = async () => {
    const [rows] = await pool.query(
        `SELECT
            id,
            encierro_id,
            fecha, 
            tipo, 
            cantidad, 
            precio, 
            finalizado,
            creado_en
        FROM lotes
        ORDER BY id DESC`
    );

    return rows;
};

export const getLoteById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            encierro_id,
            fecha,
            tipo,
            cantidad,
            precio,
            finalizado,
            creado_en
        FROM lotes
        WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const createLote = async (lote) => {

    const [result] = await pool.query(
        `INSERT INTO lotes (
            encierro_id,
            fecha,
            tipo,
            cantidad, 
            precio,
            finalizado
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
            lote.encierro_id,
            lote.fecha,
            lote.tipo,
            lote.cantidad,
            lote.precio,
            0
        ]
    );

    return result;
};

export const updateLote = async (id, lote) => {
    const [result] = await pool.query(
        `UPDATE lotes SET
            encierro_id = ?,
            fecha = ?,
            tipo = ?,
            cantidad = ?,
            precio = ?
        WHERE id = ?`,
        [
            lote.encierro_id,
            lote.fecha,
            lote.tipo,
            lote.cantidad,
            lote.precio,
            id
        ]
    );

    return result;
};

export const finalizeLote = async (id) => {
    const [result] = await pool.query(
        `UPDATE lotes SET finalizado = 1 WHERE id = ?`,
        [id]
    );
    return result;
};


export const deleteLote = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM lotes WHERE id = ?`,
        [id]
    );

    return result;
};