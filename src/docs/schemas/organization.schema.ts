import { body } from "express-validator";

export const createOrganizationSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ max: 255 })
    .withMessage("Organization name cannot exceed 255 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Organization code is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Organization code must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Organization code can only contain letters, numbers, underscores and hyphens",
    ),

  body("logo_url")
    .optional()
    .trim()
    .isURL()
    .withMessage("Logo URL must be a valid URL"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("phone")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Phone number cannot exceed 50 characters"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),

  body("address").optional().trim(),

  body("city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City cannot exceed 100 characters"),

  body("country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country cannot exceed 100 characters"),

  body("timezone")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Timezone cannot exceed 100 characters"),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage("Currency must be between 3 and 10 characters"),
];

export const updateOrganizationSchema = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Organization name cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Organization name cannot exceed 255 characters"),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Organization code must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Organization code can only contain letters, numbers, underscores and hyphens",
    ),

  body("logo_url")
    .optional()
    .trim()
    .isURL()
    .withMessage("Logo URL must be a valid URL"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("phone")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Phone number cannot exceed 50 characters"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),

  body("address").optional().trim(),

  body("city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City cannot exceed 100 characters"),

  body("country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country cannot exceed 100 characters"),

  body("timezone")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Timezone cannot exceed 100 characters"),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage("Currency must be between 3 and 10 characters"),
];

export const updateOrganizationStatusSchema = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Status must be either ACTIVE or INACTIVE"),
];
