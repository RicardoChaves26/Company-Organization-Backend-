import { Router } from "express";
import { getFletes, getFletesById, createFlete, updateFlete, deleteFlete } from "../controllers/flete.controller.js";
import { fleteValidator } from "../validators/flete.validator.js";

const router = Router();

router.get("/", getFletes);
router.get("/:id", getFletesById);
router.post("/", fleteValidator, createFlete);
router.put("/:id", fleteValidator, updateFlete);
router.delete("/:id", deleteFlete);

export default router;