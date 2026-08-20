"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        return next();
    }
    const errors = result.array().map((error) => ({
        field: error.type === "field" ? error.path : undefined,
        message: error.msg,
    }));
    return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
    });
};
exports.validateRequest = validateRequest;
