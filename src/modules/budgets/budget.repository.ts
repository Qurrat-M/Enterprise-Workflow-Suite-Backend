import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";

import {
  BudgetQuery,
  BudgetStatus,
  CreateBudgetInput,
  UpdateBudgetInput,
} from "./budget.types";

class BudgetRepository {
  /**
   * Create budget within an organization
   */
  async create(organizationId: string, data: CreateBudgetInput) {
    const { rows } = await db.query(
      `
      INSERT INTO budgets (
        organization_id,
        name,
        amount
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        organization_id,
        name,
        amount,
        status,
        created_at,
        updated_at;
      `,
      [organizationId, data.name, data.amount],
    );

    return rows[0];
  }

  /**
   * Get a single budget belonging to an organization
   */
  async findById(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      SELECT
        id,
        organization_id,
        name,
        amount,
        status,
        created_at,
        updated_at
      FROM budgets
      WHERE id = $1
        AND organization_id = $2;
      `,
      [id, organizationId],
    );

    return rows[0];
  }

  /**
   * Get paginated budgets belonging to an organization
   */
  async findAll(organizationId: string, query: BudgetQuery) {
    const { page, limit, offset, search, sort, order } = getPagination(query);

    const allowedSortColumns = [
      "name",
      "amount",
      "status",
      "created_at",
      "updated_at",
    ];

    const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";

    const filter = `%${search || ""}%`;

    /**
     * Count total records
     */
    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM budgets
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(status) LIKE LOWER($2)
        );
      `,
      [organizationId, filter],
    );

    /**
     * Fetch budgets
     */
    const { rows } = await db.query(
      `
      SELECT
        id,
        organization_id,
        name,
        amount,
        status,
        created_at,
        updated_at
      FROM budgets
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(status) LIKE LOWER($2)
        )
      ORDER BY ${sortColumn} ${order}
      LIMIT $3
      OFFSET $4;
      `,
      [organizationId, filter, limit, offset],
    );

    const totalRecords = Number(countResult.rows[0].total);

    return {
      items: rows,

      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    };
  }

  /**
   * Update budget information
   */
  async update(id: string, organizationId: string, data: UpdateBudgetInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    const add = (field: string, value: unknown) => {
      values.push(value);
      fields.push(`${field} = $${values.length}`);
    };

    if (data.name !== undefined) {
      add("name", data.name);
    }

    if (data.amount !== undefined) {
      add("amount", data.amount);
    }

    /**
     * Nothing to update
     */
    if (!fields.length) {
      return this.findById(id, organizationId);
    }

    fields.push("updated_at = NOW()");

    /**
     * ID parameter
     */
    values.push(id);

    /**
     * Organization ID parameter
     */
    values.push(organizationId);

    const { rows } = await db.query(
      `
      UPDATE budgets
      SET ${fields.join(", ")}
      WHERE id = $${values.length - 1}
        AND organization_id = $${values.length}
      RETURNING
        id,
        organization_id,
        name,
        amount,
        status,
        created_at,
        updated_at;
      `,
      values,
    );

    return rows[0];
  }

  /**
   * Update budget status
   */
  async updateStatus(id: string, organizationId: string, status: BudgetStatus) {
    const { rows } = await db.query(
      `
      UPDATE budgets
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
        AND organization_id = $3
      RETURNING
        id,
        organization_id,
        name,
        amount,
        status,
        created_at,
        updated_at;
      `,
      [status, id, organizationId],
    );

    return rows[0];
  }

  /**
   * Delete budget
   */
  async delete(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      DELETE FROM budgets
      WHERE id = $1
        AND organization_id = $2
      RETURNING id;
      `,
      [id, organizationId],
    );

    return rows[0];
  }
}

export default new BudgetRepository();
