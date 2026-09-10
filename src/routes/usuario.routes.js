import { Router } from "express";
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuario.controller.js";
import { usuarioValidator } from "../validators/usuario.validator.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", usuarioValidator, createUsuario);
router.put("/:id", usuarioValidator, updateUsuario);
router.delete("/:id", deleteUsuario);

export default router;