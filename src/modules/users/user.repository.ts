import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";
import {
  CreateUserInput,
  UpdateUserInput,
  UserQuery,
  UserStatus,
} from "./user.types";

const publicColumns = `
  id,
  organization_id,
  name,
  email,
  status,
  created_at,
  updated_at
`;

class UserRepository {
  async create(data: CreateUserInput, passwordHash: string) {
    const { rows } = await db.query(
      `
      INSERT INTO users (
        organization_id,
        name,
        email,
        password_hash
      )
      VALUES ($1, $2, $3, $4)
      RETURNING ${publicColumns};
      `,
      [data.organization_id, data.name, data.email, passwordHash],
    );

    return rows[0];
  }

  /**
   * Used by authentication.
   * Password hash MUST be returned here.
   */
  async findByEmail(email: string) {
    const { rows } = await db.query(
      `
      SELECT
        id,
        organization_id,
        name,
        email,
        password_hash,
        status,
        created_at,
        updated_at
      FROM users
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1;
      `,
      [email.trim()],
    );

    return rows[0];
  }

  async findById(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      SELECT ${publicColumns}
      FROM users
      WHERE id = $1
        AND organization_id = $2;
      `,
      [id, organizationId],
    );

    return rows[0];
  }

  async findAll(organizationId: string, query: UserQuery) {
    const { page, limit, offset, search, sort, order } = getPagination(query);

    const allowedSortColumns = [
      "name",
      "email",
      "status",
      "created_at",
      "updated_at",
    ];

    const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";

    const filter = `%${search || ""}%`;

    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM users
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(email) LIKE LOWER($2)
        );
      `,
      [organizationId, filter],
    );

    const { rows } = await db.query(
      `
      SELECT ${publicColumns}
      FROM users
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(email) LIKE LOWER($2)
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

  async update(id: string, organizationId: string, data: UpdateUserInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    const add = (field: string, value: unknown) => {
      values.push(value);
      fields.push(`${field} = $${values.length}`);
    };

    if (data.name !== undefined) {
      add("name", data.name);
    }

    if (data.email !== undefined) {
      add("email", data.email);
    }

    if (!fields.length) {
      return this.findById(id, organizationId);
    }

    fields.push("updated_at = NOW()");

    values.push(id);
    values.push(organizationId);

    const { rows } = await db.query(
      `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${values.length - 1}
        AND organization_id = $${values.length}
      RETURNING ${publicColumns};
      `,
      values,
    );

    return rows[0];
  }

  async updateStatus(id: string, organizationId: string, status: UserStatus) {
    const { rows } = await db.query(
      `
      UPDATE users
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
        AND organization_id = $3
      RETURNING ${publicColumns};
      `,
      [status, id, organizationId],
    );

    return rows[0];
  }

  async replaceRoles(
    userId: string,
    organizationId: string,
    roleIds: string[],
  ) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Confirm user belongs to organization
      const userResult = await client.query(
        `
        SELECT id
        FROM users
        WHERE id = $1
          AND organization_id = $2;
        `,
        [userId, organizationId],
      );

      if (!userResult.rows.length) {
        throw new Error("User does not belong to this organization");
      }

      // Remove existing roles
      await client.query(
        `
        DELETE FROM user_roles
        WHERE user_id = $1;
        `,
        [userId],
      );

      // Assign new roles
      if (roleIds.length) {
        await client.query(
          `
          INSERT INTO user_roles (
            user_id,
            role_id
          )
          SELECT
            $1,
            r.id
          FROM roles r
          WHERE r.id = ANY($2::uuid[])
            AND r.organization_id = $3;
          `,
          [userId, roleIds, organizationId],
        );
      }

      // Return assigned roles
      const { rows } = await client.query(
        `
        SELECT
          r.*
        FROM user_roles ur
        INNER JOIN roles r
          ON r.id = ur.role_id
        WHERE ur.user_id = $1
        ORDER BY r.name;
        `,
        [userId],
      );

      await client.query("COMMIT");

      return rows;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getRoles(userId: string, organizationId: string) {
    const { rows } = await db.query(
      `
      SELECT r.*
      FROM user_roles ur
      INNER JOIN roles r
        ON r.id = ur.role_id
      INNER JOIN users u
        ON u.id = ur.user_id
      WHERE ur.user_id = $1
        AND u.organization_id = $2
      ORDER BY r.name;
      `,
      [userId, organizationId],
    );

    return rows;
  }
}

export default new UserRepository();
