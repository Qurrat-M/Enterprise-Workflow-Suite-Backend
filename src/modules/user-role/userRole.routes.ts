import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { validateRequest } from "../../middleware/validateRequest";

import userRoleController from "./userRole.controller";
import { assignRolesSchema } from "./userRole.schema";

const router = Router();

router.post(
  "/:userId/roles",
  authenticate,
  assignRolesSchema,
  validateRequest,
  userRoleController.assignRoles,
);

router.get("/:userId/roles", authenticate, userRoleController.getUserRoles);

router.delete(
  "/:userId/roles/:roleId",
  authenticate,
  userRoleController.removeRole,
);

export default router;
