import { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import userService from "./user.service";

class UserController {
  getUsers = asyncHandler(async (req: Request, res: Response) =>
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          true,
          "Users fetched successfully",
          await userService.getAll(req.query),
        ),
      ),
  );
  getUserById = asyncHandler(async (req: Request, res: Response) =>
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          true,
          "User fetched successfully",
          await userService.getById(req.params.id),
        ),
      ),
  );
  createUser = asyncHandler(async (req: Request, res: Response) =>
    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          true,
          "User created successfully",
          await userService.create(req.body),
        ),
      ),
  );
  updateUser = asyncHandler(async (req: Request, res: Response) =>
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          true,
          "User updated successfully",
          await userService.update(req.params.id, req.body),
        ),
      ),
  );
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await userService.delete(req.params.id);
    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User deleted successfully"));
  });
  updateStatus = asyncHandler(async (req: Request, res: Response) =>
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          true,
          "User status updated successfully",
          await userService.updateStatus(req.params.id, req.body.status),
        ),
      ),
  );
  updateRoles = asyncHandler(async (req: Request, res: Response) =>
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          true,
          "User roles updated successfully",
          await userService.replaceRoles(req.params.id, req.body.roleIds),
        ),
      ),
  );
}
export default new UserController();
