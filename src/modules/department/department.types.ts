export type DepartmentStatus = "ACTIVE" | "INACTIVE";

export interface Department {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  description: string | null;
  status: DepartmentStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDepartmentInput {
  organization_id: string;
  name: string;
  code: string;
  description?: string;
}

export interface UpdateDepartmentInput {
  name?: string;
  code?: string;
  description?: string;
}

export interface DepartmentQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}
