"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./docs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const role_routes_1 = __importDefault(require("./modules/roles/role.routes"));
const permission_routes_1 = __importDefault(require("./modules/permissions/permission.routes"));
const rolePermission_routes_1 = __importDefault(require("./modules/role-permission/rolePermission.routes"));
const userRole_routes_1 = __importDefault(require("./modules/user-role/userRole.routes"));
const organization_routes_1 = __importDefault(require("./modules/organizations/organization.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
app.use("/api/v1", routes_1.default);
app.use("/api/v1/roles", role_routes_1.default);
app.use("/api/v1/permissions", permission_routes_1.default);
app.use("/api/v1/role-permissions", rolePermission_routes_1.default);
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/users", userRole_routes_1.default);
app.use("/api/v1/organizations", organization_routes_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
