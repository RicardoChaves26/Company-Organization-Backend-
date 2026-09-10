import * as usuariosService from '../services/usuario.service.js';
import { exito, error } from '../utils/respuestaJson.js';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosService.getUsuarios();
        exito(res, 'Usuarios obtenidos correctamente', usuarios);
    } catch (err) {
        error(res, 'Error al obtener usuarios', err);
    }
};

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuariosService.getUsuarioById(id);
        exito(res, 'Usuario obtenido correctamente', usuario);
    } catch (err) {
        error(res, `Error al obtener usuario con ID ${id}`, err);
    }  
};

export const createUsuario = async (req, res) => {
    const usuarioData = req.body;
    try {
        const result = await usuariosService.createUsuario(usuarioData);
        exito(res, 'Usuario creado correctamente', { id: result.insertId });
    } catch (err) {
        error(res, 'Error al crear usuario', err);
    }
};

export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioData = req.body;
    try {
        await usuariosService.updateUsuario(id, usuarioData);
        exito(res, 'Usuario actualizado correctamente', { id });
    } catch (err) {
        error(res, `Error al actualizar usuario con ID ${id}`, err);
    }
};

export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await usuariosService.deleteUsuario(id);
        exito(res, 'Usuario eliminado correctamente', { id });
    } catch (err) {
        error(res, `Error al eliminar usuario con ID ${id}`, err);
    }
};