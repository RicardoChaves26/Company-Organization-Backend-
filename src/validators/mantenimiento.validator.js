import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const mantenimientoValidator = [
    body('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('La fecha debe tener el formato YYYY-MM-DD'),
    body('encierro_id')
        .notEmpty()
        .withMessage('El ID del encierro es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El ID del encierro debe ser un número entero positivo'),
    body('cantidad')
        .notEmpty()
        .withMessage('La cantidad es obligatoria')
        .isFloat({ min: 0.01 })
        .withMessage('La cantidad debe ser un número positivo'),

    handleValidationErrors
];