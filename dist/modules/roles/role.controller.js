"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleController = void 0;
const role_service_1 = require("./role.service");
const constants_1 = require("../../constants");
const ApiResponse_1 = require("../../utils/ApiResponse");
class RoleController {
    async createRole(req, res, next) {
        try {
            const { name, description } = req.body;
            const role = await role_service_1.roleService.createRole(name, description);
            res
                .status(constants_1.HTTP_STATUS.CREATED)
                .json(new ApiResponse_1.ApiResponse(true, "Role created successfully", role));
            return;
        }
        catch (error) {
            next(error);
        }
    }
    async getRoles(req, res, next) {
        try {
            const roles = await role_service_1.roleService.getRoles(req.query);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Roles fetched successfully", roles));
            return;
        }
        catch (error) {
            next(error);
        }
    }
    async getRoleById(req, res, next) {
        try {
            const id = req.params.id;
            const role = await role_service_1.roleService.getRoleById(id);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Role fetched successfully", role));
            return;
        }
        catch (error) {
            next(error);
        }
    }
    async updateRole(req, res, next) {
        try {
            const id = req.params.id;
            const { name, description } = req.body;
            const role = await role_service_1.roleService.updateRole(id, name, description);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Role updated successfully", role));
            return;
        }
        catch (error) {
            next(error);
        }
    }
    async deleteRole(req, res, next) {
        try {
            const id = req.params.id;
            await role_service_1.roleService.deleteRole(id);
            res
                .status(constants_1.HTTP_STATUS.OK)
                .json(new ApiResponse_1.ApiResponse(true, "Role deleted successfully"));
            return;
        }
        catch (error) {
            next(error);
        }
    }
}
exports.roleController = new RoleController();
