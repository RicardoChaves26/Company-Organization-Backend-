import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const usuarioValidator = [
    body('nombre')
        .notEmpty()
        .withMessage('La nombre es obligatoria')
        .isLength({ min: 3, max: 100 })
        .withMessage('El tipo de alimentación debe tener entre 3 y 100 caracteres'),
    body('telefono')
        .notEmpty()
        .withMessage('El telefono es obligatoria')
        .matches(/^(?:\+?506\s?)?[24678]\d{3}[-\s]?\d{4}$/)
        .withMessage('El número de teléfono debe ser un formato válido de Costa Rica (ej. 88888888 o +506 8888-8888)'),
    body('correo')
        .notEmpty()
        .withMessage('El correo del usuario es obligatorio')
        .trim()
        .isEmail()
        .withMessage('Debe ingresar un correo electrónico válido (ej. usuario@dominio.com)')
        .normalizeEmail(),
    body('usuario')
        .notEmpty()
        .withMessage('El usuario es obligatorio')
        .isLength({ min: 4, max: 10 })
        .withMessage('El usuario debe tener entre 4 y 10 caracteres'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres en total'),
  
    handleValidationErrors
];