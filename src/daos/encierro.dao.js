import pool from "../config/database.js";

export const getEncierros = async () => {
    const [rows] = await pool.query(
        `SELECT 
            id, 
            codigo_encierro,
            creado_en
        FROM encierros
        ORDER BY id DESC`
    );
    
    return rows;
};

export const getEncierroById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id, 
            codigo_encierro,
            creado_en
        FROM encierros
        WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const createEncierro = async (encierro) => {
    const [result] = await pool.query(
        `INSERT INTO encierros (
            codigo_encierro
        ) VALUES (?)`,
        [
            encierro.codigo_encierro
        ]
    );

    return result;
};

export const updateEncierro = async (id, encierro) => {
    const [result] = await pool.query(
        `UPDATE encierros SET
            codigo_encierro = ?
        WHERE id = ?`,
        [
            encierro.codigo_encierro,
            id
        ]
    );

    return result;
};

export const deleteEncierro = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM encierros WHERE id = ?`,
        [id]
    );

    return result;
};