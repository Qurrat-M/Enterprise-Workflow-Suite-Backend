"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permission_controller_1 = __importDefault(require("./permission.controller"));
const permission_schema_1 = require("./permission.schema");
const authenticate_1 = require("../../middleware/authenticate");
const validateRequest_1 = require("../../middleware/validateRequest");
const router = (0, express_1.Router)();
router.get("/", authenticate_1.authenticate, permission_controller_1.default.getPermissions);
router.get("/:id", authenticate_1.authenticate, permission_controller_1.default.getPermissionById);
router.post("/", authenticate_1.authenticate, permission_schema_1.createPermissionSchema, validateRequest_1.validateRequest, permission_controller_1.default.createPermission);
router.put("/:id", authenticate_1.authenticate, permission_schema_1.updatePermissionSchema, validateRequest_1.validateRequest, permission_controller_1.default.updatePermission);
router.delete("/:id", authenticate_1.authenticate, permission_controller_1.default.deletePermission);
exports.default = router;
