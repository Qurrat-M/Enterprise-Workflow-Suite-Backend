import dotenv from "dotenv";
import { afterAll, beforeAll, beforeEach } from "vitest";

dotenv.config({ path: ".env.test" });

const dbPromise = import("../src/config/db").then(({ db }) => db);

if (!envNameIsTestDatabase()) {
  throw new Error(
    "Tests require DB_NAME to end with '_test' to protect non-test data.",
  );
}

function envNameIsTestDatabase() {
  return process.env.DB_NAME?.endsWith("_test");
}

beforeAll(async () => {
  const db = await dbPromise;
  await db.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(255) NOT NULL UNIQUE,
      password TEXT,
      is_active BOOLEAN NOT NULL DEFAULT true,
      phone VARCHAR(50),
      profile_image TEXT,
      organization_id UUID,
      name VARCHAR(255),
      password_hash TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.query(`
    ALTER TABLE users
      ALTER COLUMN first_name DROP NOT NULL,
      ALTER COLUMN password DROP NOT NULL,
      ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
      ADD COLUMN IF NOT EXISTS profile_image TEXT,
      ADD COLUMN IF NOT EXISTS organization_id UUID,
      ADD COLUMN IF NOT EXISTS name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS password_hash TEXT,
      ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS organizations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      code VARCHAR(50) NOT NULL UNIQUE,
      logo_url TEXT,
      email VARCHAR(255),
      phone VARCHAR(50),
      website TEXT,
      address TEXT,
      city VARCHAR(100),
      country VARCHAR(100),
      timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Karachi',
      currency VARCHAR(10) NOT NULL DEFAULT 'PKR',
      status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS roles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL UNIQUE,
      description VARCHAR(500),
      is_system BOOLEAN NOT NULL DEFAULT false,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS permissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      module VARCHAR(100) NOT NULL,
      action VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL UNIQUE,
      display_name VARCHAR(150),
      description VARCHAR(500),
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS role_permissions (
      role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
      PRIMARY KEY (role_id, permission_id)
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS user_roles (
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, role_id)
    )
  `);
});

beforeEach(async () => {
  const db = await dbPromise;
  await db.query(
    "TRUNCATE TABLE user_roles, role_permissions, users, organizations, permissions, roles CASCADE",
  );
});

afterAll(async () => {
  const db = await dbPromise;
  await db.end();
});
