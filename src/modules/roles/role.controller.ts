import { Request, Response, NextFunction } from "express";
import { roleService } from "./role.service";
import { HTTP_STATUS } from "../../constants";
import { ApiResponse } from "../../utils/ApiResponse";
import { RoleQuery } from "./role.types";

class RoleController {
  async createRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, description } = req.body as {
        name: string;
        description?: string;
      };

      const role = await roleService.createRole(name, description);

      res
        .status(HTTP_STATUS.CREATED)
        .json(new ApiResponse(true, "Role created successfully", role));

      return;
    } catch (error) {
      next(error);
    }
  }

  async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await roleService.getRoles(req.query as RoleQuery);

      res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(true, "Roles fetched successfully", roles));

      return;
    } catch (error) {
      next(error);
    }
  }

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const role = await roleService.getRoleById(id);

      res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(true, "Role fetched successfully", role));

      return;
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const { name, description } = req.body as {
        name: string;
        description?: string;
      };

      const role = await roleService.updateRole(id, name, description);

      res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(true, "Role updated successfully", role));

      return;
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      await roleService.deleteRole(id);

      res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(true, "Role deleted successfully"));

      return;
    } catch (error) {
      next(error);
    }
  }

  async getRolePermissions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const roleId = req.params.id as string;

      const permissions = await roleService.getRolePermissions(roleId);

      res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            true,
            "Role permissions fetched successfully",
            permissions,
          ),
        );

      return;
    } catch (error) {
      next(error);
    }
  }

  async replaceRolePermissions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const roleId = req.params.id as string;

      const { permissionIds } = req.body as {
        permissionIds: string[];
      };

      const permissions = await roleService.replaceRolePermissions(
        roleId,
        permissionIds,
      );

      res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            true,
            "Role permissions updated successfully",
            permissions,
          ),
        );

      return;
    } catch (error) {
      next(error);
    }
  }

  async updateRoleStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id as string;

      const { status } = req.body as {
        status: "ACTIVE" | "INACTIVE";
      };

      const role = await roleService.updateRoleStatus(id, status === "ACTIVE");

      res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(true, "Role status updated successfully", role));

      return;
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();
