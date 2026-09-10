import * as mantenimientosDao from "../daos/mantenimiento.dao.js";
import pool from "../config/database.js";

export const getMantenimiento = async () => {
    return await mantenimientosDao.getMantenimiento();
};

export const getMantenimeintoById = async (id) => {
    const mantenimiento = await mantenimientosDao.getMantenimientoById(id);
    if (!mantenimiento) {
        const error = new Error(`Mantenimiento con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }

    return mantenimiento;
};

export const createMantenimiento = async (mantenimiento) => {
    const { inventario_id, fecha, encierro_id, cantidad } = mantenimiento;
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

        if (Number(producto.cantidad) < Number(cantidad)) {
            const error = new Error(
                `Cantidad insuficiente en el inventario ${inventario_id}. Disponible: ${producto.cantidad} ${producto.unidad}`
            );
            error.status = 400;
            throw error;
        }

        const [resultMantenimiento] = await connection.query(
            `INSERT INTO mantenimientos (
                fecha, 
                encierro_id,
                tipo,
                cantidad
            ) VALUES (?, ?, ?, ?)`,

            [
                mantenimiento.fecha,
                mantenimiento.encierro_id,
                producto.tipo,
                mantenimiento.cantidad
            ]
        );

        await connection.query(
            `UPDATE inventario
            SET cantidad = cantidad - ?
            WHERE id = ?`,
            [cantidad, inventario_id]
        );

        await connection.commit();
        return resultMantenimiento;

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

export const updateMantenimiento = async (id, mantenimientoData) => {

    const { inventario_id, fecha, encierro_id, tipo, cantidad: cantidadNueva } = mantenimientoData;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [mantenimiento] = await connection.query(
            `SELECT 
                id, 
                cantidad
            FROM mantenimientos 
            WHERE id = ?
            FOR UPDATE`,
            [id]
        );

        if (mantenimiento.length === 0) {
            const error = new Error(`Mantenimiento con ID ${id} no encontrada`);
            error.status = 404;
            throw error;
        }

        const cantidadAnterior = Number(mantenimiento[0].cantidad);
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
            `UPDATE mantenimientos 
             SET fecha = ?, encierro_id = ?, tipo = ?, cantidad = ?
             WHERE id = ?`,
            [fecha, encierro_id, tipo || producto.tipo, cantidadNueva, id]
        );

        await connection.query(
            `UPDATE inventario 
             SET cantidad = cantidad - ? 
             WHERE id = ?`,
            [diferencia, inventario_id]
        );

        await connection.commit();
        return { id, ...mantenimientoData };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }

};

export const deleteMantenimiento = async (id, inventario_id) => {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [mantenimiento] = await connection.query(
            `SELECT 
                id, 
                cantidad,
                tipo
            FROM mantenimientos 
            WHERE id = ?
            FOR UPDATE`,
            [id]
        );

        if (mantenimiento.length === 0) {
            const error = new Error(`Mantenimiento con ID ${id} no encontrada`);
            error.status = 404;
            throw error;
        }

        const mantenimientoAEliminar = mantenimiento[0];
        const cantidadADevolver = Number(mantenimientoAEliminar.cantidad);

        const [rows] = await connection.query(
            `SELECT 
                id, 
                cantidad 
            FROM inventario 
            WHERE tipo = ? 
            FOR UPDATE`,
            [mantenimientoAEliminar.tipo]
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
            `DELETE FROM mantenimientos 
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