import { Request, Response } from "express";

import authService from "./auth.service";

import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { HTTP_STATUS } from "../../constants";

export class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "User registered successfully", user));
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    const { accessToken, user } = data;

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(true, "Login successful", {
          user,
          accessToken,
        }),
      );
  });

  me = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user!.id);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User fetched successfully", user));
  });

  logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");

    res.status(200).json(new ApiResponse(true, "Logout successful", null));
  });
}

export default new AuthController();
