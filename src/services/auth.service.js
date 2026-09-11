import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as usuarioDao from "../daos/usuario.dao.js";

export const loginService = async (usuario, password) => {
    const user = await usuarioDao.getUsuarioByUsername(usuario);

    if (!user) {
        throw new Error('Credenciales invalidas');
    }

    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
        throw new Error('Credenciales inválidas');
    }

    const payload = {
        id: user.id,
        usuario: user.usuario,
        correo: user.correo
    };

    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    delete user.password;
    return { token, user };
};