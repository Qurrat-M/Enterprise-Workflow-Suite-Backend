import { Router } from "express";

import permissionController from "./permission.controller";
import {
  createPermissionSchema,
  updatePermissionSchema,
} from "./permission.schema";

import { authenticate } from "../../middleware/authenticate";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.get("/", authenticate, permissionController.getPermissions);

router.get("/:id", authenticate, permissionController.getPermissionById);

router.post(
  "/",
  authenticate,
  createPermissionSchema,
  validateRequest,
  permissionController.createPermission,
);

router.put(
  "/:id",
  authenticate,
  updatePermissionSchema,
  validateRequest,
  permissionController.updatePermission,
);

router.delete("/:id", authenticate, permissionController.deletePermission);

export default router;
