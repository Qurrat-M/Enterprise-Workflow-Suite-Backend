import bcrypt from "bcrypt";

import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";

import organizationRepository from "../organizations/organization.repository";
import userRepository from "./user.repository";

import {
  CreateUserInput,
  UpdateUserInput,
  UserQuery,
  UserStatus,
} from "./user.types";

class UserService {
  async create(organizationId: string, data: CreateUserInput) {
    const email = data.email.trim().toLowerCase();

    const existing = await userRepository.findByEmail(email);

    if (existing) {
      throw new ApiError(HTTP_STATUS.CONFLICT, "Email already exists");
    }

    const organization = await organizationRepository.findById(organizationId);

    if (!organization) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Organization not found");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    return userRepository.create(
      {
        ...data,
        organizationId,
      },
      passwordHash,
    );
  }

  async getAll(organizationId: string, query: UserQuery) {
    return userRepository.findAll(organizationId, query);
  }

  async getById(id: string, organizationId: string) {
    const user = await userRepository.findById(id, organizationId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    return user;
  }

  async update(id: string, organizationId: string, data: UpdateUserInput) {
    await this.getById(id, organizationId);

    if (data.email) {
      const email = data.email.trim().toLowerCase();

      const existing = await userRepository.findByEmail(email);

      if (existing && existing.id !== id) {
        throw new ApiError(HTTP_STATUS.CONFLICT, "Email already exists");
      }

      data.email = email;
    }

    return userRepository.update(id, organizationId, data);
  }

  async updateStatus(id: string, organizationId: string, status: UserStatus) {
    await this.getById(id, organizationId);

    return userRepository.updateStatus(id, organizationId, status);
  }

  async delete(id: string, organizationId: string) {
    return this.updateStatus(id, organizationId, "INACTIVE");
  }

  async replaceRoles(id: string, organizationId: string, roleIds: string[]) {
    await this.getById(id, organizationId);

    const uniqueRoleIds = [...new Set(roleIds)];

    return userRepository.replaceRoles(id, organizationId, uniqueRoleIds);
  }

  async getRoles(id: string, organizationId: string) {
    await this.getById(id, organizationId);

    return userRepository.getRoles(id, organizationId);
  }
}

export default new UserService();
