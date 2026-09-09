import * as alimentacionDao from "../daos/alimentacion.dao.js";

export const getAlimentaciones = async () => {
    return await alimentacionDao.getAlimentaciones();
};

export const getAlimentacionById = async (id) => {
    const alimentacion = await alimentacionDao.getAlimentacionById(id);
    if (!alimentacion) {
        const error = new Error(`Alimentación con ID ${id} no encontrada`);
        error.status = 404;
        throw error;
    }
    return alimentacion;
};  

export const createAlimentacion = async (alimentacion) => {
    return await alimentacionDao.createAlimentacion(alimentacion);
};

export const updateAlimentacion = async (id, alimentacionData) => {
    
    await getAlimentacionById(id);

    return await alimentacionDao.updateAlimentacion(id, alimentacionData);
};

export const deleteAlimentacion = async (id) => {

    await getAlimentacionById(id);

    return await alimentacionDao.deleteAlimentacion(id);
};