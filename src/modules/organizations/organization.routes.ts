import { Router } from "express";

import organizationController from "./organization.controller";

import {
  createOrganizationSchema,
  updateOrganizationSchema,
  updateOrganizationStatusSchema,
} from "../../docs/schemas/organization.schema";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("organization.read"),
  organizationController.getOrganizations,
);

router.get(
  "/:id",
  authenticate,
  authorize("organization.read"),
  organizationController.getOrganizationById,
);

router.post(
  "/",
  authenticate,
  authorize("organization.create"),
  ...createOrganizationSchema,
  validateRequest,
  organizationController.createOrganization,
);

router.put(
  "/:id",
  authenticate,
  authorize("organization.update"),
  ...updateOrganizationSchema,
  validateRequest,
  organizationController.updateOrganization,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("organization.status.update"),
  ...updateOrganizationStatusSchema,
  validateRequest,
  organizationController.updateOrganizationStatus,
);

router.delete(
  "/:id",
  authenticate,
  authorize("organization.delete"),
  organizationController.deleteOrganization,
);


export default router;
