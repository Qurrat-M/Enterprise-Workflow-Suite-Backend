"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
class RolePermissionRepository {
    async assignPermissions(roleId, permissionIds) {
        for (const permissionId of permissionIds) {
            await db_1.db.query(`
        INSERT INTO role_permissions
        (role_id, permission_id)
        VALUES($1,$2)
        ON CONFLICT DO NOTHING;
        `, [roleId, permissionId]);
        }
    }
    async getRolePermissions(roleId) {
        const { rows } = await db_1.db.query(`
      SELECT
        p.*
      FROM role_permissions rp
      INNER JOIN permissions p
        ON rp.permission_id = p.id
      WHERE
        rp.role_id = $1
        AND p.is_active = true
      ORDER BY p.module, p.action;
      `, [roleId]);
        return rows;
    }
    async removePermission(roleId, permissionId) {
        await db_1.db.query(`
      DELETE
      FROM role_permissions
      WHERE
        role_id=$1
        AND permission_id=$2;
      `, [roleId, permissionId]);
    }
}
exports.default = new RolePermissionRepository();
