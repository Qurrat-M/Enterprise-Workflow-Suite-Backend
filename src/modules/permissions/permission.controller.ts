import { Request, Response, NextFunction } from "express";
import permissionService from "./permission.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constants";
import { PermissionQuery } from "./permission.types";

class PermissionController {
  async createPermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { module, action, display_name, description } = req.body;

      const permission = await permissionService.createPermission(
        module,
        action,
        display_name,
        description,
      );

      res
        .status(HTTP_STATUS.CREATED)
        .json(
          new ApiResponse(true, "Permission created successfully", permission),
        );
    } catch (error) {
      next(error);
    }
  }

  async getPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      const permissions = await permissionService.getPermissions(
        req.query as PermissionQuery,
      );

      res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            true,
            "Permissions fetched successfully",
            permissions,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async getPermissionById(req: Request, res: Response, next: NextFunction) {
    try {
      const permission = await permissionService.getPermissionById(
        req.params.id,
      );

      res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(true, "Permission fetched successfully", permission),
        );
    } catch (error) {
      next(error);
    }
  }

  async updatePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { module, action, display_name, description } = req.body;

      const permission = await permissionService.updatePermission(
        req.params.id,
        module,
        action,
        display_name,
        description,
      );

      res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(true, "Permission updated successfully", permission),
        );
    } catch (error) {
      next(error);
    }
  }

  async deletePermission(req: Request, res: Response, next: NextFunction) {
    try {
      await permissionService.deletePermission(req.params.id);

      res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(true, "Permission deleted successfully"));
    } catch (error) {
      next(error);
    }
  }
}

export default new PermissionController();
