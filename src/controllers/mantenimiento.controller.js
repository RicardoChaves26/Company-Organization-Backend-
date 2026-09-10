import * as mantenimientosService from "../services/mantenimiento.service.js";
import { exito, error } from "../utils/respuestaJson.js";

export const getMantenimiento = async (req, res) => {
    try {
        const mantenimiento = await mantenimientosService.getMantenimiento();
        exito(res, 'Mantenimiento obtenidos correctamente', mantenimiento);
    } catch (err) {
        error(res, 'Error al obtener mantenimientos', err);
    }
};

export const getMantenimientoById = async (req, res) => {
    const { id } = req.params;
    try {
        const mantenimiento = await mantenimientosService.getMantenimeintoById(id);
        exito(res, 'Mantenimiento obtenido correctamente', mantenimiento);
    } catch (err) {
        error(res, `Error al obtener mantenimiento con ID ${id}`, err);
    }  
};

export const createMantenimiento = async (req, res) => {
    const mantenimientoData = req.body;
    try {
        const result = await mantenimientosService.createMantemiento(mantenimientoData);
        exito(res, 'Mantemiento creado correctamente', { id: result.insertId });
    } catch (err) {
        error(res, 'Error al crear mantenimiento', err);
    }
};

export const updateMantenimiento = async (req, res) => {
    const { id } = req.params;
    const mantenimientoData = req.body;
    try {
        await mantenimientosService.updateMantenimiento(id, mantenimientoData);
        exito(res, 'Mantenimiento actualizado correctamente', { id });
    } catch (err) {
        error(res, `Error al actualizar mantenimiento con ID ${id}`, err);
    }
};

export const deleteMantenimiento = async (req, res) => {
    const { id } = req.params;
    try {
        await mantenimientosService.deleteMantemiento(id);
        exito(res, 'Mantenimiento eliminado correctamente', { id });
    } catch (err) {
        error(res, `Error al eliminar mantenimiento con ID ${id}`, err);
    }
};
