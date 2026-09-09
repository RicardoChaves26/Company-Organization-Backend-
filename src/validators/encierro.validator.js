import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const encierroValidator = [
    body('codigo_encierro')
        .notEmpty()
        .withMessage('El código del encierro es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El código del encierro debe tener entre 3 y 100 caracteres'),

    handleValidationErrors
    
];