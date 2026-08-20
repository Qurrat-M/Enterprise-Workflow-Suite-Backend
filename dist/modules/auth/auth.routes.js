"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = require("../../middleware/validateRequest");
const authenticate_1 = require("../../middleware/authenticate");
const router = (0, express_1.Router)();
router.post("/register", auth_validation_1.registerValidation, validateRequest_1.validateRequest, auth_controller_1.default.register);
router.post("/login", auth_validation_1.loginValidation, validateRequest_1.validateRequest, auth_controller_1.default.login);
router.get("/me", authenticate_1.authenticate, auth_controller_1.default.me);
router.post("/logout", auth_controller_1.default.logout);
exports.default = router;
