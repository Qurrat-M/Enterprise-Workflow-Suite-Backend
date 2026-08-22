import { body, param } from "express-validator";

export const createDepartmentSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Department code is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Department code must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Department code can only contain letters, numbers, underscores and hyphens",
    ),

  body("description")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Department description cannot exceed 500 characters"),
];

export const updateDepartmentSchema = [
  param("id").isUUID().withMessage("Department ID must be a valid UUID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters"),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Department code must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Department code can only contain letters, numbers, underscores and hyphens",
    ),

  body("description")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Department description cannot exceed 500 characters"),
];

export const updateDepartmentStatusSchema = [
  param("id").isUUID().withMessage("Department ID must be a valid UUID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Status must be either ACTIVE or INACTIVE"),
];

export const departmentIdSchema = [
  param("id").isUUID().withMessage("Department ID must be a valid UUID"),
];
