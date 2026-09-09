import { Router } from "express";
import { getEncierros, getEncierroById, createEncierro, updateEncierro, deleteEncierro } from "../controllers/encierro.controller.js";
import { encierroValidator } from "../validators/encierro.validator.js";

const router = Router();

router.get("/", getEncierros);
router.get("/:id", getEncierroById);
router.post("/", encierroValidator, createEncierro);
router.put("/:id", encierroValidator, updateEncierro);
router.delete("/:id", deleteEncierro);

export default router;