import * as ventasDao from '../daos/venta.dao.js';

export const getVentas = async () => {
    return await ventasDao.getVentas();
};

export const getVentaById = async (id) => {
    const venta = await ventasDao.getVentaById(id);
    if (!venta) {
        const error = new Error(`Venta con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }
    return venta;
};

export const createVenta = async (venta) => {
    return await ventasDao.createVenta(venta);
};

export const updateVenta = async (id, ventaData) => {

    await getVentaById(id);

    return await ventasDao.updateVenta(id, ventaData);
};

export const deleteVenta = async (id) => {

    await getVentaById(id);

    return await ventasDao.deleteVenta(id);
};