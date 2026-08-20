import { body, param } from "express-validator";

const optionalUserFields = [
  body("organization_id")
    .optional()
    .isUUID()
    .withMessage("organization_id must be a valid UUID"),
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
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const userIdSchema = [
  param("id").isUUID().withMessage("id must be a valid UUID"),
];

export const createUserSchema = [
  body("organization_id")
    .isUUID()
    .withMessage("organization_id must be a valid UUID"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 })
    .withMessage("Name cannot exceed 255 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const updateUserSchema = optionalUserFields;

export const updateUserStatusSchema = [
  body("status")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Status must be either ACTIVE or INACTIVE"),
];

export const updateUserRolesSchema = [
  body("roleIds").isArray().withMessage("roleIds must be an array"),
  body("roleIds.*").isUUID().withMessage("Each roleId must be a valid UUID"),
];
