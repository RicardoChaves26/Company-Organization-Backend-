import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const alimentacionValidator = [
    body('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('La fecha debe tener el formato YYYY-MM-DD'),
    body('hora')
        .notEmpty()
        .withMessage('La hora es obligatoria')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('La hora debe tener el formato HH:mm'),
    body('encierro_id')
        .notEmpty()
        .withMessage('El ID del encierro es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El ID del encierro debe ser un número entero positivo'),
    body('tipo')
        .notEmpty()
        .withMessage('El tipo de alimentación es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El tipo de alimentación debe tener entre 3 y 100 caracteres'),
    body('cantidad')
        .notEmpty()
        .withMessage('La cantidad es obligatoria')
        .isFloat({ min: 0.01 })
        .withMessage('La cantidad debe ser un número positivo'),
  
    handleValidationErrors
];