import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { authValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/login", authValidator, login);

export default router;