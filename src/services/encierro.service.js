import * as encierrosDao from '../daos/encierro.dao.js';

export const getEncierros = async () => {
    return await encierrosDao.getEncierros();
};

export const getEncierroById = async (id) => {
    const encierro = await encierrosDao.getEncierroById(id);
    if (!encierro) {
        const error = new Error(`Encierro con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }
    return encierro;
}

export const createEncierro = async (encierro) => {
    return await encierrosDao.createEncierro(encierro);
}

export const updateEncierro = async (id, encierroData) => {

    await getEncierroById(id);

    return await encierrosDao.updateEncierro(id, encierroData);
}

export const deleteEncierro = async (id) => {

    await getEncierroById(id);

    return await encierrosDao.deleteEncierro(id);
}