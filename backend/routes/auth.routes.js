import { Router } from "express";
import { register, login, logout, profile, changePassword } from "../controllers/auth.controller.js";
import { authValidation } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authValidation, profile);
router.post("/changePassword", changePassword);

export default router;