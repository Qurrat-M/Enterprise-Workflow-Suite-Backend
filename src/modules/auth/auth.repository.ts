import { db } from "../../config/db";
import { RegisterUserDto } from "./auth.types";

export class AuthRepository {
  async findUserByEmail(email: string) {
    const result = await db.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email],
    );

    return result.rows[0];
  }

  async findUserById(id: string) {
    const result = await db.query(
      `
    SELECT
      id,
      first_name,
      last_name,
      email,
      phone,
      profile_image,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE id = $1
    `,
      [id],
    );

    return result.rows[0];
  }

  async createUser(user: RegisterUserDto & { password: string }) {
    const result = await db.query(
      `
      INSERT INTO users
      (
        first_name,
        last_name,
        email,
        password
      )
      VALUES ($1,$2,$3,$4)

      RETURNING
      id,
      first_name,
      last_name,
      email,
      created_at
      `,
      [user.firstName, user.lastName, user.email, user.password],
    );

    return result.rows[0];
  }
}

export default new AuthRepository();
