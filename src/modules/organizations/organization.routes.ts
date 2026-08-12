import { Router } from "express";

import organizationController from "./organization.controller";

import {
  createOrganizationSchema,
  updateOrganizationSchema,
  updateOrganizationStatusSchema,
} from "../../docs/schemas/organization.schema";

import { authenticate } from "../../middleware/authenticate";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.get("/", authenticate, organizationController.getOrganizations);

router.get("/:id", authenticate, organizationController.getOrganizationById);

router.post(
  "/",
  authenticate,
  createOrganizationSchema,
  validateRequest,
  organizationController.createOrganization,
);

router.put(
  "/:id",
  authenticate,
  updateOrganizationSchema,
  validateRequest,
  organizationController.updateOrganization,
);

router.patch(
  "/:id/status",
  authenticate,
  updateOrganizationStatusSchema,
  validateRequest,
  organizationController.updateOrganizationStatus,
);

router.delete("/:id", authenticate, organizationController.deleteOrganization);

export default router;
