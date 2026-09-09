import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const inventarioValidator = [
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
    body('unidad')
        .notEmpty()
        .withMessage('La unidad es obligatoria')
        .isLength({ min: 1, max: 50 })
        .withMessage('La unidad debe tener entre 1 y 50 caracteres'),
    body('cantidad')
        .notEmpty()
        .withMessage('La cantidad es obligatoria')
        .isFloat({ min: 0 })
        .withMessage('La cantidad debe ser un número mayor o igual a 0'),
    body('precio')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número mayor o igual a 0'),
    
    handleValidationErrors
];