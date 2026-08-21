import { Request, Response } from "express";

import { HTTP_STATUS } from "../../constants";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

import userService from "./user.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    organizationId: string;
    email: string;
  };
}

class UserController {
  getUsers = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await userService.getAll(
      request.user.organizationId,
      req.query,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Users fetched successfully", data));
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await userService.getById(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User fetched successfully", data));
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await userService.create(
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "User created successfully", data));
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await userService.update(
      req.params.id,
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User updated successfully", data));
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    await userService.delete(req.params.id, request.user.organizationId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User deactivated successfully"));
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await userService.updateStatus(
      req.params.id,
      request.user.organizationId,
      req.body.status,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User status updated successfully", data));
  });

  updateRoles = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await userService.replaceRoles(
      req.params.id,
      request.user.organizationId,
      req.body.roleIds,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User roles updated successfully", data));
  });

  getUserRoles = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await userService.getRoles(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User roles fetched successfully", data));
  });
}

export default new UserController();
