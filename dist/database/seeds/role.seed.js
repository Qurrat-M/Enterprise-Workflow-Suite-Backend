"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
const db_1 = require("../../config/db");
const roles = [
    {
        name: "Super Admin",
        description: "System Administrator",
    },
    {
        name: "Finance Manager",
        description: "Finance Department",
    },
    {
        name: "Asset Manager",
        description: "Asset Department",
    },
    {
        name: "Department Head",
        description: "Department Head",
    },
    {
        name: "Employee",
        description: "Employee",
    },
];
async function seedRoles() {
    for (const role of roles) {
        await db_1.db.query(`
      INSERT INTO roles(name, description)
      VALUES($1,$2)
      ON CONFLICT(name)
      DO NOTHING
      `, [role.name, role.description]);
    }
    console.log("✅ Roles seeded");
}
