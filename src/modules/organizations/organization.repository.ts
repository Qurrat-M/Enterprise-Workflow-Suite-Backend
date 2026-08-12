import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";
import {
  CreateOrganizationInput,
  OrganizationQuery,
  UpdateOrganizationInput,
} from "./organization.types";

class OrganizationRepository {
  async create(data: CreateOrganizationInput) {
    const result = await db.query(
      `
      INSERT INTO organizations
      (
        name,
        code,
        logo_url,
        email,
        phone,
        website,
        address,
        city,
        country,
        timezone,
        currency
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
      )
      RETURNING *;
      `,
      [
        data.name,
        data.code,
        data.logo_url ?? null,
        data.email ?? null,
        data.phone ?? null,
        data.website ?? null,
        data.address ?? null,
        data.city ?? null,
        data.country ?? null,
        data.timezone ?? "Asia/Karachi",
        data.currency ?? "PKR",
      ],
    );

    return result.rows[0];
  }

  async findByCode(code: string) {
    const result = await db.query(
      `
      SELECT *
      FROM organizations
      WHERE LOWER(code) = LOWER($1);
      `,
      [code],
    );

    return result.rows[0];
  }

  async findAll(query: OrganizationQuery) {
    const { page, limit, offset, search, sort, order } = getPagination(query);

    const allowedSortColumns = [
      "name",
      "code",
      "city",
      "country",
      "status",
      "created_at",
    ];

    const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";

    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM organizations
      WHERE
        (
          LOWER(name) LIKE LOWER($1)
          OR LOWER(code) LIKE LOWER($1)
          OR LOWER(COALESCE(email, '')) LIKE LOWER($1)
          OR LOWER(COALESCE(city, '')) LIKE LOWER($1)
          OR LOWER(COALESCE(country, '')) LIKE LOWER($1)
        );
      `,
      [`%${search}%`],
    );

    const totalRecords = Number(countResult.rows[0].total);

    const result = await db.query(
      `
      SELECT *
      FROM organizations
      WHERE
        (
          LOWER(name) LIKE LOWER($1)
          OR LOWER(code) LIKE LOWER($1)
          OR LOWER(COALESCE(email, '')) LIKE LOWER($1)
          OR LOWER(COALESCE(city, '')) LIKE LOWER($1)
          OR LOWER(COALESCE(country, '')) LIKE LOWER($1)
        )
      ORDER BY ${sortColumn} ${order}
      LIMIT $2
      OFFSET $3;
      `,
      [`%${search}%`, limit, offset],
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

  async findById(id: string) {
    const result = await db.query(
      `
      SELECT *
      FROM organizations
      WHERE id = $1;
      `,
      [id],
    );

    return result.rows[0];
  }

  async update(id: string, data: UpdateOrganizationInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    let parameterIndex = 1;

    const allowedFields: (keyof UpdateOrganizationInput)[] = [
      "name",
      "code",
      "logo_url",
      "email",
      "phone",
      "website",
      "address",
      "city",
      "country",
      "timezone",
      "currency",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        fields.push(`${field} = $${parameterIndex}`);
        values.push(data[field]);
        parameterIndex++;
      }
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push("updated_at = NOW()");

    values.push(id);

    const result = await db.query(
      `
      UPDATE organizations
      SET
        ${fields.join(", ")}
      WHERE id = $${parameterIndex}
      RETURNING *;
      `,
      values,
    );

    return result.rows[0];
  }

  async updateStatus(id: string, status: "ACTIVE" | "INACTIVE") {
    const result = await db.query(
      `
      UPDATE organizations
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING *;
      `,
      [status, id],
    );

    return result.rows[0];
  }

  async delete(id: string) {
    const result = await db.query(
      `
      UPDATE organizations
      SET
        status = 'INACTIVE',
        updated_at = NOW()
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );

    return result.rows[0];
  }
}

export default new OrganizationRepository();
