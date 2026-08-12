import organizationRepository from "./organization.repository";

import {
  CreateOrganizationInput,
  OrganizationStatus,
  OrganizationQuery,
  UpdateOrganizationInput,
} from "./organization.types";

class OrganizationService {
  async createOrganization(data: CreateOrganizationInput) {
    const existingOrganization = await organizationRepository.findByCode(
      data.code,
    );

    if (existingOrganization) {
      throw new Error("Organization code already exists");
    }

    return organizationRepository.create(data);
  }

  async getOrganizations(query: OrganizationQuery) {
    return organizationRepository.findAll(query);
  }

  async getOrganizationById(id: string) {
    const organization = await organizationRepository.findById(id);

    if (!organization) {
      throw new Error("Organization not found");
    }

    return organization;
  }

  async updateOrganization(id: string, data: UpdateOrganizationInput) {
    // Make sure organization exists
    await this.getOrganizationById(id);

    // If code is being changed, make sure it isn't already used
    if (data.code) {
      const existingOrganization = await organizationRepository.findByCode(
        data.code,
      );

      if (existingOrganization && existingOrganization.id !== id) {
        throw new Error("Organization code already exists");
      }
    }

    const organization = await organizationRepository.update(id, data);

    if (!organization) {
      throw new Error("Organization not found");
    }

    return organization;
  }

  async updateOrganizationStatus(id: string, status: OrganizationStatus) {
    // Make sure organization exists
    await this.getOrganizationById(id);

    const organization = await organizationRepository.updateStatus(id, status);

    if (!organization) {
      throw new Error("Organization not found");
    }

    return organization;
  }

  async deleteOrganization(id: string) {
    // Make sure organization exists
    await this.getOrganizationById(id);

    const organization = await organizationRepository.delete(id);

    if (!organization) {
      throw new Error("Organization not found");
    }

    return organization;
  }
}

export default new OrganizationService();
