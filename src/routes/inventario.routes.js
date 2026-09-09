import { Router } from "express";
import { getInventario, getInventarioById, createInventario, updateInventario, deleteInventario } from "../controllers/inventario.controller.js";
import { inventarioValidator } from "../validators/inventario.validator.js";

const router = Router();

router.get("/", getInventario);
router.get("/:id", getInventarioById);
router.post("/", inventarioValidator, createInventario);
router.put("/:id", inventarioValidator, updateInventario);
router.delete("/:id", deleteInventario);

export default router;