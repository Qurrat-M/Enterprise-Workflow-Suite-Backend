import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";

import organizationRepository from "./organization.repository";

import {
  CreateOrganizationInput,
  OrganizationQuery,
  OrganizationStatus,
  UpdateOrganizationInput,
} from "./organization.types";

class OrganizationService {
  /**
   * Create organization
   */
  async createOrganization(data: CreateOrganizationInput) {
    const existing = await organizationRepository.findByCode(data.code);

    if (existing) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Organization code already exists",
      );
    }

    return organizationRepository.create(data);
  }

  /**
   * Get organizations
   */
  async getOrganizations(query: OrganizationQuery) {
    return organizationRepository.findAll(query);
  }

  /**
   * Get organization by ID
   */
  async getOrganizationById(id: string) {
    const organization = await organizationRepository.findById(id);

    if (!organization) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Organization not found");
    }

    return organization;
  }

  /**
   * Update organization
   */
  async updateOrganization(id: string, data: UpdateOrganizationInput) {
    const organization = await organizationRepository.findById(id);

    if (!organization) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Organization not found");
    }

    /**
     * Prevent updating an inactive organization.
     *
     * Remove this check if you want inactive organizations
     * to still be editable.
     */
    if (organization.status === "INACTIVE") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Inactive organization cannot be updated",
      );
    }

    /**
     * Check duplicate organization code
     */
    if (data.code) {
      const existing = await organizationRepository.findByCode(data.code);

      if (existing && existing.id !== id) {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          "Organization code already exists",
        );
      }
    }

    return organizationRepository.update(id, data);
  }

  /**
   * Activate / Deactivate organization
   */
  async updateOrganizationStatus(id: string, status: OrganizationStatus) {
    const organization = await organizationRepository.findById(id);

    if (!organization) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Organization not found");
    }

    /**
     * Avoid unnecessary DB update
     */
    if (organization.status === status) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `Organization is already ${status.toLowerCase()}`,
      );
    }

    return organizationRepository.updateStatus(id, status);
  }

  /**
   * Soft delete organization
   */
  async deleteOrganization(id: string) {
    const organization = await organizationRepository.findById(id);

    if (!organization) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Organization not found");
    }

    if (organization.status === "INACTIVE") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Organization is already inactive",
      );
    }

    return organizationRepository.delete(id);
  }
}

export default new OrganizationService();
