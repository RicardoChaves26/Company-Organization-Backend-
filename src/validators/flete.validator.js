import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const fleteValidator = [
    body('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('La fecha debe tener el formato YYYY-MM-DD'),
    body('precio')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número igual o mayor a 0'),
    
    handleValidationErrors
];