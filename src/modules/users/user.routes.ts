import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { validateRequest } from "../../middleware/validateRequest";
import userController from "./user.controller";
import {
  createUserSchema,
  updateUserRolesSchema,
  updateUserSchema,
  updateUserStatusSchema,
  userIdSchema,
} from "./user.schema";

const router = Router();
router.use(authenticate);
router.get("/", userController.getUsers);
router.get("/:id", userIdSchema, validateRequest, userController.getUserById);
router.post("/", createUserSchema, validateRequest, userController.createUser);
router.put(
  "/:id",
  userIdSchema,
  ...updateUserSchema,
  validateRequest,
  userController.updateUser,
);
router.delete("/:id", userIdSchema, validateRequest, userController.deleteUser);
router.patch(
  "/:id/status",
  userIdSchema,
  ...updateUserStatusSchema,
  validateRequest,
  userController.updateStatus,
);
router.patch(
  "/:id/roles",
  userIdSchema,
  ...updateUserRolesSchema,
  validateRequest,
  userController.updateRoles,
);
export default router;
