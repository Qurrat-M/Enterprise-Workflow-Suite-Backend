import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { roleController } from "./role.controller";
import { createRoleSchema, updateRoleSchema } from "./role.schema";
import { validateRequest } from "../../middleware/validateRequest";
import { authorize } from "../../middleware/authorize";

const router = Router();

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
  ...createRoleSchema,
  validateRequest,
  roleController.createRole,
);

// Update Role
router.put(
  "/:id",
  authenticate,
  ...updateRoleSchema,
  validateRequest,
  roleController.updateRole,
);

// Delete Role
router.delete("/:id", authenticate, (req, res, next) =>
  roleController.deleteRole(req, res, next),
);

export default router;
