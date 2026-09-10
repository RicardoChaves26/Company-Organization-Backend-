import { Router } from "express";
import { getVentas, getVentaById, createVenta, updateVenta, deleteVenta } from "../controllers/venta.controller.js";
import { ventaValidator } from "../validators/venta.validator.js";

const router = Router();

router.get("/", getVentas);
router.get("/:id", getVentaById);
router.post("/", ventaValidator, createVenta);
router.put("/:id", ventaValidator, updateVenta);
router.delete("/:id", deleteVenta);

export default router;