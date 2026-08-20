import bcrypt from "bcrypt";
import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";
import { roleRepository } from "../roles/role.repository";
import organizationRepository from "../organizations/organization.repository";
import userRepository from "./user.repository";
import {
  CreateUserInput,
  UpdateUserInput,
  UserQuery,
  UserStatus,
} from "./user.types";

class UserService {
  async create(data: CreateUserInput) {
    if (await userRepository.findByEmail(data.email))
      throw new ApiError(HTTP_STATUS.CONFLICT, "Email already exists");
    if (!(await organizationRepository.findById(data.organization_id)))
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Organization not found");
    return userRepository.create(data, await bcrypt.hash(data.password, 10));
  }

  async getAll(query: UserQuery) {
    return userRepository.findAll(query);
  }

  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    return user;
  }

  async update(id: string, data: UpdateUserInput) {
    await this.getById(id);
    if (
      data.organization_id &&
      !(await organizationRepository.findById(data.organization_id))
    )
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Organization not found");
    if (data.email) {
      const existing = await userRepository.findByEmail(data.email);
      if (existing && existing.id !== id)
        throw new ApiError(HTTP_STATUS.CONFLICT, "Email already exists");
    }
    return userRepository.update(
      id,
      data,
      data.password ? await bcrypt.hash(data.password, 10) : undefined,
    );
  }

  async updateStatus(id: string, status: UserStatus) {
    await this.getById(id);
    return userRepository.updateStatus(id, status);
  }

  async delete(id: string) {
    return this.updateStatus(id, "INACTIVE");
  }
  
  async replaceRoles(id: string, roleIds: string[]) {
    await this.getById(id);
    for (const roleId of roleIds)
      if (!(await roleRepository.findRoleById(roleId)))
        throw new ApiError(HTTP_STATUS.NOT_FOUND, `Role ${roleId} not found`);
    return userRepository.replaceRoles(id, [...new Set(roleIds)]);
  }
}
export default new UserService();
