"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleService = void 0;
const constants_1 = require("../../constants");
const ApiError_1 = require("../../utils/ApiError");
const role_repository_1 = require("./role.repository");
class RoleService {
    async createRole(name, description) {
        const existing = await role_repository_1.roleRepository.findRoleByName(name);
        if (existing) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.CONFLICT, "Role already exists");
        }
        return role_repository_1.roleRepository.createRole(name, description);
    }
    async getRoles(query) {
        return role_repository_1.roleRepository.findAll(query);
    }
    async getRoleById(id) {
        const role = await role_repository_1.roleRepository.findRoleById(id);
        if (!role) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Role not found");
        }
        return role;
    }
    async updateRole(id, name, description) {
        const role = await role_repository_1.roleRepository.findRoleById(id);
        if (!role) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Role not found");
        }
        const existing = await role_repository_1.roleRepository.findRoleByName(name);
        if (existing && existing.id !== id) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.CONFLICT, "Role already exists");
        }
        return role_repository_1.roleRepository.updateRole(id, name, description);
    }
    async deleteRole(id) {
        const role = await role_repository_1.roleRepository.findRoleById(id);
        if (!role) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Role not found");
        }
        if (role.is_system) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.BAD_REQUEST, "System roles cannot be deleted");
        }
        return role_repository_1.roleRepository.deleteRole(id);
    }
}
exports.roleService = new RoleService();
