import * as fletesDao from "../daos/flete.dao.js";

export const getFletes = async () => {
    return await fletesDao.getFlete();
};

export const getFleteById = async (id) => {
    const flete = await fletesDao.getFleteById(id);
    if (!flete) {
        const error = new Error(`Flete con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }

    return flete;
};

export const createFlete = async (flete) => {
    return await fletesDao.createFlete(flete);
};

export const updateFlete = async (id, fleteData) => {
    
    await getFleteById(id);

    return await fletesDao.updateFlete(id, fleteData);
};

export const deleteFlete = async (id) => {

    await getFleteById(id);

    return await fletesDao.deleteFlete(id);
    
};