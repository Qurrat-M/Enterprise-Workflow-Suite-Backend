"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleSchema = exports.createRoleSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createRoleSchema = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Role name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Role name must be between 3 and 100 characters"),
    (0, express_validator_1.body)("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
];
exports.updateRoleSchema = [
    (0, express_validator_1.body)("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Role name must be between 3 and 100 characters"),
    (0, express_validator_1.body)("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
];
