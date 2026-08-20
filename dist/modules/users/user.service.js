"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../../constants");
const ApiError_1 = require("../../utils/ApiError");
const role_repository_1 = require("../roles/role.repository");
const organization_repository_1 = __importDefault(require("../organizations/organization.repository"));
const user_repository_1 = __importDefault(require("./user.repository"));
class UserService {
    async create(data) {
        if (await user_repository_1.default.findByEmail(data.email))
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.CONFLICT, "Email already exists");
        if (!(await organization_repository_1.default.findById(data.organization_id)))
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Organization not found");
        return user_repository_1.default.create(data, await bcrypt_1.default.hash(data.password, 10));
    }
    async getAll(query) {
        return user_repository_1.default.findAll(query);
    }
    async getById(id) {
        const user = await user_repository_1.default.findById(id);
        if (!user)
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "User not found");
        return user;
    }
    async update(id, data) {
        await this.getById(id);
        if (data.organization_id &&
            !(await organization_repository_1.default.findById(data.organization_id)))
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Organization not found");
        if (data.email) {
            const existing = await user_repository_1.default.findByEmail(data.email);
            if (existing && existing.id !== id)
                throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.CONFLICT, "Email already exists");
        }
        return user_repository_1.default.update(id, data, data.password ? await bcrypt_1.default.hash(data.password, 10) : undefined);
    }
    async updateStatus(id, status) {
        await this.getById(id);
        return user_repository_1.default.updateStatus(id, status);
    }
    async delete(id) {
        return this.updateStatus(id, "INACTIVE");
    }
    async replaceRoles(id, roleIds) {
        await this.getById(id);
        for (const roleId of roleIds)
            if (!(await role_repository_1.roleRepository.findRoleById(roleId)))
                throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, `Role ${roleId} not found`);
        return user_repository_1.default.replaceRoles(id, [...new Set(roleIds)]);
    }
}
exports.default = new UserService();
