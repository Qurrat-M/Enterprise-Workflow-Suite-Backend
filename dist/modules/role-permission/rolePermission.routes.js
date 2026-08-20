"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const validateRequest_1 = require("../../middleware/validateRequest");
const rolePermission_controller_1 = __importDefault(require("./rolePermission.controller"));
const rolePermission_schema_1 = require("./rolePermission.schema");
const authorize_1 = require("../../middleware/authorize");
const router = (0, express_1.Router)();
// Assign Permissions
router.post("/:roleId/permissions", authenticate_1.authenticate, (0, authorize_1.authorize)("role.update"), rolePermission_schema_1.assignPermissionsSchema, validateRequest_1.validateRequest, rolePermission_controller_1.default.assignPermissions);
// Get Role Permissions
router.get("/:roleId/permissions", authenticate_1.authenticate, (0, authorize_1.authorize)("role.read"), rolePermission_controller_1.default.getRolePermissions);
// Remove Permission
router.delete("/:roleId/permissions/:permissionId", authenticate_1.authenticate, (0, authorize_1.authorize)("role.update"), rolePermission_controller_1.default.removePermission);
exports.default = router;
