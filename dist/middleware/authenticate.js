"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const ApiError_1 = require("../utils/ApiError");
const constants_1 = require("../constants");
const authenticate = (req, res, next) => {
    let token;
    // 1. Try to get token from Authorization Header
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    // 2. If no Bearer token, try Cookie
    if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    // 3. No token found
    if (!token) {
        return next(new ApiError_1.ApiError(constants_1.HTTP_STATUS.UNAUTHORIZED, "Authentication token is required"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new ApiError_1.ApiError(constants_1.HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token"));
    }
};
exports.authenticate = authenticate;
