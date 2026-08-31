import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants";
import { db } from "../config/db";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

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
    return next(
      new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication token is required",
      ),
    );
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
    };

    /**
     * Get user's active organization membership
     */
    const { rows } = await db.query(
      `
      SELECT
        organization_id,
        user_id,
        status
      FROM organization_users
      WHERE user_id = $1
        AND LOWER(status) = 'active'
      ORDER BY joined_at
      LIMIT 1;
      `,
      [decoded.id],
    );

    console.log("AUTH USER ID:", decoded.id);
    console.log("AUTH EMAIL:", decoded.email);
    console.log("ORG MEMBERSHIP:", rows);

    if (!rows.length) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          "User is not a member of any organization",
        ),
      );
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      organizationId: rows[0].organization_id,
    };

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    return next(
      new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid or expired token",
      ),
    );
  }
};
