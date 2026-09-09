import * as inventarioDao from "../daos/inventario.dao.js";

export const getInventario = async () => {
    return await inventarioDao.getInventario();
};

export const getInventarioById = async (id) => {
    const inventario = await inventarioDao.getInventarioById(id);
    if (!inventario) {
        const error = new Error(`Inventario con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }
    return inventario;
};

export const createInventario = async (inventario) => {
    return await inventarioDao.createInventario(inventario);
};

export const updateInventario = async (id, inventarioData) => {
    
    await getInventarioById(id);

    return await inventarioDao.updateInventario(id, inventarioData);
};

export const deleteInventario = async (id) => {
    
    await getInventarioById(id);

    return await inventarioDao.deleteInventario(id);
};