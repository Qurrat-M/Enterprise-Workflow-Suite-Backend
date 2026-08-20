"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
const permissions_seed_1 = require("./permissions.seed");
const role_seed_1 = require("./role.seed");
async function seed() {
    try {
        console.log("🌱 Seeding database...");
        await (0, role_seed_1.seedRoles)();
        await (0, permissions_seed_1.seedPermissions)();
        console.log("🎉 Database seeded successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
    finally {
        await db_1.db.end();
    }
}
seed();
