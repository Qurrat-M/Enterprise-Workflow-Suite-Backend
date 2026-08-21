import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";
import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";

import {
  CreateUserInput,
  UpdateUserInput,
  UserQuery,
  UserStatus,
} from "./user.types";

const publicColumns = `
  id,
  first_name,
  last_name,
  email,
  is_active,
  created_at,
  updated_at,
  phone,
  last_login,
  profile_image
`;

class UserRepository {
  /**
   * Create user and add user to organization
   */
  async create(data: CreateUserInput, passwordHash: string) {
    const { rows } = await db.query(
      `
      INSERT INTO users (
        first_name,
        last_name,
        email,
        password
      )
      VALUES ($1, $2, $3, $4)
      RETURNING ${publicColumns};
      `,
      [data.first_name, data.last_name, data.email, passwordHash],
    );

    const user = rows[0];

    // Add user to organization
    await db.query(
      `
      INSERT INTO organization_users (
        organization_id,
        user_id,
        status,
        joined_at
      )
      VALUES ($1, $2, 'active', NOW())
      ON CONFLICT (organization_id, user_id)
      DO NOTHING;
      `,
      [data.organizationId, user.id],
    );

    return user;
  }

  /**
   * Used by authentication.
   *
   * Password hash MUST be returned here.
   *
   * Do NOT use this method for public user responses.
   */
  async findByEmail(email: string) {
    const { rows } = await db.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        password,
        is_active,
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

  /**
   * Get a single user belonging to an organization
   */
  async findById(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      SELECT ${publicColumns}
      FROM users u
      INNER JOIN organization_users ou
        ON ou.user_id = u.id
      WHERE u.id = $1
        AND ou.organization_id = $2
        AND ou.status = 'active';
      `,
      [id, organizationId],
    );

    return rows[0];
  }

  /**
   * Get paginated users belonging to an organization
   */
  async findAll(organizationId: string, query: UserQuery) {
    const { page, limit, offset, search, sort, order } = getPagination(query);

    const allowedSortColumns = [
      "first_name",
      "last_name",
      "email",
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
      FROM users u
      INNER JOIN organization_users ou
        ON ou.user_id = u.id
      WHERE ou.organization_id = $1
        AND ou.status = 'active'
        AND (
          LOWER(u.first_name) LIKE LOWER($2)
          OR LOWER(u.last_name) LIKE LOWER($2)
          OR LOWER(u.email) LIKE LOWER($2)
        );
      `,
      [organizationId, filter],
    );

    /**
     * Fetch users
     */
    const { rows } = await db.query(
      `
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.is_active,
        u.created_at,
        u.updated_at,
        u.phone,
        u.last_login,
        u.profile_image
      FROM users u
      INNER JOIN organization_users ou
        ON ou.user_id = u.id
      WHERE ou.organization_id = $1
        AND ou.status = 'active'
        AND (
          LOWER(u.first_name) LIKE LOWER($2)
          OR LOWER(u.last_name) LIKE LOWER($2)
          OR LOWER(u.email) LIKE LOWER($2)
        )
      ORDER BY u.${sortColumn} ${order}
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
   * Update user information
   */
  async update(id: string, organizationId: string, data: UpdateUserInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    const add = (field: string, value: unknown) => {
      values.push(value);

      fields.push(`${field} = $${values.length}`);
    };

    if (data.first_name !== undefined) {
      add("first_name", data.first_name);
    }

    if (data.last_name !== undefined) {
      add("last_name", data.last_name);
    }

    if (data.email !== undefined) {
      add("email", data.email);
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
      UPDATE users u
      SET ${fields.join(", ")}
      FROM organization_users ou
      WHERE u.id = $${values.length - 1}
        AND ou.user_id = u.id
        AND ou.organization_id = $${values.length}
        AND ou.status = 'active'
      RETURNING ${publicColumns};
      `,
      values,
    );

    return rows[0];
  }

  /**
   * Activate / deactivate user
   */
  async updateStatus(id: string, organizationId: string, status: UserStatus) {
    const isActive = status === "ACTIVE";

    const { rows } = await db.query(
      `
      UPDATE users u
      SET
        is_active = $1,
        updated_at = NOW()
      FROM organization_users ou
      WHERE u.id = $2
        AND ou.user_id = u.id
        AND ou.organization_id = $3
        AND ou.status = 'active'
      RETURNING ${publicColumns};
      `,
      [isActive, id, organizationId],
    );

    return rows[0];
  }

  /**
   * Replace user's roles within an organization
   */
  async replaceRoles(
    userId: string,
    organizationId: string,
    roleIds: string[],
  ) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      /**
       * Confirm user belongs to organization
       */
      const userResult = await client.query(
        `
          SELECT u.id
          FROM users u
          INNER JOIN organization_users ou
            ON ou.user_id = u.id
          WHERE u.id = $1
            AND ou.organization_id = $2
            AND ou.status = 'active';
          `,
        [userId, organizationId],
      );

      if (!userResult.rows.length) {
        throw new ApiError(
          HTTP_STATUS.NOT_FOUND,
          "User does not belong to this organization",
        );
      }

      /**
       * Remove existing roles
       * belonging to this organization only
       */
      await client.query(
        `
        DELETE FROM user_roles ur
        USING roles r
        WHERE ur.user_id = $1
          AND ur.role_id = r.id
          AND r.organization_id = $2;
        `,
        [userId, organizationId],
      );

      /**
       * Assign new roles
       */
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

      /**
       * Return assigned roles
       */
      const { rows } = await client.query(
        `
          SELECT r.*
          FROM user_roles ur
          INNER JOIN roles r
            ON r.id = ur.role_id
          WHERE ur.user_id = $1
            AND r.organization_id = $2
          ORDER BY r.name;
          `,
        [userId, organizationId],
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

  /**
   * Get user's roles within an organization
   */
  async getRoles(userId: string, organizationId: string) {
    const { rows } = await db.query(
      `
      SELECT r.*
      FROM user_roles ur
      INNER JOIN roles r
        ON r.id = ur.role_id
      INNER JOIN organization_users ou
        ON ou.user_id = ur.user_id
      WHERE ur.user_id = $1
        AND ou.organization_id = $2
        AND ou.status = 'active'
        AND r.organization_id = $2
      ORDER BY r.name;
      `,
      [userId, organizationId],
    );

    return rows;
  }
}

export default new UserRepository();
