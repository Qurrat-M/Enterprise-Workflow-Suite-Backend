import "dotenv/config";
import { afterAll, beforeAll, beforeEach } from "vitest";
import { db } from "../src/config/db";

if (!envNameIsTestDatabase()) {
  throw new Error("Tests require DB_NAME to end with '_test' to protect non-test data.");
}

function envNameIsTestDatabase() {
  return process.env.DB_NAME?.endsWith("_test");
}

beforeAll(async () => {
  await db.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100),
      email VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

beforeEach(async () => {
  await db.query("TRUNCATE TABLE users");
});

afterAll(async () => {
  await db.end();
});
