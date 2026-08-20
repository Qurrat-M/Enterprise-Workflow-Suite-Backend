"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganization = exports.updateOrganizationStatus = exports.updateOrganization = exports.getOrganizationById = exports.getOrganizations = exports.createOrganization = void 0;
const organization_service_1 = __importDefault(require("./organization.service"));
const createOrganization = async (req, res) => {
    try {
        const organization = await organization_service_1.default.createOrganization(req.body);
        res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: organization,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create organization";
        if (message === "Organization code already exists") {
            res.status(409).json({
                success: false,
                message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.createOrganization = createOrganization;
const getOrganizations = async (req, res) => {
    try {
        const organizations = await organization_service_1.default.getOrganizations(req.query);
        res.status(200).json({
            success: true,
            message: "Organizations retrieved successfully",
            data: organizations,
        });
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to retrieve organizations";
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.getOrganizations = getOrganizations;
const getOrganizationById = async (req, res) => {
    try {
        const organization = await organization_service_1.default.getOrganizationById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Organization retrieved successfully",
            data: organization,
        });
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to retrieve organization";
        if (message === "Organization not found") {
            res.status(404).json({
                success: false,
                message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.getOrganizationById = getOrganizationById;
const updateOrganization = async (req, res) => {
    try {
        const organization = await organization_service_1.default.updateOrganization(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Organization updated successfully",
            data: organization,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update organization";
        if (message === "Organization not found") {
            res.status(404).json({
                success: false,
                message,
            });
            return;
        }
        if (message === "Organization code already exists") {
            res.status(409).json({
                success: false,
                message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.updateOrganization = updateOrganization;
const updateOrganizationStatus = async (req, res) => {
    try {
        const organization = await organization_service_1.default.updateOrganizationStatus(req.params.id, req.body.status);
        res.status(200).json({
            success: true,
            message: "Organization status updated successfully",
            data: organization,
        });
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Failed to update organization status";
        if (message === "Organization not found") {
            res.status(404).json({
                success: false,
                message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.updateOrganizationStatus = updateOrganizationStatus;
const deleteOrganization = async (req, res) => {
    try {
        await organization_service_1.default.deleteOrganization(req.params.id);
        res.status(200).json({
            success: true,
            message: "Organization deleted successfully",
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete organization";
        if (message === "Organization not found") {
            res.status(404).json({
                success: false,
                message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message,
        });
    }
};
exports.deleteOrganization = deleteOrganization;
exports.default = {
    createOrganization: exports.createOrganization,
    getOrganizations: exports.getOrganizations,
    getOrganizationById: exports.getOrganizationById,
    updateOrganization: exports.updateOrganization,
    updateOrganizationStatus: exports.updateOrganizationStatus,
    deleteOrganization: exports.deleteOrganization,
};
