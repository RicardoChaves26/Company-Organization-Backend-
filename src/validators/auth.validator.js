import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const authValidator = [
    body('usuario')
        .notEmpty()
        .withMessage('El usuario es obligatorio'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),

    handleValidationErrors

];