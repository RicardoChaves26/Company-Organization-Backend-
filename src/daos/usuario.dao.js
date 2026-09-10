import pool from "../config/database.js";

export const getUsuarios = async () => {
    const [rows] = await pool.query(
        `SELECT
            id,
            nombre, 
            telefono,
            correo,
            usuario,
            password,
            creado_en
        FROM usuarios
        ORDER BY id DESC`
    );

    return rows;
};

export const getUsuarioById = async (id) => {
    const [rows] = await pool.query(
        `SELECT
            id,
            nombre, 
            telefono,
            correo,
            usuario,
            password,
            creado_en
        FROM usuarios
        WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const createUsuario = async (usuario) => {
    const [result] = await pool.query(
        `INSERT INTO usuarios (
            nombre,
            telefono, 
            correo,
            usuario,
            password
        ) VALUES (?, ?, ?, ?, ? )`,
        [
            usuario.nombre,
            usuario.telefono,
            usuario.correo,
            usuario.usuario,
            usuario.password
        ]
    );

    return result;
};

export const updateUsuario = async (id, usuario) => {
    const [result] = await pool.query(
        `UPDATE usuarios SET
            nombre = ?,
            telefono = ?, 
            correo = ?,
            usuario = ?,
            password = ?
        WHERE id = ?`,
        [
            usuario.nombre,
            usuario.telefono,
            usuario.correo,
            usuario.usuario,
            usuario.password,
            id
        ]
    );

    return result;
};

export const deleteUsuario = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM usuarios WHERE id = ?`,
        [id]
    );

    return result;
};