import { ApiError } from "../../utils/ApiError";
import { HTTP_STATUS } from "../../constants";

import rolePermissionRepository from "./rolePermission.repository";
import { roleRepository } from "../roles/role.repository";
import permissionRepository from "../permissions/permission.repository";

class RolePermissionService {
  async assignPermissions(roleId: string, permissionIds: string[]) {
    const role = await roleRepository.findRoleById(roleId);

    if (!role) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }

    for (const permissionId of permissionIds) {
      const permission = await permissionRepository.findById(permissionId);

      if (!permission) {
        throw new ApiError(
          HTTP_STATUS.NOT_FOUND,
          `Permission ${permissionId} not found`,
        );
      }
    }

    await rolePermissionRepository.assignPermissions(roleId, permissionIds);

    return rolePermissionRepository.getRolePermissions(roleId);
  }

  async getRolePermissions(roleId: string) {
    const role = await roleRepository.findRoleById(roleId);

    if (!role) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }

    return rolePermissionRepository.getRolePermissions(roleId);
  }

  async removePermission(roleId: string, permissionId: string) {
    const role = await roleRepository.findRoleById(roleId);

    if (!role) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }

    await rolePermissionRepository.removePermission(roleId, permissionId);
  }
}

export default new RolePermissionService();
