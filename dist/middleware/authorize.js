"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const ApiError_1 = require("../utils/ApiError");
const constants_1 = require("../constants");
const userRole_repository_1 = __importDefault(require("../modules/user-role/userRole.repository"));
const authorize = (requiredPermission) => async (req, res, next) => {
    try {
        if (!req.user) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
        }
        const permissions = await userRole_repository_1.default.getUserPermissions(req.user.id);
        const allowed = permissions.some((permission) => permission.name === requiredPermission);
        if (!allowed) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.FORBIDDEN, "You don't have permission to perform this action.");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authorize = authorize;
