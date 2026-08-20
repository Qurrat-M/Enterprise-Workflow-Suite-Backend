"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
const getPagination_1 = require("../../utils/pagination/getPagination");
class PermissionRepository {
    async create(module, action, name, displayName, description) {
        const result = await db_1.db.query(`
      INSERT INTO permissions
      (
        module,
        action,
        name,
        display_name,
        description
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5
      )
      RETURNING *;
      `, [module, action, name, displayName ?? null, description ?? null]);
        return result.rows[0];
    }
    async findByName(name) {
        const result = await db_1.db.query(`
      SELECT *
      FROM permissions
      WHERE LOWER(name)=LOWER($1)
      AND is_active=true;
      `, [name]);
        return result.rows[0];
    }
    async findAll(query) {
        const { page, limit, offset, search, sort, order } = (0, getPagination_1.getPagination)(query);
        const allowedSortColumns = [
            "module",
            "action",
            "name",
            "display_name",
            "created_at",
        ];
        const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";
        // Total Records
        const countResult = await db_1.db.query(`
      SELECT COUNT(*) AS total
      FROM permissions
      WHERE
        is_active = true
        AND (
          LOWER(module) LIKE LOWER($1)
          OR LOWER(action) LIKE LOWER($1)
          OR LOWER(name) LIKE LOWER($1)
          OR LOWER(COALESCE(display_name,'')) LIKE LOWER($1)
          OR LOWER(COALESCE(description,'')) LIKE LOWER($1)
        );
      `, [`%${search}%`]);
        const totalRecords = Number(countResult.rows[0].total);
        // Data
        const result = await db_1.db.query(`
      SELECT *
      FROM permissions
      WHERE
        is_active = true
        AND (
          LOWER(module) LIKE LOWER($1)
          OR LOWER(action) LIKE LOWER($1)
          OR LOWER(name) LIKE LOWER($1)
          OR LOWER(COALESCE(display_name,'')) LIKE LOWER($1)
          OR LOWER(COALESCE(description,'')) LIKE LOWER($1)
        )
      ORDER BY ${sortColumn} ${order}
      LIMIT $2
      OFFSET $3;
      `, [`%${search}%`, limit, offset]);
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
    async findById(id) {
        const result = await db_1.db.query(`
      SELECT *
      FROM permissions
      WHERE id=$1
      AND is_active=true;
      `, [id]);
        return result.rows[0];
    }
    async update(id, module, action, name, displayName, description) {
        const result = await db_1.db.query(`
      UPDATE permissions
      SET
        module=$1,
        action=$2,
        name=$3,
        display_name=$4,
        description=$5
      WHERE id=$6
      RETURNING *;
      `, [module, action, name, displayName ?? null, description ?? null, id]);
        return result.rows[0];
    }
    async delete(id) {
        const result = await db_1.db.query(`
      UPDATE permissions
      SET
        is_active=false
      WHERE id=$1
      RETURNING *;
      `, [id]);
        return result.rows[0];
    }
}
exports.default = new PermissionRepository();
