import { Router } from "express";
import { getMantenimiento, getMantenimientoById, createMantenimiento, updateMantenimiento, deleteMantenimiento } from "../controllers/mantenimiento.controller.js";
import { mantenimientoValidator } from "../validators/mantenimiento.validator.js";

const router = Router();

router.get("/", getMantenimiento);
router.get("/:id", getMantenimientoById);
router.post("/", mantenimientoValidator, createMantenimiento);
router.put("/:id", mantenimientoValidator, updateMantenimiento);
router.delete("/:id", deleteMantenimiento);

export default router;