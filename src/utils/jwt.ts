import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

interface JwtPayload {
  id: string;
  email: string;
}

const jwtOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
};

export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, jwtOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};
