"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const db_1 = require("../../config/db");
class AuthRepository {
    async findUserByEmail(email) {
        const result = await db_1.db.query(`
      SELECT *
      FROM users
      WHERE email = $1
      `, [email]);
        return result.rows[0];
    }
    async findUserById(id) {
        const result = await db_1.db.query(`
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
    `, [id]);
        return result.rows[0];
    }
    async createUser(user) {
        const result = await db_1.db.query(`
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
      `, [user.firstName, user.lastName, user.email, user.password]);
        return result.rows[0];
    }
}
exports.AuthRepository = AuthRepository;
exports.default = new AuthRepository();
