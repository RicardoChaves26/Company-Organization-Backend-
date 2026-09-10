import pool from "../config/database.js";

export const getMantenimiento = async () => {
    const [rows] = await pool.query(
        `SELECT
            id,
            fecha, 
            encierro_id,
            cantidad_sacos,
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
            cantidad_sacos,
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
            cantidad_sacos
        ) VALUES (?, ?, ?)`,
        [
            mantenimiento.fecha,
            mantenimiento.encierro_id,
            mantenimiento.cantidad_sacos
        ]
    );

    return result;
};

export const updateMantenimiento = async (id, mantenimiento) => {
    const [result] = await pool.query(
        `UPDATE mantenimientos SET
            fecha = ?, 
            encierro_id = ?,
            cantidad_sacos = ?
        WHERE id = ?`,
        [
            mantenimiento.fecha,
            mantenimiento.encierro_id,
            mantenimiento.cantidad_sacos,
            id
        ]
    );

    return result;
};

export const deleteMantenimiento = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM mantenimientos WHERE id = ?`,
        [id]
    );

    return result;
};