import { ApiError } from "../../utils/ApiError";
import { HTTP_STATUS } from "../../constants";
import permissionRepository from "./permission.repository";
import { PermissionQuery } from "./permission.types";

class PermissionService {
  async createPermission(
    module: string,
    action: string,
    displayName?: string,
    description?: string,
  ) {
    const name = `${module.toLowerCase()}.${action.toLowerCase()}`;

    const exists = await permissionRepository.findByName(name);

    if (exists) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Permission already exists");
    }

    return permissionRepository.create(
      module,
      action,
      name,
      displayName,
      description,
    );
  }

  async getPermissions(query: PermissionQuery) {
    return permissionRepository.findAll(query);
  }

  async getPermissionById(id: string) {
    const permission = await permissionRepository.findById(id);

    if (!permission) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Permission not found");
    }

    return permission;
  }

  async updatePermission(
    id: string,
    module: string,
    action: string,
    displayName?: string,
    description?: string,
  ) {
    const name = `${module.toLowerCase()}.${action.toLowerCase()}`;

    return permissionRepository.update(
      id,
      module,
      action,
      name,
      displayName,
      description,
    );
  }

  async deletePermission(id: string) {
    const permission = await permissionRepository.findById(id);

    if (!permission) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Permission not found");
    }

    return permissionRepository.delete(id);
  }
}

export default new PermissionService();
