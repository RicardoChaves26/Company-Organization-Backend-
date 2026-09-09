import { Router } from "express";
import { getAlimentaciones, getAlimentacionById, createAlimentacion, updateAlimentacion, deleteAlimentacion } from "../controllers/alimentacion.controller.js";
import { alimentacionValidator } from "../validators/alimentacion.validator.js";

const router = Router();

router.get("/", getAlimentaciones);
router.get("/:id", getAlimentacionById);
router.post("/", alimentacionValidator, createAlimentacion);
router.put("/:id", alimentacionValidator, updateAlimentacion);
router.delete("/:id", deleteAlimentacion);

export default router;