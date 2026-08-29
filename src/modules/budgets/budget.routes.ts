import { Router } from "express";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";

import budgetController from "./budget.controller";

import {
  budgetIdSchema,
  budgetListQuerySchema,
  createBudgetSchema,
  updateBudgetSchema,
} from "../../docs/schemas/budget.schema";

const router = Router();

router.use(authenticate);

/**
 * GET /budgets
 * Permission: budget.read
 */
router.get(
  "/",
  authorize("budget.read"),
  budgetListQuerySchema,
  validateRequest,
  budgetController.getBudgets,
);

/**
 * GET /budgets/:id
 * Permission: budget.read
 */
router.get(
  "/:id",
  authorize("budget.read"),
  budgetIdSchema,
  validateRequest,
  budgetController.getBudgetById,
);

/**
 * POST /budgets
 * Permission: budget.create
 */
router.post(
  "/",
  authorize("budget.create"),
  createBudgetSchema,
  validateRequest,
  budgetController.createBudget,
);

/**
 * PUT /budgets/:id
 * Permission: budget.update
 */
router.put(
  "/:id",
  authorize("budget.update"),
  budgetIdSchema,
  ...updateBudgetSchema,
  validateRequest,
  budgetController.updateBudget,
);

/**
 * DELETE /budgets/:id
 * Permission: budget.delete
 */
router.delete(
  "/:id",
  authorize("budget.delete"),
  budgetIdSchema,
  validateRequest,
  budgetController.deleteBudget,
);

/**
 * PATCH /budgets/:id/submit
 * Permission: budget.submit
 */
router.patch(
  "/:id/submit",
  authorize("budget.submit"),
  budgetIdSchema,
  validateRequest,
  budgetController.submitBudget,
);

/**
 * PATCH /budgets/:id/approve
 * Permission: budget.approve
 */
router.patch(
  "/:id/approve",
  authorize("budget.approve"),
  budgetIdSchema,
  validateRequest,
  budgetController.approveBudget,
);

/**
 * PATCH /budgets/:id/reject
 * Permission: budget.reject
 */
router.patch(
  "/:id/reject",
  authorize("budget.reject"),
  budgetIdSchema,
  validateRequest,
  budgetController.rejectBudget,
);

/**
 * PATCH /budgets/:id/return
 * Permission: budget.return
 */
router.patch(
  "/:id/return",
  authorize("budget.return"),
  budgetIdSchema,
  validateRequest,
  budgetController.returnBudget,
);

export default router;
