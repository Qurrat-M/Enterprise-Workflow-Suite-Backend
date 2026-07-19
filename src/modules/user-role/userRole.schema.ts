import { body } from "express-validator";

export const assignRolesSchema = [
  body("roleIds")
    .isArray({ min: 1 })
    .withMessage("roleIds must be a non-empty array"),

  body("roleIds.*").isUUID().withMessage("Each roleId must be a valid UUID"),
];
