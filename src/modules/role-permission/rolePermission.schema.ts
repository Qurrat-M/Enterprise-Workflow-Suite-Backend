import { body } from "express-validator";

export const assignPermissionsSchema = [
  body("permissionIds")
    .isArray({ min: 1 })
    .withMessage("permissionIds must be a non-empty array"),

  body("permissionIds.*")
    .isUUID()
    .withMessage("Each permissionId must be a valid UUID"),
];
