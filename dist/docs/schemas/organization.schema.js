"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationStatusSchema = exports.updateOrganizationSchema = exports.createOrganizationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createOrganizationSchema = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Organization name is required")
        .isLength({ max: 255 })
        .withMessage("Organization name cannot exceed 255 characters"),
    (0, express_validator_1.body)("code")
        .trim()
        .notEmpty()
        .withMessage("Organization code is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Organization code must be between 2 and 50 characters")
        .matches(/^[A-Za-z0-9_-]+$/)
        .withMessage("Organization code can only contain letters, numbers, underscores and hyphens"),
    (0, express_validator_1.body)("logo_url")
        .optional()
        .trim()
        .isURL()
        .withMessage("Logo URL must be a valid URL"),
    (0, express_validator_1.body)("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("phone")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Phone number cannot exceed 50 characters"),
    (0, express_validator_1.body)("website")
        .optional()
        .trim()
        .isURL()
        .withMessage("Website must be a valid URL"),
    (0, express_validator_1.body)("address").optional().trim(),
    (0, express_validator_1.body)("city")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("City cannot exceed 100 characters"),
    (0, express_validator_1.body)("country")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Country cannot exceed 100 characters"),
    (0, express_validator_1.body)("timezone")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Timezone cannot exceed 100 characters"),
    (0, express_validator_1.body)("currency")
        .optional()
        .trim()
        .isLength({ min: 3, max: 10 })
        .withMessage("Currency must be between 3 and 10 characters"),
];
exports.updateOrganizationSchema = [
    (0, express_validator_1.body)("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Organization name cannot be empty")
        .isLength({ max: 255 })
        .withMessage("Organization name cannot exceed 255 characters"),
    (0, express_validator_1.body)("code")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Organization code must be between 2 and 50 characters")
        .matches(/^[A-Za-z0-9_-]+$/)
        .withMessage("Organization code can only contain letters, numbers, underscores and hyphens"),
    (0, express_validator_1.body)("logo_url")
        .optional()
        .trim()
        .isURL()
        .withMessage("Logo URL must be a valid URL"),
    (0, express_validator_1.body)("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("phone")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Phone number cannot exceed 50 characters"),
    (0, express_validator_1.body)("website")
        .optional()
        .trim()
        .isURL()
        .withMessage("Website must be a valid URL"),
    (0, express_validator_1.body)("address").optional().trim(),
    (0, express_validator_1.body)("city")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("City cannot exceed 100 characters"),
    (0, express_validator_1.body)("country")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Country cannot exceed 100 characters"),
    (0, express_validator_1.body)("timezone")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Timezone cannot exceed 100 characters"),
    (0, express_validator_1.body)("currency")
        .optional()
        .trim()
        .isLength({ min: 3, max: 10 })
        .withMessage("Currency must be between 3 and 10 characters"),
];
exports.updateOrganizationStatusSchema = [
    (0, express_validator_1.body)("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be either ACTIVE or INACTIVE"),
];
