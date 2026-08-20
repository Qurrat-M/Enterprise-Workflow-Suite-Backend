"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRolesSchema = void 0;
const express_validator_1 = require("express-validator");
exports.assignRolesSchema = [
    (0, express_validator_1.body)("roleIds")
        .isArray({ min: 1 })
        .withMessage("roleIds must be a non-empty array"),
    (0, express_validator_1.body)("roleIds.*").isUUID().withMessage("Each roleId must be a valid UUID"),
];
