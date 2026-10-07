import { db } from "../../config/db";
import { seedPermissions } from "./permissions.seed";
import { seedRoles } from "./role.seed";

async function seedRolePermissions() {
  await db.query(`
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id
    FROM roles r
    CROSS JOIN permissions p
    WHERE r.name = 'Super Admin'
    ON CONFLICT DO NOTHING;
  `);

  console.log("✅ Super Admin permissions assigned");
}

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    await seedRoles();
    await seedPermissions();
    await seedRolePermissions();

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.end();
  }
}

seed();