"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const asyncHandler_1 = require("../../middleware/asyncHandler");
const ApiResponse_1 = require("../../utils/ApiResponse");
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    getUsers = (0, asyncHandler_1.asyncHandler)(async (req, res) => res
        .status(constants_1.HTTP_STATUS.OK)
        .json(new ApiResponse_1.ApiResponse(true, "Users fetched successfully", await user_service_1.default.getAll(req.query))));
    getUserById = (0, asyncHandler_1.asyncHandler)(async (req, res) => res
        .status(constants_1.HTTP_STATUS.OK)
        .json(new ApiResponse_1.ApiResponse(true, "User fetched successfully", await user_service_1.default.getById(req.params.id))));
    createUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => res
        .status(constants_1.HTTP_STATUS.CREATED)
        .json(new ApiResponse_1.ApiResponse(true, "User created successfully", await user_service_1.default.create(req.body))));
    updateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => res
        .status(constants_1.HTTP_STATUS.OK)
        .json(new ApiResponse_1.ApiResponse(true, "User updated successfully", await user_service_1.default.update(req.params.id, req.body))));
    deleteUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await user_service_1.default.delete(req.params.id);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "User deleted successfully"));
    });
    updateStatus = (0, asyncHandler_1.asyncHandler)(async (req, res) => res
        .status(constants_1.HTTP_STATUS.OK)
        .json(new ApiResponse_1.ApiResponse(true, "User status updated successfully", await user_service_1.default.updateStatus(req.params.id, req.body.status))));
    updateRoles = (0, asyncHandler_1.asyncHandler)(async (req, res) => res
        .status(constants_1.HTTP_STATUS.OK)
        .json(new ApiResponse_1.ApiResponse(true, "User roles updated successfully", await user_service_1.default.replaceRoles(req.params.id, req.body.roleIds))));
}
exports.default = new UserController();
