export type UserStatus = "ACTIVE" | "INACTIVE";

export interface CreateUserInput {
  organization_id: string;
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface AuthenticatedUser {
  id: string;
  organizationId: string;
  email: string;
  roles?: string[];
  permissions?: string[];
}
