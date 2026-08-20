export type UserStatus = "ACTIVE" | "INACTIVE";

export interface CreateUserInput {
  organization_id: string;
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  organization_id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}
