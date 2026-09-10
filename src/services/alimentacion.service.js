import * as alimentacionDao from "../daos/alimentacion.dao.js";
import pool from "../config/database.js";

export const getAlimentaciones = async () => {
    return await alimentacionDao.getAlimentaciones();
};

export const getAlimentacionById = async (id) => {
    const alimentacion = await alimentacionDao.getAlimentacionById(id);
    if (!alimentacion) {
        const error = new Error(`Alimentación con ID ${id} no encontrada`);
        error.status = 404;
        throw error;
    }
    return alimentacion;
};

export const createAlimentacion = async (alimentacion) => {
    const { inventario_id, fecha, hora, encierro_id, tipo, cantidad } = alimentacion;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [rows] = await connection.query(
            `SELECT 
                id, 
                tipo, 
                unidad, 
                cantidad 
            FROM inventario 
            WHERE id = ? 
            FOR UPDATE`,
            [inventario_id]
        );

        if (rows.length === 0) {
            const error = new Error(`Inventario con ID ${inventario_id} no encontrado`);
            error.status = 404;
            throw error;
        }

        const producto = rows[0];

        if (producto.cantidad < cantidad) {
            const error = new Error(
                `Cantidad insuficiente en el inventario ${inventario_id}`
            );
            error.status = 400;
            throw error;
        }

        const [resultAlimentacion] = await connection.query(
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
                producto.tipo,
                alimentacion.cantidad
            ]
        );

        await connection.query(
            `UPDATE inventario
            SET cantidad = cantidad - ?
            WHERE id = ?`,
            [cantidad, inventario_id]
        );

        await connection.commit();
        return resultAlimentacion;

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

export const updateAlimentacion = async (id, alimentacionData) => {

    await getAlimentacionById(id);

    return await alimentacionDao.updateAlimentacion(id, alimentacionData);
};

export const deleteAlimentacion = async (id) => {

    await getAlimentacionById(id);

    return await alimentacionDao.deleteAlimentacion(id);
};