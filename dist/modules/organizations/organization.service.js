"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_repository_1 = __importDefault(require("./organization.repository"));
class OrganizationService {
    async createOrganization(data) {
        const existingOrganization = await organization_repository_1.default.findByCode(data.code);
        if (existingOrganization) {
            throw new Error("Organization code already exists");
        }
        return organization_repository_1.default.create(data);
    }
    async getOrganizations(query) {
        return organization_repository_1.default.findAll(query);
    }
    async getOrganizationById(id) {
        const organization = await organization_repository_1.default.findById(id);
        if (!organization) {
            throw new Error("Organization not found");
        }
        return organization;
    }
    async updateOrganization(id, data) {
        // Make sure organization exists
        await this.getOrganizationById(id);
        // If code is being changed, make sure it isn't already used
        if (data.code) {
            const existingOrganization = await organization_repository_1.default.findByCode(data.code);
            if (existingOrganization && existingOrganization.id !== id) {
                throw new Error("Organization code already exists");
            }
        }
        const organization = await organization_repository_1.default.update(id, data);
        if (!organization) {
            throw new Error("Organization not found");
        }
        return organization;
    }
    async updateOrganizationStatus(id, status) {
        // Make sure organization exists
        await this.getOrganizationById(id);
        const organization = await organization_repository_1.default.updateStatus(id, status);
        if (!organization) {
            throw new Error("Organization not found");
        }
        return organization;
    }
    async deleteOrganization(id) {
        // Make sure organization exists
        await this.getOrganizationById(id);
        const organization = await organization_repository_1.default.delete(id);
        if (!organization) {
            throw new Error("Organization not found");
        }
        return organization;
    }
}
exports.default = new OrganizationService();
