export type OrganizationStatus = "ACTIVE" | "INACTIVE";

export interface Organization {
  id: string;
  name: string;
  code: string;
  logo_url: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  timezone: string;
  currency: string;
  status: OrganizationStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOrganizationInput {
  name: string;
  code: string;
  logo_url?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  timezone?: string;
  currency?: string;
}

export interface UpdateOrganizationInput {
  name?: string;
  code?: string;
  logo_url?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  timezone?: string;
  currency?: string;
}

export interface OrganizationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}
