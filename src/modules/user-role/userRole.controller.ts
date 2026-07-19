import { Request, Response } from "express";

import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constants";

import userRoleService from "./userRole.service";

class UserRoleController {
  assignRoles = asyncHandler(async (req: Request, res: Response) => {
    const roles = await userRoleService.assignRoles(
      req.params.userId,
      req.body.roleIds,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Roles assigned successfully", roles));
  });

  getUserRoles = asyncHandler(async (req: Request, res: Response) => {
    const roles = await userRoleService.getUserRoles(req.params.userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Roles fetched successfully", roles));
  });

  removeRole = asyncHandler(async (req: Request, res: Response) => {
    await userRoleService.removeRole(req.params.userId, req.params.roleId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Role removed successfully"));
  });
}

export default new UserRoleController();
