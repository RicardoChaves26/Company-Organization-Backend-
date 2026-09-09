import * as encierrosService from '../services/encierro.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getEncierros = async (req, res) => {
    try {
        const encierros = await encierrosService.getEncierros();
        exito(res, 'Encierros obtenidos correctamente', encierros);
    } catch (err) {
        error(res, 'Error al obtener encierros', err);
    }
};

export const getEncierroById = async (req, res) => {
    const { id } = req.params;
    try {
        const encierro = await encierrosService.getEncierroById(id);
        exito(res, 'Encierro obtenido correctamente', encierro);
    } catch (err) {
        error(res, `Error al obtener encierro con ID ${id}`, err);
    }  
};

export const createEncierro = async (req, res) => {
    const encierroData = req.body;
    try {
        const result = await encierrosService.createEncierro(encierroData);
        exito(res, 'Encierro creado correctamente', { id: result.insertId });
    } catch (err) {
        error(res, 'Error al crear encierro', err);
    }
};

export const updateEncierro = async (req, res) => {
    const { id } = req.params;
    const encierroData = req.body;
    try {
        await encierrosService.updateEncierro(id, encierroData);
        exito(res, 'Encierro actualizado correctamente', { id });
    } catch (err) {
        error(res, `Error al actualizar encierro con ID ${id}`, err);
    }
};

export const deleteEncierro = async (req, res) => {
    const { id } = req.params;
    try {
        await encierrosService.deleteEncierro(id);
        exito(res, 'Encierro eliminado correctamente', { id });
    } catch (err) {
        error(res, `Error al eliminar encierro con ID ${id}`, err);
    }
};