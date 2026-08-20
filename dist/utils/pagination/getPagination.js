"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    return {
        page,
        limit,
        offset: (page - 1) * limit,
        search: query.search || "",
        sort: query.sort || "created_at",
        order: query.order === "asc" ? "ASC" : "DESC",
    };
};
exports.getPagination = getPagination;
