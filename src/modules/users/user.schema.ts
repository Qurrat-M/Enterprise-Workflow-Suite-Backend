import { body, param, query } from "express-validator";

export const userIdSchema = [
  param("id").isUUID().withMessage("id must be a valid UUID"),
];

export const createUserSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 })
    .withMessage("Name cannot exceed 255 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address")
   .normalizeEmail({
     all_lowercase: true,
    gmail_remove_dots: false,
     gmail_remove_subaddress: false,
     outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const updateUserSchema = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Name cannot exceed 255 characters"),

  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email must be a valid email address"),
];

export const updateUserStatusSchema = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Status must be either ACTIVE or INACTIVE"),
];

export const updateUserRolesSchema = [
  body("roleIds").isArray().withMessage("roleIds must be an array"),

  body("roleIds.*").isUUID().withMessage("Each roleId must be a valid UUID"),
];

export const userListQuerySchema = [
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
    .isIn(["name", "email", "status", "created_at", "updated_at"])
    .withMessage("Invalid sort field"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),
];
