"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPermissionsSchema = void 0;
const express_validator_1 = require("express-validator");
exports.assignPermissionsSchema = [
    (0, express_validator_1.body)("permissionIds")
        .isArray({ min: 1 })
        .withMessage("permissionIds must be a non-empty array"),
    (0, express_validator_1.body)("permissionIds.*")
        .isUUID()
        .withMessage("Each permissionId must be a valid UUID"),
];
