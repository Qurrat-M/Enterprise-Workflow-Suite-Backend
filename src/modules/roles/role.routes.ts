import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { roleController } from "./role.controller";
import {
  createRoleSchema,
  updateRoleSchema,
  updateRoleStatusSchema,
} from "./role.schema";
import { validateRequest } from "../../middleware/validateRequest";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.get(
  "/:id/permissions",
  authenticate,
  authorize("role.read"),
  roleController.getRolePermissions,
);

router.put(
  "/:id/permissions",
  authenticate,
  authorize("role.permissions.assign"),
  roleController.replaceRolePermissions,
);

// Get All Roles
router.get("/", authenticate, authorize("role.read"), roleController.getRoles);

// Get Role By Id
router.get(
  "/:id",
  authenticate,
  authorize("role.read"),
  roleController.getRoleById,
);

// Create Role
router.post(
  "/",
  authenticate,
  authorize("role.create"),
  ...createRoleSchema,
  validateRequest,
  roleController.createRole,
);
router.put(
  "/:id",
  authenticate,
  authorize("role.update"),
  ...updateRoleSchema,
  validateRequest,
  roleController.updateRole,
);

// Delete Role
router.delete(
  "/:id",
  authenticate,
  authorize("role.delete"),
  roleController.deleteRole,
);

// Update Role Status
router.patch(
  "/:id/status",
  authenticate,
  authorize("role.update"),
  ...updateRoleStatusSchema,
  validateRequest,
  roleController.updateRoleStatus,
);
export default router;
