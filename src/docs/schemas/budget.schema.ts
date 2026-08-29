import { body, param, query } from "express-validator";

export const budgetIdSchema = [
  param("id").isUUID().withMessage("id must be a valid UUID"),
];

export const createBudgetSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Budget name is required")
    .isLength({ max: 255 })
    .withMessage("Budget name cannot exceed 255 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Budget amount is required")
    .isFloat({ min: 0 })
    .withMessage(
      "Budget amount must be a number greater than or equal to 0",
    ),
];

export const updateBudgetSchema = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Budget name cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Budget name cannot exceed 255 characters"),

  body("amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Budget amount must be a number greater than or equal to 0",
    ),
];

export const budgetListQuerySchema = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("search").optional().trim(),

  query("sort")
    .optional()
    .isIn(["name", "amount", "status", "created_at", "updated_at"])
    .withMessage("Invalid sort field"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),
];
