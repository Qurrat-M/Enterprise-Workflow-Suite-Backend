import { Router } from "express";

import { authRoutes } from "../modules/auth";
import aiRoutes from "./ai.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/ai", aiRoutes);

export default router;
