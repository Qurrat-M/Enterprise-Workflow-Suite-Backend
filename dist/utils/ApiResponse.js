"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    success;
    message;
    data;
    timestamp;
    constructor(success, message, data, timestamp = new Date().toISOString()) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = timestamp;
    }
}
exports.ApiResponse = ApiResponse;
