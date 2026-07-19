export interface AssignPermissionsBody {
  permissionIds: string[];
}

export interface RolePermissionParams {
  roleId: string;
}

export interface DeleteRolePermissionParams {
  roleId: string;
  permissionId: string;
}
