export type BudgetStatus =
  "draft" | "pending" | "approved" | "rejected" | "closed";

export interface CreateBudgetInput {
  name: string;
  amount: number;
}

export interface UpdateBudgetInput {
  name?: string;
  amount?: number;
}

export interface UpdateBudgetStatusInput {
  status: BudgetStatus;
}

export interface BudgetQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface Budget {
  id: string;
  organization_id: string;
  name: string;
  amount: number;
  status: BudgetStatus;
  created_at: Date;
  updated_at: Date;
}
