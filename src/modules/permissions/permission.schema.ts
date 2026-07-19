import { body } from "express-validator";

export const createPermissionSchema = [
  body("module").trim().notEmpty().withMessage("Module is required"),

  body("action").trim().notEmpty().withMessage("Action is required"),

  body("display_name")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Display name cannot exceed 150 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

export const updatePermissionSchema = [
  body("module").optional().trim(),

  body("action").optional().trim(),

  body("display_name").optional().trim().isLength({ max: 150 }),

  body("description").optional().trim().isLength({ max: 500 }),
];
