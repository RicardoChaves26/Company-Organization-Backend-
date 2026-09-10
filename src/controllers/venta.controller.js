import * as ventasService from '../services/venta.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getVentas = async (req, res) => {
    try {
        const ventas = await ventasService.getVentas();
        exito(res, 'Venta obtenidos correctamente', ventas);
    } catch (err) {
        error(res, 'Error al obtener ventas', err);
    }
};

export const getVentaById = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await ventasService.getVentaById(id);
        exito(res, 'Venta obtenido correctamente', venta);
    } catch (err) {
        error(res, `Error al obtener venta con ID ${id}`, err);
    }  
};

export const createVenta = async (req, res) => {
    const ventaData = req.body;
    try {
        const result = await ventasService.createVenta(ventaData);
        exito(res, 'Venta creado correctamente', { id: result.insertId });
    } catch (err) {
        error(res, 'Error al crear venta', err);
    }
};

export const updateVenta = async (req, res) => {
    const { id } = req.params;
    const ventaData = req.body;
    try {
        await ventasService.updateVenta(id, ventaData);
        exito(res, 'Venta actualizado correctamente', { id });
    } catch (err) {
        error(res, `Error al actualizar venta con ID ${id}`, err);
    }
};

export const deleteVenta = async (req, res) => {
    const { id } = req.params;
    try {
        await ventasService.deleteVenta(id);
        exito(res, 'Venta eliminado correctamente', { id });
    } catch (err) {
        error(res, `Error al eliminar venta con ID ${id}`, err);
    }
};