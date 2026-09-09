import * as alimentacionService from "../services/alimentacion.service.js";
import { exito, error } from "../utils/respuestaJson.js";

export const getAlimentaciones = async (req, res) => {
    try {
        const alimentaciones = await alimentacionService.getAlimentaciones();
        exito(res, "Alimentaciones obtenidas correctamente", alimentaciones);
    } catch (err) {
        error(res, "Error al obtener alimentaciones", err);
    }
};

export const getAlimentacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const alimentacion = await alimentacionService.getAlimentacionById(id);
        exito(res, "Alimentación obtenida correctamente", alimentacion);
    } catch (err) {
        error(res, `Error al obtener alimentación con ID ${id}`, err);
    }
};

export const createAlimentacion = async (req, res) => {
    const alimentacionData = req.body;
    try {
        const result = await alimentacionService.createAlimentacion(alimentacionData);
        exito(res, "Alimentación creada correctamente", { id: result.insertId });
    } catch (err) {
        error(res, "Error al crear alimentación", err);
    }
};

export const updateAlimentacion = async (req, res) => {
    const { id } = req.params;
    const alimentacionData = req.body;
    try {
        await alimentacionService.updateAlimentacion(id, alimentacionData);
        exito(res, "Alimentación actualizada correctamente", { id });
    } catch (err) {
        error(res, `Error al actualizar alimentación con ID ${id}`, err);
    }
};

export const deleteAlimentacion = async (req, res) => {
    const { id } = req.params;
    try {
        await alimentacionService.deleteAlimentacion(id);
        exito(res, "Alimentación eliminada correctamente", { id });
    } catch (err) {
        error(res, `Error al eliminar alimentación con ID ${id}`, err);
    }
};