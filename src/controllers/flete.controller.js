import * as fletesService from '../services/flete.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getFletes = async (req, res) => {
    try {
        const fletes = await fletesService.getFletes();
        exito(res, 'Fletes obtenidos correctamente', fletes);
    } catch (err) {
        error(res, 'Erros al obtener fletes', err);
    }
};

export const getFletesById = async (req, res) => {
    const { id } = req.params;
    try { 
        const fletes = await fletesService.getFleteById(id);
        exito(res, 'Flete obtenido correctamente', fletes);
    } catch (err) {
        error(res, `Error al obtener el flete con ID ${id}`, err);
    }
};

export const createFlete = async (req, res) => {
    const fleteData = req.body;
    try {
        const resutl = await fletesService.createFlete(fleteData);
        exito(res, 'Flete creado correctamente', { id: resutl.insertId });
    } catch (err) {
        error(res, 'Error al crear flete', err);
    }
};

export const updateFlete = async (req, res) => {
    const { id } = req.params;
    const fleteData = req.body;
    try {
        await fletesService.updateFlete(id, fleteData);
        exito(res, 'Flete actualizado correctamente', { id });
    } catch (err) {
        error(res, `Error al actualizar flete con ID ${id}`, err);
    }
};

export const deleteFlete = async (req, res) => {
    const { id } = req.params;
    try {
        await fletesService.deleteFlete(id);
        exito(res, 'Flete eliminado correctamente', { id });
    } catch (err) {
        error(res, `Error al eliminar flete con ID ${id}`, err);
    }
};