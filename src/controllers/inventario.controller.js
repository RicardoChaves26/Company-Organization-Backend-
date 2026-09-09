import * as inventarioService from "../services/inventario.service.js";
import { exito, error } from "../utils/respuestaJson.js";

export const getInventario = async (req, res) => {
    try {
        const inventario = await inventarioService.getInventario();
        exito(res, "Inventario obtenido correctamente", inventario);
    } catch (err) {
        error(res, "Error al obtener inventario", err);
    }
};

export const getInventarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const inventario = await inventarioService.getInventarioById(id);
        exito(res, "Inventario obtenido correctamente", inventario);
    } catch (err) {
        error(res, `Error al obtener inventario con ID ${id}`, err);
    }
};

export const createInventario = async (req, res) => {
    const inventarioData = req.body;
    try {
        const result = await inventarioService.createInventario(inventarioData);
        exito(res, "Inventario creado correctamente", { id: result.insertId });
    } catch (err) {
        error(res, "Error al crear inventario", err);
    }
};

export const updateInventario = async (req, res) => {
    const { id } = req.params;
    const inventarioData = req.body;
    try {
        await inventarioService.updateInventario(id, inventarioData);
        exito(res, "Inventario actualizado correctamente", { id });
    } catch (err) {
        error(res, `Error al actualizar inventario con ID ${id}`, err);
    }
};

export const deleteInventario = async (req, res) => {
    const { id } = req.params;
    try {
        await inventarioService.deleteInventario(id);
        exito(res, "Inventario eliminado correctamente", { id });
    } catch (err) {
        error(res, `Error al eliminar inventario con ID ${id}`, err);
    }
};