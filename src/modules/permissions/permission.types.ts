import { PaginationQuery } from "../../utils/pagination/pagination.types";

export interface CreatePermissionBody {
  module: string;
  action: string;
  display_name?: string;
  description?: string;
}

export interface UpdatePermissionBody {
  module?: string;
  action?: string;
  display_name?: string;
  description?: string;
}

export interface PermissionParams {
  id: string;
}

export interface PermissionQuery extends PaginationQuery {}
