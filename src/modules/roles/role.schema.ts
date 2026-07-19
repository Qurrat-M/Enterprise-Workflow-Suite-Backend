import { body } from "express-validator";

export const createRoleSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Role name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Role name must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

export const updateRoleSchema = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Role name must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];
