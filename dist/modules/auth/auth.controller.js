"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const asyncHandler_1 = require("../../middleware/asyncHandler");
const ApiResponse_1 = require("../../utils/ApiResponse");
const constants_1 = require("../../constants");
class AuthController {
    register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = await auth_service_1.default.register(req.body);
        res
            .status(constants_1.HTTP_STATUS.CREATED)
            .json(new ApiResponse_1.ApiResponse(true, "User registered successfully", user));
    });
    login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { email, password } = req.body;
        const data = await auth_service_1.default.login(email, password);
        const { accessToken, user } = data;
        res
            .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        })
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "Login successful", {
            user,
            accessToken,
        }));
    });
    me = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = await auth_service_1.default.getProfile(req.user.id);
        res
            .status(constants_1.HTTP_STATUS.OK)
            .json(new ApiResponse_1.ApiResponse(true, "User fetched successfully", user));
    });
    logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        res.clearCookie("accessToken");
        res.status(200).json(new ApiResponse_1.ApiResponse(true, "Logout successful", null));
    });
}
exports.AuthController = AuthController;
exports.default = new AuthController();
