import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const ventaValidator = [
    body('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('La fecha debe tener el formato YYYY-MM-DD'),
    body('tipo')
        .notEmpty()
        .withMessage('El tipo de venta es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El tipo de venta debe tener entre 3 y 100 caracteres'),
    body('cantidad')
        .notEmpty()
        .withMessage('La cantidad es obligatoria')
        .isFloat({ min: 0.01 })
        .withMessage('La cantidad debe ser un número positivo'),
    body('precio_unitario')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número igual o mayor a 0'),
    body('precio_total')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número igual o mayor a 0'),
  
    handleValidationErrors
];