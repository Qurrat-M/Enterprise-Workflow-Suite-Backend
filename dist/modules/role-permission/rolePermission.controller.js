"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../../middleware/asyncHandler");
const ApiResponse_1 = require("../../utils/ApiResponse");
const constants_1 = require("../../constants");
const rolePermission_service_1 = __importDefault(require("./rolePermission.service"));
class RolePermissionController {
    assignPermissions = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { roleId } = req.params;
        const { permissionIds } = req.body;
        const permissions = await rolePermission_service_1.default.assignPermissions(roleId, permissionIds);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "Permissions assigned successfully", permissions));
    });
    getRolePermissions = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { roleId } = req.params;
        const permissions = await rolePermission_service_1.default.getRolePermissions(roleId);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "Permissions fetched successfully", permissions));
    });
    removePermission = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { roleId, permissionId } = req.params;
        await rolePermission_service_1.default.removePermission(roleId, permissionId);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "Permission removed successfully"));
    });
}
exports.default = new RolePermissionController();
