import { Router } from "express";

import departmentController from "./department.controller";

import {
  createDepartmentSchema,
  updateDepartmentSchema,
  updateDepartmentStatusSchema,
  departmentIdSchema,
} from "./department.schema";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("department.read"),
  departmentController.getDepartments,
);

router.get(
  "/:id",
  authenticate,
  authorize("department.read"),
  ...departmentIdSchema,
  validateRequest,
  departmentController.getDepartmentById,
);

router.post(
  "/",
  authenticate,
  authorize("department.create"),
  ...createDepartmentSchema,
  validateRequest,
  departmentController.createDepartment,
);

router.put(
  "/:id",
  authenticate,
  authorize("department.update"),
  ...updateDepartmentSchema,
  validateRequest,
  departmentController.updateDepartment,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("department.status.update"),
  ...updateDepartmentStatusSchema,
  validateRequest,
  departmentController.updateDepartmentStatus,
);

router.delete(
  "/:id",
  authenticate,
  authorize("department.delete"),
  ...departmentIdSchema,
  validateRequest,
  departmentController.deleteDepartment,
);

export default router;
