import bcrypt from "bcrypt";

import authRepository from "./auth.repository";
import { RegisterUserDto } from "./auth.types";
import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";
import { generateAccessToken } from "../../utils/jwt";

export class AuthService {
  async register(data: RegisterUserDto) {
    const existingUser = await authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return authRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }
  async getProfile(userId: string) {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    return user;
  }
}

export default new AuthService();
