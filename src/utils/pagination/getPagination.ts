import { PaginationQuery } from "./pagination.types";

export const getPagination = (query: PaginationQuery) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  return {
    page,
    limit,
    offset: (page - 1) * limit,
    search: query.search || "",
    sort: query.sort || "created_at",
    order: query.order === "asc" ? "ASC" : "DESC",
  };
};
