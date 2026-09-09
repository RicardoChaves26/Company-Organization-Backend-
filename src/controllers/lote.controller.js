import * as loteService from "../services/lote.service.js";
import { exito, error } from "../utils/respuestaJson.js";

export const getLotes = async (req, res) => {
    try {
        const lotes = await loteService.getLotes();
        exito(res, "Lotes obtenidos correctamente", lotes);
    } catch (err) {
        error(res, "Error al obtener lotes", err);
    }
};

export const getLoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const lote = await loteService.getLoteById(id);
        exito(res, "Lote obtenido correctamente", lote);
    } catch (err) {
        error(res, `Error al obtener lote con ID ${id}`, err);
    }
};

export const createLote = async (req, res) => {
    const loteData = req.body;
    try {
        const result = await loteService.createLote(loteData);
        exito(res, "Lote creado correctamente", { id: result.insertId, ...loteData, finalizado: 0 }, 201);
    } catch (err) {
        error(res, "Error al crear lote", err);
    }
};

export const updateLote = async (req, res) => {
    const { id } = req.params;
    const loteData = req.body;
    try {
        await loteService.updateLote(id, loteData);
        exito(res, "Lote actualizado correctamente", { id });
    } catch (err) {
        error(res, `Error al actualizar lote con ID ${id}`, err);
    }
};

export const finalizeLote = async (req, res) => {
    const { id } = req.params;
    try {
        await loteService.finalizeLote(id);
        exito(res, "Lote finalizado correctamente", { id, finalizado: 1 });
    } catch (err) {
        error(res, `Error al finalizar lote con ID ${id}`, err);
    }
};

export const deleteLote = async (req, res) => {
    const { id } = req.params;
    try {
        await loteService.deleteLote(id);
        exito(res, "Lote eliminado correctamente", { id });
    } catch (err) {
        error(res, `Error al eliminar lote con ID ${id}`, err);
    }
};