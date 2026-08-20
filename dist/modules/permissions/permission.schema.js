"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermissionSchema = exports.createPermissionSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createPermissionSchema = [
    (0, express_validator_1.body)("module").trim().notEmpty().withMessage("Module is required"),
    (0, express_validator_1.body)("action").trim().notEmpty().withMessage("Action is required"),
    (0, express_validator_1.body)("display_name")
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage("Display name cannot exceed 150 characters"),
    (0, express_validator_1.body)("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
];
exports.updatePermissionSchema = [
    (0, express_validator_1.body)("module").optional().trim(),
    (0, express_validator_1.body)("action").optional().trim(),
    (0, express_validator_1.body)("display_name").optional().trim().isLength({ max: 150 }),
    (0, express_validator_1.body)("description").optional().trim().isLength({ max: 500 }),
];
