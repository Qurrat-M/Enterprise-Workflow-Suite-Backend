export interface AssignRolesBody {
  roleIds: string[];
}

export interface UserRoleParams {
  userId: string;
}

export interface DeleteUserRoleParams {
  userId: string;
  roleId: string;
}
