"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permission_service_1 = __importDefault(require("./permission.service"));
const ApiResponse_1 = require("../../utils/ApiResponse");
const constants_1 = require("../../constants");
class PermissionController {
    async createPermission(req, res, next) {
        try {
            const { module, action, display_name, description } = req.body;
            const permission = await permission_service_1.default.createPermission(module, action, display_name, description);
            res
                .status(constants_1.HTTP_STATUS.CREATED)
                .json(new ApiResponse_1.ApiResponse(true, "Permission created successfully", permission));
        }
        catch (error) {
            next(error);
        }
    }
    async getPermissions(req, res, next) {
        try {
            const permissions = await permission_service_1.default.getPermissions(req.query);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Permissions fetched successfully", permissions));
        }
        catch (error) {
            next(error);
        }
    }
    async getPermissionById(req, res, next) {
        try {
            const permission = await permission_service_1.default.getPermissionById(req.params.id);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Permission fetched successfully", permission));
        }
        catch (error) {
            next(error);
        }
    }
    async updatePermission(req, res, next) {
        try {
            const { module, action, display_name, description } = req.body;
            const permission = await permission_service_1.default.updatePermission(req.params.id, module, action, display_name, description);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Permission updated successfully", permission));
        }
        catch (error) {
            next(error);
        }
    }
    async deletePermission(req, res, next) {
        try {
            await permission_service_1.default.deletePermission(req.params.id);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Permission deleted successfully"));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new PermissionController();
