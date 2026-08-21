export type UserStatus = "ACTIVE" | "INACTIVE";

export interface CreateUserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  organizationId: string;
}
export interface UpdateUserInput {
  first_name?: string;
  last_name?: string;
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
