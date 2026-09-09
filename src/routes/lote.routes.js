import { Router } from "express";
import { getLotes, getLoteById, createLote, updateLote, finalizeLote, deleteLote } from "../controllers/lote.controller.js";
import { loteValidator } from "../validators/lote.validator.js";

const router = Router();

router.get("/", getLotes);
router.get("/:id", getLoteById);
router.post("/", loteValidator, createLote);
router.put("/:id", loteValidator, updateLote);
router.patch("/:id/finalizar", loteValidator, finalizeLote);
router.delete("/:id", deleteLote);

export default router;