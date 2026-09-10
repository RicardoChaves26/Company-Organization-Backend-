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

    const { inventario_id, fecha, hora, encierro_id, tipo, cantidad: cantidadNueva } = alimentacionData;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [alimentaciones] = await connection.query(
            `SELECT 
                id, 
                cantidad 
            FROM alimentaciones 
            WHERE id = ?
            FOR UPDATE`,
            [id]
        );

        if (alimentaciones.length === 0) {
            const error = new Error(`Alimentación con ID ${id} no encontrada`);
            error.status = 404;
            throw error;
        }

        const cantidadAnterior = Number(alimentaciones[0].cantidad);
        const diferencia = cantidadNueva - cantidadAnterior;

        const [rows] = await connection.query(
            `SELECT id, tipo, unidad, cantidad FROM inventario WHERE id = ? FOR UPDATE`,
            [inventario_id]
        );

        if (rows.length === 0) {
            const error = new Error(`Inventario con ID ${inventario_id} no encontrado`);
            error.status = 404;
            throw error;
        }

        const producto = rows[0];

        if (diferencia > 0 && producto.cantidad < diferencia) {
            const error = new Error(
                `Stock insuficiente para el ajuste. Disponible: ${producto.cantidad} ${producto.unidad}, Necesario extra: ${diferencia} ${producto.unidad}`
            );
            error.status = 400;
            throw error;
        }

        await connection.query(
            `UPDATE alimentaciones 
             SET fecha = ?, hora = ?, encierro_id = ?, tipo = ?, cantidad = ?
             WHERE id = ?`,
            [fecha, hora, encierro_id, tipo || producto.tipo, cantidadNueva, id]
        );

        await connection.query(
            `UPDATE inventario 
             SET cantidad = cantidad - ? 
             WHERE id = ?`,
            [diferencia, inventario_id]
        );

        await connection.commit();
        return { id, ...alimentacionData };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }

};

export const deleteAlimentacion = async (id) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [alimentaciones] = await connection.query(
            `SELECT 
                id, 
                cantidad, 
                tipo 
            FROM alimentaciones 
            WHERE id = ?
            FOR UPDATE`,
            [id]
        );

        if (alimentaciones.length === 0) {
            const error = new Error(`Alimentación con ID ${id} no encontrada`);
            error.status = 404;
            throw error;
        }

        const alimentacionAEliminar = alimentaciones[0];
        const cantidadADevolver = Number(alimentacionAEliminar.cantidad);

        const [rows] = await connection.query(
            `SELECT
                id, 
                cantidad 
            FROM inventario 
            WHERE tipo = ? 
            FOR UPDATE`,
            [alimentacionAEliminar.tipo]
        );

        if (rows.length > 0) {
            const inventarioId = rows[0].id;

            await connection.query(
                `UPDATE inventario 
                 SET cantidad = cantidad + ? 
                 WHERE id = ?`,
                [cantidadADevolver, inventarioId]
            );
        }

        await connection.query(
            `DELETE FROM alimentaciones 
            WHERE id = ?`,
            [id]
        );

        await connection.commit();
        return { id, mensaje: "Registro eliminado e inventario reabastecido" };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};