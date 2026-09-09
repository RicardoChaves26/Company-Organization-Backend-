import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const loteValidator = [
    body('encierro_id')
        .notEmpty()
        .withMessage('El ID del encierro es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El ID del encierro debe ser un número entero positivo'),
    body('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria')
        .isISO8601()
        .withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),
    body('tipo')
        .notEmpty()
        .withMessage('El tipo es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El tipo debe tener entre 3 y 100 caracteres'),
    body('cantidad')
        .notEmpty()
        .withMessage('La cantidad es obligatoria')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero positivo'),
    body('precio')
        .notEmpty() 
        .withMessage('El precio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número decimal positivo'),
    body('finalizado')
        .optional()
        .isBoolean()
        .withMessage('El valor de finalizado debe ser verdadero o falso'),
    
    handleValidationErrors
];