import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { validateRequest } from "../../middleware/validateRequest";

import rolePermissionController from "./rolePermission.controller";
import { assignPermissionsSchema } from "./rolePermission.schema";
import { authorize } from "../../middleware/authorize";

const router = Router();

// Assign Permissions
router.post(
  "/:roleId/permissions",
  authenticate,
  authorize("role.update"),
  assignPermissionsSchema,
  validateRequest,
  rolePermissionController.assignPermissions,
);

// Get Role Permissions
router.get(
  "/:roleId/permissions",
  authenticate,
  authorize("role.read"),
  rolePermissionController.getRolePermissions,
);

// Remove Permission
router.delete(
  "/:roleId/permissions/:permissionId",
  authenticate,
  authorize("role.update"),
  rolePermissionController.removePermission,
);

export default router;
