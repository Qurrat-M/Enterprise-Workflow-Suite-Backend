import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";

import userController from "./user.controller";

import {
  createUserSchema,
  updateUserRolesSchema,
  updateUserSchema,
  updateUserStatusSchema,
  userIdSchema,
  userListQuerySchema,
} from "./user.schema";

const router = Router();

router.use(authenticate);

/**
 * GET /users
 * Permission: user.read
 */
router.get(
  "/",
  authorize("user.read"),
  userListQuerySchema,
  validateRequest,
  userController.getUsers,
);

/**
 * GET /users/:id
 * Permission: user.read
 */
router.get(
  "/:id",
  authorize("user.read"),
  userIdSchema,
  validateRequest,
  userController.getUserById,
);

/**
 * POST /users
 * Permission: user.create
 */
router.post(
  "/",
  authorize("user.create"),
  createUserSchema,
  validateRequest,
  userController.createUser,
);

/**
 * PUT /users/:id
 * Permission: user.update
 */
router.put(
  "/:id",
  authorize("user.update"),
  userIdSchema,
  ...updateUserSchema,
  validateRequest,
  userController.updateUser,
);

/**
 * DELETE /users/:id
 * Permission: user.delete
 */
router.delete(
  "/:id",
  authorize("user.delete"),
  userIdSchema,
  validateRequest,
  userController.deleteUser,
);

/**
 * PATCH /users/:id/status
 * Permission: user.status.update
 */
router.patch(
  "/:id/status",
  authorize("user.status.update"),
  userIdSchema,
  ...updateUserStatusSchema,
  validateRequest,
  userController.updateStatus,
);

/**
 * PATCH /users/:id/roles
 * Permission: user.roles.assign
 */
router.patch(
  "/:id/roles",
  authorize("user.roles.assign"),
  userIdSchema,
  ...updateUserRolesSchema,
  validateRequest,
  userController.updateRoles,
);

/**
 * GET /users/:id/roles
 * Permission: user.read
 */
router.get(
  "/:id/roles",
  authorize("user.read"),
  userIdSchema,
  validateRequest,
  userController.getUserRoles,
);

export default router;
