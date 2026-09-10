import * as mantenimientosDao from "../daos/mantenimiento.dao.js";
import { getEncierroById } from "./encierro.service.js";

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

export const createMantemiento = async (mantenimiento) => {
    return await mantenimientosDao.createMantenimiento(mantenimiento);
};

export const updateMantenimiento = async (id, mantenimientoData) => {

    await getMantenimeintoById(id);

    return await mantenimientosDao.updateMantenimiento(id, mantenimientoData);
};

export const deleteMantemiento = async (id) => {
    
    await getEncierroById(id);

    return await mantenimientosDao.deleteMantenimiento(id);
};