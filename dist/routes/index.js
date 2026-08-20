"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../modules/auth");
const router = (0, express_1.Router)();
router.use("/auth", auth_1.authRoutes);
exports.default = router;
