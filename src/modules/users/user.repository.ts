import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";
import {
  CreateUserInput,
  UpdateUserInput,
  UserQuery,
  UserStatus,
} from "./user.types";

const publicColumns =
  "id, organization_id, name, email, status, created_at, updated_at";

class UserRepository {
  async create(data: CreateUserInput, passwordHash: string) {
    const { rows } = await db.query(
      `INSERT INTO users (organization_id, name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING ${publicColumns};`,
      [data.organization_id, data.name, data.email, passwordHash],
    );
    return rows[0];
  }

  async findById(id: string) {
    const { rows } = await db.query(
      `SELECT ${publicColumns} FROM users WHERE id = $1;`,
      [id],
    );
    return rows[0];
  }

  async findByEmail(email: string) {
    const { rows } = await db.query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER($1);",
      [email],
    );
    return rows[0];
  }

  async findAll(query: UserQuery) {
    const { page, limit, offset, search, sort, order } = getPagination(query);
    const allowedSortColumns = [
      "name",
      "email",
      "status",
      "created_at",
      "updated_at",
    ];
    const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";
    const filter = "%" + search + "%";
    const count = await db.query(
      "SELECT COUNT(*) AS total FROM users WHERE LOWER(name) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1);",
      [filter],
    );
    const { rows } = await db.query(
      `SELECT ${publicColumns} FROM users WHERE LOWER(name) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1) ORDER BY ${sortColumn} ${order} LIMIT $2 OFFSET $3;`,
      [filter, limit, offset],
    );
    const totalRecords = Number(count.rows[0].total);
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

  async update(id: string, data: UpdateUserInput, passwordHash?: string) {
    const fields: string[] = [];
    const values: unknown[] = [];
    const add = (field: string, value: unknown) => {
      values.push(value);
      fields.push(`${field} = $${values.length}`);
    };
    if (data.organization_id !== undefined)
      add("organization_id", data.organization_id);
    if (data.name !== undefined) add("name", data.name);
    if (data.email !== undefined) add("email", data.email);
    if (passwordHash !== undefined) add("password_hash", passwordHash);
    if (!fields.length) return this.findById(id);
    fields.push("updated_at = NOW()");
    values.push(id);
    const { rows } = await db.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING ${publicColumns};`,
      values,
    );
    return rows[0];
  }

  async updateStatus(id: string, status: UserStatus) {
    const { rows } = await db.query(
      `UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING ${publicColumns};`,
      [status, id],
    );
    return rows[0];
  }

  async replaceRoles(userId: string, roleIds: string[]) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      await client.query("DELETE FROM user_roles WHERE user_id = $1", [userId]);
      for (const roleId of roleIds)
        await client.query(
          "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
          [userId, roleId],
        );
      const { rows } = await client.query(
        "SELECT r.* FROM user_roles ur INNER JOIN roles r ON r.id = ur.role_id WHERE ur.user_id = $1 ORDER BY r.name",
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
}

export default new UserRepository();
