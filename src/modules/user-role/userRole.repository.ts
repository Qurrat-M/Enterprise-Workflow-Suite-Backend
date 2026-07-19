import { db } from "../../config/db";

class UserRoleRepository {
  async assignRoles(userId: string, roleIds: string[]) {
    for (const roleId of roleIds) {
      await db.query(
        `
        INSERT INTO user_roles
        (user_id, role_id)
        VALUES($1,$2)
        ON CONFLICT DO NOTHING;
        `,
        [userId, roleId],
      );
    }
  }

  async getUserRoles(userId: string) {
    const { rows } = await db.query(
      `
      SELECT
        r.*
      FROM user_roles ur
      INNER JOIN roles r
        ON ur.role_id = r.id
      WHERE
        ur.user_id = $1
        AND r.is_active = true
      ORDER BY r.name;
      `,
      [userId],
    );

    return rows;
  }

  async removeRole(userId: string, roleId: string) {
    await db.query(
      `
      DELETE FROM user_roles
      WHERE
        user_id=$1
        AND role_id=$2;
      `,
      [userId, roleId],
    );
  }

  async getUserPermissions(userId: string) {
    const { rows } = await db.query(
      `
      SELECT DISTINCT
        p.name
      FROM user_roles ur

      INNER JOIN role_permissions rp
        ON ur.role_id = rp.role_id

      INNER JOIN permissions p
        ON rp.permission_id = p.id

      WHERE
        ur.user_id = $1
        AND p.is_active = true;
      `,
      [userId],
    );

    return rows;
  }
}

export default new UserRoleRepository();
