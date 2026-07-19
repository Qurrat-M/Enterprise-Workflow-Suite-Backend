import { Request, Response } from "express";

import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constants";

import rolePermissionService from "./rolePermission.service";

class RolePermissionController {
  assignPermissions = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;
    const { permissionIds } = req.body;

    const permissions = await rolePermissionService.assignPermissions(
      roleId,
      permissionIds,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(true, "Permissions assigned successfully", permissions),
      );
  });

  getRolePermissions = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;

    const permissions = await rolePermissionService.getRolePermissions(roleId);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(true, "Permissions fetched successfully", permissions),
      );
  });

  removePermission = asyncHandler(async (req: Request, res: Response) => {
    const { roleId, permissionId } = req.params;

    await rolePermissionService.removePermission(roleId, permissionId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Permission removed successfully"));
  });
}

export default new RolePermissionController();
