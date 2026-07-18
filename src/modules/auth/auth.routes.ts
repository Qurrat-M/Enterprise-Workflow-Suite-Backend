import { Router } from "express";

import authController from "./auth.controller";
import { loginValidation, registerValidation } from "./auth.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { authenticate } from "../../middleware/authenticate";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validateRequest,
  authController.register,
);

router.post("/login", loginValidation, validateRequest, authController.login);

router.get("/me", authenticate, authController.me);

router.post("/logout", authController.logout);

export default router;
