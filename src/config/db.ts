import { Pool } from "pg";
import { env } from "./env";

export const db = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

export const connectDB = async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    throw error;
  }
};
