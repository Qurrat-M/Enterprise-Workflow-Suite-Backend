"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = __importDefault(require("./auth.repository"));
const constants_1 = require("../../constants");
const ApiError_1 = require("../../utils/ApiError");
const jwt_1 = require("../../utils/jwt");
class AuthService {
    async register(data) {
        const existingUser = await auth_repository_1.default.findUserByEmail(data.email);
        if (existingUser) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.BAD_REQUEST, "Email already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        return auth_repository_1.default.createUser({
            ...data,
            password: hashedPassword,
        });
    }
    async login(email, password) {
        const user = await auth_repository_1.default.findUserByEmail(email);
        if (!user) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
        }
        const accessToken = (0, jwt_1.generateAccessToken)({
            id: user.id,
            email: user.email,
        });
        const { password: _, ...userWithoutPassword } = user;
        return {
            accessToken,
            user: userWithoutPassword,
        };
    }
    async getProfile(userId) {
        const user = await auth_repository_1.default.findUserById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(constants_1.HTTP_STATUS.NOT_FOUND, "User not found");
        }
        return user;
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
