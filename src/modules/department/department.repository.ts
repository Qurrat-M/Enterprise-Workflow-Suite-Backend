import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";

import {
  CreateDepartmentInput,
  DepartmentQuery,
  UpdateDepartmentInput,
} from "./department.types";

class DepartmentRepository {
  async create(data: CreateDepartmentInput) {
    const result = await db.query(
      `
      INSERT INTO departments
      (
        organization_id,
        name,
        code,
        description
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING *;
      `,
      [data.organization_id, data.name, data.code, data.description ?? null],
    );

    return result.rows[0];
  }

  async findByCode(organizationId: string, code: string) {
    const result = await db.query(
      `
      SELECT *
      FROM departments
      WHERE organization_id = $1
        AND LOWER(code) = LOWER($2);
      `,
      [organizationId, code],
    );

    return result.rows[0];
  }

  async findAll(organizationId: string, query: DepartmentQuery) {
    const { page, limit, offset, search, sort, order } = getPagination(query);

    const allowedSortColumns = ["name", "code", "status", "created_at"];

    const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";

    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM departments
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(code) LIKE LOWER($2)
          OR LOWER(COALESCE(description, '')) LIKE LOWER($2)
        );
      `,
      [organizationId, `%${search}%`],
    );

    const totalRecords = Number(countResult.rows[0].total);

    const result = await db.query(
      `
      SELECT *
      FROM departments
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(code) LIKE LOWER($2)
          OR LOWER(COALESCE(description, '')) LIKE LOWER($2)
        )
      ORDER BY ${sortColumn} ${order}
      LIMIT $3
      OFFSET $4;
      `,
      [organizationId, `%${search}%`, limit, offset],
    );

    return {
      items: result.rows,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    };
  }

  async findById(organizationId: string, id: string) {
    const result = await db.query(
      `
      SELECT *
      FROM departments
      WHERE id = $1
        AND organization_id = $2;
      `,
      [id, organizationId],
    );

    return result.rows[0];
  }

  async update(
    organizationId: string,
    id: string,
    data: UpdateDepartmentInput,
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];

    let parameterIndex = 1;

    const allowedFields: (keyof UpdateDepartmentInput)[] = [
      "name",
      "code",
      "description",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        fields.push(`${field} = $${parameterIndex}`);
        values.push(data[field]);
        parameterIndex++;
      }
    }

    if (fields.length === 0) {
      return this.findById(organizationId, id);
    }

    fields.push("updated_at = NOW()");

    values.push(id);
    const idParameter = parameterIndex++;

    values.push(organizationId);

    const organizationParameter = parameterIndex;

    const result = await db.query(
      `
      UPDATE departments
      SET
        ${fields.join(", ")}
      WHERE id = $${idParameter}
        AND organization_id = $${organizationParameter}
      RETURNING *;
      `,
      values,
    );

    return result.rows[0];
  }

  async updateStatus(
    organizationId: string,
    id: string,
    status: "ACTIVE" | "INACTIVE",
  ) {
    const result = await db.query(
      `
      UPDATE departments
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
        AND organization_id = $3
      RETURNING *;
      `,
      [status, id, organizationId],
    );

    return result.rows[0];
  }

  async delete(organizationId: string, id: string) {
    const result = await db.query(
      `
      UPDATE departments
      SET
        status = 'INACTIVE',
        updated_at = NOW()
      WHERE id = $1
        AND organization_id = $2
      RETURNING *;
      `,
      [id, organizationId],
    );

    return result.rows[0];
  }
}

export default new DepartmentRepository();
