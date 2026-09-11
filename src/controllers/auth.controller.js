import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const result = await authService.loginService(usuario, password);

        res.status(200).json({
            success: true,
            message: 'Inicio de sesion exitoso',
            data: result
        });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        });
    }
} ;