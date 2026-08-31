export type AssetStatus =
  "available" | "assigned" | "returned" | "transferred" | "disposed";

export interface Asset {
  id: string;
  organization_id: string;
  name: string;
  asset_code: string;
  category: string | null;
  description: string | null;
  purchase_date: string | null;
  purchase_cost: string | null;
  status: AssetStatus;
  assigned_to: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAssetInput {
  name: string;
  asset_code: string;
  category?: string;
  description?: string;
  purchase_date?: string;
  purchase_cost?: number;
}

export interface UpdateAssetInput {
  name?: string;
  asset_code?: string;
  category?: string;
  description?: string;
  purchase_date?: string;
  purchase_cost?: number;
}

export interface AssetQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?:
    "name" | "asset_code" | "category" | "status" | "created_at" | "updated_at";
  order?: "asc" | "desc";
}
