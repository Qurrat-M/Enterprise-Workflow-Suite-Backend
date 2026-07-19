import { db } from "../../config/db";

class RolePermissionRepository {
  async assignPermissions(roleId: string, permissionIds: string[]) {
    for (const permissionId of permissionIds) {
      await db.query(
        `
        INSERT INTO role_permissions
        (role_id, permission_id)
        VALUES($1,$2)
        ON CONFLICT DO NOTHING;
        `,
        [roleId, permissionId],
      );
    }
  }

  async getRolePermissions(roleId: string) {
    const { rows } = await db.query(
      `
      SELECT
        p.*
      FROM role_permissions rp
      INNER JOIN permissions p
        ON rp.permission_id = p.id
      WHERE
        rp.role_id = $1
        AND p.is_active = true
      ORDER BY p.module, p.action;
      `,
      [roleId],
    );

    return rows;
  }

  async removePermission(roleId: string, permissionId: string) {
    await db.query(
      `
      DELETE
      FROM role_permissions
      WHERE
        role_id=$1
        AND permission_id=$2;
      `,
      [roleId, permissionId],
    );
  }
}

export default new RolePermissionRepository();
