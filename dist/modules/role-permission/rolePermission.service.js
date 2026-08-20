"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../../utils/ApiError");
const constants_1 = require("../../constants");
const rolePermission_repository_1 = __importDefault(require("./rolePermission.repository"));
const role_repository_1 = require("../roles/role.repository");
const permission_repository_1 = __importDefault(require("../permissions/permission.repository"));
class RolePermissionService {
    async assignPermissions(roleId, permissionIds) {
        const role = await role_repository_1.roleRepository.findRoleById(roleId);
        if (!role) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Role not found");
        }
        for (const permissionId of permissionIds) {
            const permission = await permission_repository_1.default.findById(permissionId);
            if (!permission) {
                throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, `Permission ${permissionId} not found`);
            }
        }
        await rolePermission_repository_1.default.assignPermissions(roleId, permissionIds);
        return rolePermission_repository_1.default.getRolePermissions(roleId);
    }
    async getRolePermissions(roleId) {
        const role = await role_repository_1.roleRepository.findRoleById(roleId);
        if (!role) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Role not found");
        }
        return rolePermission_repository_1.default.getRolePermissions(roleId);
    }
    async removePermission(roleId, permissionId) {
        const role = await role_repository_1.roleRepository.findRoleById(roleId);
        if (!role) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Role not found");
        }
        await rolePermission_repository_1.default.removePermission(roleId, permissionId);
    }
}
exports.default = new RolePermissionService();
