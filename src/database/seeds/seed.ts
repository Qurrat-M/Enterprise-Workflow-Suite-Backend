import { db } from "../../config/db";
import { seedPermissions } from "./permissions.seed";
import { seedRoles } from "./role.seed";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    await seedRoles();
    await seedPermissions();

    console.log("🎉 Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  } finally {
    await db.end();
  }
}

seed();
