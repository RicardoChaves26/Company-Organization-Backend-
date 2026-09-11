import jwt from 'jsonwebtoken';
import { error } from '../utils/respuestaJson.js';

export const validarSesion = (req, res, next) => {
    try {
        
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return error(res, 'No se proporcionó un token de autenticación. Inicie sesión.', null, 401);
        }

        const secretKey = process.env.JWT_SECRET || 'clave_secreta_de_prueba';
        const decoded = jwt.verify(token, secretKey);

        req.usuario = decoded;

        next();
    } catch (err) {
        return error(res, 'Token inválido o expirado. Inicie sesión nuevamente.', err, 401);
    }
};