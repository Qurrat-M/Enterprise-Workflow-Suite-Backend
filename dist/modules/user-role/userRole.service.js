"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../../utils/ApiError");
const constants_1 = require("../../constants");
const auth_repository_1 = __importDefault(require("../auth/auth.repository"));
const userRole_repository_1 = __importDefault(require("./userRole.repository"));
const role_repository_1 = require("../roles/role.repository");
class UserRoleService {
    async assignRoles(userId, roleIds) {
        const user = await auth_repository_1.default.findUserById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "User not found");
        }
        for (const roleId of roleIds) {
            const role = await role_repository_1.roleRepository.findRoleById(roleId);
            if (!role) {
                throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, `Role ${roleId} not found`);
            }
        }
        await userRole_repository_1.default.assignRoles(userId, roleIds);
        return userRole_repository_1.default.getUserRoles(userId);
    }
    async getUserRoles(userId) {
        return userRole_repository_1.default.getUserRoles(userId);
    }
    async removeRole(userId, roleId) {
        await userRole_repository_1.default.removeRole(userId, roleId);
    }
}
exports.default = new UserRoleService();
