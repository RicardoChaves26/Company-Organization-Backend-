import { Router } from "express";
import { getLotes, getLoteById, createLote, updateLote, deleteLote } from "../controllers/lote.controller.js";

const router = Router();

router.get("/", getLotes);
router.get("/:id", getLoteById);
router.post("/", createLote);
router.put("/:id", updateLote);
router.delete("/:id", deleteLote);

export default router;