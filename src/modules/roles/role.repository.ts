import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";
import { RoleQuery } from "./role.types";

class RoleRepository {
  async createRole(name: string, description?: string) {
    const { rows } = await db.query(
      `
      INSERT INTO roles
      (
        name,
        description
      )
      VALUES
      (
        $1,
        $2
      )
      RETURNING *;
      `,
      [name, description ?? null],
    );

    return rows[0];
  }

  async getAllRoles() {
    const { rows } = await db.query(`
      SELECT *
      FROM roles
      WHERE is_active = true
      ORDER BY created_at DESC;
    `);

    return rows;
  }

  async findRoleById(id: string) {
    const { rows } = await db.query(
      `
      SELECT *
      FROM roles
      WHERE id=$1;
      `,
      [id],
    );

    return rows[0];
  }

  async findRoleByName(name: string) {
    const { rows } = await db.query(
      `
      SELECT *
      FROM roles
      WHERE LOWER(name)=LOWER($1);
      `,
      [name],
    );

    return rows[0];
  }

  async updateRole(id: string, name: string, description?: string) {
    const { rows } = await db.query(
      `
      UPDATE roles
      SET
      name=$1,
      description=$2,
      updated_at=CURRENT_TIMESTAMP
      WHERE id=$3
      RETURNING *;
      `,
      [name, description ?? null, id],
    );

    return rows[0];
  }

  async findAll(query: RoleQuery) {
    const { page, limit, offset, search, sort, order } = getPagination(query);

    // Allow sorting only on these columns
    const allowedSortColumns = ["name", "created_at", "updated_at"];

    const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";

    // Total count
    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM roles
      WHERE
        is_active = true
        AND (
          LOWER(name) LIKE LOWER($1)
          OR LOWER(COALESCE(description,'')) LIKE LOWER($1)
        );
    `,
      [`%${search}%`],
    );

    const totalRecords = Number(countResult.rows[0].total);

    // Data query
    const result = await db.query(
      `
      SELECT *
      FROM roles
      WHERE
        is_active = true
        AND (
          LOWER(name) LIKE LOWER($1)
          OR LOWER(COALESCE(description,'')) LIKE LOWER($1)
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

  async deleteRole(id: string) {
    const { rows } = await db.query(
      `
      UPDATE roles
      SET
      is_active=false,
      updated_at=CURRENT_TIMESTAMP
      WHERE id=$1
      RETURNING *;
      `,
      [id],
    );

    return rows[0];
  }

  async getRolePermissions(roleId: string) {
    const { rows } = await db.query(
      `
    SELECT
      p.id,
      p.module,
      p.action,
      p.name,
      p.display_name,
      p.description,
      p.is_active,
      p.created_at
    FROM role_permissions rp
    INNER JOIN permissions p
      ON p.id = rp.permission_id
    WHERE rp.role_id = $1
      AND p.is_active = true
    ORDER BY p.module, p.action;
    `,
      [roleId],
    );

    return rows;
  }

  async replaceRolePermissions(roleId: string, permissionIds: string[]) {
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Verify role exists
      const roleResult = await client.query(
        `
      SELECT id
      FROM roles
      WHERE id = $1
        AND is_active = true;
      `,
        [roleId],
      );

      if (!roleResult.rows.length) {
        throw new Error("Role not found");
      }

      // Remove existing permissions
      await client.query(
        `
      DELETE FROM role_permissions
      WHERE role_id = $1;
      `,
        [roleId],
      );

      // Assign new permissions
      if (permissionIds.length) {
        await client.query(
          `
        INSERT INTO role_permissions (
          role_id,
          permission_id
        )
        SELECT
          $1,
          p.id
        FROM permissions p
        WHERE p.id = ANY($2::uuid[])
          AND p.is_active = true
        ON CONFLICT (role_id, permission_id)
        DO NOTHING;
        `,
          [roleId, permissionIds],
        );
      }

      // Return assigned permissions
      const { rows } = await client.query(
        `
      SELECT
        p.id,
        p.module,
        p.action,
        p.name,
        p.display_name,
        p.description,
        p.is_active,
        p.created_at
      FROM role_permissions rp
      INNER JOIN permissions p
        ON p.id = rp.permission_id
      WHERE rp.role_id = $1
        AND p.is_active = true
      ORDER BY p.module, p.action;
      `,
        [roleId],
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

  async updateRoleStatus(id: string, isActive: boolean) {
    const { rows } = await db.query(
      `
    UPDATE roles
    SET
      is_active = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
    `,
      [isActive, id],
    );

    return rows[0];
  }
}

export const roleRepository = new RoleRepository();
