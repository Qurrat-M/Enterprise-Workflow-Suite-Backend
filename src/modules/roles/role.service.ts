import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";
import { roleRepository } from "./role.repository";

class RoleService {
  async createRole(name: string, description?: string) {
    const existing = await roleRepository.findRoleByName(name);

    if (existing) {
      throw new ApiError(HTTP_STATUS.CONFLICT, "Role already exists");
    }

    return roleRepository.createRole(name, description);
  }

  async getRoles() {
    return roleRepository.getAllRoles();
  }

  async getRoleById(id: string) {
    const role = await roleRepository.findRoleById(id);

    if (!role) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }

    return role;
  }

  async updateRole(id: string, name: string, description?: string) {
    const role = await roleRepository.findRoleById(id);

    if (!role) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }

    const existing = await roleRepository.findRoleByName(name);

    if (existing && existing.id !== id) {
      throw new ApiError(HTTP_STATUS.CONFLICT, "Role already exists");
    }

    return roleRepository.updateRole(id, name, description);
  }

  async deleteRole(id: string) {
    const role = await roleRepository.findRoleById(id);

    if (!role) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Role not found");
    }

    if (role.is_system) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "System roles cannot be deleted",
      );
    }

    return roleRepository.deleteRole(id);
  }
}

export const roleService = new RoleService();
