"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organization_controller_1 = __importDefault(require("./organization.controller"));
const organization_schema_1 = require("../../docs/schemas/organization.schema");
const authenticate_1 = require("../../middleware/authenticate");
const validateRequest_1 = require("../../middleware/validateRequest");
const router = (0, express_1.Router)();
router.get("/", authenticate_1.authenticate, organization_controller_1.default.getOrganizations);
router.get("/:id", authenticate_1.authenticate, organization_controller_1.default.getOrganizationById);
router.post("/", authenticate_1.authenticate, organization_schema_1.createOrganizationSchema, validateRequest_1.validateRequest, organization_controller_1.default.createOrganization);
router.put("/:id", authenticate_1.authenticate, organization_schema_1.updateOrganizationSchema, validateRequest_1.validateRequest, organization_controller_1.default.updateOrganization);
router.patch("/:id/status", authenticate_1.authenticate, organization_schema_1.updateOrganizationStatusSchema, validateRequest_1.validateRequest, organization_controller_1.default.updateOrganizationStatus);
router.delete("/:id", authenticate_1.authenticate, organization_controller_1.default.deleteOrganization);
exports.default = router;
