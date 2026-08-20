"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../../utils/ApiError");
const constants_1 = require("../../constants");
const permission_repository_1 = __importDefault(require("./permission.repository"));
class PermissionService {
    async createPermission(module, action, displayName, description) {
        const name = `${module.toLowerCase()}.${action.toLowerCase()}`;
        const exists = await permission_repository_1.default.findByName(name);
        if (exists) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.BAD_REQUEST, "Permission already exists");
        }
        return permission_repository_1.default.create(module, action, name, displayName, description);
    }
    async getPermissions(query) {
        return permission_repository_1.default.findAll(query);
    }
    async getPermissionById(id) {
        const permission = await permission_repository_1.default.findById(id);
        if (!permission) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Permission not found");
        }
        return permission;
    }
    async updatePermission(id, module, action, displayName, description) {
        const name = `${module.toLowerCase()}.${action.toLowerCase()}`;
        return permission_repository_1.default.update(id, module, action, name, displayName, description);
    }
    async deletePermission(id) {
        const permission = await permission_repository_1.default.findById(id);
        if (!permission) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "Permission not found");
        }
        return permission_repository_1.default.delete(id);
    }
}
exports.default = new PermissionService();
