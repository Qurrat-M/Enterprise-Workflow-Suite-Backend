"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const role_controller_1 = require("./role.controller");
const role_schema_1 = require("./role.schema");
const validateRequest_1 = require("../../middleware/validateRequest");
const authorize_1 = require("../../middleware/authorize");
const router = (0, express_1.Router)();
// Get All Roles
router.get("/", authenticate_1.authenticate, (0, authorize_1.authorize)("role.read"), role_controller_1.roleController.getRoles);
// Get Role By Id
router.get("/:id", authenticate_1.authenticate, (0, authorize_1.authorize)("role.read"), role_controller_1.roleController.getRoleById);
// Create Role
router.post("/", authenticate_1.authenticate, ...role_schema_1.createRoleSchema, validateRequest_1.validateRequest, role_controller_1.roleController.createRole);
// Update Role
router.put("/:id", authenticate_1.authenticate, ...role_schema_1.updateRoleSchema, validateRequest_1.validateRequest, role_controller_1.roleController.updateRole);
// Delete Role
router.delete("/:id", authenticate_1.authenticate, (req, res, next) => role_controller_1.roleController.deleteRole(req, res, next));
exports.default = router;
