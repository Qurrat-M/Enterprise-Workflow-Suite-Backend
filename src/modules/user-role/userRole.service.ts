import { ApiError } from "../../utils/ApiError";
import { HTTP_STATUS } from "../../constants";

import authRepository from "../auth/auth.repository";
import userRoleRepository from "./userRole.repository";
import { roleRepository } from "../roles/role.repository";

class UserRoleService {
  async assignRoles(userId: string, roleIds: string[]) {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    for (const roleId of roleIds) {
      const role = await roleRepository.findRoleById(roleId);

      if (!role) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, `Role ${roleId} not found`);
      }
    }

    await userRoleRepository.assignRoles(userId, roleIds);

    return userRoleRepository.getUserRoles(userId);
  }

  async getUserRoles(userId: string) {
    return userRoleRepository.getUserRoles(userId);
  }

  async removeRole(userId: string, roleId: string) {
    await userRoleRepository.removeRole(userId, roleId);
  }
}

export default new UserRoleService();
