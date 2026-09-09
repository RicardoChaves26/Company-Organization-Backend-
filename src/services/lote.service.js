import * as lotesDao from "../daos/lote.dao.js";

const formatearLote = (lote) => {
    if (!lote) return null;
    return {
        ...lote,
        estado: lote.finalizado === 1 ? 'Inactivo' : 'Activo',
        es_finalizado: Boolean(lote.finalizado)
    };
};

export const getLotes = async () => {
    const lotes = await lotesDao.getLotes();
    return lotes.map(formatearLote);
};

export const getLoteById = async (id) => {
    const lote = await lotesDao.getLoteById(id);
    if (!lote) {
        const error = new Error(`Lote con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }
    return formatearLote(lote);
};

export const createLote = async (lote) => {
    return await lotesDao.createLote(lote);
};

export const updateLote = async (id, loteData) => {
    
    await getLoteById(id);

    return await lotesDao.updateLote(id, loteData);
};

export const finalizeLote = async (id) => {
    const lote = await getLoteById(id);
    if (lote.es_finalizado) {
        const error = new Error(`Lote con ID ${id} ya está finalizado`);
        error.status = 400;
        throw error;
    }
    return await lotesDao.finalizeLote(id);
};

export const deleteLote = async (id) => {
    
    await getLoteById(id);

    return await lotesDao.deleteLote(id);
};
