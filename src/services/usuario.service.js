import * as usuarioDao from '../daos/usuario.dao.js';
import bcrypt from 'bcryptjs';

export const getUsuarios = async () => {
    return await usuarioDao.getUsuarios();
};

export const getUsuarioById = async (id) => {
    const usuario = await usuarioDao.getUsuarioById(id);
    if (!usuario) {
        const error = new Error(`Usuario con ID ${id} no encontrado`);
        error.status = 404;
        throw error;
    }
    return usuario;
}

export const createUsuario = async (usuario) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(usuario.password, salt)

    const nuevoUsuario = {
        ...usuario,
        password: hashedPassword
    };

    return await usuarioDao.createUsuario(nuevoUsuario);
}

export const updateUsuario = async (id, usuarioData) => {

    await getUsuarioById(id);

    return await usuarioDao.updateUsuario(id, usuarioData);
}

export const deleteUsuario = async (id) => {

    await getUsuarioById(id);

    return await usuarioDao.deleteUsuario(id);
}