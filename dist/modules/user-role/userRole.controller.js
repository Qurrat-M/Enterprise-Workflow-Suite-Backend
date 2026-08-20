"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../../middleware/asyncHandler");
const ApiResponse_1 = require("../../utils/ApiResponse");
const constants_1 = require("../../constants");
const userRole_service_1 = __importDefault(require("./userRole.service"));
class UserRoleController {
    assignRoles = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const roles = await userRole_service_1.default.assignRoles(req.params.userId, req.body.roleIds);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "Roles assigned successfully", roles));
    });
    getUserRoles = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const roles = await userRole_service_1.default.getUserRoles(req.params.userId);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "Roles fetched successfully", roles));
    });
    removeRole = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await userRole_service_1.default.removeRole(req.params.userId, req.params.roleId);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "Role removed successfully"));
    });
}
exports.default = new UserRoleController();
