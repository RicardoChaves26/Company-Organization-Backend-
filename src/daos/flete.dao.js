import pool from "../config/database.js";

export const getFlete = async () => {
    const [rows] = await pool.query(
        `SELECT
            id, 
            fecha,
            precio, 
            creado_en
        FROM fletes
        ORDER BY id DESC`
    );

    return rows;
};

export const getFleteById = async (id) => {
    const [rows] = await pool.query(
        `SELECT 
            id, 
            fecha, 
            precio,
            creado_en
        FROM fletes
        WHERE id = ?`,
        [id]
    ); 

    if (rows.length === 0) {
        return null;
    } 

    return rows[0];
};

export const createFlete = async (flete) => {
    const [result] = await pool.query(
        `INSERT INTO fletes (
            fecha, 
            precio
        ) VALUES (?, ?)`,
        [
            flete.fecha,
            flete.precio
        ]
    );

    return result;
};

export const updateFlete = async (id, flete) => {
    const [result] = await pool.query(
        `UPDATE fletes SET
            fecha = ?, 
            precio = ?
        WHERE id = ?`,
        [
            flete.fecha,
            flete.precio,
            id
        ]
    );

    return result;
};

export const deleteFlete = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM fletes WHERE id = ?`,
        [id]
    );

    return result;
};