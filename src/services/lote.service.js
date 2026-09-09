import * as loteService from "../daos/lote.dao.js";

export const getLotes = async () => {
    return await loteService.getLotes();
};

export const getLoteById = async (id) => {
    const lote = await loteService.getLoteById(id);
    if (!lote) {
        const error = new Error(`Lote con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }
    return lote;
};

export const createLote = async (lote) => {
    return await loteService.createLote(lote);
};

export const updateLote = async (id, loteData) => {
    
    await getLoteById(id);

    return await loteService.updateLote(id, loteData);
};

export const deleteLote = async (id) => {
    
    await getLoteById(id);

    return await loteService.deleteLote(id);
};
