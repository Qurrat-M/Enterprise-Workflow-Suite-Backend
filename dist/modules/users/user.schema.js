"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRolesSchema = exports.updateUserStatusSchema = exports.updateUserSchema = exports.createUserSchema = exports.userIdSchema = void 0;
const express_validator_1 = require("express-validator");
const optionalUserFields = [
    (0, express_validator_1.body)("organization_id")
        .optional()
        .isUUID()
        .withMessage("organization_id must be a valid UUID"),
    (0, express_validator_1.body)("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ max: 255 })
        .withMessage("Name cannot exceed 255 characters"),
    (0, express_validator_1.body)("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];
exports.userIdSchema = [
    (0, express_validator_1.param)("id").isUUID().withMessage("id must be a valid UUID"),
];
exports.createUserSchema = [
    (0, express_validator_1.body)("organization_id")
        .isUUID()
        .withMessage("organization_id must be a valid UUID"),
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 255 })
        .withMessage("Name cannot exceed 255 characters"),
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];
exports.updateUserSchema = optionalUserFields;
exports.updateUserStatusSchema = [
    (0, express_validator_1.body)("status")
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be either ACTIVE or INACTIVE"),
];
exports.updateUserRolesSchema = [
    (0, express_validator_1.body)("roleIds").isArray().withMessage("roleIds must be an array"),
    (0, express_validator_1.body)("roleIds.*").isUUID().withMessage("Each roleId must be a valid UUID"),
];
