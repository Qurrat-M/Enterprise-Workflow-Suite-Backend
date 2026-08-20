"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const validateRequest_1 = require("../../middleware/validateRequest");
const userRole_controller_1 = __importDefault(require("./userRole.controller"));
const userRole_schema_1 = require("./userRole.schema");
const router = (0, express_1.Router)();
router.post("/:userId/roles", authenticate_1.authenticate, userRole_schema_1.assignRolesSchema, validateRequest_1.validateRequest, userRole_controller_1.default.assignRoles);
router.get("/:userId/roles", authenticate_1.authenticate, userRole_controller_1.default.getUserRoles);
router.delete("/:userId/roles/:roleId", authenticate_1.authenticate, userRole_controller_1.default.removeRole);
exports.default = router;
