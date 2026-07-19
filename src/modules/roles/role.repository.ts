import { db } from "../../config/db";

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
}

export const roleRepository = new RoleRepository();
