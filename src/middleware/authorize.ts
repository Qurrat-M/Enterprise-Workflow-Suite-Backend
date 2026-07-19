import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants";

import userRoleRepository from "../modules/user-role/userRole.repository";

export const authorize =
  (requiredPermission: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
      }

      const permissions = await userRoleRepository.getUserPermissions(
        req.user.id,
      );

      const allowed = permissions.some(
        (permission) => permission.name === requiredPermission,
      );

      if (!allowed) {
        throw new ApiError(
          HTTP_STATUS.FORBIDDEN,
          "You don't have permission to perform this action.",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
